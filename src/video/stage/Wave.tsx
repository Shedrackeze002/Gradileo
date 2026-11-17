/**
 * Travelling waves for the physics videos (src/video/wave.ts works the waves out). Each lane is a
 * strip with its source at the left: a rope whose points move up and down as the wave runs along
 * it, or a tube of particles that move back and forth and crowd into compressions. Over the waves
 * go the things a lesson measures: one marked point, the amplitude, the wavelength, the waves
 * that have passed a post, and the speed.
 */
import type { ReactElement } from 'react';
import type { Tone, WaveEl, WaveLane } from '../script.ts';
import { largestAmplitude, shortestWavelength, standingOf, waveAt, type LaneState } from '../wave.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Arrow, BODY_TONES, clamp01, Clock, fine, FONT, INK2, live, NET, short, Text, VELOCITY } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** Lane colours when the script gives none, by the lane's place in the list. */
const LANE_TONES: Tone[] = BODY_TONES;
const TAU = 2 * Math.PI;

/** A thin arrow with a head at each end, for a length measured on the wave. */
function Measure({ x1, y1, x2, y2, color, opacity = 1 }: { x1: number; y1: number; x2: number; y2: number; color: string; opacity?: number }) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (len < 6) return null;
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const head = Math.min(11, len / 2.2);
  const hw = 5.5;
  const tip = (x: number, y: number, s: number) => `${x},${y} ${x - s * ux * head - uy * hw},${y - s * uy * head + ux * hw} ${x - s * ux * head + uy * hw},${y - s * uy * head - ux * hw}`;
  return (
    <g opacity={opacity}>
      <line x1={x1 + ux * head * 0.8} y1={y1 + uy * head * 0.8} x2={x2 - ux * head * 0.8} y2={y2 - uy * head * 0.8} stroke={color} strokeWidth={3} />
      <polygon points={tip(x2, y2, 1)} fill={color} />
      <polygon points={tip(x1, y1, -1)} fill={color} />
    </g>
  );
}

/**
 * Which neighbouring pair of crests to measure the wavelength between: the first, from `from`
 * on, whose label is clear of the lane's own label at the top left.
 */
function pairFrom(xs: number[], from: number, f: Frame, lane: WaveLane): number {
  const clear = lane.label ? lane.label.length * 11.5 + 110 : 0;
  for (let k = from; k + 1 < xs.length; k++) if ((f.X(xs[k]) + f.X(xs[k + 1])) / 2 > clear) return k;
  return Math.min(from, Math.max(0, xs.length - 2));
}

/** The step between the numbers of a ruler that is `length` long: at most twelve of them. */
function rulerStep(length: number): number {
  for (const step of [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500]) if (length / step <= 12) return step;
  return 1000;
}

interface Frame {
  /** Metres to pixels along the strip. */
  X: (x: number) => number;
  left: number;
  right: number;
  top: number;
  laneH: number;
  w: number;
}

/** What the parts of a lane need: how far each has appeared. */
interface Parts {
  particle: number;
  amplitude: number;
  wavelength: number;
  count: number;
  speed: number;
  labels: number;
  frequency: number;
  front: number;
  pulses: number;
  sum: number;
  heights: number;
  pull: number;
  motion: number;
  nodes: number;
  loop: number;
  length: number;
}

/** The colours of the outlines of single pulses, in order, when the script gives none. */
const PULSE_TONES: Tone[] = ['opp', 'good', 'hyp', 'theta'];

/**
 * The front of a wave that started at the source: a marker where it has got to (on its way back,
 * after bouncing off the far end) and the distance it has travelled so far.
 */
function Front({ el, lane, state, f, y1, y2, opacity }: { el: WaveEl; lane: WaveLane; state: LaneState; f: Frame; y1: number; y2: number; opacity: number }) {
  const length = el.span[1] - el.span[0];
  const d = state.front;
  if (!Number.isFinite(d) || d <= 0 || d > (lane.reflect ? 2 : 1) * length + 1e-9) return null;
  const back = d > length;
  const x = f.X(el.span[0] + (back ? 2 * length - d : d));
  const left = back ? x > f.left + 230 : x > f.right - 230;
  // Back near the source, the distance would sit on the lane's label at the top left: it goes under the strip instead.
  const under = !left && lane.label !== undefined && x + 12 < lane.label.length * 11.5 + 24;
  return (
    <g opacity={opacity}>
      <line x1={x} y1={y1} x2={x} y2={under ? y2 + 30 : y2} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <Text x={x + (left ? -12 : 12)} y={under ? y2 + 20 : y1 + 6} size={20} anchor={left ? 'end' : 'start'}>{`travelled ${d >= 100 ? Math.round(d) : live(d)} m`}</Text>
    </g>
  );
}

/** A rope: the wave is the shape of the rope, and each bead on it only moves up and down. */
function Rope({ el, lane, state, f, y0, color, glow, parts, mark, passed }: { el: WaveEl; lane: WaveLane; state: LaneState; f: Frame; y0: number; color: string; glow: number; parts: Parts; mark: number; passed: number }) {
  const out: ReactElement[] = [];
  // Lanes of one kind share a scale, so a larger amplitude looks larger beside a smaller one.
  const most = Math.max(...el.lanes.filter((l) => l.kind === lane.kind).map((l) => largestAmplitude(el, l))) || 1;
  const ampPx = Math.min(f.laneH * 0.27, 76);
  const scale = ampPx / most;
  const metres = (px: number) => el.span[0] + ((px - f.left) / (f.right - f.left)) * (el.span[1] - el.span[0]);
  const Y = (x: number) => y0 - state.at(x) * scale;
  const unit = el.amplitudeUnit ?? 'm';

  // A standing wave is on a string between two fixed ends, which may stop short of the strip's end.
  const standing = standingOf(el, lane);
  const endPx = state.end !== undefined ? f.X(state.end) : f.right;
  // How far the string moves at its widest: a wave that meets its own reflection moves twice as far as either.
  const widest = (standing ? state.amplitude : lane.reflect && state.frequency > 0 ? 2 * state.amplitude : state.amplitude) * scale;

  // The rest position, and the slot the source moves in (a standing wave's string is held at its left end instead).
  out.push(<line key="rest" x1={f.left} y1={y0} x2={endPx} y2={y0} stroke={INK3} strokeWidth={2} strokeDasharray="3 9" opacity={0.55} />);
  if (standing) {
    out.push(<rect key="hold" x={f.left - 12} y={y0 - ampPx - 18} width={12} height={2 * ampPx + 36} rx={3} fill={INK3} />);
    out.push(<rect key="hold2" x={endPx} y={y0 - ampPx - 18} width={12} height={2 * ampPx + 36} rx={3} fill={INK3} />);
    // The two shapes the string swings between.
    for (const side of [-1, 1]) {
      const edge: string[] = [];
      for (let px = f.left; px <= endPx + 0.01; px += 4) edge.push(`${px.toFixed(1)},${(y0 - side * state.amplitude * Math.sin(standing.k * (metres(px) - el.span[0])) * scale).toFixed(1)}`);
      out.push(<polyline key={`edge${side}`} points={edge.join(' ')} fill="none" stroke={color} strokeWidth={2} strokeDasharray="5 7" opacity={0.4} />);
    }
  } else out.push(<rect key="slot" x={f.left - 10} y={y0 - ampPx - 16} width={20} height={2 * ampPx + 32} rx={10} fill="rgb(255 255 255 / 0.06)" stroke="rgb(255 255 255 / 0.16)" />);

  // Each pulse on its own, under the rope that carries their sum.
  if (parts.pulses > 0)
    state.pulses.forEach((own, i) => {
      const run: string[] = [];
      for (let px = f.left; px <= f.right + 0.01; px += 4) {
        const v = own(metres(px));
        if (Math.abs(v) > 1e-4 * most) run.push(`${px.toFixed(1)},${(y0 - v * scale).toFixed(1)}`);
      }
      if (run.length > 1) out.push(<polyline key={`pulse${i}`} points={run.join(' ')} fill="none" stroke={TONES[lane.pulses?.[i]?.tone ?? PULSE_TONES[i % PULSE_TONES.length]]} strokeWidth={3} strokeDasharray="7 6" strokeLinecap="round" opacity={0.9 * parts.pulses} />);
    });

  // The rope, and the beads on it. Past a join it is another rope: heavier where the wave is slower.
  const stretch = (from: number, to: number) => {
    const pts: string[] = [];
    for (let px = from; px <= to + 0.01; px += 4) pts.push(`${px.toFixed(1)},${Y(metres(px)).toFixed(1)}`);
    if (to - from > 0.01 && (to - from) % 4 > 0.01) pts.push(`${to.toFixed(1)},${Y(metres(to)).toFixed(1)}`);
    return pts.join(' ');
  };
  const joinPx = state.join !== undefined ? f.X(state.join) : undefined;
  const rope = (key: string, from: number, to: number, width: number) => <polyline key={key} points={stretch(from, to)} fill="none" stroke={color} strokeWidth={width + 2.5 * glow} strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 ${6 + 10 * glow}px ${color}88)` }} />;
  if (joinPx !== undefined) {
    out.push(rope('rope', f.left, joinPx, 5));
    out.push(rope('rope2', joinPx, f.right, (state.speed2 ?? state.speed) < state.speed ? 10 : 2.5));
  } else out.push(rope('rope', f.left, endPx, 5));
  const beads = Math.floor((f.right - f.left) / 30);
  for (let i = 1; i <= beads; i++) {
    const px = f.left + (i * (f.right - f.left)) / (beads + 0.5);
    if (px > endPx - 6) continue;
    out.push(<circle key={`b${i}`} cx={px} cy={Y(metres(px))} r={4.2} fill="#15123a" stroke={color} strokeWidth={2} />);
  }
  // How fast the points of the rope are moving, up or down: an arrow on each bead. A rope
  // that is flat for an instant while two pulses cancel is moving fastest then.
  if (parts.motion > 0) {
    const fastest = ((most * TAU) / shortestWavelength(el, lane)) * lane.speed;
    for (let i = 1; i <= beads; i++) {
      const px = f.left + (i * (f.right - f.left)) / (beads + 0.5);
      if (px > endPx - 6) continue;
      const len = 34 * Math.max(-2, Math.min(2, state.rate(metres(px)) / fastest));
      if (Math.abs(len) >= 5) out.push(<Arrow key={`m${i}`} x={px} y={Y(metres(px))} len={len} axis="y" color={VELOCITY} weight={5} opacity={parts.motion} />);
    }
  }
  if (joinPx !== undefined) out.push(<circle key="knot" cx={joinPx} cy={Y(state.join!)} r={8} fill={INK} stroke="#15123a" strokeWidth={2} />);
  if (!standing) out.push(<circle key="hand" cx={f.left} cy={Y(el.span[0])} r={11} fill={INK} stroke="#15123a" strokeWidth={2} />);

  const inView = (x: number) => f.X(x) >= f.left + 26 && f.X(x) <= f.right - 26;
  const crests = state.crests.filter(inView);
  const troughs = state.troughs.filter(inView);

  // The amplitude: from the rest position to the top of a crest.
  if (parts.amplitude > 0 && crests.length) {
    const x = crests[0];
    const a = Math.abs(state.at(x));
    out.push(
      <g key="amplitude" opacity={parts.amplitude}>
        <Measure x1={f.X(x)} y1={y0} x2={f.X(x)} y2={y0 - a * scale} color={NET} />
        <Text x={f.X(x)} y={y0 - a * scale - 22} size={20} color={NET}>{el.values === false ? 'amplitude' : `amplitude ${short(a)} ${unit}`}</Text>
      </g>,
    );
  }

  // The wavelength: from one crest to the next (past the crest the amplitude is measured at, when
  // there is room). With a second medium it is measured on each side of the join.
  const from = pairFrom(crests, parts.amplitude > 0 && crests.length >= 3 ? 1 : 0, f, lane);
  const pairs: Array<[number, number]> = [];
  if (state.join !== undefined) {
    const before = crests.filter((x) => x <= state.join!);
    const after = crests.filter((x) => x >= state.join!);
    if (before.length >= 2) pairs.push([before[before.length - 2], before[before.length - 1]]);
    if (after.length >= 2) pairs.push([after[0], after[1]]);
  } else if (crests.length >= 2) pairs.push([crests[from], crests[from + 1]]);
  if (parts.wavelength > 0)
    pairs.forEach(([a, b], i) => {
      const y = y0 - Math.max(Math.abs(state.at(a)), Math.abs(state.at(b))) * scale - 20;
      out.push(
        <g key={`wavelength${i}`} opacity={parts.wavelength}>
          <line x1={f.X(a)} y1={y - 9} x2={f.X(a)} y2={y0 - Math.abs(state.at(a)) * scale - 6} stroke={INK} strokeWidth={2} opacity={0.6} />
          <line x1={f.X(b)} y1={y - 9} x2={f.X(b)} y2={y0 - Math.abs(state.at(b)) * scale - 6} stroke={INK} strokeWidth={2} opacity={0.6} />
          <Measure x1={f.X(a)} y1={y} x2={f.X(b)} y2={y} color={INK} />
          <Text x={(f.X(a) + f.X(b)) / 2} y={y - 20} size={20}>{el.values === false ? 'wavelength' : `wavelength ${fine(b - a)} m`}</Text>
        </g>,
      );
    });
  // A standing wave has no crests that travel: its wavelength is two loops, from a node to the next but one.
  if (parts.wavelength > 0 && standing && state.nodes.length >= 3) {
    const [a, b] = [state.nodes[0], state.nodes[2]];
    const y = y0 - widest - 52;
    out.push(
      <g key="wavelength" opacity={parts.wavelength}>
        <line x1={f.X(a)} y1={y - 9} x2={f.X(a)} y2={y0 - 8} stroke={INK} strokeWidth={2} opacity={0.4} />
        <line x1={f.X(b)} y1={y - 9} x2={f.X(b)} y2={y0 - 8} stroke={INK} strokeWidth={2} opacity={0.4} />
        <Measure x1={f.X(a)} y1={y} x2={f.X(b)} y2={y} color={INK} />
        <Text x={(f.X(a) + f.X(b)) / 2} y={y - 20} size={20}>{el.values === false ? 'wavelength' : `wavelength ${fine(b - a)} m`}</Text>
      </g>,
    );
  }

  // The points that never move, and the points half way between them that move the most.
  if (parts.nodes > 0 && state.nodes.length) {
    const named = state.nodes[Math.min(1, state.nodes.length - 1)];
    const most2 = state.antinodes[0];
    out.push(
      <g key="nodes" opacity={parts.nodes}>
        {state.antinodes.map((x) => (
          <line key={`a${x}`} x1={f.X(x)} y1={y0 - widest} x2={f.X(x)} y2={y0 + widest} stroke={NET} strokeWidth={2} strokeDasharray="4 5" opacity={0.75} />
        ))}
        {state.nodes.map((x) => (
          <circle key={`n${x}`} cx={f.X(x)} cy={y0} r={7} fill="#fff" stroke="#15123a" strokeWidth={2.5} />
        ))}
        <Text x={f.X(named)} y={y0 + 26} size={20}>node</Text>
        {most2 !== undefined && <Text x={f.X(most2)} y={y0 - widest - 20} size={20} color={NET}>antinode</Text>}
      </g>,
    );
  }
  // The length of a standing wave's string, between its two fixed ends.
  if (parts.length > 0 && standing && state.end !== undefined)
    out.push(
      <g key="length" opacity={parts.length}>
        <Measure x1={f.left} y1={y0 + widest + 24} x2={endPx} y2={y0 + widest + 24} color={INK2} />
        <Text x={(f.left + endPx) / 2} y={y0 + widest + 46} size={20} color={INK2}>{`L = ${fine(state.end - el.span[0])} m`}</Text>
      </g>,
    );
  // One loop of the pattern, from a node to the next: half a wavelength.
  if (parts.loop > 0 && state.nodes.length >= 2) {
    const k = Math.min(1, state.nodes.length - 2);
    const [a, b] = [state.nodes[k], state.nodes[k + 1]];
    const y = y0 + widest + 24;
    out.push(
      <g key="loop" opacity={parts.loop}>
        <Measure x1={f.X(a)} y1={y} x2={f.X(b)} y2={y} color={INK2} />
        <Text x={(f.X(a) + f.X(b)) / 2} y={y + 22} size={20} color={INK2}>{el.values === false ? 'half a wavelength' : `half a wavelength: ${fine(b - a)} m`}</Text>
      </g>,
    );
  }

  // Where pulses overlap, the rope carries their sum: its displacement where that is largest.
  if (parts.sum > 0) {
    let [best, where] = [0, f.left];
    // A free end moves the most of all, so it is looked at too.
    for (let px = f.left + 8; px <= f.right - (lane.reflect === 'free' ? 0 : 8); px += 2) {
      const v = state.at(metres(px));
      if (Math.abs(v) > Math.abs(best)) [best, where] = [v, px];
    }
    // At the end of the strip the number goes beside the rope, not over the ring.
    const edge = where > f.right - 50;
    // With the outline of each pulse drawn, the number clears the tallest of them there too.
    const tip = parts.pulses > 0 ? state.pulses.reduce((far, own) => (Math.sign(best) * own(metres(where)) > Math.sign(best) * far ? own(metres(where)) : far), best) : best;
    if (Math.abs(best) > 0.04 * most)
      out.push(
        <Text key="sum" x={edge ? where - 20 : where} y={y0 - tip * scale - Math.sign(best) * (edge ? 26 : 24)} size={21} color={NET} anchor={edge ? 'end' : 'middle'} opacity={parts.sum}>
          {`${best > 0 ? '+' : '−'}${short(Math.abs(best))} ${unit}`}
        </Text>,
      );
  }

  // The height of each hump on the rope, with its sign: what a join or an end has made of a pulse.
  if (parts.heights > 0) {
    const tips: Array<[px: number, v: number]> = [];
    for (let px = f.left + 8; px <= f.right - 8; px += 2) {
      const [a, v, b] = [state.at(metres(px - 2)), state.at(metres(px)), state.at(metres(px + 2))].map(Math.abs);
      if (v < 0.04 * most || v < a || v <= b) continue;
      const last = tips[tips.length - 1];
      // Two tips close together are one hump: the higher of them is kept.
      if (last && px - last[0] < 40) {
        if (v > Math.abs(last[1])) tips[tips.length - 1] = [px, state.at(metres(px))];
      } else tips.push([px, state.at(metres(px))]);
    }
    tips.forEach(([px, v], i) =>
      out.push(
        <Text key={`height${i}`} x={px} y={y0 - v * scale - Math.sign(v) * 24} size={21} color={NET} opacity={parts.heights}>
          {`${v > 0 ? '+' : '−'}${short(Math.abs(v))} ${unit}`}
        </Text>,
      ),
    );
  }

  // The pair of forces at a fixed end: the rope pulls on the wall (up, as a crest arrives), and
  // the wall pulls back on the rope with an equal force the other way. The pull is as large as
  // the rope is steep at the wall.
  if (parts.pull > 0 && lane.reflect === true && state.join === undefined) {
    const dx = (el.span[1] - el.span[0]) / 400;
    const steepest = (2 * most * TAU) / shortestWavelength(el, lane);
    const up = Math.max(-1, Math.min(1, state.at(el.span[1] - dx) / dx / steepest));
    const len = 78 * up;
    if (Math.abs(len) >= 4) {
      const [onWall, onRope] = up > 0 ? ['up', 'down'] : ['down', 'up'];
      out.push(
        <g key="pull" opacity={parts.pull}>
          <Arrow x={f.right - 16} y={y0} len={-len} axis="y" color={TONES.opp} weight={7} />
          <Text x={f.right - 34} y={y0 + Math.sign(len) * (ampPx + 30)} size={20} anchor="end" color={TONES.opp}>{`the wall pulls the rope ${onRope}`}</Text>
          <Text x={f.right - 34} y={y0 - Math.sign(len) * (ampPx + 30)} size={20} anchor="end" color={TONES.brand}>{`the rope pulls the wall ${onWall}`}</Text>
        </g>,
      );
    }
  }

  // The names of the high and low points: on a crest nothing else is measured at, when there is one.
  if (parts.labels > 0) {
    const used = (parts.amplitude > 0 ? 1 : 0) + (parts.wavelength > 0 ? 2 : 0);
    const c = crests[used] ?? crests[crests.length - 1];
    const t = troughs[0];
    const lift = crests.indexOf(c) < used ? 46 : 0;
    out.push(
      <g key="labels" opacity={parts.labels}>
        {c !== undefined && <Text x={f.X(c)} y={y0 - Math.abs(state.at(c)) * scale - 22 - lift} size={20} color={INK2}>crest</Text>}
        {t !== undefined && <Text x={f.X(t)} y={y0 + Math.abs(state.at(t)) * scale + 22} size={20} color={INK2}>trough</Text>}
      </g>,
    );
  }

  // One marked point, and the line it keeps to.
  if (parts.particle > 0) {
    out.push(
      <g key="particle" opacity={parts.particle}>
        <line x1={f.X(mark)} y1={y0 - ampPx - 12} x2={f.X(mark)} y2={y0 + ampPx + 12} stroke="#fff" strokeWidth={2} strokeDasharray="5 6" opacity={0.6} />
        <circle cx={f.X(mark)} cy={Y(mark)} r={10} fill="#fff" stroke={color} strokeWidth={4} />
        {el.markLabel && <Text x={f.X(mark)} y={y0 + ampPx + 28} size={19}>{el.markLabel}</Text>}
      </g>,
    );
  }
  if (parts.count > 0) out.push(<Post key="count" f={f} x={f.X(mark)} y1={y0 - ampPx - 30} y2={y0 + ampPx + 14} passed={passed} opacity={parts.count} />);
  if (parts.front > 0) out.push(<Front key="front" el={el} lane={lane} state={state} f={f} y1={y0 - ampPx - 30} y2={y0 + ampPx + 14} opacity={parts.front} />);
  // A wall the rope is tied to, when the wave bounces back from a fixed end; at a free end, a ring that slides on a pole.
  if (lane.reflect === 'free') {
    out.push(<line key="pole" x1={f.right + 2} y1={y0 - ampPx - 22} x2={f.right + 2} y2={y0 + ampPx + 22} stroke={INK3} strokeWidth={5} strokeLinecap="round" />);
    out.push(<circle key="ring" cx={f.right + 2} cy={Y(el.span[1])} r={10} fill="none" stroke={INK} strokeWidth={4} />);
  } else if (lane.reflect) {
    out.push(<rect key="wall" x={f.right} y={y0 - ampPx - 18} width={12} height={2 * ampPx + 36} rx={3} fill={INK3} />);
    if (parts.pull > 0 && state.join === undefined) {
      const dx = (el.span[1] - el.span[0]) / 400;
      const up = Math.max(-1, Math.min(1, state.at(el.span[1] - dx) / dx / ((2 * most * TAU) / shortestWavelength(el, lane))));
      out.push(<Arrow key="pull-wall" x={f.right + 6} y={y0} len={78 * up} axis="y" color={TONES.brand} weight={7} opacity={parts.pull} />);
    }
  }
  return <>{out}</>;
}

/** The counting post at the mark, with the complete waves that have gone past it. */
function Post({ f, x, y1, y2, passed, opacity }: { f: Frame; x: number; y1: number; y2: number; passed: number; opacity: number }) {
  const right = x < f.w - 250;
  return (
    <g opacity={opacity}>
      <line x1={x} y1={y1} x2={x} y2={y2} stroke={NET} strokeWidth={3} strokeLinecap="round" />
      <Text x={x + (right ? 12 : -12)} y={y1 + 6} size={20} color={NET} anchor={right ? 'start' : 'end'}>{`${passed} ${passed === 1 ? 'wave' : 'waves'} passed`}</Text>
    </g>
  );
}

/**
 * A tube of particles: each one moves back and forth about its own place, along the line the wave
 * travels. Where they crowd together is a compression, and where they are spread out a rarefaction.
 */
function Tube({ el, lane, state, f, y0, color, glow, parts, mark, passed }: { el: WaveEl; lane: WaveLane; state: LaneState; f: Frame; y0: number; color: string; glow: number; parts: Parts; mark: number; passed: number }) {
  const out: ReactElement[] = [];
  // Lanes of one kind share a scale, so a larger amplitude looks larger beside a smaller one.
  const most = Math.max(...el.lanes.filter((l) => l.kind === lane.kind).map((l) => largestAmplitude(el, l))) || 1;
  const pxPerMetre = (f.right - f.left) / (el.span[1] - el.span[0]);
  // The particles never pass each other: their largest swing is well under a wavelength ÷ 2π.
  const swing = Math.min(26, (0.6 * Math.min(...el.lanes.filter((l) => l.kind === lane.kind).map((l) => shortestWavelength(el, l))) * pxPerMetre) / TAU);
  const scale = swing / most;
  const tubeH = Math.max(54, Math.min(f.laneH - 96, 118));
  const rows = Math.max(3, Math.floor(tubeH / 19));
  const gap = tubeH / rows;
  const step = 15;
  const cols = Math.floor((f.right - f.left - 10) / step);
  const metres = (px: number) => el.span[0] + (px - f.left) / pxPerMetre;
  const top = y0 - tubeH / 2;

  // The air of a standing wave is in a tube that is closed at the left end and open at the right, where the column ends.
  const standing = standingOf(el, lane);
  const endPx = state.end !== undefined ? f.X(state.end) : f.right;
  // The tube itself stops at its mouth; the air just outside it moves too.
  const mouthPx = state.mouth !== undefined ? f.X(state.mouth) : endPx;
  if (standing) {
    out.push(<rect key="air" x={f.left} y={top - 5} width={mouthPx - f.left} height={tubeH + 10} fill="rgb(255 255 255 / 0.04)" />);
    out.push(<path key="tube" d={`M ${mouthPx} ${top - 5} H ${f.left} V ${top + tubeH + 5} H ${mouthPx}`} fill="none" stroke={`rgb(255 255 255 / ${0.5 + 0.3 * glow})`} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />);
    // The length of the air column, from the closed end to the mouth of the tube.
    if (parts.length > 0 && state.mouth !== undefined)
      out.push(
        <g key="length" opacity={parts.length}>
          <Measure x1={f.left} y1={top - 24} x2={mouthPx} y2={top - 24} color={INK} />
          <Text x={(f.left + mouthPx) / 2} y={top - 44} size={20}>{`${String(Math.round((state.mouth - el.span[0]) * 1000) / 10)} cm`}</Text>
        </g>,
      );
  } else out.push(<rect key="tube" x={f.left - 34} y={top - 5} width={f.right - f.left + 40} height={tubeH + 10} rx={10} fill="rgb(255 255 255 / 0.04)" stroke={`rgb(255 255 255 / ${0.16 + 0.3 * glow})`} strokeWidth={1.5} />);
  // How squashed the air is at a place, from −1 (most spread out) to 1 (most crowded): how fast
  // the displacement falls along the strip, against the most it ever does.
  const steepest = (most * TAU) / Math.min(...el.lanes.filter((l) => l.kind === lane.kind).map((l) => shortestWavelength(el, l)));
  const half = step / pxPerMetre;
  const crowding = (x: number) => Math.max(-1, Math.min(1, (state.at(x - half) - state.at(x + half)) / (2 * half) / steepest));
  const dots: ReactElement[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Every other row is half a step along, so the particles do not stand in a grid.
      const px = f.left + 12 + c * step + (r % 2 ? step / 2 : 0);
      const at = px + state.at(metres(px)) * scale;
      if (px > f.right - 4 || at > f.right + 2 || (standing && px > endPx + 1)) continue;
      // Crowded particles are a little brighter and the spread-out ones dimmer, so a compression shows from a distance.
      const q = crowding(metres(px));
      dots.push(<circle key={`${r}-${c}`} cx={at.toFixed(1)} cy={top + gap * (r + 0.5)} r={(4 + 0.7 * q).toFixed(2)} fillOpacity={(0.7 + 0.3 * q).toFixed(2)} />);
    }
  }
  out.push(
    <g key="dots" fill={color} style={glow > 0 ? { filter: `drop-shadow(0 0 ${8 * glow}px ${color})` } : undefined}>
      {dots}
    </g>,
  );
  // The source: a plate that pushes and pulls the air next to it.
  const plate = f.left - 2 + state.at(el.span[0]) * scale;
  if (!standing)
    out.push(
      <g key="source">
        <line x1={f.left - 34} y1={y0} x2={plate - 8} y2={y0} stroke={INK3} strokeWidth={6} strokeLinecap="round" />
        <rect x={plate - 9} y={top} width={9} height={tubeH} rx={3} fill={INK} />
      </g>,
    );
  else out.push(<rect key="closed" x={f.left - 14} y={top - 12} width={14} height={tubeH + 24} rx={3} fill={INK3} />);

  // How far the air moves at each place along a standing wave: nothing at a node, and most at an
  // antinode. The two curves are drawn in the tube, closing on each node.
  if (standing && parts.nodes > 0) {
    const reach = tubeH / 2 - 8;
    const curve = (side: number) => {
      const pts: string[] = [];
      for (let px = f.left; px <= endPx + 0.01; px += 4) pts.push(`${px.toFixed(1)},${(y0 - side * reach * Math.abs(Math.sin(standing.k * (metres(px) - el.span[0])))).toFixed(1)}`);
      return pts.join(' ');
    };
    const y = top + tubeH + 14;
    // The words go under the last tube only, where no other lane's label is in their way; under a
    // column too short to hold both, "antinode" starts just past the open end.
    const named = el.lanes[el.lanes.length - 1] === lane;
    const [first, open] = [f.X(state.nodes[0]), f.X(state.antinodes[state.antinodes.length - 1])];
    const narrow = open - first < 170;
    out.push(
      <g key="nodes" opacity={parts.nodes}>
        <polyline points={curve(1)} fill="none" stroke={NET} strokeWidth={2.5} opacity={0.85} />
        <polyline points={curve(-1)} fill="none" stroke={NET} strokeWidth={2.5} opacity={0.85} />
        {state.nodes.map((x) => (
          <circle key={`n${x}`} cx={f.X(x)} cy={y0} r={6} fill="#fff" stroke="#15123a" strokeWidth={2.5} />
        ))}
        {named && <Text x={first} y={y + 14} size={19} anchor="start">node</Text>}
        {named && <Text x={narrow ? Math.max(open - 20, first + 62) : open} y={y + 14} size={19} color={NET} anchor={narrow ? 'start' : 'end'}>antinode</Text>}
      </g>,
    );
  }

  const inView = (x: number) => f.X(x) >= f.left + 26 && f.X(x) <= f.right - 26;
  const squeezed = state.crests.filter(inView);
  const spread = state.troughs.filter(inView);

  // The wavelength: from the middle of one compression to the middle of the next.
  if (parts.wavelength > 0 && squeezed.length >= 2) {
    const [a, b] = squeezed.slice(pairFrom(squeezed, 0, f, lane));
    const y = top - 22;
    out.push(
      <g key="wavelength" opacity={parts.wavelength}>
        <line x1={f.X(a)} y1={y - 9} x2={f.X(a)} y2={top - 6} stroke={INK} strokeWidth={2} opacity={0.6} />
        <line x1={f.X(b)} y1={y - 9} x2={f.X(b)} y2={top - 6} stroke={INK} strokeWidth={2} opacity={0.6} />
        <Measure x1={f.X(a)} y1={y} x2={f.X(b)} y2={y} color={INK} />
        <Text x={(f.X(a) + f.X(b)) / 2} y={y - 20} size={20}>{el.values === false ? 'wavelength' : `wavelength ${fine(b - a)} m`}</Text>
      </g>,
    );
  }

  // The names of the crowded and the spread-out places, under the tube.
  if (parts.labels > 0) {
    const c = squeezed[1] ?? squeezed[0];
    const r = spread.find((x) => c === undefined || x > c) ?? spread[0];
    const y = top + tubeH + 12;
    out.push(
      <g key="labels" opacity={parts.labels}>
        {c !== undefined && (
          <>
            <line x1={f.X(c)} y1={y - 4} x2={f.X(c)} y2={y + 10} stroke={INK2} strokeWidth={2} />
            <Text x={f.X(c)} y={y + 26} size={20} color={INK2}>compression</Text>
          </>
        )}
        {r !== undefined && (
          <>
            <line x1={f.X(r)} y1={y - 4} x2={f.X(r)} y2={y + 36} stroke={INK2} strokeWidth={2} />
            <Text x={f.X(r)} y={y + 52} size={20} color={INK2}>rarefaction</Text>
          </>
        )}
      </g>,
    );
  }

  // One marked particle, and the short line it keeps to.
  if (parts.particle > 0) {
    const y = top + gap * (Math.floor(rows / 2) + 0.5);
    const x = f.X(mark);
    out.push(
      <g key="particle" opacity={parts.particle}>
        <line x1={x - swing - 8} y1={y} x2={x + swing + 8} y2={y} stroke="#fff" strokeWidth={2} strokeDasharray="5 6" opacity={0.75} />
        <circle cx={x + state.at(mark) * scale} cy={y} r={9} fill="#fff" stroke={color} strokeWidth={4} />
        {el.markLabel && <Text x={x} y={top + tubeH + 26} size={19}>{el.markLabel}</Text>}
      </g>,
    );
  }
  if (parts.count > 0) out.push(<Post key="count" f={f} x={f.X(mark)} y1={top - 34} y2={top + tubeH + 8} passed={passed} opacity={parts.count} />);
  if (parts.front > 0) out.push(<Front key="front" el={el} lane={lane} state={state} f={f} y1={top - 34} y2={top + tubeH + 8} opacity={parts.front} />);
  // A wall at the far end, when the wave bounces back from it.
  if (lane.reflect) out.push(<rect key="wall" x={f.right + 6} y={top - 16} width={14} height={tubeH + 32} rx={3} fill={INK3} />);
  return <>{out}</>;
}

export function WaveView({ el, st, w, h, plays }: { el: WaveEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = waveAt(el, plays ?? st?.plays ?? []);
  const part = (name: string) => ownPart(st, name);
  const ruler = el.ruler !== false;
  const top = 46;
  const foot = ruler ? 46 : 4;
  const left = 64;
  const right = w - 26;
  const laneH = (h - top - foot) / el.lanes.length;
  const X = (x: number) => left + ((x - el.span[0]) / (el.span[1] - el.span[0])) * (right - left);
  const f: Frame = { X, left, right, top, laneH, w };
  const mark = el.mark ?? (el.span[0] + el.span[1]) / 2;
  const parts: Parts = { particle: part('particle'), amplitude: part('amplitude'), wavelength: part('wavelength'), count: part('count'), speed: part('speed'), labels: part('labels'), frequency: part('frequency'), front: part('front'), pulses: part('pulses'), sum: part('sum'), heights: part('heights'), pull: part('pull'), motion: part('motion'), nodes: part('nodes'), loop: part('loop'), length: part('length') };
  const out: ReactElement[] = [];

  el.lanes.forEach((lane, i) => {
    const yTop = top + i * laneH;
    const y0 = yTop + laneH / 2 + 10;
    const color = TONES[lane.tone ?? LANE_TONES[i % LANE_TONES.length]];
    const glow = st?.focus[lane.id] ?? 0;
    const s = state.lanes[lane.id];
    const View = lane.kind === 'longitudinal' ? Tube : Rope;
    out.push(
      <g key={lane.id}>
        <View el={el} lane={lane} state={s} f={f} y0={y0} color={color} glow={glow} parts={parts} mark={mark} passed={state.passed[lane.id]} />
        {lane.label && (
          <Text x={0} y={yTop + 14} anchor="start" size={20} color={color}>
            {lane.label}
          </Text>
        )}
        {parts.speed > 0 && s.join === undefined && (
          <g opacity={parts.speed}>
            <Arrow x={w - 196} y={yTop + 14} len={58} color={VELOCITY} weight={6} />
            <Text x={w - 126} y={yTop + 14} anchor="start" size={20} color={VELOCITY}>{`${short(s.speed)} m/s`}</Text>
          </g>
        )}
        {/* With a second medium, the speed in each is written over its own stretch of the strip. */}
        {parts.speed > 0 &&
          s.join !== undefined &&
          [
            [(left + X(s.join)) / 2, s.speed],
            [(X(s.join) + right) / 2, s.speed2 ?? s.speed],
          ].map(([x, v], k) => (
            <g key={k} opacity={parts.speed}>
              <Arrow x={x - 70} y={yTop + 14} len={Math.max(26, Math.min(58, 6 * v))} color={VELOCITY} weight={6} />
              <Text x={x} y={yTop + 14} anchor="start" size={20} color={VELOCITY}>{`${short(v)} m/s`}</Text>
            </g>
          ))}
        {parts.frequency > 0 && (
          <Text x={left - 6} y={yTop + laneH - 8} anchor="middle" size={19} color={color} opacity={parts.frequency}>{`${short(s.frequency)} Hz`}</Text>
        )}
      </g>,
    );
  });

  // A ruler of the distance from the left end of the strip.
  if (ruler) {
    const y = h - foot + 12;
    const step = rulerStep(el.span[1] - el.span[0]);
    const ticks: number[] = [];
    for (let k = Math.ceil(el.span[0] / step - 1e-9); k * step <= el.span[1] + 1e-9; k++) ticks.push(Math.round(k * step * 1000) / 1000);
    out.push(
      <g key="ruler">
        <line x1={left} y1={y} x2={right} y2={y} stroke={INK3} strokeWidth={2} />
        {ticks.map((t, i) => (
          <g key={t}>
            <line x1={X(t)} y1={y} x2={X(t)} y2={y + 8} stroke={INK3} strokeWidth={2} />
            <text x={X(t)} y={y + 25} fill={INK3} fontSize={16} textAnchor="middle" style={{ fontFamily: FONT }}>
              {i === ticks.length - 1 ? `${t} m` : t}
            </text>
          </g>
        ))}
      </g>,
    );
  }

  const clock = part('clock');
  if (clock > 0) out.push(<Clock key="clock" w={w} time={state.time / (el.clock?.seconds ?? 1)} unit={el.clock?.unit ?? 's'} opacity={clock} />);
  if (state.note)
    out.push(
      <g key="note">
        <rect x={w / 2 - 120} y={0} width={240} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={w / 2} y={19.5} size={19} color="#fff">
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
