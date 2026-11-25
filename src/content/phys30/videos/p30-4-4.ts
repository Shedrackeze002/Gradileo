import type { Explainer, NucleusEl } from '@/video/script.ts';

// Lesson 4.4, first part: what a nucleus is made of. Every nucleus is drawn to scale by
// src/video/nucleus.ts as a ball of protons and neutrons with the radius 1.2 fm × ∛A: carbon-12
// is counted, uranium-238 is built from it, neutrons are added to make an isotope, and a hundred
// atoms of chlorine show why its average mass is 35.48 u.

const build = (id: string, height: number, clips: NucleusEl['clips'], more: Partial<NucleusEl> = {}): NucleusEl => ({ kind: 'nucleus', id, height, clips, ...more });

/** Carbon-12, put together: one proton, then six, and then six neutrons. */
const made = build(
  'nb',
  400,
  { a: { phases: [{ dur: 3 }, { dur: 3, z: 6, symbol: 'C', name: 'Carbon' }, { dur: 1.2 }, { dur: 3, n: 6 }, { dur: 2.1 }] }, b: { phases: [{ dur: 14.6 }] }, c: { phases: [{ dur: 10.5 }] } },
  { z: 1, n: 0, symbol: 'H', name: 'Hydrogen', scale: 34 },
);

/** The numbers of a nucleus: carbon-12, then uranium-238. */
const numbers = build(
  'nz',
  440,
  {
    a: { phases: [{ dur: 12.3 }] },
    b: { phases: [{ dur: 10.6 }] },
    c: { phases: [{ dur: 11.9 }] },
    d: { phases: [{ dur: 3, z: 92, n: 146, symbol: 'U', name: 'Uranium' }, { dur: 7.8 }] },
  },
  { scale: 22, poster: 'd', posterAt: 1, thumb: ['symbol', 'counts'] },
);

/** An atom of copper-63 becomes an ion: two electrons leave, and the nucleus is not changed. */
const ion = build('cu', 420, { a: { phases: [{ dur: 11.4 }] }, b: { phases: [{ dur: 9 }, { dur: 3, electrons: 27 }, { dur: 7.6 }] } }, { z: 29, n: 34, symbol: 'Cu', name: 'Copper', electrons: 29, scale: 17 });

/** Isotopes of carbon: the same protons, with more neutrons. */
const isotopes = build(
  'iso',
  420,
  {
    a: { phases: [{ dur: 1.5 }, { dur: 3, n: 8 }, { dur: 7.8 }] },
    b: { phases: [{ dur: 10.4 }] },
    c: { phases: [{ dur: 6 }, { dur: 2, n: 6 }, { dur: 1.5 }, { dur: 2, n: 8, shaky: true }, { dur: 1.1 }] },
  },
  { scale: 34 },
);

/** A hundred atoms of chlorine, and the average mass of one. */
const chlorine = build('mx', 430, { a: { phases: [{ dur: 3 }, { dur: 4, share: 0.758 }, { dur: 4 }] }, b: { phases: [{ dur: 15.8 }] }, c: { phases: [{ dur: 12.6 }] } }, { picture: 'mix', masses: [35, 37], share: 0.5, name: 'Chlorine' });

const video: Explainer = {
  id: 'p30-4-4',
  lessonId: 'p30-4-4',
  title: 'Inside the Nucleus',
  thumbnail: 'nz',
  summary:
    'A nucleus is made of protons and neutrons. See carbon-12 and uranium-238 built to scale, read the atomic number and the mass number from the symbol of a nucleus, count the particles of an ion, add neutrons to make an isotope, and find the average mass of an atom of chlorine.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'Inside the Nucleus', subtitle: 'Protons, neutrons and isotopes' }],
      lines: [
        { say: "Rutherford's nucleus holds all of the positive charge of an atom, in a space a hundred thousand times smaller than the atom.", show: 'title' },
        { say: 'So what is the nucleus itself made of? Let us look inside.' },
      ],
    },
    {
      chapter: 'Protons and neutrons',
      layout: 'center',
      main: [made, { kind: 'math', id: 'u', size: 'md', lines: ['1\\ \\text{u} = 1.66 \\times 10^{-27}\\ \\text{kg}'] }],
      lines: [
        { say: 'A nucleus is made of two kinds of particle. Protons, which each have a charge of plus e. And neutrons, which have no charge at all.', caption: 'A nucleus is made of two kinds of particle. Protons, which each have a charge of +e. And neutrons, which have no charge at all.', show: ['nb', 'nb.names'], play: 'nb.a' },
        { say: 'A proton or a neutron is called a nucleon. The two have almost the same mass, about one atomic mass unit. That is 1.66 times ten to the negative 27 kilograms.', caption: 'A proton or a neutron is called a nucleon. The two have almost the same mass, about one atomic mass unit. That is 1.66 × 10⁻²⁷ kg.', show: 'u', play: 'nb.b' },
        { say: 'An electron has only about one 1,800th of that mass. So nearly all of the mass of an atom is in its nucleus.', caption: 'An electron has only about 1/1800 of that mass. So nearly all of the mass of an atom is in its nucleus.', play: 'nb.c' },
      ],
    },
    {
      chapter: 'Two numbers',
      layout: 'center',
      main: [numbers, { kind: 'math', id: 'nn', size: 'md', lines: ['N = A - Z'] }],
      lines: [
        { say: 'Two numbers describe a nucleus. The atomic number, Z, is the number of protons. It decides which element the atom is. Six protons make this carbon.', show: ['nz', 'nz.names', 'nz.counts'], play: 'nz.a' },
        { say: 'The mass number, "A", is the number of nucleons: protons and neutrons together. So the number of neutrons is "A" minus Z.', caption: 'The mass number, A, is the number of nucleons: protons and neutrons together. So the number of neutrons is A − Z.', show: 'nn', play: 'nz.b' },
        { say: 'We write a nucleus with the mass number on top, the atomic number below it, and the chemical symbol after them. This one is carbon-12.', show: 'nz.symbol', play: 'nz.c' },
        { say: 'Here is a much larger nucleus, uranium-238. Its atomic number is 92, so it has 92 protons. And 238 minus 92 gives 146 neutrons.', play: 'nz.d' },
      ],
    },
    {
      chapter: 'Atoms and ions',
      layout: 'center',
      main: [ion],
      lines: [
        { say: 'A neutral atom has as many electrons as protons. An ion has gained or lost electrons, and its nucleus is not changed at all.', show: ['cu', 'cu.names', 'cu.symbol', 'cu.counts', 'cu.charge'], play: 'cu.a' },
        { say: 'This atom of copper-63 has 29 protons, and 63 minus 29, which is 34, neutrons. Now make it an ion with a charge of plus 2 e. The charge tells us that the ion has two fewer electrons than protons. So it has 27.', caption: 'This atom of copper-63 has 29 protons, and 63 − 29, which is 34, neutrons. Now make it an ion with a charge of +2e. The charge tells us that the ion has two fewer electrons than protons. So it has 27.', play: 'cu.b' },
      ],
    },
    {
      chapter: 'Isotopes',
      layout: 'center',
      main: [isotopes],
      lines: [
        { say: 'Now add two neutrons to carbon-12. It still has six protons, so it is still carbon. But its mass number is now 14. This is carbon-14.', show: ['iso', 'iso.names', 'iso.symbol', 'iso.counts'], play: 'iso.a' },
        { say: 'Atoms of the same element with different numbers of neutrons are called isotopes. They have the same atomic number, and different mass numbers.', play: 'iso.b' },
        { say: 'Isotopes have the same number of electrons, so they behave in the same way in chemical reactions. But their nuclei differ. Carbon-12 is stable, while carbon-14 is radioactive.', play: 'iso.c' },
      ],
    },
    {
      chapter: 'The average mass',
      layout: 'center',
      main: [chlorine],
      lines: [
        { say: 'Most elements are a mixture of isotopes. In chlorine, 75.8 percent of the atoms are chlorine-35, and the other 24.2 percent are chlorine-37.', caption: 'Most elements are a mixture of isotopes. In chlorine, 75.8% of the atoms are chlorine-35, and the other 24.2% are chlorine-37.', show: ['mx', 'mx.names', 'mx.share'], play: 'mx.a' },
        { say: 'The mass in the periodic table is the average over all of the atoms, with each isotope counted by its share. Picture the two isotopes on a beam. It balances at the average mass.', show: 'mx.average', play: 'mx.b' },
        { say: 'That is 0.758 times 35, plus 0.242 times 37, which comes to 35.48 atomic mass units. It is closer to 35, because most of the atoms are chlorine-35.', caption: 'That is 0.758 × 35 + 0.242 × 37, which comes to 35.48 u. It is closer to 35, because most of the atoms are chlorine-35.', play: 'mx.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A nucleus contains 26 protons and 30 neutrons. What are its atomic number $Z$ and its mass number $A$?',
          choices: ['$Z = 30$ and $A = 26$', '$Z = 26$ and $A = 30$', '$Z = 56$ and $A = 26$', '$Z = 26$ and $A = 56$'],
          answer: 3,
          working: 'The atomic number is the number of protons, $Z = 26$. The mass number counts protons and neutrons together: $A = 26 + 30 = 56$. This is iron-56.',
        },
      ],
      lines: [
        { say: 'Your turn. A nucleus contains 26 protons and 30 neutrons. What are its atomic number, and its mass number? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'The atomic number is the number of protons, 26. The mass number counts protons and neutrons together: 26 plus 30 is 56. This is iron-56. That is choice "D".', caption: 'The atomic number is the number of protons, 26. The mass number counts protons and neutrons together: 26 + 30 = 56. This is iron-56. That is choice D.', show: 'q.answer' },
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
            'A nucleus is made of **protons** and **neutrons**, which are called nucleons',
            'The atomic number $Z$ is the number of protons, and the mass number $A$ is the number of nucleons',
            'The number of neutrons is $N = A - Z$',
            'An ion has gained or lost **electrons**: its nucleus is unchanged',
            '**Isotopes** have the same atomic number and different mass numbers',
            'The average mass of an element comes from the **share** of each isotope',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A nucleus is made of protons and neutrons, which are called nucleons.', show: 'sum.0' },
        { say: 'The atomic number, Z, is the number of protons. The mass number, "A", is the number of nucleons.', caption: 'The atomic number, Z, is the number of protons. The mass number, A, is the number of nucleons.', show: 'sum.1' },
        { say: 'The number of neutrons is "A" minus Z.', caption: 'The number of neutrons is A − Z.', show: 'sum.2' },
        { say: 'An ion has gained or lost electrons. Its nucleus is unchanged.', show: 'sum.3' },
        { say: 'Isotopes have the same atomic number, and different mass numbers.', show: 'sum.4' },
        { say: 'And the average mass of an element comes from the share of each isotope.', show: 'sum.5' },
      ],
    },
  ],
};

export default video;
