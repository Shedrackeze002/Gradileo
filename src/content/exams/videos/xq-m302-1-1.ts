import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 1.1 (sets and subsets). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 1.2, Subsets, CC BY-NC-SA 4.0), keeping
// the book's spelling of the names. T has 9 members, and a subset either takes or leaves each one,
// so there are 2^9 = 512 subsets, as in the book's solution. The check lists the 4 subsets of a
// set with 2 members.

const QUESTION =
  'Compute the total number of subsets in the set of the top nine tennis grand slam singles winners, T = {Margaret Court, Serena Williams, Steffi Graff, Rafael Nadal, Novak Djokovic, Roger Federer, Helen Wills, Martina Navratilova, Chris Everett}.';

const video: Explainer = {
  id: 'xq-m302-1-1',
  lessonId: '',
  exam: {
    lesson: 'm302-1-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 1.2, Subsets',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/1-2-subsets',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Subsets Does a Set of 9 Have? (Sets and Subsets)',
  thumbnailTitle: 'How Many Subsets?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: how many subsets does a set of nine tennis champions have? A subset either takes or leaves each member, so there are 2 choices for each of the 9 members, and 2^9 = 512 subsets in all, counting the empty set and the whole set. Then we check the rule on a set of two and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Subsets?', subtitle: 'Sets and subsets, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about sets and subsets. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: QUESTION,
          answer: '$2^9 = 512$ subsets',
          working: '$n(T) = 9$, and each member is either in or out of a subset: $2^9$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'Compute the total number of subsets in the set of the top nine tennis grand slam singles winners. T is the set: Margaret Court, Serena Williams, Steffi Graff, Rafael Nadal, Novak Djokovic, Roger Federer, Helen Wills, Martina Navratilova, and Chris Everett.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'A **subset** of $T$ is any selection of its members: none of them, some of them, or **all** of them. How many different selections are there?' }],
      lines: [
        { say: 'A subset of T is any selection of its members. It can hold none of them, some of them, or all of them.', show: 't' },
        { say: 'We need to count how many different selections there are.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'sub', tone: 'definition', title: 'Subset', md: '$A \\subseteq B$ when every member of $A$ is also in $B$. The empty set $\\varnothing$ and $B$ itself are subsets of $B$.' },
        { kind: 'callout', id: 'count', tone: 'key', title: 'Counting subsets', md: 'A set with $n$ members has $2^n$ subsets.' },
      ],
      lines: [
        { say: 'Here is what we need. A is a subset of B when every member of A is also in B. The empty set, and B itself, both count as subsets of B.', show: 'sub' },
        { say: 'And a set with n members has 2 to the power n subsets. We will see why in a moment.', show: 'count' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the **members** of $T$', 'Each member: **in** or **out**', 'Multiply the choices: $2^n$'] }],
      lines: [
        { say: 'Here is the plan. First, count the members of T.', show: 'plan.0' },
        { say: 'Second, notice that a subset either takes each member or leaves it out.', show: 'plan.1' },
        { say: 'Third, multiply the choices together.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Count the members',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'names', items: ['Margaret Court, Serena Williams, Steffi Graff', 'Rafael Nadal, Novak Djokovic, Roger Federer', 'Helen Wills, Martina Navratilova, Chris Everett'] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n(T) = \\good{9}'] },
      ],
      lines: [
        { say: 'Step one. Count the names: 3 in each row, and 3 rows.', show: 'names' },
        { say: 'So T has 9 members. We write n of T equals 9.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Step 2: In or out',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{each member: in or out} \\Rightarrow 2 \\text{ choices}', '\\underbrace{2 \\times 2 \\times \\cdots \\times 2}_{9 \\text{ members}} = 2^9'] }],
      lines: [
        { say: 'Step two. To build a subset, go through the members one at a time. Each one is either in the subset or out of it: 2 choices.', show: 'm.0' },
        { say: 'By the fundamental counting principle, the choices multiply: 2 times 2 times 2, once for each of the 9 members. That is 2 to the power 9.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Work it out',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2^9 = 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2', '= \\good{512} \\ \\text{subsets}'] }],
      lines: [
        { say: 'Step three. 2 to the power 9 is 2 multiplied by itself 9 times.', show: 'm.0' },
        { say: 'That is 512. So T has 512 subsets, including the empty set and T itself.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['S = \\{\\text{heads, tails}\\}: \\ 2^2 = 4', '\\varnothing, \\ \\{\\text{heads}\\}, \\ \\{\\text{tails}\\}, \\ \\{\\text{heads, tails}\\} \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Let us check the rule on a set small enough to list: the two sides of a coin, heads and tails. The rule says 2 to the power 2, which is 4.', show: 'm.0' },
        { say: 'Listing them: the empty set, just heads, just tails, and both. Exactly 4. So the rule works.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$9$', 'that counts the **members**, not the subsets'],
            ['$2 \\times 9 = 18$', 'the choices **multiply**: $2^9$, not $2 \\times 9$'],
            ['$511$', 'the **empty set** is a subset too'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '9 is the number of members, not the number of subsets.' },
        { say: '2 times 9 adds up the choices. They multiply, so it is 2 to the power 9.' },
        { say: 'And do not leave out the empty set, or the whole set. Both are subsets, so the answer is 512.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How many subsets does the set $\\{1, 2, 3, 4, 5\\}$ have?',
          choices: ['$25$', '$32$', '$10$', '$31$'],
          answer: 1,
          working: '$5$ members, each in or out: $2^5 = 32$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many subsets does the set 1, 2, 3, 4, 5 have? Pause the video and try it.', show: 'q2', wait: 7 },
        { say: 'There are 5 members, each in or out, so 2 to the power 5, which is 32: choice B. 31 would leave out the empty set.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A subset takes **some**, **none** or **all** of the members', 'Each member is **in** or **out**: $2$ choices', 'A set with $n$ members has $2^n$ subsets', 'Check on a small set you can list'] }],
      lines: [
        { say: 'Here is what to remember. A subset can take some, none or all of the members.', show: 'sum.0' },
        { say: 'Each member is either in or out, which is 2 choices.', show: 'sum.1' },
        { say: 'So a set with n members has 2 to the power n subsets.', show: 'sum.2' },
        { say: 'And check the rule on a small set you can list. For more on sets and subsets, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
