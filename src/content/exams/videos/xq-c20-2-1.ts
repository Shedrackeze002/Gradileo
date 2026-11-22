import type { Explainer, ParticlesEl } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import theory from '@/content/chem20/videos/c20-2-1.ts';

// Exam question for Chemistry 20 lesson 2.1 (gases and the kinetic molecular theory): use the
// theory to explain why a gas fills a container of any shape evenly. The question is OpenStax
// Chemistry 2e's own, word for word (end-of-chapter exercise 90, section 9.5, CC BY-NC-SA 4.0).
// The answer: gas particles move constantly, randomly and in straight lines, they are tiny with
// mostly empty space between them, they do not attract one another, and their collisions lose no
// energy, so they keep spreading until they are spread evenly through whatever space they have.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's gas with one
// particle followed in yellow, then gas in a tall narrow box and a wide flat box, squeezed into a
// corner by a piston and let go, spreading out to fill each box evenly.

/** Gas particles that barely attract one another, with no weight to speak of. */
const GAS = { bond: 0.15, heavy: 0 } as const;

/** Two containers of different shapes: the gas is squeezed into a small space, then let go. */
const fill: ParticlesEl = {
  kind: 'particles',
  id: 'fl',
  boxes: [
    { id: 't', state: 'gas', width: 5, height: 10, temp: 1.6, piston: true, kinds: [{ n: 10, ...GAS }], label: 'tall and narrow' },
    { id: 'w', state: 'gas', width: 12, height: 5, temp: 1.6, piston: true, kinds: [{ n: 12, ...GAS }], label: 'wide and flat' },
  ],
  clips: {
    in: { phases: [{ dur: 2.5, lid: { t: 0.3, w: 0.4 } }] },
    out: { phases: [{ dur: 2.5, lid: { t: 1, w: 1 } }, { dur: 3 }] },
  },
  height: 420,
};

const video: Explainer = {
  id: 'xq-c20-2-1',
  lessonId: '',
  exam: {
    lesson: 'c20-2-1',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 90, section 9.5, The Kinetic-Molecular Theory',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/9-exercises',
    question: 'Using the postulates of the kinetic molecular theory, explain why a gas uniformly fills a container of any shape.',
  },
  title: 'Exam Question: Why a Gas Fills Its Container. Gases and the Kinetic Molecular Theory',
  thumbnailTitle: 'Why Does a Gas Fill Its Container?',
  thumbnail: 'fl',
  summary:
    'A real test question, solved one small step at a time: why does a gas fill a container of any shape evenly? We go through the ideas of the kinetic molecular theory one by one, and watch simulated gas particles squeezed into a corner spread out again until they fill a tall box and a flat box evenly.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Why Does a Gas Fill Its Container?', subtitle: 'The kinetic molecular theory, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that asks us to explain why a gas fills its container. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Using the postulates of the kinetic molecular theory, explain why a gas uniformly fills a container of any shape.', answer: 'Particles move constantly and randomly, with nothing holding them together' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Using the postulates of the kinetic molecular theory, explain why a gas uniformly fills a container of any shape.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Use the theory\'s **ideas** to explain why a gas spreads **evenly** into **any shape**' }],
      lines: [
        { say: 'A postulate is one of the basic ideas a theory starts from.', show: 'plain' },
        { say: 'So we must use the ideas of the kinetic molecular theory to explain two things: why a gas spreads into every part of its container, whatever its shape, and why it ends up spread evenly.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 620,
      left: [pick(theory, 'm')],
      right: [
        {
          kind: 'bullets',
          id: 'k',
          items: ['Particles move **constantly** and **randomly**', 'Particles are **tiny**, with empty space between', 'Collisions **lose no** kinetic energy', 'Particles do **not attract** each other'],
        },
      ],
      lines: [
        { say: 'Here is what we need: four ideas of the theory. First, gas particles move constantly and randomly, in straight lines between collisions. Follow the yellow particle.', show: ['m', 'm.trail', 'k.0'], focus: 'm.trail' },
        { say: 'Second, the particles are tiny compared with the distances between them, so a gas is mostly empty space.', show: 'k.1' },
        { say: 'Third, their collisions with each other and with the walls lose no kinetic energy overall, so they never slow down and settle. Each flash is a particle bouncing off a wall.', show: ['k.2', 'm.hits'] },
        { say: 'Fourth, the particles do not attract each other, so nothing holds them together in a clump.', show: 'k.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Why the gas spreads **everywhere**', 'Why it ends up **evenly** spread', 'Why the **shape** does not matter'] }],
      lines: [
        { say: 'Here is the plan. First, we explain why the gas reaches every part of the container.', show: 'plan.0' },
        { say: 'Second, why it ends up spread evenly, with no crowded or empty corners.', show: 'plan.1' },
        { say: 'Third, why the shape of the container makes no difference.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The gas spreads everywhere',
      layout: 'center',
      main: [fill],
      lines: [
        { say: 'Step one. Here is a gas in two containers of different shapes. First we push the particles into a small space.', show: ['fl', 'fl.labels'], play: 'fl.in' },
        { say: 'Now let the piston go. The particles move constantly, in straight lines, and nothing pulls them back together, so they race into the space they have been given.', play: 'fl.out' },
        { say: 'Their collisions lose no energy, so they keep moving and bouncing off the walls, until they have reached every part of each box.' },
      ],
    },
    {
      chapter: 'Step 2: Evenly spread',
      layout: 'center',
      main: [{ kind: 'math', id: 'e', size: 'lg', lines: ['\\text{random motion} \\to \\text{no preferred direction}', '\\text{no attraction} \\to \\text{no clumping}', '\\Rightarrow \\good{\\text{the same crowding everywhere}}'] }],
      lines: [
        { say: 'Step two. The motion is random, so the particles have no preferred direction. Over time, as many move into any region as move out of it.', show: 'e.0' },
        { say: 'And they do not attract each other, so they never gather into clumps.', show: 'e.1' },
        { say: 'So the particles end up equally crowded in every part of the container: the gas is spread evenly.', show: 'e.2', focus: 'e.2' },
      ],
    },
    {
      chapter: 'Step 3: Any shape',
      layout: 'center',
      main: [{ kind: 'text', id: 's', size: 'lg', md: 'The particles are **tiny** and fly in **straight lines** until they hit something, so they reach every corner of **any** container' }],
      lines: [
        { say: 'Step three. The particles are tiny, with mostly empty space between them, and each one flies in a straight line until it hits a wall or another particle.', show: 's' },
        { say: 'Whatever the shape, every corner can be reached, so a gas takes the shape of its container, as you saw in both boxes.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'ans',
          tone: 'key',
          title: 'The answer',
          md: 'Gas particles are tiny, with mostly empty space between them, and they move **constantly** and **randomly** in straight lines. Their collisions lose no kinetic energy, so they never settle, and they do **not attract** one another, so nothing holds them together. They keep spreading in every direction until they are spread **evenly** through all the space they have, whatever its shape.',
        },
      ],
      lines: [
        { say: 'Here is the whole answer. Gas particles are tiny, with mostly empty space between them, and they move constantly and randomly, in straight lines.', show: 'ans' },
        { say: 'Their collisions lose no energy, so they never settle, and they do not attract one another, so nothing holds them together. They keep spreading in every direction until they are spread evenly through all the space they have, whatever its shape.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['"The particles grow to fill the space"', 'Particles stay the **same size**; the **spaces** grow'],
            ['"The air pushes the gas around"', 'The particles\' own **random motion** spreads them'],
            ['"The particles attract and pull outwards"', 'In an ideal gas they do **not attract** at all'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Saying the particles grow to fill the space. They stay the same size. What grows is the empty space between them.', focus: 'traps.0' },
        { say: 'Saying something outside pushes the gas around, like air currents. The particles spread by their own random motion, even in a sealed box.', focus: 'traps.1' },
        { say: 'And saying the particles attract each other and pull outwards. The theory says they do not attract at all, which is exactly why they can spread apart freely.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Use the kinetic molecular theory. Why does a gas have a much **lower density** than a liquid?',
          choices: [
            'Its particles are far apart, with mostly empty space between them.',
            'Its particles are smaller than the particles of a liquid.',
            'Each of its particles has less mass.',
            'Its particles have stopped moving.',
          ],
          answer: 0,
          working: 'The same particles take up far more room in a gas, so a litre of gas holds much less mass.',
        },
      ],
      lines: [
        { say: 'Your turn. Use the kinetic molecular theory. Why does a gas have a much lower density than a liquid? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Its particles are far apart, with mostly empty space between them, so a litre of gas holds far fewer particles than a litre of liquid: choice A.', show: 'q2.answer' },
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
          items: ['Gas particles move **constantly** and **randomly**', 'They are **tiny** and do **not attract**, so nothing holds them together', 'So a gas spreads **evenly** through any container'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Gas particles move constantly and randomly, and their collisions lose no energy.', show: 'sum.0' },
        { say: 'They are tiny, with empty space between them, and they do not attract each other.', show: 'sum.1' },
        { say: 'So a gas spreads evenly through any container, whatever its shape. For more on the kinetic molecular theory, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
