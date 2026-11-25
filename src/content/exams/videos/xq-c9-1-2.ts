import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import numbers from '@/content/chem9/videos/c9-1-2.ts';

// Exam question for Chemistry 9 lesson 1.2 (atomic number, mass number and isotopes): count the
// particles in magnesium-24, say how magnesium-26 differs, and explain why the two isotopes react
// the same way. Written by Gradileo in the style of a Grade 9 science unit test.
//
// The picture is the lesson's two carbon nuclei, carbon-12 and carbon-14, building up
// (src/video/molecules.ts).

const QUESTION = 'Magnesium has atomic number 12. Two of its isotopes are magnesium-24 and magnesium-26. (a) How many protons, neutrons and electrons are in an atom of magnesium-24? (b) How is an atom of magnesium-26 different from an atom of magnesium-24? (c) Both isotopes react with acid in exactly the same way. Explain why.';

const video: Explainer = {
  id: 'xq-c9-1-2',
  lessonId: '',
  exam: {
    lesson: 'c9-1-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Magnesium-24 and Magnesium-26. Atomic Number, Mass Number and Isotopes',
  thumbnailTitle: 'Two Isotopes of Magnesium',
  thumbnail: 'nu',
  summary:
    'A test-style question, solved one small step at a time: how many protons, neutrons and electrons are in magnesium-24, how does magnesium-26 differ, and why do the two react the same way? Magnesium-24 has 12 protons, 12 neutrons and 12 electrons, magnesium-26 has two more neutrons, and both have the same electrons, which is what reactions depend on.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two Isotopes of Magnesium', subtitle: 'Counting protons, neutrons and electrons' }],
      lines: [
        { say: 'In this video, we solve a test-style question about atomic number, mass number and isotopes. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '12, 12, 12; two more neutrons; same electrons' }],
      lines: [
        { say: 'Here is the question. Magnesium has atomic number twelve. Two of its isotopes are magnesium-twenty-four and magnesium-twenty-six. Part a: how many protons, neutrons and electrons are in an atom of magnesium-twenty-four? Part b: how is an atom of magnesium-twenty-six different from an atom of magnesium-twenty-four? Part c: both isotopes react with acid in exactly the same way. Explain why.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Use the **atomic number** and the **mass number** to count each kind of particle' }],
      lines: [
        { say: 'The number after the name is the mass number. Together with the atomic number, it lets us count every particle in the atom.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(numbers, 'nu')],
      lines: [
        { say: 'Here is what we need. These are the protons and neutrons of two carbon nuclei, still apart.', show: 'nu' },
        { say: 'Watch each nucleus come together. Both have six protons, so both are carbon. But the first has six neutrons and the second has eight, so their mass numbers are twelve and fourteen. Same element, different numbers of neutrons: they are isotopes.', play: 'nu.build' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Protons = **atomic number**; electrons = protons', 'Neutrons = **mass number − atomic number**', 'Isotopes: same protons, different **neutrons**'] }],
      lines: [
        { say: 'Here is the plan. The atomic number gives the protons, and in an atom the electrons equal the protons.', show: 'plan.0' },
        { say: 'Neutrons are the mass number take away the atomic number.', show: 'plan.1' },
        { say: 'And isotopes have the same number of protons but different numbers of neutrons.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Magnesium-24',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{protons} = \\text{electrons} = \\good{12}', '\\text{neutrons} = 24 - 12 = \\good{12}'] }],
      lines: [
        { say: 'Step one. Magnesium has atomic number twelve, so it has twelve protons, and so twelve electrons.', show: 'm.0' },
        { say: 'The mass number is twenty four, so the neutrons are twenty four take away twelve, which is twelve. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Magnesium-26',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Isotope', 'Protons', 'Neutrons', 'Electrons'],
          rows: [
            ['magnesium-24', '12', '12', '12'],
            ['magnesium-26', '12', '**14**', '12'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. Magnesium-twenty-six is still magnesium, so it still has twelve protons and twelve electrons.', show: ['t', 't.0'] },
        { say: 'But its neutrons are twenty six take away twelve, which is fourteen. So it has two more neutrons than magnesium-twenty-four, and is a little heavier. That is part b.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 3: The same reactions',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Reactions involve the **electrons**', 'Both isotopes have **12 electrons**, arranged the same way', 'So they react **the same**; only their **mass** differs'] }],
      lines: [
        { say: 'Step three. When atoms react, it is their electrons that are given, taken or shared.', show: 's.0' },
        { say: 'Both isotopes have twelve electrons, arranged in exactly the same way.', show: 's.1' },
        { say: 'So they react in exactly the same way. The extra neutrons only change the mass. That is part c.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **12 protons**, **12 neutrons**, **12 electrons**. (b) Magnesium-26 has **two more neutrons** (14), so it is heavier. (c) Both have the **same electrons**, and reactions depend on electrons.' },
      ],
      lines: [
        { say: 'Does it make sense? Twelve protons plus twelve neutrons is twenty four, the mass number, and twelve plus fourteen is twenty six.', show: 'ans' },
        { say: 'So magnesium-twenty-four has twelve of each particle, magnesium-twenty-six has two more neutrons, and both react the same because their electrons are the same.' },
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
            ['**24** neutrons', 'Forgot to take away the **protons**'],
            ['Magnesium-26 has more **protons**', 'More protons would make a **different element**'],
            ['Heavier atoms react **faster**', 'Reactions depend on **electrons**, not mass'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The mass number counts protons and neutrons together, so take away the protons to find the neutrons.', focus: 'traps.0' },
        { say: 'An atom with thirteen protons would not be magnesium at all, it would be aluminium. Isotopes differ only in neutrons.', focus: 'traps.1' },
        { say: 'And the extra mass does not change how the atom reacts, because reactions depend on the electrons.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'An atom has 17 protons and 18 neutrons. What is its mass number?',
          choices: ['18', '35', '17', '1'],
          answer: 1,
          working: 'Mass number = protons + neutrons = 17 + 18 = 35. This is chlorine-35.',
        },
      ],
      lines: [
        { say: 'Your turn. An atom has seventeen protons and eighteen neutrons. What is its mass number? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The mass number is protons plus neutrons, seventeen plus eighteen, which is thirty five: choice B. This is chlorine-thirty-five.', show: 'q2.answer' },
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
          items: ['Protons = electrons = **atomic number**', 'Neutrons = **mass number − atomic number**', 'Isotopes: different neutrons, **same reactions**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In an atom, the protons and electrons both equal the atomic number.', show: 'sum.0' },
        { say: 'The neutrons are the mass number take away the atomic number.', show: 'sum.1' },
        { say: 'And isotopes have different numbers of neutrons but react the same way. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
