import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tree } from './lib/m302-2-counting.ts';

const video: Explainer = {
  id: 'm302-2-1',
  lessonId: 'm302-2-1',
  title: 'The Fundamental Counting Principle, Part 1: Tree Diagrams and Organized Lists',
  thumbnailTitle: 'Tree Diagrams and Organized Lists',
  thumbnail: 'tr',
  summary: 'Counting the smoothies made from 3 sizes and 2 bases with a tree diagram and with an organized list: 3 × 2 = 6. Adding one of 3 add-ins splits every branch again, for 6 × 3 = 18 smoothies. Part 2 multiplies the choices directly with the fundamental counting principle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 1', title: 'Tree Diagrams and Organized Lists', subtitle: 'Counting every outcome, missing none' }],
      lines: [
        { say: 'A smoothie bar, a phone case store and a video game all brag about how many choices they offer. Is a claim like over a thousand combinations fair? To check, you need to count the choices in an organized way.', show: 'title' },
        { say: 'In this video, you will count outcomes with a tree diagram and with an organized list, and spot the multiplication hiding inside both.' },
      ],
    },
    {
      chapter: 'A tree diagram',
      layout: 'split',
      leftWidth: 700,
      left: [figure('tr', [tree({ first: ['Small', 'Medium', 'Large'], second: ['Yogurt', 'Juice'] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Sizes: } \\thc{3}', '\\text{Bases: } \\adj{2}', '\\thc{3} \\times \\adj{2} = \\good{6}'] }],
      lines: [
        { say: 'A smoothie bar makes smoothies in three sizes, small, medium and large, with a yogurt base or a juice base. How many different smoothies can you order?', show: ['tr.start', 'm.0', 'm.1'] },
        { say: 'A tree diagram shows each choice as a branch. Start on the left, and draw one branch for each size.', show: 'tr.s1', focus: 'tr.s1' },
        { say: 'Then, from each size, draw one branch for each base. A small smoothie can have a yogurt base or a juice base, and so can a medium, and so can a large.', show: ['tr.s2-0', 'tr.s2-1', 'tr.s2-2'], focus: ['tr.s2-0', 'tr.s2-1', 'tr.s2-2'] },
        { say: 'Every path from the start to the right-hand end is one outcome, such as a small smoothie with a yogurt base. Count the ends of the branches: there are six smoothies.', show: 'tr.count', focus: 'tr.count' },
        { say: 'Notice why. Each of the three sizes splits into the same two bases, so the number of smoothies is three times two, which is six.', show: 'm.2', focus: ['m.2', 'tr'] },
      ],
    },
    {
      chapter: 'An organized list',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Size', 'Yogurt base', 'Juice base'],
          rows: [
            ['Small', 'small, yogurt', 'small, juice'],
            ['Medium', 'medium, yogurt', 'medium, juice'],
            ['Large', 'large, yogurt', 'large, juice'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Keep one choice fixed', md: 'Fix one choice, run through every option for the other, then move to the next. Nothing is missed or repeated.' },
      ],
      lines: [
        { say: 'An organized list, or a table, shows the same outcomes in rows. The trick is to keep one choice fixed while you run through the others.', show: 'tip' },
        { say: 'Fix the size at small, and run through the bases: small with yogurt, and small with juice.', show: 't.0', focus: 't.0' },
        { say: 'Then fix the size at medium: medium with yogurt, and medium with juice. And then large: large with yogurt, and large with juice.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Three rows of two outcomes each: six smoothies again. Working in order like this, nothing is missed and nothing is listed twice.', focus: 't' },
      ],
    },
    {
      chapter: 'Adding a third choice',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'The smoothie bar also lets you add one of 3 add-ins: protein, spinach or oats. How many smoothies are possible now?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3 \\times 2 = 6 \\text{ size-and-base outcomes}', '\\text{each splits into } 3 \\text{ add-ins}', '6 \\times 3 = 18 \\text{ smoothies}'] },
      ],
      lines: [
        { say: 'Now the smoothie bar also lets you add one of three add-ins: protein, spinach or oats. How many smoothies are possible now?', show: 'p' },
        { say: 'The tree already has six branches, one for each size and base.', show: 'm.0', focus: 'm.0' },
        { say: 'To add a third choice, each of those six branches splits again, into three new branches, one for each add-in.', show: 'm.1', focus: 'm.1' },
        { say: 'So there are six times three, which is eighteen smoothies. The tree would end in eighteen branches, and you can count them without drawing them all.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A list in no order', md: 'An unorganized list is easy to get wrong. Which outcome is missing from this list?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{small, yogurt} \\quad \\text{medium, juice} \\quad \\text{large, yogurt}', '\\text{small, juice} \\quad \\text{medium, yogurt}', '\\good{\\text{missing: large, juice}}'] },
      ],
      lines: [
        { say: 'Here is why the order matters. A list written down in no particular order is easy to get wrong. Which smoothie is missing from this list?', show: ['oops', 'm.0', 'm.1'] },
        { say: 'It is hard to tell at a glance. But fix each size in turn, and the gap appears at once: large has yogurt, but not juice. The missing outcome is large with juice.', show: 'm.2', focus: 'm.2' },
        { say: 'So whenever you list outcomes, keep one choice fixed and run through the others, in order.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A sandwich comes on white, brown or rye bread, with a filling of ham, turkey, egg or cheese. How many different sandwiches with one bread and one filling are possible?',
          choices: ['$7$', '$4$', '$12$', '$24$'],
          answer: 2,
          working: 'Each of the 3 breads splits into 4 fillings: $3 \\times 4 = 12$ branches.',
        },
      ],
      lines: [
        { say: 'Your turn. A sandwich comes on white, brown or rye bread, with a filling of ham, turkey, egg or cheese. How many different sandwiches with one bread and one filling are possible? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, twelve. In a tree diagram, each of the three breads splits into four fillings, so there are three times four, or twelve, branches. Choice A, seven, adds the choices instead of counting the branches.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A tree diagram has a branch for each choice; each path from the start is one outcome.', 'An organized list keeps one choice fixed while it runs through the others.', 'Both show the same count: $3 \\times 2 = 6$.'] }],
      lines: [
        { say: 'Let’s sum up. A tree diagram has a branch for each choice, and each path from the start is one outcome.', show: 'sum.0' },
        { say: 'An organized list keeps one choice fixed while it runs through the others, so nothing is missed or repeated.', show: 'sum.1' },
        { say: 'And both show the same count, which is a product. In part two, we skip the tree and multiply directly, with the fundamental counting principle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
