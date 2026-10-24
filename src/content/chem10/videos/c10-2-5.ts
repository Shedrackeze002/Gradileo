import type { Explainer } from '@/video/script.ts';
import { periodicTable } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';

// The main groups of periods 1 to 5, with the families coloured.
const table = figure(
  'pt',
  [
    periodicTable({
      upTo: 54,
      highlights: [
        { id: 'alkali', cells: ['Li', 'Na', 'K', 'Rb'], tone: 'opp' },
        { id: 'earth', cells: ['Be', 'Mg', 'Ca', 'Sr'], tone: 'theta' },
        { id: 'halogens', cells: ['F', 'Cl', 'Br', 'I'], tone: 'good' },
        { id: 'noble', cells: ['He', 'Ne', 'Ar', 'Kr', 'Xe'], tone: 'adj' },
        { id: 'h', cells: ['H'], tone: 'hyp' },
      ],
    }),
  ],
  480,
);

const video: Explainer = {
  id: 'c10-2-5',
  lessonId: 'c10-2-5',
  title: 'Families of Elements, Part 1: The Families',
  thumbnailTitle: 'The Families',
  thumbnail: 'pt',
  summary:
    'Group 1 is the alkali metals, group 2 the alkaline earth metals, groups 3 to 12 the transition metals, group 17 the halogens and group 18 the noble gases; hydrogen is not an alkali metal. The alkaline earth metals are less reactive than group 1 but also more reactive down the group, and the transition metals are hard, dense, high-melting and much less reactive, often forming coloured compounds and acting as catalysts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 1', title: 'The Families', subtitle: 'Groups that share properties' }],
      lines: [
        { say: 'Drop a small piece of sodium into water, and it fizzes and races across the surface. A piece of iron sits in water for days before it even begins to rust.', show: 'title' },
        { say: 'These differences are not random. Elements in the same group form families that share properties. This part introduces the families. The next parts look closely at the alkali metals, the halogens and the noble gases.' },
      ],
    },
    {
      chapter: 'The families',
      layout: 'split',
      leftWidth: 540,
      left: [table],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Group', 'Family', 'Outer electrons'],
          rows: [
            ['1', '[[opp:alkali\u00a0metals]]', '1'],
            ['2', '[[theta:alkaline earth metals]]', '2'],
            ['3–12', 'transition\u00a0metals', 'varies'],
            ['17', '[[good:halogens]]', '7'],
            ['18', '[[adj:noble\u00a0gases]]', '8 (helium 2)'],
          ],
        },
      ],
      lines: [
        { say: 'Several groups have family names of their own.', show: 'pt.table' },
        { say: 'Group one is the alkali metals, very reactive metals with one outer electron.', show: ['pt.alkali', 't.0'], focus: 't.0' },
        { say: 'Group two is the alkaline earth metals, with two outer electrons.', show: ['pt.earth', 't.1'], focus: 't.1' },
        { say: 'Groups three to twelve are the transition metals, such as iron, copper and zinc, which this table leaves out.', show: 't.2', focus: 't.2' },
        { say: 'Group seventeen is the halogens, reactive non-metals with seven outer electrons.', show: ['pt.halogens', 't.3'], focus: 't.3' },
        { say: 'Group eighteen is the noble gases, very unreactive gases with full outer shells.', show: ['pt.noble', 't.4'], focus: 't.4' },
        { say: 'Hydrogen sits at the top of group one, with one outer electron, but it is a non-metal gas, not an alkali metal.', show: 'pt.h', focus: 'pt.h' },
      ],
    },
    {
      chapter: 'Alkaline earth metals',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '$2$ outer electrons; harder and denser than group 1',
            '**Less reactive** than group 1: they must lose two electrons, not one',
            'More reactive **down** the group: magnesium reacts very slowly with cold water; calcium fizzes steadily',
          ],
        },
      ],
      lines: [
        { say: 'The alkaline earth metals in group two have two outer electrons. They are harder and denser than the group one metals beside them.', show: 'b.0', focus: 'b.0' },
        { say: 'They are also less reactive, because they must lose two electrons instead of one.', show: 'b.1', focus: 'b.1' },
        { say: 'Like group one, they become more reactive down the group. Magnesium reacts only very slowly with cold water, while calcium, below it, fizzes steadily.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Transition metals',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Harder, stronger and denser than the alkali metals, with much higher melting points (except mercury, a liquid)',
            'Far less reactive: iron rusts slowly; copper, silver and gold hardly react with water',
            'Often form **coloured compounds**, such as blue copper(II) sulfate',
            'Often useful as **catalysts**, which speed up reactions',
            'Can often form more than one ion: $\\ce{Fe^2+}$ and $\\ce{Fe^3+}$',
          ],
        },
      ],
      lines: [
        { say: 'The transition metals are the metals of everyday life: iron in steel, copper in electrical wires, and gold and silver in jewellery.' },
        { say: 'Compared with the alkali metals, they are harder, stronger and denser, with much higher melting points. Mercury is the exception: it is a liquid.', show: 'b.0', focus: 'b.0' },
        { say: 'They are far less reactive. Iron rusts slowly, and copper, silver and gold hardly react with water at all.', show: 'b.1', focus: 'b.1' },
        {
          say: 'They often form coloured compounds, such as blue copper two sulfate. And they are often useful as catalysts, which speed up reactions: iron is used in making ammonia.',
          caption: 'They often form coloured compounds, such as blue copper(II) sulfate. And they are often useful as catalysts, which speed up reactions: iron is used in making ammonia.',
          show: ['b.2', 'b.3'],
          focus: ['b.2', 'b.3'],
        },
        { say: 'And they can often form more than one ion: iron can form an ion with a charge of two plus, and one with a charge of three plus.', show: 'b.4', focus: 'b.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which family of elements is described here: colourless gases that exist as single atoms and hardly ever react, because their outer shells are full?',
          choices: ['The noble gases', 'The halogens', 'The alkali metals', 'The transition metals'],
          answer: 0,
          working: 'These are the noble gases, in group 18. The halogens are reactive, and exist as molecules of two atoms.',
        },
      ],
      lines: [
        { say: 'Your turn. Which family of elements is this: colourless gases that exist as single atoms, and hardly ever react, because their outer shells are full? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, the noble gases, in group eighteen. The halogens are reactive, and exist as molecules of two atoms.', show: 'q.answer' },
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
            'Group 1: **alkali metals**; group 2: **alkaline earth metals**; groups 3 to 12: **transition metals**.',
            'Group 17: **halogens**; group 18: **noble gases**.',
            'Transition metals: hard, dense, high-melting and less reactive; coloured compounds and catalysts.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Group one is the alkali metals, group two the alkaline earth metals, and groups three to twelve the transition metals.', show: 'sum.0' },
        { say: 'Group seventeen is the halogens, and group eighteen the noble gases.', show: 'sum.1' },
        { say: 'The transition metals are hard, dense and much less reactive, with coloured compounds, and they act as catalysts. In part two, you will meet the alkali metals up close. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
