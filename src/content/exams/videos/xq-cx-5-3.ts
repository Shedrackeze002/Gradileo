import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import carbon from '@/content/chemmore/videos/cx-5-3.ts';

// Exam question for More Chemistry Topics lesson 5.3 (forms of carbon and nanoparticles): why
// diamond is hard, why graphite conducts, and the surface area to volume ratio of a 10 nm cube.
// Written by Gradileo in the style of a GCSE chemistry exam.
//
// The picture is the lesson's carbon atoms joining into a sheet of graphene
// (src/video/molecules.ts).

const QUESTION = 'Diamond and graphite are both made of carbon atoms. (a) Explain why diamond is very hard. (b) Explain why graphite conducts electricity. (c) A nanoparticle is a cube with sides of 10 nm. Calculate its surface area to volume ratio.';

const video: Explainer = {
  id: 'xq-cx-5-3',
  lessonId: '',
  exam: {
    lesson: 'cx-5-3',
    source: 'Exam-style question written by Gradileo, in the style of a GCSE chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Diamond, Graphite and a 10 nm Cube. Forms of Carbon and Nanoparticles',
  thumbnailTitle: 'Same Atoms, Different Jobs',
  thumbnail: 'gr',
  summary:
    'A test-style question, solved one small step at a time: why is diamond hard, why does graphite conduct, and what is the surface area to volume ratio of a 10 nm cube? Each carbon in diamond makes four strong covalent bonds in a giant structure, each carbon in graphite has one delocalised electron free to move, and the cube\'s ratio is 600 ÷ 1000 = 0.6 per nm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Same Atoms, Different Jobs', subtitle: 'Diamond, graphite and nanoparticles' }],
      lines: [
        { say: 'In this video, we solve a test-style question about forms of carbon and nanoparticles. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a GCSE chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Four strong covalent bonds each; delocalised electrons; 0.6 per nm' }],
      lines: [
        { say: 'Here is the question. Diamond and graphite are both made of carbon atoms. Part a: explain why diamond is very hard. Part b: explain why graphite conducts electricity. Part c: a nanoparticle is a cube with sides of 10 nanometres. Calculate its surface area to volume ratio.', caption: 'Here is the question. Diamond and graphite are both made of carbon atoms. Part a: explain why diamond is very hard. Part b: explain why graphite conducts electricity. Part c: a nanoparticle is a cube with sides of 10 nm. Calculate its surface area to volume ratio.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Explain each property from the **bonds**, then work out a **ratio** for a tiny cube' }],
      lines: [
        { say: 'The same carbon atoms behave very differently depending on how they are bonded. We explain each property from the bonds, then do one calculation.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(carbon, 'gr')],
      lines: [
        { say: 'Here is what we need. These are carbon atoms coming together as graphene, a single layer of graphite.', show: 'gr' },
        { say: 'Each carbon bonds to three others, in a flat sheet of hexagons just one atom thick. The fourth outer electron of each carbon is free to move, which is why it conducts.', play: 'gr.join' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Diamond: **4** covalent bonds per carbon', 'Graphite: **3** bonds, one **delocalised** electron', 'SA : V = surface area **÷** volume'] }],
      lines: [
        { say: 'Here is the plan. In diamond, each carbon makes four covalent bonds.', show: 'plan.0' },
        { say: 'In graphite, each carbon makes three, leaving one electron free to move.', show: 'plan.1' },
        { say: 'And the surface area to volume ratio is the surface area divided by the volume.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Diamond',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Each carbon forms **four** covalent bonds', 'A **giant** structure with no weak points', 'Breaking it means breaking **many strong bonds**'] }],
      lines: [
        { say: 'Step one. In diamond, each carbon atom forms four covalent bonds to other carbons.', show: 's.0' },
        { say: 'This makes a giant structure that runs through the whole crystal.', show: 's.1' },
        { say: 'To scratch or break it, many strong covalent bonds must be broken, so diamond is very hard. That is part a.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 2: Graphite',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'g', items: ['Each carbon bonds to **three** others, in layers', 'One outer electron per carbon is **delocalised**', 'These electrons **move** through the layers, carrying charge'] }],
      lines: [
        { say: 'Step two. In graphite, each carbon bonds to only three others, in flat layers.', show: 'g.0' },
        { say: 'That leaves one outer electron on each carbon that is not in a bond. It is delocalised.', show: 'g.1' },
        { say: 'Just as we saw in graphene, these electrons are free to move, so they carry charge through the layers. That is part b.', show: 'g.2', focus: 'g.2' },
      ],
    },
    {
      chapter: 'Step 3: The nanoparticle',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{surface area} = 6 \\times 10 \\times 10 = 600\\ \\text{nm}^2', '\\text{volume} = 10 \\times 10 \\times 10 = 1000\\ \\text{nm}^3', '600 \\div 1000 = \\good{0.6\\ \\text{nm}^{-1}}'] }],
      lines: [
        { say: 'Step three. A cube has six square faces, each 10 by 10 nanometres, so its surface area is 600 square nanometres.', caption: 'Step three. A cube has six square faces, each 10 nm × 10 nm, so its surface area is 600 nm².', show: 'm.0' },
        { say: 'Its volume is 10 times 10 times 10, which is 1,000 cubic nanometres.', caption: 'Its volume is 10 × 10 × 10 = 1000 nm³.', show: 'm.1' },
        { say: '600 divided by 1,000 is 0.6, so the ratio is 0.6 per nanometre. That is part c.', caption: '600 ÷ 1000 = 0.6, so the ratio is 0.6 per nm, or 0.6 : 1. That is part c.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Each carbon forms **four strong covalent bonds** in a giant structure. (b) Each carbon has one **delocalised electron**, free to move. (c) **0.6 nm⁻¹** (0.6 : 1).' },
      ],
      lines: [
        { say: 'Does it make sense? For any cube, the ratio is 6 divided by the side, and 6 divided by 10 is 0.6, so the answer checks.', show: 'ans' },
        { say: 'So diamond is hard because of its four strong bonds per atom, graphite conducts because of its delocalised electrons, and the cube\'s ratio is 0.6 per nanometre.' },
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
            ['Diamond has **strong forces** between molecules', 'Diamond has **no** molecules'],
            ['Graphite has **free ions**', 'It is **electrons** that move'],
            ['**0.1**', 'Used **one** face, not six'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Diamond is one giant structure, so what holds it together is covalent bonds, not forces between molecules.', focus: 'traps.0' },
        { say: 'Graphite has no ions. It conducts because its delocalised electrons can move.', focus: 'traps.1' },
        { say: 'And a cube has six faces, so the surface area is 600, not 100.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cube-shaped nanoparticle has sides of 20 nm. What is its surface area to volume ratio?',
          choices: ['3 nm⁻¹', '0.6 nm⁻¹', '0.3 nm⁻¹', '30 nm⁻¹'],
          answer: 2,
          working: 'Surface area = 6 × 400 = 2400 nm², volume = 8000 nm³, so 2400 ÷ 8000 = 0.3 nm⁻¹.',
        },
      ],
      lines: [
        { say: 'Your turn. A cube-shaped nanoparticle has sides of 20 nanometres. What is its surface area to volume ratio? Pause the video and try it.', caption: 'Your turn. A cube-shaped nanoparticle has sides of 20 nm. What is its surface area to volume ratio? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The surface area is 2,400 and the volume 8,000, so the ratio is 0.3 per nanometre: choice C. Doubling the side halves the ratio.', caption: 'The surface area is 2400 nm² and the volume 8000 nm³, so the ratio is 0.3 nm⁻¹: choice C. Doubling the side halves the ratio.', show: 'q2.answer' },
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
          items: ['Diamond: **four** strong bonds per carbon, so hard', 'Graphite: **delocalised** electrons, so it conducts', 'Smaller particles: **bigger** SA : V ratio'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Diamond is hard because each carbon makes four strong covalent bonds.', show: 'sum.0' },
        { say: 'Graphite conducts because each carbon has a delocalised electron.', show: 'sum.1' },
        { say: 'And the smaller a particle, the bigger its surface area to volume ratio. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
