import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import atmosphere from '@/content/chemmore/videos/cx-4-1.ts';

// Exam question for More Chemistry Topics lesson 4.1 (the Earth's atmosphere): the make-up of dry
// air today, how oxygen built up, and one way carbon dioxide was removed from the early
// atmosphere. Written by Gradileo in the style of a GCSE chemistry exam.
//
// The picture is the lesson's air molecules moving and mixing (src/video/particles.ts).

const QUESTION = 'This question is about the Earth\'s atmosphere. (a) Give the approximate percentages of nitrogen and of oxygen in dry air today. (b) Scientists think the Earth\'s early atmosphere was mostly carbon dioxide, with little or no oxygen. Explain how the amount of oxygen increased. (c) Give one way in which carbon dioxide was removed from the early atmosphere.';

const video: Explainer = {
  id: 'xq-cx-4-1',
  lessonId: '',
  exam: {
    lesson: 'cx-4-1',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Today\'s Air and Where the Oxygen Came From. The Earth\'s Atmosphere',
  thumbnailTitle: 'Where Did the Air Come From?',
  thumbnail: 'air',
  summary:
    'A test-style question, solved one small step at a time: what is dry air made of today, how did oxygen build up, and where did the early carbon dioxide go? Dry air is about 78% nitrogen and 21% oxygen, algae and plants made oxygen by photosynthesis, and carbon dioxide was locked away in sedimentary rocks and fossil fuels or dissolved in the oceans.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Where Did the Air Come From?', subtitle: 'Then and now' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the Earth\'s atmosphere. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '78% and 21%; photosynthesis; sedimentary rocks, fossil fuels or oceans' }],
      lines: [
        { say: 'Here is the question. This question is about the Earth\'s atmosphere. Part a: give the approximate percentages of nitrogen and of oxygen in dry air today. Part b: scientists think the Earth\'s early atmosphere was mostly carbon dioxide, with little or no oxygen. Explain how the amount of oxygen increased. Part c: give one way in which carbon dioxide was removed from the early atmosphere.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Describe the air **today**, then explain how it changed from the **early** atmosphere' }],
      lines: [
        { say: 'We need the make-up of the air we breathe now, and the story of how an atmosphere of carbon dioxide became one full of oxygen.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(atmosphere, 'air')],
      lines: [
        { say: 'Here is what we need. This is air up close. About four in every five molecules are nitrogen, about one in five are oxygen, and a few are argon atoms.', show: ['air', 'air.labels', 'air.key'] },
        { say: 'They move fast and in every direction, mixing evenly, which is why the air has the same make-up almost everywhere.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Today: mostly **nitrogen** and **oxygen**', 'Oxygen came from **photosynthesis**', 'Carbon dioxide was **locked away** or **dissolved**'] }],
      lines: [
        { say: 'Here is the plan. Today\'s air is mostly nitrogen and oxygen.', show: 'plan.0' },
        { say: 'The oxygen was made by living things, through photosynthesis.', show: 'plan.1' },
        { say: 'And the carbon dioxide was locked away in rocks and fuels, or dissolved in the oceans.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Air today',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Gas', 'In dry air', 'Roughly'],
          rows: [
            ['nitrogen', '**78%**', '4 in 5'],
            ['oxygen', '**21%**', '1 in 5'],
            ['argon', 'about 1%', 'a few'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Nitrogen makes up about 78 percent of dry air, about four molecules in every five.', caption: 'Step one. Nitrogen makes up about 78% of dry air, about four molecules in every five.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Oxygen makes up about 21 percent, about one in five. That is part a.', caption: 'Oxygen makes up about 21%, about one in five. That is part a.', show: 't.1', focus: 't.1' },
        { say: 'Almost all of the rest is argon, with a small amount of carbon dioxide.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 2: Where the oxygen came from',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{6CO2 + 6H2O -> C6H12O6 + 6O2}', '\\text{algae and plants} \\Rightarrow \\good{\\text{more oxygen}}'] }],
      lines: [
        { say: 'Step two. Algae, and later plants, used photosynthesis. They took in carbon dioxide and water, and made glucose and oxygen.', show: 'm.0' },
        { say: 'Over billions of years, photosynthesis added oxygen to the air while taking carbon dioxide out. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Where the carbon dioxide went',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['**Dissolved** in the oceans', 'Locked in **sedimentary rocks**, such as limestone', 'Locked in **fossil fuels**: coal, oil and gas'] }],
      lines: [
        { say: 'Step three. A lot of the carbon dioxide dissolved in the oceans.', show: 's.0' },
        { say: 'Some became the shells of sea creatures, which built up into sedimentary rocks such as limestone.', show: 's.1' },
        { say: 'And the carbon in plants and animals that were buried became fossil fuels. Any one of these answers part c.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) About **78% nitrogen** and **21% oxygen**. (b) Algae and plants made oxygen by **photosynthesis**. (c) It was locked in **sedimentary rocks** or **fossil fuels**, or **dissolved in the oceans**.' },
      ],
      lines: [
        { say: 'Does it make sense? 78 and 21 add up to 99, and argon takes up almost all of the last one percent.', caption: 'Does it make sense? 78% and 21% add up to 99%, and argon takes up almost all of the last 1%.', show: 'ans' },
        { say: 'So the air is about four fifths nitrogen and one fifth oxygen, photosynthesis made the oxygen, and the carbon dioxide went into rocks, fuels and oceans.' },
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
            ['**78% oxygen**', 'Swapped nitrogen and oxygen'],
            ['Oxygen came from **volcanoes**', 'Volcanoes gave **carbon dioxide**'],
            ['Plants **breathed in** oxygen', 'Photosynthesis **gives out** oxygen'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Nitrogen is the big one, at 78 percent. Oxygen is only about a fifth.', caption: 'Nitrogen is the big one, at 78%. Oxygen is only about a fifth.', focus: 'traps.0' },
        { say: 'Volcanoes released carbon dioxide and water vapour, but no oxygen.', focus: 'traps.1' },
        { say: 'And photosynthesis takes in carbon dioxide and gives out oxygen.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which gas makes up nearly 1% of dry air today?',
          choices: ['argon', 'carbon dioxide', 'hydrogen', 'neon'],
          answer: 0,
          working: 'Argon is about 0.9% of dry air. Carbon dioxide is only about 0.04%.',
        },
      ],
      lines: [
        { say: 'Your turn. Which gas makes up nearly 1 percent of dry air today? Pause the video and try it.', caption: 'Your turn. Which gas makes up nearly 1% of dry air today? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'It is argon: choice A. Carbon dioxide is only about four hundredths of a percent.', show: 'q2.answer' },
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
          items: ['Dry air: about **78%** nitrogen, **21%** oxygen', '**Photosynthesis** added the oxygen', 'CO₂ went into **rocks**, **fossil fuels** and **oceans**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Dry air is about 78 percent nitrogen and 21 percent oxygen.', caption: 'Here is what to remember. Dry air is about 78% nitrogen and 21% oxygen.', show: 'sum.0' },
        { say: 'Photosynthesis by algae and plants added the oxygen.', show: 'sum.1' },
        { say: 'And the early carbon dioxide went into rocks, fossil fuels and the oceans. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
