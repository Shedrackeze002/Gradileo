import type { Explainer, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts). A sieve or filter holds back
// particles bigger than its holes and lets smaller ones through; a magnet pulls only the iron.

const SAND = { heavy: 2, tone: 'opp', name: 'sand' } as const;

/** Gravel and sand on a sieve, shaken through. */
const sieve: ParticlesEl = {
  kind: 'particles',
  id: 'sv',
  boxes: [{ id: 'a', state: 'liquid', width: 12, height: 12, temp: 0.2, filter: { at: 0.5, holes: 1.2 }, cross: 0.3, kinds: [{ n: 8, size: 1.8, bond: 0.3, heavy: 2, tone: 'brand', name: 'gravel' }, { n: 30, size: 0.8, bond: 0.3, ...SAND }], label: 'gravel and sand on a sieve' }],
  clips: { go: { phases: [{ dur: 1, release: ['a'] }, { dur: 8 }] } },
  height: 380,
};

/** Iron filings and sand, with a magnet held over them. */
const magnet: ParticlesEl = {
  kind: 'particles',
  id: 'mg',
  boxes: [{ id: 'a', state: 'liquid', width: 12, height: 9, temp: 0.15, cross: 0.3, kinds: [{ n: 10, bond: 0.4, heavy: 2, magnetic: true, tone: 'hyp', name: 'iron' }, { n: 26, bond: 0.4, ...SAND }], label: 'iron filings and sand' }],
  clips: { go: { phases: [{ dur: 2, magnet: { a: 1 } }, { dur: 7 }] } },
  height: 330,
};

/** Sand in water on filter paper, then let through. */
const filter: ParticlesEl = {
  kind: 'particles',
  id: 'f',
  boxes: [{ id: 'a', state: 'liquid', width: 12, height: 12, temp: 0.5, filter: { at: 0.5, holes: 1.3 }, cross: 0.3, kinds: [{ n: 10, size: 1.6, heavy: 3, tone: 'opp', name: 'sand' }, { n: 30, size: 0.8, heavy: 2, tone: 'adj', name: 'water' }], label: 'sand and water on filter paper' }],
  clips: { pour: { phases: [{ dur: 1, release: ['a'] }, { dur: 9 }] } },
  height: 460,
};

/** Salt water on filter paper: the salt goes straight through with the water. */
const salty: ParticlesEl = {
  kind: 'particles',
  id: 's',
  boxes: [{ id: 'a', state: 'liquid', width: 12, height: 12, temp: 0.5, filter: { at: 0.5, holes: 1.3 }, cross: 1.8, kinds: [{ n: 8, size: 0.8, bond: 1.2, heavy: 2, tone: 'theta', name: 'salt' }, { n: 32, size: 0.8, heavy: 2, tone: 'adj', name: 'water' }], label: 'salt water on filter paper' }],
  clips: { pour: { phases: [{ dur: 1, release: ['a'] }, { dur: 9 }] } },
  height: 460,
};

const video: Explainer = {
  id: 'c7-4-1',
  lessonId: 'c7-4-1',
  title: 'Sieving, Magnets and Filtering',
  thumbnail: 'f',
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
      chapter: 'Sieving',
      layout: 'center',
      main: [sieve],
      lines: [
        { say: 'Sieving uses the size of the pieces. Here are large purple pieces of gravel mixed with small orange grains of sand, sitting on a sieve.', show: ['sv', 'sv.labels'] },
        { say: 'Let’s shake it. The small grains of sand fall through the holes, and the large pieces of gravel are caught, so a sieve separates gravel from sand.', play: 'sv.go', focus: 'sv.a' },
        { say: 'And large pieces that are easy to tell apart, like red and green marbles, can simply be picked out by hand.' },
      ],
    },
    {
      chapter: 'Magnets',
      layout: 'center',
      main: [magnet, { kind: 'callout', id: 'mag', tone: 'key', title: 'Only a few metals are magnetic', md: 'Iron, steel, nickel and cobalt. **Not** copper, aluminium or gold.' }],
      lines: [
        { say: 'A magnet uses whether a substance is magnetic. Here are iron filings, in pink, mixed with sand.', show: ['mg', 'mg.labels'] },
        { say: 'Hold a magnet over them. The iron is pulled up out of the sand, and the sand is left behind.', play: 'mg.go', focus: 'mg.a' },
        { say: 'Only a few metals are magnetic: iron, steel, nickel and cobalt. Copper, aluminium and gold are not, so a magnet cannot separate copper from sand.', show: 'mag' },
      ],
    },
    {
      chapter: 'Filtration',
      layout: 'split',
      leftWidth: 560,
      left: [filter],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Filtration', md: 'Separates an **insoluble** solid from a liquid, by pouring the mixture through filter paper in a funnel.' },
        { kind: 'bullets', id: 'words', items: ['**Filtrate**: the liquid that passes through.', '**Residue**: the solid left on the paper.', '**Decanting**: pouring off the clear liquid first.'] },
      ],
      lines: [
        { say: 'Sand and water cannot be sieved apart, because both slip through the holes of a kitchen sieve. Filter paper has holes far too small to see. Here is sand in water, on a filter paper.', show: ['f', 'f.labels', 'def'] },
        { say: 'Let’s let it through. Water particles are tiny and pass through the paper. The liquid that comes through is called the filtrate.', play: 'f.pour', show: 'words.0' },
        { say: 'The much larger sand grains are caught. The solid left on the paper is called the residue.', show: 'words.1', focus: 'f.a' },
        { say: 'If the solid settles quickly, much of the clear liquid can be poured off first. This is decanting, and it makes filtering faster.', show: 'words.2' },
      ],
    },
    {
      chapter: 'What a filter cannot do',
      layout: 'split',
      leftWidth: 560,
      left: [salty],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A filter cannot catch dissolved solids', md: 'Salt water poured through filter paper comes out **just as salty**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['50\\ \\text{g} - 32\\ \\text{g} = 18\\ \\text{g salt}'] },
      ],
      lines: [
        { say: 'Now salt water, on the same filter paper. The yellow particles are salt, dissolved in the water.', show: ['s', 's.labels'] },
        { say: 'Watch. The dissolved salt particles are as small as water particles, so they pass straight through with the water. Salt water comes out just as salty. Filtration only removes solids that have not dissolved.', play: 's.pour', show: 'oops' },
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
