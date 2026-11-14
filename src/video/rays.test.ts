import { describe, expect, it } from 'vitest';
import { checkRays, checkScript, type Explainer, type RaysEl } from './script.ts';
import { fronts, raysAt, refraction, type Piece } from './rays.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

const mirror = (over: Partial<RaysEl> = {}): RaysEl => ({ kind: 'rays', id: 'r', surface: 'mirror', angle: 40, clips: { turn: { phases: [{ dur: 2, to: 60 }, { dur: 2, to: 10 }] } }, ...over });
// Light travels two thirds as fast in the glass as in the air.
const glass = (over: Partial<RaysEl> = {}): RaysEl => ({ kind: 'rays', id: 'r', surface: 'boundary', angle: 40, speeds: [3, 2], media: ['Air', 'Glass'], clips: { turn: { phases: [{ dur: 2, to: 0 }] }, march: { phases: [{ dur: 4, slow: 2, note: 'Slow motion' }] } }, ...over });
const RAD = Math.PI / 180;

describe('rays: reflection', () => {
  it('reflects at the angle of incidence, whatever the ray is turned to', () => {
    expect(raysAt(mirror())).toMatchObject({ angle: 40, out: 40, time: 0 });
    const end = raysAt(mirror(), [['turn', 2]]);
    expect(end.angle).toBeCloseTo(60);
    expect(end.out).toBeCloseTo(60);
    const mid = raysAt(mirror(), [['turn', 3]]);
    expect(mid.angle).toBeCloseTo(35);
    expect(mid.out).toBe(mid.angle);
    expect(raysAt(mirror(), [['turn', 4]]).angle).toBeCloseTo(10);
  });

  it('turns the ray gently: slowly at each end of a phase', () => {
    const a = raysAt(mirror(), [['turn', 0.2]]).angle - 40;
    const b = raysAt(mirror(), [['turn', 1.1]]).angle - raysAt(mirror(), [['turn', 0.9]]).angle;
    expect(a).toBeGreaterThan(0);
    expect(a).toBeLessThan(b);
  });
});

describe('rays: refraction', () => {
  it('bends towards the normal into a slower material, and away into a faster one', () => {
    // sin r = sin 40° × 2 ÷ 3.
    expect(refraction(40, 3, 2)).toBeCloseTo(25.37, 1);
    expect(raysAt(glass()).out).toBeCloseTo(25.37, 1);
    expect(refraction(25.374, 2, 3)).toBeCloseTo(40, 1);
    expect(refraction(30, 1, 1)).toBeCloseTo(30);
  });

  it('does not bend a ray along the normal', () => {
    expect(refraction(0, 3, 2)).toBe(0);
    expect(raysAt(glass(), [['turn', 2]]).out).toBeCloseTo(0);
  });

  it('lets no light cross past the critical angle into a faster material', () => {
    expect(refraction(41, 2, 3)).toBeCloseTo(79.8, 0);
    expect(refraction(42, 2, 3)).toBeNull();
    expect(raysAt(glass({ speeds: [2, 3], angle: 60 })).out).toBeNull();
  });

  it('plays slow motion at the phase’s rate, with its note while it plays', () => {
    expect(clipSeconds(glass(), 'march')).toBe(8);
    const mid = raysAt(glass(), [['march', 3]]);
    expect(mid.time).toBeCloseTo(1.5);
    expect(mid.note).toBe('Slow motion');
    expect(raysAt(glass(), [['march', 8]])).toMatchObject({ time: 4, note: undefined });
  });
});

describe('rays: wavefronts', () => {
  // Where a piece meets the surface (y = 0), if it does.
  const onSurface = (pieces: Piece[]) => pieces.flatMap(([x1, y1, x2, y2]) => [[x1, y1], [x2, y2]].filter(([, y]) => Math.abs(y) < 1e-6).map(([x]) => x));
  const length = ([x1, y1, x2, y2]: Piece) => Math.hypot(x2 - x1, y2 - y1);
  // The distance between neighbouring whole fronts, measured along the direction they travel.
  const spacing = (pieces: Piece[], dx: number, dy: number, width: number) => {
    const whole = pieces.filter((p) => Math.abs(length(p) - width) < 1e-6).map(([x1, y1]) => x1 * dx + y1 * dy).sort((a, b) => a - b);
    return whole.slice(1).map((v, k) => v - whole[k]);
  };

  it('keeps each front in one piece across a boundary', () => {
    const f = fronts(40, refraction(40, 3, 2), false, 90, 30, 2 / 3, 0.3, 300);
    const [a, b] = [onSurface(f.incoming).sort((x, y) => x - y), onSurface(f.outgoing).sort((x, y) => x - y)];
    expect(a.length).toBeGreaterThan(1);
    expect(b).toHaveLength(a.length);
    a.forEach((x, k) => expect(b[k]).toBeCloseTo(x));
  });

  it('puts the fronts closer together in the slower material, by the ratio of the speeds', () => {
    const r = refraction(40, 3, 2)!;
    const f = fronts(40, r, false, 90, 30, 2 / 3, 0.7, 400);
    const before = spacing(f.incoming, Math.sin(40 * RAD), -Math.cos(40 * RAD), 90);
    const after = spacing(f.outgoing, Math.sin(r * RAD), -Math.cos(r * RAD), (90 * Math.cos(r * RAD)) / Math.cos(40 * RAD));
    expect(before.length).toBeGreaterThan(3);
    expect(after.length).toBeGreaterThan(3);
    for (const g of before) expect(g).toBeCloseTo(30);
    for (const g of after) expect(g).toBeCloseTo(20);
  });

  it('keeps the fronts as far apart after a mirror, and joined on it', () => {
    const f = fronts(50, 50, true, 90, 30, 1, 0.1, 400);
    for (const g of spacing(f.outgoing, Math.sin(50 * RAD), Math.cos(50 * RAD), 90)) expect(g).toBeCloseTo(30);
    const [a, b] = [onSurface(f.incoming).sort((x, y) => x - y), onSurface(f.outgoing).sort((x, y) => x - y)];
    expect(a.length).toBeGreaterThan(1);
    a.forEach((x, k) => expect(b[k]).toBeCloseTo(x));
    // Nothing is drawn behind the mirror.
    for (const [, y1, , y2] of [...f.incoming, ...f.outgoing]) expect(Math.min(y1, y2)).toBeGreaterThanOrEqual(-1e-6);
  });

  it('marches the fronts along by one gap for each whole step', () => {
    const at = (shift: number) => fronts(30, refraction(30, 3, 2), false, 90, 30, 2 / 3, shift, 300);
    expect(at(1.25)).toEqual(at(0.25));
    expect(at(0.5)).not.toEqual(at(0.25));
  });

  it('sends the beam straight on along the normal, with level fronts', () => {
    const f = fronts(0, 0, false, 90, 30, 2 / 3, 0, 200);
    for (const [x1, y1, x2, y2] of [...f.incoming, ...f.outgoing]) {
      expect(y1).toBeCloseTo(y2);
      expect(Math.abs(x2 - x1)).toBeCloseTo(90);
    }
    expect(f.incoming.every(([, y]) => y >= -1e-9)).toBe(true);
    expect(f.outgoing.every(([, y]) => y <= 1e-9)).toBe(true);
  });
});

describe('rays: checks', () => {
  it('reports rays that cannot be drawn', () => {
    expect(checkRays(mirror())).toEqual([]);
    expect(checkRays(glass())).toEqual([]);
    expect(checkRays(mirror({ angle: 95 }))[0]).toMatch(/0 to 85/);
    expect(checkRays(glass({ speeds: undefined }))[0]).toMatch(/two speeds/);
    expect(checkRays(mirror({ speeds: [3, 2] }))[0]).toMatch(/no second material/);
    expect(checkRays(glass({ behind: true }))[0]).toMatch(/only a mirror/);
    expect(checkRays(mirror({ clips: { turn: { phases: [{ dur: 1, to: 120 }] } } }))[0]).toMatch(/outside 0 to 85/);
  });

  it('plays in a script, with parts that can be shown and hidden on their own', () => {
    const x: Explainer = {
      id: 'rays-test',
      lessonId: 'p10-4-4',
      title: 'Rays',
      summary: 'A test.',
      scenes: [
        {
          layout: 'center',
          main: [mirror()],
          lines: [
            { say: 'A ray lands on a mirror.', show: ['r', 'r.normal'] },
            { say: 'The angles match as it turns.', show: 'r.angles', play: 'r.turn' },
            { say: 'Now without the normal.', hide: 'r.normal' },
          ],
        },
      ],
    };
    expect(checkScript(x)).toEqual([]);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such part.', show: ['r', 'r.mirror'] }] }] })[0]).toMatch(/rays "r" has no part "mirror"/);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such clip.', show: 'r', play: 'r.spin' }] }] })[0]).toMatch(/rays "r" has no clip "spin"/);
    const tl = compile(x, { '0.0': 2, '0.1': 2, '0.2': 2 });
    const during = stateAt(tl, tl.lines[1].start + 2).els.r;
    expect(raysAt(mirror(), during.plays).angle).toBeCloseTo(60);
    const end = stateAt(tl, tl.duration - 0.05).els.r;
    expect(end.p).toBeGreaterThan(0);
    expect(end.parts.normal ?? 0).toBeLessThan(0.1);
    expect(end.parts.angles).toBeGreaterThan(0.9);
  });
});
