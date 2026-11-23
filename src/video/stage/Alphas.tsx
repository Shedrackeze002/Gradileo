/**
 * Alpha particles fired at atoms (src/video/alphas.ts works it all out).
 *
 * A pudding: Thomson's atom, a ball of positive charge with electrons dotted through it. A beam
 * of alpha particles crosses it in straight lines.
 *
 * A ring: the experiment from above. Alpha particles leave a source, meet a gold foil, and land
 * on a screen all round it, which flashes and keeps a mark where each one lands.
 *
 * Past: one nucleus, to scale, and the paths of alpha particles aimed to miss it by a little or
 * by a lot.
 *
 * Head: one alpha particle heads straight for a nucleus, slows, stops and is pushed back, with
 * its energies, its distance from the centre of the nucleus and the force on it.
 *
 * Orbit: Rutherford's atom, a small nucleus with electrons that circle it, which can radiate and
 * spiral in.
 */
import type { ReactElement } from 'react';
import type { AlphasEl } from '../script.ts';
import { FM, NUCLEUS_FM, alphasAt, closest, fallRadius, fallTurn, forceAt, kindOf, pathPast, ringAngle, turned, whereAt, type AlphasState, type Step } from '../alphas.ts';
import { chance } from '../matter.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { NEGATIVE, POSITIVE } from './Charges.tsx';
import { Value } from './Light.tsx';
import { Arrow, clamp01, FONT, INK2, Text, VELOCITY } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** The size the pictures are designed at; they are scaled to the room they are given. */
const WIDE = 1136;
const ALPHA = TONES.theta;
const PUSH = TONES.opp;
const GLOW = TONES.good;
const GOLD = '#E8C55A';
const DEG = Math.PI / 180;

type P = [number, number];

interface Frame {
  out: ReactElement[];
  el: AlphasEl;
  state: AlphasState;
  top: number;
  HIGH: number;
  part: (name: string) => number;
}

/** An alpha particle: a small bright ball. */
const Ball = ({ x, y, r = 7, opacity = 1 }: { x: number; y: number; r?: number; opacity?: number }) => <circle cx={x} cy={y} r={r} fill={ALPHA} stroke="#0d0c24" strokeWidth={1.4} opacity={opacity} style={{ filter: `drop-shadow(0 0 5px ${ALPHA})` }} />;

/** A source of alpha particles: a block with a channel that opens to the right. */
function Source({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 62} y={y - 34} width={62} height={68} rx={8} fill="#2b2860" stroke={INK3} strokeWidth={2} />
      <rect x={x - 30} y={y - 6} width={30} height={12} fill="#0d0c24" />
      <circle cx={x - 38} cy={y} r={9} fill={ALPHA} opacity={0.9} />
    </g>
  );
}

/** The paths of a picture are worked out once for each aim, energy and reach. */
const PATHS = new Map<string, Step[]>();
function pathOf(miss: number, d: number, reach: number): Step[] {
  const key = `${miss}:${d.toFixed(4)}:${reach.toFixed(1)}`;
  let steps = PATHS.get(key);
  if (!steps) {
    steps = pathPast(miss, d, reach);
    if (PATHS.size > 400) PATHS.clear();
    PATHS.set(key, steps);
  }
  return steps;
}

function drawPudding({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, paths, count] = [part('names'), part('paths'), part('count')];
  const fired = el.rate !== undefined;
  const cy = top + (HIGH - top) / 2 - (names > 0 ? 22 : 0);
  const cx = WIDE / 2;
  const R = Math.min(150, (HIGH - top) / 2 - 62);
  // The ball of positive charge, with faint plus signs all through it.
  const plus: ReactElement[] = [];
  for (let i = 1; i <= 16; i++) {
    const [a, r] = [chance(i, 61) * 2 * Math.PI, Math.sqrt(chance(i, 62)) * R * 0.86];
    const [x, y] = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    plus.push(<path key={i} d={`M ${x - 6} ${y} h 12 M ${x} ${y - 6} v 12`} stroke={POSITIVE} strokeWidth={2.4} strokeLinecap="round" opacity={0.55} />);
  }
  out.push(
    <g key="ball">
      <circle cx={cx} cy={cy} r={R} fill={POSITIVE} fillOpacity={0.16} stroke={POSITIVE} strokeOpacity={0.6} strokeWidth={2} />
      {plus}
    </g>,
  );
  // The electrons, dotted through it, each stirring a little about its place.
  const electrons: ReactElement[] = [];
  for (let i = 1; i <= 12; i++) {
    const [a, r] = [(i / 12) * 2 * Math.PI + chance(i, 63), (0.28 + 0.56 * chance(i, 64)) * R];
    const [x, y] = [cx + r * Math.cos(a) + 3 * Math.sin(state.time * 2.3 + i), cy + r * Math.sin(a) + 3 * Math.cos(state.time * 1.9 + 2 * i)];
    electrons.push(
      <g key={i}>
        <circle cx={x} cy={y} r={8} fill={NEGATIVE} stroke="#0d0c24" strokeWidth={1.4} />
        <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
      </g>,
    );
  }
  out.push(<g key="electrons">{electrons}</g>);
  // The alpha particles: each crosses in a straight line, since nowhere is the field strong enough to turn it.
  let through = 0;
  if (fired) {
    // A broad beam comes in from the left, each particle at its own height, and all of them meet the atom.
    const x0 = 16;
    const [tracks, balls]: [string[], ReactElement[]] = [[], []];
    for (const shot of state.sent.slice(-36)) {
      const y = cy + (chance(shot.n, 51) * 2 - 1) * R * 0.9;
      const x = x0 + (state.time - shot.at) * 430;
      if (x > cx + R) through++;
      const end = Math.min(x, WIDE - 16);
      tracks.push(`M ${x0} ${y.toFixed(1)} H ${end.toFixed(1)}`);
      if (x < WIDE - 16) balls.push(<Ball key={shot.n} x={x} y={y} />);
    }
    through += Math.max(0, state.sent.length - 36);
    if (paths > 0) out.push(<path key="tracks" d={tracks.join(' ')} fill="none" stroke={ALPHA} strokeWidth={1.8} opacity={0.34 * paths} />);
    out.push(<g key="alphas">{balls}</g>);
  }
  if (names > 0) {
    out.push(<Text key="n-ball" x={cx} y={cy + R + 30} color={POSITIVE} size={20} opacity={names}>Positive charge, spread through the whole atom</Text>);
    out.push(<Text key="n-electrons" x={cx} y={cy + R + 58} color={NEGATIVE} size={20} opacity={names}>Electrons, dotted through it</Text>);
    if (fired) out.push(<Text key="n-alpha" x={36} y={top + 34} color={ALPHA} size={20} anchor="start" opacity={names}>Alpha particles, +2e</Text>);
  }
  if (count > 0) out.push(<Text key="count" x={WIDE - 40} y={top + 34} color={INK} size={21} anchor="end" opacity={count}>{`Straight through: ${through}`}</Text>);
}

function drawRing({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, count] = [part('names'), part('count')];
  const cy = top + (HIGH - top) / 2 - (names > 0 ? 12 : 0);
  const R = Math.min(178, (HIGH - top) / 2 - 44);
  // The ring sits in the middle, and moves to the left to make room for the counts.
  const cx = WIDE / 2 + 60 - (WIDE / 2 - 420) * count;
  const sx = cx - R - 120;
  const PACE = 520;
  const on = (degrees: number, far: number): P => [cx + far * Math.cos(degrees * DEG), cy - far * Math.sin(degrees * DEG)];
  // The screen: a ring with a gap where the beam comes in.
  const [a0, a1] = [on(168, R), on(-168, R)];
  out.push(<path key="screen" d={`M ${a0[0].toFixed(1)} ${a0[1].toFixed(1)} A ${R} ${R} 0 1 1 ${a1[0].toFixed(1)} ${a1[1].toFixed(1)}`} fill="none" stroke={GLOW} strokeWidth={7} strokeLinecap="round" opacity={0.28} />);
  out.push(<Source key="source" x={sx} y={cy} />);
  out.push(<line key="foil" x1={cx} y1={cy - 38} x2={cx} y2={cy + 38} stroke={GOLD} strokeWidth={4.5} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 5px ${GOLD})` }} />);
  const tally = { through: 0, aside: 0, back: 0 };
  const [marks, flying]: [ReactElement[], ReactElement[]] = [[], []];
  const [t1, t2] = [(cx - sx) / PACE, R / PACE];
  for (const shot of state.sent) {
    const age = state.time - shot.at;
    const angle = Math.max(-166, Math.min(166, ringAngle(shot.n, el.back)));
    const kind = kindOf(angle);
    if (age < t1) flying.push(<Ball key={shot.n} x={sx + age * PACE} y={cy} r={6} />);
    else if (age < t1 + t2) {
      const [x, y] = on(angle, (age - t1) * PACE);
      flying.push(<Ball key={shot.n} x={x} y={y} r={6} />);
    } else {
      tally[kind]++;
      const [x, y] = on(angle, R);
      const since = age - t1 - t2;
      marks.push(<circle key={shot.n} cx={x} cy={y} r={kind === 'back' ? 4.6 : 2.8} fill={kind === 'back' ? TONES.hyp : GLOW} opacity={0.85} />);
      if (since < 0.5) marks.push(<circle key={`f${shot.n}`} cx={x} cy={y} r={5 + 22 * (since / 0.5)} fill="none" stroke={kind === 'back' ? TONES.hyp : GLOW} strokeWidth={2.5} opacity={1 - since / 0.5} />);
    }
  }
  out.push(<g key="marks">{marks}</g>);
  out.push(<g key="flying">{flying}</g>);
  if (names > 0) {
    out.push(<Text key="n-source" x={sx - 30} y={cy - 54} color={INK2} size={19} opacity={names}>Alpha source</Text>);
    out.push(<Text key="n-foil" x={cx + 14} y={cy + 56} color={GOLD} size={19} anchor="start" opacity={names}>Gold foil</Text>);
    out.push(<Text key="n-screen" x={cx} y={cy + R + 30} color={GLOW} size={19} opacity={names}>A screen that flashes where an alpha particle lands</Text>);
  }
  if (count > 0) {
    const x = cx + R + 70;
    out.push(<Text key="c-through" x={x} y={cy - 44} color={INK} size={21} anchor="start" opacity={count}>{`Straight through: ${tally.through}`}</Text>);
    out.push(<Text key="c-aside" x={x} y={cy} color={ALPHA} size={21} anchor="start" opacity={count}>{`Turned a little: ${tally.aside}`}</Text>);
    out.push(<Text key="c-back" x={x} y={cy + 44} color={TONES.hyp} size={21} anchor="start" opacity={count}>{`Turned back: ${tally.back}`}</Text>);
  }
}

function drawPast({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, angle, scalePart] = [part('names'), part('angle'), part('scale')];
  const S = WIDE / (el.span ?? 1000);
  const [nx, cy] = [WIDE * 0.56, top + (HIGH - top) / 2];
  const reach = (Math.max(nx, WIDE - nx) + 30) / S;
  const perSecond = (2 * reach) / (el.cross ?? 3.2);
  const clip = `alphas-past-${el.id}`;
  const [trails, balls, tags]: [ReactElement[], ReactElement[], ReactElement[]] = [[], [], []];
  for (const shot of state.sent) {
    const d = closest(shot.z, shot.mev) / FM;
    const steps = pathOf(shot.miss, d, reach);
    const { at, index, done } = whereAt(steps, (state.time - shot.at) * perSecond);
    const every = Math.max(1, Math.floor(index / 260));
    const pts: string[] = [];
    for (let i = 0; i <= index; i += every) pts.push(`${(nx + steps[i][0] * S).toFixed(1)},${(cy - steps[i][1] * S).toFixed(1)}`);
    pts.push(`${(nx + at[0] * S).toFixed(1)},${(cy - at[1] * S).toFixed(1)}`);
    trails.push(<polyline key={shot.n} points={pts.join(' ')} fill="none" stroke={ALPHA} strokeWidth={2.6} strokeLinejoin="round" opacity={done ? 0.6 : 0.8} />);
    if (!done) balls.push(<Ball key={shot.n} x={nx + at[0] * S} y={cy - at[1] * S} />);
    else if (angle > 0) {
      // The angle it was turned through, written beside its path where that leaves the picture.
      const on = (i: number): P => [nx + steps[i][0] * S, cy - steps[i][1] * S];
      let last = 1;
      for (let i = 1; i < steps.length; i++) {
        const [px, py] = on(i);
        if (px > 40 && px < WIDE - 40 && py > top + 34 && py < HIGH - 34) last = i;
      }
      const [[px, py], [qx, qy]] = [on(last), on(last - 1)];
      const [right, down] = [px >= qx, py >= qy];
      const edge = Math.min(py - top, HIGH - py) < Math.min(px, WIDE - px);
      const turn = Math.round(turned(shot.miss, d));
      // Beside the top or the bottom edge it goes on the side the particle is heading for; beside the right edge, above or below the path, away from where it came from; and beside the left edge, on the other side, clear of the paths that come in.
      const [x, y] = edge ? [px + (right ? 20 : -20), py + (down ? 8 : 4)] : [px, py + (down === right ? 26 : -16)];
      tags.push(<Text key={shot.n} x={x} y={y} color={ALPHA} size={19} anchor={edge ? (right ? 'start' : 'end') : right ? 'end' : 'start'} opacity={angle}>{`${turn}°`}</Text>);
    }
  }
  out.push(
    <g key="paths">
      <clipPath id={clip}>
        <rect x={4} y={top + 4} width={WIDE - 8} height={HIGH - top - 8} />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        {trails}
        {balls}
      </g>
    </g>,
  );
  out.push(...tags);
  // The nucleus, to the same scale as the paths.
  const r = Math.max(5, NUCLEUS_FM * S);
  out.push(<circle key="nucleus" cx={nx} cy={cy} r={r} fill={POSITIVE} stroke="#0d0c24" strokeWidth={1.4} style={{ filter: `drop-shadow(0 0 8px ${POSITIVE})` }} />);
  if (names > 0) {
    out.push(<Text key="n-nucleus" x={nx + r + 12} y={cy + r + 16} color={POSITIVE} size={19} anchor="start" opacity={names}>{`${state.name} nucleus, +${state.z}e`}</Text>);
    out.push(<Text key="n-alpha" x={34} y={top + 30} color={ALPHA} size={19} anchor="start" opacity={names}>Alpha particles, +2e</Text>);
  }
  if (scalePart > 0) {
    const [x, y, long] = [40, HIGH - 34, 100 * S];
    out.push(
      <g key="ruler" opacity={scalePart}>
        <path d={`M ${x} ${y} h ${long} M ${x} ${y - 7} v 14 M ${x + long} ${y - 7} v 14`} stroke={INK2} strokeWidth={2.4} fill="none" />
      </g>,
    );
    out.push(<Value key="ruler-n" x={x + long + 14} y={y} pre="" n={1e-13} unit="m" figures={1} color={INK2} anchor="start" size={19} opacity={scalePart} />);
  }
}

function drawHead({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, energy, distance, force, values] = [part('names'), part('energy'), part('distance'), part('force'), part('values')];
  const S = el.scale ?? 2;
  const [nx, cy] = [WIDE - 250, top + (HIGH - top) * 0.6];
  const start = (nx - 70) / S;
  const perSecond = el.pace ?? 130;
  const shot = state.sent[state.sent.length - 1];
  const [mev, z] = [shot?.mev ?? state.mev, shot?.z ?? state.z];
  const d = closest(z, mev) / FM;
  const steps = pathOf(0, d, start);
  // An alpha particle with more energy is faster: its speed goes as the square root of its kinetic energy.
  const where = shot ? whereAt(steps, (state.time - shot.at) * perSecond * Math.sqrt(mev / (el.mev ?? 5))) : { at: [-start, 0] as P, index: 0, done: false };
  // Its distance from the centre of the nucleus, in femtometres, and its speed as a share of the speed far away.
  const r = Math.max(d, -where.at[0]);
  const share = Math.sqrt(Math.max(0, 1 - d / r));
  const turnedBack = shot !== undefined && (where.done || (where.index > 2 && steps[where.index][0] < steps[where.index - 1][0]));
  const ax = nx - r * S;
  const most = Math.max(el.mev ?? 5, ...Object.values(el.clips).flatMap((clip) => clip.phases.map((ph) => ph.mev ?? 0)));

  out.push(<line key="axis" x1={40} y1={cy} x2={nx} y2={cy} stroke={INK3} strokeWidth={1.5} strokeDasharray="4 8" />);
  const nr = Math.max(8, NUCLEUS_FM * S);
  out.push(<circle key="nucleus" cx={nx} cy={cy} r={nr} fill={POSITIVE} stroke="#0d0c24" strokeWidth={1.4} style={{ filter: `drop-shadow(0 0 9px ${POSITIVE})` }} />);

  // Where the alpha particles before this one stopped, each marked with its energy.
  if (distance > 0) {
    const seen = new Set<string>([`${mev.toFixed(2)}:${z}`]);
    for (const old of state.sent.slice(0, -1)) {
      const key = `${old.mev.toFixed(2)}:${old.z}`;
      if (seen.has(key) || old.z !== z) continue;
      seen.add(key);
      const x = nx - (closest(old.z, old.mev) / FM) * S;
      // One that stopped almost where this one will is left out, so that the two labels do not collide.
      if (Math.abs(x - (nx - d * S)) < 60) continue;
      out.push(<line key={`was${key}`} x1={x} y1={cy - 68} x2={x} y2={cy + 44} stroke={INK2} strokeWidth={2} strokeDasharray="5 6" opacity={0.6 * distance} />);
      out.push(<Text key={`was-n${key}`} x={x} y={cy - 82} color={INK2} size={17} opacity={distance}>{`${old.mev.toFixed(1)} MeV`}</Text>);
    }
  }
  // Where it stopped: the distance of closest approach, which stays marked.
  if (distance > 0 && turnedBack) {
    const x = nx - d * S;
    out.push(<line key="closest" x1={x} y1={cy - 44} x2={x} y2={cy + 44} stroke={ALPHA} strokeWidth={2} strokeDasharray="5 6" opacity={0.8 * distance} />);
    out.push(<Text key="closest-n" x={x + 8} y={cy - 58} color={ALPHA} size={18} anchor="start" opacity={distance}>Closest approach</Text>);
  }
  if (distance > 0) {
    const y = cy + 62;
    out.push(<path key="span" d={`M ${ax} ${y} H ${nx} M ${ax} ${y - 8} v 16 M ${nx} ${y - 8} v 16`} stroke={INK2} strokeWidth={2.2} fill="none" opacity={distance} />);
    out.push(<Value key="span-n" x={Math.min((ax + nx) / 2, nx - 150)} y={y + 26} pre="r = " n={r * FM} unit="m" color={INK} opacity={distance} />);
  }
  if (force > 0) {
    const newtons = forceAt(z, r * FM);
    const len = Math.min(170, newtons * (el.forceScale ?? 5));
    out.push(<Arrow key="force" x={ax - 12} y={cy} len={-len} color={PUSH} weight={8} opacity={force} />);
    out.push(<Text key="force-n" x={ax - 16} y={cy + 30} color={PUSH} size={19} anchor="end" opacity={force}>{`F = ${newtons < 0.995 ? newtons.toFixed(2) : newtons.toPrecision(3)} N`}</Text>);
  }
  if (shot && !where.done && share > 0.03) out.push(<Arrow key="velocity" x={ax + (turnedBack ? -12 : 12)} y={cy - 26} len={(turnedBack ? -1 : 1) * 70 * share} color={VELOCITY} weight={6} />);
  out.push(<Ball key="alpha" x={ax} y={cy} r={10} />);

  if (names > 0) {
    // The name trails behind the particle, clear of the mark of its closest approach.
    out.push(<Text key="n-alpha" x={Math.max(ax - 8, 222)} y={cy - 52} color={ALPHA} size={19} anchor="end" opacity={names}>Alpha particle, +2e</Text>);
    out.push(<Text key="n-nucleus" x={nx} y={cy + nr + 24} color={POSITIVE} size={19} opacity={names}>{`${state.name} nucleus, +${z}e`}</Text>);
  }
  if (energy > 0) {
    const [x, y, wide] = [56, top + 44, 320];
    const rows: Array<[string, number, string]> = [
      ['Kinetic energy', mev * (1 - d / r), VELOCITY],
      ['Electric potential energy', (mev * d) / r, PUSH],
    ];
    rows.forEach(([name, value, color], i) => {
      const ry = y + i * 54;
      out.push(
        <g key={`bar${i}`} opacity={energy}>
          <rect x={x} y={ry} width={wide} height={16} rx={8} fill="rgb(255 255 255 / 0.08)" />
          <rect x={x} y={ry} width={Math.max(0, (wide * value) / most)} height={16} rx={8} fill={color} />
        </g>,
      );
      out.push(<Text key={`bar-n${i}`} x={x} y={ry - 16} color={color} size={18} anchor="start" opacity={energy}>{`${name}: ${Math.max(0, value).toFixed(2)} MeV`}</Text>);
    });
  }
  if (values > 0) {
    out.push(<Text key="v-e" x={WIDE - 40} y={top + 34} color={ALPHA} size={20} anchor="end" opacity={values}>{`Alpha particle: ${mev.toFixed(1)} MeV`}</Text>);
    out.push(<Text key="v-z" x={WIDE - 40} y={top + 64} color={POSITIVE} size={20} anchor="end" opacity={values}>{`${state.name} nucleus: ${z} protons`}</Text>);
  }
}

function drawOrbit({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, waves] = [part('names'), part('waves')];
  const [cx, cy] = [WIDE / 2, top + (HIGH - top) / 2 - (names > 0 ? 28 : 0)];
  const R = Math.min(170, (HIGH - top) / 2 - 76, WIDE / 2 - 60);
  const count = el.electrons ?? 1;
  const nr = 9;
  const far = fallRadius(state.fall);
  // The waves an accelerating charge gives out: rings that spread from the atom, and fade.
  if (waves > 0 && state.fall < 1) {
    const rings: ReactElement[] = [];
    const [every, pace, reach] = [0.5, 110, 230];
    for (let k = 0; k * every * pace < reach; k++) {
      const age = (state.time % every) + k * every;
      const r = R * far + 14 + age * pace;
      rings.push(<circle key={k} cx={cx} cy={cy} r={r} fill="none" stroke={GLOW} strokeWidth={2.4} opacity={0.6 * waves * clamp01(1 - (age * pace) / reach)} />);
    }
    out.push(
      <g key="waves">
        <clipPath id={`alphas-waves-${el.id}`}>
          <rect x={4} y={top + 4} width={WIDE - 8} height={HIGH - top - 8} />
        </clipPath>
        <g clipPath={`url(#alphas-waves-${el.id})`}>{rings}</g>
      </g>,
    );
  }
  out.push(<circle key="nucleus" cx={cx} cy={cy} r={nr} fill={POSITIVE} stroke="#0d0c24" strokeWidth={1.4} style={{ filter: `drop-shadow(0 0 9px ${POSITIVE})` }} />);
  const electrons: ReactElement[] = [];
  for (let i = 0; i < count; i++) {
    // Each electron further in circles faster, as a planet nearer the Sun does.
    const share = 1 - 0.27 * i;
    const start = (i * 2 * Math.PI) / count + i * 0.9;
    const angleAt = (fall: number, turn: number) => start + (fall > 0 ? state.fallFrom + fallTurn(fall, state.fallDur) : turn) / Math.pow(share, 1.5);
    const r = R * share * far;
    if (state.fall === 0) electrons.push(<circle key={`o${i}`} cx={cx} cy={cy} r={r} fill="none" stroke={INK3} strokeWidth={1.5} strokeDasharray="4 8" />);
    else {
      // The path of its fall so far, in even steps of the angle it has turned through (which goes as 1 − √(1 − fall)).
      const pts: string[] = [];
      const most = 1 - Math.sqrt(1 - state.fall);
      for (let j = 0; j <= 420; j++) {
        const f = 1 - (1 - (most * j) / 420) ** 2;
        const [a, d] = [angleAt(f, 0), R * share * fallRadius(f)];
        pts.push(`${(cx + d * Math.cos(a)).toFixed(1)},${(cy - d * Math.sin(a)).toFixed(1)}`);
      }
      electrons.push(<polyline key={`o${i}`} points={pts.join(' ')} fill="none" stroke={NEGATIVE} strokeWidth={1.8} opacity={0.5} />);
    }
    if (state.fall < 1) {
      const a = angleAt(state.fall, state.turn);
      const [x, y] = [cx + r * Math.cos(a), cy - r * Math.sin(a)];
      electrons.push(
        <g key={`e${i}`}>
          <circle cx={x} cy={y} r={8} fill={NEGATIVE} stroke="#0d0c24" strokeWidth={1.4} />
          <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
        </g>,
      );
    }
  }
  out.push(<g key="electrons">{electrons}</g>);
  if (names > 0) {
    out.push(<Text key="n-nucleus" x={cx} y={cy + R + 32} color={POSITIVE} size={20} opacity={names}>Nucleus: all of the positive charge, and nearly all of the mass</Text>);
    out.push(<Text key="n-electrons" x={cx} y={cy + R + 60} color={NEGATIVE} size={20} opacity={names}>{count > 1 ? 'Electrons circle it, far away' : 'An electron circles it, far away'}</Text>);
  }
}

export function AlphasView({ el, st, w, h, plays, fit }: { el: AlphasEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; fit?: number }) {
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
  const frame: Frame = { out, el, state: alphasAt(el, played), top, HIGH, part: (name) => ownPart(st, name) };
  if (el.picture === 'pudding') drawPudding(frame);
  else if (el.picture === 'ring') drawRing(frame);
  else if (el.picture === 'past') drawPast(frame);
  else if (el.picture === 'orbit') drawOrbit(frame);
  else drawHead(frame);
  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`${left} 0 ${across} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
