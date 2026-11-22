import { describe, expect, it } from 'vitest';
import { checkPhotons, type PhotonsEl } from './script.ts';
import { C, COLLIDE_EVERY, COLLIDE_LEAD, COMPTON, EV, KICK, LANE_SPEED, LANE_START, PLANCK, SHARES, collected, comptonShift, electronAt, electronFlight, electronSpeed, hertzOf, kineticMax, lightForce, photonJoules, photonMomentum, photonVolts, photonsAt, photonsEachSecond, pushAt, scatterAt, shareOf, spotOf, thresholdHertz, thresholdNm } from './photons.ts';

const beam = (more: Partial<PhotonsEl> = {}): PhotonsEl => ({ kind: 'photons', id: 'p', nm: 500, rate: 4, clips: { a: { phases: [{ dur: 10 }] } }, ...more });
const sodium = (more: Partial<PhotonsEl> = {}): PhotonsEl => beam({ nm: 400, metal: { name: 'Sodium', work: 2.36 }, ...more });

describe('the energy of a photon', () => {
  it('is hf, with the numbers of the lesson', () => {
    expect(hertzOf(500)).toBeCloseTo(6.0e14, -10);
    expect(photonJoules(500)).toBeCloseTo(3.978e-19, 22);
    expect(photonVolts(500)).toBe(2.49);
    expect(photonVolts(400)).toBe(3.11);
    expect(photonVolts(250)).toBe(4.97);
  });

  it('doubles when the wavelength halves', () => {
    expect(photonJoules(350) / photonJoules(700)).toBeCloseTo(2, 10);
  });

  it('counts the photons of a laser pointer from its power', () => {
    expect(photonsEachSecond(2.0e-3, 633)).toBeCloseTo(6.4e15, -14);
  });
});

describe('the photoelectric effect', () => {
  it('gives sodium the threshold of the lesson', () => {
    expect(thresholdHertz(2.36)).toBeCloseTo(5.7e14, -12);
    expect(thresholdNm(2.36)).toBeCloseTo(527, 0);
  });

  it('leaves hf − W for the fastest electrons, and nothing below the threshold', () => {
    expect(kineticMax(2.36, 400)).toBe(0.75);
    expect(kineticMax(3.67, 250)).toBe(1.3);
    expect(kineticMax(2.36, 650)).toBe(0);
    expect(kineticMax(2.36, 600)).toBe(0);
  });

  it('finds the speed of the fastest electrons', () => {
    expect(electronSpeed(0.75)).toBeCloseTo(5.13e5, -3);
  });

  it('gives three electrons in ten the whole of the energy, and the rest a share of it', () => {
    expect(SHARES.filter((share) => share === 1)).toHaveLength(3);
    expect(Math.min(...SHARES)).toBeGreaterThan(0);
    expect(Math.max(...SHARES)).toBe(1);
    expect(shareOf(1)).toBe(SHARES[0]);
    expect(shareOf(SHARES.length + 1)).toBe(SHARES[0]);
  });

  it('spreads the photons over the face of the metal', () => {
    const spots = Array.from({ length: 50 }, (_, i) => spotOf(i + 1));
    expect(Math.min(...spots)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...spots)).toBeLessThan(1);
    expect(spots.filter((s) => s < 0.5).length).toBeGreaterThan(20);
    expect(spots.filter((s) => s >= 0.5).length).toBeGreaterThan(20);
  });
});

describe('a collecting plate', () => {
  it('collects every electron with no voltage, fewer as it is made negative, and none at the stopping voltage', () => {
    expect(collected(2.36, 400, 0)).toBe(1);
    expect(collected(2.36, 400, 0.4)).toBeCloseTo(0.8, 10);
    expect(collected(2.36, 400, 0.75)).toBe(0);
    expect(collected(2.36, 400, 1)).toBe(0);
    expect(collected(2.36, 650, 0)).toBe(0);
  });

  it('lets an electron cross only when its kinetic energy is more than eV', () => {
    expect(electronFlight(0.75, 0).fate).toBe('collected');
    expect(electronFlight(0.75, 0.74).fate).toBe('collected');
    expect(electronFlight(0.75, 0.75).fate).toBe('returned');
    expect(electronFlight(0.3, 0.4).fate).toBe('returned');
  });

  it('slows the electron steadily, by the energy it has climbed through', () => {
    const [kinetic, volts] = [0.75, 0.4];
    const { seconds } = electronFlight(kinetic, volts);
    const half = electronAt(kinetic, volts, seconds / 2);
    const start = electronAt(kinetic, volts, 0);
    // v² falls in step with the distance: v² = v₀² (1 − V x ÷ Ek).
    expect(half.v ** 2).toBeCloseTo(start.v ** 2 * (1 - (volts * half.x) / kinetic), 10);
    const end = electronAt(kinetic, volts, seconds);
    expect(end.fate).toBe('collected');
    expect(end.v ** 2).toBeCloseTo(start.v ** 2 * (1 - volts / kinetic), 10);
  });

  it('turns an electron back where its kinetic energy runs out, and returns it at the speed it left with', () => {
    const [kinetic, volts] = [0.3, 0.75];
    const { seconds } = electronFlight(kinetic, volts);
    const top = electronAt(kinetic, volts, seconds / 2);
    expect(top.x).toBeCloseTo(kinetic / volts, 10);
    expect(top.v).toBeCloseTo(0, 10);
    const back = electronAt(kinetic, volts, seconds);
    expect(back.fate).toBe('returned');
    expect(back.v).toBeCloseTo(-electronAt(kinetic, volts, 0).v, 10);
  });

  it('speeds an electron up when the plate is positive', () => {
    expect(electronFlight(0.75, -1).seconds).toBeLessThan(electronFlight(0.75, 0).seconds);
    expect(electronAt(0.75, -1, 0.5).v).toBeGreaterThan(electronAt(0.75, -1, 0).v);
  });
});

describe('the photons a clip sends', () => {
  it('sends them at a steady rate', () => {
    const state = photonsAt(beam(), [['a', 10]]);
    expect(state.time).toBe(10);
    expect(state.sent).toHaveLength(40);
    const gaps = state.sent.slice(1).map((ph, i) => ph.at - state.sent[i].at);
    for (const gap of gaps) expect(gap).toBeCloseTo(0.25, 6);
    expect(state.sent[0].at).toBeLessThan(0.25);
  });

  it('never moves a photon between one frame and the next', () => {
    const el = beam({ clips: { a: { phases: [{ dur: 4 }, { dur: 5, rate: 9, nm: 420 }, { dur: 3 }] } } });
    const early = photonsAt(el, [['a', 6.013]]);
    const late = photonsAt(el, [['a', 11.4]]);
    expect(late.sent.length).toBeGreaterThan(early.sent.length);
    early.sent.forEach((ph, i) => {
      expect(late.sent[i].n).toBe(ph.n);
      expect(late.sent[i].at).toBeCloseTo(ph.at, 9);
      expect(late.sent[i].nm).toBeCloseTo(ph.nm, 9);
    });
  });

  it('sends more photons as the light gets brighter, each with the colour of its moment', () => {
    const el = beam({ nm: 700, rate: 2, clips: { a: { phases: [{ dur: 4 }] }, b: { phases: [{ dur: 4, rate: 8, nm: 400 }, { dur: 4 }] } } });
    const dim = photonsAt(el, [['a', 4]]);
    expect(dim.sent).toHaveLength(8);
    const bright = photonsAt(el, [
      ['a', 4],
      ['b', 8],
    ]);
    expect(bright.rate).toBe(8);
    expect(bright.nm).toBe(400);
    expect(bright.sent.filter((ph) => ph.at >= 8)).toHaveLength(32);
    expect(bright.sent[0].nm).toBe(700);
    expect(bright.sent[bright.sent.length - 1].nm).toBe(400);
    const between = bright.sent.filter((ph) => ph.at > 4 && ph.at < 8).map((ph) => ph.nm);
    expect(Math.max(...between)).toBeLessThanOrEqual(700);
    expect(Math.min(...between)).toBeGreaterThanOrEqual(400);
    expect([...between].sort((a, b) => b - a)).toEqual(between);
  });

  it('slides the supply of a tube, and remembers the voltage each photon met', () => {
    const el = sodium({ tube: { volts: 0 }, clips: { a: { phases: [{ dur: 5, volts: 0.75 }, { dur: 5 }] } } });
    const state = photonsAt(el, [['a', 10]]);
    expect(state.volts).toBe(0.75);
    expect(state.sent[0].volts).toBeCloseTo(0, 2);
    expect(state.sent[state.sent.length - 1].volts).toBe(0.75);
  });
});

describe('the momentum of a photon', () => {
  it('is h ÷ λ, with the numbers of the lesson', () => {
    expect(photonMomentum(500)).toBeCloseTo(1.33e-27, 29);
    expect(photonMomentum(0.071)).toBeCloseTo(9.34e-24, 26);
    expect(photonMomentum(250) / photonMomentum(500)).toBeCloseTo(2, 10);
    // And E ÷ c.
    expect(photonJoules(500) / C).toBeCloseTo(photonMomentum(500), 40);
  });

  it('pushes a mirror twice as hard as a black card', () => {
    expect(lightForce(100, 'black')).toBeCloseTo(3.33e-7, 9);
    expect(lightForce(100, 'mirror')).toBeCloseTo(6.67e-7, 9);
    expect(lightForce(60, 'mirror')).toBeCloseTo(4.0e-7, 9);
  });

  it('gives a surface the same kick with every photon, where the photon meets it', () => {
    const el = beam({ rate: 5, push: { watts: 100, surfaces: ['black', 'mirror'] }, clips: { a: { phases: [{ dur: 30 }] } } });
    const state = photonsAt(el, [['a', 30]]);
    const [card, mirror] = [pushAt(state, 'black'), pushAt(state, 'mirror')];
    expect(card.hits.length).toBeGreaterThan(100);
    expect(card.v).toBeCloseTo(KICK * card.hits.length, 12);
    expect(mirror.v).toBeCloseTo(2 * KICK * mirror.hits.length, 12);
    expect(mirror.x - LANE_START).toBeGreaterThan(1.8 * (card.x - LANE_START));
    expect(card.x).toBeGreaterThan(LANE_START + 0.03);
    for (const hit of mirror.hits) {
      const ph = state.sent.find((sent) => sent.n === hit.n)!;
      expect(LANE_SPEED * (hit.at - ph.at)).toBeCloseTo(hit.x, 9);
    }
  });

  it('never moves a meeting between one frame and the next', () => {
    const el = beam({ rate: 5, push: { watts: 100, surfaces: ['mirror'] }, clips: { a: { phases: [{ dur: 30 }] } } });
    const early = pushAt(photonsAt(el, [['a', 12.02]]), 'mirror');
    const late = pushAt(photonsAt(el, [['a', 25]]), 'mirror');
    expect(late.hits.length).toBeGreaterThan(early.hits.length);
    early.hits.forEach((hit, i) => {
      expect(late.hits[i].at).toBeCloseTo(hit.at, 9);
      expect(late.hits[i].x).toBeCloseTo(hit.x, 9);
    });
  });
});

describe('the Compton effect', () => {
  it('changes the wavelength by (h ÷ mc)(1 − cos θ)', () => {
    expect(comptonShift(0)).toBe(0);
    expect(comptonShift(60)).toBeCloseTo(1.215, 10);
    expect(comptonShift(90)).toBeCloseTo(2.43, 10);
    expect(comptonShift(120)).toBeCloseTo(3.645, 10);
    expect(comptonShift(180)).toBeCloseTo(4.86, 10);
    expect(scatterAt(71, 90).after).toBeCloseTo(73.43, 10);
    // The change does not depend on the wavelength.
    expect(scatterAt(5, 60).after - 5).toBeCloseTo(scatterAt(71, 60).after - 71, 10);
  });

  it('conserves momentum and energy', () => {
    const rad = Math.PI / 180;
    const rest = (PLANCK * C) / (COMPTON * 1e-12) / EV;
    for (const [pm, angle] of [[5, 60], [5, 90], [5, 180], [71, 90], [71, 120], [2, 35]]) {
      const hit = scatterAt(pm, angle);
      // Along the line of arrival, and across it.
      expect(hit.photon * Math.cos(angle * rad) + hit.electron * Math.cos(hit.electronAngle * rad)).toBeCloseTo(1, 10);
      expect(hit.photon * Math.sin(angle * rad) + hit.electron * Math.sin(hit.electronAngle * rad)).toBeCloseTo(0, 10);
      expect(hit.kinetic).toBeCloseTo(hit.before - hit.left, 6);
      // The electron's energy and momentum agree: (pc)² + (mc²)² = (Ek + mc²)².
      const pc = hit.electron * hit.before;
      expect(Math.hypot(pc, rest) - rest).toBeCloseTo(hit.kinetic, 3);
      expect(hit.beta).toBeGreaterThan(0);
      expect(hit.beta).toBeLessThan(1);
    }
    expect(scatterAt(5, 0).electron).toBeCloseTo(0, 10);
  });

  it('sends a photon at the electron at a steady pace, and keeps the angle of each collision', () => {
    const el = beam({ nm: 0.005, rate: 1, compton: { angle: 0 }, clips: { a: { phases: [{ dur: 10, angle: 180 }, { dur: 4 }] } } });
    const state = photonsAt(el, [['a', 14]]);
    expect(state.angle).toBe(180);
    expect(state.collisions.map((hit) => hit.at)).toEqual([COLLIDE_LEAD, COLLIDE_LEAD + COLLIDE_EVERY, COLLIDE_LEAD + 2 * COLLIDE_EVERY].map((at) => expect.closeTo(at, 9)));
    const angles = state.collisions.map((hit) => hit.angle);
    expect(angles[0]).toBeGreaterThan(0);
    expect(angles[0]).toBeLessThan(angles[1]);
    expect(angles[2]).toBe(180);
    // An earlier frame has the same collisions.
    const early = photonsAt(el, [['a', 7.21]]);
    early.collisions.forEach((hit, i) => expect(state.collisions[i].angle).toBeCloseTo(hit.angle, 9));
  });
});

describe('checking a photons element', () => {
  it('passes a beam, a metal and a tube', () => {
    expect(checkPhotons(beam())).toEqual([]);
    expect(checkPhotons(sodium())).toEqual([]);
    expect(checkPhotons(sodium({ tube: { volts: 0 }, clips: { a: { phases: [{ dur: 5, volts: 0.75 }] } } }))).toEqual([]);
  });

  it('refuses a tube with no metal, a supply with no tube, and light that is out of range', () => {
    expect(checkPhotons(beam({ tube: { volts: 0 } })).join(' ')).toContain('needs a metal');
    expect(checkPhotons(sodium({ clips: { a: { phases: [{ dur: 5, volts: 1 }] } } })).join(' ')).toContain('no tube');
    expect(checkPhotons(beam({ nm: 5000 })).join(' ')).toContain('nanometres');
    expect(checkPhotons(beam({ clips: { a: { phases: [{ dur: 3, rate: 40 }] } } })).join(' ')).toContain('more photons');
    expect(checkPhotons(beam({ thumb: ['nothing' as never] })).join(' ')).toContain('not a part');
  });

  it('passes a push and a Compton collision, and refuses two pictures at once or a collision of visible light', () => {
    expect(checkPhotons(beam({ push: { watts: 100, surfaces: ['black', 'mirror'] } }))).toEqual([]);
    expect(checkPhotons(beam({ nm: 0.071, compton: { angle: 90 }, clips: { a: { phases: [{ dur: 5, angle: 120 }] } } }))).toEqual([]);
    expect(checkPhotons(sodium({ push: { watts: 100, surfaces: ['black'] } })).join(' ')).toContain('not more than one');
    expect(checkPhotons(beam({ compton: { angle: 90 } })).join(' ')).toContain('X-rays');
    expect(checkPhotons(beam({ clips: { a: { phases: [{ dur: 5, angle: 60 }] } } })).join(' ')).toContain('no Compton collision');
    expect(checkPhotons(beam({ nm: 0.005, compton: { angle: 90 }, clips: { a: { phases: [{ dur: 5, angle: 200 }] } } })).join(' ')).toContain('out of range');
  });
});
