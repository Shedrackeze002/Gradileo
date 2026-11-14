/**
 * Grade 10 Physics, Unit 5: Electricity (10-E1, 10-E2). Charge and current, voltage, resistance
 * and Ohm's law, series circuits, parallel circuits, and electrical power and energy. Circuits
 * are described in words; any price of electricity is stated in the question.
 */
import { numPart, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, q, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';

const L = (n: number) => `p10-5-${n}`;
const clean = (x: number) => Math.round(x * 1e6) / 1e6;
/** A resistance as maths: ohm(6) is 6 Ω. */
const ohm = (v: number) => `$${v}\\ \\Omega$`;
const OHM = 'Ω';
/** "A 12 V supply" or "An 18 V supply": the article that suits the number when read aloud. */
function supply(V: number): string {
  const whole = Math.floor(V);
  const an = String(whole).startsWith('8') || whole === 11 || whole === 18;
  return `${an ? 'An' : 'A'} ${q(V, 'V')} supply`;
}
const moneyPart = (v: number, label = 'Cost: \\$'): Part => numPart(v, { decimals: 2, tolerance: 0.011, label });

// ---------------------------------------------------------------------------- 5.1 charge and current

const CHARGE_EASY: Q[] = [
  { q: 'What are the two kinds of electric charge?', a: 'Positive and negative', w: ['North and south', 'Hot and cold', 'Heavy and light'], why: 'Protons carry positive charge and electrons carry negative charge.' },
  { q: 'Two objects with the same kind of charge are brought close together. What happens?', a: 'They repel each other', w: ['They attract each other', 'Nothing happens', 'They lose their charge'], why: 'Like charges repel; unlike charges attract.' },
  { q: 'A positively charged object is brought close to a negatively charged object. What happens?', a: 'They attract each other', w: ['They repel each other', 'Nothing happens', 'They both become neutral at once'], why: 'Like charges repel; unlike charges attract.' },
  { q: 'Which particle moves through a metal wire to carry an electric current?', a: 'The electron', w: ['The proton', 'The neutron', 'The atom'], why: 'In a metal some electrons are free to move. The protons stay fixed in the atoms.' },
  { q: 'What is an electric current?', a: 'A flow of electric charge', w: ['A store of energy', 'A push on a charge', 'A kind of resistance'], why: 'Current is the rate at which charge flows past a point.' },
  { q: 'Which of these is a good conductor of electricity?', a: 'Copper', w: ['Rubber', 'Glass', 'Dry wood'], why: 'Metals conduct well. Rubber, glass and dry wood are insulators.' },
  { q: 'What is the unit of electric current?', a: 'The ampere (A)', w: ['The coulomb (C)', 'The volt (V)', 'The ohm (Ω)'], why: 'One ampere is one coulomb of charge passing each second.' },
];

const CHARGE_MEDIUM: Q[] = [
  { q: 'A plastic rod is rubbed with a cloth and becomes negatively charged. What has happened?', a: 'Electrons have moved from the cloth to the rod', w: ['Protons have moved from the rod to the cloth', 'Electrons have been created by the rubbing', 'Protons have been destroyed'], why: 'Rubbing moves electrons from one object to the other. Charge is never created or destroyed.' },
  { q: 'Why are metals good conductors of electricity?', a: 'Some of their electrons are free to move through the metal', w: ['Their atoms are free to move', 'They contain no electrons', 'Their protons are free to move'], why: 'The free electrons drift along the wire when a battery is connected.' },
  { q: 'In a circuit diagram, in which direction is conventional current drawn?', a: 'From the positive terminal of the battery round to the negative terminal', w: ['From the negative terminal round to the positive terminal', 'In both directions at once', 'It has no direction'], why: 'Conventional current runs from positive to negative, a choice made before the electron was discovered.' },
  { q: 'In a metal wire connected to a battery, which way do the electrons move?', a: 'From the negative terminal towards the positive terminal', w: ['From the positive terminal towards the negative terminal', 'They do not move', 'Backwards and forwards only'], why: 'Electrons are negative, so they are repelled by the negative terminal and attracted to the positive one. This is opposite to conventional current.' },
  { q: 'What is the unit of electric charge?', a: 'The coulomb (C)', w: ['The ampere (A)', 'The volt (V)', 'The ohm (Ω)'], why: 'Charge is measured in coulombs. A current of 1 A carries 1 C past a point each second.' },
  { q: 'What does a circuit need for a current to flow?', a: 'A complete loop of conductor and a source of energy such as a battery', w: ['Only a battery', 'Only a complete loop of wire', 'An insulator joining the battery terminals'], why: 'A gap anywhere in the loop stops the current everywhere.' },
];

const CHARGE_HARD: Select[] = [
  { q: 'Which statements about electric charge and current are true?', opts: [['Like charges repel.', true], ['Unlike charges attract.', true], ['Current is the rate of flow of charge.', true], ['In a metal, electrons carry the current.', true], ['Electrons flow from the positive terminal to the negative terminal.', false], ['Rubbing two objects together creates new charge.', false], ['Insulators let charge flow through them easily.', false]], why: 'Charge is moved, never created. Electrons drift from the negative terminal to the positive one, opposite to conventional current.' },
  { q: 'Which of these are electrical conductors?', opts: [['Copper', true], ['Aluminium', true], ['Graphite', true], ['Salt water', true], ['Rubber', false], ['Glass', false], ['Plastic', false]], why: 'Metals, graphite and solutions of salts contain charges that are free to move. Rubber, glass and plastic do not.' },
];

function chargeFlow(rng: Rng, find: 'Q' | 'I' | 't'): GenOutput {
  const I = rng.pick([0.5, 1.5, 2, 3, 4, 5]);
  const t = rng.pick([10, 20, 30, 40, 60]);
  const Q = clean(I * t);
  if (find === 'Q') {
    return {
      prompt: `A current of ${q(I, 'A')} flows through a lamp for ${q(t, 's')}. How much charge passes through the lamp?`,
      parts: [numPart(Q, { suffix: 'C' })],
      hints: ['charge = current × time'],
      solution: [`$Q = It = ${I} \\times ${t} = ${Q}$ C`],
    };
  }
  if (find === 'I') {
    return {
      prompt: `A charge of ${q(Q, 'C')} passes through a lamp in ${q(t, 's')}. What is the current?`,
      parts: [numPart(I, { suffix: 'A' })],
      hints: ['current = charge ÷ time'],
      solution: [`$I = \\dfrac{Q}{t} = \\dfrac{${Q}}{${t}} = ${I}$ A`],
    };
  }
  return {
    prompt: `A current of ${q(I, 'A')} flows through a lamp. How long does it take for ${q(Q, 'C')} of charge to pass?`,
    parts: [numPart(t, { suffix: 's' })],
    hints: ['time = charge ÷ current'],
    solution: [`$t = \\dfrac{Q}{I} = \\dfrac{${Q}}{${I}} = ${t}$ s`],
  };
}

function chargeUnits(rng: Rng): GenOutput {
  const mA = rng.pick([50, 200, 250, 400, 500]);
  const mins = rng.pick([1, 2, 5, 10]);
  const Q = clean((mA / 1000) * mins * 60);
  return {
    prompt: `A current of ${q(mA, 'mA')} flows for ${q(mins, 'min')}. How much charge passes?`,
    parts: [numPart(Q, { suffix: 'C' })],
    hints: ['Change milliamperes to amperes (÷ 1000) and minutes to seconds (× 60).', 'charge = current × time'],
    solution: [`${q(mA, 'mA')} $= ${mA / 1000}$ A and ${q(mins, 'min')} $= ${mins * 60}$ s.`, `$Q = It = ${mA / 1000} \\times ${mins * 60} = ${Q}$ C`],
  };
}

// ---------------------------------------------------------------------------- 5.2 voltage, resistance and Ohm's law

function ohmsLaw(rng: Rng, find: 'V' | 'I' | 'R'): GenOutput {
  const I = rng.pick([0.2, 0.5, 1.5, 2, 3, 4]);
  const R = rng.pick([2, 4, 5, 6, 10, 12, 20]);
  const V = clean(I * R);
  if (find === 'V') {
    return {
      prompt: `A current of ${q(I, 'A')} flows through a resistor of ${ohm(R)}. What is the voltage across the resistor?`,
      parts: [numPart(V, { suffix: 'V' })],
      hints: ['voltage = current × resistance'],
      solution: [`$V = IR = ${I} \\times ${R} = ${V}$ V`],
    };
  }
  if (find === 'I') {
    return {
      prompt: `A voltage of ${q(V, 'V')} is connected across a resistor of ${ohm(R)}. What current flows through the resistor?`,
      parts: [numPart(I, { suffix: 'A' })],
      hints: ['current = voltage ÷ resistance'],
      solution: [`$I = \\dfrac{V}{R} = \\dfrac{${V}}{${R}} = ${I}$ A`],
    };
  }
  return {
    prompt: `A voltage of ${q(V, 'V')} across a resistor drives a current of ${q(I, 'A')} through it. What is the resistance?`,
    parts: [numPart(R, { suffix: OHM })],
    hints: ['resistance = voltage ÷ current'],
    solution: [`$R = \\dfrac{V}{I} = \\dfrac{${V}}{${I}} = ${R}\\ \\Omega$`],
  };
}

function ohmsUnits(rng: Rng): GenOutput {
  const mA = rng.pick([2, 4, 5, 10, 20]);
  const k = rng.pick([1.5, 2, 3, 4.5]);
  const V = clean(mA * k);
  if (rng.chance(0.5)) {
    return {
      prompt: `A current of ${q(mA, 'mA')} flows through a resistor of $${k}\\ \\text{k}\\Omega$. What is the voltage across the resistor?`,
      parts: [numPart(V, { suffix: 'V' })],
      hints: ['Change milliamperes to amperes (÷ 1000) and kilohms to ohms (× 1000).', 'voltage = current × resistance'],
      solution: [`${q(mA, 'mA')} $= ${mA / 1000}$ A and $${k}\\ \\text{k}\\Omega = ${k * 1000}\\ \\Omega$.`, `$V = IR = ${mA / 1000} \\times ${k * 1000} = ${V}$ V`],
    };
  }
  return {
    prompt: `A voltage of ${q(V, 'V')} across a resistor drives a current of ${q(mA, 'mA')} through it. What is the resistance, in ohms?`,
    parts: [numPart(k * 1000, { suffix: OHM })],
    hints: ['Change milliamperes to amperes first (÷ 1000).', 'resistance = voltage ÷ current'],
    solution: [`${q(mA, 'mA')} $= ${mA / 1000}$ A.`, `$R = \\dfrac{V}{I} = \\dfrac{${V}}{${mA / 1000}} = ${k * 1000}\\ \\Omega$`],
  };
}

/** A current-voltage graph of a resistor: [resistance, largest voltage, largest current, current per grid line]. */
const IV_CASES: Array<[number, number, number, number]> = [[2, 12, 6, 1], [4, 12, 3, 0.5], [5, 10, 2, 0.5], [10, 10, 1, 0.2], [20, 10, 0.5, 0.1]];

function ivGraph(rng: Rng): GenOutput {
  const [R, Vmax, Imax, yStep] = rng.pick(IV_CASES);
  const figure: Figure = {
    type: 'plane',
    grid: { xMin: 0, xMax: Vmax, yMin: 0, yMax: Imax, xStep: 2, yStep, xLabel: 'Voltage (V)', yLabel: 'Current (A)' },
    polylines: [{ points: [[0, 0], [Vmax, Imax]] }],
  };
  return {
    prompt: 'The graph shows the current through a resistor for different voltages across it. What is the resistance of the resistor?',
    figure,
    parts: [numPart(R, { suffix: OHM })],
    hints: ['Read the current at any voltage on the line.', 'resistance = voltage ÷ current'],
    solution: [`At ${Vmax} V the current is ${Imax} A.`, `$R = \\dfrac{V}{I} = \\dfrac{${Vmax}}{${Imax}} = ${R}\\ \\Omega$`],
  };
}

const RES_EASY: Q[] = [
  { q: 'What is the unit of resistance?', a: 'The ohm (Ω)', w: ['The volt (V)', 'The ampere (A)', 'The coulomb (C)'], why: 'A resistor has a resistance of 1 Ω if 1 V across it drives a current of 1 A.' },
  { q: 'What does adding a resistor in series do to the current in a circuit?', a: 'It makes the current smaller', w: ['It makes the current larger', 'It has no effect', 'It reverses the current'], why: 'Resistance opposes the flow of charge. More resistance, with the same battery, gives less current.' },
  { q: 'What is the unit of voltage (potential difference)?', a: 'The volt (V)', w: ['The ohm (Ω)', 'The ampere (A)', 'The watt (W)'], why: 'One volt is one joule of energy transferred by each coulomb of charge.' },
  { q: 'Which instrument measures current?', a: 'An ammeter', w: ['A voltmeter', 'A thermometer', 'A balance'], why: 'An ammeter measures the current, in amperes.' },
  { q: 'Which instrument measures voltage?', a: 'A voltmeter', w: ['An ammeter', 'A stopwatch', 'A ruler'], why: 'A voltmeter measures the voltage across a component, in volts.' },
];

const RES_MEDIUM: Q[] = [
  { q: 'How is an ammeter connected to measure the current through a lamp?', a: 'In series with the lamp', w: ['In parallel with the lamp', 'Across the battery only', 'It is not connected to the circuit'], why: 'The same current must pass through the ammeter as through the lamp, so they are in one line.' },
  { q: 'How is a voltmeter connected to measure the voltage across a lamp?', a: 'In parallel with the lamp', w: ['In series with the lamp', 'In place of the lamp', 'In place of the battery'], why: 'A voltmeter compares the two sides of a component, so it is connected across it.' },
  { q: 'The voltage across a resistor is doubled. What happens to the current through it?', a: 'It doubles', w: ['It halves', 'It stays the same', 'It becomes four times as large'], why: 'For a resistor the current is proportional to the voltage: $I = V \\div R$.' },
  { q: 'The resistance in a circuit is doubled while the voltage stays the same. What happens to the current?', a: 'It halves', w: ['It doubles', 'It stays the same', 'It becomes zero'], why: '$I = V \\div R$: twice the resistance gives half the current.' },
  { q: 'A wire is replaced by a longer wire of the same material and thickness. What happens to its resistance?', a: 'It increases', w: ['It decreases', 'It stays the same', 'It becomes zero'], why: 'The charges have further to travel through the metal, so a longer wire has more resistance.' },
  { q: 'A wire is replaced by a thicker wire of the same material and length. What happens to its resistance?', a: 'It decreases', w: ['It increases', 'It stays the same', 'It doubles'], why: 'A thicker wire gives the charges more room to flow, like a wider pipe.' },
  { q: 'What does a voltage of 6 V across a lamp mean?', a: 'Each coulomb of charge transfers 6 J of energy to the lamp', w: ['6 C of charge pass each second', 'The lamp has a resistance of 6 Ω', 'The lamp transfers 6 J each second'], why: 'Voltage is the energy transferred by each coulomb of charge: 1 V = 1 J/C.' },
];

const RES_HARD: Select[] = [
  { q: 'Which changes would increase the current in a simple circuit of a battery and a resistor?', opts: [['Using a battery with a higher voltage', true], ['Replacing the resistor with one of lower resistance', true], ['Replacing a long resistance wire with a shorter one of the same kind', true], ['Adding another resistor in series', false], ['Using a battery with a lower voltage', false], ['Replacing the resistor with one of higher resistance', false]], why: '$I = V \\div R$: the current rises when the voltage rises or the resistance falls.' },
];

function energyPerCharge(rng: Rng): GenOutput {
  const V = rng.pick([1.5, 3, 6, 9, 12]);
  const Q = rng.pick([2, 4, 5, 10, 20]);
  const E = clean(V * Q);
  if (rng.chance(0.5)) {
    return {
      prompt: `A battery transfers ${q(E, 'J')} of energy to ${q(Q, 'C')} of charge. What is the voltage of the battery?`,
      parts: [numPart(V, { suffix: 'V' })],
      hints: ['voltage = energy transferred ÷ charge'],
      solution: [`$V = \\dfrac{E}{Q} = \\dfrac{${E}}{${Q}} = ${V}$ V`],
    };
  }
  return {
    prompt: `A charge of ${q(Q, 'C')} passes through a lamp with a voltage of ${q(V, 'V')} across it. How much energy is transferred to the lamp?`,
    parts: [numPart(E, { suffix: 'J' })],
    hints: ['energy transferred = voltage × charge'],
    solution: [`$E = VQ = ${V} \\times ${Q} = ${E}$ J`],
  };
}

// ---------------------------------------------------------------------------- 5.3 series circuits

const RS = [2, 3, 4, 5, 6, 8, 10, 12];

function seriesTotal(rng: Rng): GenOutput {
  const rs = rng.sample(RS, rng.chance(0.5) ? 2 : 3);
  const total = rs.reduce((a, b) => a + b, 0);
  const list = rs.length === 2 ? `${ohm(rs[0])} and ${ohm(rs[1])}` : `${ohm(rs[0])}, ${ohm(rs[1])} and ${ohm(rs[2])}`;
  return {
    prompt: `Resistors of ${list} are connected in series. What is their total resistance?`,
    parts: [numPart(total, { suffix: OHM })],
    hints: ['In series, the resistances add.'],
    solution: [`$R = ${rs.join(' + ')} = ${total}\\ \\Omega$`],
  };
}

function seriesCurrent(rng: Rng): GenOutput {
  const [r1, r2] = rng.sample(RS, 2);
  const I = rng.pick([0.5, 1, 1.5, 2, 3]);
  const V = clean(I * (r1 + r2));
  return {
    prompt: `${supply(V)} is connected to resistors of ${ohm(r1)} and ${ohm(r2)} in series. What current flows in the circuit?`,
    parts: [numPart(I, { suffix: 'A' })],
    hints: ['Find the total resistance first: in series the resistances add.', 'current = supply voltage ÷ total resistance'],
    solution: [`Total resistance $= ${r1} + ${r2} = ${r1 + r2}\\ \\Omega$.`, `$I = \\dfrac{${V}}{${r1 + r2}} = ${I}$ A`],
  };
}

function seriesMissing(rng: Rng): GenOutput {
  const [r1, r2] = rng.sample(RS, 2);
  const I = rng.pick([0.5, 1, 2, 3]);
  const V = clean(I * (r1 + r2));
  return {
    prompt: `${supply(V)} drives a current of ${q(I, 'A')} through a ${ohm(r1)} resistor and a second resistor connected in series. What is the resistance of the second resistor?`,
    parts: [numPart(r2, { suffix: OHM })],
    hints: ['Find the total resistance: supply voltage ÷ current.', 'In series the resistances add, so subtract the one you know.'],
    solution: [`Total resistance $= \\dfrac{${V}}{${I}} = ${r1 + r2}\\ \\Omega$.`, `Second resistor $= ${r1 + r2} - ${r1} = ${r2}\\ \\Omega$`],
  };
}

const SERIES_IDEAS: Q[] = [
  { q: 'How does the current compare at different points around a series circuit?', a: 'It is the same at every point', w: ['It is largest near the positive terminal', 'It gets smaller after each component', 'It is largest near the negative terminal'], why: 'There is only one path, so the same charge passes every point each second. Current is not used up.' },
  { q: 'Two lamps are connected in series, and one of them breaks. What happens to the other?', a: 'It goes out, because the circuit is no longer complete', w: ['It gets brighter', 'It stays the same', 'It gets dimmer but stays lit'], why: 'A series circuit is a single loop. A break anywhere stops the current everywhere.' },
  { q: 'More lamps are added in series to a circuit with one battery. What happens to the brightness of each lamp?', a: 'Each lamp gets dimmer', w: ['Each lamp gets brighter', 'The brightness stays the same', 'Only the last lamp gets dimmer'], why: 'The total resistance rises, so the current falls, and the battery voltage is shared between more lamps.' },
  { q: 'In a series circuit, how do the voltages across the components compare with the battery voltage?', a: 'They add up to the battery voltage', w: ['Each one equals the battery voltage', 'They add up to more than the battery voltage', 'They are always zero'], why: 'The energy each coulomb gets from the battery is shared out between the components.' },
  { q: 'Two resistors in series carry the same current. Which has the larger voltage across it?', a: 'The one with the larger resistance', w: ['The one with the smaller resistance', 'They always have the same voltage', 'The one nearer the battery'], why: '$V = IR$ with the same current: more resistance means more voltage.' },
];

function seriesShare(rng: Rng): GenOutput {
  const [supplyV, firsts] = rng.pick([[6, [1.5, 2, 4]], [9, [3, 4, 6]], [12, [3, 4, 8]], [24, [6, 9, 16]]] as Array<[number, number[]]>);
  const first = rng.pick(firsts);
  return {
    prompt: `Two lamps are connected in series to a ${q(supplyV, 'V')} battery. The voltage across the first lamp is ${q(first, 'V')}. What is the voltage across the second lamp?`,
    parts: [numPart(clean(supplyV - first), { suffix: 'V' })],
    hints: ['In series, the voltages across the components add up to the battery voltage.'],
    solution: [`$${supplyV} - ${first} = ${clean(supplyV - first)}$ V`],
  };
}

function seriesVoltages(rng: Rng): GenOutput {
  const [r1, r2] = rng.sample(RS, 2);
  const I = rng.pick([0.5, 1, 1.5, 2]);
  const V = clean(I * (r1 + r2));
  return {
    prompt: `${supply(V)} is connected to resistors of ${ohm(r1)} and ${ohm(r2)} in series. Find the voltage across each resistor.`,
    parts: [numPart(clean(I * r1), { label: `Across the $${r1}\\ \\Omega$ resistor`, suffix: 'V' }), numPart(clean(I * r2), { label: `Across the $${r2}\\ \\Omega$ resistor`, suffix: 'V' })],
    hints: ['Find the current first: supply voltage ÷ total resistance.', 'Then use voltage = current × resistance for each resistor.'],
    solution: [`Total resistance $= ${r1 + r2}\\ \\Omega$, so $I = \\dfrac{${V}}{${r1 + r2}} = ${I}$ A.`, `$${I} \\times ${r1} = ${clean(I * r1)}$ V and $${I} \\times ${r2} = ${clean(I * r2)}$ V. Together they make ${V} V.`],
  };
}

// ---------------------------------------------------------------------------- 5.4 parallel circuits

const PARALLEL_IDEAS: Q[] = [
  { q: 'Two lamps are connected in parallel to a battery. How do the voltages across the lamps compare?', a: 'Each has the full battery voltage across it', w: ['Each has half the battery voltage', 'The first lamp has more voltage', 'There is no voltage across either'], why: 'Each branch is connected straight across the battery.' },
  { q: 'Two lamps are connected in parallel, and one of them breaks. What happens to the other?', a: 'It stays lit', w: ['It goes out', 'It gets much dimmer', 'It explodes'], why: 'Each lamp is on its own branch, so the other branch still makes a complete circuit.' },
  { q: 'In a parallel circuit, how does the current from the battery compare with the currents in the branches?', a: 'It equals the sum of the branch currents', w: ['It equals the smallest branch current', 'It equals the largest branch current', 'It is zero'], why: 'The current splits at a junction and joins again, and no charge is lost.' },
  { q: 'Why are the lights in a house connected in parallel?', a: 'Each light gets the full voltage and can be switched on its own', w: ['It uses less wire', 'It makes the lights dimmer', 'It stops any current flowing'], why: 'In parallel, each light works at full brightness whether or not the others are on.' },
  { q: 'Two resistors are connected in parallel to a battery. Which carries the larger current?', a: 'The one with the smaller resistance', w: ['The one with the larger resistance', 'They always carry the same current', 'The one further from the battery'], why: 'Both have the same voltage across them, and $I = V \\div R$.' },
];

function branchSum(rng: Rng): GenOutput {
  const a = rng.pick([0.5, 1, 1.5, 2, 3]);
  const b = rng.pick([0.5, 1, 2, 2.5, 4]);
  if (rng.chance(0.5)) {
    return {
      prompt: `Two lamps are connected in parallel to a battery. The currents in the two branches are ${q(a, 'A')} and ${q(b, 'A')}. What current flows from the battery?`,
      parts: [numPart(clean(a + b), { suffix: 'A' })],
      hints: ['The current from the battery is the sum of the branch currents.'],
      solution: [`$${a} + ${b} = ${clean(a + b)}$ A`],
    };
  }
  return {
    prompt: `Two lamps are connected in parallel to a battery. The current from the battery is ${q(clean(a + b), 'A')}, and the current in one branch is ${q(a, 'A')}. What is the current in the other branch?`,
    parts: [numPart(b, { suffix: 'A' })],
    hints: ['The branch currents add up to the current from the battery.'],
    solution: [`$${clean(a + b)} - ${a} = ${b}$ A`],
  };
}

/** A battery voltage and two resistors that give simple branch currents. */
function parallelCase(rng: Rng): { V: number; r1: number; r2: number } {
  for (;;) {
    const V = rng.pick([6, 12, 24]);
    const [r1, r2] = rng.sample([2, 3, 4, 6, 8, 12], 2);
    if (V % r1 === 0 || (V * 2) % r1 === 0) if (V % r2 === 0 || (V * 2) % r2 === 0) return { V, r1, r2 };
  }
}

function branchCurrents(rng: Rng, total: boolean): GenOutput {
  const { V, r1, r2 } = parallelCase(rng);
  const i1 = clean(V / r1);
  const i2 = clean(V / r2);
  if (total) {
    return {
      prompt: `${supply(V)} is connected to resistors of ${ohm(r1)} and ${ohm(r2)} in parallel. What current flows from the supply?`,
      parts: [numPart(clean(i1 + i2), { suffix: 'A' })],
      hints: ['Each resistor has the full supply voltage across it. Find the current in each: voltage ÷ resistance.', 'Add the two branch currents.'],
      solution: [`$\\dfrac{${V}}{${r1}} = ${i1}$ A and $\\dfrac{${V}}{${r2}} = ${i2}$ A.`, `Total $= ${i1} + ${i2} = ${clean(i1 + i2)}$ A`],
    };
  }
  return {
    prompt: `${supply(V)} is connected to resistors of ${ohm(r1)} and ${ohm(r2)} in parallel. Find the current in each resistor.`,
    parts: [numPart(i1, { label: `In the $${r1}\\ \\Omega$ resistor`, suffix: 'A' }), numPart(i2, { label: `In the $${r2}\\ \\Omega$ resistor`, suffix: 'A' })],
    hints: ['Each resistor has the full supply voltage across it.', 'current = voltage ÷ resistance, for each branch'],
    solution: [`$\\dfrac{${V}}{${r1}} = ${i1}$ A and $\\dfrac{${V}}{${r2}} = ${i2}$ A. The smaller resistance carries the larger current.`],
  };
}

/** Pairs of resistors and their total resistance in parallel. */
const PAIRS: Array<[number, number, number]> = [[6, 3, 2], [12, 6, 4], [12, 4, 3], [20, 5, 4], [30, 6, 5], [15, 10, 6], [24, 8, 6], [30, 20, 12], [10, 15, 6], [40, 10, 8]];

function equalPair(rng: Rng): GenOutput {
  const R = rng.pick([4, 6, 8, 10, 12, 20]);
  return {
    prompt: `Two ${ohm(R)} resistors are connected in parallel. What is their total resistance?`,
    parts: [numPart(R / 2, { suffix: OHM })],
    hints: ['Two equal resistors in parallel give half the resistance of one.', '1 ÷ total = 1 ÷ first + 1 ÷ second'],
    solution: [`$\\dfrac{1}{R} = \\dfrac{1}{${R}} + \\dfrac{1}{${R}} = \\dfrac{2}{${R}}$, so $R = ${R / 2}\\ \\Omega$`],
  };
}

function parallelTotal(rng: Rng): GenOutput {
  const [r1, r2, total] = rng.pick(PAIRS);
  return {
    prompt: `Resistors of ${ohm(r1)} and ${ohm(r2)} are connected in parallel. What is their total resistance?`,
    parts: [numPart(total, { suffix: OHM })],
    hints: ['1 ÷ total = 1 ÷ first + 1 ÷ second', 'Add the fractions, then turn the answer upside down.'],
    solution: [`$\\dfrac{1}{R} = \\dfrac{1}{${r1}} + \\dfrac{1}{${r2}} = \\dfrac{${r1 + r2}}{${r1 * r2}} = \\dfrac{1}{${total}}$`, `$R = ${total}\\ \\Omega$, which is less than either resistor.`],
  };
}

function seriesOrParallel(rng: Rng): GenOutput {
  const [r1, r2, total] = rng.pick(PAIRS);
  return {
    prompt: `Resistors of ${ohm(r1)} and ${ohm(r2)} can be connected in series or in parallel. Find their total resistance each way.`,
    parts: [numPart(r1 + r2, { label: 'In series', suffix: OHM }), numPart(total, { label: 'In parallel', suffix: OHM })],
    hints: ['In series, the resistances add.', 'In parallel, 1 ÷ total = 1 ÷ first + 1 ÷ second.'],
    solution: [`Series: $${r1} + ${r2} = ${r1 + r2}\\ \\Omega$.`, `Parallel: $\\dfrac{1}{R} = \\dfrac{1}{${r1}} + \\dfrac{1}{${r2}} = \\dfrac{1}{${total}}$, so $R = ${total}\\ \\Omega$.`],
  };
}

const PARALLEL_R_IDEAS: Q[] = [
  { q: 'A second resistor is connected in parallel with a resistor. What happens to the total resistance?', a: 'It decreases', w: ['It increases', 'It stays the same', 'It doubles'], why: 'The extra branch gives the charge another path, so more current flows from the same battery.' },
  { q: 'A second resistor is connected in series with a resistor. What happens to the total resistance?', a: 'It increases', w: ['It decreases', 'It stays the same', 'It halves'], why: 'In series the charge must pass through both, so the resistances add.' },
  { q: 'How does the total resistance of two resistors in parallel compare with the smaller of the two?', a: 'It is less than the smaller one', w: ['It is between the two', 'It is more than the larger one', 'It equals the smaller one'], why: 'Adding a path always makes it easier for charge to flow.' },
];

// ---------------------------------------------------------------------------- 5.5 electrical power and energy

/** Appliances with a believable supply voltage and current: [what, volts, currents in A]. */
const APPLIANCES: Array<[string, number, number[]]> = [
  ['A torch bulb', 3, [0.2, 0.5]],
  ['A car headlamp', 12, [2, 4, 5]],
  ['A laptop charger', 20, [2, 3, 4.5]],
  ['A kettle', 230, [8, 10]],
  ['A heater', 120, [5, 10, 12.5]],
  ['A hairdryer', 230, [4, 5]],
];

function powerIV(rng: Rng, find: 'P' | 'I' | 'V'): GenOutput {
  const [what, V, is] = rng.pick(APPLIANCES);
  const I = rng.pick(is);
  const P = clean(I * V);
  if (find === 'P') {
    return {
      prompt: `${what} carries a current of ${q(I, 'A')} when the voltage across it is ${q(V, 'V')}. What is its power?`,
      parts: [numPart(P, { suffix: 'W' })],
      hints: ['power = current × voltage'],
      solution: [`$P = IV = ${I} \\times ${V} = ${P}$ W`],
    };
  }
  if (find === 'I') {
    return {
      prompt: `${what} has a power of ${q(P, 'W')} when the voltage across it is ${q(V, 'V')}. What current does it carry?`,
      parts: [numPart(I, { suffix: 'A' })],
      hints: ['current = power ÷ voltage'],
      solution: [`$I = \\dfrac{P}{V} = \\dfrac{${P}}{${V}} = ${I}$ A`],
    };
  }
  return {
    prompt: `${what} has a power of ${q(P, 'W')} and carries a current of ${q(I, 'A')}. What is the voltage across it?`,
    parts: [numPart(V, { suffix: 'V' })],
    hints: ['voltage = power ÷ current'],
    solution: [`$V = \\dfrac{P}{I} = \\dfrac{${P}}{${I}} = ${V}$ V`],
  };
}

function powerResistor(rng: Rng): GenOutput {
  const I = rng.pick([2, 3, 4, 5]);
  const R = rng.pick([2, 5, 10, 20]);
  if (rng.chance(0.5)) {
    return {
      prompt: `A current of ${q(I, 'A')} flows through a resistor of ${ohm(R)}. What power does the resistor transfer as heat?`,
      parts: [numPart(I * I * R, { suffix: 'W' })],
      hints: ['Find the voltage first: V = IR. Then P = IV.', 'Or use P = I²R in one step.'],
      solution: [`$V = IR = ${I} \\times ${R} = ${I * R}$ V.`, `$P = IV = ${I} \\times ${I * R} = ${I * I * R}$ W`],
    };
  }
  const V = I * R;
  return {
    prompt: `${supply(V)} is connected across a resistor of ${ohm(R)}. Find the current and the power transferred by the resistor.`,
    parts: [numPart(I, { label: 'Current', suffix: 'A' }), numPart(I * V, { label: 'Power', suffix: 'W' })],
    hints: ['current = voltage ÷ resistance', 'power = current × voltage'],
    solution: [`$I = \\dfrac{${V}}{${R}} = ${I}$ A.`, `$P = IV = ${I} \\times ${V} = ${I * V}$ W`],
  };
}

function energyJoules(rng: Rng): GenOutput {
  const P = rng.pick([40, 60, 100, 500, 1000, 2000]);
  const t = rng.pick([10, 30, 60, 120]);
  const what = P >= 500 ? rng.pick(['A kettle', 'A heater', 'An iron']) : rng.pick(['A lamp', 'A fan', 'A radio']);
  return {
    prompt: `${what} has a power of ${q(P, 'W')}. How much energy does it transfer in ${q(t, 's')}?`,
    parts: [numPart(P * t, { suffix: 'J' })],
    hints: ['energy = power × time, with the time in seconds'],
    solution: [`$E = Pt = ${P} \\times ${t} = ${P * t}$ J`],
  };
}

function energyKwh(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const kW = rng.pick([0.5, 1.5, 2, 3]);
    const h = rng.pick([2, 3, 4, 5, 10]);
    return {
      prompt: `A heater has a power of ${q(kW, 'kW')} and runs for ${q(h, 'h')}. How much energy does it transfer, in kilowatt-hours?`,
      parts: [numPart(clean(kW * h), { suffix: 'kWh' })],
      hints: ['energy in kWh = power in kW × time in hours'],
      solution: [`$E = ${kW} \\times ${h} = ${clean(kW * h)}$ kWh`],
    };
  }
  const W = rng.pick([40, 100, 200, 500]);
  const h = rng.pick([5, 10, 20, 50]);
  return {
    prompt: `A lamp has a power of ${q(W, 'W')} and is on for ${q(h, 'h')}. How much energy does it transfer, in kilowatt-hours?`,
    parts: [numPart(clean((W / 1000) * h), { suffix: 'kWh' })],
    hints: ['Change watts to kilowatts first (÷ 1000).', 'energy in kWh = power in kW × time in hours'],
    solution: [`${q(W, 'W')} $= ${W / 1000}$ kW.`, `$E = ${W / 1000} \\times ${h} = ${clean((W / 1000) * h)}$ kWh`],
  };
}

function energyCost(rng: Rng): GenOutput {
  const kW = rng.pick([0.5, 1.5, 2, 2.5, 3]);
  const h = rng.pick([2, 4, 5, 6, 10]);
  const cents = rng.pick([12, 15, 20, 25, 30]);
  const kWh = clean(kW * h);
  const cost = clean((kWh * cents) / 100);
  const what = rng.pick(['A heater', 'An oven', 'An air conditioner', 'A water heater']);
  return {
    prompt: `Electricity costs \\$${(cents / 100).toFixed(2)} for each kilowatt-hour. ${what} with a power of ${q(kW, 'kW')} runs for ${q(h, 'h')}. What does this cost?`,
    parts: [moneyPart(cost)],
    hints: ['Find the energy in kilowatt-hours: power in kW × time in hours.', 'cost = energy in kWh × price of one kWh'],
    solution: [`Energy $= ${kW} \\times ${h} = ${kWh}$ kWh.`, `Cost $= ${kWh} \\times ${(cents / 100).toFixed(2)}$ = \\$${cost.toFixed(2)}`],
  };
}

export const ELECTRICITY_SKILLS: SkillDef[] = [
  skill({ id: 'p10-charge', name: 'Electric charge', description: 'Describe electric charge, conductors and insulators, and what an electric current is.', outcomes: ['10-E1'], lessonId: L(1), format: 'mc', gen: bank([CHARGE_EASY, CHARGE_MEDIUM, CHARGE_HARD], ['Like charges repel and unlike charges attract. A current is a flow of charge.']) }),
  skill({ id: 'p10-current', name: 'Charge and current', description: 'Use charge = current × time to find a charge, a current or a time.', outcomes: ['10-E1'], lessonId: L(1), calculator: true, gen: bank([(rng) => chargeFlow(rng, 'Q'), (rng) => chargeFlow(rng, rng.pick(['I', 't'] as const)), chargeUnits], ['charge = current × time']) }),
  skill({ id: 'p10-resistance', name: 'Voltage and resistance', description: 'Describe voltage and resistance, how they are measured, and what changes the current in a circuit.', outcomes: ['10-E1'], lessonId: L(2), gen: bank([RES_EASY, RES_MEDIUM, either(energyPerCharge, fromBank(RES_HARD, ['current = voltage ÷ resistance']))], ['Voltage pushes the charge round. Resistance opposes the flow.']) }),
  skill({ id: 'p10-ohms-law', name: 'Ohm’s law', description: 'Use voltage = current × resistance to find a voltage, a current or a resistance.', outcomes: ['10-E1'], lessonId: L(2), calculator: true, gen: bank([(rng) => ohmsLaw(rng, 'V'), (rng) => ohmsLaw(rng, rng.pick(['I', 'R'] as const)), either(ohmsUnits, ivGraph)], ['voltage = current × resistance']) }),
  skill({ id: 'p10-series', name: 'Series circuits', description: 'Find the total resistance and the current of resistors in series.', outcomes: ['10-E2'], lessonId: L(3), calculator: true, gen: bank([seriesTotal, seriesCurrent, either(seriesMissing, seriesCurrent)], ['In series the resistances add, and the current is the same everywhere.']) }),
  skill({ id: 'p10-series-voltage', name: 'Voltage in series circuits', description: 'Describe current and voltage in a series circuit, and find how the battery voltage is shared.', outcomes: ['10-E2'], lessonId: L(3), calculator: true, gen: bank([SERIES_IDEAS, either(seriesShare, fromBank(SERIES_IDEAS, ['A series circuit is a single loop.'])), seriesVoltages], ['In series, the voltages across the components add up to the battery voltage.']) }),
  skill({ id: 'p10-parallel', name: 'Parallel circuits', description: 'Describe current and voltage in a parallel circuit, and find the branch currents.', outcomes: ['10-E2'], lessonId: L(4), calculator: true, gen: bank([either(branchSum, fromBank(PARALLEL_IDEAS, ['Each branch is connected straight across the battery.'])), (rng) => branchCurrents(rng, false), (rng) => branchCurrents(rng, true)], ['In parallel, each branch has the full battery voltage, and the branch currents add.']) }),
  skill({ id: 'p10-parallel-resistance', name: 'Resistors in parallel', description: 'Find the total resistance of two resistors in parallel, and compare it with series.', outcomes: ['10-E2'], lessonId: L(4), calculator: true, gen: bank([either(equalPair, fromBank(PARALLEL_R_IDEAS, ['Another path makes it easier for charge to flow.'])), parallelTotal, seriesOrParallel], ['1 ÷ total = 1 ÷ first + 1 ÷ second']) }),
  skill({ id: 'p10-electrical-power', name: 'Electrical power', description: 'Use power = current × voltage to find a power, a current or a voltage.', outcomes: ['10-E2'], lessonId: L(5), calculator: true, gen: bank([(rng) => powerIV(rng, 'P'), (rng) => powerIV(rng, rng.pick(['I', 'V'] as const)), powerResistor], ['power = current × voltage']) }),
  skill({ id: 'p10-electrical-energy', name: 'Electrical energy and cost', description: 'Find the energy an appliance transfers in joules and in kilowatt-hours, and what it costs.', outcomes: ['10-E2'], lessonId: L(5), calculator: true, gen: bank([energyJoules, energyKwh, energyCost], ['energy = power × time']) }),
];
