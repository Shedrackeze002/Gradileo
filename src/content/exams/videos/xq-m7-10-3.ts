import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pieAngles } from '@/content/math7/videos/lib/m7-10-figures.ts';

// Exam question for Math 7 lesson 10.3 (circle graphs). The question is a Check Your Understanding
// exercise from OpenStax Contemporary Mathematics, word for word (section 8.2, Visualizing Data,
// CC BY-NC-SA 4.0). Of the 24 animals, 12 are mammals, 5 birds, 4 reptiles and 3 amphibians, so
// the shares are 50%, about 20.8%, about 16.7% and 12.5%, and the central angles are 180°, 75°,
// 60° and 45°.

const ANIMALS = 'Mammal Mammal Reptile Bird Mammal Amphibian Mammal Mammal Mammal Reptile Mammal Bird Mammal Bird Reptile Reptile Amphibian Mammal Bird Mammal Amphibian Mammal Mammal Bird'.split(' ');

const QUESTION = `The medical office at a zoo tracks the animals it treats each week. The table shows the classifications for a particular week: ${ANIMALS.join(', ')}. Create a pie chart of the data using technology.`;

const SLICES = [
  { label: '\\text{Mammal } 50\\%', value: 12, tone: 'adj' as const },
  { label: '\\text{Bird } 20.8\\%', value: 5, tone: 'opp' as const },
  { label: '\\text{Reptile } 16.7\\%', value: 4, tone: 'good' as const },
  { label: '\\text{Amphibian } 12.5\\%', value: 3, tone: 'theta' as const },
];

const graph = (id: string) => figure(id, [pieAngles({ slices: SLICES, namesOnly: true, angles: ['180^\\circ', '75^\\circ', '60^\\circ', '45^\\circ'], arc: 34, dist: 95, pad: 3.2 })], 520);

const video: Explainer = {
  id: 'xq-m7-10-3',
  lessonId: '',
  exam: {
    lesson: 'm7-10-3',
    source: 'OpenStax, Contemporary Mathematics, Check Your Understanding in section 8.2, Visualizing Data',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/8-2-visualizing-data',
    question: QUESTION,
  },
  title: 'Exam Question: The Animals at the Zoo Clinic (Circle Graphs)',
  thumbnailTitle: 'Animals at the Zoo Clinic',
  thumbnail: 'pg',
  summary:
    'A real test question, solved one small step at a time: a zoo\'s medical office treated 24 animals in one week, listed by classification. Make a pie chart, or circle graph, of the data. Counting gives 12 mammals, 5 birds, 4 reptiles and 3 amphibians. Each share of the 24 is a share of the circle\'s 360°: 12/24 × 360° = 180°, 5/24 × 360° = 75°, 4/24 × 360° = 60° and 3/24 × 360° = 45°, or 50%, about 20.8%, about 16.7% and 12.5%. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Animals at the Zoo Clinic', subtitle: 'Circle graphs, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about circle graphs. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: QUESTION,
          answer: 'Mammal $180^\\circ$ ($50$%), Bird $75^\\circ$, Reptile $60^\\circ$, Amphibian $45^\\circ$',
          working: 'count each; share of 24 × 360°',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'The medical office at a zoo tracks the animals it treats each week. The table shows the classifications for a particular week, 24 animals in all. Create a pie chart of the data using technology.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Pie chart', md: 'A **pie chart**, or **circle graph**, splits a circle into **sectors**, one for each category. Each sector\'s share of the circle is that category\'s share of the data. A spreadsheet can draw it, but we will work out what it draws, so we know it is right.' }],
      lines: [
        { say: 'A pie chart, also called a circle graph, splits a circle into sectors, one for each kind of animal. Each sector\'s share of the circle is that kind\'s share of the data.', show: 'c' },
        { say: 'A spreadsheet can draw it for us. But we will work out what it draws, so we know it is right.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{share} = \\dfrac{\\text{count}}{\\text{total}}', '\\text{central angle} = \\text{share} \\times 360^\\circ'] }],
      lines: [
        { say: 'Here is what we need. Each category\'s share is its count divided by the total.', show: 'm.0' },
        { say: 'A full circle is 360 degrees, so each sector\'s angle at the centre is its share times 360 degrees.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Count** each kind of animal', 'Find each **share** of the $24$', 'Find each **angle**, then draw the graph'] }],
      lines: [
        { say: 'Here is the plan. Count each kind of animal.', show: 'plan.0' },
        { say: 'Find each kind\'s share of the 24.', show: 'plan.1' },
        { say: 'Then find each angle, and draw the graph.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Count',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{\\text{Mammal}} = 12, \\quad \\opp{\\text{Bird}} = 5', '\\good{\\text{Reptile}} = 4, \\quad \\thc{\\text{Amphibian}} = 3', '12 + 5 + 4 + 3 = 24 \\ \\checkmark'] }],
      lines: [
        { say: 'Step one. Count each kind in the table. There are 12 mammals and 5 birds.', show: 'm.0', focus: 'm.0' },
        { say: 'There are 4 reptiles and 3 amphibians.', show: 'm.1', focus: 'm.1' },
        { say: '12 plus 5 plus 4 plus 3 is 24, so we counted every animal.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: Shares and angles',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{Mammal: } \\tfrac{12}{24} = 50\\%, \\quad \\tfrac{12}{24} \\times 360^\\circ = \\good{180^\\circ}',
            '\\text{Bird: } \\tfrac{5}{24} \\approx 20.8\\%, \\quad \\tfrac{5}{24} \\times 360^\\circ = \\good{75^\\circ}',
            '\\text{Reptile: } \\tfrac{4}{24} \\approx 16.7\\%, \\quad \\tfrac{4}{24} \\times 360^\\circ = \\good{60^\\circ}',
            '\\text{Amphibian: } \\tfrac{3}{24} = 12.5\\%, \\quad \\tfrac{3}{24} \\times 360^\\circ = \\good{45^\\circ}',
          ],
        },
      ],
      lines: [
        { say: 'Step two and three. Mammals are 12 out of 24, which is one half, or 50 percent. Half of 360 degrees is 180 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Birds are 5 out of 24, about 20.8 percent. 5 twenty fourths of 360 degrees: 360 divided by 24 is 15, and 5 times 15 is 75 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'Reptiles are 4 out of 24, about 16.7 percent. 4 times 15 is 60 degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'Amphibians are 3 out of 24, 12.5 percent. 3 times 15 is 45 degrees.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 4: Draw the graph',
      layout: 'center',
      main: [graph('pg')],
      lines: [
        { say: 'Step four. Draw the sectors with these angles. Mammals take half the circle, 180 degrees.', show: ['pg.s0', 'pg.a0'], focus: 'pg.s0' },
        { say: 'Then birds, 75 degrees, and reptiles, 60 degrees.', show: ['pg.s1', 'pg.a1', 'pg.s2', 'pg.a2'] },
        { say: 'And amphibians fill the rest, 45 degrees. A spreadsheet would draw exactly this pie chart.', show: ['pg.s3', 'pg.a3'], focus: 'pg.s3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['180^\\circ + 75^\\circ + 60^\\circ + 45^\\circ = 360^\\circ \\ \\checkmark', '50\\% + 20.8\\% + 16.7\\% + 12.5\\% = 100\\% \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The angles must make a full circle: 180 plus 75 plus 60 plus 45 is 360 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'And the percents add to 100 percent. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['Bird $5^\\circ$', 'used the **count** as the angle: multiply the **share** by $360^\\circ$'],
            ['Mammal $12\\%$', 'used the count as a percent: **divide** by the total, $24$'],
            ['Bird $74.9^\\circ$', 'used the **rounded** percent: find the angle from $\\tfrac{5}{24}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'A bird sector of 5 degrees uses the count as the angle. The angle is the share times 360 degrees.' },
        { say: 'Mammals at 12 percent uses the count as a percent. Divide by the total, 24, first.' },
        { say: 'And 74.9 degrees comes from the rounded 20.8 percent. Work the angle out from the fraction, 5 out of 24, to get exactly 75 degrees.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In a survey, $30$ of $120$ students chose soccer. What is the central angle for soccer in a circle graph?',
          choices: ['$30^\\circ$', '$25^\\circ$', '$120^\\circ$', '$90^\\circ$'],
          answer: 3,
          working: '30 ÷ 120 = 1/4, and 1/4 × 360° = 90°.',
        },
      ],
      lines: [
        { say: 'Your turn. In a survey, 30 of 120 students chose soccer. What is the central angle for soccer in a circle graph? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '30 out of 120 is one quarter, and a quarter of 360 degrees is 90 degrees. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Count** each category', 'Share $=$ count $\\div$ total', 'Angle $=$ share $\\times 360^\\circ$', 'Angles add to $360^\\circ$, percents to $100\\%$'] }],
      lines: [
        { say: 'Here is what to remember. Count each category.', show: 'sum.0' },
        { say: 'Its share is the count divided by the total.', show: 'sum.1' },
        { say: 'Its angle is the share times 360 degrees.', show: 'sum.2' },
        { say: 'And check: the angles add to 360 degrees, and the percents to 100 percent. For more on circle graphs, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
