import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { distillation, separatingFunnel } from './lib/c10-1-figures.ts';

const video: Explainer = {
  id: 'c10-1-3-b',
  lessonId: 'c10-1-3',
  title: 'Separating Mixtures, Part 2: Distillation and Other Methods',
  thumbnailTitle: 'Distillation',
  thumbnail: 'd',
  summary:
    'Simple distillation boils a solution and condenses the vapour, collecting the pure solvent (the distillate). Fractional distillation separates liquids that mix, by boiling point: the lowest boiling point distils first. A magnet removes magnetic solids, a separating funnel separates liquids that do not mix, and decanting pours a liquid off a settled solid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 2', title: 'Distillation and Other Methods', subtitle: 'Boiling points, magnets and layers' }],
      lines: [
        { say: 'Crude oil is no use in a car until it has been separated into fuels. And sea water becomes drinkable if you boil it and catch the steam.', show: 'title' },
        { say: 'In this part, you will separate liquids by distillation, and meet three simpler methods: a magnet, a separating funnel, and decanting.' },
      ],
    },
    {
      chapter: 'Simple distillation',
      layout: 'center',
      main: [figure('d', [distillation()], 560)],
      lines: [
        { say: 'Simple distillation collects the pure solvent from a solution. The solution, here salt water, is boiled in a flask.', show: ['d.flask', 'd.solution', 'd.solution-l', 'd.flame', 'd.heat-l', 'd.thermo', 'd.thermo-l'] },
        { say: 'The vapour travels into the condenser: a tube cooled by cold water flowing around it.', show: ['d.tube', 'd.vapour', 'd.jacket', 'd.water-in', 'd.water-out', 'd.in-l', 'd.out-l', 'd.cond-l'], focus: 'd.jacket' },
        { say: 'There, the vapour condenses back into a liquid, called the distillate, which drips into a beaker.', show: ['d.beaker', 'd.drip', 'd.distillate', 'd.distillate-l'], focus: 'd.distillate' },
        { say: 'The dissolved salt has a much higher boiling point, so it stays behind in the flask. Distilling sea water gives pure water.', focus: 'd.solution' },
      ],
    },
    {
      chapter: 'Fractional distillation',
      layout: 'center',
      main: [figure('fd', [distillation({ column: true, solution: '\\text{ethanol and water}', distillate: '\\text{ethanol}' })], 560)],
      lines: [
        { say: 'Fractional distillation separates liquids that mix completely but have different boiling points, such as ethanol, which boils at seventy-eight degrees Celsius, and water, at one hundred.', show: 'fd' },
        { say: 'A tall fractionating column above the flask helps to separate the vapours.', focus: ['fd.flask', 'fd.beads'] },
        { say: 'The liquid with the lowest boiling point reaches the top of the column, and distils over first. Here, that is ethanol. As the temperature rises, the next liquid follows.', focus: 'fd.distillate' },
        { say: 'Fractional distillation separates crude oil into fuels, and liquid air into nitrogen and oxygen.', focus: 'fd' },
      ],
    },
    {
      chapter: 'Simpler methods',
      layout: 'split',
      leftWidth: 520,
      left: [figure('sf', [separatingFunnel()])],
      right: [
        {
          kind: 'bullets',
          id: 'm',
          items: [
            '**A magnet** pulls iron or steel out of a mixture with non-magnetic solids.',
            '**A separating funnel** separates liquids that do not mix: the denser layer runs off first.',
            '**Decanting**: carefully pouring a liquid off a dense solid that has settled.',
          ],
        },
      ],
      lines: [
        { say: 'Some mixtures need simpler methods. A magnet pulls iron or steel out of a mixture with non-magnetic solids, such as iron filings from sand.', show: 'm.0' },
        { say: 'A separating funnel separates liquids that do not mix, such as oil and water. They settle into two layers, with the denser liquid at the bottom.', show: ['sf', 'm.1'] },
        { say: 'Opening the tap at the bottom runs off the lower layer first.', focus: 'sf.lower' },
        { say: 'Decanting means carefully pouring a liquid off a dense solid that has settled to the bottom, such as water off gravel.', show: 'm.2', focus: 'sf' },
      ],
    },
    {
      chapter: 'Two liquids',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Liquid P boils at $65^\\circ\\text{C}$ and liquid Q at $118^\\circ\\text{C}$. They mix completely. Which method separates them, and which liquid is collected first?' },
        {
          kind: 'bullets',
          id: 'steps',
          items: ['They mix completely, so they form no layers: a separating funnel will not work.', 'They have different boiling points: **fractional distillation**.', 'P has the lower boiling point, so **P is collected first**.'],
        },
      ],
      lines: [
        { say: 'Liquid P boils at sixty-five degrees Celsius, and liquid Q at one hundred eighteen. They mix completely. Which method separates them, and which liquid is collected first?', show: 'q' },
        { say: 'The liquids mix completely, so they do not form layers, and a separating funnel will not work.', show: 'steps.0' },
        { say: 'They have different boiling points, so fractional distillation separates them.', show: 'steps.1' },
        { say: 'P has the lower boiling point, so it boils off and is collected first.', show: 'steps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You have salt water, and you want to collect pure water from it. Water boils at $100^\\circ\\text{C}$; salt does not boil until well over $1000^\\circ\\text{C}$. Which method should you use?',
          choices: ['Filtration', 'Evaporation', 'Simple distillation', 'A separating funnel'],
          answer: 2,
          working: 'Simple distillation boils off the water, condenses it in the condenser and collects it as the distillate; the salt stays behind in the flask.',
        },
      ],
      lines: [
        { say: 'Your turn. You have salt water, and you want to collect pure water from it. Water boils at one hundred degrees Celsius, but salt does not boil until well over a thousand. Which method should you use? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, simple distillation, which collects the water as the distillate. Choice B, evaporation, gets the salt back, but the water escapes into the air. And filtering salt water just gives salt water.', show: 'q.answer' },
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
            '**Simple distillation** collects the solvent from a solution as the distillate.',
            '**Fractional distillation** separates liquids that mix; the lowest boiling point distils first.',
            '**Magnet**: magnetic solids. **Separating funnel**: liquids that do not mix. **Decanting**: a liquid off a settled solid.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Simple distillation boils a solution and condenses the vapour, collecting the pure solvent as the distillate.', show: 'sum.0' },
        { say: 'Fractional distillation separates liquids that mix, by their boiling points. The lowest boiling point distils first.', show: 'sum.1' },
        { say: 'A magnet removes magnetic solids, a separating funnel separates liquids that do not mix, and decanting pours a liquid off a settled solid. In part three, you will separate the dyes in an ink by paper chromatography. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
