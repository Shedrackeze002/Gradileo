import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';

// Exam question for Math 6 lesson 1.1 (negative numbers and magnitude). The question is an Everyday
// Math exercise from OpenStax Prealgebra 2e, word for word (section 3.1, Introduction to Integers,
// CC BY-NC-SA 4.0). 57° above zero is 57, and 90° below zero is −90. The magnitude (distance from
// zero) of −90 is 90, more than 57, so the coldest record is further from zero than the hottest.

const QUESTION =
  'Extreme temperatures The highest recorded temperature on Earth is 57° Celsius. The lowest recorded temperature is 90° below 0° Celsius. Use integers to write the: (a) highest recorded temperature (b) lowest recorded temperature';

/** A vertical number line from −100 to 60, with the two records and their distances from zero. */
const line = (id: string) =>
  figure(
    id,
    [
      vertical({
        min: -100,
        max: 60,
        step: 10,
        every: 2,
        unit: 0.05,
        points: [
          { id: 'hot', value: 57, tex: '57', tone: 'bad' },
          { id: 'cold', value: -90, tex: '{-90}', tone: 'adj' },
        ],
        moves: [
          { id: 'up', from: 0, to: 57, label: '57\\text{ above } 0', tone: 'bad', x: 1.9 },
          { id: 'down', from: 0, to: -90, label: '90\\text{ below } 0', tone: 'adj', x: 1.9 },
        ],
        room: 5.2,
      }),
    ],
    600,
  );

const video: Explainer = {
  id: 'xq-m6-1-1',
  lessonId: '',
  exam: {
    lesson: 'm6-1-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 3.1, Introduction to Integers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/3-1-introduction-to-integers',
    question: QUESTION,
  },
  title: 'Exam Question: The Hottest and Coldest Temperatures on Earth (Negative Numbers and Magnitude)',
  thumbnailTitle: 'Write 90° Below Zero',
  thumbnail: 'v',
  summary:
    'A real test question, solved one small step at a time: the highest temperature ever recorded on Earth is 57° Celsius, and the lowest is 90° below 0° Celsius. Write both as integers. Above zero is positive and below zero is negative, so the answers are 57 and −90. Then we compare their magnitudes, check on a number line and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Write 90° Below Zero', subtitle: 'Negative numbers and magnitude, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about negative numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Extreme temperatures** The highest recorded temperature on Earth is $57°$ Celsius. The lowest recorded temperature is $90°$ below $0°$ Celsius. Use integers to write the: (a) highest recorded temperature (b) lowest recorded temperature',
          answer: '(a) $57$ (b) $-90$',
          working: 'above zero is positive, below zero is negative',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'The highest recorded temperature on Earth is 57 degrees Celsius. The lowest recorded temperature is 90 degrees below zero degrees Celsius. Use integers to write part a, the highest recorded temperature, and part b, the lowest recorded temperature.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Integers', md: '**Integers** are the whole numbers, their **opposites** and zero: $\\dots, -2, -1, 0, 1, 2, \\dots$ We must write each temperature as **one** integer, with a **sign** if it needs one.' }],
      lines: [
        { say: 'Integers are the whole numbers, their opposites, and zero: negative two, negative one, zero, one, two, and so on.', show: 'c' },
        { say: 'So we must write each temperature as one integer, with a minus sign if it needs one.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Above and below zero', md: 'A temperature **above** zero is **positive**. A temperature **below** zero is **negative**. The **magnitude** of a number is its **distance from zero**, without the sign.' }],
      lines: [
        { say: 'Here is what we need. A temperature above zero is positive. A temperature below zero is negative.', show: 'c' },
        { say: 'And the magnitude of a number is how far it is from zero, without the sign. The magnitude of negative 90 is 90.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Is each temperature **above** or **below** zero?', 'Write the **sign** and the number', '**Compare** the distances from zero'] }],
      lines: [
        { say: 'Here is the plan. Decide if each temperature is above or below zero.', show: 'plan.0' },
        { say: 'Write the sign and the number.', show: 'plan.1' },
        { say: 'Then compare how far each one is from zero.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Write the integers',
      layout: 'split',
      leftWidth: 460,
      left: [line('v')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{(a) above } 0: \\ \\good{57}', '\\text{(b) below } 0: \\ \\good{-90}', '|{-90}| = 90 > 57'] }],
      lines: [
        { say: 'A thermometer is a number line that stands up. Zero is in the middle, positive numbers go up, and negative numbers go down.', show: 'v.axis' },
        { say: 'Part a. 57 degrees Celsius is above zero, so it is positive. We write it as 57.', show: ['v.up', 'v.hot', 'm.0'], focus: 'm.0' },
        { say: 'Part b. 90 degrees below zero is below zero, so it is negative. We write it as negative 90.', show: ['v.down', 'v.cold', 'm.1'], focus: 'm.1' },
        { say: 'Step three. The magnitude of negative 90 is 90, which is more than 57. So the coldest record is further from zero than the hottest record.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['57 > 0 \\ \\checkmark', '-90 < 0 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 57 is greater than zero, so it is above zero, like the hottest temperature.', show: 'm.0' },
        { say: 'Negative 90 is less than zero, so it is below zero, like the coldest temperature. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(b) $90$', 'forgot the **sign**: below zero is **negative**'],
            ['(a) $-57$', 'above zero is **positive**: no minus sign'],
            ['"$-90$ is the bigger number"', '$-90$ is **farther** from zero, but it is **less** than $57$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Writing 90 for part b forgets the sign. Below zero is negative, so it is negative 90.' },
        { say: 'Writing negative 57 for part a puts a minus sign on a temperature above zero. It is just 57.' },
        { say: 'And negative 90 has the bigger magnitude, but it is not the bigger number. It is colder, so it is less than 57.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A submarine is $250$ metres below the surface of the sea. Which integer gives its position?',
          choices: ['$250$', '$-25$', '$0$', '$-250$'],
          answer: 3,
          working: 'Below the surface is below zero, so the integer is negative: −250.',
        },
      ],
      lines: [
        { say: 'Your turn. A submarine is 250 metres below the surface of the sea. Which integer gives its position? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The surface is zero, and below zero is negative, so the position is negative 250. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Above** zero: positive', '**Below** zero: negative, with a **minus** sign', '**Magnitude**: the distance from zero', 'Bigger magnitude does not mean a bigger **number**'] }],
      lines: [
        { say: 'Here is what to remember. Above zero is positive.', show: 'sum.0' },
        { say: 'Below zero is negative, so write a minus sign.', show: 'sum.1' },
        { say: 'The magnitude of a number is its distance from zero.', show: 'sum.2' },
        { say: 'And a bigger magnitude does not always mean a bigger number. For more on negative numbers and magnitude, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
