/**
 * Grade 7 Chemistry, Unit 1: Matter and Measurement (7-A1, 7-A2). Hazard symbols and laboratory
 * safety, what matter is and its properties, measuring mass and volume, and density. Hazard
 * symbols are described in words, as their pictures appear on labels.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { bank, CHOICES, either, fromBank, NAMES, num, q, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `c7-1-${n}`;

// ---------------------------------------------------------------------------- 1.1 hazard symbols

const SYMBOLS: Array<{ picture: string; meaning: string; example: string; care: string }> = [
  { picture: 'a flame', meaning: 'Flammable: it catches fire easily', example: 'ethanol (alcohol)', care: 'Keep it away from flames, sparks and heat.' },
  { picture: 'a flame above a circle', meaning: 'Oxidizer: it makes other things burn more fiercely', example: 'hydrogen peroxide', care: 'Keep it away from anything that burns.' },
  { picture: 'liquid dripping from two test tubes onto a hand and onto a surface, eating into them', meaning: 'Corrosive: it attacks skin, eyes and metals', example: 'concentrated hydrochloric acid', care: 'Wear goggles and gloves, and wash any splash off at once with plenty of water.' },
  { picture: 'a skull and crossbones', meaning: 'Acutely toxic: a small amount can poison or kill', example: 'mercury compounds', care: 'Never let it touch skin, be breathed in or swallowed.' },
  { picture: 'an exclamation mark', meaning: 'Harmful or irritant: it can irritate the skin, eyes or lungs', example: 'dilute ammonia solution', care: 'Avoid touching it or breathing it in, and wash your hands after use.' },
  { picture: 'the outline of a person with a star-shaped burst on the chest', meaning: 'Serious health hazard: it can cause long-term harm to the body', example: 'some solvents used in paint strippers', care: 'Use only small amounts, with good air flow, and avoid breathing it in.' },
  { picture: 'a gas cylinder', meaning: 'Gas under pressure: the container may burst if heated', example: 'a cylinder of compressed oxygen', care: 'Keep the cylinder upright, secured and away from heat.' },
  { picture: 'a dead tree and a dead fish', meaning: 'Hazardous to the environment: it harms water life', example: 'copper sulfate', care: 'Never pour it down the sink; put it in the waste container your teacher gives you.' },
  { picture: 'an exploding bomb', meaning: 'Explosive: it can explode', example: 'fireworks powder', care: 'Do not heat, strike or drop it.' },
];
const MEANINGS = SYMBOLS.map((s) => s.meaning);

const HAZARD_HINTS = ['Think about what the picture shows happening: burning, eating away, poisoning or bursting.', 'The flame over a circle is different from a plain flame: it feeds a fire rather than catching fire itself.'];

function symbolMeaning(rng: Rng): GenOutput {
  const s = rng.pick(SYMBOLS);
  return {
    prompt: `A hazard symbol on a chemical label shows ${s.picture}, inside a red diamond. What does it warn?`,
    parts: [part(mc(rng, s.meaning, rng.sample(MEANINGS.filter((m) => m !== s.meaning), 3)))],
    hints: HAZARD_HINTS,
    solution: [`The symbol showing ${s.picture} means: ${s.meaning}.`, `For example, ${s.example} carries it.`],
  };
}

function symbolCare(rng: Rng): GenOutput {
  const s = rng.pick(SYMBOLS);
  const wrong = SYMBOLS.filter((x) => x !== s).map((x) => x.care);
  return {
    prompt: `A bottle of ${s.example} has a hazard symbol showing ${s.picture}. Which precaution matches this symbol?`,
    parts: [part(mc(rng, s.care, rng.sample(wrong, 3)))],
    hints: HAZARD_HINTS,
    solution: [`The symbol means: ${s.meaning}.`, `So: ${s.care}`],
  };
}

const HAZARD_SELECT: Select[] = [
  { q: 'Which of these symbols warn that a substance can harm people who touch, swallow or breathe it?', opts: [['A skull and crossbones', true], ['An exclamation mark', true], ['Liquid eating into a hand', true], ['A gas cylinder', false], ['A dead tree and a dead fish', false], ['A flame', false]], why: 'The skull and crossbones (toxic), the exclamation mark (harmful) and the corrosion picture all warn of harm to people. A gas cylinder warns of pressure, a flame of fire, and the dead tree and fish of harm to the environment.' },
  { q: 'A label shows a flame and an exclamation mark. Which statements are true?', opts: [['It catches fire easily.', true], ['It can irritate the skin or eyes.', true], ['It should be kept away from flames.', true], ['It is safe to pour down the sink.', false], ['It is a gas under pressure.', false]], why: 'The flame means flammable, so keep it away from flames; the exclamation mark means harmful or irritant. Neither symbol says it is safe to pour away, and neither is the gas cylinder.' },
  { q: 'Which substances should go in a special waste container rather than down the sink?', opts: [['A solution with the dead tree and fish symbol', true], ['A solution with the skull and crossbones symbol', true], ['Plain tap water', false], ['Copper sulfate solution', true], ['A little salt water, if your teacher says so', false]], why: 'Anything toxic or harmful to the environment, such as copper sulfate, goes in the waste container. Tap water and, with your teacher’s permission, weak salt water can go down the sink.' },
];

// ---------------------------------------------------------------------------- 1.1 lab safety

const SAFETY_EASY: Q[] = [
  { q: 'When should you wear safety goggles in the science lab?', a: 'Whenever chemicals are used or anything is heated', w: ['Only when your teacher is watching you', 'Only when you are using a gas burner', 'Only when you are working with glass'], why: 'Splashes and sparks can happen at any moment, so goggles go on before any chemical or heat is used and stay on until the work is cleared away.' },
  { q: 'Which is the safe way to find out what a liquid smells like?', a: 'Waft the air above it towards your nose with your hand', w: ['Put your nose right over the open container', 'Taste a tiny drop of it on your finger', 'Pour a little onto your hand and sniff it'], why: 'Wafting brings only a little of the vapour to your nose. Never sniff a chemical directly, and never taste anything in a lab.' },
  { q: 'You spill a chemical on the bench. What should you do first?', a: 'Tell your teacher straight away', w: ['Wipe it up with your sleeve', 'Leave it and carry on working', 'Pour water on it and hope it dries'], why: 'Your teacher knows how to clean up each chemical safely. Some spills need special treatment.' },
  { q: 'What should you do with long hair before using a flame?', a: 'Tie it back', w: ['Leave it loose so it stays out of the way', 'Tuck it into your collar', 'Spray it with water'], why: 'Loose hair can fall into a flame and catch fire. Tying it back keeps it well away.' },
  { q: 'A test tube breaks. What should you do?', a: 'Tell your teacher and let them sweep up the glass', w: ['Pick up the pieces with your fingers', 'Push the pieces into the sink', 'Put the pieces in the ordinary bin'], why: 'Broken glass cuts. It goes in a special broken-glass box, and your teacher sweeps it up.' },
  { q: 'Is it safe to eat or drink in the science lab?', a: 'No, never', w: ['Yes, if you wash your hands first', 'Yes, if the food is wrapped', 'Yes, if no chemicals are out'], why: 'Food and drink can pick up traces of chemicals from benches and hands, so they are never allowed in a lab.' },
];

const SAFETY_MEDIUM: Q[] = [
  { q: 'You are heating a liquid in a test tube. Which way should the open end point?', a: 'Away from yourself and everyone else', w: ['Towards yourself, so you can see inside', 'Towards your partner, who is recording results', 'Straight up, close to your face'], why: 'Hot liquid can spit out of the tube suddenly, so the open end must point at nobody.' },
  { q: 'A drop of acid splashes onto your hand. What should you do?', a: 'Rinse it under running water for several minutes and tell your teacher', w: ['Wipe it off with a dry paper towel and carry on', 'Wait to see whether it starts to hurt', 'Cover it with a plaster'], why: 'Plenty of running water washes the acid away and dilutes it. Your teacher then checks whether more care is needed.' },
  { q: 'Why should you stand up, not sit, when you heat things with a gas burner?', a: 'So you can move away quickly if something spills or catches fire', w: ['So you can see the flame from above', 'So the flame burns more steadily', 'So you use less gas'], why: 'Standing lets you step back at once if hot liquid spills or something catches fire.' },
  { q: 'A gas burner is lit but not being used for a few minutes. What should you do with it?', a: 'Turn it to the yellow safety flame, which is easy to see', w: ['Leave it on the hot blue flame', 'Cover it with a beaker', 'Turn the gas up so it does not go out'], why: 'The blue heating flame is hard to see. The yellow safety flame is easy to see, so nobody reaches across it by mistake.' },
  { q: 'Where should a bottle of chemical be while you are using it?', a: 'Near the back of the bench, with its lid on when not pouring', w: ['On the edge of the bench, so it is easy to reach', 'On the floor, out of the way', 'Open, with the lid on the stool'], why: 'A bottle near the edge can be knocked off, and an open bottle can spill or give off fumes.' },
  { q: 'Which is the safest way to carry a hot beaker?', a: 'With tongs or heat-proof gloves, after letting it cool if you can', w: ['With your bare hands, quickly', 'With a wet paper towel', 'By the rim, between two fingers'], why: 'Hot glass looks the same as cold glass and burns. Use tongs or heat-proof gloves.' },
];

const SAFETY_HARD: Select[] = [
  { q: 'Which of these are safe things to do in a science lab?', opts: [['Wear goggles while chemicals are out', true], ['Read the label before using a chemical', true], ['Tie back long hair before lighting a burner', true], ['Taste a solid to identify it', false], ['Mix chemicals to see what happens', false], ['Run to the sink when you are not in danger', false]], why: 'Goggles, reading labels and tying back hair keep you safe. Never taste anything, never mix chemicals unless the instructions say so, and walk, do not run.' },
  { q: 'Which of these should you tell your teacher about straight away?', opts: [['A chemical spill', true], ['Any cut or burn, however small', true], ['A broken beaker', true], ['A smell of gas', true], ['Finishing your experiment early', false], ['Writing your results in pencil', false]], why: 'Spills, injuries, broken glass and gas smells all need your teacher at once. Finishing early and writing in pencil are not safety problems.' },
  { q: 'When you finish an experiment, what should you do?', opts: [['Turn off the gas and water', true], ['Put waste chemicals where your teacher tells you', true], ['Wash your hands', true], ['Leave hot equipment where others might touch it', false], ['Pour every leftover chemical down the sink', false]], why: 'Turning things off, getting rid of waste properly and washing your hands finish the job safely. Hot equipment is left to cool in a safe place, and many chemicals must not go down the sink.' },
];

// ---------------------------------------------------------------------------- 1.2 is it matter?

const THINGS: Array<{ name: string; matter: boolean; why: string }> = [
  { name: 'the air in a balloon', matter: true, why: 'Air has mass and takes up space: it fills and stretches the balloon.' },
  { name: 'light from a torch', matter: false, why: 'Light is a form of energy. It has no mass and does not take up space.' },
  { name: 'the sound of a bell', matter: false, why: 'Sound is energy carried by vibrations. It has no mass of its own.' },
  { name: 'water vapour in a kitchen', matter: true, why: 'Water vapour is water as a gas. It has mass and takes up space.' },
  { name: 'the heat from a radiator', matter: false, why: 'Heat is energy moving from a warmer place to a cooler one. It is not matter.' },
  { name: 'a shadow on the ground', matter: false, why: 'A shadow is only a place where light is blocked. It has no mass.' },
  { name: 'helium in a party balloon', matter: true, why: 'Helium is a gas. It is light, but it still has mass and takes up space.' },
  { name: 'a grain of sand', matter: true, why: 'Sand has mass and takes up space, however small the grain.' },
  { name: 'cooking oil', matter: true, why: 'Oil is a liquid. It has mass and fills the bottom of its bottle.' },
  { name: 'a radio signal', matter: false, why: 'A radio signal is energy travelling as a wave. It has no mass.' },
  { name: 'smoke from a candle', matter: true, why: 'Smoke is made of tiny bits of solid and gas. It has mass and takes up space.' },
  { name: 'the colour red', matter: false, why: 'A colour is how light looks to us. It is not matter.' },
  { name: 'dust floating in the air', matter: true, why: 'Dust is tiny pieces of solid. It has mass and takes up space.' },
  { name: 'an electric current', matter: false, why: 'An electric current is a flow of energy and charge, not matter in its own right.' },
];

function isMatterEasy(rng: Rng): GenOutput {
  const t = rng.pick(THINGS);
  return {
    prompt: `Is ${t.name} matter?`,
    parts: [part(fixedChoice([...CHOICES.yesNo], t.matter ? 0 : 1))],
    hints: ['Matter is anything that has mass and takes up space.', 'Light, sound and heat are forms of energy, not matter.'],
    solution: [t.why, `So ${t.name} ${t.matter ? 'is' : 'is not'} matter.`],
  };
}

const MATTER_MEDIUM: Q[] = [
  { q: 'Which two things must something have to be matter?', a: 'Mass, and it takes up space', w: ['Colour, and it can be seen', 'A smell, and it can be felt', 'Warmth, and it moves'], why: 'Matter is anything that has mass and takes up space (has volume).' },
  { q: 'A flat balloon has a mass of 4.0 g. Blown up with air, it has a mass of 4.3 g. What does this show?', a: 'Air has mass, so it is matter', w: ['Air has no mass, so it is not matter', 'Blowing makes the rubber heavier', 'Only liquids and solids have mass'], why: 'The extra 0.3 g is the mass of the air inside, so air has mass.' },
  { q: 'An upturned empty glass is pushed straight down into a bowl of water. Water does not fill the glass. Why?', a: 'The glass is full of air, which takes up space', w: ['Water cannot touch glass', 'The glass is too cold for water', 'Water only flows downwards'], why: 'The air trapped in the glass takes up space, so the water cannot move in.' },
  { q: 'Which of these is NOT matter?', a: 'The light from the Sun', w: ['The water in a cloud', 'The oxygen we breathe', 'The steam from a kettle'], why: 'Light is energy. Water, oxygen and steam all have mass and take up space.' },
  { q: 'What is the mass of an object?', a: 'The amount of matter in it', w: ['The space it takes up', 'How hot it is', 'How big it looks'], why: 'Mass measures how much matter an object has. The space it takes up is its volume.' },
  { q: 'What is the volume of an object?', a: 'The amount of space it takes up', w: ['The amount of matter in it', 'How heavy it feels', 'How loud it is'], why: 'Volume is the space an object takes up. The amount of matter is its mass.' },
];

function isMatterHard(rng: Rng): GenOutput {
  const items = rng.sample(THINGS, 6);
  if (!items.some((x) => x.matter)) items[0] = THINGS[0];
  if (!items.some((x) => !x.matter)) items[5] = THINGS[1];
  return fromBank([{ q: 'Which of these are matter?', opts: items.map((x) => [x.name[0].toUpperCase() + x.name.slice(1), x.matter] as [string, boolean]), why: 'Matter has mass and takes up space. Light, sound, heat, signals and colours are not matter.' }], ['Ask of each one: does it have mass, and does it take up space?'])(rng);
}

// ---------------------------------------------------------------------------- 1.2 properties

const PROPERTY_WORDS: Array<{ word: string; means: string }> = [
  { word: 'Malleable', means: 'can be hammered or pressed into a new shape without breaking' },
  { word: 'Lustrous (shiny)', means: 'reflects light with a shine, like polished metal' },
  { word: 'Magnetic', means: 'is pulled towards a magnet' },
  { word: 'Transparent', means: 'lets light pass straight through, so you can see through it clearly' },
  { word: 'Brittle', means: 'breaks or shatters easily when hit or bent' },
  { word: 'Flexible', means: 'bends without breaking and springs back' },
  { word: 'A conductor of electricity', means: 'lets electricity pass through it' },
  { word: 'Soluble in water', means: 'dissolves when it is stirred into water' },
  { word: 'Hard', means: 'is difficult to scratch or dent' },
  { word: 'Viscous', means: 'is a thick liquid that pours slowly, like honey' },
];

function propertyWord(rng: Rng): GenOutput {
  const p = rng.pick(PROPERTY_WORDS);
  return {
    prompt: `A material ${p.means}. Which word describes this property?`,
    parts: [part(mc(rng, p.word, rng.sample(PROPERTY_WORDS.filter((x) => x !== p).map((x) => x.word), 3)))],
    hints: ['A property is something you can observe or measure about a substance.'],
    solution: [`A material that ${p.means} is described as ${p.word.toLowerCase()}.`],
  };
}

const PROPERTY_MEDIUM: Q[] = [
  { q: 'Which of these describes a property that is measured with a number?', a: 'It melts at 327 °C.', w: ['It is a grey metal.', 'It feels smooth.', 'It has a strong smell.'], why: 'A melting point is measured with a number, so it is a quantitative property. Colour, texture and smell are described in words: they are qualitative.' },
  { q: 'Which of these is a qualitative property (described in words, not measured)?', a: 'It is a pale yellow powder.', w: ['It has a mass of 25 g.', 'It boils at 78 °C.', 'It has a density of 2.7 g/cm³.'], why: 'Colour and texture are described in words. Mass, boiling point and density are measured as numbers.' },
  { q: 'A spoon gets hot quickly when it stands in hot tea. Which property does this show?', a: 'It is a good conductor of heat', w: ['It is magnetic', 'It is transparent', 'It is brittle'], why: 'Heat travels through the spoon quickly, so the spoon is a good conductor of heat.' },
  { q: 'Why are saucepan handles often made of plastic or wood?', a: 'They are poor conductors of heat (insulators), so the handle stays cool', w: ['They are magnetic, so the pan stays on the hob', 'They are good conductors of heat, so the food cooks faster', 'They are transparent, so you can see the food'], why: 'Plastic and wood let heat through slowly, so the handle stays cool enough to hold.' },
  { q: 'Which property would best help you tell an iron nail from an aluminium nail?', a: 'Whether it is pulled towards a magnet', w: ['Whether it is a solid', 'Whether it is shiny', 'Whether it is hard'], why: 'Both nails are shiny, hard solids, but only iron is magnetic.' },
  { q: 'Why is glass used for windows?', a: 'It is transparent, so light passes through', w: ['It is malleable, so it can be bent', 'It is magnetic, so it stays in the frame', 'It is a good conductor of electricity'], why: 'Windows must let light in, and glass is transparent.' },
];

const MYSTERY: Array<{ props: string; answer: string; others: string[] }> = [
  { props: 'It is a shiny grey solid. It is pulled towards a magnet and conducts electricity.', answer: 'Iron', others: ['Copper', 'Glass', 'Sulfur'] },
  { props: 'It is a shiny reddish-brown solid. It conducts electricity well but is not pulled towards a magnet.', answer: 'Copper', others: ['Iron', 'Salt', 'Sulfur'] },
  { props: 'It is a yellow powder. It does not conduct electricity and does not dissolve in water.', answer: 'Sulfur', others: ['Sugar', 'Iron', 'Copper'] },
  { props: 'It is made of white crystals that dissolve in water. The solution tastes sweet (in a kitchen, never in a lab).', answer: 'Sugar', others: ['Sand', 'Sulfur', 'Chalk'] },
  { props: 'It is a hard, transparent solid that is brittle and does not conduct electricity.', answer: 'Glass', others: ['Copper', 'Rubber', 'Iron'] },
  { props: 'It is a soft, flexible solid that does not conduct electricity and springs back when stretched.', answer: 'Rubber', others: ['Glass', 'Iron', 'Salt'] },
  { props: 'It is a grain-like solid that does not dissolve in water and sinks to the bottom of a glass of water.', answer: 'Sand', others: ['Sugar', 'Salt', 'Wax'] },
];

function mystery(rng: Rng): GenOutput {
  const m = rng.pick(MYSTERY);
  return {
    prompt: `${m.props} Which substance is it most likely to be?`,
    parts: [part(mc(rng, m.answer, m.others))],
    hints: ['Use each property in turn to rule substances out.', 'Only a few metals, such as iron, are magnetic. Metals conduct electricity; most non-metals do not.'],
    solution: [`Every property fits ${m.answer.toLowerCase()}.`, `Answer: ${m.answer}`],
  };
}

// ---------------------------------------------------------------------------- 1.3 measuring volume

const OBJECTS = ['stone', 'key', 'toy car', 'lump of modelling clay', 'metal bolt', 'glass marble', 'small padlock', 'piece of rock'];

const VOLUME_CONCEPT: Q[] = [
  { q: 'Where do you read the volume of water in a measuring cylinder?', a: 'At the bottom of the curved surface (the meniscus), with your eye level with it', w: ['At the top edge of the curved surface, looking down from above', 'At the highest point the water has splashed to', 'At the top of the cylinder, whatever the water level'], why: 'Water curves up at the sides. The volume is read at the bottom of this curve, the meniscus, with your eye level with the surface.' },
  { q: 'Which instrument measures the mass of an object?', a: 'A balance', w: ['A measuring cylinder', 'A thermometer', 'A ruler'], why: 'A balance measures mass. A measuring cylinder measures the volume of a liquid.' },
  { q: 'Why is a measuring cylinder better than a beaker for measuring 35 mL of water?', a: 'Its scale has smaller divisions, so it measures more precisely', w: ['It holds more water than a beaker', 'It keeps the water warmer', 'It makes the water weigh less'], why: 'A beaker’s markings are rough. A narrow measuring cylinder has a finer scale.' },
  { q: 'How can you find the volume of an irregular stone?', a: 'Lower it into water in a measuring cylinder and see how far the water rises', w: ['Measure its length with a ruler and double it', 'Weigh it on a balance', 'Count how many grains it has'], why: 'The stone pushes aside (displaces) its own volume of water, so the rise in the water level is the stone’s volume.' },
  { q: 'One millilitre (1 mL) is the same volume as which of these?', a: 'One cubic centimetre (1 cm³)', w: ['One litre (1 L)', 'One gram (1 g)', 'Ten cubic centimetres (10 cm³)'], why: 'A cube 1 cm on each side holds exactly 1 mL, so 1 mL = 1 cm³.' },
];

function displacementEasy(rng: Rng): GenOutput {
  const start = rng.int(3, 12) * 5;
  const rise = rng.int(4, 30);
  const obj = rng.pick(OBJECTS);
  return {
    prompt: `A measuring cylinder holds ${q(start, 'mL')} of water. When a ${obj} is lowered in, the water rises to ${q(start + rise, 'mL')}. What is the volume of the ${obj}, in cm³?`,
    parts: [numPart(rise, { suffix: 'cm³' })],
    hints: ['The object pushes aside its own volume of water.', 'Volume of the object = final reading − first reading, and 1 mL = 1 cm³.'],
    solution: [`$${start + rise} - ${start} = ${rise}\\ \\text{mL}$`, `$1\\ \\text{mL} = 1\\ \\text{cm}^3$, so the volume of the ${obj} is $${rise}\\ \\text{cm}^3$.`],
  };
}

function displacementHard(rng: Rng): GenOutput {
  const n = rng.int(3, 10);
  const each = rng.int(2, 18) / 2;
  const start = rng.int(4, 10) * 10;
  const end = start + n * each;
  return {
    prompt: `${rng.pick(NAMES)} puts ${n} identical glass marbles into a measuring cylinder holding ${q(start, 'mL')} of water. The water rises to ${q(num(end, 1), 'mL')}. What is the volume of one marble, in cm³?`,
    parts: [numPart(each, { decimals: 1, suffix: 'cm³' })],
    hints: ['First find the volume of all the marbles together.', 'Then share it equally between the marbles.'],
    solution: [`All ${n} marbles: $${num(end, 1)} - ${start} = ${num(n * each, 1)}\\ \\text{cm}^3$`, `One marble: $${num(n * each, 1)} \\div ${n} = ${num(each, 1)}\\ \\text{cm}^3$`],
  };
}

function readingCylinder(rng: Rng): GenOutput {
  const step = rng.pick([1, 2, 5]);
  const marks = rng.int(4, 18);
  const base = rng.int(1, 4) * 10 * step;
  const reading = base + marks * step;
  return {
    prompt: `On a measuring cylinder, each small division is ${q(step, 'mL')}. The bottom of the meniscus sits ${marks} small divisions above the ${q(base, 'mL')} mark. What is the volume of the water?`,
    parts: [numPart(reading, { suffix: 'mL' })],
    hints: ['Count up from the labelled mark: each division adds the same amount.'],
    solution: [`$${base} + ${marks} \\times ${step} = ${reading}\\ \\text{mL}$`],
  };
}

// ---------------------------------------------------------------------------- 1.3 units

type Conv = { from: string; to: string; factor: number };
const CONVS: Conv[] = [
  { from: 'kg', to: 'g', factor: 1000 },
  { from: 'g', to: 'kg', factor: 1 / 1000 },
  { from: 'L', to: 'mL', factor: 1000 },
  { from: 'mL', to: 'L', factor: 1 / 1000 },
  { from: 'g', to: 'mg', factor: 1000 },
  { from: 'L', to: 'cm³', factor: 1000 },
];

function convert(rng: Rng, hard: boolean): GenOutput {
  const c = rng.pick(hard ? CONVS : CONVS.slice(0, 4));
  const value = c.factor > 1 ? (hard ? rng.int(5, 95) / 10 : rng.int(1, 9)) : (hard ? rng.int(25, 990) * 10 : rng.int(1, 9) * 1000);
  const answer = Math.round(value * c.factor * 1000) / 1000;
  return {
    prompt: `Convert ${q(num(value, 3), c.from)} to ${c.to === 'cm³' ? 'cubic centimetres (cm³)' : c.to}.`,
    parts: [numPart(answer, { suffix: c.to })],
    hints: ['1 kg = 1000 g, 1 g = 1000 mg, 1 L = 1000 mL and 1 mL = 1 cm³.', 'To go to a smaller unit, multiply by 1000. To go to a bigger unit, divide by 1000.'],
    solution: [c.factor > 1 ? `$${num(value, 3)} \\times 1000 = ${num(answer, 3)}$` : `$${num(value, 3)} \\div 1000 = ${num(answer, 3)}$`, `So ${num(value, 3)} ${c.from} = ${num(answer, 3)} ${c.to}.`],
  };
}

function totalMass(rng: Rng): GenOutput {
  const kg = rng.int(1, 4);
  const g = rng.int(1, 19) * 50;
  const total = kg * 1000 + g;
  return {
    prompt: `A bag of flour has a mass of ${q(kg, 'kg')} and a bag of sugar has a mass of ${q(g, 'g')}. What is their total mass in grams?`,
    parts: [numPart(total, { suffix: 'g' })],
    hints: ['Change both masses to grams before you add.'],
    solution: [`$${kg}\\ \\text{kg} = ${kg * 1000}\\ \\text{g}$`, `$${kg * 1000} + ${g} = ${total}\\ \\text{g}$`],
  };
}

// ---------------------------------------------------------------------------- 1.4 density

const MATERIALS: Array<{ name: string; d: number }> = [
  { name: 'aluminium', d: 2.7 }, { name: 'iron', d: 7.9 }, { name: 'copper', d: 8.9 }, { name: 'lead', d: 11.3 },
  { name: 'gold', d: 19.3 }, { name: 'ice', d: 0.92 }, { name: 'oak wood', d: 0.75 }, { name: 'cork', d: 0.24 },
  { name: 'glass', d: 2.5 }, { name: 'candle wax', d: 0.9 }, { name: 'rubber', d: 1.2 }, { name: 'polystyrene foam', d: 0.05 },
];

const DENSITY_HINTS = ['Density = mass ÷ volume.', 'Mass in grams and volume in cm³ give density in g/cm³.'];

function densityEasy(rng: Rng): GenOutput {
  const d = rng.int(2, 12);
  const v = rng.int(2, 12);
  const m = d * v;
  const obj = rng.pick(OBJECTS);
  return {
    prompt: `A ${obj} has a mass of ${q(m, 'g')} and a volume of $${v}\\ \\text{cm}^3$. What is its density?`,
    parts: [numPart(d, { suffix: 'g/cm³' })],
    hints: DENSITY_HINTS,
    solution: [`$\\text{density} = \\dfrac{\\text{mass}}{\\text{volume}} = \\dfrac{${m}}{${v}} = ${d}\\ \\text{g/cm}^3$`],
  };
}

function densityMedium(rng: Rng): GenOutput {
  const v = rng.int(4, 40);
  const d = rng.int(5, 120) / 10;
  const m = Math.round(d * v * 10) / 10;
  const actual = m / v;
  const liquid = rng.chance(0.4);
  return {
    prompt: liquid
      ? `${q(v, 'mL')} of a liquid has a mass of ${q(num(m, 1), 'g')}. What is its density in g/mL, to 1 decimal place?`
      : `A block has a mass of ${q(num(m, 1), 'g')} and a volume of $${v}\\ \\text{cm}^3$. What is its density, to 1 decimal place?`,
    parts: [numPart(actual, { decimals: 1, suffix: liquid ? 'g/mL' : 'g/cm³' })],
    calculator: true,
    hints: DENSITY_HINTS,
    solution: [`$\\text{density} = \\dfrac{${num(m, 1)}}{${v}} = ${num(actual, 1)}\\ \\text{${liquid ? 'g/mL' : 'g/cm}^3'}$ (to 1 decimal place)`],
  };
}

function densityHard(rng: Rng): GenOutput {
  const mat = rng.pick(MATERIALS.filter((x) => x.d >= 0.5));
  const v = rng.int(2, 25);
  if (rng.chance(0.5)) {
    const m = Math.round(mat.d * v * 100) / 100;
    return {
      prompt: `The density of ${mat.name} is $${mat.d}\\ \\text{g/cm}^3$. What is the mass of a piece of ${mat.name} with a volume of $${v}\\ \\text{cm}^3$?`,
      parts: [numPart(m, { decimals: 2, suffix: 'g', tolerance: 0.011 })],
      calculator: true,
      hints: ['Mass = density × volume.'],
      solution: [`$\\text{mass} = \\text{density} \\times \\text{volume} = ${mat.d} \\times ${v} = ${num(m)}\\ \\text{g}$`],
    };
  }
  const m = Math.round(mat.d * v * 10) / 10;
  const vol = m / mat.d;
  return {
    prompt: `A piece of ${mat.name} has a mass of ${q(num(m, 1), 'g')}. The density of ${mat.name} is $${mat.d}\\ \\text{g/cm}^3$. What is its volume, to 1 decimal place?`,
    parts: [numPart(vol, { decimals: 1, suffix: 'cm³' })],
    calculator: true,
    hints: ['Volume = mass ÷ density.'],
    solution: [`$\\text{volume} = \\dfrac{\\text{mass}}{\\text{density}} = \\dfrac{${num(m, 1)}}{${mat.d}} = ${num(vol, 1)}\\ \\text{cm}^3$`],
  };
}

// ---------------------------------------------------------------------------- 1.4 floating and sinking

const FLOAT_HINTS = ['Water has a density of 1 g/cm³.', 'A solid less dense than a liquid floats on it; a denser solid sinks.'];

function floatEasy(rng: Rng): GenOutput {
  const mat = rng.pick(MATERIALS);
  const floats = mat.d < 1;
  return {
    prompt: `${mat.name[0].toUpperCase() + mat.name.slice(1)} has a density of $${mat.d}\\ \\text{g/cm}^3$. Water has a density of $1\\ \\text{g/cm}^3$. Does a solid block of ${mat.name} float or sink in water?`,
    parts: [part(fixedChoice(['It floats', 'It sinks'], floats ? 0 : 1))],
    hints: FLOAT_HINTS,
    solution: [`${mat.d} is ${floats ? 'less' : 'more'} than 1, so ${mat.name} is ${floats ? 'less' : 'more'} dense than water and ${floats ? 'floats' : 'sinks'}.`],
  };
}

const LIQUIDS: Array<{ name: string; d: number }> = [
  { name: 'honey', d: 1.42 }, { name: 'corn syrup', d: 1.33 }, { name: 'washing-up liquid', d: 1.06 }, { name: 'water', d: 1.0 },
  { name: 'vegetable oil', d: 0.92 }, { name: 'lamp oil', d: 0.8 },
];

function layers(rng: Rng): GenOutput {
  let three = rng.sample(LIQUIDS, 3);
  while (new Set(three.map((x) => x.d)).size < 3) three = rng.sample(LIQUIDS, 3);
  const top = rng.chance(0.5);
  const sorted = [...three].sort((a, b) => a.d - b.d);
  const ans = top ? sorted[0] : sorted[2];
  const list = three.map((x) => `${x.name} ($${x.d}\\ \\text{g/mL}$)`).join(', ');
  return {
    prompt: `Three liquids are poured carefully, one at a time, into a tall glass: ${list}. They settle into layers. Which liquid ends up at the ${top ? 'top' : 'bottom'}?`,
    parts: [part(mc(rng, ans.name[0].toUpperCase() + ans.name.slice(1), three.filter((x) => x !== ans).map((x) => x.name[0].toUpperCase() + x.name.slice(1))))],
    hints: ['The densest liquid sinks to the bottom; the least dense floats on top.'],
    solution: [`From least to most dense: ${sorted.map((x) => x.name).join(', ')}.`, `So ${ans.name} is at the ${top ? 'top' : 'bottom'}.`],
  };
}

function floatHard(rng: Rng): GenOutput {
  const v = rng.int(5, 40);
  const d = rng.pick([rng.int(3, 9) / 10, rng.int(11, 30) / 10]);
  const m = Math.round(d * v * 10) / 10;
  const floats = m / v < 1;
  return {
    prompt: `An object has a mass of ${q(num(m, 1), 'g')} and a volume of $${v}\\ \\text{cm}^3$. Will it float or sink in water (density $1\\ \\text{g/cm}^3$)?`,
    parts: [part(fixedChoice(['It floats', 'It sinks'], floats ? 0 : 1))],
    hints: ['First work out the density: mass ÷ volume.', 'Then compare it with the density of water.'],
    solution: [`Density = $${num(m, 1)} \\div ${v} = ${num(m / v)}\\ \\text{g/cm}^3$.`, `This is ${floats ? 'less' : 'more'} than $1\\ \\text{g/cm}^3$, so it ${floats ? 'floats' : 'sinks'}.`],
  };
}

const FLOAT_CONCEPT: Q[] = [
  { q: 'A large log floats on a lake, but a small pebble sinks. Why?', a: 'Wood is less dense than water, and stone is denser than water', w: ['The log is bigger, and big things always float', 'The pebble is heavier than the log', 'Water pushes up harder on wood because it is brown'], why: 'Floating depends on density, not on size or mass. The log is far heavier than the pebble, but wood is less dense than water.' },
  { q: 'A block of wax is cut in half. What happens to the density of each half?', a: 'It stays the same as the whole block', w: ['It halves', 'It doubles', 'It becomes zero'], why: 'Cutting halves both the mass and the volume, so mass ÷ volume stays the same. Density belongs to the substance, not to the size of the piece.' },
  { q: 'Ice floats on water. What does this tell you?', a: 'Ice is less dense than liquid water', w: ['Ice is denser than liquid water', 'Ice has no mass', 'Ice and water have the same density'], why: 'Anything less dense than water floats on it. Ice (about 0.92 g/cm³) is less dense than water (1 g/cm³).' },
];

export const MATTER_SKILLS: SkillDef[] = [
  skill({ id: 'c7-hazard-symbols', name: 'Hazard symbols', description: 'Match hazard symbols on chemical labels to their meanings and the precautions they call for.', outcomes: ['7-A2'], lessonId: L(1), format: 'mc', gen: bank([symbolMeaning, symbolCare, HAZARD_SELECT], HAZARD_HINTS) }),
  skill({ id: 'c7-lab-safety', name: 'Working safely in the lab', description: 'Choose safe ways to heat, smell, carry, clean up and report accidents in a science laboratory.', outcomes: ['7-A2'], lessonId: L(1), format: 'mc', gen: bank([SAFETY_EASY, SAFETY_MEDIUM, SAFETY_HARD], ['Ask what could go wrong: a splash, a burn, a cut or a fire.', 'When in doubt, stop and tell your teacher.']) }),
  skill({ id: 'c7-is-matter', name: 'What matter is', description: 'Decide whether something is matter because it has mass and takes up space, and tell mass from volume.', outcomes: ['7-A1'], lessonId: L(2), format: 'mc', gen: bank([isMatterEasy, MATTER_MEDIUM, isMatterHard], ['Matter is anything that has mass and takes up space.', 'Light, sound and heat are forms of energy, not matter.']) }),
  skill({ id: 'c7-properties', name: 'Properties of matter', description: 'Name and use the properties of substances, tell qualitative from quantitative properties, and identify a substance from its properties.', outcomes: ['7-A1'], lessonId: L(2), format: 'mc', gen: bank([propertyWord, PROPERTY_MEDIUM, mystery], ['A property is something you can observe or measure about a substance.', 'Qualitative properties are described in words; quantitative properties are measured as numbers.']) }),
  skill({ id: 'c7-measure-volume', name: 'Measuring volume', description: 'Read a measuring cylinder, and find the volume of an object by displacement.', outcomes: ['7-A1'], lessonId: L(3), gen: bank([displacementEasy, either(readingCylinder, fromBank(VOLUME_CONCEPT, ['Read at the bottom of the meniscus, at eye level.', 'An object sinking in water pushes aside its own volume of water.'])), displacementHard], ['Read at the bottom of the meniscus, at eye level.', 'An object sinking in water pushes aside its own volume of water.']) }),
  skill({ id: 'c7-units', name: 'Units of mass and volume', description: 'Convert between kilograms, grams and milligrams, and between litres, millilitres and cubic centimetres.', outcomes: ['7-A1'], lessonId: L(3), gen: bank([(r) => convert(r, false), either((r) => convert(r, true), totalMass), (r) => convert(r, true)], ['1 kg = 1000 g and 1 L = 1000 mL.']) }),
  skill({ id: 'c7-density', name: 'Density', description: 'Calculate density from mass and volume, and use density to find a mass or a volume.', outcomes: ['7-A1'], lessonId: L(4), calculator: true, gen: bank([densityEasy, densityMedium, densityHard], DENSITY_HINTS) }),
  skill({ id: 'c7-float-sink', name: 'Floating and sinking', description: 'Use density to predict whether an object floats or sinks, and the order of liquid layers.', outcomes: ['7-A1'], lessonId: L(4), format: 'mc', gen: bank([floatEasy, either(layers, fromBank(FLOAT_CONCEPT, FLOAT_HINTS)), floatHard], FLOAT_HINTS) }),
];
