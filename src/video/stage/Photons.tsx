/**
 * Light as a stream of photons (src/video/photons.ts works it all out).
 *
 * A beam: a lamp on the left sends photons, one by one, to a detector on the right. Each photon
 * is drawn as a short packet of waves in the colour of the light, with its waves closer together
 * for a shorter wavelength.
 *
 * A metal: light from a lamp lands on the face of a metal plate. Each photon that brings more
 * energy than the work function frees one electron, at once, and the electron flies away from
 * the plate at a speed that goes with the square root of its kinetic energy. With a tube, a
 * collecting plate faces the metal, and a supply makes it negative: the electrons slow down as
 * they cross, and the ones with too little energy turn back.
 *
 * A push: each beam lands on a surface on wheels, which gains speed with every photon; a mirror
 * sends each photon back, and gains speed twice as fast as a black card.
 *
 * A Compton collision: an X-ray photon meets an electron at rest, and leaves at an angle with
 * its waves farther apart, while the electron recoils the other way.
 */
import type { ReactElement } from 'react';
import type { PhotonsEl } from '../script.ts';
import { visibleColour } from '../light.ts';
import { COLLIDE_EVERY, COLLIDE_LEAD, EV, GAP_SPEED, LANE_SPEED, PLANCK, collected, electronAt, electronFlight, hertzOf, kineticMax, lightForce, photonJoules, photonMomentum, photonVolts, photonsAt, photonsEachSecond, pushAt, scatterAt, shareOf, spotOf, thresholdHertz } from '../photons.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { NEGATIVE } from './Charges.tsx';
import { Value, written } from './Light.tsx';
import { clamp01, FONT, INK2, NET, Text } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** The size the pictures are designed at; they are scaled to the room they are given. */
const WIDE = 1136;
const METAL = '#9aa6c4';
const FAST = TONES.good;
const MOMENTUM = TONES.opp;
const DEG = Math.PI / 180;

type P = [number, number];

/** The colour of light of a wavelength: its own colour when it can be seen, a pale violet for ultraviolet, a pale blue for X-rays and a pale red for infrared. */
export function photonColour(nm: number): string {
  if (nm < 10) return '#bfe3ff';
  if (nm < 380) return '#d0bcff';
  if (nm > 750) return '#ffab9a';
  const [r, g, b] = visibleColour(nm);
  return `rgb(${r} ${g} ${b})`;
}

/** An energy in electronvolts, to the hundredth. */
const volts = (n: number) => n.toFixed(2).replace('-', '−');

/** A photon: a short packet of waves that travels along `dir`, with its crests closer together for a shorter wavelength. */
function Packet({ at, dir, nm, opacity = 1, wave: given }: { at: P; dir: P; nm: number; opacity?: number; wave?: number }) {
  const color = photonColour(nm);
  const wave = given ?? Math.max(6, Math.min(30, (nm / 700) * 22));
  const pts: string[] = [];
  for (let s = -30; s <= 30; s += 1.5) {
    const off = 9 * Math.exp(-((s / 15) ** 2)) * Math.sin((2 * Math.PI * s) / wave);
    pts.push(`${(at[0] + dir[0] * s - dir[1] * off).toFixed(1)},${(at[1] + dir[1] * s + dir[0] * off).toFixed(1)}`);
  }
  return <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />;
}

/** A thin arrow from a point along a direction: a momentum, a velocity or a force. */
function Shaft({ from, dir, len, color, opacity = 1, weight = 3 }: { from: P; dir: P; len: number; color: string; opacity?: number; weight?: number }) {
  if (len < 6) return null;
  const head = 5.5 + weight * 0.6;
  const to: P = [from[0] + dir[0] * len, from[1] + dir[1] * len];
  const back: P = [to[0] - dir[0] * head * 1.6, to[1] - dir[1] * head * 1.6];
  return (
    <g opacity={opacity}>
      <line x1={from[0]} y1={from[1]} x2={back[0]} y2={back[1]} stroke={color} strokeWidth={weight} strokeLinecap="round" />
      <polygon points={`${to[0]},${to[1]} ${back[0] - dir[1] * head},${back[1] + dir[0] * head} ${back[0] + dir[1] * head},${back[1] - dir[0] * head}`} fill={color} />
    </g>
  );
}

/** A wavelength written in the unit that suits it: nanometres for light, picometres for X-rays. */
function Wavelength({ x, y, nm, color, anchor, opacity }: { x: number; y: number; nm: number; color: string; anchor: 'start' | 'end'; opacity: number }) {
  return nm >= 1 ? <Value x={x} y={y} pre="λ = " n={Math.round(nm)} unit="nm" figures={3} color={color} anchor={anchor} opacity={opacity} /> : <Value x={x} y={y} pre="λ = " n={nm * 1000} unit="pm" figures={3} color={color} anchor={anchor} opacity={opacity} />;
}

/** An electron: a blue dot with a minus sign on it. */
function Electron({ x, y, glow, opacity = 1 }: { x: number; y: number; glow: boolean; opacity?: number }) {
  return (
    <g opacity={opacity} style={glow ? { filter: `drop-shadow(0 0 7px ${FAST})` } : undefined}>
      <circle cx={x} cy={y} r={8} fill={NEGATIVE} stroke={glow ? FAST : '#0d0c24'} strokeWidth={glow ? 2.5 : 1.5} />
      <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke="#fff" strokeWidth={2.4} strokeLinecap="round" />
    </g>
  );
}

/** A lamp: a small housing with a glowing face on the side the light leaves by. */
function Lamp({ x, y, turn, nm }: { x: number; y: number; turn: number; nm: number }) {
  const color = photonColour(nm);
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn})`}>
      <rect x={-44} y={-20} width={62} height={40} rx={9} fill="#2b2860" stroke={INK3} strokeWidth={2} />
      <rect x={18} y={-26} width={14} height={52} rx={5} fill={color} style={{ filter: `drop-shadow(0 0 9px ${color})` }} />
    </g>
  );
}

interface Frame {
  out: ReactElement[];
  top: number;
  HIGH: number;
  part: (name: string) => number;
}

// ── A beam of photons ─────────────────────────────────────────────────────────────────────────

/** How long a photon takes to cross from the lamp to the detector, in seconds of video. */
const CROSS = 2.8;

function drawBeam(el: PhotonsEl, plays: Array<[string, number]>, { out, top, HIGH, part }: Frame): void {
  const state = photonsAt(el, plays);
  const cy = top + (HIGH - top) * 0.42;
  const [x0, x1] = [112, 1040];
  const color = photonColour(state.nm);

  out.push(<Lamp key="lamp" x={80} y={cy} turn={0} nm={state.nm} />);
  out.push(<rect key="detector" x={x1} y={cy - 84} width={22} height={168} rx={6} fill="#1f1c4a" stroke={INK3} strokeWidth={2} />);

  for (const ph of state.sent) {
    const age = state.time - ph.at;
    if (age < 0 || age > CROSS + 0.45) continue;
    const y = cy + (spotOf(ph.n) - 0.5) * 124;
    if (age <= CROSS) {
      const px = x0 + (x1 - x0 - 30) * (age / CROSS) + 12;
      out.push(<Packet key={`p${ph.n}`} at={[px, y]} dir={[1, 0]} nm={ph.nm} opacity={clamp01(age / 0.15)} />);
      // Its momentum: an arrow that is longer for a shorter wavelength.
      const len = Math.max(14, Math.min(64, 30 * (550 / ph.nm)));
      if (part('momentum') > 0) out.push(<Shaft key={`m${ph.n}`} from={[px - len / 2, y + 17]} dir={[1, 0]} len={len} color={MOMENTUM} opacity={part('momentum') * clamp01(age / 0.15)} />);
    } else {
      // It is taken in by the detector, whole, at one place.
      const k = (age - CROSS) / 0.45;
      out.push(<circle key={`f${ph.n}`} cx={x1} cy={y} r={6 + 16 * k} fill={photonColour(ph.nm)} opacity={0.7 * (1 - k)} />);
    }
  }

  const names = part('names');
  if (names > 0) {
    out.push(<Text key="n-lamp" x={76} y={cy + 52} color={INK2} size={19} opacity={names}>Lamp</Text>);
    out.push(<Text key="n-det" x={x1 + 11} y={cy + 106} color={INK2} size={19} opacity={names}>Detector</Text>);
  }
  const values = part('values');
  if (values > 0) {
    out.push(<Wavelength key="v-nm" x={WIDE / 2 - 30} y={top + 32} nm={state.nm} color={color} anchor="end" opacity={values} />);
    out.push(<Value key="v-hz" x={WIDE / 2 + 30} y={top + 32} pre="f = " n={hertzOf(state.nm)} unit="Hz" figures={3} color={color} anchor="start" opacity={values} />);
  }
  // The readouts stack up from the foot of the picture: the count, the energy and the momentum of a photon.
  const [count, energy, momentum] = [part('count'), part('energy'), part('momentum')];
  const shown = [count, energy, momentum].map((p) => p > 0);
  const rows = shown.filter(Boolean).length;
  const rowY = (which: number) => HIGH - 30 - 32 * shown.slice(which + 1).filter(Boolean).length;
  const bars = part('bars');
  if (bars > 0) {
    // The energy of one photon, on a scale of electronvolts.
    const [bx, by, per] = [WIDE / 2 - 220, HIGH - 72 - 32 * Math.max(1, rows), 110];
    out.push(
      <g key="bars" opacity={bars}>
        <rect x={bx} y={by - 9} width={4 * per} height={18} rx={4} fill="rgb(188 217 255 / 0.08)" stroke="rgb(188 217 255 / 0.3)" strokeWidth={1.2} />
        <rect x={bx} y={by - 9} width={Math.min(4, photonVolts(state.nm)) * per} height={18} rx={4} fill={color} />
        {[0, 1, 2, 3, 4].map((n) => (
          <g key={n}>
            <line x1={bx + n * per} y1={by + 9} x2={bx + n * per} y2={by + 15} stroke={INK3} strokeWidth={1.5} />
            <text x={bx + n * per} y={by + 29} fill={INK3} fontSize={15} fontWeight={600} textAnchor="middle" style={{ fontFamily: FONT }}>
              {n === 4 ? '4 eV' : String(n)}
            </text>
          </g>
        ))}
      </g>,
    );
  }
  if (count > 0) {
    if (el.watts !== undefined) out.push(<Value key="count" x={WIDE / 2} y={rowY(0)} pre="Photons each second: " n={photonsEachSecond(el.watts, state.nm)} unit="" figures={el.figures ?? 2} color={INK} opacity={count} />);
    else out.push(<Text key="count" x={WIDE / 2} y={rowY(0)} color={INK} size={21} opacity={count}>{`Photons each second: ${Math.round(state.rate)}`}</Text>);
  }
  if (energy > 0) {
    out.push(<Value key="e-j" x={WIDE / 2 + 96} y={rowY(1)} pre="Energy of each photon: E = " n={photonJoules(state.nm)} unit="J" figures={3} color={INK} anchor="end" opacity={energy} />);
    out.push(<Text key="e-v" x={WIDE / 2 + 108} y={rowY(1)} color={color} size={21} anchor="start" opacity={energy}>{`= ${photonVolts(state.nm) >= 1000 ? `${written(photonVolts(state.nm) / 1000, 3)[0]} keV` : `${volts(photonVolts(state.nm))} eV`}`}</Text>);
  }
  if (momentum > 0) out.push(<Value key="momentum" x={WIDE / 2} y={rowY(2)} pre="Momentum of each photon: p = " n={photonMomentum(state.nm)} unit="kg·m/s" figures={3} color={MOMENTUM} opacity={momentum} />);
}

// ── Light on a metal ──────────────────────────────────────────────────────────────────────────

/** The speed of a photon in the picture, in pixels each second. */
const LIGHT_SPEED = 330;
/** Where the face of the metal is, where the face of the collecting plate is, and where the readouts begin. */
const [EX, CX, RX] = [170, 640, 770];

function drawMetal(el: PhotonsEl, plays: Array<[string, number]>, { out, top, HIGH, part }: Frame): void {
  const state = photonsAt(el, plays);
  const metal = el.metal!;
  const tube = el.tube !== undefined;
  const meter = tube ? part('meter') : 0;
  const cy = top + (HIGH - top) * (tube ? 0.44 : 0.5);
  const half = Math.min(105, (HIGH - top) * 0.24);
  const gap = CX - EX;
  const lamp: P = [430, top + 30];
  const from: P = [lamp[0] - 26, lamp[1] + 16];
  const color = photonColour(state.nm);
  const most = kineticMax(metal.work, state.nm);
  const landAt = (n: number): P => [EX, cy + (spotOf(n) - 0.5) * 2 * (half - 18)];
  const flight = (to: P) => Math.hypot(to[0] - from[0], to[1] - from[1]) / LIGHT_SPEED;

  // The light: a faint beam from the lamp to the face of the metal, brighter when more photons arrive.
  out.push(<polygon key="beam" points={`${from[0]},${from[1]} ${EX},${cy - half + 10} ${EX},${cy + half - 10}`} fill={color} opacity={Math.min(0.16, 0.022 * state.rate)} />);

  if (tube) out.push(<rect key="glass" x={EX - 62} y={cy - half - 16} width={gap + 140} height={2 * half + 32} rx={44} fill="rgb(140 180 255 / 0.05)" stroke="rgb(188 217 255 / 0.42)" strokeWidth={2} />);

  // The circuit: a supply that makes the collecting plate negative, and a meter for the electrons that cross.
  if (meter > 0) {
    const wire = cy + half + 58;
    const [sx, ax] = [262, 548];
    const reach = state.rate * collected(metal.work, state.nm, state.volts);
    const needle = -60 + 120 * clamp01(reach / 8);
    const sign = state.volts > 0.005 ? 1 : state.volts < -0.005 ? -1 : 0;
    out.push(
      <g key="circuit" opacity={meter}>
        <polyline points={`${EX - 22},${cy + half} ${EX - 22},${wire} ${sx - 14},${wire}`} fill="none" stroke={INK2} strokeWidth={2.5} />
        <polyline points={`${sx + 14},${wire} ${ax - 22},${wire}`} fill="none" stroke={INK2} strokeWidth={2.5} />
        <polyline points={`${ax + 22},${wire} ${CX + 8},${wire} ${CX + 8},${cy + half}`} fill="none" stroke={INK2} strokeWidth={2.5} />
        <line x1={sx - 14} y1={wire - 20} x2={sx - 14} y2={wire + 20} stroke={INK} strokeWidth={3} />
        <line x1={sx + 14} y1={wire - 11} x2={sx + 14} y2={wire + 11} stroke={INK} strokeWidth={5} />
        <line x1={sx - 30} y1={wire + 26} x2={sx + 30} y2={wire - 26} stroke={TONES.theta} strokeWidth={2.2} />
        <polygon points={`${sx + 30},${wire - 26} ${sx + 19},${wire - 23} ${sx + 26},${wire - 15}`} fill={TONES.theta} />
        <circle cx={ax} cy={wire} r={22} fill="#17143c" stroke={INK2} strokeWidth={2.5} />
        <line x1={ax} y1={wire + 9} x2={ax + 22 * Math.sin((needle * Math.PI) / 180)} y2={wire + 9 - 22 * Math.cos((needle * Math.PI) / 180)} stroke={TONES.bad} strokeWidth={2.6} strokeLinecap="round" />
        <circle cx={ax} cy={wire + 9} r={2.8} fill={INK} />
        {sign !== 0 && (
          <>
            <text x={CX + 28} y={cy + half + 38} fill={sign > 0 ? NEGATIVE : TONES.bad} fontSize={26} fontWeight={700} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: FONT }}>
              {sign > 0 ? '−' : '+'}
            </text>
            <text x={EX - 42} y={cy + half + 38} fill={sign > 0 ? TONES.bad : NEGATIVE} fontSize={26} fontWeight={700} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: FONT }}>
              {sign > 0 ? '+' : '−'}
            </text>
          </>
        )}
        <Text x={sx} y={wire + 44} color={TONES.theta} size={20}>{`Supply: ${Math.abs(state.volts).toFixed(2)} V`}</Text>
        <Text x={ax} y={wire + 44} color={reach > 0.05 ? INK : TONES.bad} size={20}>{reach > 0.05 ? `Electrons collected each second: ${reach.toFixed(1)}` : 'No current'}</Text>
      </g>,
    );
  }

  // The metal, and the plate that faces it.
  out.push(
    <defs key="defs">
      <linearGradient id={`${el.id}-metal`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#5b6688" />
        <stop offset="1" stopColor={METAL} />
      </linearGradient>
    </defs>,
  );
  out.push(<rect key="metal" x={EX - 44} y={cy - half} width={44} height={2 * half} rx={5} fill={`url(#${el.id}-metal)`} stroke="#c7d0e8" strokeWidth={1.5} />);
  if (tube) out.push(<rect key="plate" x={CX} y={cy - half} width={16} height={2 * half} rx={4} fill="#6b7596" stroke="#c7d0e8" strokeWidth={1.5} />);
  out.push(<Lamp key="lamp" x={lamp[0]} y={lamp[1]} turn={Math.atan2(cy - from[1], EX - from[0]) * (180 / Math.PI)} nm={state.nm} />);

  // The photons on their way, and what each does when it lands.
  const fastest = part('fastest');
  // With no tube, the electrons fly on across the picture, as far as the readouts leave them room.
  const far = Math.max(650, 1090 - 390 * part('bars') - 440 * part('graph'));
  for (const ph of state.sent) {
    const age = state.time - ph.at;
    if (age < 0 || age > 14) continue;
    const to = landAt(ph.n);
    const fly = flight(to);
    if (age < fly) {
      const k = age / fly;
      const len = Math.hypot(to[0] - from[0], to[1] - from[1]);
      const dir: P = [(to[0] - from[0]) / len, (to[1] - from[1]) / len];
      out.push(<Packet key={`p${ph.n}`} at={[from[0] + (to[0] - from[0]) * k, from[1] + (to[1] - from[1]) * k]} dir={dir} nm={ph.nm} opacity={clamp01(age / 0.12)} />);
      continue;
    }
    const since = age - fly;
    if (since < 0.4) out.push(<circle key={`l${ph.n}`} cx={to[0]} cy={to[1]} r={5 + 12 * (since / 0.4)} fill={photonColour(ph.nm)} opacity={0.75 * (1 - since / 0.4)} />);
    const kinetic = shareOf(ph.n) * kineticMax(metal.work, ph.nm);
    // A photon with less energy than the work function frees no electron.
    if (!(kinetic > 0)) continue;
    const quick = shareOf(ph.n) === 1;
    let [x, v, seen] = [0, 0, 1];
    if (tube) {
      const now = electronAt(kinetic, ph.volts, since);
      if (now.fate !== 'flying') {
        const over = since - electronFlight(kinetic, ph.volts).seconds;
        if (now.fate === 'collected' && over < 0.35) out.push(<circle key={`c${ph.n}`} cx={CX} cy={to[1]} r={5 + 10 * (over / 0.35)} fill={NEGATIVE} opacity={0.7 * (1 - over / 0.35)} />);
        continue;
      }
      [x, v] = [now.x, now.v];
    } else {
      v = GAP_SPEED * Math.sqrt(kinetic);
      x = v * since;
      seen = clamp01((far - (EX + 9 + x * (gap - 18))) / 70);
      if (seen <= 0) continue;
    }
    const px = EX + 9 + x * (gap - 18);
    out.push(<Electron key={`e${ph.n}`} x={px} y={to[1]} glow={quick && fastest > 0} opacity={seen} />);
    if (quick && fastest > 0 && Math.abs(v) > 0.03) {
      const len = v * 70;
      const s = Math.sign(len);
      out.push(
        <g key={`v${ph.n}`} opacity={fastest * seen}>
          <line x1={px + s * 11} y1={to[1]} x2={px + s * 11 + len - s * 7} y2={to[1]} stroke={FAST} strokeWidth={3.5} strokeLinecap="round" />
          <polygon points={`${px + s * 11 + len + s * 3},${to[1]} ${px + s * 11 + len - s * 8},${to[1] - 6} ${px + s * 11 + len - s * 8},${to[1] + 6}`} fill={FAST} />
        </g>,
      );
    }
  }

  const names = part('names');
  if (names > 0) {
    const y = cy - half - (tube ? 36 : 22);
    out.push(<Text key="n-metal" x={EX - 22} y={y} color={INK2} size={19} opacity={names}>{metal.name}</Text>);
    if (tube) out.push(<Text key="n-plate" x={CX + 8} y={y} color={INK2} size={19} opacity={names}>Collector</Text>);
    out.push(<Text key="n-light" x={lamp[0] + 46} y={lamp[1] - 4} color={color} size={19} anchor="start" opacity={names}>Light</Text>);
  }
  if (fastest > 0) {
    out.push(
      <Text key="fastest" x={EX + gap / 2} y={cy + half + (meter > 0 ? 134 : tube ? 40 : 26)} color={most > 0 ? FAST : TONES.bad} size={20} opacity={fastest}>
        {most > 0 ? `Fastest electrons: ${volts(most)} eV` : 'No electrons leave'}
      </Text>,
    );
  }
  const count = part('count');
  if (count > 0) {
    const freed = most > 0 ? Math.round(state.rate) : 0;
    out.push(<Text key="count" x={EX + gap / 2} y={HIGH - 26} color={freed ? INK : TONES.bad} size={21} opacity={count}>{`Electrons freed each second: ${freed}`}</Text>);
  }

  // The readouts on the right.
  const values = part('values');
  if (values > 0) {
    out.push(<Value key="v-nm" x={RX} y={top + 34} pre="λ = " n={Math.round(state.nm)} unit="nm" figures={3} color={color} anchor="start" opacity={values} />);
    out.push(<Value key="v-hz" x={RX} y={top + 66} pre="f = " n={hertzOf(state.nm)} unit="Hz" figures={3} color={color} anchor="start" opacity={values} />);
  }
  const energy = part('energy');
  if (energy > 0) out.push(<Text key="energy" x={RX} y={top + 98} color={color} size={21} anchor="start" opacity={energy}>{`Each photon: hf = ${volts(photonVolts(state.nm))} eV`}</Text>);

  const bars = part('bars');
  if (bars > 0) {
    // The greatest photon energy that any clip reaches sets the scale, so the bars never run off the picture.
    const least = Math.min(el.nm, ...Object.values(el.clips).flatMap((clip) => clip.phases.map((ph) => ph.nm ?? el.nm)));
    const per = 320 / Math.max(metal.work, photonVolts(least));
    const hf = photonVolts(state.nm);
    const by = cy - 34;
    out.push(
      <g key="bars" opacity={bars}>
        <Text x={RX} y={by - 24} color={color} size={20} anchor="start">{`Photon: hf = ${volts(hf)} eV`}</Text>
        <rect x={RX} y={by - 9} width={hf * per} height={20} rx={4} fill={color} />
        <Text x={RX} y={by + 42} color={METAL} size={20} anchor="start">{`Work function: W = ${volts(metal.work)} eV`}</Text>
        <rect x={RX} y={by + 57} width={metal.work * per} height={20} rx={4} fill={METAL} />
        {most > 0 && <rect x={RX + metal.work * per} y={by + 57} width={most * per} height={20} rx={4} fill={FAST} />}
        <line x1={RX + hf * per} y1={by - 14} x2={RX + hf * per} y2={by + 16} stroke={INK2} strokeWidth={1.5} strokeDasharray="5 5" />
        <line x1={RX + hf * per} y1={by + 56} x2={RX + hf * per} y2={by + 82} stroke={INK2} strokeWidth={1.5} strokeDasharray="5 5" />
        <Text x={RX} y={by + 104} color={most > 0 ? FAST : TONES.bad} size={20} anchor="start">{most > 0 ? `Left over: Ek max = ${volts(most)} eV` : 'Too little energy: no electrons'}</Text>
      </g>,
    );
  }

  const graph = part('graph');
  if (graph > 0) {
    // The greatest kinetic energy against the frequency: a straight line of slope h that meets the axis at the threshold.
    const [fMost, eMost] = [el.graph?.hertz ?? 12, el.graph?.volts ?? 3];
    const eLeast = -Math.ceil(metal.work);
    const [gx0, gx1, gy0, gy1] = [744, 1100, HIGH - 44, top + 132];
    const X = (f: number) => gx0 + ((gx1 - gx0) * f) / fMost;
    const Y = (e: number) => gy0 - ((gy0 - gy1) * (e - eLeast)) / (eMost - eLeast);
    const lineAt = (f: number) => (PLANCK * f * 1e14) / EV - metal.work;
    const f0 = thresholdHertz(metal.work) / 1e14;
    const fEnd = Math.min(fMost, ((eMost + metal.work) * EV) / PLANCK / 1e14);
    const f = hertzOf(state.nm) / 1e14;
    const e = Math.max(0, lineAt(f));
    const inside = f <= fMost && e <= eMost;
    out.push(
      <g key="graph" opacity={graph}>
        <line x1={gx0} y1={gy1 - 8} x2={gx0} y2={gy0} stroke={INK2} strokeWidth={2} />
        <line x1={gx0} y1={Y(0)} x2={gx1 + 6} y2={Y(0)} stroke={INK2} strokeWidth={2} />
        {Array.from({ length: Math.floor(fMost / 2) }, (_, i) => 2 * (i + 1)).map((n) => (
          <g key={`f${n}`}>
            <line x1={X(n)} y1={Y(0) - 4} x2={X(n)} y2={Y(0) + 4} stroke={INK2} strokeWidth={1.5} />
            <text x={X(n)} y={Y(0) + 21} fill={INK3} fontSize={16} fontWeight={600} textAnchor="middle" style={{ fontFamily: FONT }}>
              {n}
            </text>
          </g>
        ))}
        {Array.from({ length: eMost - eLeast + 1 }, (_, i) => eLeast + i).map((n) => (
          <g key={`e${n}`}>
            <line x1={gx0 - 4} y1={Y(n)} x2={gx0 + 4} y2={Y(n)} stroke={INK2} strokeWidth={1.5} />
            <text x={gx0 - 10} y={Y(n)} fill={INK3} fontSize={16} fontWeight={600} textAnchor="end" dominantBaseline="central" style={{ fontFamily: FONT }}>
              {String(n).replace('-', '−')}
            </text>
          </g>
        ))}
        <text x={gx0 - 34} y={gy1 - 24} fill={INK2} fontSize={18} fontWeight={600} textAnchor="start" style={{ fontFamily: FONT }}>
          Ek max (eV)
        </text>
        <text x={gx1 + 6} y={Y(0) + 46} fill={INK2} fontSize={18} fontWeight={600} textAnchor="end" style={{ fontFamily: FONT }}>
          f (× 10¹⁴ Hz)
        </text>
        <line x1={X(0)} y1={Y(-metal.work)} x2={X(f0)} y2={Y(0)} stroke={INK3} strokeWidth={2.5} strokeDasharray="7 6" />
        <line x1={X(f0)} y1={Y(0)} x2={X(fEnd)} y2={Y(lineAt(fEnd))} stroke={TONES.brand} strokeWidth={4} strokeLinecap="round" />
        <circle cx={X(f0)} cy={Y(0)} r={5} fill={TONES.theta} />
        <text x={X(f0) - 8} y={Y(0) - 12} fill={TONES.theta} fontSize={17} fontWeight={700} textAnchor="end" style={{ fontFamily: FONT }}>
          f₀
        </text>
        <text x={gx0 + 12} y={Y(-metal.work) + 4} fill={METAL} fontSize={17} fontWeight={700} textAnchor="start" dominantBaseline="central" style={{ fontFamily: FONT }}>
          −W
        </text>
        <circle cx={X(0)} cy={Y(-metal.work)} r={4.5} fill={METAL} />
        {inside && (
          <>
            {e > 0 && <line x1={X(f)} y1={Y(0)} x2={X(f)} y2={Y(e)} stroke={color} strokeWidth={1.6} strokeDasharray="4 4" />}
            {e > 0 && <line x1={gx0} y1={Y(e)} x2={X(f)} y2={Y(e)} stroke={color} strokeWidth={1.6} strokeDasharray="4 4" />}
            <circle cx={X(f)} cy={Y(e)} r={8} fill={color} stroke="#0d0c24" strokeWidth={2} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
          </>
        )}
      </g>,
    );
    const slope = part('slope');
    if (slope > 0) {
      const fm = (f0 + fEnd) / 2 + 0.6;
      out.push(
        <text key="slope" x={X(fm) + 12} y={Y(lineAt(fm)) + 16} fill={TONES.brand} fontSize={17} fontWeight={700} textAnchor="start" opacity={slope} style={{ fontFamily: FONT }}>
          slope = h
        </text>,
      );
    }
  }
}

// ── The push of light ─────────────────────────────────────────────────────────────────────────

function drawPush(el: PhotonsEl, plays: Array<[string, number]>, { out, top, HIGH, part }: Frame): void {
  const state = photonsAt(el, plays);
  const push = el.push!;
  const [x0, x1] = [112, 1050];
  const X = (x: number) => x0 + x * (x1 - x0);
  const [names, momentum, force, values] = [part('names'), part('momentum'), part('force'), part('values')];
  out.push(
    <defs key="defs">
      <linearGradient id={`${el.id}-mirror`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#f4f8ff" />
        <stop offset="0.5" stopColor="#93a6cf" />
        <stop offset="1" stopColor="#e3ebff" />
      </linearGradient>
    </defs>,
  );
  const lane = (i: number) => top + (HIGH - top) * (push.surfaces.length === 1 ? 0.52 : i === 0 ? 0.31 : 0.75);
  // Each lane has a line of writing above it: the name of the surface, the power of the beams (once) and the force.
  if (values > 0) out.push(<Value key="power" x={WIDE / 2 + 20} y={lane(0) - 64} pre={push.surfaces.length > 1 ? 'Power of each beam: ' : 'Power of the beam: '} n={push.watts} unit="W" figures={3} color={INK} opacity={values} />);
  push.surfaces.forEach((surface, i) => {
    const cy = lane(i);
    const body = pushAt(state, surface);
    const cx = X(Math.min(body.x, 0.98));
    const mirror = surface === 'mirror';
    out.push(<line key={`track${i}`} x1={x0 - 60} y1={cy + 63} x2={x1 + 40} y2={cy + 63} stroke={INK3} strokeWidth={2} />);
    out.push(<Lamp key={`lamp${i}`} x={80} y={cy} turn={0} nm={state.nm} />);
    const hits = new Map(body.hits.map((hit) => [hit.n, hit]));
    for (const ph of state.sent) {
      const hit = hits.get(ph.n);
      const y = cy + (spotOf(ph.n) - 0.5) * 72;
      const len = Math.max(14, Math.min(60, 30 * (550 / ph.nm)));
      if (!hit) {
        const age = state.time - ph.at;
        if (age < 0) continue;
        const px = X(LANE_SPEED * age);
        out.push(<Packet key={`p${i}-${ph.n}`} at={[px, y]} dir={[1, 0]} nm={ph.nm} opacity={clamp01(age / 0.15)} />);
        if (momentum > 0) out.push(<Shaft key={`m${i}-${ph.n}`} from={[px - len / 2, y + 17]} dir={[1, 0]} len={len} color={MOMENTUM} opacity={momentum * clamp01(age / 0.15)} />);
        continue;
      }
      const since = state.time - hit.at;
      if (mirror) {
        // Sent straight back: its momentum is turned round.
        const px = X(hit.x - LANE_SPEED * since);
        const seen = clamp01((px - x0 - 20) / 90);
        if (seen <= 0) continue;
        out.push(<Packet key={`p${i}-${ph.n}`} at={[px, y]} dir={[-1, 0]} nm={ph.nm} opacity={0.6 * seen} />);
        if (momentum > 0) out.push(<Shaft key={`m${i}-${ph.n}`} from={[px + len / 2, y + 17]} dir={[-1, 0]} len={len} color={MOMENTUM} opacity={0.75 * momentum * seen} />);
      } else if (since < 0.4) out.push(<circle key={`f${i}-${ph.n}`} cx={X(hit.x)} cy={y} r={5 + 12 * (since / 0.4)} fill={photonColour(ph.nm)} opacity={0.7 * (1 - since / 0.4)} />);
    }
    // The surface, on its wheels.
    out.push(
      <g key={`card${i}`}>
        <rect x={cx} y={cy - 52} width={14} height={100} rx={3} fill={mirror ? `url(#${el.id}-mirror)` : '#07070f'} stroke={mirror ? '#f4f8ff' : '#8b8fb5'} strokeWidth={1.8} />
        <rect x={cx - 20} y={cy + 46} width={56} height={9} rx={4} fill="#3a3870" stroke={INK3} strokeWidth={1.5} />
        <circle cx={cx - 9} cy={cy + 58} r={5} fill={INK2} />
        <circle cx={cx + 25} cy={cy + 58} r={5} fill={INK2} />
      </g>,
    );
    if (names > 0) out.push(<Text key={`n${i}`} x={x0 - 60} y={cy - 64} color={INK2} size={19} anchor="start" opacity={names}>{mirror ? 'Mirror: sends the light back' : 'Black card: takes the light in'}</Text>);
    if (force > 0) {
      out.push(<Shaft key={`f${i}`} from={[cx + 22, cy - 6]} dir={[1, 0]} len={mirror ? 96 : 48} color={NET} opacity={force} weight={5} />);
      out.push(<Value key={`fv${i}`} x={x1 + 40} y={cy - 64} pre={mirror ? 'F = 2P ÷ c = ' : 'F = P ÷ c = '} n={lightForce(push.watts, surface)} unit="N" figures={3} color={NET} anchor="end" opacity={force} />);
    }
  });
}

// ── A Compton collision ───────────────────────────────────────────────────────────────────────

/** The speed of a photon in the picture of a collision, in pixels each second; how long the two that leave are followed; and how far apart the crests of the arriving photon are drawn. */
const XRAY_SPEED = 150;
const FOLLOW = COLLIDE_EVERY - COLLIDE_LEAD - 0.3;
const CRESTS = 11;

function drawCompton(el: PhotonsEl, plays: Array<[string, number]>, { out, top, HIGH, part }: Frame): void {
  const state = photonsAt(el, plays);
  const pm = el.nm * 1000;
  const cy = top + (HIGH - top) * 0.5;
  const at: P = [420, cy];
  // The part of the picture that the collision has to itself: what leaves it fades out at the edge.
  const box = { x0: 44, x1: 760, y0: top + 14, y1: HIGH - 14 };
  const room = (dir: P) => Math.min(dir[0] > 1e-6 ? (box.x1 - at[0]) / dir[0] : dir[0] < -1e-6 ? (box.x0 - at[0]) / dir[0] : Infinity, dir[1] > 1e-6 ? (box.y1 - cy) / dir[1] : dir[1] < -1e-6 ? (box.y0 - cy) / dir[1] : Infinity);
  const now = scatterAt(pm, state.angle);
  const way = (degrees: number): P => [Math.cos(degrees * DEG), -Math.sin(degrees * DEG)];
  const along = (from: P, dir: P, len: number): P => [from[0] + dir[0] * len, from[1] + dir[1] * len];
  const [names, angle, values, shift, energy, momentum] = [part('names'), part('angle'), part('values'), part('shift'), part('energy'), part('momentum')];
  const xray = photonColour(el.nm);
  const reach = Math.min(250, (HIGH - top) / 2 - 30);
  let recoiling = 0;

  // The line the photon arrives along, carried on past the electron.
  out.push(<line key="in" x1={60} y1={cy} x2={at[0]} y2={cy} stroke={INK3} strokeWidth={1.5} opacity={0.6} />);
  out.push(<line key="on" x1={at[0]} y1={cy} x2={at[0] + reach + 40} y2={cy} stroke={INK3} strokeWidth={1.5} strokeDasharray="7 7" />);

  if (angle > 0) {
    const tip = along(at, way(state.angle), reach);
    out.push(<line key="out" x1={at[0]} y1={cy} x2={tip[0]} y2={tip[1]} stroke={xray} strokeWidth={1.5} strokeDasharray="3 6" opacity={0.7 * angle} />);
    if (state.angle > 1) {
      const r = 58;
      const end = along(at, way(state.angle), r);
      out.push(<path key="arc" d={`M ${at[0] + r} ${cy} A ${r} ${r} 0 0 0 ${end[0].toFixed(1)} ${end[1].toFixed(1)}`} fill="none" stroke={TONES.theta} strokeWidth={2.5} opacity={angle} />);
    }
    const mid = along(at, way(Math.max(state.angle / 2, 14)), 96);
    out.push(<Text key="theta" x={mid[0]} y={mid[1]} color={TONES.theta} size={21} opacity={angle}>{`θ = ${Math.round(state.angle)}°`}</Text>);
  }

  // The photon on its way in, once in each round.
  const round = state.time % COLLIDE_EVERY;
  if (round < COLLIDE_LEAD) {
    const px = at[0] - 14 - (COLLIDE_LEAD - round) * XRAY_SPEED;
    if (px > 50) out.push(<Packet key="arrive" at={[px, cy]} dir={[1, 0]} nm={el.nm} wave={CRESTS} opacity={clamp01((px - 50) / 40)} />);
  }

  // The latest collision: the photon that leaves, with its crests farther apart, and the electron that recoils.
  const last = state.collisions[state.collisions.length - 1];
  const since = last ? state.time - last.at : -1;
  if (last !== undefined && since >= 0 && since < FOLLOW) {
    const hit = scatterAt(pm, last.angle);
    const fade = clamp01((FOLLOW - since) / 0.5);
    recoiling = clamp01(since / 0.15) * fade;
    const [photonGone, electronGone] = [14 + XRAY_SPEED * since, XRAY_SPEED * hit.beta * since];
    const [photonDir, electronDir] = [way(last.angle), way(hit.electronAngle)];
    const photonAt = along(at, photonDir, photonGone);
    const electronAt = along(at, electronDir, electronGone);
    const photonSeen = fade * clamp01((room(photonDir) - photonGone - 20) / 40);
    const electronSeen = fade * clamp01((room(electronDir) - electronGone - 50) / 40);
    if (since < 0.35 && last.angle > 3) out.push(<circle key="flash" cx={at[0]} cy={cy} r={8 + 22 * (since / 0.35)} fill="#fff" opacity={0.6 * (1 - since / 0.35)} />);
    out.push(<Packet key="leave" at={photonAt} dir={photonDir} nm={el.nm} wave={(CRESTS * hit.after) / pm} opacity={photonSeen} />);
    out.push(<Electron key="recoil" x={electronAt[0]} y={electronAt[1]} glow={false} opacity={electronSeen} />);
    if (hit.beta > 0.01) out.push(<Shaft key="recoil-v" from={along(electronAt, electronDir, 13)} dir={electronDir} len={16 + 90 * hit.beta} color={FAST} opacity={electronSeen} weight={3.5} />);
    if (names > 0 && last.angle > 8) {
      // What leaves: named beside it, on the side away from the line of arrival.
      const side = (dir: P, far: number): P => [-dir[1] * far, dir[0] * far];
      const [ps, es] = [side(photonDir, -30), side(electronDir, 30)];
      out.push(<Text key="n-out" x={photonAt[0] + ps[0]} y={photonAt[1] + ps[1] + 6} color={xray} size={18} anchor={ps[0] < 0 ? 'end' : 'start'} opacity={names * photonSeen * clamp01((photonGone - 70) / 30)}>Scattered photon</Text>);
      out.push(<Text key="n-rec" x={electronAt[0] + es[0]} y={electronAt[1] + es[1] + 6} color={NEGATIVE} size={18} anchor={es[0] < 0 ? 'end' : 'start'} opacity={names * electronSeen * clamp01((electronGone - 26) / 14)}>Electron</Text>);
    }
  } else out.push(<Electron key="rest" x={at[0]} y={cy} glow={false} opacity={last ? clamp01((since - FOLLOW) / 0.3) : 1} />);

  if (names > 0) {
    out.push(<Text key="n-in" x={190} y={cy - 30} color={xray} size={19} opacity={names}>X-ray photon</Text>);
    out.push(<Text key="n-e" x={at[0] - 4} y={cy + 30} color={NEGATIVE} size={19} anchor="end" opacity={names * (1 - recoiling)}>Electron, at rest</Text>);
  }

  // The readouts on the right.
  const RX2 = 800;
  const lengthOf = (n: number) => `${n.toFixed(el.figures ?? 2)} pm`;
  if (values > 0) {
    out.push(<Text key="v-before" x={RX2} y={top + 40} color={xray} size={21} anchor="start" opacity={values}>{`Before: λ = ${lengthOf(pm)}`}</Text>);
    out.push(<Text key="v-after" x={RX2} y={top + 72} color={xray} size={21} anchor="start" opacity={values}>{`After: λ′ = ${lengthOf(now.after)}`}</Text>);
  }
  if (shift > 0) out.push(<Text key="shift" x={RX2} y={top + 104} color={TONES.brand} size={21} anchor="start" opacity={shift}>{`Change: Δλ = ${lengthOf(now.after - pm)}`}</Text>);
  if (energy > 0) {
    const kev = (v: number) => `${(v / 1000).toFixed(1)} keV`;
    out.push(<Text key="e-before" x={RX2} y={top + 152} color={INK} size={20} anchor="start" opacity={energy}>{`Photon before: ${kev(now.before)}`}</Text>);
    out.push(<Text key="e-after" x={RX2} y={top + 182} color={INK} size={20} anchor="start" opacity={energy}>{`Photon after: ${kev(now.left)}`}</Text>);
    out.push(<Text key="e-electron" x={RX2} y={top + 212} color={NEGATIVE} size={20} anchor="start" opacity={energy}>{`Electron gains: ${kev(now.kinetic)}`}</Text>);
  }
  if (momentum > 0) {
    // The momentum before, drawn as the sum of the two afterwards: the three arrows close a triangle.
    const L = 220;
    const o: P = [RX2 + 60, HIGH - 78];
    const tip: P = [o[0] + L, o[1]];
    const corner = along(o, way(state.angle), L * now.photon);
    const gapLen = Math.hypot(tip[0] - corner[0], tip[1] - corner[1]);
    // Each side is named on the outside of the triangle.
    const centre: P = [(o[0] + tip[0] + corner[0]) / 3, (o[1] + tip[1] + corner[1]) / 3];
    const beside = (a: P, b: P): { x: number; y: number; anchor: 'start' | 'end' | 'middle' } => {
      const mid: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const far = Math.hypot(mid[0] - centre[0], mid[1] - centre[1]);
      const dir: P = far > 1 ? [(mid[0] - centre[0]) / far, (mid[1] - centre[1]) / far] : [0, 1];
      return { x: mid[0] + dir[0] * 14, y: mid[1] + dir[1] * 16 + 6, anchor: Math.abs(dir[0]) < 0.35 ? 'middle' : dir[0] > 0 ? 'start' : 'end' };
    };
    const open = state.angle > 12 && state.angle < 168;
    out.push(
      <g key="momentum" opacity={momentum}>
        <Shaft from={o} dir={[1, 0]} len={L} color={INK} weight={4} />
        <Shaft from={o} dir={way(state.angle)} len={L * now.photon} color={MOMENTUM} weight={4} />
        {gapLen > 8 && <Shaft from={corner} dir={[(tip[0] - corner[0]) / gapLen, (tip[1] - corner[1]) / gapLen]} len={gapLen} color={FAST} weight={4} />}
        <Text x={o[0] + L / 2} y={o[1] + 22} color={INK} size={17}>photon before</Text>
        {open && <Text {...beside(o, corner)} color={MOMENTUM} size={17}>photon after</Text>}
        {open && <Text {...beside(corner, tip)} color={FAST} size={17}>electron</Text>}
        <Text x={RX2 + 150} y={HIGH - 24} color={INK2} size={18}>Momentum before = momentum after</Text>
      </g>,
    );
  }
}

export function PhotonsView({ el, st, w, h, plays, fit }: { el: PhotonsEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; fit?: number }) {
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
  const frame: Frame = { out, top, HIGH, part: (name) => ownPart(st, name) };
  if (el.metal) drawMetal(el, played, frame);
  else if (el.push) drawPush(el, played, frame);
  else if (el.compton) drawCompton(el, played, frame);
  else drawBeam(el, played, frame);
  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`${left} 0 ${across} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
