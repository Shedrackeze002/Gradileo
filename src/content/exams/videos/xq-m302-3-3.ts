import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 3.3 (mutually exclusive events). The question is a Your Turn
// from OpenStax Contemporary Mathematics, word for word (section 7.8, The Addition Rule for
// Probability, CC BY-NC-SA 4.0): the shared opening and the part "The letter is green or an A."
// Green letters are the green A and green B, A's are the blue A and green A, and the green A is in
// both, so P = 2/6 + 2/6 − 1/6 = 1/2, as in the book's solution. The check counts the 3 faces.

const QUESTION =
  'You are about to roll a special 6-sided die that has both a colored letter and a colored number on each face. The faces are labeled with: a red 1 and a blue A, a red 1 and a green A, an orange 1 and a green B, an orange 2 and a red C, a purple 3 and a brown D, an orange 4 and a blue E. Find the probabilities of these events: The letter is green or an A.';

const FACES: [string, string, boolean, boolean][] = [
  ['red 1', 'blue A', false, true],
  ['red 1', 'green A', true, true],
  ['orange 1', 'green B', true, false],
  ['orange 2', 'red C', false, false],
  ['purple 3', 'brown D', false, false],
  ['orange 4', 'blue E', false, false],
];

const video: Explainer = {
  id: 'xq-m302-3-3',
  lessonId: '',
  exam: {
    lesson: 'm302-3-3',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 7.8, The Addition Rule for Probability',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/7-8-the-addition-rule-for-probability',
    question: QUESTION,
  },
  title: 'Exam Question: Green or an A on a Special Die (Mutually Exclusive Events)',
  thumbnailTitle: 'Green or an A?',
  thumbnail: 'faces',
  summary:
    'A real test question, solved one small step at a time: a special die has a coloured number and a coloured letter on each face. What is the probability that the letter is green or an A? Two faces have a green letter and two have an A, but the green A is in both, so the events are not mutually exclusive: P = 2/6 + 2/6 − 1/6 = 1/2. Then we check by counting faces and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Green or an A?', subtitle: 'Mutually exclusive events, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about "or" probabilities and mutually exclusive events. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '$\\dfrac{2}{6} + \\dfrac{2}{6} - \\dfrac{1}{6} = \\dfrac{1}{2}$',
          working: 'The green A is green **and** an A, so subtract it once.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'You are about to roll a special 6-sided die that has both a colored letter and a colored number on each face. The faces are labeled with: a red 1 and a blue "A", a red 1 and a green "A", an orange 1 and a green B, an orange 2 and a red C, a purple 3 and a brown D, an orange 4 and a blue E.' },
        { say: 'Find the probabilities of these events. The letter is green or an "A".' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'table', id: 'faces', head: ['Face', 'Number', 'Letter'], rows: FACES.map(([num, let_], i) => [`${i + 1}`, num, let_]) },
        { kind: 'text', id: 't', size: 'md', md: 'Roll once. What is the chance the **letter** is green, **or** is an A, or both?' },
      ],
      lines: [
        { say: 'Here are the 6 faces, each with a coloured number and a coloured letter. Each face is equally likely.', show: 'faces' },
        { say: 'We roll once, and want the chance that the letter is green, or is an "A", or both.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ie', tone: 'key', title: 'The addition rule', md: '$P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)$' },
        { kind: 'callout', id: 'me', tone: 'definition', title: 'Mutually exclusive', md: 'Events that **cannot** happen together. Then $P(A \\text{ and } B) = 0$, and we just add.' },
      ],
      lines: [
        { say: 'Here is what we need. The probability of A or B is the probability of A, plus the probability of B, minus the probability of both.', show: 'ie' },
        { say: 'Events that cannot happen together are called mutually exclusive. For them, the overlap is 0 and we just add.', show: 'me' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the faces with a **green** letter, and with an **A**', 'Find the faces in **both**', 'Use the **addition rule**'] }],
      lines: [
        { say: 'Here is the plan. First, find the faces with a green letter, and the faces with an "A".', show: 'plan.0' },
        { say: 'Second, find the faces in both.', show: 'plan.1' },
        { say: 'Third, use the addition rule.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Green, and A',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{green letter: green A, green B} \\Rightarrow P(G) = \\dfrac{2}{6}', '\\text{an A: blue A, green A} \\Rightarrow P(A) = \\dfrac{2}{6}'] }],
      lines: [
        { say: 'Step one. Two faces have a green letter: the green "A" and the green B. So the probability of green is 2 out of 6.', show: 'm.0' },
        { say: 'Two faces have an "A": the blue "A" and the green "A". So the probability of an "A" is also 2 out of 6.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Both',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{green and an A: the green A}', 'P(G \\text{ and } A) = \\good{\\dfrac{1}{6}} \\ \\Rightarrow \\ \\text{not mutually exclusive}'] }],
      lines: [
        { say: 'Step two. One face is both: the green "A".', show: 'm.0' },
        { say: 'So the probability of both is 1 out of 6. The events can happen together, so they are not mutually exclusive.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The addition rule',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(G \\text{ or } A) = \\dfrac{2}{6} + \\dfrac{2}{6} - \\dfrac{1}{6}', '= \\dfrac{3}{6} = \\good{\\dfrac{1}{2}}'] }],
      lines: [
        { say: 'Step three. Add the two probabilities and subtract the overlap: 2 sixths plus 2 sixths minus 1 sixth.', show: 'm.0' },
        { say: 'That is 3 sixths, which is one half.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'table', id: 'chk', head: ['Face', 'Letter', 'Green or A?'], rows: FACES.map(([, let_, g, a], i) => [`${i + 1}`, let_, g || a ? '$\\good{\\checkmark}$' : '']) },
        { kind: 'math', id: 'm', size: 'md', lines: ['3 \\text{ faces out of } 6 = \\dfrac{1}{2} \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Let us check by going through the faces one at a time. The blue "A" counts, the green "A" counts, and the green B counts. The other three do not.', show: 'chk' },
        { say: 'That is 3 faces out of 6, which is one half. The green "A" is counted only once, just as the rule said. It checks out.', show: 'm', focus: 'm' },
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
            ['$\\dfrac{2}{6} + \\dfrac{2}{6} = \\dfrac{2}{3}$', 'the green A is counted **twice**'],
            ['$\\dfrac{1}{6}$', 'that is green **and** A; the question says **or**'],
            ['looking at the **number** colours', 'the question is about the **letter**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Just adding gives 2 thirds, but that counts the green "A" twice.' },
        { say: '1 sixth is the probability of green and an "A". The question asks for or.' },
        { say: 'And read carefully: the question is about the colour of the letter, not the colour of the number.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'One card is drawn from a standard $52$-card deck. What is the probability that it is a king or a heart?',
          choices: ['$\\dfrac{4}{13}$', '$\\dfrac{17}{52}$', '$\\dfrac{1}{52}$', '$\\dfrac{1}{4}$'],
          answer: 0,
          working: '$\\dfrac{4}{52} + \\dfrac{13}{52} - \\dfrac{1}{52} = \\dfrac{16}{52} = \\dfrac{4}{13}$.',
        },
      ],
      lines: [
        { say: 'Your turn. One card is drawn from a standard 52-card deck. What is the probability that it is a king or a heart? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '4 kings plus 13 hearts, minus the king of hearts counted twice: 16 out of 52, which is 4 thirteenths: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)$', 'Check for outcomes in **both** events', 'Mutually exclusive: no overlap, so just **add**', 'Check by counting the outcomes one at a time'] }],
      lines: [
        { say: 'Here is what to remember. The probability of A or B is the probability of A, plus the probability of B, minus the probability of both.', show: 'sum.0' },
        { say: 'Always look for outcomes that are in both events.', show: 'sum.1' },
        { say: 'If there are none, the events are mutually exclusive and we just add.', show: 'sum.2' },
        { say: 'And check by counting the outcomes one at a time. For more on mutually exclusive events, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
