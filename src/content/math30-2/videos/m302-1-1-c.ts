import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

/** Fractions between 0 and 1: there is always another one halfway between two of them. */
const fractions = numberLine({
  min: 0,
  max: 1,
  step: 0.125,
  every: 8,
  length: 12,
  points: [
    { id: 'half', value: 0.5, tex: '\\dfrac{1}{2}', tone: 'adj' },
    { id: 'quarter', value: 0.25, tex: '\\dfrac{1}{4}', tone: 'adj' },
    { id: 'mid', value: 0.375, tex: '\\dfrac{3}{8}', tone: 'good', below: true },
  ],
});

const video: Explainer = {
  id: 'm302-1-1-c',
  lessonId: 'm302-1-1',
  title: 'Sets and Subsets, Part 3: Finite, Infinite and Empty Sets',
  thumbnailTitle: 'Finite, Infinite and Empty Sets',
  thumbnail: 'fr',
  summary: 'Finite sets (the count ends), infinite sets such as N and the fractions between 0 and 1, and the empty set ∅ = { } with n(∅) = 0. Which of three sets is empty, and why {0} is not the empty set. Part 4 meets the universal set and subsets.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 3', title: 'Finite, Infinite and Empty Sets', subtitle: 'How many elements can a set have?' }],
      lines: [
        { say: 'Some sets have a handful of elements. Some have more elements than anyone could ever count. And one special set has no elements at all.', show: 'title' },
        { say: 'In this video, you will sort sets into finite and infinite, meet the empty set, and see why the set containing zero is not empty.' },
      ],
    },
    {
      chapter: 'Finite and infinite sets',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Finite and infinite sets', md: 'A **finite set** has a countable number of elements: if you counted them, the count would end. An **infinite set** has an unlimited number of elements.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\{1, 2, 3, 4, 6, 12\\} \\quad \\text{finite}', '\\text{the people living on Earth} \\quad \\text{finite}', 'N = \\{1, 2, 3, \\ldots\\} \\quad \\text{infinite}'] },
      ],
      lines: [
        { say: 'A finite set has a countable number of elements: if you counted them one by one, the count would end. The set of factors of twelve is finite, with six elements.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'A finite set can be very large. The set of people living on Earth has billions of elements. But it is still finite: a count of them would end.', show: 'm.1', focus: 'm.1' },
        { say: 'An infinite set has an unlimited number of elements. The natural numbers are infinite: after any number, there is always a next one. The set of even integers is infinite too.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Always another fraction',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'The set of fractions between $0$ and $1$ is infinite: between any two of them, there is always another one.' },
        figure('fr', [fractions], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1}{4} < \\dfrac{3}{8} < \\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Here is a surprising infinite set: the fractions between zero and one. They all fit between two numbers, yet there are infinitely many of them.', show: ['p', 'fr.axis'] },
        { say: 'Take any two of them, say one quarter and one half.', show: ['fr.quarter', 'fr.half'], focus: ['fr.quarter', 'fr.half'] },
        { say: 'Halfway between them is another fraction: three eighths. And between three eighths and one half, there is another, and so on forever.', show: ['fr.mid', 'm.0'], focus: ['fr.mid', 'm.0'] },
        { say: 'Because there is always another fraction between any two, a count of them would never end. So the set is infinite.' },
      ],
    },
    {
      chapter: 'The empty set',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The empty set', md: 'The **empty set** has no elements. It is written $\\{\\ \\}$ or $\\varnothing$, and $n(\\varnothing) = 0$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\{\\ \\} = \\varnothing', 'n(\\varnothing) = 0'] },
      ],
      lines: [
        { say: 'One set has no elements at all: the empty set.', show: 'def' },
        { say: 'It is written as a pair of braces with nothing between them, or as a circle with a slash through it.', show: 'm.0', focus: 'm.0' },
        { say: 'Because it has no elements, n of the empty set is zero.', show: 'm.1', focus: 'm.1' },
        { say: 'For example, the set of months with thirty-two days is empty, because no month has thirty-two days. So is the set of natural numbers less than one.' },
      ],
    },
    {
      chapter: 'Empty or not?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Which of these sets is empty?' },
        {
          kind: 'table',
          id: 't',
          head: ['Set', 'Elements', 'Empty?'],
          rows: [
            ['(a) the even prime numbers', '$\\{2\\}$', 'no'],
            ['(b) the months with 32 days', '$\\{\\ \\}$', '**yes**'],
            ['(c) $\\{0\\}$', 'one element: $0$', 'no'],
          ],
        },
      ],
      lines: [
        { say: 'Which of these sets is empty? The set of even prime numbers, the set of months with thirty-two days, or the set containing zero?', show: 'p' },
        { say: 'Two is even, and two is prime, because its only factors are one and two. So the set of even prime numbers contains two, and it is not empty.', show: 't.0', focus: 't.0' },
        { say: 'No month has thirty-two days, so that set has no elements. It is the empty set.', show: 't.1', focus: 't.1' },
        { say: 'And the set containing zero has one element: the number zero. So it is not empty either. Only the second set is empty.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The set {0} is not empty', md: '$\\{0\\}$ has one element, so $n(\\{0\\}) = 1$. Write the empty set as $\\{\\ \\}$ or $\\varnothing$, never as $\\{0\\}$ or $\\{\\varnothing\\}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\{0\\}} \\quad n = 1', '\\bad{\\{\\varnothing\\}} \\quad n = 1', '\\good{\\{\\ \\} = \\varnothing} \\quad n = 0'] },
      ],
      lines: [
        { say: 'A common mistake is to write the empty set as braces with a zero inside. But zero is a number, and braces around it make a set with one element. So n of that set is one, not zero.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Writing the empty set symbol inside braces is also wrong. That makes a set whose one element is the empty set. Think of an empty box inside another box: the outer box is not empty, because it holds a box.', show: 'm.1', focus: 'm.1' },
        { say: 'So write the empty set as empty braces, or as the empty set symbol on its own, but never both together.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which set is empty?',
          choices: ['$\\{0\\}$', 'the set of even prime numbers', '$\\{x \\mid x > 5,\\ x \\in N\\}$', 'the set of natural numbers less than $1$'],
          answer: 3,
          working: 'The natural numbers start at $1$, so none of them is less than $1$. The other sets contain $0$, $2$ and $6, 7, 8, \\ldots$',
        },
      ],
      lines: [
        { say: 'Your turn. Which set is empty? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The natural numbers start at one, so none of them is less than one. Choice A, the set containing zero, has one element: the number zero. And choice C is infinite: six, seven, eight, and so on.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A finite set’s count ends; an infinite set has an unlimited number of elements.', 'The empty set, $\\varnothing$ or $\\{\\ \\}$, has no elements: $n(\\varnothing) = 0$.', '$\\{0\\}$ is not empty: it has one element.'] }],
      lines: [
        { say: 'Let’s sum up. If you counted the elements of a finite set, the count would end. An infinite set has an unlimited number of elements.', show: 'sum.0' },
        { say: 'The empty set has no elements, so n of the empty set is zero.', show: 'sum.1' },
        { say: 'And the set containing zero is not empty: it has one element. In part four, we put sets inside other sets, with the universal set, subsets and disjoint sets. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
