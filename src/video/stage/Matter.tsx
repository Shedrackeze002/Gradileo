/**
 * Matter as a wave (src/video/matter.ts works it all out).
 *
 * A wave: a particle crosses the picture with its de Broglie wave drawn to scale around it, so a
 * faster particle carries a shorter wave. With a voltage, the particle starts from rest between
 * two plates and is accelerated first.
 *
 * A crystal: a gun fires electrons down at a crystal, they come off in every direction but most
 * of all where d sin θ = nλ, and a detector that swings round an arc draws the graph of what it
 * counts.
 *
 * Rings: electrons pass through a thin foil and land on a screen, seen from the side and from the
 * front, where they build up rings that shrink as the electrons are made faster.
 *
 * Slits: one particle at a time leaves a source, its wave goes through both slits, and it lands
 * as a single dot. The dots pile up into the fringes of an interference pattern.
 */
import type { ReactElement } from 'react';
import type { MatterEl } from '../script.ts';
import { FRINGE_REACH, NICKEL, RINGS, SWING, chance, comeOff, deBroglie, electronNm, fringe, landing, massOf, matterAt, nameOf, offAngle, ringLanding, ringRadius, strongAngle, tally, type MatterState } from '../matter.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { NEGATIVE, POSITIVE } from './Charges.tsx';
import { Value } from './Light.tsx';
import { clamp01, FONT, INK2, Text } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** The size the pictures are designed at; they are scaled to the room they are given. */
const WIDE = 1136;
const WAVE = TONES.brand;
const MOMENTUM = TONES.opp;
const PHOTON = TONES.theta;
const DEG = Math.PI / 180;

type P = [number, number];

interface Frame {
  out: ReactElement[];
  top: number;
  HIGH: number;
  part: (name: string) => number;
}

/** A particle: an electron (blue, with a minus sign), a proton (red, with a plus sign) or a ball. */
function Body({ x, y, body, opacity = 1, r = 9 }: { x: number; y: number; body: MatterEl['body']; opacity?: number; r?: number }) {
  if (body !== undefined && typeof body === 'object')
    return (
      <g opacity={opacity}>
        <circle cx={x} cy={y} r={r + 7} fill="#f3f0e6" stroke="#0d0c24" strokeWidth={1.5} />
        <path d={`M ${x - 9} ${y - 12} Q ${x - 2} ${y} ${x - 9} ${y + 12} M ${x + 9} ${y - 12} Q ${x + 2} ${y} ${x + 9} ${y + 12}`} fill="none" stroke="#d24b4b" strokeWidth={1.8} />
      </g>
    );
  const proton = body === 'proton';
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={r} fill={proton ? POSITIVE : NEGATIVE} stroke="#0d0c24" strokeWidth={1.5} />
      <line x1={x - r / 2} y1={y} x2={x + r / 2} y2={y} stroke="#fff" strokeWidth={2.4} strokeLinecap="round" />
      {proton && <line x1={x} y1={y - r / 2} x2={x} y2={y + r / 2} stroke="#fff" strokeWidth={2.4} strokeLinecap="round" />}
    </g>
  );
}

/** A gun that sends out particles: a small housing with an opening on the side they leave by. */
function Gun({ x, y, turn, color }: { x: number; y: number; turn: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn})`}>
      <rect x={-46} y={-19} width={64} height={38} rx={9} fill="#2b2860" stroke={INK3} strokeWidth={2} />
      <rect x={18} y={-9} width={12} height={18} rx={3} fill={color} style={{ filter: `drop-shadow(0 0 7px ${color})` }} />
    </g>
  );
}

/** Many dots at once, as one path. */
function Dots({ at, color, size, opacity = 1 }: { at: P[]; color: string; size: number; opacity?: number }) {
  if (!at.length) return null;
  return <path d={at.map(([x, y]) => `M${x.toFixed(1)} ${y.toFixed(1)}h0.01`).join('')} fill="none" stroke={color} strokeWidth={size} strokeLinecap="round" opacity={opacity} />;
}

// ── A particle and its wave ──────────────────────────────────────────────────────────────────

function drawWave(el: MatterEl, state: MatterState, { out, top, HIGH, part }: Frame): void {
  const mass = massOf(el.body);
  const metres = deBroglie(mass, state.speed);
  const scale = el.scale ?? 220;
  const long = metres * 1e9 * scale;
  const gun = el.speed === undefined;
  const [names, values, momentum, wavelength, ruler, atom] = [part('names'), part('values'), part('momentum'), part('wavelength'), part('scale'), part('atom')];
  const shown = [values, momentum, wavelength].map((p) => p > 0);
  const rowY = (which: number) => HIGH - 30 - 34 * shown.slice(which + 1).filter(Boolean).length;
  const cy = top + (HIGH - top - 100) * 0.5 + 6;
  const [x0, x1] = [60, WIDE - 60];
  const [xc, xa] = [96, 176];
  const gap = xa - xc;

  out.push(<line key="lane" x1={gun ? xa : x0} y1={cy} x2={x1} y2={cy} stroke={INK3} strokeWidth={1.2} strokeDasharray="3 9" opacity={0.6} />);
  if (gun) {
    // Two plates: the particle starts from rest at the first and leaves through a hole in the second.
    out.push(
      <g key="plates">
        <rect x={xc - 8} y={cy - 46} width={8} height={92} rx={2} fill={NEGATIVE} opacity={0.85} />
        <rect x={xa} y={cy - 46} width={8} height={34} rx={2} fill={POSITIVE} opacity={0.85} />
        <rect x={xa} y={cy + 12} width={8} height={34} rx={2} fill={POSITIVE} opacity={0.85} />
      </g>,
    );
    if (names > 0) out.push(<Text key="n-volts" x={(xc + xa) / 2 + 4} y={cy + 70} color={INK2} size={19} opacity={names}>{`${state.volts >= 1000 ? `${(state.volts / 1000).toFixed(1)} kV` : `${Math.round(state.volts)} V`}`}</Text>);
  }

  // Where the particle is: it crosses again and again, with a short wait between.
  const run = x1 - (gun ? xa : x0);
  const lap = run + (gun ? 2 * gap : 0) + 150;
  const u = state.travel % lap;
  const x = gun ? (u < 2 * gap ? xc + (u * u) / (4 * gap) : xa + (u - 2 * gap)) : x0 + u;
  const seen = clamp01(u / 24) * clamp01((x1 + 10 - x) / 50);
  const waved = seen * (gun ? clamp01((x - xa - 16) / 60) : 1);

  if (waved > 0) {
    if (long >= 5) {
      // The wave: a few wavelengths long, strongest at the particle.
      const half = Math.max(110, Math.min(250, 2.4 * long));
      const pts: string[] = [];
      for (let s = -half; s <= half; s += Math.max(1, Math.min(3, long / 10))) {
        const px = x + s;
        if (px < (gun ? xa + 8 : x0) || px > x1) continue;
        pts.push(`${px.toFixed(1)},${(cy - 26 * Math.exp(-((s / (half * 0.52)) ** 2)) * Math.cos((2 * Math.PI * s) / long)).toFixed(1)}`);
      }
      out.push(<polyline key="wave" points={pts.join(' ')} fill="none" stroke={WAVE} strokeWidth={3} strokeLinejoin="round" opacity={waved} style={{ filter: `drop-shadow(0 0 5px ${WAVE})` }} />);
      if (wavelength > 0 && x + long < x1 - 10) {
        // One wavelength, from the crest at the particle to the next one.
        const by = cy - 46;
        out.push(
          <g key="one" opacity={wavelength * waved}>
            <line x1={x} y1={by} x2={x + long} y2={by} stroke={INK} strokeWidth={2} />
            <line x1={x} y1={by - 7} x2={x} y2={by + 7} stroke={INK} strokeWidth={2} />
            <line x1={x + long} y1={by - 7} x2={x + long} y2={by + 7} stroke={INK} strokeWidth={2} />
          </g>,
        );
        out.push(<Text key="one-name" x={x + long / 2} y={by - 18} color={INK} size={21} opacity={wavelength * waved}>λ</Text>);
      }
    }
  }
  if (long < 5 && wavelength > 0) out.push(<Text key="none" x={WIDE / 2} y={cy - 52} color={WAVE} size={20} opacity={wavelength}>Its wavelength is far too short to draw, or to detect</Text>);
  out.push(<Body key="body" x={x} y={cy} body={el.body} opacity={seen} />);
  if (names > 0) out.push(<Text key="name" x={x} y={cy + 44} color={INK2} size={19} opacity={names * seen}>{nameOf(el.body)}</Text>);

  if (ruler > 0) {
    // A ruler for the scale of the picture.
    const unit = [0.1, 0.2, 0.5, 1, 2].find((nm) => nm * scale >= 90) ?? 5;
    const [rx, ry] = [x0 + 6, top + 36];
    out.push(
      <g key="ruler" opacity={ruler}>
        <line x1={rx} y1={ry} x2={rx + unit * scale} y2={ry} stroke={INK2} strokeWidth={2.5} />
        <line x1={rx} y1={ry - 7} x2={rx} y2={ry + 7} stroke={INK2} strokeWidth={2.5} />
        <line x1={rx + unit * scale} y1={ry - 7} x2={rx + unit * scale} y2={ry + 7} stroke={INK2} strokeWidth={2.5} />
      </g>,
    );
    out.push(<Text key="ruler-name" x={rx + unit * scale + 14} y={ry} color={INK2} size={19} anchor="start" opacity={ruler}>{`${unit} nm`}</Text>);
  }
  if (atom > 0) {
    // An atom, about 0.25 nm across, to the same scale.
    const r = 0.125 * scale;
    const [ax, ay] = [x1 - r - 8, top + 22 + r];
    out.push(<circle key="atom" cx={ax} cy={ay} r={r} fill="rgb(167 139 250 / 0.12)" stroke={INK2} strokeWidth={1.8} strokeDasharray="5 5" opacity={atom} />);
    out.push(<Text key="atom-name" x={ax - r - 14} y={ay} color={INK2} size={19} anchor="end" opacity={atom}>An atom, to the same scale</Text>);
  }

  const figures = el.figures ?? 3;
  if (values > 0) {
    out.push(<Value key="v-m" x={WIDE / 2 - 24} y={rowY(0)} pre="m = " n={mass} unit="kg" figures={figures} color={INK} anchor="end" opacity={values} />);
    out.push(<Value key="v-v" x={WIDE / 2 + 24} y={rowY(0)} pre="v = " n={state.speed} unit="m/s" figures={figures} color={TONES.good} anchor="start" opacity={values} />);
  }
  if (momentum > 0) out.push(<Value key="p" x={WIDE / 2} y={rowY(1)} pre="p = mv = " n={mass * state.speed} unit="kg·m/s" figures={figures} color={MOMENTUM} opacity={momentum} />);
  if (wavelength > 0) out.push(<Value key="l" x={WIDE / 2} y={rowY(2)} pre="λ = h ÷ mv = " n={metres} unit="m" figures={figures} color={WAVE} opacity={wavelength} />);
}

// ── Electrons and a crystal ──────────────────────────────────────────────────────────────────

/** How fast an electron crosses the picture of a crystal, in pixels each second. */
const FLY = 430;

function drawCrystal(_el: MatterEl, state: MatterState, { out, top, HIGH, part }: Frame): void {
  const d = NICKEL;
  const [names, values, plot, peak] = [part('names'), part('values'), part('plot'), part('peak')];
  const C: P = [300, HIGH - 100];
  const arc = Math.min(250, C[1] - top - 64);
  const gunY = C[1] - arc - 8;
  const nmNow = electronNm(Math.max(1, state.volts));
  const way = (degrees: number, side = 1): P => [side * Math.sin(degrees * DEG), -Math.cos(degrees * DEG)];
  const on = (degrees: number, far: number, side = 1): P => [C[0] + way(degrees, side)[0] * far, C[1] + way(degrees, side)[1] * far];

  // The crystal: rows of atoms, with its face to the gun.
  const atoms: ReactElement[] = [];
  for (let row = 0; row < 3; row++) for (let i = -5; i <= 5; i++) atoms.push(<circle key={`${row}:${i}`} cx={C[0] + i * 22 + (row % 2 ? 11 : 0)} cy={C[1] + 12 + row * 19} r={8.5} fill="#8fa3c8" stroke="#0d0c24" strokeWidth={1.2} />);
  out.push(
    <g key="crystal">
      <rect x={C[0] - 128} y={C[1]} width={267} height={64} rx={8} fill="rgb(143 163 200 / 0.14)" stroke="rgb(188 217 255 / 0.35)" strokeWidth={1.4} />
      {atoms}
    </g>,
  );
  out.push(<line key="beam" x1={C[0]} y1={gunY + 30} x2={C[0]} y2={C[1]} stroke={NEGATIVE} strokeWidth={1.5} strokeDasharray="4 7" opacity={0.55} />);
  out.push(<Gun key="gun" x={C[0]} y={gunY} turn={90} color={NEGATIVE} />);

  // The arc that the detector swings round, and the detector.
  const [a0, a1] = [on(SWING[0], arc), on(SWING[1], arc)];
  out.push(<path key="arc" d={`M ${a0[0].toFixed(1)} ${a0[1].toFixed(1)} A ${arc} ${arc} 0 0 1 ${a1[0].toFixed(1)} ${a1[1].toFixed(1)}`} fill="none" stroke={INK3} strokeWidth={1.5} strokeDasharray="2 7" />);
  const det = on(state.detector, arc + 16);
  out.push(
    <g key="detector" transform={`translate(${det[0].toFixed(1)} ${det[1].toFixed(1)}) rotate(${state.detector})`}>
      <rect x={-20} y={-17} width={40} height={30} rx={7} fill="#2b2860" stroke={TONES.theta} strokeWidth={2.2} />
      <rect x={-12} y={11} width={24} height={7} rx={2} fill={TONES.theta} />
    </g>,
  );
  if (plot > 0 || peak > 0) {
    // The angle of the detector, from the line of the beam.
    const r = 54;
    const end = on(state.detector, r);
    out.push(<line key="to-det" x1={C[0]} y1={C[1]} x2={on(state.detector, arc)[0]} y2={on(state.detector, arc)[1]} stroke={TONES.theta} strokeWidth={1.4} strokeDasharray="3 6" opacity={0.7 * Math.max(plot, peak)} />);
    out.push(<path key="angle" d={`M ${C[0]} ${C[1] - r} A ${r} ${r} 0 0 1 ${end[0].toFixed(1)} ${end[1].toFixed(1)}`} fill="none" stroke={TONES.theta} strokeWidth={2.4} opacity={Math.max(plot, peak)} />);
    const mid = on(state.detector / 2, r + 30);
    out.push(<Text key="angle-name" x={mid[0] + 8} y={mid[1]} color={TONES.theta} size={20} opacity={Math.max(plot, peak)}>{`${Math.round(state.detector)}°`}</Text>);
  }

  // The electrons: down the beam, then off the crystal at the angle each one draws.
  const down = (C[1] - gunY - 30) / FLY;
  const dots: P[] = [];
  for (let i = state.sent.length - 1; i >= 0; i--) {
    const e = state.sent[i];
    const age = state.time - e.at;
    if (age > down + (arc + 40) / FLY) break;
    if (age < down) dots.push([C[0], gunY + 30 + age * FLY]);
    else {
      const far = (age - down) * FLY;
      const side = chance(e.n, 8) < 0.5 ? -1 : 1;
      const at = on(offAngle(e.n, electronNm(Math.max(1, e.volts)), d), far, side);
      if (far < arc + 6 && at[1] < C[1] - 2) dots.push(at);
    }
  }
  out.push(<Dots key="electrons" at={dots} color={NEGATIVE} size={9} />);

  if (names > 0) {
    out.push(<Text key="n-gun" x={C[0] - 32} y={gunY - 18} color={INK2} size={19} anchor="end" opacity={names}>Electron gun</Text>);
    out.push(<Text key="n-crystal" x={C[0]} y={C[1] + 82} color={INK2} size={19} opacity={names}>Nickel crystal</Text>);
    out.push(<Text key="n-det" x={det[0] + 30} y={det[1] - 4} color={TONES.theta} size={19} anchor="start" opacity={names}>Detector</Text>);
  }
  if (values > 0) {
    out.push(<Text key="v-e" x={44} y={top + 34} color={INK} size={20} anchor="start" opacity={values}>{`Kinetic energy: ${Math.round(state.volts)} eV`}</Text>);
    out.push(<Text key="v-l" x={44} y={top + 64} color={WAVE} size={20} anchor="start" opacity={values}>{`λ = h ÷ p = ${nmNow.toFixed(3)} nm`}</Text>);
  }

  // The graph of what the detector counts, drawn as it swings.
  const [gx0, gx1, gy0, gy1] = [680, 1076, HIGH - 70, top + 56];
  const GX = (degrees: number) => gx0 + (degrees / 90) * (gx1 - gx0);
  const most = 1.35;
  const GY = (bright: number) => gy0 + (bright / most) * (gy1 - gy0);
  if (plot > 0) {
    out.push(
      <g key="axes" opacity={plot}>
        <line x1={gx0} y1={gy0} x2={gx1 + 10} y2={gy0} stroke={INK2} strokeWidth={2} />
        <line x1={gx0} y1={gy0} x2={gx0} y2={gy1 - 14} stroke={INK2} strokeWidth={2} />
        {[0, 30, 60, 90].map((a) => (
          <g key={a}>
            <line x1={GX(a)} y1={gy0} x2={GX(a)} y2={gy0 + 7} stroke={INK2} strokeWidth={1.6} />
            <text x={GX(a)} y={gy0 + 24} fill={INK3} fontSize={16} fontWeight={600} textAnchor="middle" style={{ fontFamily: FONT }}>{`${a}°`}</text>
          </g>
        ))}
      </g>,
    );
    out.push(<Text key="ax-x" x={(gx0 + gx1) / 2} y={gy0 + 50} color={INK2} size={18} opacity={plot}>Angle of the detector</Text>);
    out.push(<Text key="ax-y" x={gx0 - 6} y={gy1 - 30} color={INK2} size={18} anchor="start" opacity={plot}>Electrons counted each second</Text>);
    const pts: string[] = [];
    for (let a = state.swept[0]; a <= state.swept[1] + 1e-9; a += 0.5) pts.push(`${GX(a).toFixed(1)},${GY(comeOff(a, nmNow, d)).toFixed(1)}`);
    if (pts.length > 1) out.push(<polyline key="trace" points={pts.join(' ')} fill="none" stroke={TONES.theta} strokeWidth={3} strokeLinejoin="round" opacity={plot} />);
    out.push(<circle key="now" cx={GX(state.detector)} cy={GY(comeOff(state.detector, nmNow, d))} r={7} fill={TONES.theta} stroke="#0d0c24" strokeWidth={1.5} opacity={plot} />);
  }
  const strong = strongAngle(nmNow, d);
  if (peak > 0 && strong !== undefined) {
    out.push(<line key="peak" x1={GX(strong)} y1={gy0} x2={GX(strong)} y2={GY(comeOff(strong, nmNow, d)) - 8} stroke={WAVE} strokeWidth={2} strokeDasharray="5 5" opacity={peak} />);
    out.push(<Text key="peak-name" x={GX(strong)} y={GY(comeOff(strong, nmNow, d)) - 26} color={WAVE} size={19} opacity={peak}>{`A peak near ${Math.round(strong)}°`}</Text>);
  }
}

// ── Rings from a foil ────────────────────────────────────────────────────────────────────────

/** How long a dot glows on the screen of the rings, in seconds, before it fades. */
const GLOW = 4.5;

function drawRings(el: MatterEl, state: MatterState, { out, top, HIGH, part }: Frame): void {
  const [names, values, rings] = [part('names'), part('values'), part('rings')];
  const cy = top + (HIGH - top) * 0.5 - (values > 0 || names > 0 ? 8 : 0);
  const R = Math.min(178, (HIGH - top) / 2 - 44);
  const centre: P = [838, cy];
  const [gunX, foilX, sideX] = [84, 300, 500];
  const side = Math.min(150, R * 0.86);
  const nmNow = electronNm(Math.max(1, state.volts));
  const spread = el.spread ?? 24;

  // From the side: the gun, the foil and the screen on its edge.
  out.push(<Gun key="gun" x={gunX} y={cy} turn={0} color={NEGATIVE} />);
  out.push(<line key="beam" x1={gunX + 30} y1={cy} x2={foilX} y2={cy} stroke={NEGATIVE} strokeWidth={1.5} strokeDasharray="4 7" opacity={0.55} />);
  out.push(<rect key="foil" x={foilX - 3} y={cy - 44} width={6} height={88} rx={2} fill="#c9b458" stroke="#0d0c24" strokeWidth={1} />);
  out.push(<rect key="edge" x={sideX} y={cy - side - 16} width={7} height={2 * side + 32} rx={3} fill="#1f5c46" stroke="rgb(188 217 255 / 0.4)" strokeWidth={1.2} />);
  RINGS.forEach((_, k) => {
    const r = Math.min(1.05, ringRadius(nmNow, k, spread)) * side;
    for (const s of [-1, 1]) out.push(<line key={`cone${k}${s}`} x1={foilX} y1={cy} x2={sideX} y2={cy + s * r} stroke={WAVE} strokeWidth={1.2} opacity={0.45} />);
  });

  // From the front: the screen, with the dots that still glow.
  out.push(<circle key="screen" cx={centre[0]} cy={centre[1]} r={R} fill="#0d2a22" stroke="rgb(188 217 255 / 0.4)" strokeWidth={1.6} />);
  const [t1, t2] = [(foilX - gunX - 30) / 520, (sideX - foilX) / 520];
  const buckets: P[][] = [[], [], [], []];
  const flying: P[] = [];
  const every = Math.max(1, Math.ceil(state.rate / 7));
  for (let i = state.sent.length - 1; i >= 0; i--) {
    const e = state.sent[i];
    const age = state.time - e.at;
    if (age > t1 + t2 + GLOW) break;
    const hit = ringLanding(e.n, electronNm(Math.max(1, e.volts)), spread);
    if (age < t1 + t2) {
      if (e.n % every) continue;
      // On its way: along the beam, then off at its own angle.
      if (age < t1) flying.push([gunX + 30 + age * 520, cy]);
      else flying.push([foilX + (age - t1) * 520, cy + ((age - t1) / t2) * Math.min(1.05, hit.r) * side * Math.sin(hit.turn)]);
      continue;
    }
    if (hit.r > 1) continue;
    const glow = age - t1 - t2;
    buckets[Math.min(3, Math.floor((glow / GLOW) * 4))].push([centre[0] + hit.r * R * Math.cos(hit.turn), centre[1] + hit.r * R * Math.sin(hit.turn)]);
  }
  buckets.forEach((at, i) => out.push(<Dots key={`glow${i}`} at={at} color="#9dffcf" size={4.6} opacity={[1, 0.85, 0.6, 0.3][i]} />));
  out.push(<Dots key="flying" at={flying} color={NEGATIVE} size={8} />);
  if (rings > 0)
    RINGS.forEach((_, k) => {
      const r = ringRadius(nmNow, k, spread) * R;
      if (r < R) out.push(<circle key={`ring${k}`} cx={centre[0]} cy={centre[1]} r={r} fill="none" stroke={WAVE} strokeWidth={1.6} strokeDasharray="6 7" opacity={0.8 * rings} />);
    });

  if (names > 0) {
    out.push(<Text key="n-gun" x={gunX - 10} y={cy + 44} color={INK2} size={18} opacity={names}>Electron gun</Text>);
    out.push(<Text key="n-foil" x={foilX} y={cy - 62} color={INK2} size={18} opacity={names}>Thin metal foil</Text>);
    out.push(<Text key="n-edge" x={sideX + 4} y={cy + side + 36} color={INK2} size={18} opacity={names}>Screen, from the side</Text>);
    out.push(<Text key="n-front" x={centre[0]} y={cy + R + 22} color={INK2} size={18} opacity={names}>The screen, from the front</Text>);
  }
  if (values > 0) {
    out.push(<Text key="v-v" x={40} y={HIGH - 56} color={INK} size={20} anchor="start" opacity={values}>{`Accelerated through ${state.volts >= 1000 ? `${(state.volts / 1000).toFixed(1)} kV` : `${Math.round(state.volts)} V`}`}</Text>);
    out.push(<Text key="v-l" x={40} y={HIGH - 26} color={WAVE} size={20} anchor="start" opacity={values}>{`λ = ${nmNow >= 0.1 ? `${nmNow.toFixed(3)} nm` : `${(nmNow * 1000).toFixed(1)} pm`}`}</Text>);
  }
}

// ── Two slits, one particle at a time ────────────────────────────────────────────────────────

/** How long a particle takes from the source to the slits, and from the slits to the screen, in seconds of video. */
const TO_SLITS = 0.55;
const TO_SCREEN = 0.6;
const BINS = 66;
/** The area under the pattern, in fringe spacings, so that a count can be set beside the brightness. */
const AREA = (() => {
  let sum = 0;
  for (let i = 0; i < 2200; i++) sum += fringe(-FRINGE_REACH + ((i + 0.5) / 2200) * 2 * FRINGE_REACH) * ((2 * FRINGE_REACH) / 2200);
  return sum;
})();

function drawSlits(el: MatterEl, state: MatterState, { out, top, HIGH, part }: Frame): void {
  const [names, count, bars, curve] = [part('names'), part('count'), part('bars'), part('curve')];
  const photon = el.particle !== 'electron';
  const color = photon ? PHOTON : NEGATIVE;
  const cy = top + (HIGH - top) * 0.5;
  const F = (HIGH - top - 44) / (2 * FRINGE_REACH);
  const [srcX, wallX, sx0, sx1, bx0] = [92, 340, 640, 730, 756];
  const slits = [cy - 27, cy + 27];
  const wide = 300;

  // The source, the wall with its two slits, and the screen.
  out.push(<Gun key="source" x={srcX} y={cy} turn={0} color={color} />);
  const wall = [top + 16, slits[0] - 7, slits[0] + 7, slits[1] - 7, slits[1] + 7, HIGH - 16];
  for (let i = 0; i < 3; i++) out.push(<rect key={`wall${i}`} x={wallX - 5} y={wall[2 * i]} width={10} height={wall[2 * i + 1] - wall[2 * i]} rx={2} fill="#8b8fb5" />);
  out.push(<rect key="screen" x={sx0} y={top + 16} width={sx1 - sx0} height={HIGH - top - 32} rx={5} fill="rgb(8 7 28 / 0.9)" stroke="rgb(188 217 255 / 0.4)" strokeWidth={1.4} />);

  // The particles that have landed, and the ones on their way.
  const flight = TO_SLITS + TO_SCREEN;
  const every = Math.max(1, Math.ceil(state.rate / 5));
  const dots: P[] = [];
  let landed = 0;
  const waves: ReactElement[] = [];
  for (const e of state.sent) {
    const age = state.time - e.at;
    if (age >= flight) {
      landed = e.n;
      dots.push([sx0 + 7 + chance(e.n, 7) * (sx1 - sx0 - 14), cy + landing(e.n) * F]);
      if (age < flight + 0.35 && e.n % every === 0) waves.push(<circle key={`flash${e.n}`} cx={sx0 + 7 + chance(e.n, 7) * (sx1 - sx0 - 14)} cy={cy + landing(e.n) * F} r={3 + 9 * ((age - flight) / 0.35)} fill="none" stroke={color} strokeWidth={2} opacity={1 - (age - flight) / 0.35} />);
      continue;
    }
    if (age < 0 || e.n % every) continue;
    if (age < TO_SLITS) {
      // Its wave spreads out from the source.
      for (let j = 0; j < 3; j++) {
        const r = (age / TO_SLITS) * (wallX - srcX - 34) - j * 10;
        if (r < 8) continue;
        const a = Math.min(0.62, 86 / r);
        waves.push(<path key={`w${e.n}-${j}`} d={`M ${(srcX + 30 + r * Math.cos(a)).toFixed(1)} ${(cy - r * Math.sin(a)).toFixed(1)} A ${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${(srcX + 30 + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`} fill="none" stroke={color} strokeWidth={2.4} opacity={0.75 - j * 0.2} />);
      }
    } else {
      // Past the wall, a wave spreads from each slit.
      const k = (age - TO_SLITS) / TO_SCREEN;
      for (const sy of slits)
        for (let j = 0; j < 2; j++) {
          const r = k * (sx0 - wallX) - j * 11;
          if (r < 6) continue;
          const a = Math.min(1.25, Math.asin(Math.min(1, ((HIGH - top) / 2 - 20) / r)));
          waves.push(<path key={`s${e.n}-${sy}-${j}`} d={`M ${(wallX + r * Math.cos(a)).toFixed(1)} ${(sy - r * Math.sin(a)).toFixed(1)} A ${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${(wallX + r * Math.cos(a)).toFixed(1)} ${(sy + r * Math.sin(a)).toFixed(1)}`} fill="none" stroke={color} strokeWidth={2} opacity={(0.6 - j * 0.2) * (1 - 0.6 * k)} />);
        }
    }
  }
  // The waves stay inside the panel, and stop at the screen.
  out.push(
    <clipPath key="waves-clip" id={`matter-waves-${el.id}`}>
      <rect x={-400} y={2} width={sx0 + 400} height={HIGH - 4} />
    </clipPath>,
  );
  out.push(<g key="waves" clipPath={`url(#matter-waves-${el.id})`}>{waves}</g>);
  out.push(<Dots key="dots" at={dots} color={color} size={dots.length > 1500 ? 3.2 : dots.length > 400 ? 4 : 5} opacity={0.95} />);

  // Beside the screen: the count in each strip, and the brightness that the wave predicts.
  const tall = (2 * FRINGE_REACH * F) / BINS;
  const expected = (landed * ((2 * FRINGE_REACH) / BINS)) / AREA;
  const each = Math.min(13, wide / Math.max(1e-9, expected));
  if (bars > 0 && landed > 0) {
    const counts = tally(landed, BINS);
    out.push(
      <g key="bars" opacity={bars}>
        {counts.map((n, i) => (n ? <rect key={i} x={bx0} y={cy - FRINGE_REACH * F + i * tall + 0.6} width={Math.min(wide + 60, n * each)} height={tall - 1.2} fill={color} opacity={0.8} /> : null))}
      </g>,
    );
  }
  if (curve > 0) {
    const pts: string[] = [];
    for (let y = -FRINGE_REACH; y <= FRINGE_REACH + 1e-9; y += 0.04) pts.push(`${(bx0 + wide * fringe(y)).toFixed(1)},${(cy + y * F).toFixed(1)}`);
    out.push(<polyline key="curve" points={pts.join(' ')} fill="none" stroke={WAVE} strokeWidth={2.6} strokeLinejoin="round" opacity={curve} />);
    out.push(<Text key="curve-name" x={bx0 + wide + 6} y={top + 30} color={WAVE} size={18} anchor="end" opacity={curve}>Wave: chance of landing</Text>);
  }

  if (names > 0) {
    out.push(<Text key="n-src" x={srcX - 12} y={cy + 44} color={INK2} size={18} opacity={names}>{photon ? 'Very dim light' : 'Electron gun'}</Text>);
    out.push(<Text key="n-slits" x={wallX + 18} y={HIGH - 30} color={INK2} size={18} anchor="start" opacity={names}>Two slits</Text>);
    out.push(<Text key="n-screen" x={sx0 - 12} y={HIGH - 30} color={INK2} size={18} anchor="end" opacity={names}>Screen</Text>);
  }
  if (count > 0) out.push(<Text key="count" x={srcX - 40} y={HIGH - 30} color={INK} size={21} anchor="start" opacity={count}>{`${photon ? 'Photons' : 'Electrons'} so far: ${landed}`}</Text>);
}

export function MatterView({ el, st, w, h, plays, fit }: { el: MatterEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; fit?: number }) {
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
  const state = matterAt(el, played);
  if (el.picture === 'wave') drawWave(el, state, frame);
  else if (el.picture === 'crystal') drawCrystal(el, state, frame);
  else if (el.picture === 'rings') drawRings(el, state, frame);
  else drawSlits(el, state, frame);
  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`${left} 0 ${across} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
