import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import fromEquation from '@/content/chem30/videos/c30-1-4-b.ts';
import exoEndo from '@/content/chem30/videos/c30-1-1-c.ts';
import { twoLevels } from '@/content/chem30/videos/lib/c30-1a-figures.ts';

// Exam question for Chemistry 30 lesson 1.4 (communicating enthalpy changes): the combustion of
// propane, with delta-rH = -2043.9 kJ stated in the question. Write it with an energy term, give the
// molar enthalpy per mole of oxygen, describe its enthalpy diagram, and find the heat from 11.0 g of
// propane. Gradileo's own question, with every value it needs stated in it. The answer: the energy
// term 2043.9 kJ goes with the products; -2043.9 / 5 = -408.8 kJ/mol of O2; the reactants sit above
// the products with the arrow pointing down; and 11.0 / 44.11 = 0.2494 mol releases 510 kJ.
//
// The pictures are atoms drawn as balls (src/video/molecules.ts): the lesson's hydrogen burning, two
// molecules for every one of oxygen; simulated particles (src/video/particles.ts): an exothermic
// reaction warming its water beside an endothermic one cooling it; and the enthalpy diagram itself.

/** The enthalpy diagram of burning propane: the products 2043.9 kJ below the reactants. */
const diagram = figure('d', [twoLevels({ reactants: '\\ce{C3H8 + 5O2}', products: '\\ce{3CO2 + 4H2O}', exo: true, label: '-2043.9\\ \\text{kJ}' })], 380);

const EQUATION = '\\ce{C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(g)}';

const QUESTION =
  'Propane burns in a barbecue: C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(g), ΔrH = -2043.9 kJ. (a) Rewrite the equation with the energy as a term in it. (b) What is the molar enthalpy of combustion per mole of oxygen? (c) Describe the enthalpy diagram for this reaction. (d) How much heat does burning 11.0 g of propane release? Use M(C3H8) = 44.11 g/mol.';

const video: Explainer = {
  id: 'xq-c30-1-4',
  lessonId: '',
  exam: {
    lesson: 'c30-1-4',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Four Ways to Write the Energy of Burning Propane. Communicating Enthalpy Changes',
  thumbnailTitle: 'The Energy of Burning Propane',
  thumbnail: 'd',
  summary:
    'A test-style question, solved one small step at a time: propane burns with ΔrH = −2043.9 kJ. We write the energy as a term in the equation, find the molar enthalpy per mole of oxygen, describe the enthalpy diagram, and find the 510 kJ released by 11.0 g of propane.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Energy of Burning Propane', subtitle: 'An energy term, a molar enthalpy and a diagram' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the different ways of writing an energy change. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a high school chemistry unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt:
            `Propane burns in a barbecue: $${EQUATION}$, $\\Delta_r H = -2043.9\\ \\text{kJ}$. (a) Rewrite the equation with the energy as a term. (b) What is the molar enthalpy of combustion per mole of oxygen? (c) Describe its enthalpy diagram. (d) How much heat does $11.0\\ \\text{g}$ of propane release? Use $M = 44.11\\ \\text{g/mol}$.`,
          answer: '(a) … + 2043.9 kJ on the products side (b) −408.8 kJ/mol (c) reactants above products, arrow down (d) 510 kJ',
        },
      ],
      lines: [
        { say: 'Here is the question. Propane burns in a barbecue: propane and five oxygen give three carbon dioxide and four water, with delta r H equal to minus two thousand and forty three point nine kilojoules.', show: 'q', caption: 'Here is the question. Propane burns in a barbecue: C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(g), ΔrH = −2043.9 kJ.' },
        { say: 'Part a: rewrite the equation with the energy as a term. Part b: what is the molar enthalpy of combustion per mole of oxygen? Part c: describe the enthalpy diagram. Part d: how much heat does eleven point zero grams of propane release?', caption: '(a) Rewrite the equation with the energy as a term. (b) What is the molar enthalpy of combustion per mole of oxygen? (c) Describe its enthalpy diagram. (d) How much heat does 11.0 g of propane release? Use M = 44.11 g/mol.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'One energy change, written **four ways**: a term in the equation, a **molar enthalpy**, a **diagram**, and a **heat** for a given mass' }],
      lines: [
        { say: 'All four parts describe the same energy change. Each one asks us to show it in a different way.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(fromEquation, 'hb'), { kind: 'math', id: 'k', size: 'md', lines: ['\\Delta_r H \\text{ is for the equation as written} \\qquad \\Delta_r H_m = \\dfrac{\\Delta_r H}{\\text{coefficient}}'] }],
      lines: [
        { say: 'Here is what we need. Two hydrogen molecules and one oxygen molecule. Watch them react to make two water molecules.', show: 'hb', play: 'hb.go' },
        { say: 'The coefficients are the amounts that react. Delta r H is the energy change for exactly those amounts, as the equation is written.', caption: 'The coefficients are the amounts that react. ΔrH is the energy change for exactly those amounts, as the equation is written.' },
        { say: 'So to get a molar enthalpy for one substance, divide delta r H by that substance\'s coefficient.', show: 'k.0', caption: 'So to get a molar enthalpy for one substance, divide ΔrH by that substance\'s coefficient.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Negative $\\Delta_r H$: energy is **released**, so it goes with the **products**', 'Divide by the coefficient of **oxygen**', 'Products **below** reactants; scale $\\Delta_r H$ to the **moles** of propane'] }],
      lines: [
        { say: 'Here is the plan. Delta r H is negative, so energy is released, and the energy term goes with the products.', show: 'plan.0', caption: 'Here is the plan. ΔrH is negative, so energy is released, and the energy term goes with the products.' },
        { say: 'For part b, divide by the coefficient of oxygen.', show: 'plan.1' },
        { say: 'For parts c and d, put the products below the reactants on the diagram, and scale delta r H to the moles of propane.', show: 'plan.2', caption: 'For parts c and d, put the products below the reactants on the diagram, and scale ΔrH to the moles of propane.' },
      ],
    },
    {
      chapter: 'Step 1: The energy term',
      layout: 'center',
      main: [pick(exoEndo, 'hc'), { kind: 'math', id: 'a', size: 'md', lines: ['\\ce{C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(g)} + \\good{2043.9\\ \\text{kJ}}'] }],
      lines: [
        { say: 'Step one. Here are two reactions side by side. Watch the thermometers.', show: ['hc', 'hc.labels', 'hc.thermo'], play: 'hc.mix' },
        { say: 'On the left, energy comes out with the products, and the water warms. That is an exothermic reaction, like burning propane.' },
        { say: 'So the energy is written as a product: plus two thousand and forty three point nine kilojoules on the right. An energy term never carries a minus sign.', show: 'a.0', focus: 'a.0', caption: 'So the energy is written as a product: + 2043.9 kJ on the right. An energy term never carries a minus sign.' },
      ],
    },
    {
      chapter: 'Step 2: Per mole of oxygen',
      layout: 'center',
      main: [{ kind: 'math', id: 'b', size: 'lg', lines: ['\\Delta_c H_m(\\ce{O2}) = \\dfrac{-2043.9\\ \\text{kJ}}{5\\ \\text{mol}} = \\good{-408.8\\ \\text{kJ/mol}}'] }],
      lines: [
        { say: 'Step two. Five moles of oxygen react in the equation as written, so divide by five: minus four hundred and eight point eight kilojoules per mole of oxygen.', show: 'b.0', focus: 'b.0', caption: 'Step two. Five moles of O₂ react in the equation as written, so divide by 5: −2043.9 ÷ 5 = −408.8 kJ/mol of O₂.' },
      ],
    },
    {
      chapter: 'Step 3: The enthalpy diagram',
      layout: 'center',
      main: [diagram],
      lines: [
        { say: 'Step three. Draw an enthalpy axis. The reactants, propane and oxygen, go on the upper line.', show: ['d.axis', 'd.r'] },
        { say: 'The products, carbon dioxide and water, go on the lower line, because energy was released.', show: 'd.p' },
        { say: 'An arrow points down from the reactants to the products, labelled delta r H equals minus two thousand and forty three point nine kilojoules.', show: 'd.dh', focus: 'd.dh', caption: 'An arrow points down from the reactants to the products, labelled ΔrH = −2043.9 kJ.' },
      ],
    },
    {
      chapter: 'Step 4: Heat from 11.0 g',
      layout: 'center',
      main: [{ kind: 'math', id: 'd', size: 'lg', lines: ['n = \\dfrac{11.0}{44.11} = 0.2494\\ \\text{mol}', '\\Delta H = 0.2494 \\times (-2043.9) = -510\\ \\text{kJ}', '\\good{510\\ \\text{kJ released}}'] }],
      lines: [
        { say: 'Step four. Eleven point zero grams of propane is zero point two four nine four moles.', show: 'd.0', caption: 'Step four. 11.0 g of propane is 11.0 ÷ 44.11 = 0.2494 mol.' },
        { say: 'The equation has one mole of propane, so each mole gives minus two thousand and forty three point nine kilojoules. Multiply: minus five hundred and ten kilojoules.', show: 'd.1', caption: 'The equation has one mole of propane, so each mole gives −2043.9 kJ. Multiply: 0.2494 × (−2043.9) = −510 kJ.' },
        { say: 'So the propane releases five hundred and ten kilojoules of heat.', show: 'd.2', focus: 'd.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'k2',
          head: ['Part', 'Answer'],
          rows: [
            ['(a)', '$\\ce{C3H8 + 5O2 -> 3CO2 + 4H2O} + 2043.9\\ \\text{kJ}$'],
            ['(b)', '$-408.8\\ \\text{kJ/mol}$ of oxygen'],
            ['(c)', 'Reactants **above** products, arrow **down**, $\\Delta_r H = -2043.9\\ \\text{kJ}$'],
            ['(d)', '$510\\ \\text{kJ}$ released'],
          ],
        },
      ],
      lines: [
        { say: 'Here are all four answers together.', show: ['k2', 'k2.0', 'k2.1', 'k2.2', 'k2.3'] },
        { say: 'Does part d make sense? Eleven grams is a quarter of a mole, and a quarter of about two thousand kilojoules is about five hundred. It does.', focus: 'k2.3' },
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
            ['$\\ldots + (-2043.9\\ \\text{kJ})$', 'Put the **minus sign** on the energy term'],
            ['$-2043.9\\ \\text{kJ/mol}$ of oxygen', 'Did not divide by the **coefficient**, 5'],
            ['$-22\\,500\\ \\text{kJ}$', 'Multiplied by the **grams**, not the moles'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Writing a negative energy term. Its side of the equation already says the energy is released, so the term itself is always positive.', focus: 'traps.0' },
        { say: 'Giving minus two thousand and forty three point nine per mole of oxygen. That is per mole of propane. Five moles of oxygen share it.', focus: 'traps.1', caption: 'Giving −2043.9 kJ/mol of oxygen. That is per mole of propane. Five moles of O₂ share it.' },
        { say: 'And minus twenty two thousand five hundred comes from multiplying by eleven grams. Delta r H is per mole of propane, so the mass must become moles first.', focus: 'traps.2', caption: 'And −22 500 kJ comes from multiplying by 11.0 g. ΔrH is per mole of propane, so the mass must become moles first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'For $\\ce{N2(g) + 3H2(g) -> 2NH3(g)}$, $\\Delta_r H = -91.8\\ \\text{kJ}$. What is the molar enthalpy per mole of ammonia?',
          choices: ['$-91.8\\ \\text{kJ/mol}$', '$-183.6\\ \\text{kJ/mol}$', '$-45.9\\ \\text{kJ/mol}$', '$+45.9\\ \\text{kJ/mol}$'],
          answer: 2,
          working: 'Two moles of $\\ce{NH3}$ form in the equation as written: $\\dfrac{-91.8}{2} = -45.9\\ \\text{kJ/mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. For nitrogen and three hydrogen giving two ammonia, delta r H is minus ninety one point eight kilojoules. What is the molar enthalpy per mole of ammonia? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. For N₂(g) + 3H₂(g) → 2NH₃(g), ΔrH = −91.8 kJ. What is the molar enthalpy per mole of ammonia? Pause the video and try it.' },
        { say: 'Two moles of ammonia form in the equation as written, so divide by two: minus forty five point nine kilojoules per mole: choice C.', show: 'q2.answer', caption: 'Two moles of NH₃ form in the equation as written, so divide by 2: −45.9 kJ/mol: choice C.' },
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
          items: ['Exothermic: energy term with the **products**, always **positive**', 'Molar enthalpy $= \\dfrac{\\Delta_r H}{\\text{coefficient}}$', 'Exothermic diagram: products **below**, arrow **down**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In an exothermic reaction, the energy term goes with the products, and it is always written positive.', show: 'sum.0' },
        { say: 'A molar enthalpy is delta r H divided by that substance\'s coefficient.', show: 'sum.1', caption: 'A molar enthalpy is ΔrH divided by that substance\'s coefficient.' },
        { say: 'And on an exothermic enthalpy diagram, the products sit below the reactants, with the arrow pointing down. For more, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
