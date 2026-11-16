import type { ParticleBox, ParticlesEl, Tone } from '@/video/script.ts';
import { hydrogenBurning } from '@/video/reactions.ts';

// Simulated particles for Chemistry 20 (src/video/particles.ts), shared by several videos.

/**
 * Liquids heated side by side, one box each, whose molecules attract one another with different
 * strengths (`bond`: 1 is the simulation's usual). They share one heater: the clip `heat` warms
 * every box in steps, and the liquid with the weakest forces between its molecules boils first.
 * In the simulation a liquid boils at a temperature of about 0.9 × its `bond`; gravity is scaled with
 * the forces (`heavy` = `bond`), so a weakly held liquid is not pinned to the floor once it boils.
 */
export const boilingRace = (id: string, liquids: Array<{ id: string; label: string; bond: number; tone: Tone; n?: number }>, height = 400): ParticlesEl => {
  const weakest = Math.min(...liquids.map((l) => l.bond));
  const start = 0.36 * Math.max(...liquids.map((l) => l.bond));
  const steps = [...liquids].sort((a, b) => a.bond - b.bond).map((l) => 0.9 * l.bond + 0.2 * weakest);
  const all = (t: number) => Object.fromEntries(liquids.map((l) => [l.id, t]));
  return {
    kind: 'particles',
    id,
    boxes: liquids.map((l): ParticleBox => ({ id: l.id, state: 'liquid', width: 8, height: 10, temp: start, kinds: [{ n: l.n ?? 24, bond: l.bond, heavy: l.bond, tone: l.tone }], label: l.label })),
    clips: { heat: { phases: steps.flatMap((t) => [{ dur: 3, heat: all(t) }, { dur: 4 }]) } },
    thermometers: true,
    height,
  };
};

/**
 * Substances side by side at one temperature, each ball standing for a whole molecule, with the
 * forces between molecules set by `bond`: weak forces leave a gas, stronger ones a liquid, and the
 * strongest a solid, all at the same temperature (shown on the thermometers). In the simulation a
 * substance melts at about 0.33 × its `bond` and boils at about 0.9 × its `bond`. A gas feels no
 * gravity here, so its molecules fill the box.
 */
export const sameTemperature = (id: string, temp: number, subs: Array<{ id: string; label: string; bond: number; tone: Tone; n?: number }>, height = 400): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: subs.map((s): ParticleBox => {
    const r = temp / s.bond;
    const state = r < 0.33 ? 'solid' : r < 0.9 ? 'liquid' : 'gas';
    return { id: s.id, state, width: 8, height: 9, temp, kinds: [{ n: s.n ?? (state === 'gas' ? 14 : 24), bond: s.bond, heavy: state === 'gas' ? 0 : s.bond, tone: s.tone }], label: s.label };
  }),
  clips: {},
  thermometers: true,
  height,
});

/**
 * Water as whole molecules (an oxygen atom and two hydrogen atoms, bonded), heated to boiling by the
 * clip `boil`: the molecules fly apart from one another, but each one stays whole.
 */
export const boilingWater = (id: string, height = 440): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 'w',
      state: 'liquid',
      width: 10,
      height: 10,
      temp: 0.3,
      kinds: [
        { n: 0, bond: 1, heavy: 1, tone: 'bad', name: 'oxygen' },
        { n: 0, bond: 1, heavy: 1, size: 0.8, tone: 'theta', name: 'hydrogen' },
      ],
      molecules: [{ atoms: [0, 1, 1], n: 10, bent: true }],
      label: 'water',
    },
  ],
  clips: { boil: { phases: [{ dur: 4, heat: { w: 2.5 } }, { dur: 8 }] } },
  thermometers: true,
  height,
});

const WATER = { heavy: 0.2, tone: 'adj', name: 'water' } as const;
const SUGAR = { bond: 1.5, heavy: 0.2, tone: 'theta', name: 'sugar molecule' } as const;
const NA = { bond: 2, heavy: 0.5, tone: 'brand', name: 'sodium ion' } as const;
const CL = { bond: 2, heavy: 0.5, tone: 'good', name: 'chloride ion' } as const;

/**
 * A lump of `n` particles of a solid in water, held until a clip drops it in. About five of its
 * particles dissolve at the usual temperature, so a bigger lump leaves solid on the bottom, and
 * nearly all of it dissolves at `HOT` (the water is held a little more firmly, so it stays liquid).
 */
const cup = (id: string, n: number, water: number, label: string, cross = 1.8): ParticleBox => ({
  id,
  state: 'liquid',
  kinds: [{ n, bond: 2, heavy: 0.5, tone: 'theta', name: 'solute' }, { n: water, ...WATER, bond: 1.2 }],
  lump: true,
  hold: true,
  cross,
  width: 10,
  height: 9,
  temp: 0.7,
  label,
});
/** The temperature the clip `heat` warms a saturated solution to. */
const HOT = 1.6;

/** A box of water with a lump of sugar in it, held until a clip drops it in. */
const sugarBox = (id: string, label: string): ParticleBox => ({ id, state: 'liquid', kinds: [{ n: 14, ...SUGAR }, { n: 44, ...WATER }], lump: true, hold: true, cross: 1.8, width: 12, height: 9, temp: 0.7, label });

/** A box of water with a crystal of sodium chloride in it: sodium and chloride ions side by side. */
const saltBox = (id: string, label: string): ParticleBox => ({
  id,
  state: 'liquid',
  kinds: [{ n: 16, ...NA }, { n: 44, ...WATER }, { n: 0, ...CL }],
  lump: true,
  lumpMix: 2,
  hold: [0, 2],
  // Water pulls on the ions harder than on sugar, so the crystal comes apart in time.
  cross: 2.3,
  width: 12,
  height: 9,
  temp: 0.7,
  label,
});

/**
 * How much can dissolve (clip `drop`): a little solid all dissolves, but in the same water a lot of
 * it leaves some undissolved on the bottom, because the water holds all it can (saturated).
 */
export const saturating = (id: string, height = 400): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [cup('a', 5, 40, 'a little solid: unsaturated', 1.5), cup('b', 24, 34, 'a lot of solid: saturated', 1.5)],
  clips: { drop: { phases: [{ dur: 1, release: ['a', 'b'] }, { dur: 12 }] } },
  // Slower than the other dissolving boxes, so the saturated lump still looks like a lump by the scene's end.
  speed: 2,
  height,
});

/**
 * A saturated solution with solid left on the bottom (clip `drop`), heated (clip `heat`): the hot
 * water dissolves the rest.
 */
export const heatingSaturated = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [cup('b', 24, 34, 'potassium nitrate in water')],
  clips: {
    drop: { phases: [{ dur: 1, release: ['b'] }, { dur: 9 }] },
    heat: { phases: [{ dur: 3, heat: { b: HOT } }, { dur: 9 }] },
  },
  thermometers: true,
  speed: 4,
  height,
});

/** Sugar (the solute) dropped into water (the solvent) by the clip `drop`: it dissolves. */
export const sugarDissolving = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [sugarBox('s', 'sugar in water')],
  clips: { drop: { phases: [{ dur: 1, release: ['s'] }, { dur: 11 }] } },
  speed: 4,
  height,
});

/** A crystal of sodium chloride dropped into water by the clip `drop`: water pulls its ions apart. */
export const saltDissolving = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [saltBox('s', 'sodium chloride in water')],
  clips: { drop: { phases: [{ dur: 1, release: ['s'] }, { dur: 11 }] } },
  speed: 4,
  height,
});

/**
 * Salt and sugar dropped into water side by side (clip `drop`): the salt comes apart into charged
 * ions, which can carry a current; the sugar comes apart into whole molecules, which cannot.
 */
export const saltAndSugar = (id: string, height = 400): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [saltBox('a', 'salt: an electrolyte'), sugarBox('b', 'sugar: a non-electrolyte')],
  clips: { drop: { phases: [{ dur: 1, release: ['a', 'b'] }, { dur: 11 }] } },
  speed: 4,
  height,
});

/**
 * Hydrogen chloride molecules in water (clip `go`): when one meets a water molecule, its hydrogen
 * leaves the chlorine and joins the water as a hydronium ion, and the chlorine is set free as a
 * chloride ion. The kinds: 0 H in HCl, 1 Cl in HCl, 2 water, 3 the H on a hydronium ion, 4 the
 * water in it, 5 a chloride ion.
 */
export const acidIonising = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 'a',
      state: 'gas',
      width: 12,
      height: 9,
      temp: 0.5,
      waits: true,
      kinds: [
        { n: 0, bond: 0.15, heavy: 0, size: 0.7, tone: 'theta', name: 'hydrogen' },
        { n: 0, bond: 0.15, heavy: 0, size: 1.1, tone: 'good', name: 'chlorine' },
        { n: 22, bond: 0.15, heavy: 0, tone: 'adj', name: 'water' },
        { n: 0, bond: 0.15, heavy: 0, size: 0.7, tone: 'theta', name: 'hydrogen' },
        { n: 0, bond: 0.15, heavy: 0, tone: 'bad', name: 'hydronium ion' },
        { n: 0, bond: 0.15, heavy: 0, size: 1.1, tone: 'good', name: 'chloride ion' },
      ],
      molecules: [{ atoms: [0, 1], n: 7 }],
      reactions: [{ a: 0, b: 2, free: [5, null], to: [3, 4], join: true }],
      tally: { kinds: [5], label: 'chloride ions' },
      label: 'hydrogen chloride in water',
    },
  ],
  clips: { go: { phases: [{ dur: 1, release: ['a'] }, { dur: 11 }] } },
  seed: 2,
  height,
});

/** An ion or water molecule moving freely in a solution: held so loosely that it never clumps. */
const free = (n: number, tone: Tone, name: string, size = 1) => ({ n, bond: 0.05, heavy: 0, size, tone, name });
/** Silver chloride once it has formed: held very tightly, and heavy enough to sink. */
const SOLID_AG = { n: 0, bond: 3, heavy: 1.5, tone: 'theta', name: 'silver ion' } as const;
const SOLID_CL = { n: 0, bond: 3, heavy: 1.5, size: 1.1, tone: 'good', name: 'chloride ion' } as const;

/**
 * Silver nitrate and sodium chloride solutions just mixed (clip `mix`): wherever a silver ion meets
 * a chloride ion they lock together and sink as solid silver chloride, a precipitate, while the
 * sodium and nitrate ions keep moving freely in the water (spectator ions). The kinds: 0 silver,
 * 1 nitrate, 2 sodium, 3 chloride, 4 water, then 5 and 6 the silver and chloride in the solid.
 */
export const precipitating = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 'p',
      state: 'gas',
      width: 12,
      height: 9,
      temp: 0.5,
      waits: true,
      kinds: [
        free(6, 'theta', 'silver ion'),
        free(6, 'opp', 'nitrate ion', 1.1),
        free(6, 'brand', 'sodium ion'),
        free(6, 'good', 'chloride ion', 1.1),
        free(16, 'adj', 'water', 0.8),
        SOLID_AG,
        SOLID_CL,
      ],
      reactions: [{ a: 0, b: 3, to: [5, 6], join: true }],
      tally: { kinds: [5], label: 'units of silver chloride' },
      label: 'silver nitrate + sodium chloride',
    },
  ],
  clips: { mix: { phases: [{ dur: 1, release: ['p'] }, { dur: 12 }] } },
  seed: 1,
  speed: 2,
  key: true,
  height,
});

/**
 * Potassium nitrate and sodium chloride solutions mixed: every pair of ions that could form is
 * soluble, so nothing happens. The four kinds of ion just keep moving among the water molecules.
 */
export const noPrecipitate = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 'n',
      state: 'gas',
      width: 12,
      height: 9,
      temp: 0.5,
      kinds: [free(6, 'hyp', 'potassium ion'), free(6, 'opp', 'nitrate ion', 1.1), free(6, 'brand', 'sodium ion'), free(6, 'good', 'chloride ion', 1.1), free(16, 'adj', 'water', 0.8)],
      label: 'potassium nitrate + sodium chloride',
    },
  ],
  clips: {},
  seed: 1,
  key: true,
  height,
});

/**
 * A crystal of sodium chloride and one of silver chloride dropped into water side by side (clip
 * `drop`): water pulls the sodium chloride apart, but the ions of silver chloride hold on to one
 * another too tightly, so it stays a solid.
 */
export const solubleAndNot = (id: string, height = 400): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    saltBox('a', 'sodium chloride: high solubility'),
    { ...saltBox('b', 'silver chloride: low solubility'), kinds: [{ n: 16, ...NA, bond: 4, heavy: 1, tone: 'theta', name: 'silver ion' }, { n: 44, ...WATER }, { n: 0, ...CL, bond: 4, heavy: 1 }], cross: 1, pairs: [{ kinds: [0, 2], bond: 4 }] },
  ],
  clips: { drop: { phases: [{ dur: 1, release: ['a', 'b'] }, { dur: 11 }] } },
  speed: 4,
  key: true,
  height,
});

/**
 * An acid's molecules in water (clip `go`): a molecule that meets a water molecule gives it its
 * hydrogen, making a hydronium ion and the acid's anion. In a strong acid (`weak` null) every
 * molecule does so. In a weak one only `weak` of the molecules can ionise at all, and a hydronium
 * ion that meets an anion gives the hydrogen back, so at any moment at most a few are ionised (a
 * simulation that let every molecule try would, once one ionised, soon ionise far too many).
 * The kinds: 0 H in the acid, 1 the rest of the acid, 2 water, 3 the H on a hydronium ion, 4 the
 * water in it, 5 the anion, 6 the H of a weak acid's molecules that stay whole.
 */
const acidSolution = (id: string, label: string, anion: { name: string; tone: Tone; size?: number }, weak: number | null, n = 7): ParticleBox => ({
  id,
  state: 'gas',
  width: 10,
  height: 9,
  temp: 0.5,
  waits: true,
  kinds: [
    { n: 0, bond: 0.15, heavy: 0, size: 0.7, tone: 'theta', name: 'hydrogen' },
    { n: 0, bond: 0.15, heavy: 0, size: anion.size ?? 1.1, tone: anion.tone },
    { n: 20, bond: 0.15, heavy: 0, tone: 'adj', name: 'water' },
    { n: 0, bond: 0.15, heavy: 0, size: 0.7, tone: 'theta', name: 'hydrogen' },
    { n: 0, bond: 0.15, heavy: 0, tone: 'bad', name: 'hydronium ion' },
    { n: 0, bond: 0.15, heavy: 0, size: anion.size ?? 1.1, tone: anion.tone, name: anion.name },
    { n: 0, bond: 0.15, heavy: 0, size: 0.7, tone: 'theta', name: 'hydrogen' },
  ],
  molecules: weak === null ? [{ atoms: [0, 1], n }] : [{ atoms: [0, 1], n: weak }, { atoms: [6, 1], n: n - weak }],
  reactions:
    weak === null
      ? [{ a: 0, b: 2, free: [5, null], to: [3, 4], join: true }]
      : [
          { a: 0, b: 2, free: [5, null], to: [3, 4], join: true, energy: 0.3 },
          // The way back: an anion takes the hydrogen from a hydronium ion, hitting either part of it.
          { a: 3, b: 5, free: [2, null], to: [0, 1], join: true },
          { a: 4, b: 5, free: [0, null], carry: true, to: [2, 1] },
        ],
  // Ions of opposite charge attract, so a weak acid's ions soon meet again.
  ...(weak === null ? {} : { pairs: [{ kinds: [4, 5] as [number, number], bond: 0.6 }, { kinds: [3, 5] as [number, number], bond: 0.6 }] }),
  tally: { kinds: [4], label: 'hydronium ions' },
  label,
});

/**
 * Seven molecules each of hydrochloric acid and acetic acid in water (clip `go`): every hydrogen
 * chloride molecule ionises, but only about one acetic acid molecule is ionised at a time.
 */
export const strongAndWeak = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    acidSolution('s', 'hydrochloric acid: strong', { name: 'chloride ion', tone: 'good' }, null),
    acidSolution('w', 'acetic acid: weak', { name: 'acetate ion', tone: 'opp', size: 1.3 }, 1),
  ],
  clips: { go: { phases: [{ dur: 1, release: ['s', 'w'] }, { dur: 14 }] } },
  key: true,
  seed: 1,
  height,
});

/**
 * A solution diluted (clip `dilute`): water is added, so the lid rises from `from` of the box to the
 * top and the same solute particles spread through more volume, read under the box from `start`
 * (in `unit`). The water itself is not drawn.
 */
export const diluting = (id: string, v: { start: number; unit: string; from: number; n?: number }, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [{ id: 'd', state: 'gas', width: 10, height: 9, temp: 0.5, lid: v.from, kinds: [{ n: v.n ?? 8, bond: 0.05, heavy: 0, tone: 'theta', name: 'solute particle' }], label: `the same ${v.n ?? 8} solute particles` }],
  clips: { dilute: { phases: [{ dur: 4, lid: { d: 1 } }, { dur: 3 }] } },
  volume: { box: 'd', start: v.start, unit: v.unit, decimals: 1 },
  key: true,
  height,
});

/**
 * Strength is not concentration (clip `go`): a dilute strong acid, with few molecules that all
 * ionise, beside a concentrated weak acid, with many molecules of which only a few ionise.
 */
export const strengthAndConcentration = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    acidSolution('s', 'dilute, strong', { name: 'chloride ion', tone: 'good' }, null, 3),
    acidSolution('w', 'concentrated, weak', { name: 'acetate ion', tone: 'opp', size: 1.3 }, 2, 12),
  ],
  clips: { go: { phases: [{ dur: 1, release: ['s', 'w'] }, { dur: 14 }] } },
  key: true,
  seed: 1,
  height,
});

/**
 * Hydrogen and oxygen burned in sealed boxes side by side (clip `spark`), each with its own number
 * of hydrogen and oxygen molecules: two hydrogen molecules use up one oxygen molecule, so whichever
 * runs out first (the limiting reagent) stops the reaction, and the other is left over (in excess).
 * The tally counts the water molecules made.
 */
export const limitingBurn = (id: string, boxes: Array<{ id: string; h2: number; o2: number; label: string }>, seed = 2, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: boxes.map((b) =>
    hydrogenBurning(b.id, {
      width: boxes.length > 1 ? 11 : 14,
      molecules: [
        { atoms: [0, 0], n: b.h2 },
        { atoms: [1, 1], n: b.o2 },
      ],
      label: b.label,
    }),
  ),
  // It cools only part of the way, so the last loose atoms still find a partner quickly.
  clips: { spark: { phases: [{ dur: 1, heat: Object.fromEntries(boxes.map((b) => [b.id, 2])) }, { dur: 4 }, { dur: 2, heat: Object.fromEntries(boxes.map((b) => [b.id, 0.9])) }, { dur: 10 }] } },
  thermometers: true,
  seed,
  height,
});
