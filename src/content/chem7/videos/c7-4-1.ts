import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-4-1',
  lessonId: 'c7-4-1',
  title: 'Sieving, Magnets and Filtering',
  thumbnail: 'fil',
  summary:
    'We separate a mixture using a property that is different for its parts. Sieving uses size, and a magnet pulls out iron, steel, nickel and cobalt. Filtration separates an insoluble solid from a liquid: the filtrate passes through the filter paper and the residue stays on it. Dissolved solids pass straight through, so filtration cannot separate a solution.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Separating Mixtures', title: 'Sieving, Magnets and Filtering', subtitle: 'Using size and magnetism to pull mixtures apart' }],
      lines: [
        { say: 'A recycling plant gets lorries full of mixed rubbish, and a gold prospector shakes a pan of river gravel. Both are separating mixtures.', show: 'title' },
        { say: 'The parts of a mixture are not chemically joined, so we can pull them apart, as long as we find a property that is different for each part.' },
      ],
    },
    {
      chapter: 'Sieving and magnets',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'meth',
          head: ['Method', 'Uses', 'Example'],
          rows: [
            ['sieving', 'the size of the pieces', 'gravel from sand'],
            ['a magnet', 'whether it is magnetic', 'iron filings from sand'],
            ['picking out by hand', 'large pieces, easy to tell apart', 'red and green marbles'],
          ],
        },
        { kind: 'callout', id: 'mag', tone: 'key', title: 'Only a few metals are magnetic', md: 'Iron, steel, nickel and cobalt. **Not** copper, aluminium or gold.' },
      ],
      lines: [
        { say: 'Sieving uses the size of the pieces. Small pieces fall through the holes, and large pieces are caught, so a sieve separates gravel from sand.', show: ['meth', 'meth.0'], focus: 'meth.0' },
        { say: 'A magnet uses whether a substance is magnetic. Pass a magnet over iron filings and sand, and the iron is pulled out.', show: 'meth.1', focus: 'meth.1' },
        { say: 'And large pieces that are easy to tell apart can simply be picked out by hand.', show: 'meth.2', focus: 'meth.2' },
        { say: 'Only a few metals are magnetic: iron, steel, nickel and cobalt. Copper, aluminium and gold are not, so a magnet cannot separate copper from sand.', show: 'mag' },
      ],
    },
    {
      chapter: 'Filtration',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Filtration', md: 'Separates an **insoluble** solid from a liquid, by pouring the mixture through filter paper in a funnel.' },
        { kind: 'bullets', id: 'words', items: ['**Filtrate**: the liquid that passes through.', '**Residue**: the solid left on the paper.', '**Decanting**: pouring off the clear liquid first.'] },
      ],
      lines: [
        { say: 'Sand and water cannot be sieved apart, because both slip through the holes of a kitchen sieve. Filter paper has holes far too small to see.', show: 'def' },
        { say: 'Water particles are tiny and pass through the paper. The liquid that comes through is called the filtrate.', show: 'words.0' },
        { say: 'The much larger sand grains are caught. The solid left on the paper is called the residue.', show: 'words.1' },
        { say: 'If the solid settles quickly, much of the clear liquid can be poured off first. This is decanting, and it makes filtering faster.', show: 'words.2' },
      ],
    },
    {
      chapter: 'What a filter cannot do',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A filter cannot catch dissolved solids', md: 'Salt water poured through filter paper comes out **just as salty**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['50\\ \\text{g mixture} - 32\\ \\text{g sand} = 18\\ \\text{g salt}'] },
      ],
      lines: [
        { say: 'Salt water poured through filter paper comes out just as salty. Dissolved particles are as small as water particles, so they pass straight through. Filtration only removes solids that have not dissolved.', show: 'oops' },
        { say: 'We can use this. Fifty grams of salt and sand is stirred into water and filtered. The salt dissolves and passes through, and the dried residue, the sand, has a mass of thirty-two grams.', show: 'm', focus: 'm' },
        { say: 'So the mixture held fifty minus thirty-two, which is eighteen grams of salt.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which mixture can be separated by filtration?',
          choices: ['Sugar dissolved in water', 'Chalk powder stirred into water', 'Salt dissolved in water', 'Iron filings mixed with sulfur'],
          answer: 1,
          working: 'Chalk is insoluble, so the filter paper catches it. Dissolved sugar and salt pass through, and iron and sulfur are both dry solids, best separated with a magnet.',
        },
      ],
      lines: [
        { say: 'Your turn. Which mixture can be separated by filtration? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Chalk does not dissolve, so the filter paper catches it. Dissolved sugar and salt pass straight through, and iron is best pulled out with a magnet.', show: 'q.answer' },
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
            'Separate using a property that is different for the parts.',
            '**Sieving** uses size; a **magnet** pulls out iron, steel, nickel and cobalt.',
            '**Filtration**: the **filtrate** passes through, the **residue** stays.',
            'Dissolved solids pass through filter paper.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. We separate a mixture using a property that is different for its parts.', show: 'sum.0' },
        { say: 'Sieving uses size, and a magnet pulls out iron, steel, nickel and cobalt.', show: 'sum.1' },
        { say: 'Filtration separates an insoluble solid from a liquid. The filtrate passes through, and the residue stays on the paper.', show: 'sum.2' },
        { say: 'But dissolved solids pass straight through. Next, you will use heat to separate solutions.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
