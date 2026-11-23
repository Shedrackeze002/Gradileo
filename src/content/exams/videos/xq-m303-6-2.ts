import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 6.2 (weighted and trimmed means). The question is a "Your
// Turn" from OpenStax Contemporary Mathematics, word for word (section 8.4, Mean, Median and Mode,
// CC BY-NC-SA 4.0); its table is shown in its own scene. The mean of a frequency table is a
// weighted mean with the frequencies as weights: (1·12 + 2·13 + 3·8)/(12 + 13 + 8) = 62/33 ≈ 1.879,
// as in the book's answer.

const QUESTION =
  'Refer again to the frequency distribution of the number of people who shared a residence with people in a sample: Number of People in the Residence 1, 2, 3 with Frequency 12, 13, 8. What’s the mean of the number of people in these residences?';

const video: Explainer = {
  id: 'xq-m303-6-2',
  lessonId: '',
  exam: {
    lesson: 'm303-6-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 8.4, Mean, Median and Mode',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/8-4-mean-median-and-mode',
    question: QUESTION,
  },
  title: 'Exam Question: The Mean of a Frequency Table (Weighted and Trimmed Means)',
  thumbnailTitle: 'The Mean of a Frequency Table',
  thumbnail: 'prod',
  summary:
    'A real test question, solved one small step at a time: 12 residences have 1 person, 13 have 2 and 8 have 3. What is the mean number of people? Each value is weighted by its frequency: the products add to 62 people in 33 residences, so the mean is 62/33 ≈ 1.879. Then we check that the answer is sensible and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Mean of a Frequency Table', subtitle: 'Weighted and trimmed means, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about weighted means. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Refer again to the frequency distribution of the number of people who shared a residence with people in a sample: (table on the next screen). What’s the mean of the number of people in these residences?',
          answer: '$\\dfrac{62}{33} \\approx 1.879$ people',
          working: 'Multiply each value by its frequency, add, and divide by the total frequency.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'Refer again to the frequency distribution of the number of people who shared a residence with people in a sample. What’s the mean of the number of people in these residences?' },
      ],
    },
    {
      chapter: 'The data',
      layout: 'center',
      main: [{ kind: 'table', id: 'data', head: ['Number of People in the Residence', 'Frequency'], rows: [['$1$', '$12$'], ['$2$', '$13$'], ['$3$', '$8$']] }],
      lines: [
        { say: 'And here is the table from the question. 12 residences have 1 person, 13 have 2 people, and 8 have 3 people.', show: 'data' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The mean shares all the people out **equally** among all the residences. The values are not equally common, so each one counts as many times as its **frequency**.' }],
      lines: [
        { say: 'The mean shares all the people out equally among all the residences.', show: 't' },
        { say: 'But the values are not equally common, so each value must count as many times as its frequency. That is a weighted mean.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'w', tone: 'key', title: 'Weighted mean', md: '$\\bar{x} = \\dfrac{\\sum (\\text{value} \\times \\text{weight})}{\\sum \\text{weight}}$. In a frequency table, the **weights** are the frequencies.' },
      ],
      lines: [
        { say: 'Here is what we need. A weighted mean multiplies each value by its weight, adds the products, and divides by the total of the weights.', show: 'w' },
        { say: 'In a frequency table, the weights are the frequencies.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Multiply** each value by its frequency', '**Add** the products and the frequencies', '**Divide**'] }],
      lines: [
        { say: 'Here is the plan. First, multiply each value by its frequency.', show: 'plan.0' },
        { say: 'Second, add up the products, and add up the frequencies.', show: 'plan.1' },
        { say: 'Third, divide.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Multiply',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'prod',
          head: ['People', 'Frequency', 'People $\\times$ frequency'],
          rows: [
            ['$1$', '$12$', '$12$'],
            ['$2$', '$13$', '$26$'],
            ['$3$', '$8$', '$24$'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. 12 residences with 1 person hold 12 people.', show: 'prod' },
        { say: '13 residences with 2 people hold 26 people. And 8 residences with 3 people hold 24 people.' },
      ],
    },
    {
      chapter: 'Step 2: Add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12 + 26 + 24 = \\good{62} \\text{ people}', '12 + 13 + 8 = \\good{33} \\text{ residences}'] }],
      lines: [
        { say: 'Step two. All together, 12 plus 26 plus 24 is 62 people.', show: 'm.0' },
        { say: 'And 12 plus 13 plus 8 is 33 residences.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\bar{x} = \\dfrac{62}{33} = 1.8787\\ldots', '\\approx \\good{1.879} \\text{ people}'] }],
      lines: [
        { say: 'Step three. Share 62 people among 33 residences: 62 over 33 is 1.8787 and so on.', show: 'm.0' },
        { say: 'Rounded to three decimal places, the mean is about 1.879 people per residence.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1 < 1.879 < 3 \\ \\checkmark', '\\text{most residences have } 1 \\text{ or } 2: \\ \\text{mean just under } 2 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check that the answer makes sense. A mean must lie between the smallest and largest values, 1 and 3. It does.', show: 'm.0' },
        { say: 'And 25 of the 33 residences have 1 or 2 people, so the mean should be a little under 2. It is. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{1 + 2 + 3}{3} = 2$', 'ignores the **frequencies**: the values are not equally common'],
            ['$\\dfrac{62}{3}$', 'divide by the number of **residences**, $33$'],
            ['$\\dfrac{12 + 13 + 8}{3} = 11$', 'that is the mean **frequency**, not people'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Averaging 1, 2 and 3 ignores the frequencies. It treats each value as if it appeared once.' },
        { say: 'Divide by the number of residences, 33, not by the number of rows, 3.' },
        { say: 'And the mean of the frequencies, 11, is a number of residences, not of people.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A course mark is weighted: assignments count $40\\%$ and the final exam counts $60\\%$. A student has $80$ on the assignments and $70$ on the exam. What is the course mark?',
          choices: ['$75$', '$74$', '$150$', '$72$'],
          answer: 1,
          working: '$\\dfrac{80 \\times 40 + 70 \\times 60}{40 + 60} = \\dfrac{3{,}200 + 4{,}200}{100} = 74$',
        },
      ],
      lines: [
        { say: 'Your turn. A course mark is weighted: assignments count 40% and the final exam counts 60%. A student has 80 on the assignments and 70 on the exam. What is the course mark? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '80 times 40 is 3,200, and 70 times 60 is 4,200. Together, 7,400, divided by the total weight, 100, is 74: choice B. The exam pulls the mark below 75 because it counts more.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Weighted mean: $\\dfrac{\\sum (\\text{value} \\times \\text{weight})}{\\sum \\text{weight}}$', 'In a frequency table, the weights are the **frequencies**', 'Divide by the **total** weight, not the number of rows', 'The mean lies between the smallest and largest values'] }],
      lines: [
        { say: 'Here is what to remember. A weighted mean is the sum of value times weight, over the sum of the weights.', show: 'sum.0' },
        { say: 'In a frequency table, the weights are the frequencies.', show: 'sum.1' },
        { say: 'Divide by the total weight, not by the number of rows.', show: 'sum.2' },
        { say: 'And the mean always lies between the smallest and largest values. For more on weighted and trimmed means, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
