import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters, track } from './lib/m302-8-figures.ts';

const pile = (id: string) => figure(id, [counters({ n: 15 })], 200);
const all = (id: string) => Array.from({ length: 15 }, (_, k) => `${id}.c${k + 1}`);

/** Pile sizes 1 to 15: winning positions green, losing positions (multiples of 4) red. */
const positions = figure(
  'tr',
  [
    track({
      n: 15,
      shade: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((k) => ({
        k,
        tone: k % 4 === 0 ? ('bad' as const) : ('good' as const),
        group: k % 4 === 0 ? `l${k}` : `w${Math.ceil(k / 4)}`,
      })),
    }),
  ],
  180,
);

const video: Explainer = {
  id: 'm302-8-1-e',
  lessonId: 'm302-8-1',
  title: 'Puzzles and Games, Part 5: Finding a Winning Strategy',
  thumbnailTitle: 'A Winning Strategy',
  thumbnail: 'tr',
  summary: 'A take-away game: players remove 1, 2 or 3 counters from a pile of 15, and whoever takes the last counter wins. Working backward shows that 4, 8 and 12 are losing positions for the player about to move, so the first player takes 3 to leave 12, then makes each round total 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Puzzles, Games and the Research Project · Part 5', title: 'Finding a Winning Strategy', subtitle: 'Work backward from the end of the game' }],
      lines: [
        { say: 'Some games can always be won by the player who knows the trick. Finding that trick is a piece of mathematics.', show: 'title' },
        { say: 'In this video, you will work backward from the end of a game to find a winning strategy.' },
      ],
    },
    {
      chapter: 'The game',
      layout: 'center',
      main: [
        pile('p'),
        { kind: 'text', id: 't', size: 'md', md: 'Two players take turns removing 1, 2 or 3 counters from a pile of 15. The player who takes the last counter wins. How many should the first player take?' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Winning strategy', md: 'A way to play that guarantees a win, whatever the other player does.' },
      ],
      lines: [
        { say: 'Here is the game. Two players take turns removing one, two or three counters from a pile of fifteen. The player who takes the last counter wins.', show: [...all('p'), 't'] },
        { say: 'How many counters should the first player take?' },
        { say: 'We are looking for a winning strategy: a way to play that guarantees a win, whatever the other player does. To find one, work backward from the end of the game.', show: 'def' },
      ],
    },
    {
      chapter: 'Work backward',
      layout: 'center',
      main: [
        positions,
        { kind: 'text', id: 't', size: 'md', md: '[[good:Green]]: the player about to move can win. [[bad:Red]]: the player about to move loses, if the other player plays well.' },
      ],
      lines: [
        { say: 'Think about small piles first. Suppose it is your turn, and the pile has one, two or three counters. You take them all, and you win. Those are winning positions for the player about to move.', show: ['tr.boxes', 'tr.w1', 't'], focus: 'tr.w1' },
        { say: 'Now suppose the pile has four. Whatever you take, one, two or three, you leave three, two or one, and your opponent takes the rest and wins. So four is a losing position for the player about to move.', show: 'tr.l4', focus: 'tr.l4' },
        { say: 'With five, six or seven, you can take one, two or three to leave your opponent exactly four. So these are winning positions.', show: 'tr.w2', focus: 'tr.w2' },
        { say: 'Eight is a losing position again: whatever you take, your opponent can bring the pile down to four.', show: 'tr.l8', focus: 'tr.l8' },
        { say: 'The pattern repeats every four. Nine, ten and eleven are winning positions, twelve is losing, and thirteen, fourteen and fifteen are winning.', show: ['tr.w3', 'tr.l12', 'tr.w4'], focus: ['tr.w3', 'tr.l12', 'tr.w4'] },
        { say: 'So the losing positions are the multiples of four: four, eight and twelve.', focus: ['tr.l4', 'tr.l8', 'tr.l12'] },
      ],
    },
    {
      chapter: 'Rounds of four',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{opponent takes } t \\ \\Rightarrow\\ \\text{you take } 4 - t', '12 \\to 8 \\to 4 \\to 0'] }],
      lines: [
        { say: 'Here is how to stay in control. Leave your opponent a multiple of four. If your opponent then takes t counters, you take four minus t.', show: 'm.0', focus: 'm.0' },
        { say: 'Together, the two of you have taken four, so the pile drops by four each round: from twelve, to eight, to four, and finally to zero, with you taking the last counter.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'From fifteen',
      layout: 'center',
      main: [pile('p'), { kind: 'math', id: 'm', size: 'lg', lines: ['15 - 3 = 12 = 3 \\times 4'] }],
      lines: [
        { say: 'So from fifteen, the first player should take three.', show: all('p') },
        { say: 'That leaves twelve, a multiple of four: a losing position for the opponent.', hide: ['p.c13', 'p.c14', 'p.c15'], show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A sample game',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Turn', 'Takes', 'Left'],
          rows: [
            ['You', '$3$', '$12$'],
            ['Opponent', '$2$', '$10$'],
            ['You', '$2$', '$8$'],
            ['Opponent', '$1$', '$7$'],
            ['You', '$3$', '$4$'],
            ['Opponent', '$3$', '$1$'],
            ['You', '$1$', '$0$: you win'],
          ],
        },
      ],
      lines: [
        { say: 'Here is a sample game. You take three, leaving twelve. Your opponent takes two, leaving ten, so you take two, leaving eight.', show: ['t.0', 't.1', 't.2'], focus: 't.2' },
        { say: 'Your opponent takes one, leaving seven, so you take three, leaving four.', show: ['t.3', 't.4'], focus: 't.4' },
        { say: 'Your opponent takes three, leaving one, and you take the last counter. You win, and you would have won whatever your opponent did.', show: ['t.5', 't.6'], focus: 't.6' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In the same game (take $1$, $2$ or $3$ counters; whoever takes the last counter wins), the pile starts with $22$ counters. How many should the first player take?',
          choices: ['$1$', '$2$', '$3$', 'The first player cannot win'],
          answer: 1,
          working: '$22 = 20 + 2$, and $20$ is a multiple of $4$. Take $2$ to leave $20$, then make each round total $4$.',
        },
      ],
      lines: [
        { say: 'Your turn. In the same game, the pile starts with 22 counters. How many should the first player take? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, two. Twenty-two is two more than twenty, which is a multiple of four. Take two to leave twenty, then make each round total four. Choice D would be right only if the pile started at a multiple of four.', show: 'q.answer' },
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
            'A **winning strategy** guarantees a win, whatever the other player does.',
            'Work backward to find the **losing positions**: here, the multiples of 4.',
            'Always leave your opponent in a losing position: make each round total 4.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A winning strategy guarantees a win, whatever the other player does.', show: 'sum.0' },
        { say: 'To find one, work backward from the end of the game to find the losing positions: here, the multiples of four.', show: 'sum.1' },
        { say: 'Then always leave your opponent in a losing position, by making each round total four. In the next part, you will solve a measuring puzzle with a systematic search. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
