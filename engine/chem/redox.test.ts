import { describe, expect, it } from 'vitest';
import { parseFormula } from './formula.ts';
import {
  balanceHalf,
  combineHalves,
  electronsIn,
  equationCe,
  isBalancedEquation,
  oxidationNumber,
  oxidationNumbers,
  REDUCTION_TABLE,
  reductionHalf,
  reverseEquation,
  cellPotential,
} from './redox.ts';

describe('oxidation numbers', () => {
  it('follow the rules for elements, ions and compounds', () => {
    const cases: Array<[string, string, number]> = [
      ['O2', 'O', 0], ['P4', 'P', 0], ['Fe', 'Fe', 0], ['S8', 'S', 0],
      ['Fe^3+', 'Fe', 3], ['Cl^-', 'Cl', -1], ['S^2-', 'S', -2], ['Hg2^2+', 'Hg', 1],
      ['H2O', 'H', 1], ['H2O', 'O', -2], ['NaCl', 'Cl', -1], ['FeCl3', 'Fe', 3], ['Fe2O3', 'Fe', 3],
      ['MnO4^-', 'Mn', 7], ['KMnO4', 'Mn', 7], ['Cr2O7^2-', 'Cr', 6], ['K2Cr2O7', 'Cr', 6], ['CrO4^2-', 'Cr', 6],
      ['SO4^2-', 'S', 6], ['H2SO4', 'S', 6], ['SO3^2-', 'S', 4], ['SO2', 'S', 4], ['H2S', 'S', -2], ['S2O3^2-', 'S', 2],
      ['NO3^-', 'N', 5], ['NO2^-', 'N', 3], ['NO2', 'N', 4], ['NO', 'N', 2], ['N2O', 'N', 1], ['NH3', 'N', -3], ['NH4^+', 'N', -3],
      ['ClO4^-', 'Cl', 7], ['ClO3^-', 'Cl', 5], ['ClO^-', 'Cl', 1], ['HClO', 'Cl', 1], ['H3PO4', 'P', 5], ['PO4^3-', 'P', 5],
      ['CO2', 'C', 4], ['CO', 'C', 2], ['CH4', 'C', -4], ['CH3OH', 'C', -2], ['HCOOH', 'C', 2], ['CO3^2-', 'C', 4], ['C2O4^2-', 'C', 3], ['H2C2O4', 'C', 3],
      ['PCl5', 'P', 5], ['CS2', 'C', 4], ['CCl4', 'C', 4], ['HCN', 'C', 2], ['ICl', 'I', 1], ['IO3^-', 'I', 5],
      // Peroxides, metal hydrides and oxygen with fluorine.
      ['H2O2', 'O', -1], ['Na2O2', 'O', -1], ['BaO2', 'O', -1], ['NaH', 'H', -1], ['CaH2', 'H', -1], ['LiAlH4', 'H', -1], ['LiAlH4', 'Al', 3], ['OF2', 'O', 2],
      ['NaOH', 'O', -2], ['OH^-', 'O', -2], ['Ca(OH)2', 'Ca', 2], ['Al2(SO4)3', 'S', 6], ['NH4NO3', 'H', 1],
      ['FeSO4', 'Fe', 2], ['Fe2(SO4)3', 'Fe', 3], ['Fe2(SO4)3', 'S', 6], ['Cu(NO3)2', 'Cu', 2], ['Cu(NO3)2', 'N', 5], ['CuCl2', 'Cu', 2], ['Cr2(SO4)3', 'Cr', 3],
    ];
    for (const [f, el, v] of cases) expect(oxidationNumber(f, el), `${el} in ${f}`).toBe(v);
  });

  it('add up to the charge, and give averages where atoms differ', () => {
    for (const f of ['MnO4^-', 'Cr2O7^2-', 'SO4^2-', 'NH4^+', 'H2O2', 'C2H5OH', 'K3PO4', 'Fe3O4', 'S4O6^2-', 'LiAlH4']) {
      const { atoms, charge } = parseFormula(f);
      const on = oxidationNumbers(f);
      const total = [...atoms].reduce((s, [el, k]) => s + k * on.get(el)!, 0);
      expect(total, f).toBeCloseTo(charge);
    }
    expect(oxidationNumber('Fe3O4', 'Fe')).toBeCloseTo(8 / 3);
    expect(oxidationNumber('S4O6^2-', 'S')).toBe(2.5);
    expect(oxidationNumber('C2H5OH', 'C')).toBe(-2);
  });
});

describe('half-reactions in acidic solution', () => {
  const known: Array<[string, string, string]> = [
    ['MnO4^-', 'Mn^2+', 'MnO4^- + 8H^+ + 5e- -> Mn^2+ + 4H2O'],
    ['Cr2O7^2-', 'Cr^3+', 'Cr2O7^2- + 14H^+ + 6e- -> 2Cr^3+ + 7H2O'],
    ['NO3^-', 'NO', 'NO3^- + 4H^+ + 3e- -> NO + 2H2O'],
    ['NO3^-', 'NH4^+', 'NO3^- + 10H^+ + 8e- -> NH4^+ + 3H2O'],
    ['IO3^-', 'I2', '2IO3^- + 12H^+ + 10e- -> I2 + 6H2O'],
    ['H2O2', 'H2O', 'H2O2 + 2H^+ + 2e- -> 2H2O'],
    ['O2', 'H2O', 'O2 + 4H^+ + 4e- -> 2H2O'],
    ['SO2', 'SO4^2-', 'SO2 + 2H2O -> SO4^2- + 4H^+ + 2e-'],
    ['H2O2', 'O2', 'H2O2 -> O2 + 2H^+ + 2e-'],
    ['C2O4^2-', 'CO2', 'C2O4^2- -> 2CO2 + 2e-'],
    ['H2C2O4', 'CO2', 'H2C2O4 -> 2CO2 + 2H^+ + 2e-'],
    ['Mn^2+', 'MnO4^-', 'Mn^2+ + 4H2O -> MnO4^- + 8H^+ + 5e-'],
    ['C2H5OH', 'CH3COOH', 'C2H5OH + H2O -> CH3COOH + 4H^+ + 4e-'],
    ['H2O', 'O2', '2H2O -> O2 + 4H^+ + 4e-'],
    ['Fe^2+', 'Fe^3+', 'Fe^2+ -> Fe^3+ + e-'],
    ['I^-', 'I2', '2I^- -> I2 + 2e-'],
    ['Cl2', 'Cl^-', 'Cl2 + 2e- -> 2Cl^-'],
    ['S2O3^2-', 'S4O6^2-', '2S2O3^2- -> S4O6^2- + 2e-'],
  ];

  it('balance atoms, then oxygen with water, hydrogen with H+ and charge with electrons', () => {
    for (const [from, to, want] of known) {
      const b = balanceHalf(from, to);
      expect(equationCe(b.half), `${from} -> ${to}`).toBe(want);
      expect(isBalancedEquation(b.half)).toBe(true);
      expect(b.kind).toBe(electronsIn(b.half).side === 'left' ? 'reduction' : 'oxidation');
    }
    const b = balanceHalf('Cr2O7^2-', 'Cr^3+');
    expect(equationCe(b.atoms)).toBe('Cr2O7^2- -> 2Cr^3+');
    expect(equationCe(b.oxygen)).toBe('Cr2O7^2- -> 2Cr^3+ + 7H2O');
    expect(equationCe(b.hydrogen)).toBe('Cr2O7^2- + 14H^+ -> 2Cr^3+ + 7H2O');
    expect(b.water).toEqual({ n: 7, side: 'right' });
    expect(b.hydrogenIons).toEqual({ n: 14, side: 'left' });
    expect(b.electrons).toEqual({ n: 6, side: 'left' });
  });

  it('transfer as many electrons as the oxidation numbers change', () => {
    for (const [from, to] of known) {
      const b = balanceHalf(from, to);
      const [k0, f0] = b.half.left[0];
      const [k1, f1] = b.half.right[0];
      const el = b.key[0];
      const count = (f: string) => parseFormula(f).atoms.get(el)!;
      const change = k1 * count(f1) * oxidationNumber(f1, el) - k0 * count(f0) * oxidationNumber(f0, el);
      expect(Math.abs(change), `${from} -> ${to}`).toBe(b.electrons.n);
    }
  });

  it('combine into a redox equation with the electrons, water and H+ cancelled', () => {
    const fe = balanceHalf('Fe^2+', 'Fe^3+').half;
    const mn = balanceHalf('MnO4^-', 'Mn^2+').half;
    const c = combineHalves(fe, mn);
    expect(c.oxFactor).toBe(5);
    expect(c.redFactor).toBe(1);
    expect(c.electrons).toBe(5);
    expect(equationCe(c.overall)).toBe('MnO4^- + 5Fe^2+ + 8H^+ -> Mn^2+ + 5Fe^3+ + 4H2O');
    const so2 = balanceHalf('SO2', 'SO4^2-').half;
    const c2 = combineHalves(so2, mn);
    expect(equationCe(c2.overall)).toBe('2MnO4^- + 5SO2 + 2H2O -> 2Mn^2+ + 5SO4^2- + 4H^+');
    expect(isBalancedEquation(c2.overall)).toBe(true);
    const ox = balanceHalf('C2O4^2-', 'CO2').half;
    const cr = balanceHalf('Cr2O7^2-', 'Cr^3+').half;
    expect(equationCe(combineHalves(ox, cr).overall)).toBe('Cr2O7^2- + 3C2O4^2- + 14H^+ -> 2Cr^3+ + 6CO2 + 7H2O');
  });
});

describe('standard reduction potentials', () => {
  it('are balanced and ordered from the strongest oxidising agent down', () => {
    for (const h of REDUCTION_TABLE) {
      expect(isBalancedEquation(h.eq), h.text).toBe(true);
      expect(electronsIn(h.eq).side).toBe('left');
    }
    for (let i = 1; i < REDUCTION_TABLE.length; i++) expect(REDUCTION_TABLE[i].E).toBeLessThan(REDUCTION_TABLE[i - 1].E);
    expect(new Set(REDUCTION_TABLE.map((h) => h.key)).size).toBe(REDUCTION_TABLE.length);
  });

  it('name the oxidising and reducing agents and give cell potentials', () => {
    const cu = reductionHalf('Cu');
    expect([cu.oa, cu.ra, cu.oaState, cu.raState, cu.electrons]).toEqual(['Cu^2+', 'Cu', 'Cu^2+(aq)', 'Cu(s)', 2]);
    expect(reductionHalf('H2O').oa).toBe('H2O');
    expect(reductionHalf('O2').ra).toBe('H2O');
    expect(cellPotential(cu.E, reductionHalf('Zn').E)).toBe(1.1);
    expect(cellPotential(reductionHalf('Zn').E, cu.E)).toBe(-1.1);
    expect(equationCe(reverseEquation(reductionHalf('Zn').eq))).toBe('Zn -> Zn^2+ + 2e-');
  });
});
