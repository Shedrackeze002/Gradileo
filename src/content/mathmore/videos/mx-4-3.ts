import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-4-3',
  lessonId: 'mx-4-3',
  title: 'Polynomial Identities, Part 1: Identities',
  thumbnailTitle: 'Polynomial Identities',
  thumbnail: false,
  summary: 'An identity is an equation true for every value of its variables: prove one by expanding, and disprove one with a single counterexample. a² − b² = (a + b)(a − b) gives 53² − 47² = 100 × 6 = 600, and (x² + y²)² = (x² − y²)² + (2xy)² makes Pythagorean triples such as 5, 12, 13.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Complex Numbers and Polynomials · Part 1', title: 'Polynomial Identities', subtitle: 'Equations that are always true' }],
      lines: [
        { say: 'Some equations are true only for particular values. Two x plus one equals seven is true only when x is three.', show: 'title' },
        { say: 'Others are true for every value at all. In this video, you will learn about these identities, and use them for mental arithmetic and to make right triangles.' },
      ],
    },
    {
      chapter: 'What an identity is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Identity', md: 'An equation that is true for **every** value of its variables. To show it is an identity, expand or simplify one side until it matches the other. To show it is not, **one counterexample** is enough.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(a + b)^2 = (a + b)(a + b)', '= a^2 + ab + ab + b^2 = a^2 + 2ab + b^2'] },
      ],
      lines: [
        { say: 'An identity is an equation that is true for every value of its variables.', show: 'def' },
        { say: 'To show that an equation is an identity, expand or simplify one side until it matches the other. To show that it is not, one counterexample is enough: a single value where it fails.' },
        { say: 'For example, "a" plus b, all squared, is "a" plus b times "a" plus b. Expanding gives "a" squared, plus "a" b, plus "a" b, plus b squared. That is "a" squared plus two "a" b plus b squared, for every "a" and b.', show: ['m.0', 'm.1'], focus: 'm' },
      ],
    },
    {
      chapter: 'Identities to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(a + b)^2 = a^2 + 2ab + b^2 \\qquad (a - b)^2 = a^2 - 2ab + b^2', 'a^2 - b^2 = (a + b)(a - b)', 'a^3 + b^3 = (a + b)(a^2 - ab + b^2)', 'a^3 - b^3 = (a - b)(a^2 + ab + b^2)', '(x^2 + y^2)^2 = (x^2 - y^2)^2 + (2xy)^2'] },
      ],
      lines: [
        { say: 'Here are some identities worth knowing. The squares of a sum and of a difference.', show: 'm.0', focus: 'm.0' },
        { say: 'The difference of squares: "a" squared minus b squared is "a" plus b, times "a" minus b.', show: 'm.1', focus: 'm.1' },
        { say: 'The sum and the difference of two cubes, which factor into a bracket of two terms times a bracket of three.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'And one that makes right triangles: x squared plus y squared, all squared, equals x squared minus y squared, all squared, plus two x y, all squared.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Mental arithmetic',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['53^2 - 47^2 = (53 + 47)(53 - 47)', '= 100 \\times 6 = 600'] },
      ],
      lines: [
        { say: 'Work out 53 squared minus 47 squared, without a calculator.', show: 'm.0' },
        { say: 'Use the difference of squares, with "a" equal to 53 and b equal to 47. That gives 53 plus 47, times 53 minus 47.', focus: 'm.0' },
        { say: 'That is 100 times six, which is six hundred. Much easier than squaring each number.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '(a + b)² is not a² + b²', md: 'Try $a = 2$, $b = 1$: $(2 + 1)^2 = 9$, but $2^2 + 1^2 = 5$. The middle term $2ab$ is missing.' },
      ],
      lines: [
        { say: 'A very common mistake is to write "a" plus b, all squared, as "a" squared plus b squared.', show: 'oops' },
        { say: 'One counterexample shows it is wrong. Try "a" equal to two and b equal to one. Two plus one, squared, is nine. But two squared plus one squared is only five. The middle term, two "a" b, is missing.' },
      ],
    },
    {
      chapter: 'Pythagorean triples',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 3,\\ y = 2', 'x^2 - y^2 = 5 \\qquad 2xy = 12 \\qquad x^2 + y^2 = 13', '5^2 + 12^2 = 25 + 144 = 169 = 13^2'] },
      ],
      lines: [
        { say: 'The last identity makes Pythagorean triples: whole numbers that are the sides of a right triangle. Try x equals three and y equals two.', show: 'm.0', focus: 'm.0' },
        { say: 'Then x squared minus y squared is nine minus four, which is five. Two x y is twelve. And x squared plus y squared is thirteen.', show: 'm.1', focus: 'm.1' },
        { say: 'By the identity, five squared plus twelve squared equals thirteen squared. Check: 25 plus 144 is 169, which is thirteen squared. So the triangle with sides five, twelve and thirteen is right-angled.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use an identity to work out $61^2 - 39^2$.',
          choices: ['$484$', '$2{,}200$', '$22$', '$4{,}840$'],
          answer: 1,
          working: '$61^2 - 39^2 = (61 + 39)(61 - 39) = 100 \\times 22 = 2{,}200$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use an identity to work out 61 squared minus 39 squared. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. By the difference of squares, it is 61 plus 39, times 61 minus 39. That is 100 times 22, which is 2,200. Choice A squares the difference, 22, instead.', show: 'q.answer' },
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
          items: ['An identity is true for every value of its variables.', 'Prove one by expanding; disprove one with a counterexample.', '$a^2 - b^2 = (a + b)(a - b)$ helps with mental arithmetic.', '$(a + b)^2 = a^2 + 2ab + b^2$, not $a^2 + b^2$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An identity is an equation that is true for every value of its variables.', show: 'sum.0' },
        { say: 'Prove one by expanding until both sides match, and disprove one with a single counterexample.', show: 'sum.1' },
        { say: 'The difference of squares is handy for mental arithmetic.', show: 'sum.2' },
        { say: 'And "a" plus b, all squared, has a middle term: it is not "a" squared plus b squared. In the next part, we count the roots of any polynomial. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
