import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-2 lesson 1.2 (counterexamples). Gradileo wrote this one, in the style
// of a Grade 11 reasoning unit test, since the free question banks have no question on
// counterexamples: "The sum of any two prime numbers is even" fails for 2 + 7 = 9, because 2 is the
// only even prime.

const QUESTION =
  'Jana makes this conjecture: “The sum of any two prime numbers is even.” Which of the following is a counterexample to Jana’s conjecture?';
const CHOICES = ['3 + 5 = 8', '2 + 7 = 9', '11 + 13 = 24', '2 + 2 = 4'];

const video: Explainer = {
  id: 'xq-m202-1-2',
  lessonId: '',
  exam: {
    lesson: 'm202-1-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 reasoning unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Is the Sum of Two Primes Always Even? (Counterexamples)',
  thumbnailTitle: 'Find the Counterexample',
  thumbnail: 'chk',
  summary:
    'An exam-style question, solved one small step at a time: Jana conjectures that the sum of any two prime numbers is even. Which choice is a counterexample? We check that both numbers in each choice are prime, then check whether each sum is odd, and find that 2 + 7 = 9 disproves the conjecture. Then we see why 2 is special and look at the traps in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find the Counterexample', subtitle: 'Counterexamples, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about counterexamples. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 11 reasoning unit test. It says so at the bottom of the screen the whole way through.' },
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
          prompt: 'Jana makes this conjecture: “The sum of any two prime numbers is even.” Which of the following is a counterexample to Jana’s conjecture?',
          choices: ['$3 + 5 = 8$', '$2 + 7 = 9$', '$11 + 13 = 24$', '$2 + 2 = 4$'],
          answer: 1,
          working: '$2$ and $7$ are both prime, and their sum, $9$, is **odd**.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Jana makes this conjecture: the sum of any two prime numbers is even. Which of the following is a counterexample to Jana’s conjecture?' },
        { say: 'The choices are 3 plus 5 equals 8, 2 plus 7 equals 9, 11 plus 13 equals 24, and 2 plus 2 equals 4. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find **two prime numbers** whose sum is **not even**. One such example shows that Jana is wrong.' }],
      lines: [{ say: 'We need two prime numbers that add up to a number that is not even. Just one example like that is enough to show that Jana’s conjecture is false.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ce', tone: 'definition', title: 'A counterexample', md: 'An example that **meets the condition** of a conjecture but **breaks its conclusion**. One is enough to disprove it.' },
        { kind: 'callout', id: 'pr', tone: 'key', title: 'Prime numbers', md: 'A prime has exactly two factors, $1$ and itself: $2, 3, 5, 7, 11, 13, \\dots$' },
      ],
      lines: [
        { say: 'Here is what we need. A counterexample meets the condition of the conjecture, but breaks its conclusion. Here, the condition is two prime numbers, and the conclusion is an even sum. One counterexample is enough to disprove a conjecture.', show: 'ce' },
        { say: 'And a prime number has exactly two factors: 1 and itself. The primes start 2, 3, 5, 7, 11, 13.', show: 'pr' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Check the **condition**: are both numbers prime?', 'Check the **conclusion**: is the sum even?', 'The counterexample **passes** the first and **fails** the second'] }],
      lines: [
        { say: 'Here is the plan. First, check the condition: are both numbers prime?', show: 'plan.0' },
        { say: 'Second, check the conclusion: is the sum even?', show: 'plan.1' },
        { say: 'The counterexample is the choice that passes the first check and fails the second.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Are both numbers prime?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'chk',
          head: ['Choice', 'Both prime?', 'Sum even?'],
          rows: [
            ['A: $3 + 5 = 8$', '$\\good{\\checkmark}$', ''],
            ['B: $2 + 7 = 9$', '$\\good{\\checkmark}$', ''],
            ['C: $11 + 13 = 24$', '$\\good{\\checkmark}$', ''],
            ['D: $2 + 2 = 4$', '$\\good{\\checkmark}$', ''],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Check the condition in each choice. 3 and 5 are prime. 2 and 7 are prime.', show: 'chk' },
        { say: '11 and 13 are prime. And 2 is prime, because its only factors are 1 and 2. So every choice meets the condition.' },
      ],
    },
    {
      chapter: 'Step 2: Is the sum even?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'chk',
          head: ['Choice', 'Both prime?', 'Sum even?'],
          rows: [
            ['A: $3 + 5 = 8$', '$\\good{\\checkmark}$', '$8$: even'],
            ['B: $2 + 7 = 9$', '$\\good{\\checkmark}$', '$\\bad{9}$: **odd**'],
            ['C: $11 + 13 = 24$', '$\\good{\\checkmark}$', '$24$: even'],
            ['D: $2 + 2 = 4$', '$\\good{\\checkmark}$', '$4$: even'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. Check each sum. 8 is even, so choice A agrees with Jana.', show: 'chk' },
        { say: '9 is odd. 24 is even. And 4 is even.' },
      ],
    },
    {
      chapter: 'Step 3: Pick the counterexample',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2 \\text{ and } 7 \\text{ are prime}', '2 + 7 = \\bad{9} \\quad \\text{odd}'] }],
      lines: [
        { say: 'Step three. Only one choice uses two primes and gets an odd sum.', show: 'm.0' },
        { say: '2 plus 7 is 9, which is odd. So choice B is a counterexample, and Jana’s conjecture is false.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'why', tone: 'tip', title: 'Why 2 is special', md: '$2$ is the **only even prime**. Every other prime is odd, and $\\text{odd} + \\text{odd} = \\text{even}$. So a sum of two primes can only be odd when one of them is $2$.' },
      ],
      lines: [
        { say: 'Let us see why this works. 2 is the only even prime number. Every other prime is odd, and an odd number plus an odd number is always even.', show: 'why' },
        { say: 'So the only way to get an odd sum is to use 2 with an odd prime, like 2 plus 7. That is exactly choice B, so the answer makes sense.' },
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
            ['A or C', 'these **agree** with Jana; examples that agree never disprove it'],
            ['D: $2 + 2 = 4$', 'it uses $2$, but the sum is still **even**'],
            ['$4 + 5 = 9$', 'not a counterexample: $4$ is **not prime**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Choices A and C support Jana’s conjecture. An example that agrees can never disprove it.' },
        { say: 'Choice D uses the prime 2, but 2 plus 2 is 4, which is still even.' },
        { say: 'And watch the condition. 4 plus 5 is 9, which is odd, but 4 is not prime, so it does not count as a counterexample.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which number is a counterexample to the conjecture “Every multiple of $4$ is also a multiple of $8$”?',
          choices: ['$16$', '$24$', '$32$', '$12$'],
          answer: 3,
          working: '$12 = 4 \\times 3$ is a multiple of $4$, but $12 \\div 8 = 1.5$, so it is not a multiple of $8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which number is a counterexample to the conjecture: every multiple of 4 is also a multiple of 8? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'All four are multiples of 4. 16, 24 and 32 are also multiples of 8, so they agree. But 12 divided by 8 is 1.5, so 12 is not a multiple of 8. The counterexample is 12: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A counterexample **meets the condition**', '…but **breaks the conclusion**', '**One** counterexample disproves a conjecture', 'Examples that agree **never** prove it'] }],
      lines: [
        { say: 'Here is what to remember. A counterexample must meet the condition of the conjecture.', show: 'sum.0' },
        { say: 'But it breaks the conclusion.', show: 'sum.1' },
        { say: 'Just one counterexample is enough to show that a conjecture is false.', show: 'sum.2' },
        { say: 'And examples that agree with a conjecture never prove it. For more on counterexamples, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
