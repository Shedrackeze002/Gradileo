import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-2-2-d',
  lessonId: 'm302-2-2',
  title: 'Permutations, Part 4: Working Backwards',
  thumbnailTitle: 'Working Backwards',
  summary: 'Finding the number of objects from a count: 90 ways to award first and second prize means n(n − 1) = 90, so n = 10 (the root −9 is rejected), and 7 is the smallest number of books with more than 1000 arrangements, because 6! = 720 and 7! = 5040.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 4', title: 'Working Backwards', subtitle: 'From a count to the number of objects' }],
      lines: [
        { say: 'Sometimes you already know how many arrangements there are, and you need to find how many objects there were.', show: 'title' },
        { say: 'In this video, you will solve an equation with n P two in it, and find the smallest number of objects that can be arranged in more than a thousand ways.' },
      ],
    },
    {
      chapter: 'How many projects?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A science fair awards a first prize and a second prize. There are 90 ways to award them. How many projects were entered?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{n}P_{2} = \\dfrac{n!}{(n - 2)!} = n(n - 1)', 'n(n - 1) = 90', '10 \\times 9 = 90, \\text{ so } n = 10'] },
      ],
      lines: [
        { say: 'A science fair awards a first prize and a second prize. There are ninety ways to award them. How many projects were entered?', show: 'p' },
        { say: 'Call the number of projects n. The prizes are different, so order matters: the number of ways is n P two.', show: 'm.0' },
        { say: 'Write n P two without factorials. n factorial over n minus two, factorial, cancels down to n times n minus one: n choices for first prize, then n minus one for second.', focus: 'm.0' },
        { say: 'So n times n minus one equals ninety.', show: 'm.1', focus: 'm.1' },
        { say: 'n and n minus one are consecutive whole numbers. Which two consecutive numbers multiply to ninety? Ten times nine is ninety, so n equals ten projects.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Solving the quadratic',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['n^2 - n = 90', 'n^2 - n - 90 = 0', '(n - 10)(n + 9) = 0', 'n = 10 \\quad \\text{or} \\quad \\bad{n = -9}'] }],
      lines: [
        { say: 'You can also solve it as a quadratic equation. Expand n times n minus one to get n squared minus n equals ninety.', show: 'm.0', focus: 'm.0' },
        { say: 'Move ninety to the left side: n squared minus n minus ninety equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Factor: n minus ten, times n plus nine, equals zero. Check: negative ten times nine is negative ninety, and negative ten plus nine is negative one.', show: 'm.2', focus: 'm.2' },
        { say: 'So n is ten or negative nine. The number of projects cannot be negative, so reject negative nine. There were ten projects.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'More than a thousand orders',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'What is the smallest number of different books that can be arranged on a shelf in more than 1000 ways?' },
        { kind: 'table', id: 't', head: ['Books, $n$', 'Arrangements, $n!$', 'More than 1000?'], rows: [['$4$', '$24$', 'no'], ['$5$', '$120$', 'no'], ['$6$', '$720$', 'no'], ['$7$', '$5040$', '**yes**']] },
      ],
      lines: [
        { say: 'Here is a different kind of question. What is the smallest number of different books that can be arranged on a shelf in more than a thousand ways?', show: 'p' },
        { say: 'All the books are arranged, so n books can be arranged in n factorial ways. Try values of n.', show: 't' },
        { say: 'Four factorial is twenty-four, and five factorial is 120: both far too small.', focus: ['t.0', 't.1'] },
        { say: 'Six factorial is 720. That is closer, but it is not more than a thousand.', focus: 't.2' },
        { say: 'Seven factorial is 5,040, which is more than a thousand. So the smallest number of books is seven.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Factorials grow fast',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Factorials grow fast', md: '$10! = 3\\,628\\,800$, and $13!$ is over 6 billion. A calculator’s $n!$ key helps, but cancelling first keeps the numbers small.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['7! = 7 \\times 6! = 7 \\times 720 = 5040', '8! = 8 \\times 7! = 40\\,320'] },
      ],
      lines: [
        { say: 'Notice how quickly the factorials jumped, from 720 straight to 5,040. Each new factorial multiplies the one before it by the next number.', show: 'm.0', focus: 'm.0' },
        { say: 'Eight factorial is eight times that again: 40,320. Ten factorial is more than three and a half million, and thirteen factorial is over six billion.', show: ['m.1', 'tip'], focus: 'm.1' },
        { say: 'A calculator’s factorial key helps with numbers like these, but cancelling first keeps the numbers small.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keeping a root that cannot be a count', md: 'Solving $n(n - 1) = 90$ gives $n = 10$ or $n = -9$. A number of objects is a whole number, so a negative root is always rejected.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\good{n = 10}', '\\bad{n = -9} \\quad \\text{not a count}'] },
      ],
      lines: [
        { say: 'A common mistake is to give both roots of the quadratic as answers. The equation has two solutions, ten and negative nine.', show: ['oops', 'm.0', 'm.1'] },
        { say: 'But n counts projects, so it must be a whole number. Negative nine projects makes no sense, so it is rejected, and the answer is ten.', focus: 'm.0' },
        { say: 'Always check that your answer fits the question: a count of objects can never be negative or a fraction.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'There are 56 ways to award a first prize and a second prize to the people in a contest. How many people entered?',
          choices: ['$7$', '$28$', '$56$', '$8$'],
          answer: 3,
          working: '$n(n - 1) = 56$, and $8 \\times 7 = 56$, so $n = 8$. (The other root, $n = -7$, is rejected.)',
        },
      ],
      lines: [
        { say: 'Your turn. There are fifty-six ways to award a first prize and a second prize to the people in a contest. How many people entered? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, eight. n times n minus one equals fifty-six, and eight times seven is fifty-six, so n is eight. Choice A, seven, is the second factor, n minus one, not n.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['${}_{n}P_{2} = n(n - 1)$: set it equal to the count and solve.', 'A count cannot be negative, so reject a negative root.', 'Factorials grow fast: try values of $n$ until $n!$ passes the target.'] }],
      lines: [
        { say: 'Let’s sum up. n P two equals n times n minus one. Set it equal to the count, and solve.', show: 'sum.0' },
        { say: 'A count cannot be negative, so reject a negative root.', show: 'sum.1' },
        { say: 'And factorials grow fast, so try values of n until n factorial passes the target. In the next lesson, we arrange objects that are identical, or that must follow rules. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
