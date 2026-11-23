import type { AtomsEl, Explainer } from '@/video/script.ts';

// Exam question for Chemistry 9 lesson 2.1 (ionic and covalent bonding): sodium fluoride is ionic,
// hydrogen chloride is covalent, and why one melts at 993 °C while the other is a gas. Written by
// Gradileo in the style of a Grade 9 science unit test.
//
// The pictures are sodium giving its outer electron to fluorine, and hydrogen and chlorine sharing
// a pair, drawn the same way as the lesson's magnesium oxide and water (src/video/atoms.ts).

const QUESTION = 'Sodium fluoride, NaF, is a white solid that melts at 993 °C. Hydrogen chloride, HCl, is a gas at room temperature. (a) What type of bonding is in sodium fluoride? Describe what happens to the electrons when it forms. (b) What type of bonding is in hydrogen chloride? Describe what happens to the electrons. (c) Suggest why sodium fluoride has a much higher melting point than hydrogen chloride.';

/** Sodium gives its one outer electron to fluorine, and the two ions pull together. */
const ionic: AtomsEl = {
  kind: 'atoms',
  id: 'nf',
  span: [13, 6.4],
  atoms: [
    { id: 'na', symbol: 'Na', protons: 11, at: [3, 3.2], tone: 'brand', name: 'sodium' },
    { id: 'f', symbol: 'F', protons: 9, at: [10, 3.2], tone: 'good', name: 'fluorine' },
  ],
  clips: {
    give: { phases: [{ dur: 2.6, give: [{ from: 'na', to: 'f', n: 1 }] }, { dur: 0.6 }, { dur: 1.6, move: { na: [4.1, 3.2], f: [9, 3.2] } }] },
  },
  poster: 'give',
  height: 420,
};

/** Hydrogen chloride: the two atoms share one pair of electrons. */
const covalent: AtomsEl = {
  kind: 'atoms',
  id: 'hc',
  span: [10, 6.4],
  atoms: [
    { id: 'h', symbol: 'H', protons: 1, at: [1.4, 3.2], tone: 'adj', name: 'hydrogen' },
    { id: 'cl', symbol: 'Cl', protons: 17, at: [7.4, 3.2], tone: 'good', name: 'chlorine' },
  ],
  clips: {
    share: { phases: [{ dur: 1.8, move: { h: [3.6, 3.2], cl: [6.4, 3.2] } }, { dur: 1.8, share: [{ a: 'h', b: 'cl', n: 1 }] }] },
  },
  poster: 'share',
  height: 420,
};

const video: Explainer = {
  id: 'xq-c9-2-1',
  lessonId: '',
  exam: {
    lesson: 'c9-2-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Sodium Fluoride and Hydrogen Chloride. Ionic and Covalent Bonding',
  thumbnailTitle: 'Ionic or Covalent?',
  thumbnail: 'nf',
  summary:
    'A test-style question, solved one small step at a time: what bonding is in sodium fluoride and in hydrogen chloride, and why does one melt at 993 °C while the other is a gas? Sodium gives an electron to fluorine to make ions, which is ionic bonding, while hydrogen and chlorine share a pair, which is covalent. The ions sit in a giant lattice held by strong forces, while HCl molecules are held to each other only weakly.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Ionic or Covalent?', subtitle: 'Giving electrons and sharing them' }],
      lines: [
        { say: 'In this video, we solve a test-style question about ionic and covalent bonding. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Ionic, transferred; covalent, shared; lattice of strong forces' }],
      lines: [
        { say: 'Here is the question. Sodium fluoride, N a F, is a white solid that melts at nine hundred and ninety three degrees Celsius. Hydrogen chloride, H C l, is a gas at room temperature. Part a: what type of bonding is in sodium fluoride? Describe what happens to the electrons when it forms. Part b: what type of bonding is in hydrogen chloride? Describe what happens to the electrons. Part c: suggest why sodium fluoride has a much higher melting point than hydrogen chloride.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Is each compound made of a **metal and a non-metal**, or **non-metals only**?' }],
      lines: [
        { say: 'The type of bonding depends on the elements. A metal with a non-metal bonds one way, and non-metals together bond another way.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [ionic],
      lines: [
        { say: 'Here is what we need. On the left is a sodium atom, a metal, two, eight, one. On the right is a fluorine atom, a non-metal, two, seven.', show: ['nf', 'nf.labels', 'nf.arrangement'] },
        { say: 'Watch. Sodium gives its one outer electron to fluorine. Both now have full outer shells. Sodium becomes N a plus, fluorine becomes F minus, and the opposite charges pull together.', play: 'nf.give', show: 'nf.charges' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Metal + non-metal: **ionic**, electrons **transferred**', 'Non-metals only: **covalent**, electrons **shared**', 'Lattice: **high** melting point. Small molecules: **low**'] }],
      lines: [
        { say: 'Here is the plan. A metal and a non-metal bond ionically: electrons are transferred.', show: 'plan.0' },
        { say: 'Non-metals bond covalently: they share pairs of electrons.', show: 'plan.1' },
        { say: 'And a giant lattice of ions has a high melting point, while small molecules melt and boil easily.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Sodium fluoride',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{Na } (2,8,1) \\xrightarrow{\\text{gives } 1e^-} \\text{F } (2,7)', '\\good{\\text{Na}^+ \\text{ and F}^- \\text{: ionic}}'] }],
      lines: [
        { say: 'Step one. Sodium is a metal and fluorine is a non-metal, so sodium fluoride is ionic. Sodium transfers its one outer electron to fluorine.', show: 'm.0' },
        { say: 'That makes a sodium ion, N a plus, and a fluoride ion, F minus, which attract each other strongly. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Hydrogen chloride',
      layout: 'center',
      main: [covalent],
      lines: [
        { say: 'Step two. Hydrogen and chlorine are both non-metals, so the bonding is covalent. Here they are: hydrogen has one electron, and chlorine is two, eight, seven.', show: ['hc', 'hc.labels'] },
        { say: 'Watch them share. Each atom puts one electron into a shared pair. Now hydrogen has two electrons, a full first shell, and chlorine has eight outer electrons. That shared pair is one covalent bond. That is part b.', play: 'hc.share', show: 'hc.arrangement' },
      ],
    },
    {
      chapter: 'Step 3: Melting points',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Compound', 'Structure', 'Forces', 'Melts'],
          rows: [
            ['sodium fluoride', 'giant **lattice** of ions', '**strong**, everywhere', '**high**, 993 °C'],
            ['hydrogen chloride', 'small **molecules**', '**weak**, between them', '**low**: a gas'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. Sodium fluoride is a giant lattice of ions, held by strong forces in every direction. Melting it means breaking a huge number of these, which takes a lot of energy.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Hydrogen chloride is made of small molecules. The bond inside each molecule is strong, but the forces between molecules are weak, and those are all that melting and boiling must overcome. So it is a gas. That is part c.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Ionic**: sodium **transfers** an electron to fluorine, making Na⁺ and F⁻. (b) **Covalent**: H and Cl **share** a pair of electrons. (c) NaF is a **lattice** with **strong** forces; HCl molecules have only **weak** forces between them.' },
      ],
      lines: [
        { say: 'Does it make sense? A solid that needs nearly a thousand degrees to melt must be held by strong forces everywhere, which is just what an ionic lattice has.', show: 'ans' },
        { say: 'So sodium fluoride is ionic, hydrogen chloride is covalent, and the lattice explains the high melting point.' },
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
            ['Fluorine gives an electron to **sodium**', 'The **metal** gives; the non-metal takes'],
            ['HCl is ionic, as it has a **Cl**', 'H and Cl are both **non-metals**'],
            ['HCl\'s covalent bond is **weak**', 'Forces **between** molecules are weak'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The metal always gives electrons away and the non-metal takes them, so sodium gives and fluorine takes.', focus: 'traps.0' },
        { say: 'Chlorine can form ions with a metal, but hydrogen is a non-metal, so in H C l they share.', focus: 'traps.1' },
        { say: 'And the covalent bond inside the molecule is strong. Melting and boiling only separate the molecules, and the forces between them are weak.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these substances has covalent bonding?',
          choices: ['Methane, CH₄', 'Magnesium oxide, MgO', 'Potassium chloride, KCl', 'Calcium fluoride, CaF₂'],
          answer: 0,
          working: 'Carbon and hydrogen are both non-metals, so methane is covalent. The others each join a metal to a non-metal.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these substances has covalent bonding? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Carbon and hydrogen are both non-metals, so methane is covalent: choice A. The others each join a metal to a non-metal, so they are ionic.', show: 'q2.answer' },
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
          items: ['Metal + non-metal: **ionic**, electrons **transferred**', 'Non-metals: **covalent**, electrons **shared**', 'Ionic lattices melt **high**; small molecules melt **low**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A metal and a non-metal bond ionically, by transferring electrons.', show: 'sum.0' },
        { say: 'Non-metals bond covalently, by sharing pairs of electrons.', show: 'sum.1' },
        { say: 'And ionic lattices have high melting points, while small covalent molecules melt and boil easily. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
