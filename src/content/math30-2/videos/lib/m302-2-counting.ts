/**
 * Figures for the Counting Methods videos. The tree diagram and the row of boxes are the ones the
 * Math 30-1 counting videos use; this file adds a table of the outcomes of two dice and a deck of
 * cards. Like the other helpers, they are built only from standard diagram parts, so each goes into
 * a diagram with `figure`:
 *
 * - `tree`: a tree diagram of two stages of choices (re-exported).
 * - `slots`: a row of boxes, one for each position to fill, with the number of choices in each
 *   (re-exported).
 * - `dice`: the 36 outcomes of a red die and a blue die, as a table of sums.
 * - `deck`: the 52 cards of a standard deck, one row for each suit.
 */
import type { DiagramItem } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

export { slots, tree } from '../../../math30-1/videos/lib/m301-9-counting.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/**
 * The sums of a red die (across the top) and a blue die (down the left side): one square for each
 * of the 36 outcomes, with the sum written in it.
 *
 * Parts: `grid` (a group: the lines), `red` and `blue` (groups: each die's numbers and title),
 * `sums` (a group: the sums), and for each total in `mark`, the shading of every square with that
 * sum as the group `s<total>` (`s7`), in the tone given.
 */
export function dice(o: { name?: string; mark?: { total: number; tone: 'good' | 'theta' | 'hyp' | 'adj' }[] }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // Column i (red die, 1 to 6) runs from x = i - 1 to i; row j (blue die, 1 to 6) from y = 6 - j to 7 - j.
  for (const m of o.mark ?? []) {
    for (let i = 1; i <= 6; i++) {
      const j = m.total - i;
      if (j < 1 || j > 6) continue;
      const c = (k: string) => n(`f${i}${j}${k}`);
      Object.assign(points, { [c('a')]: [i - 1, 6 - j], [c('b')]: [i, 6 - j], [c('c')]: [i, 7 - j], [c('d')]: [i - 1, 7 - j] });
      items.push({ kind: 'region', id: n(`f${i}-${j}`), points: ['a', 'b', 'c', 'd'].map(c), tone: m.tone, shade: 0.4, group: n(`s${m.total}`) });
    }
  }
  for (let k = 0; k <= 6; k++) {
    Object.assign(points, { [n(`v${k}a`)]: [k, 0], [n(`v${k}b`)]: [k, 6], [n(`h${k}a`)]: [0, k], [n(`h${k}b`)]: [6, k] });
    items.push(
      { kind: 'line', id: n(`gv${k}`), from: n(`v${k}a`), to: n(`v${k}b`), tone: 'muted', weight: 1.5, group: n('grid') },
      { kind: 'line', id: n(`gh${k}`), from: n(`h${k}a`), to: n(`h${k}b`), tone: 'muted', weight: 1.5, group: n('grid') },
    );
  }
  for (let i = 1; i <= 6; i++) {
    points[n(`R${i}`)] = [i - 0.5, 6.5];
    points[n(`B${i}`)] = [-0.5, 6.5 - i];
    items.push(
      { kind: 'label', id: n(`red${i}`), at: n(`R${i}`), tex: String(i), tone: 'bad', place: 'center', group: n('red') },
      { kind: 'label', id: n(`blue${i}`), at: n(`B${i}`), tex: String(i), tone: 'adj', place: 'center', group: n('blue') },
    );
    for (let j = 1; j <= 6; j++) {
      points[n(`S${i}${j}`)] = [i - 0.5, 6.5 - j];
      items.push({ kind: 'label', id: n(`sum${i}-${j}`), at: n(`S${i}${j}`), tex: String(i + j), tone: 'ink', place: 'center', group: n('sums') });
    }
  }
  points[n('RT')] = [3, 7.25];
  points[n('BT')] = [-1.45, 3];
  items.push(
    { kind: 'label', id: n('red-title'), at: n('RT'), tex: '\\text{red die}', tone: 'bad', place: 'center', group: n('red') },
    { kind: 'label', id: n('blue-title'), at: n('BT'), tex: '\\begin{matrix}\\text{blue}\\\\ \\text{die}\\end{matrix}', tone: 'adj', place: 'center', group: n('blue') },
  );
  return { points, items };
}

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS = [
  { name: 'hearts', tex: '\\heartsuit', tone: 'bad' },
  { name: 'diamonds', tex: '\\diamondsuit', tone: 'bad' },
  { name: 'clubs', tex: '\\clubsuit', tone: 'ink' },
  { name: 'spades', tex: '\\spadesuit', tone: 'ink' },
] as const;

/**
 * A standard deck of 52 cards: a row for each suit (hearts and diamonds in red, clubs and spades in
 * white), each with the 13 ranks A, 2 to 10, J, Q and K.
 *
 * Parts: `suits` (a group: the suit names on the left), each card in the group of its rank, `r0`
 * (the aces) to `r12` (the kings), so a rank can be shown or emphasised down all four suits.
 */
export function deck(o: { name?: string } = {}): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  SUITS.forEach((s, row) => {
    const y = 3 - row;
    points[n(`suit${row}`)] = [-0.4, y];
    items.push({ kind: 'label', id: n(`suit-${s.name}`), at: n(`suit${row}`), tex: `\\text{${s.name}}`, tone: 'muted', place: 'left', group: n('suits') });
    RANKS.forEach((r, k) => {
      points[n(`c${row}-${k}`)] = [k * 1.15 + 0.5, y];
      items.push({ kind: 'label', id: n(`card${row}-${k}`), at: n(`c${row}-${k}`), tex: `\\text{${r}}${s.tex}`, tone: s.tone, place: 'center', group: n(`r${k}`) });
    });
  });
  return { points, items };
}
