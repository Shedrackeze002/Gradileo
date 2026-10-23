import { describe, expect, it } from 'vitest';
import { hasInk, hitStroke, inkCommit, inkDoc, inkRedo, inkUndo, parsePages, pointerPressure, SHAPE_KINDS, shapeStroke, StrokeBuilder, widthAt, type Stroke } from './ink.ts';

const line = (x1: number, y1: number, x2: number, y2: number): Stroke => ({ tool: 'pen', color: 'ink', size: 6, points: [x1, y1, 0.5, x2, y2, 0.5] });

describe('ink', () => {
  it('records points, skipping ones too close together and smoothing pressure', () => {
    const b = new StrokeBuilder('pen', 'blue', 6);
    expect(b.add(10, 10, 0.2)).toBe(true);
    expect(b.add(10.3, 10.2, 0.9)).toBe(false);
    expect(b.add(20, 10, 1)).toBe(true);
    const p = b.stroke.points;
    expect(p).toHaveLength(6);
    expect(p[2]).toBe(0.2);
    // 0.2 * 0.6 + 1 * 0.4: a sudden press does not jump straight to full width.
    expect(p[5]).toBeCloseTo(0.52, 5);
  });

  it('uses real pressure only for a pen', () => {
    expect(pointerPressure('pen', 0.8)).toBe(0.8);
    expect(pointerPressure('pen', 0)).toBe(0.5);
    expect(pointerPressure('mouse', 1)).toBe(0.5);
    expect(pointerPressure('touch', 0.1)).toBe(0.5);
  });

  it('draws firmer pen strokes wider, and highlighters wide and even', () => {
    const pen = { tool: 'pen' as const, size: 6 };
    expect(widthAt(pen, 1)).toBeGreaterThan(widthAt(pen, 0.5));
    expect(widthAt(pen, 0.5)).toBeGreaterThan(widthAt(pen, 0.1));
    expect(widthAt({ tool: 'highlighter', size: 6 }, 0.1)).toBe(widthAt({ tool: 'highlighter', size: 6 }, 1));
  });

  it('erases a stroke only when the eraser touches it', () => {
    const s = line(0, 0, 100, 0);
    expect(hitStroke(s, 50, 5, 4)).toBe(true);
    expect(hitStroke(s, 50, 30, 4)).toBe(false);
    expect(hitStroke(s, 120, 0, 4)).toBe(false);
    expect(hitStroke({ ...s, points: [5, 5, 0.5] }, 7, 7, 2)).toBe(true);
  });

  it('undoes and redoes, and a new stroke clears the redo history', () => {
    const a = line(0, 0, 10, 10);
    const b = line(0, 10, 10, 0);
    let d = inkCommit(inkCommit(inkDoc(), [a]), [a, b]);
    d = inkUndo(d);
    expect(d.strokes).toEqual([a]);
    d = inkRedo(d);
    expect(d.strokes).toEqual([a, b]);
    d = inkCommit(inkUndo(d), []);
    expect(d.future).toHaveLength(0);
    expect(inkUndo(inkUndo(inkUndo(d))).strokes).toEqual([]);
  });

  it('keeps only well-formed strokes from saved data', () => {
    const pages = parsePages([
      { background: 'grid', strokes: [line(0, 0, 1, 1), { tool: 'laser', color: 'gold', size: 999, points: [1, 2, 0.5] }, { points: [1, 2] }, { points: [1, 'x', 3] }, null] },
      { background: 'wallpaper' },
      'nonsense',
    ]);
    expect(pages).toHaveLength(2);
    expect(pages[0].background).toBe('grid');
    expect(pages[0].strokes).toHaveLength(2);
    expect(pages[0].strokes[1]).toEqual({ tool: 'pen', color: 'ink', size: 6, points: [1, 2, 0.5] });
    expect(pages[1]).toEqual({ background: 'plain', strokes: [] });
    expect(parsePages({ pages: [] })).toEqual([]);
    expect(hasInk(pages)).toBe(true);
    expect(hasInk([pages[1]])).toBe(false);
  });

  describe('shapes', () => {
    const xy = (s: Stroke) => Array.from({ length: s.points.length / 3 }, (_, i) => [s.points[i * 3], s.points[i * 3 + 1]] as const);
    const has = (s: Stroke, x: number, y: number) => xy(s).some(([a, b]) => a === x && b === y);

    it('makes pen ink at a steady pressure, and nothing for a tap', () => {
      for (const k of SHAPE_KINDS) {
        const s = shapeStroke(k, 'blue', 6, 100, 100, 220, 180)!;
        expect(s.tool, k).toBe('pen');
        expect(s.color).toBe('blue');
        expect(s.points.filter((_, i) => i % 3 === 2).every((p) => p === 0.5), k).toBe(true);
      }
      expect(shapeStroke('rectangle', 'ink', 6, 50, 50, 52, 51)).toBeNull();
    });

    it('draws a rectangle through its four corners, closed, with sharp corners', () => {
      const s = shapeStroke('rectangle', 'ink', 6, 100, 100, 220, 180)!;
      for (const [x, y] of [[100, 100], [220, 100], [220, 180], [100, 180]]) expect(has(s, x, y), `${x},${y}`).toBe(true);
      const pts = xy(s);
      expect(pts[0]).toEqual(pts[pts.length - 1]);
      // A point a hair either side of each corner keeps the smoothed line from rounding it.
      expect(has(s, 219.2, 100)).toBe(true);
      expect(has(s, 220, 100.8)).toBe(true);
    });

    it('keeps a square and a circle even, whichever way the drag goes', () => {
      const sq = shapeStroke('square', 'ink', 6, 100, 100, 160, 130)!;
      expect(has(sq, 160, 160)).toBe(true);
      const up = shapeStroke('square', 'ink', 6, 100, 100, 40, 70)!;
      expect(has(up, 40, 40)).toBe(true);
      const c = shapeStroke('circle', 'ink', 6, 0, 0, 100, 40)!;
      for (const [x, y] of xy(c)) expect(Math.hypot(x - 50, y - 50)).toBeCloseTo(50, 0);
      const e = shapeStroke('ellipse', 'ink', 6, 0, 0, 100, 40)!;
      for (const [x, y] of xy(e)) expect(((x - 50) / 50) ** 2 + ((y - 20) / 20) ** 2).toBeCloseTo(1, 1);
    });

    it('places triangles and arrows where the drag says', () => {
      const t = shapeStroke('triangle', 'ink', 6, 0, 0, 100, 80)!;
      for (const [x, y] of [[50, 0], [100, 80], [0, 80]]) expect(has(t, x, y)).toBe(true);
      const r = shapeStroke('rightTriangle', 'ink', 6, 0, 0, 100, 80)!;
      for (const [x, y] of [[0, 0], [0, 80], [100, 80]]) expect(has(r, x, y)).toBe(true);
      const a = shapeStroke('arrow', 'ink', 6, 0, 0, 100, 0)!;
      const pts = xy(a);
      expect(pts[0]).toEqual([0, 0]);
      // Two wings fold back from the tip, 30 units long (five times the line size) at 0.5 rad.
      expect(has(a, 73.7, -14.4) && has(a, 73.7, 14.4)).toBe(true);
      // The eraser finds a shape anywhere along its edges, not just at its corners.
      expect(hitStroke(shapeStroke('rectangle', 'ink', 6, 0, 0, 200, 100)!, 100, 0, 3)).toBe(true);
    });
  });
});
