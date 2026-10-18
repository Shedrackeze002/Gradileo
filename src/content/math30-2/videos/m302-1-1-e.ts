import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m302-2-counting.ts';

const video: Explainer = {
  id: 'm302-1-1-e',
  lessonId: 'm302-1-1',
  title: 'Sets and Subsets, Part 5: Counting Subsets',
  thumbnailTitle: 'Counting Subsets',
  thumbnail: 's',
  summary: 'Listing all 8 subsets of {red, blue, green} by size, then counting them by deciding whether each element is in or out: 2 × 2 × 2 = 2³. A set with n elements has 2ⁿ subsets, counting the empty set and the set itself.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 5', title: 'Counting Subsets', subtitle: 'Why $n$ elements give $2^n$ subsets' }],
      lines: [
        { say: 'A pizza shop offers three toppings, and you may choose any of them: none, some, or all three. How many different pizzas can you order? That is the same as counting the subsets of a set.', show: 'title' },
        { say: 'In this video, you will list every subset of a set with three elements, and find a rule that counts the subsets of any set without listing them.' },
      ],
    },
    {
      chapter: 'All the subsets',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'List all the subsets of $\\{\\text{red}, \\text{blue}, \\text{green}\\}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{No elements: } \\{\\ \\}',
            '\\text{One element: } \\{\\text{red}\\},\\ \\{\\text{blue}\\},\\ \\{\\text{green}\\}',
            '\\text{Two elements: } \\{\\text{red, blue}\\},\\ \\{\\text{red, green}\\},\\ \\{\\text{blue, green}\\}',
            '\\text{Three elements: } \\{\\text{red, blue, green}\\}',
            '1 + 3 + 3 + 1 = 8',
          ],
        },
      ],
      lines: [
        { say: 'List all the subsets of the set red, blue, green. Remember from part four that the empty set is a subset of every set, and every set is a subset of itself. To make sure you miss nothing, sort the subsets by size.', show: 'p' },
        { say: 'With no elements, there is one subset: the empty set.', show: 'm.0', focus: 'm.0' },
        { say: 'With one element, there are three: red on its own, blue on its own, and green on its own.', show: 'm.1', focus: 'm.1' },
        { say: 'With two elements, there are three pairs: red and blue, red and green, and blue and green.', show: 'm.2', focus: 'm.2' },
        { say: 'With all three elements, there is one subset: the whole set.', show: 'm.3', focus: 'm.3' },
        { say: 'That makes one, plus three, plus three, plus one: eight subsets in all.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'In or out',
      layout: 'center',
      main: [
        { kind: 'math', id: 'e', size: 'md', lines: ['\\text{in, out, in} \\;\\rightarrow\\; \\{\\text{red, green}\\}', '\\text{out, out, out} \\;\\rightarrow\\; \\{\\ \\}'] },
        figure('s', [slots({ values: ['2', '2', '2'], captions: ['\\text{red}', '\\text{blue}', '\\text{green}'] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 2 \\times 2 = 2^3 = 8'] },
      ],
      lines: [
        { say: 'There is a faster way to count them. To build a subset, go through the elements one at a time, and decide whether each one is in or out.' },
        { say: 'For example, red in, blue out, green in gives the subset red, green. And out, out, out gives the empty set.', show: 'e.0', focus: 'e.0' },
        { say: 'Every choice of in or out gives a different subset, and every subset comes from one of these choices.', show: 'e.1', focus: 'e.1' },
        { say: 'So draw a box for each element. Each element has two choices, in or out, so write two in each box.', show: ['s.boxes', 's.captions', 's.values'], focus: 's.values' },
        { say: 'Each of the two choices for red can go with each of the two choices for blue, which makes four. And each of those can go with each of the two choices for green, which makes eight.', show: 's.times', focus: 's' },
        { say: 'So there are two times two times two, or two to the power of three, which is eight subsets: the same eight that we listed.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Counting subsets', md: 'A set with $n$ elements has $2^n$ subsets, counting the empty set and the set itself.' },
        { kind: 'table', id: 't', head: ['Elements, $n$', '0', '1', '2', '3', '4', '5'], rows: [['Subsets, $2^n$', '1', '2', '4', '8', '16', '32']] },
      ],
      lines: [
        { say: 'The same reasoning works for any set. A set with n elements has two to the power of n subsets, counting the empty set and the set itself.', show: 'key' },
        { say: 'So a set with five elements has two to the fifth, or thirty-two, subsets.', show: 't.0' },
        { say: 'Look along the table: each new element doubles the count. That is because every subset you had before can now be taken with the new element, or without it.', focus: 't.0' },
        { say: 'Even the empty set fits the rule. It has zero elements, and two to the zero is one: its only subset is the empty set itself.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting two of the subsets', md: 'A set with 3 elements has $2^3 = 8$ subsets, not 6. The empty set $\\{\\ \\}$ and the whole set are subsets too.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{3 + 3 = 6}', '\\good{1 + 3 + 3 + 1 = 8}'] },
      ],
      lines: [
        { say: 'A common mistake is to count only the subsets that look like proper parts of the set: the three with one element, and the three with two. That gives six.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But the empty set, and the whole set itself, are subsets too. Counting them gives eight, which matches two to the power of three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pizza shop offers 4 toppings. A pizza can have any number of them, from none to all 4. How many different choices of toppings are there?',
          choices: ['$4$', '$8$', '$16$', '$14$'],
          answer: 2,
          working: 'Each topping is on or off: $2 \\times 2 \\times 2 \\times 2 = 2^4 = 16$, counting the plain pizza and the pizza with all four.',
        },
      ],
      lines: [
        { say: 'Your turn. A pizza shop offers four toppings. A pizza can have any number of them, from none to all four. How many different choices of toppings are there? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, sixteen. Each topping is either on or off, so there are two times two times two times two, which is two to the fourth, or sixteen. Choice D, fourteen, forgets the plain pizza with no toppings and the pizza with all four.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['List subsets by size, from the empty set up to the whole set.', 'Each element is in or out: two choices for each element.', 'A set with $n$ elements has $2^n$ subsets.'] }],
      lines: [
        { say: 'Let’s sum up. To list subsets, sort them by size, from the empty set up to the whole set.', show: 'sum.0' },
        { say: 'To count them, decide whether each element is in or out: two choices for each element.', show: 'sum.1' },
        { say: 'So a set with n elements has two to the power of n subsets. In the next lesson, we combine sets in Venn diagrams, with unions and intersections. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
