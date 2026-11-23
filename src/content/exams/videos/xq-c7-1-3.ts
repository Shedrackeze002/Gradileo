import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import measuring from '@/content/chem7/videos/c7-1-3.ts';

// Exam question for Chemistry 7 lesson 1.3 (measuring mass and volume): a stone's volume by
// displacement (42 mL to 57 mL, so 15 cm3) and its mass of 39 g in kilograms (0.039 kg). Written
// by Gradileo in the style of a Grade 7 science unit test.
//
// The picture is the lesson's stone sinking into water in a measuring cylinder
// (src/video/particles.ts): the water particles in its way are pushed up, so the level rises.

const QUESTION = 'A measuring cylinder holds 42 mL of water. A small stone is lowered in, and the water level rises to 57 mL. On a balance, the stone has a mass of 39 g. (a) What is the volume of the stone, in cubic centimetres? (b) What is its mass in kilograms?';

const video: Explainer = {
  id: 'xq-c7-1-3',
  lessonId: '',
  exam: {
    lesson: 'c7-1-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Measuring a Stone. Measuring Mass and Volume',
  thumbnailTitle: 'Measuring a Stone',
  thumbnail: 'd',
  summary:
    'A test-style question, solved one small step at a time: a stone raises the water in a measuring cylinder from 42 mL to 57 mL, and has a mass of 39 g. What is its volume in cubic centimetres, and its mass in kilograms? The rise is its volume, 15 cm³, and dividing by 1000 gives 0.039 kg.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Measuring a Stone', subtitle: 'Displacement, and changing units' }],
      lines: [
        { say: 'In this video, we solve a test-style question about measuring mass and volume. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'A measuring cylinder holds $42$ mL of water. A small stone is lowered in, and the water level rises to $57$ mL. On a balance, the stone has a mass of $39$ g. (a) What is the volume of the stone, in cubic centimetres? (b) What is its mass in kilograms?', answer: '15 cm³ and 0.039 kg' }],
      lines: [
        { say: 'Here is the question. A measuring cylinder holds forty two millilitres of water. A small stone is lowered in, and the water level rises to fifty seven millilitres. On a balance, the stone has a mass of thirty nine grams. Part a: what is the volume of the stone, in cubic centimetres? Part b: what is its mass in kilograms?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'A stone has no edges to measure. Use the **water** to find its volume, then change **grams** to **kilograms**' }],
      lines: [
        { say: 'You cannot measure a stone with a ruler, because it has an odd shape. The water level tells us its volume instead. Then part b is a change of units.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(measuring, 'd')],
      lines: [
        { say: 'Here is what we need. The blue particles are water in a cylinder, and the orange ones are a stone held just above it. The dashed line marks the water level now.', show: ['d', 'd.labels', 'd.key', 'd.level'] },
        { say: 'Watch the stone go in. Every water particle in its way has to move, and they cannot go down through the stone, so they are pushed up, and the level rises. The rise is the stone\'s own volume.', play: 'd.drop' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Volume = **final** reading − **first** reading', 'Change **mL** to **cm³**', 'Change **g** to **kg**: divide by **1000**'] }],
      lines: [
        { say: 'Here is the plan. The volume is the final reading minus the first reading.', show: 'plan.0' },
        { say: 'Then change millilitres to cubic centimetres.', show: 'plan.1' },
        { say: 'Then change grams to kilograms by dividing by one thousand.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The rise',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{volume} = 57 - 42 = 15\\ \\text{mL}'] }],
      lines: [
        { say: 'Step one. The level went from forty two to fifty seven millilitres. Fifty seven minus forty two is fifteen millilitres. That is the stone\'s volume.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Cubic centimetres',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1\\ \\text{mL} = 1\\ \\text{cm}^3', '15\\ \\text{mL} = \\good{15\\ \\text{cm}^3}'] }],
      lines: [
        { say: 'Step two. One millilitre is exactly one cubic centimetre.', show: 'm.0' },
        { say: 'So fifteen millilitres is fifteen cubic centimetres. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Kilograms',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1\\ \\text{kg} = 1000\\ \\text{g}', '39 \\div 1000 = \\good{0.039\\ \\text{kg}}'] }],
      lines: [
        { say: 'Step three. One kilogram is one thousand grams, so a kilogram is the bigger unit.', show: 'm.0' },
        { say: 'To change to the bigger unit, divide by one thousand. Thirty nine divided by one thousand is zero point zero three nine kilograms. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['42 + 15 = 57\\ \\checkmark', '0.039\\ \\text{kg} \\times 1000 = 39\\ \\text{g}\\ \\checkmark'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) $15\\ \\text{cm}^3$ (b) $0.039\\ \\text{kg}$' },
      ],
      lines: [
        { say: 'Does it check? Forty two plus fifteen gives back fifty seven. And a small stone should be a small fraction of a kilogram, which zero point zero three nine is.', show: ['x.0', 'x.1'] },
        { say: 'So the stone\'s volume is fifteen cubic centimetres, and its mass is zero point zero three nine kilograms.', show: 'ans' },
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
            ['$57\\ \\text{cm}^3$', 'Gave the **final** reading, not the **rise**'],
            ['$99\\ \\text{cm}^3$', '**Added** the readings'],
            ['$39\\,000\\ \\text{kg}$', '**Multiplied** instead of dividing'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Fifty seven is the water and the stone together. The stone alone is the rise.', focus: 'traps.0' },
        { say: 'Ninety nine adds the two readings. The volume is the difference.', focus: 'traps.1' },
        { say: 'And thirty nine thousand kilograms multiplies by one thousand. A small stone does not weigh as much as ten cars. Going to a bigger unit makes the number smaller.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cylinder holds $30.0$ mL of water. When a key is dropped in, the level rises to $34.5$ mL. What is the volume of the key?',
          choices: ['$64.5\\ \\text{cm}^3$', '$30.0\\ \\text{cm}^3$', '$4.5\\ \\text{cm}^3$', '$34.5\\ \\text{cm}^3$'],
          answer: 2,
          working: '$34.5 - 30.0 = 4.5$ mL, which is $4.5\\ \\text{cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cylinder holds thirty point zero millilitres of water. When a key is dropped in, the level rises to thirty four point five millilitres. What is the volume of the key? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Thirty four point five minus thirty point zero is four point five millilitres, which is four point five cubic centimetres: choice C.', show: 'q2.answer' },
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
          items: ['Volume of a sinking solid = the **rise** in water level', '$1\\ \\text{mL} = 1\\ \\text{cm}^3$', 'To a **bigger** unit, **divide** by 1000'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The volume of a solid that sinks is the rise in the water level: final reading minus first reading.', show: 'sum.0' },
        { say: 'One millilitre is one cubic centimetre.', show: 'sum.1' },
        { say: 'And to change to a bigger unit, like grams to kilograms, divide by one thousand. For more on measuring, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
