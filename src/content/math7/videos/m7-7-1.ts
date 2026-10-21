import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { disc } from './lib/m7-7-figures.ts';

// A circle of radius 4 cm, with five radii to show every point is 4 cm from the centre.
const many = (id: string) => figure(id, [disc({ r: 4, rays: [0, 65, 125, 235, 300], labels: { centre: '\\text{centre}' }, centrePlace: 'left' })], 440);

// The same circle with one radius (4 cm) and a diameter (8 cm).
const parts = (id: string) => figure(id, [disc({ r: 4, rAt: 60, dAt: 0, labels: { r: 'r = 4\\text{ cm}', d: 'd = 8\\text{ cm}' } })], 440);

// The circle (r = 4 cm, so d = 8 cm) and the saucer (d = 15 cm, so r = 7.5 cm).
const small = (id: string) => figure(id, [disc({ r: 4, rAt: 0, rSide: 'right', dAt: 90, dSide: 'left', labels: { r: 'r = 4', d: 'd = 8' } })], 440);
const saucer = (id: string) => figure(id, [disc({ r: 7.5, rAt: 0, rSide: 'right', dAt: 90, dSide: 'left', tone: 'good', labels: { d: 'd = 15', r: 'r = 7.5' } })], 440);

const video: Explainer = {
  id: 'm7-7-1',
  lessonId: 'm7-7-1',
  title: 'Radius, Diameter and Circumference, Part 1: Radius and Diameter',
  thumbnailTitle: 'Radius and Diameter',
  thumbnail: 'pt',
  summary:
    'Every point on a circle is the same distance from its centre. The radius (r) is the distance from the centre to the circle, and the diameter (d) is the distance across the circle through the centre, so a diameter is two radii: d = 2r and r = d ÷ 2. A circle with a radius of 4 cm has a diameter of 8 cm, and a saucer with a diameter of 15 cm has a radius of 7.5 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 1', title: 'Radius and Diameter', subtitle: 'From the centre, and all the way across' }],
      lines: [
        { say: 'Bicycle wheels, hula hoops, pizzas and the face of a clock are all circles.', show: 'title' },
        { say: 'In this video, you will learn the names of the parts of a circle: the centre, the radius and the diameter, and how the radius and the diameter are linked.' },
      ],
    },
    {
      chapter: 'The centre',
      layout: 'split',
      leftWidth: 560,
      left: [many('mc')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Centre', md: 'The **centre** is the point in the middle of a circle. Every point on the circle is the **same distance** from the centre.' }],
      lines: [
        { say: 'Here is a circle. The point in the middle is called the centre.', show: ['mc.shape', 'mc.centre'], focus: 'mc.centre' },
        { say: 'Every point on the circle is the same distance from the centre. Draw a line from the centre to any point on the circle, and it is always the same length.', show: ['def', 'mc.rays'], focus: 'mc.rays' },
        { say: 'That is what makes a circle round. If you tie a string to a post and walk around it, keeping the string tight, you walk in a circle.' },
      ],
    },
    {
      chapter: 'Radius and diameter',
      layout: 'split',
      leftWidth: 560,
      left: [parts('pt')],
      right: [
        { kind: 'callout', id: 'r', tone: 'definition', title: 'Radius', md: 'The **radius** ($r$) is the distance from the centre to the circle. The plural of radius is **radii**.' },
        { kind: 'callout', id: 'd', tone: 'definition', title: 'Diameter', md: 'The **diameter** ($d$) is the distance across the circle, **through the centre**.' },
      ],
      lines: [
        { say: 'A line from the centre to the circle is called a radius. Its length is also called the radius, and we write it with the letter r. Here, the radius is four centimetres.', show: ['pt.shape', 'pt.centre', 'pt.r', 'r'], focus: 'pt.r' },
        { say: 'When there is more than one radius, we call them radii. All the radii of a circle are the same length.' },
        { say: 'A line all the way across the circle, through the centre, is called a diameter. We write its length with the letter d. Here, the diameter is eight centimetres.', show: ['pt.d', 'd'], focus: 'pt.d' },
        { say: 'Make sure the line goes through the centre. A line across a circle that misses the centre is shorter, and it is not a diameter.' },
      ],
    },
    {
      chapter: 'Two radii make a diameter',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['d = 2r \\qquad r = d \\div 2'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'A diameter is two radii', md: 'Double the radius to get the diameter. Divide the diameter by $2$ to get the radius.' },
      ],
      lines: [
        { say: 'Look again at the diameter. It goes from the circle to the centre, and then from the centre to the circle on the other side. That is one radius, and then another radius.', show: 'key' },
        { say: 'So a diameter is made of two radii. The diameter is two times the radius: d equals two r.', show: 'm.0', focus: 'm.0' },
        { say: 'And the radius is half of the diameter: r equals d divided by two.' },
      ],
    },
    {
      chapter: 'From radius to diameter',
      layout: 'split',
      leftWidth: 560,
      left: [small('sm')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A circle has a radius of $4$ cm. What is its diameter?' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['d = 2r', 'd = 2 \\times 4', 'd = 8\\text{ cm}'] },
      ],
      lines: [
        { say: 'A circle has a radius of four centimetres. What is its diameter?', show: ['q', 'sm.shape', 'sm.centre', 'sm.r'], focus: 'sm.r' },
        { say: 'The diameter is two radii, so double the radius: d equals two r.', show: 'm.0', focus: 'm.0' },
        { say: 'Two times four is eight. The diameter is eight centimetres.', show: ['m.1', 'm.2', 'sm.d'], focus: ['sm.d', 'm.2'] },
      ],
    },
    {
      chapter: 'From diameter to radius',
      layout: 'split',
      leftWidth: 560,
      left: [saucer('sc')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A saucer has a diameter of $15$ cm. What is its radius?' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['r = d \\div 2', 'r = 15 \\div 2', 'r = 7.5\\text{ cm}'] },
      ],
      lines: [
        { say: 'A saucer has a diameter of fifteen centimetres. What is its radius?', show: ['q', 'sc.shape', 'sc.centre', 'sc.d'], focus: 'sc.d' },
        { say: 'The radius is half of the diameter, so divide by two: r equals d divided by two.', show: 'm.0', focus: 'm.0' },
        { say: 'Fifteen divided by two is seven point five. The radius is seven point five centimetres.', show: ['m.1', 'm.2', 'sc.r'], focus: ['sc.r', 'm.2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Radius or diameter?', md: 'Read carefully. If you are given the **diameter** and need the radius, **divide** by $2$. If you are given the **radius** and need the diameter, **multiply** by $2$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['d = 10\\text{ cm} \\;\\to\\; r = 10 \\times 2 = \\bad{20\\text{ cm}} \\quad \\text{wrong}', 'd = 10\\text{ cm} \\;\\to\\; r = 10 \\div 2 = \\good{5\\text{ cm}} \\quad \\text{right}'] },
      ],
      lines: [
        { say: 'The most common mistake with circles is mixing up the radius and the diameter.', show: 'oops' },
        { say: 'Suppose a circle has a diameter of ten centimetres. Some people double the ten, and say the radius is twenty centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'But the radius is the shorter one. It only goes from the centre to the circle, so it is half of the diameter: five centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'A quick check: the radius is always shorter than the diameter. If your radius comes out longer, you went the wrong way.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pizza has a diameter of $30$ cm. What is its radius?',
          choices: ['$60$ cm', '$30$ cm', '$7.5$ cm', '$15$ cm'],
          answer: 3,
          working: 'The radius is half of the diameter: $r = 30 \\div 2 = 15$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A pizza has a diameter of thirty centimetres. What is its radius? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, fifteen centimetres. The radius is half of the diameter, and thirty divided by two is fifteen. Choice A doubles the diameter, so it is longer than the pizza is wide.', show: 'q.answer' },
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
          items: ['Every point on a circle is the same distance from the **centre**.', 'The **radius** goes from the centre to the circle. The **diameter** goes across, through the centre.', '$d = 2r$ and $r = d \\div 2$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Every point on a circle is the same distance from its centre.', show: 'sum.0' },
        { say: 'The radius goes from the centre to the circle. The diameter goes all the way across, through the centre.', show: 'sum.1' },
        { say: 'A diameter is two radii: d equals two r, and r equals d divided by two. In the next part, you will look at the angles at the centre of a circle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
