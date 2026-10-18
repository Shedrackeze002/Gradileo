import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm303-5-2-b',
  lessonId: 'm303-5-2',
  title: 'Writing Linear Equations, Part 2: Using an Equation',
  thumbnailTitle: 'Using a Linear Equation',
  thumbnail: false,
  summary: 'Using a linear equation both ways: substitute x to find y (a phone plan C = 7.50g + 25 costs $70.00 for 6 GB), or substitute y and undo the operations in reverse order to find x (a driver paid P = 1.50n + 90 must deliver 100 packages to earn $240).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 2', title: 'Using an Equation', subtitle: 'Find y, or solve for x' }],
      lines: [
        { say: 'Once you have an equation, you can ask it two kinds of question. How much will it cost? And how many do I need?', show: 'title' },
        { say: 'In this video, you will use a linear equation to find a value of y, and to solve for a value of x.' },
      ],
    },
    {
      chapter: 'Two kinds of question',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Using an equation', md: 'To find $y$, **substitute** the value of $x$ and work it out.\n\nTo find $x$, substitute the value of $y$, then **solve** the equation for $x$.' },
      ],
      lines: [
        { say: 'There are two ways to use an equation like y equals m x, plus b.', show: 'key' },
        { say: 'To find y, substitute the value of x, which means putting the number in place of the letter, and work out the answer.' },
        { say: 'To find x, substitute the value of y instead. Then solve the equation to find x.' },
      ],
    },
    {
      chapter: 'A phone bill',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A phone plan costs $C = 7.50g + 25$ dollars a month, where $g$ is the gigabytes of data used. Find the bill for $6$ GB.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['C = 7.50(6) + 25', 'C = 45.00 + 25', 'C = 70.00'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The bill is \\$70.00.' },
      ],
      lines: [
        { say: 'A phone plan costs C equals 7.50 g, plus 25 dollars a month, where g is the number of gigabytes of data used. Find the bill for six gigabytes.', show: 'q' },
        { say: 'Here you know x, the data, so this is the first kind of question. Substitute six for g.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply first: 7.50 times six is 45 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add the 25 dollar monthly fee: 45 plus 25 is 70.', show: 'm.2', focus: 'm.2' },
        { say: 'So the bill for six gigabytes is 70 dollars.', show: 'a' },
      ],
    },
    {
      chapter: 'How many packages?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A delivery driver earns $P = 1.50n + 90$ dollars a day for $n$ packages. How many packages must the driver deliver to earn \\$240?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['240 = 1.50n + 90', '240 - 90 = 1.50n \\quad\\Rightarrow\\quad 150 = 1.50n', 'n = 150 \\div 1.50 = 100'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Check: $1.50(100) + 90 = 150 + 90 = 240$ ✓' },
      ],
      lines: [
        { say: 'A delivery driver earns P equals 1.50 n, plus 90 dollars a day, for n packages. How many packages must the driver deliver to earn 240 dollars?', show: 'q' },
        { say: 'This time you know y, the pay, and you want x, the packages. So substitute 240 for P.', show: 'm.0', focus: 'm.0' },
        { say: 'Now solve. Subtract 90 from both sides: 240 minus 90 is 150. So 150 equals 1.50 n.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide both sides by 1.50: 150 divided by 1.50 is 100. The driver must deliver 100 packages.', show: 'm.2', focus: 'm.2' },
        { say: 'Check by substituting back: 1.50 times 100 is 150, and 150 plus 90 is 240 dollars.', show: 'a' },
      ],
    },
    {
      chapter: 'Undo in reverse order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Undo in reverse order', md: 'The equation says “multiply by $1.50$, then add $90$”. To solve, undo those steps in reverse: subtract $90$, then divide by $1.50$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n \\xrightarrow{\\;\\times 1.50\\;} 1.50n \\xrightarrow{\\;+ 90\\;} P', '100 \\xleftarrow{\\;\\div 1.50\\;} 150 \\xleftarrow{\\;- 90\\;} 240'] },
      ],
      lines: [
        { say: 'Here is a way to remember the order of the steps. The equation builds P from n in two steps: first multiply by 1.50, then add 90.', show: ['tip', 'm.0'], focus: 'm.0' },
        { say: 'To go backwards, from P to n, undo those steps in reverse order. Start from 240, subtract 90 to get 150, then divide by 1.50 to get 100.', show: 'm.1', focus: 'm.1' },
        { say: 'It is like taking off your shoes and socks: the shoes went on last, so they come off first.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing first', md: 'Dividing $240$ by $1.50$ first, then subtracting $90$, undoes the steps in the wrong order.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{240 \\div 1.50 = 160, \\quad 160 - 90 = 70}', '\\text{check: } 1.50(70) + 90 = 195 \\ne 240'] },
      ],
      lines: [
        { say: 'A common mistake is to divide first. 240 divided by 1.50 is 160, and 160 minus 90 is 70 packages.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Check it, and it fails. Seventy packages earn 1.50 times 70, which is 105, plus 90: only 195 dollars, not 240.', show: 'm.1', focus: 'm.1' },
        { say: 'Always undo the adding before the multiplying, and always check your answer in the original equation.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rental van costs $C = 0.35d + 59$ dollars for $d$ kilometres. How far can you drive for \\$108?',
          choices: ['$249.6$ km', '$140$ km', '$96.8$ km', '$308.6$ km'],
          answer: 1,
          working: '$108 = 0.35d + 59$. Subtract $59$: $49 = 0.35d$. Divide by $0.35$: $d = 140$ km.',
        },
      ],
      lines: [
        { say: 'Your turn. A rental van costs C equals 0.35 d, plus 59 dollars, for d kilometres. How far can you drive for 108 dollars? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Set 108 equal to 0.35 d, plus 59. Subtract 59 to get 49, then divide by 0.35: d is 140 kilometres. Choice C substitutes 108 for the distance, instead of for the cost.', show: 'q.answer' },
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
          items: ['To find $y$, substitute $x$ and work it out.', 'To find $x$, substitute $y$ and solve: undo the steps in reverse order.', 'Check the answer in the original equation.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find y, substitute the value of x, and work it out.', show: 'sum.0' },
        { say: 'To find x, substitute the value of y and solve, undoing the steps in reverse order: subtract first, then divide.', show: 'sum.1' },
        { say: 'And check the answer in the original equation. In the next part, we write equations from tables and from two facts. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
