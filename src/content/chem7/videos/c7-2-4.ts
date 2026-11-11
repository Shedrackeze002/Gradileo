import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-2-4',
  lessonId: 'c7-2-4',
  title: 'Expansion and Diffusion',
  thumbnail: 'uses',
  summary:
    'Most substances expand when heated and contract when cooled, because their particles move more and take up more room; the particles themselves do not grow. Expansion joints in bridges, sagging power lines and thermometers are everyday examples. Diffusion is particles spreading out by their own movement until they are evenly mixed: fastest in gases, slower in liquids, almost nothing in solids, and faster when warmer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Particle Model', title: 'Expansion and Diffusion', subtitle: 'Why bridges have gaps, and how smells spread' }],
      lines: [
        { say: 'Long bridges are built with small gaps between their sections. Power lines sag lower on a hot day. And a smell spreads across a room in a few minutes.', show: 'title' },
        { say: 'The particle model explains all of these, through two ideas: expansion and diffusion.' },
      ],
    },
    {
      chapter: 'Expansion and contraction',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Expansion and contraction', md: '**Expansion**: getting bigger when heated. **Contraction**: getting smaller when cooled.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The particles do not grow', md: 'Only the **space between** the particles grows. The number of particles, their size and the mass stay the same.' },
      ],
      lines: [
        { say: 'Most solids, liquids and gases expand when they are heated, and contract when they are cooled.', show: 'def' },
        { say: 'When a solid is heated, its particles vibrate more strongly and push one another slightly further apart, so the solid takes up more room. Gases expand the most.' },
        { say: 'Be careful: the particles themselves do not get bigger. Only the space between them grows, and the mass stays the same.', show: 'oops' },
      ],
    },
    {
      chapter: 'Expansion in everyday life',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'uses',
          items: [
            '**Bridges and railways** have gaps, so sections can expand without buckling.',
            '**Power lines** hang loosely, so they can contract in winter without snapping.',
            'The liquid in a **thermometer** expands and rises up the tube.',
            'A stuck metal lid loosens under hot water: metal expands more than glass.',
          ],
        },
      ],
      lines: [
        { say: 'Expansion is guarded against all around us. Bridges and railways have small gaps, so the sections can expand on hot days without buckling.', show: 'uses.0' },
        { say: 'Power lines are hung loosely, so they can contract on cold days without snapping.', show: 'uses.1' },
        { say: 'Expansion is also put to use. The liquid in a thermometer expands as it warms, and rises up the thin tube.', show: 'uses.2' },
        { say: 'And a stuck metal lid on a glass jar loosens under hot water, because the metal expands more than the glass.', show: 'uses.3' },
      ],
    },
    {
      chapter: 'Diffusion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'dif', tone: 'definition', title: 'Diffusion', md: 'Particles spreading out, by their **own random movement**, from where there are many to where there are few, until evenly mixed.' },
        { kind: 'table', id: 'speed', head: ['In a…', 'Diffusion is…', 'Because the particles…'], rows: [['gas', 'fastest', 'move quickly, with lots of space'], ['liquid', 'slower', 'keep bumping into neighbours'], ['solid', 'almost nothing', 'are held in place']] },
      ],
      lines: [
        { say: 'Open a bottle of perfume at the front of a room, and soon it can be smelled at the back. Nobody stirs the air: the particles spread out by themselves. This is diffusion.', show: 'dif' },
        { say: 'Diffusion is fastest in gases, where the particles move quickly and have lots of space.', show: ['speed', 'speed.0'], focus: 'speed.0' },
        { say: 'It is slower in liquids, where the particles keep bumping into their neighbours, and almost nothing happens in solids, where the particles are held in place.', show: ['speed.1', 'speed.2'], focus: ['speed.1', 'speed.2'] },
        { say: 'Diffusion is also faster when it is warmer, because the particles move faster.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A tea bag is put into hot water and another into cold water. In which cup does the colour spread faster, and why?',
          choices: [
            'The cold water, because its particles are closer together.',
            'Both the same, because diffusion does not depend on temperature.',
            'The hot water, because its particles move faster.',
            'The hot water, because its particles are bigger.',
          ],
          answer: 2,
          working: 'The colour spreads by diffusion, which is faster when the particles move faster: in the hot water. Particles never get bigger.',
        },
      ],
      lines: [
        { say: 'Your turn. A tea bag goes into hot water, and another into cold water. In which cup does the colour spread faster, and why? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. In hot water the particles move faster, so diffusion is faster. The particles never get bigger, so D is wrong.', show: 'q.answer' },
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
            'Substances **expand** when heated and **contract** when cooled.',
            'The particles do not grow; the spaces between them do.',
            '**Diffusion**: particles spreading out by their own movement.',
            'Fastest in gases, slower in liquids, faster when warmer.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Most substances expand when heated and contract when cooled.', show: 'sum.0' },
        { say: 'The particles do not grow. Only the spaces between them change.', show: 'sum.1' },
        { say: 'Diffusion is particles spreading out by their own movement until they are evenly mixed.', show: 'sum.2' },
        { say: 'And it is fastest in gases, slower in liquids, and faster when it is warmer. Next, you will find out what chemists mean by pure.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
