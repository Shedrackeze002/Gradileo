import { describe, expect, it } from 'vitest';
import { balance, parseFormula } from './formula.ts';
import { canonical, condensed, depictions, familyOf, hydrocarbonIsomers, isProper, molecularFormula, nameOf, numbered, sameCompound, type Skeleton } from './organic.ts';

const name = (sk: Skeleton) => nameOf(sk).name;
const accepts = (sk: Skeleton, typed: string) => nameOf(sk).accepted.includes(typed.toLowerCase());

describe('naming hydrocarbons', () => {
  it('names straight-chain and branched alkanes', () => {
    expect(name({ chain: 1 })).toBe('methane');
    expect(name({ chain: 6 })).toBe('hexane');
    expect(name({ chain: 4, subs: [{ at: 2, prefix: 'methyl' }] })).toBe('2-methylbutane');
    expect(name({ chain: 3, subs: [{ at: 2, prefix: 'methyl' }, { at: 2, prefix: 'methyl' }] })).toBe('2,2-dimethylpropane');
    expect(name({ chain: 6, subs: [{ at: 2, prefix: 'methyl' }, { at: 3, prefix: 'ethyl' }] })).toBe('3-ethyl-2-methylhexane');
    expect(name({ chain: 5, subs: [{ at: 3, prefix: 'ethyl' }] })).toBe('3-ethylpentane');
  });

  it('numbers from the end that gives the lowest locants, then alphabetically', () => {
    expect(name({ chain: 4, subs: [{ at: 3, prefix: 'methyl' }] })).toBe('2-methylbutane');
    expect(name({ chain: 6, subs: [{ at: 4, prefix: 'methyl' }, { at: 5, prefix: 'methyl' }] })).toBe('2,3-dimethylhexane');
    expect(name({ chain: 7, subs: [{ at: 5, prefix: 'ethyl' }, { at: 3, prefix: 'methyl' }] })).toBe('3-ethyl-5-methylheptane');
    expect(name({ chain: 4, subs: [{ at: 2, prefix: 'chloro' }, { at: 3, prefix: 'bromo' }] })).toBe('2-bromo-3-chlorobutane');
  });

  it('names a chain drawn bent by its longest chain', () => {
    // CH3-CH(CH2CH3)-CH3 is 2-methylbutane; CH3-CH(CH2CH3)-CH2-CH3 is 3-methylpentane.
    expect(isProper({ chain: 3, subs: [{ at: 2, prefix: 'ethyl' }] })).toBe(false);
    expect(name({ chain: 3, subs: [{ at: 2, prefix: 'ethyl' }] })).toBe('2-methylbutane');
    expect(name({ chain: 4, subs: [{ at: 2, prefix: 'ethyl' }] })).toBe('3-methylpentane');
    expect(name({ chain: 4, subs: [{ at: 1, prefix: 'methyl' }] })).toBe('pentane');
    expect(canonical({ chain: 4, subs: [{ at: 2, prefix: 'ethyl' }] })?.chain).toBe(5);
  });

  it('names alkenes and alkynes in both styles, the multiple bond from the nearer end', () => {
    const but2ene: Skeleton = { chain: 4, bond: { at: 2, order: 2 } };
    expect(name(but2ene)).toBe('but-2-ene');
    expect(accepts(but2ene, '2-butene')).toBe(true);
    expect(accepts(but2ene, 'butene')).toBe(false);
    expect(name({ chain: 4, bond: { at: 3, order: 2 } })).toBe('but-1-ene');
    expect(name({ chain: 2, bond: { at: 1, order: 2 } })).toBe('ethene');
    expect(name({ chain: 3, bond: { at: 2, order: 3 } })).toBe('propyne');
    expect(name({ chain: 5, bond: { at: 2, order: 3 }, subs: [{ at: 4, prefix: 'methyl' }] })).toBe('4-methylpent-2-yne');
    const methylbutene: Skeleton = { chain: 4, bond: { at: 2, order: 2 }, subs: [{ at: 2, prefix: 'methyl' }] };
    expect(name(methylbutene)).toBe('2-methylbut-2-ene');
    expect(accepts(methylbutene, '2-methyl-2-butene')).toBe(true);
    expect(accepts({ chain: 3, bond: { at: 1, order: 2 }, subs: [{ at: 2, prefix: 'methyl' }] }, 'methylpropene')).toBe(true);
  });

  it('accepts locants left out only when the name is still clear', () => {
    expect(accepts({ chain: 3, subs: [{ at: 2, prefix: 'methyl' }, { at: 2, prefix: 'methyl' }] }, 'dimethylpropane')).toBe(true);
    expect(accepts({ chain: 3, subs: [{ at: 2, prefix: 'methyl' }, { at: 2, prefix: 'methyl' }] }, '2, 2-dimethylpropane')).toBe(true);
    expect(accepts({ chain: 3, subs: [{ at: 1, prefix: 'chloro' }] }, 'chloropropane')).toBe(false);
    expect(accepts({ chain: 3, group: { kind: 'alcohol', at: 1 } }, 'propanol')).toBe(false);
  });
});

describe('naming compounds with functional groups', () => {
  it('names alcohols, haloalkanes, acids, esters and the other families', () => {
    const propanol: Skeleton = { chain: 3, group: { kind: 'alcohol', at: 1 } };
    expect(name(propanol)).toBe('propan-1-ol');
    expect(accepts(propanol, '1-propanol')).toBe(true);
    expect(name({ chain: 3, group: { kind: 'alcohol', at: 3 } })).toBe('propan-1-ol');
    expect(name({ chain: 2, group: { kind: 'alcohol', at: 1 } })).toBe('ethanol');
    expect(name({ chain: 3, subs: [{ at: 2, prefix: 'methyl' }], group: { kind: 'alcohol', at: 2 } })).toBe('2-methylpropan-2-ol');
    expect(name({ chain: 2, group: { kind: 'acid' } })).toBe('ethanoic acid');
    expect(name({ chain: 4, subs: [{ at: 2, prefix: 'methyl' }], group: { kind: 'acid' } })).toBe('2-methylbutanoic acid');
    expect(name({ chain: 2, group: { kind: 'ester', alkyl: 1 } })).toBe('methyl ethanoate');
    expect(name({ chain: 3, group: { kind: 'ester', alkyl: 2 } })).toBe('ethyl propanoate');
    expect(name({ chain: 2, subs: [{ at: 1, prefix: 'chloro' }] })).toBe('chloroethane');
    expect(name({ chain: 2, subs: [{ at: 1, prefix: 'bromo' }, { at: 2, prefix: 'bromo' }] })).toBe('1,2-dibromoethane');
    expect(name({ chain: 1, subs: [{ at: 1, prefix: 'chloro' }, { at: 1, prefix: 'chloro' }] })).toBe('dichloromethane');
    expect(name({ chain: 3, group: { kind: 'aldehyde' } })).toBe('propanal');
    expect(name({ chain: 3, group: { kind: 'ketone', at: 2 } })).toBe('propanone');
    expect(name({ chain: 5, group: { kind: 'ketone', at: 4 } })).toBe('pentan-2-one');
    expect(name({ chain: 2, subs: [{ at: 1, prefix: 'methoxy' }] })).toBe('methoxyethane');
    expect(name({ chain: 2, group: { kind: 'amine', at: 2 } })).toBe('ethanamine');
  });

  it('gives each compound its family', () => {
    expect(familyOf({ chain: 3, group: { kind: 'alcohol', at: 1 } })).toBe('alcohol');
    expect(familyOf({ chain: 2, group: { kind: 'ester', alkyl: 1 } })).toBe('ester');
    expect(familyOf({ chain: 2, subs: [{ at: 1, prefix: 'methoxy' }] })).toBe('ether');
    expect(familyOf({ chain: 2, subs: [{ at: 1, prefix: 'iodo' }] })).toBe('haloalkane');
    expect(familyOf({ chain: 4, bond: { at: 1, order: 3 } })).toBe('alkyne');
  });
});

describe('formulas', () => {
  it('writes condensed formulas from carbon 1, with an end group at the right', () => {
    expect(condensed({ chain: 4, subs: [{ at: 3, prefix: 'methyl' }] })).toBe('CH3-CH(CH3)-CH2-CH3');
    expect(condensed({ chain: 3, subs: [{ at: 2, prefix: 'methyl' }, { at: 2, prefix: 'methyl' }] })).toBe('CH3-C(CH3)2-CH3');
    expect(condensed({ chain: 4, bond: { at: 2, order: 2 } })).toBe('CH3-CH=CH-CH3');
    expect(condensed({ chain: 3, bond: { at: 1, order: 3 } })).toBe('CH#C-CH3');
    expect(condensed({ chain: 3, group: { kind: 'alcohol', at: 1 } })).toBe('CH3-CH2-CH2-OH');
    expect(condensed({ chain: 3, group: { kind: 'alcohol', at: 2 } })).toBe('CH3-CH(OH)-CH3');
    expect(condensed({ chain: 2, group: { kind: 'acid' } })).toBe('CH3-COOH');
    expect(condensed({ chain: 2, group: { kind: 'ester', alkyl: 1 } })).toBe('CH3-COO-CH3');
    expect(condensed({ chain: 2, group: { kind: 'ester', alkyl: 1 } }, { reverse: true })).toBe('CH3-OOC-CH3');
    expect(condensed({ chain: 1, group: { kind: 'acid' } })).toBe('HCOOH');
    expect(condensed({ chain: 3, group: { kind: 'ketone', at: 2 } })).toBe('CH3-CO-CH3');
    expect(condensed({ chain: 2, subs: [{ at: 1, prefix: 'bromo' }, { at: 2, prefix: 'bromo' }] })).toBe('CH2Br-CH2Br');
    expect(condensed({ chain: 3, subs: [{ at: 1, prefix: 'bromo' }] })).toBe('CH3-CH2-CH2Br');
    expect(condensed({ chain: 2, subs: [{ at: 1, prefix: 'methoxy' }] })).toBe('CH3-O-CH2-CH3');
  });

  it('counts the atoms of the molecular formula, in Hill order', () => {
    expect(molecularFormula({ chain: 6, subs: [{ at: 2, prefix: 'methyl' }, { at: 3, prefix: 'ethyl' }] })).toBe('C9H20');
    expect(molecularFormula({ chain: 4, bond: { at: 2, order: 2 } })).toBe('C4H8');
    expect(molecularFormula({ chain: 5, bond: { at: 1, order: 3 } })).toBe('C5H8');
    expect(molecularFormula({ chain: 3, group: { kind: 'alcohol', at: 1 } })).toBe('C3H8O');
    expect(molecularFormula({ chain: 2, group: { kind: 'acid' } })).toBe('C2H4O2');
    expect(molecularFormula({ chain: 2, group: { kind: 'ester', alkyl: 1 } })).toBe('C3H6O2');
    // No hydrogens left: tetrachloromethane is CCl4, not CHCl4.
    expect(molecularFormula({ chain: 1, subs: [1, 1, 1, 1].map((at) => ({ at, prefix: 'chloro' as const })) })).toBe('CCl4');
    expect(molecularFormula({ chain: 2, subs: [{ at: 1, prefix: 'bromo' }, { at: 2, prefix: 'bromo' }] })).toBe('C2H4Br2');
    expect(molecularFormula({ chain: 2, group: { kind: 'amine', at: 1 } })).toBe('C2H7N');
  });

  it('agrees with the general formulas of hydrocarbons, and burns to a balanced equation', () => {
    for (let n = 1; n <= 10; n++) expect(molecularFormula({ chain: n })).toBe(`C${n > 1 ? n : ''}H${2 * n + 2}`);
    for (let n = 2; n <= 10; n++) expect(molecularFormula({ chain: n, bond: { at: 1, order: 2 } })).toBe(`C${n}H${2 * n}`);
    for (let n = 2; n <= 10; n++) expect(molecularFormula({ chain: n, bond: { at: 1, order: 3 } })).toBe(`C${n}H${2 * n - 2}`);
    expect(balance([molecularFormula({ chain: 8 }), 'O2'], ['CO2', 'H2O'])).toEqual([2, 25, 16, 18]);
    // Every formula reads back with the formula engine.
    expect(Object.fromEntries(parseFormula(molecularFormula({ chain: 3, group: { kind: 'ester', alkyl: 2 } })).atoms)).toEqual({ C: 5, H: 10, O: 2 });
  });
});

describe('isomers and drawings', () => {
  it('finds the structural isomers of small alkanes, alkenes and alkynes', () => {
    expect([1, 2, 3, 4, 5, 6, 7, 8].map((n) => hydrocarbonIsomers(n).length)).toEqual([1, 1, 1, 2, 3, 5, 9, 18]);
    expect(hydrocarbonIsomers(5).map(name)).toEqual(['2-methylbutane', '2,2-dimethylpropane', 'pentane']);
    expect(hydrocarbonIsomers(4, 'alkene').map(name)).toEqual(['2-methylpropene', 'but-1-ene', 'but-2-ene']);
    expect(hydrocarbonIsomers(5, 'alkene').length).toBe(5);
    expect(hydrocarbonIsomers(5, 'alkyne').map(name)).toEqual(['3-methylbut-1-yne', 'pent-1-yne', 'pent-2-yne']);
  });

  it('draws one compound along each of its chains', () => {
    const sk: Skeleton = { chain: 5, subs: [{ at: 3, prefix: 'methyl' }] };
    const drawn = depictions(sk);
    expect(new Set(drawn.map((d) => condensed(d, { asWritten: true })))).toEqual(new Set(['CH3-CH2-CH(CH3)-CH2-CH3', 'CH3-CH2-CH(CH2CH3)-CH3']));
    for (const d of drawn) expect(sameCompound(d, sk)).toBe(true);
    expect(sameCompound({ chain: 4, subs: [{ at: 2, prefix: 'methyl' }] }, { chain: 5 })).toBe(false);
  });

  it('numbers a skeleton the IUPAC way', () => {
    expect(numbered({ chain: 5, group: { kind: 'alcohol', at: 4 } })).toEqual({ chain: 5, subs: [], group: { kind: 'alcohol', at: 2 } });
  });
});
