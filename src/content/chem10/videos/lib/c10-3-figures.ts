/**
 * Figures for the bonding, names and formulas videos (Grade 10 Chemistry, unit 3), built only from
 * standard diagram parts (lines, curves, shaded regions and labels), so each goes into a diagram
 * with `figure`:
 *
 * - `shellAtom`: an atom drawn the way a dot-and-cross diagram draws it: its symbol inside its outer
 *   shell, with that shell's electrons as dots (one atom's) or crosses (the other atom's), and, for
 *   an ion, square brackets with its charge.
 * - `shared`: the electrons two overlapping shells share, in the overlap (a covalent bond).
 * - `bracket`: square brackets round any drawing (an atom from `atomShells`), with a charge.
 * - `arrow`: an arrow with a label, such as "loses 1 electron", and `curvedArrow`, an electron's
 *   move from one shell to another.
 * - `balls`: a ball model of a polyatomic ion (in brackets, with its charge) or a molecule.
 * - `chargeBars`: the charges of an ionic compound's ions as bars, two 3+ as long as three 2−.
 * - `chargeRow`: the charge of each group's ions, under the columns of `periodicTable` (up to 20).
 * - `lattice`: a slice of an ionic lattice, small positive ions and large negative ions in turn.
 * - `ionBox`: an ionic compound in a container, as a solid (ions in place) or molten (ions moving).
 * - `ionRow`: a row of ions, + and − in turn, for a layer of an ionic crystal sliding along.
 * - `molecular`: small molecules of two atoms, with the weak forces between them dashed.
 * - `network`: atoms each joined to four neighbours, for a giant covalent structure.
 * - `graphite`: a layer of graphite from above, each carbon joined to three others, with free electrons.
 * - `metal`: positive metal ions in a sea of moving electrons.
 * - `card`: a box with a line of text in it, for a flow chart.
 * - `tag`: a label (TeX) at a point.
 *
 * The Bohr diagrams (`atomShells`) and the periodic table come from `src/video/chem.ts`. Dots are
 * blue and crosses orange, and positive ions orange and negative ions blue, in every video of the
 * unit.
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

/** One electron: a dot (`o`, blue) or a cross (`x`, orange). */
function electron(points: Record<string, P>, items: DiagramItem[], id: string, at: P, kind: string, group: string) {
  points[`${id}-p`] = at;
  items.push(
    kind === 'x'
      ? { kind: 'label', id, at: `${id}-p`, tex: '\\small\\boldsymbol{\\times}', tone: 'opp', place: 'center', group }
      : { kind: 'label', id, at: `${id}-p`, tex: '', dot: true, tone: 'adj', place: 'center', group },
  );
}

/**
 * Square brackets round the box `c` ± `half`, and the charge (TeX) at the top right.
 * Parts: `bracket` (a group: both brackets and the charge `charge`).
 */
export function bracket(o: { name?: string; c: P; half: P; charge: string }): Part {
  const n = namer(o.name);
  const [cx, cy] = o.c;
  const [hx, hy] = o.half;
  const t = Math.min(0.3, hx * 0.2);
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
    for (let i = 0; i < 3; i++) items.push({ kind: 'line', id: n(`b${s}${i}`), from: n(`b${s}${i}`), to: n(`b${s}${i + 1}`), weight: 3, group: n('bracket') });
  items.push({ kind: 'label', id: n('charge'), at: n('q'), tex: o.charge, place: 'above right', group: n('bracket') });
  return { points, items };
}

/**
 * An atom in a dot-and-cross diagram: its symbol inside a circle for its outer shell (radius `r`,
 * 1.3 by default; `shell: false` leaves the circle out), with electrons on the shell. Each spot is
 * an angle in degrees (0 on the right, 90 at the top) and the electrons there: `'o'` a dot, `'x'`
 * a cross, two letters a pair side by side (`'oo'`, `'ox'`). With `charge`, the atom is drawn in
 * square brackets with its charge at the top right.
 *
 * Parts: `atom` (a group: the symbol `sym`, the shell `shell` and the electrons, the dots `o0`,
 * `o1`… and the crosses `x0`, `x1`…) and, with a charge, `bracket` (a group, with `charge`).
 */
export function shellAtom(o: { name?: string; at?: P; symbol: string; r?: number; spots?: [number, string][]; shell?: boolean; charge?: string; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const c = o.at ?? [0, 0];
  const r = o.r ?? 1.3;
  const points: Record<string, P> = { [n('c')]: c };
  const items: DiagramItem[] = [];
  const group = n('atom');
  if (o.shell !== false) items.push({ kind: 'curve', id: n('shell'), points: ring(points, n('ring'), c, r, 48), closed: true, tone: 'muted', weight: 2.5, group });
  items.push({ kind: 'label', id: n('sym'), at: n('c'), tex: `\\text{${o.symbol}}`, place: 'center', group, ...(o.tone ? { tone: o.tone } : {}) });
  const count = { o: 0, x: 0 };
  // The two electrons of a pair sit 0.44 apart along the shell.
  const half = 0.22 / r;
  for (const [deg, marks] of o.spots ?? []) {
    const a = (deg * Math.PI) / 180;
    const angles = marks.length === 1 ? [a] : [a + half, a - half];
    [...marks].forEach((kind, i) => {
      const k = kind === 'x' ? 'x' : 'o';
      electron(points, items, n(`${k}${count[k]++}`), [c[0] + r * Math.cos(angles[i]), c[1] + r * Math.sin(angles[i])], k, group);
    });
  }
  // Room round the drawing, so atoms side by side do not crowd.
  const out = r + 0.35;
  Object.assign(points, { [n('frame-a')]: [c[0] - out, c[1] - out], [n('frame-b')]: [c[0] + out, c[1] + out] });
  const part: Part = { points, items };
  if (!o.charge) return part;
  const b = bracket({ name: o.name, c, half: [r + 0.25, r + 0.25], charge: o.charge });
  return { points: { ...points, ...b.points }, items: [...items, ...b.items] };
}

/**
 * The electrons shared between two overlapping shells (centres `a` and `b`, radii `ra` and `rb`,
 * 1.3 by default), placed in the overlap: one row for each shared pair, its first letter's
 * electron on `a`'s side (`'ox'`: a dot from `a`'s atom and a cross from `b`'s).
 *
 * Parts: `bond` (a group of the shared electrons, `s0`, `s1`…).
 */
export function shared(o: { name?: string; a: P; b: P; ra?: number; rb?: number; pairs: string[] }): Part {
  const n = namer(o.name);
  const ra = o.ra ?? 1.3;
  const rb = o.rb ?? 1.3;
  const d = Math.hypot(o.b[0] - o.a[0], o.b[1] - o.a[1]);
  const u: P = [(o.b[0] - o.a[0]) / d, (o.b[1] - o.a[1]) / d];
  const v: P = [-u[1], u[0]];
  // The middle of the overlap, along the line between the centres.
  const along = (d - rb + ra) / 2;
  const m: P = [o.a[0] + u[0] * along, o.a[1] + u[1] * along];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const k = o.pairs.length;
  let e = 0;
  o.pairs.forEach((pair, row) => {
    const off = (row - (k - 1) / 2) * 0.4;
    [...pair].forEach((kind, i) => {
      const s = i === 0 ? -0.2 : 0.2;
      electron(points, items, n(`s${e++}`), [m[0] + v[0] * off + u[0] * s, m[1] + v[1] * off + u[1] * s], kind, n('bond'));
    });
  });
  return { points, items };
}

/** An arrow from `from` to `to`, with a label (TeX) beside its middle. Part: its `id`. */
export function arrow(id: string, from: P, to: P, o: { label?: string; tone?: DiagramTone; side?: 'left' | 'right'; group?: string } = {}): Part {
  return {
    points: { [`${id}-a`]: from, [`${id}-b`]: to },
    items: [{ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, arrow: true, weight: 3, tone: o.tone ?? 'ink', ...(o.label ? { label: o.label } : {}), ...(o.side ? { labelSide: o.side } : {}), ...(o.group ? { group: o.group } : {}) }],
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
    const q: P = [(1 - t) * (1 - t) * from[0] + 2 * (1 - t) * t * ctrl[0] + t * t * to[0], (1 - t) * (1 - t) * from[1] + 2 * (1 - t) * t * ctrl[1] + t * t * to[1]];
    points[`${id}-k${i}`] = q;
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
 * The charge of each group's ions, written under its column of `periodicTable` (drawn up to
 * element 20, four periods): 1+, 2+ and 3+ under groups 1, 2 and 13, and 3−, 2− and 1− under
 * groups 15, 16 and 17. Parts: `q1`, `q2`, `q13`, `q15`, `q16` and `q17`, and `charges` (a group of
 * them all).
 */
export function chargeRow(o: { name?: string } = {}): Part {
  const n = namer(o.name);
  const cols: [number, number, string, DiagramTone][] = [
    [1, 1, '1+', 'opp'],
    [2, 2, '2+', 'opp'],
    [13, 3, '3+', 'opp'],
    [15, 5, '3{-}', 'adj'],
    [16, 6, '2{-}', 'adj'],
    [17, 7, '1{-}', 'adj'],
  ];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const [g, col, tex, tone] of cols) {
    points[n(`q${g}-at`)] = [col - 0.5, -0.45];
    items.push({ kind: 'label', id: n(`q${g}`), at: n(`q${g}-at`), tex, tone, place: 'center', group: n('charges') });
  }
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

/**
 * Charges as bars, to show them cancelling: a row of positive ions (orange) over a row of
 * negative ions (blue), each ion a bar as long as the size of its charge (`unit` long for each
 * charge, 1 by default), with its symbol (TeX) in it and each row's total charge at its right end.
 * Two Al³⁺ bars (3 + 3) are as long as three O²⁻ bars (2 + 2 + 2).
 *
 * Parts: `p0`, `p1`… and `m0`, `m1`… (groups: each bar with its symbol), and the totals `p-total`
 * and `m-total`.
 */
export function chargeBars(o: { name?: string; plus: { count: number; size: number; tex: string }; minus: { count: number; size: number; tex: string }; unit?: number }): Part {
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
    items.push({ kind: 'label', id: n(`${k}-total`), at: n(`${k}-end`), tex: k === 'p' ? `${total}{+}` : `${total}{-}`, tone, place: 'right' });
  }
  return { points, items };
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
  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++) spots.push([[left + col * g, y0 + 0.55 + row * g], (row + col) % 2 === 0]);
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
 * A simple molecular substance: `cols` by `rows` molecules of two atoms (like I₂), each pair of
 * balls joined by a strong covalent bond, with dashed lines for the weak forces between
 * neighbouring molecules. Parts: `molecules` (a group: every molecule) and `weak` (a group: the
 * dashed lines).
 */
export function molecular(o: { name?: string; cols: number; rows: number; at?: P; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const gx = 2.5;
  const gy = 1.7;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const centre = (row: number, col: number): P => [x0 + col * gx + (row % 2 ? gx / 2 : 0), y0 + row * gy];
  for (let row = 0; row < o.rows; row++)
    for (let col = 0; col < o.cols; col++) {
      const [cx, cy] = centre(row, col);
      if (col < o.cols - 1) {
        // A weak force to the next molecule along.
        points[n(`w${row}_${col}-a`)] = [cx + 0.95, cy];
        points[n(`w${row}_${col}-b`)] = [cx + gx - 0.95, cy];
        items.push({ kind: 'line', id: n(`w${row}_${col}`), from: n(`w${row}_${col}-a`), to: n(`w${row}_${col}-b`), dashed: true, tone: 'muted', weight: 2.5, group: n('weak') });
      }
      if (row < o.rows - 1) {
        // A weak force to the molecule above.
        const [ux, uy] = centre(row + 1, row % 2 ? col + 1 : col);
        if (row % 2 && col === o.cols - 1) continue;
        const d = Math.hypot(ux - cx, uy - cy);
        points[n(`u${row}_${col}-a`)] = [cx + ((ux - cx) / d) * 0.6, cy + ((uy - cy) / d) * 0.6];
        points[n(`u${row}_${col}-b`)] = [ux - ((ux - cx) / d) * 0.6, uy - ((uy - cy) / d) * 0.6];
        items.push({ kind: 'line', id: n(`u${row}_${col}`), from: n(`u${row}_${col}-a`), to: n(`u${row}_${col}-b`), dashed: true, tone: 'muted', weight: 2.5, group: n('weak') });
      }
    }
  for (let row = 0; row < o.rows; row++)
    for (let col = 0; col < o.cols; col++) {
      const [cx, cy] = centre(row, col);
      const id = n(`m${row}_${col}`);
      points[`${id}-l`] = [cx - 0.36, cy];
      points[`${id}-r`] = [cx + 0.36, cy];
      items.push({ kind: 'line', id: `${id}-bond`, from: `${id}-l`, to: `${id}-r`, tone: 'ink', weight: 7, group: n('molecules') });
      ball(points, items, `${id}-a`, [cx - 0.36, cy], 0.34, o.tone ?? 'hyp', '', n('molecules'));
      ball(points, items, `${id}-b`, [cx + 0.36, cy], 0.34, o.tone ?? 'hyp', '', n('molecules'));
    }
  return { points, items };
}

/**
 * One layer of graphite seen from above: carbon atoms in hexagons, each joined to three others,
 * `cols` hexagons across and `rows` up, with two free electrons in each hexagon (the fourth outer
 * electron of each atom, free to move along the layer). Parts: `bonds`, `atoms` and `free`
 * (groups).
 */
export function graphite(o: { name?: string; cols: number; rows: number }): Part {
  const n = namer(o.name);
  const s3 = Math.sqrt(3);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  // Hexagon centres in rows, every other row shifted half a hexagon; the six corners of each.
  const atoms = new Map<string, P>();
  const key = (p: P) => `${Math.round(p[0] * 1000)}_${Math.round(p[1] * 1000)}`;
  const centres: P[] = [];
  for (let row = 0; row < o.rows; row++)
    for (let col = 0; col < o.cols; col++) {
      const c: P = [col * s3 + (row % 2 ? s3 / 2 : 0), row * 1.5];
      centres.push(c);
      for (let k = 0; k < 6; k++) {
        const a = Math.PI / 2 + (k * Math.PI) / 3;
        const p: P = [c[0] + Math.cos(a), c[1] + Math.sin(a)];
        atoms.set(key(p), p);
      }
    }
  const list = [...atoms.values()];
  const r = 0.26;
  // Bonds between atoms one unit apart, from edge to edge.
  list.forEach((a, i) =>
    list.forEach((b, j) => {
      if (j <= i || Math.abs(Math.hypot(a[0] - b[0], a[1] - b[1]) - 1) > 0.01) return;
      const id = n(`b${i}_${j}`);
      const u: P = [b[0] - a[0], b[1] - a[1]];
      points[`${id}-a`] = [a[0] + u[0] * r, a[1] + u[1] * r];
      points[`${id}-b`] = [b[0] - u[0] * r, b[1] - u[1] * r];
      items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone: 'muted', weight: 5, group: n('bonds') });
    }),
  );
  list.forEach((p, i) => ball(points, items, n(`c${i}`), p, r, 'brand', '', n('atoms')));
  // Two in each hexagon: inside a large layer, that is one for every atom.
  centres.forEach((c, i) =>
    [-0.3, 0.3].forEach((dx, k) => {
      const id = n(`e${i}_${k}`);
      points[`${id}-p`] = [c[0] + dx, c[1] + (k ? -0.12 : 0.12)];
      items.push({ kind: 'label', id, at: `${id}-p`, tex: '', dot: true, tone: 'adj', place: 'center', group: n('free') });
    }),
  );
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
 * and `minus` are what the ions show (+ and − by default; "Na^+", for example). With `ring`
 * ([row, column] from the bottom left), a dashed circle rings that ion and its four neighbours.
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

/**
 * Atoms of a giant covalent structure: `cols` by `rows` atoms, `gap` apart (1.4 by default), each
 * joined by a covalent bond to its neighbours (four inside the network), with the bonds running on
 * past the edge to show that the network carries on. Parts: `bonds` and `atoms` (groups).
 */
export function network(o: { name?: string; cols: number; rows: number; gap?: number; symbol?: string; at?: P }): Part {
  const n = namer(o.name);
  const g = o.gap ?? 1.4;
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const at = (row: number, col: number): P => [x0 + col * g, y0 + row * g];
  // Each bond runs from the edge of one atom to the edge of the next; at the edge of the drawing a
  // stub runs half way, so it ends in empty space.
  const r = 0.3 * g;
  for (let row = 0; row < o.rows; row++)
    for (let col = -1; col < o.cols; col++) {
      const id = n(`h${row}_${col}`);
      const xa = col === -1 ? at(row, 0)[0] - g * 0.5 : at(row, col)[0] + r;
      const xb = col + 1 === o.cols ? at(row, col)[0] + g * 0.5 : at(row, col + 1)[0] - r;
      points[`${id}-a`] = [xa, at(row, 0)[1]];
      points[`${id}-b`] = [xb, at(row, 0)[1]];
      items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone: 'muted', weight: 5, group: n('bonds') });
    }
  for (let col = 0; col < o.cols; col++)
    for (let row = -1; row < o.rows; row++) {
      const id = n(`v${row}_${col}`);
      const ya = row === -1 ? at(0, col)[1] - g * 0.5 : at(row, col)[1] + r;
      const yb = row + 1 === o.rows ? at(row, col)[1] + g * 0.5 : at(row + 1, col)[1] - r;
      points[`${id}-a`] = [at(0, col)[0], ya];
      points[`${id}-b`] = [at(0, col)[0], yb];
      items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone: 'muted', weight: 5, group: n('bonds') });
    }
  for (let row = 0; row < o.rows; row++)
    for (let col = 0; col < o.cols; col++) ball(points, items, n(`a${row}_${col}`), at(row, col), r, 'brand', o.symbol ? `\\text{${o.symbol}}` : '', n('atoms'));
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
 * A metal: `cols` by `rows` positive ions, `gap` apart (1.4 by default), in a sea of electrons
 * scattered between them (the same way every time, from `seed`). Parts: `ions` and `sea` (groups;
 * the electrons are `e0`, `e1`…).
 */
export function metal(o: { name?: string; cols: number; rows: number; gap?: number; at?: P; seed?: number }): Part {
  const n = namer(o.name);
  const g = o.gap ?? 1.4;
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const rand = random(o.seed ?? 5);
  // One electron in each gap between four ions, nudged a little, and one on each side between two.
  let e = 0;
  for (let row = 0; row < o.rows - 1; row++)
    for (let col = 0; col < o.cols - 1; col++) {
      const id = n(`e${e++}`);
      points[`${id}-p`] = [x0 + (col + 0.5 + (rand() - 0.5) * 0.3) * g, y0 + (row + 0.5 + (rand() - 0.5) * 0.3) * g];
      items.push({ kind: 'label', id, at: `${id}-p`, tex: '', dot: true, tone: 'adj', place: 'center', group: n('sea') });
    }
  for (let row = 0; row < o.rows; row++)
    for (let col = 0; col < o.cols; col++) {
      if ((row + col) % 2) continue;
      const id = n(`e${e++}`);
      const side = rand() < 0.5;
      points[`${id}-p`] = side ? [x0 + (col + 0.5) * g, y0 + (row + (rand() - 0.5) * 0.25) * g] : [x0 + (col + (rand() - 0.5) * 0.25) * g, y0 + (row + 0.5) * g];
      if (points[`${id}-p`][0] > x0 + (o.cols - 1) * g + 0.01 || points[`${id}-p`][1] > y0 + (o.rows - 1) * g + 0.01) {
        delete points[`${id}-p`];
        e--;
        continue;
      }
      items.push({ kind: 'label', id, at: `${id}-p`, tex: '', dot: true, tone: 'adj', place: 'center', group: n('sea') });
    }
  for (let row = 0; row < o.rows; row++)
    for (let col = 0; col < o.cols; col++) ball(points, items, n(`m${row}_${col}`), [x0 + col * g, y0 + row * g], 0.3 * g, 'opp', '+', n('ions'));
  return { points, items };
}

/**
 * A box `w` by `h` centred on `c`, with a line of text (TeX) in it, for a flow chart. Part: `id`
 * (a group: the shaded box, its edge and its text).
 */
export function card(id: string, c: P, w: number, h: number, tex: string, tone: DiagramTone = 'brand'): Part {
  const [x, y] = c;
  const corners = [`${id}-0`, `${id}-1`, `${id}-2`, `${id}-3`];
  const points: Record<string, P> = {
    [corners[0]]: [x - w / 2, y - h / 2],
    [corners[1]]: [x + w / 2, y - h / 2],
    [corners[2]]: [x + w / 2, y + h / 2],
    [corners[3]]: [x - w / 2, y + h / 2],
    [`${id}-c`]: c,
  };
  return {
    points,
    items: [
      { kind: 'region', id: `${id}-fill`, points: corners, tone, shade: 0.16, group: id },
      { kind: 'curve', id: `${id}-edge`, points: corners, closed: true, tone, weight: 2.5, group: id },
      { kind: 'label', id: `${id}-text`, at: `${id}-c`, tex, place: 'center', group: id },
    ],
  };
}
