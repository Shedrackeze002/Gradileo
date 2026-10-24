/**
 * Figures for the Atoms and the Periodic Table videos: an atom whose nucleus is drawn as its
 * protons and neutrons, the gold foil experiment, and labels and pointers to name the parts of a
 * figure. Like the figures in `src/video/`, each is built only from standard diagram parts (lines,
 * curves, regions and labels) and goes into a diagram with `figure`.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Point names around a circle, added to `points`; `steps` points, starting on the right. */
function ring(points: Record<string, P>, id: string, c: P, r: number, steps: number): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const a = (2 * Math.PI * j) / steps;
    points[`${id}-${j}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${id}-${j}`;
  });
}

/**
 * Where the balls of a nucleus sit: one in the middle, six around it, then twelve more, as close
 * as balls of radius `r` pack.
 */
function packing(count: number, r: number): P[] {
  const out: P[] = [[0, 0]];
  for (let j = 0; j < 6; j++) out.push([2 * r * Math.cos((Math.PI * j) / 3 + Math.PI / 6), 2 * r * Math.sin((Math.PI * j) / 3 + Math.PI / 6)]);
  for (let j = 0; j < 12; j++) out.push([3.8 * r * Math.cos((Math.PI * j) / 6), 3.8 * r * Math.sin((Math.PI * j) / 6)]);
  return out.slice(0, count);
}

/**
 * An atom with its nucleus drawn as protons (orange balls) and neutrons (grey balls), and its
 * electrons (blue dots) on rings around it, from the innermost shell out. `ball` is the radius of
 * each proton and neutron (0.3 by default); the first shell is `first` from the centre (1.9) and
 * the shells are `gap` apart (1). `at` is the centre.
 *
 * Parts: `protons` and `neutrons` (groups of balls) and `shell-1`, `shell-2`… (each a group: its
 * ring and its electrons).
 */
export function ballAtom(o: { name?: string; at?: P; protons: number; neutrons: number; shells: number[]; ball?: number; first?: number; gap?: number }): Part {
  const n = namer(o.name);
  const c = o.at ?? [0, 0];
  const r = o.ball ?? 0.3;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const total = o.protons + o.neutrons;
  // Protons and neutrons take turns round each ring of the packing, so both kinds are seen.
  const spots = packing(total, r);
  let p = 0;
  let nn = 0;
  spots.forEach((s, i) => {
    const wantProton = p < o.protons && (nn >= o.neutrons || i % 2 === 1);
    const id = wantProton ? n(`p${p++}`) : n(`n${nn++}`);
    const tone: DiagramTone = wantProton ? 'opp' : 'muted';
    const group = wantProton ? n('protons') : n('neutrons');
    const ids = ring(points, id, [c[0] + s[0], c[1] + s[1]], r, 16);
    items.push(
      { kind: 'region', id, points: ids, tone, shade: wantProton ? 0.8 : 0.55, group },
      { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, tone, weight: 2, group },
    );
  });
  const first = o.first ?? 1.9;
  const gap = o.gap ?? 1;
  o.shells.forEach((count, s) => {
    const k = s + 1;
    const R = first + s * gap;
    const group = n(`shell-${k}`);
    items.push({ kind: 'curve', id: n(`ring-${k}`), points: ring(points, n(`orbit${k}`), c, R, 48), closed: true, tone: 'muted', weight: 2, group });
    for (let i = 0; i < count; i++) {
      // Electrons spread evenly round each shell, the shells turned so their dots do not line up.
      const a = Math.PI / 2 - (2 * Math.PI * i) / count - (s % 2 ? Math.PI / count : 0) + 0.4 * s;
      points[n(`e${k}-${i}`)] = [c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)];
      items.push({ kind: 'label', id: n(`e-${k}-${i}`), at: n(`e${k}-${i}`), tex: '', dot: true, tone: 'adj', place: 'center', group });
    }
  });
  const out = first + (o.shells.length - 1) * gap + 0.3;
  Object.assign(points, { [n('frame-a')]: [c[0] - out, c[1] - out], [n('frame-b')]: [c[0] + out, c[1] + out] });
  return { points, items };
}

/**
 * A label on its own: TeX at a point, beside it (`place`) or centred on it. Part: `id`, also shown
 * with `group` when it has one.
 */
export function tag(o: { id: string; at: P; tex: string; place?: Place; tone?: DiagramTone; group?: string }): Part {
  return {
    points: { [`${o.id}-at`]: o.at },
    items: [{ kind: 'label', id: o.id, at: `${o.id}-at`, tex: o.tex, place: o.place ?? 'center', ...(o.tone ? { tone: o.tone } : {}), ...(o.group ? { group: o.group } : {}) }],
  };
}

/**
 * A pointer: a thin line from a point on a figure (`from`) out to a label at `to`. Part: `id` (a
 * group: the line `id-line` and the label `id-label`).
 */
export function pointer(o: { id: string; from: P; to: P; tex: string; place: Place; tone?: DiagramTone }): Part {
  return {
    points: { [`${o.id}-a`]: o.from, [`${o.id}-b`]: o.to },
    items: [
      { kind: 'line', id: `${o.id}-line`, from: `${o.id}-a`, to: `${o.id}-b`, tone: o.tone ?? 'muted', weight: 2, group: o.id },
      { kind: 'label', id: `${o.id}-label`, at: `${o.id}-b`, tex: o.tex, place: o.place, ...(o.tone ? { tone: o.tone } : {}), group: o.id },
    ],
  };
}

/**
 * The gold foil experiment, seen from above: a source on the left fires positive particles to the
 * right at a thin sheet of gold foil. Most go straight through, a few are pushed off course, and a
 * very few bounce almost straight back.
 *
 * Parts: `source` (a group: the box and its label), `foil` (a group: the sheet and its label),
 * `straight` (a group: the paths straight through, with their label), `deflect` (a group: two
 * paths pushed off course, with a label) and `bounce` (a group: a path that comes back, with a
 * label).
 */
export function goldFoil(o: { name?: string } = {}): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const add = (id: string, p: P) => {
    points[n(id)] = p;
    return n(id);
  };
  // The source: a box with an opening on its right.
  const box = [add('s0', [0, 2.2]), add('s1', [2, 2.2]), add('s2', [2, 3.8]), add('s3', [0, 3.8])];
  items.push(
    { kind: 'region', id: n('source-box'), points: box, tone: 'muted', shade: 0.35, group: n('source') },
    { kind: 'curve', id: n('source-edge'), points: box, closed: true, tone: 'muted', weight: 2.5, group: n('source') },
    { kind: 'label', id: n('source-label'), at: add('s-lab', [1, 2.2]), tex: '\\text{source}', place: 'below', group: n('source') },
  );
  // The foil: a thin upright sheet.
  const foil = [add('f0', [6.9, 0]), add('f1', [7.1, 0]), add('f2', [7.1, 6]), add('f3', [6.9, 6])];
  items.push(
    { kind: 'region', id: n('foil-sheet'), points: foil, tone: 'theta', shade: 0.85, group: n('foil') },
    { kind: 'label', id: n('foil-label'), at: add('f-lab', [7, 6]), tex: '\\text{gold foil}', place: 'above', tone: 'theta', group: n('foil') },
  );
  // Straight through: four paths from the source, past the foil.
  [2.5, 2.83, 3.17, 3.5].forEach((y, i) => {
    items.push({ kind: 'line', id: n(`st${i}`), from: add(`st${i}a`, [2.1, y]), to: add(`st${i}b`, [11.4, y]), tone: 'adj', weight: 2.5, arrow: true, group: n('straight') });
  });
  items.push({ kind: 'label', id: n('straight-label'), at: add('st-lab', [11.5, 3]), tex: '\\text{most pass straight through}', place: 'right', tone: 'adj', group: n('straight') });
  // Pushed off course: in to the foil, then out at an angle, up and down.
  const bend = (id: string, y: number, out: P) => {
    items.push(
      { kind: 'line', id: n(`${id}-in`), from: add(`${id}a`, [2.1, y]), to: add(`${id}b`, [7, y]), tone: 'good', weight: 2.5, group: n('deflect') },
      { kind: 'line', id: n(`${id}-out`), from: add(`${id}c`, [7, y]), to: add(`${id}d`, out), tone: 'good', weight: 2.5, arrow: true, group: n('deflect') },
    );
  };
  bend('up', 3.6, [10.6, 5.9]);
  bend('down', 2.4, [10.6, 0.1]);
  items.push({ kind: 'label', id: n('deflect-label'), at: add('d-lab', [10.6, 5.9]), tex: '\\text{a few are pushed off course}', place: 'right', tone: 'good', group: n('deflect') });
  // Bounced back: in to the foil, and back out to the left, below the source.
  items.push(
    { kind: 'line', id: n('back-in'), from: add('ba', [2.1, 3]), to: add('bb', [7, 3]), tone: 'bad', weight: 2.5, group: n('bounce') },
    { kind: 'line', id: n('back-out'), from: add('bc', [7, 3]), to: add('bd', [3.4, 0.6]), tone: 'bad', weight: 2.5, arrow: true, group: n('bounce') },
    { kind: 'label', id: n('bounce-label'), at: add('b-lab', [3.4, 0.6]), tex: '\\text{a very few bounce back}', place: 'below', tone: 'bad', group: n('bounce') },
  );
  // Room on the right for the labels.
  add('frame-r', [16.3, 3]);
  return { points, items };
}
