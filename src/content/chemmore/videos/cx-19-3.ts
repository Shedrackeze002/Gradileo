import type { Explainer } from '@/video/script.ts';
import { soapCleaning } from './lib/cx-waec.ts';

const video: Explainer = {
  id: 'cx-19-3',
  lessonId: 'cx-19-3',
  title: 'Fats, Oils, Soaps and Detergents',
  thumbnail: 'sc',
  summary:
    'Fats and oils are triglycerides, esters of glycerol with three fatty acids, and oils are liquid because their unsaturated chains are kinked. Hydrogenation with nickel hardens oils into margarine. Saponification by sodium hydroxide, three moles for each mole of fat, gives glycerol and soap. A soap particle has a water-loving head and a grease-loving tail, so it lifts grease off in droplets, and soapless detergents do not form scum in hard water.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Organic Chemistry and Biochemistry', title: 'Fats, Oils, Soaps and Detergents', subtitle: 'From palm oil to black soap' }],
      lines: [
        { say: 'Palm oil is used for cooking across West Africa. Boil the same oil with an alkali and it turns into soap, which is how black soap has been made for centuries.', show: 'title' },
        { say: 'In this lesson, you will describe fats and oils, how they are hardened and turned into soap, and how soap and detergents clean.' },
      ],
    },
    {
      chapter: 'Fats and oils',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Triglyceride', md: 'An ester of one molecule of **glycerol** (propane-1,2,3-triol) and three long-chain **fatty acids**. Fats and oils are triglycerides.' },
        { kind: 'table', id: 't', head: ['', 'Oil', 'Fat'], rows: [['Chains', 'unsaturated, kinked', 'mostly saturated'], ['At room temperature', 'liquid', 'solid'], ['Bromine water', 'decolourised', 'little change']] },
      ],
      lines: [
        { say: 'Fats and oils are triglycerides: esters made from one glycerol molecule and three long-chain fatty acids.', show: 'def' },
        { say: 'Oils are liquid because their chains are unsaturated. Their double bonds put kinks in the chains, so the molecules cannot pack closely. Fats have more saturated chains, and are solid.', show: 't' },
      ],
    },
    {
      chapter: 'Hardening and going rancid',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Hydrogenation**: hydrogen adds to the C=C bonds, nickel catalyst, about 150 °C.', 'It raises the melting point: vegetable oil becomes **margarine**.', 'Fats go **rancid** when oxidised or hydrolysed, giving smelly fatty acids.'] },
      ],
      lines: [
        { say: 'Hydrogenation adds hydrogen to the double bonds, over a nickel catalyst at about one hundred fifty degrees. The straighter chains pack better, so the melting point rises, and vegetable oil hardens into margarine.', caption: 'Hydrogenation adds hydrogen to the double bonds, over a nickel catalyst at about 150 °C. The straighter chains pack better, so the melting point rises, and vegetable oil hardens into margarine.', show: ['b.0', 'b.1'] },
        { say: 'Fats and oils go rancid when they are oxidised or hydrolysed, releasing smelly fatty acids.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Saponification',
      layout: 'center',
      main: [
        { kind: 'math', id: 'e', size: 'md', lines: ['\\text{fat} + 3\\ce{NaOH} \\longrightarrow \\text{glycerol} + 3\\ \\text{soap (sodium salts of fatty acids)}'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['178 \\div 890 = 0.200\\ \\text{mol fat} \\;\\Rightarrow\\; 0.600\\ \\text{mol } \\ce{NaOH} = 24.0\\ \\text{g}'] },
      ],
      lines: [
        { say: 'Saponification is the hydrolysis of a fat by an alkali. It gives glycerol, and the sodium salts of the fatty acids, which are soap. One mole of fat needs three moles of sodium hydroxide.', show: 'e' },
        { say: 'Salt is then added to make the soap separate out. Potassium hydroxide gives softer, more soluble soaps.' },
        { say: 'One hundred seventy-eight grams of glyceryl tristearate is zero point two zero zero moles, so it needs zero point six zero zero moles of sodium hydroxide, which is twenty-four grams.', caption: '178 g of glyceryl tristearate is 0.200 mol, so it needs 0.600 mol of sodium hydroxide, which is 24.0 g.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'How soap cleans',
      layout: 'center',
      main: [soapCleaning('sc')],
      lines: [
        { say: 'A soap particle has a long hydrocarbon tail that hates water and loves grease, and an ionic head that loves water. Here is a blob of grease in plain water, and in soapy water.', show: ['sc', 'sc.labels', 'sc.key'] },
        { say: 'Stir both. The soap tails work their way into the grease while the heads stay in the water, so the grease breaks up and spreads out through the water, held there by the soap, ready to be rinsed away. In plain water, the grease stays in one lump.', play: 'sc.wash' },
      ],
    },
    {
      chapter: 'Soaps and soapless detergents',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', 'Soap', 'Soapless detergent'], rows: [['Made from', 'fats and oils', 'petroleum products'], ['In hard water', 'forms scum with Ca²⁺ and Mg²⁺', 'no scum'], ['In the environment', 'biodegradable', 'some cause foam in rivers']] },
      ],
      lines: [
        { say: 'Soap is made from fats and oils. Soapless detergents are made from petroleum products.', show: 't.0' },
        { say: 'In hard water, soap forms scum with calcium and magnesium ions. A soapless detergent does not, because its calcium salts are soluble. But soap is biodegradable, while some detergents are not, and cause foam in rivers.', show: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What mass of sodium hydroxide ($M = 40$) is needed to saponify 89 g of glyceryl tristearate ($M = 890$)?',
          choices: ['4.00 g', '12.0 g', '24.0 g', '36.0 g'],
          answer: 1,
          working: 'Fat $= 89 \\div 890 = 0.100$ mol, so $\\ce{NaOH} = 0.300$ mol $= 0.300 \\times 40 = 12.0$ g.',
        },
      ],
      lines: [
        { say: 'Your turn. What mass of sodium hydroxide is needed to saponify eighty-nine grams of glyceryl tristearate? Pause the video and try it.', caption: 'Your turn. What mass of sodium hydroxide is needed to saponify 89 g of glyceryl tristearate? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Eighty-nine grams is zero point one zero zero moles of fat, which needs three times as much sodium hydroxide, zero point three zero zero moles, or twelve grams.', caption: 'The answer is B. 89 g is 0.100 mol of fat, which needs three times as much sodium hydroxide, 0.300 mol, or 12.0 g.', show: 'q.answer' },
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
            'Fats and oils are triglycerides; oils are more unsaturated than fats.',
            'Hydrogenation with nickel hardens oils into margarine.',
            'Saponification: fat + 3NaOH gives glycerol + soap.',
            'Soap: water-loving head, grease-loving tail; detergents form no scum.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Fats and oils are triglycerides, and oils are more unsaturated than fats.', show: 'sum.0' },
        { say: 'Hydrogenation with a nickel catalyst hardens oils into margarine.', show: 'sum.1' },
        { say: 'Saponification turns a fat and three sodium hydroxide into glycerol and soap.', show: 'sum.2' },
        { say: 'And soap has a water-loving head and a grease-loving tail, while soapless detergents form no scum in hard water.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
