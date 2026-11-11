import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c9-3-4',
  lessonId: 'c9-3-4',
  title: 'Rates of Reaction',
  thumbnail: 'why',
  summary:
    'The rate of reaction is how fast products form, and the mean rate is the amount of product divided by the time. Higher temperature, higher concentration, larger surface area and a catalyst all increase the rate. Collision theory explains why: particles must collide with enough energy, and more frequent successful collisions mean a faster reaction.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Reactions and Conservation of Mass', title: 'Rates of Reaction', subtitle: 'Speeding reactions up, and why it works' }],
      lines: [
        { say: 'Some reactions are over in a flash, like a firework. Others take years, like rusting.', show: 'title' },
        { say: 'In this video, you will find out what changes the rate of a reaction, and use collision theory to explain why.' },
      ],
    },
    {
      chapter: 'What changes the rate',
      layout: 'center',
      main: [
        { kind: 'math', id: 'rate', size: 'md', lines: ['\\text{mean rate} = \\dfrac{\\text{amount of product made}}{\\text{time taken}}'] },
        { kind: 'callout', id: 'four', tone: 'key', title: 'Four ways to speed up a reaction', md: 'Higher **temperature**, higher **concentration**, larger **surface area**, and a **catalyst**.' },
      ],
      lines: [
        { say: 'The rate of reaction is how fast reactants are used up, or products are made. The mean rate is the amount of product made, divided by the time taken.', show: 'rate' },
        { say: 'For example, if a reaction gives off sixty cubic centimetres of gas in twenty seconds, the mean rate is sixty divided by twenty, which is three cubic centimetres per second.' },
        { say: 'Four changes make a reaction faster: a higher temperature, a higher concentration of a solution, a larger surface area of a solid, and adding a catalyst.', show: 'four' },
        { say: 'A catalyst speeds up a reaction without being used up. It is still there, unchanged, at the end. Enzymes are the catalysts in living things.' },
      ],
    },
    {
      chapter: 'Collision theory',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ct', tone: 'definition', title: 'Collision theory', md: 'Particles react only when they **collide** with **enough energy**. More frequent successful collisions mean a **faster** reaction.' },
        {
          kind: 'table',
          id: 'why',
          head: ['Change', 'Why it is faster'],
          rows: [
            ['higher temperature', 'faster particles: more collisions, with more energy'],
            ['higher concentration', 'more particles in the same space'],
            ['larger surface area', 'more particles exposed at once'],
            ['catalyst', 'an easier route that needs less energy'],
          ],
        },
      ],
      lines: [
        { say: 'Collision theory says particles react only when they collide with enough energy. Anything that makes successful collisions more frequent makes the reaction faster.', show: 'ct' },
        { say: 'At a higher temperature, particles move faster. They collide more often, and more of the collisions have enough energy to react. Both make the rate rise.', show: ['why', 'why.0'], focus: 'why.0' },
        { say: 'A higher concentration puts more particles in the same volume, so they collide more often.', show: 'why.1', focus: 'why.1' },
        { say: 'Breaking a solid into small pieces or a powder exposes more of its particles, so there are more collisions at once.', show: 'why.2', focus: 'why.2' },
        { say: 'And a catalyst gives the reaction an easier route that needs less energy, so more collisions succeed.', show: 'why.3', focus: 'why.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why does powdered marble react with acid faster than a single lump?',
          choices: ['the powder has a larger surface area', 'the powder is hotter', 'the powder is a catalyst', 'the acid is more concentrated'],
          answer: 0,
          working: 'More marble particles are exposed to the acid, so there are more collisions each second.',
        },
      ],
      lines: [
        { say: 'Your turn. Why does powdered marble react with acid faster than a single lump? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The powder has a much larger surface area, so more marble particles are exposed to the acid, and there are more collisions each second.', show: 'q.answer' },
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
            'Mean rate = amount of product ÷ time.',
            'Temperature, concentration, surface area and catalysts increase the rate.',
            'Particles must collide with enough energy.',
            'More frequent successful collisions: a faster reaction.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The mean rate is the amount of product made, divided by the time.', show: 'sum.0' },
        { say: 'Higher temperature, higher concentration, larger surface area and catalysts all increase the rate.', show: 'sum.1' },
        { say: 'Collision theory says particles must collide with enough energy to react.', show: 'sum.2' },
        { say: 'So more frequent successful collisions mean a faster reaction. Next, you will meet acids and bases.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
