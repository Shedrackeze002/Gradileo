import { describe, expect, it } from 'vitest';
import { checkPowerline, checkScript, checkTransformer, type Explainer, type PowerlineEl, type TransformerEl } from './script.ts';
import { hertzOf, lineAmps, lineLoss, peakLineAmps, peakVolts, powerlineAt, primaryAmps, secondaryAmps, secondaryVolts, settleOf, sweepOf, transformerAt, transformerWatts } from './transformer.ts';
import { clipSeconds, compile, stateAt } from './timeline.ts';

// The lesson's first transformer: 100 turns and 50 turns on a 12 V supply at 50 Hz, with a lamp of 6.0 Ω.
// One second of video is 5 ms of the model, which is a quarter of a cycle.
const step = (over: Partial<TransformerEl> = {}): TransformerEl => ({
  kind: 'transformer',
  id: 't',
  turns: [100, 50],
  volts: 12,
  load: 6,
  clips: { a: { phases: [{ dur: 8 }] }, up: { phases: [{ dur: 6, secondary: 200 }, { dur: 4 }] }, off: { phases: [{ dur: 2, on: false }] }, on: { phases: [{ dur: 2, on: true }] } },
  ...over,
});

// The lesson's battery: 12 V across a primary of 100 turns, with 100 turns on the secondary. The current settles in 4 ms, which is 0.8 s of video.
const battery = (over: Partial<TransformerEl> = {}): TransformerEl => ({
  kind: 'transformer',
  id: 'b',
  turns: [100, 100],
  volts: 12,
  dc: true,
  load: 6,
  clips: { on: { phases: [{ dur: 6, on: true }] }, hold: { phases: [{ dur: 6 }] }, off: { phases: [{ dur: 6, on: false }] } },
  ...over,
});

// The lesson's power line: 200 kW sent through a line of 5.0 Ω, first at 4000 V and then at 40 000 V.
const line = (over: Partial<PowerlineEl> = {}): PowerlineEl => ({
  kind: 'powerline',
  id: 'g',
  watts: 200_000,
  ohms: 5,
  volts: 4000,
  clips: { a: { phases: [{ dur: 4 }] }, up: { phases: [{ dur: 6, volts: 40_000 }, { dur: 4 }] } },
  ...over,
});

describe('a transformer on an alternating supply', () => {
  it('has a supply of 50 Hz and screens that sweep two cycles, unless it is told otherwise', () => {
    expect(hertzOf(step())).toBe(50);
    expect(sweepOf(step())).toBeCloseTo(0.04, 12);
    expect(sweepOf(step({ hertz: 60 }))).toBeCloseTo(1 / 30, 12);
    expect(sweepOf(step({ sweep: 0.1 }))).toBe(0.1);
    expect(settleOf(battery())).toBe(0.004);
    expect(settleOf(battery({ settle: 0.01 }))).toBe(0.01);
  });

  it('follows the turns rule, Vs ÷ Vp = Ns ÷ Np', () => {
    const el = step();
    const st = transformerAt(el);
    expect(st.on).toBe(true);
    expect(secondaryVolts(el, st)).toBeCloseTo(6, 9);
    const mains = step({ turns: [1000, 50], volts: 240, load: 4 });
    expect(secondaryVolts(mains, transformerAt(mains))).toBeCloseTo(12, 9);
    expect(secondaryAmps(mains, transformerAt(mains))).toBeCloseTo(3, 9);
  });

  it('takes as much power from its supply as it gives its lamp, VpIp = VsIs', () => {
    const el = step();
    const st = transformerAt(el, [['a', 3]]);
    expect(secondaryAmps(el, st)).toBeCloseTo(1, 9);
    expect(transformerWatts(el, st)).toBeCloseTo(6, 9);
    expect(primaryAmps(el, st)).toBeCloseTo(0.5, 9);
    expect(el.volts * primaryAmps(el, st)).toBeCloseTo(secondaryVolts(el, st) * secondaryAmps(el, st), 9);
  });

  it('carries no current without a lamp', () => {
    const el = step({ load: undefined });
    const st = transformerAt(el, [['a', 1]]);
    expect(secondaryVolts(el, st)).toBeCloseTo(6, 9);
    expect(secondaryAmps(el, st)).toBe(0);
    expect(primaryAmps(el, st)).toBe(0);
  });

  it('has a voltage that alternates, with the two coils in step', () => {
    const el = step();
    const quarter = transformerAt(el, [['a', 1]]);
    expect(quarter.time).toBeCloseTo(0.005, 9);
    expect(quarter.vp).toBeCloseTo(12, 6);
    expect(quarter.vs).toBeCloseTo(6, 6);
    const half = transformerAt(el, [['a', 2]]);
    expect(half.vp).toBeCloseTo(0, 6);
    expect(half.vs).toBeCloseTo(0, 6);
    const threeQuarters = transformerAt(el, [['a', 3]]);
    expect(threeQuarters.vp).toBeCloseTo(-12, 6);
    expect(threeQuarters.vs).toBeCloseTo(-6, 6);
  });

  it('has a flux a quarter of a cycle behind the voltage of the primary', () => {
    const el = step();
    expect(transformerAt(el).flux).toBeCloseTo(-1, 9);
    // The voltage is greatest while the flux is changing fastest, as it passes zero.
    expect(transformerAt(el, [['a', 1]]).flux).toBeCloseTo(0, 6);
    expect(transformerAt(el, [['a', 2]]).flux).toBeCloseTo(1, 6);
    expect(transformerAt(el, [['a', 3]]).flux).toBeCloseTo(0, 6);
    expect(transformerAt(el, [['a', 4]]).flux).toBeCloseTo(-1, 6);
  });

  it('lets time pass only while a clip plays, and passes over a clip it does not have', () => {
    const el = step();
    expect(transformerAt(el, [['a', 1], ['a', 1]]).time).toBeCloseTo(0.01, 9);
    expect(transformerAt(el, [['nothing', 5], ['a', 1]]).time).toBeCloseTo(0.005, 9);
    expect(transformerAt(step({ rate: 0.01 }), [['a', 1]]).time).toBeCloseTo(0.01, 9);
    // A clip stops at its end, however long it is played for.
    expect(transformerAt(el, [['off', 9]]).time).toBeCloseTo(0.01, 9);
  });

  it('winds turns on the secondary steadily, and the voltage rises with them', () => {
    const el = step();
    const halfWay = transformerAt(el, [['up', 3]]);
    expect(halfWay.secondary).toBe(125);
    expect(secondaryVolts(el, halfWay)).toBeCloseTo(15, 9);
    const done = transformerAt(el, [['up', 8]]);
    expect(done.secondary).toBe(200);
    expect(secondaryVolts(el, done)).toBeCloseTo(24, 9);
    expect(secondaryAmps(el, done)).toBeCloseTo(4, 9);
    // A step-up transformer takes more current than it gives: 96 W at 12 V is 8.0 A.
    expect(primaryAmps(el, done)).toBeCloseTo(8, 9);
    // The turns stay on for the clips that follow.
    expect(transformerAt(el, [['up', 10], ['a', 2]]).secondary).toBe(200);
  });

  it('gives nothing while its switch is open, and starts a new cycle when the switch is closed', () => {
    const el = step();
    const off = transformerAt(el, [['a', 1], ['off', 1]]);
    expect(off.on).toBe(false);
    expect([off.vp, off.vs, off.flux]).toEqual([0, 0, 0]);
    expect(secondaryVolts(el, off)).toBe(0);
    expect(primaryAmps(el, off)).toBe(0);
    const on = transformerAt(el, [['a', 1], ['off', 2], ['on', 1]]);
    expect(on.on).toBe(true);
    expect(on.since).toBeCloseTo(0.015, 9);
    expect(on.vp).toBeCloseTo(12, 6);
    // A transformer can start with its switch open.
    expect(transformerAt(step({ on: false })).on).toBe(false);
    expect(secondaryVolts(step({ on: false }), transformerAt(step({ on: false }), [['a', 1]]))).toBe(0);
  });

  it('draws the two voltages on its screens, and starts again at the end of each sweep', () => {
    const el = step();
    const st = transformerAt(el, [['a', 3]]);
    expect(st.trace).toHaveLength(360);
    expect(st.trace[0][0]).toBeCloseTo(0.005 / 120, 9);
    const [into, vp, vs] = st.trace[st.trace.length - 1];
    expect(into).toBeCloseTo(0.015, 9);
    expect(vp).toBeCloseTo(st.vp, 9);
    expect(vs).toBeCloseTo(st.vs, 9);
    for (const point of st.trace) expect(point[2]).toBeCloseTo(point[1] / 2, 9);
    // One sweep is 0.04 s, which is 8 s of video: a second later the new sweep holds about a second of points.
    const next = transformerAt(el, [['a', 8], ['up', 1]]);
    expect(next.trace.length).toBeGreaterThan(115);
    expect(next.trace.length).toBeLessThan(125);
    expect(next.trace[next.trace.length - 1][0]).toBeCloseTo(0.005, 6);
    expect(transformerAt(el).trace).toEqual([]);
  });

  it('knows the largest voltage of either coil in any clip', () => {
    expect(peakVolts(step())).toBeCloseTo(24, 9);
    expect(peakVolts(step({ clips: { a: { phases: [{ dur: 4 }] } } }))).toBe(12);
    expect(peakVolts(step({ turns: [1000, 50], volts: 240, clips: { a: { phases: [{ dur: 4 }] } } }))).toBe(240);
  });
});

describe('a transformer on a battery', () => {
  it('starts with its switch open, and gives nothing', () => {
    const el = battery();
    const st = transformerAt(el);
    expect(st.on).toBe(false);
    expect([st.vp, st.vs, st.flux]).toEqual([0, 0, 0]);
    expect(secondaryVolts(el, st)).toBe(0);
  });

  it('gives a kick as the switch is closed, which dies away as the current settles', () => {
    const el = battery();
    const first = transformerAt(el, [['on', 1 / 120]]);
    expect(first.vp).toBe(12);
    expect(first.vs).toBeGreaterThan(11.8);
    expect(first.vs).toBeLessThan(12);
    // After 4 ms, the time it takes to settle, the flux has risen to 63% and the kick has fallen to 37%.
    const settled = transformerAt(el, [['on', 0.8]]);
    expect(settled.flux).toBeCloseTo(1 - Math.exp(-1), 6);
    expect(settled.vs).toBeCloseTo(12 * Math.exp(-1), 6);
    expect(secondaryVolts(el, settled)).toBeCloseTo(12 * Math.exp(-1), 6);
    expect(secondaryAmps(el, settled)).toBeCloseTo((12 * Math.exp(-1)) / 6, 6);
  });

  it('gives nothing while the current is steady, though the flux in the core is at its greatest', () => {
    const el = battery();
    for (const plays of [[['on', 6]], [['on', 6], ['hold', 6]]] as Array<Array<[string, number]>>) {
      const st = transformerAt(el, plays);
      expect(st.vp).toBe(12);
      expect(st.flux).toBeGreaterThan(0.999);
      expect(secondaryVolts(el, st)).toBe(0);
      expect(secondaryAmps(el, st)).toBe(0);
      expect(transformerWatts(el, st)).toBe(0);
    }
  });

  it('gives a kick the other way as the switch is opened', () => {
    const el = battery();
    const st = transformerAt(el, [['on', 6], ['hold', 6], ['off', 0.8]]);
    expect(st.on).toBe(false);
    expect(st.vp).toBe(0);
    expect(st.level).toBeGreaterThan(0.999);
    expect(st.flux).toBeCloseTo(Math.exp(-1), 3);
    expect(st.vs).toBeCloseTo(-12 * Math.exp(-1), 2);
    expect(secondaryVolts(el, st)).toBeCloseTo(12 * Math.exp(-1), 2);
    const after = transformerAt(el, [['on', 6], ['hold', 6], ['off', 6]]);
    expect(after.flux).toBeLessThan(0.001);
    expect(secondaryVolts(el, after)).toBe(0);
  });

  it('carries on from the flux it has when the switch is opened early', () => {
    const el = battery();
    // Opened after 4 ms, the flux falls from 63%, so the kick back is smaller.
    const st = transformerAt(el, [['on', 0.8], ['off', 1 / 120]]);
    expect(st.level).toBeCloseTo(1 - Math.exp(-1), 6);
    expect(st.vs).toBeLessThan(0);
    expect(Math.abs(st.vs)).toBeLessThan(12 * (1 - Math.exp(-1)));
    expect(Math.abs(st.vs)).toBeGreaterThan(12 * (1 - Math.exp(-1)) * 0.98);
  });

  it('gives a larger kick with more turns on the secondary, and takes no steady current', () => {
    const el = battery({ turns: [100, 300] });
    const st = transformerAt(el, [['on', 0.8]]);
    expect(st.vs).toBeCloseTo(36 * Math.exp(-1), 6);
    expect(primaryAmps(el, st)).toBe(0);
  });
});

describe('a power line', () => {
  it('carries the current I = P ÷ V, and wastes the power I²R', () => {
    const el = line();
    expect(lineAmps(el, 4000)).toBeCloseTo(50, 9);
    expect(lineLoss(el, 4000)).toBeCloseTo(12_500, 6);
    expect(lineAmps(el, 40_000)).toBeCloseTo(5, 9);
    expect(lineLoss(el, 40_000)).toBeCloseTo(125, 9);
    // Ten times the voltage is a tenth of the current, and a hundredth of the loss.
    expect(lineLoss(el, 4000) / lineLoss(el, 40_000)).toBeCloseTo(100, 9);
  });

  it('starts at its own voltage, with no drift', () => {
    expect(powerlineAt(line())).toEqual({ volts: 4000, amps: 50, loss: 12_500, drift: 0 });
  });

  it('steps its voltage up by the same factor in each moment', () => {
    const el = line();
    const halfWay = powerlineAt(el, [['up', 3]]);
    expect(halfWay.volts).toBeCloseTo(4000 * Math.sqrt(10), 6);
    expect(halfWay.amps).toBeCloseTo(50 / Math.sqrt(10), 9);
    expect(halfWay.loss).toBeCloseTo(1250, 6);
    const done = powerlineAt(el, [['up', 8]]);
    expect(done.volts).toBeCloseTo(40_000, 6);
    expect(done.amps).toBeCloseTo(5, 9);
    expect(done.loss).toBeCloseTo(125, 6);
    // The voltage stays for the clips that follow.
    expect(powerlineAt(el, [['up', 10], ['a', 2]]).volts).toBeCloseTo(40_000, 6);
  });

  it('moves the dots that mark its current in step with the current', () => {
    const el = line();
    expect(powerlineAt(el, [['a', 2]]).drift).toBeCloseTo(100, 6);
    expect(powerlineAt(el, [['a', 9]]).drift).toBeCloseTo(200, 6);
    expect(powerlineAt(el, [['nothing', 3], ['a', 1]]).drift).toBeCloseTo(50, 6);
    // At ten times the voltage the dots move a tenth as fast.
    const before = powerlineAt(el, [['up', 6]]).drift;
    expect(powerlineAt(el, [['up', 8]]).drift - before).toBeCloseTo(10, 6);
    // While the voltage rises the dots slow down: they move less far than at 4000 V, and further than at 40 000 V.
    expect(before).toBeLessThan(300);
    expect(before).toBeGreaterThan(30);
  });

  it('knows the largest current it carries in any clip', () => {
    expect(peakLineAmps(line())).toBeCloseTo(50, 9);
    expect(peakLineAmps(line({ clips: { down: { phases: [{ dur: 4, volts: 2000 }] } } }))).toBeCloseTo(100, 9);
  });
});

describe('the checks on a transformer and a power line', () => {
  it('pass the lesson\'s elements', () => {
    expect(checkTransformer(step())).toEqual([]);
    expect(checkTransformer(battery())).toEqual([]);
    expect(checkTransformer(battery({ settle: 0.01 }))).toEqual([]);
    expect(checkPowerline(line())).toEqual([]);
  });

  it('find coils, a supply or a lamp that cannot be', () => {
    expect(checkTransformer(step({ turns: [100.5, 50] })).join(' ')).toContain('whole number of turns');
    expect(checkTransformer(step({ turns: [100, 0] })).join(' ')).toContain('whole number of turns');
    expect(checkTransformer(step({ volts: 0 })).join(' ')).toContain('voltage above zero');
    expect(checkTransformer(step({ hertz: 0 })).join(' ')).toContain('frequency above zero');
    expect(checkTransformer(battery({ hertz: 50 })).join(' ')).toContain('a battery has no frequency');
    expect(checkTransformer(step({ settle: 0.004 })).join(' ')).toContain('only a battery');
    expect(checkTransformer(battery({ settle: 0 })).join(' ')).toContain('only a battery');
    expect(checkTransformer(step({ load: 0 })).join(' ')).toContain('resistance above zero');
    expect(checkTransformer(step({ rate: 0 })).join(' ')).toContain('rate');
    expect(checkTransformer(step({ sweep: 0 })).join(' ')).toContain('sweep');
  });

  it('find a poster that is not a clip, a thumbnail part that is not a part, and clips that cannot play', () => {
    expect(checkTransformer(step({ poster: 'nothing' })).join(' ')).toContain('poster');
    expect(checkTransformer(step({ thumb: ['loss'] })).join(' ')).toContain('thumbnail part');
    expect(checkTransformer(step({ clips: { a: { phases: [] } } })).join(' ')).toContain('no phases');
    expect(checkTransformer(step({ clips: { a: { phases: [{ dur: 0 }] } } })).join(' ')).toContain('no duration');
    expect(checkTransformer(step({ clips: { a: { phases: [{ dur: 2, secondary: 0 }] } } })).join(' ')).toContain('whole number of turns for the secondary');
    expect(checkTransformer(step({ clips: { a: { phases: [{ dur: 2, secondary: 12.5 }] } } })).join(' ')).toContain('whole number of turns for the secondary');
    expect(checkPowerline(line({ poster: 'nothing' })).join(' ')).toContain('poster');
    expect(checkPowerline(line({ thumb: ['flux'] })).join(' ')).toContain('thumbnail part');
    expect(checkPowerline(line({ clips: { a: { phases: [] } } })).join(' ')).toContain('no phases');
    expect(checkPowerline(line({ clips: { a: { phases: [{ dur: 0 }] } } })).join(' ')).toContain('no duration');
    expect(checkPowerline(line({ clips: { a: { phases: [{ dur: 2, volts: 0 }] } } })).join(' ')).toContain('voltage above zero');
  });

  it('find a power line with no power, no resistance or no voltage, and one that would waste all it is sent', () => {
    expect(checkPowerline(line({ watts: 0 })).join(' ')).toContain('power above zero');
    expect(checkPowerline(line({ ohms: 0 })).join(' ')).toContain('resistance above zero');
    expect(checkPowerline(line({ volts: 0 })).join(' ')).toContain('voltage above zero');
    // 200 kW at 1000 V is 200 A, and 200² × 5 is all 200 kW.
    expect(checkPowerline(line({ volts: 1000 })).join(' ')).toContain('waste all of the power');
    expect(checkPowerline(line({ clips: { down: { phases: [{ dur: 2, volts: 500 }] } } })).join(' ')).toContain('steps the line down');
    expect(checkPowerline(line({ volts: 1001 }))).toEqual([]);
  });
});

describe('a transformer and a power line in a video', () => {
  const video = (el: TransformerEl | PowerlineEl, show: string[], play: string): Explainer => ({
    id: 'test',
    lessonId: 'test',
    title: 'Transformers',
    summary: 'A test.',
    scenes: [{ layout: 'center', main: [el], lines: [{ say: 'Here is a transformer.', show }, { say: 'Watch it work.', play }] }],
  });

  it('pass the script check, and a part that does not exist does not', () => {
    expect(checkScript(video(step(), ['t', 't.flux', 't.turns', 't.voltage', 't.current', 't.power'], 't.a'))).toEqual([]);
    expect(checkScript(video(battery(), ['b', 'b.flux', 'b.voltage'], 'b.on'))).toEqual([]);
    expect(checkScript(video(line(), ['g', 'g.voltage', 'g.current', 'g.loss'], 'g.up'))).toEqual([]);
    expect(checkScript(video(step(), ['t', 't.loss'], 't.a')).join(' ')).toContain('has no part "loss"');
    expect(checkScript(video(line(), ['g', 'g.flux'], 'g.a')).join(' ')).toContain('has no part "flux"');
    expect(checkScript(video(step({ volts: 0 }), ['t'], 't.a')).join(' ')).toContain('transformer "t"');
    expect(checkScript(video(line({ ohms: 0 }), ['g'], 'g.a')).join(' ')).toContain('power line "g"');
  });

  it('play their clips on the timeline', () => {
    const el = step();
    const tl = compile(video(el, ['t', 't.flux'], 't.a'), { '0.0': 2, '0.1': 2 });
    expect(clipSeconds(el, 'a')).toBe(8);
    expect(clipSeconds(el, 'up')).toBe(10);
    const play = tl.scenes[0].events.find((ev) => ev.kind === 'play');
    expect(play).toBeDefined();
    const st = stateAt(tl, play!.t + 1).els.t;
    expect(st.plays).toEqual([['a', 1]]);
    expect(transformerAt(el, st.plays).vp).toBeCloseTo(12, 6);

    const grid = line();
    const tl2 = compile(video(grid, ['g', 'g.voltage'], 'g.up'), { '0.0': 2, '0.1': 2 });
    expect(clipSeconds(grid, 'up')).toBe(10);
    const play2 = tl2.scenes[0].events.find((ev) => ev.kind === 'play');
    const st2 = stateAt(tl2, play2!.t + 3).els.g;
    expect(st2.plays).toEqual([['up', 3]]);
    expect(powerlineAt(grid, st2.plays).volts).toBeCloseTo(4000 * Math.sqrt(10), 6);
  });
});
