import type { Explainer, ReactionEl } from '@/video/script.ts';

// Lesson 4.7, first part: mass defect and binding energy. src/video/reaction.ts brings the
// protons and neutrons of a nucleus together while its mass falls by the mass defect, and draws
// the graph of the binding energy for each nucleon, with its peak near iron.

const reaction = (id: string, height: number, clips: ReactionEl['clips'], more: Partial<ReactionEl> = {}): ReactionEl => ({ kind: 'reaction', id, height, clips, ...more });

/** Two protons and two neutrons come together into a helium-4 nucleus. */
const helium = reaction('he', 380, { a: { phases: [{ dur: 15.8 }] }, b: { phases: [{ dur: 2 }, { dur: 10.1, join: true }] }, c: { phases: [{ dur: 7.3 }] } }, { name: 'helium', poster: 'b', posterAt: 1, thumb: ['names', 'masses'] });

/** The same nucleus, pulled apart again and put back. */
const bound = reaction('be', 330, { a: { phases: [{ dur: 14.5 }] }, b: { phases: [{ dur: 1.5 }, { dur: 7.6, join: false }] }, c: { phases: [{ dur: 1 }, { dur: 9.8, join: true }] } }, { name: 'helium', joined: true });

/** Iron-56: 493.79 MeV, or 8.82 MeV for each nucleon. */
const iron = reaction('fe', 340, { a: { phases: [{ dur: 5 }, { dur: 8.6, join: true }] }, b: { phases: [{ dur: 13.2 }] }, c: { phases: [{ dur: 9.3 }] } }, { z: 26, n: 30, name: 'iron', mass: 55.9207, each: true, places: 2 });

/** The graph of the binding energy for each nucleon. */
const curve = reaction(
  'cv',
  460,
  { a: { phases: [{ dur: 10.2 }] }, b: { phases: [{ dur: 2 }, { dur: 5, to: 60 }, { dur: 6.6 }] }, c: { phases: [{ dur: 0.4 }, { dur: 2.6, to: 4 }, { dur: 0.5 }, { dur: 3, to: 235 }] }, d: { phases: [{ dur: 4 }, { dur: 4, to: 60 }, { dur: 8.7 }] } },
  { picture: 'curve', at: 4 },
);

const video: Explainer = {
  id: 'p30-4-7',
  lessonId: 'p30-4-7',
  title: 'Mass Defect and Binding Energy',
  thumbnailTitle: 'Binding Energy',
  thumbnail: 'he',
  summary:
    'A nucleus has less mass than its separate protons and neutrons. Watch helium-4 come together and lose 0.0305 u, turn that mass defect into a binding energy with E = mc² and 931.5 MeV for each atomic mass unit, compare iron-56 with uranium-235, and read the graph of the binding energy for each nucleon.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'Mass Defect and Binding Energy', subtitle: 'Where the energy of a nucleus comes from' }],
      lines: [
        { say: 'Weigh two protons and two neutrons, one at a time. Then weigh a helium nucleus, which is made of exactly those four particles.', show: 'title' },
        { say: 'The nucleus is lighter. Some mass has gone missing. Let us find where it went.' },
      ],
    },
    {
      chapter: 'The missing mass',
      layout: 'center',
      main: [helium],
      lines: [
        { say: 'Here are two protons and two neutrons, apart. A proton has a mass of 1.0073 atomic mass units, and a neutron has 1.0087. Together, the four have a mass of 4.0320 atomic mass units.', caption: 'Here are two protons and two neutrons, apart. A proton has a mass of 1.0073 u, and a neutron has 1.0087 u. Together, the four have a mass of 4.0320 u.', show: ['he', 'he.names', 'he.masses'], play: 'he.a' },
        { say: 'Now let them come together into a nucleus of helium-4. Energy leaves as they join. And the mass of the nucleus is only 4.0015 atomic mass units.', caption: 'Now let them come together into a nucleus of helium-4. Energy leaves as they join. And the mass of the nucleus is only 4.0015 u.', play: 'he.b' },
        { say: 'The difference is 0.0305 atomic mass units. It is called the mass defect of the nucleus.', caption: 'The difference is 0.0305 u. It is called the mass defect of the nucleus.', play: 'he.c' },
      ],
    },
    {
      chapter: 'Mass and energy',
      layout: 'center',
      main: [{ kind: 'math', id: 'e', size: 'lg', lines: ['E = mc^2', 'E = 2.0 \\times 10^{-3} \\times (3.00 \\times 10^{8})^2 = \\thc{1.80 \\times 10^{14}\\ \\text{J}}', '1\\ \\text{u} \\;\\text{is equivalent to}\\; \\thc{931.5\\ \\text{MeV}}'] }],
      lines: [
        { say: 'Where did the mass go? In nineteen oh five, Einstein showed that mass and energy are two forms of the same thing. The energy is the mass times the speed of light squared.', caption: 'Where did the mass go? In 1905, Einstein showed that mass and energy are two forms of the same thing: E = mc².', show: 'e.0' },
        { say: 'The speed of light squared is a huge number, so a very small mass is a very large energy. If only 2.0 grams of mass is changed into energy, the energy is 1.80 times ten to the 14 joules. That is about as much as burning 6,000 tonnes of coal.', caption: 'c² is a huge number, so a very small mass is a very large energy. If only 2.0 g of mass is changed into energy, the energy is 1.80 × 10¹⁴ J. That is about as much as burning 6000 tonnes of coal.', show: 'e.1' },
        { say: 'For nuclei there is a handy shortcut. A mass of 1 atomic mass unit is equivalent to 931.5 megaelectronvolts of energy.', caption: 'For nuclei there is a handy shortcut. A mass of 1 u is equivalent to 931.5 MeV of energy.', show: 'e.2' },
      ],
    },
    {
      chapter: 'Binding energy',
      layout: 'center',
      main: [bound, { kind: 'math', id: 'b1', size: 'md', lines: ['\\Delta m = 4.0320 - 4.0015 = 0.0305\\ \\text{u}', 'E_b = 0.0305 \\times 931.5 = \\thc{28.4\\ \\text{MeV}}'] }],
      lines: [
        { say: 'So the missing mass left as energy when the nucleus formed. That energy is the binding energy of the nucleus. For helium-4 it is 0.0305 times 931.5, which is 28.4 megaelectronvolts.', caption: 'So the missing mass left as energy when the nucleus formed. That energy is the binding energy of the nucleus. For helium-4 it is 0.0305 × 931.5, which is 28.4 MeV.', show: ['be', 'be.names', 'be.masses', 'be.energy', 'b1.0', 'b1.1'], play: 'be.a' },
        { say: 'It is also the energy that must be supplied to pull the nucleus apart again, into separate protons and neutrons.', play: 'be.b' },
        { say: 'Keep all four decimal places in these masses. They differ only in the second or third decimal place, so rounding early destroys the answer.', play: 'be.c' },
      ],
    },
    {
      chapter: 'For each nucleon',
      layout: 'center',
      main: [iron, { kind: 'math', id: 'f', size: 'md', lines: ['\\text{iron-56: }\\; 493.79 \\div 56 = \\thc{8.82\\ \\text{MeV}}', '\\text{uranium-235: }\\; 1790.53 \\div 235 = 7.62\\ \\text{MeV}'] }],
      lines: [
        { say: 'A large nucleus has more binding energy than a small one, simply because it has more nucleons. To compare nuclei fairly, divide the binding energy by the mass number.', show: ['fe', 'fe.names', 'fe.masses'], play: 'fe.a' },
        { say: 'Iron-56 has a mass defect of 0.5301 atomic mass units, so its binding energy is 493.79 megaelectronvolts. Shared among 56 nucleons, that is 8.82 megaelectronvolts for each nucleon.', caption: 'Iron-56 has a mass defect of 0.5301 u, so its binding energy is 493.79 MeV. Shared among 56 nucleons, that is 8.82 MeV for each nucleon.', show: ['fe.energy', 'f.0'], play: 'fe.b' },
        { say: 'The same sum for uranium-235 gives only 7.62. So iron-56 is more tightly bound, and more stable, than uranium-235.', show: 'f.1', play: 'fe.c' },
      ],
    },
    {
      chapter: 'The graph',
      layout: 'center',
      main: [curve],
      lines: [
        { say: 'Plot the binding energy for each nucleon against the mass number, for every kind of nucleus, and this is the graph.', show: ['cv', 'cv.names', 'cv.value'], play: 'cv.a' },
        { say: 'It has a peak near iron and nickel, at a mass number of about 60. These nuclei of middle mass are the most tightly bound, and the most stable.', show: 'cv.peak', play: 'cv.b' },
        { say: 'Very light nuclei, and very heavy nuclei, have less binding energy for each nucleon.', play: 'cv.c' },
        { say: 'So any change that moves nuclei towards the peak releases energy. There are two ways to do it. Fusion joins light nuclei, and fission splits a heavy one. They are the subject of the next video.', show: ['cv.fusion', 'cv.fission'], play: 'cv.d' },
      ],
    },
    {
      chapter: 'Mass that becomes power',
      layout: 'center',
      main: [{ kind: 'math', id: 's', size: 'lg', lines: ['m = \\dfrac{E}{c^2}', 'm = \\dfrac{3.8 \\times 10^{26}}{(3.00 \\times 10^{8})^2} = \\thc{4.22 \\times 10^{9}\\ \\text{kg}}'] }],
      lines: [
        { say: 'A source of nuclear energy loses mass all the time. The Sun gives out 3.8 times ten to the 26 joules of energy every second. Dividing an energy by the speed of light squared gives the mass that was lost.', caption: 'A source of nuclear energy loses mass all the time. The Sun gives out 3.8 × 10²⁶ J of energy every second. Dividing an energy by c² gives the mass that was lost.', show: 's.0' },
        { say: 'So the Sun loses 4.22 times ten to the 9 kilograms every second. That is more than four million tonnes.', caption: 'So the Sun loses 4.22 × 10⁹ kg every second. That is more than four million tonnes.', show: 's.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A nucleus of lithium-7 has 3 protons and 4 neutrons, and a mass of 7.0144 u. A proton has a mass of 1.0073 u and a neutron 1.0087 u. What is the mass defect of the nucleus?',
          choices: ['0.0144 u', '0.0423 u', '0.0567 u', '39.4 u'],
          answer: 1,
          working: 'Separate nucleons: $3 \\times 1.0073 + 4 \\times 1.0087 = 7.0567$ u. Mass defect: $7.0567 - 7.0144 = 0.0423$ u.',
        },
      ],
      lines: [
        { say: 'Your turn. A nucleus of lithium-7 has 3 protons and 4 neutrons, and a mass of 7.0144 atomic mass units. What is its mass defect? Pause the video and work it out.', caption: 'Your turn. A nucleus of lithium-7 has 3 protons and 4 neutrons, and a mass of 7.0144 u. What is its mass defect? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'The separate nucleons have a mass of 3 times 1.0073, plus 4 times 1.0087, which is 7.0567. Take away 7.0144, and the mass defect is 0.0423 atomic mass units. That is choice "B".', caption: 'The separate nucleons have a mass of 3 × 1.0073 + 4 × 1.0087, which is 7.0567 u. Take away 7.0144 u, and the mass defect is 0.0423 u. That is choice B.', show: 'q.answer' },
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
            'Mass and energy are equivalent: $E = mc^2$, and 1 u is equivalent to **931.5 MeV**',
            'The **mass defect** is the mass of the separate nucleons less the mass of the nucleus',
            'The **binding energy** is the energy equivalent to the mass defect',
            'The binding energy **for each nucleon** shows how tightly a nucleus is bound',
            'It is greatest near **iron**, so fusion and fission both release energy',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Mass and energy are equivalent, and 1 atomic mass unit is equivalent to 931.5 megaelectronvolts.', caption: 'Here is what to remember. Mass and energy are equivalent, and 1 u is equivalent to 931.5 MeV.', show: 'sum.0' },
        { say: 'The mass defect is the mass of the separate nucleons, less the mass of the nucleus.', show: 'sum.1' },
        { say: 'The binding energy is the energy equivalent to the mass defect.', show: 'sum.2' },
        { say: 'The binding energy for each nucleon shows how tightly a nucleus is bound.', show: 'sum.3' },
        { say: 'And it is greatest near iron, so fusion and fission both release energy.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
