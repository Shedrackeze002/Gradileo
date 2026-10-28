import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { diffusionTube, gasBox, tag } from './lib/c20-2a-figures.ts';

// Hydrogen and oxygen at the same temperature: light, fast molecules beside heavy, slow ones.
const pair = figure(
  'hm',
  [
    gasBox({ name: 'h', at: [0, 0], w: 5, h: 5, count: 7, r: 0.18, speed: 1.4, seed: 31 }),
    tag('h-l', [2.5, -0.3], '\\text{hydrogen, } \\ce{H2}', { place: 'below', tone: 'adj', group: 'h-p' }),
    gasBox({ name: 'o', at: [6.5, 0], w: 5, h: 5, count: 7, r: 0.36, speed: 0.35, seed: 32, tone: 'opp' }),
    tag('o-l', [9, -0.3], '\\text{oxygen, } \\ce{O2}', { place: 'below', tone: 'opp', group: 'o-p' }),
  ],
  360,
);

// Ammonia and hydrogen chloride diffusing towards each other along a tube.
const tube = figure('tb', [diffusionTube()], 330);

const video: Explainer = {
  id: 'c20-2-1-d',
  lessonId: 'c20-2-1',
  title: 'Gases and the Kinetic Molecular Theory, Part 4: Mass, Speed and Real Gases',
  thumbnailTitle: 'Mass, Speed and Real Gases',
  thumbnail: 'hm',
  summary:
    'At the same temperature, every gas has the same average kinetic energy, ½mv², so lighter particles move faster: hydrogen molecules move about 4 times as fast as oxygen molecules. Real gases take up some space and attract a little, so they behave most like an ideal gas at high temperature and low pressure.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 4', title: 'Mass, Speed and Real Gases', subtitle: 'Same energy, different speeds' }],
      lines: [
        { say: 'The air around you is a mixture of gases, all at the same temperature. Yet some of its molecules move much faster than others.', show: 'title' },
        { say: 'In this part, you will see why lighter particles move faster, and when a real gas behaves like the ideal gas of the theory.' },
      ],
    },
    {
      chapter: 'Average kinetic energy',
      layout: 'split',
      leftWidth: 640,
      left: [pair],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Average kinetic energy', md: 'It depends **only on the Kelvin temperature**: not on which gas it is, its pressure, or how much gas there is.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['E_\\text{k} = \\tfrac{1}{2}mv^2'] },
      ],
      lines: [
        { say: 'The particles in a gas do not all move at the same speed. Collisions keep speeding some up and slowing others down, so at any moment there is a spread of speeds.' },
        { say: 'That is why the theory speaks of the average kinetic energy, and that average depends only on the Kelvin temperature: not on which gas it is, its pressure, or how much gas there is.', show: 'key' },
        { say: 'So at the same temperature, hydrogen molecules and oxygen molecules have the same average kinetic energy.', show: ['hm.h-box', 'hm.h-p', 'hm.h-l', 'hm.o-box', 'hm.o-p', 'hm.o-l'] },
        { say: 'Kinetic energy is one half m v squared. So the lighter molecules must move faster to carry the same energy: a smaller m needs a larger v.', caption: 'Kinetic energy is ½mv². So the lighter molecules must move faster to carry the same energy: a smaller m needs a larger v.', show: ['m', 'hm.h-v', 'hm.o-v'], focus: ['m', 'hm.h-v'] },
      ],
    },
    {
      chapter: 'How much faster?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Hydrogen, $\\ce{H2}$, and oxygen, $\\ce{O2}$, are at the same temperature. Atomic masses: $\\ce{H}$ about $1$, $\\ce{O}$ about $16$. Which molecules move faster on average?' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\text{Same average } \\tfrac{1}{2}mv^2',
            '\\ce{O2}\\text{: about } 32 \\qquad \\ce{H2}\\text{: about } 2 \\qquad \\dfrac{32}{2} = 16',
            'm \\text{ is } 16 \\text{ times smaller, so } v^2 \\text{ is } 16 \\text{ times larger}',
            'v \\text{ is about } \\sqrt{16} = 4 \\text{ times larger}',
          ],
        },
      ],
      lines: [
        { say: 'Hydrogen and oxygen are at the same temperature. Which molecules move faster, and by how much?', show: 'q' },
        { say: 'Both have the same average kinetic energy, one half m v squared.', caption: 'Both have the same average kinetic energy, ½mv².', show: 'm.0', focus: 'm.0' },
        { say: 'With atomic masses of about one and sixteen, an oxygen molecule, about thirty-two, has about sixteen times the mass of a hydrogen molecule, about two.', show: 'm.1', focus: 'm.1' },
        { say: 'For the same one half m v squared, a mass sixteen times smaller needs a v squared sixteen times larger.', caption: 'For the same ½mv², a mass sixteen times smaller needs a v² sixteen times larger.', show: 'm.2', focus: 'm.2' },
        { say: 'So the speed is about the square root of sixteen: four times larger. Hydrogen molecules move about four times as fast as oxygen molecules.', show: 'm.3', focus: 'm.3' },
        { say: 'So heavier gas particles do not have a greater average kinetic energy. They simply move more slowly.' },
      ],
    },
    {
      chapter: 'A ring in a tube',
      layout: 'center',
      main: [tube, { kind: 'math', id: 'eq', size: 'lg', lines: ['\\ce{NH3 + HCl -> NH4Cl}'] }],
      lines: [
        { say: 'A classic demonstration shows the difference. Cotton wool soaked in ammonia solution goes in one end of a long glass tube, and cotton wool soaked in hydrochloric acid in the other.', show: ['tb.tube', 'tb.nh3', 'tb.hcl'] },
        { say: 'Ammonia gas and hydrogen chloride gas diffuse towards each other. Where they meet, they react to form a white ring of solid ammonium chloride.', show: ['tb.paths', 'tb.ring', 'eq'] },
        { say: 'The ring forms nearer the hydrochloric acid end. The lighter ammonia molecules, about seventeen, travel farther in the same time than the heavier hydrogen chloride molecules, about thirty-six point five.', focus: 'tb.paths' },
      ],
    },
    {
      chapter: 'Real gases',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Real gas particles **take up some space** and **attract each other a little**.',
            '**High pressure:** particles are closer, so their own volume matters, and they attract.',
            '**Low temperature:** slow particles linger together, and can condense to a liquid.',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'When is a real gas most ideal?', md: 'At **high temperature** and **low pressure**.' },
      ],
      lines: [
        { say: 'No real gas is perfectly ideal. Its particles do take up some space, and they attract each other a little. Under everyday conditions, these effects are small.', show: 'b.0' },
        { say: 'High pressure makes them matter more. Squeezed together, the particles take up a noticeable part of the space, and they are near enough to attract each other.', show: 'b.1' },
        { say: 'So does low temperature. Slow particles linger near one another, so their attractions can pull them together. Cool a gas enough, and it condenses to a liquid.', show: 'b.2' },
        { say: 'So a real gas behaves most like an ideal gas at high temperature and low pressure, where its particles are far apart and moving fast.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Real gases behave most like an ideal gas under which conditions?',
          choices: ['Low temperature and high pressure', 'Low temperature and low pressure', 'High temperature and low pressure', 'High temperature and high pressure'],
          answer: 2,
          working: 'At low pressure the particles are far apart, so their own volume hardly matters. At high temperature they move fast, so their attractions hardly matter.',
        },
      ],
      lines: [
        { say: 'Your turn. Real gases behave most like an ideal gas under which conditions? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, high temperature and low pressure. Choice A is the opposite: there, the particles are close together and slow, so their attractions matter most.', show: 'q.answer' },
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
            'At the same temperature, every gas has the same **average kinetic energy**, $\\tfrac{1}{2}mv^2$.',
            '**Lighter particles move faster**: $\\ce{H2}$ about $4$ times as fast as $\\ce{O2}$.',
            'Real gases are most like an ideal gas at **high temperature** and **low pressure**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. At the same temperature, every gas has the same average kinetic energy.', show: 'sum.0' },
        { say: 'So lighter particles move faster. Hydrogen molecules move about four times as fast as oxygen molecules.', show: 'sum.1' },
        { say: 'And real gases are most like an ideal gas at high temperature and low pressure. That completes this lesson. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
