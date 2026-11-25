import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 7.2 (algebraic expressions). The question is an Exercise from
// OpenStax Prealgebra 2e, word for word (section 2.2, Evaluate, Simplify, and Translate Expressions,
// CC BY-NC-SA 4.0). The skirt costs $15 more than the blouse, which costs b dollars, so the skirt
// costs b + 15 dollars, as in the book's answer. Check with a made-up price: a $20 blouse means a
// $35 skirt, and 20 + 15 = 35.

const QUESTION =
  'Adele bought a skirt and a blouse. The skirt cost $15 more than the blouse. Let b represent the cost of the blouse. Write an expression for the cost of the skirt.';

const video: Explainer = {
  id: 'xq-m5-7-2',
  lessonId: '',
  exam: {
    lesson: 'm5-7-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 2.2, Evaluate, Simplify, and Translate Expressions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-2-evaluate-simplify-and-translate-expressions',
    question: QUESTION,
  },
  title: 'Exam Question: A Skirt That Costs $15 More (Algebraic Expressions)',
  thumbnailTitle: 'Write It With a Letter',
  summary:
    'A real test question, solved one small step at a time: Adele\'s skirt cost $15 more than her blouse, and the blouse cost b dollars. Write an expression for the cost of the skirt. "More than" means add, so the skirt costs b + 15. Then we check by trying a price for the blouse, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Write It With a Letter', subtitle: 'Algebraic expressions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about writing an expression with a letter. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Adele bought a skirt and a blouse. The skirt cost \\$15 more than the blouse. Let $b$ represent the cost of the blouse. Write an expression for the cost of the skirt.',
          answer: '$b + 15$',
          working: '"$15 more than b" means b + 15',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Adele bought a skirt and a blouse. The skirt cost 15 dollars more than the blouse. Let the letter b stand for the cost of the blouse. Write an expression for the cost of the skirt.', caption: 'Adele bought a skirt and a blouse. The skirt cost $15 more than the blouse. Let b represent the cost of the blouse. Write an expression for the cost of the skirt.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Variable and expression', md: 'We do not know the price of the blouse, so the letter **$b$** stands for it. A letter that stands for a number is a **variable**. An **expression** uses numbers, letters and operations, like $b + 2$, with **no** equals sign.' }],
      lines: [
        { say: 'We do not know what the blouse cost, so the letter b stands for its price. A letter that stands for a number is called a variable.', show: 'c' },
        { say: 'An expression is made of numbers, letters and operations, like b plus 2, with no equals sign. We need one for the price of the skirt.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Words', 'Operation', 'Example'],
          rows: [
            ['**more than**, plus, increased by', 'add', '$5$ more than $n$: $n + 5$'],
            ['**less than**, minus, decreased by', 'subtract', '$5$ less than $n$: $n - 5$'],
            ['**times**, twice', 'multiply', 'twice $n$: $2n$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need: words that tell us which operation to use. More than, plus, and increased by all mean add.', show: 't', focus: 't.0' },
        { say: 'Less than, minus, and decreased by all mean subtract.', focus: 't.1' },
        { say: 'And times, or twice, mean multiply.', focus: 't.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Start with the **blouse**: $b$', 'Find the **key words**: "more than"', 'Write the **expression**'] }],
      lines: [
        { say: 'Here is the plan. Start with what we call b: the price of the blouse.', show: 'plan.0' },
        { say: 'Find the key words that compare the skirt with the blouse.', show: 'plan.1' },
        { say: 'Then write the expression.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The expression',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{blouse} = b', '\\text{skirt} = \\$15 \\text{ more than the blouse}', '\\text{skirt} = \\good{b + 15}'] }],
      lines: [
        { say: 'Step one. The blouse costs b dollars.', show: 'm.0' },
        { say: 'Step two. The skirt cost 15 dollars more than the blouse. More than means add.', caption: 'Step two. The skirt cost $15 more than the blouse. "More than" means add.', show: 'm.1' },
        { say: 'Step three. So we add 15 to the price of the blouse. The skirt costs b plus 15 dollars.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{If } b = 20: \\quad b + 15 = 20 + 15 = 35', '\\$35 \\text{ is } \\$15 \\text{ more than } \\$20 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by trying a price. Suppose the blouse cost 20 dollars. Then b plus 15 is 20 plus 15, which is 35.', show: 'm.0' },
        { say: 'And a 35 dollar skirt is indeed 15 dollars more than a 20 dollar blouse. It checks out.', caption: 'And a $35 skirt is indeed $15 more than a $20 blouse. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$b - 15$', 'the skirt costs **more**, so **add**'],
            ['$15b$', 'that means $15$ **times** $b$'],
            ['$b + 15 = $ skirt', 'fine as a sentence, but an expression has **no** equals sign'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'b minus 15 would make the skirt cheaper than the blouse. The skirt costs more, so add.' },
        { say: '15 b means 15 times b, which would make the skirt 15 times the price of the blouse.' },
        { say: 'And the question asks for an expression, so the answer is just b plus 15, with no equals sign.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Mia is $3$ years younger than her brother. Let $a$ be her brother’s age. Which expression gives Mia’s age?',
          choices: ['$a + 3$', '$a - 3$', '$3a$', '$3 - a$'],
          answer: 1,
          working: 'Younger means less: 3 less than a is a − 3.',
        },
      ],
      lines: [
        { say: 'Your turn. Mia is 3 years younger than her brother. Let a be her brother\'s age. Which expression gives Mia\'s age? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Younger means 3 less than her brother\'s age. 3 less than a is a minus 3. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A **variable** stands for a number', '"More than" means **add**', '"Less than" means **subtract**', '**Check** by trying a number'] }],
      lines: [
        { say: 'Here is what to remember. A variable is a letter that stands for a number.', show: 'sum.0' },
        { say: 'More than means add.', show: 'sum.1' },
        { say: 'Less than means subtract.', show: 'sum.2' },
        { say: 'And check your expression by trying a number. For more on algebraic expressions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
