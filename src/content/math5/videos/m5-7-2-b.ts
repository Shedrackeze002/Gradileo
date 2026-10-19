import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm5-7-2-b',
  lessonId: 'm5-7-2',
  title: 'Algebraic Expressions, Part 2: Terms and Writing Expressions',
  thumbnailTitle: 'Writing Expressions',
  summary: 'Terms, coefficients and constant terms (in 5p + 8, the terms are 5p and 8, the coefficient is 5 and the constant term is 8), and word clues for writing expressions: “each” means multiply (9 dollars each for t tickets plus 5 dollars parking is 9t + 5) and “shared equally” means divide (c crackers among 4 friends is c/4).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 2', title: 'Terms and Writing Expressions', subtitle: 'The parts of an expression, and word clues' }],
      lines: [
        { say: 'An expression is built from pieces called terms. When you know the pieces, you can write an expression for a real situation.', show: 'title' },
        { say: 'In this video, you will name the parts of an expression, and write expressions from words.' },
      ],
    },
    {
      chapter: 'Terms',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Term', md: 'A **term** is a number times a variable (like $5p$), a variable divided by a number (like $\\tfrac{p}{3}$), or a number on its own (like $8$). Terms are joined by $+$ or $-$ signs.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['5p \\qquad \\dfrac{p}{3} \\qquad 8'] },
      ],
      lines: [
        { say: 'A term is one piece of an expression. There are three kinds of terms.', show: 'def' },
        { say: 'A term can be a number times a variable, like five p. It can be a variable divided by a number, like p over three. Or it can be a number on its own, like eight.', show: 'm.0', focus: 'm.0' },
        { say: 'In an expression, the terms are joined by plus signs or minus signs.' },
      ],
    },
    {
      chapter: 'Coefficients and constants',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\opp{5}p + \\adj{8}', '\\opp{\\text{coefficient: } 5} \\qquad \\adj{\\text{constant term: } 8}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Coefficient and constant term', md: 'In the term $5p$, the number $5$ is the **coefficient**. A number on its own, like $8$, is a **constant term**.' },
      ],
      lines: [
        { say: 'Two parts of an expression have special names. Look at five p, plus eight.', show: 'm.0' },
        { say: 'In the term five p, the number five is called the coefficient. It is the number that multiplies the variable.', show: ['def', 'm.1'], focus: 'm.1' },
        { say: 'A number on its own, like eight, is called a constant term. Constant means it does not change. It stays eight, whatever number p stands for.' },
      ],
    },
    {
      chapter: 'Name the parts',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Name the terms, the coefficient and the constant term of $5p + 8$.' },
        { kind: 'table', id: 't', head: ['Part', 'Answer'], rows: [['Terms', '$5p$ and $8$'], ['Coefficient', '$5$'], ['Constant term', '$8$']] },
      ],
      lines: [
        { say: 'Let’s name all the parts of five p, plus eight.', show: 'q' },
        { say: 'The plus sign joins two terms. The terms are five p, and eight.', show: 't.0', focus: 't.0' },
        { say: 'In five p, the number multiplied by p is five. That is the coefficient.', show: 't.1', focus: 't.1' },
        { say: 'And the number on its own, eight, is the constant term.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Word clues',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Read the situation carefully. Each word gives a clue:' },
        { kind: 'bullets', id: 'b', items: ['“**each**” or “**per**” means **multiply** the variable;', '“**shared equally**” or “**cut into equal pieces**” means **divide** the variable;', 'an amount that is added **only once** is a **constant term**.'] },
      ],
      lines: [
        { say: 'To write an expression for a situation, read it carefully. Some words give you clues.', show: 't' },
        { say: 'The word each, or per, means multiply the variable.', show: 'b.0' },
        { say: 'Shared equally, or cut into equal pieces, means divide the variable.', show: 'b.1' },
        { say: 'And an amount that is added only once is a constant term.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Tickets and parking',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Movie tickets cost \\$9 **each**. Parking costs \\$5. Write an expression for the total cost, in dollars, of $t$ tickets and parking.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['9t', '9t + 5'] },
      ],
      lines: [
        { say: 'Movie tickets cost nine dollars each. Parking costs five dollars. Write an expression for the total cost, in dollars, of t tickets and parking.', show: 'q' },
        { say: 'Each ticket costs nine dollars. Each means multiply. So t tickets cost nine times t dollars, which is nine t.', show: 'm.0', focus: 'm.0' },
        { say: 'Parking is paid only once, so add five. It is a constant term.', show: 'm.1', focus: 'm.1' },
        { say: 'The expression is nine t, plus five. The coefficient, nine, is the price of each ticket, and the constant term, five, is the parking.' },
      ],
    },
    {
      chapter: 'Sharing crackers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Mei shares $c$ crackers **equally** among $4$ friends. Write an expression for the number of crackers each friend gets.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['c \\div 4 = \\dfrac{c}{4}'] },
      ],
      lines: [
        { say: 'Mei shares some crackers equally among four friends. The number of crackers is c. Write an expression for the number of crackers each friend gets.', show: 'q' },
        { say: 'Shared equally means divide. The crackers, c, are divided by four.', show: 'm.0', focus: 'm.0' },
        { say: 'Written the algebra way, as a fraction, the expression is c over four. If there were twenty crackers, each friend would get twenty divided by four, which is five.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Pens cost \\$3 each, and a pencil case costs \\$7. Which expression gives the total cost, in dollars, of $p$ pens and one pencil case?',
          choices: ['$7p + 3$', '$3 + p + 7$', '$3p + 7$', '$\\dfrac{p}{3} + 7$'],
          answer: 2,
          working: '“Each” means multiply: $p$ pens cost $3p$ dollars. The case is paid once, so it is the constant term: $3p + 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Pens cost three dollars each, and a pencil case costs seven dollars. Which expression gives the total cost, in dollars, of p pens and one pencil case? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: three p, plus seven. Each means multiply, so p pens cost three p dollars, and the case is paid once, so seven is the constant term. Choice A mixes them up: it charges seven dollars for each pen.', show: 'q.answer' },
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
          items: ['In $5p + 8$, the terms are $5p$ and $8$, the coefficient is $5$, and the constant term is $8$.', '“Each” or “per” means multiply; “shared equally” means divide.', 'An amount added once is a constant term: $9t + 5$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In five p, plus eight, the terms are five p and eight. The coefficient is five, and the constant term is eight.', show: 'sum.0' },
        { say: 'Each, or per, means multiply, and shared equally means divide.', show: 'sum.1' },
        { say: 'And an amount added once is a constant term. In the next part, you will evaluate expressions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
