import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 2.1 (the fundamental counting principle). The question is a
// Your Turn from OpenStax Contemporary Mathematics, word for word (section 7.1, The Multiplication
// Rule for Counting, CC BY-NC-SA 4.0). An ID code is 1 of 3 status letters, then 5 digits (10 ways
// each), then 3 letters (26 ways each), so there are 3 × 10^5 × 26^3 = 5,272,800,000 codes, as in
// the book's solution. The check counts a short code of one status letter and one digit.

const QUESTION =
  'At a certain college, ID cards are issued to all students, faculty, and staff. These cards have unique ID codes for each person: a letter to indicate the person’s status (S for students, F for faculty, and E for staff), followed by 5 digits and finally 3 letters (these letters can be anything). How many different ID codes can be created using this scheme?';

const video: Explainer = {
  id: 'xq-m302-2-1',
  lessonId: '',
  exam: {
    lesson: 'm302-2-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 7.1, The Multiplication Rule for Counting',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/7-1-the-multiplication-rule-for-counting',
    question: QUESTION,
  },
  title: 'Exam Question: How Many College ID Codes? (The Fundamental Counting Principle)',
  thumbnailTitle: 'How Many ID Codes?',
  thumbnail: 'slots',
  summary:
    'A real test question, solved one small step at a time: a college ID code is a status letter (S, F or E), then 5 digits, then 3 letters. How many codes are possible? There are 9 positions, and by the fundamental counting principle we multiply the choices for each: 3 × 10^5 × 26^3 = 5,272,800,000. Then we check with a shorter code and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many ID Codes?', subtitle: 'The fundamental counting principle, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about counting. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '$3 \\times 10^5 \\times 26^3 = 5{,}272{,}800{,}000$ codes',
          working: 'Multiply the choices for each of the $9$ positions.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'At a certain college, ID cards are issued to all students, faculty, and staff. These cards have unique ID codes for each person: a letter to indicate the person\'s status, S for students, F for faculty, and E for staff, followed by 5 digits and finally 3 letters. These letters can be anything. How many different ID codes can be created using this scheme?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\text{S} \\ \\ 4 \\ 0 \\ 7 \\ 1 \\ 9 \\ \\ \\text{K} \\ \\text{Q} \\ \\text{A}'] },
        { kind: 'text', id: 't', size: 'md', md: 'One possible code: a **status** letter, **5** digits, then **3** letters. Count every code that fits this pattern.' },
      ],
      lines: [
        { say: 'Here is one code that fits: S for a student, then the digits 4, 0, 7, 1, 9, then the letters K, Q and A.', show: 'm' },
        { say: 'We need to count every code that fits this pattern: a status letter, 5 digits, then 3 letters.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'fcp', tone: 'key', title: 'The fundamental counting principle', md: 'If one choice can be made in $m$ ways **and** the next in $n$ ways, together they can be made in $m \\times n$ ways, for any number of choices.' },
        { kind: 'callout', id: 'rep', tone: 'tip', title: 'Repeats allowed', md: 'Digits and letters **can repeat**, so every digit has $10$ choices and every letter has $26$.' },
      ],
      lines: [
        { say: 'Here is what we need. The fundamental counting principle. If one choice can be made in m ways, and the next in n ways, together they can be made in m times n ways. It works for any number of choices.', show: 'fcp' },
        { say: 'Nothing stops a digit or a letter from repeating, so every digit position has 10 choices and every letter position has 26.', show: 'rep' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Draw a **slot** for each position', 'Write the number of **choices** in each slot', '**Multiply**'] }],
      lines: [
        { say: 'Here is the plan. First, draw a slot for each position in the code.', show: 'plan.0' },
        { say: 'Second, write the number of choices in each slot.', show: 'plan.1' },
        { say: 'Third, multiply.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The slots',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'slots',
          head: ['status', 'digit', 'digit', 'digit', 'digit', 'digit', 'letter', 'letter', 'letter'],
          rows: [['$\\good{3}$', '$10$', '$10$', '$10$', '$10$', '$10$', '$26$', '$26$', '$26$']],
        },
      ],
      lines: [
        { say: 'Step one. The code has 9 positions: 1 status letter, 5 digits and 3 letters.', show: 'slots' },
        { say: 'The status letter can only be S, F or E: 3 choices. Each digit can be 0 to 9: 10 choices. And each of the last letters can be any of the 26 letters.' },
      ],
    },
    {
      chapter: 'Step 2: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times 10 \\times 10 \\times 10 \\times 10 \\times 10 \\times 26 \\times 26 \\times 26', '= 3 \\times 10^5 \\times 26^3'] }],
      lines: [
        { say: 'Step two. Each code makes all 9 choices, so we multiply: 3, times 10 five times, times 26 three times.', show: 'm.0' },
        { say: 'In powers, that is 3 times 10 to the power 5, times 26 cubed.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Work it out',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['10^5 = 100{,}000, \\quad 26^3 = 17{,}576', '3 \\times 100{,}000 \\times 17{,}576 = \\good{5{,}272{,}800{,}000}'] }],
      lines: [
        { say: 'Step three. 10 to the power 5 is 100,000, and 26 cubed is 17,576.', show: 'm.0' },
        { say: '3 times 100,000 times 17,576 is 5,272,800,000. That is more than 5 billion ID codes.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{status, then 1 digit: } 3 \\times 10 = 30', '\\text{S0, \\ldots, S9}, \\ \\text{F0, \\ldots, F9}, \\ \\text{E0, \\ldots, E9}: \\ 30 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the method on a short code we can list: a status letter followed by just 1 digit. The principle gives 3 times 10, which is 30.', show: 'm.0' },
        { say: 'Listing them: S 0 to S 9 is 10 codes, F 0 to F 9 is 10 more, and E 0 to E 9 is 10 more. 30 in all. So multiplying works.', show: 'm.1', focus: 'm.1' },
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
            ['$3 + 50 + 78$', 'each code makes **every** choice: multiply, do not add'],
            ['$26$ for the status', 'only S, F or E: **3** choices'],
            ['$10 \\times 9 \\times 8 \\times 7 \\times 6$', 'digits **can repeat**: $10$ choices every time'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Adding the choices counts codes with only one part. Every code has all 9 parts, so we multiply.' },
        { say: 'The status letter is not any letter. It can only be S, F or E.' },
        { say: 'And nothing says the digits must be different, so each digit has 10 choices every time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A licence plate has $3$ letters followed by $3$ digits, and letters and digits may repeat. How many plates are possible?',
          choices: ['$108$', '$11{,}232{,}000$', '$1{,}757{,}600$', '$17{,}576{,}000$'],
          answer: 3,
          working: '$26^3 \\times 10^3 = 17{,}576 \\times 1000 = 17{,}576{,}000$.',
        },
      ],
      lines: [
        { say: 'Your turn. A licence plate has 3 letters followed by 3 digits, and letters and digits may repeat. How many plates are possible? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '26 cubed is 17,576, and 10 cubed is 1,000. Multiplied, that is 17,576,000: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Draw a **slot** for each position', 'Write the number of **choices** in each slot', '**Multiply** the slots', 'Watch for **limited** choices and for **repeats**'] }],
      lines: [
        { say: 'Here is what to remember. Draw a slot for each position.', show: 'sum.0' },
        { say: 'Write the number of choices in each slot.', show: 'sum.1' },
        { say: 'Multiply the slots together.', show: 'sum.2' },
        { say: 'And watch for slots with limited choices, and for whether repeats are allowed. For more on the fundamental counting principle, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
