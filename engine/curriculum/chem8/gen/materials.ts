/**
 * Grade 8 Chemistry, Unit 4: Reactions and Materials (8-D1, 8-D2). Burning and its products, the
 * fire triangle, the conditions for rusting and ways to stop it, the uses of metals, alloys and
 * gold's carat scale, and polymers, ceramics and composites.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { bank, either, fromBank, NAMES, num, q, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `c8-4-${n}`;

// ---------------------------------------------------------------------------- 4.1 combustion

const COMB_EASY: Q[] = [
  { q: 'What is combustion?', a: 'Burning: a reaction of a fuel with oxygen that gives out heat and light', w: ['A substance melting when it is heated', 'A gas dissolving in water', 'Any change of state'], why: 'Combustion is the chemical name for burning.' },
  { q: 'Which gas from the air is needed for a fuel to burn?', a: 'Oxygen', w: ['Nitrogen', 'Carbon dioxide', 'Argon'], why: 'Burning is a reaction with oxygen.' },
  { q: 'Which test shows that a gas is carbon dioxide?', a: 'It turns limewater cloudy (milky)', w: ['It relights a glowing splint', 'It burns with a squeaky pop', 'It turns limewater blue'], why: 'Carbon dioxide reacts with limewater to make a white solid, so the limewater turns milky.' },
];

const FUELS: Array<{ f: string; products: string; why: string }> = [
  { f: 'methane (natural gas, made of carbon and hydrogen)', products: 'carbon dioxide and water', why: 'The carbon becomes carbon dioxide and the hydrogen becomes water.' },
  { f: 'propane (a camping gas made of carbon and hydrogen)', products: 'carbon dioxide and water', why: 'The carbon becomes carbon dioxide and the hydrogen becomes water.' },
  { f: 'candle wax (made of carbon and hydrogen)', products: 'carbon dioxide and water', why: 'The carbon becomes carbon dioxide and the hydrogen becomes water.' },
  { f: 'hydrogen', products: 'water only', why: 'Hydrogen joins with oxygen to make water. There is no carbon, so no carbon dioxide.' },
  { f: 'charcoal (almost pure carbon)', products: 'carbon dioxide only', why: 'Carbon joins with oxygen to make carbon dioxide. There is no hydrogen, so no water.' },
  { f: 'magnesium', products: 'magnesium oxide only', why: 'Magnesium joins with oxygen to make magnesium oxide.' },
  { f: 'sulfur', products: 'sulfur dioxide only', why: 'Sulfur joins with oxygen to make sulfur dioxide.' },
];
const PRODUCT_CHOICES = [...new Set(FUELS.map((x) => x.products)), 'oxygen and water', 'carbon and hydrogen'];

function combustionProducts(rng: Rng): GenOutput {
  const x = rng.pick(FUELS);
  return {
    prompt: `What is made when ${x.f} burns completely in plenty of oxygen?`,
    parts: [part(mc(rng, x.products, rng.sample(PRODUCT_CHOICES.filter((p) => p !== x.products), 3)))],
    hints: ['Each element in the fuel joins with oxygen: carbon makes carbon dioxide, hydrogen makes water.'],
    solution: [x.why, `Answer: ${x.products}`],
  };
}

const COMB_HARD: Select[] = [
  { q: 'Which statements about burning fuels are true?', opts: [['Burning gives out heat and light.', true], ['Burning a fuel that contains carbon makes carbon dioxide.', true], ['With too little oxygen, poisonous carbon monoxide and soot can form.', true], ['Burning is a physical change.', false], ['Burning needs nitrogen from the air.', false]], why: 'Combustion is a chemical reaction with oxygen. Too little oxygen gives carbon monoxide, which is why gas heaters need good air flow.' },
  { q: 'A candle burns under an upturned jar. Which statements are true?', opts: [['The flame goes out when the oxygen in the jar is used up.', true], ['Droplets of water form on the inside of the jar.', true], ['The gas left in the jar turns limewater cloudy.', true], ['The flame burns for ever under the jar.', false], ['The candle makes oxygen as it burns.', false]], why: 'The candle uses up oxygen and makes water and carbon dioxide, which turns limewater milky.' },
];

// ---------------------------------------------------------------------------- 4.1 fire triangle

const FIRE_EASY: Q[] = [
  { q: 'What are the three sides of the fire triangle?', a: 'Fuel, heat and oxygen', w: ['Fuel, water and nitrogen', 'Heat, light and smoke', 'Oxygen, carbon dioxide and water'], why: 'A fire needs all three. Take one away, and the fire goes out.' },
  { q: 'Why does a fire go out when one side of the fire triangle is removed?', a: 'A fire needs fuel, heat and oxygen all at once', w: ['The fire runs out of light', 'The smoke puts it out', 'The fire turns into water'], why: 'Removing any one of the three stops the reaction.' },
];

const PUT_OUT: Array<{ m: string; side: 'Fuel' | 'Heat' | 'Oxygen' }> = [
  { m: 'spraying water on burning wood', side: 'Heat' },
  { m: 'covering a burning pan with a fire blanket', side: 'Oxygen' },
  { m: 'turning off the gas supply to a gas fire', side: 'Fuel' },
  { m: 'cutting a wide strip through a forest so a wildfire has nothing to burn', side: 'Fuel' },
  { m: 'spraying carbon dioxide from an extinguisher over a fire', side: 'Oxygen' },
  { m: 'smothering a small fire with sand', side: 'Oxygen' },
  { m: 'putting a lid on a burning candle in a jar', side: 'Oxygen' },
];
const SIDES = ['Fuel', 'Heat', 'Oxygen'];

function whichSide(rng: Rng): GenOutput {
  const x = rng.pick(PUT_OUT);
  return {
    prompt: `A fire is put out by ${x.m}. Which side of the fire triangle is removed?`,
    parts: [part(fixedChoice(SIDES, SIDES.indexOf(x.side)))],
    hints: ['Water cools; blankets, sand and carbon dioxide keep air out; taking away what burns removes the fuel.'],
    solution: [`Answer: ${x.side}.`],
  };
}

const FIRE_HARD: Select[] = [
  { q: 'Which statements about putting out fires are true?', opts: [['Water should never be thrown on burning cooking oil.', true], ['Water should not be used on electrical fires.', true], ['A fire blanket works by keeping oxygen out.', true], ['Water puts out every kind of fire safely.', false], ['Adding more air puts a fire out.', false]], why: 'Water on burning oil makes it spit and spread, and water conducts electricity. A blanket starves the fire of oxygen.' },
];

// ---------------------------------------------------------------------------- 4.2 rusting

const RUST_EASY: Q[] = [
  { q: 'What does iron need in order to rust?', a: 'Both water and oxygen', w: ['Water only', 'Oxygen only', 'Heat and light'], why: 'Iron rusts only when water and oxygen are both present.' },
  { q: 'Which metals rust?', a: 'Iron, and steel, which is mostly iron', w: ['All metals', 'Gold and silver', 'Aluminium and copper'], why: 'Rusting is the corrosion of iron. Other metals corrode, but only iron and steel rust.' },
  { q: 'What is rust?', a: 'A new substance, a form of iron oxide, made when iron reacts', w: ['Dirt that sticks to iron', 'Iron that has melted', 'Paint that has peeled off iron'], why: 'Rusting is a chemical change: iron reacts with oxygen and water to make hydrated iron oxide.' },
];

const TUBES: Array<{ d: string; rusts: boolean; why: string }> = [
  { d: 'in a test tube of tap water, open to the air', rusts: true, why: 'It has both water and oxygen.' },
  { d: 'in a sealed tube of dry air, with a drying agent that removes all water vapour', rusts: false, why: 'There is oxygen, but no water.' },
  { d: 'in water that was boiled to remove the dissolved air, with a layer of oil on top to keep air out', rusts: false, why: 'There is water, but no oxygen.' },
  { d: 'in salty water, open to the air', rusts: true, why: 'It has water and oxygen, and the salt makes it rust even faster.' },
  { d: 'on a damp cloth in the air', rusts: true, why: 'It has both water and oxygen.' },
];

function whichTube(rng: Rng): GenOutput {
  const t = rng.pick(TUBES);
  const ch = ['It rusts', 'It does not rust'];
  const a = t.rusts ? ch[0] : ch[1];
  return {
    prompt: `An iron nail is left for a week ${t.d}. Does it rust?`,
    parts: [part(fixedChoice(ch, ch.indexOf(a)))],
    hints: ['Does the nail have both water and oxygen?'],
    solution: [t.why, `Answer: ${a}`],
  };
}

const RUST_HARD: Select[] = [
  { q: 'Which statements about rusting are true?', opts: [['Iron rusts faster in salty water.', true], ['Rusting is a chemical change.', true], ['Rusting is a slow reaction with oxygen (an oxidation).', true], ['Iron rusts in dry air.', false], ['Rust makes iron stronger.', false], ['Aluminium rusts.', false]], why: 'Rusting is a slow oxidation that needs water and oxygen, speeds up with salt, and weakens iron. Only iron and steel rust.' },
];

// ---------------------------------------------------------------------------- 4.2 prevention

const PREVENT_EASY: Q[] = [
  { q: 'How does painting a steel gate stop it rusting?', a: 'The paint keeps water and oxygen away from the steel', w: ['The paint turns the steel into a different metal', 'The paint makes the steel hotter', 'The paint adds oxygen to the steel'], why: 'A barrier stops the water and oxygen from reaching the iron.' },
  { q: 'Why is oil put on a bicycle chain?', a: 'It keeps water and air off the metal and lets the chain move freely', w: ['It makes the chain heavier', 'It makes the chain magnetic', 'It dissolves the rust that is already there'], why: 'Oil or grease is a barrier that still lets moving parts slide.' },
];

const OBJECTS: Array<{ o: string; m: string; why: string }> = [
  { o: 'a bicycle chain', m: 'Oiling or greasing', why: 'Paint would crack off moving parts; oil keeps water out and lets the chain move.' },
  { o: 'a steel garden gate', m: 'Painting', why: 'Paint is a cheap, lasting barrier for a large surface that does not move.' },
  { o: 'a steel dish rack in a kitchen', m: 'Coating with plastic', why: 'A plastic coating is waterproof and will not scratch dishes.' },
  { o: 'a steel bucket or a road barrier left outdoors for years', m: 'Galvanizing (coating with zinc)', why: 'Zinc protects the steel even if the coating is scratched.' },
  { o: 'a food can', m: 'Coating with tin', why: 'Tin is unreactive and safe with food.' },
  { o: 'cutlery and kitchen sinks', m: 'Using stainless steel', why: 'Stainless steel is an alloy with chromium that does not rust, even when wet and scratched.' },
];
const METHODS = OBJECTS.map((x) => x.m);

function bestMethod(rng: Rng): GenOutput {
  const x = rng.pick(OBJECTS);
  return {
    prompt: `Which is the best way to stop ${x.o} from rusting?`,
    parts: [part(mc(rng, x.m, rng.sample(METHODS.filter((m) => m !== x.m), 3)))],
    hints: ['Think about whether the object moves, gets scratched, touches food or stays outdoors.'],
    solution: [x.why, `Answer: ${x.m}`],
  };
}

const PREVENT_HARD: Select[] = [
  { q: 'A galvanized steel bucket is scratched through its zinc coating. Which statements are true?', opts: [['The steel still does not rust.', true], ['The zinc corrodes instead of the iron.', true], ['Zinc is more reactive than iron.', true], ['The bucket now rusts as fast as bare steel.', false], ['Zinc is magnetic, so it holds the rust in.', false]], why: 'Zinc is more reactive, so it reacts in place of the iron. This is called sacrificial protection.' },
  { q: 'Which methods stop rusting by keeping water and oxygen away?', opts: [['Painting', true], ['Oiling', true], ['Coating with plastic', true], ['Leaving the iron in salty water', false], ['Washing the iron every day and leaving it wet', false]], why: 'Paint, oil and plastic are barriers. Salt and water make rusting faster.' },
];

// ---------------------------------------------------------------------------- 4.3 metal uses

const USES: Array<{ use: string; metal: string; why: string }> = [
  { use: 'water pipes', metal: 'Copper', why: 'Copper does not react with water and is easy to bend into shape.' },
  { use: 'drink cans and foil', metal: 'Aluminium', why: 'Aluminium is light, malleable and does not corrode.' },
  { use: 'bridges and the frames of tall buildings', metal: 'Steel', why: 'Steel is very strong and cheap.' },
  { use: 'artificial hip joints', metal: 'Titanium', why: 'Titanium is strong, light and does not react with the body.' },
  { use: 'electrical wiring', metal: 'Copper', why: 'Copper is an excellent conductor and is ductile.' },
  { use: 'jewellery', metal: 'Gold', why: 'Gold is shiny, easy to shape and does not tarnish.' },
];

function metalForUse(rng: Rng): GenOutput {
  const x = rng.pick(USES);
  const metals = [...new Set(USES.map((u) => u.metal))].filter((m) => m !== x.metal);
  return {
    prompt: `Which metal is best for ${x.use}?`,
    parts: [part(mc(rng, x.metal, rng.sample(metals, 3)))],
    hints: ['Which property does the job need most: strength, lightness, conducting, or not corroding?'],
    solution: [x.why, `Answer: ${x.metal}`],
  };
}

const USE_MEDIUM: Q[] = [
  { q: 'Why are saucepans often made of metal?', a: 'Metals conduct heat well, so the food heats quickly', w: ['Metals are good insulators', 'Metals are brittle', 'Metals have low melting points'], why: 'Good conduction carries heat from the cooker to the food.' },
  { q: 'Why is aluminium used for overhead power cables instead of copper?', a: 'It conducts well but is much less dense, so the cables are lighter', w: ['It conducts electricity better than any metal', 'It is magnetic', 'It does not conduct electricity'], why: 'Light cables need fewer, smaller pylons.' },
];

const USE_HARD: Select[] = [
  { q: 'Which uses depend on a metal being malleable or ductile?', opts: [['Drawing copper into wire', true], ['Rolling aluminium into foil', true], ['Hammering gold into thin leaf', true], ['Using copper because it conducts electricity', false], ['Using titanium because it does not react with the body', false]], why: 'Malleable means it can be shaped by hammering or rolling; ductile means it can be drawn into wire.' },
];

// ---------------------------------------------------------------------------- 4.3 alloys

const ALLOY_EASY: Q[] = [
  { q: 'What is an alloy?', a: 'A mixture of a metal with one or more other elements', w: ['A pure metal', 'A compound of a metal and oxygen', 'A metal that has rusted'], why: 'Steel, brass and bronze are alloys: metals mixed with other elements.' },
  { q: 'What is steel mainly made of?', a: 'Iron, with a little carbon', w: ['Copper and zinc', 'Copper and tin', 'Aluminium and gold'], why: 'Steel is iron with a small amount of carbon, which makes it much harder.' },
  { q: 'Brass is made of copper and which other metal?', a: 'Zinc', w: ['Tin', 'Iron', 'Gold'], why: 'Brass is copper and zinc. Bronze is copper and tin.' },
];

const ALLOY_MEDIUM: Q[] = [
  { q: 'Why is an alloy usually harder than the pure metal?', a: 'Atoms of different sizes stop the layers of metal atoms sliding over one another', w: ['The alloy has more atoms in it', 'The alloy is a compound with new bonds', 'The alloy has been heated for longer'], why: 'In a pure metal the neat layers slide easily; different-sized atoms jam them.' },
  { q: 'Why is pure gold rarely used for rings?', a: 'Pure gold is too soft; alloying it with copper or silver makes it harder', w: ['Pure gold tarnishes quickly', 'Pure gold is magnetic', 'Pure gold is a liquid'], why: 'Gold is very soft, so it is mixed with other metals to resist scratches and bending.' },
  { q: 'Why are sinks and cutlery made of stainless steel?', a: 'It does not rust, even when wet', w: ['It is the softest metal', 'It is cheaper than any other material', 'It is a good electrical insulator'], why: 'Stainless steel contains chromium and nickel, which stop it rusting.' },
];

function carat(rng: Rng): GenOutput {
  const k = rng.pick([9, 12, 14, 18, 22]);
  if (rng.chance(0.5)) {
    const pct = (k / 24) * 100;
    return {
      prompt: `Pure gold is 24 carat. The carat number of a gold alloy is how many parts of gold it has in every 24 parts. What percentage of a ${k}-carat gold ring is gold? Give your answer to one decimal place if needed.`,
      parts: [numPart(Number(num(pct, 1)), { suffix: '%', decimals: 1, tolerance: 0.051 })],
      hints: [`Gold is ${k} parts in 24, so work out ${k} ÷ 24 × 100.`],
      solution: [`$\\dfrac{${k}}{24} \\times 100 = ${num(pct, 1)}\\%$`],
    };
  }
  const mass = rng.pick([4, 6, 8, 12]);
  const gold = (mass * k) / 24;
  return {
    prompt: `Pure gold is 24 carat, and the carat number of a gold alloy is how many parts of gold it has in every 24 parts. ${rng.pick(NAMES)} has a ${k}-carat gold chain with a mass of ${q(mass, 'g')}. What mass of pure gold does it contain?`,
    parts: [numPart(Number(num(gold)), { suffix: 'g', decimals: 2, tolerance: 0.011 })],
    hints: [`The fraction of gold is ${k} ÷ 24.`],
    solution: [`$${mass} \\times \\dfrac{${k}}{24} = ${num(gold)}\\ \\text{g}$`],
  };
}

// ---------------------------------------------------------------------------- 4.4 materials

const MAT: Array<{ m: string; type: 'Polymer' | 'Ceramic' | 'Composite' | 'Metal'; why: string }> = [
  { m: 'a plastic carrier bag', type: 'Polymer', why: 'Plastics are polymers: long chain molecules.' },
  { m: 'a nylon rope', type: 'Polymer', why: 'Nylon is a polymer.' },
  { m: 'a china cup', type: 'Ceramic', why: 'Pottery and china are ceramics made by heating clay.' },
  { m: 'a window pane of glass', type: 'Ceramic', why: 'Glass is a ceramic made by melting sand.' },
  { m: 'a house brick', type: 'Ceramic', why: 'Brick is clay hardened by firing in a kiln.' },
  { m: 'reinforced concrete, with steel rods inside', type: 'Composite', why: 'It combines concrete and steel.' },
  { m: 'fibreglass, glass fibres set in plastic', type: 'Composite', why: 'It combines glass fibres with a polymer.' },
  { m: 'carbon fibre, used in racing bikes', type: 'Composite', why: 'It combines carbon fibres with a polymer resin.' },
  { m: 'plywood, thin layers of wood glued at right angles', type: 'Composite', why: 'It combines wood layers and glue.' },
  { m: 'a copper pipe', type: 'Metal', why: 'Copper is a metal.' },
];
const TYPES = ['Metal', 'Polymer', 'Ceramic', 'Composite'];

function materialType(rng: Rng): GenOutput {
  const x = rng.pick(MAT);
  return {
    prompt: `What kind of material is ${x.m}?`,
    parts: [part(fixedChoice(TYPES, TYPES.indexOf(x.type)))],
    hints: ['Polymers include plastics; ceramics include pottery, glass and brick; a composite combines two or more materials.'],
    solution: [x.why, `Answer: ${x.type}`],
  };
}

const MAT_MEDIUM: Q[] = [
  { q: 'Which properties are typical of ceramics such as pottery and glass?', a: 'Hard, brittle, with high melting points, and good insulators', w: ['Soft, flexible and good conductors', 'Light, stretchy and easily melted', 'Magnetic and malleable'], why: 'Ceramics are hard and heat-resistant but shatter when dropped.' },
  { q: 'What is a polymer?', a: 'A substance made of very long chain molecules, such as a plastic', w: ['A mixture of two metals', 'A material made by firing clay', 'A single atom of carbon'], why: 'Polymers are made by joining many small molecules into long chains.' },
  { q: 'Why are composites made?', a: 'To combine the useful properties of two or more materials', w: ['To make a material that is a pure element', 'To make a material that is always cheaper', 'To make a material that is always heavier'], why: 'Reinforced concrete is strong when squeezed (concrete) and when stretched (steel).' },
  { q: 'Why can plastic waste be a problem?', a: 'Most plastics do not rot, so they last for hundreds of years', w: ['Plastics rot too quickly', 'Plastics are always poisonous to touch', 'Plastics conduct electricity'], why: 'Their long life makes plastics useful, but it means litter stays in the environment.' },
];

const MAT_HARD: Select[] = [
  { q: 'Which of these are composites?', opts: [['Reinforced concrete', true], ['Fibreglass', true], ['Carbon fibre', true], ['Pure copper', false], ['A glass bottle', false], ['A polythene bag', false]], why: 'Composites combine two or more materials. Copper is a metal, glass a ceramic and polythene a polymer.' },
];

const JOBS: Array<{ job: string; mat: string; why: string; wrong: string[] }> = [
  { job: 'the handle of a saucepan', mat: 'A hard plastic', why: 'It must not conduct heat to the cook’s hand.', wrong: ['Copper', 'Aluminium', 'Steel'] },
  { job: 'a window', mat: 'Glass', why: 'It must be transparent and weatherproof.', wrong: ['Steel', 'Brick', 'Carbon fibre'] },
  { job: 'the frame of a racing bicycle', mat: 'Carbon fibre', why: 'It must be very strong and very light.', wrong: ['Glass', 'Pottery', 'Lead'] },
  { job: 'the covering of an electrical wire', mat: 'PVC plastic', why: 'It must be a flexible electrical insulator.', wrong: ['Copper', 'Glass', 'Steel'] },
  { job: 'tiles around an oven', mat: 'Ceramic tiles', why: 'They must withstand heat and be easy to clean.', wrong: ['Polythene', 'Rubber', 'Wax'] },
  { job: 'a crash helmet shell', mat: 'Fibreglass', why: 'It must be strong, light and not shatter.', wrong: ['Glass', 'Pottery', 'Aluminium foil'] },
];

function chooseMaterial(rng: Rng): GenOutput {
  const x = rng.pick(JOBS);
  return {
    prompt: `Which material is best for ${x.job}?`,
    parts: [part(mc(rng, x.mat, x.wrong))],
    hints: ['Decide which property matters most for the job, then pick the material that has it.'],
    solution: [x.why, `Answer: ${x.mat}`],
  };
}

const CHOOSE_MEDIUM: Q[] = [
  { q: 'Why is a saucepan handle made of plastic or wood, not metal?', a: 'Plastic and wood are poor conductors of heat, so the handle stays cool', w: ['Plastic and wood are stronger than metal', 'Plastic and wood conduct heat well', 'Metal handles would melt on the cooker'], why: 'An insulating handle stops heat from reaching the cook’s hand.' },
  { q: 'Why is a racing bicycle frame made of carbon fibre rather than steel?', a: 'Carbon fibre is strong but much lighter than steel', w: ['Carbon fibre is cheaper than steel', 'Carbon fibre conducts electricity', 'Carbon fibre is softer than steel'], why: 'A light, strong frame lets the rider go faster for the same effort.' },
  { q: 'Why are electrical plugs made with plastic cases?', a: 'Plastic is an electrical insulator, so it protects the user from a shock', w: ['Plastic conducts electricity well', 'Plastic is magnetic', 'Plastic is very heavy'], why: 'The plastic case keeps the current inside the wires.' },
];

const CHOOSE_HARD: Select[] = [
  { q: 'A designer needs a material for a garden chair that stays outdoors. Which properties matter?', opts: [['It does not rot or rust in the rain', true], ['It is strong enough to hold a person', true], ['It is not too heavy to move', true], ['It conducts electricity well', false], ['It melts at a low temperature', false]], why: 'A garden chair must survive the weather, be strong and be easy to move. Conducting electricity and a low melting point do not help.' },
];

export const MATERIAL_SKILLS: SkillDef[] = [
  skill({ id: 'c8-combustion', name: 'Burning', description: 'Describe combustion as a reaction with oxygen and name the products of burning fuels.', outcomes: ['8-D1'], lessonId: L(1), format: 'mc', gen: bank([COMB_EASY, combustionProducts, either(combustionProducts, fromBank(COMB_HARD, ['Burning needs oxygen.']))], ['Carbon burns to carbon dioxide; hydrogen burns to water.']) }),
  skill({ id: 'c8-fire-triangle', name: 'The fire triangle', description: 'Use the fire triangle to explain how a fire is put out, and choose safe ways to do it.', outcomes: ['8-D1'], lessonId: L(1), format: 'mc', gen: bank([FIRE_EASY, whichSide, FIRE_HARD], ['A fire needs fuel, heat and oxygen. Remove one and it goes out.']) }),
  skill({ id: 'c8-rusting', name: 'Rusting', description: 'Explain that iron rusts only when water and oxygen are both present.', outcomes: ['8-D1'], lessonId: L(2), format: 'mc', gen: bank([RUST_EASY, whichTube, RUST_HARD], ['Iron needs both water and oxygen to rust.']) }),
  skill({ id: 'c8-rust-prevention', name: 'Stopping rust', description: 'Choose a way to stop an iron or steel object rusting, and explain how it works.', outcomes: ['8-D1'], lessonId: L(2), format: 'mc', gen: bank([PREVENT_EASY, bestMethod, PREVENT_HARD], ['Keep water and oxygen away, or use a more reactive metal such as zinc.']) }),
  skill({ id: 'c8-metal-uses', name: 'Uses of metals', description: 'Link the uses of common metals to their properties.', outcomes: ['8-D2'], lessonId: L(3), format: 'mc', gen: bank([metalForUse, USE_MEDIUM, USE_HARD], ['Match the property the job needs to the metal that has it.']) }),
  skill({ id: 'c8-alloys', name: 'Alloys', description: 'Describe alloys, explain why they are harder than pure metals, and use the carat scale for gold.', outcomes: ['8-D2'], lessonId: L(3), gen: bank([ALLOY_EASY, ALLOY_MEDIUM, either(carat, fromBank(ALLOY_MEDIUM, ['Different-sized atoms stop layers sliding.']))], ['An alloy is a metal mixed with other elements; it is usually harder than the pure metal.']) }),
  skill({ id: 'c8-materials-types', name: 'Polymers, ceramics and composites', description: 'Classify materials as metals, polymers, ceramics or composites, and describe their properties.', outcomes: ['8-D2'], lessonId: L(4), format: 'mc', gen: bank([materialType, MAT_MEDIUM, MAT_HARD], ['Polymers are plastics; ceramics include pottery and glass; composites combine materials.']) }),
  skill({ id: 'c8-choose-material', name: 'Choosing a material', description: 'Choose the best material for a job from the properties it needs.', outcomes: ['8-D2'], lessonId: L(4), format: 'mc', gen: bank([chooseMaterial, CHOOSE_MEDIUM, CHOOSE_HARD], ['Decide which property matters most for the job.']) }),
];
