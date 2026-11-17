/**
 * Waves seen from above, for the physics videos (src/video/ripples.ts works them out): each crest
 * is a circle that grows from where its source was when it left. Over the crests go the things a
 * lesson measures: the path from each source to a listener, the difference between the paths, the
 * waves that arrive there and their sum, the wavelength ahead of and behind a moving source, and
 * the frequency a listener receives.
 */
import type { ReactElement } from 'react';
import type { RippleListener, RippleSource, RipplesEl, Tone } from '../script.ts';
import { arrival, crestsOf, loudness, received, ripplesAt, sourceAt, type Point } from '../ripples.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Arrow, BODY_TONES, clamp01, Clock, fine, INK2, NET, short, Text, VELOCITY } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** Source colours when the script gives none, by the source's place in the list. */
const SOURCE_TONES: Tone[] = BODY_TONES;

/** A length on the picture, to the nearest centimetre: a listener who walks is not at a round distance on the way. */
const metres = (n: number) => String(Math.round(n * 100) / 100);
/** A frequency for a label: whole when it is whole, one decimal otherwise. */
const hertz = (f: number) => `${short(f)} Hz`;

/** A thin arrow with a head at each end, for a length measured on the picture. */
function Measure({ a, b, color }: { a: Point; b: Point; color: string }) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if (len < 6) return null;
  const [ux, uy] = [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
  const head = Math.min(11, len / 2.2);
  const tip = ([x, y]: Point, s: number) => `${x},${y} ${x - s * ux * head - uy * 5.5},${y - s * uy * head + ux * 5.5} ${x - s * ux * head + uy * 5.5},${y - s * uy * head - ux * 5.5}`;
  return (
    <g>
      <line x1={a[0] + ux * head * 0.8} y1={a[1] + uy * head * 0.8} x2={b[0] - ux * head * 0.8} y2={b[1] - uy * head * 0.8} stroke={color} strokeWidth={3} />
      <polygon points={tip(b, 1)} fill={color} />
      <polygon points={tip(a, -1)} fill={color} />
    </g>
  );
}

/** Where a label goes beside a dot at (x, y). */
function beside(x: number, y: number, side: RippleSource['side'], gap: number): { x: number; y: number; anchor: 'start' | 'middle' | 'end' } {
  if (side === 'left') return { x: x - gap, y, anchor: 'end' };
  if (side === 'right') return { x: x + gap, y, anchor: 'start' };
  return { x, y: y + (side === 'below' ? gap + 6 : -gap - 6), anchor: 'middle' };
}

export function RipplesView({ el, st, w, h, plays }: { el: RipplesEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = ripplesAt(el, plays ?? st?.plays ?? []);
  const part = (name: string) => ownPart(st, name);
  const [x0, y0, x1, y1] = el.view;
  const top = 46;
  const scale = Math.min((h - top) / (y1 - y0), w / (x1 - x0));
  const pw = (x1 - x0) * scale;
  const ph = (y1 - y0) * scale;
  const listeners = el.listeners ?? [];
  // With room beside the picture, it sits on the left and the measurements at the first listener are written on the right.
  const panel = w - pw >= 380 && listeners.length > 0;
  const left = panel ? 0 : (w - pw) / 2;
  const X = (x: number) => left + (x - x0) * scale;
  const Y = (y: number) => top + (y1 - y) * scale;
  const at = ([x, y]: Point): Point => [X(x), Y(y)];
  const tone = (s: RippleSource) => TONES[s.tone ?? SOURCE_TONES[el.sources.indexOf(s) % SOURCE_TONES.length]];
  const name = (s: RippleSource | RippleListener) => s.label ?? s.id;
  const clip = `ripples-${el.id}`;
  const out: ReactElement[] = [];
  const inside: ReactElement[] = [];

  // How large the waves are at each place when they are added: bright where they arrive in step.
  const pattern = part('pattern');
  if (pattern > 0) {
    const cell = 10;
    const cells: ReactElement[] = [];
    for (let px = 0; px < pw; px += cell)
      for (let py = 0; py < ph; py += cell) {
        const loud = loudness(el, [x0 + (px + cell / 2) / scale, y1 - (py + cell / 2) / scale], state.time);
        if (loud > 0.08) cells.push(<rect key={`c${px}-${py}`} x={left + px} y={top + py} width={cell} height={cell} fill={NET} opacity={(0.5 * loud * loud * pattern).toFixed(3)} />);
      }
    // Blurred a little, so the shading has no squares in it.
    inside.push(
      <g key="pattern" style={{ filter: 'blur(5px)' }}>
        {cells}
      </g>,
    );
  }

  // The crests: circles that grow from where the source was when each left.
  for (const s of el.sources) {
    const glow = st?.focus[s.id] ?? 0;
    const color = tone(s);
    const far = Math.hypot(x1 - x0, y1 - y0);
    inside.push(
      <g key={`crests-${s.id}`} fill="none" stroke={color} strokeWidth={2.5 + 1.5 * glow} style={glow > 0 ? { filter: `drop-shadow(0 0 ${8 * glow}px ${color})` } : undefined}>
        {crestsOf(el, s, state.time).map(({ centre, radius }, i) => (
          <circle key={i} cx={X(centre[0])} cy={Y(centre[1])} r={radius * scale} opacity={(0.9 * Math.max(0.35, 1 - (0.8 * radius) / far)).toFixed(2)} />
        ))}
      </g>,
    );
  }

  out.push(
    <defs key="defs">
      <clipPath id={clip}>
        <rect x={left} y={top} width={pw} height={ph} rx={14} />
      </clipPath>
    </defs>,
  );
  out.push(<rect key="frame" x={left} y={top} width={pw} height={ph} rx={14} fill="rgb(255 255 255 / 0.03)" stroke="rgb(255 255 255 / 0.14)" strokeWidth={1.5} />);
  out.push(
    <g key="inside" clipPath={`url(#${clip})`}>
      {inside}
    </g>,
  );

  // The path from each source to the first listener: from where the source was when what arrives now left it.
  const first = listeners[0];
  const here = first ? state.listeners[first.id] : undefined;
  const arrivals = here ? el.sources.map((s) => arrival(el, s, here, state.time)) : [];
  const paths = part('paths');
  if (paths > 0 && here)
    el.sources.forEach((s, i) => {
      const [a, b] = [at(arrivals[i].from), at(here)];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      // The lengths are written on the outer side of each line, so two lines that end together keep their labels apart.
      const side = i % 2 === 0 ? -1 : 1;
      const [nx, ny] = [(-(b[1] - a[1]) / len) * side, ((b[0] - a[0]) / len) * side];
      out.push(
        <g key={`path-${s.id}`} opacity={paths}>
          <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={tone(s)} strokeWidth={3} strokeDasharray="9 7" strokeLinecap="round" />
          <Text x={a[0] + (b[0] - a[0]) * 0.45 + nx * 26} y={a[1] + (b[1] - a[1]) * 0.45 + ny * 26} size={21} color={tone(s)}>{`${metres(arrivals[i].path)} m`}</Text>
        </g>,
      );
    });

  // The wavelength, between two crests: along the way a moving source is going (ahead of it, and behind), or to the right of a still one.
  const wavelength = part('wavelength');
  if (wavelength > 0)
    for (const s of el.sources) {
      const moving = Math.hypot(...(s.velocity ?? [0, 0])) > 0;
      const [dx, dy] = moving ? (s.velocity!.map((v) => v / Math.hypot(...s.velocity!)) as Point) : [1, 0];
      const crests = crestsOf(el, s, state.time);
      const now = sourceAt(s, state.time);
      const every = Math.max(1, Math.round(el.every ?? 1));
      for (const way of moving ? [1, -1] : [1]) {
        // Where each crest crosses the line through the source, on this side of it.
        const cross = crests.map(({ centre, radius }): Point => [centre[0] + way * dx * radius, centre[1] + way * dy * radius]);
        const clear = (q: Point) => Math.hypot(q[0] - now[0], q[1] - now[1]) * scale > 112 && q[0] > x0 && q[0] < x1 && q[1] > y0 && q[1] < y1;
        const k = cross.findIndex((q, i) => i + 1 < cross.length && clear(q) && clear(cross[i + 1]));
        if (k < 0) continue;
        const [a, b] = [at(cross[k]), at(cross[k + 1])];
        const gap = Math.hypot(cross[k + 1][0] - cross[k][0], cross[k + 1][1] - cross[k][1]);
        out.push(
          <g key={`wavelength-${s.id}-${way}`} opacity={wavelength}>
            <Measure a={a} b={b} color={INK} />
            <Text x={(a[0] + b[0]) / 2} y={(a[1] + b[1]) / 2 - 24} size={20}>
              {every > 1 ? `${every} wavelengths: ${fine(gap)} m` : `${fine(gap)} m`}
            </Text>
          </g>,
        );
      }
    }

  // The sources, each with its name; a moving one with its velocity.
  const velocity = part('velocity');
  for (const s of el.sources) {
    const [x, y] = at(sourceAt(s, state.time));
    const color = tone(s);
    const label = beside(x, y, s.side, 20);
    const speed = Math.hypot(...(s.velocity ?? [0, 0]));
    out.push(
      <g key={`source-${s.id}`}>
        {velocity > 0 && speed > 0 && (
          <g opacity={velocity}>
            <Arrow x={x} y={y} len={64} turn={(Math.atan2(s.velocity![1], s.velocity![0]) * 180) / Math.PI} color={VELOCITY} weight={7} />
            <Text x={x} y={y + 30} size={20} color={VELOCITY}>{`${short(speed)} m/s`}</Text>
          </g>
        )}
        <circle cx={x} cy={y} r={11} fill={color} stroke="#15123a" strokeWidth={3} />
        <circle cx={x} cy={y} r={4} fill="#15123a" />
        {s.label && (
          <Text x={label.x} y={label.y} anchor={label.anchor} size={20} color={color}>
            {s.label}
          </Text>
        )}
      </g>,
    );
  }

  // The listeners, with what each receives.
  const heard = part('heard');
  const count = part('count');
  for (const l of listeners) {
    const where = state.listeners[l.id];
    const [x, y] = at(where);
    const label = beside(x, y, l.side, 20);
    // A listener hears the first source; with several, the sum is in the panel.
    const s = el.sources[0];
    const a = arrival(el, s, where, state.time);
    const n = received(el, s, where, state.time);
    out.push(
      <g key={`listener-${l.id}`}>
        <circle cx={x} cy={y} r={10} fill="#fff" stroke="#15123a" strokeWidth={3} />
        {l.label && (
          <Text x={label.x} y={label.y} anchor={label.anchor} size={20}>
            {l.label}
          </Text>
        )}
        {heard > 0 && a.arrived && (
          <Text x={x} y={y + (l.side === 'below' ? -28 : 28)} size={21} color={NET} opacity={heard}>{`hears ${hertz(a.frequency)}`}</Text>
        )}
        {count > 0 && (
          <Text x={x} y={y + (l.side === 'below' ? -28 : 28) * (heard > 0 ? 1.95 : 1)} size={20} color={INK2} opacity={count}>{`${n} ${n === 1 ? 'crest' : 'crests'} received`}</Text>
        )}
      </g>,
    );
  }

  // The panel: the two paths and their difference, the waves that arrive and their sum, and how loud that is.
  if (panel && here) {
    const px = pw + 40;
    const right = w - 4;
    const difference = part('difference');
    const traces = part('traces');
    const loud = part('loudness');
    let y = top + 14;
    if (paths > 0) {
      el.sources.forEach((s, i) => {
        out.push(
          <g key={`row-${s.id}`} opacity={paths}>
            <circle cx={px + 9} cy={y} r={8} fill={tone(s)} />
            <Text x={px + 28} y={y} anchor="start" size={22} color={tone(s)}>{`From ${name(s)}: ${metres(arrivals[i].path)} m`}</Text>
          </g>,
        );
        y += 34;
      });
    } else y += 34 * el.sources.length;
    y += 14;
    // The path difference, and how many of the first source's wavelengths it is.
    if (difference > 0 && arrivals.length >= 2) {
      const diff = Math.abs(arrivals[1].path - arrivals[0].path);
      const lambda = el.speed / el.sources[0].frequency;
      out.push(
        <g key="difference" opacity={difference}>
          <Text x={px} y={y} anchor="start" size={22}>{`Path difference: ${metres(diff)} m`}</Text>
          <Text x={px} y={y + 34} anchor="start" size={24} color={NET}>{`= ${metres(diff / lambda)} wavelengths`}</Text>
        </g>,
      );
    }
    y += 78;
    // What arrives from each source, and the sum, over the last three periods: now is at the right-hand end.
    if (traces > 0) {
      const span = 3 / el.sources[0].frequency;
      const [tx0, tx1] = [px + 132, right - 14];
      const unit = 21;
      const rows = [...el.sources.map((s) => ({ key: s.id, label: name(s), color: tone(s), value: (t: number) => arrival(el, s, here, t).signal, tall: 62 })), { key: 'sum', label: 'Together', color: NET, value: (t: number) => el.sources.reduce((sum, s) => sum + arrival(el, s, here, t).signal, 0), tall: 62 + (el.sources.length - 1) * 44 }];
      const drawn: ReactElement[] = [];
      for (const row of rows) {
        const mid = y + row.tall / 2;
        const pts: string[] = [];
        for (let i = 0; i <= 120; i++) pts.push(`${(tx0 + ((tx1 - tx0) * i) / 120).toFixed(1)},${(mid - row.value(state.time - span * (1 - i / 120)) * unit).toFixed(1)}`);
        drawn.push(
          <g key={row.key}>
            <Text x={px} y={mid} anchor="start" size={20} color={row.color}>
              {row.label}
            </Text>
            <line x1={tx0} y1={mid} x2={tx1} y2={mid} stroke={INK3} strokeWidth={2} strokeDasharray="3 8" opacity={0.6} />
            <polyline points={pts.join(' ')} fill="none" stroke={row.color} strokeWidth={row.key === 'sum' ? 4 : 3} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={tx1} cy={mid - row.value(state.time) * unit} r={6} fill={row.color} stroke="#15123a" strokeWidth={2} />
          </g>,
        );
        y += row.tall;
      }
      out.push(
        <g key="traces" opacity={traces}>
          {drawn}
        </g>,
      );
    } else y += 62 * el.sources.length + 62 + (el.sources.length - 1) * 44;
    y += 22;
    // How large the sum is, against the most it could be.
    if (loud > 0) {
      const level = loudness(el, here, state.time);
      const full = right - px - 120;
      const word = level >= 0.85 ? 'Loud' : level <= 0.15 ? 'Quiet' : '';
      out.push(
        <g key="loudness" opacity={loud}>
          <Text x={px} y={y} anchor="start" size={20} color={INK2}>Loudness</Text>
          <rect x={px} y={y + 20} width={full} height={26} rx={7} fill="rgb(255 255 255 / 0.06)" />
          <rect x={px} y={y + 20} width={full * level * level} height={26} rx={Math.min(7, (full * level * level) / 2)} fill={NET} fillOpacity={0.85} />
          <Text x={px + full + 16} y={y + 33} anchor="start" size={24} color={NET}>
            {word}
          </Text>
        </g>,
      );
    }
  }

  const clock = part('clock');
  if (clock > 0) out.push(<Clock key="clock" w={w} time={state.time / (el.clock?.seconds ?? 1)} unit={el.clock?.unit ?? 's'} opacity={clock} />);
  if (state.note) {
    const mid = left + pw / 2;
    out.push(
      <g key="note">
        <rect x={mid - 120} y={0} width={240} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={mid} y={19.5} size={19} color="#fff">
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
