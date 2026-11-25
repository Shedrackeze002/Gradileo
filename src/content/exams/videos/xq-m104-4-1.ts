import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 4.1 (integers around us). The question is an Everyday Math
// exercise from OpenStax Prealgebra 2e, word for word (section 3.1, Introduction to Integers,
// CC BY-NC-SA 4.0). Above sea level is positive and below is negative, so (a) 20,320 and (b) −282,
// as in the book's answer. Check: −282 < 0 < 20,320 on the number line.

type P = [number, number];

/** Sea level with the mountain above it and the valley below it (not to scale). */
const land = (height = 360): DiagramEl => {
  const points: Record<string, P> = {
    s0: [-3.4, 0], s1: [10, 0], m0: [0.8, 0], m1: [2.6, 3.2], m2: [4.4, 0], mn: [2.6, 1.1],
    v0: [5.9, 0], v1: [7.3, -1.3], v2: [8.7, 0], vn: [7.3, 0.05],
  };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'mr', points: ['m0', 'm1', 'm2'], tone: 'good', shade: 0.3, group: 'up' },
    { kind: 'curve', id: 'mo', points: ['m0', 'm1', 'm2'], tone: 'good', weight: 3, group: 'up' },
    { kind: 'label', id: 'mname', at: 'mn', tex: '\\text{McKinley}', place: 'center', group: 'up' },
    { kind: 'region', id: 'vr', points: ['v0', 'v1', 'v2'], tone: 'opp', shade: 0.3, group: 'down' },
    { kind: 'curve', id: 'vo', points: ['v0', 'v1', 'v2'], tone: 'opp', weight: 3, group: 'down' },
    { kind: 'label', id: 'vname', at: 'vn', tex: '\\text{Death Valley}', place: 'above', group: 'down' },
    { kind: 'line', id: 'sea', from: 's0', to: 's1', tone: 'brand', weight: 3, group: 'sea' },
    { kind: 'label', id: 'zl', at: 's0', tex: '\\text{sea level} = 0', tone: 'brand', place: 'below right', group: 'sea' },
    { kind: 'label', id: 'mv', at: 'm1', tex: '+20{,}320 \\text{ ft}', tone: 'good', place: 'right', group: 'upv' },
    { kind: 'label', id: 'vv', at: 'v1', tex: '-282 \\text{ ft}', tone: 'opp', place: 'below', group: 'downv' },
  ];
  return { kind: 'diagram', id: 'land', height, points, items };
};

const QUESTION =
  'Elevation The highest elevation in the United States is Mount McKinley, Alaska, at 20,320 feet above sea level. The lowest elevation is Death Valley, California, at 282 feet below sea level. Use integers to write the elevation of: (a) Mount McKinley (b) Death Valley';

const video: Explainer = {
  id: 'xq-m104-4-1',
  lessonId: '',
  exam: {
    lesson: 'm104-4-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 3.1, Introduction to Integers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/3-1-introduction-to-integers',
    question: QUESTION,
  },
  title: 'Exam Question: Above and Below Sea Level (Integers Around Us)',
  thumbnailTitle: 'Above and Below Sea Level',
  thumbnail: 'land',
  summary:
    'A real test question, solved one small step at a time: Mount McKinley is 20,320 feet above sea level, and Death Valley is 282 feet below sea level. Use integers to write each elevation. Sea level is zero, above is positive and below is negative, so the answers are 20,320 and −282. Then we check on a number line and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Above and Below Sea Level', subtitle: 'Integers around us, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about integers in everyday life. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: '**Elevation** The highest elevation in the United States is Mount McKinley, Alaska, at $20{,}320$ feet above sea level. The lowest elevation is Death Valley, California, at $282$ feet below sea level. Use integers to write the elevation of: (a) Mount McKinley (b) Death Valley',
          answer: '(a) $20{,}320$ (b) $-282$',
          working: 'above sea level: $+$, below sea level: $-$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'The highest elevation in the United States is Mount McKinley, Alaska, at twenty thousand, three hundred and twenty feet above sea level. The lowest elevation is Death Valley, California, at 282 feet below sea level. Use integers to write the elevation of Mount McKinley, and of Death Valley.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [land(), { kind: 'text', id: 't', size: 'md', md: 'Write each height as **one number**, with a **sign**. (The picture is not to scale.)' }],
      lines: [
        { say: 'Elevation means height compared with sea level. Here is sea level.', show: 'land.sea' },
        { say: 'Mount McKinley rises above it,', show: 'land.up' },
        { say: 'and Death Valley dips below it.', show: 'land.down' },
        { say: 'The question asks us to write each height as one number, with a sign that says above or below. The picture is not drawn to scale.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{sea level} = 0', '\\text{above} \\to +, \\qquad \\text{below} \\to -'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Integers have a sign', md: 'An **integer** is a whole number that can be **positive**, **negative** or **zero**. Words like *above*, *gain* and *rise* mean positive. Words like *below*, *loss* and *drop* mean **negative**.' },
      ],
      lines: [
        { say: 'Here is what we need. Sea level is zero. Heights above it are positive, and depths below it are negative.', show: 'f' },
        { say: 'An integer is a whole number that can be positive, negative or zero. Words like above, gain and rise mean positive. Words like below, loss and drop mean negative.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **zero**: sea level', 'Above sea level: **positive**', 'Below sea level: **negative**'] }],
      lines: [
        { say: 'Here is the plan. Find the zero: here it is sea level.', show: 'plan.0' },
        { say: 'Write the height above sea level as a positive number.', show: 'plan.1' },
        { say: 'Then write the depth below sea level as a negative number.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Mount McKinley',
      layout: 'center',
      main: [land(320), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) Mount McKinley} = \\good{20{,}320}'] }],
      lines: [
        { say: 'Step one. Mount McKinley is 20 thousand 320 feet above sea level. Above means positive, so its elevation is positive 20 thousand 320.', show: ['land.sea', 'land.up', 'land.down', 'land.upv'] },
        { say: 'We usually leave out the plus sign, so we write 20,320.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Step 2: Death Valley',
      layout: 'center',
      main: [land(320), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(b) Death Valley} = \\good{-282}'] }],
      lines: [
        { say: 'Step two. Death Valley is 282 feet below sea level. Below means negative, so its elevation is negative 282.', show: ['land.sea', 'land.up', 'land.down', 'land.upv', 'land.downv'] },
        { say: 'This time the sign must be written: minus 282.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['-282 \\ < \\ 0 \\ < \\ 20{,}320', '\\text{lowest} < \\text{sea level} < \\text{highest} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. On a number line, negative 282 is to the left of zero, and 20,320 is to the right of it.', show: 'm.0' },
        { say: 'So the lowest place gets the smallest number, and the highest place gets the biggest. That matches the question. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$282$', 'dropped the sign: **below** sea level is **negative**'],
            ['$-20{,}320$', 'above sea level is **positive**'],
            ['$20{,}320 - 282$', 'the question asks for **each** elevation, not the difference'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Writing just 282 loses the word below. Below sea level is negative, so write minus 282.' },
        { say: 'A minus sign on Mount McKinley would put it under the sea. Above sea level is positive.' },
        { say: 'And the question asks for each elevation on its own, not how far apart they are.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A diver swims $35$ metres below the surface of the sea. Use an integer to write the diver’s position compared with sea level.',
          choices: ['$35$', '$-35$', '$3.5$', '$-3.5$'],
          answer: 1,
          working: 'Below sea level is negative, so the position is $-35$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A diver swims 35 metres below the surface of the sea. Use an integer to write the diver\'s position compared with sea level. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Below sea level is negative, so the diver is at negative 35 metres. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the **zero** first', 'Above, gain, rise: **positive**', 'Below, loss, drop: **negative**', 'Always write the **minus** sign'] }],
      lines: [
        { say: 'Here is what to remember. Find the zero first. For elevation, it is sea level.', show: 'sum.0' },
        { say: 'Above, gain and rise mean positive.', show: 'sum.1' },
        { say: 'Below, loss and drop mean negative.', show: 'sum.2' },
        { say: 'And always write the minus sign on a negative number. For more on integers around us, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
