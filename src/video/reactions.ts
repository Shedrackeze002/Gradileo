/**
 * Ready-made particle boxes for chemistry videos: atoms in the colours the videos use, and
 * reactions tuned to look right in the simulation (src/video/particles.ts). Each returns a plain
 * `ParticleBox`, so a script can change any part of it.
 */
import type { ParticleBox } from './script.ts';

type Kind = NonNullable<ParticleBox['kinds']>[number];

/** Gas particles that barely attract one another and float freely. */
export const GAS = { n: 0, bond: 0.15, heavy: 0 } as const;

/** Atoms as a gas (`n` 0: they come in molecules); spread one into `kinds` with a count to change it. */
export const ATOM = {
  H: { ...GAS, size: 0.8, tone: 'theta', name: 'hydrogen' },
  O: { ...GAS, tone: 'bad', name: 'oxygen' },
  C: { ...GAS, tone: 'brand', name: 'carbon' },
  Ne: { ...GAS, tone: 'good', name: 'neon' },
} as const satisfies Record<string, Kind>;

/**
 * Hydrogen and oxygen gas (12 hydrogen molecules and 6 oxygen molecules), ready to burn once a
 * clip heats it to about 2: a hydrogen molecule that hits an oxygen molecule hard enough takes
 * one of its atoms, making water and leaving a loose oxygen atom, which takes the next hydrogen
 * molecule it meets. Each reaction warms the box. The kinds: 0 H in H2, 1 O in O2, 2 H in water,
 * 3 O in water (the tally counts these: one a water molecule), 4 a loose O.
 */
export function hydrogenBurning(id: string, over: Partial<ParticleBox> = {}): ParticleBox {
  const { H, O } = ATOM;
  return {
    id,
    state: 'gas',
    width: 14,
    height: 10,
    temp: 0.4,
    kinds: [H, O, H, O, O],
    molecules: [
      { atoms: [0, 0], n: 12 },
      { atoms: [1, 1], n: 6 },
    ],
    reactions: [
      { a: 0, b: 1, free: [2, 4], carry: true, to: [2, 3], join: true, energy: 4, heat: 0.35 },
      { a: 0, b: 4, free: [2, null], carry: true, to: [2, 3], join: true, heat: 0.35 },
    ],
    tally: { kinds: [3], label: 'water molecules' },
    ...over,
  };
}

/**
 * A lump of carbon (charcoal) in oxygen, ready to burn once a clip heats it to about 2.5: an oxygen
 * molecule that hits a carbon atom hard enough takes it, and it leaves as carbon dioxide. Each
 * reaction warms the box. The kinds: 0 C in the lump, 1 O in O2, 2 C in CO2 (the tally counts
 * these), 3 O in CO2. `oxygen` is how many oxygen molecules there are (10 by default).
 */
export function carbonBurning(id: string, over: Partial<ParticleBox> = {}, oxygen = 10): ParticleBox {
  const { C, O } = ATOM;
  return {
    id,
    state: 'gas',
    width: 12,
    height: 10,
    temp: 0.4,
    lump: true,
    kinds: [{ n: 16, bond: 14, heavy: 3, tone: 'brand', name: 'carbon' }, O, C, O],
    molecules: oxygen ? [{ atoms: [1, 1], n: oxygen }] : [],
    reactions: [{ a: 1, b: 0, free: [3, null], carry: true, line: true, to: [3, 2], join: true, energy: 4.5, heat: 0.25 }],
    tally: { kinds: [2], label: 'carbon dioxide molecules' },
    ...over,
  };
}
