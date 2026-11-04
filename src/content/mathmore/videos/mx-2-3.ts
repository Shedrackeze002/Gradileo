import type { Explainer } from '@/video/script.ts';
import { plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 6.5], y: [0, 70], yStep: 10, width: 10, height: 7, titles: { x: 'x', y: 'y' } });

const video: Explainer = {
  id: 'mx-2-3',
  lessonId: 'mx-2-3',
  title: 'Linear and Exponential Growth',
  thumbnail: 'gr',
  summary: 'Linear growth adds the same amount each step (a common difference, y = b + kx); exponential growth multiplies by the same factor (a common ratio, y = a × rˣ). Exponential growth always overtakes linear growth: a club of 10 that doubles each year passes a club of 200 that gains 50 a year after 6 years.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Scientific Notation and Growth', title: 'Linear and Exponential Growth', subtitle: 'Adding versus multiplying' }],
      lines: [
        { say: 'One club gains fifty new members every year. Another club doubles its membership every year.', show: 'title' },
        { say: 'At first, the steady club may be far ahead. But the doubling club catches up, and then races past. In this video, you will learn to tell these two kinds of growth apart, linear and exponential, and see why exponential growth always wins.' },
      ],
    },
    {
      chapter: 'Two kinds of growth',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Linear growth** adds the **same number** each step: a common difference. Rule: $y = b + kx$.', '**Exponential growth** multiplies by the **same factor** each step: a common ratio greater than $1$. Rule: $y = \\opp{a} \\times r^{x}$.'] },
      ],
      lines: [
        { say: 'In linear growth, the amount increases by the same number in each equal step of time. That number is called the common difference. Its graph is a straight line.', show: 'b.0', focus: 'b.0' },
        { say: 'In exponential growth, the amount is multiplied by the same factor in each equal step. That factor is called the common ratio, and for growth it is greater than one. Its graph curves upward, more and more steeply.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Which kind of growth?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$x$', '$0$', '$1$', '$2$', '$3$', 'Steps'], rows: [['Table A: $y$', '$5$', '$15$', '$45$', '$135$', '$\\times 3$ each time'], ['Table B: $y$', '$5$', '$15$', '$25$', '$35$', '$+10$ each time']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{A: } y = 5 \\times 3^{x} \\qquad \\text{B: } y = 5 + 10x'] },
      ],
      lines: [
        { say: 'Here are two tables. Each starts at five, and each goes up to fifteen at x equals one. Which one is linear, and which one is exponential?', show: 't' },
        { say: 'Table A: the differences are ten, thirty and ninety, which are not equal. But the ratios are fifteen over five, 45 over fifteen, and 135 over 45, which are all three. So Table A is exponential, with a common ratio of three.', focus: 't.0' },
        { say: 'Table B: the differences are ten, ten and ten, all equal. So Table B is linear, with a common difference of ten.', focus: 't.1' },
        { say: 'Their rules are y equals five times three to the power of x, and y equals five plus ten x.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The graphs',
      layout: 'center',
      main: [
        figure('gr', [g, polyline(g, { id: 'lin', points: [[0, 10], [1, 15], [2, 20], [3, 25], [4, 30], [5, 35], [6, 40]], tone: 'adj' }), polyline(g, { id: 'exp', points: [[0, 1], [1, 2], [2, 4], [3, 8], [4, 16], [5, 32], [6, 64]], tone: 'opp' })], 500),
        { kind: 'text', id: 'k', md: '[[adj:$y = 10 + 5x$]] adds $5$ each step. [[opp:$y = 2^{x}$]] doubles each step.', align: 'center' },
      ],
      lines: [
        { say: 'Here are two more growth patterns on a graph. The blue line is y equals ten plus five x. It adds five every step, so it is a straight line.', show: ['gr.grid', 'gr.axes', 'gr.lin', 'k'], focus: 'gr.lin' },
        { say: 'The orange curve is y equals two to the power of x. It doubles every step: one, two, four, eight, sixteen, 32, 64.', show: 'gr.exp', focus: 'gr.exp' },
        { say: 'At first the orange curve is far below the line, and it barely seems to grow. But by x equals five it has nearly caught up, and at x equals six it has raced past.', focus: 'gr' },
      ],
    },
    {
      chapter: 'Exponential growth always wins',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Exponential growth always wins', md: 'A quantity that grows exponentially **eventually exceeds** any quantity that grows linearly, however far behind it starts.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Looking only at the first few values', md: 'Exponential growth can look nearly linear at first. Always check the **ratios** too.' },
      ],
      lines: [
        { say: 'This always happens. A quantity that grows exponentially eventually exceeds any quantity that grows linearly, however large the linear one starts, and however slowly the exponential one starts.', show: 'key' },
        { say: 'Why? Each step adds a fixed amount to the linear quantity. But each step adds more and more to the exponential one, because it adds a fraction of an ever larger amount.' },
        { say: 'So be careful with the first few values. Exponential growth can start slowly and look nearly linear. Always check the ratios too: if they are all the same, the growth is exponential.', show: 'oops' },
      ],
    },
    {
      chapter: 'When does it overtake?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['A = 200 + 50n \\qquad B = 10 \\times 2^{n}'] },
        { kind: 'table', id: 't', head: ['Year $n$', '$4$', '$5$', '$6$'], rows: [['Club A', '$400$', '$450$', '$500$'], ['Club B', '$160$', '$320$', '[[good:$640$]]']] },
      ],
      lines: [
        { say: 'Club A has two hundred members and gains fifty a year. Club B has ten members and doubles each year. After how many years does Club B first have more members?', show: 'm.0', focus: 'm.0' },
        { say: 'Club A grows linearly: after n years it has two hundred plus fifty n members. Club B grows exponentially: it has ten times two to the power of n.' },
        { say: 'Try some years. After four years, Club A has four hundred and Club B has 160. After five years, Club A has 450 and Club B has 320.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'After six years, Club A has five hundred, but Club B has 640. So Club B first has more members after six years.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A table gives $y = 4, 12, 36, 108$ for $x = 0, 1, 2, 3$. Which kind of growth is it?',
          choices: ['Linear, with common difference $8$', 'Linear, with common difference $4$', 'Neither', 'Exponential, with common ratio $3$'],
          answer: 3,
          working: 'The differences $8, 24, 72$ are not equal, but the ratios $12 \\div 4$, $36 \\div 12$ and $108 \\div 36$ are all $3$: exponential, $y = 4 \\times 3^{x}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A table gives y equals four, twelve, 36 and 108, for x equals zero, one, two and three. Which kind of growth is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The differences are eight, 24 and 72, which are not equal. But every ratio is three: twelve over four, 36 over twelve, and 108 over 36. So the growth is exponential, with a common ratio of three. Choice A looks only at the first step.', show: 'q.answer' },
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
          items: ['Linear growth adds the same amount each step: a common difference.', 'Exponential growth multiplies by the same factor: a common ratio.', 'Check the differences and the ratios of a table.', 'Exponential growth eventually overtakes linear growth.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Linear growth adds the same amount in each step. It has a common difference.', show: 'sum.0' },
        { say: 'Exponential growth multiplies by the same factor in each step. It has a common ratio.', show: 'sum.1' },
        { say: 'To tell them apart, check both the differences and the ratios of a table.', show: 'sum.2' },
        { say: 'And exponential growth eventually overtakes linear growth, however far behind it starts. In the next lesson, we slice solids to find their cross-sections. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
