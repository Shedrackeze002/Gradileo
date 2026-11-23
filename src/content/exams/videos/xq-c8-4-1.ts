import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import burning from '@/content/chem8/videos/c8-4-1.ts';

// Exam question for Chemistry 8 lesson 4.1 (burning): the products of burning propane and the
// limewater test, carbon monoxide from a gas heater with poor air flow, and why a fire blanket puts
// out a burning pan. Written by Gradileo in the style of a Grade 8 science unit test.
//
// The pictures are the lesson's carbon burning in oxygen and its three lumps of carbon for the fire
// triangle (src/video/particles.ts).

const QUESTION = 'Answer these questions about burning. (a) Propane, the fuel in many camping stoves, is made of carbon and hydrogen only. Name the two products when propane burns in plenty of oxygen, and describe a test for one of them. (b) A gas heater in a room with poor air flow can make a poisonous gas. Name the gas and explain why it forms. (c) A pan of oil catches fire, and a fire blanket is put over it. Use the fire triangle to explain why the fire goes out.';

const video: Explainer = {
  id: 'xq-c8-4-1',
  lessonId: '',
  exam: {
    lesson: 'c8-4-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Propane, Carbon Monoxide and a Fire Blanket. Burning',
  thumbnailTitle: 'Fuels, Fumes and Fire Blankets',
  thumbnail: 'c',
  summary:
    'A test-style question, solved one small step at a time: what does propane make when it burns, why can a gas heater make a poisonous gas, and why does a fire blanket put out a burning pan? Propane burns to carbon dioxide and water, and carbon dioxide turns limewater cloudy. With too little oxygen the heater makes carbon monoxide, and the blanket cuts off the oxygen side of the fire triangle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Fuels, Fumes and Fire Blankets', subtitle: 'Burning and the fire triangle' }],
      lines: [
        { say: 'In this video, we solve a test-style question about burning. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade eight science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 8 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Carbon dioxide and water, limewater; carbon monoxide; no oxygen' }],
      lines: [
        { say: 'Here is the question. Part a: propane, the fuel in many camping stoves, is made of carbon and hydrogen only. Name the two products when propane burns in plenty of oxygen, and describe a test for one of them. Part b: a gas heater in a room with poor air flow can make a poisonous gas. Name the gas and explain why it forms. Part c: a pan of oil catches fire, and a fire blanket is put over it. Use the fire triangle to explain why the fire goes out.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'What does a fuel make with **plenty** of oxygen, with **too little**, and with **none**?' }],
      lines: [
        { say: 'All three parts are about how much oxygen a fire gets: plenty in the stove, too little in the stuffy room, and none under the blanket.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(burning, 'c')],
      lines: [
        { say: 'Here is what we need. This is a lump of carbon, in purple, with oxygen molecules, in red, all around it.', show: ['c', 'c.labels', 'c.thermo'] },
        { say: 'Watch as we heat it. Each carbon atom joins with two oxygen atoms and leaves as carbon dioxide. The reaction gives out heat, which keeps the fire going.', play: 'c.light', show: 'c.tally' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Plenty of oxygen: **carbon dioxide** + **water**', 'Too little oxygen: poisonous **carbon monoxide**', 'Fire needs **fuel**, **heat** and **oxygen**'] }],
      lines: [
        { say: 'Here is the plan. A fuel of carbon and hydrogen, in plenty of oxygen, makes carbon dioxide and water.', show: 'plan.0' },
        { say: 'With too little oxygen, it makes poisonous carbon monoxide.', show: 'plan.1' },
        { say: 'And a fire needs fuel, heat and oxygen all at once.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Propane burning',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{propane} + \\text{oxygen} \\rightarrow \\good{\\text{carbon dioxide}} + \\good{\\text{water}}', '\\text{carbon dioxide turns limewater } \\good{\\text{cloudy}}'] }],
      lines: [
        { say: 'Step one. The carbon in propane becomes carbon dioxide, and the hydrogen becomes water.', show: 'm.0' },
        { say: 'To test for carbon dioxide, bubble the gas through limewater. If the limewater turns cloudy, the gas is carbon dioxide. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The poisonous gas',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'co', items: ['Poor air flow: **too little oxygen** reaches the flame', 'The fuel burns **incompletely**', 'It makes **carbon monoxide**: no colour, no smell'] }],
      lines: [
        { say: 'Step two. In a room with poor air flow, the flame uses up the oxygen and too little reaches it.', show: 'co.0' },
        { say: 'Without enough oxygen, the fuel cannot burn completely.', show: 'co.1' },
        { say: 'So some carbon becomes carbon monoxide instead of carbon dioxide. It is poisonous, with no colour or smell, which makes it so dangerous. That is part b.', show: 'co.2', focus: 'co.2' },
      ],
    },
    {
      chapter: 'Step 3: The fire blanket',
      layout: 'center',
      main: [pick(burning, 'ft')],
      lines: [
        { say: 'Step three. Here are three lumps of carbon. The first has oxygen but is not heated. The second is heated, but has no oxygen. The third has both.', show: ['ft', 'ft.labels', 'ft.thermo', 'ft.tally'], play: 'ft.light' },
        { say: 'Only the third burns, because only it has fuel, heat and oxygen together. The fire blanket makes the pan like the middle lump: still hot, still full of fuel, but with the oxygen cut off. So the fire goes out. That is part c.', focus: 'ft.all' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Carbon dioxide** and **water**; carbon dioxide turns **limewater cloudy**. (b) **Carbon monoxide**: too little oxygen, so the fuel burns incompletely. (c) The blanket **cuts off the oxygen**, one side of the fire triangle.' },
      ],
      lines: [
        { say: 'Does it make sense? The more oxygen a fire gets, the more completely it burns, and with no oxygen at all, it cannot burn.', show: 'ans' },
        { say: 'So propane makes carbon dioxide and water, the stuffy room gives carbon monoxide, and the blanket starves the fire of oxygen.' },
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
            ['Products: **carbon** + **hydrogen**', 'Named the **elements**, not the products'],
            ['The poisonous gas is **carbon dioxide**', 'Mixed up the **mon**oxide and the **di**oxide'],
            ['The blanket **cools** the oil', 'It works by keeping **air** out'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Carbon and hydrogen are what the fuel is made of. The products are new substances: carbon dioxide and water.', focus: 'traps.0' },
        { say: 'Monoxide has one oxygen atom and dioxide has two. With too little oxygen, the carbon gets only one, so it is carbon monoxide.', focus: 'traps.1' },
        { say: 'And the blanket does not cool the oil much at all. It works by keeping the air out.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A glass jar is put over a lit candle, and the flame goes out after a few seconds. Which side of the fire triangle ran out?',
          choices: ['Oxygen', 'Fuel', 'Heat', 'Carbon dioxide'],
          answer: 0,
          working: 'The candle still has wax and is still hot, but the flame used up the oxygen in the jar.',
        },
      ],
      lines: [
        { say: 'Your turn. A glass jar is put over a lit candle, and the flame goes out after a few seconds. Which side of the fire triangle ran out? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The candle still has wax and is still hot, but the flame used up the oxygen in the jar: choice A.', show: 'q2.answer' },
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
          items: ['Fuel + oxygen → **carbon dioxide** + **water**', 'Too little oxygen → poisonous **carbon monoxide**', 'Remove **fuel**, **heat** or **oxygen** to put a fire out'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A fuel of carbon and hydrogen burns in plenty of oxygen to make carbon dioxide and water.', show: 'sum.0' },
        { say: 'With too little oxygen, it makes poisonous carbon monoxide.', show: 'sum.1' },
        { say: 'And taking away fuel, heat or oxygen puts a fire out. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
