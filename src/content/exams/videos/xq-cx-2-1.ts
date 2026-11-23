import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import tests from '@/content/chemmore/videos/cx-2-1.ts';

// Exam question for More Chemistry Topics lesson 2.1 (purity, formulations and tests for gases):
// whether an aspirin sample is pure from its melting range, the test for hydrogen, and the gas that
// relights a glowing splint. Written by Gradileo in the style of a GCSE chemistry exam.
//
// The picture is the lesson's hydrogen and oxygen mixture set off by a flame
// (src/video/particles.ts).

const QUESTION = 'A student checks a sample of aspirin and tests some gases. (a) Pure aspirin melts at 136 °C. The student\'s sample melts over a range from 128 °C to 133 °C. Is the sample pure? Explain your answer. (b) Describe the test for hydrogen gas and give the result. (c) A gas relights a glowing splint. Name the gas.';

const video: Explainer = {
  id: 'xq-cx-2-1',
  lessonId: '',
  exam: {
    lesson: 'cx-2-1',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: An Aspirin Sample, a Squeaky Pop and a Glowing Splint. Purity and Tests for Gases',
  thumbnailTitle: 'Pure? Which Gas?',
  thumbnail: 'sy',
  summary:
    'A test-style question, solved one small step at a time: is an aspirin sample that melts from 128 °C to 133 °C pure, how do we test for hydrogen, and which gas relights a glowing splint? The sample is impure because it melts below 136 °C and over a range, hydrogen burns with a squeaky pop when a lighted splint is held to it, and the gas is oxygen.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Pure? Which Gas?', subtitle: 'Melting points and gas tests' }],
      lines: [
        { say: 'In this video, we solve a test-style question about purity and the tests for gases. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Not pure; lighted splint, squeaky pop; oxygen' }],
      lines: [
        { say: 'Here is the question. A student checks a sample of aspirin and tests some gases. Part a: pure aspirin melts at 136 degrees Celsius. The student\'s sample melts over a range from 128 to 133 degrees. Is the sample pure? Explain your answer. Part b: describe the test for hydrogen gas and give the result. Part c: a gas relights a glowing splint. Name the gas.', caption: 'Here is the question. A student checks a sample of aspirin and tests some gases. Part a: pure aspirin melts at 136 °C. The student\'s sample melts over a range from 128 °C to 133 °C. Is the sample pure? Explain your answer. Part b: describe the test for hydrogen gas and give the result. Part c: a gas relights a glowing splint. Name the gas.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Compare the **melting point** with the pure value, then recall two **gas tests**' }],
      lines: [
        { say: 'A melting point tells us whether a substance is pure. Then we need two of the four gas tests: the one for hydrogen and the one for oxygen.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(tests, 'sy')],
      lines: [
        { say: 'Here is what we need. This is the hydrogen test up close: hydrogen molecules mixed with oxygen from the air.', show: ['sy', 'sy.labels', 'sy.key', 'sy.thermo'] },
        { say: 'The flame sets off one reaction, which gives out heat that sets off the next, so the whole mixture reacts at once to make water. That fast reaction is the squeaky pop.', show: 'sy.tally', play: 'sy.spark' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Pure: melts **sharply** at a **fixed** temperature', 'Impure: melts **lower**, over a **range**', 'Hydrogen: **squeaky pop**. Oxygen: **relights** a glowing splint'] }],
      lines: [
        { say: 'Here is the plan. A pure substance melts sharply, at one fixed temperature.', show: 'plan.0' },
        { say: 'An impurity lowers the melting point and spreads it over a range.', show: 'plan.1' },
        { say: 'And hydrogen burns with a squeaky pop, while oxygen relights a glowing splint.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Is it pure?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Pure aspirin', 'The sample'],
          rows: [
            ['melts at', '**136 °C**', '128 °C to 133 °C'],
            ['melting', 'at **one** temperature', 'over a **range**'],
            ['so', '', '**impure**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. The sample melts below 136 degrees, the melting point of pure aspirin.', caption: 'Step one. The sample melts below 136 °C, the melting point of pure aspirin.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'And it melts over a range of five degrees, not at one temperature.', show: 't.1', focus: 't.1' },
        { say: 'Both are signs of an impurity, so the sample is not pure. That is part a.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 2: The test for hydrogen',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Hold a **lighted splint** at the mouth of the tube', 'Result: a **squeaky pop**', 'The hydrogen burns with oxygen to make **water**'] }],
      lines: [
        { say: 'Step two. To test for hydrogen, hold a lighted splint at the mouth of the test tube.', show: 's.0' },
        { say: 'If the gas is hydrogen, it burns with a squeaky pop.', show: 's.1' },
        { say: 'As we saw, the hydrogen reacts with oxygen from the air all at once, making water. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: The glowing splint',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{glowing splint relights}', '\\Rightarrow \\good{\\text{oxygen}}'] }],
      lines: [
        { say: 'Step three. A glowing splint is still hot, but only just burning.', show: 'm.0' },
        { say: 'Oxygen makes it burst back into flame, so the gas is oxygen. That is part c.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Not pure**: it melts **below** 136 °C and over a **range**. (b) A **lighted splint** gives a **squeaky pop**. (c) **Oxygen**.' },
      ],
      lines: [
        { say: 'Does it make sense? Things burn faster in oxygen than in air, so a glowing splint relighting fits, and the pop is the hydrogen burning.', show: 'ans' },
        { say: 'So the aspirin is impure, hydrogen gives a squeaky pop with a lighted splint, and the gas that relights a glowing splint is oxygen.' },
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
            ['Pure, because it is **close** to 136 °C', 'Pure means **sharp** and **exact**'],
            ['A **glowing** splint for hydrogen', 'Hydrogen needs a **lighted** splint'],
            ['**Hydrogen** relights the splint', 'That is the **oxygen** test'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Being close is not enough. A pure sample melts sharply at exactly 136 degrees.', caption: 'Being close is not enough. A pure sample melts sharply at exactly 136 °C.', focus: 'traps.0' },
        { say: 'The hydrogen test needs a lighted splint, a real flame, to set the hydrogen burning.', focus: 'traps.1' },
        { say: 'And it is oxygen, not hydrogen, that relights a glowing splint.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which gas turns limewater milky?',
          choices: ['carbon dioxide', 'hydrogen', 'oxygen', 'chlorine'],
          answer: 0,
          working: 'Bubbling carbon dioxide through limewater turns it milky (cloudy).',
        },
      ],
      lines: [
        { say: 'Your turn. Which gas turns limewater milky? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Carbon dioxide turns limewater milky: choice A.', show: 'q2.answer' },
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
          items: ['Impure substances melt **lower** and over a **range**', 'Hydrogen: lighted splint, **squeaky pop**', 'Oxygen: **relights** a glowing splint'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An impure substance melts lower, and over a range.', show: 'sum.0' },
        { say: 'Hydrogen burns with a squeaky pop when a lighted splint is held to it.', show: 'sum.1' },
        { say: 'And oxygen relights a glowing splint. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
