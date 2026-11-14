import { describe, expect, it } from 'vitest';
import { checkPath, trackOf, type MotionPath } from './path.ts';

describe('path: a hill through points', () => {
  it('follows a straight slope exactly', () => {
    // 3 across and 4 up: a slope 5 m long, whose angle has a sine of 0.8.
    const t = trackOf({ g: 9.8, points: [[0, 0], [3, 4]] });
    expect(t.end).toBeCloseTo(5, 6);
    const p = t.at(2.5);
    expect(p.x).toBeCloseTo(1.5, 6);
    expect(p.y).toBeCloseTo(2, 6);
    expect(p.sin).toBeCloseTo(0.8, 6);
    expect(p.cos).toBeCloseTo(0.6, 6);
  });

  it('passes through its points and never overshoots them', () => {
    const points: Array<[number, number]> = [[0, 4], [4, 0], [8, 2.5], [12, 0], [16, 0]];
    const t = trackOf({ g: 9.8, points });
    for (const [x, y] of points) expect(t.outline.some(([px, py]) => Math.abs(px - x) < 1e-9 && Math.abs(py - y) < 1e-9)).toBe(true);
    for (const [, y] of t.outline) {
      expect(y).toBeGreaterThanOrEqual(-1e-9);
      expect(y).toBeLessThanOrEqual(4 + 1e-9);
    }
    // The valley floor, the top of the second hill and the flat run are level.
    const flat = t.outline.filter(([x]) => x >= 12);
    for (const [, y] of flat) expect(y).toBeCloseTo(0, 9);
  });

  it('is level at the top of a hill and the bottom of a valley', () => {
    const t = trackOf({ g: 9.8, points: [[0, 4], [4, 0], [8, 2.5], [12, 0]] });
    // Find the distance along the track at which x = 4 and x = 8.
    const sAt = (x: number) => {
      let lo = t.start;
      let hi = t.end;
      for (let i = 0; i < 60; i++) {
        const mid = (lo + hi) / 2;
        if (t.at(mid).x < x) lo = mid;
        else hi = mid;
      }
      return lo;
    };
    expect(t.at(sAt(4)).sin).toBeCloseTo(0, 3);
    expect(t.at(sAt(8)).sin).toBeCloseTo(0, 3);
  });

  it('carries on straight past its ends', () => {
    const t = trackOf({ g: 9.8, points: [[0, 0], [3, 4]] });
    expect(t.at(-5).x).toBeCloseTo(-3, 6);
    expect(t.at(-5).y).toBeCloseTo(-4, 6);
    expect(t.at(10).x).toBeCloseTo(6, 6);
    expect(t.at(10).y).toBeCloseTo(8, 6);
  });
});

describe('path: a pendulum', () => {
  const path: MotionPath = { g: 9.8, swing: { length: 2, angle: 60 } };
  const t = trackOf(path);

  it('hangs at the origin under its pivot', () => {
    expect(t.pivot).toEqual([0, 2]);
    const p = t.at(0);
    expect(p.x).toBeCloseTo(0);
    expect(p.y).toBeCloseTo(0);
    expect(p.sin).toBeCloseTo(0);
  });

  it('rises by length × (1 − cos angle) at the end of its swing', () => {
    // 60 degrees on a 2 m string: 1 m above the bottom.
    expect(t.end).toBeCloseTo((2 * Math.PI) / 3, 9);
    expect(t.at(t.end).y).toBeCloseTo(1, 9);
    expect(t.at(t.start).y).toBeCloseTo(1, 9);
    expect(t.at(t.start).x).toBeCloseTo(-Math.sqrt(3), 9);
  });

  it('gives the same track for the same path', () => {
    expect(trackOf(path)).toBe(t);
  });
});

describe('checkPath', () => {
  it('accepts a hill and a pendulum', () => {
    expect(checkPath({ g: 9.8, points: [[0, 3], [6, 0]] })).toEqual([]);
    expect(checkPath({ g: 9.8, swing: { length: 2, angle: 40 } })).toEqual([]);
  });

  it('reports points out of order, a single point, and a missing g', () => {
    expect(checkPath({ g: 9.8, points: [[0, 3], [0, 0]] })).toHaveLength(1);
    expect(checkPath({ g: 9.8, points: [[0, 3]] })).toHaveLength(1);
    expect(checkPath({ g: 0, swing: { length: 2, angle: 40 } })).toHaveLength(1);
  });
});
