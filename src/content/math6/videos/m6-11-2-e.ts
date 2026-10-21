import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm6-11-2-e',
  lessonId: 'm6-11-2',
  title: 'Function Rules and Equations, Part 5: Solving Problems with Equations',
  thumbnailTitle: 'Solving Problems with Equations',
  thumbnail: false,
  summary: 'Kiona has $20 and saves $5 each week. With w the number of weeks and s the savings in dollars, s depends on w, so s = 5w + 20. To find when Kiona has $95 for a pair of skates, put s = 95 into the equation and work backwards: 95 − 20 = 75, 75 ÷ 5 = 15, so after 15 weeks (check: 5 × 15 + 20 = 95).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Function Rules and Equations · Part 5', title: 'Solving Problems with Equations', subtitle: 'Saving up for a pair of skates' }],
      lines: [
        { say: 'Kiona has twenty dollars, and saves five dollars every week. A pair of skates costs ninety-five dollars. When will Kiona have enough?', show: 'title' },
        { say: 'You could list every week, one at a time. But an equation answers the question much faster. In this video, you will see how.' },
      ],
    },
    {
      chapter: 'Choose the variables',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'Kiona has \\$20 and saves \\$5 each week. After how many weeks will Kiona have \\$95?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{w} = \\text{number of weeks (independent)}', '\\opp{s} = \\text{savings in dollars (dependent)}'] },
      ],
      lines: [
        { say: 'Here is the problem. Kiona has twenty dollars and saves five dollars each week. After how many weeks will Kiona have ninety-five dollars?', show: 'q' },
        { say: 'First, choose the variables. Let w be the number of weeks. The weeks go by on their own, so w is the independent variable.', show: 'm.0', focus: 'm.0' },
        { say: 'Let s be Kiona’s savings, in dollars. The savings depend on the number of weeks, so s is the dependent variable. It goes on the left of the equation.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Write the equation',
      layout: 'split',
      leftWidth: 440,
      left: [{ kind: 'table', id: 't', head: ['Weeks, $w$', 'Savings, $s$ (\\$)'], rows: [['0', '20'], ['1', '25'], ['2', '30'], ['3', '35']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{each week adds } 5\\!: \\quad 5w', '\\text{starts with } 20\\!: \\quad + 20', 's = 5w + 20'] }],
      lines: [
        { say: 'Now write the equation. Here are Kiona’s savings for the first few weeks: twenty, twenty-five, thirty, thirty-five. Each week adds five dollars.', show: 't' },
        { say: 'Each week adds five, so multiply the number of weeks by five: five w.', show: 'm.0', focus: 'm.0' },
        { say: 'Kiona starts with twenty dollars, so add twenty.', show: 'm.1', focus: 'm.1' },
        { say: 'The equation is s equals five w plus twenty. Check a row: two weeks gives five times two, plus twenty, which is thirty. That matches the table.', show: 'm.2', focus: ['m.2', 't.2'] },
      ],
    },
    {
      chapter: 'Solve it',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['95 = 5w + 20', '\\text{undo } {+}\\,20\\!: \\quad 95 - 20 = 75', '\\text{undo } {\\times}\\,5\\!: \\quad 75 \\div 5 = 15', '\\text{Check: } 5 \\times 15 + 20 = 75 + 20 = 95 \\;\\checkmark'] },
        { kind: 'text', id: 'a', size: 'lg', md: 'Kiona will have \\$95 after **15 weeks**.' },
      ],
      lines: [
        { say: 'Kiona needs ninety-five dollars. So put ninety-five in place of s: ninety-five equals five w plus twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'Now work backwards. The rule multiplies by five, then adds twenty. Undo the last step first: ninety-five minus twenty is seventy-five.', show: 'm.1', focus: 'm.1' },
        { say: 'Then undo multiply by five: seventy-five divided by five is fifteen.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: five times fifteen is seventy-five, and seventy-five plus twenty is ninety-five. It works!', show: 'm.3', focus: 'm.3' },
        { say: 'So Kiona will have enough for the skates after fifteen weeks.', show: 'a' },
      ],
    },
    {
      chapter: 'The steps',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Choose** the variables. The dependent variable goes on the left.', '**Write** the equation: what to multiply by, then what to add.', '**Solve**: substitute the value you know, then calculate or work backwards.', '**Check** your answer, and answer the question in words.'] },
      ],
      lines: [
        { say: 'Here are the steps for a problem like this. First, choose the variables, with the dependent variable on the left.', show: 'b.0' },
        { say: 'Second, write the equation: what to multiply by, then what to add.', show: 'b.1' },
        { say: 'Third, solve: substitute the value you know. Calculate, or work backwards.', show: 'b.2' },
        { say: 'Last, check your answer, and answer the question in words.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Sam has \\$12 and saves \\$4 each week, so Sam’s savings are $s = 4w + 12$. After how many weeks will Sam have \\$40?',
          choices: ['$10$ weeks', '$13$ weeks', '$28$ weeks', '$7$ weeks'],
          answer: 3,
          working: '$40 = 4w + 12$. Undo “add 12”: $40 - 12 = 28$. Undo “multiply by 4”: $28 \\div 4 = 7$. Check: $4 \\times 7 + 12 = 40$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. Sam has twelve dollars and saves four dollars each week, so Sam’s savings are s equals four w plus twelve. After how many weeks will Sam have forty dollars? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D, seven weeks. Forty minus twelve is twenty-eight, and twenty-eight divided by four is seven. Choice A forgets the twelve dollars Sam started with.', show: 'q.answer' },
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
          items: ['Choose the variables and write the equation, with the dependent variable on the left.', 'Substitute the value you know, then calculate or work backwards.', 'Check your answer, and answer the question in words.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To solve a problem with an equation, choose the variables and write the equation, with the dependent variable on the left.', show: 'sum.0' },
        { say: 'Substitute the value you know, then calculate or work backwards.', show: 'sum.1' },
        { say: 'And check your answer, and answer the question in words. Well done! You can now describe functions with words, tables, graphs and equations.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
