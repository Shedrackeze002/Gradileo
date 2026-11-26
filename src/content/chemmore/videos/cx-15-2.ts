import type { Explainer } from '@/video/script.ts';
import { ammoniumAndWater, hclAndAmmonia } from '../../chem30/videos/lib/c30-protons.ts';

const video: Explainer = {
  id: 'cx-15-2',
  lessonId: 'cx-15-2',
  title: 'Types of Salts and Salt Hydrolysis',
  thumbnail: 'hy',
  summary:
    'Salts are normal, acid, basic, double or complex. To find the water of crystallisation, compare the moles of water lost with the moles of anhydrous salt. A salt of a strong acid and a strong base gives a neutral solution, a strong acid and a weak base an acidic one, and a weak acid and a strong base an alkaline one. Deliquescent substances dissolve in the water they absorb, efflorescent ones lose water, and hygroscopic ones absorb it but stay solid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Solutions, Salts and Solubility', title: 'Types of Salts and Salt Hydrolysis', subtitle: 'Not every salt solution is neutral' }],
      lines: [
        { say: 'Ammonium chloride solution turns blue litmus red. Sodium carbonate solution turns red litmus blue. And common salt does neither.', show: 'title' },
        { say: 'In this lesson, you will sort salts into types, find water of crystallisation, and predict whether a salt solution is acidic, neutral or alkaline.' },
      ],
    },
    {
      chapter: 'An ammonium salt forms',
      layout: 'center',
      main: [hclAndAmmonia('pt', { conjugates: false })],
      lines: [
        { say: 'Here is hydrogen chloride meeting ammonia. Watch the hydrogen chloride pass its hydrogen ion to the nitrogen.', show: 'pt', play: 'pt.go' },
        { say: 'That makes an ammonium ion and a chloride ion: ammonium chloride, a salt of a strong acid and a weak base.' },
      ],
    },
    {
      chapter: 'The salt meets water',
      layout: 'center',
      main: [ammoniumAndWater('hy', { conjugates: false })],
      lines: [
        { say: 'Now dissolve the salt. Here is an ammonium ion beside a water molecule.', show: 'hy' },
        { say: 'Ammonia is a weak base, so it holds its extra hydrogen ion only loosely. Watch the ammonium ion hand it on to the water.', play: 'hy.go' },
        { say: 'That makes hydronium ions, so the solution is acidic. This reaction of a salt’s ions with water is salt hydrolysis.' },
      ],
    },
    {
      chapter: 'Predicting the pH',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['The salt of', 'Its solution', 'Example'],
          rows: [['strong acid + strong base', 'neutral', 'NaCl, KNO₃'], ['strong acid + weak base', 'acidic', 'NH₄Cl'], ['weak acid + strong base', 'alkaline', 'Na₂CO₃']],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CO3^2- + H2O <=> HCO3- + OH-}'] },
      ],
      lines: [
        { say: 'A salt of a strong acid and a strong base, like sodium chloride, gives a neutral solution: neither ion reacts with water.', show: 't.0' },
        { say: 'A salt of a strong acid and a weak base, like ammonium chloride, gives an acidic solution, as you just saw.', show: 't.1' },
        { say: 'And a salt of a weak acid and a strong base gives an alkaline solution. The carbonate ion takes a hydrogen ion from water, leaving hydroxide ions behind.', show: ['t.2', 'm'], focus: ['t.2', 'm'] },
      ],
    },
    {
      chapter: 'Types of salts',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Type', 'What it contains', 'Example'],
          rows: [
            ['Normal', 'no replaceable hydrogen', 'Na₂CO₃'],
            ['Acid', 'some replaceable hydrogen', 'NaHCO₃'],
            ['Basic', 'hydroxide ions too', 'Zn(OH)Cl'],
            ['Double', 'two cations, fully ionised', 'potash alum'],
            ['Complex', 'a complex ion', '[Cu(NH₃)₄]SO₄'],
          ],
        },
      ],
      lines: [
        { say: 'A salt forms when the hydrogen of an acid is replaced by a metal ion or the ammonium ion. In a normal salt, all of it is replaced. In an acid salt, some is left, so only an acid with more than one replaceable hydrogen can make one.', show: ['t.0', 't.1'] },
        { say: 'A basic salt contains hydroxide ions too. A double salt has two cations and ionises fully. And a complex salt holds a complex ion that stays together in solution.', show: ['t.2', 't.3', 't.4'] },
      ],
    },
    {
      chapter: 'Water of crystallisation',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: '$2.86\\ \\text{g}$ of $\\ce{Na2CO3}\\cdot x\\,\\ce{H2O}$ is heated, leaving $1.06\\ \\text{g}$ of $\\ce{Na2CO3}$ ($M = 106$).' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{H2O}: (2.86 - 1.06) \\div 18 = 0.100\\ \\text{mol}', '\\ce{Na2CO3}: 1.06 \\div 106 = 0.0100\\ \\text{mol}', 'x = 0.100 \\div 0.0100 = 10'] },
      ],
      lines: [
        { say: 'Two point eight six grams of washing soda is heated until all its water is driven off, leaving one point zero six grams of anhydrous sodium carbonate. Find x, the water of crystallisation.', caption: '2.86 g of washing soda is heated until all its water is driven off, leaving 1.06 g of anhydrous sodium carbonate. Find x, the water of crystallisation.', show: 'q' },
        { say: 'The water lost is one point eight zero grams, which is zero point one zero zero moles. The sodium carbonate is zero point zero one zero zero moles.', caption: 'The water lost is 1.80 g, which is 0.100 mol. The sodium carbonate is 0.0100 mol.', show: ['m.0', 'm.1'] },
        { say: 'So there are ten moles of water for every mole of the salt: x is ten.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Salts and water from the air',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Term', 'Meaning', 'Example'],
          rows: [['Deliquescent', 'absorbs water until it dissolves', 'calcium chloride'], ['Efflorescent', 'loses water of crystallisation', 'washing soda'], ['Hygroscopic', 'absorbs water but stays solid', 'quicklime']],
        },
      ],
      lines: [
        { say: 'Some substances trade water with the air. A deliquescent one, like calcium chloride, absorbs water until it dissolves. An efflorescent one, like washing soda, loses its water of crystallisation. And a hygroscopic one, like quicklime, absorbs water but stays solid, which makes it a good drying agent.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the pH of a solution of potassium ethanoate, the salt of a weak acid and a strong base?',
          choices: ['Exactly 7', 'Below 7', 'It depends on the indicator', 'Above 7'],
          answer: 3,
          working: 'The ethanoate ion takes $\\ce{H+}$ from water, leaving $\\ce{OH-}$ ions, so the solution is alkaline.',
        },
      ],
      lines: [
        { say: 'Your turn. Potassium ethanoate is the salt of a weak acid and a strong base. What is the pH of its solution? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, above seven. The ethanoate ion takes a hydrogen ion from water and leaves hydroxide ions behind, so the solution is alkaline.', show: 'q.answer' },
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
          items: [
            'Salts are normal, acid, basic, double or complex.',
            'Water of crystallisation: moles of water lost ÷ moles of anhydrous salt.',
            'Strong + strong: neutral. Strong acid + weak base: acidic. Weak acid + strong base: alkaline.',
            'Deliquescent dissolves; efflorescent loses water; hygroscopic stays solid.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Salts are normal, acid, basic, double or complex.', show: 'sum.0' },
        { say: 'To find water of crystallisation, divide the moles of water lost by the moles of anhydrous salt.', show: 'sum.1' },
        { say: 'Hydrolysis makes the salt of a strong acid and a weak base acidic, and the salt of a weak acid and a strong base alkaline.', show: 'sum.2' },
        { say: 'And deliquescent substances dissolve in the water they absorb, efflorescent ones lose water, and hygroscopic ones stay solid.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
