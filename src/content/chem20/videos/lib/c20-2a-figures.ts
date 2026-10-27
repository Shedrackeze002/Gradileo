/**
 * Figures for the Forms of Matter: Gases videos (Grade 11 Chemistry, unit 2, lessons 2.1 to 2.4),
 * built only from standard diagram parts (lines, curves, shaded regions and labels), so each goes
 * into a diagram with `figure` (src/video/solids.ts). With a `name`, each part's id starts with it.
 *
 * - `tag`: a label (TeX) at a point; `room`: two unused points that keep space for labels.
 * - `gasBox`: gas particles in a container, each with an arrow for its motion, under a lid, under
 *   a piston that slides, or open; marks where particles hit the walls.
 * - `zigzag`: the path of one particle, straight lines between collisions with other particles.
 * - `collision`: two particles before and after an elastic collision, swapping speeds.
 * - `diffusionTube`: ammonia and hydrogen chloride diffusing along a tube to a ring of ammonium
 *   chloride, nearer the hydrochloric acid end.
 * - `forceOnArea`: a box on the floor, its weight as a force arrow and the area it rests on.
 * - `barometer`: a mercury barometer: the tube, the column, the space above it, the dish and the
 *   push of the air.
 * - `boyleGraph`, `kelvinGraph`, `charlesGraph`: the lessons' graphs of volume against pressure,
 *   Kelvin against Celsius temperature, and volume against Celsius temperature.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { dots, plane, plot, polyline, type Plane } from '@/video/graph.ts';

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

/** Two points that nothing uses, so the diagram keeps room for labels out to them. */
export function room(id: string, a: P, b: P): Part {
  return { points: { [`${id}-a`]: a, [`${id}-b`]: b }, items: [] };
}

/** An arrow from one point to another. Part: its `id`. */
export function arrow(id: string, from: P, to: P, o: { tone?: DiagramTone; label?: string; labelSide?: 'left' | 'right'; group?: string; weight?: number } = {}): Part {
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
        ...(o.label ? { label: o.label, labelSide: o.labelSide } : {}),
        ...(o.group ? { group: o.group } : {}),
      },
    ],
  };
}

/** Point names around a circle, added to `points`, starting on the right. */
function ring(points: Record<string, P>, id: string, c: P, r: number, steps = 16): string[] {
  return Array.from({ length: steps }, (_, j) => {
    const a = (2 * Math.PI * j) / steps;
    points[`${id}-${j}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    return `${id}-${j}`;
  });
}

/** A filled circle with an edge, as two parts: the fill `id` and the edge `id-edge`. */
function ball(points: Record<string, P>, items: DiagramItem[], id: string, c: P, r: number, tone: DiagramTone, group?: string) {
  const ids = ring(points, id, c, r);
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

/** A straight line between two new points, pushed onto `items`. */
function seg(
  points: Record<string, P>,
  items: DiagramItem[],
  id: string,
  a: P,
  b: P,
  o: { tone?: DiagramTone; weight?: number; group?: string; arrow?: boolean; dashed?: boolean; label?: string; labelSide?: 'left' | 'right' } = {},
) {
  points[`${id}-a`] = a;
  points[`${id}-b`] = b;
  items.push({
    kind: 'line',
    id,
    from: `${id}-a`,
    to: `${id}-b`,
    tone: o.tone ?? 'muted',
    weight: o.weight ?? 3,
    ...(o.arrow ? { arrow: true } : {}),
    ...(o.dashed ? { dashed: true } : {}),
    ...(o.label ? { label: o.label, labelSide: o.labelSide } : {}),
    ...(o.group ? { group: o.group } : {}),
  });
}

/**
 * Gas particles in a container `w` wide with the gas taking up a height `h` (5 by 5 by default),
 * `at` its bottom left corner. Each particle has an arrow `speed` long (0.9 by default; 0 for
 * none) pointing the way it moves, in a random direction (the same every time, from `seed`).
 * `top` closes the container with a `lid` (the default), a `piston` that slides up and down in
 * walls `walls` tall (with a rod and a handle, and a `push` arrow pressing down on it when `push`
 * is a label), or leaves it `open`. `hits` marks that many collisions with the walls, each a short
 * path in to a wall and an arrow back out.
 *
 * Parts: `box` (a group: the walls, and the lid), `piston` (a group: head, rod and handle), `push`
 * (a group: the arrow and its label), `p` (a group: the particles), `v` (a group: the arrows) and
 * `hits` (a group: the collision marks).
 */
export function gasBox(o: {
  name?: string;
  at?: P;
  w?: number;
  h?: number;
  count?: number;
  r?: number;
  speed?: number;
  seed?: number;
  tone?: DiagramTone;
  top?: 'lid' | 'piston' | 'open';
  walls?: number;
  push?: string;
  hits?: number;
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const w = o.w ?? 5;
  const h = o.h ?? 5;
  const count = o.count ?? 8;
  const r = o.r ?? 0.26;
  const speed = o.speed ?? 0.9;
  const top = o.top ?? 'lid';
  const wallTop = top === 'piston' ? y0 + (o.walls ?? h + 2) : y0 + h;
  const rand = random(o.seed ?? 7);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const box = n('box');
  seg(points, items, n('side-l'), [x0, wallTop], [x0, y0], { group: box });
  seg(points, items, n('floor'), [x0, y0], [x0 + w, y0], { group: box });
  seg(points, items, n('side-r'), [x0 + w, y0], [x0 + w, wallTop], { group: box });
  if (top === 'lid') seg(points, items, n('lid'), [x0 + w, y0 + h], [x0, y0 + h], { group: box });
  if (top === 'piston') {
    const g = n('piston');
    const head = y0 + h + 0.12;
    const rodTop = Math.max(wallTop + 0.9, head + 1.6);
    seg(points, items, n('head'), [x0 + 0.1, head], [x0 + w - 0.1, head], { tone: 'ink', weight: 9, group: g });
    seg(points, items, n('rod'), [x0 + w / 2, head], [x0 + w / 2, rodTop], { tone: 'ink', weight: 5, group: g });
    seg(points, items, n('handle'), [x0 + w / 2 - 0.9, rodTop], [x0 + w / 2 + 0.9, rodTop], { tone: 'ink', weight: 7, group: g });
    if (o.push) {
      const pg = n('push');
      seg(points, items, n('push-arrow'), [x0 + w / 2, rodTop + 1.5], [x0 + w / 2, rodTop + 0.2], { tone: 'opp', weight: 4, arrow: true, group: pg });
      points[n('push-at')] = [x0 + w / 2 + 0.25, rodTop + 1.1];
      items.push({ kind: 'label', id: n('push-label'), at: n('push-at'), tex: o.push, tone: 'opp', place: 'right', group: pg });
    }
  }
  // The particles: as far apart as they will go inside the gas space.
  // Room between the particles and the walls for their arrows (a little, when they have none).
  const margin = speed > 0 ? r + 0.25 + Math.min(speed, 0.5) * 0.3 : r + 0.1;
  const spots: P[] = [];
  for (let apart = Math.min(2.2, Math.sqrt((w * h) / count)); spots.length < count; apart *= 0.92) {
    spots.length = 0;
    for (let tries = 0; spots.length < count && tries < 3000; tries++) {
      const p: P = [x0 + margin + rand() * (w - 2 * margin), y0 + margin + rand() * (h - 2 * margin)];
      if (spots.every((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) >= apart)) spots.push(p);
    }
  }
  spots.forEach((p, i) => ball(points, items, n(`p${i}`), p, r, o.tone ?? 'adj', n('p')));
  // A direction for each particle that keeps its arrow inside the container.
  if (speed > 0) {
    spots.forEach((p, i) => {
      let a = 0;
      for (let tries = 0; tries < 40; tries++) {
        a = rand() * 2 * Math.PI;
        const end: P = [p[0] + (r + speed) * Math.cos(a), p[1] + (r + speed) * Math.sin(a)];
        if (end[0] > x0 + 0.15 && end[0] < x0 + w - 0.15 && end[1] > y0 + 0.15 && end[1] < y0 + h - 0.15) break;
      }
      const u: P = [Math.cos(a), Math.sin(a)];
      seg(points, items, n(`v${i}`), [p[0] + u[0] * (r + 0.06), p[1] + u[1] * (r + 0.06)], [p[0] + u[0] * (r + speed), p[1] + u[1] * (r + speed)], { tone: 'theta', weight: 3, arrow: true, group: n('v') });
    });
  }
  // Collisions with the walls: a short path in to a wall and an arrow back out, like a ball
  // bouncing off it.
  const hits = o.hits ?? 0;
  const len = 0.85;
  const bounce = (side: number, t: number) => {
    const at: P = side === 0 ? [x0, y0 + t * h] : side === 1 ? [x0 + w, y0 + t * h] : side === 2 ? [x0 + t * w, y0] : [x0 + t * w, y0 + h];
    const inward = side === 0 ? 0 : side === 1 ? Math.PI : side === 2 ? Math.PI / 2 : -Math.PI / 2;
    const from: P = [at[0] + len * Math.cos(inward + 0.65), at[1] + len * Math.sin(inward + 0.65)];
    const to: P = [at[0] + len * Math.cos(inward - 0.65), at[1] + len * Math.sin(inward - 0.65)];
    return { at, from, to };
  };
  // How close a bounce comes to the nearest particle (its ends and the middle of each leg).
  const clearance = (b: ReturnType<typeof bounce>) => {
    const probes: P[] = [b.from, b.to, [(b.from[0] + b.at[0]) / 2, (b.from[1] + b.at[1]) / 2], [(b.to[0] + b.at[0]) / 2, (b.to[1] + b.at[1]) / 2]];
    return Math.min(99, ...spots.flatMap((q) => probes.map((p) => Math.hypot(p[0] - q[0], p[1] - q[1]))));
  };
  for (let k = 0; k < hits; k++) {
    const side = k % 4;
    // Along each wall, the place where the bounce is clearest of the particles.
    let best = bounce(side, 0.5);
    for (let t = 0.22; t <= 0.78; t += 0.04) {
      const b = bounce(side, t);
      if (clearance(b) > clearance(best) + 0.05) best = b;
    }
    seg(points, items, n(`hit${k}-in`), best.from, best.at, { tone: 'opp', weight: 3, group: n('hits') });
    seg(points, items, n(`hit${k}-out`), best.at, best.to, { tone: 'opp', weight: 3, arrow: true, group: n('hits') });
  }
  return { points, items };
}

/**
 * The path of one particle through a gas: straight lines from point to point, changing direction
 * at each collision with another particle, which is drawn where it was hit. Parts: `id` (a
 * group: the path `id-0`, `id-1`…, and the particle `id-ball`) and `id-others` (a group: the
 * particles it hits).
 */
export function zigzag(id: string, path: P[], o: { tone?: DiagramTone; r?: number } = {}): Part {
  const r = o.r ?? 0.26;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  ball(points, items, `${id}-ball`, path[0], r, 'adj', id);
  path.slice(1).forEach((p, i) => seg(points, items, `${id}-${i}`, path[i], p, { tone: o.tone ?? 'theta', weight: 3, group: id, arrow: i === path.length - 2 }));
  // At each turn, the other particle sits beyond the turn, along the change in direction.
  for (let i = 1; i < path.length - 1; i++) {
    const unit = (a: P, b: P): P => {
      const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
      return [(b[0] - a[0]) / d, (b[1] - a[1]) / d];
    };
    const uin = unit(path[i - 1], path[i]);
    const uout = unit(path[i], path[i + 1]);
    const nx = uin[0] - uout[0];
    const ny = uin[1] - uout[1];
    const d = Math.hypot(nx, ny);
    ball(points, items, `${id}-o${i}`, [path[i][0] + (2 * r * nx) / d, path[i][1] + (2 * r * ny) / d], r, 'muted', `${id}-others`);
  }
  return { points, items };
}

/**
 * An elastic collision between two particles of the same mass, before (top) and after (bottom):
 * the fast particle on the left hits a slow one, and they swap speeds, so the total kinetic energy
 * is the same. Parts: `before` and `after` (groups: two particles, their arrows and a label).
 */
export function collision(o: { name?: string } = {}): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const r = 0.4;
  const row = (id: string, y: number, ax: number, av: number, bx: number, bv: number) => {
    const g = n(id);
    ball(points, items, n(`${id}-a`), [ax, y], r, 'adj', g);
    ball(points, items, n(`${id}-b`), [bx, y], r, 'opp', g);
    const dir = (v: number) => Math.sign(v);
    seg(points, items, n(`${id}-av`), [ax + dir(av) * (r + 0.08), y], [ax + dir(av) * (r + 0.08) + av, y], { tone: 'theta', weight: 4, arrow: true, group: g });
    seg(points, items, n(`${id}-bv`), [bx + dir(bv) * (r + 0.08), y], [bx + dir(bv) * (r + 0.08) + bv, y], { tone: 'theta', weight: 4, arrow: true, group: g });
    points[n(`${id}-at`)] = [-1.2, y];
    items.push({ kind: 'label', id: n(`${id}-label`), at: n(`${id}-at`), tex: `\\text{${id}}`, place: 'left', group: g });
  };
  row('before', 2.6, 0.6, 1.6, 4.2, -0.5);
  row('after', 0, 0.6, -0.5, 4.2, 1.6);
  Object.assign(points, { [n('room-a')]: [-3.2, -0.8], [n('room-b')]: [6.6, 3.4] });
  return { points, items };
}

/**
 * The ammonia and hydrogen chloride demonstration: a long tube with cotton wool soaked in
 * ammonia solution at the left end and in hydrochloric acid at the right. The ring of ammonium
 * chloride forms where the gases meet, about 0.59 of the way along (the lighter ammonia molecules
 * travel faster, about 1.47 times as fast).
 *
 * Parts: `tube` (a group), `nh3` and `hcl` (groups: the cotton wool and its label), `paths` (a
 * group: an arrow from each end to the ring), and `ring` (a group: the ring and its label).
 */
export function diffusionTube(o: { name?: string; length?: number } = {}): Part {
  const n = namer(o.name);
  const L = o.length ?? 14;
  const H = 1.2;
  const meet = L * 0.594;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  seg(points, items, n('tube-t'), [0, H], [L, H], { weight: 3, group: n('tube') });
  seg(points, items, n('tube-b'), [0, 0], [L, 0], { weight: 3, group: n('tube') });
  const wool = (id: string, x0: number, tex: string, place: Place, at: P) => {
    const ids = [n(`${id}-0`), n(`${id}-1`), n(`${id}-2`), n(`${id}-3`)];
    [
      [x0, 0.06],
      [x0 + 0.9, 0.06],
      [x0 + 0.9, H - 0.06],
      [x0, H - 0.06],
    ].forEach((p, i) => (points[ids[i]] = p as P));
    items.push({ kind: 'region', id: n(`${id}-wool`), points: ids, tone: 'ink', shade: 0.55, group: n(id) });
    points[n(`${id}-at`)] = at;
    items.push({ kind: 'label', id: n(`${id}-label`), at: n(`${id}-at`), tex, place, group: n(id) });
  };
  wool('nh3', 0, '\\text{ammonia, } \\ce{NH3}', 'below right', [0, -0.3]);
  wool('hcl', L - 0.9, '\\text{hydrogen chloride, } \\ce{HCl}', 'below left', [L, -0.3]);
  seg(points, items, n('path-nh3'), [1.1, H + 0.5], [meet - 0.15, H + 0.5], { tone: 'adj', weight: 4, arrow: true, group: n('paths') });
  seg(points, items, n('path-hcl'), [L - 1.1, H + 0.5], [meet + 0.15, H + 0.5], { tone: 'opp', weight: 4, arrow: true, group: n('paths') });
  const band = [n('ring-0'), n('ring-1'), n('ring-2'), n('ring-3')];
  [
    [meet - 0.2, 0.04],
    [meet + 0.2, 0.04],
    [meet + 0.2, H - 0.04],
    [meet - 0.2, H - 0.04],
  ].forEach((p, i) => (points[band[i]] = p as P));
  items.push({ kind: 'region', id: n('ring-band'), points: band, tone: 'ink', shade: 0.95, group: n('ring') });
  points[n('ring-at')] = [meet, H + 0.75];
  items.push({ kind: 'label', id: n('ring-label'), at: n('ring-at'), tex: '\\text{white ring}', place: 'above', group: n('ring') });
  Object.assign(points, { [n('room-a')]: [-0.3, -1.1], [n('room-b')]: [L + 0.3, H + 1.6] });
  return { points, items };
}

/**
 * A box resting on the floor: its weight as a force arrow down onto it, labelled `force`, and the
 * area it rests on drawn thick along its bottom, labelled `area`. Parts: `floor`, `box` (a group),
 * `force` (the arrow) and `area` (the thick line with its label).
 */
export function forceOnArea(o: { name?: string; force: string; area: string }): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  seg(points, items, n('floor'), [-1, 0], [7, 0], { weight: 3 });
  const ids = [n('b0'), n('b1'), n('b2'), n('b3')];
  [
    [1, 0],
    [5, 0],
    [5, 2.6],
    [1, 2.6],
  ].forEach((p, i) => (points[ids[i]] = p as P));
  items.push(
    { kind: 'region', id: n('box-fill'), points: ids, tone: 'brand', shade: 0.25, group: n('box') },
    { kind: 'curve', id: n('box-edge'), points: ids, closed: true, tone: 'brand', weight: 3, group: n('box') },
  );
  seg(points, items, n('force'), [3, 5.6], [3, 2.75], { tone: 'opp', weight: 5, arrow: true, label: o.force, labelSide: 'left' });
  seg(points, items, n('area'), [1, 0.02], [5, 0.02], { tone: 'adj', weight: 9, label: o.area, labelSide: 'right' });
  return { points, items };
}

/**
 * A mercury barometer: a tube closed at the top, standing upside down in a dish of mercury, with
 * the column of mercury held up in it and a nearly empty space above the column. The air presses
 * down on the mercury in the dish. Parts: `dish` (a group: the dish and its mercury), `tube` (a
 * group), `column` (the mercury in the tube), `space` (a label), `air` (a group: arrows down on
 * the dish and their label), and `height` (a group: a measuring line and its label `height`).
 */
export function barometer(o: { name?: string; height?: string } = {}): Part {
  const n = namer(o.name);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const quad = (id: string, list: P[], tone: DiagramTone, shade: number, group: string) => {
    const ids = list.map((p, i) => {
      points[n(`${id}-${i}`)] = p;
      return n(`${id}-${i}`);
    });
    items.push({ kind: 'region', id: n(id), points: ids, tone, shade, group });
  };
  // The dish: 7 wide, 1.6 deep, with mercury 1.1 deep.
  const level = 1.1;
  quad('dish-hg', [[-3.4, 0.05], [3.4, 0.05], [3.4, level], [-3.4, level]], 'muted', 0.75, n('dish'));
  seg(points, items, n('dish-l'), [-3.5, 1.6], [-3.5, 0], { weight: 3, group: n('dish') });
  seg(points, items, n('dish-f'), [-3.5, 0], [3.5, 0], { weight: 3, group: n('dish') });
  seg(points, items, n('dish-r'), [3.5, 0], [3.5, 1.6], { weight: 3, group: n('dish') });
  // The tube: 1 wide, from inside the mercury up to 10.4, closed at the top.
  const top = 10.4;
  const colTop = 8.6;
  quad('column', [[-0.45, 0.4], [0.45, 0.4], [0.45, colTop], [-0.45, colTop]], 'muted', 0.75, n('column'));
  seg(points, items, n('tube-l'), [-0.5, 0.4], [-0.5, top], { tone: 'ink', weight: 3, group: n('tube') });
  seg(points, items, n('tube-r'), [0.5, 0.4], [0.5, top], { tone: 'ink', weight: 3, group: n('tube') });
  seg(points, items, n('tube-top'), [-0.5, top], [0.5, top], { tone: 'ink', weight: 3, group: n('tube') });
  points[n('space-at')] = [-0.7, (colTop + top) / 2];
  items.push({ kind: 'label', id: n('space'), at: n('space-at'), tex: '\\text{nearly empty space}', place: 'left' });
  // The air pushing down on the dish, on both sides of the tube.
  for (const [k, x] of [
    [0, -2.4],
    [1, -1.5],
    [2, 1.5],
    [3, 2.4],
  ] as const)
    seg(points, items, n(`air${k}`), [x, level + 2.2], [x, level + 0.15], { tone: 'adj', weight: 4, arrow: true, group: n('air') });
  points[n('air-at')] = [2.2, level + 2.3];
  items.push({ kind: 'label', id: n('air-label'), at: n('air-at'), tex: '\\text{air pressure}', tone: 'adj', place: 'above right', group: n('air') });
  // The height of the column above the mercury in the dish.
  seg(points, items, n('h-line'), [1.4, level], [1.4, colTop], { tone: 'opp', weight: 3, group: n('height') });
  seg(points, items, n('h-top'), [1.1, colTop], [1.7, colTop], { tone: 'opp', weight: 3, group: n('height') });
  seg(points, items, n('h-bot'), [1.1, level], [1.7, level], { tone: 'opp', weight: 3, group: n('height') });
  points[n('h-at')] = [1.6, (level + colTop) / 2 + 1];
  items.push({ kind: 'label', id: n('h-label'), at: n('h-at'), tex: o.height ?? '760\\ \\text{mm}', tone: 'opp', place: 'right', group: n('height') });
  Object.assign(points, { [n('room-a')]: [-6.5, 0], [n('room-b')]: [6.5, top] });
  return { points, items };
}

/**
 * Room around a plane for its titles: the x-axis title hangs below the numbers and the y-axis
 * title sits above the top, outside the plane's own points, so a diagram fitted to its points
 * would let them spill onto whatever is drawn next to it.
 */
function titleRoom(g: Plane): Part {
  const [x0, x1] = g.x;
  const [y0, y1] = g.y;
  const a = g.map(x0, y0);
  const b = g.map(x1, y1);
  return room(g.n('title-room'), [a[0], a[1] - 1.3], [b[0], b[1] + 0.8]);
}

/**
 * The lesson's graph of volume against pressure for one sample of gas at constant temperature,
 * with pressure times volume equal to 200 kPa·L. Parts: `grid`, `axes`, the curve `pv`, and the
 * points `A`, `B` and `C` at 50, 100 and 200 kPa.
 */
export function boyleGraph(o: { name?: string } = {}): Part {
  const g = plane({ name: o.name, x: [0, 400], y: [0, 8], xStep: 50, yStep: 1, width: 9, height: 6, titles: { x: '\\text{Pressure (kPa)}', y: '\\text{Volume (L)}' } });
  return join([
    g,
    titleRoom(g),
    plot(g, { id: 'pv', f: (x) => 200 / x, from: 25, to: 400, tone: 'brand', samples: 160 }),
    dots(g, [
      { id: 'A', x: 50, y: 4, tex: '\\text{A}', tone: 'theta', place: 'above right' },
      { id: 'B', x: 100, y: 2, tex: '\\text{B}', tone: 'theta', place: 'above right' },
      { id: 'C', x: 200, y: 1, tex: '\\text{C}', tone: 'theta', place: 'above right' },
    ]),
  ]);
}

/**
 * Kelvin temperature against Celsius temperature: a straight line of slope 1 that meets 0 K at
 * −273.15 °C. Parts: `grid`, `axes`, the line `line`, and the points `zero` (absolute zero),
 * `freeze` and `boil` (water freezing and boiling), each a group: a dot and its label, set where
 * nothing else is drawn.
 */
export function kelvinGraph(o: { name?: string } = {}): Part {
  const g = plane({ name: o.name, x: [-300, 300], y: [0, 500], xStep: 100, yStep: 100, width: 9, height: 6, titles: { x: '\\text{Temperature (}^\\circ\\text{C)}', y: '\\text{Temperature (K)}' } });
  const at = (id: string, x: number, y: number, tex: string, tone: DiagramTone, place: Place) => tag(g.n(`${id}-label`), g.map(x, y), tex, { place, tone, group: g.n(id) });
  return join([
    g,
    titleRoom(g),
    plot(g, { id: 'line', f: (x) => x + 273.15, from: -273.15, to: 300, tone: 'brand' }),
    dots(g, [
      { id: 'zero-dot', x: -273.15, y: 0, tone: 'theta', group: 'zero' },
      { id: 'freeze-dot', x: 0, y: 273.15, tone: 'adj', group: 'freeze' },
      { id: 'boil-dot', x: 100, y: 373.15, tone: 'opp', group: 'boil' },
    ]),
    // Absolute zero's label sits above the line, clear of it, with a pointer down to its dot.
    at('zero', -292, 262, '\\text{absolute zero}', 'theta', 'right'),
    { points: { [g.n('zero-ptr-a')]: g.map(-268, 236), [g.n('zero-ptr-b')]: g.map(-272, 22) }, items: [{ kind: 'line', id: g.n('zero-ptr'), from: g.n('zero-ptr-a'), to: g.n('zero-ptr-b'), tone: 'theta', weight: 2, group: g.n('zero') }] },
    at('freeze', 12, 262, '\\text{water freezes}', 'adj', 'below right'),
    at('boil', 112, 362, '\\text{water boils}', 'opp', 'below right'),
  ]);
}

/**
 * Volume against Celsius temperature for three samples of gas at constant pressure: measured
 * from −50 °C to 100 °C (solid), and extended back to zero volume at −273.15 °C (dashed). Parts:
 * `grid`, `axes`, the measured lines `s1`, `s2` and `s3`, the extensions `x1`, `x2` and `x3`
 * (each a group), and the point `zero` with its label.
 */
export function charlesGraph(o: { name?: string } = {}): Part {
  const g = plane({ name: o.name, x: [-300, 100], y: [0, 5], xStep: 100, yStep: 1, width: 9.5, height: 5.5, titles: { x: '\\text{Temperature (}^\\circ\\text{C)}', y: '\\text{Volume (L)}' } });
  const lines: [string, number, number, DiagramTone][] = [
    ['1', 1.225, 2.049, 'brand'],
    ['2', 2.042, 3.415, 'adj'],
    ['3', 2.859, 4.781, 'opp'],
  ];
  return join([
    g,
    titleRoom(g),
    ...lines.flatMap(([k, lo, hi, tone]) => [
      polyline(g, { id: `x${k}`, points: [[-273.15, 0], [-50, lo]], tone, dashed: true }),
      polyline(g, { id: `s${k}`, points: [[-50, lo], [100, hi]], tone }),
    ]),
    dots(g, [{ id: 'zero', x: -273.15, y: 0, tex: '-273^\\circ\\text{C}', tone: 'theta', place: 'above left' }]),
  ]);
}
