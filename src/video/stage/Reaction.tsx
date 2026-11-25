/**
 * Nuclear reactions and the energy they release (src/video/reaction.ts works it all out).
 *
 * Nucleons that come together into a nucleus and lose mass as they do; the graph of the binding
 * energy for each nucleon; a nucleus of uranium-235 that a neutron splits; a chain reaction, with
 * and without control rods; and two nuclei of hydrogen that fuse if they are fast enough.
 */
import type { ReactElement } from 'react';
import type { ReactionEl } from '../script.ts';
import { nucleons, radiusOf, type P3 } from '../nucleus.ts';
import { ARRIVE, bindingAt, CURVE, FIRST, fissionsBy, freed, GEN, generations, JOIN, MEET, MEV_PER_U, PRODUCTS, reactionAt, separateMass, STRETCH, TURN, type Product, type ReactionState } from '../reaction.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { POSITIVE } from './Charges.tsx';
import { Arrow, clamp01, FONT, INK2, Text } from './motionKit.tsx';
import { NEUTRON, Sphere } from './Nucleus.tsx';
import { Packet } from './Photons.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** The size the pictures are designed at; they are scaled to the room they are given. */
const WIDE = 1136;
const LIVE = TONES.theta;
/** The two nuclei that a fission makes, in a chain reaction. */
const PIECES = [TONES.adj, TONES.good];

interface Frame {
  out: ReactElement[];
  el: ReactionEl;
  state: ReactionState;
  top: number;
  HIGH: number;
  part: (name: string) => number;
}

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const mix = (a: number, b: number, k: number) => a + (b - a) * k;

/** One nucleon to draw. */
interface Ball {
  key: string;
  x: number;
  y: number;
  depth: number;
  r: number;
  proton: boolean;
  opacity?: number;
}

/** Nucleons, the furthest from the viewer first. */
function balls(out: ReactElement[], list: Ball[]): void {
  for (const b of [...list].sort((p, q) => p.depth - q.depth)) out.push(<Sphere key={b.key} x={b.x} y={b.y} r={b.r} color={b.proton ? POSITIVE : NEUTRON} opacity={b.opacity ?? 1} sign={b.proton ? '+' : undefined} />);
}

/** An arrow from one point to another. */
function Dart({ from, to, color, opacity = 1, width = 5 }: { from: [number, number]; to: [number, number]; color: string; opacity?: number; width?: number }) {
  const [dx, dy] = [to[0] - from[0], to[1] - from[1]];
  const len = Math.hypot(dx, dy);
  if (len < 4 || opacity <= 0) return null;
  const [ux, uy] = [dx / len, dy / len];
  const head = Math.min(18, len * 0.5);
  const [bx, by] = [to[0] - ux * head, to[1] - uy * head];
  return (
    <g opacity={opacity}>
      <line x1={from[0]} y1={from[1]} x2={bx} y2={by} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${to[0]},${to[1]} ${bx - uy * head * 0.55},${by + ux * head * 0.55} ${bx + uy * head * 0.55},${by - ux * head * 0.55}`} fill={color} />
    </g>
  );
}

/** A ring that spreads from a place where energy is released. */
function flash(out: ReactElement[], key: string, x: number, y: number, since: number, reach = 260): void {
  if (since <= 0 || since >= 0.7) return;
  out.push(<circle key={key} cx={x} cy={y} r={24 + reach * since} fill="none" stroke="#fff" strokeWidth={3} opacity={(1 - since / 0.7) * 0.85} />);
}

/** Nucleons that come together into a nucleus, and the mass that goes missing. */
function drawWeigh({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, masses, energy] = [part('names'), part('masses'), part('energy')];
  const [z, n] = [el.z ?? 2, el.n ?? 2];
  const a = z + n;
  const mass = el.mass ?? 4.0015;
  const apart = separateMass(z, n);
  const j = ease(state.joined);
  const { protons, neutrons, ball } = nucleons(z, n);
  const [cx, cy] = [300, (top + HIGH) / 2 - 6];
  // Apart, the nucleons are spread out as far as the panel lets them, and at least 1.6 times as far as in the nucleus.
  const reach = Math.max(ball * 0.5, ...[...protons, ...neutrons].map((p) => Math.hypot(p[0], p[1])));
  const room = (HIGH - top) / 2 - 62;
  const S = Math.min(el.scale ?? 44, room / (reach * 1.6 + ball));
  const spread = Math.max(1.6, (room - ball * S) / (reach * S));
  const k = mix(spread, 1, j);
  const list: Ball[] = [];
  const add = (p: P3, i: number, proton: boolean) => list.push({ key: `${proton ? 'p' : 'n'}${i}`, x: cx + p[0] * k * S, y: cy - p[1] * k * S, depth: p[2], r: ball * S, proton });
  protons.forEach((p, i) => add(p, i, true));
  neutrons.forEach((p, i) => add(p, i, false));
  balls(out, list);
  // The energy leaves as the nucleons come together.
  const since = state.time - state.joinAt - JOIN * 0.55;
  if (state.joining && since > 0 && since < 1.5)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 + 0.5;
      const far = radiusOf(a) * S + 26 + 150 * since;
      out.push(<Packet key={`e${i}`} at={[cx + Math.cos(angle) * far, cy - Math.sin(angle) * far]} dir={[Math.cos(angle), -Math.sin(angle)]} nm={0.001} wave={7} opacity={clamp01(since * 5) * clamp01(1 - since / 1.5)} />);
    }
  // And the same energy has to come in to pull them apart again.
  const apartFor = state.time - state.joinAt;
  if (!state.joining && apartFor > 0 && apartFor < 1.5)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 + 0.5;
      const far = radiusOf(a) * S + 26 + 150 * (1.5 - apartFor);
      out.push(<Packet key={`i${i}`} at={[cx + Math.cos(angle) * far, cy - Math.sin(angle) * far]} dir={[-Math.cos(angle), Math.sin(angle)]} nm={0.001} wave={7} opacity={clamp01(apartFor * 5) * clamp01((1.5 - apartFor) * 4)} />);
    }
  const made = el.name ? `A nucleus of ${el.name}-${a}` : 'One nucleus';
  if (names > 0) {
    const what = `${z} proton${z === 1 ? '' : 's'} and ${n} neutron${n === 1 ? '' : 's'}, apart`;
    out.push(<Text key="apart" x={cx} y={top + 28} color={INK2} size={19} opacity={names * clamp01(1 - j * 2)}>{what}</Text>);
    out.push(<Text key="made" x={cx} y={top + 28} color={INK2} size={19} opacity={names * clamp01(j * 2 - 1)}>{made}</Text>);
  }
  if (masses > 0) out.push(<Text key="now" x={cx} y={HIGH - 28} color={INK} size={22} opacity={masses}>{`Mass: ${mix(apart, mass, j).toFixed(4)} u`}</Text>);
  // The sums beside it: once the nucleus has formed, its rows stay.
  const formed = clamp01(ease(Math.max(state.joined, state.most)) * 2 - 1);
  const tx = 610;
  const rows: Array<[string, string, string, number]> = [
    ['Apart', `${apart.toFixed(4)} u`, INK2, masses],
    ['As a nucleus', `${mass.toFixed(4)} u`, INK, masses * formed],
    ['Mass defect', `${(apart - mass).toFixed(4)} u`, TONES.hyp, masses * formed],
    ['Binding energy', `${((apart - mass) * MEV_PER_U).toFixed(el.places ?? 1)} MeV`, TONES.good, energy * formed],
  ];
  if (el.each) rows.push(['For each nucleon', `${(((apart - mass) * MEV_PER_U) / a).toFixed(2)} MeV`, TONES.good, energy * formed]);
  const y0 = cy - ((rows.length - 1) * 40) / 2;
  rows.forEach(([name, value, color, opacity], i) => {
    if (opacity <= 0) return;
    out.push(<Text key={`r${i}n`} x={tx} y={y0 + i * 40} color={color} size={21} anchor="start" opacity={opacity}>{name}</Text>);
    out.push(<Text key={`r${i}v`} x={tx + 400} y={y0 + i * 40} color={color} size={21} anchor="end" opacity={opacity}>{value}</Text>);
  });
}

/** The graph of the binding energy for each nucleon against the mass number. */
function drawCurve({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, value, peak, fusion, fission] = [part('names'), part('value'), part('peak'), part('fusion'), part('fission')];
  const [gx0, gx1, gy0, gy1] = [112, WIDE - 76, top + 62, HIGH - 62];
  const xOf = (a: number) => gx0 + (a / 240) * (gx1 - gx0);
  const yOf = (e: number) => gy1 - (e / 10) * (gy1 - gy0);
  if (peak > 0) {
    out.push(<rect key="band" x={xOf(48)} y={gy0 - 8} width={xOf(70) - xOf(48)} height={gy1 - gy0 + 8} fill={TONES.good} opacity={0.14 * peak} />);
    out.push(<Text key="band-n" x={xOf(70) + 10} y={yOf(0.6)} color={TONES.good} size={18} anchor="start" opacity={peak}>Most tightly bound</Text>);
  }
  out.push(<line key="ax" x1={gx0} y1={gy1} x2={gx1 + 14} y2={gy1} stroke={INK2} strokeWidth={2} />);
  out.push(<line key="ay" x1={gx0} y1={gy1} x2={gx0} y2={gy0 - 14} stroke={INK2} strokeWidth={2} />);
  for (let a = 0; a <= 240; a += 40) {
    out.push(<line key={`tx${a}`} x1={xOf(a)} y1={gy1} x2={xOf(a)} y2={gy1 + 7} stroke={INK2} strokeWidth={2} />);
    out.push(<Text key={`tn${a}`} x={xOf(a)} y={gy1 + 22} color={INK2} size={16}>{`${a}`}</Text>);
  }
  for (let e = 0; e <= 10; e += 2) {
    out.push(<line key={`ty${e}`} x1={gx0 - 7} y1={yOf(e)} x2={gx0} y2={yOf(e)} stroke={INK2} strokeWidth={2} />);
    out.push(<Text key={`yn${e}`} x={gx0 - 14} y={yOf(e)} color={INK2} size={16} anchor="end">{`${e}`}</Text>);
  }
  out.push(<Text key="xname" x={gx1 + 14} y={gy1 + 46} color={INK2} size={16} anchor="end">Mass number</Text>);
  out.push(<Text key="yname" x={gx0 - 40} y={top + 24} color={INK2} size={16} anchor="start">Binding energy for each nucleon (MeV)</Text>);
  out.push(<polyline key="curve" points={CURVE.map(([a, e]) => `${xOf(a).toFixed(1)},${yOf(e).toFixed(1)}`).join(' ')} fill="none" stroke={LIVE} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />);
  // The nuclei that the element marks.
  const marks = el.marks ?? [
    { a: 4, label: 'helium-4' },
    { a: 56, label: 'iron-56' },
    { a: 235, label: 'uranium-235' },
  ];
  if (names > 0)
    for (const m of marks) {
      const [x, y] = [xOf(m.a), yOf(bindingAt(m.a))];
      out.push(<circle key={`m${m.a}`} cx={x} cy={y} r={6} fill={TONES.adj} stroke="#0d0c24" strokeWidth={1.5} opacity={names} />);
      // A light nucleus is named to the right of the steep part of the graph and below it, a heavy one above the graph (the fission arrow is below it), and one between them below the graph on its left (the marker's guide is on its right at the peak).
      const [light, heavy] = [m.a < 20, m.a > 200];
      out.push(<Text key={`m${m.a}n`} x={light ? xOf(m.a + 10) : heavy ? x : x - 10} y={light ? y + 26 : heavy ? y - 24 : y + 24} color={TONES.adj} size={17} anchor={light ? 'start' : 'end'} opacity={names}>{m.label}</Text>);
    }
  // The two ways towards the peak.
  if (fusion > 0) {
    out.push(<Dart key="fu" from={[xOf(2) + 44, yOf(1.6)]} to={[xOf(2) + 44, yOf(5.6)]} color={TONES.hyp} opacity={fusion} />);
    // In two lines, so that it ends before the band at the peak.
    out.push(<Text key="fu-n" x={xOf(2) + 62} y={yOf(3.6) - 12} color={TONES.hyp} size={19} anchor="start" opacity={fusion}>Fusion: light</Text>);
    out.push(<Text key="fu-m" x={xOf(2) + 62} y={yOf(3.6) + 12} color={TONES.hyp} size={19} anchor="start" opacity={fusion}>nuclei join</Text>);
  }
  if (fission > 0) {
    out.push(<Dart key="fi" from={[xOf(232), yOf(7.62) + 34]} to={[xOf(128), yOf(8.45) + 34]} color={TONES.opp} opacity={fission} />);
    out.push(<Text key="fi-n" x={xOf(180)} y={yOf(8.05) + 60} color={TONES.opp} size={19} opacity={fission}>Fission: a heavy nucleus splits</Text>);
  }
  if (value > 0) {
    const [x, y] = [xOf(state.at), yOf(bindingAt(state.at))];
    out.push(<path key="read" d={`M ${x} ${gy1} L ${x} ${y} L ${gx0} ${y}`} fill="none" stroke={LIVE} strokeWidth={1.6} strokeDasharray="5 6" opacity={0.7 * value} />);
    out.push(<circle key="now" cx={x} cy={y} r={8} fill={LIVE} stroke="#0d0c24" strokeWidth={2} opacity={value} style={{ filter: `drop-shadow(0 0 6px ${LIVE})` }} />);
    out.push(<Text key="value" x={gx1 + 14} y={top + 24} color={LIVE} size={20} anchor="end" opacity={value}>{`A = ${Math.round(state.at)}: ${bindingAt(state.at).toFixed(1)} MeV for each nucleon`}</Text>);
  }
}

/** One nucleon of uranium-236, and where a fission sends it. */
interface Piece {
  from: P3;
  proton: boolean;
  /** The product it ends in (0 or 1), or 2 for a neutron that is set free. */
  group: 0 | 1 | 2;
  slot: P3;
  free: number;
  incoming: boolean;
}

const plans = new Map<string, { pieces: Piece[]; ball: number; radii: [number, number] }>();

/** Which nucleons of uranium-236 go to which product: the left of the nucleus makes the first, the right the second, and the neutrons between them go free. */
function planOf(products: [Product, Product]) {
  const key = products.map((p) => `${p.z}:${p.n}`).join('|');
  const known = plans.get(key);
  if (known) return known;
  const byX = (p: P3, q: P3) => p[0] - q[0] || p[1] - q[1] || p[2] - q[2];
  const whole = nucleons(92, 144);
  const made = products.map((p) => nucleons(p.z, p.n));
  const [ap, an, bp, bn] = [[...made[0].protons].sort(byX), [...made[0].neutrons].sort(byX), [...made[1].protons].sort(byX), [...made[1].neutrons].sort(byX)];
  const free = freed(products);
  const pieces: Piece[] = [];
  [...whole.protons].sort(byX).forEach((p, i) => pieces.push({ from: p, proton: true, group: i < ap.length ? 0 : 1, slot: (i < ap.length ? ap[i] : bp[i - ap.length]) ?? p, free: -1, incoming: false }));
  [...whole.neutrons].sort(byX).forEach((p, i) => {
    if (i < an.length) pieces.push({ from: p, proton: false, group: 0, slot: an[i], free: -1, incoming: i === 0 });
    else if (i < an.length + free) pieces.push({ from: p, proton: false, group: 2, slot: p, free: i - an.length, incoming: false });
    else pieces.push({ from: p, proton: false, group: 1, slot: bn[i - an.length - free] ?? p, free: -1, incoming: false });
  });
  const plan = { pieces, ball: whole.ball, radii: [radiusOf(products[0].z + products[0].n), radiusOf(products[1].z + products[1].n)] as [number, number] };
  plans.set(key, plan);
  return plan;
}

/** The ways the free neutrons of a fission go. */
const WAYS: Array<[number, number]> = [
  [0.8, -0.6],
  [-0.75, -0.66],
  [0.16, 0.99],
  [-0.4, 0.92],
];

/** A neutron splits a nucleus of uranium-235. */
function drawFission({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, energy] = [part('names'), part('energy')];
  const products = el.products ?? PRODUCTS;
  const { pieces, ball, radii } = planOf(products);
  const S = Math.min(el.scale ?? 15, ((HIGH - top) / 2 - 56) / radiusOf(236));
  const [cx, cy] = [WIDE / 2 - 20, (top + HIGH) / 2];
  const { since } = state;
  const stretch = since < ARRIVE ? 0 : ease((since - ARRIVE) / STRETCH);
  const split = since - ARRIVE - STRETCH;
  const moved = split > 0 ? ease(split / 0.8) : 0;
  const gone = split > 0 ? 1 - Math.exp(-split / 1.3) : 0;
  // Where each product starts (the middle of its nucleons in the stretched nucleus) and where it has got to.
  const middle = [0, 1].map((g) => {
    const mine = pieces.filter((p) => p.group === g);
    return (mine.reduce((sum, p) => sum + p.from[0], 0) / Math.max(1, mine.length)) * 1.4 * S;
  });
  const centre = [cx + middle[0] - 300 * gone, cx + middle[1] + 240 * gone];
  const list: Ball[] = [];
  pieces.forEach((p, i) => {
    let [x, y] = [cx + p.from[0] * (1 + 0.4 * stretch) * S, cy - p.from[1] * (1 - 0.18 * stretch) * S];
    let [opacity, r] = [1, ball * S];
    if (p.incoming && since < ARRIVE) {
      // The neutron that sets it off comes in from the left.
      if (since < 0) return;
      const k = ease(since / ARRIVE);
      [x, y] = [mix(70, x, k), mix(cy, y, k)];
    } else if (split > 0 && p.group === 2) {
      const [wx, wy] = WAYS[p.free % WAYS.length];
      // A free neutron is drawn a little larger, so that it is seen as it leaves.
      [x, y] = [x + wx * 120 * split, y + wy * 120 * split];
      // It fades before it reaches the caption above or the energy below.
      opacity = clamp01(((HIGH - top) / 2 - 44 - Math.abs(y - cy)) / 40);
      r *= 1 + 0.5 * clamp01(split / 0.3);
    } else if (split > 0) {
      const g = p.group as 0 | 1;
      [x, y] = [mix(x, centre[g] + p.slot[0] * S, moved), mix(y, cy - p.slot[1] * S, moved)];
    }
    list.push({ key: `u${i}`, x, y, depth: p.group === 2 && split > 0 ? 99 : mix(p.from[2], p.slot[2], moved), r, proton: p.proton, opacity });
  });
  balls(out, list);
  flash(out, "flash", cx, cy, split);
  if (names > 0) {
    const R = radiusOf(236) * S;
    if (since >= 0 && since < ARRIVE) out.push(<Text key="in" x={mix(70, cx - R, ease(since / ARRIVE))} y={cy - 26} color={NEUTRON} size={18} opacity={names * clamp01(1.2 - (since / ARRIVE) * 1.2)}>Neutron</Text>);
    out.push(<Text key="name-235" x={cx} y={cy - R - 24} color={INK} size={19} opacity={names * (since < ARRIVE ? 1 : 0)}>Uranium-235</Text>);
    out.push(<Text key="name-236" x={cx} y={cy - R - 24} color={TONES.bad} size={19} opacity={names * (since >= ARRIVE && split <= 0 ? 1 : 0)}>Uranium-236: unstable</Text>);
    if (split > 0.3) {
      const seen = names * clamp01((split - 0.3) / 0.4);
      products.forEach((p, g) => out.push(<Text key={`pr${g}`} x={centre[g]} y={cy - radii[g] * S - 24} color={INK} size={19} opacity={seen}>{`${p.name}-${p.z + p.n}`}</Text>));
      out.push(<Text key="free" x={cx} y={top + 26} color={NEUTRON} size={19} opacity={seen}>{`${freed(products)} neutrons are set free`}</Text>);
    }
  }
  if (energy > 0 && split > 0) out.push(<Text key="energy" x={cx} y={HIGH - 26} color={TONES.good} size={21} opacity={energy * clamp01(split / 0.5)}>{`Energy released: ${el.released ?? 173.2} MeV`}</Text>);
}

/** A chain reaction: every fission sends out neutrons that cause more. */
function drawChain({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, count] = [part('names'), part('count')];
  const rods = el.rods ?? false;
  const gens = generations(rods);
  const { since } = state;
  const cy = (top + HIGH) / 2 - (rods ? 0 : 14);
  const [x0, dx, R] = rods ? [170, 200, 22] : [170, 262, 16];
  const tall = HIGH - top - 84;
  const place = (g: number, i: number): [number, number] => [x0 + g * dx, cy + (i - (gens[g] - 1) / 2) * (tall / gens[g])];
  const when = (g: number) => FIRST + g * GEN;
  const [rodTop, rodLow] = [top + 44, HIGH - 62];
  if (rods) {
    for (const y of [rodTop, rodLow]) out.push(<rect key={`rod${y}`} x={110} y={y - 8} width={WIDE - 220} height={16} rx={6} fill="#5b6385" stroke="#8a93b8" strokeWidth={1.5} />);
    if (names > 0) out.push(<Text key="rod-n" x={110} y={rodTop - 26} color={INK2} size={17} anchor="start" opacity={names}>Control rods absorb the other neutrons</Text>);
  }
  const neutron = (key: string, x: number, y: number, opacity = 1) => out.push(<Sphere key={key} x={x} y={y} r={5.5} color={NEUTRON} opacity={opacity} />);
  const comesFrom = (g: number, i: number): [number, number] => (g === 0 ? [40, place(g, i)[1]] : place(g - 1, rods ? 0 : Math.floor(i / 2)));
  if (!rods) {
    out.push(<Sphere key="key-u" x={82} y={top + 32} r={12} color={LIVE} sign="U" />);
    out.push(<Text key="key-un" x={104} y={top + 32} color={INK2} size={17} anchor="start">Uranium-235</Text>);
    neutron('key-n', 246, top + 32);
    out.push(<Text key="key-nn" x={260} y={top + 32} color={INK2} size={17} anchor="start">Neutron</Text>);
  }
  // The path of every neutron that has caused a fission stays, so the branching can be seen.
  gens.forEach((m, g) => {
    for (let i = 0; i < m; i++) {
      const left = g === 0 ? 0 : when(g - 1);
      if (since < left) continue;
      const [[px, py], [x, y]] = [comesFrom(g, i), place(g, i)];
      const k = clamp01((since - left) / (when(g) - left));
      out.push(<line key={`w${g}-${i}`} x1={px} y1={py} x2={mix(px, x, k)} y2={mix(py, y, k)} stroke={NEUTRON} strokeWidth={1.6} opacity={0.32} />);
    }
  });
  gens.forEach((m, g) => {
    for (let i = 0; i < m; i++) {
      const [x, y] = place(g, i);
      const t = since - when(g);
      // The neutron on its way to this nucleus.
      const [px, py] = comesFrom(g, i);
      const left = g === 0 ? 0 : when(g - 1);
      if (since >= left && t < 0) {
        const k = (since - left) / (when(g) - left);
        neutron(`n${g}-${i}`, mix(px, x, k), mix(py, y, k));
      }
      if (t < 0) out.push(<Sphere key={`u${g}-${i}`} x={x} y={y} r={R} color={LIVE} sign="U" />);
      else {
        const e = ease(t / 0.5);
        out.push(<Sphere key={`a${g}-${i}`} x={x - 2} y={y - R * 0.56 * e} r={R * 0.74} color={PIECES[0]} />);
        out.push(<Sphere key={`b${g}-${i}`} x={x + 2} y={y + R * 0.6 * e} r={R * 0.62} color={PIECES[1]} />);
        flash(out, `f${g}-${i}`, x, y, t, 70);
        // With control rods, two of its neutrons end in the rods.
        if (rods)
          for (const rod of [rodTop, rodLow]) {
            const k = clamp01(t / 0.8);
            neutron(`r${g}-${rod}`, mix(x, x + 76, k), mix(y, rod, k), k < 1 ? 1 : clamp01(1 - (t - 0.8) / 0.3));
          }
        // The neutrons of the last fissions fly on.
        if (g === gens.length - 1)
          for (const way of rods ? [0] : [-0.2, 0.2]) neutron(`o${i}-${way}`, x + Math.cos(way) * 130 * t, y + Math.sin(way) * 130 * t, clamp01(1 - t / 1.1));
      }
    }
  });
  if (names > 0) out.push(<Text key="rule" x={70} y={HIGH - 24} color={rods ? TONES.good : TONES.bad} size={19} anchor="start" opacity={names}>{rods ? 'One neutron from each fission causes another: a steady rate' : 'Two neutrons from each fission cause another: the rate doubles'}</Text>);
  if (count > 0) out.push(<Text key="count" x={WIDE - 70} y={HIGH - 24} color={INK} size={20} anchor="end" opacity={count}>{`Fissions so far: ${since < 0 ? 0 : fissionsBy(rods, since)}`}</Text>);
}

/** Hydrogen-2 and hydrogen-3: slow ones are turned back by their repulsion, and fast ones fuse. */
function drawFusion({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, repel, energy] = [part('names'), part('repel'), part('energy')];
  const S = el.scale ?? 34;
  const [cx, cy] = [WIDE / 2, (top + HIGH) / 2];
  const [A, B, He] = [nucleons(1, 1), nucleons(1, 2), nucleons(2, 2)];
  const [FAR, NEAR] = [330, 150];
  const [ra, rb] = [radiusOf(2) * S, radiusOf(3) * S];
  const touch = (ra + rb) / 2;
  const { since, slow } = state;
  // The seconds since the two fused, if they have.
  const f = slow || since < 0 ? -1 : since - MEET;
  let d = FAR;
  if (since >= 0) d = slow ? FAR - (FAR - NEAR) * Math.sin(Math.PI * clamp01(since / (2 * TURN))) : mix(FAR, touch, clamp01(since / MEET));
  const fused = f > 0 ? ease(f / 0.5) : 0;
  const gone = f > 0 ? 1 - Math.exp(-f / 0.9) : 0;
  const [heX, nX] = [cx - 20 - 130 * gone, cx + 60 + 370 * gone];
  const byX = (p: P3, q: P3) => p[0] - q[0];
  const [bn0, bn1] = [...B.neutrons].sort(byX);
  const list: Ball[] = [];
  const add = (key: string, side: number, p: P3, r: number, proton: boolean, slot: P3 | undefined) => {
    const [x, y] = [cx + side * d + p[0] * S, cy - p[1] * S];
    const [tx, ty] = slot ? [heX + slot[0] * S, cy - slot[1] * S] : [nX, cy];
    list.push({ key, x: mix(x, tx, fused), y: mix(y, ty, fused), depth: p[2], r: mix(r, He.ball, fused) * S, proton });
  };
  add('ap', -1, A.protons[0], A.ball, true, He.protons[0]);
  add('an', -1, A.neutrons[0], A.ball, false, He.neutrons[0]);
  add('bp', 1, B.protons[0], B.ball, true, He.protons[1]);
  add('bn0', 1, bn0, B.ball, false, He.neutrons[1]);
  add('bn1', 1, bn1, B.ball, false, undefined);
  balls(out, list);
  flash(out, 'flash', cx, cy, f);
  // The repulsion grows as they come closer.
  if (repel > 0 && since >= 0 && f <= 0) {
    const len = 24 + 80 * Math.min(1.5, (NEAR / d) ** 2);
    out.push(<Arrow key="ra" x={cx - d - ra - 8} y={cy} len={-len} color={TONES.opp} weight={8} opacity={repel} />);
    out.push(<Arrow key="rb" x={cx + d + rb + 8} y={cy} len={len} color={TONES.opp} weight={8} opacity={repel} />);
    out.push(<Text key="r-n" x={cx} y={top + 28} color={TONES.opp} size={19} opacity={repel}>Both are positive: they repel each other</Text>);
  }
  if (names > 0) {
    // The two names fade as the nuclei come close, where they would run into each other.
    const before = names * (1 - fused) * clamp01((d - 150) / 60 + (slow ? 1 : 0));
    out.push(<Text key="a-n" x={cx - d} y={cy - ra - 26} color={INK} size={19} opacity={before}>Hydrogen-2</Text>);
    out.push(<Text key="b-n" x={cx + d} y={cy - rb - 26} color={INK} size={19} opacity={before}>Hydrogen-3</Text>);
    if (f > 0.3) {
      const seen = names * clamp01((f - 0.3) / 0.4);
      out.push(<Text key="he-n" x={heX} y={cy - radiusOf(4) * S - 26} color={INK} size={19} opacity={seen}>Helium-4</Text>);
      out.push(<Text key="n-n" x={nX} y={cy - He.ball * S - 24} color={NEUTRON} size={19} opacity={seen}>Neutron</Text>);
    }
    if (slow && since > TURN) out.push(<Text key="slow" x={cx} y={HIGH - 26} color={TONES.bad} size={20} opacity={names * clamp01((since - TURN) / 0.5)}>Too slow: the repulsion turns them back</Text>);
    if (f > 0 && !(energy > 0)) out.push(<Text key="fast" x={cx} y={HIGH - 26} color={TONES.good} size={20} opacity={names * clamp01(f / 0.5)}>Fast enough to touch: the strong force joins them</Text>);
  }
  if (energy > 0 && f > 0) out.push(<Text key="energy" x={cx} y={HIGH - 26} color={TONES.good} size={21} opacity={energy * clamp01(f / 0.5)}>{`Energy released: ${el.released ?? 17.5} MeV`}</Text>);
}

export function ReactionView({ el, st, w, h, plays, fit }: { el: ReactionEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; fit?: number }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const played = plays ?? st?.plays ?? [];
  const out: ReactElement[] = [];
  const HIGH = fit ?? WIDE * (h / w);
  const across = fit ? (fit * w) / h : WIDE;
  const left = (WIDE - across) / 2;
  if (el.label)
    out.push(
      <text key="label" x={left} y={14} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {el.label}
      </text>,
    );
  const top = el.label ? 30 : 0;
  out.push(<rect key="panel" x={left} y={top} width={across} height={HIGH - top} rx={14} fill="rgb(8 7 28 / 0.55)" stroke="rgb(188 217 255 / 0.25)" strokeWidth={1.5} />);
  const frame: Frame = { out, el, state: reactionAt(el, played), top, HIGH, part: (name) => ownPart(st, name) };
  const picture = el.picture ?? 'weigh';
  if (picture === 'curve') drawCurve(frame);
  else if (picture === 'fission') drawFission(frame);
  else if (picture === 'chain') drawChain(frame);
  else if (picture === 'fusion') drawFusion(frame);
  else drawWeigh(frame);
  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`${left} 0 ${across} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
