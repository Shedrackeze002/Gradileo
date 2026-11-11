/**
 * Grade 8 Chemistry, Unit 2: The Periodic Table (8-B1, 8-B2). Groups and periods, Mendeleev's
 * table, metals and non-metals, the alkali metals, halogens and noble gases, patterns down a group,
 * and the uses of common elements. Every question states the facts about the table it needs.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { bank, either, fromBank, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `c8-2-${n}`;

// ---------------------------------------------------------------------------- 2.1 groups and periods

const GP_EASY: Q[] = [
  { q: 'In the periodic table, what is a period?', a: 'A horizontal row of elements', w: ['A vertical column of elements', 'A block of metals', 'The time an element takes to react'], why: 'Periods are the rows, read from left to right.' },
  { q: 'In the periodic table, what is a group?', a: 'A vertical column of elements', w: ['A horizontal row of elements', 'Any two elements that react together', 'The elements discovered in the same year'], why: 'Groups are the columns. Elements in the same group have similar properties.' },
  { q: 'In what order are the elements placed in the modern periodic table?', a: 'In order of atomic number', w: ['In alphabetical order of their names', 'In the order they were discovered', 'In order of how common they are'], why: 'Each element has one more proton than the one before, so they are in order of atomic number.' },
  { q: 'Which elements usually have similar chemical properties?', a: 'Elements in the same group', w: ['Elements in the same period', 'Elements whose names start with the same letter', 'Elements next to each other in a period'], why: 'Elements in the same column, or group, react in similar ways.' },
];

/** Atomic numbers 1 to 20, with each one's group (1 to 18) and period. */
const Z_GROUP = [0, 1, 18, 1, 2, 13, 14, 15, 16, 17, 18, 1, 2, 13, 14, 15, 16, 17, 18, 1, 2];
const periodOf = (z: number) => (z <= 2 ? 1 : z <= 10 ? 2 : z <= 18 ? 3 : 4);
const RANGES = 'Period 1 holds atomic numbers 1 and 2, period 2 holds 3 to 10, period 3 holds 11 to 18, and period 4 starts at 19.';

function periodFromZ(rng: Rng): GenOutput {
  const z = rng.int(1, 20);
  const p = periodOf(z);
  return {
    prompt: `${RANGES} In which period is the element with atomic number ${z}?`,
    parts: [numPart(p)],
    hints: ['Find the range that contains the atomic number.'],
    solution: [`${z} is in the range for period ${p}.`],
  };
}

function groupFromZ(rng: Rng): GenOutput {
  const p = rng.pick([2, 3]);
  const start = p === 2 ? 3 : 11;
  const z = rng.int(start, start + 7);
  const g = Z_GROUP[z];
  return {
    prompt: `Period ${p} holds atomic numbers ${start} to ${start + 7}, one element in each of groups 1, 2, 13, 14, 15, 16, 17 and 18, in that order. Which group is the element with atomic number ${z} in?`,
    parts: [numPart(g)],
    hints: [`Count along the period from ${start}, which is in group 1.`],
    solution: [`${z} is element number ${z - start + 1} in period ${p}, so it is in group ${g}.`],
  };
}

const PAIRS: Array<[string, string]> = [['lithium', 'sodium'], ['fluorine', 'chlorine'], ['helium', 'neon'], ['magnesium', 'calcium'], ['oxygen', 'sulfur'], ['sodium', 'potassium'], ['chlorine', 'bromine'], ['neon', 'argon']];
const GROUP_OF: Record<string, string> = { lithium: '1', sodium: '1', potassium: '1', magnesium: '2', calcium: '2', oxygen: '16', sulfur: '16', fluorine: '17', chlorine: '17', bromine: '17', helium: '18', neon: '18', argon: '18', carbon: '14', nitrogen: '15', aluminium: '13' };

function similarPair(rng: Rng): GenOutput {
  const [a, b] = rng.pick(PAIRS);
  const others = rng.sample(Object.keys(GROUP_OF).filter((e) => GROUP_OF[e] !== GROUP_OF[a]), 3);
  const list = Object.keys(GROUP_OF).filter((e) => e === b || others.includes(e));
  const facts = [a, ...list].map((e) => `${e} is in group ${GROUP_OF[e]}`).join('; ');
  return {
    prompt: `In the periodic table, ${facts}. Which element has chemical properties most like those of ${a}?`,
    parts: [part(mc(rng, b, others))],
    hints: ['Elements in the same group have similar properties.'],
    solution: [`${b} is in the same group as ${a} (group ${GROUP_OF[a]}), so it reacts in a similar way.`],
  };
}

// ---------------------------------------------------------------------------- 2.1 history

const HIST_EASY: Q[] = [
  { q: 'Who is best known for publishing the first periodic table, in 1869?', a: 'Dmitri Mendeleev', w: ['Isaac Newton', 'Marie Curie', 'Albert Einstein'], why: 'The Russian chemist Dmitri Mendeleev arranged the 63 elements known in 1869 into a table.' },
  { q: 'Why did Mendeleev leave gaps in his periodic table?', a: 'For elements that had not been discovered yet', w: ['Because he ran out of space on the page', 'For elements that he thought did not exist', 'To separate the metals from the gases'], why: 'He left gaps so that elements with similar properties stayed in the same column, and predicted that new elements would fill them.' },
];

const HIST_MEDIUM: Q[] = [
  { q: 'Mendeleev predicted an element he called eka-silicon, below silicon. When germanium was found in 1886, its properties matched his prediction. What did this show?', a: 'His table could predict new elements, so it was a useful way to organize them', w: ['Germanium was not really a new element', 'His table had put silicon in the wrong place', 'Elements can change into other elements'], why: 'Correct predictions convinced scientists that the table’s pattern was real.' },
  { q: 'Mendeleev mostly put the elements in order of atomic mass. What did he do when that order would put an element in a group with very different properties?', a: 'He swapped the elements so each one sat with similar elements', w: ['He left that element out of the table', 'He changed the element’s mass', 'He started a new table for it'], why: 'He put tellurium before iodine, although tellurium is heavier, so that iodine sat with the other halogens.' },
  { q: 'How is the modern periodic table ordered, compared with Mendeleev’s?', a: 'By atomic number, not atomic mass', w: ['Alphabetically, not by mass', 'By date of discovery, not by mass', 'By colour, not by mass'], why: 'Ordering by atomic number puts every element with similar ones, with no swaps needed.' },
];

const HIST_HARD: Select[] = [
  { q: 'Which statements about Mendeleev’s periodic table are true?', opts: [['He left gaps for elements not yet discovered.', true], ['He predicted the properties of missing elements.', true], ['He grouped elements with similar properties together.', true], ['He arranged the elements alphabetically.', false], ['His table had all 118 elements we know today.', false]], why: 'Mendeleev grouped similar elements and left gaps with predictions. Only 63 elements were known then.' },
];

// ---------------------------------------------------------------------------- 2.2 metals and non-metals

const MNM_EASY: Q[] = [
  { q: 'Which is a typical property of a metal?', a: 'It conducts electricity well', w: ['It is dull and brittle', 'It is a gas at room temperature', 'It does not conduct heat'], why: 'Metals are good conductors of heat and electricity.' },
  { q: 'Which is a typical property of a non-metal?', a: 'It is a poor conductor of heat and electricity', w: ['It is shiny when polished', 'It can be hammered into thin sheets', 'It can be drawn into wires'], why: 'Most non-metals are insulators. Graphite, a form of carbon, is the main exception.' },
  { q: 'What does "malleable" mean?', a: 'It can be hammered or pressed into shape without breaking', w: ['It shatters when it is hit', 'It can be drawn out into a wire', 'It rings when it is struck'], why: 'Malleable metals, such as aluminium, can be flattened into foil.' },
  { q: 'What does "ductile" mean?', a: 'It can be drawn out into a wire', w: ['It can be hammered into shape', 'It shatters when it is hit', 'It is easily scratched'], why: 'Copper is ductile, so it can be drawn into thin wires.' },
];

const MNM_MEDIUM: Q[] = [
  { q: 'Which metal is a liquid at room temperature?', a: 'Mercury', w: ['Iron', 'Copper', 'Sodium'], why: 'Mercury melts at −39 °C, so it is a liquid at room temperature. All other metals are solids.' },
  { q: 'Where are the metals in the periodic table?', a: 'On the left and in the middle', w: ['On the right only', 'In the top row only', 'In the last column only'], why: 'Metals are on the left of a zigzag "staircase" line; non-metals are on its right.' },
  { q: 'About what fraction of the elements are metals?', a: 'About three quarters', w: ['About a quarter', 'About half', 'Almost none'], why: 'Most elements are metals; the non-metals are a smaller group at the top right.' },
  { q: 'What is a metalloid, such as silicon?', a: 'An element with some properties of metals and some of non-metals', w: ['A metal that is a gas', 'A mixture of a metal and a non-metal', 'A non-metal that is magnetic'], why: 'Silicon is shiny like a metal but brittle like a non-metal, and it conducts a little.' },
];

const ELEMENTS_MNM: Array<{ desc: string; ans: 'Metal' | 'Non-metal' }> = [
  { desc: 'shiny, conducts electricity, and can be bent without breaking', ans: 'Metal' },
  { desc: 'a yellow, brittle solid that does not conduct electricity', ans: 'Non-metal' },
  { desc: 'a colourless gas that does not conduct electricity', ans: 'Non-metal' },
  { desc: 'a grey solid that rings when struck and conducts heat well', ans: 'Metal' },
  { desc: 'a dull powder that crumbles easily and is an electrical insulator', ans: 'Non-metal' },
  { desc: 'a solid that can be drawn into thin wires and conducts electricity', ans: 'Metal' },
  { desc: 'a purple-black solid that turns to a gas when gently heated and does not conduct', ans: 'Non-metal' },
  { desc: 'a silvery solid that can be hammered into thin sheets', ans: 'Metal' },
];

function metalFromProps(rng: Rng): GenOutput {
  const e = rng.pick(ELEMENTS_MNM);
  const ch = ['Metal', 'Non-metal'];
  return {
    prompt: `An element is ${e.desc}. Is it more likely to be a metal or a non-metal?`,
    parts: [part(fixedChoice(ch, ch.indexOf(e.ans)))],
    hints: ['Metals are shiny, conduct, and bend; most non-metals are dull, brittle insulators, and many are gases.'],
    solution: [`These are the properties of a ${e.ans.toLowerCase()}.`, `Answer: ${e.ans}`],
  };
}

const NAMED: Array<{ n: string; ans: 'Metal' | 'Non-metal' }> = [
  { n: 'sodium', ans: 'Metal' }, { n: 'magnesium', ans: 'Metal' }, { n: 'aluminium', ans: 'Metal' }, { n: 'calcium', ans: 'Metal' }, { n: 'zinc', ans: 'Metal' },
  { n: 'sulfur', ans: 'Non-metal' }, { n: 'oxygen', ans: 'Non-metal' }, { n: 'chlorine', ans: 'Non-metal' }, { n: 'nitrogen', ans: 'Non-metal' }, { n: 'phosphorus', ans: 'Non-metal' },
];

function metalFromPlace(rng: Rng): GenOutput {
  const e = rng.pick(NAMED);
  const side = e.ans === 'Metal' ? 'left' : 'right';
  const ch = ['Metal', 'Non-metal'];
  return {
    prompt: `In the periodic table, a zigzag line separates the metals (on its left) from the non-metals (on its right). ${e.n[0].toUpperCase() + e.n.slice(1)} is on the ${side} of the line. Is ${e.n} a metal or a non-metal?`,
    parts: [part(fixedChoice(ch, ch.indexOf(e.ans)))],
    hints: ['Metals are left of the zigzag line; non-metals are to its right.'],
    solution: [`${e.n[0].toUpperCase() + e.n.slice(1)} is on the ${side}, so it is a ${e.ans.toLowerCase()}.`],
  };
}

const MNM_HARD: Select[] = [
  { q: 'Which are properties of most metals?', opts: [['Shiny (lustrous) when freshly cut', true], ['Good conductors of electricity', true], ['Malleable and ductile', true], ['Brittle', false], ['Gases at room temperature', false], ['Poor conductors of heat', false]], why: 'Metals are lustrous, conduct well and can be shaped. Brittleness and being a gas are non-metal properties.' },
  { q: 'Which of these elements are non-metals?', opts: [['Sulfur', true], ['Oxygen', true], ['Carbon', true], ['Iron', false], ['Copper', false], ['Mercury', false]], why: 'Sulfur, oxygen and carbon are non-metals. Iron, copper and mercury are metals, even though mercury is a liquid.' },
];

// ---------------------------------------------------------------------------- 2.3 alkali metals

const ALKALI_EASY: Q[] = [
  { q: 'Which group of the periodic table holds the alkali metals?', a: 'Group 1', w: ['Group 2', 'Group 17', 'Group 18'], why: 'Lithium, sodium and potassium are alkali metals, in group 1 on the far left.' },
  { q: 'Why are lithium, sodium and potassium stored under oil?', a: 'They react quickly with air and water', w: ['They melt at room temperature', 'They are poisonous to touch', 'Oil makes them shiny'], why: 'Oil keeps air and moisture away from these very reactive metals.' },
  { q: 'Which gas is given off when an alkali metal reacts with water?', a: 'Hydrogen', w: ['Oxygen', 'Carbon dioxide', 'Chlorine'], why: 'For example, sodium + water → sodium hydroxide + hydrogen.' },
];

const ALKALI_MEDIUM: Q[] = [
  { q: 'Lithium fizzes steadily on water, sodium whizzes around and melts, and potassium bursts into a lilac flame. What is the pattern?', a: 'The alkali metals get more reactive down the group', w: ['The alkali metals get less reactive down the group', 'All alkali metals react in the same way', 'Reactivity has nothing to do with the group'], why: 'Lithium is at the top of group 1, then sodium, then potassium: each reacts more violently than the one above.' },
  { q: 'An alkali metal reacts with water to make a solution. What is this solution like?', a: 'Alkaline: it turns universal indicator blue or purple', w: ['Acidic: it turns universal indicator red', 'Neutral: it is just pure water', 'It is a solid, not a solution'], why: 'The metal hydroxide that forms dissolves to give an alkaline solution, which is why they are called alkali metals.' },
  { q: 'Which describes the alkali metals?', a: 'Soft metals that can be cut with a knife and are very reactive', w: ['Hard metals that do not react with water', 'Coloured gases that are very reactive', 'Unreactive gases used in signs'], why: 'They are soft, shiny when cut, low in density and very reactive.' },
];

const ALKALI_HARD: Select[] = [
  { q: 'Which statements about the alkali metals are true?', opts: [['They are in group 1.', true], ['They react with water to give hydrogen.', true], ['They get more reactive down the group.', true], ['They are hard and dense.', false], ['They are unreactive gases.', false], ['Potassium is less reactive than lithium.', false]], why: 'Group 1 metals are soft and reactive, give hydrogen with water, and are more reactive lower down: potassium more than lithium.' },
];

// ---------------------------------------------------------------------------- 2.3 halogens and noble gases

const HAL_EASY: Q[] = [
  { q: 'Which group holds the halogens, such as chlorine and iodine?', a: 'Group 17', w: ['Group 1', 'Group 2', 'Group 18'], why: 'The halogens are in group 17, just left of the noble gases.' },
  { q: 'Which group holds the noble gases, such as helium, neon and argon?', a: 'Group 18', w: ['Group 1', 'Group 17', 'Group 2'], why: 'The noble gases are in the last column, group 18.' },
  { q: 'What is special about the noble gases?', a: 'They are very unreactive', w: ['They are the most reactive elements', 'They are all coloured', 'They are all metals'], why: 'The noble gases hardly react at all, which is why they are found as single atoms.' },
];

const HAL_MEDIUM: Q[] = [
  { q: 'Fluorine is a pale yellow gas, chlorine a green gas, bromine a red-brown liquid and iodine a grey-black solid. What happens to the halogens down the group?', a: 'They get darker and their melting and boiling points rise', w: ['They get paler and turn into gases', 'They all stay as gases', 'They turn into metals'], why: 'Down group 17 the colours darken and the state goes from gas to liquid to solid.' },
  { q: 'Why is chlorine added to swimming pools and drinking water?', a: 'It kills bacteria', w: ['It makes the water blue', 'It makes the water taste sweet', 'It stops the water from evaporating'], why: 'Chlorine is a reactive halogen that kills microbes, so small amounts make water safe.' },
  { q: 'Why is argon used inside some light bulbs?', a: 'It is unreactive, so the hot filament does not burn away', w: ['It glows bright red', 'It is very reactive', 'It conducts electricity well'], why: 'In air, the hot filament would react with oxygen. Argon, a noble gas, does not react.' },
  { q: 'Why is helium, not hydrogen, used in party balloons?', a: 'Helium is unreactive and does not burn; hydrogen is flammable', w: ['Helium is heavier than air', 'Hydrogen is heavier than air', 'Helium is cheaper than air'], why: 'Both are lighter than air, but hydrogen can explode. Helium is a noble gas, so it is safe.' },
];

const HAL_HARD: Select[] = [
  { q: 'Which statements about the halogens are true?', opts: [['They are non-metals in group 17.', true], ['They get less reactive down the group.', true], ['Chlorine is a green gas at room temperature.', true], ['They are unreactive.', false], ['They are metals.', false]], why: 'The halogens are reactive non-metals, with fluorine the most reactive and reactivity falling down the group.' },
  { q: 'Which are uses that depend on noble gases being unreactive?', opts: [['Argon in light bulbs', true], ['Helium in balloons and airships', true], ['Argon around metal being welded', true], ['Chlorine to kill bacteria', false], ['Oxygen for breathing in hospitals', false]], why: 'Noble gases protect hot metal and are safe in balloons because they do not react. Chlorine and oxygen are reactive.' },
];

// ---------------------------------------------------------------------------- 2.4 trends

const TRENDS: Array<{ intro: string; known: Array<[string, number]>; ask: string; answer: string; wrong: string[]; why: string; unit: string }> = [
  { intro: 'The melting points of the first four alkali metals are', known: [['lithium', 181], ['sodium', 98], ['potassium', 63], ['rubidium', 39]], ask: 'caesium, the next alkali metal', answer: 'About 29 °C', wrong: ['About 210 °C', 'About 120 °C', 'About 75 °C'], why: 'The melting point falls down the group, by less each time, so caesium’s should be a little below 39 °C. It is 29 °C.', unit: '°C' },
  { intro: 'The boiling points of the first four halogens are', known: [['fluorine', -188], ['chlorine', -34], ['bromine', 59], ['iodine', 184]], ask: 'astatine, the next halogen', answer: 'About 340 °C', wrong: ['About 100 °C', 'About −200 °C', 'About 0 °C'], why: 'The boiling point rises down the group, by about 125 to 155 °C each step, so astatine’s should be about 330 to 340 °C.', unit: '°C' },
];

function trendPredict(rng: Rng): GenOutput {
  const t = rng.pick(TRENDS);
  const list = t.known.map(([n, v]) => `${n} ${String(v).replace('-', '−')} ${t.unit}`).join(', ');
  return {
    prompt: `${t.intro} ${list}. Predict the value for ${t.ask}.`,
    parts: [part(mc(rng, t.answer, t.wrong))],
    hints: ['Look at how the values change from one element to the next down the group, and continue the pattern.'],
    solution: [t.why, `Answer: ${t.answer}`],
  };
}

const TREND_EASY: Q[] = [
  { q: 'Lithium, sodium and potassium get more reactive down group 1. Caesium is further down. How will caesium react with water?', a: 'Even more violently than potassium', w: ['More gently than lithium', 'It will not react at all', 'Exactly like lithium'], why: 'Continuing the pattern, caesium is more reactive than potassium; it explodes in water.' },
  { q: 'Fluorine, chlorine and bromine get less reactive down group 17. Which is the most reactive?', a: 'Fluorine', w: ['Chlorine', 'Bromine', 'They are all equally reactive'], why: 'Fluorine is at the top of the group, so it is the most reactive halogen.' },
];

const TREND_HARD: Select[] = [
  { q: 'Chlorine is a gas, bromine a liquid and iodine a solid at room temperature. Astatine is below iodine. Which predictions follow the pattern?', opts: [['Astatine is a solid at room temperature.', true], ['Astatine is darker than iodine.', true], ['Astatine is less reactive than iodine.', true], ['Astatine is a pale yellow gas.', false], ['Astatine is the most reactive halogen.', false]], why: 'Down group 17, halogens become darker, more solid and less reactive, so astatine is a dark, less reactive solid.' },
];

// ---------------------------------------------------------------------------- 2.4 uses

const USES: Array<{ use: string; el: string; why: string }> = [
  { use: 'electrical wires', el: 'Copper', why: 'Copper conducts electricity very well and is ductile, so it can be drawn into wires.' },
  { use: 'aircraft bodies', el: 'Aluminium', why: 'Aluminium is strong for its low density, and it resists corrosion.' },
  { use: 'party balloons', el: 'Helium', why: 'Helium is less dense than air and is unreactive, so it is safe.' },
  { use: 'bright advertising signs that glow red', el: 'Neon', why: 'Neon glows red-orange when electricity passes through it.' },
  { use: 'killing bacteria in swimming pools', el: 'Chlorine', why: 'Chlorine is a reactive halogen that kills microbes.' },
  { use: 'the "lead" in pencils, as graphite', el: 'Carbon', why: 'Graphite is a soft form of carbon that leaves a mark on paper.' },
  { use: 'computer chips', el: 'Silicon', why: 'Silicon is a metalloid that conducts electricity a little, which makes it useful in electronics.' },
  { use: 'jewellery that never tarnishes', el: 'Gold', why: 'Gold is shiny and almost completely unreactive.' },
  { use: 'breathing gas in hospitals', el: 'Oxygen', why: 'People need oxygen for respiration.' },
];

function useOf(rng: Rng): GenOutput {
  const u = rng.pick(USES);
  return {
    prompt: `Which element is used for ${u.use}?`,
    parts: [part(mc(rng, u.el, rng.sample(USES.filter((x) => x.el !== u.el).map((x) => x.el), 3)))],
    hints: ['Think about the property the job needs.'],
    solution: [u.why, `Answer: ${u.el}`],
  };
}

const USE_MEDIUM: Q[] = [
  { q: 'Why is copper used for electrical wires?', a: 'It is an excellent conductor and can be drawn into wires', w: ['It is the cheapest metal of all', 'It is magnetic', 'It is an insulator'], why: 'Copper conducts electricity well and is ductile.' },
  { q: 'Why is aluminium used to build aircraft?', a: 'It is strong but has a low density, and it resists corrosion', w: ['It is the densest metal', 'It is a good insulator', 'It is magnetic'], why: 'A light, strong, corrosion-resistant metal saves fuel and lasts.' },
  { q: 'Why is gold used for the electrical contacts in phones?', a: 'It conducts well and never corrodes', w: ['It is magnetic', 'It is very cheap', 'It is a poor conductor'], why: 'Gold stays clean and conducting for years because it does not react with air.' },
];

const USE_HARD: Select[] = [
  { q: 'Which uses depend on the element being unreactive?', opts: [['Gold for jewellery', true], ['Argon in light bulbs', true], ['Helium in balloons', true], ['Chlorine to kill bacteria', false], ['Copper for wires', false]], why: 'Gold, argon and helium are chosen because they do not react. Chlorine is chosen for being reactive, and copper for conducting.' },
];

export const TABLE_SKILLS: SkillDef[] = [
  skill({ id: 'c8-groups-periods', name: 'Groups and periods', description: 'Describe groups and periods, and find an element’s period and group from its atomic number.', outcomes: ['8-B1'], lessonId: L(1), gen: bank([GP_EASY, periodFromZ, either(groupFromZ, similarPair)], ['Periods are rows; groups are columns. Elements in a group are alike.']) }),
  skill({ id: 'c8-table-history', name: 'Mendeleev’s table', description: 'Describe how Mendeleev arranged the elements, left gaps and made predictions.', outcomes: ['8-B1'], lessonId: L(1), format: 'mc', gen: bank([HIST_EASY, HIST_MEDIUM, HIST_HARD], ['Mendeleev grouped similar elements and left gaps for undiscovered ones.']) }),
  skill({ id: 'c8-metal-properties', name: 'Properties of metals and non-metals', description: 'Describe the properties of metals, non-metals and metalloids.', outcomes: ['8-B1'], lessonId: L(2), format: 'mc', gen: bank([MNM_EASY, MNM_MEDIUM, MNM_HARD], ['Metals: shiny, conductors, malleable, ductile. Non-metals: mostly dull, brittle insulators.']) }),
  skill({ id: 'c8-metal-or-nonmetal', name: 'Metal or non-metal?', description: 'Classify an element as a metal or a non-metal from its properties or its place in the table.', outcomes: ['8-B1'], lessonId: L(2), format: 'mc', gen: bank([metalFromProps, metalFromPlace, either(metalFromProps, fromBank(MNM_HARD, ['Metals are left of the zigzag line.']))], ['Metals are shiny conductors on the left of the table; non-metals are on the right.']) }),
  skill({ id: 'c8-alkali-metals', name: 'The alkali metals', description: 'Describe the group 1 metals, their reaction with water and the pattern in their reactivity.', outcomes: ['8-B2'], lessonId: L(3), format: 'mc', gen: bank([ALKALI_EASY, ALKALI_MEDIUM, ALKALI_HARD], ['Group 1 metals are soft and react with water to give hydrogen; they get more reactive down the group.']) }),
  skill({ id: 'c8-halogens-noble', name: 'Halogens and noble gases', description: 'Describe the halogens and noble gases, their patterns and their uses.', outcomes: ['8-B2'], lessonId: L(3), format: 'mc', gen: bank([HAL_EASY, HAL_MEDIUM, HAL_HARD], ['Halogens (group 17) are reactive non-metals; noble gases (group 18) are unreactive.']) }),
  skill({ id: 'c8-group-trends', name: 'Patterns down a group', description: 'Use a pattern down a group to predict an element’s reactivity, state or other property.', outcomes: ['8-B2'], lessonId: L(4), format: 'mc', gen: bank([TREND_EASY, trendPredict, TREND_HARD], ['Find how the values change down the group, then continue the pattern.']) }),
  skill({ id: 'c8-element-uses', name: 'Uses of elements', description: 'Link the uses of common elements to their properties.', outcomes: ['8-B2'], lessonId: L(4), format: 'mc', gen: bank([useOf, USE_MEDIUM, USE_HARD], ['Ask which property the job needs: conducting, being light, being unreactive…']) }),
];
