import { useEffect } from 'react';
import { inkLog } from './inkLog.ts';

/**
 * Present mode on a touch screen, above all an iPad with a pencil, where the teacher writes on
 * the slides with a hand resting on the glass:
 *  - the screen stays put. A finger or palm cannot scroll, bounce or zoom the page, or pull it
 *    down, which makes Safari reload it. A panel that scrolls (the slide overview, a long menu)
 *    still scrolls under one finger;
 *  - a palm presses nothing. While the pencil writes, any other touch is a hand: it cannot press
 *    the toolbar, Next or anything else it rests on. A hand that was already resting on the screen
 *    when the pencil lands counts as one too. So does a contact too broad for a fingertip, a touch
 *    that lands beside another one (the side of a hand lands as two or three), and one that stays
 *    down too long to be a tap. For a moment after the pencil lifts, a touch presses only if it is
 *    a quick tap, so a hand moving to the next line cannot press Undo or Clear on its way while a
 *    finger reaching for a tool still can;
 *  - only the pencil on the glass counts as writing. A pencil hovering just above the screen (an
 *    iPad Pro reports it) is not writing, and it tells us a lost pointerup has really ended. Before
 *    this, a hovering pencil kept every finger tap blocked, so a button needed three or four taps.
 * The pencil itself is told apart by Safari's `touchType` ("stylus"), or elsewhere by landing
 * where the pen's own pointer event just did.
 */

/** How long after the pencil lifts a touch must be a quick tap to press anything. */
export const PALM_MS = 1500;
/** A touch shorter than this is a deliberate tap, even just after the pencil lifts. */
export const TAP_MS = 300;
/** A pencil "down" with no news for this long lost its pointerup: it no longer blocks every touch. */
export const STUCK_MS = 2500;
/** A contact with radii whose product is above this is too broad for a fingertip (CSS pixels). */
export const PALM_RADII = 35 * 35;
/** A touch landing this close to another that is still down is part of the same hand (CSS pixels). */
export const HAND_SPAN = 220;
/** A touch that stays down longer than this is a resting hand, not a tap. */
export const REST_MS = 700;

let holders = 0;
let release: (() => void) | null = null;

/** Locks the screen; the lock lifts when the last screen that holds it lets go. */
export function lockScreen(): () => void {
  if (holders++ === 0) release = install();
  let done = false;
  return () => {
    if (done) return;
    done = true;
    if (--holders === 0) {
      release?.();
      release = null;
    }
  };
}

/** Holds the screen lock while `on` is true. */
export function useScreenLock(on: boolean) {
  useEffect(() => (on ? lockScreen() : undefined), [on]);
}

/** Whether a touch on `target` may scroll: it is in a panel that scrolls, or in a text field. */
export function canScroll(target: EventTarget | null): boolean {
  for (let el = target instanceof Element ? target : null; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
    if (el.matches('input, textarea, select, [contenteditable="true"]')) return true;
    const s = getComputedStyle(el);
    if (/auto|scroll/.test(s.overflowY) && el.scrollHeight > el.clientHeight + 1) return true;
    if (/auto|scroll/.test(s.overflowX) && el.scrollWidth > el.clientWidth + 1) return true;
  }
  return false;
}

/**
 * Decides which touches are a palm. Kept apart from the page's events so it can be tested: the
 * listeners below feed it the pen's pointer events and the touches.
 */
export class PalmGuard {
  private penDown = false;
  /** When the pencil last touched the glass (hovering does not count). */
  private penAt = -Infinity;
  private penPoint: { x: number; y: number; t: number } | null = null;
  /** Touches on the screen that are not the pen, with when and where each landed. */
  private live = new Map<number, { t: number; x: number; y: number }>();
  /** Touches that are a hand whatever they do. */
  private palms = new Set<number>();
  /** Touches that landed just after the pencil lifted: they press only as a quick tap. */
  private suspects = new Set<number>();
  /** Whether a pencil has been used at all: only then are touches judged by more than their timing. */
  private penSeen = false;

  /**
   * A pen pointer event. `touching` is false for a pencil hovering above the glass, which is not
   * writing; it also means the pencil is up, whatever pointerup was lost.
   */
  pen(type: string, x: number, y: number, now: number, touching = type !== 'pointerup' && type !== 'pointercancel') {
    if (type === 'pointerup' || type === 'pointercancel') {
      // The pencil touched until now if it was down (a hover's pointerup changes nothing).
      if (this.penDown) this.penAt = now;
      this.penDown = false;
      return;
    }
    if (!touching) {
      if (this.penDown) this.penAt = now;
      this.penDown = false;
      return;
    }
    this.penAt = now;
    this.penSeen = true;
    if (type === 'pointerdown' || !this.penDown) {
      this.penDown = true;
      this.penPoint = { x, y, t: now };
      for (const id of this.live.keys()) this.palms.add(id);
    }
  }

  /** Whether the pencil is on the glass now (a down that went quiet too long lost its pointerup). */
  private writing(now: number) {
    if (this.penDown && now - this.penAt > STUCK_MS) this.penDown = false;
    return this.penDown;
  }

  /** Whether a touch is the pen's own: Safari says so, or it lands where the pen just went down. */
  isPen(t: { touchType?: string; clientX: number; clientY: number }, now: number): boolean {
    if (t.touchType === 'stylus') return true;
    const p = this.penPoint;
    return !!p && now - p.t < 120 && Math.abs(t.clientX - p.x) < 4 && Math.abs(t.clientY - p.y) < 4;
  }

  /** Forgets touches the browser no longer has on the screen (their end never came). */
  keepOnly(ids: Iterable<number>) {
    const on = new Set(ids);
    for (const id of [...this.live.keys()]) {
      if (on.has(id)) continue;
      this.live.delete(id);
      this.palms.delete(id);
      this.suspects.delete(id);
    }
  }

  /**
   * A touch starts; true when it is surely a palm, so it must press nothing from the start. A touch
   * just after the pencil lifts is decided when it ends. `radii` is the product of its contact radii.
   */
  start(id: number, now: number, radii = 0, x = NaN, y = NaN): boolean {
    // A touch whose end never came may have left its number behind; a new touch starts afresh.
    this.palms.delete(id);
    this.suspects.delete(id);
    this.live.delete(id);
    if (this.writing(now)) this.palms.add(id);
    else if (this.penSeen && radii > PALM_RADII) this.palms.add(id);
    else if (this.penSeen) {
      // Contacts side by side are one hand, every one of them. (A finger of the other hand, far
      // from the resting one, still presses.)
      for (const [other, o] of this.live) {
        if (Math.hypot(o.x - x, o.y - y) < HAND_SPAN) {
          this.palms.add(id);
          this.palms.add(other);
        }
      }
    }
    if (!this.palms.has(id) && now - this.penAt < PALM_MS) this.suspects.add(id);
    this.live.set(id, { t: now, x, y });
    return this.palms.has(id);
  }

  /** A touch ends; true when it was a palm, so what it rests on must not be pressed. */
  end(id: number, now = -Infinity): boolean {
    const since = this.live.get(id);
    this.live.delete(id);
    const held = since === undefined ? 0 : now - since.t;
    const suspect = this.suspects.delete(id);
    if (this.palms.delete(id)) return true;
    // Just after the pencil lifts, only a quick tap presses.
    if (suspect && held > TAP_MS) return true;
    return this.penSeen && held > REST_MS;
  }
}

function install(): () => void {
  const root = document.documentElement;
  root.classList.add('screen-lock');
  const guard = new PalmGuard();
  /** Touches that may scroll the panel they started in. */
  const scrolls = new Set<number>();

  const onPen = (e: PointerEvent) => {
    // A pencil hovering above the glass (an iPad Pro reports it) has no buttons and no pressure.
    if (e.pointerType === 'pen') guard.pen(e.type, e.clientX, e.clientY, performance.now(), e.buttons !== 0 || e.pressure > 0);
  };
  const onStart = (e: TouchEvent) => {
    const now = performance.now();
    let palm = false;
    guard.keepOnly(Array.from(e.touches, (t) => t.identifier));
    for (const t of Array.from(e.changedTouches)) {
      const pen = guard.isPen(t as Touch & { touchType?: string }, now);
      if (!pen && guard.start(t.identifier, now, (t.radiusX || 0) * (t.radiusY || 0), t.clientX, t.clientY)) palm = true;
      else if (canScroll(t.target)) scrolls.add(t.identifier);
    }
    // Cancelling the start stops the palm from scrolling the page or pressing a button.
    if (palm && e.cancelable) e.preventDefault();
  };
  const onMove = (e: TouchEvent) => {
    if (!e.cancelable) return;
    const all = Array.from(e.touches);
    if (all.length === 1 && scrolls.has(all[0].identifier)) return;
    e.preventDefault();
  };
  const onEnd = (e: TouchEvent) => {
    let palm = false;
    const now = performance.now();
    for (const t of Array.from(e.changedTouches)) {
      const scrolled = scrolls.delete(t.identifier);
      const stylus = (t as Touch & { touchType?: string }).touchType === 'stylus';
      // A finger scrolling a panel stays down a long time and is no palm.
      const hand = guard.end(t.identifier, scrolled ? -Infinity : now) && !stylus;
      if (hand) palm = true;
      const button = t.target instanceof Element ? t.target.closest('button') : null;
      if (button) inkLog(e.type === 'touchend' ? 'touch off a button' : 'touch cancelled on a button', { button: button.getAttribute('aria-label') ?? button.textContent, by: stylus ? 'pencil' : 'hand', blocked: hand, radius: `${Math.round(t.radiusX || 0)}x${Math.round(t.radiusY || 0)}` });
    }
    // A hand that rested on a button before the pencil landed must not press it when it lifts.
    if (palm && e.type === 'touchend' && e.cancelable) e.preventDefault();
  };
  // Safari's pinch to zoom.
  const onGesture = (e: Event) => e.preventDefault();

  const pointer = { capture: true } as const;
  const touch = { capture: true, passive: false } as const;
  for (const type of ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'] as const) document.addEventListener(type, onPen, pointer);
  document.addEventListener('touchstart', onStart, touch);
  document.addEventListener('touchmove', onMove, touch);
  document.addEventListener('touchend', onEnd, touch);
  document.addEventListener('touchcancel', onEnd, touch);
  document.addEventListener('gesturestart', onGesture, touch);
  document.addEventListener('gesturechange', onGesture, touch);
  return () => {
    root.classList.remove('screen-lock');
    for (const type of ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'] as const) document.removeEventListener(type, onPen, pointer);
    document.removeEventListener('touchstart', onStart, touch);
    document.removeEventListener('touchmove', onMove, touch);
    document.removeEventListener('touchend', onEnd, touch);
    document.removeEventListener('touchcancel', onEnd, touch);
    document.removeEventListener('gesturestart', onGesture, touch);
    document.removeEventListener('gesturechange', onGesture, touch);
  };
}
