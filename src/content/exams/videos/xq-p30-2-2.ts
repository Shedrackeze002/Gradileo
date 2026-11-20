import type { ChargesEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 12 lesson 2.2 (Coulomb's law): Coulomb measures 20 × 10⁻⁶ N between two
// charged spheres 5.0 cm apart, then turns the dial to bring them 3.0 cm apart. What force does he
// measure now? The question is OpenStax Physics' own, word for word (the worked example "Using
// Coulomb's law to find the force between charged objects", section 18.2, CC BY 4.0), with the four
// choices of its OpenStax exercise. The charges do not change, so F ∝ 1/r²:
// F = 20 × 10⁻⁶ × (5.0 / 3.0)² = 5.6 × 10⁻⁵ N (choice a).
//
// The picture (src/video/charges.ts) uses two equal charges of 2.36 nC, which give the 20 µN of the
// question at 5.0 cm; the charges are not written, since the question does not know them. Sliding
// B in to 3.0 cm stretches both force arrows to 5.56 × 10⁻⁵ N, worked out from Coulomb's law.

const balance: ChargesEl = {
  kind: 'charges',
  id: 'sim',
  view: [-0.045, 0.055, -0.011, 0.011],
  height: 250,
  unit: 'nC',
  length: { metres: 0.01, symbol: 'cm' },
  notation: 'sci',
  bodies: [
    { id: 'a', charge: 2.3593, x: -0.025, label: 'A' },
    { id: 'b', charge: 2.3593, x: 0.025, label: 'B' },
  ],
  poster: 'closer',
  clips: {
    closer: { reset: true, phases: [{ dur: 1 }, { dur: 2.4, to: { b: 0.005 } }] },
  },
};

const QUESTION =
  'Suppose Coulomb measures a force of 20 × 10⁻⁶ N between the two charged spheres when they are separated by 5.0 cm. By turning the dial at the top of the torsion balance, he approaches the spheres so that they are separated by 3.0 cm. Which force does he measure now?';
const CHOICES = ['5.6 × 10⁻⁵ N', '5.6 × 10⁻⁴ N', '5.6 × 10⁻³ N', '5.6 × 10⁻² N'];

const video: Explainer = {
  id: 'xq-p30-2-2',
  lessonId: '',
  exam: {
    lesson: 'p30-2-2',
    source: 'OpenStax, Physics, Worked Example "Using Coulomb’s law to find the force between charged objects", section 18.2',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/18-2-coulombs-law',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Coulomb Moves the Spheres Closer. Coulomb’s Law and Distance',
  thumbnailTitle: 'Closer Charges, Bigger Force',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: Coulomb measures 20 × 10⁻⁶ N between two charged spheres 5.0 cm apart and then moves them to 3.0 cm. We find the new force without knowing the charges, because Coulomb’s law makes the force go as one over the distance squared. Then we watch the force arrows grow as the spheres come closer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Closer Charges, Bigger Force', subtitle: 'Coulomb’s law, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about Charles Coulomb\'s famous experiment with two charged spheres. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          choices: ['$5.6 \\times 10^{-5}$ N', '$5.6 \\times 10^{-4}$ N', '$5.6 \\times 10^{-3}$ N', '$5.6 \\times 10^{-2}$ N'],
          answer: 0,
          working: '$F \\propto \\dfrac{1}{r^2}$, so $F_f = 20 \\times 10^{-6} \\times \\left(\\dfrac{5.0}{3.0}\\right)^2 = 5.6 \\times 10^{-5}$ N.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Suppose Coulomb measures a force of twenty times ten to the minus six newtons between the two charged spheres when they are separated by 5.0 centimetres.' },
        { say: 'By turning the dial at the top of the torsion balance, he approaches the spheres so that they are separated by 3.0 centimetres. Which force does he measure now?' },
        { say: 'The choices are 5.6 times ten to the minus five, minus four, minus three, or minus two newtons. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [balance, { kind: 'text', id: 'plain', size: 'md', md: 'Same charges, **closer** together: how big is the force now?' }],
      lines: [
        { say: 'Let us picture it. Two charged spheres, A and B, push on each other from 5.0 centimetres apart. Coulomb turns the dial, and B moves in to 3.0 centimetres.', show: ['sim', 'sim.force', 'sim.distance'], play: 'sim.closer', playDelay: 0.5, wait: 2.5 },
        { say: 'The charges on the spheres do not change. Only the distance does. The question asks for the new force, and we are never told the charges.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Coulomb’s law',
          md: 'The force between two charges is $F = \\dfrac{k q_1 q_2}{r^2}$. With the same charges, $k q_1 q_2$ stays fixed, so the force goes as **one over the distance squared**: $\\dfrac{F_f}{F_i} = \\left(\\dfrac{r_i}{r_f}\\right)^2$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Half the distance: $F$ is $2^2 = 4$ times **bigger**.' },
      ],
      lines: [
        { say: 'Here is what we need. Coulomb\'s law: the force is k times the two charges, divided by the distance squared.', show: 'def' },
        { say: 'If the charges stay the same, the top of the fraction is fixed. So the force depends only on one over the distance squared. The ratio of the forces is the old distance over the new distance, squared.' },
        { say: 'For example, halve the distance, and the force grows by two squared: four times.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Write Coulomb’s law **before** and **after**', 'Divide: the charges **cancel**', 'Solve for the new force'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, write Coulomb\'s law before and after the spheres move.', show: 'plan.0' },
        { say: 'Second, divide one by the other, so that the unknown charges cancel.', show: 'plan.1' },
        { say: 'Third, solve for the new force.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Before and after',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['F_i = \\dfrac{k q_1 q_2}{r_i^2} \\qquad F_f = \\dfrac{k q_1 q_2}{r_f^2}'] }],
      lines: [
        { say: 'Step one. Before, the force is k q one q two over the starting distance squared. After, it is the same top over the new distance squared.', show: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{F_f}{F_i} = \\dfrac{k q_1 q_2 / r_f^2}{k q_1 q_2 / r_i^2} = \\dfrac{r_i^2}{r_f^2}', 'F_f = F_i \\left(\\dfrac{r_i}{r_f}\\right)^2'] }],
      lines: [
        { say: 'Step two. Divide the after force by the before force. The k and both charges cancel, leaving the starting distance squared over the new distance squared.', show: 'm.0' },
        { say: 'So the new force is the old force times the ratio of the distances, squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['F_f = 20 \\times 10^{-6}\\ \\text{N} \\times \\left(\\dfrac{5.0\\ \\text{cm}}{3.0\\ \\text{cm}}\\right)^2', '= 20 \\times 10^{-6} \\times 2.78 = 5.6 \\times 10^{-5}\\ \\text{N}', '= \\good{5.6 \\times 10^{-5}\\ \\text{N}}'] }],
      lines: [
        { say: 'Step three. Twenty times ten to the minus six newtons, times five over three, squared. The centimetres cancel, so there is no need to change them to metres.', show: 'm.0' },
        { say: 'Five over three squared is 2.78. Twenty times 2.78 is 55.6, so the force is 5.6 times ten to the minus five newtons.', show: 'm.1' },
        { say: 'That is choice A.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [balance, { kind: 'text', id: 't', size: 'md', md: '$\\dfrac{5.56 \\times 10^{-5}}{2.0 \\times 10^{-5}} = 2.78$: closer, so **stronger**.' }],
      lines: [
        { say: 'Let us check it with two spheres whose charges give twenty micronewtons at 5.0 centimetres. Watch the force arrows as B moves in.', show: ['sim', 'sim.force', 'sim.distance'], play: 'sim.closer', playDelay: 0.3, wait: 2.5 },
        { say: 'At 3.0 centimetres, Coulomb\'s law gives 5.56 times ten to the minus five newtons, 2.78 times as much. The spheres came closer, so the force grew, as it should.', show: 't' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Where it comes from'],
          rows: [
            ['$5.6 \\times 10^{-4}$ N', 'The power of ten slipped: **ten times** too big'],
            ['$5.6 \\times 10^{-3}$ N', 'A **hundred** times too big'],
            ['$5.6 \\times 10^{-2}$ N', 'A **thousand** times too big'],
            ['$5.6 \\times 10^{-5}$ N', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices. They all share the 5.6, so the question tests the power of ten.', show: 'traps' },
        { say: 'Twenty times ten to the minus six is two times ten to the minus five. Multiply by 2.78 and you get 5.6 times ten to the minus five. Write the starting force carefully, and the power of ten takes care of itself.' },
        { say: 'Two more traps that are not in the list: using the ratio without squaring it gives 3.3 times ten to the minus five, and turning the ratio upside down gives a smaller force, even though the spheres came closer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two charges attract each other with a force of 12 N. If the distance between them is doubled, what is the force?',
          choices: ['24 N', '3 N', '6 N', '48 N'],
          answer: 1,
          working: '$F_f = 12 \\times \\left(\\dfrac{1}{2}\\right)^2 = 3$ N.',
        },
      ],
      lines: [
        { say: 'Your turn. Two charges attract each other with a force of twelve newtons. If the distance between them is doubled, what is the force? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Twice as far means one over two squared: a quarter of the force. Twelve divided by four is three newtons. That is choice B. Six forgot to square, and 24 and 48 made the force grow when the charges moved apart.', show: 'q2.answer' },
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
          items: ['Coulomb’s law: $F = \\dfrac{k q_1 q_2}{r^2}$', 'Same charges: $F_f = F_i \\left(\\dfrac{r_i}{r_f}\\right)^2$', 'Closer means **stronger**: check the direction of the change', 'Unknown charges **cancel** when you divide'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Coulomb\'s law: k times the charges over the distance squared.', show: 'sum.0' },
        { say: 'With the same charges, the new force is the old force times the ratio of the distances, squared.', show: 'sum.1' },
        { say: 'Closer charges push or pull harder, so check that your answer changed the right way.', show: 'sum.2' },
        { say: 'And when the charges are unknown, divide the two cases so that they cancel. For more on Coulomb\'s law, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
