import type { ParticleBox, ParticlesEl } from '@/video/script.ts';
import { ATOM, hydrogenBurning } from '@/video/reactions.ts';

/**
 * Dinitrogen tetroxide and nitrogen dioxide in a sealed tube. Each nitrogen dioxide molecule is
 * drawn as one particle: kind 0 is a free one (orange), kind 1 one half of a dinitrogen tetroxide
 * molecule (blue, two bonded together). A dinitrogen tetroxide molecule falls apart by itself
 * now and then (more often when hot, as it takes energy in), and two nitrogen dioxide molecules
 * that touch sometimes pair up. Kinds 2 and 3 are the same two, kept in a burette above the tube
 * until a phase's `add` pours them in (`moreNO2`, `moreN2O4`).
 */
export interface N2O4Options {
  dimers?: number;
  free?: number;
  label?: string;
  /** The chance a pair falls apart each step, and that two that touch pair up. */
  split?: number;
  pair?: number;
  temp?: number;
  /** How much each split cools the box (and each pairing warms it). */
  heat?: number;
  /** With this, splitting depends on the temperature (e^(−energy/T)). */
  energy?: number;
  moreNO2?: number;
  moreN2O4?: number;
  lid?: number;
}

/** Chances that settle with about a quarter of the molecules split, in about ten seconds. */
const RATES = { split: 0.00008, pair: 0.0003 };

export const n2o4Box = (id: string, o: N2O4Options = {}): ParticleBox => {
  // With `energy`, the chance is raised so that the tube splits as often as usual at 0.6.
  const split = (o.split ?? RATES.split) * (o.energy ? Math.exp(o.energy / 0.6) : 1);
  const burette = (o.moreNO2 ?? 0) + (o.moreN2O4 ?? 0) > 0;
  const pairUp = (a: number, b: number) => ({ a, b, to: [1, 1] as [number, number], join: true, reach: 1.15, chance: o.pair ?? RATES.pair, heat: o.heat ?? 0 });
  return {
    id,
    state: 'gas',
    width: 11,
    height: 8,
    temp: o.temp ?? 0.6,
    ...(o.lid ? { lid: o.lid } : {}),
    kinds: [
      { n: o.free ?? 0, bond: 0.15, heavy: 0, size: 1.1, tone: 'opp', name: 'nitrogen dioxide' },
      { n: 0, bond: 0.15, heavy: 0, size: 1.1, tone: 'adj', name: 'dinitrogen tetroxide' },
      { n: o.moreNO2 ?? 0, bond: 0.15, heavy: 0, size: 1.1, tone: 'opp' },
      { n: 0, bond: 0.15, heavy: 0, size: 1.1, tone: 'adj' },
    ],
    molecules: [...(o.dimers ? [{ atoms: [1, 1], n: o.dimers }] : []), ...(o.moreN2O4 ? [{ atoms: [3, 3], n: o.moreN2O4 }] : [])],
    breaks: [
      { kinds: [1, 1], to: [0, 0], chance: split, energy: o.energy, heat: -(o.heat ?? 0) },
      { kinds: [3, 3], to: [0, 0], chance: split, energy: o.energy, heat: -(o.heat ?? 0) },
    ],
    reactions: [pairUp(0, 0), pairUp(0, 2), pairUp(2, 2)],
    ...(burette ? { reserve: [...(o.moreNO2 ? [2] : []), ...(o.moreN2O4 ? [3] : [])] } : {}),
    tally: { kinds: [0, 2], label: 'nitrogen dioxide molecules' },
    label: o.label ?? 'sealed tube',
  };
};

/** One sealed tube that starts as dinitrogen tetroxide only (clip `go`). */
export const n2o4 = (id: string, o: N2O4Options & { seed?: number; height?: number } = {}): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [n2o4Box('t', { dimers: 30, ...o })],
  clips: { go: { phases: [{ dur: 20 }] } },
  key: true,
  seed: o.seed ?? 1,
  height: o.height ?? 440,
});

/** The same tube started two ways: all dinitrogen tetroxide, and all nitrogen dioxide. */
export const n2o4BothWays = (id: string, o: { seed?: number; height?: number } = {}): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [n2o4Box('a', { dimers: 20, label: 'start: all dinitrogen tetroxide' }), n2o4Box('b', { free: 40, label: 'start: all nitrogen dioxide' })],
  clips: { go: { phases: [{ dur: 18 }] } },
  key: true,
  seed: o.seed ?? 1,
  height: o.height ?? 400,
});

export type Stress = 'more-no2' | 'more-n2o4' | 'squeeze' | 'heat' | 'cool';

/**
 * A tube at equilibrium that is then disturbed (clip `stress`): 6 s settled, the stress over 2 s,
 * then 16 s to shift. More nitrogen dioxide or dinitrogen tetroxide drips in from a burette, the
 * lid squeezes the gas into half the space, or the tube is heated or cooled (splitting takes energy
 * in, so it speeds up when hot).
 */
export const n2o4Stress = (id: string, stress: Stress, o: { seed?: number; height?: number; label?: string } = {}): ParticlesEl => {
  const thermal = stress === 'heat' || stress === 'cool';
  const middle =
    stress === 'more-no2' ? { add: { t: 16 } } : stress === 'more-n2o4' ? { add: { t: 16 } } : stress === 'squeeze' ? { lid: { t: 0.5 } } : { heat: { t: stress === 'heat' ? 1.1 : 0.35 } };
  return {
    kind: 'particles',
    id,
    boxes: [
      n2o4Box('t', {
        dimers: 23,
        free: 14,
        ...(stress === 'more-no2' ? { moreNO2: 16 } : stress === 'more-n2o4' ? { moreN2O4: 16 } : {}),
        ...(thermal ? { energy: 1.5 } : {}),
        label: o.label ?? 'sealed tube at equilibrium',
      }),
    ],
    clips: { stress: { phases: [{ dur: 6 }, { dur: 2, ...middle }, { dur: 16 }] } },
    key: true,
    ...(thermal ? { thermometers: true } : {}),
    seed: o.seed ?? 1,
    height: o.height ?? 440,
  };
};

/**
 * Hydrogen and oxygen at room temperature (clip `spark`): for 10 s the molecules only bounce
 * apart, then a spark heats one moment of the box and the reaction spreads, its own heat keeping
 * it going.
 */
export const sparked = (id: string, o: { seed?: number; height?: number } = {}): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [hydrogenBurning('b', { label: 'hydrogen and oxygen' })],
  clips: { spark: { phases: [{ dur: 10 }, { dur: 1, heat: { b: 2 } }, { dur: 2 }, { dur: 1, heat: { b: 0.4 } }, { dur: 12 }] } },
  thermometers: true,
  seed: o.seed ?? 1,
  height: o.height ?? 440,
});

/**
 * The same warm mixture of hydrogen and oxygen twice (clip `go`): on the left the usual high
 * barrier, on the right a lower one, as a catalyst gives. The particles move at the same speeds
 * in both, but many more of their collisions have enough energy to react on the right. Little
 * heat is given out, so neither box runs away.
 */
export const catalysed = (id: string, o: { seed?: number; height?: number; barrier?: number; lower?: number; temp?: number } = {}): ParticlesEl => {
  const box = (bid: string, energy: number, label: string): ParticleBox => {
    const b = hydrogenBurning(bid, { label, temp: o.temp ?? 0.5 });
    return { ...b, width: 10, height: 8, reactions: b.reactions!.map((r, i) => ({ ...r, heat: 0.02, ...(i === 0 ? { energy } : {}) })) };
  };
  return {
    kind: 'particles',
    id,
    boxes: [box('u', o.barrier ?? 4, 'no catalyst'), box('c', o.lower ?? 1.5, 'with a catalyst')],
    clips: { go: { phases: [{ dur: 16 }] } },
    thermometers: true,
    seed: o.seed ?? 1,
    height: o.height ?? 400,
  };
};

/**
 * Dinitrogen tetroxide splitting in a tube with a thermometer (clip `go`): each split takes energy
 * in, so the tube cools as nitrogen dioxide builds up (an endothermic change).
 */
export const endothermic = (id: string, o: { seed?: number; height?: number } = {}): ParticlesEl => ({
  ...n2o4(id, { seed: o.seed, height: o.height, heat: 0.04, label: 'dinitrogen tetroxide splitting' }),
  thermometers: true,
});

/**
 * Sodium hydroxide dripped into water and into an acetic acid and acetate buffer (clip `drip`).
 * In the buffer, each hydroxide ion takes the hydrogen from an acetic acid molecule, making water
 * and an acetate ion, so no hydroxide ions build up; in the water, they all stay. With `drops`
 * above the number of acid molecules (6), the buffer is used up and hydroxide ions build up there
 * too. The kinds: 0 the acid's hydrogen, 1 the rest of the acid (or an acetate ion), 2 sodium ion,
 * 3 and 4 a hydroxide ion's O and H, 5 and 6 a water molecule made, 7 an acetate ion.
 */
export const bufferVsWater = (id: string, o: { seed?: number; height?: number; drops?: number; only?: 'buffer' } = {}): ParticlesEl => {
  const H = { ...ATOM.H, name: undefined };
  const O = { ...ATOM.O, name: undefined };
  const acetate = { bond: 0.15, heavy: 0, size: 1.3, tone: 'opp' as const };
  const drops = o.drops ?? 5;
  const box = (bid: string, buffer: boolean): ParticleBox => ({
    id: bid,
    state: 'gas',
    width: 9,
    height: 8,
    temp: 0.5,
    kinds: [
      { ...H, n: 0 },
      { ...acetate, n: 0, name: buffer ? 'acetic acid molecule' : undefined },
      { n: drops, bond: 0.15, heavy: 0, tone: 'brand', name: 'sodium ion' },
      { ...O, tone: 'adj', name: 'hydroxide ion' },
      H,
      H,
      { ...O, name: 'water made' },
      // Acetate ions are drawn green, so an acid molecule that loses its hydrogen visibly changes.
      { ...acetate, tone: 'good' as const, n: buffer ? 6 : 0, name: buffer ? 'acetate ion' : undefined },
    ],
    molecules: [{ atoms: [3, 4], n: drops }, ...(buffer ? [{ atoms: [0, 1], n: 6 }] : [])],
    reserve: [2, 3, 4],
    reactions: buffer ? [{ a: 0, b: 3, free: [7, null] as [number, null], to: [5, 6] as [number, number], join: true }] : [],
    // A hydroxide ion is drawn to an acid molecule's hydrogen, so it soon finds one.
    ...(buffer ? { pairs: [{ kinds: [0, 3] as [number, number], bond: 2 }] } : {}),
    tally: { kinds: [3], label: 'hydroxide ions left' },
    label: buffer ? 'buffer: acetic acid and acetate' : 'pure water',
  });
  return {
    kind: 'particles',
    id,
    boxes: o.only ? [box('b', true)] : [box('w', false), box('b', true)],
    clips: { drip: { phases: [{ dur: 2 }, { dur: drops * 1.8, add: o.only ? { b: 2 * drops } : { w: 2 * drops, b: 2 * drops } }, { dur: 8 }] } },
    key: true,
    speed: 2,
    seed: o.seed ?? 1,
    height: o.height ?? 400,
  };
};

/** Nine drops of sodium hydroxide into a buffer that holds six acetic acid molecules: past the sixth, it is used up. */
export const bufferUsedUp = (id: string, o: { seed?: number; height?: number } = {}): ParticlesEl => bufferVsWater(id, { ...o, only: 'buffer', drops: 9 });
