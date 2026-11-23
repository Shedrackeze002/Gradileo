/**
 * The energy levels of an atom (src/video/levels.ts works it all out).
 *
 * An atom: its allowed orbits, with the electron going round one of them, beside a ladder of the
 * energy levels. A photon leaves when the electron drops, and the electron rises when a photon
 * that matches a jump arrives.
 *
 * A spectrum: light from a hot solid, a glowing gas, or a hot solid seen through a cool gas,
 * spread out by a prism onto a strip from violet to red.
 *
 * A wave: the electron as a wave bent round its orbit.
 */
import type { ReactElement } from 'react';
import type { LevelsEl } from '../script.ts';
import { ARRIVE, HOP, levelsAt, levelsOf, linesOf, orbitRadius, turnAt, type Jump, type LevelsState } from '../levels.ts';
import { visibleColour } from '../light.ts';
import { chance } from '../matter.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { NEGATIVE, POSITIVE } from './Charges.tsx';
import { Value } from './Light.tsx';
import { clamp01, FONT, INK2, Text } from './motionKit.tsx';
import { Packet, photonColour } from './Photons.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** The size the pictures are designed at; they are scaled to the room they are given. */
const WIDE = 1136;
const DARK = '#06051a';

type P = [number, number];

interface Frame {
  out: ReactElement[];
  el: LevelsEl;
  state: LevelsState;
  top: number;
  HIGH: number;
  part: (name: string) => number;
}

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const minus = (text: string) => text.replace('-', '−');
/** An energy in electronvolts as the lessons write it: −13.6, −3.40, −1.51, −0.85, −0.544. */
export const voltsText = (volts: number) => minus(Math.abs(volts) >= 10 ? volts.toFixed(1) : Math.abs(volts) >= 1 ? volts.toFixed(2) : String(Number(volts.toPrecision(3))));
/** The energy of a photon, to three figures. */
const photonText = (volts: number) => (volts >= 10 ? volts.toFixed(1) : volts >= 1 ? volts.toFixed(2) : String(Number(volts.toPrecision(3))));

/** What light of a wavelength is called. */
export function lightName(nm: number): string {
  if (nm < 380) return 'ultraviolet';
  if (nm > 750) return 'infrared';
  if (nm < 450) return 'violet light';
  if (nm < 480) return 'blue light';
  if (nm < 500) return 'blue-green light';
  if (nm < 570) return 'green light';
  if (nm < 590) return 'yellow light';
  if (nm < 620) return 'orange light';
  return 'red light';
}

const Electron = ({ x, y, opacity = 1 }: { x: number; y: number; opacity?: number }) => (
  <g opacity={opacity}>
    <circle cx={x} cy={y} r={7} fill={NEGATIVE} stroke="#0d0c24" strokeWidth={1.4} />
    <line x1={x - 3.5} y1={y} x2={x + 3.5} y2={y} stroke="#fff" strokeWidth={2} strokeLinecap="round" />
  </g>
);

function drawAtom({ out, el, state, top, HIGH, part }: Frame): void {
  const levels = levelsOf(el);
  const [names, energies, photon, kept, radius] = [part('names'), part('energies'), part('photon'), part('kept'), part('radius')];
  const count = levels.length;
  const lowest = el.from ?? 1;
  const [ax, cy] = [400, top + (HIGH - top) / 2];
  const R = Math.min(170, (HIGH - top) / 2 - 40);
  // Hydrogen's orbits grow as n², which leaves no room to draw the first, so they are drawn closer together than that (the `radius` part gives the true size).
  const power = el.levels ? 1 : 1.4;
  const rOf = (n: number) => R * Math.pow(n / count, power);
  const time = state.time;
  const done = state.jumps.filter((jump) => jump.at <= time);
  const last = done[done.length - 1];
  const hop = last ? ease((time - last.at) / HOP) : 1;
  const START = 0.7;
  const angleAt = (t: number) => START + turnAt(el.start ?? 1, state.jumps, t);
  const spot = (r: number, a: number): P => [ax + r * Math.cos(a), cy - r * Math.sin(a)];
  // A photon leaves in a direction of its own, as does an electron that is freed: here always to the left and a little downwards, where there is room to watch it go.
  const away = (k: number): P => {
    const a = (Math.PI * (178 + 40 * chance(k, 81))) / 180;
    return [Math.cos(a), -Math.sin(a)];
  };

  // The orbits, with the one the electron is in drawn brighter.
  for (let n = 1; n <= count; n++) {
    const here = n === state.level;
    out.push(<circle key={`o${n}`} cx={ax} cy={cy} r={rOf(n)} fill="none" stroke={here ? INK2 : INK3} strokeWidth={here ? 2 : 1.5} strokeDasharray="4 7" opacity={here ? 0.95 : 0.7} />);
    // A small atom has no room for the names of its orbits; the ladder beside it has them.
    if (names > 0 && R >= 110) {
      const [x, y] = spot(rOf(n) + 4, -1);
      out.push(<Text key={`on${n}`} x={x + 4} y={y + 10} color={here ? INK : INK2} size={17} anchor="start" opacity={names}>{`n = ${n}`}</Text>);
    }
  }
  out.push(<circle key="nucleus" cx={ax} cy={cy} r={5.5} fill={POSITIVE} stroke="#0d0c24" strokeWidth={1.2} style={{ filter: `drop-shadow(0 0 7px ${POSITIVE})` }} />);

  // The ladder of energy levels: zero at the top, where the electron is free.
  const [lx0, lx1] = [700, 930];
  const [y0, yB] = [top + 54, HIGH - 36];
  // The ladder is not to scale: the upper levels are too close together to draw. Each gap is drawn as its energy to the power 0.35, which keeps the gaps in their order of size.
  const rungs = [0];
  for (let n = lowest; n <= count; n++) rungs.push(rungs[rungs.length - 1] + Math.pow((n < count ? levels[n] : 0) - levels[n - 1], 0.35));
  const yLevel = (n: number) => (n === 0 ? y0 - 16 : yB - (rungs[n - lowest] / rungs[rungs.length - 1]) * (yB - y0));
  out.push(<line key="zero" x1={lx0} y1={y0} x2={lx1} y2={y0} stroke={INK3} strokeWidth={1.6} strokeDasharray="5 6" />);
  if (names > 0) out.push(<Text key="zero-n" x={lx0 - 12} y={y0} color={INK2} size={17} anchor="end" opacity={names}>n = ∞</Text>);
  if (energies > 0) out.push(<Text key="zero-e" x={lx1 + 12} y={y0} color={INK2} size={17} anchor="start" opacity={energies}>0 eV (free)</Text>);
  let labelled = y0;
  for (let n = count; n >= lowest; n--) {
    const y = yLevel(n);
    const here = n === state.level;
    out.push(<line key={`l${n}`} x1={lx0} y1={y} x2={lx1} y2={y} stroke={here ? INK : INK2} strokeWidth={here ? 3 : 2} opacity={here ? 1 : 0.8} />);
    // A level too close to the one above it goes without its labels.
    if (y - labelled < 17) continue;
    labelled = y;
    if (names > 0) out.push(<Text key={`ln${n}`} x={lx0 - 12} y={y} color={here ? INK : INK2} size={17} anchor="end" opacity={names}>{`n = ${n}`}</Text>);
    if (energies > 0) out.push(<Text key={`le${n}`} x={lx1 + 12} y={y} color={here ? INK : INK2} size={17} anchor="start" opacity={energies}>{`${voltsText(levels[n - 1])} eV`}</Text>);
  }

  // The latest jump as an arrow on the ladder, in the colour of its photon; the `kept` part keeps the arrows of the earlier drops, one for each pair of levels.
  const moved = done.filter((jump) => jump.kind !== 'pass');
  const same = (a: Jump, b: Jump) => a.kind === b.kind && a.from === b.from && a.to === b.to;
  const drops = moved.filter((jump, k) => jump.kind === 'emit' && moved.findIndex((other) => same(other, jump)) === k);
  const newest = moved[moved.length - 1];
  const arrows = [...(kept > 0 ? drops : []), ...(newest && !(kept > 0 && drops.some((drop) => same(drop, newest))) ? [newest] : [])];
  arrows.forEach((jump) => {
    const latest = newest !== undefined && same(jump, newest);
    const grown = latest ? hop : 1;
    const slot = drops.findIndex((drop) => same(drop, jump));
    const x = lx0 + 58 + 30 * ((slot < 0 ? drops.length : slot) % 6);
    const k = `${jump.from}-${jump.to}-${jump.kind}`;
    const [from, to] = [yLevel(jump.from), yLevel(jump.to)];
    const end = from + (to - from) * grown;
    const color = jump.kind === 'bump' ? INK2 : photonColour(jump.nm);
    const dir = Math.sign(to - from);
    out.push(
      <g key={`a${k}`} opacity={latest ? 1 : 0.8 * kept}>
        <line x1={x} y1={from} x2={x} y2={end - dir * 9} stroke={color} strokeWidth={3.4} strokeLinecap="round" />
        <polygon points={`${x},${end} ${x - 7},${end - dir * 12} ${x + 7},${end - dir * 12}`} fill={color} />
      </g>,
    );
  });
  // The electron on the ladder.
  if (state.level > 0 || hop < 1) {
    const from = last ? yLevel(last.kind === 'pass' ? last.to : last.from) : yLevel(state.level);
    const y = last ? from + (yLevel(state.level) - from) * hop : from;
    out.push(<circle key="dot" cx={lx0 + 26} cy={y} r={7} fill={NEGATIVE} stroke="#0d0c24" strokeWidth={1.4} opacity={state.level === 0 ? 1 - hop : 1} />);
  }

  // The photons: one leaves from the electron when it drops, and one arrives from the left when it rises.
  const SPEED = 300;
  const clip = `levels-${el.id}`;
  const packets: ReactElement[] = [];
  state.jumps.forEach((jump, k) => {
    if (jump.kind === 'bump') return;
    const a = angleAt(jump.at);
    const place = spot(rOf(jump.kind === 'emit' ? jump.to : jump.from), a);
    if (jump.kind === 'emit') {
      const t = time - jump.at;
      if (t < 0 || t > 2) return;
      const dir = away(k);
      const far = 22 + 200 * t;
      packets.push(<Packet key={`p${k}`} at={[place[0] + dir[0] * far, place[1] + dir[1] * far]} dir={dir} nm={jump.nm} opacity={clamp01(t / 0.15) * clamp01((2 - t) / 0.5)} />);
      return;
    }
    const t = time - jump.at;
    if (t < -ARRIVE || (jump.kind !== 'pass' && t >= 0) || t > 1.6) return;
    packets.push(<Packet key={`p${k}`} at={[place[0] + SPEED * t - (t < 0 ? 12 : 0), place[1]]} dir={[1, 0]} nm={jump.nm} opacity={clamp01((t + ARRIVE) / 0.2) * clamp01((1.6 - t) / 0.5)} />);
  });
  out.push(
    <g key="packets">
      <clipPath id={clip}>
        <rect x={4} y={top + 4} width={lx0 - 90} height={HIGH - top - 8} />
      </clipPath>
      <g clipPath={`url(#${clip})`}>{packets}</g>
    </g>,
  );

  // The electron on its orbit: it moves to the new orbit as the photon leaves or arrives, and one that is freed flies off.
  const now = angleAt(time);
  if (last && last.kind === 'free') {
    const t = time - last.at;
    const [from, dir] = [spot(rOf(last.from), angleAt(last.at)), away(state.jumps.indexOf(last))];
    const [x, y] = [from[0] + dir[0] * 170 * t, from[1] + dir[1] * 170 * t];
    if (t < 2) out.push(<Electron key="electron" x={x} y={y} opacity={clamp01((2 - t) / 0.6)} />);
  } else {
    const r = last && last.kind !== 'pass' ? rOf(last.from) + (rOf(last.to) - rOf(last.from)) * hop : rOf(state.level);
    const [x, y] = spot(r, now);
    if (last && last.kind !== 'pass' && time - last.at < 0.5) out.push(<circle key="flash" cx={x} cy={y} r={10 + 30 * ((time - last.at) / 0.5)} fill="none" stroke={last.kind === 'bump' ? INK2 : photonColour(last.nm)} strokeWidth={2.5} opacity={1 - (time - last.at) / 0.5} />);
    out.push(<Electron key="electron" x={x} y={y} />);
  }

  // The latest photon in words and numbers.
  const told = [...state.jumps].reverse().find((jump) => jump.kind !== 'bump' && (jump.kind === 'emit' ? jump.at <= time : jump.at - ARRIVE <= time));
  if (photon > 0 && told) {
    const color = photonColour(told.nm);
    const arrived = told.at <= time;
    const what = told.kind === 'emit' ? 'Photon given out' : !arrived ? 'Photon on its way' : told.kind === 'absorb' ? 'Photon taken in' : told.kind === 'free' ? 'Electron set free' : 'It matches no jump';
    out.push(<Text key="p-what" x={36} y={top + 32} color={color} size={19} anchor="start" opacity={photon}>{what}</Text>);
    out.push(<Text key="p-e" x={36} y={top + 60} color={INK} size={20} anchor="start" opacity={photon}>{`E = ${photonText(told.volts)} eV`}</Text>);
    out.push(<Value key="p-nm" x={36} y={top + 88} pre="λ = " n={Math.round(told.nm)} unit="nm" figures={3} color={INK} anchor="start" size={20} opacity={photon} />);
    out.push(<Text key="p-name" x={36} y={top + 114} color={color} size={18} anchor="start" opacity={photon}>{lightName(told.nm)}</Text>);
  }
  if (radius > 0 && state.level > 0 && !el.levels) out.push(<Value key="radius" x={36} y={top + (photon > 0 ? 146 : 32)} pre={`Radius of orbit ${state.level}: `} n={orbitRadius(state.level)} unit="m" figures={3} color={INK2} anchor="start" size={19} opacity={radius} />);
  if (names > 0) out.push(<Text key="title" x={(lx0 + lx1) / 2} y={top + 24} color={INK2} size={18} opacity={names}>{`Energy levels of ${el.name ?? 'hydrogen'}`}</Text>);
}

function drawSpectrum({ out, el, state, top, HIGH, part }: Frame): void {
  const lines = linesOf(levelsOf(el)).filter((line) => line.nm >= 380 && line.nm <= 750);
  const [names, axis, marks] = [part('names'), part('axis'), part('lines')];
  const [x0, x1] = [90, WIDE - 90];
  const xOf = (nm: number) => x0 + ((nm - 380) / 370) * (x1 - x0);
  const [sy, sh] = [HIGH - 158, 66];
  const row = top + 84;
  const px = WIDE / 2;
  const tip: P = [px, row + 30];
  const grad = `levels-rainbow-${el.id}`;
  const stops: ReactElement[] = [];
  for (let nm = 380; nm <= 750; nm += 10) {
    const [r, g, b] = visibleColour(nm);
    stops.push(<stop key={nm} offset={(nm - 380) / 370} stopColor={`rgb(${r} ${g} ${b})`} />);
  }
  out.push(
    <defs key="defs">
      <linearGradient id={grad} gradientUnits="userSpaceOnUse" x1={x0} y1={0} x2={x1} y2={0}>
        {stops}
      </linearGradient>
    </defs>,
  );
  const gasName = (el.name ?? 'hydrogen').toLowerCase();
  const GAS = '#ff8fc7';
  const TITLES = { solid: 'Continuous spectrum: every colour', gas: 'Emission spectrum: bright lines', through: 'Absorption spectrum: dark lines' } as const;

  // One kind of source, with its light spread out on the strip.
  const kind = (source: 'solid' | 'gas' | 'through', opacity: number): ReactElement => {
    const bits: ReactElement[] = [];
    const lamp = source !== 'gas';
    const sx = 120;
    // The source: a lamp with a hot filament, or a tube of glowing gas.
    if (lamp) {
      bits.push(<circle key="lamp" cx={sx} cy={row} r={24} fill="#fff6d8" style={{ filter: 'drop-shadow(0 0 14px #ffe9a8)' }} />);
      if (names > 0) bits.push(<Text key="lamp-n" x={Math.max(sx, 40 + 5 * (el.lamp ?? '').length)} y={row + 50} color={INK2} size={18} opacity={names}>{el.lamp ?? 'Hot solid'}</Text>);
    } else {
      bits.push(<rect key="tube" x={sx - 54} y={row - 20} width={108} height={40} rx={20} fill={GAS} fillOpacity={0.3 + 0.08 * Math.sin(state.time * 9)} stroke={GAS} strokeWidth={2} style={{ filter: `drop-shadow(0 0 12px ${GAS})` }} />);
      for (let i = 1; i <= 9; i++) bits.push(<circle key={`g${i}`} cx={sx - 44 + 88 * chance(i, 71)} cy={row - 12 + 24 * chance(i, 72)} r={3.2} fill="#fff" opacity={0.35 + 0.6 * Math.abs(Math.sin(state.time * (2 + 3 * chance(i, 73)) + i))} />);
      if (names > 0) bits.push(<Text key="tube-n" x={sx} y={row + 50} color={GAS} size={18} opacity={names}>{`Glowing ${gasName} gas`}</Text>);
    }
    // The beam to the prism, with marks that travel along it.
    const beam = lamp ? '#fffbe8' : GAS;
    bits.push(<line key="beam" x1={sx + (lamp ? 26 : 56)} y1={row} x2={px - 16} y2={row} stroke={beam} strokeWidth={5} opacity={0.5} />);
    bits.push(<line key="beam-m" x1={sx + (lamp ? 26 : 56)} y1={row} x2={px - 16} y2={row} stroke={beam} strokeWidth={5} strokeDasharray="10 22" strokeDashoffset={-state.time * 150} opacity={0.9} />);
    if (source === 'through') {
      // The cool gas in the way: its atoms take in the photons that match their jumps, and give them out again in all directions.
      const [gx, gw, gh] = [330, 130, 76];
      bits.push(<rect key="cell" x={gx - gw / 2} y={row - gh / 2} width={gw} height={gh} rx={10} fill="rgb(120 160 255 / 0.12)" stroke={INK2} strokeWidth={1.8} />);
      for (let i = 1; i <= 12; i++) bits.push(<circle key={`c${i}`} cx={gx - gw / 2 + 12 + (gw - 24) * chance(i, 74)} cy={row - gh / 2 + 10 + (gh - 20) * chance(i, 75)} r={3} fill={INK2} opacity={0.7} />);
      const every = 0.32;
      const tick = Math.floor(state.time / every);
      for (let i = 0; i < 4; i++) {
        const n = tick - i;
        if (n < 1 || !lines.length) continue;
        const age = state.time - n * every;
        const a = 2 * Math.PI * chance(n, 76);
        // Not along the beam: those are the ones that the strip misses.
        const dir: P = [Math.cos(a) * 0.5, Math.sin(a) >= 0 ? 0.87 : -0.87];
        const from: P = [gx - 40 + 80 * chance(n, 77), row - 14 + 28 * chance(n, 78)];
        const line = lines[Math.floor(chance(n, 79) * lines.length) % lines.length];
        bits.push(<circle key={`r${n}`} cx={from[0] + dir[0] * 55 * age} cy={from[1] + dir[1] * 55 * age} r={4.5} fill={photonColour(line.nm)} opacity={clamp01(1 - age / (every * 4))} />);
      }
      if (names > 0) bits.push(<Text key="cell-n" x={gx} y={row - gh / 2 - 16} color={INK2} size={18} opacity={names}>{el.cloud ?? `Cool ${gasName} gas`}</Text>);
    }
    // The light spread out: a fan from the prism down to the strip.
    if (source === 'gas') for (const line of lines) bits.push(<line key={`f${line.from}-${line.to}`} x1={tip[0]} y1={tip[1]} x2={xOf(line.nm)} y2={sy} stroke={photonColour(line.nm)} strokeWidth={3} opacity={0.75} />);
    else {
      bits.push(<polygon key="fan" points={`${tip[0]},${tip[1]} ${x0},${sy} ${x1},${sy}`} fill={`url(#${grad})`} opacity={0.3} />);
      if (source === 'through') for (const line of lines) bits.push(<line key={`f${line.from}-${line.to}`} x1={tip[0]} y1={tip[1]} x2={xOf(line.nm)} y2={sy} stroke={DARK} strokeWidth={4} opacity={0.9} />);
    }
    // The strip.
    bits.push(<rect key="strip" x={x0} y={sy} width={x1 - x0} height={sh} fill={source === 'gas' ? '#03030c' : `url(#${grad})`} />);
    for (const line of lines)
      bits.push(source === 'gas' ? <rect key={`s${line.from}-${line.to}`} x={xOf(line.nm) - 3} y={sy} width={6} height={sh} fill={photonColour(line.nm)} style={{ filter: `drop-shadow(0 0 6px ${photonColour(line.nm)})` }} /> : source === 'through' ? <rect key={`s${line.from}-${line.to}`} x={xOf(line.nm) - 3} y={sy} width={6} height={sh} fill={DARK} /> : <g key={`s${line.from}-${line.to}`} />);
    if (names > 0) bits.push(<Text key="title" x={x0} y={sy - 22} color={INK} size={20} anchor="start" opacity={names}>{TITLES[source]}</Text>);
    return (
      <g key={`kind-${source}`} opacity={opacity}>
        {bits}
      </g>
    );
  };
  if (state.mix < 1 && state.before !== state.source) out.push(kind(state.before, 1 - state.mix));
  out.push(kind(state.source, state.before === state.source ? 1 : state.mix));

  // The slit, the prism and the frame of the strip are the same for every source.
  out.push(<path key="slit" d={`M ${px - 110} ${row - 34} v 26 M ${px - 110} ${row + 8} v 26`} stroke={INK2} strokeWidth={5} strokeLinecap="round" />);
  out.push(<polygon key="prism" points={`${px - 36},${row + 30} ${px + 36},${row + 30} ${px},${row - 32}`} fill="rgb(200 220 255 / 0.14)" stroke={INK2} strokeWidth={2} strokeLinejoin="round" />);
  out.push(<rect key="frame" x={x0} y={sy} width={x1 - x0} height={sh} fill="none" stroke="rgb(188 217 255 / 0.35)" strokeWidth={1.5} />);
  if (names > 0) {
    out.push(<Text key="slit-n" x={px - 110} y={row + 54} color={INK2} size={17} opacity={names}>Slit</Text>);
    out.push(<Text key="prism-n" x={px + 48} y={row - 6} color={INK2} size={17} anchor="start" opacity={names}>Prism</Text>);
  }
  if (axis > 0) {
    for (let nm = 400; nm <= 700; nm += 50) {
      out.push(<line key={`t${nm}`} x1={xOf(nm)} y1={sy + sh} x2={xOf(nm)} y2={sy + sh + 8} stroke={INK2} strokeWidth={2} opacity={axis} />);
      out.push(<Text key={`tn${nm}`} x={xOf(nm)} y={sy + sh + 24} color={INK2} size={16} opacity={axis}>{`${nm}`}</Text>);
    }
    out.push(<Text key="axis-n" x={x1} y={sy + sh + 50} color={INK2} size={16} anchor="end" opacity={axis}>Wavelength (nm)</Text>);
  }
  if (marks > 0) for (const line of lines) out.push(<Text key={`m${line.from}-${line.to}`} x={xOf(line.nm)} y={sy + sh + 50} color={photonColour(line.nm)} size={16} opacity={marks}>{`${line.from} → ${line.to}`}</Text>);
}

function drawWave({ out, state, top, HIGH, part }: Frame): void {
  const [names, fits] = [part('names'), part('fits')];
  const [cx, cy] = [WIDE / 2 - 200, top + (HIGH - top) / 2];
  const R = Math.min(140, (HIGH - top) / 2 - 62);
  const w = state.waves;
  const whole = Math.abs(w - Math.round(w)) < 0.02;
  const A = 24;
  const at = (theta: number, off: number): string => `${(cx + (R + off) * Math.cos(theta)).toFixed(1)},${(cy - (R + off) * Math.sin(theta)).toFixed(1)}`;
  out.push(<circle key="orbit" cx={cx} cy={cy} r={R} fill="none" stroke={INK3} strokeWidth={1.5} strokeDasharray="4 7" />);
  out.push(<circle key="nucleus" cx={cx} cy={cy} r={6} fill={POSITIVE} stroke="#0d0c24" strokeWidth={1.2} style={{ filter: `drop-shadow(0 0 7px ${POSITIVE})` }} />);
  if (whole) {
    // A standing wave: it joins up with itself, and keeps its shape as it swings.
    const n = Math.round(w);
    const swing = Math.cos(state.time * 3.2);
    const [wave, upper, lower]: [string[], string[], string[]] = [[], [], []];
    for (let i = 0; i <= 360; i++) {
      const theta = (i / 360) * 2 * Math.PI;
      const s = A * Math.sin(n * theta);
      wave.push(at(theta, s * swing));
      upper.push(at(theta, s));
      lower.push(at(theta, -s));
    }
    out.push(<polygon key="e1" points={upper.join(' ')} fill="none" stroke={NEGATIVE} strokeWidth={1.4} opacity={0.3} />);
    out.push(<polygon key="e2" points={lower.join(' ')} fill="none" stroke={NEGATIVE} strokeWidth={1.4} opacity={0.3} />);
    out.push(<polygon key="wave" points={wave.join(' ')} fill="none" stroke={NEGATIVE} strokeWidth={3.4} strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 6px ${NEGATIVE})` }} />);
  } else {
    // A wave that does not fit: each time round it lands out of step with itself.
    for (let lap = 2; lap >= 0; lap--) {
      const pts: string[] = [];
      for (let i = 0; i <= 360; i++) {
        const theta = (lap + i / 360) * 2 * Math.PI;
        pts.push(at(theta, A * Math.sin(w * theta - state.time * 3.2)));
      }
      out.push(<polyline key={`lap${lap}`} points={pts.join(' ')} fill="none" stroke={lap === 0 ? NEGATIVE : TONES.bad} strokeWidth={lap === 0 ? 3 : 2} strokeLinejoin="round" opacity={[0.95, 0.55, 0.32][lap]} />);
    }
  }
  const tx = WIDE / 2 + 20;
  if (names > 0) {
    out.push(<Text key="n-1" x={tx} y={cy - 62} color={NEGATIVE} size={21} anchor="start" opacity={names}>The electron as a wave, bent round its orbit</Text>);
    out.push(<Text key="n-2" x={tx} y={cy - 22} color={INK} size={21} anchor="start" opacity={names}>{`Wavelengths round the orbit: ${whole ? Math.round(w) : w.toFixed(1)}`}</Text>);
  }
  if (fits > 0) out.push(<Text key="fits" x={tx} y={cy + 24} color={whole ? TONES.good : TONES.bad} size={21} anchor="start" opacity={fits}>{whole ? `It joins up with itself: an allowed orbit, n = ${Math.round(w)}` : 'It does not join up, and cancels itself'}</Text>);
}

export function LevelsView({ el, st, w, h, plays, fit }: { el: LevelsEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; fit?: number }) {
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
  const frame: Frame = { out, el, state: levelsAt(el, played), top, HIGH, part: (name) => ownPart(st, name) };
  if (el.picture === 'spectrum') drawSpectrum(frame);
  else if (el.picture === 'wave') drawWave(frame);
  else drawAtom(frame);
  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`${left} 0 ${across} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
