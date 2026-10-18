import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vennBox } from './lib/m302-3-figures.ts';

const t = (s: string) => `\\text{${s}}`;

const video: Explainer = {
  id: 'm302-3-3-c',
  lessonId: 'm302-3-3',
  title: 'Mutually Exclusive Events, Part 3: Both, and Neither',
  thumbnailTitle: 'Both, and Neither',
  thumbnail: 'v',
  summary: 'Working backward with the addition rule: with P(sport) = 0.45, P(music) = 0.30 and P(sport or music) = 0.63, P(both) = 0.45 + 0.30 − 0.63 = 0.12 and P(neither) = 1 − 0.63 = 0.37, checked by filling a Venn diagram from the middle out.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 3', title: 'Both, and Neither', subtitle: 'Working backward with the addition rule' }],
      lines: [
        { say: 'The addition rule has four parts: P of A, P of B, P of A and B, and P of A or B. If you know any three of them, you can find the fourth.', show: 'title' },
        { say: 'In this video, you will work backward to find the probability of both events, find the probability of neither, and check with a Venn diagram.' },
      ],
    },
    {
      chapter: 'Four parts',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)', 'P(A \\text{ and } B) = P(A) + P(B) - P(A \\text{ or } B)'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Neither', md: '“Neither $A$ nor $B$” is the complement of “$A$ or $B$”, so $P(\\text{neither}) = 1 - P(A \\text{ or } B)$.' },
      ],
      lines: [
        { say: 'Here is the addition rule: P of A or B equals P of A, plus P of B, minus P of A and B.', show: 'm.0', focus: 'm.0' },
        { say: 'Rearrange it, and you can find the overlap: P of A and B equals P of A, plus P of B, minus P of A or B.', show: 'm.1', focus: 'm.1' },
        { say: 'And the event “neither A nor B” is the complement of “A or B”: an outcome is in neither event exactly when it is not in either one. So P of neither is one minus P of A or B.', show: 'key' },
      ],
    },
    {
      chapter: 'Sport and music',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'At a school, $P(\\text{sport}) = 0.45$, $P(\\text{music}) = 0.30$, and the probability that a student does at least one of these is $0.63$. Find the probability that a student does both, and that a student does neither.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(S \\text{ and } M) = P(S) + P(M) - P(S \\text{ or } M)', '= 0.45 + 0.30 - 0.63 = 0.12', 'P(\\text{neither}) = 1 - 0.63 = 0.37'] },
      ],
      lines: [
        { say: 'At a school, the probability that a student plays a sport is 0.45, and the probability that a student plays a musical instrument is 0.30.', show: 'p' },
        { say: 'The probability that a student does at least one of these is 0.63. Find the probability that a student does both, and the probability that a student does neither.' },
        { say: 'At least one of these means sport, or music, or both. So 0.63 is P of S or M.' },
        { say: 'Use the rule backward. P of S and M is P of S, plus P of M, minus P of S or M.', show: 'm.0', focus: 'm.0' },
        { say: 'That is 0.45 plus 0.30, minus 0.63, which is 0.12. So the probability that a student does both is 0.12.', show: 'm.1', focus: 'm.1' },
        { say: 'Neither is the complement of “sport or music”. So P of neither is one minus 0.63, which is 0.37.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check with a Venn diagram',
      layout: 'split',
      leftWidth: 580,
      left: [figure('v', [vennBox({ titles: [t('Sport'), t('Music')], values: { a: '0.33', both: '0.12', b: '0.18', out: '0.37' } })], 440)],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{both: } 0.12', 'S \\text{ only: } 0.45 - 0.12 = 0.33', 'M \\text{ only: } 0.30 - 0.12 = 0.18', '\\text{neither: } 0.37', '0.33 + 0.12 + 0.18 + 0.37', '= 1 \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Check with a Venn diagram, and fill it in from the middle out. Start with both: 0.12 goes in the overlap.', show: ['v.box', 'v.a', 'v.b', 'v.vab', 'v.sab', 'm.0'], focus: ['v.vab', 'm.0'] },
        { say: 'The whole sport circle is 0.45, so sport only is 0.45 minus 0.12, which is 0.33.', show: ['v.va', 'v.sa', 'm.1'], focus: ['v.va', 'm.1'] },
        { say: 'The whole music circle is 0.30, so music only is 0.30 minus 0.12, which is 0.18.', show: ['v.vb', 'v.sb', 'm.2'], focus: ['v.vb', 'm.2'] },
        { say: 'And neither, outside both circles, is 0.37.', show: ['v.vout', 'v.sout', 'm.3'], focus: ['v.vout', 'v.sout', 'm.3'] },
        { say: 'The four regions cover every student, so they must add to one. 0.33 plus 0.12 plus 0.18 plus 0.37 is one. It checks.', show: ['m.4', 'm.5'], focus: ['m.4', 'm.5'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Neither is not 1 − P(A) − P(B)', md: 'Subtracting both probabilities from 1 takes away the students who do both **twice**. Find $P(A \\text{ or } B)$ first, then subtract it from 1.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{1 - 0.45 - 0.30 = 0.25} \\qquad \\good{1 - 0.63 = 0.37}'] },
      ],
      lines: [
        { say: 'A common mistake is to find neither by subtracting both probabilities from one: one minus 0.45 minus 0.30, which is 0.25.', show: 'oops' },
        { say: 'That takes away the students who do both twice: once with sport, and again with music. So it is too small by 0.12.', show: 'm', focus: 'm' },
        { say: 'Find P of A or B first, then subtract it from one: one minus 0.63 is 0.37.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For a student in a class, $P(\\text{cat}) = 0.4$, $P(\\text{dog}) = 0.5$ and $P(\\text{cat and dog}) = 0.2$. What is the probability that a student has neither pet?',
          choices: ['$0.1$', '$0.7$', '$0.9$', '$0.3$'],
          answer: 3,
          working: '$P(\\text{cat or dog}) = 0.4 + 0.5 - 0.2 = 0.7$, so $P(\\text{neither}) = 1 - 0.7 = 0.3$.',
        },
      ],
      lines: [
        { say: 'Your turn. For a student in a class, the probability of having a cat is 0.4, of having a dog is 0.5, and of having both a cat and a dog is 0.2. What is the probability that a student has neither pet? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 0.3. First, P of cat or dog is 0.4 plus 0.5 minus 0.2, which is 0.7. Neither is the complement, so it is one minus 0.7, which is 0.3. Choice A, 0.1, subtracts both probabilities from one, which takes away the students with both pets twice.', show: 'q.answer' },
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
          items: ['Know three parts of the addition rule, and you can find the fourth.', '$P(\\text{neither}) = 1 - P(A \\text{ or } B)$', 'Fill a Venn diagram from the middle out; its regions add to 1.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If you know three parts of the addition rule, you can find the fourth.', show: 'sum.0' },
        { say: 'P of neither is one minus P of A or B.', show: 'sum.1' },
        { say: 'And fill a Venn diagram from the middle out: its four regions add to one. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
