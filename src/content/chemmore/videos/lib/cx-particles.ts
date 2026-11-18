import type { ParticleBox, ParticlesEl, Tone } from '@/video/script.ts';
import { gases, pair } from '../../../chem10/videos/lib/c10-rates.ts';

// Particle boxes for the extra chemistry lessons (src/video/particles.ts).

const DISSOLVED = { n: 0, bond: 0.15, heavy: 0.3 } as const;

/**
 * A metal lump in dilute acid: an acid particle that hits the lump hard enough takes one of its
 * atoms into the solution as an ion and is set loose; two loose ones join as a hydrogen molecule
 * that rises. A lower `energy` reacts more often (a more reactive metal); without one, nothing
 * happens. The kinds: 0 metal, 1 acid, 2 metal ion, 3 set loose, 4 hydrogen gas.
 */
const acidBox = (id: string, metal: { name: string; tone: Tone }, energy?: number): ParticleBox => ({
  id,
  state: 'liquid',
  width: 8,
  height: 10,
  temp: 0.5,
  escape: [4],
  open: true,
  lump: true,
  hold: true,
  kinds: [
    { n: 12, bond: 3, heavy: 2, tone: metal.tone, name: metal.name },
    { ...DISSOLVED, n: 16, size: 0.8, tone: 'theta', name: 'acid (hydrogen ion)' },
    { ...DISSOLVED, tone: metal.tone, name: `${metal.name} ion` },
    { ...DISSOLVED, size: 0.8, tone: 'theta', name: 'hydrogen atom' },
    { ...DISSOLVED, size: 0.8, heavy: -1.5, tone: 'theta', name: 'hydrogen gas' },
  ],
  reactions: energy === undefined ? [] : [{ a: 1, b: 0, to: [3, 2], energy }, { a: 3, b: 3, to: [4, 4], join: true }],
  label: `${metal.name} in acid`,
});

/** Magnesium, zinc and copper in the same dilute acid (clip `fizz`): magnesium fizzes fast, zinc steadily, and copper not at all. */
export const metalsInAcid = (id: string, o: { seed?: number; height?: number } = {}): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [acidBox('mg', { name: 'magnesium', tone: 'opp' }, 0.5), acidBox('zn', { name: 'zinc', tone: 'adj' }, 1.6), acidBox('cu', { name: 'copper', tone: 'hyp' })],
  clips: { fizz: { phases: [{ dur: 1, release: ['mg', 'zn', 'cu'] }, { dur: 15 }] } },
  key: true,
  seed: o.seed ?? 1,
  height: o.height ?? 420,
});

/**
 * A metal lump in a solution of another metal's ions. In `displacing`, a copper(II) ion that hits
 * the iron takes its place: it becomes a copper atom that settles on and around the lump as a loose deposit, and the iron atom
 * goes into the solution as an iron(II) ion. The kinds: 0 the lump's metal, 1 the metal ion in
 * the solution, 2 sulfate ion, then (displacing only) 3 copper made, 4 iron(II) ion made.
 */
const METALS = {
  iron: { atom: 'iron atom', ion: 'iron(II) ion, Fe²⁺', salt: 'iron(II) sulfate' },
  zinc: { atom: 'zinc atom', ion: 'zinc ion, Zn²⁺', salt: 'zinc sulfate' },
};

const metalInSolution = (id: string, displacing: boolean, metal: keyof typeof METALS = 'iron'): ParticleBox => ({
  id,
  state: 'liquid',
  width: 10,
  height: 10,
  temp: 0.8,
  lump: true,
  hold: true,
  // The ions barely cling to the metal, and the copper made is a loose deposit that slips off it.
  cross: 0.2,
  kinds: displacing
    ? [
        { n: 14, bond: 3, heavy: 2, tone: 'brand', name: METALS[metal].atom },
        { ...DISSOLVED, n: 12, tone: 'adj', name: 'copper(II) ion, Cu²⁺' },
        { ...DISSOLVED, n: 12, size: 1.2, tone: 'hyp', name: 'sulfate ion' },
        { n: 0, bond: 1.2, heavy: 3, tone: 'opp', name: 'copper atom' },
        { ...DISSOLVED, tone: 'good', name: METALS[metal].ion },
      ]
    : [
        { n: 14, bond: 3, heavy: 2, tone: 'opp', name: 'copper atom' },
        { ...DISSOLVED, n: 12, tone: 'good', name: METALS[metal].ion },
        { ...DISSOLVED, n: 12, size: 1.2, tone: 'hyp', name: 'sulfate ion' },
      ],
  reactions: displacing ? [{ a: 1, b: 0, to: [3, 4], energy: 0, chance: 0.03 }] : [],
  ...(displacing ? { tally: { kinds: [3], label: 'copper atoms made' } } : {}),
  label: displacing ? `${metal} in copper(II) sulfate` : `copper in ${METALS[metal].salt}`,
});

/**
 * An iron nail in copper(II) sulfate solution beside copper in iron(II) sulfate solution (clip
 * `go`): only the first reacts. `metal: 'zinc'` uses zinc and zinc sulfate instead of iron.
 */
export const displacement = (id: string, o: { seed?: number; height?: number; metal?: keyof typeof METALS } = {}): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [metalInSolution('fe', true, o.metal), metalInSolution('cu', false, o.metal)],
  clips: { go: { phases: [{ dur: 1, release: ['fe', 'cu'] }, { dur: 16 }] } },
  key: true,
  seed: o.seed ?? 1,
  height: o.height ?? 440,
});

/**
 * The same one-step reaction, A + B, with the concentration of A doubled in the second box and B
 * kept the same (clip `go`): A and B meet about twice as often, so in the same time about twice as
 * many new molecules form, which is first order with respect to A.
 */
export const doubleA = (id: string, o: { seed?: number; height?: number; chance?: number; nA?: number; nB?: number } = {}): ParticlesEl => {
  // Plenty of B, and only a small share of meetings react (`chance`), so the rate follows how often
  // A and B meet and neither box runs short during the clip.
  const box = (bid: string, nA: number, label: string): ParticleBox => {
    const g = gases(bid, label, { n: o.nB ?? 20 });
    const [a, ...rest] = g.kinds ?? [];
    return { ...g, kinds: [{ ...a, n: nA }, ...rest], reactions: [{ a: 0, b: 1, to: [2, 3], join: true, chance: o.chance ?? 0.00015 }] };
  };
  const nA = o.nA ?? 10;
  return pair(id, box('a', nA, 'A and B'), box('b', 2 * nA, 'twice as much A, same B'), { seed: o.seed ?? 5, height: o.height ?? 400 });
};

/**
 * The same reaction in a cold box and a hot one, with a higher activation energy than Chemistry
 * 10's comparison (clip `go`): in the cold box almost no collision is hard enough, while in the
 * hot box many are, so the gap shows how steeply the rate constant rises with temperature.
 */
export const hotAndCold = (id: string, o: { seed?: number; height?: number } = {}): ParticlesEl =>
  pair(id, gases('a', 'cold', { temp: 0.4, energy: 3, n: 12 }), gases('b', 'hot', { temp: 1.2, energy: 3, n: 12 }), { thermometers: true, seed: o.seed ?? 1, height: o.height ?? 400 });

/**
 * The same gas at a cooler and a hotter temperature, each with the spread of its molecules' speeds
 * drawn under it (part `spread`) and a line at the speed a collision needs for the activation
 * energy: the hotter gas's peak moves right and flattens, and many more molecules pass the line.
 */
export const speedSpread = (id: string, o: { seed?: number; height?: number } = {}): ParticlesEl => {
  const box = (bid: string, label: string, temp: number): ParticleBox => ({
    id: bid,
    state: 'gas',
    width: 10,
    height: 8,
    temp,
    kinds: [{ n: 60, bond: 0.15, heavy: 0, size: 0.65, tone: 'adj', name: 'molecule' }],
    spread: { at: 2, max: 3.5, bins: 14 },
    label,
  });
  return { kind: 'particles', id, boxes: [box('a', 'cooler', 0.5), box('b', 'hotter', 1.2)], clips: {}, thermometers: true, seed: o.seed ?? 1, height: o.height ?? 620 };
};
