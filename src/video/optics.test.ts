import { describe, expect, it } from 'vitest';
import { checkOptics, checkScript, type Explainer, type OpticsEl } from './script.ts';
import { beamOf, describeImage, focalOf, imageAt, imagePlace, isMirror, opticsAt, outgoingAt, raysOf, sagOf } from './optics.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

// The lesson's candle: 4.0 cm tall, 30 cm from a concave mirror of focal length 10 cm.
const concave = (over: Partial<OpticsEl> = {}): OpticsEl => ({
  kind: 'optics',
  id: 'm',
  device: 'concave',
  f: 10,
  object: { at: 30, height: 4 },
  view: [40, 30],
  clips: { hold: { phases: [{ dur: 6 }] }, in: { phases: [{ dur: 4, to: 15 }, { dur: 4 }] }, close: { phases: [{ dur: 4, to: 6 }] } },
  ...over,
});

// The lesson's security mirror: a shopper 30 cm from a convex mirror of focal length 15 cm.
const convex = (over: Partial<OpticsEl> = {}): OpticsEl => concave({ id: 'v', device: 'convex', f: 15, object: { at: 30, height: 6 }, ...over });

// A converging lens of focal length 10 cm, and a diverging lens of the same strength.
const converging = (over: Partial<OpticsEl> = {}): OpticsEl => concave({ id: 'l', device: 'converging', view: [40, 40], ...over });
const diverging = (over: Partial<OpticsEl> = {}): OpticsEl => concave({ id: 'd', device: 'diverging', view: [40, 40], ...over });

/** The rays of an element's object where it stands at the start, by name. */
const rays = (el: OpticsEl, at = el.object!.at) => Object.fromEntries(raysOf(el, at, el.object!.height).map((ray) => [ray.id, ray]));

describe('the image of a mirror or a lens', () => {
  it('gives a convex mirror and a diverging lens a negative focal length', () => {
    expect(focalOf(concave())).toBe(10);
    expect(focalOf(convex())).toBe(-15);
    expect(focalOf(converging())).toBe(10);
    expect(focalOf(diverging())).toBe(-10);
    expect([isMirror(concave()), isMirror(convex()), isMirror(converging()), isMirror(diverging())]).toEqual([true, true, false, false]);
  });

  it('follows the mirror equation in the three examples of the lesson', () => {
    // A candle 30 cm from a concave mirror of focal length 10 cm: 15 cm in front, upside down, 2.0 cm tall.
    const candle = imageAt(10, 30, 4);
    expect(candle.di).toBeCloseTo(15, 9);
    expect(candle.m).toBeCloseTo(-0.5, 9);
    expect(candle.hi).toBeCloseTo(-2, 9);
    expect([candle.real, candle.upright, candle.size]).toEqual([true, false, 'smaller']);
    // A face 12 cm from a makeup mirror of focal length 20 cm: 30 cm behind it, upright, 2.5 times as large.
    const face = imageAt(20, 12);
    expect(face.di).toBeCloseTo(-30, 9);
    expect(face.m).toBeCloseTo(2.5, 9);
    expect([face.real, face.upright, face.size]).toEqual([false, true, 'larger']);
    // A shopper 30 cm from a convex mirror of focal length 15 cm: 10 cm behind it, upright, a third of the size.
    const shopper = imageAt(-15, 30);
    expect(shopper.di).toBeCloseTo(-10, 9);
    expect(shopper.m).toBeCloseTo(1 / 3, 9);
    expect([shopper.real, shopper.upright, shopper.size]).toEqual([false, true, 'smaller']);
    for (const [f, at] of [[10, 30], [20, 12], [-15, 30], [10, 13.7]]) expect(1 / at + 1 / imageAt(f, at).di!).toBeCloseTo(1 / f, 12);
  });

  it('changes as the object moves towards a concave mirror', () => {
    expect(describeImage(imageAt(10, 30))).toBe('Real, upside down, smaller');
    expect(describeImage(imageAt(10, 20))).toBe('Real, upside down, the same size');
    expect(describeImage(imageAt(10, 15))).toBe('Real, upside down, larger');
    expect(describeImage(imageAt(10, 10))).toBe('No image: the rays leave parallel');
    expect(describeImage(imageAt(10, 6))).toBe('Virtual, upright, larger');
    // At the focus there is no image at all.
    expect(imageAt(10, 10)).toEqual({ di: null, m: null, hi: null, real: false, upright: false, size: null });
  });

  it('is always virtual, upright and smaller for a convex mirror or a diverging lens', () => {
    for (const at of [2, 10, 15, 40, 400]) {
      const image = imageAt(-15, at);
      expect(describeImage(image)).toBe('Virtual, upright, smaller');
      // It lies between the mirror and the focus.
      expect(image.di!).toBeLessThan(0);
      expect(image.di!).toBeGreaterThan(-15);
    }
  });

  it('is in front of a mirror when it is real, and beyond a lens', () => {
    expect(imagePlace(concave(), imageAt(10, 30))).toBeCloseTo(-15, 9);
    expect(imagePlace(converging(), imageAt(10, 30))).toBeCloseTo(15, 9);
    // A virtual image is behind a mirror, and on the object's side of a lens.
    expect(imagePlace(concave(), imageAt(10, 6))).toBeCloseTo(15, 9);
    expect(imagePlace(converging(), imageAt(10, 6))).toBeCloseTo(-15, 9);
    expect(imagePlace(concave(), imageAt(10, 10))).toBeNull();
  });
});

describe('the three rays', () => {
  it('all pass through the top of a real image', () => {
    for (const el of [concave(), converging()]) {
      const image = imageAt(focalOf(el), 30, 4);
      const place = imagePlace(el, image)!;
      const all = raysOf(el, 30, 4);
      expect(all.map((ray) => ray.id)).toEqual(['parallel', 'focal', 'central']);
      for (const ray of all) expect(outgoingAt(el, ray, place)).toBeCloseTo(image.hi!, 9);
    }
  });

  it('all leave as if from the top of a virtual image', () => {
    for (const el of [concave({ object: { at: 6, height: 4 } }), convex(), converging({ object: { at: 6, height: 4 } }), diverging()]) {
      const { at, height } = el.object!;
      const image = imageAt(focalOf(el), at, height);
      expect(image.real).toBe(false);
      const place = imagePlace(el, image)!;
      for (const ray of raysOf(el, at, height)) expect(outgoingAt(el, ray, place)).toBeCloseTo(image.hi!, 9);
    }
  });

  it('are the rays of the lesson for a mirror', () => {
    const { parallel, focal, central } = rays(concave());
    // Parallel to the axis, then through the focus, 10 cm in front of the mirror.
    expect([parallel.inSlope, parallel.y]).toEqual([0, 4]);
    expect(outgoingAt(concave(), parallel, -10)).toBeCloseTo(0, 9);
    // Through the focus, then parallel to the axis.
    expect(focal.through).toBe(10);
    expect(4 + focal.inSlope * 20).toBeCloseTo(0, 9);
    expect(focal.outSlope).toBeCloseTo(0, 9);
    expect(focal.y).toBeCloseTo(-2, 9);
    // Through the centre of curvature, and back along its own path: it climbs as fast on the way back as it fell on the way in.
    expect(central.through).toBe(20);
    expect(4 + central.inSlope * 10).toBeCloseTo(0, 9);
    expect(central.outSlope).toBeCloseTo(-central.inSlope, 9);
    expect(outgoingAt(concave(), central, -20)).toBeCloseTo(0, 9);
    expect(outgoingAt(concave(), central, -30)).toBeCloseTo(4, 9);
  });

  it('are the rays of the lesson for a lens', () => {
    const el = converging();
    const { parallel, focal, central } = rays(el);
    // Parallel, then through the focus on the far side.
    expect(outgoingAt(el, parallel, 10)).toBeCloseTo(0, 9);
    // Through the focus on the near side, then parallel.
    expect(focal.outSlope).toBeCloseTo(0, 9);
    // Through the centre of the lens, and straight on.
    expect(central.y).toBe(0);
    expect(central.outSlope).toBeCloseTo(central.inSlope, 9);
    expect(central.through).toBeNull();
    // A diverging lens: the parallel ray leaves as if from the focus on the near side.
    const apart = rays(diverging()).parallel;
    expect(outgoingAt(diverging(), apart, -10)).toBeCloseTo(0, 9);
    expect(apart.outSlope).toBeGreaterThan(0);
  });

  it('head for the focus and the centre behind a convex mirror', () => {
    const el = convex();
    const { parallel, focal, central } = rays(el);
    // The parallel ray leaves as if from the focus, 15 cm behind the mirror.
    expect(outgoingAt(el, parallel, 15)).toBeCloseTo(0, 9);
    // The other two are aimed at points behind the mirror, which are negative distances in front.
    expect([focal.through, central.through]).toEqual([-15, -30]);
    expect(focal.y + focal.inSlope * 15).toBeCloseTo(0, 9);
    expect(focal.outSlope).toBeCloseTo(0, 9);
    expect(central.y + central.inSlope * 30).toBeCloseTo(0, 9);
  });

  it('leave out a ray that cannot be drawn', () => {
    // An object at the focus has no ray through the focus, and one at C has no ray through C.
    expect(raysOf(concave(), 10, 4).map((ray) => ray.id)).toEqual(['parallel', 'central']);
    expect(raysOf(concave(), 20, 4).map((ray) => ray.id)).toEqual(['parallel', 'focal']);
    expect(raysOf(converging(), 10, 4).map((ray) => ray.id)).toEqual(['parallel', 'central']);
    // At the focus the rays that are left leave parallel to each other.
    const [a, b] = raysOf(concave(), 10, 4);
    expect(a.outSlope).toBeCloseTo(b.outSlope, 9);
  });

  it('bring a beam parallel to the axis to the focus', () => {
    const el = concave({ object: undefined });
    const beam = beamOf(el, [-6, -3, 0, 3, 6], 40);
    for (const ray of beam) expect(outgoingAt(el, ray, -10)).toBeCloseTo(0, 9);
    expect(beam[2].outSlope).toBe(0);
    // A convex mirror spreads it, as if from the focus behind.
    const wide = convex({ object: undefined });
    for (const ray of beamOf(wide, [-6, 6], 40)) expect(outgoingAt(wide, ray, 15)).toBeCloseTo(0, 9);
    // A converging lens brings it to the focus beyond.
    const lens = converging({ object: undefined });
    for (const ray of beamOf(lens, [-6, 6], 40)) expect(outgoingAt(lens, ray, 10)).toBeCloseTo(0, 9);
  });
});

describe('the shape of a mirror', () => {
  it('is an arc of a circle of twice the focal length', () => {
    // Concave: the edges lean towards the object. 20 − √(20² − 12²) = 4.
    expect(sagOf(concave(), 0)).toBeCloseTo(0, 12);
    expect(sagOf(concave(), 12)).toBeCloseTo(-4, 9);
    expect(sagOf(concave(), -12)).toBeCloseTo(-4, 9);
    // Convex: they lean away. 30 − √(30² − 18²) = 6.
    expect(sagOf(convex(), 18)).toBeCloseTo(6, 9);
    // A lens is drawn thin.
    expect(sagOf(converging(), 8)).toBe(0);
  });
});

describe('an object that slides', () => {
  it('starts and stops gently, and the image follows it', () => {
    const el = concave();
    expect(opticsAt(el)).toEqual({ time: 0, at: 30 });
    expect(opticsAt(el, [['hold', 3]])).toEqual({ time: 3, at: 30 });
    // Halfway through the slide, it is halfway there.
    expect(opticsAt(el, [['in', 2]]).at).toBeCloseTo(22.5, 9);
    expect(opticsAt(el, [['in', 1]]).at).toBeGreaterThan(30 - 15 / 4);
    const there = opticsAt(el, [['in', 8]]);
    expect(there.at).toBeCloseTo(15, 9);
    expect(there.time).toBeCloseTo(8, 9);
    expect(describeImage(imageAt(10, there.at))).toBe('Real, upside down, larger');
    const close = opticsAt(el, [['in', 8], ['close', 4]]);
    expect(close.at).toBeCloseTo(6, 9);
    expect(describeImage(imageAt(10, close.at))).toBe('Virtual, upright, larger');
  });
});

describe('the checks of an optics element', () => {
  it('passes the pictures of the lesson', () => {
    expect(checkOptics(concave())).toEqual([]);
    expect(checkOptics(convex())).toEqual([]);
    expect(checkOptics(converging())).toEqual([]);
    expect(checkOptics(concave({ object: undefined, clips: { a: { phases: [{ dur: 5 }] } } }))).toEqual([]);
  });

  it('finds what a picture cannot have', () => {
    expect(checkOptics(concave({ f: -10 })).join(' ')).toContain('focal length is a positive number');
    expect(checkOptics(concave({ view: [0, 10] })).join(' ')).toContain('room in front');
    expect(checkOptics(concave({ object: { at: 0, height: 4 } })).join(' ')).toContain('in front of the mirror or lens');
    expect(checkOptics(concave({ object: { at: 50, height: 4 } })).join(' ')).toContain('starts outside the picture');
    expect(checkOptics(concave({ object: { at: 30, height: 0 } })).join(' ')).toContain('height above zero');
    expect(checkOptics(concave({ axis: 1.2 })).join(' ')).toContain('`axis`');
    expect(checkOptics(concave({ aperture: 0 })).join(' ')).toContain('aperture');
    expect(checkOptics(concave({ poster: 'nothing' })).join(' ')).toContain('poster clip "nothing"');
    expect(checkOptics(concave({ poster: 'in', posterAt: 2 })).join(' ')).toContain('`posterAt`');
    expect(checkOptics(concave({ thumb: ['image', 'flux' as 'image'] })).join(' ')).toContain('thumbnail part "flux"');
  });

  it('finds clips that cannot be played', () => {
    expect(checkOptics(concave({ clips: { none: { phases: [] } } })).join(' ')).toContain('clip "none" has no phases');
    expect(checkOptics(concave({ clips: { zero: { phases: [{ dur: 0 }] } } })).join(' ')).toContain('a phase with no duration');
    expect(checkOptics(concave({ clips: { far: { phases: [{ dur: 2, to: 60 }] } } })).join(' ')).toContain('out of the picture');
    expect(checkOptics(concave({ clips: { through: { phases: [{ dur: 2, to: 0 }] } } })).join(' ')).toContain('through the mirror or lens');
    expect(checkOptics(concave({ object: undefined, clips: { in: { phases: [{ dur: 2, to: 10 }] } } })).join(' ')).toContain('slides an object, and the picture has none');
  });
});

describe('an optics element in a video', () => {
  const video = (el: OpticsEl, show: string[], play: string): Explainer => ({
    id: 'test',
    lessonId: 'test',
    title: 'Mirrors',
    summary: 'A test.',
    scenes: [{ layout: 'center', main: [el], lines: [{ say: 'Here is a mirror.', show }, { say: 'Watch the object slide.', play }] }],
  });

  it('passes the script check, and a part that does not exist does not', () => {
    expect(checkScript(video(concave(), ['m', 'm.points', 'm.parallel', 'm.focal', 'm.central', 'm.image', 'm.values', 'm.kind'], 'm.in'))).toEqual([]);
    expect(checkScript(video(concave({ object: undefined, clips: { a: { phases: [{ dur: 5 }] } } }), ['m', 'm.beam', 'm.points'], 'm.a'))).toEqual([]);
    expect(checkScript(video(concave(), ['m', 'm.flux'], 'm.in')).join(' ')).toContain('has no part "flux"');
    expect(checkScript(video(concave({ f: 0 }), ['m'], 'm.in')).join(' ')).toContain('optics "m"');
  });

  it('plays its clips on the timeline', () => {
    const el = concave();
    const tl = compile(video(el, ['m', 'm.image'], 'm.in'), { '0.0': 2, '0.1': 2 });
    expect(clipSeconds(el, 'in')).toBe(8);
    const play = tl.scenes[0].events.find((ev) => ev.kind === 'play');
    expect(play).toBeDefined();
    const st = stateAt(tl, play!.t + 2).els.m;
    expect(st.plays).toEqual([['in', 2]]);
    expect(opticsAt(el, st.plays).at).toBeCloseTo(22.5, 9);
  });
});
