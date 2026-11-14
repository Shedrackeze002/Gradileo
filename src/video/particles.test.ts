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
      'Scene 1, line 1: particles "q" shows "gauge" but does not set it up (thermometers, gauge or volume).',
      'Scene 1, line 1: particles "q" has no clip "nope".',
    ]);
  });
});
