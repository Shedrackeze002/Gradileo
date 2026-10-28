import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cylinders, floatSink } from './lib/c10-1-figures.ts';

const video: Explainer = {
  id: 'c10-1-4-d',
  lessonId: 'c10-1-4',
  title: 'Physical and Chemical Change, Part 4: Displacement and Floating',
  thumbnailTitle: 'Displacement and Floating',
  thumbnail: 'fs',
  summary:
    'The volume of an irregular object is found by displacement: the rise in the water level of a measuring cylinder. A key of mass 86.1 g that raises the water from 40 mL to 51 mL has a density of about 7.83 g/cm³, close to iron. Objects less dense than water (1.00 g/cm³) float in it; denser objects sink. Floating depends on density, not on mass alone.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 4', title: 'Displacement and Floating', subtitle: 'Odd shapes, and what floats' }],
      lines: [
        { say: 'A huge log floats on a lake, while a small pebble sinks straight to the bottom. Mass alone cannot explain it.', show: 'title' },
        { say: 'In this part, you will find the volume of an odd-shaped object by displacement, and use density to predict whether an object floats or sinks.' },
      ],
    },
    {
      chapter: 'Volume by displacement',
      layout: 'split',
      leftWidth: 600,
      left: [figure('cy', [cylinders({ before: 40, after: 51 })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Displacement', md: 'Lower the object into a measuring cylinder of water: the water level **rises by the volume** of the object.' },
        { kind: 'text', id: 'q', size: 'md', align: 'left', md: 'A key of mass $86.1\\ \\text{g}$ raises the water from $40\\ \\text{mL}$ to $51\\ \\text{mL}$. Find its density.' },
      ],
      lines: [
        { say: 'An object with an irregular shape, such as a stone or a key, has a volume that is hard to calculate.' },
        { say: 'Instead, lower it into a measuring cylinder of water. The water level rises by the volume of the object. This is called displacement.', show: ['cy.cyl1', 'cy.water1', 'cy.level1', 'cy.cyl2', 'cy.water2', 'cy.level2', 'cy.keyg', 'def'] },
        { say: 'A measuring cylinder holds forty millilitres of water. A key with a mass of eighty-six point one grams is lowered in, and the water rises to fifty-one millilitres. What is the density of the key?', show: 'q', focus: ['cy.level1', 'cy.level2'] },
      ],
    },
    {
      chapter: 'The density of a key',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['V = 51 - 40 = 11\\ \\text{mL} = 11\\ \\text{cm}^3', '\\rho = \\dfrac{m}{V} = \\dfrac{86.1\\ \\text{g}}{11\\ \\text{cm}^3} \\approx 7.83\\ \\text{g/cm}^3'] },
        { kind: 'text', id: 'id', size: 'md', md: 'Close to the density of iron, $7.87\\ \\text{g/cm}^3$.' },
      ],
      lines: [
        { say: 'The volume of the key is the rise in the water level: fifty-one minus forty, which is eleven millilitres, or eleven cubic centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Its density is mass over volume: eighty-six point one divided by eleven, which is about seven point eight three grams per cubic centimetre.', show: 'm.1', focus: 'm.1' },
        { say: 'That is close to the density of iron, seven point eight seven, so the key is probably made of iron.', show: 'id' },
      ],
    },
    {
      chapter: 'Floating and sinking',
      layout: 'split',
      leftWidth: 520,
      left: [figure('fs', [floatSink()])],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Water: $1.00\\ \\text{g/cm}^3$.', 'Less dense than water: **floats**. Ice, $0.92\\ \\text{g/cm}^3$.', 'Denser than water: **sinks**. Iron, $7.87\\ \\text{g/cm}^3$.', 'Oil, less dense than water, floats on top of it.'],
        },
      ],
      lines: [
        { say: 'Density also tells you whether an object floats. Water has a density of one point zero zero grams per cubic centimetre.', show: ['fs.beaker', 'fs.water', 'b.0'] },
        { say: 'An object less dense than water floats in it. Ice, at zero point nine two, floats, with most of its volume under the surface.', show: ['fs.ice', 'fs.ice-l', 'b.1'], focus: 'fs.ice' },
        { say: 'An object denser than water sinks. An iron nail, at seven point eight seven, goes straight to the bottom.', show: ['fs.nail', 'fs.nail-l', 'b.2'], focus: 'fs.nail' },
        { say: 'In the same way, a liquid that does not mix with water and is less dense than water, such as oil, floats on top of it.', show: 'b.3', focus: 'fs' },
      ],
    },
    {
      chapter: 'Heavy is not dense',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Heavy is not the same as dense', md: 'A huge log is much heavier than a small pebble, yet the log floats and the pebble sinks. Floating depends on **density**, mass per unit volume, not on mass alone.' }],
      lines: [
        { say: 'Back to the log and the pebble. The log is much heavier, yet it floats, and the pebble sinks.', show: 'oops' },
        { say: 'Floating depends on density, the mass per unit volume, not on mass alone. Wood is less dense than water, and stone is denser.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A block of wood has a mass of $54.0\\ \\text{g}$ and a volume of $90.0\\ \\text{cm}^3$. Water has a density of $1.00\\ \\text{g/cm}^3$. What is the density of the block, and does it float in water?',
          choices: ['$1.67\\ \\text{g/cm}^3$; it sinks.', '$0.60\\ \\text{g/cm}^3$; it sinks.', '$1.67\\ \\text{g/cm}^3$; it floats.', '$0.60\\ \\text{g/cm}^3$; it floats.'],
          answer: 3,
          working: '$\\rho = \\dfrac{54.0}{90.0} = 0.60\\ \\text{g/cm}^3$, which is less than $1.00\\ \\text{g/cm}^3$, so the block floats.',
        },
      ],
      lines: [
        { say: 'Your turn. A block of wood has a mass of fifty-four point zero grams, and a volume of ninety point zero cubic centimetres. Water has a density of one point zero zero grams per cubic centimetre. What is the density of the block, and does it float in water? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Fifty-four point zero divided by ninety point zero is zero point six zero grams per cubic centimetre, which is less than water, so the block floats. One point six seven comes from dividing the wrong way round.', show: 'q.answer' },
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
            '**Displacement**: the rise in the water level is the volume of the object.',
            'Less dense than water ($1.00\\ \\text{g/cm}^3$): floats. Denser: sinks.',
            'Floating depends on density, not on mass alone.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The volume of an odd-shaped object is the rise in the water level when it is lowered into a measuring cylinder.', show: 'sum.0' },
        { say: 'An object less dense than water floats in it, and a denser object sinks.', show: 'sum.1' },
        { say: 'And floating depends on density, not on mass alone. That completes this lesson on physical and chemical change.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
