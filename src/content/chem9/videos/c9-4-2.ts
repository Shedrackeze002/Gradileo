import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c9-4-2',
  lessonId: 'c9-4-2',
  title: 'The pH Scale',
  thumbnail: 'ph',
  summary:
    'The pH scale runs from 0 to 14: below 7 is acidic, 7 is neutral and above 7 is alkaline. The lower the pH, the more acidic, and the higher, the more alkaline. Each step of 1 is a tenfold change, so 2 steps is 100 times.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Acids and Bases', title: 'The pH Scale', subtitle: 'A number for how acidic or alkaline' }],
      lines: [
        { say: 'Mildly acidic and strongly alkaline are useful words, but chemists want a number.', show: 'title' },
        { say: 'In this video, you will meet the pH scale, which gives every solution a number from battery acid to drain cleaner, and learn how to compare two pH values.' },
      ],
    },
    {
      chapter: 'The pH scale',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ph',
          head: ['pH', 'Example', 'Universal indicator'],
          rows: [
            ['1', 'stomach acid', 'red'],
            ['3', 'vinegar, cola', 'orange'],
            ['5', 'black coffee', 'yellow'],
            ['7', 'pure water', 'green'],
            ['9', 'baking soda solution', 'blue'],
            ['13', 'oven cleaner', 'purple'],
          ],
        },
      ],
      lines: [
        { say: 'The pH scale measures how acidic or alkaline a solution is. It usually runs from zero to fourteen.', show: 'ph' },
        { say: 'A pH below seven is acidic, and the lower the pH, the more strongly acidic. Stomach acid is about one, and turns universal indicator red. Vinegar and cola are about three.', show: ['ph.0', 'ph.1', 'ph.2'], focus: 'ph.1' },
        { say: 'A pH of exactly seven is neutral. Pure water is seven, and universal indicator is green.', show: 'ph.3', focus: 'ph.3' },
        { say: 'A pH above seven is alkaline, and the higher the pH, the more strongly alkaline. Oven cleaner is about thirteen, and turns universal indicator purple.', show: ['ph.4', 'ph.5'], focus: 'ph.5' },
        { say: 'You can measure pH with universal indicator and a colour chart, or more precisely with an electronic pH meter.' },
      ],
    },
    {
      chapter: 'Comparing pH',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ten', tone: 'definition', title: 'A tenfold scale', md: 'Each step of **1** on the pH scale is a **tenfold** change.' },
        { kind: 'math', id: 'ex', size: 'md', lines: ['\\text{pH } 2 \\text{ vs pH } 4: \\; 4 - 2 = 2 \\text{ steps}', '10^2 = 100 \\text{ times more acidic}'] },
      ],
      lines: [
        { say: 'Here is the surprising part. Each step of one on the pH scale is a tenfold change. A solution of pH three is ten times more acidic than one of pH four.', show: 'ten' },
        { say: 'Lemon juice has a pH of two, and tomato juice a pH of four. The difference is two steps.', show: 'ex.0' },
        { say: 'Two steps means ten times ten, so lemon juice is one hundred times more acidic.', show: 'ex.1' },
        { say: 'Be careful not to get this backwards. A lower number means more acidic, so pH two is more acidic than pH five.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many times more acidic is a solution of pH 3 than one of pH 6?',
          choices: ['3 times', '1000 times', '30 times', '300 times'],
          answer: 1,
          working: '6 − 3 = 3 steps, and $10^3 = 1000$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many times more acidic is a solution of pH three than one of pH six? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Six take away three is three steps, and ten times ten times ten is one thousand. So it is a thousand times more acidic.', show: 'q.answer' },
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
            'pH runs from 0 to 14: below 7 acidic, 7 neutral, above 7 alkaline.',
            'Lower pH: more acidic. Higher pH: more alkaline.',
            'Each step of 1 is a tenfold change.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The pH scale runs from zero to fourteen. Below seven is acidic, seven is neutral, and above seven is alkaline.', show: 'sum.0' },
        { say: 'The lower the pH, the more acidic, and the higher, the more alkaline.', show: 'sum.1' },
        { say: 'And each step of one is a tenfold change, so two steps is a hundred times. Next, you will see acids and alkalis cancel each other out.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
