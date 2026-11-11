import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-2-3',
  lessonId: 'c7-2-3',
  title: 'Temperature and Heat',
  thumbnail: 'ways',
  summary:
    'Temperature, measured in degrees Celsius with a thermometer, tells how fast the particles move on average. Heat is energy moving from a hotter object to a cooler one. Heat moves by conduction through touching particles, best in metals; by convection in moving liquids and gases; and by radiation, even through empty space. Insulators such as wood, plastic, wool and air let heat through slowly.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Particle Model', title: 'Temperature and Heat', subtitle: 'What hot means, and how heat moves' }],
      lines: [
        { say: 'A metal spoon in hot soup quickly gets too hot to hold, but a wooden spoon does not. Why?', show: 'title' },
        { say: 'In this video, you will find out what temperature and heat really are, and the three ways heat moves.' },
      ],
    },
    {
      chapter: 'Temperature',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Temperature', md: 'How hot or cold something is: a measure of how fast its particles move, on average. Measured with a **thermometer**, in °C.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['{-6}\\,^\\circ\\text{C} \\to 0\\,^\\circ\\text{C}: \\ 6 \\text{ degrees}', '0\\,^\\circ\\text{C} \\to 4\\,^\\circ\\text{C}: \\ 4 \\text{ degrees}', '\\text{rise} = 6 + 4 = 10\\,^\\circ\\text{C}'] },
      ],
      lines: [
        { say: 'Temperature tells us how hot or cold something is. In the particle model, it measures how fast the particles are moving, on average. The faster they move, the higher the temperature.', show: 'def' },
        { say: 'On the Celsius scale, pure water freezes at zero degrees and boils at one hundred degrees. Colder temperatures are written with a minus sign.' },
        { say: 'A winter morning is at minus six degrees, and by afternoon it is four degrees. From minus six up to zero is six degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Then four more degrees up to four. So the temperature rose by ten degrees.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Heat',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'heat', tone: 'definition', title: 'Heat', md: 'Energy that moves from a **hotter** object to a **cooler** one, until both are at the same temperature.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Cold does not flow', md: 'Holding ice, your hand feels cold because **heat flows out** of your hand into the ice.' },
      ],
      lines: [
        { say: 'Heat is energy that moves from a hotter object to a cooler one. It keeps flowing until both are at the same temperature.', show: 'heat' },
        { say: 'Heat and temperature are not the same. A warm bath has a lower temperature than a cup of boiling water, but it holds far more heat energy, because it has far more particles.' },
        { say: 'When you hold an ice cube, your hand feels cold. Nothing called cold flows into your hand. Heat flows out of your hand, into the ice.', show: 'oops' },
      ],
    },
    {
      chapter: 'How heat moves',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ways',
          head: ['Way', 'How it works', 'Example'],
          rows: [
            ['conduction', 'particle to particle, through a material', 'a metal spoon in soup'],
            ['convection', 'carried by a moving liquid or gas', 'water heated in a pan'],
            ['radiation', 'as invisible rays, no particles needed', 'the Sun warming Earth'],
          ],
        },
        { kind: 'bullets', id: 'ins', items: ['**Conductors** let heat through easily: copper, iron, aluminium.', '**Insulators** let it through slowly: wood, plastic, wool, air.'] },
      ],
      lines: [
        { say: 'Heat moves in three ways. In conduction, faster-vibrating particles knock into their neighbours, passing heat through the material. It works best in metals.', show: ['ways', 'ways.0'], focus: 'ways.0' },
        { say: 'In convection, a liquid or gas moves and carries the heat with it. Warm water rises, and cooler water sinks to be heated in turn.', show: 'ways.1', focus: 'ways.1' },
        { say: 'And radiation travels as invisible rays that need no particles at all. That is how the Sun’s heat crosses empty space.', show: 'ways.2', focus: 'ways.2' },
        { say: 'Metals are conductors, which is why the metal spoon gets hot. Wood is an insulator, and so are plastic, wool and still air.', show: ['ins.0', 'ins.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How does the Sun’s heat reach Earth across empty space?',
          choices: ['By conduction', 'By convection', 'By sound waves', 'By radiation'],
          answer: 3,
          working: 'Conduction and convection both need particles. Space is empty, so only radiation, which travels as rays, can cross it.',
        },
      ],
      lines: [
        { say: 'Your turn. How does the Sun’s heat reach Earth across empty space? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, radiation. Conduction and convection both need particles, but radiation travels as rays, even through empty space.', show: 'q.answer' },
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
            '**Temperature** tells how fast the particles move on average.',
            '**Heat** is energy moving from hotter to cooler.',
            'Conduction through particles, convection in moving fluids, radiation as rays.',
            '**Insulators** such as wood, plastic, wool and air slow heat down.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Temperature tells how fast the particles move, on average.', show: 'sum.0' },
        { say: 'Heat is energy that flows from a hotter object to a cooler one.', show: 'sum.1' },
        { say: 'Heat moves by conduction, convection and radiation.', show: 'sum.2' },
        { say: 'And insulators let heat through slowly. Next, you will see how heating makes things expand, and how particles spread out by themselves.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
