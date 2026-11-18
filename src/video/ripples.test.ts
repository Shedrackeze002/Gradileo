import { describe, expect, it } from 'vitest';
import { checkRipples, checkScript, type Explainer, type RippleSource, type RipplesEl } from './script.ts';
import { arrival, crestsOf, loudness, received, ripplesAt, sourceAt, type Point } from './ripples.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

// Waves of 2 Hz that travel at 6 m/s: 3 m from crest to crest when the source is at rest.
const still: RippleSource = { id: 's', at: [0, 0], frequency: 2 };
// The same source at (−4, 0), moving to the right at 2 m/s.
const mover: RippleSource = { id: 's', at: [-4, 0], frequency: 2, velocity: [2, 0] };
const el = (over: Partial<RipplesEl> = {}): RipplesEl => ({ kind: 'ripples', id: 'r', view: [-20, -10, 20, 10], speed: 6, sources: [still], clips: { go: { phases: [{ dur: 10 }] } }, ...over });
const radii = (e: RipplesEl, time: number) => crestsOf(e, e.sources[0], time).map((c) => c.radius);

describe('ripples: crests spread from where the source was', () => {
  it('sends a crest a quarter of a period after each whole period, and grows it at the speed of the waves', () => {
    // After 1 s the crests sent at 0.125 s and 0.625 s are 5.25 m and 2.25 m out, newest first.
    const crests = crestsOf(el(), still, 1);
    expect(crests.map((c) => c.radius)).toEqual([expect.closeTo(2.25), expect.closeTo(5.25)]);
    expect(crests.every((c) => c.centre[0] === 0 && c.centre[1] === 0)).toBe(true);
    // A source that starts at time 0 has sent nothing before its first crest.
    expect(crestsOf(el(), still, 0.1)).toEqual([]);
  });

  it('fills the picture from the start when the waves have been spreading for ever', () => {
    // Crests 3 m apart, out to the far corner (22.4 m from the source): 2.25 m, 5.25 m, … 20.25 m.
    const all = radii(el({ full: true }), 0);
    expect(all).toHaveLength(7);
    expect(all[0]).toBeCloseTo(2.25);
    expect(all[6]).toBeCloseTo(20.25);
  });

  it('draws one crest in so many with `every`', () => {
    const some = radii(el({ full: true, every: 2 }), 0);
    // Crests −2, −4 and −6: 6 m apart.
    expect(some).toEqual([expect.closeTo(5.25), expect.closeTo(11.25), expect.closeTo(17.25)]);
  });

  it('centres each crest of a moving source where the source was when it sent that crest', () => {
    const crests = crestsOf(el({ sources: [mover] }), mover, 2);
    // The newest crest left at 1.625 s, when the source was at −0.75 m.
    expect(crests[0].centre[0]).toBeCloseTo(-0.75);
    expect(crests[0].radius).toBeCloseTo(2.25);
    expect(sourceAt(mover, 2)).toEqual([0, 0]);
    // In front of the source the crests are (6 − 2) ÷ 2 = 2 m apart, and behind it (6 + 2) ÷ 2 = 4 m.
    const front = crests.map((c) => c.centre[0] + c.radius);
    const back = crests.map((c) => c.centre[0] - c.radius);
    expect(front[1] - front[0]).toBeCloseTo(2);
    expect(back[0] - back[1]).toBeCloseTo(4);
  });

  it('lets a source outrun its waves, with nothing worked out for a listener', () => {
    const fast: RippleSource = { ...mover, velocity: [9, 0] };
    expect(checkRipples(el({ sources: [fast] }))).toEqual([]);
    expect(checkRipples(el({ sources: [fast], listeners: [{ id: 'ear', at: [5, 0] }] }))[0]).toMatch(/more slowly than the waves/);
    // The source is ahead of every crest it has sent.
    const crests = crestsOf(el({ sources: [fast] }), fast, 2);
    expect(crests.length).toBeGreaterThan(0);
    expect(Math.max(...crests.map((c) => c.centre[0] + c.radius))).toBeLessThan(sourceAt(fast, 2)[0]);
    expect(arrival(el({ sources: [fast] }), fast, [10, 0], 2).arrived).toBe(false);
  });
});

describe('ripples: what reaches a place', () => {
  it('arrives after the time the wave needs to cover the distance', () => {
    // 15 m at 6 m/s is 2.5 s.
    expect(arrival(el(), still, [15, 0], 2).arrived).toBe(false);
    expect(arrival(el(), still, [15, 0], 2).signal).toBe(0);
    const a = arrival(el(), still, [15, 0], 5.0625);
    expect(a.arrived).toBe(true);
    expect(a.path).toBeCloseTo(15);
    expect(a.sent).toBeCloseTo(2.5625);
    expect(a.from).toEqual([0, 0]);
    expect(a.frequency).toBe(2);
    // An eighth of a period after a whole number of periods: sin 45°.
    expect(a.signal).toBeCloseTo(Math.SQRT1_2);
    expect(arrival(el({ full: true }), still, [15, 0], 0).arrived).toBe(true);
  });

  it('comes from where a moving source was, and is received more often in front of it', () => {
    const e = el({ sources: [mover], full: true });
    // In front, at 16 m: what arrives after 4 s left 3 s earlier, from −2 m, 18 m away.
    const front = arrival(e, mover, [16, 0], 4);
    expect(front.sent).toBeCloseTo(1);
    expect(front.from[0]).toBeCloseTo(-2);
    expect(front.path).toBeCloseTo(18);
    expect(front.frequency).toBeCloseTo(3);
    // Behind, at −16 m: it left 2.5 s earlier, from −1 m.
    const back = arrival(e, mover, [-16, 0], 4);
    expect(back.sent).toBeCloseTo(1.5);
    expect(back.from[0]).toBeCloseTo(-1);
    expect(back.frequency).toBeCloseTo(1.5);
    // Beside the path, what was sent as the source went by (at 2 s, 3 m away) arrives at the true frequency.
    expect(arrival(e, mover, [0, 3], 2.5).frequency).toBeCloseTo(2);
  });

  it('gives the frequencies of the lesson: a siren of 500 Hz at 25 m/s, and a horn of 600 Hz heard as 650 Hz', () => {
    const siren: RippleSource = { id: 's', at: [0, 0], frequency: 500, velocity: [25, 0] };
    const air = el({ speed: 340, sources: [siren], full: true });
    expect(arrival(air, siren, [15, 0], 0).frequency).toBeCloseTo(539.7, 1);
    expect(arrival(air, siren, [-15, 0], 0).frequency).toBeCloseTo(465.8, 1);
    const horn: RippleSource = { id: 's', at: [0, 0], frequency: 600, velocity: [340 - (600 * 340) / 650, 0] };
    expect(arrival(el({ speed: 340, sources: [horn], full: true }), horn, [15, 0], 0).frequency).toBeCloseTo(650);
  });

  it('counts the crests that have reached a listener', () => {
    // From a source at rest, 15 m away: the first crest arrives at 0.125 + 2.5 s, and then two each second.
    expect(received(el(), still, [15, 0], 2.6)).toBe(0);
    expect(received(el(), still, [15, 0], 2.65)).toBe(1);
    expect(received(el(), still, [15, 0], 5.2)).toBe(6);
    // In 4 s, 12 crests reach a listener in front of the moving source, and 6 one behind it.
    const e = el({ sources: [mover], full: true });
    expect(received(e, mover, [16, 0], 4)).toBe(12);
    expect(received(e, mover, [-16, 0], 4)).toBe(6);
  });

  it('counts more crests for a listener who has walked towards the source', () => {
    const far: RippleSource = { id: 's', at: [-14, 0], frequency: 2 };
    const e = el({ sources: [far], full: true });
    // In 6 s a listener who stands still receives 12; one who has walked 16 m nearer has met 17.
    expect(received(e, far, [14, 4.5], 6, [14, 4.5])).toBe(12);
    expect(received(e, far, [-2, -4.5], 6, [14, -4.5])).toBe(17);
  });
});

describe('ripples: two sources', () => {
  // The lesson's speakers, 2 m apart and in step: 680 Hz at 340 m/s, so a wavelength of 0.5 m.
  const speakers = el({
    view: [-1, -3, 5, 4],
    speed: 340,
    full: true,
    sources: [
      { id: 'a', at: [0, 1], frequency: 680 },
      { id: 'b', at: [0, -1], frequency: 680 },
    ],
  });
  // The place `a` metres from the first speaker and `b` metres from the second.
  const place = (a: number, b: number): Point => {
    const y = (b * b - a * a) / 4;
    return [Math.sqrt(a * a - (y - 1) ** 2), y];
  };

  it('cancels where the paths differ by an odd number of half wavelengths, and adds where they differ by whole ones', () => {
    // 4.25 − 3 = 1.25 m is 2.5 wavelengths; 4.5 − 3 = 1.5 m is 3.
    for (const t of [0, 0.0004, 0.0011]) {
      expect(loudness(speakers, place(3, 4.25), t)).toBeCloseTo(0);
      expect(loudness(speakers, place(3, 4.5), t)).toBeCloseTo(1);
    }
    expect(loudness(speakers, [3, 0], 0)).toBeCloseTo(1);
  });

  it('is only as loud as one source until the waves of the other arrive', () => {
    const starting = { ...speakers, full: false };
    const p = place(3, 4.25);
    expect(loudness(starting, p, 0.005)).toBe(0);
    // After 3 m ÷ 340 m/s the first has arrived, and after 4.25 m ÷ 340 m/s both have.
    expect(loudness(starting, p, 0.01)).toBeCloseTo(0.5);
    expect(loudness(starting, p, 0.013)).toBeCloseTo(0);
  });
});

describe('ripples: clips', () => {
  const walk = el({
    listeners: [{ id: 'ear', at: [10, 0] }],
    clips: {
      slow: { phases: [{ dur: 0.006, slow: 1000, note: 'Slow motion' }] },
      walk: { phases: [{ dur: 4, move: { ear: [2, 4] } }] },
      again: { phases: [{ dur: 1 }], reset: true },
    },
  });

  it('runs slow motion at the phase’s rate, with its note while it plays', () => {
    expect(clipSeconds(walk, 'slow')).toBeCloseTo(6);
    const mid = ripplesAt(walk, [['slow', 3]]);
    expect(mid.time).toBeCloseTo(0.003);
    expect(mid.note).toBe('Slow motion');
    expect(ripplesAt(walk, [['slow', 6]]).note).toBeUndefined();
    expect(ripplesAt(walk).time).toBe(0);
  });

  it('walks a listener to a new place, setting off and stopping gently', () => {
    expect(ripplesAt(walk).listeners.ear).toEqual([10, 0]);
    // A quarter of the way through the time, the listener has gone 3 × ¼² − 2 × ¼³ = 0.156 of the way.
    const early = ripplesAt(walk, [['walk', 1]]).listeners.ear;
    expect(early[0]).toBeCloseTo(10 - 8 * 0.15625);
    expect(early[1]).toBeCloseTo(4 * 0.15625);
    expect(ripplesAt(walk, [['walk', 2]]).listeners.ear).toEqual([expect.closeTo(6), expect.closeTo(2)]);
    expect(ripplesAt(walk, [['walk', 4]]).listeners.ear).toEqual([expect.closeTo(2), expect.closeTo(4)]);
  });

  it('starts again on a clip that resets, with the listeners back where they began', () => {
    const s = ripplesAt(walk, [['walk', 4], ['again', 0.5]]);
    expect(s.time).toBeCloseTo(0.5);
    expect(s.listeners.ear).toEqual([10, 0]);
  });
});

describe('ripples: checks', () => {
  it('reports ripples that cannot be drawn', () => {
    const heard = el({ listeners: [{ id: 'ear', at: [10, 0] }] });
    expect(checkRipples(heard)).toEqual([]);
    expect(checkRipples(el({ view: [5, -10, 5, 10] }))[0]).toMatch(/view/);
    expect(checkRipples(el({ speed: 0 }))[0]).toMatch(/speed above zero/);
    expect(checkRipples(el({ sources: [] }))[0]).toMatch(/no sources/);
    expect(checkRipples(el({ every: 1.5 }))[0]).toMatch(/whole number/);
    expect(checkRipples(el({ sources: [{ ...still, frequency: 0 }] }))[0]).toMatch(/frequency above zero/);
    expect(checkRipples(el({ sources: [{ ...still, id: 'heard' }] }))[0]).toMatch(/name of a part/);
    expect(checkRipples(el({ listeners: [{ id: 's', at: [10, 0] }] }))[0]).toMatch(/used twice/);
    expect(checkRipples(el({ listeners: [{ id: 'ear', at: [30, 0] }] }))[0]).toMatch(/outside the view/);
    expect(checkRipples({ ...heard, clips: { go: { phases: [{ dur: 1, move: { nose: [0, 0] } }] } } })[0]).toMatch(/listener "nose" that is not there/);
    expect(checkRipples({ ...heard, clips: { go: { phases: [{ dur: 1, move: { ear: [0, 40] } }] } } })[0]).toMatch(/out of the view/);
    expect(checkRipples(el({ clips: { go: { phases: [] } } }))[0]).toMatch(/no phases/);
    expect(checkRipples(el({ clips: { go: { phases: [{ dur: 0 }] } } }))[0]).toMatch(/lasts no time/);
    expect(checkRipples(el({ poster: 'stop' }))[0]).toMatch(/no clip "stop"/);
  });

  it('plays in a script, with parts that can be shown and hidden on their own', () => {
    const e = el({ sources: [mover], listeners: [{ id: 'ear', at: [16, 0] }] });
    const x: Explainer = {
      id: 'ripples-test',
      lessonId: 'p20-4-7',
      title: 'Ripples',
      summary: 'A test.',
      scenes: [
        {
          layout: 'center',
          main: [e],
          lines: [
            { say: 'The source moves through its own waves.', show: ['r', 'r.velocity'], play: 'r.go' },
            { say: 'Here is what the listener receives.', show: ['r.heard', 'r.centres'], focus: 'r.s' },
            { say: 'And now it is gone.', hide: 'r.heard' },
          ],
        },
      ],
    };
    expect(checkScript(x)).toEqual([]);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such clip.', show: 'r', play: 'r.stop' }] }] })[0]).toMatch(/has no clip "stop"/);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such part.', show: ['r', 'r.energy'] }] }] })[0]).toMatch(/has no part "energy"/);
    const tl = compile(x, { '0.0': 2, '0.1': 2, '0.2': 2 });
    // The second line waits for the ten seconds of the clip.
    expect(tl.lines[1].start).toBeGreaterThan(10);
    const during = stateAt(tl, 5).els.r;
    expect(during.plays?.[0][0]).toBe('go');
    expect(ripplesAt(e, during.plays).time).toBeGreaterThan(3);
    expect(stateAt(tl, tl.lines[1].start + 1.5).els.r.parts.heard).toBeGreaterThan(0.9);
    const end = stateAt(tl, tl.duration - 0.05).els.r;
    expect(end.p).toBeGreaterThan(0);
    expect(end.parts.heard ?? 0).toBeLessThan(0.1);
    expect(end.parts.centres).toBeGreaterThan(0.9);
  });
});
