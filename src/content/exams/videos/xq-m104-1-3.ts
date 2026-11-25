import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 1.3 (estimating and solving problems). The question is an
// Everyday Math exercise from OpenStax Elementary Algebra 2e, word for word (section 8.7, Solve
// Proportion and Similar Figure Applications, CC BY-NC-SA 4.0). 13,500 ÷ 4,000 = 3.375 bags, and a
// part bag cannot be bought, so Phil buys 4 bags (the book prints no answer for this one). Check:
// 3 bags cover 12,000 sq ft (not enough), 4 bags cover 16,000 sq ft (enough).

const QUESTION =
  'Lawn Fertilizer Phil wants to fertilize his lawn. Each bag of fertilizer covers about 4,000 square feet of lawn. Phil’s lawn is approximately 13,500 square feet. How many bags of fertilizer will he have to buy?';

const video: Explainer = {
  id: 'xq-m104-1-3',
  lessonId: '',
  exam: {
    lesson: 'm104-1-3',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 8.7, Solve Proportion and Similar Figure Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/8-7-solve-proportion-and-similar-figure-applications',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Bags of Fertilizer? (Estimating and Solving Problems)',
  thumbnailTitle: 'How Many Bags to Buy?',
  summary:
    'A real test question, solved one small step at a time: each bag of fertilizer covers about 4,000 square feet, and Phil’s lawn is about 13,500 square feet. How many bags must he buy? We estimate first (3 bags cover 12,000, which is not quite enough), then divide: 13,500 ÷ 4,000 = 3.375. A store sells whole bags, so we round up to 4 bags. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Bags to Buy?', subtitle: 'Estimating and solving problems, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about estimating and solving problems. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: '**Lawn Fertilizer** Phil wants to fertilize his lawn. Each bag of fertilizer covers about $4{,}000$ square feet of lawn. Phil’s lawn is approximately $13{,}500$ square feet. How many bags of fertilizer will he have to buy?',
          answer: '$4$ bags',
          working: '$13{,}500 \\div 4{,}000 = 3.375$, so round **up** to $4$.',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Phil wants to fertilize his lawn. Each bag of fertilizer covers about 4,000 square feet of lawn. Phil\'s lawn is approximately 13,500 square feet. How many bags of fertilizer will he have to buy?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'table', id: 'tab', head: ['Bags', 'Square feet covered'], rows: [['$1$', '$4{,}000$'], ['$2$', '$8{,}000$'], ['$3$', '$12{,}000$'], ['$4$', '$16{,}000$']] },
        { kind: 'text', id: 't', size: 'md', md: 'The bags must cover **all** $13{,}500$ square feet.' },
      ],
      lines: [
        { say: 'Here is how much lawn each number of bags covers. Each bag adds another 4,000 square feet.', show: 'tab' },
        { say: 'The question asks how many bags Phil must buy, so that the bags cover all 13,500 square feet of his lawn.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{bags} = \\text{lawn} \\div \\text{area per bag}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Estimate, then round up', md: 'Estimate first, so you know roughly what to expect. A store sells **whole** bags, so if the answer has a part bag, round **up**.' },
      ],
      lines: [
        { say: 'Here is what we need. The number of bags is the size of the lawn divided by the area one bag covers.', show: 'f' },
        { say: 'Estimate first, so you know roughly what answer to expect. And since a store sells only whole bags, any part of a bag means one more bag. We round up.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Estimate** the number of bags', '**Divide** the lawn by $4{,}000$', '**Round up** to a whole bag'] }],
      lines: [
        { say: 'Here is the plan. Estimate the number of bags.', show: 'plan.0' },
        { say: 'Divide the lawn by 4,000.', show: 'plan.1' },
        { say: 'Then round up to a whole number of bags.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Estimate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times 4{,}000 = 12{,}000 < 13{,}500', '\\text{a little more than } 3 \\text{ bags}'] }],
      lines: [
        { say: 'Step one. Three bags cover 3 times 4,000, which is 12,000 square feet. That is less than 13,500.', show: 'm.0' },
        { say: 'So Phil needs a little more than 3 bags.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['13{,}500 \\div 4{,}000 = 3.375 \\text{ bags}'] }],
      lines: [
        { say: 'Step two. 13,500 divided by 4,000 is 3.375 bags. That matches our estimate: a little more than 3.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Round up',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3.375 \\to \\good{4 \\text{ bags}}'] }],
      lines: [
        { say: 'Step three. Phil cannot buy 0.375 of a bag, and 3 bags are not enough. So he has to buy 4 bags.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3 \\text{ bags: } 12{,}000 < 13{,}500 \\ \\text{too few}', '4 \\text{ bags: } 16{,}000 \\ge 13{,}500 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Three bags cover only 12,000 square feet, so part of the lawn would be missed.', show: 'm.0' },
        { say: 'Four bags cover 16,000 square feet, which is enough for the whole lawn. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$3$ bags', 'rounded **down**: $1{,}500$ square feet are missed'],
            ['$3.375$ bags', 'a store sells **whole** bags'],
            ['$4{,}000 \\div 13{,}500 \\approx 0.3$', 'divided the **wrong way**: lawn $\\div$ area per bag'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Rounding 3.375 down to 3 leaves 1,500 square feet with no fertilizer. When you must cover everything, round up.' },
        { say: 'An answer of 3.375 bags cannot be bought. A store sells whole bags.' },
        { say: 'And dividing the other way gives less than one bag, which our estimate tells us is far too small.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'One can of paint covers about $35$ m². The walls of a room have an area of $120$ m². How many cans of paint must you buy?',
          choices: ['$4$ cans', '$3$ cans', '$5$ cans', '$85$ cans'],
          answer: 0,
          working: '$120 \\div 35 \\approx 3.4$, so round up to $4$ cans.',
        },
      ],
      lines: [
        { say: 'Your turn. One can of paint covers about 35 square metres. The walls of a room have an area of 120 square metres. How many cans of paint must you buy? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '120 divided by 35 is about 3.4. Three cans are not enough, so you must buy 4 cans. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Estimate** first, to know what to expect', 'How many fit: **divide**', 'Must cover it all: round **up**', 'Check: is the answer **enough**?'] }],
      lines: [
        { say: 'Here is what to remember. Estimate first, so you know what to expect.', show: 'sum.0' },
        { say: 'To find how many you need, divide.', show: 'sum.1' },
        { say: 'When you must cover everything, round up.', show: 'sum.2' },
        { say: 'And check that your answer is really enough. For more on estimating and solving problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
