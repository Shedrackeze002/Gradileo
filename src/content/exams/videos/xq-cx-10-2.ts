import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import entropy from '@/content/chemmore/videos/cx-10-2.ts';

// Exam question for More Chemistry Topics lesson 10.2 (entropy and Gibbs free energy): the
// thermal decomposition of calcium carbonate, its entropy change, and the lowest temperature at
// which it is feasible. Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's gases and liquids spreading out when the walls lift
// (src/video/particles.ts).

const QUESTION = 'Calcium carbonate decomposes when heated: CaCO₃(s) → CaO(s) + CO₂(g), ΔH = +178 kJ mol⁻¹. The standard entropies, in J K⁻¹ mol⁻¹, are CaCO₃(s) 93, CaO(s) 40 and CO₂(g) 214. (a) Without calculation, explain why the entropy change for this reaction is positive. (b) Calculate the entropy change, ΔS. (c) Calculate the lowest temperature at which the reaction is feasible.';

const video: Explainer = {
  id: 'xq-cx-10-2',
  lessonId: '',
  exam: {
    lesson: 'cx-10-2',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: When Does Calcium Carbonate Decompose? Entropy and Gibbs Free Energy',
  thumbnailTitle: 'Entropy and ΔG',
  thumbnail: 'df',
  summary:
    'A test-style question, solved one small step at a time: why is the entropy change for the decomposition of calcium carbonate positive, what is it, and at what temperature does the reaction become feasible? A solid makes a gas, so the entropy rises; ΔS = 40 + 214 − 93 = +161 J K⁻¹ mol⁻¹; and ΔG = 0 when T = ΔH ÷ ΔS = 178 ÷ 0.161 ≈ 1106 K.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Entropy and ΔG', subtitle: 'When does calcium carbonate decompose?' }],
      lines: [
        { say: 'In this video, we solve a test-style question about entropy and Gibbs free energy. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'A gas forms; +161 J K⁻¹ mol⁻¹; about 1106 K' }],
      lines: [
        { say: 'Here is the question. Calcium carbonate decomposes when heated to calcium oxide and carbon dioxide gas. The enthalpy change is plus 178 kilojoules per mole. The standard entropies, in joules per kelvin per mole, are 93 for calcium carbonate, 40 for calcium oxide and 214 for carbon dioxide. Part a: without calculation, explain why the entropy change for this reaction is positive. Part b: calculate the entropy change, delta S. Part c: calculate the lowest temperature at which the reaction is feasible.', caption: 'Here is the question. Calcium carbonate decomposes when heated: CaCO₃(s) → CaO(s) + CO₂(g), ΔH = +178 kJ mol⁻¹. The standard entropies, in J K⁻¹ mol⁻¹, are CaCO₃(s) 93, CaO(s) 40 and CO₂(g) 214. Part a: without calculation, explain why the entropy change for this reaction is positive. Part b: calculate the entropy change, ΔS. Part c: calculate the lowest temperature at which the reaction is feasible.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Find **ΔS**, then the temperature where **ΔG** reaches **zero**' }],
      lines: [
        { say: 'The reaction takes in heat, which works against it, but it makes a gas, which works for it. We find the temperature where the two balance, where delta G is zero.', caption: 'The reaction takes in heat, which works against it, but it makes a gas, which works for it. We find the temperature where the two balance, where ΔG is zero.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(entropy, 'df')],
      lines: [
        { say: 'Here is what we need. Here are two gases and two liquids, each pair kept apart by a wall.', show: ['df', 'df.labels'] },
        { say: 'Watch the walls lift. The gas particles spread out far more than the liquid ones. Gases have many more ways to arrange their particles and energy, so they have much more entropy.', play: 'df.lift' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Gases** have far more entropy than solids', 'ΔS = products − reactants', 'Feasible when **ΔG = ΔH − TΔS ≤ 0**'] }],
      lines: [
        { say: 'Here is the plan. Gases have far more entropy than solids.', show: 'plan.0' },
        { say: 'The entropy change is the total for the products minus the total for the reactants.', show: 'plan.1' },
        { say: 'And a reaction is feasible when delta G, which is delta H minus T delta S, is zero or negative.', caption: 'And a reaction is feasible when ΔG = ΔH − TΔS is zero or negative.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Why ΔS is positive',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Reactants: **one solid**', 'Products: a solid and a **gas**', 'More ways to arrange: **entropy increases**'] }],
      lines: [
        { say: 'Step one. On the left there is only a solid, calcium carbonate.', show: 's.0' },
        { say: 'On the right there is a solid and a gas, carbon dioxide.', show: 's.1' },
        { say: 'Gas particles are free to move and spread out, so there are many more ways to arrange them, and the entropy increases. That is part a.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 2: Calculate ΔS',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\Delta S = (40 + 214) - 93', '\\good{\\Delta S = +161 \\text{ J K}^{-1}\\text{ mol}^{-1}}'] }],
      lines: [
        { say: 'Step two. The products have 40 plus 214, which is 254. The reactant has 93.', show: 'm.0' },
        { say: '254 minus 93 is plus 161 joules per kelvin per mole. That is part b.', caption: '254 − 93 = +161 J K⁻¹ mol⁻¹. That is part b.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The lowest temperature',
      layout: 'center',
      main: [{ kind: 'math', id: 't', size: 'md', lines: ['\\Delta S = 161 \\div 1000 = 0.161 \\text{ kJ K}^{-1}\\text{ mol}^{-1}', '\\Delta G = 0 \\Rightarrow T = \\dfrac{\\Delta H}{\\Delta S} = \\dfrac{178}{0.161}', '\\good{T \\approx 1106 \\text{ K}}'] }],
      lines: [
        { say: 'Step three. Delta H is in kilojoules, so first we turn delta S into kilojoules too: 161 divided by 1,000 is 0.161.', caption: 'Step three. ΔH is in kJ, so first we turn ΔS into kJ too: 161 ÷ 1000 = 0.161 kJ K⁻¹ mol⁻¹.', show: 't.0' },
        { say: 'The reaction just becomes feasible when delta G is zero, so delta H equals T delta S, and T is delta H divided by delta S: 178 divided by 0.161.', caption: 'The reaction just becomes feasible when ΔG = 0, so ΔH = TΔS, and T = ΔH ÷ ΔS = 178 ÷ 0.161.', show: 't.1' },
        { say: 'That is about 1,106 kelvin. Above this temperature, delta G is negative and the reaction is feasible. That is part c.', caption: 'That is about 1106 K. Above this temperature, ΔG is negative and the reaction is feasible. That is part c.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) A **gas** forms from a **solid**, so there are more ways to arrange the particles. (b) **ΔS = +161 J K⁻¹ mol⁻¹**. (c) **T ≈ 1106 K**.' },
      ],
      lines: [
        { say: 'Does it make sense? Limestone has to be heated very strongly in a kiln to make lime, and 1,106 kelvin is about 830 degrees Celsius.', caption: 'Does it make sense? Limestone has to be heated very strongly in a kiln to make lime, and 1106 K is about 830 °C.', show: 'ans' },
        { say: 'So a gas forming makes delta S positive, delta S is plus 161, and the reaction becomes feasible at about 1,106 kelvin.', caption: 'So a gas forming makes ΔS positive, ΔS is +161 J K⁻¹ mol⁻¹, and the reaction becomes feasible at about 1106 K.' },
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
            ['T = 178 ÷ 161 ≈ **1.1 K**', 'Turn ΔS into **kJ** first'],
            ['ΔS = 93 − 254 = **−161**', 'Products **minus** reactants'],
            ['Feasible at **all** temperatures', 'ΔH is **positive**, so T matters'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Dividing kilojoules by joules gives an answer a thousand times too small. Always match the units.', focus: 'traps.0' },
        { say: 'The entropy change is products minus reactants, so it is positive here.', focus: 'traps.1' },
        { say: 'And with a positive delta H, delta G is only negative once T delta S is bigger than delta H.', caption: 'And with a positive ΔH, ΔG is only negative once TΔS is bigger than ΔH.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which change has a negative entropy change?',
          choices: ['ice melting', 'steam condensing', 'water evaporating', 'a gas spreading out'],
          answer: 1,
          working: 'When steam condenses, a gas becomes a liquid, so there are fewer ways to arrange the particles.',
        },
      ],
      lines: [
        { say: 'Your turn. Which change has a negative entropy change? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'When steam condenses, a gas becomes a liquid, so the particles have fewer ways to be arranged: choice B.', show: 'q2.answer' },
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
          items: ['A gas forming: **ΔS positive**', 'ΔS = products − reactants', 'Lowest T: **T = ΔH ÷ ΔS**, both in kJ'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A reaction that makes a gas from a solid has a positive entropy change.', show: 'sum.0' },
        { say: 'The entropy change is the products minus the reactants.', show: 'sum.1' },
        { say: 'And the lowest temperature for feasibility is delta H divided by delta S, with both in kilojoules. For more, watch this lesson\'s explainer video on Gradileo.', caption: 'And the lowest temperature for feasibility is ΔH ÷ ΔS, with both in kJ. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
