import { describe, expect, it } from 'vitest';
import { balance, molarMass, parseFormula } from './formula.ts';
import { ACIDS, ANIONS, CATIONS, COMMON_NAMES, ionFormula, ionicFormula, ionicName, molecularNames } from './ions.ts';

const cation = (name: string) => CATIONS.find((i) => i.name === name)!;
const anion = (name: string) => ANIONS.find((i) => i.name === name)!;

describe('ions', () => {
  it('write their charges in the formula', () => {
    for (const i of [...CATIONS, ...ANIONS]) expect(parseFormula(ionFormula(i)).charge, i.name).toBe(i.charge);
    expect(ionFormula(anion('sulfate'))).toBe('SO4^2-');
    expect(ionFormula(cation('sodium'))).toBe('Na^+');
    expect(ionFormula(cation('mercury(I)'))).toBe('Hg2^2+');
  });

  it('have one name each', () => {
    const names = [...CATIONS, ...ANIONS].map((i) => i.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('ionic compounds', () => {
  it('combine ions so the charges cancel, with brackets around more than one polyatomic ion', () => {
    expect(ionicFormula(cation('sodium'), anion('chloride'))).toBe('NaCl');
    expect(ionicFormula(cation('calcium'), anion('chloride'))).toBe('CaCl2');
    expect(ionicFormula(cation('aluminium'), anion('oxide'))).toBe('Al2O3');
    expect(ionicFormula(cation('iron(III)'), anion('sulfate'))).toBe('Fe2(SO4)3');
    expect(ionicFormula(cation('ammonium'), anion('phosphate'))).toBe('(NH4)3PO4');
    expect(ionicFormula(cation('calcium'), anion('hydroxide'))).toBe('Ca(OH)2');
    expect(ionicFormula(cation('mercury(I)'), anion('chloride'))).toBe('Hg2Cl2');
    expect(ionicFormula(cation('tin(IV)'), anion('oxide'))).toBe('SnO2');
    for (const c of CATIONS) for (const a of ANIONS) expect(parseFormula(ionicFormula(c, a)).charge, `${c.name} ${a.name}`).toBe(0);
  });

  it('are named cation first', () => {
    expect(ionicName(cation('copper(II)'), anion('nitrate'))).toBe('copper(II) nitrate');
  });
});

describe('molecular compounds', () => {
  it('are named with prefixes, with no mono on the first element', () => {
    expect(molecularNames('C', 1, 'O', 1).name).toBe('carbon monoxide');
    expect(molecularNames('C', 1, 'O', 2).name).toBe('carbon dioxide');
    expect(molecularNames('N', 2, 'O', 4)).toEqual({ name: 'dinitrogen tetraoxide', also: ['dinitrogen tetroxide'] });
    expect(molecularNames('P', 4, 'O', 10)).toEqual({ name: 'tetraphosphorus decaoxide', also: ['tetraphosphorus decoxide'] });
    expect(molecularNames('S', 1, 'F', 6).name).toBe('sulfur hexafluoride');
  });

  it('known by common names, and acids, are real formulas', () => {
    for (const c of COMMON_NAMES) expect(molarMass(c.formula), c.name).toBeGreaterThan(0);
    for (const a of ACIDS) expect(parseFormula(a.formula).charge, a.classical).toBe(0);
    expect(balance(['CH4', 'O2'], ['CO2', 'H2O'])).toEqual([1, 2, 1, 2]);
  });
});
