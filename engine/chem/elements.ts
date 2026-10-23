/**
 * The elements a chemistry question can use: symbol, name, atomic number and molar mass in g/mol
 * to two decimal places (standard atomic weights, as a data booklet gives them). Elements with no
 * stable isotope have the mass number of their longest-lived isotope.
 */
export interface Element {
  z: number;
  symbol: string;
  name: string;
  /** Molar mass in g/mol. */
  mass: number;
}

const DATA: Array<[string, string, number]> = [
  ['H', 'hydrogen', 1.01],
  ['He', 'helium', 4.0],
  ['Li', 'lithium', 6.94],
  ['Be', 'beryllium', 9.01],
  ['B', 'boron', 10.81],
  ['C', 'carbon', 12.01],
  ['N', 'nitrogen', 14.01],
  ['O', 'oxygen', 16.0],
  ['F', 'fluorine', 19.0],
  ['Ne', 'neon', 20.18],
  ['Na', 'sodium', 22.99],
  ['Mg', 'magnesium', 24.31],
  ['Al', 'aluminium', 26.98],
  ['Si', 'silicon', 28.09],
  ['P', 'phosphorus', 30.97],
  ['S', 'sulfur', 32.06],
  ['Cl', 'chlorine', 35.45],
  ['Ar', 'argon', 39.95],
  ['K', 'potassium', 39.1],
  ['Ca', 'calcium', 40.08],
  ['Sc', 'scandium', 44.96],
  ['Ti', 'titanium', 47.87],
  ['V', 'vanadium', 50.94],
  ['Cr', 'chromium', 52.0],
  ['Mn', 'manganese', 54.94],
  ['Fe', 'iron', 55.85],
  ['Co', 'cobalt', 58.93],
  ['Ni', 'nickel', 58.69],
  ['Cu', 'copper', 63.55],
  ['Zn', 'zinc', 65.38],
  ['Ga', 'gallium', 69.72],
  ['Ge', 'germanium', 72.63],
  ['As', 'arsenic', 74.92],
  ['Se', 'selenium', 78.97],
  ['Br', 'bromine', 79.9],
  ['Kr', 'krypton', 83.8],
  ['Rb', 'rubidium', 85.47],
  ['Sr', 'strontium', 87.62],
  ['Y', 'yttrium', 88.91],
  ['Zr', 'zirconium', 91.22],
  ['Nb', 'niobium', 92.91],
  ['Mo', 'molybdenum', 95.95],
  ['Tc', 'technetium', 98],
  ['Ru', 'ruthenium', 101.07],
  ['Rh', 'rhodium', 102.91],
  ['Pd', 'palladium', 106.42],
  ['Ag', 'silver', 107.87],
  ['Cd', 'cadmium', 112.41],
  ['In', 'indium', 114.82],
  ['Sn', 'tin', 118.71],
  ['Sb', 'antimony', 121.76],
  ['Te', 'tellurium', 127.6],
  ['I', 'iodine', 126.9],
  ['Xe', 'xenon', 131.29],
  ['Cs', 'caesium', 132.91],
  ['Ba', 'barium', 137.33],
  ['La', 'lanthanum', 138.91],
  ['Ce', 'cerium', 140.12],
  ['Pr', 'praseodymium', 140.91],
  ['Nd', 'neodymium', 144.24],
  ['Pm', 'promethium', 145],
  ['Sm', 'samarium', 150.36],
  ['Eu', 'europium', 151.96],
  ['Gd', 'gadolinium', 157.25],
  ['Tb', 'terbium', 158.93],
  ['Dy', 'dysprosium', 162.5],
  ['Ho', 'holmium', 164.93],
  ['Er', 'erbium', 167.26],
  ['Tm', 'thulium', 168.93],
  ['Yb', 'ytterbium', 173.05],
  ['Lu', 'lutetium', 174.97],
  ['Hf', 'hafnium', 178.49],
  ['Ta', 'tantalum', 180.95],
  ['W', 'tungsten', 183.84],
  ['Re', 'rhenium', 186.21],
  ['Os', 'osmium', 190.23],
  ['Ir', 'iridium', 192.22],
  ['Pt', 'platinum', 195.08],
  ['Au', 'gold', 196.97],
  ['Hg', 'mercury', 200.59],
  ['Tl', 'thallium', 204.38],
  ['Pb', 'lead', 207.2],
  ['Bi', 'bismuth', 208.98],
  ['Po', 'polonium', 209],
  ['At', 'astatine', 210],
  ['Rn', 'radon', 222],
  ['Fr', 'francium', 223],
  ['Ra', 'radium', 226],
  ['Ac', 'actinium', 227],
  ['Th', 'thorium', 232.04],
  ['Pa', 'protactinium', 231.04],
  ['U', 'uranium', 238.03],
];

export const ELEMENTS: Element[] = DATA.map(([symbol, name, mass], i) => ({ z: i + 1, symbol, name, mass }));

const BY_SYMBOL = new Map(ELEMENTS.map((e) => [e.symbol, e]));

export function element(symbol: string): Element | undefined {
  return BY_SYMBOL.get(symbol);
}

export function isElement(symbol: string): boolean {
  return BY_SYMBOL.has(symbol);
}

/**
 * Pauling electronegativities to one decimal place, as a chemistry data booklet gives them, for the
 * elements bonding questions use. Questions state the values they use.
 */
export const ELECTRONEGATIVITY: Record<string, number> = {
  H: 2.2, Li: 1.0, Be: 1.6, B: 2.0, C: 2.6, N: 3.0, O: 3.4, F: 4.0,
  Na: 0.9, Mg: 1.3, Al: 1.6, Si: 1.9, P: 2.2, S: 2.6, Cl: 3.2,
  K: 0.8, Ca: 1.0, Ga: 1.8, Ge: 2.0, As: 2.2, Se: 2.6, Br: 3.0,
  Rb: 0.8, Sr: 1.0, Sn: 2.0, Sb: 2.1, I: 2.7, Cs: 0.8, Ba: 0.9,
  Fe: 1.8, Cu: 1.9, Zn: 1.7, Ag: 1.9, Pb: 2.3,
};

/** Valence electrons of a main-group element (its group's last digit, helium 2), or undefined. */
export function valenceElectrons(symbol: string): number | undefined {
  return VALENCE[symbol];
}

const VALENCE: Record<string, number> = {
  H: 1, He: 2,
  Li: 1, Be: 2, B: 3, C: 4, N: 5, O: 6, F: 7, Ne: 8,
  Na: 1, Mg: 2, Al: 3, Si: 4, P: 5, S: 6, Cl: 7, Ar: 8,
  K: 1, Ca: 2, Ga: 3, Ge: 4, As: 5, Se: 6, Br: 7, Kr: 8,
  Rb: 1, Sr: 2, In: 3, Sn: 4, Sb: 5, Te: 6, I: 7, Xe: 8,
  Cs: 1, Ba: 2, Tl: 3, Pb: 4, Bi: 5,
};
