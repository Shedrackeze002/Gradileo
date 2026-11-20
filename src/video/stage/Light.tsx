/**
 * Light as an electromagnetic wave (src/video/light.ts works out all seven pictures).
 *
 * A wave: an electron is driven up and down an aerial at the left, and the wave runs to the
 * right. Its electric field is yellow arrows that point up and down; its magnetic field is violet
 * arrows drawn on a slant, which stand for towards you and away from you. A polarizing filter is
 * a plate across the path with lines along the direction it passes.
 *
 * A spectrum: a band from radio waves to gamma rays, on a scale where each step is ten times
 * shorter, with a pointer that slides along it and a wave over it that shortens as it goes.
 *
 * A trip: a flash that crosses from a source to a target, and perhaps back, under a clock.
 *
 * A spinning mirror: Michelson's eight-sided mirror, a light source over it, a detector under
 * it, and a fixed mirror far to the right.
 *
 * A prism: white light that comes in from the left, crosses a glass prism and lands on a screen
 * as a spectrum, each colour on the path Snell's law gives it.
 *
 * A fibre: a lamp at one end of an optical fibre with a gentle bend, a ray that zigzags along the
 * core, and a detector at the far end.
 *
 * A grating: a beam that comes in from the left, crosses a diffraction grating and lands on a
 * curved screen as bright lines, each at the angle that d sin θ = n λ gives it.
 */
import type { ReactElement } from 'react';
import type { LightEl, LightShape } from '../script.ts';
import { C, FACE, FIBRE, GRATING_COLOURS, PRISM_COLOURS, REGIONS, TOLERANCE, chargeAt, gratingAngle, gratingAt, gratingBrightness, gratingOrders, gratingSpacing, fibreAt, fibreCentre, fibreCritical, fibreIndex, fibrePath, fibreSlope, fieldAt, lightWaveAt, prismAt, prismIndex, prismPath, prismShape, realHertz, realMetres, reflectRay, regionOf, roundTrip, samplePixels, spectrumAt, spectrumShare, spinAt, tiltOf, tripAt, tripMetres, turnInTrip, visibleColour, type Vec } from '../light.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Arrow, clamp01, FONT, INK2, Text } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

const ELECTRIC = TONES.theta;
const MAGNETIC = TONES.brand;
const LIGHT = '#FFE9A8';
const BACK = '#17143c';
/** The size the pictures are designed at; they are scaled to the room they are given. */
const WIDE = 1136;

/** A number to so many figures, with a zero kept at the end ("3.0"); from ten thousand up, the thousands are set apart by a thin space. */
function figuresOf(n: number, figures: number): string {
  if (!(Math.abs(n) > 0)) return '0';
  const rounded = Number(n.toPrecision(figures));
  const whole = Math.floor(Math.log10(Math.abs(rounded))) + 1;
  const places = Math.max(0, figures - whole);
  const written = rounded.toLocaleString('en-US', { minimumFractionDigits: places, maximumFractionDigits: places });
  return written.replace(/,/g, Math.abs(rounded) >= 10000 ? ' ' : '');
}

/** A number as it is written in the lessons: plainly from a thousandth up to a million, and otherwise as a number from 1 to 10 times a power of ten ([mantissa, power]). */
export function written(n: number, figures: number): [string, number | null] {
  if (!(Math.abs(n) > 0)) return ['0', null];
  if (Math.abs(n) >= 1e-3 && Math.abs(n) < 1e6) return [figuresOf(n, figures), null];
  let power = Math.floor(Math.log10(Math.abs(n)));
  let mantissa = Number((n / 10 ** power).toPrecision(figures));
  if (Math.abs(mantissa) >= 10) {
    mantissa /= 10;
    power += 1;
  }
  return [figuresOf(mantissa, figures), power];
}

/** A length in the unit that suits it, from kilometres down to picometres: [the number, the unit]. */
export function lengthIn(metres: number): [number, string] {
  const units: Array<[number, string]> = [
    [1e3, 'km'],
    [1, 'm'],
    [1e-2, 'cm'],
    [1e-3, 'mm'],
    [1e-6, 'μm'],
    [1e-9, 'nm'],
    [1e-12, 'pm'],
  ];
  const [size, unit] = units.find(([u]) => metres >= u * 0.9995) ?? [1, 'm'];
  // A length too long for kilometres, or too short for picometres, stays in metres, to be written with a power of ten.
  return unit === 'km' && metres >= 1e6 ? [metres, 'm'] : [metres / size, unit];
}

/** A frequency in the unit that suits it, up to gigahertz: [the number, the unit]. */
export function hertzIn(hertz: number): [number, string] {
  if (hertz >= 1e12 || hertz < 1) return [hertz, 'Hz'];
  if (hertz >= 1e9) return [hertz / 1e9, 'GHz'];
  if (hertz >= 1e6) return [hertz / 1e6, 'MHz'];
  if (hertz >= 1e3) return [hertz / 1e3, 'kHz'];
  return [hertz, 'Hz'];
}

/** A quantity written out: "λ = 3.05 m", or "f = 5.45 × 10¹⁴ Hz" with the power raised. */
export function Value({ x, y, pre, n, unit, figures = 3, color = INK, anchor = 'middle', size = 21, opacity = 1 }: { x: number; y: number; pre: string; n: number; unit: string; figures?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; size?: number; opacity?: number }) {
  const [mantissa, power] = written(n, figures);
  return (
    <text x={x} y={y} fill={color} fontSize={size} fontWeight={600} textAnchor={anchor} dominantBaseline="central" opacity={opacity} style={{ fontFamily: FONT, fontVariantNumeric: 'tabular-nums', paintOrder: 'stroke', stroke: 'rgb(13 12 36 / 0.85)', strokeWidth: 4, strokeLinejoin: 'round' }}>
      {pre}
      {mantissa}
      {power !== null && (
        <>
          {' × 10'}
          <tspan dy="-0.42em" fontSize="0.68em">
            {String(power).replace('-', '−')}
          </tspan>
          <tspan dy="0.42em" fontSize="0.68em">
            {' '}
          </tspan>
        </>
      )}
      {power === null ? ` ${unit}` : unit}
    </text>
  );
}

/** A thin arrow from one point to another, with a small head: one arrow of a field. */
function Dart({ from, to, color, opacity = 1 }: { from: [number, number]; to: [number, number]; color: string; opacity?: number }) {
  const [dx, dy] = [to[0] - from[0], to[1] - from[1]];
  const len = Math.hypot(dx, dy);
  if (len < 2.5) return null;
  const [ux, uy] = [dx / len, dy / len];
  const head = Math.min(9, len * 0.6);
  const [bx, by] = [to[0] - ux * head, to[1] - uy * head];
  return (
    <g opacity={opacity}>
      <line x1={from[0]} y1={from[1]} x2={bx} y2={by} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <polygon points={`${to[0]},${to[1]} ${bx - uy * 4.4},${by + ux * 4.4} ${bx + uy * 4.4},${by - ux * 4.4}`} fill={color} />
    </g>
  );
}

/** A flash of light at a place, with a short tail behind it (`back` is the unit vector it came from). */
function Flash({ x, y, back, opacity = 1 }: { x: number; y: number; back: [number, number]; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <line x1={x} y1={y} x2={x + back[0] * 70} y2={y + back[1] * 70} stroke={LIGHT} strokeWidth={5} strokeLinecap="round" opacity={0.28} />
      <line x1={x} y1={y} x2={x + back[0] * 34} y2={y + back[1] * 34} stroke={LIGHT} strokeWidth={5} strokeLinecap="round" opacity={0.5} />
      <circle cx={x} cy={y} r={17} fill={ELECTRIC} opacity={0.3} />
      <circle cx={x} cy={y} r={7} fill="#fff8e0" />
    </g>
  );
}

interface Frame {
  out: ReactElement[];
  top: number;
  HIGH: number;
  part: (name: string) => number;
  figures: number;
}

// ── A wave from an aerial ─────────────────────────────────────────────────────────────────────

function drawWave(el: LightEl, plays: Array<[string, number]>, { out, top, HIGH, part, figures }: Frame): void {
  const w = el.wave!;
  const state = lightWaveAt(el, plays);
  const [electricPart, magneticPart, wavelengthPart, speedPart, valuesPart] = ['electric', 'magnetic', 'wavelength', 'speed', 'values'].map(part);
  // The slanted arrows of the magnetic field reach past each end of the path, so the path stops short of the edges.
  const [x0, x1] = [120, WIDE - 96];
  const L = x1 - x0;
  const mid = top + (HIGH - top) / 2;
  const A = Math.min(96, (HIGH - top) * 0.27);
  // Towards you is drawn down and to the left.
  const Z: [number, number] = [-0.6, 0.42];
  const at = (x: number, up: number, near: number): [number, number] => [x + near * Z[0] * A, mid - up * A + near * Z[1] * A];

  // The fields along the path, finely for the curves and more coarsely for the arrows.
  const fine: Array<{ x: number; e: [number, number]; b: [number, number] }> = [];
  for (let x = x0; x <= x1 + 0.01; x += 6) fine.push({ x, ...fieldAt(el, state, (x - x0) / L) });
  const curve = (key: 'e' | 'b') => fine.map((f) => at(f.x, f[key][0], f[key][1]).join(',')).join(' ');
  // The slanted arrows of the magnetic field are set further apart, so that each one can be told from the next.
  const arrows = (key: 'e' | 'b', color: string, opacity: number) =>
    fine.filter((_, i) => i % (key === 'b' ? 5 : 3) === 2).map((f) => <Dart key={`${key}${f.x}`} from={[f.x, mid]} to={at(f.x, f[key][0], f[key][1])} color={color} opacity={opacity} />);

  if (magneticPart > 0)
    out.push(
      <g key="magnetic" opacity={magneticPart}>
        <polygon points={`${x0},${mid} ${curve('b')} ${x1},${mid}`} fill={MAGNETIC} opacity={0.1} />
        <polyline points={curve('b')} fill="none" stroke={MAGNETIC} strokeWidth={2.2} strokeLinejoin="round" opacity={0.8} />
        {arrows('b', MAGNETIC, 0.95)}
        <Text x={x0 + 44} y={HIGH - 30} anchor="start" color={MAGNETIC} size={21}>Magnetic field</Text>
      </g>,
    );
  out.push(<line key="axis" x1={x0} y1={mid} x2={x1} y2={mid} stroke={INK3} strokeWidth={1.5} strokeDasharray="5 6" opacity={0.8} />);
  if (electricPart > 0)
    out.push(
      <g key="electric" opacity={electricPart}>
        <polygon points={`${x0},${mid} ${curve('e')} ${x1},${mid}`} fill={ELECTRIC} opacity={0.1} />
        <polyline points={curve('e')} fill="none" stroke={ELECTRIC} strokeWidth={2.2} strokeLinejoin="round" opacity={0.8} />
        {arrows('e', ELECTRIC, 0.95)}
        <Text x={x0 + 44} y={top + 30} anchor="start" color={ELECTRIC} size={21}>Electric field</Text>
      </g>,
    );

  // The polarizing filter: a plate across the path, with lines along the direction it passes.
  if (w.filter) {
    const xf = x0 + w.filter.at * L;
    const theta = (state.angle * Math.PI) / 180;
    const [hy, hz] = [1.28, 1.05];
    const corner = (y: number, z: number) => at(xf, y, z).join(',');
    const lines: ReactElement[] = [];
    for (let o = -1.2; o <= 1.2001; o += 0.2) {
      // A line through o × (−sin θ, cos θ), along (cos θ, sin θ), cut to the plate.
      const [cy, cz] = [-o * Math.sin(theta), o * Math.cos(theta)];
      const [dy, dz] = [Math.cos(theta), Math.sin(theta)];
      let [t0, t1] = [-9, 9];
      for (const [c, d, half] of [
        [cy, dy, hy - 0.08],
        [cz, dz, hz - 0.08],
      ]) {
        if (Math.abs(d) < 1e-9) {
          if (Math.abs(c) > half) t0 = 9;
          continue;
        }
        const [a, b] = [(-half - c) / d, (half - c) / d];
        t0 = Math.max(t0, Math.min(a, b));
        t1 = Math.min(t1, Math.max(a, b));
      }
      if (t1 - t0 < 0.05) continue;
      const [p, q] = [at(xf, cy + dy * t0, cz + dz * t0), at(xf, cy + dy * t1, cz + dz * t1)];
      lines.push(<line key={o.toFixed(1)} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={INK2} strokeWidth={2} strokeLinecap="round" opacity={0.75} />);
    }
    out.push(
      <g key="filter">
        <polygon points={`${corner(hy, hz)} ${corner(hy, -hz)} ${corner(-hy, -hz)} ${corner(-hy, hz)}`} fill="rgb(120 130 190 / 0.16)" stroke={INK2} strokeWidth={2.5} strokeLinejoin="round" />
        {lines}
        <Text x={xf + 18} y={Math.max(top + 22, mid - hy * A - hz * Z[1] * A - 20)} size={19} color={INK2}>Polarizing filter</Text>
      </g>,
    );
  }

  // The aerial, and the electron that is driven up and down it.
  const swing = A * 0.78;
  out.push(
    <g key="aerial">
      <line x1={x0} y1={mid - A - 14} x2={x0} y2={mid + A + 14} stroke="#d9d5f2" strokeWidth={6} strokeLinecap="round" />
      <rect x={x0 - 26} y={mid + A + 12} width={52} height={24} rx={5} fill="#3b3866" stroke={INK2} strokeWidth={2.2} />
      <circle cx={x0} cy={mid - chargeAt(state) * swing} r={17} fill={TONES.adj} opacity={0.3} />
      <circle cx={x0} cy={mid - chargeAt(state) * swing} r={11} fill={TONES.adj} stroke="#0d0c24" strokeWidth={2} />
      <line x1={x0 - 5} y1={mid - chargeAt(state) * swing} x2={x0 + 5} y2={mid - chargeAt(state) * swing} stroke="#0d0c24" strokeWidth={2.6} strokeLinecap="round" />
      <Text x={x0 - 22} y={mid - A - 30} size={18} color={INK2} anchor="middle">Aerial</Text>
    </g>,
  );

  // One wavelength: from one crest of the electric field to the next (or from one trough to the next, when two crests are not both in view). The crests nearest the aerial are passed over, so that the measure stays clear of the names in the corners.
  if (wavelengthPart > 0) {
    const limit = w.filter ? x0 + w.filter.at * L : x1;
    const turns = (sign: number): number[] => {
      const found: number[] = [];
      for (let i = 1; i < fine.length - 1 && found.length < 2; i++) {
        const [before, here, after] = [fine[i - 1].e[0] * sign, fine[i].e[0] * sign, fine[i + 1].e[0] * sign];
        if (fine[i].x > x0 + 190 && fine[i].x < limit && here > 0.9 && here >= before && here > after) found.push(fine[i].x);
      }
      return found;
    };
    const [crests, troughs] = [turns(1), turns(-1)];
    const ends = crests.length === 2 ? crests : troughs.length === 2 ? troughs : null;
    if (ends) {
      const side = ends === crests ? -1 : 1;
      const y = mid + side * (A + 22);
      const [a, b] = ends;
      out.push(
        <g key="wavelength" opacity={wavelengthPart}>
          <path d={`M${a},${y - 9} V${y + 9} M${b},${y - 9} V${y + 9} M${a},${y} H${b} M${a + 10},${y - 6} L${a},${y} L${a + 10},${y + 6} M${b - 10},${y - 6} L${b},${y} L${b - 10},${y + 6}`} fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          {w.real ? (
            <Value x={(a + b) / 2} y={y + side * 20} pre="λ = " n={lengthIn(realMetres(el, state))[0]} unit={lengthIn(realMetres(el, state))[1]} figures={figures} size={21} />
          ) : (
            <Text x={(a + b) / 2} y={y + side * 20} size={22}>λ</Text>
          )}
        </g>,
      );
    }
  }
  if (valuesPart > 0 && w.real) {
    const [f, unit] = hertzIn(realHertz(el, state));
    out.push(<Value key="values" x={WIDE - 44} y={top + 30} anchor="end" pre="f = " n={f} unit={unit} figures={figures} color={INK} size={22} opacity={valuesPart} />);
  }
  if (speedPart > 0)
    out.push(
      <g key="speed" opacity={speedPart}>
        <Arrow x={WIDE - 348} y={HIGH - 30} len={70} color={TONES.good} weight={6} />
        <Value x={WIDE - 44} y={HIGH - 30} anchor="end" pre="c = " n={C} unit="m/s" figures={3} color={TONES.good} size={22} />
      </g>,
    );
}

// ── The spectrum ──────────────────────────────────────────────────────────────────────────────

/** The colour a wave of a wavelength is drawn in: its own colour if it can be seen, a dull red below red and a violet beyond violet, and a pale blue otherwise. */
function waveColour(metres: number): string {
  const id = regionOf(metres).id;
  if (id === 'visible') return `rgb(${visibleColour(metres * 1e9).join(' ')})`;
  if (id === 'infrared') return '#f0a79a';
  if (id === 'ultraviolet') return '#c3b0ff';
  return '#cfd6ff';
}

function drawSpectrum(el: LightEl, plays: Array<[string, number]>, { out, top, part }: Frame): void {
  const state = spectrumAt(el, plays);
  const [wavePart, valuesPart, scalePart, madePart, usePart, visiblePart, ionizingPart, arrowsPart] = ['wave', 'values', 'scale', 'made', 'use', 'visible', 'ionizing', 'arrows'].map(part);
  const [bl, br] = [24, WIDE - 24];
  const xOf = (metres: number) => bl + clamp01(spectrumShare(metres)) * (br - bl);
  const region = regionOf(state.metres);
  const px = xOf(state.metres);
  const colour = waveColour(state.metres);
  const [bandTop, bandHigh] = [top + 228, 46];
  const bandBottom = bandTop + bandHigh;

  // The wave over the spectrum: it moves along at one speed, and shortens as the pointer slides.
  if (wavePart > 0) {
    const wl = samplePixels(state.metres);
    const [yw, amp] = [top + 52, 30];
    const pts: string[] = [];
    for (let x = 40; x <= WIDE - 40; x += Math.max(1, Math.min(4, wl / 10))) pts.push(`${x},${(yw - amp * Math.sin(2 * Math.PI * ((x - WIDE / 2) / wl - state.cycles))).toFixed(2)}`);
    out.push(
      <g key="wave" opacity={wavePart}>
        <polyline points={pts.join(' ')} fill="none" stroke={colour} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${colour}66)` }} />
      </g>,
    );
  }

  // The name of the region at the pointer, with its wavelength and frequency, what makes it and one use.
  const cx = Math.max(300, Math.min(WIDE - 300, px));
  out.push(<Text key="name" x={cx} y={top + 108} size={28} color={colour} weight={700}>{region.name}</Text>);
  if (valuesPart > 0) {
    const [len, unit] = lengthIn(state.metres);
    out.push(
      <g key="values" opacity={valuesPart}>
        <Value x={cx - 16} y={top + 138} anchor="end" pre="λ = " n={len} unit={unit} figures={2} size={20} />
        <Value x={cx + 16} y={top + 138} anchor="start" pre="f = " n={C / state.metres} unit="Hz" figures={2} size={20} />
      </g>,
    );
  }
  if (madePart > 0) out.push(<Text key="made" x={cx} y={top + 164} size={18} color={INK2} opacity={madePart} weight={500}>{`Made by ${region.made}`}</Text>);
  if (usePart > 0) out.push(<Text key="use" x={cx} y={top + 187} size={18} color={INK2} opacity={usePart} weight={500}>{`Used for ${region.use}`}</Text>);

  // The band, a box for each region. Visible light is a sliver, drawn in its own colours.
  const boxes: ReactElement[] = [];
  REGIONS.forEach((r, i) => {
    const [a, b] = [i === 0 ? bl : xOf(REGIONS[i - 1].down), i === REGIONS.length - 1 ? br : xOf(r.down)];
    const here = r.id === region.id;
    if (r.id === 'visible') {
      const stops = [700, 650, 600, 550, 500, 450, 400];
      boxes.push(
        <g key={r.id}>
          <defs>
            <linearGradient id={`${el.id}-sliver`} x1="0" x2="1" y1="0" y2="0">
              {stops.map((nm, k) => (
                <stop key={nm} offset={k / (stops.length - 1)} stopColor={`rgb(${visibleColour(nm).join(' ')})`} />
              ))}
            </linearGradient>
          </defs>
          <rect x={a} y={bandTop - 5} width={b - a} height={bandHigh + 10} fill={`url(#${el.id}-sliver)`} stroke={INK} strokeWidth={here ? 2.5 : 1.2} />
        </g>,
      );
      return;
    }
    boxes.push(
      <g key={r.id}>
        <rect x={a} y={bandTop} width={b - a} height={bandHigh} fill={here ? 'rgb(167 139 250 / 0.3)' : 'rgb(120 130 190 / 0.12)'} stroke={here ? INK : INK3} strokeWidth={here ? 2.5 : 1.5} />
        <Text x={(a + b) / 2} y={bandTop + bandHigh / 2} size={17} color={here ? INK : INK2} weight={here ? 700 : 500}>{r.name}</Text>
      </g>,
    );
  });
  out.push(<g key="band">{boxes}</g>);
  out.push(<polygon key="pointer" points={`${px},${bandTop - 6} ${px - 9},${bandTop - 20} ${px + 9},${bandTop - 20}`} fill={INK} />);

  if (scalePart > 0) {
    const marks: Array<[number, string]> = [
      [1e3, '1 km'],
      [1, '1 m'],
      [1e-3, '1 mm'],
      [1e-6, '1 μm'],
      [1e-9, '1 nm'],
      [1e-12, '1 pm'],
    ];
    out.push(
      <g key="scale" opacity={scalePart}>
        {marks.map(([metres, name]) => (
          <g key={name}>
            <line x1={xOf(metres)} y1={bandBottom} x2={xOf(metres)} y2={bandBottom + 9} stroke={INK2} strokeWidth={2} />
            <Text x={xOf(metres)} y={bandBottom + 25} size={16} color={INK2} weight={500}>{name}</Text>
          </g>
        ))}
      </g>,
    );
  }
  if (arrowsPart > 0) {
    const y = bandBottom + 58;
    out.push(
      <g key="arrows" opacity={arrowsPart}>
        <Arrow x={270} y={y} len={-230} color={INK2} weight={5} />
        <Text x={284} y={y} anchor="start" size={18} color={INK2}>longer wavelength</Text>
        <Arrow x={WIDE - 270} y={y} len={230} color={INK2} weight={5} />
        <Text x={WIDE - 284} y={y} anchor="end" size={18} color={INK2}>higher frequency</Text>
      </g>,
    );
  }
  if (ionizingPart > 0) {
    const [a, y] = [xOf(4e-7), bandBottom + 58];
    out.push(
      <g key="ionizing" opacity={ionizingPart}>
        <path d={`M${a},${y - 10} V${y} H${br} V${y - 10}`} fill="none" stroke={TONES.opp} strokeWidth={2.6} strokeLinejoin="round" strokeLinecap="round" />
        <Text x={(a + br) / 2 + 60} y={y + 20} size={18} color={TONES.opp}>Ionizing radiation</Text>
      </g>,
    );
  }
  if (visiblePart > 0) {
    const [va, vb, vy, vh] = [398, 738, bandBottom + 92, 34];
    const [sa, sb] = [xOf(7e-7), xOf(4e-7)];
    const stops: ReactElement[] = [];
    for (let nm = 700; nm >= 400; nm -= 10) stops.push(<stop key={nm} offset={(700 - nm) / 300} stopColor={`rgb(${visibleColour(nm).join(' ')})`} />);
    out.push(
      <g key="visible" opacity={visiblePart}>
        <defs>
          <linearGradient id={`${el.id}-rainbow`} x1="0" x2="1" y1="0" y2="0">
            {stops}
          </linearGradient>
        </defs>
        {/* The lines that open the band out step aside for the labels that are written across them. */}
        <path d={`M${sa},${bandBottom + 5} L${va},${vy} M${sb},${bandBottom + 5} L${vb},${vy}`} stroke={INK3} strokeWidth={1.5} strokeDasharray="4 5" fill="none" opacity={1 - Math.max(arrowsPart, ionizingPart)} />
        <rect x={va} y={vy} width={vb - va} height={vh} rx={5} fill={`url(#${el.id}-rainbow)`} stroke={INK} strokeWidth={1.5} />
        <Text x={va - 14} y={vy + vh / 2} anchor="end" size={18} color={`rgb(${visibleColour(680).join(' ')})`}>red, 700 nm</Text>
        <Text x={vb + 14} y={vy + vh / 2} anchor="start" size={18} color={`rgb(${visibleColour(410).join(' ')})`}>violet, 400 nm</Text>
      </g>,
    );
  }
}

// ── A trip ────────────────────────────────────────────────────────────────────────────────────

/** Something at an end of a trip, drawn about (x, y). `faces` is +1 when it looks to the right and −1 when it looks to the left. */
function Shape({ shape, x, y, faces }: { shape: LightShape; x: number; y: number; faces: number }) {
  switch (shape) {
    case 'sun':
      return (
        <g>
          <circle cx={x} cy={y} r={62} fill={ELECTRIC} opacity={0.16} />
          {Array.from({ length: 12 }, (_, k) => {
            const a = (k * Math.PI) / 6;
            return <line key={k} x1={x + 48 * Math.cos(a)} y1={y + 48 * Math.sin(a)} x2={x + 60 * Math.cos(a)} y2={y + 60 * Math.sin(a)} stroke={ELECTRIC} strokeWidth={4} strokeLinecap="round" />;
          })}
          <circle cx={x} cy={y} r={40} fill={ELECTRIC} stroke="#fff3c4" strokeWidth={2.5} />
        </g>
      );
    case 'earth':
      return (
        <g>
          <circle cx={x} cy={y} r={34} fill="#3b82c4" stroke="#bfe0ff" strokeWidth={2.5} />
          <path d={`M${x - 20},${y - 14} q10,-12 22,-6 q4,10 -6,14 q-2,10 -12,6 z M${x + 4},${y + 6} q12,-6 18,4 q-2,12 -12,14 q-8,-6 -6,-18 z`} fill="#4fbf8a" />
        </g>
      );
    case 'moon':
      return (
        <g>
          <circle cx={x} cy={y} r={26} fill="#cfd0dc" stroke="#f2f2fa" strokeWidth={2} />
          <circle cx={x - 8} cy={y - 6} r={5} fill="#a9aabb" />
          <circle cx={x + 8} cy={y + 8} r={7} fill="#a9aabb" />
          <circle cx={x + 6} cy={y - 12} r={3} fill="#a9aabb" />
        </g>
      );
    case 'dish':
      return (
        <g>
          <path d={`M${x - 20},${y + 62} L${x},${y + 8} L${x + 20},${y + 62} Z`} fill="#3b3866" stroke={INK2} strokeWidth={2.5} strokeLinejoin="round" />
          <path d={`M${x + faces * 6},${y - 44} Q${x - faces * 34},${y} ${x + faces * 6},${y + 44} Z`} fill="#4a4780" stroke={INK} strokeWidth={2.8} strokeLinejoin="round" />
          <line x1={x - faces * 12} y1={y} x2={x + faces * 30} y2={y} stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
          <circle cx={x + faces * 30} cy={y} r={5} fill={ELECTRIC} />
        </g>
      );
    case 'plane':
      return (
        <g transform={`translate(${x} ${y}) scale(${-faces} 1)`}>
          <path d="M-52,0 Q-40,-9 -6,-9 L30,-9 L44,-30 L54,-30 L48,-8 Q54,-4 54,0 Q54,5 44,7 L-6,9 Q-40,9 -52,0 Z" fill="#cfd6ff" stroke="#0d0c24" strokeWidth={1.5} strokeLinejoin="round" />
          <path d="M-8,2 L18,34 L30,34 L16,2 Z" fill="#aab2e6" stroke="#0d0c24" strokeWidth={1.5} strokeLinejoin="round" />
          <path d="M-36,-3 h9" stroke="#0d0c24" strokeWidth={3} strokeLinecap="round" />
        </g>
      );
    case 'lamp':
      return (
        <g>
          <rect x={x - 30} y={y - 22} width={60} height={44} rx={7} fill="#3b3866" stroke={INK2} strokeWidth={2.5} />
          <circle cx={x + faces * 30} cy={y} r={10} fill={ELECTRIC} stroke="#fff3c4" strokeWidth={2} />
        </g>
      );
    default:
      return (
        <g>
          <rect x={x - 5} y={y - 50} width={10} height={100} rx={2} fill="#e8ecff" />
          {Array.from({ length: 7 }, (_, k) => (
            <line key={k} x1={x + faces * -5} y1={y - 44 + k * 15} x2={x + faces * -17} y2={y - 34 + k * 15} stroke={INK3} strokeWidth={2} />
          ))}
        </g>
      );
  }
}

function drawTrip(el: LightEl, plays: Array<[string, number]>, { out, top, HIGH, part, figures }: Frame): void {
  const trip = el.trip!;
  const state = tripAt(el, plays);
  const [clockPart, distancePart, travelledPart] = ['clock', 'distance', 'travelled'].map(part);
  const mid = top + (HIGH - top) * 0.52;
  const [sx, tx] = [140, WIDE - 140];
  // The flash leaves the edge of the source, and stops at the edge of the target.
  const reach: Record<LightShape, number> = { sun: 66, earth: 40, moon: 32, dish: 40, plane: 58, lamp: 44, mirror: 12 };
  const [xa, xb] = [sx + reach[trip.from.shape], tx - reach[trip.to.shape]];
  const lengthUnit = (metres: number) => (trip.length ? { n: metres / trip.length.metres, unit: trip.length.unit } : { n: metres, unit: 'm' });

  out.push(<line key="path" x1={xa} y1={mid} x2={xb} y2={mid} stroke={INK3} strokeWidth={1.5} strokeDasharray="5 7" opacity={0.8} />);
  out.push(
    <g key="ends">
      <Shape shape={trip.from.shape} x={sx} y={mid} faces={1} />
      <Shape shape={trip.to.shape} x={tx} y={mid} faces={-1} />
      {trip.from.label && <Text x={sx} y={mid + 92} size={19} color={INK2}>{trip.from.label}</Text>}
      {trip.to.label && <Text x={tx} y={mid + 92} size={19} color={INK2}>{trip.to.label}</Text>}
    </g>,
  );
  if (state.left !== null) {
    const x = xa + (state.out / trip.metres) * (xb - xa);
    // On its way out the flash runs a little above the line, and on its way back a little below it.
    const y = mid + (state.back ? 9 : -9);
    const trail = state.back ? `M${xb},${mid + 9} H${x}` : `M${xa},${mid - 9} H${x}`;
    out.push(
      <g key="flash">
        {state.back && <path d={`M${xa},${mid - 9} H${xb}`} stroke={LIGHT} strokeWidth={2.5} opacity={0.22} strokeLinecap="round" />}
        <path d={trail} stroke={LIGHT} strokeWidth={2.5} opacity={0.3} strokeLinecap="round" />
        <Flash x={x} y={y} back={[state.back ? 1 : -1, 0]} opacity={state.done ? 0.55 : 1} />
      </g>,
    );
  }
  if (distancePart > 0) {
    const y = mid - 92;
    const { n, unit } = lengthUnit(trip.metres);
    out.push(
      <g key="distance" opacity={distancePart}>
        <path d={`M${sx},${y - 9} V${y + 9} M${tx},${y - 9} V${y + 9} M${sx},${y} H${tx} M${sx + 11},${y - 6} L${sx},${y} L${sx + 11},${y + 6} M${tx - 11},${y - 6} L${tx},${y} L${tx - 11},${y + 6}`} fill="none" stroke={INK2} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={WIDE / 2 - 110} y={y - 16} width={220} height={32} fill={BACK} opacity={0.96} rx={6} />
        <Value x={WIDE / 2} y={y} pre="d = " n={n} unit={unit} figures={figures} size={21} />
      </g>,
    );
  }
  if (clockPart > 0) {
    const unit = trip.clock ?? { unit: 's', seconds: 1 };
    const total = tripMetres(el) / C / unit.seconds;
    const now = state.clock / unit.seconds;
    const text = total >= 100 ? String(Math.round(now)) : now.toFixed(total >= 10 ? 1 : 2);
    out.push(
      <g key="clock" opacity={clockPart}>
        <rect x={WIDE / 2 - 100} y={top + 14} width={200} height={42} rx={21} fill="rgb(255 255 255 / 0.07)" stroke="rgb(255 255 255 / 0.16)" />
        <Text x={WIDE / 2} y={top + 35.5} size={21} color={state.done ? TONES.good : INK}>{`t = ${text} ${unit.unit}`}</Text>
      </g>,
    );
  }
  if (travelledPart > 0) {
    const { n, unit } = lengthUnit(state.covered);
    out.push(
      <g key="travelled" opacity={travelledPart}>
        <Value x={WIDE / 2} y={HIGH - 30} pre="Distance travelled: " n={n} unit={unit} figures={figures} size={21} color={ELECTRIC} />
      </g>,
    );
  }
}

// ── A spinning mirror ─────────────────────────────────────────────────────────────────────────

function drawSpin(el: LightEl, plays: Array<[string, number]>, { out, top, HIGH, part }: Frame): void {
  const state = spinAt(el, plays);
  const [ratePart, clockPart, turnPart, distancePart] = ['rate', 'clock', 'turn', 'distance'].map(part);
  const trip = roundTrip(el);
  const [cx, cy, R] = [250, top + (HIGH - top) / 2, 64];
  const a = R * Math.cos(FACE / 2);
  const k = Math.SQRT1_2;
  // Where the light meets the mirror on its way out, and on its way back.
  const P1: [number, number] = [cx + a * k, cy - a * k];
  const P2: [number, number] = [cx + a * k, cy + a * k];
  const xm = WIDE - 120;
  const [M1, M2]: Array<[number, number]> = [
    [xm, P1[1]],
    [xm, P2[1]],
  ];
  const [sourceY, detectorY] = [cy - 152, cy + 152];
  const [g0, g1] = [628, 660];

  // The path of the light, faintly: out along the top, and back along the bottom.
  out.push(
    <g key="path" stroke={INK3} strokeWidth={1.5} strokeDasharray="5 7" fill="none" opacity={0.7}>
      <path d={`M${P1[0]},${P1[1]} H${g0} M${g1},${P1[1]} H${xm} V${M2[1]} H${g1} M${g0},${M2[1]} H${P2[0]} V${detectorY - 26}`} />
    </g>,
  );
  // The break in the path: the fixed mirror is a long way off.
  out.push(
    <g key="break" stroke={INK2} strokeWidth={2.4} strokeLinecap="round">
      {[P1[1], P2[1]].map((y) => (
        <path key={y} d={`M${g0 - 5},${y + 11} L${g0 + 5},${y - 11} M${g1 - 5},${y + 11} L${g1 + 5},${y - 11}`} fill="none" />
      ))}
    </g>,
  );
  if (distancePart > 0) out.push(<Text key="distance" x={(g0 + g1) / 2} y={cy} size={21} opacity={distancePart}>{`${figuresOf(el.spin!.metres / 1000, 2)} km`}</Text>);

  // The fixed mirror: two mirrors at right angles, which send the light back along a lower line.
  out.push(
    <g key="fixed">
      <path d={`M${xm - 26},${M1[1] - 26} L${xm + 26},${M1[1] + 26} M${xm - 26},${M2[1] + 26} L${xm + 26},${M2[1] - 26}`} stroke="#e8ecff" strokeWidth={5} strokeLinecap="round" fill="none" />
      <Text x={xm} y={M1[1] - 52} size={19} color={INK2}>Fixed mirror</Text>
    </g>,
  );

  // The light source over the mirror, and the detector under it.
  // At rest, the beam grows along the path from the moment the mirror stands still, at the speed of light.
  const grown = state.steady ? (state.time - (state.since ?? 0)) / trip : 0;
  const lit = state.steady ? clamp01((grown - 1) / 0.08) : state.hit !== null ? clamp01(1 - (state.time - state.hit) / (0.5 * trip)) : 0;
  out.push(
    <g key="source">
      <line x1={P1[0]} y1={sourceY + 22} x2={P1[0]} y2={P1[1]} stroke={LIGHT} strokeWidth={3} opacity={0.75} />
      <rect x={P1[0] - 28} y={sourceY - 22} width={56} height={44} rx={7} fill="#3b3866" stroke={INK2} strokeWidth={2.5} />
      <circle cx={P1[0]} cy={sourceY + 22} r={9} fill={ELECTRIC} stroke="#fff3c4" strokeWidth={2} />
      <Text x={P1[0] + 42} y={sourceY} size={19} color={INK2} anchor="start">Light source</Text>
    </g>,
  );
  out.push(
    <g key="detector">
      <circle cx={P2[0]} cy={detectorY} r={30 + 16 * lit} fill={ELECTRIC} opacity={0.34 * lit} />
      <rect x={P2[0] - 28} y={detectorY - 22} width={56} height={44} rx={7} fill="#3b3866" stroke={lit > 0.05 ? ELECTRIC : INK2} strokeWidth={2.5} />
      <circle cx={P2[0]} cy={detectorY - 22} r={9} fill={BACK} stroke={INK2} strokeWidth={2} />
      <circle cx={P2[0]} cy={detectorY - 22} r={9} fill={ELECTRIC} opacity={lit} />
      <Text x={P2[0] + 42} y={detectorY} size={19} color={lit > 0.05 ? ELECTRIC : INK2} anchor="start">{lit > 0.05 ? 'Detector: light!' : 'Detector'}</Text>
    </g>,
  );

  if (state.steady) {
    // At rest, with a face in place, the light is a steady beam all the way to the detector.
    const parts: string[] = [];
    const x1 = P1[0] + (xm - P1[0]) * clamp01(grown / 0.5);
    if (grown > 0) parts.push(`M${P1[0]},${P1[1]} H${Math.min(x1, g0)}`);
    if (x1 > g1) parts.push(`M${g1},${P1[1]} H${x1}`);
    if (grown >= 0.5) {
      const x2 = xm - (xm - P2[0]) * clamp01((grown - 0.5) / 0.5);
      parts.push(`M${xm},${P1[1]} V${M2[1]} H${Math.max(x2, g1)}`);
      if (x2 < g0) parts.push(`M${g0},${M2[1]} H${x2}`);
      if (grown >= 1) parts.push(`V${detectorY - 26}`);
    }
    if (parts.length) out.push(<path key="beam" d={parts.join(' ')} stroke={LIGHT} strokeWidth={3.5} fill="none" opacity={0.92} strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 6px ${ELECTRIC}88)` }} />);
    if (grown >= 1) {
      // Once the beam is whole, brighter stretches run along it, so that the way the light goes still shows.
      const run = (xm - P1[0]) * (grown / 0.5);
      const pieces: Array<[string, number]> = [
        [`M${P1[0]},${P1[1]} H${g0}`, 0],
        [`M${g1},${P1[1]} H${xm} V${M2[1]} H${g1}`, g1 - P1[0]],
        [`M${g0},${M2[1]} H${P2[0]} V${detectorY - 26}`, xm - P1[0] + (M2[1] - P1[1]) + (xm - g0)],
      ];
      out.push(
        <g key="flow" stroke="#fffbe6" strokeWidth={3.5} fill="none" strokeDasharray="44 126" strokeLinecap="round" opacity={0.85 * clamp01((grown - 1) / 0.2)}>
          {pieces.map(([d, start], i) => (
            <path key={i} d={d} strokeDashoffset={start - run} />
          ))}
        </g>,
      );
    }
  } else {
    // The beam from the source is swept round by whichever face is under it.
    const sweep = 2 * tiltOf(state.angle);
    out.push(<line key="sweep" x1={P1[0]} y1={P1[1]} x2={P1[0] + 130 * Math.cos(sweep)} y2={P1[1] - 130 * Math.sin(sweep)} stroke={LIGHT} strokeWidth={3} opacity={0.4} strokeLinecap="round" />);
    for (const flash of state.flashes) {
      if (flash.tilt === null) {
        const s = clamp01((state.time - flash.left) / trip);
        const outward = s < 0.5;
        const u = outward ? s / 0.5 : (s - 0.5) / 0.5;
        const [from, to] = outward ? [P1, M1] : [M2, P2];
        const x = from[0] + (to[0] - from[0]) * u;
        // The flash is not drawn while it is in the part of the path that is left out.
        if (x > g0 - 6 && x < g1 + 6) continue;
        out.push(<Flash key={`f${flash.left}`} x={x} y={from[1]} back={[outward ? -1 : 1, 0]} />);
      } else {
        // Back at the mirror: the face it meets has turned, so the light leaves at twice that angle from the way to the detector.
        const age = (state.time - flash.back) / trip;
        const fade = clamp01(1 - age / 0.4);
        if (fade <= 0) continue;
        const seen = Math.abs(flash.tilt) < TOLERANCE;
        // Light that is sent the right way stops at the detector; light that misses goes on past it.
        const reach = (seen ? detectorY - 26 - P2[1] : 150) * clamp01(age / 0.06 + 0.15);
        const turn = 2 * flash.tilt;
        out.push(<line key={`r${flash.left}`} x1={P2[0]} y1={P2[1]} x2={P2[0] + reach * Math.sin(turn)} y2={P2[1] + reach * Math.cos(turn)} stroke={seen ? LIGHT : TONES.opp} strokeWidth={4} opacity={0.95 * fade} strokeLinecap="round" />);
      }
    }
  }

  // The spinning mirror: eight faces, with a mark on one so that its turning shows.
  const corners: string[] = [];
  for (let i = 0; i < 8; i++) {
    const phi = state.angle + (i + 0.5) * FACE;
    corners.push(`${(cx + R * Math.cos(phi)).toFixed(2)},${(cy - R * Math.sin(phi)).toFixed(2)}`);
  }
  out.push(
    <g key="mirror">
      <polygon points={corners.join(' ')} fill="#2c2a55" stroke="#e8ecff" strokeWidth={4.5} strokeLinejoin="round" />
      <circle cx={cx} cy={cy} r={9} fill={INK2} />
      <circle cx={cx + a * 0.62 * Math.cos(state.angle)} cy={cy - a * 0.62 * Math.sin(state.angle)} r={6} fill={TONES.hyp} />
      {state.hertz > 0 && (
        <path d={`M${cx + (R + 20) * Math.cos(1.9)},${cy - (R + 20) * Math.sin(1.9)} A${R + 20},${R + 20} 0 0 0 ${cx + (R + 20) * Math.cos(2.9)},${cy - (R + 20) * Math.sin(2.9)} m-3,-13 l3,13 l12,-5`} fill="none" stroke={INK2} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
      )}
      <Text x={cx - R - 62} y={cy - 12} size={19} color={INK2}>Spinning</Text>
      <Text x={cx - R - 62} y={cy + 12} size={19} color={INK2}>mirror</Text>
    </g>,
  );

  // On two lines, so that it stays clear of the light source.
  if (ratePart > 0) {
    out.push(
      <g key="rate" opacity={ratePart}>
        <Text x={36} y={top + 34} anchor="start" size={25}>{state.hertz > 0 ? `${Math.round(state.hertz)} turns` : 'At rest'}</Text>
        {state.hertz > 0 && <Text x={36} y={top + 62} anchor="start" size={19} color={INK2}>each second</Text>}
      </g>,
    );
  }
  if (turnPart > 0) out.push(<Text key="turn" x={WIDE - 36} y={top + 32} anchor="end" size={21} color={INK} opacity={turnPart}>{`Turn during the round trip: ${turnInTrip(el, state.hertz).toFixed(3)}`}</Text>);
  if (clockPart > 0) out.push(<Text key="clock" x={WIDE - 36} y={HIGH - 30} anchor="end" size={21} color={INK2} opacity={clockPart}>{`Round trip: ${figuresOf(trip * 1e6, 3)} μs`}</Text>);
}

// ── A prism ───────────────────────────────────────────────────────────────────────────────────

/** How fast light grows into the picture of a prism or a fibre, and how fast its bright stretches run, in pixels each second. */
const GROW = 520;
const FLOW = 150;

const lengthOf = (pts: Vec[]) => pts.slice(1).reduce((sum, q, i) => sum + Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]), 0);
const pathOf = (pts: Vec[]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

function drawPrism(el: LightEl, plays: Array<[string, number]>, { out, top, HIGH, part }: Frame): void {
  const state = prismAt(el, plays);
  const [namesPart, valuesPart] = ['names', 'values'].map(part);
  const shape = prismShape(el);
  const mid = top + (HIGH - top) / 2;
  // The sloping sides are as long as the room allows, up to 310 pixels.
  const SIDE = Math.min(310, ((HIGH - top) * 0.66) / shape.top[1]);
  const [px, base] = [392, mid + (SIDE * shape.top[1]) / 2 + 4];
  const at = ([x, y]: Vec): Vec => [px + SIDE * x, base - SIDE * y];
  const screen = WIDE - 92;
  const box = { left: 30, right: screen, top: top + 14, bottom: HIGH - 14 };
  /** Where a ray from a point on the picture, in a direction given with y upwards, meets the edge of the room (or the screen). */
  const reach = (from: Vec, [dx, dy]: Vec): Vec => {
    let t = 1e9;
    if (dx > 1e-9) t = Math.min(t, (box.right - from[0]) / dx);
    if (dx < -1e-9) t = Math.min(t, (box.left - from[0]) / dx);
    if (dy > 1e-9) t = Math.min(t, (from[1] - box.top) / dy);
    if (dy < -1e-9) t = Math.min(t, (from[1] - box.bottom) / dy);
    return [from[0] + dx * t, from[1] - dy * t];
  };

  const white = prismPath(el, state.angle, 560);
  const enter = at(white.enter);
  const start = reach(enter, [-white.arrive[0], -white.arrive[1]]);
  const arriving = Math.hypot(enter[0] - start[0], enter[1] - start[1]);
  const grown = state.time * GROW;

  out.push(
    <g key="screen">
      <line x1={screen + 3} y1={top + 40} x2={screen + 3} y2={HIGH - 22} stroke="#e8ecff" strokeWidth={5} strokeLinecap="round" />
      <Text x={screen + 3} y={top + 20} size={18} color={INK2}>Screen</Text>
    </g>,
  );
  out.push(
    <g key="prism">
      <polygon points={[shape.left, shape.top, shape.right].map((corner) => at(corner).join(',')).join(' ')} fill="rgb(150 190 255 / 0.13)" stroke="#cfe0ff" strokeWidth={2.5} strokeLinejoin="round" />
      <Text x={px} y={Math.min(HIGH - 20, base + 24)} size={18} color={INK2}>Glass prism</Text>
    </g>,
  );

  // The white light that arrives.
  if (grown > 0)
    out.push(
      <g key="white">
        <path d={pathOf([start, enter])} stroke="#fffdf2" strokeWidth={5} strokeLinecap="round" fill="none" strokeDasharray={`${Math.min(grown, arriving).toFixed(1)} 9999`} style={{ filter: `drop-shadow(0 0 6px ${LIGHT}aa)` }} />
        <Text x={(start[0] + enter[0]) / 2 - 16} y={(start[1] + enter[1]) / 2 - 30} size={19} color="#fffdf2" opacity={clamp01(grown / 120)}>White light</Text>
      </g>,
    );

  // Each colour takes its own path through the glass, and on to the screen.
  const half = (((el.prism!.apex ?? 60) / 2) * Math.PI) / 180;
  const colours: ReactElement[] = [];
  const flows: ReactElement[] = [];
  const ends: Array<{ nm: number; pts: Vec[]; lands: boolean }> = [];
  let longest = 0;
  for (const nm of PRISM_COLOURS) {
    const path = prismPath(el, state.angle, nm);
    const leave = at(path.leave);
    let pts: Vec[];
    let lands = false;
    if (path.out) {
      const end = reach(leave, path.out);
      lands = end[0] >= screen - 0.5;
      pts = [enter, leave, end];
    } else {
      // No light can leave by the second face: it is reflected down to the base of the prism.
      const back = reflectRay(path.inside, [-Math.cos(half), -Math.sin(half)]);
      const t = back[1] < -1e-9 ? -path.leave[1] / back[1] : 0;
      pts = [enter, leave, at([path.leave[0] + back[0] * t, path.leave[1] + back[1] * t])];
    }
    const length = lengthOf(pts);
    longest = Math.max(longest, length);
    ends.push({ nm, pts, lands });
    const colour = `rgb(${visibleColour(nm).join(' ')})`;
    const shown = Math.max(0, Math.min(grown - arriving, length));
    if (shown <= 0) continue;
    colours.push(<path key={nm} d={pathOf(pts)} stroke={colour} strokeWidth={3.4} strokeLinejoin="round" fill="none" strokeDasharray={`${shown.toFixed(1)} 9999`} />);
    flows.push(<path key={nm} d={pathOf(pts)} stroke={colour} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" fill="none" strokeDasharray="22 128" strokeDashoffset={(arriving - state.time * FLOW).toFixed(1)} />);
    if (lands && shown >= length) colours.push(<circle key={`dot${nm}`} cx={screen} cy={pts[2][1]} r={6.5} fill={colour} />);
  }
  if (colours.length) out.push(<g key="colours" style={{ mixBlendMode: 'screen' }}>{colours}</g>);
  // Once the light has reached the screen, brighter stretches run along it, so that the way it goes still shows.
  const whole = clamp01((grown - arriving - longest) / 80);
  if (whole > 0)
    out.push(
      <g key="flow" opacity={0.8 * whole} style={{ mixBlendMode: 'screen' }}>
        <path d={pathOf([start, enter])} stroke="#fffdf2" strokeWidth={6} strokeLinecap="round" fill="none" strokeDasharray="22 128" strokeDashoffset={(-(state.time * FLOW)).toFixed(1)} />
        {flows}
      </g>,
    );

  if (namesPart > 0 && ends.length) {
    const [red, violet] = [ends[0], ends[ends.length - 1]];
    const along = ({ pts }: { pts: Vec[] }, share: number): Vec => [pts[1][0] + (pts[2][0] - pts[1][0]) * share, pts[1][1] + (pts[2][1] - pts[1][1]) * share];
    const [r, v] = [along(red, 0.56), along(violet, 0.74)];
    // Red is the less bent of the two, so its name goes on the outer side of the fan, and violet's on the other. The fan slopes, so each name is set to the side that the light leaves clear.
    const side = r[1] <= v[1] ? -1 : 1;
    const falls = (red.pts[2][1] - red.pts[1][1]) * side < 0;
    out.push(
      <g key="names" opacity={namesPart * whole}>
        <Text x={r[0] + (falls ? 12 : -12)} y={r[1] + side * 30} anchor={falls ? 'start' : 'end'} size={20} color={`rgb(${visibleColour(660).join(' ')})`}>Red: bent least</Text>
        <Text x={v[0] + (falls ? -12 : 12)} y={v[1] - side * 30} anchor={falls ? 'end' : 'start'} size={20} color={`rgb(${visibleColour(430).join(' ')})`}>Violet: bent most</Text>
      </g>,
    );
  }
  if (valuesPart > 0)
    out.push(
      <g key="values" opacity={valuesPart}>
        <Text x={36} y={top + 32} anchor="start" size={20} color={INK2}>In this glass</Text>
        <Text x={36} y={top + 60} anchor="start" size={21} color={`rgb(${visibleColour(660).join(' ')})`}>{`Red: n = ${prismIndex(el, 700).toFixed(2)}`}</Text>
        <Text x={36} y={top + 88} anchor="start" size={21} color={`rgb(${visibleColour(430).join(' ')})`}>{`Violet: n = ${prismIndex(el, 400).toFixed(2)}`}</Text>
      </g>,
    );
}

// ── An optical fibre ──────────────────────────────────────────────────────────────────────────

const CORE = '#9fd0ff';

function drawFibre(el: LightEl, plays: Array<[string, number]>, { out, top, HIGH, part }: Frame): void {
  const state = fibreAt(el, plays);
  const path = fibrePath(el, state.angle);
  const [namesPart, anglesPart] = ['names', 'angles'].map(part);
  const mid = top + (HIGH - top) / 2 + 8;
  const [x0, K] = [96, (WIDE - 192) / FIBRE.length];
  const at = ([x, y]: Vec): Vec => [x0 + K * x, mid - K * y];
  const COAT = 24;

  // The core, and the cladding round it.
  const wall = (offset: number): Vec[] => Array.from({ length: 101 }, (_, k) => at([k * 10, fibreCentre(k * 10) + offset]));
  const band = (a: number, b: number) => [...wall(a), ...wall(b).reverse()].map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ');
  out.push(
    <g key="fibre">
      <polygon points={band(FIBRE.half + COAT, FIBRE.half)} fill="rgb(201 198 232 / 0.2)" />
      <polygon points={band(-FIBRE.half, -FIBRE.half - COAT)} fill="rgb(201 198 232 / 0.2)" />
      <polygon points={band(FIBRE.half, -FIBRE.half)} fill="rgb(120 190 255 / 0.13)" />
      {[FIBRE.half + COAT, -FIBRE.half - COAT].map((offset) => (
        <path key={offset} d={pathOf(wall(offset))} fill="none" stroke={INK3} strokeWidth={1.5} />
      ))}
      {[FIBRE.half, -FIBRE.half].map((offset) => (
        <path key={offset} d={pathOf(wall(offset))} fill="none" stroke={CORE} strokeWidth={2.2} opacity={0.85} />
      ))}
    </g>,
  );

  // The ray: the corners of its path on the picture, and how far along it each one is.
  const pts = path.points.map((q) => at(q.at));
  const far: number[] = [0];
  for (let i = 1; i < pts.length; i++) far.push(far[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = far[far.length - 1];
  const grown = Math.min(state.time * GROW, total);
  /** The share of the light that is left on a stretch of the path. */
  const strengthOf = (i: number) => path.points[i + 1].strength;
  const rays: ReactElement[] = [];
  for (let i = 0; i + 1 < pts.length && far[i] < grown; i++) {
    const share = Math.min(1, (grown - far[i]) / (far[i + 1] - far[i] || 1));
    const [a, b] = [pts[i], pts[i + 1]];
    rays.push(<line key={i} x1={a[0]} y1={a[1]} x2={a[0] + (b[0] - a[0]) * share} y2={a[1] + (b[1] - a[1]) * share} stroke={LIGHT} strokeWidth={4} strokeLinecap="round" opacity={Math.max(0.1, strengthOf(i)) ** 0.7} />);
  }
  // The light that escapes into the cladding where the ray meets the wall at less than the critical angle.
  const escapes: ReactElement[] = [];
  path.bounces.forEach((bounce, j) => {
    if (!bounce.escape || far[j + 1] > grown) return;
    const here = pts[j + 1];
    const before = path.points[j + 1].strength;
    const len = 96 * Math.sqrt(before) * clamp01((grown - far[j + 1]) / 60);
    escapes.push(<Dart key={j} from={here} to={[here[0] + bounce.escape[0] * len, here[1] - bounce.escape[1] * len]} color={TONES.opp} opacity={Math.max(0.25, before) ** 0.5} />);
  });
  out.push(
    <g key="ray" style={{ filter: `drop-shadow(0 0 5px ${ELECTRIC}77)` }}>
      {rays}
    </g>,
    <g key="escapes">{escapes}</g>,
  );
  // Pulses of light that run along the ray.
  const pulses: ReactElement[] = [];
  const GAP = 290;
  for (let s = (state.time * 300) % GAP; s < grown; s += GAP) {
    const i = Math.max(0, far.findIndex((d) => d > s) - 1);
    if (i + 1 >= pts.length) break;
    const share = (s - far[i]) / (far[i + 1] - far[i] || 1);
    const [x, y] = [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * share, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * share];
    const strength = strengthOf(i);
    if (strength < 0.1) continue;
    pulses.push(
      <g key={pulses.length} opacity={strength ** 0.6}>
        <circle cx={x} cy={y} r={14} fill={ELECTRIC} opacity={0.32} />
        <circle cx={x} cy={y} r={6.5} fill="#fff8e0" />
      </g>,
    );
  }
  out.push(<g key="pulses">{pulses}</g>);

  // The lamp at one end, and the detector at the other.
  const [first, last] = [at([0, fibreCentre(0)]), at([FIBRE.length, fibreCentre(FIBRE.length)])];
  const lit = path.through * clamp01((state.time * GROW - total) / 60);
  out.push(
    <g key="ends">
      <Shape shape="lamp" x={first[0] - 46} y={first[1]} faces={1} />
      <Text x={first[0] - 46} y={first[1] + 40} size={18} color={INK2}>Lamp</Text>
      <circle cx={last[0] + 16} cy={last[1]} r={30 + 14 * lit} fill={ELECTRIC} opacity={0.34 * lit} />
      <rect x={last[0] + 16} y={last[1] - 28} width={44} height={56} rx={7} fill="#3b3866" stroke={lit > 0.05 ? ELECTRIC : INK2} strokeWidth={2.5} />
      <circle cx={last[0] + 16} cy={last[1]} r={9} fill={BACK} stroke={INK2} strokeWidth={2} />
      <circle cx={last[0] + 16} cy={last[1]} r={9} fill={ELECTRIC} opacity={lit} />
      <Text x={last[0] + 60} y={last[1] + 88} size={18} anchor="end" color={lit > 0.05 ? ELECTRIC : INK2}>{lit > 0.5 ? 'Detector: light!' : 'Detector'}</Text>
    </g>,
  );

  const [core, cladding] = fibreIndex(el);
  if (namesPart > 0)
    out.push(
      <g key="names" opacity={namesPart}>
        <Text x={36} y={top + 30} anchor="start" size={20} color={CORE}>{`Core: glass, n = ${core.toFixed(2)}`}</Text>
        <Text x={36} y={top + 58} anchor="start" size={20} color={INK2}>{`Cladding: n = ${cladding.toFixed(2)}`}</Text>
      </g>,
    );
  if (anglesPart > 0) {
    const critical = fibreCritical(el);
    const bounce = path.bounces[0];
    const marks: ReactElement[] = [];
    if (bounce && far[1] <= grown) {
      // The normal of the wall at the first bounce, and the angle between it and the ray that arrives.
      const here = pts[1];
      const slope = fibreSlope(bounce.at[0]);
      const upper = bounce.at[1] > fibreCentre(bounce.at[0]);
      const size = Math.hypot(slope, 1);
      const inward: Vec = upper ? [slope / size, 1 / size] : [-slope / size, -1 / size];
      const back: Vec = [(pts[0][0] - here[0]) / (far[1] || 1), (pts[0][1] - here[1]) / (far[1] || 1)];
      const r = 40;
      const [p1, p2]: Vec[] = [
        [here[0] + back[0] * r, here[1] + back[1] * r],
        [here[0] + inward[0] * r, here[1] + inward[1] * r],
      ];
      const sweep = back[0] * inward[1] - back[1] * inward[0] > 0 ? 1 : 0;
      const middle: Vec = [back[0] + inward[0], back[1] + inward[1]];
      const m = Math.hypot(middle[0], middle[1]) || 1;
      marks.push(
        <line key="normal" x1={here[0] - inward[0] * 26} y1={here[1] - inward[1] * 26} x2={here[0] + inward[0] * 84} y2={here[1] + inward[1] * 84} stroke={INK} strokeWidth={2.2} strokeDasharray="7 7" opacity={0.85} />,
        <path key="arc" d={`M${p1[0].toFixed(1)},${p1[1].toFixed(1)} A${r},${r} 0 0 ${sweep} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`} fill="none" stroke={TONES.adj} strokeWidth={4} strokeLinecap="round" />,
        <Text key="size" x={here[0] + (middle[0] / m) * 64} y={here[1] + (middle[1] / m) * 64} size={19} color={TONES.adj}>{`${bounce.incidence.toFixed(0)}°`}</Text>,
      );
    }
    const kept = path.bounces.every((b) => b.total);
    out.push(
      <g key="angles" opacity={anglesPart}>
        {marks}
        {bounce && <Text x={36} y={HIGH - 30} anchor="start" size={21} color={TONES.adj}>{`Angle at the wall: ${bounce.incidence.toFixed(0)}°`}</Text>}
        <Text x={372} y={HIGH - 30} anchor="start" size={21} color={INK2}>{`Critical angle: ${critical.toFixed(1)}°`}</Text>
        <Text x={WIDE - 36} y={HIGH - 30} anchor="end" size={21} color={kept ? TONES.good : TONES.opp}>{kept ? 'All of the light is reflected' : 'Light escapes at each bounce'}</Text>
      </g>,
    );
  }
}

// ── A diffraction grating ─────────────────────────────────────────────────────────────────────

const DEG = Math.PI / 180;

function drawGrating(el: LightEl, plays: Array<[string, number]>, { out, top, HIGH, part }: Frame): void {
  const g = el.grating!;
  const state = gratingAt(el, plays);
  const [ordersPart, anglesPart, valuesPart, namesPart, pathPart] = ['orders', 'angles', 'values', 'names', 'path'].map(part);
  const mid = top + (HIGH - top) / 2;
  // The grating, and a screen bent into half a circle round it, so that a line at any angle lands on it.
  const R = Math.min(230, (HIGH - top) / 2 - 34);
  // It stands in the middle of the picture, and moves to the left to make room for what is written or drawn beside it.
  const gx = 300 + (WIDE / 2 - (R - 160) / 2 - 300) * (1 - Math.max(valuesPart, pathPart));
  const start = gx - 260;
  const arriving = gx - start;
  const grown = state.time * GROW;
  const reach = Math.max(0, Math.min(R, grown - arriving));
  const whole = clamp01((grown - arriving - R) / 80);
  const colourOf = (nm: number) => `rgb(${visibleColour(nm).join(' ')})`;
  const own = g.white ? '#fffdf2' : colourOf(state.nm);
  const tip = (degrees: number, r: number): Vec => [gx + r * Math.cos(degrees * DEG), mid - r * Math.sin(degrees * DEG)];
  const limit = (most: number) => (g.most === undefined ? most : Math.min(most, g.most));

  out.push(
    <g key="screen">
      <path d={`M${gx},${mid - R} A${R},${R} 0 0 1 ${gx},${mid + R}`} fill="none" stroke="#e8ecff" strokeWidth={4} strokeLinecap="round" opacity={0.5} />
      <Text x={gx - 12} y={mid - R} anchor="end" size={18} color={INK2}>Screen</Text>
    </g>,
  );
  const tall = Math.min(64, R * 0.4);
  out.push(
    <g key="grating">
      <line x1={gx} y1={mid - tall} x2={gx} y2={mid + tall} stroke="#cfe0ff" strokeWidth={10} strokeDasharray="3 3" />
      <Text x={gx - 14} y={mid + tall + 20} anchor="end" size={18} color={INK2}>Grating</Text>
    </g>,
  );

  // The light that arrives.
  if (grown > 0)
    out.push(
      <g key="beam">
        <line x1={start} y1={mid} x2={start + Math.min(grown, arriving)} y2={mid} stroke={own} strokeWidth={6} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${own})` }} />
        <Text x={(start + gx) / 2 - 6} y={mid - 30} size={19} color={own} opacity={clamp01(grown / 120)}>{g.white ? 'White light' : `Light of ${Math.round(state.nm)} nm`}</Text>
      </g>,
    );

  // The light beyond the grating. A whole grating sends each colour out in sharp lines; a few slits send it out in broad bands.
  const rays: ReactElement[] = [];
  const flows: ReactElement[] = [];
  const lands: ReactElement[] = [];
  if (reach > 0 && state.slits === undefined) {
    for (const nm of g.white ? GRATING_COLOURS : [state.nm]) {
      const most = limit(gratingOrders(state.lines, nm));
      for (let n = -most; n <= most; n++) {
        // Every colour of white light goes straight through together: that line is drawn once, in white.
        if (g.white && n === 0) continue;
        const degrees = gratingAngle(state.lines, nm, n);
        if (degrees === undefined) continue;
        const [x, y] = tip(degrees, reach);
        const [ex, ey] = tip(degrees, R);
        rays.push(<line key={`${nm}:${n}`} x1={gx} y1={mid} x2={x} y2={y} stroke={colourOf(nm)} strokeWidth={g.white ? 2.6 : 3.6} strokeLinecap="round" opacity={g.white ? 0.85 : 0.95} />);
        if (!g.white || nm % 60 === 40) flows.push(<line key={`${nm}:${n}`} x1={gx} y1={mid} x2={ex} y2={ey} stroke={colourOf(nm)} strokeWidth={6} strokeLinecap="round" strokeDasharray="20 110" strokeDashoffset={(arriving - state.time * FLOW).toFixed(1)} />);
        if (reach >= R) lands.push(<circle key={`${nm}:${n}`} cx={ex} cy={ey} r={g.white ? 3.6 : 6.5} fill={colourOf(nm)} />);
      }
    }
    if (g.white) {
      rays.push(<line key="centre" x1={gx} y1={mid} x2={gx + reach} y2={mid} stroke="#fffdf2" strokeWidth={3.6} strokeLinecap="round" />);
      if (reach >= R) lands.push(<circle key="centre" cx={gx + R} cy={mid} r={6.5} fill="#fffdf2" />);
    }
  } else if (reach > 0 && state.slits !== undefined) {
    for (let degrees = -89.5; degrees <= 89.5; degrees += 0.5) {
      const bright = gratingBrightness(state.lines, state.nm, state.slits, degrees);
      if (bright < 0.012) continue;
      const [a, b] = [tip(degrees - 0.27, reach), tip(degrees + 0.27, reach)];
      rays.push(<polygon key={degrees} points={`${gx},${mid} ${a[0].toFixed(1)},${a[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`} fill={own} opacity={(0.72 * bright).toFixed(3)} />);
      if (reach >= R) {
        const [c, d] = [tip(degrees - 0.3, R + 7), tip(degrees + 0.3, R + 7)];
        lands.push(<line key={degrees} x1={c[0]} y1={c[1]} x2={d[0]} y2={d[1]} stroke={own} strokeWidth={10} opacity={bright.toFixed(3)} />);
      }
    }
  }
  if (rays.length) out.push(<g key="rays" style={{ mixBlendMode: 'screen' }}>{rays}</g>);
  if (lands.length) out.push(<g key="lands" style={{ mixBlendMode: 'screen' }}>{lands}</g>);
  // Once the light has reached the screen, brighter stretches run along it, so that the way it goes still shows.
  if (whole > 0)
    out.push(
      <g key="flow" opacity={0.8 * whole} style={{ mixBlendMode: 'screen' }}>
        <line x1={start} y1={mid} x2={gx} y2={mid} stroke={own} strokeWidth={7} strokeLinecap="round" strokeDasharray="20 110" strokeDashoffset={(-(state.time * FLOW)).toFixed(1)} />
        {flows}
      </g>,
    );
  if (state.slits !== undefined) out.push(<Text key="slits" x={36} y={top + 32} anchor="start" size={21} color={INK}>{`Slits lit: ${state.slits}`}</Text>);

  // The number of each bright line, and its angle from straight through.
  const guide = g.white ? 550 : state.nm;
  const most = limit(gratingOrders(state.lines, guide));
  const first = gratingAngle(state.lines, guide, 1);
  if (ordersPart > 0 || anglesPart > 0)
    for (let n = -most; n <= most; n++) {
      const degrees = gratingAngle(state.lines, guide, n);
      if (degrees === undefined) continue;
      // The names of the two ends of a spectrum stand beside the first order above the centre.
      if (g.white && n === 1 && namesPart > 0) continue;
      const [x, y] = tip(degrees, R + 18);
      const shift = 68 * ordersPart;
      if (ordersPart > 0) out.push(<Text key={`order${n}`} x={x + 2} y={y} anchor="start" size={19} color={INK} opacity={ordersPart * whole}>{`n = ${Math.abs(n)}`}</Text>);
      if (anglesPart > 0 && !g.white) out.push(<Text key={`angle${n}`} x={x + 2 + shift} y={y} anchor="start" size={19} color={own} opacity={anglesPart * whole}>{n === 0 ? '0°' : `${Math.abs(degrees).toFixed(1)}°`}</Text>);
    }
  if (anglesPart > 0 && !g.white && first !== undefined && first > 3) {
    const r = R * 0.46;
    const [ax, ay] = tip(first, r);
    const [lx, ly] = tip(first / 2, r + 18);
    out.push(
      <g key="arc" opacity={anglesPart * whole}>
        <path d={`M${gx + r},${mid} A${r},${r} 0 0 0 ${ax.toFixed(1)},${ay.toFixed(1)}`} fill="none" stroke={INK} strokeWidth={2.2} />
        <Text x={lx} y={ly} size={19} color={INK}>θ</Text>
      </g>,
    );
  }
  if (namesPart > 0 && g.white) {
    const [red, violet] = [gratingAngle(state.lines, 700, 1), gratingAngle(state.lines, 400, 1)];
    if (red !== undefined && violet !== undefined) {
      const [r, v] = [tip(red, R + 18), tip(violet, R + 18)];
      out.push(
        <g key="names" opacity={namesPart * whole}>
          <Text x={r[0] + 2} y={r[1] - 6} anchor="start" size={20} color={colourOf(660)}>Red: turned most</Text>
          <Text x={v[0] + 2} y={v[1] + 6} anchor="start" size={20} color={colourOf(430)}>Violet: turned least</Text>
        </g>,
      );
    }
  }

  const side = 700;
  if (valuesPart > 0)
    out.push(
      <g key="values" opacity={valuesPart}>
        <Text x={side} y={top + 34} anchor="start" size={21} color={INK}>{`${Math.round(state.lines)} lines in each millimetre`}</Text>
        <Value x={side} y={top + 66} pre="d = " n={gratingSpacing(Math.round(state.lines))} unit=" m" anchor="start" />
        <Text x={side} y={top + 98} anchor="start" size={21} color={own}>{g.white ? 'White light: 400 nm to 700 nm' : `λ = ${Math.round(state.nm)} nm`}</Text>
      </g>,
    );

  // Two neighbouring slits, close up: the light of the lower one has farther to go, by d sin θ.
  if (pathPart > 0) {
    const angle = Math.max(14, Math.min(40, first ?? 20)) * DEG;
    const [ux, uy] = [Math.cos(angle), -Math.sin(angle)];
    const gapD = 130;
    const wave = gapD * Math.sin(angle);
    const wx = side + 60;
    const cy = mid + 30;
    const [topY, lowY] = [cy - gapD / 2, cy + gapD / 2];
    const long = 250;
    const drawn: ReactElement[] = [];
    // The wall, with two slits in it.
    let from = topY - 40;
    for (const y of [topY, lowY, lowY + 60]) {
      drawn.push(<line key={`wall${y}`} x1={wx} y1={from} x2={wx} y2={Math.min(y - 8, lowY + 40)} stroke="#cfe0ff" strokeWidth={8} />);
      from = y + 8;
    }
    [topY, lowY].forEach((y, k) => {
      drawn.push(<line key={`ray${k}`} x1={wx} y1={y} x2={wx + ux * long} y2={y + uy * long} stroke={own} strokeWidth={3} strokeLinecap="round" opacity={0.9} />);
      // Crests leave both slits together, a wavelength apart: along a line across the rays they line up.
      for (let along = (state.time * 46) % wave; along < long - 6; along += wave) {
        const [px, py] = [wx + ux * along, y + uy * along];
        drawn.push(<line key={`crest${k}:${along.toFixed(1)}`} x1={px + uy * 10} y1={py - ux * 10} x2={px - uy * 10} y2={py + ux * 10} stroke={own} strokeWidth={2.6} strokeLinecap="round" />);
      }
    });
    // A line across the rays from the upper slit, and the extra path of the lower one.
    const foot: Vec = [wx + ux * wave, lowY + uy * wave];
    drawn.push(<line key="across" x1={wx} y1={topY} x2={foot[0] + (foot[0] - wx) * 0.35} y2={foot[1] + (foot[1] - topY) * 0.35} stroke={INK2} strokeWidth={2} strokeDasharray="6 6" />);
    drawn.push(<line key="extra" x1={wx} y1={lowY} x2={foot[0]} y2={foot[1]} stroke={TONES.good} strokeWidth={7} strokeLinecap="round" />);
    drawn.push(<Text key="extra-name" x={wx + 14} y={lowY + 30} anchor="start" size={21} color={TONES.good}>Extra path: d sin θ</Text>);
    drawn.push(<line key="d" x1={wx - 22} y1={topY} x2={wx - 22} y2={lowY} stroke={INK} strokeWidth={2.4} />);
    drawn.push(<line key="d0" x1={wx - 29} y1={topY} x2={wx - 15} y2={topY} stroke={INK} strokeWidth={2.4} />);
    drawn.push(<line key="d1" x1={wx - 29} y1={lowY} x2={wx - 15} y2={lowY} stroke={INK} strokeWidth={2.4} />);
    drawn.push(<Text key="d-name" x={wx - 40} y={cy} size={21} color={INK}>d</Text>);
    // The angle of the rays from straight through.
    drawn.push(<line key="level" x1={wx} y1={topY} x2={wx + 150} y2={topY} stroke={INK2} strokeWidth={2} strokeDasharray="6 6" />);
    drawn.push(<path key="theta" d={`M${wx + 96},${topY} A96,96 0 0 0 ${(wx + 96 * ux).toFixed(1)},${(topY + 96 * uy).toFixed(1)}`} fill="none" stroke={INK} strokeWidth={2.2} />);
    drawn.push(<Text key="theta-name" x={wx + 116 * Math.cos(angle / 2)} y={topY - 116 * Math.sin(angle / 2)} size={19} color={INK}>θ</Text>);
    drawn.push(<Text key="title" x={wx - 46} y={topY - 34 - long * Math.sin(angle)} anchor="start" size={19} color={INK2}>Two neighbouring slits, close up</Text>);
    out.push(<g key="path" opacity={pathPart}>{drawn}</g>);
  }
}

/** `fit` is the height the picture is designed for: it is then drawn whole in a room of another shape (a thumbnail), with space to spare at the sides. */
export function LightView({ el, st, w, h, plays, fit }: { el: LightEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; fit?: number }) {
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
  const frame: Frame = { out, top, HIGH, part: (name) => ownPart(st, name), figures: el.figures ?? 3 };
  if (el.wave) drawWave(el, played, frame);
  else if (el.spectrum) drawSpectrum(el, played, frame);
  else if (el.trip) drawTrip(el, played, frame);
  else if (el.spin) drawSpin(el, played, frame);
  else if (el.prism) drawPrism(el, played, frame);
  else if (el.fibre) drawFibre(el, played, frame);
  else if (el.grating) drawGrating(el, played, frame);
  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`${left} 0 ${across} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
