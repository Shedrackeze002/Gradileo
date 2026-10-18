import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters } from '../../math30-2/videos/lib/m302-8-figures.ts';
import { positionRow } from './lib/m303-9-figures.ts';

/** 22 counters in two rows of 11. */
const pile = figure('pile', [counters({ name: 'a', n: 11, at: [0, 1.2] }), counters({ name: 'b', n: 11, at: [0, 0] })], 260);
const allCounters = [...Array.from({ length: 11 }, (_, k) => `pile.a-c${k + 1}`), ...Array.from({ length: 11 }, (_, k) => `pile.b-c${k + 1}`)];

/** Take 1, 2 or 3: the multiples of 4 lose. */
const fours = figure('f', [positionRow({ from: 0, to: 12, marks: Object.fromEntries(Array.from({ length: 13 }, (_, k) => [k, k % 4 === 0 ? 'L' : 'W'])) })], 220);
const marks = (id: string, ks: number[]) => ks.map((k) => `${id}.m${k}`);

/** Take 1, 3 or 4: the losing positions are 0, 2, 7, 9, 14 and 16. */
const LOSE = [0, 2, 7, 9, 14, 16];
const odd = figure('u', [positionRow({ from: 0, to: 16, marks: Object.fromEntries(Array.from({ length: 17 }, (_, k) => [k, LOSE.includes(k) ? 'L' : 'W'])) })], 230);

const video: Explainer = {
  id: 'm303-9-1-g',
  lessonId: 'm303-9-1',
  title: 'Logic Puzzles and Games, Part 7: Take-Away Games',
  thumbnailTitle: 'Take-Away Games',
  thumbnail: 'f',
  summary: 'Find a winning strategy by working backward from the end. Taking 1 to 3 counters a turn, with the last counter winning, leaving your opponent a multiple of 4 means they lose: whatever they take, you take the rest of 4. With 22 counters, take 2 to leave 20. With unusual moves (1, 3 or 4), list the positions: a position is losing if every move leads to a winning one, which gives losing positions 0, 2, 7, 9, 14 and 16.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Logic Puzzles and Games · Part 7', title: 'Take-Away Games', subtitle: 'Working backward from the end' }],
      lines: [
        { say: 'In a take-away game, two players take turns removing counters from a pile. It looks like a game of luck, but with the right strategy, you can win every time you get the chance.', show: 'title' },
        { say: 'In this video, you will find the winning strategy by working backward from the end of the game.' },
      ],
    },
    {
      chapter: 'The game',
      layout: 'center',
      main: [
        pile,
        { kind: 'text', id: 'p', size: 'md', md: 'There are $22$ counters. On each turn, a player takes $1$, $2$ or $3$ counters. Whoever takes the **last** counter wins. You go first. How many should you take?' },
      ],
      lines: [
        { say: 'Here is the game. There are 22 counters. On each turn, a player takes one, two or three counters. Whoever takes the last counter wins.', show: [...allCounters, 'p'] },
        { say: 'You go first. How many should you take? Thinking forward from 22 is hard. So start from the end of the game, and work backward.' },
      ],
    },
    {
      chapter: 'Work backward',
      layout: 'center',
      main: [
        fours,
        { kind: 'text', id: 't', size: 'md', md: '[[good:W]]: the player about to move can win. [[bad:L]]: the player about to move loses, if the other player plays well.' },
      ],
      lines: [
        { say: 'Mark each pile size with W if the player about to move can win, or L if that player will lose against good play.', show: ['f.boxes', 't'] },
        { say: 'With zero counters left, the player about to move has already lost: the other player took the last one. So zero is L.', show: 'f.m0', focus: 'f.m0' },
        { say: 'With one, two or three counters, you can take them all and win. So those are W.', show: marks('f', [1, 2, 3]), focus: marks('f', [1, 2, 3]) },
        { say: 'With four counters, you are stuck. If you take one, two or three, your opponent takes the rest and wins. So four is L.', show: 'f.m4', focus: 'f.m4' },
        { say: 'With five, six or seven, take enough to leave four, and your opponent is stuck. Those are W. And eight is L again, because every move leaves five, six or seven.', show: marks('f', [5, 6, 7, 8]), focus: 'f.m8' },
        { say: 'The pattern goes on: the losing positions are the multiples of four.', show: marks('f', [9, 10, 11, 12]), focus: marks('f', [0, 4, 8, 12]) },
      ],
    },
    {
      chapter: 'The winning move',
      layout: 'center',
      main: [
        pile,
        { kind: 'math', id: 'm', size: 'md', lines: ['22 - 2 = 20, \\text{ a multiple of } 4', '\\text{then take } 4 - (\\text{what they took}) \\text{ each turn}'] },
      ],
      lines: [
        { say: 'So the strategy is: always leave your opponent a multiple of four.', show: allCounters },
        { say: 'With 22 counters, take two, to leave twenty.', show: 'm.0', hide: ['pile.b-c10', 'pile.b-c11'], focus: 'm.0' },
        { say: 'After that, whatever your opponent takes, take the rest of four. If they take one, you take three. If they take three, you take one. The pile drops to sixteen, then twelve, eight, four, and zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Your opponent faces a multiple of four every time, and you take the last counter.' },
      ],
    },
    {
      chapter: 'Unusual moves',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Now each turn takes $1$, $3$ or $4$ counters. A position is [[bad:L]] if **every** move leads to a [[good:W]] position, and [[good:W]] if **some** move leads to an [[bad:L]] position.' },
        odd,
      ],
      lines: [
        { say: 'When the allowed moves are unusual, list the positions one by one. Suppose each turn takes one, three or four counters, and the last counter still wins.', show: 'p' },
        { say: 'A position is L if every move from it leads to a W position. It is W if at least one move leads to an L position, because then you can hand your opponent a loss.' },
        { say: 'Zero is L. One is W: take one, and leave zero. Two is L: the only move is to take one, which leaves one, a W for your opponent.', show: ['u.boxes', ...marks('u', [0, 1, 2])], focus: marks('u', [0, 1, 2]) },
        { say: 'Three, four, five and six are all W: from each, you can leave zero or two.', show: marks('u', [3, 4, 5, 6]), focus: marks('u', [3, 4, 5, 6]) },
        { say: 'Seven is L: taking one, three or four leaves six, four or three, which are all W.', show: 'u.m7', focus: 'u.m7' },
        { say: 'Keep checking, and the losing positions are zero, two, seven, nine, fourteen, sixteen, and so on. Always move to one of these.', show: marks('u', [8, 9, 10, 11, 12, 13, 14, 15, 16]), focus: marks('u', LOSE) },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Players take $1$, $2$ or $3$ counters a turn, and whoever takes the last counter wins. There are $15$ counters, and it is your turn. How many should you take?',
          choices: ['$1$', '$3$', '$2$', 'It does not matter'],
          answer: 1,
          working: 'Leave a multiple of 4: $15 - 3 = 12$. Then take $4$ minus whatever your opponent takes.',
        },
      ],
      lines: [
        { say: 'Your turn. Players take one, two or three counters a turn, and whoever takes the last counter wins. There are fifteen counters, and it is your turn. How many should you take? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, three. That leaves twelve, a multiple of four, and then you take four minus whatever your opponent takes. Choice A leaves fourteen, which is not a multiple of four, so your opponent could take two and leave you twelve.', show: 'q.answer' },
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
          items: ['Work backward from the end of the game.', 'Taking 1 to 3, leave a multiple of 4; then take 4 minus what your opponent took.', 'A position is losing if every move leads to a winning one.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a winning strategy, work backward from the end of the game.', show: 'sum.0' },
        { say: 'When each turn takes one to three counters, leave a multiple of four, then take four minus what your opponent took.', show: 'sum.1' },
        { say: 'For other moves, list the positions: a position is losing if every move leads to a winning one. In part eight, we find the best move in tic-tac-toe. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
