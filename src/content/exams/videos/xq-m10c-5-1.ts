import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 5.1 (interpreting and sketching graphs). Gradileo wrote this
// one, in the style of a Grade 10 relations test, because the free question banks only ask about
// story graphs through pictures they do not describe. Jordan rides 6 km out in 20 minutes
// (0.3 km/min), rests for 10 minutes, and rides home in 15 minutes (0.4 km/min), so the ride home
// is the fastest part.

/**
 * Jordan's distance from home against time. Distances are drawn 5 times taller than they are
 * (6 km is 30 units up), so that the graph is not flat.
 */
const graph = (height = 330): DiagramEl => ({
  kind: 'diagram',
  id: 'g',
  height,
  points: { O: [0, 0], X: [54, 0], Y: [0, 38], A: [20, 30], B: [30, 30], C: [45, 0], A0: [20, 0], B0: [30, 0], K: [0, 30] },
  items: [
    { kind: 'line', id: 'xaxis', from: 'O', to: 'X', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'line', id: 'yaxis', from: 'O', to: 'Y', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'label', id: 'xt', at: 'X', tex: '\\text{min}', place: 'right', group: 'axes' },
    { kind: 'label', id: 'yt', at: 'Y', tex: '\\text{km}', place: 'above', group: 'axes' },
    { kind: 'label', id: 'o', at: 'O', tex: '0', place: 'below left', group: 'axes' },
    { kind: 'line', id: 'ga', from: 'A', to: 'A0', tone: 'muted', dashed: true, group: 'guides' },
    { kind: 'line', id: 'gb', from: 'B', to: 'B0', tone: 'muted', dashed: true, group: 'guides' },
    { kind: 'line', id: 'gk', from: 'A', to: 'K', tone: 'muted', dashed: true, group: 'guides' },
    { kind: 'label', id: 't20', at: 'A0', tex: '20', place: 'below', group: 'guides' },
    { kind: 'label', id: 't30', at: 'B0', tex: '30', place: 'below', group: 'guides' },
    { kind: 'label', id: 't45', at: 'C', tex: '45', place: 'below', group: 'guides' },
    { kind: 'label', id: 'k6', at: 'K', tex: '6', place: 'left', group: 'guides' },
    { kind: 'line', id: 'out', from: 'O', to: 'A', tone: 'adj', weight: 5 },
    { kind: 'line', id: 'rest', from: 'A', to: 'B', tone: 'theta', weight: 5 },
    { kind: 'line', id: 'home', from: 'B', to: 'C', tone: 'opp', weight: 5 },
  ],
});
const GRAPH = ['g', 'g.axes', 'g.guides', 'g.out', 'g.rest', 'g.home'];

const QUESTION =
  'The graph shows Jordan’s distance from home, in kilometres, during a bike ride, against the time in minutes. [The graph rises in a straight line from 0 km at 0 minutes to 6 km at 20 minutes, stays flat at 6 km until 30 minutes, then falls in a straight line to 0 km at 45 minutes.] Which statement is true?';
const CHOICES = [
  'Jordan rode uphill for the first 20 minutes.',
  'Jordan rode fastest between 30 and 45 minutes.',
  'Jordan was farthest from home at 45 minutes.',
  'Jordan rode at the same speed both ways.',
];

const video: Explainer = {
  id: 'xq-m10c-5-1',
  lessonId: '',
  exam: {
    lesson: 'm10c-5-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 10 relations test',
    licence: 'Written by Gradileo',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Read the Story in a Graph. Jordan’s Bike Ride',
  thumbnailTitle: 'Read the Story in a Graph',
  thumbnail: 'g',
  summary:
    'An exam-style question, solved one small step at a time: a graph shows Jordan\'s distance from home during a bike ride. We read what each piece of the graph means, work out the speed on the way out and on the way home, and find that the steepest piece, the ride home, is the fastest. Then we check every choice and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Read the Story in a Graph', subtitle: 'Interpreting graphs, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about reading the story in a graph. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 10 relations test. It says so at the bottom of the screen the whole way through.' },
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
          prompt: 'The graph shows Jordan’s distance from home, in kilometres, during a bike ride, against the time in minutes. It rises from $0$ km at $0$ min to $6$ km at $20$ min, stays flat until $30$ min, then falls to $0$ km at $45$ min. Which statement is true?',
          choices: CHOICES,
          answer: 1,
          working: 'Out: $6 \\div 20 = 0.3$ km/min. Home: $6 \\div 15 = 0.4$ km/min, the steepest piece.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'The graph shows Jordan’s distance from home, in kilometres, during a bike ride, against the time in minutes. It rises in a straight line from 0 kilometres at 0 minutes to 6 kilometres at 20 minutes. It stays flat until 30 minutes. Then it falls in a straight line to 0 kilometres at 45 minutes. Which statement is true?' },
        { say: 'A, Jordan rode uphill for the first 20 minutes. B, Jordan rode fastest between 30 and 45 minutes. C, Jordan was farthest from home at 45 minutes. D, Jordan rode at the same speed both ways. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Across: **time** in minutes. Up: **distance from home** in km. Each piece of the graph tells part of the story.' }],
      lines: [
        { say: 'Let us picture it. Time goes across, in minutes. Distance from home goes up, in kilometres.', show: ['g', 'g.axes'] },
        { say: 'The graph has three straight pieces. The question asks which statement about the ride matches the graph.', show: ['g.out', 'g.rest', 'g.home', 'g.guides', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'shapes',
          head: ['The piece of graph', 'What it means'],
          rows: [
            ['rises', 'moving **away** from home'],
            ['flat', '**stopped**: the distance is not changing'],
            ['falls', 'moving **towards** home'],
            ['steeper', '**faster**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. On a graph of distance from home against time, a piece that rises means moving away from home.', show: 'shapes' },
        { say: 'A flat piece means stopped, because the distance is not changing. A piece that falls means moving towards home.' },
        { say: 'And a steeper piece means faster, because more distance is covered in the same time.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read what each **piece** means', 'Work out the **speed** going out and coming home', 'Test each **choice**'] }],
      lines: [
        { say: 'Here is the plan. First, read what each piece of the graph means.', show: 'plan.0' },
        { say: 'Second, work out the speed going out and the speed coming home.', show: 'plan.1' },
        { say: 'Third, test each choice against what we found.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Read each piece',
      layout: 'split',
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['0\\text{ to }20: \\text{ away from home}', '20\\text{ to }30: \\text{ stopped}', '30\\text{ to }45: \\text{ back home}'] }],
      lines: [
        { say: 'Step one. From 0 to 20 minutes, the graph rises to 6 kilometres. Jordan rides away from home.', show: ['g', 'g.axes', 'g.guides', 'g.out', 'm.0'], focus: 'g.out' },
        { say: 'From 20 to 30 minutes, it is flat. Jordan stops for 10 minutes, still 6 kilometres from home.', show: ['g.rest', 'm.1'], focus: 'g.rest' },
        { say: 'From 30 to 45 minutes, it falls back to 0. Jordan rides home.', show: ['g.home', 'm.2'], focus: 'g.home' },
      ],
    },
    {
      chapter: 'Step 2: Compare the speeds',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{out: } \\dfrac{6\\text{ km}}{20\\text{ min}} = 0.3\\text{ km/min}', '\\text{home: } \\dfrac{6\\text{ km}}{15\\text{ min}} = \\good{0.4\\text{ km/min}}'] }],
      lines: [
        { say: 'Step two. Going out, Jordan rides 6 kilometres in 20 minutes. That is 0.3 kilometres a minute.', show: 'm.0' },
        { say: 'Coming home, Jordan rides the same 6 kilometres in only 15 minutes, from 30 to 45. That is 0.4 kilometres a minute, faster. So the answer is B: Jordan rode fastest between 30 and 45 minutes.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{A: a graph is not a map} \\ \\times', '\\text{B: } 0.4 > 0.3 \\ \\checkmark', '\\text{C: at 45 min, distance} = 0 \\ \\times', '\\text{D: } 0.3 \\neq 0.4 \\ \\times'] }],
      lines: [
        { say: 'Let us check every choice. A is wrong: the graph rising means getting farther from home, not going uphill.', show: [...GRAPH, 'm.0'] },
        { say: 'B is right: the ride home is the steepest piece, and 0.4 is more than 0.3.', show: 'm.1', focus: 'g.home' },
        { say: 'C is wrong: at 45 minutes the distance is 0, so Jordan is home. Jordan was farthest away, 6 kilometres, from 20 to 30 minutes.', show: 'm.2', focus: 'g.rest' },
        { say: 'And D is wrong, because the two speeds are different.', show: 'm.3' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Why it is wrong'],
          rows: [
            ['Rising means uphill', 'the graph shows **distance from home**, not a hill'],
            ['The end of the graph is the farthest', 'the **highest** point is the farthest'],
            ['Longer piece means faster', '**steeper** means faster'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'A distance graph is not a picture of the road. Rising means moving away, not riding uphill.' },
        { say: 'The farthest point is the highest point of the graph, not the end of it.' },
        { say: 'And the longest piece is not the fastest. The steepest piece is.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'On a graph of distance from home against time, a piece that falls down to the time axis means that the person is:',
          choices: ['walking downhill', 'standing still', 'moving back towards home', 'speeding up'],
          answer: 2,
          working: 'The distance from home is getting smaller, down to $0$: the person is going home.',
        },
      ],
      lines: [
        { say: 'Your turn. On a graph of distance from home against time, a piece that falls down to the time axis means the person is doing what? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The distance from home gets smaller, all the way to 0. So the person is moving back towards home, choice C. Standing still would be flat, and the graph is not a picture of a hill.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Rises**: away. **Flat**: stopped. **Falls**: towards home', '**Steeper** means faster', 'Speed $=$ distance $\\div$ time for each piece', 'A graph is **not** a map'] }],
      lines: [
        { say: 'Here is what to remember. On a distance graph, rising means moving away, flat means stopped, and falling means coming back.', show: 'sum.0' },
        { say: 'A steeper piece means faster.', show: 'sum.1' },
        { say: 'To compare, work out the speed of each piece: distance divided by time.', show: 'sum.2' },
        { say: 'And a graph is not a map. For more on interpreting graphs, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
