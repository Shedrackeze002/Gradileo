/**
 * The three radiations (src/video/radiation.ts works it all out).
 *
 * Alpha particles, beta particles and gamma rays from a source: in three lanes, with the paper, the
 * aluminium and the lead that stop them, the ions they leave and a counter that clicks; or in one
 * beam that a field bends.
 */
import type { ReactElement } from 'react';
import type { RadiationEl } from '../script.ts';
import { chance } from '../matter.ts';
import { AIR, ALL, bendOf, bornAt, clicks, COUNTER, flights, radiationAt, RAYS, SHIELDS, slopeOf, SOURCE, stepAt, type RadiationState, type Ray, type Shield } from '../radiation.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { NEGATIVE, POSITIVE } from './Charges.tsx';
import { clamp01, FONT, INK2, Text } from './motionKit.tsx';
import { NEUTRON } from './Nucleus.tsx';
import { Packet } from './Photons.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** The size the pictures are designed at; they are scaled to the room they are given. */
const WIDE = 1136;
const GAMMA = '#bfe3ff';
const COLOURS: Record<Ray, string> = { alpha: POSITIVE, beta: NEGATIVE, gamma: GAMMA };
/** The seconds that an ion stays in the picture. */
const ION = 2.4;

interface Frame {
  out: ReactElement[];
  el: RadiationEl;
  state: RadiationState;
  top: number;
  HIGH: number;
  part: (name: string) => number;
}

/** One particle: an alpha particle as two protons and two neutrons, a beta particle as an electron, a gamma ray as a packet of waves. */
function Particle({ ray, x, y, opacity = 1, dir = [1, 0] }: { ray: Ray; x: number; y: number; opacity?: number; dir?: [number, number] }) {
  if (opacity <= 0) return null;
  if (ray === 'gamma') return <Packet at={[x, y]} dir={dir} nm={0.001} wave={7} opacity={opacity} />;
  if (ray === 'beta')
    return (
      <g opacity={opacity} style={{ filter: `drop-shadow(0 0 5px ${NEGATIVE})` }}>
        <circle cx={x} cy={y} r={6} fill={NEGATIVE} stroke="#0d0c24" strokeWidth={1.2} />
        <text x={x} y={y + 4} textAnchor="middle" fontSize={12} fontWeight={700} fill="#fff" style={{ fontFamily: FONT }}>
          −
        </text>
      </g>
    );
  const four: Array<[number, number, string]> = [
    [-5, -5, POSITIVE],
    [5, -4, NEUTRON],
    [-4, 5, NEUTRON],
    [5, 6, POSITIVE],
  ];
  return (
    <g opacity={opacity} style={{ filter: `drop-shadow(0 0 5px ${POSITIVE})` }}>
      {four.map(([dx, dy, color], i) => (
        <circle key={i} cx={x + dx} cy={y + dy} r={6.5} fill={color} stroke="#0d0c24" strokeWidth={1.2} />
      ))}
    </g>
  );
}

/** The source: a block with an opening for each beam that leaves it. */
function Source({ x, ys, open, name }: { x: number; ys: number[]; open: boolean; name: number }) {
  const [y0, y1] = [Math.min(...ys) - 46, Math.max(...ys) + 46];
  return (
    <g>
      <rect x={x - 112} y={y0} width={112} height={y1 - y0} rx={10} fill="#2a2850" stroke="rgb(188 217 255 / 0.5)" strokeWidth={2} />
      {ys.map((y) => (
        <rect key={y} x={x - 16} y={y - 13} width={16} height={26} fill={open ? '#0d0c24' : '#55527e'} />
      ))}
      {name > 0 && (
        <Text x={x - 56} y={y0 - 20} color={INK2} size={18} opacity={name}>
          {open ? 'Source' : 'Source (closed)'}
        </Text>
      )}
    </g>
  );
}

function drawThrough({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, ions, air, counter] = [part('names'), part('ions'), part('air'), part('counter')];
  const rays = el.rays ?? ALL;
  const time = state.time;
  // The lanes, evenly down the picture.
  const room = HIGH - top - 70;
  const laneOf = (ray: Ray) => top + 28 + (room * (rays.indexOf(ray) + 0.5)) / rays.length;
  const [y0, y1] = [top + 34, HIGH - 48];

  out.push(<Source key="source" x={SOURCE} ys={rays.map(laneOf)} open={state.now.open} name={names} />);
  for (const ray of rays) {
    out.push(<line key={`lane-${ray}`} x1={SOURCE} y1={laneOf(ray)} x2={COUNTER + (counter > 0 ? 0 : 110)} y2={laneOf(ray)} stroke={COLOURS[ray]} strokeWidth={1} strokeDasharray="2 9" opacity={0.3} />);
    out.push(<Text key={`in-${ray}`} x={SOURCE - 64} y={laneOf(ray)} color={COLOURS[ray]} size={19}>{RAYS[ray].name}</Text>);
  }

  // The shields slide in from above.
  const tones: Record<Shield, [string, string]> = { paper: ['#f4f1e6', '#bdb8a4'], aluminium: ['#c3ccd8', '#8791a1'], lead: ['#5b6379', '#3c4257'] };
  for (const shield of ['paper', 'aluminium', 'lead'] as const) {
    const s = state.slide[shield];
    if (s <= 0) continue;
    const { x, w, name } = SHIELDS[shield];
    const dy = -(1 - s) * (y1 - y0 + 30);
    out.push(<rect key={shield} x={x} y={y0 + dy} width={w} height={y1 - y0} rx={Math.min(6, w / 2)} fill={tones[shield][0]} stroke={tones[shield][1]} strokeWidth={2} opacity={clamp01(s * 1.6)} />);
    if (names > 0) out.push(<Text key={`${shield}-n`} x={x + w / 2} y={HIGH - 24} color={INK} size={18} opacity={names * clamp01(s * 2 - 1)}>{name}</Text>);
  }
  // With no paper in the way, a few centimetres of air stop an alpha particle.
  if (rays.includes('alpha') && air > 0 && state.slide.paper < 0.5) out.push(<Text key="air" x={AIR + 14} y={laneOf('alpha') - 30} color={INK2} size={17} anchor="start" opacity={air * (1 - state.slide.paper * 2)}>Stopped by a few centimetres of air</Text>);

  // The particles, the ions they leave behind them, and a flash where one is stopped.
  for (const f of flights(el, state)) {
    const y = laneOf(f.ray);
    const { speed, ions: gap } = RAYS[f.ray];
    if (ions > 0) {
      const first = Math.max(1, Math.floor((speed * (time - f.born - ION)) / gap));
      for (let j = first; SOURCE + j * gap < f.x; j++) {
        const ix = SOURCE + j * gap + (chance(j + 1, 80 + f.n) - 0.5) * gap * 0.6;
        const age = time - (f.born + (ix - SOURCE) / speed);
        if (age < 0 || age > ION) continue;
        const up = 5 + 9 * chance(j + 1, 81 + f.n) + 5 * age;
        const fade = ions * (1 - age / ION) * 0.9;
        out.push(<circle key={`i${f.ray}${f.n}-${j}a`} cx={ix} cy={y - up} r={2.6} fill={TONES.bad} opacity={fade} />);
        out.push(<circle key={`i${f.ray}${f.n}-${j}b`} cx={ix + 3} cy={y + up} r={2.2} fill={TONES.adj} opacity={fade} />);
      }
    }
    // A particle comes into view as it leaves the opening of the source.
    if (f.ended < 0) out.push(<Particle key={`p${f.ray}${f.n}`} ray={f.ray} x={f.x} y={y} opacity={clamp01((f.x - SOURCE - (f.ray === 'gamma' ? 20 : 4)) / 24)} />);
    else if (f.stops !== undefined && f.ended < 0.5) {
      out.push(<Particle key={`p${f.ray}${f.n}`} ray={f.ray} x={f.x} y={y} opacity={1 - f.ended / 0.5} />);
      out.push(<circle key={`s${f.ray}${f.n}`} cx={f.x} cy={y} r={8 + 30 * f.ended} fill="none" stroke={COLOURS[f.ray]} strokeWidth={2} opacity={(1 - f.ended / 0.5) * 0.8} />);
    }
  }

  // The counter: a tube that flashes for each click, with the clicks counted.
  if (counter > 0) {
    const times = clicks(el, state);
    const last = times.length ? time - times[times.length - 1] : Infinity;
    const flash = clamp01(1 - last / 0.22);
    out.push(<rect key="tube" x={COUNTER} y={y0} width={96} height={y1 - y0} rx={22} fill={`rgb(52 211 153 / ${0.08 + 0.4 * flash})`} stroke={TONES.good} strokeWidth={2 + 3 * flash} opacity={counter} />);
    out.push(<line key="wire" x1={COUNTER + 48} y1={y0 + 16} x2={COUNTER + 48} y2={y1 - 16} stroke={TONES.good} strokeWidth={2} opacity={0.7 * counter} />);
    out.push(<Text key="tube-n" x={COUNTER + 48} y={top + 16} color={TONES.good} size={18} opacity={counter}>Counter</Text>);
    out.push(<Text key="tube-c" x={COUNTER + 48} y={HIGH - 24} color={INK} size={19} opacity={counter}>{`Clicks: ${times.length}`}</Text>);
  }
}

function drawFields({ out, el, state, top, HIGH, part }: Frame): void {
  const [names, screen] = [part('names'), part('screen')];
  const rays = el.rays ?? ALL;
  const time = state.time;
  const cy = top + (HIGH - top) / 2;
  const [x0, x1, wall] = [340, 760, 990];
  const { field, strength } = state;
  // The path of a radiation: straight to the field, bent inside it, and straight on from where it leaves.
  const pathOf = (ray: Ray, x: number) => {
    if (x <= x0) return cy;
    if (x <= x1) return cy + bendOf(ray, field, strength, (x - x0) / (x1 - x0));
    return cy + bendOf(ray, field, strength, 1) + (slopeOf(ray, field, strength) * (x - x1)) / (x1 - x0);
  };

  // The field: two charged plates, or a field into the page.
  if (field === 'electric' && strength > 0) {
    for (const [y, sign, color] of [[cy - 128, '+', POSITIVE], [cy + 128, '−', NEGATIVE]] as const) {
      out.push(<rect key={`plate${sign}`} x={x0} y={y - 7} width={x1 - x0} height={14} rx={5} fill={color} opacity={0.85 * strength} />);
      for (let i = 0; i < 7; i++) out.push(<text key={`sign${sign}${i}`} x={x0 + 30 + i * 60} y={y + (sign === '+' ? -14 : 28)} textAnchor="middle" fontSize={20} fontWeight={700} fill={color} opacity={strength} style={{ fontFamily: FONT }}>{sign}</text>);
    }
    if (names > 0) {
      out.push(<Text key="plate-p" x={x1 + 14} y={cy - 128} color={POSITIVE} size={17} anchor="start" opacity={names * strength}>Positive plate</Text>);
      out.push(<Text key="plate-n" x={x1 + 14} y={cy + 128} color={NEGATIVE} size={17} anchor="start" opacity={names * strength}>Negative plate</Text>);
    }
  }
  if (field === 'magnetic' && strength > 0) {
    out.push(<rect key="region" x={x0} y={cy - 135} width={x1 - x0} height={270} rx={12} fill="rgb(167 139 250 / 0.07)" stroke={TONES.brand} strokeWidth={1.5} strokeDasharray="6 7" opacity={strength} />);
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 5; j++) {
        const [x, y] = [x0 + 30 + i * 51.5, cy - 108 + j * 54];
        out.push(<path key={`x${i}-${j}`} d={`M ${x - 6} ${y - 6} L ${x + 6} ${y + 6} M ${x + 6} ${y - 6} L ${x - 6} ${y + 6}`} stroke={TONES.brand} strokeWidth={2} opacity={0.55 * strength} />);
      }
    if (names > 0) out.push(<Text key="region-n" x={(x0 + x1) / 2} y={cy - 152} color={TONES.brand} size={17} opacity={names * strength}>Magnetic field, into the page</Text>);
  }

  out.push(<Source key="source" x={SOURCE} ys={[cy]} open={state.now.open} name={names} />);
  // Where each radiation goes, as a faint line, and the screen it lands on.
  for (const ray of rays) {
    const pts: string[] = [];
    for (let x = SOURCE; x <= wall; x += 10) pts.push(`${x},${pathOf(ray, x).toFixed(1)}`);
    out.push(<polyline key={`path-${ray}`} points={pts.join(' ')} fill="none" stroke={COLOURS[ray]} strokeWidth={1.6} strokeDasharray="3 8" opacity={0.5} />);
  }
  if (screen > 0) {
    out.push(<rect key="wall" x={wall} y={top + 18} width={10} height={HIGH - top - 36} rx={4} fill="rgb(188 217 255 / 0.35)" opacity={screen} />);
    // The names sit beside the places where the radiations land, kept apart when those are close together.
    const lands = rays.map((ray) => ({ ray, y: pathOf(ray, wall) })).sort((a, b) => a.y - b.y);
    const places = lands.map((l) => l.y);
    for (let i = 1; i < places.length; i++) places[i] = Math.max(places[i], places[i - 1] + 24);
    for (let i = places.length - 2; i >= 0; i--) places[i] = Math.min(places[i], places[i + 1] - 24);
    lands.forEach((l, i) => {
      out.push(<circle key={`land-${l.ray}`} cx={wall} cy={l.y} r={8} fill={COLOURS[l.ray]} opacity={0.9 * screen} style={{ filter: `drop-shadow(0 0 6px ${COLOURS[l.ray]})` }} />);
      out.push(<Text key={`land-n-${l.ray}`} x={wall + 22} y={places[i]} color={COLOURS[l.ray]} size={19} anchor="start" opacity={screen}>{RAYS[l.ray].name}</Text>);
    });
  }
  // The particles of the beam, one after another.
  for (const ray of rays) {
    const speed = RAYS[ray].speed * 1.2;
    for (let n = 0; bornAt(ray, n) <= time; n++) {
      const born = bornAt(ray, n);
      const x = SOURCE + speed * (time - born);
      if (x > wall || !stepAt(state.steps, born).open) continue;
      const [y, ahead] = [pathOf(ray, x), pathOf(ray, x + 6)];
      const len = Math.hypot(6, ahead - y);
      out.push(<Particle key={`p${ray}${n}`} ray={ray} x={x} y={y} dir={[6 / len, (ahead - y) / len]} opacity={clamp01((x - SOURCE - (ray === 'gamma' ? 20 : 4)) / 24)} />);
    }
  }
  if (names > 0 && strength > 0.5 && field !== 'off') out.push(<Text key="note" x={SOURCE - 112} y={HIGH - 24} color={INK3} size={16} anchor="start" opacity={names * (strength * 2 - 1)}>Not to scale: a beta particle bends far more than this beside an alpha particle</Text>);
}

export function RadiationView({ el, st, w, h, plays, fit }: { el: RadiationEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; fit?: number }) {
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
  const frame: Frame = { out, el, state: radiationAt(el, played), top, HIGH, part: (name) => ownPart(st, name) };
  if (el.picture === 'fields') drawFields(frame);
  else drawThrough(frame);
  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`${left} 0 ${across} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
