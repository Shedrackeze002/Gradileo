import type { Explainer, ParticleBox, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts): water can only pull so many sugar
// particles away before it holds all it can, so a big lump is left partly undissolved, while sand
// never dissolves at all. The simulation runs faster than usual (`speed`).

/** A lump of `n` particles in water, held until it is dropped in. */
const cup = (id: string, n: number, water: number, label: string, solid = { bond: 2, heavy: 0.5, tone: 'theta' as const }, cross = 1.8): ParticleBox => ({
  id,
  state: 'liquid',
  kinds: [{ n, ...solid }, { n: water, heavy: 0.2, tone: 'adj' }],
  lump: true,
  hold: true,
  cross,
  width: 10,
  height: 9,
  temp: 0.7,
  label,
});

const three: ParticlesEl = {
  kind: 'particles',
  id: 'p',
  boxes: [
    cup('a', 5, 40, 'a little sugar'),
    cup('b', 24, 34, 'a lot of sugar'),
    cup('c', 14, 36, 'sand', { bond: 4, heavy: 3, tone: 'opp' }, 1),
  ],
  clips: { drop: { phases: [{ dur: 1, release: ['a', 'b', 'c'] }, { dur: 12 }] } },
  speed: 4,
  height: 400,
};

const video: Explainer = {
  id: 'c7-3-3',
  lessonId: 'c7-3-3',
  title: 'Solubility',
  thumbnail: 'p',
  summary:
    'Solubility is the most solute that can dissolve in a fixed amount of solvent, often 100 g of water, at a given temperature. For most solids it rises with temperature. Scale a table value to other masses of water; any extra solute stays undissolved, and cooling a saturated solution gives crystals. A saturated solution can dissolve no more solute; an unsaturated one can.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mixtures and Solutions', title: 'Solubility', subtitle: 'How much can dissolve, and saturated solutions' }],
      lines: [
        { say: 'Keep stirring sugar into a cup of tea, and at some point the extra sugar just sits at the bottom. There is a limit to how much any solvent can hold.', show: 'title' },
        { say: 'In this video, you will read solubility tables, and learn what saturated and unsaturated solutions are.' },
      ],
    },
    {
      chapter: 'Solubility',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Solubility', md: 'The **greatest mass** of a substance that can dissolve in a fixed amount of solvent, at a given temperature. Often in grams per 100 g of water.' },
        { kind: 'table', id: 't', head: ['Temperature (°C)', '0', '20', '40', '60', '80'], rows: [['potassium nitrate', '13', '32', '64', '110', '169'], ['salt', '36', '36', '37', '37', '38']] },
      ],
      lines: [
        { say: 'Solubility is the greatest mass of a substance that can dissolve in a fixed amount of solvent, at a given temperature. It is usually given in grams per hundred grams of water.', show: 'def' },
        { say: 'For most solids, solubility rises as the temperature rises. This table shows that temperature makes a huge difference to potassium nitrate.', show: 't', focus: 't.0' },
        { say: 'But it makes hardly any difference to salt.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Using the table',
      layout: 'center',
      main: [
        { kind: 'math', id: 'half', size: 'lg', lines: ['40\\,^\\circ\\text{C},\\ 100\\ \\text{g water}: \\ 64\\ \\text{g}', '50\\ \\text{g water}: \\ 64 \\div 2 = 32\\ \\text{g}'] },
        { kind: 'math', id: 'cool', size: 'lg', lines: ['\\text{cool from } 60\\,^\\circ\\text{C} \\text{ to } 20\\,^\\circ\\text{C}: \\ 110 - 32 = 78\\ \\text{g of crystals}'] },
      ],
      lines: [
        { say: 'At forty degrees, sixty-four grams of potassium nitrate dissolves in a hundred grams of water.', show: 'half.0', focus: 'half.0' },
        { say: 'Fifty grams of water is half as much, so half as much dissolves: thirty-two grams.', show: 'half.1', focus: 'half.1' },
        { say: 'If a full, hot solution is cooled, it can hold less, so the extra comes out as crystals. A hundred grams of water holds one hundred and ten grams at sixty degrees, but only thirty-two grams at twenty. So seventy-eight grams of crystals form.', show: 'cool', focus: 'cool' },
      ],
    },
    {
      chapter: 'Saturated or unsaturated?',
      layout: 'center',
      main: [three, { kind: 'callout', id: 'sat', tone: 'definition', title: 'Saturated and unsaturated', md: 'A **saturated** solution holds as much solute as it can. An **unsaturated** one could still dissolve more.' }],
      lines: [
        { say: 'Here are three boxes of water. Into the first goes a little sugar, into the second a lot of sugar, and into the third some sand.', show: ['p', 'p.labels'] },
        { say: 'Watch. The little sugar dissolves completely. In the second box, the water pulls sugar particles away until it holds as much as it can, and then the rest of the lump just sits at the bottom.', play: 'p.drop', show: 'p.count', focus: ['p.a', 'p.b'] },
        { say: 'The second solution is saturated: it holds as much solute as it can at that temperature, and any extra stays undissolved. The first is unsaturated: it could still dissolve more.', show: 'sat', focus: 'p.b' },
        { say: 'To tell which you have, add a little more solute and stir. If it dissolves, the solution was unsaturated.' },
      ],
    },
    {
      chapter: 'Insoluble is not saturated',
      layout: 'center',
      main: [{ ...three, id: 'q2' }, { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Insoluble is not saturated', md: 'Sand at the bottom never dissolved at all. Sugar at the bottom is there because **no more** can dissolve.' }],
      lines: [
        { say: 'Do not confuse saturated with insoluble. Both boxes on the right have solid left at the bottom, but for different reasons.', show: ['q2', 'q2.labels'], play: 'q2.drop' },
        { say: 'The sand never dissolved at all, because sand is insoluble. The sugar at the bottom of the sugary water is there because no more can dissolve.', show: 'oops', focus: ['q2.b', 'q2.c'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'At 20 °C, 36 g of salt dissolves in 100 g of water. 30 g of salt is stirred into 100 g of water at 20 °C. Which is true?',
          choices: [
            'The solution is saturated, and 6 g stays as solid.',
            'The solution is saturated, and nothing more can dissolve.',
            'None of the salt dissolves, because salt is insoluble.',
            'All the salt dissolves, and the solution is unsaturated.',
          ],
          answer: 3,
          working: '30 g is less than the 36 g that can dissolve, so it all dissolves, and another 6 g could still dissolve.',
        },
      ],
      lines: [
        { say: 'Your turn. At twenty degrees, thirty-six grams of salt dissolves in a hundred grams of water. Thirty grams is stirred in. Which is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Thirty grams is less than thirty-six, so all of it dissolves, and the solution could take another six grams.', show: 'q.answer' },
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
            '**Solubility**: the most solute that can dissolve, at a given temperature.',
            'For most solids, solubility rises with temperature.',
            'Cooling a full, hot solution gives **crystals**.',
            '**Saturated**: no more can dissolve. **Unsaturated**: more can.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Solubility is the most solute that can dissolve in a fixed amount of solvent, at a given temperature.', show: 'sum.0' },
        { say: 'For most solids, it rises with temperature.', show: 'sum.1' },
        { say: 'So cooling a full, hot solution makes crystals form.', show: 'sum.2' },
        { say: 'And a saturated solution can dissolve no more, while an unsaturated one can. Next, you will find out what makes things dissolve faster.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
