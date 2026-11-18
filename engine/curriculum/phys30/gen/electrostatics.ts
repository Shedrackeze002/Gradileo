/**
 * Grade 12 Physics, Unit 2, lessons 2.1 to 2.3: electric charge, Coulomb's law and electric fields
 * (30-B1, 30-B2). Charge as a whole number of elementary charges, charging by friction, contact
 * and induction, the force between point charges along a line and at a right angle, and the
 * field of one charge and of two. Every constant a question needs is in the question.
 */
import { fixedChoice, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';
import { AXES, ELECTRON, E_CHARGE, E_NOTE, K, K_NOTE, PROTON, RAD, SCI_ASK, clean, sciAsk, facts, micro, minusIf, positive, rounded, sci, sciPart, sciTex, way, type Axis } from './common.ts';

const L = (n: number) => `p30-2-${n}`;
/** A signed number as a charge is written: +3, −4.5. */
const sgn = (v: number) => (v < 0 ? `-${num(-v, 2)}` : `+${num(v, 2)}`);
/** A signed charge in microcoulombs. */
const charge = (v: number) => micro(sgn(v));
/** A signed force in a sum, to three decimal places. */
const sg3 = (v: number) => (v < 0 ? `-${num(-v, 3)}` : `+${num(v, 3)}`);
const nano = (v: number | string) => q(v, 'nC');
/** A number in a line of working, in brackets when it is negative. */
const br = (v: number) => (v < 0 ? `(${num(v, 3)})` : num(v, 3));
const pn = (s: number) => (s > 0 ? 'positive' : 'negative');
/** k written out in a line of working. */
const KT = '8.99 \\times 10^{9}';
/** "west of", "south of" or "to the left of": where something on the negative side (or the positive side) of another is. */
const beside = (ax: Axis, negative: boolean) => `${negative ? ax.neg : ax.pos} of`;
/** A value to three significant figures, as a question states a measured force or field. */
const sf3 = (x: number) => Number(x.toPrecision(3));

// ---------------------------------------------------------------------------- 2.1 electric charge

const CHARGE_IDEAS: Q[] = [
  { q: 'Two small spheres both carry a negative charge. What do they do to each other?', a: 'They repel each other', w: ['They attract each other', 'They exert no force on each other', 'They attract at first and then repel'], why: 'Like charges repel, and unlike charges attract.' },
  { q: 'An object has a negative charge. What does this say about its particles?', a: 'It has more electrons than protons', w: ['It has more protons than electrons', 'It has no protons', 'It has more neutrons than protons'], why: 'An electron carries a negative charge and a proton an equal positive charge, so a negative object has extra electrons.' },
  { q: 'When a solid object is charged, which particles move on to it or off it?', a: 'Electrons', w: ['Protons', 'Neutrons', 'Whole atoms'], why: 'Protons are held in the nuclei of the atoms. Electrons are on the outside of atoms and can be moved from one object to another.' },
  { q: 'What is the SI unit of electric charge?', a: 'The coulomb (C)', w: ['The ampere (A)', 'The volt (V)', 'The newton (N)'], why: 'Charge is measured in coulombs. One coulomb is a very large charge: the charges on rubbed objects are microcoulombs or less.' },
  { q: 'A glass rod is rubbed with silk, and the rod ends up with a charge of +5 nC. What is the charge of the silk?', a: '−5 nC', w: ['+5 nC', 'Zero', '−10 nC'], why: 'Charge is conserved: the electrons that left the rod are on the silk, so the silk has an equal negative charge.' },
  { q: 'Charge is quantized. What does this mean?', a: 'The charge of any object is a whole number of elementary charges', w: ['Charge cannot be created or destroyed', 'Charge can only be positive or negative', 'Charge is measured in coulombs'], why: 'Charge comes in steps of the elementary charge, the size of the charge of one electron or one proton.' },
  { q: 'Why is a metal a good conductor of electric charge?', a: 'Some of its electrons are free to move through the metal', w: ['Its protons are free to move through the metal', 'It has no electrons', 'Its atoms are free to move through the metal'], why: 'In a metal the outer electrons are not tied to one atom, so charge can flow through it.' },
  { q: 'A neutral atom loses two electrons. What is the charge of the ion that is left?', a: 'Positive, two elementary charges', w: ['Negative, two elementary charges', 'Positive, one elementary charge', 'Zero'], why: 'The ion has two more protons than electrons, so its charge is +2 elementary charges.' },
];

const CARRIERS = ['balloon', 'plastic ruler', 'metal sphere', 'rubber rod', 'plastic comb'];

function electronsFromCharge(rng: Rng): GenOutput {
  const c = sci(rng.float(1.2, 9.6, 1), rng.int(-9, -7));
  const thing = rng.pick(CARRIERS);
  const N = c.v / E_CHARGE;
  return {
    prompt: `${E_NOTE} A ${thing} has a charge of $-${c.tex}\\ \\text{C}$. How many excess electrons does it carry? ${SCI_ASK}`,
    parts: [sciPart(N, 3, 'electrons')],
    hints: ['Each excess electron adds one elementary charge.', 'The number of electrons is the size of the charge ÷ the elementary charge.'],
    solution: [`$N = \\dfrac{q}{e} = \\dfrac{${c.tex}}{1.60 \\times 10^{-19}} = ${sciTex(N)}$ electrons`],
  };
}

function chargeFromElectrons(rng: Rng): GenOutput {
  const N = sci(rng.float(1.5, 9.5, 1), rng.int(9, 12));
  const gains = rng.chance(0.5);
  const thing = rng.pick(CARRIERS);
  const c = N.v * E_CHARGE;
  return {
    prompt: `${E_NOTE} A neutral ${thing} ${gains ? 'gains' : 'loses'} $${N.tex}$ electrons when it is rubbed. Find the size of its charge, and say whether the charge is positive or negative. ${sciAsk('the size')}`,
    parts: [sciPart(c, 3, 'C', 'Size of the charge'), part(fixedChoice(['Positive', 'Negative'], gains ? 1 : 0), { label: 'The charge is' })],
    hints: ['charge = number of electrons × the elementary charge', 'Electrons are negative: an object that gains them becomes negative, and one that loses them becomes positive.'],
    solution: [`$q = Ne = ${N.tex} \\times 1.60 \\times 10^{-19} = ${sciTex(c)}$ C`, `The ${thing} ${gains ? 'gained electrons, so its charge is negative' : 'lost electrons, so its charge is positive'}`],
  };
}

const IONS = [
  { name: 'magnesium', p: 12, e: 10 },
  { name: 'aluminium', p: 13, e: 10 },
  { name: 'oxygen', p: 8, e: 10 },
  { name: 'chlorine', p: 17, e: 18 },
  { name: 'sodium', p: 11, e: 10 },
  { name: 'calcium', p: 20, e: 18 },
  { name: 'sulfur', p: 16, e: 18 },
  { name: 'nitrogen', p: 7, e: 10 },
];

function ionCharge(rng: Rng): GenOutput {
  const ion = rng.pick(IONS);
  const n = ion.p - ion.e;
  const c = Math.abs(n) * E_CHARGE;
  return {
    prompt: `${E_NOTE} An ion of ${ion.name} has ${ion.p} protons and ${ion.e} electrons. Find the size of its charge, in coulombs, and say whether the charge is positive or negative. ${sciAsk('the size')}`,
    parts: [sciPart(c, 3, 'C', 'Size of the charge'), part(fixedChoice(['Positive', 'Negative'], n > 0 ? 0 : 1), { label: 'The charge is' })],
    hints: ['Count how many more protons than electrons, or electrons than protons, the ion has.', 'Each one is one elementary charge.'],
    solution: [
      `The ion has ${Math.abs(n)} more ${n > 0 ? 'protons than electrons' : 'electrons than protons'}, so its charge is ${n > 0 ? 'positive' : 'negative'}.`,
      `$q = ${Math.abs(n)} \\times 1.60 \\times 10^{-19} = ${sciTex(c)}$ C`,
    ],
  };
}

function electronsTransferred(rng: Rng): GenOutput {
  const { q1, q2 } = retry(
    () => ({ q1: rng.sign() * rng.int(2, 40), q2: rng.sign() * rng.int(0, 40) }),
    (t) => Math.abs(t.q2 - t.q1) >= 2,
  );
  const N = (Math.abs(q2 - q1) * 1e-9) / E_CHARGE;
  const gained = q2 < q1;
  return {
    prompt: `${E_NOTE} A metal sphere has a charge of ${nano(sgn(q1))}. After it touches another object, its charge is ${q2 === 0 ? 'zero' : nano(sgn(q2))}. How many electrons moved, and did they move on to the sphere or off it? ${sciAsk('the number')}`,
    parts: [sciPart(N, 3, 'electrons', 'Number of electrons'), part(fixedChoice(['On to the sphere', 'Off the sphere'], gained ? 0 : 1), { label: 'The electrons moved' })],
    hints: ['Find the change in the charge of the sphere, in coulombs. One nanocoulomb is $10^{-9}$ C.', 'The number of electrons is the size of that change ÷ the elementary charge.', 'A charge that becomes more negative has gained electrons.'],
    solution: [
      `Change in charge: $${num(q2)} - ${br(q1)} = ${num(q2 - q1)}$ nC $= ${sciTex((q2 - q1) * 1e-9)}$ C`,
      `$N = \\dfrac{${sciTex(Math.abs(q2 - q1) * 1e-9)}}{1.60 \\times 10^{-19}} = ${sciTex(N)}$ electrons`,
      `The charge became more ${gained ? 'negative, so electrons moved on to the sphere' : 'positive, so electrons moved off the sphere'}`,
    ],
  };
}

// ---------------------------------------------------------------------------- 2.1 charging

const FRICTION_IDEAS: Q[] = [
  { q: 'A plastic rod is rubbed with a wool cloth, and the rod becomes negatively charged. What happened?', a: 'Electrons moved from the wool to the rod', w: ['Protons moved from the rod to the wool', 'Electrons moved from the rod to the wool', 'Electrons were created on the rod'], why: 'Rubbing moves electrons from one material to the other. The rod gained electrons, so they came from the wool.' },
  { q: 'An ebonite rod is rubbed with fur and gains electrons. What are the charges of the rod and the fur?', a: 'The rod is negative and the fur is positive', w: ['The rod is positive and the fur is negative', 'Both are negative', 'The rod is negative and the fur is neutral'], why: 'The rod has extra electrons, so it is negative. The fur lost the same number, so it is positive by the same amount.' },
  { q: 'Does charging by friction create electric charge?', a: 'No: it moves electrons from one object to the other, and the total charge stays the same', w: ['Yes: rubbing makes new electrons', 'Yes: rubbing makes new protons', 'No: it destroys the electrons of one object'], why: 'Charge is conserved. The two rubbed objects end with equal and opposite charges.' },
  { q: 'A list ranks materials by how weakly they hold their electrons, with the weakest hold at the top. Glass is above silk in the list. What happens when glass is rubbed with silk?', a: 'The glass becomes positive and the silk becomes negative', w: ['The glass becomes negative and the silk becomes positive', 'Both become positive', 'Neither becomes charged'], why: 'The material with the weaker hold loses electrons to the other, so the glass loses electrons and becomes positive.' },
  { q: 'A charged comb picks up small pieces of neutral paper. Why is the neutral paper attracted?', a: 'The charges inside the paper shift, so the side nearer the comb has the opposite charge', w: ['The paper gains the same charge as the comb', 'Neutral objects are attracted to each other', 'The comb gives the paper its electrons before they touch'], why: 'The comb pulls unlike charge in the paper a little closer and pushes like charge a little further away. The attraction of the nearer charge is stronger.' },
  { q: 'Two different insulators are rubbed together and then pulled apart. How do the sizes of their charges compare?', a: 'They are equal, with opposite signs', w: ['The larger object has the larger charge', 'They are equal, with the same sign', 'Only one of them is charged'], why: 'Every electron that one object loses, the other gains.' },
];

const CONTACT_IDEAS: Q[] = [
  { q: 'A negatively charged rod touches a neutral metal sphere on an insulating stand. What is the charge of the sphere afterwards?', a: 'Negative, because electrons moved from the rod to the sphere', w: ['Positive, because electrons moved from the sphere to the rod', 'Neutral, because the sphere is a conductor', 'Positive, because protons moved from the rod to the sphere'], why: 'Charging by contact shares the charge of the rod: some of its extra electrons move on to the sphere.' },
  { q: 'A positively charged rod touches a neutral metal sphere on an insulating stand. What moves?', a: 'Electrons move from the sphere to the rod', w: ['Protons move from the rod to the sphere', 'Electrons move from the rod to the sphere', 'Nothing moves'], why: 'Only electrons can move. The positive rod attracts some of the electrons of the sphere, which is left positive.' },
  { q: 'An object is charged by contact with a charged rod. How does the sign of its charge compare with that of the rod?', a: 'It is the same as the sign of the rod', w: ['It is opposite to the sign of the rod', 'It is always negative', 'It is always positive'], why: 'In charging by contact the two objects share one charge, so both end with the same sign.' },
  { q: 'A charged metal sphere is connected to the ground by a wire. What happens to the sphere?', a: 'It becomes neutral, as electrons flow between it and the ground', w: ['It keeps its charge', 'Its charge doubles', 'It gains the opposite charge'], why: 'The Earth can take or supply as many electrons as are needed. Grounding lets the charge of the sphere flow away.' },
  { q: 'A negatively charged rod touches the knob of a neutral electroscope. What do the leaves do?', a: 'They move apart, because both leaves become negative', w: ['They stay together, because the electroscope is metal', 'They move apart, because one leaf is positive and one is negative', 'They move together, because both leaves become negative'], why: 'Electrons spread over the knob, the stem and the leaves. The two leaves have like charges, so they repel.' },
];

const INDUCTION_IDEAS: Q[] = [
  { q: 'A negatively charged rod is held near a neutral metal sphere without touching it. The sphere is touched with a finger for a moment, and then the rod is taken away. What is the charge of the sphere?', a: 'Positive', w: ['Negative', 'Neutral', 'Negative on one side and positive on the other'], why: 'The rod repels electrons off the sphere through the finger. When the finger is removed the sphere is left short of electrons, so it is positive.' },
  { q: 'An object is charged by induction, using a charged rod. How does the sign of its charge compare with that of the rod?', a: 'It is opposite to the sign of the rod', w: ['It is the same as the sign of the rod', 'It is always negative', 'It depends on how long the rod is held there'], why: 'The rod drives like charge off the object to the ground, so the object is left with the opposite charge.' },
  { q: 'A positively charged rod is held near the knob of a neutral electroscope, without touching it. What do the leaves do?', a: 'They move apart, because electrons are drawn up to the knob and both leaves are left positive', w: ['They stay together, because the electroscope is still neutral', 'They move apart, because both leaves become negative', 'They move together, because the leaves attract each other'], why: 'The electroscope stays neutral overall, but its electrons move towards the rod. Both leaves are short of electrons, so they repel.' },
  { q: 'Two neutral metal spheres, A and B, touch each other on insulating stands. A negatively charged rod is held near sphere A, on the side away from B. The spheres are moved apart, and then the rod is taken away. What are their charges?', a: 'A is positive and B is negative', w: ['A is negative and B is positive', 'Both are negative', 'Both are neutral'], why: 'The rod repels electrons from A across to B. Separating the spheres traps the extra electrons on B and leaves A short of them.' },
  { q: 'A sphere is charged by induction, using a charged rod. How much of its charge does the rod lose?', a: 'None, because the rod never touches the sphere', w: ['Half of it', 'All of it', 'As much as the sphere gains'], why: 'The charge of the sphere comes from the ground, or goes to it. The rod only pushes or pulls the electrons from a distance.' },
  { q: 'In charging by induction, the ground connection is removed before the charged rod is taken away. What happens if the rod is taken away first?', a: 'The electrons flow back, and the sphere ends up neutral', w: ['The sphere ends up with twice the charge', 'The sphere ends up with the same sign as the rod', 'Nothing different: the order does not matter'], why: 'With the rod gone and the ground still connected, nothing holds the charge in place, and the sphere returns to neutral.' },
];

function shareCharge(rng: Rng): GenOutput {
  const { q1, q2 } = retry(
    () => ({ q1: rng.sign() * 2 * rng.int(1, 20), q2: rng.sign() * 2 * rng.int(0, 20) }),
    (t) => t.q1 !== t.q2,
  );
  const each = (q1 + q2) / 2;
  return {
    prompt: `Two identical metal spheres on insulating stands carry charges of ${nano(sgn(q1))} and ${q2 === 0 ? 'zero' : nano(sgn(q2))}. They are touched together and then moved apart. What is the charge of each sphere now? Include a minus sign if it is negative.`,
    parts: [numPart(each, { suffix: 'nC' })],
    hints: ['Charge is conserved: add the two charges, with their signs, to find the total.', 'Identical spheres share the total equally.'],
    solution: [`Total charge: $${num(q1)} + ${br(q2)} = ${num(q1 + q2)}$ nC`, `The spheres are identical, so each takes half: $\\dfrac{${num(q1 + q2)}}{2} = ${num(each)}$ nC`],
  };
}

function shareSequence(rng: Rng): GenOutput {
  const a0 = rng.sign() * 8 * rng.int(1, 6);
  const c0 = rng.sign() * 4 * rng.int(0, 5);
  const a = a0 / 2;
  const bc = (a + c0) / 2;
  return {
    prompt: `Three identical metal spheres on insulating stands carry these charges: A has ${nano(sgn(a0))}, B is neutral, and C ${c0 === 0 ? 'is neutral' : `has ${nano(sgn(c0))}`}. Sphere A is touched to sphere B and moved away. Then sphere B is touched to sphere C and moved away. Find the final charge of each sphere. Include a minus sign if a charge is negative.`,
    parts: [numPart(a, { suffix: 'nC', label: 'A' }), numPart(bc, { suffix: 'nC', label: 'B' }), numPart(bc, { suffix: 'nC', label: 'C' })],
    hints: ['Each time two identical spheres touch, they share their total charge equally.', 'Work through the touches in order. Sphere A is not touched again after the first one.'],
    solution: [
      `A touches B: the total is $${num(a0)} + 0 = ${num(a0)}$ nC, so each has $${num(a)}$ nC.`,
      `B touches C: the total is $${num(a)} + ${br(c0)} = ${num(a + c0)}$ nC, so each has $${num(bc)}$ nC.`,
      `A: ${num(a)} nC, B: ${num(bc)} nC, C: ${num(bc)} nC`,
    ],
  };
}

// ---------------------------------------------------------------------------- 2.2 Coulomb's law

const MICRO = [1.5, 2, 2.5, 3, 4, 4.5, 5, 6, 7.5, 8];
const coulomb = (q1: number, q2: number, r: number) => (K * q1 * 1e-6 * q2 * 1e-6) / (r * r);
/** The working for the force between two charges in microcoulombs. */
const coulombTex = (q1: number, q2: number, r: number) => `\\dfrac{${KT} \\times ${q1} \\times 10^{-6} \\times ${q2} \\times 10^{-6}}{${r}^2}`;

function coulombForce(rng: Rng): GenOutput {
  const c = retry(
    () => ({ q1: rng.pick(MICRO), q2: rng.pick(MICRO), r: rng.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5]) }),
    (t) => coulomb(t.q1, t.q2, t.r) >= 1 && coulomb(t.q1, t.q2, t.r) <= 100,
  );
  const s1 = rng.sign();
  const s2 = rng.sign();
  const F = coulomb(c.q1, c.q2, c.r);
  return {
    prompt: `${K_NOTE} Two small charged spheres carry charges of ${charge(s1 * c.q1)} and ${charge(s2 * c.q2)}. Their centres are ${q(c.r, 'm')} apart. Find the size of the force that each sphere exerts on the other, to 2 decimal places, and say whether the spheres attract or repel.`,
    parts: [rounded(F, 2, 'N', 'Size of the force'), part(fixedChoice(['They attract', 'They repel'], s1 === s2 ? 1 : 0), { label: 'The spheres' })],
    hints: ['Change the microcoulombs to coulombs: $1\\ \\mu\\text{C} = 10^{-6}$ C.', 'Coulomb’s law: $F = \\dfrac{kq_1q_2}{r^2}$. Use the sizes of the charges, without their signs.', 'Like charges repel, and unlike charges attract.'],
    solution: [`$F = \\dfrac{kq_1q_2}{r^2} = ${coulombTex(c.q1, c.q2, c.r)} = ${num(F, 2)}$ N`, `The charges have ${s1 === s2 ? 'the same sign, so the spheres repel' : 'opposite signs, so the spheres attract'}`],
  };
}

const SCALINGS = [
  { change: 'the distance between them is doubled', f: 1 / 4, why: 'The force is proportional to $\\dfrac{1}{r^2}$, so twice the distance gives $\\dfrac{1}{4}$ of the force.' },
  { change: 'the distance between them is tripled', f: 1 / 9, why: 'The force is proportional to $\\dfrac{1}{r^2}$, so three times the distance gives $\\dfrac{1}{9}$ of the force.' },
  { change: 'the distance between them is halved', f: 4, why: 'The force is proportional to $\\dfrac{1}{r^2}$, so half the distance gives 4 times the force.' },
  { change: 'one of the charges is doubled', f: 2, why: 'The force is proportional to each charge, so doubling one charge doubles the force.' },
  { change: 'both charges are doubled', f: 4, why: 'The force is proportional to the product of the charges, which becomes 4 times as large.' },
  { change: 'one charge is doubled and the distance between them is doubled', f: 1 / 2, why: 'Doubling one charge doubles the force, and doubling the distance divides it by 4: $2 \\times \\dfrac{1}{4} = \\dfrac{1}{2}$.' },
  { change: 'both charges are tripled and the distance between them is tripled', f: 1, why: 'The product of the charges becomes 9 times as large, and tripling the distance divides the force by 9, so the force does not change.' },
  { change: 'one charge is halved and the distance between them is halved', f: 2, why: 'Halving one charge halves the force, and halving the distance multiplies it by 4: $\\dfrac{1}{2} \\times 4 = 2$.' },
];

function coulombScale(rng: Rng): GenOutput {
  const F = rng.pick([0.36, 0.72, 1.8, 3.6, 7.2, 14.4]);
  const s = rng.pick(SCALINGS);
  const now = clean(F * s.f);
  return {
    prompt: `Two point charges exert a force of ${q(F, 'N')} on each other. What is the size of the force if ${s.change}?`,
    parts: [numPart(now, { suffix: 'N' })],
    hints: ['The force is proportional to each charge, and to $\\dfrac{1}{r^2}$.', 'Work out the factor by which the force changes, and multiply.'],
    solution: [s.why, `New force: $${F} \\times ${num(s.f, 4)} = ${now}$ N`],
  };
}

function coulombNano(rng: Rng): GenOutput {
  const q1 = 10 * rng.int(2, 9);
  const q2 = 10 * rng.int(2, 9);
  const r = rng.pick([2, 3, 4, 5, 6, 8]);
  const F = (K * q1 * 1e-9 * q2 * 1e-9) / (r / 100) ** 2;
  return {
    prompt: `${K_NOTE} Two small charged beads carry charges of ${nano(q1)} and ${nano(q2)}. Their centres are ${q(r, 'cm')} apart. Find the size of the force between them. ${SCI_ASK}`,
    parts: [sciPart(F, 3, 'N')],
    hints: ['Change the nanocoulombs to coulombs, $1\\ \\text{nC} = 10^{-9}$ C, and the centimetres to metres.', 'Coulomb’s law: $F = \\dfrac{kq_1q_2}{r^2}$'],
    solution: [`$r = ${r}\\ \\text{cm} = ${clean(r / 100)}$ m`, `$F = \\dfrac{${KT} \\times ${q1} \\times 10^{-9} \\times ${q2} \\times 10^{-9}}{${clean(r / 100)}^2} = ${sciTex(F)}$ N`],
  };
}

function coulombDistance(rng: Rng): GenOutput {
  const c = retry(
    () => ({ q1: rng.pick(MICRO), q2: rng.pick(MICRO), r: rng.pick([0.12, 0.15, 0.18, 0.24, 0.3, 0.36, 0.45, 0.6, 0.75]) }),
    (t) => coulomb(t.q1, t.q2, t.r) >= 0.1,
  );
  const F = sf3(coulomb(c.q1, c.q2, c.r));
  const r = Math.sqrt((K * c.q1 * c.q2 * 1e-12) / F);
  return {
    prompt: `${K_NOTE} Two point charges of ${micro(c.q1)} and ${micro(c.q2)} repel each other with a force of ${q(F, 'N')}. How far apart are they? Give your answer in metres, to 3 decimal places.`,
    parts: [rounded(r, 3, 'm')],
    hints: ['Rearrange Coulomb’s law for the distance: $r = \\sqrt{\\dfrac{kq_1q_2}{F}}$.', 'Change the microcoulombs to coulombs first.'],
    solution: [`$r = \\sqrt{\\dfrac{kq_1q_2}{F}} = \\sqrt{\\dfrac{${KT} \\times ${c.q1} \\times 10^{-6} \\times ${c.q2} \\times 10^{-6}}{${F}}} = ${num(r, 3)}$ m`],
  };
}

function coulombEqual(rng: Rng): GenOutput {
  const q0 = rng.float(1.5, 9.5, 1);
  const r0 = rng.pick([0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6]);
  const F = sf3(coulomb(q0, q0, r0));
  const each = r0 * Math.sqrt(F / K) * 1e6;
  return {
    prompt: `${K_NOTE} Two small spheres carry equal charges. When their centres are ${q(r0, 'm')} apart they repel with a force of ${q(F, 'N')}. Find the size of the charge of each sphere, in microcoulombs, to 2 decimal places.`,
    parts: [rounded(each, 2, 'μC')],
    hints: ['With equal charges, Coulomb’s law is $F = \\dfrac{kq^2}{r^2}$.', 'Rearrange: $q = r\\sqrt{\\dfrac{F}{k}}$. Then change the coulombs to microcoulombs.'],
    solution: [`$F = \\dfrac{kq^2}{r^2}$, so $q = r\\sqrt{\\dfrac{F}{k}} = ${r0} \\times \\sqrt{\\dfrac{${F}}{${KT}}} = ${sciTex(each * 1e-6)}$ C`, `$q = ${num(each, 2)}\\ \\mu\\text{C}$`],
  };
}

function particleForce(rng: Rng): GenOutput {
  const atom = rng.chance(0.5);
  const r = atom ? sci(rng.float(0.5, 2.1, 1), -10) : sci(rng.float(1.5, 4.5, 1), -15);
  const F = (K * E_CHARGE * E_CHARGE) / (r.v * r.v);
  return {
    prompt: `${K_NOTE} ${facts(PROTON, false)} ${atom ? `${facts(ELECTRON, false)} In an atom, an electron is $${r.tex}\\ \\text{m}$ from a proton.` : `Two protons in a nucleus are $${r.tex}\\ \\text{m}$ apart.`} Find the size of the electric force between them. ${SCI_ASK}`,
    parts: [sciPart(F, 3, 'N')],
    hints: ['Coulomb’s law: $F = \\dfrac{kq_1q_2}{r^2}$, with the sizes of the two charges.', 'Both charges have the size of the elementary charge.'],
    solution: [`$F = \\dfrac{kq_1q_2}{r^2} = \\dfrac{${KT} \\times (1.60 \\times 10^{-19})^2}{(${r.tex})^2} = ${sciTex(F)}$ N, ${atom ? 'an attraction' : 'a repulsion'}`],
  };
}

// ---------------------------------------------------------------------------- 2.2 more than two charges

/** The force on B from a charge on its negative side (A) or its positive side (C), with its sign along the axis. */
const fromNegativeSide = (sSource: number, sTarget: number) => (sSource === sTarget ? 1 : -1);
const fromPositiveSide = (sSource: number, sTarget: number) => (sSource === sTarget ? -1 : 1);
const pushOrPull = (same: boolean, source: string, target: string) => (same ? `${source} and ${target} have like charges, so ${source} pushes ${target} away` : `${source} and ${target} have unlike charges, so ${source} pulls ${target} towards it`);

function lineGivenForces(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const sA = rng.sign();
  const sB = rng.sign();
  const sC = rng.sign();
  const { FA, FC } = retry(
    () => ({ FA: rng.float(0.3, 4.5, 1), FC: rng.float(0.3, 4.5, 1) }),
    (t) => t.FA !== t.FC,
  );
  const a = fromNegativeSide(sA, sB) * FA;
  const c = fromPositiveSide(sC, sB) * FC;
  const net = clean(a + c);
  return {
    prompt: `${positive(ax)} Three charges lie on one line. Charge A, which is ${pn(sA)}, is ${beside(ax, true)} charge B, which is ${pn(sB)}. Charge C, which is ${pn(sC)}, is ${beside(ax, false)} charge B. Charge A exerts a force of ${q(FA, 'N')} on charge B, and charge C exerts a force of ${q(FC, 'N')} on charge B. Find the net force on charge B. ${minusIf(ax)}`,
    parts: [numPart(net, { suffix: 'N' })],
    hints: ['Decide the direction of each force on B: like charges repel, and unlike charges attract.', 'Give each force a sign, and add.'],
    solution: [
      `${pushOrPull(sA === sB, 'A', 'B')}: ${num(FA)} N ${way(ax, a)}.`,
      `${pushOrPull(sC === sB, 'C', 'B')}: ${num(FC)} N ${way(ax, c)}.`,
      `Net force: $(${sgn(a)}) + (${sgn(c)}) = ${num(net)}$ N, so ${num(Math.abs(net))} N ${way(ax, net)}`,
    ],
  };
}

function lineMiddle(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const sA = rng.sign();
  const sB = rng.sign();
  const sC = rng.sign();
  const c = retry(
    () => ({ qA: rng.pick(MICRO), qB: rng.pick(MICRO), qC: rng.pick(MICRO), r1: rng.pick([0.2, 0.25, 0.3, 0.4, 0.5]), r2: rng.pick([0.2, 0.25, 0.3, 0.4, 0.5]) }),
    (t) => {
      const a = fromNegativeSide(sA, sB) * coulomb(t.qA, t.qB, t.r1);
      const b = fromPositiveSide(sC, sB) * coulomb(t.qC, t.qB, t.r2);
      return Math.abs(a) >= 0.2 && Math.abs(b) >= 0.2 && Math.abs(a + b) >= 0.1;
    },
  );
  const FA = coulomb(c.qA, c.qB, c.r1);
  const FC = coulomb(c.qC, c.qB, c.r2);
  const a = fromNegativeSide(sA, sB) * FA;
  const b = fromPositiveSide(sC, sB) * FC;
  const net = a + b;
  return {
    prompt: `${K_NOTE} ${positive(ax)} Three charges lie on one line. Charge A (${charge(sA * c.qA)}) is ${q(c.r1, 'm')} ${beside(ax, true)} charge B (${charge(sB * c.qB)}), and charge C (${charge(sC * c.qC)}) is ${q(c.r2, 'm')} ${beside(ax, false)} charge B. Find the net force on charge B, to 2 decimal places. ${minusIf(ax)}`,
    parts: [rounded(net, 2, 'N')],
    hints: ['Find the size of the force of A on B, and of C on B, with Coulomb’s law.', 'Decide the direction of each force: like charges repel, and unlike charges attract.', 'Give each force a sign, and add.'],
    solution: [
      `A on B: $${coulombTex(c.qA, c.qB, c.r1)} = ${num(FA, 3)}$ N. ${pushOrPull(sA === sB, 'A', 'B')}, ${way(ax, a)}.`,
      `C on B: $${coulombTex(c.qC, c.qB, c.r2)} = ${num(FC, 3)}$ N. ${pushOrPull(sC === sB, 'C', 'B')}, ${way(ax, b)}.`,
      `Net force: $(${sg3(a)}) + (${sg3(b)}) = ${num(net, 2)}$ N, so ${num(Math.abs(net), 2)} N ${way(ax, net)}`,
    ],
  };
}

function lineEnd(rng: Rng): GenOutput {
  const ax = rng.pick(AXES);
  const sA = rng.sign();
  const sB = rng.sign();
  const sC = rng.sign();
  const c = retry(
    () => ({ qA: rng.pick(MICRO), qB: rng.pick(MICRO), qC: rng.pick(MICRO), r1: rng.pick([0.2, 0.3, 0.4, 0.5]), r2: rng.pick([0.2, 0.25, 0.3, 0.4, 0.5]) }),
    (t) => {
      const a = fromNegativeSide(sA, sC) * coulomb(t.qA, t.qC, t.r1 + t.r2);
      const b = fromNegativeSide(sB, sC) * coulomb(t.qB, t.qC, t.r2);
      return Math.abs(a) >= 0.1 && Math.abs(a + b) >= 0.1;
    },
  );
  const far = clean(c.r1 + c.r2);
  const FA = coulomb(c.qA, c.qC, far);
  const FB = coulomb(c.qB, c.qC, c.r2);
  const a = fromNegativeSide(sA, sC) * FA;
  const b = fromNegativeSide(sB, sC) * FB;
  const net = a + b;
  return {
    prompt: `${K_NOTE} ${positive(ax)} Three charges lie on one line. Charge A (${charge(sA * c.qA)}) is ${q(c.r1, 'm')} ${beside(ax, true)} charge B (${charge(sB * c.qB)}), and charge C (${charge(sC * c.qC)}) is ${q(c.r2, 'm')} ${beside(ax, false)} charge B. Find the net force on charge C, to 2 decimal places. ${minusIf(ax)}`,
    parts: [rounded(net, 2, 'N')],
    hints: [`Both A and B act on C. The distance from A to C is the sum of the two distances.`, 'Find the size and the direction of each force on C.', 'Give each force a sign, and add.'],
    solution: [
      `A is $${c.r1} + ${c.r2} = ${far}$ m from C.`,
      `A on C: $${coulombTex(c.qA, c.qC, far)} = ${num(FA, 3)}$ N. ${pushOrPull(sA === sC, 'A', 'C')}, ${way(ax, a)}.`,
      `B on C: $${coulombTex(c.qB, c.qC, c.r2)} = ${num(FB, 3)}$ N. ${pushOrPull(sB === sC, 'B', 'C')}, ${way(ax, b)}.`,
      `Net force: $(${sg3(a)}) + (${sg3(b)}) = ${num(net, 2)}$ N, so ${num(Math.abs(net), 2)} N ${way(ax, net)}`,
    ],
  };
}

function rightAngle(rng: Rng): GenOutput {
  const sA = rng.sign();
  const sB = rng.sign();
  const sC = rng.sign();
  const c = retry(
    () => ({ qA: rng.pick(MICRO), qB: rng.pick(MICRO), qC: rng.pick(MICRO), r1: rng.pick([0.2, 0.25, 0.3, 0.4, 0.5]), r2: rng.pick([0.2, 0.25, 0.3, 0.4, 0.5]) }),
    (t) => {
      const angle = Math.atan(coulomb(t.qA, t.qC, t.r2) / coulomb(t.qA, t.qB, t.r1)) / RAD;
      return angle >= 15 && angle <= 75;
    },
  );
  const FB = coulomb(c.qA, c.qB, c.r1);
  const FC = coulomb(c.qA, c.qC, c.r2);
  const net = Math.hypot(FB, FC);
  const angle = Math.atan(FC / FB) / RAD;
  return {
    prompt: `${K_NOTE} Three charges sit at the corners of a right-angled triangle. Charge A (${charge(sA * c.qA)}) is at the right angle. Charge B (${charge(sB * c.qB)}) is ${q(c.r1, 'm')} east of A, and charge C (${charge(sC * c.qC)}) is ${q(c.r2, 'm')} north of A. Find the size of the net force on charge A, to 2 decimal places, and the angle between that force and the east-west line, to 1 decimal place.`,
    parts: [rounded(net, 2, 'N', 'Net force'), rounded(angle, 1, '°', 'Angle')],
    hints: ['The force of B on A acts along the east-west line, and the force of C on A acts along the north-south line.', 'Two forces at right angles add with the Pythagorean theorem.', 'The tangent of the angle is the north-south force ÷ the east-west force.'],
    solution: [
      `B on A: $${coulombTex(c.qA, c.qB, c.r1)} = ${num(FB, 3)}$ N, towards the ${sA === sB ? 'west' : 'east'}.`,
      `C on A: $${coulombTex(c.qA, c.qC, c.r2)} = ${num(FC, 3)}$ N, towards the ${sA === sC ? 'south' : 'north'}.`,
      `$F = \\sqrt{${num(FB, 3)}^2 + ${num(FC, 3)}^2} = ${num(net, 2)}$ N`,
      `$\\theta = \\tan^{-1}\\left(\\dfrac{${num(FC, 3)}}{${num(FB, 3)}}\\right) = ${num(angle, 1)}°$ from the east-west line, so the force points ${num(angle, 1)}° ${sA === sC ? 'south' : 'north'} of ${sA === sB ? 'west' : 'east'}`,
    ],
  };
}

// ---------------------------------------------------------------------------- 2.3 electric field strength

function fieldFromForce(rng: Rng): GenOutput {
  const E = rng.pick([200, 400, 500, 800, 1200, 1500, 2500, 4000, 6000]);
  const qv = rng.pick([0.5, 1, 2, 2.5, 4, 5, 8]);
  const F = clean(qv * 1e-6 * E * 1e6) / 1e6;
  return {
    prompt: `A small test charge of ${micro(qv)} feels a force of ${q(F, 'N')} at a point in an electric field. What is the electric field strength at that point?`,
    parts: [numPart(E, { suffix: 'N/C' })],
    hints: ['Electric field strength is the force on each coulomb of charge: $E = \\dfrac{F}{q}$.', 'Change the microcoulombs to coulombs.'],
    solution: [`$E = \\dfrac{F}{q} = \\dfrac{${F}}{${qv} \\times 10^{-6}} = ${E}$ N/C`],
  };
}

function forceInField(rng: Rng): GenOutput {
  const E = rng.pick([200, 400, 500, 800, 1200, 1500, 2500, 4000, 6000]);
  const qv = rng.pick([0.5, 1, 2, 2.5, 4, 5, 8]);
  const F = clean(qv * 1e-6 * E * 1e6) / 1e6;
  return {
    prompt: `A charge of ${micro(qv)} is placed at a point where the electric field strength is ${q(E, 'N/C')}. What is the size of the electric force on the charge, in newtons?`,
    parts: [numPart(F, { suffix: 'N', tolerance: F * 0.005 })],
    hints: ['The force on a charge in a field is the charge × the field strength: $F = qE$.', 'Change the microcoulombs to coulombs.'],
    solution: [`$F = qE = ${qv} \\times 10^{-6} \\times ${E} = ${F}$ N`],
  };
}

function pointField(rng: Rng): GenOutput {
  const s = rng.sign();
  const qv = rng.pick(MICRO);
  const r = rng.pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.8, 1.2, 1.5, 2]);
  const E = (K * qv * 1e-6) / (r * r);
  return {
    prompt: `${K_NOTE} Find the size of the electric field ${q(r, 'm')} from a point charge of ${charge(s * qv)}, and say which way the field points there. ${sciAsk('the size')}`,
    parts: [sciPart(E, 3, 'N/C', 'Field strength'), part(fixedChoice(['Away from the charge', 'Towards the charge'], s > 0 ? 0 : 1), { label: 'The field points' })],
    hints: ['The field of a point charge: $E = \\dfrac{kq}{r^2}$, with the size of the charge in coulombs.', 'The field points the way a positive test charge would be pushed.'],
    solution: [`$E = \\dfrac{kq}{r^2} = \\dfrac{${KT} \\times ${qv} \\times 10^{-6}}{${r}^2} = ${sciTex(E)}$ N/C`, `A positive test charge would be ${s > 0 ? 'pushed away from a positive charge, so the field points away from it' : 'pulled towards a negative charge, so the field points towards it'}`],
  };
}

function fieldDistance(rng: Rng): GenOutput {
  const qv = rng.pick(MICRO);
  const r0 = rng.pick([0.5, 0.6, 0.75, 0.8, 1.2, 1.5, 2, 2.5, 3, 4]);
  const E = sf3((K * qv * 1e-6) / (r0 * r0));
  const r = Math.sqrt((K * qv * 1e-6) / E);
  return {
    prompt: `${K_NOTE} How far from a point charge of ${micro(qv)} is the electric field strength $${sciTex(E)}\\ \\text{N/C}$? Give your answer to 2 decimal places.`,
    parts: [rounded(r, 2, 'm')],
    hints: ['Rearrange $E = \\dfrac{kq}{r^2}$ for the distance: $r = \\sqrt{\\dfrac{kq}{E}}$.'],
    solution: [`$r = \\sqrt{\\dfrac{kq}{E}} = \\sqrt{\\dfrac{${KT} \\times ${qv} \\times 10^{-6}}{${sciTex(E)}}} = ${num(r, 2)}$ m`],
  };
}

function chargeFromField(rng: Rng): GenOutput {
  const q0 = rng.float(1.5, 9.5, 1);
  const r = rng.pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1.2, 1.5]);
  const E = sf3((K * q0 * 1e-6) / (r * r));
  const qv = ((E * r * r) / K) * 1e6;
  return {
    prompt: `${K_NOTE} The electric field strength ${q(r, 'm')} from a small charged sphere is $${sciTex(E)}\\ \\text{N/C}$. Find the size of the charge of the sphere, in microcoulombs, to 2 decimal places.`,
    parts: [rounded(qv, 2, 'μC')],
    hints: ['Rearrange $E = \\dfrac{kq}{r^2}$ for the charge: $q = \\dfrac{Er^2}{k}$.', 'Change the coulombs to microcoulombs: $1\\ \\mu\\text{C} = 10^{-6}$ C.'],
    solution: [`$q = \\dfrac{Er^2}{k} = \\dfrac{${sciTex(E)} \\times ${r}^2}{${KT}} = ${sciTex(qv * 1e-6)}$ C $= ${num(qv, 2)}\\ \\mu\\text{C}$`],
  };
}

function particleInField(rng: Rng): GenOutput {
  const p = rng.pick([ELECTRON, PROTON]);
  const E = rng.pick([150, 250, 400, 600, 900, 1500, 2500, 4000, 8000]);
  const dir = rng.pick(['east', 'north', 'up', 'to the right']);
  const F = p.q * E;
  return {
    prompt: `${facts(p, false)} The ${p.name} is in a uniform electric field of ${q(E, 'N/C')} that points ${dir}. Find the size of the electric force on the ${p.name}, and say which way the force points. ${sciAsk('the size')}`,
    parts: [sciPart(F, 3, 'N', 'Size of the force'), part(fixedChoice(['The same way as the field', 'The opposite way to the field'], p.sign > 0 ? 0 : 1), { label: 'The force points' })],
    hints: ['$F = qE$, with the size of the charge.', 'The field points the way a positive charge is pushed. A negative charge is pushed the opposite way.'],
    solution: [`$F = qE = ${p.qTex} \\times ${E} = ${sciTex(F)}$ N`, `The ${p.name} is ${p.sign > 0 ? 'positive, so the force points the same way as the field' : 'negative, so the force points the opposite way to the field'}`],
  };
}

// ---------------------------------------------------------------------------- 2.3 field lines and the field of two charges

const FIELD_IDEAS: Q[] = [
  { q: 'How is the direction of an electric field at a point defined?', a: 'As the direction of the force on a positive test charge placed there', w: ['As the direction of the force on a negative test charge placed there', 'As the direction in which electrons move there', 'As the direction towards the nearest charge'], why: 'The field points the way a small positive charge would be pushed.' },
  { q: 'Which way do electric field lines point near a single positive charge?', a: 'Straight out, away from the charge, in all directions', w: ['Straight in, towards the charge, from all directions', 'In circles round the charge', 'From the north side of the charge to the south side'], why: 'A positive test charge is repelled by a positive charge, so the lines point away from it.' },
  { q: 'On a diagram of field lines, what do lines that are close together show?', a: 'A strong field', w: ['A weak field', 'A positive charge', 'A field that is changing direction'], why: 'The closer the lines, the stronger the field there.' },
  { q: 'An electric field points east. Which way is the force on an electron in the field?', a: 'West', w: ['East', 'North', 'There is no force on it'], why: 'The field shows the force on a positive charge. An electron is negative, so it is pushed the opposite way.' },
  { q: 'Can two electric field lines cross?', a: 'No, because the field at a point has only one direction', w: ['Yes, wherever two charges are close together', 'Yes, at the midpoint between two charges', 'No, because field lines are always parallel'], why: 'A crossing would give two directions for the force on a test charge at one point.' },
  { q: 'What is the electric field like between two large parallel plates with opposite charges?', a: 'Uniform: it has the same strength and direction everywhere between the plates', w: ['Strongest halfway between the plates', 'Zero everywhere between the plates', 'Strongest next to the positive plate and zero at the negative plate'], why: 'The field lines between parallel plates are straight, parallel and evenly spaced, from the positive plate to the negative plate.' },
  { q: 'A test charge at a point in a field is replaced by one with twice the charge. What happens to the field strength at that point, and to the force on the test charge?', a: 'The field strength stays the same, and the force doubles', w: ['Both double', 'The field strength doubles, and the force stays the same', 'Both stay the same'], why: 'The field belongs to the charges that make it, not to the test charge. The force is $F = qE$, so it doubles.' },
  { q: 'Which of these is a unit of electric field strength?', a: 'N/C', w: ['N·C', 'C/N', 'N/kg'], why: 'Field strength is the force on each coulomb: newtons per coulomb.' },
];

function midpointField(rng: Rng): GenOutput {
  const c = retry(
    () => ({ a: rng.sign() * rng.pick(MICRO), b: rng.sign() * rng.pick(MICRO), d: rng.pick([0.2, 0.4, 0.6, 0.8, 1, 1.2]) }),
    (t) => t.a !== t.b,
  );
  const half = clean(c.d / 2);
  const EA = (K * Math.abs(c.a) * 1e-6) / (half * half);
  const EB = (K * Math.abs(c.b) * 1e-6) / (half * half);
  // Positive is from A towards B: the field of a positive A points to B, and that of a positive B points to A.
  const a = Math.sign(c.a) * EA;
  const b = -Math.sign(c.b) * EB;
  const net = a + b;
  const side = (x: number) => (x > 0 ? 'towards B' : 'towards A');
  return {
    prompt: `${K_NOTE} Charge A (${charge(c.a)}) and charge B (${charge(c.b)}) are ${q(c.d, 'm')} apart. Find the size of the electric field at the point halfway between them, and say which way it points. ${sciAsk('the size')}`,
    parts: [sciPart(Math.abs(net), 3, 'N/C', 'Field strength'), part(fixedChoice(['Towards charge A', 'Towards charge B'], net > 0 ? 1 : 0), { label: 'The field points' })],
    hints: [`The midpoint is ${half} m from each charge. Find the field of each charge there with $E = \\dfrac{kq}{r^2}$.`, 'The field of a positive charge points away from it, and the field of a negative charge points towards it.', 'Add the two fields if they point the same way, and subtract if they point opposite ways.'],
    solution: [
      `Field of A: $\\dfrac{${KT} \\times ${num(Math.abs(c.a))} \\times 10^{-6}}{${half}^2} = ${sciTex(EA)}$ N/C, ${side(a)}.`,
      `Field of B: $\\dfrac{${KT} \\times ${num(Math.abs(c.b))} \\times 10^{-6}}{${half}^2} = ${sciTex(EB)}$ N/C, ${side(b)}.`,
      `${a * b > 0 ? `The fields point the same way: $${sciTex(EA)} + ${sciTex(EB)} = ${sciTex(Math.abs(net))}$ N/C` : `The fields point opposite ways: the difference is $${sciTex(Math.abs(net))}$ N/C`}, ${side(net)}`,
    ],
  };
}

const SQUARE_PAIRS: Array<[number, number]> = [[1, 4], [4, 1], [1, 9], [9, 1], [4, 9], [9, 4], [2, 8], [8, 2], [3, 12], [2, 18]];

function zeroField(rng: Rng): GenOutput {
  const [a, b] = rng.pick(SQUARE_PAIRS);
  const s = rng.sign();
  const d = rng.pick([0.3, 0.6, 0.9, 1.2, 1.5]);
  const root = Math.sqrt(b / a);
  const x = d / (1 + root);
  return {
    prompt: `Charge A (${charge(s * a)}) and charge B (${charge(s * b)}) are ${q(d, 'm')} apart. At one point on the line between them, the electric field is zero. How far is that point from charge A? Give your answer to 3 decimal places.`,
    parts: [rounded(x, 3, 'm')],
    hints: ['At that point the fields of the two charges are equal in size and opposite in direction.', `If the point is $x$ from A, it is $${d} - x$ from B: $\\dfrac{kq_A}{x^2} = \\dfrac{kq_B}{(${d} - x)^2}$.`, 'Take the square root of both sides before solving for $x$.'],
    solution: [
      `$\\dfrac{k \\times ${a}}{x^2} = \\dfrac{k \\times ${b}}{(${d} - x)^2}$, so $\\dfrac{${d} - x}{x} = \\sqrt{\\dfrac{${b}}{${a}}} = ${num(root, 4)}$`,
      `$${d} - x = ${num(root, 4)}x$, so $x = \\dfrac{${d}}{${num(1 + root, 4)}} = ${num(x, 3)}$ m. The point is nearer the smaller charge.`,
    ],
  };
}

function perpendicularFields(rng: Rng): GenOutput {
  const c = retry(
    () => ({ a: rng.pick(MICRO), b: rng.pick(MICRO), r1: rng.pick([0.3, 0.4, 0.5, 0.6, 0.8]), r2: rng.pick([0.3, 0.4, 0.5, 0.6, 0.8]) }),
    (t) => {
      const angle = Math.atan((t.b / (t.r2 * t.r2)) / (t.a / (t.r1 * t.r1))) / RAD;
      return angle >= 15 && angle <= 75;
    },
  );
  const EA = (K * c.a * 1e-6) / (c.r1 * c.r1);
  const EB = (K * c.b * 1e-6) / (c.r2 * c.r2);
  const net = Math.hypot(EA, EB);
  const angle = Math.atan(EB / EA) / RAD;
  return {
    prompt: `${K_NOTE} Charge A (${charge(c.a)}) is ${q(c.r1, 'm')} west of a point P, and charge B (${charge(c.b)}) is ${q(c.r2, 'm')} south of P. Find the size of the electric field at P, in scientific notation to 3 significant digits, and its direction as an angle north of east, to 1 decimal place.`,
    parts: [sciPart(net, 3, 'N/C', 'Field strength'), rounded(angle, 1, '° north of east', 'Direction')],
    hints: ['The field of a positive charge points away from it: the field of A at P points east, and the field of B at P points north.', 'Two fields at right angles add with the Pythagorean theorem.', 'The tangent of the angle is the north field ÷ the east field.'],
    solution: [
      `Field of A at P: $\\dfrac{${KT} \\times ${c.a} \\times 10^{-6}}{${c.r1}^2} = ${sciTex(EA)}$ N/C, east.`,
      `Field of B at P: $\\dfrac{${KT} \\times ${c.b} \\times 10^{-6}}{${c.r2}^2} = ${sciTex(EB)}$ N/C, north.`,
      `$E = \\sqrt{(${sciTex(EA)})^2 + (${sciTex(EB)})^2} = ${sciTex(net)}$ N/C`,
      `$\\theta = \\tan^{-1}\\left(\\dfrac{${sciTex(EB)}}{${sciTex(EA)}}\\right) = ${num(angle, 1)}°$ north of east`,
    ],
  };
}

export const ELECTROSTATICS_SKILLS: SkillDef[] = [
  skill({ id: 'p30-charge', name: 'Electric charge', description: 'Describe electric charge and how it is conserved, and relate the charge of an object to the number of electrons it has gained or lost.', outcomes: ['30-B1'], lessonId: L(1), calculator: true, gen: bank([CHARGE_IDEAS, either(electronsFromCharge, chargeFromElectrons, ionCharge), electronsTransferred], ['Charge comes in whole numbers of the elementary charge: $q = Ne$']) }),
  skill({ id: 'p30-charging', name: 'Charging objects', description: 'Explain charging by friction, by contact and by induction, and find how identical conductors share charge.', outcomes: ['30-B1'], lessonId: L(1), gen: bank([FRICTION_IDEAS, either(shareCharge, fromBank(CONTACT_IDEAS, ['Only electrons move. Charging by contact shares one charge between the two objects.'])), either(shareSequence, fromBank(INDUCTION_IDEAS, ['In charging by induction the charged rod does not touch the object, and the object ends with the opposite sign.']))], ['Only electrons move, and the total charge is conserved']) }),
  skill({ id: 'p30-coulomb', name: 'Coulomb’s law', description: 'Use Coulomb’s law to find the force between two point charges, a charge or a distance, and say how the force changes with charge and distance.', outcomes: ['30-B1'], lessonId: L(2), calculator: true, gen: bank([coulombForce, either(coulombScale, coulombNano), either(coulombDistance, coulombEqual, particleForce)], ['Coulomb’s law: $F = \\dfrac{kq_1q_2}{r^2}$, with the charges in coulombs and the distance in metres']) }),
  skill({ id: 'p30-coulomb-net', name: 'The net electric force', description: 'Find the net electric force on a charge from two other charges, along a line and at a right angle.', outcomes: ['30-B1'], lessonId: L(2), calculator: true, gen: bank([lineGivenForces, lineMiddle, either(lineEnd, rightAngle)], ['Find each force with Coulomb’s law, decide its direction, and add the forces as vectors']) }),
  skill({ id: 'p30-field-strength', name: 'Electric field strength', description: 'Use E = F ÷ q and the field of a point charge to find a field strength, a force, a charge or a distance.', outcomes: ['30-B2'], lessonId: L(3), calculator: true, gen: bank([either(fieldFromForce, forceInField), pointField, either(fieldDistance, chargeFromField, particleInField)], ['Field strength is the force on each coulomb: $E = \\dfrac{F}{q}$. For a point charge, $E = \\dfrac{kq}{r^2}$']) }),
  skill({ id: 'p30-field-net', name: 'Field lines and the field of two charges', description: 'Read electric field lines, and find the net electric field of two point charges.', outcomes: ['30-B2'], lessonId: L(3), calculator: true, gen: bank([FIELD_IDEAS, midpointField, either(zeroField, perpendicularFields)], ['The field points away from a positive charge and towards a negative one. Fields add as vectors']) }),
];
