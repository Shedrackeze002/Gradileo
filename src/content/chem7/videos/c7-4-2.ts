import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-4-2',
  lessonId: 'c7-4-2',
  title: 'Evaporation and Distillation',
  thumbnail: 'app',
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
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Evaporation', md: 'Heat the solution until the solvent turns into a gas and escapes. The dissolved solid is **left behind**.' },
        { kind: 'bullets', id: 'why', items: ['Water boils at 100 °C; salt would need over 1400 °C.', 'In salt pans, the Sun evaporates sea water to leave sea salt.'] },
      ],
      lines: [
        { say: 'Evaporation separates a dissolved solid from its solution. We heat the solution in an evaporating dish until the solvent turns into a gas and escapes into the air.', show: 'def' },
        { say: 'The solid has a much higher boiling point, so it is left behind. Water boils at one hundred degrees, but salt would need well over a thousand.', show: 'why.0' },
        { say: 'In hot, sunny countries, sea water is let into shallow ponds called salt pans, and the Sun slowly evaporates the water to leave sea salt.', show: 'why.1' },
      ],
    },
    {
      chapter: 'Crystallization',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'cry', tone: 'definition', title: 'Crystallization', md: 'Crystals of a solute form as the solvent evaporates or the solution cools. **Slowly** gives large crystals.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['250\\ \\text{mL} = 0.25\\ \\text{L}', '30\\ \\text{g/L} \\times 0.25\\ \\text{L} = 7.5\\ \\text{g}'] },
      ],
      lines: [
        { say: 'As the solvent leaves, the solution can no longer hold all the solute, and it comes out as crystals. This is crystallization. If the solvent leaves slowly, the crystals have time to grow large.', show: 'cry' },
        { say: 'So to get good copper sulfate crystals, heat the solution until about half the water has gone, then leave it to cool. Boiling it dry makes the hot solid spit out of the dish.' },
        { say: 'A solution has thirty grams of salt in every litre, and two hundred and fifty millilitres is evaporated. That is zero point two five litres, so thirty times zero point two five gives seven point five grams of salt.', show: ['m.0', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Distillation',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'app',
          head: ['Part', 'What happens there'],
          rows: [
            ['flask, heated', 'the water boils to steam; the salt stays behind'],
            ['condenser, cooled by cold water', 'the steam condenses back into liquid water'],
            ['beaker at the end', 'pure water, the distillate, collects'],
          ],
        },
      ],
      lines: [
        { say: 'Evaporation loses the water to the air. To keep the water as well, we use distillation, which is two changes of state, one after the other.', show: 'app' },
        { say: 'First, the solution is heated in a flask until the water boils and becomes steam. The salt does not boil, so it stays in the flask.', focus: 'app.0' },
        { say: 'Then the steam passes into a condenser, a tube cooled by cold water flowing around it, where it condenses back into a liquid.', focus: 'app.1' },
        { say: 'The pure liquid collected at the end is called the distillate. Ships use distillation to make drinking water from sea water.', focus: 'app.2' },
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
