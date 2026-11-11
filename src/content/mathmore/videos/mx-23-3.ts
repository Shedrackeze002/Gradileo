import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-23-3',
  lessonId: 'mx-23-3',
  title: 'Truth Tables',
  thumbnail: 'm',
  summary: 'A truth table lists the four cases TT, TF, FT and FF for two statements p and q. "And" needs both to be true, "or" needs at least one, "if p then q" is false only when p is true and q is false, and "if and only if" needs the same truth value. Work from the inside out. A tautology is always true, and a contradiction is always false.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Bases, Modular Arithmetic and Logic', title: 'Truth Tables', subtitle: 'Logic, one case at a time' }],
      lines: [
        { say: 'If it rains, then the match is cancelled. Is that statement broken when it does not rain, but the match is cancelled anyway?', show: 'title' },
        { say: 'In this video, you will learn to answer questions like this with a truth table, which lists every case.' },
      ],
    },
    {
      chapter: 'Statements',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Truth table', md: 'A **statement** is either true (T) or false (F). A **truth table** shows the truth value of a compound statement in every case: TT, TF, FT and FF.' },
        {
          kind: 'table',
          id: 'tb',
          head: ['Symbol', 'Read as', 'True when'],
          rows: [
            ['$\\neg p$', 'not $p$', '$p$ is false'],
            ['$p \\wedge q$', '$p$ and $q$', 'both are true'],
            ['$p \\vee q$', '$p$ or $q$', 'at least one is true'],
            ['$p \\Leftrightarrow q$', '$p$ if and only if $q$', 'they have the same value'],
          ],
        },
      ],
      lines: [
        { say: 'A statement is a sentence that is either true or false. With two statements, p and q, there are four cases: both true, true and false, false and true, and both false.', show: 'def' },
        { say: 'Not p is true when p is false.', show: 'tb.0' },
        { say: 'P and q is true only when both are true.', show: 'tb.1' },
        { say: 'P or q is true when at least one is true, and that includes when both are.', show: 'tb.2' },
        { say: 'And p if and only if q is true when the two statements have the same truth value.', show: 'tb.3' },
      ],
    },
    {
      chapter: 'If–then',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['$p$', '$q$', '$p \\Rightarrow q$'],
          rows: [
            ['T', 'T', 'T'],
            ['T', 'F', 'F'],
            ['F', 'T', 'T'],
            ['F', 'F', 'T'],
          ],
        },
      ],
      lines: [
        { say: 'If p then q is a promise: if p happens, then q will happen.', show: 'tb.0' },
        { say: 'The promise is broken only when p is true and q is false. It rains, and the match goes ahead.', show: 'tb.1' },
        { say: 'When p is false, the promise has not been tested, so the statement counts as true.', show: 'tb.2' },
        { say: 'So when it does not rain and the match is cancelled anyway, the statement is still true.', show: 'tb.3' },
      ],
    },
    {
      chapter: 'Inside out',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$p$ is true and $q$ is false. Find the truth value of $\\neg(p \\wedge \\neg q)$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\neg q: \\ \\text{T}', 'p \\wedge \\neg q: \\ \\text{T and T} = \\text{T}', '\\neg(p \\wedge \\neg q): \\ \\text{F}'] },
      ],
      lines: [
        { say: 'For a longer statement, work from the inside out. Here p is true and q is false.', show: 'q' },
        { say: 'Not q is true, because q is false.', show: 'm.0', focus: 'm.0' },
        { say: 'P and not q joins true and true, so it is true.', show: 'm.1', focus: 'm.1' },
        { say: 'Its negation is false, so the whole statement is false.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Equivalence',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['$p$', '$q$', '$\\neg p$', '$\\neg p \\vee q$'],
          rows: [
            ['T', 'T', 'F', 'T'],
            ['T', 'F', 'F', 'F'],
            ['F', 'T', 'T', 'T'],
            ['F', 'F', 'T', 'T'],
          ],
        },
        { kind: 'text', id: 'tt', md: 'A **tautology** is true in every row, such as $p \\vee \\neg p$. A **contradiction** is false in every row, such as $p \\wedge \\neg p$.', size: 'md' },
      ],
      lines: [
        { say: 'To complete a table, add a column for each part. Here is not p, or q. Not p is false, false, true, true.', show: 'tb.0' },
        { say: 'Not p or q is false only when both parts are false, which happens in the second row.', show: 'tb.1' },
        { say: 'So the final column is true, false, true, true, the same as if p then q. Two statements with the same column are logically equivalent.', show: ['tb.2', 'tb.3'] },
        { say: 'A statement that is true in every row is a tautology, and one that is false in every row is a contradiction.', show: 'tt' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$p$ is false and $q$ is true. Which statement is false?',
          choices: ['$p \\vee q$', '$p \\Rightarrow q$', '$\\neg p \\wedge q$', '$p \\Leftrightarrow q$'],
          answer: 3,
          working: '$p$ and $q$ have different truth values, so $p \\Leftrightarrow q$ is false. The other three are true.',
        },
      ],
      lines: [
        { say: 'Your turn. P is false and q is true. Which statement is false? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. P and q have different truth values, so p if and only if q is false. P or q is true because q is true, if p then q is true because p is false, and not p and q joins true and true.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['A truth table lists TT, TF, FT and FF.', '"And" needs both; "or" needs at least one.', '"If–then" fails only for true then false.', 'Work from the inside out; a tautology is always true.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A truth table lists all four cases for p and q.', show: 'sum.0' },
        { say: 'And needs both statements to be true, while or needs at least one.', show: 'sum.1' },
        { say: 'If then is false only when the first part is true and the second is false.', show: 'sum.2' },
        { say: 'Work from the inside out, one column at a time. A tautology is always true, and a contradiction is always false. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
