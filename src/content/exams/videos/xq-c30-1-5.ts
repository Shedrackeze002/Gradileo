import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import reversing from '@/content/chem30/videos/c30-1-5.ts';
import oneStep from '@/content/chem30/videos/c30-1-5-b.ts';
import threeEquations from '@/content/chem30/videos/c30-1-5-d.ts';

// Exam question for Chemistry 30 lesson 1.5 (Hess's law): the enthalpy of formation of propane,
// 3C(s) + 4H2(g) -> C3H8(g), from the combustions of carbon, hydrogen and propane, with their
// enthalpy changes stated in the question. Gradileo's own question. The answer: reverse the propane
// combustion (+2219.9 kJ), take three of the carbon equation (-1180.5 kJ) and four of the hydrogen
// equation (-1143.2 kJ); the oxygen, carbon dioxide and water cancel, and delta H = -103.8 kJ.
//
// The pictures are atoms drawn as balls (src/video/molecules.ts) from the lesson: water splitting,
// the reverse of hydrogen burning; carbon burning to carbon dioxide; and carbon and hydrogen joining
// as methane, the same kind of change as this question's target.

const QUESTION =
  "Use Hess's law and these equations to find ΔH for 3C(s) + 4H2(g) -> C3H8(g). (1) C(s) + O2(g) -> CO2(g), ΔH = -393.5 kJ. (2) H2(g) + 1/2 O2(g) -> H2O(l), ΔH = -285.8 kJ. (3) C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l), ΔH = -2219.9 kJ.";

const GIVEN = [
  '(1)\\ \\ \\ce{C(s) + O2(g) -> CO2(g)} \\quad \\Delta H = -393.5\\ \\text{kJ}',
  '(2)\\ \\ \\ce{H2(g) + 1/2 O2(g) -> H2O(l)} \\quad \\Delta H = -285.8\\ \\text{kJ}',
  '(3)\\ \\ \\ce{C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)} \\quad \\Delta H = -2219.9\\ \\text{kJ}',
];

const video: Explainer = {
  id: 'xq-c30-1-5',
  lessonId: '',
  exam: {
    lesson: 'c30-1-5',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: "Exam Question: The Enthalpy of Forming Propane. Hess's Law",
  thumbnailTitle: 'The Enthalpy of Forming Propane',
  thumbnail: 'me',
  summary:
    "A test-style question, solved one small step at a time: find ΔH for making propane from carbon and hydrogen, using three combustion equations. We reverse the propane equation, multiply the carbon and hydrogen equations, check that everything else cancels, and add the enthalpy changes to get −103.8 kJ.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Enthalpy of Forming Propane', subtitle: "Hess's law with three equations, step by step" }],
      lines: [
        { say: 'In this video, we solve a test-style question about Hess\'s law. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a high school chemistry unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: "Use Hess's law and these equations to find $\\Delta H$ for $\\ce{3C(s) + 4H2(g) -> C3H8(g)}$." },
        { kind: 'math', id: 'g', size: 'md', lines: GIVEN },
      ],
      lines: [
        { say: 'Here is the question. Use Hess\'s law and three equations to find delta H for three carbon plus four hydrogen giving propane, C three H eight.', show: 'q', caption: 'Here is the question. Use Hess\'s law and these equations to find ΔH for 3C(s) + 4H₂(g) → C₃H₈(g).' },
        { say: 'Equation one: carbon burns to carbon dioxide, minus three hundred and ninety three point five kilojoules. Equation two: hydrogen burns to water, minus two hundred and eighty five point eight.', show: ['g.0', 'g.1'], caption: '(1) C(s) + O₂(g) → CO₂(g), ΔH = −393.5 kJ. (2) H₂(g) + ½O₂(g) → H₂O(l), ΔH = −285.8 kJ.' },
        { say: 'Equation three: propane burns to carbon dioxide and water, minus two thousand two hundred and nineteen point nine.', show: 'g.2', caption: '(3) C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l), ΔH = −2219.9 kJ.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [pick(threeEquations, 'me'), { kind: 'text', id: 'plain', size: 'md', md: 'Build the **target** from the three equations, then **add** their $\\Delta H$ values' }],
      lines: [
        { say: 'Here, carbon and hydrogen join to make methane. Our target is the same kind of change, carbon and hydrogen making propane, but no one can measure it directly.', show: 'me', play: 'me.go' },
        { say: 'So we rearrange the three given equations until they add up to the target, and add their enthalpy changes in the same way.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(reversing, 'ws'), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{reverse: change the sign} \\qquad \\text{multiply by } k\\text{: multiply } \\Delta H \\text{ by } k'] }],
      lines: [
        { say: 'Here is what we need. Two water molecules split into hydrogen and oxygen. That is hydrogen burning, run backwards.', show: 'ws', play: 'ws.go' },
        { say: 'Burning hydrogen releases energy, so splitting water takes the same energy in. Reverse an equation, and delta H changes sign. Multiply an equation by a number, and delta H is multiplied by it too.', show: 'k.0', caption: 'Burning hydrogen releases energy, so splitting water takes the same energy in. Reverse an equation, and ΔH changes sign. Multiply an equation by a number, and ΔH is multiplied by it too.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put each **target substance** on the correct side, in the correct amount', 'Check that everything else **cancels**', '**Add** the adjusted $\\Delta H$ values'] }],
      lines: [
        { say: 'Here is the plan. Look at each substance in the target, and get it on the correct side, in the correct amount.', show: 'plan.0' },
        { say: 'Then check that everything else cancels out when the equations are added.', show: 'plan.1' },
        { say: 'Then add the adjusted enthalpy changes.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Propane on the right',
      layout: 'center',
      main: [{ kind: 'math', id: 'a', size: 'md', lines: [GIVEN[2], '\\text{reverse: } \\ce{3CO2(g) + 4H2O(l) -> C3H8(g) + 5O2(g)} \\quad \\good{+2219.9\\ \\text{kJ}}'] }],
      lines: [
        { say: 'Step one. Propane is a product in the target, but a reactant in equation three.', show: 'a.0', caption: 'Step one. C₃H₈ is a product in the target, but a reactant in equation (3).' },
        { say: 'So reverse equation three. Propane moves to the right, and delta H changes sign to plus two thousand two hundred and nineteen point nine kilojoules.', show: 'a.1', focus: 'a.1', caption: 'So reverse equation (3). C₃H₈ moves to the right, and ΔH changes sign to +2219.9 kJ.' },
      ],
    },
    {
      chapter: 'Step 2: Three carbon',
      layout: 'center',
      main: [pick(oneStep, 'co'), { kind: 'math', id: 'b', size: 'md', lines: ['3 \\times (1):\\ \\ \\ce{3C(s) + 3O2(g) -> 3CO2(g)}', '3(-393.5) = \\good{-1180.5\\ \\text{kJ}}'] }],
      lines: [
        { say: 'Step two. Here is equation one: a carbon atom and an oxygen molecule join as carbon dioxide.', show: 'co', play: 'co.go' },
        { say: 'The target needs three carbon on the left, so multiply equation one by three. Delta H becomes three times minus three hundred and ninety three point five, which is minus one thousand one hundred and eighty point five kilojoules.', show: ['b.0', 'b.1'], focus: 'b.1', caption: 'The target needs 3C on the left, so multiply equation (1) by 3. ΔH becomes 3 × (−393.5) = −1180.5 kJ.' },
      ],
    },
    {
      chapter: 'Step 3: Four hydrogen',
      layout: 'center',
      main: [{ kind: 'math', id: 'c', size: 'md', lines: ['4 \\times (2):\\ \\ \\ce{4H2(g) + 2O2(g) -> 4H2O(l)}', '4(-285.8) = \\good{-1143.2\\ \\text{kJ}}'] }],
      lines: [
        { say: 'Step three. The target needs four hydrogen molecules on the left, so multiply equation two by four. Four halves of an oxygen molecule make two.', show: 'c.0', caption: 'Step three. The target needs 4H₂ on the left, so multiply equation (2) by 4. Four halves of O₂ make 2O₂.' },
        { say: 'Delta H becomes four times minus two hundred and eighty five point eight, which is minus one thousand one hundred and forty three point two kilojoules.', show: 'c.1', focus: 'c.1', caption: 'ΔH becomes 4 × (−285.8) = −1143.2 kJ.' },
      ],
    },
    {
      chapter: 'Step 4: Cancel and add',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'd',
          size: 'md',
          lines: [
            '\\ce{O2}\\text{: } 3 + 2 = 5 \\text{ left, } 5 \\text{ right} \\qquad \\ce{CO2}\\text{: } 3,\\ 3 \\qquad \\ce{H2O}\\text{: } 4,\\ 4',
            '\\Delta H = 2219.9 - 1180.5 - 1143.2 = \\good{-103.8\\ \\text{kJ}}',
          ],
        },
      ],
      lines: [
        { say: 'Step four. Add the three equations. Five oxygen molecules on the left, three and two, cancel the five on the right. Three carbon dioxide and four water cancel too.', show: 'd.0', caption: 'Step four. Add the three equations. 3O₂ + 2O₂ on the left cancel the 5O₂ on the right. 3CO₂ and 4H₂O cancel too.' },
        { say: 'What is left is exactly the target. So add the enthalpy changes: plus two thousand two hundred and nineteen point nine, minus one thousand one hundred and eighty point five, minus one thousand one hundred and forty three point two. That is minus one hundred and three point eight kilojoules.', show: 'd.1', focus: 'd.1', caption: 'What is left is exactly the target. So ΔH = 2219.9 − 1180.5 − 1143.2 = −103.8 kJ.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'k2', size: 'md', lines: ['\\ce{3C(s) + 4H2(g) -> C3H8(g)} \\qquad \\Delta H = -103.8\\ \\text{kJ}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$\\Delta H = -103.8\\ \\text{kJ}$: forming propane from its elements releases a little energy.' },
      ],
      lines: [
        { say: 'Here is the target with its enthalpy change. Does it make sense? Burning carbon and hydrogen releases a lot, burning propane releases a lot, and the difference between them is small.', show: 'k2.0' },
        { say: 'So forming propane from carbon and hydrogen releases one hundred and three point eight kilojoules, and delta H is minus one hundred and three point eight kilojoules.', show: 'ans', caption: 'So forming propane from carbon and hydrogen releases 103.8 kJ, and ΔH = −103.8 kJ.' },
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
            ['$-4543.6\\ \\text{kJ}$', 'Did not **reverse** equation (3)'],
            ['$+1540.6\\ \\text{kJ}$', 'Did not **multiply** equations (1) and (2)'],
            ['$+103.8\\ \\text{kJ}$', 'Reversed (1) and (2) **instead of** (3)'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Minus four thousand five hundred and forty three point six comes from leaving equation three forwards. Then propane is on the wrong side.', focus: 'traps.0', caption: '−4543.6 kJ comes from leaving equation (3) forwards. Then propane is on the wrong side.' },
        { say: 'Plus one thousand five hundred and forty point six comes from forgetting the threes and fours. Then the carbon dioxide and water do not cancel.', focus: 'traps.1', caption: '+1540.6 kJ comes from forgetting to multiply by 3 and 4. Then the CO₂ and H₂O do not cancel.' },
        { say: 'And plus one hundred and three point eight comes from reversing the other two equations. That builds the target backwards, propane breaking into its elements.', focus: 'traps.2', caption: 'And +103.8 kJ comes from reversing the other two equations. That builds the target backwards, propane breaking into its elements.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Given $\\ce{S(s) + O2(g) -> SO2(g)}$, $\\Delta H = -296.8\\ \\text{kJ}$, and $\\ce{2SO2(g) + O2(g) -> 2SO3(g)}$, $\\Delta H = -197.8\\ \\text{kJ}$, find $\\Delta H$ for $\\ce{S(s) + 3/2 O2(g) -> SO3(g)}$.',
          choices: ['$-494.6\\ \\text{kJ}$', '$-99.0\\ \\text{kJ}$', '$+395.7\\ \\text{kJ}$', '$-395.7\\ \\text{kJ}$'],
          answer: 3,
          working: 'Keep the first equation and halve the second: $-296.8 + \\tfrac{1}{2}(-197.8) = -395.7\\ \\text{kJ}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Sulfur burns to sulfur dioxide, minus two hundred and ninety six point eight kilojoules. Two sulfur dioxide and oxygen make two sulfur trioxide, minus one hundred and ninety seven point eight. Find delta H for sulfur and one and a half oxygen making sulfur trioxide. Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. S(s) + O₂(g) → SO₂(g), ΔH = −296.8 kJ, and 2SO₂(g) + O₂(g) → 2SO₃(g), ΔH = −197.8 kJ. Find ΔH for S(s) + 3/2 O₂(g) → SO₃(g). Pause the video and try it.' },
        { say: 'Keep the first equation and halve the second, so one sulfur dioxide cancels. Minus two hundred and ninety six point eight plus half of minus one hundred and ninety seven point eight is minus three hundred and ninety five point seven kilojoules: choice D.', show: 'q2.answer', caption: 'Keep the first equation and halve the second, so one SO₂ cancels. −296.8 + ½(−197.8) = −395.7 kJ: choice D.' },
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
          items: ['**Reverse** an equation: change the sign of $\\Delta H$', '**Multiply** an equation: multiply $\\Delta H$ too', 'Check the equations add to **exactly the target**, then add $\\Delta H$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Reverse an equation, and the sign of delta H changes.', show: 'sum.0', caption: 'Here is what to remember. Reverse an equation, and the sign of ΔH changes.' },
        { say: 'Multiply an equation by a number, and multiply delta H by the same number.', show: 'sum.1', caption: 'Multiply an equation by a number, and multiply ΔH by the same number.' },
        { say: 'Check that the equations add up to exactly the target, and then add the enthalpy changes. For more on Hess\'s law, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
