import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { disc } from './lib/m7-7-figures.ts';

// A tree trunk seen from above: its circumference (150 cm) is known, its diameter is not.
const trunk = (id: string) => figure(id, [disc({ r: 4, dAt: 0, tone: 'theta', shade: 0.22, labels: { c: 'C = 150\\text{ cm}', d: 'd = \\, ?' } })], 400);

// A circular garden: C = 20 m, so d ≈ 6.37 m and r ≈ 3.2 m.
const garden = (id: string) => figure(id, [disc({ r: 4, dAt: 0, rAt: 90, tone: 'good', shade: 0.2, labels: { c: 'C = 20\\text{ m}', r: 'r = \\, ?' }, draw: ['d'] })], 400);

const video: Explainer = {
  id: 'm7-7-1-e',
  lessonId: 'm7-7-1',
  title: 'Radius, Diameter and Circumference, Part 5: Working Backwards',
  thumbnailTitle: 'Working Backwards',
  thumbnail: 'tr',
  summary:
    'Since C = πd, dividing by π undoes multiplying by π: d = C ÷ π. A tree trunk with a circumference of 150 cm has a diameter of 150 ÷ π ≈ 47.7 cm. For the radius, find the diameter, then divide by 2: a circular garden with C = 20 m has d ≈ 6.37 m and r ≈ 3.18, or about 3.2 m.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 5', title: 'Working Backwards', subtitle: 'From the circumference to the diameter' }],
      lines: [
        { say: 'It is easy to measure around a tree trunk with a measuring tape. But you cannot measure straight through it! So how can you find its diameter?', show: 'title' },
        { say: 'In this video, you will work backwards, from the circumference to the diameter and the radius.' },
      ],
    },
    {
      chapter: 'Undo multiplying by pi',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['C = \\pi \\times d', 'd = C \\div \\pi'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Diameter from circumference', md: 'To find the diameter, **divide** the circumference by $\\pi$.' },
      ],
      lines: [
        { say: 'The circumference is pi times the diameter. So the diameter is multiplied by pi to give the circumference.', show: 'm.0', focus: 'm.0' },
        { say: 'Remember inverse operations? Dividing undoes multiplying. So to go backwards, from the circumference to the diameter, divide by pi.', show: 'm.1', focus: 'm.1' },
        { say: 'The diameter is the circumference divided by pi.', show: 'key' },
      ],
    },
    {
      chapter: 'A tree trunk',
      layout: 'split',
      leftWidth: 500,
      left: [trunk('tr')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Kiona wraps a measuring tape around a tree trunk. The circumference is $150$ cm. Find the diameter to the nearest tenth of a centimetre.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['d = C \\div \\pi = 150 \\div \\pi'] },
        { kind: 'calc', id: 'calc', keys: '150 ÷ π', result: '47.74648293' },
        { kind: 'math', id: 'a', size: 'md', align: 'left', lines: ['d \\approx 47.7\\text{ cm}'] },
      ],
      lines: [
        { say: 'Kiona wraps a measuring tape around a tree trunk. The circumference is one hundred fifty centimetres. Find the diameter, to the nearest tenth of a centimetre.', show: ['q', 'tr.shape', 'tr.centre'], focus: 'tr.outline' },
        { say: 'Divide the circumference by pi: one hundred fifty divided by pi.', show: ['m.0', 'tr.d'], focus: 'm.0' },
        { say: 'On the calculator: one hundred fifty, divided by, the pi key. It shows forty-seven point seven four, and more digits.', show: 'calc' },
        { say: 'The digit after the tenths place is four, so round down. The trunk’s diameter is about forty-seven point seven centimetres.', show: 'a.0', focus: ['a.0', 'tr.d'] },
        { say: 'Does that make sense? Three times forty-seven point seven is about one hundred forty-three, and the circumference is a little more than that. Yes!' },
      ],
    },
    {
      chapter: 'The radius from the circumference',
      layout: 'split',
      leftWidth: 500,
      left: [garden('gd')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A circular garden has a circumference of $20$ m. Find its radius to the nearest tenth of a metre.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['d = 20 \\div \\pi \\approx 6.37\\text{ m}', 'r = 6.37 \\div 2 \\approx 3.18', 'r \\approx 3.2\\text{ m}'] },
      ],
      lines: [
        { say: 'A circular garden has a circumference of twenty metres. Find its radius, to the nearest tenth of a metre.', show: ['q', 'gd.shape', 'gd.centre'], focus: 'gd.outline' },
        { say: 'First find the diameter. Twenty divided by pi is about six point three seven metres.', show: ['m.0', 'gd.d'], focus: ['m.0', 'gd.d'] },
        { say: 'The radius is half of the diameter. Six point three seven divided by two is about three point one eight.', show: ['m.1', 'gd.r'], focus: ['m.1', 'gd.r'] },
        { say: 'To the nearest tenth, the radius is about three point two metres. On a calculator, you can do it all at once, and round only at the end.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A round table has a circumference of $314$ cm. Use $3.14$ for $\\pi$. What is its diameter?',
          choices: ['$100$ cm', '$50$ cm', '$985.96$ cm', '$157$ cm'],
          answer: 0,
          working: '$d = C \\div \\pi = 314 \\div 3.14 = 100$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A round table has a circumference of three hundred fourteen centimetres. Use three point one four for pi. What is its diameter? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, one hundred centimetres. Three hundred fourteen divided by three point one four is one hundred. Choice B is the radius, which is half of the diameter.', show: 'q.answer' },
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
          items: ['To find the diameter, divide the circumference by $\\pi$: $d = C \\div \\pi$.', 'To find the radius, find the diameter first, then divide by $2$.', 'Round only at the end, and check that the answer makes sense.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the diameter from the circumference, divide by pi.', show: 'sum.0' },
        { say: 'To find the radius, find the diameter first, then divide it by two.', show: 'sum.1' },
        { say: 'Round only at the end, and check that your answer makes sense. In the next lesson, you will find the area of a parallelogram. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
