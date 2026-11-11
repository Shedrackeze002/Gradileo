import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-5-3',
  lessonId: 'cx-5-3',
  title: 'Forms of Carbon and Nanoparticles',
  thumbnail: false,
  summary:
    'Diamond, graphite, graphene and the fullerenes are all carbon. Diamond’s four bonds per atom make it hard and non-conducting; graphite’s layers and delocalised electrons make it soft and conducting; graphene is one layer, and nanotubes are strong, light cylinders. Nanoparticles, 1 to 100 nm across, have a huge surface area to volume ratio.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms, Structures and the Periodic Table', title: 'Forms of Carbon and Nanoparticles', subtitle: 'Same atoms, different structures' }],
      lines: [
        { say: 'A diamond can cut glass, and pencil lead is soft enough to leave a trail on paper. Both are pure carbon. The difference is in how the atoms are joined.', show: 'title' },
        { say: 'In this lesson, you will explain the properties of the forms of carbon, and meet nanoparticles.' },
      ],
    },
    {
      chapter: 'Diamond and graphite',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Giant covalent structure', md: 'A huge network of atoms joined by strong covalent bonds, with a very high melting point.' },
        { kind: 'table', id: 't', head: ['', 'Diamond', 'Graphite'], rows: [['Bonds per carbon', '4', '3'], ['Structure', 'Rigid network', 'Layers of hexagons'], ['Hardness', 'Very hard', 'Soft and slippery'], ['Conducts?', 'No', 'Yes: delocalised electrons']] },
      ],
      lines: [
        { say: 'Diamond and graphite are both giant covalent structures, so both have very high melting points.', show: 'def' },
        { say: 'In diamond, each carbon atom forms four covalent bonds, in a rigid network. That makes it very hard.', show: 't.0', focus: 't.0' },
        { say: 'In graphite, each carbon atom forms three bonds, in layers of hexagons. The layers are held by weak forces, so they slide, which makes graphite soft.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'The fourth outer electron of each atom is delocalised. It can move along the layers, so graphite conducts electricity, and diamond does not.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Graphene and fullerenes',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Graphene: one layer of graphite, one atom thick', 'Fullerenes: hollow molecules, such as C₆₀', 'Nanotubes: cylinders, very strong and light'] }],
      lines: [
        { say: 'Graphene is a single layer of graphite, one atom thick. It is very strong, light, and an excellent conductor.', show: 'b.0' },
        { say: 'Fullerenes are hollow molecules of carbon. The first discovered was buckminsterfullerene, C sixty, a hollow sphere.', caption: 'Fullerenes are hollow molecules of carbon. The first discovered was buckminsterfullerene, C₆₀, a hollow sphere.', show: 'b.1' },
        { say: 'Carbon nanotubes are cylindrical fullerenes. They are very strong when pulled, and very light, so they reinforce materials such as tennis rackets.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Nanoparticles',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Nanoparticle', md: 'A particle **1 to 100 nm** across. One nanometre is $1 \\times 10^{-9}$ m.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{surface area} = 6 \\times 2^2 = 24\\ \\text{nm}^2', '\\text{volume} = 2^3 = 8\\ \\text{nm}^3', '\\text{ratio} = 24 \\div 8 = 3'] },
      ],
      lines: [
        { say: 'A nanoparticle is between one and one hundred nanometres across, and a nanometre is one billionth of a metre.', caption: 'A nanoparticle is between 1 and 100 nm across, and a nanometre is one billionth of a metre.', show: 'def' },
        { say: 'Take a cube with sides of two nanometres. Its surface area is six times two squared, which is twenty-four square nanometres.', caption: 'Take a cube with sides of 2 nm. Its surface area is 6 × 2² = 24 nm².', show: 'm.0', focus: 'm.0' },
        { say: 'Its volume is two cubed, which is eight, so its surface area to volume ratio is three.', caption: 'Its volume is 2³ = 8 nm³, so its surface area to volume ratio is 3.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'The smaller the particle, the larger this ratio. So nanoparticles make excellent catalysts, but their effects on health are still being studied.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why does graphite conduct electricity?',
          choices: ['Each carbon has one delocalised electron that can move', 'Each carbon forms four covalent bonds', 'Its layers are held by strong bonds', 'Its carbon atoms are ions that can move'],
          answer: 0,
          working: 'Each atom uses three outer electrons in bonds; the fourth is **delocalised** and carries charge.',
        },
      ],
      lines: [
        { say: 'Your turn. Why does graphite conduct electricity? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Each carbon atom bonds with three others, and its fourth outer electron is delocalised, free to move along the layers. Choice B describes diamond.', show: 'q.answer' },
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
          items: ['Diamond: four bonds per atom, hard, does not conduct.', 'Graphite: layers, soft, conducts with delocalised electrons.', 'Graphene is one layer; nanotubes are strong and light.', 'Nanoparticles: 1 to 100 nm, a huge surface area for their volume.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In diamond each atom forms four bonds, so it is hard and does not conduct.', show: 'sum.0' },
        { say: 'Graphite has layers that slide, and delocalised electrons that let it conduct.', show: 'sum.1' },
        { say: 'Graphene is a single layer, and nanotubes are strong and light.', show: 'sum.2' },
        { say: 'And nanoparticles, one to one hundred nanometres across, have a huge surface area for their volume.', caption: 'And nanoparticles, 1 to 100 nm across, have a huge surface area for their volume.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
