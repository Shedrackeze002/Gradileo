import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-1 lesson 9.1 (the fundamental counting principle). The question is an
// exercise from OpenStax College Algebra 2e, word for word (section 13.5, Counting Principles, CC
// BY-NC-SA 4.0). A T-shirt is one size (4 ways), one cotton (2 ways) and one colour (5 ways), so by
// the multiplication principle there are 4 × 2 × 5 = 40 T-shirts, as in the book's answer. The
// check lists all 40 in a table: 8 rows of size and cotton, 5 columns of colour.

const COLOURS = ['white', 'black', 'gray', 'blue', 'red'];
const ROWS = ['S', 'M', 'L', 'XL'].flatMap((s) => [`${s}, organic`, `${s}, non-organic`]);

const QUESTION =
  'A wholesale T-shirt company offers sizes small, medium, large, and extra-large in organic or non-organic cotton and colors white, black, gray, blue, and red. How many different T-shirts are there to choose from?';

const video: Explainer = {
  id: 'xq-m301-9-1',
  lessonId: '',
  exam: {
    lesson: 'm301-9-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 13.5, Counting Principles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/13-5-counting-principles',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Different T-Shirts? (The Fundamental Counting Principle)',
  thumbnailTitle: 'How Many Different T-Shirts?',
  thumbnail: 'all',
  summary:
    'A real test question, solved one small step at a time: a T-shirt company offers 4 sizes, 2 kinds of cotton and 5 colours. How many different T-shirts are there? Each T-shirt is one choice from each list, so by the fundamental counting principle there are 4 × 2 × 5 = 40. Then we check by listing all 40 in a table and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Different T-Shirts?', subtitle: 'The fundamental counting principle, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about counting. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          answer: '$4 \\times 2 \\times 5 = 40$ T-shirts',
          working: 'One size, one cotton and one colour: multiply the numbers of choices.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'A wholesale T-shirt company offers sizes small, medium, large, and extra-large in organic or non-organic cotton and colors white, black, gray, blue, and red. How many different T-shirts are there to choose from?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Every T-shirt has **one** size **and** **one** cotton **and** **one** colour. Two T-shirts are different if **any** of the three is different.' }],
      lines: [
        { say: 'Every T-shirt has one size, and one kind of cotton, and one colour.', show: 't' },
        { say: 'Two T-shirts count as different if any of those three things is different. We need to count them all.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'fcp', tone: 'key', title: 'The fundamental counting principle', md: 'If one choice can be made in $m$ ways **and** a second in $n$ ways, together they can be made in $m \\times n$ ways. It works for any number of choices.' },
        { kind: 'callout', id: 'or', tone: 'tip', title: 'And or or?', md: '**And** (one from each list): **multiply**. **Or** (one from one list only): add.' },
      ],
      lines: [
        { say: 'Here is what we need. The fundamental counting principle. If one choice can be made in m ways, and a second in n ways, then together they can be made in m times n ways. It works for any number of choices.', show: 'fcp' },
        { say: 'The key word is "and". When we pick one from each list, we multiply. Adding is for "or", when we pick from just one list.', show: 'or' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the choices in **each** list', '**Multiply** them', '**Check** by listing them'] }],
      lines: [
        { say: 'Here is the plan. First, count the choices in each list.', show: 'plan.0' },
        { say: 'Second, multiply them.', show: 'plan.1' },
        { say: 'Third, check by listing them all.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Count each list',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'lists',
          head: ['Choice', 'Options', 'Ways'],
          rows: [
            ['size', 'small, medium, large, extra-large', '$\\good{4}$'],
            ['cotton', 'organic, non-organic', '$\\good{2}$'],
            ['colour', 'white, black, gray, blue, red', '$\\good{5}$'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. There are 4 sizes: small, medium, large and extra-large.', show: 'lists' },
        { say: 'There are 2 kinds of cotton: organic and non-organic.' },
        { say: 'And there are 5 colours: white, black, gray, blue and red.' },
      ],
    },
    {
      chapter: 'Step 2: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times 2 = 8 \\ \\text{(size and cotton)}', '8 \\times 5 = \\good{40} \\ \\text{T-shirts}'] }],
      lines: [
        { say: 'Step two. Each T-shirt is a size and a cotton and a colour, so we multiply. 4 sizes times 2 cottons is 8 pairs.', show: 'm.0' },
        { say: 'Each of those 8 comes in 5 colours: 8 times 5 is 40. There are 40 different T-shirts.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'table', id: 'all', head: ['', ...COLOURS], rows: ROWS.map((r, i) => [r, ...COLOURS.map((_, j) => `${i * 5 + j + 1}`)]) }],
      lines: [
        { say: 'Let us check by listing them all. Each row is one size and one cotton: 8 rows. Each column is one colour: 5 columns.', show: 'all' },
        { say: 'Every box is one T-shirt, and numbering them gives 1 up to 40. It checks out.' },
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
            ['$4 + 2 + 5 = 11$', 'a T-shirt has a size **and** a cotton **and** a colour: multiply'],
            ['$4 \\times 5 = 20$', 'every list counts: do not forget the **cotton**'],
            ['listing by hand', 'easy to miss one: use the **principle**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Adding gives 11, but that counts picking just a size, or just a colour. A T-shirt has all three, so we multiply.' },
        { say: 'Use every list. Forgetting the cotton gives only 20.' },
        { say: 'And listing by hand is slow and easy to get wrong. The counting principle gets it in one line.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A lunch special lets you choose one of $3$ sandwiches, one of $4$ drinks and one of $2$ desserts. How many different lunches are possible?',
          choices: ['$9$', '$12$', '$18$', '$24$'],
          answer: 3,
          working: 'One from each list: $3 \\times 4 \\times 2 = 24$.',
        },
      ],
      lines: [
        { say: 'Your turn. A lunch special lets you choose one of 3 sandwiches, one of 4 drinks and one of 2 desserts. How many different lunches are possible? Pause the video and try it.', show: 'q2', wait: 7 },
        { say: 'One from each list, so multiply: 3 times 4 times 2 is 24: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Count the options in **each** list', 'One from each list (**and**): **multiply**', 'One from a single list (**or**): add', 'A table or tree can check a small count'] }],
      lines: [
        { say: 'Here is what to remember. Count the options in each list.', show: 'sum.0' },
        { say: 'When you choose one from each list, multiply.', show: 'sum.1' },
        { say: 'When you choose from just one list or another, add.', show: 'sum.2' },
        { say: 'And a table or a tree diagram can check a small count. For more on the fundamental counting principle, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
