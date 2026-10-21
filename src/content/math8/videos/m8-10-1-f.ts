import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { circleGraph } from '@/video/charts.ts';
import { pictoIds, pictograph } from './lib/m8-10-figures.ts';

// Votes for the best pet: cats 4 stars (40 votes), dogs 5 stars (50 votes). Drawn with bigger cat
// stars, the cat row looks longer although it has fewer stars.
const PETS = ['cat', 'dog'];
const pets = (id: string, fair: boolean) =>
  figure(
    id,
    [
      pictograph({
        rows: [
          { id: 'cat', label: 'Cats', count: 4, size: fair ? 1 : 1.55, tone: 'opp' },
          { id: 'dog', label: 'Dogs', count: 5, size: fair ? 1 : 0.85, tone: 'adj' },
        ],
        key: '= 10 votes',
        keyTone: 'theta',
        gap: 2,
      }),
    ],
    380,
  );

// A school newspaper's circle graph of how students get to school: 40 + 35 + 30 + 15 = 120%. The
// slices are drawn from the numbers, so the bus slice, labelled 40%, fills only a third of it.
const paper = (id: string) =>
  figure(
    id,
    [
      circleGraph({
        slices: [
          { label: 'Bus 40\\%', value: 40 },
          { label: 'Car 35\\%', value: 35 },
          { label: 'Walk 30\\%', value: 30 },
          { label: 'Bike 15\\%', value: 15 },
        ],
        namesOnly: true,
        r: 2.6,
      }),
    ],
    460,
  );

const video: Explainer = {
  id: 'm8-10-1-f',
  lessonId: 'm8-10-1',
  title: 'Critiquing Graphs, Part 6: Symbols and Percents That Mislead',
  thumbnailTitle: 'Symbols and Percents',
  thumbnail: 'cg',
  summary:
    'In a pictograph, every symbol must be the same size: with bigger symbols, 4 stars for cats (40 votes) can look like more than 5 stars for dogs (50 votes). In a circle graph, the parts of one whole must add to exactly 100%: a graph of bus 40%, car 35%, walk 30% and bike 15% adds to 120%, so it cannot be correct. Check every graph: where the vertical axis starts, equal intervals and steps, symbols of the same size, and percents that add to 100%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability · Part 6', title: 'Symbols and Percents That Mislead', subtitle: 'Check the size and the total' }],
      lines: [
        { say: 'Pictographs and circle graphs can mislead as well. In a pictograph, watch the size of the symbols. In a circle graph, watch the total.', show: 'title' },
        { say: 'In this video, you will catch both tricks, and then put together a checklist for any graph.' },
      ],
    },
    {
      chapter: 'Symbols of different sizes',
      layout: 'split',
      leftWidth: 640,
      left: [pets('bg', false)],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Symbols of different sizes', md: 'Bigger symbols make a short row look long. In a fair pictograph, **every symbol is the same size**.' }],
      lines: [
        { say: 'This pictograph shows votes for the best pet. The cat row looks longer than the dog row, so cats seem to have won.', show: pictoIds('bg', PETS) },
        { say: 'But count the symbols. Cats have four stars, and dogs have five. Each star stands for ten votes, so cats got forty votes, and dogs got fifty.', focus: ['bg.row-cat', 'bg.row-dog', 'bg.key'] },
        { say: 'The cat stars were drawn bigger, which made a short row look long. In a fair pictograph, every symbol is the same size.', show: 'oops', focus: 'bg.row-cat' },
      ],
    },
    {
      chapter: 'Drawn fairly',
      layout: 'split',
      leftWidth: 640,
      left: [pets('fr', true)],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'With every star the same size, the longer row really is the bigger count.' }],
      lines: [
        { say: 'Here is the same data, drawn fairly. Every star is the same size.', show: [...pictoIds('fr', PETS), 't'] },
        { say: 'Now the dog row is longer, and dogs are the clear winner, with fifty votes to forty.', focus: 'fr.row-dog' },
      ],
    },
    {
      chapter: 'A circle graph that does not add up',
      layout: 'split',
      leftWidth: 620,
      left: [paper('cg')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A school newspaper printed this circle graph of how students get to school. What is wrong with it?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['40 + 35 + 30 + 15 = 120', '120\\% \\ne 100\\%'] },
      ],
      lines: [
        { say: 'A school newspaper printed this circle graph of how students get to school. What is wrong with it?', show: ['cg.s0', 'cg.s1', 'cg.s2', 'cg.s3', 'q'] },
        { say: 'Add the percents: forty plus thirty-five plus thirty plus fifteen is one hundred twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'But the parts of one whole must add up to exactly one hundred percent. These add to one hundred twenty percent, so the graph cannot be correct.', show: 'm.1', focus: 'm.1' },
        { say: 'You can even see it in the picture. The bus slice is labelled forty percent, but it fills only a third of the circle. Some of the numbers are wrong.', focus: 'cg.s0' },
      ],
    },
    {
      chapter: 'Check every graph',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Does the **vertical axis start at $0$**?',
            'Are the **intervals** and the **steps** on each axis **equal**?',
            'Are the **symbols** all the **same size**?',
            'Do the **percents** of a circle graph add to exactly $100\\%$?',
            'Read the **real values** from the scale before you believe the picture.',
          ],
        },
      ],
      lines: [
        { say: 'Here is a checklist to use on every graph you see. First, does the vertical axis start at zero?', show: 'b.0' },
        { say: 'Second, are the intervals and the steps on each axis equal?', show: 'b.1' },
        { say: 'Third, are the symbols all the same size?', show: 'b.2' },
        { say: 'Fourth, do the percents of a circle graph add to exactly one hundred percent?', show: 'b.3' },
        { say: 'And always read the real values from the scale before you believe what the picture seems to show.', show: 'b.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A circle graph of favourite lunches shows: pizza $45\\%$, tacos $30\\%$, pasta $20\\%$ and salad $15\\%$. What is wrong with it?',
          choices: ['Nothing; it is correct.', 'The percents add to $110\\%$, not $100\\%$.', 'The percents add to $90\\%$, not $100\\%$.', 'A circle graph cannot show lunches.'],
          answer: 1,
          working: '$45 + 30 + 20 + 15 = 110$. The parts of one whole must add to exactly $100\\%$, so the graph cannot be correct.',
        },
      ],
      lines: [
        { say: 'Your turn. A circle graph of favourite lunches shows: pizza, forty-five percent; tacos, thirty percent; pasta, twenty percent; and salad, fifteen percent. What is wrong with it? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is B. Forty-five plus thirty plus twenty plus fifteen is one hundred ten, but the parts of one whole must add to exactly one hundred percent. Choice A misses that the total is wrong.', show: 'q.answer' },
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
            'Bar graph: compare categories. Line graph: change over time. Circle graph: parts of one whole. Pictograph: compare counts with symbols.',
            'A circle graph only works when the parts add up to exactly $100\\%$.',
            'Check every graph: the start of the vertical axis, equal intervals and steps, symbols of the same size, and percents that add to $100\\%$.',
            'Read the real values from the scale before you believe the picture.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up this lesson. A bar graph compares categories, a line graph shows change over time, a circle graph shows the parts of one whole, and a pictograph compares counts with symbols.', show: 'sum.0' },
        { say: 'A circle graph only works when the parts add up to exactly one hundred percent.', show: 'sum.1' },
        { say: 'Check every graph: where the vertical axis starts, equal intervals and steps, symbols of the same size, and percents that add to one hundred.', show: 'sum.2' },
        { say: 'And read the real values from the scale before you believe the picture. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
