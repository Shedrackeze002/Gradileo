import { describe, expect, it } from 'vitest';
import { checkFlight, checkScript, type Explainer, type FlightEl } from './script.ts';
import { carried, fastest, flightAt, landingTime } from './flight.ts';
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
