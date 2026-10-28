import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { beaker } from './lib/c10-5-figures.ts';

// Hydrochloric acid in water: hydrogen ions and chloride ions.
const acid = figure('a', [
  beaker({
    label: '\\text{hydrochloric acid}',
    ions: [
      { id: 'h0', at: [0.7, 0.6], tex: '\\ce{H+}', tone: 'bad', group: 'h' },
      { id: 'h1', at: [2.2, 1.35], tex: '\\ce{H+}', tone: 'bad', group: 'h' },
      { id: 'h2', at: [0.85, 2.05], tex: '\\ce{H+}', tone: 'bad', group: 'h' },
      { id: 'c0', at: [2.15, 0.55], tex: '\\ce{Cl-}', tone: 'good', group: 'cl' },
      { id: 'c1', at: [0.75, 1.3], tex: '\\ce{Cl-}', tone: 'good', group: 'cl' },
      { id: 'c2', at: [2.2, 2.1], tex: '\\ce{Cl-}', tone: 'good', group: 'cl' },
    ],
  }),
]);

// Sodium hydroxide solution: sodium ions and hydroxide ions.
const alkali = figure('b', [
  beaker({
    label: '\\text{sodium hydroxide solution}',
    ions: [
      { id: 'n0', at: [0.7, 0.6], tex: '\\ce{Na+}', tone: 'brand', group: 'na' },
      { id: 'n1', at: [2.2, 1.35], tex: '\\ce{Na+}', tone: 'brand', group: 'na' },
      { id: 'n2', at: [0.8, 2.05], tex: '\\ce{Na+}', tone: 'brand', group: 'na' },
      { id: 'o0', at: [2.15, 0.55], tex: '\\ce{OH-}', tone: 'adj', group: 'oh' },
      { id: 'o1', at: [0.8, 1.3], tex: '\\ce{OH-}', tone: 'adj', group: 'oh' },
      { id: 'o2', at: [2.15, 2.1], tex: '\\ce{OH-}', tone: 'adj', group: 'oh' },
    ],
  }),
]);

const video: Explainer = {
  id: 'c10-5-3',
  lessonId: 'c10-5-3',
  title: 'Acids, Bases and the pH Scale, Part 1: Acids and Bases',
  thumbnailTitle: 'Acids and Bases',
  thumbnail: 'a',
  summary:
    'An acid forms hydrogen ions, H⁺, when it dissolves in water. A base reacts with an acid and cancels it out, and an alkali is a base that dissolves in water, forming hydroxide ions, OH⁻. A solution that is neither is neutral. Never taste or touch a chemical to test it: use an indicator.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 1', title: 'Acids and Bases', subtitle: 'Sour, slippery or neutral' }],
      lines: [
        { say: 'Lemon juice and vinegar taste sour. Soap feels slippery, and an oven cleaner can strip baked-on grease. Pure water does neither.', show: 'title' },
        { say: 'Chemists sort solutions like these into acids, bases and neutral solutions. In this video, you will meet all three. Later parts measure them on the p H scale, and test them with indicators.', caption: 'Chemists sort solutions like these into acids, bases and neutral solutions. In this video, you will meet all three. Later parts measure them on the pH scale, and test them with indicators.' },
      ],
    },
    {
      chapter: 'Acids',
      layout: 'split',
      left: [acid],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Acid', md: 'An **acid** is a substance that forms hydrogen ions, $\\ce{H+}$, when it dissolves in water. Acids react with many metals, giving off hydrogen gas, and with metal carbonates, giving off carbon dioxide.' }],
      lines: [
        { say: 'An acid is a substance that forms hydrogen ions, H plus, when it dissolves in water.', caption: 'An acid is a substance that forms hydrogen ions, H⁺, when it dissolves in water.', show: 'def' },
        { say: 'Hydrochloric acid is an example. In water, it forms hydrogen ions, and chloride ions.', show: ['a.glass', 'a.liquid', 'a.label', 'a.h', 'a.cl'], focus: 'a.h' },
        { say: 'Acids react with many metals, giving off hydrogen gas. And they react with metal carbonates, such as chalk, giving off carbon dioxide.', focus: 'a' },
      ],
    },
    {
      chapter: 'Bases and alkalis',
      layout: 'split',
      left: [alkali],
      right: [
        { kind: 'callout', id: 'base', tone: 'definition', title: 'Base', md: 'A **base** is a substance that reacts with an acid and cancels it out. Metal oxides and metal hydroxides are bases.' },
        { kind: 'callout', id: 'alk', tone: 'definition', title: 'Alkali', md: 'An **alkali** is a base that dissolves in water, forming hydroxide ions, $\\ce{OH-}$. Sodium hydroxide and potassium hydroxide are alkalis.' },
      ],
      lines: [
        { say: 'A base is a substance that reacts with an acid, and cancels it out. Metal oxides and metal hydroxides are bases.', show: 'base' },
        { say: 'Some bases dissolve in water. A base that dissolves in water is called an alkali, and it forms hydroxide ions, O H minus.', caption: 'Some bases dissolve in water. A base that dissolves in water is called an alkali, and it forms hydroxide ions, OH⁻.', show: 'alk' },
        { say: 'Sodium hydroxide is an alkali. In water, it forms sodium ions, and hydroxide ions. Potassium hydroxide is another alkali.', show: ['b.glass', 'b.liquid', 'b.label', 'b.na', 'b.oh'], focus: 'b.oh' },
      ],
    },
    {
      chapter: 'Everyday acids and bases',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Acidic', 'Basic', 'Neutral'],
          rows: [
            ['lemon juice (citric acid)', 'soapy water', 'pure water'],
            ['vinegar (acetic acid)', 'baking soda solution', 'salt solution'],
            ['stomach acid (hydrochloric acid)', 'ammonia solution', 'sugar solution'],
            ['fizzy drinks (carbonic acid)', 'oven cleaner (sodium hydroxide)', ''],
          ],
        },
      ],
      lines: [
        { say: 'A solution that is neither acidic nor basic is called neutral. Here are some everyday examples of all three.' },
        { say: 'Lemon juice contains citric acid, and vinegar contains acetic acid. Soapy water and baking soda solution are basic. Pure water and salt solution are neutral.', show: ['t.0', 't.1'] },
        { say: 'Stomach acid is hydrochloric acid, and fizzy drinks contain carbonic acid. Ammonia solution is basic, and so is oven cleaner, which contains sodium hydroxide. Sugar solution is neutral.', show: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Never taste or touch',
      layout: 'center',
      main: [{ kind: 'callout', id: 'safe', tone: 'mistake', title: 'Never taste or touch to test', md: 'Acids and alkalis in the laboratory can burn skin and damage eyes. Never taste or touch a chemical to find out what it is. Wear eye protection, and use an **indicator** instead.' }],
      lines: [
        { say: 'A sour taste and a slippery feel are clues in the kitchen. But acids and alkalis in the laboratory can burn skin and damage eyes.', show: 'safe' },
        { say: 'So never taste or touch a chemical to find out what it is. Wear eye protection, and use an indicator instead. You will meet indicators in part three.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Potassium hydroxide dissolves in water, forming hydroxide ions, $\\ce{OH-}$. What kind of substance is it?',
          choices: ['An acid', 'A neutral substance', 'A metal carbonate', 'An alkali'],
          answer: 3,
          working: 'An alkali is a base that dissolves in water, forming hydroxide ions. An acid would form hydrogen ions, $\\ce{H+}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Potassium hydroxide dissolves in water, forming hydroxide ions. What kind of substance is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, an alkali. An alkali is a base that dissolves in water, forming hydroxide ions. Choice A is wrong, because an acid forms hydrogen ions, not hydroxide ions.', show: 'q.answer' },
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
            'An **acid** forms hydrogen ions, $\\ce{H+}$, when it dissolves in water.',
            'A **base** reacts with an acid and cancels it out. An **alkali** is a base that dissolves in water, forming $\\ce{OH-}$ ions.',
            'A **neutral** solution, such as pure water, is neither acidic nor basic.',
            'Never taste or touch a chemical to test it: use an indicator.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An acid forms hydrogen ions when it dissolves in water.', show: 'sum.0' },
        { say: 'A base reacts with an acid and cancels it out. An alkali is a base that dissolves in water, forming hydroxide ions.', show: 'sum.1' },
        { say: 'A neutral solution, such as pure water, is neither acidic nor basic.', show: 'sum.2' },
        { say: 'And never taste or touch a chemical to test it. In part two, you will measure how acidic or basic a solution is, on the p H scale. See you there!', caption: 'And never taste or touch a chemical to test it. In part two, you will measure how acidic or basic a solution is, on the pH scale. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
