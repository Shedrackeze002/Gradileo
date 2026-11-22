/**
 * Angle figures for video diagrams: an angle between two rays, two lines that cross, two lines cut
 * by a transversal, and a clock face. Like the solids (`solids.ts`), each returns points and named
 * parts to put into a diagram with `figure`. Directions are in degrees, anticlockwise from the
 * right, and angle arcs are yellow, as in every video.
 */
import type { DiagramItem, Place } from './script.ts';
import type { Part } from './solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const rad = (deg: number) => (deg * Math.PI) / 180;
/** The point `len` from `at` in the direction `deg`. */
const toward = (at: P, deg: number, len: number): P => [at[0] + len * Math.cos(rad(deg)), at[1] + len * Math.sin(rad(deg))];

/** The label place that sits on the side of a point facing the direction `deg`. */
export function facing(deg: number): Place {
  const places: Place[] = ['right', 'above right', 'above', 'above left', 'left', 'below left', 'below', 'below right'];
  return places[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
}

/**
 * The angle at `V` from the direction `from`, turning `deg` anticlockwise, as parts with the id
 * `id` and the group `id`. An `angle` part draws the smaller angle, so a right angle gets a square
 * mark, and an angle of 180° or more an arc drawn as a curve, with its label on the bisector.
 */
function arcParts(points: Record<string, P>, n: (s: string) => string, id: string, V: string, from: number, deg: number, ends: [string, string], label: string | undefined, len: number): DiagramItem[] {
  const at = points[V];
  const group = n(id);
  if (deg < 180 && deg !== 90) return [{ kind: 'angle', id: n(id), at: V, from: ends[0], to: ends[1], ...(label ? { label } : {}), group }];
  const items: DiagramItem[] = [];
  if (deg === 90) items.push({ kind: 'right', id: n(id), at: V, from: ends[0], to: ends[1], group });
  else {
    const names: string[] = [];
    const r = 0.25 * len;
    for (let i = 0; i <= 48; i++) {
      points[n(`${id}${i}`)] = toward(at, from + (deg * i) / 48, r);
      names.push(n(`${id}${i}`));
    }
    items.push({ kind: 'curve', id: n(id), points: names, tone: 'theta', weight: 3, group });
  }
  if (label) {
    points[n(`${id}-at`)] = toward(at, from + deg / 2, deg > 180 ? 0.42 * len : 0.3 * len);
    items.push({ kind: 'label', id: n(`${id}-label`), at: n(`${id}-at`), tex: label, tone: 'theta', place: 'center', group });
  }
  return items;
}

/**
 * The angle between two rays from a vertex `B`: the arm to `A` points in the direction `from`
 * (0, to the right, unless set), and the arm to `C` is `deg` further round, anticlockwise. A right
 * angle gets a square mark, and an angle of 180° or more (a straight or reflex angle) an arc round
 * the long way. `names` letters the arm ends and the vertex (["A", "B", "C"]), and `bisect` adds
 * the bisector, to `D`, and its two halves.
 *
 * Parts: `arms` (a group: both rays), `arc` (the angle, labelled `label`), `names` (a group: the
 * letters), and with `bisect`, `bis` (the bisector) and `half1` and `half2` (labelled `halves`).
 */
export function angle(o: { name?: string; at?: P; deg: number; from?: number; len?: number; label?: string; names?: [string, string, string]; bisect?: boolean; halves?: [string, string] }): Part {
  const n = namer(o.name);
  const at = o.at ?? [0, 0];
  const from = o.from ?? 0;
  const len = o.len ?? 4;
  const points: Record<string, P> = { [n('B')]: at, [n('A')]: toward(at, from, len), [n('C')]: toward(at, from + o.deg, len) };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('arm1'), from: n('B'), to: n('A'), arrow: true, group: n('arms') },
    { kind: 'line', id: n('arm2'), from: n('B'), to: n('C'), arrow: true, group: n('arms') },
  ];
  if (o.bisect) {
    const half = o.deg / 2;
    points[n('D')] = toward(at, from + half, len);
    items.push({ kind: 'line', id: n('bis'), from: n('B'), to: n('D'), tone: 'adj', dashed: true, arrow: true });
    items.push(...arcParts(points, n, 'half1', n('B'), from, half, [n('A'), n('D')], o.halves?.[0], len));
    items.push(...arcParts(points, n, 'half2', n('B'), from + half, half, [n('D'), n('C')], o.halves?.[1], len));
  }
  items.push(...arcParts(points, n, 'arc', n('B'), from, o.deg, [n('A'), n('C')], o.label, len));
  if (o.names) {
    const [a, b, c] = o.names;
    items.push(
      { kind: 'label', id: n('nA'), at: n('A'), tex: a, place: facing(from), group: n('names') },
      // The vertex letter sits opposite the bisector, outside the angle; for a reflex angle, that
      // side holds the smaller angle, so it sits on the bisector, inside the arc.
      { kind: 'label', id: n('nB'), at: n('B'), tex: b, place: facing(from + o.deg / 2 + (o.deg > 180 ? 0 : 180)), group: n('names') },
      { kind: 'label', id: n('nC'), at: n('C'), tex: c, place: facing(from + o.deg), group: n('names') },
    );
    if (o.bisect) items.push({ kind: 'label', id: n('nD'), at: n('D'), tex: 'D', place: facing(from + o.deg / 2), group: n('names') });
  }
  return { points, items };
}

/**
 * Two straight lines crossing at `O`: one runs left to right (turned by `tilt`), the other `deg`
 * further round. The four angles, anticlockwise from the right, are `a1` (`deg`), `a2`, `a3`
 * (across from `a1`) and `a4` (across from `a2`), each labelled from `labels`.
 *
 * Parts: `lines` (a group: `l1` and `l2`) and the angles `a1` to `a4`.
 */
export function crossing(o: { name?: string; deg: number; tilt?: number; len?: number; labels?: Partial<Record<'a1' | 'a2' | 'a3' | 'a4', string>> }): Part {
  const n = namer(o.name);
  const t = o.tilt ?? 0;
  const len = o.len ?? 4;
  const O: P = [0, 0];
  const dirs = [t, t + o.deg, t + 180, t + 180 + o.deg];
  const points: Record<string, P> = { [n('O')]: O };
  dirs.forEach((d, i) => (points[n(`e${i}`)] = toward(O, d, len)));
  const items: DiagramItem[] = [
    { kind: 'line', id: n('l1'), from: n('e2'), to: n('e0'), group: n('lines') },
    { kind: 'line', id: n('l2'), from: n('e3'), to: n('e1'), group: n('lines') },
  ];
  for (let i = 0; i < 4; i++) {
    const id = `a${i + 1}` as 'a1' | 'a2' | 'a3' | 'a4';
    const label = o.labels?.[id];
    items.push({ kind: 'angle', id: n(id), at: n('O'), from: n(`e${i}`), to: n(`e${(i + 1) % 4}`), ...(label ? { label } : {}) });
  }
  return { points, items };
}

/**
 * Two lines `m` (above) and `n` (below), `gap` apart, cut by a transversal `t` that crosses `m`
 * at `deg` (the angle above `m`, on the right of `t`). The eight angles are numbered as in the
 * lessons: 1 to 4 where `t` crosses `m` (above left, above right, below left, below right), and 5
 * to 8 where it crosses `n`. `turn` tips `n` by that many degrees, for lines that only look
 * parallel; arrowheads mark the lines parallel when it is 0.
 *
 * `names` renames the three lines in the figure (TeX, such as `['l_1', 'l_2', 't']`); the part ids
 * stay `m`, `n` and `t`.
 *
 * Parts: `lines` (a group: `m`, `n` and `t`, with their names), `marks` (a group: the arrowheads)
 * and the angles `a1` to `a8`, labelled from `labels`.
 */
export function transversal(o: { name?: string; deg: number; gap?: number; len?: number; turn?: number; names?: [string, string, string]; labels?: Partial<Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, string>> }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 4;
  const len = o.len ?? 10;
  const turn = o.turn ?? 0;
  // The crossings, centred left to right.
  const run = gap / Math.tan(rad(o.deg));
  const M: P = [run / 2, gap];
  const N: P = [-run / 2, 0];
  const points: Record<string, P> = {
    [n('M')]: M,
    [n('N')]: N,
    [n('mW')]: [-len / 2, gap],
    [n('mE')]: [len / 2, gap],
    [n('nW')]: toward(N, 180 + turn, len / 2 - N[0]),
    [n('nE')]: toward(N, turn, len / 2 + N[0]),
    [n('tUp')]: toward(M, o.deg, 0.55 * gap / Math.sin(rad(o.deg))),
    [n('tDown')]: toward(N, o.deg + 180, 0.55 * gap / Math.sin(rad(o.deg))),
  };
  const items: DiagramItem[] = [
    { kind: 'line', id: n('m'), from: n('mW'), to: n('mE'), group: n('lines') },
    { kind: 'line', id: n('n'), from: n('nW'), to: n('nE'), group: n('lines') },
    { kind: 'line', id: n('t'), from: n('tDown'), to: n('tUp'), tone: 'adj', group: n('lines') },
    { kind: 'label', id: n('m-name'), at: n('mE'), tex: o.names?.[0] ?? 'm', place: 'right', group: n('lines') },
    { kind: 'label', id: n('n-name'), at: n('nE'), tex: o.names?.[1] ?? 'n', place: 'right', group: n('lines') },
    { kind: 'label', id: n('t-name'), at: n('tUp'), tex: o.names?.[2] ?? 't', tone: 'adj', place: 'above', group: n('lines') },
  ];
  if (turn === 0) {
    // A chevron on each line, near its left end.
    const s = 0.25;
    for (const [key, y] of [['m', gap], ['n', 0]] as const) {
      const x = -len / 2 + 0.9;
      Object.assign(points, { [n(`${key}k1`)]: [x - s, y + s], [n(`${key}k2`)]: [x + s * 0.4, y], [n(`${key}k3`)]: [x - s, y - s] });
      items.push(
        { kind: 'line', id: n(`${key}-mark1`), from: n(`${key}k1`), to: n(`${key}k2`), tone: 'brand', group: n('marks') },
        { kind: 'line', id: n(`${key}-mark2`), from: n(`${key}k3`), to: n(`${key}k2`), tone: 'brand', group: n('marks') },
      );
    }
  }
  // Above left, above right, below left, below right of each crossing.
  const corners = (V: string, W: string, E: string, up: string, down: string, first: number) =>
    ([
      [W, up],
      [up, E],
      [down, W],
      [E, down],
    ] as const).map(([a, b], i): DiagramItem => {
      const k = (first + i) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
      const label = o.labels?.[k];
      return { kind: 'angle', id: n(`a${k}`), at: V, from: a, to: b, r: 34, ...(label ? { label } : {}) };
    });
  items.push(...corners(n('M'), n('mW'), n('mE'), n('tUp'), n('N'), 1), ...corners(n('N'), n('nW'), n('nE'), n('M'), n('tDown'), 5));
  return { points, items };
}

/**
 * A clock face showing `h`:`m`, with its twelve numbers, a short hour hand (which moves on as the
 * minutes pass) and a long minute hand. `label` marks the smaller angle between the hands.
 *
 * Parts: `face` (a group: the rim, the ticks and the numbers), `hour`, `minute` and `between`.
 */
export function clock(o: { name?: string; h: number; m: number; r?: number; label?: string }): Part {
  const n = namer(o.name);
  const r = o.r ?? 4;
  const O: P = [0, 0];
  const points: Record<string, P> = { [n('O')]: O };
  const rim: string[] = [];
  for (let i = 0; i < 96; i++) {
    points[n(`rim${i}`)] = toward(O, (i * 360) / 96, r);
    rim.push(n(`rim${i}`));
  }
  const items: DiagramItem[] = [
    { kind: 'region', id: n('fill'), points: rim, tone: 'brand', group: n('face') },
    { kind: 'curve', id: n('rim'), points: rim, closed: true, group: n('face') },
  ];
  // Clockwise from 12, which points up.
  const at = (turns: number) => 90 - 360 * turns;
  for (let k = 1; k <= 12; k++) {
    points[n(`t${k}a`)] = toward(O, at(k / 12), 0.92 * r);
    points[n(`t${k}b`)] = toward(O, at(k / 12), r);
    points[n(`num${k}`)] = toward(O, at(k / 12), 0.76 * r);
    items.push(
      { kind: 'line', id: n(`tick${k}`), from: n(`t${k}a`), to: n(`t${k}b`), tone: 'muted', group: n('face') },
      { kind: 'label', id: n(`n${k}`), at: n(`num${k}`), tex: String(k), tone: 'ink', place: 'center', group: n('face') },
    );
  }
  points[n('H')] = toward(O, at((o.h % 12) / 12 + o.m / 720), 0.45 * r);
  points[n('Mn')] = toward(O, at(o.m / 60), 0.62 * r);
  items.push(
    { kind: 'line', id: n('hour'), from: n('O'), to: n('H'), tone: 'opp', weight: 7 },
    { kind: 'line', id: n('minute'), from: n('O'), to: n('Mn'), tone: 'adj', weight: 5 },
    { kind: 'angle', id: n('between'), at: n('O'), from: n('Mn'), to: n('H'), r: 40, ...(o.label ? { label: o.label } : {}) },
  );
  return { points, items };
}

/**
 * A protractor with its centre on the vertex of an angle: a half circle marked every 10°, with an
 * inner scale (0 on the right) and an outer scale (0 on the left), numbered every 30°. One arm runs
 * along the zero line to the right, and the other is `deg` round. Where it crosses the scales, the
 * readings `deg` (inner) and 180 − `deg` (outer) replace the nearby numbers.
 *
 * Parts: `tool` (a group: the rim, the base line, the ticks and the centre mark), `inner` and
 * `outer` (groups: the numbers), `arm1`, `arm2`, `arc` (the angle, labelled `label`), and the
 * readings `read-in` and `read-out`.
 */
export function protractor(o: { name?: string; deg: number; r?: number; label?: string }): Part {
  const n = namer(o.name);
  const r = o.r ?? 4;
  const O: P = [0, 0];
  const points: Record<string, P> = { [n('O')]: O, [n('L')]: [-r, 0], [n('R')]: [r, 0], [n('c1')]: [0, -0.12 * r], [n('c2')]: [0, 0.12 * r] };
  const rim: string[] = [];
  for (let i = 0; i <= 60; i++) {
    points[n(`rim${i}`)] = toward(O, i * 3, r);
    rim.push(n(`rim${i}`));
  }
  const items: DiagramItem[] = [
    { kind: 'region', id: n('fill'), points: rim, tone: 'brand', group: n('tool') },
    { kind: 'curve', id: n('rim'), points: rim, tone: 'muted', group: n('tool') },
    { kind: 'line', id: n('base'), from: n('L'), to: n('R'), tone: 'muted', group: n('tool') },
    { kind: 'line', id: n('centre'), from: n('c1'), to: n('c2'), tone: 'muted', group: n('tool') },
  ];
  for (let d = 10; d < 180; d += 10) {
    points[n(`t${d}a`)] = toward(O, d, (d % 30 === 0 ? 0.84 : 0.9) * r);
    points[n(`t${d}b`)] = toward(O, d, r);
    items.push({ kind: 'line', id: n(`tick${d}`), from: n(`t${d}a`), to: n(`t${d}b`), tone: 'muted', weight: 1.5, group: n('tool') });
  }
  for (let d = 0; d <= 180; d += 30) {
    // Leave room for the readings beside the second arm.
    if (Math.abs(d - o.deg) < 16) continue;
    // The end numbers sit just above the base line.
    const at = d === 0 ? 6 : d === 180 ? 174 : d;
    points[n(`in${d}`)] = toward(O, at, 0.7 * r);
    points[n(`out${d}`)] = toward(O, at, 1.12 * r);
    items.push(
      { kind: 'label', id: n(`in${d}`), at: n(`in${d}`), tex: String(d), tone: 'muted', place: 'center', group: n('inner') },
      { kind: 'label', id: n(`out${d}`), at: n(`out${d}`), tex: String(180 - d), tone: 'muted', place: 'center', group: n('outer') },
    );
  }
  Object.assign(points, {
    [n('A')]: toward(O, 0, 1.3 * r),
    [n('C')]: toward(O, o.deg, 1.3 * r),
    [n('rIn')]: toward(O, o.deg + 9, 0.7 * r),
    [n('rOut')]: toward(O, o.deg + 7, 1.12 * r),
  });
  items.push(
    { kind: 'line', id: n('arm1'), from: n('O'), to: n('A'), arrow: true },
    { kind: 'line', id: n('arm2'), from: n('O'), to: n('C'), arrow: true },
    { kind: 'angle', id: n('arc'), at: n('O'), from: n('A'), to: n('C'), r: 40, ...(o.label ? { label: o.label } : {}) },
    { kind: 'label', id: n('read-in'), at: n('rIn'), tex: String(o.deg), tone: 'good', place: 'center' },
    { kind: 'label', id: n('read-out'), at: n('rOut'), tex: String(180 - o.deg), tone: 'bad', place: 'center' },
  );
  return { points, items };
}
