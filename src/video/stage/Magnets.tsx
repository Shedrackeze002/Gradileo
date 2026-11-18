/**
 * Magnets, wires and compasses seen from above (src/video/magnets.ts works out the field). A bar
 * magnet is red at its north pole and blue at its south pole; a wire seen end-on is a yellow ring
 * with a dot when its current comes out of the page and a cross when it goes in. The field is
 * violet: its lines, and an arrow at each probe. A compass needle points its red end along the
 * field where it is, a piece of iron shows its domains as small arrows, and a force is orange.
 */
import type { ReactElement } from 'react';
import type { MagnetsEl } from '../script.ts';
import { barForce, fieldAt, magnetLines, magnetsAt, peakBarForce, wireForce } from '../magnets.ts';
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

export function MagnetsView({ el, st, w, h, plays }: { el: MagnetsEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = magnetsAt(el, plays ?? st?.plays ?? []);
  const part = (name: string) => ownPart(st, name);
  const [linesPart, compassPart, fieldPart, distancePart, forcePart] = ['lines', 'compass', 'field', 'distance', 'force'].map(part);
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

  // Wires seen end-on: a dot for a current that comes out of the page, a cross for one that goes in.
  for (const wire of wires) {
    const [cx, cy] = [X(state.at[wire.id][0]), Y(state.at[wire.id][1])];
    const amps = state.amps[wire.id];
    const r = 13;
    const name = wire.label ?? `${Number(Math.abs(amps).toPrecision(3))} A`;
    const at = beside(cx, cy, wire.labelAt ?? 'above', r + (wire.labelAt === 'left' || wire.labelAt === 'right' ? 10 : 18));
    out.push(
      <g key={`wire-${wire.id}`} style={glow(wire.id)}>
        <circle cx={cx} cy={cy} r={r} fill={BACK} stroke={CURRENT} strokeWidth={3.5} />
        {amps > 1e-9 && <circle cx={cx} cy={cy} r={4.5} fill={CURRENT} />}
        {amps < -1e-9 && <path d={`M${cx - 6},${cy - 6} L${cx + 6},${cy + 6} M${cx - 6},${cy + 6} L${cx + 6},${cy - 6}`} stroke={CURRENT} strokeWidth={3} strokeLinecap="round" />}
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
