import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { disc, unroll } from './lib/m7-7-figures.ts';

// A circle with its circumference picked out in yellow and its diameter in pink.
const around = (id: string) => figure(id, [disc({ r: 4, dAt: 0, labels: { c: 'C', d: 'd' } })], 420);

// A tin of diameter 2 with a string wrapped once around it, then laid out flat: three diameters
// and a little more.
const string = (id: string) => figure(id, [unroll({ d: 2, labels: { d: 'd', c: '\\text{the string: } C', extra: '\\text{a little more}' } })], 420);

const video: Explainer = {
  id: 'm7-7-1-c',
  lessonId: 'm7-7-1',
  title: 'Radius, Diameter and Circumference, Part 3: Circumference and Pi',
  thumbnailTitle: 'Circumference and Pi',
  thumbnail: 'st',
  summary:
    'The circumference (C) is the distance around a circle, its perimeter. A string wrapped once around a tin and laid flat is a little more than three diameters long, and for every circle, C ÷ d is the same number: pi (π), 3.14159…, whose digits go on forever without repeating. So C = πd, or C = 2πr.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 3', title: 'Circumference and Pi', subtitle: 'A little more than three diameters' }],
      lines: [
        { say: 'How far is it all the way around a bicycle wheel, or around a round tin? You cannot measure a curve with a straight ruler.', show: 'title' },
        { say: 'In this video, you will find out how the distance around a circle is linked to the distance across it, and meet a very special number called pi.' },
      ],
    },
    {
      chapter: 'Circumference',
      layout: 'split',
      leftWidth: 560,
      left: [around('ar')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Circumference', md: 'The **circumference** ($C$) is the distance **around** a circle. It is the perimeter of the circle.' }],
      lines: [
        { say: 'The distance all the way around a circle is called its circumference. We write it with the letter C.', show: ['ar.shape', 'ar.centre', 'def'], focus: 'ar.outline' },
        { say: 'The circumference is just the perimeter of the circle: how far you would walk if you went once around it.' },
        { say: 'The diameter is the distance across the circle, through the centre. How does the distance around compare with the distance across?', show: 'ar.d', focus: 'ar.d' },
      ],
    },
    {
      chapter: 'A string around a tin',
      layout: 'center',
      main: [string('st')],
      lines: [
        { say: 'Here is a round tin, seen from above. Wrap a piece of string once around it, all the way, and cut the string where it meets its start.', show: ['st.circle'], focus: 'st.outline' },
        { say: 'Now unwrap the string, and lay it out flat in a straight line. Its length is the circumference.', show: 'st.string', focus: 'st.string' },
        { say: 'Next, measure the diameter of the tin, straight across through the centre.', show: 'st.dia', focus: 'st.dia' },
        { say: 'How many diameters fit along the string? One, two, three...', show: ['st.d0', 'st.d1', 'st.d2'], focus: ['st.d0', 'st.d1', 'st.d2'] },
        { say: 'and a little bit more! The circumference is a little more than three times the diameter.', show: ['st.extra', 'st.extra-label'], focus: 'st.extra' },
      ],
    },
    {
      chapter: 'Every circle',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Object', 'Diameter', 'Circumference', '$C \\div d$'],
          rows: [
            ['Can lid', '$8.0$ cm', '$25.1$ cm', '$3.14$'],
            ['Bicycle wheel', '$66.0$ cm', '$207.3$ cm', '$3.14$'],
            ['Dinner plate', '$26.0$ cm', '$81.7$ cm', '$3.14$'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The same number every time', md: 'For **every** circle, big or small, $C \\div d$ is the same number: a little more than $3$.' },
      ],
      lines: [
        { say: 'Some students measured round objects carefully. For each one, they divided the circumference by the diameter.', show: 't' },
        { say: 'A can lid has a diameter of eight centimetres and a circumference of twenty-five point one centimetres. Twenty-five point one divided by eight is about three point one four.', focus: 't.0' },
        { say: 'A bicycle wheel is much bigger. But its circumference divided by its diameter is also about three point one four.', focus: 't.1' },
        { say: 'And a dinner plate gives three point one four again. For every circle, big or small, the circumference divided by the diameter is the same number.', show: 'key', focus: 't.2' },
      ],
    },
    {
      chapter: 'Pi',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Pi', md: '**Pi** ($\\pi$) is the number you get when you divide the circumference of **any** circle by its diameter.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\pi = 3.14159\\ldots \\approx 3.14'] },
      ],
      lines: [
        { say: 'This special number has a name. It is called pi, and it is written with a Greek letter that looks like this.', show: 'def' },
        { say: 'Pi is three point one four one five nine, and its digits go on forever, without ever repeating.', show: 'm.0', focus: 'm.0' },
        { say: 'We cannot write all of its digits, so we use the pi key on a calculator. Or we round it to three point one four, when a question tells us to.' },
      ],
    },
    {
      chapter: 'The formulas',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['C = \\pi d', 'C = 2\\pi r'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Circumference', md: 'Multiply the **diameter** by $\\pi$. Or, if you know the **radius**, multiply $2$ by $\\pi$ by $r$.' },
      ],
      lines: [
        { say: 'The circumference is pi times the diameter. So we can write: C equals pi times d.', show: 'm.0', focus: 'm.0' },
        { say: 'The diameter is two times the radius. So the circumference is also two times pi times r.', show: 'm.1', focus: 'm.1' },
        { say: 'Use the first formula when you know the diameter, and the second one when you know the radius.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A circle has a diameter of $10$ cm. Use $3.14$ for $\\pi$. What is its circumference?',
          choices: ['$10$ cm', '$31.4$ cm', '$20$ cm', '$314$ cm'],
          answer: 1,
          working: '$C = \\pi d = 3.14 \\times 10 = 31.4$ cm: a little more than three diameters.',
        },
      ],
      lines: [
        { say: 'Your turn. A circle has a diameter of ten centimetres. Use three point one four for pi. What is its circumference? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, thirty-one point four centimetres. Pi times the diameter is three point one four times ten. Choice C is only two diameters, but it takes a little more than three diameters to go around.', show: 'q.answer' },
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
          items: ['The **circumference** is the distance around a circle.', 'For every circle, $C \\div d = \\pi \\approx 3.14$.', '$C = \\pi d$, or $C = 2\\pi r$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The circumference is the distance around a circle.', show: 'sum.0' },
        { say: 'For every circle, the circumference divided by the diameter is pi, about three point one four.', show: 'sum.1' },
        { say: 'So C equals pi times d, or two times pi times r. In the next part, you will use these formulas to find circumferences. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
