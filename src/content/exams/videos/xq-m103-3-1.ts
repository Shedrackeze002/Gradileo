import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-3 lesson 3.1 (SI units and converting within SI). The question is a
// Your Turn from OpenStax Contemporary Mathematics, word for word (section 9.1, The Metric System,
// CC BY-NC-SA 4.0). 250 doses × 5 mL = 1,250 mL, and 1,250 mL ÷ 1,000 = 1.25 L, as in the book's
// answer. Check: 1 L is 1,000 mL, enough for 200 doses, so 250 doses need a little more than 1 L.

const QUESTION = 'A hospital orders 250 doses of liquid amoxicillin. Each dose is 5 mL. How many liters of amoxicillin did the hospital order?';

const video: Explainer = {
  id: 'xq-m103-3-1',
  lessonId: '',
  exam: {
    lesson: 'm103-3-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 9.1, The Metric System',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/9-1-the-metric-system',
    question: QUESTION,
  },
  title: 'Exam Question: 250 Doses of 5 mL, in Litres (SI Units)',
  thumbnailTitle: 'Millilitres to Litres',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a hospital orders 250 doses of liquid amoxicillin, each 5 mL. How many litres is that? We multiply to get 1,250 mL, then use 1 L = 1,000 mL and move the decimal point three places left: 1.25 L. Then we check the size of the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Millilitres to Litres', subtitle: 'SI units, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about converting SI units. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A hospital orders $250$ doses of liquid amoxicillin. Each dose is $5$ mL. How many liters of amoxicillin did the hospital order?',
          answer: '$1.25$ L',
          working: '$250 \\times 5 = 1{,}250$ mL, and $1{,}250 \\div 1{,}000 = 1.25$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A hospital orders 250 doses of a liquid medicine, amoxicillin. Each dose is 5 millilitres. How many litres did the hospital order?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['We know', 'We want'],
          rows: [
            ['$250$ doses', 'the **total** amount'],
            ['$5$ mL in each dose', 'in **litres**, not millilitres'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we know: 250 doses, of 5 millilitres each.', show: 'tab' },
        { say: 'We want the total amount, and we want it in litres. So there are two jobs: find the total, then change the unit.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['1 \\text{ L} = 1{,}000 \\text{ mL}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Small unit to big unit', md: 'Going from a **smaller** unit to a **bigger** one, you need **fewer** of them: **divide** by $1{,}000$.' },
      ],
      lines: [
        { say: 'Here is what we need. "Milli" means one thousandth, so 1 litre is 1,000 millilitres.', show: 'f' },
        { say: 'A litre is a bigger unit, so you need fewer of them. Going from millilitres to litres, divide by 1,000.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the total in **mL**', 'Change mL to **L**', 'Check the **size** of the answer'] }],
      lines: [
        { say: 'Here is the plan. Find the total in millilitres.', show: 'plan.0' },
        { say: 'Change millilitres to litres.', show: 'plan.1' },
        { say: 'Then check that the answer is a sensible size.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The total in mL',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['250 \\times 5 \\text{ mL} = \\good{1{,}250 \\text{ mL}}'] }],
      lines: [
        { say: 'Step one. 250 doses of 5 millilitres each is 250 times 5, which is 1,250 millilitres.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: mL to L',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1{,}250 \\text{ mL} \\times \\dfrac{1 \\text{ L}}{1{,}000 \\text{ mL}} = \\dfrac{1{,}250}{1{,}000} \\text{ L}', '= \\good{1.25 \\text{ L}}'] }],
      lines: [
        { say: 'Step two. Multiply by 1 litre over 1,000 millilitres. The millilitres cancel, and we divide 1,250 by 1,000.', show: 'm.0' },
        { say: 'Dividing by 1,000 moves the decimal point three places to the left. 1,250 becomes 1.25. The hospital ordered 1.25 litres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Is it sensible?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1 \\text{ L} = 1{,}000 \\text{ mL} = 200 \\text{ doses}', '250 \\text{ doses} \\to \\text{a bit more than } 1 \\text{ L} \\ \\checkmark'] }],
      lines: [
        { say: 'Step three, a size check. One litre is 1,000 millilitres, which is 200 doses of 5 millilitres.', show: 'm.0' },
        { say: '250 doses is a bit more than 200, so the answer should be a bit more than 1 litre. 1.25 litres is.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1.25 \\text{ L} \\times 1{,}000 = 1{,}250 \\text{ mL}', '1{,}250 \\div 5 = 250 \\text{ doses} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working back. 1.25 litres is 1.25 times 1,000, which is 1,250 millilitres.', show: 'm.0' },
        { say: 'Split into doses of 5 millilitres, that is 250 doses, exactly what was ordered. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$1{,}250 \\times 1{,}000$', 'mL to L means **fewer** units: divide'],
            ['$1{,}250 \\div 100 = 12.5$ L', '$1$ L is $1{,}000$ mL, not $100$'],
            ['Answer "$1{,}250$"', 'the question wants **litres**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Litres are bigger than millilitres, so the number must get smaller. Divide, do not multiply.' },
        { say: 'A litre is 1,000 millilitres, not 100. Dividing by 100 gives 12.5 litres, which is ten times too much.' },
        { say: 'And the question asks for litres, so 1,250 millilitres is not the final answer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A camp cook makes $40$ servings of soup, each $250$ mL. How many litres of soup is that?',
          choices: ['$1$ L', '$100$ L', '$0.1$ L', '$10$ L'],
          answer: 3,
          working: '$40 \\times 250 = 10{,}000$ mL, and $10{,}000 \\div 1{,}000 = 10$ L.',
        },
      ],
      lines: [
        { say: 'Your turn. A camp cook makes 40 servings of soup, each 250 millilitres. How many litres of soup is that? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '40 times 250 is 10,000 millilitres. Divide by 1,000: 10 litres. Choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$1$ L $= 1{,}000$ mL', 'Small unit to big unit: **divide**', 'Dividing by $1{,}000$: decimal point **3 places left**', 'Check that the size makes sense'] }],
      lines: [
        { say: 'Here is what to remember. 1 litre is 1,000 millilitres.', show: 'sum.0' },
        { say: 'From a small unit to a big unit, divide.', show: 'sum.1' },
        { say: 'Dividing by 1,000 moves the decimal point three places left.', show: 'sum.2' },
        { say: 'And check that the size of your answer makes sense. For more on SI units, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
