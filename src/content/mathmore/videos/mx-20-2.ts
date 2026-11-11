import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'mx-20-2',
  lessonId: 'mx-20-2',
  title: 'Perfect Cubes and Cube Roots',
  thumbnail: 'bx',
  summary: 'A perfect cube is a whole number multiplied by itself three times: 4³ = 4 × 4 × 4 = 64. The cube root undoes cubing, so ∛64 = 4. A cube with edge s has volume s³, so a cube with a volume of 216 cm³ has edges of ∛216 = 6 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Sets, Absolute Value and Proportionality', title: 'Perfect Cubes and Cube Roots', subtitle: 'From the edge of a cube to its volume, and back' }],
      lines: [
        { say: 'Squaring a number gives the area of a square. Cubing a number does the same job one dimension up. It gives the volume of a cube.', show: 'title' },
        { say: 'In this video, you will learn to cube a number, find a cube root, and use both to solve problems about cubes.' },
      ],
    },
    {
      chapter: 'Perfect cubes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Perfect cube', md: 'The result of multiplying a whole number by itself three times. We write the exponent $3$ and say "cubed".' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4^3 = 4 \\times 4 \\times 4 = 64', '1,\\ 8,\\ 27,\\ 64,\\ 125,\\ 216,\\ \\ldots'] },
      ],
      lines: [
        { say: 'A perfect cube is the result of multiplying a whole number by itself three times. We write it with the exponent three, and we say cubed.', show: 'def' },
        { say: 'Four cubed is four times four times four. Four times four is sixteen, and sixteen times four is sixty-four. So sixty-four is a perfect cube.', show: 'm.0', focus: 'm.0' },
        { say: 'The first few perfect cubes are one, eight, twenty-seven, sixty-four, one hundred twenty-five, and two hundred sixteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['6^3 = 6 \\times 6 \\times 6', '= 36 \\times 6 = 216'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying by 3', md: '$6^3$ does not mean $6 \\times 3$. The exponent counts how many times $6$ is used as a factor.' },
      ],
      lines: [
        { say: 'Evaluate six cubed. Write six three times, with multiplication signs between.', show: 'm.0', focus: 'm.0' },
        { say: 'Six times six is thirty-six, and thirty-six times six is two hundred sixteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Six cubed does not mean six times three. The exponent counts how many times six is used as a factor. The answer is two hundred sixteen, not eighteen.', show: 'oops' },
      ],
    },
    {
      chapter: 'Cube roots',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Cube root', md: 'The number that, when cubed, gives the original number. Cubing and taking the cube root undo each other.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt[3]{64} = 4 \\quad \\text{because} \\quad 4^3 = 64', '\\sqrt[3]{343} = 7 \\quad \\text{because} \\quad 7 \\times 7 \\times 7 = 343'] },
      ],
      lines: [
        { say: 'The cube root of a number is the number that, when cubed, gives the original number. Cubing and taking the cube root are inverse operations.', show: 'def' },
        { say: 'The cube root of sixty-four is four, because four cubed is sixty-four.', show: 'm.0', focus: 'm.0' },
        { say: 'To find the cube root of three hundred forty-three, we look for the number whose cube is three hundred forty-three. Try seven. Seven times seven is forty-nine, and forty-nine times seven is three hundred forty-three. So the cube root is seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Cubes and volume',
      layout: 'split',
      leftWidth: 620,
      left: [figure('bx', [box({ l: 4, w: 4, h: 4, labels: { l: 's', w: 's', h: 's' } })], 400)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['V = s^3', 's = \\sqrt[3]{V}', 's = \\sqrt[3]{216} = 6\\text{ cm}'] },
      ],
      lines: [
        { say: 'A cube with edges of length s is built from s times s times s unit cubes. So its volume is the edge length cubed.', show: 'bx' },
        { say: 'Volume equals s cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'This means the edge of a cube is the cube root of its volume.', show: 'm.1', focus: 'm.1' },
        { say: 'A cube-shaped box has a volume of two hundred sixteen cubic centimetres. Six times six times six is two hundred sixteen, so each edge is six centimetres long.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cube has a volume of $125$ cm³. What is the area of one of its faces?',
          choices: ['$25$ cm²', '$5$ cm²', '$41.7$ cm²', '$15$ cm²'],
          answer: 0,
          working: 'Edge $= \\sqrt[3]{125} = 5$ cm, so one face is $5 \\times 5 = 25$ cm².',
        },
      ],
      lines: [
        { say: 'Your turn. A cube has a volume of one hundred twenty-five cubic centimetres. What is the area of one of its faces? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The edge is the cube root of one hundred twenty-five, which is five centimetres. One face is a square, five by five, so its area is twenty-five square centimetres.', show: 'q.answer' },
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
          items: ['$n^3 = n \\times n \\times n$, not $n \\times 3$.', 'Perfect cubes: $1, 8, 27, 64, 125, 216, \\ldots$', '$\\sqrt[3]{a}$ is the number whose cube is $a$.', 'A cube with edge $s$ has volume $s^3$, so $s = \\sqrt[3]{V}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To cube a number, use it as a factor three times.', show: 'sum.0' },
        { say: 'The results for whole numbers are the perfect cubes.', show: 'sum.1' },
        { say: 'The cube root of a number is the number whose cube it is.', show: 'sum.2' },
        { say: 'And the volume of a cube is its edge cubed, so the edge is the cube root of the volume. In the next lesson, we find the constant of proportionality. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
