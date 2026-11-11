/**
 * More Chemistry Topics, Units 5 and 6. Unit 5, atoms, elements and structures: how the model of
 * the atom and the periodic table developed, the transition metals beside the alkali metals, and
 * the structures of carbon with nanoparticles. Unit 6, materials and industry: corrosion, alloys
 * and other materials, the Haber process with NPK fertilisers, and hydrogen fuel cells. Every
 * figure a calculation needs (relative atomic masses, the conditions of a process, the carat
 * scale) is stated inside its question.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef, TableFigure } from '../../../types.ts';
import { $, arText, AR, atomsOf, cap, eq, letters, mr, mrWorking, q } from './common.ts';

const L5 = (n: number) => `cx-5-${n}`;
const L6 = (n: number) => `cx-6-${n}`;

interface BankItem {
  ask: string;
  right: string;
  wrong: string[];
  sol: string;
}
const fromBank = (rng: Rng, items: BankItem[], hints: string[]): GenOutput => {
  const item = rng.pick(items);
  return { prompt: item.ask, parts: [part(mc(rng, item.right, item.wrong))], hints, solution: [item.sol] };
};

// ---------------------------------------------------------------------------- lesson 5.1: the atomic model and the periodic table

const MODELS = [
  { who: 'John Dalton', model: 'Atoms are tiny solid spheres that cannot be divided' },
  { who: 'J. J. Thomson', model: 'The plum pudding model: a ball of positive charge with negative electrons embedded in it' },
  { who: 'Ernest Rutherford', model: 'The nuclear model: a tiny, positively charged nucleus with electrons around it' },
  { who: 'Niels Bohr', model: 'Electrons orbit the nucleus at fixed distances, in shells' },
];

function atomicModel(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['The order of the models: solid spheres, plum pudding, nuclear model, electron shells.', 'A new model replaces an old one when new evidence cannot be explained by the old one.'];
  if (d === 1) {
    if (rng.chance(0.5)) {
      const m = rng.pick(MODELS);
      return {
        prompt: `Which model of the atom is linked with **${m.who}**?`,
        parts: [part(mc(rng, m.model, MODELS.filter((x) => x.who !== m.who).map((x) => x.model)))],
        hints,
        solution: [`${m.who}: ${m.model[0].toLowerCase()}${m.model.slice(1)}.`],
      };
    }
    return fromBank(
      rng,
      [
        { ask: 'Which particle did J. J. Thomson discover, showing that atoms can be divided?', right: 'The electron', wrong: ['The proton', 'The neutron', 'The nucleus'], sol: 'Thomson discovered the electron, a negative particle far lighter than any atom. Atoms could no longer be thought of as solid, indivisible spheres.' },
        { ask: 'Which particle did James Chadwick show to exist in the nucleus?', right: 'The neutron', wrong: ['The electron', 'The proton', 'The alpha particle'], sol: 'Chadwick provided the evidence for the neutron, a particle with no charge, about 20 years after the nucleus became an accepted idea.' },
        { ask: 'In the plum pudding model, where is the positive charge of the atom?', right: 'Spread through the whole atom', wrong: ['Concentrated in a tiny nucleus', 'On the electrons', 'In shells around the outside'], sol: 'The plum pudding model pictured the atom as a ball of positive charge, with the negative electrons dotted through it.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'In the alpha particle scattering experiment, most alpha particles went straight through the gold foil. What did this show?', right: 'Most of the atom is empty space', wrong: ['The atom is a solid sphere', 'The nucleus is negatively charged', 'Electrons are found in shells'], sol: 'Alpha particles that pass straight through have met nothing to stop them, so most of an atom must be empty space.' },
        { ask: 'In the alpha particle scattering experiment, a very few alpha particles bounced back from the gold foil. What did this show?', right: 'The mass of the atom is concentrated in a tiny, charged nucleus', wrong: ['Most of the atom is empty space', 'The atom is a ball of positive charge with electrons in it', 'Alpha particles have no charge'], sol: 'Only something small, dense and charged could turn a fast alpha particle back. Rutherford concluded that the mass and the positive charge are in a tiny nucleus.' },
        { ask: 'Alpha particles are positively charged. Some were deflected through small angles as they passed through the foil. Why?', right: 'They passed close to a positive nucleus, which repelled them', wrong: ['They were attracted to a positive nucleus', 'They collided with electrons and stopped', 'They were absorbed by the foil'], sol: 'Like charges repel. An alpha particle that passes near the positive nucleus is pushed off its straight path.' },
        { ask: 'Why was the plum pudding model replaced by the nuclear model?', right: 'It could not explain the results of the alpha particle scattering experiment', wrong: ['It was older than the nuclear model', 'It did not include electrons', 'Scientists preferred a simpler model'], sol: 'If the positive charge were spread out, no alpha particle would bounce back. The new evidence did not fit the old model, so the model was changed.' },
        { ask: 'How did Niels Bohr change the nuclear model?', right: 'He suggested that electrons orbit the nucleus at specific distances', wrong: ['He suggested that the nucleus contains electrons', 'He suggested that the atom is a solid sphere', 'He suggested that the nucleus is negatively charged'], sol: 'Bohr’s calculations showed that the electrons orbit at set distances, which we call shells or energy levels. His calculations agreed with experimental observations.' },
      ],
      hints,
    );
  }
  if (rng.chance(0.5)) {
    const [a, b] = rng.sample([0, 1, 2, 3], 2);
    const first = Math.min(a, b);
    return {
      prompt: `Which of these two models of the atom came **first**? Model 1: “${MODELS[a].model}.” Model 2: “${MODELS[b].model}.”`,
      parts: [part(fixedChoice(['Model 1', 'Model 2'], a === first ? 0 : 1))],
      hints,
      solution: [`The order was: solid spheres (Dalton), the plum pudding model (Thomson), the nuclear model (Rutherford), then electrons in shells (Bohr). So “${MODELS[first].model}” came first.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Suppose the plum pudding model were correct. What would have happened in the alpha particle scattering experiment?', right: 'Nearly all the alpha particles would pass through with almost no deflection, and none would bounce back', wrong: ['Most alpha particles would bounce straight back', 'Every alpha particle would be absorbed by the foil', 'Half the alpha particles would be deflected through large angles'], sol: 'A spread-out positive charge could not push hard on an alpha particle. The few that bounced back were the surprise that the model could not explain.' },
      { ask: 'What does the story of the atomic model show about scientific models?', right: 'A model is changed or replaced when new evidence does not fit it', wrong: ['A model is kept even when evidence goes against it', 'The first model of anything is usually correct', 'Models are replaced whenever a famous scientist suggests a new one'], sol: 'Each model was accepted while it explained the evidence, and was revised when an experiment produced results it could not explain.' },
      { ask: 'Which statement compares the plum pudding model with the nuclear model correctly?', right: 'Both contain electrons, but only the nuclear model has its positive charge in a small nucleus', wrong: ['Both have a nucleus, but only the plum pudding model has electrons', 'Neither contains electrons', 'Both have their positive charge spread through the atom'], sol: 'Thomson’s model had electrons in a ball of positive charge. Rutherford kept the electrons but put the positive charge, and most of the mass, in a tiny nucleus.' },
      { ask: 'Later experiments showed that the positive charge of a nucleus comes in whole-number multiples of one small charge. What idea did this lead to?', right: 'The nucleus contains protons, each with the same positive charge', wrong: ['The nucleus contains electrons', 'The atom has no nucleus', 'The nucleus contains neutrons, each with a positive charge'], sol: 'The charge of any nucleus could be made up from a whole number of smaller particles of equal charge. These particles were named protons.' },
    ],
    hints,
  );
}

function periodicHistory(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Early tables put the elements in order of atomic weight. Mendeleev left gaps and sometimes changed the order.', 'The modern table is in order of atomic number, the number of protons.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Before protons were discovered, in what order did scientists arrange the elements?', right: 'In order of atomic weight', wrong: ['In order of atomic number', 'In alphabetical order', 'In order of the date they were discovered'], sol: 'Nothing was known about protons, neutrons or electrons, so the only number to go by was the atomic weight of each element.' },
        { ask: 'In what order are the elements arranged in the modern periodic table?', right: 'In order of atomic number', wrong: ['In order of atomic weight', 'In order of melting point', 'In order of reactivity'], sol: 'The modern periodic table lists the elements in order of atomic number, which is the number of protons in the nucleus.' },
        { ask: 'Why did Mendeleev leave gaps in his periodic table?', right: 'For elements that he thought had not been discovered yet', wrong: ['Because he ran out of elements to add', 'To separate the metals from the gases', 'Because some elements have no atomic weight'], sol: 'Mendeleev left gaps so that elements with similar properties stayed in the same group, and he predicted that the missing elements would be found.' },
        { ask: 'What do the elements in one group of the periodic table have in common?', right: 'Similar chemical properties', wrong: ['The same atomic weight', 'The same number of neutrons', 'The same melting point'], sol: 'Elements in a group react in similar ways, because their atoms have the same number of electrons in the outer shell.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'The early periodic tables that followed atomic weight strictly had a problem. What was it?', right: 'Some elements were placed in groups with elements that had very different properties', wrong: ['They contained too many gaps', 'They could only include metals', 'They listed every element twice'], sol: 'Following atomic weight strictly put some elements in the wrong groups: for example, a metal among non-metals. The pattern broke down.' },
        { ask: 'Mendeleev used his table to predict the properties of elements that had not been found. Why did this help his table to be accepted?', right: 'The elements were later discovered, and their properties matched his predictions', wrong: ['Nobody could check the predictions, so nobody could disagree', 'The predictions showed that atomic weights were all wrong', 'The elements were never found, which proved the gaps were needed'], sol: 'Elements such as gallium and germanium were discovered later, with properties close to those Mendeleev had predicted. A prediction that comes true is strong evidence for an idea.' },
        { ask: 'In some places Mendeleev did not follow the order of atomic weight. Why did he change the order?', right: 'So that elements with similar properties were in the same group', wrong: ['So that the table had the same number of elements in every row', 'Because he had measured the number of protons in each atom', 'So that the heaviest elements came first'], sol: 'Where atomic weight would have put an element in a group it did not fit, Mendeleev swapped the order and trusted the properties.' },
        { ask: 'Two atoms of the same element can have different masses. What are such atoms called?', right: 'Isotopes', wrong: ['Ions', 'Molecules', 'Alloys'], sol: 'Isotopes are atoms of the same element, with the same number of protons, that have different numbers of neutrons and so different masses.' },
      ],
      hints,
    );
  }
  if (rng.chance(0.4)) {
    // A stated pair that atomic weight puts the "wrong" way round.
    const pair = rng.pick([
      { a: 'tellurium', b: 'iodine', za: 52, zb: 53, wa: 128, wb: 127, group: 'the halogens', member: 'iodine' },
      { a: 'argon', b: 'potassium', za: 18, zb: 19, wa: 40, wb: 39, group: 'the alkali metals', member: 'potassium' },
    ]);
    return {
      prompt: `${cap(pair.a)} has atomic number ${pair.za} and a relative atomic mass of about ${pair.wa}. ${cap(pair.b)} has atomic number ${pair.zb} and a relative atomic mass of about ${pair.wb}. ${cap(pair.member)} has the properties of ${pair.group}. Which element comes first in the modern periodic table, and why?`,
      parts: [
        part(
          mc(rng, `${cap(pair.a)}, because it has the lower atomic number`, [
            `${cap(pair.b)}, because it has the lower relative atomic mass`,
            `${cap(pair.a)}, because it has the higher relative atomic mass`,
            `${cap(pair.b)}, because it has the higher atomic number`,
          ]),
        ),
      ],
      hints,
      solution: [`The modern table is in order of atomic number. ${cap(pair.a)} (${pair.za}) comes before ${pair.b} (${pair.zb}), even though its atoms are heavier on average. This order puts ${pair.member} with ${pair.group}, where its properties belong.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'The discovery of isotopes explained something about Mendeleev’s table. What?', right: 'Why ordering the elements strictly by atomic weight does not always give the right order', wrong: ['Why some elements are metals and others are not', 'Why Mendeleev left no gaps in his table', 'Why elements in a group have different properties'], sol: 'An element’s atomic weight depends on the mix of its isotopes, so it does not always rise in step with the number of protons. Mendeleev was right to trust properties over weights.' },
      { ask: 'Why was Mendeleev’s table a better piece of science than the earlier tables?', right: 'It made predictions that could be tested, and they turned out to be correct', wrong: ['It was drawn more neatly', 'It included every element known today', 'It was based on the number of protons in each atom'], sol: 'Mendeleev’s gaps were predictions. When the missing elements were found with the properties he had described, the table was supported by evidence.' },
      { ask: 'Mendeleev did not know about protons. Why does his table still agree so well with the modern one?', right: 'Arranging by properties put the elements in almost the same order as arranging by atomic number', wrong: ['He guessed the number of protons in each atom', 'Atomic weight and atomic number are always equal', 'The modern table is in order of atomic weight'], sol: 'Chemical properties depend on the electrons, and so on the number of protons. By following the properties, Mendeleev found the order of atomic number without knowing it.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 5.2: transition metals

const TRANSITION = ['iron', 'copper', 'nickel', 'chromium', 'manganese', 'cobalt'];
const ALKALI = ['lithium', 'sodium', 'potassium'];

function transitionProps(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Compared with the alkali metals, the transition metals are harder, stronger and denser, with higher melting points.', 'The transition metals are much less reactive with water and oxygen.'];
  if (d === 1) {
    const t = rng.pick(TRANSITION);
    const a = rng.pick(ALKALI);
    const item = rng.pick([
      { ask: `Compared with ${a}, an alkali metal, how hard and strong is ${t}, a transition metal?`, right: `${cap(t)} is harder and stronger`, wrong: [`${cap(t)} is softer and weaker`, `${cap(t)} is softer but stronger`, 'The two are equally hard and strong'], sol: `Transition metals such as ${t} are hard and strong. Alkali metals such as ${a} are soft enough to cut with a knife.` },
      { ask: `Compared with ${a}, an alkali metal, what is the melting point of ${t}, a transition metal?`, right: `${cap(t)} has a much higher melting point`, wrong: [`${cap(t)} has a much lower melting point`, 'The two melt at the same temperature', `${cap(t)} does not melt at any temperature`], sol: `Transition metals have high melting points. The alkali metals melt at low temperatures for metals.` },
      { ask: `Compared with ${a}, an alkali metal, what is the density of ${t}, a transition metal?`, right: `${cap(t)} is much denser`, wrong: [`${cap(t)} is much less dense`, 'The two have the same density', `${cap(t)} floats on water`], sol: `Transition metals are dense. Lithium, sodium and potassium are all less dense than water.` },
      { ask: `Compared with ${a}, an alkali metal, how does ${t}, a transition metal, react with cold water?`, right: `${cap(t)} reacts far more slowly, or not at all`, wrong: [`${cap(t)} reacts far more violently`, `${cap(t)} catches fire at once`, 'The two react in exactly the same way'], sol: `The alkali metals react vigorously with cold water. Transition metals react slowly, if at all.` },
    ]);
    return { prompt: item.ask, parts: [part(mc(rng, item.right, item.wrong))], hints, solution: [item.sol] };
  }
  if (d === 2) {
    // Identify the transition metal from a table of properties.
    const names = letters(rng, 3);
    const tIndex = rng.int(0, 2);
    const rows = names.map((n, i) => (i === tIndex ? [n, `${rng.pick([1085, 1455, 1538, 1907])}`, fmt(rng.pick([7.2, 7.9, 8.9])), 'No visible change'] : [n, `${rng.pick([64, 98, 181])}`, fmt(rng.pick([0.53, 0.86, 0.97])), 'Fizzes and moves about']));
    const figure: TableFigure = { type: 'table', headers: ['Metal', 'Melting point (°C)', 'Density (g/cm³)', 'In cold water'], rows };
    return {
      prompt: 'The table gives data for three metals. Which one is a **transition metal**?',
      figure,
      parts: [part(fixedChoice(names.map((n) => `Metal ${n}`), tIndex))],
      hints,
      solution: [`Metal ${names[tIndex]} has a high melting point and a high density, and it does not react with cold water. These are the properties of a transition metal. The other two are soft, light, reactive metals like the alkali metals.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Iron is used for bridges, and sodium is not. Which pair of properties explains this best?', right: 'Iron is strong, and it reacts only slowly with water and air', wrong: ['Iron is soft, and it reacts quickly with water', 'Sodium is too dense, and it has too high a melting point', 'Sodium is too hard, and it does not conduct electricity'], sol: 'A bridge needs a strong metal that does not react quickly with rain and air. Sodium is soft and reacts violently with water.' },
      { ask: 'Copper is used for water pipes. Which property of a transition metal matters most here?', right: 'It does not react with water', wrong: ['It has a high density', 'It forms coloured compounds', 'It can be used as a catalyst'], sol: 'A water pipe must not react with the water it carries. Copper is unreactive, and it is also easily bent into shape.' },
      { ask: 'A metal has a melting point of 63 °C, floats on water and reacts violently with it. Where in the periodic table is it most likely found?', right: 'In Group 1, the alkali metals', wrong: ['Among the transition metals, in the middle block', 'In Group 0, the noble gases', 'In Group 7, the halogens'], sol: 'A low melting point, a low density and a violent reaction with water are the properties of an alkali metal.' },
      { ask: 'Where are the transition metals found in the periodic table?', right: 'In the middle block, between Group 2 and Group 3', wrong: ['In Group 1, at the left-hand side', 'In Group 0, at the right-hand side', 'In the top row only'], sol: 'The transition metals form the large block in the middle of the table, between Groups 2 and 3.' },
    ],
    hints,
  );
}

function transitionCompounds(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Transition metals form ions with different charges, coloured compounds, and are useful as catalysts.', 'A Roman numeral in a name gives the charge of the metal ion: iron(III) is $\\ce{Fe^3+}$.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which of these is a typical property of the compounds of transition metals?', right: 'They are coloured', wrong: ['They are all white', 'They are all gases', 'They never dissolve in water'], sol: 'Many transition metal compounds are coloured: copper(II) sulfate is blue, and iron(III) oxide is red-brown. Compounds of the alkali metals are white.' },
        { ask: 'A catalyst speeds up a reaction without being used up. Which kind of element is most often used as a catalyst?', right: 'A transition metal', wrong: ['An alkali metal', 'A noble gas', 'A halogen'], sol: 'Transition metals and their compounds are widely used as catalysts: iron in the Haber process, for example.' },
        { ask: 'Sodium forms only one ion, $\\ce{Na+}$. How is a transition metal such as iron different?', right: 'It can form ions with different charges, such as $\\ce{Fe^2+}$ and $\\ce{Fe^3+}$', wrong: ['It forms no ions at all', 'It forms only negative ions', 'It forms only ions with a charge of 1+'], sol: 'Transition metals can form more than one ion. Iron forms $\\ce{Fe^2+}$ and $\\ce{Fe^3+}$, and copper forms $\\ce{Cu+}$ and $\\ce{Cu^2+}$.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    // The ion from a name with a Roman numeral.
    const c = rng.pick([
      { name: 'iron(II) chloride', ion: 'Fe^2+', sym: 'Fe', n: 2 },
      { name: 'iron(III) chloride', ion: 'Fe^3+', sym: 'Fe', n: 3 },
      { name: 'copper(I) oxide', ion: 'Cu+', sym: 'Cu', n: 1 },
      { name: 'copper(II) oxide', ion: 'Cu^2+', sym: 'Cu', n: 2 },
      { name: 'manganese(IV) oxide', ion: 'Mn^4+', sym: 'Mn', n: 4 },
      { name: 'chromium(III) oxide', ion: 'Cr^3+', sym: 'Cr', n: 3 },
      { name: 'cobalt(II) chloride', ion: 'Co^2+', sym: 'Co', n: 2 },
    ]);
    const charge = (n: number) => `${c.sym}${n === 1 ? '+' : `^${n}+`}`;
    const others = [1, 2, 3, 4].filter((n) => n !== c.n).map((n) => eq(charge(n)));
    return {
      prompt: `Which ion of the metal does **${c.name}** contain?`,
      parts: [part(mc(rng, eq(c.ion), others))],
      hints,
      solution: [`The Roman numeral gives the charge on the metal ion. In ${c.name} the ion is ${eq(c.ion)}.`],
    };
  }
  if (rng.chance(0.5)) {
    // Formula from the charges.
    const c = rng.pick([
      { name: 'iron(III) oxide', f: 'Fe2O3', why: 'two $\\ce{Fe^3+}$ ions (6+) balance three $\\ce{O^2-}$ ions (6−)', wrong: ['FeO', 'Fe3O2', 'FeO3'] },
      { name: 'iron(II) oxide', f: 'FeO', why: 'one $\\ce{Fe^2+}$ ion (2+) balances one $\\ce{O^2-}$ ion (2−)', wrong: ['Fe2O3', 'Fe2O', 'FeO2'] },
      { name: 'copper(I) oxide', f: 'Cu2O', why: 'two $\\ce{Cu+}$ ions (2+) balance one $\\ce{O^2-}$ ion (2−)', wrong: ['CuO', 'CuO2', 'Cu2O3'] },
      { name: 'iron(III) chloride', f: 'FeCl3', why: 'one $\\ce{Fe^3+}$ ion (3+) balances three $\\ce{Cl-}$ ions (3−)', wrong: ['FeCl2', 'Fe3Cl', 'FeCl'] },
      { name: 'chromium(III) oxide', f: 'Cr2O3', why: 'two $\\ce{Cr^3+}$ ions (6+) balance three $\\ce{O^2-}$ ions (6−)', wrong: ['CrO', 'Cr3O2', 'CrO3'] },
      { name: 'manganese(IV) oxide', f: 'MnO2', why: 'one $\\ce{Mn^4+}$ ion (4+) balances two $\\ce{O^2-}$ ions (4−)', wrong: ['MnO', 'Mn2O', 'MnO4'] },
    ]);
    return {
      prompt: `What is the formula of **${c.name}**? An oxide ion is $\\ce{O^2-}$ and a chloride ion is $\\ce{Cl-}$.`,
      parts: [part(mc(rng, $(c.f), c.wrong.map($)))],
      hints: ['The Roman numeral is the charge on the metal ion.', 'The total positive charge must equal the total negative charge.'],
      solution: [`In ${c.name}, ${c.why}. The formula is ${$(c.f)}.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'A student has two white powders and one blue powder. Which is most likely to be a compound of a transition metal?', right: 'The blue powder', wrong: ['Either of the white powders', 'All three equally', 'None of them: transition metal compounds are colourless'], sol: 'Transition metal compounds are usually coloured. Compounds of the alkali metals are white.' },
      { ask: 'Iron is the catalyst in the Haber process. After a year of use, how does the mass of iron compare with the mass at the start?', right: 'It is the same, because a catalyst is not used up', wrong: ['It is much less, because the iron has reacted', 'It is much more, because ammonia has joined to it', 'It is zero, because the catalyst has gone'], sol: 'A catalyst speeds up a reaction but is not used up in it, so the iron is still there at the end.' },
      { ask: 'Iron(II) sulfate solution is pale green, and iron(III) sulfate solution is yellow-brown. What does this show?', right: 'Different ions of the same transition metal can have different colours', wrong: ['Iron is not a transition metal', 'Sulfate ions are coloured', 'The two solutions contain different metals'], sol: 'Both solutions contain iron and sulfate. The colour depends on the ion: $\\ce{Fe^2+}$ is green and $\\ce{Fe^3+}$ is yellow-brown.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 5.3: carbon structures and nanoparticles

const CARBON = [
  { name: 'diamond', bonds: 4, structure: 'Each carbon atom is joined to four others in a giant structure', props: 'Very hard, with a very high melting point; does not conduct electricity' },
  { name: 'graphite', bonds: 3, structure: 'Each carbon atom is joined to three others, in layers of hexagons with weak forces between the layers', props: 'Soft and slippery, with a high melting point; conducts electricity' },
  { name: 'graphene', bonds: 3, structure: 'A single layer of carbon atoms in hexagons, one atom thick', props: 'Very strong and light; conducts electricity' },
  { name: 'buckminsterfullerene', bonds: 3, structure: 'Sixty carbon atoms joined in a hollow sphere', props: 'Made of separate molecules, so it has a much lower melting point than diamond' },
];

function carbonStructures(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Diamond: four bonds for each atom, no free electrons. Graphite: three bonds, layers, and one delocalised electron for each atom.', 'Graphene is one layer of graphite. Fullerenes are hollow molecules of carbon.'];
  if (d === 1) {
    const c = rng.pick(CARBON);
    if (rng.chance(0.5)) {
      return {
        prompt: `Which describes the structure of **${c.name}**?`,
        parts: [part(mc(rng, c.structure, CARBON.filter((x) => x.name !== c.name).map((x) => x.structure)))],
        hints,
        solution: [`${cap(c.name)}: ${c.structure[0].toLowerCase()}${c.structure.slice(1)}.`],
      };
    }
    const two = rng.pick([CARBON[0], CARBON[1]]);
    return {
      prompt: `In **${two.name}**, how many covalent bonds does each carbon atom form?`,
      parts: [part(fixedChoice(['2', '3', '4', '6'], two.bonds === 3 ? 1 : 2))],
      hints,
      solution: [`In ${two.name}, each carbon atom forms ${two.bonds} covalent bonds.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why is diamond so hard?', right: 'Every atom is held by four strong covalent bonds in a giant structure', wrong: ['Its layers can slide over each other', 'It has delocalised electrons between its atoms', 'It is made of small molecules with weak forces between them'], sol: 'To scratch or break diamond, many strong covalent bonds have to be broken. Each atom is bonded to four others in a rigid giant structure.' },
        { ask: 'Why does graphite conduct electricity?', right: 'Each carbon atom has one delocalised electron that is free to move', wrong: ['Its carbon atoms are ions that can move', 'Each carbon atom forms four covalent bonds', 'Its layers are held together by strong covalent bonds'], sol: 'In graphite each atom uses three of its four outer electrons in bonds. The fourth is delocalised and can move along the layers, carrying charge.' },
        { ask: 'Why is graphite soft and slippery?', right: 'There are only weak forces between its layers, so the layers slide over each other', wrong: ['Its covalent bonds are weak and break easily', 'It is made of small molecules', 'Each carbon atom is bonded to four others'], sol: 'The bonds inside a layer are strong, but there are no covalent bonds between layers. The layers slide, which is why graphite is used in pencils and as a lubricant.' },
        { ask: 'Why does diamond **not** conduct electricity?', right: 'All four outer electrons of each atom are used in bonds, so none is free to move', wrong: ['Its atoms are too far apart', 'Its layers cannot slide', 'It contains no electrons'], sol: 'Each carbon atom in diamond forms four covalent bonds, which uses all four outer electrons. There are no delocalised electrons to carry charge.' },
        { ask: 'What is graphene?', right: 'A single layer of graphite, one atom thick', wrong: ['A hollow ball of sixty carbon atoms', 'A very small diamond', 'A mixture of carbon and iron'], sol: 'Graphene is one layer of carbon atoms arranged in hexagons. It is strong, light and conducts electricity, so it is useful in electronics and composites.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'Diamond and graphite both have very high melting points. Why?', right: 'Both are giant structures, so many strong covalent bonds must be broken to melt them', wrong: ['Both have weak forces between layers', 'Both are made of small molecules', 'Both have delocalised electrons'], sol: 'Melting either one means breaking strong covalent bonds throughout a giant structure, which takes a great deal of energy.' },
      { ask: 'Buckminsterfullerene, $\\ce{C60}$, has a much lower melting point than diamond. Why?', right: 'It is made of separate molecules, with only weak forces between them', wrong: ['Its covalent bonds are much weaker than those in diamond', 'It contains fewer carbon atoms than a diamond', 'It has delocalised electrons'], sol: 'To melt $\\ce{C60}$, only the weak forces between the molecules must be overcome. The strong covalent bonds inside each molecule are not broken.' },
      { ask: 'Carbon nanotubes are used to strengthen tennis rackets without adding much weight. Which properties make them suitable?', right: 'High tensile strength and low density', wrong: ['Softness and a low melting point', 'High density and brittleness', 'A slippery feel and a dull colour'], sol: 'Carbon nanotubes are cylindrical fullerenes with very high length to diameter ratios. They are very strong when pulled and very light.' },
      { ask: 'Graphite is used for the electrodes in electrolysis. Which two properties make it suitable?', right: 'It conducts electricity and has a high melting point', wrong: ['It is soft and slippery', 'It is hard and transparent', 'It dissolves in water and is cheap'], sol: 'An electrode must carry a current and survive high temperatures. Graphite does both, and it is fairly unreactive.' },
      { ask: 'Some fullerenes are hollow cages. What use does this shape suggest?', right: 'Carrying a drug inside the cage to a particular part of the body', wrong: ['Cutting glass', 'Lubricating engines by sliding layers', 'Making water pipes'], sol: 'A hollow molecule can hold another molecule inside it, so fullerenes are being studied as a way to deliver drugs in the body.' },
    ],
    hints,
  );
}

function nanoparticles(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A nanoparticle is between 1 nm and 100 nm across. 1 nm is one billionth of a metre.', 'For a cube, surface area = 6 × side², and volume = side³.'];
  if (d === 1) {
    if (rng.chance(0.5)) {
      const size = rng.pick([0.2, 5, 20, 60, 90, 400, 2500, 10000]);
      const isNano = size >= 1 && size <= 100;
      return {
        prompt: `Nanoparticles are between 1 nm and 100 nm in diameter. Is a particle with a diameter of ${fmt(size)} nm a nanoparticle?`,
        parts: [part(fixedChoice(['Yes', 'No: it is too small', 'No: it is too large'], isNano ? 0 : size < 1 ? 1 : 2))],
        hints,
        solution: [isNano ? `${fmt(size)} nm lies between 1 nm and 100 nm, so it is a nanoparticle.` : `${fmt(size)} nm is ${size < 1 ? 'less than 1 nm, so the particle is too small: it is the size of a single atom or small molecule' : 'more than 100 nm, so the particle is too large'}.`],
      };
    }
    return fromBank(
      rng,
      [
        { ask: 'About how many atoms does a nanoparticle contain?', right: 'A few hundred', wrong: ['One', 'A few million million', 'None: nanoparticles are not made of atoms'], sol: 'A particle 1 nm to 100 nm across contains only a few hundred atoms.' },
        { ask: 'One nanometre, 1 nm, is what fraction of a metre?', right: 'One billionth', wrong: ['One thousandth', 'One millionth', 'One hundredth'], sol: '$1\\ \\text{nm} = 1 \\times 10^{-9}\\ \\text{m}$, which is one billionth of a metre.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    // Surface area to volume ratio of a cube.
    const side = rng.pick([1, 2, 3, 4, 5, 6, 10, 20]);
    const sa = 6 * side * side;
    const v = side ** 3;
    return {
      prompt: `A cube-shaped particle has sides of ${q(side, 'nm')}. What is its surface area to volume ratio? Give your answer as a single number, the surface area in nm² divided by the volume in nm³.`,
      parts: [numPart(sa / v, { decimals: 1 })],
      hints,
      solution: [`Surface area $= 6 \\times ${side}^2 = ${sa}\\ \\text{nm}^2$.`, `Volume $= ${side}^3 = ${v}\\ \\text{nm}^3$.`, `Ratio $= ${sa} \\div ${v} = ${fmt(sa / v, 1)}$.`],
      calculator: true,
    };
  }
  if (rng.chance(0.5)) {
    const factor = rng.pick([2, 5, 10]);
    const big = rng.pick([10, 20, 50, 100]);
    const small = big / factor;
    return {
      prompt: `A cube with sides of ${q(big, 'nm')} is compared with a cube with sides of ${q(small, 'nm')}. How many times greater is the surface area to volume ratio of the **smaller** cube? (For a cube, surface area $= 6 \\times \\text{side}^2$ and volume $= \\text{side}^3$.)`,
      parts: [numPart(factor, { decimals: 0 })],
      hints: ['Work out the ratio for each cube: it comes to 6 ÷ side.', 'Divide the ratio of the smaller cube by the ratio of the larger one.'],
      solution: [`Larger cube: $\\dfrac{6 \\times ${big}^2}{${big}^3} = \\dfrac{6}{${big}} = ${fmt(6 / big, 3)}$.`, `Smaller cube: $\\dfrac{6}{${fmt(small)}} = ${fmt(6 / small, 3)}$.`, `$${fmt(6 / small, 3)} \\div ${fmt(6 / big, 3)} = ${factor}$. When the side is ${factor} times smaller, the ratio is ${factor} times greater.`],
      calculator: true,
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'A catalyst works at its surface. Why is a smaller mass of catalyst needed when it is made of nanoparticles?', right: 'Nanoparticles have a very large surface area for their volume', wrong: ['Nanoparticles are heavier than ordinary particles', 'Nanoparticles are a different element', 'Nanoparticles have no surface'], sol: 'The smaller a particle, the greater its surface area to volume ratio. A catalyst made of nanoparticles exposes far more surface for each gram.' },
      { ask: 'Nanoparticles of zinc oxide are used in some sun creams. What is a possible risk that is still being studied?', right: 'The particles are small enough to pass through the skin, and their effects in the body are not fully known', wrong: ['The particles are too large to spread on the skin', 'The particles are radioactive', 'The particles make the cream explode in sunlight'], sol: 'Nanoparticles can behave differently from the same material in bulk, and their long-term effects on cells and on the environment are not yet fully understood.' },
      { ask: 'A material may have different properties as nanoparticles than in bulk. What is the main reason?', right: 'A much greater fraction of its atoms are at the surface', wrong: ['Its atoms are a different element', 'Its atoms are smaller', 'It contains no atoms at the surface'], sol: 'Because of the high surface area to volume ratio, a large share of the atoms in a nanoparticle are at the surface, where they can react or interact.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 6.1: corrosion, alloys and materials

function corrosion(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Iron rusts only when both oxygen (air) and water are present.', 'A barrier keeps air and water out. A more reactive metal corrodes in place of the iron.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which two substances must both be present for iron to rust?', right: 'Oxygen and water', wrong: ['Oxygen and carbon dioxide', 'Water and nitrogen', 'Salt and nitrogen'], sol: 'Rusting needs both air (for its oxygen) and water. Without either one, iron does not rust.' },
        { ask: 'What is corrosion?', right: 'The destruction of a material by chemical reactions with substances in the environment', wrong: ['The melting of a metal when it is heated', 'The bending of a metal under a load', 'The mixing of two metals to make an alloy'], sol: 'Corrosion is the destruction of materials by chemical reactions with substances in the environment. Rusting is the corrosion of iron.' },
        { ask: 'Painting an iron gate stops it rusting. How?', right: 'The paint is a barrier that keeps air and water away from the iron', wrong: ['The paint reacts with the rust and removes it', 'The paint is more reactive than the iron', 'The paint makes the iron into an alloy'], sol: 'Paint, grease and electroplating are barriers: they stop oxygen and water reaching the iron.' },
        { ask: 'Which of these is **not** a barrier method of preventing rust?', right: 'Bolting a block of magnesium to the iron', wrong: ['Painting the iron', 'Coating the iron with grease', 'Electroplating the iron with another metal'], sol: 'A block of magnesium does not cover the iron. It protects it by sacrificial protection: the more reactive magnesium corrodes in place of the iron.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    // The three test tubes.
    const tubes = [
      { text: 'in tap water, open to the air', rusts: true, why: 'both water and oxygen reach the nail' },
      { text: 'in boiled water, under a layer of oil', rusts: false, why: 'boiling drives out the dissolved air and the oil keeps air out, so there is water but no oxygen' },
      { text: 'in dry air, with a drying agent', rusts: false, why: 'the drying agent removes the water, so there is oxygen but no water' },
    ];
    if (rng.chance(0.5)) {
      const t = rng.pick(tubes);
      return {
        prompt: `An iron nail is left for a week ${t.text}. Does it rust, and why?`,
        parts: [part(mc(rng, t.rusts ? 'Yes: both oxygen and water are present' : t.text.includes('oil') ? 'No: there is water but no oxygen' : 'No: there is oxygen but no water', ['Yes: both oxygen and water are present', 'No: there is water but no oxygen', 'No: there is oxygen but no water', 'Yes: iron rusts wherever it is left'].filter((x) => x !== (t.rusts ? 'Yes: both oxygen and water are present' : t.text.includes('oil') ? 'No: there is water but no oxygen' : 'No: there is oxygen but no water'))))],
        hints,
        solution: [`${t.rusts ? 'The nail rusts' : 'The nail does not rust'}: ${t.why}.`],
      };
    }
    return fromBank(
      rng,
      [
        { ask: 'Blocks of zinc are bolted to the steel hull of a ship. How do they protect the steel?', right: 'Zinc is more reactive than iron, so the zinc corrodes in place of the steel', wrong: ['Zinc is less reactive than iron, so it never corrodes', 'The zinc covers the whole hull and keeps water out', 'Zinc removes the salt from the sea water'], sol: 'This is sacrificial protection. The more reactive metal reacts with the oxygen and water, and the iron is left alone.' },
        { ask: 'Galvanised steel is coated with zinc. If the coating is scratched, the steel underneath still does not rust. Why?', right: 'The zinc is more reactive than iron, so it still corrodes first', wrong: ['The scratch heals itself', 'Zinc is less reactive than iron', 'Steel cannot rust once it has been coated'], sol: 'Galvanising works in two ways: the zinc is a barrier, and where the barrier is broken it gives sacrificial protection.' },
        { ask: 'Aluminium is more reactive than iron, yet aluminium window frames do not corrode away. Why?', right: 'A thin layer of aluminium oxide forms on the surface and protects the metal beneath', wrong: ['Aluminium does not react with oxygen at all', 'Aluminium is always painted', 'Aluminium is less dense than iron'], sol: 'Aluminium reacts quickly with oxygen, but the oxide forms a tough, thin coating that sticks to the metal and keeps air and water out.' },
      ],
      hints,
    );
  }
  // Choose the sacrificial metal from a stated series.
  const series = ['magnesium', 'zinc', 'iron', 'tin', 'copper'];
  const key = `Order of reactivity, most reactive first: ${series.join(', ')}.`;
  if (rng.chance(0.5)) {
    const options = rng.shuffle(['magnesium', 'zinc', 'tin', 'copper']);
    const rightOnes = options.filter((m) => series.indexOf(m) < 2);
    const pickOne = rng.pick(rightOnes);
    const wrongOnes = options.filter((m) => series.indexOf(m) > 2);
    return {
      prompt: `${key} Which of these metals would give **sacrificial protection** to an iron pipe?`,
      parts: [part(mc(rng, cap(pickOne), [...wrongOnes.map(cap), 'None of them: only paint can protect iron']))],
      hints,
      solution: [`A sacrificial metal must be more reactive than iron, so that it corrodes first. ${cap(pickOne)} is above iron in the order. Tin and copper are below it.`],
    };
  }
  return {
    prompt: `${key} Food cans are made of steel coated with tin. What happens if the tin coating is scratched through to the steel?`,
    parts: [part(mc(rng, 'The steel rusts, because tin is less reactive than iron and gives no sacrificial protection', ['The steel does not rust, because tin is more reactive than iron', 'The tin rusts in place of the steel', 'Nothing: steel cannot rust inside a can']))],
    hints,
    solution: ['Tin protects only as a barrier. It is less reactive than iron, so once the barrier is broken the iron corrodes.'],
  };
}

function alloysMaterials(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['An alloy is a mixture of a metal with other elements. It is harder than the pure metal.', 'Pure gold is 24 carat. The carat number tells you how many parts in 24 are gold.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is an alloy?', right: 'A mixture of a metal with at least one other element', wrong: ['A compound of a metal with oxygen', 'A pure metal with no impurities', 'A metal that has been melted and cooled'], sol: 'An alloy is a mixture of a metal with one or more other elements, usually other metals or carbon.' },
        { ask: 'Bronze is an alloy of which two metals?', right: 'Copper and tin', wrong: ['Copper and zinc', 'Iron and carbon', 'Gold and silver'], sol: 'Bronze is copper and tin. Brass is copper and zinc. Steel is iron with carbon.' },
        { ask: 'Brass is an alloy of which two metals?', right: 'Copper and zinc', wrong: ['Copper and tin', 'Iron and chromium', 'Aluminium and magnesium'], sol: 'Brass is copper and zinc. Bronze is copper and tin.' },
        { ask: 'Steels are alloys of iron with which non-metal?', right: 'Carbon', wrong: ['Oxygen', 'Sulfur', 'Chlorine'], sol: 'Steels are alloys of iron that contain measured amounts of carbon, and often other metals.' },
        { ask: 'Which two metals are added to iron to make stainless steel, which is hard and resists corrosion?', right: 'Chromium and nickel', wrong: ['Copper and tin', 'Sodium and potassium', 'Gold and silver'], sol: 'Stainless steels contain chromium and nickel. They are hard and do not rust.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      // Carat gold.
      const carat = rng.pick([9, 12, 15, 18, 21, 22]);
      const pc = (carat / 24) * 100;
      return {
        prompt: `Pure gold is called 24 carat. In ${carat} carat gold, ${carat} parts in every 24, by mass, are gold. What percentage of ${carat} carat gold is gold? Give your answer to 1 decimal place.`,
        parts: [numPart(pc, { decimals: 1, suffix: '%' })],
        hints,
        solution: [`Percentage of gold $= \\dfrac{${carat}}{24} \\times 100 = ${fmt(pc, 1)}\\%$.`],
        calculator: true,
      };
    }
    return fromBank(
      rng,
      [
        { ask: 'Why is an alloy harder than the pure metal?', right: 'Atoms of different sizes distort the layers, so the layers cannot slide over each other easily', wrong: ['The atoms in an alloy are joined by covalent bonds', 'The atoms in an alloy are all the same size', 'An alloy contains no layers of atoms'], sol: 'In a pure metal the layers of identical atoms slide easily, so the metal is soft. Atoms of another size disrupt the layers and make sliding harder.' },
        { ask: 'High carbon steel is strong but brittle. Low carbon steel is softer. Which would be chosen for the body of a car, which must be pressed into shape?', right: 'Low carbon steel, because it is easily shaped', wrong: ['High carbon steel, because it is brittle', 'High carbon steel, because it cannot be bent', 'Neither: steel cannot be shaped'], sol: 'Low carbon steel is softer and more easily shaped. High carbon steel is used where hardness matters, as in cutting tools.' },
        { ask: 'Why is pure gold not used for rings that are worn every day?', right: 'It is too soft, so it is alloyed with other metals to make it harder', wrong: ['It reacts with the air and turns green', 'It melts at body temperature', 'It is too hard to be shaped'], sol: 'Pure gold is soft and wears away. Alloying it with silver, copper and zinc makes it harder.' },
      ],
      hints,
    );
  }
  if (rng.chance(0.35)) {
    const carat = rng.pick([9, 18, 22]);
    const mass = rng.pick([4, 6, 8, 12, 20]);
    const gold = (mass * carat) / 24;
    return {
      prompt: `Pure gold is 24 carat. A ring made of ${carat} carat gold has a mass of ${q(mass, 'g')}. In ${carat} carat gold, ${carat} parts in every 24, by mass, are gold. What mass of gold is in the ring? Give your answer to 2 decimal places.`,
      parts: [numPart(gold, { decimals: 2, suffix: 'g' })],
      hints,
      solution: [`Mass of gold $= ${mass} \\times \\dfrac{${carat}}{24} = ${fmt(gold, 2)}\\ \\text{g}$.`],
      calculator: true,
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'What is a composite?', right: 'A material made of a reinforcement, such as fibres, held in a matrix of another material', wrong: ['A pure metal that has been heated', 'A compound of two non-metals', 'A polymer that melts when it is heated'], sol: 'A composite has two parts: fibres or fragments (the reinforcement) surrounded by a binder (the matrix). Fibreglass and reinforced concrete are examples.' },
      { ask: 'A thermosoftening polymer melts when it is heated, and a thermosetting polymer does not. What explains the difference?', right: 'A thermosetting polymer has strong cross-links between its chains', wrong: ['A thermosoftening polymer has cross-links between its chains', 'A thermosetting polymer is made of smaller molecules', 'A thermosoftening polymer contains metal atoms'], sol: 'In a thermosoftening polymer the chains are held by weak forces and can slide apart when heated. Cross-links in a thermosetting polymer hold the chains in place.' },
      { ask: 'Borosilicate glass melts at a higher temperature than soda-lime glass. Which is the better choice for laboratory glassware that is heated?', right: 'Borosilicate glass, because it withstands higher temperatures', wrong: ['Soda-lime glass, because it melts more easily', 'Soda-lime glass, because it is used for windows', 'Neither: glass cannot be heated'], sol: 'Soda-lime glass, made from sand, sodium carbonate and limestone, is used for windows and bottles. Borosilicate glass, made from sand and boron trioxide, withstands much higher temperatures.' },
      { ask: 'Low density and high density poly(ethene) are made from the same monomer, ethene. Why do they have different properties?', right: 'They are made under different conditions, so their chains pack together differently', wrong: ['They are made from different elements', 'One is a metal and the other is a ceramic', 'One contains cross-links of sulfur'], sol: 'The conditions of the reaction (temperature, pressure and catalyst) decide how branched the chains are. Branched chains pack loosely, giving a lower density.' },
      { ask: 'Pottery and bricks are clay ceramics. How are they made?', right: 'Wet clay is shaped and then heated in a furnace', wrong: ['Sand is melted and blown into shape', 'Ethene is polymerised under pressure', 'Iron is mixed with carbon'], sol: 'Clay ceramics are made by shaping wet clay and then firing it in a furnace, which makes it hard.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 6.2: the Haber process and fertilisers

/** The conditions these questions state for the Haber process. */
const HABER_KEY = 'In the Haber process, nitrogen and hydrogen react at about 450 °C and 200 atmospheres, with an iron catalyst: $\\ce{N2 + 3H2 <=> 2NH3}$. The forward reaction is exothermic.';

function haber(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Nitrogen comes from the air. Hydrogen comes from natural gas.', 'The reaction is reversible: unreacted gases are recycled.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is made in the Haber process?', right: 'Ammonia', wrong: ['Nitric acid', 'Sulfuric acid', 'Chlorine'], sol: 'The Haber process makes ammonia, $\\ce{NH3}$, from nitrogen and hydrogen.' },
        { ask: 'Where does the nitrogen for the Haber process come from?', right: 'The air', wrong: ['Natural gas', 'Sea water', 'Limestone'], sol: 'Air is about 78% nitrogen, so it is the source of the nitrogen.' },
        { ask: 'Where does the hydrogen for the Haber process usually come from?', right: 'Natural gas', wrong: ['The air', 'Limestone', 'Iron ore'], sol: 'Hydrogen is made from natural gas (methane) reacting with steam.' },
        { ask: 'Which catalyst is used in the Haber process?', right: 'Iron', wrong: ['Copper', 'Sodium', 'Carbon'], sol: 'An iron catalyst speeds up the reaction.' },
        { ask: 'What is the main use of the ammonia made in the Haber process?', right: 'Making fertilisers', wrong: ['Making plastics', 'Fuel for cars', 'Making glass'], sol: 'Most ammonia is turned into nitrogen-based fertilisers, such as ammonium nitrate.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: `${HABER_KEY} The gases leaving the reactor are cooled. What happens?`, right: 'The ammonia turns to a liquid and is removed; the unreacted nitrogen and hydrogen are recycled', wrong: ['The nitrogen turns to a liquid and is removed; the ammonia is recycled', 'All three gases turn to liquids and are thrown away', 'The ammonia turns back into nitrogen and hydrogen'], sol: 'Ammonia condenses more easily than nitrogen or hydrogen. It is run off as a liquid, and the unreacted gases go back into the reactor so that none is wasted.' },
        { ask: `${HABER_KEY} What does the symbol $\\ce{<=>}$ show?`, right: 'The reaction is reversible: ammonia also breaks down into nitrogen and hydrogen', wrong: ['The reaction is very fast', 'The reaction needs a catalyst', 'The reaction gives out heat'], sol: 'The double arrow shows a reversible reaction. Some of the ammonia breaks down again, so the gases are never completely converted.' },
        { ask: `${HABER_KEY} How many molecules of hydrogen react with one molecule of nitrogen?`, right: '3', wrong: ['1', '2', '6'], sol: 'The balanced equation shows one $\\ce{N2}$ reacting with three $\\ce{H2}$ to make two $\\ce{NH3}$.' },
        { ask: `${HABER_KEY} Why is a catalyst used?`, right: 'It makes the reaction faster, so a lower temperature can be used', wrong: ['It increases the amount of ammonia in the equilibrium mixture', 'It stops the reaction being reversible', 'It supplies the nitrogen'], sol: 'A catalyst speeds up the forward and backward reactions equally. It does not change the yield, but the equilibrium is reached more quickly.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: `${HABER_KEY} A lower temperature would give a higher yield of ammonia. Why is a temperature as high as 450 °C used?`, right: 'At a lower temperature the reaction would be too slow', wrong: ['At a lower temperature the yield would fall', 'At a lower temperature the iron would melt', 'At a lower temperature nitrogen is not a gas'], sol: 'The temperature is a compromise. A low temperature favours the exothermic forward reaction but makes it slow; 450 °C gives a reasonable yield at a reasonable rate.' },
      { ask: `${HABER_KEY} A higher pressure gives a higher yield of ammonia. Why is the pressure not raised far above 200 atmospheres?`, right: 'Very high pressures need stronger, more expensive equipment and more energy', wrong: ['A higher pressure lowers the yield', 'A higher pressure stops the catalyst working', 'A higher pressure turns the hydrogen into a liquid'], sol: 'The pressure is a compromise between yield and cost. Plant that withstands very high pressures is expensive to build and run, and less safe.' },
      { ask: `${HABER_KEY} Why does a higher pressure give a higher yield of ammonia?`, right: 'There are fewer molecules of gas on the right of the equation, and a higher pressure favours that side', wrong: ['There are more molecules of gas on the right of the equation', 'Pressure makes the catalyst more active', 'Pressure makes the reaction endothermic'], sol: 'Four molecules of gas ($\\ce{N2 + 3H2}$) become two ($\\ce{2NH3}$). Raising the pressure moves the equilibrium towards the side with fewer molecules.' },
      { ask: `${HABER_KEY} Why does a higher temperature give a **lower** yield of ammonia?`, right: 'The forward reaction is exothermic, so heating favours the backward reaction', wrong: ['The forward reaction is endothermic, so heating favours it', 'The catalyst is used up at high temperatures', 'Nitrogen stops reacting when it is hot'], sol: 'Raising the temperature moves the equilibrium in the endothermic direction. Here that is the backward reaction, which breaks ammonia down.' },
    ],
    hints,
  );
}

const FERTILISERS = [
  { name: 'ammonium nitrate', f: 'NH4NO3', acid: 'nitric acid' },
  { name: 'ammonium sulfate', f: '(NH4)2SO4', acid: 'sulfuric acid' },
  { name: 'ammonium phosphate', f: '(NH4)3PO4', acid: 'phosphoric acid' },
  { name: 'potassium nitrate', f: 'KNO3', acid: 'nitric acid' },
  { name: 'urea', f: 'CH4N2O', acid: '' },
];

function fertilisers(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['N, P and K: nitrogen, phosphorus and potassium.', 'Percentage by mass = (mass of the element in the formula ÷ relative formula mass) × 100.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which three elements does an NPK fertiliser supply?', right: 'Nitrogen, phosphorus and potassium', wrong: ['Nitrogen, potassium and krypton', 'Sodium, phosphorus and potassium', 'Nitrogen, lead and calcium'], sol: 'N is nitrogen, P is phosphorus and K is potassium (from its Latin name, kalium).' },
        { ask: 'Why do farmers add fertilisers to the soil?', right: 'To replace the elements that crops take out, so that the crops grow better', wrong: ['To kill insects that eat the crops', 'To make the soil more acidic', 'To stop the soil drying out'], sol: 'Plants take in compounds of nitrogen, phosphorus and potassium through their roots. Fertilisers put these elements back and improve the yield.' },
        { ask: 'An NPK fertiliser is a mixture of compounds in measured amounts. What kind of product is it?', right: 'A formulation', wrong: ['A pure substance', 'An element', 'An alloy'], sol: 'A formulation is a mixture designed as a useful product, with each part in a measured amount. NPK fertilisers are formulations of various salts.' },
        { ask: 'Ammonia reacts with nitric acid to make a fertiliser. What is the fertiliser?', right: 'Ammonium nitrate', wrong: ['Ammonium sulfate', 'Potassium chloride', 'Calcium phosphate'], sol: 'Ammonia is a base. It neutralises nitric acid to make the salt ammonium nitrate.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const f = rng.pick(FERTILISERS.filter((x) => x.acid && x.name.startsWith('ammonium')));
      const acids = ['nitric acid', 'sulfuric acid', 'phosphoric acid', 'hydrochloric acid'];
      return {
        prompt: `Which acid reacts with ammonia to make **${f.name}**?`,
        parts: [part(mc(rng, cap(f.acid), acids.filter((a) => a !== f.acid).map(cap)))],
        hints: ['The second part of a salt’s name comes from the acid.', 'Nitric acid makes nitrates, sulfuric acid sulfates and phosphoric acid phosphates.'],
        solution: [`The name ends in ${f.name.split(' ')[1]}, so the acid is ${f.acid}.`],
      };
    }
    return fromBank(
      rng,
      [
        { ask: 'Potassium chloride and potassium sulfate are used in fertilisers. How are they obtained?', right: 'They are mined from the ground and used without further reaction', wrong: ['They are made in the Haber process', 'They are made by treating phosphate rock with acid', 'They are extracted from the air'], sol: 'Potassium chloride and potassium sulfate are mined and can be used directly. Phosphate rock is mined too, but it must be treated with acid first.' },
        { ask: 'Phosphate rock cannot be used as a fertiliser as it is. Why not?', right: 'It does not dissolve in water, so plants cannot take it in', wrong: ['It contains no phosphorus', 'It is a gas at room temperature', 'It reacts violently with water'], sol: 'Plants take in dissolved compounds through their roots. Phosphate rock is insoluble, so it is treated with an acid to make soluble salts.' },
        { ask: 'Phosphate rock is treated with nitric acid. Which products form?', right: 'Phosphoric acid and calcium nitrate', wrong: ['Calcium sulfate and calcium phosphate', 'Calcium phosphate only', 'Ammonia and water'], sol: 'With nitric acid, phosphate rock gives phosphoric acid and calcium nitrate. With sulfuric acid it gives single superphosphate, and with phosphoric acid triple superphosphate.' },
      ],
      hints,
    );
  }
  // Percentage of nitrogen by mass.
  const f = rng.pick(FERTILISERS);
  const n = atomsOf(f.f).find(([el]) => el === 'N')![1];
  const M = mr(f.f);
  const pc = ((n * AR.N) / M) * 100;
  return {
    prompt: `What percentage of the mass of ${f.name}, ${$(f.f)}, is nitrogen? ${arText(f.f)} Give your answer to 1 decimal place.`,
    parts: [numPart(pc, { decimals: 1, suffix: '%' })],
    hints,
    solution: [
      `Relative formula mass of ${$(f.f)}: $${mrWorking(f.f).includes('=') ? mrWorking(f.f) : M}$.`,
      `Nitrogen in one formula unit: $${n === 1 ? '14' : `${n} \\times 14 = ${n * 14}`}$.`,
      `Percentage of nitrogen $= \\dfrac{${n * 14}}{${fmt(M)}} \\times 100 = ${fmt(pc, 1)}\\%$.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 6.3: hydrogen fuel cells

function fuelCells(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['In a hydrogen fuel cell, hydrogen and oxygen react to make water, and the reaction produces a voltage.', 'Hydrogen is oxidised at one electrode: it loses electrons.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is the only chemical product of a hydrogen fuel cell?', right: 'Water', wrong: ['Carbon dioxide', 'Hydrogen peroxide', 'Carbon monoxide'], sol: 'Hydrogen and oxygen react to make water: $\\ce{2H2 + O2 -> 2H2O}$.' },
        { ask: 'Which two substances are supplied to a hydrogen fuel cell?', right: 'Hydrogen and oxygen (or air)', wrong: ['Hydrogen and carbon dioxide', 'Petrol and oxygen', 'Water and nitrogen'], sol: 'The fuel is hydrogen, and it reacts with oxygen, which is usually taken from the air.' },
        { ask: 'What does a fuel cell produce that makes it useful?', right: 'A potential difference (voltage), which drives an electric current', wrong: ['A flame, which heats water', 'Light, which charges a solar panel', 'A gas, which pushes a piston'], sol: 'A fuel cell turns the energy of a chemical reaction directly into electricity, without burning the fuel.' },
        { ask: 'How long does a hydrogen fuel cell keep producing a voltage?', right: 'For as long as hydrogen and oxygen are supplied', wrong: ['Until it has been recharged from the mains', 'For exactly one hour', 'Until its electrodes dissolve'], sol: 'A fuel cell does not run down like a battery. It works as long as fuel and oxygen are fed into it.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'What is the overall equation for the reaction in a hydrogen fuel cell?', right: eq('2H2 + O2 -> 2H2O'), wrong: [eq('H2 + O2 -> H2O2'), eq('2H2O -> 2H2 + O2'), eq('CH4 + 2O2 -> CO2 + 2H2O')], sol: `Hydrogen is oxidised by oxygen to water: ${eq('2H2 + O2 -> 2H2O')}.` },
        { ask: 'A car powered by a hydrogen fuel cell gives out no carbon dioxide as it drives. Why might the hydrogen still have a carbon footprint?', right: 'The hydrogen is often made from natural gas, or with electricity from fossil fuels', wrong: ['Hydrogen contains carbon atoms', 'The fuel cell burns petrol to start', 'Water is a greenhouse gas made of carbon'], sol: 'Hydrogen has to be made. Making it from methane releases carbon dioxide, and making it by electrolysis needs electricity, which may come from burning fossil fuels.' },
        { ask: 'What is one advantage of a hydrogen fuel cell over a rechargeable battery in a car?', right: 'It can be refuelled in a few minutes, and it does not lose capacity with repeated recharging', wrong: ['Hydrogen is easier to store than electricity', 'It needs no fuel at all', 'It is cheaper to build in every case'], sol: 'Filling a tank with hydrogen is quick, while a battery takes much longer to recharge and stores less charge as it ages.' },
        { ask: 'What is one disadvantage of a hydrogen fuel cell in a car?', right: 'Hydrogen is a flammable gas that is hard to store, needing strong tanks at high pressure', wrong: ['It gives out carbon monoxide', 'It produces sulfur dioxide and acid rain', 'It can only be used once'], sol: 'Hydrogen takes up a large volume unless it is compressed, and it forms explosive mixtures with air, so storing and supplying it is difficult.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'In a hydrogen fuel cell with an acidic electrolyte, what happens to the hydrogen at the negative electrode?', right: `It is oxidised: ${eq('2H2 -> 4H+ + 4e-')}`, wrong: [`It is reduced: ${eq('2H2 + 4e- -> 4H-')}`, `It is oxidised: ${eq('O2 + 4H+ + 4e- -> 2H2O')}`, `It is reduced: ${eq('2H+ + 2e- -> H2')}`], sol: `Hydrogen loses electrons, which is oxidation: ${eq('2H2 -> 4H+ + 4e-')}. The electrons flow round the circuit to the other electrode.` },
      { ask: 'In a hydrogen fuel cell with an acidic electrolyte, what happens to the oxygen at the positive electrode?', right: `It is reduced: ${eq('O2 + 4H+ + 4e- -> 2H2O')}`, wrong: [`It is oxidised: ${eq('2H2 -> 4H+ + 4e-')}`, `It is oxidised: ${eq('O2 -> 2O^2+ + 4e-')}`, `It is reduced: ${eq('2H2O -> O2 + 4H+ + 4e-')}`], sol: `Oxygen gains electrons and joins with hydrogen ions to make water, which is reduction: ${eq('O2 + 4H+ + 4e- -> 2H2O')}.` },
      { ask: `The half equations in a hydrogen fuel cell are ${eq('2H2 -> 4H+ + 4e-')} and ${eq('O2 + 4H+ + 4e- -> 2H2O')}. What do they add up to?`, right: eq('2H2 + O2 -> 2H2O'), wrong: [eq('2H2 + O2 -> 2H2O + 4e-'), eq('H2 + O2 -> H2O'), eq('4H+ + O2 -> 2H2O')], sol: `The four electrons and the four hydrogen ions appear on both sides and cancel, leaving ${eq('2H2 + O2 -> 2H2O')}.` },
      { ask: 'In a fuel cell the hydrogen does not burn. Why is that an advantage over burning hydrogen in an engine?', right: 'More of the energy is transferred as electricity, and no oxides of nitrogen are made in a hot flame', wrong: ['Burning hydrogen makes carbon dioxide', 'Hydrogen cannot burn in air', 'A fuel cell needs no oxygen'], sol: 'A fuel cell converts chemical energy directly to electricity at a low temperature. An engine wastes more energy as heat, and its high temperature makes oxides of nitrogen from the air.' },
    ],
    hints,
  );
}

function compareCells(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A cell contains chemicals that react to produce electricity. A battery is two or more cells joined in series.', 'In a rechargeable cell the reaction can be reversed by an electric current.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is a battery?', right: 'Two or more cells connected in series to give a greater voltage', wrong: ['A single cell with one electrode', 'A fuel tank for hydrogen', 'A cell that has stopped working'], sol: 'A battery consists of two or more cells connected in series, so that their voltages add up.' },
        { ask: 'Why does a non-rechargeable cell eventually stop working?', right: 'One of its reactants is used up', wrong: ['Its electrons leak out', 'Its electrolyte freezes', 'It runs out of oxygen from the air'], sol: 'The cell produces a voltage only while its chemicals react. When one reactant has been used up, the reaction stops.' },
        { ask: 'What makes a cell rechargeable?', right: 'Its chemical reaction can be reversed by passing an electric current through it', wrong: ['It contains more chemicals than other cells', 'It can be refilled with hydrogen', 'It never uses up its reactants'], sol: 'In a rechargeable cell, an external current drives the reaction backwards and restores the reactants.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    // Voltage of cells in series, stated values.
    const v = rng.pick([1.2, 1.5, 2, 3.6]);
    const n = rng.pick([2, 3, 4, 6]);
    return {
      prompt: `A battery is made of ${n} identical cells connected in series. Each cell gives ${q(fmt(v), 'V')}. Cells in series add their voltages. What is the voltage of the battery?`,
      parts: [numPart(v * n, { decimals: 1, suffix: 'V' })],
      hints,
      solution: [`Voltage $= ${n} \\times ${fmt(v)} = ${fmt(v * n, 1)}\\ \\text{V}$.`],
    };
  }
  if (rng.chance(0.5)) {
    // Which pair of metals gives the biggest voltage, from a stated series.
    const series = ['magnesium', 'zinc', 'iron', 'tin', 'copper'];
    const pairs = rng.sample(
      [
        [0, 4],
        [1, 4],
        [2, 4],
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [0, 2],
      ],
      3,
    );
    const gaps = pairs.map(([a, b]) => b - a);
    if (new Set(gaps).size < 3) return compareCells(rng, d);
    const biggest = rng.chance(0.5);
    const target = gaps.indexOf(biggest ? Math.max(...gaps) : Math.min(...gaps));
    return {
      prompt: `Order of reactivity, most reactive first: ${series.join(', ')}. The further apart two metals are in this order, the greater the voltage of a cell made from them. Which pair of metals gives the **${biggest ? 'greatest' : 'smallest'}** voltage?`,
      parts: [part(fixedChoice(pairs.map(([a, b]) => `${cap(series[a])} and ${series[b]}`), target))],
      hints: ['Count how many places apart the two metals are in the order.', 'A bigger difference in reactivity gives a bigger voltage.'],
      solution: [`${pairs.map(([a, b], i) => `${cap(series[a])} and ${series[b]} are ${gaps[i]} place${gaps[i] === 1 ? '' : 's'} apart`).join('. ')}. The ${biggest ? 'greatest' : 'smallest'} gap gives the ${biggest ? 'greatest' : 'smallest'} voltage.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Which statement compares a hydrogen fuel cell with a rechargeable battery correctly?', right: 'The fuel cell needs a supply of fuel; the battery is recharged with electricity', wrong: ['The fuel cell is recharged with electricity; the battery needs a supply of fuel', 'Both need a supply of hydrogen', 'Neither produces a voltage'], sol: 'A fuel cell works for as long as hydrogen and oxygen are fed in. A rechargeable battery stores a fixed amount of chemicals, which are restored by charging.' },
      { ask: 'A delivery van must run all day with stops of only a few minutes. Which is the stronger argument for a hydrogen fuel cell over a battery?', right: 'The hydrogen tank can be refilled in minutes, while a battery takes much longer to recharge', wrong: ['Hydrogen is found pure in the ground', 'A fuel cell gives out carbon dioxide', 'A battery cannot power a motor'], sol: 'Short refuelling times suit vehicles that are in use all day. The drawback is that hydrogen filling stations are scarce and hydrogen is hard to store.' },
      { ask: 'What two things decide the voltage of a simple cell?', right: 'The metals used for the electrodes, and the electrolyte', wrong: ['The size of the beaker, and the colour of the wires', 'The mass of the electrodes only', 'The temperature of the room only'], sol: 'The voltage depends on the type of electrodes, especially the difference in reactivity of the two metals, and on the electrolyte.' },
    ],
    hints,
  );
}

export const STRUCTURE_SKILLS: SkillDef[] = [
  skill({ id: 'cx-atomic-model', name: 'The development of the atomic model', description: 'Describe how the model of the atom changed, and the evidence from alpha particle scattering.', outcomes: ['AS1'], lessonId: L5(1), gen: atomicModel }),
  skill({ id: 'cx-periodic-history', name: 'The development of the periodic table', description: 'Explain how Mendeleev arranged the elements, and why atomic number gives the modern order.', outcomes: ['AS1'], lessonId: L5(1), gen: periodicHistory }),
  skill({ id: 'cx-transition-properties', name: 'Transition metals and alkali metals', description: 'Compare the physical properties and reactivity of the transition metals with the alkali metals.', outcomes: ['AS2'], lessonId: L5(2), gen: transitionProps }),
  skill({ id: 'cx-transition-compounds', name: 'Compounds of the transition metals', description: 'Recognise coloured compounds, ions of different charges and catalysts, and write formulas from Roman numerals.', outcomes: ['AS2'], lessonId: L5(2), gen: transitionCompounds }),
  skill({ id: 'cx-carbon-structures', name: 'Diamond, graphite, graphene and fullerenes', description: 'Explain the properties of the forms of carbon from their structures and bonding.', outcomes: ['AS3'], lessonId: L5(3), gen: carbonStructures }),
  skill({ id: 'cx-nanoparticles', name: 'Nanoparticles', description: 'Recognise the size of nanoparticles, and calculate and use surface area to volume ratios.', outcomes: ['AS3'], lessonId: L5(3), gen: nanoparticles }),
];

export const INDUSTRY_SKILLS: SkillDef[] = [
  skill({ id: 'cx-corrosion', name: 'Corrosion and its prevention', description: 'Say what iron needs in order to rust, and explain barrier methods and sacrificial protection.', outcomes: ['MI1'], lessonId: L6(1), gen: corrosion }),
  skill({ id: 'cx-alloys-materials', name: 'Alloys, ceramics, polymers and composites', description: 'Explain why alloys are harder than pure metals, work with carat gold, and compare other materials.', outcomes: ['MI1'], lessonId: L6(1), gen: alloysMaterials }),
  skill({ id: 'cx-haber', name: 'The Haber process', description: 'Describe how ammonia is made, and explain the compromise conditions of the process.', outcomes: ['MI2'], lessonId: L6(2), gen: haber }),
  skill({ id: 'cx-fertilisers', name: 'NPK fertilisers', description: 'Say what NPK fertilisers supply and how their compounds are made, and calculate the percentage of nitrogen in one.', outcomes: ['MI2'], lessonId: L6(2), gen: fertilisers }),
  skill({ id: 'cx-fuel-cells', name: 'Hydrogen fuel cells', description: 'Describe the reaction in a hydrogen fuel cell, with its half equations, and its advantages and disadvantages.', outcomes: ['MI3'], lessonId: L6(3), gen: fuelCells }),
  skill({ id: 'cx-cells-batteries', name: 'Cells and batteries', description: 'Compare non-rechargeable cells, rechargeable cells and fuel cells, and work out the voltage of a battery.', outcomes: ['MI3'], lessonId: L6(3), gen: compareCells }),
];
