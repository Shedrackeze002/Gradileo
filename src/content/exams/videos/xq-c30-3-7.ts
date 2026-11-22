import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import combustion from '@/content/chem30/videos/c30-3-7-c.ts';

// Exam question for Chemistry 30 lesson 3.7 (fossil fuels and combustion): balance the complete
// combustion of octane, then find the mass of carbon dioxide from 100.0 g of octane. Written by
// Gradileo in the style of a high-school unit test, with every molar mass the student needs.
// 2 C8H18 + 25 O2 -> 16 CO2 + 18 H2O; n = 100.0 / 114.22 = 0.8755 mol of octane,
// CO2 = 0.8755 x 16/2 = 7.004 mol, m = 7.004 x 44.01 = 308.2 g.
//
// The picture is the lesson's methane burning drawn atom by atom (src/video/molecules.ts): every
// bond breaks, the carbon ends up in carbon dioxide and the hydrogens in water.

const QUESTION = 'Octane, C8H18 (114.22 g/mol), is a component of gasoline. (a) Write the balanced equation for the complete combustion of octane. (b) What mass of carbon dioxide (44.01 g/mol) forms when 100.0 g of octane burns completely?';

const video: Explainer = {
  id: 'xq-c30-3-7',
  lessonId: '',
  exam: {
    lesson: 'c30-3-7',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Burning Octane. Fossil Fuels and Combustion',
  thumbnailTitle: 'Burning Octane',
  thumbnail: 'mb',
  summary:
    'A test-style question, solved one small step at a time: balance the complete combustion of octane, then find the mass of carbon dioxide from 100.0 g of octane. We balance carbon, then hydrogen, then oxygen, doubling to clear the half: 2 C8H18 + 25 O2 → 16 CO2 + 18 H2O. Then 8 moles of CO2 for every mole of octane gives 308.2 g.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Burning Octane', subtitle: 'A balanced equation, and the carbon dioxide it makes' }],
      lines: [
        { say: 'In this video, we solve a test-style question about burning gasoline. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'Octane, $\\ce{C8H18}$ $(114.22\\ \\text{g/mol})$, is a component of gasoline. (a) Write the balanced equation for the complete combustion of octane. (b) What mass of carbon dioxide $(44.01\\ \\text{g/mol})$ forms when $100.0\\ \\text{g}$ of octane burns completely?',
          answer: '2 C8H18 + 25 O2 → 16 CO2 + 18 H2O; 308.2 g of CO2',
        },
      ],
      lines: [
        { say: 'Here is the question. Octane, C eight H eighteen, one hundred and fourteen point two two grams per mole, is a component of gasoline. Part a: write the balanced equation for the complete combustion of octane. Part b: what mass of carbon dioxide, forty four point zero one grams per mole, forms when one hundred point zero grams of octane burns completely?', show: 'q', caption: 'Here is the question. Octane, C₈H₁₈ (114.22 g/mol), is a component of gasoline. (a) Write the balanced equation for the complete combustion of octane. (b) What mass of CO₂ (44.01 g/mol) forms when 100.0 g of octane burns completely?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'First **balance** the burning, then use its **mole ratio** to turn grams of octane into grams of $\\ce{CO2}$' }],
      lines: [
        { say: 'Part a is a balancing job. Part b needs the balanced equation from part a, because its coefficients give the mole ratio between octane and carbon dioxide.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(combustion, 'mb'), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{fuel} + \\ce{O2} \\to \\ce{CO2} + \\ce{H2O}'] }],
      lines: [
        { say: 'Here is what we need. Here is complete combustion up close, with the simplest fuel, methane, and two oxygen molecules.', show: 'mb' },
        { say: 'Every bond breaks, and the atoms join up again. The carbon atom ends up in carbon dioxide, and the four hydrogen atoms in two water molecules.', play: 'mb.burn' },
        { say: 'Octane burns the same way, with plenty of oxygen: every carbon ends up in carbon dioxide, and every hydrogen in water.', show: 'k.0', caption: 'Octane burns the same way, with plenty of oxygen: fuel + O₂ → CO₂ + H₂O.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Balance **carbon**, then **hydrogen**, then **oxygen**', 'Change grams of octane to **moles**', 'Use the **ratio** from the equation, then the molar mass of $\\ce{CO2}$'] }],
      lines: [
        { say: 'Here is the plan. Balance carbon first, then hydrogen, and oxygen last, because oxygen appears on its own as O two.', show: 'plan.0' },
        { say: 'Then change the grams of octane to moles.', show: 'plan.1' },
        { say: 'Then use the ratio from the balanced equation, and the molar mass of carbon dioxide to get grams.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Carbon and hydrogen',
      layout: 'center',
      main: [{ kind: 'math', id: 'b', size: 'md', lines: ['\\ce{C8H18 + ?O2 -> 8CO2 + ?H2O}', '\\ce{C8H18 + ?O2 -> 8CO2 + 9H2O}'] }],
      lines: [
        { say: 'Step one. One octane molecule has eight carbon atoms, and each carbon dioxide holds one, so we need eight carbon dioxide molecules.', show: 'b.0', caption: 'Step one. One octane has 8 carbon atoms, and each CO₂ holds one, so 8 CO₂.' },
        { say: 'It has eighteen hydrogen atoms, and each water holds two, so we need nine water molecules.', show: 'b.1', focus: 'b.1', caption: 'It has 18 hydrogen atoms, and each H₂O holds two, so 9 H₂O.' },
      ],
    },
    {
      chapter: 'Step 2: Oxygen',
      layout: 'center',
      main: [{ kind: 'math', id: 'o', size: 'md', lines: ['8(2) + 9(1) = 25\\ \\text{O atoms} = \\tfrac{25}{2}\\ \\ce{O2}', '\\ce{2C8H18 + 25O2 -> 16CO2 + 18H2O}'] }],
      lines: [
        { say: 'Step two. Count the oxygen atoms on the right: sixteen in the eight carbon dioxides and nine in the nine waters, twenty five in all. That would need twenty five halves of an O two.', show: 'o.0', caption: 'Step two. Oxygen on the right: 8(2) + 9(1) = 25 atoms, which would need 25/2 O₂.' },
        { say: 'Half a molecule is not allowed, so we double everything: two octane and twenty five oxygen give sixteen carbon dioxide and eighteen water. That is part a.', show: 'o.1', focus: 'o.1', caption: 'Half a molecule is not allowed, so double everything: 2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O. That is part a.' },
      ],
    },
    {
      chapter: 'Step 3: Moles of octane',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'lg', lines: ['n = \\dfrac{100.0}{114.22} = 0.8755\\ \\text{mol}', '0.8755 \\times \\dfrac{16}{2} = \\good{7.004\\ \\text{mol CO}_2}'] }],
      lines: [
        { say: 'Step three. One hundred point zero grams divided by one hundred and fourteen point two two is zero point eight seven five five moles of octane.', show: 'n.0', caption: 'Step three. 100.0 g ÷ 114.22 g/mol = 0.8755 mol of octane.' },
        { say: 'The equation says two octane give sixteen carbon dioxide, which is eight for every one. Zero point eight seven five five times eight is seven point zero zero four moles of carbon dioxide.', show: 'n.1', focus: 'n.1', caption: 'Two octane give sixteen CO₂, which is 8 for every 1. 0.8755 × 8 = 7.004 mol of CO₂.' },
      ],
    },
    {
      chapter: 'Step 4: Grams of carbon dioxide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m = 7.004 \\times 44.01 = \\good{308.2\\ \\text{g}}'] }],
      lines: [
        { say: 'Step four. Seven point zero zero four moles times forty four point zero one grams per mole is three hundred and eight point two grams of carbon dioxide. That is part b.', show: 'm.0', focus: 'm.0', caption: 'Step four. 7.004 mol × 44.01 g/mol = 308.2 g of CO₂. That is part b.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\text{C: } 2(8) = 16 \\quad \\text{H: } 2(18) = 18(2) \\quad \\text{O: } 25(2) = 16(2) + 18'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$\\ce{2C8H18 + 25O2 -> 16CO2 + 18H2O}$, and **308.2 g** of carbon dioxide.' },
      ],
      lines: [
        { say: 'Does it balance? Sixteen carbons on each side. Thirty six hydrogens on each side. And fifty oxygen atoms on each side.', show: 'x.0', caption: 'Does it balance? Carbon: 16 on each side. Hydrogen: 36 on each side. Oxygen: 50 on each side.' },
        { say: 'And the mass makes sense: the carbon dioxide holds all the octane\'s carbon plus a lot of oxygen, so it weighs about three times as much as the fuel. So the answer is the balanced equation, and three hundred and eight point two grams of carbon dioxide.', show: 'ans', caption: 'And the mass makes sense: the CO₂ holds all the carbon plus a lot of oxygen, so about three times the fuel\'s mass. The answer: the balanced equation, and 308.2 g of CO₂.' },
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
            ['$38.5\\ \\text{g}$', 'Used a **1 : 1** ratio, with no equation'],
            ['$616.5\\ \\text{g}$', 'Used **16 : 1**, forgetting the **2** in front of octane'],
            ['$7.004$', 'Stopped at **moles**; the question asks for a **mass**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Thirty eight point five grams uses one carbon dioxide for each octane. Each octane has eight carbons, so it makes eight.', focus: 'traps.0', caption: '38.5 g uses one CO₂ for each octane. Each octane has eight carbons, so it makes eight.' },
        { say: 'Six hundred and sixteen point five grams reads sixteen carbon dioxides per octane. The sixteen belongs to two octanes, so it is eight per octane.', focus: 'traps.1', caption: '616.5 g reads 16 CO₂ per octane. The 16 belongs to two octanes, so it is 8 per octane.' },
        { say: 'And seven point zero zero four is the moles. The last step turns them into grams.', focus: 'traps.2', caption: 'And 7.004 is the moles. The last step turns them into grams.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Propane burns completely: $\\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}$. From $22.0\\ \\text{g}$ of propane $(44.09\\ \\text{g/mol})$, what mass of $\\ce{CO2}$ $(44.01\\ \\text{g/mol})$ forms?',
          choices: ['$22.0\\ \\text{g}$', '$110\\ \\text{g}$', '$65.9\\ \\text{g}$', '$1.50$'],
          answer: 2,
          working: '$22.0 \\div 44.09 = 0.4990$ mol, $\\times 3 = 1.497$ mol, and $1.497 \\times 44.01 = 65.9\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Propane burns completely: one propane and five oxygen give three carbon dioxide and four water. What mass of carbon dioxide, forty four point zero one grams per mole, forms from twenty two point zero grams of propane, forty four point zero nine grams per mole? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Propane burns completely: C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O. What mass of CO₂ (44.01 g/mol) forms from 22.0 g of propane (44.09 g/mol)? Pause the video and try it.' },
        { say: 'Twenty two point zero over forty four point zero nine is zero point four nine nine zero moles of propane. Three carbon dioxides each makes one point four nine seven moles, and times forty four point zero one is sixty five point nine grams: choice C.', show: 'q2.answer', caption: '22.0 ÷ 44.09 = 0.4990 mol of propane. × 3 = 1.497 mol of CO₂, × 44.01 = 65.9 g: choice C.' },
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
          items: ['Balance **carbon**, then **hydrogen**, then **oxygen**', 'A half $\\ce{O2}$? **Double** everything', 'Take the **mole ratio** from the balanced equation'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. To balance a combustion, do carbon first, then hydrogen, and oxygen last.', show: 'sum.0' },
        { say: 'If oxygen comes out as a half, double every coefficient.', show: 'sum.1' },
        { say: 'Then the mole ratio comes straight from the balanced equation, so read it carefully. For more on fossil fuels and combustion, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
