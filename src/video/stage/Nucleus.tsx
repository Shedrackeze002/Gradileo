/**
 * The nucleus of an atom (src/video/nucleus.ts works it all out).
 *
 * A nucleus built of protons and neutrons, drawn to scale as a ball of balls, with its symbol and
 * its numbers; two nucleons with the forces between them; and a sample of two isotopes with the
 * average mass of an atom.
 */
import type { ReactElement } from 'react';
import type { NucleusEl } from '../script.ts';
import { averageMass, electricForce, LEAVE, nucleons, nucleusAt, radiusOf, strongShare, type Change, type NucleusState, type P3 } from '../nucleus.ts';
import { chance } from '../matter.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { NEGATIVE, POSITIVE } from './Charges.tsx';
import { Arrow, clamp01, FONT, INK2, Text } from './motionKit.tsx';
import { Packet } from './Photons.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** The size the pictures are designed at; they are scaled to the room they are given. */
const WIDE = 1136;
/** A neutron, and the strong force, in every picture. */
export const NEUTRON = '#9aa3c7';
const STRONG = TONES.good;
/** The newtons that fill the bar of the electric force while it is shown alone, and the newtons that the strong force of two touching nucleons is drawn as. */
const ALONE = 80;
const TOUCH = 1200;

interface Frame {
  out: ReactElement[];
  el: NucleusEl;
  state: NucleusState;
  top: number;
  HIGH: number;
  part: (name: string) => number;
}

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const lerp = (a: P3, b: P3, k: number): P3 => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
const mix = (a: string, b: string, k: number) => `color-mix(in srgb, ${b} ${Math.round(clamp01(k) * 100)}%, ${a})`;

/** One nucleon to draw: where it is in femtometres, how much of a proton it is (0: a neutron, 1: a proton), and how solid. */
interface Ball {
  key: string;
  at: P3;
  proton: number;
  opacity: number;
}

/** A ball lit from the upper left. */
function Sphere({ x, y, r, color, opacity = 1, sign }: { x: number; y: number; r: number; color: string; opacity?: number; sign?: string }) {
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={r} fill={color} stroke="#0d0c24" strokeWidth={Math.max(0.8, r * 0.09)} />
      <circle cx={x - r * 0.3} cy={y - r * 0.32} r={r * 0.42} fill="#fff" opacity={0.28} />
      {sign && r >= 8 && (
        <text x={x} y={y + r * 0.36} textAnchor="middle" fontSize={r * 1.15} fontWeight={700} fill="#fff" opacity={0.92} style={{ fontFamily: FONT }}>
          {sign}
        </text>
      )}
    </g>
  );
}

/** The nucleons that leave in an alpha decay: the two protons and the two neutrons furthest to the right. */
function rightmost(points: P3[], count: number): Set<number> {
  return new Set(
    points
      .map((p, i): [number, number] => [p[0], i])
      .sort((a, b) => b[0] - a[0])
      .slice(0, count)
      .map(([, i]) => i),
  );
}

/** Where every nucleon is part of the way through a change, and the particles that a decay throws out (in femtometres from the centre, with the seconds since the decay began). */
function during(change: Change, gone: number, far: number): Ball[] {
  const [A, B] = [nucleons(change.from.z, change.from.n), nucleons(change.to.z, change.to.n)];
  const k = ease(gone);
  const balls: Ball[] = [];
  // From which side a nucleon arrives, or to which it leaves: the right, fanned out.
  const side = (i: number, salt: number): P3 => {
    const a = (chance(i + 1, salt) - 0.5) * 1.5;
    return [Math.cos(a) * far, Math.sin(a) * far, 0];
  };
  const add = (p: P3, s: P3, way: number): P3 => [p[0] + s[0] * way, p[1] + s[1] * way, p[2]];
  if (change.kind === 'alpha') {
    const [outP, outN] = [rightmost(A.protons, 2), rightmost(A.neutrons, 2)];
    let [ip, inn] = [0, 0];
    A.protons.forEach((p, i) => {
      if (!outP.has(i)) balls.push({ key: `p${i}`, at: lerp(p, B.protons[ip++] ?? p, k), proton: 1, opacity: 1 });
    });
    A.neutrons.forEach((p, i) => {
      if (!outN.has(i)) balls.push({ key: `n${i}`, at: lerp(p, B.neutrons[inn++] ?? p, k), proton: 0, opacity: 1 });
    });
    return balls;
  }
  if (change.kind === 'beta-' || change.kind === 'beta+') {
    const minus = change.kind === 'beta-';
    // The last neutron becomes the last proton (beta-minus), or the last proton the last neutron (beta-plus).
    const turned = clamp01((gone - 0.25) / 0.2);
    const [zKeep, nKeep] = [Math.min(change.from.z, change.to.z), Math.min(change.from.n, change.to.n)];
    for (let i = 0; i < zKeep; i++) balls.push({ key: `p${i}`, at: lerp(A.protons[i], B.protons[i], k), proton: 1, opacity: 1 });
    for (let i = 0; i < nKeep; i++) balls.push({ key: `n${i}`, at: lerp(A.neutrons[i], B.neutrons[i], k), proton: 0, opacity: 1 });
    const [was, will] = minus ? [A.neutrons[change.from.n - 1], B.protons[change.to.z - 1]] : [A.protons[change.from.z - 1], B.neutrons[change.to.n - 1]];
    balls.push({ key: 'turn', at: lerp(was, will, k), proton: minus ? turned : 1 - turned, opacity: 1 });
    return balls;
  }
  if (change.kind === 'gamma') {
    A.protons.forEach((p, i) => balls.push({ key: `p${i}`, at: p, proton: 1, opacity: 1 }));
    A.neutrons.forEach((p, i) => balls.push({ key: `n${i}`, at: p, proton: 0, opacity: 1 }));
    return balls;
  }
  const each = (from: P3[], to: P3[], name: string, proton: number, salt: number) => {
    for (let i = 0; i < Math.max(from.length, to.length); i++) {
      if (i < from.length && i < to.length) balls.push({ key: `${name}${i}`, at: lerp(from[i], to[i], k), proton, opacity: 1 });
      else if (i < to.length) balls.push({ key: `${name}${i}`, at: add(to[i], side(i, salt), 1 - k), proton, opacity: clamp01(k * 2.5) });
      else balls.push({ key: `${name}${i}`, at: add(from[i], side(i, salt), k), proton, opacity: clamp01((1 - k) * 2.5) });
    }
  };
  each(A.protons, B.protons, 'p', 1, 61);
  each(A.neutrons, B.neutrons, 'n', 0, 62);
  return balls;
}

/** A nuclide written out: the mass number above the atomic number, then the symbol. */
function Nuclide({ x, y, a, z, symbol, size, color = INK, opacity = 1 }: { x: number; y: number; a: number; z: number; symbol: string; size: number; color?: string; opacity?: number }) {
  const small = size * 0.46;
  return (
    <g opacity={opacity} style={{ fontFamily: FONT }}>
      <text x={x - 4} y={y - size * 0.42} textAnchor="end" fontSize={small} fontWeight={600} fill={INK2}>
        {a}
      </text>
      <text x={x - 4} y={y + size * 0.1} textAnchor="end" fontSize={small} fontWeight={600} fill={POSITIVE}>
        {z}
      </text>
      <text x={x} y={y} textAnchor="start" fontSize={size} fontWeight={700} fill={color}>
        {symbol}
      </text>
    </g>
  );
}

function drawBuild({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, symbol, counts, radius, ion, repel, glue] = [part('names'), part('symbol'), part('counts'), part('radius'), part('charge'), part('repel'), part('glue')];
  // The pixels to a femtometre: as asked, or fewer when the nucleus would not fit in the picture.
  const S = Math.min(el.scale ?? 16, ((HIGH - top) / 2 - 14) / radiusOf(state.z + state.n));
  // The nucleus is in the middle of the picture until there is something to read beside it.
  const [cx, cy] = [330 + (WIDE / 2 - 330) * (1 - Math.max(symbol, counts, ion)), top + (HIGH - top) / 2];
  const time = state.time;
  const change = state.change;
  const busy = change !== undefined && state.gone < 1;
  const since = change ? time - change.at : Infinity;
  const shown = busy && change ? during(change, state.gone, 300 / S) : undefined;
  const still = nucleons(state.z, state.n);
  const balls: Ball[] = shown ?? [...still.protons.map((p, i): Ball => ({ key: `p${i}`, at: p, proton: 1, opacity: 1 })), ...still.neutrons.map((p, i): Ball => ({ key: `n${i}`, at: p, proton: 0, opacity: 1 }))];
  const ball = busy && change ? nucleons(change.from.z, change.from.n).ball + (still.ball - nucleons(change.from.z, change.from.n).ball) * ease(state.gone) : still.ball;
  // Every nucleon trembles a little, and more in a nucleus that is about to decay or is marked unstable.
  const stirred = change && change.kind !== 'move' && since < change.over ? clamp01(1 - since / (change.over * 0.6)) : 0;
  const tremble = (0.035 + 0.1 * stirred + (state.shaky ? 0.06 : 0)) * ball * 2;
  const place = (b: Ball, i: number): [number, number, number] => {
    const [fx, fy] = [5 + 4 * chance(i + 1, 63), 5 + 4 * chance(i + 1, 64)];
    return [cx + (b.at[0] + tremble * Math.sin(time * fx + i)) * S, cy - (b.at[1] + tremble * Math.cos(time * fy + 2 * i)) * S, b.at[2]];
  };
  const drawn = balls.map((b, i) => ({ b, at: place(b, i) })).sort((p, q) => p.at[2] - q.at[2]);

  // The lines of force on one proton, the one nearest the middle (it is drawn again on top, to be seen): the electric repulsion of every other proton, however far, and the strong attraction of its neighbours alone.
  const front = drawn.filter((d) => d.b.proton > 0.5);
  const chosen = front.length ? front.reduce((best, d) => (Math.hypot(...d.b.at) < Math.hypot(...best.b.at) - 1e-9 ? d : best)) : undefined;
  const near = chosen ? drawn.filter((d) => d !== chosen && Math.hypot(d.b.at[0] - chosen.b.at[0], d.b.at[1] - chosen.b.at[1], d.b.at[2] - chosen.b.at[2]) < ball * 2 * 1.08) : [];
  const others = chosen ? front.filter((d) => d !== chosen) : [];

  for (const d of drawn) out.push(<Sphere key={d.b.key} x={d.at[0]} y={d.at[1]} r={ball * S} color={mix(NEUTRON, POSITIVE, d.b.proton)} opacity={d.b.opacity} sign={d.b.proton > 0.5 ? '+' : undefined} />);
  if (chosen && repel > 0) for (const d of others) out.push(<line key={`rep-${d.b.key}`} x1={chosen.at[0]} y1={chosen.at[1]} x2={d.at[0]} y2={d.at[1]} stroke={TONES.opp} strokeWidth={2.2} opacity={0.85 * repel} />);
  if (chosen && glue > 0) for (const d of near) out.push(<line key={`glue-${d.b.key}`} x1={chosen.at[0]} y1={chosen.at[1]} x2={d.at[0]} y2={d.at[1]} stroke={STRONG} strokeWidth={4.5} strokeLinecap="round" opacity={0.95 * glue} />);
  if (chosen && (repel > 0 || glue > 0)) out.push(<Sphere key="chosen-p" x={chosen.at[0]} y={chosen.at[1]} r={ball * S} color={POSITIVE} opacity={Math.max(repel, glue)} sign="+" />);
  if (chosen && (repel > 0 || glue > 0)) out.push(<circle key="chosen" cx={chosen.at[0]} cy={chosen.at[1]} r={ball * S + 3} fill="none" stroke={INK} strokeWidth={2.4} opacity={Math.max(repel, glue)} />);
  if (chosen && glue > 0) out.push(<Text key="glue-n" x={760} y={cy - 30 + 70 * symbol + 32 * 3 + 14} color={STRONG} size={19} anchor="start" opacity={glue}>{`Held by its ${near.length} neighbours only`}</Text>);
  if (chosen && repel > 0) out.push(<Text key="rep-n" x={760} y={cy - 30 + 70 * symbol + 32 * 4 + 14} color={TONES.opp} size={19} anchor="start" opacity={repel}>{`Repelled by all ${others.length} other protons`}</Text>);

  // What a decay throws out, which flies on after the nucleus has settled.
  if (change && change.kind !== 'move' && since < 6) {
    const edge = radiusOf(change.from.z + change.from.n) * S;
    const start = change.over * 0.3;
    const t = since - start;
    const fade = clamp01((560 - (edge + 150 * Math.max(0, t))) / 80);
    if (change.kind === 'alpha') {
      // The four gather at the edge of the nucleus, and leave together.
      const A = nucleons(change.from.z, change.from.n);
      const [outP, outN] = [rightmost(A.protons, 2), rightmost(A.neutrons, 2)];
      const he = nucleons(2, 2);
      const gather = ease(clamp01(since / start));
      const centre: P3 = [(edge + 6 + 150 * Math.max(0, t)) / S, 0, 0];
      const four: Array<[P3, P3, number]> = [...[...outP].map((i, j): [P3, P3, number] => [A.protons[i], he.protons[j], 1]), ...[...outN].map((i, j): [P3, P3, number] => [A.neutrons[i], he.neutrons[j], 0])];
      four.forEach(([from, slot, proton], j) => {
        const at = lerp(from, [centre[0] + slot[0], centre[1] + slot[1], slot[2]], gather);
        out.push(<Sphere key={`he${j}`} x={cx + at[0] * S} y={cy - at[1] * S} r={ball * S} color={proton ? POSITIVE : NEUTRON} opacity={fade} sign={proton ? '+' : undefined} />);
      });
      if (names > 0 && t > 0.2) out.push(<Text key="he-n" x={cx + centre[0] * S} y={cy - he.ball * S * 2 - 22} color={INK} size={18} opacity={names * fade * clamp01((t - 0.2) / 0.3)}>Alpha particle</Text>);
    } else if (change.kind === 'gamma') {
      if (t > 0) out.push(<Packet key="gamma" at={[cx + edge + 30 + 260 * t, cy]} dir={[1, 0]} nm={0.001} wave={7} opacity={clamp01((560 - (edge + 260 * t)) / 80)} />);
      if (names > 0 && t > 0.2) out.push(<Text key="gamma-n" x={cx + edge + 30 + 260 * t} y={cy - 30} color="#bfe3ff" size={18} opacity={names * clamp01((t - 0.2) / 0.3) * clamp01((560 - (edge + 260 * t)) / 80)}>Gamma ray</Text>);
    } else if (t > 0) {
      const minus = change.kind === 'beta-';
      const B = nucleons(change.to.z, change.to.n);
      const from = minus ? B.protons[change.to.z - 1] : B.neutrons[change.to.n - 1];
      const [x0, y0] = [cx + from[0] * S, cy - from[1] * S];
      const go = (angle: number, speed: number): [number, number] => [x0 + Math.cos(angle) * speed * t, y0 - Math.sin(angle) * speed * t];
      const [bx, by] = go(0.32, 300);
      const [nx, ny] = go(-0.42, 300);
      const seen = (x: number) => clamp01((cx + 560 - x) / 80);
      out.push(<Sphere key="beta" x={bx} y={by} r={7} color={minus ? NEGATIVE : POSITIVE} opacity={seen(bx)} />);
      out.push(<text key="beta-s" x={bx} y={by + 4.5} textAnchor="middle" fontSize={13} fontWeight={700} fill="#fff" opacity={seen(bx)} style={{ fontFamily: FONT }}>{minus ? '−' : '+'}</text>);
      out.push(<circle key="nu" cx={nx} cy={ny} r={3.5} fill={INK2} opacity={0.85 * seen(nx)} />);
      if (names > 0 && t > 0.15) {
        out.push(<Text key="beta-n" x={bx} y={by - 18} color={minus ? NEGATIVE : POSITIVE} size={18} opacity={names * seen(bx + 40)}>{minus ? 'Electron' : 'Positron'}</Text>);
        out.push(<Text key="nu-n" x={nx} y={ny + 24} color={INK2} size={17} opacity={names * seen(nx + 60)}>{minus ? 'Antineutrino' : 'Neutrino'}</Text>);
      }
    }
  }

  // The radius, with a ruler.
  const a = state.z + state.n;
  const r = radiusOf(a);
  if (radius > 0 && !busy) {
    out.push(<circle key="rim" cx={cx} cy={cy} r={r * S} fill="none" stroke={TONES.theta} strokeWidth={1.8} strokeDasharray="5 6" opacity={0.9 * radius} />);
    out.push(<line key="ruler" x1={cx} y1={cy + r * S + 22} x2={cx + r * S} y2={cy + r * S + 22} stroke={TONES.theta} strokeWidth={3} opacity={radius} />);
    for (const x of [cx, cx + r * S]) out.push(<line key={`tick${x}`} x1={x} y1={cy + r * S + 14} x2={x} y2={cy + r * S + 30} stroke={TONES.theta} strokeWidth={3} opacity={radius} />);
    out.push(<Text key="ruler-n" x={cx + (r * S) / 2} y={cy + r * S + 50} color={TONES.theta} size={19} opacity={radius}>{`r = 1.2 fm × ∛${a} = ${r.toFixed(2)} fm`}</Text>);
  }

  // The electrons of the atom or ion, circling on two rings. Those that an ion has lost fly away, and those that it has gained arrive.
  const [has, had] = [state.electrons, state.electronsWere ?? state.electrons];
  const moved = clamp01((time - state.electronsAt) / LEAVE);
  if (ion > 0 && has !== undefined && had !== undefined) {
    const edge = r * S;
    const total = Math.max(has, had);
    for (const ring of [0, 1]) out.push(<circle key={`ring${ring}`} cx={cx} cy={cy} r={edge + 34 + 26 * ring} fill="none" stroke={NEGATIVE} strokeWidth={1.2} opacity={0.28 * ion} />);
    for (let i = 0; i < total; i++) {
      const ring = i % 2;
      const onRing = Math.ceil((total - ring) / 2);
      const angle = ((i - ring) / 2 / onRing) * 2 * Math.PI + (ring ? -0.45 : 0.6) * time;
      const away = i >= has ? ease(moved) : i >= had ? 1 - ease(moved) : 0;
      const far = edge + 34 + 26 * ring + 170 * away;
      out.push(<circle key={`e${i}`} cx={cx + far * Math.cos(angle)} cy={cy - far * Math.sin(angle)} r={5.5} fill={NEGATIVE} stroke="#0d0c24" strokeWidth={1} opacity={ion * (1 - away)} />);
    }
    out.push(<Text key="e-note" x={cx} y={cy + edge + 88} color={NEGATIVE} size={18} opacity={ion}>Electrons, drawn far closer than they are</Text>);
  }

  // The legend, the symbol and the numbers. The numbers change half way through a change.
  if (names > 0) {
    out.push(<Sphere key="lp" x={48} y={top + 34} r={11} color={POSITIVE} opacity={names} sign="+" />);
    out.push(<Text key="lp-n" x={68} y={top + 34} color={INK} size={18} anchor="start" opacity={names}>Proton, charge +e</Text>);
    out.push(<Sphere key="ln" x={48} y={top + 66} r={11} color={NEUTRON} opacity={names} />);
    out.push(<Text key="ln-n" x={68} y={top + 66} color={INK} size={18} anchor="start" opacity={names}>Neutron, no charge</Text>);
  }
  const now = busy && change && state.gone < 0.5 ? change.from : { z: state.z, n: state.n, symbol: state.symbol, name: state.name };
  const tx = 760;
  if (symbol > 0) {
    out.push(<Nuclide key="symbol" x={tx + 70} y={cy - 62 * counts} a={now.z + now.n} z={now.z} symbol={now.symbol} size={84} opacity={symbol} />);
    out.push(<Text key="name" x={tx + 70 + 30} y={cy - 62 * counts + 40} color={INK2} size={20} opacity={symbol}>{`${now.name}-${now.z + now.n}`}</Text>);
  }
  if (counts > 0) {
    const rows: Array<[string, string, string]> = [
      [POSITIVE, 'Protons', `Z = ${now.z}`],
      [NEUTRON, 'Neutrons', `N = ${now.n}`],
      [INK, 'Nucleons', `A = ${now.z + now.n}`],
    ];
    rows.forEach(([color, what, value], i) => {
      const y = cy - 30 + 70 * symbol + 32 * i;
      out.push(<Text key={`c${i}`} x={tx} y={y} color={color} size={20} anchor="start" opacity={counts}>{what}</Text>);
      out.push(<Text key={`v${i}`} x={tx + 120} y={y} color={INK} size={20} anchor="start" opacity={counts}>{value}</Text>);
    });
  }
  if (ion > 0 && has !== undefined && had !== undefined) {
    const electrons = moved < 0.5 ? had : has;
    const q = now.z - electrons;
    const y = cy - 30 + 70 * symbol + 32 * 3 + 10;
    out.push(<Text key="e-n" x={tx} y={y} color={NEGATIVE} size={20} anchor="start" opacity={ion}>Electrons</Text>);
    out.push(<Text key="e-v" x={tx + 120} y={y} color={INK} size={20} anchor="start" opacity={ion}>{`${electrons}`}</Text>);
    out.push(<Text key="q-n" x={tx} y={y + 32} color={TONES.theta} size={20} anchor="start" opacity={ion}>Charge</Text>);
    out.push(<Text key="q-v" x={tx + 120} y={y + 32} color={INK} size={20} anchor="start" opacity={ion}>{q === 0 ? '0 (a neutral atom)' : `${q > 0 ? '+' : '−'}${Math.abs(q) === 1 ? '' : Math.abs(q)}e`}</Text>);
  }
  // An unstable nucleus says so: between its name and its numbers, or above it when it has no name beside it.
  if (state.shaky && !(busy && state.gone < 0.5)) {
    if (symbol > 0 && counts > 0) out.push(<Text key="shaky" x={tx + 100} y={cy + 8} color={TONES.bad} size={19} opacity={Math.min(symbol, counts)}>Unstable: it will decay</Text>);
    else out.push(<Text key="shaky" x={cx} y={Math.max(top + 22, cy - r * S - 22)} color={TONES.bad} size={19}>Unstable: it will decay</Text>);
  }
}

function drawPair({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, electric, strong, distance] = [part('names'), part('electric'), part('strong'), part('distance')];
  const S = el.scale ?? 70;
  const [cx, cy] = [380, top + (HIGH - top) / 2 - 10];
  const kinds = state.kinds;
  const apart = state.apart;
  const [xa, xb] = [cx - (apart * S) / 2, cx + (apart * S) / 2];
  const R = 0.5 * S;
  const both = kinds === 'pp';
  const F = electricForce(apart);
  const pull = strongShare(apart);
  const colours = [kinds[0] === 'p' ? POSITIVE : NEUTRON, kinds[1] === 'p' ? POSITIVE : NEUTRON];
  // The electric force is drawn large while it is alone. Once the strong force is shown, both are on one scale, on which the strong force of two nucleons that touch is taken as 1200 N: far more than the repulsion (it has no number in the picture).
  const zoom = 1 - (1 - ALONE / TOUCH) * strong;

  // The strong attraction: a band between the two, which thins and breaks as they move apart.
  if (strong > 0 && pull > 0.01) {
    out.push(<line key="band" x1={xa} y1={cy} x2={xb} y2={cy} stroke={STRONG} strokeWidth={4 + 30 * pull} strokeLinecap="round" opacity={0.3 + 0.5 * pull} style={{ filter: `drop-shadow(0 0 8px ${STRONG})` }} />);
    // The pull on each nucleon, one above and one below, so that the two arrows can pass each other.
    const len = 14 + 110 * pull;
    out.push(<Arrow key="sa" x={xa} y={cy - R - 18} len={len} color={STRONG} weight={7} opacity={strong * clamp01(pull * 6)} />);
    out.push(<Arrow key="sb" x={xb} y={cy + R + 18} len={-len} color={STRONG} weight={7} opacity={strong * clamp01(pull * 6)} />);
  }
  out.push(<Sphere key="a" x={xa} y={cy} r={R} color={colours[0]} sign={kinds[0] === 'p' ? '+' : undefined} />);
  out.push(<Sphere key="b" x={xb} y={cy} r={R} color={colours[1]} sign={kinds[1] === 'p' ? '+' : undefined} />);
  // The electric repulsion of two protons, from Coulomb's law.
  if (electric > 0 && both) {
    const len = Math.min(150, 12 + (F / ALONE) * 130 * zoom);
    out.push(<Arrow key="ea" x={xa - R - 6} y={cy} len={-len} color={TONES.opp} weight={8} opacity={electric} />);
    out.push(<Arrow key="eb" x={xb + R + 6} y={cy} len={len} color={TONES.opp} weight={8} opacity={electric} />);
  }
  if (distance > 0) {
    const y = cy + R + 44;
    out.push(<line key="d" x1={xa} y1={y} x2={xb} y2={y} stroke={INK2} strokeWidth={2.4} opacity={distance} />);
    for (const x of [xa, xb]) out.push(<line key={`dt${x > cx}`} x1={x} y1={y - 8} x2={x} y2={y + 8} stroke={INK2} strokeWidth={2.4} opacity={distance} />);
    out.push(<Text key="d-n" x={cx} y={y + 26} color={INK} size={20} opacity={distance}>{`${apart.toFixed(1)} fm apart`}</Text>);
  }
  if (names > 0) {
    // The two names keep clear of each other when the nucleons touch.
    out.push(<Text key="a-n" x={Math.min(xa, cx - 48)} y={cy - R - 46} color={colours[0]} size={19} opacity={names}>{kinds[0] === 'p' ? 'Proton' : 'Neutron'}</Text>);
    out.push(<Text key="b-n" x={Math.max(xb, cx + 48)} y={cy - R - 46} color={colours[1]} size={19} opacity={names}>{kinds[1] === 'p' ? 'Proton' : 'Neutron'}</Text>);
  }

  // The two forces as bars. The strong force has no number here: its bar is on a scale of its own.
  const [bx, bw] = [760, 300];
  const by = top + (HIGH - top) / 2 - 62;
  if (electric > 0) {
    out.push(<Text key="e-n" x={bx} y={by} color={TONES.opp} size={19} anchor="start" opacity={electric}>Electric repulsion</Text>);
    out.push(<rect key="e-b0" x={bx} y={by + 14} width={bw} height={16} rx={8} fill="rgb(255 255 255 / 0.08)" opacity={electric} />);
    if (both) out.push(<rect key="e-b" x={bx} y={by + 14} width={Math.max(4, Math.min(bw, (F / ALONE) * zoom * bw))} height={16} rx={8} fill={TONES.opp} opacity={electric} />);
    out.push(<Text key="e-v" x={bx} y={by + 52} color={INK} size={19} anchor="start" opacity={electric}>{both ? `F = ke² ÷ r² = ${F >= 100 ? F.toFixed(0) : F >= 10 ? F.toFixed(1) : F.toFixed(2)} N` : 'None: a neutron has no charge'}</Text>);
  }
  if (strong > 0) {
    const y = by + 96;
    out.push(<Text key="s-n" x={bx} y={y} color={STRONG} size={19} anchor="start" opacity={strong}>Strong attraction</Text>);
    out.push(<rect key="s-b0" x={bx} y={y + 14} width={bw} height={16} rx={8} fill="rgb(255 255 255 / 0.08)" opacity={strong} />);
    if (pull > 0.004) out.push(<rect key="s-b" x={bx} y={y + 14} width={Math.max(4, pull * bw)} height={16} rx={8} fill={STRONG} opacity={strong} />);
    out.push(<Text key="s-v" x={bx} y={y + 52} color={INK} size={19} anchor="start" opacity={strong}>{pull > 0.6 ? 'Far stronger: they almost touch' : pull <= 0.004 ? 'Nothing: out of range' : pull * TOUCH > (both ? F : 0) ? 'Fading fast' : 'Weaker than the repulsion now'}</Text>);
  }
}

function drawMix({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, share, average] = [part('names'), part('share'), part('average')];
  const masses = el.masses ?? [35, 37];
  const name = el.name ?? 'Chlorine';
  const first = Math.round(state.share * 100);
  const colours = [TONES.adj, TONES.opp];
  // A hundred atoms, ten by ten; which are the first isotope is settled by a number of their own, so the same atoms change as the share does.
  const [gx, gy, step] = [70, top + (HIGH - top) / 2 - 4.5 * 30, 30];
  const order = Array.from({ length: 100 }, (_, i) => i).sort((p, q) => chance(p + 1, 65) - chance(q + 1, 65));
  const rank = new Map(order.map((i, k) => [i, k]));
  for (let i = 0; i < 100; i++) {
    const isFirst = (rank.get(i) ?? 0) < first;
    const [x, y] = [gx + (i % 10) * step + 2.2 * Math.sin(state.time * (2 + chance(i + 1, 66)) + i), gy + Math.floor(i / 10) * step + 2.2 * Math.cos(state.time * (2 + chance(i + 1, 67)) + 2 * i)];
    out.push(<circle key={`a${i}`} cx={x} cy={y} r={isFirst ? 9 : 11} fill={colours[isFirst ? 0 : 1]} stroke="#0d0c24" strokeWidth={1.2} />);
  }
  if (names > 0) out.push(<Text key="sample" x={gx + 4.5 * step} y={gy - 30} color={INK2} size={18} opacity={names}>{`100 atoms of ${name.toLowerCase()}`}</Text>);
  const tx = 470;
  if (share > 0) {
    [0, 1].forEach((k) => {
      const y = top + 60 + 34 * k;
      out.push(<circle key={`k${k}`} cx={tx + 10} cy={y} r={k === 0 ? 9 : 11} fill={colours[k]} opacity={share} />);
      out.push(<Text key={`kn${k}`} x={tx + 32} y={y} color={colours[k]} size={20} anchor="start" opacity={share}>{`${name}-${masses[k]}: ${((k === 0 ? state.share : 1 - state.share) * 100).toFixed(1)}% of the atoms`}</Text>);
    });
  }
  // A beam with the two isotopes at their masses: it balances at the average mass.
  if (average > 0) {
    const [x0, x1] = [tx + 40, WIDE - 90];
    const y = top + (HIGH - top) / 2 + 70;
    const xOf = (m: number) => x0 + ((m - masses[0]) / (masses[1] - masses[0])) * (x1 - x0);
    const mean = averageMass(masses, state.share);
    out.push(<line key="beam" x1={x0 - 20} y1={y} x2={x1 + 20} y2={y} stroke={INK2} strokeWidth={5} strokeLinecap="round" opacity={average} />);
    [0, 1].forEach((k) => {
      const part = k === 0 ? state.share : 1 - state.share;
      const h = 14 + 130 * part;
      out.push(<rect key={`w${k}`} x={xOf(masses[k]) - 26} y={y - 4 - h} width={52} height={h} rx={8} fill={colours[k]} opacity={0.9 * average} />);
      out.push(<Text key={`wm${k}`} x={xOf(masses[k])} y={y + 26} color={colours[k]} size={19} opacity={average}>{`${masses[k]} u`}</Text>);
    });
    out.push(<polygon key="pivot" points={`${xOf(mean)},${y + 5} ${xOf(mean) - 16},${y + 34} ${xOf(mean) + 16},${y + 34}`} fill={TONES.theta} opacity={average} />);
    out.push(<Text key="mean" x={xOf(mean)} y={y + 58} color={TONES.theta} size={20} opacity={average}>{`Average: ${mean.toFixed(2)} u`}</Text>);
    out.push(<Text key="sum" x={(x0 + x1) / 2} y={HIGH - 30} color={INK} size={19} opacity={average}>{`${state.share.toFixed(3)} × ${masses[0]} + ${(1 - state.share).toFixed(3)} × ${masses[1]} = ${mean.toFixed(2)} u`}</Text>);
  }
}

export function NucleusView({ el, st, w, h, plays, fit }: { el: NucleusEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; fit?: number }) {
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
  const frame: Frame = { out, el, state: nucleusAt(el, played), top, HIGH, part: (name) => ownPart(st, name) };
  if (el.picture === 'pair') drawPair(frame);
  else if (el.picture === 'mix') drawMix(frame);
  else drawBuild(frame);
  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`${left} 0 ${across} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
