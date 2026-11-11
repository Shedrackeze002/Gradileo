import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-3-4',
  lessonId: 'c7-3-4',
  title: 'How Fast Things Dissolve',
  thumbnail: 'vars',
  summary:
    'Stirring, heating the solvent and using smaller pieces all make a solid dissolve faster. They change the rate, not how much can dissolve in total. In a fair test, change only the independent variable, measure the dependent variable, and keep the controlled variables the same; repeat and average to make results more reliable.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mixtures and Solutions', title: 'How Fast Things Dissolve', subtitle: 'The rate of dissolving, and fair tests' }],
      lines: [
        { say: 'Why do we stir sugar into tea? And why does sugar vanish so much faster in hot tea than in iced tea?', show: 'title' },
        { say: 'In this video, you will find what changes the rate of dissolving, and how to design a fair test to find out.' },
      ],
    },
    {
      chapter: 'Three ways to dissolve faster',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'ways',
          items: [
            '**Stirring** brings fresh solvent to the solid.',
            '**Heating** makes solvent particles move faster and hit harder.',
            '**Smaller pieces** have more surface touching the solvent.',
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Faster is not more', md: 'Stirring makes sugar dissolve **faster**, but it does not let **more** dissolve. That is the solubility.' },
      ],
      lines: [
        { say: 'The rate of dissolving is how quickly a solute dissolves. We measure it by timing how long a fixed mass takes to dissolve: the shorter the time, the faster the rate.' },
        { say: 'Stirring helps, because it brings fresh solvent to the solid and carries dissolved particles away.', show: 'ways.0' },
        { say: 'Heating the solvent helps, because its particles move faster, so they hit the solid more often and harder.', show: 'ways.1' },
        { say: 'And smaller pieces help, because they have more surface touching the solvent. Granulated sugar dissolves faster than a sugar cube of the same mass.', show: 'ways.2' },
        { say: 'But faster is not more. Stirring does not let more sugar dissolve in total. That limit is the solubility, which depends on temperature.', show: 'oops' },
      ],
    },
    {
      chapter: 'Fair tests',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'vars',
          head: ['Variable', 'Meaning'],
          rows: [
            ['independent', 'the one thing you change on purpose'],
            ['dependent', 'what you measure, to see the effect'],
            ['controlled', 'everything else, kept the same'],
          ],
        },
      ],
      lines: [
        { say: 'To find out whether one thing really changes the rate, we change only that one thing, and keep everything else the same. This is a fair test.', show: 'vars' },
        { say: 'The independent variable is the one thing you change on purpose.', focus: 'vars.0' },
        { say: 'The dependent variable is what you measure, to see the effect.', focus: 'vars.1' },
        { say: 'And the controlled variables are everything else that could affect the result, which you keep the same.', focus: 'vars.2' },
      ],
    },
    {
      chapter: 'Designing a test',
      layout: 'center',
      main: [
        { kind: 'text', id: 'plan', md: 'Does the **temperature** of water change how fast salt dissolves?' },
        { kind: 'bullets', id: 'ans', items: ['Independent: the **temperature** of the water.', 'Dependent: the **time** to dissolve.', 'Controlled: mass of salt, volume of water, grain size, stirring.'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Repeat and average', md: 'One odd reading then has less effect, so the result is more reliable.' },
      ],
      lines: [
        { say: 'Fatima wants to find out whether the temperature of water changes how fast salt dissolves.', show: 'plan' },
        { say: 'The temperature is what Fatima changes, so it is the independent variable. The time the salt takes to dissolve is what she measures, so it is the dependent variable.', show: ['ans.0', 'ans.1'] },
        { say: 'Fatima must keep the mass of salt, the volume of water, the size of the grains and the stirring the same. These are the controlled variables.', show: 'ans.2' },
        { say: 'Repeating each test and averaging the times makes the result more reliable, because one odd reading has less effect.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A student times how long sugar takes to dissolve with and without stirring. What is the dependent variable?',
          choices: ['Whether the water is stirred', 'The volume of water', 'The time the sugar takes to dissolve', 'The mass of sugar'],
          answer: 2,
          working: 'The dependent variable is what is measured: the time. Stirring is the independent variable; the volume and mass are controlled.',
        },
      ],
      lines: [
        { say: 'Your turn. A student times how long sugar takes to dissolve, with and without stirring. What is the dependent variable? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, the time to dissolve, because that is what is measured. Stirring is the independent variable, and the volume and mass are controlled.', show: 'q.answer' },
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
            'Stirring, heating and smaller pieces make a solid **dissolve faster**.',
            'They change the rate, not how much can dissolve.',
            'Change the **independent** variable, measure the **dependent** one.',
            'Keep the **controlled** variables the same; repeat and average.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Stirring, heating the solvent and using smaller pieces all make a solid dissolve faster.', show: 'sum.0' },
        { say: 'They change the rate, not how much can dissolve in total.', show: 'sum.1' },
        { say: 'In a fair test, change only the independent variable, and measure the dependent variable.', show: 'sum.2' },
        { say: 'And keep the controlled variables the same. Next, you will start separating mixtures.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
