import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import acids from '@/content/chem9/videos/c9-4-1.ts';

// Exam question for Chemistry 9 lesson 4.1 (acids, bases and indicators): what litmus shows about
// lemon juice, the ions that make hydrochloric acid acidic, and the ion that makes sodium hydroxide
// solution alkaline. Written by Gradileo in the style of a Grade 9 science unit test.
//
// The picture is the lesson's hydrogen chloride molecules handing their hydrogen to water
// (src/video/particles.ts).

const QUESTION = 'Answer these questions about acids and alkalis. (a) A drop of lemon juice turns blue litmus paper red. Is lemon juice acidic or alkaline? (b) Hydrogen chloride gas dissolves in water to make hydrochloric acid. Explain, in terms of ions, what makes the solution acidic. (c) Sodium hydroxide solution turns red litmus paper blue. Name the ion that makes it alkaline, and give one safety precaution for using it.';

const video: Explainer = {
  id: 'xq-c9-4-1',
  lessonId: '',
  exam: {
    lesson: 'c9-4-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Lemon Juice, Hydrochloric Acid and Sodium Hydroxide. Acids, Bases and Indicators',
  thumbnailTitle: 'Acid or Alkali?',
  thumbnail: 'hi',
  summary:
    'A test-style question, solved one small step at a time: what does red litmus tell us about lemon juice, what makes hydrochloric acid acidic, and what makes sodium hydroxide solution alkaline? Lemon juice is acidic, hydrogen chloride releases hydrogen ions into the water, and sodium hydroxide releases hydroxide ions, OH⁻, so it is corrosive and needs eye protection.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Acid or Alkali?', subtitle: 'Indicators and ions' }],
      lines: [
        { say: 'In this video, we solve a test-style question about acids, alkalis and indicators. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Acidic; hydrogen ions, H⁺; hydroxide ions, OH⁻, wear goggles' }],
      lines: [
        { say: 'Here is the question. Part a: a drop of lemon juice turns blue litmus paper red. Is lemon juice acidic or alkaline? Part b: hydrogen chloride gas dissolves in water to make hydrochloric acid. Explain, in terms of ions, what makes the solution acidic. Part c: sodium hydroxide solution turns red litmus paper blue. Name the ion that makes it alkaline, and give one safety precaution for using it.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Read the **indicator**, then name the **ion** behind each colour' }],
      lines: [
        { say: 'An indicator tells us whether a solution is acidic or alkaline. Behind each result is a particular ion in the water.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(acids, 'hi')],
      lines: [
        { say: 'Here is what we need. These are hydrogen chloride molecules, a hydrogen atom joined to a chlorine atom, among water molecules in blue.', show: ['hi', 'hi.labels', 'hi.key', 'hi.tally'] },
        { say: 'Watch. When a hydrogen chloride molecule meets a water molecule, the hydrogen leaves the chlorine and joins the water as a hydrogen ion, and the chlorine is set free as a chloride ion.', play: 'hi.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Acids turn blue litmus **red**; alkalis turn red litmus **blue**', 'Acids release **hydrogen ions**, H⁺', 'Alkalis release **hydroxide ions**, OH⁻'] }],
      lines: [
        { say: 'Here is the plan. Acids turn blue litmus red, and alkalis turn red litmus blue.', show: 'plan.0' },
        { say: 'Acids release hydrogen ions into water.', show: 'plan.1' },
        { say: 'And alkalis release hydroxide ions.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Lemon juice',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{blue litmus} \\rightarrow \\text{red}', '\\Rightarrow \\good{\\text{acidic}}'] }],
      lines: [
        { say: 'Step one. Lemon juice turned blue litmus red.', show: 'm.0' },
        { say: 'Only an acid turns blue litmus red, so lemon juice is acidic. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Hydrochloric acid',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['HCl molecules **split up** in water', 'They release **hydrogen ions**, H⁺, and chloride ions, Cl⁻', 'The **hydrogen ions** make the solution **acidic**'] }],
      lines: [
        { say: 'Step two. As we saw, hydrogen chloride molecules split up when they meet water.', show: 's.0' },
        { say: 'Each one releases a hydrogen ion and a chloride ion into the solution.', show: 's.1' },
        { say: 'It is the hydrogen ions, H plus, that make the solution acidic. That is part b.', caption: 'It is the hydrogen ions, H⁺, that make the solution acidic. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: Sodium hydroxide',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Sodium hydroxide solution', 'So'],
          rows: [
            ['turns red litmus **blue**', 'it is an **alkali**'],
            ['releases **OH⁻** ions', 'the **hydroxide ion** makes it alkaline'],
            ['is **corrosive**', 'wear **eye protection**, such as goggles'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. Sodium hydroxide turns red litmus blue, so it is an alkali.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Alkalis release hydroxide ions, O H minus, and those make the solution alkaline.', caption: 'Alkalis release hydroxide ions, OH⁻, and those make the solution alkaline.', show: 't.1', focus: 't.1' },
        { say: 'Sodium hydroxide is corrosive and can damage the eyes and skin, so we wear eye protection, such as goggles, when using it. That is part c.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Acidic**. (b) HCl splits up in water and releases **hydrogen ions, H⁺**, which make it acidic. (c) The **hydroxide ion, OH⁻**; wear **eye protection** because it is corrosive.' },
      ],
      lines: [
        { say: 'Does it make sense? Lemon juice tastes sour, a sign of an acid, and sodium hydroxide is used in drain cleaners, a sign of a strong alkali.', show: 'ans' },
        { say: 'So lemon juice is acidic, hydrogen ions make hydrochloric acid acidic, and hydroxide ions make sodium hydroxide alkaline.' },
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
            ['Lemon juice is **alkaline**', 'Mixed up which litmus was used'],
            ['The **chloride** ions make it acidic', 'It is the **hydrogen** ions'],
            ['The **sodium** ion makes it alkaline', 'It is the **hydroxide** ion'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Blue litmus turning red means acid. It is red litmus turning blue that means alkali.', focus: 'traps.0' },
        { say: 'Chloride ions are in salt water too, which is neutral. The hydrogen ions are what make the acid.', focus: 'traps.1' },
        { say: 'And sodium ions are in neutral salt as well. The hydroxide ions are what make the alkali.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which ion do all acids release when they dissolve in water?',
          choices: ['H⁺', 'OH⁻', 'Cl⁻', 'Na⁺'],
          answer: 0,
          working: 'All acids release hydrogen ions, H⁺, in water. OH⁻ comes from alkalis.',
        },
      ],
      lines: [
        { say: 'Your turn. Which ion do all acids release when they dissolve in water? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'All acids release hydrogen ions, H plus: choice A. Hydroxide ions come from alkalis.', caption: 'All acids release hydrogen ions, H⁺: choice A. Hydroxide ions come from alkalis.', show: 'q2.answer' },
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
          items: ['Acid: blue litmus → **red**. Alkali: red litmus → **blue**', 'Acids release **H⁺**; alkalis release **OH⁻**', 'Strong acids and alkalis are **corrosive**: wear goggles'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Acids turn blue litmus red, and alkalis turn red litmus blue.', show: 'sum.0' },
        { say: 'Acids release hydrogen ions, and alkalis release hydroxide ions.', show: 'sum.1' },
        { say: 'And strong acids and alkalis are corrosive, so always wear eye protection. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
