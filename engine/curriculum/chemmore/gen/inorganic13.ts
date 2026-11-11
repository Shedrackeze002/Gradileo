/**
 * More Chemistry Topics, Unit 11 (A level, second year): inorganic chemistry. The reactions of the
 * Period 3 elements and the acid–base nature of their oxides, complex ions and ligands, the colours,
 * oxidation states and catalysis of the transition metals, and the reactions of metal aqua ions in
 * solution. Constants such as the Planck constant are stated in the questions that use them.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { cap, fromBank } from './common.ts';

const L = (n: number) => `cx-11-${n}`;

// ---------------------------------------------------------------------------- lesson 11.1: Period 3 oxides

const OXIDES = [
  { el: 'sodium', ox: 'Na2O', bond: 'ionic', nature: 'basic', water: 'Na2O + H2O -> 2NaOH', ph: '14', sol: 'reacts with water to give sodium hydroxide, a strong alkali' },
  { el: 'magnesium', ox: 'MgO', bond: 'ionic', nature: 'basic', water: 'MgO + H2O -> Mg(OH)2', ph: '9', sol: 'is only slightly soluble, giving a weakly alkaline solution of magnesium hydroxide' },
  { el: 'aluminium', ox: 'Al2O3', bond: 'ionic, with some covalent character', nature: 'amphoteric', water: '', ph: '7', sol: 'is insoluble, so the water stays neutral' },
  { el: 'silicon', ox: 'SiO2', bond: 'giant covalent', nature: 'acidic', water: '', ph: '7', sol: 'is insoluble, so the water stays neutral' },
  { el: 'phosphorus', ox: 'P4O10', bond: 'simple molecular', nature: 'acidic', water: 'P4O10 + 6H2O -> 4H3PO4', ph: '0', sol: 'reacts with water to give phosphoric(V) acid' },
  { el: 'sulfur', ox: 'SO2', bond: 'simple molecular', nature: 'acidic', water: 'SO2 + H2O -> H2SO3', ph: '3', sol: 'dissolves to give sulfurous acid, a weak acid' },
  { el: 'sulfur', ox: 'SO3', bond: 'simple molecular', nature: 'acidic', water: 'SO3 + H2O -> H2SO4', ph: '0', sol: 'reacts with water to give sulfuric acid, a strong acid' },
];

function period3Reactions(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Sodium and magnesium form ionic oxides; aluminium’s oxide is ionic with some covalent character; silicon’s is giant covalent; phosphorus and sulfur form simple molecular oxides.', 'Burning in oxygen: Na → Na₂O, Mg → MgO, Al → Al₂O₃, Si → SiO₂, P → P₄O₁₀, S → SO₂.'];
  if (d === 1) {
    const x = rng.pick(OXIDES.filter((o) => o.ox !== 'SO3'));
    return {
      prompt: `What is the formula of the oxide formed when ${x.el} burns in plenty of oxygen?`,
      parts: [part(mc(rng, `$\\ce{${x.ox}}$`, OXIDES.filter((o) => o.ox !== x.ox && o.ox !== 'SO3').map((o) => `$\\ce{${o.ox}}$`)))],
      hints,
      solution: [`${cap(x.el)} burns to form $\\ce{${x.ox}}$.${x.el === 'sulfur' ? ' (Sulfur trioxide forms only with a catalyst, as in the Contact process.)' : ''}`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Which equation shows sodium reacting with cold water?', right: '$\\ce{2Na + 2H2O -> 2NaOH + H2}$', wrong: ['$\\ce{2Na + H2O -> Na2O + H2}$', '$\\ce{Na + H2O -> NaOH + H}$', '$\\ce{2Na + 2H2O -> Na2O2 + 2H2}$'], sol: 'Sodium reacts vigorously with cold water, giving sodium hydroxide (pH about 14) and hydrogen.' },
        { ask: 'How do sodium and magnesium compare in their reactions with cold water?', right: 'Sodium reacts vigorously; magnesium reacts very slowly, giving a weakly alkaline solution', wrong: ['Both react vigorously, giving strong alkalis', 'Magnesium reacts vigorously; sodium does not react', 'Neither reacts at all with cold water'], sol: 'Sodium gives NaOH at pH about 14. Magnesium hydroxide is only slightly soluble, so the solution is about pH 9 to 10.' },
        { ask: 'What is seen when sulfur burns in oxygen?', right: 'A blue flame, forming sulfur dioxide gas', wrong: ['A bright white flame, forming a white powder', 'A yellow flame, forming a yellow solid', 'No flame: sulfur does not burn'], sol: 'Sulfur burns with a blue flame: $\\ce{S + O2 -> SO2}$.' },
        { ask: 'Why do sodium oxide and magnesium oxide have high melting points?', right: 'They are ionic, with strong attraction between oppositely charged ions in a giant lattice', wrong: ['They are simple molecular, with strong covalent bonds', 'They are giant covalent, like silicon dioxide', 'They have strong van der Waals forces between molecules'], sol: 'Melting a giant ionic lattice means overcoming the strong electrostatic attraction between many ions. MgO melts higher than Na₂O because its ions are smaller and doubly charged.' },
      ],
      hints,
    );
  }
  const [a, b] = rng.sample(OXIDES.filter((o) => o.ox !== 'SO2'), 2);
  const mp: Record<string, number> = { Na2O: 1275, MgO: 2852, Al2O3: 2072, SiO2: 1610, P4O10: 340, SO3: 17 };
  const hi = mp[a.ox] > mp[b.ox] ? a : b;
  return {
    prompt: `Which has the higher melting point: $\\ce{${a.ox}}$ or $\\ce{${b.ox}}$?`,
    parts: [part(fixedChoice([`$\\ce{${a.ox}}$`, `$\\ce{${b.ox}}$`], hi === a ? 0 : 1))],
    hints: ['Ionic and giant covalent oxides melt high; simple molecular oxides melt low.', 'Among the ionic oxides, MgO melts highest: its ions are small and doubly charged.'],
    solution: [`$\\ce{${a.ox}}$ is ${a.bond} (melting point ${mp[a.ox]} °C) and $\\ce{${b.ox}}$ is ${b.bond} (${mp[b.ox]} °C). So $\\ce{${hi.ox}}$ melts higher.`],
  };
}

function period3Oxides(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Ionic oxides (Na₂O, MgO) are basic; covalent oxides (SiO₂, P₄O₁₀, SO₂, SO₃) are acidic; Al₂O₃ is amphoteric.', 'An amphoteric oxide reacts with both acids and bases.'];
  if (d === 1) {
    const x = rng.pick(OXIDES);
    return {
      prompt: `Is $\\ce{${x.ox}}$ a basic, acidic or amphoteric oxide?`,
      parts: [part(fixedChoice(['Basic', 'Acidic', 'Amphoteric'], ['basic', 'acidic', 'amphoteric'].indexOf(x.nature)))],
      hints,
      solution: [`$\\ce{${x.ox}}$ is ${x.bond}, and it is ${x.nature}.`],
    };
  }
  if (d === 2) {
    const x = rng.pick(OXIDES);
    const phs = ['0', '3', '7', '9', '14'];
    return {
      prompt: `$\\ce{${x.ox}}$ is added to water. What is the approximate pH of the resulting solution?`,
      parts: [part(mc(rng, `pH ${x.ph}`, phs.filter((p) => p !== x.ph).map((p) => `pH ${p}`)))],
      hints,
      solution: [`$\\ce{${x.ox}}$ ${x.sol}${x.water ? `: $\\ce{${x.water}}$` : ''}. The pH is about ${x.ph}.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Which equation shows aluminium oxide acting as a **base**?', right: '$\\ce{Al2O3 + 6HCl -> 2AlCl3 + 3H2O}$', wrong: ['$\\ce{Al2O3 + 2NaOH + 3H2O -> 2NaAl(OH)4}$', '$\\ce{Al2O3 + 3H2O -> 2Al(OH)3}$', '$\\ce{2Al + 3O2 -> Al2O3}$'], sol: 'Reacting with an acid shows basic behaviour. With sodium hydroxide, aluminium oxide acts as an acid, forming sodium aluminate: it is amphoteric.' },
      { ask: 'Which equation shows silicon dioxide acting as an acid?', right: '$\\ce{SiO2 + 2NaOH -> Na2SiO3 + H2O}$', wrong: ['$\\ce{SiO2 + 4HCl -> SiCl4 + 2H2O}$', '$\\ce{SiO2 + H2O -> H2SiO3}$', '$\\ce{SiO2 + 2H2O -> Si(OH)4}$'], sol: 'Silicon dioxide is insoluble in water but reacts with hot, concentrated sodium hydroxide to form sodium silicate, so it is acidic.' },
      { ask: 'Which equation shows magnesium oxide neutralising an acid?', right: '$\\ce{MgO + 2HCl -> MgCl2 + H2O}$', wrong: ['$\\ce{MgO + 2NaOH -> Na2MgO2 + H2O}$', '$\\ce{MgO + HCl -> MgCl + H2O}$', '$\\ce{MgO + H2SO4 -> MgSO4 + H2}$'], sol: 'Basic oxides react with acids to give a salt and water.' },
      { ask: 'Which equation shows phosphorus(V) oxide neutralising sodium hydroxide?', right: '$\\ce{P4O10 + 12NaOH -> 4Na3PO4 + 6H2O}$', wrong: ['$\\ce{P4O10 + 4NaOH -> 4NaPO3 + 2H2}$', '$\\ce{P4O10 + 6HCl -> 4PCl3 + 6O2}$', '$\\ce{P4O10 + 6NaOH -> 4Na3PO4 + 3H2O}$'], sol: 'Acidic oxides react with bases to give a salt and water: 12 NaOH supply the 12 sodium ions of four $\\ce{Na3PO4}$.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 11.2: complex ions, colour and catalysts

const COMPLEXES: Array<{ f: string; metal: string; os: number; cn: number; shape: string; ligand: string }> = [
  { f: '[Fe(H2O)6]^3+', metal: 'iron', os: 3, cn: 6, shape: 'Octahedral', ligand: 'water' },
  { f: '[Fe(H2O)6]^2+', metal: 'iron', os: 2, cn: 6, shape: 'Octahedral', ligand: 'water' },
  { f: '[Cu(H2O)6]^2+', metal: 'copper', os: 2, cn: 6, shape: 'Octahedral', ligand: 'water' },
  { f: '[CuCl4]^2-', metal: 'copper', os: 2, cn: 4, shape: 'Tetrahedral', ligand: 'chloride' },
  { f: '[CoCl4]^2-', metal: 'cobalt', os: 2, cn: 4, shape: 'Tetrahedral', ligand: 'chloride' },
  { f: '[Co(NH3)6]^3+', metal: 'cobalt', os: 3, cn: 6, shape: 'Octahedral', ligand: 'ammonia' },
  { f: '[Fe(CN)6]^4-', metal: 'iron', os: 2, cn: 6, shape: 'Octahedral', ligand: 'cyanide' },
  { f: '[Fe(CN)6]^3-', metal: 'iron', os: 3, cn: 6, shape: 'Octahedral', ligand: 'cyanide' },
  { f: '[Ag(NH3)2]^+', metal: 'silver', os: 1, cn: 2, shape: 'Linear', ligand: 'ammonia' },
  { f: '[Pt(NH3)2Cl2]', metal: 'platinum', os: 2, cn: 4, shape: 'Square planar', ligand: 'ammonia and chloride' },
];
const LIGAND_CHARGE: Record<string, number> = { water: 0, ammonia: 0, chloride: -1, cyanide: -1 };

function complexIons(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A ligand donates a lone pair to the metal ion, forming a coordinate bond. The coordination number is the number of coordinate bonds.', 'Six small ligands give an octahedral shape; four large chloride ligands give a tetrahedral shape.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is a ligand?', right: 'A molecule or ion that donates a lone pair to a metal ion, forming a coordinate bond', wrong: ['A metal ion that accepts electrons from water', 'A positive ion that surrounds a negative ion', 'A molecule with an unpaired electron'], sol: 'Water, ammonia, chloride ions and cyanide ions all have lone pairs they can donate to a central metal ion.' },
        { ask: 'What is the coordination number of a complex ion?', right: 'The number of coordinate bonds to the central metal ion', wrong: ['The charge on the complex ion', 'The oxidation state of the metal', 'The number of different ligands'], sol: 'In $\\ce{[Cu(H2O)6]^2+}$, six water ligands each form one coordinate bond, so the coordination number is 6.' },
        { ask: 'Which of these is a bidentate ligand?', right: 'Ethane-1,2-diamine, $\\ce{H2NCH2CH2NH2}$', wrong: ['Water, $\\ce{H2O}$', 'Ammonia, $\\ce{NH3}$', 'Chloride, $\\ce{Cl-}$'], sol: 'Ethane-1,2-diamine has two nitrogen atoms with lone pairs, so it forms two coordinate bonds. Ethanedioate is also bidentate, and EDTA⁴⁻ is hexadentate.' },
        { ask: 'In haemoglobin, what does the iron(II) ion bind to that lets blood carry oxygen?', right: 'An oxygen molecule, as a ligand', wrong: ['A carbon dioxide molecule, permanently', 'A sodium ion', 'A chloride ion'], sol: 'Haem is a multidentate ligand round $\\ce{Fe^2+}$, which also binds $\\ce{O2}$. Carbon monoxide is toxic because it binds more strongly and is not released.' },
      ],
      hints,
    );
  }
  const x = rng.pick(COMPLEXES);
  if (d === 2) {
    return {
      prompt: `What is the shape of the complex $\\ce{${x.f}}$?`,
      parts: [part(mc(rng, x.shape, ['Octahedral', 'Tetrahedral', 'Square planar', 'Linear'].filter((s) => s !== x.shape)))],
      hints,
      solution: [`It has ${x.cn} coordinate bonds to the ${x.metal} ion, so its shape is ${x.shape.toLowerCase()}.${x.f.startsWith('[Pt') ? ' Platinum(II) complexes such as cisplatin are square planar.' : x.f.startsWith('[Ag') ? ' Silver(I) forms linear complexes, as in Tollens’ reagent.' : ''}`],
    };
  }
  const charge = Number((x.f.match(/\^(\d*)([+-])$/) ?? [])[1] || (x.f.endsWith(']') ? 0 : 1)) * (x.f.endsWith('-') ? -1 : 1);
  const ligCharge = x.f.startsWith('[Pt') ? -2 : x.cn * LIGAND_CHARGE[x.ligand];
  return {
    prompt: `What is the oxidation state of ${x.metal} in $\\ce{${x.f}}$?`,
    parts: [part(mc(rng, `+${x.os}`, ['+1', '+2', '+3', '+4', '+6'].filter((s) => s !== `+${x.os}`)))],
    hints: ['The oxidation state of the metal plus the total charge of the ligands equals the charge on the complex.', 'Water and ammonia are neutral; chloride and cyanide each carry 1−.'],
    solution: [`Charge of the ligands $= ${ligCharge}$; charge of the complex $= ${charge}$. So the metal is $${charge} - (${ligCharge}) = +${x.os}$.`],
  };
}

function transitionColour(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Ligands split the d orbitals. An electron absorbs light of energy $\\Delta E = h\\nu$ to jump up, and we see the colours that are not absorbed.', 'Changing the oxidation state, the ligand or the coordination number changes ΔE, and so the colour.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Why are most transition metal complexes coloured?', right: 'd electrons absorb some frequencies of visible light, and the rest is transmitted', wrong: ['The metal ions give out light of their own', 'The ligands reflect all frequencies equally', 'The complexes absorb only ultraviolet light'], sol: 'In a complex, the d orbitals split. Electrons absorb visible light of energy ΔE to move up, and the colour we see is the light that remains.' },
        { ask: 'Why is a solution of zinc(II) ions colourless?', right: 'Zn²⁺ has a full 3d sub-shell, so no d electron can move up to a higher orbital', wrong: ['Zinc is not a metal', 'Zn²⁺ has no electrons', 'Zinc ions absorb every colour of light'], sol: '$\\ce{Zn^2+}$ is $\\mathrm{[Ar]\\,3d^{10}}$. With every d orbital full, there is no d–d transition, so no visible light is absorbed.' },
        { ask: 'In colorimetry, how is the absorbance of a coloured solution related to its concentration?', right: 'Absorbance is proportional to concentration, so a calibration graph gives the concentration', wrong: ['Absorbance falls as the concentration rises', 'Absorbance does not depend on concentration', 'Absorbance is proportional to the volume of solution'], sol: 'Solutions of known concentration give a calibration curve; the unknown’s absorbance is read off it.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const items: Array<{ ask: string; right: string; wrong: string[]; sol: string }> = [
      { ask: 'Zinc and acid reduce vanadium(V) step by step. What is the colour of the vanadium(II) ion, $\\ce{V^2+}$?', right: 'Violet', wrong: ['Yellow', 'Blue', 'Green'], sol: 'Vanadium(V), $\\ce{VO2+}$, is yellow; vanadium(IV), $\\ce{VO^2+}$, blue; vanadium(III), $\\ce{V^3+}$, green; vanadium(II), $\\ce{V^2+}$, violet.' },
      { ask: 'What is the colour of vanadium(IV), $\\ce{VO^2+}$, in solution?', right: 'Blue', wrong: ['Yellow', 'Green', 'Violet'], sol: 'Yellow (V), blue (IV), green (III), violet (II): “you better get vanadium”.' },
      { ask: 'Which is a **heterogeneous** catalyst?', right: 'Vanadium(V) oxide in the Contact process', wrong: ['Fe²⁺ ions in the reaction of peroxodisulfate and iodide ions', 'Mn²⁺ ions in the reaction of manganate(VII) and ethanedioate ions', 'Hydrogen ions in the making of an ester'], sol: 'A heterogeneous catalyst is in a different phase from the reactants: solid V₂O₅ with gaseous SO₂ and O₂.' },
      { ask: 'Why can transition metal ions act as homogeneous catalysts, as Fe²⁺ does for $\\ce{S2O8^2- + 2I- -> 2SO4^2- + I2}$?', right: 'They can change between oxidation states, so they are used up in one step and remade in the next', wrong: ['They are in a different phase from the reactants', 'They raise the activation energy', 'They are permanently oxidised during the reaction'], sol: 'Fe²⁺ reduces $\\ce{S2O8^2-}$ and becomes Fe³⁺, which then oxidises $\\ce{I-}$ and becomes Fe²⁺ again. Both steps involve oppositely charged ions, so they are fast.' },
      { ask: 'Why do catalytic converters stop working if leaded petrol is used?', right: 'Lead coats the catalyst surface, poisoning it', wrong: ['Lead raises the temperature too much', 'Lead reacts with the exhaust gases to make more pollutants', 'Lead dissolves the platinum'], sol: 'Lead is adsorbed strongly onto the active sites, so the reactant gases can no longer reach them.' },
    ];
    return fromBank(rng, items, hints);
  }
  const h = 6.63e-34;
  if (rng.chance(0.5)) {
    const de = rng.pick([2.8, 3.2, 3.6, 4.0, 4.4]) * 1e-19;
    const nu = de / h;
    const ans = Number((nu / 1e14).toFixed(2));
    return {
      prompt: `An electron in a complex absorbs a photon of energy $${fmtFixed(de / 1e-19, 1)} \\times 10^{-19}$ J. Using $\\Delta E = h\\nu$, with $h = 6.63 \\times 10^{-34}$ J s, find the frequency of the light absorbed. Give your answer as a number of $10^{14}$ Hz, to 2 decimal places.`,
      parts: [numPart(ans, { decimals: 2, suffix: '× 10¹⁴ Hz', tolerance: 0.011 })],
      hints,
      solution: [`$\\nu = \\dfrac{\\Delta E}{h} = \\dfrac{${fmtFixed(de / 1e-19, 1)} \\times 10^{-19}}{6.63 \\times 10^{-34}} = ${fmtFixed(ans, 2)} \\times 10^{14}$ Hz.`],
      calculator: true,
    };
  }
  const nu = rng.pick([4.5, 5.0, 5.5, 6.0, 6.5]) * 1e14;
  const de = h * nu;
  const ans = Number((de / 1e-19).toFixed(2));
  return {
    prompt: `A complex absorbs light of frequency $${fmtFixed(nu / 1e14, 1)} \\times 10^{14}$ Hz. Using $\\Delta E = h\\nu$, with $h = 6.63 \\times 10^{-34}$ J s, find the energy gap ΔE between the split d orbitals. Give your answer as a number of $10^{-19}$ J, to 2 decimal places.`,
    parts: [numPart(ans, { decimals: 2, suffix: '× 10⁻¹⁹ J', tolerance: 0.011 })],
    hints,
    solution: [`$\\Delta E = 6.63 \\times 10^{-34} \\times ${fmtFixed(nu / 1e14, 1)} \\times 10^{14} = ${fmtFixed(ans, 2)} \\times 10^{-19}$ J.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 11.3: metal ions in solution

const AQUA = [
  { ion: 'Cu^2+', name: 'copper(II)', aqua: 'blue', oh: 'a blue precipitate of $\\ce{Cu(H2O)4(OH)2}$', ohx: 'the precipitate does not dissolve', nh3x: 'the precipitate dissolves to give a deep blue solution of $\\ce{[Cu(NH3)4(H2O)2]^2+}$', co3: 'a blue-green precipitate of $\\ce{CuCO3}$' },
  { ion: 'Fe^2+', name: 'iron(II)', aqua: 'pale green', oh: 'a green precipitate of $\\ce{Fe(H2O)4(OH)2}$, which turns brown in air', ohx: 'the precipitate does not dissolve', nh3x: 'the precipitate does not dissolve', co3: 'a green precipitate of $\\ce{FeCO3}$' },
  { ion: 'Fe^3+', name: 'iron(III)', aqua: 'yellow-brown', oh: 'a brown precipitate of $\\ce{Fe(H2O)3(OH)3}$', ohx: 'the precipitate does not dissolve', nh3x: 'the precipitate does not dissolve', co3: 'a brown precipitate and bubbles of carbon dioxide' },
  { ion: 'Al^3+', name: 'aluminium', aqua: 'colourless', oh: 'a white precipitate of $\\ce{Al(H2O)3(OH)3}$', ohx: 'the precipitate dissolves to give a colourless solution of $\\ce{[Al(OH)4]-}$', nh3x: 'the precipitate does not dissolve', co3: 'a white precipitate and bubbles of carbon dioxide' },
];

function aquaIons(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['With a little NaOH or NH₃: Cu²⁺ blue, Fe²⁺ green, Fe³⁺ brown and Al³⁺ white precipitates.', 'Excess NaOH dissolves the aluminium hydroxide; excess NH₃ dissolves the copper hydroxide. M³⁺ ions with carbonate also give off CO₂.'];
  const x = rng.pick(AQUA);
  if (d === 1) {
    return {
      prompt: `A few drops of sodium hydroxide solution are added to a solution containing $\\ce{[${x.ion.replace('^', '(H2O)6]^')}}$ ions. What is seen?`,
      parts: [part(mc(rng, cap(x.oh), AQUA.filter((y) => y !== x).map((y) => cap(y.oh))))],
      hints,
      solution: [`${cap(x.name)} ions give ${x.oh}.`],
    };
  }
  if (d === 2) {
    const reagent = rng.pick(['excess sodium hydroxide', 'excess ammonia solution', 'sodium carbonate solution']);
    const right = reagent.includes('carbonate') ? x.co3 : reagent.includes('sodium hydroxide') ? x.ohx : x.nh3x;
    const pool = AQUA.flatMap((y) => [y.co3, y.ohx, y.nh3x]).filter((t) => t !== right);
    return {
      prompt: `A solution of ${x.name} ions is treated with ${reagent}. What is seen${reagent.includes('excess') ? ' once the reagent is in excess' : ''}?`,
      parts: [part(mc(rng, cap(right), [...new Set(pool)].map(cap)))],
      hints,
      solution: [`${cap(x.name)} with ${reagent}: ${right}.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Why is a solution of $\\ce{[Fe(H2O)6]^3+}$ more acidic than a solution of $\\ce{[Fe(H2O)6]^2+}$?', right: 'Fe³⁺ has a higher charge density, so it polarises the water ligands more and releases H⁺ more easily', wrong: ['Fe³⁺ has more water ligands', 'Fe²⁺ ions react with the water to make hydroxide ions', 'Fe³⁺ is larger, so the O–H bonds are longer'], sol: 'The small, highly charged Fe³⁺ ion pulls electron density from the O–H bonds of its water ligands, so they lose H⁺ more readily: $\\ce{[Fe(H2O)6]^3+ <=> [Fe(H2O)5(OH)]^2+ + H+}$.' },
      { ask: 'Why does sodium carbonate give off carbon dioxide with Al³⁺(aq) but not with Cu²⁺(aq)?', right: 'The 3+ aqua ion is acidic enough to react with carbonate, giving CO₂; 2+ ions simply form a metal carbonate', wrong: ['Copper carbonate decomposes at once into CO₂', 'Aluminium ions contain carbon', 'Carbonate is a stronger acid than the aluminium ion'], sol: 'Solutions of M³⁺ aqua ions contain enough H⁺ to react with carbonate. M²⁺ ions are less acidic, so a metal carbonate precipitates instead.' },
      { ask: 'Why does aluminium hydroxide dissolve in excess sodium hydroxide but not in excess ammonia?', right: 'It is amphoteric and reacts with the strong base, but ammonia is too weak a base', wrong: ['Ammonia forms a complex with aluminium that precipitates', 'Sodium ions dissolve the precipitate', 'Aluminium hydroxide is basic, not amphoteric'], sol: 'Excess OH⁻ removes more protons: $\\ce{Al(H2O)3(OH)3 + OH- -> [Al(OH)4]- + 3H2O}$. Ammonia does not provide a high enough concentration of OH⁻.' },
    ],
    hints,
  );
}

function ligandSubstitution(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Water and ammonia are similar in size, so they swap without changing the coordination number. Chloride ions are larger, so only four fit.', 'Replacing monodentate ligands with multidentate ones increases the number of particles, so the entropy increases: the chelate effect.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Concentrated hydrochloric acid is added to a solution of $\\ce{[Cu(H2O)6]^2+}$. What forms?', right: 'Yellow-green $\\ce{[CuCl4]^2-}$, a tetrahedral complex', wrong: ['Deep blue $\\ce{[Cu(NH3)4(H2O)2]^2+}$', 'A blue precipitate of $\\ce{Cu(OH)2}$', 'Colourless $\\ce{[CuCl6]^4-}$, an octahedral complex'], sol: '$\\ce{[Cu(H2O)6]^2+ + 4Cl- <=> [CuCl4]^2- + 6H2O}$. Chloride ions are large, so only four fit round the copper.' },
        { ask: 'Why does the coordination number change from 6 to 4 when chloride ions replace water ligands?', right: 'Chloride ions are larger than water molecules, so only four fit round the metal ion', wrong: ['Chloride ions carry two charges each', 'Chloride ions are bidentate', 'The metal ion is oxidised'], sol: 'Water and ammonia are small; chloride ions are much larger, so the complex becomes tetrahedral.' },
        { ask: 'What is the chelate effect?', right: 'The extra stability of complexes with multidentate ligands, driven by an increase in entropy', wrong: ['The colour change when ligands swap', 'The decrease in entropy when ligands swap', 'The formation of a precipitate with excess ligand'], sol: 'One multidentate ligand replaces several monodentate ones, so the number of particles increases, ΔS is positive and ΔG is negative.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const items = [
      { ask: '$\\ce{[Cu(H2O)6]^2+ + 3H2NCH2CH2NH2 -> [Cu(H2NCH2CH2NH2)3]^2+ + 6H2O}$. How many particles are there on each side?', right: '4 on the left, 7 on the right', wrong: ['7 on the left, 4 on the right', '4 on each side', '1 on the left, 6 on the right'], sol: 'Left: 1 complex + 3 ligands = 4. Right: 1 complex + 6 water = 7. The rise in particles gives a positive entropy change.' },
      { ask: '$\\ce{[Co(H2O)6]^2+ + EDTA^4- -> [Co(EDTA)]^2- + 6H2O}$. Why is ΔG negative even though ΔH is close to zero?', right: 'The number of particles rises from 2 to 7, so ΔS is large and positive', wrong: ['The bonds formed are much stronger than those broken', 'The reaction is very exothermic', 'EDTA lowers the activation energy'], sol: 'Similar Co–O and Co–N bonds are broken and made, so ΔH ≈ 0. But 2 particles become 7, so ΔS is positive and $\\Delta G = \\Delta H - T\\Delta S$ is negative.' },
      { ask: 'Excess ammonia is added to $\\ce{[Co(H2O)6]^2+}$. The water ligands are replaced by ammonia. What happens to the coordination number?', right: 'It stays at 6, because water and ammonia are similar in size', wrong: ['It falls to 4', 'It rises to 8', 'It falls to 2'], sol: '$\\ce{[Co(H2O)6]^2+ + 6NH3 -> [Co(NH3)6]^2+ + 6H2O}$. The ligands are similar in size and both uncharged, so the shape stays octahedral.' },
    ];
    return fromBank(rng, items, hints);
  }
  const swaps: Array<{ eq: string; before: number; after: number; note: string }> = [
    { eq: '[Ni(H2O)6]^2+ + 3H2NCH2CH2NH2 -> [Ni(H2NCH2CH2NH2)3]^2+ + 6H2O', before: 4, after: 7, note: 'Each ethane-1,2-diamine is bidentate, so three replace six water ligands.' },
    { eq: '[Fe(H2O)6]^3+ + 3C2O4^2- -> [Fe(C2O4)3]^3- + 6H2O', before: 4, after: 7, note: 'Each ethanedioate ion is bidentate, so three replace six water ligands.' },
    { eq: '[Co(H2O)6]^2+ + EDTA^4- -> [Co(EDTA)]^2- + 6H2O', before: 2, after: 7, note: 'EDTA⁴⁻ is hexadentate, so one ion replaces all six water ligands.' },
    { eq: '[Cu(H2O)6]^2+ + 4Cl- -> [CuCl4]^2- + 6H2O', before: 5, after: 7, note: 'Only four of the large chloride ions fit, so the complex becomes tetrahedral.' },
    { eq: '[Co(H2O)6]^2+ + 6NH3 -> [Co(NH3)6]^2+ + 6H2O', before: 7, after: 7, note: 'Ammonia and water are both monodentate, so six replace six.' },
  ];
  const x = rng.pick(swaps);
  return {
    prompt: `By how much does the number of particles change in this reaction? $\\ce{${x.eq}}$ (Give a rise as a positive number.)`,
    parts: [numPart(x.after - x.before)],
    hints,
    solution: [`${x.note} Before: ${x.before} particles. After: ${x.after} particles. The change is ${x.after - x.before}${x.after > x.before ? ', so ΔS is positive: the chelate effect' : ', so there is little change in entropy'}.`],
  };
}

export const INORGANIC13_SKILLS: SkillDef[] = [
  skill({ id: 'cx-period3-reactions', name: 'Reactions of the Period 3 elements', description: 'Describe the reactions of the Period 3 elements with water and oxygen, and the bonding and melting points of their oxides.', outcomes: ['TM1'], lessonId: L(1), gen: period3Reactions }),
  skill({ id: 'cx-period3-oxides', name: 'Acidic, basic and amphoteric oxides', description: 'Classify the Period 3 oxides, give the pH of their solutions, and write their reactions with acids and bases.', outcomes: ['TM1'], lessonId: L(1), gen: period3Oxides }),
  skill({ id: 'cx-complex-ions', name: 'Complex ions and ligands', description: 'Describe ligands and coordination numbers, and give the shapes and oxidation states of complex ions.', outcomes: ['TM2'], lessonId: L(2), gen: complexIons }),
  skill({ id: 'cx-transition-colour', name: 'Colour, oxidation states and catalysts', description: 'Explain the colours of complexes with ΔE = hν, the oxidation states of vanadium, and transition metal catalysts.', outcomes: ['TM2'], lessonId: L(2), gen: transitionColour }),
  skill({ id: 'cx-aqua-ions', name: 'Reactions of metal aqua ions', description: 'Identify metal aqua ions by their reactions with hydroxide, ammonia and carbonate, and explain their acidity.', outcomes: ['TM3'], lessonId: L(3), gen: aquaIons }),
  skill({ id: 'cx-ligand-substitution', name: 'Ligand substitution and the chelate effect', description: 'Describe ligand substitution reactions, and explain the chelate effect with entropy.', outcomes: ['TM3'], lessonId: L(3), gen: ligandSubstitution }),
];
