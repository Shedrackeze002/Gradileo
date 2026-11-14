import type { Explainer, ParticleBox, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts). Sugar's particles are drawn to the
// water's more strongly than to one another, so the water pulls them off the lump; sand's hold on
// to one another, so it stays whole. The simulation runs faster than usual (`speed`), as real
// dissolving takes minutes.

const WATER = { heavy: 0.2, tone: 'adj', name: 'water' } as const;
const SUGAR = { bond: 1.5, heavy: 0.2, tone: 'theta', name: 'sugar' } as const;

/** A box of water with a lump in it, held until it is dropped in. */
const lump = (id: string, solid: { bond: number; heavy: number; tone: 'theta' | 'opp' }, cross: number, label: string): ParticleBox => ({
  id,
  state: 'liquid',
  kinds: [{ n: 14, ...solid }, { n: 44, ...WATER }],
  lump: true,
  hold: true,
  cross,
  width: 12,
  height: 9,
  temp: 0.7,
  label,
});

/** Sugar and sand dropped into water. */
const drop: ParticlesEl = {
  kind: 'particles',
  id: 'p',
  boxes: [lump('s', { bond: 1.5, heavy: 0.2, tone: 'theta' }, 1.8, 'sugar in water'), lump('d', { bond: 4, heavy: 3, tone: 'opp' }, 1, 'sand in water')],
  clips: { drop: { phases: [{ dur: 1, release: ['s', 'd'] }, { dur: 11 }] } },
  speed: 4,
  height: 440,
};

/** A solution with a lot of sugar in it, and one with a little. */
const strengths: ParticlesEl = {
  kind: 'particles',
  id: 'c',
  boxes: [
    { id: 'c', state: 'liquid', kinds: [{ n: 14, ...SUGAR }, { n: 44, ...WATER }], cross: 1.8, width: 12, height: 9, temp: 0.7, label: 'concentrated' },
    { id: 'd', state: 'liquid', kinds: [{ n: 4, ...SUGAR }, { n: 54, ...WATER }], cross: 1.8, width: 12, height: 9, temp: 0.7, label: 'dilute' },
  ],
  clips: {},
  speed: 6,
  height: 400,
};

const video: Explainer = {
  id: 'c7-3-2',
  lessonId: 'c7-3-2',
  title: 'Solutions and Concentration',
  thumbnail: 'f',
  summary:
    'A solute dissolves in a solvent to make a solution. Dissolved particles spread out but are not destroyed, so the mass of the solution is the mass of the solute plus the mass of the solvent. Concentration in grams per litre is the mass of solute divided by the volume of solution in litres; change millilitres to litres first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mixtures and Solutions', title: 'Solutions and Concentration', subtitle: 'Solute, solvent, and how strong a solution is' }],
      lines: [
        { say: 'Stir a spoonful of sugar into water, and it vanishes. But it is still there: the water tastes sweet, and nothing has been lost.', show: 'title' },
        { say: 'In this video, you will learn the words for the parts of a solution, and how to say exactly how strong a solution is.' },
      ],
    },
    {
      chapter: 'Dissolving',
      layout: 'center',
      main: [drop],
      lines: [
        { say: 'Here is a lump of sugar in water, and beside it a lump of sand in water. The yellow particles are sugar, the orange ones are sand, and the blue ones are water.', show: ['p', 'p.labels'] },
        { say: 'Let’s drop them in, and watch. The water particles pull the sugar particles off the lump, one by one, and they spread out between the water particles. The sugar dissolves.', play: 'p.drop', show: 'p.count', focus: 'p.s' },
        { say: 'The sand does not. Its particles hold on to one another far more strongly than the water can pull them, so the sand stays in one piece. Sand is insoluble.', focus: 'p.d' },
      ],
    },
    {
      chapter: 'Solute, solvent and solution',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'parts',
          head: ['Word', 'Meaning', 'In sugary water'],
          rows: [
            ['solute', 'the substance that dissolves', 'the sugar'],
            ['solvent', 'the substance it dissolves in', 'the water'],
            ['solution', 'the mixture that forms', 'the sugary water'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dissolving is not melting', md: 'Sugar in tea does not melt. Its particles **spread out** between the water particles.' },
      ],
      lines: [
        { say: 'A solution forms when one substance dissolves in another. The solute is the substance that dissolves, like the sugar.', show: ['parts', 'parts.0'], focus: 'parts.0' },
        { say: 'The solvent is the substance it dissolves in, like the water. Water dissolves so many things that it is called the universal solvent.', show: 'parts.1', focus: 'parts.1' },
        { say: 'And the solution is the mixture that forms. A substance that dissolves is soluble, and one that does not, like sand in water, is insoluble.', show: 'parts.2', focus: 'parts.2' },
        { say: 'Dissolving is not melting. Sugar would need over one hundred and eighty degrees to melt. In tea, its particles simply spread out between the water particles.', show: 'oops' },
      ],
    },
    {
      chapter: 'Mass is conserved',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{mass of solution} = \\text{mass of solute} + \\text{mass of solvent}', '25\\ \\text{g} + 200\\ \\text{g} = 225\\ \\text{g}'] },
      ],
      lines: [
        { say: 'Remember the sugar particles spreading out through the water. When a solute dissolves, its particles become too small to see, but they are not destroyed. So mass is conserved. The mass of the solution is the mass of the solute plus the mass of the solvent.', show: 'm.0', focus: 'm.0' },
        { say: 'Dissolve twenty-five grams of salt in two hundred grams of water, and the solution has a mass of two hundred and twenty-five grams.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Concentration',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{concentration} = \\dfrac{\\text{mass of solute (g)}}{\\text{volume of solution (L)}}', '250\\ \\text{mL} = 0.25\\ \\text{L}', '\\dfrac{4}{0.25} = 16\\ \\text{g/L}'] },
      ],
      lines: [
        { say: 'A cup of tea with three spoonfuls of sugar is sweeter than one with a single spoonful. The amount of solute in each litre of solution is its concentration, in grams per litre.', show: 'f.0', focus: 'f.0' },
        { say: 'Four grams of salt is dissolved to make two hundred and fifty millilitres of solution. First, change the volume to litres: two hundred and fifty millilitres is zero point two five litres.', show: 'f.1', focus: 'f.1' },
        { say: 'Four divided by zero point two five is sixteen, so the concentration is sixteen grams per litre.', show: 'f.2', focus: 'f.2' },
      ],
    },
    {
      chapter: 'Concentrated and dilute',
      layout: 'center',
      main: [strengths, { kind: 'callout', id: 'dil', tone: 'tip', title: 'Diluting', md: 'Adding more solvent spreads the same solute through a bigger volume, so each litre holds less.' }],
      lines: [
        { say: 'Here are two sugar solutions, with the same amount of water. A concentrated solution has a lot of solute in each litre, and a dilute one has only a little.', show: ['c', 'c.labels'] },
        { say: 'Look how many yellow sugar particles there are among the water in each one. The concentrated solution is sweeter.', focus: ['c.c', 'c.d'] },
        { say: 'Adding more solvent spreads the same solute through a bigger volume, so each litre holds less. Adding water makes a solution more dilute.', show: 'dil' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '10 g of sugar is dissolved to make 500 mL of solution. What is the concentration?',
          choices: ['5 g/L', '20 g/L', '0.02 g/L', '50 g/L'],
          answer: 1,
          working: '500 mL = 0.5 L, and 10 ÷ 0.5 = 20 g/L.',
        },
      ],
      lines: [
        { say: 'Your turn. Ten grams of sugar is dissolved to make five hundred millilitres of solution. What is the concentration? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Five hundred millilitres is zero point five litres, and ten divided by zero point five is twenty grams per litre.', show: 'q.answer' },
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
            'The **solute** dissolves in the **solvent** to make a **solution**.',
            'Mass of solution = mass of solute + mass of solvent.',
            '**Concentration** (g/L) = mass of solute ÷ volume in litres.',
            'Change mL to L first.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The solute dissolves in the solvent to make a solution.', show: 'sum.0' },
        { say: 'Nothing is lost, so the mass of the solution is the mass of the solute plus the mass of the solvent.', show: 'sum.1' },
        { say: 'Concentration in grams per litre is the mass of solute divided by the volume in litres.', show: 'sum.2' },
        { say: 'So always change millilitres to litres first. Next, you will find out how much of a solute can dissolve.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
