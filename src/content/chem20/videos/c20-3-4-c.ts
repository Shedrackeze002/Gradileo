import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flask } from './lib/c20-3a-figures.ts';

// A 250.0 mL volumetric flask, filled up to its line.
const flaskFig = figure('f', [flask({ volume: '250.0\\ \\text{mL}' })], 540);

// The same flask with a funnel in its neck and a stopper, for the steps of making the solution.
const steps = figure('f', [flask({ volume: '250.0\\ \\text{mL}', funnel: true, stopper: true })], 540);

const video: Explainer = {
  id: 'c20-3-4-c',
  lessonId: 'c20-3-4',
  title: 'Molar Concentration, Part 3: Preparing a Standard Solution',
  thumbnailTitle: 'Preparing a Standard Solution',
  thumbnail: 'f',
  summary:
    'A standard solution has a precisely known concentration. It is made in a volumetric flask, which holds one exact volume when the bottom of the meniscus sits on its line: weigh the solid, dissolve it, transfer it with every rinse, fill to the line, mix and label.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 3', title: 'Preparing a Standard Solution', subtitle: 'Weigh, dissolve, make up to the line' }],
      lines: [
        { say: 'To find the unknown concentration of a solution, chemists often react it with a solution whose concentration they know precisely.', show: 'title' },
        { say: 'In this part, you will meet the volumetric flask, and follow the steps that turn a weighed solid into a solution of known concentration.' },
      ],
    },
    {
      chapter: 'Standard solutions',
      layout: 'split',
      leftWidth: 420,
      left: [flaskFig],
      right: [
        { kind: 'callout', id: 'std', tone: 'definition', title: 'Standard solution', md: 'A solution whose concentration is known **precisely**.' },
        { kind: 'callout', id: 'vol', tone: 'definition', title: 'Volumetric flask', md: 'A flask with a long, narrow neck marked with a single **line**. Filled until the bottom of the meniscus sits on the line, it holds one exact volume, at the temperature marked on it.' },
      ],
      lines: [
        { say: 'A standard solution is a solution whose concentration is known precisely.', show: 'std' },
        { say: 'It is made in a volumetric flask: a flask with a long, narrow neck, marked with a single line.', show: ['f.glass', 'f.mark', 'f.volume', 'vol'], focus: 'f.mark' },
        { say: 'Filled until the bottom of the meniscus sits on the line, it holds one exact volume, such as two hundred fifty point zero millilitres, at the temperature marked on it.', show: 'f.liquid', focus: 'f.liquid' },
      ],
    },
    {
      chapter: 'Six steps',
      layout: 'split',
      leftWidth: 420,
      left: [steps],
      right: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            '**Weigh** $3.18\\ \\text{g}$ of the solid into a clean, dry beaker.',
            '**Dissolve** it in a little distilled water.',
            '**Transfer** it through a funnel into the flask, with every rinse.',
            '**Fill** to just below the line, then add drops until the meniscus sits on it.',
            '**Mix:** stopper the flask and turn it upside down several times.',
            '**Label** it with the solute, its concentration and the date.',
          ],
        },
      ],
      lines: [
        { say: 'Here is how to make two hundred fifty millilitres of the zero point one two zero moles per litre sodium carbonate solution from part two. It needs three point one eight grams of solid.', show: ['f.glass', 'f.mark', 'f.volume'] },
        { say: 'One. Weigh three point one eight grams of the solid into a clean, dry beaker on a balance.', show: 's.0' },
        { say: 'Two. Dissolve it in a small volume of distilled water, much less than two hundred fifty millilitres, stirring until no solid remains.', show: 's.1' },
        { say: 'Three. Transfer the solution through a funnel into the flask. Rinse the beaker, the stirring rod and the funnel with a little distilled water, and add every rinse to the flask, so that no solute is left behind.', show: ['s.2', 'f.funnel'], focus: 'f.funnel' },
        { say: 'Four. Fill the flask with distilled water to just below the line. Then add the last drops with a dropper, until the bottom of the meniscus sits on the line, viewed at eye level.', show: ['s.3', 'f.liquid'], hide: 'f.funnel', focus: 'f.mark' },
        { say: 'Five. Mix: stopper the flask, and turn it upside down several times, so that the concentration is the same throughout.', show: ['s.4', 'f.stopper'], focus: 'f.stopper' },
        { say: 'Six. Label the flask with the name of the solute, its concentration and the date.', show: 's.5' },
      ],
    },
    {
      chapter: 'Make up to the volume',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Make up to the volume; do not add to it', md: 'Dissolving $3.18\\ \\text{g}$ of solid in $250\\ \\text{mL}$ of water does **not** make $250\\ \\text{mL}$ of solution: the dissolved solid changes the volume. The volume in $c = n/V$ is the volume of the **solution**.' },
      ],
      lines: [
        { say: 'One trap. Dissolving three point one eight grams of solid in two hundred fifty millilitres of water does not make two hundred fifty millilitres of solution, because the dissolved solid changes the volume.', show: 'mis' },
        { say: 'The volume in the formula is the volume of the solution. That is why you dissolve the solid first, and then add water up to the line.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which method makes $250.0\\ \\text{mL}$ of a standard solution from a weighed solid?',
          choices: [
            'Dissolve it in $250.0\\ \\text{mL}$ of water.',
            'Dissolve it in a little water, transfer it with every rinse to the flask, and fill to the line.',
            'Fill the flask to the line with water, then add the solid.',
            'Dissolve it in the flask, and fill until the top of the meniscus is on the line.',
          ],
          answer: 1,
          working: 'Dissolve first, then make up to the line in a $250.0\\ \\text{mL}$ volumetric flask, with the bottom of the meniscus on the line.',
        },
      ],
      lines: [
        { say: 'Your turn. Which method makes two hundred fifty point zero millilitres of a standard solution from a weighed solid? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Choice A gives more than two hundred fifty millilitres of solution, Choice C adds the solid after the water is already up to the line, and in Choice D the bottom of the meniscus should sit on the line, not the top.', show: 'q.answer' },
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
            'A **standard solution** has a precisely known concentration.',
            'A **volumetric flask** holds one exact volume when the bottom of the meniscus sits on its line.',
            'Weigh, dissolve, transfer with every rinse, fill to the line, mix, label.',
            'Make up to the volume; do not dissolve the solid in that volume of water.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A standard solution has a precisely known concentration.', show: 'sum.0' },
        { say: 'A volumetric flask holds one exact volume when the bottom of the meniscus sits on its line.', show: 'sum.1' },
        { say: 'To make the solution, weigh, dissolve, transfer with every rinse, fill to the line, mix, and label.', show: 'sum.2' },
        { say: 'And make up to the volume, rather than dissolving the solid in that volume of water. In part four, you will find the concentration of each ion in a solution. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
