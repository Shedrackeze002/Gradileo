/**
 * Figures for the linear equations videos, built only from standard diagram parts, so each goes
 * into a diagram with `figure`:
 *
 * - `tileBalance`: a level pan balance (the stand and pans of the Grade 5 `balance`) with algebra
 *   tiles on each pan: a long green tile for x and a small orange square for 1, as in the lessons.
 *   The tiles come in named blocks, so the tiles taken off both sides, or shared out, can be shown
 *   and hidden block by block.
 *
 * Groups of tiles for brackets come from `tileGroups`, bar models from `bars` (Grade 6 helpers),
 * and the chain of operations and its inverses from `chain` (Grade 5 helpers).
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { balance } from '@/content/math5/videos/lib/m5-7-figures.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** A unit tile's side, and the distance from one unit tile to the next. */
const U = 0.5;
const UP = 0.6;
/** An x-tile's width and height, and the distance from one x-tile to the next. */
const XW = 0.5;
const XH = 1.5;
const XP = 0.62;
/** The space between blocks side by side, and between blocks stacked. */
const SIDE_GAP = 0.32;
const STACK_GAP = 0.14;

/**
 * A block of tiles: `x` x-tiles side by side (labelled `tex`, x by default), or `units` unit tiles
 * in rows of `perRow` (all in one row by default), from the bottom up, in `tone` (orange).
 */
export type TileBlock = { id: string; x?: number; tex?: string; units?: number; perRow?: number; tone?: DiagramTone };

/** The blocks on one pan: side by side, or `stack`ed one above another (each centred). */
export type TileSide = { blocks: TileBlock[]; stack?: boolean };

function size(b: TileBlock): P {
  if (b.x) return [b.x * XP - (XP - XW), XH];
  const units = b.units ?? 0;
  const per = Math.min(b.perRow ?? units, units);
  return [per * UP - (UP - U), Math.ceil(units / Math.max(per, 1)) * UP - (UP - U)];
}

function sideSize(s: TileSide): P {
  const sizes = s.blocks.map(size);
  if (s.stack) return [Math.max(0, ...sizes.map((z) => z[0])), sizes.reduce((t, z) => t + z[1], 0) + STACK_GAP * Math.max(0, sizes.length - 1)];
  return [sizes.reduce((t, z) => t + z[0], 0) + SIDE_GAP * Math.max(0, sizes.length - 1), Math.max(0, ...sizes.map((z) => z[1]))];
}

/** A filled rectangle with its outline, its corners added to `points`, in `group`. */
function rect(points: Record<string, P>, id: string, x0: number, y0: number, x1: number, y1: number, tone: DiagramTone, group: string, shade: number): DiagramItem[] {
  const names = ([[x0, y0], [x1, y0], [x1, y1], [x0, y1]] as P[]).map((p, i) => {
    points[`${id}-${i}`] = p;
    return `${id}-${i}`;
  });
  return [
    { kind: 'region', id: `${id}-fill`, points: names, tone, shade, group },
    { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone, weight: 2.5, group },
  ];
}

/**
 * A level pan balance with algebra tiles on its pans, for an equation such as 2x + 3 = 11. Each
 * side is a list of blocks of tiles, laid side by side from the left, or stacked from the bottom.
 * `labels` writes what each side stands for under its pan.
 *
 * Parts: `stand` (a group: the stand, beam and pans), each block `l-<id>` or `r-<id>` (a group: its
 * tiles), and `labels` (a group: `llabel` and `rlabel`).
 */
export function tileBalance(o: { name?: string; left: TileSide; right: TileSide; labels?: [string, string]; pan?: number }): Part {
  const n = namer(o.name);
  const [lw] = sideSize(o.left);
  const [rw] = sideSize(o.right);
  const W = o.pan ?? Math.max(lw, rw, 1.5) + 0.7;
  const stand = balance({ name: o.name, left: {}, right: {}, pan: W, labels: o.labels });
  const arm = W / 2 + 0.75;
  const floor = 1.65 + 0.08;
  const points: Record<string, P> = { ...stand.points };
  const items: DiagramItem[] = [...stand.items];
  for (const [key, side, cx] of [['l', o.left, -arm], ['r', o.right, arm]] as const) {
    const [sw] = sideSize(side);
    let x = cx - sw / 2;
    let y = floor;
    for (const b of side.blocks) {
      const [bw, bh] = size(b);
      const left = side.stack ? cx - bw / 2 : x;
      const group = n(`${key}-${b.id}`);
      if (b.x) {
        for (let k = 0; k < b.x; k++) {
          const id = n(`${key}${b.id}-x${k}`);
          const x0 = left + k * XP;
          items.push(...rect(points, id, x0, y, x0 + XW, y + XH, 'good', group, 0.45));
          points[`${id}-c`] = [x0 + XW / 2, y + XH / 2];
          items.push({ kind: 'label', id: `${id}-tex`, at: `${id}-c`, tex: b.tex ?? 'x', tone: 'ink', place: 'center', group });
        }
      } else {
        const units = b.units ?? 0;
        const per = Math.max(1, Math.min(b.perRow ?? units, units));
        for (let k = 0; k < units; k++) {
          const id = n(`${key}${b.id}-u${k}`);
          const x0 = left + (k % per) * UP;
          const y0 = y + Math.floor(k / per) * UP;
          items.push(...rect(points, id, x0, y0, x0 + U, y0 + U, b.tone ?? 'opp', group, 0.55));
        }
      }
      if (side.stack) y += bh + STACK_GAP;
      else x += bw + SIDE_GAP;
    }
  }
  return { points, items };
}

/** The parts of a tile balance `fig` (made with no name) that show it with every block listed. */
export const balanceParts = (fig: string, left: string[], right: string[]): string[] => [`${fig}.stand`, `${fig}.labels`, ...left.map((b) => `${fig}.l-${b}`), ...right.map((b) => `${fig}.r-${b}`)];
