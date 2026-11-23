import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import ores from '@/content/chemmore/videos/cx-1-2.ts';

// Exam question for More Chemistry Topics lesson 1.2 (extracting metals from their ores): why iron
// is extracted with carbon and aluminium by electrolysis, what kind of reaction takes the oxygen
// away, and the greatest mass of iron in 320 tonnes of iron(III) oxide. Written by Gradileo in the
// style of a GCSE chemistry exam.
//
// The picture is the lesson's iron and copper displacement: a more reactive element taking a less
// reactive one out of its compound (src/video/particles.ts).

const QUESTION = 'Iron is extracted by heating iron(III) oxide, Fe₂O₃, with carbon. Aluminium is extracted from aluminium oxide by electrolysis. (a) Use the reactivity series to explain why iron can be extracted with carbon but aluminium cannot. (b) In the extraction, iron(III) oxide loses oxygen. What type of reaction is this? (c) Calculate the greatest mass of iron that can be extracted from 320 tonnes of iron(III) oxide. Relative atomic masses: Fe = 56, O = 16.';

const video: Explainer = {
  id: 'xq-cx-1-2',
  lessonId: '',
  exam: {
    lesson: 'cx-1-2',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Iron, Aluminium and 320 Tonnes of Ore. Extracting Metals',
  thumbnailTitle: 'Iron from Its Ore',
  thumbnail: 'dp',
  summary:
    'A test-style question, solved one small step at a time: why can carbon extract iron but not aluminium, what is the reaction called, and how much iron is in 320 tonnes of iron(III) oxide? Iron is less reactive than carbon and aluminium is more reactive, removing oxygen is reduction, and the ore holds 224 tonnes of iron.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Iron from Its Ore', subtitle: 'Carbon, electrolysis and a mass' }],
      lines: [
        { say: 'In this video, we solve a test-style question about extracting metals. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Carbon is above iron but below aluminium; reduction; 224 tonnes' }],
      lines: [
        { say: 'Here is the question. Iron is extracted by heating iron three oxide, F e two O three, with carbon. Aluminium is extracted from aluminium oxide by electrolysis. Part a: use the reactivity series to explain why iron can be extracted with carbon but aluminium cannot. Part b: in the extraction, iron three oxide loses oxygen. What type of reaction is this? Part c: calculate the greatest mass of iron that can be extracted from 320 tonnes of iron three oxide. The relative atomic masses are iron 56 and oxygen 16.', caption: 'Here is the question. Iron is extracted by heating iron(III) oxide, Fe₂O₃, with carbon. Aluminium is extracted from aluminium oxide by electrolysis. Part a: use the reactivity series to explain why iron can be extracted with carbon but aluminium cannot. Part b: in the extraction, iron(III) oxide loses oxygen. What type of reaction is this? Part c: calculate the greatest mass of iron that can be extracted from 320 tonnes of iron(III) oxide. The relative atomic masses are Fe = 56 and O = 16.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Compare each metal with **carbon**, name the reaction, then find the **fraction** of the ore that is iron' }],
      lines: [
        { say: 'Whether carbon can take the oxygen depends on where the metal sits compared with carbon. Then we work out what fraction of the oxide\'s mass is iron.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(ores, 'dp')],
      lines: [
        { say: 'Here is what we need. A more reactive element can take a less reactive one out of its compound. On the left, iron in copper two sulfate solution. On the right, copper in iron two sulfate solution.', caption: 'Here is what we need. A more reactive element can take a less reactive one out of its compound. On the left, iron in copper(II) sulfate solution. On the right, copper in iron(II) sulfate solution.', show: ['dp', 'dp.labels', 'dp.key'] },
        { say: 'Iron is more reactive than copper, so on the left iron atoms give their electrons to copper ions and copper metal forms. On the right, nothing happens.', show: 'dp.tally', play: 'dp.go' },
        { say: 'Carbon does the same job in a blast furnace. It is more reactive than iron, so it takes the oxygen from iron oxide and leaves the iron behind.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Metals **below carbon**: heat the oxide with carbon', 'Metals **above carbon**: electrolysis', 'Mass of metal = fraction of the **formula mass** × ore'] }],
      lines: [
        { say: 'Here is the plan. Metals below carbon in the reactivity series can be extracted by heating their oxides with carbon.', show: 'plan.0' },
        { say: 'Metals above carbon need electrolysis.', show: 'plan.1' },
        { say: 'And the greatest mass of metal is the metal\'s share of the formula mass, multiplied by the mass of the oxide.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Carbon or electrolysis?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Reactivity series', 'Extracted by'],
          rows: [
            ['**aluminium**', 'electrolysis'],
            ['carbon', ''],
            ['**iron**', 'heating with carbon'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Aluminium is more reactive than carbon, so carbon cannot take the oxygen from aluminium oxide.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Carbon sits between them.', show: 't.1', focus: 't.1' },
        { say: 'Iron is less reactive than carbon, so carbon can take its oxygen. That is part a.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 2: Losing oxygen',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{2Fe2O3 + 3C -> 4Fe + 3CO2}', '\\text{oxygen removed} \\Rightarrow \\good{\\text{reduction}}'] }],
      lines: [
        { say: 'Step two. Carbon takes the oxygen from iron three oxide, leaving iron and making carbon dioxide.', caption: 'Step two. Carbon takes the oxygen from iron(III) oxide, leaving iron and making carbon dioxide.', show: 'm.0' },
        { say: 'Losing oxygen is reduction, so iron three oxide is reduced. That is part b.', caption: 'Losing oxygen is reduction, so iron(III) oxide is reduced. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The mass of iron',
      layout: 'center',
      main: [{ kind: 'math', id: 'c', size: 'md', lines: ['M_r(\\ce{Fe2O3}) = 2(56) + 3(16) = 160', '\\text{iron} = 2 \\times 56 = 112', '\\tfrac{112}{160} \\times 320 = \\good{224\\ \\text{tonnes}}'] }],
      lines: [
        { say: 'Step three. The formula mass of iron three oxide is two times 56 plus three times 16, which is 160.', caption: 'Step three. The formula mass of Fe₂O₃ is 2 × 56 + 3 × 16 = 160.', show: 'c.0' },
        { say: 'Of that 160, the two iron atoms make up 112.', show: 'c.1' },
        { say: 'So iron is 112 out of every 160 tonnes. 112 over 160, times 320 tonnes, is 224 tonnes. That is part c.', caption: 'So iron is 112 out of every 160 tonnes. 112/160 × 320 tonnes = 224 tonnes. That is part c.', show: 'c.2', focus: 'c.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Iron is **below carbon** in the reactivity series, but aluminium is **above** it. (b) **Reduction**. (c) **224 tonnes** of iron.' },
      ],
      lines: [
        { say: 'Does it make sense? Iron is 70 percent of the oxide\'s mass, and 70 percent of 320 is 224, so the answer is less than the ore, as it must be.', show: 'ans' },
        { say: 'So carbon works for iron but not aluminium, the reaction is reduction, and 320 tonnes of ore gives at most 224 tonnes of iron.' },
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
            ['Aluminium is **too unreactive**', 'It is **more** reactive than carbon'],
            ['**Oxidation**', 'Losing oxygen is **reduction**'],
            ['**112** tonnes', 'Counted only **one** iron atom'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Aluminium holds on to its oxygen more tightly than carbon can pull it away, because aluminium is the more reactive.', focus: 'traps.0' },
        { say: 'Gaining oxygen is oxidation and losing it is reduction, so the ore is reduced.', focus: 'traps.1' },
        { say: 'And the formula has two iron atoms, so iron is 112 of the 160, not 56.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the greatest mass of copper that can be extracted from 100 g of copper(II) oxide, CuO? (Cu = 64, O = 16)',
          choices: ['64 g', '80 g', '20 g', '50 g'],
          answer: 1,
          working: 'Mr of CuO = 64 + 16 = 80, so the mass of copper is 64/80 × 100 = 80 g.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the greatest mass of copper that can be extracted from 100 grams of copper two oxide? Copper is 64 and oxygen is 16. Pause the video and try it.', caption: 'Your turn. What is the greatest mass of copper that can be extracted from 100 g of copper(II) oxide, CuO? Cu = 64 and O = 16. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The formula mass is 64 plus 16, which is 80. So copper is 64 over 80 of the mass, and 64 over 80 times 100 is 80 grams: choice B.', caption: 'The formula mass is 64 + 16 = 80. So copper is 64/80 of the mass, and 64/80 × 100 = 80 g: choice B.', show: 'q2.answer' },
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
          items: ['Below carbon: **carbon**. Above carbon: **electrolysis**', 'Taking oxygen away is **reduction**', 'Metal mass = **share of Mr** × mass of oxide'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Metals below carbon are extracted with carbon, and metals above it by electrolysis.', show: 'sum.0' },
        { say: 'Taking oxygen away from an ore is reduction.', show: 'sum.1' },
        { say: 'And the mass of metal is its share of the formula mass, times the mass of oxide. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
