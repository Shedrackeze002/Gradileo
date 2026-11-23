import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import haber from '@/content/chemmore/videos/cx-6-2.ts';

// Exam question for More Chemistry Topics lesson 6.2 (the Haber process and fertilisers): the raw
// materials, why a lower temperature is not used, and why a high pressure raises the yield. Written
// by Gradileo in the style of a GCSE chemistry exam.
//
// The picture is the lesson's nitrogen and hydrogen molecules breaking and making bonds
// (src/video/molecules.ts).

const QUESTION = 'Ammonia is made by the Haber process: N₂ + 3H₂ ⇌ 2NH₃. The forward reaction is exothermic. The process uses an iron catalyst, a temperature of about 450 °C and a pressure of about 200 atmospheres. (a) Give the source of the nitrogen and of the hydrogen. (b) A lower temperature would give a higher yield of ammonia. Explain why a lower temperature is not used. (c) Explain why a high pressure increases the yield of ammonia.';

const video: Explainer = {
  id: 'xq-cx-6-2',
  lessonId: '',
  exam: {
    lesson: 'cx-6-2',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Air, Natural Gas, 450 °C and 200 Atmospheres. The Haber Process',
  thumbnailTitle: 'Making Ammonia',
  thumbnail: 'hb',
  summary:
    'A test-style question, solved one small step at a time: where do the nitrogen and hydrogen come from, why is a lower temperature not used, and why does a high pressure raise the yield? Nitrogen comes from the air and hydrogen from natural gas, a lower temperature would make the reaction too slow, and a high pressure favours the side with fewer gas molecules, 2 instead of 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Making Ammonia', subtitle: 'The Haber process' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the Haber process. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Air and natural gas; too slow; fewer gas molecules on the right' }],
      lines: [
        { say: 'Here is the question. Ammonia is made by the Haber process. Nitrogen and three hydrogen molecules react reversibly to make two ammonia molecules. The forward reaction is exothermic. The process uses an iron catalyst, a temperature of about 450 degrees Celsius and a pressure of about 200 atmospheres. Part a: give the source of the nitrogen and of the hydrogen. Part b: a lower temperature would give a higher yield of ammonia. Explain why a lower temperature is not used. Part c: explain why a high pressure increases the yield of ammonia.', caption: 'Here is the question. Ammonia is made by the Haber process: N₂ + 3H₂ ⇌ 2NH₃. The forward reaction is exothermic. The process uses an iron catalyst, a temperature of about 450 °C and a pressure of about 200 atmospheres. Part a: give the source of the nitrogen and of the hydrogen. Part b: a lower temperature would give a higher yield of ammonia. Explain why a lower temperature is not used. Part c: explain why a high pressure increases the yield of ammonia.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Explain the conditions as a **compromise** between **yield** and **rate**' }],
      lines: [
        { say: 'The Haber conditions balance two things: how much ammonia we get, the yield, and how fast we get it, the rate.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(haber, 'hb')],
      lines: [
        { say: 'Here is what we need. This is the Haber reaction up close: one nitrogen molecule and three hydrogen molecules. Watch the bonds that break, in red, and the bonds that form, in green.', show: 'hb', play: 'hb.go' },
        { say: 'The triple bond in nitrogen is very strong, which is why a catalyst and a high temperature are needed to break it. Four gas molecules go in, and only two ammonia molecules come out.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Nitrogen from the **air**; hydrogen from **natural gas**', 'Lower temperature: more yield but **slower**', 'Higher pressure favours **fewer gas molecules**'] }],
      lines: [
        { say: 'Here is the plan. The nitrogen comes from the air, and the hydrogen from natural gas.', show: 'plan.0' },
        { say: 'A lower temperature gives more ammonia, but makes the reaction slower.', show: 'plan.1' },
        { say: 'And a higher pressure favours the side with fewer gas molecules.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The raw materials',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Reactant', 'Source'],
          rows: [
            ['nitrogen, N₂', 'the **air**, which is 78% nitrogen'],
            ['hydrogen, H₂', '**natural gas** (methane), reacted with steam'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. The nitrogen comes from the air, which is about 78 percent nitrogen.', caption: 'Step one. The nitrogen comes from the air, which is about 78% nitrogen.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'The hydrogen comes from natural gas, methane, reacted with steam. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: Why not a lower temperature?',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Forward reaction is **exothermic**, so cooler means **more** ammonia', 'But cooler molecules collide **less often and less hard**', 'The reaction would be **too slow**: 450 °C is a **compromise**'] }],
      lines: [
        { say: 'Step two. The forward reaction gives out heat, so a lower temperature would shift the equilibrium towards ammonia.', show: 's.0' },
        { say: 'But at a lower temperature the molecules move more slowly, so they collide less often and with less energy.', show: 's.1' },
        { say: 'The reaction would be far too slow, so 450 degrees is a compromise between a good yield and a fast enough rate. That is part b.', caption: 'The reaction would be far too slow, so 450 °C is a compromise between a good yield and a fast enough rate. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: Why a high pressure?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{N2 + 3H2 <=> 2NH3}', '4 \\text{ gas molecules} \\rightarrow 2 \\text{ gas molecules}', '\\text{high pressure} \\Rightarrow \\good{\\text{shifts right}}'] }],
      lines: [
        { say: 'Step three. Look at the equation.', show: 'm.0' },
        { say: 'Four gas molecules on the left make only two on the right.', show: 'm.1' },
        { say: 'A high pressure shifts the equilibrium towards the side with fewer gas molecules, which is the ammonia side, so the yield goes up. That is part c.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Nitrogen from the **air**; hydrogen from **natural gas**. (b) The reaction would be **too slow**. (c) There are **fewer gas molecules** on the right, so high pressure **shifts the equilibrium** towards ammonia.' },
      ],
      lines: [
        { say: 'Does it make sense? Even higher pressures would give more ammonia, but they need costly, strong equipment, so 200 atmospheres is a compromise too.', show: 'ans' },
        { say: 'So the raw materials are air and natural gas, a lower temperature is too slow, and a high pressure favours the side with fewer gas molecules.' },
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
            ['Hydrogen from **water**', 'It comes from **natural gas**'],
            ['A lower temperature gives **less** ammonia', 'It gives **more**, just slowly'],
            ['Pressure speeds up the **catalyst**', 'It shifts the **equilibrium**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Steam is used, but the main source of the hydrogen is natural gas.', focus: 'traps.0' },
        { say: 'The question tells us a lower temperature would give more ammonia. The problem is the rate.', focus: 'traps.1' },
        { say: 'And the pressure raises the yield by shifting the equilibrium. It does not change the catalyst.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In an NPK fertiliser, which element does the K stand for?',
          choices: ['krypton', 'potassium', 'calcium', 'carbon'],
          answer: 1,
          working: 'N is nitrogen, P is phosphorus and K is potassium, from its Latin name, kalium.',
        },
      ],
      lines: [
        { say: 'Your turn. In an N P K fertiliser, which element does the K stand for? Pause the video and try it.', caption: 'Your turn. In an NPK fertiliser, which element does the K stand for? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'N is nitrogen, P is phosphorus, and K is potassium, from its Latin name: choice B.', show: 'q2.answer' },
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
          items: ['N₂ from **air**, H₂ from **natural gas**', '450 °C: a **compromise** between yield and rate', 'High pressure: **fewer gas molecules**, more ammonia'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Nitrogen comes from the air and hydrogen from natural gas.', show: 'sum.0' },
        { say: '450 degrees is a compromise between yield and rate.', caption: '450 °C is a compromise between yield and rate.', show: 'sum.1' },
        { say: 'And a high pressure favours the side with fewer gas molecules, the ammonia. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
