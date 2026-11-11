import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-4-3',
  lessonId: 'c7-4-3',
  title: 'Chromatography and Choosing a Method',
  thumbnail: 'choose',
  summary:
    'Paper chromatography separates the dyes in an ink: the solvent carries the dyes up the paper at different speeds. Each spot is one dye, and a pure dye gives one spot. Draw the start line in pencil and keep the ink dot above the solvent. Choose a separation method by asking whether the solid is dissolved and which part you want to keep; some mixtures need several steps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Separating Mixtures', title: 'Chromatography and Choosing a Method', subtitle: 'Separating dyes, and picking the right method' }],
      lines: [
        { say: 'The black ink in a felt-tip pen looks like one colour, but it is often a mixture of several dyes. Forensic scientists use this to match the ink on a note to the pen that wrote it.', show: 'title' },
        { say: 'In this video, you will meet chromatography, and then put every separation method together to choose the right one.' },
      ],
    },
    {
      chapter: 'Paper chromatography',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            'Draw a **pencil** start line, and put a dot of ink on it.',
            'Dip the bottom edge in a **solvent**, with the dot **above** it.',
            'The solvent rises and carries the dyes at **different speeds**.',
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Pencil, not pen', md: 'Pencil does not dissolve. A pen line would run up the paper and add extra spots.' },
      ],
      lines: [
        { say: 'Paper chromatography separates the dyes in a mixture such as ink. First, draw a start line in pencil near the bottom of a strip of paper, and put a small dot of ink on it.', show: 'steps.0' },
        { say: 'Then dip the bottom edge in a solvent, such as water, with the dot above the solvent, or the ink would just wash off into it.', show: 'steps.1' },
        { say: 'The solvent soaks up the paper and carries the dyes with it. Different dyes travel at different speeds, so they spread out into separate spots.', show: 'steps.2' },
        { say: 'The line is drawn in pencil because pencil does not dissolve. A line in pen would run up the paper and add extra spots.', show: 'oops' },
      ],
    },
    {
      chapter: 'Reading a chromatogram',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'read', tone: 'key', title: 'Reading the spots', md: 'Each spot is **one dye**. A pure dye gives **one** spot. Two inks match if they give exactly the **same spots** at the same heights.' },
        { kind: 'table', id: 't', head: ['Sample', 'Spots at'], rows: [['ink X', '3 cm and 7 cm'], ['dye A', '3 cm'], ['dye B', '7 cm']] },
      ],
      lines: [
        { say: 'The finished paper is called a chromatogram. Each spot is a different dye, so a pure dye gives only one spot, and an ink that gives three spots is a mixture of three dyes.', show: 'read' },
        { say: 'Ink X gives two spots, at three and seven centimetres, so it contains two dyes.', show: 't', focus: 't.0' },
        { say: 'Dye A has a spot at three centimetres, and dye B has one at seven. So ink X is a mixture of dyes A and B.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Choosing a method',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'choose',
          head: ['To separate…', 'Use'],
          rows: [
            ['pieces of different sizes', 'sieving'],
            ['a magnetic metal from other solids', 'a magnet'],
            ['an insoluble solid from a liquid', 'filtration'],
            ['a dissolved solid, keeping the solid', 'evaporation'],
            ['a pure liquid from a solution', 'distillation'],
            ['the dyes in an ink', 'chromatography'],
          ],
        },
      ],
      lines: [
        { say: 'To choose a method, ask two questions. Is the solid dissolved or not? And which part do you want to keep?', show: 'choose' },
        { say: 'Solids of different sizes are sieved, and magnetic metals are pulled out with a magnet. An insoluble solid is filtered from a liquid.', focus: ['choose.0', 'choose.1', 'choose.2'] },
        { say: 'To get back a dissolved solid, evaporate. To keep the liquid as well, distil. And to separate dyes, use chromatography.', focus: ['choose.3', 'choose.4', 'choose.5'] },
        { say: 'Some mixtures need several steps. To get dry salt from salt and sand, add water and stir so the salt dissolves, filter off the sand, then evaporate the filtrate.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You want to keep both the salt and the water from salt water. Which method should you use?',
          choices: ['Evaporation', 'Filtration', 'Chromatography', 'Distillation'],
          answer: 3,
          working: 'Evaporation loses the water to the air, and filtration cannot catch dissolved salt. Distillation keeps the salt in the flask and collects the water.',
        },
      ],
      lines: [
        { say: 'Your turn. You want to keep both the salt and the water from salt water. Which method should you use? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, distillation. Evaporation would lose the water to the air, but distillation keeps the salt in the flask and collects the water.', show: 'q.answer' },
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
            '**Chromatography** separates dyes that travel at different speeds.',
            'Each spot is one dye; a pure dye gives one spot.',
            'Pencil start line, ink dot above the solvent.',
            'Ask: is it dissolved, and which part do I keep?',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Chromatography separates dyes, which travel up the paper at different speeds.', show: 'sum.0' },
        { say: 'Each spot is one dye, and a pure dye gives only one spot.', show: 'sum.1' },
        { say: 'Draw the start line in pencil, and keep the ink dot above the solvent.', show: 'sum.2' },
        { say: 'And to choose a method, ask whether the solid is dissolved, and which part you want to keep. That completes Grade 7 Chemistry. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
