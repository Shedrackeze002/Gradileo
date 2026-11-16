import type { Explainer } from '@/video/script.ts';
import { diffusion, squeeze } from './lib/c10-particles.ts';

const video: Explainer = {
  id: 'c10-1-1-b',
  lessonId: 'c10-1-1',
  title: 'States of Matter and the Particle Model, Part 2: Explaining Properties',
  thumbnailTitle: 'Explaining Properties',
  thumbnail: 'd',
  summary:
    'The particle model explains why a gas can be compressed but a liquid hardly at all, why liquids flow and take the shape of their container, why solids keep their shape, and why smells spread by diffusion. Particles never grow or shrink: only the spaces between them change.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 2', title: 'Explaining Properties', subtitle: 'Why gases squash and liquids flow' }],
      lines: [
        { say: 'Push in the plunger of a sealed syringe of air, and it moves a long way. Try the same with a syringe of water, and it will not move at all.', show: 'title' },
        { say: 'In this part, the particle model explains why, and explains the other properties of solids, liquids and gases too.' },
      ],
    },
    {
      chapter: 'Compressing a gas',
      layout: 'split',
      leftWidth: 600,
      left: [squeeze('sy', 380)],
      right: [
        { kind: 'callout', id: 'gas', tone: 'key', title: 'Gases can be compressed', md: 'Their particles are **far apart**, with empty space between them.' },
        { kind: 'callout', id: 'liq', tone: 'key', title: 'Liquids hardly compress', md: 'Their particles are **already touching**, with almost no space between them.' },
      ],
      lines: [
        { say: 'Here are a solid, a liquid and a gas, each sealed under a piston like the plunger of a syringe. In the gas, the particles are far apart, with empty space between them.', show: ['sy', 'sy.labels'], focus: 'sy.g' },
        { say: 'Now push each piston down with the same push. The gas squashes easily: its particles are squeezed closer together, into that empty space. That is why a gas can be compressed.', play: 'sy.push', show: 'gas' },
        { say: 'The liquid hardly moves. Its particles are already touching, so there is almost no space to push them into.', show: 'liq', focus: 'sy.l' },
        { say: 'Solids hardly compress either, for the same reason: their particles are already touching.', focus: 'sy.s' },
      ],
    },
    {
      chapter: 'Shape, volume and flow',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Solid', 'Liquid', 'Gas'],
          rows: [
            ['Shape', 'fixed', 'takes the shape of its container', 'fills its whole container'],
            ['Volume', 'fixed', 'fixed', 'not fixed: fills the container'],
            ['Compressed?', 'no', 'hardly at all', 'yes, easily'],
            ['Flows?', 'no', 'yes', 'yes'],
          ],
        },
      ],
      lines: [
        { say: 'The same idea explains every property in this table. A solid keeps its shape and does not flow, because its particles are held in fixed positions.', show: 't', focus: 't' },
        { say: 'A liquid flows and takes the shape of its container, because its particles can slide past one another. But it keeps a fixed volume, because the particles stay close together.', focus: ['t.0', 't.1', 't.3'] },
        { say: 'A gas flows too, and spreads out to fill every part of its container, because nothing holds its particles together.', focus: ['t.0', 't.1'] },
      ],
    },
    {
      chapter: 'Diffusion',
      layout: 'split',
      leftWidth: 560,
      left: [diffusion('d', 440)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Diffusion', md: 'The spreading of particles from where there are **many** to where there are **few**.' },
        { kind: 'bullets', id: 'ex', items: ['A smell spreads across a room in a few minutes.', 'A drop of food colouring takes far longer to spread through still water.', 'Gas particles move faster, and have more space to move into.'] },
      ],
      lines: [
        { say: 'Particles that are always moving spread out. The spreading of particles from where there are many to where there are few is called diffusion.', show: 'def' },
        { say: 'Here are two gases and two liquids, each pair kept apart by a wall. Watch as the walls lift. Nobody stirs them: the particles spread out by their own movement.', show: ['d', 'd.labels'], play: 'd.lift' },
        { say: 'The gases mix far faster than the liquids. In the same way, a smell spreads across a room in a few minutes, but a drop of food colouring takes far longer to spread through a glass of still water.', show: ['ex.0', 'ex.1'], focus: 'd.g' },
        { say: 'The difference is that gas particles move faster, and have much more space to move into.', show: 'ex.2' },
      ],
    },
    {
      chapter: 'Particles never change size',
      layout: 'split',
      leftWidth: 600,
      left: [squeeze('sq', 380)],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Particles do not grow or shrink', md: 'Compress a gas, and the **spaces** between its particles get smaller, not the particles. Heat a solid, and its particles **vibrate more** and push one another slightly further apart; they do not get bigger.' }],
      lines: [
        { say: 'Watch the gas being squeezed again. Its particles stay just as big as before. When a gas is compressed, its particles do not get smaller. The spaces between them do.', show: ['sq', 'sq.labels', 'oops'], play: 'sq.push', focus: 'sq.g' },
        { say: 'In the same way, when a solid is heated and expands, its particles do not get bigger. They vibrate more, and push one another slightly further apart.', focus: 'sq' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why does a liquid take the shape of its container? Use the particle model.',
          choices: [
            'Its particles are far apart, with a lot of space between them.',
            'Its particles are held in fixed positions by strong forces.',
            'Its particles grow larger to fill the container.',
            'Its particles are not held in fixed positions, so they can slide past one another.',
          ],
          answer: 3,
          working: 'Liquid particles stay close together but can move over one another, so the liquid flows into the shape of its container.',
        },
      ],
      lines: [
        { say: 'Your turn. Why does a liquid take the shape of its container? Use the particle model. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Liquid particles are not held in place, so they slide past one another into the shape of the container. Choice A describes a gas, and particles never grow, so C is wrong.', show: 'q.answer' },
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
            'Gases compress because their particles are far apart; liquids and solids hardly compress.',
            'Liquids flow because their particles slide past one another; solids keep their shape.',
            '**Diffusion**: particles spread from where there are many to where there are few.',
            'Particles never grow or shrink; only the spaces between them change.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Gases can be compressed because their particles are far apart. In liquids and solids, the particles are already touching.', show: 'sum.0' },
        { say: 'Liquids flow because their particles slide past one another, and solids keep their shape because their particles are held in place.', show: 'sum.1' },
        { say: 'Diffusion is the spreading of particles from where there are many to where there are few.', show: 'sum.2' },
        { say: 'And particles never grow or shrink. In part three, you will name the changes of state, and see which ones take in energy. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
