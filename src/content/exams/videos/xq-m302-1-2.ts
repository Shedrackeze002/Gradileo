import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { venn2 } from '@/content/math30-2/videos/lib/m302-1-figures.ts';

// Exam question for Math 30-2 lesson 1.2 (Venn diagrams and set operations). The question is a
// Your Turn from OpenStax Contemporary Mathematics, word for word (section 1.4, Set Operations with
// Two Sets, CC BY-NC-SA 4.0), the second part of a two-part question with its shared opening. 150 −
// 23 = 127 guests had soup or salad, and 127 = 92 + 85 − n(both), so 50 had both, as in the book's
// solution. The check fills in the Venn diagram: 42 soup only, 50 both, 35 salad only, 23 neither.

const QUESTION =
  'Ravi and Priya are serving soup and salad along with the main course at their wedding reception. The reception will have a total of 150 guests in attendance. A total of 92 soups and 85 salads were ordered, while 23 guests did not order any soup or salad. How many guests had both soup and a salad?';

const diagram = venn2({
  titles: ['\\text{Soup}', '\\text{Salad}'],
  titlePos: [
    [-3.7, 3.65],
    [3.7, 3.65],
  ],
  values: { A: '42', AB: '50', B: '35', out: '23' },
  valueAt: { out: [5.6, -3.4] },
  valueTone: { A: 'adj', AB: 'good', B: 'opp', out: 'ink' },
});

const video: Explainer = {
  id: 'xq-m302-1-2',
  lessonId: '',
  exam: {
    lesson: 'm302-1-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 1.4, Set Operations with Two Sets',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/1-4-set-operations-with-two-sets',
    question: QUESTION,
  },
  title: 'Exam Question: Soup, Salad or Both? (Venn Diagrams and Set Operations)',
  thumbnailTitle: 'Soup, Salad or Both?',
  thumbnail: 'v',
  summary:
    'A real test question, solved one small step at a time: 150 wedding guests ordered 92 soups and 85 salads, and 23 ordered neither. How many had both? 150 − 23 = 127 guests had soup or salad, and by n(A ∪ B) = n(A) + n(B) − n(A ∩ B), 127 = 92 + 85 − n(both), so 50 had both. Then we check by filling in a Venn diagram and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Soup, Salad or Both?', subtitle: 'Venn diagrams and set operations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about Venn diagrams. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: QUESTION,
          answer: '$50$ guests',
          working: '$150 - 23 = 127$ had soup or salad; $\\ 92 + 85 - 127 = 50$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'Ravi and Priya are serving soup and salad along with the main course at their wedding reception. The reception will have a total of 150 guests in attendance. A total of 92 soups and 85 salads were ordered, while 23 guests did not order any soup or salad. How many guests had both soup and a salad?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Some guests had soup, some had salad, some had **both**, and $23$ had **neither**. We want the overlap: soup **and** salad.' }],
      lines: [
        { say: 'Some guests had soup, some had salad, some had both, and 23 had neither.', show: 't' },
        { say: 'We want the overlap: the guests who had soup and salad.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ie', tone: 'key', title: 'Inclusion and exclusion', md: '$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$' },
        { kind: 'callout', id: 'why', tone: 'tip', title: 'Why subtract?', md: 'Adding $n(A)$ and $n(B)$ counts the overlap **twice**, so we take it away once.' },
      ],
      lines: [
        { say: 'Here is what we need. The number in A union B equals the number in A, plus the number in B, minus the number in A intersection B.', show: 'ie' },
        { say: 'We subtract because adding A and B counts the people in the overlap twice.', show: 'why' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find soup **or** salad: total minus neither', 'Put the numbers into the **formula**', 'Solve for **both**'] }],
      lines: [
        { say: 'Here is the plan. First, find how many had soup or salad.', show: 'plan.0' },
        { say: 'Second, put the numbers into the formula.', show: 'plan.1' },
        { say: 'Third, solve for the number who had both.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Soup or salad',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n(\\text{neither}) = 23', 'n(S \\cup L) = 150 - 23 = \\good{127}'] }],
      lines: [
        { say: 'Step one. 23 of the 150 guests had neither.', show: 'm.0' },
        { say: 'Everyone else had soup, or salad, or both. Call the soup set S and the salad set L. S union L has 150 minus 23, which is 127 guests.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Use the formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n(S \\cup L) = n(S) + n(L) - n(S \\cap L)', '127 = 92 + 85 - n(S \\cap L)'] }],
      lines: [
        { say: 'Step two. Write the formula for the soup and salad sets.', show: 'm.0' },
        { say: 'Put in what we know: 127 equals 92 plus 85, minus the number who had both.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Solve for both',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['127 = 177 - n(S \\cap L)', 'n(S \\cap L) = 177 - 127 = \\good{50}'] }],
      lines: [
        { say: 'Step three. 92 plus 85 is 177, so 127 equals 177 minus the overlap.', show: 'm.0' },
        { say: 'So the overlap is 177 minus 127, which is 50. 50 guests had both soup and a salad.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [figure('v', [diagram])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Both: } 50', '\\text{Soup only: } 92 - 50 = 42', '\\text{Salad only: } 85 - 50 = 35', '\\text{Neither: } 23', '42 + 50 + 35 + 23 = 150 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by filling in a Venn diagram from the middle out. 50 guests had both.', show: ['v.box', 'v.A', 'v.B', 'v.v-AB', 'm.0'], focus: ['v.v-AB', 'm.0'] },
        { say: '92 had soup, and 50 of them also had salad, so 42 had soup only.', show: ['v.v-A', 'm.1'], focus: ['v.v-A', 'm.1'] },
        { say: '85 had salad, so 85 minus 50, which is 35, had salad only.', show: ['v.v-B', 'm.2'], focus: ['v.v-B', 'm.2'] },
        { say: 'And 23 had neither.', show: ['v.v-out', 'm.3'], focus: ['v.v-out', 'm.3'] },
        { say: 'Add the four regions: 42 plus 50 plus 35 plus 23 is 150, every guest exactly once. It checks out.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$92 + 85 - 150 = 27$', 'the $23$ who had **neither** are not in the union'],
            ['$127$', 'that is soup **or** salad; the question asks for **both**'],
            ['$92 + 85 = 177$', 'more than $150$ guests: the overlap was counted **twice**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Using 150 as the union gives 27. But the 23 guests who had neither are outside both circles, so the union is only 127.' },
        { say: '127 answers a different question: soup or salad. This one asks for both.' },
        { say: 'And 92 plus 85 is 177, more than the 150 guests. That is the sign that the overlap was counted twice.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In a class of $30$ students, $18$ take art, $15$ take music and $4$ take neither. How many take both art and music?',
          choices: ['$3$', '$11$', '$7$', '$26$'],
          answer: 2,
          working: '$30 - 4 = 26$ take art or music; $\\ 18 + 15 - 26 = 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a class of 30 students, 18 take art, 15 take music and 4 take neither. How many take both art and music? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '30 minus 4 is 26 students who take art or music. Then 18 plus 15 is 33, and 33 minus 26 is 7: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Union (**or**) = total minus **neither**', '$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$', 'Solve the formula for the **overlap**', 'Fill in a Venn diagram from the **middle** out to check'] }],
      lines: [
        { say: 'Here is what to remember. The union, A or B, is the total minus the ones in neither.', show: 'sum.0' },
        { say: 'The number in A union B is the number in A, plus the number in B, minus the overlap.', show: 'sum.1' },
        { say: 'Solve that formula for the overlap.', show: 'sum.2' },
        { say: 'And fill in a Venn diagram from the middle out to check. For more on Venn diagrams and set operations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
