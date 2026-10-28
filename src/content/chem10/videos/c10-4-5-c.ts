import type { Explainer } from '@/video/script.ts';
import { particles } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { energyLevels, labels } from './lib/c10-4-figures.ts';

// Two kinds of reacting particles moving about in a container.
const box = figure('p', [particles({ state: 'gas', seed: 11, kinds: [{ id: 'a', tone: 'adj', count: 6 }, { id: 'b', tone: 'bad', count: 6 }] })], 440);
// The same volume with few acid particles (dilute) and with many (concentrated).
const conc = figure(
  'c',
  [
    particles({ name: 'lo', state: 'gas', size: 6, seed: 3, kinds: [{ id: 'acid', tone: 'bad', count: 3 }, { id: 'other', tone: 'adj', count: 4 }] }),
    particles({ name: 'hi', at: [7.5, 0], state: 'gas', size: 6, seed: 5, kinds: [{ id: 'acid', tone: 'bad', count: 9 }, { id: 'other', tone: 'adj', count: 4 }] }),
    labels([
      { id: 'lo-label', at: [3, -0.2], tex: '\\text{dilute}' },
      { id: 'hi-label', at: [10.5, -0.2], tex: '\\text{concentrated}' },
    ]),
  ],
  400,
);
// The energy diagram with and without a catalyst, from lesson 4.4.
const cat = figure('e', [energyLevels({ reactants: 250, peak: 400, products: 100, per: 100, step: 100, max: 500, catalyst: 300 })], 440);

const video: Explainer = {
  id: 'c10-4-5-c',
  lessonId: 'c10-4-5',
  title: 'Rates of Reaction, Part 3: Collision Theory',
  thumbnailTitle: 'Collision Theory',
  thumbnail: 'c',
  summary:
    'Particles react only when they collide with at least the activation energy, so the rate depends on how often they collide and what fraction of the collisions succeed. Higher concentration, higher gas pressure and a larger surface area make collisions more frequent; a higher temperature makes them more frequent and more energetic; a catalyst lowers the activation energy.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 3', title: 'Collision Theory', subtitle: 'Why some reactions go faster' }],
      lines: [
        { say: 'A fridge slows down the reactions that make food go bad, and a factory heats its reactions to speed them up. But why should a reaction go faster or slower at all?', show: 'title' },
        { say: 'In this part, you will use the particle model to explain how temperature, concentration, pressure, surface area and catalysts change the rate.' },
      ],
    },
    {
      chapter: 'Collisions',
      layout: 'split',
      leftWidth: 460,
      left: [box],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Collision theory', md: 'Particles react only when they **collide**, and only if the collision has at least the **activation energy**. The rate depends on how **often** particles collide and what **fraction** of the collisions succeed.' }],
      lines: [
        { say: 'Picture the reacting particles, always moving and bumping into each other.', show: ['p.box', 'p.a', 'p.b'] },
        { say: 'Particles react only when they collide, and only if the collision has at least the activation energy that you met in lesson four point four.', show: 'def' },
        { say: 'Most collisions are too gentle, and the particles just bounce apart.' },
        { say: 'So the rate depends on two things: how often the particles collide, and what fraction of the collisions have enough energy to succeed. Anything that increases either one makes the reaction faster.' },
      ],
    },
    {
      chapter: 'Concentration and pressure',
      layout: 'split',
      leftWidth: 600,
      left: [conc],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Higher concentration:** more reacting particles in the same volume, so they collide more often.', '**Higher gas pressure:** gas particles crowded into a smaller space, so they collide more often.'],
        },
      ],
      lines: [
        { say: 'Here are two acid solutions of the same volume. The concentrated one has many more acid particles, shown in red.', show: ['c.lo-box', 'c.lo-acid', 'c.lo-other', 'c.hi-box', 'c.hi-acid', 'c.hi-other', 'c.lo-label', 'c.hi-label'] },
        { say: 'With more reacting particles in the same volume, they collide more often, so the reaction is faster.', show: 'b.0', focus: 'c.hi-acid' },
        { say: 'Pressure does the same for gases. Squeeze a gas into a smaller space, and its particles are crowded together, so they collide more often.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Temperature and catalysts',
      layout: 'split',
      leftWidth: 600,
      left: [cat],
      right: [
        { kind: 'callout', id: 'temp', tone: 'key', title: 'Higher temperature', md: 'Particles move faster: they collide **more often**, and **more of the collisions** have at least the activation energy.' },
        { kind: 'callout', id: 'cat', tone: 'definition', title: 'Catalyst', md: 'Speeds up a reaction without being used up. It **lowers the activation energy**, so more collisions succeed.' },
      ],
      lines: [
        { say: 'At a higher temperature, the particles move faster. They collide more often, and more of the collisions have at least the activation energy.', show: 'temp' },
        { say: 'Temperature is the only factor that changes the energy of the collisions as well as how often they happen. That is why even a small rise in temperature can make a reaction much faster.' },
        { say: 'A catalyst is a substance that speeds up a reaction without being used up. It lowers the activation energy, so a bigger fraction of the collisions succeed.', show: ['cat', 'e.axes', 'e.curve', 'e.cat-curve', 'e.reactants', 'e.products', 'e.no-cat', 'e.cat'], focus: 'e.cat-curve' },
        { say: 'The same catalyst can be used again and again. The enzymes in living things are catalysts.' },
      ],
    },
    {
      chapter: 'Five factors',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Change', 'Rate', 'Why'],
          rows: [
            ['higher **temperature**', 'faster', 'collisions more often, and more have the activation energy'],
            ['higher **concentration**', 'faster', 'more particles in the same volume: collisions more often'],
            ['higher gas **pressure**', 'faster', 'particles crowded together: collisions more often'],
            ['larger **surface area**', 'faster', 'more of the solid’s particles exposed: collisions more often'],
            ['a **catalyst**', 'faster', 'a lower activation energy: more collisions succeed'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the five factors together. A larger surface area, from smaller pieces or a powder, exposes more of a solid’s particles, so collisions with them happen more often. You will look at it closely in part four.', show: 't' },
        { say: 'Notice that concentration, pressure and surface area change only how often particles collide. A catalyst changes neither: it lowers the energy barrier instead.', focus: ['t.1', 't.2', 't.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which change makes the particles collide more often **and** makes more of their collisions have at least the activation energy?',
          choices: ['Increasing the concentration of a solution', 'Adding a catalyst', 'Using a powder instead of lumps', 'Raising the temperature'],
          answer: 3,
          working: 'At a higher temperature the particles move faster: they collide more often and harder, so more collisions reach the activation energy.',
        },
      ],
      lines: [
        { say: 'Your turn. Which change makes the particles collide more often, and also makes more of their collisions have at least the activation energy? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, raising the temperature. The particles move faster, so they collide more often and harder. Choices A and C make collisions more frequent, but no more energetic, and a catalyst lowers the activation energy instead.', show: 'q.answer' },
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
            '**Collision theory:** particles react only when they collide with at least the activation energy.',
            'Concentration, gas pressure and surface area make collisions **more frequent**.',
            'Temperature makes them more frequent **and** more energetic; a **catalyst** lowers the activation energy.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Particles react only when they collide with at least the activation energy.', show: 'sum.0' },
        { say: 'A higher concentration, a higher gas pressure and a larger surface area make collisions more frequent.', show: 'sum.1' },
        { say: 'A higher temperature makes them more frequent and more energetic, and a catalyst lowers the activation energy. In part four, you will compare experiments, starting with surface area. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
