import type { HalflifeEl, MoleculesEl, MolAtom, MolPhase, MolStage } from '@/video/script.ts';

// Moving pictures for the AP Chemistry lessons of the extra chemistry course (units 20 to 24):
// ozone's resonance structures, a two-step mechanism as balls and sticks, and a first-order
// reaction that loses half of what is left in each half-life.

const el = (id: string, atoms: Record<string, MolAtom>, stages: Record<string, MolStage>, start: string, clips: Record<string, { phases: MolPhase[] }>, span: [number, number] = [11, 5.8], height = 400): MoleculesEl => ({
  kind: 'molecules',
  id,
  atoms,
  stages,
  start,
  clips,
  span,
  height,
  poster: Object.keys(clips)[0],
});

/** A move to a stage that takes `dur` seconds, then a pause. */
const go = (to: string, dur = 2.6, pause = 0.6): MolPhase[] => [{ dur, to }, { dur: pause }];

/**
 * Ozone's two resonance structures: curly arrows move a lone pair into a new double bond on one
 * side while the old double bond becomes a lone pair on the other, so the double bond swaps sides
 * and the charges swap with it (clips `flip`, then `back`).
 */
export const ozoneResonance = (id: string): MoleculesEl => {
  const at = { O1: [1.65, 1.85], O2: [2.6, 1.05], O3: [3.55, 1.85] } as Record<string, [number, number]>;
  const one: MolStage = { at, bonds: 'O1=O2 O2-O3', charges: { O2: 1, O3: -1 }, names: [{ text: 'resonance structure 1', at: [2.6, 2.75] }] };
  const two: MolStage = { at, bonds: 'O1-O2 O2=O3', charges: { O2: 1, O1: -1 }, names: [{ text: 'resonance structure 2', at: [2.6, 2.75] }] };
  return el(
    id,
    { O1: 'O', O2: 'O', O3: 'O' },
    {
      one,
      oneArrows: { ...one, arrows: [{ from: 'O3', to: 'O2-O3', bend: 1.1 }, { from: 'O1=O2', to: 'O1', bend: 1.1 }] },
      two,
      twoArrows: { ...two, arrows: [{ from: 'O1', to: 'O1-O2', bend: -1.1 }, { from: 'O2=O3', to: 'O3', bend: -1.1 }] },
    },
    'one',
    {
      flip: { phases: [{ dur: 1.2 }, ...go('oneArrows', 1.2, 2.2), ...go('two', 2.4, 1.6)] },
      back: { phases: [{ dur: 0.8 }, ...go('twoArrows', 1.2, 2.2), ...go('one', 2.4, 1.6)] },
    },
    [5.2, 3.0],
    400,
  );
};

/**
 * The two-step mechanism of NO₂ + CO → NO + CO₂. In the slow first step two NO₂ molecules
 * collide and one takes an oxygen atom from the other, making NO and the intermediate NO₃; in the
 * fast second step NO₃ hands that oxygen atom to CO (clips `one`, then `two`).
 */
export const no2Mechanism = (id: string): MoleculesEl => {
  const co = { C: [8.6, 4.3], Oc: [9.7, 4.3] } as Record<string, [number, number]>;
  const b = { N2: [5.6, 2.0], O2a: [6.3, 1.3], O2b: [6.3, 2.7] } as Record<string, [number, number]>;
  const no3 = { ...b, O1b: [4.6, 2.0] } as Record<string, [number, number]>;
  const no = { N1: [2.4, 1.7], O1a: [1.35, 1.7] } as Record<string, [number, number]>;
  return el(
    id,
    { N1: 'N', O1a: 'O', O1b: 'O', N2: 'N', O2a: 'O', O2b: 'O', C: 'C', Oc: 'O' },
    {
      start: {
        at: { N1: [2.0, 1.8], O1a: [1.3, 2.5], O1b: [2.7, 2.5], ...b, ...co },
        bonds: 'N1=O1a N1-O1b N2=O2a N2-O2b C#Oc',
        names: [{ text: 'NO₂', at: [2.0, 3.4] }, { text: 'NO₂', at: [6.0, 3.6] }, { text: 'CO', at: [9.15, 5.1] }],
      },
      collide: {
        at: { N1: [3.8, 1.8], O1a: [3.1, 2.5], O1b: [4.5, 2.5], ...b, ...co },
        bonds: 'N1=O1a N1-O1b N2=O2a N2-O2b C#Oc',
        names: [{ text: 'Step 1: slow', at: [5.5, 0.45], tone: 'bad' }],
      },
      step1: {
        at: { ...no, ...no3, ...co },
        bonds: 'N1=O1a N2=O2a N2-O2b N2-O1b C#Oc',
        names: [{ text: 'NO', at: [1.9, 2.6] }, { text: 'NO₃ (intermediate)', at: [5.4, 3.6], tone: 'good' }, { text: 'CO', at: [9.15, 5.1] }],
      },
      collide2: {
        at: { ...no, ...no3, C: [7.05, 3.4], Oc: [8.15, 3.4] },
        bonds: 'N1=O1a N2=O2a N2-O2b N2-O1b C#Oc',
        names: [{ text: 'NO', at: [1.9, 2.6] }, { text: 'Step 2: fast', at: [5.5, 0.45], tone: 'good' }],
      },
      step2: {
        at: { ...no, N2: [5.6, 2.0], O2a: [6.3, 1.3], O1b: [4.9, 2.7], O2b: [7.0, 4.0], C: [8.05, 4.0], Oc: [9.1, 4.0] },
        bonds: 'N1=O1a N2=O2a N2-O1b O2b=C C=Oc',
        names: [{ text: 'NO', at: [1.9, 2.6] }, { text: 'NO₂', at: [5.0, 3.6] }, { text: 'CO₂', at: [8.05, 4.9] }],
      },
    },
    'start',
    {
      one: { phases: [{ dur: 1 }, ...go('collide', 2.4, 0.8), ...go('step1', 2.8, 1.6)] },
      two: { phases: [{ dur: 0.8 }, ...go('collide2', 2.4, 0.8), ...go('step2', 2.8, 1.6)] },
    },
    [11, 5.8],
    420,
  );
};

/** 400 molecules of dinitrogen pentoxide breaking down in a first-order reaction with a half-life of 20 minutes, beside the graph of the share left. */
export const firstOrder = (id: string, clips: HalflifeEl['clips'], height = 430): HalflifeEl => ({
  kind: 'halflife',
  id,
  height,
  clips,
  halfLife: 20,
  unit: 'minutes',
  name: 'N₂O₅',
  noun: 'molecules',
  gone: 'reacted',
  amountName: 'Share of N₂O₅ left',
  poster: Object.keys(clips)[Object.keys(clips).length - 1],
  posterAt: 0.6,
  thumb: ['names', 'graph', 'halves'],
});
