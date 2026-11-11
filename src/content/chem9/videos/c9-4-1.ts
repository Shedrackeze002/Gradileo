import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c9-4-1',
  lessonId: 'c9-4-1',
  title: 'Acids, Bases and Indicators',
  thumbnail: 'ind',
  summary:
    'Acids release hydrogen ions in water, taste sour and turn blue litmus red. Bases neutralize acids, and alkalis are bases that dissolve in water and release hydroxide ions. Indicators change colour: litmus is red in acid and blue in alkali, phenolphthalein is pink in alkali, and universal indicator shows how strong.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Acids and Bases', title: 'Acids, Bases and Indicators', subtitle: 'Two families, and how to tell them apart' }],
      lines: [
        { say: 'Lemon juice, vinegar and cola taste sour. Soap and oven cleaner feel slippery.', show: 'title' },
        { say: 'These are two families of substances: acids and bases. In this video, you will learn what makes each one, and how chemists use coloured dyes to tell them apart safely.' },
      ],
    },
    {
      chapter: 'Acids, bases and alkalis',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'acid', tone: 'definition', title: 'Acid', md: 'Releases **hydrogen ions**, $\\ce{H+}$, in water. Sour; pH below 7. Examples: $\\ce{HCl}$, $\\ce{H2SO4}$, $\\ce{HNO3}$.' },
        { kind: 'callout', id: 'base', tone: 'definition', title: 'Base and alkali', md: 'A **base** neutralizes an acid. An **alkali** is a base that **dissolves in water**, releasing **hydroxide ions**, $\\ce{OH-}$; pH above 7.' },
        { kind: 'callout', id: 'safe', tone: 'mistake', title: 'Never taste or touch to test', md: 'Strong acids and alkalis are **corrosive**. Use indicators, and wear eye protection.' },
      ],
      lines: [
        { say: 'An acid is a substance that releases hydrogen ions, H plus, in water. Acids taste sour and have a pH below seven. Hydrochloric, sulfuric and nitric acids are common in the lab.', show: 'acid' },
        { say: 'A base is a substance that neutralizes an acid. An alkali is a base that dissolves in water. Alkalis release hydroxide ions, O H minus, and have a pH above seven.', show: 'base' },
        { say: 'So every alkali is a base, but not every base is an alkali. Copper oxide neutralizes acids, so it is a base, but it does not dissolve in water, so it is not an alkali.' },
        { say: 'Strong acids and alkalis are corrosive: they damage skin and eyes. So we never taste or touch them to find out. We use indicators instead.', show: 'safe' },
      ],
    },
    {
      chapter: 'Indicators',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ind',
          head: ['Indicator', 'In acid', 'Neutral', 'In alkali'],
          rows: [
            ['blue litmus', 'red', 'blue', 'blue'],
            ['red litmus', 'red', 'red', 'blue'],
            ['phenolphthalein', 'colourless', 'colourless', 'pink'],
            ['universal indicator', 'red, orange or yellow', 'green', 'blue or purple'],
          ],
        },
      ],
      lines: [
        { say: 'An indicator is a dye that has different colours in acids and alkalis.', show: 'ind' },
        { say: 'Litmus is red in acid and blue in alkali. Blue litmus turns red in an acid, and red litmus turns blue in an alkali.', show: ['ind.0', 'ind.1'], focus: 'ind.1' },
        { say: 'Phenolphthalein is colourless in acid, and turns pink in an alkali.', show: 'ind.2', focus: 'ind.2' },
        { say: 'Litmus only tells you acid or alkali. Universal indicator is a mixture of dyes, and its colour shows how acidic or alkaline a solution is, from red, through green, to purple.', show: 'ind.3', focus: 'ind.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A solution turns red litmus blue and phenolphthalein pink. What is it?',
          choices: ['an acid', 'pure water', 'a neutral salt solution', 'an alkali'],
          answer: 3,
          working: 'Both changes happen only in alkalis.',
        },
      ],
      lines: [
        { say: 'Your turn. A solution turns red litmus blue, and phenolphthalein pink. What is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, an alkali. Red litmus turns blue only in an alkali, and phenolphthalein turns pink only in an alkali.', show: 'q.answer' },
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
            'Acids release $\\ce{H+}$ ions and turn blue litmus red.',
            'Bases neutralize acids; alkalis are soluble bases that release $\\ce{OH-}$.',
            'Litmus: red in acid, blue in alkali. Phenolphthalein: pink in alkali.',
            'Universal indicator shows how acidic or alkaline.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Acids release hydrogen ions, taste sour and turn blue litmus red.', show: 'sum.0' },
        { say: 'Bases neutralize acids, and alkalis are bases that dissolve and release hydroxide ions.', show: 'sum.1' },
        { say: 'Litmus is red in acid and blue in alkali, and phenolphthalein is pink in alkali.', show: 'sum.2' },
        { say: 'And universal indicator shows how acidic or alkaline a solution is. Next, you will put a number on it, with the pH scale.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
