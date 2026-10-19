import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bagRow } from './lib/m5-7-figures.ts';

// Three bags, each holding n marbles: n + n + n = 3n.
const three = (id: string) => figure(id, [bagRow({ count: 3, gap: 1.2 })], 200);

const video: Explainer = {
  id: 'm5-7-2',
  lessonId: 'm5-7-2',
  title: 'Algebraic Expressions, Part 1: Variables',
  thumbnailTitle: 'Variables',
  thumbnail: 'bg',
  summary: 'A variable is a letter that stands for a number you do not know yet, and an algebraic expression has numbers, operations and at least one variable: 8 × n cards in n packs, n + n + n written 3n, n ÷ 4 written n/4, 7 × k as 7k and k ÷ 2 as k/2, and why 4n means 4 × n (24 when n = 6, not 46).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 1', title: 'Variables', subtitle: 'A letter for a number you do not know yet' }],
      lines: [
        { say: 'A pack of hockey cards has eight cards. Three packs have eight times three, which is twenty-four cards.', show: 'title' },
        { say: 'But what if you do not know how many packs there are? In algebra, a letter can stand for a number you do not know yet. In this video, you will meet variables and algebraic expressions.' },
      ],
    },
    {
      chapter: 'Variables',
      layout: 'split',
      leftWidth: 420,
      left: [{ kind: 'table', id: 't', head: ['Packs', 'Cards'], rows: [['$1$', '$8 \\times 1 = 8$'], ['$2$', '$8 \\times 2 = 16$'], ['$3$', '$8 \\times 3 = 24$'], ['$n$', '$8 \\times n$']] }],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Variable', md: 'A **variable** is a letter, such as $n$, that stands for a number you do not know yet.' }],
      lines: [
        { say: 'Each pack has eight cards. One pack has eight times one, which is eight cards.', show: 't.0', focus: 't.0' },
        { say: 'Two packs have eight times two, which is sixteen. Three packs have eight times three, which is twenty-four.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'For any number of packs, multiply by eight. If we call the number of packs n, there are eight times n cards.', show: 't.3', focus: 't.3' },
        { say: 'The letter n is a variable. A variable is a letter that stands for a number you do not know yet.', show: 'def' },
      ],
    },
    {
      chapter: 'Algebraic expressions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Algebraic expression', md: 'An **algebraic expression** has numbers, operations and at least one variable, such as $8 \\times n$ or $n + 5$.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['8 \\times n \\qquad n + 5'] },
      ],
      lines: [
        { say: 'Eight times n is an algebraic expression. An algebraic expression has numbers, operations and at least one variable.', show: 'def' },
        { say: 'Here are two algebraic expressions: eight times n, and n plus five. Each one has a number, an operation and the variable n.', show: 'm.0', focus: 'm.0' },
        { say: 'In algebra, we also have a shorter way to write some of these. Let’s see how.' },
      ],
    },
    {
      chapter: 'Writing a product',
      layout: 'center',
      main: [three('bg'), { kind: 'math', id: 'm', size: 'lg', lines: ['n + n + n = 3 \\times n = 3n'] }],
      lines: [
        { say: 'Here are three bags. Each bag holds the same number of marbles, n. We do not know what n is.', show: ['bg.bag0', 'bg.bag1', 'bg.bag2'] },
        { say: 'All the marbles together are n plus n plus n. Adding the same variable again and again is multiplying, so that is three times n.', show: 'm.0', focus: 'm.0' },
        { say: 'In algebra, we write a product with a variable without the multiplication sign, with the number first. So three times n is written three n.' },
        { say: 'Why leave out the multiplication sign? It looks a lot like the letter x, which is often used as a variable. Leaving it out keeps things clear.' },
      ],
    },
    {
      chapter: 'Writing a quotient',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['n \\div 4 = \\dfrac{n}{4}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The algebra way', md: 'Write a product with the number first and no $\\times$ sign: $3 \\times n = 3n$. Write a quotient as a fraction, with the number being divided on top: $n \\div 4 = \\dfrac{n}{4}$.' },
      ],
      lines: [
        { say: 'We write a quotient with a variable as a fraction. So n divided by four is written n over four.', show: 'm.0', focus: 'm.0' },
        { say: 'The number being divided goes on top. Here, n is being divided, so n goes on top, and four goes on the bottom.' },
        { say: 'So, the algebra way: write a product with the number first and no multiplication sign. Write a quotient as a fraction.', show: 'key' },
      ],
    },
    {
      chapter: 'Write it the algebra way',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Write $7 \\times k$ and $k \\div 2$ the algebra way.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['7 \\times k = 7k', 'k \\div 2 = \\dfrac{k}{2}'] },
      ],
      lines: [
        { say: 'Let’s practise. Write seven times k, and k divided by two, the algebra way.', show: 'q' },
        { say: 'Seven times k is a product. Put the number right beside the letter, number first: seven k.', show: 'm.0', focus: 'm.0' },
        { say: 'k divided by two is a quotient. Write a fraction, with k on top, because k is being divided: k over two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A number beside a letter means multiply', md: '$4n$ means $4 \\times n$. It does not mean $4 + n$. If $n = 6$, then $4n = 24$, not $10$ or $46$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4n = 4 \\times n', 'n = 6: \\quad 4n = 4 \\times 6 = \\good{24}'] },
      ],
      lines: [
        { say: 'Watch out. Four n means four times n. It does not mean four plus n.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'If n is six, then four n is four times six, which is twenty-four.', show: 'm.1', focus: 'm.1' },
        { say: 'It is not ten, which would be four plus six. And it is not forty-six, which is just the two digits side by side.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $p + p + p + p$ the algebra way.',
          choices: ['$4 + p$', '$p4$', '$\\dfrac{p}{4}$', '$4p$'],
          answer: 3,
          working: 'Adding $p$ four times is $4 \\times p$, written with the number first and no $\\times$ sign: $4p$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write p plus p plus p plus p the algebra way. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, four p. Adding p four times is four times p, written with the number first and no multiplication sign. Choice B has the number after the letter, but the number goes first.', show: 'q.answer' },
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
          items: ['A variable is a letter that stands for a number you do not know yet.', 'An algebraic expression has numbers, operations and at least one variable.', 'Write $3 \\times n$ as $3n$, and $n \\div 4$ as $\\dfrac{n}{4}$.', '$4n$ means $4 \\times n$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A variable is a letter that stands for a number you do not know yet.', show: 'sum.0' },
        { say: 'An algebraic expression has numbers, operations and at least one variable.', show: 'sum.1' },
        { say: 'Write three times n as three n, and n divided by four as n over four.', show: 'sum.2' },
        { say: 'And four n means four times n. In the next part, you will name the parts of an expression, and write expressions for stories. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
