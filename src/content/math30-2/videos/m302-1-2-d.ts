import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { venn3, type Membership } from './lib/m302-1-figures.ts';

const count = (m: Membership) => [m.A, m.B, m.C].filter(Boolean).length;

/** The eight regions of three sets, shaded a group at a time. */
const regions = venn3({
  titles: ['A', 'B', 'C'],
  shade: [
    { id: 'three', where: (m) => count(m) === 3 },
    { id: 'two', where: (m) => count(m) === 2 },
    { id: 'one', where: (m) => count(m) === 1 },
    { id: 'none', where: (m) => count(m) === 0 },
  ],
});

/** The science survey: Biology, Chemistry and Physics. */
const science = venn3({
  titles: ['\\text{Bio}', '\\text{Chem}', '\\text{Phys}'],
  values: { ABC: '4', AB: '8', AC: '5', BC: '6', A: '20', B: '12', C: '15', out: '30' },
  valueAt: { out: [4.7, -4.6] },
  valueTone: { ABC: 'theta', AB: 'hyp', AC: 'hyp', BC: 'hyp', A: 'adj', B: 'opp', C: 'good', out: 'ink' },
});

const video: Explainer = {
  id: 'm302-1-2-d',
  lessonId: 'm302-1-2',
  title: 'Venn Diagrams and Set Operations, Part 4: Three Sets',
  thumbnailTitle: 'Venn Diagrams with Three Sets',
  thumbnail: 'v',
  summary: 'The eight regions of a three-set Venn diagram, and filling one in from the centre outward. Worked example: of 100 students, 37 take Biology, 30 Chemistry and 30 Physics, with 12, 9 and 10 in each pair and 4 in all three, so 30 take none. Part 5 names shaded regions in set notation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 4', title: 'Venn Diagrams with Three Sets', subtitle: 'Fill from the centre outward' }],
      lines: [
        { say: 'With three sets, a Venn diagram has eight regions, and the counts in a survey overlap in ways that are easy to get wrong.', show: 'title' },
        { say: 'In this video, you will fill in a three-set Venn diagram from the centre outward, and use it to answer a survey question.' },
      ],
    },
    {
      chapter: 'Eight regions',
      layout: 'center',
      main: [figure('r', [regions], 470)],
      lines: [
        { say: 'Here are three overlapping circles, A, B and C, inside the universal set.', show: ['r.box', 'r.A', 'r.B', 'r.C'] },
        { say: 'Together they make eight regions. In the centre is one region that is inside all three circles.', show: 'r.three', focus: 'r.three' },
        { say: 'Around it are three regions that are inside exactly two of the circles: A and B, A and C, and B and C.', hide: 'r.three', show: 'r.two', focus: 'r.two' },
        { say: 'Then there are three regions inside only one circle.', hide: 'r.two', show: 'r.one', focus: 'r.one' },
        { say: 'And last, one region outside all three circles. One, plus three, plus three, plus one, makes eight regions.', hide: 'r.one', show: 'r.none', focus: 'r.none' },
      ],
    },
    {
      chapter: 'A science survey',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A survey of 100 students found that 37 take Biology, 30 take Chemistry and 30 take Physics. Of these, 12 take Biology and Chemistry, 9 take Biology and Physics, 10 take Chemistry and Physics, and 4 take all three. How many take none of the three courses?' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Fill from the centre outward', md: 'The 12 students who take Biology and Chemistry **include** the 4 who take all three.' },
      ],
      lines: [
        { say: 'A survey of one hundred students found that thirty-seven take Biology, thirty take Chemistry, and thirty take Physics.', show: 'p' },
        { say: 'Of these, twelve take Biology and Chemistry, nine take Biology and Physics, ten take Chemistry and Physics, and four take all three. How many take none of the three courses?' },
        { say: 'The key is to fill the diagram from the centre outward. The twelve students who take Biology and Chemistry include the four who take all three, so the twelve cannot go straight into one region.', show: 'tip' },
      ],
    },
    {
      chapter: 'Start in the centre',
      layout: 'split',
      leftWidth: 540,
      left: [figure('v', [science])],
      right: [{ kind: 'table', id: 'm', head: ['Region', 'Students'], rows: [['All three', '$4$'], ['Bio and Chem only', '$12 - 4 = 8$'], ['Bio and Phys only', '$9 - 4 = 5$'], ['Chem and Phys only', '$10 - 4 = 6$']] }],
      lines: [
        { say: 'Start in the centre: four students take all three courses.', show: ['v.box', 'v.A', 'v.B', 'v.C', 'v.v-ABC', 'm.0'], focus: ['v.v-ABC', 'm.0'] },
        { say: 'Next, the regions for exactly two courses. Twelve take Biology and Chemistry, but four of them also take Physics, and they are already in the centre. So twelve minus four, which is eight, take Biology and Chemistry only.', show: ['v.v-AB', 'm.1'], focus: ['v.v-AB', 'm.1'] },
        { say: 'In the same way, nine minus four, which is five, take Biology and Physics only.', show: ['v.v-AC', 'm.2'], focus: ['v.v-AC', 'm.2'] },
        { say: 'And ten minus four, which is six, take Chemistry and Physics only.', show: ['v.v-BC', 'm.3'], focus: ['v.v-BC', 'm.3'] },
      ],
    },
    {
      chapter: 'One course only',
      layout: 'split',
      leftWidth: 540,
      left: [figure('v', [science])],
      right: [{ kind: 'table', id: 'm', head: ['Region', 'Students'], rows: [['Bio only', '$37 - 8 - 5 - 4 = 20$'], ['Chem only', '$30 - 8 - 6 - 4 = 12$'], ['Phys only', '$30 - 5 - 6 - 4 = 15$']] }],
      lines: [
        { say: 'Now the regions for one course only. The Biology circle holds thirty-seven students. Eight, five and four of them are already placed in the overlaps.', show: ['v.box', 'v.A', 'v.B', 'v.C', 'v.v-ABC', 'v.v-AB', 'v.v-AC', 'v.v-BC'], focus: 'v.A' },
        { say: 'So thirty-seven minus eight, minus five, minus four, which is twenty, take Biology only.', show: ['v.v-A', 'm.0'], focus: ['v.v-A', 'm.0'] },
        { say: 'For Chemistry, thirty minus eight, minus six, minus four, which is twelve, take Chemistry only.', show: ['v.v-B', 'm.1'], focus: ['v.v-B', 'm.1'] },
        { say: 'And for Physics, thirty minus five, minus six, minus four, which is fifteen, take Physics only.', show: ['v.v-C', 'm.2'], focus: ['v.v-C', 'm.2'] },
      ],
    },
    {
      chapter: 'None of the three',
      layout: 'split',
      leftWidth: 540,
      left: [figure('v', [science])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['20 + 12 + 15 + 8 + 5 + 6 + 4', '= 70 \\text{ take at least one}', '100 - 70 = 30 \\text{ take none}'] }],
      lines: [
        { say: 'Every region inside the circles is now filled. Add them all to find how many students take at least one of the courses.', show: ['v.box', 'v.A', 'v.B', 'v.C', 'v.v-ABC', 'v.v-AB', 'v.v-AC', 'v.v-BC', 'v.v-A', 'v.v-B', 'v.v-C', 'm.0'], focus: 'm.0' },
        { say: 'Twenty, plus twelve, plus fifteen, plus eight, plus five, plus six, plus four, is seventy.', show: 'm.1', focus: 'm.1' },
        { say: 'The other one hundred minus seventy, which is thirty students, take none of the three courses. They go outside all three circles.', show: ['v.v-out', 'm.2'], focus: ['v.v-out', 'm.2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting the centre twice', md: 'The pair counts 12 and 9 **both** include the 4 students in the centre. Subtracting $37 - 12 - 9$ takes those 4 away twice.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{37 - 12 - 9 = 16}', '\\good{37 - 8 - 5 - 4 = 20}'] },
      ],
      lines: [
        { say: 'A common mistake is to subtract the pair counts straight from the total. Thirty-seven minus twelve minus nine gives sixteen students who take Biology only.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But the twelve and the nine both include the four students who take all three courses. So those four are taken away twice, and the answer is four too small.', focus: 'm.0' },
        { say: 'Filling in the centre first, and the pairs next, avoids the problem: thirty-seven minus eight, minus five, minus four, is twenty.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Of 50 students, 20 take art, 25 take music and 15 take drama. Of these, 7 take art and music, 5 take art and drama, 6 take music and drama, and 3 take all three. How many take only art?',
          choices: ['$8$', '$17$', '$14$', '$11$'],
          answer: 3,
          working: 'Art and music only: $7 - 3 = 4$. Art and drama only: $5 - 3 = 2$. Only art: $20 - 4 - 2 - 3 = 11$.',
        },
      ],
      lines: [
        { say: 'Your turn. Of fifty students, twenty take art, twenty-five take music, and fifteen take drama. Seven take art and music, five take art and drama, six take music and drama, and three take all three. How many take only art? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D, eleven. From the centre out: seven minus three is four, for art and music only, and five minus three is two, for art and drama only. Then twenty minus four, minus two, minus three, is eleven. Choice A, eight, subtracts the seven and the five, which both include the three students in the centre.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Three sets make eight regions.', 'Fill from the centre outward: all three, then exactly two, then only one, then outside.', 'A pair count includes the centre, so subtract the centre first. Check that the regions add up to the total.'] }],
      lines: [
        { say: 'Let’s sum up. Three overlapping sets make eight regions.', show: 'sum.0' },
        { say: 'Fill them from the centre outward: all three sets, then exactly two, then only one, and finally the outside.', show: 'sum.1' },
        { say: 'A count for a pair of sets includes the centre, so subtract the centre first, and check that the regions add up to the total. In part five, we name shaded regions in set notation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
