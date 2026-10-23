import { describe, expect, it } from 'vitest';
import { gradePart } from './grade.ts';
import { answerMarkdown, canonicalResponse } from './answers.ts';
import { parseExpr, toLatex, evaluate } from './math/expr.ts';
import { applyObservation, emptySkillState } from './mastery.ts';

const expr = (expected: string, form: any, r: string) => gradePart({ kind: 'expression', expected, form }, r);

describe('parser', () => {
  it('parses implicit multiplication and radicals', () => {
    expect(evaluate(parseExpr('2x(x+1)'), { x: 3 })).toBe(24);
    expect(evaluate(parseExpr('3√12'))).toBeCloseTo(3 * Math.sqrt(12));
    expect(evaluate(parseExpr('(-8)^(1/3)'))).toBeCloseTo(-2);
    expect(evaluate(parseExpr('root(4, 81)'))).toBeCloseTo(3);
    expect(evaluate(parseExpr('x²−2x'), { x: 5 })).toBe(15);
    expect(evaluate(parseExpr('2^-3'))).toBe(0.125);
    expect(evaluate(parseExpr('-3^2'))).toBe(-9);
    expect(toLatex(parseExpr('2x^2-3x+1'))).toBe('2{x}^{2} - 3x + 1');
  });
  it('rejects junk', () => {
    expect(() => parseExpr('2 3')).toThrow();
    expect(() => parseExpr('(x+1')).toThrow();
    expect(() => parseExpr('x+')).toThrow();
    expect(() => parseExpr('sin')).toThrow();
    expect(() => parseExpr('ln(2, 3)')).toThrow();
  });
  it('reads trigonometric, log and exponential functions and the constant e', () => {
    const at = (src: string, x: number) => evaluate(parseExpr(src), { x });
    expect(at('sin^2 x + cos^2 x', 0.7)).toBeCloseTo(1);
    expect(at('sin 2x', 0.3)).toBeCloseTo(Math.sin(0.6));
    expect(at('2sinx cosx', 0.3)).toBeCloseTo(Math.sin(0.6));
    expect(at('sin x^2', 1.2)).toBeCloseTo(Math.sin(1.44));
    expect(at('2sin 3(x - pi/6) + 1', 1)).toBeCloseTo(2 * Math.sin(3 * (1 - Math.PI / 6)) + 1);
    expect(at('2sin(x)(x + 1)', 1)).toBeCloseTo(2 * Math.sin(1) * 2);
    expect(at('tan(x)sec^2(x)', 0.4)).toBeCloseTo(Math.tan(0.4) / Math.cos(0.4) ** 2);
    expect(at('3e^(2x)', 0.5)).toBeCloseTo(3 * Math.E);
    expect(at('2e', 0)).toBeCloseTo(2 * Math.E);
    expect(at('xe^x', 1)).toBeCloseTo(Math.E);
    expect(at('exp(x)ln x', 2)).toBeCloseTo(Math.exp(2) * Math.log(2));
    expect(evaluate(parseExpr('log(1000)'))).toBeCloseTo(3);
    expect(evaluate(parseExpr('ln(e^2)'))).toBeCloseTo(2);
    expect(Number.isNaN(at('ln x', -1))).toBe(true);
    expect(toLatex(parseExpr('sin(x)'))).toBe('\\sin\\left(x\\right)');
    expect(toLatex(parseExpr('e^x'))).toBe('{e}^{x}');
    expect(at('|x - 3|', 1)).toBe(2);
    expect(at('2|x||x - 5|', 1)).toBe(8);
    expect(at('abs(x) + |2x|', -1)).toBe(3);
    expect(() => parseExpr('|x - 3')).toThrow();
    expect(() => parseExpr('||')).toThrow();
  });
  it('rejects typed function calls where a value must be worked out', () => {
    expect(gradePart({ kind: 'numeric', value: Math.sin((5 * Math.PI) / 12) }, 'sin(5pi/12)').invalid).toBe(true);
    expect(gradePart({ kind: 'numeric', value: Math.sin((5 * Math.PI) / 12) }, '(sqrt(6) + sqrt(2))/4').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: Math.log(5) / 2, allowFunctions: true }, 'ln(5)/2').correct).toBe(true);
    expect(gradePart({ kind: 'numbers', values: [Math.PI / 6, (5 * Math.PI) / 6] }, 'pi/6, 5pi/6').correct).toBe(true);
    expect(gradePart({ kind: 'numbers', values: [Math.PI / 6] }, 'asin(0.5)').correct).toBe(false);
  });
  it('checks that a trigonometric expression is simplified to one function', () => {
    const one = { kind: 'expression' as const, expected: 'sec(x)', form: 'single-function' as const };
    expect(gradePart(one, 'sec x').correct).toBe(true);
    expect(gradePart(one, '1/cos(x)').correct).toBe(false);
    expect(gradePart({ ...one, expected: '2cos^2(x)' }, '2cos^2 x').correct).toBe(true);
    expect(gradePart({ ...one, expected: '1' }, 'sin^2 x + cos^2 x').correct).toBe(false);
  });
  it('reads a variable typed in the other case as the question variable', () => {
    expect(gradePart({ kind: 'expression', expected: '1.8C + 32' }, '1.8c + 32').correct).toBe(true);
    expect(gradePart({ kind: 'expression', expected: 'x + X' }, 'x + x').correct).toBe(false);
  });
  it('grades calculus-style answers by equivalence', () => {
    const d = (expected: string) => ({ kind: 'expression' as const, expected });
    expect(gradePart(d('2sin(x)cos(x)'), 'sin(2x)').correct).toBe(true);
    expect(gradePart(d('e^x(x + 1)'), 'xe^x + e^x').correct).toBe(true);
    expect(gradePart(d('1/x'), 'x^-1').correct).toBe(true);
    expect(gradePart(d('sec^2(x)'), '1 + tan^2 x').correct).toBe(true);
    expect(gradePart(d('cos(x)'), 'sin(x)').correct).toBe(false);
  });
});

describe('numeric', () => {
  it('checks the form of a fraction when the question asks for one', () => {
    const lowest = (value: number, r: string) => gradePart({ kind: 'numeric', value, fraction: 'lowest' }, r);
    expect(lowest(0.75, '3/4').correct).toBe(true);
    expect(lowest(0.75, '6/8')).toMatchObject({ correct: false, message: 'Write the fraction in lowest terms.' });
    expect(lowest(0.75, '0.75').message).toBe('Write your answer as a fraction in lowest terms.');
    expect(lowest(1.75, '7/4').correct).toBe(true);
    expect(lowest(1.75, '1 3/4').correct).toBe(true);
    expect(lowest(-2 / 3, '-2/3').correct).toBe(true);
    expect(lowest(2, '2').correct).toBe(true);
    expect(lowest(2, '8/4').message).toBe('Simplify: this fraction is a whole number.');
    expect(lowest(0.75, '2/3').correct).toBe(false);
    const mixed = (value: number, r: string) => gradePart({ kind: 'numeric', value, fraction: 'mixed' }, r);
    expect(mixed(1.75, '1 3/4').correct).toBe(true);
    expect(mixed(1.75, '7/4').message).toBe('Write your answer as a mixed number.');
    expect(mixed(1.75, '1 6/8').message).toBe('Write the fraction in lowest terms.');
    expect(mixed(2.5, '1 6/4').message).toBe('In a mixed number, the fraction part must be less than 1.');
    expect(mixed(-1.5, '-1 1/2').correct).toBe(true);
    expect(mixed(0.4, '2/5').correct).toBe(true);
  });
  it('asks for a decimal when the question does', () => {
    const dec = (value: number, r: string, decimals?: number) => gradePart({ kind: 'numeric', value, asDecimal: true, decimals }, r);
    expect(dec(0.375, '0.375').correct).toBe(true);
    expect(dec(0.375, '3/8')).toMatchObject({ correct: false, message: 'Write your answer as a decimal.' });
    expect(dec(5 / 11, '0.455', 3).correct).toBe(true);
    expect(dec(0.375, '0.38').correct).toBe(false);
  });
  it('accepts fractions, mixed numbers and rounding', () => {
    for (const r of ['250 000', '250,000', '250000']) expect(gradePart({ kind: 'numeric', value: 250000 }, r).correct, r).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 1250000.5 }, '1 250 000.5').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 0.75 }, '3/4').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 1.5 }, '1 1/2').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 12.3456, decimals: 1 }, '12.3').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 12.3456, decimals: 1 }, '12.5').correct).toBe(false);
    expect(gradePart({ kind: 'numeric', value: 12.3456, decimals: 1 }, '12.3 cm').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 2 * Math.sqrt(5) }, '2sqrt(5)').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 1234 }, '1,234').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 0, undefinedValue: true }, 'undefined').correct).toBe(true);
  });
  it('accepts money, mass, capacity, temperature, percent and time units', () => {
    const money = { kind: 'numeric' as const, value: 1250.5, decimals: 2 };
    expect(gradePart(money, '$1,250.50').correct).toBe(true);
    expect(gradePart(money, '1250.50 dollars').correct).toBe(true);
    for (const [value, typed] of [[12, '12 kg'], [250, '250 mL'], [3.5, '3.5 L'], [16, '16 oz'], [2, '2 lb'], [98.6, '98.6 °F'], [37, '37°C'], [15, '15%'], [7.5, '7.5 h'], [4, '4 gal']] as const) {
      expect(gradePart({ kind: 'numeric', value }, typed).correct, typed).toBe(true);
    }
    expect(gradePart({ kind: 'numeric', value: 12 }, '13 kg').correct).toBe(false);
    expect(gradePart({ kind: 'numeric', value: 48 }, '48 tiles').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 3 }, '3 cans of paint').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 3 * Math.PI }, '3 pi').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 2 * Math.sqrt(5) }, '2 sqrt(5)').correct).toBe(true);
  });
  it('accepts minutes, rates and negative temperatures', () => {
    for (const [value, typed] of [[45, '45 min'], [45, '45 minutes'], [90, '90 km/h'], [60, '60 mph'], [2.5, '$2.50/kg'], [18, '18/h'], [-12, '−12°C'], [-5, '-5 °C'], [7.8, '7.8 L/100 km']] as const) {
      expect(gradePart({ kind: 'numeric', value }, typed).correct, typed).toBe(true);
    }
    expect(gradePart({ kind: 'numeric', value: 1 / Math.PI }, '1/pi').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 45 }, '45 m').correct).toBe(true);
  });
  it('accepts the units of chemistry answers', () => {
    for (const [value, typed] of [[245, '245 kPa'], [245, '245kPa'], [1.25, '1.25 atm'], [760, '760 mm Hg'], [760, '760mmHg'], [298, '298 K'], [298, '298K'], [0.25, '0.25 mol'], [0.25, '0.25 mol/L'], [32, '32.0 g/mol']] as const) {
      expect(gradePart({ kind: 'numeric', value, decimals: 1 }, typed).correct, typed).toBe(true);
    }
    expect(gradePart({ kind: 'numeric', value: 245, decimals: 0 }, '254 kPa').correct).toBe(false);
  });
});

describe('lists of numbers', () => {
  const roots = { kind: 'numbers' as const, values: [2, -3] };
  it('accepts the answers in any order and common ways of writing them', () => {
    for (const r of ['2, -3', '-3, 2', 'x = 2 or x = -3', '−3 and 2', '2; -3']) expect(gradePart(roots, r).correct, r).toBe(true);
    expect(gradePart({ kind: 'numbers', values: [0.5, -4 / 3] }, '1/2, -4/3').correct).toBe(true);
    expect(gradePart({ kind: 'numbers', values: [1.4142, -1.4142], decimals: 2 }, '1.41, -1.41').correct).toBe(true);
    for (const r of ['θ = 30°, θ = 150°', '30°, 150°', 'theta = 30 or theta = 150']) expect(gradePart({ kind: 'numbers', values: [30, 150] }, r).correct, r).toBe(true);
  });
  it('explains a missing or extra answer', () => {
    expect(gradePart(roots, '2').message).toMatch(/one more answer/);
    expect(gradePart(roots, '2, -3, 5').message).toMatch(/does not work/);
    expect(gradePart(roots, '2, 3').correct).toBe(false);
    expect(gradePart(roots, '2, 2').correct).toBe(false);
    expect(gradePart({ kind: 'numbers', values: [3] }, '3, 3').correct).toBe(true);
  });
  it('handles no solution', () => {
    expect(gradePart({ kind: 'numbers', values: [] }, 'no solution').correct).toBe(true);
    expect(gradePart({ kind: 'numbers', values: [] }, '3').correct).toBe(false);
    expect(gradePart(roots, 'none').correct).toBe(false);
  });
});

describe('expression forms', () => {
  it('accepts a rule typed with its output letter', () => {
    expect(expr('3n+4', 'any', 'y = 3n + 4').correct).toBe(true);
    expect(expr('40h+50', 'any', 'C=50+40h').correct).toBe(true);
    expect(expr('3n+4', 'any', 'y = 3n + 5').correct).toBe(false);
    expect(expr('3n+4', 'any', 'n = 3n + 4').correct).toBe(false);
  });
  it('expanded', () => {
    expect(expr('2x^2+7x+3', 'expanded', '2x^2 + 7x + 3').correct).toBe(true);
    expect(expr('2x^2+7x+3', 'expanded', '(2x+1)(x+3)').correct).toBe(false);
    expect(expr('2x^2+7x+3', 'expanded', '2x^2 + 6x + x + 3').message).toMatch(/like terms/);
    expect(expr('2x^2+7x+3', 'expanded', '3 + 7x + 2x^2').correct).toBe(true);
  });
  it('factored', () => {
    expect(expr('x^2+5x+6', 'factored', '(x+2)(x+3)').correct).toBe(true);
    expect(expr('x^2+5x+6', 'factored', '(x+3)(x+2)').correct).toBe(true);
    expect(expr('x^2+5x+6', 'factored', 'x^2+5x+6').correct).toBe(false);
    expect(expr('2x^2+10x+12', 'factored', '2(x+2)(x+3)').correct).toBe(true);
    expect(expr('2x^2+10x+12', 'factored', '(2x+4)(x+3)').correct).toBe(false);
    expect(expr('2x^2+10x+12', 'factored', '2(x^2+5x+6)').correct).toBe(false);
    expect(expr('2x^2+10x+12', 'gcf', '2(x^2+5x+6)').correct).toBe(true);
    expect(expr('x^4-16', 'factored', '(x^2+4)(x-2)(x+2)').correct).toBe(true);
    expect(expr('x^4-16', 'factored', '(x^2+4)(x^2-4)').correct).toBe(false);
    expect(expr('4x^2-9y^2', 'factored', '(2x-3y)(2x+3y)').correct).toBe(true);
    expect(expr('x^2-6x+9', 'factored', '(x-3)^2').correct).toBe(true);
    expect(expr('6x^2+7x-3', 'factored', '(3x-1)(2x+3)').correct).toBe(true);
    expect(expr('3x^2+6x', 'gcf', '3x(x+2)').correct).toBe(true);
    expect(expr('3x^2+6x', 'gcf', '3(x^2+2x)').correct).toBe(false);
  });
  it('radicals', () => {
    expect(expr('6sqrt(2)', 'simplified-radical', '6√2').correct).toBe(true);
    expect(expr('6sqrt(2)', 'simplified-radical', '3√8').correct).toBe(false);
    expect(expr('6sqrt(2)', 'simplified-radical', 'sqrt(72)').correct).toBe(false);
    expect(gradePart({ kind: 'expression', expected: '3cbrt(2)', form: 'simplified-radical', radicalIndex: 3 }, '3∛2').correct).toBe(true);
  });
  it('exponents', () => {
    expect(expr('x^5/(2y^3)', 'positive-exponents', 'x^5/(2y^3)').correct).toBe(true);
    expect(expr('x^5/(2y^3)', 'positive-exponents', '0.5x^5y^-3').correct).toBe(false);
  });
  it('prime factorization', () => {
    expect(expr('360', 'prime-factorization', '2^3*3^2*5').correct).toBe(true);
    expect(expr('360', 'prime-factorization', '8*45').correct).toBe(false);
  });
});

describe('lines', () => {
  const line = { A: 2, B: -1, C: 3 }; // y = 2x + 3
  it('accepts forms', () => {
    expect(gradePart({ kind: 'line', line, form: 'slope-intercept' }, 'y = 2x + 3').correct).toBe(true);
    expect(gradePart({ kind: 'line', line, form: 'slope-intercept' }, '2x - y + 3 = 0').correct).toBe(false);
    expect(gradePart({ kind: 'line', line, form: 'general' }, '2x - y + 3 = 0').correct).toBe(true);
    expect(gradePart({ kind: 'line', line, form: 'general' }, '-2x + y - 3 = 0').correct).toBe(false);
    expect(gradePart({ kind: 'line', line, form: 'slope-point' }, 'y - 5 = 2(x - 1)').correct).toBe(true);
    expect(gradePart({ kind: 'line', line, form: 'slope-point' }, 'y = 2x + 3').correct).toBe(false);
    expect(gradePart({ kind: 'line', line, form: 'any' }, 'y - 5 = 2(x - 1)').correct).toBe(true);
    expect(gradePart({ kind: 'line', line, form: 'any' }, 'y = 3x + 3').correct).toBe(false);
  });
  it('graphs', () => {
    expect(gradePart({ kind: 'graph-line', line, grid: { xMin: -5, xMax: 5, yMin: -5, yMax: 5 } }, '[[0,3],[1,5]]').correct).toBe(true);
    expect(gradePart({ kind: 'point', x: 2, y: -3 }, '(2, -3)').correct).toBe(true);
    expect(gradePart({ kind: 'point', x: 2, y: -3 }, '(-3, 2)').message).toMatch(/order/);
  });
});

describe('mastery', () => {
  it('needs several sessions for mastery', () => {
    let s = emptySkillState('k');
    for (let i = 0; i < 8; i++) s = applyObservation(s, { correct: true, sessionId: 'a', at: new Date().toISOString() });
    expect(s.level).toBe('proficient');
    s = applyObservation(s, { correct: true, sessionId: 'b', at: new Date().toISOString() });
    expect(s.level).toBe('mastered');
  });
});

describe('chemistry answers', () => {
  const formula = (expected: string, typed: string) => gradePart({ kind: 'formula', expected }, typed);
  const coefficients = (typed: string) => gradePart({ kind: 'coefficients', reactants: ['H2', 'O2'], products: ['H2O'] }, typed);

  it('grades a formula by its atoms and charge, however the charge is written', () => {
    expect(formula('Na2SO4', 'Na2SO4').correct).toBe(true);
    expect(formula('Na2SO4', 'Na₂SO₄').correct).toBe(true);
    expect(formula('SO4^2-', 'SO42-').correct).toBe(true);
    expect(formula('SO4^2-', 'SO4 2-').correct).toBe(true);
    expect(formula('Fe^3+', 'Fe3+').correct).toBe(true);
    expect(formula('NH4+', 'NH4+').correct).toBe(true);
    expect(formula('Fe2(SO4)3', 'Fe2(SO4)3').correct).toBe(true);
    expect(formula('Na2SO4', 'NaSO4').correct).toBe(false);
  });

  it('says what is wrong with a formula', () => {
    expect(formula('SO4^2-', 'SO4')).toMatchObject({ correct: false, message: expect.stringMatching(/ion: write its charge/) });
    expect(formula('SO4^2-', 'SO4^-')).toMatchObject({ correct: false, message: expect.stringMatching(/check the charge/) });
    expect(formula('NaCl', 'nacl')).toMatchObject({ invalid: true, message: expect.stringMatching(/capital letter/) });
    expect(formula('NaCl', '')).toMatchObject({ invalid: true });
  });

  it('grades coefficients that balance in lowest whole numbers, an empty box being 1', () => {
    expect(coefficients('2,1,2').correct).toBe(true);
    expect(coefficients('2,,2').correct).toBe(true);
    expect(coefficients('4,2,4')).toMatchObject({ correct: false, message: expect.stringMatching(/lowest whole numbers/) });
    expect(coefficients('1,1,1')).toMatchObject({ correct: false, message: expect.stringMatching(/count the O atoms/) });
    expect(coefficients('2,0,2')).toMatchObject({ invalid: true });
    expect(coefficients(',,')).toMatchObject({ invalid: true });
  });

  it('shows the answers', () => {
    expect(canonicalResponse({ kind: 'coefficients', reactants: ['C3H8', 'O2'], products: ['CO2', 'H2O'] })).toBe('1,5,3,4');
    expect(answerMarkdown({ kind: 'coefficients', reactants: ['C3H8', 'O2'], products: ['CO2', 'H2O'] })).toBe('$\\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}$');
    expect(answerMarkdown({ kind: 'formula', expected: 'CuSO4.5H2O' })).toBe('$\\ce{CuSO4*5H2O}$');
  });
});
