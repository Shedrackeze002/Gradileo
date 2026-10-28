/**
 * Chemistry figures for video diagrams: an atom's electron shells (a Bohr diagram), Lewis
 * structures of atoms, ions and molecules, particles in a container (solids, liquids, gases and
 * mixtures), the energy diagram of a reaction, and the main-group elements of the periodic table.
 * Each function returns a `Part`; `figure` (solids.ts) puts one or more into a diagram, and a
 * script shows their named parts as the narrator mentions them. With a `name`, each id starts
 * with it ("na-shell-1").
 */
import type { DiagramItem, DiagramTone } from './script.ts';
import type { Part } from './solids.ts';

type P = [number, number];

function namer(name: string | undefined) {
  return (s: string) => (name ? `${name}-${s}` : s);
}

/** Point names around a circle, added to `points`; `steps` points, starting on the right. */
function ring(points: Record<string, P>, id: string, c: P, r: number, steps = 24): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const a = (2 * Math.PI * j) / steps;
    points[`${id}-${j}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${id}-${j}`;
  });
}

/** A filled circle with an edge, as two parts: the fill `id` and the edge `id-edge`. */
function ball(points: Record<string, P>, items: DiagramItem[], id: string, c: P, r: number, tone: DiagramTone, group?: string) {
  const ids = ring(points, id, c, r, 16);
  items.push(
    { kind: 'region', id, points: ids, tone, shade: 0.75, ...(group ? { group } : {}) },
    { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone, weight: 2, ...(group ? { group } : {}) },
  );
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
 * Where the electrons on a shell sit, as angles: up to four at the top, bottom, right and left (so
 * two sit opposite each other), then a second beside each of those to make pairs (the way shell
 * diagrams are drawn in class),
 * and spread evenly round a shell holding more than eight. `pair` is the angle between the two
 * electrons of a pair.
 */
export function electronAngles(count: number, pair: number): number[] {
  if (count > 8) return Array.from({ length: count }, (_, i) => Math.PI / 2 - (2 * Math.PI * i) / count);
  const sides = [Math.PI / 2, -Math.PI / 2, 0, Math.PI];
  return Array.from({ length: count }, (_, i) => {
    const side = sides[i % 4];
    if (count <= 4) return side;
    // A side with two electrons has them either side of it; a side with one keeps it in the middle.
    const paired = i % 4 < count - 4;
    return paired ? side + (i < 4 ? pair / 2 : -pair / 2) : side;
  });
}

/**
 * An atom's electron shells (a Bohr diagram): the nucleus, labelled with `nucleus` (TeX, such as
 * `"\\text{Na}"`) or with its `protons` and `neutrons` on two lines ("11p⁺" over "12n⁰"), and a
 * ring for each shell with its electrons, from the innermost out (`[2, 8, 1]` for sodium). The
 * nucleus has radius `r` (1.4 by default) and the shells are `gap` apart (1.1 by default); `at` is
 * the centre.
 *
 * Parts: `nucleus` (a group: `nucleus-fill`, `nucleus-edge` and `nucleus-label`) and `shell-1`,
 * `shell-2`… (each a group: its ring `ring-k` and its electrons `e-k-0`, `e-k-1`…).
 */
export function atomShells(o: {
  name?: string;
  at?: P;
  nucleus?: string;
  protons?: number;
  neutrons?: number;
  shells: number[];
  r?: number;
  gap?: number;
  tone?: DiagramTone;
  electron?: DiagramTone;
}): Part {
  const n = namer(o.name);
  const c = o.at ?? [0, 0];
  const r = o.r ?? 1.4;
  const nucleus = o.nucleus ?? `\\begin{gathered}${o.protons ?? 0}p^+\\\\ ${o.neutrons ?? 0}n^0\\end{gathered}`;
  const gap = o.gap ?? 1.1;
  const points: Record<string, P> = { [n('c')]: c };
  const items: DiagramItem[] = [];
  const core = ring(points, n('core'), c, r);
  items.push(
    { kind: 'region', id: n('nucleus-fill'), points: core, tone: o.tone ?? 'opp', shade: 0.3, group: n('nucleus') },
    { kind: 'curve', id: n('nucleus-edge'), points: core, closed: true, tone: o.tone ?? 'opp', weight: 2.5, group: n('nucleus') },
    { kind: 'label', id: n('nucleus-label'), at: n('c'), tex: nucleus, place: 'center', group: n('nucleus') },
  );
  o.shells.forEach((count, s) => {
    const k = s + 1;
    const R = r + k * gap;
    const group = n(`shell-${k}`);
    items.push({ kind: 'curve', id: n(`ring-${k}`), points: ring(points, n(`orbit${k}`), c, R, 48), closed: true, tone: 'muted', weight: 2, group });
    // The two electrons of a pair are a fixed distance apart on every shell.
    electronAngles(count, 0.5 / R).forEach((a, i) => {
      points[n(`e${k}-${i}`)] = [c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)];
      items.push({ kind: 'label', id: n(`e-${k}-${i}`), at: n(`e${k}-${i}`), tex: '', dot: true, tone: o.electron ?? 'adj', place: 'center', group });
    });
  });
  // Room for the outer ring, so the drawing does not crowd the edge of its space.
  const out = r + o.shells.length * gap + 0.3;
  Object.assign(points, { [n('frame-a')]: [c[0] - out, c[1] - out], [n('frame-b')]: [c[0] + out, c[1] + out] });
  return { points, items };
}

/** An atom in a Lewis structure. */
export interface LewisAtom {
  id: string;
  /** The symbol, such as "O" (written as text). */
  symbol: string;
  at: P;
  /** The dots on each side, top, right, bottom and left: 0, 1 or 2 (a lone pair). */
  dots?: [number, number, number, number];
  tone?: DiagramTone;
}

/** A bond between two atoms: a line for each shared pair, or the shared electrons as dots. */
export interface LewisBond {
  from: string;
  to: string;
  order?: 1 | 2 | 3;
  /** Draw the shared electrons as dots between the atoms instead of lines. */
  dots?: boolean;
}

/**
 * A Lewis structure: atoms with their valence electrons as dots, bonds as lines (or as dot pairs),
 * and, for an ion, square brackets with the charge. Place bonded atoms about 1.6 apart. Dots sit
 * 0.42 from an atom's centre, so leave the side a bond leaves from without dots.
 *
 * Parts: each atom's symbol by its `id`, its dots as a group `id-dots` (`id-e0`, `id-e1`…), each
 * bond as a group `bond-a-b` (lines or dots `bond-a-b-0`…), and with `charge` the group `bracket`
 * (both brackets and the charge `charge`).
 */
export function lewis(o: { name?: string; atoms: LewisAtom[]; bonds?: LewisBond[]; charge?: string; dotTone?: DiagramTone; width?: number }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const dotTone = o.dotTone ?? 'adj';
  const D = 0.42;
  const SPREAD = 0.13;
  const at = new Map(o.atoms.map((a) => [a.id, a.at]));
  // Bonds first, so the symbols are drawn over their ends.
  for (const b of o.bonds ?? []) {
    const A = at.get(b.from);
    const B = at.get(b.to);
    if (!A || !B) throw new Error(`lewis: no atom "${!A ? b.from : b.to}"`);
    const len = Math.hypot(B[0] - A[0], B[1] - A[1]);
    const u: P = [(B[0] - A[0]) / len, (B[1] - A[1]) / len];
    const v: P = [-u[1], u[0]];
    const order = b.order ?? 1;
    const group = n(`bond-${b.from}-${b.to}`);
    const offsets = order === 1 ? [0] : order === 2 ? [-0.09, 0.09] : [-0.14, 0, 0.14];
    offsets.forEach((off, i) => {
      const id = n(`bond-${b.from}-${b.to}-${i}`);
      if (b.dots) {
        // A shared pair: two dots across the middle of the bond, one pair beside the next.
        const m: P = [(A[0] + B[0]) / 2 + u[0] * off * 1.6, (A[1] + B[1]) / 2 + u[1] * off * 1.6];
        points[`${id}-a`] = [m[0] + v[0] * SPREAD, m[1] + v[1] * SPREAD];
        points[`${id}-b`] = [m[0] - v[0] * SPREAD, m[1] - v[1] * SPREAD];
        items.push(
          { kind: 'label', id, at: `${id}-a`, tex: '', dot: true, tone: dotTone, place: 'center', group },
          { kind: 'label', id: `${id}-2`, at: `${id}-b`, tex: '', dot: true, tone: dotTone, place: 'center', group },
        );
        return;
      }
      points[`${id}-a`] = [A[0] + u[0] * 0.34 + v[0] * off, A[1] + u[1] * 0.34 + v[1] * off];
      points[`${id}-b`] = [B[0] - u[0] * 0.34 + v[0] * off, B[1] - u[1] * 0.34 + v[1] * off];
      items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, weight: 3, group });
    });
  }
  const dirs: P[] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  for (const a of o.atoms) {
    const id = n(a.id);
    points[id] = a.at;
    items.push({ kind: 'label', id, at: id, tex: `\\text{${a.symbol}}`, place: 'center', ...(a.tone ? { tone: a.tone } : {}) });
    let e = 0;
    (a.dots ?? [0, 0, 0, 0]).forEach((count, side) => {
      const [dx, dy] = dirs[side];
      const offs = count === 1 ? [0] : count === 2 ? [-SPREAD, SPREAD] : [];
      for (const off of offs) {
        const p = `${id}-p${e}`;
        points[p] = [a.at[0] + dx * D + dy * off, a.at[1] + dy * D + dx * off];
        items.push({ kind: 'label', id: `${id}-e${e}`, at: p, tex: '', dot: true, tone: dotTone, place: 'center', group: `${id}-dots` });
        e++;
      }
    });
  }
  const xs = o.atoms.map((a) => a.at[0]);
  const ys = o.atoms.map((a) => a.at[1]);
  const box = { x0: Math.min(...xs) - 0.75, x1: Math.max(...xs) + 0.75, y0: Math.min(...ys) - 0.75, y1: Math.max(...ys) + 0.75 };
  if (o.charge) {
    // Square brackets around the whole ion, and its charge at the top right.
    const t = 0.18;
    Object.assign(points, {
      [n('bl0')]: [box.x0 + t, box.y1],
      [n('bl1')]: [box.x0, box.y1],
      [n('bl2')]: [box.x0, box.y0],
      [n('bl3')]: [box.x0 + t, box.y0],
      [n('br0')]: [box.x1 - t, box.y1],
      [n('br1')]: [box.x1, box.y1],
      [n('br2')]: [box.x1, box.y0],
      [n('br3')]: [box.x1 - t, box.y0],
      [n('q')]: [box.x1 + 0.05, box.y1 + 0.05],
    });
    for (const s of ['l', 'r'])
      for (let i = 0; i < 3; i++) items.push({ kind: 'line', id: n(`b${s}${i}`), from: n(`b${s}${i}`), to: n(`b${s}${i + 1}`), weight: 3, group: n('bracket') });
    items.push({ kind: 'label', id: n('charge'), at: n('q'), tex: o.charge, place: 'above right', group: n('bracket') });
  }
  // A structure narrower than `width` (3 by default) is drawn at the scale of one that wide, so a
  // single atom is not blown up to fill its space.
  const w = o.width ?? 3;
  const cx = (box.x0 + box.x1) / 2;
  const cy = (box.y0 + box.y1) / 2;
  Object.assign(points, { [n('frame-a')]: [Math.min(box.x0, cx - w / 2), cy], [n('frame-b')]: [Math.max(box.x1, cx + w / 2), cy] });
  return { points, items };
}

/** A kind of particle in a container: single atoms, or molecules of two atoms. */
export interface ParticleKind {
  id: string;
  tone: DiagramTone;
  count: number;
  /** Two atoms joined, for a molecule such as O₂ or HCl. */
  atoms?: 1 | 2;
  /** The second atom's colour, for a compound such as HCl (the first atom's by default). */
  second?: DiagramTone;
}

/**
 * Particles in a container, drawn the way the particle model is taught: a solid packed in rows,
 * a liquid close together but jumbled at the bottom, a gas spread out with space between. Several
 * kinds make a mixture; each is placed at random (the same way every time, from `seed`). The
 * container is `size` across (6 by default) with `at` its bottom left corner; `open` leaves off
 * the lid.
 *
 * Parts: `box` (a group: the container's sides), and each kind by its `id` (a group of its
 * particles).
 */
export function particles(o: { name?: string; at?: P; state: 'solid' | 'liquid' | 'gas'; kinds?: ParticleKind[]; size?: number; seed?: number; open?: boolean }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const size = o.size ?? 6;
  const rand = random(o.seed ?? 7);
  const kinds = o.kinds ?? [{ id: 'p', tone: 'adj' as DiagramTone, count: o.state === 'gas' ? 10 : 16 }];
  const total = kinds.reduce((t, k) => t + k.count, 0);
  const pairs = kinds.some((k) => k.atoms === 2);
  const r = pairs ? 0.24 : 0.3;
  const cell = pairs ? 1.05 : 0.66;
  const points: Record<string, P> = {
    [n('c0')]: [x0, y0 + size],
    [n('c1')]: [x0, y0],
    [n('c2')]: [x0 + size, y0],
    [n('c3')]: [x0 + size, y0 + size],
  };
  const items: DiagramItem[] = [];
  items.push(
    { kind: 'line', id: n('side-l'), from: n('c0'), to: n('c1'), weight: 3, tone: 'muted', group: n('box') },
    { kind: 'line', id: n('floor'), from: n('c1'), to: n('c2'), weight: 3, tone: 'muted', group: n('box') },
    { kind: 'line', id: n('side-r'), from: n('c2'), to: n('c3'), weight: 3, tone: 'muted', group: n('box') },
  );
  if (!o.open) items.push({ kind: 'line', id: n('lid'), from: n('c3'), to: n('c0'), weight: 3, tone: 'muted', group: n('box') });

  // The centre of each particle, inside the container.
  const spots: P[] = [];
  if (o.state === 'gas') {
    const margin = r * 2 + 0.2;
    // As far apart as they will go: start wide, and if they do not all fit, start again a little closer.
    for (let apart = Math.min(2, (size - 2 * margin) / Math.sqrt(total)) * (pairs ? 1.2 : 1); spots.length < total; apart *= 0.92) {
      spots.length = 0;
      for (let tries = 0; spots.length < total && tries < 3000; tries++) {
        const p: P = [x0 + margin + rand() * (size - 2 * margin), y0 + margin + rand() * (size - 2 * margin)];
        if (spots.every((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) >= apart)) spots.push(p);
      }
    }
  } else {
    // Rows from the floor up, centred: a solid in neat rows, a liquid in rows that are nudged and
    // broken up a little.
    const cols = Math.max(1, Math.min(Math.floor((size - 0.3) / cell), Math.ceil(Math.sqrt(total * (o.state === 'liquid' ? 2 : 1)))));
    const rows = Math.ceil(total / cols);
    const left = x0 + (size - cols * cell) / 2 + cell / 2;
    for (let i = 0; i < total; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const inRow = row === rows - 1 ? total - row * cols : cols;
      const shift = ((cols - inRow) * cell) / 2;
      let p: P = [left + shift + col * cell, y0 + 0.05 + cell / 2 + row * cell];
      if (o.state === 'liquid') p = [p[0] + (rand() - 0.5) * cell * 0.35 + (row % 2 ? cell * 0.25 : 0), p[1] + (rand() - 0.5) * cell * 0.25];
      spots.push(p);
    }
  }
  // Which kind goes in each spot: shuffled, so a mixture is mixed.
  const order = kinds.flatMap((k, ki) => Array.from({ length: k.count }, () => ki));
  if (kinds.length > 1)
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
  const counts = kinds.map(() => 0);
  spots.forEach((p, i) => {
    const k = kinds[order[i]];
    const id = n(`${k.id}${counts[order[i]]++}`);
    if (k.atoms === 2) {
      // Two atoms side by side, turned at random in a liquid or gas.
      const a = o.state === 'solid' ? 0 : rand() * Math.PI;
      const d: P = [Math.cos(a) * r * 0.95, Math.sin(a) * r * 0.95];
      ball(points, items, `${id}a`, [p[0] - d[0], p[1] - d[1]], r, k.tone, n(k.id));
      ball(points, items, `${id}b`, [p[0] + d[0], p[1] + d[1]], r, k.second ?? k.tone, n(k.id));
    } else ball(points, items, id, p, r, k.tone, n(k.id));
  });
  return { points, items };
}

/**
 * The energy diagram of a reaction: energy up the side and the reaction's progress along the
 * bottom, with the reactants' level on the left, a hump up to the top of the energy barrier, and
 * the products' level on the right. Levels are in diagram units, from 0 to `height` (6 by
 * default); the drawing is `width` wide (8 by default), with `at` the corner of the axes.
 *
 * Parts: `axes` (a group: the axes and their titles), `curve`, the labels `reactants` and
 * `products`, `dh` (a group: a dashed line along the reactants' level and an arrow from it to the
 * products' level labelled `labels.dh`, ΔH by default), and `ea` (a group: the activation energy,
 * an arrow from the reactants' level up to the top of the hump, labelled `labels.ea`).
 */
export function energyDiagram(o: {
  name?: string;
  at?: P;
  reactants: number;
  products: number;
  peak: number;
  width?: number;
  height?: number;
  labels?: { reactants?: string; products?: string; dh?: string; ea?: string; y?: string; x?: string };
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const W = o.width ?? 8;
  const H = o.height ?? 6;
  const L = o.labels ?? {};
  const map = (x: number, y: number): P => [x0 + (x / 10) * W, y0 + y];
  const points: Record<string, P> = {
    [n('o')]: map(0, 0),
    [n('xb')]: map(10, 0),
    [n('yb')]: map(0, H + 0.4),
    [n('xt')]: map(5, 0),
  };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('x-axis'), from: n('o'), to: n('xb'), weight: 2.5, arrow: true, group: n('axes') },
    { kind: 'line', id: n('y-axis'), from: n('o'), to: n('yb'), weight: 2.5, arrow: true, group: n('axes') },
    { kind: 'label', id: n('x-title'), at: n('xt'), tex: L.x ?? '\\text{Reaction progress}', place: 'below', group: n('axes') },
    { kind: 'label', id: n('y-title'), at: n('yb'), tex: L.y ?? '\\text{Energy}', place: 'above right', group: n('axes') },
  ];
  // Flat at the reactants' level, a smooth rise to the peak and fall to the products' level, and
  // flat again; the flat parts are long, to hold their labels.
  const level = (x: number): number => {
    const ease = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;
    if (x <= 3.8) return o.reactants;
    if (x <= 5) return o.reactants + (o.peak - o.reactants) * ease((x - 3.8) / 1.2);
    if (x <= 6.2) return o.peak + (o.products - o.peak) * ease((x - 5) / 1.2);
    return o.products;
  };
  const curve: string[] = [];
  for (let i = 0; i <= 44; i++) {
    const x = 0.5 + (8.8 * i) / 44;
    points[n(`k${i}`)] = map(x, level(x));
    curve.push(n(`k${i}`));
  }
  items.push({ kind: 'curve', id: n('curve'), points: curve, tone: 'brand', weight: 3.5 });
  // Each level's label starts at the outer end of its flat part and runs inward along it: above
  // the higher level and below the lower one, where nothing else is drawn.
  const high = o.reactants >= o.products;
  Object.assign(points, { [n('r')]: map(0.5, o.reactants), [n('p')]: map(9.3, o.products) });
  items.push(
    { kind: 'label', id: n('reactants'), at: n('r'), tex: L.reactants ?? '\\text{reactants}', place: high ? 'above right' : 'below right' },
    { kind: 'label', id: n('products'), at: n('p'), tex: L.products ?? '\\text{products}', place: high ? 'below left' : 'above left' },
  );
  // ΔH: from the reactants' level, carried across by a dashed line, to the products' level, just
  // past the end of the curve.
  Object.assign(points, { [n('dh-a')]: map(3.8, o.reactants), [n('dh-b')]: map(9.7, o.reactants), [n('dh-c')]: map(9.7, o.products) });
  items.push(
    { kind: 'line', id: n('dh-level'), from: n('dh-a'), to: n('dh-b'), dashed: true, tone: 'muted', weight: 2, group: n('dh') },
    { kind: 'line', id: n('dh-arrow'), from: n('dh-b'), to: n('dh-c'), arrow: true, tone: high ? 'good' : 'bad', label: L.dh ?? '\\Delta H', labelSide: high ? 'left' : 'right', group: n('dh') },
  );
  // Ea: from the reactants' level straight up to the top of the hump.
  Object.assign(points, { [n('ea-a')]: map(3.8, o.reactants), [n('ea-b')]: map(5, o.reactants), [n('ea-c')]: map(5, o.peak) });
  items.push(
    { kind: 'line', id: n('ea-level'), from: n('ea-a'), to: n('ea-b'), dashed: true, tone: 'muted', weight: 2, group: n('ea') },
    { kind: 'line', id: n('ea-arrow'), from: n('ea-b'), to: n('ea-c'), arrow: true, tone: 'opp', label: L.ea ?? 'E_a', labelSide: 'right', group: n('ea') },
  );
  return { points, items };
}

/** The main-group elements of periods 1 to 5, as [atomic number, symbol, period, column 1–8]. */
const MAIN_GROUP: [number, string, number, number][] = [
  [1, 'H', 1, 1], [2, 'He', 1, 8],
  [3, 'Li', 2, 1], [4, 'Be', 2, 2], [5, 'B', 2, 3], [6, 'C', 2, 4], [7, 'N', 2, 5], [8, 'O', 2, 6], [9, 'F', 2, 7], [10, 'Ne', 2, 8],
  [11, 'Na', 3, 1], [12, 'Mg', 3, 2], [13, 'Al', 3, 3], [14, 'Si', 3, 4], [15, 'P', 3, 5], [16, 'S', 3, 6], [17, 'Cl', 3, 7], [18, 'Ar', 3, 8],
  [19, 'K', 4, 1], [20, 'Ca', 4, 2], [31, 'Ga', 4, 3], [32, 'Ge', 4, 4], [33, 'As', 4, 5], [34, 'Se', 4, 6], [35, 'Br', 4, 7], [36, 'Kr', 4, 8],
  [37, 'Rb', 5, 1], [38, 'Sr', 5, 2], [49, 'In', 5, 3], [50, 'Sn', 5, 4], [51, 'Sb', 5, 5], [52, 'Te', 5, 6], [53, 'I', 5, 7], [54, 'Xe', 5, 8],
];

/** The group numbers of the eight main-group columns. */
const GROUP_NUMBER = [1, 2, 13, 14, 15, 16, 17, 18];

/**
 * The main-group elements of the periodic table up to atomic number `upTo` (20 by default, up to
 * 54), in eight columns with the group numbers above and the period numbers at the side, each
 * cell showing its symbol (and its atomic number above it with `numbers`). The transition metals
 * between groups 2 and 13 are left out. `highlights` colour sets of cells: a family, a period,
 * the metals.
 *
 * Parts: `table` (a group: every cell and number) and each highlight by its `id` (a group of
 * coloured cells). Show `table` first and then a highlight, since showing the whole figure shows
 * the highlights too.
 */
export function periodicTable(o: { name?: string; upTo?: number; numbers?: boolean; highlights?: { id: string; cells: string[]; tone: DiagramTone }[] } = {}): Part {
  const n = namer(o.name);
  const upTo = o.upTo ?? 20;
  const cells = MAIN_GROUP.filter(([z]) => z <= upTo);
  const periods = Math.max(...cells.map((c) => c[2]));
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const corner = (col: number, period: number): P => [col - 1, periods - period];
  const square = (id: string, col: number, period: number, inset: number): string[] => {
    const [x, y] = corner(col, period);
    const ids = [`${id}-0`, `${id}-1`, `${id}-2`, `${id}-3`];
    points[ids[0]] = [x + inset, y + inset];
    points[ids[1]] = [x + 1 - inset, y + inset];
    points[ids[2]] = [x + 1 - inset, y + 1 - inset];
    points[ids[3]] = [x + inset, y + 1 - inset];
    return ids;
  };
  for (const [z, sym, period, col] of cells) {
    const id = n(sym);
    const ids = square(`${id}-sq`, col, period, 0.04);
    const [x, y] = corner(col, period);
    points[`${id}-c`] = [x + 0.5, y + 0.5];
    items.push(
      { kind: 'region', id: `${id}-cell`, points: ids, tone: 'muted', shade: 0.12, group: n('table') },
      { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone: 'muted', weight: 1.5, group: n('table') },
      { kind: 'label', id, at: `${id}-c`, tex: o.numbers ? `\\overset{${z}}{\\text{${sym}}}` : `\\text{${sym}}`, place: 'center', group: n('table') },
    );
  }
  const used = new Set(cells.map((c) => c[3]));
  GROUP_NUMBER.forEach((g, i) => {
    if (!used.has(i + 1)) return;
    // Hydrogen and helium sit alone in the top row, so the group numbers go above each column's top cell.
    const top = Math.min(...cells.filter((c) => c[3] === i + 1).map((c) => c[2]));
    points[n(`g${g}`)] = [i + 0.5, periods - top + 1.02];
    items.push({ kind: 'label', id: n(`group-${g}`), at: n(`g${g}`), tex: String(g), tone: 'muted', place: 'above', group: n('table') });
  });
  for (let p = 1; p <= periods; p++) {
    points[n(`p${p}`)] = [-0.08, periods - p + 0.5];
    items.push({ kind: 'label', id: n(`period-${p}`), at: n(`p${p}`), tex: String(p), tone: 'muted', place: 'left', group: n('table') });
  }
  for (const h of o.highlights ?? []) {
    for (const sym of h.cells) {
      const cell = cells.find((c) => c[1] === sym);
      if (!cell) throw new Error(`periodicTable: no cell "${sym}" up to element ${upTo}`);
      items.push({ kind: 'region', id: n(`${h.id}-${sym}`), points: square(n(`${h.id}-${sym}-sq`), cell[3], cell[2], 0.04), tone: h.tone, shade: 0.45, group: n(h.id) });
    }
  }
  return { points, items };
}
