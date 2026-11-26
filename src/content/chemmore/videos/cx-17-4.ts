import type { Explainer } from '@/video/script.ts';
import { reaction } from '../../chem10/videos/lib/c10-equations.ts';
import { sulfurToAcid } from '../../chem30/videos/lib/c30-organic.ts';

const video: Explainer = {
  id: 'cx-17-4',
  lessonId: 'cx-17-4',
  title: 'Sulfur, Sulfur Dioxide and Sulfuric Acid',
  thumbnail: 'ct',
  summary:
    'Rhombic sulfur is stable below 96 °C and monoclinic sulfur above it, and plastic sulfur forms when boiling sulfur is poured into cold water. Sulfur dioxide is made from a sulfite and dilute acid; it is an acidic, choking gas and a reducing agent that turns acidified dichromate green. The Contact process joins sulfur dioxide and oxygen over vanadium(V) oxide at about 450 °C, and sulfuric acid acts as an acid, an oxidising agent, a dehydrating agent and a drying agent.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-metals and Their Compounds', title: 'Sulfur, Sulfur Dioxide and Sulfuric Acid', subtitle: 'The most made chemical in the world' }],
      lines: [
        { say: 'Sulfur is a yellow solid found near volcanoes, and its acid, sulfuric acid, is made in larger amounts than any other chemical.', show: 'title' },
        { say: 'In this lesson, you will describe the forms of sulfur, sulfur dioxide, the Contact process, and the four ways sulfuric acid acts.' },
      ],
    },
    {
      chapter: 'Allotropes of sulfur',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Allotropes', md: 'Different forms of the same element in the same physical state.' },
        {
          kind: 'table',
          id: 't',
          head: ['Form', 'When'],
          rows: [['Rhombic (α)', 'stable below 96 °C'], ['Monoclinic (β)', 'stable above 96 °C'], ['Plastic', 'boiling sulfur poured into cold water']],
        },
      ],
      lines: [
        { say: 'Allotropes are different forms of the same element in the same physical state. Sulfur has two crystal forms.', show: 'def' },
        { say: 'Rhombic sulfur is stable below ninety-six degrees, and monoclinic sulfur above it. Boiling sulfur poured into cold water gives soft, rubbery plastic sulfur, made of long tangled chains.', caption: 'Rhombic sulfur is stable below 96 °C, and monoclinic sulfur above it. Boiling sulfur poured into cold water gives soft, rubbery plastic sulfur, made of long tangled chains.', show: 't' },
      ],
    },
    {
      chapter: 'Burning sulfur',
      layout: 'center',
      main: [sulfurToAcid('sa', 420)],
      lines: [
        { say: 'Here is a sulfur atom, an oxygen molecule, and a water molecule in the air, up close.', show: 'sa' },
        { say: 'The sulfur burns, taking both oxygen atoms, to make sulfur dioxide.', play: 'sa.burn' },
        { say: 'Sulfur dioxide is an acidic oxide. With water it makes sulfurous acid, which is why sulfur dioxide from burning fuels causes acid rain.', play: 'sa.rain' },
      ],
    },
    {
      chapter: 'Sulfur dioxide',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Na2SO3 + 2HCl -> 2NaCl + H2O + SO2}'] },
        { kind: 'bullets', id: 'b', items: ['Colourless, choking, denser than air, soluble.', 'A **reducing agent**: turns orange acidified dichromate **green**.', 'Bleaches flowers by reduction; the colour slowly returns.', 'Uses: preserving fruit juice, bleaching wood pulp, making sulfuric acid.'] },
      ],
      lines: [
        { say: 'In the laboratory, sulfur dioxide is made by warming sodium sulfite with dilute hydrochloric acid. It is a colourless, choking gas, denser than air.', show: ['m', 'b.0'] },
        { say: 'It is a reducing agent, so it turns orange acidified potassium dichromate green, which is its test. It bleaches by reduction, so the colour slowly comes back in air.', show: ['b.1', 'b.2'] },
        { say: 'It is used to preserve fruit juices, to bleach wood pulp, and above all to make sulfuric acid.', show: 'b.3' },
      ],
    },
    {
      chapter: 'The Contact process',
      layout: 'center',
      main: [
        reaction('ct', { from: [{ t: 'SO2', n: 2 }, { t: 'O2' }], to: [{ t: 'SO3', n: 2 }], counts: true, height: 300 }),
        { kind: 'text', id: 'c', size: 'md', md: 'Vanadium(V) oxide catalyst, about **450 °C**, 1 to 2 atmospheres.' },
      ],
      lines: [
        { say: 'In the Contact process, sulfur is burned to sulfur dioxide. Then two sulfur dioxide molecules and one oxygen molecule join to make two sulfur trioxide molecules.', show: 'ct', play: 'ct.go' },
        { say: 'This happens over a vanadium five oxide catalyst at about four hundred fifty degrees and one to two atmospheres. The yield is already high, so expensive high pressure is not worth it.', caption: 'This happens over a vanadium(V) oxide catalyst at about 450 °C and 1 to 2 atmospheres. The yield is already high, so expensive high pressure is not worth it.', show: 'c' },
        { say: 'The sulfur trioxide is absorbed in concentrated sulfuric acid to make oleum, which is then diluted. Water is not used directly, because it makes a fine acid mist that is hard to collect.' },
      ],
    },
    {
      chapter: 'How sulfuric acid acts',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Role', 'Example'],
          rows: [
            ['Acid (dilute)', 'Zn + H₂SO₄ → ZnSO₄ + H₂'],
            ['Oxidising agent (hot, conc.)', 'Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O'],
            ['Dehydrating agent (conc.)', 'sugar → black carbon; blue CuSO₄·5H₂O → white'],
            ['Drying agent (conc.)', 'dries chlorine and hydrogen chloride'],
          ],
        },
      ],
      lines: [
        { say: 'Dilute sulfuric acid behaves as a typical acid. Hot and concentrated, it is an oxidising agent, and even reacts with copper, giving sulfur dioxide.', show: ['t.0', 't.1'] },
        { say: 'Concentrated, it is a dehydrating agent, pulling the elements of water out of sugar to leave black carbon. And it is a drying agent, removing water that is only mixed with a gas.', show: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Each sulfur atom ends up in one molecule of $\\ce{H2SO4}$. What mass of sulfuric acid can be made from 16 kg of sulfur? (S = 32, $\\ce{H2SO4}$ = 98)',
          choices: ['32.0 kg', '98.0 kg', '49.0 kg', '16.0 kg'],
          answer: 2,
          working: '32 kg of sulfur gives 98 kg of acid, so $16 \\times 98 \\div 32 = 49.0$ kg.',
        },
      ],
      lines: [
        { say: 'Your turn. Each sulfur atom ends up in one molecule of sulfuric acid. What mass of sulfuric acid can be made from sixteen kilograms of sulfur? Pause the video and try it.', caption: 'Your turn. Each sulfur atom ends up in one molecule of sulfuric acid. What mass of sulfuric acid can be made from 16 kg of sulfur? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Thirty-two kilograms of sulfur gives ninety-eight kilograms of acid, so sixteen kilograms gives half of that, forty-nine kilograms.', caption: 'The answer is C. 32 kg of sulfur gives 98 kg of acid, so 16 kg gives half of that, 49.0 kg.', show: 'q.answer' },
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
            'Rhombic sulfur below 96 °C, monoclinic above; plastic sulfur in cold water.',
            'SO₂: acidic, choking, a reducing agent that turns dichromate green.',
            'Contact process: 2SO₂ + O₂ ⇌ 2SO₃ over V₂O₅ at about 450 °C.',
            'Sulfuric acid: an acid, an oxidising, a dehydrating and a drying agent.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Rhombic sulfur is stable below ninety-six degrees, monoclinic above, and plastic sulfur forms in cold water.', caption: 'Let’s sum up. Rhombic sulfur is stable below 96 °C, monoclinic above, and plastic sulfur forms in cold water.', show: 'sum.0' },
        { say: 'Sulfur dioxide is an acidic, choking gas and a reducing agent that turns dichromate green.', show: 'sum.1' },
        { say: 'The Contact process joins sulfur dioxide and oxygen over vanadium five oxide at about four hundred fifty degrees.', caption: 'The Contact process joins sulfur dioxide and oxygen over vanadium(V) oxide at about 450 °C.', show: 'sum.2' },
        { say: 'And sulfuric acid acts as an acid, an oxidising agent, a dehydrating agent and a drying agent.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
