import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import pollution from '@/content/chemmore/videos/cx-4-2.ts';

// Exam question for More Chemistry Topics lesson 4.2 (greenhouse gases and air pollution): the gas
// from sulfur in petrol and the problem it causes, why carbon monoxide is dangerous, and how
// greenhouse gases keep the Earth warm. Written by Gradileo in the style of a GCSE chemistry exam.
//
// The picture is the lesson's sulfur atom burning to sulfur dioxide and turning into acid rain
// (src/video/reactions.ts).

const QUESTION = 'Petrol is a fuel that contains small amounts of sulfur. (a) Name the gas formed when the sulfur burns, and give one environmental problem it causes. (b) When there is not enough oxygen, burning petrol can make carbon monoxide. Why is carbon monoxide dangerous? (c) Carbon dioxide and methane are greenhouse gases. Explain how greenhouse gases keep the Earth warm.';

const video: Explainer = {
  id: 'xq-cx-4-2',
  lessonId: '',
  exam: {
    lesson: 'cx-4-2',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Sulfur in Petrol, Carbon Monoxide and the Greenhouse Effect. Air Pollution',
  thumbnailTitle: 'What Comes Out of the Exhaust?',
  thumbnail: 'sa',
  summary:
    'A test-style question, solved one small step at a time: what forms when sulfur in petrol burns, why is carbon monoxide dangerous, and how do greenhouse gases keep the Earth warm? Sulfur burns to sulfur dioxide, which causes acid rain; carbon monoxide is toxic because it stops the blood carrying oxygen; and greenhouse gases absorb heat radiated by the Earth and send it back.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Comes Out of the Exhaust?', subtitle: 'Pollutants and greenhouse gases' }],
      lines: [
        { say: 'In this video, we solve a test-style question about air pollution and greenhouse gases. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Sulfur dioxide, acid rain; it stops blood carrying oxygen; they absorb heat from the Earth' }],
      lines: [
        { say: 'Here is the question. Petrol is a fuel that contains small amounts of sulfur. Part a: name the gas formed when the sulfur burns, and give one environmental problem it causes. Part b: when there is not enough oxygen, burning petrol can make carbon monoxide. Why is carbon monoxide dangerous? Part c: carbon dioxide and methane are greenhouse gases. Explain how greenhouse gases keep the Earth warm.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Follow what burning a fuel **adds to the air**, and what each gas **does**' }],
      lines: [
        { say: 'Burning a fuel adds several gases to the air. For each one, we need to say what it is and the harm it does.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(pollution, 'sa')],
      lines: [
        { say: 'Here is what we need. This is how sulfur in a fuel becomes acid rain.', show: 'sa' },
        { say: 'The sulfur atom burns in oxygen to sulfur dioxide, a gas that leaves with the exhaust.', play: 'sa.burn' },
        { say: 'In the air, sulfur dioxide reacts with water to form sulfurous acid, H two S O three, which falls as acid rain.', caption: 'In the air, sulfur dioxide reacts with water to form sulfurous acid, H₂SO₃, which falls as acid rain.', play: 'sa.rain' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'plan',
          head: ['Pollutant', 'Comes from', 'Problem'],
          rows: [
            ['sulfur dioxide', '**sulfur** in the fuel', 'acid rain'],
            ['carbon monoxide', '**too little oxygen**', 'toxic'],
            ['carbon dioxide', 'burning **carbon**', 'climate change'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the plan. Sulfur dioxide comes from sulfur in the fuel, and causes acid rain.', show: ['plan', 'plan.0'], focus: 'plan.0' },
        { say: 'Carbon monoxide comes from burning with too little oxygen, and it is toxic.', show: 'plan.1', focus: 'plan.1' },
        { say: 'And carbon dioxide is a greenhouse gas, adding to climate change.', show: 'plan.2', focus: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Sulfur dioxide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{S + O2 -> SO2}', '\\ce{SO2} + \\text{water} \\Rightarrow \\good{\\text{acid rain}}'] }],
      lines: [
        { say: 'Step one. Sulfur burns in oxygen to make sulfur dioxide.', show: 'm.0' },
        { say: 'As we saw, sulfur dioxide dissolves in water in the clouds, and falls as acid rain, which damages buildings, trees and life in lakes. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Carbon monoxide',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Forms in **incomplete combustion**', '**Colourless** and **odourless**, so hard to detect', 'Joins to the blood and stops it **carrying oxygen**'] }],
      lines: [
        { say: 'Step two. Carbon monoxide forms when there is not enough oxygen for the carbon to burn completely.', show: 's.0' },
        { say: 'It has no colour and no smell, so we cannot tell it is there.', show: 's.1' },
        { say: 'It joins to the red blood cells in place of oxygen, so the blood carries less oxygen around the body. That is why it is toxic, and that is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: The greenhouse effect',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'g',
          head: ['Stage', 'What happens'],
          rows: [
            ['1', 'sunlight **warms** the Earth\'s surface'],
            ['2', 'the Earth gives off **heat**, as infrared'],
            ['3', 'greenhouse gases **absorb** it and send some **back**'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. Sunlight passes through the atmosphere and warms the Earth\'s surface.', show: ['g', 'g.0'], focus: 'g.0' },
        { say: 'The warm surface gives off heat, as infrared radiation.', show: 'g.1', focus: 'g.1' },
        { say: 'Greenhouse gases absorb that heat and send some of it back towards the Earth, so it does not all escape into space. That keeps the Earth warm, and that is part c.', show: 'g.2', focus: 'g.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Sulfur dioxide**; it causes **acid rain**. (b) It is **toxic**: it stops the blood **carrying oxygen**, and it has no colour or smell. (c) They **absorb heat** given off by the Earth and send some **back**.' },
      ],
      lines: [
        { say: 'Does it make sense? Each pollutant comes from something in the fuel or the conditions, and each causes its own kind of harm.', show: 'ans' },
        { say: 'So sulfur makes sulfur dioxide and acid rain, carbon monoxide starves the body of oxygen, and greenhouse gases trap heat.' },
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
            ['SO₂ causes **global warming**', 'Its problem is **acid rain**'],
            ['CO is a **greenhouse gas**', 'Its danger is that it is **toxic**'],
            ['They **block sunlight**', 'They trap heat **leaving** the Earth'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Sulfur dioxide is the gas behind acid rain.', focus: 'traps.0' },
        { say: 'Carbon monoxide is dangerous because it is toxic. Mixing it up with carbon dioxide is a common slip.', focus: 'traps.1' },
        { say: 'And greenhouse gases let sunlight in. What they absorb is the heat on its way back out.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which pollutant forms when nitrogen and oxygen from the air react in a hot engine?',
          choices: ['carbon monoxide', 'oxides of nitrogen', 'sulfur dioxide', 'soot'],
          answer: 1,
          working: 'The high temperature lets nitrogen and oxygen from the air react, making oxides of nitrogen.',
        },
      ],
      lines: [
        { say: 'Your turn. Which pollutant forms when nitrogen and oxygen from the air react in a hot engine? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The heat of the engine lets nitrogen and oxygen react, making oxides of nitrogen: choice B.', show: 'q2.answer' },
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
          items: ['Sulfur in fuel → **sulfur dioxide** → acid rain', 'Too little oxygen → **carbon monoxide**, which is toxic', 'Greenhouse gases **absorb heat** from the Earth'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Sulfur in a fuel burns to sulfur dioxide, which causes acid rain.', show: 'sum.0' },
        { say: 'Burning with too little oxygen makes carbon monoxide, which is toxic.', show: 'sum.1' },
        { say: 'And greenhouse gases absorb the heat the Earth gives off. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
