import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import density from '@/content/chem7/videos/c7-1-4.ts';

// Exam question for Chemistry 7 lesson 1.4 (density): a 96 g block of volume 12 cm3 has a density
// of 8.0 g/cm3, so it sinks in water, and each half of it still has a density of 8.0 g/cm3. Written
// by Gradileo in the style of a Grade 7 science unit test.
//
// The picture is the lesson's two lumps dropped onto water (src/video/particles.ts): the dense one
// sinks and the light one floats.

const QUESTION = 'A metal block has a mass of 96 g and a volume of 12 cm³. The density of water is 1.0 g/cm³. (a) What is the density of the block? (b) Will the block float or sink in water? (c) The block is cut exactly in half. What is the density of each half?';

const video: Explainer = {
  id: 'xq-c7-1-4',
  lessonId: '',
  exam: {
    lesson: 'c7-1-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: A Metal Block. Density',
  thumbnailTitle: 'A Metal Block',
  thumbnail: 'fs',
  summary:
    'A test-style question, solved one small step at a time: a metal block has a mass of 96 g and a volume of 12 cm³. What is its density, does it float or sink in water, and what is the density of each half if it is cut in two? Mass divided by volume gives 8.0 g/cm³, which is more than water’s 1.0 g/cm³, so it sinks, and each half still has a density of 8.0 g/cm³.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Metal Block', subtitle: 'Density, floating and sinking' }],
      lines: [
        { say: 'In this video, we solve a test-style question about density. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'A metal block has a mass of $96$ g and a volume of $12\\ \\text{cm}^3$. The density of water is $1.0\\ \\text{g/cm}^3$. (a) What is the density of the block? (b) Will it float or sink in water? (c) The block is cut exactly in half. What is the density of each half?', answer: '8.0 g/cm³, it sinks, and each half is still 8.0 g/cm³' }],
      lines: [
        { say: 'Here is the question. A metal block has a mass of ninety six grams and a volume of twelve cubic centimetres. The density of water is one point zero grams per cubic centimetre. Part a: what is the density of the block? Part b: will it float or sink in water? Part c: the block is cut exactly in half. What is the density of each half?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'How much **mass** is packed into each cubic centimetre, how does that compare with **water**, and does cutting the block change it?' }],
      lines: [
        { say: 'Density tells us how much mass is packed into each cubic centimetre. The question wants that number, then a comparison with water, and then whether cutting the block changes it.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(density, 'fs')],
      lines: [
        { say: 'Here is what we need. Each box holds water, the blue particles, with a lump of solid just above it. The orange lump is denser than water, and the yellow lump is less dense.', show: ['fs', 'fs.labels'] },
        { say: 'Watch them drop. The denser lump pushes the water aside and sinks to the bottom. The less dense lump cannot push its way down, so it floats. So a solid sinks in water when its density is more than water\'s, and floats when it is less.', play: 'fs.drop', show: 'fs.level' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Density = **mass** ÷ **volume**', 'Compare it with water, **1.0 g/cm³**', 'Halve the **mass** and the **volume** together'] }],
      lines: [
        { say: 'Here is the plan. Density is mass divided by volume.', show: 'plan.0' },
        { say: 'Then compare the answer with water\'s density of one point zero.', show: 'plan.1' },
        { say: 'Then, for the half block, halve the mass and the volume together, and divide again.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The density',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{density} = \\dfrac{\\text{mass}}{\\text{volume}}', '= \\dfrac{96\\ \\text{g}}{12\\ \\text{cm}^3} = \\good{8.0\\ \\text{g/cm}^3}'] }],
      lines: [
        { say: 'Step one. Density is mass divided by volume.', show: 'm.0' },
        { say: 'Ninety six grams divided by twelve cubic centimetres is eight point zero grams per cubic centimetre. That is part a. Each cubic centimetre of the block has a mass of eight grams.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Float or sink',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['8.0\\ \\text{g/cm}^3 > 1.0\\ \\text{g/cm}^3', '\\text{denser than water, so it } \\good{\\text{sinks}}'] }],
      lines: [
        { say: 'Step two. Eight point zero is more than one point zero.', show: 'm.0' },
        { say: 'So the block is denser than water, and it sinks. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Half the block',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{half: } 48\\ \\text{g},\\ 6\\ \\text{cm}^3', '\\dfrac{48\\ \\text{g}}{6\\ \\text{cm}^3} = \\good{8.0\\ \\text{g/cm}^3}'] }],
      lines: [
        { say: 'Step three. Each half has half the mass, forty eight grams, and half the volume, six cubic centimetres.', show: 'm.0' },
        { say: 'Forty eight divided by six is eight point zero grams per cubic centimetre, the same as before. That is part c. The half is the same metal, packed just as tightly, so its density does not change.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['8.0 \\times 12 = 96\\ \\text{g}\\ \\checkmark', '8.0 \\times 6 = 48\\ \\text{g}\\ \\checkmark'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) $8.0\\ \\text{g/cm}^3$ (b) it sinks (c) $8.0\\ \\text{g/cm}^3$' },
      ],
      lines: [
        { say: 'Does it check? Eight grams in each of twelve cubic centimetres gives back ninety six grams. And eight grams in each of six cubic centimetres gives forty eight grams, which is half the block.', show: ['x.0', 'x.1'] },
        { say: 'So the density is eight point zero grams per cubic centimetre, the block sinks, and each half still has a density of eight point zero.', show: 'ans' },
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
            ['$0.125\\ \\text{g/cm}^3$', 'Divided **volume** by **mass**'],
            ['$1152\\ \\text{g/cm}^3$', '**Multiplied** mass by volume'],
            ['$4.0\\ \\text{g/cm}^3$ for a half', 'Halved the **mass** only'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Zero point one two five divides the wrong way round. Density is mass on top, volume underneath.', focus: 'traps.0' },
        { say: 'One thousand one hundred and fifty two multiplies instead of dividing. No metal is anywhere near that dense.', focus: 'traps.1' },
        { say: 'And four point zero for a half block halves the mass but forgets that the volume halves too. Cutting a block never changes its density.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A piece of cork has a mass of $30$ g and a volume of $120\\ \\text{cm}^3$. What is its density, and does it float or sink in water?',
          choices: ['$4.0\\ \\text{g/cm}^3$, sinks', '$0.25\\ \\text{g/cm}^3$, sinks', '$4.0\\ \\text{g/cm}^3$, floats', '$0.25\\ \\text{g/cm}^3$, floats'],
          answer: 3,
          working: '$30 \\div 120 = 0.25\\ \\text{g/cm}^3$, which is less than $1.0$, so it floats.',
        },
      ],
      lines: [
        { say: 'Your turn. A piece of cork has a mass of thirty grams and a volume of one hundred and twenty cubic centimetres. What is its density, and does it float or sink in water? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Thirty divided by one hundred and twenty is zero point two five grams per cubic centimetre. That is less than water\'s one point zero, so the cork floats: choice D.', show: 'q2.answer' },
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
          items: ['Density = **mass** ÷ **volume**', 'Denser than water (**1.0 g/cm³**) sinks, less dense floats', 'Cutting a piece **does not** change its density'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Density is mass divided by volume, with the mass on top.', show: 'sum.0' },
        { say: 'A solid denser than water sinks, and one less dense floats.', show: 'sum.1' },
        { say: 'And cutting a piece in half halves its mass and its volume together, so its density stays the same. For more on density, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
