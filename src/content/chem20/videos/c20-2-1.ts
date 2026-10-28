import type { Explainer } from '@/video/script.ts';
import { particles } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { gasBox, tag } from './lib/c20-2a-figures.ts';

// A liquid, close together at the bottom of an open container, beside a gas that fills a closed one.
const states = figure(
  'st',
  [
    particles({ name: 'liq', state: 'liquid', at: [0, 0], size: 5, seed: 4, open: true, kinds: [{ id: 'p', tone: 'adj', count: 16 }] }),
    tag('liq-l', [2.5, -0.3], '\\text{liquid}', { place: 'below', group: 'liq-p' }),
    gasBox({ name: 'gas', at: [7, 0], w: 5, h: 5, count: 9, r: 0.3, speed: 0, seed: 3 }),
    tag('gas-l', [9.5, -0.3], '\\text{gas}', { place: 'below', group: 'gas-p' }),
  ],
  360,
);

// Gas particles moving in straight lines, with marks where they hit the walls.
const moving = figure('m', [gasBox({ w: 6, h: 6, count: 9, speed: 1.1, seed: 12, hits: 4 })], 470);

const video: Explainer = {
  id: 'c20-2-1',
  lessonId: 'c20-2-1',
  title: 'Gases and the Kinetic Molecular Theory, Part 1: The Properties of Gases',
  thumbnailTitle: 'The Properties of Gases',
  thumbnail: 'm',
  summary:
    'Every gas fills its container, is easily compressed, has a low density, and mixes and diffuses. The kinetic molecular theory explains this with five ideas about tiny particles that move constantly and randomly.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 1', title: 'The Properties of Gases', subtitle: 'What every gas has in common' }],
      lines: [
        { say: 'Open a bottle of perfume in one corner of a room, and before long someone in the far corner can smell it. Pump air into a bicycle tyre, and the tyre grows firm.', show: 'title' },
        { say: 'In this lesson, you will meet the kinetic molecular theory, which pictures a gas as tiny particles in constant motion. This first part describes what every gas has in common, and states the theory.' },
        { say: 'Later parts look inside the theory, and use it to explain how gases behave.' },
      ],
    },
    {
      chapter: 'Four properties',
      layout: 'split',
      leftWidth: 620,
      left: [states],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**It fills its container.** No fixed shape or volume.',
            '**It is easily compressed.** Liquids and solids hardly compress.',
            '**It has a low density.** $1\\ \\text{L}$ of air: about $1.2\\ \\text{g}$. $1\\ \\text{L}$ of water: about $1000\\ \\text{g}$.',
            '**It mixes and diffuses.** No stirring needed.',
          ],
        },
      ],
      lines: [
        { say: 'A solid keeps its own shape, and a liquid keeps its own volume. A gas keeps neither. Whatever it is made of, every gas shares four properties.', show: ['st.liq-box', 'st.liq-p', 'st.liq-l', 'st.gas-box', 'st.gas-p', 'st.gas-l'] },
        { say: 'First, a gas fills its container. It has no fixed shape or volume: it spreads out to fill whatever space it is given.', show: 'b.0', focus: 'st.gas-p' },
        { say: 'Second, a gas is easily compressed. Block the tip of a syringe and push the plunger, and the air inside is squeezed into a much smaller space. Liquids and solids hardly compress at all.', show: 'b.1', focus: 'st' },
        { say: 'Third, a gas has a low density. A litre of air has a mass of only about one point two grams. A litre of liquid water has a mass of about a thousand grams.', show: 'b.2' },
        { say: 'Fourth, gases mix and diffuse. Two gases mix completely and evenly without being stirred. That is how the smell of cooking spreads from the kitchen through a whole house.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A picture of a gas',
      layout: 'center',
      main: [
        { kind: 'text', id: 'word', size: 'lg', align: 'center', md: '*Kinetic* comes from the Greek word for **motion**.' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Kinetic molecular theory', md: 'A model that explains the behaviour of gases by the **motion of their particles**. It describes an **ideal gas** with five ideas.' },
      ],
      lines: [
        { say: 'Tiny helium atoms and much larger carbon dioxide molecules share these properties alike. To see why, we need a picture of what the particles of a gas are doing.' },
        { say: 'The word kinetic comes from the Greek word for motion. The theory pictures a gas as a huge number of tiny particles, atoms or molecules, that never stop moving.', show: 'word' },
        { say: 'The kinetic molecular theory is a model that explains the behaviour of gases by the motion of their particles. It describes an ideal gas with five ideas.', show: 'def' },
      ],
    },
    {
      chapter: 'Five ideas',
      layout: 'split',
      leftWidth: 540,
      left: [moving],
      right: [
        {
          kind: 'bullets',
          id: 'k',
          items: [
            '**1.** Constant, random motion in **straight lines**.',
            '**2.** Particles are **tiny** compared with the gaps between them.',
            '**3.** Collisions lose **no kinetic energy** overall.',
            '**4.** Ideal gas particles **neither attract nor repel**.',
            '**5.** Average kinetic energy is proportional to the **Kelvin temperature**.',
          ],
        },
      ],
      lines: [
        { say: 'One. Gas particles move constantly and randomly, in straight lines between collisions. Each arrow shows the way a particle is moving.', show: ['m.box', 'm.p', 'm.v', 'k.0'], focus: 'm.v' },
        { say: 'Two. Gas particles are very small compared with the distances between them.', show: 'k.1', focus: 'm.p' },
        { say: 'Three. Collisions between gas particles, and with the walls, lose no kinetic energy overall.', show: ['k.2', 'm.hits'], focus: 'm.hits' },
        { say: 'Four. In an ideal gas, the particles do not attract or repel each other.', show: 'k.3', focus: 'm' },
        { say: 'Five. The average kinetic energy of the particles is proportional to the Kelvin temperature.', show: 'k.4' },
        { say: 'The Kelvin scale, which starts at the coldest temperature possible, is the subject of the next lesson. For now, a higher temperature means faster particles.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which property is shared by **every** gas?',
          choices: ['It keeps its own volume.', 'It is easily compressed.', 'It is denser than the same substance as a liquid.', 'It must be stirred to mix with another gas.'],
          answer: 1,
          working: 'A gas is mostly empty space, so pushing on it squeezes it into a much smaller space. A gas keeps neither its shape nor its volume, has a low density, and mixes with other gases on its own.',
        },
      ],
      lines: [
        { say: 'Your turn. Which property is shared by every gas? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: every gas is easily compressed, because it is mostly empty space. Choice A describes a liquid. A gas spreads out to fill whatever space it is given.', show: 'q.answer' },
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
            'A gas fills its container, is easily compressed, has a low density, and mixes and diffuses.',
            'The **kinetic molecular theory** pictures a gas as tiny particles in constant, random motion.',
            'Its five ideas describe an **ideal gas**: motion, tiny particles, no energy lost, no attractions, energy set by temperature.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Every gas fills its container, is easily compressed, has a low density, and mixes and diffuses.', show: 'sum.0' },
        { say: 'The kinetic molecular theory pictures a gas as a huge number of tiny particles in constant, random motion.', show: 'sum.1' },
        { say: 'Its five ideas describe an ideal gas. In part two, you will look more closely at kinetic energy, collisions, and the empty space in a gas. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
