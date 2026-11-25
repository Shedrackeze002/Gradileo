import type { Explainer, NucleusEl } from '@/video/script.ts';

// Lesson 4.5, first part: decay equations. Every nucleus is drawn by src/video/nucleus.ts, and
// each decay happens in it: an alpha particle leaves radium-226, a neutron of carbon-14 becomes a
// proton, a proton of sodium-22 becomes a neutron and the neon that is left gives out a gamma
// ray, and thorium-232 goes through five decays in a row.

const build = (id: string, height: number, clips: NucleusEl['clips'], more: Partial<NucleusEl> = {}): NucleusEl => ({ kind: 'nucleus', id, height, clips, ...more });

/** Radium-226 gives out an alpha particle and becomes radon-222. */
const alpha = build(
  'al',
  380,
  { a: { phases: [{ dur: 16.2 }] }, b: { phases: [{ dur: 1 }, { dur: 10.3, decay: 'alpha', symbol: 'Rn', name: 'Radon', shaky: false }] }, c: { phases: [{ dur: 12.3 }] }, d: { phases: [{ dur: 11.9 }] } },
  { z: 88, n: 138, symbol: 'Ra', name: 'Radium', shaky: true, scale: 20, poster: 'b', posterAt: 0.3, thumb: ['symbol', 'counts'] },
);

/** Carbon-14: a neutron becomes a proton, and an electron and an antineutrino leave. */
const minus = build(
  'bm',
  380,
  { a: { phases: [{ dur: 8.9 }] }, b: { phases: [{ dur: 1.5 }, { dur: 12.4, decay: 'beta-', symbol: 'N', name: 'Nitrogen', shaky: false }] }, c: { phases: [{ dur: 7.9 }] }, d: { phases: [{ dur: 14.1 }] } },
  { z: 6, n: 8, shaky: true, scale: 34 },
);

/** Sodium-22: a proton becomes a neutron, a positron and a neutrino leave, and the neon-22 that is left gives out a gamma ray. */
const plus = build(
  'bp',
  380,
  { a: { phases: [{ dur: 6 }, { dur: 12.4, decay: 'beta+', symbol: 'Ne', name: 'Neon', note: 'It still has extra energy' }] }, b: { phases: [{ dur: 8.5 }] }, c: { phases: [{ dur: 6.5 }, { dur: 8.3, decay: 'gamma', shaky: false }] } },
  { z: 11, n: 11, symbol: 'Na', name: 'Sodium', shaky: true, scale: 30 },
);

/** Thorium-232 through three alpha decays and two beta-minus decays, in the order they really happen. */
const series = build(
  'th',
  380,
  {
    a: {
      phases: [
        { dur: 2.5 },
        { dur: 2.8, decay: 'alpha', symbol: 'Ra', name: 'Radium' },
        { dur: 2.8, decay: 'beta-', symbol: 'Ac', name: 'Actinium' },
        { dur: 2.8, decay: 'beta-', symbol: 'Th', name: 'Thorium' },
        { dur: 2.8, decay: 'alpha', symbol: 'Ra', name: 'Radium' },
        { dur: 2.8, decay: 'alpha', symbol: 'Rn', name: 'Radon', shaky: false },
        { dur: 0.2 },
      ],
    },
    b: { phases: [{ dur: 8.8 }] },
    c: { phases: [{ dur: 14.9 }] },
  },
  { z: 90, n: 142, symbol: 'Th', name: 'Thorium', shaky: true, scale: 20 },
);

const video: Explainer = {
  id: 'p30-4-5',
  lessonId: 'p30-4-5',
  title: 'Radioactive Decay',
  thumbnail: 'al',
  summary:
    'An unstable nucleus decays by throwing out a particle or a photon. Watch radium-226 give out an alpha particle, a neutron of carbon-14 become a proton, sodium-22 give out a positron and then a gamma ray, and thorium-232 go through five decays in a row, and learn to write and balance the equation of each decay.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'Radioactive Decay', subtitle: 'Alpha, beta and gamma decay' }],
      lines: [
        { say: 'In eighteen ninety-six, Henri Becquerel found that uranium gives out an invisible radiation, all by itself. The effect was named radioactivity.', caption: 'In 1896, Henri Becquerel found that uranium gives out an invisible radiation, all by itself. The effect was named radioactivity.', show: 'title' },
        { say: 'It comes from unstable nuclei, which change into more stable ones by throwing out particles or energy.' },
      ],
    },
    {
      chapter: 'Alpha decay',
      layout: 'center',
      main: [alpha, { kind: 'math', id: 'e1', size: 'md', lines: ['{}^{226}_{88}\\text{Ra} \\rightarrow {}^{222}_{86}\\text{Rn} + {}^{4}_{2}\\text{He}', '226 = 222 + 4 \\qquad 88 = 86 + 2'] }],
      lines: [
        { say: 'When an unstable nucleus gives out radiation, we say that it decays. The nucleus before the decay is called the parent. This parent is radium-226, a large nucleus with too many nucleons to be stable.', show: ['al', 'al.names', 'al.symbol', 'al.counts'], play: 'al.a' },
        { say: 'It throws out an alpha particle: two protons and two neutrons, which is a helium nucleus. The nucleus that is left is called the daughter.', play: 'al.b' },
        { say: 'The mass number has fallen by 4, to 222. The atomic number has fallen by 2, to 86. So the daughter is a different element: radon.', show: 'e1.0', play: 'al.c' },
        { say: 'Every nuclear equation obeys two rules. The top numbers balance: 226 is 222 plus 4. And the bottom numbers balance: 88 is 86 plus 2.', caption: 'Every nuclear equation obeys two rules. The top numbers balance: 226 = 222 + 4. And the bottom numbers balance: 88 = 86 + 2.', show: 'e1.1', play: 'al.d' },
      ],
    },
    {
      chapter: 'Beta-minus decay',
      layout: 'center',
      main: [minus, { kind: 'math', id: 'e2', size: 'md', lines: ['{}^{14}_{6}\\text{C} \\rightarrow {}^{14}_{7}\\text{N} + {}^{0}_{-1}\\text{e}'] }],
      lines: [
        { say: 'A nucleus with too many neutrons decays in another way. Carbon-14 has 8 neutrons, and only 6 protons.', show: ['bm', 'bm.names', 'bm.symbol', 'bm.counts'], play: 'bm.a' },
        { say: 'One of its neutrons changes into a proton. The nucleus gives out a fast electron, called a beta-minus particle, together with an antineutrino, which has no charge and almost no mass.', play: 'bm.b' },
        { say: 'The electron was not in the nucleus beforehand. It is made at the moment of the decay.', play: 'bm.c' },
        { say: 'The mass number does not change. The atomic number rises by 1, from 6 to 7, so carbon-14 becomes nitrogen-14. Check the bottom numbers: 6 is 7 plus negative 1.', caption: 'The mass number does not change. The atomic number rises by 1, from 6 to 7, so carbon-14 becomes nitrogen-14. Check the bottom numbers: 6 = 7 + (−1).', show: 'e2', play: 'bm.d' },
      ],
    },
    {
      chapter: 'Beta-plus and gamma decay',
      layout: 'center',
      main: [plus, { kind: 'math', id: 'e3', size: 'md', lines: ['{}^{22}_{11}\\text{Na} \\rightarrow {}^{22}_{10}\\text{Ne} + {}^{0}_{+1}\\text{e}'] }],
      lines: [
        { say: 'A nucleus with too few neutrons, like sodium-22, does the opposite. A proton changes into a neutron, and the nucleus gives out a positron, together with a neutrino. A positron has the mass of an electron, and a positive charge.', show: ['bp', 'bp.names', 'bp.symbol', 'bp.counts'], play: 'bp.a' },
        { say: 'The mass number stays at 22, and the atomic number falls by 1. Sodium has become neon.', show: 'e3', play: 'bp.b' },
        { say: 'After a decay, the daughter is often left with extra energy. It settles down by giving out a photon of very high energy, a gamma ray. In a gamma decay, neither number changes.', play: 'bp.c' },
      ],
    },
    {
      chapter: 'The four decays',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Decay', 'Given out', 'Mass number', 'Atomic number'],
          rows: [
            ['Alpha', '${}^{4}_{2}\\text{He}$', 'falls by 4', 'falls by 2'],
            ['Beta-minus', '${}^{0}_{-1}\\text{e}$', 'no change', 'rises by 1'],
            ['Beta-plus', '${}^{0}_{+1}\\text{e}$', 'no change', 'falls by 1'],
            ['Gamma', 'a photon', 'no change', 'no change'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the four decays together. An alpha decay lowers the mass number by 4, and the atomic number by 2.', show: ['t', 't.0'] },
        { say: 'A beta-minus decay raises the atomic number by 1. A beta-plus decay lowers it by 1. Neither changes the mass number.', show: ['t.1', 't.2'] },
        { say: 'And a gamma decay changes neither number.', show: 't.3' },
      ],
    },
    {
      chapter: 'A decay series',
      layout: 'center',
      main: [series, { kind: 'math', id: 'm', size: 'md', lines: ['A = 232 - 3 \\times 4 = 220', 'Z = 90 - 3 \\times 2 + 2 \\times 1 = 86'] }],
      lines: [
        { say: 'The daughter of a decay is often radioactive too, and decays in turn. Follow thorium-232 through five decays: an alpha decay, two beta-minus decays, and two more alpha decays. Watch the two numbers change each time.', show: ['th', 'th.names', 'th.symbol', 'th.counts'], play: 'th.a' },
        { say: 'Only the alpha decays change the mass number. Three of them take it from 232 down to 220.', show: 'm.0', play: 'th.b' },
        { say: 'Each alpha decay lowers the atomic number by 2, and each beta-minus decay raises it by 1. 90 minus 6 plus 2 is 86. So the nucleus at the end is radon-220.', caption: 'Each alpha decay lowers the atomic number by 2, and each beta-minus decay raises it by 1. 90 − 6 + 2 = 86. So the nucleus at the end is radon-220.', show: 'm.1', play: 'th.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A nucleus of polonium-218, ${}^{218}_{84}\\text{Po}$, decays and becomes lead-214, ${}^{214}_{82}\\text{Pb}$. Which kind of decay is this?',
          choices: ['Beta-minus decay', 'Alpha decay', 'Beta-plus decay', 'Gamma decay'],
          answer: 1,
          working: 'The mass number falls by 4 and the atomic number falls by 2, so the nucleus has given out ${}^{4}_{2}\\text{He}$: ${}^{218}_{84}\\text{Po} \\rightarrow {}^{214}_{82}\\text{Pb} + {}^{4}_{2}\\text{He}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A nucleus of polonium-218, with atomic number 84, decays and becomes lead-214, with atomic number 82. Which kind of decay is this? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'The mass number falls by 4, and the atomic number falls by 2. So the nucleus has given out a helium nucleus. This is alpha decay. That is choice "B".', caption: 'The mass number falls by 4, and the atomic number falls by 2. So the nucleus has given out a helium nucleus. This is alpha decay. That is choice B.', show: 'q.answer' },
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
            'An unstable nucleus **decays**: the parent becomes the daughter',
            'In every nuclear equation, the **top numbers** balance and the **bottom numbers** balance',
            '**Alpha** decay gives out ${}^{4}_{2}\\text{He}$: $A$ falls by 4 and $Z$ falls by 2',
            '**Beta-minus** decay gives out an electron: a neutron becomes a proton, and $Z$ rises by 1',
            '**Beta-plus** decay gives out a positron: a proton becomes a neutron, and $Z$ falls by 1',
            '**Gamma** decay gives out a photon, and neither number changes',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An unstable nucleus decays: the parent becomes the daughter.', show: 'sum.0' },
        { say: 'In every nuclear equation, the top numbers balance, and the bottom numbers balance.', show: 'sum.1' },
        { say: 'Alpha decay gives out a helium nucleus. The mass number falls by 4, and the atomic number falls by 2.', show: 'sum.2' },
        { say: 'Beta-minus decay gives out an electron. A neutron becomes a proton, and the atomic number rises by 1.', show: 'sum.3' },
        { say: 'Beta-plus decay gives out a positron. A proton becomes a neutron, and the atomic number falls by 1.', show: 'sum.4' },
        { say: 'And gamma decay gives out a photon. Neither number changes.', show: 'sum.5' },
      ],
    },
  ],
};

export default video;
