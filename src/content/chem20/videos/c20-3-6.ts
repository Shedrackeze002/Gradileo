import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-3-6',
  lessonId: 'c20-3-6',
  title: 'Acids, Bases and Neutralisation, Part 1: Testing Solutions',
  thumbnailTitle: 'Testing Solutions',
  thumbnail: false,
  summary:
    'Acidic, basic and neutral solutions can be told apart by experiment. Acids turn blue litmus red and bromothymol blue yellow, react with magnesium to release hydrogen, and have a pH below 7; bases turn red litmus blue and phenolphthalein pink, and have a pH above 7. One test may not be enough: phenolphthalein is colourless in acids and in neutral solutions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 1', title: 'Testing Solutions', subtitle: 'Acidic, basic or neutral?' }],
      lines: [
        { say: 'Lemon juice and vinegar taste sour. Soap and many cleaning products feel slippery. Pure water is neither.', show: 'title' },
        { say: 'Long before anyone knew about ions, chemists sorted solutions into acids and bases by what they do. And the two groups turned out to cancel each other out.' },
        { say: 'In this video, you will tell acidic, basic and neutral solutions apart by experiment. Later parts explain them with ions, and predict what forms when an acid neutralises a base.' },
      ],
    },
    {
      chapter: 'Indicators',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Indicator', md: 'An **indicator** is a substance whose colour depends on whether a solution is acidic, basic or neutral.' },
        {
          kind: 'table',
          id: 't',
          head: ['Indicator', 'Acidic solution', 'Basic solution', 'Neutral solution'],
          rows: [
            ['Litmus paper', 'blue litmus turns [[bad:red]]', 'red litmus turns [[adj:blue]]', 'neither paper changes'],
            ['Bromothymol blue', '[[theta:yellow]]', '[[adj:blue]]', '[[good:green]]'],
            ['Phenolphthalein', 'colourless', '[[hyp:pink]]', 'colourless'],
          ],
        },
      ],
      lines: [
        { say: 'A description built only on what you can observe is called empirical. The empirical tests for acids and bases are quick, and need no theory at all. The most common use an indicator.' },
        { say: 'An indicator is a substance whose colour depends on whether a solution is acidic, basic or neutral.', show: 'def' },
        { say: 'Acidic solutions turn blue litmus paper red, and basic solutions turn red litmus paper blue. In a neutral solution, neither paper changes colour.', show: 't.0', focus: 't.0' },
        { say: 'Bromothymol blue is yellow in an acidic solution, blue in a basic one, and green when the solution is neutral.', show: 't.1', focus: 't.1' },
        { say: 'Phenolphthalein turns pink in a basic solution. In acidic and neutral solutions, it stays colourless.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'More tests',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Test', 'Acidic solution', 'Basic solution', 'Neutral solution'],
          rows: [
            ['Magnesium ribbon', 'bubbles of hydrogen', 'no reaction', 'no reaction'],
            ['pH at $25^\\circ\\text{C}$', 'below 7', 'above 7', '7'],
            ['Conductivity', 'conducts', 'conducts', 'only if it contains ions'],
            ['Neutralises', 'bases', 'acids', 'neither'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Mg(s) + 2HCl(aq) -> MgCl2(aq) + H2(g)}'] },
      ],
      lines: [
        { say: 'Acids react with active metals, such as magnesium and zinc, releasing hydrogen gas. Magnesium and hydrochloric acid produce magnesium chloride, and hydrogen.', show: ['t.0', 'm'], focus: 't.0' },
        { say: 'The p H scale measures how acidic or basic a solution is. Below seven is acidic, seven is neutral, and above seven is basic. You will meet it properly in lesson three point seven.', caption: 'The pH scale measures how acidic or basic a solution is. Below 7 is acidic, 7 is neutral, and above 7 is basic. You will meet it properly in lesson 3.7.', show: 't.1', focus: 't.1' },
        { say: 'Acidic and basic solutions both conduct electricity, because they contain ions. A neutral solution conducts only if it has ions too: salt water does, but sugar water does not.', show: 't.2', focus: 't.2' },
        { say: 'And the two groups cancel out: an acid neutralises a base, and a base neutralises an acid.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'One test may not be enough',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A colourless solution turns phenolphthalein **pink**. Is it acidic, basic or neutral? What would it do to red litmus paper and to bromothymol blue?' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'One test may not be enough', md: 'Phenolphthalein is colourless in acidic **and** neutral solutions, and red litmus stays red in both. To show that a solution is acidic, use blue litmus (turns red) or bromothymol blue (turns yellow).' },
      ],
      lines: [
        { say: 'A colourless solution turns phenolphthalein pink. Is it acidic, basic or neutral?', show: 'q' },
        { say: 'Phenolphthalein turns pink only in a basic solution. So this solution is basic. It turns red litmus paper blue, and bromothymol blue indicator blue.' },
        { say: 'But a colourless result would not prove that a solution is acidic: phenolphthalein is colourless in neutral solutions as well. In the same way, red litmus stays red in both.', show: 'oops' },
        { say: 'To show that a solution is acidic, use blue litmus, which turns red, or bromothymol blue, which turns yellow. And never taste a lab chemical: use indicators, and wear eye protection.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which observation shows that a solution is acidic?',
          choices: ['Phenolphthalein stays colourless.', 'Red litmus paper stays red.', 'Bromothymol blue turns yellow.', 'The solution conducts electricity.'],
          answer: 2,
          working: 'Bromothymol blue is yellow only in an acidic solution. Phenolphthalein and red litmus do not change in acidic or neutral solutions, and basic solutions conduct as well.',
        },
      ],
      lines: [
        { say: 'Your turn. Which observation shows that a solution is acidic? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Bromothymol blue turns yellow only in an acidic solution. Choices A and B would also happen in a neutral solution, and basic solutions conduct electricity too.', show: 'q.answer' },
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
            'Acidic: blue litmus turns red, bromothymol blue turns yellow, magnesium releases hydrogen, pH below 7.',
            'Basic: red litmus turns blue, phenolphthalein turns pink, pH above 7.',
            'Neutral: pH 7, and neither litmus paper changes colour.',
            'Phenolphthalein and red litmus cannot tell an acid from a neutral solution.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Acidic solutions turn blue litmus red and bromothymol blue yellow, react with magnesium, and have a p H below seven.', caption: 'Let’s sum up. Acidic solutions turn blue litmus red and bromothymol blue yellow, react with magnesium, and have a pH below 7.', show: 'sum.0' },
        { say: 'Basic solutions turn red litmus blue and phenolphthalein pink, and have a p H above seven.', caption: 'Basic solutions turn red litmus blue and phenolphthalein pink, and have a pH above 7.', show: 'sum.1' },
        { say: 'Neutral solutions have a p H of seven, and change neither litmus paper.', caption: 'Neutral solutions have a pH of 7, and change neither litmus paper.', show: 'sum.2' },
        { say: 'And phenolphthalein and red litmus cannot tell an acid from a neutral solution. In part two, you will see why acids and bases behave as they do: hydronium and hydroxide ions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
