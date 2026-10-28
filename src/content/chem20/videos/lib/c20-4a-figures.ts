/**
 * Figures for the first half of the Quantitative Relationships in Chemical Changes videos (Grade 11
 * Chemistry, unit 4, lessons 4.1 to 4.4), built only from standard diagram parts (lines, curves,
 * shaded regions and labels), so each goes into a diagram with `figure` (src/video/solids.ts):
 *
 * - `row`: a reaction drawn with atoms as labelled balls, molecules as touching balls, plus signs
 *   and an arrow, from left to right (as in the Grade 10 videos). Build its terms with `mol` (atoms
 *   in a line), `star` (a centre atom with others round it, such as CH₄ or AlBr₃), `water`,
 *   `propane`, `stack` (molecules one above another, for a coefficient), `plus` and `gives`.
 * - `ionEq`: an equation written out as separate formulas in rows, with a slanted stroke through
 *   each spectator ion that draws itself on when it is crossed out.
 * - `flow`: quantities in boxes in a row, joined by arrows that say how to get from one to the
 *   next (divide by the molar mass, multiply by Avogadro's number, the mole ratio).
 * - `massBar`: a molar mass as a bar split into the parts that add up to it, each about as long as
 *   its share of the mass.
 * - `beaker`: a beaker of solution with ions written in it and a heap of precipitate on the bottom.
 * - `heating`: crystals of a hydrate turning into the anhydrous powder as the water is driven off.
 * - `filtration`: a precipitate caught on filter paper in a funnel, over a beaker of filtrate.
 * - `tag`, `link` and `room`: a label, a line or arrow, and two unused points that keep space.
 *
 * Positive ions are orange and negative ions blue, as in the rest of the course.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Joins parts into one. */
export function join(parts: Part[]): Part {
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/** A line from one point to another (an arrow with `arrow`), with an optional label (TeX) beside its middle. Part: its `id`. */
export function link(id: string, from: P, to: P, o: { tone?: DiagramTone; label?: string; labelSide?: 'left' | 'right'; group?: string; weight?: number; arrow?: boolean; dashed?: boolean } = {}): Part {
  return {
    points: { [`${id}-a`]: from, [`${id}-b`]: to },
    items: [
      {
        kind: 'line',
        id,
        from: `${id}-a`,
        to: `${id}-b`,
        tone: o.tone ?? 'ink',
        weight: o.weight ?? 3,
        ...(o.arrow ? { arrow: true } : {}),
        ...(o.dashed ? { dashed: true } : {}),
        ...(o.label ? { label: o.label, labelSide: o.labelSide ?? 'left' } : {}),
        ...(o.group ? { group: o.group } : {}),
      },
    ],
  };
}

/** Two points that nothing uses, so the diagram keeps room out to them. */
export function room(id: string, a: P, b: P): Part {
  return { points: { [`${id}-a`]: a, [`${id}-b`]: b }, items: [] };
}

/** Point names round a circle, added to `points`, starting on the right. */
function ring(points: Record<string, P>, id: string, c: P, r: number, steps = 20): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const a = (2 * Math.PI * j) / steps;
    points[`${id}-${j}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${id}-${j}`;
  });
}

/** A rectangle's corners, added to `points`, in order round it. */
function rect(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number): string[] {
  Object.assign(points, { [`${key}-0`]: [x0, y0], [`${key}-1`]: [x1, y0], [`${key}-2`]: [x1, y1], [`${key}-3`]: [x0, y1] });
  return [0, 1, 2, 3].map((i) => `${key}-${i}`);
}

// ---------------------------------------------------------------------------- reactions as balls

/** The colour and size of each element's atoms, the same in every video of the unit. */
export const ATOM: Record<string, { tone: DiagramTone; r: number }> = {
  H: { tone: 'adj', r: 0.36 },
  O: { tone: 'bad', r: 0.45 },
  C: { tone: 'muted', r: 0.45 },
  N: { tone: 'hyp', r: 0.45 },
  Cl: { tone: 'good', r: 0.5 },
  Br: { tone: 'opp', r: 0.5 },
  Al: { tone: 'theta', r: 0.5 },
  Na: { tone: 'brand', r: 0.5 },
};

/** One atom of a molecule: its symbol, where it sits (from the molecule's centre), its colour and size. */
interface Atom {
  sym: string;
  at: P;
  tone: DiagramTone;
  r: number;
}

/** A molecule (or formula unit, or lone atom) as balls, with an optional charge (TeX) at its top right. */
export interface Mol {
  kind: 'mol';
  id: string;
  atoms: Atom[];
  charge?: string;
}

/** A term of a reaction drawn as balls. */
export type Term = Mol | { kind: 'stack'; mols: Mol[] } | { kind: 'plus'; id: string } | { kind: 'gives'; id: string; label?: string; length?: number };

const look = (sym: string) => ATOM[sym] ?? { tone: 'brand' as DiagramTone, r: 0.45 };
const atom = (sym: string, at: P): Atom => ({ sym, at, ...look(sym) });

/**
 * Atoms in a line, touching: `mol('o2', ['O', 'O'])`, `mol('co2', ['O', 'C', 'O'])`. `tones`
 * colours the balls instead of the element colours, for letters standing for elements (A + B → AB).
 */
export function mol(id: string, syms: string[], o: { charge?: string; tones?: DiagramTone[] } = {}): Mol {
  const rs = syms.map((s) => look(s).r);
  const xs: number[] = [];
  let x = 0;
  rs.forEach((r, i) => {
    if (i > 0) x += (rs[i - 1] + r) * 0.82;
    xs.push(x);
  });
  const atoms = syms.map((s, i) => ({ ...atom(s, [xs[i] - x / 2, 0]), ...(o.tones?.[i] ? { tone: o.tones[i] } : {}) }));
  return { kind: 'mol', id, atoms, ...(o.charge ? { charge: o.charge } : {}) };
}

/**
 * A centre atom with others round it, touching it: four at the top, right, bottom and left (CH₄),
 * three spread evenly with one at the top (AlBr₃, NH₃, H₃O⁺), or two either side (H₂O drawn bent:
 * use `water`). The outer atoms are listed from the top, going clockwise.
 */
export function star(id: string, centre: string, around: string[], o: { charge?: string; turn?: number } = {}): Mol {
  const rc = look(centre).r;
  const k = around.length;
  const atoms = [
    ...around.map((s, i) => {
      const a = Math.PI / 2 - (2 * Math.PI * i) / k + (o.turn ?? 0);
      const d = (rc + look(s).r) * 0.95;
      return atom(s, [d * Math.cos(a), d * Math.sin(a)]);
    }),
    // The centre atom last, so it is drawn over the inner edges of the others.
    atom(centre, [0, 0]),
  ];
  return { kind: 'mol', id, atoms, ...(o.charge ? { charge: o.charge } : {}) };
}

/** A water molecule: the oxygen atom with a hydrogen atom below it on each side. */
export function water(id: string): Mol {
  return { kind: 'mol', id, atoms: [atom('H', [-0.6, -0.36]), atom('H', [0.6, -0.36]), atom('O', [0, 0.1])] };
}

/** Propane, C₃H₈: three carbon atoms in a chain, with three hydrogen atoms on each end carbon and two on the middle one. */
export function propane(id: string): Mol {
  const d = 0.8;
  const c = 1.65;
  const hs: P[] = [
    [-c - d, 0], [-c, d], [-c, -d],
    [0, d], [0, -d],
    [c + d, 0], [c, d], [c, -d],
  ];
  return { kind: 'mol', id, atoms: [...hs.map((p) => atom('H', p)), atom('C', [-c, 0]), atom('C', [0, 0]), atom('C', [c, 0])] };
}

/** Molecules one above another, for a coefficient: two H₂O molecules for 2H₂O. */
export function stack(...mols: Mol[]): Term {
  return { kind: 'stack', mols };
}

export const plus = (id: string): Term => ({ kind: 'plus', id });
/** The arrow of a reaction, with an optional label (TeX) above it. */
export const gives = (id: string, label?: string, length?: number): Term => ({ kind: 'gives', id, label, length });

/** How far a molecule reaches left, right, down and up from its centre. */
function extent(m: { atoms: Atom[] }) {
  return {
    x0: Math.min(...m.atoms.map((a) => a.at[0] - a.r)),
    x1: Math.max(...m.atoms.map((a) => a.at[0] + a.r)),
    y0: Math.min(...m.atoms.map((a) => a.at[1] - a.r)),
    y1: Math.max(...m.atoms.map((a) => a.at[1] + a.r)),
  };
}

/** A ball: a shaded circle with an edge and, with `tex`, a label in the middle, all in `group`. */
function ball(points: Record<string, P>, items: DiagramItem[], id: string, c: P, r: number, tone: DiagramTone, tex: string | undefined, group: string, shade = 0.55) {
  const ids = ring(points, id, c, r);
  items.push(
    { kind: 'region', id, points: ids, tone, shade, group },
    { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone, weight: 2, group },
  );
  if (tex) {
    points[`${id}-c`] = c;
    items.push({ kind: 'label', id: `${id}-sym`, at: `${id}-c`, tex, place: 'center', group });
  }
}

/**
 * A reaction drawn as balls along the line y = `y`, starting at `x`: molecules, plus signs and the
 * arrow (with a label above it), `gap` apart. A `title` (TeX) sits at the left end.
 *
 * Parts: each molecule by its id (a group of its balls, symbols and charge), each plus sign and
 * arrow by its id, and the title by its id. `mid` gives the middle of each term along the row, by
 * its id (a stack's by the id of each of its molecules), and `end` where the row ends.
 */
export function row(o: { y?: number; x?: number; terms: Term[]; gap?: number; title?: { id: string; tex: string } }): Part & { mid: Record<string, number>; end: number } {
  const y = o.y ?? 0;
  const gap = o.gap ?? 0.3;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const mid: Record<string, number> = {};
  let x = o.x ?? 0;
  if (o.title) {
    points[o.title.id] = [x - 0.4, y];
    items.push({ kind: 'label', id: o.title.id, at: o.title.id, tex: o.title.tex, place: 'left' });
  }
  const draw = (m: Mol, c: P) => {
    m.atoms.forEach((a, i) => ball(points, items, `${m.id}-${i}`, [c[0] + a.at[0], c[1] + a.at[1]], a.r, a.tone, `\\mathsf{${a.sym}}`, m.id));
    if (m.charge) {
      const e = extent(m);
      points[`${m.id}-q`] = [c[0] + e.x1, c[1] + e.y1 - 0.2];
      items.push({ kind: 'label', id: `${m.id}-charge`, at: `${m.id}-q`, tex: m.charge, place: 'right', group: m.id });
    }
  };
  o.terms.forEach((t, k) => {
    if (k > 0) x += gap;
    if (t.kind === 'mol') {
      const e = extent(t);
      draw(t, [x - e.x0, y - (e.y0 + e.y1) / 2]);
      mid[t.id] = x + (e.x1 - e.x0) / 2;
      x += e.x1 - e.x0 + (t.charge ? 0.35 : 0);
    } else if (t.kind === 'stack') {
      // Rows a little more than a molecule's height apart, centred on the line.
      const w = Math.max(...t.mols.map((m) => extent(m).x1 - extent(m).x0));
      const h = Math.max(...t.mols.map((m) => extent(m).y1 - extent(m).y0)) + 0.25;
      t.mols.forEach((m, i) => {
        const e = extent(m);
        draw(m, [x + (w - (e.x1 - e.x0)) / 2 - e.x0, y + ((t.mols.length - 1) / 2 - i) * h - (e.y0 + e.y1) / 2]);
        mid[m.id] = x + w / 2;
      });
      x += w;
    } else if (t.kind === 'plus') {
      points[t.id] = [x + 0.25, y];
      items.push({ kind: 'label', id: t.id, at: t.id, tex: '+', place: 'center' });
      mid[t.id] = x + 0.25;
      x += 0.5;
    } else {
      const len = t.length ?? 1.2;
      Object.assign(points, { [`${t.id}-a`]: [x, y], [`${t.id}-b`]: [x + len, y] });
      items.push({ kind: 'line', id: t.id, from: `${t.id}-a`, to: `${t.id}-b`, arrow: true, weight: 3, ...(t.label ? { label: t.label, labelSide: 'left' as const } : {}) });
      mid[t.id] = x + len / 2;
      x += len;
    }
  });
  return { points, items, mid, end: x };
}

// ---------------------------------------------------------------------------- equations with spectators crossed out

/** A formula in an equation (TeX), and the group of the stroke that crosses it out, if it is a spectator. */
export interface EqTerm {
  id: string;
  tex: string;
  /** The group of the stroke through it; no stroke without one. */
  strike?: string;
  /** Its width in ems, when the estimate is off. */
  w?: number;
}

/** Widths of small letters, in ems, for `estimate`. */
const SMALL: Record<string, number> = { a: 0.5, b: 0.56, c: 0.44, e: 0.44, g: 0.5, i: 0.28, l: 0.28, n: 0.56, q: 0.53, r: 0.4, s: 0.4 };

/**
 * About how wide a formula is, in ems of the label font, measured against the stills: capitals,
 * small letters, coefficients, subscripts and charges (set side by side, not stacked), the thin
 * space and brackets of a state symbol, with a little to spare round it.
 */
function estimate(tex: string): number {
  const s = tex.replace(/^\\ce\{|\}$/g, '');
  let w = 0;
  let script = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const prev = s[i - 1] ?? '';
    if (c === '^') {
      script = true;
      continue;
    }
    if (/[A-Z]/.test(c)) {
      script = false;
      w += 0.75;
    } else if (/[a-z]/.test(c)) w += SMALL[c] ?? 0.5;
    else if (/\d/.test(c)) w += script || /[A-Za-z)]/.test(prev) ? 0.4 : 0.5;
    else if (c === '+' || c === '-') w += 0.55;
    else if (c === '(') {
      script = false;
      w += 0.55;
    } else if (c === ')') w += 0.4;
    else if (c === '*') w += 0.3;
  }
  return 1.1 * w + 0.2;
}

/**
 * An equation written out in rows of formulas, plus signs and arrows, each row centred on x = 0
 * (rows are `rowGap` apart, from y = 0 down). A term in a row is a formula (`EqTerm`), `'+'` or
 * `'->'`. A formula with a `strike` gets a slanted stroke through it, in red, that draws itself on
 * when its group is shown. Units are ems of the label font; the diagram is kept `width` wide (28.6
 * by default), so in a centred scene one unit is about one em and the estimated widths hold.
 *
 * Parts: each formula by its id, each plus sign and arrow as `<row id>-<k>`, each row as a group
 * by its id (`row-0`, `row-1`… unless `ids` names them), and each stroke group by its name.
 */
export function ionEq(o: { name?: string; rows: Array<Array<EqTerm | '+' | '->'>>; ids?: string[]; rowGap?: number; width?: number; gap?: number }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 0.5;
  const rowGap = o.rowGap ?? 1.5;
  const W = o.width ?? 28.6;
  const points: Record<string, P> = { [n('frame-l')]: [-W / 2, 0], [n('frame-r')]: [W / 2, 0] };
  const items: DiagramItem[] = [];
  o.rows.forEach((terms, r) => {
    const rowId = n(o.ids?.[r] ?? `row-${r}`);
    const y = -r * rowGap;
    const widths = terms.map((t) => (t === '+' ? 0.9 : t === '->' ? 1.8 : (t.w ?? estimate(t.tex))));
    const total = widths.reduce((s, v) => s + v, 0) + gap * (terms.length - 1);
    let x = -total / 2;
    terms.forEach((t, k) => {
      const w = widths[k];
      if (t === '+' || t === '->') {
        const id = `${rowId}-${k}`;
        if (t === '+') {
          points[id] = [x + w / 2, y];
          items.push({ kind: 'label', id, at: id, tex: '+', place: 'center', group: rowId });
        } else {
          Object.assign(points, { [`${id}-a`]: [x + 0.1, y], [`${id}-b`]: [x + w - 0.1, y] });
          items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, arrow: true, weight: 3, group: rowId });
        }
      } else {
        const id = n(t.id);
        points[id] = [x + w / 2, y];
        items.push({ kind: 'label', id, at: id, tex: t.tex, place: 'center', group: rowId });
        if (t.strike) {
          Object.assign(points, { [`${id}-s0`]: [x - 0.08, y - 0.42], [`${id}-s1`]: [x + w + 0.08, y + 0.42] });
          items.push({ kind: 'line', id: `${id}-strike`, from: `${id}-s0`, to: `${id}-s1`, tone: 'bad', weight: 4, group: n(t.strike) });
        }
      }
      x += w + gap;
    });
  });
  return { points, items };
}

// ---------------------------------------------------------------------------- quantities in boxes

export interface FlowNode {
  id: string;
  tex: string;
  tone?: DiagramTone;
  /** Written under the box, such as the value worked out ("0.50\\ \\text{mol}"). */
  value?: string;
}

export interface FlowArrow {
  id: string;
  from: string;
  to: string;
  tex: string;
  tone?: DiagramTone;
}

/**
 * Quantities in boxes in a row, `gap` apart, joined by arrows that say how to get from one to the
 * next. An arrow to the right is labelled above it; an arrow back to the left is labelled below
 * it. When two boxes are joined both ways, the arrow to the right runs above the middle and the
 * one back runs below it. A node's `value` is written under its box.
 *
 * Parts: each node by its `id` (a group: its box, its shading and its label), its value
 * `<id>-value`, and each arrow by its `id`.
 */
export function flow(o: { name?: string; at?: P; nodes: FlowNode[]; arrows: FlowArrow[]; width?: number; height?: number; gap?: number }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const W = o.width ?? 3;
  const H = o.height ?? 1.4;
  const G = o.gap ?? 3.4;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const index = new Map(o.nodes.map((nd, i) => [nd.id, i]));
  const left = (i: number) => x0 + i * (W + G);
  o.nodes.forEach((nd, i) => {
    const id = n(nd.id);
    const x = left(i);
    const tone = nd.tone ?? 'brand';
    const c = rect(points, `${id}-box`, x, y0 - H / 2, x + W, y0 + H / 2);
    points[`${id}-c`] = [x + W / 2, y0];
    items.push({ kind: 'region', id: `${id}-fill`, points: c, tone, shade: 0.16, group: id });
    c.forEach((p, j) => items.push({ kind: 'line', id: `${id}-side${j}`, from: p, to: c[(j + 1) % 4], tone, weight: 2.5, group: id }));
    items.push({ kind: 'label', id: `${id}-label`, at: `${id}-c`, tex: nd.tex, place: 'center', group: id });
    if (nd.value) {
      points[`${id}-v`] = [x + W / 2, y0 - H / 2 - 0.05];
      items.push({ kind: 'label', id: `${id}-value`, at: `${id}-v`, tex: nd.value, place: 'below', tone: 'good' });
    }
  });
  for (const a of o.arrows) {
    const i = index.get(a.from);
    const j = index.get(a.to);
    if (i === undefined || j === undefined) throw new Error(`flow: no node for arrow ${a.id}`);
    const both = o.arrows.some((b) => b.from === a.to && b.to === a.from);
    const forward = j > i;
    const dy = both ? (forward ? 0.28 : -0.28) : 0;
    const id = n(a.id);
    points[`${id}-s`] = [forward ? left(i) + W + 0.15 : left(i) - 0.15, y0 + dy];
    points[`${id}-e`] = [forward ? left(j) - 0.15 : left(j) + W + 0.15, y0 + dy];
    items.push({ kind: 'line', id, from: `${id}-s`, to: `${id}-e`, arrow: true, tone: a.tone ?? 'theta', weight: 3, label: a.tex, labelSide: 'left' });
  }
  return { points, items };
}

// ---------------------------------------------------------------------------- a molar mass as a bar

export interface MassPiece {
  id: string;
  /** Above the piece: what it is ("2\\ \\text{H}"). */
  top: string;
  /** Below the piece: its mass ("2.02"). */
  bottom: string;
  value: number;
  tone: DiagramTone;
}

/**
 * A molar mass as a bar `length` long (12 by default) and `height` tall, split into pieces as long
 * as their shares of the mass (but never shorter than `least` of the bar, so a small piece keeps
 * room for its labels), with what each piece is above it and its mass below it. `total` (TeX) is
 * written at the right end; `at` is the bar's bottom left corner.
 *
 * Parts: each piece by its `id` (a group: its shading, its edge and its two labels) and `total`.
 */
export function massBar(o: { name?: string; at?: P; pieces: MassPiece[]; length?: number; height?: number; least?: number; total?: string }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const L = o.length ?? 12;
  const H = o.height ?? 1.1;
  const least = o.least ?? 0.16;
  const sum = o.pieces.reduce((s, p) => s + p.value, 0);
  // Shares, with small pieces raised to `least` and the rest scaled down to make room.
  const raw = o.pieces.map((p) => p.value / sum);
  const small = raw.map((f) => f < least);
  const fixed = small.filter(Boolean).length * least;
  const rest = raw.reduce((s, f, i) => s + (small[i] ? 0 : f), 0);
  const shares = raw.map((f, i) => (small[i] ? least : (f * (1 - fixed)) / rest));
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let x = x0;
  o.pieces.forEach((p, i) => {
    const id = n(p.id);
    const w = shares[i] * L;
    const c = rect(points, `${id}-r`, x, y0, x + w, y0 + H);
    Object.assign(points, { [`${id}-t`]: [x + w / 2, y0 + H + 0.05], [`${id}-b`]: [x + w / 2, y0 - 0.05] });
    items.push(
      { kind: 'region', id: `${id}-fill`, points: c, tone: p.tone, shade: 0.45, group: id },
      { kind: 'curve', id: `${id}-edge`, points: c, closed: true, tone: p.tone, weight: 2.5, group: id },
      { kind: 'label', id: `${id}-top`, at: `${id}-t`, tex: p.top, place: 'above', group: id },
      { kind: 'label', id: `${id}-bottom`, at: `${id}-b`, tex: p.bottom, place: 'below', group: id },
    );
    x += w;
  });
  if (o.total) {
    points[n('total-at')] = [x0 + L + 0.3, y0 + H / 2];
    items.push({ kind: 'label', id: n('total'), at: n('total-at'), tex: o.total, place: 'right', tone: 'good' });
  }
  return { points, items };
}

// ---------------------------------------------------------------------------- lab pictures

/**
 * A beaker `w` wide and `h` tall (3.6 by 4 by default) with its bottom left corner at `at`, filled
 * to `level` (three quarters of `h` by default) with a solution of colour `tone`. Its `label`
 * (TeX) sits under it. `ions` writes labels (TeX) at given places in the solution, measured from
 * the bottom left corner, and `solid` draws a low heap of precipitate on the bottom, `height` tall
 * (0.5 by default), with its name `solid.tex` beside it.
 *
 * Parts: `glass` (a group: the sides, bottom and lip), `liquid`, `label`, `solid` (a group: the
 * heap, its edge and its name), and each ion label by its `id` (in its `group`, if it has one).
 */
export function beaker(o: {
  name?: string;
  at?: P;
  w?: number;
  h?: number;
  level?: number;
  tone?: DiagramTone;
  label?: string;
  ions?: { id: string; at: P; tex: string; tone?: DiagramTone; group?: string }[];
  solid?: { tone?: DiagramTone; height?: number; tex?: string };
}): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const W = o.w ?? 3.6;
  const H = o.h ?? 4;
  const level = o.level ?? H * 0.75;
  const points: Record<string, P> = {
    [n('g0')]: [x - 0.2, y + H + 0.16],
    [n('g1')]: [x, y + H],
    [n('g2')]: [x, y],
    [n('g3')]: [x + W, y],
    [n('g4')]: [x + W, y + H],
    [n('g5')]: [x + W + 0.2, y + H + 0.16],
  };
  const inset = 0.07;
  const liquid = rect(points, n('liq'), x + inset, y + inset, x + W - inset, y + level);
  const items: DiagramItem[] = [{ kind: 'region', id: n('liquid'), points: liquid, tone: o.tone ?? 'adj', shade: 0.16 }];
  for (let i = 0; i < 5; i++) items.push({ kind: 'line', id: n(`glass${i}`), from: n(`g${i}`), to: n(`g${i + 1}`), tone: 'ink', weight: 3, group: n('glass') });
  if (o.solid) {
    // The heap: a low dome along the bottom, short of the walls.
    const heap = o.solid.height ?? 0.5;
    const ids: string[] = [];
    const steps = 16;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      points[n(`heap-${i}`)] = [x + 0.2 + t * (W - 0.4), y + inset + heap * Math.pow(Math.sin(Math.PI * t), 0.6)];
      ids.push(n(`heap-${i}`));
    }
    items.push(
      { kind: 'region', id: n('heap'), points: ids, tone: o.solid.tone ?? 'ink', shade: 0.7, group: n('solid') },
      { kind: 'curve', id: n('heap-edge'), points: ids, closed: true, tone: o.solid.tone ?? 'ink', weight: 2, group: n('solid') },
    );
    if (o.solid.tex) {
      points[n('solid-at')] = [x + W + 0.3, y + 0.3];
      items.push({ kind: 'label', id: n('solid-name'), at: n('solid-at'), tex: o.solid.tex, place: 'right', group: n('solid') });
    }
  }
  for (const ion of o.ions ?? []) {
    const id = n(ion.id);
    points[`${id}-at`] = [x + ion.at[0], y + ion.at[1]];
    items.push({ kind: 'label', id, at: `${id}-at`, tex: ion.tex, place: 'center', tone: ion.tone ?? 'ink', ...(ion.group ? { group: n(ion.group) } : {}) });
  }
  if (o.label) {
    points[n('label-at')] = [x + W / 2, y - 0.1];
    items.push({ kind: 'label', id: n('label'), at: n('label-at'), tex: o.label, place: 'below' });
  }
  return { points, items };
}

/** A dish (a shallow curve) with a heap of crystals or powder on it, centred on x = `cx`. */
function dish(points: Record<string, P>, items: DiagramItem[], id: string, cx: number, tone: DiagramTone, group: string) {
  const W = 3.2;
  const rim: string[] = [];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    points[`${id}-d${i}`] = [cx - W / 2 + t * W, -0.35 * Math.sin(Math.PI * t)];
    rim.push(`${id}-d${i}`);
  }
  const heap: string[] = [];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    points[`${id}-h${i}`] = [cx - 1.15 + t * 2.3, -0.2 * Math.sin(Math.PI * t) + 0.95 * Math.pow(Math.sin(Math.PI * t), 0.8)];
    heap.push(`${id}-h${i}`);
  }
  items.push(
    { kind: 'region', id: `${id}-heap`, points: heap, tone, shade: 0.75, group },
    { kind: 'curve', id: `${id}-edge`, points: heap, closed: true, tone, weight: 2, group },
    { kind: 'curve', id: `${id}-dish`, points: rim, tone: 'muted', weight: 3, group },
  );
}

/**
 * Crystals of a hydrate heated on a dish, and the anhydrous powder left once the water has been
 * driven off as steam: the blue crystals on the left, an arrow labelled `heat`, and the white powder
 * on the right with wisps of steam rising from it. `labels` names the two solids (TeX, under them)
 * and `steam` the water given off (TeX, above the wisps).
 *
 * Parts: `before` (a group: the dish, the crystals and their name), `heat` (the arrow), `after` (a
 * group: the dish, the powder and its name) and `steam` (a group: the wisps and their label).
 */
export function heating(o: { name?: string; labels: [string, string]; steam: string }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  dish(points, items, n('a'), 0, 'adj', n('before'));
  dish(points, items, n('b'), 7, 'ink', n('after'));
  Object.assign(points, { [n('la')]: [0, -0.55], [n('lb')]: [7, -0.55], [n('ar-a')]: [2.2, 0.5], [n('ar-b')]: [4.8, 0.5] });
  items.push(
    { kind: 'label', id: n('name-a'), at: n('la'), tex: o.labels[0], place: 'below', group: n('before') },
    { kind: 'label', id: n('name-b'), at: n('lb'), tex: o.labels[1], place: 'below', group: n('after') },
    { kind: 'line', id: n('heat'), from: n('ar-a'), to: n('ar-b'), arrow: true, weight: 3, label: '\\text{heat}', labelSide: 'left', tone: 'opp' },
  );
  // Three wisps of steam: wavy lines rising from the powder.
  [-0.7, 0, 0.7].forEach((dx, k) => {
    const ids: string[] = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      points[n(`w${k}-${i}`)] = [7 + dx + 0.18 * Math.sin(t * 2.5 * Math.PI), 1.3 + t * 1.5];
      ids.push(n(`w${k}-${i}`));
    }
    items.push({ kind: 'curve', id: n(`wisp${k}`), points: ids, tone: 'muted', weight: 2.5, group: n('steam') });
  });
  points[n('steam-at')] = [7, 2.95];
  items.push({ kind: 'label', id: n('steam-name'), at: n('steam-at'), tex: o.steam, place: 'above', tone: 'adj', group: n('steam') });
  return { points, items };
}

/**
 * A precipitate caught on filter paper in a funnel, over a beaker that collects the filtrate. The
 * precipitate is named `solid` (TeX) and the filtrate `filtrate` (TeX), each beside it.
 *
 * Parts: `funnel` (a group: the cone and the stem), `paper` (the filter paper, dashed), `solid`
 * (a group: the precipitate, a pointer and its name), `beaker` (a group: the glass) and `filtrate` (a group:
 * the liquid in the beaker and its name).
 */
export function filtration(o: { name?: string; solid: string; filtrate: string }): Part {
  const n = namer(o.name);
  const pts: Record<string, P> = {
    cl: [-1.7, 4.6], cr: [1.7, 4.6], nl: [-0.22, 2.6], nr: [0.22, 2.6], sl: [-0.22, 1.2], sr: [0.22, 1.2],
    pl: [-1.45, 4.45], pt: [0, 2.85], pr: [1.45, 4.45],
    s0: [-0.72, 3.5], s1: [0, 2.95], s2: [0.72, 3.5], s3: [0.36, 3.6], s4: [-0.36, 3.6],
    b0: [-1.8, 1.8], b1: [-1.6, 1.6], b2: [-1.6, -1], b3: [1.6, -1], b4: [1.6, 1.6], b5: [1.8, 1.8],
    f0: [-1.53, -0.93], f1: [1.53, -0.93], f2: [1.53, 0.1], f3: [-1.53, 0.1],
    sp: [0.45, 3.3], sq: [2.2, 2.75], sn: [2.25, 2.75], fn: [1.85, -0.4],
  };
  const points: Record<string, P> = Object.fromEntries(Object.entries(pts).map(([k, v]) => [n(k), v]));
  const L = (id: string, a: string, b: string, group: string, extra: Partial<DiagramItem> = {}): DiagramItem => ({ kind: 'line', id: n(id), from: n(a), to: n(b), tone: 'ink', weight: 3, group: n(group), ...extra }) as DiagramItem;
  const items: DiagramItem[] = [
    { kind: 'region', id: n('filtrate-fill'), points: ['f0', 'f1', 'f2', 'f3'].map(n), tone: 'adj', shade: 0.18, group: n('filtrate') },
    L('cone-l', 'cl', 'nl', 'funnel'),
    L('cone-r', 'cr', 'nr', 'funnel'),
    L('stem-l', 'nl', 'sl', 'funnel'),
    L('stem-r', 'nr', 'sr', 'funnel'),
    { kind: 'curve', id: n('paper'), points: ['pl', 'pt', 'pr'].map(n), tone: 'muted', weight: 2.5, dashed: true },
    { kind: 'region', id: n('solid-fill'), points: ['s0', 's1', 's2', 's3', 's4'].map(n), tone: 'ink', shade: 0.75, group: n('solid') },
    { kind: 'line', id: n('solid-pointer'), from: n('sp'), to: n('sq'), tone: 'muted', weight: 2, group: n('solid') },
    { kind: 'label', id: n('solid-name'), at: n('sn'), tex: o.solid, place: 'right', group: n('solid') },
    ...[0, 1, 2, 3, 4].map((i) => L(`glass${i}`, `b${i}`, `b${i + 1}`, 'beaker')),
    { kind: 'label', id: n('filtrate-name'), at: n('fn'), tex: o.filtrate, place: 'right', group: n('filtrate') },
  ];
  return { points, items };
}
