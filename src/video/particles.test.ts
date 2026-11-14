import { describe, expect, it } from 'vitest';
import { checkParticles, checkScript, type Explainer, type ParticlesEl } from './script.ts';
import { controlsAt, particlesAt, pressureOf, TEMPS } from './particles.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

let n = 0;
/** A fresh element id each time, so no test reuses another's cached run. */
const el = (over: Partial<ParticlesEl> = {}): ParticlesEl => ({ kind: 'particles', id: `p${n++}`, boxes: [{ id: 'b', state: 'gas', n: 12 }], clips: {}, ...over });

const mean = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length;

describe('particles: the states come from the simulation', () => {
  it('keeps a solid in its rows: every particle vibrates near where it started', () => {
    const e = el({ boxes: [{ id: 'b', state: 'solid', n: 30 }] });
    const [a] = particlesAt(e, [], 0);
    const [b] = particlesAt(e, [], 6);
    const moved = a.x.map((x, i) => Math.hypot(b.x[i] - x, b.y[i] - a.y[i]));
    // Nearly all stay within half a particle of their places (one on the surface may roll over).
    expect(moved.filter((d) => d < 0.5).length).toBeGreaterThanOrEqual(28);
    expect(Math.max(...moved)).toBeGreaterThan(0.01);
  });

  it('lets a liquid’s particles wander, but keeps them at the bottom', () => {
    const e = el({ boxes: [{ id: 'b', state: 'liquid', n: 30 }] });
    const [a] = particlesAt(e, [], 0);
    const [b] = particlesAt(e, [], 12);
    const moved = a.x.map((x, i) => Math.hypot(b.x[i] - x, b.y[i] - a.y[i]));
    expect(mean(moved)).toBeGreaterThan(0.6);
    expect(mean(b.y)).toBeLessThan(3);
  });

  it('spreads a gas through its whole box', () => {
    const [f] = particlesAt(el({ boxes: [{ id: 'b', state: 'gas', n: 30 }] }), [], 8);
    expect(Math.max(...f.y)).toBeGreaterThan(7);
    expect(mean(f.y)).toBeGreaterThan(3.5);
    expect(mean(f.y)).toBeLessThan(6.5);
  });

  it('gives the same frames every time, whatever order they are drawn in', () => {
    const e = el();
    const late = particlesAt(e, [], 5);
    particlesAt(e, [], 1);
    expect(particlesAt(e, [], 5)).toEqual(late);
  });

  it('boils a solid when a clip heats it', () => {
    const e = el({ boxes: [{ id: 'b', state: 'solid', n: 30 }], clips: { heat: { phases: [{ dur: 4, heat: { b: 'gas' } }] } } });
    const [f] = particlesAt(e, [['heat', 1]], 14);
    expect(f.temp).toBe(TEMPS.gas);
    expect(Math.max(...f.y)).toBeGreaterThan(6);
  });
});

describe('particles: lids, pistons and the gauge', () => {
  const squeeze = { push: { phases: [{ dur: 4, lid: { b: 0.4 } }] } };

  it('moves a lid steadily to its target over the phase', () => {
    const e = el({ clips: squeeze });
    expect(controlsAt(e, [['push', 2]], 4).lid.b).toBeCloseTo(0.7);
    expect(controlsAt(e, [['push', 2]], 9).lid.b).toBeCloseTo(0.4);
    expect(controlsAt(e, [['push', 2]], 1).lid.b).toBe(1);
  });

  it('squashes a gas, but stops on a liquid', () => {
    const [gas] = particlesAt(el({ boxes: [{ id: 'b', state: 'gas', n: 15 }], clips: squeeze }), [['push', 0]], 6);
    const [liquid] = particlesAt(el({ boxes: [{ id: 'b', state: 'liquid', n: 45, height: 7 }], clips: squeeze }), [['push', 0]], 6);
    expect(gas.lidY).toBeCloseTo(4);
    expect(liquid.lidY).toBeGreaterThan(4.5);
    // No particle is ever left above the lid.
    expect(Math.max(...gas.y)).toBeLessThan(gas.lidY);
  });

  it('reads the pressure from the space under the lid (P × V stays the same)', () => {
    const e = el({ gauge: { box: 'b', start: 100 } });
    const b = e.boxes[0];
    expect(pressureOf(e, b, TEMPS.gas, 1)).toBe(100);
    expect(pressureOf(e, b, TEMPS.gas, 0.5)).toBe(200);
    expect(pressureOf(e, b, TEMPS.gas, 0.25)).toBe(400);
  });

  it('counts more wall hits in a smaller space', () => {
    const e = el({ boxes: [{ id: 'b', state: 'gas', n: 16, width: 14, height: 16 }], clips: { push: { phases: [{ dur: 2, lid: { b: 0.25 } }] } } });
    const before = particlesAt(e, [['push', 10]], 8)[0].hitRate;
    const after = particlesAt(e, [['push', 10]], 20)[0].hitRate;
    expect(after).toBeGreaterThan(2 * before);
  });
});

describe('particles: dividers, baths and expansion', () => {
  it('keeps two gases apart until the divider is lifted, then lets them mix', () => {
    const e = el({ boxes: [{ id: 'b', state: 'gas', kinds: [{ n: 10 }, { n: 10 }], apart: true, divider: 0.5, width: 14, height: 9, temp: 3 }], clips: { lift: { phases: [{ dur: 4, lift: ['b'] }] } } });
    const crossed = (f: ReturnType<typeof particlesAt>[number]) => f.x.filter((x, i) => (f.kind[i] === 0 ? x > 7 : x < 7)).length;
    const [before] = particlesAt(e, [['lift', 6]], 5.9);
    expect(crossed(before)).toBe(0);
    expect(before.divider).toEqual({ x: 7, out: 0 });
    const [after] = particlesAt(e, [['lift', 6]], 16);
    expect(crossed(after)).toBeGreaterThanOrEqual(4);
    expect(after.divider?.out).toBe(1);
  });

  it('conducts heat along a bar heated at one end', () => {
    const e = el({ boxes: [{ id: 'b', state: 'solid', n: 57, cols: 19, width: 22, height: 4, temp: 0.04, bath: 'left', heatColor: [0.04, 0.2] }], clips: { heat: { phases: [{ dur: 1, heat: { b: 0.26 } }, { dur: 10 }] } } });
    const [f] = particlesAt(e, [['heat', 0]], 5);
    const keOf = (lo: number, hi: number) => mean(f.ke!.filter((_, i) => f.x[i] >= lo && f.x[i] < hi));
    // Hot near the flame, cooler further along, and the far end has not yet warmed as much.
    expect(keOf(0, 5)).toBeGreaterThan(keOf(8, 13));
    expect(keOf(8, 13)).toBeGreaterThan(0.06);
    expect(keOf(0, 5)).toBeGreaterThan(keOf(16, 22));
  });

  it('spreads a solid’s particles apart as it is heated, and back as it cools', () => {
    const e = el({ boxes: [{ id: 'b', state: 'solid', n: 39, cols: 13, width: 18, height: 8, temp: 0.03, expand: 0.8 }], clips: { heat: { phases: [{ dur: 6, heat: { b: 0.14 } }] }, cool: { phases: [{ dur: 6, heat: { b: 0.03 } }] } } });
    const width = (t: number) => {
      const [f] = particlesAt(e, [['heat', 0], ['cool', 9]], t);
      return f.span[1] - f.span[0];
    };
    const w0 = width(0);
    expect(width(8)).toBeGreaterThan(w0 * 1.05);
    expect(width(19)).toBeLessThan(w0 * 1.02);
  });

  it('checks dividers and the heat flow', () => {
    expect(checkParticles(el({ boxes: [{ id: 'b', state: 'gas', divider: 0.95 }], clips: { go: { phases: [{ dur: 1, lift: ['b'] }] } } }))).toEqual(['box "b": a divider must be between 0.1 and 0.9 of the way across.']);
    expect(checkParticles(el({ clips: { go: { phases: [{ dur: 1, lift: ['b'] }] } } }))).toEqual(['clip "go", phase 1 lifts a divider that box "b" does not have.']);
    expect(checkParticles(el({ boxes: [{ id: 'a', state: 'gas' }, { id: 'b', state: 'gas' }, { id: 'c', state: 'gas' }], flow: { from: 'a', to: 'c' } }))).toEqual(['the heat flow must join two boxes side by side.']);
  });
});

describe('particles: dissolving', () => {
  const WATER = { n: 44, heavy: 0.2, tone: 'adj' } as const;
  const lump = (id: string, solid: { bond: number; heavy: number }, cross: number, temp = 0.7) =>
    ({ id, state: 'liquid', kinds: [{ n: 14, ...solid }, WATER], lump: true, hold: true, cross, width: 12, height: 9, temp }) as const;

  it('holds a lump until it is let go, then water dissolves sugar but not sand', () => {
    const e = el({ boxes: [lump('s', { bond: 1.5, heavy: 0.2 }, 1.8), lump('d', { bond: 3, heavy: 3 }, 1)], clips: { drop: { phases: [{ dur: 1, release: ['s', 'd'] }, { dur: 11 }] } }, speed: 4 });
    const [a] = particlesAt(e, [['drop', 2]], 0);
    const [b] = particlesAt(e, [['drop', 2]], 1.9);
    // Held still: the lump's particles have not moved at all, and none has come loose.
    a.kind.forEach((k, i) => k === 0 && expect([b.x[i], b.y[i]]).toEqual([a.x[i], a.y[i]]));
    expect(b.loose).toBe(0);
    const [sugar, sand] = particlesAt(e, [['drop', 2]], 16);
    expect(sugar.loose).toBeGreaterThanOrEqual(12);
    expect(sand.loose).toBe(0);
  });

  it('dissolves a stirred lump faster than a still one', () => {
    const e = el({ boxes: [lump('a', { bond: 1.5, heavy: 0.2 }, 1.8, 0.6), lump('b', { bond: 1.5, heavy: 0.2 }, 1.8, 0.6)], clips: { go: { phases: [{ dur: 1, release: ['a', 'b'], stir: { b: 2 } }, { dur: 11 }] } }, speed: 4, seed: 5 });
    const [still, stirred] = particlesAt(e, [['go', 0]], 5);
    expect(stirred.stir).toBeGreaterThan(1);
    expect(stirred.loose).toBeGreaterThan(still.loose + 4);
  });

  it('checks lumps, letting go and stirring', () => {
    expect(checkParticles(el({ boxes: [{ id: 'b', state: 'liquid', n: 20, lump: true }] }))).toEqual(['box "b": a lump or held particles need two kinds (the lump first, then what is round it).']);
    expect(checkParticles(el({ boxes: [{ id: 'b', state: 'liquid', kinds: [{ n: 5 }, { n: 20 }] }], clips: { go: { phases: [{ dur: 1, release: ['b'] }] } } }))).toEqual(['clip "go", phase 1 lets go of a lump that box "b" does not hold.']);
    expect(checkParticles(el({ clips: { go: { phases: [{ dur: 1, stir: { x: 2 } }] } } }))).toEqual(['clip "go", phase 1 names no box "x".']);
  });
});

describe('particles: scripts and timing', () => {
  const video = (p: ParticlesEl, lines: Explainer['scenes'][number]['lines']): Explainer => ({
    id: 'x',
    lessonId: 'x',
    title: 'X',
    summary: 'X',
    scenes: [{ layout: 'center', main: [p], lines }],
  });

  it('waits for a clip before the next line, and gives the element its age', () => {
    const p = el({ clips: { push: { phases: [{ dur: 3, lid: { b: 0.5 } }, { dur: 2 }] } } });
    expect(clipSeconds(p, 'push')).toBe(5);
    const tl = compile(video(p, [{ say: 'Watch.', show: p.id, play: `${p.id}.push` }, { say: 'Done.' }]), { '0.0': 1, '0.1': 1 });
    expect(tl.lines[1].start).toBeGreaterThan(5);
    const st = stateAt(tl, 2).els[p.id];
    expect(st.age).toBeCloseTo(2 - tl.lines[0].start, 2);
    expect(st.started).toEqual([['push', 0]]);
  });

  it('checks clips, boxes and the parts a line shows', () => {
    const p = el({ clips: { push: { phases: [{ dur: 1, lid: { c: 0.1 } }] } } });
    expect(checkParticles(p)).toEqual(['clip "push", phase 1 names no box "c".', 'clip "push", phase 1: a lid must be between 0.2 and 1.']);
    const problems = checkScript(video(el({ id: 'q' }), [{ say: 'Look.', show: ['q', 'q.gauge', 'q.trail'], play: 'q.nope' }]));
    expect(problems).toEqual([
      'Scene 1, line 1: particles "q" shows "gauge" but does not set it up (thermometers, gauge, volume or flow).',
      'Scene 1, line 1: particles "q" has no clip "nope".',
    ]);
  });
});
