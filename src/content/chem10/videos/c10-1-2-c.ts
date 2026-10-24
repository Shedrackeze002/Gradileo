import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { mixBeakers } from './lib/c10-1-figures.ts';

const video: Explainer = {
  id: 'c10-1-2-c',
  lessonId: 'c10-1-2',
  title: 'Pure Substances and Mixtures, Part 3: Homogeneous and Heterogeneous Mixtures',
  thumbnailTitle: 'Homogeneous or Heterogeneous?',
  thumbnail: 'mb',
  summary:
    'A homogeneous mixture is the same all the way through, such as salt water, air, vinegar and brass; a heterogeneous mixture has parts you can see or layers, such as sand in water, oil and water, granite and soil. Looking clear does not make a substance pure: a pure substance boils at one fixed temperature.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 3', title: 'Homogeneous and Heterogeneous', subtitle: 'Can you see the parts?' }],
      lines: [
        { say: 'Salt water and muddy water are both mixtures of water and something else. But one looks perfectly clear, and in the other you can see the bits.', show: 'title' },
        { say: 'In this part, you will sort mixtures into two kinds, and see why a clear liquid is not always pure.' },
      ],
    },
    {
      chapter: 'Two kinds of mixture',
      layout: 'split',
      leftWidth: 560,
      left: [figure('mb', [mixBeakers()])],
      right: [
        { kind: 'callout', id: 'homo', tone: 'definition', title: 'Homogeneous mixture', md: 'The **same all the way through**: you cannot see its separate parts, even with a magnifying glass.' },
        { kind: 'callout', id: 'hetero', tone: 'definition', title: 'Heterogeneous mixture', md: '**Not** the same all the way through: you can see its different parts, or they separate into layers.' },
      ],
      lines: [
        { say: 'A homogeneous mixture is the same all the way through. You cannot see its separate parts, even with a magnifying glass. Salt water is homogeneous.', show: ['mb.homo', 'homo'] },
        { say: 'A heterogeneous mixture is not the same all the way through. You can see its different parts, or they separate into layers. Here, oil floats on water, with sand on the bottom.', show: ['mb.hetero', 'hetero'] },
      ],
    },
    {
      chapter: 'Examples',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'k',
          head: ['Homogeneous', 'Heterogeneous'],
          rows: [
            ['salt water', 'sand in water'],
            ['air', 'oil and water'],
            ['vinegar', 'granite'],
            ['brass', 'soil'],
          ],
        },
      ],
      lines: [
        { say: 'Salt water, air, vinegar and brass are all homogeneous. In each one, the substances are spread evenly, so every part looks the same.', show: 'k' },
        { say: 'Sand in water, oil and water, granite and soil are heterogeneous. In granite, for example, you can see grains of different minerals.' },
      ],
    },
    {
      chapter: 'Classifying mixtures',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Homogeneous or heterogeneous: sugar dissolved in water; muddy water; steel (iron with a little carbon)?' },
        {
          kind: 'bullets',
          id: 'steps',
          items: ['Sugar water: the sugar is spread evenly and cannot be seen. **Homogeneous**.', 'Muddy water: bits of soil you can see, which settle if left to stand. **Heterogeneous**.', 'Steel: the carbon is spread evenly through the iron. **Homogeneous**.'],
        },
      ],
      lines: [
        { say: 'Try these. Is each one a homogeneous or a heterogeneous mixture: sugar dissolved in water, muddy water, and steel, which is iron with a little carbon?', show: 'q' },
        { say: 'Dissolved sugar is spread evenly through the water and cannot be seen, so sugar water is homogeneous.', show: 'steps.0' },
        { say: 'Muddy water has bits of soil that you can see, and they settle to the bottom if it is left to stand. So it is heterogeneous.', show: 'steps.1' },
        { say: 'Steel looks the same all the way through, because the carbon is spread evenly through the iron. It is homogeneous.', show: 'steps.2' },
      ],
    },
    {
      chapter: 'Clear is not pure',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Clear does not mean pure', md: 'Salt water looks like pure water, but it is a **homogeneous mixture**. Pure water boils at one fixed temperature; salt water boils at a higher temperature, which changes as the water boils away.' }],
      lines: [
        { say: 'Watch out: salt water looks just like pure water, but it is a mixture. Being the same all the way through makes a mixture homogeneous. It does not make it pure.', show: 'oops' },
        { say: 'A pure substance has fixed melting and boiling points. Salt water boils at a higher temperature than pure water, and its boiling point changes as the water boils away.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A clear, colourless liquid starts to boil at $82^\\circ\\text{C}$, and its temperature keeps rising as it boils, up to $96^\\circ\\text{C}$. What is the liquid most likely to be?',
          choices: ['A mixture: a pure substance boils at one fixed temperature.', 'An element, because it is colourless.', 'A compound, because it is clear.', 'A pure substance, because it boils below $100^\\circ\\text{C}$.'],
          answer: 0,
          working: 'A pure substance (an element or a compound) boils at one fixed temperature. A liquid that boils over a range of temperatures contains more than one substance, so it is a mixture.',
        },
      ],
      lines: [
        { say: 'Your turn. A clear, colourless liquid starts to boil at eighty-two degrees Celsius, and its temperature keeps rising as it boils, up to ninety-six degrees. What is the liquid most likely to be? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, a mixture. A pure substance, whether an element or a compound, boils at one fixed temperature. Being clear and colourless tells you nothing about whether it is pure.', show: 'q.answer' },
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
            '**Homogeneous**: the same all the way through (salt water, air, brass).',
            '**Heterogeneous**: parts you can see, or layers (sand and water, granite).',
            'Clear does not mean pure: a pure substance boils at one fixed temperature.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A homogeneous mixture is the same all the way through, like salt water, air and brass.', show: 'sum.0' },
        { say: 'A heterogeneous mixture has parts you can see, or layers, like sand and water, or granite.', show: 'sum.1' },
        { say: 'And clear does not mean pure: a pure substance boils at one fixed temperature. In part four, you will look closely at one kind of homogeneous mixture: the solution. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
