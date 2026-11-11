/**
 * More Chemistry Topics, Unit 2: chemical analysis. Pure substances, mixtures and formulations
 * with melting-point data, the tests for hydrogen, oxygen, carbon dioxide and chlorine, flame
 * tests and hydroxide precipitates for metal ions, and the tests for carbonate, halide and
 * sulfate ions. The tests are described in words; no question asks a student to carry one out.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef, TableFigure } from '../../../types.ts';
import { $, cap, degC, eq, letters } from './common.ts';

const L = (n: number) => `cx-2-${n}`;

// ---------------------------------------------------------------------------- lesson 2.1: purity and formulations

/** Pure substances with the temperature at which each melts, in °C. */
const MELTING: Array<{ name: string; mp: number }> = [
  { name: 'aspirin', mp: 136 },
  { name: 'benzoic acid', mp: 122 },
  { name: 'stearic acid', mp: 69 },
  { name: 'salol', mp: 42 },
  { name: 'naphthalene', mp: 80 },
  { name: 'paracetamol', mp: 169 },
  { name: 'caffeine', mp: 235 },
  { name: 'menthol', mp: 43 },
];

const FORMULATIONS = ['a paint', 'a medicine tablet', 'a fertiliser for tomato plants', 'a washing-up liquid', 'a sun cream', 'a petrol blend', 'an alloy for coins', 'a toothpaste'];
const PURE_THINGS = ['distilled water', 'oxygen gas from a cylinder', 'a 24-carat gold bar', 'a crystal of sodium chloride', 'a diamond', 'copper wire of 100% copper'];
const EVERYDAY_PURE = [
  { thing: 'A carton labelled “pure orange juice”', parts: 'water, sugars, citric acid and many other substances' },
  { thing: 'A bottle labelled “pure mineral water”', parts: 'water with dissolved salts of calcium, magnesium and sodium' },
  { thing: 'A jar labelled “pure honey”', parts: 'several sugars, water and small amounts of other substances' },
  { thing: 'A carton labelled “pure milk”', parts: 'water, fats, proteins, lactose and minerals' },
];

function purity(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const kind = rng.pick(['melting', 'melting', 'everyday', 'formulation'] as const);
    if (kind === 'melting') {
      const s = rng.pick(MELTING);
      const pure = rng.chance(0.5);
      const low = s.mp - rng.int(4, 9);
      const told = pure ? `melts sharply at ${degC(s.mp)}` : `starts to melt at ${degC(low)} and has not finished melting until ${degC(low + rng.int(3, 6))}`;
      const right = pure ? 'It is pure, because it melts at one fixed temperature' : 'It is a mixture, because it melts over a range of temperatures';
      const wrong = pure
        ? ['It is a mixture, because it melts at one fixed temperature', 'It is a mixture, because it melts over a range of temperatures', 'It is pure, because every solid melts when it is heated']
        : ['It is pure, because it melts over a range of temperatures', 'It is pure, because it melts at one fixed temperature', 'It is a mixture, because every mixture melts below room temperature'];
      return {
        prompt: `A sample of a white solid ${told}. What does this show about the sample?`,
        parts: [part(mc(rng, right, wrong))],
        hints: ['A pure substance melts at one fixed temperature, its melting point.', 'A mixture melts gradually, over a range of temperatures.'],
        solution: [pure ? 'The sample melts sharply at a single temperature, as a pure substance does.' : 'The sample melts gradually over several degrees. Only a mixture does that, so the sample is impure.'],
      };
    }
    if (kind === 'everyday') {
      const e = rng.pick(EVERYDAY_PURE);
      return {
        prompt: `${e.thing} contains ${e.parts}. Is it pure, as a chemist uses the word?`,
        parts: [part(mc(rng, 'No: it is a mixture of several substances', ['Yes: nothing has been added to it', 'Yes: it is safe to eat or drink', 'No: it contains atoms of more than one element']))],
        hints: ['In everyday life, “pure” means natural, with nothing added.', 'In chemistry, a pure substance is a single element or a single compound, not mixed with anything else.'],
        solution: ['To a chemist, a pure substance contains only one element or one compound. This contains several substances, so it is a mixture, even though nothing was added to it.'],
      };
    }
    const f = rng.pick(FORMULATIONS);
    const pureOnes = rng.sample(PURE_THINGS, 3);
    return {
      prompt: 'Which of these is a **formulation**?',
      parts: [part(mc(rng, cap(f), pureOnes.map(cap)))],
      hints: ['A formulation is a mixture designed as a useful product.', 'Each part of a formulation is added in a measured amount, for a purpose.'],
      solution: [`${cap(f)} is a mixture in which each ingredient is measured out to give the product the properties it needs, so it is a formulation. The others are single substances.`],
    };
  }
  if (d === 2) {
    // A sample compared with the data-book melting point.
    const s = rng.pick(MELTING);
    const drop = rng.int(3, 8);
    const state = rng.pick(['pure', 'impure', 'impure', 'other'] as const);
    const other = rng.pick(MELTING.filter((m) => Math.abs(m.mp - s.mp) > 15));
    const told =
      state === 'pure' ? `melts sharply at ${degC(s.mp)}` : state === 'impure' ? `melts between ${degC(s.mp - drop - rng.int(3, 5))} and ${degC(s.mp - drop)}` : `melts sharply at ${degC(other.mp)}`;
    const right = state === 'pure' ? `It is pure ${s.name}` : state === 'impure' ? `It is ${s.name} with an impurity mixed in` : `It is a pure substance, but not ${s.name}`;
    const all = [`It is pure ${s.name}`, `It is ${s.name} with an impurity mixed in`, `It is a pure substance, but not ${s.name}`, `It is ${s.name} that has been heated too quickly to tell`];
    return {
      prompt: `Pure ${s.name} melts at ${degC(s.mp)}. A sample thought to be ${s.name} ${told}. What is the best conclusion?`,
      parts: [part(mc(rng, right, all.filter((x) => x !== right)))],
      hints: ['An impurity lowers the melting point and makes the solid melt over a range.', 'A sharp melting point shows one pure substance. Compare it with the value for the pure substance.'],
      solution: [
        state === 'pure'
          ? `The sample melts sharply at exactly the melting point of pure ${s.name}, so it is pure ${s.name}.`
          : state === 'impure'
            ? `The sample melts below ${degC(s.mp)} and over a range of temperatures. An impurity does both, so this is impure ${s.name}.`
            : `The sample melts sharply, so it is pure, but ${degC(other.mp)} is not the melting point of ${s.name}. It is a different substance.`,
      ],
    };
  }
  if (rng.chance(0.4)) {
    const item = rng.pick([
      {
        ask: 'A medicine tablet contains 500 mg of the active drug, with a binder to hold the tablet together, a coating to make it easy to swallow, and a colouring. Why is the tablet called a formulation?',
        right: 'It is a mixture in which each ingredient is added in a measured amount for a purpose',
        wrong: ['It is a single compound made by a chemical reaction', 'It is a pure substance that melts at one fixed temperature', 'It is a mixture whose ingredients vary from tablet to tablet'],
      },
      {
        ask: 'Salt is spread on icy roads. Why does the ice melt, even though the temperature stays below 0 °C?',
        right: 'The salt is an impurity, and an impurity lowers the melting point of the ice',
        wrong: ['The salt reacts with the ice and gives out heat', 'The salt is an impurity, and an impurity raises the melting point of the ice', 'The salt makes the ice a pure substance'],
      },
      {
        ask: 'Water with salt dissolved in it is heated. How does its boiling compare with that of pure water at the same pressure?',
        right: 'It boils above 100 °C, and its temperature rises as it boils',
        wrong: ['It boils at exactly 100 °C, and its temperature stays steady', 'It boils below 100 °C, and its temperature stays steady', 'It cannot boil until all the salt is removed'],
      },
    ]);
    return {
      prompt: item.ask,
      parts: [part(mc(rng, item.right, item.wrong))],
      hints: ['A pure substance has fixed melting and boiling points. A mixture does not.', 'An impurity lowers a melting point and raises a boiling point.'],
      solution: [`${item.right}.`],
    };
  }
  // Three samples sold as the same substance: which is pure?
  const s = rng.pick(MELTING);
  const names = letters(rng, 3);
  const pureAt = rng.int(0, 2);
  const rows = names.map((n, i) => {
    if (i === pureAt) return [n, `${s.mp}`, `${s.mp}`];
    const end = s.mp - rng.int(1, 6);
    return [n, `${end - rng.int(2, 6)}`, `${end}`];
  });
  const figure: TableFigure = { type: 'table', headers: ['Sample', 'Starts to melt (°C)', 'Finishes melting (°C)'], rows };
  // The least pure sample starts to melt at the lowest temperature.
  const starts = rows.map((r) => Number(r[1]));
  const ask = rng.chance(0.6) || new Set(starts).size < 3 ? 'pure' : 'least';
  const target = ask === 'pure' ? pureAt : starts.indexOf(Math.min(...starts));
  return {
    prompt: `Pure ${s.name} melts at ${degC(s.mp)}. Three samples sold as ${s.name} are heated slowly, and the table shows when each starts and finishes melting. Which sample is ${ask === 'pure' ? '**pure**' : 'the **least pure**'}?`,
    figure,
    parts: [part(fixedChoice(names.map((n) => `Sample ${n}`), target))],
    hints: ['A pure substance melts sharply, at its own melting point.', 'The more impurity a sample contains, the lower the temperature at which it starts to melt.'],
    solution: [
      ask === 'pure'
        ? `Sample ${names[pureAt]} starts and finishes melting at ${degC(s.mp)}, the melting point of pure ${s.name}, so it is pure. The others melt lower and over a range, so they are impure.`
        : `Sample ${names[target]} starts to melt at the lowest temperature, ${degC(starts[target])}, so it contains the most impurity.`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 2.1: tests for gases

interface GasTest {
  gas: string;
  f: string;
  test: string;
  result: string;
  /** What the same test shows with a different gas. */
  negative: string;
}
const GASES: GasTest[] = [
  { gas: 'hydrogen', f: 'H2', test: 'A burning splint is held at the mouth of the tube', result: 'the gas burns with a squeaky pop', negative: 'no pop is heard' },
  { gas: 'oxygen', f: 'O2', test: 'A glowing splint is put into the tube', result: 'the splint relights', negative: 'the splint does not relight' },
  { gas: 'carbon dioxide', f: 'CO2', test: 'The gas is bubbled through limewater', result: 'the limewater turns milky', negative: 'the limewater stays clear' },
  { gas: 'chlorine', f: 'Cl2', test: 'Damp litmus paper is held in the gas', result: 'the paper is bleached white', negative: 'the paper is not bleached' },
];
const gasNames = GASES.map((g) => cap(g.gas));

/** Reactions that give off one of the four gases. */
const GAS_SOURCES: Array<{ told: string; gas: string }> = [
  { told: 'Magnesium ribbon is added to dilute hydrochloric acid, and a gas bubbles off.', gas: 'hydrogen' },
  { told: 'Zinc granules are added to dilute sulfuric acid, and a gas bubbles off.', gas: 'hydrogen' },
  { told: 'Marble chips (calcium carbonate) are added to dilute hydrochloric acid, and a gas bubbles off.', gas: 'carbon dioxide' },
  { told: 'Green copper(II) carbonate is heated and turns black, giving off a gas.', gas: 'carbon dioxide' },
  { told: 'A little manganese(IV) oxide is added to hydrogen peroxide solution, which breaks down into water and a gas.', gas: 'oxygen' },
  { told: 'Concentrated sodium chloride solution is electrolysed. A pale green gas forms at the positive electrode.', gas: 'chlorine' },
  { told: 'Water with a little acid in it is electrolysed. A gas collects at the negative electrode.', gas: 'hydrogen' },
  { told: 'Water with a little acid in it is electrolysed. A gas collects at the positive electrode.', gas: 'oxygen' },
  { told: 'A lump of calcium is dropped into cold water and fizzes.', gas: 'hydrogen' },
  { told: 'Sodium hydrogen carbonate (baking soda) is stirred into vinegar and fizzes.', gas: 'carbon dioxide' },
];

function gasTests(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const g = rng.pick(GASES);
    if (rng.chance(0.5)) {
      return {
        prompt: `${g.test}, and ${g.result}. Which gas is it?`,
        parts: [part(fixedChoice(gasNames, GASES.indexOf(g)))],
        hints: ['Each of the four gases has its own test: a burning splint, a glowing splint, limewater or damp litmus paper.', 'Hydrogen burns; oxygen makes things burn better.'],
        solution: [`${g.test}, and ${g.result}: this is the test for ${g.gas}, ${$(g.f)}.`],
      };
    }
    const right = `${g.test}, and ${g.result}`;
    return {
      prompt: `Which test and result show that a gas is **${g.gas}**?`,
      parts: [part(mc(rng, right, GASES.filter((x) => x !== g).map((x) => `${x.test}, and ${x.result}`)))],
      hints: ['Hydrogen: burning splint. Oxygen: glowing splint. Carbon dioxide: limewater. Chlorine: damp litmus paper.'],
      solution: [`The test for ${g.gas}: ${right.toLowerCase()}.`],
    };
  }
  if (d === 2) {
    const s = rng.pick(GAS_SOURCES);
    const g = GASES.find((x) => x.gas === s.gas)!;
    const right = `${g.test}, and ${g.result}`;
    return {
      prompt: `${s.told} Which test and result would identify the gas?`,
      parts: [part(mc(rng, right, GASES.filter((x) => x !== g).map((x) => `${x.test}, and ${x.result}`)))],
      hints: ['First decide which gas the reaction makes.', 'Metal + acid gives hydrogen. Carbonate + acid, or a heated carbonate, gives carbon dioxide.'],
      solution: [`The gas is ${g.gas}, ${$(g.f)}.`, `Test: ${right.toLowerCase()}.`],
    };
  }
  const kind = rng.pick(['table', 'table', 'mistake'] as const);
  if (kind === 'mistake') {
    const item = rng.pick([
      {
        ask: 'A student tests a tube of oxygen with a **burning** splint instead of a glowing one. What is seen?',
        right: 'The splint burns more brightly, but there is no pop',
        wrong: ['The gas burns with a squeaky pop', 'The splint goes out at once', 'The splint turns white'],
        sol: 'Oxygen does not burn; it helps other things burn. A burning splint simply burns more brightly. Using a glowing splint makes the result clear, because it bursts back into flame.',
      },
      {
        ask: 'A student holds **dry** blue litmus paper in a jar of dry chlorine, and nothing happens. Why does the test fail?',
        right: 'Chlorine bleaches only when water is present, so the paper must be damp',
        wrong: ['Chlorine bleaches only red litmus paper', 'Chlorine is not an acidic gas', 'The paper must be burning for the test to work'],
        sol: 'Chlorine reacts with water to make the substances that bleach. With damp litmus paper, the paper turns red for a moment and is then bleached white.',
      },
      {
        ask: 'A student bubbles hydrogen through limewater to test it. What is seen?',
        right: 'The limewater stays clear',
        wrong: ['The limewater turns milky', 'The limewater is bleached white', 'The limewater pops'],
        sol: 'Limewater turns milky only with carbon dioxide, because solid calcium carbonate forms. Hydrogen does not react with it.',
      },
      {
        ask: 'A glowing splint is put into a tube of carbon dioxide. What is seen?',
        right: 'The splint goes out',
        wrong: ['The splint relights', 'The gas burns with a squeaky pop', 'The splint is bleached white'],
        sol: 'Carbon dioxide does not let things burn in it, so the glowing splint goes out. Only oxygen relights it.',
      },
    ]);
    return {
      prompt: item.ask,
      parts: [part(mc(rng, item.right, item.wrong))],
      hints: ['Think about what each gas does: hydrogen burns, oxygen supports burning, carbon dioxide puts flames out, damp chlorine bleaches.'],
      solution: [item.sol],
    };
  }
  // The results of three tests on one unknown gas, two of them negative.
  const g = rng.pick(GASES);
  const tests = rng.shuffle([g, ...rng.sample(GASES.filter((x) => x !== g), 2)]);
  const figure: TableFigure = { type: 'table', headers: ['Test', 'What is seen'], rows: tests.map((t) => [t.test, cap(t === g ? t.result : t.negative)]) };
  return {
    prompt: 'Three tests are carried out on separate tubes of the same colourless gas. The table shows what is seen. Which gas is it?',
    figure,
    parts: [part(fixedChoice(gasNames, GASES.indexOf(g)))],
    hints: ['Only one of the three tests gives a positive result.', 'Match that test to its gas.'],
    solution: [`Only one test is positive: ${g.test.toLowerCase()}, and ${g.result}. That is the test for ${g.gas}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 2.2: metal ions

const FLAMES: Array<{ metal: string; ion: string; colour: string }> = [
  { metal: 'lithium', ion: 'Li+', colour: 'crimson' },
  { metal: 'sodium', ion: 'Na+', colour: 'yellow' },
  { metal: 'potassium', ion: 'K+', colour: 'lilac' },
  { metal: 'calcium', ion: 'Ca^2+', colour: 'orange-red' },
  { metal: 'copper', ion: 'Cu^2+', colour: 'green' },
];
const FLAME_KEY = 'Flame colours: lithium crimson, sodium yellow, potassium lilac, calcium orange-red, copper green.';

interface Hydroxide {
  name: string;
  ion: string;
  charge: number;
  colour: string;
  /** What happens when more sodium hydroxide solution is added. */
  excess: 'stays' | 'dissolves';
  solid: string;
}
const HYDROXIDES: Hydroxide[] = [
  { name: 'copper(II)', ion: 'Cu^2+', charge: 2, colour: 'blue', excess: 'stays', solid: 'Cu(OH)2' },
  { name: 'iron(II)', ion: 'Fe^2+', charge: 2, colour: 'green', excess: 'stays', solid: 'Fe(OH)2' },
  { name: 'iron(III)', ion: 'Fe^3+', charge: 3, colour: 'brown', excess: 'stays', solid: 'Fe(OH)3' },
  { name: 'calcium', ion: 'Ca^2+', charge: 2, colour: 'white', excess: 'stays', solid: 'Ca(OH)2' },
  { name: 'magnesium', ion: 'Mg^2+', charge: 2, colour: 'white', excess: 'stays', solid: 'Mg(OH)2' },
  { name: 'aluminium', ion: 'Al^3+', charge: 3, colour: 'white', excess: 'dissolves', solid: 'Al(OH)3' },
];
const HYDROXIDE_KEY =
  'With sodium hydroxide solution: copper(II) ions give a blue precipitate, iron(II) green and iron(III) brown. Calcium, magnesium and aluminium ions all give a white precipitate, and only the aluminium precipitate dissolves when more sodium hydroxide is added.';

function cationTests(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const f = rng.pick(FLAMES);
    if (rng.chance(0.5)) {
      return {
        prompt: `A clean wire loop is dipped into a compound and held in a blue Bunsen flame. The flame turns **${f.colour}**. Which metal ion does the compound contain? ${FLAME_KEY}`,
        parts: [part(fixedChoice(FLAMES.map((x) => cap(x.metal)), FLAMES.indexOf(f)))],
        hints: ['Each of these metal ions gives the flame its own colour.'],
        solution: [`A ${f.colour} flame shows ${f.metal} ions, ${$(f.ion)}.`],
      };
    }
    const colours = ['Crimson', 'Yellow', 'Lilac', 'Orange-red', 'Green'];
    return {
      prompt: `A flame test is carried out on ${f.metal} chloride. What colour is the flame?`,
      parts: [part(fixedChoice(colours, FLAMES.indexOf(f)))],
      hints: ['The colour comes from the metal ion, not from the chloride.', 'Lithium, sodium and potassium give crimson, yellow and lilac.'],
      solution: [`${cap(f.metal)} ions give a ${f.colour} flame.`],
    };
  }
  if (d === 2) {
    const h = rng.pick(HYDROXIDES);
    if (h.colour !== 'white' && rng.chance(0.5)) {
      const names = HYDROXIDES.map((x) => `${cap(x.name)} ions`);
      return {
        prompt: `A few drops of sodium hydroxide solution are added to a solution of a metal compound. A **${h.colour}** precipitate forms. Which ions does the solution contain? ${HYDROXIDE_KEY}`,
        parts: [part(mc(rng, names[HYDROXIDES.indexOf(h)], rng.shuffle(names.filter((_, i) => i !== HYDROXIDES.indexOf(h)))))],
        hints: ['The precipitate is the metal hydroxide, which does not dissolve in water.', 'Only three of these hydroxides are coloured.'],
        solution: [`A ${h.colour} precipitate with sodium hydroxide solution shows ${h.name} ions, ${$(h.ion)}. The precipitate is ${h.name} hydroxide, ${$(h.solid)}.`],
      };
    }
    const white = h.colour === 'white' ? h : rng.pick(HYDROXIDES.filter((x) => x.colour === 'white'));
    const told = white.excess === 'dissolves' ? 'the precipitate dissolves, leaving a colourless solution' : 'the precipitate does not dissolve';
    const right = white.excess === 'dissolves' ? 'It contains aluminium ions' : 'It contains calcium or magnesium ions, but not aluminium ions';
    const wrong = ['It contains aluminium ions', 'It contains calcium or magnesium ions, but not aluminium ions', 'It contains copper(II) ions', 'It contains iron(II) ions'].filter((x) => x !== right);
    return {
      prompt: `Sodium hydroxide solution is added to a solution of a metal compound, and a white precipitate forms. When more sodium hydroxide solution is added, ${told}. What can be concluded? ${HYDROXIDE_KEY}`,
      parts: [part(mc(rng, right, wrong))],
      hints: ['Three ions give a white precipitate. The second step tells one of them from the other two.'],
      solution: [
        white.excess === 'dissolves'
          ? 'Only the white precipitate of aluminium hydroxide dissolves in an excess of sodium hydroxide solution, so the ions are aluminium ions.'
          : 'The white precipitates of calcium hydroxide and magnesium hydroxide do not dissolve in an excess, but aluminium hydroxide does. So the ions are calcium or magnesium ions. A flame test tells these apart: calcium gives an orange-red flame.',
      ],
    };
  }
  const h = rng.pick(HYDROXIDES);
  if (rng.chance(0.5)) {
    // The ionic equation for the precipitate.
    const M = h.ion.replace(/\^?\d*\+$/, '');
    const write = (ion: string, n: number, solid: string) => eq(`${ion}(aq) + ${n === 1 ? '' : n}OH-(aq) -> ${solid}(s)`);
    const other = h.charge === 2 ? 3 : 2;
    const wrong = [write(h.ion, other, `${M}(OH)${other}`), write(h.ion, 1, `${M}OH`), eq(`${h.ion}(aq) + ${h.charge}OH-(aq) -> ${M}(s) + ${h.charge}OH(aq)`)];
    return {
      prompt: `Sodium hydroxide solution is added to a solution containing ${h.name} ions, ${$(h.ion)}, and a ${h.colour} precipitate of ${h.name} hydroxide forms. Which ionic equation shows the reaction?`,
      parts: [part(mc(rng, write(h.ion, h.charge, h.solid), wrong))],
      hints: ['Each hydroxide ion has a charge of 1−. The precipitate has no overall charge.', `How many hydroxide ions cancel the charge of one ${$(h.ion)} ion?`],
      solution: [`One ${$(h.ion)} ion needs ${h.charge} hydroxide ions to cancel its ${h.charge}+ charge.`, `${write(h.ion, h.charge, h.solid)}`],
    };
  }
  // Two tests together tell calcium from magnesium, or confirm an ion.
  const pick = rng.pick([
    { flame: 'an orange-red flame', ppt: 'a white precipitate that does not dissolve when more is added', right: 'Calcium ions' },
    { flame: 'a green flame', ppt: 'a blue precipitate', right: 'Copper(II) ions' },
    { flame: 'no colour of its own', ppt: 'a white precipitate that does not dissolve when more is added', right: 'Magnesium ions' },
    { flame: 'no colour of its own', ppt: 'a white precipitate that dissolves when more is added', right: 'Aluminium ions' },
    { flame: 'no colour of its own', ppt: 'a brown precipitate', right: 'Iron(III) ions' },
    { flame: 'no colour of its own', ppt: 'a green precipitate', right: 'Iron(II) ions' },
  ]);
  const all = ['Calcium ions', 'Copper(II) ions', 'Magnesium ions', 'Aluminium ions', 'Iron(III) ions', 'Iron(II) ions'];
  return {
    prompt: `A compound gives the flame ${pick.flame} in a flame test. Its solution gives ${pick.ppt} with sodium hydroxide solution. Which metal ions does it contain? ${FLAME_KEY} ${HYDROXIDE_KEY}`,
    parts: [part(mc(rng, pick.right, rng.shuffle(all.filter((x) => x !== pick.right))))],
    hints: ['Use the precipitate first to narrow the choice, then the flame.', 'Calcium and magnesium both give a white precipitate that stays; only calcium colours a flame.'],
    solution: [`The sodium hydroxide test gives ${pick.ppt}, and the flame test gives ${pick.flame}. Together these fit ${pick.right[0].toLowerCase()}${pick.right.slice(1)} only.`],
  };
}

// ---------------------------------------------------------------------------- lesson 2.2: negative ions

interface AnionTest {
  ion: string;
  f: string;
  reagent: string;
  result: string;
}
const ANION_TESTS: AnionTest[] = [
  { ion: 'carbonate', f: 'CO3^2-', reagent: 'Dilute hydrochloric acid is added', result: 'the mixture fizzes, and the gas turns limewater milky' },
  { ion: 'chloride', f: 'Cl-', reagent: 'Dilute nitric acid is added, then silver nitrate solution', result: 'a white precipitate forms' },
  { ion: 'bromide', f: 'Br-', reagent: 'Dilute nitric acid is added, then silver nitrate solution', result: 'a cream precipitate forms' },
  { ion: 'iodide', f: 'I-', reagent: 'Dilute nitric acid is added, then silver nitrate solution', result: 'a yellow precipitate forms' },
  { ion: 'sulfate', f: 'SO4^2-', reagent: 'Dilute hydrochloric acid is added, then barium chloride solution', result: 'a white precipitate forms' },
];
const ANION_KEY =
  'Tests: a carbonate fizzes with dilute acid, giving carbon dioxide. With dilute nitric acid and silver nitrate solution, a chloride gives a white precipitate, a bromide cream and an iodide yellow. With dilute hydrochloric acid and barium chloride solution, a sulfate gives a white precipitate.';

/** Compounds a student could be given, each named by one positive-ion result and one negative-ion result. */
const UNKNOWNS: Array<{ name: string; cation: string; anion: string }> = [
  { name: 'Potassium iodide', cation: 'a lilac flame', anion: 'iodide' },
  { name: 'Sodium chloride', cation: 'a yellow flame', anion: 'chloride' },
  { name: 'Lithium bromide', cation: 'a crimson flame', anion: 'bromide' },
  { name: 'Sodium sulfate', cation: 'a yellow flame', anion: 'sulfate' },
  { name: 'Potassium carbonate', cation: 'a lilac flame', anion: 'carbonate' },
  { name: 'Calcium chloride', cation: 'an orange-red flame', anion: 'chloride' },
  { name: 'Copper(II) sulfate', cation: 'a blue precipitate with sodium hydroxide solution', anion: 'sulfate' },
  { name: 'Copper(II) chloride', cation: 'a blue precipitate with sodium hydroxide solution', anion: 'chloride' },
  { name: 'Iron(II) sulfate', cation: 'a green precipitate with sodium hydroxide solution', anion: 'sulfate' },
  { name: 'Iron(III) chloride', cation: 'a brown precipitate with sodium hydroxide solution', anion: 'chloride' },
  { name: 'Potassium bromide', cation: 'a lilac flame', anion: 'bromide' },
  { name: 'Sodium carbonate', cation: 'a yellow flame', anion: 'carbonate' },
  { name: 'Lithium chloride', cation: 'a crimson flame', anion: 'chloride' },
  { name: 'Sodium iodide', cation: 'a yellow flame', anion: 'iodide' },
  { name: 'Potassium sulfate', cation: 'a lilac flame', anion: 'sulfate' },
];
const CATION_OF: Record<string, string> = {
  'a lilac flame': 'potassium',
  'a yellow flame': 'sodium',
  'a crimson flame': 'lithium',
  'an orange-red flame': 'calcium',
  'a blue precipitate with sodium hydroxide solution': 'copper(II)',
  'a green precipitate with sodium hydroxide solution': 'iron(II)',
  'a brown precipitate with sodium hydroxide solution': 'iron(III)',
};

function anionTests(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const t = rng.pick(ANION_TESTS);
    const names = ANION_TESTS.map((x) => `${cap(x.ion)} ions`);
    return {
      prompt: `A solution of a compound is tested. ${t.reagent}, and ${t.result}. Which ions does the solution contain? ${ANION_KEY}`,
      parts: [part(fixedChoice(names, ANION_TESTS.indexOf(t)))],
      hints: ['Start with the reagents that were added: they tell you which family of ions is being tested for.', 'For the halides, the colour of the precipitate tells them apart.'],
      solution: [`${t.reagent}, and ${t.result}: this is the test for ${t.ion} ions, ${$(t.f)}.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.4)) {
      const item = rng.pick([
        {
          ask: 'In the test for halide ions, dilute nitric acid is added before the silver nitrate solution. Why?',
          right: 'To remove any carbonate ions, which would also give a precipitate with silver nitrate',
          wrong: ['To make the halide ions change colour', 'To dissolve the silver halide precipitate', 'To turn the halide ions into sulfate ions'],
          sol: 'Silver carbonate is also insoluble, so carbonate ions would give a precipitate and a false result. The acid reacts with any carbonate first.',
        },
        {
          ask: 'In the test for halide ions, why must the acid be nitric acid and not hydrochloric acid?',
          right: 'Hydrochloric acid would add chloride ions, which give a white precipitate with silver nitrate',
          wrong: ['Hydrochloric acid is too weak to react', 'Nitric acid contains silver ions', 'Hydrochloric acid would add sulfate ions'],
          sol: 'Hydrochloric acid contains chloride ions. They would form silver chloride, a white precipitate, whatever was in the sample.',
        },
        {
          ask: 'In the test for sulfate ions, why is sulfuric acid not used to acidify the solution?',
          right: 'Sulfuric acid would add sulfate ions, so a white precipitate would form in every sample',
          wrong: ['Sulfuric acid would add chloride ions', 'Sulfuric acid does not mix with water', 'Sulfuric acid would dissolve the barium sulfate'],
          sol: 'Sulfuric acid contains sulfate ions. They would form barium sulfate, a white precipitate, whatever was in the sample.',
        },
        {
          ask: 'A white precipitate forms when barium chloride solution is added to an acidified solution. What is the precipitate?',
          right: 'Barium sulfate',
          wrong: ['Barium chloride', 'Silver chloride', 'Barium carbonate'],
          sol: 'Barium ions and sulfate ions form barium sulfate, which does not dissolve in water or in dilute acid.',
        },
      ]);
      return {
        prompt: item.ask,
        parts: [part(mc(rng, item.right, item.wrong))],
        hints: ['A good test gives a positive result for one ion only.', 'Think about which ions each acid adds to the mixture.'],
        solution: [item.sol],
      };
    }
    const t = rng.pick(ANION_TESTS);
    const reagents = ['Dilute nitric acid, then silver nitrate solution', 'Dilute hydrochloric acid, then barium chloride solution', 'Dilute hydrochloric acid, with limewater to test the gas', 'Sodium hydroxide solution'];
    const index = t.ion === 'carbonate' ? 2 : t.ion === 'sulfate' ? 1 : 0;
    return {
      prompt: `Which reagents are used to test a solution for **${t.ion}** ions?`,
      parts: [part(mc(rng, reagents[index], reagents.filter((_, i) => i !== index)))],
      hints: ['Silver nitrate is for halides. Barium chloride is for sulfates. An acid alone is for carbonates.', 'Sodium hydroxide solution tests for metal ions, not for negative ions.'],
      solution: [`For ${t.ion} ions: ${reagents[index].toLowerCase()}. A positive result: ${t.result}.`],
    };
  }
  // Name a compound from one result for each ion.
  const u = rng.pick(UNKNOWNS);
  const t = ANION_TESTS.find((x) => x.ion === u.anion)!;
  const cation = CATION_OF[u.cation];
  const others = rng.shuffle(UNKNOWNS.filter((x) => x.name !== u.name && (CATION_OF[x.cation] === cation || x.anion === u.anion)));
  const fill = rng.shuffle(UNKNOWNS.filter((x) => x.name !== u.name && !others.includes(x)));
  return {
    prompt: `A compound gives ${u.cation}. ${t.reagent} to a solution of it, and ${t.result}. What is the compound? ${FLAME_KEY} ${HYDROXIDE_KEY} ${ANION_KEY}`,
    parts: [part(mc(rng, u.name, [...others, ...fill].map((x) => x.name)))],
    hints: ['The first result identifies the metal ion. The second identifies the negative ion.', 'Put the two names together, metal first.'],
    solution: [`${cap(u.cation)} shows ${cation} ions.`, `${t.reagent}, and ${t.result}: this shows ${t.ion} ions.`, `The compound is ${u.name.toLowerCase()}.`],
  };
}

export const ANALYSIS_SKILLS: SkillDef[] = [
  skill({ id: 'cx-purity', name: 'Purity and formulations', description: 'Use melting and boiling points to tell pure substances from mixtures, and recognise formulations.', outcomes: ['CA1'], lessonId: L(1), gen: purity }),
  skill({ id: 'cx-gas-tests', name: 'Tests for gases', description: 'Identify hydrogen, oxygen, carbon dioxide and chlorine from their tests.', outcomes: ['CA1'], lessonId: L(1), gen: gasTests }),
  skill({ id: 'cx-cation-tests', name: 'Tests for metal ions', description: 'Identify metal ions from flame colours and from their precipitates with sodium hydroxide solution.', outcomes: ['CA2'], lessonId: L(2), gen: cationTests }),
  skill({ id: 'cx-anion-tests', name: 'Tests for negative ions', description: 'Identify carbonate, halide and sulfate ions from their tests, and name a compound from its results.', outcomes: ['CA2'], lessonId: L(2), gen: anionTests }),
];
