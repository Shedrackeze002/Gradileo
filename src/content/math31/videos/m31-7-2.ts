import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ripple } from './lib/m31-7-figures.ts';

// A circular ripple: A = πr², so dA/dt = 2πr dr/dt = 2π(50)(30) = 3,000π cm²/s.
const pond = (id: string, dr?: boolean) => figure(id, [ripple({ r: 3, dr: 0.5, labels: { r: 'r', A: 'A', ...(dr ? { dr: '\\Delta r', around: '2\\pi r' } : {}) } })]);

const video: Explainer = {
  id: 'm31-7-2',
  lessonId: 'm31-7-2',
  title: 'Related Rates, Part 1: Rates Linked by an Equation',
  thumbnailTitle: 'A Spreading Ripple',
  thumbnail: 'rp',
  summary: 'When quantities are linked by an equation and each changes with time t, differentiating the equation with respect to t links their rates: d/dt(r²) = 2r dr/dt. A ripple whose radius grows at 30 cm/s has dA/dt = 2πr dr/dt = 3,000π ≈ 9,425 cm²/s when r = 50 cm, and the thin ring it adds shows why the 2πr is there.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Optimization and Related Rates · Part 1', title: 'Related Rates', subtitle: 'Rates linked by an equation' }],
      lines: [
        { say: 'When you blow up a balloon, its radius and its volume both grow, but not at the same rate. They are linked by an equation: the volume is four thirds pi r cubed.', show: 'title' },
        { say: 'If you know how fast one of them is changing, the chain rule tells you how fast the other is changing. Problems like this are called related rates problems.' },
        { say: 'In this video, you will learn how to differentiate an equation with respect to time, and use it to find how fast the area inside a ripple grows.' },
      ],
    },
    {
      chapter: 'Everything depends on time',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Every quantity that changes is a function of time $t$. Differentiate with respect to $t$, using the chain rule:' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{d}{dt}\\left(r^2\\right) = 2r\\,\\dfrac{dr}{dt}', '\\dfrac{d}{dt}\\left(x^2 + y^2\\right) = 2x\\,\\dfrac{dx}{dt} + 2y\\,\\dfrac{dy}{dt}'] },
      ],
      lines: [
        { say: 'In a related rates problem, every quantity that changes is a function of time, t. A radius r is really r of t, and its rate of change is d r by d t.', show: 'p' },
        { say: 'So what is the derivative of r squared with respect to t? It is not just two r. r squared is a function of r, and r is a function of t, so the chain rule applies: the derivative is two r, times d r by d t.', show: 'm.0', focus: 'm.0' },
        { say: 'This is implicit differentiation, with t as the variable. For x squared plus y squared, each term gets its own rate: two x times d x by d t, plus two y times d y by d t.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Related rates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Related rates', md: 'Two or more rates of change, such as $\\dfrac{dr}{dt}$ and $\\dfrac{dA}{dt}$, that are connected because the quantities themselves are connected by an equation.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['A = \\pi r^2 \\quad\\longrightarrow\\quad \\dfrac{dA}{dt} = 2\\pi r\\,\\dfrac{dr}{dt}'] },
      ],
      lines: [
        { say: 'Related rates are two or more rates of change that are connected, because the quantities themselves are connected by an equation.', show: 'def' },
        { say: 'For a circle, the area is pi r squared. Differentiate both sides with respect to t: d "A" by d t equals two pi r, times d r by d t. The equation for the quantities becomes an equation for their rates.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A spreading ripple',
      layout: 'split',
      left: [pond('rp')],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'A pebble dropped into a still pond makes a circular ripple whose radius grows at $30$ cm/s. How fast is the area inside it growing when the radius is $50$ cm?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{dA}{dt} = 2\\pi r\\,\\dfrac{dr}{dt}', '= 2\\pi(50)(30) = 3{,}000\\pi', '\\approx 9{,}425\\text{ cm}^2/\\text{s}'] },
      ],
      lines: [
        { say: 'A pebble dropped into a still pond makes a circular ripple. Its radius grows at 30 centimetres per second. How fast is the area inside the ripple growing when the radius is 50 centimetres?', show: ['rp.disc', 'rp.edge', 'rp.r', 'rp.A', 'rp.O', 'p'] },
        { say: 'The quantities are the radius, r, and the area inside, "A". We know d r by d t is 30, and we want d "A" by d t at the instant when r is 50.', focus: ['rp.r', 'rp.A'] },
        { say: 'The equation that links them is "A" equals pi r squared. Differentiating with respect to t gives d "A" by d t equals two pi r, times d r by d t.', show: 'm.0', focus: 'm.0' },
        { say: 'Now substitute the values at that instant: two pi, times 50, times 30. That is 3,000 pi.', show: 'm.1', focus: 'm.1' },
        { say: 'So the area is growing at 3,000 pi square centimetres per second: about 9,425 square centimetres every second.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Why two pi r?',
      layout: 'split',
      left: [pond('rq', true)],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\Delta A \\approx 2\\pi r \\cdot \\Delta r', '\\dfrac{\\Delta A}{\\Delta t} \\approx 2\\pi r \\cdot \\dfrac{\\Delta r}{\\Delta t}'] },
        { kind: 'text', id: 't', size: 'md', align: 'left', md: 'A bigger ripple adds a longer ring, so its area grows **faster**, even though its radius grows at a steady rate.' },
      ],
      lines: [
        { say: 'Here is a picture of why the rate is two pi r times d r by d t. In a short time, the radius grows by a small amount, delta r.', show: ['rq.disc', 'rq.edge', 'rq.r', 'rq.A', 'rq.O'] },
        { say: 'The new area is the thin green ring around the edge. Unrolled, the ring is about as long as the circumference, two pi r, and delta r thick. So its area is about two pi r times delta r.', show: 'rq.grow', focus: 'rq.grow' },
        { say: 'Divide by the time it took, delta t. The area grows at about two pi r times the rate of the radius. As the time gets shorter, this becomes exact.', show: 'm', focus: 'm' },
        { say: 'Notice what this means. The radius grows at a steady 30 centimetres per second, but the area grows faster and faster, because a bigger ripple adds a longer ring each second.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The radius of a circular oil spill grows at $2$ m/min. How fast is its area growing when the radius is $40$ m?',
          choices: ['$80\\pi$ m²/min', '$160\\pi$ m²/min', '$1{,}600\\pi$ m²/min', '$4\\pi$ m²/min'],
          answer: 1,
          working: '$\\dfrac{dA}{dt} = 2\\pi r\\,\\dfrac{dr}{dt} = 2\\pi(40)(2) = 160\\pi \\approx 503$ m²/min.',
        },
      ],
      lines: [
        { say: 'Your turn. The radius of a circular oil spill grows at two metres per minute. How fast is its area growing when the radius is 40 metres? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. d "A" by d t equals two pi r times d r by d t, which is two pi, times 40, times two: 160 pi, or about 503 square metres per minute.', show: 'q.answer' },
        { say: 'Choice C, 1,600 pi, is pi times 40 squared. That is the area itself at that moment, not how fast it is growing.' },
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
          items: ['Every changing quantity is a function of time $t$.', 'Differentiate the equation that links the quantities with respect to $t$, using the chain rule.', 'Then substitute the values at the given instant.', 'For a circle, $\\dfrac{dA}{dt} = 2\\pi r\\,\\dfrac{dr}{dt}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a related rates problem, every changing quantity is a function of time.', show: 'sum.0' },
        { say: 'Differentiate the equation that links the quantities with respect to t, using the chain rule.', show: 'sum.1' },
        { say: 'Then substitute the values at the given instant.', show: 'sum.2' },
        { say: 'For a circle, d "A" by d t equals two pi r times d r by d t. In the next part, we follow a step-by-step strategy, and watch a ladder slide down a wall. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
