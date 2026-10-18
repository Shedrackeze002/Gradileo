import type { Explainer } from '@/video/script.ts';
import { plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, note, span, steps } from './lib/m302-7-graphs.ts';
import { bars } from './lib/m302-8-figures.ts';

const H = 3.6;
const W = 5.2;
/** The height (in diagram units) of each graph's title, so the two titles line up. */
const T = 4.75;
const SALES = [
  { x: 1.3, value: 92, name: '\\text{Year 1}' },
  { x: 3.5, value: 96, name: '\\text{Year 2}' },
];
/** The misleading graph: its axis starts at 90, so it is moved down to sit beside the honest one. */
const mis = plane({ name: 'mis', x: [0, W], y: [90, 97], xStep: W, yStep: 1, every: 0, width: W, height: H, at: [0, (-90 * H) / 7] });
/** The honest graph: the same sales, with the axis from 0. */
const fair = plane({ name: 'fair', x: [0, W], y: [0, 100], xStep: W, yStep: 10, every: 0, width: W, height: H, at: [7.8, 0] });
const clean = (p: typeof mis) => ({ ...p, items: p.items.filter((it) => !it.id.endsWith('-name')) });

const misParts = [
  clean(mis),
  edgeNumbers(mis, { ys: steps(90, 96, 2) }),
  bars(mis, { id: 'bar', width: 1.2, items: SALES }),
  span(mis, { id: 'h0', from: [2.2, 90], to: [2.2, 92], label: '2', place: 'right', tone: 'bad' }),
  span(mis, { id: 'h1', from: [4.4, 90], to: [4.4, 96], label: '6', place: 'right', tone: 'bad' }),
  note(mis, { id: 'title', x: W / 2, y: 90 + (T * 7) / H, tex: '\\text{Axis from 90}', tone: 'bad' }),
];
const fairParts = [
  clean(fair),
  edgeNumbers(fair, { ys: steps(0, 100, 20) }),
  bars(fair, { id: 'bar', width: 1.2, items: SALES }),
  note(fair, { id: 'title', x: W / 2, y: (T * 100) / H, tex: '\\text{Axis from 0}', tone: 'good' }),
];

const video: Explainer = {
  id: 'm302-8-2-f',
  lessonId: 'm302-8-2',
  title: 'The Mathematics Research Project, Part 6: Misleading Graphs',
  thumbnailTitle: 'Misleading Graphs',
  thumbnail: 'g',
  summary: 'A bar graph of sales rising from 92 to 96 thousand units, drawn with its vertical axis starting at 90, makes the second bar look three times as tall, but the real increase is (96 − 92)/92 × 100 ≈ 4.3%. The same data with the axis from 0, and a checklist for presenting a research project honestly.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Puzzles, Games and the Research Project · Part 6', title: 'Misleading Graphs', subtitle: 'Check where the axis starts' }],
      lines: [
        { say: 'A graph can show every number correctly and still give the wrong impression.', show: 'title' },
        { say: 'In this video, you will see how a bar graph can exaggerate a change, work out the real change, and finish with a checklist for presenting your own project honestly.' },
      ],
    },
    {
      chapter: 'A dramatic rise?',
      layout: 'split',
      leftWidth: 560,
      left: [figure('g', misParts)],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Sales rose from 92 thousand units to 96 thousand units.' },
        { kind: 'text', id: 'axis', size: 'md', md: 'The vertical axis starts at **90**, not at 0.' },
      ],
      lines: [
        { say: 'A company shows this bar graph of its sales, which rose from 92 thousand units in one year to 96 thousand units the next.', show: ['g.mis-grid', 'g.mis-axes', 'g.mis-bar0', 'g.mis-bar1', 't'] },
        { say: 'The second bar looks three times as tall as the first. It looks as if sales tripled.', focus: ['g.mis-bar0', 'g.mis-bar1'] },
        { say: 'But look at the vertical axis: it starts at 90, not at zero.', show: ['g.mis-title', 'axis'], focus: 'g.mis-axes' },
        { say: 'The bars only show the parts above 90: 92 minus 90, which is two, and 96 minus 90, which is six. Six is three times two, and that is the only reason one bar looks three times as tall as the other.', show: ['g.mis-h0', 'g.mis-h1'], focus: ['g.mis-h0', 'g.mis-h1'] },
      ],
    },
    {
      chapter: 'The real change',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{percent increase} = \\dfrac{\\text{new} - \\text{old}}{\\text{old}} \\times 100', '= \\dfrac{96 - 92}{92} \\times 100 \\approx 4.3\\%'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The real change', md: 'Sales rose by only about $4.3\\%$, not by three times.' },
      ],
      lines: [
        { say: 'To find the real change, divide the increase by the starting value: the new value minus the old, over the old, times 100.', show: 'm.0', focus: 'm.0' },
        { say: '96 minus 92 is four, and four divided by 92, times 100, is about 4.3 percent.', show: 'm.1', focus: 'm.1' },
        { say: 'So sales rose by only about 4.3 percent: a small increase, made to seem huge.', show: 'key' },
      ],
    },
    {
      chapter: 'An honest graph',
      layout: 'center',
      main: [figure('g', [...misParts, ...fairParts], 400)],
      lines: [
        { say: 'Here is the misleading graph again, and beside it, the same data with the axis starting at zero.', show: ['g.mis-grid', 'g.mis-axes', 'g.mis-bar0', 'g.mis-bar1', 'g.mis-title', 'g.fair-grid', 'g.fair-axes', 'g.fair-title'] },
        { say: 'On the honest graph, the two bars are almost the same height. That is the truth: a small rise.', show: ['g.fair-bar0', 'g.fair-bar1'], focus: ['g.fair-bar0', 'g.fair-bar1'] },
        { say: 'Both graphs use exactly the same numbers. Only the axis changed, and with it, the story the graph tells.' },
        { say: 'We compare bars by their heights, so the axis of a bar graph should start at zero. Whenever you read a graph, check where the axis starts.' },
      ],
    },
    {
      chapter: 'Presenting your project',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          check: true,
          items: [
            'State your research question.',
            'Explain how you collected the data: your sample and your sources.',
            'Show the data in displays that fit, with labelled axes; start bar graphs at zero.',
            'Give your analysis: averages, trends and margins of error.',
            'Conclude: what the data show, and what they do not show.',
          ],
        },
      ],
      lines: [
        { say: 'When you present your own project, use this checklist. Start by stating your research question.', show: 'b.0' },
        { say: 'Explain how you collected the data: who was in your sample, how they were chosen, and where any secondary data came from.', show: 'b.1' },
        { say: 'Show the data in displays that fit their purpose, with labelled axes, and with bar graphs starting at zero.', show: 'b.2' },
        { say: 'Give your analysis: the averages you chose and why, any trends, and the margins of error.', show: 'b.3' },
        { say: 'And finish with a conclusion that says what the data show, and what they do not show. An honest conclusion is more convincing than an exaggerated one.', show: 'b.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The vertical axis of a bar graph starts at $40$. The bars show $45$ and $50$. How many times as tall does the second bar look, and what is the actual percent increase?',
          choices: ['$2$ times as tall; $10\\%$', '$2$ times as tall; about $11.1\\%$', 'About $1.1$ times as tall; about $11.1\\%$', '$2$ times as tall; $100\\%$'],
          answer: 1,
          working: 'Above the axis, the bars show $50 - 40 = 10$ and $45 - 40 = 5$, so the second looks $2$ times as tall. The actual increase is $\\dfrac{50 - 45}{45} \\times 100 \\approx 11.1\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. The vertical axis of a bar graph starts at forty. The bars show 45 and fifty. How many times as tall does the second bar look, and what is the actual percent increase? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Above the axis, the bars show fifty minus forty, which is ten, and 45 minus forty, which is five, so the second bar looks twice as tall. The actual increase is five out of 45, which is about 11.1 percent. Choice A divides by the new value, fifty, instead of the starting value, 45.', show: 'q.answer' },
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
            'A bar graph whose axis does not start at $0$ can make a small change look large.',
            'Percent increase $= \\dfrac{\\text{new} - \\text{old}}{\\text{old}} \\times 100$.',
            'Present your question, your method, honest displays, your analysis, and what the data do and do not show.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A bar graph whose axis does not start at zero can make a small change look large, so always check where the axis starts.', show: 'sum.0' },
        { say: 'The real change is the percent increase: the new value minus the old, over the old, times 100.', show: 'sum.1' },
        { say: 'And present your project honestly: your question, your method, displays that fit, your analysis, and what the data do and do not show. Practise these skills in your lesson, and good luck with your project. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
