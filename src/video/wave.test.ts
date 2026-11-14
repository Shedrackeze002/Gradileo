import { describe, expect, it } from 'vitest';
import { checkScript, checkWave, type Explainer, type WaveEl, type WaveLane } from './script.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';
import { largestAmplitude, shortestWavelength, waveAt } from './wave.ts';

// A rope whose wave travels at 4 m/s; at 1 Hz the wavelength is 4 m.
const rope: WaveLane = { id: 'rope', kind: 'transverse', frequency: 1, amplitude: 2, speed: 4 };
const el = (over: Partial<WaveEl> = {}): WaveEl => ({ kind: 'wave', id: 'w', span: [0, 12], lanes: [rope], clips: { go: { phases: [{ dur: 10 }] } }, ...over });
const full = (over: Partial<WaveEl> = {}): WaveEl => el({ lanes: [{ ...rope, full: true }], ...over });
const gaps = (xs: number[]) => xs.slice(1).map((x, i) => x - xs[i]);

describe('wave: what the source does travels along the strip', () => {
  it('gives each place what the source was doing the travel time ago', () => {
    const s = waveAt(full(), [['go', 2.3]]).lanes.rope;
    // 6 m takes 1.5 s at 4 m/s, so that place does what the source did at 0.8 s.
    expect(s.at(6)).toBeCloseTo(2 * Math.sin(2 * Math.PI * 0.8));
    expect(s.at(0)).toBeCloseTo(2 * Math.sin(2 * Math.PI * 2.3));
  });

  it('leaves the strip at rest until the wave arrives', () => {
    const s = waveAt(el(), [['go', 1.2]]).lanes.rope;
    expect(s.front).toBeCloseTo(4.8);
    expect(s.reached(4)).toBe(true);
    expect(s.reached(6)).toBe(false);
    expect(s.at(6)).toBe(0);
    expect(s.at(9)).toBe(0);
    // The first crest left the source a quarter of a second in, so it has travelled 3.8 m.
    expect(s.crests).toHaveLength(1);
    expect(s.crests[0]).toBeCloseTo(3.8);
  });

  it('fills the strip from the start when the lane is full', () => {
    const s = waveAt(full()).lanes.rope;
    expect(s.reached(12)).toBe(true);
    expect(s.at(3)).toBeCloseTo(2);
    expect(s.crests.filter((x) => x >= 0 && x <= 12).map((x) => Math.round(x * 1000) / 1000)).toEqual([3, 7, 11]);
    expect(s.troughs.filter((x) => x >= 0 && x <= 12).map((x) => Math.round(x * 1000) / 1000)).toEqual([1, 5, 9]);
  });

  it('spaces the crests a wavelength apart: the speed ÷ the frequency', () => {
    for (const g of gaps(waveAt(full(), [['go', 3.7]]).lanes.rope.crests)) expect(g).toBeCloseTo(4);
    const fast = full({ lanes: [{ ...rope, full: true, frequency: 2.5 }] });
    for (const g of gaps(waveAt(fast, [['go', 3.7]]).lanes.rope.crests)) expect(g).toBeCloseTo(1.6);
  });

  it('moves every crest along at the speed of the wave', () => {
    const a = waveAt(full(), [['go', 1]]).lanes.rope.crests.filter((x) => x >= 0 && x <= 6);
    const b = waveAt(full(), [['go', 1.5]]).lanes.rope.crests.filter((x) => x >= 2 && x <= 8);
    expect(b.map((x) => x - 2)).toEqual(a.map((x) => expect.closeTo(x)));
  });

  it('only moves a point of the strip about its own rest position', () => {
    // Over a whole period the displacement at one place averages to zero and never passes the amplitude.
    let sum = 0;
    for (let i = 0; i < 100; i++) {
      const y = waveAt(full(), [['go', 2 + i / 100]]).lanes.rope.at(5);
      expect(Math.abs(y)).toBeLessThanOrEqual(2 + 1e-9);
      sum += y;
    }
    expect(sum / 100).toBeCloseTo(0);
  });
});

describe('wave: clips', () => {
  const changing = full({
    clips: {
      go: { phases: [{ dur: 2 }] },
      faster: { phases: [{ dur: 2, set: { rope: { frequency: 2 } } }] },
      louder: { phases: [{ dur: 2, set: { rope: { amplitude: 3 } } }] },
      slow: { phases: [{ dur: 1, slow: 3, note: 'Slow motion' }, { dur: 1 }] },
      again: { reset: true, phases: [{ dur: 1 }] },
    },
  });

  it('sends a change of frequency in from the source: shorter waves behind, the old ones ahead', () => {
    const s = waveAt(changing, [['go', 2], ['faster', 1.5]]).lanes.rope;
    expect(s.frequency).toBe(2);
    // The change has travelled 6 m. Behind it the crests are 2 m apart, ahead of it still 4 m.
    const near = s.crests.filter((x) => x >= 0 && x < 6);
    const far = s.crests.filter((x) => x > 6 && x <= 12);
    for (const g of gaps(near)) expect(g).toBeCloseTo(2);
    expect(near.length).toBeGreaterThanOrEqual(3);
    expect(far.length).toBe(1);
    expect(s.crests.find((x) => x > 12)! - far[0]).toBeCloseTo(4);
  });

  it('keeps the source moving smoothly through a change of frequency', () => {
    const before = waveAt(changing, [['go', 2], ['faster', 0]]).lanes.rope.at(0);
    const after = waveAt(changing, [['go', 2], ['faster', 0.001]]).lanes.rope.at(0);
    expect(after).toBeCloseTo(before, 1);
  });

  it('sends a change of amplitude in from the source too', () => {
    const s = waveAt(changing, [['go', 2], ['louder', 1]]).lanes.rope;
    expect(s.amplitude).toBe(3);
    expect(Math.abs(s.at(s.crests.find((x) => x > 0 && x < 4)!))).toBeCloseTo(3);
    expect(Math.abs(s.at(s.crests.find((x) => x > 4 && x < 12)!))).toBeCloseTo(2);
  });

  it('runs slow motion at the phase’s rate, with its note while it plays', () => {
    expect(clipSeconds(changing, 'slow')).toBe(4);
    const mid = waveAt(changing, [['slow', 1.5]]);
    expect(mid.time).toBeCloseTo(0.5);
    expect(mid.note).toBe('Slow motion');
    const late = waveAt(changing, [['slow', 3.5]]);
    expect(late.time).toBeCloseTo(1.5);
    expect(late.note).toBeUndefined();
    expect(waveAt(changing, [['slow', 4]]).time).toBeCloseTo(2);
  });

  it('starts again from the beginning on a clip that resets', () => {
    const s = waveAt(changing, [['go', 2], ['faster', 2], ['again', 0.5]]);
    expect(s.time).toBeCloseTo(0.5);
    expect(s.lanes.rope.frequency).toBe(1);
    expect(s.lanes.rope.at(0)).toBeCloseTo(waveAt(changing, [['go', 0.5]]).lanes.rope.at(0));
  });

  it('counts the complete waves that have passed the mark', () => {
    expect(waveAt(full(), [['go', 4.2]]).passed.rope).toBe(4);
    expect(waveAt(full(), [['go', 0.9]]).passed.rope).toBe(0);
    // In a strip that starts empty, the count starts when the wave reaches the mark (6 m, 1.5 s in).
    expect(waveAt(el(), [['go', 1.4]]).passed.rope).toBe(0);
    expect(waveAt(el(), [['go', 4.6]]).passed.rope).toBe(3);
    expect(waveAt(el({ mark: 2 }), [['go', 4.6]]).passed.rope).toBe(4);
  });
});

describe('wave: a longitudinal wave', () => {
  const air: WaveLane = { id: 'air', kind: 'longitudinal', frequency: 2, amplitude: 0.1, speed: 4, full: true };
  const tube = el({ lanes: [air] });

  it('crowds the particles together at its compressions and spreads them at its rarefactions', () => {
    const s = waveAt(tube, [['go', 1.3]]).lanes.air;
    // The gap between two particles that rest 0.02 m apart, either side of a place.
    const gap = (x: number) => 0.02 + s.at(x + 0.01) - s.at(x - 0.01);
    const squeezed = s.crests.filter((x) => x > 0.5 && x < 11.5);
    const spread = s.troughs.filter((x) => x > 0.5 && x < 11.5);
    expect(squeezed.length).toBeGreaterThan(3);
    for (const x of squeezed) {
      expect(gap(x)).toBeLessThan(0.02);
      expect(gap(x)).toBeLessThanOrEqual(gap(x + 0.2));
      expect(gap(x)).toBeLessThanOrEqual(gap(x - 0.2));
    }
    for (const x of spread) expect(gap(x)).toBeGreaterThan(0.02);
    for (const g of gaps(squeezed)) expect(g).toBeCloseTo(2);
  });
});

describe('wave: measures and checks', () => {
  it('finds the largest amplitude and the shortest wavelength a lane ever has', () => {
    const w = el({ clips: { a: { phases: [{ dur: 1, set: { rope: { amplitude: 5 } } }] }, b: { phases: [{ dur: 1, set: { rope: { frequency: 4 } } }] } } });
    expect(largestAmplitude(w, rope)).toBe(5);
    expect(shortestWavelength(w, rope)).toBe(1);
    expect(shortestWavelength(el(), rope)).toBe(4);
  });

  it('reports a wave that cannot run', () => {
    expect(checkWave(el())).toEqual([]);
    expect(checkWave(el({ span: [5, 5] }))[0]).toMatch(/span/);
    expect(checkWave(el({ lanes: [{ ...rope, speed: 0 }] }))[0]).toMatch(/speed/);
    expect(checkWave(el({ lanes: [{ ...rope, id: 'count' }] }))[0]).toMatch(/name of a part/);
    expect(checkWave(el({ mark: 20 }))[0]).toMatch(/mark/);
    expect(checkWave(el({ clips: { go: { phases: [{ dur: 1, set: { string: { frequency: 2 } } }] } } }))[0]).toMatch(/no lane "string"/);
  });

  it('plays in a script, with parts that can be shown and hidden on their own', () => {
    const x: Explainer = {
      id: 'wave-test',
      lessonId: 'p10-4-1',
      title: 'Waves',
      summary: 'A test.',
      scenes: [
        {
          layout: 'center',
          main: [el()],
          lines: [
            { say: 'A wave runs along the rope.', show: 'w', play: 'w.go' },
            { say: 'Here is its wavelength.', show: 'w.wavelength', focus: 'w.rope' },
            { say: 'And now it is gone.', hide: 'w.wavelength' },
          ],
        },
      ],
    };
    expect(checkScript(x)).toEqual([]);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such clip.', show: 'w', play: 'w.stop' }] }] })[0]).toMatch(/wave "w" has no clip "stop"/);
    expect(checkScript({ ...x, scenes: [{ ...x.scenes[0], lines: [{ say: 'No such part.', show: ['w', 'w.energy'] }] }] })[0]).toMatch(/wave "w" has no part "energy"/);
    const tl = compile(x, { '0.0': 2, '0.1': 2, '0.2': 2 });
    // The second line waits for the ten seconds of the clip.
    expect(tl.lines[1].start).toBeGreaterThan(10);
    const during = stateAt(tl, 5).els.w;
    expect(during.plays?.[0][0]).toBe('go');
    expect(waveAt(el(), during.plays).time).toBeGreaterThan(3);
    expect(stateAt(tl, tl.lines[1].start + 1.5).els.w.parts.wavelength).toBeGreaterThan(0.9);
    const end = stateAt(tl, tl.duration - 0.05).els.w;
    expect(end.p).toBeGreaterThan(0);
    expect(end.parts.wavelength ?? 0).toBeLessThan(0.1);
  });
});
