/**
 * Grade 11 Physics, Unit 4, lessons 4.4 to 4.7: mechanical waves (20-D2). Wave properties and the
 * universal wave equation, reflection and echoes, superposition and interference, standing waves
 * and resonance, and the Doppler effect. Every number a question needs is in the question,
 * including the speed of sound, which is stated each time and never quoted as an official figure.
 */
import { fixedChoice, numPart, part, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, SkillDef } from '../../../types.ts';
import { clean, rounded } from './common.ts';

const L = (n: number) => `p20-4-${n}`;
const PI = Math.PI;
const soundNote = (v: number) => `The speed of sound in the air is ${q(v, 'm/s')}.`;
const pickSound = (rng: Rng) => rng.pick([330, 336, 340, 343, 346, 350]);

// ---------------------------------------------------------------------------- 4.4 wave properties

const WAVE_IDEAS: Q[] = [
  { q: 'What does a wave carry from one place to another?', a: 'Energy, but not matter', w: ['Matter, but not energy', 'Both matter and energy', 'Neither matter nor energy'], why: 'The particles of the medium only vibrate about their own positions. The disturbance, and the energy with it, moves on.' },
  { q: 'In which kind of wave do the particles of the medium vibrate at right angles to the direction in which the wave travels?', a: 'A transverse wave', w: ['A longitudinal wave', 'A sound wave', 'Every wave'], why: 'In a transverse wave, such as a wave on a rope, the vibration is across the direction of travel.' },
  { q: 'Which of these is a longitudinal wave?', a: 'A sound wave in air', w: ['A wave on a guitar string', 'A ripple on a pond', 'A wave sent along a rope by shaking it up and down'], why: 'In sound, the air vibrates back and forth along the direction in which the wave travels, in compressions and rarefactions.' },
  { q: 'What is the wavelength of a wave?', a: 'The distance from one crest to the next', w: ['The height of a crest above the rest position', 'The distance from a crest to the next trough', 'The time for one wave to pass'], why: 'The wavelength is the length of one complete wave: crest to crest, or trough to trough.' },
  { q: 'A wave on a rope is made larger in amplitude without changing how often the hand shakes. Which of these changes?', a: 'The energy the wave carries', w: ['Its frequency', 'Its wavelength', 'Its speed'], why: 'A larger amplitude means a more energetic wave. The frequency is set by the hand and the speed by the rope.' },
];

/** A sine curve of the given amplitude that repeats every `period` along the x-axis. */
function sine(amp: number, period: number, cycles: number): Array<[number, number]> {
  const steps = Math.round(cycles * 24);
  const points: Array<[number, number]> = [];
  for (let i = 0; i <= steps; i++) {
    const x = (period * cycles * i) / steps;
    points.push([clean(x), Math.round(amp * Math.sin((2 * PI * x) / period) * 100) / 100]);
  }
  return points;
}

function readSnapshot(rng: Rng): GenOutput {
  const A = rng.pick([2, 3, 4, 5, 6]);
  const lambda = rng.pick([0.4, 0.8, 2, 4, 8]);
  const cycles = rng.pick([2, 2.5, 3]);
  const figure: Figure = {
    type: 'plane',
    grid: { xMin: 0, xMax: clean(lambda * cycles), yMin: -(A + 1), yMax: A + 1, xStep: clean(lambda / 4), yStep: 1, xLabel: 'Position (m)', yLabel: 'Displacement (cm)' },
    polylines: [{ points: sine(A, lambda, cycles) }],
    caption: 'A wave on a rope at one instant',
  };
  return {
    figure,
    prompt: 'The graph is a snapshot of a wave on a rope at one instant. Read the amplitude and the wavelength from the graph.',
    parts: [numPart(A, { suffix: 'cm', label: 'Amplitude' }), numPart(lambda, { suffix: 'm', label: 'Wavelength' })],
    hints: ['The amplitude is the height of a crest above the rest position.', 'The wavelength is the distance from one crest to the next.'],
    solution: [`The crests are ${A} cm above the rest position, so the amplitude is ${A} cm.`, `One complete wave is ${lambda} m long, so the wavelength is ${lambda} m`],
  };
}

function wavesPassing(rng: Rng): GenOutput {
  const T = rng.pick([0.4, 0.5, 0.8, 1.25, 2, 2.5, 4]);
  const n = rng.pick([5, 10, 20, 40]);
  const t = clean(T * n);
  const where = rng.pick(['the end of a pier', 'a post in a lake', 'an anchored boat']);
  return {
    prompt: `${n} complete waves pass ${where} in ${q(t, 's')}. Find the frequency and the period of the waves.`,
    parts: [numPart(clean(1 / T), { suffix: 'Hz', label: 'Frequency' }), numPart(T, { suffix: 's', label: 'Period' })],
    hints: ['The frequency is the number of waves that pass each second.', 'The period is the time for one wave to pass: $T = \\dfrac{1}{f}$.'],
    solution: [`$f = \\dfrac{${n}}{${t}} = ${clean(1 / T)}$ Hz`, `$T = \\dfrac{${t}}{${n}} = ${T}$ s`],
  };
}

function readHistory(rng: Rng): GenOutput {
  const A = rng.pick([2, 3, 4, 5]);
  const T = rng.pick([0.2, 0.4, 0.8, 2]);
  const cycles = rng.pick([2, 2.5, 3]);
  const figure: Figure = {
    type: 'plane',
    grid: { xMin: 0, xMax: clean(T * cycles), yMin: -(A + 1), yMax: A + 1, xStep: clean(T / 4), yStep: 1, xLabel: 'Time (s)', yLabel: 'Displacement (cm)' },
    polylines: [{ points: sine(A, T, cycles) }],
    caption: 'The displacement of one point of a rope as a wave passes',
  };
  return {
    figure,
    prompt: 'The graph shows how the displacement of one point of a rope changes with time as a wave passes. Find the period and the frequency of the wave.',
    parts: [numPart(T, { suffix: 's', label: 'Period' }), numPart(clean(1 / T), { suffix: 'Hz', label: 'Frequency' })],
    hints: ['The horizontal axis is time, so the length of one complete cycle on this graph is the period, not the wavelength.', '$f = \\dfrac{1}{T}$'],
    solution: [`One complete cycle takes ${T} s, so $T = ${T}$ s.`, `$f = \\dfrac{1}{T} = \\dfrac{1}{${T}} = ${clean(1 / T)}$ Hz`],
  };
}

// ---------------------------------------------------------------------------- 4.4 the universal wave equation

function waveSpeed(rng: Rng): GenOutput {
  const f = rng.pick([2, 4, 5, 8, 20, 50, 250]);
  const lambda = rng.pick([0.2, 0.4, 0.5, 1.2, 1.5, 3]);
  const v = clean(f * lambda);
  return {
    prompt: `A wave has a frequency of ${q(f, 'Hz')} and a wavelength of ${q(lambda, 'm')}. What is its speed?`,
    parts: [numPart(v, { suffix: 'm/s' })],
    hints: ['The universal wave equation: $v = f\\lambda$'],
    solution: [`$v = f\\lambda = ${f} \\times ${lambda} = ${v}$ m/s`],
  };
}

function wavelengthOfSound(rng: Rng): GenOutput {
  const v = pickSound(rng);
  const f = rng.pick([110, 220, 256, 440, 512, 880, 1000, 2000]);
  const lambda = v / f;
  return {
    prompt: `${soundNote(v)} What is the wavelength of a sound of frequency ${q(f, 'Hz')}? Give your answer to 3 decimal places.`,
    parts: [rounded(lambda, 3, 'm')],
    hints: ['Rearrange $v = f\\lambda$ to get $\\lambda = \\dfrac{v}{f}$.'],
    solution: [`$\\lambda = \\dfrac{v}{f} = \\dfrac{${v}}{${f}} = ${num(lambda, 3)}$ m`],
  };
}

function frequencyFromSpeed(rng: Rng): GenOutput {
  const v = rng.pick([0.6, 0.9, 1.2, 1.5, 2, 3]);
  const lambda = rng.pick([0.4, 0.75, 1.5, 2, 2.5, 4]);
  const f = v / lambda;
  return {
    prompt: `Water waves travel across a lake at ${q(v, 'm/s')}, with their crests ${q(lambda, 'm')} apart. What is their frequency? Give your answer to 2 decimal places.`,
    parts: [rounded(f, 2, 'Hz')],
    hints: ['The distance between crests is the wavelength.', 'Rearrange $v = f\\lambda$ to get $f = \\dfrac{v}{\\lambda}$.'],
    solution: [`$f = \\dfrac{v}{\\lambda} = \\dfrac{${v}}{${lambda}} = ${num(f, 2)}$ Hz`],
  };
}

function speedFromPassing(rng: Rng): GenOutput {
  const T = rng.pick([0.5, 0.8, 1.25, 2, 2.5, 4]);
  const n = rng.pick([5, 10, 20]);
  const t = clean(T * n);
  const lambda = rng.pick([1.5, 2, 3, 4.5, 6, 8]);
  const f = clean(1 / T);
  const v = clean(f * lambda);
  return {
    prompt: `An angler notices that ${n} complete waves pass the end of a pier in ${q(t, 's')}, and that the crests are ${q(lambda, 'm')} apart. Find the frequency and the speed of the waves.`,
    parts: [numPart(f, { suffix: 'Hz', label: 'Frequency' }), numPart(v, { suffix: 'm/s', label: 'Speed' })],
    hints: ['The frequency is the number of waves that pass each second.', 'The distance between crests is the wavelength, and $v = f\\lambda$.'],
    solution: [`$f = \\dfrac{${n}}{${t}} = ${f}$ Hz`, `$v = f\\lambda = ${f} \\times ${lambda} = ${v}$ m/s`],
  };
}

function newMedium(rng: Rng): GenOutput {
  const f = rng.pick([2, 4, 5, 8, 10]);
  const v1 = rng.pick([6, 8, 10, 12, 20]);
  const v2 = rng.pick([3, 4, 5, 15, 16, 24, 30].filter((v) => v !== v1));
  const l1 = v1 / f;
  const l2 = v2 / f;
  return {
    prompt: `A wave of frequency ${q(f, 'Hz')} travels along a rope at ${q(v1, 'm/s')}. It passes into a ${v2 > v1 ? 'lighter' : 'heavier'} rope, where its speed is ${q(v2, 'm/s')}. Find its wavelength in the first rope and in the second rope, each to 2 decimal places.`,
    parts: [rounded(l1, 2, 'm', 'First rope'), rounded(l2, 2, 'm', 'Second rope')],
    hints: ['$\\lambda = \\dfrac{v}{f}$', 'The frequency does not change when a wave passes into a new medium: each wave that arrives at the join sends one wave on.'],
    solution: [`First rope: $\\lambda = \\dfrac{v}{f} = \\dfrac{${v1}}{${f}} = ${num(l1, 2)}$ m.`, `The frequency is still ${f} Hz in the second rope: $\\lambda = \\dfrac{${v2}}{${f}} = ${num(l2, 2)}$ m`],
  };
}

// ---------------------------------------------------------------------------- 4.5 reflection and echoes

const REFLECT_IDEAS: Q[] = [
  { q: 'A pulse travels along a rope whose far end is tied firmly to a wall. How does the reflected pulse compare with the one that arrived?', a: 'It is inverted: a crest comes back as a trough', w: ['It is the same way up', 'It is twice as large', 'There is no reflected pulse'], why: 'The rope pulls up on the wall, and by Newton’s third law the wall pulls down on the rope, so the pulse is turned over.' },
  { q: 'A pulse travels along a rope whose far end is free to slide up and down a pole. How does the reflected pulse compare with the one that arrived?', a: 'It is the same way up', w: ['It is inverted', 'It is cancelled out', 'It travels faster'], why: 'A free end is flicked up by the pulse and sends it back without turning it over.' },
  { q: 'A pulse reflects from the fixed end of a rope. How does its speed after reflection compare with its speed before?', a: 'It is the same', w: ['It is greater', 'It is smaller', 'It is zero'], why: 'The speed of a wave depends on the medium, and the pulse is still on the same rope.' },
  { q: 'What is an echo?', a: 'A sound that is heard again after it reflects from a surface', w: ['A sound that bends round a corner', 'A sound that is absorbed by a wall', 'Two sounds that cancel each other'], why: 'An echo is a reflected sound, heard a moment after the original because it has travelled to the surface and back.' },
  { q: 'A pulse on a light rope reaches a join with a heavy rope. What happens?', a: 'Part of the pulse is reflected, inverted, and part is transmitted', w: ['All of it is transmitted', 'All of it is reflected the same way up', 'The pulse disappears'], why: 'A heavier rope acts partly like a fixed end: some of the pulse comes back inverted, and the rest carries on more slowly.' },
];

function echoDistance(rng: Rng): GenOutput {
  const v = pickSound(rng);
  const t = rng.pick([0.4, 0.5, 0.8, 1.2, 1.5, 2, 2.5, 3]);
  const d = (v * t) / 2;
  return {
    prompt: `${soundNote(v)} A hiker shouts towards a cliff and hears the echo ${q(t, 's')} later. How far away is the cliff? Give your answer to 1 decimal place.`,
    parts: [rounded(d, 1, 'm')],
    hints: ['In that time the sound travels to the cliff and back.', 'distance to the cliff $= \\dfrac{vt}{2}$'],
    solution: [`The sound travels $vt = ${v} \\times ${t} = ${clean(v * t)}$ m, there and back.`, `Distance to the cliff: $\\dfrac{${clean(v * t)}}{2} = ${num(d, 1)}$ m`],
  };
}

function echoTime(rng: Rng): GenOutput {
  const v = pickSound(rng);
  const d = rng.pick([50, 85, 120, 170, 250, 400, 510]);
  const t = (2 * d) / v;
  return {
    prompt: `${soundNote(v)} A student claps in front of a large wall ${q(d, 'm')} away. How long after the clap does the student hear the echo? Give your answer to 2 decimal places.`,
    parts: [rounded(t, 2, 's')],
    hints: ['The sound travels to the wall and back, twice the distance to the wall.', 'time = distance ÷ speed'],
    solution: [`Distance there and back: $2 \\times ${d} = ${2 * d}$ m.`, `$t = \\dfrac{${2 * d}}{${v}} = ${num(t, 2)}$ s`],
  };
}

function sonarDepth(rng: Rng): GenOutput {
  const v = rng.pick([1450, 1480, 1500, 1520]);
  const ms = rng.pick([40, 60, 80, 120, 200, 250, 400]);
  const d = (v * ms) / 1000 / 2;
  return {
    prompt: `A ship sends a pulse of sound straight down, and the echo from the sea bed returns ${q(ms, 'ms')} later. The speed of sound in the sea water is ${q(v, 'm/s')}. How deep is the sea there? Give your answer to 1 decimal place.`,
    parts: [rounded(d, 1, 'm')],
    hints: ['Change the milliseconds to seconds: 1 ms = 0.001 s.', 'The pulse travels down and back, so the depth is half the distance it travels.'],
    solution: [`$t = ${ms}\\ \\text{ms} = ${ms / 1000}$ s, so the pulse travels $${v} \\times ${ms / 1000} = ${clean((v * ms) / 1000)}$ m.`, `Depth: $\\dfrac{${clean((v * ms) / 1000)}}{2} = ${num(d, 1)}$ m`],
  };
}

// ---------------------------------------------------------------------------- 4.5 superposition and interference

function addPulses(rng: Rng): GenOutput {
  const a = rng.pick([2, 3, 4, 5, 6, 8]);
  const b = rng.pick([1, 2, 3, 4, 5, 7].filter((x) => x !== a));
  const same = rng.chance(0.5);
  const sum = same ? a + b : a - b;
  return {
    prompt: `Two pulses travel towards each other along a rope. One is a crest ${q(a, 'cm')} high, and the other is a ${same ? 'crest' : 'trough'} ${q(b, 'cm')} ${same ? 'high' : 'deep'}. What is the displacement of the rope at the instant the two pulses overlap exactly? Give a negative answer if the rope is below its rest position.`,
    parts: [numPart(sum, { suffix: 'cm' })],
    hints: ['Principle of superposition: where two waves overlap, add their displacements.', 'Count a crest as positive and a trough as negative.'],
    solution: [same ? `Both displacements are upwards: $${a} + ${b} = ${sum}$ cm. This is constructive interference.` : `The trough is a negative displacement: $${a} + (-${b}) = ${sum}$ cm. This is destructive interference.`],
  };
}

const INTERFERENCE_IDEAS: Q[] = [
  { q: 'Two pulses meet on a rope and pass through each other. What are they like afterwards?', a: 'Each carries on unchanged, as if the other had not been there', w: ['Both are destroyed', 'They bounce back the way they came', 'They join into one larger pulse that keeps going'], why: 'Waves add while they overlap and then separate again. This is what makes them different from colliding objects.' },
  { q: 'What is constructive interference?', a: 'Waves that overlap crest to crest, giving a larger displacement', w: ['Waves that overlap crest to trough, giving a smaller displacement', 'Waves that reflect from a fixed end', 'Waves that change speed in a new medium'], why: 'When displacements in the same direction add, the result is larger than either wave.' },
  { q: 'Two identical waves meet exactly crest to trough. What is the result where they overlap?', a: 'They cancel: the displacement is zero', w: ['A wave of twice the amplitude', 'A wave of half the amplitude', 'A wave of twice the frequency'], why: 'Equal and opposite displacements add to zero. This is complete destructive interference.' },
  { q: 'Two speakers give out the same note in step with each other. At some places in the room the sound is very quiet. Why?', a: 'The two waves arrive out of step there and cancel', w: ['The sound is absorbed by the air there', 'The two waves arrive in step there', 'Sound cannot reach those places'], why: 'Where one wave’s compression meets the other’s rarefaction, they interfere destructively.' },
  { q: 'Two sources vibrate in step. At a point where the waves interfere constructively, how do the path lengths from the two sources compare?', a: 'They differ by a whole number of wavelengths', w: ['They differ by half a wavelength', 'They differ by one and a half wavelengths', 'They must be exactly equal'], why: 'A difference of 0, 1, 2 … whole wavelengths brings crest to crest. An equal path is just the case of zero difference.' },
];

function pathDifference(rng: Rng): GenOutput {
  const lambda = rng.pick([0.2, 0.4, 0.5, 0.8, 1.2]);
  const halves = rng.pick([1, 2, 3, 4, 5, 6]);
  const d1 = rng.pick([2, 2.5, 3, 4, 5]);
  const d2 = clean(d1 + (halves * lambda) / 2);
  const constructive = halves % 2 === 0;
  return {
    prompt: `Two speakers vibrate in step and give out sound of wavelength ${q(lambda, 'm')}. A listener is ${q(d1, 'm')} from one speaker and ${q(d2, 'm')} from the other. How many wavelengths is the path difference, and is the sound there loud or quiet?`,
    parts: [numPart(halves / 2, { label: 'Path difference', suffix: 'wavelengths' }), part(fixedChoice(['Loud (constructive interference)', 'Quiet (destructive interference)'], constructive ? 0 : 1), { label: 'Sound' })],
    hints: ['The path difference is the difference between the two distances.', 'Divide it by the wavelength. A whole number means the waves arrive in step. A number ending in a half means they arrive out of step.'],
    solution: [
      `Path difference: $${d2} - ${d1} = ${clean(d2 - d1)}$ m.`,
      `In wavelengths: $\\dfrac{${clean(d2 - d1)}}{${lambda}} = ${halves / 2}$.`,
      constructive ? 'A whole number of wavelengths brings crest to crest, so the interference is constructive and the sound is loud' : 'An odd number of half wavelengths brings crest to trough, so the interference is destructive and the sound is quiet',
    ],
  };
}

// ---------------------------------------------------------------------------- 4.6 standing waves on a string

function nodeSpacing(rng: Rng): GenOutput {
  const lambda = rng.pick([0.4, 0.6, 0.8, 1.2, 1.5, 2.4]);
  return {
    prompt: `A standing wave is set up on a string by waves of wavelength ${q(lambda, 'm')}. How far apart are neighbouring nodes?`,
    parts: [numPart(clean(lambda / 2), { suffix: 'm' })],
    hints: ['Neighbouring nodes are half a wavelength apart.'],
    solution: [`Distance between nodes $= \\dfrac{\\lambda}{2} = \\dfrac{${lambda}}{2} = ${clean(lambda / 2)}$ m`],
  };
}

function fundamentalWavelength(rng: Rng): GenOutput {
  const len = rng.pick([0.33, 0.5, 0.65, 0.8, 1.2, 1.5]);
  return {
    prompt: `A string ${q(len, 'm')} long is fixed at both ends and vibrates in its fundamental mode, with a single loop. What is the wavelength of the standing wave?`,
    parts: [numPart(clean(2 * len), { suffix: 'm' })],
    hints: ['One loop is half a wavelength, and it fills the whole string.'],
    solution: [`$L = \\dfrac{\\lambda}{2}$, so $\\lambda = 2L = 2 \\times ${len} = ${clean(2 * len)}$ m`],
  };
}

function harmonicFrequency(rng: Rng): GenOutput {
  const len = rng.pick([0.5, 0.6, 0.8, 1, 1.2, 1.5]);
  const v = rng.pick([120, 180, 240, 300, 360, 420]);
  const n = rng.pick([1, 2, 3, 4]);
  const f = (n * v) / (2 * len);
  const lambda = clean((2 * len) / n);
  return {
    prompt: `A string ${q(len, 'm')} long is fixed at both ends, and waves travel along it at ${q(v, 'm/s')}. At what frequency does it vibrate with ${n === 1 ? 'one loop' : `${n} loops`}? Give your answer to 1 decimal place.`,
    parts: [rounded(f, 1, 'Hz')],
    hints: ['Each loop is half a wavelength, so ' + '$L = n \\times \\dfrac{\\lambda}{2}$.', 'Find the wavelength, then use $f = \\dfrac{v}{\\lambda}$.'],
    solution: [`${n === 1 ? 'One loop fills' : `${n} loops fill`} the string: $\\lambda = \\dfrac{2L}{n} = \\dfrac{2 \\times ${len}}{${n}} = ${lambda}$ m.`, `$f = \\dfrac{v}{\\lambda} = \\dfrac{${v}}{${lambda}} = ${num(f, 1)}$ Hz`],
  };
}

function speedFromStanding(rng: Rng): GenOutput {
  const len = rng.pick([0.6, 0.9, 1.2, 1.5, 1.8, 2.4]);
  const n = rng.pick([2, 3, 4, 5, 6]);
  const f = rng.pick([20, 30, 40, 50, 60, 120]);
  const lambda = (2 * len) / n;
  const v = f * lambda;
  return {
    prompt: `A vibrator shakes a string at ${q(f, 'Hz')}. The string is ${q(len, 'm')} long and fixed at both ends, and a standing wave with ${n} loops appears. Find the wavelength, to 3 decimal places, and the speed of the waves on the string, to 1 decimal place.`,
    parts: [rounded(lambda, 3, 'm', 'Wavelength'), rounded(v, 1, 'm/s', 'Speed')],
    hints: ['Each loop is half a wavelength long.', '$v = f\\lambda$'],
    solution: [`Each loop is $\\dfrac{${len}}{${n}} = ${num(len / n, 4)}$ m long, which is half a wavelength: $\\lambda = ${num(lambda, 3)}$ m.`, `$v = f\\lambda = ${f} \\times ${num(lambda, 4)} = ${num(v, 1)}$ m/s`],
  };
}

// ---------------------------------------------------------------------------- 4.6 resonance in air columns

const RESONANCE_IDEAS: Q[] = [
  { q: 'What is resonance?', a: 'A large vibration that builds up when an object is driven at its natural frequency', w: ['The reflection of a wave from a fixed end', 'The cancelling of two waves', 'The change in pitch of a moving source'], why: 'Each push arrives in step with the vibration, so the energy adds up and the amplitude grows.' },
  { q: 'A child on a swing is pushed once in every swing, at just the right moment. What happens to the amplitude?', a: 'It grows', w: ['It shrinks', 'It stays the same', 'The swing stops'], why: 'Pushing at the swing’s own natural frequency is resonance: each push adds energy.' },
  { q: 'In a standing wave, what is a node?', a: 'A point that does not move', w: ['A point that moves the most', 'The distance between two crests', 'The end of the wave'], why: 'At a node the two waves always cancel. The points of greatest movement are the antinodes.' },
  { q: 'An air column is closed at one end and open at the other. What is at each end of the standing wave in it?', a: 'A node at the closed end and an antinode at the open end', w: ['An antinode at the closed end and a node at the open end', 'A node at both ends', 'An antinode at both ends'], why: 'The air cannot move at the closed end, and is freest to move at the open end.' },
  { q: 'A singer shatters a wine glass by singing one steady note. Which note must it be?', a: 'One at the natural frequency of the glass', w: ['The highest note the singer can reach', 'The lowest note the singer can reach', 'Any loud note'], why: 'Only at the natural frequency of the glass does each sound wave add to the vibration already there.' },
];

function closedTube(rng: Rng): GenOutput {
  const v = pickSound(rng);
  const f = rng.pick([256, 320, 384, 440, 512, 680]);
  const cm = (v / (4 * f)) * 100;
  return {
    prompt: `${soundNote(v)} A tuning fork of frequency ${q(f, 'Hz')} is held over a tube that is closed at the bottom by water. What is the shortest length of air column that resonates? Give your answer in centimetres, to 1 decimal place.`,
    parts: [rounded(cm, 1, 'cm')],
    hints: ['Find the wavelength: $\\lambda = \\dfrac{v}{f}$.', 'The shortest resonant column, closed at one end, is a quarter of a wavelength long.'],
    solution: [`$\\lambda = \\dfrac{v}{f} = \\dfrac{${v}}{${f}} = ${num(v / f, 4)}$ m`, `$L = \\dfrac{\\lambda}{4} = \\dfrac{${num(v / f, 4)}}{4} = ${num(cm / 100, 4)}$ m $= ${num(cm, 1)}$ cm`],
  };
}

function soundSpeedFromTube(rng: Rng): GenOutput {
  const f = rng.pick([256, 384, 440, 512]);
  const target = pickSound(rng);
  const half = Math.round((target / f / 2) * 1000) / 10; // half a wavelength, in cm to 1 dp
  const l1 = Math.round((half / 2 - rng.pick([0.6, 0.8, 1])) * 10) / 10; // a little short, as in the real experiment
  const l2 = clean(l1 + half);
  const lambda = (2 * half) / 100;
  const v = f * lambda;
  return {
    prompt: `A tuning fork of frequency ${q(f, 'Hz')} is held over a tube whose length can be changed by raising and lowering water in it. The sound is loudest when the air column is ${q(l1, 'cm')} long, and loudest again at ${q(l2, 'cm')}. Find the wavelength of the sound, in metres to 3 decimal places, and the speed of sound in the air, to the nearest metre per second.`,
    parts: [rounded(lambda, 3, 'm', 'Wavelength'), rounded(v, 0, 'm/s', 'Speed')],
    hints: ['Resonant lengths of a column closed at one end are half a wavelength apart.', 'Change the centimetres to metres, then use $v = f\\lambda$.'],
    solution: [`The two lengths differ by half a wavelength: $\\dfrac{\\lambda}{2} = ${l2} - ${l1} = ${half}$ cm, so $\\lambda = ${clean(2 * half)}$ cm $= ${num(lambda, 3)}$ m.`, `$v = f\\lambda = ${f} \\times ${num(lambda, 3)} = ${num(v, 0)}$ m/s`],
  };
}

// ---------------------------------------------------------------------------- 4.7 describing the Doppler effect

const DOPPLER_EASY: Q[] = [
  { q: 'An ambulance with its siren on drives towards you. How does the pitch you hear compare with the pitch the driver hears?', a: 'It is higher', w: ['It is lower', 'It is the same', 'It keeps changing between higher and lower'], why: 'The waves in front of a moving source are squeezed together, so more of them reach you each second.' },
  { q: 'A train sounding its horn moves away from you. How does the frequency you hear compare with the frequency the horn gives out?', a: 'It is lower', w: ['It is higher', 'It is the same', 'It is zero'], why: 'Behind a moving source the waves are stretched out, so fewer reach you each second.' },
  { q: 'What is the Doppler effect?', a: 'The change in the frequency heard when a source and an observer move towards or away from each other', w: ['The reflection of sound from a wall', 'The fading of a sound with distance', 'The bending of sound round a corner'], why: 'Relative motion between the source and the observer changes how often the waves arrive.' },
  { q: 'A racing car passes you at a steady speed. What do you hear as it passes?', a: 'The pitch drops', w: ['The pitch rises', 'The pitch stays the same', 'The sound stops for a moment'], why: 'While the car approaches the pitch is raised, and once it is moving away the pitch is lowered.' },
];
const DOPPLER_MEDIUM: Q[] = [
  { q: 'A siren moves towards a listener through still air. What happens to the wavelength of the sound in front of the siren?', a: 'It is shorter than when the siren is at rest', w: ['It is longer than when the siren is at rest', 'It is the same as when the siren is at rest', 'It becomes zero'], why: 'The source moves a little way after each wave it sends, so each wave starts closer to the one before.' },
  { q: 'A siren moves towards a listener through still air. What happens to the speed of the sound waves in the air?', a: 'It stays the same', w: ['It increases by the speed of the siren', 'It decreases by the speed of the siren', 'It doubles'], why: 'The speed of sound is set by the air, not by the motion of the source. Only the wavelength and the frequency heard change.' },
  { q: 'A car with a horn and a cyclist travel along a road in the same direction at the same speed. What does the cyclist hear?', a: 'The true frequency of the horn', w: ['A higher frequency', 'A lower frequency', 'Nothing'], why: 'There is no Doppler shift when the distance between the source and the observer does not change.' },
  { q: 'A listener runs towards a siren that is at rest. How does the frequency heard compare with the true frequency?', a: 'It is higher', w: ['It is lower', 'It is the same', 'It depends on the loudness'], why: 'A listener who moves towards the source meets the waves more often.' },
];
const DOPPLER_HARD: Q[] = [
  { q: 'A police radar gun sends waves at a moving car and measures the waves that come back. What does it use to find the speed of the car?', a: 'The change in frequency of the reflected waves', w: ['The loudness of the reflected waves', 'The time the car takes to pass', 'The colour of the car'], why: 'Waves reflected from a moving car come back with a shifted frequency, and a larger shift means a faster car.' },
  { q: 'The light from most distant galaxies is shifted to lower frequencies (towards the red). What does this tell astronomers?', a: 'Those galaxies are moving away from us', w: ['Those galaxies are moving towards us', 'Those galaxies are at rest', 'Those galaxies are cooler than ours'], why: 'A source that moves away has its waves stretched to lower frequencies. For light this is called a red shift.' },
  { q: 'An aircraft flies faster than the speed of sound. What do people on the ground hear as it passes over?', a: 'A sonic boom', w: ['A very high steady note', 'A very low steady note', 'Nothing at all, ever'], why: 'The aircraft outruns its own sound waves, which pile up into a shock wave that reaches the ground as a boom.' },
  { q: 'A whistle is whirled in a horizontal circle on a string. What does a listener standing some distance away hear?', a: 'A pitch that rises and falls once in each turn', w: ['A steady pitch higher than the true one', 'A steady pitch lower than the true one', 'The true pitch all the time'], why: 'The whistle moves towards the listener for half of each turn and away for the other half.' },
  { q: 'An ultrasound scanner can measure how fast blood flows in an artery. How?', a: 'Waves reflected from moving blood cells come back with a changed frequency', w: ['The blood absorbs more ultrasound when it moves fast', 'The scanner times how long the blood takes to cross the screen', 'Moving blood gives out its own ultrasound'], why: 'This is the Doppler effect with a moving reflector: the frequency shift gives the speed of the blood.' },
];

// ---------------------------------------------------------------------------- 4.7 Doppler calculations

const VEHICLES = ['An ambulance', 'A police car', 'A fire engine'];

function dopplerOneWay(rng: Rng, towards: boolean): GenOutput {
  const v = pickSound(rng);
  const f = rng.pick([400, 500, 600, 800, 1000, 1200]);
  const vs = rng.pick([10, 15, 20, 25, 30, 40]);
  const heard = (f * v) / (towards ? v - vs : v + vs);
  const who = rng.pick(VEHICLES);
  return {
    prompt: `${soundNote(v)} ${who} sounds a siren of frequency ${q(f, 'Hz')} and moves at ${q(vs, 'm/s')} directly ${towards ? 'towards' : 'away from'} a person standing by the road. What frequency does the person hear? Give your answer to 1 decimal place.`,
    parts: [rounded(heard, 1, 'Hz')],
    hints: [towards ? 'For a source moving towards the observer: $f_{\\text{heard}} = f \\times \\dfrac{v}{v - v_s}$' : 'For a source moving away from the observer: $f_{\\text{heard}} = f \\times \\dfrac{v}{v + v_s}$', towards ? 'The answer must be higher than the true frequency.' : 'The answer must be lower than the true frequency.'],
    solution: [`$f_{\\text{heard}} = f \\times \\dfrac{v}{v ${towards ? '-' : '+'} v_s} = ${f} \\times \\dfrac{${v}}{${v} ${towards ? '-' : '+'} ${vs}} = ${f} \\times \\dfrac{${v}}{${towards ? v - vs : v + vs}} = ${num(heard, 1)}$ Hz`],
  };
}

function dopplerBothWays(rng: Rng): GenOutput {
  const v = pickSound(rng);
  const f = rng.pick([400, 500, 600, 800, 1000]);
  const vs = rng.pick([15, 20, 25, 30, 40]);
  const up = (f * v) / (v - vs);
  const down = (f * v) / (v + vs);
  return {
    prompt: `${soundNote(v)} A train sounds a horn of frequency ${q(f, 'Hz')} as it passes straight through a station at ${q(vs, 'm/s')}. Find the frequency heard by a person on the platform as the train approaches and as it moves away, each to 1 decimal place.`,
    parts: [rounded(up, 1, 'Hz', 'Approaching'), rounded(down, 1, 'Hz', 'Moving away')],
    hints: ['Approaching: $f_{\\text{heard}} = f \\times \\dfrac{v}{v - v_s}$', 'Moving away: $f_{\\text{heard}} = f \\times \\dfrac{v}{v + v_s}$'],
    solution: [`Approaching: $${f} \\times \\dfrac{${v}}{${v} - ${vs}} = ${num(up, 1)}$ Hz.`, `Moving away: $${f} \\times \\dfrac{${v}}{${v} + ${vs}} = ${num(down, 1)}$ Hz. The pitch drops by ${num(up - down, 1)} Hz as the train passes`],
  };
}

function dopplerSourceSpeed(rng: Rng): GenOutput {
  const v = pickSound(rng);
  const f = rng.pick([400, 500, 600, 800]);
  const vs0 = rng.pick([12, 17, 20, 25, 34]);
  const heard = Math.round((f * v) / (v - vs0));
  const vs = v * (1 - f / heard);
  return {
    prompt: `${soundNote(v)} A car sounds a horn of frequency ${q(f, 'Hz')} as it drives directly towards a person, who hears ${q(heard, 'Hz')}. How fast is the car moving? Give your answer to 1 decimal place.`,
    parts: [rounded(vs, 1, 'm/s')],
    hints: ['Start from $f_{\\text{heard}} = f \\times \\dfrac{v}{v - v_s}$ and solve for $v - v_s$.', '$v - v_s = \\dfrac{fv}{f_{\\text{heard}}}$'],
    solution: [`$v - v_s = \\dfrac{fv}{f_{\\text{heard}}} = \\dfrac{${f} \\times ${v}}{${heard}} = ${num((f * v) / heard, 2)}$ m/s`, `$v_s = ${v} - ${num((f * v) / heard, 2)} = ${num(vs, 1)}$ m/s`],
  };
}

export const WAVE_SKILLS: SkillDef[] = [
  skill({ id: 'p20-wave-properties', name: 'Wave properties', description: 'Describe transverse and longitudinal waves, and read the amplitude, wavelength, period and frequency of a wave.', outcomes: ['20-D2'], lessonId: L(4), calculator: true, gen: bank([fromBank(WAVE_IDEAS, ['A wave carries energy through a medium whose particles only vibrate.']), readSnapshot, either(wavesPassing, readHistory)], ['The wavelength is a distance (crest to crest). The period is a time (one complete vibration).']) }),
  skill({ id: 'p20-wave-equation', name: 'The universal wave equation', description: 'Use the universal wave equation to find the speed, frequency or wavelength of a wave.', outcomes: ['20-D2'], lessonId: L(4), calculator: true, gen: bank([waveSpeed, either(wavelengthOfSound, frequencyFromSpeed), either(speedFromPassing, newMedium)], ['$v = f\\lambda$']) }),
  skill({ id: 'p20-reflection', name: 'Reflection and echoes', description: 'Describe how pulses reflect from fixed and free ends, and use echoes to find distances and times.', outcomes: ['20-D2'], lessonId: L(5), calculator: true, gen: bank([fromBank(REFLECT_IDEAS, ['A fixed end inverts a pulse. A free end sends it back the same way up.']), echoDistance, either(echoTime, sonarDepth)], ['An echo travels there and back: distance to the surface $= \\dfrac{vt}{2}$']) }),
  skill({ id: 'p20-superposition', name: 'Superposition and interference', description: 'Add overlapping waves with the principle of superposition, and tell constructive from destructive interference.', outcomes: ['20-D2'], lessonId: L(5), calculator: true, gen: bank([addPulses, fromBank(INTERFERENCE_IDEAS, ['Where waves overlap, their displacements add.']), pathDifference], ['Where waves overlap, add their displacements. Crest on crest is constructive, and crest on trough is destructive.']) }),
  skill({ id: 'p20-standing-string', name: 'Standing waves on a string', description: 'Relate the loops of a standing wave on a string to its wavelength, frequency and wave speed.', outcomes: ['20-D2'], lessonId: L(6), calculator: true, gen: bank([either(nodeSpacing, fundamentalWavelength), harmonicFrequency, speedFromStanding], ['Each loop of a standing wave is half a wavelength long.']) }),
  skill({ id: 'p20-resonance-air', name: 'Resonance in air columns', description: 'Explain resonance, and use the resonant lengths of an air column closed at one end.', outcomes: ['20-D2'], lessonId: L(6), calculator: true, gen: bank([fromBank(RESONANCE_IDEAS, ['Resonance happens when an object is driven at its own natural frequency.']), closedTube, soundSpeedFromTube], ['A column closed at one end resonates at $\\dfrac{\\lambda}{4}$, $\\dfrac{3\\lambda}{4}$, $\\dfrac{5\\lambda}{4}$ …, half a wavelength apart.']) }),
  skill({ id: 'p20-doppler-describe', name: 'Describing the Doppler effect', description: 'Explain how the motion of a source or an observer changes the frequency heard, and name uses of the effect.', outcomes: ['20-D2'], lessonId: L(7), gen: bank([DOPPLER_EASY, DOPPLER_MEDIUM, DOPPLER_HARD], ['Moving closer raises the frequency heard, and moving apart lowers it.']) }),
  skill({ id: 'p20-doppler-calc', name: 'Doppler calculations', description: 'Calculate the frequency heard from a moving source, and the speed of a source from the frequency heard.', outcomes: ['20-D2'], lessonId: L(7), calculator: true, gen: bank([(rng) => dopplerOneWay(rng, true), (rng) => dopplerOneWay(rng, false), either(dopplerBothWays, dopplerSourceSpeed)], ['$f_{\\text{heard}} = f \\times \\dfrac{v}{v \\mp v_s}$: minus when the source approaches, plus when it moves away']) }),
];
