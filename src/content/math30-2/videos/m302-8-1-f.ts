import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { jugs } from './lib/m302-8-figures.ts';

const pair = (id: string) => figure(id, [jugs()], 400);
/** The goal reached: 3 L in the small jug and 4 L in the large one. */
const done = figure('end', [jugs({ only: ['a3', 'b4'] })], 400);

const video: Explainer = {
  id: 'm302-8-1-f',
  lessonId: 'm302-8-1',
  title: 'Puzzles and Games, Part 6: A Systematic Search',
  thumbnailTitle: 'A Systematic Search',
  thumbnail: 'end',
  summary: 'Some puzzles need a systematic search: record the state after every move and try the moves in order. Worked example: measuring exactly 4 L with an empty 3 L jug, an empty 5 L jug and a tap in six steps, (0, 5), (3, 2), (0, 2), (2, 0), (2, 5), (3, 4), and why it works.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Puzzles, Games and the Research Project · Part 6', title: 'A Systematic Search', subtitle: 'Measuring 4 L with a 3 L jug and a 5 L jug' }],
      lines: [
        { say: 'Some puzzles have no clever shortcut. Instead, you search for the answer step by step, keeping track of everything you have tried.', show: 'title' },
        { say: 'In this video, you will measure exactly four litres of water, using only a three-litre jug, a five-litre jug and a tap.' },
      ],
    },
    {
      chapter: 'The puzzle',
      layout: 'split',
      leftWidth: 480,
      left: [pair('j')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'The only moves:' },
        { kind: 'bullets', id: 'b', items: ['Fill a jug from the tap.', 'Empty a jug.', 'Pour one jug into the other, until the first is empty or the second is full.'] },
      ],
      lines: [
        { say: 'You have an empty three-litre jug, an empty five-litre jug, and a tap. The jugs have no markings, so you only know how much water a jug holds when it is empty, when it is full, or by working it out as you pour.', show: ['j.jugA', 'j.jugB'] },
        { say: 'There are only three kinds of move. Fill a jug from the tap. Empty a jug. Or pour one jug into the other, until the first is empty or the second is full.', show: ['t', 'b.0', 'b.1', 'b.2'] },
        { say: 'The goal is to end up with exactly four litres in one of the jugs.' },
      ],
    },
    {
      chapter: 'Keeping track',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A systematic search', md: 'Record the **state**, the amount in each jug, after every move. Try the moves in order until you reach the goal, and never go back to a state you have already reached.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(\\text{3 L jug},\\ \\text{5 L jug}) \\qquad \\text{start: } (0, 0)'] },
      ],
      lines: [
        { say: 'A systematic search keeps track of the state: how much water is in each jug. After each move, write down the new state, and try the possible moves in order, never going back to a state you have already reached.', show: 'key' },
        { say: 'Write each state as two numbers: the litres in the three-litre jug, then the litres in the five-litre jug. At the start, both jugs are empty: zero, zero.', show: 'm' },
      ],
    },
    {
      chapter: 'Six steps',
      layout: 'split',
      leftWidth: 480,
      left: [pair('j')],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Move', '3 L', '5 L'],
          rows: [
            ['Start', '$0$', '$0$'],
            ['Fill the 5 L jug', '$0$', '$5$'],
            ['Pour 5 L into 3 L', '$3$', '$2$'],
            ['Empty the 3 L jug', '$0$', '$2$'],
            ['Pour 5 L into 3 L', '$2$', '$0$'],
            ['Fill the 5 L jug', '$2$', '$5$'],
            ['Pour 5 L into 3 L', '$3$', '$\\good{4}$'],
          ],
        },
      ],
      lines: [
        { say: 'Start with both jugs empty. First, fill the five-litre jug from the tap. The state is zero, five.', show: ['j.jugA', 'j.jugB', 't.0', 't.1', 'j.b5'], focus: 't.1' },
        { say: 'Pour the five-litre jug into the three-litre jug until the small one is full. Three litres move across, so two are left behind: three, two.', hide: 'j.b5', show: ['j.a3', 'j.b2', 't.2'], focus: 't.2' },
        { say: 'Empty the three-litre jug: zero, two.', hide: 'j.a3', show: 't.3', focus: 't.3' },
        { say: 'Pour the two litres into the three-litre jug: two, zero.', hide: 'j.b2', show: ['j.a2', 't.4'], focus: 't.4' },
        { say: 'Fill the five-litre jug again: two, five.', show: ['j.b5', 't.5'], focus: 't.5' },
        { say: 'Now top up the three-litre jug from the five-litre jug. It holds three litres and already has two, so only one litre moves across. That leaves four litres in the five-litre jug: three, four. Done, in six steps.', hide: ['j.a2', 'j.b5'], show: ['j.a3', 'j.b4', 't.6'], focus: ['t.6', 'j.b4'] },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'split',
      leftWidth: 420,
      left: [done],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['5 - 3 = 2', '5 - (3 - 2) = 5 - 1 = 4'] },
        { kind: 'text', id: 't', size: 'md', md: 'Starting with the 3 L jug also works, but takes eight steps: $(3, 0)$, $(0, 3)$, $(3, 3)$, $(1, 5)$, $(1, 0)$, $(0, 1)$, $(3, 1)$, $(0, 4)$.' },
      ],
      lines: [
        { say: 'Why does it work? The first pour takes three litres away from five, which leaves two.', show: ['end', 'm.0'], focus: 'm.0' },
        { say: 'With those two litres in the small jug, there is room for only one more litre. So the second pour takes just one litre from five, which leaves four.', show: 'm.1', focus: 'm.1' },
        { say: 'A search that starts by filling the three-litre jug also reaches four litres, but it takes eight steps. Trying both ways, and keeping the shorter one, is part of a systematic search.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Start with an empty 3 L jug and an empty 5 L jug. Fill the 3 L jug and pour it into the 5 L jug. Fill the 3 L jug again, and pour it into the 5 L jug until the 5 L jug is full. How much water is left in the 3 L jug?',
          choices: ['$1$ L', '$0$ L', '$2$ L', '$3$ L'],
          answer: 0,
          working: 'The states are $(3, 0)$, $(0, 3)$, $(3, 3)$, $(1, 5)$. The 5 L jug had room for only $2$ L more, so $3 - 2 = 1$ L is left.',
        },
      ],
      lines: [
        { say: 'Your turn. Start with an empty three-litre jug and an empty five-litre jug. Fill the three-litre jug and pour it into the five-litre jug. Fill the three-litre jug again, and pour it into the five-litre jug until the five-litre jug is full. How much water is left in the three-litre jug? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, one litre. After the first pour, the five-litre jug holds three litres, so it has room for only two more. Pouring from the second full three-litre jug moves two litres across and leaves one behind. Choice B assumes that all three litres fit.', show: 'q.answer' },
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
            'A **systematic search** records the state after every move.',
            'Try the moves in order, and never repeat a state.',
            'With 3 L and 5 L jugs, 4 L takes six steps: $(0, 5), (3, 2), (0, 2), (2, 0), (2, 5), (3, 4)$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A systematic search records the state after every move.', show: 'sum.0' },
        { say: 'Try the moves in order, and never go back to a state you have already reached.', show: 'sum.1' },
        { say: 'With a three-litre jug and a five-litre jug, four litres takes six steps. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
