import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import transition from '@/content/chemmore/videos/cx-5-2.ts';

// Exam question for More Chemistry Topics lesson 5.2 (transition metals): two differences from the
// alkali metals, telling iron(II) from iron(III) by the colour of the hydroxide, and what a
// catalyst does. Written by Gradileo in the style of a GCSE chemistry exam.
//
// The pictures are the lesson's iron(II) and iron(III) ions picking up hydroxide ions
// (src/video/particles.ts).

const QUESTION = 'Iron is a transition metal. (a) Give two ways in which the transition metals differ from the alkali metals. (b) A student adds sodium hydroxide solution to two solutions of iron compounds. Solution P gives a green precipitate and solution Q gives an orange-brown precipitate. Which iron ion is in each solution? (c) Iron is used as a catalyst in making ammonia. What does a catalyst do?';

const video: Explainer = {
  id: 'xq-cx-5-2',
  lessonId: '',
  exam: {
    lesson: 'cx-5-2',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: A Green and an Orange-Brown Precipitate. Transition Metals',
  thumbnailTitle: 'Iron(II) or Iron(III)?',
  thumbnail: 'f3',
  summary:
    'A test-style question, solved one small step at a time: how do the transition metals differ from the alkali metals, which iron ion gives a green and which an orange-brown precipitate, and what does a catalyst do? Transition metals have higher melting points and densities and react much more slowly, green shows iron(II) and orange-brown iron(III), and a catalyst speeds up a reaction without being used up.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Iron(II) or Iron(III)?', subtitle: 'The transition metals' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the transition metals. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Higher melting point, less reactive; P Fe²⁺, Q Fe³⁺; speeds up a reaction, not used up' }],
      lines: [
        { say: 'Here is the question. Iron is a transition metal. Part a: give two ways in which the transition metals differ from the alkali metals. Part b: a student adds sodium hydroxide solution to two solutions of iron compounds. Solution P gives a green precipitate and solution Q gives an orange-brown precipitate. Which iron ion is in each solution? Part c: iron is used as a catalyst in making ammonia. What does a catalyst do?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Compare two **families of metals**, then use **colour** to tell two iron ions apart' }],
      lines: [
        { say: 'We compare the transition metals with the alkali metals, then use the colour of a precipitate to tell which iron ion is present.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 560,
      left: [pick(transition, 'f2')],
      right: [pick(transition, 'f3')],
      lines: [
        { say: 'Here is what we need. These are the two iron ions up close, each meeting hydroxide ions. On the left, iron two ions, and on the right, iron three ions.', caption: 'Here is what we need. These are the two iron ions up close, each meeting hydroxide ions. On the left, Fe²⁺ ions, and on the right, Fe³⁺ ions.', show: ['f2', 'f2.labels', 'f3', 'f3.labels'] },
        { say: 'An iron two ion is complete once it holds two hydroxide ions, but an iron three ion needs three. The green iron two hydroxide and the orange-brown iron three hydroxide are different compounds.', caption: 'An Fe²⁺ ion is complete once it holds two OH⁻ ions, but an Fe³⁺ ion needs three. Green Fe(OH)₂ and orange-brown Fe(OH)₃ are different compounds.', show: ['f2.tally', 'f3.tally'], play: ['f2.mix', 'f3.mix'] },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Transition metals: **hard**, **dense**, **slow** to react', 'Iron(II) hydroxide **green**; iron(III) hydroxide **orange-brown**', 'Catalysts **speed up** reactions'] }],
      lines: [
        { say: 'Here is the plan. Transition metals are hard and dense, and react slowly.', show: 'plan.0' },
        { say: 'Iron two hydroxide is green, and iron three hydroxide is orange-brown.', caption: 'Iron(II) hydroxide is green, and iron(III) hydroxide is orange-brown.', show: 'plan.1' },
        { say: 'And many transition metals are useful catalysts.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Two differences',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Property', 'Alkali metals', 'Transition metals'],
          rows: [
            ['melting point', 'low', '**high**'],
            ['density', 'low', '**high**'],
            ['strength', 'soft', '**strong** and **hard**'],
            ['reactivity', 'very reactive', 'react **much more slowly**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Transition metals have much higher melting points than the alkali metals.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'They are denser.', show: 't.1', focus: 't.1' },
        { say: 'They are stronger and harder.', show: 't.2', focus: 't.2' },
        { say: 'And they react much more slowly with water and oxygen. Any two of these answer part a. They also form coloured compounds.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Step 2: The two precipitates',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{P: green} \\Rightarrow \\ce{Fe(OH)2} \\Rightarrow \\good{\\ce{Fe^2+}}', '\\text{Q: orange-brown} \\Rightarrow \\ce{Fe(OH)3} \\Rightarrow \\good{\\ce{Fe^3+}}'] }],
      lines: [
        { say: 'Step two. A green precipitate is iron two hydroxide, so solution P contains iron two ions.', caption: 'Step two. A green precipitate is iron(II) hydroxide, so solution P contains Fe²⁺ ions.', show: 'm.0' },
        { say: 'An orange-brown precipitate is iron three hydroxide, so solution Q contains iron three ions. That is part b.', caption: 'An orange-brown precipitate is iron(III) hydroxide, so solution Q contains Fe³⁺ ions. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: A catalyst',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['**Speeds up** a reaction', 'Is **not used up**, so it works again and again'] }],
      lines: [
        { say: 'Step three. A catalyst speeds up a chemical reaction.', show: 's.0' },
        { say: 'It is not used up, so the same iron keeps working, reaction after reaction. That is part c.', show: 's.1', focus: 's.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Any two: **higher melting point**, **higher density**, **stronger and harder**, **much less reactive**. (b) P: **Fe²⁺**; Q: **Fe³⁺**. (c) It **speeds up** a reaction without being **used up**.' },
      ],
      lines: [
        { say: 'Does it make sense? Iron is used for bridges and sodium is kept under oil, which fits strong, slow-reacting transition metals and soft, very reactive alkali metals.', show: 'ans' },
        { say: 'So the transition metals are harder, denser and less reactive, P has iron two ions and Q iron three, and a catalyst speeds a reaction without being used up.', caption: 'So the transition metals are harder, denser and less reactive, P has Fe²⁺ ions and Q Fe³⁺, and a catalyst speeds a reaction without being used up.' },
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
            ['Transition metals are **more reactive**', 'The alkali metals react **faster**'],
            ['Green is **iron(III)**', 'Swapped the colours'],
            ['A catalyst is **used up**', 'It is **unchanged** at the end'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The alkali metals are the reactive ones. Transition metals react much more slowly.', focus: 'traps.0' },
        { say: 'Green goes with iron two and orange-brown, like rust, goes with iron three.', caption: 'Green goes with iron(II) and orange-brown, like rust, goes with iron(III).', focus: 'traps.1' },
        { say: 'And a catalyst is left unchanged at the end of the reaction.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the formula of iron(III) chloride?',
          choices: ['FeCl', 'FeCl₃', 'FeCl₂', 'Fe₃Cl'],
          answer: 1,
          working: 'Iron(III) means Fe³⁺, so it needs three Cl⁻ ions to balance: FeCl₃.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the formula of iron three chloride? Pause the video and try it.', caption: 'Your turn. What is the formula of iron(III) chloride? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Iron three means a charge of three plus, so it needs three chloride ions: F e C l three, choice B.', caption: 'Iron(III) means Fe³⁺, so it needs three Cl⁻ ions: FeCl₃, choice B.', show: 'q2.answer' },
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
          items: ['Transition metals: **harder**, **denser**, **less reactive**', 'Fe(OH)₂ **green**, Fe(OH)₃ **orange-brown**', 'Catalysts **speed up** reactions and are not used up'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Transition metals are harder, denser and less reactive than the alkali metals.', show: 'sum.0' },
        { say: 'Iron two hydroxide is green, and iron three hydroxide is orange-brown.', caption: 'Iron(II) hydroxide is green, and iron(III) hydroxide is orange-brown.', show: 'sum.1' },
        { say: 'And catalysts speed up reactions without being used up. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
