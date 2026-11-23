import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import history from '@/content/chemmore/videos/cx-5-1.ts';

// Exam question for More Chemistry Topics lesson 5.1 (the development of the atom and the periodic
// table): the plum pudding model, what the two results of the gold foil experiment showed, and why
// Mendeleev left gaps. Written by Gradileo in the style of a GCSE chemistry exam.
//
// The picture is the lesson's alpha particles fired at gold atoms (src/video/scatter.ts).

const QUESTION = 'Our model of the atom has changed over time. (a) Describe the plum pudding model of the atom. (b) In Rutherford\'s experiment, alpha particles were fired at thin gold foil. Most went straight through, but a very few bounced back. What did each of these two results show? (c) Mendeleev left gaps in his periodic table. Explain why.';

const video: Explainer = {
  id: 'xq-cx-5-1',
  lessonId: '',
  exam: {
    lesson: 'cx-5-1',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: The Plum Pudding, the Gold Foil and Mendeleev\'s Gaps. The Development of the Atom',
  thumbnailTitle: 'How the Atom Changed',
  thumbnail: 'foil',
  summary:
    'A test-style question, solved one small step at a time: what was the plum pudding model, what did the gold foil experiment show, and why did Mendeleev leave gaps? The plum pudding model was a ball of positive charge with electrons in it, most alpha particles passing through showed the atom is mostly empty space while the few that bounced back showed a tiny, dense, positive nucleus, and the gaps were for elements not yet discovered.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How the Atom Changed', subtitle: 'Models and evidence' }],
      lines: [
        { say: 'In this video, we solve a test-style question about how our model of the atom developed. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Positive ball with electrons; mostly empty space and a tiny positive nucleus; for undiscovered elements' }],
      lines: [
        { say: 'Here is the question. Our model of the atom has changed over time. Part a: describe the plum pudding model of the atom. Part b: in Rutherford\'s experiment, alpha particles were fired at thin gold foil. Most went straight through, but a very few bounced back. What did each of these two results show? Part c: Mendeleev left gaps in his periodic table. Explain why.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Describe an **old model**, link each result to its **evidence**, and explain a **prediction**' }],
      lines: [
        { say: 'Each new model came from new evidence. We need the old model, what each result of the gold foil experiment told us, and why Mendeleev trusted his pattern enough to leave gaps.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(history, 'foil')],
      lines: [
        { say: 'Here is what we need. This is the experiment up close: alpha particles fired at the atoms of the foil.', show: ['foil', 'foil.labels'] },
        { say: 'Fire them one at a time. Almost all of them fly straight through the empty space.', show: 'foil.count', play: 'foil.first' },
        { say: 'Keep firing. A few pass close to a nucleus and are pushed aside, and a very few head straight for one and bounce back.', play: 'foil.rest' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Plum pudding: charge **spread out**', 'Nuclear model: charge and mass in a **tiny nucleus**', 'Mendeleev: ordered by **properties**, with gaps'] }],
      lines: [
        { say: 'Here is the plan. In the plum pudding model, the positive charge was spread out through the atom.', show: 'plan.0' },
        { say: 'The nuclear model put the positive charge and almost all the mass in a tiny nucleus.', show: 'plan.1' },
        { say: 'And Mendeleev ordered the elements by their properties, leaving gaps where the pattern needed them.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The plum pudding',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['A **ball of positive charge**', 'With **electrons** scattered through it', 'Like plums in a pudding'] }],
      lines: [
        { say: 'Step one. In the plum pudding model, the atom was a ball of positive charge.', show: 's.0' },
        { say: 'Negative electrons were scattered through it.', show: 's.1' },
        { say: 'Like plums in a pudding, which gave the model its name. That is part a.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 2: The two results',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Result', 'Shows'],
          rows: [
            ['most went **straight through**', 'the atom is mostly **empty space**'],
            ['a very few **bounced back**', 'a tiny, dense, **positive nucleus**'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. Most alpha particles went straight through, so most of the atom must be empty space.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'A very few bounced back. Only something tiny, very dense and positively charged could turn them round, so the mass and positive charge must be in a tiny nucleus. That is part b.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 3: Mendeleev\'s gaps',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'g', items: ['Elements in each group have **similar properties**', 'Gaps for elements **not yet discovered**', 'He **predicted** their properties; they were later found'] }],
      lines: [
        { say: 'Step three. Mendeleev put elements with similar properties in the same group.', show: 'g.0' },
        { say: 'Where no known element fitted the pattern, he left a gap for an element that had not been discovered yet.', show: 'g.1' },
        { say: 'He even predicted their properties, and when elements such as germanium were found, they matched. That is part c.', show: 'g.2', focus: 'g.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) A **ball of positive charge** with **electrons** in it. (b) Most went through: mostly **empty space**. A few bounced back: a tiny, dense, **positive nucleus**. (c) For elements **not yet discovered**.' },
      ],
      lines: [
        { say: 'Does it make sense? If the plum pudding model were right, the spread-out charge could never bounce an alpha particle back, which is why the model had to change.', show: 'ans' },
        { say: 'So the old model was positive charge with electrons in it, the experiment revealed empty space and a nucleus, and the gaps were for undiscovered elements.' },
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
            ['Electrons in **shells**', 'That is **Bohr\'s** model'],
            ['Bounce back: the atom is **solid**', 'Only a **tiny** part is dense'],
            ['Gaps for elements that **cannot exist**', 'They were **found** later'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Electrons in shells came later, from Bohr. The plum pudding had no shells and no nucleus.', focus: 'traps.0' },
        { say: 'So few bounced back that the dense part must be tiny. The rest of the atom is empty.', focus: 'traps.1' },
        { say: 'And Mendeleev\'s gaps were for real elements, found later with the properties he predicted.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which particle did James Chadwick discover?',
          choices: ['the neutron', 'the electron', 'the proton', 'the alpha particle'],
          answer: 0,
          working: 'Chadwick discovered the neutron, the uncharged particle in the nucleus.',
        },
      ],
      lines: [
        { say: 'Your turn. Which particle did James Chadwick discover? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Chadwick discovered the neutron, the uncharged particle in the nucleus: choice A.', show: 'q2.answer' },
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
          items: ['Plum pudding: **positive ball** with electrons in it', 'Gold foil: **empty space** and a tiny **nucleus**', 'Mendeleev left gaps for **undiscovered** elements'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The plum pudding model was a ball of positive charge with electrons in it.', show: 'sum.0' },
        { say: 'The gold foil experiment showed the atom is mostly empty space, with a tiny positive nucleus.', show: 'sum.1' },
        { say: 'And Mendeleev left gaps for elements not yet discovered. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
