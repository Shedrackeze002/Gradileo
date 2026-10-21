import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { headedTree } from '@/content/math30-3/videos/lib/m303-7-figures.ts';

const t = (s: string) => `\\text{${s}}`;

// Kiona makes 80% of her free throws, and her shots are independent. Two shots: make both
// 0.8 × 0.8 = 0.64, make then miss 0.16, miss then make 0.16, miss both 0.2 × 0.2 = 0.04.
const shot = [
  { name: t('Make'), p: '0.8', tone: 'good' as const },
  { name: t('Miss'), p: '0.2', tone: 'bad' as const },
];
const shots = (id: string) =>
  figure(
    id,
    [
      headedTree({
        first: shot,
        second: [shot, shot],
        ends: ['0.64', '0.16', '0.16', '0.04'],
        heads: [t('First shot'), t('Second shot')],
        gap: 1.6,
        groupGap: 1,
        room: 3,
      }),
    ],
    330,
  );
const branches = (id: string) => [`${id}.start`, `${id}.heads`, `${id}.s1`, `${id}.s2-0`, `${id}.s2-1`];

const video: Explainer = {
  id: 'm8-10-2-e',
  lessonId: 'm8-10-2',
  title: 'Probability of Independent Events, Part 5: Two in a Row and Predictions',
  thumbnailTitle: 'Two in a Row',
  thumbnail: 'ft',
  summary:
    'Kiona makes 80% of her free throws, and her shots are independent, so she makes two in a row with probability 0.8 × 0.8 = 0.64, or 64%, and misses both with probability 0.2 × 0.2 = 0.04, or 4%. To predict how often something happens, multiply its probability by the number of times: over 50 weekends with a 12% chance of rain on both days, expect about 0.12 × 50 = 6 such weekends, and in 25 pairs of free throws, expect Kiona to make both about 0.64 × 25 = 16 times.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability · Part 5', title: 'Two in a Row and Predictions', subtitle: 'Repeat a chance, then predict' }],
      lines: [
        { say: 'A basketball player is good at free throws. But what is the chance she makes two in a row? And how many times might that happen in a season?', show: 'title' },
        { say: 'In this video, you will multiply a probability by itself, and then use probability to make predictions.' },
      ],
    },
    {
      chapter: 'Two free throws',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Kiona makes $80\\%$ of her free throws. Her shots are independent. What is the probability she makes **two in a row**?' },
        shots('ft'),
        { kind: 'math', id: 'm', size: 'md', lines: ['80\\% = 0.8', '0.8 \\times 0.8 = 0.64 = 64\\%'] },
      ],
      lines: [
        { say: 'Kiona makes eighty percent of her free throws. Assume each shot does not change the next one, so her shots are independent. What is the probability she makes two in a row?', show: ['q', ...branches('ft')] },
        { say: 'Change eighty percent to a decimal: zero point eight.', show: 'm.0', focus: 'm.0' },
        { say: 'Making the first shot and the second shot is the top path. Multiply: zero point eight times zero point eight is zero point six four.', show: 'ft.e0-0', focus: ['ft.b0', 'ft.b0-0', 'ft.e0-0'] },
        { say: 'So the probability she makes two in a row is sixty-four percent. That is less than eighty percent, because now both shots have to go in.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Missing both',
      layout: 'center',
      main: [shots('mb'), { kind: 'math', id: 'm', size: 'md', lines: ['100\\% - 80\\% = 20\\% \\qquad 0.2 \\times 0.2 = 0.04 = 4\\%', '\\text{at least one: } 100\\% - 4\\% = 96\\%'] }],
      lines: [
        { say: 'What is the chance she misses both shots? She misses one hundred minus eighty, which is twenty percent of her shots.', show: branches('mb'), focus: ['mb.b1', 'mb.b1-1'] },
        { say: 'Multiply along the bottom path: zero point two times zero point two is zero point zero four. That is only four percent.', show: ['m.0', 'mb.e1-1'], focus: ['m.0', 'mb.b1', 'mb.b1-1', 'mb.e1-1'] },
        { say: 'So she makes at least one of the two shots with probability one hundred minus four, which is ninety-six percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Making predictions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Expected number', md: 'To predict how often something happens, multiply its **probability** by the **number of times**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{rain both days, } 50 \\text{ weekends: } 0.12 \\times 50 = 6', '\\text{two in a row, } 25 \\text{ pairs: } 0.64 \\times 25 = 16'] },
      ],
      lines: [
        { say: 'Probabilities also help you predict. To predict how often something will happen, multiply its probability by the number of times.', show: 'tip' },
        { say: 'Remember the camping weekend, with a twelve percent chance of rain on both days. Over fifty weekends like that one, expect rain on both days about zero point one two times fifty, which is six times.', show: 'm.0', focus: 'm.0' },
        { say: 'And if Kiona shoots twenty-five pairs of free throws, expect her to make both shots about zero point six four times twenty-five, which is sixteen times.', show: 'm.1', focus: 'm.1' },
        { say: 'These are predictions, not promises. The real numbers can come out a little higher or lower.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A spinner lands on blue with probability $\\dfrac{1}{4}$. You spin it twice, and do that $80$ times. About how many times do you expect blue **both** times?',
          choices: ['$20$', '$10$', '$40$', '$5$'],
          answer: 3,
          working: '$P(\\text{blue both times}) = \\dfrac{1}{4} \\times \\dfrac{1}{4} = \\dfrac{1}{16}$, and $\\dfrac{1}{16} \\times 80 = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. A spinner lands on blue with probability one quarter. You spin it twice, and you do that eighty times. About how many times do you expect blue both times? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D: five. Blue both times has probability one quarter times one quarter, which is one sixteenth, and one sixteenth of eighty is five. Choice A, twenty, uses one quarter, the chance of blue on just one spin.', show: 'q.answer' },
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
            'Events are independent when one does not change the probability of the other. Putting a card back keeps the picks independent.',
            'A table or tree diagram shows all the outcomes. Multiply along a branch of a tree.',
            '$P(A \\text{ and } B) = P(A) \\times P(B)$ for independent events.',
            '$P(\\text{not } A) = 1 - P(A)$, or $100\\%$ minus the percent, and $P(\\text{at least one}) = 1 - P(\\text{neither})$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up this lesson. Events are independent when one does not change the probability of the other. Putting a card back keeps the picks independent.', show: 'sum.0' },
        { say: 'A table or a tree diagram shows all the outcomes. Multiply along a branch of a tree.', show: 'sum.1' },
        { say: 'For independent events, the probability that both happen is the product of their probabilities.', show: 'sum.2' },
        { say: 'And the chance that an event does not happen is one minus its probability, so the chance of at least one is one minus the chance of neither. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
