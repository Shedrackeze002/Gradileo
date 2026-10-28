/**
 * Grade 12 Chemistry, Unit 2, lessons 2.6 to 2.8: voltaic cells and their notation, standard cell
 * potentials and spontaneity, and electrolytic cells with Faraday's law. Every question states the
 * reduction potentials, molar masses and constants it uses.
 */
import { fixedChoice, mc, multi, part, skill, type GenOutput } from '../../helpers.ts';
import { element } from '../../../chem/elements.ts';
import { balance } from '../../../chem/formula.ts';
import { cellPotential, electronsIn, equationCe, reductionHalf, reverseEquation } from '../../../chem/redox.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import {
  answer, cap, ceMd, cellFigure, sciPart, E, electrolyticFigure, halfCe, L, metalName, metalOf, nameOf, plain, potTable, potTableMd, q, sf, sig, sv, TABLE_NOTE, transfer, transferCe, volts, voltPart, w, type Transfer,
} from './electro-common.ts';

const coef = (k: number) => (k === 1 ? '' : `${k}`);

// ---------------------------------------------------------------------------- lesson 2.6: voltaic cells

/** Metals for voltaic cells, with a pair at least 0.2 V apart. */
const CELL_METALS = ['Mg', 'Al', 'Zn', 'Cr', 'Fe', 'Cd', 'Co', 'Ni', 'Sn', 'Pb', 'Cu', 'Ag'];
const CELL_PAIRS: Array<[string, string]> = CELL_METALS.flatMap((a) => CELL_METALS.filter((c) => E(c) - E(a) >= 0.2).map((c) => [a, c] as [string, string]));

interface Cell {
  /** The anode and cathode metals (keys of their couples), and the reaction. */
  a: string;
  c: string;
  t: Transfer;
  anodeOnLeft: boolean;
  bridge: string;
}
function pickCell(rng: Rng): Cell {
  const [a, c] = rng.pick(CELL_PAIRS);
  return { a, c, t: transfer(c, a), anodeOnLeft: rng.chance(0.5), bridge: rng.pick(['KNO3', 'NaNO3']) };
}
function cellDrawing(cell: Cell, electrons = false) {
  const half = (k: string) => ({ electrode: k, solution: `${plain(metalOf(k).salt)}(aq)` });
  const [l, r] = cell.anodeOnLeft ? [cell.a, cell.c] : [cell.c, cell.a];
  return cellFigure(half(l), half(r), { bridge: `salt bridge, ${plain(cell.bridge)}(aq)`, electrons: electrons ? (cell.anodeOnLeft ? 'right' : 'left') : undefined });
}
function cellIntro(cell: Cell): string {
  const [l, r] = cell.anodeOnLeft ? [cell.a, cell.c] : [cell.c, cell.a];
  return `The diagram shows a standard voltaic cell: ${metalName(l)} in ${metalOf(l).saltName} solution on the left, and ${metalName(r)} in ${metalOf(r).saltName} solution on the right, joined by a salt bridge of ${ceMd(`${cell.bridge}(aq)`)}.`;
}

function voltaicParts(rng: Rng, d: Difficulty): GenOutput {
  const cell = pickCell(rng);
  const { a, c, t } = cell;
  const [A, C] = [metalName(a), metalName(c)];
  const [ionA, ionC] = [nameOf(metalOf(a).ion), nameOf(metalOf(c).ion)];
  const table = `\n\n${potTableMd([a, c])}\n\n${TABLE_NOTE}`;
  const figure = cellDrawing(cell);
  const findHint = 'The metal lower in the table is the stronger reducing agent: it is oxidised, so its electrode is the anode. The ions higher in the table are reduced at the cathode.';
  const halves = [`Anode (oxidation): ${ceMd(halfCe(t, t.ox))}`, `Cathode (reduction): ${ceMd(halfCe(t, t.red))}`];
  if (d === 1) {
    const askAnode = rng.chance(0.5);
    const s = {
      aOx: `The ${A} electrode, where ${A} is oxidised`,
      cOx: `The ${C} electrode, where ${C} is oxidised`,
      aRed: `The ${A} electrode, where ${ionA} are reduced`,
      cRed: `The ${C} electrode, where ${ionC} are reduced`,
    };
    return {
      prompt: `${cellIntro(cell)} Which electrode is the ${askAnode ? 'anode' : 'cathode'}?${table}`,
      figure,
      parts: [part(mc(rng, askAnode ? s.aOx : s.cRed, askAnode ? [s.cOx, s.aRed, s.cRed] : [s.aRed, s.cOx, s.aOx]))],
      hints: ['Oxidation happens at the anode and reduction at the cathode.', findHint],
      solution: [...halves, askAnode ? `So the ${A} electrode is the anode.` : `So the ${C} electrode is the cathode.`],
    };
  }
  if (d === 2) {
    const kind = rng.pick(['electrons', 'cations', 'anions', 'mass'] as const);
    const ask = {
      electrons: { q: 'In which direction do electrons flow?', right: `Through the wire, from the ${A} electrode to the ${C} electrode`, wrong: [`Through the wire, from the ${C} electrode to the ${A} electrode`, `Through the salt bridge, from the ${A} half-cell to the ${C} half-cell`, `Through the salt bridge, from the ${C} half-cell to the ${A} half-cell`], why: `Electrons leave the anode, where ${A} is oxidised, and travel through the wire to the cathode. They never pass through the solutions or the salt bridge.` },
      cations: { q: `Which way do the cations in the salt bridge move?`, right: `Toward the ${C} half-cell, the cathode`, wrong: [`Toward the ${A} half-cell, the anode`, 'They stay still: only electrons move', 'Into the wire, to carry the current'], why: `At the cathode, ${ionC} are removed from the solution, so cations move in to replace their positive charge.` },
      anions: { q: `Which way do the nitrate ions in the salt bridge move?`, right: `Toward the ${A} half-cell, the anode`, wrong: [`Toward the ${C} half-cell, the cathode`, 'They stay still: only electrons move', 'Into the wire, to carry the current'], why: `At the anode, ${ionA} enter the solution, so anions move in to balance their positive charge.` },
      mass: { q: 'Which electrode gains mass as the cell runs?', right: `The ${C} electrode, because ${ionC} are reduced to ${C} metal on it`, wrong: [`The ${A} electrode, because ${ionA} are reduced to ${A} metal on it`, `The ${C} electrode, because ${C} is oxidised`, 'Neither: the electrodes only carry electrons'], why: `The ${A} electrode loses mass as ${A} atoms become ions; ${C} atoms build up on the cathode.` },
    }[kind];
    return {
      prompt: `${cellIntro(cell)} ${ask.q}${table}`,
      figure,
      parts: [part(mc(rng, ask.right, ask.wrong))],
      hints: ['Decide first which electrode is the anode and which is the cathode.', findHint, 'Electrons travel only through the wire, from the anode to the cathode; ions carry the charge through the solutions and the salt bridge.'],
      solution: [...halves, ask.why],
    };
  }
  const truths = [
    `Electrons flow through the wire from the ${A} electrode to the ${C} electrode.`,
    `The ${C} electrode gains mass.`,
    `Nitrate ions in the salt bridge move toward the ${A} half-cell.`,
    `Cations in the salt bridge move toward the ${C} half-cell.`,
    `The concentration of ${ionC} decreases.`,
    `The ${A} electrode is the anode.`,
  ];
  const lies = [
    `Electrons flow through the wire from the ${C} electrode to the ${A} electrode.`,
    `The ${A} electrode gains mass.`,
    `Nitrate ions in the salt bridge move toward the ${C} half-cell.`,
    `Electrons flow through the salt bridge.`,
    `The concentration of ${ionA} decreases.`,
    `The ${C} electrode is the anode.`,
  ];
  const nTrue = rng.int(2, 3);
  const options = [...rng.sample(truths, nTrue).map((md) => ({ md, correct: true })), ...rng.sample(lies, 5 - nTrue).map((md) => ({ md, correct: false }))];
  return {
    prompt: `${cellIntro(cell)} Select every true statement about the cell as it runs.${table}`,
    figure,
    parts: [part(multi(rng, options))],
    hints: [findHint, 'Electrons flow through the wire from the anode to the cathode. In the salt bridge, anions move toward the anode and cations toward the cathode.'],
    solution: [...halves, `Electrons flow through the wire from ${A} to ${C}. The ${C} electrode gains mass as ${ionC} are reduced, so their concentration falls; the ${A} electrode loses mass and ${ionA} build up. Anions in the salt bridge move toward the ${A} half-cell and cations toward the ${C} half-cell.`],
  };
}

/** Cell notation, in maths: a single bar between phases, a double bar for the salt bridge. */
const bars = (s: string) => s.split(' | ').map((x) => `\\ce{${x}}`).join(' \\mid ');
const notationTex = (anode: string, cathode: string) => `$${bars(anode)} \\parallel ${bars(cathode)}$`;
/** One half-cell in notation: as the anode (on the left) or the cathode (on the right). */
function halfNotation(key: string, side: 'anode' | 'cathode'): string {
  const h = reductionHalf(key);
  const metal = /^[A-Z][a-z]?$/.test(h.ra) && h.ra !== 'H2';
  if (metal) return side === 'anode' ? `${h.raState} | ${h.oaState}` : `${h.oaState} | ${h.raState}`;
  const custom: Record<string, [string, string]> = {
    H: ['Pt(s) | H2(g) | H^+(aq)', 'H^+(aq) | H2(g) | Pt(s)'],
    Cl2: ['Pt(s) | Cl^-(aq) | Cl2(g)', 'Cl2(g) | Cl^-(aq) | Pt(s)'],
    Fe3: ['Pt(s) | Fe^2+(aq), Fe^3+(aq)', 'Fe^3+(aq), Fe^2+(aq) | Pt(s)'],
    Br2: ['Pt(s) | Br^-(aq), Br2(l)', 'Br2(l), Br^-(aq) | Pt(s)'],
    MnO4: ['Pt(s) | Mn^2+(aq), H^+(aq), MnO4^-(aq)', 'MnO4^-(aq), H^+(aq), Mn^2+(aq) | Pt(s)'],
  };
  return custom[key][side === 'anode' ? 0 : 1];
}
/** Cells with an inert platinum electrode on one side: [anode couple, cathode couple]. */
const INERT_CANDIDATES: Array<[string, string]> = [
  ...['Mg', 'Al', 'Zn', 'Cd', 'Ni', 'Sn', 'Pb', 'Cu'].flatMap((a) => ['Fe3', 'Cl2', 'Br2', 'MnO4'].filter((c) => E(c) - E(a) >= 0.2).map((c) => [a, c] as [string, string])),
  ['H', 'Cu'], ['H', 'Ag'], ['Fe3', 'Cl2'], ['Fe3', 'Br2'], ['Fe3', 'MnO4'], ['Zn', 'H'], ['Mg', 'H'], ['Al', 'H'],
];
const INERT_CELLS = INERT_CANDIDATES.filter(([a, c]) => {
  const t = transfer(c, a);
  const want = [...t.eq.left, ...t.eq.right].map(([k]) => k);
  return balance(t.eq.left.map(([, f]) => f), t.eq.right.map(([, f]) => f))?.join() === want.join();
});

function cellNotation(rng: Rng, d: Difficulty): GenOutput {
  const readHint = 'In cell notation the anode is written on the left and the cathode on the right; a single line separates phases and the double line is the salt bridge.';
  if (d === 1) {
    const [a, c] = rng.pick(CELL_PAIRS);
    const t = transfer(c, a);
    const nota = notationTex(halfNotation(a, 'anode'), halfNotation(c, 'cathode'));
    const askOx = rng.chance(0.5);
    const sp = [t.r.raState, t.o.oaState, t.r.oaState, t.o.raState].map(ceMd);
    return {
      prompt: `A voltaic cell is written ${nota}. Which species is ${askOx ? 'oxidised at the anode' : 'reduced at the cathode'}?`,
      parts: [part(mc(rng, askOx ? sp[0] : sp[1], askOx ? [sp[1], sp[2], sp[3]] : [sp[0], sp[2], sp[3]]))],
      hints: [readHint, 'At the anode the electrode metal loses electrons; at the cathode the ions in solution gain electrons.'],
      solution: [`The anode is on the left: ${ceMd(halfCe(t, t.ox))}.`, `The cathode is on the right: ${ceMd(halfCe(t, t.red))}.`],
    };
  }
  if (d === 2) {
    const [a, c] = rng.pick(CELL_PAIRS);
    const [A, C] = [metalOf(a), metalOf(c)];
    const shown = rng.shuffle([a, c]);
    const right = notationTex(halfNotation(a, 'anode'), halfNotation(c, 'cathode'));
    const wrong = [
      notationTex(halfNotation(c, 'anode'), halfNotation(a, 'cathode')),
      notationTex(halfNotation(a, 'cathode'), halfNotation(c, 'anode')),
      `$\\ce{${a}(s)} \\parallel \\ce{${A.ion}(aq)} \\mid \\ce{${C.ion}(aq)} \\parallel \\ce{${c}(s)}$`,
    ];
    return {
      prompt: `A standard voltaic cell is made from a ${metalName(shown[0])} electrode in a solution of ${nameOf(metalOf(shown[0]).ion)} and a ${metalName(shown[1])} electrode in a solution of ${nameOf(metalOf(shown[1]).ion)}. Which is the correct cell notation? ${TABLE_NOTE}`,
      figure: potTable([a, c]),
      parts: [part(mc(rng, right, wrong))],
      hints: ['Use the table to decide which metal is oxidised: that electrode is the anode.', readHint, 'Each half-cell is written in the order the reaction goes: the anode metal, then its ions; the cathode ions, then the cathode metal.'],
      solution: [`${cap(metalName(a))} is the stronger reducing agent (lower in the table), so it is the anode: ${ceMd(`${a}(s) -> ${A.ion}(aq) + ${electronsIn(transfer(c, a).ox).n}e-`)}.`, `The notation puts the anode on the left: ${right}.`],
    };
  }
  const [a, c] = rng.pick(INERT_CELLS);
  const t = transfer(c, a);
  return {
    prompt: `A voltaic cell is written ${notationTex(halfNotation(a, 'anode'), halfNotation(c, 'cathode'))}. Balance the equation for the reaction in the cell. ${TABLE_NOTE}`,
    figure: potTable([a, c]),
    parts: [part({ kind: 'coefficients', reactants: t.eq.left.map(([, f]) => f), products: t.eq.right.map(([, f]) => f) })],
    hints: [readHint, 'Platinum is an inert electrode: it carries electrons but does not react. The species beside it are the ones that react.', 'Write the oxidation at the anode and the reduction at the cathode, multiply so the electrons match, and add.'],
    solution: [`Anode (oxidation): ${ceMd(halfCe(t, t.ox))}`, `Cathode (reduction): ${ceMd(halfCe(t, t.red))}`, `Electrons matched and added: ${ceMd(transferCe(t))}`],
  };
}

// ---------------------------------------------------------------------------- lesson 2.7: standard cell potentials

const FORMULA_NOTE = '$E^\\circ_\\text{cell} = E^\\circ_\\text{cathode} - E^\\circ_\\text{anode}$';
function potentialSteps(t: Transfer): string[] {
  return [
    `Cathode (reduction): ${ceMd(halfCe(t, t.red))}, $E^\\circ = ${sv(t.o.E)}\\ \\text{V}$`,
    `Anode (oxidation): ${ceMd(halfCe(t, t.ox))}, from $E^\\circ = ${sv(t.r.E)}\\ \\text{V}$`,
    `$E^\\circ_\\text{cell} = ${sv(t.o.E)} - (${sv(t.r.E)}) = ${sv(t.E)}\\ \\text{V}$`,
  ];
}
/** Couples a standard cell can be built from: the metals and the inert-electrode couples. */
const CELL_COUPLES = [...CELL_METALS, 'Fe3', 'Cl2', 'Br2', 'H', 'Au'];
const sameElement = (x: string, y: string) => x === y || (['Fe', 'Fe3'].includes(x) && ['Fe', 'Fe3'].includes(y));

function cellPotentialSkill(rng: Rng, d: Difficulty): GenOutput {
  const hint = `${FORMULA_NOTE}, using the reduction potentials as the table gives them. Do not change the sign of the anode's potential, and do not multiply it by a coefficient.`;
  if (d < 3) {
    let a: string;
    let c: string;
    do {
      [a, c] = rng.sample(d === 1 ? CELL_METALS : CELL_COUPLES, 2).sort((x, y) => E(x) - E(y));
    } while (sameElement(a, c) || E(c) - E(a) < 0.1);
    const t = transfer(c, a);
    if (d === 1) {
      return {
        prompt: `In a standard voltaic cell, ${nameOf(t.o.oa)} are reduced at the cathode and ${nameOf(t.r.ra)} is oxidised at the anode. The standard reduction potentials are ${ceMd(t.o.text)}, ${volts(t.o.E)}, and ${ceMd(t.r.text)}, ${volts(t.r.E)}. What is the standard cell potential, to the nearest hundredth of a volt? ${FORMULA_NOTE}.`,
        parts: [voltPart(t.E, '$E^\\circ_\\text{cell} =$')],
        hints: [hint],
        solution: potentialSteps(t),
      };
    }
    const describe = (k: string) => (/^[A-Z][a-z]?$/.test(reductionHalf(k).ra) && k !== 'H' ? `${/^[aeiou]/.test(metalName(k)) ? 'an' : 'a'} ${metalName(k)} half-cell` : k === 'H' ? 'a standard hydrogen electrode' : `a half-cell of ${ceMd(reductionHalf(k).oa)} and ${ceMd(reductionHalf(k).ra)} with a platinum electrode`);
    const shown = rng.shuffle([a, c]);
    return {
      prompt: `A standard voltaic cell is made from ${describe(shown[0])} and ${describe(shown[1])}. What is its standard cell potential, to the nearest hundredth of a volt? ${TABLE_NOTE}`,
      figure: potTable([a, c]),
      parts: [voltPart(t.E, '$E^\\circ_\\text{cell} =$')],
      hints: ['The half-reaction higher in the table happens as a reduction, at the cathode; the lower one runs in reverse, at the anode.', hint],
      solution: potentialSteps(t),
    };
  }
  // Working backwards: an unknown metal measured against a known half-cell.
  const ref = rng.pick(['Cu', 'Ag', 'Ni', 'Zn', 'Pb', 'H']);
  const unknown = rng.pick(CELL_METALS.filter((m) => m !== ref && Math.abs(E(m) - E(ref)) >= 0.1));
  const R = reductionHalf(ref);
  const U = reductionHalf(unknown);
  const unknownIsAnode = E(unknown) < E(ref);
  const cellE = cellPotential(Math.max(E(ref), E(unknown)), Math.min(E(ref), E(unknown)));
  const n = U.electrons;
  const ion = n === 1 ? 'M^+' : `M^${n}+`;
  const refName = ref === 'H' ? 'a standard hydrogen electrode' : `a standard ${metalName(ref)} half-cell`;
  const refElectrode = ref === 'H' ? 'the platinum electrode of the hydrogen half-cell' : `the ${metalName(ref)} electrode`;
  const flow = unknownIsAnode ? `from the M electrode to ${refElectrode}` : `from ${refElectrode} to the M electrode`;
  return {
    prompt: `A voltaic cell is made from ${refName} and a half-cell of an unknown metal M in a $1.0\\ \\text{mol/L}$ solution of $\\ce{${ion}}$ ions. The cell potential is ${volts(cellE)}, and electrons flow through the wire ${flow}. For the known half-cell, ${ceMd(R.text)} has $E^\\circ = ${sv(R.E)}\\ \\text{V}$. What is the standard reduction potential of $\\ce{${ion}(aq) + ${coef(n)}e- -> M(s)}$, to the nearest hundredth of a volt?`,
    parts: [voltPart(U.E, '$E^\\circ =$')],
    hints: ['Electrons flow from the anode to the cathode: decide which half-cell is which.', `${FORMULA_NOTE}: substitute what you know and solve for the unknown potential.`],
    solution: [
      unknownIsAnode ? `Electrons leave the M electrode, so M is the anode and the known half-cell is the cathode.` : `Electrons flow to the M electrode, so M is the cathode and the known half-cell is the anode.`,
      unknownIsAnode ? `$${sv(cellE)} = ${sv(R.E)} - E^\\circ_\\text{M}$, so $E^\\circ_\\text{M} = ${sv(R.E)} - ${cellE.toFixed(2)} = ${sv(U.E)}\\ \\text{V}$` : `$${sv(cellE)} = E^\\circ_\\text{M} - (${sv(R.E)})$, so $E^\\circ_\\text{M} = ${cellE.toFixed(2)} + (${sv(R.E)}) = ${sv(U.E)}\\ \\text{V}$`,
    ],
  };
}

/** Couples for whole reactions: oxidising agents may be any couple; reducing agents are kept simple. */
const OA_COUPLES = ['MnO4', 'Cr2O7', 'H2O2', 'Cl2', 'O2', 'Br2', 'NO3', 'Ag', 'Fe3', 'I2', 'Cu', 'H', 'Pb', 'Sn', 'Ni', 'Fe', 'Zn', 'Al', 'Mg', 'Au'];
const RA_COUPLES = ['Br2', 'Ag', 'Fe3', 'I2', 'Cu', 'Sn4', 'Pb', 'Sn', 'Ni', 'Fe', 'Zn', 'Al', 'Mg', 'Cl2', 'Cd'];
const elementOf = (key: string) => {
  const els = (f: string) => f.replace(/\^.*$/, '').match(/[A-Z][a-z]?/g)!.filter((x) => x !== 'H' && x !== 'O');
  const h = reductionHalf(key);
  return [...new Set([...els(h.oa), ...els(h.ra)])].join() || 'H';
};
const REACTION_PAIRS: Array<[string, string]> = OA_COUPLES.flatMap((o) =>
  RA_COUPLES.filter((r) => elementOf(o) !== elementOf(r) && Math.abs(E(o) - E(r)) >= 0.05).map((r) => [o, r] as [string, string]),
);

function cellSpontaneous(rng: Rng, d: Difficulty): GenOutput {
  const rule = 'A reaction is spontaneous when its $E^\\circ$ is positive, and non-spontaneous when it is negative.';
  const asWritten = 'For the reaction as written, the species reduced is at the cathode and the species oxidised is at the anode.';
  if (d < 3) {
    const want = rng.chance(0.5);
    const pool = REACTION_PAIRS.filter(([o, r]) => (E(o) > E(r)) === want && (d === 2 || (CELL_METALS.includes(o) && CELL_METALS.includes(r))));
    const [o, r] = rng.pick(pool);
    const t = transfer(o, r);
    const x = Math.abs(t.E).toFixed(2);
    const intro = `Consider the reaction ${ceMd(transferCe(t))}. ${TABLE_NOTE}`;
    if (d === 1) {
      const options = ['+', '−'].flatMap((sign) => ['spontaneous', 'non-spontaneous'].map((kind) => ({ md: `$E^\\circ = ${sign === '+' ? '+' : '-'}${x}\\ \\text{V}$, so it is ${kind}`, ok: (sign === '+') === (t.E > 0) && (kind === 'spontaneous') === (t.E > 0) })));
      return {
        prompt: `${intro} What is $E^\\circ$ for the reaction, and is it spontaneous?`,
        figure: potTable([o, r]),
        parts: [part(mc(rng, options.find((y) => y.ok)!.md, options.filter((y) => !y.ok).map((y) => y.md)))],
        hints: [asWritten, `${FORMULA_NOTE}. ${rule}`],
        solution: [...potentialSteps(t), t.E > 0 ? 'The potential is positive, so the reaction is spontaneous.' : 'The potential is negative, so the reaction is non-spontaneous: it would need energy put in to run.'],
      };
    }
    return {
      prompt: `${intro} Find $E^\\circ$ for the reaction as written, to the nearest hundredth of a volt, and decide whether it is spontaneous.`,
      figure: potTable([o, r]),
      parts: [voltPart(t.E, '$E^\\circ =$'), part(fixedChoice(['Spontaneous', 'Non-spontaneous'], t.E > 0 ? 0 : 1))],
      hints: [asWritten, `${FORMULA_NOTE}. The coefficients in the equation do not change the potentials.`, rule],
      solution: [...potentialSteps(t), t.E > 0 ? 'Positive, so spontaneous.' : 'Negative, so non-spontaneous.'],
    };
  }
  for (;;) {
    const pairs = rng.sample(REACTION_PAIRS, 4);
    const ts = pairs.map(([o, r]) => transfer(o, r));
    const yes = ts.filter((t) => t.E > 0).length;
    const keys = [...new Set(pairs.flat())];
    if (yes === 0 || yes === 4 || keys.length > 7) continue;
    if (new Set(ts.map((t) => transferCe(t, false))).size < 4) continue;
    return {
      prompt: `Select every reaction that is spontaneous at standard conditions. ${TABLE_NOTE}`,
      figure: potTable(keys),
      parts: [part(multi(rng, ts.map((t) => ({ md: ceMd(transferCe(t, false)), correct: t.E > 0 }))))],
      hints: [asWritten, `${FORMULA_NOTE}. ${rule}`],
      solution: ts.map((t) => `${ceMd(transferCe(t, false))}: $E^\\circ = ${sv(t.o.E)} - (${sv(t.r.E)}) = ${sv(t.E)}\\ \\text{V}$, ${t.E > 0 ? 'spontaneous' : 'non-spontaneous'}.`),
    };
  }
}

// ---------------------------------------------------------------------------- lesson 2.8: electrolytic cells and Faraday's law

const MOLTEN: Array<{ salt: string; name: string; metal: string; halogen: string }> = [
  { salt: 'NaCl', name: 'sodium chloride', metal: 'Na', halogen: 'Cl2' },
  { salt: 'KBr', name: 'potassium bromide', metal: 'K', halogen: 'Br2' },
  { salt: 'MgCl2', name: 'magnesium chloride', metal: 'Mg', halogen: 'Cl2' },
  { salt: 'CaCl2', name: 'calcium chloride', metal: 'Ca', halogen: 'Cl2' },
  { salt: 'LiCl', name: 'lithium chloride', metal: 'Li', halogen: 'Cl2' },
  { salt: 'PbBr2', name: 'lead(II) bromide', metal: 'Pb', halogen: 'Br2' },
  { salt: 'NaBr', name: 'sodium bromide', metal: 'Na', halogen: 'Br2' },
  { salt: 'KI', name: 'potassium iodide', metal: 'K', halogen: 'I2' },
  { salt: 'ZnCl2', name: 'zinc chloride', metal: 'Zn', halogen: 'Cl2' },
  { salt: 'CaBr2', name: 'calcium bromide', metal: 'Ca', halogen: 'Br2' },
  { salt: 'MgBr2', name: 'magnesium bromide', metal: 'Mg', halogen: 'Br2' },
];
/** Solutions electrolysed with inert electrodes: the metal's couple, and the halogen's couple (none for a sulfate). */
const AQUEOUS: Array<{ salt: string; name: string; metal: string; halogen?: string }> = [
  { salt: 'KI', name: 'potassium iodide', metal: 'K', halogen: 'I2' },
  { salt: 'NaI', name: 'sodium iodide', metal: 'Na', halogen: 'I2' },
  { salt: 'KBr', name: 'potassium bromide', metal: 'K', halogen: 'Br2' },
  { salt: 'MgBr2', name: 'magnesium bromide', metal: 'Mg', halogen: 'Br2' },
  { salt: 'ZnBr2', name: 'zinc bromide', metal: 'Zn', halogen: 'Br2' },
  { salt: 'ZnI2', name: 'zinc iodide', metal: 'Zn', halogen: 'I2' },
  { salt: 'NiBr2', name: 'nickel(II) bromide', metal: 'Ni', halogen: 'Br2' },
  { salt: 'NiI2', name: 'nickel(II) iodide', metal: 'Ni', halogen: 'I2' },
  { salt: 'CuBr2', name: 'copper(II) bromide', metal: 'Cu', halogen: 'Br2' },
  { salt: 'CuSO4', name: 'copper(II) sulfate', metal: 'Cu' },
  { salt: 'NiSO4', name: 'nickel(II) sulfate', metal: 'Ni' },
  { salt: 'ZnSO4', name: 'zinc sulfate', metal: 'Zn' },
  { salt: 'Na2SO4', name: 'sodium sulfate', metal: 'Na' },
  { salt: 'K2SO4', name: 'potassium sulfate', metal: 'K' },
  { salt: 'SnSO4', name: 'tin(II) sulfate', metal: 'Sn' },
];
const withState = (k: string) => reductionHalf(k).raState;

function electrolysis(s: { metal: string; halogen?: string }) {
  const cat = reductionHalf(s.metal);
  const water = reductionHalf('H2O');
  const oxygen = reductionHalf('O2');
  const cathode = cat.E > water.E ? cat : water;
  const hal = s.halogen ? reductionHalf(s.halogen) : null;
  const anode = hal && hal.E < oxygen.E ? hal : oxygen;
  return { cat, water, oxygen, hal, cathode, anode, min: Math.round((anode.E - cathode.E) * 100) / 100, cathodeProduct: cathode === cat ? cat.raState : 'H2(g)', anodeProduct: anode === hal ? hal.oaState : 'O2(g)' };
}
const productName = (f: string) => {
  const base = f.replace(/\((aq|s|l|g)\)$/, '');
  return base === 'H2' ? 'hydrogen' : base === 'O2' ? 'oxygen' : nameOf(base);
};

function electrolytic(rng: Rng, d: Difficulty): GenOutput {
  const rules = ['Reduction happens at the cathode and oxidation at the anode.', 'At the cathode the strongest oxidising agent present (highest on the left of the table) is reduced; at the anode the strongest reducing agent (lowest on the right) is oxidised.'];
  if (d === 1) {
    const m = rng.pick(MOLTEN);
    const M = metalName(m.metal);
    const X = nameOf(m.halogen);
    const right = `${cap(M)} at the cathode and ${X} at the anode`;
    return {
      prompt: `Molten ${m.name}, ${ceMd(`${m.salt}(l)`)}, is electrolysed with inert electrodes. What forms at each electrode?`,
      figure: electrolyticFigure(`${plain(m.salt)}(l)`),
      parts: [part(mc(rng, right, [`${cap(X)} at the cathode and ${M} at the anode`, `Hydrogen at the cathode and ${X} at the anode`, `${cap(M)} at the cathode and oxygen at the anode`]))],
      hints: ['A molten salt contains only the metal ions and the halide ions: there is no water.', rules[0]],
      solution: [
        `Cathode (reduction): ${ceMd(equationCe(reductionHalf(m.metal).eq))}, so ${M} metal forms.`,
        `Anode (oxidation): ${ceMd(equationCe(reverseEquation(reductionHalf(m.halogen).eq)))}, so ${X} forms.`,
      ],
    };
  }
  const s = rng.pick(AQUEOUS);
  const e = electrolysis(s);
  const keys = [s.metal, 'H2O', 'O2', ...(s.halogen ? [s.halogen] : [])];
  const sulfate = s.salt.includes('SO4') ? ' Sulfate ions are not oxidised or reduced here.' : '';
  const intro = `An aqueous solution of ${s.name}, ${ceMd(`${s.salt}(aq)`)}, is electrolysed with inert electrodes.${sulfate} ${TABLE_NOTE}`;
  const solution = [
    `Oxidising agents present: ${ceMd(e.cat.oaState)} (${volts(e.cat.E)}) and $\\ce{H2O(l)}$ (${volts(e.water.E)}). The stronger, ${ceMd(e.cathode.oaState)}, is reduced at the cathode: ${ceMd(equationCe(e.cathode.eq, e.cathode.states))}.`,
    e.hal
      ? `Reducing agents present: ${ceMd(e.hal.raState)} (${volts(e.hal.E)}) and $\\ce{H2O(l)}$ (${volts(e.oxygen.E)}). The stronger, ${ceMd(e.anode.raState)}, is oxidised at the anode, forming ${ceMd(e.anodeProduct)}.`
      : `The only reducing agent present is $\\ce{H2O(l)}$ (${volts(e.oxygen.E)}), so water is oxidised at the anode, forming $\\ce{O2(g)}$: $\\ce{2H2O(l) -> O2(g) + 4H^+(aq) + 4e-}$.`,
  ];
  const metalProduct = withState(s.metal);
  if (d === 2) {
    const cathodeChoices = [metalProduct, 'H2(g)', 'O2(g)', ...(e.hal ? [e.hal.oaState] : [])];
    const anodeChoices = [...(e.hal ? [e.hal.oaState] : []), 'O2(g)', 'H2(g)', metalProduct];
    const pick = (right: string, all: string[]) => mc(rng, ceMd(right), all.filter((x) => x !== right).map(ceMd));
    return {
      prompt: `${intro} What forms at the cathode, and what forms at the anode?`,
      figure: potTable(keys),
      parts: [part(pick(e.cathodeProduct, cathodeChoices), { label: 'Cathode' }), part(pick(e.anodeProduct, anodeChoices), { label: 'Anode' })],
      hints: [...rules, 'In a solution, water can also be reduced (to hydrogen) or oxidised (to oxygen).'],
      solution,
    };
  }
  const cathodes = [metalProduct, 'H2(g)'];
  const anodes = e.hal ? [e.hal.oaState, 'O2(g)'] : ['O2(g)', 'SO2(g)'];
  const combos = cathodes.flatMap((c) => anodes.map((a) => ({ md: `${cap(productName(c))} at the cathode and ${productName(a)} at the anode`, ok: c === e.cathodeProduct && a === e.anodeProduct })));
  return {
    prompt: `${intro} What forms at each electrode, and what is the minimum voltage needed, to the nearest hundredth of a volt?`,
    figure: potTable(keys),
    parts: [part(mc(rng, combos.find((x) => x.ok)!.md, combos.filter((x) => !x.ok).map((x) => x.md)), { label: 'Products' }), voltPart(e.min, 'Minimum voltage')],
    hints: [...rules, `The cell potential is $E^\\circ_\\text{cathode} - E^\\circ_\\text{anode}$, which is negative for an electrolytic cell; the minimum voltage is its size.`],
    solution: [...solution, `$E^\\circ_\\text{cell} = ${sv(e.cathode.E)} - (${sv(e.anode.E)}) = ${sv(-e.min)}\\ \\text{V}$, so at least $${e.min.toFixed(2)}\\ \\text{V}$ must be applied.`],
  };
}

const F = 96500;
const F_NOTE = 'Use $F = 9.65 \\times 10^4\\ \\text{C/mol}$ (the charge of one mole of electrons).';
/** Metals plated or refined by electrolysis: their ion, molar mass and a use. */
const PLATING: Array<{ key: string; ion: string; z: number; use: string; made?: boolean }> = [
  { key: 'Cu', ion: 'Cu^2+', z: 2, use: 'copper is refined' },
  { key: 'Ag', ion: 'Ag^+', z: 1, use: 'a spoon is silver-plated' },
  { key: 'Ni', ion: 'Ni^2+', z: 2, use: 'a steel part is nickel-plated' },
  { key: 'Zn', ion: 'Zn^2+', z: 2, use: 'an iron sheet is galvanised with zinc' },
  { key: 'Cr', ion: 'Cr^3+', z: 3, use: 'a tap is chromium-plated' },
  { key: 'Au', ion: 'Au^3+', z: 3, use: 'a contact is gold-plated' },
  { key: 'Sn', ion: 'Sn^2+', z: 2, use: 'a steel can is tin-plated' },
  { key: 'Al', ion: 'Al^3+', z: 3, use: 'aluminium is made from molten aluminium oxide', made: true },
];
const massOf = (key: string) => Number(element(key)!.mass.toFixed(2));

function faraday(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const I = rng.pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5]);
    const t = rng.pick([965, 1930, 2895, 3860, 4825, 5790, 7720]);
    const n = (I * t) / F;
    return {
      prompt: `A current of ${q(sf(I), 'A')} flows through an electrolytic cell for ${q(t, 's')}. What amount of electrons passes through the cell, in moles, to three significant figures? ${F_NOTE}`,
      parts: [sciPart(n, 3, 'mol')],
      calculator: true,
      hints: ['The charge is $Q = It$, in coulombs.', 'Faraday\'s law: $n_{e^-} = \\dfrac{It}{F}$.'],
      solution: [`$Q = It = ${sf(I)} \\times ${t} = ${Number((I * t).toFixed(2))}\\ \\text{C}$`, `$n_{e^-} = \\dfrac{Q}{F} = \\dfrac{${Number((I * t).toFixed(2))}}{9.65 \\times 10^4} = ${sf(n)}\\ \\text{mol}$`],
    };
  }
  const p = rng.pick(PLATING);
  const M = massOf(p.key);
  const half = `$\\ce{${p.ion} + ${coef(p.z)}e- -> ${p.key}}$`;
  const given = `The half-reaction is ${half}. Use the molar mass ${p.key} $${M.toFixed(2)}\\ \\text{g/mol}$. ${F_NOTE}`;
  if (d === 2) {
    const I = sig(rng.float(0.5, 12, 2));
    const min = rng.int(5, 120);
    const ts = min * 60;
    const ne = (I * ts) / F;
    const nm = ne / p.z;
    const a = answer(nm * M, 'g');
    return {
      prompt: `When ${p.use}, a current of ${q(sf(I), 'A')} flows for ${q(min, 'min')}. What mass of ${metalName(p.key)} is ${p.made ? 'produced' : 'deposited'}, ${a.phrase}? ${given}`,
      parts: [a.part],
      calculator: true,
      hints: ['Change the time to seconds, and find the amount of electrons: $n_{e^-} = \\dfrac{It}{F}$.', `Use the half-reaction: each ${metalName(p.key)} atom needs ${p.z} electron${p.z === 1 ? '' : 's'}. Then $m = nM$.`],
      solution: [
        `$t = ${min} \\times 60 = ${ts}\\ \\text{s}$`,
        `$n_{e^-} = \\dfrac{It}{F} = \\dfrac{${sf(I)} \\times ${ts}}{9.65 \\times 10^4} = ${w(ne)}\\ \\text{mol}$`,
        `$n(\\ce{${p.key}}) = ${w(ne)} \\times \\dfrac{1}{${p.z}} = ${w(nm)}\\ \\text{mol}$`,
        `$m = ${w(nm)} \\times ${M.toFixed(2)} = ${a.shown}\\ \\text{g}$`,
      ],
    };
  }
  const m = sig(rng.float(0.5, 25, 2));
  const nm = m / M;
  const ne = nm * p.z;
  if (rng.chance(0.5)) {
    const I = sig(rng.float(0.5, 12, 2));
    const ts = (ne * F) / I;
    const a = answer(ts / 60, 'min');
    return {
      prompt: `When ${p.use}, ${q(sf(m), 'g')} of ${metalName(p.key)} must be ${p.made ? 'produced' : 'deposited'} with a current of ${q(sf(I), 'A')}. How long does it take, in minutes, ${a.phrase}? ${given}`,
      parts: [a.part],
      calculator: true,
      hints: ['Change the mass to moles of metal, then to moles of electrons with the half-reaction.', 'Solve $n_{e^-} = \\dfrac{It}{F}$ for $t$, in seconds, then change to minutes.'],
      solution: [
        `$n(\\ce{${p.key}}) = \\dfrac{${sf(m)}}{${M.toFixed(2)}} = ${w(nm)}\\ \\text{mol}$`,
        `$n_{e^-} = ${p.z} \\times ${w(nm)} = ${w(ne)}\\ \\text{mol}$`,
        `$t = \\dfrac{n_{e^-}F}{I} = \\dfrac{${w(ne)} \\times 9.65 \\times 10^4}{${sf(I)}} = ${w(ts)}\\ \\text{s}$`,
        `$${w(ts)}\\ \\text{s} \\div 60 = ${a.shown}\\ \\text{min}$`,
      ],
    };
  }
  const min = rng.int(10, 180);
  const ts = min * 60;
  const I = (ne * F) / ts;
  const a = answer(I, 'A');
  return {
    prompt: `When ${p.use}, ${q(sf(m), 'g')} of ${metalName(p.key)} must be ${p.made ? 'produced' : 'deposited'} in ${q(min, 'min')}. What current is needed, ${a.phrase}? ${given}`,
    parts: [a.part],
    calculator: true,
    hints: ['Change the mass to moles of metal, then to moles of electrons with the half-reaction.', 'Solve $n_{e^-} = \\dfrac{It}{F}$ for $I$, with the time in seconds.'],
    solution: [
      `$n(\\ce{${p.key}}) = \\dfrac{${sf(m)}}{${M.toFixed(2)}} = ${w(nm)}\\ \\text{mol}$`,
      `$n_{e^-} = ${p.z} \\times ${w(nm)} = ${w(ne)}\\ \\text{mol}$`,
      `$t = ${min} \\times 60 = ${ts}\\ \\text{s}$`,
      `$I = \\dfrac{n_{e^-}F}{t} = \\dfrac{${w(ne)} \\times 9.65 \\times 10^4}{${ts}} = ${a.shown}\\ \\text{A}$`,
    ],
  };
}

// ----------------------------------------------------------------------------

export const CELL_SKILLS: SkillDef[] = [
  skill({ id: 'c30-voltaic-parts', name: 'Voltaic cells', description: 'Name the anode and cathode of a voltaic cell, and the directions electrons and ions move.', outcomes: ['12-B2'], lessonId: L(6), format: 'mc', gen: voltaicParts }),
  skill({ id: 'c30-cell-notation', name: 'Cell notation', description: 'Write and read the shorthand notation of a voltaic cell, including cells with inert electrodes.', outcomes: ['12-B2'], lessonId: L(6), gen: cellNotation }),
  skill({ id: 'c30-cell-potential', name: 'Standard cell potentials', description: 'Calculate the standard potential of a cell from reduction potentials, and find an unknown reduction potential from a cell potential.', outcomes: ['12-B2'], lessonId: L(7), calculator: true, gen: cellPotentialSkill }),
  skill({ id: 'c30-cell-spontaneous', name: 'Spontaneity from cell potentials', description: 'Use the sign of the standard potential to decide whether a redox reaction is spontaneous.', outcomes: ['12-B2'], lessonId: L(7), gen: cellSpontaneous }),
  skill({ id: 'c30-electrolytic', name: 'Electrolytic cells', description: 'Predict the products of electrolysing a molten salt or an aqueous solution, and the minimum voltage needed.', outcomes: ['12-B2'], lessonId: L(8), gen: electrolytic }),
  skill({ id: 'c30-faraday', name: "Faraday's law", description: "Use Faraday's law to relate current, time, the amount of electrons and the mass of product.", outcomes: ['12-B2'], lessonId: L(8), calculator: true, gen: faraday }),
];
