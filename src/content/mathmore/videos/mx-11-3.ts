import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 50], y: [0, 60], xStep: 10, yStep: 10, width: 9, height: 6, titles: { x: '\\text{Time (minutes)}', y: '\\text{Cumulative frequency}' } });
const cf: [number, number][] = [[0, 0], [10, 5], [20, 15], [30, 35], [40, 55], [50, 60]];
const graph = (id: string) =>
  figure(id, [
    g,
    polyline(g, { id: 'curve', points: cf }),
    dots(g, cf.map(([x, y], i) => ({ id: `p${i}`, x, y, group: 'pts' }))),
    polyline(g, { id: 'med', points: [[0, 30], [27.5, 30], [27.5, 0]], tone: 'theta', dashed: true }),
    polyline(g, { id: 'lq', points: [[0, 15], [20, 15], [20, 0]], tone: 'adj', dashed: true }),
    polyline(g, { id: 'uq', points: [[0, 45], [35, 45], [35, 0]], tone: 'opp', dashed: true }),
  ], 500);

const video: Explainer = {
  id: 'mx-11-3',
  lessonId: 'mx-11-3',
  title: 'Cumulative Frequency',
  thumbnail: 'cf',
  summary: 'Cumulative frequency is a running total, plotted at the upper end of each class. For 60 puzzle times with frequencies 5, 10, 20, 20 and 5, the totals are 5, 15, 35, 55 and 60. Reading across at 30, 15 and 45 gives a median of 27.5 minutes, quartiles of 20 and 35, and an interquartile range of 15 minutes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Frequency Trees, Histograms and Cumulative Frequency', title: 'Cumulative Frequency', subtitle: 'Running totals, the median and the quartiles' }],
      lines: [
        { say: 'A grouped frequency table tells us how many values are in each class, but not where the middle value is.', show: 'title' },
        { say: 'In this video, you will learn to add up the frequencies as you go, plot those running totals, and use the graph to estimate the median and the quartiles.' },
      ],
    },
    {
      chapter: 'Running totals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Cumulative frequency', md: 'The number of values up to and including a value: a **running total** of the frequencies. The last one is the total.' },
        { kind: 'table', id: 't', head: ['Time $t$ (minutes)', 'Frequency', 'Cumulative frequency'], rows: [['$0 < t \\le 10$', '$5$', '$5$'], ['$10 < t \\le 20$', '$10$', '$5 + 10 = 15$'], ['$20 < t \\le 30$', '$20$', '$15 + 20 = 35$'], ['$30 < t \\le 40$', '$20$', '$35 + 20 = 55$'], ['$40 < t \\le 50$', '$5$', '$55 + 5 = 60$']] },
      ],
      lines: [
        { say: 'The cumulative frequency at a value is the number of values up to and including it. It is a running total of the frequencies.', show: 'def' },
        { say: 'The table shows the times sixty people took to finish a puzzle. Five people took up to ten minutes, so the first cumulative frequency is five.', show: 't.0', focus: 't.0' },
        { say: 'Ten more took up to twenty minutes, so the running total is five plus ten, which is fifteen.', show: 't.1', focus: 't.1' },
        { say: 'Then fifteen plus twenty is thirty five, and thirty five plus twenty is fifty five.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'And fifty five plus five is sixty. The last cumulative frequency is always the total, which is a good check.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Drawing the graph',
      layout: 'split',
      leftWidth: 700,
      left: [graph('gr')],
      right: [
        { kind: 'text', id: 'a', md: 'Plot each cumulative frequency at the **upper end** of its class: $(10, 5)$, $(20, 15)$, $(30, 35)$, …' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Plotting at the midpoint', md: 'The cumulative frequency counts everything **up to the end** of the class, so the point goes at the upper end, not the middle.' },
      ],
      lines: [
        { say: 'To draw the graph, plot each cumulative frequency at the upper end of its class. Five people took up to ten minutes, so plot ten, five. Then twenty, fifteen, and so on.', show: ['gr.grid', 'gr.axes', 'gr.pts', 'a'], focus: 'gr.pts' },
        { say: 'Nobody took less than zero minutes, so start at zero, zero. Then join the points.', show: 'gr.curve', focus: 'gr.curve' },
        { say: 'A common mistake is to plot each point at the middle of its class. The cumulative frequency counts everything up to the end of the class, so the point goes at the upper end.', show: 'oops' },
      ],
    },
    {
      chapter: 'The median and quartiles',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Measure', 'Read across at'], rows: [['Median', '$\\tfrac{1}{2}$ of the total'], ['Lower quartile', '$\\tfrac{1}{4}$ of the total'], ['Upper quartile', '$\\tfrac{3}{4}$ of the total']] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Interquartile range', md: 'Upper quartile $-$ lower quartile. It measures how spread out the **middle half** of the data is.' },
      ],
      lines: [
        { say: 'The median is the middle value, half of the way through the data. So we read across from half of the total.', show: 't.0', focus: 't.0' },
        { say: 'The lower quartile is a quarter of the way through, at one quarter of the total.', show: 't.1', focus: 't.1' },
        { say: 'And the upper quartile is three quarters of the way through, at three quarters of the total.', show: 't.2', focus: 't.2' },
        { say: 'The interquartile range is the upper quartile take away the lower quartile. It measures how spread out the middle half of the data is.', show: 'def' },
      ],
    },
    {
      chapter: 'Reading the graph',
      layout: 'split',
      leftWidth: 700,
      left: [graph('rd')],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Median: } 30 \\to 27.5', '\\text{LQ: } 15 \\to 20', '\\text{UQ: } 45 \\to 35', '\\text{IQR} = 35 - 20 = 15'] },
      ],
      lines: [
        { say: 'Now the puzzle times. Half of sixty is thirty. Go across from thirty to the graph, then down. The median is about twenty seven point five minutes.', show: ['rd.grid', 'rd.axes', 'rd.curve', 'rd.pts', 'rd.med', 'm.0'], focus: ['rd.med', 'm.0'] },
        { say: 'A quarter of sixty is fifteen. Across from fifteen and down gives a lower quartile of twenty minutes.', show: ['rd.lq', 'm.1'], focus: ['rd.lq', 'm.1'] },
        { say: 'Three quarters of sixty is forty five. Across from forty five and down gives an upper quartile of thirty five minutes.', show: ['rd.uq', 'm.2'], focus: ['rd.uq', 'm.2'] },
        { say: 'So the interquartile range is thirty five take away twenty, which is fifteen minutes. The middle half of the people took between twenty and thirty five minutes.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cumulative frequency graph shows the heights of $80$ plants. At what cumulative frequency do you read across to find the **upper quartile**?',
          choices: ['$40$', '$60$', '$20$', '$45$'],
          answer: 1,
          working: 'The upper quartile is $\\tfrac{3}{4}$ of the way through: $\\tfrac{3}{4} \\times 80 = 60$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cumulative frequency graph shows the heights of eighty plants. At what cumulative frequency do you read across to find the upper quartile? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The upper quartile is three quarters of the way through, and three quarters of eighty is sixty. Choice A is for the median, and choice C is for the lower quartile.', show: 'q.answer' },
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
          items: ['Cumulative frequency is a running total of the frequencies.', 'Plot it at the upper end of each class, starting from zero, and join the points.', 'Read across at $\\tfrac{1}{2}$, $\\tfrac{1}{4}$ and $\\tfrac{3}{4}$ of the total.', 'Interquartile range $=$ upper quartile $-$ lower quartile.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Cumulative frequency is a running total of the frequencies.', show: 'sum.0' },
        { say: 'Plot it at the upper end of each class, start from zero, and join the points.', show: 'sum.1' },
        { say: 'Read across at a half, a quarter and three quarters of the total for the median, the lower quartile and the upper quartile.', show: 'sum.2' },
        { say: 'And the interquartile range is the upper quartile take away the lower quartile. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
