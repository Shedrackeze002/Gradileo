import { describe, expect, it } from 'vitest';
import { checkCircuit, checkScript, type CircuitEl, type Explainer } from './script.ts';
import { brightest, circuitAt } from './circuit.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

// A 12 V supply with 2 Ω and 4 Ω in one loop: 2 A, 4 V and 8 V.
const loop = (over: Partial<CircuitEl> = {}): CircuitEl => ({
  kind: 'circuit',
  id: 'c',
  volts: 12,
  layout: 'series',
  parts: [
    { id: 'a', kind: 'lamp', ohms: 2 },
    { id: 'b', kind: 'lamp', ohms: 4 },
  ],
  clips: { run: { phases: [{ dur: 5 }] }, cut: { phases: [{ dur: 2 }, { dur: 2, set: { broken: ['a'] } }] } },
  ...over,
});
// The same supply with 4 Ω and 6 Ω on branches: 3 A and 2 A, 5 A from the supply.
const branches = (over: Partial<CircuitEl> = {}): CircuitEl => ({
  kind: 'circuit',
  id: 'c',
  volts: 12,
  layout: 'parallel',
  parts: [
    { id: 'a', kind: 'lamp', ohms: 4 },
    { id: 'b', kind: 'lamp', ohms: 6 },
  ],
  clips: { run: { phases: [{ dur: 4 }] }, cut: { phases: [{ dur: 2 }, { dur: 2, set: { broken: ['a'] } }] } },
  ...over,
});

describe('circuit: one loop', () => {
  it('adds the resistances, and shares the voltage in proportion to them', () => {
    const s = circuitAt(loop());
    expect(s.resistance).toBe(6);
    expect(s.current).toBeCloseTo(2);
    expect(s.parts.a).toMatchObject({ current: 2, volts: 4, power: 8 });
    expect(s.parts.b).toMatchObject({ current: 2, volts: 8, power: 16 });
    expect(s.parts.a.volts + s.parts.b.volts).toBeCloseTo(s.volts);
  });

  it('has the same current everywhere: the same charge passes every component', () => {
    const s = circuitAt(loop(), [['run', 5]]);
    expect(s.time).toBe(5);
    // Q = It: 2 A for 5 s is 10 C.
    expect(s.charge).toBeCloseTo(10);
    expect(s.parts.a.charge).toBeCloseTo(10);
    expect(s.parts.b.charge).toBeCloseTo(10);
  });

  it('transfers energy at the rate P = IV, so E = Pt', () => {
    const s = circuitAt(loop(), [['run', 5]]);
    expect(s.parts.a.energy).toBeCloseTo(8 * 5);
    expect(s.parts.b.energy).toBeCloseTo(16 * 5);
    // Each coulomb gives up the voltage across the component in joules: V = E / Q.
    expect(s.parts.b.energy / s.parts.b.charge).toBeCloseTo(8);
  });

  it('carries no current while the switch is open', () => {
    const el = loop({ open: true, clips: { on: { phases: [{ dur: 1 }, { dur: 3, set: { closed: true } }] } } });
    expect(circuitAt(el)).toMatchObject({ closed: false, current: 0, charge: 0 });
    expect(circuitAt(el).parts.a.volts).toBe(0);
    expect(circuitAt(el, [['on', 1]]).charge).toBe(0);
    const s = circuitAt(el, [['on', 4]]);
    expect(s.closed).toBe(true);
    expect(s.charge).toBeCloseTo(6);
  });

  it('stops everywhere when one component breaks, with the supply voltage across the break', () => {
    const s = circuitAt(loop(), [['cut', 4]]);
    expect(s.current).toBe(0);
    expect(s.resistance).toBe(Number.POSITIVE_INFINITY);
    expect(s.parts.a).toMatchObject({ broken: true, current: 0, volts: 12, power: 0 });
    expect(s.parts.b).toMatchObject({ broken: false, current: 0, volts: 0, power: 0 });
    // Charge flowed only for the two seconds before the break.
    expect(s.charge).toBeCloseTo(4);
  });

  it('follows a change of resistance or of supply voltage from the phase that makes it', () => {
    const el = loop({ clips: { dim: { phases: [{ dur: 2 }, { dur: 2, set: { ohms: { b: 10 } } }, { dur: 2, set: { volts: 6 } }] } } });
    expect(circuitAt(el, [['dim', 3]]).current).toBeCloseTo(1);
    const s = circuitAt(el, [['dim', 6]]);
    expect(s.volts).toBe(6);
    expect(s.current).toBeCloseTo(0.5);
    expect(s.parts.b.ohms).toBe(10);
    expect(s.charge).toBeCloseTo(2 * 2 + 1 * 2 + 0.5 * 2);
  });

  it('keeps time by the circuit in slow motion, and shows the note of the phase that is playing', () => {
    const el = loop({ clips: { slow: { phases: [{ dur: 2, slow: 3, note: 'Slow motion' }] } } });
    expect(clipSeconds(el, 'slow')).toBe(6);
    const mid = circuitAt(el, [['slow', 3]]);
    expect(mid.time).toBeCloseTo(1);
    expect(mid.charge).toBeCloseTo(2);
    expect(mid.note).toBe('Slow motion');
    expect(circuitAt(el, [['slow', 6]]).note).toBeUndefined();
  });
});

describe('circuit: branches', () => {
  it('puts the full voltage across every branch, and adds the branch currents', () => {
    const s = circuitAt(branches());
    expect(s.parts.a).toMatchObject({ volts: 12, current: 3 });
    expect(s.parts.b).toMatchObject({ volts: 12, current: 2 });
    expect(s.current).toBeCloseTo(5);
    // 1/R = 1/4 + 1/6, so R = 2.4 Ω: less than either branch.
    expect(s.resistance).toBeCloseTo(2.4);
  });

  it('loses no charge at a junction', () => {
    const s = circuitAt(branches(), [['run', 4]]);
    expect(s.charge).toBeCloseTo(20);
    expect(s.parts.a.charge + s.parts.b.charge).toBeCloseTo(s.charge);
  });

  it('keeps the other branch working when one breaks', () => {
    const s = circuitAt(branches(), [['cut', 4]]);
    expect(s.parts.a).toMatchObject({ broken: true, current: 0, power: 0 });
    expect(s.parts.b).toMatchObject({ current: 2, volts: 12 });
    expect(s.current).toBeCloseTo(2);
    expect(s.resistance).toBeCloseTo(6);
  });

  it('gives the textbook totals for equal and unequal pairs', () => {
    const pair = (r1: number, r2: number) => circuitAt(branches({ parts: [{ id: 'a', kind: 'resistor', ohms: r1 }, { id: 'b', kind: 'resistor', ohms: r2 }] })).resistance;
    expect(pair(10, 10)).toBeCloseTo(5);
    expect(pair(6, 3)).toBeCloseTo(2);
    expect(pair(12, 4)).toBeCloseTo(3);
  });
});

// A 12 V supply, 4 Ω, then 6 Ω and 3 Ω on branches: the pair is 2 Ω, so 6 Ω in all and 2 A.
const mixed = (over: Partial<CircuitEl> = {}): CircuitEl => ({
  kind: 'circuit',
  id: 'c',
  volts: 12,
  layout: 'parallel',
  lead: { id: 's', kind: 'resistor', ohms: 4 },
  parts: [
    { id: 'a', kind: 'resistor', ohms: 6 },
    { id: 'b', kind: 'resistor', ohms: 3 },
  ],
  clips: { run: { phases: [{ dur: 3 }] } },
  ...over,
});

describe('circuit: a component in series with the branches', () => {
  it('takes its share of the voltage first, and leaves the rest across every branch', () => {
    const s = circuitAt(mixed());
    expect(s.resistance).toBeCloseTo(6, 9);
    expect(s.current).toBeCloseTo(2, 9);
    expect(s.parts.s.volts).toBeCloseTo(8, 9);
    expect(s.parts.a.volts).toBeCloseTo(4, 9);
    expect(s.parts.b.volts).toBeCloseTo(4, 9);
    expect(s.parts.a.current).toBeCloseTo(4 / 6, 9);
    expect(s.parts.b.current).toBeCloseTo(4 / 3, 9);
    expect(s.parts.s.current).toBeCloseTo(s.parts.a.current + s.parts.b.current, 9);
  });

  it('shares the power of the battery between all three', () => {
    const s = circuitAt(mixed());
    expect(s.parts.s.power).toBeCloseTo(16, 9);
    expect(s.parts.s.power + s.parts.a.power + s.parts.b.power).toBeCloseTo(12 * 2, 9);
    const later = circuitAt(mixed(), [['run', 3]]);
    expect(later.parts.s.charge).toBeCloseTo(6, 9);
    expect(later.parts.s.energy + later.parts.a.energy + later.parts.b.energy).toBeCloseTo(72, 9);
  });

  it('stops everything when the series component breaks, with the supply voltage across it', () => {
    const s = circuitAt(mixed({ clips: { cut: { phases: [{ dur: 1, set: { broken: ['s'] } }] } } }), [['cut', 1]]);
    expect(s.current).toBe(0);
    expect(s.parts.s.volts).toBe(12);
    expect(s.parts.a.volts).toBe(0);
    expect(s.resistance).toBe(Number.POSITIVE_INFINITY);
  });

  it('belongs to a parallel layout only', () => {
    expect(checkCircuit(mixed())).toEqual([]);
    expect(checkCircuit(mixed({ layout: 'series' }))[0]).toMatch(/only a parallel layout/);
    expect(checkCircuit(mixed({ lead: { id: 'a', kind: 'resistor', ohms: 4 } }))[0]).toMatch(/used twice/);
    expect(checkCircuit(mixed({ clips: { x: { phases: [{ dur: 1, set: { ohms: { s: 2 } } }] } } }))).toEqual([]);
  });
});

describe('circuit: a battery with an internal resistance', () => {
  // An emf of 12 V and 0.5 Ω inside, driving 5.5 Ω: 2 A, 1 V lost and 11 V at the terminals.
  const cell = (over: Partial<CircuitEl> = {}): CircuitEl => loop({ internal: 0.5, parts: [{ id: 'a', kind: 'resistor', ohms: 5.5 }], clips: {}, ...over });

  it('loses Ir inside the battery, so the terminals have the emf less the lost volts', () => {
    const s = circuitAt(cell());
    expect(s.current).toBeCloseTo(2, 9);
    expect(s.lost).toBeCloseTo(1, 9);
    expect(s.terminal).toBeCloseTo(11, 9);
    expect(s.parts.a.volts).toBeCloseTo(11, 9);
    expect(s.resistance).toBeCloseTo(5.5, 9);
  });

  it('reads the emf at the terminals while no current flows', () => {
    const s = circuitAt(cell({ open: true }));
    expect(s.current).toBe(0);
    expect(s.lost).toBe(0);
    expect(s.terminal).toBe(12);
  });

  it('loses more volts when a second branch draws more current', () => {
    const car = branches({ internal: 0.5, parts: [{ id: 'a', kind: 'lamp', ohms: 5.5 }, { id: 'b', kind: 'resistor', ohms: 1e9 }], clips: { start: { phases: [{ dur: 1, set: { ohms: { b: 0.6875 } } }] } } });
    expect(circuitAt(car).terminal).toBeCloseTo(11, 6);
    const s = circuitAt(car, [['start', 1]]);
    expect(s.current).toBeCloseTo(10.8, 9);
    expect(s.terminal).toBeCloseTo(6.6, 9);
    expect(s.parts.a.current).toBeCloseTo(1.2, 9);
  });

  it('has the same terminal voltage as the supply when there is no internal resistance', () => {
    expect(circuitAt(loop()).terminal).toBe(12);
    expect(circuitAt(loop()).lost).toBe(0);
    expect(checkCircuit(cell({ internal: -1 }))[0]).toMatch(/internal resistance/);
  });
});

describe('circuit: lamps', () => {
  it('takes the most power any lamp gets at the start as full brightness', () => {
    expect(brightest(loop())).toBeCloseTo(16);
    expect(brightest(branches())).toBeCloseTo(36);
    // A circuit drawn with its switch open is still measured closed, and resistors do not count.
    expect(brightest(loop({ open: true }))).toBeCloseTo(16);
    expect(brightest(loop({ parts: [{ id: 'a', kind: 'resistor', ohms: 2 }, { id: 'b', kind: 'resistor', ohms: 4 }] }))).toBe(0);
  });
});

describe('circuit: scripts', () => {
  it('reports what cannot be solved or changed', () => {
    expect(checkCircuit(loop())).toEqual([]);
    expect(checkCircuit(branches())).toEqual([]);
    expect(checkCircuit(loop({ parts: [], clips: {} }))).toHaveLength(1);
    expect(checkCircuit(loop({ parts: [{ id: 'a', kind: 'lamp', ohms: 0 }] }))[0]).toMatch(/resistance above zero/);
    expect(checkCircuit(loop({ parts: [{ id: 'current', kind: 'lamp', ohms: 2 }], clips: {} }))[0]).toMatch(/name of a part/);
    expect(checkCircuit(loop({ clips: { x: { phases: [{ dur: 1, set: { broken: ['z'] } }] } } }))[0]).toMatch(/not a component/);
    expect(checkCircuit(loop({ clips: { x: { phases: [{ dur: 1, set: { ohms: { z: 3 } } }] } } }))[0]).toMatch(/not a component/);
    expect(checkCircuit(loop({ clips: { x: { phases: [] } } }))[0]).toMatch(/no phases/);
  });

  it('plays a clip from a line, and shows or hides its parts', () => {
    const x: Explainer = {
      id: 't',
      lessonId: 't',
      title: 'T',
      summary: 'S',
      scenes: [
        {
          layout: 'center',
          main: [loop()],
          lines: [
            { say: 'Here is a circuit.', show: ['c', 'c.charges'], play: 'c.run' },
            { say: 'Now the readings.', show: 'c.current', focus: 'c.b' },
            { say: 'And without them.', hide: 'c.current' },
          ],
        },
      ],
    };
    expect(checkScript(x)).toEqual([]);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such part.', show: ['c', 'c.volts'] }] }] })[0]).toMatch(/circuit "c" has no part "volts"/);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such clip.', show: 'c', play: 'c.go' }] }] })[0]).toMatch(/circuit "c" has no clip "go"/);
    const tl = compile(x, { '0.0': 2, '0.1': 2, '0.2': 2 });
    // The clip lasts longer than the line that starts it, so the next line waits for it.
    expect(tl.lines[1].start).toBeGreaterThanOrEqual(5);
    const during = stateAt(tl, tl.lines[1].start + 1.5).els.c;
    expect(during.plays).toEqual([['run', 5]]);
    expect(during.parts.charges).toBeCloseTo(1);
    expect(during.parts.current).toBeGreaterThan(0.9);
    expect(during.focus.b).toBeGreaterThan(0);
    const end = stateAt(tl, tl.duration - 0.6).els.c;
    expect(end.p).toBeCloseTo(1);
    expect(end.parts.current ?? 0).toBeLessThan(0.1);
  });
});
