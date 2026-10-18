import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m302-2-counting.ts';

const video: Explainer = {
  id: 'm302-2-3',
  lessonId: 'm302-2-3',
  title: 'Permutations with Repetition and Restrictions, Part 1: Identical Objects',
  thumbnailTitle: 'Arranging Identical Objects',
  thumbnail: 'fl',
  summary: 'Arranging objects when some are identical: A, A and B give 3!/2! = 3 arrangements, because each one is counted 2! times. The formula n!/(a! b! …), and 3 red, 2 blue and 1 white flag make 6!/(3! 2!) = 60 signals. Part 2 places objects in fixed positions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 1', title: 'Arranging Identical Objects', subtitle: '$\\dfrac{n!}{a!\\,b!\\cdots}$' }],
      lines: [
        { say: 'Six signal flags hung on a pole can send 720 different messages, but only if every flag is a different colour. If three of the flags are red, many of those messages look exactly the same.', show: 'title' },
        { say: 'In this video, you will count the arrangements of objects that are identical, by dividing out the swaps that nobody can see.' },
      ],
    },
    {
      chapter: 'A, A and B',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'In how many ways can the letters A, A and B be arranged?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\adj{\\text{A}_1}\\opp{\\text{A}_2}\\text{B} \\quad \\opp{\\text{A}_2}\\adj{\\text{A}_1}\\text{B} \\;\\rightarrow\\; \\text{AAB}',
            '\\adj{\\text{A}_1}\\text{B}\\opp{\\text{A}_2} \\quad \\opp{\\text{A}_2}\\text{B}\\adj{\\text{A}_1} \\;\\rightarrow\\; \\text{ABA}',
            '\\text{B}\\adj{\\text{A}_1}\\opp{\\text{A}_2} \\quad \\text{B}\\opp{\\text{A}_2}\\adj{\\text{A}_1} \\;\\rightarrow\\; \\text{BAA}',
            '\\dfrac{3!}{2!} = \\dfrac{6}{2} = 3',
          ],
        },
      ],
      lines: [
        { say: 'Start small. In how many ways can the letters "A", "A" and B be arranged?', show: 'p' },
        { say: 'Pretend for a moment that the two A’s are different: "A" one and "A" two. Then there are three different letters, and three factorial, or six, arrangements.' },
        { say: 'But look at them in pairs. "A" one, "A" two, B, and "A" two, "A" one, B, look exactly the same once the labels are removed: both are "A", "A", B.', show: 'm.0', focus: 'm.0' },
        { say: 'The same happens with every arrangement. Each one appears twice, once for each order of the two A’s. That is two factorial times.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'So divide: three factorial over two factorial is six over two, which is three arrangements: "A", "A", B; "A", B, "A"; and B, "A", "A".', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The formula',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Arrangements with identical objects', md: 'The number of arrangements of $n$ objects, where $a$ are identical, $b$ are identical, and so on, is $\\dfrac{n!}{a!\\,b!\\cdots}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{n!}{a!\\,b!\\cdots}'] },
      ],
      lines: [
        { say: 'The same idea works for any objects. Suppose there are n objects in all, where "a" of them are identical, b of them are identical, and so on.', show: 'def' },
        { say: 'Arrange them as if they were all different: n factorial ways. Then divide by "a" factorial, the number of ways to swap the first group of identical objects among themselves. Then divide by b factorial for the second group, and so on.', show: 'm.0', focus: 'm.0' },
        { say: 'Each swap within a group changes nothing that you can see, so dividing removes exactly the repeated arrangements.' },
      ],
    },
    {
      chapter: 'Signal flags',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Three red, two blue and one white flag are hung one above another on a pole. Flags of the same colour look identical. How many different signals can be made using all six flags?' },
        figure('fl', [slots({ values: ['\\bad{\\text{R}}', '\\adj{\\text{B}}', '\\bad{\\text{R}}', '\\text{W}', '\\bad{\\text{R}}', '\\adj{\\text{B}}'], captions: [], size: 1.3, gap: 0.5 })], 160),
        { kind: 'math', id: 'm', size: 'md', lines: ['n = 6: \\quad \\bad{3} \\text{ red alike}, \\ \\adj{2} \\text{ blue alike}', '\\dfrac{6!}{3!\\,2!} = \\dfrac{720}{6 \\times 2} = 60'] },
      ],
      lines: [
        { say: 'Now the flags. Three red, two blue and one white flag are hung one above another on a pole. Flags of the same colour look identical. How many different signals can be made using all six flags?', show: 'p' },
        { say: 'Here is one possible signal. Swapping two of the red flags would give a signal that looks exactly the same.', show: ['fl.boxes', 'fl.values'], focus: 'fl.values' },
        { say: 'There are six flags in all, with three alike, the red ones, and two alike, the blue ones. The white flag is on its own.', show: 'm.0', focus: 'm.0' },
        { say: 'So divide six factorial by three factorial and by two factorial: 720 over six times two, which is 720 over twelve, or sixty signals.', show: 'm.1', focus: 'm.1' },
        { say: 'A group of one, like the white flag, can be left out of the bottom, because one factorial is just one.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using n! when objects are identical', md: '$6! = 720$ treats the three red flags as if they were different. Swapping two red flags does not change the signal, so you must divide.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{6! = 720}', '\\good{\\dfrac{6!}{3!\\,2!} = 60}'] },
      ],
      lines: [
        { say: 'A common mistake is to use n factorial, and say there are 720 signals.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'That treats the three red flags as if they were different, and the two blue flags too. But swapping two red flags does not change the signal. You must divide by the factorial of each group of identical objects, which leaves sixty.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many different arrangements of the letters in the word LETTER are there?',
          choices: ['$720$', '$360$', '$180$', '$90$'],
          answer: 2,
          working: 'LETTER has 6 letters, with two E’s and two T’s: $\\dfrac{6!}{2!\\,2!} = \\dfrac{720}{4} = 180$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many different arrangements of the letters in the word letter, spelled L, E, T, T, E, R, are there? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 180. The word has six letters, with two E’s and two T’s. So divide six factorial by two factorial twice: 720 over four is 180. Choice B, 360, divides by two factorial only once, but two different letters repeat.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Swapping identical objects gives an arrangement that looks the same.', 'Arrangements of $n$ objects with $a$ alike, $b$ alike, …: $\\dfrac{n!}{a!\\,b!\\cdots}$', 'Divide by the factorial of each group of identical objects.'] }],
      lines: [
        { say: 'Let’s sum up. Swapping identical objects gives an arrangement that looks the same, so n factorial counts it too many times.', show: 'sum.0' },
        { say: 'The number of arrangements of n objects with "a" alike, b alike, and so on, is n factorial over "a" factorial, b factorial, and so on.', show: 'sum.1' },
        { say: 'So divide by the factorial of each group of identical objects. In part two, we place objects that must go in fixed positions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
