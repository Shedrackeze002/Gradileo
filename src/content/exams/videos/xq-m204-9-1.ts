import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 20-4 lesson 9.1 (displaying data). The question is an Exercise from OpenStax
// Contemporary Mathematics, word for word, part one only (section 8.2, Visualizing Data, CC BY-NC-SA
// 4.0). Counting the 20 genres: Young Adult 6, Romance 4, Nonfiction 3, Thriller 3, True Crime 3 and
// Cooking 1, which add to 20. The bars are drawn from tallest to shortest.

const QUESTION =
  'The purchasing department for a chain of bookstores wants to make sure they’re buying the right types of books to put on the shelves, so they take a sample of 20 books that customers bought in the last five days and record the genres: Nonfiction, Young Adult, Romance, Cooking, Young Adult, Young Adult, Thriller, Young Adult, Nonfiction, True Crime, Romance, Nonfiction, Thriller, True Crime, Romance, True Crime, Thriller, Romance, Young Adult, Young Adult. Create a bar graph to visualize these data.';

const GENRES = ['Young Adult', 'Romance', 'Nonfiction', 'Thriller', 'True Crime', 'Cooking'];
const COUNTS = [6, 4, 3, 3, 3, 1];

/**
 * Puts a two-word category name on two lines, so that neighbouring names do not run together, and
 * moves the axis title below them.
 */
const stack = (p: Part): Part => ({
  points: { ...p.points, xt: [p.points.xt[0], -1] },
  items: p.items.map((it) => (it.kind === 'label' && /^b\d+-name$/.test(it.id) ? { ...it, tex: it.tex.replace(/^\\text\{(\S+) (\S+)\}$/, '\\begin{matrix}\\text{$1}\\\\\\text{$2}\\end{matrix}') } : it)),
});

const bars = () => figure('bg', [stack(barGraph({ categories: GENRES, values: COUNTS, max: 6, step: 1, height: 2.4, titles: { x: 'Genre', y: 'Books sold' } }))], 500);

const video: Explainer = {
  id: 'xq-m204-9-1',
  lessonId: '',
  exam: {
    lesson: 'm204-9-1',
    source: 'OpenStax, Contemporary Mathematics, Exercise in section 8.2, Visualizing Data',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/8-2-visualizing-data',
    question: QUESTION,
  },
  title: 'Exam Question: Which Books Sell Best? (Displaying Data)',
  thumbnailTitle: 'Which Books Sell Best?',
  thumbnail: 'bg',
  summary:
    'A real test question, solved one small step at a time: a bookstore chain records the genres of 20 books its customers bought, and we make a bar graph of the data. First we count each genre: Young Adult 6, Romance 4, Nonfiction 3, Thriller 3, True Crime 3 and Cooking 1. Then we draw one bar for each genre, up to its count, and read what the graph tells the purchasing department. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Books Sell Best?', subtitle: 'Bar graphs, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about displaying data in a bar graph. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'The purchasing department for a chain of bookstores wants to make sure they’re buying the right types of books to put on the shelves, so they take a sample of $20$ books that customers bought in the last five days and record the genres: Nonfiction, Young Adult, Romance, Cooking, Young Adult, Young Adult, Thriller, Young Adult, Nonfiction, True Crime, Romance, Nonfiction, Thriller, True Crime, Romance, True Crime, Thriller, Romance, Young Adult, Young Adult. Create a bar graph to visualize these data.',
          answer: 'bars of $6$, $4$, $3$, $3$, $3$ and $1$',
          working: 'Count each genre, then draw one bar per genre up to its count',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'The purchasing department for a chain of bookstores wants to make sure they are buying the right types of books. So they take a sample of 20 books that customers bought in the last five days, and record the genres.' },
        { say: 'The list has 20 genres, such as nonfiction, young adult and romance. Create a bar graph to show these data.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'f', tone: 'definition', title: 'Frequency', md: 'The **frequency** of a genre is how many times it appears in the list. A bar graph starts from a table of frequencies.' },
        { kind: 'callout', id: 'g', tone: 'definition', title: 'Bar graph', md: 'A **bar graph** has one **bar** for each category. The **height** of the bar shows its frequency.' },
      ],
      lines: [
        { say: 'The list is raw data: one word for each book. Before we can graph it, we need the frequency of each genre, which is how many times it appears.', show: 'f' },
        { say: 'A bar graph has one bar for each category. The height of each bar shows its frequency.', show: 'g' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'k', items: ['Bars are the **same width**, with **equal gaps**', 'The scale starts at **$0$** and goes up in **equal steps**', 'Label both **axes** and give the graph a **title**'] }],
      lines: [
        { say: 'Here is what we need. All the bars are the same width, with equal gaps between them.', show: 'k.0' },
        { say: 'The scale on the side starts at 0, and goes up in equal steps.', show: 'k.1' },
        { say: 'And both axes get labels, so a reader knows what the graph shows.', show: 'k.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Count** each genre', 'Choose a **scale**', 'Draw a **bar** for each genre'] }],
      lines: [
        { say: 'Here is the plan. Count each genre.', show: 'plan.0' },
        { say: 'Choose a scale that fits the biggest count.', show: 'plan.1' },
        { say: 'Then draw a bar for each genre.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Count',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Genre', 'Frequency'],
          rows: [...GENRES.map((g, i) => [g, `$${COUNTS[i]}$`]), ['**Total**', '**$20$**']],
        },
      ],
      lines: [
        { say: 'Step one. Go through the list and count each genre. Crossing off each word as you count it helps you not to miss one.', show: 't' },
        { say: 'Young adult appears 6 times, and romance 4 times.', focus: ['t.0', 't.1'] },
        { say: 'Nonfiction, thriller and true crime appear 3 times each, and cooking just once.', focus: ['t.2', 't.3', 't.4', 't.5'] },
        { say: '6 plus 4 plus 3 plus 3 plus 3 plus 1 is 20, and the sample has 20 books. So no book was missed or counted twice.', focus: 't.6' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: The bar graph',
      layout: 'center',
      main: [bars()],
      lines: [
        { say: 'Step two. Draw the axes. The biggest count is 6, so a scale from 0 to 6, going up by 1, fits every bar.', show: 'bg.scale', focus: 'bg.scale' },
        { say: 'Step three. Put one bar for each genre along the bottom, all the same width. Here they go from the tallest to the shortest, which makes the graph easy to read.', show: ['bg.b0', 'bg.b1', 'bg.b2', 'bg.b3', 'bg.b4', 'bg.b5'] },
        { say: 'Each bar goes up to its count: 6, 4, 3, 3, 3 and 1.', show: ['bg.v0', 'bg.v1', 'bg.v2', 'bg.v3', 'bg.v4', 'bg.v5'] },
        { say: 'Now the graph tells the purchasing department something. Young adult books sell the most, 6 out of 20, which is 30 percent. Cooking books sell the least, so they should buy fewer of those.', focus: ['bg.b0', 'bg.b5'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6 + 4 + 3 + 3 + 3 + 1 = 20 \\ \\checkmark', '\\text{6 bars for 6 genres} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The bar heights add to 20, the number of books in the sample.', show: 'm.0' },
        { say: 'And there are 6 bars, one for each of the 6 genres. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$20$ bars', 'one bar per **book**: make one bar per **genre**'],
            ['Young Adult at $5$', 'missed one: the counts must add to **$20$**'],
            ['Scale starting at $1$', 'a bar graph’s scale starts at **$0$**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '20 bars draws one bar for each book. A bar graph has one bar for each category, here each genre.' },
        { say: 'A young adult bar of 5 misses one. Check that the counts add up to 20.' },
        { say: 'And a scale that starts at 1, or higher, makes short bars look much shorter than they are. Start the scale at 0.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A café asks $40$ customers their favourite drink. A bar graph shows Coffee $18$, Tea $12$ and Juice $10$. What percent of the customers chose tea?',
          choices: ['$12\\%$', '$18\\%$', '$30\\%$', '$45\\%$'],
          answer: 2,
          working: '12 ÷ 40 = 0.3 = 30%.',
        },
      ],
      lines: [
        { say: 'Your turn. A café asks 40 customers their favourite drink. A bar graph shows coffee 18, tea 12 and juice 10. What percent of the customers chose tea? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '12 out of 40 is 12 divided by 40, which is 0.3, or 30 percent. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Count** each category first', 'One **bar** per category', 'Scale from **$0$**, in equal steps', '**Check**: the counts add to the total'] }],
      lines: [
        { say: 'Here is what to remember. Count each category first.', show: 'sum.0' },
        { say: 'Draw one bar for each category.', show: 'sum.1' },
        { say: 'Start the scale at 0, and go up in equal steps.', show: 'sum.2' },
        { say: 'And check that the counts add up to the total. For more on displaying data, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
