import type { ParticleBox, ParticlesEl, Tone } from '@/video/script.ts';
import { ATOM, hydrogenBurning } from '@/video/reactions.ts';

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

/**
 * A mixture poured onto filter paper (the clip `pour` lets it through): sand and water, or with
 * `salty`, salt water, whose dissolved salt is as small as the water and goes straight through.
 */
export const filterPaper = (id: string, salty = false, height = 440): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    salty
      ? { id: 'a', state: 'liquid', width: 12, height: 12, temp: 0.5, filter: { at: 0.5, holes: 1.3 }, cross: 1.8, kinds: [{ n: 8, size: 0.8, bond: 1.2, heavy: 2, tone: 'theta', name: 'salt' }, { n: 32, size: 0.8, heavy: 2, tone: 'adj', name: 'water' }], label: 'salt water on filter paper' }
      : { id: 'a', state: 'liquid', width: 12, height: 12, temp: 0.5, filter: { at: 0.5, holes: 1.3 }, cross: 0.3, kinds: [{ n: 10, size: 1.6, heavy: 3, tone: 'opp', name: 'sand' }, { n: 30, size: 0.8, heavy: 2, tone: 'adj', name: 'water' }], label: 'sand and water on filter paper' },
  ],
  clips: { pour: { phases: [{ dur: 1, release: ['a'] }, { dur: 9 }] } },
  height,
});

/**
 * Salt water in an open dish over a flame: the clip `heat` boils the water off into the air, and
 * the clip `cool` lets the salt left behind lock together into a crystal.
 */
export const evaporatingDish = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [{ id: 'a', state: 'liquid', width: 12, height: 10, temp: 0.5, escape: true, bath: 'floor', cross: 2.4, kinds: [{ n: 10, bond: 2, heavy: 3, tone: 'theta', name: 'salt' }, { n: 40, heavy: 0.3, tone: 'adj', name: 'water' }], label: 'salt water in a dish' }],
  clips: { heat: { phases: [{ dur: 2, heat: { a: 1.8 } }, { dur: 12 }] }, cool: { phases: [{ dur: 4, heat: { a: 0.3 } }, { dur: 5 }] } },
  speed: 2.5,
  height,
});

/**
 * Salt water in a still: the flask heated on the left, the condenser cooled on the right, with a
 * wall between. The clip `boil` boils the water over the wall, and `more` lets it keep condensing.
 */
export const still = (id: string, height = 400): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 'a',
      state: 'liquid',
      width: 20,
      height: 12,
      temp: 0.5,
      wall: { at: 0.5, height: 0.5 },
      cross: 1.6,
      zones: [{ x: [0, 0.5], y: [0, 0.17] }, { x: [0.6, 1], y: [0, 1], temp: 0.4 }],
      kinds: [{ n: 8, bond: 3, heavy: 6, tone: 'theta', name: 'salt' }, { n: 30, ...WATER }],
      label: 'flask (heated)  |  condenser (cooled)',
    },
  ],
  clips: { boil: { phases: [{ dur: 2, heat: { a: 1.6 } }, { dur: 6 }] }, more: { phases: [{ dur: 10 }] } },
  speed: 5,
  height,
});

/** Iron filings and sand, with a magnet held over them by the clip `go`. */
export const magnetSand = (id: string, height = 330): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [{ id: 'a', state: 'liquid', width: 12, height: 9, temp: 0.15, cross: 0.3, kinds: [{ n: 10, bond: 0.4, heavy: 2, magnetic: true, tone: 'hyp', name: 'iron' }, { n: 26, bond: 0.4, heavy: 2, tone: 'opp', name: 'sand' }], label: 'iron filings and sand' }],
  clips: { go: { phases: [{ dur: 2, magnet: { a: 1 } }, { dur: 7 }] } },
  height,
});

const DYE_A = { n: 4, size: 0.8, bond: 1.5, heavy: 0, rise: 0.3, tone: 'hyp', name: 'dye A' } as const;
const DYE_B = { n: 4, size: 0.8, bond: 1.5, heavy: 0, rise: 0.68, tone: 'good', name: 'dye B' } as const;
const strip = (id: string, label: string, kinds: ParticleBox['kinds']): ParticleBox => ({ id, state: 'solid', width: 4, height: 12, temp: 0.005, paper: true, cross: 0, kinds, label });

/**
 * Three strips of chromatography paper (ink X, dye A and dye B), each with a dot on its pencil line;
 * the clip `run` soaks the solvent up them, and each dye travels at its own fraction of its speed.
 */
export const chromatography = (id: string, height = 460): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [strip('x', 'ink X', [{ ...DYE_A }, { ...DYE_B }]), strip('a', 'dye A', [{ ...DYE_A }]), strip('b', 'dye B', [{ ...DYE_B }])],
  clips: { run: { phases: [{ dur: 1, run: { x: 1, a: 1, b: 1 } }, { dur: 11 }] } },
  height,
});

/** Liquid water: water molecules close together, until it is heated. */
const water = (id: string): ParticleBox => ({ id, state: 'liquid', width: 10, height: 10, temp: 0.3, kinds: [{ ...ATOM.O, bond: 1, heavy: 1 }, { ...ATOM.H, bond: 1, heavy: 1 }], molecules: [{ atoms: [0, 1, 1], n: 10, bent: true }], label: 'water' });

/**
 * Water boiling (clip `boil`: a physical change, every molecule still water) beside hydrogen and
 * oxygen lit by a spark (clip `spark`: a chemical change, the atoms joined up as new water molecules,
 * counted by the part `tally`).
 */
export const boilOrBurn = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [water('w'), hydrogenBurning('h', { label: 'hydrogen and oxygen' })],
  clips: {
    boil: { phases: [{ dur: 4, heat: { w: 2.5 } }, { dur: 6 }] },
    spark: { phases: [{ dur: 1, heat: { h: 2 } }, { dur: 2 }, { dur: 1, heat: { h: 0.4 } }, { dur: 8 }] },
  },
  thermometers: true,
  seed: 7,
  height,
});

/** Water alone, boiled by the clip `boil`: its molecules fly apart, but every one is still water. */
export const boilingWater = (id: string, height = 440): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [water('w')],
  clips: { boil: { phases: [{ dur: 4, heat: { w: 2.5 } }, { dur: 6 }] } },
  thermometers: true,
  height,
});

/** Particles dissolved in water (the water itself is not drawn): they drift freely. */
const DISSOLVED = { n: 0, bond: 0.15, heavy: 0.3 } as const;

/**
 * Two signs of a reaction: zinc fizzing in acid (clip `fizz`: hydrogen gas rises as bubbles), and two
 * solutions mixed (clip `mix`: silver and chloride particles join into a precipitate that sinks).
 */
export const reactionSigns = (id: string, height = 360): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 'z',
      state: 'liquid',
      width: 10,
      height: 11,
      temp: 0.5,
      lump: true,
      hold: true,
      kinds: [
        { n: 14, bond: 3, heavy: 2, tone: 'brand', name: 'zinc' },
        { ...DISSOLVED, n: 18, size: 0.8, tone: 'theta', name: 'acid hydrogen' },
        { ...DISSOLVED, tone: 'brand', name: 'dissolved zinc' },
        { ...DISSOLVED, size: 0.8, tone: 'theta', name: 'loose hydrogen' },
        { ...DISSOLVED, size: 0.8, heavy: -1.5, tone: 'theta', name: 'hydrogen gas' },
      ],
      reactions: [
        { a: 1, b: 0, to: [3, 2], energy: 1.5 },
        { a: 3, b: 3, to: [4, 4], join: true },
      ],
      label: 'zinc in acid',
    },
    {
      id: 's',
      state: 'liquid',
      width: 10,
      height: 11,
      temp: 0.8,
      divider: 0.5,
      apart: true,
      kinds: [
        { ...DISSOLVED, n: 14, heavy: 0.1, tone: 'adj', name: 'silver' },
        { ...DISSOLVED, n: 14, heavy: 0.1, tone: 'good', name: 'chloride' },
        { n: 0, bond: 2.5, heavy: 2, tone: 'adj', name: 'solid silver chloride' },
        { n: 0, bond: 2.5, heavy: 2, tone: 'good', name: 'solid silver chloride' },
      ],
      reactions: [{ a: 0, b: 1, to: [2, 3], join: true }],
      label: 'two solutions',
    },
  ],
  clips: {
    fizz: { phases: [{ dur: 1, release: ['z'] }, { dur: 11 }] },
    mix: { phases: [{ dur: 1, lift: ['s'] }, { dur: 11 }] },
  },
  height,
});

/**
 * A lump in water, held on the floor until the clip `go` lets it go: a lump less dense than the
 * water rises to the surface and floats; a denser one stays at the bottom. A few dozen particles
 * cannot carry real buoyancy, so the floating lump gets a gentle upward pull (`heavy` below zero,
 * as hydrogen gas bubbles do), in a beaker filled to the top. It runs faster than usual (`speed`).
 */
export const floatOrSink = (id: string, height = 380): ParticlesEl => {
  const box = (bid: string, heavy: number, tone: 'adj' | 'opp' | 'hyp' | 'theta' | 'brand' | 'good', label: string): ParticleBox => ({
    id: bid,
    state: 'liquid',
    width: 10,
    height: 11,
    temp: 0.7,
    lump: true,
    hold: true,
    cross: 0.6,
    kinds: [{ n: 9, bond: 4, heavy, tone, name: label }, { n: 46, heavy: 0.4, tone: 'adj', name: 'water' }],
    label,
  });
  return {
    kind: 'particles',
    id,
    boxes: [box('ice', -0.6, 'good', 'ice'), box('nail', 4, 'hyp', 'iron')],
    clips: { go: { phases: [{ dur: 1, release: ['ice', 'nail'] }, { dur: 9 }] } },
    speed: 3,
    height,
  };
};

/**
 * A fixed mass of gas under a piston, with a volume reading: the clip `push` squeezes it into half
 * the space, so the same mass fills half the volume and its density doubles.
 */
export const densitySqueeze = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [{ id: 'g', state: 'gas', n: 22, width: 10, height: 9, temp: 1.6, piston: true, label: 'the same particles, the same mass' }],
  clips: { push: { phases: [{ dur: 5, lid: { g: 0.5 } }] } },
  volume: { box: 'g', start: 2, decimals: 1 },
  height,
});

/**
 * A solid lump fizzing in acid: an acid particle that hits the lump takes one of its particles into
 * the solution and is set loose; two loose ones join as a gas molecule that rises. With `open`, gas
 * that reaches the top leaves the beaker. With `count`, the tally under it counts every particle
 * still inside, which stands for its mass. The kinds: 0 the solid, 1 acid, 2 dissolved solid,
 * 3 set loose, 4 gas.
 */
export const fizzBox = (
  id: string,
  label: string,
  solid: { tone: Tone; name: string; gas: string },
  o: { open?: boolean; count?: boolean } = {},
): ParticleBox => ({
  id,
  state: 'liquid',
  width: 10,
  height: 11,
  temp: 0.5,
  escape: !!o.open,
  lump: true,
  hold: true,
  kinds: [
    { n: 14, bond: 3, heavy: 2, tone: solid.tone, name: solid.name },
    { ...DISSOLVED, n: 18, size: 0.8, tone: 'theta', name: 'acid' },
    { ...DISSOLVED, tone: solid.tone, name: `dissolved ${solid.name}` },
    { ...DISSOLVED, size: 0.8, tone: 'theta', name: 'set loose' },
    { ...DISSOLVED, size: 0.8, heavy: -1.5, tone: 'theta', name: solid.gas },
  ],
  reactions: [
    { a: 1, b: 0, to: [3, 2], energy: 1.5 },
    { a: 3, b: 3, to: [4, 4], join: true },
  ],
  ...(o.count ? { tally: { kinds: [0, 1, 2, 3, 4], label: 'particles inside' } } : {}),
  label,
});

const ZINC = { tone: 'brand', name: 'zinc', gas: 'hydrogen gas' } as const;
const MARBLE = { tone: 'good', name: 'marble', gas: 'carbon dioxide gas' } as const;

/** A piece of zinc fizzing in hydrochloric acid (clip `fizz`): hydrogen gas bubbles off. */
export const zincInAcid = (id: string, height = 380): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [fizzBox('z', 'zinc in hydrochloric acid', ZINC)],
  clips: { fizz: { phases: [{ dur: 1, release: ['z'] }, { dur: 13 }] } },
  height,
});

/** Marble chips fizzing in acid in an open beaker (clip `fizz`): the carbon dioxide escapes. */
export const marbleInAcid = (id: string, height = 380): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [fizzBox('m', 'marble chips in acid', MARBLE, { open: true })],
  clips: { fizz: { phases: [{ dur: 1, release: ['m'] }, { dur: 13 }] } },
  height,
});

/**
 * Marble chips fizzing in an open beaker and in a sealed flask side by side (clip `fizz`), each with
 * every particle inside counted: the open count falls as gas escapes; the sealed one never changes.
 */
export const openClosed = (id: string, height = 400): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [fizzBox('o', 'open beaker', MARBLE, { open: true, count: true }), fizzBox('s', 'sealed flask', MARBLE, { count: true })],
  clips: { fizz: { phases: [{ dur: 1, release: ['o', 's'] }, { dur: 15 }] } },
  height,
});

/** Hydrogen burning in a sealed flask (clip `spark`), with every atom counted: the count never changes. */
export const sealedBurning = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [hydrogenBurning('b', { tally: { kinds: [0, 1, 2, 3, 4], label: 'atoms' }, label: 'hydrogen and oxygen, sealed' })],
  clips: { spark: { phases: [{ dur: 1, heat: { b: 2 } }, { dur: 2 }, { dur: 1, heat: { b: 0.4 } }, { dur: 10 }] } },
  thermometers: true,
  seed: 3,
  height,
});

/**
 * Two reactions in solution, each pair of solutions kept apart by a divider until the clip `mix`
 * lifts both: where a particle of one meets a particle of the other they join, and each reaction
 * warms its box (left, exothermic) or cools it (right, endothermic), so the thermometers move apart.
 */
export const hotAndCold = (id: string, height = 400): ParticlesEl => {
  const box = (bid: string, heat: number, a: Tone, b: Tone, label: string): ParticleBox => ({
    id: bid,
    state: 'liquid',
    width: 10,
    height: 10,
    temp: 0.8,
    divider: 0.5,
    apart: true,
    kinds: [
      { ...DISSOLVED, n: 14, heavy: 0.1, tone: a, name: 'one reactant' },
      { ...DISSOLVED, n: 14, heavy: 0.1, tone: b, name: 'the other reactant' },
      { ...DISSOLVED, heavy: 0.1, tone: a, name: 'product' },
      { ...DISSOLVED, heavy: 0.1, tone: b, name: 'product' },
    ],
    reactions: [{ a: 0, b: 1, to: [2, 3], join: true, heat }],
    label,
  });
  return {
    kind: 'particles',
    id,
    boxes: [box('ex', 0.06, 'bad', 'adj', 'exothermic'), box('en', -0.07, 'theta', 'good', 'endothermic')],
    clips: { mix: { phases: [{ dur: 1, lift: ['ex', 'en'] }, { dur: 13 }] } },
    thermometers: true,
    height,
  };
};

/** Magnesium ribbon fizzing in hydrochloric acid (clip `fizz`): hydrogen gas bubbles off. */
export const magnesiumInAcid = (id: string, height = 380): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [fizzBox('mg', 'magnesium in hydrochloric acid', { tone: 'opp', name: 'magnesium', gas: 'hydrogen gas' }, { open: true })],
  clips: { fizz: { phases: [{ dur: 1, release: ['mg'] }, { dur: 13 }] } },
  height,
});

const ION = { n: 8, bond: 0.15, heavy: 0 } as const;

/**
 * Hydrochloric acid and sodium hydroxide solution, just mixed (clip `go`): a hydrogen ion that
 * meets a hydroxide ion joins it as a water molecule, giving out heat; the sodium and chloride ions
 * take no part and are left as the salt. As in Chemistry 9 (c9-4-3).
 */
export const neutralizing = (id: string, height = 440): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 'b',
      state: 'gas',
      width: 11,
      height: 9,
      temp: 0.5,
      waits: true,
      // 0 hydrogen ion, 1 chloride ion, 2 sodium ion, 3 and 4 a hydroxide ion's O and H,
      // 5 and 6 the hydrogen ion and the oxygen once they are water.
      kinds: [{ ...ATOM.H, n: 8, name: 'hydrogen ion' }, { ...ION, tone: 'good', name: 'chloride ion' }, { ...ION, tone: 'brand', name: 'sodium ion' }, ATOM.O, ATOM.H, ATOM.H, ATOM.O],
      molecules: [{ atoms: [3, 4], n: 8 }],
      reactions: [{ a: 0, b: 3, to: [5, 6], join: true, heat: 0.12 }],
      tally: { kinds: [6], label: 'water molecules' },
      label: 'hydrochloric acid + sodium hydroxide',
    },
  ],
  clips: { go: { phases: [{ dur: 1, release: ['b'] }, { dur: 13 }] } },
  thermometers: true,
  seed: 1,
  height,
});

/**
 * Sodium chloride solution in an evaporating dish: the clip `heat` drives the water off, and `cool`
 * lets the sodium ions and chloride ions left behind lock together as a crystal, one of each.
 */
export const saltCrystals = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 'a',
      state: 'liquid',
      width: 12,
      height: 10,
      temp: 0.5,
      escape: true,
      bath: 'floor',
      cross: 2.4,
      kinds: [
        { n: 6, bond: 2, heavy: 3, tone: 'brand', name: 'sodium ion' },
        { n: 6, bond: 2, heavy: 3, tone: 'good', name: 'chloride ion' },
        { n: 40, heavy: 0.3, tone: 'adj', name: 'water' },
      ],
      label: 'sodium chloride solution',
    },
  ],
  clips: { heat: { phases: [{ dur: 2, heat: { a: 1.8 } }, { dur: 12 }] }, cool: { phases: [{ dur: 4, heat: { a: 0.3 } }, { dur: 5 }] } },
  speed: 2.5,
  height,
});
