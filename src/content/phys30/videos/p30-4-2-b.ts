import type { AlphasEl, Explainer } from '@/video/script.ts';

// Lesson 4.2, second part: the distance of closest approach. One alpha particle heads straight
// for a nucleus, and its path is worked out from the force k(2e)(Ze) ÷ r² (src/video/alphas.ts):
// it stops where its kinetic energy has all become electric potential energy, at
// r = k(2e)(Ze) ÷ Ek, and is pushed back. The energies, the distance and the force that the
// pictures show are the lesson's numbers.

const head = (id: string, height: number, clips: AlphasEl['clips'], more: Partial<AlphasEl> = {}): AlphasEl => ({ kind: 'alphas', id, picture: 'head', height, scale: 3, clips, ...more });

/** One slow approach to a gold nucleus: the force grows, the energy changes, the particle stops and is pushed back. */
const approach = head('hd', 440, { a: { phases: [{ dur: 2, fire: [0] }, { dur: 10.3 }] }, b: { phases: [{ dur: 6.7 }] }, c: { phases: [{ dur: 11.7 }] }, d: { phases: [{ dur: 15.8 }] } }, { pace: 15.5 });

/** The same approach again, with the energies, beside the equation. */
const equal = head('eq', 380, { a: { phases: [{ dur: 1, fire: [0] }, { dur: 12.2 }] }, b: { phases: [{ dur: 10 }, { dur: 1, fire: [0] }, { dur: 12.7 }] }, c: { phases: [{ dur: 1, fire: [0] }, { dur: 6.4 }] } }, { pace: 53 });

/** 5.0 MeV at gold: closest approach 4.55 × 10⁻¹⁴ m. */
const gold = head('gd', 256, { a: { phases: [{ dur: 1, fire: [0] }, { dur: 9.2 }] }, b: { phases: [{ dur: 8 }, { dur: 1, fire: [0] }, { dur: 12 }] }, c: { phases: [{ dur: 5 }, { dur: 1, fire: [0] }, { dur: 8.5 }] }, d: { phases: [{ dur: 1, fire: [0] }, { dur: 7 }] }, e: { phases: [{ dur: 5 }, { dur: 1, fire: [0] }, { dur: 5.7 }] } }, { pace: 60 });

/** Twice the energy, half the distance; and an energy found from a speed. */
const faster = head(
  'fa',
  360,
  { a: { phases: [{ dur: 1, fire: [0] }, { dur: 7.4 }] }, b: { phases: [{ dur: 2.5, mev: 10 }, { dur: 1, fire: [0] }, { dur: 9.6 }] }, c: { phases: [{ dur: 2, mev: 5.3125 }, { dur: 9 }, { dur: 1, fire: [0] }, { dur: 11.2 }] }, d: { phases: [{ dur: 1, fire: [0] }, { dur: 8.1 }] } },
  { pace: 75, poster: 'b', posterAt: 0.5, thumb: ['names', 'distance', 'energy'] },
);

/** 4.5 MeV at silver (47 protons): closest approach 3.0 × 10⁻¹⁴ m. */
const silver = head('ag', 300, { a: { phases: [{ dur: 6 }, { dur: 1, fire: [0] }, { dur: 9.7 }] }, b: { phases: [{ dur: 8 }, { dur: 1, fire: [0] }, { dur: 10.3 }] }, c: { phases: [{ dur: 1, fire: [0] }, { dur: 10.4 }] } }, { z: 47, name: 'Silver', mev: 4.507, pace: 60 });

/** An alpha particle that stops 5.0 × 10⁻¹⁴ m from a gold nucleus, where the force on it is 14.5 N. */
const force = head('fo', 300, { a: { phases: [{ dur: 1, fire: [0] }, { dur: 11.8 }] }, b: { phases: [{ dur: 2 }, { dur: 1, fire: [0] }, { dur: 8.9 }] }, c: { phases: [{ dur: 6 }, { dur: 1, fire: [0] }, { dur: 10.4 }] } }, { mev: 4.5454, pace: 60 });

const video: Explainer = {
  id: 'p30-4-2-b',
  lessonId: 'p30-4-2',
  title: 'The Closest Approach',
  thumbnail: 'fa',
  summary:
    'How small is a nucleus? Follow an alpha particle that heads straight for one: it slows, stops where its kinetic energy has all become electric potential energy, and is pushed back. Use r = k(2e)(Ze) ÷ Ek for gold and silver, and find the force that throws the particle back.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'The Closest Approach', subtitle: 'How small is a nucleus?' }],
      lines: [
        { say: 'A few alpha particles came almost straight back from the gold foil. Those few tell us how small a nucleus must be.', show: 'title' },
        { say: 'All it takes is the conservation of energy.' },
      ],
    },
    {
      chapter: 'Head-on',
      layout: 'center',
      main: [approach],
      lines: [
        { say: 'Picture an alpha particle that heads straight for a gold nucleus. Both are positive, so the nucleus repels it, harder and harder as it gets closer.', show: ['hd', 'hd.names', 'hd.force'], play: 'hd.a' },
        { say: 'The repulsion slows it down. Its kinetic energy changes into electric potential energy.', show: 'hd.energy', play: 'hd.b' },
        { say: 'At one point it stops for an instant. All of its kinetic energy is now potential energy. Then it is pushed back the way it came.', play: 'hd.c' },
        { say: 'The distance from the centre of the nucleus at that point is the distance of closest approach. The nucleus must be smaller than this, so the experiment puts an upper limit on its size.', show: 'hd.distance', play: 'hd.d' },
      ],
    },
    {
      chapter: 'Energy is conserved',
      layout: 'center',
      main: [equal, { kind: 'math', id: 'm1', size: 'md', lines: ['\\good{E_k} = \\opp{\\dfrac{k\\,(2e)(Ze)}{r}} \\qquad \\text{so} \\qquad \\thc{r = \\dfrac{k\\,(2e)(Ze)}{E_k}}'] }],
      lines: [
        { say: 'Far from the nucleus, the alpha particle has only kinetic energy. At the closest point, it has only potential energy. Energy is conserved, so the two are equal.', show: ['eq', 'eq.names', 'eq.energy', 'eq.distance'], play: 'eq.a' },
        { say: 'The potential energy of two charges is k q one q two over r. Here the charges are two e for the alpha particle, and Z e for a nucleus with Z protons. So the distance of closest approach is k times two e times Z e, divided by the kinetic energy.', caption: 'The potential energy of two charges is kq₁q₂ ÷ r. Here the charges are 2e for the alpha particle, and Ze for a nucleus with Z protons. So the distance of closest approach is k(2e)(Ze) ÷ Ek.', show: 'm1', play: 'eq.b' },
        { say: 'The energy must be in joules, and r is measured from the centre of the nucleus.', play: 'eq.c' },
      ],
    },
    {
      chapter: 'A gold nucleus',
      layout: 'center',
      main: [
        gold,
        { kind: 'math', id: 'c1', size: 'md', lines: ['2e = 3.20 \\times 10^{-19}\\ \\text{C} \\qquad Ze = 79 \\times 1.60 \\times 10^{-19} = 1.26 \\times 10^{-17}\\ \\text{C}'] },
        { kind: 'math', id: 'c2', size: 'md', lines: ['E_k = 5.0 \\times 1.60 \\times 10^{-13} = 8.0 \\times 10^{-13}\\ \\text{J}'] },
        { kind: 'math', id: 'c3', size: 'md', lines: ['r = \\dfrac{8.99 \\times 10^{9} \\times 3.20 \\times 10^{-19} \\times 1.264 \\times 10^{-17}}{8.0 \\times 10^{-13}} = \\thc{4.55 \\times 10^{-14}\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'Take an alpha particle with 5.0 mega electron volts of kinetic energy, heading for a gold nucleus, which has 79 protons.', caption: 'Take an alpha particle with 5.0 MeV of kinetic energy, heading for a gold nucleus, which has 79 protons.', show: ['gd', 'gd.names', 'gd.values', 'gd.distance'], play: 'gd.a' },
        { say: 'First, the charges. Two e is 3.20 times ten to the negative 19 coulombs. And the nucleus carries the charge of all 79 of its protons, 1.26 times ten to the negative 17 coulombs. A common mistake is to use the charge of just one proton.', caption: 'First, the charges. 2e is 3.20 × 10⁻¹⁹ C. And the nucleus carries the charge of all 79 of its protons, 1.26 × 10⁻¹⁷ C. A common mistake is to use the charge of just one proton.', show: 'c1', play: 'gd.b' },
        { say: 'Next, the energy in joules. One mega electron volt is 1.60 times ten to the negative 13 joules, so 5.0 of them is 8.0 times ten to the negative 13 joules.', caption: 'Next, the energy in joules. 1 MeV is 1.60 × 10⁻¹³ J, so 5.0 MeV is 8.0 × 10⁻¹³ J.', show: 'c2', play: 'gd.c' },
        { say: 'Now divide. The distance of closest approach is 4.55 times ten to the negative 14 metres.', caption: 'Now divide. The distance of closest approach is 4.55 × 10⁻¹⁴ m.', show: 'c3', play: 'gd.d' },
        { say: 'An atom of gold is about three times ten to the negative ten metres across. So the nucleus is thousands of times smaller than its atom.', caption: 'An atom of gold is about 3 × 10⁻¹⁰ m across. So the nucleus is thousands of times smaller than its atom.', play: 'gd.e' },
      ],
    },
    {
      chapter: 'More energy, closer',
      layout: 'center',
      main: [
        faster,
        { kind: 'math', id: 's1', size: 'md', lines: ['E_k = \\tfrac{1}{2}mv^2 = \\tfrac{1}{2}\\,(6.64 \\times 10^{-27})(1.60 \\times 10^{7})^2 = \\thc{8.50 \\times 10^{-13}\\ \\text{J}}'] },
      ],
      lines: [
        { say: 'A faster alpha particle has more kinetic energy to change into potential energy, so it gets closer.', show: ['fa', 'fa.names', 'fa.values', 'fa.energy', 'fa.distance'], play: 'fa.a' },
        { say: 'Twice the kinetic energy gives half the distance. With 10 mega electron volts, the alpha particle stops about 2.3 times ten to the negative 14 metres from the centre.', caption: 'Twice the kinetic energy gives half the distance. With 10 MeV, the alpha particle stops about 2.3 × 10⁻¹⁴ m from the centre.', play: 'fa.b' },
        { say: 'If you are given the speed instead, find the kinetic energy first. An alpha particle has a mass of 6.64 times ten to the negative 27 kilograms. At 1.60 times ten to the seven metres per second, one half m v squared gives 8.50 times ten to the negative 13 joules.', caption: 'If you are given the speed instead, find the kinetic energy first. An alpha particle has a mass of 6.64 × 10⁻²⁷ kg. At 1.60 × 10⁷ m/s, ½mv² gives 8.50 × 10⁻¹³ J.', show: 's1', play: 'fa.c' },
        { say: 'That energy brings it to 4.28 times ten to the negative 14 metres from the centre of a gold nucleus.', caption: 'That energy brings it to 4.28 × 10⁻¹⁴ m from the centre of a gold nucleus.', play: 'fa.d' },
      ],
    },
    {
      chapter: 'How much energy?',
      layout: 'center',
      main: [
        silver,
        { kind: 'math', id: 'a1', size: 'md', lines: ['E_k = \\dfrac{8.99 \\times 10^{9} \\times 3.20 \\times 10^{-19} \\times 7.52 \\times 10^{-18}}{3.0 \\times 10^{-14}} = \\thc{7.21 \\times 10^{-13}\\ \\text{J}}'] },
        { kind: 'math', id: 'a2', size: 'md', lines: ['E_k = \\dfrac{7.21 \\times 10^{-13}}{1.60 \\times 10^{-13}} = \\thc{4.5\\ \\text{MeV}}'] },
      ],
      lines: [
        { say: 'Now turn the question round. How much kinetic energy does an alpha particle need, to come within 3.0 times ten to the negative 14 metres of the centre of a silver nucleus? Silver has 47 protons.', caption: 'Now turn the question round. How much kinetic energy does an alpha particle need, to come within 3.0 × 10⁻¹⁴ m of the centre of a silver nucleus? Silver has 47 protons.', show: ['ag', 'ag.names', 'ag.distance'], play: 'ag.a' },
        { say: 'The charge of the nucleus is 47 e, which is 7.52 times ten to the negative 18 coulombs. The kinetic energy is k times two e times Z e, divided by r. That is 7.21 times ten to the negative 13 joules.', caption: 'The charge of the nucleus is 47e, which is 7.52 × 10⁻¹⁸ C. The kinetic energy is k(2e)(Ze) ÷ r. That is 7.21 × 10⁻¹³ J.', show: 'a1', play: 'ag.b' },
        { say: 'Divide by 1.60 times ten to the negative 13 to change joules to mega electron volts. The alpha particle needs 4.5 mega electron volts.', caption: 'Divide by 1.60 × 10⁻¹³ to change joules to MeV. The alpha particle needs 4.5 MeV.', show: ['a2', 'ag.values'], play: 'ag.c' },
      ],
    },
    {
      chapter: 'The force',
      layout: 'center',
      main: [
        force,
        { kind: 'math', id: 'f0', size: 'md', lines: ['\\opp{F = \\dfrac{k\\,(2e)(Ze)}{r^2}}'] },
        { kind: 'math', id: 'f1', size: 'md', lines: ['F = \\dfrac{8.99 \\times 10^{9} \\times 3.20 \\times 10^{-19} \\times 1.264 \\times 10^{-17}}{(5.0 \\times 10^{-14})^2} = \\thc{14.5\\ \\text{N}}'] },
      ],
      lines: [
        { say: "How hard does the nucleus push? Coulomb's law gives the force at any distance. It is k times two e times Z e, divided by r squared.", caption: "How hard does the nucleus push? Coulomb's law gives the force at any distance. It is k(2e)(Ze) ÷ r².", show: ['fo', 'fo.names', 'fo.force', 'fo.distance', 'f0'], play: 'fo.a' },
        { say: 'At 5.0 times ten to the negative 14 metres from the centre of a gold nucleus, the force on the alpha particle is 14.5 newtons.', caption: 'At 5.0 × 10⁻¹⁴ m from the centre of a gold nucleus, the force on the alpha particle is 14.5 N.', show: 'f1', play: 'fo.b' },
        { say: 'That is a force you could feel in your hand, and it acts on one particle with a mass of less than ten to the negative 26 kilograms. This is why the alpha particle can be thrown straight back.', caption: 'That is a force you could feel in your hand, and it acts on one particle with a mass of less than 10⁻²⁶ kg. This is why the alpha particle can be thrown straight back.', play: 'fo.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The kinetic energy of an alpha particle is doubled. What happens to its distance of closest approach to a nucleus?',
          choices: ['It is halved', 'It is doubled', 'It stays the same', 'It is four times as large'],
          answer: 0,
          working: 'The distance is $r = k(2e)(Ze) \\div E_k$, so it is inversely proportional to the kinetic energy. Twice the energy gives **half the distance**.',
        },
      ],
      lines: [
        { say: 'Your turn. The kinetic energy of an alpha particle is doubled. What happens to its distance of closest approach to a nucleus? Pause the video and think about it.', show: 'q', wait: 6 },
        { say: 'The distance is k times two e times Z e, divided by the kinetic energy. So twice the energy gives half the distance. That is choice "A".', caption: 'The distance is k(2e)(Ze) ÷ Ek. So twice the energy gives half the distance. That is choice A.', show: 'q.answer' },
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
            'In a head-on approach, kinetic energy changes into **electric potential energy**',
            'The distance of closest approach is $r = k(2e)(Ze) \\div E_k$',
            'The nucleus has a charge of **Ze**, and the alpha particle **2e**',
            'Change MeV to joules first: 1 MeV = $1.60 \\times 10^{-13}$ J',
            'The force at a distance r is $F = k(2e)(Ze) \\div r^2$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In a head-on approach, the kinetic energy of the alpha particle changes into electric potential energy.', show: 'sum.0' },
        { say: 'The distance of closest approach is k times two e times Z e, divided by the kinetic energy.', caption: 'The distance of closest approach is k(2e)(Ze) ÷ Ek.', show: 'sum.1' },
        { say: 'The nucleus has a charge of Z e, and the alpha particle has two e.', caption: 'The nucleus has a charge of Ze, and the alpha particle has 2e.', show: 'sum.2' },
        { say: 'Change mega electron volts to joules first.', caption: 'Change MeV to joules first.', show: 'sum.3' },
        { say: 'And the force at any distance comes from Coulomb\'s law, with r squared underneath.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
