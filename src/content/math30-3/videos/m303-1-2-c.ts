import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueLine } from './lib/m303-1-figures.ts';

// A bushing of 25 +0.2/−0.1 mm: from 24.9 mm to 25.2 mm.
const bushing = () =>
  figure(
    'bu',
    [
      valueLine({
        min: 24.8,
        max: 25.3,
        step: 0.05,
        decimals: 1,
        unit: '\\text{mm}',
        band: { from: 24.9, to: 25.2, group: 'range' },
        ticks: [
          { id: 'nom', value: 25, tex: '25', tone: 'muted', height: 2 },
          { id: 'lo', value: 24.9, tex: '24.9', tone: 'theta', group: 'least' },
          { id: 'hi', value: 25.2, tex: '25.2', tone: 'theta', group: 'greatest' },
        ],
        spans: [
          { id: 'up', from: 25, to: 25.2, tex: '+0.2', tone: 'opp', group: 'greatest' },
          { id: 'down', from: 24.9, to: 25, tex: '-0.1', tone: 'adj', group: 'least' },
        ],
      }),
    ],
    290,
  );

// A 470 Ω resistor with a tolerance of ±5%: ±23.5 Ω, from 446.5 Ω to 493.5 Ω.
const resistor = () =>
  figure(
    're',
    [
      valueLine({
        min: 440,
        max: 500,
        step: 5,
        decimals: 0,
        unit: '\\Omega',
        band: { from: 446.5, to: 493.5, group: 'range' },
        ticks: [
          { id: 'nom', value: 470, tex: '470', tone: 'muted', height: 2 },
          { id: 'lo', value: 446.5, tex: '446.5', tone: 'theta', group: 'limits' },
          { id: 'hi', value: 493.5, tex: '493.5', tone: 'theta', group: 'limits' },
        ],
        spans: [
          { id: 'up', from: 470, to: 493.5, tex: '23.5', tone: 'opp', group: 'tol' },
          { id: 'down', from: 446.5, to: 470, tex: '23.5', tone: 'opp', group: 'tol' },
        ],
      }),
    ],
    290,
  );

const video: Explainer = {
  id: 'm303-1-2-c',
  lessonId: 'm303-1-2',
  title: 'Uncertainty and Tolerance, Part 3: Unequal and Percent Tolerances',
  thumbnailTitle: 'Unequal and Percent Tolerances',
  thumbnail: 'bu',
  summary: 'Unequal tolerances such as 25 +0.2/−0.1 mm (add the top number, subtract the bottom one: a bushing from 24.9 mm to 25.2 mm, a range of 0.3 mm) and percent tolerances (a 470 Ω resistor at ±5% is 470 ± 23.5 Ω, from 446.5 Ω to 493.5 Ω).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits of Measurement · Part 3', title: 'Unequal and Percent Tolerances', subtitle: 'More room on one side, or a percent' }],
      lines: [
        { say: 'Not every tolerance is plus or minus the same amount. Some drawings allow more room on one side than the other, and some give the tolerance as a percent.', show: 'title' },
        { say: 'In this video, you will find the greatest and least acceptable values for both kinds.' },
      ],
    },
    {
      chapter: 'An unequal tolerance',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['25^{\\opp{+0.2}}_{\\adj{-0.1}}\\text{ mm}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'More room on one side', md: 'The size $25^{+0.2}_{-0.1}\\text{ mm}$ (also written $25\\text{ mm}$ $+0.2/{-0.1}$) may be up to [[opp:0.2 mm over]], but only [[adj:0.1 mm under]].' },
      ],
      lines: [
        { say: 'A size written as 25, with plus 0.2 above and minus 0.1 below, means the part may be up to 0.2 millimetres over 25, but only 0.1 millimetres under.', show: ['m.0', 'key'] },
        { say: 'You may also see it written on one line, as 25 millimetres, plus 0.2, slash, minus 0.1. It means the same thing.' },
      ],
    },
    {
      chapter: 'A bushing',
      layout: 'center',
      main: [
        bushing(),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{greatest} = 25 + 0.2 = 25.2\\text{ mm}', '\\text{least} = 25 - 0.1 = 24.9\\text{ mm}', '\\text{range} = 25.2 - 24.9 = 0.3\\text{ mm}'] },
      ],
      lines: [
        { say: 'A bushing, a metal sleeve that lines a hole, has an outside diameter of 25, plus 0.2, minus 0.1 millimetres. Find the greatest and least acceptable diameters, and the tolerance range.', show: ['bu.axis', 'bu.nom'] },
        { say: 'The top number is added. The greatest diameter is 25 plus 0.2, which is 25.2 millimetres.', show: ['bu.greatest', 'm.0'], focus: ['bu.greatest', 'm.0'] },
        { say: 'The bottom number is subtracted. The least diameter is 25 minus 0.1, which is 24.9 millimetres.', show: ['bu.least', 'm.1'], focus: ['bu.least', 'm.1'] },
        { say: 'So acceptable diameters run from 24.9 to 25.2 millimetres. The tolerance range is the gap between those limits: 25.2 minus 24.9, which is 0.3 millimetres.', show: ['bu.range', 'm.2'], focus: ['bu.range', 'm.2'] },
      ],
    },
    {
      chapter: 'A percent tolerance',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A resistor is rated at $470\\ \\Omega$ with a tolerance of $\\pm 5\\%$.' },
        resistor(),
        { kind: 'math', id: 'm', size: 'md', lines: ['0.05 \\times 470 = 23.5\\ \\Omega', '470 + 23.5 = 493.5\\ \\Omega \\qquad 470 - 23.5 = 446.5\\ \\Omega'] },
      ],
      lines: [
        { say: 'Electricians and farmers often see a tolerance as a percent. Change the percent into the unit first.', show: 'q' },
        { say: 'A resistor is rated at 470 ohms, with a tolerance of plus or minus five percent. Ohms are the unit of electrical resistance. What are its greatest and least acceptable values?', show: ['re.axis', 're.nom'] },
        { say: 'Five percent of 470 is 0.05 times 470, which is 23.5 ohms. That is the tolerance, in ohms.', show: ['m.0', 're.tol'], focus: ['m.0', 're.tol'] },
        { say: 'The greatest value is 470 plus 23.5, which is 493.5 ohms. The least is 470 minus 23.5, which is 446.5 ohms.', show: ['m.1', 're.limits', 're.range'], focus: ['m.1', 're.limits'] },
        { say: 'So the resistance may be anywhere from 446.5 to 493.5 ohms.', focus: 're.range' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting the wrong number', md: 'In $25^{+0.2}_{-0.1}$, the top number is **added** and the bottom number is **subtracted**: do not use $\\pm 0.2$ for both limits. And do not add a percent straight onto the nominal value.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{25 - 0.2 = 24.8} \\qquad \\good{25 - 0.1 = 24.9}', '\\bad{470 + 5 = 475} \\qquad \\good{470 + 23.5 = 493.5}'] },
      ],
      lines: [
        { say: 'Two mistakes to watch for. In 25, plus 0.2, minus 0.1, the top number is added and the bottom number is subtracted. Do not use plus or minus 0.2 for both limits: that would make the least value 24.8 instead of 24.9.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'And do not add a percent straight onto the nominal value. 470 plus five is 475, but that adds five ohms, not five percent. Five percent of 470 is 23.5 ohms, so the greatest value is 493.5.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bag of fertilizer is labelled $20\\text{ kg}$, with a tolerance of $\\pm 2\\%$. What is the least acceptable mass?',
          choices: ['$18\\text{ kg}$', '$19.8\\text{ kg}$', '$19.6\\text{ kg}$', '$20.4\\text{ kg}$'],
          answer: 2,
          working: '$2\\%$ of $20$ is $0.02 \\times 20 = 0.4\\text{ kg}$, so the least mass is $20 - 0.4 = 19.6\\text{ kg}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bag of fertilizer is labelled 20 kilograms, with a tolerance of plus or minus two percent. What is the least acceptable mass? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Two percent of 20 is 0.02 times 20, which is 0.4 kilograms, and 20 minus 0.4 is 19.6 kilograms. Choice A subtracts two kilograms, as if the tolerance were two kilograms, not two percent.', show: 'q.answer' },
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
            'For $25^{+0.2}_{-0.1}$, add the top number and subtract the bottom number.',
            'The tolerance range is the greatest value minus the least value.',
            'Change a percent tolerance into the unit first, then add and subtract it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For an unequal tolerance, add the top number for the greatest value, and subtract the bottom number for the least.', show: 'sum.0' },
        { say: 'The tolerance range is the greatest value minus the least value.', show: 'sum.1' },
        { say: 'And change a percent tolerance into the unit first, then add it and subtract it. In part four, we put parts together, and their tolerances add up. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
