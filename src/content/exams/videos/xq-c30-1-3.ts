import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import usingMolar from '@/content/chem30/videos/c30-1-3-d.ts';
import neutral from '@/content/chem30/videos/c30-1-3-b.ts';

// Exam question for Chemistry 30 lesson 1.3 (molar enthalpy): 2.50 g of methane burns and releases
// 125 kJ; find the molar enthalpy of combustion. The question is OpenStax Chemistry 2e's own, word
// for word (end-of-chapter exercise 49, section 5.3, CC BY-NC-SA 4.0). The answer, which matches the
// book's: n = 2.50 / 16.05 = 0.1558 mol, and the molar enthalpy is -125 kJ / 0.1558 mol = -802 kJ/mol.
//
// The pictures are atoms drawn as balls (src/video/molecules.ts): the lesson's methane molecule
// burning; and simulated particles (src/video/particles.ts): acid and base reacting and warming the
// water around them, to show why heat given out makes delta H negative.

const QUESTION = 'When 2.50 g of methane burns in oxygen, 125 kJ of heat is produced. What is the enthalpy of combustion per mole of methane under these conditions?';

const video: Explainer = {
  id: 'xq-c30-1-3',
  lessonId: '',
  exam: {
    lesson: 'c30-1-3',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 49, section 5.3, Enthalpy',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/5-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: The Molar Enthalpy of Burning Methane. Molar Enthalpy',
  thumbnailTitle: 'Molar Enthalpy of Burning Methane',
  thumbnail: 'mb',
  summary:
    'A real test question, solved one small step at a time: 2.50 g of methane burns and produces 125 kJ of heat, so what is the enthalpy of combustion per mole? We change the mass to moles, divide the energy by the moles, and give it a negative sign because heat was produced, to get −802 kJ/mol.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Molar Enthalpy of Burning Methane', subtitle: 'From the heat of a sample to kilojoules per mole' }],
      lines: [
        { say: 'In this video, we solve a real test question about molar enthalpy. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'When $2.50\\ \\text{g}$ of methane burns in oxygen, $125\\ \\text{kJ}$ of heat is produced. What is the enthalpy of combustion per mole of methane under these conditions?', answer: '−802 kJ/mol' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. When two point five zero grams of methane burns in oxygen, one hundred and twenty five kilojoules of heat is produced. What is the enthalpy of combustion per mole of methane under these conditions?', show: 'q', caption: 'Here is the question, exactly as it was printed. When 2.50 g of methane burns in oxygen, 125 kJ of heat is produced. What is the enthalpy of combustion per mole of methane under these conditions?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'We know the heat from **2.50 g**. Scale it to **one mole**, with the right **sign**' }],
      lines: [
        { say: 'The heat comes from a small sample. The question wants the enthalpy change for one whole mole of methane, which is a molar enthalpy, and it needs a sign.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(usingMolar, 'mb'), { kind: 'math', id: 'k', size: 'md', lines: ['\\Delta_c H_m = \\dfrac{\\Delta H}{n} \\qquad n = \\dfrac{m}{M}'] }],
      lines: [
        { say: 'Here is what we need. One methane molecule burning in oxygen. Watch it react.', show: 'mb', play: 'mb.burn' },
        { say: 'Each molecule that burns releases the same small amount of energy, so the energy is proportional to the amount burned: twice the moles, twice the energy.' },
        { say: 'So the molar enthalpy is the enthalpy change divided by the moles. And the moles come from the mass divided by the molar mass.', show: 'k.0', caption: 'So the molar enthalpy is the enthalpy change divided by the moles: ΔcHm = ΔH ÷ n. And n = m ÷ M.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change **2.50 g** of methane to **moles**', 'Decide the **sign**: heat produced means $\\Delta H < 0$', 'Divide $\\Delta H$ by the **moles**'] }],
      lines: [
        { say: 'Here is the plan. First, change the mass of methane to moles.', show: 'plan.0' },
        { say: 'Then decide the sign of delta H from the direction the heat flowed.', show: 'plan.1', caption: 'Then decide the sign of ΔH from the direction the heat flowed.' },
        { say: 'Then divide delta H by the moles.', show: 'plan.2', caption: 'Then divide ΔH by the moles.' },
      ],
    },
    {
      chapter: 'Step 1: Grams to moles',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'lg', lines: ['M(\\ce{CH4}) = 12.01 + 4(1.01) = 16.05\\ \\text{g/mol}', 'n = \\dfrac{2.50}{16.05} = \\good{0.1558\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step one. Methane is C H four. One carbon at twelve point zero one and four hydrogens at one point zero one make sixteen point zero five grams per mole.', show: 'n.0', caption: 'Step one. Methane is CH₄. One C at 12.01 and four H at 1.01 make 16.05 g/mol.' },
        { say: 'Two point five zero grams divided by sixteen point zero five is zero point one five five eight moles.', show: 'n.1', focus: 'n.1', caption: 'n = 2.50 ÷ 16.05 = 0.1558 mol.' },
      ],
    },
    {
      chapter: 'Step 2: The sign',
      layout: 'center',
      main: [pick(neutral, 'nn'), { kind: 'math', id: 's', size: 'md', lines: ['\\text{heat produced} \\Rightarrow \\Delta H = \\good{-125\\ \\text{kJ}}'] }],
      lines: [
        { say: 'Step two. Here, an acid and a base react among water molecules. Watch the thermometer as they react.', show: ['nn', 'nn.labels', 'nn.key', 'nn.thermo'], play: 'nn.go' },
        { say: 'The reaction gives energy to the water, and the water warms. Energy leaves the system, so the system\'s enthalpy falls.', show: 'nn.tally' },
        { say: 'Burning methane is the same. One hundred and twenty five kilojoules is produced, so it leaves the system, and delta H is minus one hundred and twenty five kilojoules.', show: 's.0', focus: 's.0', caption: 'Burning methane is the same. 125 kJ is produced, so it leaves the system, and ΔH = −125 kJ.' },
      ],
    },
    {
      chapter: 'Step 3: Per mole',
      layout: 'center',
      main: [{ kind: 'math', id: 'h', size: 'lg', lines: ['\\Delta_c H_m = \\dfrac{-125\\ \\text{kJ}}{0.1558\\ \\text{mol}} = \\good{-802\\ \\text{kJ/mol}}'] }],
      lines: [
        { say: 'Step three. Divide by the moles. Minus one hundred and twenty five kilojoules over zero point one five five eight moles is minus eight hundred and two kilojoules per mole of methane.', show: 'h.0', focus: 'h.0', caption: 'Step three. Divide by the moles: −125 kJ ÷ 0.1558 mol = −802 kJ/mol of methane.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'c', size: 'md', lines: ['\\dfrac{2.50\\ \\text{g}}{16.05\\ \\text{g}} \\approx \\dfrac{1}{6.4} \\qquad 125 \\times 6.4 \\approx 800\\ \\text{kJ}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$\\Delta_c H_m = -802\\ \\text{kJ/mol}$ of methane.' },
      ],
      lines: [
        { say: 'Does it make sense? Two point five zero grams is about one sixth of a mole, so one whole mole should release about six times as much, roughly eight hundred kilojoules.', show: 'c.0', caption: 'Does it make sense? 2.50 g is about 1/6.4 of a mole, so one whole mole should release about 6.4 times as much: 125 × 6.4 ≈ 800 kJ.' },
        { say: 'And the sign is negative, because burning gives heat out. So the molar enthalpy of combustion is minus eight hundred and two kilojoules per mole. That matches the book.', show: 'ans', caption: 'And the sign is negative, because burning gives heat out. So ΔcHm = −802 kJ/mol. That matches the book.' },
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
            ['$+802\\ \\text{kJ/mol}$', 'Left the sign **positive**; heat was **given out**'],
            ['$-50.0\\ \\text{kJ/g}$', 'Divided by the **grams**, not the moles'],
            ['$-19.5\\ \\text{kJ/mol}$', '**Multiplied** by the moles instead of dividing'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Plus eight hundred and two. Heat was produced, so the system lost energy, and delta H must be negative.', focus: 'traps.0', caption: '+802 kJ/mol. Heat was produced, so the system lost energy, and ΔH must be negative.' },
        { say: 'Minus fifty kilojoules per gram is the energy per gram. The question asks per mole.', focus: 'traps.1', caption: '−50.0 kJ/g is the energy per gram. The question asks per mole.' },
        { say: 'And minus nineteen point five comes from multiplying by the moles. A mole is more than our sample, so the answer must be bigger than one hundred and twenty five.', focus: 'traps.2', caption: 'And −19.5 kJ/mol comes from multiplying by the moles. A mole is more than our sample, so the answer must be bigger than 125.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Burning $1.60\\ \\text{g}$ of methanol ($M = 32.05\\ \\text{g/mol}$) releases $36.3\\ \\text{kJ}$ of heat. What is its molar enthalpy of combustion?',
          choices: ['$+727\\ \\text{kJ/mol}$', '$-727\\ \\text{kJ/mol}$', '$-22.7\\ \\text{kJ/mol}$', '$-58.1\\ \\text{kJ/mol}$'],
          answer: 1,
          working: '$n = \\dfrac{1.60}{32.05} = 0.04992\\ \\text{mol}$, and $\\dfrac{-36.3}{0.04992} = -727\\ \\text{kJ/mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Burning one point six zero grams of methanol releases thirty six point three kilojoules of heat. Methanol is thirty two point zero five grams per mole. What is its molar enthalpy of combustion? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Burning 1.60 g of methanol (M = 32.05 g/mol) releases 36.3 kJ of heat. What is its molar enthalpy of combustion? Pause the video and try it.' },
        { say: 'One point six zero over thirty two point zero five is zero point zero four nine nine two moles. Minus thirty six point three over that is minus seven hundred and twenty seven kilojoules per mole: choice B.', show: 'q2.answer', caption: '1.60 ÷ 32.05 = 0.04992 mol. −36.3 ÷ 0.04992 = −727 kJ/mol: choice B.' },
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
          items: ['Change the mass to **moles** first', 'Heat **given out** means $\\Delta H$ is **negative**', 'Molar enthalpy $= \\dfrac{\\Delta H}{n}$, in **kJ/mol**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Change the mass of the substance to moles first.', show: 'sum.0' },
        { say: 'Heat given out means delta H is negative, and heat taken in means it is positive.', show: 'sum.1', caption: 'Heat given out means ΔH is negative, and heat taken in means it is positive.' },
        { say: 'The molar enthalpy is delta H divided by the moles, in kilojoules per mole. For more on molar enthalpy, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2', caption: 'The molar enthalpy is ΔH ÷ n, in kJ/mol. For more on molar enthalpy, watch this lesson\'s explainer videos on Gradileo.' },
      ],
    },
  ],
};

export default video;
