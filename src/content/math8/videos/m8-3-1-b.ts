import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { marbles } from '@/video/charts.ts';
import { brace, tag } from './lib/m8-3-figures.ts';

// The class as dots: 12 students who walk (green) above 13 who ride the bus (blue), and the whole class bracketed.
const school = (id: string) =>
  figure(
    id,
    [
      marbles({ name: 'w', groups: [{ id: 'all', count: 12, tone: 'good' }], perRow: 13 }),
      marbles({ name: 'b', groups: [{ id: 'all', count: 13, tone: 'adj' }], perRow: 13, at: [0, -1.3] }),
      tag('wn', [-0.8, 0], '\\text{Walk: } 12', { place: 'left', tone: 'good' }),
      tag('bn', [-0.8, -1.3], '\\text{Bus: } 13', { place: 'left', tone: 'adj' }),
      brace('all', [12.8, 0.55], [12.8, -1.85], [-1, 0], '\\text{Class: } 25'),
    ],
    230,
  );

const video: Explainer = {
  id: 'm8-3-1-b',
  lessonId: 'm8-3-1',
  title: 'Two-Term and Three-Term Ratios, Part 2: Part-to-Part and Part-to-Whole',
  thumbnailTitle: 'Part-to-Part and Part-to-Whole',
  thumbnail: 'cl',
  summary:
    'A part-to-part ratio compares one part of a group with another part, and a part-to-whole ratio compares one part with the whole group. In a class where 12 students walk and 13 ride the bus, walkers to bus riders is 12 : 13, and walkers to all 25 students is 12 : 25. A part-to-whole ratio can be written as a fraction or a percent: 12/25 = 48/100 = 48%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 2', title: 'Part-to-Part and Part-to-Whole', subtitle: 'Comparing a part with the whole' }],
      lines: [
        { say: 'A class has twelve students who walk to school and thirteen who ride the bus. You can compare the walkers with the bus riders, or with the whole class.', show: 'title' },
        { say: 'In this part, you will learn the difference between a part-to-part ratio and a part-to-whole ratio, and write a part-to-whole ratio as a fraction and a percent.' },
      ],
    },
    {
      chapter: 'Parts of a group',
      layout: 'center',
      main: [
        school('cl'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Part-to-part ratio', md: 'A **part-to-part ratio** compares one part of a group with another part of the same group.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{walkers to bus riders} = \\good{12} : \\adj{13}'] },
      ],
      lines: [
        { say: 'Here is the class. Each dot is one student. Twelve students walk to school.', show: ['cl.w-all', 'cl.wn'] },
        { say: 'And thirteen students ride the bus.', show: ['cl.b-all', 'cl.bn'] },
        { say: 'The walkers and the bus riders are two parts of the same group: the class. A part-to-part ratio compares one part of a group with another part of the same group.', show: 'def' },
        { say: 'So the ratio of walkers to bus riders is twelve to thirteen. It is a part-to-part ratio.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Part to whole',
      layout: 'center',
      main: [
        school('cl'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Part-to-whole ratio', md: 'A **part-to-whole ratio** compares one part with the **whole** group.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['12 + 13 = 25', '\\text{walkers to all students} = \\good{12} : 25'] },
      ],
      lines: [
        { say: 'Now compare the walkers with the whole class. First, find the whole. Twelve plus thirteen is twenty-five students.', show: ['cl.w-all', 'cl.wn', 'cl.b-all', 'cl.bn', 'cl.all', 'm.0'], focus: ['cl.all', 'm.0'] },
        { say: 'A part-to-whole ratio compares one part with the whole group.', show: 'def' },
        { say: 'So the ratio of walkers to all the students is twelve to twenty-five.', show: 'm.1', focus: ['m.1', 'cl.w-all'] },
        { say: 'Notice the difference. In twelve to thirteen, the second term is another part. In twelve to twenty-five, the second term is the whole class.' },
      ],
    },
    {
      chapter: 'As a fraction and a percent',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['12 : 25 = \\dfrac{12}{25}', '\\dfrac{12}{25} = \\dfrac{12 \\times 4}{25 \\times 4} = \\dfrac{48}{100}', '\\dfrac{48}{100} = 48\\%'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: '**$48\\%$** of the class walk to school.' },
      ],
      lines: [
        { say: 'A part-to-whole ratio can also be written as a fraction. Twelve of the twenty-five students walk, so the fraction of the class that walks is twelve twenty-fifths.', show: 'm.0', focus: 'm.0' },
        { say: 'A percent means out of one hundred. To write the fraction as a percent, make the denominator one hundred. Twenty-five times four is one hundred, so multiply the top and the bottom by four.', show: 'm.1', focus: 'm.1' },
        { say: 'Twelve times four is forty-eight. So twelve twenty-fifths is forty-eight over one hundred, which is forty-eight percent.', show: 'm.2', focus: 'm.2' },
        { say: 'Forty-eight percent of the class walk to school.', show: 'a' },
      ],
    },
    {
      chapter: 'The bus riders',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Ratio', 'Kind', 'As a percent'],
          rows: [
            ['Bus riders to walkers, $13 : 12$', 'Part to part', '—'],
            ['Bus riders to all students, $13 : 25$', 'Part to whole', '$\\dfrac{13}{25} = \\dfrac{52}{100} = 52\\%$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['48\\% + 52\\% = 100\\%'] },
      ],
      lines: [
        { say: 'Let’s practise with the bus riders. The ratio of bus riders to walkers is thirteen to twelve. It compares two parts, so it is a part-to-part ratio.', show: 't.0' },
        { say: 'The ratio of bus riders to all the students is thirteen to twenty-five. It compares a part with the whole, so it is a part-to-whole ratio.', show: 't.1' },
        { say: 'As a percent, thirteen twenty-fifths is fifty-two over one hundred, or fifty-two percent.', focus: 't.1' },
        { say: 'And forty-eight percent plus fifty-two percent is one hundred percent. The two parts make up the whole class.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Which whole?', md: '$12 : 13$ compares walkers with bus riders. The fraction of the class that walks is $\\dfrac{12}{25}$, **not** $\\dfrac{12}{13}$.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. To find the fraction of the class that walks, someone writes twelve thirteenths.', show: 'oops' },
        { say: 'But thirteen is the number of bus riders, not the whole class. A fraction of the class needs the whole class on the bottom: twelve twenty-fifths.' },
        { say: 'Before you write a fraction or a percent, ask yourself: what is the whole?' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A fruit bowl has $9$ apples and $11$ oranges. What percent of the fruit are apples?',
          choices: ['$9\\%$', '$55\\%$', '$90\\%$', '$45\\%$'],
          answer: 3,
          working: 'The whole bowl is $9 + 11 = 20$ pieces of fruit. Apples to the whole: $\\tfrac{9}{20} = \\tfrac{45}{100} = 45\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A fruit bowl has nine apples and eleven oranges. What percent of the fruit are apples? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, forty-five percent. The whole bowl is nine plus eleven, which is twenty pieces of fruit. Nine twentieths is forty-five over one hundred, or forty-five percent. Choice B, fifty-five percent, is the percent of the fruit that are oranges.', show: 'q.answer' },
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
            'A **part-to-part ratio** compares two parts of a group: walkers to bus riders is $12 : 13$.',
            'A **part-to-whole ratio** compares a part with the whole group: walkers to all students is $12 : 25$.',
            'A part-to-whole ratio can be a fraction or a percent: $\\dfrac{12}{25} = \\dfrac{48}{100} = 48\\%$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A part-to-part ratio compares two parts of a group, like walkers to bus riders.', show: 'sum.0' },
        { say: 'A part-to-whole ratio compares a part with the whole group, like walkers to all the students.', show: 'sum.1' },
        { say: 'And a part-to-whole ratio can be written as a fraction or a percent. In the next part, you will find equivalent ratios. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
