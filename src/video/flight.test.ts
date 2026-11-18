import { describe, expect, it } from 'vitest';
import { checkFlight, checkScript, type Explainer, type FlightEl } from './script.ts';
import { carried, fastest, flightAt, landingTime, momentumOf, touchTime } from './flight.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

const G = 9.81;

// A ball thrown sideways at 6 m/s from a ledge 5 m up.
const ball = (over: Partial<FlightEl> = {}): FlightEl => ({
  kind: 'flight',
  id: 'f',
  view: [0, 10, 0, 6],
  gravity: G,
  strobe: 0.2,
  bodies: [{ id: 'b', at: [1, 5], v: [6, 0] }],
  clips: {
    go: { phases: [{ dur: 2 }] },
    slowly: { phases: [{ dur: 0.5, slow: 4, note: 'Slow motion' }] },
    name: { phases: [{ dur: 3, freeze: true }] },
    again: { reset: true, phases: [{ dur: 0.5 }] },
  },
  ...over,
});

// A river 100 m wide that flows at 3 m/s, and a boat that moves at 5 m/s through the water.
const river = (over: Partial<FlightEl> = {}): FlightEl => ({
  kind: 'flight',
  id: 'f',
  scene: 'river',
  view: [-20, 80, -10, 110],
  stream: { v: [3, 0], band: [0, 100] },
  bodies: [{ id: 'boat', shape: 'boat', at: [0, 0], v: [0, 5] }],
  clips: { go: { phases: [{ dur: 20 }] } },
  ...over,
});

describe('flight: projectiles', () => {
  it('starts where it is put, with nothing played', () => {
    const s = flightAt(ball());
    expect(s.bodies.b).toMatchObject({ x: 1, y: 5, vx: 6, vy: 0, flying: true, landed: false });
    expect(s.time).toBe(0);
    expect(s.trails.b).toEqual([[1, 5]]);
  });

  it('keeps the horizontal velocity, and gains g of downward velocity each second', () => {
    const s = flightAt(ball(), [['go', 0.5]]);
    expect(s.time).toBeCloseTo(0.5);
    expect(s.bodies.b.x).toBeCloseTo(4);
    expect(s.bodies.b.y).toBeCloseTo(5 - 0.5 * G * 0.25);
    expect(s.bodies.b.vx).toBe(6);
    expect(s.bodies.b.vy).toBeCloseTo(-G * 0.5);
  });

  it('finds when a body lands', () => {
    // Dropped 5 m: t = √(2 × 5 ÷ g). Kicked up at 11.47 m/s from the ground: t = 2 × 11.47 ÷ g.
    expect(landingTime(5, 0, G)).toBeCloseTo(Math.sqrt(10 / G));
    expect(landingTime(0, 11.47, G)).toBeCloseTo((2 * 11.47) / G);
  });

  it('stops a body where it lands', () => {
    const s = flightAt(ball(), [['go', 2]]);
    expect(s.bodies.b).toMatchObject({ y: 0, vx: 0, vy: 0, flying: false, landed: true });
    expect(s.bodies.b.x).toBeCloseTo(1 + 6 * Math.sqrt(10 / G));
    // The clock runs on after the landing.
    expect(s.time).toBeCloseTo(2);
  });

  it('keeps a dropped ball level with one thrown sideways at the same moment', () => {
    const pair = ball({
      bodies: [
        { id: 'drop', at: [1, 5] },
        { id: 'thrown', at: [1, 5] },
      ],
      clips: { go: { phases: [{ dur: 1.2, set: { thrown: [6, 0] }, release: ['drop'] }] } },
    });
    // Nothing falls until it is let go.
    expect(flightAt(pair).bodies.drop.flying).toBe(false);
    const s = flightAt(pair, [['go', 0.6]]);
    expect(s.bodies.drop.y).toBeCloseTo(s.bodies.thrown.y);
    expect(s.bodies.drop.x).toBe(1);
    expect(s.bodies.thrown.x).toBeCloseTo(4.6);
    // And they land together.
    const end = flightAt(pair, [['go', 1.2]]);
    expect(end.bodies.drop.landed).toBe(true);
    expect(end.bodies.thrown.landed).toBe(true);
  });

  it('leaves a mark at every strobe step, once where two clips meet', () => {
    const s = flightAt(ball(), [['go', 0.5]]);
    expect(s.marks.b).toHaveLength(3);
    expect(s.marks.b[0]).toEqual([1, 5]);
    expect(s.marks.b[1][0]).toBeCloseTo(2.2);
    expect(s.marks.b[1][1]).toBeCloseTo(5 - 0.5 * G * 0.04);
    expect(flightAt(ball(), [['go', 0.4], ['go', 0.4]]).marks.b).toHaveLength(5);
  });

  it('holds still in a frozen phase, and plays slow motion at the phase’s rate', () => {
    expect(clipSeconds(ball(), 'name')).toBe(3);
    const held = flightAt(ball(), [['name', 2]]);
    expect(held.bodies.b).toMatchObject({ x: 1, y: 5 });
    expect(held.time).toBe(0);
    expect(clipSeconds(ball(), 'slowly')).toBe(2);
    const mid = flightAt(ball(), [['slowly', 1]]);
    expect(mid.time).toBeCloseTo(0.25);
    expect(mid).toMatchObject({ slow: 4, note: 'Slow motion' });
    expect(flightAt(ball(), [['slowly', 2]])).toMatchObject({ slow: 1, note: undefined });
  });

  it('gives a velocity as a frozen phase starts, so its arrows can be named', () => {
    const kick = ball({ bodies: [{ id: 'b', at: [0, 0] }], clips: { name: { phases: [{ dur: 2, freeze: true, set: { b: [3, 4] } }] } } });
    expect(flightAt(kick, [['name', 1]]).bodies.b).toMatchObject({ x: 0, y: 0, vx: 3, vy: 4, flying: true });
  });

  it('puts every body back for a clip that plays the motion again', () => {
    const s = flightAt(ball(), [['go', 0.5], ['again', 0.25]]);
    expect(s.time).toBeCloseTo(0.25);
    expect(s.bodies.b.x).toBeCloseTo(2.5);
    expect(s.trails.b[0]).toEqual([1, 5]);
    expect(s.marks.b[0]).toEqual([1, 5]);
  });
});

describe('flight: streams', () => {
  it('adds the stream’s velocity to the body’s own', () => {
    const s = flightAt(river(), [['go', 20]]);
    // Pointing straight across: 20 s to cross 100 m, and 60 m of drift.
    expect(s.bodies.boat.x).toBeCloseTo(60);
    expect(s.bodies.boat.y).toBeCloseTo(100);
    expect(s.bodies.boat).toMatchObject({ vx: 3, vy: 5, ownX: 0, ownY: 5 });
    expect(s.bodies.boat.driftX).toBeCloseTo(60);
    expect(s.bodies.boat.driftY).toBe(0);
    expect(s.flow).toEqual([60, 0]);
    expect(fastest(river())).toBeCloseTo(Math.hypot(3, 5));
  });

  it('carries a body with no velocity of its own', () => {
    const log = river({ bodies: [{ id: 'log', at: [0, 50] }] });
    expect(flightAt(log, [['go', 10]]).bodies.log).toMatchObject({ x: 30, y: 50, ownX: 0, ownY: 0 });
  });

  it('carries only the bodies it is told to', () => {
    const two = river({
      stream: { v: [3, 0], of: ['boat'] },
      bodies: [
        { id: 'boat', at: [0, 0], v: [0, 5] },
        { id: 'post', at: [0, 0], v: [0, 5] },
      ],
    });
    expect(carried(two, two.bodies[0])).toBe(true);
    expect(carried(two, two.bodies[1])).toBe(false);
    const s = flightAt(two, [['go', 20]]);
    expect(s.bodies.post.x).toBe(0);
    expect(s.bodies.post.y).toBeCloseTo(100);
  });

  it('takes a boat that points upstream straight across, and stops one that has arrived', () => {
    const race = river({
      bodies: [
        { id: 'a', at: [0, 0], v: [0, 5] },
        { id: 'b', at: [0, 0], v: [-3, 4] },
      ],
      clips: {
        go: {
          phases: [{ dur: 20 }, { dur: 5, stop: ['a'] }],
        },
      },
    });
    const s = flightAt(race, [['go', 25]]);
    expect(s.bodies.a).toMatchObject({ vx: 0, vy: 0, ownX: 0, ownY: 0, stopped: true });
    expect(s.bodies.a.x).toBeCloseTo(60);
    expect(s.bodies.a.y).toBeCloseTo(100);
    expect(s.bodies.b.x).toBeCloseTo(0);
    expect(s.bodies.b.y).toBeCloseTo(100);
    expect(s.bodies.b.stopped).toBe(false);
  });
});

describe('flight: checks', () => {
  it('reports a flight that cannot be drawn', () => {
    expect(checkFlight(ball())).toEqual([]);
    expect(checkFlight(river())).toEqual([]);
    expect(checkFlight(ball({ view: [10, 0, 0, 6] }))[0]).toMatch(/right above its left/);
    expect(checkFlight(ball({ bodies: [{ id: 'b', at: [1, 5] }, { id: 'b', at: [2, 5] }] }))[0]).toMatch(/share an id/);
    expect(checkFlight(ball({ bodies: [{ id: 'trail', at: [1, 5] }], clips: {} }))[0]).toMatch(/name of a part/);
    expect(checkFlight(ball({ bodies: [{ id: 'b', at: [20, 5] }] }))[0]).toMatch(/starts outside the view/);
    expect(checkFlight(river({ gravity: G }))[0]).toMatch(/gravity needs the ground scene/);
    expect(checkFlight(river({ stream: { v: [3, 0], of: ['raft'] } }))[0]).toMatch(/carries no body "raft"/);
    expect(checkFlight(river({ clips: { go: { phases: [{ dur: 1, release: ['boat'] }] } } }))[0]).toMatch(/there is no gravity/);
    expect(checkFlight(river({ clips: { go: { phases: [{ dur: 1, stop: ['raft'] }] } } }))[0]).toMatch(/names no body "raft"/);
    expect(checkFlight(ball({ poster: 'fly' }))[0]).toMatch(/no clip "fly"/);
    expect(checkFlight(ball({ readout: { of: 'c' } }))[0]).toMatch(/readout names no body "c"/);
  });

  it('plays in a script, with parts that can be shown and hidden on their own', () => {
    const x: Explainer = {
      id: 'flight-test',
      lessonId: 'p20-1-8',
      title: 'Flight',
      summary: 'A test.',
      scenes: [
        {
          layout: 'center',
          main: [ball()],
          lines: [
            { say: 'A ball leaves a ledge.', show: ['f', 'f.components'] },
            { say: 'Its two velocities change on their own.', show: 'f.trail', play: 'f.go' },
            { say: 'Now without the arrows.', hide: 'f.components', focus: 'f.b' },
          ],
        },
      ],
    };
    expect(checkScript(x)).toEqual([]);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such part.', show: ['f', 'f.wind'] }] }] })[0]).toMatch(/flight "f" has no part "wind"/);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such clip.', show: 'f', play: 'f.fly' }] }] })[0]).toMatch(/flight "f" has no clip "fly"/);
    const tl = compile(x, { '0.0': 2, '0.1': 2, '0.2': 2 });
    const during = stateAt(tl, tl.lines[1].start + 0.5).els.f;
    expect(flightAt(ball(), during.plays).bodies.b.x).toBeCloseTo(4);
    // The next line waits for the clip to end.
    expect(tl.lines[2].start - tl.lines[1].start).toBeGreaterThanOrEqual(2);
  });
});

// Momentum in two dimensions: a view from above of bodies with a mass.
describe('collisions and explosions seen from above', () => {
  // The lesson's crossroads: 1200 kg east at 20 m/s meets 1800 kg north at 10 m/s, and they lock together.
  const crossroads = (over: Partial<FlightEl> = {}): FlightEl => ({
    kind: 'flight',
    id: 'f',
    scene: 'map',
    view: [-50, 50, -40, 40],
    collisions: { stick: true },
    momentum: { max: 30000 },
    bodies: [
      { id: 'a', shape: 'car', mass: 1200, radius: 2, at: [-40, 0], v: [20, 0] },
      { id: 'b', shape: 'car', mass: 1800, radius: 2, at: [0, -20], v: [0, 10] },
    ],
    clips: { crash: { phases: [{ dur: 4 }] } },
    ...over,
  });

  it('locks two cars together with the velocity that conserves momentum each way', () => {
    expect(checkFlight(crossroads())).toEqual([]);
    const before = flightAt(crossroads(), [['crash', 1]]);
    expect(momentumOf(crossroads(), before).total).toEqual([24000, 18000]);
    expect(before.hit).toBeUndefined();
    const after = flightAt(crossroads(), [['crash', 3]]);
    for (const id of ['a', 'b']) {
      expect(after.bodies[id].vx).toBeCloseTo(8);
      expect(after.bodies[id].vy).toBeCloseTo(6);
    }
    const p = momentumOf(crossroads(), after);
    expect(p.total[0]).toBeCloseTo(24000);
    expect(p.total[1]).toBeCloseTo(18000);
    expect(p.of.a[0]).toBeCloseTo(9600);
    expect(p.of.b[1]).toBeCloseTo(10800);
    // They touched when their centres were 4 m apart, and a car keeps pointing the way it was driven.
    expect(after.hit!.t).toBeGreaterThan(1.8);
    expect(after.hit!.t).toBeLessThan(2);
    expect(after.bodies.a.heading).toBe(0);
    expect(after.bodies.b.heading).toBe(90);
    // The centre of mass moves steadily through the crash.
    const [c1, c3] = [momentumOf(crossroads(), before).centre!, p.centre!];
    expect((c3[0] - c1[0]) / 2).toBeCloseTo(8);
    expect((c3[1] - c1[1]) / 2).toBeCloseTo(6);
  });

  // The lesson's glancing collision: 0.5 kg at 4 m/s strikes 0.5 kg at rest off centre, so that the
  // line through their centres points 46.94° south of east, with a restitution of 0.5035.
  const SOUTH = (46.936 * Math.PI) / 180;
  const glance = (over: Partial<FlightEl> = {}): FlightEl => ({
    kind: 'flight',
    id: 'f',
    scene: 'map',
    view: [-4, 4, -3, 3],
    collisions: { restitution: 0.50345 },
    bodies: [
      { id: 'a', shape: 'puck', mass: 0.5, radius: 0.3, at: [-3, 0.6 * Math.sin(SOUTH)], v: [4, 0] },
      { id: 'b', shape: 'puck', mass: 0.5, radius: 0.3, at: [0, 0] },
    ],
    clips: { hit: { phases: [{ dur: 1.5 }] } },
    ...over,
  });

  it('turns two pucks aside in a glancing collision, with both directions balanced', () => {
    expect(checkFlight(glance())).toEqual([]);
    const s = flightAt(glance(), [['hit', 1.4]]);
    const [a, b] = [s.bodies.a, s.bodies.b];
    expect(Math.hypot(a.vx, a.vy)).toBeCloseTo(3, 2);
    expect((Math.atan2(a.vy, a.vx) * 180) / Math.PI).toBeCloseTo(30, 1);
    expect(Math.hypot(b.vx, b.vy)).toBeCloseTo(2.05, 2);
    expect((Math.atan2(b.vy, b.vx) * 180) / Math.PI).toBeCloseTo(-46.9, 1);
    const p = momentumOf(glance(), s);
    expect(p.total[0]).toBeCloseTo(2);
    expect(p.total[1]).toBeCloseTo(0);
    expect(p.of.a[1]).toBeCloseTo(0.75, 2);
    expect(p.of.b[1]).toBeCloseTo(-0.75, 2);
    // 4.0 J before and 3.3 J after: the collision is inelastic.
    expect(0.25 * (a.vx ** 2 + a.vy ** 2 + b.vx ** 2 + b.vy ** 2)).toBeCloseTo(3.3, 1);
  });

  it('sends equal pucks off at right angles when the collision is elastic', () => {
    const s = flightAt(glance({ collisions: {} }), [['hit', 1.4]]);
    const [a, b] = [s.bodies.a, s.bodies.b];
    expect(a.vx * b.vx + a.vy * b.vy).toBeCloseTo(0);
    expect(0.25 * (a.vx ** 2 + a.vy ** 2 + b.vx ** 2 + b.vy ** 2)).toBeCloseTo(4);
    // Head on, the first puck stops.
    const head = flightAt(glance({ collisions: {}, bodies: [{ ...glance().bodies[0], at: [-3, 0] }, glance().bodies[1]] }), [['hit', 1.4]]);
    expect(head.bodies.a.vx).toBeCloseTo(0);
    expect(head.bodies.b.vx).toBeCloseTo(4);
  });

  it('finds when two discs touch, and that discs which miss or part never do', () => {
    const at = (x: number, y: number, vx: number, vy: number) => ({ ...flightAt(glance()).bodies.a, x, y, vx, vy });
    expect(touchTime(at(-3, 0, 4, 0), 0.3, at(0, 0, 0, 0), 0.3, 5)).toBeCloseTo(0.6);
    expect(touchTime(at(-3, 0, 4, 0), 0.3, at(0, 0, 0, 0), 0.3, 0.5)).toBeUndefined();
    expect(touchTime(at(-3, 0.7, 4, 0), 0.3, at(0, 0, 0, 0), 0.3, 5)).toBeUndefined();
    expect(touchTime(at(-3, 0, -4, 0), 0.3, at(0, 0, 0, 0), 0.3, 5)).toBeUndefined();
  });

  // The lesson's shell: at rest, it breaks into 2 kg going east at 6 m/s, 3 kg going north at 3 m/s and a third piece of 1.5 kg.
  const shell = (over: Partial<FlightEl> = {}): FlightEl => ({
    kind: 'flight',
    id: 'f',
    scene: 'map',
    view: [-10, 10, -8, 8],
    momentum: { max: 15, min: -15 },
    bodies: [
      { id: 'east', shape: 'puck', mass: 2, at: [0.5, 0] },
      { id: 'north', shape: 'puck', mass: 3, at: [0, 0.6] },
      { id: 'third', shape: 'puck', mass: 1.5, at: [-0.4, -0.4] },
    ],
    clips: { burst: { phases: [{ dur: 0.5 }, { dur: 1, kick: { east: [12, 0], north: [0, 9], third: [-12, -9] } }] } },
    ...over,
  });

  it('blows a shell at rest into pieces whose momenta add to zero', () => {
    expect(checkFlight(shell())).toEqual([]);
    expect(flightAt(shell(), [['burst', 0.4]]).bodies.third.vx).toBe(0);
    const s = flightAt(shell(), [['burst', 1.5]]);
    expect(s.bodies.east.vx).toBeCloseTo(6);
    expect(s.bodies.north.vy).toBeCloseTo(3);
    expect(Math.hypot(s.bodies.third.vx, s.bodies.third.vy)).toBeCloseTo(10);
    expect((Math.atan2(-s.bodies.third.vy, -s.bodies.third.vx) * 180) / Math.PI).toBeCloseTo(36.87, 1);
    const p = momentumOf(shell(), s);
    expect(p.total[0]).toBeCloseTo(0);
    expect(p.total[1]).toBeCloseTo(0);
    expect(s.hit!.t).toBeCloseTo(0.5);
  });

  it('refuses an explosion that makes momentum, and collisions it cannot work out', () => {
    const lopsided = shell({ clips: { burst: { phases: [{ dur: 1, kick: { east: [12, 0], north: [0, 9] } }] } } });
    expect(checkFlight(lopsided).join(' ')).toMatch(/impulses of an explosion must add up to zero/);
    expect(checkFlight(shell({ bodies: [...shell().bodies.slice(0, 2), { id: 'third', at: [-0.4, -0.4] }] })).join(' ')).toMatch(/kicks body "third", which has no mass/);
    expect(checkFlight(crossroads({ gravity: 9.81, scene: 'ground' })).join(' ')).toMatch(/no gravity and no stream/);
    expect(checkFlight(crossroads({ collisions: { restitution: 1.2 } })).join(' ')).toMatch(/restitution of a collision is from 0 to 1/);
    expect(checkFlight(glance({ bodies: [glance().bodies[0], { ...glance().bodies[1], at: [-2.8, 0.3] }] })).join(' ')).toMatch(/start inside each other/);
    expect(checkFlight(crossroads({ readout: {} })).join(' ')).toMatch(/one or the other/);
    expect(checkFlight(crossroads({ bodies: [{ id: 'a', shape: 'car', at: [0, 0] }, crossroads().bodies[1]] })).join(' ')).toMatch(/is a car, so it needs a mass/);
  });
});
