import type { ParticleBox, ParticlesEl } from '@/video/script.ts';
import { ATOM } from '@/video/reactions.ts';

// Simulated particles for Chemistry 10 (src/video/particles.ts): they attract and jostle one
// another, so a cold box settles into vibrating rows, a warm one slides about and a hot one flies
// apart. Nothing about their motion is drawn by hand.

/** Thermometer marks where this simulation melts and boils. */
export const MARKS = { marks: [{ at: 0.33, label: 'melts' }, { at: 0.9, label: 'boils' }] };

/** The three states side by side: the same particles at three temperatures. */
export const threeStates = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    { id: 's', state: 'solid', n: 36, label: 'solid' },
    { id: 'l', state: 'liquid', n: 36, label: 'liquid' },
    { id: 'g', state: 'gas', n: 24, label: 'gas' },
  ],
  clips: {},
  height,
});

/** One box with one particle in yellow, so its path (the part `trail`) can be followed. */
export const followOne = (id: string, state: 'solid' | 'liquid' | 'gas', n: number, height = 480): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [{ id: 'b', state, n, follow: state === 'gas' ? 3 : 14, width: 10, height: 9 }],
  clips: {},
  height,
});

/** A gas, a liquid and a solid under pistons, all pushed with the same push (clip `push`). */
export const squeeze = (id: string, height = 400): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    { id: 's', state: 'solid', n: 45, height: 7, piston: true, label: 'solid' },
    { id: 'l', state: 'liquid', n: 45, height: 7, piston: true, label: 'liquid' },
    { id: 'g', state: 'gas', n: 18, height: 7, piston: true, label: 'gas' },
  ],
  clips: { push: { phases: [{ dur: 5, lid: { s: 0.4, l: 0.4, g: 0.4 } }] } },
  height,
});

/** Two gases and two liquids, each pair kept apart by a divider until the clip `lift` lifts it. */
export const diffusion = (id: string, height = 400): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    { id: 'g', state: 'gas', kinds: [{ n: 10, tone: 'opp' }, { n: 10, tone: 'adj' }], apart: true, divider: 0.5, width: 12, height: 9, temp: 3, label: 'two gases' },
    { id: 'l', state: 'liquid', kinds: [{ n: 30, tone: 'opp' }, { n: 30, tone: 'adj' }], apart: true, divider: 0.5, width: 12, height: 9, temp: 0.5, label: 'two liquids' },
  ],
  clips: { lift: { phases: [{ dur: 12, lift: ['g', 'l'] }] } },
  height,
});

/**
 * One box taken round the whole cycle by its clips: `melt`, `boil`, `condense` and `freeze`, with a
 * thermometer marked where it melts and boils.
 */
export const stateCycle = (id: string, height = 500): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [{ id: 'b', state: 'solid', n: 36, width: 10, height: 10, temp: 0.1 }],
  clips: {
    melt: { phases: [{ dur: 5, heat: { b: 0.5 } }, { dur: 1.5 }] },
    boil: { phases: [{ dur: 6, heat: { b: 2.5 } }, { dur: 1.5 }] },
    condense: { phases: [{ dur: 6, heat: { b: 0.5 } }, { dur: 1.5 }] },
    freeze: { phases: [{ dur: 6, heat: { b: 0.08 } }, { dur: 1.5 }] },
  },
  thermometers: MARKS,
  height,
});

/**
 * Water vapour in the air beside a cold glass: the right-hand wall is the glass. Its clip `cool`
 * chills that wall, and the vapour condenses on it as droplets.
 */
export const coldGlass = (id: string, height = 480): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [{ id: 'b', state: 'gas', n: 30, width: 12, height: 10, temp: 2, bath: 'right', heatColor: [0.15, 2], label: 'air beside a cold glass' }],
  clips: { cool: { phases: [{ dur: 1, heat: { b: 0.08 } }, { dur: 9 }] } },
  height,
});

/**
 * A box held below, then between, then above its melting and boiling points: it starts as a solid,
 * and its clips `liquid` and `gas` set it to the two higher temperatures.
 */
export const threeTemperatures = (id: string, height = 480): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [{ id: 'b', state: 'solid', n: 30, width: 9, height: 9, temp: 0.12 }],
  clips: {
    liquid: { phases: [{ dur: 3, heat: { b: 0.55 } }, { dur: 1 }] },
    gas: { phases: [{ dur: 3, heat: { b: 2.5 } }, { dur: 1 }] },
  },
  thermometers: MARKS,
  height,
});

/** Atoms as a gas, their pull on one another weakened so that molecules stay apart. */
const H = { ...ATOM.H, size: 0.7, bond: 0.05 };
const O = { ...ATOM.O, size: 0.9, bond: 0.05 };
const N = { ...ATOM.Ne, name: 'nitrogen', tone: 'adj' as const, size: 0.9, bond: 0.05 };
const gasBox = (b: Partial<ParticleBox>): ParticleBox => ({ id: 'x', state: 'gas', width: 8, height: 8, temp: 1.6, ...b });

/** An element of single atoms (helium), an element of molecules (oxygen) and a compound (water). */
export const substances = (id: string, height = 360): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    gasBox({ id: 'he', kinds: [{ n: 8, bond: 0.15, heavy: 0, tone: 'good', name: 'helium' }], label: 'element: helium, He' }),
    gasBox({ id: 'ox', kinds: [O], molecules: [{ atoms: [0, 0], n: 6 }], label: 'element: oxygen, O₂' }),
    gasBox({ id: 'cp', kinds: [O, H], molecules: [{ atoms: [0, 1, 1], n: 6, bent: true }], label: 'compound: water, H₂O' }),
  ],
  clips: {},
  height,
});

/** Air: nitrogen and oxygen molecules and argon atoms, about 78%, 21% and 1%, moving among one another. */
export const air = (id: string, height = 440): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    gasBox({
      id: 'b',
      width: 11,
      height: 10,
      kinds: [N, O, { n: 1, bond: 0.15, heavy: 0, tone: 'theta', name: 'argon' }],
      molecules: [
        { atoms: [0, 0], n: 11 },
        { atoms: [1, 1], n: 3 },
      ],
      label: 'air',
    }),
  ],
  clips: {},
  height,
});

/**
 * Iron and sulfur stirred together (a mixture), and grains of iron sulfide (a compound, a new
 * substance). The clip `magnet` holds a magnet over both: it lifts only the free iron.
 */
export const ironSulfur = (id: string, height = 360): ParticlesEl => {
  const grains = { bond: 0.4, heavy: 2 };
  const iron = { ...grains, tone: 'hyp' as const, name: 'iron' };
  const sulfur = { ...grains, tone: 'theta' as const, name: 'sulfur' };
  return {
    kind: 'particles',
    id,
    boxes: [
      { id: 'm', state: 'liquid', width: 12, height: 9, temp: 0.15, cross: 0.3, kinds: [{ n: 10, ...iron, magnetic: true }, { n: 14, ...sulfur }], label: 'mixture: iron and sulfur' },
      { id: 'c', state: 'liquid', width: 12, height: 9, temp: 0.15, kinds: [{ n: 16, ...grains, size: 1.2, tone: 'brand', name: 'iron sulfide' }], label: 'compound: iron sulfide, FeS' },
    ],
    clips: { magnet: { phases: [{ dur: 2, magnet: { m: 1, c: 1 } }, { dur: 6 }] } },
    height,
  };
};

const WATER = { heavy: 0.2, tone: 'adj' as const, name: 'water' };
const SUGAR = { bond: 1.5, heavy: 0.2, tone: 'theta' as const, name: 'sugar' };

/**
 * Two mixtures in water: salt dissolved evenly all through it (homogeneous), and sand that sinks to
 * the bottom (heterogeneous).
 */
export const twoMixtures = (id: string, height = 360): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    { id: 'homo', state: 'liquid', width: 10, height: 9, temp: 0.7, cross: 1.8, kinds: [{ n: 8, bond: 1.2, heavy: 0.2, tone: 'theta', name: 'salt' }, { n: 40, ...WATER }], label: 'salt water' },
    { id: 'hetero', state: 'liquid', width: 10, height: 9, temp: 0.7, cross: 1, kinds: [{ n: 10, bond: 4, heavy: 3, size: 1.2, tone: 'opp', name: 'sand' }, { n: 40, ...WATER }], label: 'sand and water' },
  ],
  clips: {},
  speed: 4,
  height,
});

/** A lump of sugar held above the floor of a beaker of water; the clip `drop` lets it go and it dissolves. */
export const sugarDissolving = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [{ id: 's', state: 'liquid', kinds: [{ n: 14, ...SUGAR }, { n: 44, ...WATER }], lump: true, hold: true, cross: 1.8, width: 12, height: 9, temp: 0.7, label: 'sugar in water' }],
  clips: { drop: { phases: [{ dur: 1, release: ['s'] }, { dur: 11 }] } },
  speed: 4,
  height,
});
