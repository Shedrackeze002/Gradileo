/**
 * Grade 7 Chemistry, Unit 2: The Particle Model (7-B1, 7-B2). Solids, liquids and gases, changes
 * of state, melting and boiling points, temperature and heat transfer, expansion and diffusion.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { bank, CHOICES, either, fromBank, NAMES, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `c7-2-${n}`;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** A temperature with a true minus sign, as maths. */
const degC = (v: number) => `$${v < 0 ? '-' : ''}${Math.abs(v)}\\ ^\\circ\\text{C}$`;

// ---------------------------------------------------------------------------- 2.1 states

type State = 'solid' | 'liquid' | 'gas';
const STATES: State[] = ['solid', 'liquid', 'gas'];

const PARTICLES: Record<State, string[]> = {
  solid: ['The particles are packed tightly in neat rows and only vibrate on the spot.', 'The particles touch each other, are held firmly in place, and jiggle without moving around.'],
  liquid: ['The particles touch each other but are jumbled up, and they slide past one another.', 'The particles are close together with no pattern, and they keep moving around each other.'],
  gas: ['The particles are far apart and zoom around quickly in all directions.', 'The particles are spread out, with lots of empty space between them, and move fast.'],
};

const BEHAVIOUR: Record<State, string[]> = {
  solid: ['It keeps its own shape and cannot be poured.', 'It has a fixed shape and a fixed volume, and it cannot be squashed.'],
  liquid: ['It can be poured and takes the shape of the bottom of its container, but its volume stays the same.', 'It flows, but it cannot be squashed into a smaller space.'],
  gas: ['It spreads out to fill the whole of any container it is in.', 'It can be squashed into a smaller space, and it has no fixed shape or volume.'],
};

function stateFromParticles(rng: Rng): GenOutput {
  const s = rng.pick(STATES);
  return {
    prompt: `${rng.pick(PARTICLES[s])} Which state of matter is this?`,
    parts: [part(fixedChoice([...CHOICES.state], STATES.indexOf(s)))],
    hints: ['Are the particles close together or far apart?', 'Are they held in place, or free to move around?'],
    solution: [`Particles that ${s === 'solid' ? 'are packed tightly and only vibrate' : s === 'liquid' ? 'touch but slide past one another' : 'are far apart and move quickly'} make a ${s}.`],
  };
}

function stateFromBehaviour(rng: Rng): GenOutput {
  const s = rng.pick(STATES);
  return {
    prompt: `A substance behaves like this: ${rng.pick(BEHAVIOUR[s])} Which state is it in?`,
    parts: [part(fixedChoice([...CHOICES.state], STATES.indexOf(s)))],
    hints: ['Only a solid keeps its own shape.', 'Only a gas fills its whole container and can be squashed.'],
    solution: [`This is how a ${s} behaves.`],
  };
}

const STATE_FACTS: Array<{ md: string; holds: State[] }> = [
  { md: 'It has a fixed volume.', holds: ['solid', 'liquid'] },
  { md: 'It has a fixed shape.', holds: ['solid'] },
  { md: 'It can flow.', holds: ['liquid', 'gas'] },
  { md: 'It can be squashed easily.', holds: ['gas'] },
  { md: 'Its particles are close together.', holds: ['solid', 'liquid'] },
  { md: 'Its particles are always moving.', holds: ['solid', 'liquid', 'gas'] },
  { md: 'Its particles are in a regular pattern.', holds: ['solid'] },
  { md: 'Its particles are far apart.', holds: ['gas'] },
  { md: 'Its particles do not move at all.', holds: [] },
];

function stateSelect(rng: Rng): GenOutput {
  const s = rng.pick(STATES);
  let opts = rng.sample(STATE_FACTS, 5);
  while (!opts.some((o) => o.holds.includes(s)) || opts.every((o) => o.holds.includes(s))) opts = rng.sample(STATE_FACTS, 5);
  return fromBank([{ q: `Which statements are true of a ${s}?`, opts: opts.map((o) => [o.md, o.holds.includes(s)] as [string, boolean]), why: `Picture the particles of a ${s}: how close they are and how they move.` }], ['Particles are always moving, even in a solid.'])(rng);
}

// ---------------------------------------------------------------------------- 2.1 the particle model

const MODEL_EASY: Q[] = [
  { q: 'In which state are the particles furthest apart?', a: 'Gas', w: ['Solid', 'Liquid'], order: ['Solid', 'Liquid', 'Gas'], why: 'Gas particles are far apart, with a lot of empty space between them.' },
  { q: 'In which state can the particles only vibrate on the spot?', a: 'Solid', w: [], order: ['Solid', 'Liquid', 'Gas'], why: 'Solid particles are held in place, so they can only vibrate.' },
  { q: 'In which state do the particles touch but slide past one another?', a: 'Liquid', w: [], order: ['Solid', 'Liquid', 'Gas'], why: 'Liquid particles stay close together but are free to move around each other.' },
  { q: 'What is everything around us made of, according to the particle model?', a: 'Tiny particles that are always moving', w: ['Tiny particles that never move', 'One smooth substance with no gaps', 'Large lumps that can be seen with a magnifying glass'], why: 'The particle model says all matter is made of particles, far too small to see, that are always moving.' },
  { q: 'What happens to the particles of a substance when it is heated?', a: 'They move faster', w: ['They get bigger', 'They stop moving', 'They turn into different particles'], why: 'Heating gives the particles more energy, so they move faster. They do not change size.' },
];

const MODEL_MEDIUM: Q[] = [
  { q: 'Why can a gas be squashed into a smaller space?', a: 'Its particles are far apart, so they can be pushed closer together', w: ['Its particles shrink when they are squeezed', 'Its particles are already touching each other', 'Its particles stop moving when they are squeezed'], why: 'There is empty space between gas particles. Squashing a gas pushes them closer; the particles themselves do not shrink.' },
  { q: 'Why does a liquid take the shape of its container?', a: 'Its particles are free to slide past one another', w: ['Its particles are held firmly in fixed places', 'Its particles are very far apart from each other', 'Its particles grow to fill up the container'], why: 'Liquid particles can move around each other, so the liquid flows into the shape of its container.' },
  { q: 'Why does a solid keep its shape?', a: 'Its particles are held in place and can only vibrate', w: ['Its particles are completely still all the time', 'Its particles are larger than liquid particles', 'Its particles are far apart and move quickly'], why: 'Strong forces hold the particles of a solid in place, so its shape does not change.' },
  { q: 'Why is it very hard to squash a liquid?', a: 'Its particles are already touching, with almost no space between them', w: ['Its particles are neatly lined up in rows', 'Its particles are not moving at any time', 'Its particles are a long way from each other'], why: 'There is almost no empty space between liquid particles to push them into.' },
  { q: 'Why does a gas fill the whole of its container?', a: 'Its particles move quickly in all directions until they reach every part', w: ['Its particles grow until there is no space left', 'Its particles slide over each other but stay touching', 'Its particles are held in a neat pattern'], why: 'Gas particles are free and fast, so they spread into every part of the container.' },
];

const MODEL_HARD: Select[] = [
  { q: 'Which statements about particles are true?', opts: [['Particles are always moving, even in a solid.', true], ['Heating makes particles move faster.', true], ['Particles get bigger when they are heated.', false], ['The particles of ice and of steam are the same kind of particle.', true], ['Gas particles are bigger than solid particles.', false], ['Particles in a solid do not move at all.', false]], why: 'Particles never change size, and they never stop moving. Ice, water and steam are all made of the same water particles; only their spacing and movement differ.' },
  { q: 'A balloon of air is squeezed into a smaller space. Which statements are true?', opts: [['The air particles are pushed closer together.', true], ['The air particles become smaller.', false], ['The number of air particles stays the same.', true], ['The mass of the air stays the same.', true], ['The air turns into a liquid straight away.', false]], why: 'Squeezing only reduces the space between particles. The particles, their number and their mass do not change.' },
];

// ---------------------------------------------------------------------------- 2.2 changes of state

type Change = { name: string; from: State; to: State; heated: boolean };
const CHANGES: Change[] = [
  { name: 'Melting', from: 'solid', to: 'liquid', heated: true },
  { name: 'Freezing', from: 'liquid', to: 'solid', heated: false },
  { name: 'Evaporation', from: 'liquid', to: 'gas', heated: true },
  { name: 'Condensation', from: 'gas', to: 'liquid', heated: false },
  { name: 'Sublimation', from: 'solid', to: 'gas', heated: true },
];
const CHANGE_NAMES = CHANGES.map((c) => c.name);

function changeName(rng: Rng): GenOutput {
  const c = rng.pick(CHANGES);
  return {
    prompt: `What is the name of the change from a ${c.from} to a ${c.to}?`,
    parts: [part(mc(rng, c.name, rng.sample(CHANGE_NAMES.filter((n) => n !== c.name), 3)))],
    hints: ['Melting and freezing go between solid and liquid; evaporation and condensation go between liquid and gas.'],
    solution: [`A ${c.from} becoming a ${c.to} is ${c.name.toLowerCase()}.`],
  };
}

const EVERYDAY: Array<{ text: string; change: string }> = [
  { text: 'An ice lolly drips on a hot day.', change: 'Melting' },
  { text: 'A puddle disappears on a sunny afternoon.', change: 'Evaporation' },
  { text: 'Drops of water form on the outside of a cold can of juice.', change: 'Condensation' },
  { text: 'Water in an ice-cube tray turns hard in the freezer.', change: 'Freezing' },
  { text: 'A bathroom mirror mists up during a hot shower.', change: 'Condensation' },
  { text: 'Wet washing dries on a line.', change: 'Evaporation' },
  { text: 'Candle wax runs down the side of a lit candle.', change: 'Melting' },
  { text: 'Runny chocolate sets hard after it is poured into a cold mould.', change: 'Freezing' },
  { text: 'A lump of dry ice (solid carbon dioxide) shrinks and gives off a gas, without making a puddle.', change: 'Sublimation' },
];

function everyday(rng: Rng): GenOutput {
  const e = rng.pick(EVERYDAY);
  const c = CHANGES.find((x) => x.name === e.change)!;
  return {
    prompt: `${e.text} Which change of state is this?`,
    parts: [part(mc(rng, e.change, rng.sample(CHANGE_NAMES.filter((n) => n !== e.change), 3)))],
    hints: ['Decide what state the substance starts in and what state it ends in.'],
    solution: [`The substance goes from a ${c.from} to a ${c.to}: ${e.change.toLowerCase()}.`],
  };
}

function heatedOrCooled(rng: Rng): GenOutput {
  const c = rng.pick(CHANGES);
  return {
    prompt: `During ${c.name.toLowerCase()} (${c.from} to ${c.to}), does the substance take in heat or give out heat?`,
    parts: [part(fixedChoice(['It takes in heat', 'It gives out heat'], c.heated ? 0 : 1))],
    hints: ['Particles need more energy to move further apart and more freely.'],
    solution: [`In ${c.name.toLowerCase()} the particles ${c.heated ? 'move further apart and more freely, so the substance must take in heat' : 'come closer together and move less, so the substance gives out heat'}.`],
  };
}

// ---------------------------------------------------------------------------- 2.2 melting and boiling points

const SUBSTANCES: Array<{ name: string; mp: number; bp: number }> = [
  { name: 'water', mp: 0, bp: 100 },
  { name: 'ethanol', mp: -114, bp: 78 },
  { name: 'mercury', mp: -39, bp: 357 },
  { name: 'oxygen', mp: -218, bp: -183 },
  { name: 'iron', mp: 1538, bp: 2862 },
  { name: 'sulfur', mp: 115, bp: 445 },
  { name: 'nitrogen', mp: -210, bp: -196 },
  { name: 'aluminium', mp: 660, bp: 2519 },
];

function stateOf(s: { mp: number; bp: number }, t: number): State {
  return t < s.mp ? 'solid' : t < s.bp ? 'liquid' : 'gas';
}

function pickTemp(rng: Rng, s: { mp: number; bp: number }): number {
  for (let i = 0; i < 50; i++) {
    const t = rng.pick([rng.int(s.mp - 60, s.mp - 5), rng.int(s.mp + 5, s.bp - 5), rng.int(s.bp + 5, s.bp + 80)]);
    if (t !== s.mp && t !== s.bp && s.bp - s.mp > 12) return t;
  }
  return s.mp - 10;
}

const MPBP_HINTS = ['Below its melting point a substance is solid; between its melting and boiling points it is liquid; above its boiling point it is gas.'];

function stateAtTemp(rng: Rng): GenOutput {
  const s = rng.pick(SUBSTANCES);
  const t = pickTemp(rng, s);
  const st = stateOf(s, t);
  return {
    prompt: `${cap(s.name)} melts at ${degC(s.mp)} and boils at ${degC(s.bp)}. What is its state at ${degC(t)}?`,
    parts: [part(fixedChoice([...CHOICES.state], STATES.indexOf(st)))],
    hints: MPBP_HINTS,
    solution: [`${degC(t)} is ${st === 'solid' ? 'below the melting point' : st === 'liquid' ? 'between the melting point and the boiling point' : 'above the boiling point'}, so ${s.name} is a ${st}.`],
  };
}

function liquidAt(rng: Rng): GenOutput {
  for (;;) {
    const three = rng.sample(SUBSTANCES, 3);
    const t = rng.pick([-100, -50, 20, 25, 50, 90, 150, 400]);
    const liquids = three.filter((s) => stateOf(s, t) === 'liquid');
    if (liquids.length !== 1) continue;
    const want = liquids[0];
    const table = three.map((s) => `${s.name} (melts at ${degC(s.mp)}, boils at ${degC(s.bp)})`).join('; ');
    return {
      prompt: `Here are three substances: ${table}. Which one is a liquid at ${degC(t)}?`,
      parts: [part(mc(rng, cap(want.name), three.filter((s) => s !== want).map((s) => cap(s.name))))],
      hints: MPBP_HINTS,
      solution: three.map((s) => `${cap(s.name)} is a ${stateOf(s, t)} at ${degC(t)}.`),
    };
  }
}

function liquidRange(rng: Rng): GenOutput {
  const s = rng.pick(SUBSTANCES);
  const range = s.bp - s.mp;
  return {
    prompt: `${cap(s.name)} melts at ${degC(s.mp)} and boils at ${degC(s.bp)}. Over how many degrees Celsius is ${s.name} a liquid?`,
    parts: [numPart(range, { suffix: '°C' })],
    hints: ['It is a liquid from its melting point up to its boiling point.', 'Subtract: boiling point − melting point. Take care with negative numbers.'],
    solution: [`$${s.bp} - ${s.mp < 0 ? `(${s.mp})` : s.mp} = ${range}$`, `${cap(s.name)} is a liquid over ${range} °C.`],
  };
}

// ---------------------------------------------------------------------------- 2.3 temperature

const TEMP_EASY: Q[] = [
  { q: 'What does the temperature of a substance tell us about its particles?', a: 'How fast its particles are moving, on average', w: ['How many particles there are in it', 'How big each of its particles is', 'What colour its particles are'], why: 'The faster the particles move, the higher the temperature.' },
  { q: 'A cup of hot cocoa cools down. What happens to its particles?', a: 'They slow down', w: ['They speed up', 'They get smaller', 'They stop moving completely'], why: 'Cooling takes energy away, so the particles move more slowly. They never stop altogether.' },
  { q: 'Which instrument measures temperature?', a: 'A thermometer', w: ['A balance', 'A measuring cylinder', 'A stopwatch'], why: 'A thermometer measures temperature, usually in degrees Celsius (°C).' },
  { q: 'At what temperature does pure water freeze, on the Celsius scale?', a: '0 °C', w: ['100 °C', '32 °C', '−10 °C'], why: 'The Celsius scale is built on water: it freezes at 0 °C and boils at 100 °C.' },
];

function tempChange(rng: Rng): GenOutput {
  const start = rng.int(-15, 30);
  const change = rng.int(3, 40) * (rng.chance(0.5) ? 1 : -1);
  const end = start + change;
  const name = rng.pick(NAMES);
  if (rng.chance(0.5)) {
    return {
      prompt: `${name} measures the temperature of a liquid as ${degC(start)}. After some time it is ${degC(end)}. By how many degrees did the temperature ${change > 0 ? 'rise' : 'fall'}?`,
      parts: [numPart(Math.abs(change), { suffix: '°C' })],
      hints: ['Find the difference between the two temperatures. A number line helps when one of them is below zero.'],
      solution: [`From ${degC(start)} to ${degC(end)} is a ${change > 0 ? 'rise' : 'fall'} of ${Math.abs(change)} °C.`],
    };
  }
  return {
    prompt: `The temperature outside is ${degC(start)}. It ${change > 0 ? 'rises' : 'falls'} by ${Math.abs(change)} °C. What is the new temperature, in °C?`,
    parts: [numPart(end, { suffix: '°C' })],
    hints: ['A rise adds to the temperature; a fall subtracts from it.'],
    solution: [`$${start} ${change > 0 ? '+' : '-'} ${Math.abs(change)} = ${end}$`, `The new temperature is ${degC(end)}.`],
  };
}

const TEMP_HARD: Q[] = [
  { q: 'A bath of warm water and a cup of boiling water are side by side. Which has more heat energy in it?', a: 'The bath, because it has far more particles, even though they move more slowly', w: ['The cup, because its particles are moving faster than the bath’s', 'They hold the same heat, because they are both made of water', 'The cup, because it has the higher temperature of the two'], why: 'Temperature tells how fast the particles move; heat energy also depends on how many particles there are. The bath has far more water.' },
  { q: 'What is the difference between heat and temperature?', a: 'Heat is energy that moves from hot to cold; temperature tells how hot something is', w: ['Heat and temperature are two words for the same thing', 'Temperature is energy that moves; heat tells how hot something is', 'Heat is measured with a thermometer and temperature with a balance'], why: 'Heat is energy on the move from a hotter object to a cooler one. Temperature, measured in °C, tells how hot an object is.' },
  { q: 'A spoon at 20 °C is put into soup at 70 °C. What happens?', a: 'Heat moves from the soup into the spoon until they are at the same temperature', w: ['Cold moves from the spoon into the soup and the soup boils', 'Heat moves from the spoon into the soup and the spoon gets colder', 'Nothing happens, because metal does not take in any heat'], why: 'Heat always moves from the hotter object to the cooler one, until both are at the same temperature.' },
];

// ---------------------------------------------------------------------------- 2.3 heat transfer

const TRANSFER: Array<{ text: string; way: 'Conduction' | 'Convection' | 'Radiation' }> = [
  { text: 'The handle of a metal spoon gets hot when the spoon stands in hot soup.', way: 'Conduction' },
  { text: 'You feel warm sitting in sunshine on a cold, still day.', way: 'Radiation' },
  { text: 'Warm air from a heater rises and cooler air sinks to take its place, warming the whole room.', way: 'Convection' },
  { text: 'Your hand feels the heat of a campfire from a metre away.', way: 'Radiation' },
  { text: 'Water at the bottom of a pan is heated, rises, and cooler water sinks to be heated in turn.', way: 'Convection' },
  { text: 'A pan on a hot plate heats up where it touches the plate.', way: 'Conduction' },
  { text: 'Energy from the Sun reaches Earth through empty space.', way: 'Radiation' },
  { text: 'An ice cube melts in your hand.', way: 'Conduction' },
];
const WAYS = ['Conduction', 'Convection', 'Radiation'];

function transferWay(rng: Rng): GenOutput {
  const t = rng.pick(TRANSFER);
  return {
    prompt: `${t.text} How is heat moving here?`,
    parts: [part(fixedChoice(WAYS, WAYS.indexOf(t.way)))],
    hints: ['Conduction: through touching particles. Convection: carried by a moving liquid or gas. Radiation: as rays, even through empty space.'],
    solution: [t.way === 'Conduction' ? 'The heat passes from particle to particle through objects that touch: conduction.' : t.way === 'Convection' ? 'The heat is carried by warm liquid or gas moving around: convection.' : 'The heat travels as rays, without anything touching: radiation.'],
  };
}

const TRANSFER_MEDIUM: Q[] = [
  { q: 'Which of these is a good conductor of heat?', a: 'Copper', w: ['Wool', 'Air', 'Plastic foam'], why: 'Metals such as copper conduct heat well. Wool, air and plastic foam are insulators.' },
  { q: 'Why does a woolly jumper keep you warm?', a: 'It traps air, which is a poor conductor, so less heat escapes from your body', w: ['It makes heat of its own from the wool', 'It lets cold air flow in towards your body', 'It reflects all the sunlight towards your skin'], why: 'Wool traps still air. Air is an insulator, so heat leaves your body more slowly.' },
  { q: 'Why is the heater in a room usually placed near the floor?', a: 'Warm air rises from it, so convection carries the heat around the room', w: ['Heat can only travel downwards in a room', 'Cold air rises, so the heater warms it there', 'It is safer, and the position makes no difference'], why: 'Air warmed by the heater rises and cooler air sinks to replace it, setting up a convection current.' },
  { q: 'In which direction does heat always move?', a: 'From a hotter object to a cooler one', w: ['From a cooler object to a hotter one', 'Upwards, whatever the temperatures', 'From a bigger object to a smaller one'], why: 'Heat flows from hot to cold until the temperatures are equal.' },
  { q: 'Why can heat from the Sun reach Earth, but not by conduction or convection?', a: 'Space is almost empty, and radiation is the only way that needs no particles', w: ['Space is full of hot air that carries the heat to us', 'The Sun touches Earth at its edge, so heat can conduct', 'The Sun’s heat flows in a liquid current through space'], why: 'Conduction and convection need particles. Radiation can travel through empty space.' },
];

const TRANSFER_HARD: Select[] = [
  { q: 'Which of these are insulators (poor conductors of heat)?', opts: [['Wood', true], ['Air', true], ['Plastic', true], ['Iron', false], ['Aluminium', false], ['Wool', true]], why: 'Metals conduct heat well. Wood, plastic, wool and air are insulators.' },
  { q: 'Which statements about heat transfer are true?', opts: [['Conduction happens best in solids, where particles touch.', true], ['Convection happens in liquids and gases.', true], ['Radiation can travel through empty space.', true], ['Convection happens in solids.', false], ['Heat moves from cold objects to hot ones.', false]], why: 'Conduction needs touching particles, convection needs particles that can flow, and radiation needs no particles. Heat moves from hot to cold.' },
];

// ---------------------------------------------------------------------------- 2.4 expansion

const EXPANSION_EASY: Q[] = [
  { q: 'What happens to most solids when they are heated?', a: 'They expand (get slightly bigger)', w: ['They contract (get slightly smaller)', 'They stay exactly the same size', 'They lose some of their mass'], why: 'Heating makes the particles vibrate more, so they push each other slightly further apart and the solid expands.' },
  { q: 'Why does a solid expand when it is heated?', a: 'Its particles vibrate more and move slightly further apart', w: ['Its particles get bigger as they are heated', 'New particles are made inside the solid', 'Its particles stop vibrating and spread out'], why: 'The particles stay the same size; the space between them grows.' },
  { q: 'What happens to a gas in a sealed bottle when it is cooled?', a: 'Its particles slow down and it contracts, so its pressure falls', w: ['Its particles speed up and the bottle bursts', 'Its particles get smaller and the gas disappears', 'Nothing at all happens to the gas'], why: 'Cooled particles move more slowly and hit the walls less hard and less often.' },
];

const EXPANSION_MEDIUM: Q[] = [
  { q: 'Why do long bridges have small gaps (expansion joints) between their sections?', a: 'So the sections can expand on hot days without pushing on each other and buckling', w: ['So that rainwater can drain away through the joints', 'So the bridge is lighter and costs less to build', 'So that the bridge bends more easily in the wind'], why: 'Concrete and steel expand in the heat. The gaps give them room.' },
  { q: 'Why do overhead power lines sag more in summer than in winter?', a: 'The wires expand in the heat, so they get longer', w: ['The wires contract in the heat, so they get shorter', 'The wires get heavier in summer, so they hang lower', 'Birds sit on the wires much more in summer'], why: 'Metal wires expand when warm, so the same wire between two poles hangs lower.' },
  { q: 'A metal lid is stuck on a glass jar. Why does running hot water over the lid help?', a: 'The metal lid expands more than the glass, so it loosens', w: ['The hot water makes the glass get smaller', 'The water slides in and dissolves the lid', 'The heat makes the lid lose a little mass'], why: 'Metal expands more than glass for the same rise in temperature, so the lid becomes looser.' },
  { q: 'Why does the liquid in a thermometer rise when it gets warmer?', a: 'The liquid expands and has nowhere to go but up the thin tube', w: ['Warm air pushes the liquid up the tube', 'The liquid boils and the bubbles push it up', 'The glass tube shrinks and squeezes the liquid'], why: 'The liquid expands as it warms, and the thin tube shows even a small change in volume.' },
];

const EXPANSION_HARD: Select[] = [
  { q: 'A metal ball just fits through a metal ring. The ball is heated. Which statements are true?', opts: [['The ball expands and may no longer fit through the ring.', true], ['The particles of the ball vibrate more.', true], ['The particles of the ball get bigger.', false], ['The mass of the ball stays the same.', true], ['The ball contracts and drops through more easily.', false]], why: 'Heating makes the particles vibrate more and take up more room, so the ball expands. Its mass and its particles’ size do not change.' },
  { q: 'Which of these are caused by expansion or contraction?', opts: [['A bridge’s expansion joints close up on a hot day', true], ['Power lines sag on a hot day', true], ['A dented table tennis ball pops back out in hot water', true], ['Sugar dissolves faster in hot tea', false], ['A puddle dries up in the sun', false]], why: 'Joints, sagging lines and the ball are all expansion. Dissolving and evaporation are different changes.' },
];

// ---------------------------------------------------------------------------- 2.4 diffusion

const DIFFUSION_EASY: Q[] = [
  { q: 'What is diffusion?', a: 'The spreading out of particles from where there are many to where there are few', w: ['The turning of a liquid into a gas at its surface', 'The joining of particles to make a bigger particle', 'The sinking of heavy particles to the bottom'], why: 'In diffusion, particles spread out by their own random movement until they are evenly mixed.' },
  { q: 'Someone opens a bottle of perfume at the front of a room. Soon it can be smelled at the back. What is this an example of?', a: 'Diffusion', w: ['Condensation', 'Freezing', 'Filtration'], why: 'The perfume particles spread through the air by their own movement: diffusion.' },
  { q: 'A drop of food colouring is put into still water. What happens over time?', a: 'The colour slowly spreads until all the water is evenly coloured', w: ['The colour stays as a single drop in one place', 'The colour sinks and stays at the bottom for ever', 'The water turns into food colouring'], why: 'The colouring particles and water particles move about and mix: the colour diffuses through the water.' },
];

const DIFFUSION_MEDIUM: Q[] = [
  { q: 'Why does diffusion happen faster in a gas than in a liquid?', a: 'Gas particles move faster and have more space to move into', w: ['Gas particles are bigger than liquid particles', 'Liquid particles do not move at all', 'Gas particles are held in fixed positions'], why: 'Gas particles are far apart and fast, so they spread quickly.' },
  { q: 'A tea bag is put into a cup of hot water and another into cold water. In which cup does the colour spread faster?', a: 'The hot water', w: ['The cold water', 'Both spread at the same speed', 'Neither, because colour cannot spread in water'], why: 'In hot water the particles move faster, so they spread out faster.' },
  { q: 'Why does diffusion hardly happen at all in solids?', a: 'Their particles are held in place and cannot move around', w: ['Their particles are too far apart to mix together', 'Solids have no particles, so nothing can spread', 'Their particles move much too fast to mix'], why: 'Solid particles only vibrate on the spot, so they cannot move into each other.' },
];

function diffusionTimes(rng: Rng): GenOutput {
  const temps = rng.sample([10, 20, 30, 40, 50, 60], 3).sort((a, b) => a - b);
  const times = [rng.int(70, 110), rng.int(40, 65), rng.int(15, 35)];
  const ask = rng.pick([0, 2]);
  const table = temps.map((t, i) => `at ${t} °C it took ${times[i]} minutes`).join('; ');
  return {
    prompt: `${rng.pick(NAMES)} timed how long a crystal of purple dye took to colour a beaker of water evenly: ${table}. At which temperature did the dye diffuse ${ask === 2 ? 'fastest' : 'slowest'}?`,
    parts: [part(fixedChoice(temps.map((t) => `${t} °C`), ask))],
    hints: ['Fastest diffusion means the shortest time.', 'Warmer particles move faster.'],
    solution: [`The ${ask === 2 ? 'shortest' : 'longest'} time was at ${temps[ask]} °C, so the dye diffused ${ask === 2 ? 'fastest' : 'slowest'} there.`, ask === 2 ? 'Warmer water particles move faster, so the dye spreads faster.' : 'Cooler water particles move more slowly, so the dye spreads more slowly.'],
  };
}

export const PARTICLE_SKILLS: SkillDef[] = [
  skill({ id: 'c7-states', name: 'Solids, liquids and gases', description: 'Identify solids, liquids and gases from how their particles behave and from their shape, volume and flow.', outcomes: ['7-B1'], lessonId: L(1), format: 'mc', gen: bank([stateFromParticles, stateFromBehaviour, stateSelect], ['Are the particles close together or far apart?', 'Are they held in place, or free to move?']) }),
  skill({ id: 'c7-particle-model', name: 'The particle model', description: 'Use the particle model to explain why solids keep their shape, liquids flow and gases can be squashed.', outcomes: ['7-B1'], lessonId: L(1), format: 'mc', gen: bank([MODEL_EASY, MODEL_MEDIUM, MODEL_HARD], ['Think about how far apart the particles are, and whether they are free to move.', 'Particles never change size, and they are always moving.']) }),
  skill({ id: 'c7-state-changes', name: 'Changes of state', description: 'Name melting, freezing, evaporation, condensation and sublimation, and say whether each needs heating or cooling.', outcomes: ['7-B1'], lessonId: L(2), format: 'mc', gen: bank([changeName, everyday, heatedOrCooled], ['Decide the starting state and the ending state.']) }),
  skill({ id: 'c7-melting-boiling', name: 'Melting and boiling points', description: 'Use melting and boiling points to give the state of a substance at a temperature.', outcomes: ['7-B1'], lessonId: L(2), gen: bank([stateAtTemp, liquidAt, either(liquidRange, stateAtTemp)], MPBP_HINTS) }),
  skill({ id: 'c7-temperature', name: 'Temperature and heat', description: 'Explain temperature as the speed of particles, work out temperature changes, and tell heat from temperature.', outcomes: ['7-B2'], lessonId: L(3), gen: bank([TEMP_EASY, tempChange, TEMP_HARD], ['The faster the particles move, the higher the temperature.', 'Heat moves from hot to cold.']) }),
  skill({ id: 'c7-heat-transfer', name: 'Conduction, convection and radiation', description: 'Name the way heat is moving, pick conductors and insulators, and explain how heat moves from hot to cold.', outcomes: ['7-B2'], lessonId: L(3), format: 'mc', gen: bank([transferWay, TRANSFER_MEDIUM, TRANSFER_HARD], ['Conduction: through touching particles. Convection: carried by a moving liquid or gas. Radiation: as rays, even through empty space.']) }),
  skill({ id: 'c7-expansion', name: 'Expansion and contraction', description: 'Explain expansion and contraction with the particle model, and in everyday examples.', outcomes: ['7-B2'], lessonId: L(4), format: 'mc', gen: bank([EXPANSION_EASY, EXPANSION_MEDIUM, EXPANSION_HARD], ['Heating makes particles move more and take up more room; the particles themselves do not grow.']) }),
  skill({ id: 'c7-diffusion', name: 'Diffusion', description: 'Explain diffusion, and why it is faster in gases and in warmer substances.', outcomes: ['7-B2'], lessonId: L(4), format: 'mc', gen: bank([DIFFUSION_EASY, DIFFUSION_MEDIUM, either(diffusionTimes, fromBank(DIFFUSION_MEDIUM, ['Faster particles spread out faster.']))], ['Diffusion is particles spreading out by their own movement.', 'Faster particles spread out faster.']) }),
];
