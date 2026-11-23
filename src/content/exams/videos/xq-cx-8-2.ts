import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import group2 from '@/content/chemmore/videos/cx-8-2.ts';

// Exam question for More Chemistry Topics lesson 8.2 (Group 2): the equation for calcium and water,
// the trend in reactivity down the group, and the test for sulfate ions with acidified barium
// chloride. Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's barium ions meeting sulfate ions to make the white precipitate
// (src/video/particles.ts).

const QUESTION = 'This question is about the Group 2 elements. (a) Write an equation for the reaction of calcium with water. (b) State and explain the trend in reactivity of the elements down Group 2. (c) Acidified barium chloride solution is used to test for sulfate ions. Give the result of a positive test, write the ionic equation, and explain why the solution is first acidified with hydrochloric acid.';

const video: Explainer = {
  id: 'xq-cx-8-2',
  lessonId: '',
  exam: {
    lesson: 'cx-8-2',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Calcium in Water and the Sulfate Test. Group 2, the Alkaline Earth Metals',
  thumbnailTitle: 'Down Group 2',
  thumbnail: 'bs',
  summary:
    'A test-style question, solved one small step at a time: what is the equation for calcium and water, how does reactivity change down Group 2, and how does acidified barium chloride test for sulfate? Ca + 2H₂O → Ca(OH)₂ + H₂, reactivity increases because the outer electrons are further out and lost more easily, and a white precipitate of barium sulfate forms, with the acid removing carbonate ions first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Down Group 2', subtitle: 'Reactivity and the sulfate test' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the Group 2 elements. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Ca + 2H₂O → Ca(OH)₂ + H₂; increases; white precipitate, Ba²⁺ + SO₄²⁻ → BaSO₄, acid removes carbonate' }],
      lines: [
        { say: 'Here is the question. This question is about the Group 2 elements. Part a: write an equation for the reaction of calcium with water. Part b: state and explain the trend in reactivity of the elements down Group 2. Part c: acidified barium chloride solution is used to test for sulfate ions. Give the result of a positive test, write the ionic equation, and explain why the solution is first acidified with hydrochloric acid.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Write a **reaction**, explain a **trend**, and justify each part of a **test**' }],
      lines: [
        { say: 'We need one equation, a trend explained from the atoms, and a test, including why each reagent is there.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(group2, 'bs')],
      lines: [
        { say: 'Here is what we need, for part c. This is barium chloride solution added to a solution with sulfate ions, up close.', show: ['bs', 'bs.labels', 'bs.key'] },
        { say: 'Wherever a barium ion meets a sulfate ion, they lock together and sink as solid barium sulfate: the white precipitate. The sodium and chloride ions stay dissolved.', show: 'bs.tally', play: 'bs.mix' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Metal + water → **hydroxide** + **hydrogen**', 'Down the group: **bigger** atoms, **lower** ionisation energy', 'BaSO₄ is **insoluble** and **white**'] }],
      lines: [
        { say: 'Here is the plan. A Group 2 metal and water make a hydroxide and hydrogen.', show: 'plan.0' },
        { say: 'Down the group, the atoms get bigger and the ionisation energies fall.', show: 'plan.1' },
        { say: 'And barium sulfate is an insoluble white solid.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Calcium and water',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\good{\\ce{Ca + 2H2O -> Ca(OH)2 + H2}}'] }],
      lines: [
        { say: 'Step one. Calcium reacts with water to make calcium hydroxide and hydrogen. Calcium hydroxide has two hydroxide groups, so we need two water molecules. C a plus two H two O gives C a O H two plus H two. That is part a.', caption: 'Step one. Calcium reacts with water to make calcium hydroxide and hydrogen. Calcium hydroxide has two hydroxide groups, so we need two water molecules: Ca + 2H₂O → Ca(OH)₂ + H₂. That is part a.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: The trend',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Reactivity **increases** down the group', 'Atoms have **more shells**: outer electrons **further out** and **more shielded**', 'So the two outer electrons are **lost more easily**'] }],
      lines: [
        { say: 'Step two. Reactivity increases down Group 2.', show: 's.0' },
        { say: 'Each element has one more shell than the one above, so its outer electrons are further from the nucleus and more shielded.', show: 's.1' },
        { say: 'Although the nuclear charge rises, the attraction for the outer electrons gets weaker, so they are lost more easily, and the metal reacts faster. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: The sulfate test',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Part of the test', 'Why'],
          rows: [
            ['add **hydrochloric acid** first', 'removes **carbonate** ions, which also give a white solid'],
            ['add **barium chloride**', '**white precipitate** if sulfate is there'],
            ['ionic equation', '**Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)**'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. First, hydrochloric acid is added. It reacts with any carbonate ions, which would otherwise give a white precipitate of barium carbonate and a false positive.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Then barium chloride is added. If sulfate ions are present, a white precipitate forms, just as we saw.', show: 't.1', focus: 't.1' },
        { say: 'The ionic equation is barium ions plus sulfate ions give solid barium sulfate. That is part c.', caption: 'The ionic equation is Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s). That is part c.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Ca + 2H₂O → Ca(OH)₂ + H₂**. (b) Reactivity **increases**: outer electrons are **further out** and **more shielded**, so lost more easily. (c) A **white precipitate**; **Ba²⁺ + SO₄²⁻ → BaSO₄**; the acid **removes carbonate** ions.' },
      ],
      lines: [
        { say: 'Does it make sense? Magnesium barely reacts with cold water, while barium reacts quickly, which fits reactivity rising down the group.', show: 'ans' },
        { say: 'So calcium makes its hydroxide and hydrogen, reactivity rises down the group, and the sulfate test gives white barium sulfate.' },
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
            ['Ca + H₂O → CaO + H₂', 'With water it gives the **hydroxide**'],
            ['Reactivity falls: **more protons**', 'Distance and **shielding** win'],
            ['Use **sulfuric** acid to acidify', 'That **adds** sulfate ions'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Calcium and water make calcium hydroxide. The oxide forms when magnesium burns in steam.', focus: 'traps.0' },
        { say: 'The nuclear charge rises, but the extra shells and shielding matter more, so reactivity rises.', focus: 'traps.1' },
        { say: 'And we never acidify with sulfuric acid, because it would add the very ions we are testing for.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which Group 2 hydroxide is the least soluble in water?',
          choices: ['barium hydroxide', 'magnesium hydroxide', 'calcium hydroxide', 'strontium hydroxide'],
          answer: 1,
          working: 'Hydroxides get more soluble down the group, so magnesium hydroxide, at the top, is the least soluble.',
        },
      ],
      lines: [
        { say: 'Your turn. Which Group 2 hydroxide is the least soluble in water? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Hydroxides get more soluble down the group, so magnesium hydroxide, at the top, is the least soluble: choice B.', show: 'q2.answer' },
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
          items: ['Metal + water → **hydroxide** + hydrogen', 'Reactivity **increases** down Group 2', 'Sulfate test: acidify with **HCl**, then a **white** BaSO₄ precipitate'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A Group 2 metal and water make a hydroxide and hydrogen.', show: 'sum.0' },
        { say: 'Reactivity increases down the group.', show: 'sum.1' },
        { say: 'And the sulfate test uses hydrochloric acid, then barium chloride, giving a white precipitate. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
