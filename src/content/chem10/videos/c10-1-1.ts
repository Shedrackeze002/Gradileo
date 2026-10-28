import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { stateBoxes } from './lib/c10-1-figures.ts';

const video: Explainer = {
  id: 'c10-1-1',
  lessonId: 'c10-1-1',
  title: 'States of Matter and the Particle Model, Part 1: The Particle Model',
  thumbnailTitle: 'The Particle Model',
  thumbnail: 'st',
  summary:
    'The particle model says that all matter is made of tiny particles that are always moving and attract one another, and that only their spacing, arrangement and speed can change. It describes solids, liquids and gases by how their particles are arranged and how they move.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 1', title: 'The Particle Model', subtitle: 'Solids, liquids and gases' }],
      lines: [
        { say: 'Leave a glass of iced water on a table on a warm day. Within minutes, droplets cover the outside of the glass, and in a few days the water is gone.', show: 'title' },
        { say: 'One idea explains both: everything is made of tiny particles that are always moving. This is the particle model.' },
        { say: 'In this part, you will use it to describe solids, liquids and gases. Later parts explain their properties, changes of state, and melting and boiling points.' },
      ],
    },
    {
      chapter: 'The particle model',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Particle model', md: 'All matter is made of **particles** far too small to see: atoms, molecules or ions.' },
        {
          kind: 'bullets',
          id: 'rules',
          items: [
            'The particles are **always moving**.',
            'The particles **attract** one another, more strongly the closer they are.',
            'The particles never change size, shape or mass. Only their **spacing**, **arrangement** and **speed** can change.',
          ],
        },
      ],
      lines: [
        { say: 'The particle model says that all matter is made of particles far too small to see: atoms, molecules or ions.', show: 'def' },
        { say: 'First, the particles are always moving.', show: 'rules.0' },
        { say: 'Second, the particles attract one another, and the forces are stronger the closer they are.', show: 'rules.1' },
        { say: 'Third, the particles themselves never change size, shape or mass. Only their spacing, their arrangement and how fast they move can change.', show: 'rules.2' },
      ],
    },
    {
      chapter: 'Three states of matter',
      layout: 'center',
      main: [figure('st', [stateBoxes()], 420)],
      lines: [
        { say: 'The three states of matter are solid, liquid and gas. The same substance can be in any of them: water can be ice, liquid water or steam.', show: 'st' },
        { say: 'From one state to another, only the arrangement and movement of the particles change.' },
        { say: 'In a solid, the particles are packed closely together, usually in a regular pattern. Strong forces hold each one in place, so they can only vibrate about fixed positions.', show: 'st.solid', focus: 'st.solid' },
        { say: 'In a liquid, the particles are still close together and touching, but arranged randomly. The forces are weaker, so they can slide past one another.', show: 'st.liquid', focus: 'st.liquid' },
        { say: 'In a gas, the particles are far apart compared with their size, and the forces between them are very weak. They move quickly in all directions, in straight lines, until they hit something.', show: 'st.gas', focus: 'st.gas' },
      ],
    },
    {
      chapter: 'Naming a state',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'In a sample of a substance, the particles are **touching** one another but are **not in any pattern**, and they keep **changing places** with their neighbours. Which state is the substance in?' },
        {
          kind: 'bullets',
          id: 'steps',
          items: ['The particles are touching, so it is a solid or a liquid, not a gas.', 'No pattern, and they change places, so they are not held in fixed positions.', 'The substance is a **liquid**.'],
        },
      ],
      lines: [
        { say: 'Let’s use the model. In a sample, the particles are touching one another but are not in any pattern, and they keep changing places with their neighbours. Which state is the substance in?', show: 'q' },
        { say: 'The particles are touching, so it is a solid or a liquid, not a gas.', show: 'steps.0' },
        { say: 'They are not in a pattern, and they change places, so they are not held in fixed positions, as in a solid.', show: 'steps.1' },
        { say: 'So the substance is a liquid.', show: 'steps.2' },
      ],
    },
    {
      chapter: 'Solid particles still move',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Particles in a solid still move', md: 'A solid stays still, but its particles **vibrate** all the time. They just cannot leave their positions. The particles of every substance are always moving.' }],
      lines: [
        { say: 'Because a solid stays still, it is tempting to say that its particles do not move.', show: 'oops' },
        { say: 'In fact, they vibrate all the time. They just cannot leave their positions. The particles of every substance are always moving.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which statement describes the particles in a **solid**, such as an iron nail?',
          choices: ['They do not move at all.', 'They vibrate about fixed positions.', 'They slide past one another.', 'They are far apart, with very weak forces between them.'],
          answer: 1,
          working: 'Strong forces hold the particles of a solid in place, so they vibrate about fixed positions. They still move: the particles of every substance are always moving.',
        },
      ],
      lines: [
        { say: 'Your turn. Which statement describes the particles in a solid, such as an iron nail? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: they vibrate about fixed positions. Choice A is the common mistake, since all particles are always moving. C describes a liquid, and D a gas.', show: 'q.answer' },
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
            'All matter is made of tiny particles that are always moving and attract one another.',
            'Only the spacing, arrangement and speed of the particles change, never their size.',
            '**Solid**: close, regular, vibrating. **Liquid**: close, random, sliding. **Gas**: far apart, fast.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The particle model says that all matter is made of tiny particles that are always moving and attract one another.', show: 'sum.0' },
        { say: 'Only their spacing, their arrangement and their speed can change, never their size.', show: 'sum.1' },
        { say: 'Solid particles are close, in a pattern, and vibrate. Liquid particles are close but random, and slide. Gas particles are far apart and fast. In part two, the model explains the properties of each state. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
