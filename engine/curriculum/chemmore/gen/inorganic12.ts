/**
 * More Chemistry Topics, Unit 8 (A level, first year): inorganic chemistry. The trends across
 * Period 3 in atomic radius, ionisation energy and melting point, Group 2 and the uses of its
 * compounds, and Group 7 with the reactions of the halide ions and the uses of chlorine. Melting
 * points and relative atomic masses are stated in the questions that use them.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { cap, fromBank } from './common.ts';

const L = (n: number) => `cx-8-${n}`;

// ---------------------------------------------------------------------------- lesson 8.1: Period 3

/** The Period 3 elements: structure and melting point in °C, as these questions state them. */
const P3 = [
  { sym: 'Na', name: 'sodium', structure: 'metallic', mp: 98 },
  { sym: 'Mg', name: 'magnesium', structure: 'metallic', mp: 650 },
  { sym: 'Al', name: 'aluminium', structure: 'metallic', mp: 660 },
  { sym: 'Si', name: 'silicon', structure: 'giant covalent (macromolecular)', mp: 1414 },
  { sym: 'P', name: 'phosphorus', structure: 'simple molecular', mp: 44 },
  { sym: 'S', name: 'sulfur', structure: 'simple molecular', mp: 115 },
  { sym: 'Cl', name: 'chlorine', structure: 'simple molecular', mp: -101 },
  { sym: 'Ar', name: 'argon', structure: 'monatomic', mp: -189 },
];
const STRUCTURES = ['metallic', 'giant covalent (macromolecular)', 'simple molecular', 'monatomic'];
/** Why an element of each structure melts where it does. */
const REASON: Record<string, string> = {
  Na: 'Sodium is metallic, with ions of charge 1+ and one delocalised electron per atom, so its metallic bonding is the weakest of the three metals.',
  Mg: 'Magnesium is metallic, with 2+ ions and two delocalised electrons per atom, so its metallic bonding is stronger than sodium’s.',
  Al: 'Aluminium is metallic, with small 3+ ions and three delocalised electrons per atom, so its metallic bonding is the strongest of the three metals.',
  Si: 'Silicon is giant covalent: melting it means breaking many strong covalent bonds.',
  P: 'Phosphorus is made of $\\ce{P4}$ molecules, held by weak van der Waals forces.',
  S: 'Sulfur is made of $\\ce{S8}$ molecules. They are larger than $\\ce{P4}$, with more electrons, so their van der Waals forces are stronger.',
  Cl: 'Chlorine is made of small $\\ce{Cl2}$ molecules, with weak van der Waals forces between them.',
  Ar: 'Argon exists as single atoms, with very weak van der Waals forces between them.',
};

function period3Trends(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Across Period 3 the nuclear charge rises by one each time, while the outer electrons stay in the third shell with the same shielding.', 'So the outer electrons are pulled in more tightly: the atoms get smaller and harder to ionise.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'How does the atomic radius change across Period 3, from sodium to chlorine?', right: 'It decreases', wrong: ['It increases', 'It stays the same', 'It increases and then decreases'], sol: 'The nuclear charge increases across the period while the shielding stays about the same, so the outer electrons are pulled closer to the nucleus.' },
        { ask: 'Which element in Period 3 has the largest atomic radius?', right: 'Sodium', wrong: ['Chlorine', 'Argon', 'Silicon'], sol: 'Sodium has the smallest nuclear charge in the period, with the same shielding, so its outer electron is held least tightly and furthest away.' },
        { ask: 'Why does the atomic radius decrease across Period 3?', right: 'The nuclear charge increases while the shielding stays about the same', wrong: ['Each element has one more shell of electrons', 'The number of neutrons decreases', 'The outer electrons repel each other more strongly'], sol: 'Every element in the period has its outer electrons in the third shell, with the same inner electrons shielding them. The extra protons pull them in.' },
        { ask: 'How does the first ionisation energy change across Period 3, in general?', right: 'It increases, with small dips at aluminium and sulfur', wrong: ['It decreases, with small rises at aluminium and sulfur', 'It increases steadily with no dips', 'It stays about the same'], sol: 'The general rise comes from the increasing nuclear charge. Aluminium’s outer electron is in 3p, and sulfur has a pair of electrons in one 3p orbital, so both are slightly easier to ionise.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why is the first ionisation energy of aluminium lower than that of magnesium, against the trend?', right: 'Aluminium’s outer electron is in the 3p sub-shell, which is higher in energy than 3s', wrong: ['Aluminium has fewer protons than magnesium', 'Aluminium’s outer electron is in the fourth shell', 'Aluminium’s 3p electrons are paired'], sol: 'Magnesium’s outer electron is in 3s; aluminium’s is in 3p, a little further out and partly shielded by the 3s electrons.' },
        { ask: 'Why is the first ionisation energy of sulfur lower than that of phosphorus, against the trend?', right: 'Sulfur has two electrons in one 3p orbital, and they repel each other', wrong: ['Sulfur has fewer protons than phosphorus', 'Sulfur’s outer electron is in a 3d orbital', 'Phosphorus has a full outer shell'], sol: 'Phosphorus has three unpaired 3p electrons. Sulfur’s fourth 3p electron shares an orbital, and the repulsion between the pair makes it easier to remove.' },
        { ask: 'Argon’s atomic radius is not usually compared with the rest of Period 3. Why?', right: 'Argon forms no bonds, so its radius is measured differently', wrong: ['Argon has an extra shell of electrons', 'Argon is a metal', 'Argon’s radius is the same as sodium’s'], sol: 'The other radii are covalent or metallic radii, measured from bonded atoms. Argon forms no bonds, so its radius is a van der Waals radius, which is not comparable.' },
      ],
      hints,
    );
  }
  // Compare two elements' radius or ionisation energy, with the dips included.
  const ie = [496, 738, 578, 787, 1012, 1000, 1251, 1521];
  const [i, j] = rng.sample([0, 1, 2, 3, 4, 5, 6], 2).sort((a, b) => a - b);
  if (rng.chance(0.5)) {
    return {
      prompt: `Which atom has the larger atomic radius: ${P3[i].name} or ${P3[j].name}?`,
      parts: [part(fixedChoice([cap(P3[i].name), cap(P3[j].name)], 0))],
      hints,
      solution: [`${cap(P3[i].name)} comes before ${P3[j].name} in Period 3, so it has a smaller nuclear charge with the same shielding. Its outer electrons are held less tightly, so its atom is larger.`],
    };
  }
  const higher = ie[i] > ie[j] ? i : j;
  const dip = (i === 1 && j === 2) || (i === 4 && j === 5);
  return {
    prompt: `Which element has the higher first ionisation energy: ${P3[i].name} or ${P3[j].name}?`,
    parts: [part(fixedChoice([cap(P3[i].name), cap(P3[j].name)], higher === i ? 0 : 1))],
    hints,
    solution: [
      dip
        ? `This pair goes against the trend: ${P3[i].name} (${ie[i]} kJ mol⁻¹) is higher than ${P3[j].name} (${ie[j]} kJ mol⁻¹). ${j === 2 ? 'Aluminium’s outer electron is in 3p, higher in energy than magnesium’s 3s electron.' : 'Sulfur’s paired 3p electrons repel, so one is easier to remove than any of phosphorus’s unpaired ones.'}`
        : `${cap(P3[higher].name)} has the higher first ionisation energy (${ie[i]} and ${ie[j]} kJ mol⁻¹). It is further across the period, with a larger nuclear charge and the same shielding.`,
    ],
  };
}

function period3Structure(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Sodium, magnesium and aluminium are metallic; silicon is giant covalent; phosphorus, sulfur and chlorine are simple molecular; argon is monatomic.', 'Melting a giant structure breaks strong bonds; melting a simple molecular one only overcomes weak forces between molecules.'];
  if (d === 1) {
    const e = rng.pick(P3);
    return {
      prompt: `What is the structure of ${e.name} in its solid state?`,
      parts: [part(mc(rng, cap(e.structure), STRUCTURES.filter((s) => s !== e.structure).map(cap), { keepOrder: false }))],
      hints,
      solution: [REASON[e.sym]],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why does silicon have the highest melting point in Period 3?', right: 'It has a giant covalent structure, and many strong covalent bonds must be broken', wrong: ['It has the strongest metallic bonding in the period', 'Its molecules are the largest in the period', 'It has strong ionic bonds between its atoms'], sol: 'Silicon is macromolecular: each atom is covalently bonded to four others in a giant lattice. Melting it breaks a great many strong covalent bonds.' },
        { ask: 'Why does aluminium have a higher melting point than sodium?', right: 'Aluminium has smaller ions with a higher charge and more delocalised electrons', wrong: ['Aluminium has a giant covalent structure', 'Aluminium has larger molecules with more electrons', 'Aluminium’s atoms are larger than sodium’s'], sol: 'Aluminium’s 3+ ions are smaller than sodium’s 1+ ions and are surrounded by three delocalised electrons each, so the metallic bonding is much stronger.' },
        { ask: 'Why does sulfur have a higher melting point than phosphorus?', right: '$\\ce{S8}$ molecules are larger than $\\ce{P4}$ molecules, so their van der Waals forces are stronger', wrong: ['Sulfur has a giant covalent structure', 'Sulfur has stronger covalent bonds inside its molecules', 'Sulfur is metallic and phosphorus is not'], sol: 'Both are simple molecular. Melting them overcomes only the van der Waals forces between molecules, which are stronger between the larger $\\ce{S8}$ molecules.' },
        { ask: 'Why does argon have the lowest melting point in Period 3?', right: 'It is made of single atoms with very weak van der Waals forces between them', wrong: ['Its covalent bonds are the weakest in the period', 'It has the weakest metallic bonding in the period', 'Its atoms are the largest in the period'], sol: 'Argon is monatomic. Only very weak forces between single atoms have to be overcome, so it melts at a very low temperature.' },
      ],
      hints,
    );
  }
  // Put three elements in order of melting point.
  const picks = rng.sample(P3, 3);
  const order = [...picks].sort((a, b) => b.mp - a.mp);
  const fmtOrder = (xs: typeof P3) => xs.map((x) => cap(x.name)).join(', ');
  const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]].map((p) => p.map((k) => order[k]));
  return {
    prompt: `Put ${picks[0].name}, ${picks[1].name} and ${picks[2].name} in order of melting point, **highest first**. Use their structures and bonding.`,
    parts: [part(mc(rng, fmtOrder(order), perms.slice(1).map(fmtOrder)))],
    hints,
    solution: [...order.map((x) => REASON[x.sym]), `So the order is ${fmtOrder(order)} (melting points ${order.map((x) => `${x.mp} °C`).join(', ')}).`],
  };
}

// ---------------------------------------------------------------------------- lesson 8.2: Group 2

const G2 = [
  { sym: 'Mg', name: 'magnesium', ar: 24 },
  { sym: 'Ca', name: 'calcium', ar: 40 },
  { sym: 'Sr', name: 'strontium', ar: 88 },
  { sym: 'Ba', name: 'barium', ar: 137 },
];

function group2Trends(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Down Group 2 the atoms gain a shell each time, so the outer electrons are further away and more shielded.', 'So the atoms get larger, lose their two outer electrons more easily, and react more vigorously with water.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'How does the reactivity of the Group 2 metals with water change down the group?', right: 'It increases', wrong: ['It decreases', 'It stays the same', 'It increases and then decreases'], sol: 'Down the group the two outer electrons are lost more easily, so the metals react more vigorously.' },
        { ask: 'How does the first ionisation energy change down Group 2?', right: 'It decreases, because the outer electrons are further from the nucleus and more shielded', wrong: ['It increases, because the nuclear charge increases', 'It stays the same, because each atom has two outer electrons', 'It decreases, because the nuclear charge decreases'], sol: 'Each element has an extra shell. The extra distance and shielding outweigh the larger nuclear charge.' },
        { ask: 'Which Group 2 element has the largest atomic radius of these?', right: 'Barium', wrong: ['Magnesium', 'Calcium', 'Strontium'], sol: 'Barium is lowest in the group, with the most shells of electrons.' },
        { ask: 'What is the oxidation state of a Group 2 metal in all its compounds?', right: '+2', wrong: ['+1', '−2', '+3'], sol: 'Each Group 2 atom loses its two outer electrons, forming a 2+ ion.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Which equation shows calcium reacting with cold water?', right: '$\\ce{Ca + 2H2O -> Ca(OH)2 + H2}$', wrong: ['$\\ce{Ca + H2O -> CaO + H2}$', '$\\ce{Ca + 2H2O -> CaO2 + 2H2}$', '$\\ce{Ca + H2O -> CaOH + H}$'], sol: 'Calcium reacts with cold water to give calcium hydroxide and hydrogen.' },
        { ask: 'Which equation shows magnesium burning in steam?', right: '$\\ce{Mg + H2O -> MgO + H2}$', wrong: ['$\\ce{Mg + 2H2O -> Mg(OH)2 + H2}$', '$\\ce{Mg + H2O -> MgOH + H}$', '$\\ce{2Mg + H2O -> Mg2O + H2}$'], sol: 'With steam, magnesium burns with a bright white light to give magnesium oxide and hydrogen. With cold water it reacts only very slowly, giving magnesium hydroxide.' },
        { ask: 'When a Group 2 metal reacts with water, what happens to the metal?', right: 'It is oxidised: its oxidation state goes from 0 to +2', wrong: ['It is reduced: its oxidation state goes from 0 to −2', 'It is neither oxidised nor reduced', 'It is oxidised: its oxidation state goes from +2 to 0'], sol: 'The metal atom loses two electrons, so it is oxidised from 0 to +2. Hydrogen in the water is reduced from +1 to 0.' },
        { ask: 'Magnesium is used to extract titanium from titanium(IV) chloride. Which equation shows this?', right: '$\\ce{TiCl4 + 2Mg -> Ti + 2MgCl2}$', wrong: ['$\\ce{TiCl4 + Mg -> Ti + MgCl4}$', '$\\ce{TiO2 + 2Mg -> Ti + 2MgO2}$', '$\\ce{TiCl4 + 4Mg -> Ti + 4MgCl}$'], sol: 'Magnesium is more reactive than titanium and displaces it: $\\ce{TiCl4 + 2Mg -> Ti + 2MgCl2}$.' },
      ],
      hints,
    );
  }
  const m = rng.pick(G2.slice(1));
  const mass = rng.pick([0.2, 0.4, 0.5, 0.8, 1.0, 1.2, 2.0]);
  const n = mass / m.ar;
  const h2 = n * 2;
  return {
    prompt: `${mass.toFixed(1)} g of ${m.name} reacts completely with cold water: $\\ce{${m.sym} + 2H2O -> ${m.sym}(OH)2 + H2}$. What mass of hydrogen is produced? Relative atomic masses: ${m.sym} = ${m.ar}, H = 1. Give your answer in grams to 3 significant figures.`,
    parts: [numPart(Number(h2.toPrecision(3)), { suffix: 'g', tolerance: Number(h2.toPrecision(3)) * 0.005 })],
    hints: ['Find the moles of metal: mass ÷ relative atomic mass.', 'One mole of metal gives one mole of $\\ce{H2}$, which has a mass of 2 g.'],
    solution: [`Moles of ${m.name} $= \\dfrac{${mass.toFixed(1)}}{${m.ar}} = ${n.toPrecision(3)}$ mol, so moles of $\\ce{H2}$ $= ${n.toPrecision(3)}$ mol.`, `Mass of hydrogen $= ${n.toPrecision(3)} \\times 2 = ${h2.toPrecision(3)}\\ \\text{g}$.`],
    calculator: true,
  };
}

function group2Compounds(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Down Group 2, the hydroxides become **more** soluble and the sulfates become **less** soluble.', 'Barium sulfate is insoluble; magnesium hydroxide is only sparingly soluble.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which Group 2 hydroxide is the **least** soluble in water?', right: 'Magnesium hydroxide', wrong: ['Barium hydroxide', 'Strontium hydroxide', 'Calcium hydroxide'], sol: 'Hydroxide solubility increases down the group, so magnesium hydroxide is the least soluble.' },
        { ask: 'Which Group 2 sulfate is the **least** soluble in water?', right: 'Barium sulfate', wrong: ['Magnesium sulfate', 'Calcium sulfate', 'Strontium sulfate'], sol: 'Sulfate solubility decreases down the group, so barium sulfate is the least soluble; it is effectively insoluble.' },
        { ask: 'What is magnesium hydroxide used for in medicine?', right: 'As an antacid, to neutralise excess stomach acid', wrong: ['As a barium meal for X-rays', 'To kill bacteria in drinking water', 'As a painkiller'], sol: 'Magnesium hydroxide is a weak base, sold as milk of magnesia, that neutralises excess hydrochloric acid in the stomach.' },
        { ask: 'Why do farmers spread calcium hydroxide on fields?', right: 'To neutralise acidic soil', wrong: ['To add nitrogen to the soil', 'To make the soil more acidic', 'To kill weeds'], sol: 'Calcium hydroxide (slaked lime) is a base, so it neutralises acid in the soil.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why can barium sulfate be swallowed safely as a barium meal, even though barium ions are toxic?', right: 'It is insoluble, so it is not absorbed into the blood', wrong: ['It is very soluble, so it passes through quickly', 'Barium ions are only toxic when heated', 'The stomach acid turns it into a harmless gas'], sol: 'Barium sulfate does not dissolve, so barium ions are not absorbed. It blocks X-rays, so the outline of the gut shows up clearly.' },
        { ask: 'Acidified barium chloride solution is added to a solution, and a white precipitate forms. Which ion is present?', right: 'Sulfate, $\\ce{SO4^2-}$', wrong: ['Chloride, $\\ce{Cl-}$', 'Carbonate, $\\ce{CO3^2-}$', 'Hydroxide, $\\ce{OH-}$'], sol: 'Barium ions and sulfate ions form insoluble barium sulfate: $\\ce{Ba^2+(aq) + SO4^2-(aq) -> BaSO4(s)}$.' },
        { ask: 'In the test for sulfate ions, why is the barium chloride solution acidified with hydrochloric acid first?', right: 'To remove carbonate ions, which would also give a white precipitate', wrong: ['To make the barium sulfate dissolve', 'To add chloride ions for the precipitate', 'To speed up the reaction'], sol: 'Barium carbonate is also white and insoluble. The acid reacts with any carbonate, so only sulfate gives a precipitate.' },
        { ask: 'How is calcium oxide or calcium carbonate used in power stations?', right: 'To remove sulfur dioxide from the waste gases', wrong: ['To remove carbon dioxide from the waste gases', 'As the fuel that is burned', 'To cool the steam'], sol: 'Calcium oxide and calcium carbonate are bases that react with acidic sulfur dioxide, removing it from flue gases (flue gas desulfurisation).' },
      ],
      hints,
    );
  }
  // Which of two compounds is more soluble?
  const [a, b] = rng.sample([0, 1, 2, 3], 2).sort((x, y) => x - y);
  const kind = rng.pick(['hydroxide', 'sulfate']);
  const more = kind === 'hydroxide' ? b : a;
  return {
    prompt: `Which is more soluble in water: ${G2[a].name} ${kind} or ${G2[b].name} ${kind}?`,
    parts: [part(fixedChoice([`${cap(G2[a].name)} ${kind}`, `${cap(G2[b].name)} ${kind}`], more === a ? 0 : 1))],
    hints,
    solution: [`Down Group 2, ${kind}s become ${kind === 'hydroxide' ? 'more' : 'less'} soluble. ${cap(G2[b].name)} is below ${G2[a].name}, so ${G2[more].name} ${kind} is the more soluble.`],
  };
}

// ---------------------------------------------------------------------------- lesson 8.3: Group 7

const HAL = [
  { x: 'Cl', name: 'chlorine', ion: 'chloride', colour: 'pale green', ag: 'white', nh3: 'dissolves in dilute ammonia solution' },
  { x: 'Br', name: 'bromine', ion: 'bromide', colour: 'orange', ag: 'cream', nh3: 'dissolves only in concentrated ammonia solution' },
  { x: 'I', name: 'iodine', ion: 'iodide', colour: 'brown', ag: 'yellow', nh3: 'does not dissolve, even in concentrated ammonia solution' },
];

function halogenTrends(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Down Group 7, the atoms get larger, so electronegativity and oxidising power fall.', 'A halogen displaces a halide ion from below it in the group, never from above.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'How do the boiling points of the halogens change down Group 7, and why?', right: 'They increase, because larger molecules with more electrons have stronger van der Waals forces', wrong: ['They decrease, because the covalent bonds get weaker', 'They increase, because the covalent bonds get stronger', 'They decrease, because the molecules get lighter'], sol: 'From fluorine to iodine the molecules get bigger, with more electrons, so the van der Waals forces between them are stronger.' },
        { ask: 'Which halogen is the most electronegative?', right: 'Fluorine', wrong: ['Chlorine', 'Bromine', 'Iodine'], sol: 'Fluorine is the smallest atom, so its nucleus attracts a bonding pair most strongly. Electronegativity falls down the group.' },
        { ask: 'How does the oxidising ability of the halogens change down Group 7?', right: 'It decreases', wrong: ['It increases', 'It stays the same', 'It increases and then decreases'], sol: 'An oxidising agent gains electrons. Larger atoms attract an extra electron less strongly, so oxidising power falls down the group.' },
        { ask: 'Chlorine water is added to potassium bromide solution. What is seen?', right: 'The solution turns orange, as bromine forms', wrong: ['Nothing happens', 'A white precipitate forms', 'The solution turns purple'], sol: 'Chlorine is a stronger oxidising agent than bromine, so it displaces bromine: $\\ce{Cl2 + 2Br- -> 2Cl- + Br2}$.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why is chlorine a stronger oxidising agent than iodine?', right: 'Chlorine atoms are smaller, so they attract an extra electron more strongly', wrong: ['Chlorine molecules have more electrons than iodine molecules', 'Chlorine is a gas and iodine is a solid', 'Chlorine has a higher boiling point than iodine'], sol: 'In a chlorine atom the incoming electron is closer to the nucleus and less shielded than in an iodine atom.' },
        { ask: 'Chlorine reacts with cold, dilute sodium hydroxide solution to make bleach. Which equation shows this?', right: '$\\ce{Cl2 + 2NaOH -> NaClO + NaCl + H2O}$', wrong: ['$\\ce{Cl2 + NaOH -> NaCl + HClO}$', '$\\ce{Cl2 + 2NaOH -> 2NaCl + H2O2}$', '$\\ce{2Cl2 + 2NaOH -> 2NaCl + 2HClO}$'], sol: 'The products are sodium chlorate(I), the active part of bleach, sodium chloride and water.' },
        { ask: 'Chlorine reacts with water: $\\ce{Cl2 + H2O <=> HCl + HClO}$. What type of reaction is this?', right: 'Disproportionation: chlorine is both oxidised (to +1) and reduced (to −1)', wrong: ['Neutralisation: an acid reacts with a base', 'Displacement: chlorine displaces oxygen', 'Combustion: chlorine burns in water'], sol: 'Chlorine starts at 0. In $\\ce{HCl}$ it is −1 (reduced) and in $\\ce{HClO}$ it is +1 (oxidised), so the same element is both oxidised and reduced.' },
        { ask: 'Chlorine is added to drinking water even though it is toxic. Why?', right: 'It kills disease-causing bacteria, and the benefit outweighs the small risks', wrong: ['It removes the taste of the water', 'It adds minerals that people need', 'It makes the water less acidic'], sol: 'Chlorine kills the bacteria that cause diseases such as cholera. The amounts used are small, so the benefit to health outweighs the risks, such as chlorinated by-products.' },
      ],
      hints,
    );
  }
  // Does a displacement reaction happen?
  const [h, ion] = rng.sample(HAL, 2);
  const reacts = HAL.indexOf(h) < HAL.indexOf(ion);
  const right = reacts ? `Yes: $\\ce{${h.x}2 + 2${ion.x}- -> 2${h.x}- + ${ion.x}2}$` : 'No: there is no reaction';
  const wrong = reacts
    ? ['No: there is no reaction', `Yes: $\\ce{${ion.x}2 + 2${h.x}- -> 2${ion.x}- + ${h.x}2}$`, `Yes: $\\ce{${h.x}2 + ${ion.x}- -> ${h.x}- + ${ion.x}2}$`]
    : [`Yes: $\\ce{${h.x}2 + 2${ion.x}- -> 2${h.x}- + ${ion.x}2}$`, `Yes: $\\ce{${ion.x}2 + 2${h.x}- -> 2${ion.x}- + ${h.x}2}$`, `Yes: $\\ce{${h.x}2 + ${ion.x}- -> ${h.x}- + ${ion.x}2}$`];
  return {
    prompt: `Aqueous ${h.name} is added to a solution of potassium ${ion.ion}. Is there a reaction, and if so, what is the ionic equation?`,
    parts: [part(mc(rng, right, wrong))],
    hints,
    solution: [reacts ? `${cap(h.name)} is above ${ion.name} in Group 7, so it is the stronger oxidising agent and displaces ${ion.name}. The solution turns ${ion.colour}.` : `${cap(h.name)} is below ${ion.name} in Group 7, so it is the weaker oxidising agent and cannot displace it.`],
  };
}

function halideReactions(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['With acidified silver nitrate: chloride gives a white precipitate, bromide cream and iodide yellow.', 'Down the group, the halide ions are stronger reducing agents, so they reduce concentrated sulfuric acid further.'];
  if (d === 1) {
    const h = rng.pick(HAL);
    return {
      prompt: `Dilute nitric acid and then silver nitrate solution are added to a solution of sodium ${h.ion}. What colour is the precipitate?`,
      parts: [part(mc(rng, cap(h.ag), HAL.filter((x) => x !== h).map((x) => cap(x.ag)).concat(['Black'])))],
      hints,
      solution: [`Silver ${h.ion} is ${h.ag}: $\\ce{Ag+(aq) + ${h.x}-(aq) -> Ag${h.x}(s)}$.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'In the test for halide ions, why is dilute nitric acid added before the silver nitrate?', right: 'To remove carbonate or hydroxide ions, which would also form precipitates', wrong: ['To add nitrate ions to the precipitate', 'To make the precipitate dissolve', 'To turn the halide ions into halogens'], sol: 'Carbonate and hydroxide ions form silver precipitates too. Nitric acid removes them; hydrochloric acid could not be used, because it adds chloride ions.' },
        { ask: 'Concentrated sulfuric acid is added to solid sodium chloride. What forms?', right: 'Misty white fumes of hydrogen chloride, and nothing else from the chloride', wrong: ['Orange-brown fumes of bromine and sulfur dioxide', 'A purple solid of iodine and a smell of bad eggs', 'Chlorine gas, sulfur and hydrogen sulfide'], sol: 'Chloride ions are too weak a reducing agent to reduce the sulfuric acid: $\\ce{NaCl + H2SO4 -> NaHSO4 + HCl}$.' },
        { ask: 'Concentrated sulfuric acid is added to solid sodium iodide. Which of these is a sign that iodide ions have reduced the acid as far as hydrogen sulfide?', right: 'A smell of bad eggs', wrong: ['Misty white fumes', 'Orange-brown fumes', 'Nothing is seen'], sol: 'Iodide is the strongest reducing halide. It reduces sulfuric acid to sulfur dioxide, sulfur (yellow solid) and hydrogen sulfide, which smells of bad eggs. Iodine is seen as a purple-black solid.' },
        { ask: 'A cream precipitate forms in the silver nitrate test. How could you confirm it is silver bromide?', right: 'It dissolves in concentrated ammonia solution but not in dilute', wrong: ['It dissolves in dilute ammonia solution', 'It does not dissolve, even in concentrated ammonia', 'It turns black when water is added'], sol: 'Silver chloride dissolves in dilute ammonia, silver bromide only in concentrated ammonia, and silver iodide in neither.' },
      ],
      hints,
    );
  }
  // Identify a halide from two results.
  const h = rng.pick(HAL);
  return {
    prompt: `A solution of a sodium halide is acidified with dilute nitric acid, and silver nitrate solution is added. A ${h.ag} precipitate forms, which ${h.nh3}. Which halide ion is present?`,
    parts: [part(mc(rng, `${cap(h.ion)}, $\\ce{${h.x}-}$`, HAL.filter((x) => x !== h).map((x) => `${cap(x.ion)}, $\\ce{${x.x}-}$`).concat(['Fluoride, $\\ce{F-}$'])))],
    hints,
    solution: [`A ${h.ag} precipitate that ${h.nh3} is silver ${h.ion}, so the solution contained ${h.ion} ions. (Silver fluoride is soluble, so fluoride gives no precipitate.)`],
  };
}

export const INORGANIC12_SKILLS: SkillDef[] = [
  skill({ id: 'cx-period3-trends', name: 'Trends across Period 3', description: 'Explain the trends in atomic radius and first ionisation energy across Period 3.', outcomes: ['IN1'], lessonId: L(1), gen: period3Trends }),
  skill({ id: 'cx-period3-structure', name: 'Structure and melting point across Period 3', description: 'Give the structure of each Period 3 element, and explain the trend in melting points.', outcomes: ['IN1'], lessonId: L(1), gen: period3Structure }),
  skill({ id: 'cx-group2-trends', name: 'Group 2 trends and reactions', description: 'Explain the trends down Group 2, and write equations for the reactions of the metals with water.', outcomes: ['IN2'], lessonId: L(2), gen: group2Trends }),
  skill({ id: 'cx-group2-compounds', name: 'Group 2 compounds and their uses', description: 'Compare the solubilities of Group 2 hydroxides and sulfates, and give the uses of their compounds.', outcomes: ['IN2'], lessonId: L(2), gen: group2Compounds }),
  skill({ id: 'cx-halogen-trends', name: 'Group 7 trends and displacement', description: 'Explain the trends down Group 7, predict displacement reactions, and describe the reactions of chlorine.', outcomes: ['IN3'], lessonId: L(3), gen: halogenTrends }),
  skill({ id: 'cx-halide-reactions', name: 'Tests and reactions of halide ions', description: 'Identify halide ions with silver nitrate and ammonia, and describe their reactions with sulfuric acid.', outcomes: ['IN3'], lessonId: L(3), gen: halideReactions }),
];

