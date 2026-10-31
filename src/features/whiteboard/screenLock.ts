import { useEffect } from 'react';

/**
 * Present mode on a touch screen, above all an iPad with a pencil, where the teacher writes on
 * the slides with a hand resting on the glass:
 *  - the screen stays put. A finger or palm cannot scroll, bounce or zoom the page, or pull it
 *    down, which makes Safari reload it. A panel that scrolls (the slide overview, a long menu)
 *    still scrolls under one finger;
 *  - a palm presses nothing. While the pencil writes, and for a moment after it lifts, any other
 *    touch is a hand: it cannot press the toolbar, Next or anything else it rests on. A hand that
 *    was already resting on the screen when the pencil lands counts as one too.
 * The pencil itself is told apart by Safari's `touchType` ("stylus"), or elsewhere by landing
 * where the pen's own pointer event just did.
 */

/** How long after the pencil lifts a touch is still taken for the hand that held it. */
export const PALM_MS = 800;

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
  private penAt = -Infinity;
  private penPoint: { x: number; y: number; t: number } | null = null;
  /** Touches on the screen that are not the pen. */
  private live = new Set<number>();
  private palms = new Set<number>();

  pen(type: string, x: number, y: number, now: number) {
    this.penAt = now;
    if (type === 'pointerdown') {
      this.penDown = true;
      this.penPoint = { x, y, t: now };
      for (const id of this.live) this.palms.add(id);
    } else if (type === 'pointerup' || type === 'pointercancel') this.penDown = false;
  }

  /** Whether a touch is the pen's own: Safari says so, or it lands where the pen just went down. */
  isPen(t: { touchType?: string; clientX: number; clientY: number }, now: number): boolean {
    if (t.touchType === 'stylus') return true;
    const p = this.penPoint;
    return !!p && now - p.t < 120 && Math.abs(t.clientX - p.x) < 4 && Math.abs(t.clientY - p.y) < 4;
  }

  /** A touch starts; true when it is a palm. */
  start(id: number, now: number): boolean {
    // A touch whose end never came may have left its number behind; a new touch starts afresh.
    this.palms.delete(id);
    this.live.add(id);
    if (this.penDown || now - this.penAt < PALM_MS) this.palms.add(id);
    return this.palms.has(id);
  }

  /** A touch ends; true when it was a palm, so what it rests on must not be pressed. */
  end(id: number): boolean {
    this.live.delete(id);
    return this.palms.delete(id);
  }
}

function install(): () => void {
  const root = document.documentElement;
  root.classList.add('screen-lock');
  const guard = new PalmGuard();
  /** Touches that may scroll the panel they started in. */
  const scrolls = new Set<number>();

  const onPen = (e: PointerEvent) => {
    if (e.pointerType === 'pen') guard.pen(e.type, e.clientX, e.clientY, performance.now());
  };
  const onStart = (e: TouchEvent) => {
    const now = performance.now();
    let palm = false;
    for (const t of Array.from(e.changedTouches)) {
      const pen = guard.isPen(t as Touch & { touchType?: string }, now);
      if (!pen && guard.start(t.identifier, now)) palm = true;
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
    for (const t of Array.from(e.changedTouches)) {
      if (guard.end(t.identifier)) palm = true;
      scrolls.delete(t.identifier);
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
