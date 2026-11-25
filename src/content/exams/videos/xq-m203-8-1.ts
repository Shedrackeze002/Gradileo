import type { Explainer } from '@/video/script.ts';
import { barGraph, circleGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-3 lesson 8.1 (bar graphs, histograms and circle graphs). The question is
// an Exercise from OpenStax Contemporary Mathematics, word for word (section 8.2, Visualizing Data,
// CC BY-NC-SA 4.0). Counting the 24 animals gives Amphibian 3, Bird 5, Mammal 12 and Reptile 4, as
// in the book's solution. For the pie chart, each sector is count ÷ 24 × 360°: 45°, 75°, 180° and
// 60°, or 12.5%, 20.8%, 50% and 16.7%. Check: 45 + 75 + 180 + 60 = 360.

const QUESTION =
  'The medical office at a zoo tracks the animals it treats each week. The table shows the classifications for a particular week: Mammal Mammal Reptile Bird Mammal Amphibian Mammal Mammal Mammal Reptile Mammal Bird Mammal Bird Reptile Reptile Amphibian Mammal Bird Mammal Amphibian Mammal Mammal Bird. (a) Create a bar graph of the data without technology. (b) Create a pie chart of the data using technology.';

const bars = () =>
  figure('bg', [barGraph({ categories: ['Amphibian', 'Bird', 'Mammal', 'Reptile'], values: [3, 5, 12, 4], max: 12, step: 2, height: 3, titles: { x: 'Animal', y: 'Animals treated' } })], 480);

const pie = () =>
  figure('pie', [circleGraph({ slices: [{ label: 'Mammal', value: 50 }, { label: 'Bird', value: 20.8 }, { label: 'Reptile', value: 16.7 }, { label: 'Amphibian', value: 12.5 }], percent: true })], 460);

const video: Explainer = {
  id: 'xq-m203-8-1',
  lessonId: '',
  exam: {
    lesson: 'm203-8-1',
    source: 'OpenStax, Contemporary Mathematics, Exercise in section 8.2, Visualizing Data',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/8-2-visualizing-data',
    question: QUESTION,
  },
  title: 'Exam Question: Graphing the Animals at a Zoo (Bar Graphs and Circle Graphs)',
  thumbnailTitle: 'Graph the Zoo’s Week',
  thumbnail: 'pie',
  summary:
    'A real test question, solved one small step at a time: a zoo’s medical office lists the 24 animals it treated in one week. Make a bar graph and a pie chart of the data. First we count each kind: 3 amphibians, 5 birds, 12 mammals and 4 reptiles. The bars go up to those counts. For the pie chart, each sector is its count out of 24, times 360°: 45°, 75°, 180° and 60°. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Graph the Zoo’s Week', subtitle: 'Bar graphs and pie charts, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about bar graphs and pie charts. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'The medical office at a zoo tracks the animals it treats each week. The table shows the classifications for a particular week: Mammal Mammal Reptile Bird Mammal Amphibian Mammal Mammal Mammal Reptile Mammal Bird Mammal Bird Reptile Reptile Amphibian Mammal Bird Mammal Amphibian Mammal Mammal Bird. (a) Create a bar graph of the data without technology. (b) Create a pie chart of the data using technology.',
          answer: '(a) bars of $3$, $5$, $12$ and $4$ (b) sectors of $45^\\circ$, $75^\\circ$, $180^\\circ$ and $60^\\circ$',
          working: 'Count each kind of animal, then each sector is its count ÷ 24 × 360°',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'The medical office at a zoo tracks the animals it treats each week. The table shows the classifications for one week: a list of 24 animals, each one a mammal, a bird, a reptile or an amphibian.' },
        { say: 'Part a: create a bar graph of the data without technology. Part b: create a pie chart of the data using technology.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'f', tone: 'definition', title: 'Frequency', md: 'The **frequency** of a category is how many times it appears in the data. Both graphs start from a table of frequencies.' },
        { kind: 'callout', id: 'g', tone: 'key', title: 'Two graphs', md: 'A **bar graph** shows each **count** as the height of a bar. A **pie chart** shows each count as a **share** of one whole circle.' },
      ],
      lines: [
        { say: 'The list is raw data: one word for each animal. Before we can graph it, we need the frequency of each kind of animal, which is how many times it appears.', show: 'f' },
        { say: 'A bar graph shows each count as the height of a bar. A pie chart shows each count as a share of one whole circle.', show: 'g' },
        { say: 'Technology draws a pie chart for you, but it works out the same angles we will work out by hand. So we will see exactly what it does.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{angle} = \\dfrac{\\text{part}}{\\text{total}} \\times 360^\\circ'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'A whole circle', md: 'A circle has $360^\\circ$. A sector gets the same **fraction** of $360^\\circ$ as its category has of the whole, so the angles add to $360^\\circ$.' },
      ],
      lines: [
        { say: 'Here is what we need. The angle of a sector is the part, divided by the total, times 360 degrees.', show: 'm' },
        { say: 'A circle has 360 degrees. Each sector gets the same fraction of the circle as its category has of the data, so all the angles add up to 360.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Count** each kind of animal', '(a) Draw a **bar** for each count', '(b) Turn each count into an **angle**'] }],
      lines: [
        { say: 'Here is the plan. Count each kind of animal.', show: 'plan.0' },
        { say: 'For part a, draw a bar for each count.', show: 'plan.1' },
        { say: 'For part b, turn each count into an angle for the pie chart.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Count',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Animal', 'Frequency'],
          rows: [
            ['Amphibian', '$3$'],
            ['Bird', '$5$'],
            ['Mammal', '$12$'],
            ['Reptile', '$4$'],
            ['**Total**', '**$24$**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Go through the list and count each kind of animal. Crossing off each word as you count it helps you not to miss one.', show: 't' },
        { say: 'There are 3 amphibians, 5 birds, 12 mammals and 4 reptiles.', focus: ['t.0', 't.1', 't.2', 't.3'] },
        { say: '3 plus 5 plus 12 plus 4 is 24, and the list has 24 animals. So no animal was missed or counted twice.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Step 2: Part (a), the bar graph',
      layout: 'center',
      main: [bars()],
      lines: [
        { say: 'Step two, part a. Draw the axes. The biggest count is 12, so a scale from 0 to 12, going up by 2, fits every bar.', show: 'bg.scale', focus: 'bg.scale' },
        { say: 'Put one bar for each kind of animal along the bottom, all the same width, with a space between them.', show: ['bg.b0', 'bg.b1', 'bg.b2', 'bg.b3'] },
        { say: 'Each bar goes up to its count: 3 amphibians, 5 birds, 12 mammals and 4 reptiles.', show: ['bg.v0', 'bg.v1', 'bg.v2', 'bg.v3'], focus: ['bg.b0', 'bg.b1', 'bg.b2', 'bg.b3'] },
        { say: 'Give the graph its labels, and part a is done. The mammal bar is the tallest: half of the animals treated were mammals.', focus: 'bg.b2' },
      ],
    },
    {
      chapter: 'Step 3: Part (b), the angles',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'a',
          head: ['Animal', 'Frequency', 'Angle', 'Percent'],
          rows: [
            ['Amphibian', '$3$', '$3 \\div 24 \\times 360^\\circ = 45^\\circ$', '$12.5\\%$'],
            ['Bird', '$5$', '$5 \\div 24 \\times 360^\\circ = 75^\\circ$', '$20.8\\%$'],
            ['Mammal', '$12$', '$12 \\div 24 \\times 360^\\circ = 180^\\circ$', '$50\\%$'],
            ['Reptile', '$4$', '$4 \\div 24 \\times 360^\\circ = 60^\\circ$', '$16.7\\%$'],
          ],
        },
      ],
      lines: [
        { say: 'Step three, part b. Each sector is its count out of 24, times 360 degrees.', show: 'a' },
        { say: 'Amphibians: 3 out of 24, times 360, is 45 degrees.', focus: 'a.0' },
        { say: 'Birds: 5 out of 24, times 360, is 75 degrees.', focus: 'a.1' },
        { say: 'Mammals: 12 out of 24 is one half, and half of 360 is 180 degrees.', focus: 'a.2' },
        { say: 'Reptiles: 4 out of 24, times 360, is 60 degrees. The last column gives each share as a percent, the label a pie chart usually shows.', focus: 'a.3' },
      ],
    },
    {
      chapter: 'Step 4: The pie chart',
      layout: 'center',
      main: [pie()],
      lines: [
        { say: 'Step four. Here is the pie chart, the same one technology would draw. The mammal sector is 180 degrees, exactly half of the circle.', show: 'pie', focus: 'pie.s0' },
        { say: 'Then the birds at 75 degrees, the reptiles at 60, and the amphibians at 45. Each sector is labelled with its name and percent.', focus: ['pie.s1', 'pie.s2', 'pie.s3'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['45^\\circ + 75^\\circ + 180^\\circ + 60^\\circ = 360^\\circ \\ \\checkmark', '12.5\\% + 20.8\\% + 50\\% + 16.7\\% = 100\\% \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The four angles add up to 360 degrees, one whole circle.', show: 'm.0' },
        { say: 'And the percents add up to 100. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['Counts add to $23$', 'missed an animal: the counts must add to **24**'],
            ['Mammal $50^\\circ$', 'used the **percent** as the angle: $50\\%$ of $360^\\circ$ is $180^\\circ$'],
            ['Mammal $12^\\circ$', 'used the **count** as the angle: divide by $24$, then times $360^\\circ$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'If your counts add up to 23, you missed an animal. Always check that the counts add up to the 24 in the list.' },
        { say: 'A mammal sector of 50 degrees uses the percent as the angle. 50 percent of a circle is 180 degrees.' },
        { say: 'And a sector of 12 degrees uses the count as the angle. Divide by the total first, then multiply by 360.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A vet clinic saw $40$ animals on Monday: $18$ dogs, $12$ cats, $6$ rabbits and $4$ birds. On a pie chart of the data, what is the angle of the cat sector?',
          choices: ['$30^\\circ$', '$12^\\circ$', '$108^\\circ$', '$43.2^\\circ$'],
          answer: 2,
          working: '$\\frac{12}{40} \\times 360^\\circ = 0.3 \\times 360^\\circ = 108^\\circ$',
        },
      ],
      lines: [
        { say: 'Your turn. A vet clinic saw 40 animals on Monday: 18 dogs, 12 cats, 6 rabbits and 4 birds. On a pie chart of the data, what is the angle of the cat sector? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '12 out of 40 is 0.3, and 0.3 times 360 is 108 degrees. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Count** each category first', 'Bar height $=$ the **count**', 'Angle $= \\dfrac{\\text{part}}{\\text{total}} \\times 360^\\circ$', 'Angles add to $360^\\circ$'] }],
      lines: [
        { say: 'Here is what to remember. Count each category first, and check that the counts add up to the total.', show: 'sum.0' },
        { say: 'On a bar graph, each bar is as tall as its count.', show: 'sum.1' },
        { say: 'On a pie chart, each angle is the part over the total, times 360 degrees.', show: 'sum.2' },
        { say: 'And the angles add up to 360. For more on bar graphs, histograms and circle graphs, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
