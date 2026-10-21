import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { plants } from './lib/m6-11-figures.ts';

// The lesson's bean plant: 4 cm tall at the start, growing 3 cm each week.
const HEIGHTS = [4, 7, 10, 13, 16];

const video: Explainer = {
  id: 'm6-11-1',
  lessonId: 'm6-11-1',
  title: 'Independent and Dependent Variables, Part 1: Two Quantities That Change Together',
  thumbnailTitle: 'Two Quantities That Change Together',
  thumbnail: 'pl',
  summary: 'A variable is a quantity that can change, such as time, height or cost. A function connects two changing quantities so that each value of the first gives exactly one value of the second. For a bean plant 4 cm tall that grows 3 cm each week, the number of weeks is the independent variable and the height is the dependent variable; the 3 cm per week is not a variable.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Functions · Part 1', title: 'Two Quantities That Change Together', subtitle: 'Which one depends on the other?' }],
      lines: [
        { say: 'A bean plant grows taller every week. The longer you wait, the taller it gets.', show: 'title' },
        { say: 'In this video, you will learn about variables and functions, and how to tell which quantity depends on the other.' },
      ],
    },
    {
      chapter: 'A growing bean plant',
      layout: 'split',
      leftWidth: 640,
      left: [figure('pl', [plants({ heights: HEIGHTS })])],
      right: [{ kind: 'bullets', id: 'b', items: ['The number of **weeks** changes.', 'The **height** of the plant changes.', 'They change **together**.'] }],
      lines: [
        { say: 'Here is a bean plant, week by week. At the start, in week zero, it is four centimetres tall.', show: ['pl.p0', 'pl.h0', 'pl.w0', 'pl.title'] },
        { say: 'Every week, it grows three centimetres taller: seven centimetres, then ten, then thirteen, then sixteen.', show: ['pl.p1', 'pl.h1', 'pl.w1', 'pl.p2', 'pl.h2', 'pl.w2', 'pl.p3', 'pl.h3', 'pl.w3', 'pl.p4', 'pl.h4', 'pl.w4'] },
        { say: 'Two things are changing here. The number of weeks changes, and the height of the plant changes.', show: ['b.0', 'b.1'] },
        { say: 'And they change together. The more weeks go by, the taller the plant gets.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Variables',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Variable', md: 'A **variable** is a quantity that can change, such as time, height or cost. We often use a **letter** for it.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{w} = \\text{number of weeks}', '\\opp{h} = \\text{height of the plant}'] },
      ],
      lines: [
        { say: 'A quantity that can change is called a variable. Time, height and cost are all variables.', show: 'def' },
        { say: 'We often use a letter for a variable. Here, the letter w stands for the number of weeks, and the letter h stands for the height of the plant.', show: ['m.0', 'm.1'] },
        { say: 'What about the three centimetres the plant grows each week? That is not a variable. It stays the same the whole time.' },
      ],
    },
    {
      chapter: 'Functions',
      layout: 'split',
      leftWidth: 640,
      left: [figure('fn', [plants({ heights: HEIGHTS })])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Function', md: 'A **function** connects two changing quantities, so that each value of the first quantity gives **exactly one** value of the second.' }],
      lines: [
        { say: 'The weeks and the height are connected. Pick a number of weeks, and the plant has exactly one height at that time.', show: 'fn' },
        { say: 'A connection like this is called a function. A function connects two changing quantities, so that each value of the first quantity gives exactly one value of the second.', show: 'def' },
        { say: 'In week two, the plant has one height: ten centimetres. It cannot be ten centimetres and twelve centimetres at the same time!', focus: ['fn.p2', 'fn.h2', 'fn.w2'] },
      ],
    },
    {
      chapter: 'Independent and dependent',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Independent and dependent variables', md: 'The **independent variable** is the one you choose, or that changes on its own (often time). The **dependent variable** changes because of it: its value **depends on** the independent variable.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{\\text{weeks}} \\;\\longrightarrow\\; \\opp{\\text{height}}', '\\adj{\\text{independent}} \\qquad \\opp{\\text{dependent}}'] },
      ],
      lines: [
        { say: 'The two variables of a function have names. The independent variable is the one you choose, or the one that changes on its own. Time is often the independent variable.', show: 'def' },
        { say: 'The dependent variable changes because of it. Its value depends on the independent variable.', focus: 'def' },
        { say: 'For the bean plant, the height changes because the weeks go by. So the height depends on the number of weeks.', show: 'm.0', focus: 'm.0' },
        { say: 'That means the number of weeks is the independent variable, and the height of the plant is the dependent variable.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cup of hot cocoa cools down as the minutes pass. Which is the **dependent** variable?',
          choices: ['The number of minutes', 'The temperature of the cocoa', 'Both of them', 'Neither of them'],
          answer: 1,
          working: 'The temperature changes because the minutes pass, so the temperature depends on the time. The minutes are the independent variable.',
        },
      ],
      lines: [
        { say: 'Your turn. A cup of hot cocoa cools down as the minutes pass. Which is the dependent variable? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, the temperature of the cocoa. It changes because the minutes pass, so it depends on the time. Choice A is the independent variable: the minutes go by on their own.', show: 'q.answer' },
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
          items: ['A variable is a quantity that can change.', 'A function connects two quantities: each value of the first gives exactly one value of the second.', 'The dependent variable depends on the independent variable.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A variable is a quantity that can change, like time, height or cost.', show: 'sum.0' },
        { say: 'A function connects two changing quantities, so that each value of the first gives exactly one value of the second.', show: 'sum.1' },
        { say: 'And the dependent variable depends on the independent variable. In the next part, you will look at quantities that change over time. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
