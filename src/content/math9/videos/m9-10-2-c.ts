import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { crowd, join, lasso, note, picks } from './lib/m9-10-figures.ts';

// A large school of 600 students as 60 dots, 12 to a row, each dot standing for 10 students. The
// 80 students in line at the cafeteria (8 dots, orange) stand together at the top left; students
// with strong opinions about the menu (8 dots, pink) are spread out.
const LINE = new Set([0, 1, 2, 3, 12, 13, 14, 15]);
const STRONG = new Set([9, 19, 29, 31, 40, 46, 53, 58]);
// The poll's answers: every student with a strong opinion, and just one other student.
const VOLUNTEERS = [9, 19, 29, 31, 40, 46, 53, 58, 23];
// A random sample of 80 students (8 dots), spread over the whole school: one dot from the line,
// one with a strong opinion, and six others.
const RANDOM = [1, 10, 20, 27, 33, 38, 46, 56];

const school = (id: string) =>
  figure(
    id,
    [
      join(
        crowd({
          count: 60,
          cols: 12,
          groups: [
            { id: 'others', tone: 'adj' },
            { id: 'line', tone: 'opp' },
            { id: 'strong', tone: 'hyp' },
          ],
          groupOf: (i) => (LINE.has(i) ? 'line' : STRONG.has(i) ? 'strong' : 'others'),
        }),
        lasso({ id: 'caf', c: [1.5, -0.5], rx: 2.3, ry: 1.2, tone: 'bad', label: '\\text{in line at the cafeteria}', labelAt: [3.4, 0.75] }),
        picks({ id: 'vol', which: VOLUNTEERS, cols: 12, tone: 'theta' }),
        picks({ id: 'rand', which: RANDOM, cols: 12, tone: 'theta' }),
        note({ id: 'key', at: [-0.3, -5.1], tex: '\\opp{\\bullet}\\ \\text{in line}\\qquad \\hyp{\\bullet}\\ \\text{strong opinion}', place: 'right', group: 'keys' }),
        note({ id: 'key2', at: [-0.3, -5.9], tex: '\\adj{\\bullet}\\ \\text{everyone else}', place: 'right', group: 'keys' }),
      ),
    ],
    430,
  );

const PEOPLE = (id: string) => [`${id}.others`, `${id}.line`, `${id}.strong`, `${id}.keys`];

const video: Explainer = {
  id: 'm9-10-2-c',
  lessonId: 'm9-10-2',
  title: 'Populations and Samples, Part 3: Representative Samples',
  thumbnailTitle: 'Representative Samples',
  thumbnail: 'pr',
  summary:
    'A convenience sample chooses the people who are easiest to reach; a voluntary response sample lets people choose themselves, as in an online poll. Both are usually biased. A random sample gives every member a fair chance, and the best way to get a representative sample, one with the same mix of people as the population. To learn what all students at a large school think of the cafeteria menu, asking 80 students in line or posting a poll is biased; choosing 80 students at random from the list of all students is representative. A huge sample can still be biased: how a sample is chosen matters more than its size.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 3', title: 'Representative Samples', subtitle: 'A small copy of the population' }],
      lines: [
        { say: 'Some ways of choosing a sample are quick and easy, but they quietly give the wrong answer.', show: 'title' },
        { say: 'In this video, you will meet two of them, convenience samples and voluntary response samples, and learn what makes a sample representative.' },
      ],
    },
    {
      chapter: 'Two easy methods',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Convenience sample:** choose the people who are **easiest to reach**.',
            '**Voluntary response sample:** people **choose themselves** by deciding to answer, as in an online poll.',
          ],
        },
      ],
      lines: [
        { say: 'A convenience sample chooses the people who are easiest to reach, like the people standing nearest to you.', show: 'b.0', focus: 'b.0' },
        { say: 'In a voluntary response sample, people choose themselves, by deciding whether to answer. An online poll that anyone can click on is a voluntary response sample.', show: 'b.1', focus: 'b.1' },
        { say: 'Both are easy. But as you will see, both are usually biased.' },
      ],
    },
    {
      chapter: 'Plan A: the cafeteria line',
      layout: 'split',
      leftWidth: 620,
      left: [school('pa')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Liam wants to know what **all** the students at a large school think of the new cafeteria menu. **Plan A:** ask $80$ students in line at the cafeteria.' }],
      lines: [
        { say: 'Liam wants to know what all the students at a large school think of the new cafeteria menu. Here is the school. Each dot stands for ten students.', show: [...PEOPLE('pa'), 'q'] },
        { say: 'Plan A: ask eighty students standing in line at the cafeteria. That is a convenience sample, because those students are easy to reach.', show: 'pa.caf', focus: 'pa.caf' },
        { say: 'But students in line already eat in the cafeteria. Students who bring their own lunch, maybe because they dislike the menu, are never asked. So Plan A is biased.' },
      ],
    },
    {
      chapter: 'Plan B: an online poll',
      layout: 'split',
      leftWidth: 620,
      left: [school('pb')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: '**Plan B:** put a poll on the school website, and let anyone answer.' }],
      lines: [
        { say: 'Plan B: put a poll on the school website, and let anyone who wants to answer it. That is a voluntary response sample.', show: [...PEOPLE('pb'), 'q'] },
        { say: 'Who bothers to answer? Mostly students with strong opinions, who love the menu or hate it. The pink dots are those students, and the yellow rings show who answered.', show: 'pb.vol', focus: ['pb.vol', 'pb.strong'] },
        { say: 'Most students, who feel it is just fine, never answer. So Plan B is biased as well.' },
      ],
    },
    {
      chapter: 'Plan C: at random',
      layout: 'split',
      leftWidth: 620,
      left: [school('pc')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '**Plan C:** choose $80$ students **at random** from the list of all students.' },
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Representative sample',
          md: 'A **representative sample** has the same mix of people as the population, like a small copy of it. A **random** sample is the best way to get one.',
        },
      ],
      lines: [
        { say: 'Plan C: choose eighty students at random from the list of all the students. Every student has a fair chance to be chosen.', show: [...PEOPLE('pc'), 'q', 'pc.rand'], focus: 'pc.rand' },
        { say: 'The yellow rings are spread across the whole school. They include some students from the line, some with strong opinions, and lots of others, in about the same mix as the whole school.' },
        { say: 'A representative sample has the same mix of people as the population, like a small copy of it. Choosing at random is the best way to get one. So Plan C is the best plan.', show: 'def' },
      ],
    },
    {
      chapter: 'More is not always better',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: '“More is better”',
          md: 'A huge sample is not automatically representative. $1{,}000$ answers to an online poll can still be biased, because the people chose themselves. **How** a sample is chosen matters more than **how big** it is.',
        },
      ],
      lines: [
        { say: 'Watch out for one more trap. It is tempting to think that a bigger sample is always better.', show: 'oops' },
        { say: 'But a thousand answers to an online poll can still be biased, because the people chose themselves. A thousand people with strong opinions are still people with strong opinions.' },
        { say: 'How a sample is chosen matters more than how big it is. A random sample of eighty can tell you more than a thousand volunteers.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A website asks its visitors to vote in an online poll about a new video game, and $5{,}000$ people vote. Which statement is true?',
          choices: [
            'The results are representative, because $5{,}000$ is a large sample.',
            'It is a simple random sample.',
            'It is a census of everyone who plays games.',
            'It is a voluntary response sample, so the results may be biased.',
          ],
          answer: 3,
          working: 'The voters chose themselves, so it is a voluntary response sample. People with strong feelings about the game are more likely to vote, so the results may be biased, however many people vote.',
        },
      ],
      lines: [
        { say: 'Your turn. A website asks its visitors to vote in an online poll about a new video game, and five thousand people vote. Which statement is true? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D. The voters chose themselves, so it is a voluntary response sample, and it may be biased. Choice A thinks a big sample fixes everything, but how the sample is chosen matters more than its size.', show: 'q.answer' },
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
            '**Convenience** samples (easiest to reach) and **voluntary response** samples (people choose themselves) are usually biased.',
            'A **representative** sample has the same mix of people as the population.',
            'Choosing **at random** is the best way to get a representative sample.',
            'How a sample is chosen matters more than how big it is.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Samples chosen for convenience, and voluntary response samples, are usually biased.', show: 'sum.0' },
        { say: 'A representative sample has the same mix of people as the population.', show: 'sum.1' },
        { say: 'Choosing at random is the best way to get a representative sample.', show: 'sum.2' },
        { say: 'And how a sample is chosen matters more than how big it is. In the next part, you will work out how many people to choose from each group in a stratified sample. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
