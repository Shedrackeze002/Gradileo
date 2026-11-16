import { describe, expect, it } from 'vitest';
import { checkCircle, checkScript, type CircleEl, type Explainer } from './script.ts';
import { centripetal, circleAt, speedRound } from './circle.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

// The lesson's ball on a string: 0.5 kg at 4 m/s round a circle of radius 0.8 m, on a table.
const ball = (over: Partial<CircleEl> = {}): CircleEl => ({
  kind: 'circle',
  id: 'c',
  bodies: [{ id: 'ball', mass: 0.5, r: 0.8, speed: 4 }],
  by: 'string',
  clips: {
    turn: { phases: [{ dur: 2 }] },
    faster: { phases: [{ dur: 2, speed: { ball: 8 } }, { dur: 1 }] },
    cut: { phases: [{ dur: 0.5, release: ['ball'], note: 'The string breaks' }] },
    again: { reset: true, phases: [{ dur: 1, freeze: true }] },
  },
  ...over,
});

// The lesson's ball in a vertical circle of radius 1 m, which passes the top at 5 m/s.
const upright = (at: number, speed: number): CircleEl => ({
  kind: 'circle',
  id: 'c',
  bodies: [{ id: 'ball', mass: 0.5, r: 1, speed, at }],
  by: 'string',
  vertical: true,
  clips: { swing: { phases: [{ dur: 3 }] } },
});

describe('circular motion', () => {
  it('finds the speed, the acceleration and the force towards the centre', () => {
    // A child 1.5 m from the centre of a roundabout that turns once in 2.5 s.
    expect(speedRound(1.5, 2.5)).toBeCloseTo(3.77, 2);
    // A car at 20 m/s on a bend of radius 80 m.
    expect(centripetal(20, 80)).toBe(5);
    const s = circleAt(ball()).bodies.ball;
    expect(s.ac).toBeCloseTo(20, 9);
    expect(s.forces).toEqual([{ kind: 'tension', name: 'Tension', n: 10, angle: 180 }]);
    expect(s.net).toEqual({ n: 10, angle: 180 });
    // The velocity lies along the tangent, at right angles to the acceleration.
    expect(s.v).toEqual([0, 4]);
    expect(s.v[0] * s.a[0] + s.v[1] * s.a[1]).toBeCloseTo(0, 9);
    expect(s.period).toBeCloseTo((2 * Math.PI * 0.8) / 4, 9);
  });

  it('keeps a steady speed round the circle, and counts the turns', () => {
    const period = (2 * Math.PI * 0.8) / 4;
    const el = ball({ clips: { turn: { phases: [{ dur: period * 2.25 }] } } });
    const s = circleAt(el, [['turn', period * 2.25]]).bodies.ball;
    // Two and a quarter turns on: at the top of the circle, moving to the left.
    expect(s.x).toBeCloseTo(0, 6);
    expect(s.y).toBeCloseTo(0.8, 6);
    expect(s.v[0]).toBeCloseTo(-4, 6);
    expect(s.speed).toBe(4);
    expect(s.turns).toBeCloseTo(2.25, 6);
    // A mark is left every eighth of a turn, and one turn's worth is kept.
    expect(s.marks).toHaveLength(8);
    expect(Math.hypot(s.marks[0].v[0], s.marks[0].v[1])).toBeCloseTo(4, 6);
    // Clockwise, it would be at the bottom.
    expect(circleAt({ ...el, clockwise: true }, [['turn', period * 2.25]]).bodies.ball.y).toBeCloseTo(-0.8, 6);
    // Slow motion takes longer to show the same motion.
    const slow = ball({ clips: { turn: { phases: [{ dur: 2, slow: 3 }] } } });
    expect(clipSeconds(slow, 'turn')).toBe(6);
    expect(circleAt(slow, [['turn', 3]]).bodies.ball.turns).toBeCloseTo(circleAt(ball(), [['turn', 1]]).bodies.ball.turns, 9);
  });

  it('needs four times the force at twice the speed', () => {
    const s = circleAt(ball(), [['faster', 3]]).bodies.ball;
    expect(s.speed).toBe(8);
    expect(s.forces[0].n).toBeCloseTo(40, 9);
    // Half way through the change, it is half way between the speeds.
    expect(circleAt(ball(), [['faster', 1]]).bodies.ball.speed).toBeCloseTo(6, 9);
  });

  it('lets a body go along the tangent', () => {
    const s = circleAt(ball(), [['cut', 0.5]]);
    const b = s.bodies.ball;
    // It started at the right of the circle moving up the picture: it keeps that velocity.
    expect(b.free).toBe(true);
    expect([b.x, b.y]).toEqual([0.8, 2]);
    expect(b.v).toEqual([0, 4]);
    expect(b.forces).toEqual([]);
    expect(b.net.n).toBe(0);
    expect(s.note).toBe('The string breaks');
    // A clip that resets puts it back on its circle.
    const back = circleAt(ball(), [['cut', 0.5], ['again', 1]]).bodies.ball;
    expect([back.free, back.x, back.y]).toEqual([false, 0.8, 0]);
  });

  it('changes speed round an upright circle, and pulls hardest at the bottom', () => {
    // At the top the weight helps to turn the ball: the tension is m v² ÷ r − m g.
    const top = circleAt(upright(90, 5)).bodies.ball;
    expect(top.forces[0].n).toBeCloseTo(12.5 - 4.905, 6);
    expect(top.forces[1]).toEqual({ kind: 'weight', name: 'Weight', n: 4.905, angle: -90 });
    expect(top.net.n).toBeCloseTo(12.5, 6);
    // Half a turn later it is at the bottom, and energy has been conserved: v² = 5² + 4 g r.
    let t = 0;
    let s = top;
    while (s.angle < 270 && t < 3) s = circleAt(upright(90, 5), [['swing', (t += 0.001)]]).bodies.ball;
    expect(s.speed ** 2).toBeCloseTo(25 + 4 * 9.81, 1);
    expect(s.forces[0].n).toBeCloseTo((0.5 * (25 + 4 * 9.81)) / 1 + 4.905, 0);
    // Started from the bottom at that speed, it is back to 5 m/s at the top.
    const up = Math.sqrt(25 + 4 * 9.81);
    t = 0;
    s = circleAt(upright(-90, up)).bodies.ball;
    while (s.angle < 90 && t < 3) s = circleAt(upright(-90, up), [['swing', (t += 0.001)]]).bodies.ball;
    expect(s.speed).toBeCloseTo(5, 1);
  });

  it('reports a circle that cannot be drawn', () => {
    expect(checkCircle(ball())).toEqual([]);
    expect(checkCircle(upright(90, 5))).toEqual([]);
    expect(checkCircle(ball({ bodies: [{ id: 'a', mass: 0, r: 1, speed: 1 }], clips: {} }))[0]).toMatch(/mass above zero/);
    expect(checkCircle(ball({ bodies: [{ id: 'a', mass: 1, r: 1 }], clips: {} }))[0]).toMatch(/a speed or a period/);
    expect(checkCircle(ball({ bodies: [{ id: 'a', mass: 1, r: 1, speed: 1, period: 2 }], clips: {} }))[0]).toMatch(/a speed or a period/);
    expect(checkCircle(ball({ bodies: [{ id: 'trail', mass: 1, r: 1, speed: 1 }], clips: {} }))[0]).toMatch(/name of a part/);
    expect(checkCircle(ball({ poster: 'fly' }))[0]).toMatch(/no clip "fly"/);
    expect(checkCircle(ball({ clips: { go: { phases: [{ dur: 1, release: ['moon'] }] } } }))[0]).toMatch(/names no body "moon"/);
    // Too slow at the top of an upright circle, the ball would leave it.
    expect(checkCircle(upright(90, 3))[0]).toMatch(/too slow to stay on its circle at the top \(it needs 3.13 m\/s there\)/);
    expect(checkCircle(upright(-90, 6))[0]).toMatch(/too slow/);
    expect(checkCircle({ ...upright(90, 5), clips: { go: { phases: [{ dur: 1, release: ['ball'] }] } } })[0]).toMatch(/gravity sets the speed/);
    expect(() => circleAt(ball(), [['fly', 1]])).toThrow(/no clip "fly"/);
  });

  it('plays in a script, with parts that can be shown one at a time', () => {
    const x: Explainer = {
      id: 'circle-test',
      lessonId: 'p20-3-1',
      title: 'Circles',
      summary: 'A test.',
      scenes: [
        {
          layout: 'center',
          main: [ball()],
          lines: [
            { say: 'A ball goes round on a string.', show: ['c', 'c.velocity', 'c.radius'] },
            { say: 'The string pulls it towards the centre.', show: ['c.force', 'c.accel'], focus: 'c.ball' },
            { say: 'Now the string breaks.', hide: 'c.radius', show: 'c.trail', play: 'c.cut' },
          ],
        },
      ],
    };
    expect(checkScript(x)).toEqual([]);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such part.', show: ['c', 'c.orbit'] }] }] })[0]).toMatch(/circle "c" has no part "orbit"/);
    const tl = compile(x, { '0.0': 3, '0.1': 2, '0.2': 2 });
    const during = stateAt(tl, tl.lines[2].start + 0.25).els.c;
    expect(circleAt(ball(), during.plays).bodies.ball.y).toBeCloseTo(1, 6);
  });
});
