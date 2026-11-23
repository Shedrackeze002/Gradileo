import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import group7 from '@/content/chemmore/videos/cx-8-3.ts';

// Exam question for More Chemistry Topics lesson 8.3 (Group 7, the halogens): chlorine displacing
// bromide, identifying a halide from its silver precipitate and ammonia, and why nitric acid is
// added first. Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's silver ions meeting chloride ions (src/video/particles.ts).

const QUESTION = 'This question is about the halogens and halide ions. (a) Chlorine water is added to potassium bromide solution, and the solution turns orange. Write an ionic equation for the reaction and explain why it happens. (b) A solution of an unknown halide gives a cream precipitate with acidified silver nitrate. The precipitate dissolves in concentrated ammonia but not in dilute ammonia. Identify the halide ion. (c) Explain why dilute nitric acid is added before the silver nitrate.';

const video: Explainer = {
  id: 'xq-cx-8-3',
  lessonId: '',
  exam: {
    lesson: 'cx-8-3',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Chlorine and Bromide, and a Cream Precipitate. Group 7, the Halogens',
  thumbnailTitle: 'Halogens and Halides',
  thumbnail: 'pr',
  summary:
    'A test-style question, solved one small step at a time: why does chlorine turn bromide solution orange, which halide gives a cream precipitate that dissolves only in concentrated ammonia, and why is nitric acid added first? Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂ because chlorine is the stronger oxidising agent, the halide is bromide, and the acid removes carbonate and hydroxide ions that would also give a precipitate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Halogens and Halides', subtitle: 'Displacement and the silver nitrate test' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the halogens. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂; bromide; removes carbonate ions' }],
      lines: [
        { say: 'Here is the question. This question is about the halogens and halide ions. Part a: chlorine water is added to potassium bromide solution, and the solution turns orange. Write an ionic equation for the reaction and explain why it happens. Part b: a solution of an unknown halide gives a cream precipitate with acidified silver nitrate. The precipitate dissolves in concentrated ammonia but not in dilute ammonia. Identify the halide ion. Part c: explain why dilute nitric acid is added before the silver nitrate.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Compare **oxidising power** down the group, then read the **silver nitrate** test' }],
      lines: [
        { say: 'A halogen that is a stronger oxidising agent takes electrons from the halide ions below it. Then we read the silver nitrate test, including the ammonia step.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(group7, 'pr')],
      lines: [
        { say: 'Here is what we need. This is the silver nitrate test up close: silver nitrate solution mixed with a solution of chloride ions.', show: ['pr', 'pr.labels', 'pr.key'] },
        { say: 'Wherever a silver ion meets a chloride ion, they lock together and sink as solid silver chloride: a white precipitate. Bromide and iodide do the same, giving cream and yellow solids.', show: 'pr.tally', play: 'pr.mix' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Oxidising power **falls** down Group 7', 'Silver halides: **white**, **cream**, **yellow**', 'Ammonia tells cream from the others'] }],
      lines: [
        { say: 'Here is the plan. Oxidising power falls down Group 7, so a halogen displaces the halide ions below it.', show: 'plan.0' },
        { say: 'Silver chloride is white, silver bromide cream, and silver iodide yellow.', show: 'plan.1' },
        { say: 'And their solubility in ammonia confirms which is which.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Chlorine and bromide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\good{\\ce{Cl2 + 2Br- -> 2Cl- + Br2}}', '\\ce{Cl2} \\text{ is a stronger oxidising agent than } \\ce{Br2}'] }],
      lines: [
        { say: 'Step one. Chlorine takes electrons from the bromide ions. It becomes chloride ions, and the bromide becomes bromine, which turns the solution orange. C l two plus two B r minus gives two C l minus plus B r two.', caption: 'Step one. Chlorine takes electrons from the bromide ions. It becomes chloride ions, and the bromide becomes bromine, which turns the solution orange: Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂.', show: 'm.0' },
        { say: 'This happens because chlorine is smaller and more electronegative than bromine, so it attracts electrons more strongly. It is the stronger oxidising agent. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The unknown halide',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Halide', 'Precipitate', 'Dilute NH₃', 'Concentrated NH₃'],
          rows: [
            ['chloride', 'white', 'dissolves', 'dissolves'],
            ['**bromide**', '**cream**', '**does not dissolve**', '**dissolves**'],
            ['iodide', 'yellow', 'does not dissolve', 'does not dissolve'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. Silver chloride is white and dissolves even in dilute ammonia.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Silver bromide is cream, and dissolves only in concentrated ammonia. That matches our unknown, so the halide is bromide. That is part b.', show: 't.1', focus: 't.1' },
        { say: 'Silver iodide is yellow and does not dissolve in either.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 3: Why nitric acid?',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Carbonate and hydroxide ions also form **silver precipitates**', 'Nitric acid **removes** them first', 'It adds **no halide ions**, unlike hydrochloric acid'] }],
      lines: [
        { say: 'Step three. Carbonate ions and hydroxide ions would also form precipitates with silver ions, and give a false result.', show: 's.0' },
        { say: 'Dilute nitric acid reacts with them and removes them first.', show: 's.1' },
        { say: 'We use nitric acid, not hydrochloric acid, because hydrochloric acid would add chloride ions. That is part c.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂**: chlorine is the **stronger oxidising agent**. (b) **Bromide**, Br⁻. (c) To **remove carbonate** (and hydroxide) ions, which would also give a **precipitate**.' },
      ],
      lines: [
        { say: 'Does it make sense? Bromine water is orange, so the colour change fits bromine being made, and chlorine sits above bromine in the group.', show: 'ans' },
        { say: 'So chlorine displaces bromine, the cream precipitate is silver bromide, and nitric acid clears away ions that would spoil the test.' },
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
            ['Cl₂ + Br⁻ → Cl⁻ + Br', 'Bromine is **Br₂**: balance it'],
            ['**Chloride**, it dissolved in ammonia', 'Only in **concentrated**: bromide'],
            ['Use **hydrochloric** acid', 'That **adds** chloride ions'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Bromine forms B r two molecules, so we need two bromide ions and two chloride ions.', caption: 'Bromine forms Br₂ molecules, so we need two bromide ions and two chloride ions.', focus: 'traps.0' },
        { say: 'Silver chloride would dissolve in dilute ammonia too. Dissolving only in concentrated ammonia means bromide.', focus: 'traps.1' },
        { say: 'And hydrochloric acid would add the chloride ions that the test is looking for.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which halide ion is the strongest reducing agent?',
          choices: ['chloride', 'fluoride', 'iodide', 'bromide'],
          answer: 2,
          working: 'Halide ions get bigger down the group, so they lose electrons more easily: iodide is the strongest reducing agent.',
        },
      ],
      lines: [
        { say: 'Your turn. Which halide ion is the strongest reducing agent? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Iodide is the biggest, so its outer electrons are held least tightly and are given away most easily: choice C.', show: 'q2.answer' },
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
          items: ['A halogen **displaces** the halide ions below it', 'AgCl **white**, AgBr **cream**, AgI **yellow**', 'Acidify with **nitric** acid first'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A halogen displaces the halide ions below it in the group.', show: 'sum.0' },
        { say: 'Silver chloride is white, silver bromide cream, and silver iodide yellow.', show: 'sum.1' },
        { say: 'And the test is acidified with nitric acid first. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
