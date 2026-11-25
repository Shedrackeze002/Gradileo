import type { Explainer } from '@/video/script.ts';

// Exam question for Math 6 lesson 6.3 (solving equations). The question is an Everyday Math
// exercise from OpenStax Prealgebra 2e, word for word (section 3.5, Solve Equations Using Integers;
// The Division Property of Equality, CC BY-NC-SA 4.0). 3c = 51: divide both sides by 3, so c = 17
// cookies in each row, as in the book's answer. Check: 3 × 17 = 51.

const QUESTION =
  'Cookie packaging A package of 51 cookies has 3 equal rows of cookies. Find the number of cookies in each row, c, by solving the equation 3c = 51.';

const video: Explainer = {
  id: 'xq-m6-6-3',
  lessonId: '',
  exam: {
    lesson: 'm6-6-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 3.5, Solve Equations Using Integers; The Division Property of Equality',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/3-5-solve-equations-using-integers-the-division-property-of-equality',
    question: QUESTION,
  },
  title: 'Exam Question: Cookies in Three Equal Rows (Solving Equations)',
  thumbnailTitle: 'Solve 3c = 51',
  summary:
    'A real test question, solved one small step at a time: a package of 51 cookies has 3 equal rows. Find the number of cookies in each row, c, by solving 3c = 51. The equation says 3 times c is 51, so we undo the multiplying by dividing both sides by 3: c = 17 cookies. Then we check by putting 17 back in and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve 3c = 51', subtitle: 'Solving equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about solving an equation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: '**Cookie packaging** A package of $51$ cookies has $3$ equal rows of cookies. Find the number of cookies in each row, $c$, by solving the equation $3c = 51$.',
          answer: '$c = 17$ cookies',
          working: '3c ÷ 3 = 51 ÷ 3',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A package of 51 cookies has 3 equal rows of cookies. Find the number of cookies in each row, c, by solving the equation 3 c equals 51.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The equation', md: '$c$ is the number of cookies in **one** row. $3c$ means $3 \\times c$: **three** rows of $c$ cookies. The equation $3c = 51$ says the three rows hold **all** $51$ cookies. **Solving** means finding $c$.' }],
      lines: [
        { say: 'c stands for the number of cookies in one row. 3 c means 3 times c, three rows of c cookies each.', show: 'c' },
        { say: 'The equation 3 c equals 51 says the three rows hold all 51 cookies. Solving it means finding the number c.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Division property of equality', md: 'An equation is like a **balance**. We can **divide both sides** by the same number (not zero), and they stay **equal**. Dividing **undoes** multiplying, so it leaves the variable **alone**.' }],
      lines: [
        { say: 'Here is what we need. An equation is like a balance. If we divide both sides by the same number, they stay equal.', show: 'c' },
        { say: 'Dividing undoes multiplying. So dividing by the number in front of the variable leaves the variable on its own.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['See what is done to $c$: **times 3**', '**Divide** both sides by $3$', '**Check** by putting the answer back'] }],
      lines: [
        { say: 'Here is the plan. See what is done to c. It is multiplied by 3.', show: 'plan.0' },
        { say: 'Undo it: divide both sides by 3.', show: 'plan.1' },
        { say: 'Then check by putting the answer back into the equation.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3c = 51', '\\dfrac{3c}{3} = \\dfrac{51}{3}', 'c = \\good{17}'] }],
      lines: [
        { say: 'Step one. Here is the equation. c is multiplied by 3.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. To undo times 3, divide both sides by 3. 3 c divided by 3 is just c.', show: 'm.1', focus: 'm.1' },
        { say: 'And 51 divided by 3 is 17, because 3 times 17 is 51. So c is 17. There are 17 cookies in each row.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times 17 \\overset{?}{=} 51', '51 = 51 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by putting 17 back in for c. Is 3 times 17 equal to 51?', show: 'm.0' },
        { say: '3 times 17 is 51. Both sides are equal, so 3 rows of 17 hold all 51 cookies. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$c = 153$', '**multiplied** by $3$: undo times $3$ by **dividing**'],
            ['$c = 48$', '**subtracted** $3$: $3c$ means $3$ **times** $c$'],
            ['$c = 54$', 'added $3$: that undoes nothing here'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '153 multiplies 51 by 3. To undo multiplying by 3, we divide by 3.' },
        { say: '48 subtracts 3, as if the equation were c plus 3 equals 51. But 3 c means 3 times c.' },
        { say: 'And 54 adds 3. Three rows of 54 would be far more than 51 cookies.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '$4$ friends share $52$ stickers equally. Solve $4n = 52$ to find how many stickers each friend gets.',
          choices: ['$n = 13$', '$n = 48$', '$n = 208$', '$n = 56$'],
          answer: 0,
          working: 'Divide both sides by 4: n = 52 ÷ 4 = 13. Check: 4 × 13 = 52.',
        },
      ],
      lines: [
        { say: 'Your turn. 4 friends share 52 stickers equally. Solve 4 n equals 52 to find how many stickers each friend gets. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Divide both sides by 4: n is 52 divided by 4, which is 13. Check: 4 times 13 is 52. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$3c$ means $3$ **times** $c$', 'Undo multiplying by **dividing**', 'Do the same to **both sides**', '**Substitute** the answer to check'] }],
      lines: [
        { say: 'Here is what to remember. 3 c means 3 times c.', show: 'sum.0' },
        { say: 'Undo multiplying by dividing.', show: 'sum.1' },
        { say: 'Do the same thing to both sides, so the equation stays balanced.', show: 'sum.2' },
        { say: 'And put the answer back in to check. For more on solving equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
