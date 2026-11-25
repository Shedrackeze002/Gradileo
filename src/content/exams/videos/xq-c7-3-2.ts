import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import solutions from '@/content/chem7/videos/c7-3-2.ts';

// Exam question for Chemistry 7 lesson 3.2 (solutions and concentration): 12 g of salt dissolved in
// 188 g of water makes 200 g of solution, and with a volume of 250 mL its concentration is
// 12 / 0.250 = 48 g/L. Written by Gradileo in the style of a Grade 7 science unit test.
//
// The pictures are the lesson's sugar and sand dropped into water, and its concentrated and dilute
// solutions (src/video/particles.ts).

const QUESTION = 'A student dissolves 12 g of salt in 188 g of water. The solution has a volume of 250 mL. (a) Name the solute and the solvent. (b) What is the mass of the solution? (c) What is the concentration of the solution, in grams per litre?';

const video: Explainer = {
  id: 'xq-c7-3-2',
  lessonId: '',
  exam: {
    lesson: 'c7-3-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Salt Water. Solutions and Concentration',
  thumbnailTitle: 'Salt Water',
  thumbnail: 'p',
  summary:
    'A test-style question, solved one small step at a time: 12 g of salt is dissolved in 188 g of water to make 250 mL of solution. What are the solute and the solvent, what is the mass of the solution, and what is its concentration? Salt is the solute and water the solvent, the solution has a mass of 200 g, and its concentration is 48 g/L.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Salt Water', subtitle: 'Mass and concentration of a solution' }],
      lines: [
        { say: 'In this video, we solve a test-style question about solutions and concentration. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade seven science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 7 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'A student dissolves $12$ g of salt in $188$ g of water. The solution has a volume of $250$ mL. (a) Name the solute and the solvent. (b) What is the mass of the solution? (c) What is the concentration of the solution, in grams per litre?', answer: 'Salt and water, 200 g, 48 g/L' }],
      lines: [
        { say: 'Here is the question. A student dissolves twelve grams of salt in one hundred and eighty eight grams of water. The solution has a volume of two hundred and fifty millilitres. Part a: name the solute and the solvent. Part b: what is the mass of the solution? Part c: what is the concentration of the solution, in grams per litre?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Which substance **dissolves**, how much does the solution **weigh**, and how much salt is in each **litre**?' }],
      lines: [
        { say: 'Part a asks which substance dissolves and which does the dissolving. Part b asks how heavy the whole solution is. And part c asks how many grams of salt there are in each litre.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(solutions, 'p')],
      lines: [
        { say: 'Here is what we need. This is a lump of sugar in water, and a lump of sand in water. The blue particles are water.', show: ['p', 'p.labels'] },
        { say: 'Watch. The water pulls the sugar particles off the lump, and they spread out among the water particles. The sugar dissolves, but count the particles: none of them disappear. They are just spread out too finely to see.', play: 'p.drop', show: 'p.count', focus: 'p.s' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Solute** dissolves, **solvent** does the dissolving', 'Mass of solution = solute + solvent', 'Concentration = mass of solute ÷ volume in **litres**'] }],
      lines: [
        { say: 'Here is the plan. The solute is the substance that dissolves, and the solvent is the one it dissolves in.', show: 'plan.0' },
        { say: 'Nothing disappears, so the mass of the solution is the mass of the solute plus the mass of the solvent.', show: 'plan.1' },
        { say: 'And concentration is the mass of solute divided by the volume of solution in litres.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Solute and solvent',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Part', 'Substance', 'Why'], rows: [['Solute', '**salt**', 'it dissolves'], ['Solvent', '**water**', 'it does the dissolving']] }],
      lines: [
        { say: 'Step one. The salt is the substance that dissolves, so salt is the solute.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'The water is what the salt dissolves in, so water is the solvent. That is part a.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: The mass',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{mass} = 12\\ \\text{g} + 188\\ \\text{g}', '= \\good{200\\ \\text{g}}'] }],
      lines: [
        { say: 'Step two. The salt particles do not vanish when they dissolve, so the mass of the solution is the salt plus the water.', show: 'm.0' },
        { say: 'Twelve plus one hundred and eighty eight is two hundred grams. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Concentration',
      layout: 'center',
      main: [{ kind: 'math', id: 'c', size: 'lg', lines: ['250\\ \\text{mL} = 0.250\\ \\text{L}', '\\dfrac{12\\ \\text{g}}{0.250\\ \\text{L}} = \\good{48\\ \\text{g/L}}'] }],
      lines: [
        { say: 'Step three. Concentration needs the volume in litres. There are one thousand millilitres in a litre, so two hundred and fifty millilitres is zero point two five zero litres.', show: 'c.0' },
        { say: 'Now divide the mass of salt by the volume. Twelve divided by zero point two five is forty eight grams per litre. That is part c.', show: 'c.1', focus: 'c.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['48\\ \\text{g/L} \\times 0.250\\ \\text{L} = 12\\ \\text{g}\\ \\checkmark'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) solute **salt**, solvent **water** (b) $200$ g (c) $48$ g/L' },
      ],
      lines: [
        { say: 'Does it check? Forty eight grams in each litre, times a quarter of a litre, gives back the twelve grams of salt.', show: 'x.0' },
        { say: 'So the solute is salt and the solvent is water, the solution has a mass of two hundred grams, and its concentration is forty eight grams per litre.', show: 'ans' },
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
            ['$188$ g', 'Thought the salt **disappears**'],
            ['$0.048$ g/L', 'Divided by **millilitres**, not litres'],
            ['$3$ g/L', '**Multiplied** instead of dividing'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'One hundred and eighty eight grams leaves out the salt. Dissolved salt is still there, so its mass still counts.', focus: 'traps.0' },
        { say: 'Zero point zero four eight divides by two hundred and fifty millilitres. Grams per litre needs the volume in litres.', focus: 'traps.1' },
        { say: 'And three grams per litre multiplies twelve by zero point two five. Concentration is mass divided by volume.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '$6$ g of sugar is dissolved to make $200$ mL of solution. What is its concentration?',
          choices: ['$0.03$ g/L', '$30$ g/L', '$1.2$ g/L', '$206$ g/L'],
          answer: 1,
          working: '$200$ mL $= 0.200$ L, and $6 \\div 0.200 = 30$ g/L.',
        },
      ],
      lines: [
        { say: 'Your turn. Six grams of sugar is dissolved to make two hundred millilitres of solution. What is its concentration? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Two hundred millilitres is zero point two litres, and six divided by zero point two is thirty grams per litre: choice B.', show: 'q2.answer' },
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
          items: ['The **solute** dissolves in the **solvent**', 'Mass of solution = solute + solvent', 'Concentration = grams ÷ **litres**: change mL to L first'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The solute dissolves in the solvent to make a solution.', show: 'sum.0' },
        { say: 'Nothing disappears, so the mass of the solution is the solute plus the solvent.', show: 'sum.1' },
        { say: 'And concentration is the mass of solute divided by the volume in litres, so change millilitres to litres first. For more on solutions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
