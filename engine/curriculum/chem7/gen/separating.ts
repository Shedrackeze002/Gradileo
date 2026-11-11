/**
 * Grade 7 Chemistry, Unit 4: Separating Mixtures (7-C2). Sieving, magnets and filtering,
 * evaporation and distillation, paper chromatography, and choosing a method.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { andList, bank, either, fromBank, NAMES, num, q, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `c7-4-${n}`;

const METHODS = ['Sieving', 'Using a magnet', 'Filtration', 'Evaporation', 'Distillation', 'Chromatography'];

// ---------------------------------------------------------------------------- 4.1 sieving, magnets

const SIMPLE: Array<{ mix: string; method: 'Sieving' | 'Using a magnet' | 'Picking out by hand'; why: string }> = [
  { mix: 'iron filings mixed with sand', method: 'Using a magnet', why: 'Iron is magnetic and sand is not, so a magnet pulls the iron out.' },
  { mix: 'rice mixed with flour', method: 'Sieving', why: 'The flour grains are small enough to fall through the sieve; the rice grains are not.' },
  { mix: 'gravel mixed with fine sand', method: 'Sieving', why: 'The sand falls through the holes of the sieve and the gravel stays behind.' },
  { mix: 'steel paper clips mixed with plastic beads', method: 'Using a magnet', why: 'Steel is magnetic and plastic is not.' },
  { mix: 'a few large stones in a bucket of soil', method: 'Sieving', why: 'The soil passes through the sieve and the stones are caught.' },
  { mix: 'iron nails mixed with aluminium nails', method: 'Using a magnet', why: 'Iron is magnetic, aluminium is not.' },
  { mix: 'a handful of red and green marbles', method: 'Picking out by hand', why: 'The pieces are large and easy to tell apart by colour, so they can be picked out by hand.' },
];
const SIMPLE_METHODS = ['Sieving', 'Using a magnet', 'Picking out by hand', 'Filtration'];

function simpleMethod(rng: Rng): GenOutput {
  const s = rng.pick(SIMPLE);
  return {
    prompt: `Which is the best way to separate ${s.mix}?`,
    parts: [part(fixedChoice(SIMPLE_METHODS, SIMPLE_METHODS.indexOf(s.method)))],
    hints: ['Look for a property that is different for the two parts: size, or whether it is magnetic.'],
    solution: [s.why],
  };
}

const SIMPLE_MEDIUM: Q[] = [
  { q: 'Which property of the parts of a mixture does sieving use?', a: 'The size of the pieces', w: ['Whether they are magnetic', 'Whether they dissolve', 'Their boiling points'], why: 'A sieve lets small pieces through and holds back big ones.' },
  { q: 'Which property does magnetic separation use?', a: 'Whether a substance is pulled by a magnet', w: ['The size of the pieces', 'The colour of the pieces', 'Whether a substance dissolves in water'], why: 'Only magnetic substances, such as iron, nickel and steel, are pulled out by a magnet.' },
  { q: 'Why can a magnet NOT separate copper from sand?', a: 'Neither copper nor sand is magnetic', w: ['Copper is too heavy for the magnet', 'Sand is pulled by the magnet as well as copper', 'Magnets only work in water'], why: 'Copper is a metal but it is not magnetic, so the magnet pulls neither part.' },
  { q: 'Waste at a recycling plant passes under a strong magnet on a conveyor belt. What does the magnet pick out?', a: 'Steel cans', w: ['Aluminium cans', 'Glass bottles', 'Plastic bottles'], why: 'Steel contains iron, which is magnetic. Aluminium, glass and plastic are not.' },
];

const SIMPLE_HARD: Select[] = [
  { q: 'Which of these mixtures could be separated with a magnet?', opts: [['Iron filings and sulfur powder', true], ['Steel pins and sawdust', true], ['Nickel coins and plastic counters', true], ['Salt and sand', false], ['Copper wire and sand', false]], why: 'Iron, steel and nickel are magnetic. Salt, sand, copper and plastic are not, so a magnet cannot separate those mixtures.' },
  { q: 'Which of these mixtures could be separated by sieving?', opts: [['Peas and flour', true], ['Pebbles and sand', true], ['Sugar dissolved in water', false], ['Salt and sugar crystals of the same size', false], ['Beads and fine sand', true]], why: 'Sieving works only when the pieces are different sizes. Dissolved sugar passes straight through, and grains of the same size cannot be sieved apart.' },
];

// ---------------------------------------------------------------------------- 4.1 filtration

const FILTER_EASY: Q[] = [
  { q: 'Muddy water is poured through filter paper. What is the liquid that passes through called?', a: 'The filtrate', w: ['The residue', 'The solute', 'The distillate'], why: 'The filtrate is what passes through the filter. The solid left on the paper is the residue.' },
  { q: 'Sand and water are poured through filter paper. What is the sand left on the paper called?', a: 'The residue', w: ['The filtrate', 'The solvent', 'The solution'], why: 'The residue is the solid trapped by the filter paper.' },
  { q: 'Why does filtration separate sand from water?', a: 'The sand grains are too big to pass through the tiny holes in the filter paper', w: ['The sand dissolves in the water and passes through', 'The water is too big to pass through the paper', 'The filter paper is magnetic and holds the sand'], why: 'Water particles are tiny and pass through the paper; the much larger sand grains are caught.' },
];

const FILTER_MEDIUM: Q[] = [
  { q: 'Can salt be separated from salt water by filtration?', a: 'No, the dissolved salt passes through the filter paper with the water', w: ['Yes, the salt stays on the filter paper', 'Yes, but only if the water is cold', 'No, because salt water is a pure substance'], why: 'Dissolved particles are as small as water particles, so they pass through the filter.' },
  { q: 'Which mixture can be separated by filtration?', a: 'Chalk powder in water', w: ['Sugar dissolved in water', 'Salt dissolved in water', 'Two liquids that mix completely'], why: 'Chalk is insoluble, so its grains are caught by the filter. Dissolved sugar and salt pass through.' },
  { q: 'Before filtering, muddy water is left to stand, and the clear water at the top is poured off. What is this called?', a: 'Decanting', w: ['Distilling', 'Evaporating', 'Condensing'], why: 'Letting the solid settle and pouring off the liquid is decanting.' },
];

function filterMass(rng: Rng): GenOutput {
  const sand = rng.int(10, 60);
  const salt = rng.int(5, 40);
  return {
    prompt: `${rng.pick(NAMES)} has ${q(sand + salt, 'g')} of a mixture of sand and salt. The mixture is stirred into water, filtered, and the residue is dried. The dry residue has a mass of ${q(sand, 'g')}. What mass of salt was in the mixture?`,
    parts: [numPart(salt, { suffix: 'g' })],
    hints: ['Which part dissolves, and which part stays on the filter paper?', 'Mass of salt = total mass − mass of sand.'],
    solution: ['The salt dissolves and passes through; the sand is the residue.', `$${sand + salt} - ${sand} = ${salt}\\ \\text{g}$ of salt.`],
  };
}

// ---------------------------------------------------------------------------- 4.2 evaporation

const EVAP_EASY: Q[] = [
  { q: 'How can you get salt back from salt water?', a: 'Evaporate the water by heating it, leaving the salt behind', w: ['Pour the salt water through filter paper', 'Pull the salt out with a magnet', 'Pass the salt water through a sieve'], why: 'Heating evaporates the water; the salt does not evaporate, so it is left behind.' },
  { q: 'Why is the salt left behind when salt water is evaporated?', a: 'Salt has a much higher boiling point than water, so it does not turn into a gas', w: ['Salt is too heavy to leave the dish', 'Salt is magnetic and sticks to the dish', 'Salt turns into a liquid and stays put'], why: 'Water boils at 100 °C; salt would need over 1400 °C, so only the water leaves.' },
  { q: 'Where is salt made from sea water in hot, sunny countries?', a: 'In shallow ponds where the Sun evaporates the water', w: ['In giant sieves on the beach', 'In freezers that turn the salt solid', 'In filters made of sand'], why: 'The Sun’s heat slowly evaporates the water from shallow salt pans, leaving the salt.' },
];

const EVAP_MEDIUM: Q[] = [
  { q: 'Why is it better to let a copper sulfate solution evaporate slowly, rather than boil it dry?', a: 'Slow evaporation lets large crystals grow, and boiling can make the solid spit out or break down', w: ['Boiling makes the copper sulfate turn into water', 'Slow evaporation makes more copper sulfate appear', 'Boiling makes the crystals grow much larger'], why: 'Crystals grow large when the solvent leaves slowly. Fierce boiling can make the solid spit out of the dish or decompose.' },
  { q: 'What is crystallization?', a: 'Forming crystals of a solute as the solvent evaporates or the solution cools', w: ['Breaking crystals into a fine powder', 'Dissolving crystals in hot water', 'Turning a gas straight into a liquid'], why: 'As the solvent leaves, the solution can no longer hold all the solute, and it comes out as crystals.' },
  { q: 'When salt water is evaporated in a dish, what happens to the water?', a: 'It becomes water vapour and escapes into the air', w: ['It stays in the dish with the salt', 'It turns into salt', 'It soaks into the dish'], why: 'Evaporation turns the liquid water into a gas, which is lost to the air. Distillation is needed to collect it.' },
];

function evapMass(rng: Rng): GenOutput {
  const per = rng.int(2, 9) * 5;
  const vol = rng.pick([100, 200, 250, 400, 500]);
  const salt = (per * vol) / 1000;
  return {
    prompt: `A solution contains ${q(per, 'g')} of salt in every litre. ${rng.pick(NAMES)} evaporates ${q(vol, 'mL')} of it to dryness. What mass of salt is left?`,
    parts: [numPart(salt, { suffix: 'g' })],
    hints: ['1 litre is 1000 mL.', 'Find what fraction of a litre is evaporated.'],
    solution: [`$${vol}\\ \\text{mL} = ${num(vol / 1000, 3)}\\ \\text{L}$`, `$${per} \\times ${num(vol / 1000, 3)} = ${num(salt)}\\ \\text{g}$`],
  };
}

// ---------------------------------------------------------------------------- 4.2 distillation

const DISTIL_EASY: Q[] = [
  { q: 'What does distillation of salt water give you?', a: 'Pure water', w: ['Pure salt only', 'Saltier water', 'Sand'], why: 'Distillation boils off the water and condenses it again, so the collected liquid is pure water.' },
  { q: 'What are the two changes of state in distillation, in order?', a: 'Boiling (evaporation), then condensation', w: ['Melting, then freezing', 'Condensation, then boiling', 'Freezing, then melting'], why: 'The liquid boils to a vapour, then the vapour is cooled and condenses back to a liquid.' },
  { q: 'In distillation, what does the condenser do?', a: 'Cools the vapour so it turns back into a liquid', w: ['Heats the mixture until it boils', 'Filters out any solid bits', 'Stirs the mixture'], why: 'Cold water flows around the condenser, cooling the hot vapour inside it so it condenses.' },
];

const DISTIL_MEDIUM: Q[] = [
  { q: 'What is the pure liquid collected at the end of distillation called?', a: 'The distillate', w: ['The residue', 'The filtrate', 'The solute'], why: 'The liquid collected from the condenser is the distillate.' },
  { q: 'How is distillation different from evaporation?', a: 'Distillation collects the liquid; evaporation lets it escape and keeps only the solid', w: ['Distillation keeps only the solid and loses the liquid', 'They are the same process with different names', 'Evaporation needs a condenser and distillation does not'], why: 'Both boil off the solvent, but only distillation cools the vapour and collects it.' },
  { q: 'Why might people on a ship far from land use distillation?', a: 'To make drinking water from sea water', w: ['To make sea water saltier', 'To get oil from sea water', 'To make the ship lighter'], why: 'Distilling sea water gives pure water that is safe to drink.' },
];

const DISTIL_HARD: Select[] = [
  { q: 'Salty water is distilled. Which statements are true?', opts: [['The water boils and becomes steam.', true], ['The steam condenses in the condenser.', true], ['The salt stays in the flask.', true], ['The distillate is salty.', false], ['The salt condenses in the condenser.', false]], why: 'Only the water boils at 100 °C. It condenses into pure water; the salt stays behind in the flask.' },
  { q: 'Which of these can distillation be used for?', opts: [['Getting pure water from sea water', true], ['Getting pure water from ink', true], ['Separating alcohol from water, which boil at different temperatures', true], ['Separating iron filings from sand', false], ['Separating sand from water quickly', false]], why: 'Distillation separates a liquid from what is dissolved in it, or liquids with different boiling points. It is not used for solids such as iron and sand.' },
];

// ---------------------------------------------------------------------------- 4.3 chromatography

const COLOURS = ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'pink'];

function chromaCount(rng: Rng): GenOutput {
  const n = rng.int(1, 4);
  const cols = rng.sample(COLOURS, n);
  const ink = rng.pick(['black', 'brown', 'dark green', 'purple']);
  return {
    prompt: `A dot of ${ink} ink is put on a strip of paper above a little water. As the water rises up the paper, the ink separates into ${n === 1 ? 'one spot' : `${n} spots`}: ${andList(cols)}. How many dyes does the ink contain?`,
    parts: [numPart(n)],
    hints: ['Each spot on a chromatogram is a different dye.'],
    solution: [`There ${n === 1 ? 'is one spot, so the ink is a single dye' : `are ${n} spots, so the ink is a mixture of ${n} dyes`}.`],
  };
}

function chromaMatch(rng: Rng): GenOutput {
  const pens = ['Pen A', 'Pen B', 'Pen C', 'Pen D'];
  const mixes = pens.map(() => rng.sample(COLOURS, rng.int(2, 3)).sort());
  while (new Set(mixes.map((m) => m.join())).size < 4) for (let i = 0; i < 4; i++) mixes[i] = rng.sample(COLOURS, rng.int(2, 3)).sort();
  const k = rng.int(0, 3);
  const listing = pens.map((p, i) => `${p}: ${andList(mixes[i])}`).join('; ');
  return {
    prompt: `Ink from a note left at a crime scene separates into ${andList(mixes[k])} spots. Inks from four suspects’ pens give these spots: ${listing}. Which pen wrote the note?`,
    parts: [part(fixedChoice(pens, k))],
    hints: ['The matching ink has exactly the same spots, with nothing missing and nothing extra.'],
    solution: [`Only ${pens[k]} gives exactly ${andList(mixes[k])}.`],
  };
}

const CHROMA_HARD: Select[] = [
  { q: 'Which statements about paper chromatography are true?', opts: [['It separates the dyes in a mixture such as ink.', true], ['A pure dye gives only one spot.', true], ['The start line should be drawn in pencil.', true], ['The dot of ink should be below the level of the solvent.', false], ['Every ink gives exactly three spots.', false]], why: 'Pencil does not dissolve and run. The ink dot must sit above the solvent, or it would wash off into the solvent. Different inks give different numbers of spots.' },
  { q: 'Why is the start line on a chromatogram drawn in pencil, not ink?', opts: [['Pencil does not dissolve in the solvent.', true], ['Ink from a pen would separate and add extra spots.', true], ['Pencil makes the dyes move faster.', false], ['Pencil lines are easier to rub out before the test.', false]], why: 'Pencil (graphite) is insoluble, so the line stays put. A pen line would run and spoil the results.' },
];

// ---------------------------------------------------------------------------- 4.3 choosing a method

const CHOICES_MIX: Array<{ mix: string; method: string; why: string }> = [
  { mix: 'sand from water', method: 'Filtration', why: 'Sand is insoluble, so the filter paper catches it.' },
  { mix: 'salt from salt water', method: 'Evaporation', why: 'The water evaporates and leaves the dissolved salt behind.' },
  { mix: 'pure water from sea water', method: 'Distillation', why: 'Distillation boils off the water and condenses it, leaving the salts behind.' },
  { mix: 'the dyes in a felt-tip pen ink', method: 'Chromatography', why: 'Chromatography separates dyes that travel up the paper at different speeds.' },
  { mix: 'iron filings from sulfur powder', method: 'Using a magnet', why: 'Iron is magnetic; sulfur is not.' },
  { mix: 'peas from flour', method: 'Sieving', why: 'The flour falls through the sieve and the peas are caught.' },
  { mix: 'copper sulfate crystals from copper sulfate solution', method: 'Evaporation', why: 'Evaporating the water leaves the copper sulfate as crystals.' },
  { mix: 'chalk from water', method: 'Filtration', why: 'Chalk is insoluble, so the filter paper catches it.' },
  { mix: 'pure water from muddy, salty water, after the mud is filtered off', method: 'Distillation', why: 'Only distillation collects the water and leaves the dissolved salt behind.' },
];

function chooseMethod(rng: Rng): GenOutput {
  const c = rng.pick(CHOICES_MIX);
  return {
    prompt: `Which method is best for separating ${c.mix}?`,
    parts: [part(mc(rng, c.method, rng.sample(METHODS.filter((m) => m !== c.method), 3)))],
    hints: ['Is the solid dissolved or not? Do you want to keep the liquid or the solid?'],
    solution: [c.why, `Answer: ${c.method}`],
  };
}

const CHOOSE_MEDIUM: Q[] = [
  { q: 'Why can filtration NOT get pure water from sea water?', a: 'The salts are dissolved, so they pass through the filter paper with the water', w: ['Sea water is too thick to pass through filter paper', 'The water stays behind on the filter paper', 'Filtration only works with hot liquids'], why: 'Filtration only removes undissolved solids.' },
  { q: 'You want to keep both the salt and the water from salt water. Which method should you use?', a: 'Distillation', w: ['Evaporation', 'Filtration', 'Sieving'], why: 'Evaporation loses the water to the air. Distillation keeps the salt in the flask and collects the water.' },
  { q: 'Which property lets chromatography separate dyes?', a: 'Different dyes travel up the paper at different speeds', w: ['Different dyes have different magnetic strengths', 'Different dyes are different sizes of crystal', 'Different dyes boil at different temperatures on the paper'], why: 'Each dye dissolves in the solvent and sticks to the paper to a different degree, so each travels a different distance.' },
];

const STEPS: Array<{ mix: string; answer: string; wrong: string[] }> = [
  { mix: 'salt and sand, to get dry salt', answer: 'Add water and stir, filter, then evaporate the filtrate', wrong: ['Filter, then add water and stir, then evaporate the residue', 'Add water and stir, evaporate, then filter the solid that is left', 'Use a magnet, then sieve the mixture'] },
  { mix: 'iron filings, sand and salt, to get all three', answer: 'Use a magnet, then add water and filter, then evaporate the filtrate', wrong: ['Add water and evaporate, then use a magnet', 'Filter, then use a magnet, then add water', 'Sieve, then distil the mixture'] },
  { mix: 'sugar and chalk, to get dry sugar', answer: 'Add water and stir, filter, then evaporate the filtrate', wrong: ['Use a magnet, then filter the mixture', 'Add water, evaporate, then filter', 'Sieve, then distil the mixture'] },
];

function steps(rng: Rng): GenOutput {
  const s = rng.pick(STEPS);
  return {
    prompt: `Which steps, in order, separate a mixture of ${s.mix}?`,
    parts: [part(mc(rng, s.answer, s.wrong))],
    hints: ['Take out anything magnetic first. Dissolve what dissolves, filter off what does not, then evaporate to get the dissolved solid back.'],
    solution: [`${s.answer}.`],
  };
}

export const SEPARATING_SKILLS: SkillDef[] = [
  skill({ id: 'c7-simple-separation', name: 'Sieving and magnets', description: 'Separate solid mixtures by sieving, with a magnet or by hand, and explain the property each method uses.', outcomes: ['7-C2'], lessonId: L(1), format: 'mc', gen: bank([simpleMethod, SIMPLE_MEDIUM, SIMPLE_HARD], ['Sieving uses size; a magnet uses whether a substance is magnetic.']) }),
  skill({ id: 'c7-filtration', name: 'Filtration', description: 'Separate an insoluble solid from a liquid by filtration, name the filtrate and residue, and find masses separated.', outcomes: ['7-C2'], lessonId: L(1), gen: bank([FILTER_EASY, FILTER_MEDIUM, either(filterMass, fromBank(FILTER_MEDIUM, ['Only undissolved solids are caught by a filter.']))], ['The filtrate passes through the filter; the residue stays on it.', 'Only undissolved solids are caught by a filter.']) }),
  skill({ id: 'c7-evaporation', name: 'Evaporation and crystallization', description: 'Get a dissolved solid back by evaporation, explain crystallization, and find the mass of solid left.', outcomes: ['7-C2'], lessonId: L(2), gen: bank([EVAP_EASY, EVAP_MEDIUM, evapMass], ['Evaporation removes the solvent and leaves the dissolved solid behind.']) }),
  skill({ id: 'c7-distillation', name: 'Distillation', description: 'Explain how distillation gets a pure liquid from a solution, and name the parts of the apparatus.', outcomes: ['7-C2'], lessonId: L(2), format: 'mc', gen: bank([DISTIL_EASY, DISTIL_MEDIUM, DISTIL_HARD], ['Distillation is boiling followed by condensation, and the liquid is collected.']) }),
  skill({ id: 'c7-chromatography', name: 'Chromatography', description: 'Read a chromatogram to count the dyes in an ink, match inks, and explain how the method is set up.', outcomes: ['7-C2'], lessonId: L(3), gen: bank([chromaCount, chromaMatch, CHROMA_HARD], ['Each spot is a different dye. Matching inks give exactly the same spots.']) }),
  skill({ id: 'c7-choose-method', name: 'Choosing a separation method', description: 'Choose the right method, or the right steps in order, to separate a mixture.', outcomes: ['7-C2'], lessonId: L(3), format: 'mc', gen: bank([chooseMethod, CHOOSE_MEDIUM, steps], ['Is the solid dissolved or not? Do you want to keep the liquid, the solid, or both?']) }),
];
