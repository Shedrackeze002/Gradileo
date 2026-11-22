import type { Explainer } from '@/video/script.ts';
import { cone, figure } from '@/video/solids.ts';

// Exam question for Math 10 lesson 1.8 (spheres, composite objects and unknown dimensions): the
// volume of a street light post shaped like a large cone with a smaller cone cut off its top. The
// question is OpenStax Prealgebra 2e's own exercise, word for word (section 9.6, CC BY-NC-SA 4.0),
// with the book's answers 31.4, 2.6 and 28.8 cubic feet (π ≈ 3.14).

/** The post: a cone 30 ft tall with base radius 1 ft, and the 10 ft top cone that is taken away (drawn five times as wide, to fit its labels). */
const post = (height = 380) =>
  figure(
    'post',
    [
      cone({ name: 'big', r: 5, h: 30, rim: 'full', labels: { r: '1\\text{ ft}', h: '30\\text{ ft}' } }),
      cone({ name: 'top', at: [0, 20], r: 2.5, h: 10, rim: 'full' }),
    ],
    height,
  );

const QUESTION =
  'The post of a street light is shaped like a truncated cone, as shown in the picture below. It is a large cone minus a smaller top cone. The large cone is 30 feet tall with base radius 1 foot. The smaller cone is 10 feet tall with base radius of 0.5 feet. To the nearest tenth,\n(a) find the volume of the large cone.\n(b) find the volume of the small cone.\n(c) find the volume of the post by subtracting the volume of the small cone from the volume of the large cone.';

const video: Explainer = {
  id: 'xq-m10c-1-8',
  lessonId: '',
  exam: {
    lesson: 'm10c-1-8',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.6, Solve Geometry Applications: Volume and Surface Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-6-solve-geometry-applications-volume-and-surface-area',
    question: QUESTION,
  },
  title: 'Exam Question: The Volume of a Street Light Post, a Cone With Its Top Cut Off',
  thumbnailTitle: 'A Street Light Post',
  thumbnail: 'post',
  summary:
    'A real test question, solved one small step at a time: a street light post is a tall cone with a smaller cone cut off its top, and we find how much material it holds. We find the volume of each cone with ⅓πr²h and 3.14 for π, then take the small one away from the big one. Then we look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Street Light Post', subtitle: 'The volume of a composite object, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the volume of a street light post. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: QUESTION.replace(/\n/g, '<br>'),
          answer: '(a) 31.4 ft³; (b) 2.6 ft³; (c) 28.8 ft³',
          working: '$\\tfrac{1}{3}(3.14)(1)^2(30) = 31.4$ and $\\tfrac{1}{3}(3.14)(0.5)^2(10) \\approx 2.6$, so the post is about $28.8$ ft³.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The post of a street light is shaped like a truncated cone: a large cone minus a smaller top cone. The large cone is 30 feet tall with a base radius of 1 foot. The smaller cone is 10 feet tall with a base radius of 0.5 feet.' },
        { say: 'To the nearest tenth, find the volume of the large cone, the volume of the small cone, and then the volume of the post, by taking the small cone away from the large one. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [post()],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'The **top cone**, 10 ft tall with radius 0.5 ft, is cut off the **big cone**.' },
        { kind: 'text', id: 'v', size: 'md', md: 'Post $=$ big cone $-$ top cone' },
      ],
      lines: [
        { say: 'Let us picture it. Here is a tall cone, 30 feet high, with a base radius of 1 foot. It is drawn wider than it really is, so the labels fit.', show: 'post' },
        { say: 'The top 10 feet of it is a smaller cone with a base radius of 0.5 feet. Cut that off, and what is left is the post.', show: 't' },
        { say: 'So the volume of the post is the big cone, take away the top cone.', show: 'v' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['V_{\\text{cone}} = \\tfrac{1}{3}\\pi r^2 h'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'A composite object', md: 'Split it into shapes you know. **Add** the parts that are there; **subtract** the parts that are missing. The textbook uses $\\pi \\approx 3.14$.' },
      ],
      lines: [
        { say: 'Here is what we need. The volume of a cone is one third pi r squared h.', show: 'f' },
        { say: 'An object made of simpler shapes is called a composite object. Split it into shapes you know. Add the parts that are there, and take away the parts that are missing. The textbook uses 3.14 for pi.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) The **big** cone: $r = 1$, $h = 30$', '(b) The **top** cone: $r = 0.5$, $h = 10$', '(c) Big cone **minus** top cone'] }],
      lines: [
        { say: 'Here is the plan. First, the volume of the big cone.', show: 'plan.0' },
        { say: 'Second, the volume of the small top cone.', show: 'plan.1' },
        { say: 'Third, take the small one away from the big one.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The big cone',
      layout: 'split',
      left: [post(340)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{1}{3} \\times 3.14 \\times 1^2 \\times 30', '= 3.14 \\times 10', '= \\good{31.4\\text{ ft}^3}'] }],
      lines: [
        { say: 'Step one. The big cone has a radius of 1 and a height of 30. One third, times 3.14, times 1 squared, times 30.', show: ['post', 'm.0'] },
        { say: '1 squared is 1, and one third of 30 is 10, so this is 3.14 times 10.', show: 'm.1' },
        { say: 'The big cone is 31.4 cubic feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The top cone',
      layout: 'split',
      left: [post(340)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{1}{3} \\times 3.14 \\times 0.5^2 \\times 10', '= \\tfrac{1}{3} \\times 3.14 \\times 0.25 \\times 10', '= 7.85 \\div 3 \\approx \\good{2.6\\text{ ft}^3}'] }],
      lines: [
        { say: 'Step two. The top cone has a radius of 0.5 and a height of 10.', show: ['post', 'm.0'] },
        { say: '0.5 squared is 0.25. Then 3.14 times 0.25 is 0.785, and times 10 is 7.85.', show: 'm.1' },
        { say: 'One third of 7.85 is about 2.62, which is 2.6 cubic feet to the nearest tenth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Take it away',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['31.4 - 2.6 = \\good{28.8\\text{ ft}^3}'] }],
      lines: [
        { say: 'Step three. The post is the big cone, take away the top cone: 31.4 minus 2.6 is 28.8 cubic feet.', show: 'm.0', focus: 'm.0' },
        { say: 'With the unrounded 2.62, we get 28.78, which still rounds to 28.8.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{top cone: } \\tfrac{1}{3}\\text{ of the height}, \\tfrac{1}{2}\\text{ of the radius}', '\\tfrac{1}{3} \\times \\left(\\tfrac{1}{2}\\right)^2 = \\tfrac{1}{12}', '31.4 \\div 12 \\approx 2.6 \\ \\checkmark'] }],
      lines: [
        { say: 'Here is a neat check. The top cone has one third of the height and half the radius of the big cone.', show: 'm.0' },
        { say: 'The radius is squared, so its volume is one third times one quarter, one twelfth, of the big cone.', show: 'm.1' },
        { say: '31.4 divided by 12 is about 2.6. It matches.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Answer it gives'],
          rows: [
            ['Adding the cones instead of subtracting', '$34.0$ ft³'],
            ['Forgetting the $\\tfrac{1}{3}$', '$94.2 - 7.85 \\approx 86.4$ ft³'],
            ['Using $0.5$ instead of $0.5^2 = 0.25$', '$5.2$ ft³ for the top cone'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The top cone is missing from the post, so take it away. Adding it gives 34.0.' },
        { say: 'Forgetting the one third gives the volumes of cylinders, not cones.' },
        { say: 'And square the radius: 0.5 squared is 0.25, not 0.5.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cone is 12 cm tall with a base radius of 3 cm. The top 4 cm, a cone with base radius 1 cm, is cut off. Using 3.14 for π, what is the volume of the part that is left?',
          choices: ['113.04 cm³', '108.85 cm³', '117.23 cm³', '4.19 cm³'],
          answer: 1,
          working: '$\\tfrac{1}{3}(3.14)(3)^2(12) = 113.04$ and $\\tfrac{1}{3}(3.14)(1)^2(4) \\approx 4.19$, so $113.04 - 4.19 = 108.85$ cm³.',
        },
      ],
      lines: [
        { say: 'Your turn. A cone is 12 centimetres tall with a base radius of 3 centimetres. The top 4 centimetres, a cone with a base radius of 1 centimetre, is cut off. Using 3.14 for pi, what is the volume of the part that is left? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The big cone is 113.04 and the top cone is about 4.19. Taking it away leaves 108.85 cubic centimetres. That is choice B. 113.04 forgot to cut off the top, and 117.23 added it.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Split a composite object into shapes you know', '**Add** what is there, **subtract** what is missing', 'Cone: $V = \\tfrac{1}{3}\\pi r^2 h$', 'Round at the end'] }],
      lines: [
        { say: 'Here is what to remember. Split a composite object into shapes you know.', show: 'sum.0' },
        { say: 'Add the parts that are there, and take away the parts that are missing.', show: 'sum.1' },
        { say: 'The volume of each cone is one third pi r squared h.', show: 'sum.2' },
        { say: 'And round at the end. For more on composite objects, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
