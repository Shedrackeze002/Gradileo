/**
 * Ions and the names of compounds, as the Chemistry 20 data tables give them: monatomic ions with
 * their charges (Roman numerals for metals with more than one), polyatomic ions, and the rules
 * that turn ions or atoms into formulas and names (IUPAC names, with the common names Gradileo
 * also accepts).
 */
export interface Ion {
  /** As a formula writes it, without the charge: Na, Fe, SO4, Hg2. */
  formula: string;
  charge: number;
  name: string;
  /** Polyatomic: wrapped in brackets when there is more than one in a formula. */
  poly?: boolean;
}

const ion = (formula: string, charge: number, name: string, poly = false): Ion => ({ formula, charge, name, ...(poly ? { poly } : {}) });

export const CATIONS: Ion[] = [
  ion('H', 1, 'hydrogen'),
  ion('Li', 1, 'lithium'),
  ion('Na', 1, 'sodium'),
  ion('K', 1, 'potassium'),
  ion('Rb', 1, 'rubidium'),
  ion('Cs', 1, 'caesium'),
  ion('Ag', 1, 'silver'),
  ion('Be', 2, 'beryllium'),
  ion('Mg', 2, 'magnesium'),
  ion('Ca', 2, 'calcium'),
  ion('Sr', 2, 'strontium'),
  ion('Ba', 2, 'barium'),
  ion('Zn', 2, 'zinc'),
  ion('Cd', 2, 'cadmium'),
  ion('Al', 3, 'aluminium'),
  ion('NH4', 1, 'ammonium', true),
  // Metals with more than one common charge are named with a Roman numeral.
  ion('Fe', 2, 'iron(II)'),
  ion('Fe', 3, 'iron(III)'),
  ion('Cu', 1, 'copper(I)'),
  ion('Cu', 2, 'copper(II)'),
  ion('Sn', 2, 'tin(II)'),
  ion('Sn', 4, 'tin(IV)'),
  ion('Pb', 2, 'lead(II)'),
  ion('Pb', 4, 'lead(IV)'),
  ion('Co', 2, 'cobalt(II)'),
  ion('Co', 3, 'cobalt(III)'),
  ion('Cr', 2, 'chromium(II)'),
  ion('Cr', 3, 'chromium(III)'),
  ion('Mn', 2, 'manganese(II)'),
  ion('Mn', 4, 'manganese(IV)'),
  ion('Ni', 2, 'nickel(II)'),
  ion('Ni', 3, 'nickel(III)'),
  ion('Hg2', 2, 'mercury(I)'),
  ion('Hg', 2, 'mercury(II)'),
  ion('Au', 1, 'gold(I)'),
  ion('Au', 3, 'gold(III)'),
];

export const ANIONS: Ion[] = [
  ion('F', -1, 'fluoride'),
  ion('Cl', -1, 'chloride'),
  ion('Br', -1, 'bromide'),
  ion('I', -1, 'iodide'),
  ion('O', -2, 'oxide'),
  ion('S', -2, 'sulfide'),
  ion('Se', -2, 'selenide'),
  ion('N', -3, 'nitride'),
  ion('P', -3, 'phosphide'),
  ion('H', -1, 'hydride'),
  ion('CH3COO', -1, 'acetate', true),
  ion('CO3', -2, 'carbonate', true),
  ion('HCO3', -1, 'hydrogen carbonate', true),
  ion('ClO4', -1, 'perchlorate', true),
  ion('ClO3', -1, 'chlorate', true),
  ion('ClO2', -1, 'chlorite', true),
  ion('ClO', -1, 'hypochlorite', true),
  ion('CrO4', -2, 'chromate', true),
  ion('Cr2O7', -2, 'dichromate', true),
  ion('CN', -1, 'cyanide', true),
  ion('OH', -1, 'hydroxide', true),
  ion('NO3', -1, 'nitrate', true),
  ion('NO2', -1, 'nitrite', true),
  ion('MnO4', -1, 'permanganate', true),
  ion('PO4', -3, 'phosphate', true),
  ion('HPO4', -2, 'hydrogen phosphate', true),
  ion('H2PO4', -1, 'dihydrogen phosphate', true),
  ion('SO4', -2, 'sulfate', true),
  ion('HSO4', -1, 'hydrogen sulfate', true),
  ion('SO3', -2, 'sulfite', true),
  ion('HSO3', -1, 'hydrogen sulfite', true),
  ion('S2O3', -2, 'thiosulfate', true),
  ion('C2O4', -2, 'oxalate', true),
  ion('SCN', -1, 'thiocyanate', true),
];

/** An ion's formula with its charge, as a question writes it: `SO4^2-`, `Na^+`, `Hg2^2+`. */
export function ionFormula(i: Ion): string {
  const n = Math.abs(i.charge);
  return `${i.formula}^${n === 1 ? '' : n}${i.charge > 0 ? '+' : '-'}`;
}

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

/** The formula of the compound two ions make: the charges cancel with the fewest ions. */
export function ionicFormula(cation: Ion, anion: Ion): string {
  const l = (cation.charge * -anion.charge) / gcd(cation.charge, -anion.charge);
  const part = (i: Ion, k: number) => (k === 1 ? i.formula : i.poly ? `(${i.formula})${k}` : `${i.formula}${k}`);
  return part(cation, l / cation.charge) + part(anion, l / -anion.charge);
}

export const ionicName = (cation: Ion, anion: Ion) => `${cation.name} ${anion.name}`;

// ---------------------------------------------------------------------------- molecular compounds

export const PREFIXES = ['', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa', 'nona', 'deca'];

/** The element names a molecular compound uses, first and second (-ide) element. */
const FIRST: Record<string, string> = { B: 'boron', C: 'carbon', N: 'nitrogen', P: 'phosphorus', S: 'sulfur', Se: 'selenium', Si: 'silicon', Cl: 'chlorine', Br: 'bromine', I: 'iodine', O: 'oxygen', Xe: 'xenon', As: 'arsenic', H: 'hydrogen' };
const SECOND: Record<string, string> = { O: 'oxide', S: 'sulfide', Se: 'selenide', N: 'nitride', P: 'phosphide', F: 'fluoride', Cl: 'chloride', Br: 'bromide', I: 'iodide', H: 'hydride' };

/**
 * The name of a binary molecular compound from its two elements and their counts: `N2O4` →
 * dinitrogen tetraoxide. The first element has no "mono"; "mono" + "oxide" is "monoxide". The
 * other spellings people use, such as "tetroxide", are in the second list.
 */
export function molecularNames(first: string, a: number, second: string, b: number): { name: string; also: string[] } {
  const one = (a === 1 ? '' : PREFIXES[a]) + FIRST[first];
  const pre = PREFIXES[b];
  const ide = SECOND[second];
  const joined = pre === 'mono' && ide.startsWith('o') ? 'monoxide' : pre + ide;
  const also: string[] = [];
  // Many books drop the a or o of the prefix before "oxide": pentoxide, tetroxide.
  if (ide === 'oxide' && /[ao]$/.test(pre) && pre !== 'mono') also.push(`${one} ${pre.slice(0, -1)}oxide`);
  if (pre === 'mono' && ide.startsWith('o')) also.push(`${one} monooxide`);
  return { name: `${one} ${joined}`, also };
}

/** Molecular compounds known by their common names in Chemistry 20. */
export const COMMON_NAMES: Array<{ formula: string; name: string }> = [
  { formula: 'H2O', name: 'water' },
  { formula: 'NH3', name: 'ammonia' },
  { formula: 'CH4', name: 'methane' },
  { formula: 'H2O2', name: 'hydrogen peroxide' },
  { formula: 'O3', name: 'ozone' },
  { formula: 'CH3OH', name: 'methanol' },
  { formula: 'C2H5OH', name: 'ethanol' },
  { formula: 'C3H8', name: 'propane' },
  { formula: 'C6H12O6', name: 'glucose' },
  { formula: 'C12H22O11', name: 'sucrose' },
];

// ---------------------------------------------------------------------------- acids

/** Acids in water: the IUPAC name ("aqueous hydrogen chloride") and the classical name. */
export const ACIDS: Array<{ formula: string; iupac: string; classical: string; strong?: boolean }> = [
  { formula: 'HCl', iupac: 'aqueous hydrogen chloride', classical: 'hydrochloric acid', strong: true },
  { formula: 'HBr', iupac: 'aqueous hydrogen bromide', classical: 'hydrobromic acid', strong: true },
  { formula: 'HI', iupac: 'aqueous hydrogen iodide', classical: 'hydroiodic acid', strong: true },
  { formula: 'HF', iupac: 'aqueous hydrogen fluoride', classical: 'hydrofluoric acid' },
  { formula: 'HNO3', iupac: 'aqueous hydrogen nitrate', classical: 'nitric acid', strong: true },
  { formula: 'HNO2', iupac: 'aqueous hydrogen nitrite', classical: 'nitrous acid' },
  { formula: 'H2SO4', iupac: 'aqueous hydrogen sulfate', classical: 'sulfuric acid', strong: true },
  { formula: 'H2SO3', iupac: 'aqueous hydrogen sulfite', classical: 'sulfurous acid' },
  { formula: 'H3PO4', iupac: 'aqueous hydrogen phosphate', classical: 'phosphoric acid' },
  { formula: 'H2CO3', iupac: 'aqueous hydrogen carbonate', classical: 'carbonic acid' },
  { formula: 'CH3COOH', iupac: 'aqueous hydrogen acetate', classical: 'acetic acid' },
  { formula: 'HClO4', iupac: 'aqueous hydrogen perchlorate', classical: 'perchloric acid', strong: true },
  { formula: 'HClO3', iupac: 'aqueous hydrogen chlorate', classical: 'chloric acid', strong: true },
  { formula: 'HClO', iupac: 'aqueous hydrogen hypochlorite', classical: 'hypochlorous acid' },
];

/**
 * The spellings a name can be typed in: a space before the Roman numeral's bracket or no brackets
 * at all, and the other spellings of aluminium, caesium, sulfur and acetate.
 */
export function nameVariants(name: string): string[] {
  const out = new Set([name]);
  for (const n of [...out]) {
    out.add(n.replace(/\(/g, ' ('));
    out.add(n.replace(/\(([IVX]+)\)/g, ' $1'));
  }
  const swaps: Array<[RegExp, string]> = [
    [/aluminium/g, 'aluminum'],
    [/caesium/g, 'cesium'],
    [/sulf/g, 'sulph'],
    [/acetate/g, 'ethanoate'],
    [/hydrogen carbonate/g, 'bicarbonate'],
  ];
  for (const [from, to] of swaps) for (const n of [...out]) if (from.test(n)) out.add(n.replace(from, to));
  return [...out];
}
