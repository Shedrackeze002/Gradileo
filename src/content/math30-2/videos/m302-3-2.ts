import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from '@/content/math30-1/videos/lib/m301-9-counting.ts';

const t = (s: string) => `\\text{${s}}`;

const video: Explainer = {
  id: 'm302-3-2',
  lessonId: 'm302-3-2',
  title: 'Probability Using Counting Methods, Part 1: Arrangements',
  thumbnailTitle: 'Probability with Arrangements',
  thumbnail: 'ph',
  summary: 'Finding probabilities by counting arrangements: two friends in the first two places of a photo line-up (3!/5! = 1/20), two students sitting together (5! × 2!/6! = 1/3), and the letters of CANADA beginning and ending with A (4! ÷ 6!/3! = 1/5). Part 2 uses combinations.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 1', title: 'Probability with Arrangements', subtitle: 'Count the favourable orders and all the orders' }],
      lines: [
        { say: 'What is the chance that two friends end up side by side when a class sits in a random order? There are far too many seatings to list, but counting methods can count them for you.', show: 'title' },
        { say: 'In this video, you will find probabilities by counting arrangements: for a photo line-up, two people who sit together, and letters that repeat.' },
      ],
    },
    {
      chapter: 'Count both parts',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(A) = \\dfrac{\\text{number of favourable outcomes}}{\\text{total number of outcomes}}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Count, do not list', md: 'When there are too many outcomes to list, count the numerator and the denominator with the fundamental counting principle, permutations ($n!$, ${}_{n}P_{r}$) or combinations (${}_{n}C_{r}$).' },
      ],
      lines: [
        { say: 'When the outcomes are equally likely, the probability of an event is the number of favourable outcomes over the total number of outcomes.', show: 'm' },
        { say: 'When there are too many outcomes to list, count both numbers instead. Use the fundamental counting principle, permutations, or combinations.', show: 'key' },
        { say: 'In this part, the order matters in every problem: people in a line, and letters in a word. So we count arrangements, with factorials and permutations.' },
      ],
    },
    {
      chapter: 'Lining up for a photo',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('ph', [
          slots({ name: 'all', values: ['5', '4', '3', '2', '1'], captions: [t('1st'), t('2nd'), t('3rd'), t('4th'), t('5th')], at: [0, 3.4] }),
          slots({ name: 'fav', values: ['1', '1', '3', '2', '1'], captions: [t('Emeka'), t('Bao'), t('3rd'), t('4th'), t('5th')], at: [0, 0], shade: [0, 1] }),
        ], 420),
      ],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'Five friends, including Emeka and Bao, line up in a random order. What is the probability that Emeka is first and Bao is second?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{all orders: } 5! = 120', '\\text{favourable: } 1 \\times 1 \\times 3! = 6', 'P = \\dfrac{6}{120} = \\dfrac{1}{20}'] },
      ],
      lines: [
        { say: 'Five friends, including Emeka and Bao, line up for a photo in a random order. What is the probability that Emeka is first and Bao is second?', show: 'p' },
        { say: 'First, count all the orders. Any of the five friends can stand first, then any of the four who are left, then three, two and one. That is five factorial, or 120 orders.', show: ['ph.all-boxes', 'ph.all-values', 'ph.all-captions', 'ph.all-times', 'm.0'], focus: 'm.0' },
        { say: 'Now count the favourable orders. Emeka must be first, so there is only one choice for the first place. Bao must be second: one choice again.', show: ['ph.fav-boxes', 'ph.fav-captions', 'ph.fav-f0', 'ph.fav-f1', 'ph.fav-v0', 'ph.fav-v1'], focus: ['ph.fav-v0', 'ph.fav-v1'] },
        { say: 'The other three friends can stand in any order in the last three places: three factorial, or six ways. So there are one times one times six, which is six favourable orders.', show: ['ph.fav-v2', 'ph.fav-v3', 'ph.fav-v4', 'ph.fav-times', 'm.1'], focus: 'm.1' },
        { say: 'The probability is six over 120, which is one twentieth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Sitting together',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Six students, including Ava and Ben, sit in a row in a random order. What is the probability that Ava and Ben sit together?' },
        figure('seat', [slots({ values: [t('Ava, Ben'), '', '', '', ''], captions: [t('block'), t('student'), t('student'), t('student'), t('student')], widths: [2.8], tone: 'theta', shade: [0] })], 190),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{all: } 6! = 720 \\qquad \\text{favourable: } 5! \\times 2! = 120 \\times 2 = 240', 'P = \\dfrac{240}{720} = \\dfrac{1}{3}'] },
      ],
      lines: [
        { say: 'Six students, including Ava and Ben, sit in a row in a random order. What is the probability that Ava and Ben sit together?', show: 'p' },
        { say: 'With no rule, six students can sit in six factorial, or 720, ways. That is the total.', show: 'm.0', focus: 'm.0' },
        { say: 'For the favourable seatings, tape Ava and Ben together into one block. Now there are five units to arrange: the block and the other four students. That is five factorial, or 120, ways.', show: ['seat.boxes', 'seat.values', 'seat.captions', 'seat.f0'], focus: 'seat.v0' },
        { say: 'Inside the block, Ava and Ben can switch places, so multiply by two factorial, which is two. That gives 240 favourable seatings.', focus: 'm.0' },
        { say: 'The probability is 240 over 720, which is one third.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Repeated letters',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'The letters of CANADA are arranged at random. What is the probability that the arrangement begins and ends with A?' },
        figure('ca', [slots({ values: [t('A'), '4', '3', '2', '1', t('A')], captions: [t('first'), '', '', '', '', t('last')], shade: [0, 5] })], 190),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{all: } \\dfrac{6!}{3!} = \\dfrac{720}{6} = 120 \\qquad \\text{favourable: } 4! = 24', 'P = \\dfrac{24}{120} = \\dfrac{1}{5}'] },
      ],
      lines: [
        { say: 'The letters of the word CANADA are arranged at random. What is the probability that the arrangement begins and ends with an A?', show: 'p' },
        { say: 'The word has six letters, but three of them are A’s. Swapping two A’s gives the same arrangement, so divide six factorial by three factorial. That is 720 over six, or 120 different arrangements.', show: 'm.0', focus: 'm.0' },
        { say: 'For the favourable arrangements, put an A at each end. Since the A’s are identical, there is only one way to do that.', show: ['ca.boxes', 'ca.captions', 'ca.f0', 'ca.f5', 'ca.v0', 'ca.v5'], focus: ['ca.v0', 'ca.v5'] },
        { say: 'That leaves C, N, A and D for the four middle places. They are all different, so they can be arranged in four factorial, or twenty-four, ways.', show: ['ca.values', 'ca.times'], focus: ['ca.v1', 'ca.v2', 'ca.v3', 'ca.v4'] },
        { say: 'The probability is twenty-four over 120, which is one fifth.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Arrange the inside of the block', md: 'The block $\\boxed{\\text{Ava, Ben}}$ can also be $\\boxed{\\text{Ben, Ava}}$. Leaving out the $2!$ counts only $120$ favourable seatings.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{120}{720} = \\dfrac{1}{6}} \\qquad \\good{\\dfrac{240}{720} = \\dfrac{1}{3}}'] },
      ],
      lines: [
        { say: 'A common mistake is to forget the arrangements inside the block. The block Ava, Ben can also be Ben, Ava.', show: 'oops' },
        { say: 'Leaving out that factor of two gives 120 over 720, or one sixth, which is half the right answer. The probability that Ava and Ben sit together is one third.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Seven runners, including Lena and Tom, are given lanes 1 to 7 at random. What is the probability that Lena gets lane 1 and Tom gets lane 2?',
          choices: ['$\\dfrac{1}{7}$', '$\\dfrac{2}{7}$', '$\\dfrac{1}{42}$', '$\\dfrac{1}{21}$'],
          answer: 2,
          working: 'All: $7! = 5040$. Favourable: $1 \\times 1 \\times 5! = 120$. $P = \\dfrac{120}{5040} = \\dfrac{1}{42}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Seven runners, including Lena and Tom, are given lanes one to seven at random. What is the probability that Lena gets lane one and Tom gets lane two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, one over forty-two. There are seven factorial ways to give out the lanes. With Lena and Tom placed, the other five runners take the other lanes in five factorial ways, and five factorial over seven factorial is one over seven times six. Choice D, one over twenty-one, also counts Tom in lane one and Lena in lane two.', show: 'q.answer' },
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
          items: ['$P = \\dfrac{\\text{favourable}}{\\text{total}}$: count both with counting methods.', 'Place the people or letters with a rule first, then arrange the rest.', 'Tape things that must be together into a block, and arrange inside the block too.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A probability is the favourable outcomes over all the outcomes, and counting methods count both.', show: 'sum.0' },
        { say: 'Place the people or letters that have a rule first, then arrange the rest. Remember to divide by the factorials of any repeated letters.', show: 'sum.1' },
        { say: 'And tape things that must be together into a block, then arrange the inside of the block too. In part two, we find probabilities with combinations, for committees and hands of cards. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
