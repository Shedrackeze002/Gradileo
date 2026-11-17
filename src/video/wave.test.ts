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

describe('wave: a wave that bounces back', () => {
  // A short burst (one wave, a quarter of a second) sent along 12 m to a wall, at 4 m/s.
  const burst = el({ lanes: [{ ...rope, frequency: 4, reflect: true }], clips: { clap: { phases: [{ dur: 0.25 }, { dur: 8, set: { rope: { amplitude: 0 } } }] } } });

  it('comes back from the far end turned over, after the time to go there and back', () => {
    // After 2 s the burst is between 7 m and 8 m, on its way out.
    const out = waveAt(burst, [['clap', 2]]).lanes.rope;
    expect(Math.abs(out.at(7.25))).toBeCloseTo(2);
    expect(out.at(3)).toBeCloseTo(0);
    // After 5 s it has gone 20 m: to the wall and 8 m back, so it is between 4 m and 5 m.
    const back = waveAt(burst, [['clap', 5]]).lanes.rope;
    expect(back.front).toBeCloseTo(20);
    // The part of the burst that was at 7.25 m is now at 4.75 m: the burst comes back the other way round, and turned over.
    expect(back.at(4.75)).toBeCloseTo(-out.at(7.25));
    expect(back.at(8)).toBeCloseTo(0);
    // It is back at the source after 24 m ÷ 4 m/s = 6 s.
    expect(Math.abs(waveAt(burst, [['clap', 6.1]]).lanes.rope.at(0.35))).toBeCloseTo(2);
  });

  it('keeps the far end still', () => {
    const steady = el({ lanes: [{ ...rope, reflect: true }] });
    for (const t of [3.1, 4.4, 6.75]) expect(waveAt(steady, [['go', t]]).lanes.rope.at(12)).toBeCloseTo(0);
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

describe('wave: single pulses', () => {
  // One hump 2 m long, sent along 12 m at 4 m/s.
  const hump = (height: number, more: Partial<WaveLane> = {}): WaveLane => ({ id: 'rope', kind: 'transverse', frequency: 0, amplitude: Math.abs(height), speed: 4, pulses: [{ height, width: 2 }], ...more });
  const one = (height: number, more: Partial<WaveLane> = {}) => el({ lanes: [hump(height, more)] });

  it('carries a pulse along at the speed of the wave', () => {
    // The pulse starts to leave at time 0, so after 2 s its front is at 8 m and its middle at 7 m.
    const s = waveAt(one(2), [['go', 2]]).lanes.rope;
    expect(s.at(7)).toBeCloseTo(2);
    expect(s.at(6.5)).toBeCloseTo(1);
    expect(s.at(6)).toBeCloseTo(0);
    expect(s.at(8)).toBeCloseTo(0);
    // The distance travelled is measured to the middle of the pulse.
    expect(s.front).toBeCloseTo(7);
  });

  it('lets a pulse start half a width early, so that its middle leaves the source as the clock starts', () => {
    const early = el({ lanes: [{ ...hump(2), pulses: [{ height: 2, width: 2, at: -0.25 }] }] });
    expect(checkWave(early)).toEqual([]);
    const s = waveAt(early, [['go', 1.5]]).lanes.rope;
    expect(s.at(6)).toBeCloseTo(2);
    expect(s.front).toBeCloseTo(6);
    expect(checkWave(el({ lanes: [{ ...hump(2), pulses: [{ height: 2, width: 2, at: -0.3 }] }] }))[0]).toMatch(/leaves before time zero/);
  });

  // Two pulses 2 m long from opposite ends of 10 m, at 2 m/s: their middles meet at 5 m after 3 s.
  const pair = (left: number, right: number): WaveEl => ({
    kind: 'wave',
    id: 'w',
    span: [0, 10],
    lanes: [{ id: 'rope', kind: 'transverse', frequency: 0, amplitude: 5, speed: 2, pulses: [{ height: left, width: 2 }, { height: right, width: 2, from: 'right' }] }],
    clips: { go: { phases: [{ dur: 10 }] } },
  });

  it('adds two pulses where they overlap, and lets each carry on unchanged', () => {
    const meet = waveAt(pair(5, 3), [['go', 3]]).lanes.rope;
    expect(meet.at(5)).toBeCloseTo(8);
    expect(meet.pulses.map((own) => own(5))).toEqual([expect.closeTo(5), expect.closeTo(3)]);
    expect(waveAt(pair(5, -3), [['go', 3]]).lanes.rope.at(5)).toBeCloseTo(2);
    // Two seconds later each has gone 4 m farther: the 5 cm crest is at 9 m and the other at 1 m.
    const after = waveAt(pair(5, 3), [['go', 5]]).lanes.rope;
    expect(after.at(9)).toBeCloseTo(5);
    expect(after.at(1)).toBeCloseTo(3);
    expect(after.at(5)).toBeCloseTo(0);
    expect(largestAmplitude(pair(5, 3), pair(5, 3).lanes[0])).toBe(8);
    expect(largestAmplitude(pair(5, -3), pair(5, -3).lanes[0])).toBe(5);
  });

  it('leaves a flat rope moving when a crest meets an equal trough', () => {
    const flat = waveAt(pair(4, -4), [['go', 3]]).lanes.rope;
    for (const x of [4.2, 4.5, 5, 5.5, 5.8]) expect(flat.at(x)).toBeCloseTo(0);
    // Each pulse moves the rope at 2 m/s × its slope; half a metre from the middle the two add to 8π units a second.
    expect(flat.rate(5.5)).toBeCloseTo(8 * Math.PI, 2);
    expect(flat.rate(4.5)).toBeCloseTo(-8 * Math.PI, 2);
    expect(flat.rate(5)).toBeCloseTo(0, 2);
  });

  it('turns a pulse over at a fixed end, and sends it back the same way up from a free one', () => {
    // After 5 s the middle of the pulse has gone 19 m: to the end at 12 m and 7 m back, to 5 m.
    expect(waveAt(one(2, { reflect: true }), [['go', 5]]).lanes.rope.at(5)).toBeCloseTo(-2);
    expect(waveAt(one(2, { reflect: 'free' }), [['go', 5]]).lanes.rope.at(5)).toBeCloseTo(2);
    // As its middle arrives (3.25 s), a fixed end stays still and a free end is flicked twice as far.
    expect(waveAt(one(2, { reflect: true }), [['go', 3.25]]).lanes.rope.at(12)).toBeCloseTo(0);
    expect(waveAt(one(2, { reflect: 'free' }), [['go', 3.25]]).lanes.rope.at(12)).toBeCloseTo(4);
    expect(largestAmplitude(one(2, { reflect: 'free' }), hump(2, { reflect: 'free' }))).toBe(4);
  });

  it('sends part of a pulse back from a join with a slower medium, turned over, and the rest on, shorter', () => {
    // From 4 m/s into 2 m/s at 6 m: (2 − 4) ÷ (2 + 4) = −⅓ comes back, and 2 × 2 ÷ (4 + 2) = ⅔ goes on.
    const joined = one(3, { medium: { from: 6, speed: 2 } });
    const s = waveAt(joined, [['go', 3]]).lanes.rope;
    expect(s.join).toBe(6);
    expect(s.speed2).toBe(2);
    // The middle reached the join after 1.75 s; 1.25 s later what went on is 2.5 m past it, and what came back 5 m before it.
    expect(s.at(8.5)).toBeCloseTo(2);
    expect(s.at(1)).toBeCloseTo(-1);
    // In the slower medium the pulse is half as long: 1 m.
    expect(s.at(8.75)).toBeCloseTo(1);
    expect(s.at(9)).toBeCloseTo(0);
    expect(shortestWavelength(joined, joined.lanes[0])).toBe(2);
    expect(checkWave(joined)).toEqual([]);
    expect(checkWave(one(3, { medium: { from: 6, speed: 2 }, reflect: true })).join(' ')).toMatch(/no reflecting end/);
  });
});

describe('wave: standing waves', () => {
  it('fits whole loops on a string, with a node at each end', () => {
    // 0.8 m of string where waves travel at 240 m/s: two loops is one wavelength, so 300 Hz.
    const string: WaveLane = { id: 'rope', kind: 'transverse', frequency: 300, amplitude: 2, speed: 240, standing: { loops: 2 } };
    const w = el({ span: [0, 0.8], lanes: [string], clips: { go: { phases: [{ dur: 1 }] } } });
    expect(checkWave(w)).toEqual([]);
    // A quarter of a period in, every point is at its farthest.
    const s = waveAt(w, [['go', 0.25 / 300]]).lanes.rope;
    expect(s.frequency).toBeCloseTo(300);
    expect(s.nodes).toEqual([0, 0.4, 0.8]);
    expect(s.antinodes).toEqual([expect.closeTo(0.2), expect.closeTo(0.6)]);
    expect(s.at(0.2)).toBeCloseTo(2);
    expect(s.at(0.6)).toBeCloseTo(-2);
    for (const t of [0.0004, 0.001, 0.0021]) expect(waveAt(w, [['go', t]]).lanes.rope.at(0.4)).toBeCloseTo(0);
    expect(s.end).toBeCloseTo(0.8);
    expect(shortestWavelength(w, string)).toBeCloseTo(0.8);
    expect(checkWave(el({ span: [0, 0.8], lanes: [{ ...string, frequency: 280 }] }))[0]).toMatch(/frequency that fits this standing wave is 300 Hz/);
    expect(checkWave(el({ span: [0, 0.8], lanes: [{ ...string, standing: { loops: 2, beyond: 0.01 } }] })).join(' ')).toMatch(/only an air column/);
  });

  it('fits an odd number of quarter wavelengths in an air column closed at one end', () => {
    // 512 Hz at 340 m/s: three quarters of 0.664 m is 0.498 m.
    const length = (3 * 340) / (4 * 512);
    const air: WaveLane = { id: 'air', kind: 'longitudinal', frequency: 512, amplitude: 2, speed: 340, standing: { quarters: 3, length } };
    const w = el({ span: [0, 0.9], lanes: [air], clips: { go: { phases: [{ dur: 1 }] } } });
    expect(checkWave(w)).toEqual([]);
    const s = waveAt(w, [['go', 0.25 / 512]]).lanes.air;
    // A node at the closed end, an antinode at the open one, and half a wavelength between nodes.
    expect(s.nodes).toEqual([0, expect.closeTo((2 * length) / 3)]);
    expect(s.antinodes).toEqual([expect.closeTo(length / 3), expect.closeTo(length)]);
    expect(s.at(0)).toBeCloseTo(0);
    expect(Math.abs(s.at(length))).toBeCloseTo(2);
    // Past the open end there is no column.
    expect(s.at(0.7)).toBe(0);
    expect(checkWave(el({ span: [0, 0.9], lanes: [{ ...air, standing: { quarters: 2, length } }] })).join(' ')).toMatch(/odd number of quarter wavelengths/);
  });

  it('lets the antinode sit a little beyond the open end of a tube', () => {
    // 440 Hz where a quarter wavelength is 19.7 cm: the tube that resonates is 18.9 cm long.
    const air: WaveLane = { id: 'air', kind: 'longitudinal', frequency: 440, amplitude: 2, speed: 440 * 0.788, standing: { quarters: 1, length: 0.189, beyond: 0.008 } };
    const w = el({ span: [0, 0.3], lanes: [air], clips: { go: { phases: [{ dur: 1 }] } } });
    expect(checkWave(w)).toEqual([]);
    const s = waveAt(w, [['go', 0.25 / 440]]).lanes.air;
    expect(s.frequency).toBeCloseTo(440);
    expect(s.mouth).toBeCloseTo(0.189);
    expect(s.end).toBeCloseTo(0.197);
    expect(s.antinodes).toEqual([expect.closeTo(0.197)]);
  });

  it('finds the nodes of a steady wave that has met its own reflection', () => {
    // 1 Hz at 4 m/s along 12 m: the reflection has come 4 m back after 4 s, and the nodes are half a wavelength apart.
    const bounced: WaveLane = { ...rope, reflect: true };
    const s = waveAt(el({ lanes: [bounced] }), [['go', 4]]).lanes.rope;
    expect(s.nodes).toEqual([8, 10, 12]);
    expect(s.antinodes).toEqual([9, 11]);
    // Where the two waves add, the rope moves twice as far as either wave alone.
    expect(largestAmplitude(el({ lanes: [bounced] }), bounced)).toBe(4);
  });

  it('drops the note of a clip that has finished, however its length rounds', () => {
    // 4.125 ÷ 150 s of the wave at 250 times slower is 6.875 s of video, which is not exact in binary.
    const w = el({ clips: { go: { phases: [{ dur: 4.125 / 150, slow: 250, note: 'Slow motion' }] } } });
    expect(waveAt(w, [['go', 6.8]]).note).toBe('Slow motion');
    expect(waveAt(w, [['go', 6.875]]).note).toBeUndefined();
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
