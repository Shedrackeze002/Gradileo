import type { MoleculesEl, ParticleBox, ParticlesEl, Tone } from '@/video/script.ts';

// Moving pictures for the WASSCE lessons of More Chemistry (units 13 to 19): simulated particles
// (src/video/particles.ts) for gases, liquids and solutions, and balls and sticks
// (src/video/molecules.ts) for bonds that break.

/** Gas particles that barely attract one another, with no weight to speak of. */
const GAS = { bond: 0.15, heavy: 0 } as const;

/**
 * Hydrogen and oxygen leaking out of the open tops of two containers at the same temperature (clip
 * `leak`): every kind has the same energy, so the hydrogen molecules (a sixteenth of the mass) move
 * four times as fast and escape sooner. The tally under each counts the molecules still inside.
 */
export const effusion = (id: string, height = 420): ParticlesEl => {
  const box = (bid: string, label: string, tone: Tone, size: number, mass: number): ParticleBox => ({
    id: bid,
    state: 'gas',
    width: 8,
    height: 9,
    temp: 1.4,
    escape: true,
    hold: [0],
    kinds: [{ n: 16, tone, size, mass, ...GAS }, { n: 0, tone, size, mass, ...GAS }],
    tally: { kinds: [0], label: 'molecules inside' },
    label,
  });
  return {
    kind: 'particles',
    id,
    boxes: [box('h', 'hydrogen, H₂ (Mr 2)', 'adj', 0.75, 1), box('o', 'oxygen, O₂ (Mr 32)', 'opp', 1.2, 16)],
    clips: { leak: { phases: [{ dur: 1, release: ['h', 'o'] }, { dur: 14 }] } },
    seed: 2,
    height,
  };
};

/**
 * A grain of pollen (big and slow) among water molecules too small to see: it is knocked about by
 * the molecules hitting it unevenly, a random zigzag that the part `trail` draws (Brownian motion).
 */
export const brownian = (id: string, height = 460): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 'b',
      state: 'gas',
      width: 12,
      height: 9,
      temp: 1.4,
      kinds: [
        { n: 1, tone: 'theta', size: 2.6, mass: 25, ...GAS, name: 'pollen grain' },
        { n: 46, tone: 'adj', size: 0.45, mass: 1, ...GAS, name: 'water molecule' },
      ],
      // The pollen grain's place among the particles once they are shuffled (seed 4).
      follow: 44,
      label: 'a pollen grain in water',
    },
  ],
  clips: {},
  key: true,
  seed: 4,
  height,
});

/**
 * A liquid in a closed flask (clip `warm`): at any temperature a few of its fastest molecules break
 * away from the surface into the space above as vapour, and some come back; warmed, many more are
 * in the vapour at any moment, so the vapour pressure is higher. The pressure gauge reads the hits
 * on the walls. Thermometer marks where this liquid would boil at room pressure.
 */
export const vapour = (id: string, height = 460): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [{ id: 'v', state: 'liquid', n: 40, width: 10, height: 11, temp: 0.45, heatColor: [0.3, 1.2], label: 'a liquid in a closed flask' }],
  clips: { warm: { phases: [{ dur: 7, heat: { v: 0.85 } }, { dur: 5 }] } },
  thermometers: { marks: [{ at: 0.9, label: 'boils' }] },
  seed: 3,
  height,
});

/**
 * Two kinds of bond fission (clips `homo`, then `hetero`). A chlorine molecule splits evenly, one
 * electron to each atom, into two chlorine radicals; a hydrogen bromide molecule splits unevenly,
 * both electrons going to bromine, into a hydrogen ion and a bromide ion.
 */
export const fission = (id: string, height = 380): MoleculesEl => ({
  kind: 'molecules',
  id,
  atoms: { Cl1: 'Cl', Cl2: 'Cl', H: 'H', Br: 'Br' },
  stages: {
    start: {
      at: { Cl1: [1.6, 2], Cl2: [3, 2], H: [6.8, 2], Br: [8.1, 2] },
      bonds: 'Cl1-Cl2 H-Br',
      names: [
        { text: 'Cl₂', at: [2.3, 3.4], tone: 'good' },
        { text: 'HBr', at: [7.45, 3.4], tone: 'opp' },
      ],
    },
    homo: {
      at: { Cl1: [0.9, 2], Cl2: [3.7, 2], H: [6.8, 2], Br: [8.1, 2] },
      bonds: 'H-Br',
      names: [
        { text: 'Cl•', at: [0.9, 1.1], tone: 'good' },
        { text: 'Cl•', at: [3.7, 1.1], tone: 'good' },
        { text: 'homolytic: two radicals', at: [2.3, 3.4], tone: 'good' },
        { text: 'HBr', at: [7.45, 3.4], tone: 'opp' },
      ],
    },
    hetero: {
      at: { Cl1: [0.9, 2], Cl2: [3.7, 2], H: [6.1, 2], Br: [8.8, 2] },
      bonds: '',
      charges: { H: 1, Br: -1 },
      names: [
        { text: 'Cl•', at: [0.9, 1.1], tone: 'good' },
        { text: 'Cl•', at: [3.7, 1.1], tone: 'good' },
        { text: 'homolytic: two radicals', at: [2.3, 3.4], tone: 'good' },
        { text: 'heterolytic: two ions', at: [7.45, 3.4], tone: 'opp' },
      ],
    },
  },
  start: 'start',
  clips: {
    homo: { phases: [{ dur: 0.6 }, { dur: 2.4, to: 'homo' }, { dur: 1 }] },
    hetero: { phases: [{ dur: 0.6 }, { dur: 2.4, to: 'hetero' }, { dur: 1 }] },
  },
  span: [9.8, 4.2],
  poster: 'homo',
  height,
});

/** An ion that is free to drift, with no weight to speak of. */
const ION = { n: 0, bond: 1, heavy: 0.2 } as const;

/**
 * Alumina dissolved in molten cryolite between two carbon electrodes (clip `run`): with the current
 * on, aluminium ions (3+) drift to the cathode and take electrons, becoming aluminium metal, and
 * oxide ions (2−) drift to the anode and give up electrons; the oxygen atoms pair up into oxygen
 * molecules that bubble away. Two aluminium ions to three oxide ions keep the melt neutral. The
 * kinds: 0 aluminium ion, 1 oxide ion, 2 aluminium metal, 3 oxygen atom, 4 oxygen in a molecule.
 */
export const aluminiumCell = (id: string, o: { seed?: number; height?: number } = {}): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 'm',
      state: 'liquid',
      width: 13,
      height: 9,
      temp: 0.5,
      escape: [4],
      open: true,
      kinds: [
        { ...ION, n: 10, size: 0.8, tone: 'hyp', name: 'aluminium ion, Al³⁺', charge: 3 },
        { ...ION, n: 15, size: 1.2, tone: 'bad', name: 'oxide ion, O²⁻', charge: -2 },
        { ...ION, size: 0.8, tone: 'adj', name: 'aluminium metal' },
        { n: 0, bond: 0.1, heavy: 0, size: 1.1, tone: 'opp', name: 'oxygen' },
        { n: 0, bond: 0.1, heavy: -0.4, size: 1.1, tone: 'opp', name: 'oxygen' },
      ],
      reactions: [{ a: 3, b: 3, to: [4, 4], join: true }],
      electrodes: {
        left: { rules: [{ kind: 0, to: 2 }] },
        right: { rules: [{ kind: 1, to: 3 }] },
      },
      tally: { kinds: [2], label: 'aluminium atoms made' },
      label: 'alumina in molten cryolite',
    },
  ],
  clips: { run: { phases: [{ dur: 2 }, { dur: 2, power: { m: 1 } }, { dur: 16 }] } },
  key: true,
  seed: o.seed ?? 1,
  height: o.height ?? 440,
});

/**
 * Yeast fermenting sugar in water, with no air (clip `ferment`): each sugar molecule that meets a
 * yeast cell is split, one half becoming ethanol, which stays dissolved, and the other carbon
 * dioxide, which bubbles out of the open top. The yeast is not used up. The tally counts the
 * ethanol made. The kinds: 0 sugar, 1 yeast, 2 ethanol, 3 carbon dioxide, 4 the other half of a
 * sugar molecule, 5 water.
 */
export const fermenting = (id: string, height = 440): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 'f',
      state: 'liquid',
      width: 11,
      height: 10,
      temp: 0.8,
      escape: [3],
      waits: true,
      kinds: [
        { n: 0, bond: 0.15, heavy: 0.3, tone: 'good', name: 'sugar' },
        { n: 5, bond: 0.15, heavy: 0, size: 1.9, mass: 3, tone: 'theta', name: 'yeast' },
        { n: 0, bond: 0.15, heavy: 0.3, tone: 'hyp', name: 'ethanol' },
        { n: 0, bond: 0.15, heavy: -1.5, size: 0.9, tone: 'opp', name: 'carbon dioxide' },
        { n: 0, bond: 0.15, heavy: 0.3, tone: 'good', name: 'sugar' },
        { n: 22, bond: 0.15, heavy: 0.3, size: 0.6, tone: 'adj', name: 'water' },
      ],
      molecules: [{ atoms: [0, 4], n: 10 }],
      reactions: [{ a: 0, b: 1, to: [2, 1], free: [3, null], chance: 0.0012 }],
      tally: { kinds: [2], label: 'ethanol made' },
      label: 'sugar solution + yeast, no air',
    },
  ],
  clips: { ferment: { phases: [{ dur: 1, release: ['f'] }, { dur: 16 }] } },
  key: true,
  seed: 3,
  height,
});

/**
 * Magnesium carbonate and barium carbonate heated side by side (clip `heat`). Each carbonate is a
 * metal oxide part bonded to a carbon dioxide part; when the bond snaps, the carbon dioxide escapes
 * from the open top and the oxide is left. The small Mg²⁺ ion polarises the carbonate ion and
 * weakens it, so its bond snaps at a lower temperature; the large Ba²⁺ ion barely does, so barium
 * carbonate hardly breaks up at the same heat. The tally counts the oxide made. The kinds: 0 the
 * oxide part, 1 the carbon dioxide part, 2 oxide left, 3 carbon dioxide gas.
 */
export const carbonatesHeated = (id: string, height = 430): ParticlesEl => {
  const box = (bid: string, metal: string, tone: Tone, energy: number): ParticleBox => ({
    id: bid,
    state: 'liquid',
    width: 8,
    height: 10,
    temp: 0.35,
    escape: [3],
    kinds: [
      { n: 0, bond: 0.4, heavy: 0.6, size: metal === 'Ba' ? 1.35 : 0.9, tone, name: `${metal}O part` },
      { n: 0, bond: 0.4, heavy: 0.6, tone: 'theta', name: 'CO₂ part' },
      { n: 0, bond: 0.4, heavy: 0.6, size: metal === 'Ba' ? 1.35 : 0.9, tone, name: `${metal}O` },
      { n: 0, bond: 0.1, heavy: -1.5, tone: 'theta', name: 'carbon dioxide' },
    ],
    molecules: [{ atoms: [0, 1], n: 12 }],
    breaks: [{ kinds: [0, 1], to: [2, 3], chance: 0.004, energy }],
    tally: { kinds: [2], label: `${metal}O formed` },
    label: metal === 'Ba' ? 'barium carbonate, BaCO₃' : 'magnesium carbonate, MgCO₃',
  });
  return {
    kind: 'particles',
    id,
    boxes: [box('mg', 'Mg', 'opp', 2.2), box('ba', 'Ba', 'hyp', 5)],
    clips: { heat: { phases: [{ dur: 1 }, { dur: 4, heat: { mg: 1.1, ba: 1.1 } }, { dur: 10 }] } },
    thermometers: true,
    seed: 2,
    height,
  };
};

/**
 * A blob of grease on the floor of two bowls of water, one with soap (clip `wash`, which stirs
 * both). Each soap particle has a water-loving ionic head and a grease-loving hydrocarbon tail: the
 * tails work in among the grease particles (loosening their hold on one another, as soap lowers the
 * tension between grease and water) while the heads stay in the water, so with stirring the grease
 * is pulled apart into small droplets wrapped in soap. In plain water the grease stays in one lump. The
 * kinds: 0 grease, 1 water, 2 soap head, 3 soap tail.
 */
export const soapCleaning = (id: string, height = 430): ParticlesEl => {
  const box = (bid: string, label: string, soap: boolean): ParticleBox => ({
    id: bid,
    state: 'liquid',
    width: 9,
    height: 10,
    temp: 0.6,
    lump: true,
    hold: true,
    cross: 0.4,
    kinds: [
      { n: 14, bond: soap ? 1.5 : 2.5, heavy: 0.4, size: 1.1, tone: 'theta', name: 'grease' },
      { n: soap ? 20 : 30, bond: 1, heavy: 0.3, size: 0.7, tone: 'adj', name: 'water' },
      { n: 0, bond: 0.6, heavy: 0.3, size: 0.8, tone: 'opp', name: 'soap head (loves water)' },
      { n: 0, bond: 0.6, heavy: 0.3, size: 0.7, tone: 'good', name: 'soap tail (loves grease)' },
    ],
    molecules: soap ? [{ atoms: [2, 3], n: 10 }] : [],
    pairs: [
      { kinds: [3, 0], bond: 3 },
      { kinds: [2, 1], bond: 1.4 },
    ],
    label,
  });
  return {
    kind: 'particles',
    id,
    boxes: [box('w', 'water only', false), box('s', 'water + soap', true)],
    clips: { wash: { phases: [{ dur: 1, release: ['w', 's'] }, { dur: 3, stir: { w: 1.4, s: 1.4 } }, { dur: 8 }, { dur: 3, stir: { w: 0, s: 0 } }] } },
    key: true,
    seed: 4,
    height,
  };
};

/**
 * Starch chains in dilute acid, heated (clip `boil`): a starch molecule is a long chain of glucose
 * units, and as the mixture is heated, water splits the links between them one by one (hydrolysis)
 * until the chains have broken into single glucose molecules. The kinds: 0 glucose unit, 1 water.
 */
export const starchHydrolysis = (id: string, height = 420): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [
    {
      id: 's',
      state: 'liquid',
      width: 12,
      height: 9,
      temp: 0.3,
      kinds: [
        { n: 0, bond: 0.15, heavy: 0.2, size: 1.1, tone: 'good', name: 'glucose unit' },
        { n: 16, bond: 0.15, heavy: 0.2, size: 0.6, tone: 'adj', name: 'water' },
      ],
      molecules: [{ atoms: [0, 0, 0, 0, 0, 0, 0, 0], n: 3, chain: true }],
      breaks: [{ kinds: [0, 0], to: [0, 0], chance: 0.006, energy: 2.5 }],
      label: 'starch in dilute acid',
    },
  ],
  clips: { boil: { phases: [{ dur: 1 }, { dur: 3, heat: { s: 1 } }, { dur: 12 }] } },
  key: true,
  thermometers: true,
  seed: 2,
  height,
});
