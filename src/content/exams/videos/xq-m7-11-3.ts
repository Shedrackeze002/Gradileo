import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { circleGraph } from '@/video/charts.ts';

// Exam question for Math 7 lesson 11.3 (theoretical and experimental probability). The free
// textbooks we use have no question that compares the two, so Gradileo wrote it in the style of a
// Grade 7 unit test. Theoretical: 1 of 4 equal sections, 1/4 = 25%. Experimental: 14 of 40 spins,
// 14/40 = 35%. Predicted from the theoretical probability: 1/4 × 400 = 100 times.

const QUESTION =
  'A spinner has 4 equal sections labelled A, B, C and D. Maya spins it 40 times and lands on A 14 times. (a) What is the theoretical probability of landing on A? (b) What is Maya’s experimental probability of landing on A? (c) Use the theoretical probability to predict how many times the spinner would land on A in 400 spins.';

const spinner = (id: string) =>
  figure(
    id,
    [
      circleGraph({
        namesOnly: true,
        r: 2.6,
        slices: [
          { label: '\\text{A}', value: 1, tone: 'adj' },
          { label: '\\text{B}', value: 1, tone: 'opp' },
          { label: '\\text{C}', value: 1, tone: 'good' },
          { label: '\\text{D}', value: 1, tone: 'theta' },
        ],
      }),
    ],
    420,
  );

const video: Explainer = {
  id: 'xq-m7-11-3',
  lessonId: '',
  exam: {
    lesson: 'm7-11-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Maya’s Spinner (Theoretical and Experimental Probability)',
  thumbnailTitle: 'Maya’s Spinner',
  thumbnail: 'sp',
  summary:
    'An exam-style question, solved one small step at a time: a spinner has 4 equal sections, A, B, C and D. Maya spins it 40 times and lands on A 14 times. Find the theoretical probability of A, Maya’s experimental probability of A, and a prediction for 400 spins. In theory, A is 1 of 4 equal sections: 1/4, or 25%. In Maya’s experiment, A came up 14 times out of 40: 14/40 = 0.35, or 35%. Using the theoretical probability, 1/4 of 400 spins is 100. The two probabilities differ because 40 spins is a small number of trials. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Maya’s Spinner', subtitle: 'Theoretical and experimental probability, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about theoretical and experimental probability. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
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
          prompt: 'A spinner has $4$ equal sections labelled A, B, C and D. Maya spins it $40$ times and lands on A $14$ times. (a) What is the theoretical probability of landing on A? (b) What is Maya’s experimental probability of landing on A? (c) Use the theoretical probability to predict how many times the spinner would land on A in $400$ spins.',
          answer: '(a) $\\tfrac{1}{4} = 25$% (b) $\\tfrac{14}{40} = 35$% (c) $100$ times',
          working: '1 of 4 sections; 14 of 40 spins; 1/4 × 400',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A spinner has 4 equal sections, labelled "A", "B", "C" and "D". Maya spins it 40 times, and lands on "A" 14 times.' },
        { say: 'Part a: what is the theoretical probability of landing on "A"? Part b: what is Maya\'s experimental probability of landing on "A"? Part c: use the theoretical probability to predict how many times the spinner would land on "A" in 400 spins.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 460,
      left: [spinner('sp')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Two kinds of probability', md: 'The **theoretical** probability is what **should** happen, worked out from the spinner itself. The **experimental** probability is what **did** happen, worked out from Maya\'s $40$ spins.' }],
      lines: [
        { say: 'Here is the spinner, with 4 equal sections.', show: ['sp.s0', 'sp.s1', 'sp.s2', 'sp.s3'] },
        { say: 'The theoretical probability is what should happen, worked out from the spinner itself. The experimental probability is what did happen, worked out from Maya\'s 40 spins.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{theoretical} = \\dfrac{\\text{favourable outcomes}}{\\text{possible outcomes}}', '\\text{experimental} = \\dfrac{\\text{times it happened}}{\\text{number of trials}}'] }],
      lines: [
        { say: 'Here is what we need. The theoretical probability is the number of favourable outcomes, over the number of equally likely possible outcomes.', show: 'm.0' },
        { say: 'The experimental probability is the number of times the event happened, over the number of trials.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Use the **spinner**: sections', '(b) Use the **results**: spins', '(c) Multiply the **theoretical** probability by $400$'] }],
      lines: [
        { say: 'Here is the plan. For part a, use the spinner: count its sections.', show: 'plan.0' },
        { say: 'For part b, use Maya\'s results: count her spins.', show: 'plan.1' },
        { say: 'For part c, multiply the theoretical probability by 400.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Theory, results, prediction',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(a) } P(\\text{A}) = \\dfrac{1}{4} = \\good{25\\%}', '\\text{(b) } \\dfrac{14}{40} = \\dfrac{7}{20} = 0.35 = \\good{35\\%}', '\\text{(c) } \\dfrac{1}{4} \\times 400 = \\good{100 \\text{ times}}'] }],
      lines: [
        { say: 'Step one. The spinner has 4 equal sections, and 1 of them is "A". So the theoretical probability is 1 quarter, or 25 percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Maya landed on "A" 14 times in 40 spins. 14 over 40 simplifies to 7 over 20, which is 0.35, or 35 percent.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. In theory, "A" comes up 1 quarter of the time. A quarter of 400 spins is 100. So we predict about 100 times.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{1}{4} \\times 40 = 10 \\text{ expected}, \\ 14 \\text{ happened}', '\\text{more spins} \\to \\text{closer to } 25\\% \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check that the answers make sense. In 40 spins, theory says to expect "A" about 10 times. Maya got 14, a few more, so her experimental probability, 35 percent, is a bit higher than 25 percent.', show: 'm.0', focus: 'm.0' },
        { say: 'That is normal. 40 spins is not many, so chance can push the results around. With more and more spins, the experimental probability usually gets closer to the theoretical one. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(b) $25$%', 'gave the **theoretical** one: experimental uses Maya\'s **results**'],
            ['(b) $\\tfrac{14}{26}$', 'divided by the **other** spins: divide by **all** $40$'],
            ['(c) $140$', 'used $35$%: the question asks for the **theoretical** $\\tfrac{1}{4}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '25 percent for part b gives the theoretical probability again. The experimental probability comes from what Maya actually got.' },
        { say: '14 over 26 divides by the spins that were not "A". Divide by all 40 spins.' },
        { say: 'And 140 uses Maya\'s 35 percent. The question asks you to use the theoretical probability, 1 quarter, which gives 100.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A coin is flipped $50$ times and lands heads $30$ times. What is the experimental probability of heads?',
          choices: ['$0.6$', '$0.5$', '$0.3$', '$30$'],
          answer: 0,
          working: '30 heads out of 50 flips: 30/50 = 0.6.',
        },
      ],
      lines: [
        { say: 'Your turn. A coin is flipped 50 times and lands heads 30 times. What is the experimental probability of heads? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'It landed heads 30 times out of 50 flips. 30 over 50 is 0.6. The theoretical probability is 0.5, but the experiment gave 0.6. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Theoretical**: what should happen', '**Experimental**: what did happen', 'Predict: probability $\\times$ number of trials', 'More trials: usually **closer** to theory'] }],
      lines: [
        { say: 'Here is what to remember. The theoretical probability is what should happen, from the equally likely outcomes.', show: 'sum.0' },
        { say: 'The experimental probability is what did happen, from the results.', show: 'sum.1' },
        { say: 'To predict, multiply the probability by the number of trials.', show: 'sum.2' },
        { say: 'And with more trials, the experimental probability usually gets closer to the theoretical one. For more on theoretical and experimental probability, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
