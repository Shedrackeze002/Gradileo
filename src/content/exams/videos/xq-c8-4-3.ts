import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import metals from '@/content/chem8/videos/c8-4-3.ts';

// Exam question for Chemistry 8 lesson 4.3 (metals and alloys): choose a metal for an aircraft
// body and for house wiring from a table, work out the gold in 9 carat gold, and explain why brass
// is harder than copper. Written by Gradileo in the style of a Grade 8 science unit test.
//
// The picture is the lesson's pure copper and brass pushed side by side, layers sliding or stuck
// (src/video/particles.ts).

const QUESTION = 'The table shows some properties of three metals. Aluminium: density 2.7 g/cm³, conducts electricity well, does not corrode. Copper: density 8.9 g/cm³, conducts electricity very well, easy to bend. Steel: density 7.9 g/cm³, very strong, rusts unless protected. (a) Which metal is best for the body of an aircraft, and which for the electrical wiring in a house? Give a reason for each. (b) A ring is stamped 9 carat. What percentage of it is gold? (c) Brass is an alloy of copper and zinc. Explain, in terms of atoms, why brass is harder than pure copper.';

const video: Explainer = {
  id: 'xq-c8-4-3',
  lessonId: '',
  exam: {
    lesson: 'c8-4-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Aircraft, Wiring, 9 Carat Gold and Brass. Metals and Alloys',
  thumbnailTitle: 'Choosing Metals and Alloys',
  thumbnail: 'sl',
  summary:
    'A test-style question, solved one small step at a time: which metal suits an aircraft body and which suits house wiring, how much gold is in 9 carat gold, and why is brass harder than copper? Aluminium is light and does not corrode, copper conducts very well and bends easily, 9 carat gold is 37.5% gold, and the bigger zinc atoms in brass stop the layers of atoms sliding.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Choosing Metals and Alloys', subtitle: 'The right metal for the job' }],
      lines: [
        { say: 'In this video, we solve a test-style question about metals and alloys. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        { kind: 'table', id: 'h', head: ['Metal', 'Density', 'Properties'], rows: [['aluminium', '2.7 g/cm³', 'conducts well, does not corrode'], ['copper', '8.9 g/cm³', 'conducts very well, easy to bend'], ['steel', '7.9 g/cm³', 'very strong, rusts unless protected']] },
        { kind: 'text', id: 'qs', md: '(a) Which metal for an **aircraft body**, and which for **house wiring**? Why? (b) What percentage of a **9 carat** ring is gold? (c) Why is **brass** (copper and zinc) harder than pure copper?' },
      ],
      lines: [
        { say: 'Here is the question. The table shows three metals. Aluminium has a density of two point seven grams per cubic centimetre, conducts electricity well and does not corrode. Copper has a density of eight point nine, conducts electricity very well and is easy to bend. Steel has a density of seven point nine, is very strong, and rusts unless it is protected.', show: 'h' },
        { say: 'Part a: which metal is best for the body of an aircraft, and which for the electrical wiring in a house? Give a reason for each. Part b: a ring is stamped nine carat. What percentage of it is gold? Part c: brass is an alloy of copper and zinc. Explain, in terms of atoms, why brass is harder than pure copper.', show: 'qs' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Match each **job** to the **property** it needs, then look inside an **alloy**' }],
      lines: [
        { say: 'For each job, we ask which property matters most, and find the metal in the table that has it. Then we look at the atoms inside an alloy.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(metals, 'sl')],
      lines: [
        { say: 'Here is what we need. On one side is pure copper, its atoms all the same size in neat layers. On the other is brass, with bigger zinc atoms among the copper.', show: ['sl', 'sl.labels', 'sl.key'] },
        { say: 'Now we push both the same way. In pure copper, the layers slide over one another easily, so the metal bends.', play: 'sl.push', focus: 'sl.cu' },
        { say: 'In brass, the bigger zinc atoms get in the way, so the layers cannot slide. The brass is harder.', focus: 'sl.br' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Pick the property each **job** needs most', 'Carat: parts of gold out of **24**', 'Different-sized atoms stop layers **sliding**'] }],
      lines: [
        { say: 'Here is the plan. For each job, pick the property that matters most.', show: 'plan.0' },
        { say: 'Gold is measured in carats, which are parts of gold out of twenty four.', show: 'plan.1' },
        { say: 'And in an alloy, atoms of a different size stop the layers sliding.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The right metal',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Job', 'Needs', 'Best metal'],
          rows: [
            ['aircraft body', '**light** (low density), no corrosion', '**aluminium**'],
            ['house wiring', '**conducts** very well, **bends**', '**copper**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. An aircraft must be as light as possible, and must not corrode in wet weather. Aluminium has by far the lowest density, two point seven, and does not corrode, so aluminium.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Wiring must carry electricity well and bend round corners in the walls. Copper conducts very well and is easy to bend, so copper. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: 9 carat gold',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{pure gold} = 24 \\text{ carat}', '\\frac{9}{24} \\times 100\\% = \\good{37.5\\%}'] }],
      lines: [
        { say: 'Step two. Pure gold is twenty four carat, so carats count the parts of gold out of twenty four.', show: 'm.0' },
        { say: 'Nine carat means nine parts out of twenty four. Nine divided by twenty four is zero point three seven five, which is thirty seven point five percent. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Why brass is harder',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Pure copper: atoms the **same size**, in neat layers', 'The layers **slide** easily, so copper is soft', 'Brass: bigger **zinc** atoms disrupt the layers, so they **cannot slide**'] }],
      lines: [
        { say: 'Step three. In pure copper, the atoms are all the same size, so they sit in neat layers.', show: 's.0' },
        { say: 'Those layers can slide over one another, which is why copper bends so easily.', show: 's.1' },
        { say: 'In brass, the bigger zinc atoms disrupt the layers, so the layers cannot slide as easily, and brass is harder. That is part c.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Aluminium** for the aircraft: light and does not corrode. **Copper** for wiring: conducts very well and bends. (b) **37.5%**. (c) Bigger **zinc atoms disrupt the layers**, so they cannot slide.' },
      ],
      lines: [
        { say: 'Does it make sense? Nine carat is well under half of twenty four, and thirty seven point five percent is under half, so the number fits.', show: 'ans' },
        { say: 'So aluminium for the aircraft, copper for the wiring, nine carat is thirty seven point five percent gold, and the zinc atoms stop the layers in brass sliding.' },
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
            ['**Steel** for the aircraft', 'Strong, but far too **heavy**'],
            ['9 carat is **9%** gold', 'Out of **24**, not out of 100'],
            ['Brass is a **compound**', 'An alloy is a **mixture**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Steel is strong, but nearly three times as dense as aluminium, so a steel aircraft would be far too heavy.', focus: 'traps.0' },
        { say: 'Carats count out of twenty four, not out of one hundred, so nine carat is not nine percent.', focus: 'traps.1' },
        { say: 'And brass is not a compound. The copper and zinc are mixed, not joined, so an alloy is a mixture.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A ring is stamped 22 carat. About what percentage of it is gold?',
          choices: ['22%', '50%', 'About 92%', '100%'],
          answer: 2,
          working: '22 ÷ 24 = 0.917, so the ring is about 92% gold.',
        },
      ],
      lines: [
        { say: 'Your turn. A ring is stamped twenty two carat. About what percentage of it is gold? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Twenty two divided by twenty four is about zero point nine two, so the ring is about ninety two percent gold: choice C.', show: 'q2.answer' },
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
          items: ['Choose a metal by the **property** the job needs', 'Carats: parts of gold out of **24**', 'Alloys are harder: layers **cannot slide**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A metal is chosen for the property its job needs most.', show: 'sum.0' },
        { say: 'Carats count the parts of gold out of twenty four.', show: 'sum.1' },
        { say: 'And alloys are harder because atoms of a different size stop the layers sliding. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
