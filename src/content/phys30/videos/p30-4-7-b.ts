import type { Explainer, ReactionEl } from '@/video/script.ts';

// Lesson 4.7, second part: fission and fusion. src/video/reaction.ts splits a nucleus of
// uranium-235 with a neutron, runs a chain reaction with and without control rods, and sends
// two nuclei of hydrogen at each other, slowly and then fast enough to fuse.

const reaction = (id: string, height: number, clips: ReactionEl['clips'], more: Partial<ReactionEl> = {}): ReactionEl => ({ kind: 'reaction', id, height, clips, ...more });

/** A neutron splits uranium-235 into krypton-92, barium-141 and 3 neutrons. */
const fission = reaction('fi', 360, { a: { phases: [{ dur: 11.5 }] }, b: { phases: [{ dur: 1.2 }, { dur: 10.1, fire: true }] }, c: { phases: [{ dur: 15 }] }, d: { phases: [{ dur: 16.3 }] } }, { picture: 'fission', poster: 'b', posterAt: 0.52, thumb: ['names'] });

/** A chain reaction that doubles with every generation. */
const chain = reaction('ch', 450, { a: { phases: [{ dur: 8.4 }] }, b: { phases: [{ dur: 3.6 }, { dur: 8.3, fire: true }] }, c: { phases: [{ dur: 12.3 }] } }, { picture: 'chain' });

/** The same reaction held steady by control rods. */
const reactor = reaction('rc', 290, { a: { phases: [{ dur: 1 }, { dur: 8.7, fire: true }] }, b: { phases: [{ dur: 5.8 }] }, c: { phases: [{ dur: 0.6 }, { dur: 7.8, fire: true }] }, d: { phases: [{ dur: 0.6 }, { dur: 9.1, fire: true }] }, e: { phases: [{ dur: 1 }, { dur: 15.5, fire: true }] } }, { picture: 'chain', rods: true });

/** Hydrogen-2 and hydrogen-3: turned back when slow, fused when fast. */
const fusion = reaction('fu', 330, { a: { phases: [{ dur: 10.6 }] }, b: { phases: [{ dur: 3.4 }, { dur: 6.3, fire: 'slow' }] }, c: { phases: [{ dur: 0.8 }, { dur: 16.8, fire: true }] }, d: { phases: [{ dur: 0.8 }, { dur: 4.6, fire: 'slow' }, { dur: 9, fire: true }] }, e: { phases: [{ dur: 8.8 }] } }, { picture: 'fusion' });

/** Both reactions on the graph of the binding energy for each nucleon. */
const curve = reaction(
  'cw',
  460,
  { a: { phases: [{ dur: 11.4 }] }, b: { phases: [{ dur: 1.5 }, { dur: 4, to: 116 }, { dur: 3.7 }] }, c: { phases: [{ dur: 0.4 }, { dur: 1.6, to: 2 }, { dur: 1 }, { dur: 3, to: 4 }, { dur: 8.9 }] } },
  { picture: 'curve', at: 235 },
);

const video: Explainer = {
  id: 'p30-4-7-b',
  lessonId: 'p30-4-7',
  title: 'Fission and Fusion',
  thumbnail: 'fi',
  summary:
    'Two ways to release the energy of the nucleus. Watch a neutron split uranium-235 into barium, krypton and 3 more neutrons, see a chain reaction double and then held steady by control rods, send two nuclei of hydrogen together fast enough to fuse into helium, and work out the energy of each reaction from the mass that is lost.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'Fission and Fusion', subtitle: 'Two ways to release nuclear energy' }],
      lines: [
        { say: 'The nuclei of middle mass, near iron, are the most tightly bound. So any change that makes nuclei more like them releases energy.', show: 'title' },
        { say: 'There are two ways to do it. One splits a very heavy nucleus, and the other joins very light ones.' },
      ],
    },
    {
      chapter: 'Fission',
      layout: 'center',
      main: [
        fission,
        {
          kind: 'math',
          id: 'fq',
          size: 'md',
          lines: ['{}^{235}_{92}\\text{U} + {}^{1}_{0}\\text{n} \\rightarrow {}^{141}_{56}\\text{Ba} + {}^{92}_{36}\\text{Kr} + 3\\,{}^{1}_{0}\\text{n}', '0.1859 \\times 931.5 = \\thc{173.2\\ \\text{MeV}}'],
        },
      ],
      lines: [
        { say: 'This is a nucleus of uranium-235. It has 92 protons and 143 neutrons, and it is one of the heaviest nuclei found in nature.', show: ['fi', 'fi.names'], play: 'fi.a' },
        { say: 'Let a slow neutron run into it. The nucleus absorbs the neutron, becomes unstable, and splits into two smaller nuclei. This splitting is called fission.', play: 'fi.b' },
        { say: 'Here the two pieces are krypton-92 and barium-141, and 3 neutrons fly out as well. The equation balances. There are 236 nucleons before, and 141 plus 92 plus 3 is 236 after.', show: 'fq.0', play: 'fi.c' },
        { say: 'The pieces are more tightly bound than uranium was, so their total mass is less. The mass that is lost is 0.1859 atomic mass units. Times 931.5, that is 173.2 megaelectronvolts, from a single nucleus.', caption: 'The pieces are more tightly bound than uranium was, so their total mass is less. The mass that is lost is 0.1859 u. Times 931.5, that is 173.2 MeV, from a single nucleus.', show: ['fq.1', 'fi.energy'], play: 'fi.d' },
      ],
    },
    {
      chapter: 'The chain reaction',
      layout: 'center',
      main: [chain],
      lines: [
        { say: 'Those free neutrons matter. Each one can run into another nucleus of uranium, and split it too.', show: 'ch', play: 'ch.a' },
        { say: 'Suppose two neutrons from every fission go on to cause another. Watch. One fission becomes 2, then 4, then 8. This is a chain reaction.', show: 'ch.count', play: 'ch.b' },
        { say: 'The rate doubles with every generation, so it grows very quickly, and the energy comes out almost at once. That is what happens in a bomb.', show: 'ch.names', play: 'ch.c' },
      ],
    },
    {
      chapter: 'A reactor',
      layout: 'center',
      main: [
        reactor,
        {
          kind: 'bullets',
          id: 'rp',
          items: ['The **fuel rods** hold the uranium', 'The **moderator**, often water or graphite, slows the neutrons down', 'The **control rods** absorb neutrons, and hold the rate steady'],
        },
      ],
      lines: [
        { say: 'A reactor keeps the chain reaction steady. On average, exactly one neutron from each fission goes on to cause another.', show: ['rc', 'rc.names', 'rc.count'], play: 'rc.a' },
        { say: 'It has three main parts. The fuel rods hold the uranium.', show: 'rp.0', play: 'rc.b' },
        { say: 'The moderator slows the neutrons down, because uranium-235 captures slow neutrons much more readily than fast ones.', show: 'rp.1', play: 'rc.c' },
        { say: 'And the control rods absorb neutrons. Pushing them further in slows the reaction, and pulling them out speeds it up.', show: 'rp.2', play: 'rc.d' },
        { say: 'The energy heats water into steam, which turns turbines, as in any other power station. But the products of fission are strongly radioactive, so the used fuel has to be stored safely for a very long time.', play: 'rc.e' },
      ],
    },
    {
      chapter: 'Fusion',
      layout: 'center',
      main: [
        fusion,
        { kind: 'math', id: 'uq', size: 'md', lines: ['{}^{2}_{1}\\text{H} + {}^{3}_{1}\\text{H} \\rightarrow {}^{4}_{2}\\text{He} + {}^{1}_{0}\\text{n}', '0.0188 \\times 931.5 = \\thc{17.5\\ \\text{MeV}}'] },
      ],
      lines: [
        { say: 'Fusion is the opposite. Two small nuclei join to make a larger one. Here are two kinds of hydrogen: hydrogen-2, and hydrogen-3.', show: ['fu', 'fu.names'], play: 'fu.a' },
        { say: 'But both nuclei are positive, so they repel each other. Send them together slowly, and the repulsion turns them back.', show: 'fu.repel', play: 'fu.b' },
        { say: 'Send them fast enough, and they touch. The strong force joins them into helium-4, and a neutron flies out. That force only reaches about ten to the minus 15 metres, so the nuclei have to come that close.', caption: 'Send them fast enough, and they touch. The strong force joins them into helium-4, and a neutron flies out. That force only reaches about 10⁻¹⁵ m, so the nuclei have to come that close.', show: 'uq.0', play: 'fu.c' },
        { say: 'Moving that fast takes a temperature of millions of degrees, which is found at the centre of a star. The energy of the Sun comes from the fusion of hydrogen into helium.', play: 'fu.d' },
        { say: 'In this reaction the mass that is lost is 0.0188 atomic mass units, so it releases 17.5 megaelectronvolts.', caption: 'In this reaction the mass that is lost is 0.0188 u, so it releases 17.5 MeV.', show: ['uq.1', 'fu.energy'], play: 'fu.e' },
      ],
    },
    {
      chapter: 'The same reason',
      layout: 'center',
      main: [curve],
      lines: [
        { say: 'Both reactions release energy for the same reason. Here is the graph of the binding energy for each nucleon, with its peak near iron.', show: ['cw', 'cw.names', 'cw.peak', 'cw.value'], play: 'cw.a' },
        { say: 'Fission takes a heavy nucleus, on the right, and makes nuclei of middle mass, which are nearer the peak.', show: 'cw.fission', play: 'cw.b' },
        { say: 'Fusion takes the lightest nuclei, and moves them up the steep left side. Either way the products are more tightly bound, so they have less mass, and the difference appears as energy.', show: 'cw.fusion', play: 'cw.c' },
      ],
    },
    {
      chapter: 'Which gives more?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'One fission', 'One fusion'],
          rows: [
            ['Energy released', '173.2 MeV', '17.5 MeV'],
            ['Mass of the fuel', '236 u', '5 u'],
          ],
        },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Kilogram for kilogram', md: 'Fusion releases several times more energy than fission, and both release **millions of times** more than burning.' },
      ],
      lines: [
        { say: 'One fission releases about ten times as much energy as one fusion.', show: ['t', 't.0'] },
        { say: 'But it also uses about fifty times as much mass of fuel.', show: 't.1' },
        { say: 'So kilogram for kilogram, fusion releases several times more energy than fission. And both release millions of times more than burning.', show: 'k' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A nucleus of uranium-235 absorbs a neutron and splits into tellurium-134, a second nucleus, and 3 free neutrons. What is the mass number of the second nucleus?',
          choices: ['102', '101', '99', '96'],
          answer: 2,
          working: 'The mass numbers balance: $235 + 1 = 134 + A + 3$, so $A = 236 - 137 = 99$.',
        },
      ],
      lines: [
        { say: 'Your turn. A nucleus of uranium-235 absorbs a neutron, and splits into tellurium-134, a second nucleus, and 3 free neutrons. What is the mass number of the second nucleus? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'The mass numbers must balance. Before, there are 235 plus 1, which is 236. Take away 134 for the tellurium, and 3 for the neutrons, and 99 are left. That is choice "C".', caption: 'The mass numbers must balance. Before, there are 235 + 1, which is 236. Take away 134 for the tellurium, and 3 for the neutrons, and 99 are left. That is choice C.', show: 'q.answer' },
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
            '**Fission** splits a large nucleus, and **fusion** joins small nuclei',
            'Both release energy, because the products have **less mass**',
            'Each fission frees neutrons, so a **chain reaction** is possible',
            'A **moderator** slows the neutrons, and **control rods** absorb them',
            'Fusion needs **millions of degrees**, and it powers the Sun',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Fission splits a large nucleus, and fusion joins small nuclei.', show: 'sum.0' },
        { say: 'Both release energy, because the products are more tightly bound and have less mass.', show: 'sum.1' },
        { say: 'Each fission frees neutrons, so a chain reaction is possible.', show: 'sum.2' },
        { say: 'In a reactor, a moderator slows the neutrons, and control rods absorb them.', show: 'sum.3' },
        { say: 'And fusion needs millions of degrees, so that nuclei move fast enough to overcome their repulsion. It is the source of the energy of the Sun.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
