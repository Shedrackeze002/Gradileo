/**
 * A motion on a curved track: a ball or a cart on a hill, or the bob of a pendulum, moved by
 * gravity along the slope (src/video/motion.ts and src/video/path.ts work the motion out). The
 * track is drawn to scale, so heights can be compared by eye, with the energy bars under it.
 */
import type { ReactElement } from 'react';
import type { MotionEl } from '../script.ts';
import { oscillations, widthOf, type MotionState } from '../motion.ts';
import { trackOf } from '../path.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Arrow, clamp01, Clock, Count, ENERGY_ROW, labelCase, EnergyBars, energyRows, FONT, INK2, live, NET, short, speedText, Text, toneOf, VELOCITY } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK3 } from './Triangle.tsx';

const TRACK = '#bcd9ff';

export function PathView({ el, st, w, h, state }: { el: MotionEl; st: ElState | undefined; w: number; h: number; state: MotionState }) {
  const p = st?.p ?? 0;
  const part = (name: string) => ownPart(st, name);
  const vel = part('velocity');
  const energy = part('energy');
  const total = part('total');
  const height = part('height');
  const clock = part('clock');
  const track = trackOf(el.path!);
  const vs = el.velocityScale ?? 12;

  // The bars keep their room from the start, so the track does not jump when they appear: under a
  // hill, which is wide, and beside a pendulum, which is tall.
  const beside = Boolean(track.pivot) && energyRows(el) > 0;
  const barsH = energyRows(el) && !beside ? energyRows(el) * ENERGY_ROW + 30 : 0;
  const tw = beside ? w * 0.52 : w;
  // The track's box in metres: a hill stands on the level its heights are measured from.
  const xs = track.outline.map((q) => q[0]);
  // A pendulum shown beside a longer one leaves room under its support for that length.
  const room = 'swing' in el.path! ? el.path!.swing.room : undefined;
  const ys = [...track.outline.map((q) => q[1]), 0, ...(track.pivot ? [track.pivot[1], ...(room ? [track.pivot[1] - room] : [])] : [])];
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  // Room over the track for the body, its velocity arrow and the label over that.
  // Under a pendulum, room for the velocity arrow and the speed under its bob.
  const head = track.pivot ? 34 : 120;
  const top = 44;
  const foot = h - barsH - (track.pivot ? 96 : 30);
  const S = Math.min((tw - 150) / (x1 - x0), (foot - top - head) / (y1 - y0));
  const X = (m: number) => tw / 2 + (m - (x0 + x1) / 2) * S;
  const Y = (m: number) => foot - (m - y0) * S;
  // The note of a phase sits over the track, or over the bars when they are beside it.
  // In a narrow picture it moves left to clear the clock.
  const noteX = Math.min(beside ? tw + 150 : w / 2, clock > 0 ? w - 302 : w);
  const out: ReactElement[] = [];

  const label = el.lanes?.[0]?.label;
  if (label)
    out.push(
      <text key="label" x={0} y={14} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: labelCase(label) }}>
        {label}
      </text>,
    );

  const line = track.outline.map(([x, y]) => `${X(x)},${Y(y)}`).join(' ');
  if (track.pivot) {
    const [px, py] = [X(track.pivot[0]), Y(track.pivot[1])];
    out.push(
      <g key="track">
        {/* The support the pendulum hangs from, and the arc its bob can swing along. */}
        <line x1={px - 70} y1={py} x2={px + 70} y2={py} stroke={TRACK} strokeWidth={5} strokeLinecap="round" />
        <polyline points={line} fill="none" stroke={INK3} strokeWidth={2} strokeDasharray="3 9" strokeLinecap="round" opacity={0.6} />
      </g>,
    );
  } else {
    out.push(
      <g key="track">
        <polygon points={`${X(x0)},${Y(0)} ${line} ${X(x1)},${Y(0)}`} fill="rgb(77 163 255 / 0.1)" />
        <line x1={X(x0)} y1={Y(0)} x2={X(x1)} y2={Y(0)} stroke={INK3} strokeWidth={1.5} opacity={0.7} />
        <polyline points={line} fill="none" stroke={TRACK} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
      </g>,
    );
  }
  // The level that heights are measured from.
  if (height > 0 && track.pivot) out.push(<line key="level" x1={X(x0) - 30} y1={Y(0)} x2={X(x1) + 30} y2={Y(0)} stroke={INK3} strokeWidth={1.5} strokeDasharray="6 7" opacity={0.8 * height} />);

  for (const b of el.bodies) {
    const c = toneOf(el, b);
    const s = state.bodies[b.id];
    const at = track.at(s.x);
    const r = Math.max(20, Math.min(34, (widthOf(b) * S) / 2));
    // Where the body touches the track, and its middle: a pendulum's bob is on the arc itself,
    // and anything on a hill sits on top of the track.
    const [tx, ty] = [X(at.x), Y(at.y)];
    const [cx, cy] = track.pivot ? [tx, ty] : [tx - at.sin * r, ty - at.cos * r];
    const tilt = (Math.atan2(at.sin, at.cos) * 180) / Math.PI;
    const f = st?.focus[b.id] ?? 0;

    if (track.pivot) out.push(<line key={`string-${b.id}`} x1={X(track.pivot[0])} y1={Y(track.pivot[1])} x2={cx} y2={cy} stroke={INK2} strokeWidth={2.5} />);

    // How high the body is: from the level heights are measured from, up to where it touches the track.
    if (height > 0 && el.cm && track.pivot) {
      // A small rise (a ballistic pendulum) is written in centimetres on the outer side of the bob,
      // where a line down to the level would be hidden behind it.
      const outer = at.sin < 0 ? -1 : 1;
      out.push(
        <Text key={`h-${b.id}`} x={cx + outer * (r + 14)} y={cy} anchor={outer < 0 ? 'end' : 'start'} size={20} color={INK2} opacity={height * clamp01(at.y * 400)}>
          {`h = ${live(at.y * 100)} cm`}
        </Text>,
      );
    } else if (height > 0 && at.y > 0.02) {
      const side = at.x < (x0 + x1) / 2 ? -1 : 1;
      // The length of the line that can be seen: a pendulum's bob covers the top of it. The label
      // sits half way down it, or near the foot of a hill, clear of the track; it fades when the
      // line is too short to hold it.
      const seen = at.y * S - (track.pivot ? r : 0);
      out.push(
        <g key={`h-${b.id}`} opacity={height}>
          <line x1={tx} y1={ty} x2={tx} y2={Y(0)} stroke={INK2} strokeWidth={2} strokeDasharray="6 6" />
          <Text x={tx + side * 12} y={track.pivot ? Y(0) - seen / 2 : Y(0) - 18} anchor={side < 0 ? 'end' : 'start'} size={20} color={INK2} opacity={clamp01((seen - 26) / 20)}>
            {`h = ${live(at.y)} m`}
          </Text>
        </g>,
      );
    }

    out.push(
      <g key={b.id} style={f > 0 ? { filter: `drop-shadow(0 0 ${16 * f}px ${c})` } : undefined}>
        {b.shape === 'ball' || track.pivot ? (
          <>
            <circle cx={cx} cy={cy} r={r - 1.5} fill="#1b1846" stroke={c} strokeWidth={3} />
            <circle cx={cx} cy={cy} r={r - 1.5} fill={c} fillOpacity={0.3} />
          </>
        ) : (
          <g transform={`translate(${tx} ${ty}) rotate(${-tilt})`}>
            <rect x={-r * 1.25} y={-2 * r + 6} width={r * 2.5} height={2 * r - 14} rx={9} fill="#1b1846" stroke={c} strokeWidth={3} />
            <rect x={-r * 1.25} y={-2 * r + 6} width={r * 2.5} height={2 * r - 14} rx={9} fill={c} fillOpacity={0.3} />
            {[-0.7, 0.7].map((k) => (
              <circle key={k} cx={k * r} cy={-8} r={8} fill="#15123a" stroke={c} strokeWidth={3} />
            ))}
          </g>
        )}
        <Text x={cx} y={cy} size={Math.min(20, r * 0.6)} weight={700}>
          {b.label ?? `${short(b.mass)} kg`}
        </Text>
      </g>,
    );

    // The length of a pendulum, beside the middle of its string.
    const long = part('length');
    if (long > 0 && track.pivot && 'swing' in el.path!) {
      const [px, py] = [X(track.pivot[0]), Y(track.pivot[1])];
      out.push(
        <Text key={`len-${b.id}`} x={(px + cx) / 2 + 16} y={(py + cy) / 2} anchor="start" size={20} color={INK2} opacity={long}>
          {`L = ${Math.round(el.path!.swing.length * 100) / 100} m`}
        </Text>,
      );
    }

    // What pulls a pendulum back: the weight of its bob points straight down, and the part of it
    // along the swing (m × g × the sine of the angle) points along the arc, towards the lowest point.
    const restoring = part('restoring');
    if (restoring > 0 && track.pivot) {
      const fs = el.forceScale ?? 12;
      const W = b.mass * el.path!.g;
      const F = W * at.sin;
      const outer = at.sin < 0 ? -1 : 1;
      // The label of the restoring force fades as the force does, near the lowest point.
      const seen = clamp01((Math.abs(F) * fs - 10) / 12);
      out.push(
        <g key={`pull-${b.id}`} opacity={restoring}>
          <line x1={cx} y1={cy + W * fs} x2={cx - F * fs * at.cos} y2={cy + F * fs * at.sin} stroke={INK3} strokeWidth={1.5} strokeDasharray="4 6" opacity={seen} />
          <Arrow x={cx} y={cy} len={-W * fs} axis="y" color={TONES.hyp} weight={7} />
          <Text x={cx} y={cy + W * fs + 20} color={TONES.hyp} size={19}>
            {`Weight ${live(W)} N`}
          </Text>
          <Arrow x={cx} y={cy} len={-F * fs} turn={tilt} color={NET} weight={7} />
          <Text x={cx + outer * (r + 16)} y={cy - 12} anchor={outer < 0 ? 'end' : 'start'} color={NET} size={19} opacity={seen}>
            Restoring force
          </Text>
          <Text x={cx + outer * (r + 16)} y={cy + 12} anchor={outer < 0 ? 'end' : 'start'} color={NET} size={19} opacity={seen}>
            {`${live(Math.abs(F))} N`}
          </Text>
        </g>,
      );
    }

    // The velocity arrow rides over the body, along the track, with the speed over it; under a
    // pendulum's bob instead, clear of its string.
    if (vel > 0) {
      const moving = Math.abs(s.v) >= 0.05;
      const side = track.pivot ? -1 : 1;
      const [ax, ay] = [cx - side * at.sin * (r + 20), cy - side * at.cos * (r + 20)];
      if (moving) out.push(<Arrow key={`v-${b.id}`} x={ax - Math.sign(s.v) * at.cos * Math.min(40, (Math.abs(s.v) * vs) / 2)} y={ay + Math.sign(s.v) * at.sin * Math.min(40, (Math.abs(s.v) * vs) / 2)} len={s.v * vs} turn={tilt} color={VELOCITY} weight={6} opacity={vel} />);
      // A bob at rest at the end of its swing says so on its inner side, level with it.
      const inner = at.sin > 0 ? -1 : 1;
      out.push(
        track.pivot && !moving ? (
          <Text key={`vt-${b.id}`} x={cx + inner * (r + 14)} y={cy} anchor={inner < 0 ? 'end' : 'start'} color={VELOCITY} opacity={vel}>
            at rest
          </Text>
        ) : (
          <Text key={`vt-${b.id}`} x={cx - side * at.sin * (r + 50)} y={cy - side * at.cos * (r + 50) + (moving ? 0 : 24)} color={VELOCITY} opacity={vel}>
            {moving ? `${el.speedWord ? 'speed' : 'v'} = ${speedText(Math.abs(s.v), el.velocityDecimals)} m/s` : 'at rest'}
          </Text>
        ),
      );
    }
  }

  if (el.energy && (energy > 0 || total > 0))
    out.push(
      beside ? (
        <EnergyBars key="energy" el={el} state={state} x={tw + 30} y={Math.max(top, (top + foot - energyRows(el) * 62) / 2)} w={w - tw - 30} opacity={energy} total={total} stacked />
      ) : (
        <EnergyBars key="energy" el={el} state={state} x={0} y={h - barsH + 26} w={w} opacity={energy} total={total} />
      ),
    );
  if (clock > 0) out.push(<Clock key="clock" w={w} time={state.time} opacity={clock} />);
  const count = part('count');
  if (count > 0) out.push(<Count key="count" n={oscillations(state, el.bodies[0].id)} opacity={count} under={w} word={track.pivot ? 'Swings' : undefined} />);
  if (state.note)
    out.push(
      <g key="note">
        <rect x={noteX - 120} y={0} width={240} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={noteX} y={19.5} size={19} color="#fff">
          {state.note}
        </Text>
      </g>,
    );

  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
