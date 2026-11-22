import type { Explainer } from '@/video/script.ts';
import { hammeredCopper, meltTogether } from '@/content/chem10/videos/lib/c10-particles.ts';
import { moltenSalt } from '@/content/chem30/videos/lib/c30-cells.ts';

// Exam question for Chemistry 10 lesson 3.4 (bonding and properties): identify four solids as ionic,
// metallic, covalent network or molecular from their properties. The question is OpenStax Chemistry
// 2e's own, word for word (end-of-chapter exercise 72, section 10.5, CC BY-NC-SA 4.0). Answer:
// A metallic, B ionic, C covalent network, D molecular.
//
// The pictures (src/video/particles.ts): four solids warmed together whose particles hold on with
// different strengths, so they melt in the order of the four melting points; a copper bar hammered,
// whose rows slide but hold (malleable); and molten salt conducting, its ions drifting to the
// electrodes.

const QUESTION =
  'Identify the following substances as ionic, metallic, covalent network, or molecular solids: Substance A is malleable, ductile, conducts electricity well, and has a melting point of 1135 °C. Substance B is brittle, does not conduct electricity as a solid but does when molten, and has a melting point of 2072 °C. Substance C is very hard, does not conduct electricity, and has a melting point of 3440 °C. Substance D is soft, does not conduct electricity, and has a melting point of 185 °C.';

const four = meltTogether(
  'mt',
  [
    { id: 'd', label: 'D: molecular', bond: 1, tone: 'hyp' },
    { id: 'a', label: 'A: metallic', bond: 2.5, tone: 'opp' },
    { id: 'b', label: 'B: ionic', bond: 4, tone: 'brand' },
    { id: 'c', label: 'C: network', bond: 6, tone: 'good' },
  ],
  1.6,
  400,
);

const video: Explainer = {
  id: 'xq-c10-3-4',
  lessonId: '',
  exam: {
    lesson: 'c10-3-4',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 72, section 10.5, The Solid State of Matter',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/10-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Ionic, Metallic, Network or Molecular? Four Mystery Solids',
  thumbnailTitle: 'Four Mystery Solids',
  thumbnail: 'mt',
  summary:
    'A real test question, solved one small step at a time: from their hardness, conductivity and melting points, we decide whether four solids are ionic, metallic, covalent network or molecular. We hammer a metal, melt a salt until it conducts, and warm all four kinds side by side to see why their melting points are so different.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Four Mystery Solids', subtitle: 'Bonding and properties, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about four mystery solids. From clues about how they behave, we work out how their particles are held together. We will take it one small step at a time.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: QUESTION,
          answer: 'A metallic, B ionic, C covalent network, D molecular.',
          working: 'Conducts as a solid: metallic. Conducts only when molten: ionic. Very hard, very high melting point, no conduction: network. Soft, low melting point: molecular.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Identify the following substances as ionic, metallic, covalent network, or molecular solids. Substance A is malleable, ductile, conducts electricity well, and has a melting point of 1,135 degrees Celsius.' },
        { say: 'Substance B is brittle, does not conduct electricity as a solid but does when molten, and has a melting point of 2,072 degrees. Substance C is very hard, does not conduct electricity, and has a melting point of 3,440 degrees. Substance D is soft, does not conduct electricity, and has a melting point of 185 degrees.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Four solids, four kinds of bonding: **match them up**' }],
      lines: [
        { say: 'There are four substances and four kinds of solid, so each kind is used once.', show: 'plain' },
        { say: 'The clues are the properties: whether each one conducts, how hard it is, and how hot it must get to melt. Each property comes from how the particles are held together.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Solid', 'Particles and bonds', 'Melting point', 'Conducts?'],
          rows: [
            ['**Metallic**', 'Metal ions in a sea of moving electrons', 'Usually high', 'Yes, solid or molten'],
            ['**Ionic**', 'Ions held by strong attractions', 'High', 'Only molten or dissolved'],
            ['**Covalent network**', 'Atoms joined by covalent bonds everywhere', 'Very high', 'No (except graphite)'],
            ['**Molecular**', 'Molecules held by weak forces', 'Low', 'No'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. In a metal, positive ions sit in a sea of electrons that are free to move. Those moving electrons carry a current, even in the solid.', show: ['tab', 'tab.0'] },
        { say: 'In an ionic solid, positive and negative ions are locked in place by strong attractions. They can only carry a current once they are free to move, when molten or dissolved.', show: 'tab.1' },
        { say: 'In a covalent network, like diamond, every atom is joined to its neighbours by covalent bonds, so it is very hard and melts only at very high temperatures.', show: 'tab.2' },
        { say: 'And in a molecular solid, small molecules are held to one another only by weak forces, so it is soft and melts easily.', show: 'tab.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Use **conductivity** first: it separates metallic and ionic', 'Then use **hardness** and **melting point** for the other two', 'Check the melting points are in a sensible **order**'] }],
      lines: [
        { say: 'Here is the plan. First, use conductivity: it picks out the metallic and ionic solids straight away.', show: 'plan.0' },
        { say: 'Second, use hardness and melting point to tell the other two apart.', show: 'plan.1' },
        { say: 'Third, check that the melting points come in a sensible order.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Substance A',
      layout: 'center',
      main: [hammeredCopper('hc', 360), { kind: 'text', id: 't', size: 'md', md: 'Malleable, conducts as a solid: **A is metallic**' }],
      lines: [
        { say: 'Step one. Substance A conducts electricity well as a solid. Only metals do that, among these four, thanks to their moving electrons.', show: ['hc', 'hc.labels'] },
        { say: 'It is also malleable and ductile, so it can be hammered flat and drawn into wire. Watch a metal being hit: its rows of atoms slide over one another, but the sea of electrons keeps them held together.', play: 'hc.hit', playDelay: 0.3 },
        { say: 'So A is a metallic solid.', show: 't' },
      ],
    },
    {
      chapter: 'Step 2: Substance B',
      layout: 'center',
      main: [moltenSalt('ms', { height: 380 }), { kind: 'text', id: 't', size: 'md', md: 'Conducts **only when molten**: **B is ionic**' }],
      lines: [
        { say: 'Step two. Substance B does not conduct as a solid, but it does when molten. Here is a molten salt between two electrodes.', show: ['ms', 'ms.labels'] },
        { say: 'In the liquid, the ions are free to move, so the positive ions drift to one electrode and the negative ions to the other, carrying the current.', play: 'ms.run', playDelay: 0.3 },
        { say: 'In the solid, those ions are locked in place, so it cannot conduct. And because a push shifts layers of ions until like charges meet and repel, it is brittle. So B is ionic.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: Substances C and D',
      layout: 'center',
      main: [four],
      lines: [
        { say: 'Step three. C and D both do not conduct. But C is very hard and melts at 3,440 degrees, while D is soft and melts at only 185.', show: ['mt', 'mt.labels', 'mt.thermo'] },
        { say: 'Here are all four kinds of solid, warmed together. Watch which ones give way first.', play: 'mt.warm', playDelay: 0.3 },
        { say: 'The molecular solid melts and then boils away almost at once, because only weak forces hold its molecules together. The metal and the ionic solid follow. The network solid does not melt at all, because every atom is held by strong covalent bonds.' },
        { say: 'So C, very hard and with the highest melting point, is the covalent network, and D, soft and low melting, is molecular.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Substance', 'Key clue', 'Melting point', 'Type'],
          rows: [
            ['D', 'soft, no conduction', '185 °C', '**molecular**'],
            ['A', 'conducts as a solid', '1135 °C', '**metallic**'],
            ['B', 'conducts only when molten', '2072 °C', '**ionic**'],
            ['C', 'very hard, no conduction', '3440 °C', '**covalent network**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is our answer: A metallic, B ionic, C covalent network, and D molecular.', show: 'ans' },
        { say: 'And the check: put them in order of melting point, and they line up just as the simulation did, from weak forces between molecules to strong bonds everywhere. Each type was used once.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Tempting answer', 'Why it is wrong'],
          rows: [
            ['B is metallic: it conducts', 'Only when **molten**: that means ions'],
            ['C is ionic: high melting point', 'Ionic solids conduct when molten; **very hard** points to a network'],
            ['A is ionic: high melting point', 'Ionic solids do **not** conduct as solids'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Calling B metallic because it conducts. Read the whole clue: only when molten. That is the signature of ions.' },
        { say: 'Calling C ionic because it melts at a high temperature. Its very hardness, and the fact that it never conducts, point to a covalent network.' },
        { say: 'And calling A ionic for the same reason. An ionic solid cannot conduct, and A does.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A white solid melts at 801 °C. It does not conduct as a solid, but its solution in water does. What type of solid is it?',
          choices: ['Metallic', 'Molecular', 'Ionic', 'Covalent network'],
          answer: 2,
          working: 'Conducting only when its particles are free to move (dissolved or molten) is the sign of ions.',
        },
      ],
      lines: [
        { say: 'Your turn. A white solid melts at 801 degrees. It does not conduct as a solid, but its solution in water does. What type of solid is it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'It is ionic, choice C. It conducts only once its ions are free to move. In fact, it is table salt.', show: 'q2.answer' },
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
          items: ['Conducts as a solid: **metallic**', 'Conducts only molten or dissolved: **ionic**', 'Very hard, very high melting point: **covalent network**', 'Soft, low melting point: **molecular**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A solid that conducts is metallic.', show: 'sum.0' },
        { say: 'One that conducts only when molten or dissolved is ionic.', show: 'sum.1' },
        { say: 'A very hard solid with a very high melting point is a covalent network.', show: 'sum.2' },
        { say: 'And a soft solid with a low melting point is molecular. For more on bonding and properties, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
