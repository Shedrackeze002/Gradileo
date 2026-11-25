import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 4.2 (dividing with the standard algorithm). The question is a
// Try It from OpenStax Prealgebra 2e, word for word (section 1.5, Divide Whole Numbers, CC BY-NC-SA
// 4.0). 135 ÷ 9: 9 goes into 13 once, remainder 4; bring down 5 to make 45; 9 goes into 45 five
// times, remainder 0. So 135 ÷ 9 = 15 cups, as in the book's answer. Check: 15 × 9 = 135.

const QUESTION =
  'Marcus is setting out animal crackers for snacks at the preschool. He wants to put 9 crackers in each cup. One box of animal crackers contains 135 crackers. How many cups can he fill from one box of crackers?';

const video: Explainer = {
  id: 'xq-m5-4-2',
  lessonId: '',
  exam: {
    lesson: 'm5-4-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 1.5, Divide Whole Numbers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/1-5-divide-whole-numbers',
    question: QUESTION,
  },
  title: 'Exam Question: Filling Cups With Animal Crackers (Dividing)',
  thumbnailTitle: 'How Many Cups Can He Fill?',
  summary:
    'A real test question, solved one small step at a time: Marcus puts 9 animal crackers in each cup, and a box holds 135. How many cups can he fill? Sharing into groups of 9 means dividing: 135 ÷ 9. With long division, 9 goes into 13 once with 4 left, and into 45 five times, so he can fill 15 cups. Then we check by multiplying and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Cups Can He Fill?', subtitle: 'Long division, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about dividing. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Marcus is setting out animal crackers for snacks at the preschool. He wants to put $9$ crackers in each cup. One box of animal crackers contains $135$ crackers. How many cups can he fill from one box of crackers?',
          answer: '$15$ cups',
          working: '135 ÷ 9 = 15',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Marcus is setting out animal crackers for snacks at a preschool. He wants to put 9 crackers in each cup. One box has 135 crackers. How many cups can he fill from one box?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Groups of 9', md: 'Each cup is a **group of $9$** crackers. We want to know how many groups of $9$ there are in $135$. That is **division**: $135 \\div 9$.' }],
      lines: [
        { say: 'Each cup is a group of 9 crackers.', show: 'c' },
        { say: 'We want to know how many groups of 9 fit into 135. Finding how many groups is division: 135 divided by 9.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'k', items: ['**Divide**: how many times does $9$ go in?', '**Multiply** and **subtract** to find what is left', '**Bring down** the next digit, and repeat'] }],
      lines: [
        { say: 'Here is what we need. Long division works one digit at a time, from the left. First, divide: how many times does 9 go in?', show: 'k.0' },
        { say: 'Then multiply, and subtract, to find what is left over.', show: 'k.1' },
        { say: 'Then bring down the next digit, and repeat until there are no digits left.', show: 'k.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Divide $9$ into **$13$**', 'Bring down the $5$ and divide into **$45$**', '**Check** by multiplying'] }],
      lines: [
        { say: 'Here is the plan. 9 does not go into 1, so start by dividing 9 into 13.', show: 'plan.0' },
        { say: 'Bring down the 5, and divide 9 into what we have.', show: 'plan.1' },
        { say: 'Then check by multiplying.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Divide',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'math', id: 'ld', size: 'lg', lines: ['\\begin{array}{r} 15 \\\\ 9 \\overline{)\\,135} \\\\ -\\,9\\phantom{5} \\\\ \\hline 45 \\\\ -\\,45 \\\\ \\hline 0 \\end{array}'] }],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['13 \\div 9 = 1 \\text{ R } 4', '45 \\div 9 = 5 \\text{ R } 0', '135 \\div 9 = \\good{15}'] }],
      lines: [
        { say: 'Here is the long division.', show: 'ld' },
        { say: 'Step one. 9 goes into 13 one time. Write 1 above the 3. 1 times 9 is 9, and 13 minus 9 leaves 4.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Bring down the 5, next to the 4, to make 45. 9 goes into 45 five times. Write 5 above the 5. 5 times 9 is 45, and 45 minus 45 leaves 0.', show: 'm.1', focus: 'm.1' },
        { say: 'There are no digits left, and nothing left over. 135 divided by 9 is 15. Marcus can fill 15 cups.', show: 'm.2', focus: ['m.2', 'ld'] },
      ],
    },
    {
      chapter: 'Step 3: Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['15 \\times 9 = 135 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by multiplying. 15 cups, with 9 crackers in each, is 15 times 9, which is 135 crackers. That is exactly one box. It checks out.', show: 'm', focus: 'm' },
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
            ['$1{,}215$', '**multiplied** $135 \\times 9$: groups of $9$ means **divide**'],
            ['$1$ cup with $45$ left', 'stopped too soon: **bring down** every digit'],
            ['$126$', '**subtracted** one group of $9$: divide to count **all** the groups'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '1 thousand 215 multiplies 135 by 9. But a box cannot fill more cups than it has crackers. Groups of 9 means divide.', caption: '1,215 multiplies 135 by 9. But a box cannot fill more cups than it has crackers. Groups of 9 means divide.' },
        { say: 'Stopping after the first step gives 1. Keep bringing down digits until none are left.' },
        { say: 'And 126 takes away just one cup of 9 crackers. Dividing counts how many groups of 9 fit, all at once.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A coach shares $168$ tennis balls equally into $8$ buckets. How many balls go in each bucket?',
          choices: ['$20$', '$1{,}344$', '$21$', '$176$'],
          answer: 2,
          working: '16 ÷ 8 = 2, then 8 ÷ 8 = 1: 21. Check: 21 × 8 = 168.',
        },
      ],
      lines: [
        { say: 'Your turn. A coach shares 168 tennis balls equally into 8 buckets. How many balls go in each bucket? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '8 goes into 16 two times, with nothing left. Bring down the 8: 8 goes into 8 once. So it is 21 balls in each bucket, and 21 times 8 is 168. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Groups of the same size: **divide**', '**Divide, multiply, subtract, bring down**', 'Write each digit **above** its place', '**Check** by multiplying'] }],
      lines: [
        { say: 'Here is what to remember. Making groups of the same size means divide.', show: 'sum.0' },
        { say: 'Long division repeats four steps: divide, multiply, subtract, bring down.', show: 'sum.1' },
        { say: 'Write each digit of the answer above its place.', show: 'sum.2' },
        { say: 'And check by multiplying back. For more on dividing, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
