/**
 * Figures for the first half of the Chemical Changes of Organic Compounds videos (Grade 12
 * Chemistry, unit 3, lessons 3.1 to 3.4), built only from standard diagram parts (lines, curves
 * and labels), so each goes into a diagram with `figure`:
 *
 * - `zigzag`, `step` and `ringAt`: where the carbons of a line formula sit (a zigzag chain, the
 *   next carbon of a branch, a ring), each bond one unit long.
 * - `chainBonds`: the bonds along a zigzag chain.
 * - `skeleton`: a line formula from those carbons and bonds: a line for each bond, a second,
 *   shorter line inside a double bond, three lines for a triple bond, a circle inside a benzene
 *   ring, other atoms (O, Cl…) written as symbols with their bonds stopping short, dots on the
 *   carbons and labels beside them (carbon numbers, hydrogen counts).
 * - `numberLabels`: the carbon numbers of a chain, as labels for `skeleton`.
 * - `rowStructure`: a structural formula (every atom, each bond a line, from `lewis` in
 *   src/video/chem.ts) of a molecule whose chain sits in a row: alkanes, alkyl groups, alcohols,
 *   ethers, aldehydes, ketones, acids and esters.
 * - `tag`: a label (TeX) at a point, such as a compound's name under its drawing.
 * - `grouped`: every part of a drawing in one group, to show a whole molecule from `lewis` at once.
 *
 * In every video of the unit the parent chain is drawn in the brand colour and branches in orange.
 */
import { lewis, type LewisAtom, type LewisBond } from '@/video/chem.ts';
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

/** The horizontal run of one bond of a zigzag (bonds one unit long, 30° from the horizontal). */
export const DX = Math.sqrt(3) / 2;

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
const mul = (a: P, k: number): P => [a[0] * k, a[1] * k];

/**
 * The carbons of a zigzag chain of `n` carbons, named `${prefix}1`… from `at` (the first carbon),
 * running to the right (to the left with `mirror`). The first carbon is on the low row unless
 * `high`; the rows are half a unit apart.
 */
export function zigzag(prefix: string, n: number, o: { at?: P; high?: boolean; mirror?: boolean } = {}): Record<string, P> {
  const [x0, y0] = o.at ?? [0, 0];
  const s = o.mirror ? -1 : 1;
  const out: Record<string, P> = {};
  for (let i = 0; i < n; i++) out[`${prefix}${i + 1}`] = [x0 + s * i * DX, y0 + ((i % 2 === 1) !== !!o.high ? 0.5 : 0)];
  return out;
}

/** The point one bond length from `from`, at `degrees` from the positive x direction (90 is straight up). */
export function step(from: P, degrees: number): P {
  const a = (degrees * Math.PI) / 180;
  return [from[0] + Math.cos(a), from[1] + Math.sin(a)];
}

/** The carbons of a regular ring of `n`, named `${prefix}1`…, centred on `c`, with a corner at the top. */
export function ringAt(prefix: string, n: number, c: P = [0, 0]): Record<string, P> {
  const r = 1 / (2 * Math.sin(Math.PI / n));
  const out: Record<string, P> = {};
  for (let k = 0; k < n; k++) {
    const a = Math.PI / 2 - (2 * Math.PI * k) / n;
    out[`${prefix}${k + 1}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
  }
  return out;
}

/** A bond of a line formula. */
export interface SkBond {
  from: string;
  to: string;
  order?: 1 | 2 | 3;
  tone?: DiagramTone;
  group?: string;
  /** The atom the second line of a double bond lies towards (a neighbouring carbon by default). */
  inside?: string;
}

/** The bonds of a chain of `n` carbons named `${prefix}1`…, with any multiple bonds by their first carbon. */
export function chainBonds(prefix: string, n: number, o: { from?: number; multiple?: Record<number, 2 | 3>; tone?: DiagramTone; group?: string } = {}): SkBond[] {
  const out: SkBond[] = [];
  for (let i = o.from ?? 1; i < n; i++) {
    const order = o.multiple?.[i];
    out.push({ from: `${prefix}${i}`, to: `${prefix}${i + 1}`, ...(order ? { order } : {}), ...(o.tone ? { tone: o.tone } : {}), ...(o.group ? { group: o.group } : {}) });
  }
  return out;
}

/** A label beside an atom of a skeleton: `at` is the atom, `shift` moves it (in bond lengths). */
export interface SkLabel {
  id: string;
  at: string;
  tex: string;
  place?: Place;
  tone?: DiagramTone;
  group?: string;
  shift?: P;
}

/**
 * Carbon numbers for a `skeleton`: a label beside each carbon of `ids`, carbon 1 first, on the side
 * `places` gives. Labels `<id>1`, `<id>2`… in the group `<id>` (`n` by default), yellow unless `tone`.
 */
export function numberLabels(ids: string[], places: Place[], o: { id?: string; tone?: DiagramTone } = {}): SkLabel[] {
  const id = o.id ?? 'n';
  return ids.map((at, i) => ({ id: `${id}${i + 1}`, at, tex: String(i + 1), place: places[i], tone: o.tone ?? 'theta', group: id }));
}

/**
 * A line formula. Each carbon is a corner or an end of the lines; bonds are drawn from carbon to
 * carbon in `tone` (brand by default). An atom listed in `atoms` (an oxygen, a halogen) is written
 * as its symbol, and its bonds stop short of it.
 *
 * Parts: each bond `<from>-<to>` (a double bond's second line `<from>-<to>-ii`, a triple bond's
 * outer lines `-ii` and `-iii`; a multiple bond with no `group` is the group `<from>-<to>`), each
 * symbol by its atom id, the dots on the carbons `c-<id>` (a group `carbons`), each label by its
 * id and each circle by its id.
 */
export function skeleton(o: {
  name?: string;
  carbons: Record<string, P>;
  bonds: SkBond[];
  atoms?: Record<string, { symbol: string; tone?: DiagramTone; group?: string }>;
  dots?: boolean | string[];
  dotTone?: DiagramTone;
  labels?: SkLabel[];
  circles?: Array<{ id: string; c: P; r: number; tone?: DiagramTone; group?: string }>;
  tone?: DiagramTone;
  weight?: number;
}): Part {
  const n = namer(o.name);
  const tone = o.tone ?? 'brand';
  const weight = o.weight ?? 5;
  const atoms = o.atoms ?? {};
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const at = (id: string): P => {
    const p = o.carbons[id];
    if (!p) throw new Error(`skeleton: no atom "${id}"`);
    return p;
  };
  for (const [id, p] of Object.entries(o.carbons)) points[n(`p-${id}`)] = p;
  const neighbour = (of: string, not: string) => {
    const b = o.bonds.find((x) => (x.from === of && x.to !== not) || (x.to === of && x.from !== not));
    return b ? (b.from === of ? b.to : b.from) : null;
  };
  for (const b of o.bonds) {
    let A = at(b.from);
    let B = at(b.to);
    const d = sub(B, A);
    const len = Math.hypot(d[0], d[1]);
    const u: P = [d[0] / len, d[1] / len];
    // A bond to a written atom stops short of its symbol.
    if (b.from in atoms) A = add(A, mul(u, 0.32));
    if (b.to in atoms) B = sub(B, mul(u, 0.32));
    const id = n(`${b.from}-${b.to}`);
    const order = b.order ?? 1;
    const group = b.group ? n(b.group) : order > 1 ? id : undefined;
    const t = b.tone ?? tone;
    const line = (lid: string, a: P, c: P): DiagramItem => {
      points[`${lid}-a`] = a;
      points[`${lid}-b`] = c;
      return { kind: 'line', id: lid, from: `${lid}-a`, to: `${lid}-b`, tone: t, weight, ...(group ? { group } : {}) };
    };
    const v: P = [-u[1], u[0]];
    if (order === 3) {
      // Three lines: the middle one carbon to carbon, the outer two a little shorter.
      const span = sub(B, A);
      items.push(line(id, A, B));
      for (const [k, s] of [['ii', 0.15], ['iii', -0.15]] as const) {
        items.push(line(`${id}-${k}`, add(add(A, mul(span, 0.12)), mul(v, s)), add(add(A, mul(span, 0.88)), mul(v, s))));
      }
      continue;
    }
    items.push(line(id, A, B));
    if (order === 2) {
      // The second line lies inside the angle the bond makes with a neighbouring bond.
      const towards = b.inside ?? neighbour(b.to, b.from) ?? neighbour(b.from, b.to);
      const mid = mul(add(A, B), 0.5);
      let side = v;
      if (towards) {
        const q = sub(at(towards), mid);
        if (q[0] * v[0] + q[1] * v[1] < 0) side = mul(v, -1);
      }
      const span = sub(B, A);
      const off = mul(side, 0.17);
      items.push(line(`${id}-ii`, add(add(A, mul(span, 0.18)), off), add(add(A, mul(span, 0.82)), off)));
    }
  }
  for (const c of o.circles ?? []) {
    const ids = Array.from({ length: 40 }, (_, j) => {
      const a = (2 * Math.PI * j) / 40;
      const pid = n(`${c.id}-${j}`);
      points[pid] = [c.c[0] + c.r * Math.cos(a), c.c[1] + c.r * Math.sin(a)];
      return pid;
    });
    items.push({ kind: 'curve', id: n(c.id), points: ids, closed: true, tone: c.tone ?? tone, weight: weight - 1, ...(c.group ? { group: n(c.group) } : {}) });
  }
  for (const [id, a] of Object.entries(atoms)) {
    items.push({ kind: 'label', id: n(id), at: n(`p-${id}`), tex: `\\text{${a.symbol}}`, place: 'center', ...(a.tone ? { tone: a.tone } : {}), ...(a.group ? { group: n(a.group) } : {}) });
  }
  const dotted = o.dots === true ? Object.keys(o.carbons).filter((id) => !(id in atoms)) : o.dots || [];
  for (const id of dotted) {
    items.push({ kind: 'label', id: n(`c-${id}`), at: n(`p-${id}`), tex: '', dot: true, place: 'center', tone: o.dotTone ?? 'theta', group: n('carbons') });
  }
  for (const l of o.labels ?? []) {
    const pid = n(`l-${l.id}`);
    points[pid] = add(at(l.at), l.shift ?? [0, 0]);
    items.push({ kind: 'label', id: n(l.id), at: pid, tex: l.tex, ...(l.place ? { place: l.place } : {}), ...(l.tone ? { tone: l.tone } : {}), ...(l.group ? { group: n(l.group) } : {}) });
  }
  return { points, items };
}

/** What sits above or below an atom of a `rowStructure`: a hydrogen, a CH₃ branch, a double-bonded oxygen, or an –OH. */
export type RowSub = 'H' | 'CH3' | '=O' | 'OH';

/** An atom in the row of a `rowStructure`. */
export interface RowAtom {
  symbol: string;
  up?: RowSub;
  down?: RowSub;
  tone?: DiagramTone;
}

/**
 * A structural formula drawn the way it is in class: the carbon chain (and any O in it) in a row
 * from `at`, 1.6 apart, with what each atom carries above and below it, and a hydrogen (or an open
 * bond, for an alkyl group) at either end. `bonds` gives the order of each bond along the row.
 *
 * Parts (from `lewis`): the row atoms `a1`, `a2`…, the atoms above and below `a2-up`, `a2-dn`
 * (a CH₃ branch, two rows out on a long bond, has hydrogens `a2-dn-l`, `a2-dn-r` and `a2-dn-dn`;
 * an OH's hydrogen is `a2-up-h`), the
 * end hydrogens `left` and `right`, each bond `bond-<a>-<b>`, and an open bond `open`.
 */
export function rowStructure(o: {
  name?: string;
  at?: P;
  atoms: RowAtom[];
  bonds?: Array<1 | 2 | 3>;
  left?: 'H' | 'open';
  right?: 'H' | 'open';
  gap?: number;
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const g = o.gap ?? 1.6;
  const atoms: LewisAtom[] = [];
  const bonds: LewisBond[] = [];
  o.atoms.forEach((a, i) => {
    const id = `a${i + 1}`;
    const x = x0 + i * g;
    atoms.push({ id, symbol: a.symbol, at: [x, y0], ...(a.tone ? { tone: a.tone } : {}) });
    if (i > 0) bonds.push({ from: `a${i}`, to: id, order: o.bonds?.[i - 1] ?? 1 });
    for (const [side, sub, dy] of [['up', a.up, 1], ['dn', a.down, -1]] as const) {
      if (!sub) continue;
      const sid = `${id}-${side}`;
      const y = y0 + dy * g;
      if (sub === 'H') atoms.push({ id: sid, symbol: 'H', at: [x, y] });
      if (sub === '=O') atoms.push({ id: sid, symbol: 'O', at: [x, y], tone: 'bad' });
      if (sub === 'OH') {
        atoms.push({ id: sid, symbol: 'O', at: [x, y], tone: 'bad' }, { id: `${sid}-h`, symbol: 'H', at: [x, y + dy * g] });
        bonds.push({ from: sid, to: `${sid}-h` });
      }
      if (sub === 'CH3') {
        // Two rows out, on a long bond, so its hydrogens clear those of the neighbouring carbons.
        const yb = y0 + 2 * dy * g;
        atoms.push({ id: sid, symbol: 'C', at: [x, yb] }, { id: `${sid}-l`, symbol: 'H', at: [x - g, yb] }, { id: `${sid}-r`, symbol: 'H', at: [x + g, yb] }, { id: `${sid}-${side}`, symbol: 'H', at: [x, yb + dy * g] });
        bonds.push({ from: sid, to: `${sid}-l` }, { from: sid, to: `${sid}-r` }, { from: sid, to: `${sid}-${side}` });
      }
      bonds.push({ from: id, to: sid, order: sub === '=O' ? 2 : 1 });
    }
  });
  const last = o.atoms.length;
  if (o.left === 'H') {
    atoms.push({ id: 'left', symbol: 'H', at: [x0 - g, y0] });
    bonds.push({ from: 'left', to: 'a1' });
  }
  if (o.right === 'H') {
    atoms.push({ id: 'right', symbol: 'H', at: [x0 + last * g, y0] });
    bonds.push({ from: `a${last}`, to: 'right' });
  }
  const part = lewis({ name: o.name, atoms, bonds });
  for (const [side, x, dir] of [['left', x0, -1], ['right', x0 + (last - 1) * g, 1]] as const) {
    if (o[side] !== 'open') continue;
    // A bond that leaves the drawing: where an alkyl group joins a chain.
    Object.assign(part.points, { [n('open-a')]: [x + dir * 0.34, y0], [n('open-b')]: [x + dir * 1.25, y0] });
    part.items.push({ kind: 'line', id: n('open'), from: n('open-a'), to: n('open-b'), weight: 3, tone: 'opp' });
  }
  return part;
}

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/** Every item of a drawing in the group `group`, so a line can show the whole of it at once. */
export function grouped(part: Part, group: string): Part {
  return { points: part.points, items: part.items.map((item) => ({ ...item, group })) };
}
