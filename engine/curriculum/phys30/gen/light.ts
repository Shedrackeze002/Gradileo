/**
 * Grade 12 Physics, Unit 3, lessons 3.1 to 3.5: electromagnetic radiation as a wave (30-C1). The
 * spectrum and the speed of light, reflection and curved mirrors, refraction and total internal
 * reflection, lenses, and the diffraction and interference of light. Every constant and every
 * refractive index a question needs is in the question. Distances behind a mirror, and on the
 * object's side of a lens, are negative: they belong to virtual images.
 */
import { fixedChoice, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';
import { RAD, SCI_ASK, clean, rounded, sciPart, sciTex } from './common.ts';

const L = (n: number) => `p30-3-${n}`;
/** The speed of light in a vacuum, in metres per second. */
export const C = 3.0e8;
export const C_TEX = '3.00 \\times 10^{8}';
export const C_NOTE = `The speed of light is $${C_TEX}\\ \\text{m/s}$.`;
const NM_NOTE = '($1\\ \\text{nm} = 10^{-9}\\ \\text{m}$)';
const deg = (x: number) => x / RAD;
const asin = (x: number) => deg(Math.asin(x));

// ---------------------------------------------------------------------------- 3.1 electromagnetic waves

const EM_1: Q[] = [
  { q: 'What produces an electromagnetic wave?', a: 'An electric charge that accelerates', w: ['An electric charge at rest', 'A charge that moves at a steady velocity', 'A mass that vibrates'], why: 'A charge that speeds up, slows down or changes direction sends out changing electric and magnetic fields: an electromagnetic wave.' },
  { q: 'What is an electromagnetic wave made of?', a: 'A changing electric field and a changing magnetic field, at right angles to each other', w: ['Vibrating particles of air', 'A stream of electrons', 'A changing electric field only'], why: 'The changing electric field makes a changing magnetic field, which makes a changing electric field, and so on. The two fields are at right angles to each other and to the direction of travel.' },
  { q: 'Which of these does an electromagnetic wave not need?', a: 'A material to travel through', w: ['A source', 'Energy', 'A frequency'], why: 'Electromagnetic waves are fields, not vibrations of matter, so they cross empty space. That is how sunlight reaches the Earth.' },
  { q: 'Radio waves and X-rays both travel through a vacuum. How do their speeds compare?', a: 'They are the same', w: ['X-rays are faster', 'Radio waves are faster', 'It depends on how bright they are'], why: 'Every electromagnetic wave travels through a vacuum at the same speed, $3.00 \\times 10^{8}$ m/s.' },
  { q: 'Which kind of electromagnetic radiation has the longest wavelength?', a: 'Radio waves', w: ['Gamma rays', 'Visible light', 'X-rays'], why: 'Radio waves have the longest wavelengths and the lowest frequencies of the spectrum.' },
  { q: 'Which kind of electromagnetic radiation has the highest frequency?', a: 'Gamma rays', w: ['Radio waves', 'Microwaves', 'Infrared'], why: 'Gamma rays have the highest frequencies and the shortest wavelengths of the spectrum.' },
  { q: 'What kind of wave is an electromagnetic wave?', a: 'Transverse', w: ['Longitudinal', 'A mixture of the two', 'Neither'], why: 'The fields change at right angles to the direction in which the wave travels, so the wave is transverse.' },
];

const EM_2: Q[] = [
  { q: 'Which list puts these in order from the lowest frequency to the highest?', a: 'Microwaves, infrared, visible light, ultraviolet', w: ['Ultraviolet, visible light, infrared, microwaves', 'Infrared, microwaves, visible light, ultraviolet', 'Microwaves, visible light, infrared, ultraviolet'], why: 'The full order is radio, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays.' },
  { q: 'Which list puts these in order from the longest wavelength to the shortest?', a: 'Radio waves, visible light, X-rays, gamma rays', w: ['Gamma rays, X-rays, visible light, radio waves', 'Radio waves, X-rays, visible light, gamma rays', 'Visible light, radio waves, gamma rays, X-rays'], why: 'Wavelength falls as frequency rises: radio waves are the longest and gamma rays the shortest.' },
  { q: 'Which colour of visible light has the longest wavelength?', a: 'Red', w: ['Violet', 'Green', 'Blue'], why: 'Visible light runs from red, at about 700 nm, to violet, at about 400 nm.' },
  { q: 'Which region of the spectrum lies just beyond the violet end of visible light?', a: 'Ultraviolet', w: ['Infrared', 'Microwaves', 'Radio waves'], why: 'Ultraviolet means "beyond violet". Infrared lies beyond the red end.' },
  { q: 'Which radiation do warm objects, such as your skin, give out most strongly?', a: 'Infrared', w: ['Ultraviolet', 'X-rays', 'Gamma rays'], why: 'Objects near room temperature radiate mainly infrared. A thermal camera detects it.' },
  { q: 'Which radiation is used to make images of broken bones?', a: 'X-rays', w: ['Microwaves', 'Infrared', 'Radio waves'], why: 'X-rays pass through soft tissue but are absorbed by bone.' },
  { q: 'Which radiation comes from the nuclei of radioactive atoms?', a: 'Gamma rays', w: ['Radio waves', 'Infrared', 'Visible light'], why: 'Gamma rays are given out when a nucleus loses energy.' },
  { q: 'Which radiation carries the signals of mobile phones, radar and satellite links?', a: 'Microwaves', w: ['Ultraviolet', 'Gamma rays', 'X-rays'], why: 'Microwaves pass through the atmosphere and can be sent in narrow beams.' },
  { q: 'Which radiation from the Sun causes sunburn?', a: 'Ultraviolet', w: ['Infrared', 'Microwaves', 'Radio waves'], why: 'Ultraviolet has enough energy to damage the cells of the skin.' },
];

const EM_3: Q[] = [
  { q: 'James Clerk Maxwell predicted electromagnetic waves in the 1860s. Who first produced and detected them in a laboratory?', a: 'Heinrich Hertz, who made radio waves with a spark', w: ['Isaac Newton, with a prism', 'Michael Faraday, with a magnet and a coil', 'Robert Millikan, with oil drops'], why: 'In 1887 Hertz made a spark jump across a gap and detected the waves it sent out with a loop of wire across the room.' },
  { q: 'Maxwell calculated the speed of his electromagnetic waves. What did he notice about it?', a: 'It was the measured speed of light, so light must be an electromagnetic wave', w: ['It was the speed of sound', 'It was infinite', 'It depended on the frequency'], why: 'The speed came out as $3.00 \\times 10^{8}$ m/s from electric and magnetic constants alone, which matched the speed of light.' },
  { q: 'The frequency of an electromagnetic wave in a vacuum is doubled. What happens to its wavelength?', a: 'It halves', w: ['It doubles', 'It stays the same', 'It becomes four times as long'], why: '$c = f\\lambda$ and the speed is fixed, so twice the frequency means half the wavelength.' },
  { q: 'Why does the aerial of a radio transmitter send out electromagnetic waves?', a: 'Electrons are accelerated up and down the aerial by an alternating current', w: ['The aerial is very hot', 'The aerial is a permanent magnet', 'Electrons flow steadily along the aerial'], why: 'Charges that accelerate radiate. The frequency of the wave is the frequency of the alternating current.' },
  { q: 'Light can be polarized, for example by the lenses of some sunglasses. What does this show about light?', a: 'It is a transverse wave', w: ['It is a longitudinal wave', 'It is a stream of particles', 'It needs a material to travel through'], why: 'A polarizer passes vibrations in one direction only. Only a transverse wave has a direction of vibration across its path.' },
  { q: 'Which kinds of electromagnetic radiation can ionize atoms and so damage living cells most easily?', a: 'Ultraviolet, X-rays and gamma rays', w: ['Radio waves and microwaves', 'Infrared and visible light', 'Microwaves and infrared'], why: 'The high-frequency end of the spectrum carries the most energy, enough to knock electrons out of atoms.' },
  { q: 'An electron moves through space in a straight line at a constant speed. Does it send out electromagnetic waves?', a: 'No, because it is not accelerating', w: ['Yes, because it is moving', 'Yes, because it has a charge', 'No, because it has mass'], why: 'Only a charge that accelerates radiates. Steady motion gives steady fields, not a wave.' },
];

// ---------------------------------------------------------------------------- 3.1 the speed of light

function wavelengthFromFrequency(rng: Rng): GenOutput {
  const kind = rng.pick(['fm', 'am', 'oven'] as const);
  if (kind === 'fm') {
    const f = rng.float(88.1, 107.9, 1);
    const lambda = C / (f * 1e6);
    return {
      prompt: `${C_NOTE} A radio station broadcasts at a frequency of ${q(f, 'MHz')}. Find the wavelength of its waves, to 2 decimal places.`,
      parts: [rounded(lambda, 2, 'm')],
      hints: ['For every wave, speed = frequency × wavelength: $c = f\\lambda$', 'Change the megahertz to hertz: $1\\ \\text{MHz} = 10^{6}\\ \\text{Hz}$'],
      solution: [`$\\lambda = \\dfrac{c}{f} = \\dfrac{${C_TEX}}{${f} \\times 10^{6}} = ${num(lambda, 2)}$ m`],
    };
  }
  if (kind === 'am') {
    const f = rng.int(54, 160) * 10;
    const lambda = C / (f * 1e3);
    return {
      prompt: `${C_NOTE} A radio station broadcasts at a frequency of ${q(f, 'kHz')}. Find the wavelength of its waves, to the nearest metre.`,
      parts: [rounded(lambda, 0, 'm')],
      hints: ['For every wave, speed = frequency × wavelength: $c = f\\lambda$', 'Change the kilohertz to hertz: $1\\ \\text{kHz} = 10^{3}\\ \\text{Hz}$'],
      solution: [`$\\lambda = \\dfrac{c}{f} = \\dfrac{${C_TEX}}{${f} \\times 10^{3}} = ${num(lambda, 0)}$ m`],
    };
  }
  const f = rng.pick([1.5, 2.45, 3.6, 5, 8, 10, 12, 15, 24, 30]);
  const lambda = (C / (f * 1e9)) * 100;
  return {
    prompt: `${C_NOTE} A microwave transmitter works at a frequency of ${q(f, 'GHz')}. Find the wavelength of its waves in centimetres, to 2 decimal places.`,
    parts: [rounded(lambda, 2, 'cm')],
    hints: ['For every wave, speed = frequency × wavelength: $c = f\\lambda$', 'Change the gigahertz to hertz: $1\\ \\text{GHz} = 10^{9}\\ \\text{Hz}$', 'Change the answer from metres to centimetres.'],
    solution: [`$\\lambda = \\dfrac{c}{f} = \\dfrac{${C_TEX}}{${f} \\times 10^{9}} = ${num(lambda / 100, 5)}$ m, which is ${num(lambda, 2)} cm`],
  };
}

const COLOURS: Array<[string, number, number]> = [['violet', 400, 445], ['blue', 450, 490], ['green', 500, 560], ['yellow', 570, 590], ['orange', 595, 620], ['red', 630, 700]];

function frequencyFromWavelength(rng: Rng): GenOutput {
  const [colour, lo, hi] = rng.pick(COLOURS);
  const nm = rng.int(lo / 5, hi / 5) * 5;
  const f = C / (nm * 1e-9);
  return {
    prompt: `${C_NOTE} A beam of ${colour} light has a wavelength of ${q(nm, 'nm')} ${NM_NOTE}. Find its frequency. ${SCI_ASK}`,
    parts: [sciPart(f, 3, 'Hz')],
    hints: ['For every wave, speed = frequency × wavelength: $c = f\\lambda$', 'Change the nanometres to metres.'],
    solution: [`$f = \\dfrac{c}{\\lambda} = \\dfrac{${C_TEX}}{${nm} \\times 10^{-9}} = ${sciTex(f)}$ Hz`],
  };
}

function lightTime(rng: Rng): GenOutput {
  const m = rng.float(1.2, 9.8, 1);
  const e = rng.pick([9, 10, 11, 12]);
  const d = Number(`${m}e${e}`);
  const t = d / C;
  const what = rng.pick(['A spacecraft', 'A space probe', 'A comet', 'An asteroid']);
  return {
    prompt: `${C_NOTE} ${what} is $${m.toFixed(1)} \\times 10^{${e}}\\ \\text{m}$ from the Earth. How long does a radio signal from the Earth take to reach it? ${SCI_ASK}`,
    parts: [sciPart(t, 3, 's')],
    hints: ['A radio signal is an electromagnetic wave, so it travels at the speed of light.', 'time = distance ÷ speed'],
    solution: [`$t = \\dfrac{d}{c} = \\dfrac{${m.toFixed(1)} \\times 10^{${e}}}{${C_TEX}} = ${sciTex(t)}$ s`],
  };
}

function radarDistance(rng: Rng): GenOutput {
  const t = rng.int(2, 90) * 10;
  const d = (C * t * 1e-6) / 2 / 1000;
  const target = rng.pick(['an aircraft', 'a ship', 'a storm cloud', 'a hill']);
  return {
    prompt: `${C_NOTE} A radar station sends out a pulse of microwaves. The pulse reflects from ${target} and returns ${q(t, 'μs')} after it was sent ($1\\ \\text{μs} = 10^{-6}\\ \\text{s}$). How far away is the object, in kilometres? Give your answer to 1 decimal place.`,
    parts: [rounded(d, 1, 'km')],
    hints: ['The pulse travels to the object and back, so it covers twice the distance.', '$d = \\dfrac{ct}{2}$, with the time in seconds.'],
    solution: [`The pulse travels $ct = ${C_TEX} \\times ${t} \\times 10^{-6} = ${num(C * t * 1e-6, 0)}$ m, there and back.`, `The object is half of that away: ${num(d * 1000, 0)} m, which is ${num(d, 1)} km`],
  };
}

const MICHELSON = (sides: number, km: number) =>
  `In an experiment like Michelson's, light reflects from one face of a rotating mirror with ${sides} faces, travels to a fixed mirror ${q(km, 'km')} away and returns. The returning light reaches the detector only if the next face of the rotating mirror has turned exactly into the place of the first during the round trip.`;

function michelsonSpeed(rng: Rng): GenOutput {
  const sides = rng.pick([6, 8, 12]);
  const km = rng.pick([20, 25, 30, 35, 40, 50]);
  const f = Math.round(((rng.float(2.96, 3.04, 2) * 1e8) / (2 * km * 1000 * sides)) * 10) / 10;
  const c = 2 * km * 1000 * sides * f;
  return {
    prompt: `${MICHELSON(sides, km)} The lowest frequency of rotation at which this happens is found to be ${f} revolutions per second. Find the speed of light from these measurements. ${SCI_ASK}`,
    parts: [sciPart(c, 3, 'm/s')],
    hints: [`During the round trip the mirror makes $\\dfrac{1}{${sides}}$ of a revolution.`, `One revolution takes $\\dfrac{1}{f}$ seconds, so the round trip takes $\\dfrac{1}{${sides}f}$ seconds.`, 'speed = distance there and back ÷ time'],
    solution: [`The round trip takes $\\dfrac{1}{${sides}}$ of a revolution: $t = \\dfrac{1}{${sides} \\times ${f}}$ s`, `$c = \\dfrac{2d}{t} = 2 \\times ${km * 1000} \\times ${sides} \\times ${f} = ${sciTex(c)}$ m/s`],
  };
}

function michelsonFrequency(rng: Rng): GenOutput {
  const sides = rng.pick([6, 8, 12]);
  const km = rng.pick([15, 20, 25, 30, 35, 40, 50]);
  const f = C / (2 * km * 1000 * sides);
  return {
    prompt: `${C_NOTE} ${MICHELSON(sides, km)} What is the lowest frequency of rotation, in revolutions per second, at which this happens? Give your answer to the nearest whole number.`,
    parts: [rounded(f, 0, 'rev/s')],
    hints: ['Find the time for the round trip: distance there and back ÷ the speed of light.', `In that time the mirror must make $\\dfrac{1}{${sides}}$ of a revolution.`],
    solution: [`Round trip: $t = \\dfrac{2d}{c} = \\dfrac{2 \\times ${km * 1000}}{${C_TEX}} = ${sciTex((2 * km * 1000) / C)}$ s`, `The mirror makes $\\dfrac{1}{${sides}}$ of a revolution in that time, so one revolution takes $${sides}t$ and $f = \\dfrac{1}{${sides}t} = ${num(f, 0)}$ revolutions per second`],
  };
}

// ---------------------------------------------------------------------------- 3.2 and 3.4 images in mirrors and lenses

/** The image distance from the mirror equation, which is also the thin lens equation. */
const image = (f: number, d: number) => 1 / (1 / f - 1 / d);
const EQ = '$\\dfrac{1}{f} = \\dfrac{1}{d_o} + \\dfrac{1}{d_i}$';

/** How a question about a mirror or a lens is worded. Both use the same equation. */
interface Device {
  /** The converging one: "concave mirror", "converging lens". */
  converging: string;
  /** The diverging one: "convex mirror", "diverging lens". */
  diverging: string;
  /** Where an object is placed: "in front of", "from". */
  place: string;
  /** What a negative image distance means. */
  minus: string;
  short: string;
}
const MIRROR: Device = { converging: 'concave mirror', diverging: 'convex mirror', place: 'in front of', minus: 'Give the image distance with a minus sign if the image is behind the mirror.', short: 'mirror' };
const LENS: Device = { converging: 'converging lens', diverging: 'diverging lens', place: 'from', minus: 'Give the image distance with a minus sign if the image is on the same side of the lens as the object.', short: 'lens' };
const FOCAL = [8, 10, 12, 15, 20, 24, 25, 30];
const OBJECTS = ['A candle', 'A small lamp', 'A pencil', 'A toy figure', 'An arrow drawn on a card'];

const findImage = (f: number, d: number, dp = 1) => `$\\dfrac{1}{d_i} = \\dfrac{1}{f} - \\dfrac{1}{d_o} = \\dfrac{1}{${f < 0 ? `(${f})` : f}} - \\dfrac{1}{${d}}$, so $d_i = ${num(image(f, d), dp)}$ cm`;

/** A real image: the object is beyond the focus. */
function realCase(rng: Rng): { f: number; d: number; di: number } {
  return retry(
    () => {
      const f = rng.pick(FOCAL);
      const d = rng.int(Math.ceil(f * 1.2), f * 4);
      return { f, d, di: image(f, d) };
    },
    (t) => t.d !== t.f && t.di <= 150 && Math.abs(t.d - 2 * t.f) > 0,
  );
}

const realImage = (dev: Device) => (rng: Rng): GenOutput => {
  const c = realCase(rng);
  return {
    prompt: `${rng.pick(OBJECTS)} is placed ${q(c.d, 'cm')} ${dev.place} a ${dev.converging} with a focal length of ${q(c.f, 'cm')}. How far from the ${dev.short} is the image? Give your answer to 1 decimal place.`,
    parts: [rounded(c.di, 1, 'cm')],
    hints: [`Use ${EQ}, where $d_o$ is the object distance and $d_i$ is the image distance.`, 'Rearrange: $\\dfrac{1}{d_i} = \\dfrac{1}{f} - \\dfrac{1}{d_o}$, then turn the answer over.'],
    solution: [findImage(c.f, c.d), `The image distance is positive, so the image is real.`],
  };
};

function radiusImage(rng: Rng): GenOutput {
  const c = realCase(rng);
  return {
    prompt: `A concave mirror has a radius of curvature of ${q(2 * c.f, 'cm')}. An object is placed ${q(c.d, 'cm')} in front of it. Find the focal length of the mirror, and the distance of the image from the mirror, to 1 decimal place.`,
    parts: [numPart(c.f, { suffix: 'cm', label: 'Focal length' }), rounded(c.di, 1, 'cm', 'Image distance')],
    hints: ['The focal length of a curved mirror is half of its radius of curvature.', `Then use ${EQ}.`],
    solution: [`$f = \\dfrac{R}{2} = \\dfrac{${2 * c.f}}{2} = ${c.f}$ cm`, findImage(c.f, c.d)],
  };
}

const HEIGHT_NOTE = 'Give the image height with a minus sign if the image is upside down.';

const realHeight = (dev: Device) => (rng: Rng): GenOutput => {
  const c = realCase(rng);
  const h = rng.pick([2, 3, 4, 5, 6, 8]);
  const m = -c.di / c.d;
  return {
    prompt: `An object ${q(h, 'cm')} tall is placed ${q(c.d, 'cm')} ${dev.place} a ${dev.converging} with a focal length of ${q(c.f, 'cm')}. Find the image distance and the height of the image, each to 1 decimal place. ${HEIGHT_NOTE}`,
    parts: [rounded(c.di, 1, 'cm', 'Image distance'), rounded(m * h, 1, 'cm', 'Image height')],
    hints: [`Use ${EQ} for the image distance.`, 'The magnification is $m = -\\dfrac{d_i}{d_o}$, and the image height is $m$ × the object height.', 'A negative magnification means that the image is upside down.'],
    solution: [findImage(c.f, c.d), `$m = -\\dfrac{d_i}{d_o} = -\\dfrac{${num(c.di, 1)}}{${c.d}} = ${num(m, 3)}$`, `$h_i = mh_o = ${num(m, 3)} \\times ${h} = ${num(m * h, 1)}$ cm: a real image, upside down`],
  };
};

/** A virtual image in a converging mirror or lens: the object is inside the focus. */
const virtualImage = (dev: Device) => (rng: Rng): GenOutput => {
  const c = retry(
    () => {
      const f = rng.pick(FOCAL);
      const d = rng.int(Math.ceil(f * 0.25), Math.floor(f * 0.8));
      return { f, d, di: image(f, d) };
    },
    (t) => t.d < t.f && t.d >= 2,
  );
  const m = -c.di / c.d;
  const use = dev === MIRROR ? 'A person uses a concave mirror with a focal length of' : 'A stamp collector uses a converging lens with a focal length of';
  const thing = dev === MIRROR ? 'Their face is' : 'A stamp is';
  return {
    prompt: `${use} ${q(c.f, 'cm')} as a magnifier. ${thing} ${q(c.d, 'cm')} from the ${dev.short}. Find the image distance, to 1 decimal place, and the magnification, to 2 decimal places. ${dev.minus}`,
    parts: [rounded(c.di, 1, 'cm', 'Image distance'), rounded(m, 2, '', 'Magnification')],
    hints: [`Use ${EQ}. The object is inside the focal length, so $d_i$ comes out negative.`, 'The magnification is $m = -\\dfrac{d_i}{d_o}$.'],
    solution: [findImage(c.f, c.d), `The image distance is negative: the image is virtual.`, `$m = -\\dfrac{d_i}{d_o} = -\\dfrac{${num(c.di, 1)}}{${c.d}} = ${num(m, 2)}$: upright and enlarged`],
  };
};

/** A diverging mirror or lens has a negative focal length, and always gives a small, upright, virtual image. */
const divergingImage = (dev: Device) => (rng: Rng): GenOutput => {
  const f = -rng.pick(FOCAL);
  const d = rng.int(8, 60);
  const di = image(f, d);
  const m = -di / d;
  return {
    prompt: `A ${dev.diverging} has a focal length of ${q(f, 'cm')}. An object is placed ${q(d, 'cm')} ${dev.place} it. Find the image distance, to 1 decimal place, and the magnification, to 2 decimal places. ${dev.minus}`,
    parts: [rounded(di, 1, 'cm', 'Image distance'), rounded(m, 2, '', 'Magnification')],
    hints: [`Use ${EQ}, with the negative focal length.`, 'The magnification is $m = -\\dfrac{d_i}{d_o}$.'],
    solution: [findImage(f, d), `$m = -\\dfrac{d_i}{d_o} = -\\dfrac{${num(di, 1)}}{${d}} = ${num(m, 2)}$: a virtual image, upright and smaller than the object`],
  };
};

function focalFromScreen(rng: Rng): GenOutput {
  const c = retry(
    () => ({ d: rng.int(12, 90), di: rng.int(12, 90) }),
    (t) => t.d !== t.di,
  );
  const f = 1 / (1 / c.d + 1 / c.di);
  return {
    prompt: `A concave mirror forms a sharp image of a lamp on a screen. The lamp is ${q(c.d, 'cm')} from the mirror, and the screen is ${q(c.di, 'cm')} from the mirror. Find the focal length of the mirror and its radius of curvature, each to 1 decimal place.`,
    parts: [rounded(f, 1, 'cm', 'Focal length'), rounded(2 * f, 1, 'cm', 'Radius of curvature')],
    hints: [`An image on a screen is real, so both distances are positive in ${EQ}.`, 'The radius of curvature is twice the focal length.'],
    solution: [`$\\dfrac{1}{f} = \\dfrac{1}{${c.d}} + \\dfrac{1}{${c.di}}$, so $f = ${num(f, 1)}$ cm`, `$R = 2f = ${num(2 * f, 1)}$ cm`],
  };
}

function mirrorFromMagnification(rng: Rng): GenOutput {
  const m = rng.pick([1.5, 2, 2.5, 3, 4, 5]);
  const d = rng.pick([4, 5, 6, 8, 10, 12, 15, 20]);
  const di = -m * d;
  const f = (m * d) / (m - 1);
  return {
    prompt: `A concave mirror forms an upright image that is ${m} times as tall as an object placed ${q(d, 'cm')} in front of it. Find the image distance and the focal length of the mirror, each to 1 decimal place. ${MIRROR.minus}`,
    parts: [rounded(di, 1, 'cm', 'Image distance'), rounded(f, 1, 'cm', 'Focal length')],
    hints: ['An upright image has a positive magnification: $m = -\\dfrac{d_i}{d_o}$, so $d_i = -md_o$.', `Then use ${EQ}, with the negative image distance.`],
    solution: [`$d_i = -md_o = -${m} \\times ${d} = ${num(di, 1)}$ cm: a virtual image, behind the mirror`, `$\\dfrac{1}{f} = \\dfrac{1}{${d}} + \\dfrac{1}{(${num(di, 1)})}$, so $f = ${num(f, 1)}$ cm`],
  };
}

function projector(rng: Rng): GenOutput {
  const m = rng.pick([2, 3, 4, 5, 8, 10, 20]);
  const di = rng.pick([60, 80, 120, 150, 200, 240, 300]);
  const d = di / m;
  const f = 1 / (1 / d + 1 / di);
  return {
    prompt: `The converging lens of a projector forms a real image on a screen ${q(di, 'cm')} from the lens. The image is ${m} times as tall as the slide. Find the distance of the slide from the lens and the focal length of the lens, each to 1 decimal place.`,
    parts: [rounded(d, 1, 'cm', 'Object distance'), rounded(f, 1, 'cm', 'Focal length')],
    hints: ['The size of the magnification is the image distance ÷ the object distance.', `Then use ${EQ}. A real image has a positive image distance.`],
    solution: [`$d_o = \\dfrac{d_i}{${m}} = \\dfrac{${di}}{${m}} = ${num(d, 1)}$ cm`, `$\\dfrac{1}{f} = \\dfrac{1}{${num(d, 1)}} + \\dfrac{1}{${di}}$, so $f = ${num(f, 1)}$ cm`],
  };
}

function cameraLens(rng: Rng): GenOutput {
  const f = rng.pick([28, 35, 50, 85, 100, 135]);
  const metres = retry(
    () => rng.pick([0.4, 0.5, 0.8, 1, 1.5, 2, 3, 5]),
    (x) => x * 1000 > 4 * f,
  );
  const di = image(f, metres * 1000);
  return {
    prompt: `A camera has a converging lens with a focal length of ${q(f, 'mm')}. It takes a sharp picture of a flower ${q(metres, 'm')} from the lens. How far is the lens from the sensor, where the image forms? Give your answer in millimetres, to 1 decimal place.`,
    parts: [rounded(di, 1, 'mm')],
    hints: ['Change the object distance to millimetres, so that every distance has the same unit.', `Use ${EQ}.`],
    solution: [`$d_o = ${clean(metres * 1000)}$ mm`, `$\\dfrac{1}{d_i} = \\dfrac{1}{${f}} - \\dfrac{1}{${clean(metres * 1000)}}$, so $d_i = ${num(di, 1)}$ mm, a little more than the focal length`],
  };
}

const MIRROR_1: Q[] = [
  { q: 'What does the law of reflection say?', a: 'The angle of reflection equals the angle of incidence, both measured from the normal', w: ['The angle of reflection is twice the angle of incidence', 'The reflected ray always travels along the normal', 'The angle of reflection equals the angle between the ray and the mirror'], why: 'Both angles are measured from the normal, the line at right angles to the mirror where the ray strikes it.' },
  { q: 'A ray of light strikes a flat mirror at 30° to the surface of the mirror. What is the angle of reflection?', a: '60°', w: ['30°', '90°', '120°'], why: 'Angles are measured from the normal: the angle of incidence is $90° - 30° = 60°$, and the angle of reflection equals it.' },
  { q: 'Which describes the image of an object in a flat mirror?', a: 'Virtual, upright, the same size, and as far behind the mirror as the object is in front', w: ['Real, upside down and the same size', 'Virtual, upright and larger than the object', 'Real, upright and smaller than the object'], why: 'The reflected rays only seem to come from behind the mirror, so the image is virtual.' },
  { q: 'Which kind of curved mirror brings parallel rays of light together at a point?', a: 'A concave mirror', w: ['A convex mirror', 'A flat mirror', 'Every curved mirror'], why: 'A concave mirror curves inwards, like the inside of a spoon, and converges light. A convex mirror spreads it out.' },
  { q: 'A curved mirror has a radius of curvature of 40 cm. What is its focal length?', a: '20 cm', w: ['40 cm', '80 cm', '10 cm'], why: 'The focus is halfway between the mirror and its centre of curvature: $f = \\dfrac{R}{2}$.' },
  { q: 'A ray travels parallel to the principal axis and strikes a concave mirror. Where does it go after it reflects?', a: 'Through the focus', w: ['Through the centre of curvature', 'Back along its own path', 'Parallel to the principal axis'], why: 'This is how the focus is defined: rays parallel to the axis reflect through it.' },
  { q: 'What is a real image?', a: 'An image formed where rays of light actually meet, so that it can be caught on a screen', w: ['An image that is the right way up', 'An image that is the same size as the object', 'An image that is seen behind a mirror'], why: 'Light really passes through a real image. The rays only appear to come from a virtual image.' },
  { q: 'A ray passes through the focus of a concave mirror and then strikes the mirror. Where does it go after it reflects?', a: 'Parallel to the principal axis', w: ['Back through the focus', 'Through the centre of curvature', 'Along the surface of the mirror'], why: 'Light paths can be reversed: a ray parallel to the axis reflects through the focus, so a ray through the focus reflects parallel to the axis.' },
];

const MIRROR_2: Q[] = [
  { q: 'An object is placed beyond the centre of curvature of a concave mirror. What is the image like?', a: 'Real, upside down and smaller than the object', w: ['Real, upside down and larger than the object', 'Virtual, upright and larger than the object', 'Virtual, upright and smaller than the object'], why: 'A distant object gives a small real image between the focus and the centre of curvature.' },
  { q: 'An object is placed between the focus and the centre of curvature of a concave mirror. What is the image like?', a: 'Real, upside down and larger than the object', w: ['Real, upside down and smaller than the object', 'Virtual, upright and larger than the object', 'Virtual, upright and smaller than the object'], why: 'The image forms beyond the centre of curvature, and is enlarged.' },
  { q: 'An object is placed between a concave mirror and its focus. What is the image like?', a: 'Virtual, upright and larger than the object', w: ['Real, upside down and larger than the object', 'Real, upside down and smaller than the object', 'Virtual, upright and smaller than the object'], why: 'Inside the focus the reflected rays spread apart, and seem to come from a large image behind the mirror. A shaving mirror works this way.' },
  { q: 'An object is placed at the centre of curvature of a concave mirror. What is the image like?', a: 'Real, upside down and the same size as the object', w: ['Real, upside down and larger than the object', 'Virtual, upright and the same size as the object', 'No image is formed'], why: 'With $d_o = 2f$ the mirror equation gives $d_i = 2f$, so the magnification is $-1$.' },
  { q: 'An object is placed exactly at the focus of a concave mirror. What happens to the reflected rays?', a: 'They leave parallel to one another, and no image is formed', w: ['They meet at the centre of curvature', 'They meet at the focus', 'They form a small virtual image'], why: 'Rays from the focus reflect parallel to the axis, so they never meet.' },
  { q: 'What is the image in a convex mirror like?', a: 'Always virtual, upright and smaller than the object', w: ['Always real, upside down and smaller than the object', 'Virtual and larger than the object', 'Real or virtual, depending on where the object is'], why: 'A convex mirror spreads light out, so the rays never meet. They seem to come from a small image behind the mirror.' },
  { q: 'An image formed by a single curved mirror is upside down. What else must be true of it?', a: 'It is real', w: ['It is virtual', 'It is larger than the object', 'It is behind the mirror'], why: 'With one mirror, real images are always upside down and virtual images are always upright.' },
];

const MIRROR_3: Q[] = [
  { q: 'Why is a convex mirror used as the wing mirror of a car and as a security mirror in a shop?', a: 'It gives a wide field of view', w: ['It gives an enlarged image', 'It gives a real image', 'It shows objects at their true distance'], why: 'A convex mirror gathers light from a wide angle into a small upright image.' },
  { q: 'A makeup mirror gives an enlarged, upright image of the face. What kind of mirror is it, and where is the face?', a: 'A concave mirror, with the face inside the focal length', w: ['A convex mirror, with the face at any distance', 'A concave mirror, with the face beyond the centre of curvature', 'A flat mirror, with the face close to it'], why: 'Only a concave mirror with the object inside its focus gives an upright, enlarged image.' },
  { q: 'The bulb of a torch sits at the focus of a concave mirror. Why?', a: 'Rays from the focus reflect as a parallel beam', w: ['Rays from the focus reflect back to the bulb', 'The mirror makes the bulb brighter', 'Rays from the focus spread out as widely as possible'], why: 'A ray from the focus reflects parallel to the axis, so the light leaves as a beam.' },
  { q: 'A satellite dish is a concave reflector. Where is its receiver placed?', a: 'At the focus, where the parallel waves from the satellite are brought together', w: ['At the centre of curvature', 'On the surface of the dish', 'Far behind the dish'], why: 'Waves from a distant source arrive parallel and reflect through the focus.' },
  { q: 'Which of these cannot be shown on a screen?', a: 'A virtual image', w: ['A real image', 'An enlarged image', 'An upside-down image'], why: 'No light passes through a virtual image, so a screen placed there shows nothing.' },
  { q: 'A ray passes through the centre of curvature of a concave mirror and strikes the mirror. Where does it go after it reflects?', a: 'Back along its own path', w: ['Through the focus', 'Parallel to the principal axis', 'Along the surface of the mirror'], why: 'A line from the centre of curvature meets the mirror along the normal, so the ray reflects straight back.' },
  { q: 'An object is moved from far away towards the focus of a concave mirror. What happens to its real image?', a: 'It moves away from the mirror and grows', w: ['It moves towards the mirror and shrinks', 'It stays where it is', 'It moves towards the mirror and grows'], why: 'As $d_o$ falls towards $f$, $\\dfrac{1}{d_i} = \\dfrac{1}{f} - \\dfrac{1}{d_o}$ gets smaller, so $d_i$ and the magnification grow.' },
];

// ---------------------------------------------------------------------------- 3.3 refraction

const MATERIALS: Array<[string, number]> = [['ice', 1.31], ['water', 1.33], ['ethanol', 1.36], ['acrylic', 1.49], ['crown glass', 1.52], ['quartz', 1.54], ['flint glass', 1.66], ['sapphire', 1.77], ['zircon', 1.92], ['diamond', 2.42]];
const AIR_NOTE = 'The refractive index of air is 1.00.';
const index = ([name, n]: [string, number]) => `The refractive index of ${name} is ${n.toFixed(2)}.`;

function speedInMedium(rng: Rng): GenOutput {
  const m = rng.pick(MATERIALS);
  const v = C / m[1];
  return {
    prompt: `${C_NOTE} ${index(m)} Find the speed of light in ${m[0]}. ${SCI_ASK}`,
    parts: [sciPart(v, 3, 'm/s')],
    hints: ['The refractive index is the speed of light in a vacuum ÷ its speed in the material: $n = \\dfrac{c}{v}$'],
    solution: [`$v = \\dfrac{c}{n} = \\dfrac{${C_TEX}}{${m[1].toFixed(2)}} = ${sciTex(v)}$ m/s`],
  };
}

function indexFromSpeed(rng: Rng): GenOutput {
  const [what, lo, hi] = rng.pick([['a clear plastic', 1.8, 2.3], ['a kind of glass', 1.6, 2.05], ['a gemstone', 1.22, 1.95], ['a crystal', 1.3, 2.25], ['an oil', 1.95, 2.14]] as Array<[string, number, number]>);
  const v = rng.float(lo, hi, 2);
  const n = 3 / v;
  return {
    prompt: `${C_NOTE} Light travels through ${what} at $${v.toFixed(2)} \\times 10^{8}\\ \\text{m/s}$. Find the refractive index of the material, to 2 decimal places.`,
    parts: [rounded(n, 2, '')],
    hints: ['The refractive index is the speed of light in a vacuum ÷ its speed in the material: $n = \\dfrac{c}{v}$'],
    solution: [`$n = \\dfrac{c}{v} = \\dfrac{${C_TEX}}{${v.toFixed(2)} \\times 10^{8}} = ${num(n, 2)}$`],
  };
}

const SNELL = '$n_1\\sin\\theta_1 = n_2\\sin\\theta_2$';
const SNELL_HINTS = [`Snell's law: ${SNELL}, with both angles measured from the normal.`];

function snellInto(rng: Rng): GenOutput {
  const fromWater = rng.chance(0.3);
  const m = fromWater ? rng.pick(MATERIALS.filter((x) => x[1] > 1.45)) : rng.pick(MATERIALS);
  const n1 = fromWater ? 1.33 : 1;
  const a1 = rng.int(4, 15) * 5;
  const a2 = asin((n1 * Math.sin(a1 * RAD)) / m[1]);
  return {
    prompt: `${fromWater ? 'The refractive index of water is 1.33.' : AIR_NOTE} ${index(m)} A ray of light travels through ${fromWater ? 'water' : 'air'} and strikes a block of ${m[0]} at an angle of incidence of ${a1}°. Find the angle of refraction, to 1 decimal place.`,
    parts: [rounded(a2, 1, '°')],
    hints: [...SNELL_HINTS, 'Rearrange for $\\sin\\theta_2$, then use the inverse sine.'],
    solution: [`$\\sin\\theta_2 = \\dfrac{n_1\\sin\\theta_1}{n_2} = \\dfrac{${n1.toFixed(2)} \\times \\sin ${a1}°}{${m[1].toFixed(2)}} = ${num((n1 * Math.sin(a1 * RAD)) / m[1], 4)}$`, `$\\theta_2 = ${num(a2, 1)}°$. The light slows down, so it bends towards the normal.`],
  };
}

function snellIndex(rng: Rng): GenOutput {
  const n0 = rng.float(1.3, 1.9, 2);
  const a1 = rng.int(6, 14) * 5;
  const a2 = Math.round(asin(Math.sin(a1 * RAD) / n0) * 10) / 10;
  const n = Math.sin(a1 * RAD) / Math.sin(a2 * RAD);
  return {
    prompt: `${AIR_NOTE} A ray of light in air strikes the flat surface of a transparent block at an angle of incidence of ${a1}°. Inside the block the angle of refraction is ${a2.toFixed(1)}°. Find the refractive index of the block, to 2 decimal places.`,
    parts: [rounded(n, 2, '')],
    hints: [...SNELL_HINTS, 'With air as the first material, $n_2 = \\dfrac{\\sin\\theta_1}{\\sin\\theta_2}$.'],
    solution: [`$n_2 = \\dfrac{n_1\\sin\\theta_1}{\\sin\\theta_2} = \\dfrac{1.00 \\times \\sin ${a1}°}{\\sin ${a2.toFixed(1)}°} = ${num(n, 2)}$`],
  };
}

function wavelengthInMedium(rng: Rng): GenOutput {
  const m = rng.pick(MATERIALS);
  const nm = rng.int(80, 140) * 5;
  const f = C / (nm * 1e-9);
  const inside = nm / m[1];
  return {
    prompt: `${C_NOTE} ${index(m)} Light with a wavelength of ${q(nm, 'nm')} in air ${NM_NOTE} passes into ${m[0]}. Find the frequency of the light, in scientific notation to 3 significant digits, and its wavelength in the ${m[0]}, to the nearest nanometre.`,
    parts: [sciPart(f, 3, 'Hz', 'Frequency'), rounded(inside, 0, 'nm', `Wavelength in the ${m[0]}`)],
    hints: ['In air, $c = f\\lambda$ gives the frequency.', 'The frequency does not change when light enters a new material. The speed and the wavelength both fall by the factor $n$.', '$\\lambda_2 = \\dfrac{\\lambda_1}{n}$'],
    solution: [`$f = \\dfrac{c}{\\lambda} = \\dfrac{${C_TEX}}{${nm} \\times 10^{-9}} = ${sciTex(f)}$ Hz, in air and in the ${m[0]}`, `$\\lambda_2 = \\dfrac{\\lambda_1}{n} = \\dfrac{${nm}}{${m[1].toFixed(2)}} = ${num(inside, 0)}$ nm`],
  };
}

function snellOut(rng: Rng): GenOutput {
  const c = retry(
    () => {
      const m = rng.pick(MATERIALS);
      return { m, a1: rng.int(2, 8) * 5 };
    },
    (t) => t.m[1] * Math.sin(t.a1 * RAD) < 0.95,
  );
  const a2 = asin(c.m[1] * Math.sin(c.a1 * RAD));
  return {
    prompt: `${AIR_NOTE} ${index(c.m)} A ray of light travels through ${c.m[0]} and strikes its flat surface, on the other side of which is air, at an angle of incidence of ${c.a1}°. Find the angle of refraction in the air, to 1 decimal place.`,
    parts: [rounded(a2, 1, '°')],
    hints: [...SNELL_HINTS, `Here the first material is the ${c.m[0]}, and the second is the air.`],
    solution: [`$\\sin\\theta_2 = \\dfrac{n_1\\sin\\theta_1}{n_2} = \\dfrac{${c.m[1].toFixed(2)} \\times \\sin ${c.a1}°}{1.00} = ${num(c.m[1] * Math.sin(c.a1 * RAD), 4)}$`, `$\\theta_2 = ${num(a2, 1)}°$. The light speeds up, so it bends away from the normal.`],
  };
}

const REFRACTION_IDEAS: Q[] = [
  { q: 'Light passes from air into glass. Which of its properties does not change?', a: 'Its frequency', w: ['Its speed', 'Its wavelength', 'Its direction, if it meets the glass at an angle'], why: 'The frequency is set by the source. The speed falls in the glass, so the wavelength falls with it.' },
  { q: 'A ray of light passes from water into air at an angle. Which way does it bend?', a: 'Away from the normal, because it speeds up', w: ['Towards the normal, because it speeds up', 'Towards the normal, because it slows down', 'It does not bend'], why: 'Light bends away from the normal when it enters a material with a smaller refractive index, where it travels faster.' },
  { q: 'A ray of light strikes a glass block along the normal. What happens to it?', a: 'It slows down but does not change direction', w: ['It bends towards the normal', 'It bends away from the normal', 'It is totally reflected'], why: 'With $\\theta_1 = 0°$, Snell\'s law gives $\\theta_2 = 0°$. The ray still slows down.' },
  { q: 'Two materials have refractive indices of 1.33 and 2.42. In which one does light travel more slowly?', a: 'The one with the index of 2.42', w: ['The one with the index of 1.33', 'The speed is the same in both', 'It depends on the colour of the light only'], why: '$v = \\dfrac{c}{n}$: a larger refractive index means a lower speed.' },
  { q: 'A swimming pool looks shallower than it is. Why?', a: 'Light from the bottom bends away from the normal as it leaves the water', w: ['Light from the bottom is absorbed by the water', 'Light travels faster in water than in air', 'Light from the bottom is reflected back down'], why: 'The rays bend at the surface, and the eye traces them back in straight lines to a point above the real bottom.' },
];

// ---------------------------------------------------------------------------- 3.3 total internal reflection

const CRITICAL_IDEAS: Q[] = [
  { q: 'When can total internal reflection happen?', a: 'When light in a material meets a boundary with a material of smaller refractive index, at more than the critical angle', w: ['Whenever light passes from air into glass', 'Whenever light strikes a boundary along the normal', 'When light in a material meets a boundary with a material of larger refractive index'], why: 'Light must be trying to pass into a material in which it travels faster, and the angle of incidence must be greater than the critical angle.' },
  { q: 'Light in glass strikes the boundary with air at exactly the critical angle. What is the angle of refraction?', a: '90°: the refracted ray runs along the boundary', w: ['0°', '45°', 'The same as the critical angle'], why: 'The critical angle is the angle of incidence for which the angle of refraction is 90°.' },
  { q: 'How is light carried along an optical fibre?', a: 'By total internal reflection, again and again, at the wall of the glass core', w: ['By refraction out of the fibre and back in', 'By reflection from a metal coating', 'By travelling along the normal'], why: 'The light always meets the wall of the core at more than the critical angle, so none escapes.' },
  { q: 'Why does a cut diamond sparkle so much?', a: 'Its large refractive index gives a small critical angle, so light is totally reflected inside it many times', w: ['It gives out light of its own', 'It absorbs most of the light that enters it', 'Its refractive index is less than that of air'], why: 'With $n = 2.42$ the critical angle is only about 24°, so most light that enters is trapped and reflected before it leaves through the top.' },
  { q: 'A glass prism splits white light into colours. What is this called, and why does it happen?', a: 'Dispersion: the refractive index of glass is slightly different for each colour', w: ['Diffraction: the light spreads through a gap', 'Reflection: each colour reflects at a different angle', 'Polarization: the prism passes one direction of vibration'], why: 'Violet light travels more slowly in glass than red light, so it has a larger refractive index and bends more.' },
  { q: 'White light passes through a glass prism. Which colour is bent the most?', a: 'Violet', w: ['Red', 'Yellow', 'All colours are bent equally'], why: 'Glass has its largest refractive index for violet light and its smallest for red.' },
  { q: 'A ray of light in air strikes a block of glass. Can it be totally internally reflected at that surface?', a: 'No, because the light is passing into a material with a larger refractive index', w: ['Yes, if the angle of incidence is large enough', 'Yes, if the angle of incidence is small enough', 'Yes, at any angle'], why: 'Total internal reflection happens only when light tries to pass into a material with a smaller refractive index.' },
];

function criticalAir(rng: Rng): GenOutput {
  const m = rng.pick(MATERIALS);
  const c = asin(1 / m[1]);
  return {
    prompt: `${AIR_NOTE} ${index(m)} Find the critical angle for light that travels in ${m[0]} and meets a boundary with air, to 1 decimal place.`,
    parts: [rounded(c, 1, '°')],
    hints: ['At the critical angle, the angle of refraction is 90°.', `Snell's law with $\\theta_2 = 90°$: $\\sin\\theta_c = \\dfrac{n_2}{n_1}$, where $n_1$ is the material the light is in.`],
    solution: [`$\\sin\\theta_c = \\dfrac{n_2}{n_1} = \\dfrac{1.00}{${m[1].toFixed(2)}} = ${num(1 / m[1], 4)}$`, `$\\theta_c = ${num(c, 1)}°$`],
  };
}

function criticalTwoMedia(rng: Rng): GenOutput {
  const [a, b] = retry(
    () => rng.sample(MATERIALS, 2) as Array<[string, number]>,
    (t) => Math.abs(t[0][1] - t[1][1]) >= 0.1,
  );
  const [hi, lo] = a[1] > b[1] ? [a, b] : [b, a];
  const c = asin(lo[1] / hi[1]);
  return {
    prompt: `${index(hi)} ${index(lo)} Find the critical angle for light that travels in ${hi[0]} and meets a boundary with ${lo[0]}, to 1 decimal place.`,
    parts: [rounded(c, 1, '°')],
    hints: ['At the critical angle, the angle of refraction is 90°.', `$\\sin\\theta_c = \\dfrac{n_2}{n_1}$, where $n_1$ is the larger index: the material the light is in.`],
    solution: [`$\\sin\\theta_c = \\dfrac{n_2}{n_1} = \\dfrac{${lo[1].toFixed(2)}}{${hi[1].toFixed(2)}} = ${num(lo[1] / hi[1], 4)}$`, `$\\theta_c = ${num(c, 1)}°$`],
  };
}

function indexFromCritical(rng: Rng): GenOutput {
  const c = rng.float(24, 50, 1);
  const n = 1 / Math.sin(c * RAD);
  return {
    prompt: `${AIR_NOTE} The critical angle for light that travels in a transparent material and meets a boundary with air is ${c.toFixed(1)}°. Find the refractive index of the material, to 2 decimal places.`,
    parts: [rounded(n, 2, '')],
    hints: ['$\\sin\\theta_c = \\dfrac{n_2}{n_1}$, and here $n_2 = 1.00$ for the air.', 'So $n_1 = \\dfrac{1.00}{\\sin\\theta_c}$.'],
    solution: [`$n_1 = \\dfrac{n_2}{\\sin\\theta_c} = \\dfrac{1.00}{\\sin ${c.toFixed(1)}°} = ${num(n, 2)}$`],
  };
}

function reflectOrRefract(rng: Rng): GenOutput {
  const t = retry(
    () => {
      const m = rng.pick(MATERIALS);
      return { m, c: asin(1 / m[1]), a: rng.int(4, 14) * 5 };
    },
    (x) => Math.abs(x.a - x.c) >= 2 && Math.abs(x.a - x.c) <= 22,
  );
  const total = t.a > t.c;
  return {
    prompt: `${AIR_NOTE} ${index(t.m)} A ray of light travels in ${t.m[0]} and meets a boundary with air at an angle of incidence of ${t.a}°. Find the critical angle, to 1 decimal place, and decide what happens to the ray.`,
    parts: [rounded(t.c, 1, '°', 'Critical angle'), part(fixedChoice(['It is totally internally reflected', 'Most of it refracts out into the air'], total ? 0 : 1), { label: 'The ray' })],
    hints: ['$\\sin\\theta_c = \\dfrac{n_2}{n_1}$, where $n_1$ is the material the light is in.', 'Compare the angle of incidence with the critical angle. Above it, no light can leave.'],
    solution: [`$\\sin\\theta_c = \\dfrac{1.00}{${t.m[1].toFixed(2)}}$, so $\\theta_c = ${num(t.c, 1)}°$`, total ? `${t.a}° is greater than the critical angle, so the ray is totally internally reflected.` : `${t.a}° is less than the critical angle, so most of the light refracts out into the air, and a little is reflected.`],
  };
}

// ---------------------------------------------------------------------------- 3.4 lenses

const LENS_1: Q[] = [
  { q: 'Which kind of lens brings parallel rays of light together at a point?', a: 'A converging lens, which is thicker in the middle than at its edges', w: ['A diverging lens, which is thinner in the middle than at its edges', 'A flat sheet of glass', 'Every lens'], why: 'A converging (convex) lens bends rays towards its axis. A diverging (concave) lens spreads them apart.' },
  { q: 'How does a lens change the direction of light?', a: 'By refraction at its two curved surfaces', w: ['By reflection from its front surface', 'By diffraction at its edges', 'By absorbing some colours'], why: 'Light bends as it enters the glass and again as it leaves.' },
  { q: 'A ray travels parallel to the principal axis and passes through a converging lens. Where does it go next?', a: 'Through the focus on the far side of the lens', w: ['Straight on, without bending', 'Back through the focus on the near side', 'Through the centre of the lens'], why: 'This is how the focus of a converging lens is defined.' },
  { q: 'A ray passes through the centre of a thin lens. What happens to it?', a: 'It carries straight on', w: ['It bends towards the focus', 'It bends away from the axis', 'It is reflected back'], why: 'At its centre the two faces of a thin lens are parallel, so the ray is not turned.' },
  { q: 'What is the focal length of a lens?', a: 'The distance from the centre of the lens to its focus', w: ['The thickness of the lens', 'The distance from the object to the image', 'The width of the lens'], why: 'Parallel rays are brought to the focus, one focal length from the lens.' },
  { q: 'A ray passes through the focus on the near side of a converging lens and then through the lens. Where does it go next?', a: 'Parallel to the principal axis', w: ['Through the focus on the far side', 'Through the centre of the lens', 'Back towards the object'], why: 'Light paths can be reversed: parallel rays go to the focus, so rays from the focus leave parallel.' },
  { q: 'Parallel rays pass through a diverging lens. What do they do?', a: 'They spread apart, as if they came from a focus on the side they entered', w: ['They meet at a focus on the far side', 'They carry straight on', 'They are reflected back'], why: 'A diverging lens has a virtual focus: the rays only seem to come from it.' },
];

const LENS_2: Q[] = [
  { q: 'An object is far from a converging lens, at more than twice its focal length. What is the image like?', a: 'Real, upside down and smaller than the object', w: ['Real, upside down and larger than the object', 'Virtual, upright and larger than the object', 'Virtual, upright and smaller than the object'], why: 'A camera and the eye both form small real images of distant objects in this way.' },
  { q: 'An object is between one and two focal lengths from a converging lens. What is the image like?', a: 'Real, upside down and larger than the object', w: ['Real, upside down and smaller than the object', 'Virtual, upright and larger than the object', 'Virtual, upright and smaller than the object'], why: 'A projector works this way: the slide is just beyond the focus, and the large image falls on a distant screen.' },
  { q: 'An object is closer to a converging lens than its focus. What is the image like?', a: 'Virtual, upright and larger than the object', w: ['Real, upside down and larger than the object', 'Real, upside down and smaller than the object', 'Virtual, upright and smaller than the object'], why: 'This is a magnifying glass: the rays spread apart after the lens and seem to come from a large image behind the object.' },
  { q: 'An object is exactly two focal lengths from a converging lens. What is the image like?', a: 'Real, upside down and the same size as the object', w: ['Real, upside down and larger than the object', 'Virtual, upright and the same size as the object', 'No image is formed'], why: 'With $d_o = 2f$ the lens equation gives $d_i = 2f$, so the magnification is $-1$.' },
  { q: 'What is the image formed by a diverging lens like?', a: 'Always virtual, upright and smaller than the object', w: ['Always real, upside down and smaller than the object', 'Virtual and larger than the object', 'Real or virtual, depending on where the object is'], why: 'A diverging lens spreads rays apart, so they never meet. They seem to come from a small image on the object\'s side of the lens.' },
  { q: 'An object is placed at the focus of a converging lens. What happens to the light that passes through the lens?', a: 'It leaves as parallel rays, and no image is formed', w: ['It meets at the focus on the far side', 'It forms a small virtual image', 'It is reflected back to the object'], why: 'Rays from the focus leave the lens parallel to the axis.' },
  { q: 'A real image formed by a converging lens is on which side of the lens?', a: 'The side opposite to the object', w: ['The same side as the object', 'Inside the lens', 'Either side, depending on the colour of the light'], why: 'Light passes through a lens, so a real image forms where the rays meet on the far side. A mirror forms its real images in front of it.' },
];

const LENS_3: Q[] = [
  { q: 'What kind of image does the lens of your eye form on the retina?', a: 'Real, upside down and smaller than the object', w: ['Virtual, upright and smaller than the object', 'Real, upright and the same size as the object', 'Virtual, upside down and larger than the object'], why: 'The eye is a converging lens with the object far beyond its focus. The brain turns the picture the right way up.' },
  { q: 'A short-sighted eye brings the light from distant objects to a focus in front of the retina. Which lens corrects it?', a: 'A diverging lens', w: ['A converging lens', 'A flat sheet of glass', 'A lens with a shorter focal length than the eye'], why: 'A diverging lens spreads the rays a little before they enter the eye, so they meet further back, on the retina.' },
  { q: 'A long-sighted eye cannot bend the light from near objects enough to focus it on the retina. Which lens corrects it?', a: 'A converging lens', w: ['A diverging lens', 'A flat sheet of glass', 'A coloured filter'], why: 'A converging lens adds to the bending of the eye, so the rays meet sooner, on the retina.' },
  { q: 'Two converging lenses are made of the same glass. One is much more strongly curved than the other. How do their focal lengths compare?', a: 'The more strongly curved lens has the shorter focal length', w: ['The more strongly curved lens has the longer focal length', 'They have the same focal length', 'It depends on the size of the object'], why: 'A more strongly curved lens bends light more, so it brings parallel rays together sooner.' },
  { q: 'The top half of a converging lens is covered with card. What happens to the real image it forms on a screen?', a: 'The whole image is still there, but it is dimmer', w: ['The top half of the image disappears', 'The bottom half of the image disappears', 'The image turns the right way up'], why: 'Every part of the lens sends light to every part of the image. Covering half of it cuts the light, not the picture.' },
  { q: 'A magnifying glass is used to burn paper with sunlight. How far from the paper should the lens be held?', a: 'One focal length', w: ['Two focal lengths', 'Half a focal length', 'As close as possible'], why: 'The rays of the Sun arrive parallel, and the lens brings them together at its focus.' },
  { q: 'A slide is moved a little closer to the lens of a projector, but stays outside the focus. What must be done to keep the picture sharp, and how does the picture change?', a: 'Move the screen further away: the picture becomes larger', w: ['Move the screen closer: the picture becomes smaller', 'Move the screen closer: the picture becomes larger', 'Leave the screen where it is: the picture does not change'], why: 'As $d_o$ falls towards $f$, $d_i$ grows, and so does the magnification.' },
];

// ---------------------------------------------------------------------------- 3.5 diffraction and interference

const INTERFERENCE_IDEAS: Q[] = [
  { q: 'What is diffraction?', a: 'The spreading of a wave as it passes through a gap or round an edge', w: ['The bending of a wave as it changes speed', 'The bouncing of a wave from a surface', 'The splitting of white light into colours by a prism'], why: 'Diffraction is strongest when the gap is about as wide as the wavelength.' },
  { q: 'Thomas Young passed light through two narrow slits and saw bright and dark bands on a screen. What did this show?', a: 'Light behaves as a wave', w: ['Light is a stream of particles', 'Light travels in perfectly straight lines', 'Light needs a material to travel through'], why: 'Only waves interfere. Particles would give two bright bands, one behind each slit.' },
  { q: 'In a double-slit pattern, what makes a bright fringe?', a: 'Waves from the two slits arrive in step and add: constructive interference', w: ['Waves from the two slits arrive out of step and cancel', 'Light from only one slit reaches that point', 'The slits act as lenses'], why: 'Crest meets crest when the path difference is a whole number of wavelengths.' },
  { q: 'In a double-slit pattern, what is the path difference at a dark fringe?', a: 'An odd number of half wavelengths', w: ['A whole number of wavelengths', 'Zero', 'Exactly one wavelength'], why: 'Crest meets trough when one wave has travelled half a wavelength further, or one and a half, and so on, so the waves cancel.' },
  { q: 'What is the path difference at the central bright fringe of a double-slit pattern?', a: 'Zero', w: ['Half a wavelength', 'One wavelength', 'Two wavelengths'], why: 'The centre of the pattern is the same distance from both slits.' },
  { q: 'The red light in a double-slit experiment is replaced by blue light. What happens to the fringes?', a: 'They move closer together', w: ['They move further apart', 'They stay where they are', 'They disappear'], why: 'The spacing of the fringes is $\\dfrac{\\lambda L}{d}$, and blue light has a shorter wavelength than red.' },
  { q: 'The two slits of a double-slit experiment are moved closer together. What happens to the fringes?', a: 'They move further apart', w: ['They move closer together', 'They stay where they are', 'They become dimmer but do not move'], why: 'The spacing of the fringes is $\\dfrac{\\lambda L}{d}$: a smaller slit separation gives a wider pattern.' },
];

const SLIT_MM = [0.1, 0.12, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5];
const SCREEN_M = [1, 1.2, 1.5, 2, 2.5, 3, 4];
const SPACING = '$\\Delta x = \\dfrac{\\lambda L}{d}$';

function slitCase(rng: Rng): { nm: number; d: number; len: number; dx: number } {
  return retry(
    () => {
      const nm = rng.int(40, 70) * 10;
      const d = rng.pick(SLIT_MM);
      const len = rng.pick(SCREEN_M);
      return { nm, d, len, dx: (nm * 1e-9 * len) / (d * 1e-3) * 1000 };
    },
    (t) => t.dx >= 2 && t.dx <= 25,
  );
}

function slitWavelength(rng: Rng): GenOutput {
  const c = slitCase(rng);
  const dx = Math.round(c.dx * 100) / 100;
  const nm = ((dx * 1e-3 * c.d * 1e-3) / c.len) * 1e9;
  return {
    prompt: `Light passes through two narrow slits that are ${q(c.d, 'mm')} apart. On a screen ${q(c.len, 'm')} away, the bright fringes are ${q(dx.toFixed(2), 'mm')} apart. Find the wavelength of the light, to the nearest nanometre ${NM_NOTE}.`,
    parts: [rounded(nm, 0, 'nm')],
    hints: [`The spacing of the fringes is ${SPACING}, where $d$ is the distance between the slits and $L$ is the distance to the screen.`, 'Rearrange: $\\lambda = \\dfrac{\\Delta x \\, d}{L}$, with every length in metres.'],
    solution: [`$\\lambda = \\dfrac{\\Delta x \\, d}{L} = \\dfrac{${dx.toFixed(2)} \\times 10^{-3} \\times ${c.d} \\times 10^{-3}}{${c.len}} = ${sciTex(nm * 1e-9)}$ m`, `That is ${num(nm, 0)} nm`],
  };
}

function slitSpacing(rng: Rng): GenOutput {
  const c = slitCase(rng);
  return {
    prompt: `Light with a wavelength of ${q(c.nm, 'nm')} ${NM_NOTE} passes through two narrow slits that are ${q(c.d, 'mm')} apart. How far apart are the bright fringes on a screen ${q(c.len, 'm')} away? Give your answer in millimetres, to 2 decimal places.`,
    parts: [rounded(c.dx, 2, 'mm')],
    hints: [`The spacing of the fringes is ${SPACING}, where $d$ is the distance between the slits and $L$ is the distance to the screen.`, 'Put every length in metres, and change the answer to millimetres.'],
    solution: [`$\\Delta x = \\dfrac{\\lambda L}{d} = \\dfrac{${c.nm} \\times 10^{-9} \\times ${c.len}}{${c.d} \\times 10^{-3}} = ${sciTex(c.dx / 1000)}$ m`, `That is ${num(c.dx, 2)} mm`],
  };
}

const ORDINAL = ['', 'first', 'second', 'third', 'fourth', 'fifth'];

function nthFringe(rng: Rng): GenOutput {
  const c = slitCase(rng);
  const n = rng.int(2, 5);
  const x = Math.round(n * c.dx * 10) / 10;
  const nm = ((x * 1e-3 * c.d * 1e-3) / (n * c.len)) * 1e9;
  return {
    prompt: `Light passes through two narrow slits that are ${q(c.d, 'mm')} apart and falls on a screen ${q(c.len, 'm')} away. The ${ORDINAL[n]} bright fringe from the centre is ${q(x.toFixed(1), 'mm')} from the central bright fringe. Find the wavelength of the light, to the nearest nanometre ${NM_NOTE}.`,
    parts: [rounded(nm, 0, 'nm')],
    hints: ['The $n$th bright fringe is $n$ fringe spacings from the centre: $x = \\dfrac{n\\lambda L}{d}$', 'Rearrange: $\\lambda = \\dfrac{xd}{nL}$, with every length in metres.'],
    solution: [`$\\lambda = \\dfrac{xd}{nL} = \\dfrac{${x.toFixed(1)} \\times 10^{-3} \\times ${c.d} \\times 10^{-3}}{${n} \\times ${c.len}} = ${sciTex(nm * 1e-9)}$ m`, `That is ${num(nm, 0)} nm`],
  };
}

function slitAngle(rng: Rng): GenOutput {
  const c = retry(
    () => ({ nm: rng.int(40, 70) * 10, um: rng.pick([2, 2.5, 3, 4, 5, 6, 8, 10]), n: rng.int(1, 3) }),
    (t) => (t.n * t.nm * 1e-9) / (t.um * 1e-6) <= 0.7,
  );
  const s = (c.n * c.nm * 1e-9) / (c.um * 1e-6);
  const angle = asin(s);
  return {
    prompt: `Light with a wavelength of ${q(c.nm, 'nm')} ${NM_NOTE} passes through two slits that are $${c.um.toFixed(1)} \\times 10^{-6}\\ \\text{m}$ apart. At what angle from the centre of the pattern is the ${ORDINAL[c.n]} bright fringe? Give your answer to 1 decimal place.`,
    parts: [rounded(angle, 1, '°')],
    hints: ['Bright fringes are where the path difference is a whole number of wavelengths: $d\\sin\\theta = n\\lambda$', 'Rearrange for $\\sin\\theta$, with both lengths in metres.'],
    solution: [`$\\sin\\theta = \\dfrac{n\\lambda}{d} = \\dfrac{${c.n} \\times ${c.nm} \\times 10^{-9}}{${c.um.toFixed(1)} \\times 10^{-6}} = ${num(s, 4)}$`, `$\\theta = ${num(angle, 1)}°$`],
  };
}

function pathDifference(rng: Rng): GenOutput {
  const nm = rng.int(40, 70) * 10;
  const n = rng.int(1, 4);
  const dark = rng.chance(0.5);
  const diff = dark ? (n - 0.5) * nm : n * nm;
  return {
    prompt: `Light with a wavelength of ${q(nm, 'nm')} passes through two slits and makes a pattern of fringes on a screen. How much further has the light from one slit travelled than the light from the other when they meet at the ${ORDINAL[n]} ${dark ? 'dark' : 'bright'} fringe from the centre? Give your answer in nanometres.`,
    parts: [numPart(diff, { suffix: 'nm' })],
    hints: ['At a bright fringe the path difference is a whole number of wavelengths: $n\\lambda$.', 'At a dark fringe it is an odd number of half wavelengths: $\\left(n - \\dfrac{1}{2}\\right)\\lambda$ for the $n$th dark fringe.'],
    solution: [dark ? `The ${ORDINAL[n]} dark fringe: $\\left(${n} - \\dfrac{1}{2}\\right)\\lambda = ${n - 0.5} \\times ${nm} = ${diff}$ nm` : `The ${ORDINAL[n]} bright fringe: $n\\lambda = ${n} \\times ${nm} = ${diff}$ nm`],
  };
}

// ---------------------------------------------------------------------------- 3.5 the diffraction grating

const GRATING_IDEAS: Q[] = [
  { q: 'What is a diffraction grating?', a: 'A plate with a very large number of equally spaced parallel slits', w: ['A plate with one wide slit', 'A curved mirror', 'A prism of glass'], why: 'A grating has hundreds of slits in every millimetre. Light from all of them interferes.' },
  { q: 'How do the bright lines made by a diffraction grating compare with the fringes of a double slit?', a: 'They are sharper, brighter and further apart', w: ['They are wider, dimmer and closer together', 'They are exactly the same', 'They are in the same places but dimmer'], why: 'Many slits send more light, and the light adds up in step only at very exact angles. The slits are also much closer together, which spreads the pattern.' },
  { q: 'White light passes through a diffraction grating. What is seen in the centre of the pattern?', a: 'A white line, because every colour has its zero-order maximum there', w: ['A dark line', 'A red line', 'A violet line'], why: 'With a path difference of zero, every wavelength interferes constructively straight ahead.' },
  { q: 'White light passes through a diffraction grating and makes a spectrum on each side of the centre. Which colour is turned through the largest angle?', a: 'Red, because it has the longest wavelength', w: ['Violet, because it has the shortest wavelength', 'Green, because it is in the middle', 'All colours are turned through the same angle'], why: '$d\\sin\\theta = n\\lambda$: a longer wavelength gives a larger angle. A prism does the opposite and bends violet most.' },
  { q: 'A grating is replaced by one with more lines in each millimetre. What happens to the pattern?', a: 'The bright lines spread further apart', w: ['The bright lines move closer together', 'Nothing changes', 'The pattern disappears'], why: 'More lines in each millimetre means a smaller slit separation $d$, and $\\sin\\theta = \\dfrac{n\\lambda}{d}$ grows.' },
  { q: 'Why is a diffraction grating used in a spectroscope, to study the light from a star or a hot gas?', a: 'It separates the light into its wavelengths, which can then be measured from their angles', w: ['It makes the light brighter', 'It changes the wavelengths of the light', 'It absorbs all colours but one'], why: 'Each wavelength leaves the grating at its own angle, so the angles give the wavelengths.' },
];

const LINES = [100, 200, 250, 300, 400, 500, 600];
const GRATING = '$d\\sin\\theta = n\\lambda$';
const spacingTex = (lines: number) => sciTex(1e-3 / lines);

function gratingSpacing(rng: Rng): GenOutput {
  const perCm = rng.chance(0.4);
  const lines = rng.pick([50, 80, 100, 120, 150, 200, 250, 300, 400, 500, 600, 750, 800, 1000, 1200]);
  const d = 1e-3 / lines;
  return {
    prompt: `A diffraction grating has ${perCm ? `${lines * 10} lines in each centimetre` : `${lines} lines in each millimetre`}. Find the distance between one slit and the next, in metres. ${SCI_ASK}`,
    parts: [sciPart(d, 3, 'm')],
    hints: [`The slits are equally spaced, so the distance between them is the length ÷ the number of lines in that length.`, perCm ? 'One centimetre is $10^{-2}$ m.' : 'One millimetre is $10^{-3}$ m.'],
    solution: [`$d = \\dfrac{${perCm ? '10^{-2}' : '10^{-3}'}}{${perCm ? lines * 10 : lines}} = ${sciTex(d)}$ m`],
  };
}

function gratingCase(rng: Rng): { lines: number; nm: number; n: number; s: number } {
  return retry(
    () => {
      const lines = rng.pick(LINES);
      const nm = rng.int(40, 70) * 10;
      const n = rng.int(1, 3);
      return { lines, nm, n, s: (n * nm * 1e-9 * lines) / 1e-3 };
    },
    (t) => t.s <= 0.9 && t.s >= 0.08,
  );
}

function gratingAngle(rng: Rng): GenOutput {
  const c = gratingCase(rng);
  const angle = asin(c.s);
  return {
    prompt: `Light with a wavelength of ${q(c.nm, 'nm')} ${NM_NOTE} passes through a diffraction grating that has ${c.lines} lines in each millimetre. At what angle from the straight-through direction is the ${ORDINAL[c.n]}-order bright line? Give your answer to 1 decimal place.`,
    parts: [rounded(angle, 1, '°')],
    hints: ['Find the distance between the slits first: $d = \\dfrac{10^{-3}}{\\text{lines in each millimetre}}$ metres.', `Then use ${GRATING}.`],
    solution: [`$d = \\dfrac{10^{-3}}{${c.lines}} = ${spacingTex(c.lines)}$ m`, `$\\sin\\theta = \\dfrac{n\\lambda}{d} = \\dfrac{${c.n} \\times ${c.nm} \\times 10^{-9}}{${spacingTex(c.lines)}} = ${num(c.s, 4)}$, so $\\theta = ${num(angle, 1)}°$`],
  };
}

function gratingWavelength(rng: Rng): GenOutput {
  const c = gratingCase(rng);
  const angle = Math.round(asin(c.s) * 10) / 10;
  const nm = ((1e-3 / c.lines) * Math.sin(angle * RAD)) / c.n / 1e-9;
  return {
    prompt: `Light passes through a diffraction grating that has ${c.lines} lines in each millimetre. The ${ORDINAL[c.n]}-order bright line is seen at ${angle.toFixed(1)}° from the straight-through direction. Find the wavelength of the light, to the nearest nanometre ${NM_NOTE}.`,
    parts: [rounded(nm, 0, 'nm')],
    hints: ['Find the distance between the slits first: $d = \\dfrac{10^{-3}}{\\text{lines in each millimetre}}$ metres.', `Then use ${GRATING}, rearranged: $\\lambda = \\dfrac{d\\sin\\theta}{n}$`],
    solution: [`$d = \\dfrac{10^{-3}}{${c.lines}} = ${spacingTex(c.lines)}$ m`, `$\\lambda = \\dfrac{d\\sin\\theta}{n} = \\dfrac{${spacingTex(c.lines)} \\times \\sin ${angle.toFixed(1)}°}{${c.n}} = ${sciTex(nm * 1e-9)}$ m, which is ${num(nm, 0)} nm`],
  };
}

function gratingOrders(rng: Rng): GenOutput {
  const c = retry(
    () => {
      const lines = rng.pick(LINES);
      const nm = rng.int(40, 70) * 10;
      return { lines, nm, ratio: 1e-3 / lines / (nm * 1e-9) };
    },
    (t) => Math.abs(t.ratio - Math.round(t.ratio)) > 0.04,
  );
  const top = Math.floor(c.ratio);
  return {
    prompt: `Light with a wavelength of ${q(c.nm, 'nm')} ${NM_NOTE} passes through a diffraction grating that has ${c.lines} lines in each millimetre. What is the highest order of bright line that the grating can make, and how many bright lines are there altogether, counting the one in the centre?`,
    parts: [numPart(top, { label: 'Highest order' }), numPart(2 * top + 1, { label: 'Number of bright lines' })],
    hints: [`${GRATING}, and $\\sin\\theta$ cannot be more than 1.`, 'So $n$ cannot be more than $\\dfrac{d}{\\lambda}$. Take the whole number below it.', 'Each order appears on both sides of the centre.'],
    solution: [`$d = \\dfrac{10^{-3}}{${c.lines}} = ${spacingTex(c.lines)}$ m`, `$\\dfrac{d}{\\lambda} = \\dfrac{${spacingTex(c.lines)}}{${c.nm} \\times 10^{-9}} = ${num(c.ratio, 2)}$, so the highest order is ${top}`, `Orders 1 to ${top} on each side, and the centre: $2 \\times ${top} + 1 = ${2 * top + 1}$ bright lines`],
  };
}

function gratingScreen(rng: Rng): GenOutput {
  const c = retry(
    () => gratingCase(rng),
    (t) => t.n === 1 && t.s <= 0.45,
  );
  const len = rng.pick([0.5, 0.8, 1, 1.2, 1.5, 2]);
  const angle = asin(c.s);
  const x = len * Math.tan(angle * RAD) * 100;
  return {
    prompt: `Light with a wavelength of ${q(c.nm, 'nm')} ${NM_NOTE} passes through a diffraction grating that has ${c.lines} lines in each millimetre, and falls on a screen ${q(len, 'm')} from the grating. Find the angle of the first-order bright line, to 1 decimal place, and its distance from the central bright line on the screen, in centimetres to 1 decimal place.`,
    parts: [rounded(angle, 1, '°', 'Angle'), rounded(x, 1, 'cm', 'Distance on the screen')],
    hints: [`Find $d$, then use ${GRATING} with $n = 1$.`, 'The screen, the straight-through beam and the first-order beam make a right triangle: $\\tan\\theta = \\dfrac{x}{L}$'],
    solution: [`$d = \\dfrac{10^{-3}}{${c.lines}} = ${spacingTex(c.lines)}$ m`, `$\\sin\\theta = \\dfrac{\\lambda}{d} = ${num(c.s, 4)}$, so $\\theta = ${num(angle, 1)}°$`, `$x = L\\tan\\theta = ${len} \\times \\tan ${num(angle, 2)}° = ${num(x / 100, 4)}$ m, which is ${num(x, 1)} cm`],
  };
}

export const LIGHT_SKILLS: SkillDef[] = [
  skill({ id: 'p30-em-waves', name: 'Electromagnetic waves', description: 'Describe how electromagnetic waves are produced and what they are made of, and put the regions of the electromagnetic spectrum in order.', outcomes: ['30-C1'], lessonId: L(1), format: 'mc', gen: bank([EM_1, EM_2, EM_3], ['The spectrum, from the lowest frequency: radio, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays']) }),
  skill({ id: 'p30-light-speed', name: 'The speed of light', description: 'Use c = fλ for electromagnetic waves, find travel times and distances for light, and work with a rotating-mirror measurement of its speed.', outcomes: ['30-C1'], lessonId: L(1), calculator: true, gen: bank([either(wavelengthFromFrequency, frequencyFromWavelength), either(lightTime, radarDistance), either(michelsonSpeed, michelsonFrequency)], ['Every electromagnetic wave travels through a vacuum at $c = 3.00 \\times 10^{8}$ m/s, and $c = f\\lambda$']) }),
  skill({ id: 'p30-mirror-rays', name: 'Reflection and curved mirrors', description: 'Use the law of reflection and the rays of a curved mirror to describe the image that a concave or a convex mirror forms.', outcomes: ['30-C1'], lessonId: L(2), format: 'mc', gen: bank([MIRROR_1, MIRROR_2, MIRROR_3], ['A ray parallel to the axis reflects through the focus, and a ray through the focus reflects parallel to the axis']) }),
  skill({ id: 'p30-mirror-equation', name: 'The mirror equation', description: 'Use the mirror equation and the magnification to find where the image in a curved mirror is, how large it is and whether it is real.', outcomes: ['30-C1'], lessonId: L(2), calculator: true, gen: bank([either(realImage(MIRROR), radiusImage), either(realHeight(MIRROR), virtualImage(MIRROR)), either(divergingImage(MIRROR), focalFromScreen, mirrorFromMagnification)], ['$\\dfrac{1}{f} = \\dfrac{1}{d_o} + \\dfrac{1}{d_i}$ and $m = -\\dfrac{d_i}{d_o}$. A negative image distance means a virtual image']) }),
  skill({ id: 'p30-snell', name: 'Refraction and Snell’s law', description: 'Relate the refractive index to the speed of light in a material, and use Snell’s law to find angles, indices and wavelengths.', outcomes: ['30-C1'], lessonId: L(3), calculator: true, gen: bank([either(speedInMedium, indexFromSpeed), either(snellInto, snellIndex), either(wavelengthInMedium, snellOut, fromBank(REFRACTION_IDEAS, ['Light bends towards the normal when it slows down, and away from the normal when it speeds up. Its frequency does not change.']))], ['$n = \\dfrac{c}{v}$, and Snell’s law is $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$']) }),
  skill({ id: 'p30-critical-angle', name: 'Total internal reflection', description: 'Find the critical angle for a boundary, decide whether light is totally internally reflected, and explain optical fibres and dispersion.', outcomes: ['30-C1'], lessonId: L(3), calculator: true, gen: bank([CRITICAL_IDEAS, either(criticalAir, indexFromCritical), either(criticalTwoMedia, reflectOrRefract)], ['At the critical angle the refracted ray runs along the boundary: $\\sin\\theta_c = \\dfrac{n_2}{n_1}$']) }),
  skill({ id: 'p30-lens-rays', name: 'Lenses and their images', description: 'Use the rays of a converging or a diverging lens to describe the image it forms, and explain how lenses are used in the eye and in instruments.', outcomes: ['30-C1'], lessonId: L(4), format: 'mc', gen: bank([LENS_1, LENS_2, LENS_3], ['A ray parallel to the axis passes through the focus, and a ray through the centre of the lens carries straight on']) }),
  skill({ id: 'p30-lens-equation', name: 'The thin lens equation', description: 'Use the thin lens equation and the magnification to find where the image formed by a lens is, how large it is and whether it is real.', outcomes: ['30-C1'], lessonId: L(4), calculator: true, gen: bank([realImage(LENS), either(realHeight(LENS), virtualImage(LENS)), either(divergingImage(LENS), projector, cameraLens)], ['$\\dfrac{1}{f} = \\dfrac{1}{d_o} + \\dfrac{1}{d_i}$ and $m = -\\dfrac{d_i}{d_o}$. A negative image distance means a virtual image']) }),
  skill({ id: 'p30-double-slit', name: 'Diffraction and double-slit interference', description: 'Explain the fringes of Young’s double-slit experiment, and use them to find the wavelength of light.', outcomes: ['30-C1'], lessonId: L(5), calculator: true, gen: bank([INTERFERENCE_IDEAS, either(slitWavelength, slitSpacing), either(nthFringe, slitAngle, pathDifference)], ['The spacing of the fringes is $\\Delta x = \\dfrac{\\lambda L}{d}$, and bright fringes are where $d\\sin\\theta = n\\lambda$']) }),
  skill({ id: 'p30-grating', name: 'The diffraction grating', description: 'Find the slit separation of a diffraction grating, and use d sin θ = nλ to find the angles of its bright lines and the wavelength of light.', outcomes: ['30-C1'], lessonId: L(5), calculator: true, gen: bank([either(gratingSpacing, fromBank(GRATING_IDEAS, ['A grating has many equally spaced slits. Bright lines are where $d\\sin\\theta = n\\lambda$.'])), either(gratingAngle, gratingWavelength), either(gratingOrders, gratingScreen)], ['$d\\sin\\theta = n\\lambda$, where $d$ is the distance between one slit and the next']) }),
];
