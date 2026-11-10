import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-7-3',
  lessonId: 'e9-7-3',
  title: 'Timed Writing',
  summary:
    'In a timed essay, underline the prompt’s command word, such as analyse, compare or to what extent, and its focus, so you answer the question actually asked. Spend about 5 to 10 minutes of a 45-minute essay on a quick plan: a thesis, the point of each paragraph and key evidence. Manage your time so you finish, and leave a few minutes to check.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Timed Writing', subtitle: 'Read the prompt, plan, and finish' }],
      lines: [
        { say: 'In an exam, the clock is part of the task. A clear method helps you answer the question that was actually asked, and finish.', show: 'title' },
        { say: 'In this video we analyse an essay prompt, and plan under time limits.' },
      ],
    },
    {
      chapter: 'Reading the prompt',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Command word', md: 'A **command word** is the word in an essay prompt that tells you **what kind of answer** to write: *analyse*, *explain*, *compare*. The **focus** is the topic it applies to.' },
        {
          kind: 'table',
          id: 't',
          head: ['Command word', 'What it asks'],
          rows: [
            ['**Analyse**', 'examine how something works and why'],
            ['**Compare** / **Contrast**', 'similarities and differences / differences'],
            ['**To what extent**', 'a judgement weighing both sides'],
            ['**How does … present**', 'the writer’s methods and their effects'],
          ],
        },
      ],
      lines: [
        { say: 'The most costly mistake in a timed essay is misreading the question. So underline two things. The command word tells you what kind of answer to write. The focus is the topic it applies to.', show: 'def' },
        { say: 'Analyse asks you to examine how something works, and why. Explain asks you to make clear how or why something happens.', show: 't', focus: 't.0' },
        { say: 'Compare looks at similarities, and often differences too, while contrast looks at differences.', focus: 't.1' },
        { say: 'To what extent asks for a judgement that weighs evidence on both sides. And how does a writer present something asks about their methods, and the effects.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Unpicking a prompt',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'lg', lines: ['How does Shakespeare present the theme of power in The Tempest?'] },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Command words:** “How does … present”: Shakespeare’s **methods**.',
            '**Focus:** the theme of power.',
            'Retelling the plot, or Shakespeare’s life, would **not** answer it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s unpick a prompt. How does Shakespeare present the theme of power in The Tempest?', show: 'q' },
        { say: 'The command words are how does, present. They ask about methods, such as language, structure and staging.', show: 'b.0' },
        { say: 'The focus is the theme of power.', show: 'b.1' },
        { say: 'So the essay must explain Shakespeare’s methods, and what they show about power. Retelling the plot, or writing about Shakespeare’s life, would not answer it.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Planning and time',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['A 45-minute essay', ''],
          rows: [
            ['**Plan**: 5 to 10 minutes', 'thesis; the point of each paragraph; key evidence'],
            ['**Write**: about 30 minutes', 'follow the plan'],
            ['**Check**: the last 5 minutes', 'proofread; does every paragraph answer the prompt?'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Finish the argument', md: 'Running out of time? Write a **brief version** of the last point and a **short conclusion**. A complete argument, even if brief, beats an unfinished one.' },
      ],
      lines: [
        { say: 'A few minutes of planning keeps the essay focused. In a forty-five minute essay, plan for about five to ten minutes. A quick plan is a map, not a draft: your thesis, the main point of each paragraph, and the key evidence for each.', show: 't', focus: 't.0' },
        { say: 'Then write for about thirty minutes, and save the last five to proofread and check that every paragraph answers the prompt.', focus: ['t.1', 't.2'] },
        { say: 'If time is running out with a paragraph still unwritten, write a brief version of the point and a short conclusion. A complete argument, even if brief, is stronger than an unfinished one.', show: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“To what extent is Prospero a good ruler?” What does the command word ask you to do?',
          choices: [
            'Make a judgement that weighs evidence on both sides',
            'Retell the plot in order',
            'List only the ways he is a good ruler',
            'Describe Shakespeare’s life',
          ],
          answer: 0,
          working: '“To what extent” asks for a judgement. A strong answer weighs the evidence that Prospero is a good ruler against the evidence that he is harsh, then decides.',
        },
      ],
      lines: [
        { say: 'Your turn. To what extent is Prospero a good ruler? What does the command word ask you to do? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is "A". To what extent asks for a judgement. A strong answer weighs the evidence that Prospero rules well against the evidence that he is harsh, and then decides.', caption: 'The answer is A. To what extent asks for a judgement. A strong answer weighs the evidence that Prospero rules well against the evidence that he is harsh, and then decides.', show: 'q2.answer' },
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
            'Underline the **command word** and the **focus**.',
            'Plan briefly: a thesis, each paragraph’s point, key evidence.',
            'Manage your time so you finish the argument.',
            'Leave a few minutes to check.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Underline the command word and the focus of the prompt.', show: 'sum.0' },
        { say: 'Plan briefly: a thesis, the point of each paragraph, and key evidence.', show: 'sum.1' },
        { say: 'Manage your time, so that you finish the argument.', show: 'sum.2' },
        { say: 'And leave a few minutes at the end to check your work.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
