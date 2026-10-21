import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { die, likelihood } from './lib/m6-12-figures.ts';
import { join } from './lib/m6-9-figures.ts';

const video: Explainer = {
  id: 'm6-12-2-b',
  lessonId: 'm6-12-2',
  title: 'Experiments and Likelihood, Part 2: Predicting Likelihood',
  thumbnailTitle: 'Predicting Likelihood',
  thumbnail: 'ln',
  summary: 'With equally likely outcomes, compare the outcomes in an event with all the outcomes: none is impossible (rolling a 7), fewer than half is unlikely (a 6), exactly half is equally likely to happen or not (an even number), more than half is likely (greater than 2), and all is certain (less than 7). Rolling a die 60 times, expect a 6 about 60 ÷ 6 = 10 times.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Relative Frequency and Probability · Part 2', title: 'Predicting Likelihood', subtitle: 'From impossible to certain' }],
      lines: [
        { say: 'Will it rain tomorrow? Will your team win? We often talk about how likely something is. With equally likely outcomes, you can predict it.', show: 'title' },
        { say: 'In this video, you will describe how likely an event is, and predict how often it will happen.' },
      ],
    },
    {
      chapter: 'Compare with all the outcomes',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Outcomes in the event', 'Likelihood', 'Die example'],
          rows: [
            ['none', '**impossible**', 'rolling a $7$'],
            ['fewer than half', '**unlikely**', 'rolling a $6$'],
            ['exactly half', '**equally likely** to happen or not', 'rolling an even number'],
            ['more than half', '**likely**', 'rolling a number greater than $2$'],
            ['all', '**certain**', 'rolling a number less than $7$'],
          ],
        },
      ],
      lines: [
        { say: 'To predict how likely an event is, compare the outcomes in the event with all the equally likely outcomes. A die has six outcomes.', show: 't.0', focus: 't.0' },
        { say: 'If none of the outcomes are in the event, it is impossible. Rolling a seven is impossible: no face has seven dots.', focus: 't.0' },
        { say: 'If fewer than half are in the event, it is unlikely. Rolling a six is just one outcome out of six.', show: 't.1', focus: 't.1' },
        { say: 'If exactly half are in it, the event is equally likely to happen or not happen. Rolling an even number is three outcomes out of six.', show: 't.2', focus: 't.2' },
        { say: 'If more than half are in it, the event is likely. Rolling a number greater than two is four outcomes out of six: three, four, five and six.', show: 't.3', focus: 't.3' },
        { say: 'And if all the outcomes are in it, the event is certain. Every face is less than seven, so rolling a number less than seven is certain.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'From impossible to certain',
      layout: 'center',
      main: [
        figure(
          'ln',
          [
            likelihood({
              length: 16,
              marks: [
                { at: 0, word: 'impossible' },
                { at: 0.25, word: 'unlikely' },
                { at: 0.5, word: 'equally likely' },
                { at: 0.75, word: 'likely' },
                { at: 1, word: 'certain' },
              ],
              notes: [
                { id: 'n7', at: 0, tex: '\\text{a } 7' },
                { id: 'n6', at: 1 / 6, tex: '\\text{a } 6' },
                { id: 'ev', at: 0.5, tex: '\\text{even}' },
                { id: 'g2', at: 4 / 6, tex: '{>}\\,2' },
                { id: 'l7', at: 1, tex: '{<}\\,7' },
              ],
            }),
          ],
          260,
        ),
        { kind: 'text', id: 't', size: 'md', md: 'The more of the outcomes an event has, the further right it goes.' },
      ],
      lines: [
        { say: 'We can show likelihood on a line. Impossible is at one end, and certain is at the other. Equally likely is right in the middle.', show: 'ln.line' },
        { say: 'Rolling a seven is impossible, so it goes at the left end. Rolling a six is unlikely, close to that end.', show: ['ln.n7', 'ln.n6'], focus: ['ln.n7', 'ln.n6'] },
        { say: 'Rolling an even number goes in the middle. Rolling a number greater than two is likely, and rolling a number less than seven is certain, at the right end.', show: ['ln.ev', 'ln.g2', 'ln.l7', 't'], focus: ['ln.ev', 'ln.g2', 'ln.l7'] },
      ],
    },
    {
      chapter: 'How many times to expect',
      layout: 'split',
      leftWidth: 360,
      left: [figure('six', [join(die('d6', [0, 0], 6, { size: 2.4, tone: 'good' }))], 300)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{a } 6\\!: \\ 1 \\text{ of the } 6 \\text{ outcomes}', '60 \\div 6 = 10', '\\text{about } 10 \\text{ times}'] }],
      lines: [
        { say: 'You can also predict how often an event will happen. You roll a die sixty times. About how many times should you expect to roll a six?', show: 'six' },
        { say: 'One of the six equally likely outcomes is a six. So you expect a six about once in every six rolls.', show: 'm.0', focus: 'm.0' },
        { say: 'Sixty rolls make ten groups of six rolls. Sixty divided by six is ten.', show: 'm.1', focus: 'm.1' },
        { say: 'So you should expect to roll a six about ten times. The real result will probably be close to ten, but not always exactly ten. Chance can give you a few more, or a few fewer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A spinner has $4$ equal sections: blue, orange, green and yellow. You spin it $40$ times. About how many times should you expect it to land on blue?',
          choices: ['$4$', '$20$', '$36$', '$10$'],
          answer: 3,
          working: 'Blue is $1$ of the $4$ equally likely outcomes, so expect it about $40 \\div 4 = 10$ times.',
        },
      ],
      lines: [
        { say: 'Your turn. A spinner has four equal sections: blue, orange, green and yellow. You spin it forty times. About how many times should you expect it to land on blue? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D, about ten times. Blue is one of four equally likely outcomes, and forty divided by four is ten. Choice B would be right for an event with half of the outcomes, not one quarter.', show: 'q.answer' },
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
          items: ['Compare the outcomes in the event with all the equally likely outcomes.', 'None: impossible. Fewer than half: unlikely. Half: equally likely. More than half: likely. All: certain.', 'To predict how often, share the number of tries among the outcomes: $60 \\div 6 = 10$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To predict how likely an event is, compare the outcomes in the event with all the equally likely outcomes.', show: 'sum.0' },
        { say: 'None means impossible, fewer than half means unlikely, exactly half means equally likely, more than half means likely, and all means certain.', show: 'sum.1' },
        { say: 'And to predict how often a single outcome happens, divide the number of tries by the number of outcomes. In the next part, you will test predictions with an experiment. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
