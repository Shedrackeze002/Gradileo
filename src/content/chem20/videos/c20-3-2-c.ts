import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, beaker, tag } from './lib/c20-3a-figures.ts';

const ion = (id: string, at: [number, number], tex: string, plus: boolean, group: string) => ({ id, at, tex: `\\ce{${tex}}`, tone: plus ? ('opp' as const) : ('adj' as const), group });

// Silver nitrate solution and sodium chloride solution, and the mixture: the ions swap partners,
// silver chloride comes out as a white solid, and sodium and nitrate ions stay dissolved.
const mixing = figure(
  'mix',
  [
    beaker({
      name: 'a',
      w: 3.4,
      h: 4.2,
      level: 3.3,
      label: '\\ce{AgNO3(aq)}',
      ions: [ion('ag1', [0.85, 2.5], 'Ag+', true, 'ions'), ion('no1', [2.5, 2.5], 'NO3-', false, 'ions'), ion('no2', [0.95, 1.1], 'NO3-', false, 'ions'), ion('ag2', [2.55, 1.1], 'Ag+', true, 'ions')],
    }),
    tag('plus', [3.95, 1.7], '+'),
    beaker({
      name: 'b',
      at: [4.5, 0],
      w: 3.4,
      h: 4.2,
      level: 3.3,
      label: '\\ce{NaCl(aq)}',
      ions: [ion('na1', [0.85, 2.5], 'Na+', true, 'ions'), ion('cl1', [2.5, 2.5], 'Cl-', false, 'ions'), ion('cl2', [0.95, 1.1], 'Cl-', false, 'ions'), ion('na2', [2.55, 1.1], 'Na+', true, 'ions')],
    }),
    arrow('arrow', [8.3, 1.7], [9.3, 1.7]),
    beaker({
      name: 'm',
      at: [9.7, 0],
      w: 3.4,
      h: 4.2,
      level: 3.3,
      label: '\\text{mixed}',
      solid: { tone: 'ink', height: 0.42 },
      ions: [ion('na1', [0.85, 2.6], 'Na+', true, 'ions'), ion('no1', [2.5, 2.6], 'NO3-', false, 'ions'), ion('no2', [0.95, 1.8], 'NO3-', false, 'ions'), ion('na2', [2.55, 1.8], 'Na+', true, 'ions')],
    }),
    tag('ppt', [11.4, 0.95], '\\ce{AgCl(s)}', { group: 'm-solid' }),
  ],
  380,
);

const video: Explainer = {
  id: 'c20-3-2-c',
  lessonId: 'c20-3-2',
  title: 'Solubility and Precipitates, Part 3: Predicting Precipitates',
  thumbnailTitle: 'Predicting Precipitates',
  thumbnail: 'mix',
  summary:
    'When two solutions are mixed, the ions swap partners. A new compound with low solubility comes out of the solution as a precipitate: silver nitrate and sodium chloride give silver chloride, and lead(II) nitrate and potassium iodide give yellow lead(II) iodide.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 3', title: 'Predicting Precipitates', subtitle: 'When ions swap partners' }],
      lines: [
        { say: 'Mix a clear, colourless solution of silver nitrate with a clear, colourless solution of sodium chloride, and a white solid forms at once. Where does it come from?', show: 'title' },
        { say: 'In this part, you will see why some solutions form a solid when they are mixed, and follow four steps to predict it.' },
      ],
    },
    {
      chapter: 'Ions swap partners',
      layout: 'center',
      main: [
        mixing,
        { kind: 'text', id: 't', size: 'md', align: 'center', md: 'The ions **swap partners**: $\\ce{Ag+}$ with $\\ce{Cl-}$, and $\\ce{Na+}$ with $\\ce{NO3-}$. Silver chloride has **low solubility**.' },
      ],
      lines: [
        { say: 'Before mixing, each solution holds its own ions. Silver nitrate solution holds silver ions and nitrate ions.', show: ['mix.a-glass', 'mix.a-liquid', 'mix.a-ions', 'mix.a-label'], focus: 'mix.a-ions' },
        { say: 'Sodium chloride solution holds sodium ions and chloride ions.', show: ['mix.plus', 'mix.b-glass', 'mix.b-liquid', 'mix.b-ions', 'mix.b-label'], focus: 'mix.b-ions' },
        { say: 'Once the solutions are mixed, all four ions move about in the same water, and each cation meets the other anion. The ions swap partners: silver with chloride, and sodium with nitrate.', show: ['mix.arrow', 'mix.m-glass', 'mix.m-liquid', 'mix.m-label', 't'], focus: 'mix' },
        { say: 'Silver chloride has low solubility, so those ions come out of the solution together, as a white solid. Sodium nitrate has high solubility, so its ions stay dissolved.', show: ['mix.m-solid', 'mix.m-ions'], focus: 'mix.m-solid' },
      ],
    },
    {
      chapter: 'Precipitates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Precipitate', md: 'A solid that forms when two solutions are mixed, because the mixture makes a compound with **low solubility**. It is written with the state symbol **(s)**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{AgNO3(aq) + NaCl(aq) -> AgCl(s) + NaNO3(aq)}'] },
      ],
      lines: [
        { say: 'A solid that forms when two solutions are mixed is called a precipitate. It forms because the mixture makes a compound with low solubility, and it is written with the state symbol S.', caption: 'A solid that forms when two solutions are mixed is called a precipitate. It forms because the mixture makes a compound with low solubility, and it is written with the state symbol (s).', show: 'def' },
        { say: 'Silver nitrate, aqueous, plus sodium chloride, aqueous, gives silver chloride, solid, plus sodium nitrate, aqueous.', caption: 'AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'split',
      leftWidth: 500,
      left: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            '**List** the ions in each solution.',
            '**Swap partners**, and write the two new formulas with balanced charges.',
            '**Check** each new compound against the solubility rules.',
            '**Low solubility** forms a precipitate. If both are high, none forms.',
          ],
        },
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            '\\ce{Pb^2+},\\ \\ce{NO3-} \\qquad \\ce{K+},\\ \\ce{I-}',
            '\\ce{PbI2} \\qquad \\ce{KNO3}',
            '\\ce{KNO3}\\text{: high} \\qquad \\ce{PbI2}\\text{: low}',
            '\\ce{Pb(NO3)2(aq) + 2KI(aq)}',
            '\\qquad \\ce{-> PbI2(s) + 2KNO3(aq)}',
          ],
        },
      ],
      lines: [
        { say: 'To predict a precipitate, follow four steps. Try them on lead two nitrate and potassium iodide.', caption: 'To predict a precipitate, follow four steps. Try them on lead(II) nitrate, Pb(NO₃)₂, and potassium iodide, KI.' },
        { say: 'Step one: list the ions. Lead two ions and nitrate ions in one solution, potassium ions and iodide ions in the other.', caption: 'Step one: list the ions. Pb²⁺ and NO₃⁻ in one solution, K⁺ and I⁻ in the other.', show: ['s.0', 'm.0'], focus: 'm.0' },
        { say: 'Step two: swap partners, and balance the charges. Two iodide ions balance one lead two ion, giving lead two iodide. Potassium and nitrate give potassium nitrate.', caption: 'Step two: swap partners, and balance the charges. Two I⁻ ions balance one Pb²⁺ ion, giving PbI₂. K⁺ and NO₃⁻ give KNO₃.', show: ['s.1', 'm.1'], focus: 'm.1' },
        { say: 'Step three: check each new compound against the rules. Potassium nitrate has high solubility. Lead two iodide has low solubility, because lead two is an exception to the iodide rule.', caption: 'Step three: check each new compound against the rules. KNO₃ has high solubility. PbI₂ has low solubility, because Pb²⁺ is an exception to the iodide rule.', show: ['s.2', 'm.2'], focus: 'm.2' },
        { say: 'Step four: the compound with low solubility forms a precipitate. Lead two iodide comes out as a bright yellow solid.', caption: 'Step four: the compound with low solubility forms a precipitate. PbI₂ comes out as a bright yellow solid.', show: ['s.3', 'm.3', 'm.4'], focus: ['m.3', 'm.4'] },
      ],
    },
    {
      chapter: 'Two checks',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'The precipitate is a new compound', md: 'The compounds you started with were already dissolved, so neither can be the precipitate. And balance the charges: $\\ce{Pb^2+}$ and $\\ce{I-}$ make $\\ce{PbI2}$, not $\\ce{PbI}$.' },
      ],
      lines: [
        { say: 'Two checks. The compounds you started with were already dissolved, so neither of them can be the precipitate. Look only at the new pairs.', show: 'mis' },
        { say: 'And balance the charges in each new formula. One lead two ion needs two iodide ions, so the formula has a two after the iodine, not a one.', caption: 'And balance the charges in each new formula. One Pb²⁺ ion needs two I⁻ ions: PbI₂, not PbI.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solutions of barium nitrate, $\\ce{Ba(NO3)2}$, and potassium sulfate, $\\ce{K2SO4}$, are mixed. Which precipitate forms, if any? Sulfates have high solubility, except those of $\\ce{Ca^2+}$, $\\ce{Sr^2+}$, $\\ce{Ba^2+}$, $\\ce{Pb^2+}$ and $\\ce{Ag+}$. All nitrates and all compounds of group 1 ions have high solubility.',
          choices: ['$\\ce{KNO3(s)}$', 'No precipitate forms.', 'Both $\\ce{BaSO4(s)}$ and $\\ce{KNO3(s)}$', '$\\ce{BaSO4(s)}$'],
          answer: 3,
          working: 'The possible new compounds are $\\ce{BaSO4}$ and $\\ce{KNO3}$. $\\ce{KNO3}$ has high solubility; $\\ce{BaSO4}$ has low solubility, because $\\ce{Ba^2+}$ is an exception to the sulfate rule.',
        },
      ],
      lines: [
        { say: 'Your turn. Solutions of barium nitrate and potassium sulfate are mixed. Which precipitate forms, if any? The rules you need are on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, barium sulfate. The new pairs are barium sulfate and potassium nitrate. Potassium nitrate has high solubility, but barium is an exception to the sulfate rule.', show: 'q.answer' },
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
            'When two solutions are mixed, the ions **swap partners**.',
            'A new compound with **low solubility** forms a **precipitate**, written (s).',
            'List the ions, swap partners, check the rules, find the low-solubility compound.',
            'The precipitate is always a **new** compound, with balanced charges.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When two solutions are mixed, the ions swap partners.', show: 'sum.0' },
        { say: 'A new compound with low solubility comes out as a precipitate, written with the state symbol S.', caption: 'A new compound with low solubility comes out as a precipitate, written with the state symbol (s).', show: 'sum.1' },
        { say: 'To predict it, list the ions, swap partners, check the rules, and find the compound with low solubility.', show: 'sum.2' },
        { say: 'The precipitate is always a new compound, with balanced charges. In part four, you will meet mixtures with no precipitate, and write net ionic equations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
