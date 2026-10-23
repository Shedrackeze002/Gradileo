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

/** Shapes the drawing tools can place by dragging. */
export type ShapeKind = 'line' | 'arrow' | 'rectangle' | 'square' | 'circle' | 'ellipse' | 'triangle' | 'rightTriangle';
export const SHAPE_KINDS: ShapeKind[] = ['line', 'arrow', 'rectangle', 'square', 'circle', 'ellipse', 'triangle', 'rightTriangle'];
export const SHAPE_NAMES: Record<ShapeKind, string> = {
  line: 'Line',
  arrow: 'Arrow',
  rectangle: 'Rectangle',
  square: 'Square',
  circle: 'Circle',
  ellipse: 'Ellipse',
  triangle: 'Triangle',
  rightTriangle: 'Right triangle',
};

type Pt = readonly [number, number];

/**
 * A polyline as stroke points at a steady pressure. Strokes are drawn as curves through the
 * midpoints of their points, which would round a shape's corners, so every corner gets a point a
 * hair before and after it on its two sides: the edges stay straight and the corners sharp. A
 * closed shape starts and ends halfway along its first side, so every corner is an inside one.
 */
function polylinePoints(vertices: Pt[], closed: boolean): number[] {
  let path: Pt[] = vertices;
  if (closed) {
    const [a, b] = vertices;
    const mid: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    path = [mid, ...vertices.slice(1), a, mid];
  }
  const out: number[] = [];
  const push = (x: number, y: number) => out.push(r1(x), r1(y), 0.5);
  path.forEach(([x, y], i) => {
    if (i === 0 || i === path.length - 1) return push(x, y);
    const [px, py] = path[i - 1];
    const [nx, ny] = path[i + 1];
    const lin = Math.hypot(x - px, y - py);
    const lout = Math.hypot(nx - x, ny - y);
    const e = Math.min(0.8, lin / 4, lout / 4);
    if (lin > 0) push(x - ((x - px) / lin) * e, y - ((y - py) / lin) * e);
    push(x, y);
    if (lout > 0) push(x + ((nx - x) / lout) * e, y + ((ny - y) / lout) * e);
  });
  return out;
}

/**
 * The stroke for a shape dragged from (x0, y0) to (x1, y1), in board units. A shape is ordinary
 * pen ink, so it saves, erases and undoes like handwriting. Lines and arrows run from the start to
 * the end of the drag; the other shapes fill the box the drag spans (a square or circle uses its
 * longer side). Returns null for a drag too small to see.
 */
export function shapeStroke(kind: ShapeKind, color: InkColor, size: number, x0: number, y0: number, x1: number, y1: number): Stroke | null {
  let dx = x1 - x0;
  let dy = y1 - y0;
  if (Math.hypot(dx, dy) < 4) return null;
  if (kind === 'square' || kind === 'circle') {
    const side = Math.max(Math.abs(dx), Math.abs(dy));
    dx = (dx < 0 ? -1 : 1) * side;
    dy = (dy < 0 ? -1 : 1) * side;
    x1 = x0 + dx;
    y1 = y0 + dy;
  }
  const left = Math.min(x0, x1);
  const right = Math.max(x0, x1);
  const top = Math.min(y0, y1);
  const bottom = Math.max(y0, y1);
  let points: number[];
  switch (kind) {
    case 'line':
      points = polylinePoints([[x0, y0], [x1, y1]], false);
      break;
    case 'arrow': {
      const len = Math.hypot(dx, dy);
      const head = Math.min(len * 0.4, Math.max(18, size * 5));
      const angle = Math.atan2(dy, dx);
      const wing = (turn: number): Pt => [x1 - head * Math.cos(angle + turn), y1 - head * Math.sin(angle + turn)];
      points = polylinePoints([[x0, y0], [x1, y1], wing(0.5), [x1, y1], wing(-0.5)], false);
      break;
    }
    case 'rectangle':
    case 'square':
      points = polylinePoints([[left, top], [right, top], [right, bottom], [left, bottom]], true);
      break;
    case 'triangle':
      points = polylinePoints([[(left + right) / 2, top], [right, bottom], [left, bottom]], true);
      break;
    case 'rightTriangle':
      // The right angle sits at the start of the drag's column and the end of its row.
      points = polylinePoints([[x0, y0], [x0, y1], [x1, y1]], true);
      break;
    case 'circle':
    case 'ellipse': {
      const cx = (left + right) / 2;
      const cy = (top + bottom) / 2;
      const rx = (right - left) / 2;
      const ry = (bottom - top) / 2;
      const n = Math.min(96, Math.max(24, Math.round((2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2)) / 8)));
      points = [];
      for (let i = 0; i <= n; i++) {
        const t = (i / n) * Math.PI * 2;
        points.push(r1(cx + rx * Math.cos(t)), r1(cy + ry * Math.sin(t)), 0.5);
      }
      break;
    }
  }
  return { tool: 'pen', color, size, points };
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
