import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import solubility from '@/content/chem7/videos/c7-3-3.ts';

// Exam question for Chemistry 7 lesson 3.3 (solubility): potassium nitrate dissolves 64 g per 100 g
// of water at 40 C and 32 g at 20 C. In 50 g of water at 40 C, 32 g dissolves, so 40 g leaves 8 g
// undissolved; cooling a saturated 100 g solution from 40 C to 20 C gives 64 - 32 = 32 g of
// crystals. Written by Gradileo in the style of a Grade 7 science unit test.
//
// The picture is the lesson's three boxes of water with a little sugar, a lot of sugar and sand
// dropped in (src/video/particles.ts): the water holds only so much sugar.

const QUESTION = 'The solubility of potassium nitrate is 64 g per 100 g of water at 40 °C, and 32 g per 100 g of water at 20 °C. (a) What is the most potassium nitrate that can dissolve in 50 g of water at 40 °C? (b) A student stirs 40 g of potassium nitrate into 50 g of water at 40 °C. What mass stays undissolved? (c) A saturated solution made with 100 g of water at 40 °C is cooled to 20 °C. What mass of crystals forms?';

const video: Explainer = {
  id: 'xq-c7-3-3',
  lessonId: '',
  exam: {
    lesson: 'c7-3-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Potassium Nitrate. Solubility',
  thumbnailTitle: 'Potassium Nitrate',
  thumbnail: 'p',
  summary:
    'A test-style question, solved one small step at a time: potassium nitrate dissolves 64 g per 100 g of water at 40 °C and 32 g at 20 °C. How much dissolves in 50 g of water, how much of 40 g is left over, and how many crystals form when a saturated solution cools? Halving the water halves the solubility to 32 g, so 8 g is left over, and cooling gives 32 g of crystals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Potassium Nitrate', subtitle: 'Scaling solubility, and crystals on cooling' }],
      lines: [
        { say: 'In this video, we solve a test-style question about solubility. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'The solubility of potassium nitrate is $64$ g per $100$ g of water at $40$ °C, and $32$ g per $100$ g of water at $20$ °C. (a) What is the most that can dissolve in $50$ g of water at $40$ °C? (b) A student stirs $40$ g into $50$ g of water at $40$ °C. What mass stays undissolved? (c) A saturated solution made with $100$ g of water at $40$ °C is cooled to $20$ °C. What mass of crystals forms?', answer: '32 g, 8 g, 32 g' }],
      lines: [
        { say: 'Here is the question. The solubility of potassium nitrate is sixty four grams per one hundred grams of water at forty degrees Celsius, and thirty two grams per one hundred grams of water at twenty degrees. Part a: what is the most potassium nitrate that can dissolve in fifty grams of water at forty degrees? Part b: a student stirs forty grams into fifty grams of water at forty degrees. What mass stays undissolved? Part c: a saturated solution made with one hundred grams of water at forty degrees is cooled to twenty degrees. What mass of crystals forms?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Solubility is given for **100 g** of water. Scale it to **50 g**, then find what is **left over**' }],
      lines: [
        { say: 'The solubility is given for one hundred grams of water, but the first two parts use only fifty grams, so we must scale it. Then we compare what we add with what can dissolve, and the difference is left over.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(solubility, 'p')],
      lines: [
        { say: 'Here is what we need. These are three boxes of water. Into the first goes a little sugar, into the second a lot of sugar, and into the third some sand.', show: ['p', 'p.labels'] },
        { say: 'Watch. The little sugar dissolves completely. In the second box, the water pulls sugar particles away until it holds all it can, and the rest just sits at the bottom. That water is saturated. The sand never dissolves at all.', play: 'p.drop', show: 'p.count', focus: ['p.a', 'p.b'] },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Half the water dissolves **half** as much', 'Left over = added − most that can dissolve', 'Crystals on cooling = solubility **hot** − solubility **cold**'] }],
      lines: [
        { say: 'Here is the plan. Half as much water can dissolve half as much solute.', show: 'plan.0' },
        { say: 'Whatever we add beyond the most that can dissolve stays as solid.', show: 'plan.1' },
        { say: 'And when a saturated solution cools, the solute that no longer fits comes out as crystals.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Scale it',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['100\\ \\text{g water} \\to 64\\ \\text{g}', '50\\ \\text{g water} \\to 64 \\div 2 = \\good{32\\ \\text{g}}'] }],
      lines: [
        { say: 'Step one. At forty degrees, one hundred grams of water dissolves sixty four grams.', show: 'm.0' },
        { say: 'Fifty grams of water is half as much, so it dissolves half as much. Sixty four divided by two is thirty two grams. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Left over',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['40\\ \\text{g} - 32\\ \\text{g} = \\good{8\\ \\text{g}}\\ \\text{undissolved}'] }],
      lines: [
        { say: 'Step two. The student adds forty grams, but only thirty two grams can dissolve in fifty grams of water.', show: 'm.0' },
        { say: 'Forty minus thirty two is eight grams, which stays at the bottom as solid. That is part b. The solution holds all it can, so it is saturated, just like the box with a lot of sugar.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Cooling',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['40\\ ^\\circ\\text{C} \\to 64\\ \\text{g}', '20\\ ^\\circ\\text{C} \\to 32\\ \\text{g}', '64 - 32 = \\good{32\\ \\text{g}}\\ \\text{of crystals}'] }],
      lines: [
        { say: 'Step three. The saturated solution at forty degrees holds sixty four grams. At twenty degrees, the same water can only hold thirty two.', show: ['m.0', 'm.1'] },
        { say: 'The extra no longer fits, so it comes out as crystals. Sixty four minus thirty two is thirty two grams of crystals. That is part c.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['32 + 8 = 40\\ \\text{g added}\\ \\checkmark', '32 + 32 = 64\\ \\text{g dissolved at first}\\ \\checkmark'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) $32$ g (b) $8$ g (c) $32$ g' },
      ],
      lines: [
        { say: 'Does it check? The thirty two grams that dissolve plus the eight left over make the forty grams added. And the thirty two grams still dissolved plus thirty two grams of crystals make the sixty four we started with.', show: ['x.0', 'x.1'] },
        { say: 'So the answers are thirty two grams, eight grams, and thirty two grams of crystals.', show: 'ans' },
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
            ['$64$ g in part (a)', 'Forgot to **scale** to 50 g of water'],
            ['Nothing left over', 'Compared $40$ g with $64$ g, the value for **100 g**'],
            ['$96$ g of crystals', '**Added** the solubilities'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Sixty four grams is for one hundred grams of water. With only fifty grams, it must be halved.', focus: 'traps.0' },
        { say: 'Saying all forty grams dissolves comes from comparing it with sixty four, the value for twice as much water.', focus: 'traps.1' },
        { say: 'And ninety six grams adds the two solubilities. The crystals are the difference between them.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'At $20$ °C, $36$ g of salt dissolves in $100$ g of water. What is the most salt that can dissolve in $200$ g of water at $20$ °C?',
          choices: ['$18$ g', '$36$ g', '$72$ g', '$236$ g'],
          answer: 2,
          working: 'Twice the water dissolves twice as much: $36 \\times 2 = 72$ g.',
        },
      ],
      lines: [
        { say: 'Your turn. At twenty degrees, thirty six grams of salt dissolves in one hundred grams of water. What is the most salt that can dissolve in two hundred grams of water at twenty degrees? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Twice the water dissolves twice as much. Thirty six times two is seventy two grams: choice C.', show: 'q2.answer' },
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
          items: ['Solubility is per **100 g** of water: scale it', 'Extra solute stays **undissolved**: the solution is **saturated**', 'Cooling a saturated solution gives **crystals**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Solubility is usually given per one hundred grams of water, so scale it to the water you have.', show: 'sum.0' },
        { say: 'Any solute beyond that stays undissolved, and the solution is saturated.', show: 'sum.1' },
        { say: 'And cooling a saturated solution makes the extra come out as crystals. For more on solubility, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
