import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-1-1',
  lessonId: 'm302-1-1',
  title: 'Sets and Subsets, Part 1: Sets and Elements',
  thumbnailTitle: 'Sets and Elements',
  summary: 'What a set and its elements are, the symbols ∈, ∉ and n(A), and three ways to describe a set: in words, as a list and in set-builder notation. Worked example: the prime numbers less than 20 form a set B with n(B) = 8. Part 2 reads set-builder notation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 1', title: 'Sets and Elements', subtitle: 'Naming a collection, and counting it' }],
      lines: [
        { say: 'A coach sorting players into teams, a grocery store grouping its products into aisles, and a search engine filtering its results all work with groups of things. In mathematics, a group like this is called a set.', show: 'title' },
        { say: 'In this video, you will learn what a set and its elements are, how to write them with symbols, and three ways to describe the same set.' },
      ],
    },
    {
      chapter: 'Sets and elements',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Set and element', md: 'A **set** is a collection of distinct objects. Each object in a set is an **element** of the set.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['A = \\{1, 2, 3, 4, 6, 12\\}', '3 \\in A \\qquad 5 \\notin A', 'n(A) = 6'] },
      ],
      lines: [
        { say: 'A set is a collection of distinct objects. Distinct means different from each other: no object appears twice. Each object in a set is called an element of the set.', show: 'def' },
        { say: 'Sets are usually named with capital letters, and their elements are listed between curly brackets, called braces. Here, set A holds the numbers one, two, three, four, six and twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'To say that three is an element of A, write three, then a symbol shaped like a rounded letter E, then A. Read it as: three is an element of A.', show: 'm.1', focus: 'm.1' },
        { say: 'With a slash through the symbol, it means is not an element of. Five is not an element of A, because five is not in the list.', focus: 'm.1' },
        { say: 'The number of elements in a set has its own notation: the letter n, followed by the name of the set in brackets. Read it as n of A. Set A has six elements, so n of A equals six.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Three ways to describe a set',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Method', 'Example'],
          rows: [
            ['In words', '$A$ is the set of factors of 12'],
            ['As a list', '$A = \\{1, 2, 3, 4, 6, 12\\}$'],
            ['In set-builder notation', '$A = \\{x \\mid x \\text{ is a factor of } 12,\\ x \\in N\\}$'],
          ],
        },
        { kind: 'text', id: 'note', size: 'md', md: 'Each element is listed once, and order does not matter: $\\{3, 1, 2\\} = \\{1, 2, 3\\}$.' },
      ],
      lines: [
        { say: 'You can describe the same set in three ways. The first is in words: A is the set of factors of twelve. The factors of twelve are the numbers that divide twelve exactly.', show: 't.0', focus: 't.0' },
        { say: 'The second is as a list: A equals one, two, three, four, six, twelve, inside braces.', show: 't.1', focus: 't.1' },
        { say: 'The third is in set-builder notation, which describes the rule that every element follows. This one reads: the set of all x such that x is a factor of twelve, and x is a natural number. The next part of this lesson explains this notation fully.', show: 't.2', focus: 't.2' },
        { say: 'A list follows two rules. Each element is listed only once, and the order does not matter. Three, one, two, in braces, is the same set as one, two, three.', show: 'note', focus: 't' },
      ],
    },
    {
      chapter: 'Listing and counting',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Let $B$ be the set of prime numbers less than 20. List the elements of $B$ and find $n(B)$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Prime: exactly two factors, } 1 \\text{ and itself}', 'B = \\{2, 3, 5, 7, 11, 13, 17, 19\\}', 'n(B) = 8'] },
      ],
      lines: [
        { say: 'Let’s try one. Let B be the set of prime numbers less than twenty. List the elements of B, and find n of B.', show: 'p' },
        { say: 'A prime number has exactly two factors: one and itself. So one is not prime, because it has only one factor.', show: 'm.0', focus: 'm.0' },
        { say: 'Go through the numbers below twenty. Two, three, five, seven, eleven, thirteen, seventeen and nineteen are prime. Four, six, eight, nine and the rest each have more than two factors.', show: 'm.1', focus: 'm.1' },
        { say: 'Now count the elements. There are eight, so n of B equals eight.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting an element twice', md: 'The word *banana* has six letters, but its set of letters is $\\{\\text{a}, \\text{b}, \\text{n}\\}$, with only **three** elements. A set lists each element once.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{n = 6} \\quad \\text{letters in the word}', '\\good{n = 3} \\quad \\text{elements in the set}'] },
      ],
      lines: [
        { say: 'A common mistake is to count an element more than once. What is the set of letters in the word banana, and how many elements does it have?', show: 'oops' },
        { say: 'Banana has six letters, so it is tempting to say six. But six counts the letters in the word, and several of them are the same letter.', show: 'm.0', focus: 'm.0' },
        { say: 'Only three letters are different: b, "a" and n. A set lists each element once, so the set of letters has three elements, and its n is three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $D$ be the set of even numbers between 1 and 15. Find $n(D)$.',
          choices: ['$15$', '$8$', '$7$', '$6$'],
          answer: 2,
          working: '$D = \\{2, 4, 6, 8, 10, 12, 14\\}$, so $n(D) = 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Let D be the set of even numbers between one and fifteen. Find n of D. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, seven. The even numbers between one and fifteen are two, four, six, eight, ten, twelve and fourteen: seven elements. Choice A, fifteen, counts every number up to fifteen, not just the even ones.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A set is a collection of distinct objects, called its elements.', '$x \\in A$: $x$ is an element of $A$. $n(A)$ is the number of elements in $A$.', 'Describe a set in words, as a list, or in set-builder notation.'] }],
      lines: [
        { say: 'Let’s sum up. A set is a collection of distinct objects, called its elements.', show: 'sum.0' },
        { say: 'The symbol shaped like a rounded E means is an element of, and n of A is the number of elements in A.', show: 'sum.1' },
        { say: 'And you can describe a set in words, as a list, or in set-builder notation. In part two, we read set-builder notation, and meet the natural numbers, the whole numbers and the integers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
