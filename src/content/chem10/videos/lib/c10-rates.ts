import type { ParticleBox, ParticlesEl } from '@/video/script.ts';

// Rates of reaction, simulated (src/video/particles.ts) as in Chemistry 9 (c9-3-4): a blue and a
// yellow particle that collide hard enough join into a new molecule, and the count under each box
// is how many have formed. Each comparison is the same reaction with one thing changed, and the
// clip `go` lets both boxes start together.

/** A gas particle that barely attracts the others. */
const GAS = { n: 0, bond: 0.15, heavy: 0 } as const;
const A = { ...GAS, tone: 'adj', name: 'A' } as const;
const B = { ...GAS, tone: 'theta', name: 'B' } as const;

/** Two gases that react on a hard enough collision (`energy`), waiting to start on cue. */
export const gases = (id: string, label: string, o: { n?: number; temp?: number; energy?: number } = {}): ParticleBox => ({
  id,
  state: 'gas',
  width: 10,
  height: 9,
  temp: o.temp ?? 0.7,
  waits: true,
  kinds: [{ ...A, n: o.n ?? 10 }, { ...B, n: o.n ?? 10 }, A, B],
  reactions: [{ a: 0, b: 1, to: [2, 3], join: true, energy: o.energy ?? 1.5 }],
  tally: { kinds: [2], label: 'new molecules' },
  label,
});

/** A solid (as one lump, or broken into `pieces`) that reacts with the gas round it. */
export const solid = (id: string, label: string, pieces: number): ParticleBox => ({
  id,
  state: 'gas',
  width: 22,
  height: 9,
  temp: 0.7,
  waits: true,
  lump: pieces === 1 ? true : pieces,
  cols: pieces === 1 ? 6 : 2,
  // Held still until let go, so the pieces do not drift together before the reaction starts.
  hold: true,
  cross: 0.2,
  kinds: [{ n: 24, bond: 6, heavy: 3, tone: 'good', name: 'solid' }, { ...B, n: 24 }, { ...GAS, tone: 'good' }, B],
  reactions: [{ a: 1, b: 0, to: [3, 2], join: true, energy: 1.0, reach: 1.15 }],
  tally: { kinds: [2], label: 'new molecules' },
  label,
});

/** Two boxes side by side, let go together by the clip `go`. */
export const pair = (id: string, a: ParticleBox, b: ParticleBox, extra: Partial<ParticlesEl> = {}): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [a, b],
  clips: { go: { phases: [{ dur: 1, release: [a.id, b.id] }, { dur: 13 }] } },
  height: 400,
  ...extra,
});

export const temperature = (id: string, height = 400) => pair(id, gases('a', 'cold', { temp: 0.4 }), gases('b', 'hot', { temp: 1.2 }), { thermometers: true, height });
export const concentration = (id: string, height = 400) => pair(id, gases('a', 'dilute', { n: 6 }), gases('b', 'concentrated', { n: 16 }), { height });
export const surface = (id: string, height = 400) => pair(id, solid('a', 'one lump', 1), solid('b', 'small pieces', 4), { seed: 8, height });
export const catalyst = (id: string, height = 400) => pair(id, gases('a', 'no catalyst', { energy: 3.5 }), gases('b', 'with a catalyst', { energy: 0.6 }), { height });

/** One box of the two gases reacting (clip `go`); most collisions are too gentle to react. */
export const oneReaction = (id: string, height = 400): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [gases('a', 'A and B reacting', { n: 12, energy: 2.5 })],
  clips: { go: { phases: [{ dur: 1, release: ['a'] }, { dur: 15 }] } },
  seed: 1,
  height,
});

/**
 * A fast reaction left to run (clip `go`): the count of new molecules climbs quickly at first, then
 * more and more slowly as the reactants are used up, until it all but stops.
 */
export const runsOut = (id: string, height = 400): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [gases('a', 'A and B reacting', { n: 12, energy: 1.5 })],
  clips: { go: { phases: [{ dur: 1, release: ['a'] }, { dur: 17 }] } },
  seed: 1,
  height,
});
