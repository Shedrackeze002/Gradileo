/**
 * Chemistry written with KaTeX's mhchem (`\ce{…}`) in words, for the voice: formulas are read as a
 * teacher reads them aloud, letter by letter with their numbers ("H 2 S O 4"), charges as "2 plus",
 * arrows as "gives", state symbols in full and isotopes by name ("chlorine-35").
 */
import { element } from './elements.ts';

const STATES: Record<string, string> = { s: 'solid', l: 'liquid', g: 'gas', aq: 'aqueous' };

const ARROWS: Array<[RegExp, string]> = [
  [/<=>|<->|⇌/g, ' is in equilibrium with '],
  [/->|→/g, ' gives '],
  [/<-|←/g, ' comes from '],
];

/** A charge written after a formula ("2+", "-", "3-") in words. */
function charge(c: string): string {
  const m = /^(\d*)([+-])$/.exec(c.replace(/[{}]/g, ''));
  if (!m) return '';
  return `${m[1] ? `${m[1]} ` : ''}${m[2] === '+' ? 'plus' : 'minus'}`;
}

/** One formula, such as `Ca(OH)2`, `SO4^2-`, `NH4+` or `CuSO4.5H2O`, letter by letter. */
function formula(f: string): string {
  const out: string[] = [];
  // A charge at the end: "^2+", "^{2+}", "^-" or a bare "+"/"-" after the formula.
  let ion = '';
  const caret = /\^\{?(\d*[+-])\}?$/.exec(f);
  if (caret) {
    ion = charge(caret[1]);
    f = f.slice(0, caret.index);
  } else if (/[A-Za-z)\d][+-]$/.test(f) && !/^e[+-]$/.test(f)) {
    ion = charge(f.slice(-1));
    f = f.slice(0, -1);
  }
  for (let i = 0; i < f.length; ) {
    const sym = /^[A-Z][a-z]?/.exec(f.slice(i));
    if (sym) {
      out.push(sym[0].toUpperCase().split('').join(' '));
      i += sym[0].length;
      continue;
    }
    const n = /^\d+/.exec(f.slice(i));
    if (n) {
      out.push(n[0]);
      i += n[0].length;
      continue;
    }
    if (f[i] === '(' || f[i] === '[') {
      // A group in brackets: "(OH)2" is "O H in brackets, 2".
      const close = f.indexOf(f[i] === '(' ? ')' : ']', i);
      const inner = close < 0 ? f.slice(i + 1) : f.slice(i + 1, close);
      i = close < 0 ? f.length : close + 1;
      const times = /^\d+/.exec(f.slice(i))?.[0];
      if (times) i += times.length;
      // A pause before the group, so "Ca(OH)2" is not heard as one run of letters.
      if (out.length) out[out.length - 1] += ',';
      out.push(`${formula(inner)} in brackets${times ? `, ${times}` : ''},`);
      continue;
    }
    if (f[i] === '.' || f[i] === '·' || f[i] === '*') {
      out.push('dot');
      i++;
      continue;
    }
    if (/[a-z]/.test(f[i])) {
      // A word written inside \ce ("salt", "energy") is said as it is.
      const w = /^[a-z]+/.exec(f.slice(i))![0];
      out.push(w);
      i += w.length;
      continue;
    }
    i++;
  }
  return [out.join(' ').replace(/,$/, ''), ion].filter(Boolean).join(', ');
}

/**
 * One species with its coefficient and state: "2H2O(l)", "e-", "^{35}_{17}Cl". A species with a
 * charge or a state ends with a comma, so the "plus" joining it to the next is heard as its own word.
 */
function species(s: string): string {
  s = s.trim();
  if (!s) return '';
  // An isotope written with its mass and atomic numbers: "chlorine-35".
  const iso = /^\^\{?(\d+)\}?_\{?\d+\}?([A-Z][a-z]?)(?:\^\{?(\d*[+-])\}?)?$/.exec(s);
  if (iso) return `${element(iso[2])?.name ?? iso[2].split('').join(' ')}-${iso[1]}${iso[3] ? `, ${charge(iso[3])},` : ''}`;
  const state = /\((s|l|g|aq)\)$/.exec(s);
  if (state) s = s.slice(0, state.index);
  const coef = /^(\d+(?:\/\d+)?)\s*(?=[A-Z(\[e])/.exec(s);
  const n = coef?.[1];
  if (coef) s = s.slice(coef[0].length);
  let said: string;
  if (/^e\^?\{?-\}?$/.test(s)) said = n && n !== '1' ? 'electrons' : 'an electron';
  else said = formula(s);
  const text = [n && !/^e/.test(s) ? n : n && n !== '1' ? n : '', said].filter(Boolean).join(' ') + (state ? `, ${STATES[state[1]]}` : '');
  return /, (plus|minus)$/.test(text) || state ? `${text},` : text;
}

/** The inside of `\ce{…}` in words: `2H2 + O2 -> 2H2O` → "2 H 2 plus O 2 gives 2 H 2 O". */
export function chemToWords(ce: string): string {
  let s = ce.replace(/\\Delta|\\triangle/g, 'heat').replace(/\s+/g, ' ').trim();
  // Words written over an arrow ("->[heat]") are said after it.
  s = s.replace(/(->|<=>)\[([^\]]*)\](?:\[([^\]]*)\])?/g, (_, a: string, over: string) => `${a} ${over ? `@with ${over.replace(/\\text\{([^}]*)\}/g, '$1')}@` : ''}`);
  for (const [re, said] of ARROWS) s = s.replace(re, `|${said}|`);
  return s
    .split('|')
    .map((part) => {
      if (/^ (is in equilibrium with|gives|comes from) $/.test(part)) return part.trim();
      // Species are joined by " + " (a "+" with spaces); a "+" with none is a charge.
      return part
        .split(/\s\+\s/)
        .map((sp) => {
          const withOver = /^@with ([^@]*)@\s*(.*)$/.exec(sp.trim());
          if (withOver) return [`with ${withOver[1]},`, species(withOver[2])].filter(Boolean).join(' ');
          // Bonds in a structure: "C=O", "S-H", "C#N".
          if (/^[A-Z][a-z]?(?:[-=#][A-Z][a-z]?)+$/.test(sp.trim()))
            return sp
              .trim()
              .split(/([-=#])/)
              .map((t) => (t === '-' ? 'single-bonded to' : t === '=' ? 'double-bonded to' : t === '#' ? 'triple-bonded to' : t.toUpperCase().split('').join(' ')))
              .join(' ');
          return species(sp);
        })
        .filter(Boolean)
        .join(' plus ');
    })
    .filter((p) => p.trim())
    .join(' ')
    .replace(/\s+/g, ' ')
    .replace(/ ,/g, ',')
    .trim()
    .replace(/,$/, '');
}
