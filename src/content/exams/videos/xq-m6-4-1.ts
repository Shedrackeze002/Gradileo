import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar, pie } from '@/content/math5/videos/lib/m5-5-figures.ts';

// Exam question for Math 6 lesson 4.1 (fractions as quotients). The free OpenStax books have no
// question like this at this level, so this one is written by Gradileo in the style of a Grade 6
// mathematics unit test. 5 cakes shared by 8 students: each cake is cut into 8 slices and each
// student takes one slice of every cake, so 5 eighths: 5 ÷ 8 = 5/8 of a cake, less than one cake
// because 5 < 8.

const QUESTION =
  'A teacher shares 5 small cakes equally among 8 students. (a) Write a division for each student\'s share. (b) Write each student\'s share as a fraction of a cake. (c) Does each student get more or less than one whole cake?';

/** Five cakes, each cut into eighths, with one student's slice shaded in each. */
const cakes = (id: string) => figure(id, [0, 1, 2, 3, 4].map((k) => pie({ name: `c${k}`, parts: 8, shaded: 1, tone: 'theta', at: [k * 3.4, 0], r: 1.4 })), 220);

/** The student's five slices put together: 5 of the 8 eighths of one cake. */
const share = (id: string) => figure(id, [bar({ parts: 8, shaded: 5, tone: 'theta', width: 10, height: 1, label: '\\tfrac{5}{8}\\text{ of a cake}' })], 150);

const video: Explainer = {
  id: 'xq-m6-4-1',
  lessonId: '',
  exam: {
    lesson: 'm6-4-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 6 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Five Cakes for Eight Students (Fractions as Quotients)',
  thumbnailTitle: 'Five Cakes, Eight Students',
  thumbnail: 'ck',
  summary:
    'An exam-style question, solved one small step at a time: a teacher shares 5 small cakes equally among 8 students. Write each share as a division and as a fraction, and say if it is more or less than one cake. Sharing is division, 5 ÷ 8, and cutting each cake into 8 slices gives each student 5 slices of one eighth: 5/8 of a cake, which is less than one whole cake. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Five Cakes, Eight Students', subtitle: 'Fractions as quotients, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about sharing, where the answer is a fraction. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
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
          prompt: 'A teacher shares $5$ small cakes equally among $8$ students. (a) Write a division for each student\'s share. (b) Write each student\'s share as a fraction of a cake. (c) Does each student get more or less than one whole cake?',
          answer: '(a) $5 \\div 8$ (b) $\\tfrac{5}{8}$ of a cake (c) less',
          working: 'one eighth of each of 5 cakes is 5/8; 5 < 8',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A teacher shares 5 small cakes equally among 8 students. Part a. Write a division for each student\'s share. Part b. Write each student\'s share as a fraction of a cake. Part c. Does each student get more or less than one whole cake?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Sharing equally', md: '**Sharing equally** is **division**: the amount shared, divided by the number of people. Here there are **fewer** cakes than students, so nobody can have a whole cake. Each share is a **fraction**.' }],
      lines: [
        { say: 'Sharing equally is division: the amount we share, divided by the number of people.', show: 'c' },
        { say: 'There are fewer cakes than students, so nobody gets a whole cake. Each share will be a fraction of a cake.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'f', size: 'lg', lines: ['a \\div b = \\dfrac{a}{b}', '\\dfrac{\\text{amount shared}}{\\text{number of shares}}'] }],
      lines: [
        { say: 'Here is what we need. A fraction is a division: "a" divided by "b" is the fraction "a" over "b".', show: 'f.0' },
        { say: 'The amount shared goes on top, in the numerator, and the number of shares goes on the bottom, in the denominator.', show: 'f.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **division**', 'Cut each cake into **8** and share the slices', 'Compare the share with **one** cake'] }],
      lines: [
        { say: 'Here is the plan. Write the division.', show: 'plan.0' },
        { say: 'Cut each cake into 8 slices and share them out, to see the fraction.', show: 'plan.1' },
        { say: 'Then compare the share with one whole cake.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Share the cakes',
      layout: 'center',
      main: [cakes('ck'), share('sh'), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) } 5 \\div 8 \\qquad \\text{(b) } 5 \\div 8 = \\good{\\tfrac{5}{8}}'] }],
      lines: [
        { say: 'Step one. 5 cakes are shared among 8 students, so each share is 5 divided by 8. That is part a.', show: ['ck.c0-rim', 'ck.c1-rim', 'ck.c2-rim', 'ck.c3-rim', 'ck.c4-rim'] },
        { say: 'Step two. Cut every cake into 8 equal slices. Then each student takes one slice from each cake.', show: ['ck.c0-shade', 'ck.c1-shade', 'ck.c2-shade', 'ck.c3-shade', 'ck.c4-shade'], focus: ['ck.c0-shade', 'ck.c1-shade', 'ck.c2-shade', 'ck.c3-shade', 'ck.c4-shade'] },
        { say: 'One student gets 5 slices, and each slice is one eighth of a cake. Put together, that is 5 eighths of a cake.', show: ['sh.frame', 'sh.shade', 'sh.label', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Step 3: More or less than one?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{8}{8} = 1 \\text{ whole cake}', '5 < 8, \\text{ so } \\tfrac{5}{8} < 1: \\ \\good{\\text{less}}'] }],
      lines: [
        { say: 'Step three. A whole cake is 8 eighths.', show: 'm.0' },
        { say: 'Each student has only 5 eighths, and 5 is less than 8. So each student gets less than one whole cake. That makes sense, because there were fewer cakes than students.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['8 \\times \\tfrac{5}{8} = \\tfrac{40}{8} = 5 \\text{ cakes} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 8 students each get 5 eighths. That is 40 eighths, and 40 eighths is 5 whole cakes, exactly what the teacher had. It checks out.', show: 'm', focus: 'm' },
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
            ['$\\tfrac{8}{5}$', 'flipped it: the **amount shared** goes on **top**'],
            ['$8 \\div 5$', 'divides the **students** by the **cakes**'],
            ['"more than one"', '$5 < 8$: fewer cakes than students means **less** than one each'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '8 fifths flips the fraction. The amount shared, 5 cakes, goes on top.' },
        { say: '8 divided by 5 shares the students among the cakes. We share the cakes among the students.' },
        { say: 'And more than one cake each cannot be right, because there are fewer cakes than students.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '$3$ litres of juice are shared equally among $5$ bottles. How much juice goes in each bottle?',
          choices: ['$\\tfrac{3}{5}$ L', '$\\tfrac{5}{3}$ L', '$2$ L', '$15$ L'],
          answer: 0,
          working: '3 ÷ 5 = 3/5 of a litre, less than 1 L because 3 < 5.',
        },
      ],
      lines: [
        { say: 'Your turn. 3 litres of juice are shared equally among 5 bottles. How much juice goes in each bottle? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '3 divided by 5 is 3 fifths of a litre in each bottle. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sharing equally is **division**', '$a \\div b = \\tfrac{a}{b}$', 'Amount shared on **top**, shares on the **bottom**', 'Fewer things than people: **less** than one each'] }],
      lines: [
        { say: 'Here is what to remember. Sharing equally is division.', show: 'sum.0' },
        { say: '"a" divided by "b" is the fraction "a" over "b".', show: 'sum.1' },
        { say: 'The amount shared goes on top, and the number of shares on the bottom.', show: 'sum.2' },
        { say: 'And when there are fewer things than people, each share is less than one. For more on fractions as quotients, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
