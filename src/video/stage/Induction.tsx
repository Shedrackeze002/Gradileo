/**
 * A circuit in a magnetic field that points through the page (src/video/induction.ts works out the
 * flux, the emf, the current and the force). The field is violet: a dot where it comes out of the
 * page and a cross where it goes in, larger where it is stronger, and the area of the circuit it
 * passes through is shaded. A coil is a rectangle of wire joined to a meter; the rails are two
 * level lines joined by a resistor at their left ends, with a pale rod across them. The induced
 * current is yellow arrowheads that go round the circuit, the velocity of the rod is green and the
 * force on it is orange.
 */
import type { ReactElement } from 'react';
import type { InductionEl } from '../script.ts';
import { ampsOf, circuitRect, emfOf, fluxOf, fluxRect, inductionAt, peakTesla, rodForce, type InductionPlays, type InductionState } from '../induction.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Num } from './Gravity.tsx';
import { Arrow, clamp01, FONT, INK2, Text, VELOCITY } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

const FIELD = TONES.brand;
const CURRENT = TONES.theta;
const PUSH = TONES.opp;
const WIRE = '#d9d5f2';
const BACK = '#17143c';

/** A dark plate behind something written over the field, so that the marks of the field do not show through it. `chars` is how many characters are written. */
function Plate({ x, y, chars, anchor = 'middle', opacity = 1 }: { x: number; y: number; chars: number; anchor?: 'start' | 'middle' | 'end'; opacity?: number }) {
  const wide = chars * 12.5 + 22;
  return <rect x={anchor === 'middle' ? x - wide / 2 : anchor === 'end' ? x - wide + 10 : x - 10} y={y - 17} width={wide} height={34} rx={9} fill="#0f0d2b" opacity={0.92 * opacity} />;
}

const peaks = new WeakMap<InductionEl, number>();
/** The largest current in any clip (the clips played in the order they are written): the current whose arrowheads move fastest. */
function peakAmps(el: InductionEl): number {
  const known = peaks.get(el);
  if (known !== undefined) return known;
  let top = Math.abs(ampsOf(el, inductionAt(el)));
  const done: InductionPlays = [];
  for (const [name, clip] of Object.entries(el.clips)) {
    const total = clip.phases.reduce((n, ph) => n + ph.dur, 0);
    for (let t = 0; t <= total; t += 0.1) top = Math.max(top, Math.abs(ampsOf(el, inductionAt(el, [...done, [name, t]]))));
    done.push([name, total]);
  }
  peaks.set(el, top);
  return top;
}

export function InductionView({ el, st, w, h, plays }: { el: InductionEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state: InductionState = inductionAt(el, plays ?? st?.plays ?? []);
  const part = (name: string) => ownPart(st, name);
  const [fieldPart, fluxPart, emfPart, currentPart, velocityPart, forcePart, chargePart] = ['field', 'flux', 'emf', 'current', 'velocity', 'force', 'charge'].map(part);
  const glow = (id: string) => ((st?.focus[id] ?? 0) > 0 ? { filter: `drop-shadow(0 0 ${14 * (st?.focus[id] ?? 0)}px #fff)` } : undefined);
  const figures = el.figures ?? 2;
  const out: ReactElement[] = [];

  // One scale both ways: the view fills a panel under the label.
  const [x0, x1, y0, y1] = el.view;
  const top = el.label ? 30 : 0;
  const S = Math.min(w / (x1 - x0), (h - top) / (y1 - y0));
  const [pw, ph] = [(x1 - x0) * S, (y1 - y0) * S];
  const [ox, oy] = [(w - pw) / 2, top + (h - top - ph) / 2];
  const X = (x: number) => ox + (x - x0) * S;
  const Y = (y: number) => oy + (y1 - y) * S;
  const clip = `induction-${el.id}`;

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

  const emf = emfOf(el, state);
  const amps = ampsOf(el, state);
  const [cl, cr, cb, ct] = circuitRect(el, state);
  const [xl, xr, yb, yt] = [X(cl), X(cr), Y(cb), Y(ct)];
  const midY = (yb + yt) / 2;

  // The area of the circuit that the field passes through.
  const through = fluxRect(el, state);
  if (fluxPart > 0 && through && Math.abs(state.tesla) > 1e-12)
    out.push(<rect key="flux" x={X(through[0])} y={Y(through[3])} width={(through[1] - through[0]) * S} height={(through[3] - through[2]) * S} fill={FIELD} opacity={0.2 * fluxPart} />);

  // The field: a dot where it comes out of the page and a cross where it goes in, larger in a stronger field.
  const [fl, fr, fb, ft] = el.region ?? el.view;
  const [left, right, high, low] = [X(fl), X(fr), Y(ft), Y(fb)];
  if (fieldPart > 0) {
    const peak = peakTesla(el);
    const strength = peak > 0 ? Math.abs(state.tesla) / peak : 0;
    const marks: ReactElement[] = [];
    if (strength > 1e-6) {
      const pitch = 66;
      const [nx, ny] = [Math.max(1, Math.round((right - left) / pitch)), Math.max(1, Math.round((low - high) / pitch))];
      const half = 2.5 + 5 * Math.sqrt(strength);
      for (let i = 0; i < nx; i++)
        for (let j = 0; j < ny; j++) {
          const [x, y] = [left + ((i + 0.5) / nx) * (right - left), high + ((j + 0.5) / ny) * (low - high)];
          marks.push(
            state.tesla > 0 ? (
              <g key={`${i}-${j}`}>
                <circle cx={x} cy={y} r={half + 2} fill="none" stroke={FIELD} strokeWidth={1.8} />
                <circle cx={x} cy={y} r={half * 0.34} fill={FIELD} />
              </g>
            ) : (
              <g key={`${i}-${j}`} stroke={FIELD} strokeWidth={2.4} strokeLinecap="round">
                <line x1={x - half} y1={y - half} x2={x + half} y2={y + half} />
                <line x1={x - half} y1={y + half} x2={x + half} y2={y - half} />
              </g>
            ),
          );
        }
    }
    const size = Math.abs(state.tesla);
    // Its strength is written in the top right corner, or under the rails, where nothing on the rod reaches.
    const at = el.rails ? low - 26 : high + 26;
    out.push(
      <g key="field" clipPath={`url(#${clip})`}>
        {el.region && <rect x={left} y={high} width={right - left} height={low - high} rx={8} fill={FIELD} fillOpacity={0.05 * fieldPart} stroke={FIELD} strokeOpacity={0.45 * fieldPart} strokeWidth={1.5} strokeDasharray="6 7" />}
        <g opacity={(0.3 + 0.45 * strength) * fieldPart}>{marks}</g>
      </g>,
    );
    out.push(<Plate key="field-p" x={right - 18} y={at} chars={size < 1e-12 ? 5 : 25} anchor="end" opacity={fieldPart} />);
    out.push(
      size < 1e-12 ? (
        <Text key="field-t" x={right - 18} y={at} anchor="end" color={FIELD} size={21} opacity={fieldPart}>B = 0</Text>
      ) : (
        <Num key="field-t" x={right - 18} y={at} pre="B = " n={size} unit={`T, ${state.tesla > 0 ? 'out of the page' : 'into the page'}`} figures={figures} keep anchor="end" color={FIELD} opacity={fieldPart} />
      ),
    );
  }

  // The flux through one turn, written inside the area.
  if (fluxPart > 0 && through) {
    const flux = Math.abs(fluxOf(el, state));
    const [fx, fy] = [X((through[0] + through[1]) / 2), el.rails ? Y(through[2]) - 30 : Y((through[2] + through[3]) / 2)];
    out.push(<Plate key="flux-p" x={fx} y={fy} chars={el.milli ? 13 : 14} opacity={fluxPart} />);
    out.push(<Num key="flux-t" x={fx} y={fy} pre="Φ = " n={el.milli ? flux * 1000 : flux} unit={el.milli ? 'mWb' : 'Wb'} figures={figures} keep color={FIELD} size={23} opacity={fluxPart} />);
  }

  // A coil seen face on: a rectangle of wire, with a gap in its right side that is joined to a meter (or closed, when it has a resistance).
  if (el.loop) {
    const k = el.loop;
    const many = (k.turns ?? 1) > 1;
    const [mx, gap] = [xr + 118, 15];
    const side = k.ohms ? `M${xr},${yt} V${yb}` : `M${xr},${yt} V${midY - gap} H${mx - 58} M${xr},${yb} V${midY + gap} H${mx - 58}`;
    out.push(
      <g key="loop" style={glow(k.id)}>
        {many && <rect x={xl + 7} y={yt + 7} width={xr - xl - 14} height={yb - yt - 14} rx={5} fill="none" stroke="#8d88b5" strokeWidth={2.5} />}
        {many && <rect x={xl - 7} y={yt - 7} width={xr - xl + 14} height={yb - yt + 14} rx={11} fill="none" stroke="#8d88b5" strokeWidth={2.5} />}
        <path d={`M${xr},${yt} H${xl} V${yb} H${xr} ${side}`} fill="none" stroke={WIRE} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
        {many && <Plate x={(xl + xr) / 2} y={yb + 32} chars={`${k.turns} turns`.length - 2} />}
        {many && <Text x={(xl + xr) / 2} y={yb + 32} size={20} color={INK2}>{`${k.turns} turns`}</Text>}
        {!k.ohms && (
          <>
            <rect x={mx - 58} y={midY - 32} width={132} height={64} rx={11} fill="#2a2752" stroke={INK3} strokeWidth={2} />
            <rect x={mx - 48} y={midY - 22} width={112} height={44} rx={6} fill="#0d0c24" stroke="rgb(188 217 255 / 0.35)" strokeWidth={1.5} />
            <text x={mx + 8} y={midY + 1} fill={TONES.good} fontSize={24} fontWeight={600} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: FONT, fontVariantNumeric: 'tabular-nums' }}>
              {emfPart > 0 ? `${Math.abs(emf) < 0.005 ? '0.00' : emf.toFixed(Math.abs(emf) >= 10 ? 1 : 2).replace('-', '−')} V` : 'V'}
            </text>
          </>
        )}
      </g>,
    );
    if (k.ohms && emfPart > 0) out.push(<Num key="emf-t" x={(xl + xr) / 2} y={yt - 30} pre="ε = " n={Math.abs(emf)} unit="V" figures={figures} keep color={INK} opacity={emfPart} />);
  }

  // Two rails, joined at their left ends by a resistor, and the rod that slides along them.
  if (el.rails) {
    const k = el.rails;
    const [rs, re, rodX] = [X(k.x[0]), X(k.x[1]), X(state.rod)];
    const box = Math.min(74, (yb - yt) * 0.5);
    out.push(
      <g key="rails" style={glow(k.id)}>
        <path d={`M${re},${yt} H${rs} V${midY - box / 2} M${rs},${midY + box / 2} V${yb} H${re}`} fill="none" stroke={WIRE} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={rs - 14} y={midY - box / 2} width={28} height={box} rx={4} fill="#2a2752" stroke={INK2} strokeWidth={2.5} />
        <Plate x={rs - 26} y={midY} chars={5} anchor="end" />
        <Num x={rs - 26} y={midY} n={k.ohms} unit="Ω" figures={figures} keep anchor="end" color={INK2} />
        <rect x={rodX - 6.5} y={yt - 18} width={13} height={yb - yt + 36} rx={5} fill="#f1eefc" stroke="#0d0c24" strokeWidth={1.5} />
      </g>,
    );
    // The ends of the rod the field pushes its charges to: the current leaves the positive end.
    if (chargePart > 0 && Math.abs(emf) > 1e-12) {
      const upper = emf > 0 ? '+' : '−';
      out.push(
        <g key="charge" opacity={chargePart}>
          <Text x={rodX + 26} y={yt + 20} size={30} color={upper === '+' ? TONES.bad : TONES.adj} weight={700}>{upper}</Text>
          <Text x={rodX + 26} y={yb - 20} size={30} color={upper === '+' ? TONES.adj : TONES.bad} weight={700}>{upper === '+' ? '−' : '+'}</Text>
        </g>,
      );
    }
    if (emfPart > 0) {
      out.push(<Plate key="emf-p" x={rodX} y={yt - 40} chars={9} opacity={emfPart} />);
      out.push(<Num key="emf-t" x={rodX} y={yt - 40} pre="ε = " n={Math.abs(emf)} unit="V" figures={figures} keep color={INK} opacity={emfPart} />);
    }
    if (velocityPart > 0 && Math.abs(state.v) > 1e-9) {
      const len = el.velocityScale ? Math.min(260, Math.abs(state.v) * el.velocityScale) : 90;
      const way = state.v > 0 ? 1 : -1;
      // An arrow too short to see is left out, with its label.
      if (len >= 8)
        out.push(
          <g key="velocity" opacity={velocityPart}>
            <Arrow x={rodX + way * 10} y={midY - 26} len={len} turn={way > 0 ? 0 : 180} color={VELOCITY} />
            <Plate x={rodX + way * (len + 24)} y={midY - 26} chars={11} anchor={way > 0 ? 'start' : 'end'} />
            <Num x={rodX + way * (len + 24)} y={midY - 26} pre="v = " n={Math.abs(state.v)} unit="m/s" figures={figures} keep anchor={way > 0 ? 'start' : 'end'} color={VELOCITY} />
          </g>,
        );
    }
    const force = rodForce(el, state);
    if (forcePart > 0 && Math.abs(force) > 1e-12) {
      const len = el.forceScale ? Math.min(260, Math.abs(force) * el.forceScale) : 90;
      const way = force > 0 ? 1 : -1;
      if (len >= 8)
        out.push(
          <g key="force" opacity={forcePart}>
            <Arrow x={rodX + way * 10} y={midY + 30} len={len} turn={way > 0 ? 0 : 180} color={PUSH} />
            <Plate x={rodX + way * (len + 24)} y={midY + 30} chars={10} anchor={way > 0 ? 'start' : 'end'} />
            <Num x={rodX + way * (len + 24)} y={midY + 30} pre="F = " n={Math.abs(force)} unit="N" figures={figures} keep anchor={way > 0 ? 'start' : 'end'} color={PUSH} />
          </g>,
        );
    }
  }

  // The induced current: arrowheads that go round the circuit the way it flows, faster for a larger current.
  if (currentPart > 0 && (el.rails || el.loop?.ohms)) {
    const peak = peakAmps(el);
    const strength = peak > 0 ? clamp01(Math.abs(amps) / (peak * 0.05)) : 0;
    if (strength > 0) {
      // Anticlockwise on the screen: along the bottom to the right, up the right side, back along the top, down the left side.
      const corners: Array<[number, number]> = [[xl, yb], [xr, yb], [xr, yt], [xl, yt]];
      const sides = corners.map((a, i) => ({ a, b: corners[(i + 1) % 4] })).map(({ a, b }) => ({ a, b, len: Math.hypot(b[0] - a[0], b[1] - a[1]) }));
      const around = sides.reduce((n, s) => n + s.len, 0);
      const count = Math.max(4, Math.round(around / 120));
      const moved = (state.drift / peak) * 80;
      const heads: ReactElement[] = [];
      for (let i = 0; i < count; i++) {
        let d = ((((i / count) * around + moved) % around) + around) % around;
        const s = sides.find((side) => (d < side.len ? true : ((d -= side.len), false))) ?? sides[0];
        const f = s.len > 0 ? d / s.len : 0;
        const turn = (Math.atan2(s.b[1] - s.a[1], s.b[0] - s.a[0]) * 180) / Math.PI + (amps > 0 ? 0 : 180);
        heads.push(<polygon key={i} points="12,0 -8,8 -8,-8" transform={`translate(${s.a[0] + (s.b[0] - s.a[0]) * f} ${s.a[1] + (s.b[1] - s.a[1]) * f}) rotate(${turn})`} fill={CURRENT} stroke={BACK} strokeWidth={1.5} />);
      }
      out.push(
        <g key="current" opacity={currentPart * strength}>
          {heads}
        </g>,
      );
    }
    out.push(<Plate key="current-p" x={xl + 18} y={yb + 34} chars={10} anchor="start" opacity={currentPart} />);
    out.push(<Num key="current-t" x={xl + 18} y={yb + 34} pre="I = " n={Math.abs(amps) < 0.005 * peak ? 0 : Math.abs(amps)} unit="A" figures={figures} keep anchor="start" color={CURRENT} opacity={currentPart} />);
  }

  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
