import type { ParticleBox, ParticlesEl, Tone } from '@/video/script.ts';

// Electrochemical cells as particle boxes (src/video/particles.ts): ions drift to the electrodes
// while a clip turns the current on (`power`), metal ions plate out on the cathode, and an anode
// can dissolve. Positive ions always drift to the left electrode, negative ones to the right.

const ION = { n: 0, bond: 1, heavy: 0.2 } as const;

/**
 * Molten sodium chloride between two electrodes (clip `run`): with the current on, sodium ions
 * drift to the cathode and take electrons, becoming sodium metal (molten too, so it flows away
 * from the electrode rather than coating it); chloride ions drift to
 * the anode and give up electrons, and the chlorine atoms pair up into chlorine molecules that
 * bubble away through the open top. The kinds: 0 sodium ion, 1 chloride ion, 2 sodium metal,
 * 3 chlorine atom, 4 chlorine in a molecule.
 */
export const moltenSalt = (id: string, o: { seed?: number; height?: number; ions?: number } = {}): ParticlesEl => {
  const n = o.ions ?? 14;
  return {
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
          { ...ION, n, tone: 'brand', name: 'sodium ion, Na⁺', charge: 1 },
          { ...ION, n, size: 1.25, tone: 'good', name: 'chloride ion, Cl⁻', charge: -1 },
          { ...ION, tone: 'adj', name: 'sodium metal' },
          { n: 0, bond: 0.1, heavy: 0, size: 1.1, tone: 'theta', name: 'chlorine' },
          { n: 0, bond: 0.1, heavy: -0.4, size: 1.1, tone: 'theta', name: 'chlorine' },
        ],
        reactions: [{ a: 3, b: 3, to: [4, 4], join: true }],
        electrodes: {
          left: { rules: [{ kind: 0, to: 2 }] },
          right: { rules: [{ kind: 1, to: 3 }] },
        },
        tally: { kinds: [2], label: 'sodium atoms made' },
        label: 'molten sodium chloride',
      },
    ],
    clips: { run: { phases: [{ dur: 2 }, { dur: 2, power: { m: 1 } }, { dur: 16 }] } },
    key: true,
    seed: o.seed ?? 1,
    height: o.height ?? 440,
  };
};

const WATER = { n: 30, bond: 1, heavy: 0.2, size: 0.85, tone: 'brand' as Tone, name: 'water molecule' };
const GAS_UP = { n: 0, bond: 0.1, heavy: -0.4, size: 1.05 } as const;

/**
 * An aqueous solution between two electrodes (clip `run`), where water competes with the ions.
 * In copper(II) sulfate, copper ions plate the cathode, and at the anode water gives oxygen, which
 * bubbles away. In potassium iodide, water gives hydrogen at the cathode (the potassium ions only
 * gather there), and at the anode iodide ions give iodine, which stays in the solution. The kinds:
 * 0 the metal ion, 1 the negative ion, 2 water, 3 what forms at the cathode (copper, or hydrogen
 * atoms), 4 hydrogen in a molecule, 5 what forms at the anode (oxygen or iodine atoms), 6 the same
 * in a molecule.
 */
export const aqueous = (id: string, salt: 'copper sulfate' | 'potassium iodide', o: { seed?: number; height?: number } = {}): ParticlesEl => {
  const cu = salt === 'copper sulfate';
  return {
    kind: 'particles',
    id,
    boxes: [
      {
        id: 'a',
        state: 'liquid',
        width: 13,
        height: 9,
        temp: 0.45,
        escape: cu ? [6] : [4],
        open: true,
        kinds: [
          cu ? { ...ION, n: 10, tone: 'adj', name: 'copper(II) ion, Cu²⁺', charge: 2 } : { ...ION, n: 10, tone: 'good', name: 'potassium ion, K⁺', charge: 1 },
          cu ? { ...ION, n: 10, size: 1.3, tone: 'hyp', name: 'sulfate ion, SO₄²⁻', charge: -2 } : { ...ION, n: 10, size: 1.3, tone: 'hyp', name: 'iodide ion, I⁻', charge: -1 },
          WATER,
          cu ? { ...ION, tone: 'opp', name: 'copper metal' } : { ...GAS_UP, heavy: 0, size: 0.8, tone: 'theta', name: 'hydrogen' },
          { ...GAS_UP, size: 0.8, tone: 'theta', name: 'hydrogen' },
          cu ? { ...GAS_UP, heavy: 0, tone: 'bad', name: 'oxygen' } : { ...ION, size: 1.3, tone: 'opp', name: 'iodine' },
          cu ? { ...GAS_UP, tone: 'bad', name: 'oxygen' } : { ...ION, size: 1.3, tone: 'opp', name: 'iodine' },
        ],
        reactions: cu ? [{ a: 5, b: 5, to: [6, 6], join: true }] : [{ a: 3, b: 3, to: [4, 4], join: true }, { a: 5, b: 5, to: [6, 6], join: true }],
        electrodes: cu
          ? { left: { rules: [{ kind: 0, to: 3, stick: true }] }, right: { rules: [{ kind: 2, to: 5, chance: 0.05 }] } }
          : { left: { rules: [{ kind: 2, to: 3, chance: 0.05 }] }, right: { rules: [{ kind: 1, to: 5 }] } },
        label: cu ? 'copper(II) sulfate solution' : 'potassium iodide solution',
      },
    ],
    clips: { run: { phases: [{ dur: 2 }, { dur: 2, power: { a: 1 } }, { dur: 16 }] } },
    key: true,
    seed: o.seed ?? 1,
    height: o.height ?? 440,
  };
};

/**
 * Electroplating (clip `run`): a metal anode dissolves into metal ions, and metal ions plate the
 * object at the cathode, so the metal moves from one electrode to the other. Copper(II) ions come
 * with sulfate ions, silver ions with nitrate ions. The kinds: 0 metal ion, 1 negative ion, 2 metal
 * of the anode, 3 metal plated on the object, 4 water.
 */
export const plating = (id: string, o: { seed?: number; height?: number; dur?: number; metal?: 'copper' | 'silver'; object?: string } = {}): ParticlesEl => {
  const ag = o.metal === 'silver';
  const ion: Tone = ag ? 'good' : 'adj';
  const metal: Tone = ag ? 'adj' : 'opp';
  return {
    kind: 'particles',
    id,
    boxes: [
      {
        id: 'p',
        state: 'liquid',
        width: 13,
        height: 9,
        temp: 0.45,
        kinds: [
          ag ? { ...ION, n: 8, tone: ion, name: 'silver ion, Ag⁺', charge: 1 } : { ...ION, n: 8, tone: ion, name: 'copper(II) ion, Cu²⁺', charge: 2 },
          ag ? { ...ION, n: 8, size: 1.2, tone: 'hyp', name: 'nitrate ion, NO₃⁻', charge: -1 } : { ...ION, n: 8, size: 1.3, tone: 'hyp', name: 'sulfate ion, SO₄²⁻', charge: -2 },
          { ...ION, n: 16, tone: metal, name: ag ? 'silver metal' : 'copper metal' },
          { ...ION, tone: metal, name: ag ? 'silver metal' : 'copper metal' },
          WATER,
        ],
        electrodes: {
          left: { label: `${o.object ?? 'object'} (cathode −)`, rules: [{ kind: 0, to: 3, stick: true }] },
          right: { label: `${ag ? 'silver' : 'copper'} (anode +)`, plate: { kind: 2, n: 16 }, dissolve: { kind: 2, to: 0 } },
        },
        tally: { kinds: [3], label: ag ? 'silver atoms plated' : 'copper atoms plated' },
        label: ag ? 'silver nitrate solution' : 'copper(II) sulfate solution',
      },
    ],
    clips: { run: { phases: [{ dur: 2 }, { dur: 2, power: { p: 1 } }, { dur: o.dur ?? 16 }] } },
    key: true,
    seed: o.seed ?? 1,
    height: o.height ?? 440,
  };
};

/**
 * A zinc–copper voltaic cell as two half-cells side by side (clip `run`): the zinc anode dissolves
 * into zinc ions, and copper(II) ions plate out on the copper cathode. Nitrate ions drift towards
 * the anode, as they do through a salt bridge. In each box: 0 the metal ion, 1 nitrate ion, 2 the
 * metal of the electrode, 3 water.
 */
export const voltaic = (id: string, o: { seed?: number; height?: number; dur?: number } = {}): ParticlesEl => {
  const half = (bid: string, zinc: boolean): ParticleBox => ({
    id: bid,
    state: 'liquid',
    width: 9,
    height: 9,
    temp: 0.45,
    kinds: [
      zinc ? { ...ION, n: 3, tone: 'good', name: 'zinc ion, Zn²⁺', charge: 2 } : { ...ION, n: 7, tone: 'theta', name: 'copper(II) ion, Cu²⁺', charge: 2 },
      { ...ION, n: zinc ? 6 : 14, size: 1.2, tone: 'hyp', name: 'nitrate ion, NO₃⁻', charge: -1 },
      zinc ? { ...ION, n: 16, tone: 'adj', name: 'zinc metal' } : { ...ION, n: 7, tone: 'opp', name: 'copper metal' },
      { ...WATER, n: zinc ? 16 : 12 },
    ],
    electrodes: zinc
      ? { right: { label: 'zinc anode −', plate: { kind: 2, n: 16 }, dissolve: { kind: 2, to: 0, chance: 0.0012 } } }
      : { left: { label: 'copper cathode +', plate: { kind: 2, n: 7 }, rules: [{ kind: 0, to: 2, stick: true }] } },
    tally: { kinds: [2], label: zinc ? 'zinc atoms left' : 'copper atoms' },
    label: zinc ? 'zinc in zinc nitrate' : 'copper in copper(II) nitrate',
  });
  return {
    kind: 'particles',
    id,
    boxes: [half('z', true), half('c', false)],
    clips: { run: { phases: [{ dur: 2 }, { dur: 2, power: { z: 0.4, c: 0.4 } }, { dur: o.dur ?? 16 }] } },
    key: true,
    seed: o.seed ?? 1,
    height: o.height ?? 400,
  };
};
