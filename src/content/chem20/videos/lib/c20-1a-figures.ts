/**
 * Figures for the first half of the Diversity of Matter and Chemical Bonding videos (Grade 11
 * Chemistry, unit 1, lessons 1.1 to 1.4), built only from standard diagram parts (lines, curves,
 * shaded regions and labels), so each goes into a diagram with `figure`:
 *
 * - `tag`: a label (TeX) at a point.
 * - `arrow`: a straight arrow with a label; `curvedArrow`: an electron's move from atom to atom.
 * - `bracket`: square brackets round any drawing (an atom from `atomShells`), with a charge.
 * - `columnRow`: a number under each column of `periodicTable` (up to element 20): the valence
 *   electrons of each group, or the charge of each group's ions.
 * - `chargeBars`: the charges of an ionic compound's ions as bars, two 3+ as long as three 2−.
 * - `lattice`: a slice of an ionic lattice, small positive ions and large negative ions in turn.
 * - `ionRow`: a row of ions, + and − in turn, for a layer of an ionic crystal.
 * - `ionBox`: an ionic compound in a container, as a solid (ions in place) or molten (ions moving).
 * - `balls`: a ball model of a polyatomic ion (in brackets, with its charge).
 * - `enTable`: the course's electronegativity values, laid out like the periodic table, each cell
 *   shaded by its value, with arrows for the trends across a period and down a group.
 * - `bondPair`: two atoms and the shared pair of electrons between them, drawn closer to the atom
 *   that pulls harder, with partial charges.
 * - `enScale`: the electronegativity difference as a scale from 0, cut at 0.5 and 1.7 into
 *   non-polar covalent, polar covalent and ionic, with bonds marked on it.
 *
 * The Bohr diagrams (`atomShells`), Lewis structures (`lewis`) and the periodic table come from
 * `src/video/chem.ts`. Positive ions are orange and negative ions blue in every video of the unit.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Point names round a circle, added to `points`; `steps` points, starting on the right. */
function ring(points: Record<string, P>, id: string, c: P, r: number, steps = 32): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const a = (2 * Math.PI * j) / steps;
    points[`${id}-${j}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${id}-${j}`;
  });
}

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/** An arrow from `from` to `to`, with a label (TeX) beside its middle. Part: its `id`. */
export function arrow(id: string, from: P, to: P, o: { label?: string; tone?: DiagramTone; side?: 'left' | 'right'; group?: string; weight?: number } = {}): Part {
  return {
    points: { [`${id}-a`]: from, [`${id}-b`]: to },
    items: [
      {
        kind: 'line',
        id,
        from: `${id}-a`,
        to: `${id}-b`,
        arrow: true,
        weight: o.weight ?? 3,
        tone: o.tone ?? 'ink',
        ...(o.label ? { label: o.label } : {}),
        ...(o.side ? { labelSide: o.side } : {}),
        ...(o.group ? { group: o.group } : {}),
      },
    ],
  };
}

/**
 * A curved arrow from `from` to `to`, bowed `lift` to the left of the way it goes (a negative lift
 * bows it to the right), as an electron moves from one atom to another. Part: `id` (a group: the
 * curve `id-arc` and the arrowhead's line `id-tip`).
 */
export function curvedArrow(id: string, from: P, to: P, lift: number, tone: DiagramTone = 'opp'): Part {
  const d: P = [to[0] - from[0], to[1] - from[1]];
  const ctrl: P = [(from[0] + to[0]) / 2 - d[1] * lift, (from[1] + to[1]) / 2 + d[0] * lift];
  const points: Record<string, P> = {};
  const names: string[] = [];
  const steps = 16;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    points[`${id}-k${i}`] = [(1 - t) * (1 - t) * from[0] + 2 * (1 - t) * t * ctrl[0] + t * t * to[0], (1 - t) * (1 - t) * from[1] + 2 * (1 - t) * t * ctrl[1] + t * t * to[1]];
    names.push(`${id}-k${i}`);
  }
  return {
    points,
    items: [
      { kind: 'curve', id: `${id}-arc`, points: names.slice(0, steps), tone, weight: 3, group: id },
      { kind: 'line', id: `${id}-tip`, from: names[steps - 1], to: names[steps], tone, weight: 3, arrow: true, group: id },
    ],
  };
}

/**
 * Square brackets round the box `c` ± `half`, and the charge (TeX) at the top right.
 * Parts: `bracket` (a group: both brackets and the charge `charge`).
 */
export function bracket(o: { name?: string; c: P; half: P; charge: string; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const [cx, cy] = o.c;
  const [hx, hy] = o.half;
  const t = Math.min(0.4, hx * 0.15);
  const points: Record<string, P> = {
    [n('bl0')]: [cx - hx + t, cy + hy],
    [n('bl1')]: [cx - hx, cy + hy],
    [n('bl2')]: [cx - hx, cy - hy],
    [n('bl3')]: [cx - hx + t, cy - hy],
    [n('br0')]: [cx + hx - t, cy + hy],
    [n('br1')]: [cx + hx, cy + hy],
    [n('br2')]: [cx + hx, cy - hy],
    [n('br3')]: [cx + hx - t, cy - hy],
    [n('q')]: [cx + hx + 0.05, cy + hy],
  };
  const items: DiagramItem[] = [];
  for (const s of ['l', 'r'])
    for (let i = 0; i < 3; i++) items.push({ kind: 'line', id: n(`b${s}${i}`), from: n(`b${s}${i}`), to: n(`b${s}${i + 1}`), weight: 3, tone: o.tone ?? 'ink', group: n('bracket') });
  items.push({ kind: 'label', id: n('charge'), at: n('q'), tex: o.charge, place: 'above right', tone: o.tone ?? 'ink', group: n('bracket') });
  return { points, items };
}

/**
 * A number (TeX) under each of the eight columns of `periodicTable` drawn up to element 20 (four
 * periods), at height `y` (−0.45 by default). Each entry is [group number, TeX, tone]. Parts:
 * `c<group>` for each (`c1`, `c13`…) and `row` (a group of them all).
 */
export function columnRow(o: { name?: string; y?: number; cols: [number, string, DiagramTone][] }): Part {
  const n = namer(o.name);
  const GROUPS = [1, 2, 13, 14, 15, 16, 17, 18];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const [g, tex, tone] of o.cols) {
    const col = GROUPS.indexOf(g) + 1;
    points[n(`c${g}-at`)] = [col - 0.5, o.y ?? -0.45];
    items.push({ kind: 'label', id: n(`c${g}`), at: n(`c${g}-at`), tex, tone, place: 'center', group: n('row') });
  }
  return { points, items };
}

/**
 * Charges as bars, to show them cancelling: a row of positive ions (orange) over a row of
 * negative ions (blue), each ion a bar as long as the size of its charge (`unit` long for each
 * charge, 1 by default), with its symbol (TeX) in it and each row's total charge at its right end.
 * Two Al³⁺ bars (3 + 3) are as long as three O²⁻ bars (2 + 2 + 2).
 *
 * Parts: `p0`, `p1`… and `m0`, `m1`… (groups: each bar with its symbol), and the totals `p-total`
 * and `m-total`.
 */
export function chargeBars(o: { name?: string; plus: { count: number; size: number; tex: string }; minus: { count: number; size: number; tex: string }; unit?: number; plusTotal?: string; minusTotal?: string }): Part {
  const n = namer(o.name);
  const u = o.unit ?? 1;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const h = 0.9;
  const rows: ['p' | 'm', { count: number; size: number; tex: string }, number, DiagramTone][] = [
    ['p', o.plus, 1.3, 'opp'],
    ['m', o.minus, 0, 'adj'],
  ];
  for (const [k, row, y, tone] of rows) {
    for (let i = 0; i < row.count; i++) {
      const id = n(`${k}${i}`);
      const x0 = i * row.size * u;
      const x1 = (i + 1) * row.size * u;
      const corners = [`${id}-0`, `${id}-1`, `${id}-2`, `${id}-3`];
      Object.assign(points, { [corners[0]]: [x0 + 0.04, y], [corners[1]]: [x1 - 0.04, y], [corners[2]]: [x1 - 0.04, y + h], [corners[3]]: [x0 + 0.04, y + h], [`${id}-c`]: [(x0 + x1) / 2, y + h / 2] });
      items.push(
        { kind: 'region', id: `${id}-fill`, points: corners, tone, shade: 0.3, group: id },
        { kind: 'curve', id: `${id}-edge`, points: corners, closed: true, tone, weight: 2.5, group: id },
        { kind: 'label', id: `${id}-text`, at: `${id}-c`, tex: row.tex, place: 'center', group: id },
      );
    }
    const total = row.count * row.size;
    points[n(`${k}-end`)] = [total * u + 0.15, y + h / 2];
    const text = k === 'p' ? (o.plusTotal ?? `${total}{+}`) : (o.minusTotal ?? `${total}{-}`);
    items.push({ kind: 'label', id: n(`${k}-total`), at: n(`${k}-end`), tex: text, tone, place: 'right' });
  }
  return { points, items };
}

/** A shaded ball with an edge and a sign or symbol in it: the parts `id`, `id-edge` and `id-q`. */
function ball(points: Record<string, P>, items: DiagramItem[], id: string, c: P, r: number, tone: DiagramTone, sign: string, group: string) {
  const ids = ring(points, id, c, r, 24);
  points[`${id}-c`] = c;
  items.push(
    { kind: 'region', id, points: ids, tone, shade: 0.35, group },
    { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone, weight: 2.5, group },
    { kind: 'label', id: `${id}-q`, at: `${id}-c`, tex: sign, place: 'center', group },
  );
}

/**
 * A slice of an ionic lattice: `cols` by `rows` ions, `gap` apart (1.2 by default), small
 * positive ions and large negative ions in turn, with a positive ion at the bottom left. `plus`
 * and `minus` are what the ions show (+ and − by default). With `ring` ([row, column] from the
 * bottom left), a dashed circle rings that ion and its four neighbours.
 *
 * Parts: `cations` and `anions` (groups of the positive and negative ions), each ion `i<row>-<col>`
 * (with its edge `i<row>-<col>-edge` and sign `i<row>-<col>-q`), and `ring`.
 */
export function lattice(o: { name?: string; cols: number; rows: number; gap?: number; at?: P; plus?: string; minus?: string; ring?: [number, number] }): Part {
  const n = namer(o.name);
  const g = o.gap ?? 1.2;
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let row = 0; row < o.rows; row++)
    for (let col = 0; col < o.cols; col++) {
      const pos = (row + col) % 2 === 0;
      ball(points, items, n(`i${row}-${col}`), [x0 + col * g, y0 + row * g], pos ? 0.3 * g : 0.43 * g, pos ? 'opp' : 'adj', pos ? (o.plus ?? '+') : (o.minus ?? '-'), n(pos ? 'cations' : 'anions'));
    }
  if (o.ring) {
    const [row, col] = o.ring;
    items.push({ kind: 'curve', id: n('ring'), points: ring(points, n('ring'), [x0 + col * g, y0 + row * g], 1.62 * g, 48), closed: true, tone: 'theta', dashed: true, weight: 2.5 });
  }
  return { points, items };
}

/**
 * A row of `count` ions, `gap` apart (1.2 by default), + and − in turn starting with `first`, as
 * a layer of an ionic crystal. Parts: `row` (a group of every ion: `j0`, `j1`…, each with its edge
 * and sign).
 */
export function ionRow(o: { name?: string; count: number; first: '+' | '-'; gap?: number; at?: P }): Part {
  const n = namer(o.name);
  const g = o.gap ?? 1.2;
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i < o.count; i++) {
    const pos = (i % 2 === 0) === (o.first === '+');
    ball(points, items, n(`j${i}`), [x0 + i * g, y0], 0.4 * g, pos ? 'opp' : 'adj', pos ? '+' : '-', n('row'));
  }
  return { points, items };
}

/** The same numbers every time, from a seed (mulberry32). */
function random(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * An ionic compound in a container (`size` across, 5 by default, open at the top), as a solid or a
 * liquid: positive (orange) and negative (blue) ions in turn in neat rows, or, `molten`, jumbled
 * and loosened (the same way every time, from `seed`). `at` is the bottom left corner.
 *
 * Parts: `box` (a group: the container), `ions` (a group: every ion, with its sign).
 */
export function ionBox(o: { name?: string; at?: P; size?: number; molten?: boolean; seed?: number }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const size = o.size ?? 5;
  const rand = random(o.seed ?? 3);
  const points: Record<string, P> = {
    [n('c0')]: [x0, y0 + size],
    [n('c1')]: [x0, y0],
    [n('c2')]: [x0 + size, y0],
    [n('c3')]: [x0 + size, y0 + size],
  };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('side-l'), from: n('c0'), to: n('c1'), weight: 3, tone: 'muted', group: n('box') },
    { kind: 'line', id: n('floor'), from: n('c1'), to: n('c2'), weight: 3, tone: 'muted', group: n('box') },
    { kind: 'line', id: n('side-r'), from: n('c2'), to: n('c3'), weight: 3, tone: 'muted', group: n('box') },
  ];
  const g = 0.95;
  const cols = 5;
  const rows = 4;
  const left = x0 + (size - (cols - 1) * g) / 2;
  const spots: [P, boolean][] = [];
  for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) spots.push([[left + col * g, y0 + 0.55 + row * g], (row + col) % 2 === 0]);
  if (o.molten) {
    // Shuffle the signs, and nudge each ion off its place (a liquid's particles touch but move).
    for (let i = spots.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [spots[i][1], spots[j][1]] = [spots[j][1], spots[i][1]];
    }
    spots.forEach((s, i) => {
      const row = Math.floor(i / cols);
      s[0] = [s[0][0] + (rand() - 0.5) * 0.35 + (row % 2 ? 0.2 : -0.1), s[0][1] + (rand() - 0.5) * 0.25];
    });
  }
  spots.forEach(([c, pos], i) => ball(points, items, n(`ion${i}`), c, pos ? 0.3 : 0.4, pos ? 'opp' : 'adj', pos ? '+' : '-', n('ions')));
  return { points, items };
}

/**
 * A ball model of an ion or molecule: each atom a shaded ball with its symbol, `r` across (0.5 by
 * default), joined by `bonds` (lines between centres); with `charge`, square brackets round it
 * all (`half` the box's half-width and half-height, from the middle of the atoms) with the charge.
 *
 * Parts: `model` (a group: every ball and bond) and, with a charge, `bracket` (a group, with
 * `charge`).
 */
export function balls(o: { name?: string; atoms: { id: string; symbol: string; at: P; r?: number; tone: DiagramTone }[]; bonds?: [string, string][]; charge?: string; half?: P }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const at = new Map(o.atoms.map((a) => [a.id, a.at]));
  for (const [a, b] of o.bonds ?? []) {
    points[n(`${a}-${b}-a`)] = at.get(a)!;
    points[n(`${a}-${b}-b`)] = at.get(b)!;
    items.push({ kind: 'line', id: n(`bond-${a}-${b}`), from: n(`${a}-${b}-a`), to: n(`${a}-${b}-b`), tone: 'muted', weight: 6, group: n('model') });
  }
  for (const a of o.atoms) ball(points, items, n(a.id), a.at, a.r ?? 0.5, a.tone, `\\text{${a.symbol}}`, n('model'));
  const xs = o.atoms.map((a) => a.at[0]);
  const ys = o.atoms.map((a) => a.at[1]);
  const c: P = [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2];
  if (!o.charge) return { points, items };
  const half = o.half ?? [(Math.max(...xs) - Math.min(...xs)) / 2 + 0.85, (Math.max(...ys) - Math.min(...ys)) / 2 + 0.85];
  const b = bracket({ name: o.name, c, half, charge: o.charge });
  return { points: { ...points, ...b.points }, items: [...items, ...b.items] };
}

/** The course's electronegativity values (Pauling scale, one decimal place), as [symbol, period, column 1–7, value]. */
const EN: [string, number, number, number][] = [
  ['H', 1, 1, 2.2],
  ['Li', 2, 1, 1.0], ['Be', 2, 2, 1.6], ['B', 2, 3, 2.0], ['C', 2, 4, 2.6], ['N', 2, 5, 3.0], ['O', 2, 6, 3.4], ['F', 2, 7, 4.0],
  ['Na', 3, 1, 0.9], ['Mg', 3, 2, 1.3], ['Al', 3, 3, 1.6], ['Si', 3, 4, 1.9], ['P', 3, 5, 2.2], ['S', 3, 6, 2.6], ['Cl', 3, 7, 3.2],
  ['K', 4, 1, 0.8], ['Ca', 4, 2, 1.0], ['Br', 4, 7, 3.0],
  ['I', 5, 7, 2.7],
  ['Cs', 6, 1, 0.8], ['Ba', 6, 2, 0.9],
];

/**
 * The electronegativity values this course uses, laid out like the periodic table (groups 1, 2
 * and 13 to 17, periods 1 to 6; only the elements the course gives values for), each cell with
 * its symbol over its value and shaded more deeply the higher the value. Group numbers run along
 * the top and period numbers down the left. `highlights` ring sets of cells in a colour, and the
 * trend arrows sit below the table (across a period) and to its right (down a group).
 *
 * Parts: `table` (a group: every cell, value and number), each highlight by its `id` (a group of
 * rings round its cells), `across` (a group: the arrow below the table and its label) and `down`
 * (a group: the arrow to the right and its label).
 */
export function enTable(o: { name?: string; highlights?: { id: string; cells: string[]; tone: DiagramTone }[] } = {}): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const W = 1.25;
  const H = 1;
  const corner = (col: number, period: number): P => [(col - 1) * W, (6 - period) * H];
  const square = (id: string, col: number, period: number, inset: number): string[] => {
    const [x, y] = corner(col, period);
    const ids = [`${id}-0`, `${id}-1`, `${id}-2`, `${id}-3`];
    points[ids[0]] = [x + inset, y + inset];
    points[ids[1]] = [x + W - inset, y + inset];
    points[ids[2]] = [x + W - inset, y + H - inset];
    points[ids[3]] = [x + inset, y + H - inset];
    return ids;
  };
  for (const [sym, period, col, v] of EN) {
    const id = n(sym);
    const ids = square(`${id}-sq`, col, period, 0.04);
    const [x, y] = corner(col, period);
    points[`${id}-c`] = [x + W / 2, y + H / 2];
    items.push(
      { kind: 'region', id: `${id}-cell`, points: ids, tone: 'adj', shade: 0.06 + (0.5 * (v - 0.7)) / 3.3, group: n('table') },
      { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone: 'muted', weight: 1.5, group: n('table') },
      { kind: 'label', id, at: `${id}-c`, tex: `\\begin{gathered}\\small\\text{${sym}}\\\\[-5pt]\\scriptsize ${v.toFixed(1)}\\end{gathered}`, place: 'center', group: n('table') },
    );
  }
  [1, 2, 13, 14, 15, 16, 17].forEach((g, i) => {
    // Hydrogen sits alone in period 1, so each group number goes above its column's top cell.
    const top = Math.min(...EN.filter((e) => e[2] === i + 1).map((e) => e[1]));
    points[n(`g${g}`)] = [(i + 0.5) * W, (6 - top + 1) * H + 0.02];
    items.push({ kind: 'label', id: n(`group-${g}`), at: n(`g${g}`), tex: String(g), tone: 'muted', place: 'above', group: n('table') });
  });
  for (let p = 1; p <= 6; p++) {
    points[n(`p${p}`)] = [-0.08, (6 - p) * H + H / 2];
    items.push({ kind: 'label', id: n(`period-${p}`), at: n(`p${p}`), tex: String(p), tone: 'muted', place: 'left', group: n('table') });
  }
  for (const h of o.highlights ?? []) {
    for (const sym of h.cells) {
      const cell = EN.find((e) => e[0] === sym);
      if (!cell) throw new Error(`enTable: no value for "${sym}"`);
      items.push({ kind: 'curve', id: n(`${h.id}-${sym}`), points: square(n(`${h.id}-${sym}-ring`), cell[2], cell[1], 0.02), closed: true, tone: h.tone, weight: 4, group: n(h.id) });
    }
  }
  // The trends: across a period, below the table; down a group, to its right.
  Object.assign(points, {
    [n('ac-a')]: [0.2 * W, -0.45],
    [n('ac-b')]: [6.8 * W, -0.45],
    [n('dn-a')]: [7 * W + 0.5, 5.8 * H],
    [n('dn-b')]: [7 * W + 0.5, 0.2 * H],
    // Room to the right for the label of the arrow down a group.
    [n('room')]: [7 * W + 2.4, 3 * H],
    [n('room-l')]: [-2.4, 3 * H],
  });
  items.push(
    { kind: 'line', id: n('across-line'), from: n('ac-a'), to: n('ac-b'), arrow: true, tone: 'good', weight: 4, group: n('across') },
    { kind: 'label', id: n('across-label'), at: n('ac-a'), tex: '\\text{increases across a period}', tone: 'good', place: 'below right', group: n('across') },
    { kind: 'line', id: n('down-line'), from: n('dn-a'), to: n('dn-b'), arrow: true, tone: 'opp', weight: 4, group: n('down') },
    { kind: 'label', id: n('down-label'), at: n('dn-a'), tex: '\\begin{gathered}\\text{decreases}\\\\\\text{down a}\\\\\\text{group}\\end{gathered}', tone: 'opp', place: 'below right', group: n('down') },
  );
  return { points, items };
}

/**
 * Two atoms of a bond, `a` on the left and `b` on the right, `gap` apart (2.4 by default), with the
 * shared pair of electrons between them at `t` of the way from `a` to `b` (0.5 shares them
 * evenly; nearer 1 draws them towards `b`, which pulls harder), and a faint cloud round the pair.
 * With `deltas`, a partial charge (TeX, such as `\\delta+`) above each atom. With `ions`, the
 * electrons sit on `b` and each atom carries a full charge in square brackets instead.
 *
 * Parts: `a` and `b` (the symbols), `pair` (a group: the two electrons and the cloud), `deltas`
 * (a group: `da` and `db`) and, with `ions`, `charges` (a group: both brackets and charges).
 */
export function bondPair(o: { name?: string; at?: P; a: string; b: string; t?: number; gap?: number; deltas?: [string, string]; ions?: [string, string]; label?: string }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const gap = o.gap ?? 2.4;
  const t = o.ions ? 0.82 : (o.t ?? 0.5);
  const points: Record<string, P> = { [n('pa')]: [x0, y0], [n('pb')]: [x0 + gap, y0] };
  const items: DiagramItem[] = [];
  const m: P = [x0 + gap * t, y0];
  // The cloud: an oval round the pair, longer along the bond.
  const cloud = Array.from({ length: 24 }, (_, j) => {
    const a = (2 * Math.PI * j) / 24;
    points[n(`cl${j}`)] = [m[0] + 0.5 * Math.cos(a), m[1] + 0.32 * Math.sin(a)];
    return n(`cl${j}`);
  });
  if (!o.ions) items.push({ kind: 'region', id: n('cloud'), points: cloud, tone: 'adj', shade: 0.2, group: n('pair') });
  Object.assign(points, { [n('e0')]: [m[0], y0 + 0.13], [n('e1')]: [m[0], y0 - 0.13] });
  items.push(
    { kind: 'label', id: n('e0'), at: n('e0'), tex: '', dot: true, tone: 'adj', place: 'center', group: n('pair') },
    { kind: 'label', id: n('e1'), at: n('e1'), tex: '', dot: true, tone: 'adj', place: 'center', group: n('pair') },
    { kind: 'label', id: n('a'), at: n('pa'), tex: `\\text{${o.a}}`, place: 'center' },
    { kind: 'label', id: n('b'), at: n('pb'), tex: `\\text{${o.b}}`, place: 'center' },
  );
  if (o.deltas) {
    Object.assign(points, { [n('da-at')]: [x0, y0 + 0.55], [n('db-at')]: [x0 + gap, y0 + 0.55] });
    items.push(
      { kind: 'label', id: n('da'), at: n('da-at'), tex: o.deltas[0], tone: o.deltas[0].includes('+') ? 'opp' : 'adj', place: 'above', group: n('deltas') },
      { kind: 'label', id: n('db'), at: n('db-at'), tex: o.deltas[1], tone: o.deltas[1].includes('+') ? 'opp' : 'adj', place: 'above', group: n('deltas') },
    );
  }
  if (o.ions) {
    const left = bracket({ name: n('ia'), c: [x0, y0], half: [0.55, 0.6], charge: o.ions[0], tone: 'opp' });
    const right = bracket({ name: n('ib'), c: [x0 + gap + 0.25, y0], half: [0.8, 0.6], charge: o.ions[1], tone: 'adj' });
    for (const b of [left, right]) {
      Object.assign(points, b.points);
      for (const item of b.items) items.push({ ...item, group: n('charges') });
    }
  }
  if (o.label) {
    points[n('lab')] = [x0 + gap / 2, y0 - 0.75];
    items.push({ kind: 'label', id: n('label'), at: n('lab'), tex: o.label, tone: 'muted', place: 'below' });
  }
  // Room round the drawing for the charges.
  Object.assign(points, { [n('frame-a')]: [x0 - 0.9, y0 - 0.9], [n('frame-b')]: [x0 + gap + 1.2, y0 + 1.2] });
  return { points, items };
}

/**
 * The electronegativity difference as a scale from 0 to `max` (3.4 by default), `length` long (12
 * by default), shaded in three bands: below 0.5 non-polar covalent (green), 0.5 up to 1.7 polar
 * covalent (yellow) and 1.7 or more ionic (orange), each named under the scale, with the
 * cut-offs numbered. `marks` put a bond on the scale: a dot with its label above.
 *
 * Parts: `axis` (a group: the line and the numbers 0, 0.5 and 1.7), `nonpolar`, `polar` and
 * `ionic` (groups: each band and its name), and each mark by its `id`.
 */
export function enScale(o: { name?: string; max?: number; length?: number; at?: P; marks?: { id: string; value: number; tex: string; tone?: DiagramTone }[] }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const max = o.max ?? 3.4;
  const L = o.length ?? 12;
  const X = (v: number) => x0 + (v / max) * L;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const bands: [string, number, number, DiagramTone, string][] = [
    ['nonpolar', 0, 0.5, 'good', '\\begin{gathered}\\text{non-polar}\\\\\\text{covalent}\\end{gathered}'],
    ['polar', 0.5, 1.7, 'theta', '\\text{polar covalent}'],
    ['ionic', 1.7, max, 'opp', '\\text{ionic}'],
  ];
  const h = 0.32;
  for (const [id, from, to, tone, tex] of bands) {
    const c = [`${id}-0`, `${id}-1`, `${id}-2`, `${id}-3`].map(n);
    Object.assign(points, { [c[0]]: [X(from), y0 - h], [c[1]]: [X(to), y0 - h], [c[2]]: [X(to), y0 + h], [c[3]]: [X(from), y0 + h], [n(`${id}-mid`)]: [(X(from) + X(to)) / 2, y0 - h - 0.55] });
    items.push(
      { kind: 'region', id: n(`${id}-band`), points: c, tone, shade: 0.4, group: n(id) },
      { kind: 'label', id: n(`${id}-name`), at: n(`${id}-mid`), tex, tone, place: 'below', group: n(id) },
    );
  }
  Object.assign(points, { [n('L')]: [X(0), y0], [n('R')]: [X(max) + 0.4, y0] });
  items.push({ kind: 'line', id: n('line'), from: n('L'), to: n('R'), weight: 3, arrow: true, group: n('axis') });
  for (const [i, v] of [0, 0.5, 1.7].entries()) {
    Object.assign(points, { [n(`t${i}a`)]: [X(v), y0 - h - 0.1], [n(`t${i}b`)]: [X(v), y0 + h + 0.1] });
    items.push(
      { kind: 'line', id: n(`t${i}`), from: n(`t${i}a`), to: n(`t${i}b`), weight: 3, group: n('axis') },
      { kind: 'label', id: n(`num${i}`), at: n(`t${i}b`), tex: String(v), tone: 'muted', place: 'above', group: n('axis') },
    );
  }
  points[n('title-at')] = [X(max) + 0.4, y0];
  items.push({ kind: 'label', id: n('title'), at: n('title-at'), tex: '\\Delta\\text{EN}', place: 'right', group: n('axis') });
  for (const m of o.marks ?? []) {
    points[n(m.id)] = [X(m.value), y0];
    points[n(`${m.id}-top`)] = [X(m.value), y0 + h + 1.05];
    items.push(
      { kind: 'line', id: n(`${m.id}-stem`), from: n(m.id), to: n(`${m.id}-top`), tone: m.tone ?? 'ink', weight: 2.5, group: n(m.id) },
      { kind: 'label', id: n(`${m.id}-dot`), at: n(m.id), tex: '', dot: true, tone: m.tone ?? 'ink', place: 'center', group: n(m.id) },
      { kind: 'label', id: n(`${m.id}-label`), at: n(`${m.id}-top`), tex: m.tex, tone: m.tone ?? 'ink', place: 'above', group: n(m.id) },
    );
  }
  return { points, items };
}
