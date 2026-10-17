import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

/** The integers from −3 to 3 on a number line from −5 to 5, and 4 left out (an open dot). */
const ints = [-3, -2, -1, 0, 1, 2, 3];
const line = numberLine({ min: -5, max: 5, step: 1, length: 12, points: ints.map((v) => ({ id: `p${v + 3}`, value: v, tex: '', tone: 'good' as const })) });
const open = { points: { 'no4-at': [((4 + 5) / 10) * 12, 0] as [number, number] }, items: [{ kind: 'label' as const, id: 'no4', at: 'no4-at', tex: '', tone: 'bad' as const, dot: true, open: true, place: 'above' as const }] };

const video: Explainer = {
  id: 'm302-1-1-b',
  lessonId: 'm302-1-1',
  title: 'Sets and Subsets, Part 2: Set-Builder Notation',
  thumbnailTitle: 'Set-Builder Notation',
  thumbnail: 'nl',
  summary: 'Reading set-builder notation, {x | condition}, as "the set of all x such that…", the natural numbers N, whole numbers W and integers I, and listing {x | −3 ≤ x < 4, x ∈ I} = {−3, −2, −1, 0, 1, 2, 3}. Part 3 meets finite, infinite and empty sets.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 2', title: 'Set-Builder Notation', subtitle: 'The set of all $x$ such that…' }],
      lines: [
        { say: 'A list works well for a small set. But some sets are too large to list, and some are easier to describe by a rule. Set-builder notation describes a set by the rule that its elements follow.', show: 'title' },
        { say: 'In this video, you will read set-builder notation, meet three sets of numbers that it often uses, and list the elements that it describes.' },
      ],
    },
    {
      chapter: 'Reading the notation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\{\\, x \\mid \\text{condition} \\,\\}', '\\text{“the set of all } x \\text{ such that …”}', 'A = \\{x \\mid x \\text{ is a factor of } 12,\\ x \\in N\\}'] }],
      lines: [
        { say: 'Set-builder notation is written inside braces. On the left is a variable, usually x. Then comes a vertical bar, and after the bar, the condition that x must meet.', show: 'm.0', focus: 'm.0' },
        { say: 'Read the opening brace as the set of all, and the vertical bar as such that. So the whole thing reads: the set of all x such that x meets the condition.', show: 'm.1', focus: 'm.1' },
        { say: 'Here is the example from part one: A equals the set of all x such that x is a factor of twelve, and x is a natural number.', show: 'm.2', focus: 'm.2' },
        { say: 'The comma between the two conditions means and: x must meet both of them. The elements are the natural numbers that divide twelve: one, two, three, four, six and twelve.' },
      ],
    },
    {
      chapter: 'Three sets of numbers',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Symbol', 'Name', 'Elements'],
          rows: [
            ['$N$', 'natural numbers', '$\\{1, 2, 3, \\ldots\\}$'],
            ['$W$', 'whole numbers', '$\\{0, 1, 2, 3, \\ldots\\}$'],
            ['$I$', 'integers', '$\\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$'],
          ],
        },
        { kind: 'text', id: 'note', size: 'md', md: 'The three dots mean that the pattern goes on forever.' },
      ],
      lines: [
        { say: 'The condition often says which kind of number x must be. Three sets of numbers come up again and again.' },
        { say: 'The natural numbers, written with a capital N, are the counting numbers: one, two, three, and so on. The three dots mean that the pattern goes on forever.', show: ['t.0', 'note'], focus: 't.0' },
        { say: 'The whole numbers, written with a capital W, are the natural numbers with zero added: zero, one, two, three, and so on.', show: 't.1', focus: 't.1' },
        { say: 'And the integers, written with a capital I, are the whole numbers together with their negatives: negative two, negative one, zero, one, two, and so on in both directions.', show: 't.2', focus: 't.2' },
        { say: 'Notice that the only difference between the natural numbers and the whole numbers is zero. That small difference matters, as you will see in a moment.', focus: ['t.0', 't.1'] },
      ],
    },
    {
      chapter: 'Listing the elements',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'List the elements of $C = \\{x \\mid -3 \\le x < 4,\\ x \\in I\\}$.' },
        figure('nl', [line, open], 170),
        { kind: 'math', id: 'm', size: 'md', lines: ['C = \\{-3, -2, -1, 0, 1, 2, 3\\}', 'n(C) = 7'] },
      ],
      lines: [
        { say: 'Let’s list the elements of a set. C is the set of all x such that negative three is less than or equal to x, x is less than four, and x is an integer.', show: 'p' },
        { say: 'First, x must be an integer. So negative numbers and zero are allowed, but fractions and decimals are not.', show: 'nl.axis' },
        { say: 'Next, check the endpoints. Less than or equal to includes negative three, so negative three is in the set. But x is less than four leaves four out: four is not less than itself.', show: ['nl.p0', 'nl.no4'], focus: ['nl.p0', 'nl.no4'] },
        { say: 'So C holds every integer from negative three up to three: negative three, negative two, negative one, zero, one, two and three.', show: ['nl.p1', 'nl.p2', 'nl.p3', 'nl.p4', 'nl.p5', 'nl.p6', 'm.0'], focus: 'm.0' },
        { say: 'Count them: there are seven, so n of C equals seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Check the endpoints and the number set', md: 'The symbols $<$ and $>$ leave an endpoint out; $\\le$ and $\\ge$ include it. Then check which numbers $x$ can be: $0$ is not a natural number.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\{x \\mid 0 \\le x \\le 3,\\ x \\in N\\} = \\{1, 2, 3\\}', '\\{x \\mid 0 \\le x \\le 3,\\ x \\in W\\} = \\{0, 1, 2, 3\\}'] },
      ],
      lines: [
        { say: 'Two details are easy to miss. The first is the endpoints. Less than, and greater than, leave an endpoint out. Less than or equal to, and greater than or equal to, include it.', show: 'oops' },
        { say: 'The second is the number set. List the set of all x such that zero is less than or equal to x, x is less than or equal to three, and x is a natural number.', show: 'm.0' },
        { say: 'The symbol includes the endpoint zero, but zero is not a natural number. So the set is just one, two and three.', focus: 'm.0' },
        { say: 'With the whole numbers instead, zero is allowed, and the set is zero, one, two and three. Always read both the inequality and the number set.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'List the elements of $\\{x \\mid -2 < x \\le 2,\\ x \\in I\\}$.',
          choices: ['$\\{-1, 0, 1, 2\\}$', '$\\{-2, -1, 0, 1, 2\\}$', '$\\{-2, -1, 0, 1\\}$', '$\\{1, 2\\}$'],
          answer: 0,
          working: '$-2 < x$ leaves out $-2$, and $x \\le 2$ includes $2$. The integers between are $-1, 0, 1, 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. List the elements of the set of all x such that negative two is less than x, x is less than or equal to two, and x is an integer. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x is greater than negative two, so negative two is left out. And x is less than or equal to two, so two is included. That leaves negative one, zero, one and two. Choice B includes negative two, but the symbol less than leaves it out.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\{x \\mid \\ldots\\}$ is read “the set of all $x$ such that …”.', '$N = \\{1, 2, 3, \\ldots\\}$, $W = \\{0, 1, 2, \\ldots\\}$ and $I = \\{\\ldots, -1, 0, 1, \\ldots\\}$.', '$<$ and $>$ leave an endpoint out; $\\le$ and $\\ge$ include it.'] }],
      lines: [
        { say: 'Let’s sum up. Set-builder notation is read: the set of all x such that, followed by the condition.', show: 'sum.0' },
        { say: 'The natural numbers start at one, the whole numbers start at zero, and the integers include the negatives too.', show: 'sum.1' },
        { say: 'The symbols less than and greater than do not include the endpoint, while the symbols with a line under them include it. In part three, we meet sets that are finite, infinite and empty. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
