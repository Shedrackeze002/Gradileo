import type { Explainer, NucleusEl } from '@/video/script.ts';

// Lesson 4.4, second part: what holds a nucleus together. src/video/nucleus.ts works out the
// electric repulsion of two protons from Coulomb's law (57.5 N at 2.0 fm) and draws the strong
// attraction as a force that is gone by 3 fm; a proton in a nucleus is tied to its neighbours
// alone while every other proton repels it; and nuclei are drawn to scale with r = 1.2 fm × ∛A.

const nucleus = (id: string, height: number, clips: NucleusEl['clips'], more: Partial<NucleusEl> = {}): NucleusEl => ({ kind: 'nucleus', id, height, clips, ...more });

/** Two protons pushed from 4 fm to 2 fm apart. */
const repel = nucleus('rp', 300, { a: { phases: [{ dur: 12.4 }] }, b: { phases: [{ dur: 1.5 }, { dur: 5, apart: 2 }, { dur: 3.4 }] }, c: { phases: [{ dur: 14 }] } }, { picture: 'pair', apart: 4, scale: 100 });

/** The strong force: two protons almost touching, pulled apart, and then other pairs of nucleons. */
const strong = nucleus(
  'sf',
  400,
  {
    a: { phases: [{ dur: 6 }, { dur: 4, apart: 1 }, { dur: 6.3 }] },
    b: { phases: [{ dur: 3.5 }, { dur: 7, apart: 4 }, { dur: 2.9 }] },
    c: { phases: [{ dur: 10.8 }] },
    d: { phases: [{ dur: 2.5, apart: 1 }, { dur: 3.5 }, { dur: 2.5, kinds: 'pn' }, { dur: 2.4, kinds: 'nn' }] },
  },
  { picture: 'pair', apart: 2, scale: 100, poster: 'a', posterAt: 1, thumb: ['names', 'electric', 'strong'] },
);

/** One proton in a nucleus: tied to its neighbours, repelled by every proton. Calcium-40, lead-208, uranium-238. */
const glue = nucleus(
  'gl',
  440,
  {
    a: { phases: [{ dur: 11.9 }] },
    b: { phases: [{ dur: 10.2 }] },
    c: { phases: [{ dur: 11.7 }] },
    d: { phases: [{ dur: 4.5 }, { dur: 3, z: 82, n: 126, symbol: 'Pb', name: 'Lead' }, { dur: 4.7 }] },
    e: { phases: [{ dur: 9.5 }, { dur: 3, z: 92, n: 146, symbol: 'U', name: 'Uranium', shaky: true }, { dur: 3.2 }] },
  },
  { z: 20, n: 20, symbol: 'Ca', name: 'Calcium', scale: 27 },
);

/** Nuclei to scale: helium-4, gold-197 and uranium-238. */
const size = nucleus(
  'sz',
  420,
  {
    a: { phases: [{ dur: 14.1 }] },
    b: { phases: [{ dur: 14.1 }] },
    c: { phases: [{ dur: 3, z: 79, n: 118, symbol: 'Au', name: 'Gold' }, { dur: 9.2 }] },
    d: { phases: [{ dur: 2.5, z: 2, n: 2, symbol: 'He', name: 'Helium' }, { dur: 1.5 }, { dur: 3, z: 92, n: 146, symbol: 'U', name: 'Uranium' }, { dur: 7.1 }] },
    e: { phases: [{ dur: 13.9 }] },
  },
  { z: 2, n: 2, symbol: 'He', name: 'Helium', scale: 19 },
);

const video: Explainer = {
  id: 'p30-4-4-b',
  lessonId: 'p30-4-4',
  title: 'The Strong Nuclear Force',
  thumbnailTitle: 'The Strong Force',
  thumbnail: 'sf',
  summary:
    'The protons in a nucleus repel one another with great force. See the electric repulsion of two protons worked out from Coulomb\'s law, the strong nuclear force that overcomes it but fades within a few femtometres, why heavy nuclei need more neutrons than protons, and how the radius of a nucleus depends on its mass number.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'The Strong Nuclear Force', subtitle: 'What holds a nucleus together' }],
      lines: [
        { say: 'A nucleus is full of protons. They all repel one another, and they are packed extremely close together.', show: 'title' },
        { say: 'So what stops a nucleus from flying apart?' },
      ],
    },
    {
      chapter: 'The repulsion',
      layout: 'center',
      main: [repel, { kind: 'math', id: 'f', size: 'md', lines: ['F = \\dfrac{kq_1q_2}{r^2} = \\dfrac{8.99 \\times 10^{9} \\times (1.60 \\times 10^{-19})^2}{(2.0 \\times 10^{-15})^2} = \\opp{57.5\\ \\text{N}}'] }],
      lines: [
        { say: 'Here are two protons, 4 femtometres apart. A femtometre is ten to the negative 15 metres. Each one pushes the other away with an electric force.', caption: 'Here are two protons, 4 femtometres apart. A femtometre is 10⁻¹⁵ m. Each one pushes the other away with an electric force.', show: ['rp', 'rp.names', 'rp.distance', 'rp.electric'], play: 'rp.a' },
        { say: "Now push them closer, to 2 femtometres. Coulomb's law says that half the distance gives four times the force. Watch it grow.", play: 'rp.b' },
        { say: 'At 2.0 femtometres, k q 1 q 2 over r squared comes to 57.5 newtons. That is about the weight of a 6 kilogram mass, acting on a single proton.', caption: 'At 2.0 fm, kq₁q₂ ÷ r² comes to 57.5 N. That is about the weight of a 6 kg mass, acting on a single proton.', show: 'f', play: 'rp.c' },
        { say: 'Gravity between the two protons is far too weak to hold them. Something much stronger must pull them together.' },
      ],
    },
    {
      chapter: 'The strong nuclear force',
      layout: 'center',
      main: [strong],
      lines: [
        { say: 'That something is the strong nuclear force. It is an attraction between nucleons. Bring the two protons to 1 femtometre, where they almost touch, and the strong attraction is far larger than the electric repulsion.', show: ['sf', 'sf.names', 'sf.distance', 'sf.electric', 'sf.strong'], play: 'sf.a' },
        { say: 'But the strong force has a very short range. Pull the protons apart, and it fades away quickly. By 3 femtometres it is gone, and only the repulsion is left.', play: 'sf.b' },
        { say: 'This is why we never notice the strong force outside the nucleus. Across the width of an atom, it has no effect at all.', play: 'sf.c' },
        { say: 'The strong force does not depend on charge. It acts between any two nucleons: two protons, a proton and a neutron, or two neutrons.', play: 'sf.d' },
      ],
    },
    {
      chapter: 'Why neutrons are needed',
      layout: 'center',
      main: [glue],
      lines: [
        { say: 'Look at one proton in this nucleus of calcium-40. The strong force ties it to its nearest neighbours only, because its range is so short.', show: ['gl', 'gl.symbol', 'gl.counts', 'gl.glue'], play: 'gl.a' },
        { say: 'But the electric repulsion acts across the whole nucleus. Every other proton pushes on this one, however far away it is.', show: 'gl.repel', play: 'gl.b' },
        { say: 'A neutron feels the strong force, and it has no charge. So each neutron adds attraction without adding repulsion. Neutrons act as a kind of glue.', play: 'gl.c' },
        { say: 'A light nucleus holds together with equal numbers of protons and neutrons. A heavy one needs more neutrons than protons. Lead-208 has 82 protons, and 126 neutrons.', play: 'gl.d' },
        { say: 'And there is a limit. As a nucleus grows, the repulsion grows faster than the attraction. At last, no number of neutrons can hold it together. So all very large nuclei, like uranium-238, are unstable.', play: 'gl.e' },
      ],
    },
    {
      chapter: 'The size of a nucleus',
      layout: 'center',
      main: [size, { kind: 'math', id: 'r', size: 'md', lines: ['r = 1.2 \\times 10^{-15} \\times \\sqrt[3]{A}\\ \\text{m}', '\\sqrt[3]{238 \\div 4} = \\sqrt[3]{59.5} = \\thc{3.90}'] }],
      lines: [
        { say: 'Scattering experiments show that nucleons are packed equally closely in every nucleus, like marbles in a bag. So the volume of a nucleus is proportional to its number of nucleons.', show: ['sz', 'sz.names', 'sz.symbol', 'sz.counts'], play: 'sz.a' },
        { say: 'That makes the radius proportional to the cube root of the mass number. The radius is 1.2 times ten to the negative 15 metres, times the cube root of "A".', caption: 'That makes the radius proportional to the cube root of the mass number. The radius is 1.2 × 10⁻¹⁵ m × ∛A.', show: ['r.0', 'sz.radius'], play: 'sz.b' },
        { say: 'Take gold-197. The cube root of 197 is 5.819, so the radius is 6.98 femtometres. The alpha particles of the gold foil experiment never came this close.', caption: 'Take gold-197. ∛197 = 5.819, so the radius is 6.98 fm. The alpha particles of the gold foil experiment never came this close.', play: 'sz.c' },
        { say: 'Now compare helium-4 with uranium-238. Uranium has almost 60 times as many nucleons. But its radius is only the cube root of 59.5 times as large. That is 3.90 times.', caption: 'Now compare helium-4 with uranium-238. Uranium has almost 60 times as many nucleons. But its radius is only ∛59.5 times as large. That is 3.90 times.', show: 'r.1', play: 'sz.d' },
        { say: 'Since the packing is the same, every nucleus has about the same density. And it is enormous. A teaspoon of nuclear matter would have a mass of about a billion tonnes.', play: 'sz.e' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which particles does the strong nuclear force act between?',
          choices: ['Any two nucleons that are almost touching', 'Two protons only', 'A proton and a neutron only', 'Any two charged particles, at any distance'],
          answer: 0,
          working: 'The strong force attracts any two nucleons, with or without charge: two protons, two neutrons, or a proton and a neutron. Its range is only about $10^{-15}$ m. It is the electric force that acts only between the protons.',
        },
      ],
      lines: [
        { say: 'Your turn. Which particles does the strong nuclear force act between? Pause the video and decide.', show: 'q', wait: 6 },
        { say: 'The strong force attracts any two nucleons, with or without charge, as long as they are almost touching. It is the electric force that acts only between the protons. That is choice "A".', caption: 'The strong force attracts any two nucleons, with or without charge, as long as they are almost touching. It is the electric force that acts only between the protons. That is choice A.', show: 'q.answer' },
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
            'The protons in a nucleus **repel** one another: 57.5 N for two that are 2.0 fm apart',
            'The **strong nuclear force** attracts any two nucleons, with or without charge',
            'It has a very **short range**, about $10^{-15}$ m',
            'Heavy nuclei need **more neutrons** than protons, and very large nuclei are unstable',
            'The radius of a nucleus is $r = 1.2 \\times 10^{-15} \\times \\sqrt[3]{A}$ m',
            'Every nucleus has about the same **density**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The protons in a nucleus repel one another, with 57.5 newtons for two that are 2.0 femtometres apart.', caption: 'Here is what to remember. The protons in a nucleus repel one another, with 57.5 N for two that are 2.0 fm apart.', show: 'sum.0' },
        { say: 'The strong nuclear force attracts any two nucleons, with or without charge.', show: 'sum.1' },
        { say: 'It has a very short range, about ten to the negative 15 metres.', caption: 'It has a very short range, about 10⁻¹⁵ m.', show: 'sum.2' },
        { say: 'Heavy nuclei need more neutrons than protons, and very large nuclei are unstable.', show: 'sum.3' },
        { say: 'The radius of a nucleus is 1.2 times ten to the negative 15 metres, times the cube root of its mass number.', caption: 'The radius of a nucleus is 1.2 × 10⁻¹⁵ m × ∛A.', show: 'sum.4' },
        { say: 'And every nucleus has about the same density.', show: 'sum.5' },
      ],
    },
  ],
};

export default video;
