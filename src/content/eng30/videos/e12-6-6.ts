import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-6-6',
  lessonId: 'e12-6-6',
  title: 'The Final Examination Essay',
  thumbnailTitle: 'The Examination Essay',
  thumbnail: false,
  summary:
    'A final examination essay draws on everything in the unit at once. Learn to read a prompt as a set of instructions, write a controlling idea that answers it, divide the time by the marks, and keep complete answers when a plan goes wrong.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'The Final Examination Essay', subtitle: 'Read, choose, plan, write, check' }],
      lines: [
        { say: 'A final examination essay draws on everything in this unit at once: reading a prompt closely, choosing a text and an approach, writing a controlling idea, then planning, writing and checking under time.', show: 'title' },
      ],
    },
    {
      chapter: 'Reading the prompt',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Discuss the idea**: argue about a theme, not a summary',
            '**developed in a literary text**: show how, with evidence',
            '**you have studied**: a text you know well enough to quote',
            '**about …**: stay on this subject',
          ],
        },
      ],
      lines: [
        { say: 'Critical essay prompts often follow one pattern: discuss the idea, developed in a literary text you have studied, about a subject. Each part is an instruction.' },
        { say: 'Discuss the idea means make an argument about a theme, not a summary of events. Developed in a text means show how the text builds the idea, with evidence.', show: ['b.0', 'b.1'] },
        { say: 'You have studied means choose a text you know well enough to quote. And the subject is what every paragraph must answer.', show: ['b.2', 'b.3'] },
        { say: 'Try the cost of ambition. The subject is not ambition in general, but what it costs.' },
      ],
    },
    {
      chapter: 'The controlling idea',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['In *Hamlet*, Shakespeare suggests that ambition costs most after it succeeds: Claudius cannot truly repent, because he will not give up the crown and the queen he murdered for.'],
        },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Only repeats the prompt', 'Turns to setting', 'Summarizes the plot'],
        },
      ],
      lines: [
        { say: 'Choose the text that fits the subject most closely, then write a controlling idea: an arguable claim that answers the prompt in your own words.' },
        { say: 'Some controlling ideas fall short. One only repeats the prompt. One turns to the setting. One summarizes the plot.', show: 'b' },
        { say: 'This one answers the prompt with an arguable claim about Hamlet.', hide: 'b', show: 'q' },
      ],
    },
    {
      chapter: 'Managing the time',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**10 minutes**: reading and planning',
            '**30 minutes**: personal response, 25% of the marks',
            '**90 minutes**: critical essay, 75% of the marks',
            '**10 minutes**: checking both',
          ],
        },
      ],
      lines: [
        { say: 'Divide the time in proportion to the marks. Suppose an examination gives one hundred forty minutes for two tasks: a personal response worth twenty-five percent, and a critical essay worth seventy-five percent.' },
        { say: 'Set aside about ten minutes at the start for reading and planning, and ten at the end for checking. That leaves one hundred twenty minutes for writing.', show: ['b.0', 'b.3'] },
        { say: 'Twenty-five percent of that is thirty minutes, and seventy-five percent is ninety.', show: ['b.1', 'b.2'] },
        { say: 'When a plan goes wrong, choose the action that leaves you with complete answers. With ten minutes left, write a brief final point and a conclusion.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Polishing the first task**: a perfect personal response, an unfinished essay', '**Two complete answers** earn more marks.'],
        },
      ],
      lines: [
        { say: 'Here is a common mistake: polishing the first task. Students often spend too long on it because it is in front of them.', show: 'b.0' },
        { say: 'A polished personal response and an unfinished critical essay earn fewer marks than two complete answers. Watch the clock at the time you planned to switch, and switch.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'An exam gives 140 minutes, with 10 to plan and 10 to check. How long for a 25% task and a 75% task?',
          choices: [
            '30 and 90 minutes, from 25% and 75% of the 120 left.',
            '35 and 105 minutes, from 25% and 75% of all 140.',
            '60 minutes each, since both tasks deserve equal time.',
            '25 and 75 minutes, since the percentages are minutes.',
          ],
          answer: 0,
          working: 'After 20 minutes for planning and checking, 120 minutes are left. Twenty-five percent of 120 is 30, and seventy-five percent is 90.',
        },
      ],
      lines: [
        { say: 'Your turn. An exam gives one hundred forty minutes, with ten to plan and ten to check. How long should you spend on a twenty-five percent task and on a seventy-five percent task? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. After twenty minutes for planning and checking, one hundred twenty minutes are left. Twenty-five percent of that is thirty, and seventy-five percent is ninety.', show: 'q2.answer' },
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
            'Read the prompt as instructions, and stay on the subject.',
            'Write a controlling idea that is arguable.',
            'Divide the time by the marks, and finish both tasks.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Read the prompt as a set of instructions, and stay on its subject.', show: 'sum.0' },
        { say: 'Choose a text that fits, and write a controlling idea that answers the prompt arguably.', show: 'sum.1' },
        { say: 'And divide the time by the marks, so that you finish with complete answers.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
