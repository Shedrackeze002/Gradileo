import type { Explainer, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts). Water particles that reach the open
// top of the dish escape; salt is bonded far too strongly to boil, so it stays and, as the water
// goes and the dish cools, its particles lock together into a crystal. The still has a hot plate
// under the flask on the left and a cold condenser on the right, with a low wall between.

const SALT = { n: 10, bond: 2, heavy: 3, tone: 'theta', name: 'salt' } as const;
const WATER = { heavy: 0.3, tone: 'adj', name: 'water' } as const;

/** Salt water in an open dish, heated until most of the water has gone, then left to cool. */
const dish: ParticlesEl = {
  kind: 'particles',
  id: 'ev',
  boxes: [{ id: 'a', state: 'liquid', width: 12, height: 10, temp: 0.5, escape: true, bath: 'floor', cross: 2.4, kinds: [{ ...SALT }, { n: 40, ...WATER }], label: 'salt water in a dish' }],
  clips: { heat: { phases: [{ dur: 2, heat: { a: 1.8 } }, { dur: 12 }] }, cool: { phases: [{ dur: 4, heat: { a: 0.3 } }, { dur: 5 }] } },
  speed: 1,
  height: 420,
};

/** Salt water in a still: the flask heated on the left, the condenser cooled on the right. */
const still: ParticlesEl = {
  kind: 'particles',
  id: 'st',
  boxes: [
    {
      id: 'a',
      state: 'liquid',
      width: 20,
      height: 12,
      temp: 0.5,
      wall: { at: 0.5, height: 0.5 },
      cross: 1.6,
      zones: [{ x: [0, 0.5], y: [0, 0.17] }, { x: [0.6, 1], y: [0, 1], temp: 0.4 }],
      kinds: [{ n: 8, bond: 3, heavy: 6, tone: 'theta', name: 'salt' }, { n: 30, ...WATER }],
      label: 'flask (heated)  |  condenser (cooled)',
    },
  ],
  clips: { boil: { phases: [{ dur: 2, heat: { a: 1.6 } }, { dur: 6 }] }, more: { phases: [{ dur: 10 }] } },
  speed: 5,
  height: 400,
};

const video: Explainer = {
  id: 'c7-4-2',
  lessonId: 'c7-4-2',
  title: 'Evaporation and Distillation',
  thumbnail: 'st',
  summary:
    'Evaporation removes the solvent as a gas and leaves the dissolved solid behind; slow evaporation or cooling lets large crystals form. Distillation is boiling then condensing: the vapour is cooled in a condenser and collected as the pure distillate, while the dissolved solid stays in the flask. Use evaporation to keep the solid, and distillation to keep the liquid too.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Separating Mixtures', title: 'Evaporation and Distillation', subtitle: 'Using heat to separate a solution' }],
      lines: [
        { say: 'Filtering salt water does not get the salt out, because the salt is dissolved. To separate a solution, we need heat.', show: 'title' },
        { say: 'We turn the solvent into a gas. In this video, you will see how what we do with that gas decides whether we keep the solid, or the liquid as well.' },
      ],
    },
    {
      chapter: 'Evaporation',
      layout: 'split',
      leftWidth: 560,
      left: [dish],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Evaporation', md: 'Heat the solution until the solvent turns into a gas and escapes. The dissolved solid is **left behind**.' },
        { kind: 'callout', id: 'cry', tone: 'definition', title: 'Crystallization', md: 'Crystals of a solute form as the solvent evaporates or the solution cools. **Slowly** gives large crystals.' },
      ],
      lines: [
        { say: 'Evaporation separates a dissolved solid from its solution. Here is salt water in an open dish: yellow salt particles, dissolved among blue water particles.', show: ['ev', 'ev.labels', 'def'] },
        { say: 'Let’s heat it. The water particles speed up, and one by one they escape into the air as a gas. The salt particles stay behind in the dish.', play: 'ev.heat', focus: 'ev.a' },
        { say: 'The salt has a much higher boiling point, so it is left behind. Water boils at one hundred degrees, but salt would need well over a thousand.' },
        { say: 'In hot, sunny countries, sea water is let into shallow ponds called salt pans, and the Sun slowly evaporates the water to leave sea salt.' },
        { say: 'Now let the dish cool. With so little water left, it can no longer hold all the salt, so the salt particles lock together into a crystal. This is crystallization.', play: 'ev.cool', show: 'cry', focus: 'ev.a' },
        { say: 'If the solvent leaves slowly, the crystals have time to grow large. So to get good copper sulfate crystals, heat the solution until about half the water has gone, then leave it to cool. Boiling it dry makes the hot solid spit out of the dish.' },
      ],
    },
    {
      chapter: 'How much solid?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['250\\ \\text{mL} = 0.25\\ \\text{L}', '30\\ \\text{g/L} \\times 0.25\\ \\text{L} = 7.5\\ \\text{g}'] }],
      lines: [
        { say: 'A solution has thirty grams of salt in every litre, and two hundred and fifty millilitres is evaporated. That is zero point two five litres.', show: 'm.0', focus: 'm.0' },
        { say: 'So thirty times zero point two five gives seven point five grams of salt left in the dish.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Distillation',
      layout: 'split',
      leftWidth: 620,
      left: [still],
      right: [
        {
          kind: 'table',
          id: 'app',
          head: ['Part', 'What happens there'],
          rows: [
            ['flask, heated', 'the water boils; the salt stays'],
            ['condenser, cooled', 'the steam condenses to water'],
            ['beaker at the end', 'the pure distillate collects'],
          ],
        },
      ],
      lines: [
        { say: 'Evaporation loses the water to the air. To keep the water as well, we use distillation, which is two changes of state, one after the other. Here is salt water in a flask on the left, beside a cold condenser on the right.', show: ['st', 'st.labels', 'app'] },
        { say: 'First, the flask is heated until the water boils and becomes steam. The salt does not boil, so it stays in the flask.', play: 'st.boil', focus: 'app.0' },
        { say: 'Then the steam passes into the condenser, which is cooled by cold water flowing around it. There, the steam condenses back into a liquid.', play: 'st.more', focus: 'app.1' },
        { say: 'The pure liquid collected at the end is called the distillate. There is no salt in it. Ships use distillation to make drinking water from sea water.', focus: 'app.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Salt water is distilled. What is collected in the beaker at the end?',
          choices: ['Pure water', 'Salty water, saltier than before', 'Dry salt crystals', 'Steam'],
          answer: 0,
          working: 'Only the water boils. It condenses in the condenser and collects as pure water; the salt stays in the flask.',
        },
      ],
      lines: [
        { say: 'Your turn. Salt water is distilled. What is collected in the beaker at the end? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, pure water. Only the water boils and travels through the condenser. The salt never leaves the flask.', show: 'q.answer' },
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
            '**Evaporation** leaves the dissolved solid behind.',
            '**Crystallization**: slow evaporation gives large crystals.',
            '**Distillation**: boil, then condense in a **condenser**.',
            'Evaporation keeps the solid; distillation keeps the liquid too.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Evaporation removes the solvent as a gas and leaves the dissolved solid behind.', show: 'sum.0' },
        { say: 'If the solvent leaves slowly, large crystals form.', show: 'sum.1' },
        { say: 'Distillation boils the solvent, then cools it in a condenser and collects it as the pure distillate.', show: 'sum.2' },
        { say: 'So use evaporation to keep the solid, and distillation to keep the liquid too. Next, you will separate the dyes in an ink.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
