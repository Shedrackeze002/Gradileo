/**
 * Grade 10 Physics, Unit 4: Waves, Sound and Light (10-D1, 10-D2). What a wave is, frequency,
 * period and the wave equation, sound and echoes, reflection and refraction, and the
 * electromagnetic spectrum. Every question that needs a speed of sound or of light states it.
 */
import { numPart, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, q, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';

const L = (n: number) => `p10-4-${n}`;
const clean = (x: number) => Math.round(x * 1e6) / 1e6;
const deg = (a: number) => `$${a}^\\circ$`;
const TRANS_LONG = ['Transverse', 'Longitudinal'];

// ---------------------------------------------------------------------------- 4.1 what a wave is

const TYPES_EASY: Q[] = [
  { q: 'What does a wave transfer from one place to another?', a: 'Energy, without transferring matter', w: ['Matter, without transferring energy', 'Both matter and energy', 'Neither matter nor energy'], why: 'The material a wave passes through only vibrates about its rest position. The energy is what travels.' },
  { q: 'In a transverse wave, how do the vibrations compare with the direction the wave travels?', a: 'They are at right angles to it', w: ['They are along it', 'They go round in circles', 'There are no vibrations'], why: 'A rope flicked up and down sends a wave along the rope: the vibration is across the direction of travel.' },
  { q: 'In a longitudinal wave, how do the vibrations compare with the direction the wave travels?', a: 'They are along it', w: ['They are at right angles to it', 'They go round in circles', 'There are no vibrations'], why: 'A spring pushed and pulled at one end vibrates backwards and forwards along the line the wave travels.' },
  { q: 'Which of these is a longitudinal wave?', a: 'A sound wave', w: ['A ripple on water', 'A light wave', 'A wave on a rope shaken up and down'], why: 'Sound is a series of squashes and stretches of the air, along the direction the sound travels.' },
  { q: 'Which of these is a transverse wave?', a: 'A ripple on a pond', w: ['A sound wave in air', 'A pulse pushed along a spring', 'An ultrasound wave'], why: 'The water surface moves up and down while the ripple travels outwards.' },
];

const TYPES_MEDIUM: Q[] = [
  { q: 'A cork floats on a pond as ripples pass. What does the cork do?', a: 'It bobs up and down, staying in about the same place', w: ['It travels along with the ripples', 'It sinks', 'It moves steadily towards the source of the ripples'], why: 'The wave carries energy across the pond, but the water, and the cork on it, only moves up and down.' },
  { q: 'A long spring is pushed and pulled at one end, so that pulses travel along it. What kind of wave is this?', a: 'Longitudinal', w: ['Transverse'], order: TRANS_LONG, why: 'The coils vibrate along the same line that the wave travels.' },
  { q: 'A rope is flicked up and down at one end, so that a wave travels along it. What kind of wave is this?', a: 'Transverse', w: ['Longitudinal'], order: TRANS_LONG, why: 'The rope moves up and down, at right angles to the direction the wave travels.' },
  { q: 'In a longitudinal wave, what is a compression?', a: 'A region where the particles are squeezed closer together', w: ['A region where the particles are spread further apart', 'The highest point of the wave', 'The distance the wave travels in one second'], why: 'Compressions (squashed) and rarefactions (stretched) follow each other along a longitudinal wave.' },
  { q: 'In a longitudinal wave, what is a rarefaction?', a: 'A region where the particles are spread further apart', w: ['A region where the particles are squeezed closer together', 'The lowest point of the wave', 'The time for one wave to pass'], why: 'Compressions (squashed) and rarefactions (stretched) follow each other along a longitudinal wave.' },
  { q: 'A crowd makes a "wave" travel around a stadium by standing up and sitting down in turn. What does this show about waves?', a: 'The disturbance travels, but each person stays in the same seat', w: ['The people travel around the stadium', 'Waves carry matter with them', 'Waves cannot travel through a crowd'], why: 'Like the particles of a material, each person only moves up and down. The pattern is what travels.' },
];

const TYPES_HARD: Select[] = [
  { q: 'Which statements about waves are true?', opts: [['Waves transfer energy.', true], ['The particles of the material vibrate about fixed positions.', true], ['Sound is a longitudinal wave.', true], ['Light is a transverse wave.', true], ['Waves carry matter along with them.', false], ['In a transverse wave the vibrations are along the direction of travel.', false], ['Every kind of wave needs a material to travel through.', false]], why: 'Waves carry energy, not matter. Transverse vibrations are across the direction of travel and longitudinal ones are along it. Light can cross empty space.' },
  { q: 'Which of these are transverse waves?', opts: [['Ripples on water', true], ['Light', true], ['A wave on a guitar string', true], ['Radio waves', true], ['Sound in air', false], ['Ultrasound', false], ['A compression pulse along a spring', false]], why: 'Sound, ultrasound and a pushed spring vibrate along the direction of travel, so they are longitudinal. The others vibrate across it.' },
];

const PARTS_EASY: Q[] = [
  { q: 'What is the amplitude of a wave?', a: 'The greatest distance of a point from its rest position', w: ['The distance from one crest to the next', 'The number of waves each second', 'The distance from a crest down to a trough'], why: 'The amplitude is measured from the rest position (the middle) to a crest, not from crest to trough.' },
  { q: 'What is the wavelength of a wave?', a: 'The distance from one crest to the next crest', w: ['The height of a crest above the rest position', 'The time for one complete wave', 'The number of waves each second'], why: 'One wavelength is the length of one complete wave: crest to crest, or trough to trough.' },
  { q: 'What is the frequency of a wave?', a: 'The number of complete waves each second', w: ['The time for one complete wave', 'The length of one complete wave', 'The height of a crest'], why: 'Frequency counts the waves passing a point each second. It is measured in hertz.' },
  { q: 'What is the unit of frequency?', a: 'The hertz (Hz)', w: ['The metre (m)', 'The second (s)', 'The metre per second (m/s)'], why: 'One hertz is one complete wave each second.' },
  { q: 'What is the highest point of a transverse wave called?', a: 'A crest', w: ['A trough', 'The amplitude', 'A compression'], why: 'Crests are the high points and troughs are the low points.' },
  { q: 'What is the period of a wave?', a: 'The time for one complete wave to pass', w: ['The number of waves each second', 'The length of one complete wave', 'The greatest displacement'], why: 'The period is a time, in seconds. It is 1 ÷ frequency.' },
];

/** A displacement-distance graph of a wave, with crests on grid lines. */
function waveGraph(rng: Rng): { A: number; lam: number; unit: string; figure: Figure } {
  const lam = rng.pick([4, 8]);
  const A = rng.pick([1, 2, 3, 4]);
  const unit = rng.pick(['m', 'cm']);
  const waves = lam === 8 ? 2 : 3;
  const per = 16;
  const points: Array<[number, number]> = [];
  for (let i = 0; i <= waves * per; i++) points.push([clean((i * lam) / per), clean(A * Math.sin((2 * Math.PI * i) / per))]);
  const figure: Figure = {
    type: 'plane',
    grid: { xMin: 0, xMax: lam * waves, yMin: -5, yMax: 5, xStep: lam === 8 ? 2 : 1, yStep: 1, xLabel: `Distance (${unit})`, yLabel: 'Displacement (cm)' },
    polylines: [{ points }],
  };
  return { A, lam, unit, figure };
}

function readWave(rng: Rng, hard: boolean): GenOutput {
  const g = waveGraph(rng);
  const ampSteps = [`The crests reach ${g.A} cm above the rest position (the horizontal axis), so the amplitude is ${g.A} cm.`];
  const lamSteps = [`One complete wave, from one crest to the next, takes up ${g.lam} ${g.unit} along the distance axis, so the wavelength is ${g.lam} ${g.unit}.`];
  if (hard) {
    return {
      prompt: 'The graph shows a wave at one moment. Find its amplitude and its wavelength.',
      figure: g.figure,
      parts: [numPart(g.A, { label: 'Amplitude', suffix: 'cm' }), numPart(g.lam, { label: 'Wavelength', suffix: g.unit })],
      hints: ['The amplitude is the height of a crest above the rest position.', 'The wavelength is the distance from one crest to the next.'],
      solution: [...ampSteps, ...lamSteps],
    };
  }
  const amp = rng.chance(0.5);
  return {
    prompt: `The graph shows a wave at one moment. What is its ${amp ? 'amplitude' : 'wavelength'}?`,
    figure: g.figure,
    parts: [amp ? numPart(g.A, { suffix: 'cm' }) : numPart(g.lam, { suffix: g.unit })],
    hints: [amp ? 'The amplitude is the height of a crest above the rest position, not the height from trough to crest.' : 'The wavelength is the distance from one crest to the next crest.'],
    solution: amp ? ampSteps : lamSteps,
  };
}

// ---------------------------------------------------------------------------- 4.2 frequency, period and the wave equation

function countWaves(rng: Rng): GenOutput {
  const f = rng.pick([2, 3, 4, 5, 8, 10]);
  const t = rng.pick([2, 4, 5, 10]);
  const n = f * t;
  const what = rng.pick([`A float bobs up and down ${n} times in ${q(t, 's')} as waves pass it`, `${n} complete waves pass a point in ${q(t, 's')}`, `The end of a ruler vibrates ${n} times in ${q(t, 's')}`]);
  return {
    prompt: `${what}. What is the frequency?`,
    parts: [numPart(f, { suffix: 'Hz' })],
    hints: ['frequency = number of waves ÷ time'],
    solution: [`$f = \\dfrac{${n}}{${t}} = ${f}$ Hz`],
  };
}

function periodOf(rng: Rng): GenOutput {
  const f = rng.pick([2, 4, 5, 10, 20, 50, 100]);
  const T = clean(1 / f);
  if (rng.chance(0.5)) {
    return {
      prompt: `A wave has a frequency of ${q(f, 'Hz')}. What is its period?`,
      parts: [numPart(T, { suffix: 's' })],
      hints: ['period = 1 ÷ frequency'],
      solution: [`$T = \\dfrac{1}{f} = \\dfrac{1}{${f}} = ${T}$ s`],
    };
  }
  return {
    prompt: `A wave has a period of ${q(T, 's')}. What is its frequency?`,
    parts: [numPart(f, { suffix: 'Hz' })],
    hints: ['frequency = 1 ÷ period'],
    solution: [`$f = \\dfrac{1}{T} = \\dfrac{1}{${T}} = ${f}$ Hz`],
  };
}

function periodHarder(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const f = rng.pick([2, 4, 5, 10]);
    const t = rng.pick([2, 5, 10]);
    const n = f * t;
    return {
      prompt: `${n} complete waves pass a point in ${q(t, 's')}. Find the frequency and the period of the waves.`,
      parts: [numPart(f, { label: 'Frequency', suffix: 'Hz' }), numPart(clean(1 / f), { label: 'Period', suffix: 's' })],
      hints: ['frequency = number of waves ÷ time', 'period = 1 ÷ frequency'],
      solution: [`$f = \\dfrac{${n}}{${t}} = ${f}$ Hz`, `$T = \\dfrac{1}{${f}} = ${clean(1 / f)}$ s`],
    };
  }
  const kHz = rng.pick([0.5, 1, 2, 4, 5]);
  const ms = clean(1 / kHz);
  return {
    prompt: `A sound has a frequency of ${q(kHz, 'kHz')}. What is its period, in milliseconds?`,
    parts: [numPart(ms, { suffix: 'ms' })],
    hints: ['Change kilohertz to hertz: 1 kHz = 1000 Hz.', 'period = 1 ÷ frequency, in seconds. Then 1 s = 1000 ms.'],
    solution: [`${q(kHz, 'kHz')} $= ${kHz * 1000}$ Hz.`, `$T = \\dfrac{1}{${kHz * 1000}} = ${clean(1 / (kHz * 1000))}$ s $= ${ms}$ ms`],
  };
}

/** Waves with believable frequencies and wavelengths: [what, frequencies in Hz, wavelengths in m]. */
const WAVES: Array<[string, number[], number[]]> = [
  ['A water wave', [0.5, 1, 2], [0.4, 1.5, 2, 3, 4]],
  ['A wave on a rope', [2, 4, 5, 10], [0.5, 1.5, 2, 3]],
  ['A wave on a long spring', [2, 4, 5], [0.2, 0.4, 0.5, 1.5]],
  ['A sound wave in air', [170, 340, 680, 850, 1700], []],
];

function waveEquation(rng: Rng, find: 'v' | 'f' | 'lam'): GenOutput {
  const [what, fs, lams] = rng.pick(WAVES);
  const f = rng.pick(fs);
  const lam = lams.length ? rng.pick(lams) : clean(340 / f);
  const v = clean(f * lam);
  if (find === 'v') {
    return {
      prompt: `${what} has a frequency of ${q(f, 'Hz')} and a wavelength of ${q(lam, 'm')}. What is its speed?`,
      parts: [numPart(v, { suffix: 'm/s' })],
      hints: ['wave speed = frequency × wavelength'],
      solution: [`$v = f\\lambda = ${f} \\times ${lam} = ${v}$ m/s`],
    };
  }
  if (find === 'f') {
    return {
      prompt: `${what} travels at ${q(v, 'm/s')} and has a wavelength of ${q(lam, 'm')}. What is its frequency?`,
      parts: [numPart(f, { suffix: 'Hz' })],
      hints: ['frequency = wave speed ÷ wavelength'],
      solution: [`$f = \\dfrac{v}{\\lambda} = \\dfrac{${v}}{${lam}} = ${f}$ Hz`],
    };
  }
  return {
    prompt: `${what} travels at ${q(v, 'm/s')} and has a frequency of ${q(f, 'Hz')}. What is its wavelength?`,
    parts: [numPart(lam, { suffix: 'm' })],
    hints: ['wavelength = wave speed ÷ frequency'],
    solution: [`$\\lambda = \\dfrac{v}{f} = \\dfrac{${v}}{${f}} = ${lam}$ m`],
  };
}

function waveEquationUnits(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const [kHz, cm] = rng.pick([[1.7, 20], [3.4, 10], [6.8, 5], [0.85, 40]]);
    return {
      prompt: `A sound wave of frequency ${q(kHz, 'kHz')} travels at ${q(340, 'm/s')} in air. What is its wavelength, in centimetres?`,
      parts: [numPart(cm, { suffix: 'cm' })],
      hints: ['Change kilohertz to hertz: 1 kHz = 1000 Hz.', 'wavelength = wave speed ÷ frequency, in metres. Then 1 m = 100 cm.'],
      solution: [`${q(kHz, 'kHz')} $= ${kHz * 1000}$ Hz.`, `$\\lambda = \\dfrac{340}{${kHz * 1000}} = ${cm / 100}$ m $= ${cm}$ cm`],
    };
  }
  const f = rng.pick([2, 4, 5, 10]);
  const t = rng.pick([2, 4, 5]);
  const lam = rng.pick([1.5, 2, 3, 4]);
  return {
    prompt: `In a ripple tank, ${f * t} waves pass a point in ${q(t, 's')}, and the wavelength is ${q(lam, 'cm')}. What is the speed of the waves, in cm/s?`,
    parts: [numPart(clean(f * lam), { suffix: 'cm/s' })],
    hints: ['Find the frequency first: number of waves ÷ time.', 'wave speed = frequency × wavelength. With the wavelength in cm, the speed is in cm/s.'],
    solution: [`$f = \\dfrac{${f * t}}{${t}} = ${f}$ Hz.`, `$v = f\\lambda = ${f} \\times ${lam} = ${clean(f * lam)}$ cm/s`],
  };
}

// ---------------------------------------------------------------------------- 4.3 sound

const SOUND_EASY: Q[] = [
  { q: 'What kind of wave is sound?', a: 'A longitudinal wave', w: ['A transverse wave', 'An electromagnetic wave', 'Not a wave at all'], why: 'The air is squashed and stretched along the direction the sound travels.' },
  { q: 'What makes every sound?', a: 'Something vibrating', w: ['Something hot', 'Something heavy', 'Something bright'], why: 'A vibrating string, drum skin or column of air pushes the air next to it backwards and forwards.' },
  { q: 'Why can sound not travel through a vacuum?', a: 'There are no particles to pass the vibrations on', w: ['A vacuum is too cold', 'Sound is too slow', 'A vacuum absorbs all the energy'], why: 'Sound is a vibration of particles, so it needs a solid, a liquid or a gas to travel through.' },
  { q: 'A sound is made louder without changing its pitch. What has changed about the wave?', a: 'Its amplitude has increased', w: ['Its frequency has increased', 'Its speed has increased', 'Its wavelength has increased'], why: 'Loudness goes with amplitude. Pitch goes with frequency.' },
  { q: 'A note is made higher in pitch. What has changed about the wave?', a: 'Its frequency has increased', w: ['Its amplitude has increased', 'Its speed has increased', 'Its wavelength has increased'], why: 'A higher pitch means more vibrations each second: a higher frequency.' },
];

const SOUND_MEDIUM: Q[] = [
  { q: 'In which of these does sound travel fastest?', a: 'Steel', w: ['Water', 'Air', 'A vacuum'], why: 'Sound is fastest in solids, slower in liquids and slowest in gases. It cannot travel in a vacuum at all.' },
  { q: 'A ringing bell is placed in a jar, and the air is pumped out. What happens to the sound?', a: 'It fades away, although the bell can still be seen ringing', w: ['It gets louder', 'It gets higher in pitch', 'Nothing changes'], why: 'With no air, nothing carries the vibrations to the glass. Light does not need the air, so the bell is still seen.' },
  { q: 'Humans can hear sounds from about 20 Hz to 20 000 Hz. What is ultrasound?', a: 'Sound with a frequency above 20 000 Hz', w: ['Sound with a frequency below 20 Hz', 'Very loud sound', 'Sound that travels faster than normal'], why: 'Ultrasound is too high in pitch for humans to hear. It is used in medical scans and by bats.' },
  { q: 'You see a distant firework explode before you hear it. Why?', a: 'Light travels much faster than sound', w: ['Sound travels much faster than light', 'The sound is made after the light', 'Sound cannot travel at night'], why: 'The light arrives almost at once. The sound, at a few hundred metres each second, takes noticeably longer.' },
  { q: 'Two notes are equally loud. One has a frequency of 200 Hz and the other 800 Hz. How do they sound different?', a: 'The 800 Hz note has a higher pitch', w: ['The 800 Hz note is louder', 'The 200 Hz note has a higher pitch', 'They sound exactly the same'], why: 'A higher frequency is heard as a higher pitch.' },
  { q: 'What is an echo?', a: 'A sound reflected from a surface', w: ['A sound that has been absorbed', 'A sound made twice by its source', 'A very quiet sound'], why: 'Hard surfaces such as walls and cliffs reflect sound back towards its source.' },
];

const SOUND_HARD: Select[] = [
  { q: 'Which statements about sound are true?', opts: [['Sound is caused by vibrations.', true], ['Sound needs a material to travel through.', true], ['A larger amplitude gives a louder sound.', true], ['A higher frequency gives a higher pitch.', true], ['Sound travels fastest in a vacuum.', false], ['Sound is a transverse wave.', false], ['A louder sound travels faster.', false]], why: 'Sound is a longitudinal vibration of a material. Amplitude sets the loudness and frequency sets the pitch. Neither changes the speed.' },
  { q: 'Which of these can sound travel through?', opts: [['Air', true], ['Water', true], ['Steel', true], ['Wood', true], ['A vacuum', false], ['The empty space between planets', false]], why: 'Sound travels through any solid, liquid or gas, but not through empty space, where there are no particles to vibrate.' },
];

const AIR = 'Sound travels at 340 m/s in air.';

function soundTravel(rng: Rng): GenOutput {
  const t = rng.pick([2, 3, 4, 5, 6, 8, 10]);
  const d = 340 * t;
  if (rng.chance(0.6)) {
    const what = rng.pick(['Thunder is heard', 'The bang of a firework is heard', 'The sound of a distant quarry blast is heard']);
    return {
      prompt: `${AIR} ${what} ${q(t, 's')} after the flash is seen. How far away did it happen?`,
      parts: [numPart(d, { suffix: 'm' })],
      hints: ['The light arrives almost at once, so the time is the time the sound takes.', 'distance = speed × time'],
      solution: [`$d = vt = 340 \\times ${t} = ${d}$ m`],
    };
  }
  return {
    prompt: `${AIR} How long does a sound take to travel ${q(d, 'm')}?`,
    parts: [numPart(t, { suffix: 's' })],
    hints: ['time = distance ÷ speed'],
    solution: [`$t = \\dfrac{d}{v} = \\dfrac{${d}}{340} = ${t}$ s`],
  };
}

function echoDistance(rng: Rng): GenOutput {
  const t = rng.pick([0.5, 1, 1.5, 2, 3, 4]);
  const d = clean((340 * t) / 2);
  const [what, short] = rng.pick([['a cliff', 'the cliff'], ['a large building', 'the building'], ['the wall of a canyon', 'the canyon wall']]);
  return {
    prompt: `${AIR} A person shouts towards ${what} and hears the echo ${q(t, 's')} later. How far away is ${short}?`,
    parts: [numPart(d, { suffix: 'm' })],
    hints: ['The sound travels there and back, so it covers twice the distance.', 'distance there and back = speed × time. Halve it.'],
    solution: [`Distance there and back $= 340 \\times ${t} = ${clean(340 * t)}$ m.`, `Distance away $= ${clean(340 * t)} \\div 2 = ${d}$ m`],
  };
}

function echoHarder(rng: Rng): GenOutput {
  const kind = rng.pick(['sonar', 'time', 'speed'] as const);
  if (kind === 'sonar') {
    const t = rng.pick([0.2, 0.4, 0.6, 1, 2, 4]);
    const depth = clean((1500 * t) / 2);
    return {
      prompt: `Sound travels at 1500 m/s in sea water. A ship sends a pulse of sound straight down, and the echo from the sea bed returns ${q(t, 's')} later. How deep is the sea?`,
      parts: [numPart(depth, { suffix: 'm' })],
      hints: ['The pulse travels down and back up, so it covers twice the depth.', 'distance there and back = speed × time. Halve it.'],
      solution: [`Distance down and back $= 1500 \\times ${t} = ${clean(1500 * t)}$ m.`, `Depth $= ${clean(1500 * t)} \\div 2 = ${depth}$ m`],
    };
  }
  if (kind === 'time') {
    const d = rng.pick([85, 170, 255, 510]);
    const t = clean((2 * d) / 340);
    return {
      prompt: `${AIR} A person claps ${q(d, 'm')} from a large wall. How long after the clap is the echo heard?`,
      parts: [numPart(t, { suffix: 's' })],
      hints: ['The sound travels to the wall and back: twice the distance.', 'time = distance ÷ speed'],
      solution: [`Distance there and back $= 2 \\times ${d} = ${2 * d}$ m.`, `$t = \\dfrac{${2 * d}}{340} = ${t}$ s`],
    };
  }
  const [d, t, v] = rng.pick([[165, 1, 330], [170, 1, 340], [85, 0.5, 340], [330, 2, 330], [510, 3, 340]]);
  return {
    prompt: `To measure the speed of sound, a student stands ${q(d, 'm')} from a large wall and claps. The echo is heard ${q(t, 's')} after the clap. What speed of sound does this give?`,
    parts: [numPart(v, { suffix: 'm/s' })],
    hints: ['The sound travels to the wall and back: twice the distance.', 'speed = distance ÷ time'],
    solution: [`Distance there and back $= 2 \\times ${d} = ${2 * d}$ m.`, `$v = \\dfrac{${2 * d}}{${t}} = ${v}$ m/s`],
  };
}

// ---------------------------------------------------------------------------- 4.4 reflection and refraction

/** A ray reflecting from a plane mirror, drawn to scale, with the normal dashed. */
function mirrorFigure(i: number): Figure {
  const r = (i * Math.PI) / 180;
  // The mirror sits low on the canvas, and a ray at a large angle is shortened to stay on it.
  const mirrorY = -3.5;
  const R = Math.min(6.5, 4.6 / Math.sin(r));
  const x = clean(R * Math.sin(r));
  const y = clean(R * Math.cos(r) + mirrorY);
  return {
    type: 'plane',
    grid: { xMin: -5, xMax: 5, yMin: -5, yMax: 5, step: 10 },
    hideTickLabels: true,
    hideAxes: true,
    segments: [
      { from: [-4.6, mirrorY], to: [4.6, mirrorY], color: 'muted' },
      { from: [0, mirrorY], to: [0, 4], color: 'muted', dashed: true },
      { from: [-x, y], to: [0, mirrorY], arrowEnd: true },
      { from: [0, mirrorY], to: [x, y], color: 'accent', arrowEnd: true },
    ],
    caption: 'A ray of light reflecting from a plane mirror. The dashed line is the normal.',
  };
}

function reflectAngle(rng: Rng): GenOutput {
  const i = rng.int(2, 15) * 5;
  return {
    prompt: `A ray of light hits a plane mirror with an angle of incidence of ${deg(i)}. What is the angle of reflection?`,
    figure: mirrorFigure(i),
    parts: [numPart(i, { suffix: '°' })],
    hints: ['The law of reflection: angle of reflection = angle of incidence.'],
    solution: [`The angle of reflection equals the angle of incidence: ${deg(i)}.`],
  };
}

function fromSurface(rng: Rng): GenOutput {
  const glance = rng.int(2, 15) * 5;
  const i = 90 - glance;
  if (rng.chance(0.3)) {
    const d = rng.pick([0.5, 1.5, 2, 3, 4]);
    return {
      prompt: `A person stands ${q(d, 'm')} in front of a plane mirror. How far is the person from their image?`,
      parts: [numPart(2 * d, { suffix: 'm' })],
      hints: ['The image is as far behind the mirror as the object is in front of it.'],
      solution: [`The image is ${d} m behind the mirror.`, `Distance from person to image $= ${d} + ${d} = ${2 * d}$ m`],
    };
  }
  return {
    prompt: `A ray of light hits a plane mirror, making an angle of ${deg(glance)} with the surface of the mirror. What is the angle of reflection?`,
    figure: mirrorFigure(i),
    parts: [numPart(i, { suffix: '°' })],
    hints: ['Angles of incidence and reflection are measured from the normal, which is at 90° to the mirror.', 'angle of incidence = 90° − the angle with the surface'],
    solution: [`Angle of incidence $= 90^\\circ - ${glance}^\\circ = ${i}^\\circ$.`, `The angle of reflection equals it: ${deg(i)}.`],
  };
}

function betweenRays(rng: Rng): GenOutput {
  const i = rng.int(3, 16) * 5;
  if (rng.chance(0.5)) {
    return {
      prompt: `A ray of light hits a plane mirror with an angle of incidence of ${deg(i)}. What is the angle between the incident ray and the reflected ray?`,
      figure: mirrorFigure(i),
      parts: [numPart(2 * i, { suffix: '°' })],
      hints: ['The angle of reflection equals the angle of incidence.', 'Both angles lie between the two rays, one on each side of the normal.'],
      solution: [`The angle of reflection is also ${deg(i)}.`, `Angle between the rays $= ${i}^\\circ + ${i}^\\circ = ${2 * i}^\\circ$`],
    };
  }
  return {
    prompt: `The angle between a ray hitting a plane mirror and the reflected ray is ${deg(2 * i)}. What is the angle of incidence?`,
    figure: mirrorFigure(i),
    parts: [numPart(i, { suffix: '°' })],
    hints: ['The normal splits the angle between the two rays into two equal parts.'],
    solution: [`Angle of incidence $= ${2 * i}^\\circ \\div 2 = ${i}^\\circ$`],
  };
}

const MIRROR_IDEAS: Q[] = [
  { q: 'From which line are the angles of incidence and reflection measured?', a: 'The normal, a line at right angles to the mirror', w: ['The surface of the mirror', 'The incident ray', 'A line along the reflected ray'], why: 'Both angles are measured between the ray and the normal.' },
  { q: 'What does the law of reflection say?', a: 'The angle of reflection equals the angle of incidence', w: ['The angle of reflection is twice the angle of incidence', 'The angle of reflection is always 90°', 'The two angles add up to 90°'], why: 'A ray leaves a mirror at the same angle to the normal as it arrived.' },
  { q: 'An object stands 3 m in front of a plane mirror. Where is its image?', a: '3 m behind the mirror', w: ['On the surface of the mirror', '3 m in front of the mirror', '6 m behind the mirror'], why: 'The image in a plane mirror is as far behind the mirror as the object is in front.' },
  { q: 'How does the size of the image in a plane mirror compare with the size of the object?', a: 'It is the same size', w: ['It is smaller', 'It is larger', 'It depends on the distance'], why: 'A flat mirror gives an upright image of the same size, swapped left to right.' },
  { q: 'A ray of light hits a plane mirror along the normal. What happens to it?', a: 'It reflects straight back along the same line', w: ['It passes through the mirror', 'It reflects along the surface of the mirror', 'It is absorbed'], why: 'The angle of incidence is 0°, so the angle of reflection is 0° too.' },
];

const REFRACT_EASY: Q[] = [
  { q: 'What is refraction?', a: 'The change in direction of a wave when it passes into a material where its speed is different', w: ['The bouncing of a wave off a surface', 'The spreading of a wave through a gap', 'The absorption of a wave by a surface'], why: 'When one side of a wave slows down before the other, the wave swings round to a new direction.' },
  { q: 'Light passes from air into glass at an angle. Which way does it bend?', a: 'Towards the normal', w: ['Away from the normal', 'It does not bend', 'Back into the air'], why: 'Light slows down in glass, and a wave that slows down bends towards the normal.' },
  { q: 'Light passes from glass into air at an angle. Which way does it bend?', a: 'Away from the normal', w: ['Towards the normal', 'It does not bend', 'Back into the glass'], why: 'Light speeds up in air, and a wave that speeds up bends away from the normal.' },
  { q: 'What happens to the speed of light when it passes from air into glass?', a: 'It decreases', w: ['It increases', 'It stays the same', 'It becomes zero'], why: 'Light travels more slowly in glass and in water than in air.' },
  { q: 'A ray of light hits a glass block along the normal. What happens to its direction?', a: 'It carries straight on without bending', w: ['It bends towards the surface', 'It reflects straight back', 'It bends away from the normal'], why: 'The light still slows down, but the whole wave slows together, so it does not turn.' },
];

const REFRACT_MEDIUM: Q[] = [
  { q: 'A straw standing in a glass of water looks bent at the surface. Why?', a: 'Light from the straw refracts as it leaves the water', w: ['The water bends the straw', 'Light reflects off the straw', 'The glass magnifies the straw'], why: 'Light from the part under water changes direction at the surface, so that part seems to be in a different place.' },
  { q: 'A swimming pool looks shallower than it really is. Why?', a: 'Light from the bottom bends away from the normal as it leaves the water', w: ['Light from the bottom bends towards the normal as it leaves the water', 'The water absorbs the light', 'Light reflects off the bottom'], why: 'The light speeds up on entering the air and bends away from the normal, so the bottom seems closer than it is.' },
  { q: 'When light passes from air into water, what happens to its frequency?', a: 'It stays the same', w: ['It increases', 'It decreases', 'It becomes zero'], why: 'The source sets the frequency. The speed and the wavelength are what change.' },
  { q: 'When light slows down on entering glass, what happens to its wavelength?', a: 'It gets shorter', w: ['It gets longer', 'It stays the same', 'It becomes zero'], why: 'Speed = frequency × wavelength. The frequency stays the same, so a lower speed means a shorter wavelength.' },
  { q: 'Light passes from air into glass with an angle of incidence of 40°. Which could be the angle of refraction?', a: '25°', w: ['40°', '55°', '90°'], why: 'Entering glass, light bends towards the normal, so the angle of refraction is smaller than 40°.' },
  { q: 'Light passes from water into air with an angle of incidence of 30°. Which could be the angle of refraction?', a: '42°', w: ['30°', '22°', '0°'], why: 'Leaving water, light bends away from the normal, so the angle of refraction is larger than 30°.' },
];

const REFRACT_HARD: Select[] = [
  { q: 'A ray of light passes from air into a glass block at an angle. Which statements are true?', opts: [['The light slows down.', true], ['The ray bends towards the normal.', true], ['The frequency stays the same.', true], ['The wavelength gets shorter.', true], ['The light speeds up.', false], ['The ray bends away from the normal.', false], ['The frequency decreases.', false]], why: 'Glass slows light. The frequency cannot change, so the wavelength shortens, and the ray turns towards the normal.' },
];

function shallowWater(rng: Rng): GenOutput {
  const f = rng.pick([2, 4, 5]);
  const [v1, v2] = rng.pick([[40, 20], [60, 40], [80, 40], [120, 80]]);
  return {
    prompt: `Water waves of frequency ${q(f, 'Hz')} travel at ${q(v1, 'cm/s')} in deep water and slow down to ${q(v2, 'cm/s')} when they pass into shallow water. Find the wavelength in the deep water and in the shallow water.`,
    parts: [numPart(clean(v1 / f), { label: 'Deep water', suffix: 'cm' }), numPart(clean(v2 / f), { label: 'Shallow water', suffix: 'cm' })],
    hints: ['The frequency does not change when a wave is refracted.', 'wavelength = wave speed ÷ frequency, on each side'],
    solution: [`Deep: $\\lambda = \\dfrac{${v1}}{${f}} = ${clean(v1 / f)}$ cm.`, `Shallow: $\\lambda = \\dfrac{${v2}}{${f}} = ${clean(v2 / f)}$ cm. The slower waves are closer together.`],
  };
}

// ---------------------------------------------------------------------------- 4.5 the electromagnetic spectrum

const EM_EASY: Q[] = [
  { q: 'Which type of electromagnetic wave has the longest wavelength?', a: 'Radio waves', w: ['Gamma rays', 'Visible light', 'X-rays'], why: 'In order of decreasing wavelength: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.' },
  { q: 'Which type of electromagnetic wave has the highest frequency?', a: 'Gamma rays', w: ['Radio waves', 'Infrared', 'Visible light'], why: 'In order of increasing frequency: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.' },
  { q: 'Which electromagnetic waves can human eyes detect?', a: 'Visible light', w: ['Infrared', 'Ultraviolet', 'Microwaves'], why: 'Visible light is the narrow band of the spectrum that our eyes respond to.' },
  { q: 'Which electromagnetic waves does a television remote control use?', a: 'Infrared', w: ['X-rays', 'Gamma rays', 'Ultraviolet'], why: 'Remote controls send pulses of infrared. Warm objects also give out infrared.' },
  { q: 'Which electromagnetic waves are used to make images of broken bones?', a: 'X-rays', w: ['Radio waves', 'Infrared', 'Microwaves'], why: 'X-rays pass through soft tissue but are absorbed by bone.' },
  { q: 'Which electromagnetic waves from the Sun cause sunburn?', a: 'Ultraviolet', w: ['Infrared', 'Radio waves', 'Microwaves'], why: 'Ultraviolet carries enough energy to damage skin cells.' },
  { q: 'Which electromagnetic waves heat food in an oven and carry mobile phone signals?', a: 'Microwaves', w: ['Gamma rays', 'Ultraviolet', 'X-rays'], why: 'Microwaves are absorbed by water in food, and they pass easily through the air for communications.' },
];

const EM_MEDIUM: Q[] = [
  { q: 'How do the speeds of radio waves and X-rays compare in a vacuum?', a: 'They are the same', w: ['Radio waves are faster', 'X-rays are faster', 'Neither can travel in a vacuum'], why: 'Every electromagnetic wave travels at the same speed in a vacuum, the speed of light.' },
  { q: 'Light from the Sun reaches the Earth through empty space. What does this show about electromagnetic waves?', a: 'They do not need a material to travel through', w: ['They are longitudinal', 'They travel slowly', 'They are a kind of sound'], why: 'Unlike sound, electromagnetic waves can cross a vacuum.' },
  { q: 'Which list is in order of increasing frequency?', a: 'Radio, microwave, infrared, visible', w: ['Visible, infrared, microwave, radio', 'Infrared, radio, visible, microwave', 'Microwave, radio, visible, infrared'], why: 'The full order of increasing frequency is radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.' },
  { q: 'Which list is in order of increasing frequency?', a: 'Visible, ultraviolet, X-ray, gamma', w: ['Gamma, X-ray, ultraviolet, visible', 'Ultraviolet, visible, gamma, X-ray', 'X-ray, gamma, visible, ultraviolet'], why: 'The full order of increasing frequency is radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.' },
  { q: 'Why are X-rays and gamma rays more dangerous than radio waves?', a: 'Their high frequency gives them enough energy to damage living cells', w: ['They travel faster', 'They have longer wavelengths', 'They cannot pass through anything'], why: 'The higher the frequency, the more energy the wave can deliver to a cell.' },
  { q: 'Which colour of visible light has the longest wavelength?', a: 'Red', w: ['Violet', 'Green', 'Blue'], why: 'Visible light runs from red (longest wavelength) to violet (shortest).' },
  { q: 'As the frequency of an electromagnetic wave increases, what happens to its wavelength in a vacuum?', a: 'It decreases', w: ['It increases', 'It stays the same', 'It becomes zero'], why: 'Speed = frequency × wavelength, and the speed is fixed, so a higher frequency means a shorter wavelength.' },
];

const EM_HARD: Select[] = [
  { q: 'Which statements are true of every electromagnetic wave?', opts: [['It is a transverse wave.', true], ['It can travel through a vacuum.', true], ['It travels at the speed of light in a vacuum.', true], ['It transfers energy.', true], ['It has the same wavelength as every other electromagnetic wave.', false], ['It needs air to travel.', false], ['It is a longitudinal wave.', false]], why: 'The waves of the spectrum differ in wavelength and frequency, but all are transverse, all cross a vacuum, and all travel at the same speed there.' },
  { q: 'Which of these have a higher frequency than visible light?', opts: [['Ultraviolet', true], ['X-rays', true], ['Gamma rays', true], ['Infrared', false], ['Microwaves', false], ['Radio waves', false]], why: 'In order of increasing frequency: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.' },
];

const C_NOTE = 'All electromagnetic waves travel at $3.0 \\times 10^8$ m/s in a vacuum.';
const sciTex = (m: string, e: number) => `$${m} \\times 10^{${e}}$`;
const TYPE_HINT = 'Type an answer such as 1.5 × 10¹¹ as 1.5e11 or 1.5*10^11.';

/** An answer in scientific notation, m × 10^e, marked to within 2%. */
function sciPart(m: string, e: number, suffix: string): Part {
  const value = Number(`${m}e${e}`);
  return { suffix, answer: { kind: 'numeric', value, tolerance: Math.abs(value) * 0.02, allowExpression: true, scientific: true, exact: `${m}*10^${e}` } };
}

function emTime(rng: Rng): GenOutput {
  const [m, e, t] = rng.pick([['6.0', 8, 2], ['1.5', 9, 5], ['3.0', 9, 10], ['9.0', 8, 3], ['1.2', 9, 4], ['1.5', 11, 500]] as Array<[string, number, number]>);
  return {
    prompt: `${C_NOTE} A radio signal is sent to a spacecraft ${sciTex(m, e)} m away. How long does the signal take to arrive?`,
    parts: [numPart(t, { suffix: 's' })],
    hints: ['time = distance ÷ speed'],
    solution: [`$t = \\dfrac{d}{v} = \\dfrac{${m} \\times 10^{${e}}}{3.0 \\times 10^{8}} = ${t}$ s`],
  };
}

function emDistance(rng: Rng): GenOutput {
  const [what, t, m, e] = rng.pick([
    ['Light from the Sun takes 500 s to reach the Earth. How far is the Earth from the Sun?', 500, '1.5', 11],
    ['A radio signal from a satellite takes 0.02 s to reach the ground. How far away is the satellite?', 0.02, '6.0', 6],
    ['A radio signal takes 20 s to travel from the Earth to a space probe. How far away is the probe?', 20, '6.0', 9],
    ['Light takes 4 s to travel between two spacecraft. How far apart are they?', 4, '1.2', 9],
  ] as Array<[string, number, string, number]>);
  return {
    prompt: `${C_NOTE} ${what}`,
    parts: [sciPart(m, e, 'm')],
    hints: ['distance = speed × time', TYPE_HINT],
    solution: [`$d = vt = 3.0 \\times 10^{8} \\times ${t} = ${m} \\times 10^{${e}}$ m`],
  };
}

function emWavelength(rng: Rng): GenOutput {
  const [m, e, lam] = rng.pick([['1.0', 8, 3], ['1.5', 8, 2], ['6.0', 8, 0.5], ['3.0', 9, 0.1], ['1.0', 6, 300], ['2.0', 6, 150], ['1.0', 10, 0.03], ['2.5', 9, 0.12]] as Array<[string, number, number]>);
  const what = e >= 9 ? 'A microwave' : 'A radio wave';
  return {
    prompt: `${C_NOTE} ${what} has a frequency of ${sciTex(m, e)} Hz. What is its wavelength?`,
    parts: [numPart(lam, { suffix: 'm' })],
    hints: ['wavelength = wave speed ÷ frequency'],
    solution: [`$\\lambda = \\dfrac{v}{f} = \\dfrac{3.0 \\times 10^{8}}{${m} \\times 10^{${e}}} = ${lam}$ m`],
  };
}

function emFrequency(rng: Rng): GenOutput {
  const [what, lamTex, m, e] = rng.pick([
    ['A radio wave', '$3.0$', '1.0', 8],
    ['A radio wave', '$1.5$', '2.0', 8],
    ['A radio wave', '$600$', '5.0', 5],
    ['A microwave', '$0.030$', '1.0', 10],
    ['A microwave', '$0.12$', '2.5', 9],
    ['Infrared from a heater', '$1.0 \\times 10^{-5}$', '3.0', 13],
    ['Orange light', '$6.0 \\times 10^{-7}$', '5.0', 14],
    ['An X-ray', '$1.0 \\times 10^{-10}$', '3.0', 18],
  ] as Array<[string, string, string, number]>);
  return {
    prompt: `${C_NOTE} ${what} has a wavelength of ${lamTex} m. What is its frequency?`,
    parts: [sciPart(m, e, 'Hz')],
    hints: ['frequency = wave speed ÷ wavelength', TYPE_HINT],
    solution: [`$f = \\dfrac{v}{\\lambda} = \\dfrac{3.0 \\times 10^{8}}{${lamTex.replace(/\$/g, '')}} = ${m} \\times 10^{${e}}$ Hz`],
  };
}

export const WAVE_SKILLS: SkillDef[] = [
  skill({ id: 'p10-wave-types', name: 'Kinds of wave', description: 'Say what a wave transfers, and tell transverse waves from longitudinal waves.', outcomes: ['10-D1'], lessonId: L(1), format: 'mc', gen: bank([TYPES_EASY, TYPES_MEDIUM, TYPES_HARD], ['Compare the direction of the vibrations with the direction the wave travels.']) }),
  skill({ id: 'p10-wave-parts', name: 'Amplitude and wavelength', description: 'Name the parts of a wave, and read its amplitude and wavelength from a graph.', outcomes: ['10-D1'], lessonId: L(1), gen: bank([PARTS_EASY, (rng) => readWave(rng, false), (rng) => readWave(rng, true)], ['Amplitude: rest position to crest. Wavelength: crest to crest.']) }),
  skill({ id: 'p10-frequency-period', name: 'Frequency and period', description: 'Find a frequency from a count of waves, and change between frequency and period.', outcomes: ['10-D1'], lessonId: L(2), calculator: true, gen: bank([countWaves, periodOf, periodHarder], ['frequency = number of waves ÷ time, and period = 1 ÷ frequency']) }),
  skill({ id: 'p10-wave-equation', name: 'The wave equation', description: 'Use wave speed = frequency × wavelength to find a speed, a frequency or a wavelength.', outcomes: ['10-D1'], lessonId: L(2), calculator: true, gen: bank([(rng) => waveEquation(rng, 'v'), (rng) => waveEquation(rng, rng.pick(['f', 'lam'] as const)), waveEquationUnits], ['wave speed = frequency × wavelength']) }),
  skill({ id: 'p10-sound', name: 'Sound waves', description: 'Describe how sound is made and travels, and link pitch to frequency and loudness to amplitude.', outcomes: ['10-D2'], lessonId: L(3), format: 'mc', gen: bank([SOUND_EASY, SOUND_MEDIUM, SOUND_HARD], ['Sound is a longitudinal vibration that needs a material to travel through.']) }),
  skill({ id: 'p10-echo', name: 'Speed of sound and echoes', description: 'Use the speed of sound to find distances and times, including for echoes.', outcomes: ['10-D2'], lessonId: L(3), calculator: true, gen: bank([soundTravel, echoDistance, echoHarder], ['distance = speed × time. For an echo, the sound travels there and back.']) }),
  skill({ id: 'p10-reflection', name: 'Reflection', description: 'Use the law of reflection, and describe the image in a plane mirror.', outcomes: ['10-D2'], lessonId: L(4), gen: bank([either(reflectAngle, fromBank(MIRROR_IDEAS, ['Angles are measured from the normal.'])), fromSurface, betweenRays], ['The angle of reflection equals the angle of incidence, both measured from the normal.']) }),
  skill({ id: 'p10-refraction', name: 'Refraction', description: 'Describe how light changes speed and direction when it passes from one material into another.', outcomes: ['10-D2'], lessonId: L(4), gen: bank([REFRACT_EASY, REFRACT_MEDIUM, either(shallowWater, fromBank(REFRACT_HARD, ['Slowing down bends a ray towards the normal.']))], ['Slowing down bends a ray towards the normal; speeding up bends it away.']) }),
  skill({ id: 'p10-em-spectrum', name: 'The electromagnetic spectrum', description: 'Order the waves of the electromagnetic spectrum, and give their uses and dangers.', outcomes: ['10-D2'], lessonId: L(5), format: 'mc', gen: bank([EM_EASY, EM_MEDIUM, EM_HARD], ['In order of increasing frequency: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.']) }),
  skill({ id: 'p10-em-waves', name: 'The speed of light', description: 'Use the speed of electromagnetic waves to find times, distances, wavelengths and frequencies.', outcomes: ['10-D2'], lessonId: L(5), calculator: true, gen: bank([emTime, either(emWavelength, emDistance), emFrequency], ['Every electromagnetic wave travels at the same speed in a vacuum, and speed = frequency × wavelength.']) }),
];
