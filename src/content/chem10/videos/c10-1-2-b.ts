import type { Explainer } from '@/video/script.ts';
import { particles } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { room, tag } from './lib/c10-1-figures.ts';

// Air: nitrogen and oxygen molecules and an argon atom, mixed but not joined.
const air = figure(
  'air',
  [
    particles({
      state: 'gas',
      size: 6,
      seed: 8,
      kinds: [
        { id: 'n2', tone: 'adj', count: 8, atoms: 2 },
        { id: 'o2', tone: 'bad', count: 2, atoms: 2 },
        { id: 'ar', tone: 'theta', count: 1 },
      ],
    }),
    tag('n2-l', [6.3, 4.8], '\\text{nitrogen, }\\ce{N2}', { place: 'right', tone: 'adj', group: 'n2' }),
    tag('o2-l', [6.3, 3.0], '\\text{oxygen, }\\ce{O2}', { place: 'right', tone: 'bad', group: 'o2' }),
    tag('ar-l', [6.3, 1.2], '\\text{argon, }\\ce{Ar}', { place: 'right', tone: 'theta', group: 'ar' }),
    room('room', [0, 0], [10.6, 0]),
  ],
  420,
);

const video: Explainer = {
  id: 'c10-1-2-b',
  lessonId: 'c10-1-2',
  title: 'Pure Substances and Mixtures, Part 2: Mixtures',
  thumbnailTitle: 'Mixtures',
  thumbnail: 'air',
  summary:
    'A mixture contains substances that are not chemically joined: each keeps its own properties, they can be in any proportions, and physical methods separate them. Air is a mixture of gases. Iron and sulfur stirred together make a mixture; heated, they make the compound iron sulfide.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 2', title: 'Mixtures', subtitle: 'Substances that are not joined' }],
      lines: [
        { say: 'Stir iron filings into sulfur powder, and you get a grey-yellow powder. Heat them together, and they glow and turn into a black solid. One is a mixture, and the other is a compound.', show: 'title' },
        { say: 'In this part, you will see what makes a mixture, and how a mixture differs from a compound.' },
      ],
    },
    {
      chapter: 'What a mixture is',
      layout: 'split',
      leftWidth: 600,
      left: [air],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mixture', md: 'Two or more substances **not chemically joined**. Each keeps its own properties, they can be in **any proportions**, and **physical methods** can separate them.' },
        { kind: 'text', id: 'dry', size: 'md', md: 'Dry air by volume: about $78\\%$ nitrogen, $21\\%$ oxygen, $1\\%$ argon and other gases.' },
      ],
      lines: [
        { say: 'A mixture contains two or more substances that are not chemically joined.', show: 'def' },
        { say: 'Each substance keeps its own properties, the substances can be present in any proportions, and physical methods can separate them, such as filtering, evaporating, or using a magnet.' },
        { say: 'Air is a mixture of gases. Nitrogen molecules, oxygen molecules and argon atoms move about among each other, but they are not joined to each other.', show: ['air.box', 'air.n2', 'air.o2', 'air.ar'] },
        { say: 'The composition of air varies a little from place to place, but dry air is about seventy-eight percent nitrogen, twenty-one percent oxygen, and one percent argon and other gases, by volume.', show: 'dry' },
      ],
    },
    {
      chapter: 'Iron and sulfur',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Mixture of iron and sulfur', 'Compound, iron sulfide'],
          rows: [
            ['Chemically joined?', 'no', 'yes'],
            ['Proportions', 'any', 'fixed: one $\\ce{Fe}$ for each $\\ce{S}$'],
            ['Properties', 'those of iron and sulfur', 'new properties of its own'],
            ['Separated by', 'a magnet', 'only a chemical reaction'],
          ],
        },
      ],
      lines: [
        { say: 'Iron and sulfur show the difference. Stirred together, they make a grey-yellow mixture. The iron is still magnetic, and a magnet pulls it out.', show: 't' },
        { say: 'Heated together, they react to form a black solid, iron sulfide, F e S. This is a compound. A magnet does not attract it, and no physical method can separate it.', caption: 'Heated together, they react to form a black solid, iron sulfide, FeS. This is a compound. A magnet does not attract it, and no physical method can separate it.' },
        { say: 'In the mixture, the elements are not joined, and they can be in any proportions. In the compound, they are joined in a fixed ratio: one iron atom for each sulfur atom.', focus: ['t.0', 't.1'] },
        { say: 'The mixture has the properties of iron and sulfur, and a magnet separates it. The compound has new properties, and only a chemical reaction can break it down.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Grey iron filings and yellow sulfur powder are stirred together. A magnet held over the powder pulls out the iron filings. What is the grey-yellow powder?',
          choices: [
            'A compound: the iron and the sulfur have joined together.',
            'A mixture: the iron and sulfur keep their own properties and can be separated physically.',
            'An element: it contains only one kind of atom.',
            'A pure substance: it looks the same all the way through.',
          ],
          answer: 1,
          working: 'The iron is still magnetic, so it has kept its own properties, and a magnet separates it without any chemical reaction. So the powder is a mixture.',
        },
      ],
      lines: [
        { say: 'Your turn. Grey iron filings and yellow sulfur powder are stirred together. A magnet held over the powder pulls out the iron filings. What is the grey-yellow powder? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, a mixture. The iron is still magnetic, so it has kept its own properties, and a magnet separates it without any chemical reaction. Choice A would need heating: the compound, iron sulfide, is not magnetic.', show: 'q.answer' },
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
            'A **mixture**: substances not chemically joined, in any proportions, separated by physical methods.',
            'Each substance in a mixture keeps its own properties; a compound has new properties.',
            'Iron and sulfur stirred together: a mixture. Heated together: the compound iron sulfide.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A mixture contains substances that are not chemically joined. They keep their own properties, can be in any proportions, and can be separated by physical methods.', show: 'sum.0' },
        { say: 'Each substance in a mixture keeps its own properties, while a compound has new properties of its own.', show: 'sum.1' },
        { say: 'Iron and sulfur stirred together make a mixture. Heated together, they make a compound, iron sulfide. In part three, you will sort mixtures into two kinds. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
