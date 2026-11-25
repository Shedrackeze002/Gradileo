import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import electrolysis from '@/content/chemmore/videos/cx-1-4.ts';

// Exam question for More Chemistry Topics lesson 1.4 (electrolysis of solutions and half
// equations): the products at each electrode when sodium chloride solution is electrolysed, why
// sodium does not form, and the half equation at the anode. Written by Gradileo in the style of a
// GCSE chemistry exam.
//
// The picture is the lesson's sodium chloride solution between two electrodes
// (src/video/particles.ts).

const QUESTION = 'Sodium chloride solution is electrolysed using inert electrodes. (a) Name the product at the cathode, and explain why sodium is not produced there. (b) Name the product at the anode. (c) Write a balanced half equation for the reaction at the anode.';

const video: Explainer = {
  id: 'xq-cx-1-4',
  lessonId: '',
  exam: {
    lesson: 'cx-1-4',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Electrolysing Salt Water. Electrolysis of Solutions and Half Equations',
  thumbnailTitle: 'Electrolysing Salt Water',
  thumbnail: 'na',
  summary:
    'A test-style question, solved one small step at a time: what forms at each electrode when sodium chloride solution is electrolysed, and what is the half equation at the anode? Hydrogen forms at the cathode because sodium is more reactive than hydrogen, chlorine forms at the anode, and the half equation is 2Cl⁻ → Cl₂ + 2e⁻.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Electrolysing Salt Water', subtitle: 'Products and half equations' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the electrolysis of a solution. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Hydrogen, as sodium is more reactive than hydrogen; chlorine; 2Cl⁻ → Cl₂ + 2e⁻' }],
      lines: [
        { say: 'Here is the question. Sodium chloride solution is electrolysed using inert electrodes. Part a: name the product at the cathode, and explain why sodium is not produced there. Part b: name the product at the anode. Part c: write a balanced half equation for the reaction at the anode.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Decide what forms at **each electrode**, then show the **electrons** at the anode' }],
      lines: [
        { say: 'In a solution, the water can react at the electrodes as well as the salt. We need to decide which wins at each electrode, then write the electrons into a half equation.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(electrolysis, 'na')],
      lines: [
        { say: 'Here is what we need. This is sodium chloride solution up close, with the cathode on the left and the anode on the right. Besides the sodium ions and chloride ions, there are water molecules. Watch which particles change at each electrode once the current flows.', show: ['na', 'na.labels', 'na.key'], play: 'na.run' },
        { say: 'The sodium ions gather at the cathode, but they do not change. Water gives up hydrogen there instead, and the hydrogen bubbles away. At the anode, chloride ions give up electrons, and the chlorine atoms pair up into chlorine gas.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Cathode: **hydrogen**, unless the metal is less reactive than hydrogen', 'Anode: **oxygen**, unless halide ions are present', 'Half equation: balance atoms, then **electrons**'] }],
      lines: [
        { say: 'Here is the plan. At the cathode, hydrogen forms, unless the metal is less reactive than hydrogen.', show: 'plan.0' },
        { say: 'At the anode, oxygen forms, unless there are halide ions, such as chloride.', show: 'plan.1' },
        { say: 'And in a half equation, we balance the atoms first, then add electrons to balance the charge.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The cathode',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Positive ions here: **Na⁺** and **H⁺** from water', 'Sodium is **more reactive** than hydrogen', 'So **hydrogen** gas forms, and sodium stays as ions'] }],
      lines: [
        { say: 'Step one. The positive ions move to the cathode: sodium ions, and hydrogen ions from the water.', show: 's.0' },
        { say: 'Sodium is more reactive than hydrogen, so sodium holds on to its charge more strongly.', show: 's.1' },
        { say: 'So the hydrogen ions take the electrons, and hydrogen gas forms instead of sodium. That is part a.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 2: The anode',
      layout: 'center',
      main: [{ kind: 'math', id: 'a', size: 'md', lines: ['\\text{negative ions: } \\ce{Cl-} \\text{ and } \\ce{OH-}', '\\text{halide present} \\Rightarrow \\good{\\text{chlorine}}'] }],
      lines: [
        { say: 'Step two. The negative ions move to the anode: chloride ions, and hydroxide ions from the water.', show: 'a.0' },
        { say: 'Chloride is a halide ion, so chlorine forms rather than oxygen. That is part b.', show: 'a.1', focus: 'a.1' },
      ],
    },
    {
      chapter: 'Step 3: The half equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'h', size: 'md', lines: ['\\ce{Cl- -> Cl2}', '\\ce{2Cl- -> Cl2}', '\\good{\\ce{2Cl- -> Cl2 + 2e-}}'] }],
      lines: [
        { say: 'Step three. Chloride ions become chlorine molecules.', show: 'h.0' },
        { say: 'Each chlorine molecule has two atoms, so we need two chloride ions.', show: 'h.1' },
        { say: 'The left side has a charge of minus two, and the right side has none, so two electrons are given off. Two C l minus gives C l two plus two electrons. That is part c.', caption: 'The left side has a charge of −2, and the right side has none, so two electrons are given off: 2Cl⁻ → Cl₂ + 2e⁻. That is part c.', show: 'h.2', focus: 'h.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Hydrogen**, because sodium is **more reactive** than hydrogen. (b) **Chlorine**. (c) **2Cl⁻ → Cl₂ + 2e⁻**' },
      ],
      lines: [
        { say: 'Does it make sense? The anode takes electrons away from the negative ions, so the electrons belong on the right of its half equation. And both sides now have a total charge of minus two.', show: 'ans' },
        { say: 'So hydrogen forms at the cathode, chlorine at the anode, and two chloride ions give a chlorine molecule and two electrons.' },
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
            ['**Sodium** at the cathode', 'True only for **molten** salt'],
            ['**Oxygen** at the anode', 'Chloride ions are **halides**'],
            ['Cl⁻ → Cl + e⁻', 'Chlorine gas is **Cl₂**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Sodium forms only from molten sodium chloride, where there is no water to give up hydrogen.', focus: 'traps.0' },
        { say: 'Oxygen forms at the anode only when there are no halide ions, and chloride is a halide.', focus: 'traps.1' },
        { say: 'And chlorine gas is made of molecules with two atoms, so we need two chloride ions and two electrons.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Copper(II) sulfate solution is electrolysed using inert electrodes. What forms at the anode?',
          choices: ['copper', 'hydrogen', 'sulfur', 'oxygen'],
          answer: 3,
          working: 'There are no halide ions, so water gives up oxygen at the anode. Copper forms at the cathode.',
        },
      ],
      lines: [
        { say: 'Your turn. Copper two sulfate solution is electrolysed using inert electrodes. What forms at the anode? Pause the video and try it.', caption: 'Your turn. Copper(II) sulfate solution is electrolysed using inert electrodes. What forms at the anode? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'There are no halide ions, so water gives up oxygen at the anode: choice D. Copper forms at the cathode.', show: 'q2.answer' },
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
          items: ['Cathode: **hydrogen** unless the metal is below hydrogen', 'Anode: a **halogen** if halide ions are present, else **oxygen**', 'Anode half equations give off **electrons**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. At the cathode, hydrogen forms unless the metal is less reactive than hydrogen.', show: 'sum.0' },
        { say: 'At the anode, a halogen forms if halide ions are present, and otherwise oxygen.', show: 'sum.1' },
        { say: 'And the half equation at the anode gives off electrons. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
