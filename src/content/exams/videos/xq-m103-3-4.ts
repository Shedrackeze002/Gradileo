import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 3.4 (temperature). The question is a Your Turn from OpenStax
// Contemporary Mathematics, word for word (section 9.5, Measuring Temperature, CC BY-NC-SA 4.0).
// C = 5/9 (302 − 32) = 5/9 × 270 = 150 °C; cooling 150 °C at 5 °C every 6 minutes takes
// 150 ÷ 5 = 30 drops of 6 minutes, 180 minutes, as in the book's answer. Check: after 180
// minutes the temperature is 150 − 5 × 30 = 0 °C.

/** Temperature in °C against time in minutes. */
const g = plane({ x: [0, 200], y: [0, 160], xStep: 20, yStep: 20, every: 2, width: 9, height: 7, titles: { x: '\\text{time (min)}', y: '{}^\\circ\\text{C}' } });
const graph = (height = 460) =>
  figure(
    'g',
    [
      g,
      plot(g, { id: 'cool', f: (t) => 150 - (5 * t) / 6, from: 0, to: 180, tone: 'adj' }),
      dots(g, [
        { id: 'start', x: 0, y: 150, tex: '150^\\circ', tone: 'opp', place: 'right' },
        { id: 'end', x: 180, y: 0, tex: '180 \\text{ min}', tone: 'theta', place: 'above right' },
      ]),
    ],
    height,
  );

const QUESTION =
  'After reaching a temperature of 302 °F a chemical compound cools at the rate of 5 °C every 6 minutes. How long will it take until the compound has reached a temperature of zero degree Celsius.';

const video: Explainer = {
  id: 'xq-m103-3-4',
  lessonId: '',
  exam: {
    lesson: 'm103-3-4',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 9.5, Measuring Temperature',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/9-5-measuring-temperature',
    question: QUESTION,
  },
  title: 'Exam Question: How Long to Cool From 302 °F to 0 °C? (Temperature)',
  thumbnailTitle: 'Cooling From 302 °F to 0 °C',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: a chemical compound reaches 302 °F, then cools by 5 °C every 6 minutes. How long until it reaches 0 °C? The temperature and the rate use different scales, so we first change 302 °F to Celsius: 5/9 × (302 − 32) = 150 °C. Cooling 150 degrees at 5 degrees a step takes 30 steps of 6 minutes, which is 180 minutes. Then we check with a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Cooling From 302 °F to 0 °C', subtitle: 'Temperature, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about temperature. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'After reaching a temperature of $302$ °F a chemical compound cools at the rate of $5$ °C every $6$ minutes. How long will it take until the compound has reached a temperature of zero degree Celsius.',
          answer: '$180$ minutes',
          working: '$302$ °F $= 150$ °C, and $150 \\div 5 = 30$ lots of $6$ minutes',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A chemical compound reaches 302 degrees Fahrenheit. Then it cools at a rate of 5 degrees Celsius every 6 minutes. How long will it take to reach zero degrees Celsius?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['We know', 'Scale'],
          rows: [
            ['start: $302^\\circ$', '**Fahrenheit**'],
            ['cools $5^\\circ$ every $6$ min', '**Celsius**'],
            ['end: $0^\\circ$', '**Celsius**'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'The start is in **°F**, but the rate and the end are in **°C**. We must use **one** scale.' },
      ],
      lines: [
        { say: 'Here is what we know. The compound starts at 302 degrees, but that is Fahrenheit.', show: 'tab' },
        { say: 'The cooling rate and the end temperature are in Celsius. We cannot mix the two scales, so we must change the start temperature to Celsius first.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['C = \\dfrac{5}{9}(F - 32)'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Subtract first', md: 'Take $32$ off the Fahrenheit temperature **first**, then multiply by $\\tfrac{5}{9}$.' },
      ],
      lines: [
        { say: 'Here is what we need. To change Fahrenheit to Celsius, C equals five ninths of F minus 32.', show: 'f' },
        { say: 'The brackets matter. Take 32 off first, then multiply by five ninths.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change $302$ °F to **°C**', 'Find how many degrees it must **cool**', 'Find the **time**'] }],
      lines: [
        { say: 'Here is the plan. Change 302 degrees Fahrenheit to Celsius.', show: 'plan.0' },
        { say: 'Find how many degrees the compound must cool.', show: 'plan.1' },
        { say: 'Then find how long that takes.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Fahrenheit to Celsius',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['C = \\dfrac{5}{9}(302 - 32) = \\dfrac{5}{9} \\times 270', 'C = \\good{150^\\circ\\text{C}}'] }],
      lines: [
        { say: 'Step one. 302 minus 32 is 270. Five ninths of 270 is 270 divided by 9, which is 30, times 5.', show: 'm.0' },
        { say: 'That is 150 degrees Celsius. The compound starts at 150 degrees Celsius.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: How far it cools',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['150^\\circ\\text{C} - 0^\\circ\\text{C} = \\good{150^\\circ\\text{C}}'] }],
      lines: [
        { say: 'Step two. It must cool from 150 degrees down to zero, which is a drop of 150 degrees Celsius.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: The time',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['150 \\div 5 = 30 \\text{ drops of } 5^\\circ', '30 \\times 6 \\text{ min} = \\good{180 \\text{ minutes}}'] }],
      lines: [
        { say: 'Step three. It cools 5 degrees at a time. 150 divided by 5 is 30, so it needs 30 drops of 5 degrees.', show: 'm.0' },
        { say: 'Each drop takes 6 minutes. 30 times 6 is 180 minutes, which is 3 hours.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 640,
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['150 - 5 \\times 30 = 0 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a graph. Here is the temperature in Celsius against time. It starts at 150 degrees.', show: ['g.grid', 'g.axes', 'g.start'] },
        { say: 'It falls steadily, 5 degrees every 6 minutes.', show: 'g.cool' },
        { say: 'It reaches zero at 180 minutes.', show: 'g.end' },
        { say: 'In numbers: 30 drops of 5 degrees take 150 degrees off, which leaves zero. It checks out.', show: 'm', focus: 'm.0' },
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
            ['$302 \\div 5 \\times 6$', '$302$ is **°F**, but the rate is in **°C**'],
            ['$\\tfrac{5}{9} \\times 302 - 32$', 'take off $32$ **first**: $302 - 32$'],
            ['Answer "$30$"', '$30$ is the number of **drops**: each takes $6$ min'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '302 is in Fahrenheit, but the cooling rate is in Celsius. Using 302 with a Celsius rate mixes the scales.' },
        { say: 'In the formula, take 32 off first, then multiply by five ninths.' },
        { say: 'And 30 is the number of drops, not the time. Each drop takes 6 minutes.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A pot of soup is at $167$ °F. It cools by $5$ °C every $4$ minutes. How long until it reaches $25$ °C?',
          choices: ['$10$ min', '$60$ min', '$40$ min', '$114$ min'],
          answer: 2,
          working: '$\\tfrac{5}{9}(167 - 32) = 75$ °C. It cools $50$°, which is $10$ drops of $4$ min: $40$ min.',
        },
      ],
      lines: [
        { say: 'Your turn. A pot of soup is at 167 degrees Fahrenheit. It cools by 5 degrees Celsius every 4 minutes. How long until it reaches 25 degrees Celsius? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Five ninths of 167 minus 32 is five ninths of 135, which is 75 degrees Celsius. It must cool from 75 to 25, which is 50 degrees. That is 10 drops of 5 degrees, at 4 minutes each: 40 minutes. Choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use **one** temperature scale', '$C = \\tfrac{5}{9}(F - 32)$: subtract **first**', 'Find how many degrees it must change', 'Number of drops $\\times$ time for each drop'] }],
      lines: [
        { say: 'Here is what to remember. Use one temperature scale for the whole question.', show: 'sum.0' },
        { say: 'C is five ninths of F minus 32. Subtract first.', show: 'sum.1' },
        { say: 'Find how many degrees the temperature must change.', show: 'sum.2' },
        { say: 'Then multiply the number of drops by the time for each drop. For more on temperature, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
