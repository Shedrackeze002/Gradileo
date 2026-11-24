/**
 * A sample of a radioactive isotope and the graph of its decay (src/video/halflife.ts works it
 * all out): the nuclei that are left beside a curve that draws itself as the sample's clock runs.
 */
import type { ReactElement } from 'react';
import type { HalflifeEl } from '../script.ts';
import { amountLeft, decayMoments, halflifeAt, nucleiLeft, shareLeft, tidy, videoTimeOf } from '../halflife.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { clamp01, FONT, INK2, Text } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** The size the picture is designed at; it is scaled to the room it is given. */
const WIDE = 1136;
const LIVE = TONES.theta;
const SPENT = '#45426b';

export function HalflifeView({ el, st, w, h, plays, fit }: { el: HalflifeEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; fit?: number }) {
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

  const part = (name: string) => ownPart(st, name);
  const [names, readout, graph, halves, ahead] = [part('names'), part('left'), part('graph'), part('halves'), part('ahead')];
  const state = halflifeAt(el, played);
  const { clock, time } = state;
  const T = el.halfLife;
  const count = el.count ?? 400;
  const unit = el.unit ?? 'days';
  const amount = el.amount ?? 100;
  const amountUnit = el.amountUnit ?? '%';
  const span = el.span ?? 5;
  const gap = amountUnit === '%' ? '' : ' ';

  // The sample: every nucleus as a dot, bright until it decays.
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const step = Math.min(19, (HIGH - top - 112) / rows);
  // The sample is in the middle of the picture until the graph is shown, and then slides to the left of it.
  const wide = step * (cols - 1);
  const home = 56;
  const sx = home + (1 - graph) * (WIDE / 2 - wide / 2 - home);
  const sy = top + 62 + ((HIGH - top - 112) - step * rows) / 2 + step / 2;
  const moments = decayMoments(count, el.salt ?? 0);
  const passed = clock / T;
  for (let i = 0; i < count; i++) {
    const [x, y] = [sx + (i % cols) * step, sy + Math.floor(i / cols) * step];
    const spent = moments[i] <= passed;
    out.push(<circle key={`n${i}`} cx={x} cy={y} r={step * 0.32} fill={spent ? SPENT : LIVE} opacity={spent ? 0.9 : 1} />);
    if (spent) {
      // A flash as it decays.
      const at = videoTimeOf(state, moments[i] * T);
      const since = at === undefined ? Infinity : time - at;
      if (since < 0.4) out.push(<circle key={`f${i}`} cx={x} cy={y} r={step * (0.4 + 1.6 * since)} fill="none" stroke="#fff" strokeWidth={2} opacity={(1 - since / 0.4) * 0.9} />);
    }
  }
  if (names > 0) {
    out.push(<Text key="sample" x={sx + wide / 2} y={top + 30} color={INK2} size={18} opacity={names}>{`${count} nuclei${el.name ? ` of ${el.name}` : ''}`}</Text>);
    out.push(<Text key="count" x={sx + wide / 2} y={HIGH - 26} color={LIVE} size={19} opacity={names}>{`Not yet decayed: ${nucleiLeft(el, clock)}`}</Text>);
  }

  // The graph of the amount that is left against the time.
  // The amounts of the upright axis are written between the sample and the graph, which leaves room for the longest of them.
  const room = Math.max(130, 46 + 8.8 * `${tidy(amount)}${gap}${amountUnit}`.length);
  const [gx0, gx1, gy0, gy1] = [home + wide + room, WIDE - 56, top + 78, HIGH - 64];
  const xOf = (t: number) => gx0 + (t / (span * T)) * (gx1 - gx0);
  const yOf = (a: number) => gy1 - (a / amount) * (gy1 - gy0);
  if (graph > 0) {
    out.push(<line key="ax" x1={gx0} y1={gy1} x2={gx1 + 14} y2={gy1} stroke={INK2} strokeWidth={2} opacity={graph} />);
    out.push(<line key="ay" x1={gx0} y1={gy1} x2={gx0} y2={gy0 - 14} stroke={INK2} strokeWidth={2} opacity={graph} />);
    // The marks of the time axis: one for each half-life, unless the element spaces them otherwise.
    const every = el.every ?? T;
    for (let k = 0; k * every <= span * T + 1e-9; k++) {
      out.push(<line key={`tx${k}`} x1={xOf(k * every)} y1={gy1} x2={xOf(k * every)} y2={gy1 + 7} stroke={INK2} strokeWidth={2} opacity={graph} />);
      out.push(<Text key={`tn${k}`} x={xOf(k * every)} y={gy1 + 22} color={INK2} size={16} opacity={graph}>{tidy(k * every)}</Text>);
    }
    out.push(<Text key="tname" x={gx1 + 14} y={gy1 + 46} color={INK2} size={16} anchor="end" opacity={graph}>{`Time (${unit})`}</Text>);
    for (let k = 0; k <= 3; k++) {
      const a = amount / 2 ** k;
      out.push(<line key={`ty${k}`} x1={gx0 - 7} y1={yOf(a)} x2={gx0} y2={yOf(a)} stroke={INK2} strokeWidth={2} opacity={graph} />);
      out.push(<Text key={`yn${k}`} x={gx0 - 12} y={yOf(a)} color={INK2} size={16} anchor="end" opacity={graph}>{`${tidy(a)}${gap}${amountUnit}`}</Text>);
    }
    out.push(<Text key="yname" x={gx0 - 12} y={gy0 - 30} color={INK2} size={16} anchor="start" opacity={graph}>{el.amountName ?? 'Amount left'}</Text>);
    // The whole curve, faintly, and the part that the clock has reached.
    const curve = (to: number) => {
      const pts: string[] = [];
      const end = Math.min(to, span * T);
      for (let i = 0; i <= 120; i++) {
        const t = (end * i) / 120;
        pts.push(`${xOf(t).toFixed(1)},${yOf(amount * shareLeft(t, T)).toFixed(1)}`);
      }
      return pts.join(' ');
    };
    if (ahead > 0) out.push(<polyline key="ahead" points={curve(span * T)} fill="none" stroke={LIVE} strokeWidth={2} strokeDasharray="4 7" opacity={0.45 * ahead * graph} />);
    if (clock > 0) out.push(<polyline key="curve" points={curve(clock)} fill="none" stroke={LIVE} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" opacity={graph} />);
    // Each half-life that has passed, with the share that is left.
    if (halves > 0)
      for (let k = 1; k <= Math.min(span, Math.floor(passed + 1e-9)); k++) {
        const [x, y] = [xOf(k * T), yOf(amount / 2 ** k)];
        out.push(<path key={`h${k}`} d={`M ${x} ${gy1} L ${x} ${y} L ${gx0} ${y}`} fill="none" stroke={TONES.adj} strokeWidth={1.6} strokeDasharray="5 6" opacity={0.8 * halves * graph} />);
        out.push(<circle key={`hd${k}`} cx={x} cy={y} r={5} fill={TONES.adj} opacity={halves * graph} />);
        // The share is written to the right of its point, or to the left of it at the end of the axis.
        const last = x > gx1 - 40;
        out.push(<Text key={`hn${k}`} x={last ? x - 6 : x + 10} y={y - 16} color={TONES.adj} size={18} anchor={last ? 'end' : 'start'} opacity={halves * graph}>{`1/${2 ** k}`}</Text>);
      }
    const shown = Math.min(clock, span * T);
    out.push(<circle key="now" cx={xOf(shown)} cy={yOf(amount * shareLeft(shown, T))} r={8} fill={LIVE} stroke="#0d0c24" strokeWidth={2} opacity={graph} style={{ filter: `drop-shadow(0 0 6px ${LIVE})` }} />);
  }
  // The clock, and how much is left.
  if (readout > 0) {
    // A sample that is counted in nuclei has a whole number of them left.
    const now = amountUnit === 'nuclei' && amount === count ? nucleiLeft(el, clock) : amountLeft({ ...el, amount }, clock);
    const shown = tidy(clock, el.places ?? 0);
    out.push(<Text key="clock" x={gx1 + 14} y={top + 30} color={INK} size={20} anchor="end" opacity={readout}>{`Time: ${shown} ${shown === '1' ? unit.replace(/s$/, '') : unit}`}</Text>);
    out.push(<Text key="left" x={gx1 + 14} y={top + 58} color={LIVE} size={20} anchor="end" opacity={readout}>{`Left: ${tidy(now, 2)}${gap}${amountUnit}${amountUnit === '%' ? '' : ` (${tidy(100 * shareLeft(clock, T), 1)}%)`}`}</Text>);
  }
  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`${left} 0 ${across} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
