/**
 * Charged bodies on a bench (src/video/charges.ts works out where the electrons are and the
 * forces). A body that shows its charges has red + marks that stay where they are and blue
 * electrons that move: they cross from a cloth to a rod, from a rod to a sphere, or down a wire to
 * the ground, and they lean to one side of a metal sphere when a charged body is near. The
 * electric force on a body is an orange arrow, with its size beside it, and the sum of several is
 * yellow, like every net force. Positive is red and negative is blue throughout. The electric
 * field is violet: the lines of the field of the charges, or of two parallel plates, and an arrow
 * for the field where each test charge is. A magnetic field at right angles to the picture is
 * violet too: dots where it comes out of the page and crosses where it goes in.
 */
import type { ReactElement } from 'react';
import { CHARGE_UNITS, type ChargesEl, type Tone } from '../script.ts';
import { ATOM_NUCLEUS, ATOM_SHELLS, chargesAt, fieldLines, peaksOf, PLATE_HOLE } from '../charges.ts';
import { written } from '../gravity.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Num, Span } from './Gravity.tsx';
import { Arrow, clamp01, FONT, INK2, NET, Text, VELOCITY } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

export const POSITIVE = TONES.bad;
export const NEGATIVE = TONES.adj;
const PUSH = TONES.opp;
const WEIGHT = TONES.hyp;
export const FIELD = TONES.brand;
const METAL = '#c9c6e8';

/** A whole number of five digits or more, with a space between each three ("15 000"). */
const grouped = (text: string) => (/^-?\d{5,}$/.test(text) ? text.replace(/\B(?=(\d{3})+$)/g, ' ') : text);

/** The head of an arrow on a field line, at a point, turned to an angle on the screen. */
function Head({ x, y, turn, size = 9 }: { x: number; y: number; turn: number; size?: number }) {
  return <polygon points={`${size},0 ${-size * 0.7},${size * 0.62} ${-size * 0.7},${-size * 0.62}`} transform={`translate(${x} ${y}) rotate(${turn})`} fill={FIELD} />;
}
const rad = (deg: number) => (deg * Math.PI) / 180;

/** An electron: a blue dot with a minus sign on it. */
function Electron({ x, y, r, glow = false }: { x: number; y: number; r: number; glow?: boolean }) {
  return (
    <g style={glow ? { filter: `drop-shadow(0 0 7px ${NEGATIVE})` } : undefined}>
      <circle cx={x} cy={y} r={r} fill={NEGATIVE} stroke="#0d0c24" strokeWidth={1.5} />
      <line x1={x - r * 0.5} y1={y} x2={x + r * 0.5} y2={y} stroke="#fff" strokeWidth={Math.max(1.6, r * 0.3)} strokeLinecap="round" />
    </g>
  );
}

/** A + mark: a positive charge that stays where it is. */
function Plus({ x, y, r }: { x: number; y: number; r: number }) {
  const [half, weight] = [r * 0.85, Math.max(2.4, r * 0.4)];
  return (
    <g stroke={POSITIVE} strokeWidth={weight} strokeLinecap="round">
      <line x1={x - half} y1={y} x2={x + half} y2={y} />
      <line x1={x} y1={y - half} x2={x} y2={y + half} />
    </g>
  );
}

/** A charge as it is written: "+3.0 μC", "−4 nC", or "neutral" for a body that shows its charges. */
export function chargeText(q: number, unit: string, decimals: number, marked: boolean): string {
  const zero = Math.abs(q) < 0.5 * 10 ** -decimals;
  if (zero) return marked ? 'neutral' : `0 ${unit}`;
  // In elementary charges: "+e", "−2e".
  if (unit === 'e') return `${q > 0 ? '+' : '−'}${Math.abs(q - Math.round(q)) < 1e-9 ? (Math.abs(Math.round(q)) === 1 ? '' : Math.abs(Math.round(q))) : Math.abs(q).toFixed(decimals)}e`;
  return `${q > 0 ? '+' : '−'}${Math.abs(q).toFixed(decimals)} ${unit}`;
}

export function ChargesView({ el, st, w, h, plays, age }: { el: ChargesEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; age?: number }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = chargesAt(el, plays ?? st?.plays ?? [], age ?? st?.age ?? 0);
  const part = (name: string) => ownPart(st, name);
  const [chargePart, force, net, anglePart, distance, vel, linesPart, fieldPart, netField, potentialPart, gapPart, energyPart, trailPart, magneticPart, radiusPart] = ['charge', 'force', 'net', 'angle', 'distance', 'velocity', 'lines', 'field', 'netfield', 'potential', 'gap', 'energy', 'trail', 'magnetic', 'radius'].map(part);
  const peak = peaksOf(el);
  const unit = el.unit ?? 'μC';
  const out: ReactElement[] = [];

  // One scale both ways: the view fills a panel under the label.
  const [x0, x1, y0, y1] = el.view;
  const top = el.label ? 30 : 0;
  const S = Math.min(w / (x1 - x0), (h - top) / (y1 - y0));
  const [pw, ph] = [(x1 - x0) * S, (y1 - y0) * S];
  const [ox, oy] = [(w - pw) / 2, top + (h - top - ph) / 2];
  const X = (x: number) => ox + (x - x0) * S;
  const Y = (y: number) => oy + (y1 - y) * S;
  const clip = `bench-${el.id}`;

  if (el.label)
    out.push(
      <text key="label" x={0} y={14} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {el.label}
      </text>,
    );
  out.push(
    <g key="bench">
      <defs>
        <clipPath id={clip}>
          <rect x={ox} y={oy} width={pw} height={ph} rx={14} />
        </clipPath>
      </defs>
      <rect x={ox} y={oy} width={pw} height={ph} rx={14} fill="rgb(8 7 28 / 0.55)" stroke="rgb(188 217 255 / 0.25)" strokeWidth={1.5} />
      {state.floor !== null && (
        <g clipPath={`url(#${clip})`}>
          <rect x={ox} y={Y(state.floor)} width={pw} height={Math.max(0, oy + ph - Y(state.floor))} fill="rgb(255 255 255 / 0.05)" />
          <line x1={ox} y1={Y(state.floor)} x2={ox + pw} y2={Y(state.floor)} stroke={INK3} strokeWidth={2} />
        </g>
      )}
    </g>,
  );

  const labels: ReactElement[] = [];
  const length = el.length ?? { metres: 1, symbol: 'm' };
  // A potential that is changing is written to the nearest volt, so that it does not flicker with decimals.
  const volt = (v: number) => `${written(Math.abs(v) < 1e-9 ? 0 : Math.abs(v) >= 100 ? Math.round(v) : v, 3).text.replace('-', '−')} V`;

  // Two parallel plates, with their charges on them, and the lines of the uniform field in the gap.
  if (el.plates && state.plates) {
    const pl = el.plates;
    const upright = pl.across !== 'y';
    const [a, b] = state.plates.at;
    const pd = state.plates.volts;
    const base = pl.base ?? 0;
    const T = 22;
    const [s0, s1] = pl.span;
    const hole = PLATE_HOLE * (s1 - s0) * S;
    // The field at the start (or, when the plates start with no potential difference, the strongest they come to have) has the number of lines given.
    const fieldOf = (volts: number, at: [number, number]) => Math.abs(volts / (at[1] - at[0]));
    let start = fieldOf(pl.volts, pl.at);
    if (!(start > 0)) for (const clip of Object.values(el.clips)) for (const ph of clip.phases) if (ph.volts !== undefined) start = Math.max(start, fieldOf(ph.volts, pl.at));
    const strength = start > 0 ? fieldOf(pd, [a, b]) / start : 0;
    const marks = Math.min(16, Math.round(6 * strength));
    const lines = Math.min(21, Math.round((pl.lines ?? 7) * strength));
    /** A point given along the field and along the plates. */
    const at = (c: number, o: number): [number, number] => (upright ? [X(c), Y(o)] : [X(o), Y(c)]);
    [a, b].forEach((c, i) => {
      // Each plate is drawn outside the gap, with its face on the gap.
      const out1 = Math.sign(c - (i === 0 ? b : a)) * (upright ? 1 : -1);
      const positive = (i === 0) === pd > 0;
      const holed = pl.hole === (i === 0 ? 'first' : 'second');
      const [p0, p1] = [at(c, s0), at(c, s1)];
      const mid = at(c, (s0 + s1) / 2);
      const pieces: Array<[[number, number], [number, number]]> = holed ? (upright ? [[p0, [mid[0], mid[1] + hole]], [[mid[0], mid[1] - hole], p1]] : [[p0, [mid[0] - hole, mid[1]]], [[mid[0] + hole, mid[1]], p1]]) : [[p0, p1]];
      out.push(
        <g key={`plate-${i}`}>
          {pieces.map(([q0, q1], j) => {
            const [x, y, wd, ht] = upright ? [Math.min(q0[0], q0[0] + out1 * T), Math.min(q0[1], q1[1]), T, Math.abs(q1[1] - q0[1])] : [Math.min(q0[0], q1[0]), Math.min(q0[1], q0[1] + out1 * T), Math.abs(q1[0] - q0[0]), T];
            return (
              <g key={j}>
                <rect x={x} y={y} width={wd} height={ht} rx={5} fill="#1b1846" stroke={METAL} strokeWidth={2.5} />
                <rect x={x} y={y} width={wd} height={ht} rx={5} fill="#fff" fillOpacity={0.06} />
              </g>
            );
          })}
          {Array.from({ length: Math.abs(pd) > 1e-9 ? marks : 0 }, (_, j) => {
            const o = s0 + ((j + 0.5) / marks) * (s1 - s0);
            if (holed && Math.abs(o - (s0 + s1) / 2) * S < hole + 8) return null;
            const [mx, my] = at(c, o);
            const [x, y] = upright ? [mx + (out1 * T) / 2, my] : [mx, my + (out1 * T) / 2];
            return positive ? <Plus key={`m${j}`} x={x} y={y} r={6} /> : <line key={`m${j}`} x1={x - 5} y1={y} x2={x + 5} y2={y} stroke={NEGATIVE} strokeWidth={2.6} strokeLinecap="round" />;
          })}
        </g>,
      );
      if (potentialPart > 0) {
        const v = base + (i === 0 ? pd : 0);
        const other = base + (i === 0 ? 0 : pd);
        const [x, y, anchor] = upright ? ([p1[0] + (out1 * T) / 2, Math.min(p0[1], p1[1]) - 20, 'middle'] as const) : ([Math.max(p0[0], p1[0]) + 14, p0[1] + (out1 * T) / 2, 'start'] as const);
        labels.push(
          <Text key={`volt-${i}`} x={x} y={y} anchor={anchor} color={Math.abs(v - other) < 1e-9 ? INK2 : v > other ? POSITIVE : NEGATIVE} opacity={potentialPart}>
            {volt(v)}
          </Text>,
        );
      }
    });
    if (linesPart > 0 && Math.abs(pd) > 1e-9)
      out.push(
        <g key="plate-lines" opacity={0.6 * linesPart}>
          {Array.from({ length: lines }, (_, j) => {
            const o = s0 + ((j + 0.5) / lines) * (s1 - s0);
            // From the positive plate to the negative one.
            const [from, to] = pd > 0 ? [at(a, o), at(b, o)] : [at(b, o), at(a, o)];
            return (
              <g key={j}>
                <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={FIELD} strokeWidth={2} />
                <Head x={(from[0] + to[0]) / 2} y={(from[1] + to[1]) / 2} turn={(Math.atan2(to[1] - from[1], to[0] - from[0]) * 180) / Math.PI} />
              </g>
            );
          })}
        </g>,
      );
    // Lines of equal potential, evenly spaced between the plates.
    if (potentialPart > 0)
      for (let i = 1; i <= (pl.levels ?? 0); i++) {
        const f = i / ((pl.levels ?? 0) + 1);
        const c = b + (a - b) * f;
        const [p0, p1] = [at(c, s0), at(c, s1)];
        out.push(<line key={`level-${i}`} x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} stroke={INK2} strokeWidth={1.5} strokeDasharray="4 7" opacity={0.7 * potentialPart} />);
        labels.push(
          <Text key={`level-t-${i}`} x={upright ? p1[0] : Math.max(p0[0], p1[0]) + 14} y={upright ? Math.min(p0[1], p1[1]) - 20 : p0[1]} anchor={upright ? 'middle' : 'start'} color={INK2} size={18} opacity={potentialPart}>
            {volt(base + pd * f)}
          </Text>,
        );
      }
    // The distance between the plates, beside them.
    if (gapPart > 0) {
      const [from, to] = upright ? [[X(a), Y(s0) + 26] as [number, number], [X(b), Y(s0) + 26] as [number, number]] : [[X(s0) - 26, Y(a)] as [number, number], [X(s0) - 26, Y(b)] as [number, number]];
      out.push(<Span key="gap" a={from} b={to} opacity={gapPart} />);
      labels.push(<Num key="gap-t" x={upright ? (from[0] + to[0]) / 2 : from[0] - 14} y={upright ? from[1] + 22 : (from[1] + to[1]) / 2} pre="d = " n={Math.abs(b - a) / length.metres} unit={length.symbol} figures={el.figures ?? 2} keep anchor={upright ? 'middle' : 'end'} opacity={gapPart} />);
    }
  }

  // A magnetic field at right angles to the picture: a dot where it comes out of the page and a cross where it goes in, closer together in a stronger field.
  if (el.magnetic && state.tesla !== null) {
    const m = el.magnetic;
    const [rx0, rx1, ry0, ry1] = m.region ?? el.view;
    const [left, right, high, low] = [X(rx0), X(rx1), Y(ry1), Y(ry0)];
    const tesla = state.tesla;
    // The field at the start (or, when it starts at zero, the strongest it comes to have) has its marks 76 pixels apart.
    let start = Math.abs(m.tesla);
    if (!(start > 0)) for (const c of Object.values(el.clips)) for (const ph of c.phases) if (ph.tesla !== undefined) start = Math.max(start, Math.abs(ph.tesla));
    const strength = start > 0 ? Math.abs(tesla) / start : 0;
    if (magneticPart > 0) {
      const marks: ReactElement[] = [];
      if (strength > 1e-6) {
        const pitch = Math.max(44, Math.min(120, 76 / Math.sqrt(strength)));
        const [nx, ny] = [Math.max(1, Math.round((right - left) / pitch)), Math.max(1, Math.round((low - high) / pitch))];
        for (let i = 0; i < nx; i++)
          for (let j = 0; j < ny; j++) {
            const [x, y] = [left + ((i + 0.5) / nx) * (right - left), high + ((j + 0.5) / ny) * (low - high)];
            marks.push(
              tesla > 0 ? (
                <g key={`${i}-${j}`}>
                  <circle cx={x} cy={y} r={7} fill="none" stroke={FIELD} strokeWidth={1.8} />
                  <circle cx={x} cy={y} r={2.2} fill={FIELD} />
                </g>
              ) : (
                <g key={`${i}-${j}`} stroke={FIELD} strokeWidth={2.2} strokeLinecap="round">
                  <line x1={x - 5.5} y1={y - 5.5} x2={x + 5.5} y2={y + 5.5} />
                  <line x1={x - 5.5} y1={y + 5.5} x2={x + 5.5} y2={y - 5.5} />
                </g>
              ),
            );
          }
      }
      out.push(
        <g key="magnetic" clipPath={`url(#${clip})`}>
          {m.region && <rect x={left} y={high} width={right - left} height={low - high} rx={8} fill={FIELD} fillOpacity={0.06 * magneticPart} stroke={FIELD} strokeOpacity={0.45 * magneticPart} strokeWidth={1.5} strokeDasharray="6 7" />}
          <g opacity={0.5 * magneticPart}>{marks}</g>
        </g>,
      );
      // Its strength and which way it points, in the top right corner of the field.
      const size = Math.abs(tesla);
      const figures = m.figures ?? 2;
      const text = size < 1e-12 ? 'B = 0' : size < 0.01 ? `B = ${written(size * 1000, figures, false, true).text} mT` : `B = ${written(size, figures, false, true).text} T`;
      labels.push(
        <Text key="magnetic-t" x={right - 16} y={high + 24} anchor="end" color={FIELD} size={20} opacity={magneticPart}>
          {size < 1e-12 ? text : `${text}, ${tesla > 0 ? 'out of the page' : 'into the page'}`}
        </Text>,
      );
    }
    // The detector: the side of the field that stops what comes out through it. It is drawn just outside the field, so that what lands rests on it, and a name beside a body that has landed is clear of it.
    if (m.region && m.screen) {
      const off = 14;
      const [a, b] = m.screen === 'bottom' ? [[left, low + off], [right, low + off]] : m.screen === 'top' ? [[left, high - off], [right, high - off]] : m.screen === 'left' ? [[left - off, high], [left - off, low]] : [[right + off, high], [right + off, low]];
      out.push(<line key="screen" x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={METAL} strokeWidth={5} strokeLinecap="round" />);
    }
  }

  // A uniform field over the whole picture: straight lines, evenly spaced.
  if (el.uniform && linesPart > 0) {
    const a = rad(el.uniform.angle ?? 0);
    const [dx, dy] = [Math.cos(a), -Math.sin(a)];
    const [nx, ny] = [-dy, dx];
    const [cx, cy] = [ox + pw / 2, oy + ph / 2];
    const reach = (Math.abs(pw * dx) + Math.abs(ph * dy)) / 2 + 20;
    const across = Math.abs(pw * nx) + Math.abs(ph * ny);
    const count = el.uniform.lines ?? 7;
    out.push(
      <g key="uniform" clipPath={`url(#${clip})`} opacity={0.5 * linesPart}>
        {Array.from({ length: count }, (_, j) => {
          const t = ((j + 0.5) / count - 0.5) * across;
          const [mx, my] = [cx + nx * t, cy + ny * t];
          return (
            <g key={j}>
              <line x1={mx - dx * reach} y1={my - dy * reach} x2={mx + dx * reach} y2={my + dy * reach} stroke={FIELD} strokeWidth={2} />
              {[-0.5, 0.5].map((f) => (
                <Head key={f} x={mx + dx * reach * f} y={my + dy * reach * f} turn={(Math.atan2(dy, dx) * 180) / Math.PI} />
              ))}
            </g>
          );
        })}
      </g>,
    );
  }

  // The field lines of the charges themselves, drawn out from each charge as they appear.
  if (!el.plates && !el.uniform && linesPart > 0) {
    out.push(
      <g key="field-lines" clipPath={`url(#${clip})`} opacity={0.75}>
        {fieldLines(el, state).map((line, i) => {
          const pts = line.points.map(([x, y]): [number, number] => [X(x), Y(y)]);
          if (pts.length < 2) return null;
          const lengths = pts.slice(1).map((q, j) => Math.hypot(q[0] - pts[j][0], q[1] - pts[j][1]));
          const total = lengths.reduce((n, l) => n + l, 0);
          // The arrow is half way along a line that joins two charges, and near the charge on one that leaves the picture.
          const want = line.from !== null && line.to !== null ? total / 2 : line.from !== null ? Math.min(total / 2, 80) : Math.max(total / 2, total - 80);
          let [left, j] = [want, 0];
          while (j < lengths.length - 1 && left > lengths[j]) left -= lengths[j++];
          const f = lengths[j] > 0 ? Math.min(1, left / lengths[j]) : 0;
          const head: [number, number] = [pts[j][0] + (pts[j + 1][0] - pts[j][0]) * f, pts[j][1] + (pts[j + 1][1] - pts[j][1]) * f];
          // A line grows from the charge it belongs to: out of a positive one, and back from a negative one.
          const grown = total * clamp01(linesPart);
          return (
            <g key={i}>
              <polyline points={pts.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ')} fill="none" stroke={FIELD} strokeWidth={2} strokeLinejoin="round" strokeDasharray={linesPart < 1 ? `${grown.toFixed(1)} ${(total + 10).toFixed(1)}` : undefined} strokeDashoffset={linesPart < 1 && line.from === null ? grown - total : undefined} />
              <g opacity={clamp01(linesPart * 2 - 1)}>
                <Head x={head[0]} y={head[1]} turn={(Math.atan2(pts[j + 1][1] - pts[j][1], pts[j + 1][0] - pts[j][0]) * 180) / Math.PI} />
              </g>
            </g>
          );
        })}
      </g>,
    );
  }

  // Where each body is on the screen, how large it is drawn, and how far it reaches each way.
  const boxes = el.bodies.map((b) => {
    const s = state.bodies[b.id];
    const shape = b.shape ?? 'point';
    const turn = shape === 'rod' || shape === 'cloth' ? rad(b.turn ?? 0) : 0;
    const L = shape === 'point' ? (b.radius !== undefined ? b.radius * S : b.test ? 11 : 20) : (b.radius ?? 0) * S;
    const T = shape === 'rod' || shape === 'cloth' ? (b.thick ?? (b.radius ?? 0) * (shape === 'cloth' ? 0.6 : 0.2)) * S : L;
    const [ex, ey] = [Math.abs(L * Math.cos(turn)) + Math.abs(T * Math.sin(turn)), Math.abs(L * Math.sin(turn)) + Math.abs(T * Math.cos(turn))];
    /** How far the edge is from the centre, in a direction on the screen. */
    const edge = (dx: number, dy: number) => {
      if (shape !== 'rod' && shape !== 'cloth') return L;
      const [u, v] = [dx * Math.cos(turn) - dy * Math.sin(turn), dx * Math.sin(turn) + dy * Math.cos(turn)];
      return 1 / Math.hypot(u / L, v / T);
    };
    const tone: Tone = b.tone ?? (shape === 'rod' ? 'brand' : 'theta');
    // A charge that would be written as zero is drawn with no sign (a charge on its way from positive to negative).
    const none = Math.abs(s.charge) < (b.pairs !== undefined ? 1e-9 : 0.5 * 10 ** -(el.decimals ?? 0));
    const sign = none ? INK2 : s.charge > 0 ? POSITIVE : NEGATIVE;
    return { b, s, shape, none, turn, L, T, ex, ey, edge, c: [X(s.x), Y(s.y)] as [number, number], color: TONES[tone], sign, mark: Math.max(5.5, Math.min(10, shape === 'sphere' ? L * 0.13 : shape === 'atom' ? L * 0.085 : T * 0.34)) };
  });
  type Box = (typeof boxes)[number];

  // The stands and the wires go behind the bodies.
  for (const k of boxes) {
    if (k.shape !== 'sphere') continue;
    if (k.b.stand !== false && state.floor !== null) {
      const foot = Y(state.floor);
      out.push(
        <g key={`stand-${k.b.id}`}>
          <rect x={k.c[0] - 5} y={k.c[1] + k.L - 2} width={10} height={Math.max(0, foot - k.c[1] - k.L + 2)} fill="#5b5786" />
          <rect x={k.c[0] - k.L * 0.5} y={foot - 9} width={k.L} height={9} rx={3} fill="#5b5786" />
        </g>,
      );
    }
    if (k.s.wire > 0) {
      const pts = k.s.wirePath.map(([x, y]): [number, number] => [X(x), Y(y)]);
      const length = pts.slice(1).reduce((n, q, i) => n + Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]), 0);
      const end = pts[pts.length - 1];
      const earth = clamp01((k.s.wire - 0.7) / 0.3);
      out.push(
        <g key={`wire-${k.b.id}`} stroke={METAL} strokeLinecap="round" fill="none">
          <polyline points={pts.map((q) => q.join(',')).join(' ')} strokeWidth={3} strokeDasharray={`${(length * k.s.wire).toFixed(1)} ${(length + 10).toFixed(1)}`} strokeLinejoin="round" />
          <g opacity={earth} strokeWidth={3}>
            <line x1={end[0] - 16} y1={end[1]} x2={end[0] + 16} y2={end[1]} />
            <line x1={end[0] - 10} y1={end[1] + 7} x2={end[0] + 10} y2={end[1] + 7} />
            <line x1={end[0] - 4} y1={end[1] + 14} x2={end[0] + 4} y2={end[1] + 14} />
          </g>
        </g>,
      );
    }
  }

  // The path of each body that has moved, as a line of dots.
  if (trailPart > 0)
    for (const k of boxes) {
      if (k.s.trail.length < 2) continue;
      out.push(<polyline key={`trail-${k.b.id}`} points={k.s.trail.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ')} fill="none" stroke={k.sign} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.1 9" opacity={0.85 * trailPart} clipPath={`url(#${clip})`} />);
    }

  // The bodies, with their + marks and the electrons at rest on them.
  for (const k of boxes) {
    const f = st?.focus[k.b.id] ?? 0;
    const glow = f > 0 ? { filter: `drop-shadow(0 0 ${16 * f}px ${k.shape === 'point' ? k.sign : k.color})` } : undefined;
    let shape: ReactElement;
    if (k.shape === 'point') {
      const half = k.L * 0.45;
      shape = (
        <g>
          <circle cx={k.c[0]} cy={k.c[1]} r={k.L} fill="#1b1846" stroke={k.sign} strokeWidth={3} strokeDasharray={k.b.test ? '4 4' : undefined} />
          <circle cx={k.c[0]} cy={k.c[1]} r={k.L} fill={k.sign} fillOpacity={0.35} />
          {!k.none && (
            <g stroke="#fff" strokeWidth={Math.max(2.2, k.L * 0.16)} strokeLinecap="round">
              <line x1={k.c[0] - half} y1={k.c[1]} x2={k.c[0] + half} y2={k.c[1]} />
              {k.s.charge > 0 && <line x1={k.c[0]} y1={k.c[1] - half} x2={k.c[0]} y2={k.c[1] + half} />}
            </g>
          )}
        </g>
      );
    } else if (k.shape === 'atom') {
      shape = (
        <g>
          {ATOM_SHELLS.map((r, i) => (
            <circle key={i} cx={k.c[0]} cy={k.c[1]} r={r * k.L} fill="none" stroke={INK3} strokeWidth={2} strokeOpacity={i === 0 || (k.b.pairs ?? 0) > 2 || k.s.minus.length > 2 ? 0.8 : 0.3} />
          ))}
          <circle cx={k.c[0]} cy={k.c[1]} r={ATOM_NUCLEUS * k.L} fill="#1b1846" stroke={POSITIVE} strokeWidth={2.5} />
          <circle cx={k.c[0]} cy={k.c[1]} r={ATOM_NUCLEUS * k.L} fill={POSITIVE} fillOpacity={0.22} />
        </g>
      );
    } else if (k.shape === 'sphere') {
      shape = (
        <g>
          <circle cx={k.c[0]} cy={k.c[1]} r={k.L} fill="#1b1846" stroke={METAL} strokeWidth={3} />
          <circle cx={k.c[0]} cy={k.c[1]} r={k.L} fill="#fff" fillOpacity={0.06} />
        </g>
      );
    } else {
      const cloth = k.shape === 'cloth';
      shape = (
        <g transform={`translate(${k.c[0]} ${k.c[1]}) rotate(${-(k.b.turn ?? 0)})`}>
          <rect x={-k.L} y={-k.T} width={2 * k.L} height={2 * k.T} rx={cloth ? 16 : k.T * 0.6} fill="#1b1846" />
          <rect x={-k.L} y={-k.T} width={2 * k.L} height={2 * k.T} rx={cloth ? 16 : k.T * 0.6} fill={k.color} fillOpacity={cloth ? 0.16 : 0.24} stroke={k.color} strokeWidth={3} strokeDasharray={cloth ? '1 7' : undefined} strokeLinecap="round" />
        </g>
      );
    }
    out.push(
      <g key={`b-${k.b.id}`} style={glow}>
        {shape}
        {k.s.plus.map(([x, y], i) => (
          <Plus key={`p${i}`} x={X(x)} y={Y(y)} r={k.shape === 'atom' ? Math.max(4, k.mark * 0.6) : k.mark} />
        ))}
        {k.s.minus.map(([x, y], i) => (
          <Electron key={`e${i}`} x={X(x)} y={Y(y)} r={k.mark} />
        ))}
      </g>,
    );
  }
  out.push(
    <g key="flying">
      {state.flying.map(([x, y], i) => (
        <Electron key={i} x={X(x)} y={Y(y)} r={9} glow />
      ))}
    </g>,
  );

  // The distance between the centres of each pair that is marked, on the side of the line of centres that is lower on the screen.
  const find = (id: string) => boxes.find((k) => k.b.id === id);
  const spans = (el.spans ?? (boxes.length > 1 ? [[boxes[0].b.id, boxes[1].b.id] as [string, string]] : [])).map(([a, b]) => [find(a), find(b)]).filter((pair): pair is [Box, Box] => !!pair[0] && !!pair[1]);
  if (distance > 0)
    spans.forEach(([a, b], i) => {
      const d = Math.hypot(b.c[0] - a.c[0], b.c[1] - a.c[1]) || 1;
      const u: [number, number] = [(b.c[0] - a.c[0]) / d, (b.c[1] - a.c[1]) / d];
      const n: [number, number] = u[0] >= 0 ? [-u[1], u[0]] : [u[1], -u[0]];
      const metres = Math.hypot(b.s.x - a.s.x, b.s.y - a.s.y);
      if (el.join) {
        // A dashed line from edge to edge, with the distance beside it two thirds of the way along: clear of the arrows on the first body.
        const [ra, rb] = [a.edge(u[0], u[1]) + 4, b.edge(-u[0], -u[1]) + 4];
        const at: [number, number] = [a.c[0] + u[0] * d * 0.66, a.c[1] + u[1] * d * 0.66];
        const level = Math.abs(n[0]) <= 0.7;
        out.push(<line key={`span-${i}`} x1={a.c[0] + u[0] * ra} y1={a.c[1] + u[1] * ra} x2={b.c[0] - u[0] * rb} y2={b.c[1] - u[1] * rb} stroke={INK3} strokeWidth={2} strokeDasharray="5 7" opacity={distance} />);
        labels.push(<Num key={`span-t-${i}`} x={at[0] + n[0] * (level ? 0 : 14)} y={at[1] + n[1] * (level ? 22 : 0)} n={metres / length.metres} unit={length.symbol} figures={el.figures ?? 2} keep anchor={level ? 'middle' : n[0] > 0 ? 'start' : 'end'} color={INK2} opacity={distance} />);
        return;
      }
      const low = Math.max(a.edge(n[0], n[1]), b.edge(n[0], n[1])) + 32;
      const off = (px: number, at: [number, number]): [number, number] => [at[0] + n[0] * px, at[1] + n[1] * px];
      const [from, to] = [off(low, a.c), off(low, b.c)];
      const upright = Math.abs(n[0]) > 0.7;
      out.push(
        <g key={`span-${i}`}>
          <g opacity={0.7 * distance} stroke={INK3} strokeWidth={1.5} strokeDasharray="3 6">
            <line x1={a.c[0]} y1={a.c[1]} x2={off(low + 8, a.c)[0]} y2={off(low + 8, a.c)[1]} />
            <line x1={b.c[0]} y1={b.c[1]} x2={off(low + 8, b.c)[0]} y2={off(low + 8, b.c)[1]} />
          </g>
          <Span a={from} b={to} opacity={distance} />
        </g>,
      );
      const [tx, ty, anchor] = [(from[0] + to[0]) / 2 + n[0] * (upright ? 14 : 22), (from[1] + to[1]) / 2 + n[1] * 22, upright ? (n[0] > 0 ? 'start' : 'end') : 'middle'] as const;
      // A picture that is not to scale has no number to give: the distance is only named.
      if (el.plain)
        labels.push(
          <text key={`span-t-${i}`} x={tx} y={ty} fill={INK} fontSize={24} fontStyle="italic" fontWeight={600} textAnchor={anchor} dominantBaseline="central" opacity={distance} style={{ fontFamily: FONT }}>
            r
          </text>,
        );
      else labels.push(<Num key={`span-t-${i}`} x={tx} y={ty} pre={spans.length === 1 ? 'r = ' : ''} n={metres / length.metres} unit={length.symbol} figures={el.figures ?? 2} keep anchor={anchor} color={INK} opacity={distance} />);
    });

  // The circle the magnetic field turns each charge in: its centre, and the radius from there to the charge.
  if (radiusPart > 0)
    for (const k of boxes) {
      const orbit = k.s.orbit;
      if (!orbit || !k.b.mass || (el.pulls && !el.pulls.includes(k.b.id))) continue;
      const c: [number, number] = [X(orbit.x), Y(orbit.y)];
      const d = Math.hypot(k.c[0] - c[0], k.c[1] - c[1]);
      // A circle too large for the picture has its centre far outside it: nothing is drawn for it.
      if (!(d > 30) || c[0] < ox || c[0] > ox + pw || c[1] < oy || c[1] > oy + ph) continue;
      const u: [number, number] = [(k.c[0] - c[0]) / d, (k.c[1] - c[1]) / d];
      // The size is written on the side of the radius that is higher on the screen.
      const n: [number, number] = u[0] >= 0 ? [u[1], -u[0]] : [-u[1], u[0]];
      const level = Math.abs(n[0]) <= 0.7;
      out.push(
        <g key={`radius-${k.b.id}`} opacity={radiusPart} stroke={INK2} strokeLinecap="round">
          <line x1={c[0]} y1={c[1]} x2={k.c[0] - u[0] * (k.L + 4)} y2={k.c[1] - u[1] * (k.L + 4)} strokeWidth={2} strokeDasharray="5 7" />
          <line x1={c[0] - 6} y1={c[1]} x2={c[0] + 6} y2={c[1]} strokeWidth={2.4} />
          <line x1={c[0]} y1={c[1] - 6} x2={c[0]} y2={c[1] + 6} strokeWidth={2.4} />
        </g>,
      );
      // The size is written near the centre, clear of the force arrow, which lies along the same line from the charge.
      labels.push(<Num key={`radius-t-${k.b.id}`} x={c[0] + u[0] * d * 0.3 + n[0] * (level ? 0 : 14)} y={c[1] + u[1] * d * 0.3 + n[1] * (level ? 22 : 0)} pre="r = " n={orbit.r / length.metres} unit={length.symbol} figures={el.figures ?? 2} keep anchor={level ? 'middle' : n[0] > 0 ? 'start' : 'end'} color={INK2} opacity={radiusPart} />);
    }

  // The name of each body and its charge, the forces on it, and its velocity.
  const fs = el.forceScale ?? 110 / Math.max(1e-300, peak.force);
  const es = el.fieldScale ?? 110 / Math.max(1e-300, peak.field);
  const vs = el.velocityScale ?? (peak.speed > 0 ? 90 / peak.speed : 60);
  const sources = el.bodies.filter((b) => !b.test).length;
  for (const k of boxes) {
    const at = k.b.labelAt ?? 'above';
    const drawn = !el.pulls || el.pulls.includes(k.b.id);
    // A force too small to see beside the largest of the picture (less than a millionth of it) is not drawn: the pull of one ion on another, beside the force of a field.
    const pushes = Object.entries(k.s.from).filter(([, f]) => f.n > 1e-6 * peak.force);
    // The sum is drawn when there is more than one force to add, or when the forces themselves are not shown.
    const summed = drawn && net > 0 && k.s.force.n > 0 && (pushes.length > 1 || force <= 0);
    // The fields where a test charge is: of each charge that makes one there, and of the plates.
    const made = k.b.test ? Object.entries(k.s.fields).filter(([, f]) => f.n > 0) : [];
    const fieldSum = k.b.test && netField > 0 && (made.length > 1 || fieldPart <= 0);
    // A level arrow that points the same way as one already on the body goes over it, where the name of the body is: the name makes room for it.
    let lift = 0;
    const planned: number[] = [];
    for (const [angle, opacity] of [
      ...(drawn && force > 0 ? pushes.map(([, f]): [number, number] => [f.angle, force]) : []),
      ...(summed ? [[k.s.force.angle, net] as [number, number]] : []),
      ...(fieldPart > 0 ? made.map(([, f]): [number, number] => [f.angle, fieldPart]) : []),
      ...(fieldSum && k.s.field.n > 1e-4 * peak.field ? [[k.s.field.angle, netField] as [number, number]] : []),
    ]) {
      const over = planned.filter((a) => Math.abs(((a - angle + 540) % 360) - 180) < 25).length;
      if (Math.abs(Math.sin(rad(angle))) < 0.35 && over > 0) lift = Math.max(lift, (26 * over - 2) * opacity);
      planned.push(angle);
    }
    // A body on an upright plate has its name and charge beside the plate, in the gap, and not over the plate's own marks.
    let aside = 0;
    if (el.plates && state.plates && el.plates.across !== 'y' && (at === 'above' || at === 'below')) {
      const [first, second] = state.plates.at;
      for (const [face, inward] of [[first, Math.sign(second - first)], [second, Math.sign(first - second)]] as const) {
        const near = clamp01(1 - Math.abs(k.c[0] - X(face)) / 40);
        if (near > 0) aside = inward * near * 48;
      }
    }
    const lines = [k.b.label !== undefined ? { text: k.b.label, color: INK, opacity: 1 } : null, chargePart > 0 && !(k.b.test && Math.abs(k.s.charge) < 1e-9) ? { text: chargeText(k.s.charge, unit, el.decimals ?? 0, k.b.pairs !== undefined), color: k.sign, opacity: chargePart } : null].filter((l): l is { text: string; color: string; opacity: number } => !!l);
    lines.forEach((l, i) => {
      // The charge is written next to the body, and the name beyond it.
      const row = lines.length - 1 - i;
      const [x, y, anchor] =
        at === 'above'
          ? ([k.c[0] + aside, k.c[1] - k.ey - 22 - lift - 28 * row * (lines[1]?.opacity ?? 1), 'middle'] as const)
          : at === 'below'
            ? ([k.c[0] + aside, k.c[1] + k.ey + 24 + 28 * i, 'middle'] as const)
            : ([k.c[0] + (at === 'left' ? -1 : 1) * (k.ex + 14), k.c[1] + (lines.length > 1 ? (i === 0 ? -14 : 14) : 0), at === 'left' ? 'end' : 'start'] as const);
      labels.push(
        <Text key={`n-${k.b.id}-${i}`} x={x} y={y} anchor={anchor} color={l.color} opacity={l.opacity}>
          {l.text}
        </Text>,
      );
    });

    const shown: number[] = [];
    /** How many arrows already drawn on this body point nearly the same way. */
    const beside = (angle: number) => shown.filter((a) => Math.abs(((a - angle + 540) % 360) - 180) < 25).length;
    type Tag = { unit: string; figures: number; decimals?: number; pre?: string; words?: string; name?: string };
    const arrow = (key: string, f: { n: number; angle: number }, scale: number, color: string, opacity: number, tag: Tag, weight: number) => {
      const words = tag.words ?? '';
      // A picture that is not to scale keeps its arrows short enough to read as two bodies come together.
      const len = Math.min(el.plain ? 150 : Infinity, Math.max(10, f.n * scale));
      const [dx, dy] = [Math.cos(rad(f.angle)), -Math.sin(rad(f.angle))];
      const flat = Math.abs(dy) < 0.35;
      // A second arrow the same way goes beside the first: over it when they are level, to its left otherwise.
      const lane = beside(f.angle);
      shown.push(f.angle);
      const shift: [number, number] = flat ? [0, -26 * lane] : [-26 * lane, 0];
      const reach = k.edge(dx, dy) + 4;
      // With no room for it before the body it points at, the arrow is drawn behind its own body, pointing into it.
      // In a picture that is not to scale every pull is drawn that way, so that no arrow jumps as two bodies come together.
      let room = Infinity;
      let ahead: Box | undefined;
      for (const o of boxes) {
        const [ux, uy] = [o.c[0] - k.c[0], o.c[1] - k.c[1]];
        const d = Math.hypot(ux, uy) || 1;
        if (o === k || (ux * dx + uy * dy) / d <= 0.94 || d - o.edge(-dx, -dy) - reach >= room) continue;
        [room, ahead] = [d - o.edge(-dx, -dy) - reach, o];
      }
      // The body ahead has an arrow of its own that points back this way, with its size written under it.
      const facing = !!ahead && (!el.pulls || el.pulls.includes(ahead.b.id)) && k.b.id in ahead.s.from;
      const behind = el.plain ? room < Infinity : len > room - 6;
      const start = behind ? -(k.edge(-dx, -dy) + 4 + len) : reach;
      const from: [number, number] = [k.c[0] + dx * start + shift[0], k.c[1] + dy * start + shift[1]];
      const tip: [number, number] = [from[0] + dx * len, from[1] + dy * len];
      out.push(<Arrow key={key} x={from[0]} y={from[1]} len={len} turn={f.angle} color={color} weight={weight} opacity={opacity} />);
      if (el.plain) return;
      const side = dx > 0 ? 'start' : 'end';
      const figures = tag.figures;
      // Two bodies that pull each other have their sizes written between them; when there is no room for both there, each goes under its own body, on the far side.
      const size = written(f.n, figures, el.notation === 'sci', true);
      const wide = tag.name ? tag.name.length * 12 : (size.text.length + (size.power !== null ? 5 + String(size.power).length * 0.7 : 0) + 2 + words.length + (tag.pre ?? '').length) * 12;
      const outward = flat && !behind && lane === 0 && facing && wide > (room + reach) / 2 - 12;
      const [x, y, anchor] = outward
        ? ([k.c[0] - Math.sign(dx) * 6, from[1] + k.ey + 14, dx > 0 ? 'end' : 'start'] as const)
        : flat
          ? lane > 0
            ? ([tip[0] + Math.sign(dx) * 12, tip[1], side] as const)
            : ([from[0] + Math.sign(dx) * 4, from[1] + 28, side] as const)
          : Math.abs(dx) < 0.35
            ? // Straight up or down: beside the middle of the arrow, to its right (a second one the same way, to its left).
              ([(from[0] + tip[0]) / 2 + (lane > 0 ? -16 : 16), (from[1] + tip[1]) / 2, lane > 0 ? 'end' : 'start'] as const)
            : ([tip[0] + dx * 16, tip[1] + dy * 20, side] as const);
      // A name, a size with a fixed number of decimal places, a whole number with its thousands apart, or a size to so many figures.
      const plainText = tag.name ?? (tag.decimals !== undefined ? `${tag.pre ?? ''}${f.n.toFixed(tag.decimals)} ${tag.unit}${words}` : size.power === null && grouped(size.text) !== size.text ? `${tag.pre ?? ''}${grouped(size.text)} ${tag.unit}${words}` : null);
      if (plainText !== null)
        labels.push(
          <Text key={`${key}-t`} x={x} y={y} anchor={anchor} color={color} opacity={opacity}>
            {plainText}
          </Text>,
        );
      else labels.push(<Num key={`${key}-t`} x={x} y={y} anchor={anchor} pre={tag.pre ?? ''} n={f.n} unit={`${tag.unit}${words}`} figures={figures} keep sci={el.notation === 'sci'} color={color} opacity={opacity} />);
    };
    if (summed && anglePart > 0) {
      const a = k.s.force.angle;
      const [dx, dy] = [Math.cos(rad(a)), -Math.sin(rad(a))];
      const acute = Math.min(Math.abs(a), 180 - Math.abs(a));
      // Measured from the east-west line, on the side the force leans to. The line itself lies under the arrows.
      if (acute > 2 && acute < 88) {
        const west = dx < 0 ? -1 : 1;
        const r = k.edge(dx, dy) + 44;
        const mid = rad(west > 0 ? (Math.sign(a) * acute) / 2 : Math.sign(a) * (180 - acute / 2));
        out.push(<line key={`east-${k.b.id}`} x1={k.c[0]} y1={k.c[1]} x2={k.c[0] + west * (r + 40)} y2={k.c[1]} stroke={INK3} strokeWidth={2} strokeDasharray="5 7" opacity={anglePart} />);
        labels.push(
          <g key={`angle-${k.b.id}`} opacity={anglePart}>
            <path d={`M ${k.c[0] + west * r} ${k.c[1]} A ${r} ${r} 0 0 ${(west > 0) === (dy < 0) ? 0 : 1} ${k.c[0] + dx * r} ${k.c[1] + dy * r}`} fill="none" stroke={NET} strokeWidth={2.5} />
            <Text x={k.c[0] + Math.cos(mid) * (r + 34)} y={k.c[1] - Math.sin(mid) * (r + 20)} color={NET} size={20}>
              {`${acute.toFixed(el.angleDecimals ?? 1)}°`}
            </Text>
          </g>,
        );
      }
    }
    if (drawn && force > 0)
      for (const [id, f] of pushes) {
        const by = find(id)?.b.label;
        const name = el.names ? (id === 'weight' ? 'Weight' : id === 'magnetic' ? 'Magnetic force' : 'Electric force') : undefined;
        arrow(`f-${k.b.id}-${id}`, f, fs, id === 'weight' ? WEIGHT : PUSH, force, { unit: 'N', figures: el.forceFigures ?? 3, decimals: el.forceDecimals, words: pushes.length > 1 && sources > 2 && by !== undefined ? ` from ${by}` : '', name }, 9);
      }
    if (summed) arrow(`net-${k.b.id}`, k.s.force, fs, NET, net, { unit: 'N', figures: el.forceFigures ?? 3, decimals: el.forceDecimals, name: el.names ? 'Net force' : undefined }, 10);
    // The field where a test charge is: of each charge that makes it, and their sum.
    if (k.b.test) {
      const tag = { unit: 'N/C', figures: el.fieldFigures ?? 3 };
      if (fieldPart > 0)
        for (const [id, f] of made) {
          const by = find(id)?.b.label;
          arrow(`e-${k.b.id}-${id}`, f, es, FIELD, fieldPart, { ...tag, pre: made.length === 1 ? 'E = ' : '', words: made.length > 1 && by !== undefined ? ` from ${by}` : '' }, 7);
        }
      if (fieldSum) {
        if (k.s.field.n > 1e-4 * peak.field) arrow(`en-${k.b.id}`, k.s.field, es, NET, netField, { ...tag, pre: 'E = ' }, 8);
        else
          labels.push(
            <Text key={`en-${k.b.id}-0`} x={k.c[0]} y={k.c[1] - k.ey - 22 - 28 * lines.length - 6} color={NET} opacity={netField}>
              E = 0
            </Text>,
          );
      }
    }
    // A test charge with no charge only marks a path: its trail is drawn, but not its velocity.
    if (vel > 0 && k.b.mass && k.s.speed * vs >= 1 && !(k.b.test && k.b.charge === 0)) {
      const len = Math.max(12, k.s.speed * vs);
      const [dx, dy] = [k.s.v[0] / k.s.speed, -k.s.v[1] / k.s.speed];
      const reach = k.edge(dx, dy) + 4;
      const flat = Math.abs(dy) < 0.35;
      const lane = flat ? 26 * beside((Math.atan2(k.s.v[1], k.s.v[0]) * 180) / Math.PI) : 0;
      out.push(<Arrow key={`v-${k.b.id}`} x={k.c[0] + dx * reach} y={k.c[1] + dy * reach - lane} len={len} turn={(Math.atan2(k.s.v[1], k.s.v[0]) * 180) / Math.PI} color={VELOCITY} weight={7} opacity={vel} />);
      if (el.speedFigures) labels.push(<Num key={`v-${k.b.id}-t`} x={k.c[0] + dx * (reach + len) + (flat ? Math.sign(dx) * 12 : 14)} y={k.c[1] + dy * (reach + len) - lane} anchor={flat && dx < 0 ? 'end' : 'start'} n={k.s.speed} unit="m/s" figures={el.speedFigures} keep color={VELOCITY} opacity={vel} />);
    }
  }
  out.push(<g key="labels">{labels}</g>);

  // The energy of the first body that can move: what it can still lose between the plates, and its kinetic energy.
  const mover = boxes.find((k) => k.b.mass);
  if (energyPart > 0 && mover && peak.energy > 0) {
    const [bw, gap, tall] = [46, 58, Math.max(40, Math.min(150, ph - 150))];
    const left = el.energyAt === 'left' ? ox + 46 : ox + pw - 46 - 2 * bw - gap;
    const foot = oy + ph - 62;
    // In electronvolts for a particle whose charge is counted in elementary charges; otherwise in the joules, or the part of a joule, that suits the largest value.
    const inEv = (el.unit ?? 'μC') === 'e';
    const [per, symbol] = inEv ? [CHARGE_UNITS.e, 'eV'] : peak.energy >= 1 ? [1, 'J'] : peak.energy >= 1e-3 ? [1e-3, 'mJ'] : peak.energy >= 1e-6 ? [1e-6, 'μJ'] : peak.energy >= 1e-9 ? [1e-9, 'nJ'] : [1, 'J'];
    const bars: Array<[string, number, string]> = [
      ['Potential', Math.max(0, mover.s.stored ?? 0), WEIGHT],
      ['Kinetic', mover.s.kinetic, VELOCITY],
    ];
    out.push(
      <g key="energy" opacity={energyPart}>
        {bars.map(([name, joules, color], i) => {
          const x = left + i * (bw + gap);
          const high = tall * clamp01(joules / peak.energy);
          // Three significant figures, so that the two numbers have room side by side while they change.
          const shown = Math.abs(joules) < 5e-4 * peak.energy ? 0 : Number((joules / per).toPrecision(3));
          return (
            <g key={name}>
              <rect x={x} y={foot - tall} width={bw} height={tall} rx={6} fill="rgb(255 255 255 / 0.05)" stroke={INK3} strokeOpacity={0.5} strokeWidth={1.5} />
              <rect x={x} y={foot - high} width={bw} height={high} rx={Math.min(6, high / 2)} fill={color} fillOpacity={0.85} />
              <Num x={x + bw / 2} y={foot - tall - 18} n={shown} unit={symbol} figures={3} color={color} size={18} />
              <Text x={x + bw / 2} y={foot + 20} size={17} color={INK2}>
                {name}
              </Text>
            </g>
          );
        })}
      </g>,
    );
  }

  // The note of a phase, in the top left corner of the bench: the table and the stands are at the bottom.
  if (state.note) {
    const wide = Math.max(160, state.note.length * 10.5 + 40);
    out.push(
      <g key="note">
        <rect x={ox + 14} y={oy + 14} width={wide} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={ox + 14 + wide / 2} y={oy + 33.5} size={19} color="#fff">
          {state.note}
        </Text>
      </g>,
    );
  }

  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
