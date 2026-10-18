import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratioBar } from '../../math30-2/videos/lib/m302-3-figures.ts';
import { coins } from './lib/m303-7-figures.ts';

const video: Explainer = {
  id: 'm303-7-1-d',
  lessonId: 'm303-7-1',
  title: 'Probability and Odds, Part 4: Expected Outcomes and Judging Claims',
  thumbnailTitle: 'Expected Outcomes',
  thumbnail: 'flips',
  summary: 'Expected number = probability × number of trials: if 3% of welds need redoing, about 0.03 × 800 = 24 of the next 800 will. Probability describes the long run, which settles four common claims: tails is never "due", a dry day does not prove a 70% forecast wrong, two outcomes are not always 50–50, and an expected number is never guaranteed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 4', title: 'Expected Outcomes and Judging Claims', subtitle: 'What probability says about the long run' }],
      lines: [
        { say: 'A probability cannot tell you what will happen next time. But it can tell you what to expect over many tries, and that helps you judge claims about chance.', show: 'title' },
        { say: 'In this video, you will use a probability to predict how many times something will happen, and then test four common claims against what probability really says.' },
      ],
    },
    {
      chapter: 'The expected number',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{expected number} = \\text{probability} \\times \\text{number of trials}'] },
        { kind: 'text', id: 't', size: 'md', md: 'A **trial** is one try: one coin toss, one weld, one day. A fair coin tossed $100$ times is expected to land heads about $\\dfrac{1}{2} \\times 100 = 50$ times.' },
      ],
      lines: [
        { say: 'A probability tells you what to expect over many trials. A trial is one try: one coin toss, one weld, or one day.', show: 'f' },
        { say: 'The expected number of times an event happens is its probability, times the number of trials.', focus: 'f' },
        { say: 'For example, a fair coin lands heads with a probability of one half. Toss it a hundred times, and you expect about one half of a hundred, or fifty, heads.', show: 't' },
        { say: 'You will not always get exactly fifty. But over many tosses, the number of heads stays close to half.' },
      ],
    },
    {
      chapter: 'Welds to redo',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'From past records, 3% of the welds made by apprentices at a fabrication shop need to be redone. How many of the next 800 welds would you expect to need redoing?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3\\% = 0.03', '0.03 \\times 800 = 24'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'About, not exactly', md: 'The actual number will be close to $24$, but probably not exactly $24$.' },
      ],
      lines: [
        { say: 'From past records, three percent of the welds made by apprentices at a fabrication shop need to be redone. How many of the next 800 welds would you expect to need redoing?', show: 'p' },
        { say: 'First, write the percent as a decimal: three percent is 0.03.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply by the number of trials: 0.03 times 800 is 24.', show: 'm.1', focus: 'm.1' },
        { say: 'So you would expect about 24 welds to need redoing. The actual number will be close to 24, but probably not exactly 24. An expected number is a prediction for the long run, not a promise.', show: 'key' },
      ],
    },
    {
      chapter: 'Is tails due?',
      layout: 'center',
      main: [
        figure('flips', [coins({ faces: ['H', 'H', 'H', 'H', 'H', 'H', '?'] })], 190),
        { kind: 'text', id: 'p', size: 'md', md: '**Claim:** “A coin that has landed heads 6 times in a row is due for tails.”' },
        { kind: 'callout', id: 'truth', tone: 'key', title: 'Each flip is independent', md: 'A coin has no memory. On the next flip, the probability of tails is still $\\dfrac{1}{2}$.' },
      ],
      lines: [
        { say: 'Now test some claims. A fair coin has landed heads six times in a row. Someone says it is due to land tails.', show: ['flips', 'p'] },
        { say: 'That is not true. A coin has no memory. Each flip is independent: what happened before does not change the next flip.', show: 'truth' },
        { say: 'So on the seventh flip, the probability of tails is still one half. Six heads in a row is unusual, but it does not make tails any more likely.', focus: 'flips.c6' },
      ],
    },
    {
      chapter: 'Was the forecast wrong?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: '**Claim:** “The forecast gave a 70% chance of rain, and it stayed dry. The forecast was wrong.”' },
        figure('days', [ratioBar({ fav: 7, unfav: 3, favLabel: '7 \\text{ days with rain}', unfavLabel: '3 \\text{ dry days}', width: 12, height: 1.1, favTone: 'adj', unfavTone: 'muted' })], 160),
        { kind: 'text', id: 't', size: 'md', md: 'A 70% chance of rain means rain on **about 7 of every 10 days** with that forecast.' },
      ],
      lines: [
        { say: 'Next claim. The forecast gave a seventy percent chance of rain, and the day stayed dry. Someone says the forecast was wrong.', show: 'p' },
        { say: 'A seventy percent chance of rain means that on days with that forecast, it rains on about seven days out of ten.', show: ['days', 't'], focus: 'days.fav' },
        { say: 'So on about three days out of ten, it stays dry. One dry day does not prove the forecast wrong. To judge a forecast, look at many days, not one.', focus: 'days.unfav' },
      ],
    },
    {
      chapter: 'Two more claims',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Claim', 'What probability says'],
          rows: [
            ['“There are two outcomes, so it is 50–50.”', 'Only if the two outcomes are equally likely.'],
            ['“Exactly 400 of the next 10,000 will fail.”', 'An estimate from a small sample is rough, and an expected number is never guaranteed.'],
          ],
        },
      ],
      lines: [
        { say: 'Two more claims. First: “There are only two outcomes, so the chance is fifty-fifty.”', show: 't.0', focus: 't.0' },
        { say: 'That is only true when the two outcomes are equally likely. A day in the middle of winter in a cold city is either above twenty-five degrees Celsius or not, but the chance it is that warm is nowhere near fifty percent.' },
        { say: 'Second: a test of fifty batteries found two that failed. Someone claims that exactly 400 of the next 10,000 will fail.', show: 't.1', focus: 't.1' },
        { say: 'Two out of fifty, times 10,000, is 400, so 400 is the expected number. But a probability from a sample of only fifty is a rough estimate, and an expected number is never guaranteed. About 400 is fair. Exactly 400 is not.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'From past records, 4% of the parcels a courier delivers arrive late. How many of the next 650 parcels would you expect to arrive late?',
          choices: ['$260$', '$26$', '$2.6$', '$624$'],
          answer: 1,
          working: '$4\\% = 0.04$, and $0.04 \\times 650 = 26$ parcels.',
        },
      ],
      lines: [
        { say: 'Your turn. From past records, four percent of the parcels a courier delivers arrive late. How many of the next 650 parcels would you expect to arrive late? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 26. Four percent is 0.04, and 0.04 times 650 is 26. Choice A, 260, uses 0.4, which is forty percent. And D, 624, is the number expected to arrive on time.', show: 'q.answer' },
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
            'Expected number $=$ probability $\\times$ number of trials: a prediction, not a promise.',
            'Past results do not change independent events: tails is never “due”.',
            'Probability describes the long run, and outcomes are not always equally likely.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The expected number of times an event happens is its probability times the number of trials. It is a prediction for the long run, not a promise.', show: 'sum.0' },
        { say: 'Past results do not change independent events, so a coin is never due to land tails.', show: 'sum.1' },
        { say: 'And probability describes the long run: one dry day does not prove a forecast wrong, and two outcomes are not always equally likely. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
