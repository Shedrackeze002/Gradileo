/**
 * Grade 9 Chemistry, Unit 4: Acids and Bases (9-D1, 9-D2). Properties of acids and bases,
 * indicators, the pH scale, neutralization and the salts it makes, and everyday uses.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { bank, either, fromBank, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `c9-4-${n}`;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------- 4.1 acids and bases

const AB_EASY: Q[] = [
  { q: 'Which of these is a property of acids?', a: 'They taste sour', w: ['They feel soapy', 'They turn red litmus blue', 'They have a pH above 7'], why: 'Acids taste sour (lemon juice, vinegar), turn blue litmus red and have a pH below 7. Never taste lab chemicals.' },
  { q: 'Which of these is a property of bases?', a: 'Many feel soapy or slippery', w: ['They taste sour', 'They turn blue litmus red', 'They have a pH below 7'], why: 'Bases feel slippery, taste bitter and turn red litmus blue.' },
  { q: 'What is an alkali?', a: 'A base that dissolves in water', w: ['Any acid', 'A neutral salt', 'A metal that floats'], why: 'Alkalis, such as sodium hydroxide, are soluble bases. Their solutions have a pH above 7.' },
  { q: 'Which ion do all acids release in water?', a: 'Hydrogen ions, $\\ce{H+}$', w: ['Hydroxide ions, $\\ce{OH-}$', 'Sodium ions, $\\ce{Na+}$', 'Oxide ions, $\\ce{O^2-}$'], why: 'Acids produce H⁺ ions in water; alkalis produce OH⁻ ions.' },
];

const AB_ITEMS: Array<{ name: string; kind: 'Acid' | 'Base' | 'Neutral' }> = [
  { name: 'lemon juice', kind: 'Acid' }, { name: 'vinegar', kind: 'Acid' }, { name: 'hydrochloric acid', kind: 'Acid' }, { name: 'cola', kind: 'Acid' }, { name: 'orange juice', kind: 'Acid' },
  { name: 'soap solution', kind: 'Base' }, { name: 'baking soda solution', kind: 'Base' }, { name: 'oven cleaner', kind: 'Base' }, { name: 'sodium hydroxide solution', kind: 'Base' }, { name: 'household ammonia', kind: 'Base' },
  { name: 'pure water', kind: 'Neutral' }, { name: 'salt solution', kind: 'Neutral' }, { name: 'sugar solution', kind: 'Neutral' },
];
const AB_CHOICES = ['Acid', 'Base', 'Neutral'];

function classifyEveryday(rng: Rng): GenOutput {
  const x = rng.pick(AB_ITEMS);
  return {
    prompt: `Is ${x.name} acidic, basic (alkaline) or neutral?`,
    parts: [part(fixedChoice(AB_CHOICES, AB_CHOICES.indexOf(x.kind)))],
    hints: ['Sour foods are acidic; cleaners and soaps are usually basic.'],
    solution: [`${cap(x.name)} is ${x.kind === 'Acid' ? 'acidic' : x.kind === 'Base' ? 'basic' : 'neutral'}.`, `Answer: ${x.kind}`],
  };
}

const AB_HARD: Select[] = [
  { q: 'Which statements are true?', opts: [['Acids turn blue litmus red.', true], ['Alkalis release hydroxide ions in water.', true], ['An alkali is a base that dissolves in water.', true], ['Bases taste sour.', false], ['Acids have a pH above 7.', false], ['All bases dissolve in water.', false]], why: 'Acids: sour, H⁺ ions, pH below 7. Bases: bitter and slippery; the soluble ones are alkalis, which release OH⁻ ions.' },
];

// ---------------------------------------------------------------------------- 4.1 indicators

const INDICATORS: Record<string, { acid: string; neutral: string; alkali: string }> = {
  'blue litmus': { acid: 'red', neutral: 'blue', alkali: 'blue' },
  'red litmus': { acid: 'red', neutral: 'red', alkali: 'blue' },
  phenolphthalein: { acid: 'colourless', neutral: 'colourless', alkali: 'pink' },
  'universal indicator': { acid: 'red', neutral: 'green', alkali: 'purple' },
};

function indicatorColour(rng: Rng): GenOutput {
  // Universal indicator is left out: its colour depends on how strong the acid or alkali is.
  const name = rng.pick(['blue litmus', 'red litmus', 'phenolphthalein']);
  const kind = rng.pick(['acid', 'alkali'] as const);
  const sol = kind === 'acid' ? rng.pick(['vinegar', 'lemon juice', 'dilute hydrochloric acid']) : rng.pick(['sodium hydroxide solution', 'soap solution', 'limewater']);
  const right = INDICATORS[name][kind];
  const wrong = ['red', 'blue', 'colourless', 'pink', 'green', 'yellow'].filter((c) => c !== right);
  const test = name.includes('litmus') ? `${cap(name)} paper is dipped into ${sol}` : `A few drops of phenolphthalein are added to ${sol}`;
  return {
    prompt: `${test}. What colour is the ${name.includes('litmus') ? 'paper' : 'indicator'}?`,
    parts: [part(mc(rng, cap(right), rng.sample(wrong, 3).map(cap)))],
    hints: ['Litmus: red in acid, blue in alkali. Phenolphthalein: colourless in acid, pink in alkali. Universal indicator: red in strong acid, green when neutral, purple in strong alkali.'],
    solution: [`${cap(sol)} is ${kind === 'acid' ? 'an acid' : 'an alkali'}, so ${name} is ${right}.`],
  };
}

const IND_EASY: Q[] = [
  { q: 'What is an indicator?', a: 'A substance that changes colour to show whether a solution is acidic or alkaline', w: ['A substance that neutralizes acids', 'A machine that measures mass', 'A type of acid'], why: 'Indicators such as litmus have different colours in acids and alkalis.' },
  { q: 'What colour does blue litmus paper turn in an acid?', a: 'Red', w: ['Blue', 'Green', 'It does not change'], why: 'Acids turn blue litmus red. Red litmus stays red.' },
  { q: 'What colour does red litmus paper turn in an alkali?', a: 'Blue', w: ['Red', 'Pink', 'It does not change'], why: 'Alkalis turn red litmus blue.' },
];

const IND_HARD: Q[] = [
  { q: 'A solution turns red litmus blue and phenolphthalein pink. What is it?', a: 'An alkali', w: ['An acid', 'Neutral', 'It cannot be told'], why: 'Both colour changes happen only in alkaline solutions.' },
  { q: 'Why is universal indicator more useful than litmus?', a: 'Its range of colours shows how strongly acidic or alkaline a solution is', w: ['It works only in acids', 'It is always colourless', 'It neutralizes the solution'], why: 'Litmus only says acid or alkali. Universal indicator matches a colour to a pH number.' },
  { q: 'A solution leaves blue litmus blue and red litmus red. What is it most likely to be?', a: 'Neutral', w: ['An acid', 'An alkali', 'A strong alkali'], why: 'No change to either colour means it is neither acidic nor alkaline.' },
];

// ---------------------------------------------------------------------------- 4.2 pH

const PH_CHOICES = ['Acidic', 'Neutral', 'Alkaline'];

function phClassify(rng: Rng): GenOutput {
  const ph = rng.int(0, 14);
  const kind = ph < 7 ? 'Acidic' : ph === 7 ? 'Neutral' : 'Alkaline';
  return {
    prompt: `A solution has a pH of ${ph}. Is it acidic, neutral or alkaline?`,
    parts: [part(fixedChoice(PH_CHOICES, PH_CHOICES.indexOf(kind)))],
    hints: ['Below 7: acidic. Exactly 7: neutral. Above 7: alkaline.'],
    solution: [`pH ${ph} is ${ph < 7 ? 'below' : ph === 7 ? 'exactly' : 'above'} 7, so the solution is ${kind.toLowerCase()}.`, `Answer: ${kind}`],
  };
}

const UNIVERSAL: Array<[number, string]> = [[1, 'red'], [3, 'orange'], [5, 'yellow'], [7, 'green'], [9, 'blue'], [11, 'dark blue'], [13, 'purple']];

function phFromColour(rng: Rng): GenOutput {
  const [ph, colour] = rng.pick(UNIVERSAL);
  const right = `About ${ph}`;
  const others = UNIVERSAL.filter(([p]) => p !== ph).map(([p]) => `About ${p}`);
  return {
    prompt: `Universal indicator turns ${colour} in a solution. Using the colour chart (red 1, orange 3, yellow 5, green 7, blue 9, dark blue 11, purple 13), what is its pH?`,
    parts: [part(mc(rng, right, rng.sample(others, 3)))],
    hints: ['Match the colour to the chart.'],
    solution: [`${cap(colour)} matches pH ${ph}, so the solution is ${ph < 7 ? 'acidic' : ph === 7 ? 'neutral' : 'alkaline'}.`],
  };
}

function phCompare(rng: Rng): GenOutput {
  const [a, b] = rng.sample([1, 2, 3, 4, 5, 6], 2).sort((x, y) => x - y);
  const factor = 10 ** (b - a);
  return {
    prompt: `Solution A has a pH of ${a} and solution B has a pH of ${b}. Each step of 1 on the pH scale is a tenfold change in acidity. How many times more acidic is A than B?`,
    parts: [numPart(factor)],
    hints: ['Find the difference in pH, then multiply 10 by itself that many times.'],
    solution: [`The difference is ${b} − ${a} = ${b - a}, so A is $10^{${b - a}} = ${factor.toLocaleString('en-US')}$ times more acidic.`],
  };
}

function strongest(rng: Rng): GenOutput {
  const acid = rng.chance(0.5);
  const phs = rng.sample(acid ? [1, 2, 3, 4, 5, 6] : [8, 9, 10, 11, 12, 13], 4);
  const right = acid ? Math.min(...phs) : Math.max(...phs);
  return {
    prompt: `Four solutions have pH ${phs.join(', ')}. Which is the most strongly ${acid ? 'acidic' : 'alkaline'}?`,
    parts: [part(fixedChoice(phs.map((p) => `pH ${p}`), phs.indexOf(right)))],
    hints: [acid ? 'The lower the pH, the more strongly acidic.' : 'The higher the pH, the more strongly alkaline.'],
    solution: [`pH ${right} is the ${acid ? 'lowest' : 'highest'}.`, `Answer: pH ${right}`],
  };
}

const PH_HARD: Select[] = [
  { q: 'Which statements about the pH scale are true?', opts: [['It usually runs from 0 to 14.', true], ['pH 7 is neutral.', true], ['A solution of pH 2 is more acidic than one of pH 4.', true], ['pH 12 is acidic.', false], ['A higher pH means more acidic.', false]], why: 'Low pH is acidic, 7 is neutral, high pH is alkaline, and each step is a tenfold change.' },
];

// ---------------------------------------------------------------------------- 4.3 neutralization

const ACIDS: Array<{ name: string; salt: string }> = [
  { name: 'hydrochloric acid', salt: 'chloride' },
  { name: 'sulfuric acid', salt: 'sulfate' },
  { name: 'nitric acid', salt: 'nitrate' },
];
const BASES: Array<{ name: string; metal: string }> = [
  { name: 'sodium hydroxide', metal: 'sodium' },
  { name: 'potassium hydroxide', metal: 'potassium' },
  { name: 'calcium hydroxide', metal: 'calcium' },
  { name: 'magnesium oxide', metal: 'magnesium' },
  { name: 'copper oxide', metal: 'copper' },
  { name: 'lithium hydroxide', metal: 'lithium' },
];

function saltName(rng: Rng, askEquation: boolean): GenOutput {
  const a = rng.pick(ACIDS);
  const b = rng.pick(BASES);
  const salt = `${b.metal} ${a.salt}`;
  const others = ACIDS.filter((x) => x !== a).map((x) => `${b.metal} ${x.salt}`);
  if (askEquation) {
    const right = `${a.name} + ${b.name} → ${salt} + water`;
    const wrong = [`${a.name} + ${b.name} → ${salt} + hydrogen`, `${a.name} + ${b.name} → ${others[0]} + water`, `${a.name} + ${b.name} → ${b.name} + water`];
    return {
      prompt: `Which is the word equation for the reaction of ${a.name} with ${b.name}?`,
      parts: [part(mc(rng, right, wrong))],
      hints: ['acid + base → salt + water.', 'The salt takes its first name from the metal and its second from the acid.'],
      solution: [`${cap(a.name)} gives a ${a.salt} and ${b.name} gives ${b.metal}, so: ${right}.`],
    };
  }
  return {
    prompt: `${cap(a.name)} is neutralized by ${b.name}. What salt is made?`,
    parts: [part(mc(rng, cap(salt), [...others, `${b.metal} hydroxide`].map(cap)))],
    hints: ['Hydrochloric acid makes chlorides, sulfuric acid makes sulfates, and nitric acid makes nitrates.'],
    solution: [`The metal, ${b.metal}, comes from the base, and ${a.name} gives a ${a.salt}: ${salt}.`],
  };
}

const NEUT_EASY: Q[] = [
  { q: 'What is neutralization?', a: 'The reaction of an acid with a base to make a salt and water', w: ['Mixing two acids together', 'Diluting an acid with water', 'An acid reacting with oxygen'], why: 'acid + base → salt + water. The H⁺ from the acid and the OH⁻ from the alkali make water.' },
  { q: 'What are the products when an acid reacts with an alkali?', a: 'A salt and water', w: ['A salt and hydrogen', 'Carbon dioxide only', 'Another acid'], why: 'Neutralization always makes a salt and water.' },
  { q: 'Which ions join to make water in neutralization?', a: '$\\ce{H+}$ and $\\ce{OH-}$', w: ['$\\ce{Na+}$ and $\\ce{Cl-}$', '$\\ce{H+}$ and $\\ce{Cl-}$', '$\\ce{O^2-}$ and $\\ce{Na+}$'], why: '$\\ce{H+ + OH- -> H2O}$' },
];

const USES_EASY: Q[] = [
  { q: 'A bee sting is acidic. What could you put on it to neutralize it?', a: 'Baking soda paste, a weak base', w: ['Vinegar', 'Lemon juice', 'More acid'], why: 'A weak base such as baking soda neutralizes the acid.' },
  { q: 'Indigestion is caused by too much stomach acid. How do antacid tablets help?', a: 'They contain a base that neutralizes the extra acid', w: ['They add more acid', 'They dissolve the stomach', 'They are acids that cancel each other'], why: 'Antacids contain bases such as magnesium hydroxide or calcium carbonate.' },
  { q: 'A farmer’s soil is too acidic for crops. What can the farmer add?', a: 'Lime (calcium hydroxide or calcium carbonate)', w: ['Vinegar', 'Sulfuric acid', 'Salt'], why: 'Lime is a base that neutralizes acidic soil.' },
];

const USES_MEDIUM: Q[] = [
  { q: 'Toothpaste is slightly alkaline. Why?', a: 'To neutralize acids made by bacteria in the mouth, which damage teeth', w: ['To make teeth taste sour', 'To dissolve tooth enamel', 'Because acids clean teeth best'], why: 'Bacteria feeding on sugar make acids that attack enamel; a mild base neutralizes them.' },
  { q: 'An acid is slowly added to an alkali containing universal indicator. What happens to the pH?', a: 'It falls towards 7, and below 7 if too much acid is added', w: ['It rises towards 14', 'It stays the same', 'It jumps straight to 0'], why: 'The acid neutralizes the alkali: the pH falls to 7 at neutral, then below if acid is left over.' },
  { q: 'Wasp stings are alkaline. Which household substance could neutralize one?', a: 'Vinegar, a weak acid', w: ['Baking soda', 'Soap', 'Oven cleaner'], why: 'An alkaline sting needs a weak acid, such as vinegar.' },
];

const USES_HARD: Select[] = [
  { q: 'Which are examples of neutralization in everyday life?', opts: [['Taking an antacid for indigestion', true], ['Adding lime to acidic soil', true], ['Treating an acidic bee sting with baking soda', true], ['Boiling water in a kettle', false], ['Dissolving sugar in tea', false]], why: 'Each true example uses a base to cancel out an acid. Boiling and dissolving are physical changes.' },
];

export const ACID_SKILLS: SkillDef[] = [
  skill({ id: 'c9-acid-base', name: 'Acids and bases', description: 'Describe the properties of acids, bases and alkalis, and classify everyday substances.', outcomes: ['9-D1'], lessonId: L(1), gen: bank([AB_EASY, classifyEveryday, AB_HARD], ['Acids: sour, pH below 7, H⁺ ions. Bases: bitter, slippery; alkalis release OH⁻ ions.']) }),
  skill({ id: 'c9-indicators', name: 'Indicators', description: 'Predict the colour of litmus, phenolphthalein and universal indicator in acids and alkalis.', outcomes: ['9-D1'], lessonId: L(1), format: 'mc', gen: bank([IND_EASY, indicatorColour, either(indicatorColour, fromBank(IND_HARD, ['Litmus: red in acid, blue in alkali.']))], ['Litmus: red in acid, blue in alkali. Phenolphthalein: pink in alkali.']) }),
  skill({ id: 'c9-ph-scale', name: 'The pH scale', description: 'Classify a solution from its pH, and read a pH from universal indicator.', outcomes: ['9-D1'], lessonId: L(2), gen: bank([phClassify, phFromColour, PH_HARD], ['Below 7: acidic. 7: neutral. Above 7: alkaline.']) }),
  skill({ id: 'c9-ph-compare', name: 'Comparing pH', description: 'Compare the strength of acids and alkalis by pH, including the tenfold change per pH unit.', outcomes: ['9-D1'], lessonId: L(2), gen: bank([strongest, strongest, phCompare], ['Lower pH: more acidic. Each step of 1 is a tenfold change.']) }),
  skill({ id: 'c9-neutralization', name: 'Neutralization and salts', description: 'Name the salt made when an acid neutralizes a base, and write the word equation.', outcomes: ['9-D2'], lessonId: L(3), format: 'mc', gen: bank([NEUT_EASY, (rng) => saltName(rng, false), (rng) => saltName(rng, true)], ['acid + base → salt + water.']) }),
  skill({ id: 'c9-neutralization-uses', name: 'Neutralization in everyday life', description: 'Explain everyday uses of neutralization, from antacids to farming.', outcomes: ['9-D2'], lessonId: L(3), format: 'mc', gen: bank([USES_EASY, USES_MEDIUM, USES_HARD], ['Use a base to cancel an acid, or a weak acid to cancel an alkali.']) }),
];
