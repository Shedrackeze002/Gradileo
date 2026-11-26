import type { Explainer } from '@/video/script.ts';
import { starchHydrolysis } from './lib/cx-waec.ts';

const video: Explainer = {
  id: 'cx-19-4',
  lessonId: 'cx-19-4',
  title: 'Carbohydrates and Food Tests',
  thumbnail: 'st',
  summary:
    'Carbohydrates contain carbon, hydrogen and oxygen, with hydrogen and oxygen in the ratio 2 : 1. Monosaccharides such as glucose join, losing water, into disaccharides such as sucrose and polysaccharides such as starch, and hydrolysis by acid or enzymes splits them again. Iodine shows starch, Benedict’s solution shows a reducing sugar, the Biuret test shows protein, and an ethanol emulsion shows fat. Sucrose is not a reducing sugar, so it must be hydrolysed and neutralised before the Benedict’s test.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Organic Chemistry and Biochemistry', title: 'Carbohydrates and Food Tests', subtitle: 'What is in your food?' }],
      lines: [
        { say: 'Yam, cassava, rice and bread are mostly starch, the sugar in tea is sucrose, and ripe fruit tastes sweet because of glucose and fructose. All of these are carbohydrates.', show: 'title' },
        { say: 'In this lesson, you will classify carbohydrates, describe and calculate their hydrolysis, and identify food molecules by their tests.' },
      ],
    },
    {
      chapter: 'Classifying carbohydrates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Carbohydrate', md: 'A compound of carbon, hydrogen and oxygen, with hydrogen and oxygen in the ratio **2 : 1**, as in water.' },
        { kind: 'table', id: 't', head: ['Class', 'Formula', 'Examples'], rows: [['Monosaccharide', 'C₆H₁₂O₆', 'glucose, fructose, galactose'], ['Disaccharide', 'C₁₂H₂₂O₁₁', 'sucrose, maltose, lactose'], ['Polysaccharide', '(C₆H₁₀O₅)ₙ', 'starch, cellulose, glycogen']] },
      ],
      lines: [
        { say: 'A carbohydrate contains carbon, hydrogen and oxygen, with twice as many hydrogen atoms as oxygen atoms, as in water.', show: 'def' },
        { say: 'Single sugar units, such as glucose, are monosaccharides. Two of them join, losing a molecule of water, to make a disaccharide such as sucrose, and many join into a polysaccharide such as starch.', show: 't' },
      ],
    },
    {
      chapter: 'Breaking starch down',
      layout: 'center',
      main: [starchHydrolysis('st')],
      lines: [
        { say: 'Here are starch molecules, long chains of glucose units, in dilute acid.', show: ['st', 'st.key', 'st.thermo'] },
        { say: 'As the mixture is heated, water splits the links between the units, one by one. This is hydrolysis. The chains break into shorter pieces, and finally into single glucose molecules.', play: 'st.boil' },
      ],
    },
    {
      chapter: 'Hydrolysis',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{C12H22O11 + H2O -> C6H12O6 + C6H12O6}', '\\text{sucrose} \\to \\text{glucose + fructose}'] },
        { kind: 'math', id: 'c', size: 'md', lines: ['68.4 \\div 342 = 0.200\\ \\text{mol} \\;\\Rightarrow\\; 0.200 \\times 180 = 36.0\\ \\text{g glucose}'] },
      ],
      lines: [
        { say: 'Dilute acid or enzymes split the links. Sucrose gives glucose and fructose, maltose gives two glucose, lactose gives glucose and galactose, and starch gives maltose and then glucose.', show: 'm' },
        { say: 'Sixty-eight point four grams of sucrose is zero point two zero zero moles. Each sucrose gives one glucose, so that is zero point two zero zero moles of glucose, or thirty-six grams.', caption: '68.4 g of sucrose is 0.200 mol. Each sucrose gives one glucose, so that is 0.200 mol of glucose, or 36.0 g.', show: 'c', focus: 'c' },
      ],
    },
    {
      chapter: 'Food tests',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Food molecule', 'Test', 'Positive result'],
          rows: [
            ['Starch', 'iodine solution', 'blue-black'],
            ['Reducing sugar', 'warm with Benedict’s solution', 'brick-red precipitate'],
            ['Protein', 'NaOH, then CuSO₄ (Biuret)', 'violet'],
            ['Fat or oil', 'shake with ethanol, add water', 'cloudy white emulsion'],
          ],
        },
      ],
      lines: [
        { say: 'Iodine solution turns blue-black with starch. A reducing sugar, warmed with Benedict’s solution, gives a brick-red precipitate.', show: ['t.0', 't.1'] },
        { say: 'In the Biuret test, sodium hydroxide and then copper sulfate turn violet with a protein. And a fat, shaken with ethanol and then water, gives a cloudy white emulsion. It also leaves a see-through spot on paper.', show: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Sucrose is not reducing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'w', tone: 'mistake', title: 'Hydrolyse and neutralise first', md: 'Sucrose gives **no change** with Benedict’s solution. Boil it with dilute HCl, **neutralise** with sodium hydrogencarbonate, then test: now it gives brick red.' },
      ],
      lines: [
        { say: 'All monosaccharides and most disaccharides are reducing sugars, but sucrose is not. It gives no change with Benedict’s solution.', show: 'w' },
        { say: 'Boil it with dilute hydrochloric acid first, and it hydrolyses to glucose and fructose. Then neutralise it with sodium hydrogencarbonate, because Benedict’s solution only works when alkaline, and now it gives brick red.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A food gives no change with Benedict’s solution, but brick red after boiling with dilute HCl and neutralising. It also stays brown with iodine. What does it contain?',
          choices: ['Glucose', 'Starch', 'Protein', 'Sucrose'],
          answer: 3,
          working: 'A non-reducing sugar that becomes reducing on hydrolysis, and no starch: sucrose.',
        },
      ],
      lines: [
        { say: 'Your turn. A food gives no change with Benedict’s solution, but brick red after boiling with acid and neutralising. It stays brown with iodine. What does it contain? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, sucrose. It is not a reducing sugar until it is hydrolysed, and the iodine shows there is no starch. Glucose would have given brick red straight away.', show: 'q.answer' },
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
            'Monosaccharides join into disaccharides and polysaccharides.',
            'Hydrolysis: sucrose gives glucose and fructose; starch gives glucose.',
            'Iodine: starch. Benedict’s: reducing sugar. Biuret: protein. Ethanol: fat.',
            'Sucrose is non-reducing: hydrolyse and neutralise it before Benedict’s.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Monosaccharides join into disaccharides and polysaccharides.', show: 'sum.0' },
        { say: 'Hydrolysis splits them again: sucrose gives glucose and fructose, and starch gives glucose.', show: 'sum.1' },
        { say: 'Iodine shows starch, Benedict’s solution a reducing sugar, the Biuret test protein, and the ethanol emulsion fat.', show: 'sum.2' },
        { say: 'And sucrose is non-reducing, so hydrolyse and neutralise it before the Benedict’s test.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
