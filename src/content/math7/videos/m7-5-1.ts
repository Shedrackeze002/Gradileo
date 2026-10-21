import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { toothpicks } from './lib/m7-5-figures.ts';

// Figures 1 to 4 of the toothpick pattern, side by side, with their toothpick counts.
const figures = (id: string) =>
  figure(
    id,
    [
      toothpicks({ name: 'f1', squares: 1, at: [0, 0], label: '\\text{Figure 1}', count: '4' }),
      toothpicks({ name: 'f2', squares: 2, at: [2.2, 0], label: '\\text{Figure 2}', count: '7' }),
      toothpicks({ name: 'f3', squares: 3, at: [5.4, 0], label: '\\text{Figure 3}', count: '10' }),
      toothpicks({ name: 'f4', squares: 4, at: [9.6, 0], label: '\\text{Figure 4}', count: '13' }),
    ],
    260,
  );

// Figure 3, with the toothpicks of its newest square in green.
const growing = (id: string) =>
  figure(
    id,
    [
      toothpicks({ name: 'f2', squares: 2, at: [0, 0], fresh: [1], label: '\\text{Figure 2}', count: '4 + 3 = 7' }),
      toothpicks({ name: 'f3', squares: 3, at: [3.6, 0], fresh: [2], label: '\\text{Figure 3}', count: '7 + 3 = 10' }),
    ],
    220,
  );

// The table of values: figure number n and toothpicks, going up by 3.
const table = (id: string, height = 300) =>
  figure(
    id,
    [
      valueTable({
        x: { title: '\\text{Figure, } n', values: [1, 2, 3, 4] },
        y: { title: '\\text{Toothpicks}', values: [4, 7, 10, 13] },
        dy: ['+3', '+3', '+3'],
        titleW: 3.6,
      }),
    ],
    height,
  );

const video: Explainer = {
  id: 'm7-5-1',
  lessonId: 'm7-5-1',
  title: 'Patterns and Linear Relations, Part 1: Patterns and Terms',
  thumbnailTitle: 'Patterns and Terms',
  thumbnail: 'fg',
  summary:
    'Squares in a row made of toothpicks form a pattern: Figure 1 uses 4 toothpicks, Figure 2 uses 7, Figure 3 uses 10 and Figure 4 uses 13. Each number is a term, and the term number tells its position. A table of values shows the terms going up by 3 each time, because each new square adds one toothpick on top, one on the bottom and one on the right.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Patterns and Linear Relations · Part 1', title: 'Patterns and Terms', subtitle: 'How does the pattern grow?' }],
      lines: [
        { say: 'Kateri builds squares in a row with toothpicks. How many toothpicks are needed for fifty squares? Counting them one by one would take a long time.', show: 'title' },
        { say: 'In this part, you will look closely at a pattern: its terms, its term numbers, and how it grows.' },
      ],
    },
    {
      chapter: 'Toothpick squares',
      layout: 'center',
      main: [figures('fg')],
      lines: [
        { say: 'Here is Figure one: one small square. Each side of a small square is one toothpick, so Figure one uses four toothpicks.', show: ['fg.f1-sq0', 'fg.f1-label', 'fg.f1-count'] },
        { say: 'Figure two has two squares in a row. The squares share a side, so Figure two uses seven toothpicks, not eight.', show: ['fg.f2-sq0', 'fg.f2-sq1', 'fg.f2-label', 'fg.f2-count'] },
        { say: 'Figure three has three squares, and uses ten toothpicks.', show: ['fg.f3-sq0', 'fg.f3-sq1', 'fg.f3-sq2', 'fg.f3-label', 'fg.f3-count'] },
        { say: 'And Figure four has four squares, and uses thirteen toothpicks.', show: ['fg.f4-sq0', 'fg.f4-sq1', 'fg.f4-sq2', 'fg.f4-sq3', 'fg.f4-label', 'fg.f4-count'] },
      ],
    },
    {
      chapter: 'Terms and term numbers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Term and term number', md: 'Each number in a pattern is called a **term**. The **term number** tells where the term is in the pattern: term $1$ is first, term $2$ is second, and so on.' },
        table('tb'),
      ],
      lines: [
        { say: 'The counts make a pattern of numbers: four, seven, ten, thirteen. Each number in a pattern is called a term.', show: 'def' },
        { say: 'The term number tells where a term is in the pattern. Term one is first, term two is second, and so on. Here, the term number is the figure number.' },
        { say: 'Let’s put the counts in a table of values. The top row is the figure number. We call it n.', show: ['tb.frame', 'tb.xs'] },
        { say: 'The bottom row is the number of toothpicks. Figure one uses four, Figure two uses seven, Figure three uses ten, and Figure four uses thirteen.', show: 'tb.ys' },
      ],
    },
    {
      chapter: 'How the pattern grows',
      layout: 'center',
      main: [growing('gr'), table('tb', 270)],
      lines: [
        { say: 'Look at how the pattern grows. From one figure to the next, one more square is added. Its new toothpicks are in green.', show: ['gr.f2-sq0', 'gr.f2-sq1', 'gr.f2-label', 'gr.f3-sq0', 'gr.f3-sq1', 'gr.f3-sq2', 'gr.f3-label'] },
        { say: 'Each new square needs three toothpicks: one on top, one on the bottom, and one on the right side. Its left side is already there.', focus: ['gr.f2-sq1', 'gr.f3-sq2'] },
        { say: 'So every figure has three more toothpicks than the one before. Four plus three is seven, and seven plus three is ten.', show: ['gr.f2-count', 'gr.f3-count'] },
        { say: 'You can see it in the table as well. The terms go up by three each time.', show: ['tb.frame', 'tb.xs', 'tb.ys', 'tb.dys'], focus: 'tb.dys' },
      ],
    },
    {
      chapter: 'The next terms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Figure 5: } 13 + 3 = 16', '\\text{Figure 6: } 16 + 3 = 19', '\\text{Figure 50: } \\;?'] },
      ],
      lines: [
        { say: 'Now you can predict the next terms. Figure five uses thirteen plus three, which is sixteen toothpicks.', show: 'm.0', focus: 'm.0' },
        { say: 'Figure six uses sixteen plus three, which is nineteen toothpicks.', show: 'm.1', focus: 'm.1' },
        { say: 'But what about Figure fifty? You would have to keep adding three, over and over, more than forty times. In the next part, you will find a faster way: an expression that gives any term in one step.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The terms of a pattern are $5, 9, 13, 17, \\ldots$ What is term $6$?',
          choices: ['$21$', '$25$', '$29$', '$23$'],
          answer: 1,
          working: 'The terms go up by $4$ each time. Term $5$ is $17 + 4 = 21$, and term $6$ is $21 + 4 = 25$.',
        },
      ],
      lines: [
        { say: 'Your turn. The terms of a pattern are five, nine, thirteen, seventeen, and so on. What is term six? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, twenty-five. The terms go up by four each time. Seventeen is term four. Term five is twenty-one, and term six is twenty-five. Choice A is term five, the very next term, but the question asks for term six.', show: 'q.answer' },
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
          items: ['Each number in a pattern is a **term**.', 'The **term number** tells the position of a term.', 'A table of values shows the term numbers and the terms.', 'The toothpick pattern goes up by $3$ each time.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Each number in a pattern is called a term.', show: 'sum.0' },
        { say: 'The term number tells where the term is in the pattern.', show: 'sum.1' },
        { say: 'A table of values shows the term numbers and the terms side by side.', show: 'sum.2' },
        { say: 'And the toothpick pattern goes up by three each time. In the next part, you will write an expression for a pattern. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
