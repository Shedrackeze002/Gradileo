import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hundredGrid } from './lib/m5-6-figures.ts';

// 35 squares yellow and the other 65 blue.
const split = (id: string) => figure(id, [hundredGrid({ shaded: 35, restTone: 'adj' })]);

// 25 students as blocks of 4 squares: 8 take the bus (32 squares) and 17 walk (68 squares).
const bus = (id: string) => figure(id, [hundredGrid({ block: [2, 2], shaded: 8, tone: 'theta', restTone: 'good' })]);

const video: Explainer = {
  id: 'm5-6-2-c',
  lessonId: 'm5-6-2',
  title: 'Ratios, Fractions, Decimals and Percentages, Part 3: The Rest of the Whole',
  thumbnailTitle: 'The Rest of the Whole',
  thumbnail: 'bs',
  summary: 'The parts of a whole add up to 100%, so subtracting one part from 100% gives the rest: 35% shaded leaves 65% unshaded, and when 8 of 25 students take the bus (32%), 100% − 32% = 68% walk, which checks out as 17/25 = 68/100.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios and Percentages · Part 3', title: 'The Rest of the Whole', subtitle: 'All the parts make one hundred percent' }],
      lines: [
        { say: 'In a class, some students take the bus to school, and the rest walk. If you know what percentage take the bus, can you find what percentage walk?', show: 'title' },
        { say: 'In this video, you will see that the parts of a whole always add up to one hundred percent, and use that to find the rest of a whole.' },
      ],
    },
    {
      chapter: 'The whole is 100%',
      layout: 'split',
      leftWidth: 480,
      left: [split('sp')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['100 - 35 = 65', '35\\% + 65\\% = 100\\%'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The rest of the whole', md: 'The whole is always $100\\%$. If you know one part, subtract it from $100\\%$ to find the rest.' },
      ],
      lines: [
        { say: 'Here is a hundred grid. Thirty-five of its squares are yellow.', show: ['sp.grid', 'sp.outline', 'sp.shade'] },
        { say: 'The rest of the squares are blue. How many are blue? The whole grid is one hundred squares, so one hundred minus thirty-five is sixty-five. Sixty-five percent are blue.', show: ['sp.rest', 'm.0'], focus: ['sp.rest', 'm.0'] },
        { say: 'Thirty-five percent plus sixty-five percent is one hundred percent: the whole grid.', show: 'm.1', focus: 'm.1' },
        { say: 'The whole is always one hundred percent. So if you know one part, subtract it from one hundred percent to find the rest.', show: 'key' },
      ],
    },
    {
      chapter: 'The bus',
      layout: 'split',
      leftWidth: 480,
      left: [bus('bs')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'In a class of $25$ students, $8$ take the bus. The rest walk. What percentage take the bus? What percentage walk?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{8}{25} = \\dfrac{8 \\times 4}{25 \\times 4} = \\dfrac{32}{100}', '\\text{bus: } 32\\%'] },
      ],
      lines: [
        { say: 'In a class of twenty-five students, eight take the bus. The rest walk. What percentage take the bus? What percentage walk?', show: 'q' },
        { say: 'Start with the bus. Eight of the twenty-five students take the bus: eight over twenty-five.' },
        { say: 'Make the whole one hundred. Twenty-five times four is one hundred, so multiply the part by four as well. Eight times four is thirty-two.', show: 'm.0', focus: 'm.0' },
        { say: 'In the grid, each student is a block of four squares. The eight yellow blocks make thirty-two squares out of one hundred.', show: ['bs.grid', 'bs.blocks', 'bs.outline', 'bs.shade'], focus: 'bs.shade' },
        { say: 'So thirty-two percent of the class takes the bus.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The rest walk',
      layout: 'split',
      leftWidth: 480,
      left: [bus('bs2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{walk: } 100\\% - 32\\% = 68\\%', '25 - 8 = 17', '\\dfrac{17}{25} = \\dfrac{17 \\times 4}{25 \\times 4} = \\dfrac{68}{100}\\;\\checkmark'] }],
      lines: [
        { say: 'Now the walkers. They are the rest of the whole. One hundred percent minus thirty-two percent is sixty-eight percent.', show: ['bs2.grid', 'bs2.blocks', 'bs2.outline', 'bs2.shade', 'bs2.rest', 'm.0'], focus: ['m.0', 'bs2.rest'] },
        { say: 'Let’s check. Twenty-five minus eight is seventeen, so seventeen students walk. They are the seventeen green blocks.', show: 'm.1', focus: 'm.1' },
        { say: 'Seventeen over twenty-five: multiply the part and the whole by four. Seventeen times four is sixty-eight, so it is sixty-eight over one hundred.', show: 'm.2', focus: 'm.2' },
        { say: 'That is sixty-eight percent. It matches! Thirty-two percent take the bus, and sixty-eight percent walk.' },
      ],
    },
    {
      chapter: 'More than two parts',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'In a vote for a class sport, $40\\%$ choose soccer and $35\\%$ choose swimming. The rest choose basketball.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['40\\% + 35\\% = 75\\%', '100\\% - 75\\% = 25\\%'] },
      ],
      lines: [
        { say: 'This works for more than two parts as well. In a vote for a class sport, forty percent choose soccer, and thirty-five percent choose swimming. The rest choose basketball.', show: 't' },
        { say: 'First, add the parts you know. Forty percent plus thirty-five percent is seventy-five percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Then subtract from the whole. One hundred percent minus seventy-five percent is twenty-five percent. So twenty-five percent choose basketball.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a class of $20$ students, $7$ bring lunch from home. The rest buy lunch at school. What percentage **buy lunch**?',
          choices: ['$35\\%$', '$13\\%$', '$70\\%$', '$65\\%$'],
          answer: 3,
          working: 'Home: $\\dfrac{7}{20} = \\dfrac{35}{100} = 35\\%$. Buy lunch: $100\\% - 35\\% = 65\\%$. Check: $\\dfrac{13}{20} = \\dfrac{65}{100}$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a class of twenty students, seven bring lunch from home. The rest buy lunch at school. What percentage buy lunch? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, sixty-five percent. Seven over twenty is thirty-five over one hundred, so thirty-five percent bring lunch, and one hundred percent minus thirty-five percent is sixty-five percent. Choice A is the students who bring lunch from home, not the rest.', show: 'q.answer' },
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
          items: ['The whole is always $100\\%$, and the parts add up to $100\\%$.', 'To find the rest, subtract the part you know from $100\\%$.', 'Check by finding the rest as a fraction of the whole.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The whole is always one hundred percent, and the parts add up to one hundred percent.', show: 'sum.0' },
        { say: 'To find the rest, subtract the part you know from one hundred percent.', show: 'sum.1' },
        { say: 'And check by finding the rest as a fraction of the whole. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
