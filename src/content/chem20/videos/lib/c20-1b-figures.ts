/**
 * Figures for the second half of the chemical bonding unit: shapes of molecules, polar molecules
 * and the forces between molecules. `model` draws a ball-and-stick molecule in perspective (a
 * dashed bond goes back into the page, a wedge comes forward) with its lone pairs, bond angles,
 * partial charges and the pulls of its polar bonds; `link` joins atoms of two molecules (a
 * hydrogen bond, an attraction); `pointer` names a part; `cloud` is a molecule's electron cloud for
 * London dispersion forces; `streamTest` is the charged-rod test on a stream of liquid. Like the
 * figures in `src/video/`, each is built only from standard diagram parts and goes into a diagram
 * with `figure`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Point names around an ellipse, added to `points`; `steps` points, starting on the right of its first axis. */
function oval(points: Record<string, P>, id: string, c: P, a: number, b: number, steps: number, turn = 0): string[] {
  const [cos, sin] = [Math.cos(turn), Math.sin(turn)];
  return Array.from({ length: steps }, (_, j) => {
    const t = (2 * Math.PI * j) / steps;
    const [x, y] = [a * Math.cos(t), b * Math.sin(t)];
    points[`${id}-${j}`] = [c[0] + x * cos - y * sin, c[1] + x * sin + y * cos];
    return `${id}-${j}`;
  });
}

/** The unit vector of a label place, pointing away from the point it labels. */
const PLACE_DIR: Record<Place, P> = {
  above: [0, 1],
  below: [0, -1],
  left: [-1, 0],
  right: [1, 0],
  'above left': [-0.71, 0.71],
  'above right': [0.71, 0.71],
  'below left': [-0.71, -0.71],
  'below right': [0.71, -0.71],
  center: [0, 0],
};

/** The label place nearest a direction, in degrees from the right. */
function placeAt(deg: number): Place {
  const order: Place[] = ['right', 'above right', 'above', 'above left', 'left', 'below left', 'below', 'below right'];
  return order[((Math.round(deg / 45) % 8) + 8) % 8];
}

/** Ball colours by element, close to the usual model-kit colours (oxygen red, nitrogen blue, chlorine green). */
const TONE_OF: Record<string, DiagramTone> = { H: 'muted', C: 'brand', Si: 'brand', N: 'adj', P: 'opp', O: 'bad', S: 'theta', F: 'good', Cl: 'good', Br: 'opp', I: 'hyp', B: 'hyp' };

/** A ball's radius: smaller for hydrogen. */
const radius = (a: ModelAtom) => a.r ?? (a.symbol === 'H' ? 0.34 : 0.42);

/** An atom of a model: a ball with its symbol on it. */
export interface ModelAtom {
  id: string;
  /** The symbol, such as "Cl" (written as text). */
  symbol: string;
  at: P;
  /** The ball's colour (by element by default: hydrogen grey, carbon purple, oxygen red…). */
  tone?: DiagramTone;
  /** The ball's radius (0.42 by default, 0.34 for hydrogen). */
  r?: number;
  /** The group its ball, edge and symbol join (the atom's id by default). */
  group?: string;
}

/** A bond of a model. */
export interface ModelBond {
  from: string;
  to: string;
  order?: 1 | 2 | 3;
  /** Out of the page: `front` is a wedge that widens towards `to`, `back` a dashed line. */
  view?: 'front' | 'back';
  /** The group its lines join (`bond-from-to` by default). */
  group?: string;
}

/** A lone pair on an atom: a lobe pointing `dir` degrees from the right, holding two dots. */
export interface ModelLonePair {
  id: string;
  on: string;
  dir: number;
}

/**
 * A ball-and-stick model of a molecule, drawn flat or in perspective from the positions given:
 * balls with their symbols, bonds as sticks (two or three for a double or triple bond, a wedge for
 * one coming out of the page, a dashed line for one going back), lone pairs as lobes holding two
 * dots, bond angles, partial charges (δ+ and δ−) and the pulls of polar bonds (arrows beside each
 * bond, pointing to the atom that pulls the shared electrons), and a dashed outline joining outer
 * atoms (the base of a pyramid, the corners of a tetrahedron). Place bonded atoms about 2 apart.
 *
 * Parts: each atom by its id (a group: `id-ball`, `id-edge` and `id-sym`), each bond as the group
 * `bond-a-b`, each lone pair by its id (a group: lobe and dots), each angle by its id, the partial
 * charges as the group `charges` (each `q-atom`), the pulls as the group `pulls` (each
 * `pull-a-b`), and the outline as the group `cage`. A bond's lines (or its wedge) are `bond-a-b-0`,
 * `bond-a-b-1`… Atoms and bonds can share a group instead (`group` on the model, or on each, with
 * the model's name in front), so a line can show the whole frame at once.
 */
export function model(o: {
  name?: string;
  atoms: ModelAtom[];
  bonds?: ModelBond[];
  lonePairs?: ModelLonePair[];
  angles?: { id: string; at: string; from: string; to: string; label: string; r?: number; labelDist?: number; labelAt?: number }[];
  /** Partial charges beside atoms, on the side `place` (or at an angle in degrees from the right). */
  charges?: { atom: string; sign: '+' | '-'; place: Place | number }[];
  /** Pulls beside their bonds (`offset` from them, 0.55 by default; 0 draws the arrow on the bond). */
  pulls?: { from: string; to: string; side?: 'left' | 'right'; offset?: number }[];
  cage?: [string, string][];
  /** One group for every atom and bond. */
  group?: string;
}): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const atom = new Map(o.atoms.map((a) => [a.id, a]));
  const get = (id: string) => {
    const a = atom.get(id);
    if (!a) throw new Error(`model: no atom "${id}"`);
    return a;
  };
  for (const a of o.atoms) points[n(a.id)] = a.at;

  // Drawn back to front: the outline, lone pairs, bonds, then the balls over the ends of the bonds.
  for (const [a, b] of o.cage ?? []) {
    get(a);
    get(b);
    items.push({ kind: 'line', id: n(`cage-${a}-${b}`), from: n(a), to: n(b), dashed: true, tone: 'muted', weight: 2, group: n('cage') });
  }
  // Angles under the bonds and balls, so the balls cover the middle of the shaded wedge.
  for (const g of o.angles ?? []) {
    for (const x of [g.at, g.from, g.to]) get(x);
    items.push({ kind: 'angle', id: n(g.id), at: n(g.at), from: n(g.from), to: n(g.to), label: g.label, r: g.r ?? 72, ...(g.labelDist ? { labelDist: g.labelDist } : {}), ...(g.labelAt ? { labelAt: g.labelAt } : {}) });
  }
  for (const lp of o.lonePairs ?? []) {
    const A = get(lp.on);
    const r = radius(A);
    const t = (lp.dir * Math.PI) / 180;
    const u: P = [Math.cos(t), Math.sin(t)];
    const v: P = [-u[1], u[0]];
    const c: P = [A.at[0] + u[0] * (r + 0.42), A.at[1] + u[1] * (r + 0.42)];
    const id = n(lp.id);
    const lobe = oval(points, `${id}-o`, c, 0.62, 0.36, 24, t);
    items.push(
      { kind: 'region', id: `${id}-lobe`, points: lobe, tone: 'adj', shade: 0.16, group: id },
      { kind: 'curve', id: `${id}-edge`, points: lobe, closed: true, tone: 'adj', weight: 2, group: id },
    );
    [-1, 1].forEach((s, i) => {
      points[`${id}-d${i}`] = [c[0] + u[0] * 0.08 + v[0] * s * 0.14, c[1] + u[1] * 0.08 + v[1] * s * 0.14];
      items.push({ kind: 'label', id: `${id}-e${i}`, at: `${id}-d${i}`, tex: '', dot: true, tone: 'adj', place: 'center', group: id });
    });
  }
  for (const b of o.bonds ?? []) {
    const A = get(b.from);
    const B = get(b.to);
    const group = n(b.group ?? o.group ?? `bond-${b.from}-${b.to}`);
    const len = Math.hypot(B.at[0] - A.at[0], B.at[1] - A.at[1]);
    const u: P = [(B.at[0] - A.at[0]) / len, (B.at[1] - A.at[1]) / len];
    const v: P = [-u[1], u[0]];
    // The bond stops just inside each ball, so it does not show through the ball's fill.
    const a: P = [A.at[0] + u[0] * radius(A) * 0.85, A.at[1] + u[1] * radius(A) * 0.85];
    const e: P = [B.at[0] - u[0] * radius(B) * 0.85, B.at[1] - u[1] * radius(B) * 0.85];
    const id = n(`bond-${b.from}-${b.to}`);
    if (b.view === 'front') {
      // A wedge: narrow at the first atom, wide at the second.
      Object.assign(points, {
        [`${id}-w0`]: [a[0] + v[0] * 0.04, a[1] + v[1] * 0.04],
        [`${id}-w1`]: [e[0] + v[0] * 0.16, e[1] + v[1] * 0.16],
        [`${id}-w2`]: [e[0] - v[0] * 0.16, e[1] - v[1] * 0.16],
        [`${id}-w3`]: [a[0] - v[0] * 0.04, a[1] - v[1] * 0.04],
      });
      items.push({ kind: 'region', id: `${id}-0`, points: [`${id}-w0`, `${id}-w1`, `${id}-w2`, `${id}-w3`], tone: 'ink', shade: 0.92, group });
      continue;
    }
    const order = b.order ?? 1;
    const offsets = order === 1 ? [0] : order === 2 ? [-0.1, 0.1] : [-0.16, 0, 0.16];
    offsets.forEach((off, i) => {
      points[`${id}-${i}a`] = [a[0] + v[0] * off, a[1] + v[1] * off];
      points[`${id}-${i}b`] = [e[0] + v[0] * off, e[1] + v[1] * off];
      items.push({ kind: 'line', id: `${id}-${i}`, from: `${id}-${i}a`, to: `${id}-${i}b`, weight: b.view === 'back' ? 3 : 4, ...(b.view === 'back' ? { dashed: true } : {}), group });
    });
  }
  for (const a of o.atoms) {
    const id = n(a.id);
    const group = n(a.group ?? o.group ?? a.id);
    const r = radius(a);
    const tone = a.tone ?? TONE_OF[a.symbol] ?? 'muted';
    const ring = oval(points, `${id}-r`, a.at, r, r, 20);
    items.push(
      { kind: 'region', id: `${id}-ball`, points: ring, tone, shade: 0.7, group },
      { kind: 'curve', id: `${id}-edge`, points: ring, closed: true, tone, weight: 2, group },
      { kind: 'label', id: `${id}-sym`, at: id, tex: `\\text{${a.symbol}}`, place: 'center', group },
    );
  }
  for (const q of o.charges ?? []) {
    const A = get(q.atom);
    const place = typeof q.place === 'number' ? placeAt(q.place) : q.place;
    const d: P = typeof q.place === 'number' ? [Math.cos((q.place * Math.PI) / 180), Math.sin((q.place * Math.PI) / 180)] : PLACE_DIR[q.place];
    const r = radius(A) + 0.06;
    const id = n(`q-${q.atom}`);
    points[id] = [A.at[0] + d[0] * r, A.at[1] + d[1] * r];
    items.push({ kind: 'label', id, at: id, tex: q.sign === '+' ? '\\delta^+' : '\\delta^-', tone: q.sign === '+' ? 'opp' : 'adj', place, group: n('charges') });
  }
  for (const p of o.pulls ?? []) {
    const A = get(p.from);
    const B = get(p.to);
    const len = Math.hypot(B.at[0] - A.at[0], B.at[1] - A.at[1]);
    const u: P = [(B.at[0] - A.at[0]) / len, (B.at[1] - A.at[1]) / len];
    const s = p.side === 'right' ? -1 : 1;
    const v: P = [-u[1] * s, u[0] * s];
    const id = n(`pull-${p.from}-${p.to}`);
    const off = p.offset ?? 0.55;
    points[`${id}-a`] = [A.at[0] + u[0] * len * 0.25 + v[0] * off, A.at[1] + u[1] * len * 0.25 + v[1] * off];
    points[`${id}-b`] = [A.at[0] + u[0] * len * 0.8 + v[0] * off, A.at[1] + u[1] * len * 0.8 + v[1] * off];
    items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, arrow: true, tone: 'theta', weight: 4, group: n('pulls') });
  }
  return { points, items };
}

/** Where the atoms of the common shapes sit around a central atom at the origin, for bonds `L` long. */
export const SHAPES = {
  /** Two atoms opposite each other. */
  linear: (L = 2): P[] => [[-L, 0], [L, 0]],
  /** Three atoms 120° apart in a flat triangle: top, bottom left, bottom right. */
  trigonal: (L = 2): P[] => [[0, L], [-L * Math.cos(Math.PI / 6), -L / 2], [L * Math.cos(Math.PI / 6), -L / 2]],
  /**
   * Four atoms at the corners of a tetrahedron, drawn in perspective: top and lower left in the page
   * (109.5° apart), then the one in front (a wedge, lower right) and the one behind (dashed, right).
   */
  tetrahedral: (L = 2): P[] => [[0, L], [-0.9426 * L, -0.3338 * L], [0.3 * L, -0.8 * L], [0.875 * L, -0.225 * L]],
  /** Two atoms below the central atom, 104.5° apart, as in water. */
  bent: (L = 2, angle = 104.5): P[] => {
    const h = ((angle / 2) * Math.PI) / 180;
    return [[-L * Math.sin(h), -L * Math.cos(h)], [L * Math.sin(h), -L * Math.cos(h)]];
  },
};

/**
 * A water molecule (atoms `O`, `H1` and `H2`, 104.5° apart) with its oxygen at `at`, the hydrogens
 * below it unless `turn` (degrees, anticlockwise) turns it; `bond` long (1.4 by default). With
 * `charges`, δ− on the oxygen and δ+ on each hydrogen; with `lone`, its two lone pairs (`lp1`,
 * `lp2`). Parts as for `model`; `group` puts every atom and bond in one group.
 */
export function water(o: { name: string; at: P; turn?: number; bond?: number; charges?: boolean; lone?: boolean; group?: string }): Part {
  const t = ((o.turn ?? 0) * Math.PI) / 180;
  const rot = ([x, y]: P): P => [o.at[0] + x * Math.cos(t) - y * Math.sin(t), o.at[1] + x * Math.sin(t) + y * Math.cos(t)];
  const [h1, h2] = SHAPES.bent(o.bond ?? 1.4);
  const deg = o.turn ?? 0;
  return model({
    name: o.name,
    atoms: [
      { id: 'O', symbol: 'O', at: o.at },
      { id: 'H1', symbol: 'H', at: rot(h1) },
      { id: 'H2', symbol: 'H', at: rot(h2) },
    ],
    bonds: [
      { from: 'O', to: 'H1' },
      { from: 'O', to: 'H2' },
    ],
    ...(o.lone ? { lonePairs: [{ id: 'lp1', on: 'O', dir: deg + 128 }, { id: 'lp2', on: 'O', dir: deg + 52 }] } : {}),
    ...(o.charges
      ? {
          charges: [
            { atom: 'O', sign: '-' as const, place: deg + 90 },
            { atom: 'H1', sign: '+' as const, place: deg + 232 },
            { atom: 'H2', sign: '+' as const, place: deg + 308 },
          ],
        }
      : {}),
    ...(o.group ? { group: o.group } : {}),
  });
}

/** A dashed oval around part of a figure, such as one electron group of a Lewis structure. Part: `id`. */
export function ringAround(o: { id: string; at: P; rx: number; ry: number; turn?: number; tone?: DiagramTone }): Part {
  const points: Record<string, P> = {};
  const ids = oval(points, `${o.id}-o`, o.at, o.rx, o.ry, 32, ((o.turn ?? 0) * Math.PI) / 180);
  return { points, items: [{ kind: 'curve', id: o.id, points: ids, closed: true, dashed: true, tone: o.tone ?? 'theta', weight: 2.5 }] };
}

/**
 * A dashed line from one atom to an atom of another molecule in the same figure, such as a
 * hydrogen bond or the attraction between δ+ and δ− ends: `from` and `to` are the atoms' point
 * names (with their model's name, such as "w1-H1"). Put it before the models in `figure`, so the
 * balls cover its ends. Part: `id`.
 */
export function link(o: { id: string; from: string; to: string; tone?: DiagramTone; label?: string; labelSide?: 'left' | 'right' }): Part {
  return {
    points: {},
    items: [{ kind: 'line', id: o.id, from: o.from, to: o.to, dashed: true, weight: 4, tone: o.tone ?? 'good', ...(o.label ? { label: o.label } : {}), ...(o.labelSide ? { labelSide: o.labelSide } : {}) }],
  };
}

/** A label for part of a figure: a thin line from near the part (`from`) to the label (`to`). Part: `id` (a group). */
export function pointer(o: { id: string; from: P; to: P; tex: string; place: Place; tone?: DiagramTone }): Part {
  return {
    points: { [`${o.id}-a`]: o.from, [`${o.id}-b`]: o.to },
    items: [
      { kind: 'line', id: `${o.id}-line`, from: `${o.id}-a`, to: `${o.id}-b`, tone: 'muted', weight: 2, group: o.id },
      { kind: 'label', id: `${o.id}-text`, at: `${o.id}-b`, tex: o.tex, place: o.place, ...(o.tone ? { tone: o.tone } : {}), group: o.id },
    ],
  };
}

/** A label on its own at a point. Part: `id`. */
export function tag(o: { id: string; at: P; tex: string; place?: Place; tone?: DiagramTone }): Part {
  return { points: { [`${o.id}-at`]: o.at }, items: [{ kind: 'label', id: o.id, at: `${o.id}-at`, tex: o.tex, place: o.place ?? 'center', ...(o.tone ? { tone: o.tone } : {}) }] };
}

/**
 * A small molecule as its electron cloud, for London dispersion forces: its atoms' symbols in a
 * row (0.9 apart) inside an oval cloud. `even` is the cloud spread evenly; `shifted` is the cloud
 * pushed `shift` to the right, as at an instant when more electrons are on one side, with δ+ on the
 * left and δ− on the right (`charges`).
 *
 * Parts: `atoms` (a group of symbols), `even` and `shifted` (each a group: the cloud's fill and
 * edge), and `charges` (a group: `plus` and `minus`).
 */
export function cloud(o: { name?: string; at: P; symbols: string[]; shift?: number }): Part {
  const n = namer(o.name);
  const [cx, cy] = o.at;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const a = 0.75 + 0.45 * o.symbols.length;
  const b = 0.85;
  const s = o.shift ?? 0.7;
  for (const [key, c, stretch] of [
    ['even', [cx, cy], 1],
    ['shifted', [cx + s, cy], 1.05],
  ] as const) {
    const ids = oval(points, n(`${key}-o`), c as P, a * stretch, b, 36);
    items.push(
      { kind: 'region', id: n(`${key}-fill`), points: ids, tone: 'adj', shade: 0.2, group: n(key) },
      { kind: 'curve', id: n(`${key}-edge`), points: ids, closed: true, tone: 'adj', weight: 2.5, group: n(key) },
    );
  }
  o.symbols.forEach((sym, i) => {
    const id = n(`atom-${i}`);
    points[id] = [cx + (i - (o.symbols.length - 1) / 2) * 0.9, cy];
    items.push({ kind: 'label', id, at: id, tex: `\\text{${sym}}`, place: 'center', group: n('atoms') });
  });
  Object.assign(points, { [n('plus-at')]: [cx - a + s * 0.2, cy + b * 0.8], [n('minus-at')]: [cx + a + s * 0.9, cy + b * 0.8] });
  items.push(
    { kind: 'label', id: n('plus'), at: n('plus-at'), tex: '\\delta^+', tone: 'opp', place: 'above left', group: n('charges') },
    { kind: 'label', id: n('minus'), at: n('minus-at'), tex: '\\delta^-', tone: 'adj', place: 'above right', group: n('charges') },
  );
  return { points, items };
}

/**
 * The stream test for polar molecules: a burette (`burette`) letting a thin stream of liquid run
 * into a beaker (`beaker`), straight down (`straight`) or bent towards a charged plastic rod held
 * beside it (`bent`). The rod (`rod`, a group with its charge signs) is `charge` (TeX, "+" by
 * default).
 */
export function streamTest(o: { name?: string; charge?: string } = {}): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {
    [n('tl')]: [-0.35, 5.6],
    [n('bl')]: [-0.35, 3.4],
    [n('tip-l')]: [-0.08, 2.9],
    [n('tip')]: [0, 2.7],
    [n('tip-r')]: [0.08, 2.9],
    [n('br')]: [0.35, 3.4],
    [n('tr')]: [0.35, 5.6],
    [n('lvl-l')]: [-0.35, 5],
    [n('lvl-r')]: [0.35, 5],
    [n('tap-a')]: [-0.6, 3.15],
    [n('tap-b')]: [0.6, 3.15],
    [n('s0')]: [0, 2.6],
    [n('s1')]: [0, -1.6],
    [n('k0')]: [0, 2.6],
    [n('k1')]: [0.04, 1.6],
    [n('k2')]: [0.25, 0.6],
    [n('k3')]: [0.7, -0.4],
    [n('k4')]: [1.25, -1.6],
    [n('bk0')]: [-1.3, -0.9],
    [n('bk1')]: [-1.3, -2.6],
    [n('bk2')]: [2.4, -2.6],
    [n('bk3')]: [2.4, -0.9],
    [n('rod0')]: [1.6, 1.15],
    [n('rod1')]: [4.6, 1.15],
    [n('rod2')]: [4.6, 0.45],
    [n('rod3')]: [1.6, 0.45],
    [n('q0')]: [2.3, 0.8],
    [n('q1')]: [3.1, 0.8],
    [n('q2')]: [3.9, 0.8],
  };
  const sign = o.charge ?? '+';
  const items: DiagramItem[] = [
    { kind: 'region', id: n('liquid'), points: [n('lvl-l'), n('bl'), n('tip-l'), n('tip-r'), n('br'), n('lvl-r')], tone: 'adj', shade: 0.35, group: n('burette') },
    { kind: 'curve', id: n('tube'), points: [n('tl'), n('bl'), n('tip-l'), n('tip'), n('tip-r'), n('br'), n('tr')], tone: 'ink', weight: 3, group: n('burette') },
    { kind: 'line', id: n('tap'), from: n('tap-a'), to: n('tap-b'), tone: 'ink', weight: 5, group: n('burette') },
    { kind: 'curve', id: n('beaker-side'), points: [n('bk0'), n('bk1'), n('bk2'), n('bk3')], tone: 'muted', weight: 3, group: n('beaker') },
    { kind: 'line', id: n('straight'), from: n('s0'), to: n('s1'), tone: 'adj', weight: 5 },
    { kind: 'curve', id: n('bent'), points: [n('k0'), n('k1'), n('k2'), n('k3'), n('k4')], tone: 'adj', weight: 5 },
    { kind: 'region', id: n('rod-fill'), points: [n('rod0'), n('rod1'), n('rod2'), n('rod3')], tone: 'brand', shade: 0.45, group: n('rod') },
    { kind: 'curve', id: n('rod-edge'), points: [n('rod0'), n('rod1'), n('rod2'), n('rod3')], closed: true, tone: 'brand', weight: 2.5, group: n('rod') },
    ...[0, 1, 2].map((i): DiagramItem => ({ kind: 'label', id: n(`sign-${i}`), at: n(`q${i}`), tex: sign, place: 'center', group: n('rod') })),
  ];
  return { points, items };
}
