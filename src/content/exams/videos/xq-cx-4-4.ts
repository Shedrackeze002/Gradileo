import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import lca from '@/content/chemmore/videos/cx-4-4.ts';

// Exam question for More Chemistry Topics lesson 4.4 (life cycle assessments and recycling): the
// four stages of a life cycle assessment, comparing two bags by energy per use, and why recycling
// aluminium saves energy. Written by Gradileo in the style of a GCSE chemistry exam.
//
// The picture is the lesson's scrap aluminium melted and cast into a new shape
// (src/video/particles.ts).

const QUESTION = 'A shop compares two shopping bags. Making bag A takes 2.4 MJ of energy, and it is used 3 times. Making bag B takes 6.0 MJ of energy, and it is used 20 times. (a) Name the four stages of a life cycle assessment. (b) Calculate the energy used per use for each bag, and say which bag uses less energy per use. (c) Recycling aluminium cans uses much less energy than extracting aluminium from its ore. Suggest why.';

const video: Explainer = {
  id: 'xq-cx-4-4',
  lessonId: '',
  exam: {
    lesson: 'cx-4-4',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Two Shopping Bags and a Recycled Can. Life Cycle Assessments',
  thumbnailTitle: 'Which Bag Is Better?',
  thumbnail: 'rm',
  summary:
    'A test-style question, solved one small step at a time: what are the four stages of a life cycle assessment, which of two bags uses less energy per use, and why does recycling aluminium save energy? The stages are raw materials, manufacture, use and disposal; bag A uses 0.8 MJ per use and bag B 0.3 MJ, so B uses less; and recycled aluminium only needs melting, with no mining or electrolysis.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Bag Is Better?', subtitle: 'Life cycles and recycling' }],
      lines: [
        { say: 'In this video, we solve a test-style question about life cycle assessments. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Raw materials, manufacture, use, disposal; A 0.8 MJ, B 0.3 MJ, so B; it only needs melting' }],
      lines: [
        { say: 'Here is the question. A shop compares two shopping bags. Making bag A takes 2.4 megajoules of energy, and it is used 3 times. Making bag B takes 6.0 megajoules of energy, and it is used 20 times. Part a: name the four stages of a life cycle assessment. Part b: calculate the energy used per use for each bag, and say which bag uses less energy per use. Part c: recycling aluminium cans uses much less energy than extracting aluminium from its ore. Suggest why.', caption: 'Here is the question. A shop compares two shopping bags. Making bag A takes 2.4 MJ of energy, and it is used 3 times. Making bag B takes 6.0 MJ of energy, and it is used 20 times. Part a: name the four stages of a life cycle assessment. Part b: calculate the energy used per use for each bag, and say which bag uses less energy per use. Part c: recycling aluminium cans uses much less energy than extracting aluminium from its ore. Suggest why.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Follow a product from **start to finish**, and compare products **per use**' }],
      lines: [
        { say: 'A life cycle assessment follows a product from start to finish. To compare a product used once with one used many times, we share its energy out over every use.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(lca, 'rm')],
      lines: [
        { say: 'Here is what we need. This is a metal being recycled, up close: scrap aluminium, its atoms held in place.', show: ['rm', 'rm.labels', 'rm.thermo'] },
        { say: 'Heat it, and the atoms move fast enough to slide past one another: the metal melts.', play: 'rm.melt' },
        { say: 'Pour it into a mould and let it cool, and the atoms lock together again in a new shape. No ore is mined, and far less energy is used.', play: 'rm.cast' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Four stages: **raw materials**, **manufacture**, **use**, **disposal**', 'Energy per use = energy ÷ **number of uses**', 'Recycling **skips** the early stages'] }],
      lines: [
        { say: 'Here is the plan. A life cycle assessment has four stages: raw materials, manufacture, use and disposal.', show: 'plan.0' },
        { say: 'To compare products used different numbers of times, divide the energy by the number of uses.', show: 'plan.1' },
        { say: 'And recycling lets us skip the early stages for a new product.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The four stages',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Stage', 'For a bag'],
          rows: [
            ['**raw materials**', 'getting the wood or the crude oil'],
            ['**manufacture**', 'making the paper or plastic, and the bag'],
            ['**use**', 'carrying shopping'],
            ['**disposal**', 'landfill, burning or recycling'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. First, getting the raw materials, such as wood or crude oil.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Then manufacturing the material and the product.', show: 't.1', focus: 't.1' },
        { say: 'Then using the product.', show: 't.2', focus: 't.2' },
        { say: 'And finally disposing of it, in landfill, by burning or by recycling. Those four stages are part a.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Step 2: Energy per use',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{A: } 2.4 \\div 3 = 0.8\\ \\text{MJ per use}', '\\text{B: } 6.0 \\div 20 = 0.3\\ \\text{MJ per use}', '\\Rightarrow \\good{\\text{B uses less}}'] }],
      lines: [
        { say: 'Step two. Bag A takes 2.4 megajoules and is used 3 times. 2.4 divided by 3 is 0.8 megajoules per use.', caption: 'Step two. Bag A takes 2.4 MJ and is used 3 times. 2.4 ÷ 3 = 0.8 MJ per use.', show: 'm.0' },
        { say: 'Bag B takes 6.0 megajoules and is used 20 times. 6.0 divided by 20 is 0.3 megajoules per use.', caption: 'Bag B takes 6.0 MJ and is used 20 times. 6.0 ÷ 20 = 0.3 MJ per use.', show: 'm.1' },
        { say: 'So although bag B takes more energy to make, it uses less energy per use. That is part b.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Recycling aluminium',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['No **mining** or purifying the ore', 'No **electrolysis**, which needs huge amounts of electricity', 'The cans only need **melting** and recasting'] }],
      lines: [
        { say: 'Step three. Recycled aluminium does not need to be mined or purified.', show: 's.0' },
        { say: 'Most importantly, aluminium is extracted by electrolysis, which uses a huge amount of electricity. Recycling skips that.', show: 's.1' },
        { say: 'The cans only need to be melted and cast again, just as we saw. That is part c.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Raw materials, manufacture, use, disposal**. (b) A: **0.8 MJ** per use; B: **0.3 MJ** per use, so **B** uses less. (c) It only needs **melting**, with no mining or **electrolysis**.' },
      ],
      lines: [
        { say: 'Does it make sense? Bag B costs two and a half times as much energy to make, but it lasts almost seven times as many trips, so it should win per use.', show: 'ans' },
        { say: 'So the four stages are raw materials, manufacture, use and disposal, bag B uses less energy per use, and recycling aluminium skips the electrolysis.' },
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
            ['Bag **A**, it takes less energy', 'Forgot to divide by the **uses**'],
            ['**7.2** and **120** MJ', '**Multiplied** instead of dividing'],
            ['Leaving out **use** or **disposal**', 'The life cycle runs to the **end**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Bag A takes less energy to make, but it is used far fewer times. We must compare per use.', focus: 'traps.0' },
        { say: 'Energy per use means sharing the energy out, so we divide by the number of uses.', focus: 'traps.1' },
        { say: 'And a life cycle assessment covers the product\'s whole life, including how it is used and thrown away.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A glass bottle takes 4 MJ to make and is used 8 times. What is its energy per use?',
          choices: ['32 MJ', '2 MJ', '4 MJ', '0.5 MJ'],
          answer: 3,
          working: '4 MJ ÷ 8 uses = 0.5 MJ per use.',
        },
      ],
      lines: [
        { say: 'Your turn. A glass bottle takes 4 megajoules to make and is used 8 times. What is its energy per use? Pause the video and try it.', caption: 'Your turn. A glass bottle takes 4 MJ to make and is used 8 times. What is its energy per use? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '4 divided by 8 is 0.5 megajoules per use: choice D.', caption: '4 ÷ 8 = 0.5 MJ per use: choice D.', show: 'q2.answer' },
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
          items: ['Raw materials, manufacture, **use**, **disposal**', 'Compare products **per use**', 'Recycling metals skips **mining** and **extraction**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A life cycle assessment covers raw materials, manufacture, use and disposal.', show: 'sum.0' },
        { say: 'Compare products that are used many times per use.', show: 'sum.1' },
        { say: 'And recycling a metal skips mining and extraction, saving energy. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
