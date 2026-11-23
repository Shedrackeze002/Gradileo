import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 1.3 (conditional statements). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 2.5, Equivalent Statements, CC BY-NC-SA
// 4.0): the shared opening and its three parts on the converse, inverse and contrapositive. The
// negation of "Some superheroes wear capes" is "No superheroes wear capes", as in the book's
// solutions. The check is a truth table showing the contrapositive always agrees with p → q.

const QUESTION =
  'Use the statements, p: Elvis Presley wore capes and q: Some superheroes wear capes, to write the following statements: Write the converse statement, q → p, in words. Write the inverse statement, ~p → ~q, in words. Write the contrapositive statement, ~q → ~p, in words.';

const video: Explainer = {
  id: 'xq-m302-1-3',
  lessonId: '',
  exam: {
    lesson: 'm302-1-3',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 2.5, Equivalent Statements',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/2-5-equivalent-statements',
    question: QUESTION,
  },
  title: 'Exam Question: The Converse, Inverse and Contrapositive (Conditional Statements)',
  thumbnailTitle: 'Converse, Inverse, Contrapositive',
  thumbnail: 'forms',
  summary:
    'A real test question, solved one small step at a time: with p: Elvis Presley wore capes and q: Some superheroes wear capes, write the converse, inverse and contrapositive in words. The converse swaps p and q, the inverse negates both, and the contrapositive does both, and the negation of "some superheroes wear capes" is "no superheroes wear capes". Then we check with a truth table and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Converse, Inverse and Contrapositive', subtitle: 'Conditional statements, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about conditional statements. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Use the statements, $p$: Elvis Presley wore capes and $q$: Some superheroes wear capes, to write the following statements: Write the converse statement, $q \\to p$, in words. Write the inverse statement, ${\\sim}p \\to {\\sim}q$, in words. Write the contrapositive statement, ${\\sim}q \\to {\\sim}p$, in words.',
          answer: 'Converse: If some superheroes wear capes, then Elvis Presley wore capes. Inverse: If Elvis Presley did not wear capes, then no superheroes wear capes. Contrapositive: If no superheroes wear capes, then Elvis Presley did not wear capes.',
          working: 'Swap for the converse, negate for the inverse, do both for the contrapositive. Not "some" is "no".',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'Use the statements, p: Elvis Presley wore capes, and q: Some superheroes wear capes, to write the following statements.' },
        { say: 'Write the converse statement, q implies p, in words. Write the inverse statement, not p implies not q, in words. Write the contrapositive statement, not q implies not p, in words.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'm', size: 'lg', md: '$p \\to q$: If Elvis Presley wore capes, then some superheroes wear capes.' },
        { kind: 'text', id: 't', size: 'md', md: 'Build **three** new if-then statements from $p$ and $q$, and write each one as an English sentence.' },
      ],
      lines: [
        { say: 'The original conditional, p implies q, reads: If Elvis Presley wore capes, then some superheroes wear capes.', show: 'm' },
        { say: 'We need to build three new if-then statements from p and q, and write each one as an English sentence.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'forms',
          head: ['Statement', 'Form', 'How'],
          rows: [
            ['conditional', '$p \\to q$', 'if $p$, then $q$'],
            ['converse', '$q \\to p$', '**swap** $p$ and $q$'],
            ['inverse', '${\\sim}p \\to {\\sim}q$', '**negate** both'],
            ['contrapositive', '${\\sim}q \\to {\\sim}p$', 'swap **and** negate'],
          ],
        },
        { kind: 'callout', id: 'some', tone: 'tip', title: 'Negating "some"', md: 'The opposite of "**some** superheroes wear capes" is "**no** superheroes wear capes".' },
      ],
      lines: [
        { say: 'Here is what we need. The converse swaps p and q. The inverse negates both parts. The contrapositive swaps them and negates them.', show: 'forms' },
        { say: 'And one more thing. The opposite of "some superheroes wear capes" is not "some superheroes do not". It is "no superheroes wear capes".', show: 'some' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **negations** ${\\sim}p$ and ${\\sim}q$', 'Build the **converse** and the **inverse**', 'Build the **contrapositive**'] }],
      lines: [
        { say: 'Here is the plan. First, write the negations, not p and not q.', show: 'plan.0' },
        { say: 'Second, build the converse and the inverse.', show: 'plan.1' },
        { say: 'Third, build the contrapositive.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The negations',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['{\\sim}p: \\ \\text{Elvis Presley did \\textbf{not} wear capes.}', '{\\sim}q: \\ \\text{\\textbf{No} superheroes wear capes.}'] }],
      lines: [
        { say: 'Step one. Not p: Elvis Presley did not wear capes.', show: 'm.0' },
        { say: 'Not q: the opposite of "some superheroes wear capes" is "no superheroes wear capes". If even one did, "some" would still be true.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Converse and inverse',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ci',
          head: ['', 'In words'],
          rows: [
            ['converse $q \\to p$', 'If some superheroes wear capes, then Elvis Presley wore capes.'],
            ['inverse ${\\sim}p \\to {\\sim}q$', 'If Elvis Presley did not wear capes, then no superheroes wear capes.'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. The converse swaps the parts: If some superheroes wear capes, then Elvis Presley wore capes.', show: 'ci' },
        { say: 'The inverse keeps the order but negates both: If Elvis Presley did not wear capes, then no superheroes wear capes.' },
      ],
    },
    {
      chapter: 'Step 3: The contrapositive',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['{\\sim}q \\to {\\sim}p'] },
        { kind: 'text', id: 't', size: 'lg', md: '**If no superheroes wear capes, then Elvis Presley did not wear capes.**' },
      ],
      lines: [
        { say: 'Step three. The contrapositive is not q implies not p.', show: 'm' },
        { say: 'In words: If no superheroes wear capes, then Elvis Presley did not wear capes.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tt',
          head: ['$p$', '$q$', '$p \\to q$', '${\\sim}q \\to {\\sim}p$'],
          rows: [
            ['T', 'T', 'T', 'T'],
            ['T', 'F', 'F', 'F'],
            ['F', 'T', 'T', 'T'],
            ['F', 'F', 'T', 'T'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'The last two columns **always** match: the contrapositive says the same thing as the original.' },
      ],
      lines: [
        { say: 'Let us check the contrapositive with a truth table. An if-then statement is only false when the if part is true and the then part is false.', show: 'tt' },
        { say: 'Row by row, p implies q and not q implies not p give true, false, true, true. The columns always match, so the contrapositive is logically equivalent to the original. It checks out.', show: 't', focus: 't' },
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
            ['"Some superheroes do not wear capes"', 'that is not the negation: not **some** is **no**'],
            ['mixing up converse and inverse', 'converse **swaps**; inverse **negates**'],
            ['the converse means the same', 'only the **contrapositive** is equivalent'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '"Some superheroes do not wear capes" can be true at the same time as "some do", so it is not the negation. Not some is no.' },
        { say: 'Do not mix up the converse and the inverse. The converse swaps the parts. The inverse negates them.' },
        { say: 'And the converse does not mean the same as the original. Only the contrapositive is equivalent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the contrapositive of "If it is raining, then the ground is wet"?',
          choices: ['If the ground is wet, then it is raining.', 'If it is not raining, then the ground is not wet.', 'If it is raining, then the ground is not wet.', 'If the ground is not wet, then it is not raining.'],
          answer: 3,
          working: 'Swap the parts and negate both: if not wet, then not raining.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the contrapositive of: If it is raining, then the ground is wet? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Swap the parts and negate both: If the ground is not wet, then it is not raining: choice D. Choice A is the converse, and choice B is the inverse.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Converse $q \\to p$: **swap**', 'Inverse ${\\sim}p \\to {\\sim}q$: **negate**', 'Contrapositive ${\\sim}q \\to {\\sim}p$: swap **and** negate; it is **equivalent**', 'Not "some" is "**no**"'] }],
      lines: [
        { say: 'Here is what to remember. The converse swaps the parts.', show: 'sum.0' },
        { say: 'The inverse negates them.', show: 'sum.1' },
        { say: 'The contrapositive swaps and negates, and it always means the same as the original.', show: 'sum.2' },
        { say: 'And the negation of "some" is "no". For more on conditional statements, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
