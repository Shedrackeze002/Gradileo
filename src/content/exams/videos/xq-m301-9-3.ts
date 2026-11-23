import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-1 lesson 9.3 (combinations). The question is an exercise from OpenStax
// College Algebra 2e, word for word (section 13.5, Counting Principles, CC BY-NC-SA 4.0). The order
// of the motorcycles in a group does not matter, so each type is a combination, and the three
// choices are made together, so they multiply: C(10, 3) × C(6, 5) × C(5, 2) = 120 × 6 × 10 = 7,200,
// as in the book's answer. The check lists the 10 pairs of café racers by hand.

const QUESTION =
  'A motorcycle shop has 10 choppers, 6 bobbers, and 5 café racers—different types of vintage motorcycles. How many ways can the shop choose 3 choppers, 5 bobbers, and 2 café racers for a weekend showcase?';

const video: Explainer = {
  id: 'xq-m301-9-3',
  lessonId: '',
  exam: {
    lesson: 'm301-9-3',
    source: 'OpenStax, College Algebra 2e, Exercise in section 13.5, Counting Principles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/13-5-counting-principles',
    question: QUESTION,
  },
  title: 'Exam Question: Choosing Motorcycles for a Showcase (Combinations)',
  thumbnailTitle: 'Choose Motorcycles for a Showcase',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a shop has 10 choppers, 6 bobbers and 5 café racers. In how many ways can it choose 3 choppers, 5 bobbers and 2 café racers for a showcase? The order does not matter, so each choice is a combination: C(10, 3) = 120, C(6, 5) = 6 and C(5, 2) = 10. The three choices are made together, so we multiply: 120 × 6 × 10 = 7,200. Then we check one count by listing it and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Choose Motorcycles for a Showcase', subtitle: 'Combinations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about combinations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '$C(10, 3) \\times C(6, 5) \\times C(5, 2) = 7200$ ways',
          working: 'Order does not matter: $120 \\times 6 \\times 10 = 7200$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'A motorcycle shop has 10 choppers, 6 bobbers, and 5 café racers, different types of vintage motorcycles. How many ways can the shop choose 3 choppers, 5 bobbers, and 2 café racers for a weekend showcase?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Pick a **group** of $3$ choppers **and** a group of $5$ bobbers **and** a group of $2$ café racers. The **order** inside a group does not matter: it is the same showcase.' }],
      lines: [
        { say: 'The shop picks a group of 3 choppers, and a group of 5 bobbers, and a group of 2 café racers.', show: 't' },
        { say: 'Picking chopper one then chopper two gives the same showcase as picking them the other way round. So the order does not matter.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ncr', tone: 'definition', title: 'Combinations', md: 'Choosing $r$ objects from $n$ when order does **not** matter: $C(n, r) = \\dfrac{n!}{r! \\, (n - r)!}$' },
        { kind: 'callout', id: 'fcp', tone: 'key', title: 'And means multiply', md: 'Choices made **together** (this **and** that) multiply, by the fundamental counting principle.' },
      ],
      lines: [
        { say: 'Here is what we need. The number of ways to choose r objects from n, when the order does not matter, is n choose r: n factorial over r factorial times n minus r factorial.', show: 'ncr' },
        { say: 'And choices made together, this and that, multiply. That is the fundamental counting principle.', show: 'fcp' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Choose the **choppers**', 'Choose the **bobbers** and the **café racers**', '**Multiply** the three counts'] }],
      lines: [
        { say: 'Here is the plan. First, count the ways to choose the choppers.', show: 'plan.0' },
        { say: 'Second, count the ways to choose the bobbers and the café racers.', show: 'plan.1' },
        { say: 'Third, multiply the three counts.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The choppers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['C(10, 3) = \\dfrac{10!}{3! \\, 7!}', '= \\dfrac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = \\dfrac{720}{6} = \\good{120}'] }],
      lines: [
        { say: 'Step one. Choose 3 of the 10 choppers: 10 choose 3, which is 10 factorial over 3 factorial times 7 factorial.', show: 'm.0' },
        { say: 'The 7 factorial cancels most of the top, leaving 10 times 9 times 8 over 3 times 2 times 1. That is 720 over 6, which is 120.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Bobbers and café racers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['C(6, 5) = \\dfrac{6!}{5! \\, 1!} = \\good{6}', 'C(5, 2) = \\dfrac{5 \\times 4}{2 \\times 1} = \\good{10}'] }],
      lines: [
        { say: 'Step two. Choose 5 of the 6 bobbers: 6 choose 5 is 6 factorial over 5 factorial times 1 factorial, which is 6. That makes sense: choosing 5 is the same as choosing the 1 to leave out.', show: 'm.0' },
        { say: 'Choose 2 of the 5 café racers: 5 times 4 over 2 times 1, which is 10.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['120 \\times 6 \\times 10', '= \\good{7200} \\ \\text{ways}'] }],
      lines: [
        { say: 'Step three. The shop chooses the choppers and the bobbers and the café racers, so we multiply: 120 times 6 times 10.', show: 'm.0' },
        { say: 'That is 7,200 ways.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{café racers A, B, C, D, E:}', '\\text{AB, AC, AD, AE, BC, BD, BE, CD, CE, DE}', '10 \\text{ pairs} = C(5, 2) \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Let us check one of the counts by listing it. Call the café racers A, B, C, D and E.', show: 'm.0' },
        { say: 'The pairs are A B, A C, A D, A E, B C, B D, B E, C D, C E and D E. B A is the same pair as A B, so it is not listed again.', show: 'm.1' },
        { say: 'That is 10 pairs, just as 5 choose 2 said. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$120 + 6 + 10 = 136$', 'the three groups are chosen **together**: multiply'],
            ['$P(10, 3) = 720$', 'order does **not** matter: use $C$, not $P$'],
            ['$C(21, 10)$', 'the showcase needs an **exact** number of each type'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Adding the three counts gives 136. But the shop chooses all three groups together, so we multiply.' },
        { say: 'Using permutations for the choppers gives 720, which counts every order of the same 3 choppers. The order does not matter, so we use combinations.' },
        { say: 'And choosing any 10 of the 21 motorcycles ignores the types. The showcase needs exactly 3, 5 and 2 of each.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A club has $7$ boys and $5$ girls. In how many ways can a committee of $2$ boys and $2$ girls be chosen?',
          choices: ['$495$', '$210$', '$31$', '$840$'],
          answer: 1,
          working: '$C(7, 2) \\times C(5, 2) = 21 \\times 10 = 210$.',
        },
      ],
      lines: [
        { say: 'Your turn. A club has 7 boys and 5 girls. In how many ways can a committee of 2 boys and 2 girls be chosen? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '7 choose 2 is 21, and 5 choose 2 is 10. The two groups are chosen together, so 21 times 10 is 210: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Order does **not** matter: use $C(n, r)$', '$C(n, r) = \\dfrac{n!}{r! \\, (n - r)!}$', 'Groups chosen together (**and**): **multiply**', 'Check a small count by listing it'] }],
      lines: [
        { say: 'Here is what to remember. When the order does not matter, use combinations.', show: 'sum.0' },
        { say: 'n choose r is n factorial over r factorial times n minus r factorial.', show: 'sum.1' },
        { say: 'When several groups are chosen together, multiply their counts.', show: 'sum.2' },
        { say: 'And check a small count by listing it. For more on combinations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
