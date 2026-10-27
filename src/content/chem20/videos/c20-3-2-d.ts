import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { beaker, tag } from './lib/c20-3a-figures.ts';

const ion = (id: string, at: [number, number], tex: string, plus: boolean, group?: string) => ({ id, at, tex: `\\ce{${tex}}`, tone: plus ? ('opp' as const) : ('adj' as const), ...(group ? { group } : {}) });

// Zinc nitrate and sodium sulfate solutions mixed: all four ions stay dissolved.
const noSolid = figure(
  'mix',
  [
    beaker({
      w: 3.8,
      h: 4.4,
      level: 3.5,
      label: '\\text{no precipitate}',
      ions: [
        ion('zn', [0.95, 2.8], 'Zn^2+', true, 'ions'),
        ion('no1', [2.75, 2.8], 'NO3-', false, 'ions'),
        ion('na1', [1.2, 1.8], 'Na+', true, 'ions'),
        ion('so4', [2.85, 1.8], 'SO4^2-', false, 'ions'),
        ion('no2', [0.95, 0.75], 'NO3-', false, 'ions'),
        ion('na2', [2.75, 0.75], 'Na+', true, 'ions'),
      ],
    }),
  ],
  440,
);

// Silver nitrate and sodium chloride mixed: silver chloride on the bottom, and the sodium and
// nitrate ions, the spectator ions, still dissolved.
const spectators = figure(
  'sp',
  [
    beaker({
      w: 3.8,
      h: 4.4,
      level: 3.5,
      solid: { tone: 'ink', height: 0.45 },
      ions: [ion('na1', [0.95, 2.85], 'Na+', true, 'spect'), ion('no1', [2.75, 2.85], 'NO3-', false, 'spect'), ion('no2', [1.15, 1.85], 'NO3-', false, 'spect'), ion('na2', [2.85, 1.85], 'Na+', true, 'spect')],
    }),
    tag('ppt', [1.9, 0.9], '\\ce{AgCl(s)}', { group: 'solid' }),
  ],
  440,
);

const video: Explainer = {
  id: 'c20-3-2-d',
  lessonId: 'c20-3-2',
  title: 'Solubility and Precipitates, Part 4: No Precipitate, and Net Ionic Equations',
  thumbnailTitle: 'Net Ionic Equations',
  thumbnail: 'sp',
  summary:
    'If both new compounds have high solubility, no precipitate forms and the ions stay dissolved. When a metal nitrate is mixed with a sodium or potassium salt, only the metal ion with the other anion can precipitate. Spectator ions take no part, and the net ionic equation leaves them out.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 4', title: 'No Precipitate, and Net Ionic Equations', subtitle: 'Which ions really react?' }],
      lines: [
        { say: 'Not every pair of solutions forms a solid when they are mixed. Sometimes the ions simply stay dissolved.', show: 'title' },
        { say: 'In this part, you will spot mixtures with no precipitate, use a shortcut for a common kind of mixture, and write net ionic equations.' },
      ],
    },
    {
      chapter: 'No precipitate',
      layout: 'split',
      leftWidth: 440,
      left: [noSolid],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Solutions of zinc nitrate, $\\ce{Zn(NO3)2}$, and sodium sulfate, $\\ce{Na2SO4}$, are mixed. Which precipitate forms, if any?' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'New pairs: $\\ce{ZnSO4}$ and $\\ce{NaNO3}$.',
            '$\\ce{NaNO3}$: high. $\\ce{Zn^2+}$ is not a sulfate exception, so $\\ce{ZnSO4}$: high.',
            '**No precipitate.** All four ions stay dissolved.',
          ],
        },
      ],
      lines: [
        { say: 'Solutions of zinc nitrate and sodium sulfate are mixed. Which precipitate forms, if any?', show: ['q', 'mix.glass', 'mix.liquid', 'mix.ions'] },
        { say: 'Swap partners. The possible new compounds are zinc sulfate and sodium nitrate.', show: 'b.0', focus: 'b.0' },
        { say: 'Sodium nitrate has high solubility. Sulfates have high solubility, except those of calcium, strontium, barium, lead two and silver. Zinc is not one of them, so zinc sulfate has high solubility as well.', show: 'b.1', focus: 'b.1' },
        { say: 'So no precipitate forms. All four ions stay dissolved in the mixture.', show: ['b.2', 'mix.label'], focus: 'mix.ions' },
      ],
    },
    {
      chapter: 'A shortcut',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A metal nitrate and a sodium or potassium salt', md: 'One new compound is sodium or potassium nitrate, which never precipitates. Check only the **metal ion with the other anion**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Solutions mixed', 'Possible new compounds', 'Precipitate'],
          rows: [
            ['$\\ce{Ca(NO3)2}$ and $\\ce{Na2CO3}$', '$\\ce{CaCO3}$, $\\ce{NaNO3}$', '$\\ce{CaCO3(s)}$'],
            ['$\\ce{Cu(NO3)2}$ and $\\ce{NaOH}$', '$\\ce{Cu(OH)2}$, $\\ce{NaNO3}$', '$\\ce{Cu(OH)2(s)}$'],
            ['$\\ce{Ba(NO3)2}$ and $\\ce{K2SO4}$', '$\\ce{BaSO4}$, $\\ce{KNO3}$', '$\\ce{BaSO4(s)}$'],
            ['$\\ce{Mg(NO3)2}$ and $\\ce{KCl}$', '$\\ce{MgCl2}$, $\\ce{KNO3}$', 'none'],
          ],
        },
      ],
      lines: [
        { say: 'When one solution is a metal nitrate and the other is a sodium or potassium salt, one possible new compound is always sodium nitrate or potassium nitrate.', show: 'tip' },
        { say: 'All nitrates have high solubility, so that one never precipitates. Check only the other compound: the metal ion with the anion of the sodium or potassium salt.' },
        { say: 'Calcium nitrate and sodium carbonate give calcium carbonate, which precipitates. Copper two nitrate and sodium hydroxide give copper two hydroxide, which precipitates as well.', caption: 'Calcium nitrate and sodium carbonate give calcium carbonate, which precipitates. Copper(II) nitrate and sodium hydroxide give copper(II) hydroxide, which precipitates as well.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Barium nitrate and potassium sulfate give barium sulfate. But magnesium nitrate and potassium chloride give magnesium chloride, which has high solubility, so no precipitate forms.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Spectator ions',
      layout: 'split',
      leftWidth: 440,
      left: [spectators],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Spectator ions', md: 'Ions that take no part in a reaction. The **net ionic equation** leaves them out, and shows only the ions that form the precipitate.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Ag+(aq) + Cl-(aq) -> AgCl(s)}', '\\ce{Pb^2+(aq) + 2I-(aq) -> PbI2(s)}'] },
      ],
      lines: [
        { say: 'Look again at silver nitrate and sodium chloride. At the end, the sodium ions and nitrate ions are still dissolved, unchanged.', show: ['sp.glass', 'sp.liquid', 'sp.solid', 'sp.spect'], focus: 'sp.spect' },
        { say: 'Ions that take no part in a reaction are called spectator ions.', show: 'def' },
        { say: 'Leaving them out gives the net ionic equation, which shows only the ions that form the precipitate. The silver ion plus the chloride ion gives solid silver chloride.', caption: 'Leaving them out gives the net ionic equation, which shows only the ions that form the precipitate: Ag⁺(aq) + Cl⁻(aq) → AgCl(s).', show: 'm.0', focus: ['m.0', 'sp.solid'] },
        { say: 'For lead two iodide, the net ionic equation is: the lead two ion plus two iodide ions gives solid lead two iodide.', caption: 'For lead(II) iodide, the net ionic equation is Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s).', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solutions of zinc nitrate, $\\ce{Zn(NO3)2}$, and potassium chloride, $\\ce{KCl}$, are mixed. Which precipitate forms, if any? Chlorides have high solubility, except those of $\\ce{Ag+}$, $\\ce{Pb^2+}$ and $\\ce{Cu+}$. All nitrates and all compounds of group 1 ions have high solubility.',
          choices: ['$\\ce{ZnCl2(s)}$', 'No precipitate forms.', '$\\ce{KNO3(s)}$', 'Both $\\ce{ZnCl2(s)}$ and $\\ce{KNO3(s)}$'],
          answer: 1,
          working: 'The possible new compounds are $\\ce{ZnCl2}$ and $\\ce{KNO3}$. $\\ce{Zn^2+}$ is not a chloride exception, so both have high solubility, and all four ions stay dissolved.',
        },
      ],
      lines: [
        { say: 'Your turn. Solutions of zinc nitrate and potassium chloride are mixed. Which precipitate forms, if any? The rules are on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: no precipitate forms. Potassium nitrate has high solubility, and zinc is not one of the exceptions to the chloride rule, so zinc chloride has high solubility as well.', show: 'q.answer' },
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
            'If both new compounds have high solubility, **no precipitate** forms.',
            'A metal nitrate and a sodium or potassium salt: only the metal ion with the other anion can precipitate.',
            '**Spectator ions** take no part in the reaction.',
            'The **net ionic equation** shows only the ions that form the precipitate: $\\ce{Ag+(aq) + Cl-(aq) -> AgCl(s)}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If both new compounds have high solubility, no precipitate forms.', show: 'sum.0' },
        { say: 'When a metal nitrate is mixed with a sodium or potassium salt, only the metal ion with the other anion can precipitate.', show: 'sum.1' },
        { say: 'Spectator ions take no part in the reaction.', show: 'sum.2' },
        { say: 'And the net ionic equation shows only the ions that form the precipitate. That completes this lesson. Next, you will describe how concentrated a solution is, with percentages and parts per million.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
