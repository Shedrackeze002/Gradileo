import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { disc } from './lib/m7-7-figures.ts';

// A circle with a diameter of 9 cm, its circumference in yellow.
const nine = (id: string) => figure(id, [disc({ r: 4.5, dAt: 0, labels: { d: 'd = 9\\text{ cm}', c: 'C' } })], 380);

// A hula hoop with a radius of 40 cm (drawn at a tenth of its size).
const hoop = (id: string) => figure(id, [disc({ r: 4, rAt: 30, tone: 'hyp', shade: 0.08, labels: { r: 'r = 40\\text{ cm}', c: 'C' } })], 380);

const video: Explainer = {
  id: 'm7-7-1-d',
  lessonId: 'm7-7-1',
  title: 'Radius, Diameter and Circumference, Part 4: Finding the Circumference',
  thumbnailTitle: 'Finding the Circumference',
  thumbnail: 'hp',
  summary:
    'Using C = πd and C = 2πr with the π key, rounding only at the end: a circle with a diameter of 9 cm has a circumference of π × 9 ≈ 28.3 cm, and a hula hoop with a radius of 40 cm has a circumference of 2 × π × 40 ≈ 251.3 cm. Putting the radius into C = πd gives only half the distance around.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 4', title: 'Finding the Circumference', subtitle: 'Use the diameter, or the radius' }],
      lines: [
        { say: 'You know that the circumference of a circle is pi times its diameter. Now let’s use that to find some circumferences.', show: 'title' },
        { say: 'In this video, you will find the circumference from the diameter, and from the radius, and avoid a common mistake.' },
      ],
    },
    {
      chapter: 'Using the diameter',
      layout: 'split',
      leftWidth: 500,
      left: [nine('nn')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Diameter $9$ cm. Find the circumference to the nearest tenth. Use the $\\pi$ key.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['C = \\pi d = \\pi \\times 9'] },
        { kind: 'calc', id: 'calc', keys: 'π × 9', result: '28.27433388' },
        { kind: 'math', id: 'a', size: 'md', align: 'left', lines: ['C \\approx 28.3\\text{ cm}'] },
      ],
      lines: [
        { say: 'A circle has a diameter of nine centimetres. Find its circumference, to the nearest tenth of a centimetre. Use the pi key on a calculator.', show: ['q', 'nn.shape', 'nn.centre', 'nn.d'] },
        { say: 'We know the diameter, so use the formula C equals pi times d. Put nine in place of d: C equals pi times nine.', show: 'm.0', focus: 'm.0' },
        { say: 'On a calculator, press the pi key, then times nine. The calculator shows twenty-eight point two seven, and more digits after that.', show: 'calc' },
        { say: 'Round to the nearest tenth. The digit after the tenths place is seven, so round up. The circumference is about twenty-eight point three centimetres.', show: 'a.0', focus: ['a.0', 'nn.outline'] },
      ],
    },
    {
      chapter: 'Using the radius',
      layout: 'split',
      leftWidth: 500,
      left: [hoop('hp')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Radius $40$ cm. Find the circumference to the nearest tenth. Use the $\\pi$ key.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['C = 2\\pi r = 2 \\times \\pi \\times 40'] },
        { kind: 'calc', id: 'calc', keys: '2 × π × 40', result: '251.3274123' },
        { kind: 'math', id: 'a', size: 'md', align: 'left', lines: ['C \\approx 251.3\\text{ cm}'] },
      ],
      lines: [
        { say: 'A hula hoop has a radius of forty centimetres. Find its circumference, to the nearest tenth of a centimetre.', show: ['q', 'hp.shape', 'hp.centre', 'hp.r'] },
        { say: 'This time we know the radius, so use the formula C equals two times pi times r. Put forty in place of r.', show: 'm.0', focus: 'm.0' },
        { say: 'On the calculator: two, times pi, times forty. The calculator shows two hundred fifty-one point three two, and more digits.', show: 'calc' },
        { say: 'The digit after the tenths place is two, so round down. The circumference is about two hundred fifty-one point three centimetres.', show: 'a.0', focus: ['a.0', 'hp.outline'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the radius in C = πd', md: '$\\pi \\times 40 \\approx 125.7$ cm is only **half** of the distance around the hoop. When you are given the radius, double it first, or use $C = 2\\pi r$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\pi \\times 40 \\approx \\bad{125.7\\text{ cm}} \\quad \\text{half way round}', '2 \\times \\pi \\times 40 \\approx \\good{251.3\\text{ cm}} \\quad \\text{all the way round}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people see the forty, and put it straight into C equals pi times d.', show: 'oops' },
        { say: 'Pi times forty is about one hundred twenty-five point seven centimetres. But forty is the radius, not the diameter. So this answer is only half of the way around the hoop.', show: 'm.0', focus: 'm.0' },
        { say: 'When you are given the radius, double it first to get the diameter, or use the formula C equals two times pi times r. Then you get the whole distance around.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Is it reasonable?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Estimate with 3', md: 'The circumference is a little more than $3$ times the diameter. Multiply the diameter by $3$ to check that your answer makes sense.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['d = 9: \\quad 3 \\times 9 = 27, \\text{ and } 28.3 \\text{ is a little more}', 'd = 80: \\quad 3 \\times 80 = 240, \\text{ and } 251.3 \\text{ is a little more}'] },
      ],
      lines: [
        { say: 'Here is a quick way to check your answer. The circumference is a little more than three times the diameter.', show: 'tip' },
        { say: 'For the circle, three times nine is twenty-seven. Our answer, twenty-eight point three, is a little more. That makes sense.', show: 'm.0', focus: 'm.0' },
        { say: 'For the hoop, the diameter is eighty centimetres, and three times eighty is two hundred forty. Our answer, two hundred fifty-one point three, is a little more. That makes sense as well.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bicycle wheel has a radius of $30$ cm. Use $3.14$ for $\\pi$. What is its circumference?',
          choices: ['$94.2$ cm', '$376.8$ cm', '$33.14$ cm', '$188.4$ cm'],
          answer: 3,
          working: '$C = 2\\pi r = 2 \\times 3.14 \\times 30 = 188.4$ cm. Check: the diameter is $60$ cm, and $3 \\times 60 = 180$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bicycle wheel has a radius of thirty centimetres. Use three point one four for pi. What is its circumference? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one hundred eighty-eight point four centimetres. Two times three point one four times thirty is one hundred eighty-eight point four. Choice A uses the radius as if it were the diameter, so it only goes half of the way around.', show: 'q.answer' },
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
          items: ['Given the diameter, use $C = \\pi d$.', 'Given the radius, use $C = 2\\pi r$, or double the radius first.', 'Use the $\\pi$ key, and round only at the end.', 'Check: $C$ is a little more than $3 \\times d$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When you know the diameter, use the formula C equals pi times d.', show: 'sum.0' },
        { say: 'When you know the radius, use the formula C equals two times pi times r, or double the radius first.', show: 'sum.1' },
        { say: 'Use the pi key, and round only at the end.', show: 'sum.2' },
        { say: 'And check that the circumference is a little more than three times the diameter. In the next part, you will work backwards, from the circumference to the diameter. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
