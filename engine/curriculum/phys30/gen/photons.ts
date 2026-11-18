/**
 * Grade 12 Physics, Unit 3, lessons 3.6 to 3.8: electromagnetic radiation as photons (30-C2). The
 * energy of a photon, the photoelectric effect, the momentum of a photon and the Compton effect,
 * and the wave nature of matter. Every constant a question needs is in the question. Planck's
 * constant is taken as 6.63 × 10⁻³⁴ J·s throughout.
 */
import { numPart, retry, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';
import { ELECTRON, RAD, SCI_ASK, SCI_BOTH, rounded, sci, sciPart, sciTex } from './common.ts';
import { C, C_NOTE, C_TEX } from './light.ts';

const L = (n: number) => `p30-3-${n}`;
/** Planck's constant, in joule seconds. */
const H = 6.63e-34;
const H_TEX = '6.63 \\times 10^{-34}';
const H_NOTE = `Planck's constant is $${H_TEX}\\ \\text{J·s}$.`;
/** One electronvolt, in joules. */
const EV = 1.6e-19;
const EV_TEX = '1.60 \\times 10^{-19}';
const EV_NOTE = `One electronvolt is $${EV_TEX}\\ \\text{J}$.`;
const NM_NOTE = '($1\\ \\text{nm} = 10^{-9}\\ \\text{m}$)';
const M_E_NOTE = `The mass of an electron is $${ELECTRON.mTex}\\ \\text{kg}$.`;
const deg = (x: number) => x / RAD;

// ---------------------------------------------------------------------------- 3.6 the energy of a photon

const PHOTON_IDEAS: Q[] = [
  { q: 'What is a photon?', a: 'A single packet, or quantum, of electromagnetic energy', w: ['A particle of matter with a positive charge', 'An electron that has left a metal', 'A wave on the surface of a metal'], why: 'Light is given out and absorbed in separate packets of energy. Each packet is a photon.' },
  { q: 'What does the energy of a photon depend on?', a: 'The frequency of the radiation', w: ['The brightness of the radiation', 'The speed of the radiation', 'The size of the source'], why: '$E = hf$: the energy of one photon is proportional to the frequency.' },
  { q: 'Which photon has the most energy?', a: 'A photon of ultraviolet', w: ['A photon of red light', 'A photon of infrared', 'A photon of microwaves'], why: 'Ultraviolet has the highest frequency of the four, and $E = hf$.' },
  { q: 'A beam of red light is made brighter without changing its colour. What changes?', a: 'More photons arrive each second, each with the same energy as before', w: ['Each photon has more energy', 'Each photon travels faster', 'The photons have a higher frequency'], why: 'The colour fixes the frequency, and so the energy of each photon. Brightness is the number of photons.' },
  { q: 'Max Planck explained the light from hot objects with a new idea. What was it?', a: 'Energy is given out only in whole packets of size $hf$', w: ['Light travels at different speeds in different materials', 'Hot objects give out only one frequency', 'Energy is not conserved in hot objects'], why: 'Planck assumed that energy comes in quanta. Einstein later showed that light itself travels as these quanta.' },
  { q: 'The wavelength of a beam of light is halved. What happens to the energy of each of its photons?', a: 'It doubles', w: ['It halves', 'It stays the same', 'It becomes four times as large'], why: '$E = \\dfrac{hc}{\\lambda}$: half the wavelength is twice the frequency, and twice the energy.' },
];

function energyFromFrequency(rng: Rng): GenOutput {
  const f = sci(rng.float(1.1, 9.9, 2), rng.pick([14, 15, 16, 17]), 2);
  const E = H * f.v;
  return {
    prompt: `${H_NOTE} Find the energy of one photon of radiation with a frequency of $${f.tex}\\ \\text{Hz}$. ${SCI_ASK}`,
    parts: [sciPart(E, 3, 'J')],
    hints: ['The energy of a photon is Planck\'s constant × its frequency: $E = hf$'],
    solution: [`$E = hf = ${H_TEX} \\times ${f.tex} = ${sciTex(E)}$ J`],
  };
}

function energyFromWavelength(rng: Rng): GenOutput {
  const nm = rng.int(20, 70) * 10;
  const E = (H * C) / (nm * 1e-9);
  return {
    prompt: `${H_NOTE} ${C_NOTE} ${EV_NOTE} Find the energy of one photon of light with a wavelength of ${q(nm, 'nm')} ${NM_NOTE}, in joules and in electronvolts. Give the joules in scientific notation to 3 significant digits, and the electronvolts to 2 decimal places.`,
    parts: [sciPart(E, 3, 'J', 'Energy in joules'), rounded(E / EV, 2, 'eV', 'Energy in electronvolts')],
    hints: ['$E = hf$ and $f = \\dfrac{c}{\\lambda}$, so $E = \\dfrac{hc}{\\lambda}$, with the wavelength in metres.', 'To change joules to electronvolts, divide by $1.60 \\times 10^{-19}$.'],
    solution: [`$E = \\dfrac{hc}{\\lambda} = \\dfrac{${H_TEX} \\times ${C_TEX}}{${nm} \\times 10^{-9}} = ${sciTex(E)}$ J`, `$\\dfrac{${sciTex(E)}}{${EV_TEX}} = ${num(E / EV, 2)}$ eV`],
  };
}

function wavelengthFromEnergy(rng: Rng): GenOutput {
  const eV = rng.float(1.6, 6.4, 2);
  const nm = ((H * C) / (eV * EV)) * 1e9;
  return {
    prompt: `${H_NOTE} ${C_NOTE} ${EV_NOTE} Each photon of a beam of radiation has an energy of ${q(eV.toFixed(2), 'eV')}. Find the wavelength of the radiation, to the nearest nanometre ${NM_NOTE}.`,
    parts: [rounded(nm, 0, 'nm')],
    hints: ['Change the energy to joules first: multiply by $1.60 \\times 10^{-19}$.', '$E = \\dfrac{hc}{\\lambda}$, so $\\lambda = \\dfrac{hc}{E}$'],
    solution: [`$E = ${eV.toFixed(2)} \\times ${EV_TEX} = ${sciTex(eV * EV)}$ J`, `$\\lambda = \\dfrac{hc}{E} = \\dfrac{${H_TEX} \\times ${C_TEX}}{${sciTex(eV * EV)}} = ${sciTex(nm * 1e-9)}$ m, which is ${num(nm, 0)} nm`],
  };
}

const LASERS = [405, 450, 473, 532, 589, 633, 650, 780];

function photonCount(rng: Rng): GenOutput {
  const nm = rng.pick(LASERS);
  const mW = rng.pick([0.5, 1, 2, 3, 5, 10, 20, 50, 100]);
  const E = (H * C) / (nm * 1e-9);
  const n = (mW * 1e-3) / E;
  return {
    prompt: `${H_NOTE} ${C_NOTE} A laser gives out light with a wavelength of ${q(nm, 'nm')} ${NM_NOTE} at a power of ${q(mW, 'mW')}. Find the energy of one photon, and the number of photons the laser gives out each second. ${SCI_BOTH}`,
    parts: [sciPart(E, 3, 'J', 'Energy of one photon'), sciPart(n, 3, '', 'Photons each second')],
    hints: ['$E = \\dfrac{hc}{\\lambda}$ for one photon, with the wavelength in metres.', 'A power of 1 mW is $10^{-3}$ joules each second.', 'number of photons each second = energy each second ÷ energy of one photon'],
    solution: [`$E = \\dfrac{hc}{\\lambda} = \\dfrac{${H_TEX} \\times ${C_TEX}}{${nm} \\times 10^{-9}} = ${sciTex(E)}$ J`, `Each second the laser gives out $${sciTex(mW * 1e-3)}$ J, so the number of photons is $\\dfrac{${sciTex(mW * 1e-3)}}{${sciTex(E)}} = ${sciTex(n)}$`],
  };
}

function pulsePhotons(rng: Rng): GenOutput {
  const nm = rng.pick(LASERS);
  const count = sci(rng.float(1.2, 9.5, 1), rng.pick([12, 14, 15, 16, 18]));
  const E = (H * C) / (nm * 1e-9);
  const total = E * count.v;
  return {
    prompt: `${H_NOTE} ${C_NOTE} A pulse of laser light with a wavelength of ${q(nm, 'nm')} ${NM_NOTE} contains $${count.tex}$ photons. Find the energy of one photon, and the total energy of the pulse. ${SCI_BOTH}`,
    parts: [sciPart(E, 3, 'J', 'Energy of one photon'), sciPart(total, 3, 'J', 'Energy of the pulse')],
    hints: ['$E = \\dfrac{hc}{\\lambda}$ for one photon, with the wavelength in metres.', 'total energy = number of photons × energy of one photon'],
    solution: [`$E = \\dfrac{hc}{\\lambda} = \\dfrac{${H_TEX} \\times ${C_TEX}}{${nm} \\times 10^{-9}} = ${sciTex(E)}$ J`, `Total: $${count.tex} \\times ${sciTex(E)} = ${sciTex(total)}$ J`],
  };
}

// ---------------------------------------------------------------------------- 3.6 the photoelectric effect

const PHOTOELECTRIC_IDEAS: Q[] = [
  { q: 'What is the photoelectric effect?', a: 'Light that shines on a metal surface knocks electrons out of it', w: ['A metal gives out light when it is heated', 'Light bends as it passes into a metal', 'An electric current makes a metal give out light'], why: 'The electrons that leave are called photoelectrons.' },
  { q: 'Light below a certain frequency frees no electrons from a metal, however bright it is. What is that frequency called?', a: 'The threshold frequency', w: ['The critical frequency', 'The natural frequency', 'The stopping frequency'], why: 'Below the threshold frequency, no single photon has enough energy to free an electron.' },
  { q: 'What is the work function of a metal?', a: 'The least energy needed to free an electron from its surface', w: ['The greatest kinetic energy of the electrons that leave it', 'The energy of one photon of the light', 'The work done by the light each second'], why: 'An electron must be given at least the work function to escape. Any energy left over is its kinetic energy.' },
  { q: 'Light above the threshold frequency shines on a metal. The light is made brighter, at the same frequency. What happens?', a: 'More electrons are freed each second, with the same greatest kinetic energy', w: ['The same number of electrons are freed, with more kinetic energy', 'More electrons are freed, with more kinetic energy', 'Nothing changes'], why: 'Brighter light has more photons, so it frees more electrons. Each photon still has the same energy, $hf$.' },
  { q: 'Light above the threshold frequency shines on a metal. The frequency of the light is raised. What happens to the freed electrons?', a: 'Their greatest kinetic energy increases', w: ['Their greatest kinetic energy stays the same', 'Their greatest kinetic energy decreases', 'No electrons are freed'], why: '$E_k = hf - W$: each photon brings more energy, and the work function is unchanged.' },
  { q: 'Which observation could the wave theory of light not explain?', a: 'Dim light of a high frequency frees electrons at once, but bright light of a low frequency never does', w: ['Light reflects from a metal surface', 'Brighter light frees more electrons', 'Light carries energy'], why: 'A wave would deliver energy steadily, so any bright enough light should free electrons after a wait. It does not.' },
  { q: 'How did Einstein explain the photoelectric effect?', a: 'Light arrives as photons, and one photon gives all of its energy to one electron', w: ['Light is a wave that slowly heats the electrons', 'Electrons in a metal have no mass', 'Many photons join together to free one electron'], why: 'An electron is freed only if a single photon carries at least the work function: $hf \\geq W$.' },
  { q: 'In a photoelectric experiment the stopping voltage is measured. What does it show?', a: 'The greatest kinetic energy of the freed electrons', w: ['The number of electrons freed each second', 'The work function of the metal directly', 'The brightness of the light'], why: 'The stopping voltage just stops the fastest electrons: $E_k = eV_{\\text{stop}}$.' },
];

const METALS: Array<[string, number]> = [['caesium', 2.14], ['potassium', 2.3], ['sodium', 2.36], ['calcium', 2.87], ['magnesium', 3.66], ['aluminium', 4.08], ['zinc', 4.33], ['copper', 4.7]];
const work = ([name, W]: [string, number]) => `The work function of ${name} is ${q(W.toFixed(2), 'eV')}.`;
/** The energy of a photon in electronvolts, from its wavelength in nanometres. */
const photonEv = (nm: number) => (H * C) / (nm * 1e-9) / EV;

function thresholdFrequency(rng: Rng): GenOutput {
  const m = rng.pick(METALS);
  const f0 = (m[1] * EV) / H;
  const nm0 = (C / f0) * 1e9;
  return {
    prompt: `${H_NOTE} ${C_NOTE} ${EV_NOTE} ${work(m)} Find the threshold frequency of ${m[0]}, in scientific notation to 3 significant digits, and the longest wavelength of light that can free electrons from it, to the nearest nanometre ${NM_NOTE}.`,
    parts: [sciPart(f0, 3, 'Hz', 'Threshold frequency'), rounded(nm0, 0, 'nm', 'Longest wavelength')],
    hints: ['Change the work function to joules: multiply by $1.60 \\times 10^{-19}$.', 'At the threshold, the photon has just enough energy: $hf_0 = W$', 'The longest wavelength goes with the lowest frequency: $\\lambda_0 = \\dfrac{c}{f_0}$'],
    solution: [`$W = ${m[1].toFixed(2)} \\times ${EV_TEX} = ${sciTex(m[1] * EV)}$ J`, `$f_0 = \\dfrac{W}{h} = \\dfrac{${sciTex(m[1] * EV)}}{${H_TEX}} = ${sciTex(f0)}$ Hz`, `$\\lambda_0 = \\dfrac{c}{f_0} = \\dfrac{${C_TEX}}{${sciTex(f0)}} = ${sciTex(nm0 * 1e-9)}$ m, which is ${num(nm0, 0)} nm`],
  };
}

/** A metal and a wavelength whose photons free electrons with at least `least` electronvolts to spare. */
function lit(rng: Rng, least: number): { m: [string, number]; nm: number; E: number; Ek: number } {
  return retry(
    () => {
      const m = rng.pick(METALS);
      const nm = rng.int(15, 55) * 10;
      const E = photonEv(nm);
      return { m, nm, E, Ek: E - m[1] };
    },
    (t) => t.Ek >= least && t.E <= 8.5,
  );
}

function maxKineticEnergy(rng: Rng): GenOutput {
  const c = lit(rng, 0.3);
  return {
    prompt: `${H_NOTE} ${C_NOTE} ${EV_NOTE} ${work(c.m)} Light with a wavelength of ${q(c.nm, 'nm')} ${NM_NOTE} shines on a clean ${c.m[0]} surface. Find the energy of one photon and the greatest kinetic energy of the electrons that are freed, both in electronvolts to 2 decimal places.`,
    parts: [rounded(c.E, 2, 'eV', 'Photon energy'), rounded(c.Ek, 2, 'eV', 'Greatest kinetic energy')],
    hints: ['$E = \\dfrac{hc}{\\lambda}$ in joules, then divide by $1.60 \\times 10^{-19}$ for electronvolts.', 'The photon pays the work function, and the rest is kinetic energy: $E_k = hf - W$'],
    solution: [`$E = \\dfrac{hc}{\\lambda} = \\dfrac{${H_TEX} \\times ${C_TEX}}{${c.nm} \\times 10^{-9}} = ${sciTex(c.E * EV)}$ J, which is ${num(c.E, 2)} eV`, `$E_k = hf - W = ${num(c.E, 2)} - ${c.m[1].toFixed(2)} = ${num(c.Ek, 2)}$ eV`],
  };
}

function stoppingVoltage(rng: Rng): GenOutput {
  const c = retry(
    () => {
      const m = rng.pick(METALS);
      const f = sci(rng.float(0.8, 2, 2), 15, 2);
      const E = (H * f.v) / EV;
      return { m, f, E, Ek: E - m[1] };
    },
    (t) => t.Ek >= 0.3,
  );
  return {
    prompt: `${H_NOTE} ${EV_NOTE} ${work(c.m)} Radiation with a frequency of $${c.f.tex}\\ \\text{Hz}$ shines on a clean ${c.m[0]} surface. Find the stopping voltage: the potential difference that just stops the fastest electrons. Give your answer to 2 decimal places.`,
    parts: [rounded(c.Ek, 2, 'V')],
    hints: ['Find the energy of one photon in electronvolts: $E = hf$, then divide by $1.60 \\times 10^{-19}$.', '$E_k = hf - W$ gives the greatest kinetic energy in electronvolts.', 'An electron with a kinetic energy of 1 eV is stopped by 1 V: $E_k = eV_{\\text{stop}}$'],
    solution: [`$E = hf = ${H_TEX} \\times ${c.f.tex} = ${sciTex(c.E * EV)}$ J, which is ${num(c.E, 2)} eV`, `$E_k = ${num(c.E, 2)} - ${c.m[1].toFixed(2)} = ${num(c.Ek, 2)}$ eV`, `The stopping voltage is ${num(c.Ek, 2)} V`],
  };
}

function workFromStopping(rng: Rng): GenOutput {
  const c = lit(rng, 0.3);
  const stop = Math.round(c.Ek * 100) / 100;
  const W = c.E - stop;
  return {
    prompt: `${H_NOTE} ${C_NOTE} ${EV_NOTE} Light with a wavelength of ${q(c.nm, 'nm')} ${NM_NOTE} shines on a metal surface. A stopping voltage of ${q(stop.toFixed(2), 'V')} just stops the fastest electrons. Find the work function of the metal, in electronvolts to 2 decimal places.`,
    parts: [rounded(W, 2, 'eV')],
    hints: ['The stopping voltage gives the greatest kinetic energy: an electron stopped by 1 V had 1 eV.', 'Find the energy of one photon in electronvolts: $E = \\dfrac{hc}{\\lambda}$, then divide by $1.60 \\times 10^{-19}$.', '$W = hf - E_k$'],
    solution: [`$E = \\dfrac{hc}{\\lambda} = \\dfrac{${H_TEX} \\times ${C_TEX}}{${c.nm} \\times 10^{-9}} = ${sciTex(c.E * EV)}$ J, which is ${num(c.E, 2)} eV`, `$E_k = ${stop.toFixed(2)}$ eV, so $W = ${num(c.E, 2)} - ${stop.toFixed(2)} = ${num(W, 2)}$ eV`],
  };
}

function maxSpeed(rng: Rng): GenOutput {
  const c = lit(rng, 1);
  const Ek = c.Ek * EV;
  const v = Math.sqrt((2 * Ek) / ELECTRON.m);
  return {
    prompt: `${H_NOTE} ${C_NOTE} ${EV_NOTE} ${M_E_NOTE} ${work(c.m)} Light with a wavelength of ${q(c.nm, 'nm')} ${NM_NOTE} shines on a clean ${c.m[0]} surface. Find the greatest kinetic energy of the freed electrons, in joules, and their greatest speed. ${SCI_BOTH}`,
    parts: [sciPart(Ek, 3, 'J', 'Greatest kinetic energy'), sciPart(v, 3, 'm/s', 'Greatest speed')],
    hints: ['$E_k = \\dfrac{hc}{\\lambda} - W$, with the work function changed to joules.', '$E_k = \\dfrac{1}{2}mv^2$, so $v = \\sqrt{\\dfrac{2E_k}{m}}$'],
    solution: [`$\\dfrac{hc}{\\lambda} = ${sciTex(c.E * EV)}$ J, and $W = ${c.m[1].toFixed(2)} \\times ${EV_TEX} = ${sciTex(c.m[1] * EV)}$ J`, `$E_k = ${sciTex(c.E * EV)} - ${sciTex(c.m[1] * EV)} = ${sciTex(Ek)}$ J`, `$v = \\sqrt{\\dfrac{2 \\times ${sciTex(Ek)}}{${ELECTRON.mTex}}} = ${sciTex(v)}$ m/s`],
  };
}

// ---------------------------------------------------------------------------- 3.7 the momentum of a photon

const MOMENTUM_IDEAS: Q[] = [
  { q: 'A photon has no mass. Does it have momentum?', a: 'Yes: its momentum is $\\dfrac{h}{\\lambda}$', w: ['No, because momentum is mass × velocity', 'Only when it is absorbed', 'Only if it has a charge'], why: 'Light carries momentum as well as energy. For a photon, $p = \\dfrac{h}{\\lambda}$.' },
  { q: 'Which photon has the largest momentum?', a: 'A photon of X-rays', w: ['A photon of red light', 'A photon of radio waves', 'A photon of infrared'], why: '$p = \\dfrac{h}{\\lambda}$: the shortest wavelength has the largest momentum.' },
  { q: 'The wavelength of a photon doubles. What happens to its momentum?', a: 'It halves', w: ['It doubles', 'It stays the same', 'It becomes a quarter'], why: '$p = \\dfrac{h}{\\lambda}$: momentum is inversely proportional to wavelength.' },
  { q: 'Sunlight pushes very gently on everything it strikes. Why?', a: 'Its photons carry momentum, and give it to the surface', w: ['Its photons have mass', 'It heats the air in front of the surface', 'Its photons have a charge'], why: 'A change in the momentum of the photons needs a force, so the photons push back on the surface. A solar sail uses this.' },
  { q: 'A beam of light is absorbed by a black surface, and then the same beam is reflected straight back by a mirror. How do the forces on the two surfaces compare?', a: 'The force on the mirror is twice as large', w: ['The force on the black surface is twice as large', 'The forces are equal', 'There is no force on the mirror'], why: 'A reflected photon reverses its momentum, so its momentum changes by twice as much as that of an absorbed photon.' },
  { q: 'How is the momentum of a photon related to its energy?', a: '$p = \\dfrac{E}{c}$', w: ['$p = Ec$', '$p = \\dfrac{E}{c^2}$', '$p = \\dfrac{1}{2}Ec$'], why: '$E = \\dfrac{hc}{\\lambda}$ and $p = \\dfrac{h}{\\lambda}$, so $E = pc$.' },
];

const P_UNIT = 'kg·m/s';

function momentumFromWavelength(rng: Rng): GenOutput {
  const xray = rng.chance(0.4);
  const value = xray ? rng.pick([10, 20, 25, 50, 71, 80, 100, 154, 200]) : rng.int(40, 70) * 10;
  const metres = value * (xray ? 1e-12 : 1e-9);
  const p = H / metres;
  return {
    prompt: `${H_NOTE} Find the momentum of a photon of ${xray ? 'X-rays' : 'light'} with a wavelength of ${q(value, xray ? 'pm' : 'nm')} (${xray ? '$1\\ \\text{pm} = 10^{-12}\\ \\text{m}$' : '$1\\ \\text{nm} = 10^{-9}\\ \\text{m}$'}). ${SCI_ASK}`,
    parts: [sciPart(p, 3, P_UNIT)],
    hints: ['The momentum of a photon is Planck\'s constant ÷ its wavelength: $p = \\dfrac{h}{\\lambda}$', 'Change the wavelength to metres.'],
    solution: [`$p = \\dfrac{h}{\\lambda} = \\dfrac{${H_TEX}}{${value} \\times 10^{${xray ? -12 : -9}}} = ${sciTex(p)}$ ${P_UNIT}`],
  };
}

function momentumFromEnergy(rng: Rng): GenOutput {
  const keV = rng.chance(0.5);
  const value = keV ? rng.pick([5, 8, 12.4, 17.5, 20, 30, 50, 60, 100]) : rng.float(1.6, 9.9, 1);
  const E = value * (keV ? 1e3 : 1) * EV;
  const p = E / C;
  return {
    prompt: `${C_NOTE} ${EV_NOTE} A photon has an energy of ${q(value, keV ? 'keV' : 'eV')}${keV ? ' ($1\\ \\text{keV} = 1000\\ \\text{eV}$)' : ''}. Find its energy in joules, and its momentum. ${SCI_BOTH}`,
    parts: [sciPart(E, 3, 'J', 'Energy'), sciPart(p, 3, P_UNIT, 'Momentum')],
    hints: ['Change the energy to joules: 1 eV is $1.60 \\times 10^{-19}$ J.', 'For a photon, energy = momentum × the speed of light: $p = \\dfrac{E}{c}$'],
    solution: [`$E = ${value}${keV ? ' \\times 10^{3}' : ''} \\times ${EV_TEX} = ${sciTex(E)}$ J`, `$p = \\dfrac{E}{c} = \\dfrac{${sciTex(E)}}{${C_TEX}} = ${sciTex(p)}$ ${P_UNIT}`],
  };
}

function wavelengthFromMomentum(rng: Rng): GenOutput {
  const p = Number((H / (rng.int(40, 70) * 1e-8)).toPrecision(3));
  const nm = (H / p) * 1e9;
  return {
    prompt: `${H_NOTE} A photon of visible light has a momentum of $${sciTex(p)}\\ \\text{${P_UNIT}}$. Find its wavelength, to the nearest nanometre ${NM_NOTE}.`,
    parts: [rounded(nm, 0, 'nm')],
    hints: ['$p = \\dfrac{h}{\\lambda}$, so $\\lambda = \\dfrac{h}{p}$'],
    solution: [`$\\lambda = \\dfrac{h}{p} = \\dfrac{${H_TEX}}{${sciTex(p)}} = ${sciTex(nm * 1e-9)}$ m, which is ${num(nm, 0)} nm`],
  };
}

function lightForce(rng: Rng): GenOutput {
  const kW = rng.chance(0.4);
  const value = kW ? rng.pick([1.5, 2, 5, 10, 20, 50]) : rng.pick([0.5, 1, 2, 5, 10, 60, 100, 500]);
  const P = value * (kW ? 1000 : 1);
  const mirror = rng.chance(0.5);
  const F = ((mirror ? 2 : 1) * P) / C;
  return {
    prompt: `${C_NOTE} A photon of energy $E$ has a momentum of $\\dfrac{E}{c}$. A laser beam with a power of ${q(value, kW ? 'kW' : 'W')} shines on a ${mirror ? 'mirror, which reflects all of the light straight back' : 'black surface, which absorbs all of the light'}. Find the force of the light on the surface. ${SCI_ASK}`,
    parts: [sciPart(F, 3, 'N')],
    hints: [`Each second, light with an energy of ${num(P, 0)} J arrives. Its momentum is that energy ÷ $c$.`, mirror ? 'Reflected light reverses its momentum, so the change in momentum is twice the momentum that arrives.' : 'Absorbed light loses all of its momentum.', 'Force is the change in momentum each second.'],
    solution: [`Momentum arriving each second: $\\dfrac{${num(P, 0)}}{${C_TEX}} = ${sciTex(P / C)}$ ${P_UNIT}`, mirror ? `The light is reflected, so the momentum changes by twice that each second: $F = ${sciTex(F)}$ N` : `The light is absorbed, so all of that momentum is lost each second: $F = ${sciTex(F)}$ N`],
  };
}

function atomRecoil(rng: Rng): GenOutput {
  const nm = rng.int(9, 70) * 10;
  const p = H / (nm * 1e-9);
  const v = p / 1.67e-27;
  return {
    prompt: `${H_NOTE} A hydrogen atom, with a mass of $1.67 \\times 10^{-27}\\ \\text{kg}$, is at rest when it gives out a photon with a wavelength of ${q(nm, 'nm')} ${NM_NOTE}. Find the momentum of the photon, in scientific notation to 3 significant digits, and the speed at which the atom recoils, to 2 decimal places.`,
    parts: [sciPart(p, 3, P_UNIT, 'Momentum of the photon'), rounded(v, 2, 'm/s', 'Recoil speed')],
    hints: ['$p = \\dfrac{h}{\\lambda}$ for the photon, with the wavelength in metres.', 'Momentum is conserved. The total was zero, so the atom gets an equal momentum in the opposite direction.', '$v = \\dfrac{p}{m}$ for the atom.'],
    solution: [`$p = \\dfrac{h}{\\lambda} = \\dfrac{${H_TEX}}{${nm} \\times 10^{-9}} = ${sciTex(p)}$ ${P_UNIT}`, `The atom recoils with the same momentum: $v = \\dfrac{p}{m} = \\dfrac{${sciTex(p)}}{1.67 \\times 10^{-27}} = ${num(v, 2)}$ m/s`],
  };
}

// ---------------------------------------------------------------------------- 3.7 the Compton effect

const COMPTON_IDEAS: Q[] = [
  { q: 'What happens in the Compton effect?', a: 'An X-ray photon collides with an electron and leaves with a longer wavelength', w: ['Light frees electrons from a metal surface', 'An electron gives out an X-ray photon as it slows down', 'An X-ray photon splits into two photons'], why: 'The photon gives some of its energy and momentum to the electron, so it leaves with less energy and a longer wavelength.' },
  { q: 'An X-ray photon scatters from an electron that was at rest. How does the energy of the scattered photon compare with the energy it had before?', a: 'It is less, because the electron has gained kinetic energy', w: ['It is more', 'It is the same', 'It is zero'], why: 'Energy is conserved: the photon loses what the electron gains.' },
  { q: 'Which two quantities are conserved in a Compton collision?', a: 'Energy and momentum', w: ['Wavelength and frequency', 'Energy and wavelength', 'Momentum and frequency'], why: 'Compton treated the photon and the electron as two colliding particles, and applied the conservation of energy and of momentum.' },
  { q: 'Why was the Compton effect important?', a: 'It showed that photons carry momentum, as particles do', w: ['It showed that light is a wave', 'It showed that electrons have no mass', 'It measured the charge of the electron'], why: 'A wave would scatter with its wavelength unchanged. The change in wavelength fits a collision between two particles exactly.' },
  { q: 'For which scattering angle is the change in the wavelength of the photon greatest?', a: '180°, when the photon bounces straight back', w: ['0°, when the photon carries straight on', '90°', 'It is the same at every angle'], why: '$\\Delta\\lambda = \\dfrac{h}{mc}(1 - \\cos\\theta)$ is largest when $\\cos\\theta = -1$.' },
  { q: 'An X-ray photon passes an electron and carries straight on, with a scattering angle of 0°. What is the change in its wavelength?', a: 'Zero', w: ['$\\dfrac{h}{mc}$', '$\\dfrac{2h}{mc}$', 'It depends on the wavelength'], why: '$1 - \\cos 0° = 0$: a photon that is not turned gives nothing to the electron.' },
  { q: 'Does the change in wavelength in the Compton effect depend on the wavelength of the X-rays that are used?', a: 'No, only on the angle through which the photon is scattered', w: ['Yes, it is proportional to the wavelength', 'Yes, it is larger for longer wavelengths', 'Yes, it is larger for shorter wavelengths'], why: '$\\Delta\\lambda = \\dfrac{h}{mc}(1 - \\cos\\theta)$ contains only constants and the angle.' },
];

/** h ÷ (the mass of an electron × c), in picometres. */
const COMPTON_PM = 2.43;
const COMPTON_NOTE = 'For an electron, $\\dfrac{h}{mc} = 2.43 \\times 10^{-12}\\ \\text{m}$.';
const COMPTON_EQ = '$\\Delta\\lambda = \\dfrac{h}{mc}(1 - \\cos\\theta)$';
/** Scattering angles from 20° to 180°. */
const ANGLES = Array.from({ length: 33 }, (_, i) => 20 + 5 * i);

function comptonShift(rng: Rng): GenOutput {
  const angle = rng.pick(ANGLES);
  const shift = COMPTON_PM * 1e-12 * (1 - Math.cos(angle * RAD));
  return {
    prompt: `${COMPTON_NOTE} An X-ray photon is scattered through ${angle}° by an electron that was at rest. Find the change in the wavelength of the photon. ${SCI_ASK}`,
    parts: [sciPart(shift, 3, 'm')],
    hints: [`The Compton equation: ${COMPTON_EQ}, where $\\theta$ is the angle through which the photon is scattered.`],
    solution: [`$\\Delta\\lambda = \\dfrac{h}{mc}(1 - \\cos\\theta) = 2.43 \\times 10^{-12} \\times (1 - \\cos ${angle}°) = ${sciTex(shift)}$ m`],
  };
}

function scatteredWavelength(rng: Rng): GenOutput {
  const pm = rng.pick([10, 15, 20, 25, 40, 50, 71, 80, 100]);
  const angle = rng.pick(ANGLES);
  const shift = COMPTON_PM * (1 - Math.cos(angle * RAD));
  return {
    prompt: `${COMPTON_NOTE} X-rays with a wavelength of ${q(pm.toFixed(1), 'pm')} ($1\\ \\text{pm} = 10^{-12}\\ \\text{m}$) are scattered through ${angle}° by electrons that were at rest. Find the change in wavelength and the wavelength of the scattered X-rays, both in picometres to 2 decimal places.`,
    parts: [rounded(shift, 2, 'pm', 'Change in wavelength'), rounded(pm + shift, 2, 'pm', 'Scattered wavelength')],
    hints: [`The Compton equation: ${COMPTON_EQ}. In picometres, $\\dfrac{h}{mc} = 2.43$ pm.`, 'The scattered photon has less energy, so its wavelength is longer: add the change.'],
    solution: [`$\\Delta\\lambda = 2.43 \\times (1 - \\cos ${angle}°) = ${num(shift, 2)}$ pm`, `$\\lambda' = ${pm.toFixed(1)} + ${num(shift, 2)} = ${num(pm + shift, 2)}$ pm`],
  };
}

function comptonAngle(rng: Rng): GenOutput {
  const a0 = rng.int(6, 30) * 5;
  const shift = Math.round(COMPTON_PM * (1 - Math.cos(a0 * RAD)) * 1000) / 1000;
  const angle = deg(Math.acos(1 - shift / COMPTON_PM));
  return {
    prompt: `${COMPTON_NOTE} The wavelength of an X-ray photon increases by ${q(shift.toFixed(3), 'pm')} ($1\\ \\text{pm} = 10^{-12}\\ \\text{m}$) when it is scattered by an electron that was at rest. Through what angle was the photon scattered? Give your answer to 1 decimal place.`,
    parts: [rounded(angle, 1, '°')],
    hints: [`The Compton equation: ${COMPTON_EQ}. In picometres, $\\dfrac{h}{mc} = 2.43$ pm.`, 'Rearrange: $\\cos\\theta = 1 - \\dfrac{\\Delta\\lambda}{2.43}$, with the change in picometres.'],
    solution: [`$\\cos\\theta = 1 - \\dfrac{${shift.toFixed(3)}}{2.43} = ${num(1 - shift / COMPTON_PM, 4)}$`, `$\\theta = ${num(angle, 1)}°$`],
  };
}

function comptonEnergy(rng: Rng): GenOutput {
  const c = retry(
    () => {
      const E1 = rng.pick([17.5, 20, 30, 40, 50, 60, 80, 100]);
      const angle = rng.pick(ANGLES);
      const E2 = Math.round((E1 / (1 + (E1 / 511) * (1 - Math.cos(angle * RAD)))) * 100) / 100;
      return { E1, E2 };
    },
    (t) => t.E1 - t.E2 >= 0.2,
  );
  const keV = Math.round((c.E1 - c.E2) * 100) / 100;
  return {
    prompt: `${EV_NOTE} An X-ray photon with an energy of ${q(c.E1, 'keV')} collides with an electron that is at rest. The scattered photon has an energy of ${q(c.E2.toFixed(2), 'keV')} ($1\\ \\text{keV} = 1000\\ \\text{eV}$). Find the kinetic energy that the electron gains, in kiloelectronvolts and in joules. Give the joules in scientific notation to 3 significant digits.`,
    parts: [numPart(keV, { suffix: 'keV', label: 'Kinetic energy in keV' }), sciPart(keV * 1e3 * EV, 3, 'J', 'Kinetic energy in joules')],
    hints: ['Energy is conserved in the collision: the electron gains what the photon loses.', 'Change the kiloelectronvolts to joules: multiply by 1000 and by $1.60 \\times 10^{-19}$.'],
    solution: [`$E_k = ${c.E1} - ${c.E2.toFixed(2)} = ${keV}$ keV`, `$${keV} \\times 10^{3} \\times ${EV_TEX} = ${sciTex(keV * 1e3 * EV)}$ J`],
  };
}

// ---------------------------------------------------------------------------- 3.8 matter waves

const DE_BROGLIE = '$\\lambda = \\dfrac{h}{mv}$';

function electronWavelength(rng: Rng): GenOutput {
  const v = rng.chance(0.5) ? sci(rng.float(1.2, 9.5, 1), 6) : sci(rng.float(1, 3, 1), 7);
  const lambda = H / (ELECTRON.m * v.v);
  return {
    prompt: `${H_NOTE} ${M_E_NOTE} Find the de Broglie wavelength of an electron that moves at $${v.tex}\\ \\text{m/s}$. ${SCI_ASK}`,
    parts: [sciPart(lambda, 3, 'm')],
    hints: [`The de Broglie wavelength of a particle is Planck's constant ÷ its momentum: ${DE_BROGLIE}`],
    solution: [`$\\lambda = \\dfrac{h}{mv} = \\dfrac{${H_TEX}}{${ELECTRON.mTex} \\times ${v.tex}} = ${sciTex(lambda)}$ m`],
  };
}

const THINGS: Array<[string, number, string, number[]]> = [
  ['A baseball', 0.145, '0.145', [25, 30, 35, 40, 45]],
  ['A tennis ball', 0.058, '0.058', [20, 30, 40, 50, 60]],
  ['A bullet', 0.01, '0.010', [300, 400, 600, 800, 900]],
  ['A golf ball', 0.046, '0.046', [30, 40, 50, 60, 70]],
  ['A runner', 70, '70', [4, 5, 6, 8, 10]],
  ['A car', 1200, '1200', [15, 20, 25, 30]],
];

function objectWavelength(rng: Rng): GenOutput {
  const [name, m, mText, speeds] = rng.pick(THINGS);
  const v = rng.pick(speeds);
  const lambda = H / (m * v);
  return {
    prompt: `${H_NOTE} ${name} with a mass of ${q(mText, 'kg')} moves at ${q(v, 'm/s')}. Find its de Broglie wavelength. ${SCI_ASK}`,
    parts: [sciPart(lambda, 3, 'm')],
    hints: [`The de Broglie wavelength of a particle is Planck's constant ÷ its momentum: ${DE_BROGLIE}`],
    solution: [`$\\lambda = \\dfrac{h}{mv} = \\dfrac{${H_TEX}}{${mText} \\times ${v}} = ${sciTex(lambda)}$ m, far too small ever to be noticed`],
  };
}

function speedFromWavelength(rng: Rng): GenOutput {
  const nm = rng.pick([0.05, 0.08, 0.1, 0.12, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.8, 1, 1.5, 2]);
  const v = H / (ELECTRON.m * nm * 1e-9);
  return {
    prompt: `${H_NOTE} ${M_E_NOTE} At what speed does an electron have a de Broglie wavelength of ${q(nm, 'nm')} ${NM_NOTE}? ${SCI_ASK}`,
    parts: [sciPart(v, 3, 'm/s')],
    hints: [`${DE_BROGLIE}, so $v = \\dfrac{h}{m\\lambda}$, with the wavelength in metres.`],
    solution: [`$v = \\dfrac{h}{m\\lambda} = \\dfrac{${H_TEX}}{${ELECTRON.mTex} \\times ${nm} \\times 10^{-9}} = ${sciTex(v)}$ m/s`],
  };
}

const HEAVY: Array<[string, string, number, string]> = [['A proton', 'proton', 1.67e-27, '1.67 \\times 10^{-27}'], ['A neutron', 'neutron', 1.67e-27, '1.67 \\times 10^{-27}'], ['An alpha particle', 'alpha particle', 6.64e-27, '6.64 \\times 10^{-27}']];

function particleWavelength(rng: Rng): GenOutput {
  const [Name, , m, mTex] = rng.pick(HEAVY);
  const v = sci(rng.float(1.2, 9.5, 1), rng.pick([3, 4, 5, 6]));
  const lambda = H / (m * v.v);
  return {
    prompt: `${H_NOTE} ${Name}, with a mass of $${mTex}\\ \\text{kg}$, moves at $${v.tex}\\ \\text{m/s}$. Find its de Broglie wavelength. ${SCI_ASK}`,
    parts: [sciPart(lambda, 3, 'm')],
    hints: [`The de Broglie wavelength of a particle is Planck's constant ÷ its momentum: ${DE_BROGLIE}`],
    solution: [`$\\lambda = \\dfrac{h}{mv} = \\dfrac{${H_TEX}}{${mTex} \\times ${v.tex}} = ${sciTex(lambda)}$ m`],
  };
}

function acceleratedElectron(rng: Rng): GenOutput {
  const V = rng.chance(0.15) ? rng.pick([1500, 2000, 3000, 5000]) : rng.int(2, 100) * 10;
  const v = Math.sqrt((2 * EV * V) / ELECTRON.m);
  const lambda = H / (ELECTRON.m * v);
  return {
    prompt: `${H_NOTE} An electron has a charge of size $${EV_TEX}\\ \\text{C}$ and a mass of $${ELECTRON.mTex}\\ \\text{kg}$. It is accelerated from rest through a potential difference of ${q(V, 'V')}. Find its speed, and its de Broglie wavelength. ${SCI_BOTH}`,
    parts: [sciPart(v, 3, 'm/s', 'Speed'), sciPart(lambda, 3, 'm', 'Wavelength')],
    hints: ['The electric potential energy the electron loses becomes kinetic energy: $q\\Delta V = \\dfrac{1}{2}mv^2$', `Then ${DE_BROGLIE}.`],
    solution: [`$v = \\sqrt{\\dfrac{2q\\Delta V}{m}} = \\sqrt{\\dfrac{2 \\times ${EV_TEX} \\times ${V}}{${ELECTRON.mTex}}} = ${sciTex(v)}$ m/s`, `$\\lambda = \\dfrac{h}{mv} = \\dfrac{${H_TEX}}{${ELECTRON.mTex} \\times ${sciTex(v)}} = ${sciTex(lambda)}$ m`],
  };
}

function kineticWavelength(rng: Rng): GenOutput {
  const neutron = rng.chance(0.5);
  const eV = neutron ? rng.pick([0.005, 0.01, 0.015, 0.02, 0.025, 0.03, 0.04, 0.05, 0.06, 0.08, 0.1]) : rng.int(1, 50) * 5;
  const m = neutron ? 1.67e-27 : ELECTRON.m;
  const mTex = neutron ? '1.67 \\times 10^{-27}' : ELECTRON.mTex;
  const E = eV * EV;
  const p = Math.sqrt(2 * m * E);
  const lambda = H / p;
  return {
    prompt: `${H_NOTE} ${EV_NOTE} ${neutron ? 'A neutron' : 'An electron'}, with a mass of $${mTex}\\ \\text{kg}$, has a kinetic energy of ${q(eV, 'eV')}. Find its momentum, and its de Broglie wavelength. ${SCI_BOTH}`,
    parts: [sciPart(p, 3, P_UNIT, 'Momentum'), sciPart(lambda, 3, 'm', 'Wavelength')],
    hints: ['Change the kinetic energy to joules.', '$E_k = \\dfrac{1}{2}mv^2 = \\dfrac{p^2}{2m}$, so $p = \\sqrt{2mE_k}$', 'The de Broglie wavelength is $\\lambda = \\dfrac{h}{p}$.'],
    solution: [`$E_k = ${eV} \\times ${EV_TEX} = ${sciTex(E)}$ J`, `$p = \\sqrt{2mE_k} = \\sqrt{2 \\times ${mTex} \\times ${sciTex(E)}} = ${sciTex(p)}$ ${P_UNIT}`, `$\\lambda = \\dfrac{h}{p} = \\dfrac{${H_TEX}}{${sciTex(p)}} = ${sciTex(lambda)}$ m`],
  };
}

// ---------------------------------------------------------------------------- 3.8 wave-particle duality

const DUALITY_1: Q[] = [
  { q: 'Which of these shows that light behaves as a wave?', a: 'The bright and dark fringes of a double-slit experiment', w: ['The photoelectric effect', 'The Compton effect', 'The freeing of electrons by ultraviolet light'], why: 'Interference needs waves that add and cancel. The other three need photons.' },
  { q: 'Which of these shows that light behaves as a stream of particles?', a: 'The photoelectric effect', w: ['Diffraction through a narrow gap', 'Interference from two slits', 'Polarization'], why: 'One photon gives all of its energy to one electron. A wave cannot explain the threshold frequency.' },
  { q: 'What did Louis de Broglie suggest in 1924?', a: 'Particles of matter, such as electrons, also behave as waves', w: ['Light is made of particles', 'Electrons have no mass', 'Waves cannot carry momentum'], why: 'If light waves can act as particles, de Broglie reasoned, particles should act as waves, with $\\lambda = \\dfrac{h}{mv}$.' },
  { q: 'What is meant by wave-particle duality?', a: 'Light and matter each show wave behaviour in some experiments and particle behaviour in others', w: ['Light is a wave and matter is made of particles', 'Every wave is made of two particles', 'A particle turns into a wave when it stops'], why: 'Neither picture alone describes light or electrons. Which one fits depends on the experiment.' },
  { q: 'An electron is made to move faster. What happens to its de Broglie wavelength?', a: 'It becomes shorter', w: ['It becomes longer', 'It stays the same', 'It becomes zero'], why: '$\\lambda = \\dfrac{h}{mv}$: more momentum means a shorter wavelength.' },
  { q: 'A proton and an electron move at the same speed. Which has the longer de Broglie wavelength?', a: 'The electron, because it has less mass', w: ['The proton, because it has more mass', 'They are the same', 'Neither has a wavelength'], why: '$\\lambda = \\dfrac{h}{mv}$: at the same speed, the smaller mass has the smaller momentum and the longer wavelength.' },
];

const DUALITY_2: Q[] = [
  { q: 'Davisson and Germer fired a beam of electrons at a crystal of nickel. What did they find?', a: 'The electrons were scattered into a diffraction pattern, as waves would be', w: ['The electrons passed straight through', 'The electrons freed photons from the crystal', 'The electrons all bounced straight back'], why: 'The rows of atoms in the crystal acted as a diffraction grating, and the pattern matched the de Broglie wavelength.' },
  { q: 'Why can a diffraction pattern be made with electrons and a crystal, but not with electrons and a doorway?', a: 'Diffraction needs gaps about as small as the wavelength, and the spacing of atoms in a crystal is', w: ['Electrons cannot pass through a doorway', 'A doorway absorbs electrons', 'Crystals give the electrons a charge'], why: 'The de Broglie wavelength of an electron is about the size of an atom, around $10^{-10}$ m.' },
  { q: 'Why do we never notice the wave behaviour of a moving ball?', a: 'Its de Broglie wavelength is far too small to give any diffraction', w: ['A ball has no de Broglie wavelength', 'A ball moves too slowly to be a wave', 'Only charged objects have a wavelength'], why: 'With a mass of a fraction of a kilogram, $\\lambda = \\dfrac{h}{mv}$ is about $10^{-34}$ m, far smaller than any gap.' },
  { q: 'An electron microscope shows much finer detail than a light microscope. Why?', a: 'Fast electrons have a much shorter wavelength than visible light', w: ['Electrons travel faster than light', 'Electrons have a longer wavelength than visible light', 'Electrons are not diffracted at all'], why: 'A microscope cannot show detail much smaller than the wavelength it uses, and the wavelength of the electrons is thousands of times shorter.' },
  { q: 'The electrons in an electron diffraction tube are accelerated through a larger potential difference. What happens to the rings of the diffraction pattern?', a: 'They become smaller, because the wavelength of the electrons is shorter', w: ['They become larger, because the wavelength is longer', 'They stay the same size', 'They disappear'], why: 'Faster electrons have more momentum and a shorter wavelength, and a shorter wavelength is diffracted through smaller angles.' },
  { q: 'Which pair of experiments shows the two sides of the nature of the electron?', a: 'Deflection in a magnetic field (particle) and diffraction by a crystal (wave)', w: ['The photoelectric effect (particle) and the double slit with light (wave)', 'Reflection (particle) and refraction (wave)', 'The Compton effect (wave) and polarization (particle)'], why: 'An electron curves in a field as a charged particle does, and it diffracts as a wave does.' },
];

const DUALITY_3: Q[] = [
  { q: 'Light so dim that only one photon at a time passes through a double slit falls on a detector for a long time. What builds up?', a: 'Single dots, one for each photon, which together form the interference fringes', w: ['Two bright bands, one behind each slit', 'An even glow with no pattern', 'Nothing, because one photon cannot interfere'], why: 'Each photon arrives at one point, as a particle, but the places where photons are likely to arrive follow the wave pattern.' },
  { q: 'In the double-slit experiment with single photons, what does the wave describe?', a: 'The probability of where each photon will be detected', w: ['The exact path of each photon', 'The shape of each photon', 'The speed of each photon'], why: 'Bright fringes are where a photon is likely to arrive, and dark fringes are where it almost never does.' },
  { q: 'Electrons are sent one at a time through two very narrow slits. What pattern builds up on the detector?', a: 'Interference fringes, just as for light', w: ['Two bands, one behind each slit', 'A single band in the centre', 'No pattern at all'], why: 'Electrons show the same wave behaviour as photons. This has been done, with electrons, atoms and even large molecules.' },
  { q: 'When does light show its particle behaviour most clearly?', a: 'When it gives energy to matter or takes energy from it, as in the photoelectric effect', w: ['When it passes through a narrow gap', 'When it travels through empty space', 'When two beams cross'], why: 'Light travels as a wave, but it is given out and absorbed in whole photons.' },
  { q: 'The wavelength of a beam of X-rays is the same as the de Broglie wavelength of a beam of electrons. Both beams are fired at the same crystal. How do their diffraction patterns compare?', a: 'They are alike, because diffraction depends on the wavelength', w: ['Only the X-rays give a pattern', 'Only the electrons give a pattern', 'The electron pattern is much larger'], why: 'G. P. Thomson showed this with thin metal foils: electrons and X-rays of the same wavelength give matching rings.' },
  { q: 'A photon and an electron have the same wavelength. Which statement is correct?', a: 'They have the same momentum', w: ['They have the same speed', 'They have the same mass', 'They have the same kinetic energy'], why: 'For both, $p = \\dfrac{h}{\\lambda}$. Their speeds and energies are very different.' },
];

export const PHOTON_SKILLS: SkillDef[] = [
  skill({ id: 'p30-photon', name: 'The energy of a photon', description: 'Find the energy of a photon from its frequency or wavelength, in joules and in electronvolts, and count the photons in a beam.', outcomes: ['30-C2'], lessonId: L(6), calculator: true, gen: bank([either(energyFromFrequency, fromBank(PHOTON_IDEAS, ['The energy of one photon is $E = hf$. A brighter beam of the same colour has more photons, not bigger ones.'])), either(energyFromWavelength, wavelengthFromEnergy), either(photonCount, pulsePhotons)], ['$E = hf = \\dfrac{hc}{\\lambda}$, and $1\\ \\text{eV} = 1.60 \\times 10^{-19}$ J']) }),
  skill({ id: 'p30-photoelectric', name: 'The photoelectric effect', description: 'Explain the photoelectric effect with photons, and use the work function to find threshold frequencies, kinetic energies and stopping voltages.', outcomes: ['30-C2'], lessonId: L(6), calculator: true, gen: bank([PHOTOELECTRIC_IDEAS, either(thresholdFrequency, maxKineticEnergy), either(stoppingVoltage, workFromStopping, maxSpeed)], ['One photon frees one electron: $E_k = hf - W$, and nothing is freed unless $hf$ is at least $W$']) }),
  skill({ id: 'p30-photon-momentum', name: 'The momentum of a photon', description: 'Find the momentum of a photon from its wavelength or energy, and use it to find the force of light and the recoil of an atom.', outcomes: ['30-C2'], lessonId: L(7), calculator: true, gen: bank([either(momentumFromWavelength, fromBank(MOMENTUM_IDEAS, ['A photon has momentum $p = \\dfrac{h}{\\lambda}$, even though it has no mass.'])), either(momentumFromEnergy, wavelengthFromMomentum), either(lightForce, atomRecoil)], ['$p = \\dfrac{h}{\\lambda} = \\dfrac{E}{c}$']) }),
  skill({ id: 'p30-compton', name: 'The Compton effect', description: 'Explain the scattering of X-ray photons by electrons as a collision, and find the change in wavelength from the scattering angle.', outcomes: ['30-C2'], lessonId: L(7), calculator: true, gen: bank([COMPTON_IDEAS, either(comptonShift, scatteredWavelength), either(comptonAngle, comptonEnergy)], ['$\\Delta\\lambda = \\dfrac{h}{mc}(1 - \\cos\\theta)$, and the scattered photon always has the longer wavelength']) }),
  skill({ id: 'p30-de-broglie', name: 'Matter waves', description: 'Find the de Broglie wavelength of a moving particle from its mass and speed, its kinetic energy or the potential difference that accelerated it.', outcomes: ['30-C2'], lessonId: L(8), calculator: true, gen: bank([either(electronWavelength, objectWavelength), either(speedFromWavelength, particleWavelength), either(acceleratedElectron, kineticWavelength)], ['$\\lambda = \\dfrac{h}{mv}$: Planck’s constant ÷ the momentum of the particle']) }),
  skill({ id: 'p30-duality', name: 'Wave-particle duality', description: 'Say which experiments show the wave behaviour and which the particle behaviour of light and of electrons, and what the wave describes.', outcomes: ['30-C2'], lessonId: L(8), format: 'mc', gen: bank([DUALITY_1, DUALITY_2, DUALITY_3], ['Interference and diffraction show wave behaviour. The photoelectric effect and the Compton effect show particle behaviour.']) }),
];
