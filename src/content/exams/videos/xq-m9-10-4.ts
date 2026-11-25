import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { days } from '@/content/math9/videos/lib/m9-10-figures.ts';

// Exam question for Math 9 lesson 10.4 (probability in society). The free textbooks we use have no
// question like it at this level, so Gradileo wrote it in the style of a Grade 9 unit test. The
// experimental probability is 36 ÷ 48 = 0.75, and the expected number of shots made out of the
// next 20 is 0.75 × 20 = 15. Check: 15 ÷ 20 = 0.75.

const QUESTION =
  'Maya made 36 of her last 48 free throws. (a) What is the experimental probability that Maya makes a free throw? (b) How many of her next 20 free throws would you expect her to make?';

// Twelve shots standing for the 48: in every 4, 3 go in (36 of 48 is 3 of 4).
const record = (id: string) =>
  figure(id, [days({ count: 12, which: [0, 1, 2, 4, 5, 6, 8, 9, 10], tone: 'good', rest: 'bad', labels: ['', '', '', '4', '', '', '', '8', '', '', '', '12'] })], 160);

// The next 20 shots: about 15 of them go in.
const next = (id: string) => figure(id, [days({ count: 20, shaded: 15, tone: 'good', rest: 'muted', labels: ['', '', '', '', '5', '', '', '', '', '10', '', '', '', '', '15', '', '', '', '', '20'] })], 150);

const video: Explainer = {
  id: 'xq-m9-10-4',
  lessonId: '',
  exam: {
    lesson: 'm9-10-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Free Throws and Probability (Probability in Society)',
  thumbnailTitle: 'Free Throws and Probability',
  thumbnail: 'nx',
  summary:
    'An exam-style question, solved one small step at a time: Maya made 36 of her last 48 free throws. (a) What is the experimental probability that she makes a free throw? (b) How many of her next 20 free throws would you expect her to make? The experimental probability is the number of times it happened divided by the number of tries: 36 ÷ 48 = 0.75, or 75%. To predict, multiply: 0.75 × 20 = 15 free throws. That is an estimate, not a promise. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Free Throws and Probability', subtitle: 'Probability in society, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about probability in society. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Maya made $36$ of her last $48$ free throws. (a) What is the experimental probability that Maya makes a free throw? (b) How many of her next $20$ free throws would you expect her to make?',
          answer: '(a) $0.75$, or $75\\%$ (b) about $15$',
          working: '36 ÷ 48 = 0.75; 0.75 × 20 = 15',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Maya made 36 of her last 48 free throws. Part a: what is the experimental probability that Maya makes a free throw? Part b: how many of her next 20 free throws would you expect her to make?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [record('ask'), { kind: 'callout', id: 'c', tone: 'definition', title: 'Experimental probability', md: '**Experimental probability** comes from what actually **happened**: the number of times an event happened, out of the number of **tries**.' }],
      lines: [
        { say: 'Here is Maya\'s record, drawn smaller. Green is a shot that went in, and red is a miss. In every 4 shots, 3 go in, just as 36 of 48 did.', show: ['ask.shaded', 'ask.others', 'ask.labels'] },
        { say: 'Experimental probability comes from what actually happened: the number of times an event happened, out of the number of tries. Then we use it to predict.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P = \\dfrac{\\text{times it happened}}{\\text{number of tries}}', '\\text{expected} = P \\times \\text{number of new tries}'] }],
      lines: [
        { say: 'Here is what we need. The experimental probability is the number of times it happened, divided by the number of tries.', show: 'm.0' },
        { say: 'To predict, multiply the probability by the number of new tries. That gives the number we expect.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) **Divide**: made by tries', '(b) **Multiply** by the new tries', 'Remember: it is an **estimate**'] }],
      lines: [
        { say: 'Here is the plan. For part a, divide the shots made by the shots tried.', show: 'plan.0' },
        { say: 'For part b, multiply that probability by 20.', show: 'plan.1' },
        { say: 'And remember that a prediction is an estimate.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Divide, then multiply',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) } P = \\dfrac{36}{48} = \\dfrac{3}{4} = \\good{0.75}', '\\text{(b) } 0.75 \\times 20 = \\good{15}'] },
        next('nx'),
      ],
      lines: [
        { say: 'Step one, part a. Maya made 36 shots out of 48 tries. 36 over 48: both divide by 12, giving 3 over 4. That is 0.75, or 75 percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two, part b. Here are her next 20 free throws. Multiply the probability by 20: 0.75 times 20 is 15.', show: ['m.1', 'nx.others', 'nx.labels'], focus: 'm.1' },
        { say: 'Step three. We expect Maya to make about 15 of the next 20. It is an estimate: she might make 14, or 16, but 15 is the best guess.', show: 'nx.shaded', focus: 'nx.shaded' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['15 \\div 20 = 0.75 \\ \\checkmark', '0.75 \\times 48 = 36 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 15 out of 20 is 0.75, the same rate as before.', show: 'm.0', focus: 'm.0' },
        { say: 'And 0.75 times 48 gives back 36, the shots she made. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(a) $\\tfrac{48}{36}$', 'upside down: a probability is **never** more than $1$'],
            ['(a) $0.36$', 'treated $36$ as a percent: divide by **48**, not $100$'],
            ['(b) exactly $15$', 'it is an **estimate**, not a promise'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '48 over 36 is upside down. It is more than 1, and a probability is never more than 1. Put the shots made on top.' },
        { say: '0.36 treats 36 as a percent. Divide by the 48 tries, not by 100.' },
        { say: 'And saying she will make exactly 15 goes too far. Probability predicts what we expect, not what will surely happen.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A spinner landed on red $18$ times in $60$ spins. What is the experimental probability of red?',
          choices: ['$0.18$', '$0.3$', '$3.3$', '$0.6$'],
          answer: 1,
          working: '18 ÷ 60 = 0.3.',
        },
      ],
      lines: [
        { say: 'Your turn. A spinner landed on red 18 times in 60 spins. What is the experimental probability of red? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Times it happened over the number of tries: 18 over 60. Both divide by 6, giving 3 over 10, which is 0.3. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Experimental $P = $ **happened** $\\div$ **tries**', 'A probability is between $0$ and **1**', 'Expected $= P \\times$ **new tries**', 'A prediction is an **estimate**'] }],
      lines: [
        { say: 'Here is what to remember. Experimental probability is the number of times it happened, divided by the number of tries.', show: 'sum.0' },
        { say: 'A probability is always between 0 and 1.', show: 'sum.1' },
        { say: 'To predict, multiply the probability by the number of new tries.', show: 'sum.2' },
        { say: 'And a prediction is an estimate. For more on probability in society, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
