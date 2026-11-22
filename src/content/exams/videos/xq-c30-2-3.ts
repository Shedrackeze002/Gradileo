import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import predicting from '@/content/chem30/videos/c30-2-3.ts';
import acids from '@/content/chem30/videos/c30-2-3-c.ts';

// Exam question for Chemistry 30 lesson 2.3 (predicting redox reactions): metals A, B and C; when A
// and B touch, B corrodes; when A and C touch, A corrodes. Which corrodes when B and C touch? The
// question is OpenStax Chemistry 2e's own, word for word (end-of-chapter exercise 41, section 17.6,
// CC BY-NC-SA 4.0). The answer, which matches the book's: the metal that corrodes is the stronger
// reducing agent, so B > A and A > C, which gives B > A > C; B corrodes and C does not.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's magnesium, zinc and
// copper in the same acid, fizzing at different rates; and zinc in copper(II) sulfate solution
// reacting while copper in zinc sulfate solution does not.

const QUESTION = 'Suppose you have three different metals, A, B, and C. When metals A and B come into contact, B corrodes and A does not corrode. When metals A and C come into contact, A corrodes and C does not corrode. Based on this information, which metal corrodes and which metal does not corrode when B and C come into contact?';

const video: Explainer = {
  id: 'xq-c30-2-3',
  lessonId: '',
  exam: {
    lesson: 'c30-2-3',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 41, section 17.6, Corrosion',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/17-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Which Metal Corrodes? Predicting Redox Reactions',
  thumbnailTitle: 'Which Metal Corrodes?',
  thumbnail: 'ma',
  summary:
    'A real test question, solved one small step at a time: three metals are touched together in pairs, and we are told which one corrodes each time. The metal that corrodes is the stronger reducing agent, so we rank the three, B above A above C, and predict that B corrodes and C does not.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Metal Corrodes?', subtitle: 'Ranking reducing agents from two experiments' }],
      lines: [
        { say: 'In this video, we solve a real test question about predicting redox reactions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'B corrodes; C does not' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. Suppose you have three different metals, A, B, and C. When metals A and B come into contact, B corrodes and A does not corrode. When metals A and C come into contact, A corrodes and C does not corrode. Based on this information, which metal corrodes and which metal does not corrode when B and C come into contact?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Two experiments give two **comparisons**. Chain them to compare **B** and **C**' }],
      lines: [
        { say: 'We never see B and C together. But each experiment tells us which of two metals gives up electrons more easily, and two comparisons that share metal A can be chained together.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(acids, 'ma'), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{corrodes} = \\text{oxidised} = \\text{stronger reducing agent}'] }],
      lines: [
        { say: 'Here is what we need. Magnesium, zinc and copper sit in the same dilute acid. Watch how fast each one reacts.', show: ['ma', 'ma.labels', 'ma.key'], play: 'ma.fizz' },
        { say: 'Magnesium fizzes hardest, zinc more slowly, and copper not at all. Metals differ in how readily they give up electrons, and the one that gives them up most readily is the strongest reducing agent.' },
        { say: 'When a metal corrodes, it is oxidised: it loses electrons. So when two metals touch, the one that corrodes is the stronger reducing agent, and it gives its electrons up in place of the other.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Turn each experiment into "**stronger** reducing agent than"', 'Chain the two through **A** into one **ranking**', 'In a pair, the **higher** metal corrodes'] }],
      lines: [
        { say: 'Here is the plan. First, turn each experiment into a statement: this metal is a stronger reducing agent than that one.', show: 'plan.0', caption: 'Here is the plan. First, turn each experiment into a statement: this metal is a stronger reducing agent than that one.' },
        { say: 'Then chain the two statements through metal A into one ranking.', show: 'plan.1' },
        { say: 'Then, for B and C, the metal higher in the ranking corrodes.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Two comparisons',
      layout: 'center',
      main: [{ kind: 'math', id: 'r', size: 'lg', lines: ['\\text{A and B: B corrodes} \\Rightarrow \\good{\\text{B} > \\text{A}}', '\\text{A and C: A corrodes} \\Rightarrow \\good{\\text{A} > \\text{C}}'] }],
      lines: [
        { say: 'Step one. When A and B touch, B corrodes. So B gives up its electrons more readily than A: B is the stronger reducing agent.', show: 'r.0', focus: 'r.0', caption: 'Step one. When A and B touch, B corrodes. So B gives up its electrons more readily than A: B is the stronger reducing agent, B > A.' },
        { say: 'When A and C touch, A corrodes. So A is a stronger reducing agent than C.', show: 'r.1', focus: 'r.1', caption: 'When A and C touch, A corrodes. So A is a stronger reducing agent than C, A > C.' },
      ],
    },
    {
      chapter: 'Step 2: One ranking',
      layout: 'center',
      main: [{ kind: 'math', id: 'c', size: 'lg', lines: ['\\text{B} > \\text{A} > \\text{C}', '\\text{strongest reducing agent: B} \\qquad \\text{weakest: C}'] }],
      lines: [
        { say: 'Step two. B is above A, and A is above C. So all three go in one line: B, then A, then C.', show: 'c.0', focus: 'c.0', caption: 'Step two. B is above A, and A is above C. So all three go in one line: B > A > C.' },
        { say: 'B gives up electrons most readily of the three, and C least readily.', show: 'c.1' },
      ],
    },
    {
      chapter: 'Step 3: B meets C',
      layout: 'center',
      main: [pick(predicting, 'zc'), { kind: 'math', id: 'p', size: 'md', lines: ['\\text{B and C: } \\good{\\text{B corrodes}},\\ \\good{\\text{C does not}}'] }],
      lines: [
        { say: 'Step three. Here is the same idea with real metals: zinc in copper two sulfate solution, beside copper in zinc sulfate solution. Zinc is the stronger reducing agent. Watch which side reacts.', caption: 'Step three. Here is the same idea with real metals: zinc in copper(II) sulfate solution, beside copper in zinc sulfate solution. Zinc is the stronger reducing agent. Watch which side reacts.', show: ['zc', 'zc.labels', 'zc.key', 'zc.tally'], play: 'zc.go' },
        { say: 'Only the zinc gives up electrons; the copper keeps its own. In the same way, B is above C, so B gives up its electrons and corrodes, and C does not corrode.', show: 'p.0', focus: 'p.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\text{B} > \\text{A}: \\text{B corroded} \\ \\checkmark \\qquad \\text{A} > \\text{C}: \\text{A corroded} \\ \\checkmark'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: 'When B and C touch, **B corrodes** and **C does not**.' },
      ],
      lines: [
        { say: 'Does it make sense? The ranking B, A, C agrees with both experiments: in each pair, the metal higher up corroded.', show: 'x.0' },
        { say: 'So when B and C come into contact, B corrodes and C does not. That matches the book.', show: 'ans' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['C corrodes', 'Thought the metal that **resists** corrosion is the **stronger** one'],
            ['Cannot tell', 'Missed that **A** links the two experiments'],
            ['Both corrode', 'Only the **stronger** reducing agent gives up electrons'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'C corrodes turns the ranking upside down. The metal that corrodes is the one that gives its electrons away, so it is the stronger reducing agent.', focus: 'traps.0' },
        { say: 'Cannot tell misses the link. A appears in both experiments, so it lets us compare B with C.', focus: 'traps.1' },
        { say: 'And both corrode is not how a pair behaves. The stronger reducing agent gives its electrons to the other, and that protects it.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Metal P reacts with a solution of $\\ce{Q^2+}$ ions. Metal R does **not** react with a solution of $\\ce{Q^2+}$ ions. Which metal is the strongest reducing agent?',
          choices: ['R', 'Q', 'P', 'You cannot tell'],
          answer: 2,
          working: 'P reduces $\\ce{Q^2+}$, so P > Q. R cannot reduce $\\ce{Q^2+}$, so Q > R. The ranking is P > Q > R.',
        },
      ],
      lines: [
        { say: 'Your turn. Metal P reacts with a solution of Q two plus ions. Metal R does not react with a solution of Q two plus ions. Which metal is the strongest reducing agent? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Metal P reacts with a solution of Q²⁺ ions. Metal R does not react with a solution of Q²⁺ ions. Which metal is the strongest reducing agent? Pause the video and try it.' },
        { say: 'P gives electrons to Q two plus ions, so P is stronger than Q. R cannot, so Q is stronger than R. The ranking is P, Q, R, and the strongest is P: choice C.', show: 'q2.answer', caption: 'P gives electrons to Q²⁺, so P > Q. R cannot, so Q > R. The ranking is P > Q > R, and the strongest is P: choice C.' },
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
          items: ['The metal that **corrodes** is the **stronger reducing agent**', 'Chain comparisons that share a metal into one **ranking**', 'In any pair, the **higher** metal is oxidised'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The metal that corrodes is oxidised, so it is the stronger reducing agent.', show: 'sum.0' },
        { say: 'Comparisons that share a metal can be chained into one ranking.', show: 'sum.1' },
        { say: 'And in any pair, the metal higher in the ranking is the one oxidised. For more on predicting redox reactions, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
