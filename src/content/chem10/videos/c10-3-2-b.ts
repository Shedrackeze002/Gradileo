import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chargeBars } from './lib/c10-3-figures.ts';

// Two Al³⁺ ions (6+) cancel three O²⁻ ions (6−).
const alumina = figure('bars', [chargeBars({ plus: { count: 2, size: 3, tex: '\\ce{Al^3+}' }, minus: { count: 3, size: 2, tex: '\\ce{O^2-}' } })], 300);
// Three Mg²⁺ ions (6+) cancel two N³⁻ ions (6−).
const nitride = figure('bars', [chargeBars({ plus: { count: 3, size: 2, tex: '\\ce{Mg^2+}' }, minus: { count: 2, size: 3, tex: '\\ce{N^3-}' } })], 300);

const video: Explainer = {
  id: 'c10-3-2-b',
  lessonId: 'c10-3-2',
  title: 'Ionic Compounds: Names and Formulas, Part 2: Writing Formulas',
  thumbnailTitle: 'Writing Ionic Formulas',
  thumbnail: 'bars',
  summary:
    'An ionic compound has no overall charge, so its formula uses the fewest ions whose charges add up to zero. Aluminium oxide needs two Al3+ (6+) for three O2- (6-), so it is Al2O3; magnesium nitride is Mg3N2. When the charges are the same size, one of each is enough: MgO, KCl, and CaO, not Ca2O2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 2', title: 'Writing Formulas', subtitle: 'Make the charges cancel' }],
      lines: [
        { say: 'Aluminium oxide is made of aluminium ions and oxide ions. But how many of each? The formula has to make their charges cancel.', show: 'title' },
        { say: 'In this part, you will write the formula of an ionic compound of two elements, using the fewest ions whose charges add up to zero.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        { kind: 'text', id: 'zero', size: 'md', align: 'center', md: 'An ionic compound has **no overall charge**: its positive charges cancel its negative charges exactly.' },
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            '1. Write the two ions with their charges.',
            '2. Find the smallest total charge both can make: the lowest common multiple of the charges.',
            '3. Divide that total by each charge to find how many of each ion you need.',
            '4. Metal first, the numbers as subscripts. A 1 is not written, and the charges are left out.',
          ],
        },
      ],
      lines: [
        { say: 'An ionic compound has no overall charge. Its positive charges cancel its negative charges exactly. So to write its formula, find the fewest ions whose charges add up to zero.', show: 'zero' },
        { say: 'First, write the two ions with their charges, using their groups.', show: 'steps.0' },
        { say: 'Second, find the smallest total charge both can make: the lowest common multiple of the two charges.', show: 'steps.1' },
        { say: 'Third, divide that total by each charge, to find how many of each ion you need.', show: 'steps.2' },
        { say: 'Fourth, write the metal first, with the numbers as small subscripts. A one is not written, and the charges are left out.', show: 'steps.3' },
      ],
    },
    {
      chapter: 'Aluminium oxide',
      layout: 'split',
      leftWidth: 560,
      left: [alumina],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Al^3+} \\text{ and } \\ce{O^2-}', '\\text{smallest total: } 6', '2 \\times 3{+} = 6{+}', '3 \\times 2{-} = 6{-}', '\\ce{Al2O3}'] }],
      lines: [
        { say: 'Write the formula of aluminium oxide. Aluminium is in group thirteen and oxygen in group sixteen, so the ions are A L three plus and O two minus.', caption: 'Write the formula of aluminium oxide. Aluminium is in group thirteen and oxygen in group sixteen, so the ions are Al³⁺ and O²⁻.', show: 'm.0', focus: 'm.0' },
        { say: 'The smallest total that both three and two go into is six.', show: 'm.1', focus: 'm.1' },
        { say: 'Two aluminium ions give two times three plus, which is six plus.', show: ['bars.p0', 'bars.p1', 'bars.p-total', 'm.2'], focus: 'm.2' },
        { say: 'Three oxide ions give three times two minus, which is six minus. The two rows are the same length: the charges cancel.', show: ['bars.m0', 'bars.m1', 'bars.m2', 'bars.m-total', 'm.3'], focus: 'm.3' },
        { say: 'Write the metal first, with the numbers as subscripts: A L two O three.', caption: 'Write the metal first, with the numbers as subscripts: Al₂O₃.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Magnesium nitride',
      layout: 'split',
      leftWidth: 560,
      left: [nitride],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Mg^2+} \\text{ and } \\ce{N^3-}', '3 \\times 2{+} = 6{+}', '2 \\times 3{-} = 6{-}', '\\ce{Mg3N2}'] }],
      lines: [
        { say: 'Now magnesium nitride. The ions are M G two plus, from group two, and N three minus, from group fifteen.', caption: 'Now magnesium nitride. The ions are Mg²⁺, from group two, and N³⁻, from group fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'The smallest total is six again. Three magnesium ions give six plus.', show: ['bars.p0', 'bars.p1', 'bars.p2', 'bars.p-total', 'm.1'], focus: 'm.1' },
        { say: 'And two nitride ions give six minus.', show: ['bars.m0', 'bars.m1', 'bars.m-total', 'm.2'], focus: 'm.2' },
        { say: 'So the formula is M G three N two.', caption: 'So the formula is Mg₃N₂.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The fewest ions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Mg^2+} + \\ce{O^2-} \\;\\rightarrow\\; \\ce{MgO}', '\\ce{K+} + \\ce{Cl-} \\;\\rightarrow\\; \\ce{KCl}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Use the fewest ions', md: 'Calcium oxide is $\\ce{CaO}$, not $\\ce{Ca2O2}$. A formula always uses the smallest whole-number ratio.' },
      ],
      lines: [
        { say: 'When the two charges are the same size, one of each is enough. Magnesium oxide is M G O, and potassium chloride is K C L.', caption: 'When the two charges are the same size, one of each is enough. Magnesium oxide is MgO, and potassium chloride is KCl.', show: 'm' },
        { say: 'Always use the fewest ions. Calcium oxide is C A O, not C A two O two, because one calcium ion already cancels one oxide ion.', caption: 'Always use the fewest ions. Calcium oxide is CaO, not Ca₂O₂, because one calcium ion already cancels one oxide ion.', show: 'oops' },
        { say: 'Some people swap the sizes of the charges into the subscripts as a shortcut. If you do, check whether the numbers can be divided down.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write the formula of calcium nitride. (Calcium is in group $2$, and nitrogen is in group $15$.)',
          choices: ['$\\ce{Ca2N3}$', '$\\ce{Ca3N2}$', '$\\ce{CaN}$', '$\\ce{CaN2}$'],
          answer: 1,
          working: 'The ions are $\\ce{Ca^2+}$ and $\\ce{N^3-}$. Three calcium ions give 6+, and two nitride ions give 6−.',
        },
      ],
      lines: [
        { say: 'Your turn. Write the formula of calcium nitride. Calcium is in group two, and nitrogen is in group fifteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, C A three N two. The ions are calcium two plus and nitride three minus. Three calcium ions give six plus, and two nitride ions give six minus. Choice A has the numbers the wrong way round: its charges would be four plus and nine minus.', caption: 'The answer is B, Ca₃N₂. The ions are calcium 2+ and nitride 3−. Three calcium ions give six plus, and two nitride ions give six minus. Choice A has the numbers the wrong way round: its charges would be four plus and nine minus.', show: 'q.answer' },
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
            'An ionic compound has no overall charge: use the fewest ions whose charges add up to zero.',
            'Aluminium oxide: two $\\ce{Al^3+}$ (6+) and three $\\ce{O^2-}$ (6−) make $\\ce{Al2O3}$.',
            'Equal charges need one of each: $\\ce{MgO}$, $\\ce{KCl}$.',
            'Use the smallest whole-number ratio: $\\ce{CaO}$, not $\\ce{Ca2O2}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An ionic compound has no overall charge, so use the fewest ions whose charges add up to zero.', show: 'sum.0' },
        { say: 'In aluminium oxide, two aluminium ions and three oxide ions both make six.', show: 'sum.1' },
        { say: 'When the charges are the same size, one of each is enough.', show: 'sum.2' },
        { say: 'And always use the smallest whole-number ratio. In part three, you will name ionic compounds. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
