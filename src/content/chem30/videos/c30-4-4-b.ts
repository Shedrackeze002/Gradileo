import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pairEq } from './lib/c30-4a-figures.ts';

const ROLES: [string, string, string, string] = ['\\text{acid}', '\\text{base}', '\\text{conjugate acid}', '\\text{conjugate base}'];

// HF + H₂O ⇌ H₃O⁺ + F⁻: HF / F⁻ joined above, H₂O / H₃O⁺ joined below.
const hf = figure('e', [pairEq({ species: ['\\ce{HF}', '\\ce{H2O}', '\\ce{H3O+}', '\\ce{F-}'], roles: ROLES })], 330);

// CH₃COOH + CO₃²⁻ ⇌ CH₃COO⁻ + HCO₃⁻: the conjugate base comes first among the products.
const acetic = figure(
  'e',
  [pairEq({ species: ['\\ce{CH3COOH}', '\\ce{CO3^2-}', '\\ce{CH3COO-}', '\\ce{HCO3-}'], roles: ['\\text{acid}', '\\text{base}', '\\text{conjugate base}', '\\text{conjugate acid}'], pairs: [[0, 2], [1, 3]], gap: 5 })],
  300,
);

// The white smoke: HCl + NH₃ → NH₄⁺ + Cl⁻.
const smoke = figure('e', [pairEq({ species: ['\\ce{HCl}', '\\ce{NH3}', '\\ce{NH4+}', '\\ce{Cl-}'], roles: ROLES, arrow: '\\longrightarrow' })], 300);

const video: Explainer = {
  id: 'c30-4-4-b',
  lessonId: 'c30-4-4',
  title: 'Brønsted–Lowry Acids and Bases, Part 2: Conjugate Acid–Base Pairs',
  thumbnailTitle: 'Conjugate Acid–Base Pairs',
  thumbnail: 'e',
  summary:
    'Every acid–base equilibrium has an acid and a base on each side: in HF + H₂O ⇌ H₃O⁺ + F⁻, H₃O⁺ donates a proton back and F⁻ accepts it. Two particles that differ by one proton form a conjugate acid–base pair, one on each side of the equation: HF / F⁻ and H₃O⁺ / H₂O. The two reactants are never a pair. In the white smoke, HCl + NH₃ → NH₄⁺ + Cl⁻ is a proton transfer with the pairs HCl / Cl⁻ and NH₄⁺ / NH₃.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 2', title: 'Conjugate Acid–Base Pairs', subtitle: 'Partners that differ by one proton' }],
      lines: [
        { say: 'When hydrogen fluoride gives a proton to water, the story does not end there. The products can pass the proton back.', show: 'title' },
        { say: 'In this part, you will find the acid and the base on each side of an equation, and name the conjugate pairs.' },
      ],
    },
    {
      chapter: 'Conjugate pairs',
      layout: 'center',
      main: [
        hf,
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Conjugate acid–base pair', md: 'Two particles that differ by exactly **one proton**. The one with the extra proton is the **conjugate acid**; the other is the **conjugate base**. Every proton transfer has two pairs.' },
      ],
      lines: [
        { say: 'Hydrogen fluoride donates a proton, so it is the acid, and water accepts it, so it is the base.', show: ['e.s0', 'e.plus1', 'e.s1', 'e.arrow', 'e.s2', 'e.plus2', 'e.s3', 'e.r0', 'e.r1'], focus: ['e.r0', 'e.r1'] },
        { say: 'Now look at the reverse reaction. Hydronium donates a proton back, so it is an acid. Fluoride accepts it, so it is a base. Every acid-base equilibrium has an acid and a base on each side.', show: ['e.r2', 'e.r3'], focus: ['e.r2', 'e.r3'] },
        { say: 'Two particles that differ by exactly one proton form a conjugate acid-base pair. The one with the extra proton is the conjugate acid, and the other is the conjugate base.', show: 'def' },
        { say: 'Hydrogen fluoride and fluoride are one pair.', show: 'e.pair1', focus: ['e.s0', 'e.s3', 'e.pair1'] },
        { say: 'Hydronium and water are the other. Every proton transfer has two pairs, with one member of each on each side of the equation.', show: 'e.pair2', focus: ['e.s1', 'e.s2', 'e.pair2'] },
      ],
    },
    {
      chapter: 'Labelling a reaction',
      layout: 'center',
      main: [
        acetic,
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The two reactants are not a pair', md: '$\\ce{CH3COOH}$ and $\\ce{CO3^2-}$ differ by much more than one proton. A conjugate pair always has one member on each side of the equation.' },
      ],
      lines: [
        { say: 'Label this one: acetic acid plus the carbonate ion, in equilibrium with the acetate ion and the hydrogen carbonate ion.', show: ['e.s0', 'e.plus1', 'e.s1', 'e.arrow', 'e.s2', 'e.plus2', 'e.s3'] },
        { say: 'Acetic acid loses a proton and becomes acetate. Acetic acid is the acid, and acetate is its conjugate base.', show: ['e.r0', 'e.r2', 'e.pair1'], focus: ['e.r0', 'e.r2', 'e.pair1'] },
        { say: 'The carbonate ion gains the proton and becomes hydrogen carbonate. Carbonate is the base, and hydrogen carbonate is its conjugate acid.', show: ['e.r1', 'e.r3', 'e.pair2'], focus: ['e.r1', 'e.r3', 'e.pair2'] },
        { say: 'Watch out: the acid and base on the same side are never a pair. Acetic acid and carbonate differ by much more than one proton.', show: 'oops', focus: 'e' },
      ],
    },
    {
      chapter: 'The white smoke',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{HCl(g) + NH3(g) -> NH4Cl(s)}', '\\ce{NH4Cl(s)}\\text{ is made of } \\ce{NH4+} \\text{ and } \\ce{Cl-} \\text{ ions}'] },
        smoke,
      ],
      lines: [
        { say: 'Back to the white smoke: hydrogen chloride gas and ammonia gas form solid ammonium chloride. The solid is made of ammonium ions and chloride ions.', show: 'm' },
        { say: 'So the reaction is hydrogen chloride plus ammonia, giving ammonium ions and chloride ions.', show: ['e.s0', 'e.plus1', 'e.s1', 'e.arrow', 'e.s2', 'e.plus2', 'e.s3'] },
        { say: 'Hydrogen chloride loses a proton and becomes chloride, so it is the acid. Ammonia gains it and becomes ammonium, so it is the base.', show: ['e.r0', 'e.r1', 'e.r2', 'e.r3'] },
        { say: 'The pairs are hydrogen chloride with chloride, and ammonium with ammonia: a proton transfer, with no water at all.', show: ['e.pair1', 'e.pair2'], focus: ['e.pair1', 'e.pair2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is a conjugate acid–base pair in the reaction $\\ce{HSO4^-(aq) + CH3COO^-(aq) <=> SO4^2-(aq) + CH3COOH(aq)}$?',
          choices: ['$\\ce{HSO4-}$ and $\\ce{CH3COO-}$', '$\\ce{SO4^2-}$ and $\\ce{CH3COOH}$', '$\\ce{HSO4-}$ and $\\ce{SO4^2-}$', '$\\ce{HSO4-}$ and $\\ce{CH3COOH}$'],
          answer: 2,
          working: '$\\ce{HSO4-}$ gives a proton and becomes $\\ce{SO4^2-}$: one pair. $\\ce{CH3COO-}$ takes the proton and becomes $\\ce{CH3COOH}$: the other pair.',
        },
      ],
      lines: [
        { say: 'Your turn. The hydrogen sulfate ion reacts with the acetate ion, as shown. Which is a conjugate acid-base pair? Pause the video and try it.', caption: 'Your turn. The hydrogen sulfate ion reacts with the acetate ion, as shown. Which is a conjugate acid–base pair? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Hydrogen sulfate loses a proton and becomes sulfate: they differ by one proton, one on each side. Choice A is the two reactants, which are never a pair.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'Every acid–base equilibrium has an acid and a base on **each** side.',
            'A **conjugate pair** differs by one proton: the **conjugate acid** has the extra proton.',
            'Every proton transfer has two pairs, each with one member on each side. The two reactants are never a pair.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Every acid-base equilibrium has an acid and a base on each side.', caption: 'Let’s sum up. Every acid–base equilibrium has an acid and a base on each side.', show: 'sum.0' },
        { say: 'A conjugate pair is two particles that differ by one proton, and the conjugate acid is the one with the extra proton.', show: 'sum.1' },
        { say: 'Every proton transfer has two pairs, with one member of each on each side. In part three, you will write conjugates yourself. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
