import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import economy from '@/content/chemmore/videos/cx-3-2.ts';

// Exam question for More Chemistry Topics lesson 3.2 (atom economy): the atom economy for making
// lime from limestone, the atom economy for making hydrogen from methane and steam, and why a high
// atom economy matters. Written by Gradileo in the style of a GCSE chemistry exam.
//
// The picture is the lesson's limestone breaking down into lime and carbon dioxide
// (src/video/reactions.ts).

const QUESTION = 'Relative formula masses: CaCO₃ = 100, CaO = 56, CH₄ = 16, H₂O = 18, H₂ = 2. (a) Lime, CaO, is made by heating limestone: CaCO₃ → CaO + CO₂. Calculate the percentage atom economy for making lime. (b) Hydrogen is made from methane and steam: CH₄ + H₂O → CO + 3H₂. Calculate the percentage atom economy for making hydrogen. (c) Give one reason why chemists prefer reactions with a high atom economy.';

const video: Explainer = {
  id: 'xq-cx-3-2',
  lessonId: '',
  exam: {
    lesson: 'cx-3-2',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Lime from Limestone and Hydrogen from Methane. Atom Economy',
  thumbnailTitle: 'How Much Is Wasted?',
  thumbnail: 'lm',
  summary:
    'A test-style question, solved one small step at a time: what is the atom economy for making lime from limestone, and for making hydrogen from methane and steam, and why does it matter? Making lime has an atom economy of 56%, making hydrogen 17.6%, and a high atom economy means less waste and fewer raw materials used.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Is Wasted?', subtitle: 'Two atom economies' }],
      lines: [
        { say: 'In this video, we solve a test-style question about atom economy. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '56%; 17.6%; less waste' }],
      lines: [
        { say: 'Here is the question. The relative formula masses are calcium carbonate 100, calcium oxide 56, methane 16, water 18 and hydrogen 2. Part a: lime, calcium oxide, is made by heating limestone, which breaks down into calcium oxide and carbon dioxide. Calculate the percentage atom economy for making lime. Part b: hydrogen is made from methane and steam, making carbon monoxide and three hydrogen molecules. Calculate the percentage atom economy for making hydrogen. Part c: give one reason why chemists prefer reactions with a high atom economy.', caption: 'Here is the question. The relative formula masses are CaCO₃ = 100, CaO = 56, CH₄ = 16, H₂O = 18 and H₂ = 2. Part a: lime, CaO, is made by heating limestone: CaCO₃ → CaO + CO₂. Calculate the percentage atom economy for making lime. Part b: hydrogen is made from methane and steam: CH₄ + H₂O → CO + 3H₂. Calculate the percentage atom economy for making hydrogen. Part c: give one reason why chemists prefer reactions with a high atom economy.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Find what **share** of the reactants\' mass ends up in the **product we want**' }],
      lines: [
        { say: 'Atom economy asks how much of the mass we start with ends up in the product we want, and how much goes to waste.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(economy, 'lm')],
      lines: [
        { say: 'Here is what we need. This is one unit of calcium carbonate, limestone. Heated, it breaks down to make lime, calcium oxide.', show: 'lm' },
        { say: 'Watch where the atoms go. The calcium and one oxygen end up in the lime we want, but a carbon and two oxygens leave as carbon dioxide, a waste product.', play: 'lm.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'math', id: 'plan', size: 'md', lines: ['\\text{atom economy} = \\dfrac{M_r \\text{ of wanted product}}{\\text{total } M_r \\text{ of reactants}} \\times 100'] }],
      lines: [
        { say: 'Here is the plan. Atom economy is the total formula mass of the product we want, divided by the total formula mass of all the reactants, times 100. We read the amounts from the balanced equation.', show: 'plan' },
      ],
    },
    {
      chapter: 'Step 1: Lime',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{56}{100} \\times 100 = \\good{56\\%}'] }],
      lines: [
        { say: 'Step one. The only reactant is calcium carbonate, with a mass of 100, and the lime we want has a mass of 56.', show: 'm.0' },
        { say: 'So 56 over 100, times 100, gives an atom economy of 56 percent. That is part a.', caption: 'So 56/100 × 100 gives an atom economy of 56%. That is part a.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Hydrogen',
      layout: 'center',
      main: [{ kind: 'math', id: 'h', size: 'md', lines: ['\\text{reactants: } 16 + 18 = 34', '\\text{wanted: } 3 \\times 2 = 6', '\\tfrac{6}{34} \\times 100 = \\good{17.6\\%}'] }],
      lines: [
        { say: 'Step two. The reactants are methane, 16, and steam, 18, which total 34.', show: 'h.0' },
        { say: 'The equation makes three hydrogen molecules, each with a mass of 2, so the hydrogen we want has a total mass of 6.', show: 'h.1' },
        { say: '6 over 34, times 100, is 17.6 percent. That is part b.', caption: '6/34 × 100 = 17.6%. That is part b.', show: 'h.2', focus: 'h.2' },
      ],
    },
    {
      chapter: 'Step 3: Why it matters',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Less **waste** to deal with', 'Fewer **raw materials** used', 'More **sustainable**, and often **cheaper**'] }],
      lines: [
        { say: 'Step three. A high atom economy means less of what we start with turns into waste.', show: 's.0' },
        { say: 'So we use fewer raw materials for each tonne of product.', show: 's.1' },
        { say: 'That makes the process more sustainable, and often cheaper. Any one of these answers part c.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **56%**. (b) **17.6%**. (c) It produces **less waste**, so fewer raw materials are used.' },
      ],
      lines: [
        { say: 'Does it make sense? Hydrogen atoms are very light, and most of the mass leaves as carbon monoxide, so a low atom economy for hydrogen fits.', show: 'ans' },
        { say: 'So making lime has an atom economy of 56 percent, making hydrogen 17.6 percent, and a high atom economy means less waste.', caption: 'So making lime has an atom economy of 56%, making hydrogen 17.6%, and a high atom economy means less waste.' },
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
            ['**44%**', 'Used the **waste**, CO₂, not the lime'],
            ['**5.9%**', 'Used **one** H₂, not three'],
            ['It gives a **higher yield**', 'Yield is what is **collected**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The top of the fraction is the product we want, lime, not the carbon dioxide.', focus: 'traps.0' },
        { say: 'The equation makes three hydrogen molecules, so the wanted mass is 6, not 2.', focus: 'traps.1' },
        { say: 'And atom economy comes from the equation alone, while yield depends on how much is actually collected.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A reaction makes only one product. What is its atom economy?',
          choices: ['50%', '100%', '0%', 'It depends on the yield'],
          answer: 1,
          working: 'With one product, all the mass of the reactants ends up in the product, so the atom economy is 100%.',
        },
      ],
      lines: [
        { say: 'Your turn. A reaction makes only one product. What is its atom economy? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'All the mass of the reactants ends up in that one product, so the atom economy is 100 percent: choice B.', caption: 'All the mass of the reactants ends up in that one product, so the atom economy is 100%: choice B.', show: 'q2.answer' },
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
          items: ['Atom economy = wanted Mr ÷ **total reactant Mr** × 100', 'Count every molecule in the **balanced equation**', 'High atom economy: **less waste**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Atom economy is the formula mass of the wanted product over the total of the reactants, times 100.', show: 'sum.0' },
        { say: 'Use the balanced equation, and count every molecule.', show: 'sum.1' },
        { say: 'And a high atom economy means less waste. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
