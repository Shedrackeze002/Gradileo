import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import plating from '@/content/chem30/videos/c30-2-8-d.ts';
import { electrolytic } from '@/content/chem30/videos/lib/c30-2b-figures.ts';

// Exam question for Chemistry 30 lesson 2.8 (electrolytic cells and Faraday's law): a key is
// copper plated from copper(II) sulfate solution with 1.50 A for 45.0 min. Which electrode is the
// key, what is the cathode half-reaction, and what mass of copper is deposited? Gradileo wrote the
// question in the style of a unit test, with F = 9.65 x 10^4 C/mol and M(Cu) = 63.55 g/mol stated.
// The answer: the key is the cathode; Cu2+ + 2e- -> Cu; q = 1.50 x 2700 = 4050 C,
// n(e-) = 4050 / 96500 = 0.04197 mol, n(Cu) = 0.02098 mol, m = 0.02098 x 63.55 = 1.33 g.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's copper plating, with a
// count of the copper atoms plated as the current flows; and the plating cell as a diagram
// (src/video/solids.ts), with the electrons and the ions moving.

const QUESTION = 'A key is copper plated in copper(II) sulfate solution, with a copper bar as the other electrode, using a current of 1.50 A for 45.0 min. (a) Should the key be the anode or the cathode? (b) Write the half-reaction at the key. (c) What mass of copper is deposited? Use F = 9.65 × 10⁴ C/mol and M(Cu) = 63.55 g/mol.';

const cellFig = figure(
  'e',
  [electrolytic({ solution: '\\ce{CuSO4(aq)}', tone: 'adj', cathode: '\\text{key}\\ (-)', anode: '\\text{copper}\\ (+)', electrons: true, ions: { cation: '\\ce{Cu^2+}', anion: '\\ce{SO4^2-}' }, products: { cathode: '\\ce{Cu}', anode: '\\ce{Cu^2+}' } })],
  480,
);

const video: Explainer = {
  id: 'xq-c30-2-8',
  lessonId: '',
  exam: {
    lesson: 'c30-2-8',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: "Exam Question: Copper Plating a Key. Electrolytic Cells and Faraday's Law",
  thumbnailTitle: 'Copper Plating a Key',
  thumbnail: 'cp',
  summary:
    "A test-style question, solved one small step at a time: a key is copper plated with 1.50 A for 45.0 minutes. We decide that the key must be the cathode, write Cu²⁺ + 2e⁻ → Cu, and use Faraday's law, from charge to moles of electrons to moles of copper, to find that 1.33 g of copper is deposited.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Copper Plating a Key', subtitle: "From current and time to grams, with Faraday's law" }],
      lines: [
        { say: 'In this video, we solve a test-style question about electrolytic cells and Faraday\'s law. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'We wrote this question in the style of a high-school chemistry unit test, and everything you need is given in it.' },
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
          prompt: 'A key is copper plated in copper(II) sulfate solution, with a copper bar as the other electrode, using a current of $1.50\\ \\text{A}$ for $45.0\\ \\text{min}$. (a) Should the key be the anode or the cathode? (b) Write the half-reaction at the key. (c) What mass of copper is deposited? Use $F = 9.65 \\times 10^4\\ \\text{C/mol}$ and $M(\\ce{Cu}) = 63.55\\ \\text{g/mol}$.',
          answer: 'The cathode; Cu²⁺ + 2e⁻ → Cu; 1.33 g',
        },
      ],
      lines: [
        { say: 'Here is the question. A key is copper plated in copper two sulfate solution, with a copper bar as the other electrode, using a current of one point five zero amperes for forty five point zero minutes. Part a: should the key be the anode or the cathode? Part b: write the half-reaction at the key. Part c: what mass of copper is deposited? Use a Faraday constant of nine point six five times ten to the four coulombs per mole, and a molar mass of copper of sixty three point five five grams per mole.', show: 'q', caption: 'Here is the question. A key is copper plated in CuSO₄(aq), with a copper bar as the other electrode, using 1.50 A for 45.0 min. (a) Anode or cathode? (b) The half-reaction at the key? (c) What mass of copper is deposited? Use F = 9.65 × 10⁴ C/mol and M(Cu) = 63.55 g/mol.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Count the **electrons** that flow, then turn them into **copper atoms** and **grams**' }],
      lines: [
        { say: 'The current and the time tell us how much charge flows, which is a count of electrons. Each copper ion needs a fixed number of electrons, so we can count the copper atoms plated, and then weigh them.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(plating, 'cp'), { kind: 'math', id: 'k', size: 'md', lines: ['q = It \\qquad n_{e^-} = \\dfrac{q}{F}'] }],
      lines: [
        { say: 'Here is what we need. Copper plating up close, with a count of the copper atoms plated onto the object. Each copper two ion that arrives takes two electrons before it becomes a copper atom. Watch the count grow as the current flows.', caption: 'Here is what we need. Copper plating up close, with a count of the copper atoms plated onto the object. Each Cu²⁺ ion that arrives takes two electrons before it becomes a copper atom. Watch the count grow as the current flows.', show: ['cp', 'cp.labels', 'cp.key', 'cp.tally'], play: 'cp.run' },
        { say: 'The more electrons flow, the more copper is plated, in exact proportion. That is Faraday\'s law.' },
        { say: 'The charge is the current times the time in seconds, and the moles of electrons are the charge divided by the Faraday constant, the charge on one mole of electrons.', show: 'k.0', caption: 'The charge is q = It, with t in seconds, and the moles of electrons are q ÷ F, where F is the charge on one mole of electrons.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Copper plates where $\\ce{Cu^2+}$ is **reduced**: the **cathode**', 'Find the **charge**, then the **moles of electrons**', 'Use **2 electrons per copper**, then the **molar mass**'] }],
      lines: [
        { say: 'Here is the plan. First, copper plates where copper ions are reduced, which is the cathode.', show: 'plan.0' },
        { say: 'Then find the charge that flows, and the moles of electrons.', show: 'plan.1' },
        { say: 'Then use two electrons per copper atom to get the moles of copper, and the molar mass to get grams.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The key and its reaction',
      layout: 'split',
      leftWidth: 560,
      left: [cellFig],
      right: [{ kind: 'math', id: 'c', size: 'md', lines: ['\\text{key} = \\good{\\text{cathode}}', '\\good{\\ce{Cu^2+ + 2e^- -> Cu}}'] }],
      lines: [
        { say: 'Step one. Here is the plating cell. The key and a copper bar stand in copper two sulfate solution, joined to a power supply.', caption: 'Step one. Here is the plating cell. The key and a copper bar stand in copper(II) sulfate solution, joined to a power supply.', show: ['e.beaker', 'e.cathode', 'e.anode', 'e.supply'] },
        { say: 'The supply pushes electrons onto the key, making it negative. Copper two ions are drawn to it, take two electrons each, and coat it with copper. That is reduction, so the key must be the cathode.', caption: 'The supply pushes electrons onto the key, making it negative. Cu²⁺ ions are drawn to it, take two electrons each, and coat it with copper. That is reduction, so the key must be the cathode.', show: ['e.electrons', 'e.cat-ion', 'e.cat-product', 'c.0', 'c.1'], focus: 'c.1' },
        { say: 'At the copper bar, the anode, copper atoms are oxidised to copper two ions, which replace the ones plated out.', caption: 'At the copper bar, the anode, copper atoms are oxidised to Cu²⁺ ions, which replace the ones plated out.', show: ['e.an-ion', 'e.an-product'] },
      ],
    },
    {
      chapter: 'Step 2: Moles of electrons',
      layout: 'center',
      main: [{ kind: 'math', id: 'q', size: 'lg', lines: ['t = 45.0 \\times 60 = 2700\\ \\text{s}', 'q = 1.50\\ \\text{A} \\times 2700\\ \\text{s} = 4050\\ \\text{C}', 'n_{e^-} = \\dfrac{4050}{9.65 \\times 10^4} = \\good{0.04197\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step two. Forty five minutes is two thousand seven hundred seconds.', show: 'q.0', focus: 'q.0', caption: 'Step two. 45.0 min is 2700 s.' },
        { say: 'One point five zero amperes for two thousand seven hundred seconds is four thousand and fifty coulombs.', show: 'q.1', focus: 'q.1', caption: '1.50 A × 2700 s = 4050 C.' },
        { say: 'Divide by the Faraday constant: zero point zero four one nine seven moles of electrons.', show: 'q.2', focus: 'q.2', caption: 'Divide by F: 4050 ÷ 9.65 × 10⁴ = 0.04197 mol of electrons.' },
      ],
    },
    {
      chapter: 'Step 3: Grams of copper',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n_{\\ce{Cu}} = \\dfrac{0.04197}{2} = 0.02098\\ \\text{mol}', 'm = 0.02098 \\times 63.55 = \\good{1.33\\ \\text{g}}'] }],
      lines: [
        { say: 'Step three. Each copper atom takes two electrons, so the moles of copper are half the moles of electrons: zero point zero two zero nine eight moles.', show: 'm.0', focus: 'm.0', caption: 'Step three. Each copper atom takes two electrons, so n(Cu) = 0.04197 ÷ 2 = 0.02098 mol.' },
        { say: 'Times sixty three point five five grams per mole is one point three three grams of copper.', show: 'm.1', focus: 'm.1', caption: '0.02098 mol × 63.55 g/mol = 1.33 g of copper.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\dfrac{1.33}{63.55} \\times 2 \\times 9.65 \\times 10^4 \\approx 4040\\ \\text{C} \\approx 1.50 \\times 2700'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) The key is the **cathode**. (b) $\\ce{Cu^2+ + 2e^- -> Cu}$. (c) **1.33 g** of copper.' },
      ],
      lines: [
        { say: 'Does it make sense? Work backwards. One point three three grams of copper is zero point zero two zero nine moles, which needs twice as many moles of electrons, about four thousand and forty coulombs. That is the charge we started with, to rounding.', show: 'x.0', caption: 'Does it make sense? Work backwards. 1.33 g of copper needs 1.33 ÷ 63.55 × 2 × 9.65 × 10⁴ ≈ 4040 C. That is the charge we started with, to rounding.' },
        { say: 'So the key is the cathode, copper two plus plus two electrons gives copper, and one point three three grams of copper is deposited.', show: 'ans', caption: 'So the key is the cathode, Cu²⁺ + 2e⁻ → Cu, and 1.33 g of copper is deposited.' },
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
            ['$2.67\\ \\text{g}$', 'Used **one** electron per copper; it takes **two**'],
            ['$0.0222\\ \\text{g}$', 'Used **minutes**, not **seconds**, in $q = It$'],
            ['The key is the anode', 'At the anode metal **dissolves**; copper **plates** at the cathode'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Two point six seven grams treats every electron as one copper atom. Each copper two ion needs two electrons, so the copper is half that.', focus: 'traps.0', caption: '2.67 g treats every electron as one copper atom. Each Cu²⁺ ion needs two electrons, so the copper is half that.' },
        { say: 'Zero point zero two two two grams uses forty five minutes as forty five seconds. An ampere is a coulomb per second, so the time must be in seconds.', focus: 'traps.1', caption: '0.0222 g uses 45.0 min as 45 s. An ampere is a coulomb per second, so the time must be in seconds.' },
        { say: 'And making the key the anode would oxidise it: the key would dissolve instead of being plated.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How long does a current of $0.500\\ \\text{A}$ take to plate $0.540\\ \\text{g}$ of silver, $\\ce{Ag+ + e^- -> Ag}$? Use $M(\\ce{Ag}) = 107.87\\ \\text{g/mol}$ and $F = 9.65 \\times 10^4\\ \\text{C/mol}$.',
          choices: ['$483\\ \\text{s}$', '$1930\\ \\text{s}$', '$9.66\\ \\text{s}$', '$966\\ \\text{s}$'],
          answer: 3,
          working: '$n = \\dfrac{0.540}{107.87} = 5.006 \\times 10^{-3}$ mol of electrons, $q = 483\\ \\text{C}$, and $t = \\dfrac{483}{0.500} = 966\\ \\text{s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. How long does a current of zero point five zero zero amperes take to plate zero point five four zero grams of silver? Each silver ion takes one electron. Use a molar mass of one hundred and seven point eight seven grams per mole, and the same Faraday constant. Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. How long does 0.500 A take to plate 0.540 g of silver, Ag⁺ + e⁻ → Ag? Use M(Ag) = 107.87 g/mol and F = 9.65 × 10⁴ C/mol. Pause the video and try it.' },
        { say: 'Zero point five four zero grams is five point zero zero six times ten to the minus three moles of silver, and of electrons. Times the Faraday constant is four hundred and eighty three coulombs, and divided by zero point five zero zero amperes that is nine hundred and sixty six seconds: choice D.', show: 'q2.answer', caption: '0.540 g is 5.006 × 10⁻³ mol of silver, and of electrons. × F = 483 C, and ÷ 0.500 A = 966 s: choice D.' },
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
          items: ['The object to be plated is the **cathode**', '$q = It$ with $t$ in **seconds**, then $n_{e^-} = q / F$', 'Divide by the **electrons per ion**, then use the **molar mass**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The object to be plated is the cathode, where metal ions are reduced.', show: 'sum.0' },
        { say: 'The charge is the current times the time in seconds, and the moles of electrons are the charge divided by the Faraday constant.', show: 'sum.1' },
        { say: 'Divide by the electrons each ion takes, then multiply by the molar mass. For more on electrolytic cells and Faraday\'s law, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
