/**
 * More Chemistry Topics, Unit 14 (WAEC): Graham’s law of diffusion and Dalton’s law of partial
 * pressures, vapour pressure, boiling and Brownian motion, and the preparation, drying and
 * collection of gases. Molar masses and vapour pressures are stated in the questions.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { fromBank, q } from './common.ts';

const L = (n: number) => `cx-14-${n}`;

// ---------------------------------------------------------------------------- lesson 14.1: Graham and Dalton

const GASES = [
  { name: 'hydrogen', f: 'H2', m: 2 },
  { name: 'helium', f: 'He', m: 4 },
  { name: 'methane', f: 'CH4', m: 16 },
  { name: 'ammonia', f: 'NH3', m: 17 },
  { name: 'nitrogen', f: 'N2', m: 28 },
  { name: 'oxygen', f: 'O2', m: 32 },
  { name: 'hydrogen chloride', f: 'HCl', m: 36.5 },
  { name: 'carbon dioxide', f: 'CO2', m: 44 },
  { name: 'sulfur dioxide', f: 'SO2', m: 64 },
  { name: 'chlorine', f: 'Cl2', m: 71 },
];
const HINTS_GRAHAM = ['Graham’s law: the rate of diffusion of a gas is inversely proportional to the square root of its molar mass, $\\dfrac{r_1}{r_2} = \\sqrt{\\dfrac{M_2}{M_1}}$.', 'The time for the same volume to diffuse is proportional to $\\sqrt{M}$: a heavier gas takes longer.'];

function graham(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const [a, b] = rng.sample(GASES, 2).sort((x, y) => x.m - y.m);
    const ratio = Math.sqrt(b.m / a.m);
    const ans = Number(fmtFixed(ratio, 2));
    return {
      prompt: `How many times faster does ${a.name}, $\\ce{${a.f}}$, diffuse than ${b.name}, $\\ce{${b.f}}$, under the same conditions? (Relative molecular masses: $\\ce{${a.f}}$ = ${a.m}, $\\ce{${b.f}}$ = ${b.m}.) Give your answer to 2 decimal places.`,
      parts: [numPart(ans, { decimals: 2, tolerance: 0.011 })],
      hints: HINTS_GRAHAM,
      solution: [`$\\dfrac{r_{${a.f}}}{r_{${b.f}}} = \\sqrt{\\dfrac{${b.m}}{${a.m}}} = ${fmtFixed(ratio, 2)}$. The lighter gas diffuses ${fmtFixed(ratio, 2)} times as fast.`],
      calculator: true,
    };
  }
  if (d === 2) {
    const [a, b] = rng.sample(GASES, 2);
    const ta = rng.pick([20, 30, 40, 45, 50, 60]);
    const tb = ta * Math.sqrt(b.m / a.m);
    return {
      prompt: `A volume of ${a.name} (relative molecular mass ${a.m}) diffuses through a porous plug in ${q(ta, 's')}. How long does the same volume of ${b.name} (relative molecular mass ${b.m}) take to diffuse through the same plug under the same conditions? Give your answer to 1 decimal place.`,
      parts: [numPart(Number(fmtFixed(tb, 1)), { decimals: 1, suffix: 's' })],
      hints: HINTS_GRAHAM,
      solution: [`Time is proportional to $\\sqrt{M}$: $t = ${ta} \\times \\sqrt{\\dfrac{${b.m}}{${a.m}}} = ${fmtFixed(tb, 1)}\\ \\text{s}$.`],
      calculator: true,
    };
  }
  const x = rng.pick(GASES.filter((g) => g.f !== 'O2'));
  const tO = rng.pick([40, 50, 60, 80, 100]);
  const tX = Number(fmtFixed(tO * Math.sqrt(x.m / 32), 1));
  const m = 32 * (tX / tO) ** 2;
  return {
    prompt: `The same volume of two gases diffuses through a small hole. Oxygen (relative molecular mass 32) takes ${q(tO, 's')} and gas X takes ${q(fmtFixed(tX, 1), 's')}. What is the relative molecular mass of X? Give your answer to 1 decimal place.`,
    parts: [numPart(Number(fmtFixed(m, 1)), { decimals: 1 })],
    hints: [...HINTS_GRAHAM, 'Rearrange: $M_X = M_{O_2} \\times \\left(\\dfrac{t_X}{t_{O_2}}\\right)^2$.'],
    solution: [`$\\dfrac{t_X}{t_{O_2}} = \\sqrt{\\dfrac{M_X}{32}}$, so $M_X = 32 \\times \\left(\\dfrac{${fmtFixed(tX, 1)}}{${tO}}\\right)^2 = ${fmtFixed(m, 1)}$.`],
    calculator: true,
  };
}

/** Saturated vapour pressure of water, in kPa, at a few room temperatures. */
const SVP: Array<[number, number]> = [[15, 1.7], [20, 2.3], [25, 3.2], [27, 3.6], [30, 4.2]];

function dalton(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Dalton’s law: the total pressure of a mixture of gases that do not react is the sum of their partial pressures.', 'The partial pressure of a gas is its mole fraction times the total pressure.'];
  if (d === 1) {
    const [a, b] = rng.sample(GASES.filter((g) => !['NH3', 'HCl'].includes(g.f)), 2);
    const na = rng.pick([0.5, 1.0, 1.5, 2.0, 3.0]);
    const nb = rng.pick([0.5, 1.0, 2.5, 4.0]);
    const p = rng.pick([100, 120, 150, 200, 250]);
    const pa = (na / (na + nb)) * p;
    return {
      prompt: `A vessel holds ${fmt(na, 1)} mol of ${a.name} and ${fmt(nb, 1)} mol of ${b.name}, which do not react. The total pressure is ${q(p, 'kPa')}. What is the partial pressure of ${a.name}? Give your answer to 1 decimal place.`,
      parts: [numPart(Number(fmtFixed(pa, 1)), { decimals: 1, suffix: 'kPa' })],
      hints,
      solution: [`Mole fraction of ${a.name} $= \\dfrac{${fmt(na, 1)}}{${fmt(na, 1)} + ${fmt(nb, 1)}} = ${fmt(na / (na + nb), 4)}$.`, `Partial pressure $= ${fmt(na / (na + nb), 4)} \\times ${p} = ${fmtFixed(pa, 1)}\\ \\text{kPa}$.`],
      calculator: true,
    };
  }
  const [t, s] = rng.pick(SVP);
  const pAtm = rng.pick([100.0, 101.3, 99.5, 100.6, 98.8]);
  const gas = rng.pick(['hydrogen', 'oxygen', 'nitrogen']);
  if (d === 2) {
    const dry = pAtm - s;
    return {
      prompt: `${gas[0].toUpperCase() + gas.slice(1)} is collected over water at ${t} °C, when the atmospheric pressure is ${q(fmtFixed(pAtm, 1), 'kPa')}. The saturated vapour pressure of water at ${t} °C is ${q(fmtFixed(s, 1), 'kPa')}. What is the pressure of the dry ${gas} in the gas jar?`,
      parts: [numPart(Number(fmtFixed(dry, 1)), { decimals: 1, suffix: 'kPa' })],
      hints: [...hints, 'A gas collected over water is mixed with water vapour; the total pressure equals the atmospheric pressure.'],
      solution: [`$p_{\\text{gas}} = p_{\\text{total}} - p_{\\text{water}} = ${fmtFixed(pAtm, 1)} - ${fmtFixed(s, 1)} = ${fmtFixed(dry, 1)}\\ \\text{kPa}$.`],
    };
  }
  const v = rng.pick([120, 150, 200, 240, 250, 300]);
  const vDry = (v * (pAtm - s)) / pAtm;
  return {
    prompt: `${v} cm³ of ${gas} is collected over water at ${t} °C and an atmospheric pressure of ${q(fmtFixed(pAtm, 1), 'kPa')}. The saturated vapour pressure of water at ${t} °C is ${q(fmtFixed(s, 1), 'kPa')}. What volume would the dry ${gas} occupy at ${q(fmtFixed(pAtm, 1), 'kPa')} and the same temperature? Give your answer to 1 decimal place.`,
    parts: [numPart(Number(fmtFixed(vDry, 1)), { decimals: 1, suffix: 'cm³' })],
    hints: [...hints, 'Find the pressure of the dry gas, then use Boyle’s law, $p_1V_1 = p_2V_2$.'],
    solution: [`Pressure of the dry gas $= ${fmtFixed(pAtm, 1)} - ${fmtFixed(s, 1)} = ${fmtFixed(pAtm - s, 1)}$ kPa.`, `By Boyle’s law, $V = \\dfrac{${fmtFixed(pAtm - s, 1)} \\times ${v}}{${fmtFixed(pAtm, 1)}} = ${fmtFixed(vDry, 1)}\\ \\text{cm}^3$.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 14.2: vapour pressure and Brownian motion

/** Saturated vapour pressure of water (kPa) against temperature (°C). */
const WATER_SVP: Array<[number, number]> = [[60, 19.9], [70, 31.2], [80, 47.4], [90, 70.1], [100, 101.3], [110, 143.3], [120, 198.5]];

function vapourPressure(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Saturated vapour pressure is the pressure of a vapour in equilibrium with its liquid in a closed container. It rises with temperature.', 'A liquid boils when its saturated vapour pressure equals the external pressure.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is the saturated vapour pressure of a liquid?', right: 'The pressure of its vapour when the vapour is in equilibrium with the liquid in a closed container', wrong: ['The pressure needed to turn all of the liquid into a solid', 'The pressure of the air above the liquid in an open beaker', 'The pressure at which the liquid stops evaporating for good'], sol: 'In a closed container, molecules leave and return to the liquid at the same rate; the pressure of the vapour then is the saturated vapour pressure.' },
        { ask: 'When does a liquid boil?', right: 'When its saturated vapour pressure equals the external pressure', wrong: ['When its saturated vapour pressure is zero', 'When its temperature reaches 100 °C, whatever the pressure', 'When all of its molecules have the same energy'], sol: 'At the boiling point, bubbles of vapour can form inside the liquid because the vapour pressure inside them can push back the atmosphere.' },
        { ask: 'How does evaporation differ from boiling?', right: 'Evaporation happens at the surface at any temperature; boiling happens throughout the liquid at one temperature', wrong: ['Evaporation happens throughout the liquid; boiling happens only at the surface', 'Evaporation needs heat from a flame; boiling does not need any heat', 'Evaporation happens only above the boiling point of the liquid'], sol: 'The fastest surface molecules escape at any temperature. Boiling needs the vapour pressure to reach the external pressure.' },
        { ask: 'What is the difference between a vapour and a gas?', right: 'A vapour is below its critical temperature, so pressure alone can turn it back into a liquid', wrong: ['A vapour has no mass, but a gas does', 'A vapour is always coloured, but a gas is colourless', 'A gas is made of molecules, but a vapour is made of ions'], sol: 'Steam at 100 °C is a vapour: squeezing it condenses it. Oxygen at room temperature is above its critical temperature, so pressure alone cannot liquefy it.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why does water boil below 100 °C at the top of a high mountain?', right: 'The air pressure is lower, so the vapour pressure reaches it at a lower temperature', wrong: ['The air is colder, so the water loses heat faster', 'There is less oxygen, so the water cannot burn', 'The water contains fewer dissolved salts there'], sol: 'Boiling needs the vapour pressure to equal the external pressure. Lower pressure means a lower boiling point.' },
        { ask: 'Why does food cook faster in a pressure cooker?', right: 'The higher pressure raises the boiling point of the water, so the food is cooked hotter', wrong: ['The higher pressure pushes heat into the food without raising its temperature', 'The steam cannot escape, so the water boils at a lower temperature', 'The pressure stops the water from evaporating at all'], sol: 'Inside the cooker the pressure may be about 200 kPa, so water boils at about 120 °C.' },
        { ask: 'Ethoxyethane (ether) has a much higher vapour pressure than water at room temperature. What does this tell you?', right: 'It is more volatile, with weaker forces between its molecules, and a lower boiling point', wrong: ['It is less volatile, with stronger forces between its molecules', 'It has a higher boiling point than water', 'Its molecules are heavier than water molecules'], sol: 'Weak intermolecular forces let molecules escape easily, giving a high vapour pressure and a low boiling point.' },
        { ask: 'Why are some liquids distilled under reduced pressure?', right: 'They boil at a lower temperature, so a liquid that would decompose at its normal boiling point can be distilled', wrong: ['Reduced pressure makes the liquid denser, so it separates', 'Reduced pressure raises the boiling point, so impurities boil off', 'Reduced pressure stops the vapour from condensing'], sol: 'Boiling at reduced pressure lowers the boiling point, so heat-sensitive substances can be purified without breaking down.' },
      ],
      hints,
    );
  }
  const [t, p] = rng.pick(WATER_SVP.filter(([tt]) => tt !== 100));
  return {
    prompt: `The saturated vapour pressure of water is ${WATER_SVP.map(([tt, pp]) => `${fmt(pp, 1)} kPa at ${tt} °C`).join(', ')}. At what temperature does water boil when the pressure above it is ${q(fmtFixed(p, 1), 'kPa')}?`,
    parts: [part(mc(rng, `${t} °C`, rng.shuffle(WATER_SVP.map(([tt]) => `${tt} °C`).filter((s) => s !== `${t} °C`)).slice(0, 3)))],
    hints,
    solution: [`Water boils when its vapour pressure equals the external pressure. Its vapour pressure is ${fmtFixed(p, 1)} kPa at ${t} °C, so it boils at ${t} °C.${t < 100 ? ' This is below 100 °C because the pressure is less than one atmosphere.' : ' This is above 100 °C because the pressure is more than one atmosphere.'}`],
  };
}

const SOLIDS = [
  { name: 'sodium chloride', kind: 0 }, { name: 'magnesium oxide', kind: 0 }, { name: 'calcium fluoride', kind: 0 },
  { name: 'copper', kind: 1 }, { name: 'iron', kind: 1 }, { name: 'sodium', kind: 1 },
  { name: 'diamond', kind: 2 }, { name: 'silicon dioxide (sand)', kind: 2 }, { name: 'graphite', kind: 2 },
  { name: 'iodine', kind: 3 }, { name: 'ice', kind: 3 }, { name: 'sugar (sucrose)', kind: 3 }, { name: 'naphthalene', kind: 3 },
];
const SOLID_KINDS = ['Ionic', 'Metallic', 'Covalent network', 'Molecular'];
const SOLID_WHY = [
  'positive and negative ions held in a lattice by strong electrostatic attraction',
  'positive ions in a sea of delocalised electrons',
  'atoms joined by covalent bonds in one giant network',
  'small molecules held together by weak intermolecular forces',
];

function kineticEvidence(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['The kinetic theory says the particles of matter are always moving, and they move faster when hotter.', 'Gas particles move freely and far apart; liquid particles slide past each other; solid particles vibrate about fixed positions.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Under a microscope, pollen grains in water move about in short, random jerks. What explains this Brownian motion?', right: 'Fast-moving water molecules hit the grains unevenly from different sides', wrong: ['The pollen grains are alive and swim through the water', 'Convection currents carry the grains round in circles', 'The light from the microscope pushes the grains along'], sol: 'Brownian motion is evidence for moving particles: the invisible water molecules bump the visible grains unequally from moment to moment.' },
        { ask: 'Specks of smoke in a glass box, lit from the side, are seen to jiggle. What does this show?', right: 'The air molecules are moving randomly and colliding with the smoke specks', wrong: ['The smoke specks are hotter than the air, so they rise', 'The smoke is reacting with oxygen in the air', 'The glass box is vibrating because of the light'], sol: 'This is Brownian motion in a gas: the specks are pushed about by unequal collisions with air molecules.' },
        { ask: 'Why does dust in a beam of sunlight drift about in random directions?', right: 'Air molecules strike the dust particles unevenly', wrong: ['The dust particles repel one another', 'Sunlight heats each speck to a different temperature', 'The dust particles are pulled by gravity in turns'], sol: 'The dust is moved by collisions with moving air molecules, which we cannot see.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const x = rng.pick(SOLIDS);
    return {
      prompt: `What kind of solid is ${x.name}?`,
      parts: [part(fixedChoice(SOLID_KINDS, x.kind))],
      hints: ['Ionic: a metal combined with a non-metal. Metallic: a metal element. Covalent network: diamond, graphite, silicon dioxide. Molecular: small covalent molecules.'],
      solution: [`${x.name[0].toUpperCase() + x.name.slice(1)} is a ${SOLID_KINDS[x.kind].toLowerCase()} solid: ${SOLID_WHY[x.kind]}.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Ammonia and hydrogen chloride are let into opposite ends of a long glass tube at the same moment. Where does the white ring of ammonium chloride form?', right: 'Nearer the hydrogen chloride end, because ammonia molecules are lighter and diffuse faster', wrong: ['Nearer the ammonia end, because hydrogen chloride molecules are lighter', 'Exactly in the middle, because all gases diffuse at the same rate', 'At both ends, because the gases react as soon as they enter'], sol: 'Ammonia ($M_r = 17$) diffuses faster than hydrogen chloride ($M_r = 36.5$), so it travels further before they meet.' },
      { ask: 'Why does a drop of ink spread through a beaker of hot water faster than through cold water?', right: 'The water molecules move faster when hot, so they mix the ink particles faster', wrong: ['Hot water is denser, so it carries the ink down', 'The ink dissolves less in hot water, so it spreads', 'Cold water molecules do not move at all'], sol: 'Diffusion is faster at a higher temperature because the particles have more kinetic energy.' },
      { ask: 'How does the orderliness of the particles change from gas to liquid to solid?', right: 'It increases: the particles become more ordered and less random', wrong: ['It decreases: the particles become more random', 'It stays the same, because the particles are identical', 'It increases from gas to liquid, then decreases to solid'], sol: 'Randomness decreases, and orderliness increases, from gas to liquid to solid.' },
      { ask: 'Iodine crystals warmed gently give a violet vapour without melting. What is this change called?', right: 'Sublimation', wrong: ['Evaporation', 'Condensation', 'Deliquescence'], sol: 'Sublimation is the change from solid straight to gas. Iodine, naphthalene and ammonium chloride sublime when heated.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 14.3: preparing and collecting gases

const PREPS = [
  { gas: 'hydrogen', f: 'H2', reagents: 'Zinc granules and dilute hydrochloric acid', eq: 'Zn + 2HCl -> ZnCl2 + H2', collect: 0, dry: 'Concentrated sulfuric acid or fused calcium chloride' },
  { gas: 'oxygen', f: 'O2', reagents: 'Hydrogen peroxide solution with manganese(IV) oxide as a catalyst', eq: '2H2O2 -> 2H2O + O2', collect: 0, dry: 'Concentrated sulfuric acid or fused calcium chloride' },
  { gas: 'carbon dioxide', f: 'CO2', reagents: 'Marble chips (calcium carbonate) and dilute hydrochloric acid', eq: 'CaCO3 + 2HCl -> CaCl2 + H2O + CO2', collect: 2, dry: 'Concentrated sulfuric acid or fused calcium chloride' },
  { gas: 'ammonia', f: 'NH3', reagents: 'Ammonium chloride heated with calcium hydroxide', eq: '2NH4Cl + Ca(OH)2 -> CaCl2 + 2H2O + 2NH3', collect: 1, dry: 'Calcium oxide (quicklime)' },
  { gas: 'chlorine', f: 'Cl2', reagents: 'Concentrated hydrochloric acid heated with manganese(IV) oxide', eq: 'MnO2 + 4HCl -> MnCl2 + 2H2O + Cl2', collect: 2, dry: 'Concentrated sulfuric acid' },
  { gas: 'hydrogen chloride', f: 'HCl', reagents: 'Sodium chloride and concentrated sulfuric acid', eq: 'NaCl + H2SO4 -> NaHSO4 + HCl', collect: 2, dry: 'Concentrated sulfuric acid' },
];
const COLLECT = ['Over water', 'By upward delivery (downward displacement of air)', 'By downward delivery (upward displacement of air)'];
const WRONG_EQ: Record<string, string[]> = {
  H2: ['Zn + HCl -> ZnCl + H', 'Zn + 2HCl -> ZnCl2 + 2H2', 'Zn + H2SO4 -> ZnO + SO2 + H2'],
  O2: ['H2O2 -> H2 + O2', '2H2O2 -> 2H2 + 2O2', 'MnO2 -> Mn + O2'],
  CO2: ['CaCO3 + HCl -> CaCl + CO2 + OH', 'CaCO3 + 2HCl -> CaCl2 + H2 + CO3', 'CaCO3 + H2O -> Ca(OH)2 + CO2'],
  NH3: ['NH4Cl -> NH3 + Cl', 'NH4Cl + NaOH -> NaCl + NH4OH + H2', '2NH4Cl + Ca(OH)2 -> CaCl2 + 2H2 + N2'],
  Cl2: ['MnO2 + 2HCl -> MnCl2 + O2 + H2', 'MnO2 + 4HCl -> MnCl4 + 2H2O', 'HCl -> H + Cl'],
  HCl: ['NaCl + H2SO4 -> Na2SO4 + Cl2', 'NaCl + H2O -> NaOH + HCl', '2NaCl + H2SO4 -> Na2SO4 + H2 + Cl2'],
};

function gasPreparation(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Hydrogen: a metal and a dilute acid. Oxygen: hydrogen peroxide and a catalyst. Carbon dioxide: a carbonate and an acid.', 'Ammonia: an ammonium salt heated with an alkali. Chlorine: concentrated hydrochloric acid oxidised by manganese(IV) oxide. Hydrogen chloride: a chloride and concentrated sulfuric acid.'];
  const x = rng.pick(PREPS);
  if (d === 1) {
    return {
      prompt: `Which reagents are used to prepare ${x.gas} in the laboratory?`,
      parts: [part(mc(rng, x.reagents, PREPS.filter((y) => y !== x).map((y) => y.reagents)))],
      hints,
      solution: [`${x.gas[0].toUpperCase() + x.gas.slice(1)} is made from ${x.reagents.toLowerCase()}: $\\ce{${x.eq}}$.`],
    };
  }
  if (d === 2) {
    return {
      prompt: `Which balanced equation shows the laboratory preparation of ${x.gas}?`,
      parts: [part(mc(rng, `$\\ce{${x.eq}}$`, WRONG_EQ[x.f].map((e) => `$\\ce{${e}}$`)))],
      hints,
      solution: [`$\\ce{${x.eq}}$. Count each kind of atom on both sides to check it balances.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Why is dilute sulfuric acid not used with marble chips to make carbon dioxide?', right: 'Insoluble calcium sulfate coats the chips and soon stops the reaction', wrong: ['Sulfuric acid does not react with any carbonate', 'Sulfuric acid gives sulfur dioxide instead of carbon dioxide', 'The reaction is too violent to control'], sol: 'Calcium sulfate is only slightly soluble, so a layer forms on the marble and keeps the acid away.' },
      { ask: 'Why is nitric acid not used with zinc to prepare hydrogen?', right: 'Nitric acid is an oxidising agent, so it gives oxides of nitrogen instead of hydrogen', wrong: ['Nitric acid is too weak to react with zinc', 'Zinc nitrate is insoluble and coats the zinc', 'Nitric acid makes the hydrogen explode at once'], sol: 'Nitric acid oxidises any hydrogen to water, and is itself reduced to NO or NO₂.' },
      { ask: 'In preparing chlorine, the gas is passed first through water and then through concentrated sulfuric acid. Why?', right: 'The water removes hydrogen chloride, and the acid then dries the chlorine', wrong: ['The water dries the chlorine, and the acid removes oxygen', 'Both liquids are there to make the chlorine react faster', 'The water turns the chlorine into hydrogen chloride'], sol: 'Hydrogen chloride is very soluble in water, chlorine only a little. Concentrated sulfuric acid then absorbs the water vapour.' },
      { ask: 'Why is the flask tilted downwards when ammonia is made by heating a solid mixture?', right: 'So that water formed in the reaction cannot run back onto the hot glass and crack it', wrong: ['So that the ammonia, which is dense, can flow out', 'So that the solids mix better as they melt', 'So that air can enter and react with the ammonia'], sol: 'The reaction gives water vapour, which condenses near the mouth of the flask; tilting stops it running back.' },
    ],
    hints,
  );
}

function gasCollection(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Gases that are not very soluble in water are collected over water.', 'A soluble gas lighter than air (relative molecular mass below about 29) is collected by upward delivery; a soluble gas denser than air by downward delivery.'];
  const x = rng.pick(PREPS);
  if (d === 1) {
    return {
      prompt: `How is ${x.gas}, $\\ce{${x.f}}$, collected in the laboratory?`,
      parts: [part(fixedChoice(COLLECT, x.collect))],
      hints,
      solution: [x.collect === 0 ? `${x.gas[0].toUpperCase() + x.gas.slice(1)} is only slightly soluble in water, so it is collected over water.` : x.collect === 1 ? 'Ammonia is very soluble in water and lighter than air (Mᵣ = 17), so it is collected by upward delivery into an inverted gas jar.' : `${x.gas[0].toUpperCase() + x.gas.slice(1)} dissolves in water and is denser than air, so it is collected by downward delivery into an upright gas jar. (Carbon dioxide can also be collected over water.)`],
    };
  }
  if (d === 2) {
    // Ammonia, a base, against the acidic gases.
    const y = rng.pick(PREPS.filter((p) => ['NH3', 'CO2', 'Cl2', 'HCl'].includes(p.f)));
    const base = y.f === 'NH3';
    const right = base ? 'Calcium oxide (quicklime)' : 'Concentrated sulfuric acid';
    const wrong = base ? ['Concentrated sulfuric acid', 'Fused calcium chloride', 'Phosphorus(V) oxide'] : ['Calcium oxide (quicklime)', 'Soda lime', 'Sodium hydroxide pellets'];
    return {
      prompt: `Which substance is used to dry ${y.gas}?`,
      parts: [part(mc(rng, right, wrong))],
      hints: ['A drying agent must not react with the gas it dries.', 'Ammonia is a base, so it reacts with acidic drying agents and with calcium chloride. Acidic gases react with basic drying agents.'],
      solution: [base ? 'Ammonia is dried with calcium oxide. It would react with concentrated sulfuric acid and phosphorus(V) oxide, and it forms a compound with calcium chloride.' : `${y.gas[0].toUpperCase() + y.gas.slice(1)} is an acidic gas, so it is dried with concentrated sulfuric acid. Quicklime, soda lime and sodium hydroxide are bases and would react with it.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'A gas is very soluble in water, lighter than air, and turns damp red litmus paper blue. Which gas is it?', right: 'Ammonia', wrong: ['Hydrogen chloride', 'Carbon dioxide', 'Oxygen'], sol: 'Ammonia is the only common alkaline gas, and its relative molecular mass, 17, is less than that of air.' },
      { ask: 'In the fountain experiment with hydrogen chloride, water with blue litmus rushes into the flask and turns red. What two properties does this show?', right: 'Hydrogen chloride is very soluble in water, and its solution is acidic', wrong: ['Hydrogen chloride is denser than water, and it is neutral', 'Hydrogen chloride is insoluble, and it bleaches litmus', 'Hydrogen chloride reacts with glass, and its solution is alkaline'], sol: 'The gas dissolves so fast that the pressure in the flask drops and water is pushed in; the solution, hydrochloric acid, turns litmus red.' },
      { ask: 'Why is hydrogen not collected by upward delivery, even though it is lighter than air?', right: 'It is only slightly soluble in water, so collecting it over water is simpler and shows when the jar is full', wrong: ['It is denser than air, so it falls out of the jar', 'It reacts with the air in the jar at once', 'It dissolves in water, so it cannot be collected over water'], sol: 'Collection over water gives a purer gas with no air mixed in, so it is used for gases that are not very soluble.' },
      { ask: 'Which gas could be collected by downward delivery but not over water?', right: 'Hydrogen chloride', wrong: ['Hydrogen', 'Oxygen', 'Nitrogen'], sol: 'Hydrogen chloride is very soluble in water and denser than air ($M_r = 36.5$), so it goes into an upright jar.' },
    ],
    hints,
  );
}

export const WAEC14_SKILLS: SkillDef[] = [
  skill({ id: 'cx-w-graham', name: 'Graham’s law of diffusion', description: 'Compare the rates and times of diffusion of two gases, and find a molar mass from diffusion times.', outcomes: ['WG1'], lessonId: L(1), gen: graham }),
  skill({ id: 'cx-w-dalton', name: 'Dalton’s law of partial pressures', description: 'Find partial pressures from mole fractions, and the pressure and volume of a dry gas collected over water.', outcomes: ['WG1'], lessonId: L(1), gen: dalton }),
  skill({ id: 'cx-w-vapour-pressure', name: 'Vapour pressure and boiling', description: 'Explain saturated vapour pressure and boiling, and find a boiling point from vapour pressure data.', outcomes: ['WG2'], lessonId: L(2), gen: vapourPressure }),
  skill({ id: 'cx-w-kinetic-evidence', name: 'Brownian motion, diffusion and solids', description: 'Explain Brownian motion and diffusion with the kinetic theory, and classify solids as ionic, metallic, covalent network or molecular.', outcomes: ['WG2'], lessonId: L(2), gen: kineticEvidence }),
  skill({ id: 'cx-w-gas-preparation', name: 'Preparing gases', description: 'Give the reagents and equations for preparing common gases, and explain the choices made.', outcomes: ['WG3'], lessonId: L(3), gen: gasPreparation }),
  skill({ id: 'cx-w-gas-collection', name: 'Drying and collecting gases', description: 'Choose how to collect and dry a gas from its solubility, density and acidity.', outcomes: ['WG3'], lessonId: L(3), gen: gasCollection }),
];
