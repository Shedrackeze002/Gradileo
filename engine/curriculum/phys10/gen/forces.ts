/**
 * Grade 10 Physics, Unit 2: Forces (10-B1, 10-B2). Kinds of force and the net force, Newton's
 * first law and inertia, Newton's second law, mass, weight and gravity, friction and air
 * resistance, and Newton's third law. Every question that needs g states it (9.8 N/kg on Earth).
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, NAMES, num, q, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `p10-2-${n}`;
const clean = (x: number) => Math.round(x * 1e6) / 1e6;
const ACC = 'm/s²';
/** An acceleration as maths. */
const qa = (v: number | string) => `$${v}\\ \\text{m/s}^2$`;
const G = 9.8;
const G_NOTE = 'On Earth, $g = 9.8$ N/kg.';

// ---------------------------------------------------------------------------- 2.1 forces and net force

const FORCE_EASY: Q[] = [
  { q: 'What is a force?', a: 'A push or a pull on an object', w: ['The speed of an object', 'The amount of matter in an object', 'The energy an object has stored'], why: 'A force is a push or a pull. It can change an object’s speed, direction or shape.' },
  { q: 'What is the unit of force?', a: 'The newton (N)', w: ['The kilogram (kg)', 'The metre per second (m/s)', 'The joule (J)'], why: 'Force is measured in newtons, named after Isaac Newton.' },
  { q: 'Which force pulls every object towards the centre of the Earth?', a: 'Weight (the force of gravity)', w: ['Friction', 'The normal force', 'Tension'], why: 'The Earth’s gravity pulls on every mass. That pull is the object’s weight.' },
  { q: 'A book rests on a table. Which force does the table exert upwards on the book?', a: 'The normal force', w: ['Weight', 'Friction', 'Air resistance'], why: 'A surface pushes back on anything pressing on it, at right angles to the surface. This is the normal force.' },
  { q: 'Which force acts against sliding between two surfaces that touch?', a: 'Friction', w: ['Weight', 'Tension', 'The normal force'], why: 'Friction acts along the surfaces, against the sliding.' },
  { q: 'Which force acts along a stretched rope, string or cable?', a: 'Tension', w: ['Friction', 'Weight', 'Air resistance'], why: 'A stretched rope pulls on whatever is tied to each end. That pull is tension.' },
  { q: 'Which force acts against an object moving through the air?', a: 'Air resistance', w: ['Tension', 'The normal force', 'Weight'], why: 'The air pushes back on anything moving through it. This is air resistance, also called drag.' },
  { q: 'Which of these can a force NOT do to an object?', a: 'Change its mass', w: ['Change its speed', 'Change its direction', 'Change its shape'], why: 'A force can speed an object up, slow it down, turn it or squash it, but the amount of matter stays the same.' },
];

const CONTACT = ['Contact force', 'Non-contact force'];
const FORCE_MEDIUM: Q[] = [
  ...['Friction', 'Tension', 'The normal force', 'Air resistance'].map((f) => ({ q: `${f}: is it a contact force or a non-contact force?`, a: CONTACT[0], w: [CONTACT[1]], order: CONTACT, why: `${f} acts only where two things touch, so it is a contact force.` })),
  ...['Weight (gravity)', 'The force between two magnets', 'The force between two electric charges'].map((f) => ({ q: `${f}: is it a contact force or a non-contact force?`, a: CONTACT[1], w: [CONTACT[0]], order: CONTACT, why: `${f} acts across a gap, without touching, so it is a non-contact force.` })),
  { q: 'A parachutist falls straight down at a steady speed. Which two forces act on the parachutist?', a: 'Weight downwards and air resistance upwards', w: ['Weight downwards and the normal force upwards', 'Tension downwards and friction upwards', 'Weight upwards and air resistance downwards'], why: 'Gravity pulls down, and the air pushes up against the motion. Nothing solid is touching, so there is no normal force.' },
  { q: 'A lamp hangs at rest from a cable. Which two forces act on the lamp?', a: 'Weight downwards and tension upwards', w: ['Weight downwards and friction upwards', 'The normal force downwards and tension upwards', 'Weight upwards and tension downwards'], why: 'Gravity pulls the lamp down and the stretched cable pulls it up.' },
];

const FORCE_HARD: Select[] = [
  { q: 'A box is pulled along a rough floor by a rope. Which forces act on the box?', opts: [['Weight, downwards', true], ['The normal force from the floor, upwards', true], ['Friction, against the motion', true], ['Tension in the rope', true], ['A magnetic force', false], ['A "force of motion" that keeps it going', false]], why: 'Gravity, the floor (pushing up and rubbing) and the rope each act on the box. Nothing called a "force of motion" exists: motion does not need a force to carry on.' },
  { q: 'Which of these are non-contact forces?', opts: [['Weight', true], ['The force between magnets', true], ['The force between electric charges', true], ['Friction', false], ['Tension', false], ['The normal force', false], ['Air resistance', false]], why: 'Gravity, magnetic and electric forces act across a gap. The others need touching.' },
  { q: 'A ball has been kicked and is flying through the air. Which forces act on it now?', opts: [['Weight, downwards', true], ['Air resistance, against its motion', true], ['The kick from the foot', false], ['The normal force from the ground', false], ['Tension', false]], why: 'Once the ball leaves the foot, the foot no longer touches it. Only gravity and the air act on it.' },
];

const SIDES: Array<[string, string]> = [['right', 'left'], ['east', 'west'], ['up', 'down'], ['north', 'south']];

function netTwo(rng: Rng): GenOutput {
  const [pos, neg] = rng.pick(SIDES);
  const a = rng.int(3, 20) * 5;
  const same = rng.chance(0.35);
  const b = same ? rng.int(2, 12) * 5 : rng.pick([5, 10, 15, 20, 25, 30, 40].filter((x) => x !== a));
  const net = same ? a + b : a - b;
  return {
    prompt: `Two forces act on a box along one line: ${q(a, 'N')} ${pos} and ${q(b, 'N')} ${same ? pos : neg}. What is the net force on the box?`,
    parts: [numPart(Math.abs(net), { label: 'Size', suffix: 'N' }), part(fixedChoice([pos, neg], net > 0 ? 0 : 1), { label: 'Direction' })],
    hints: ['Forces in the same direction add. Forces in opposite directions subtract.', 'The net force points the way of the larger force.'],
    solution: [same ? `Both forces point ${pos}, so they add: $${a} + ${b} = ${net}$ N ${pos}.` : `The forces are opposite, so subtract: $${Math.max(a, b)} - ${Math.min(a, b)} = ${Math.abs(net)}$ N, towards the larger force (${net > 0 ? pos : neg}).`],
  };
}

function netThree(rng: Rng): GenOutput {
  for (;;) {
    const [pos, neg] = rng.pick(SIDES.slice(0, 2));
    const a = rng.int(2, 12) * 5;
    const b = rng.int(2, 12) * 5;
    const c = rng.int(4, 24) * 5;
    const net = a + b - c;
    if (net === 0) continue;
    return {
      prompt: `Three forces act on a cart along one line: ${q(a, 'N')} ${pos}, ${q(b, 'N')} ${pos} and ${q(c, 'N')} ${neg}. What is the net force on the cart?`,
      parts: [numPart(Math.abs(net), { label: 'Size', suffix: 'N' }), part(fixedChoice([pos, neg], net > 0 ? 0 : 1), { label: 'Direction' })],
      hints: [`Take ${pos} as positive and ${neg} as negative, then add all three.`],
      solution: [`Taking ${pos} as positive: $${a} + ${b} - ${c} = ${net}$ N.`, `The net force is ${Math.abs(net)} N ${net > 0 ? pos : neg}.`],
    };
  }
}

function balancedOrNot(rng: Rng): GenOutput {
  const a = rng.int(4, 30) * 5;
  const balanced = rng.chance(0.5);
  const b = balanced ? a : a + rng.pick([-15, -10, -5, 5, 10, 15]);
  const options = ['Balanced', 'Unbalanced'];
  return {
    prompt: `A sledge is pulled forwards with ${q(a, 'N')} while friction pulls backwards with ${q(b, 'N')}. Are the forces along the ground balanced or unbalanced?`,
    parts: [part(fixedChoice(options, balanced ? 0 : 1))],
    hints: ['Forces are balanced when the net force is zero.'],
    solution: [balanced ? `$${a} - ${b} = 0$ N: the net force is zero, so the forces are balanced.` : `$${a} - ${b} = ${a - b}$ N: the net force is not zero, so the forces are unbalanced.`, `Answer: ${options[balanced ? 0 : 1]}`],
  };
}

function missingForce(rng: Rng): GenOutput {
  const push = rng.int(8, 30) * 5;
  const net = rng.int(1, 6) * 5;
  const friction = push - net;
  return {
    prompt: `A crate is pushed to the right with ${q(push, 'N')}. Friction acts to the left. The net force on the crate is ${q(net, 'N')} to the right. What is the size of the friction force?`,
    parts: [numPart(friction, { suffix: 'N' })],
    hints: ['net force = push − friction'],
    solution: [`$${push} - \\text{friction} = ${net}$, so friction $= ${push} - ${net} = ${friction}$ N.`],
  };
}

// ---------------------------------------------------------------------------- 2.2 Newton's first law and inertia

const FIRST_EASY: Q[] = [
  { q: 'What does Newton’s first law say about an object when the forces on it are balanced?', a: 'It stays at rest, or keeps moving at a steady velocity', w: ['It always comes to rest', 'It speeds up steadily', 'It moves in a circle'], why: 'With no net force, the velocity does not change: a resting object stays at rest and a moving one keeps the same speed and direction.' },
  { q: 'A book lies at rest on a table. What is the net force on the book?', a: 'Zero', w: ['Equal to its weight', 'Equal to the normal force', 'It cannot be known'], why: 'The book’s velocity is not changing, so the forces on it are balanced: the normal force cancels the weight.' },
  { q: 'What is needed to change the velocity of an object?', a: 'A net (unbalanced) force', w: ['Nothing: velocity changes by itself', 'Balanced forces', 'A large mass'], why: 'Only an unbalanced force changes how fast, or in which direction, an object moves.' },
  { q: 'A puck slides across perfectly smooth ice, with no force along its path. What does it do?', a: 'It keeps moving at the same speed in a straight line', w: ['It slows down and stops', 'It speeds up', 'It stops at once'], why: 'With no net force, nothing changes its velocity.' },
];

const FIRST_MEDIUM: Q[] = [
  { q: 'A car travels along a straight, level road at a steady 25 m/s. What can you say about the forces on it?', a: 'They are balanced: the driving force equals the resistive forces', w: ['The driving force is larger than the resistive forces', 'There are no forces on the car', 'The resistive forces are larger than the driving force'], why: 'A steady velocity means zero net force. The engine’s push only cancels friction and air resistance.' },
  { q: 'A spacecraft far from any star or planet switches off its engines. What happens to it?', a: 'It carries on at the same velocity', w: ['It slows down and stops', 'It stops at once', 'It turns round'], why: 'No force acts on it, so its velocity does not change.' },
  { q: 'A cyclist stops pedalling on a level road and slows down. Why?', a: 'Friction and air resistance act backwards, so the forces are unbalanced', w: ['Moving objects always stop by themselves', 'The cyclist has run out of force', 'There are no forces on the cyclist'], why: 'The backward forces are no longer cancelled by the pedalling, so there is a net force that slows the cyclist.' },
  { q: 'A skydiver falls at a steady velocity. What is the net force on the skydiver?', a: 'Zero', w: ['Equal to the skydiver’s weight', 'Equal to the air resistance', 'It keeps growing'], why: 'A steady velocity means balanced forces: the air resistance equals the weight.' },
];

const FIRST_HARD: Select[] = [
  { q: 'Which statements about forces and motion are true?', opts: [['An object can keep moving with no net force on it.', true], ['If an object’s velocity is changing, the forces on it are unbalanced.', true], ['An object at rest has balanced forces on it.', true], ['A net force is needed to keep an object moving at a steady velocity.', false], ['Balanced forces mean the object must be at rest.', false], ['An object at rest has no forces on it at all.', false]], why: 'Balanced forces mean no change in velocity: at rest, or moving steadily. A force is needed only to change the motion.' },
];

function steadyForce(rng: Rng): GenOutput {
  const f = rng.int(6, 60) * 5;
  const cases = [
    { text: `A crate is pushed across a level floor at a steady velocity with a push of ${q(f, 'N')}. What is the size of the friction force on the crate?`, why: 'the friction equals the push' },
    { text: `A lift moves upwards at a steady velocity. The tension in its cable is ${q(f * 20, 'N')}. What is the weight of the lift?`, why: 'the weight equals the tension' },
    { text: `A parachutist with a weight of ${q(f * 2, 'N')} falls at a steady velocity. What is the size of the air resistance?`, why: 'the air resistance equals the weight' },
    { text: `A boat’s engine pushes it forwards with ${q(f * 4, 'N')}, and it moves at a steady velocity. What is the total resistive force from the water and the air?`, why: 'the resistive force equals the engine’s push' },
  ];
  const i = rng.int(0, cases.length - 1);
  const value = [f, f * 20, f * 2, f * 4][i];
  return {
    prompt: cases[i].text,
    parts: [numPart(value, { suffix: 'N' })],
    hints: ['A steady velocity means the net force is zero.', 'So the two opposite forces are the same size.'],
    solution: [`The velocity is steady, so the forces are balanced and ${cases[i].why}: ${value} N.`],
  };
}

const INERTIA_EASY: Q[] = [
  { q: 'What is inertia?', a: 'The tendency of an object to resist a change in its motion', w: ['The force that keeps an object moving', 'The speed of an object', 'The pull of gravity on an object'], why: 'Inertia is not a force. It is the way every object keeps doing what it is doing until a net force changes that.' },
  { q: 'What does the inertia of an object depend on?', a: 'Its mass', w: ['Its speed', 'Its colour', 'Its height above the ground'], why: 'The more mass an object has, the harder it is to start, stop or turn.' },
];

const THINGS: Array<[string, number]> = [['a tennis ball', 0.06], ['a football', 0.45], ['a bowling ball', 6], ['a bicycle', 12], ['a shopping trolley', 25], ['a motorbike', 180], ['a small car', 1100], ['a bus', 12000], ['a loaded truck', 30000]];
const massText = ([name, m]: [string, number]) => `${name[0].toUpperCase()}${name.slice(1)} (${m >= 1 ? num(m, 0) : num(m)} kg)`;

function mostInertia(rng: Rng): GenOutput {
  const three = rng.sample(THINGS, 3);
  const most = rng.chance(0.6);
  const sorted = three.slice().sort((a, b) => a[1] - b[1]);
  const answer = most ? sorted[2] : sorted[0];
  return {
    prompt: `Which of these has the ${most ? 'most' : 'least'} inertia?`,
    parts: [part(mc(rng, massText(answer), three.filter((t) => t !== answer).map(massText)))],
    hints: ['Inertia depends on mass: more mass, more inertia.'],
    solution: [`The one with the ${most ? 'greatest' : 'smallest'} mass has the ${most ? 'most' : 'least'} inertia.`, `Answer: ${massText(answer)}`],
  };
}

const INERTIA_MEDIUM: Q[] = [
  { q: 'A bus brakes suddenly, and the standing passengers lurch forwards. Why?', a: 'Their bodies carry on moving forwards while the bus slows down', w: ['The brakes push the passengers forwards', 'A forward force acts on them when the bus brakes', 'The passengers become heavier'], why: 'By inertia the passengers keep their velocity until a force (from the floor, a rail or a seat) slows them too.' },
  { q: 'Why do seat belts protect people in a car that stops suddenly?', a: 'They supply the force that slows the person down with the car', w: ['They remove the person’s inertia', 'They make the car stop faster', 'They reduce the person’s mass'], why: 'Without a belt, the person would carry on at the car’s old velocity until something else stopped them.' },
  { q: 'A bus pulls away quickly from a stop, and a standing passenger seems to be thrown backwards. Why?', a: 'The passenger’s body stays at rest while the bus moves forwards beneath them', w: ['A backward force pushes the passenger', 'The passenger’s weight increases', 'The bus pushes air at the passenger'], why: 'By inertia the passenger tends to stay at rest. The floor moves forwards under their feet.' },
  { q: 'A loaded shopping trolley is harder to get moving than an empty one. Why?', a: 'It has more mass, so more inertia', w: ['It has more friction only', 'It has less inertia', 'Gravity pushes it backwards'], why: 'More mass resists a change in motion more strongly.' },
  { q: 'A magician pulls a tablecloth quickly from under some plates, and the plates stay on the table. Why?', a: 'The plates’ inertia keeps them almost at rest during the short pull', w: ['The plates are stuck to the table', 'The cloth pushes the plates down', 'Fast pulls have no friction at all'], why: 'The small friction force acts for too short a time to change the plates’ velocity much.' },
];

const INERTIA_HARD: Select[] = [
  { q: 'Which statements about inertia are true?', opts: [['An object with more mass has more inertia.', true], ['Inertia makes a moving object tend to keep moving.', true], ['Inertia makes a resting object tend to stay at rest.', true], ['Inertia is a force that pushes objects forwards.', false], ['Only moving objects have inertia.', false], ['Inertia depends on how fast the object is moving.', false]], why: 'Inertia is a property of mass, not a force. Every object has it, moving or not.' },
];

// ---------------------------------------------------------------------------- 2.3 Newton's second law

const CARTS = ['A trolley', 'A sledge', 'A cart', 'A wagon', 'A small boat', 'A go-kart'];

function secondLaw(rng: Rng, find: 'a' | 'F' | 'm'): GenOutput {
  const m = rng.pick([2, 4, 5, 8, 10, 20, 25, 40, 50]);
  const a = rng.pick([0.5, 1.5, 2, 2.5, 3, 4, 5, 6]);
  const F = clean(m * a);
  const what = rng.pick(CARTS);
  if (find === 'a') {
    return {
      prompt: `${what} of mass ${q(m, 'kg')} has a net force of ${q(F, 'N')} on it. What is the acceleration?`,
      parts: [numPart(a, { suffix: ACC })],
      hints: ['acceleration = net force ÷ mass'],
      solution: [`$a = \\dfrac{F}{m} = \\dfrac{${F}}{${m}} = ${a}\\ \\text{m/s}^2$`],
    };
  }
  if (find === 'F') {
    return {
      prompt: `${what} of mass ${q(m, 'kg')} accelerates at ${qa(a)}. What is the net force on it?`,
      parts: [numPart(F, { suffix: 'N' })],
      hints: ['net force = mass × acceleration'],
      solution: [`$F = ma = ${m} \\times ${a} = ${F}$ N`],
    };
  }
  return {
    prompt: `A net force of ${q(F, 'N')} gives an object an acceleration of ${qa(a)}. What is the mass of the object?`,
    parts: [numPart(m, { suffix: 'kg' })],
    hints: ['mass = net force ÷ acceleration'],
    solution: [`$m = \\dfrac{F}{a} = \\dfrac{${F}}{${a}} = ${m}$ kg`],
  };
}

function secondLawSteps(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const grams = rng.pick([200, 250, 400, 500, 800]);
    const a = rng.pick([2, 4, 5, 10]);
    const F = clean((grams / 1000) * a);
    return {
      prompt: `A toy car of mass ${q(grams, 'g')} accelerates at ${qa(a)}. What is the net force on it?`,
      parts: [numPart(F, { suffix: 'N' })],
      hints: ['Change the mass to kilograms first.', 'net force = mass × acceleration'],
      solution: [`${q(grams, 'g')} $= ${grams / 1000}$ kg.`, `$F = ma = ${grams / 1000} \\times ${a} = ${F}$ N`],
    };
  }
  const m = rng.pick([2, 4, 5, 10]);
  const a = rng.pick([1.5, 2, 3, 4]);
  const t = rng.pick([2, 4, 5, 6]);
  return {
    prompt: `A cart of mass ${q(m, 'kg')} starts from rest. A net force of ${q(clean(m * a), 'N')} acts on it for ${q(t, 's')}. How fast is the cart moving at the end?`,
    parts: [numPart(clean(a * t), { suffix: 'm/s' })],
    hints: ['Find the acceleration first: a = F ÷ m.', 'Then v = u + at, with u = 0.'],
    solution: [`$a = \\dfrac{${clean(m * a)}}{${m}} = ${a}\\ \\text{m/s}^2$`, `$v = 0 + ${a} \\times ${t} = ${clean(a * t)}$ m/s`],
  };
}

function withFriction(rng: Rng, find: 'a' | 'friction' | 'push' | 'slowing'): GenOutput {
  const m = rng.pick([2, 4, 5, 10, 20]);
  const a = rng.pick([1, 1.5, 2, 3, 4]);
  // Friction of at most about a third of the weight, which a real floor could give.
  const f = clean(m * rng.pick([0.5, 1, 1.5, 2, 2.5, 3]));
  const P = clean(m * a + f);
  const what = rng.pick(['A box', 'A crate', 'A sledge', 'A trolley']);
  if (find === 'a') {
    return {
      prompt: `${what} of mass ${q(m, 'kg')} is pushed along a floor with ${q(P, 'N')}. Friction of ${q(f, 'N')} acts against the motion. What is the acceleration?`,
      parts: [numPart(a, { suffix: ACC })],
      hints: ['Find the net force first: push − friction.', 'acceleration = net force ÷ mass'],
      solution: [`Net force $= ${P} - ${f} = ${clean(P - f)}$ N.`, `$a = \\dfrac{${clean(P - f)}}{${m}} = ${a}\\ \\text{m/s}^2$`],
    };
  }
  if (find === 'friction') {
    return {
      prompt: `${what} of mass ${q(m, 'kg')} is pushed along a floor with ${q(P, 'N')} and accelerates at ${qa(a)}. What is the size of the friction force?`,
      parts: [numPart(f, { suffix: 'N' })],
      hints: ['The net force is mass × acceleration.', 'net force = push − friction'],
      solution: [`Net force $= ma = ${m} \\times ${a} = ${clean(m * a)}$ N.`, `Friction $= ${P} - ${clean(m * a)} = ${f}$ N`],
    };
  }
  if (find === 'push') {
    return {
      prompt: `${what} of mass ${q(m, 'kg')} slides on a floor where friction is ${q(f, 'N')}. What push is needed to give it an acceleration of ${qa(a)}?`,
      parts: [numPart(P, { suffix: 'N' })],
      hints: ['The net force needed is mass × acceleration.', 'The push must supply that net force and also cancel the friction.'],
      solution: [`Net force needed $= ${m} \\times ${a} = ${clean(m * a)}$ N.`, `Push $= ${clean(m * a)} + ${f} = ${P}$ N`],
    };
  }
  const dec = clean(f / m);
  return {
    prompt: `${what} of mass ${q(m, 'kg')} is sliding along a floor when the push on it stops. Only friction of ${q(f, 'N')} now acts along the floor, against the motion. Taking the direction of motion as positive, what is the acceleration? Include a minus sign if it is negative.`,
    parts: [numPart(-dec, { suffix: ACC })],
    hints: ['The net force is the friction alone, and it points backwards.', 'acceleration = net force ÷ mass'],
    solution: [`Net force $= -${f}$ N.`, `$a = \\dfrac{-${f}}{${m}} = -${dec}\\ \\text{m/s}^2$: it slows down.`],
  };
}

// ---------------------------------------------------------------------------- 2.4 mass, weight and gravity

const WORLDS: Array<[string, number]> = [['the Moon', 1.6], ['Mars', 3.7], ['Venus', 8.9], ['Jupiter', 24.8]];

function weightOnEarth(rng: Rng): GenOutput {
  const m = rng.pick([2, 5, 10, 15, 20, 40, 50, 60, 75]);
  const W = clean(m * G);
  return {
    prompt: `${G_NOTE} What is the weight of a mass of ${q(m, 'kg')}?`,
    parts: [numPart(W, { suffix: 'N' })],
    hints: ['weight = mass × g'],
    solution: [`$W = mg = ${m} \\times 9.8 = ${W}$ N`],
  };
}

function weightElsewhere(rng: Rng): GenOutput {
  const m = rng.pick([5, 10, 20, 50, 60, 80]);
  if (rng.chance(0.5)) {
    const W = clean(m * G);
    return {
      prompt: `${G_NOTE} A crate has a weight of ${q(W, 'N')}. What is its mass?`,
      parts: [numPart(m, { suffix: 'kg' })],
      hints: ['mass = weight ÷ g'],
      solution: [`$m = \\dfrac{W}{g} = \\dfrac{${W}}{9.8} = ${m}$ kg`],
    };
  }
  const [world, g] = rng.pick(WORLDS);
  return {
    prompt: `On ${world}, $g = ${g}$ N/kg. What is the weight of a ${q(m, 'kg')} mass there?`,
    parts: [numPart(clean(m * g), { suffix: 'N' })],
    hints: ['weight = mass × g, with the value of g for that place'],
    solution: [`$W = mg = ${m} \\times ${g} = ${clean(m * g)}$ N`],
  };
}

function weightTwoSteps(rng: Rng): GenOutput {
  const [world, g] = rng.pick(WORLDS);
  const m = rng.pick([5, 10, 20, 50]);
  if (rng.chance(0.5)) {
    const W = clean(m * G);
    return {
      prompt: `${G_NOTE} A rover has a weight of ${q(W, 'N')} on Earth. On ${world}, $g = ${g}$ N/kg. What is the rover’s weight on ${world}?`,
      parts: [numPart(clean(m * g), { suffix: 'N' })],
      hints: ['Find the rover’s mass from its weight on Earth.', 'The mass is the same everywhere. Use it with the new value of g.'],
      solution: [`Mass $= \\dfrac{${W}}{9.8} = ${m}$ kg, the same on ${world}.`, `Weight on ${world} $= ${m} \\times ${g} = ${clean(m * g)}$ N`],
    };
  }
  return {
    prompt: `On a newly explored world, a ${q(m, 'kg')} instrument has a weight of ${q(clean(m * g), 'N')}. What is the value of $g$ there, in N/kg?`,
    parts: [numPart(g, { suffix: 'N/kg' })],
    hints: ['g = weight ÷ mass'],
    solution: [`$g = \\dfrac{W}{m} = \\dfrac{${clean(m * g)}}{${m}} = ${g}$ N/kg`],
  };
}

const MW_EASY: Q[] = [
  { q: 'What is mass?', a: 'The amount of matter in an object', w: ['The pull of gravity on an object', 'The space an object takes up', 'How fast an object falls'], why: 'Mass is the amount of matter, measured in kilograms. It does not depend on where the object is.' },
  { q: 'What is weight?', a: 'The force of gravity on an object', w: ['The amount of matter in an object', 'The size of an object', 'The speed of a falling object'], why: 'Weight is a force, the pull of gravity on a mass, measured in newtons.' },
  { q: 'What is the unit of weight?', a: 'The newton (N)', w: ['The kilogram (kg)', 'The newton per kilogram (N/kg)', 'The metre (m)'], why: 'Weight is a force, so it is measured in newtons. The kilogram is the unit of mass.' },
  { q: 'An astronaut travels from the Earth to the Moon. What happens to the astronaut’s mass?', a: 'It stays the same', w: ['It becomes smaller', 'It becomes larger', 'It becomes zero'], why: 'The astronaut is made of the same amount of matter everywhere.' },
];

const MW_MEDIUM: Q[] = [
  { q: 'An astronaut travels from the Earth to the Moon, where gravity is weaker. What happens to the astronaut’s weight?', a: 'It becomes smaller', w: ['It stays the same', 'It becomes larger', 'It becomes exactly zero'], why: 'Weight = mass × g. The mass is unchanged, but g is smaller on the Moon, so the weight is smaller.' },
  { q: 'Which is a vector?', a: 'Weight', w: ['Mass', 'Both mass and weight', 'Neither mass nor weight'], why: 'Weight is a force, and it points towards the centre of the planet. Mass has a size only.' },
  { q: 'In everyday speech someone says "I weigh 60 kg". What does 60 kg really measure?', a: 'Their mass', w: ['Their weight', 'The force of gravity on them', 'Their volume'], why: 'Kilograms measure mass. Their weight on Earth is about 588 N.' },
  { q: 'Far out in space, away from every star and planet, what are an object’s mass and weight?', a: 'Its mass is unchanged and its weight is almost zero', w: ['Both are zero', 'Its mass is zero and its weight is unchanged', 'Both are unchanged'], why: 'The matter is still there, but there is almost no gravity to pull on it.' },
];

function massAndWeightAway(rng: Rng): GenOutput {
  const [world, g] = rng.pick(WORLDS);
  const m = rng.pick([50, 60, 70, 80, 90]);
  return {
    prompt: `An astronaut has a mass of ${q(m, 'kg')} on Earth. On ${world}, $g = ${g}$ N/kg. Find the astronaut’s mass and weight on ${world}.`,
    parts: [numPart(m, { label: 'Mass', suffix: 'kg' }), numPart(clean(m * g), { label: 'Weight', suffix: 'N' })],
    hints: ['Mass does not change from place to place.', 'weight = mass × g'],
    solution: [`The mass is still ${m} kg.`, `Weight $= ${m} \\times ${g} = ${clean(m * g)}$ N`],
  };
}

// ---------------------------------------------------------------------------- 2.5 friction and air resistance

const FRICTION_EASY: Q[] = [
  { q: 'In which direction does friction act on a sliding object?', a: 'Against the direction of sliding', w: ['In the direction of sliding', 'Straight down', 'Straight up'], why: 'Friction always acts to oppose the sliding of one surface over another.' },
  { q: 'Which pair of surfaces gives the most friction?', a: 'A rubber sole on dry concrete', w: ['A skate blade on ice', 'A wet bar of soap on a tile', 'An oiled metal part on another'], why: 'Rough, dry, grippy surfaces give large friction. Ice, water and oil reduce it.' },
  { q: 'Which is a useful effect of friction?', a: 'Tyres gripping the road', w: ['Engine parts wearing out', 'A bicycle chain getting hot', 'A drawer that sticks'], why: 'Without friction, tyres and shoes could not push against the ground.' },
  { q: 'How does oil reduce the friction between moving machine parts?', a: 'It keeps the rough surfaces apart', w: ['It makes the parts heavier', 'It glues the parts together', 'It removes gravity'], why: 'A lubricant forms a thin layer between the surfaces so that they slide past more easily.' },
  { q: 'What does friction do to the energy of a sliding object?', a: 'It turns some of it into heat', w: ['It stores it in the object as mass', 'It destroys it', 'It turns it into weight'], why: 'Rub your hands together: friction warms the surfaces.' },
];

const FRICTION_MEDIUM: Q[] = [
  { q: 'You push a heavy wardrobe with 80 N and it does not move. What is the size of the friction force on it?', a: '80 N', w: ['0 N', 'More than 80 N', 'Less than 80 N'], why: 'The wardrobe stays at rest, so the forces are balanced: friction matches the push exactly, up to its greatest value.' },
  { q: 'A box is pushed across a floor at a steady velocity with a force of 30 N. What is the size of the friction force?', a: '30 N', w: ['0 N', 'More than 30 N', 'Less than 30 N'], why: 'A steady velocity means the forces are balanced, so friction equals the push.' },
  { q: 'Why do cars take longer to stop on a wet road?', a: 'Water lowers the friction between the tyres and the road', w: ['Water makes the car heavier', 'Water raises the friction between the tyres and the road', 'Wet brakes push the car forwards'], why: 'A layer of water keeps the tyre and the road apart, so the grip, and with it the braking force, is smaller.' },
  { q: 'A cyclist stops pedalling on a level road and slowly comes to rest. Why?', a: 'Friction and air resistance act against the motion', w: ['Moving objects always stop by themselves', 'The force from pedalling runs out', 'Gravity pulls the bicycle backwards'], why: 'By the first law the cyclist would keep going for ever with no net force. Friction and air resistance are the unbalanced forces that slow the bicycle.' },
  { q: 'Which change would reduce the friction on a sliding box?', a: 'Putting rollers under it', w: ['Loading more mass into it', 'Sliding it over a rougher floor', 'Pressing down on it'], why: 'Rolling replaces sliding, so the surfaces no longer rub. A heavier load or a rougher floor gives more friction.' },
];

function frictionDirection(rng: Rng): GenOutput {
  const [pos, neg] = rng.pick(SIDES.filter((s) => s[0] !== 'up'));
  const back = rng.chance(0.5);
  const moving = back ? neg : pos;
  const against = back ? pos : neg;
  const what = rng.pick(['A crate', 'A hockey puck', 'A book', 'A sledge']);
  return {
    prompt: `${what} slides ${['right', 'left'].includes(moving) ? `to the ${moving}` : moving} across a level surface. In which direction does friction act on it?`,
    parts: [part(fixedChoice([pos, neg], against === pos ? 0 : 1))],
    hints: ['Friction acts against the sliding.'],
    solution: [`It slides ${moving}, so friction acts the opposite way: ${against}.`, `Answer: ${against}`],
  };
}

function stopByFriction(rng: Rng): GenOutput {
  const m = rng.pick([2, 4, 5, 10]);
  const dec = rng.pick([1, 2, 2.5, 4]);
  const f = clean(m * dec);
  const t = rng.pick([2, 3, 4]);
  const v = clean(dec * t);
  return {
    prompt: `A ${q(m, 'kg')} box slides across a floor at ${q(v, 'm/s')}. The only force along the floor is friction of ${q(f, 'N')}. Find the size of its deceleration and the time it takes to stop.`,
    parts: [numPart(dec, { label: 'Deceleration', suffix: ACC }), numPart(t, { label: 'Time to stop', suffix: 's' })],
    hints: ['deceleration = friction ÷ mass', 'time = change in velocity ÷ deceleration'],
    solution: [`Deceleration $= \\dfrac{${f}}{${m}} = ${dec}\\ \\text{m/s}^2$.`, `Time $= \\dfrac{${v}}{${dec}} = ${t}$ s`],
  };
}

const DRAG_EASY: Q[] = [
  { q: 'What happens to the air resistance on an object as it moves faster?', a: 'It increases', w: ['It decreases', 'It stays the same', 'It disappears'], why: 'The faster an object moves, the harder the air pushes back.' },
  { q: 'Why does a parachute slow a falling person?', a: 'Its large area gives a large air resistance', w: ['It reduces the person’s weight', 'It reduces gravity', 'It reduces the person’s mass'], why: 'A larger area meets more air, so the upward force of air resistance is much larger.' },
  { q: 'What is terminal velocity?', a: 'The steady velocity reached when air resistance equals weight', w: ['The velocity just before hitting the ground', 'The greatest velocity of any object', 'The velocity at the moment of release'], why: 'When the upward air resistance has grown to equal the weight, the net force is zero and the velocity stops changing.' },
  { q: 'A feather and a hammer are dropped together on the Moon, where there is no air. What happens?', a: 'They land at the same time', w: ['The hammer lands first', 'The feather lands first', 'Neither of them falls'], why: 'With no air resistance, every object falls with the same acceleration.' },
];

const DRAG_MEDIUM: Q[] = [
  { q: 'A skydiver has just jumped and is moving slowly. Compare the forces on the skydiver.', a: 'Weight is much larger than air resistance, so the skydiver speeds up quickly', w: ['Air resistance is larger than weight', 'The forces are balanced', 'There is no weight until the skydiver speeds up'], why: 'At low speed the air resistance is small, so the net force downwards is large.' },
  { q: 'As a skydiver speeds up, what happens to the net force and the acceleration?', a: 'Both get smaller', w: ['Both get larger', 'Both stay the same', 'The net force grows and the acceleration shrinks'], why: 'Air resistance grows with speed and cancels more of the weight, so the net force and the acceleration shrink.' },
  { q: 'A skydiver falling at terminal velocity opens a parachute. What happens at that moment?', a: 'Air resistance becomes larger than weight, so the skydiver slows down', w: ['Weight becomes larger, so the skydiver speeds up', 'The skydiver moves upwards', 'The forces stay balanced'], why: 'The parachute’s large area makes the air resistance jump above the weight. The net force is upwards, so the skydiver slows to a new, lower terminal velocity.' },
  { q: 'At terminal velocity, what is a falling object’s acceleration?', a: 'Zero', w: ['9.8 m/s²', 'Larger than 9.8 m/s²', 'It keeps changing'], why: 'The forces are balanced, so the velocity is steady.' },
];

function terminalDrag(rng: Rng): GenOutput {
  const m = rng.pick([50, 60, 70, 80, 90]);
  return {
    prompt: `${G_NOTE} A skydiver of mass ${q(m, 'kg')} is falling at terminal velocity. What is the size of the air resistance on the skydiver?`,
    parts: [numPart(clean(m * G), { suffix: 'N' })],
    hints: ['At terminal velocity the forces are balanced.', 'So the air resistance equals the weight, mass × g.'],
    solution: [`Weight $= ${m} \\times 9.8 = ${clean(m * G)}$ N.`, `At terminal velocity the air resistance equals the weight: ${clean(m * G)} N.`],
  };
}

function fallingNet(rng: Rng): GenOutput {
  const m = rng.pick([50, 60, 70, 80]);
  const W = clean(m * G);
  const a = rng.pick([2, 4, 5, 7]);
  const drag = clean(W - m * a);
  return {
    prompt: `${G_NOTE} A skydiver of mass ${q(m, 'kg')} is falling, and at one moment the air resistance is ${q(drag, 'N')}. Find the net force on the skydiver and the acceleration at that moment.`,
    parts: [numPart(clean(m * a), { label: 'Net force (downwards)', suffix: 'N' }), numPart(a, { label: 'Acceleration', suffix: ACC })],
    hints: ['Find the weight first: mass × g.', 'net force = weight − air resistance, then a = F ÷ m'],
    solution: [`Weight $= ${m} \\times 9.8 = ${W}$ N.`, `Net force $= ${W} - ${drag} = ${clean(m * a)}$ N downwards.`, `$a = \\dfrac{${clean(m * a)}}{${m}} = ${a}\\ \\text{m/s}^2$`],
  };
}

// ---------------------------------------------------------------------------- 2.6 Newton's third law

function pushBack(rng: Rng): GenOutput {
  const [pos, neg] = rng.pick(SIDES.slice(0, 2));
  const f = rng.int(4, 60) * 5;
  const [a, b] = rng.sample(NAMES, 2);
  return {
    prompt: `${a} pushes ${b} with a force of ${q(f, 'N')} to the ${pos}. What force does ${b} exert on ${a}?`,
    parts: [numPart(f, { label: 'Size', suffix: 'N' }), part(fixedChoice([pos, neg], 1), { label: 'Direction' })],
    hints: ['Newton’s third law: the two forces are equal in size and opposite in direction.'],
    solution: [`${b} pushes back on ${a} with the same size of force, ${f} N, in the opposite direction: ${neg}.`],
  };
}

const THIRD_EASY: Q[] = [
  { q: 'What does Newton’s third law say?', a: 'When A pushes on B, B pushes on A with an equal and opposite force', w: ['Every moving object has a force on it', 'Force equals mass times acceleration', 'An object at rest stays at rest'], why: 'Forces always come in pairs between two objects: equal in size, opposite in direction.' },
  { q: 'You push on a wall with a force of 50 N. With what force does the wall push on you?', a: '50 N, in the opposite direction', w: ['50 N, in the same direction', '0 N, because the wall does not move', 'More than 50 N, because the wall is bigger'], why: 'The wall pushes back with an equal force in the opposite direction.' },
  { q: 'A swimmer pushes water backwards with their hands. What pushes the swimmer forwards?', a: 'The water pushing forwards on the swimmer', w: ['The swimmer’s own push on the water', 'Gravity', 'The air above the pool'], why: 'The swimmer pushes the water back, and the water pushes the swimmer forwards with an equal force.' },
];

const THIRD_MEDIUM: Q[] = [
  { q: 'The Earth pulls a falling apple downwards. What is the other force of this third-law pair?', a: 'The apple pulls the Earth upwards', w: ['Air resistance on the apple', 'The normal force on the apple', 'The apple’s weight'], why: 'The pair is between the same two objects with the roles swapped: Earth on apple, apple on Earth.' },
  { q: 'A rocket engine pushes hot gas downwards. What is the other force of this third-law pair?', a: 'The gas pushes the rocket upwards', w: ['The rocket’s weight', 'Air resistance on the rocket', 'The ground pushes the rocket upwards'], why: 'Rocket on gas (down), gas on rocket (up). This is how a rocket works, even in empty space.' },
  { q: 'A book rests on a table. The book’s weight is the Earth pulling the book down. What is the third-law partner of the weight?', a: 'The book pulling the Earth upwards', w: ['The normal force of the table on the book', 'The book pushing down on the table', 'Friction between the book and the table'], why: 'The partner involves the same two objects, the Earth and the book. The normal force is a different force that happens to balance the weight here.' },
  { q: 'A person walks forwards. Which force pushes the person forwards?', a: 'The ground pushing forwards on the person’s foot', w: ['The foot pushing backwards on the ground', 'The person’s weight', 'The air'], why: 'The foot pushes back on the ground, and the ground’s friction pushes forwards on the foot.' },
  { q: 'A small car and a large truck collide. Compare the force on the car with the force on the truck.', a: 'They are equal in size', w: ['The force on the car is larger', 'The force on the truck is larger', 'There is a force on the car only'], why: 'By the third law the two forces are equal. The car is affected more because it has less mass, so the same force gives it a larger acceleration.' },
];

const THIRD_HARD: Select[] = [
  { q: 'A hammer hits a nail with a force of 300 N. Which statements are true?', opts: [['The nail pushes on the hammer with 300 N.', true], ['The force on the hammer points the opposite way to the force on the nail.', true], ['The two forces act on different objects.', true], ['The nail pushes back with less than 300 N because it is smaller.', false], ['The two forces cancel, so the nail cannot move.', false], ['Only the nail has a force on it.', false]], why: 'Hammer on nail and nail on hammer are a third-law pair: 300 N each, in opposite directions, on different objects. The nail moves because of the forces on the nail alone.' },
  { q: 'Which statements about a third-law pair of forces are true?', opts: [['They are equal in size.', true], ['They act in opposite directions.', true], ['They act on two different objects.', true], ['They are the same kind of force.', true], ['They act on the same object.', false], ['They cancel each other out, so nothing can move.', false], ['The heavier object exerts the larger force.', false]], why: 'The two forces act on different objects, so they cannot cancel. Each one helps decide the motion of its own object.' },
];

/** The partner force in everyday pushes: [the push, the force asked for, its direction, the wrong direction]. */
const PAIRS: Array<[string, string, string, string]> = [
  ['A rocket engine pushes exhaust gas downwards', 'the gas exert on the rocket', 'upwards', 'downwards'],
  ['A swimmer pushes the water backwards', 'the water exert on the swimmer', 'forwards', 'backwards'],
  ['A sprinter’s foot pushes backwards on the starting block', 'the block exert on the foot', 'forwards', 'backwards'],
  ['A cannon pushes a cannonball forwards', 'the cannonball exert on the cannon', 'backwards', 'forwards'],
  ['A person steps off a small boat, pushing the boat backwards', 'the boat exert on the person', 'forwards', 'backwards'],
];

function partnerForce(rng: Rng): GenOutput {
  const [action, back, dir, wrong] = rng.pick(PAIRS);
  const f = rng.int(10, 60) * 10;
  const choices = rng.shuffle([dir, wrong]);
  return {
    prompt: `${action} with a force of ${q(f, 'N')}. What force does ${back}?`,
    parts: [numPart(f, { label: 'Size', suffix: 'N' }), part(fixedChoice(choices, choices.indexOf(dir)), { label: 'Direction' })],
    hints: ['Newton’s third law: the two forces are equal in size and opposite in direction.'],
    solution: [`The partner force has the same size, ${f} N, and the opposite direction: ${dir}.`],
  };
}

function pushApart(rng: Rng): GenOutput {
  for (;;) {
    const m1 = rng.pick([40, 50, 60, 80]);
    const m2 = rng.pick([40, 50, 60, 80, 100]);
    if (m1 === m2) continue;
    const F = rng.pick([120, 200, 240, 400]);
    const a1 = clean(F / m1);
    const a2 = clean(F / m2);
    if (num(a1) !== String(a1) || num(a2) !== String(a2) || Math.max(a1, a2) > 5) continue;
    const [a, b] = rng.sample(NAMES, 2);
    return {
      prompt: `Two skaters stand at rest on smooth ice. ${a} (mass ${q(m1, 'kg')}) pushes ${b} (mass ${q(m2, 'kg')}) with a force of ${q(F, 'N')}. Find the size of each skater’s acceleration while they push.`,
      parts: [numPart(a1, { label: a, suffix: ACC }), numPart(a2, { label: b, suffix: ACC })],
      hints: ['By the third law, each skater feels a force of the same size.', 'acceleration = force ÷ mass, for each skater'],
      solution: [`Each skater has a force of ${F} N on them, in opposite directions.`, `${a}: $\\dfrac{${F}}{${m1}} = ${a1}\\ \\text{m/s}^2$. ${b}: $\\dfrac{${F}}{${m2}} = ${a2}\\ \\text{m/s}^2$. The lighter skater accelerates more.`],
    };
  }
}

function recoil(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const m = rng.pick([200, 500, 1000, 2000]);
    const a = rng.pick([2, 3, 5, 8]);
    return {
      prompt: `In deep space, a probe of mass ${q(m, 'kg')} fires its engine, which pushes gas backwards with a force of ${q(m * a, 'N')}. What is the probe’s acceleration?`,
      parts: [numPart(a, { suffix: ACC })],
      hints: ['By the third law, the gas pushes the probe forwards with the same size of force.', 'acceleration = force ÷ mass'],
      solution: [`The gas pushes forwards on the probe with ${m * a} N.`, `$a = \\dfrac{${m * a}}{${m}} = ${a}\\ \\text{m/s}^2$`],
    };
  }
  const mCar = rng.pick([800, 1000, 1200]);
  const k = rng.pick([5, 8, 10]);
  const aCar = rng.pick([20, 30, 40]);
  const F = mCar * aCar;
  return {
    prompt: `A car of mass ${q(mCar, 'kg')} collides with a truck of mass ${q(mCar * k, 'kg')}. During the collision the force on the car is ${q(F, 'N')}. Find the size of the force on the truck and the size of the truck’s acceleration.`,
    parts: [numPart(F, { label: 'Force on the truck', suffix: 'N' }), numPart(clean(aCar / k), { label: 'Acceleration of the truck', suffix: ACC })],
    hints: ['By the third law, the forces on the car and on the truck are equal in size.', 'acceleration = force ÷ mass'],
    solution: [`The force on the truck is also ${F} N, in the opposite direction.`, `$a = \\dfrac{${F}}{${mCar * k}} = ${clean(aCar / k)}\\ \\text{m/s}^2$, while the car’s is ${aCar} m/s².`],
  };
}

export const FORCE_SKILLS: SkillDef[] = [
  skill({ id: 'p10-force-types', name: 'Kinds of force', description: 'Name the forces acting on an object, and tell contact forces from non-contact forces.', outcomes: ['10-B1'], lessonId: L(1), format: 'mc', gen: bank([FORCE_EASY, FORCE_MEDIUM, FORCE_HARD], ['Ask what is touching the object, and what pulls on it from a distance.']) }),
  skill({ id: 'p10-net-force', name: 'Net force', description: 'Find the net force of forces acting along a line, and decide whether forces are balanced.', outcomes: ['10-B1'], lessonId: L(1), gen: bank([netTwo, either(netThree, balancedOrNot), either(netThree, missingForce)], ['Forces in the same direction add; forces in opposite directions subtract.']) }),
  skill({ id: 'p10-first-law', name: 'Newton’s first law', description: 'Use Newton’s first law: with balanced forces an object stays at rest or keeps a steady velocity.', outcomes: ['10-B1'], lessonId: L(2), gen: bank([FIRST_EASY, either(steadyForce, fromBank(FIRST_MEDIUM, ['A steady velocity means balanced forces.'])), either(steadyForce, fromBank(FIRST_HARD, ['Balanced forces mean no change in velocity.']))], ['No net force means no change in velocity.']) }),
  skill({ id: 'p10-inertia', name: 'Inertia', description: 'Explain everyday effects with inertia, and relate inertia to mass.', outcomes: ['10-B1'], lessonId: L(2), format: 'mc', gen: bank([either(mostInertia, fromBank(INERTIA_EASY, ['Inertia depends on mass.'])), INERTIA_MEDIUM, either(fromBank(INERTIA_HARD, ['Inertia is a property of mass, not a force.']), fromBank(INERTIA_MEDIUM, ['Objects keep their velocity until a net force changes it.']))], ['An object keeps its velocity until a net force changes it.']) }),
  skill({ id: 'p10-second-law', name: 'Newton’s second law', description: 'Use F = ma to find a net force, a mass or an acceleration.', outcomes: ['10-B1'], lessonId: L(3), calculator: true, gen: bank([(rng) => secondLaw(rng, 'a'), (rng) => secondLaw(rng, rng.pick(['F', 'm'] as const)), secondLawSteps], ['net force = mass × acceleration']) }),
  skill({ id: 'p10-second-law-net', name: 'Net force and acceleration', description: 'Find the net force of a push and friction, and use it with F = ma.', outcomes: ['10-B1'], lessonId: L(3), calculator: true, gen: bank([(rng) => withFriction(rng, 'a'), (rng) => withFriction(rng, 'friction'), (rng) => withFriction(rng, rng.pick(['push', 'slowing'] as const))], ['Use the net force, not the push alone, in F = ma.']) }),
  skill({ id: 'p10-weight', name: 'Weight', description: 'Use weight = mass × g on Earth and on other worlds.', outcomes: ['10-B2'], lessonId: L(4), calculator: true, gen: bank([weightOnEarth, weightElsewhere, weightTwoSteps], ['weight = mass × g']) }),
  skill({ id: 'p10-mass-weight', name: 'Mass and weight', description: 'Tell mass from weight, and say how each changes from place to place.', outcomes: ['10-B2'], lessonId: L(4), gen: bank([MW_EASY, MW_MEDIUM, massAndWeightAway], ['Mass is the amount of matter (kg). Weight is the pull of gravity on it (N).']) }),
  skill({ id: 'p10-friction', name: 'Friction', description: 'Describe friction, give its direction, and find how it slows a sliding object.', outcomes: ['10-B2'], lessonId: L(5), gen: bank([FRICTION_EASY, either(frictionDirection, fromBank(FRICTION_MEDIUM, ['Friction acts against sliding. With balanced forces, it equals the push.'])), stopByFriction], ['Friction acts against the sliding of one surface over another.']) }),
  skill({ id: 'p10-terminal-velocity', name: 'Air resistance and terminal velocity', description: 'Explain how air resistance grows with speed, and find the forces on a falling object.', outcomes: ['10-B2'], lessonId: L(5), gen: bank([DRAG_EASY, either(terminalDrag, fromBank(DRAG_MEDIUM, ['Air resistance grows with speed.'])), fallingNet], ['Air resistance grows with speed until it equals the weight.']) }),
  skill({ id: 'p10-third-law', name: 'Newton’s third law', description: 'State Newton’s third law and identify the two forces of a third-law pair.', outcomes: ['10-B1'], lessonId: L(6), gen: bank([either(pushBack, fromBank(THIRD_EASY, ['The forces of a pair are equal and opposite.'])), THIRD_MEDIUM, THIRD_HARD], ['The pair is between the same two objects with the roles swapped: A on B, and B on A.']) }),
  skill({ id: 'p10-third-law-apply', name: 'Using the third law', description: 'Use equal and opposite forces to find the accelerations of two objects that push on each other.', outcomes: ['10-B1'], lessonId: L(6), calculator: true, gen: bank([partnerForce, pushApart, recoil], ['Each object feels the same size of force; the acceleration of each is force ÷ mass.']) }),
];
