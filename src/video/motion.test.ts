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

  it('can leave the forces of a full-speed collision undrawn, and they still act', () => {
    const e = el({ bodies: [a, b], clips: { hit: { phases: collision(a, b, { type: 'stick', after: 1, hidden: true }) } } });
    expect(motionAt(e, [['hit', 1.5]]).forces.every((f) => f.hidden)).toBe(true);
    expect(motionAt(e, [['hit', clipSeconds(e, 'hit')]]).bodies.b.v).toBeCloseTo(1);
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

describe('motion: distance and displacement', () => {
  // A cart goes 8 m to the right at 4 m/s, then 3 m back at 1.5 m/s.
  const cart: MotionBody = { id: 'c', shape: 'cart', mass: 1, x: 1 };
  const trip = el({ bodies: [cart], clips: { out: { phases: [{ dur: 2, set: { c: 4 } }] }, back: { phases: [{ dur: 2, set: { c: -1.5 } }] } } });

  it('counts every metre travelled, whichever way the body went', () => {
    const s = motionAt(trip, [['out', 2], ['back', 2]]);
    expect(s.bodies.c.x).toBeCloseTo(6);
    expect(s.travelled.c).toBeCloseTo(11);
    // It started at 1 m and turned round at 9 m.
    expect(s.turns.c).toEqual([1, 9]);
  });

  it('keeps a distance trace for the graph, which never falls', () => {
    const { path } = motionAt(trip, [['out', 2], ['back', 2]]);
    expect(path.c[0]).toEqual([0, 0]);
    const [t, d] = path.c[path.c.length - 1];
    expect(t).toBeCloseTo(4);
    expect(d).toBeCloseTo(11);
    for (let i = 1; i < path.c.length; i++) expect(path.c[i][1]).toBeGreaterThanOrEqual(path.c[i - 1][1]);
  });

  it('finds where a body turns round under a steady force', () => {
    // Thrown to the right at 4 m/s against a 2 N force on 1 kg: it stops after 2 s, 4 m on, and comes back.
    const thrown = el({ bodies: [{ ...cart, v: 4 }], clips: { go: { phases: [{ dur: 3, forces: [{ on: 'c', name: 'Pull', n: -2 }] }] } } });
    const s = motionAt(thrown, [['go', 3]]);
    expect(s.turns.c[1]).toBeCloseTo(5);
    expect(s.bodies.c.x).toBeCloseTo(4);
    expect(s.travelled.c).toBeCloseTo(5);
  });

  it('starts the count again when a clip puts the bodies back', () => {
    const again = el({ bodies: [cart], clips: { out: { phases: [{ dur: 2, set: { c: 4 } }] }, redo: { reset: true, phases: [{ dur: 1, set: { c: 2 } }] } } });
    const s = motionAt(again, [['out', 2], ['redo', 1]]);
    expect(s.travelled.c).toBeCloseTo(2);
    expect(s.turns.c).toEqual([1]);
  });
});

describe('motion: air resistance', () => {
  // A 1 kg ball falling: 9.8 N of weight, and 2.45 N of air resistance for each metre per second,
  // so its terminal velocity is 4 m/s. In a drop, x is the distance fallen.
  const ball: MotionBody = { id: 'ball', shape: 'ball', mass: 1, x: 0 };
  const weight = { on: 'ball', name: 'Weight', n: 9.8 };
  const air = (drag: number) => ({ on: 'ball', name: 'Air resistance', n: 0, drag });
  const fall = el({ vertical: true, span: [0, 40], bodies: [ball], clips: { go: { phases: [{ dur: 10, forces: [weight, air(2.45)] }] } } });

  it('starts a fall at the acceleration the weight alone gives', () => {
    expect(motionAt(fall, [['go', 0.001]]).bodies.ball.a).toBeCloseTo(9.8, 1);
  });

  it('closes on the terminal velocity, where the air resistance equals the weight', () => {
    const s = motionAt(fall, [['go', 10]]);
    expect(s.bodies.ball.v).toBeCloseTo(4, 5);
    expect(s.bodies.ball.a).toBeCloseTo(0, 5);
    // The arrow drawn for the air resistance is as large as the weight, and points up.
    expect(s.forces.find((f) => f.name === 'Air resistance')!.n).toBeCloseTo(-9.8, 4);
  });

  it('never passes the terminal velocity on the way', () => {
    const { trace } = motionAt(fall, [['go', 10]]);
    for (let i = 1; i < trace.ball.length; i++) {
      expect(trace.ball[i][1]).toBeGreaterThanOrEqual(trace.ball[i - 1][1] - 1e-9);
      expect(trace.ball[i][1]).toBeLessThanOrEqual(4 + 1e-9);
    }
  });

  it('falls the distance the exact solution gives', () => {
    // x = vT × t − vT × τ × (1 − e^(−t/τ)), with vT = 4 m/s and τ = mass ÷ drag.
    const tau = 1 / 2.45;
    expect(motionAt(fall, [['go', 2]]).bodies.ball.x).toBeCloseTo(4 * 2 - 4 * tau * (1 - Math.exp(-2 / tau)), 6);
  });

  it('slows a body that is faster than its new terminal velocity (a parachute opening)', () => {
    const chute = el({ vertical: true, span: [0, 40], bodies: [{ ...ball, v: 4 }], clips: { open: { phases: [{ dur: 5, forces: [weight, air(9.8)] }] } } });
    expect(motionAt(chute, [['open', 0.001]]).bodies.ball.a).toBeLessThan(0);
    expect(motionAt(chute, [['open', 5]]).bodies.ball.v).toBeCloseTo(1, 5);
  });

  it('keeps one arrow for the air resistance as it grows', () => {
    // The arrow's age carries on from step to step: it does not start again each time its size changes.
    const s = motionAt(fall, [['go', 3]]);
    expect(s.forces.find((f) => f.name === 'Air resistance')!.age).toBeCloseTo(3);
  });
});

describe('motion: energy', () => {
  it('counts the work of a push, and what friction turns to heat', () => {
    // A 2 kg block pushed with 10 N against 4 N of friction: a = 3 m/s², so 6 m in 2 s.
    const pushed = el({
      clips: { push: { phases: [{ dur: 2, forces: [{ on: 'b', name: 'Push', n: 10 }, { on: 'b', name: 'Friction', n: -4, resist: true }] }] } },
    });
    const e = motionAt(pushed, [['push', 2]]).energy.b;
    expect(e.work).toBeCloseTo(60, 6);
    expect(e.heat).toBeCloseTo(24, 6);
    expect(e.kinetic).toBeCloseTo(36, 6);
    expect(e.potential).toBe(0);
  });

  it('turns all the kinetic energy to heat when friction stops a body', () => {
    const sliding = el({ bodies: [{ ...block, v: 6 }], clips: { go: { phases: [{ dur: 5, forces: [{ on: 'b', name: 'Friction', n: -4, resist: true }] }] } } });
    const e = motionAt(sliding, [['go', 5]]).energy.b;
    expect(e.kinetic).toBe(0);
    expect(e.heat).toBeCloseTo(36, 6);
    expect(e.work).toBe(0);
  });

  it('trades potential energy for kinetic energy in a drop, and keeps the total', () => {
    // A 2 kg ball dropped 2.5 m on Earth: 49 J, and 7 m/s as it lands.
    const drop = el({
      vertical: true,
      span: [0, 2.5],
      bodies: [{ id: 'b', shape: 'ball', mass: 2, x: 0 }],
      energy: { max: 50, bars: ['kinetic', 'potential', 'total'], g: 9.8 },
      clips: { fall: { phases: [{ dur: 1, forces: [{ on: 'b', name: 'Weight', n: 19.6 }] }] } },
    });
    expect(checkMotion(drop)).toEqual([]);
    expect(motionAt(drop).energy.b).toEqual({ kinetic: 0, potential: 49, work: 0, heat: 0 });
    const t = Math.sqrt((2 * 2.5) / 9.8);
    const half = motionAt(drop, [['fall', t / 2]]).energy.b;
    expect(half.kinetic + half.potential).toBeCloseTo(49, 6);
    const landed = motionAt(drop, [['fall', t]]);
    expect(landed.bodies.b.v).toBeCloseTo(7, 6);
    expect(landed.energy.b.kinetic).toBeCloseTo(49, 5);
    expect(landed.energy.b.potential).toBeCloseTo(0, 5);
    expect(landed.energy.b.heat).toBe(0);
  });

  it('stores the work of a steady lift as potential energy', () => {
    // A 20 kg crate lifted 5 m at a steady 1 m/s: 196 N × 5 m = 980 J.
    const lift = el({
      vertical: 'up',
      span: [0, 6],
      bodies: [{ id: 'b', shape: 'block', mass: 20, x: 0 }],
      energy: { max: 1000, bars: ['work', 'potential'], g: 9.8 },
      clips: { up: { phases: [{ dur: 5, set: { b: 1 }, forces: [{ on: 'b', name: 'Lift', n: 196 }, { on: 'b', name: 'Weight', n: -196 }] }] } },
    });
    const s = motionAt(lift, [['up', 5]]);
    expect(s.bodies.b.x).toBeCloseTo(5, 9);
    expect(s.energy.b.work).toBeCloseTo(980, 6);
    expect(s.energy.b.potential).toBeCloseTo(980, 6);
    expect(s.energy.b.heat).toBe(0);
  });

  it('counts what air resistance turns to heat', () => {
    const fall = el({
      vertical: true,
      span: [0, 40],
      bodies: [{ id: 'b', shape: 'ball', mass: 1, x: 0 }],
      energy: { max: 400, bars: ['kinetic', 'potential', 'heat', 'total'], g: 9.8 },
      clips: { go: { phases: [{ dur: 5, forces: [{ on: 'b', name: 'Weight', n: 9.8 }, { on: 'b', name: 'Air resistance', n: 0, drag: 2.45 }] }] } },
    });
    const start = motionAt(fall).energy.b;
    const e = motionAt(fall, [['go', 5]]).energy.b;
    expect(e.heat).toBeGreaterThan(0);
    expect(e.kinetic + e.potential + e.heat).toBeCloseTo(start.potential, 5);
  });

  it('asks for a height before it shows potential energy', () => {
    expect(checkMotion(el({ energy: { max: 10, bars: ['potential'] } }))).toHaveLength(1);
    expect(checkMotion(el({ energy: { max: 10, bars: ['kinetic'], of: ['nobody'] } }))).toHaveLength(1);
  });
});

describe('motion: a curved track', () => {
  // A 2 kg ball let go 2.5 m up a hill that runs down to level ground.
  const hill = el({
    span: [0, 14],
    path: { g: 9.8, points: [[0, 2.5], [5, 0], [12, 0]] },
    bodies: [{ id: 'b', shape: 'ball', mass: 2, x: 0 }],
    energy: { max: 50, bars: ['kinetic', 'potential', 'total'] },
    clips: { go: { phases: [{ dur: 4 }] }, rough: { reset: true, phases: [{ dur: 6, forces: [{ on: 'b', name: 'Friction', n: -3, resist: true }] }] } },
  });

  it('is a valid motion', () => {
    expect(checkMotion(hill)).toEqual([]);
    expect(checkMotion(el({ path: { g: 9.8, points: [[0, 1], [4, 0]] }, vertical: true }))).toContain('a curved track cannot also be a drop.');
  });

  it('reaches the foot of the hill at the speed the height gives', () => {
    // mgh = ½mv²: v = √(2 × 9.8 × 2.5) = 7 m/s, whatever the shape of the hill.
    const s = motionAt(hill, [['go', 4]]);
    expect(s.energy.b.potential).toBeCloseTo(0, 6);
    expect(s.bodies.b.v).toBeCloseTo(7, 3);
    expect(s.energy.b.kinetic).toBeCloseTo(49, 2);
  });

  it('keeps the total energy all the way down', () => {
    for (const t of [0, 0.4, 0.8, 1.2, 1.6, 2.4, 4]) {
      const e = motionAt(hill, [['go', t]]).energy.b;
      expect(e.kinetic + e.potential).toBeCloseTo(49, 2);
      expect(e.heat).toBeCloseTo(0, 2);
    }
  });

  it('turns energy to heat with friction, and stops', () => {
    const s = motionAt(hill, [['rough', 6]]);
    const e = s.energy.b;
    expect(e.heat).toBeGreaterThan(10);
    expect(e.kinetic + e.potential + e.heat).toBeCloseTo(49, 2);
    // Heat is friction × the distance travelled along the track.
    expect(e.heat).toBeCloseTo(3 * s.travelled.b, 2);
  });

  it('holds a body that friction can hold on the slope', () => {
    const held = el({ ...hill, clips: { stay: { phases: [{ dur: 2, forces: [{ on: 'b', name: 'Friction', n: -40, resist: true }] }] } } });
    expect(motionAt(held, [['stay', 2]]).bodies.b).toEqual({ x: 0, v: 0, a: 0 });
  });
});

describe('motion: a pendulum', () => {
  const swing = (angle: number) =>
    el({
      span: [-3, 3],
      path: { g: 9.8, swing: { length: 2, angle: 60 } },
      bodies: [{ id: 'b', shape: 'ball', mass: 0.5, x: (-2 * angle * Math.PI) / 180 }],
      energy: { max: 6, bars: ['kinetic', 'potential', 'total'] },
      clips: { go: { phases: [{ dur: 12 }] } },
    });

  it('swings with the period 2π√(L ÷ g) when the swing is small', () => {
    const small = swing(3);
    const period = 2 * Math.PI * Math.sqrt(2 / 9.8);
    const start = small.bodies[0].x;
    expect(motionAt(small, [['go', period / 2]]).bodies.b.x).toBeCloseTo(-start, 3);
    expect(motionAt(small, [['go', period]]).bodies.b.x).toBeCloseTo(start, 3);
    expect(motionAt(small, [['go', period / 4]]).bodies.b.x).toBeCloseTo(0, 3);
  });

  it('is fastest at the bottom, where all its energy is kinetic', () => {
    // Let go at 60 degrees on a 2 m string: 1 m up, so 0.5 × 9.8 × 1 = 4.9 J.
    const wide = swing(60);
    const top = motionAt(wide).energy.b;
    expect(top.potential).toBeCloseTo(4.9, 6);
    expect(top.kinetic).toBe(0);
    let fastest = { kinetic: 0, potential: 0 };
    for (let t = 0; t <= 12; t += 0.02) {
      const e = motionAt(wide, [['go', t]]).energy.b;
      expect(e.kinetic + e.potential).toBeCloseTo(4.9, 3);
      if (e.kinetic > fastest.kinetic) fastest = e;
    }
    expect(fastest.kinetic).toBeCloseTo(4.9, 2);
    expect(fastest.potential).toBeCloseTo(0, 2);
  });
});
