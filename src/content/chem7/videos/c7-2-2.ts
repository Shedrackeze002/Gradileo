import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-2-2',
  lessonId: 'c7-2-2',
  title: 'Changes of State',
  thumbnail: 'names',
  summary:
    'Melting, evaporating and sublimation need a substance to take in heat; freezing and condensation give heat out. A change of state does not make a new substance. Below its melting point a substance is solid, between its melting and boiling points it is liquid, and above its boiling point it is gas.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Particle Model', title: 'Changes of State', subtitle: 'Melting, boiling, freezing and condensing' }],
      lines: [
        { say: 'An ice lolly drips on a hot day. A puddle disappears in the sun. A cold can of juice gets wet on the outside.', show: 'title' },
        { say: 'Each of these is a change of state. In this video, you will name the changes, and use melting and boiling points to predict a substance’s state.' },
      ],
    },
    {
      chapter: 'Naming the changes',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'names',
          head: ['Change', 'From', 'To', 'Heat'],
          rows: [
            ['melting', 'solid', 'liquid', 'taken in'],
            ['evaporation, boiling', 'liquid', 'gas', 'taken in'],
            ['sublimation', 'solid', 'gas', 'taken in'],
            ['freezing', 'liquid', 'solid', 'given out'],
            ['condensation', 'gas', 'liquid', 'given out'],
          ],
        },
      ],
      lines: [
        { say: 'A change of state happens when a substance is heated or cooled enough for its particles to change how they are arranged. Ice, water and steam are all still water.', show: 'names' },
        { say: 'Melting turns a solid into a liquid. Evaporation turns a liquid into a gas, and when it happens all through the liquid, with bubbles, we call it boiling.', focus: ['names.0', 'names.1'] },
        { say: 'Sublimation turns a solid straight into a gas, without becoming a liquid first. All three of these need the particles to move apart, so the substance must take in heat.', focus: 'names.2' },
        { say: 'Freezing and condensation go the other way. The particles come closer together, and the substance gives out heat.', focus: ['names.3', 'names.4'] },
      ],
    },
    {
      chapter: 'Water on a cold can',
      layout: 'center',
      main: [
        { kind: 'text', id: 'can', md: 'Drops of water form on the **outside** of a cold can of juice. Where do they come from?' },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Condensation', md: 'Invisible **water vapour** in the air touches the cold can, gives out heat, and turns into liquid water.' },
      ],
      lines: [
        { say: 'Drops of water form on the outside of a cold can of juice. Where do they come from?', show: 'can' },
        { say: 'They are not juice leaking out. The air always holds some invisible water vapour. When it touches the cold can, it gives out heat and condenses into liquid water.', show: 'ans' },
      ],
    },
    {
      chapter: 'Melting and boiling points',
      layout: 'center',
      main: [
        { kind: 'table', id: 'mp', head: ['Substance', 'Melts at (°C)', 'Boils at (°C)'], rows: [['oxygen', '−218', '−183'], ['ethanol', '−114', '78'], ['water', '0', '100']] },
        { kind: 'bullets', id: 'rule', items: ['Below the melting point: **solid**.', 'Between the two: **liquid**.', 'Above the boiling point: **gas**.'] },
      ],
      lines: [
        { say: 'Each pure substance melts and boils at its own fixed temperatures, called its melting point and its boiling point.', show: 'mp' },
        { say: 'Below its melting point, a substance is a solid. Between its melting and boiling points, it is a liquid. Above its boiling point, it is a gas.', show: ['rule.0', 'rule.1', 'rule.2'] },
        { say: 'Ethanol melts at minus one hundred and fourteen degrees and boils at seventy-eight. So at twenty degrees it is a liquid, and at ninety degrees it is a gas.', focus: 'mp.1' },
        { say: 'Take care with negative numbers. Minus one hundred and twenty is colder than minus one hundred and fourteen, so at minus one hundred and twenty, ethanol is a solid.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Oxygen melts at −218 °C and boils at −183 °C. What state is oxygen in at −200 °C?',
          choices: ['A liquid', 'A solid', 'A gas', 'A solid and a gas at once'],
          answer: 0,
          working: '−200 °C is warmer than −218 °C but colder than −183 °C, so it lies between the melting and boiling points: oxygen is a liquid.',
        },
      ],
      lines: [
        { say: 'Your turn. Oxygen melts at minus two hundred and eighteen degrees and boils at minus one hundred and eighty-three. What state is it in at minus two hundred? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Minus two hundred lies between the melting point and the boiling point, so oxygen is a liquid.', show: 'q.answer' },
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
            'Melting, evaporating and sublimation **take in heat**.',
            'Freezing and condensation **give out heat**.',
            'A change of state does not make a new substance.',
            'Solid below the melting point, liquid between, gas above the boiling point.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Melting, evaporation and sublimation need the substance to take in heat.', show: 'sum.0' },
        { say: 'Freezing and condensation give heat out.', show: 'sum.1' },
        { say: 'A change of state never makes a new substance.', show: 'sum.2' },
        { say: 'And a substance is solid below its melting point, liquid between, and gas above its boiling point. Next, you will find out what temperature and heat really are.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
