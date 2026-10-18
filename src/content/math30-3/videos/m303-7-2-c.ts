import type { Explainer } from '@/video/script.ts';
import { marbles } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

/** A box of fuses: `blown` blown ones (red) and `good` good ones (green). */
const box = (id: string, blown: number, good: number) =>
  figure(id, [marbles({ groups: [{ id: 'blown', count: blown, tone: 'bad' }, { id: 'good', count: good, tone: 'good' }], perRow: 5 })], 330);

const video: Explainer = {
  id: 'm303-7-2-c',
  lessonId: 'm303-7-2',
  title: 'Probability of Combined Events, Part 3: Dependent Events',
  thumbnailTitle: 'Dependent Events',
  thumbnail: 'f1',
  summary: 'Picking without replacement makes events dependent, so P(A and B) = P(A) × P(B after A): from a box of 20 fuses with 3 blown, two picks are both blown with probability 3/20 × 2/19 = 3/190. Putting the first fuse back would give 3/20 × 3/20 = 9/400. The second fraction changes on the top and the bottom.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 3', title: 'Dependent Events', subtitle: 'Picking without replacement' }],
      lines: [
        { say: 'Take a fuse out of a box and keep it, and the box has changed: there is one fewer fuse, and maybe one fewer blown fuse. So the next pick has different chances.', show: 'title' },
        { say: 'In this video, you will learn what dependent events are, and find the probability that two of them both happen.' },
      ],
    },
    {
      chapter: 'Dependent events',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dependent events', md: 'Two events are **dependent** if the first one changes the probability of the second. Picking items one after another **without replacement** (without putting the first one back) gives dependent events.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(A \\text{ and } B) = P(A) \\times P(B \\text{ after } A)'] },
      ],
      lines: [
        { say: 'Two events are dependent if the first one changes the probability of the second.', show: 'def' },
        { say: 'Picking items one after another, without putting the first one back, gives dependent events. This is called picking without replacement.' },
        { say: 'The rule is almost the same as for independent events: multiply. But the second probability is the one after the first event has happened. P of A and B equals P of A, times P of B after A.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Blown fuses',
      layout: 'split',
      leftWidth: 460,
      left: [box('f1', 3, 17)],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'A box of 20 fuses in an electrician’s van holds 3 blown fuses. The electrician takes two fuses, one after the other, without putting the first back. What is the probability that both are blown?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{first fuse: } P(\\text{blown}) = \\dfrac{3}{20}'] },
      ],
      lines: [
        { say: 'A box of twenty fuses in an electrician’s van holds three blown fuses. The electrician takes two fuses, one after the other, without putting the first one back. What is the probability that both are blown?', show: ['p', 'f1'] },
        { say: 'Start with the first fuse. Three of the twenty fuses are blown, so the probability that the first fuse is blown is three twentieths.', show: 'm.0', focus: ['m.0', 'f1.blown'] },
      ],
    },
    {
      chapter: 'The second fuse',
      layout: 'split',
      leftWidth: 460,
      left: [box('f2', 2, 17)],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{left: } 19 \\text{ fuses, } 2 \\text{ blown}', 'P(\\text{second blown}) = \\dfrac{2}{19}', '\\dfrac{3}{20} \\times \\dfrac{2}{19} = \\dfrac{6}{380} = \\dfrac{3}{190}'] },
      ],
      lines: [
        { say: 'Now suppose the first fuse was blown. It stays out of the box. So the box now holds nineteen fuses, and only two of them are blown.', show: ['f2', 'm.0'], focus: ['m.0', 'f2.blown'] },
        { say: 'The probability that the second fuse is blown, after the first one was, is two nineteenths.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply: three twentieths times two nineteenths is six over 380. Both numbers divide by two, so the probability that both fuses are blown is three over 190.', show: 'm.2', focus: 'm.2' },
        { say: 'That is less than two percent. Pulling two blown fuses in a row is quite unlikely.' },
      ],
    },
    {
      chapter: 'With replacement',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'If the electrician **put the first fuse back**, the box would be the same for the second pick, and the picks would be independent.' },
        {
          kind: 'table',
          id: 't',
          head: ['Two picks', 'Second pick', 'P(both blown)'],
          rows: [
            ['Without replacement', '$\\dfrac{2}{19}$: one fewer blown, one fewer in all', '$\\dfrac{3}{20} \\times \\dfrac{2}{19} = \\dfrac{3}{190}$'],
            ['With replacement', '$\\dfrac{3}{20}$: the box is unchanged', '$\\dfrac{3}{20} \\times \\dfrac{3}{20} = \\dfrac{9}{400}$'],
          ],
        },
      ],
      lines: [
        { say: 'What if the electrician put the first fuse back before taking the second? That is called picking with replacement.', show: 'p' },
        { say: 'Then the box would be exactly the same for the second pick: twenty fuses, three of them blown. The picks would be independent.', show: 't.1', focus: 't.1' },
        { say: 'The probability that both are blown would be three twentieths times three twentieths, which is nine over 400.' },
        { say: 'Without replacement, the second fraction changes to two nineteenths, and the answer is three over 190. Always ask: does the first pick change what is left?', show: 't.0', focus: 't.0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not changing the second fraction', md: 'Without replacement, the second fraction has one fewer in the total **and** one fewer of the kind you want.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{3}{20}} \\qquad \\bad{\\dfrac{3}{19}} \\qquad \\good{\\dfrac{2}{19}}'] },
      ],
      lines: [
        { say: 'A common mistake is to forget to change the second fraction, or to change only half of it.', show: 'oops' },
        { say: 'Three twentieths is wrong for the second pick: the box no longer holds twenty fuses. Three nineteenths is wrong too: a blown fuse has been taken out, so only two are left.', show: 'm', focus: 'm' },
        { say: 'The second fraction has one fewer in the total, and one fewer of the kind you want: two nineteenths.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A drawer holds 8 batteries, and 2 of them are dead. Two batteries are taken, one after the other, without putting the first back. What is the probability that both are dead?',
          choices: ['$\\dfrac{1}{28}$', '$\\dfrac{1}{16}$', '$\\dfrac{1}{14}$', '$\\dfrac{1}{4}$'],
          answer: 0,
          working: '$\\dfrac{2}{8} \\times \\dfrac{1}{7} = \\dfrac{2}{56} = \\dfrac{1}{28}$. After one dead battery is taken, 1 of the 7 left is dead.',
        },
      ],
      lines: [
        { say: 'Your turn. A drawer holds eight batteries, and two of them are dead. Two batteries are taken, one after the other, without putting the first back. What is the probability that both are dead? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, one twenty-eighth. The first is dead with probability two eighths. Then one of the seven batteries left is dead, so multiply by one seventh, which gives two fifty-sixths, or one twenty-eighth. Choice B uses two eighths twice, as if the first battery were put back.', show: 'q.answer' },
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
            'Dependent events: the first changes the probability of the second.',
            '$P(A \\text{ and } B) = P(A) \\times P(B \\text{ after } A)$.',
            'Without replacement, change the top and the bottom of the second fraction.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two events are dependent when the first changes the probability of the second, as when you pick without replacement.', show: 'sum.0' },
        { say: 'For dependent events, multiply the probability of the first by the probability of the second after the first.', show: 'sum.1' },
        { say: 'And without replacement, change both the top and the bottom of the second fraction. In part four, we combine the rules to find the chance of at least one, and of exactly one. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
