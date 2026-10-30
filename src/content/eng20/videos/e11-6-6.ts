import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-6-6',
  lessonId: 'e11-6-6',
  title: 'Writing Under Time Pressure',
  thumbnailTitle: 'Writing Under Time Pressure',
  thumbnail: false,
  summary:
    'Break an exam prompt into its tasks, plan a thesis and two or three points quickly, divide the time, and finish strongly, even when time runs short.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Writing Under Time Pressure', subtitle: 'Plan, write, check' }],
      lines: [
        { say: 'In an exam, a literary essay has to be planned, written and checked against the clock.', show: 'title' },
        { say: 'Most marks lost in timed writing are not lost for lack of ideas. They are lost because the essay answered half the question, or ran out of time before the conclusion.' },
      ],
    },
    {
      chapter: 'Reading the prompt',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Analyse how Kate Chopin uses the scene outside Mrs. Mallard’s window to reveal her inner life in “The Story of an Hour”, and evaluate whether the final sentence is an effective ending.'],
        },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Task 1:** analyse how the window scene reveals her inner life', '**Task 2:** judge, with reasons, whether the final sentence is effective'],
        },
      ],
      lines: [
        { say: 'A prompt often contains more than one task. Find every key verb, and what it applies to. Analyse means examine how the writer’s choices create meaning. Evaluate means judge how effective something is, with reasons.', show: 'q' },
        { say: 'In this prompt, analyse applies to the window scene, and evaluate applies to the final sentence. Notice the word and. There are two tasks, and an essay that answers only one is incomplete.', show: 'b', focus: 'b' },
      ],
    },
    {
      chapter: 'Planning and the clock',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Ideas and evidence:** moments, quotations, images',
            '**Thesis:** one sentence that answers every task',
            '**Two or three body points,** each with its evidence, in order',
            '**Sixty minutes:** 10 to read and plan, 45 to write, 5 to check',
          ],
        },
      ],
      lines: [
        { say: 'A plan does not need full sentences. Jot down ideas and evidence, then write a thesis that answers every task in the prompt.', show: ['b.0', 'b.1'], focus: ['b.0', 'b.1'] },
        { say: 'Then choose two or three body points, each with its evidence, and put them in order.', show: 'b.2', focus: 'b.2' },
        { say: 'Spend roughly the first sixth of the time reading and planning, most of it writing, and the last few minutes checking. In a sixty-minute exam, that is ten, forty-five and five.', show: 'b.3', focus: 'b.3' },
        { say: 'Never write a rough draft to copy out. Your plan is your rough draft.' },
      ],
    },
    {
      chapter: 'Finishing strongly',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Every paragraph answers the prompt, not just the topic.', 'The thesis matches what the body paragraphs prove.', 'Quotations are accurate, and names and spelling are correct.'],
        },
      ],
      lines: [
        { say: 'If time runs short, a complete essay scores better than a longer one that stops in the middle. Write a brief version of your last point, and a short conclusion that returns to your thesis.' },
        { say: 'Save the last minutes to reread. Check that every paragraph answers the prompt, and that the thesis matches what the body paragraphs prove.', show: ['b.0', 'b.1'] },
        { say: 'Then check that quotations are accurate and the names of characters and authors are correct.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Answering the question you hoped for', md: 'If you prepared an essay on imagery and the prompt asks you to **evaluate the ending**, shape what you know to the tasks in front of you.' },
      ],
      lines: [
        { say: 'Here is a common mistake. You prepared an essay on imagery, but the prompt asks you to evaluate the ending.', show: 'm' },
        { say: 'A prepared essay will not do. Use what you know, but shape it to the tasks in front of you.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A literary essay exam lasts sixty minutes. Which split of the time is best?',
          choices: [
            'Plan for 15 minutes, write for 40, check for 5.',
            'Plan for 5 minutes, write for 50, check for 5.',
            'Plan for 20 minutes, write for 35, check for 5.',
            'Plan for 10 minutes, write for 45, check for 5.',
          ],
          answer: 3,
          working: 'For sixty minutes the lesson suggests 10 minutes to read and plan, 45 to write and 5 to check.',
        },
      ],
      lines: [
        { say: 'Your turn. A literary essay exam lasts sixty minutes. Which of these four splits of the time is best? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Ten minutes to plan, forty-five to write, and five to check.', show: 'q2.answer' },
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
          items: ['Find every key verb in a prompt; the word *and* usually means more than one task.', 'Plan a thesis that answers every task, with two or three ordered points.', 'Divide the time, and finish the argument even when time runs short.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Find every key verb in a prompt. The word and usually means more than one task.', show: 'sum.0' },
        { say: 'Plan a thesis that answers every task, with two or three ordered points.', show: 'sum.1' },
        { say: 'And divide the time, never copy out a draft, and finish your argument even when time runs short.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
