import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm303-6-2',
  lessonId: 'm303-6-2',
  title: 'Weighted and Trimmed Means, Part 1: Weighted Means for Course Marks',
  thumbnailTitle: 'Weighted Means for Marks',
  thumbnail: false,
  summary: 'A weighted mean multiplies each value by its weight and divides by the sum of the weights; with percent weights that add to 100%, multiply by the decimal weights and add. Assignments 20% (85%), unit tests 30% (72%), shop projects 20% (90%) and a final exam 30% (64%) give a final mark of 75.8%, not the plain mean of 77.75%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics · Part 1', title: 'Weighted Means', subtitle: 'When some values count more' }],
      lines: [
        { say: 'Not every value in a data set counts the same. In most courses, a final exam is worth more than a quiz, or an assignment.', show: 'title' },
        { say: 'In this video, you will learn the weighted mean, which gives each value its proper share, and use it to work out a final course mark.' },
      ],
    },
    {
      chapter: 'Weighted mean',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Weighted mean', md: 'Each value is multiplied by its **weight** (how much it counts), and the total is divided by the sum of the weights.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{weighted mean} = \\dfrac{\\text{sum of (weight} \\times \\text{value)}}{\\text{sum of the weights}}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Percent weights', md: 'When the weights are percents that add to $100\\%$, write each one as a decimal, multiply and add. There is no need to divide.' },
      ],
      lines: [
        { say: 'In a weighted mean, each value is multiplied by its weight, which is how much it counts. Then the total is divided by the sum of the weights.', show: ['def', 'm'] },
        { say: 'Course marks often come with weights given as percents, like assignments twenty percent and the final exam thirty percent.', focus: 'm' },
        { say: 'When the weights are percents that add to 100 percent, write each weight as a decimal, multiply, and add. There is no need to divide. You will see why in a moment.', show: 'tip' },
      ],
    },
    {
      chapter: 'A final mark',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Priya’s construction technology course is marked like this. Find the final mark.' },
        {
          kind: 'table',
          id: 't',
          head: ['Part of the course', 'Weight', 'Mark', 'Weight × mark'],
          rows: [
            ['Assignments', '20%', '85%', '$0.20(85) = 17$'],
            ['Unit tests', '30%', '72%', '$0.30(72) = 21.6$'],
            ['Shop projects', '20%', '90%', '$0.20(90) = 18$'],
            ['Final exam', '30%', '64%', '$0.30(64) = 19.2$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['17 + 21.6 + 18 + 19.2 = 75.8 \\qquad \\text{final mark } 75.8\\%'] },
      ],
      lines: [
        { say: 'Priya is in a construction technology course. The table shows how the final mark is calculated, and Priya’s mark in each part.', show: 'q' },
        { say: 'Assignments count twenty percent, and Priya has 85. Write twenty percent as 0.20. So 0.20 times 85 is 17.', show: 't.0', focus: 't.0' },
        { say: 'Unit tests count thirty percent, with a mark of 72. 0.30 times 72 is 21.6.', show: 't.1', focus: 't.1' },
        { say: 'Shop projects count twenty percent, with a mark of 90. 0.20 times 90 is 18.', show: 't.2', focus: 't.2' },
        { say: 'And the final exam counts thirty percent, with a mark of 64. 0.30 times 64 is 19.2.', show: 't.3', focus: 't.3' },
        { say: 'Add the four results: 17 plus 21.6 plus 18 plus 19.2 is 75.8. Priya’s final mark is 75.8 percent.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Why no dividing?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{sum of the weights} = 0.20 + 0.30 + 0.20 + 0.30 = 1', '\\dfrac{75.8}{1} = 75.8'] },
        { kind: 'text', id: 't', size: 'md', md: 'Weights that add to $100\\%$ add to $1$ as decimals, so dividing by them changes nothing.' },
      ],
      lines: [
        { say: 'Why did we not divide by the sum of the weights? Add the decimal weights: 0.20 plus 0.30 plus 0.20 plus 0.30 is one.', show: 'm.0', focus: 'm.0' },
        { say: 'So the formula says to divide 75.8 by one, which changes nothing. Whenever percent weights add to 100 percent, the division takes care of itself.', show: ['m.1', 't'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the plain mean', md: 'The plain mean treats the assignments and the final exam as equal, but the exam counts more.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{(85 + 72 + 90 + 64) \\div 4 = 77.75}', '\\good{\\text{weighted mean} = 75.8}'] },
      ],
      lines: [
        { say: 'A common mistake is to use the plain mean of the four marks. 85 plus 72 plus 90 plus 64 is 311, and 311 divided by four is 77.75.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But that treats every part as equal. The plain mean lets the assignments count as much as the final exam.', focus: 'oops' },
        { say: 'In this course, the exam counts thirty percent, and Priya’s lowest mark was on the exam. Weighting it properly pulls the final mark down to 75.8 percent, which is the correct final mark.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A course counts homework $40\\%$ and the final exam $60\\%$. A student has $90\\%$ on homework and $70\\%$ on the exam. What is the final mark?',
          choices: ['$80\\%$', '$78\\%$', '$82\\%$', '$39\\%$'],
          answer: 1,
          working: '$0.40(90) + 0.60(70) = 36 + 42 = 78$, so the final mark is $78\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A course counts homework forty percent, and the final exam sixty percent. A student has 90 percent on homework and 70 percent on the exam. What is the final mark? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. 0.40 times 90 is 36, and 0.60 times 70 is 42. Together that is 78 percent. Choice A is the plain mean, which treats the homework and the exam as equal, but the exam counts more.', show: 'q.answer' },
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
          items: ['Weighted mean $=$ sum of (weight $\\times$ value) $\\div$ sum of the weights.', 'With percent weights that add to $100\\%$: multiply by the decimal weights and add.', 'The plain mean is wrong when the parts count differently.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A weighted mean is the sum of each weight times its value, divided by the sum of the weights.', show: 'sum.0' },
        { say: 'With percent weights that add to 100 percent, just multiply by the decimal weights and add.', show: 'sum.1' },
        { say: 'And the plain mean is wrong when the parts count differently. In the next part, the weights are quantities, such as the number of items bought at each price. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
