/**
 * A circuit for the physics videos (src/video/circuit.ts works out its currents and voltages): a
 * battery on the left, a switch, and lamps or resistors along the top of one loop (series) or on
 * rungs between two rails (parallel), with at most one more on the wire that leads to the rungs. A
 * battery with an internal resistance has it drawn inside its case. Charges are drawn all along the wires and move with the
 * current where they are, so they speed up when the current rises and split at a junction. A lamp
 * glows with the power it gets. Meters and readings are added as parts.
 */
import type { ReactElement } from 'react';
import type { CircuitEl, CircuitPart } from '../script.ts';
import { brightest, circuitAt, circuitParts, type PartState } from '../circuit.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Arrow, clamp01, Clock, INK2, Text } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** Charge and current are yellow, electrons blue, voltage pink and power orange in every circuit. */
const CHARGE = TONES.theta;
const ELECTRON = TONES.adj;
const VOLTAGE = TONES.hyp;
const POWER = TONES.opp;
const BACK = '#17143c';
/** The colour of a charge that has given up its energy. */
const SPENT: [number, number, number] = [96, 108, 170];
const FULL: [number, number, number] = [255, 209, 102];
/** How far apart the charges are drawn along a wire, in pixels. */
const SPACING = 34;

type Pt = [number, number];

/** A reading: a whole number as it is, otherwise two decimals under ten and one from ten up. `steady` keeps one decimal, for a number that is counting up. */
const reading = (n: number, unit: string, steady = false) => `${steady ? n.toFixed(1) : Number(n.toFixed(Math.abs(n) < 9.995 ? 2 : 1))} ${unit}`;
const ohms = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(1)} Ω`;

/** The point a distance along a line through points, and the line's length. */
function along(points: Pt[], s: number): Pt {
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i - 1];
    const [x2, y2] = points[i];
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (s <= len || i === points.length - 1) return [x1 + ((x2 - x1) * s) / len, y1 + ((y2 - y1) * s) / len];
    s -= len;
  }
  return points[0];
}
const lengthOf = (points: Pt[]) => points.slice(1).reduce((n, p, i) => n + Math.hypot(p[0] - points[i][0], p[1] - points[i][1]), 0);

/** A stretch of wire with the charge that has flowed along it and how much energy its charges still carry (0 to 1) at each distance. */
interface Wire {
  key: string;
  points: Pt[];
  /** Coulombs that have passed along it, in the direction of its points. */
  flow: number;
  energy: (s: number) => number;
  /** Charges are drawn this far apart; a closed loop sets it so that they meet up. */
  spacing?: number;
  /** The whole length the charges go round, when it is longer than the wire drawn (the gap inside the battery). */
  round?: number;
}

export function CircuitView({ el, st, w, h, plays }: { el: CircuitEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = circuitAt(el, plays ?? st?.plays ?? []);
  const part = (name: string) => ownPart(st, name);
  const charges = part('charges');
  const energy = part('energy');
  const arrows = part('arrows');
  const current = part('current');
  const voltage = part('voltage');
  const power = part('power');
  const counted = part('charge');
  const clock = part('clock');
  const transferred = part('transferred');
  const terminal = part('terminal');
  const lost = part('lost');
  const inside = el.internal !== undefined;
  const lead = el.layout === 'parallel' ? el.lead : undefined;
  const series = el.layout === 'series';
  const electrons = el.carriers === 'electrons';
  const pace = el.pace ?? 40;
  const top = 46;
  // The names beside a battery with an internal resistance need more room on its left.
  const margin = w < 800 ? (inside ? 150 : 84) : 170;
  const x0 = margin;
  const x1 = w - margin;
  const y0 = top + 62;
  const y1 = h - 54;
  const yb = (y0 + y1) / 2;
  const n = el.parts.length;
  const out: ReactElement[] = [];
  const full = el.bright ?? (brightest(el) || 1);

  // Where the components are, and the wires between them.
  const wires: Wire[] = [];
  // A component lies along the wire in a loop and on the wire that leads to the branches, and stands upright on a rung.
  const places: Array<{ part: CircuitPart; x: number; y: number; flat: boolean }> = [];
  // How much of the supply's energy a charge still carries: all of it less the volts lost inside the battery, as it leaves.
  const level = (volts: number) => (state.volts > 0 ? clamp01(volts / state.volts) : 1);
  let switchAt: Pt;
  if (series) {
    el.parts.forEach((cp, k) => places.push({ part: cp, x: x0 + ((k + 1) * (x1 - x0)) / (n + 1), y: y0, flat: true }));
    const loop: Pt[] = [[x0, yb - 12], [x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, yb + 12]];
    const round = lengthOf(loop) + 24;
    // Each charge has given up the voltages of the components it has passed.
    const passed = places.map((c) => yb - 12 - y0 + (c.x - x0));
    wires.push({
      key: 'loop',
      points: loop,
      flow: state.charge,
      round,
      spacing: round / Math.round(round / SPACING),
      energy: (s) => (state.volts > 0 ? clamp01(1 - (state.lost + places.reduce((sum, c, k) => sum + (s > passed[k] ? state.parts[c.part.id].volts : 0), 0)) / state.volts) : 0),
    });
    switchAt = [(x0 + x1) / 2, y1];
  } else {
    const first = x0 + Math.min(300, (x1 - x0) * 0.42);
    el.parts.forEach((cp, k) => places.push({ part: cp, x: n === 1 ? x1 : first + (k * (x1 - first)) / (n - 1), y: yb, flat: false }));
    const xs = places.map((c) => c.x);
    // The component in series with the branches, between the supply's ammeter and the first junction.
    const leadX = x0 + 79 + (xs[0] - x0 - 79) / 2;
    const atTop = level(state.terminal);
    const atGroup = lead ? level(state.terminal - state.parts[lead.id].volts) : atTop;
    // From the first junction back through the battery and out to the first junction again.
    wires.push({ key: 'back', points: [[xs[0], y1], [x0, y1], [x0, yb + 12]], flow: state.charge, energy: () => 0 });
    wires.push({ key: 'out', points: [[x0, yb - 12], [x0, y0], [xs[0], y0]], flow: state.charge, energy: (s) => (lead && s > yb - 12 - y0 + (leadX - x0) ? atGroup : atTop) });
    places.forEach((c, k) => {
      wires.push({ key: `rung${k}`, points: [[c.x, y0], [c.x, y1]], flow: state.parts[c.part.id].charge, energy: (s) => (s < yb - y0 ? atGroup : 0) });
      if (k + 1 < n) {
        // The rails beyond a junction carry what the branches further on take.
        const beyond = places.slice(k + 1).reduce((sum, d) => sum + state.parts[d.part.id].charge, 0);
        wires.push({ key: `top${k}`, points: [[c.x, y0], [xs[k + 1], y0]], flow: beyond, energy: () => atGroup });
        wires.push({ key: `foot${k}`, points: [[xs[k + 1], y1], [c.x, y1]], flow: beyond, energy: () => 0 });
      }
    });
    if (lead) places.unshift({ part: lead, x: leadX, y: y0, flat: true });
    switchAt = [(x0 + xs[0]) / 2, y1];
  }

  // The wires.
  for (const wire of wires) out.push(<polyline key={`w-${wire.key}`} points={wire.points.map((q) => q.join(',')).join(' ')} fill="none" stroke={INK2} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" opacity={0.85} />);

  // The charges on them: each has moved on by the charge that has flowed past, the other way for electrons.
  if (charges > 0) {
    const dots: ReactElement[] = [];
    for (const wire of wires) {
      const len = lengthOf(wire.points);
      const d = wire.spacing ?? SPACING;
      const round = wire.round ?? len;
      const shift = (((electrons ? -1 : 1) * wire.flow * pace) % (wire.round ? round : d)) + (wire.round ? round : d);
      for (let k = 0; k * d < round + d; k++) {
        const s = wire.round ? (k * d + shift) % round : (shift % d) + k * d;
        if (s > len || (wire.round && k * d >= round - 1e-6)) continue;
        const [x, y] = along(wire.points, s);
        const e = wire.energy(s);
        const mix = (i: number) => Math.round(FULL[i] + (SPENT[i] + (FULL[i] - SPENT[i]) * e - FULL[i]) * energy);
        dots.push(<circle key={`${wire.key}-${k}`} cx={x.toFixed(1)} cy={y.toFixed(1)} r={5.5} fill={electrons ? ELECTRON : `rgb(${mix(0)} ${mix(1)} ${mix(2)})`} stroke={BACK} strokeWidth={1.5} />);
      }
    }
    out.push(<g key="charges" opacity={charges}>{dots}</g>);
  }

  // The battery: the long plate is the positive terminal, at the top. An internal resistance is a
  // small resistor on the wire above the plates, inside a dashed case with them; beside it are its
  // name, the volts lost across it and the power wasted in it.
  {
    const beside = [
      { text: el.internalLabel ?? `r = ${ohms(el.internal ?? 0)}`, color: INK, opacity: 1 },
      { text: `${reading(state.lost, 'V')} lost`, color: VOLTAGE, opacity: lost },
      { text: reading(state.current * state.lost, 'W'), color: POWER, opacity: power },
    ].filter((l) => inside && l.opacity > 0);
    out.push(
      <g key="battery">
        <rect x={x0 - 26} y={yb - 16} width={52} height={32} fill="rgb(13 12 36)" />
        <line x1={x0 - 24} y1={yb - 10} x2={x0 + 24} y2={yb - 10} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <line x1={x0 - 12} y1={yb + 10} x2={x0 + 12} y2={yb + 10} stroke={INK} strokeWidth={8} strokeLinecap="round" />
        {inside && <rect x={x0 - 11} y={yb - 68} width={22} height={36} rx={3} fill={BACK} stroke={INK} strokeWidth={3} />}
        {inside && <rect x={x0 - 30} y={yb - 80} width={60} height={110} rx={10} fill="none" stroke={INK3} strokeWidth={2} strokeDasharray="6 6" />}
        <Text x={x0 + (inside ? 46 : 38)} y={yb - 24} size={22} color={INK2}>+</Text>
        <Text x={x0 + (inside ? 46 : 38)} y={yb + 24} size={22} color={INK2}>−</Text>
        <Text x={x0 - (inside ? 42 : 38)} y={yb + (inside ? 4 : 0)} anchor="end" size={22} color={VOLTAGE}>{`${inside ? 'ε = ' : ''}${reading(state.volts, 'V')}`}</Text>
        {beside.map((l, k) => (
          <Text key={k} x={x0 - 42} y={yb - 50 - 26 * (beside.length - 1 - k)} anchor="end" size={21} color={l.color} opacity={l.opacity}>{l.text}</Text>
        ))}
      </g>,
    );
  }

  // A voltmeter across the battery's terminals, joined inside the circuit.
  if (terminal > 0) {
    const [ya, yz, xm] = [yb - 90, yb + 42, x0 + 86];
    out.push(
      <g key="terminal" opacity={terminal}>
        <polyline points={`${x0},${ya} ${xm},${ya} ${xm},${yz} ${x0},${yz}`} fill="none" stroke={VOLTAGE} strokeWidth={2.5} strokeLinejoin="round" opacity={0.75} />
        <circle cx={x0} cy={ya} r={4.5} fill={VOLTAGE} />
        <circle cx={x0} cy={yz} r={4.5} fill={VOLTAGE} />
        <circle cx={xm} cy={yb} r={17} fill={BACK} stroke={VOLTAGE} strokeWidth={3} />
        <Text x={xm} y={yb + 0.5} size={18} color={VOLTAGE}>V</Text>
        <Text x={xm + 26} y={yb} anchor="start" size={21} color={VOLTAGE}>{reading(state.terminal, 'V')}</Text>
      </g>,
    );
  }

  // The switch: its arm lies along the wire when it is closed.
  {
    const [sx, sy] = switchAt;
    out.push(
      <g key="switch">
        <rect x={sx - 30} y={sy - 6} width={60} height={12} fill="rgb(13 12 36)" />
        <line x1={sx - 30} y1={sy} x2={sx + 28 * (state.closed ? 1 : 0.82)} y2={sy - (state.closed ? 0 : 26)} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <circle cx={sx - 30} cy={sy} r={5} fill={INK} />
        <circle cx={sx + 30} cy={sy} r={5} fill={INK} />
        <Text x={sx} y={sy + 26} size={18} color={INK3}>{state.closed ? 'switch closed' : 'switch open'}</Text>
      </g>,
    );
  }

  // The components, each with what is written beside it.
  for (const { part: cp, x, y, flat } of places) {
    const s: PartState = state.parts[cp.id];
    const glow = st?.focus[cp.id] ?? 0;
    // The eye does not follow power in proportion: a lamp at a quarter of its power is drawn half as bright, so it is dim but still alight.
    const lit = cp.kind === 'lamp' ? Math.sqrt(clamp01(s.power / full)) : 0;
    const body =
      cp.kind === 'lamp' ? (
        <g>
          {lit > 0.01 && <circle cx={x} cy={y} r={26 + 34 * lit} fill={CHARGE} opacity={0.28 * lit} style={{ filter: 'blur(10px)' }} />}
          <circle cx={x} cy={y} r={26} fill={BACK} stroke={INK} strokeWidth={3.5} />
          <circle cx={x} cy={y} r={24} fill={CHARGE} opacity={0.92 * lit} />
          {s.broken ? (
            <path d={`M${x - 15},${y + 10} L${x - 4},${y - 6} M${x + 4},${y + 6} L${x + 15},${y - 10}`} stroke={TONES.bad} strokeWidth={3.5} strokeLinecap="round" fill="none" />
          ) : (
            <path d={`M${x - 17},${y - 17} L${x + 17},${y + 17} M${x - 17},${y + 17} L${x + 17},${y - 17}`} stroke={lit > 0.5 ? BACK : INK} strokeWidth={3} strokeLinecap="round" opacity={0.85} />
          )}
        </g>
      ) : (
        <rect x={x - (flat ? 44 : 17)} y={y - (flat ? 17 : 44)} width={flat ? 88 : 34} height={flat ? 34 : 88} rx={4} fill={BACK} stroke={s.broken ? TONES.bad : INK} strokeWidth={3.5} />
      );
    // Beside it: its name, then the voltage across it and its power. Under a component in a loop, to the right of one on a rung.
    // In a loop the voltage is read by a voltmeter joined across the component, in parallel with it.
    const lines: Array<{ text: string; color: string; opacity: number }> = [
      { text: cp.label ?? ohms(s.ohms), color: INK, opacity: 1 },
      { text: reading(s.volts, 'V'), color: VOLTAGE, opacity: voltage },
      { text: reading(s.power, 'W'), color: POWER, opacity: power },
    ].filter((l) => l.opacity > 0);
    const metered = series && voltage > 0;
    const reach = Math.min(62, (x1 - x0) / (n + 1) / 2 - 8);
    out.push(
      <g key={`part-${cp.id}`} style={glow > 0 ? { filter: `drop-shadow(0 0 ${14 * glow}px #fff)` } : undefined}>
        {metered && (
          <g opacity={voltage}>
            <polyline points={`${x - reach},${y} ${x - reach},${y + 62} ${x + reach},${y + 62} ${x + reach},${y}`} fill="none" stroke={VOLTAGE} strokeWidth={2.5} strokeLinejoin="round" opacity={0.75} />
            <circle cx={x - reach} cy={y} r={4.5} fill={VOLTAGE} />
            <circle cx={x + reach} cy={y} r={4.5} fill={VOLTAGE} />
            <circle cx={x} cy={y + 62} r={17} fill={BACK} stroke={VOLTAGE} strokeWidth={3} />
            <Text x={x} y={y + 62.5} size={18} color={VOLTAGE}>V</Text>
          </g>
        )}
        {body}
        {lines.map((l, k) =>
          flat ? (
            <Text key={k} x={x} y={k === 0 ? y - 46 : y + (metered ? 70 : 24) + 26 * k} size={21} color={l.color} opacity={l.opacity}>{l.text}</Text>
          ) : (
            <Text key={k} x={x + 40} y={y + 26 * (k - (lines.length - 1) / 2)} anchor="start" size={21} color={l.color} opacity={l.opacity}>{l.text}</Text>
          ),
        )}
      </g>,
    );
  }

  // Ammeters: in the loop on both sides of the components, or in the supply wire and on every branch.
  if (current > 0) {
    const meter = (key: string, x: number, y: number, amps: number, tx: number, ty: number, anchor: 'start' | 'middle' | 'end') => (
      <g key={key} opacity={current}>
        <circle cx={x} cy={y} r={17} fill={BACK} stroke={CHARGE} strokeWidth={3} />
        <Text x={x} y={y + 0.5} size={18} color={CHARGE}>A</Text>
        <Text x={tx} y={ty} size={21} color={CHARGE} anchor={anchor}>{reading(amps, 'A')}</Text>
      </g>
    );
    if (series) {
      out.push(meter('a-out', x0 + 52, y0, state.current, x0 + 52, y0 - 34, 'middle'));
      out.push(meter('a-back', x1 - 52, y1, state.current, x1 - 52, y1 + 36, 'middle'));
    } else {
      out.push(meter('a-out', x0 + 62, y0, state.current, x0 + 62, y0 - 34, 'middle'));
      for (const c of places.filter((d) => !d.flat)) out.push(meter(`a-${c.part.id}`, c.x, y0 + 46, state.parts[c.part.id].current, c.x + 28, y0 + 46, 'start'));
    }
  }

  // Which way conventional current runs: arrows beside the wires, inside the loop, and its name. The electrons' arrows point the other way.
  if (arrows > 0) {
    const [sx] = switchAt;
    const firstX = Math.min(...places.filter((c) => series || !c.flat).map((c) => c.x));
    const room = (series ? firstX - 50 : firstX) - x0;
    const mid = x0 + (series ? room / 2 : (room + 50) / 2);
    const row = (key: string, inset: number, way: 1 | -1, color: string) => (
      <g key={key}>
        {room >= 150 && <Arrow x={mid - 34 * way} y={y0 + inset} len={68 * way} color={color} weight={6} />}
        <Arrow x={(x0 + sx) / 2 - 10 + 30 * way} y={y1 - inset} len={-60 * way} color={color} weight={6} />
      </g>
    );
    // The name goes in the open middle of a loop, or between the battery and the first branch.
    const tx = series ? w / 2 : (x0 + 56 + firstX - 34) / 2;
    const names = series ? [['conventional current'], ['electrons drift the other way']] : [['conventional', 'current'], ['electrons drift', 'the other way']];
    const lines = [...names[0].map((t) => ({ t, c: CHARGE })), ...(electrons ? names[1].map((t) => ({ t, c: ELECTRON })) : [])];
    out.push(
      <g key="arrows" opacity={arrows}>
        {row('conventional', 28, 1, CHARGE)}
        {electrons && row('electrons', 54, -1, ELECTRON)}
        {lines.map((l, k) => (
          <Text key={k} x={tx} y={yb + (series ? 34 : 0) + 28 * (k - (lines.length - 1) / 2)} size={21} color={l.c}>{l.t}</Text>
        ))}
      </g>,
    );
  }

  if (counted > 0) out.push(<Text key="counted" x={8} y={h - 16} anchor="start" size={22} color={CHARGE} opacity={counted}>{`Charge passed: ${reading(state.charge, 'C', true)}`}</Text>);
  if (transferred > 0) {
    const joules = circuitParts(el).reduce((sum, cp) => sum + state.parts[cp.id].energy, 0);
    out.push(<Text key="transferred" x={8} y={20} anchor="start" size={22} color={POWER} opacity={transferred}>{`Energy transferred: ${Math.round(joules)} J`}</Text>);
  }
  if (clock > 0) out.push(<Clock key="clock" w={w} time={state.time} opacity={clock} />);
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
