import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { venn2 } from './lib/m302-1-figures.ts';

const sports = venn2({
  titles: ['\\text{Hockey}', '\\text{Soccer}'],
  titlePos: [
    [-3.7, 3.65],
    [3.7, 3.65],
  ],
  values: { A: '24', AB: '18', B: '15', out: '11' },
  valueAt: { out: [5.6, -3.4] },
  valueTone: { A: 'adj', AB: 'theta', B: 'opp', out: 'ink' },
});

const video: Explainer = {
  id: 'm302-1-2-c',
  lessonId: 'm302-1-2',
  title: 'Venn Diagrams and Set Operations, Part 3: Counting with Two Sets',
  thumbnailTitle: 'Counting with Two Sets',
  thumbnail: 'v',
  summary: 'The principle of inclusion and exclusion, n(A ∪ B) = n(A) + n(B) − n(A ∩ B). Worked example: of 68 students, 42 play hockey, 33 play soccer and 18 play both, so 57 play at least one and 11 play neither, checked with a Venn diagram filled from the middle out. Part 4 fills in Venn diagrams of three sets.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 3', title: 'Counting with Two Sets', subtitle: 'The principle of inclusion and exclusion' }],
      lines: [
        { say: 'In a survey of sixty-eight students, forty-two play hockey, thirty-three play soccer, and eighteen play both. How many play at least one of the sports, and how many play neither?', show: 'title' },
        { say: 'In this video, you will learn a formula that counts the elements of a union, and check it with a Venn diagram.' },
      ],
    },
    {
      chapter: 'Subtract the overlap',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The principle of inclusion and exclusion', md: 'Adding $n(A)$ and $n(B)$ counts the elements of $A \\cap B$ twice, so subtract them once.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n(A \\cup B) = n(A) + n(B) - n(A \\cap B)', '6 + 6 - 4 = 8'] },
      ],
      lines: [
        { say: 'In part one, you saw that you cannot find the size of a union just by adding. When you add n of A and n of B, every element in the overlap is counted twice: once with A, and once again with B.', show: 'key' },
        { say: 'So subtract the overlap once. n of A union B equals n of A, plus n of B, minus n of A intersection B.', show: 'm.0', focus: 'm.0' },
        { say: 'This is called the principle of inclusion and exclusion. The elements of both sets are included, and then the ones included twice are excluded once.' },
        { say: 'Check it with the factors of twelve and the even numbers up to twelve. Each set has six elements, and four of them are in both. Six plus six minus four is eight, and the union did have eight elements.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Hockey and soccer',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'In a survey of 68 students, 42 play hockey, 33 play soccer and 18 play both. How many play neither sport?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['n(H \\cup S) = n(H) + n(S) - n(H \\cap S)', '= 42 + 33 - 18 = 57', '\\text{Neither: } 68 - 57 = 11'] },
      ],
      lines: [
        { say: 'Now the survey. Of sixty-eight students, forty-two play hockey, thirty-three play soccer and eighteen play both. How many play neither sport?', show: 'p' },
        { say: 'Let H be the set of hockey players and S the set of soccer players. The students who play at least one of the sports make up H union S.', show: 'm.0', focus: 'm.0' },
        { say: 'By inclusion and exclusion, n of H union S is forty-two, plus thirty-three, minus eighteen, which is fifty-seven. So fifty-seven students play at least one sport.', show: 'm.1', focus: 'm.1' },
        { say: 'The rest of the sixty-eight students play neither sport. Sixty-eight minus fifty-seven is eleven.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check with a Venn diagram',
      layout: 'split',
      leftWidth: 620,
      left: [figure('v', [sports])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Both: } 18', '\\text{Only hockey: } 42 - 18 = 24', '\\text{Only soccer: } 33 - 18 = 15', '\\text{Neither: } 11', '24 + 18 + 15 + 11 = 68'] }],
      lines: [
        { say: 'A Venn diagram checks the answer. Fill it in from the middle out, starting with the overlap: eighteen students play both sports.', show: ['v.box', 'v.A', 'v.B', 'v.v-AB', 'm.0'], focus: ['v.v-AB', 'm.0'] },
        { say: 'Forty-two students play hockey, and eighteen of them also play soccer. So forty-two minus eighteen, which is twenty-four, play only hockey.', show: ['v.v-A', 'm.1'], focus: ['v.v-A', 'm.1'] },
        { say: 'In the same way, thirty-three minus eighteen, which is fifteen, play only soccer.', show: ['v.v-B', 'm.2'], focus: ['v.v-B', 'm.2'] },
        { say: 'And eleven play neither, outside both circles.', show: ['v.v-out', 'm.3'], focus: ['v.v-out', 'm.3'] },
        { say: 'Last, check that the regions add up to the total. Twenty-four, plus eighteen, plus fifteen, plus eleven, is sixty-eight. Every student is counted exactly once.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding without subtracting the overlap', md: '$42 + 33 = 75$ is more than the 68 students surveyed. The 18 students who play both sports were counted once with hockey and again with soccer.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{42 + 33 = 75 > 68}', '\\good{42 + 33 - 18 = 57}'] },
      ],
      lines: [
        { say: 'A common mistake is to add the two counts and stop. Forty-two plus thirty-three is seventy-five, which is more students than were surveyed. That is a sure sign that something was counted twice.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The eighteen students who play both sports were counted once with hockey and again with soccer. Subtract them once to get fifty-seven.', show: 'm.1', focus: 'm.1' },
        { say: 'A tip: when you fill in a Venn diagram, put in the overlap first, then the regions in only one set, and the outside last. Working from the middle out avoids this mistake.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a class of 30 students, 17 have a dog, 12 have a cat and 5 have both. How many students have neither a dog nor a cat?',
          choices: ['$1$', '$6$', '$19$', '$24$'],
          answer: 1,
          working: '$n(D \\cup C) = 17 + 12 - 5 = 24$, so $30 - 24 = 6$ have neither.',
        },
      ],
      lines: [
        { say: 'Your turn. In a class of thirty students, seventeen have a dog, twelve have a cat, and five have both. How many students have neither a dog nor a cat? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, six. Seventeen plus twelve minus five is twenty-four students with a dog or a cat, so thirty minus twenty-four, or six, have neither. Choice A, one, adds seventeen and twelve without subtracting the five students counted twice.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$', 'Fill in a Venn diagram from the middle out: the overlap, then the “only” regions, then the outside.', 'Check that the regions add up to the total.'] }],
      lines: [
        { say: 'Let’s sum up. n of A union B equals n of A, plus n of B, minus n of A intersection B.', show: 'sum.0' },
        { say: 'Fill in a Venn diagram from the middle out: the overlap first, then the regions in only one set, then the outside.', show: 'sum.1' },
        { say: 'And check that the regions add up to the total. In part four, we fill in a Venn diagram with three sets. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
