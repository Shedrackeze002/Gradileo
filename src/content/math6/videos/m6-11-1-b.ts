import type { Explainer } from '@/video/script.ts';

const deg = (t: number) => `$${t}\\,^\\circ\\text{C}$`;

const video: Explainer = {
  id: 'm6-11-1-b',
  lessonId: 'm6-11-1',
  title: 'Independent and Dependent Variables, Part 2: Change over Time',
  thumbnailTitle: 'Change over Time',
  thumbnail: false,
  summary: 'When something changes over time (a person’s height, the temperature during a day, the distance travelled on a trip), time is the independent variable: it keeps going no matter what, and the other quantity changes as it passes. To check which is which, ask “Which one changes because of the other?” The time does not depend on the temperature.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Functions · Part 2', title: 'Change over Time', subtitle: 'Time keeps going, no matter what' }],
      lines: [
        { say: 'Your height, the temperature outside, the distance a car has travelled: they all change as time goes by.', show: 'title' },
        { say: 'In this video, you will see why time is the independent variable in all of these, and how to avoid getting the variables backwards.' },
      ],
    },
    {
      chapter: 'Things that change over time',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['the **height** of a person or a plant, as the years or weeks pass', 'the **temperature** during a day, as the hours pass', 'the **distance** travelled on a trip, as the minutes pass'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Time is independent', md: 'When something changes over time, **time is the independent variable**. Time keeps going no matter what, and the other quantity changes as it passes.' },
      ],
      lines: [
        { say: 'Many functions show how something changes over time. The height of a person, or of a plant, changes as the years or the weeks pass.', show: 'b.0' },
        { say: 'The temperature changes during a day, as the hours pass.', show: 'b.1' },
        { say: 'And on a trip, the distance you have travelled changes as the minutes pass.', show: 'b.2' },
        { say: 'In all of these, time is the independent variable. Time keeps going no matter what, and the other quantity changes as time passes.', show: 'key' },
      ],
    },
    {
      chapter: 'Temperature during the day',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: ['Time', 'Temperature'], rows: [['9:00', deg(14)], ['10:00', deg(16)], ['11:00', deg(19)], ['12:00', deg(21)]] }],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A weather station records the temperature every hour. Which is the **independent** variable?' },
        { kind: 'bullets', id: 'b', items: ['The temperature changes as the hours pass.', 'The hours do **not** change because of the temperature.', 'Time: **independent**. Temperature: **dependent**.'] },
      ],
      lines: [
        { say: 'A weather station records the temperature every hour. At nine o’clock, it is fourteen degrees. At ten o’clock, sixteen degrees.', show: ['t.0', 't.1', 'q'] },
        { say: 'At eleven o’clock, nineteen degrees, and at twelve o’clock, twenty-one degrees. Which is the independent variable?', show: ['t.2', 't.3'] },
        { say: 'The temperature changes as the hours pass. The sun warms the air more and more during the morning.', show: 'b.0' },
        { say: 'But the hours do not change because of the temperature. The clock keeps ticking, whether it is hot or cold.', show: 'b.1' },
        { say: 'So the time is the independent variable, and the temperature is the dependent variable.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Getting it backwards', md: 'Ask: “Which one changes **because of** the other?” That one is the **dependent** variable. The time does not depend on the temperature.' },
      ],
      lines: [
        { say: 'A common mistake is to get the two variables backwards.', show: 'oops' },
        { say: 'To check, ask: which one changes because of the other? The one that changes because of the other is the dependent variable.', focus: 'oops' },
        { say: 'The temperature changes because time passes. But a cold morning does not make the clock go slower! The time does not depend on the temperature.' },
      ],
    },
    {
      chapter: 'One more example',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'A car drives along a highway. Every hour, the distance it has travelled goes up.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{\\text{hours}} \\;\\longrightarrow\\; \\opp{\\text{distance}}', '\\adj{\\text{independent}} \\qquad \\opp{\\text{dependent}}'] },
      ],
      lines: [
        { say: 'Let’s try one more. A car drives along a highway. Every hour, the distance it has travelled goes up.', show: 'q' },
        { say: 'Ask the question: which one changes because of the other? The distance goes up because the hours pass. The hours do not pass because of the distance.', show: 'm.0', focus: 'm.0' },
        { say: 'So the number of hours is the independent variable, and the distance travelled is the dependent variable.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A runner’s distance from the start is recorded every minute. Which statement is true?',
          choices: ['Time is the independent variable, and distance is the dependent variable.', 'Distance is the independent variable, and time is the dependent variable.', 'Time and distance are both independent variables.', 'Neither time nor distance is a variable.'],
          answer: 0,
          working: 'The distance changes because the minutes pass, so the distance depends on the time. Time is the independent variable.',
        },
      ],
      lines: [
        { say: 'Your turn. A runner’s distance from the start is recorded every minute. Which statement is true? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is A. The distance changes because the minutes pass, so time is the independent variable and distance is the dependent variable. Choice B gets them backwards: the time does not depend on how far the runner has gone.', show: 'q.answer' },
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
          items: ['Many functions show change over time.', 'When something changes over time, time is the independent variable.', 'Ask: which one changes because of the other? That one is dependent.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Many functions show how something changes over time.', show: 'sum.0' },
        { say: 'In these, time is the independent variable. It keeps going, no matter what.', show: 'sum.1' },
        { say: 'And to tell the variables apart, ask: which one changes because of the other? That one is the dependent variable. In the next part, you will find the rule that connects two variables. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
