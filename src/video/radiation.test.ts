import { describe, expect, it } from 'vitest';
import { checkRadiation, type RadiationEl } from './script.ts';
import { AIR, ALL, bendOf, bornAt, clicks, COUNTER, flightOf, flights, LEAD_STOPS, radiationAt, RAYS, SHIELDS, SLIDE, slopeOf, SOURCE, stepAt, TURN, type Step } from './radiation.ts';

const el = (more: Partial<RadiationEl> = {}): RadiationEl => ({ kind: 'radiation', id: 'a', clips: { a: { phases: [{ dur: 60 }] } }, ...more });
const start = (more: Partial<Step> = {}): Step[] => [{ at: 0, paper: false, aluminium: false, lead: false, open: true, field: 'off', ...more }];

describe('what stops each radiation', () => {
  it('stops an alpha particle in a few centimetres of air, or at a sheet of paper', () => {
    for (let n = 0; n < 40; n++) {
      const free = flightOf('alpha', n, start())!;
      expect(free.stops).toBe('air');
      expect(free.end).toBeLessThanOrEqual(AIR);
      expect(free.end).toBeLessThan(SHIELDS.aluminium.x);
      const papered = flightOf('alpha', n, start({ paper: true }))!;
      expect(papered.stops).toBe('paper');
      expect(papered.end).toBe(SHIELDS.paper.x);
    }
  });

  it('lets a beta particle through paper, and stops it in aluminium', () => {
    for (let n = 0; n < 40; n++) {
      for (const steps of [start(), start({ paper: true })]) {
        const free = flightOf('beta', n, steps)!;
        expect([free.end, free.stops]).toEqual([COUNTER, undefined]);
      }
      const stopped = flightOf('beta', n, start({ paper: true, aluminium: true }))!;
      expect(stopped.stops).toBe('aluminium');
      expect(stopped.end).toBeGreaterThan(SHIELDS.aluminium.x);
      expect(stopped.end).toBeLessThan(SHIELDS.aluminium.x + SHIELDS.aluminium.w);
      // With no aluminium, lead stops it near its surface.
      expect(flightOf('beta', n, start({ lead: true }))!.stops).toBe('lead');
    }
  });

  it('lets gamma rays through paper and aluminium, and most of them stop in lead', () => {
    let passed = 0;
    for (let n = 0; n < 300; n++) {
      const free = flightOf('gamma', n, start({ paper: true, aluminium: true }))!;
      expect([free.end, free.stops]).toEqual([COUNTER, undefined]);
      const flight = flightOf('gamma', n, start({ lead: true }))!;
      if (flight.stops === undefined) passed++;
      else {
        expect(flight.stops).toBe('lead');
        expect(flight.end).toBeGreaterThan(SHIELDS.lead.x);
        expect(flight.end).toBeLessThan(SHIELDS.lead.x + SHIELDS.lead.w);
      }
    }
    // Lead reduces the gamma rays, and some still get through.
    expect(passed / 300).toBeGreaterThan(1 - LEAD_STOPS - 0.08);
    expect(passed / 300).toBeLessThan(1 - LEAD_STOPS + 0.08);
  });

  it('puts the least penetrating radiation first: paper, then aluminium, then lead', () => {
    expect(SOURCE).toBeLessThan(SHIELDS.paper.x);
    expect(SHIELDS.paper.x).toBeLessThan(AIR);
    expect(AIR).toBeLessThan(SHIELDS.aluminium.x);
    expect(SHIELDS.aluminium.x + SHIELDS.aluminium.w).toBeLessThan(SHIELDS.lead.x);
    expect(SHIELDS.lead.x + SHIELDS.lead.w).toBeLessThan(COUNTER);
    // The most ionizing leaves its ions closest together.
    expect(RAYS.alpha.ions).toBeLessThan(RAYS.beta.ions);
    expect(RAYS.beta.ions).toBeLessThan(RAYS.gamma.ions);
  });
});

describe('a radiation element through its clips', () => {
  it('slides a shield in, and a particle meets it only if it is there when the particle arrives', () => {
    const paper = el({ clips: { a: { phases: [{ dur: 4 }, { dur: 6, paper: true }] } } });
    expect(radiationAt(paper, [['a', 3]]).slide.paper).toBe(0);
    expect(radiationAt(paper, [['a', 4 + SLIDE / 2]]).slide.paper).toBeCloseTo(0.5, 10);
    const st = radiationAt(paper, [['a', 10]]);
    expect(st.slide.paper).toBe(1);
    expect(st.steps).toHaveLength(2);
    expect(stepAt(st.steps, 3.9).paper).toBe(false);
    expect(stepAt(st.steps, 4).paper).toBe(true);
    // The first alpha particle passes the place of the paper before the paper is there; a later one is stopped.
    const reach = (n: number) => bornAt('alpha', n) + (SHIELDS.paper.x - SOURCE) / RAYS.alpha.speed;
    expect(reach(0)).toBeLessThan(4);
    expect(flightOf('alpha', 0, st.steps)!.stops).toBe('air');
    const late = Array.from({ length: 12 }, (_, n) => n).find((n) => reach(n) > 4)!;
    expect(flightOf('alpha', late, st.steps)!.stops).toBe('paper');
    // And it slides out again.
    const out = el({ paper: true, clips: { a: { phases: [{ dur: 2, paper: false }] } } });
    expect(radiationAt(out).slide.paper).toBe(1);
    expect(radiationAt(out, [['a', 2]]).slide.paper).toBe(0);
  });

  it('sends out no particle while the source is closed', () => {
    const shut = el({ clips: { a: { phases: [{ dur: 5 }, { dur: 10, open: false }, { dur: 5, open: true }] } } });
    const st = radiationAt(shut, [['a', 20]]);
    for (const ray of ALL)
      for (let n = 0; bornAt(ray, n) < 20; n++) {
        const born = bornAt(ray, n);
        expect(flightOf(ray, n, st.steps) === undefined).toBe(born >= 5 && born < 15);
      }
  });

  it('follows every particle that has left', () => {
    const st = radiationAt(el(), [['a', 10]]);
    const all = flights(el(), st);
    expect(all.filter((f) => f.ray === 'alpha')).toHaveLength(Math.floor((10 - bornAt('alpha', 0)) / RAYS.alpha.every) + 1);
    for (const f of all) {
      expect(f.x).toBeGreaterThanOrEqual(SOURCE);
      expect(f.x).toBeLessThanOrEqual(f.end);
      expect(f.ended >= 0).toBe(f.x === f.end);
    }
    expect(flights(el({ rays: ['gamma'] }), st).every((f) => f.ray === 'gamma')).toBe(true);
  });

  it('clicks for the particles that reach the counter, and for the background', () => {
    const quiet = el({ background: 0 });
    const st = radiationAt(quiet, [['a', 30]]);
    const reached = flights(quiet, st).filter((f) => f.stops === undefined && f.ended >= 0);
    expect(clicks(quiet, st)).toHaveLength(reached.length);
    expect(reached.some((f) => f.ray === 'alpha')).toBe(false);
    expect(reached.some((f) => f.ray === 'beta')).toBe(true);
    // With the source closed from the start, only the background clicks: about one every 2.4 s.
    const shut = el({ open: false });
    const only = clicks(shut, radiationAt(shut, [['a', 60]]));
    expect(only.length).toBeGreaterThanOrEqual(23);
    expect(only.length).toBeLessThanOrEqual(25);
    expect([...only].sort((a, b) => a - b)).toEqual(only);
    expect(clicks(el({ open: false, background: 0 }), radiationAt(shut, [['a', 60]]))).toHaveLength(0);
  });
});

describe('in a field', () => {
  it('bends alpha and beta particles opposite ways, the beta particles more, and not the gamma rays', () => {
    for (const field of ['electric', 'magnetic'] as const) {
      const [a, b, g] = ALL.map((ray) => bendOf(ray, field, 1, 1));
      expect(a * b).toBeLessThan(0);
      expect(Math.abs(b)).toBeGreaterThan(3 * Math.abs(a));
      expect(g).toBe(0);
      expect(slopeOf('gamma', field, 1)).toBe(0);
      expect(Math.sign(slopeOf('alpha', field, 1))).toBe(Math.sign(a));
    }
    // Between the plates (the positive one above), an alpha particle goes down the picture, towards the negative plate.
    expect(bendOf('alpha', 'electric', 1, 1)).toBeGreaterThan(0);
    expect(bendOf('beta', 'electric', 1, 1)).toBeLessThan(0);
    // The two fields bend each the other way round.
    expect(bendOf('alpha', 'magnetic', 1, 1)).toBeLessThan(0);
    expect(bendOf('beta', 'off', 1, 1)).toBe(0);
  });

  it('turns a field on and off smoothly', () => {
    const f = el({ picture: 'fields', clips: { a: { phases: [{ dur: 2 }, { dur: 6, field: 'electric' }, { dur: 4, field: 'off' }] } } });
    expect(radiationAt(f, [['a', 1]]).strength).toBe(0);
    const half = radiationAt(f, [['a', 2 + TURN / 2]]);
    expect(half.field).toBe('electric');
    expect(half.strength).toBeCloseTo(0.5, 10);
    expect(radiationAt(f, [['a', 7]]).strength).toBe(1);
    // While it goes off, the field that is drawn is the one that was on.
    const going = radiationAt(f, [['a', 8 + TURN / 2]]);
    expect(going.field).toBe('electric');
    expect(going.strength).toBeCloseTo(0.5, 10);
    const gone = radiationAt(f, [['a', 12]]);
    expect([gone.field, gone.strength]).toEqual(['off', 0]);
  });
});

describe('checking a radiation element', () => {
  it('passes the pictures of the lesson', () => {
    expect(checkRadiation(el())).toEqual([]);
    expect(checkRadiation(el({ background: 0, clips: { a: { phases: [{ dur: 4, paper: true }, { dur: 4, aluminium: true, lead: true, open: false }] } } }))).toEqual([]);
    expect(checkRadiation(el({ picture: 'fields', field: 'off', clips: { a: { phases: [{ dur: 4, field: 'magnetic' }] } } }))).toEqual([]);
  });

  it('finds what does not belong', () => {
    expect(checkRadiation(el({ rays: [] })).join(' ')).toMatch(/one or more/);
    expect(checkRadiation(el({ rays: ['alpha', 'alpha'] })).join(' ')).toMatch(/each once/);
    expect(checkRadiation(el({ picture: 'fields', paper: true })).join(' ')).toMatch(/only a through picture/);
    expect(checkRadiation(el({ field: 'electric' })).join(' ')).toMatch(/only a fields picture/);
    expect(checkRadiation(el({ background: -1 })).join(' ')).toMatch(/background/);
    expect(checkRadiation(el({ clips: { a: { phases: [{ dur: 4, field: 'electric' }] } } })).join(' ')).toMatch(/changes a field/);
    expect(checkRadiation(el({ picture: 'fields', clips: { a: { phases: [{ dur: 4, lead: true }] } } })).join(' ')).toMatch(/moves a shield/);
    expect(checkRadiation(el({ poster: 'z' })).join(' ')).toMatch(/poster/);
    expect(checkRadiation(el({ clips: { a: { phases: [] } } })).join(' ')).toMatch(/no phases/);
  });
});
