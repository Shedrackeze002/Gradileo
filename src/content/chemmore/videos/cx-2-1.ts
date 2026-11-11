import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-2-1',
  lessonId: 'cx-2-1',
  title: 'Purity, Formulations and Tests for Gases',
  thumbnailTitle: 'Purity and Tests for Gases',
  thumbnail: false,
  summary:
    'In chemistry a pure substance is a single element or compound, and it melts sharply at a fixed temperature; an impurity lowers the melting point and spreads it over a range. A formulation is a mixture designed as a useful product. Four simple tests identify hydrogen, oxygen, carbon dioxide and chlorine.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Analysis', title: 'Purity and Tests for Gases', subtitle: 'What does “pure” really mean?' }],
      lines: [
        { say: 'A carton of orange juice says one hundred percent pure, and a chemist would disagree. The juice is water, sugars, acids and many other substances mixed together.', caption: 'A carton of orange juice says “100% pure”, and a chemist would disagree. The juice is water, sugars, acids and many other substances mixed together.', show: 'title' },
        { say: 'In this lesson, you will decide whether a substance is pure from the way it melts, say what a formulation is, and name a gas from a simple test.' },
      ],
    },
    {
      chapter: 'Pure substances',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Pure substance', md: 'A substance that contains **only one element or only one compound**, with nothing else mixed in.' },
        { kind: 'table', id: 't', head: ['Pure', 'Not pure'], rows: [['Distilled water', 'Mineral water'], ['Sodium chloride', 'Air'], ['Gold', 'Milk']] },
      ],
      lines: [
        { say: 'A pure substance contains only one element or only one compound, with nothing else mixed in.', show: 'def' },
        { say: 'Distilled water is pure. Mineral water is not, because salts are dissolved in it, even though nobody added them. And air is a mixture of gases, however clean it is.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Sodium chloride contains two elements, but they are chemically joined into one compound, so it is pure. A substance is impure only when two or more substances are mixed.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Melting points and purity',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['What is seen', 'What it shows'],
          rows: [
            ['Melts sharply at the known melting point', 'The pure substance'],
            ['Melts lower, and over a range', 'The substance with an impurity'],
          ],
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Pure aspirin melts at $136^\\circ\\text{C}$. A sample melts from $128^\\circ\\text{C}$ to $133^\\circ\\text{C}$.' },
      ],
      lines: [
        { say: 'A pure substance melts sharply, at one fixed temperature. The whole sample turns to liquid at its melting point.', show: 't.0' },
        { say: 'An impurity changes this in two ways. It lowers the melting point, and it makes the sample melt over a range of temperatures.', show: 't.1', focus: 't.1' },
        { say: 'Pure aspirin melts at one hundred thirty-six degrees Celsius. A sample starts to melt at one hundred twenty-eight degrees, and finishes at one hundred thirty-three.', caption: 'Pure aspirin melts at 136 °C. A sample starts to melt at 128 °C, and finishes at 133 °C.', show: 'ex', focus: 'ex' },
        { say: 'It melts below the true melting point, and over a range of five degrees. So the sample is aspirin with an impurity in it.' },
      ],
    },
    {
      chapter: 'Formulations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Formulation', md: 'A **mixture designed as a useful product**. Each substance is added in a carefully measured amount, and each has a job to do.' },
      ],
      lines: [
        { say: 'A formulation is a mixture that has been designed as a useful product. Each substance in it is added in a carefully measured amount, and each has a job to do.', show: 'def' },
        { say: 'Paint is a formulation. A pigment gives the colour, a binder holds it to the wall, and a solvent keeps the paint runny. Medicines, fertilisers, fuels and alloys are formulations too.' },
      ],
    },
    {
      chapter: 'Tests for four gases',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Gas', 'Test', 'Result'],
          rows: [
            ['Hydrogen', 'A **burning** splint', 'A squeaky pop'],
            ['Oxygen', 'A **glowing** splint', 'The splint relights'],
            ['Carbon dioxide', 'Bubble through limewater', 'The limewater turns milky'],
            ['Chlorine', '**Damp** litmus paper', 'The paper is bleached white'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Burning splint or glowing splint?', md: 'A **burning** splint is for hydrogen, the gas that burns. A **glowing** splint is for oxygen, the gas that relights it.' },
      ],
      lines: [
        { say: 'Four simple tests tell the common gases apart. Hydrogen burns, so a burning splint at the mouth of the tube gives a squeaky pop.', show: 't.0' },
        { say: 'Oxygen makes other things burn better, so a glowing splint relights.', show: 't.1', focus: 't.1' },
        { say: 'Carbon dioxide turns limewater milky, because it makes tiny white particles of calcium carbonate. And chlorine bleaches damp litmus paper white.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'The two splint tests are easy to swap. A burning splint is for hydrogen, the gas that burns. A glowing splint is for oxygen, the gas that relights it.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Magnesium ribbon fizzes in dilute hydrochloric acid. Which test identifies the gas?',
          choices: ['A glowing splint relights', 'A burning splint gives a squeaky pop', 'Limewater turns milky', 'Damp litmus paper is bleached'],
          answer: 1,
          working: 'A metal and an acid give a salt and hydrogen, and the test for hydrogen is a burning splint.',
        },
      ],
      lines: [
        { say: 'Your turn. Magnesium ribbon fizzes in dilute hydrochloric acid. Which test identifies the gas? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. A metal and an acid give a salt and hydrogen, and the test for hydrogen is a burning splint, which gives a squeaky pop. Choice A is the test for oxygen.', show: 'q.answer' },
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
            'A pure substance is a single element or a single compound.',
            'It melts sharply; an impurity lowers the melting point and widens the range.',
            'A formulation is a mixture designed as a useful product.',
            'Hydrogen pops, oxygen relights, carbon dioxide turns limewater milky, chlorine bleaches.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A pure substance is a single element or a single compound.', show: 'sum.0' },
        { say: 'It melts sharply at a fixed temperature. An impurity lowers the melting point, and makes the sample melt over a range.', show: 'sum.1' },
        { say: 'A formulation is a mixture designed as a useful product.', show: 'sum.2' },
        { say: 'And for the gases: hydrogen pops, oxygen relights a glowing splint, carbon dioxide turns limewater milky, and chlorine bleaches damp litmus paper.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
