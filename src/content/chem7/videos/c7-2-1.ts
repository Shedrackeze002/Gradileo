import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-2-1',
  lessonId: 'c7-2-1',
  title: 'Solids, Liquids and Gases',
  thumbnail: 't',
  summary:
    'Matter is usually solid, liquid or gas. The particle model says matter is made of tiny particles that are always moving and never change size. Solid particles are packed tightly and vibrate on the spot; liquid particles touch but slide past one another; gas particles are far apart and move quickly, so a gas fills its container and can be squashed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Particle Model', title: 'Solids, Liquids and Gases', subtitle: 'Three states, explained by tiny particles' }],
      lines: [
        { say: 'Ice keeps its shape on a plate. Water spreads across the table. Steam from a kettle fills the whole kitchen. All three are water, so why do they behave so differently?', show: 'title' },
        { say: 'In this video, you will meet the three states of matter, and the particle model that explains them.' },
      ],
    },
    {
      chapter: 'The three states',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Solid', 'Liquid', 'Gas'],
          rows: [
            ['Shape', 'keeps its own', 'takes its container’s', 'fills its container'],
            ['Volume', 'fixed', 'fixed', 'not fixed'],
            ['Flows?', 'no', 'yes', 'yes'],
            ['Squashed?', 'no', 'hardly', 'yes, easily'],
          ],
        },
      ],
      lines: [
        { say: 'Matter on Earth is usually a solid, a liquid or a gas. These are the three states, and the same substance can be in any of them.', show: 't' },
        { say: 'A solid keeps its own shape and volume. It does not flow, and it cannot be squashed.', focus: ['t.0', 't.1'] },
        { say: 'A liquid keeps its volume but takes the shape of its container, and it flows.', focus: ['t.0', 't.2'] },
        { say: 'A gas has no fixed shape or volume. It spreads out to fill its whole container, and it is easy to squash.', focus: ['t.1', 't.3'] },
      ],
    },
    {
      chapter: 'The particle model',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The particle model', md: 'All matter is made of **particles**, far too small to see. They are **always moving**, they attract one another, and they **never change size**.' },
        {
          kind: 'bullets',
          id: 'arr',
          items: [
            '**Solid**: packed tightly in rows; they **vibrate** on the spot.',
            '**Liquid**: still touching, but jumbled; they **slide past** one another.',
            '**Gas**: **far apart**, moving quickly in all directions.',
          ],
        },
      ],
      lines: [
        { say: 'The particle model says that all matter is made of particles far too small to see. They are always moving, they attract one another, and they never change size.', show: 'def' },
        { say: 'In a solid, the particles are packed tightly and held in place. They can only vibrate on the spot, so a solid keeps its shape.', show: 'arr.0' },
        { say: 'In a liquid, the particles still touch, but they slide past one another. So a liquid flows, but it is hard to squash, because there is almost no space between the particles.', show: 'arr.1' },
        { say: 'In a gas, the particles are far apart and move quickly. So a gas spreads out to fill its container, and it can be squashed into the empty space.', show: 'arr.2' },
      ],
    },
    {
      chapter: 'Two common mistakes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm1', tone: 'mistake', title: 'Particles in a solid still move', md: 'They **vibrate** all the time; they just cannot leave their places.' },
        { kind: 'callout', id: 'm2', tone: 'mistake', title: 'Particles do not shrink', md: 'Squash a gas, and the **spaces** between its particles get smaller, not the particles.' },
      ],
      lines: [
        { say: 'Watch out for two mistakes. A solid stays still, but its particles do not. They vibrate all the time. They just cannot leave their places.', show: 'm1' },
        { say: 'And when a gas is squashed, its particles do not get smaller. The spaces between them do.', show: 'm2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why can the air in a sealed syringe be pushed in, but water cannot?',
          choices: [
            'Air particles shrink when they are pushed, but water particles cannot.',
            'Air particles are far apart, but water particles are already touching.',
            'Water particles are held in fixed rows, but air particles are not.',
            'Water particles do not move, but air particles move quickly.',
          ],
          answer: 1,
          working: 'In a gas the particles are far apart, so they can be pushed closer. In a liquid they already touch, so there is no space to push them into.',
        },
      ],
      lines: [
        { say: 'Your turn. Why can the air in a sealed syringe be pushed in, but water cannot? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Air particles are far apart, so they can be pushed closer, while water particles already touch. Particles never shrink, so A is wrong.', show: 'q.answer' },
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
            'The three states are **solid**, **liquid** and **gas**.',
            'Particles are always moving and never change size.',
            'Solid: tightly packed, vibrating. Liquid: touching, sliding.',
            'Gas: far apart and fast, so it fills its container and can be squashed.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The three states of matter are solid, liquid and gas.', show: 'sum.0' },
        { say: 'All matter is made of particles that are always moving and never change size.', show: 'sum.1' },
        { say: 'Solid particles are tightly packed and vibrate, and liquid particles touch but slide past one another.', show: 'sum.2' },
        { say: 'And gas particles are far apart and fast. Next, you will see what happens when a substance changes from one state to another.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
