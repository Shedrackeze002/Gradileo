/**
 * Magnets, wires and compasses seen from above (src/video/magnets.ts works out the field). A bar
 * magnet is red at its north pole and blue at its south pole; a wire seen end-on is a yellow ring
 * with a dot when its current comes out of the page and a cross when it goes in. The field is
 * violet: its lines, and an arrow at each probe. A compass needle points its red end along the
 * field where it is, a piece of iron shows its domains as small arrows, and a force is orange.
 * The poles of the magnet that makes a uniform field are drawn from one end, with a balance under
 * them if the element has one, and the coil of a motor is an arm on an axle with a wire at each
 * end, a split ring round the axle and two brushes. The coil of a generator has two slip rings
 * instead, drawn one inside the other, and a graph beside it on which the emf at the brushes draws
 * itself as the coil is turned. A pickup coil is seen from the side, with the
 * far half of each turn behind the magnet and the near half in front of it, and a meter whose
 * needle rests in the middle and swings either way.
 */
import type { ReactElement } from 'react';
import type { MagnetsEl } from '../script.ts';
import { balanceReading, barForce, coilEmf, coilOutput, coilSides, fieldAt, magnetLines, magnetsAt, peakBarForce, pickupAt, pickupPeak, wireForce } from '../magnets.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Num, Span } from './Gravity.tsx';
import { Arrow, clamp01, FONT, INK2, Text } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

const NORTH = TONES.bad;
const SOUTH = TONES.adj;
const FIELD = TONES.brand;
const CURRENT = TONES.theta;
const PUSH = TONES.opp;
const WEIGHT = TONES.hyp;
const BACK = '#17143c';
const rad = (deg: number) => (deg * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

/** The head of an arrow on a field line, at a point, turned to an angle on the screen. */
function Head({ x, y, turn, size = 9 }: { x: number; y: number; turn: number; size?: number }) {
  return <polygon points={`${size},0 ${-size * 0.7},${size * 0.62} ${-size * 0.7},${-size * 0.62}`} transform={`translate(${x} ${y}) rotate(${turn})`} fill={FIELD} />;
}

/** Where a name goes beside a thing: a point this far from its centre, and how the text is anchored. */
function beside(x: number, y: number, side: 'above' | 'below' | 'left' | 'right', gap: number): { x: number; y: number; anchor: 'start' | 'middle' | 'end' } {
  if (side === 'left') return { x: x - gap, y, anchor: 'end' };
  if (side === 'right') return { x: x + gap, y, anchor: 'start' };
  return { x, y: y + (side === 'above' ? -gap : gap), anchor: 'middle' };
}

/** A wire seen end-on: a ring, with a dot when its current comes out of the page and a cross when it goes in. */
function Ring({ cx, cy, amps }: { cx: number; cy: number; amps: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={13} fill={BACK} stroke={CURRENT} strokeWidth={3.5} />
      {amps > 1e-9 && <circle cx={cx} cy={cy} r={4.5} fill={CURRENT} />}
      {amps < -1e-9 && <path d={`M${cx - 6},${cy - 6} L${cx + 6},${cy + 6} M${cx - 6},${cy + 6} L${cx + 6},${cy - 6}`} stroke={CURRENT} strokeWidth={3} strokeLinecap="round" />}
    </>
  );
}

export function MagnetsView({ el, st, w, h, plays }: { el: MagnetsEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const played = plays ?? st?.plays ?? [];
  const state = magnetsAt(el, played);
  const part = (name: string) => ownPart(st, name);
  const [linesPart, compassPart, fieldPart, distancePart, forcePart, weightPart, currentPart, polesPart, tracePart] = ['lines', 'compass', 'field', 'distance', 'force', 'weight', 'current', 'poles', 'trace'].map(part);
  const glow = (id: string) => ((st?.focus[id] ?? 0) > 0 ? { filter: `drop-shadow(0 0 ${14 * (st?.focus[id] ?? 0)}px #fff)` } : undefined);
  const [bars, wires, iron] = [el.bars ?? [], el.wires ?? [], el.iron ?? []];
  const figures = el.figures ?? 2;
  const length = el.length ?? { metres: 1, symbol: 'm' };
  const out: ReactElement[] = [];

  // One scale both ways: the view fills a panel under the label.
  const [x0, x1, y0, y1] = el.view;
  const top = el.label ? 30 : 0;
  const S = Math.min(w / (x1 - x0), (h - top) / (y1 - y0));
  const [pw, ph] = [(x1 - x0) * S, (y1 - y0) * S];
  const [ox, oy] = [(w - pw) / 2, top + (h - top - ph) / 2];
  const X = (x: number) => ox + (x - x0) * S;
  const Y = (y: number) => oy + (y1 - y) * S;
  const clip = `magnets-${el.id}`;

  if (el.label)
    out.push(
      <text key="label" x={0} y={14} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {el.label}
      </text>,
    );
  out.push(
    <g key="panel">
      <defs>
        <clipPath id={clip}>
          <rect x={ox} y={oy} width={pw} height={ph} rx={14} />
        </clipPath>
      </defs>
      <rect x={ox} y={oy} width={pw} height={ph} rx={14} fill="rgb(8 7 28 / 0.55)" stroke="rgb(188 217 255 / 0.25)" strokeWidth={1.5} />
    </g>,
  );

  // The Earth: a disc round the first bar, with the axis it turns on and its geographic poles named.
  if (el.earth !== undefined && bars.length) {
    const [cx, cy] = [X(state.at[bars[0].id][0]), Y(state.at[bars[0].id][1])];
    const R = el.earth * S;
    out.push(
      <g key="earth" clipPath={`url(#${clip})`}>
        <circle cx={cx} cy={cy} r={R} fill="rgb(56 132 214 / 0.28)" stroke="rgb(130 190 255 / 0.7)" strokeWidth={2.5} />
        <line x1={cx} y1={cy - R - 14} x2={cx} y2={cy + R + 14} stroke={INK3} strokeWidth={2} strokeDasharray="5 7" />
        <Text x={cx + 12} y={cy - R - 20} anchor="start" size={19} color={INK2}>Geographic north</Text>
        <Text x={cx + 12} y={cy + R + 22} anchor="start" size={19} color={INK2}>Geographic south</Text>
      </g>,
    );
  }

  // The field lines, drawn out along the field as they appear.
  if (linesPart > 0) {
    out.push(
      <g key="lines" clipPath={`url(#${clip})`} opacity={0.75}>
        {magnetLines(el, state).map((line, i) => {
          const pts = line.points.map(([x, y]): [number, number] => [X(x), Y(y)]);
          if (pts.length < 2) return null;
          const lengths = pts.slice(1).map((q, j) => Math.hypot(q[0] - pts[j][0], q[1] - pts[j][1]));
          const total = lengths.reduce((n, l) => n + l, 0);
          // One arrow half way along, or two on a long line.
          const heads = (total > 700 ? [1 / 3, 2 / 3] : [1 / 2]).map((f) => {
            let [left, j] = [total * f, 0];
            while (j < lengths.length - 1 && left > lengths[j]) left -= lengths[j++];
            const g = lengths[j] > 0 ? Math.min(1, left / lengths[j]) : 0;
            return { x: pts[j][0] + (pts[j + 1][0] - pts[j][0]) * g, y: pts[j][1] + (pts[j + 1][1] - pts[j][1]) * g, turn: deg(Math.atan2(pts[j + 1][1] - pts[j][1], pts[j + 1][0] - pts[j][0])) };
          });
          const grown = total * clamp01(linesPart);
          return (
            <g key={i}>
              <polyline points={pts.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ')} fill="none" stroke={FIELD} strokeWidth={2} strokeLinejoin="round" strokeDasharray={linesPart < 1 ? `${grown.toFixed(1)} ${(total + 10).toFixed(1)}` : undefined} />
              <g opacity={clamp01(linesPart * 2 - 1)}>
                {heads.map((head, k) => (
                  <Head key={k} x={head.x} y={head.y} turn={head.turn} />
                ))}
              </g>
            </g>
          );
        })}
      </g>,
    );
  }

  // The magnet that makes the uniform field, seen from one end: a pole each side of the gap, joined under it when it is a U.
  if (el.yoke) {
    const { faces, span } = el.yoke;
    const T = (el.yoke.thick ?? (x1 - x0) / 8) * S;
    const B = (el.yoke.base ?? 0) * S;
    const [xl, xr, yt, yb] = [X(faces[0]), X(faces[1]), Y(span[1]), Y(span[0])];
    const mid = (xl + xr) / 2;
    const [left, right] = (el.uniform?.[0] ?? 1) > 0 ? [NORTH, SOUTH] : [SOUTH, NORTH];
    const letter = Math.min(26, Math.max(15, T * 0.5));
    out.push(
      <g key="yoke">
        <path d={`M${xl - T},${yt} H${xl} V${yb} H${mid} V${yb + B} H${xl - T} Z`} fill={left} />
        <path d={`M${xr + T},${yt} H${xr} V${yb} H${mid} V${yb + B} H${xr + T} Z`} fill={right} />
        {B > 0 ? (
          <path d={`M${xl - T},${yt} H${xl} V${yb} H${xr} V${yt} H${xr + T} V${yb + B} H${xl - T} Z`} fill="none" stroke="#0d0c24" strokeWidth={2} strokeLinejoin="round" />
        ) : (
          <>
            <rect x={xl - T} y={yt} width={T} height={yb - yt} fill="none" stroke="#0d0c24" strokeWidth={2} />
            <rect x={xr} y={yt} width={T} height={yb - yt} fill="none" stroke="#0d0c24" strokeWidth={2} />
          </>
        )}
        <Text x={xl - T / 2} y={(yt + yb) / 2} size={letter} color="#fff" weight={700}>{left === NORTH ? 'N' : 'S'}</Text>
        <Text x={xr + T / 2} y={(yt + yb) / 2} size={letter} color="#fff" weight={700}>{right === NORTH ? 'N' : 'S'}</Text>
      </g>,
    );
    // The balance the magnet stands on: a pan, and a display that reads in grams.
    const reading = balanceReading(el, state);
    if (el.balance && reading !== null) {
      const under = yb + B;
      const [l, r] = [xl - T - 24, xr + T + 24];
      out.push(
        <g key="balance">
          <rect x={l} y={under} width={r - l} height={8} rx={3} fill={INK2} />
          <rect x={mid - 18} y={under + 8} width={36} height={9} fill="#55527a" />
          <rect x={l + 26} y={under + 17} width={r - l - 52} height={48} rx={9} fill="#2a2752" stroke={INK3} strokeWidth={2} />
          <rect x={mid - 86} y={under + 24} width={172} height={34} rx={5} fill="#0d0c24" stroke="rgb(188 217 255 / 0.35)" strokeWidth={1.5} />
          <text x={mid} y={under + 42} fill={TONES.good} fontSize={23} fontWeight={600} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: FONT, fontVariantNumeric: 'tabular-nums' }}>
            {`${reading.toFixed(el.balance.decimals ?? 2)} g`}
          </text>
        </g>,
      );
    }
  }

  // Pieces of iron: each domain is a small arrow, and they turn to the field as they are lined up.
  for (const b of iron) {
    const [cx, cy] = [X(state.at[b.id][0]), Y(state.at[b.id][1])];
    const [L, T] = [b.long * S, b.thick * S];
    const [cols, rows] = b.cells ?? [8, 3];
    const [fx, fy] = fieldAt(el, state, state.at[b.id][0], state.at[b.id][1]);
    const target = Math.hypot(fx, fy) > 0 ? Math.atan2(fy, fx) : 0;
    const order = clamp01(state.order[b.id]);
    const half = Math.min(L / cols, T / rows) * 0.34;
    const at = beside(cx, cy, 'below', T / 2 + 20);
    out.push(
      <g key={`iron-${b.id}`} style={glow(b.id)}>
        <rect x={cx - L / 2} y={cy - T / 2} width={L} height={T} rx={5} fill="rgb(58 56 96 / 0.9)" stroke={INK2} strokeWidth={2.5} />
        {Array.from({ length: cols * rows }, (_, k) => {
          const [dx, dy] = [cx - L / 2 + ((k % cols) + 0.5) * (L / cols), cy - T / 2 + (Math.floor(k / cols) + 0.5) * (T / rows)];
          // Each domain starts at an angle of its own (the golden angle spreads them every way), and turns the short way round.
          const own = rad((k * 137.508 + 40) % 360);
          const a = own + Math.atan2(Math.sin(target - own), Math.cos(target - own)) * order;
          return <Arrow key={k} x={dx - half * Math.cos(a)} y={dy + half * Math.sin(a)} len={2 * half} turn={deg(a)} color={order > 0.98 ? NORTH : INK} weight={3} opacity={0.9} />;
        })}
        {b.label && <Text x={at.x} y={at.y} size={20} color={INK2}>{b.label}</Text>}
      </g>,
    );
  }

  // The pickup coil, seen from the side: the far half of each turn (behind the magnet), the leads and the meter.
  const pick = el.pickup
    ? (() => {
        const k = el.pickup;
        const drawn = k.drawn ?? 7;
        const [cx, cy] = [X(k.at[0]), Y(k.at[1])];
        const [a, pitch] = [k.radius * S, (k.long * S) / drawn];
        const left = cx - (k.long * S) / 2;
        // The meter is smaller in a small picture (a thumbnail), so that it stays inside it.
        const small = Math.max(0.55, Math.min(1, S / 80));
        const [mx, my] = k.meter ? [X(k.meter[0]), Y(k.meter[1])] : [cx, cy + a + 104 * small];
        const now = pickupAt(el, played);
        const peak = pickupPeak(el);
        // How far the needle swings, from −1 to 1: to the right while the flux along +x grows.
        const swing = peak.emf > 0 ? Math.max(-1, Math.min(1, -now.emf / peak.emf)) : 0;
        return { k, drawn, cx, cy, a, pitch, left, right: left + drawn * pitch, mx, my, now, peak, swing, small };
      })()
    : null;
  if (pick) {
    const { drawn, cy, a, pitch, left, right, mx, my, swing, small } = pick;
    const turn = rad(52 * swing);
    const [px, py] = [mx, my + 24];
    out.push(
      <g key="pickup-back" style={glow(pick.k.id)}>
        {Array.from({ length: drawn }, (_, j) => (
          <line key={j} x1={left + (j + 0.5) * pitch} y1={cy - a} x2={left + (j + 1) * pitch} y2={cy + a} stroke="#6f6a99" strokeWidth={5} strokeLinecap="round" />
        ))}
        <path d={`M${left},${cy + a} V${my} H${mx - 60 * small} M${right},${cy + a} V${my} H${mx + 60 * small}`} fill="none" stroke="#b9b4dc" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
        <g transform={`translate(${mx} ${my}) scale(${small}) translate(${-mx} ${-my})`}>
          <rect x={mx - 62} y={my - 42} width={124} height={84} rx={12} fill="#2a2752" stroke={INK3} strokeWidth={2} />
          <path d={`M${px - 46 * Math.sin(rad(52))},${py - 46 * Math.cos(rad(52))} A46,46 0 0 1 ${px + 46 * Math.sin(rad(52))},${py - 46 * Math.cos(rad(52))}`} fill="none" stroke={INK3} strokeWidth={2.5} />
          {[-52, -26, 0, 26, 52].map((mark) => (
            <line key={mark} x1={px + 46 * Math.sin(rad(mark))} y1={py - 46 * Math.cos(rad(mark))} x2={px + (mark === 0 ? 56 : 52) * Math.sin(rad(mark))} y2={py - (mark === 0 ? 56 : 52) * Math.cos(rad(mark))} stroke={mark === 0 ? INK : INK3} strokeWidth={mark === 0 ? 3 : 2} strokeLinecap="round" />
          ))}
          <line x1={px} y1={py} x2={px + 44 * Math.sin(turn)} y2={py - 44 * Math.cos(turn)} stroke={TONES.bad} strokeWidth={3.5} strokeLinecap="round" />
          <circle cx={px} cy={py} r={5} fill={INK2} />
        </g>
      </g>,
    );
  }

  // Bar magnets: the north half red and the south half blue, each with its letter.
  for (const b of bars) {
    const [cx, cy] = [X(state.at[b.id][0]), Y(state.at[b.id][1])];
    const [L, T] = [b.long * S, b.thick * S];
    const a = state.angle[b.id];
    const [ux, uy] = [Math.cos(rad(a)), -Math.sin(rad(a))];
    const letter = Math.min(24, Math.max(13, T * 0.62));
    const reach = Math.abs(ux) * (T / 2) + Math.abs(uy) * (L / 2);
    out.push(
      <g key={`bar-${b.id}`} style={glow(b.id)} opacity={b.faint ? 0.6 : 1}>
        <g transform={`translate(${cx} ${cy}) rotate(${-a})`}>
          <rect x={-L / 2} y={-T / 2} width={L / 2} height={T} fill={SOUTH} />
          <rect x={0} y={-T / 2} width={L / 2} height={T} fill={NORTH} />
          <rect x={-L / 2} y={-T / 2} width={L} height={T} rx={3} fill="none" stroke="#0d0c24" strokeWidth={2} />
        </g>
        {T >= 16 && (
          <>
            <Text x={cx + ux * (L / 2 - letter * 0.75)} y={cy + uy * (L / 2 - letter * 0.75)} size={letter} color="#fff" weight={700}>N</Text>
            <Text x={cx - ux * (L / 2 - letter * 0.75)} y={cy - uy * (L / 2 - letter * 0.75)} size={letter} color="#fff" weight={700}>S</Text>
          </>
        )}
        {b.label && <Text x={cx} y={cy + reach + 20} size={20} color={INK2}>{b.label}</Text>}
      </g>,
    );
  }

  // The push or pull on each bar from the others: an arrow over it, which grows with the force (as its square root, so that a weak push still shows).
  if (forcePart > 0 && bars.length > 1) {
    const peak = peakBarForce(el);
    for (const b of bars) {
      const [fx, fy] = barForce(el, state, b.id);
      const f = Math.hypot(fx, fy);
      if (!(peak > 0) || f < peak * 0.01) continue;
      const a = state.angle[b.id];
      const lift = Math.abs(Math.cos(rad(a))) * ((b.thick * S) / 2) + Math.abs(Math.sin(rad(a))) * ((b.long * S) / 2) + 18;
      out.push(<Arrow key={`push-${b.id}`} x={X(state.at[b.id][0])} y={Y(state.at[b.id][1]) - lift} len={Math.max(16, 90 * Math.sqrt(f / peak))} turn={deg(Math.atan2(fy, fx))} color={PUSH} opacity={forcePart} />);
    }
  }

  // The near half of each turn of the pickup coil, in front of the magnet, with the induced current, the poles it gives the coil and its push on the magnet.
  if (pick) {
    const { k, drawn, cy, a, pitch, left, right, now, peak, swing } = pick;
    const strength = clamp01(Math.abs(swing) / 0.12);
    // The strand runs up the screen to the right. The induced current goes up it when the field it makes inside the coil is along −x.
    const along = Math.atan2(-2 * a, pitch / 2);
    const way = now.emf < 0 ? along : along + Math.PI;
    out.push(
      <g key="pickup-front" style={glow(k.id)}>
        {Array.from({ length: drawn }, (_, j) => (
          <line key={j} x1={left + j * pitch} y1={cy + a} x2={left + (j + 0.5) * pitch} y2={cy - a} stroke="#d9d5f2" strokeWidth={5} strokeLinecap="round" />
        ))}
        {currentPart > 0 &&
          strength > 0 &&
          Array.from({ length: drawn }, (_, j) => (
            <polygon key={j} points="13,0 -8,8.5 -8,-8.5" transform={`translate(${left + (j + 0.25) * pitch} ${cy}) rotate(${deg(way)})`} fill={CURRENT} stroke="#0d0c24" strokeWidth={1.5} opacity={currentPart * strength} />
          ))}
        {polesPart > 0 &&
          strength > 0 &&
          [
            [left - 2, now.emf > 0 ? 'S' : 'N'],
            [right + 2, now.emf > 0 ? 'N' : 'S'],
          ].map(([x, letter]) => (
            <g key={letter as string} opacity={polesPart * strength}>
              <rect x={(x as number) - 17} y={cy - a - 50} width={34} height={34} rx={7} fill={letter === 'N' ? NORTH : SOUTH} stroke="#0d0c24" strokeWidth={2} />
              <Text x={x as number} y={cy - a - 33} size={22} color="#fff" weight={700}>{letter as string}</Text>
            </g>
          ))}
      </g>,
    );
    // The coil pushes the magnet against its motion: an arrow over the end of the magnet that is further from the coil.
    if (forcePart > 0 && peak.drag > 0 && Math.abs(now.drag) > peak.drag * 0.01 && bars.length) {
      const b = bars[0];
      const [bx, by] = [X(state.at[b.id][0]), Y(state.at[b.id][1])];
      const end = bx + (bx < pick.cx ? -1 : 1) * ((b.long * S) / 2 - 22);
      out.push(<Arrow key="drag" x={end} y={by - (b.thick * S) / 2 - 20} len={34 + 80 * Math.sqrt(Math.abs(now.drag) / peak.drag)} turn={now.drag > 0 ? 0 : 180} color={PUSH} opacity={forcePart} />);
    }
  }

  // Wires seen end-on: a dot for a current that comes out of the page, a cross for one that goes in.
  for (const wire of wires) {
    const [cx, cy] = [X(state.at[wire.id][0]), Y(state.at[wire.id][1])];
    const amps = state.amps[wire.id];
    const r = 13;
    const name = wire.label ?? `${Number(Math.abs(amps).toPrecision(3))} A`;
    const at = beside(cx, cy, wire.labelAt ?? 'above', r + (wire.labelAt === 'left' || wire.labelAt === 'right' ? 10 : 18));
    // The supports a wire rests on stay where it started: a cradle on two legs, with room between them for the weight arrow.
    const [sx, sy] = [X(wire.at[0]), Y(wire.at[1]) + r + 3];
    const foot = el.yoke && wire.at[0] >= el.yoke.faces[0] && wire.at[0] <= el.yoke.faces[1] && wire.at[1] >= el.yoke.span[0] ? Y(el.yoke.span[0]) : sy + 30;
    out.push(
      <g key={`wire-${wire.id}`} style={glow(wire.id)}>
        {wire.rests && <path d={`M${sx - 19},${sy - 6} V${foot} M${sx + 19},${sy - 6} V${foot} M${sx - 19},${sy} H${sx + 19}`} fill="none" stroke={INK3} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />}
        <Ring cx={cx} cy={cy} amps={amps} />
        {name && <Text x={at.x} y={at.y} anchor={at.anchor} size={20} color={CURRENT}>{name}</Text>}
      </g>,
    );
  }

  // The force of the field on each wire, F = BIL.
  if (forcePart > 0)
    for (const wire of wires) {
      const [fx, fy] = wireForce(el, state, wire.id);
      const f = Math.hypot(fx, fy);
      if (!(f > 0)) continue;
      const [cx, cy] = [X(state.at[wire.id][0]), Y(state.at[wire.id][1])];
      const len = el.forceScale ? Math.min(220, f * el.forceScale) : 80;
      if (len < 2) continue;
      const [ux, uy] = [fx / f, -fy / f];
      const tip = beside(cx + ux * (len + 16), cy + uy * (len + 16), Math.abs(ux) > Math.abs(uy) ? (ux > 0 ? 'right' : 'left') : uy > 0 ? 'below' : 'above', 12);
      out.push(
        <g key={`force-${wire.id}`} opacity={forcePart}>
          <Arrow x={cx + ux * 16} y={cy + uy * 16} len={len} turn={deg(Math.atan2(fy, fx))} color={PUSH} />
          <Num x={tip.x} y={tip.y} pre="F = " n={f} unit={wire.metres !== undefined ? 'N' : 'N/m'} figures={figures} keep anchor={tip.anchor} color={PUSH} />
        </g>,
      );
    }

  // The weight of each wire that has a mass, down the screen.
  if (weightPart > 0 && el.g !== undefined && el.g > 0)
    for (const wire of wires) {
      if (wire.mass === undefined) continue;
      const weight = wire.mass * el.g;
      const [cx, cy] = [X(state.at[wire.id][0]), Y(state.at[wire.id][1])];
      const len = el.forceScale ? Math.min(220, weight * el.forceScale) : 80;
      out.push(
        <g key={`weight-${wire.id}`} opacity={weightPart}>
          <Arrow x={cx} y={cy + 16} len={len} turn={-90} color={WEIGHT} />
          <Num x={cx + 32} y={cy + 16 + len * 0.62} pre="mg = " n={weight} unit="N" figures={figures} keep anchor="start" color={WEIGHT} />
        </g>,
      );
    }

  // The coil of a motor, seen from one end: an arm through the axle with a wire at each end. The first side is on the lighter half of the arm.
  if (el.coil && state.spin) {
    const c = el.coil;
    const sides = coilSides(el, state);
    const [cx, cy] = [X(state.at[c.id][0]), Y(state.at[c.id][1])];
    const ends = sides.map((side): [number, number] => [X(side.at[0]), Y(side.at[1])]);
    const tones = ['#f1eefc', '#8d88b5'];
    const R = 30;
    const on = (a: number, radius: number) => `${(cx + radius * Math.cos(rad(a))).toFixed(1)},${(cy - radius * Math.sin(rad(a))).toFixed(1)}`;
    const [ax, ay] = fieldAt(el, state, state.at[c.id][0], state.at[c.id][1]);
    const along = Math.hypot(ax, ay) > 0 ? deg(Math.atan2(ay, ax)) : 0;
    const amps = state.amps[c.id];
    const driven = c.drive !== undefined;
    const emf = driven ? coilEmf(el, state) : 0;
    // Which brush is positive. A motor is fed from outside: the current goes in at the positive brush. A generator is the
    // source: the end of the coil that the induced current comes out of is positive, and with slip rings the first side is
    // always joined to the brush on the side the field points to; with a split ring, to whichever brush its half touches.
    const forward = driven ? (c.slip ? emf : emf * Math.cos(rad(state.spin.angle - along))) : -amps;
    const quiet = driven ? 0.03 * (el.trace?.volts ?? 0) : 1e-9;
    const turning = state.spin.omega;
    const reach = c.radius * S;
    // The lamp joined across the brushes of a generator hangs under the gap; it is as bright as the power it is given, (ε ÷ peak)².
    const lampY = el.yoke ? Y(el.yoke.span[0]) + 27 : cy + reach + 44;
    const [bx0, by0] = fieldAt(el, state, state.at[c.id][0], state.at[c.id][1]);
    const peak = 2 * (c.turns ?? 1) * Math.hypot(bx0, by0) * c.metres * c.radius * (el.length?.metres ?? 1) * Math.abs(turning);
    const bright = peak > 0 ? clamp01((emf / peak) ** 2) : 0;
    out.push(
      <g key={`coil-${c.id}`} style={glow(c.id)}>
        {driven && c.load !== undefined && (
          // The circuit of the generator: a lead from each brush, behind the coil, to a lamp.
          <>
            <path d={`M${cx - R - 15},${cy} H${cx - R - 32} V${lampY} H${cx - 15} M${cx + R + 15},${cy} H${cx + R + 32} V${lampY} H${cx + 15}`} fill="none" stroke={INK3} strokeWidth={3} strokeLinejoin="round" />
            <circle cx={cx} cy={lampY} r={15 + 14 * bright} fill={CURRENT} opacity={0.3 * bright} />
            <circle cx={cx} cy={lampY} r={15} fill={BACK} stroke={INK2} strokeWidth={2.5} />
            <circle cx={cx} cy={lampY} r={15} fill={CURRENT} opacity={0.95 * bright} />
            <path d={`M${cx - 9},${lampY - 9} L${cx + 9},${lampY + 9} M${cx - 9},${lampY + 9} L${cx + 9},${lampY - 9}`} stroke={bright > 0.5 ? '#0d0c24' : INK2} strokeWidth={2.2} strokeLinecap="round" />
          </>
        )}
        {driven && Math.abs(turning) > 1e-9 && reach > 110 && (
          // The hand that turns the coil: an arrow part of the way round the axle, the way the coil is turned.
          <g opacity={0.9}>
            <path d={`M${on(turning > 0 ? 62 : 118, reach * 0.62)} A${reach * 0.62},${reach * 0.62} 0 0 ${turning > 0 ? 0 : 1} ${on(turning > 0 ? 118 : 62, reach * 0.62)}`} fill="none" stroke={INK2} strokeWidth={3} strokeLinecap="round" />
            <polygon points="11,0 -7,7 -7,-7" transform={`translate(${on(turning > 0 ? 118 : 62, reach * 0.62).replace(',', ' ')}) rotate(${turning > 0 ? -208 : 28})`} fill={INK2} />
          </g>
        )}
        {ends.map((end, k) => (
          <line key={k} x1={cx} y1={cy} x2={end[0]} y2={end[1]} stroke={tones[k]} strokeWidth={6} strokeLinecap="round" />
        ))}
        {c.commutator && (
          <>
            {/* The split ring turns with the coil: each half is joined to one side. The brushes stay where they are, along the field. */}
            <circle cx={cx} cy={cy} r={R} fill={BACK} />
            {[0, 180].map((half, k) => (
              <path key={k} d={`M${on(state.spin!.angle + half - 74, R)} A${R},${R} 0 0 0 ${on(state.spin!.angle + half + 74, R)}`} fill="none" stroke={tones[k]} strokeWidth={10} />
            ))}
            <g transform={`rotate(${-along} ${cx} ${cy})`}>
              <rect x={cx + R + 6} y={cy - 13} width={14} height={26} rx={2} fill="#3b3866" stroke={INK2} strokeWidth={2} />
              <rect x={cx - R - 20} y={cy - 13} width={14} height={26} rx={2} fill="#3b3866" stroke={INK2} strokeWidth={2} />
            </g>
          </>
        )}
        {c.slip && (
          <>
            {/* Two slip rings on the axle, drawn one inside the other. Each is joined to one end of the coil and turns with it (the dark mark shows it turning), and each always touches its own brush. */}
            <circle cx={cx} cy={cy} r={R + 1} fill={BACK} />
            <circle cx={cx} cy={cy} r={R - 4} fill="none" stroke={tones[0]} strokeWidth={8} />
            <circle cx={cx} cy={cy} r={14} fill="none" stroke={tones[1]} strokeWidth={8} />
            <circle cx={cx + (R - 4) * Math.cos(rad(state.spin.angle))} cy={cy - (R - 4) * Math.sin(rad(state.spin.angle))} r={2.6} fill="#0d0c24" />
            <circle cx={cx - 14 * Math.cos(rad(state.spin.angle))} cy={cy + 14 * Math.sin(rad(state.spin.angle))} r={2.6} fill="#0d0c24" />
            <g transform={`rotate(${-along} ${cx} ${cy})`}>
              <rect x={cx + R + 1} y={cy - 13} width={14} height={26} rx={2} fill="#3b3866" stroke={INK2} strokeWidth={2} />
              {/* The other brush reaches past the outer ring to the inner one. */}
              <rect x={cx - R - 15} y={cy - 13} width={14} height={26} rx={2} fill="#3b3866" stroke={INK2} strokeWidth={2} />
              <rect x={cx - R - 3} y={cy - 5} width={R + 3 - 18} height={10} rx={2} fill="#3b3866" stroke={INK2} strokeWidth={2} />
            </g>
          </>
        )}
        {(c.commutator || c.slip) &&
          Math.abs(forward) > quiet &&
          [1, -1].map((side) => (
            <Text key={side} x={cx + side * (R + 13) * Math.cos(rad(along))} y={cy - side * (R + 13) * Math.sin(rad(along)) + 32} size={25} color={INK} weight={700}>
              {side * forward > 0 ? '+' : '−'}
            </Text>
          ))}
        <circle cx={cx} cy={cy} r={5.5} fill={INK2} stroke="#0d0c24" strokeWidth={1.5} />
        {ends.map((end, k) => (
          <Ring key={k} cx={end[0]} cy={end[1]} amps={sides[k].amps} />
        ))}
      </g>,
    );
    if (forcePart > 0) {
      sides.forEach((side, k) => {
        const f = Math.hypot(...side.force);
        const len = el.forceScale ? Math.min(220, f * el.forceScale) : 80;
        if (!(f > 0) || len < 2) return;
        const [ux, uy] = [side.force[0] / f, -side.force[1] / f];
        out.push(<Arrow key={`turn-${k}`} x={ends[k][0] + ux * 16} y={ends[k][1] + uy * 16} len={len} turn={deg(Math.atan2(side.force[1], side.force[0]))} color={PUSH} opacity={forcePart} />);
      });
      // The two forces are the same size, and they turn with the coil, so their size is written once, in the bottom corner where no arrow reaches (a small picture, like the thumbnail, has no room for it).
      const f = Math.hypot(...(sides[0]?.force ?? [0, 0]));
      if (f > 0 && pw >= 900 && !driven) out.push(<Num key="turn-size" x={ox + 22} y={oy + ph - 22} pre="F = " n={f} unit="N on each side" figures={figures} keep anchor="start" color={PUSH} opacity={forcePart} />);
    }
    // How fast a generator is turned, over the gap between the poles.
    if (driven && pw >= 900 && Math.abs(turning) > 1e-9) {
      const over = el.yoke ? Y(el.yoke.span[1]) - 24 : cy - reach - 40;
      out.push(<Num key="turns" x={cx} y={over} n={Math.abs(turning) / (2 * Math.PI)} unit="turns each second" figures={figures} keep color={INK2} size={20} />);
    }
  }

  // The emf at the brushes of a generator, drawn against time as the coil turns: the trace starts again from the left after each sweep.
  if (el.trace && tracePart > 0) {
    const t = el.trace;
    const [gl, gr, gt, gb] = [X(t.at[0]), X(t.at[1]), Y(t.span[1]), Y(t.span[0])];
    const mid = (gt + gb) / 2;
    const TX = (seconds: number) => gl + (seconds / t.seconds) * (gr - gl);
    // The emf named for the trace is drawn a little inside the box, so that a peak of that size has room above it.
    const half = ((gb - gt) / 2) * 0.86;
    const TY = (volts: number) => mid - Math.max(-1.14, Math.min(1.14, volts / t.volts)) * half;
    const now = coilOutput(el, state);
    const last = state.trace[state.trace.length - 1];
    const small = pw < 900;
    const time = (seconds: number) => (t.seconds >= 1 ? `${Number(seconds.toPrecision(3))} s` : `${Number((seconds * 1000).toPrecision(3))} ms`);
    out.push(
      <g key="trace" opacity={tracePart}>
        <rect x={gl} y={gt} width={gr - gl} height={gb - gt} rx={4} fill="rgb(13 12 36 / 0.72)" />
        {[-1, -0.5, 0.5, 1].map((f) => (
          <line key={f} x1={gl} y1={mid - f * half} x2={gr} y2={mid - f * half} stroke={INK3} strokeWidth={1.5} strokeDasharray="4 7" opacity={0.6} />
        ))}
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line key={f} x1={TX(f * t.seconds)} y1={gt} x2={TX(f * t.seconds)} y2={gb} stroke={INK3} strokeWidth={1.5} strokeDasharray="4 7" opacity={f === 1 ? 0 : 0.6} />
        ))}
        <path d={`M${gl},${gt} V${gb} M${gl},${mid} H${gr}`} fill="none" stroke={INK2} strokeWidth={2.5} strokeLinecap="round" />
        {!small && (
          <>
            {[1, 0.5, 0, -0.5, -1].map((f) => (
              <Text key={f} x={gl - 12} y={mid - f * half} anchor="end" size={18} color={INK2}>
                {f === 0 ? '0' : `${f < 0 ? '−' : ''}${Number(Math.abs(f * t.volts).toPrecision(3))} V`}
              </Text>
            ))}
            {[0.5, 1].map((f) => (
              <Text key={f} x={TX(f * t.seconds)} y={gb + 20} anchor={f === 1 ? 'end' : 'middle'} size={18} color={INK2}>
                {time(f * t.seconds)}
              </Text>
            ))}
            <Text x={gl} y={gt - 22} anchor="start" size={19} color={INK2}>Emf at the brushes</Text>
            <Num x={gr} y={gt - 22} pre="ε = " n={Math.abs(now) < 0.005 * t.volts ? 0 : now} unit="V" figures={figures} keep anchor="end" color={CURRENT} />
          </>
        )}
        {state.trace.length > 1 && <polyline points={state.trace.map(([seconds, volts]) => `${TX(seconds).toFixed(1)},${TY(volts).toFixed(1)}`).join(' ')} fill="none" stroke={CURRENT} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />}
        {last && <circle cx={TX(last[0])} cy={TY(last[1])} r={6} fill={CURRENT} stroke="#0d0c24" strokeWidth={1.5} />}
      </g>,
    );
  }

  // Compasses: the red end of the needle points along the field.
  if (compassPart > 0)
    for (const c of el.compasses ?? []) {
      const [cx, cy] = [X(state.at[c.id][0]), Y(state.at[c.id][1])];
      const [bx, by] = fieldAt(el, state, state.at[c.id][0], state.at[c.id][1]);
      const turn = Math.hypot(bx, by) > 0 ? -deg(Math.atan2(by, bx)) : 0;
      const r = 21;
      const at = c.label ? beside(cx, cy, c.labelAt ?? 'below', r + 16) : null;
      out.push(
        <g key={`compass-${c.id}`} opacity={compassPart} style={glow(c.id)}>
          <circle cx={cx} cy={cy} r={r} fill="rgb(13 12 36 / 0.92)" stroke={INK2} strokeWidth={2.5} />
          <g transform={`translate(${cx} ${cy}) rotate(${turn})`}>
            <polygon points={`0,-6 ${r - 3},0 0,6`} fill={NORTH} />
            <polygon points={`0,-6 ${-(r - 3)},0 0,6`} fill="#e8e6f7" />
            <circle r={2} fill="#0d0c24" />
          </g>
          {at && <Text x={at.x} y={at.y} anchor={at.anchor} size={19} color={INK2}>{c.label ?? ''}</Text>}
        </g>,
      );
    }

  // Probes: a point, with the field there as an arrow and, in a picture with no bar magnet, its strength.
  for (const probe of el.probes ?? []) {
    const [px, py] = state.at[probe.id];
    const [cx, cy] = [X(px), Y(py)];
    const [bx, by] = fieldAt(el, state, px, py);
    const b = Math.hypot(bx, by);
    const side = probe.labelAt ?? 'above';
    const opposite = ({ above: 'below', below: 'above', left: 'right', right: 'left' } as const)[side];
    const name = probe.label ? beside(cx, cy, opposite, 22) : null;
    const value = beside(cx, cy, side, 30);
    const len = el.fieldScale ? Math.min(240, b * el.fieldScale) : 64;
    const shown = Math.max(fieldPart, distancePart);
    if (shown <= 0) continue;
    // The distance from the first wire is measured beside the line that joins them, on its lower side.
    const from: [number, number] | null = wires.length ? [X(state.at[wires[0].id][0]), Y(state.at[wires[0].id][1])] : null;
    const gap = from ? Math.hypot(cx - from[0], cy - from[1]) : 0;
    const [nx, ny] = from && gap > 0 ? ((cx - from[0]) / gap >= 0 ? [-(cy - from[1]) / gap, (cx - from[0]) / gap] : [(cy - from[1]) / gap, -(cx - from[0]) / gap]) : [0, 1];
    out.push(
      <g key={`probe-${probe.id}`} style={glow(probe.id)} opacity={clamp01(shown)}>
        {distancePart > 0 && from && gap > 0 && (
          <g opacity={distancePart / shown}>
            <Span a={[from[0] + nx * 26, from[1] + ny * 26]} b={[cx + nx * 26, cy + ny * 26]} opacity={1} />
            <Num x={(from[0] + cx) / 2 + nx * 48} y={(from[1] + cy) / 2 + ny * 48} pre="r = " n={Math.hypot(px - state.at[wires[0].id][0], py - state.at[wires[0].id][1])} unit={length.symbol} figures={figures} keep />
          </g>
        )}
        <circle cx={cx} cy={cy} r={6} fill={BACK} stroke={FIELD} strokeWidth={2.5} strokeDasharray="3 3" />
        {name && <Text x={name.x} y={name.y} anchor={name.anchor} size={20} color={INK}>{probe.label ?? ''}</Text>}
        {fieldPart > 0 && b > 0 && len >= 2 && (
          <g opacity={fieldPart / shown}>
            <Arrow x={cx} y={cy} len={len} turn={deg(Math.atan2(by, bx))} color={FIELD} weight={7} />
            {bars.length === 0 && <Num x={value.x} y={value.y} pre="B = " n={b} unit="T" figures={figures} sci={b < 0.01} keep anchor={value.anchor} color={FIELD} />}
          </g>
        )}
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
