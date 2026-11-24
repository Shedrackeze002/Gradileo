import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-3 lesson 8.2 (line graphs and choosing a graph). The free OpenStax books
// have no line graph question at this level, so this one is written by Gradileo in the style of a
// Grade 11 workplace mathematics unit test; the dugout and its depths are made up, and the graph's
// points are written out in brackets in the description. The depth falls 280 → 200 cm in 4 weeks,
// so 80 ÷ 4 = 20 cm a week. After 8 weeks: 280 − 8 × 20 = 120 cm. Down to 60 cm: (280 − 60) ÷ 20 =
// 11 weeks.

const QUESTION =
  'A rancher measures the depth of the water in a dugout at the start of each week of a dry summer. The line graph shows the depths for the first 4 weeks. [The graph: week 0, 280 cm; week 1, 260 cm; week 2, 240 cm; week 3, 220 cm; week 4, 200 cm.] The water level falls at a steady rate. (a) At what rate is the depth falling? (b) If the trend continues, what will the depth be after 8 weeks? (c) The rancher must move the cattle to another pasture when the depth reaches 60 cm. If the trend continues, after how many weeks will that be?';

const DATA: [number, number][] = [[0, 280], [1, 260], [2, 240], [3, 220], [4, 200]];

/** The dugout's depth: the measured weeks, plus the dashed trend to `to` weeks and the 60 cm line if asked. */
const dugout = (o: { to?: number; limit?: boolean } = {}) => {
  const g = plane({ x: [0, 12], y: [0, 320], xStep: 1, yStep: 40, width: 8, height: 5, titles: { x: '\\text{week}', y: '\\text{depth (cm)}' } });
  const parts = [g, polyline(g, { id: 'line', points: DATA, tone: 'adj' }), dots(g, DATA.map(([x, y], i) => ({ id: `p${i}`, x, y, tone: 'adj' })))];
  if (o.to) parts.push(polyline(g, { id: 'trend', points: [[4, 200], [o.to, 280 - 20 * o.to]], tone: 'adj', dashed: true }), dots(g, [{ id: 'pred', x: o.to, y: 280 - 20 * o.to, tex: `${280 - 20 * o.to}`, tone: 'good', place: 'right' }]));
  if (o.limit) parts.push(polyline(g, { id: 'limit', points: [[0, 60], [12, 60]], tone: 'bad', dashed: true }));
  return figure('g', parts, 440);
};

const video: Explainer = {
  id: 'xq-m203-8-2',
  lessonId: '',
  exam: {
    lesson: 'm203-8-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: When Will the Dugout Run Low? (Line Graphs)',
  thumbnailTitle: 'When Will the Water Run Low?',
  thumbnail: 'g',
  summary:
    'An exam-style question, solved one small step at a time: a line graph shows the water in a dugout falling from 280 cm to 200 cm over 4 weeks of a dry summer, at a steady rate. The depth falls 80 cm in 4 weeks, which is 20 cm a week. If the trend continues, after 8 weeks the depth is 280 − 8 × 20 = 120 cm, and it reaches 60 cm after (280 − 60) ÷ 20 = 11 weeks. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'When Will the Water Run Low?', subtitle: 'Line graphs, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about a line graph. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it. The dugout and its depths are made up.' },
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
            'A rancher measures the depth of the water in a dugout at the start of each week of a dry summer. The line graph shows the depths for the first $4$ weeks. The water level falls at a steady rate. (a) At what rate is the depth falling? (b) If the trend continues, what will the depth be after $8$ weeks? (c) The rancher must move the cattle to another pasture when the depth reaches $60$ cm. If the trend continues, after how many weeks will that be?',
          answer: '(a) $20$ cm a week (b) $120$ cm (c) after $11$ weeks',
          working: '(280 − 200) ÷ 4 = 20; 280 − 8 × 20 = 120; (280 − 60) ÷ 20 = 11',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A rancher measures the depth of the water in a dugout at the start of each week of a dry summer. The line graph shows the depths for the first 4 weeks, and the water level falls at a steady rate.' },
        { say: 'Part a: at what rate is the depth falling? Part b: if the trend continues, what will the depth be after 8 weeks?' },
        { say: 'Part c: the rancher must move the cattle when the depth reaches 60 centimetres. If the trend continues, after how many weeks will that be?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 640,
      left: [dugout()],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The graph', md: 'Weeks go **across** the bottom and the depth goes **up** the side. Each grid line up is worth $40$ cm.' }],
      lines: [
        { say: 'Here is the line graph. The weeks go across the bottom, and the depth goes up the side.', show: 'g' },
        { say: 'Each grid line up is worth 40 centimetres, so a point halfway between two lines is 20 centimetres from each.', show: 'c' },
        { say: 'The depth starts at 280 centimetres, at week 0, and is down to 200 by week 4.', focus: ['g.p0', 'g.p4'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{rate of change} = \\dfrac{\\text{change in depth}}{\\text{change in time}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'A steady trend', md: 'When the points lie on a **straight line**, the depth changes by the **same amount** each week. To predict, keep taking off that amount.' },
      ],
      lines: [
        { say: 'Here is what we need. The rate of change is the change in depth, divided by the change in time.', show: 'm' },
        { say: 'When the points lie on a straight line, the depth changes by the same amount every week. So to predict, we keep taking off that amount.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Read two points and find the **rate**', '(b) Take off **8 weeks** of the rate', '(c) Find how long the drop to $60$ cm **takes**'] }],
      lines: [
        { say: 'Here is the plan. For part a, read two points and find the rate.', show: 'plan.0' },
        { say: 'For part b, take 8 weeks of that rate off the starting depth.', show: 'plan.1' },
        { say: 'For part c, find how many weeks the drop down to 60 centimetres takes.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): The rate',
      layout: 'split',
      leftWidth: 640,
      left: [dugout()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['280 - 200 = 80 \\text{ cm}', '4 - 0 = 4 \\text{ weeks}', '80 \\div 4 = \\good{20 \\text{ cm a week}}'] }],
      lines: [
        { say: 'Part a. Use the first and last points, because they are far apart. At week 0 the depth is 280, and at week 4 it is 200. That is a drop of 80 centimetres.', show: ['g', 'm.0'], focus: ['g.p0', 'g.p4'] },
        { say: 'The time between them is 4 weeks, read from the bottom axis.', show: 'm.1' },
        { say: '80 divided by 4 is 20. The depth falls 20 centimetres a week.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Part (b): After 8 weeks',
      layout: 'split',
      leftWidth: 640,
      left: [dugout({ to: 8 })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['8 \\times 20 = 160 \\text{ cm}', '280 - 160 = \\good{120 \\text{ cm}}'] }],
      lines: [
        { say: 'Part b. In 8 weeks, at 20 centimetres a week, the water falls 8 times 20, which is 160 centimetres.', show: ['g.grid', 'g.axes', 'g.line', 'g.p0', 'g.p1', 'g.p2', 'g.p3', 'g.p4', 'm.0'] },
        { say: 'Take that off the starting depth: 280 minus 160 is 120. After 8 weeks, the depth will be about 120 centimetres. On the graph, the dashed line carries the trend on to week 8.', show: ['g.trend', 'g.pred', 'm.1'], focus: ['g.pred', 'm.1'] },
      ],
    },
    {
      chapter: 'Part (c): Down to 60 cm',
      layout: 'split',
      leftWidth: 640,
      left: [dugout({ to: 11, limit: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['280 - 60 = 220 \\text{ cm}', '220 \\div 20 = \\good{11 \\text{ weeks}}'] }],
      lines: [
        { say: 'Part c. The water has to fall from 280 centimetres down to 60. That is a drop of 220 centimetres.', show: ['g.grid', 'g.axes', 'g.line', 'g.p0', 'g.p1', 'g.p2', 'g.p3', 'g.p4', 'g.limit', 'm.0'], focus: 'g.limit' },
        { say: 'At 20 centimetres a week, 220 divided by 20 is 11. The depth reaches 60 centimetres after 11 weeks, so the rancher must move the cattle then.', show: ['g.trend', 'g.pred', 'm.1'], focus: ['g.pred', 'm.1'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Week', '$4$', '$5$', '$6$', '$7$', '$8$', '$9$', '$10$', '$11$'],
          rows: [['Depth (cm)', '$200$', '$180$', '$160$', '$140$', '**$120$**', '$100$', '$80$', '**$60$**']],
        },
      ],
      lines: [
        { say: 'Let us check by counting on, 20 centimetres a week, from week 4.', show: 't' },
        { say: 'Week 5 is 180, week 6 is 160, week 7 is 140, and week 8 is 120. That matches part b.' },
        { say: 'Week 9 is 100, week 10 is 80, and week 11 is 60. That matches part c. It checks out.' },
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
            ['(a) $16$ cm a week', 'divided by the **5 points**: the time is **4 weeks**'],
            ['(b) $160$ cm', 'that is how much it **fell**: take it off $280$'],
            ['(c) $14$ weeks', 'that is when it is **empty**: stop at $60$ cm'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '16 centimetres a week divides by the 5 points. But the time from week 0 to week 4 is 4 weeks. Read the time from the axis.' },
        { say: '160 centimetres is how much the water falls in 8 weeks, not the depth that is left. Take it off the 280.' },
        { say: 'And 14 weeks is 280 divided by 20, when the dugout would be empty. The rancher has to move the cattle sooner, at 60 centimetres.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A line graph shows a fuel tank draining at a steady rate: $480$ L at hour $0$ and $360$ L at hour $4$. If the trend continues, after how many hours will the tank be empty?',
          choices: ['$16$ hours', '$12$ hours', '$30$ hours', '$4$ hours'],
          answer: 0,
          working: '(480 − 360) ÷ 4 = 30 L an hour; 480 ÷ 30 = 16 hours.',
        },
      ],
      lines: [
        { say: 'Your turn. A line graph shows a fuel tank draining at a steady rate: 480 litres at hour 0 and 360 litres at hour 4. If the trend continues, after how many hours will the tank be empty? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'It drains 120 litres in 4 hours, which is 30 litres an hour. 480 divided by 30 is 16 hours. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Rate $=$ change in value $\\div$ change in **time**', 'Read the time from the **axis**', 'A steady trend: same change **each** week', 'Predictions assume the trend **continues**'] }],
      lines: [
        { say: 'Here is what to remember. A rate of change is the change in value, divided by the change in time.', show: 'sum.0' },
        { say: 'Read the time from the axis, not by counting points.', show: 'sum.1' },
        { say: 'A steady trend changes by the same amount each week, so you can carry it on.', show: 'sum.2' },
        { say: 'And a prediction only holds if the trend continues. A rainstorm would change everything. For more on line graphs, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
