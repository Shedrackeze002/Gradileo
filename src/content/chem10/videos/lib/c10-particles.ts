import type { ParticlesEl } from '@/video/script.ts';

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
