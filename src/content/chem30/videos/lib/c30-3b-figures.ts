/**
 * Figures for the second half of the Chemical Changes of Organic Compounds videos (Grade 12
 * Chemistry, unit 3, lessons 3.5 to 3.7), built only from standard diagram parts (lines, curves,
 * shaded regions and labels), so each goes into a diagram with `figure` (src/video/solids.ts):
 *
 * - `structure`: a structural formula, every atom a symbol and every bond a line (two for a double
 *   bond, three for a triple), laid out on a grid; an atom with an empty symbol is a bond left open,
 *   as at the ends of a polymer chain.
 * - `tag`, `arrow` and `room`: a label or an arrow at given points, and two unused points that keep
 *   space for labels; `join` puts parts together.
 * - `ring`: an oval around atoms (the atoms that leave as water, say); `brackets`: square brackets
 *   around a polymer's repeating unit, with its n.
 * - `tube`: a test tube of liquid, for the bromine water test; `bath`: a beaker of warm water to
 *   stand a tube in.
 * - `column`: a fractionating column, hot at the bottom and cool at the top, with its fractions.
 * - `block`: a monomer drawn as a box, for condensation polymers.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

/** Joins parts into one. */
export function join(parts: Part[]): Part {
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}

/** A label (TeX) at a point. Part: its `id`. */
export function tag(id: string, at: P, tex: string, o: { place?: Place; tone?: DiagramTone; group?: string } = {}): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: o.place ?? 'center', tone: o.tone ?? 'ink', ...(o.group ? { group: o.group } : {}) }] };
}

/** An arrow from one point to another, with an optional label (TeX) beside its middle. Part: its `id`. */
export function arrow(id: string, from: P, to: P, o: { tone?: DiagramTone; label?: string; labelSide?: 'left' | 'right'; group?: string; weight?: number; dashed?: boolean } = {}): Part {
  return {
    points: { [`${id}-a`]: from, [`${id}-b`]: to },
    items: [
      {
        kind: 'line',
        id,
        from: `${id}-a`,
        to: `${id}-b`,
        arrow: true,
        tone: o.tone ?? 'ink',
        weight: o.weight ?? 3,
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

/** An atom of a structural formula: its symbol (mhchem, so "CH3" or "OH" work; empty for an open bond), x and y on the grid, and a colour. */
export type GridAtom = [string, number, number] | [string, number, number, DiagramTone];

/** How far a bond stops short of an atom's centre, in the direction (ux, uy): the edge of an oval round its symbol. */
function trim(symbol: string, ux: number, uy: number): number {
  if (!symbol) return 0;
  const letters = symbol.replace(/\d/g, '').length + 0.5 * symbol.replace(/\D/g, '').length;
  const rx = 0.17 + 0.2 * letters;
  const ry = 0.36;
  return 1 / Math.sqrt((ux / rx) ** 2 + (uy / ry) ** 2);
}

/**
 * A structural formula. Each atom sits at `at` plus its grid place times `unit` (1.5 by default);
 * `bonds` lists the bonds as "C1-C2 C1=O1 C2#C3" (single, double, triple), by the atoms' ids.
 *
 * Parts (each starts with the `name`): each atom by its id (`name-C1`), and each bond by its two
 * atoms (`name-C1-C2`; the second and third lines of a double or triple bond are `name-C1-C2-2` and
 * `name-C1-C2-3`). Every part is in the group `group` (the `name` by default), so the whole
 * molecule shows at once.
 */
export function structure(o: { name: string; at?: P; unit?: number; atoms: Record<string, GridAtom>; bonds: string; group?: string; tone?: DiagramTone }): Part {
  const [x0, y0] = o.at ?? [0, 0];
  const u = o.unit ?? 1.5;
  const group = o.group ?? o.name;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const pos = (id: string): P => {
    const a = o.atoms[id];
    if (!a) throw new Error(`structure ${o.name}: no atom "${id}"`);
    return [x0 + a[1] * u, y0 + a[2] * u];
  };
  // Bonds first, so the symbols are drawn over their ends.
  for (const b of o.bonds.trim().split(/\s+/).filter(Boolean)) {
    const m = b.match(/^(\w+)([-=#])(\w+)$/);
    if (!m) throw new Error(`structure ${o.name}: bad bond "${b}"`);
    const [, a, kind, c] = m;
    const A = pos(a);
    const B = pos(c);
    const len = Math.hypot(B[0] - A[0], B[1] - A[1]);
    const ux = (B[0] - A[0]) / len;
    const uy = (B[1] - A[1]) / len;
    const ta = trim(o.atoms[a][0], ux, uy);
    const tb = trim(o.atoms[c][0], -ux, -uy);
    const offsets = kind === '-' ? [0] : kind === '=' ? [-0.09, 0.09] : [-0.14, 0, 0.14];
    offsets.forEach((off, i) => {
      const id = `${o.name}-${a}-${c}${i ? `-${i + 1}` : ''}`;
      points[`${id}-a`] = [A[0] + ux * ta - uy * off, A[1] + uy * ta + ux * off];
      points[`${id}-b`] = [B[0] - ux * tb - uy * off, B[1] - uy * tb + ux * off];
      items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, weight: 3, tone: o.tone ?? 'ink', group });
    });
  }
  for (const [id, a] of Object.entries(o.atoms)) {
    const pid = `${o.name}-${id}`;
    points[pid] = pos(id);
    if (a[0]) items.push({ kind: 'label', id: pid, at: pid, tex: `\\ce{${a[0]}}`, place: 'center', tone: a[3] ?? o.tone ?? 'ink', group });
  }
  return { points, items };
}

/** An oval (dashed unless `solid`) around a centre, `rx` across and `ry` up. Part: its `id`. */
export function ring(id: string, at: P, rx: number, ry: number, o: { tone?: DiagramTone; solid?: boolean; group?: string } = {}): Part {
  const points: Record<string, P> = {};
  const names = Array.from({ length: 36 }, (_, j) => {
    const a = (2 * Math.PI * j) / 36;
    points[`${id}-${j}`] = [at[0] + rx * Math.cos(a), at[1] + ry * Math.sin(a)];
    return `${id}-${j}`;
  });
  return { points, items: [{ kind: 'curve', id, points: names, closed: true, tone: o.tone ?? 'theta', weight: 2.5, ...(o.solid ? {} : { dashed: true }), ...(o.group ? { group: o.group } : {}) }] };
}

/**
 * Square brackets from x0 to x1 and y0 to y1 around a polymer's repeating unit, with `n` (TeX) at
 * the bottom right. Parts (in the group `id`): `id-l0`…, `id-r0`… and `id-n`.
 */
export function brackets(id: string, x0: number, x1: number, y0: number, y1: number, o: { n?: string; tone?: DiagramTone } = {}): Part {
  const t = 0.22;
  const points: Record<string, P> = {
    [`${id}-l0`]: [x0 + t, y1],
    [`${id}-l1`]: [x0, y1],
    [`${id}-l2`]: [x0, y0],
    [`${id}-l3`]: [x0 + t, y0],
    [`${id}-r0`]: [x1 - t, y1],
    [`${id}-r1`]: [x1, y1],
    [`${id}-r2`]: [x1, y0],
    [`${id}-r3`]: [x1 - t, y0],
    [`${id}-nat`]: [x1 + 0.05, y0 + 0.1],
  };
  const items: DiagramItem[] = [];
  for (const s of ['l', 'r'])
    for (let i = 0; i < 3; i++) items.push({ kind: 'line', id: `${id}-${s}${i}`, from: `${id}-${s}${i}`, to: `${id}-${s}${i + 1}`, weight: 3, tone: o.tone ?? 'theta', group: id });
  items.push({ kind: 'label', id: `${id}-n`, at: `${id}-nat`, tex: o.n ?? 'n', place: 'below right', tone: o.tone ?? 'theta', group: id });
  return { points, items };
}

/**
 * A test tube with its mouth at the top, `w` wide and `h` tall (1.2 by 4 by default), its bottom at
 * `at`, filled to `level` (half its height by default) with a liquid of colour `tone` (or a faint
 * grey when it is colourless), with a `label` (TeX) under it. Parts (in the group `id`): `id-glass`,
 * `id-liquid` and `id-label`.
 */
export function tube(id: string, at: P, o: { w?: number; h?: number; level?: number; tone?: DiagramTone; shade?: number; label?: string } = {}): Part {
  const w = o.w ?? 1.2;
  const h = o.h ?? 4;
  const r = w / 2;
  const [cx, by] = at;
  const level = o.level ?? h / 2;
  const points: Record<string, P> = {};
  // The glass: down the left side, round the bottom, up the right side.
  const glass: string[] = [];
  const add = (name: string, p: P) => {
    points[name] = p;
    return name;
  };
  glass.push(add(`${id}-g0`, [cx - r, by + h]));
  for (let j = 0; j <= 12; j++) {
    const a = Math.PI + (Math.PI * j) / 12;
    glass.push(add(`${id}-g${j + 1}`, [cx + r * Math.cos(a), by + r + r * Math.sin(a)]));
  }
  glass.push(add(`${id}-g14`, [cx + r, by + h]));
  // The liquid: the bottom half-circle and up to the level.
  const liquid: string[] = [add(`${id}-q0`, [cx - r + 0.06, by + level])];
  for (let j = 0; j <= 12; j++) {
    const a = Math.PI + (Math.PI * j) / 12;
    liquid.push(add(`${id}-q${j + 1}`, [cx + (r - 0.06) * Math.cos(a), by + r + (r - 0.06) * Math.sin(a)]));
  }
  liquid.push(add(`${id}-q14`, [cx + r - 0.06, by + level]));
  points[`${id}-lab`] = [cx, by - 0.15];
  const items: DiagramItem[] = [
    { kind: 'region', id: `${id}-liquid`, points: liquid, tone: o.tone ?? 'muted', shade: o.shade ?? (o.tone ? 0.75 : 0.12), group: id },
    { kind: 'curve', id: `${id}-glass`, points: glass, tone: 'ink', weight: 3, group: id },
  ];
  if (o.label) items.push({ kind: 'label', id: `${id}-label`, at: `${id}-lab`, tex: o.label, place: 'below', group: id });
  return { points, items };
}

/**
 * A water bath: a beaker `w` wide and `h` tall (5 by 4 by default) with its bottom left corner at
 * `at`, filled to `level` (two thirds of `h` by default) with water, and a `label` (TeX) under it.
 * Parts (in the group `id`): `id-water`, `id-glass` and `id-label`.
 */
export function bath(id: string, at: P, o: { w?: number; h?: number; level?: number; label?: string } = {}): Part {
  const w = o.w ?? 5;
  const h = o.h ?? 4;
  const level = o.level ?? (2 * h) / 3;
  const [x, y] = at;
  const points: Record<string, P> = {
    [`${id}-0`]: [x, y + h],
    [`${id}-1`]: [x, y],
    [`${id}-2`]: [x + w, y],
    [`${id}-3`]: [x + w, y + h],
    [`${id}-w0`]: [x + 0.05, y + 0.05],
    [`${id}-w1`]: [x + w - 0.05, y + 0.05],
    [`${id}-w2`]: [x + w - 0.05, y + level],
    [`${id}-w3`]: [x + 0.05, y + level],
    [`${id}-lab`]: [x + w / 2, y - 0.15],
  };
  const items: DiagramItem[] = [
    { kind: 'region', id: `${id}-water`, points: [`${id}-w0`, `${id}-w1`, `${id}-w2`, `${id}-w3`], tone: 'adj', shade: 0.22, group: id },
    { kind: 'curve', id: `${id}-glass`, points: [`${id}-0`, `${id}-1`, `${id}-2`, `${id}-3`], tone: 'ink', weight: 3, group: id },
  ];
  if (o.label) items.push({ kind: 'label', id: `${id}-label`, at: `${id}-lab`, tex: o.label, place: 'below', group: id });
  return { points, items };
}

/**
 * A monomer or a piece of a chain drawn as a box `w` by `h` centred at `at`, shaded in `tone`, with
 * a label (TeX) inside. Parts (in the group `id`, or `group`): `id-box`, `id-edge` and `id-label`.
 */
export function block(id: string, at: P, o: { w?: number; h?: number; tone?: DiagramTone; label?: string; group?: string } = {}): Part {
  const w = (o.w ?? 1.6) / 2;
  const h = (o.h ?? 1) / 2;
  const [x, y] = at;
  const g = o.group ?? id;
  const points: Record<string, P> = {
    [`${id}-0`]: [x - w, y - h],
    [`${id}-1`]: [x + w, y - h],
    [`${id}-2`]: [x + w, y + h],
    [`${id}-3`]: [x - w, y + h],
    [`${id}-c`]: at,
  };
  const corners = [`${id}-0`, `${id}-1`, `${id}-2`, `${id}-3`];
  const items: DiagramItem[] = [
    { kind: 'region', id: `${id}-box`, points: corners, tone: o.tone ?? 'adj', shade: 0.35, group: g },
    { kind: 'curve', id: `${id}-edge`, points: corners, closed: true, tone: o.tone ?? 'adj', weight: 2.5, group: g },
  ];
  if (o.label) items.push({ kind: 'label', id: `${id}-label`, at: `${id}-c`, tex: o.label, place: 'center', group: g });
  return { points, items };
}

/** A fraction drawn off a fractionating column: its name and carbons (TeX) and its height up the column (0 to 1). */
export interface Fraction {
  id: string;
  tex: string;
  at: number;
}

/**
 * A fractionating column `h` tall and `w` wide (10 by 2.4 by default) with its bottom left corner
 * at `at`: crude oil vapour enters at the bottom from the left, trays at each fraction's height draw
 * it off to the right, and labels on the left say the column is hot at the bottom and cool at the
 * top. A fraction at height 1 leaves from the top as a gas, and one at height 0 from the bottom.
 *
 * Parts: `col` (a group: the walls), `feed` (a group: the arrow in and its label), `temp` (a group:
 * the arrow up the left side and its labels "hot" and "cool"), and each fraction by its `id` (a group:
 * its tray, its arrow out and its label).
 */
export function column(o: { at?: P; w?: number; h?: number; fractions: Fraction[]; feed?: string; hot?: string; cool?: string }): Part {
  const [x0, y0] = o.at ?? [0, 0];
  const w = o.w ?? 2.4;
  const h = o.h ?? 10;
  const points: Record<string, P> = {
    'col-bl': [x0, y0],
    'col-br': [x0 + w, y0],
    'col-tr': [x0 + w, y0 + h],
    'col-tl': [x0, y0 + h],
    'col-top-l': [x0 + w * 0.3, y0 + h],
    'col-top-r': [x0 + w * 0.7, y0 + h],
  };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'col-left', from: 'col-bl', to: 'col-tl', weight: 3.5, tone: 'ink', group: 'col' },
    { kind: 'line', id: 'col-right', from: 'col-br', to: 'col-tr', weight: 3.5, tone: 'ink', group: 'col' },
    { kind: 'line', id: 'col-floor', from: 'col-bl', to: 'col-br', weight: 3.5, tone: 'ink', group: 'col' },
    { kind: 'line', id: 'col-cap-l', from: 'col-tl', to: 'col-top-l', weight: 3.5, tone: 'ink', group: 'col' },
    { kind: 'line', id: 'col-cap-r', from: 'col-top-r', to: 'col-tr', weight: 3.5, tone: 'ink', group: 'col' },
  ];
  // The vapour comes in near the bottom, from the left.
  Object.assign(points, { 'feed-a': [x0 - 3.2, y0 + 1.2], 'feed-b': [x0 - 0.05, y0 + 1.2], 'feed-t': [x0 - 2.0, y0 + 1.2] });
  items.push(
    { kind: 'line', id: 'feed-arrow', from: 'feed-a', to: 'feed-b', arrow: true, weight: 3.5, tone: 'opp', group: 'feed' },
    { kind: 'label', id: 'feed-label', at: 'feed-t', tex: o.feed ?? '\\begin{gathered}\\text{crude oil}\\\\ \\text{vapour}\\end{gathered}', place: 'below', tone: 'opp', group: 'feed' },
  );
  // Hot at the bottom, cool at the top: an arrow up the left side.
  Object.assign(points, { 'temp-a': [x0 - 0.9, y0 + 3.1], 'temp-b': [x0 - 0.9, y0 + h - 1.0], 'temp-hot': [x0 - 0.9, y0 + 2.9], 'temp-cool': [x0 - 0.9, y0 + h - 0.8] });
  items.push(
    { kind: 'line', id: 'temp-arrow', from: 'temp-a', to: 'temp-b', arrow: true, weight: 2.5, tone: 'adj', group: 'temp' },
    { kind: 'label', id: 'temp-hot-label', at: 'temp-hot', tex: o.hot ?? '\\text{hot}', place: 'below', tone: 'bad', group: 'temp' },
    { kind: 'label', id: 'temp-cool-label', at: 'temp-cool', tex: o.cool ?? '\\text{cool}', place: 'above', tone: 'adj', group: 'temp' },
  );
  for (const f of o.fractions) {
    const y = y0 + f.at * h;
    if (f.at >= 1) {
      // Gases leave from the top.
      Object.assign(points, { [`${f.id}-a`]: [x0 + w / 2, y0 + h], [`${f.id}-b`]: [x0 + w / 2, y0 + h + 1.2], [`${f.id}-t`]: [x0 + w / 2 + 0.45, y0 + h + 1.3] });
      items.push(
        { kind: 'line', id: `${f.id}-out`, from: `${f.id}-a`, to: `${f.id}-b`, arrow: true, weight: 3, tone: 'theta', group: f.id },
        { kind: 'label', id: `${f.id}-label`, at: `${f.id}-t`, tex: f.tex, place: 'right', group: f.id },
      );
      continue;
    }
    const ty = f.at <= 0 ? y0 + 0.35 : y;
    Object.assign(points, {
      [`${f.id}-t0`]: [x0 + 0.1, ty],
      [`${f.id}-t1`]: [x0 + w - 0.1, ty],
      [`${f.id}-a`]: [x0 + w, ty],
      [`${f.id}-b`]: [x0 + w + 1.1, ty],
      [`${f.id}-t`]: [x0 + w + 1.2, ty],
    });
    if (f.at > 0) items.push({ kind: 'line', id: `${f.id}-tray`, from: `${f.id}-t0`, to: `${f.id}-t1`, weight: 2.5, tone: 'muted', group: f.id });
    items.push(
      { kind: 'line', id: `${f.id}-out`, from: `${f.id}-a`, to: `${f.id}-b`, arrow: true, weight: 3, tone: 'theta', group: f.id },
      { kind: 'label', id: `${f.id}-label`, at: `${f.id}-t`, tex: f.tex, place: 'right', group: f.id },
    );
  }
  return { points, items };
}
