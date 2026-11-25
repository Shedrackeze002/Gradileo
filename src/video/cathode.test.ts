import { describe, expect, it } from 'vitest';
import { checkCathode, type CathodeEl } from './script.ts';
import { RATIO, TUBE, WHEEL, balanceField, beamPath, cathodeAt, landing, radiusOf, ratioFromCircle, ratioFromVolts, speedFromVolts, through } from './cathode.ts';

const tube = (more: Partial<CathodeEl> = {}): CathodeEl => ({ kind: 'cathode', id: 't', speed: 2.0e7, field: 0, tesla: 0, clips: { a: { phases: [{ dur: 4 }] } }, ...more });

describe("Thomson's two steps", () => {
  it('gives the numbers of the lesson', () => {
    expect(balanceField(2.0e7, 1.5e-3)).toBeCloseTo(3.0e4, 6);
    expect(radiusOf(2.0e7, 1.5e-3) * 100).toBeCloseTo(7.58, 2);
    expect(ratioFromCircle(2.0e7, 1.5e-3, 0.0758) / 1e11).toBeCloseTo(1.76, 2);
    expect(ratioFromCircle(3.0e6, 0.25, 0.125)).toBeCloseTo(9.6e7, -3);
    expect(speedFromVolts(500) / 1e7).toBeCloseTo(1.33, 2);
    expect(radiusOf(speedFromVolts(500), 1.0e-3) * 100).toBeCloseTo(7.54, 2);
    expect(ratioFromVolts(500, 1.0e-3, 0.0754) / 1e11).toBeCloseTo(1.76, 2);
  });
});

describe('the path of the beam', () => {
  it('is straight with no fields, and lands in the middle of the screen', () => {
    const beam = beamPath(2.0e7);
    expect(beam.ends).toBe('screen');
    expect(landing(beam)).toBe(0);
    expect(beam.points[beam.points.length - 1][0]).toBeCloseTo(TUBE.screen, 12);
  });

  it('bends towards the positive plate, by ½ (q/m) E t² between the plates', () => {
    const up = beamPath(2.0e7, 1.0e4);
    const down = beamPath(2.0e7, -1.0e4);
    expect(landing(up)).toBeGreaterThan(0.01);
    expect(landing(down)).toBeCloseTo(-landing(up)!, 12);
    const t = (TUBE.to - TUBE.from) / 2.0e7;
    const atExit = up.points[up.points.length - 2];
    expect(atExit[0]).toBeCloseTo(TUBE.to, 3);
    expect(atExit[1]).toBeCloseTo(0.5 * RATIO * 1.0e4 * t * t, 3);
    // A stronger field bends it more, and a faster beam bends less.
    expect(landing(beamPath(2.0e7, 1.2e4))!).toBeGreaterThan(landing(up)!);
    expect(landing(beamPath(3.0e7, 1.0e4))!).toBeLessThan(landing(up)!);
  });

  it('follows a circle of radius v ÷ (B q/m) in a magnetic field, down for a field into the picture', () => {
    const tesla = 0.5e-3;
    const beam = beamPath(2.0e7, 0, tesla);
    const r = radiusOf(2.0e7, tesla);
    expect(landing(beam)).toBeLessThan(-0.01);
    for (const [x, y] of beam.points.slice(1, -1)) expect(Math.hypot(x - TUBE.from, y + r) / r).toBeCloseTo(1, 3);
    expect(landing(beamPath(2.0e7, 0, -tesla))).toBeCloseTo(-landing(beam)!, 10);
  });

  it('goes straight when qE = qvB, and a field twice as strong needs the other twice as strong', () => {
    expect(Math.abs(landing(beamPath(2.0e7, 3.0e4, 1.5e-3))!)).toBeLessThan(1e-5);
    expect(Math.abs(landing(beamPath(2.0e7, 6.0e4, 3.0e-3))!)).toBeLessThan(1e-5);
    expect(Math.abs(landing(beamPath(2.0e7, 3.0e4, 3.0e-3)) ?? 1)).toBeGreaterThan(0.005);
    // Only electrons of the right speed go straight.
    expect(Math.abs(landing(beamPath(2.5e7, 3.0e4, 1.5e-3)) ?? 1)).toBeGreaterThan(0.002);
  });

  it('stops at a plate or at the glass when a field is too strong', () => {
    expect(beamPath(2.0e7, 2.0e5).ends).toBe('plate');
    expect(beamPath(2.0e7, 3.0e4).ends).toBe('wall');
    expect(beamPath(2.0e7, 0, 1.5e-3, false).ends).toBe('wall');
    expect(landing(beamPath(2.0e7, 2.0e5))).toBeUndefined();
  });
});

describe('a tube and its clips', () => {
  it('sends the rays across once the voltage is switched on, and slides the fields', () => {
    const el = tube({ off: true, clips: { a: { phases: [{ dur: 2 }, { dur: 3, on: true }, { dur: 4, field: 1.0e4 }] } } });
    expect(cathodeAt(el).on).toBe(false);
    expect(cathodeAt(el, [['a', 2]]).reach).toBe(0);
    const part = cathodeAt(el, [['a', 2.2]]);
    expect(part.on).toBe(true);
    expect(part.reach).toBeGreaterThan(0.05);
    expect(part.reach).toBeLessThan(TUBE.screen);
    expect(cathodeAt(el, [['a', 5]]).reach).toBeGreaterThan(TUBE.screen);
    expect(cathodeAt(el, [['a', 7]]).field).toBeCloseTo(5.0e3, 6);
    expect(cathodeAt(el, [['a', 9]]).field).toBe(1.0e4);
  });

  it('takes the speed from the accelerating voltage', () => {
    const el = tube({ speed: undefined, volts: 500, clips: { a: { phases: [{ dur: 4, volts: 2000 }] } } });
    expect(cathodeAt(el).speed).toBeCloseTo(speedFromVolts(500), 3);
    expect(cathodeAt(el, [['a', 4]]).speed / cathodeAt(el).speed).toBeCloseTo(2, 10);
  });

  it('stops the rays in air, and lets them cross once it is pumped out', () => {
    expect(through(0)).toBe(1);
    expect(through(1)).toBeLessThan(0.1);
    expect(through(0.5)).toBeLessThan(through(0.2));
    const el = tube({ air: 1, clips: { a: { phases: [{ dur: 5, air: 0 }] } } });
    expect(cathodeAt(el, [['a', 5]]).air).toBe(0);
  });

  it('rolls the paddle wheel away from the cathode while the rays push it, as far as the end of its rails', () => {
    const el: CathodeEl = { kind: 'cathode', id: 'w', picture: 'wheel', off: true, clips: { a: { phases: [{ dur: 2 }, { dur: 6, on: true }, { dur: 30 }] }, off: { phases: [{ dur: 5, on: false }] } } };
    expect(cathodeAt(el, [['a', 2]]).wheel.x).toBe(WHEEL.from);
    const rolling = cathodeAt(el, [['a', 8]]);
    expect(rolling.wheel.x).toBeGreaterThan(WHEEL.from + 0.02);
    expect(rolling.wheel.angle).toBeCloseTo((rolling.wheel.x - WHEEL.from) / WHEEL.radius, 9);
    const end = cathodeAt(el, [['a', 38]]);
    expect(end.wheel.x).toBeCloseTo(WHEEL.to, 9);
    expect(end.wheel.speed).toBe(0);
    // With the voltage off, the wheel rolls to a stop.
    const stopped = cathodeAt(el, [['a', 6], ['off', 5]]);
    expect(stopped.wheel.speed).toBe(0);
    expect(stopped.wheel.x).toBeLessThan(WHEEL.to);
  });

  it('stands the cross up and folds it down', () => {
    const el: CathodeEl = { kind: 'cathode', id: 's', picture: 'shadow', flat: true, clips: { a: { phases: [{ dur: 2, stand: true }, { dur: 2 }, { dur: 2, stand: false }] } } };
    expect(cathodeAt(el).stand).toBe(0);
    expect(cathodeAt(el, [['a', 1]]).stand).toBeCloseTo(0.5, 9);
    expect(cathodeAt(el, [['a', 4]]).stand).toBe(1);
    expect(cathodeAt(el, [['a', 6]]).stand).toBe(0);
  });
});

describe('checking a cathode ray tube', () => {
  it('passes each picture', () => {
    expect(checkCathode(tube())).toEqual([]);
    expect(checkCathode(tube({ speed: undefined, volts: 500, clips: { a: { phases: [{ dur: 3, volts: 800 }, { dur: 3, tesla: 1.0e-3, field: 2.0e4 }] } } }))).toEqual([]);
    expect(checkCathode({ kind: 'cathode', id: 'w', picture: 'wheel', clips: { a: { phases: [{ dur: 3, on: true }] } } })).toEqual([]);
    expect(checkCathode({ kind: 'cathode', id: 's', picture: 'shadow', flat: true, clips: { a: { phases: [{ dur: 3, stand: true }] } } })).toEqual([]);
  });

  it('refuses a tube with no speed, a field with no plates, and a clip that changes what is not there', () => {
    expect(checkCathode(tube({ speed: undefined })).join(' ')).toContain('needs the speed');
    expect(checkCathode(tube({ volts: 500 })).join(' ')).toContain('not both');
    expect(checkCathode(tube({ field: undefined, clips: { a: { phases: [{ dur: 3, field: 1e4 }] } } })).join(' ')).toContain('no plates');
    expect(checkCathode(tube({ tesla: undefined, clips: { a: { phases: [{ dur: 3, tesla: 1e-3 }] } } })).join(' ')).toContain('has none');
    expect(checkCathode(tube({ clips: { a: { phases: [{ dur: 3, volts: 800 }] } } })).join(' ')).toContain('was not given');
    expect(checkCathode(tube({ clips: { a: { phases: [{ dur: 3, stand: true }] } } })).join(' ')).toContain('cross');
    expect(checkCathode({ kind: 'cathode', id: 'w', picture: 'wheel', tesla: 1e-3, clips: { a: { phases: [{ dur: 3 }] } } }).join(' ')).toContain('no plates and no magnetic field');
    expect(checkCathode(tube({ thumb: ['nothing' as never] })).join(' ')).toContain('not a part');
  });
});
