import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c8-1-3',
  lessonId: 'c8-1-3',
  title: 'Elements, Compounds and Mixtures',
  thumbnailTitle: 'Compounds and Mixtures',
  thumbnail: 'cmp',
  summary:
    'An element has one kind of atom, a compound has elements chemically joined, and a mixture has substances that are not joined. In a mixture each part keeps its properties, can be in any amount, and can be separated physically. A compound has new properties and fixed proportions, and only a chemical reaction can split it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms, Elements and Compounds', title: 'Elements, Compounds and Mixtures', subtitle: 'Joined or just mixed?' }],
      lines: [
        { say: 'Iron filings are grey and magnetic, and sulfur is a yellow powder. Stir them together, and you can still pull the iron out with a magnet.', show: 'title' },
        { say: 'Heat them, and they glow and turn into a black solid that no magnet can sort. The first is a mixture and the second is a compound. In this video, you will learn to tell them apart.' },
      ],
    },
    {
      chapter: 'Three kinds of matter',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'kinds',
          head: ['Kind', 'What it contains', 'Examples'],
          rows: [
            ['element', 'one kind of atom', 'oxygen, iron, gold'],
            ['compound', 'elements chemically joined', 'water, sodium chloride'],
            ['mixture', 'substances not joined', 'air, sea water, brass'],
          ],
        },
      ],
      lines: [
        { say: 'An element contains only one kind of atom, like oxygen, iron or gold.', show: ['kinds', 'kinds.0'], focus: 'kinds.0' },
        { say: 'A compound contains two or more elements chemically joined, like water or sodium chloride.', show: 'kinds.1', focus: 'kinds.1' },
        { say: 'And a mixture contains two or more substances that are not chemically joined, like air or sea water. Elements and compounds are pure substances, but mixtures are not.', show: 'kinds.2', focus: 'kinds.2' },
        { say: 'Brass is copper and zinc melted and stirred together. The two metals are mixed, not joined, and the amounts can vary, so brass is a mixture.' },
      ],
    },
    {
      chapter: 'Compounds and mixtures compared',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'cmp',
          head: ['', 'Iron and sulfur mixture', 'Iron sulfide'],
          rows: [
            ['made by', 'stirring together', 'heating: a reaction'],
            ['properties', 'iron still magnetic', 'new black solid'],
            ['proportions', 'any amounts', 'always fixed'],
            ['separating', 'a magnet', 'another reaction'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the iron and sulfur story in a table. The mixture is made just by stirring, but the compound, iron sulfide, needs heating to start a chemical reaction.', show: ['cmp', 'cmp.0'], focus: 'cmp.0' },
        { say: 'In the mixture, each part keeps its own properties: the iron is still grey and magnetic. The compound is a new black solid with properties of its own.', show: 'cmp.1', focus: 'cmp.1' },
        { say: 'A mixture can have any amount of each part. But in a compound the elements are always joined in the same proportions. Every water molecule is two hydrogen atoms to one oxygen atom.', show: 'cmp.2', focus: 'cmp.2' },
        { say: 'Finally, a mixture is easy to separate, here with a magnet. A compound can only be split by another chemical reaction.', show: 'cmp.3', focus: 'cmp.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A grey-and-yellow powder is tested with a magnet, and grey specks are pulled out. What is the powder?',
          choices: ['a compound of iron and sulfur', 'a mixture of iron and sulfur', 'a single element', 'a compound that is magnetic'],
          answer: 1,
          working: 'The iron still has its own property, magnetism, so it is not joined. In a compound the iron would no longer be magnetic.',
        },
      ],
      lines: [
        { say: 'Your turn. A grey and yellow powder is tested with a magnet, and grey specks are pulled out. What is the powder? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, a mixture. The iron still has its own property, magnetism, so it cannot be chemically joined. In a compound the iron would no longer be magnetic.', show: 'q.answer' },
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
            '**Element**: one kind of atom. **Compound**: elements joined. **Mixture**: not joined.',
            'A mixture keeps its parts’ properties, in any amounts.',
            'A compound has new properties and fixed proportions.',
            'Making or splitting a compound needs a chemical reaction.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An element has one kind of atom, a compound has elements chemically joined, and a mixture has substances that are not joined.', show: 'sum.0' },
        { say: 'In a mixture, each part keeps its properties and can be in any amount.', show: 'sum.1' },
        { say: 'A compound has new properties and fixed proportions.', show: 'sum.2' },
        { say: 'And making or splitting a compound needs a chemical reaction. Next, you will learn to read chemical formulas.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
