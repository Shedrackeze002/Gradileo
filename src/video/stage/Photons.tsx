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
 */
import type { ReactElement } from 'react';
import type { PhotonsEl } from '../script.ts';
import { visibleColour } from '../light.ts';
import { EV, GAP_SPEED, PLANCK, collected, electronAt, electronFlight, hertzOf, kineticMax, photonJoules, photonVolts, photonsAt, photonsEachSecond, shareOf, spotOf, thresholdHertz } from '../photons.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { NEGATIVE } from './Charges.tsx';
import { Value } from './Light.tsx';
import { clamp01, FONT, INK2, Text } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** The size the pictures are designed at; they are scaled to the room they are given. */
const WIDE = 1136;
const METAL = '#9aa6c4';
const FAST = TONES.good;

type P = [number, number];

/** The colour of light of a wavelength: its own colour when it can be seen, a pale violet for ultraviolet and a pale red for infrared. */
export function photonColour(nm: number): string {
  if (nm < 380) return '#d0bcff';
  if (nm > 750) return '#ffab9a';
  const [r, g, b] = visibleColour(nm);
  return `rgb(${r} ${g} ${b})`;
}

/** An energy in electronvolts, to the hundredth. */
const volts = (n: number) => n.toFixed(2).replace('-', '−');

/** A photon: a short packet of waves that travels along `dir`, with its crests closer together for a shorter wavelength. */
function Packet({ at, dir, nm, opacity = 1 }: { at: P; dir: P; nm: number; opacity?: number }) {
  const color = photonColour(nm);
  const wave = Math.max(6, Math.min(30, (nm / 700) * 22));
  const pts: string[] = [];
  for (let s = -30; s <= 30; s += 1.5) {
    const off = 9 * Math.exp(-((s / 15) ** 2)) * Math.sin((2 * Math.PI * s) / wave);
    pts.push(`${(at[0] + dir[0] * s - dir[1] * off).toFixed(1)},${(at[1] + dir[1] * s + dir[0] * off).toFixed(1)}`);
  }
  return <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />;
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
    if (age <= CROSS) out.push(<Packet key={`p${ph.n}`} at={[x0 + (x1 - x0 - 30) * (age / CROSS) + 12, y]} dir={[1, 0]} nm={ph.nm} opacity={clamp01(age / 0.15)} />);
    else {
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
    out.push(<Value key="v-nm" x={WIDE / 2 - 30} y={top + 32} pre="λ = " n={Math.round(state.nm)} unit="nm" figures={3} color={color} anchor="end" opacity={values} />);
    out.push(<Value key="v-hz" x={WIDE / 2 + 30} y={top + 32} pre="f = " n={hertzOf(state.nm)} unit="Hz" figures={3} color={color} anchor="start" opacity={values} />);
  }
  const bars = part('bars');
  if (bars > 0) {
    // The energy of one photon, on a scale of electronvolts.
    const [bx, by, per] = [WIDE / 2 - 220, HIGH - 104, 110];
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
  const count = part('count');
  if (count > 0) {
    const y = HIGH - (part('energy') > 0 ? 62 : 30);
    if (el.watts !== undefined) out.push(<Value key="count" x={WIDE / 2} y={y} pre="Photons each second: " n={photonsEachSecond(el.watts, state.nm)} unit="" figures={el.figures ?? 2} color={INK} opacity={count} />);
    else out.push(<Text key="count" x={WIDE / 2} y={y} color={INK} size={21} opacity={count}>{`Photons each second: ${Math.round(state.rate)}`}</Text>);
  }
  const energy = part('energy');
  if (energy > 0) {
    out.push(<Value key="e-j" x={WIDE / 2 + 96} y={HIGH - 30} pre="Energy of each photon: E = " n={photonJoules(state.nm)} unit="J" figures={3} color={INK} anchor="end" opacity={energy} />);
    out.push(<Text key="e-v" x={WIDE / 2 + 108} y={HIGH - 30} color={color} size={21} anchor="start" opacity={energy}>{`= ${volts(photonVolts(state.nm))} eV`}</Text>);
  }
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
  else drawBeam(el, played, frame);
  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`${left} 0 ${across} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
