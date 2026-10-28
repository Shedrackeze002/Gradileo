import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { indicatorBars } from './lib/c10-5-figures.ts';

// Methyl orange and phenolphthalein across the pH scale, and where both clues are true.
const clues = figure('b', [
  indicatorBars({
    bars: [
      { id: 'mo', tex: '\\text{methyl orange}', lo: 3.1, hi: 4.4, tones: ['bad', 'opp', 'theta'], words: ['red', '', 'yellow'], wordsAt: [1.55, 0, 11] },
      { id: 'ph', tex: '\\text{phenolphthalein}', lo: 8.2, hi: 10.0, tones: ['muted', 'hyp', 'hyp'], shades: [0.08, 0.3, 0.7], words: ['colourless', '', 'pink'], wordsAt: [2.2, 0, 12] },
    ],
    windows: [{ id: 'both', from: 4.4, to: 8.2, tex: '\\text{pH between 4.4 and 8.2}' }],
  }),
]);

const video: Explainer = {
  id: 'c10-5-3-d',
  lessonId: 'c10-5-3',
  title: 'Acids, Bases and the pH Scale, Part 4: Using Two Indicators',
  thumbnailTitle: 'Using Two Indicators',
  thumbnail: 'b',
  summary:
    'Phenolphthalein and red litmus do not change colour in acidic or neutral solutions, so no change does not prove a solution is acidic. Each indicator changes colour over its own small range of pH, so two indicators can narrow down a pH: if methyl orange is yellow and phenolphthalein is colourless, the pH is between 4.4 and 8.2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 4', title: 'Using Two Indicators', subtitle: 'Narrowing down the pH' }],
      lines: [
        { say: 'One indicator can tell you whether a solution is acidic or basic. But a single colour can hide a lot.', show: 'title' },
        { say: 'In this last part, you will see why a colourless result proves little, and how two indicators can narrow down a p H.', caption: 'In this last part, you will see why a colourless result proves little, and how two indicators can narrow down a pH.' },
      ],
    },
    {
      chapter: 'Colourless does not mean acidic',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Colourless does not mean acidic', md: 'Phenolphthalein is colourless in acidic **and** neutral solutions, so a colourless result does not prove that a solution is acidic.' },
        {
          kind: 'table',
          id: 't',
          head: ['Result', 'The solution is'],
          rows: [
            ['phenolphthalein stays colourless', 'acidic **or** neutral'],
            ['red litmus stays red', 'acidic **or** neutral'],
            ['blue litmus turns red', '[[bad:acidic]]'],
          ],
        },
      ],
      lines: [
        { say: 'Phenolphthalein is colourless in acidic and neutral solutions. So a colourless result does not prove that a solution is acidic. It could be neutral.', show: ['oops', 't.0'] },
        { say: 'In the same way, red litmus stays red in both acidic and neutral solutions.', show: 't.1' },
        { say: 'To show that a solution is acidic, use blue litmus, which turns red, or universal indicator.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Colour-change ranges',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Indicator', 'Colour at low pH', 'Changes between pH', 'Colour at high pH'],
          rows: [
            ['methyl orange', '[[bad:red]]', '3.1 and 4.4 ([[opp:orange]])', '[[theta:yellow]]'],
            ['bromothymol blue', '[[theta:yellow]]', '6.0 and 7.6 ([[good:green]])', '[[adj:blue]]'],
            ['phenolphthalein', 'colourless', '8.2 and 10.0 ([[hyp:pale pink]])', '[[hyp:pink]]'],
          ],
        },
      ],
      lines: [
        { say: 'Each indicator changes colour over its own small range of p H. Below the range it shows one colour, above it another, and in between, a mixture of the two.', caption: 'Each indicator changes colour over its own small range of pH. Below the range it shows one colour, above it another, and in between, a mixture of the two.' },
        { say: 'Methyl orange is red below p H three point one, and yellow above four point four. In between, it is orange.', caption: 'Methyl orange is red below pH 3.1, and yellow above 4.4. In between, it is orange.', show: 't.0', focus: 't.0' },
        { say: 'Bromothymol blue is yellow below six point zero, and blue above seven point six.', show: 't.1', focus: 't.1' },
        { say: 'And phenolphthalein is colourless below eight point two, and pink above ten point zero.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Two clues',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A solution is tested with two indicators: methyl orange is yellow in it, and phenolphthalein is colourless. What is its pH?' }, { ...clues, height: 420 }],
      lines: [
        { say: 'A solution is tested with two indicators. Methyl orange is yellow in it, and phenolphthalein is colourless. What is its p H?', caption: 'A solution is tested with two indicators. Methyl orange is yellow in it, and phenolphthalein is colourless. What is its pH?', show: ['q', 'b.axis', 'b.mo', 'b.ph'] },
        { say: 'Methyl orange is yellow only above four point four. So the p H is above four point four.', caption: 'Methyl orange is yellow only above 4.4. So the pH is above 4.4.', focus: 'b.mo-s2' },
        { say: 'Phenolphthalein is colourless only below eight point two. So the p H is below eight point two.', caption: 'Phenolphthalein is colourless only below 8.2. So the pH is below 8.2.', focus: 'b.ph-s0' },
        { say: 'Both are true only between the two. The p H is between four point four and eight point two.', caption: 'Both are true only between the two. The pH is between 4.4 and 8.2.', show: 'b.both', focus: 'b.both' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Bromothymol blue is yellow below pH 6.0 and blue above 7.6. Phenolphthalein is colourless below pH 8.2 and pink above 10.0. In a solution, bromothymol blue is blue and phenolphthalein is colourless. What is its pH?',
          choices: ['pH between 7.6 and 8.2', 'pH below 6.0', 'pH between 6.0 and 7.6', 'pH above 10.0'],
          answer: 0,
          working: 'Bromothymol blue is blue, so the pH is above 7.6. Phenolphthalein is colourless, so the pH is below 8.2. Both are true only between 7.6 and 8.2.',
        },
      ],
      lines: [
        { say: 'Your turn. In a solution, bromothymol blue is blue, and phenolphthalein is colourless. What is its p H? Pause the video and try it.', caption: 'Your turn. In a solution, bromothymol blue is blue, and phenolphthalein is colourless. What is its pH? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Blue bromothymol blue means the p H is above seven point six, and colourless phenolphthalein means it is below eight point two. So the p H is between seven point six and eight point two.', caption: 'The answer is A. Blue bromothymol blue means the pH is above 7.6, and colourless phenolphthalein means it is below 8.2. So the pH is between 7.6 and 8.2.', show: 'q.answer' },
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
            'Phenolphthalein and red litmus do not change in acidic **or** neutral solutions, so no change does not prove a solution is acidic.',
            'Each indicator changes colour over its own small range of pH.',
            'Two indicators can narrow down a pH: it must fit both colours.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Phenolphthalein and red litmus do not change colour in acidic or neutral solutions, so no change does not prove a solution is acidic.', show: 'sum.0' },
        { say: 'Each indicator changes colour over its own small range of p H.', caption: 'Each indicator changes colour over its own small range of pH.', show: 'sum.1' },
        { say: 'So two indicators can narrow down a p H, because it must fit both colours. Now you can classify, compare and test acids and bases. Thanks for watching!', caption: 'So two indicators can narrow down a pH, because it must fit both colours. Now you can classify, compare and test acids and bases. Thanks for watching!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
