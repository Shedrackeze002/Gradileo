import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 1.1 (integers and the order of operations). The question is an
// Exercise from OpenStax Prealgebra 2e, word for word (section 3.3, Subtract Integers, CC BY-NC-SA
// 4.0). −78 + 24 = −54, and −54 + 49 = −5, so she is not out of debt yet, as in the book's answer.
// Check: −5 − 49 − 24 = −78.

const QUESTION =
  'Genevieve’s bank account was overdrawn and the balance is −$78. (a) She deposits a check for $24 that she earned babysitting. What is the new balance? (b) She deposits another check for $49. Is she out of debt yet? What is her new balance?';

/** A number line from −80 to 10, one unit for every $10, with the balances as dots and the deposits as arrows. */
function line(o: { a?: boolean; b?: boolean } = {}): DiagramEl {
  const points: Record<string, [number, number]> = { L: [-8.6, 0], R: [1.2, 0], top: [0, 2.9], bot: [0, -1] };
  const items: DiagramItem[] = [{ kind: 'line', id: 'axis', from: 'L', to: 'R', weight: 2.5, arrow: true, group: 'nl' }];
  for (const v of [-80, -60, -40, -20, 0]) {
    Object.assign(points, { [`t${-v}a`]: [v / 10, -0.15], [`t${-v}b`]: [v / 10, 0.15], [`t${-v}`]: [v / 10, -0.3] });
    items.push({ kind: 'line', id: `tick${-v}`, from: `t${-v}a`, to: `t${-v}b`, weight: 2, group: 'nl' }, { kind: 'label', id: `n${-v}`, at: `t${-v}`, tex: v ? `-${-v}` : '0', tone: 'muted', place: 'below', group: 'nl' });
  }
  points.s = [-7.8, 0];
  items.push({ kind: 'label', id: 'start', at: 's', tex: '-78', tone: 'bad', place: 'above', dot: true });
  if (o.a) {
    Object.assign(points, { a: [-5.4, 0], a0: [-7.8, 1.5], a1: [-5.4, 1.5] });
    items.push({ kind: 'line', id: 'pa', from: 'a0', to: 'a1', tone: 'good', arrow: true, label: '+24', labelSide: 'left' }, { kind: 'label', id: 'da', at: 'a', tex: '-54', tone: 'bad', place: 'above', dot: true });
  }
  if (o.b) {
    Object.assign(points, { b: [-0.5, 0], b0: [-5.4, 2.4], b1: [-0.5, 2.4] });
    items.push({ kind: 'line', id: 'pb', from: 'b0', to: 'b1', tone: 'good', arrow: true, label: '+49', labelSide: 'left' }, { kind: 'label', id: 'db', at: 'b', tex: '-5', tone: 'bad', place: 'above', dot: true });
  }
  return { kind: 'diagram', id: 'nl', points, items, height: 340 };
}

const video: Explainer = {
  id: 'xq-m204-1-1',
  lessonId: '',
  exam: {
    lesson: 'm204-1-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 3.3, Subtract Integers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/3-3-subtract-integers',
    question: QUESTION,
  },
  title: 'Exam Question: Climbing Out of an Overdrawn Account (Integers)',
  thumbnailTitle: 'Out of Debt Yet?',
  thumbnail: 'nl',
  summary:
    'A real test question, solved one small step at a time: Genevieve’s bank account is overdrawn, with a balance of −$78. She deposits $24, then $49. What is the balance after each deposit, and is she out of debt? −78 + 24 = −54, and −54 + 49 = −5, so she still owes $5. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Out of Debt Yet?', subtitle: 'Integers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about negative numbers in a bank account. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'Genevieve’s bank account was overdrawn and the balance is −\\$78. (a) She deposits a check for \\$24 that she earned babysitting. What is the new balance? (b) She deposits another check for \\$49. Is she out of debt yet? What is her new balance?',
          answer: '(a) −\\$54 (b) No, her balance is −\\$5',
          working: '−78 + 24 = −54; −54 + 49 = −5',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Genevieve’s bank account was overdrawn, and the balance is negative 78 dollars.', caption: 'Genevieve’s bank account was overdrawn, and the balance is −$78.' },
        { say: 'Part a: she deposits a cheque for 24 dollars that she earned babysitting. What is the new balance?', caption: 'Part (a): she deposits a cheque for $24 that she earned babysitting. What is the new balance?' },
        { say: 'Part b: she deposits another cheque for 49 dollars. Is she out of debt yet? What is her new balance?', caption: 'Part (b): she deposits another cheque for $49. Is she out of debt yet? What is her new balance?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'o', tone: 'definition', title: 'Overdrawn', md: 'An account is **overdrawn** when more has been taken out than was in it. The balance is **negative**: $-78$ means she owes the bank \\$78.' },
        { kind: 'callout', id: 'd', tone: 'key', title: 'A deposit', md: 'A **deposit** puts money in, so we **add** it to the balance. She is out of debt only when the balance reaches $0$ or more.' },
      ],
      lines: [
        { say: 'An account is overdrawn when more money has been taken out than was in it. The balance is negative. Negative 78 means she owes the bank 78 dollars.', show: 'o' },
        { say: 'A deposit puts money in, so we add it to the balance. She is out of debt only when the balance reaches zero or more.', show: 'd' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['-78 + 24'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Adding numbers with different signs', md: '**Subtract** the sizes: $78 - 24$. The answer takes the sign of the number with the **bigger** size, here **negative**.' },
      ],
      lines: [
        { say: 'Here is what we need. To add a positive number to a negative one, like negative 78 plus 24, the signs are different.', show: 'm' },
        { say: 'Subtract the sizes, 78 minus 24. Then the answer takes the sign of the number with the bigger size. 78 is bigger than 24, so the answer is negative.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Start at $-78$', '(a) **Add** the \\$24 deposit', '(b) **Add** the \\$49 deposit, and look at the **sign**'] }],
      lines: [
        { say: 'Here is the plan. Start at negative 78.', show: 'plan.0' },
        { say: 'For part a, add the 24 dollar deposit.', show: 'plan.1' },
        { say: 'For part b, add the 49 dollar deposit, and look at the sign of the answer.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): The first deposit',
      layout: 'center',
      main: [line({ a: true }), { kind: 'math', id: 'm', size: 'md', lines: ['-78 + 24 = -(78 - 24) = \\good{-54}'] }],
      lines: [
        { say: 'Part a. On the number line, the balance starts at negative 78.', show: ['nl.nl', 'nl.start'], focus: 'nl.start' },
        { say: 'The deposit of 24 dollars moves it 24 to the right, toward zero.', show: 'nl.pa', focus: 'nl.pa' },
        { say: '78 minus 24 is 54, and the answer is negative. The new balance is negative 54 dollars.', caption: '78 − 24 = 54, and the answer is negative. The new balance is −$54.', show: ['nl.da', 'm.0'], focus: ['nl.da', 'm.0'] },
      ],
    },
    {
      chapter: 'Part (b): The second deposit',
      layout: 'center',
      main: [line({ a: true, b: true }), { kind: 'math', id: 'm', size: 'md', lines: ['-54 + 49 = -(54 - 49) = \\good{-5}'] }],
      lines: [
        { say: 'Part b. Start from negative 54, and add the 49 dollar deposit.', show: ['nl.nl', 'nl.start', 'nl.pa', 'nl.da', 'nl.pb'], focus: 'nl.pb' },
        { say: '54 minus 49 is 5, and 54 is the bigger size, so the answer is negative. The new balance is negative 5 dollars.', caption: '54 − 49 = 5, and 54 is the bigger size, so the answer is negative. The new balance is −$5.', show: ['nl.db', 'm.0'], focus: ['nl.db', 'm.0'] },
        { say: 'The balance is still below zero. So no, she is not out of debt yet. She still owes the bank 5 dollars.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$24 + \\$49 = \\$73', '\\$73 < \\$78, \\ \\text{short by } \\$5 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. Together, she deposited 24 plus 49, which is 73 dollars.', show: 'm.0' },
        { say: 'She owed 78 dollars, and 73 is 5 dollars short of that. So she still owes 5 dollars. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(a) −\\$102', '**subtracted** the deposit: a deposit **adds**'],
            ['(a) \\$54', 'lost the **sign**: she still owes money'],
            ['(b) "Yes, \\$5"', 'the balance is $-5$, still **below zero**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 102 dollars subtracts the deposit. A deposit adds money, so the balance moves up toward zero.', caption: '−$102 subtracts the deposit. A deposit adds money, so the balance moves up toward zero.' },
        { say: 'Positive 54 dollars loses the sign. After the first deposit, she still owes money.', caption: '$54 loses the sign. After the first deposit, she still owes money.' },
        { say: 'And saying she is out of debt with 5 dollars misreads negative 5. The balance is still below zero.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A chequing account is overdrawn, with a balance of −\\$35. A deposit of \\$60 is made. What is the new balance?',
          choices: ['−\\$95', '\\$25', '−\\$25', '\\$95'],
          answer: 1,
          working: '−35 + 60: subtract the sizes, 60 − 35 = 25, and 60 is bigger, so the answer is positive: \\$25.',
        },
      ],
      lines: [
        { say: 'Your turn. A chequing account is overdrawn, with a balance of negative 35 dollars. A deposit of 60 dollars is made. What is the new balance? Pause the video and try it.', caption: 'Your turn. A chequing account is overdrawn, with a balance of −$35. A deposit of $60 is made. What is the new balance? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '60 minus 35 is 25, and 60 is the bigger size, so the answer is positive. The new balance is 25 dollars. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Overdrawn means a **negative** balance', 'A deposit **adds** to the balance', 'Different signs: **subtract** the sizes', 'Take the sign of the **bigger** size'] }],
      lines: [
        { say: 'Here is what to remember. An overdrawn account has a negative balance.', show: 'sum.0' },
        { say: 'A deposit adds to the balance.', show: 'sum.1' },
        { say: 'To add numbers with different signs, subtract their sizes.', show: 'sum.2' },
        { say: 'And the answer takes the sign of the bigger size. For more on integers and the order of operations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
