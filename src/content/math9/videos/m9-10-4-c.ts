import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hundred } from '@/content/math6/videos/lib/m6-12-figures.ts';

// A hundred seeds, 88 of them sprouted (green): a probability of 0.88.
const seeds = (id: string) => figure(id, [hundred({ shaded: 88, tone: 'good' })], 440);

const video: Explainer = {
  id: 'm9-10-4-c',
  lessonId: 'm9-10-4',
  title: 'Probability in Society, Part 3: Predicting with Probability',
  thumbnailTitle: 'Predicting with Probability',
  thumbnail: 'sd',
  summary:
    'To predict how many times an outcome will happen, multiply: expected number = probability × number of trials. A carrot seed sprouts with a probability of 0.88, so about 88 of every 100 seeds sprout, and of 250 seeds, about 0.88 × 250 = 220 should sprout. The actual number is usually close to the expected number, but not exactly equal: 50 coin flips are expected to give 25 heads, but might give 23 or 27.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 3', title: 'Predicting with Probability', subtitle: 'Probability times the number of trials' }],
      lines: [
        { say: 'Gardeners, store owners and event planners all need to predict how often something will happen. Probability helps them do it.', show: 'title' },
        { say: 'In this video, you will use a probability to predict an expected number, and see how close the prediction really gets.' },
      ],
    },
    {
      chapter: 'Expected number',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Expected number',
          md: 'To predict how many times an outcome happens, multiply its probability by the number of trials. The actual number is usually **close** to the expected number, but not exactly equal.',
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{expected number} = \\text{probability} \\times \\text{number of trials}'] },
      ],
      lines: [
        { say: 'Each time you do something that has a chance in it, such as planting a seed or flipping a coin, that is called a trial.', show: 'def' },
        { say: 'To predict how many times an outcome will happen, multiply its probability by the number of trials. The result is called the expected number.', show: 'm', focus: 'm' },
        { say: 'The actual number is usually close to the expected number, but not exactly equal. You will see why in a moment.' },
      ],
    },
    {
      chapter: 'Planting seeds',
      layout: 'split',
      leftWidth: 520,
      left: [seeds('sd')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The probability that a carrot seed sprouts is $0.88$. Maya plants $250$ seeds. About how many should sprout?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['88 + 88 + 44 = 220', '0.88 \\times 250 = 220'] },
      ],
      lines: [
        { say: 'The probability that a carrot seed sprouts is zero point eight eight. Maya plants two hundred fifty seeds. About how many should sprout?', show: 'q' },
        { say: 'A probability of zero point eight eight means that about eighty eight of every hundred seeds sprout, like the green squares in this grid.', show: 'sd', focus: 'sd.shade' },
        { say: 'Two hundred fifty seeds is two full hundreds and half of another hundred. That is about eighty eight, plus eighty eight, plus forty-four, which is two hundred twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'The rule gives the same answer in one step. Zero point eight eight times two hundred fifty is two hundred twenty. So about two hundred twenty seeds should sprout.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Close, not exact',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Flip a coin $50$ times. $P(\\text{heads}) = 0.5$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{expected heads} = 0.5 \\times 50 = 25'] },
        { kind: 'text', id: 'a', size: 'md', md: 'You might get $23$ heads, or $27$. The expected number is a **prediction**, not a promise.' },
      ],
      lines: [
        { say: 'Here is a quick one. Flip a coin fifty times. The probability of heads is zero point five.', show: 'q' },
        { say: 'The expected number of heads is zero point five times fifty, which is twenty-five.', show: 'm', focus: 'm' },
        { say: 'But if you really flip fifty times, you might get twenty-three heads, or twenty-seven. Chance makes the actual number wobble around the expected number.', show: 'a' },
        { say: 'Maya’s garden is the same. About two hundred twenty seeds should sprout, but it could be two hundred fifteen, or two hundred twenty-four. The expected number is a prediction, not a promise.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The probability that a bus is on time is $0.9$. About how many of its next $40$ trips should be on time?',
          choices: ['$36$', '$4$', '$40$', '$9$'],
          answer: 0,
          working: 'Expected number $= 0.9 \\times 40 = 36$. About $36$ trips should be on time, and about $4$ should be late.',
        },
      ],
      lines: [
        { say: 'Your turn. The probability that a bus is on time is zero point nine. About how many of its next forty trips should be on time? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, thirty-six. Zero point nine times forty is thirty-six. Choice B is the number of trips expected to be late, not on time.', show: 'q.answer' },
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
            'Expected number $=$ probability $\\times$ number of trials.',
            'A carrot seed sprouts with probability $0.88$: of $250$ seeds, about $0.88 \\times 250 = 220$ sprout.',
            'The actual number is usually close to the expected number, but not exactly equal.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The expected number equals the probability times the number of trials.', show: 'sum.0' },
        { say: 'With a probability of zero point eight eight, about two hundred twenty of two hundred fifty seeds should sprout.', show: 'sum.1' },
        { say: 'And the actual number is usually close to the expected number, but not exactly equal. In the next part, you will use probabilities to make a decision. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
