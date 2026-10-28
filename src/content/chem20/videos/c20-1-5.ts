import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-1-5',
  lessonId: 'c20-1-5',
  title: 'Lewis Structures, Part 1: Counting Valence Electrons',
  thumbnailTitle: 'Counting Valence Electrons',
  thumbnail: false,
  summary:
    'Every Lewis structure starts with a count of valence electrons: add up the valence electrons of every atom, which come from each element’s group. For a polyatomic ion, add one electron for each negative charge and subtract one for each positive charge, so the carbonate ion has 24 and the ammonium ion 8.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 1', title: 'Counting Valence Electrons', subtitle: 'Every Lewis structure starts with a count' }],
      lines: [
        { say: 'Why is water H two O, and not H three O? And why does carbon almost always form four bonds?', caption: 'Why is water H₂O, and not H₃O? And why does carbon almost always form four bonds?', show: 'title' },
        { say: 'The answers lie in the valence electrons, the outer electrons that atoms share when they bond. A Lewis structure is a diagram that keeps track of every one of them.' },
        { say: 'This first part counts the valence electrons in a molecule or ion. The later parts sort them into pairs, draw structures step by step, and add double and triple bonds.' },
      ],
    },
    {
      chapter: 'Valence electrons from the group',
      layout: 'split',
      leftWidth: 600,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Element', 'Group', 'Valence electrons'],
          rows: [
            ['H', '1', '1'],
            ['B', '13', '3'],
            ['C, Si', '14', '4'],
            ['N, P', '15', '5'],
            ['O, S', '16', '6'],
            ['F, Cl, Br, I', '17', '7'],
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'From the group number', md: 'Groups 1 and 2: the group number.\n\nGroups 13 to 18: the group number − 10.' },
      ],
      lines: [
        { say: 'Every Lewis structure starts with a count. For a main-group element, the valence electrons come from its group. In groups thirteen to eighteen, take away ten.', show: 'rule' },
        { say: 'Hydrogen has one valence electron, and boron three. Carbon and silicon have four, and nitrogen and phosphorus five.', show: ['t.0', 't.1', 't.2', 't.3'], focus: ['t.0', 't.1', 't.2', 't.3'] },
        { say: 'Oxygen and sulfur have six, and the halogens, fluorine, chlorine, bromine and iodine, have seven.', show: ['t.4', 't.5'], focus: ['t.4', 't.5'] },
      ],
    },
    {
      chapter: 'Adding up a molecule',
      layout: 'split',
      leftWidth: 560,
      left: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Total valence electrons', md: 'Add up the valence electrons of **every atom** in the formula.' },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many valence electrons are in a molecule of chloromethane, $\\ce{CH3Cl}$?' },
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          align: 'left',
          lines: ['\\text{C:}\\ 1 \\times 4 = 4', '\\text{H:}\\ 3 \\times 1 = 3', '\\text{Cl:}\\ 1 \\times 7 = 7', '4 + 3 + 7 = 14', '14 \\div 2 = 7 \\text{ pairs}'],
        },
      ],
      lines: [
        { say: 'To count a whole molecule, add up the valence electrons of every atom. Take chloromethane, C H three C L.', caption: 'To count a whole molecule, add up the valence electrons of every atom. Take chloromethane, CH₃Cl.', show: ['def', 'q'] },
        { say: 'One carbon atom gives four. Three hydrogen atoms give three times one: three. And one chlorine atom gives seven.', show: ['m.0', 'm.1', 'm.2'], focus: ['m.0', 'm.1', 'm.2'] },
        { say: 'Four plus three plus seven is fourteen valence electrons. Electrons go into a Lewis structure in pairs, so halve it: seven pairs.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
      ],
    },
    {
      chapter: 'Ions: add or subtract',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'callout', id: 'ion', tone: 'definition', title: 'For a polyatomic ion', md: '**Add one** electron for each negative charge.\n\n**Subtract one** for each positive charge.' }],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            '\\ce{CO3^2-}\\text{:}\\ 1 \\times 4 + 3 \\times 6 = 22',
            '\\text{charge } 2{-}\\text{:}\\ 22 + 2 = 24',
            '\\ce{NH4+}\\text{:}\\ 1 \\times 5 + 4 \\times 1 = 9',
            '\\text{charge } 1{+}\\text{:}\\ 9 - 1 = 8',
          ],
        },
      ],
      lines: [
        { say: 'An ion has gained or lost electrons, so its charge changes the count. Add one electron for each negative charge, and subtract one for each positive charge.', show: 'ion' },
        { say: 'Take the carbonate ion, C O three, two minus. Its atoms give four, plus three times six: twenty-two. The charge is two minus, so add two: twenty-four.', caption: 'Take the carbonate ion, CO₃²⁻. Its atoms give four, plus three times six: twenty-two. The charge is two minus, so add two: twenty-four.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Now the ammonium ion, N H four plus. Its atoms give five, plus four: nine. The charge is one plus, so subtract one: eight.', caption: 'Now the ammonium ion, NH₄⁺. Its atoms give five, plus four: nine. The charge is one plus, so subtract one: eight.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Getting the charge backwards',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Getting the charge backwards', md: 'A **negative** charge means **more** electrons, so you add. A **positive** charge means **fewer** electrons, so you subtract.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{OH-}\\text{:}\\quad 6 + 1 + 1 = 8', '\\ce{H3O+}\\text{:}\\quad 3 \\times 1 + 6 - 1 = 8'] },
      ],
      lines: [
        { say: 'A common mistake is to get the charge backwards. Negative means more electrons, so you add: the hydroxide ion, O H minus, has six plus one, plus one: eight.', caption: 'A common mistake is to get the charge backwards. Negative means more electrons, so you add: the hydroxide ion, OH⁻, has six plus one, plus one: eight.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Positive means fewer electrons, so you subtract: the hydronium ion, H three O plus, has three plus six, minus one: also eight.', caption: 'Positive means fewer electrons, so you subtract: the hydronium ion, H₃O⁺, has three plus six, minus one: also eight.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many valence electrons are in the sulfate ion, $\\ce{SO4^2-}$? (S and O are both in group 16.)',
          choices: ['$28$', '$30$', '$32$', '$16$'],
          answer: 2,
          working: 'Atoms: $1 \\times 6 + 4 \\times 6 = 30$. The charge is $2-$, so add 2: $30 + 2 = 32$ valence electrons.',
        },
      ],
      lines: [
        { say: 'Your turn. How many valence electrons are in the sulfate ion, S O four, two minus? Sulfur and oxygen are both in group sixteen. Pause the video and try it.', caption: 'Your turn. How many valence electrons are in the sulfate ion, SO₄²⁻? Sulfur and oxygen are both in group sixteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, thirty-two. The atoms give six, plus four times six: thirty. The charge is two minus, so add two. Choice A, twenty-eight, subtracts the charge instead.', show: 'q.answer' },
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
            'Valence electrons come from the group: groups 13 to 17 have the group number − 10.',
            'Add up the valence electrons of every atom: $\\ce{CH3Cl}$ has $4 + 3 + 7 = 14$.',
            'For an ion, add 1 for each negative charge and subtract 1 for each positive charge.',
            'Halve the total to find the number of pairs.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Valence electrons come from the group. For groups thirteen to seventeen, take away ten.', show: 'sum.0' },
        { say: 'To count a molecule, add up every atom. Chloromethane has fourteen.', show: 'sum.1' },
        { say: 'For an ion, add one for each negative charge, and subtract one for each positive charge.', show: 'sum.2' },
        { say: 'Then halve the total to find the pairs. In part two, you will see what those pairs do. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
