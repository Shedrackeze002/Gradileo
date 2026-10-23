/**
 * A drawing surface: pen, highlighter and eraser on two stacked canvases (finished ink below, the
 * stroke being drawn above). Pointer Events give one code path for a pen, a mouse and a finger:
 *  - a pen's pressure sets the line width, and its eraser end (or barrel button) erases;
 *  - palm rejection: once a pen is in use, fingers are ignored, a broad contact (a palm) is always
 *    ignored, and a pen that lands while a resting hand is "drawing" replaces that stroke;
 *  - coalesced events keep fast pen strokes smooth;
 *  - on an iPad, Safari treats a pencil or finger moving over the page as text selection (it
 *    highlights instead of drawing), so the canvas cancels its touch events and the page cannot be
 *    selected while a stroke is drawn.
 */
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { drawBackground, drawStroke, drawStrokes, hitStroke, pointerPressure, StrokeBuilder, type BoardBackground, type InkColor, type Stroke } from '@/lib/ink.ts';
import { cn } from '@/lib/cn.ts';
import { useInkTheme } from './useInkTheme.ts';

export type InkMode = 'pen' | 'highlighter' | 'eraser';

interface Props {
  strokes: Stroke[];
  onCommit: (strokes: Stroke[]) => void;
  mode: InkMode;
  color: InkColor;
  size: number;
  /** How many board units span the surface's width. */
  unitsWide: number;
  background?: BoardBackground;
  /** Ignore fingers, so a hand resting on the screen does not draw. */
  penOnly: boolean;
  /** Called when a pen touches the surface (to turn on pen-only mode). */
  onPen?: () => void;
  /** When false the ink is shown but clicks pass through to whatever is underneath. */
  active: boolean;
  /** Smallest gap between recorded points, in board units (larger keeps saved ink smaller). */
  pointGap?: number;
  label: string;
  className?: string;
}

interface Active {
  id: number;
  type: string;
  rect: DOMRect;
  builder?: StrokeBuilder;
  erasing?: boolean;
}

const PALM_AREA = 45 * 45;

export function InkSurface({ strokes, onCommit, mode, color, size, unitsWide, background = 'plain', penOnly, onPen, active, pointGap, label, className }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const base = useRef<HTMLCanvasElement>(null);
  const live = useRef<HTMLCanvasElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const theme = useInkTheme();
  const cur = useRef<Active | null>(null);
  const erased = useRef(new Set<Stroke>());
  const [eraseTick, setEraseTick] = useState(0);
  const frame = useRef(0);
  const clearLive = useRef(false);
  const latest = useRef({ strokes, onCommit, mode, color, size, penOnly, onPen, palette: theme.palette });
  latest.current = { strokes, onCommit, mode, color, size, penOnly, onPen, palette: theme.palette };

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setDims((d) => (d.w === el.clientWidth && d.h === el.clientHeight ? d : { w: el.clientWidth, h: el.clientHeight }));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = dims.w > 0 ? dims.w / unitsWide : 1;

  const prepare = (c: HTMLCanvasElement | null) => {
    if (!c || dims.w === 0) return null;
    const dpr = window.devicePixelRatio || 1;
    const pw = Math.round(dims.w * dpr);
    const ph = Math.round(dims.h * dpr);
    if (c.width !== pw || c.height !== ph) {
      c.width = pw;
      c.height = ph;
    }
    const ctx = c.getContext('2d');
    if (!ctx) return null;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, pw, ph);
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    return ctx;
  };

  // Finished ink: redrawn when the strokes, the size, the theme or the eraser's progress change.
  useEffect(() => {
    const ctx = prepare(base.current);
    if (!ctx) return;
    drawBackground(ctx, background, unitsWide, dims.h / scale, theme.rule);
    drawStrokes(ctx, erased.current.size ? strokes.filter((s) => !erased.current.has(s)) : strokes, theme.palette);
    if (clearLive.current || !cur.current) {
      clearLive.current = false;
      prepare(live.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes, dims, theme, background, unitsWide, eraseTick]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // Safari on iPad starts text selection (and its magnifier) from touches even with touch-action:
  // none. Cancelling them needs non-passive listeners, which React's touch handlers are not.
  useEffect(() => {
    const c = live.current;
    if (!c || !active) return;
    const cancel = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
    };
    c.addEventListener('touchstart', cancel, { passive: false });
    c.addEventListener('touchmove', cancel, { passive: false });
    return () => {
      c.removeEventListener('touchstart', cancel);
      c.removeEventListener('touchmove', cancel);
    };
  }, [active]);

  // While a stroke is drawn nothing on the page can be selected, even where the pen strays off the board.
  useEffect(() => () => lockSelection(false), []);

  const drawLive = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const b = cur.current?.builder;
      const ctx = prepare(live.current);
      if (ctx && b) drawStroke(ctx, b.stroke, latest.current.palette);
    });
  };

  const toBoard = (a: Active, e: { clientX: number; clientY: number }) => [(e.clientX - a.rect.left) / scale, (e.clientY - a.rect.top) / scale] as const;

  const eraseAt = (x: number, y: number) => {
    const r = 6 + latest.current.size * 2;
    let hit = false;
    for (const s of latest.current.strokes) {
      if (!erased.current.has(s) && hitStroke(s, x, y, r)) {
        erased.current.add(s);
        hit = true;
      }
    }
    if (hit) setEraseTick((t) => t + 1);
  };

  const finish = (commit: boolean) => {
    const a = cur.current;
    cur.current = null;
    if (!a) return;
    lockSelection(false);
    const { strokes: now, onCommit: commitFn } = latest.current;
    if (a.erasing) {
      const gone = erased.current;
      erased.current = new Set();
      if (commit && gone.size) {
        const next = now.filter((s) => !gone.has(s));
        // Strokes can end faster than React re-renders: the next one must build on this one.
        latest.current.strokes = next;
        commitFn(next);
      } else setEraseTick((t) => t + 1);
      return;
    }
    if (commit && a.builder && a.builder.stroke.points.length) {
      clearLive.current = true;
      const next = [...now, a.builder.stroke];
      latest.current.strokes = next;
      commitFn(next);
    } else {
      prepare(live.current);
    }
  };

  const onDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!active) return;
    const l = latest.current;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.pointerType === 'pen') l.onPen?.();
    if (e.pointerType === 'touch') {
      if (l.penOnly || cur.current) return;
      if (e.width > 0 && e.height > 0 && e.width * e.height > PALM_AREA) return;
    }
    if (cur.current) {
      // A pen landing while a resting hand is drawing: drop the hand's stroke and follow the pen.
      if (e.pointerType === 'pen' && cur.current.type === 'touch') finish(false);
      else return;
    }
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* the pointer may already be gone; the stroke still ends on pointerup */
    }
    lockSelection(true);
    const a: Active = { id: e.pointerId, type: e.pointerType, rect: e.currentTarget.getBoundingClientRect() };
    const [x, y] = toBoard(a, e);
    // The eraser end of a stylus reports button 5 (buttons bit 32).
    if (l.mode === 'eraser' || (e.pointerType === 'pen' && (e.buttons & 32) !== 0)) {
      a.erasing = true;
      erased.current = new Set();
      cur.current = a;
      eraseAt(x, y);
      return;
    }
    a.builder = new StrokeBuilder(l.mode === 'highlighter' ? 'highlighter' : 'pen', l.color, l.mode === 'highlighter' ? l.size * 1.5 : l.size, pointGap);
    a.builder.add(x, y, pointerPressure(e.pointerType, e.pressure));
    cur.current = a;
    drawLive();
  };

  const onMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const a = cur.current;
    if (!a || a.id !== e.pointerId) return;
    const native = e.nativeEvent;
    const events = typeof native.getCoalescedEvents === 'function' ? native.getCoalescedEvents() : [];
    const list = events.length ? events : [native];
    for (const ev of list) {
      const [x, y] = toBoard(a, ev);
      if (a.erasing) eraseAt(x, y);
      else a.builder?.add(x, y, pointerPressure(ev.pointerType, ev.pressure));
    }
    if (!a.erasing) drawLive();
  };

  const onUp = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (cur.current?.id === e.pointerId) finish(true);
  };

  return (
    <div ref={box} className={cn('relative h-full w-full', active ? 'ink-surface' : 'pointer-events-none', className)}>
      <canvas ref={base} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <canvas
        ref={live}
        role="img"
        aria-label={label}
        className={cn('absolute inset-0 h-full w-full', active && (mode === 'eraser' ? 'cursor-cell' : 'cursor-crosshair'))}
        style={{ touchAction: active ? 'none' : 'auto' }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onLostPointerCapture={onUp}
        onContextMenu={(e) => active && e.preventDefault()}
      />
    </div>
  );
}

/** Stop the page's text from being selected (and clear any selection) while a stroke is drawn. */
function lockSelection(on: boolean) {
  document.documentElement.classList.toggle('ink-drawing', on);
  if (on) window.getSelection()?.removeAllRanges();
}
