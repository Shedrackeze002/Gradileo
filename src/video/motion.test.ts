import { describe, expect, it } from 'vitest';
import { checkMotion, checkScript, type Explainer, type MotionBody, type MotionEl } from './script.ts';
import { collision, motionAt } from './motion.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

const block: MotionBody = { id: 'b', shape: 'block', mass: 2, x: 1 };
const el = (over: Partial<MotionEl> = {}): MotionEl => ({ kind: 'motion', id: 'sim', span: [0, 12], bodies: [block], clips: {}, ...over });

describe('motion: forces move the bodies', () => {
  const pushed = el({ clips: { push: { phases: [{ dur: 2, forces: [{ on: 'b', name: 'Push', n: 4 }] }] }, coast: { phases: [{ dur: 1 }] } } });

  it('accelerates a body by the net force over its mass', () => {
    const s = motionAt(pushed, [['push', 2]]);
    // a = 4 ÷ 2 = 2 m/s²: after 2 s, v = 4 m/s and it has moved ½ × 2 × 2² = 4 m.
    expect(s.bodies.b).toEqual({ x: 5, v: 4, a: 2 });
    expect(s.time).toBe(2);
    expect(motionAt(pushed, [['push', 1]]).bodies.b.x).toBeCloseTo(2);
  });

  it('starts at rest with nothing played', () => {
    const s = motionAt(pushed);
    expect(s.bodies.b).toEqual({ x: 1, v: 0, a: 0 });
    expect(s.forces).toEqual([]);
  });

  it('carries on from one clip into the next, at a steady velocity with no force', () => {
    const s = motionAt(pushed, [['push', 2], ['coast', 1]]);
    expect(s.bodies.b.x).toBeCloseTo(9);
    expect(s.bodies.b.v).toBeCloseTo(4);
    expect(s.bodies.b.a).toBe(0);
    expect(s.forces).toEqual([]);
  });

  it('leaves a mark at every strobe step, further apart as the body speeds up', () => {
    const s = motionAt(pushed, [['push', 2]]);
    expect(s.marks.b.map((x) => Math.round(x * 100) / 100)).toEqual([1, 1.25, 2, 3.25, 5]);
  });

  it('keeps a velocity trace for the graph', () => {
    const { trace } = motionAt(pushed, [['push', 2]]);
    expect(trace.b[0]).toEqual([0, 0]);
    const [t, v] = trace.b[trace.b.length - 1];
    expect(t).toBeCloseTo(2);
    expect(v).toBeCloseTo(4);
  });

  it('holds still in a frozen phase while its forces appear', () => {
    const ready = el({ clips: { ready: { phases: [{ dur: 1, freeze: true, forces: [{ on: 'b', name: 'Push', n: 4 }] }] } } });
    const s = motionAt(ready, [['ready', 0.6]]);
    expect(s.bodies.b).toEqual({ x: 1, v: 0, a: 0 });
    expect(s.time).toBe(0);
    expect(s.forces[0].age).toBeCloseTo(0.6);
    expect(clipSeconds(ready, 'ready')).toBe(1);
  });

  it('keeps a force that carries on into the next clip at its full length', () => {
    const push = { on: 'b', name: 'Push', n: 4 };
    const two = el({ clips: { ready: { phases: [{ dur: 1, freeze: true, forces: [push] }] }, go: { phases: [{ dur: 2, forces: [push] }] } } });
    expect(motionAt(two, [['ready', 1], ['go', 0]]).forces[0].age).toBeCloseTo(1);
  });
});

describe('motion: friction', () => {
  const friction = { on: 'b', name: 'Friction', n: -4, resist: true };
  const floor = el({ clips: { push: { phases: [{ dur: 1.5, forces: [{ on: 'b', name: 'Push', n: 10 }, friction] }] }, release: { phases: [{ dur: 3, forces: [friction] }] } } });

  it('takes friction off the push', () => {
    // Net force 6 N on 2 kg: 3 m/s².
    const { v, a } = motionAt(floor, [['push', 1.5]]).bodies.b;
    expect(v).toBeCloseTo(4.5);
    expect(a).toBe(3);
  });

  it('stops the body and then lets go of it', () => {
    // −2 m/s² from 4.5 m/s: at rest after 2.25 s, 5.0625 m further on, and it stays there.
    const s = motionAt(floor, [['push', 1.5], ['release', 3]]);
    expect(s.bodies.b.v).toBe(0);
    expect(s.bodies.b.a).toBe(0);
    expect(s.bodies.b.x).toBeCloseTo(1 + 3.375 + 5.0625);
    expect(s.forces).toEqual([]);
  });

  it('holds a body at rest against a smaller push', () => {
    const stuck = el({ clips: { push: { phases: [{ dur: 2, forces: [{ on: 'b', name: 'Push', n: 3 }, friction] }] } } });
    const s = motionAt(stuck, [['push', 2]]);
    expect(s.bodies.b).toEqual({ x: 1, v: 0, a: 0 });
    expect(s.forces.map((f) => f.name)).toEqual(['Push', 'Friction']);
  });
});

describe('motion: collisions conserve momentum', () => {
  const a: MotionBody = { id: 'a', shape: 'cart', mass: 2, x: 1.5, v: 3 };
  const b: MotionBody = { id: 'b', shape: 'cart', mass: 4, x: 7 };
  const momentum = (e: MotionEl, plays: Array<[string, number]>) => {
    const s = motionAt(e, plays);
    return e.bodies.reduce((n, q) => n + q.mass * s.bodies[q.id].v, 0);
  };

  it('couples two carts at the velocity the total momentum gives', () => {
    const e = el({ bodies: [a, b], clips: { hit: { phases: collision(a, b, { type: 'stick', after: 1 }) } } });
    const end = motionAt(e, [['hit', clipSeconds(e, 'hit')]]);
    expect(end.bodies.a.v).toBeCloseTo(1);
    expect(end.bodies.b.v).toBeCloseTo(1);
    // The forces are equal and opposite, so the total is the same at every moment.
    for (const t of [0, 0.5, 1.47, 1.5, 1.55, 2]) expect(momentum(e, [['hit', t]])).toBeCloseTo(6);
  });

  it('draws equal and opposite forces while the carts touch', () => {
    const e = el({ bodies: [a, b], clips: { hit: { phases: collision(a, b, { type: 'stick', after: 1 }) } } });
    const { forces, contact } = motionAt(e, [['hit', 1.5]]);
    expect(forces).toHaveLength(2);
    expect(forces[0].n).toBeCloseTo(-forces[1].n);
    expect(contact).not.toBeNull();
  });

  it('passes all the momentum on when equal carts bounce', () => {
    const p: MotionBody = { ...a, mass: 1, v: 4 };
    const q: MotionBody = { ...b, mass: 1 };
    const e = el({ bodies: [p, q], clips: { hit: { phases: collision(p, q, { type: 'bounce', after: 1 }) } } });
    const end = motionAt(e, [['hit', clipSeconds(e, 'hit')]]);
    expect(end.bodies.a.v).toBeCloseTo(0);
    expect(end.bodies.b.v).toBeCloseTo(4);
    // The bumpers have sprung back: the carts no longer overlap.
    expect(end.bodies.b.x - end.bodies.a.x).toBeGreaterThanOrEqual(1.1 - 1e-9);
  });

  it('stretches the touch in slow motion without changing the result', () => {
    const e = el({ bodies: [a, b], clips: { hit: { phases: collision(a, b, { type: 'stick', after: 1, slow: 50 }) } } });
    const end = motionAt(e, [['hit', clipSeconds(e, 'hit')]]);
    expect(end.bodies.b.v).toBeCloseTo(1);
    expect(clipSeconds(e, 'hit')).toBeGreaterThan(5);
  });

  it('refuses a body that never catches up', () => {
    expect(() => collision({ ...a, v: 0 }, b, { type: 'stick', after: 1 })).toThrow(/catch up/);
  });
});

describe('motion in a script', () => {
  const sim = el({ clips: { push: { phases: [{ dur: 2, forces: [{ on: 'b', name: 'Push', n: 4 }] }] } } });
  const script = (lines: Explainer['scenes'][0]['lines'], motion = sim): Explainer => ({ id: 'x', lessonId: '', title: 'T', summary: 'S', scenes: [{ layout: 'center', main: [motion], lines }] });

  it('plays a clip from a line, and the next line waits for it to end', () => {
    const x = script([{ say: 'Watch.', show: 'sim', play: 'sim.push', playDelay: 0.5 }, { say: 'Done.' }]);
    expect(checkScript(x)).toEqual([]);
    const tl = compile(x, { '0.0': 1, '0.1': 1 });
    const play = tl.scenes[0].events.find((e) => e.kind === 'play');
    expect(play).toEqual({ t: 1.5, kind: 'play', el: 'sim', clip: 'push', dur: 2 });
    // The clip ends at 3.5 s, well after the one-second line: the next line starts after it.
    expect(tl.lines[1].start).toBeCloseTo(3.9);
    expect(stateAt(tl, 1.2).els.sim.plays).toBeUndefined();
    expect(stateAt(tl, 2.5).els.sim.plays).toEqual([['push', 1]]);
    // Past its end the clip stays at its last moment, so those frames are identical.
    expect(stateAt(tl, 3.7).els.sim.plays).toEqual([['push', 2]]);
    expect(JSON.stringify(stateAt(tl, 3.7))).toBe(JSON.stringify(stateAt(tl, 3.8)));
  });

  it('reports a clip or a part that does not exist', () => {
    expect(checkScript(script([{ say: 'Go.', show: 'sim', play: 'sim.pull' }]))).toEqual(['Scene 1, line 1: motion "sim" has no clip "pull".']);
    expect(checkScript(script([{ say: 'Go.', show: 'sim.speed' }]))).toEqual(['Scene 1, line 1: motion "sim" has no part "speed".']);
    expect(checkScript(script([{ say: 'Go.', show: ['sim', 'sim.velocity'], focus: 'sim.b' }]))).toEqual([]);
  });

  it('reports vertical forces that do not balance, and forces on no body', () => {
    const bad = el({ clips: { c: { phases: [{ dur: 1, forces: [{ on: 'b', name: 'Weight', n: -19.6, axis: 'y' }, { on: 'z', name: 'Push', n: 1 }] }] } } });
    expect(checkMotion(bad)).toEqual(['clip "c", phase 1: a force acts on no body "z".', 'clip "c", phase 1: the vertical forces on "b" do not balance.']);
  });
});
