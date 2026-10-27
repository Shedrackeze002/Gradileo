import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, balls, tag, water } from './lib/c20-3b-figures.ts';

// Hydrogen chloride gives its hydrogen ion (yellow) to a water molecule: a hydronium ion and a chloride ion.
const ionise = figure(
  'f',
  [
    balls({
      balls: [
        { id: 'hcl-h', el: 'H', at: [0, 0], group: 'hcl', tone: 'theta' },
        { id: 'hcl-cl', el: 'Cl', at: [0.75, 0], group: 'hcl' },
        ...water('w', [3.3, 0.15]),
        { id: 'h3o-h1', el: 'H', at: [6.94, -0.27], group: 'h3o' },
        { id: 'h3o-h2', el: 'H', at: [8.06, -0.27], group: 'h3o' },
        { id: 'h3o-h3', el: 'H', at: [7.5, 0.82], group: 'h3o', tone: 'theta' },
        { id: 'h3o-o', el: 'O', at: [7.5, 0.15], group: 'h3o' },
        { id: 'cl-ion', el: 'Cl', at: [10.3, 0], group: 'cl' },
      ],
    }),
    tag('plus1', [1.95, 0], '+', { group: 'w' }),
    tag('w-label', [3.3, -1.0], '\\ce{H2O}', { place: 'below', group: 'w' }),
    tag('hcl-label', [0.4, -1.0], '\\ce{HCl}', { place: 'below', group: 'hcl' }),
    arrow('go', [4.7, 0.05], [6.1, 0.05]),
    tag('h3o-charge', [8.15, 0.8], '+', { place: 'above right', tone: 'theta', group: 'h3o' }),
    tag('h3o-label', [7.5, -1.0], '\\ce{H3O+}', { place: 'below', group: 'h3o' }),
    tag('plus2', [9.15, 0], '+', { group: 'cl' }),
    tag('cl-charge', [10.75, 0.45], '-', { place: 'above right', tone: 'good', group: 'cl' }),
    tag('cl-label', [10.3, -1.0], '\\ce{Cl-}', { place: 'below', group: 'cl' }),
  ],
  300,
);

const video: Explainer = {
  id: 'c20-3-6-b',
  lessonId: 'c20-3-6',
  title: 'Acids, Bases and Neutralisation, Part 2: Hydronium and Hydroxide Ions',
  thumbnailTitle: 'Hydronium and Hydroxide Ions',
  thumbnail: 'f',
  summary:
    'By the modified Arrhenius theory, an acid reacts with water to form hydronium ions, H₃O⁺, and a base forms hydroxide ions, OH⁻. Hydrogen chloride ionises: HCl + H₂O → H₃O⁺ + Cl⁻. A metal hydroxide dissociates into the ions it already contains, and ammonia is a base because it reacts with water to form hydroxide ions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 2', title: 'Hydronium and Hydroxide Ions', subtitle: 'Why acids behave alike' }],
      lines: [
        { say: 'Hydrochloric acid, nitric acid and acetic acid are very different substances. So why do they all turn blue litmus red, and react with magnesium?', show: 'title' },
        { say: 'In this part, you will explain acids and bases with two ions: the hydronium ion and the hydroxide ion.' },
      ],
    },
    {
      chapter: 'The hydronium ion',
      layout: 'center',
      main: [ionise, { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{HCl(aq) + H2O(l) -> H3O+(aq) + Cl-(aq)}'] }],
      lines: [
        { say: 'In the eighteen eighties, the chemist Svante Arrhenius suggested that acids release hydrogen ions in water, and bases release hydroxide ions.', caption: 'In the 1880s, the chemist Svante Arrhenius suggested that acids release hydrogen ions, H⁺, in water, and bases release hydroxide ions, OH⁻.' },
        { say: 'But a hydrogen ion is a bare proton, and it never floats free in water. Hydrogen chloride is a molecular compound. In water, each molecule meets a water molecule.', show: ['f.hcl', 'f.w'] },
        { say: 'The hydrogen ion attaches at once to the water molecule, forming a hydronium ion, H three O plus. What is left of the acid is a chloride ion.', caption: 'The hydrogen ion attaches at once to the water molecule, forming a hydronium ion, H₃O⁺. What is left of the acid is a chloride ion.', show: ['f.go', 'f.h3o', 'f.cl'], focus: 'f.h3o' },
        { say: 'This is ionisation: a molecular substance reacting with water to form ions.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Modified Arrhenius theory',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Acid and base', md: 'An **acid** reacts with water to form **hydronium ions**, $\\ce{H3O+}$. A **base** forms **hydroxide ions**, $\\ce{OH-}$, in water.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{NaOH(s) -> Na+(aq) + OH-(aq)}', '\\ce{Ba(OH)2(s) -> Ba^2+(aq) + 2OH-(aq)}'] },
      ],
      lines: [
        { say: 'The modified Arrhenius theory takes the hydronium ion into account. An acid is a substance that reacts with water to form hydronium ions. A base forms hydroxide ions in water.', show: 'def' },
        { say: 'Hydronium ions make a solution acidic, and hydroxide ions make it basic.' },
        { say: 'A metal hydroxide is ionic, so it simply dissociates into the ions it already contains. Sodium hydroxide gives sodium ions and hydroxide ions.', show: 'm.0', focus: 'm.0' },
        { say: 'That is dissociation, as in lesson three point one, not ionisation. Barium hydroxide releases two hydroxide ions for each formula unit.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Ammonia',
      layout: 'center',
      main: [
        { kind: 'text', id: 'k', size: 'md', align: 'center', md: 'Ammonia, $\\ce{NH3}$, has no hydroxide in its formula, yet its solution turns red litmus blue.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{NH3(aq) + H2O(l) -> NH4+(aq) + OH-(aq)}'] },
      ],
      lines: [
        { say: 'Ammonia has no hydroxide in its formula, yet its solution turns red litmus blue.', show: 'k' },
        { say: 'It is a base because it reacts with water. A water molecule gives a hydrogen ion to the ammonia molecule, which leaves a hydroxide ion behind.', show: 'm', focus: 'm' },
        { say: 'Only a small fraction of the ammonia molecules react, but the hydroxide ions they form are enough to make the solution basic.' },
      ],
    },
    {
      chapter: 'Writing an ionisation',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write the equation for hydrogen bromide, $\\ce{HBr}$, ionising in water.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{HBr(aq) + H2O(l) -> H3O+(aq) + Br-(aq)}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Charges on the wrong ions', md: 'The hydrogen leaves as a **positive** ion, so the rest of the acid becomes a **negative** ion: $\\ce{Cl-}$, never $\\ce{Cl+}$. A hydroxide keeps its $\\ce{OH-}$ ion whole: $\\ce{KOH}$ gives $\\ce{K+}$ and $\\ce{OH-}$.' },
      ],
      lines: [
        { say: 'Write the equation for hydrogen bromide ionising in water.', show: 'q' },
        { say: 'The acid gives a hydrogen ion to a water molecule, forming the hydronium ion. What is left is the bromide ion. The charges balance: zero on the left, one plus and one minus on the right.', show: 'm', focus: 'm' },
        { say: 'Take care with the charges. The hydrogen leaves as a positive ion, so the rest of the acid becomes a negative ion. And potassium hydroxide gives potassium ions and hydroxide ions, never a hydrogen ion.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Nitric acid, $\\ce{HNO3}$, ionises in water to make an acidic solution: $\\ce{HNO3(aq) + H2O(l) ->}$ ? Which two ions form?',
          choices: ['$\\ce{H3O+}$ and $\\ce{NO3-}$', '$\\ce{H3O-}$ and $\\ce{NO3+}$', '$\\ce{OH-}$ and $\\ce{H2NO3+}$', '$\\ce{H-}$ and $\\ce{NO3+}$'],
          answer: 0,
          working: 'The acid gives a hydrogen ion to water, forming the hydronium ion, $\\ce{H3O+}$, and leaving the nitrate ion, $\\ce{NO3-}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Nitric acid ionises in water to make an acidic solution. Which two ions form? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, the hydronium ion and the nitrate ion. Nitric acid gives a hydrogen ion to water, so the rest of the acid becomes a negative ion. Choice B has the charges on the wrong ions.', show: 'q.answer' },
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
            'An acid reacts with water to form hydronium ions, $\\ce{H3O+}$; a base forms hydroxide ions, $\\ce{OH-}$.',
            'An acid **ionises**: $\\ce{HCl(aq) + H2O(l) -> H3O+(aq) + Cl-(aq)}$.',
            'A metal hydroxide **dissociates**: $\\ce{NaOH(s) -> Na+(aq) + OH-(aq)}$.',
            'Ammonia is a base: it reacts with water to form $\\ce{OH-}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An acid reacts with water to form hydronium ions, and a base forms hydroxide ions.', show: 'sum.0' },
        { say: 'An acid such as hydrogen chloride ionises: its molecules give hydrogen ions to water.', show: 'sum.1' },
        { say: 'A metal hydroxide dissociates into the ions it already contains.', show: 'sum.2' },
        { say: 'And ammonia is a base, because it reacts with water to form hydroxide ions. In part three, you will tell from a formula whether a solution is acidic, basic or neutral. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
