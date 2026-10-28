/**
 * Line (skeletal) formulas drawn as plane figures: the carbon chain as a zigzag, a branch as a short
 * line, a double bond as a second, shorter line beside the first, and rings as polygons. Only
 * hydrocarbons are drawn: carbons and their hydrogens are not labelled, as in a line formula.
 */
import { hydrogens, isAlkyl, numbered, type Alkyl, type Skeleton } from '../../../chem/organic.ts';
import type { PlaneFigure, PlaneSegment } from '../../../types.ts';

type P = [number, number];
const DX = Math.sqrt(3) / 2;
const r3 = (v: number) => Math.round(v * 1000) / 1000;
const pt = (p: P): P => [r3(p[0]), r3(p[1])];
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const scale = (a: P, k: number): P => [a[0] * k, a[1] * k];

/** A figure from lines, its grid one cell bigger than the drawing so no grid lines or axes show. */
function drawing(polylines: P[][], segments: Array<[P, P]>, caption?: string): PlaneFigure {
  const all = [...polylines.flat(), ...segments.flat()];
  const xs = all.map((p) => p[0]);
  const ys = all.map((p) => p[1]);
  // At least 6 bond lengths across, so a small molecule is drawn at the same scale as a large one.
  const width = Math.max(Math.max(...xs) - Math.min(...xs) + 1, 6);
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
  const pad = 0.5;
  const [xMin, xMax, yMin, yMax] = [cx - width / 2, cx + width / 2, Math.min(...ys) - pad, Math.max(...ys) + pad].map(r3);
  const step = Math.ceil(Math.max(xMax - xMin, yMax - yMin)) + 1;
  return {
    type: 'plane',
    grid: { xMin, xMax, yMin, yMax, step },
    polylines: polylines.map((pts) => ({ points: pts.map(pt), color: 'brand' as const })),
    segments: segments.map(([a, b]): PlaneSegment => ({ from: pt(a), to: pt(b), color: 'brand' })),
    hideTickLabels: true,
    hideAxes: true,
    ...(caption && { caption }),
  };
}

/** The second line of a double bond: beside the bond, on the side `toward` points to, and shorter. */
function innerLine(a: P, b: P, toward: P): [P, P] {
  const d: P = [b[0] - a[0], b[1] - a[1]];
  const len = Math.hypot(d[0], d[1]);
  let n: P = [-d[1] / len, d[0] / len];
  const mid: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  if ((toward[0] - mid[0]) * n[0] + (toward[1] - mid[1]) * n[1] < 0) n = scale(n, -1);
  const off = scale(n, 0.17);
  return [add(add(a, scale(d, 0.18)), off), add(add(a, scale(d, 0.82)), off)];
}

/**
 * The line formula of an acyclic hydrocarbon with alkyl branches and at most one double bond, carbon
 * 1 at the left (or at the right with `mirror`). Branches on the same carbon fan out.
 */
export function lineFormula(sk: Skeleton, opts: { mirror?: boolean; caption?: string } = {}): PlaneFigure {
  const s = numbered(sk);
  if (s.chain < 3 || s.group || (s.bond && s.bond.order !== 2) || (s.subs ?? []).some((x) => !isAlkyl(x.prefix))) throw new Error('Only alkanes and alkenes of three or more carbons are drawn.');
  const sign = opts.mirror ? -1 : 1;
  const v = (i: number): P => [sign * i * DX, i % 2 ? 0.5 : 0];
  const chain = Array.from({ length: s.chain }, (_, i) => v(i));
  const segments: Array<[P, P]> = [];
  for (let i = 0; i < s.chain; i++) {
    const here = (s.subs ?? []).filter((x) => x.at === i + 1);
    if (!here.length) continue;
    const up = i % 2 === 1 ? 1 : -1;
    const dirs: P[] = here.length === 1 ? [[0, up]] : [[0.5, up * DX], [-0.5, up * DX]];
    here.forEach((x, k) => {
      const d = dirs[k];
      const end = add(chain[i], d);
      segments.push([chain[i], end]);
      // An ethyl or propyl group zigzags on, turning towards the right.
      let prev = end;
      let dir = d;
      for (let c = 1; c < ({ methyl: 1, ethyl: 2, propyl: 3 } as Record<Alkyl, number>)[x.prefix as Alkyl]; c++) {
        const a = Math.atan2(dir[1], dir[0]);
        const turns = [a - Math.PI / 3, a + Math.PI / 3].map((t): P => [Math.cos(t), Math.sin(t)]);
        dir = c % 2 ? (turns[0][0] * sign >= turns[1][0] * sign ? turns[0] : turns[1]) : d;
        const next = add(prev, dir);
        segments.push([prev, next]);
        prev = next;
      }
    });
  }
  if (s.bond) {
    const i = s.bond.at - 1;
    // Inside the angle of the chain: towards the next carbon along, or the one before.
    const other = chain[i + 2] ?? chain[i - 1];
    segments.push(innerLine(chain[i], chain[i + 1], other));
  }
  // Hydrogens are implied; the count is only checked to keep the drawing honest.
  if (hydrogens(s).some((h) => h < 0)) throw new Error('Impossible skeleton.');
  return drawing([chain], segments, opts.caption);
}

export type RingKind = 'cycloalkane' | 'cycloalkene' | 'benzene';

/** A ring of `n` carbons drawn as a regular polygon: single bonds, one double bond, or benzene's circle. A methyl branch is optional. */
export function ringFormula(n: number, kind: RingKind, opts: { methyl?: boolean; caption?: string } = {}): PlaneFigure {
  const r = 1 / (2 * Math.sin(Math.PI / n));
  // A flat bottom edge: vertices from the lower left, anticlockwise.
  const start = -Math.PI / 2 - Math.PI / n;
  const pts: P[] = Array.from({ length: n }, (_, k) => [r * Math.cos(start + (2 * Math.PI * k) / n), r * Math.sin(start + (2 * Math.PI * k) / n)]);
  const ring = [...pts, pts[0]];
  const polylines: P[][] = [ring];
  const segments: Array<[P, P]> = [];
  if (kind === 'cycloalkene') segments.push(innerLine(pts[n - 2], pts[n - 1], [0, 0]));
  if (kind === 'benzene') {
    const a = r * Math.cos(Math.PI / n) * 0.62;
    polylines.push(Array.from({ length: 37 }, (_, k): P => [a * Math.cos((k * Math.PI) / 18), a * Math.sin((k * Math.PI) / 18)]));
  }
  if (opts.methyl) {
    // On the top vertex (or the upper right one), pointing away from the centre.
    const top = pts.reduce((best, p) => (p[1] > best[1] + 1e-9 || (Math.abs(p[1] - best[1]) < 1e-9 && p[0] > best[0]) ? p : best), pts[0]);
    const len = Math.hypot(top[0], top[1]);
    segments.push([top, add(top, scale(top, 1 / len))]);
  }
  return drawing(polylines, segments, opts.caption);
}
