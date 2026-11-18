/**
 * The circuit of a `circuit` element (see CircuitEl in script.ts): a battery, a switch, and
 * components in series (one loop) or in parallel (each on its own branch across the supply).
 * Everything follows from the supply voltage and the resistances by Ohm's law. In series the
 * resistances add, one current flows through every component and each takes a share of the
 * voltage in proportion to its resistance. In parallel every branch has the full voltage across
 * it and the branch currents add up to the current from the supply. A parallel circuit can have
 * one more component in series with the whole group (`lead`), which takes its share of the
 * voltage first, and the battery can have an internal resistance, which is in series with
 * everything and loses some of the emf before the charge leaves the battery. The state also keeps the
 * charge that has passed through each component and the energy it has transferred, so the charges
 * drawn on the wires move with the current and a counter can show Q = It.
 */
import type { CircuitEl, CircuitPart } from './script.ts';

/** Every component of a circuit: the one in series with the branches first, when there is one. */
export const circuitParts = (el: CircuitEl): CircuitPart[] => (el.lead && el.layout === 'parallel' ? [el.lead, ...el.parts] : el.parts);

export interface PartState {
  ohms: number;
  /** A broken component lets no charge through. */
  broken: boolean;
  /** The current through it in amperes, the voltage across it in volts and its power in watts. */
  current: number;
  volts: number;
  power: number;
  /** The charge that has passed through it since the start, in coulombs, and the energy it has transferred, in joules. */
  charge: number;
  energy: number;
}

export interface CircuitState {
  /** Seconds of the circuit's own time played so far. */
  time: number;
  closed: boolean;
  /** The supply voltage now (the emf, for a battery with an internal resistance). */
  volts: number;
  /** The voltage between the battery's terminals: the emf less the volts lost inside it. */
  terminal: number;
  /** The volts lost across the internal resistance. */
  lost: number;
  /** The current from the supply, in amperes. */
  current: number;
  /** The total resistance of the components, in ohms (infinite when no charge can get round). */
  resistance: number;
  /** The charge that has left the supply since the start, in coulombs. */
  charge: number;
  parts: Record<string, PartState>;
  note?: string;
}

interface Setting {
  closed: boolean;
  volts: number;
  ohms: Record<string, number>;
  broken: Set<string>;
}

/** The currents and voltages for a setting of the circuit. */
function solve(el: CircuitEl, s: Setting): { current: number; resistance: number; parts: Record<string, { current: number; volts: number }> } {
  const parts: Record<string, { current: number; volts: number }> = {};
  const inside = el.internal ?? 0;
  if (el.layout === 'series') {
    // One loop: the resistances add, and a break anywhere stops the current everywhere.
    const whole = el.parts.every((p) => !s.broken.has(p.id));
    const resistance = whole ? el.parts.reduce((n, p) => n + s.ohms[p.id], 0) : Number.POSITIVE_INFINITY;
    const current = s.closed && whole ? s.volts / (resistance + inside) : 0;
    for (const p of el.parts) {
      // With the loop broken at one component, the whole supply voltage is across the break.
      const breaks = el.parts.filter((q) => s.broken.has(q.id)).length;
      parts[p.id] = { current, volts: whole ? current * s.ohms[p.id] : s.closed && s.broken.has(p.id) ? s.volts / breaks : 0 };
    }
    return { current, resistance, parts };
  }
  // Branches: each has the same voltage across it, and the currents add. That voltage is what is
  // left of the supply's after the volts lost inside the battery and across a component in series.
  const lead = el.lead;
  const blocked = !!lead && s.broken.has(lead.id);
  const through = (p: CircuitPart) => (s.broken.has(p.id) ? 0 : 1 / s.ohms[p.id]);
  const conductance = el.parts.reduce((n, p) => n + through(p), 0);
  const group = conductance > 0 ? 1 / conductance : Number.POSITIVE_INFINITY;
  const resistance = blocked ? Number.POSITIVE_INFINITY : group + (lead ? s.ohms[lead.id] : 0);
  const drawn = s.closed && Number.isFinite(resistance) ? s.volts / (resistance + inside) : 0;
  const across = s.closed && !blocked ? s.volts - drawn * (inside + (lead ? s.ohms[lead.id] : 0)) : 0;
  let current = 0;
  for (const p of el.parts) {
    const i = across * through(p);
    current += i;
    parts[p.id] = { current: i, volts: across };
  }
  // With the series component broken, the whole supply voltage is across the break.
  if (lead) parts[lead.id] = { current, volts: blocked ? (s.closed ? s.volts : 0) : current * s.ohms[lead.id] };
  return { current, resistance, parts };
}

/**
 * The state of a circuit element after its clips: `plays` lists each clip played so far, in
 * order, with the seconds of video it has run for (a clip not yet finished is the last one).
 */
export function circuitAt(el: CircuitEl, plays: Array<[clip: string, seconds: number]> = []): CircuitState {
  const all = circuitParts(el);
  const setting: Setting = { closed: !el.open, volts: el.volts, ohms: Object.fromEntries(all.map((p) => [p.id, p.ohms])), broken: new Set() };
  const charge: Record<string, number> = Object.fromEntries(all.map((p) => [p.id, 0]));
  const energy: Record<string, number> = Object.fromEntries(all.map((p) => [p.id, 0]));
  let supplied = 0;
  let time = 0;
  let note: string | undefined;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    note = undefined;
    for (const ph of clip.phases) {
      if (left < 0) break;
      // A phase's settings take hold as it starts.
      if (ph.set?.closed !== undefined) setting.closed = ph.set.closed;
      if (ph.set?.volts !== undefined) setting.volts = ph.set.volts;
      for (const [id, ohms] of Object.entries(ph.set?.ohms ?? {})) if (id in setting.ohms) setting.ohms[id] = ohms;
      if (ph.set?.broken) setting.broken = new Set(ph.set.broken);
      const slow = ph.slow ?? 1;
      const video = ph.dur * slow;
      const dt = Math.min(left, video) / slow;
      // Nothing changes within a phase, so the charge and the energy grow steadily through it.
      const now = solve(el, setting);
      supplied += now.current * dt;
      for (const p of all) {
        charge[p.id] += now.parts[p.id].current * dt;
        energy[p.id] += now.parts[p.id].current * now.parts[p.id].volts * dt;
      }
      time += dt;
      // The note of the phase that is playing; it goes when the clip has finished.
      note = left < video ? ph.note : undefined;
      left -= video;
    }
  }
  const now = solve(el, setting);
  const parts: Record<string, PartState> = {};
  for (const p of all) {
    const { current, volts } = now.parts[p.id];
    parts[p.id] = { ohms: setting.ohms[p.id], broken: setting.broken.has(p.id), current, volts, power: current * volts, charge: charge[p.id], energy: energy[p.id] };
  }
  const lost = now.current * (el.internal ?? 0);
  return { time, closed: setting.closed, volts: setting.volts, terminal: setting.volts - lost, lost, current: now.current, resistance: now.resistance, charge: supplied, parts, note };
}

/** The most power any lamp gets with the switch closed and nothing changed: a lamp at this power is fully bright. */
export function brightest(el: CircuitEl): number {
  const all = circuitParts(el);
  const start = solve(el, { closed: true, volts: el.volts, ohms: Object.fromEntries(all.map((p) => [p.id, p.ohms])), broken: new Set() });
  return Math.max(0, ...all.filter((p) => p.kind === 'lamp').map((p) => start.parts[p.id].current * start.parts[p.id].volts));
}
