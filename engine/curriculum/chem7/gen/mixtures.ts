/**
 * Grade 7 Chemistry, Unit 3: Mixtures and Solutions (7-C1). Pure substances and mixtures, the
 * kinds of mixture, solutes and solvents, concentration in grams per litre, solubility tables and
 * saturation, how fast things dissolve, and fair tests.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { bank, CHOICES, either, fromBank, NAMES, num, q, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `c7-3-${n}`;

// ---------------------------------------------------------------------------- 3.1 pure or mixture

const STUFF: Array<{ name: string; pure: boolean; why: string }> = [
  { name: 'distilled water', pure: true, why: 'Distilled water contains only water particles.' },
  { name: 'sea water', pure: false, why: 'Sea water is water with salts and other substances dissolved in it.' },
  { name: 'air', pure: false, why: 'Air is a mixture of nitrogen, oxygen, argon, carbon dioxide and water vapour.' },
  { name: 'oxygen gas', pure: true, why: 'Oxygen gas contains only oxygen particles.' },
  { name: 'table salt (sodium chloride)', pure: true, why: 'Pure table salt contains only one substance, sodium chloride.' },
  { name: 'orange juice', pure: false, why: 'Orange juice contains water, sugars, acids, pulp and more.' },
  { name: 'a bar of pure gold', pure: true, why: 'Pure gold contains only gold.' },
  { name: 'steel', pure: false, why: 'Steel is iron mixed with a little carbon and often other metals.' },
  { name: 'milk', pure: false, why: 'Milk is water with fat, proteins and sugars mixed in.' },
  { name: 'sugar (sucrose)', pure: true, why: 'Pure sugar contains only one substance, sucrose.' },
  { name: 'soil', pure: false, why: 'Soil is a mixture of rock bits, sand, clay, water, air and rotting plants.' },
  { name: 'carbon dioxide gas', pure: true, why: 'Carbon dioxide gas contains only carbon dioxide particles.' },
  { name: 'tap water', pure: false, why: 'Tap water has small amounts of minerals and other substances dissolved in it.' },
  { name: 'copper wire', pure: true, why: 'Copper wire is made of only copper.' },
  { name: 'a breakfast cereal with milk', pure: false, why: 'You can see the different parts: cereal and milk.' },
];

function pureOrMix(rng: Rng): GenOutput {
  const s = rng.pick(STUFF);
  return {
    prompt: `Is ${s.name} a pure substance or a mixture?`,
    parts: [part(fixedChoice([...CHOICES.pureMix], s.pure ? 0 : 1))],
    hints: ['A pure substance contains only one kind of particle. A mixture contains two or more substances that are not joined together.'],
    solution: [s.why, `So it is ${s.pure ? 'a pure substance' : 'a mixture'}.`],
  };
}

const PURE_MEDIUM: Q[] = [
  { q: 'A carton says “100% pure orange juice”. Is the juice a pure substance in science?', a: 'No, it is a mixture of water, sugars, acids and more', w: ['Yes, because nothing has been added to it', 'Yes, because it comes from only one fruit', 'No, because it is a liquid and not a solid'], why: 'In everyday talk “pure” means nothing was added. In science a pure substance contains only one substance, and juice contains many.' },
  { q: 'How can you tell whether a sample of a solid is pure?', a: 'A pure solid melts at one exact temperature', w: ['A pure solid is always white in colour', 'A pure solid always dissolves in water', 'A pure solid is always shiny'], why: 'Every pure substance has a fixed melting point. A mixture melts gradually, over a range of temperatures.' },
  { q: 'What is a mixture?', a: 'Two or more substances mixed together but not chemically joined', w: ['One substance made of only one kind of particle', 'Two substances joined together to make a new substance', 'Any substance that has been heated'], why: 'The parts of a mixture keep their own properties and can be separated again.' },
  { q: 'Pure water boils at 100 °C. A sample of water boils at 102 °C. What does this suggest?', a: 'The water has something dissolved in it, so it is a mixture', w: ['The water is extra pure', 'The thermometer is always right, so water boils at 102 °C', 'The water has turned into a new substance'], why: 'Dissolved substances change the boiling point. A pure substance boils at its own fixed temperature.' },
];

function meltingTest(rng: Rng): GenOutput {
  const mp = rng.int(40, 180);
  const low = mp - rng.int(5, 15);
  const high = mp - rng.int(1, 3);
  const pureFirst = rng.chance(0.5);
  const a = pureFirst ? `melts sharply at ${mp} °C` : `melts gradually between ${low} °C and ${high} °C`;
  const b = pureFirst ? `melts gradually between ${low} °C and ${high} °C` : `melts sharply at ${mp} °C`;
  return {
    prompt: `${rng.pick(NAMES)} heats two white powders. Sample A ${a}. Sample B ${b}. Which sample is pure?`,
    parts: [part(fixedChoice(['Sample A', 'Sample B', 'Both', 'Neither'], pureFirst ? 0 : 1))],
    hints: ['A pure substance melts at one exact temperature. A mixture melts over a range.'],
    solution: [`The sample that melts sharply at ${mp} °C is pure; the one that melts over a range is a mixture.`],
  };
}

// ---------------------------------------------------------------------------- 3.1 kinds of mixture

const KINDS = ['Mechanical mixture', 'Suspension', 'Colloid', 'Solution'];
const KIND_EXAMPLES: Array<{ name: string; kind: number; why: string }> = [
  { name: 'a bowl of mixed nuts', kind: 0, why: 'You can see each different part, so it is a mechanical mixture.' },
  { name: 'gravel and sand', kind: 0, why: 'You can see the separate pieces, so it is a mechanical mixture.' },
  { name: 'a salad', kind: 0, why: 'You can see and pick out each part, so it is a mechanical mixture.' },
  { name: 'muddy water', kind: 1, why: 'It is cloudy, and the mud settles to the bottom if it is left to stand: a suspension.' },
  { name: 'oil and vinegar salad dressing, shaken', kind: 1, why: 'Shaken, it looks mixed, but the oil separates out again: a suspension.' },
  { name: 'chalk dust stirred into water', kind: 1, why: 'The chalk makes the water cloudy and then settles out: a suspension.' },
  { name: 'milk', kind: 2, why: 'Milk is cloudy, but its tiny droplets of fat never settle out: a colloid.' },
  { name: 'fog', kind: 2, why: 'Fog is tiny water droplets spread through air that do not settle: a colloid.' },
  { name: 'whipped cream', kind: 2, why: 'Whipped cream is air spread through cream in tiny bubbles that stay put: a colloid.' },
  { name: 'salt water', kind: 3, why: 'The salt dissolves completely and the water stays clear: a solution.' },
  { name: 'sugar dissolved in tea', kind: 3, why: 'The sugar dissolves and cannot be seen: a solution.' },
  { name: 'air', kind: 3, why: 'Air is gases evenly mixed, with no parts you can see: a solution of gases.' },
];

function kindOf(rng: Rng): GenOutput {
  const k = rng.pick(KIND_EXAMPLES);
  return {
    prompt: `What kind of mixture is ${k.name}?`,
    parts: [part(fixedChoice(KINDS, k.kind))],
    hints: ['Can you see the parts? Does it settle if left to stand? Is it clear or cloudy?'],
    solution: [k.why],
  };
}

const KIND_MEDIUM: Q[] = [
  { q: 'A mixture looks cloudy, and after an hour a layer of solid has settled at the bottom. What kind of mixture is it?', a: 'Suspension', w: [], order: KINDS, why: 'A suspension is cloudy and its parts settle out when left to stand.' },
  { q: 'A mixture is clear, and nothing settles out however long it stands. You cannot see its parts. What kind of mixture is it?', a: 'Solution', w: [], order: KINDS, why: 'In a solution one substance has dissolved completely in another, so it is clear and never separates by standing.' },
  { q: 'You can easily see and pick out the different parts of a mixture. What kind of mixture is it?', a: 'Mechanical mixture', w: [], order: KINDS, why: 'In a mechanical mixture each part can be seen.' },
  { q: 'A mixture is cloudy, but even after days nothing settles out. What kind of mixture is it?', a: 'Colloid', w: [], order: KINDS, why: 'A colloid has tiny bits spread through it that are too small to settle, so it stays cloudy.' },
];

const KIND_HARD: Select[] = [
  { q: 'Which of these are solutions?', opts: [['Salt water', true], ['Sugar dissolved in tea', true], ['Vinegar (acid dissolved in water)', true], ['Muddy water', false], ['Milk', false], ['A bowl of mixed nuts', false]], why: 'In a solution the dissolved substance cannot be seen and never settles out. Mud settles, milk is a colloid, and nuts are a mechanical mixture.' },
  { q: 'Which of these are heterogeneous (you can see different parts or layers)?', opts: [['Gravel and sand', true], ['Oil floating on water', true], ['Muddy water that has settled', true], ['Salt water', false], ['Clean air', false]], why: 'A heterogeneous mixture has parts you can tell apart. Solutions such as salt water and air look the same all through: they are homogeneous.' },
];

// ---------------------------------------------------------------------------- 3.2 solutes and solvents

const SOLUTIONS: Array<{ solution: string; solute: string; solvent: string }> = [
  { solution: 'salt water', solute: 'Salt', solvent: 'Water' },
  { solution: 'sweet tea (sugar dissolved in tea)', solute: 'Sugar', solvent: 'Water' },
  { solution: 'a fizzy drink', solute: 'Carbon dioxide', solvent: 'Water' },
  { solution: 'iodine dissolved in alcohol (a disinfectant)', solute: 'Iodine', solvent: 'Alcohol' },
  { solution: 'nail varnish dissolved in acetone (nail varnish remover)', solute: 'Nail varnish', solvent: 'Acetone' },
  { solution: 'copper sulfate solution', solute: 'Copper sulfate', solvent: 'Water' },
];

function soluteSolvent(rng: Rng): GenOutput {
  const s = rng.pick(SOLUTIONS);
  const askSolute = rng.chance(0.6);
  const ans = askSolute ? s.solute : s.solvent;
  const pool = ['Salt', 'Sugar', 'Water', 'Alcohol', 'Carbon dioxide', 'Acetone', 'Iodine'].filter((x) => x !== s.solute && x !== s.solvent);
  return {
    prompt: `In ${s.solution}, what is the ${askSolute ? 'solute' : 'solvent'}?`,
    parts: [part(mc(rng, ans, [askSolute ? s.solvent : s.solute, ...rng.sample(pool, 2)]))],
    hints: ['The solute is the substance that dissolves. The solvent is the liquid it dissolves in.'],
    solution: [`${s.solute} dissolves in ${s.solvent.toLowerCase()}, so ${s.solute.toLowerCase()} is the solute and ${s.solvent.toLowerCase()} is the solvent.`],
  };
}

function solutionMass(rng: Rng): GenOutput {
  const solute = rng.int(5, 60);
  const solvent = rng.int(10, 50) * 10;
  const what = rng.pick(['salt', 'sugar', 'copper sulfate']);
  if (rng.chance(0.5)) {
    return {
      prompt: `${rng.pick(NAMES)} dissolves ${q(solute, 'g')} of ${what} in ${q(solvent, 'g')} of water. What is the mass of the solution?`,
      parts: [numPart(solute + solvent, { suffix: 'g' })],
      hints: ['When something dissolves, it does not disappear: its mass is still there.', 'Mass of solution = mass of solute + mass of solvent.'],
      solution: [`$${solute} + ${solvent} = ${solute + solvent}\\ \\text{g}$`],
    };
  }
  return {
    prompt: `A solution of ${what} in water has a mass of ${q(solute + solvent, 'g')}. It contains ${q(solute, 'g')} of ${what}. What mass of water is in it?`,
    parts: [numPart(solvent, { suffix: 'g' })],
    hints: ['Mass of solution = mass of solute + mass of solvent, so mass of solvent = mass of solution − mass of solute.'],
    solution: [`$${solute + solvent} - ${solute} = ${solvent}\\ \\text{g}$`],
  };
}

const DISSOLVE_HARD: Q[] = [
  { q: 'Sugar is stirred into water until it can no longer be seen. Where has the sugar gone?', a: 'Its particles have spread out between the water particles; it is still there', w: ['It has been destroyed and no longer exists', 'It has turned into water particles', 'It has evaporated into the air'], why: 'Dissolving spreads the solute particles between the solvent particles. The sugar is still there, which is why the water tastes sweet and the mass does not change.' },
  { q: 'What does “soluble” mean?', a: 'Able to dissolve in a solvent', w: ['Unable to dissolve in any solvent', 'Able to melt at a low temperature', 'Able to float on water'], why: 'A soluble substance dissolves in the solvent; an insoluble one does not.' },
  { q: 'Which of these is insoluble in water?', a: 'Sand', w: ['Salt', 'Sugar', 'Instant coffee'], why: 'Sand does not dissolve in water; salt, sugar and instant coffee do.' },
];

// ---------------------------------------------------------------------------- 3.2 concentration

const CONC_HINTS = ['Concentration (g/L) = mass of solute (g) ÷ volume of solution (L).', '1 L = 1000 mL.'];

function concEasy(rng: Rng): GenOutput {
  const c = rng.int(2, 30);
  const v = rng.int(1, 5);
  return {
    prompt: `${q(c * v, 'g')} of salt is dissolved in water to make ${q(v, 'L')} of solution. What is the concentration in g/L?`,
    parts: [numPart(c, { suffix: 'g/L' })],
    hints: CONC_HINTS,
    solution: [`$${c * v} \\div ${v} = ${c}\\ \\text{g/L}$`],
  };
}

function concMedium(rng: Rng): GenOutput {
  const ml = rng.pick([100, 200, 250, 500]);
  const c = rng.int(4, 80);
  const m = (c * ml) / 1000;
  return {
    prompt: `${q(num(m), 'g')} of sugar is dissolved to make ${q(ml, 'mL')} of solution. What is the concentration in g/L?`,
    parts: [numPart(c, { suffix: 'g/L' })],
    hints: CONC_HINTS,
    solution: [`$${ml}\\ \\text{mL} = ${num(ml / 1000, 3)}\\ \\text{L}$`, `$${num(m)} \\div ${num(ml / 1000, 3)} = ${c}\\ \\text{g/L}$`],
  };
}

function concHard(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const c = rng.int(5, 50);
    const v = rng.pick([0.5, 2, 3, 0.25, 1.5]);
    return {
      prompt: `A recipe for plant food needs a solution with a concentration of ${q(c, 'g/L')}. What mass of plant food is needed to make ${q(v, 'L')} of it?`,
      parts: [numPart(c * v, { suffix: 'g' })],
      hints: ['Mass of solute = concentration × volume.'],
      solution: [`$${c} \\times ${v} = ${num(c * v)}\\ \\text{g}$`],
    };
  }
  const a = { m: rng.int(10, 40), v: rng.pick([0.5, 1, 2]) };
  let b = { m: rng.int(10, 40), v: rng.pick([0.5, 1, 2]) };
  while (a.m / a.v === b.m / b.v) b = { m: rng.int(10, 40), v: rng.pick([0.5, 1, 2]) };
  const aMore = a.m / a.v > b.m / b.v;
  return {
    prompt: `Solution A has ${q(a.m, 'g')} of salt in ${q(a.v, 'L')}. Solution B has ${q(b.m, 'g')} of salt in ${q(b.v, 'L')}. Which solution is more concentrated?`,
    parts: [part(fixedChoice(['Solution A', 'Solution B'], aMore ? 0 : 1))],
    hints: ['Work out the concentration of each in g/L, then compare.'],
    solution: [`A: $${a.m} \\div ${a.v} = ${num(a.m / a.v)}\\ \\text{g/L}$. B: $${b.m} \\div ${b.v} = ${num(b.m / b.v)}\\ \\text{g/L}$.`, `So solution ${aMore ? 'A' : 'B'} is more concentrated.`],
  };
}

// ---------------------------------------------------------------------------- 3.3 solubility

/** Grams that dissolve in 100 g of water at 0, 20, 40, 60 and 80 °C (rounded data, stated in each question). */
const SOLUBILITY: Array<{ name: string; g: number[] }> = [
  { name: 'potassium nitrate', g: [13, 32, 64, 110, 169] },
  { name: 'sodium chloride (salt)', g: [36, 36, 37, 37, 38] },
  { name: 'copper sulfate', g: [14, 20, 29, 40, 55] },
  { name: 'sugar', g: [179, 204, 238, 287, 362] },
  { name: 'potassium chloride', g: [28, 34, 40, 46, 51] },
];
const TEMPS = [0, 20, 40, 60, 80];

function solubilityTable(rng: Rng): { s: (typeof SOLUBILITY)[number]; i: number; text: string } {
  const s = rng.pick(SOLUBILITY);
  const i = rng.int(0, 4);
  const text = `The table gives the mass of ${s.name} that dissolves in 100 g of water: ${TEMPS.map((t, k) => `${s.g[k]} g at ${t} °C`).join(', ')}.`;
  return { s, i, text };
}

function solubilityRead(rng: Rng): GenOutput {
  const { s, i, text } = solubilityTable(rng);
  return {
    prompt: `${text} What is the most ${s.name} that can dissolve in 100 g of water at ${TEMPS[i]} °C?`,
    parts: [numPart(s.g[i], { suffix: 'g' })],
    hints: ['Find the temperature in the table and read the mass beside it.'],
    solution: [`At ${TEMPS[i]} °C, ${s.g[i]} g of ${s.name} dissolves in 100 g of water.`],
  };
}

function solubilityScale(rng: Rng): GenOutput {
  const { s, i, text } = solubilityTable(rng);
  const water = rng.pick([50, 200, 300, 25]);
  const ans = (s.g[i] * water) / 100;
  return {
    prompt: `${text} What is the most ${s.name} that can dissolve in ${water} g of water at ${TEMPS[i]} °C?`,
    parts: [numPart(ans, { suffix: 'g' })],
    hints: ['The table is for 100 g of water. Scale it to the mass of water you have.'],
    solution: [`$${s.g[i]} \\times \\dfrac{${water}}{100} = ${num(ans)}\\ \\text{g}$`],
  };
}

function solubilityLeftOver(rng: Rng): GenOutput {
  const { s, i, text } = solubilityTable(rng);
  const add = s.g[i] + rng.int(3, 30);
  if (rng.chance(0.5)) {
    return {
      prompt: `${text} ${rng.pick(NAMES)} stirs ${q(add, 'g')} of ${s.name} into 100 g of water at ${TEMPS[i]} °C. What mass stays undissolved at the bottom?`,
      parts: [numPart(add - s.g[i], { suffix: 'g' })],
      hints: ['Only the mass in the table can dissolve. The rest stays as solid.'],
      solution: [`$${add} - ${s.g[i]} = ${add - s.g[i]}\\ \\text{g}$ stays undissolved.`],
    };
  }
  const j = rng.int(1, 4);
  return {
    prompt: `${text} A saturated solution of ${s.name} in 100 g of water at ${TEMPS[j]} °C is cooled to ${TEMPS[0]} °C. What mass of crystals comes out of the solution?`,
    parts: [numPart(s.g[j] - s.g[0], { suffix: 'g' })],
    hints: ['A saturated solution holds the most it can. When it cools, it can hold less, and the extra comes out as crystals.'],
    solution: [`$${s.g[j]} - ${s.g[0]} = ${s.g[j] - s.g[0]}\\ \\text{g}$ of crystals.`],
  };
}

// ---------------------------------------------------------------------------- 3.3 saturation

const SAT_EASY: Q[] = [
  { q: 'What is a saturated solution?', a: 'A solution that cannot dissolve any more solute at that temperature', w: ['A solution that has no solute in it at all', 'A solution that has been heated to boiling', 'A solution in which the solute is insoluble'], why: 'A saturated solution holds as much solute as it can at that temperature; extra solute stays undissolved.' },
  { q: 'What is an unsaturated solution?', a: 'A solution that could still dissolve more solute', w: ['A solution that cannot dissolve any more solute', 'A solution that contains only pure water', 'A solution with solid settled at the bottom'], why: 'If more solute still dissolves when it is added, the solution was unsaturated.' },
  { q: 'For most solids, what happens to solubility as the water gets warmer?', a: 'It increases: more solid can dissolve', w: ['It decreases: less solid can dissolve', 'It stays exactly the same', 'It drops to zero'], why: 'Most solids dissolve better in warmer water, which is why sugar dissolves so well in hot tea.' },
];

const SAT_MEDIUM: Q[] = [
  { q: 'You keep stirring salt into a glass of water. Some salt stays at the bottom however long you stir. What does this tell you?', a: 'The solution is saturated', w: ['The solution is unsaturated', 'The salt is insoluble', 'The water has evaporated'], why: 'Undissolved solute after long stirring means no more can dissolve: the solution is saturated.' },
  { q: 'A spatula of sugar is added to a sugar solution and dissolves completely. Was the solution saturated before?', a: 'No, it was unsaturated', w: ['Yes, it was saturated', 'It is impossible to tell', 'Yes, because sugar always dissolves'], why: 'If more solute dissolves, the solution could still hold more, so it was unsaturated.' },
  { q: 'How could you make more of a solid dissolve in a saturated solution?', a: 'Heat the solution (for most solids)', w: ['Cool the solution in a freezer', 'Stir it more slowly than before', 'Let it stand still for a while'], why: 'For most solids solubility rises with temperature, so a warmer solution can hold more.' },
];

function satHard(rng: Rng): GenOutput {
  const s = rng.pick(SOLUBILITY);
  const i = rng.int(0, 4);
  const add = Math.max(1, s.g[i] + rng.pick([-1, 1]) * rng.int(2, 15));
  const sat = add >= s.g[i];
  return {
    prompt: `At ${TEMPS[i]} °C, ${s.g[i]} g of ${s.name} dissolves in 100 g of water. ${q(add, 'g')} of ${s.name} is stirred into 100 g of water at ${TEMPS[i]} °C. Is the solution that forms saturated or unsaturated?`,
    parts: [part(fixedChoice(['Saturated', 'Unsaturated'], sat ? 0 : 1))],
    hints: ['Compare the mass added with the most that can dissolve.'],
    solution: [sat ? `${add} g is more than the ${s.g[i]} g that can dissolve, so the solution is saturated and ${add - s.g[i]} g stays undissolved.` : `${add} g is less than the ${s.g[i]} g that can dissolve, so all of it dissolves and the solution is unsaturated.`],
  };
}

// ---------------------------------------------------------------------------- 3.4 rate of dissolving

const RATE_EASY: Q[] = [
  { q: 'Which of these makes a sugar cube dissolve faster in water?', a: 'Stirring the water', w: ['Using colder water', 'Leaving the water still', 'Using a bigger lump of sugar'], why: 'Stirring brings fresh water to the sugar, so it dissolves faster.' },
  { q: 'Which dissolves faster in the same water: a sugar cube or the same mass of granulated sugar?', a: 'The granulated sugar', w: ['The sugar cube', 'They dissolve at the same speed', 'Neither will dissolve'], why: 'Small grains have more surface touching the water, so they dissolve faster.' },
  { q: 'In which will a spoonful of sugar dissolve fastest?', a: 'Hot water, stirred', w: ['Cold water, not stirred', 'Cold water, stirred', 'Hot water, not stirred'], why: 'Heat and stirring both speed up dissolving, so hot stirred water is fastest.' },
];

const RATE_MEDIUM: Q[] = [
  { q: 'Why does sugar dissolve faster in hot water than in cold water?', a: 'The water particles move faster and hit the sugar more often and harder', w: ['Hot water particles are bigger and push the sugar apart', 'Sugar particles melt in hot water', 'Hot water has fewer particles in the way'], why: 'In hot water the particles move faster, so they pull sugar particles away more quickly.' },
  { q: 'Why does crushing a solid make it dissolve faster?', a: 'More of its surface is in contact with the solvent', w: ['Crushing makes each of its particles smaller', 'Crushing makes the solid more soluble overall', 'Crushing warms the solid until it melts'], why: 'Crushing gives more surface area, so more solute particles touch the solvent at once.' },
  { q: 'Does stirring change how much solute can dissolve in total?', a: 'No, it only changes how fast it dissolves', w: ['Yes, it doubles the amount that can dissolve', 'Yes, it lets an insoluble solid dissolve', 'No, because stirring stops dissolving'], why: 'Stirring speeds dissolving up, but the most that can dissolve depends on the temperature, not on stirring.' },
];

function rateResults(rng: Rng): GenOutput {
  const factor = rng.pick([
    { name: 'temperature of the water', values: ['20 °C', '40 °C', '60 °C'], trend: 'The warmer the water, the faster the sugar dissolved.' },
    { name: 'size of the sugar pieces', values: ['a lump', 'coarse grains', 'fine powder'], trend: 'The smaller the pieces, the faster the sugar dissolved.' },
    { name: 'number of stirs each minute', values: ['0', '10', '30'], trend: 'The more the water was stirred, the faster the sugar dissolved.' },
  ]);
  const times = [rng.int(150, 240), rng.int(80, 140), rng.int(25, 70)];
  const results = factor.values.map((v, i) => `${v}: ${times[i]} s`).join('; ');
  return {
    prompt: `${rng.pick(NAMES)} changed the ${factor.name} and timed how long 5 g of sugar took to dissolve. Results: ${results}. What is the best conclusion?`,
    parts: [part(mc(rng, factor.trend, [factor.trend.replace('faster', 'slower'), 'The sugar dissolved at the same speed every time.', 'The results show that sugar cannot dissolve in water.']))],
    hints: ['A shorter time means faster dissolving.', 'Look at how the time changes as the factor changes.'],
    solution: [`The time fell from ${times[0]} s to ${times[2]} s. ${factor.trend}`],
  };
}

// ---------------------------------------------------------------------------- 3.4 fair tests

const TESTS: Array<{ text: string; indep: string; dep: string; controls: string[]; other: string[] }> = [
  { text: 'tests whether the temperature of water changes how fast salt dissolves', indep: 'The temperature of the water', dep: 'The time the salt takes to dissolve', controls: ['The mass of salt', 'The volume of water', 'How much the water is stirred'], other: ['The colour of the beaker'] },
  { text: 'tests whether the size of sugar pieces changes how fast they dissolve', indep: 'The size of the sugar pieces', dep: 'The time the sugar takes to dissolve', controls: ['The mass of sugar', 'The temperature of the water', 'The volume of water'], other: ['The name of the person timing'] },
  { text: 'tests whether stirring changes how fast a coffee powder dissolves', indep: 'How much the water is stirred', dep: 'The time the coffee takes to dissolve', controls: ['The mass of coffee', 'The temperature of the water', 'The volume of water'], other: ['The day of the week'] },
  { text: 'tests which of three liquids dissolves the most sugar', indep: 'The kind of liquid', dep: 'The mass of sugar that dissolves', controls: ['The volume of liquid', 'The temperature of the liquid', 'How long it is stirred'], other: ['The shape of the spoon handle'] },
];

function fairEasy(rng: Rng): GenOutput {
  const t = rng.pick(TESTS);
  return {
    prompt: `${rng.pick(NAMES)} ${t.text}. What is the independent variable (the one that is changed on purpose)?`,
    parts: [part(mc(rng, t.indep, [t.dep, ...rng.sample(t.controls, 2)]))],
    hints: ['The independent variable is the one you choose to change.', 'The dependent variable is the one you measure.'],
    solution: [`${t.indep} is changed on purpose, so it is the independent variable.`],
  };
}

function fairMedium(rng: Rng): GenOutput {
  const t = rng.pick(TESTS);
  return {
    prompt: `${rng.pick(NAMES)} ${t.text}. What is the dependent variable (the one that is measured)?`,
    parts: [part(mc(rng, t.dep, [t.indep, ...rng.sample(t.controls, 2)]))],
    hints: ['The dependent variable is the result you measure.'],
    solution: [`${t.dep} is what is measured, so it is the dependent variable.`],
  };
}

function fairHard(rng: Rng): GenOutput {
  const t = rng.pick(TESTS);
  return fromBank([{ q: `${rng.pick(NAMES)} ${t.text}. To make it a fair test, which variables must be kept the same (controlled)?`, opts: [...t.controls.map((c) => [c, true] as [string, boolean]), [t.indep, false], [t.dep, false], ...t.other.map((o) => [o, false] as [string, boolean])], why: `In a fair test only the independent variable (${t.indep.toLowerCase()}) changes, and everything that could affect the result is kept the same. ${t.other[0]} cannot affect the result.` }], ['Only one thing is changed on purpose; everything that could affect the result is kept the same.'])(rng);
}

export const MIXTURE_SKILLS: SkillDef[] = [
  skill({ id: 'c7-pure-mixture', name: 'Pure substances and mixtures', description: 'Tell a pure substance from a mixture, and use melting and boiling points to test purity.', outcomes: ['7-C1'], lessonId: L(1), format: 'mc', gen: bank([pureOrMix, PURE_MEDIUM, either(meltingTest, pureOrMix)], ['A pure substance is only one substance. A mixture has two or more substances not joined together.']) }),
  skill({ id: 'c7-mixture-types', name: 'Kinds of mixture', description: 'Classify mixtures as mechanical mixtures, suspensions, colloids or solutions.', outcomes: ['7-C1'], lessonId: L(1), format: 'mc', gen: bank([kindOf, KIND_MEDIUM, KIND_HARD], ['Can you see the parts? Does it settle when left to stand? Is it clear or cloudy?']) }),
  skill({ id: 'c7-solution-parts', name: 'Solutes, solvents and solutions', description: 'Name the solute and solvent of a solution, and use mass of solution = mass of solute + mass of solvent.', outcomes: ['7-C1'], lessonId: L(2), gen: bank([soluteSolvent, solutionMass, either(solutionMass, fromBank(DISSOLVE_HARD, ['Dissolving spreads the solute out; it does not destroy it.']))], ['The solute dissolves; the solvent does the dissolving.', 'Mass of solution = mass of solute + mass of solvent.']) }),
  skill({ id: 'c7-concentration', name: 'Concentration', description: 'Calculate a concentration in grams per litre, find the mass of solute needed, and compare concentrations.', outcomes: ['7-C1'], lessonId: L(2), gen: bank([concEasy, concMedium, concHard], CONC_HINTS) }),
  skill({ id: 'c7-solubility', name: 'Solubility tables', description: 'Read a solubility table, scale it to other masses of water, and find the solid left undissolved or crystallized.', outcomes: ['7-C1'], lessonId: L(3), gen: bank([solubilityRead, solubilityScale, solubilityLeftOver], ['The table gives the mass that dissolves in 100 g of water at each temperature.']) }),
  skill({ id: 'c7-saturation', name: 'Saturated and unsaturated solutions', description: 'Tell saturated from unsaturated solutions, and how temperature changes how much dissolves.', outcomes: ['7-C1'], lessonId: L(3), format: 'mc', gen: bank([SAT_EASY, SAT_MEDIUM, satHard], ['A saturated solution cannot dissolve any more solute at that temperature.']) }),
  skill({ id: 'c7-dissolving-rate', name: 'How fast things dissolve', description: 'Explain how stirring, temperature and particle size change how fast a solute dissolves, and draw conclusions from results.', outcomes: ['7-C1'], lessonId: L(4), format: 'mc', gen: bank([RATE_EASY, RATE_MEDIUM, rateResults], ['Stirring, heating and crushing all make a solid dissolve faster.']) }),
  skill({ id: 'c7-fair-test', name: 'Fair tests and variables', description: 'Name the independent, dependent and controlled variables of a fair test.', outcomes: ['7-C1'], lessonId: L(4), format: 'mc', gen: bank([fairEasy, fairMedium, fairHard], ['The independent variable is changed; the dependent variable is measured; controlled variables are kept the same.']) }),
];
