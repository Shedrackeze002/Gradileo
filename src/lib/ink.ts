/**
 * Drawing vector ink for the whiteboard, drawing on slides and canvas answers. The stroke data
 * (board units, pages, checking saved pages, canvas answers) is in the shared engine, so the
 * server can check canvas answers with the same code.
 */
import type { BoardBackground, InkColor, InkTool, Stroke } from '@engine/ink.ts';

export {
  BACKGROUNDS,
  BOARD_H,
  BOARD_W,
  CANVAS_MAX_LENGTH,
  CANVAS_MAX_PAGES,
  CANVAS_POINT_GAP,
  decodeCanvas,
  encodeCanvas,
  hasInk,
  INK_COLORS,
  parsePages,
  type BoardBackground,
  type BoardPage,
  type InkColor,
  type InkTool,
  type Stroke,
} from '@engine/ink.ts';

export const INK_SIZES = [3, 6, 12];

/** Stroke colours for a light or a dark surface. `ink` follows the page text colour. */
export function inkPalette(dark: boolean): Record<InkColor, string> {
  return dark
    ? { ink: '#eceef7', blue: '#60a5fa', red: '#f87171', green: '#4ade80', orange: '#fb923c', purple: '#a78bfa' }
    : { ink: '#111626', blue: '#2563eb', red: '#dc2626', green: '#16a34a', orange: '#ea580c', purple: '#7c3aed' };
}

/** Line width at a given pressure: thinner for a light touch, thicker for a firm one. */
export function widthAt(stroke: Pick<Stroke, 'tool' | 'size'>, pressure: number): number {
  if (stroke.tool === 'highlighter') return stroke.size * 3;
  return stroke.size * (0.35 + 1.3 * Math.min(1, Math.max(0, pressure)));
}

const r1 = (v: number) => Math.round(v * 10) / 10;
const r2 = (v: number) => Math.round(v * 100) / 100;

/**
 * Builds a stroke point by point. Points closer than `minGap` to the last one are dropped,
 * and pressure is smoothed so a shaky pen does not give a ragged line.
 */
export class StrokeBuilder {
  readonly stroke: Stroke;
  private lastP = -1;
  constructor(tool: InkTool, color: InkColor, size: number, private minGap = 0.8) {
    this.stroke = { tool, color, size, points: [] };
  }
  add(x: number, y: number, pressure: number): boolean {
    const pts = this.stroke.points;
    const n = pts.length;
    const p = this.lastP < 0 ? pressure : this.lastP * 0.6 + pressure * 0.4;
    if (n >= 3 && Math.hypot(x - pts[n - 3], y - pts[n - 2]) < this.minGap) return false;
    this.lastP = p;
    pts.push(r1(x), r1(y), r2(p));
    return true;
  }
}

/** The pressure to record for a pointer event: real pressure for a pen, a steady 0.5 otherwise. */
export function pointerPressure(pointerType: string, pressure: number): number {
  if (pointerType !== 'pen') return 0.5;
  return pressure > 0 ? pressure : 0.5;
}

/** Draws a page's strokes on a context already scaled to board units. */
export function drawStrokes(ctx: CanvasRenderingContext2D, strokes: Stroke[], palette: Record<InkColor, string>) {
  for (const s of strokes) drawStroke(ctx, s, palette);
}

export function drawStroke(ctx: CanvasRenderingContext2D, s: Stroke, palette: Record<InkColor, string>) {
  const pts = s.points;
  const n = pts.length / 3;
  if (n === 0) return;
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = palette[s.color] ?? palette.ink;
  ctx.fillStyle = ctx.strokeStyle;
  if (s.tool === 'highlighter') ctx.globalAlpha = 0.32;
  if (n === 1) {
    ctx.beginPath();
    ctx.arc(pts[0], pts[1], widthAt(s, pts[2]) / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }
  const steady = s.tool === 'highlighter' || pts.every((v, i) => i % 3 !== 2 || v === pts[2]);
  if (steady) {
    // One path: smooth curves through the midpoints, and no darker overlaps for a highlighter.
    ctx.lineWidth = widthAt(s, pts[2]);
    ctx.beginPath();
    ctx.moveTo(pts[0], pts[1]);
    for (let i = 1; i < n - 1; i++) {
      const mx = (pts[i * 3] + pts[i * 3 + 3]) / 2;
      const my = (pts[i * 3 + 1] + pts[i * 3 + 4]) / 2;
      ctx.quadraticCurveTo(pts[i * 3], pts[i * 3 + 1], mx, my);
    }
    ctx.lineTo(pts[(n - 1) * 3], pts[(n - 1) * 3 + 1]);
    ctx.stroke();
  } else {
    // Variable width: one short curve per point, each as wide as the pressure there.
    let px = pts[0];
    let py = pts[1];
    for (let i = 1; i < n; i++) {
      const x = pts[i * 3];
      const y = pts[i * 3 + 1];
      const last = i === n - 1;
      const mx = last ? x : (x + pts[i * 3 + 3]) / 2;
      const my = last ? y : (y + pts[i * 3 + 4]) / 2;
      ctx.lineWidth = widthAt(s, pts[i * 3 + 2]);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.quadraticCurveTo(x, y, mx, my);
      ctx.stroke();
      px = mx;
      py = my;
    }
  }
  ctx.restore();
}

/** Ruled, squared or dotted paper, drawn in board units over `width` × `height`. */
export function drawBackground(ctx: CanvasRenderingContext2D, bg: BoardBackground, width: number, height: number, color: string) {
  if (bg === 'plain') return;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1;
  if (bg === 'grid') {
    ctx.beginPath();
    for (let x = 40; x < width; x += 40) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 40; y < height; y += 40) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  } else if (bg === 'lined') {
    ctx.beginPath();
    for (let y = 60; y < height; y += 50) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  } else {
    for (let x = 40; x < width; x += 40) for (let y = 40; y < height; y += 40) ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
  }
  ctx.restore();
}

function segDist(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax;
  const dy = by - ay;
  const len = dx * dx + dy * dy;
  const t = len ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len)) : 0;
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Whether an eraser of radius `r` at (x, y) touches the stroke. */
export function hitStroke(s: Stroke, x: number, y: number, r: number): boolean {
  const pts = s.points;
  const reach = r + widthAt(s, 1) / 2;
  const n = pts.length / 3;
  if (n === 1) return Math.hypot(pts[0] - x, pts[1] - y) <= reach;
  for (let i = 0; i < n - 1; i++) {
    if (segDist(x, y, pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 3], pts[i * 3 + 4]) <= reach) return true;
  }
  return false;
}

/** Strokes with an undo and a redo history, for one page or one slide. */
export interface InkDoc {
  strokes: Stroke[];
  past: Stroke[][];
  future: Stroke[][];
}

const HISTORY = 100;
export const inkDoc = (strokes: Stroke[] = []): InkDoc => ({ strokes, past: [], future: [] });
export function inkCommit(doc: InkDoc, strokes: Stroke[]): InkDoc {
  if (strokes === doc.strokes) return doc;
  return { strokes, past: [...doc.past.slice(-(HISTORY - 1)), doc.strokes], future: [] };
}
export function inkUndo(doc: InkDoc): InkDoc {
  if (!doc.past.length) return doc;
  return { strokes: doc.past[doc.past.length - 1], past: doc.past.slice(0, -1), future: [doc.strokes, ...doc.future] };
}
export function inkRedo(doc: InkDoc): InkDoc {
  if (!doc.future.length) return doc;
  return { strokes: doc.future[0], past: [...doc.past, doc.strokes], future: doc.future.slice(1) };
}
