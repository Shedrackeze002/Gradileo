import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import atom from '@/content/chem9/videos/c9-1-1.ts';

// Exam question for Chemistry 9 lesson 1.1 (inside the atom): what the gold foil results show,
// why the plum pudding model cannot explain the alpha particles that bounce back, and the electrons
// and charge of a carbon atom. Written by Gradileo in the style of a Grade 9 science unit test.
//
// The picture is the lesson's gold foil experiment, alpha particles fired one at a time
// (src/content/chem9/videos/lib/c9-scatter.ts).

const QUESTION = 'In a gold foil experiment, positive alpha particles are fired at a very thin sheet of gold. Almost all of them go straight through. A few are pushed off to the side, and about 1 in 8000 bounces straight back. (a) What does it tell us about atoms that almost all the alpha particles go straight through? (b) In the plum pudding model, an atom is a ball of positive charge with electrons scattered through it. Explain why this model cannot explain the alpha particles that bounce back. (c) A carbon atom has 6 protons. How many electrons does it have, and what is its overall charge?';

const video: Explainer = {
  id: 'xq-c9-1-1',
  lessonId: '',
  exam: {
    lesson: 'c9-1-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: The Gold Foil Results and a Carbon Atom. Inside the Atom',
  thumbnailTitle: 'What the Gold Foil Showed',
  thumbnail: 'g',
  summary:
    'A test-style question, solved one small step at a time: what does it mean that almost every alpha particle goes straight through gold foil, why can the plum pudding model not explain the few that bounce back, and how many electrons does a carbon atom have? Atoms are mostly empty space, only a tiny, dense, positive nucleus can throw an alpha particle back, and a carbon atom has 6 electrons and no overall charge.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What the Gold Foil Showed', subtitle: 'Evidence for the nucleus' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the structure of the atom. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Mostly empty space; spread-out charge cannot throw it back; 6 electrons, no charge' }],
      lines: [
        { say: 'Here is the question. In a gold foil experiment, positive alpha particles are fired at a very thin sheet of gold. Almost all of them go straight through. A few are pushed off to the side, and about one in eight thousand bounces straight back. Part a: what does it tell us about atoms that almost all the alpha particles go straight through? Part b: in the plum pudding model, an atom is a ball of positive charge with electrons scattered through it. Explain why this model cannot explain the alpha particles that bounce back. Part c: a carbon atom has six protons. How many electrons does it have, and what is its overall charge?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Use the **evidence** to say what an atom is like inside, then **count** its particles' }],
      lines: [
        { say: 'Nobody can see inside an atom, so we reason from evidence. Each thing the alpha particles do tells us something about what they hit.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(atom, 'g')],
      lines: [
        { say: 'Here is what we need. On the left, a source fires alpha particles at a sheet of gold foil only a few atoms thick.', show: ['g', 'g.labels'] },
        { say: 'Watch them go, one at a time. Almost every one flies straight through, as if nothing were in the way.', play: 'g.first', show: 'g.count' },
        { say: 'Keep firing. Now and then one is pushed off to the side, and very rarely, one comes straight back.', play: 'g.rest' },
        { say: 'Each gold atom has almost all its mass in a tiny positive nucleus, which pushes the positive alpha particles away.', show: 'g.atoms' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Straight through: **nothing** in the way', 'Bounced back: something **small**, **dense** and **positive**', 'Atoms have **equal** numbers of protons and electrons'] }],
      lines: [
        { say: 'Here is the plan. An alpha particle that goes straight through met nothing in its way.', show: 'plan.0' },
        { say: 'One that bounces back must have hit something small, dense and positive.', show: 'plan.1' },
        { say: 'And an atom has equal numbers of protons and electrons.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Straight through',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's1', items: ['Almost every alpha particle meets **nothing**', 'So an atom is **mostly empty space**'] }],
      lines: [
        { say: 'Step one. The foil is several atoms thick, yet almost every alpha particle passes through without being pushed at all.', show: 's1.0' },
        { say: 'So most of the space inside an atom must be empty. That is part a.', show: 's1.1', focus: 's1.1' },
      ],
    },
    {
      chapter: 'Step 2: Bounced back',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Model', 'Positive charge', 'Can it throw an alpha back?'],
          rows: [
            ['plum pudding', 'spread **thinly** through the atom', 'no, only a **small nudge**'],
            ['nuclear model', 'packed in a **tiny, dense** nucleus', '**yes**, if aimed straight at it'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. In the plum pudding model, the positive charge is spread thinly through the whole atom. A fast alpha particle passing through would only feel a small nudge, so nothing could throw it back.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'To turn a fast alpha particle right round, the positive charge and the mass must be packed into a tiny, dense centre: the nucleus. That is why the plum pudding model fails. That is part b.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 3: A carbon atom',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['6 \\text{ protons} \\Rightarrow \\good{6 \\text{ electrons}}', '(+6) + (-6) = \\good{0}'] }],
      lines: [
        { say: 'Step three. An atom has the same number of electrons as protons. Carbon has six protons, so it has six electrons.', show: 'm.0' },
        { say: 'Six positive charges and six negative charges cancel, so the overall charge is zero. The atom is neutral. That is part c.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) An atom is **mostly empty space**. (b) Spread-out positive charge could only **nudge** an alpha particle; throwing it back needs a **tiny, dense, positive nucleus**. (c) **6 electrons**, overall charge **0**.' },
      ],
      lines: [
        { say: 'Does it make sense? If the nucleus is tiny, an alpha particle will hardly ever hit it head on, which is why only about one in eight thousand bounces back.', show: 'ans' },
        { say: 'So atoms are mostly empty space, the bounce-backs need a tiny dense nucleus, and carbon has six electrons and no overall charge.' },
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
            ['Gold atoms have **holes** in them', 'The space is **empty**, not a gap in a solid'],
            ['The **electrons** threw it back', 'Electrons are far too **light**'],
            ['Carbon has **12** electrons', 'Used the **mass number**, not the protons'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'An atom is not a solid ball with holes. Nearly all of it is empty space around a tiny nucleus.', focus: 'traps.0' },
        { say: 'Electrons are about two thousand times lighter than a proton, far too light to stop an alpha particle. Only the heavy nucleus can.', focus: 'traps.1' },
        { say: 'And the number of electrons matches the number of protons, six, not the mass number of twelve.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which particle in an atom has almost no mass?',
          choices: ['The electron', 'The proton', 'The neutron', 'The nucleus'],
          answer: 0,
          working: 'An electron has a mass of only about 1/2000 of a proton, so almost all the mass is in the nucleus.',
        },
      ],
      lines: [
        { say: 'Your turn. Which particle in an atom has almost no mass? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'An electron has only about one two-thousandth of the mass of a proton, so the answer is the electron: choice A.', show: 'q2.answer' },
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
          items: ['Most alphas pass through: atoms are **mostly empty**', 'A few bounce back: a **tiny, dense, positive nucleus**', 'Electrons = protons, so an atom is **neutral**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Most alpha particles pass straight through, so atoms are mostly empty space.', show: 'sum.0' },
        { say: 'A few bounce back, so there must be a tiny, dense, positive nucleus.', show: 'sum.1' },
        { say: 'And an atom has as many electrons as protons, so it has no overall charge. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
