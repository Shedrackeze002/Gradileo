import { describe, expect, it } from 'vitest';
import { ELEMENTS, element } from './elements.ts';
import { balance, ce, FormulaError, isBalanced, molarMass, parseFormula, readFormula, sameFormula } from './formula.ts';

const atoms = (text: string) => Object.fromEntries(parseFormula(text).atoms);

describe('the elements', () => {
  it('runs from hydrogen to uranium in order, each symbol once', () => {
    expect(ELEMENTS[0]).toEqual({ z: 1, symbol: 'H', name: 'hydrogen', mass: 1.01 });
    expect(element('U')?.z).toBe(92);
    expect(new Set(ELEMENTS.map((e) => e.symbol)).size).toBe(ELEMENTS.length);
    expect(element('Cl')?.mass).toBe(35.45);
  });
});

describe('reading a formula', () => {
  it('counts atoms through brackets and hydrates', () => {
    expect(atoms('H2O')).toEqual({ H: 2, O: 1 });
    expect(atoms('Fe2(SO4)3')).toEqual({ Fe: 2, S: 3, O: 12 });
    expect(atoms('CuSO4.5H2O')).toEqual({ Cu: 1, S: 1, O: 9, H: 10 });
    expect(atoms('CuSO4·5H2O')).toEqual(atoms('CuSO4*5H2O'));
    expect(atoms('CH3COOH')).toEqual({ C: 2, H: 4, O: 2 });
    expect(atoms('K4[Fe(CN)6]')).toEqual({ K: 4, Fe: 1, C: 6, N: 6 });
  });

  it('reads charges after a caret, as a sign alone, or as superscripts', () => {
    expect(parseFormula('SO4^2-').charge).toBe(-2);
    expect(parseFormula('Fe^{3+}').charge).toBe(3);
    expect(parseFormula('NH4+').charge).toBe(1);
    expect(parseFormula('Cl-').charge).toBe(-1);
    expect(parseFormula('SO₄²⁻')).toEqual(parseFormula('SO4^2-'));
    expect(parseFormula('NaCl(aq)').charge).toBe(0);
  });

  it('explains what cannot be read', () => {
    expect(() => parseFormula('nacl')).toThrow(/capital letter/);
    expect(() => parseFormula('Xy2')).toThrow(/no element Xy/);
    expect(() => parseFormula('Fe2(SO4')).toThrow(FormulaError);
    expect(() => parseFormula('')).toThrow(FormulaError);
  });

  it('tries every reading of digits before a final sign in what a student types', () => {
    const is = (typed: string, expected: string) => readFormula(typed).some((f) => sameFormula(f, parseFormula(expected)));
    expect(is('SO42-', 'SO4^2-')).toBe(true);
    expect(is('Fe3+', 'Fe^3+')).toBe(true);
    expect(is('NH4+', 'NH4+')).toBe(true);
    expect(is('PO4 3-', 'PO4^3-')).toBe(true);
    expect(is('Cr2O72-', 'Cr2O7^2-')).toBe(true);
    expect(is('SO42-', 'SO4^-')).toBe(false);
    expect(is('SO4-', 'SO4^2-')).toBe(false);
    expect(is('Fe2+', 'Fe^3+')).toBe(false);
  });
});

describe('molar mass', () => {
  it('adds the elements’ masses, to two decimal places', () => {
    expect(molarMass('H2O')).toBe(18.02);
    expect(molarMass('NaCl')).toBe(58.44);
    expect(molarMass('CO2')).toBe(44.01);
    expect(molarMass('C6H12O6')).toBe(180.18);
    expect(molarMass('CuSO4.5H2O')).toBe(249.71);
  });

  it('is shown with mhchem', () => {
    expect(ce('CuSO4.5H2O')).toBe('\\ce{CuSO4*5H2O}');
  });
});

describe('balancing', () => {
  it('finds the smallest whole-number coefficients', () => {
    expect(balance(['H2', 'O2'], ['H2O'])).toEqual([2, 1, 2]);
    expect(balance(['C3H8', 'O2'], ['CO2', 'H2O'])).toEqual([1, 5, 3, 4]);
    expect(balance(['Al', 'O2'], ['Al2O3'])).toEqual([4, 3, 2]);
    expect(balance(['Fe^3+', 'Cu'], ['Fe^2+', 'Cu^2+'])).toEqual([2, 1, 2, 1]);
    expect(balance(['Ca(OH)2', 'H3PO4'], ['Ca3(PO4)2', 'H2O'])).toEqual([3, 2, 1, 6]);
  });

  it('gives up when there is no single answer', () => {
    expect(balance(['H2'], ['O2'])).toBeNull();
    expect(balance(['H2', 'O2'], ['H2O', 'H2O2'])).toBeNull();
  });

  it('checks coefficients', () => {
    expect(isBalanced(['H2', 'O2'], ['H2O'], [2, 1, 2])).toBe(true);
    expect(isBalanced(['H2', 'O2'], ['H2O'], [4, 2, 4])).toBe(true);
    expect(isBalanced(['H2', 'O2'], ['H2O'], [1, 1, 1])).toBe(false);
  });
});
