import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barGraph } from '@/video/charts.ts';
import { tallyChart } from '@/content/math5/videos/lib/m5-12-figures.ts';

// Kiona's 40 flips of a large coin and a small coin: HH 12, HT 9, TH 11, TT 8.
const RESULTS = [
  { label: 'HH', count: 12 },
  { label: 'HT', count: 9 },
  { label: 'TH', count: 11 },
  { label: 'TT', count: 8 },
];
const tally = (id: string) => figure(id, [tallyChart({ head: ['Outcome', 'Tally', 'Frequency'], rows: RESULTS, widths: [2.8, 5.4, 3.4] })], 420);
const rows = (id: string) => RESULTS.flatMap((_, i) => [`${id}.name${i}`, `${id}.tally${i}`, `${id}.f${i}`]);

// HH: what did happen (30%) and what should happen (25%).
const compare = (id: string) => figure(id, [barGraph({ categories: ['Kiona', 'Theory'], values: [30, 25], max: 35, step: 5, height: 4, titles: { y: 'P(HH) in \\%' } })], 420);

const video: Explainer = {
  id: 'm7-11-3-c',
  lessonId: 'm7-11-3',
  title: 'Theoretical and Experimental Probability, Part 3: Experimental Probability',
  thumbnailTitle: 'Experimental Probability',
  thumbnail: 'tl',
  summary:
    'The experimental probability of an event is what did happen when you did the experiment: the number of times the event happened ÷ the total number of trials, where a trial is one time you do the experiment. Kiona flipped two coins 40 times and got HH 12 times, so the experimental probability of HH is 12/40 = 3/10 = 30%. The theoretical probability, from the sample space HH, HT, TH, TT, is 1/4 = 25%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 3', title: 'Experimental Probability', subtitle: 'What did happen' }],
      lines: [
        { say: 'Theory says what should happen. But what really happens when you flip coins? There is only one way to find out: try it!', show: 'title' },
        { say: 'In this video, you will find an experimental probability, and compare it with the theoretical probability.' },
      ],
    },
    {
      chapter: 'Experimental probability',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Experimental probability', md: 'The **experimental probability** of an event is what **did** happen when you did the experiment. A **trial** is one time you do the experiment.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(\\text{event}) = \\dfrac{\\text{number of times the event happened}}{\\text{total number of trials}}'] },
      ],
      lines: [
        { say: 'The experimental probability of an event is what did happen, when you actually did the experiment.', show: 'def' },
        { say: 'Each time you do the experiment is called a trial. One flip of two coins is one trial.' },
        { say: 'The experimental probability is the number of times the event happened, divided by the total number of trials.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Flipping two coins',
      layout: 'split',
      leftWidth: 640,
      left: [tally('tl')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Kiona flips a large coin and a small coin $40$ times. Find the experimental probability of HH.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['12 + 9 + 11 + 8 = 40', 'P(\\text{HH}) = \\dfrac{12}{40} = \\dfrac{3}{10} = 30\\%'] },
      ],
      lines: [
        { say: 'Kiona flips a large coin and a small coin forty times, and records each result with tally marks.', show: ['q', 'tl.frame', 'tl.names'] },
        { say: 'She got two heads twelve times, heads then tails nine times, tails then heads eleven times, and two tails eight times.', show: rows('tl').filter((p) => !p.includes('name')) },
        { say: 'Check the total: twelve plus nine plus eleven plus eight is forty trials.', show: 'm.0', focus: 'm.0' },
        { say: 'Two heads happened twelve times in forty trials. So the experimental probability of two heads is twelve fortieths. In lowest terms, that is three tenths, or thirty percent.', show: 'm.1', focus: ['m.1', 'tl.f0'] },
      ],
    },
    {
      chapter: 'Compared with theory',
      layout: 'split',
      leftWidth: 480,
      left: [compare('cp')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{sample space: HH, HT, TH, TT}', '\\text{theoretical: } P(\\text{HH}) = \\dfrac{1}{4} = 25\\%', '\\text{experimental: } 30\\%'] },
      ],
      lines: [
        { say: 'Now find the theoretical probability of two heads. The sample space for two coins is H H, H T, T H and T T: four equally likely outcomes.', show: 'm.0', focus: 'm.0' },
        { say: 'Only one of them is two heads. So the theoretical probability is one quarter, or twenty-five percent.', show: ['m.1', 'cp.scale', 'cp.b1', 'cp.v1'], focus: ['m.1', 'cp.b1'] },
        { say: 'Kiona’s experimental probability, thirty percent, is a little greater than the theoretical probability, twenty-five percent. What did happen is close to what should happen, but not exactly the same.', show: ['m.2', 'cp.b0', 'cp.v0'], focus: ['m.2', 'cp.b0'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In Kiona’s $40$ trials, TT happened $8$ times. What is the experimental probability of TT?',
          choices: ['$20\\%$', '$25\\%$', '$8\\%$', '$80\\%$'],
          answer: 0,
          working: '$P(\\text{TT}) = \\dfrac{8}{40} = \\dfrac{1}{5} = 20\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. In Kiona’s forty trials, two tails happened eight times. What is the experimental probability of two tails? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is A: twenty percent. Eight out of forty is one fifth, which is twenty percent. Choice B is the theoretical probability of two tails, not what actually happened.', show: 'q.answer' },
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
          items: ['A trial is one time you do the experiment.', 'Experimental probability $=$ number of times it happened $\\div$ number of trials.', 'It is often close to the theoretical probability, but not exactly the same.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A trial is one time you do the experiment.', show: 'sum.0' },
        { say: 'The experimental probability is the number of times the event happened, divided by the number of trials.', show: 'sum.1' },
        { say: 'It is often close to the theoretical probability, but not exactly the same. In the next part, you will see what happens with many more trials. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
