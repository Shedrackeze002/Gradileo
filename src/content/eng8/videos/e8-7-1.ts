import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-7-1',
  lessonId: 'e8-7-1',
  title: 'The Argument Essay',
  summary:
    'An argument essay convinces readers to accept a position. Its thesis is one arguable, specific and confident sentence, usually at the end of the introduction, and it can preview the main reasons. A counterargument paragraph states the other view fairly, concedes what is fair, then rebuts it directly.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'The Argument Essay', subtitle: 'Thesis and counterargument' }],
      lines: [
        { say: 'Taking an argument apart is one skill. Building your own is the next.', show: 'title' },
        { say: 'In this video we write a strong thesis, and plan a paragraph that answers the other side.' },
      ],
    },
    {
      chapter: 'The thesis',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Thesis', md: 'The **thesis** is one sentence that states the writer’s **position** on the issue. In an argument essay, it usually comes at the **end of the introduction**, after a hook and some background.' },
      ],
      lines: [
        { say: 'An argument essay tries to convince readers to accept a position, using reasons and evidence.', show: 'def' },
        { say: 'Its thesis is one sentence that states the writer’s position on the issue. It usually comes at the end of the introduction, after a hook and some background.', focus: 'def' },
      ],
    },
    {
      chapter: 'A strong thesis',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['A strong thesis is…', 'Weak', 'Strong'],
          rows: [
            ['**Arguable**', 'Many schools start at about eight.', 'Schools should start an hour later to help students sleep.'],
            ['**Specific**', 'Cars are bad and something should be done.', 'Our town should ban cars from the high street on Saturdays.'],
            ['**Confident**', 'I think homework is kind of bad, maybe.', 'Homework should be limited to thirty minutes a night.'],
          ],
        },
        { kind: 'text', id: 'e', size: 'md', md: 'Preview: *Uniforms should stay because they **save money**, **reduce bullying** and **build pride**.*' },
      ],
      lines: [
        { say: 'A strong thesis is arguable, so people could disagree with it. Many schools start at about eight is just a fact. Schools should start an hour later to help students sleep is a position.', show: 't', focus: 't.0' },
        { say: 'It is specific, saying exactly what, where or when. Our town should ban cars from the high street on Saturdays.', focus: 't.1' },
        { say: 'And it is confident, taking a clear side. Homework should be limited to thirty minutes a night.', focus: 't.2' },
        { say: 'A thesis can also preview the main reasons. Uniforms should stay because they save money, reduce bullying and build pride. Each reason then becomes a body paragraph.', show: 'e' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Don’t announce', md: '*This essay is going to talk about school start times* gives the **topic**, not your **position**. A thesis says what you think, not what you will discuss.' },
      ],
      lines: [
        { say: 'A common mistake is to announce the topic. This essay is going to talk about school start times tells the reader the topic, but not your position.', show: 'm' },
        { say: 'A thesis says what you think, not what you will discuss.', focus: 'm' },
      ],
    },
    {
      chapter: 'The counterargument paragraph',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**State** it fairly: *Some people argue that a later start would disrupt parents’ work.*',
            '**Concede** what is fair: *It is true that some parents leave for work early.*',
            '**Rebut** it: *However, schools could open at the usual time for a supervised breakfast club.*',
          ],
        },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Answer the worry directly', md: '“That is a silly idea” is not a rebuttal. Neither is repeating your thesis.' },
      ],
      lines: [
        { say: 'A strong argument essay faces the other side, because it answers the reader’s doubts before they can grow. The best order has three steps. First, state the opposing view fairly. Some people argue that a later start would disrupt parents’ work.', show: 'b.0' },
        { say: 'Second, concede any fair point. It is true that some parents leave for work early.', show: 'b.1' },
        { say: 'Third, rebut it. However, schools could open their doors at the usual time for a supervised breakfast club, so parents’ routines would not need to change.', show: 'b.2' },
        { say: 'A rebuttal must answer the worry directly. Calling the other side silly, or simply repeating your thesis, is not a rebuttal.', show: 'k' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is the strongest thesis for an argument essay?',
          choices: [
            'Our school should build a covered bike shelter so more students cycle.',
            'This essay will discuss bikes at our school.',
            'Some students cycle to school.',
            'I think bikes are maybe quite good, sort of.',
          ],
          answer: 0,
          working: 'It is arguable (people could disagree), specific (a covered bike shelter at our school) and confident (it takes a clear side).',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the strongest thesis for an argument essay? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is "A". It is arguable, because people could disagree. It is specific, a covered bike shelter at our school. And it is confident, taking a clear side.', caption: 'The answer is A. It is arguable, because people could disagree. It is specific, a covered bike shelter at our school. And it is confident, taking a clear side.', show: 'q2.answer' },
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
          items: [
            'A **thesis** states your position, at the end of the introduction.',
            'Make it **arguable**, **specific** and **confident**.',
            'A thesis can preview the main reasons.',
            'Counterargument: **state** it, **concede** what is fair, then **rebut** it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A thesis states your position, usually at the end of the introduction.', show: 'sum.0' },
        { say: 'Make it arguable, specific and confident.', show: 'sum.1' },
        { say: 'A thesis can also preview the essay’s main reasons.', show: 'sum.2' },
        { say: 'And in a counterargument paragraph, state the other view, concede what is fair, then rebut it.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
