import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ladder } from './lib/m31-7-figures.ts';

// A 10 m ladder, foot pulled out at 0.5 m/s: x² + y² = 100, so at x = 6, y = 8 and dy/dt = −0.375 m/s.
const wall = (id: string, labels: { x: string; y: string }) => figure(id, [ladder({ x: 6, y: 8, labels: { ...labels, l: '10\\text{ m}', pull: '0.5\\text{ m/s}', slide: '?' } })]);

const video: Explainer = {
  id: 'm31-7-2-b',
  lessonId: 'm31-7-2',
  title: 'Related Rates, Part 2: A Strategy and a Sliding Ladder',
  thumbnailTitle: 'A Sliding Ladder',
  thumbnail: 'lad',
  summary: 'A six-step strategy for related rates: draw and name, list the rates with their signs, write an equation true at any time, differentiate with respect to t, then substitute and solve. A 10 m ladder whose foot is pulled out at 0.5 m/s has its top sliding down at 0.375 m/s when the foot is 6 m from the wall; and why substituting x = 6 before differentiating gives the wrong answer, 0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Optimization and Related Rates · Part 2', title: 'A Sliding Ladder', subtitle: 'A strategy for related rates' }],
      lines: [
        { say: 'Pull the foot of a ladder away from a wall, and the top slides down. The ladder stays the same length, so the two ends must move in step. But how fast does the top move?', show: 'title' },
        { say: 'In this video, you will learn a six-step strategy for related rates problems, and the one mistake that ruins them.' },
      ],
    },
    {
      chapter: 'A strategy',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            'Draw a diagram. Name each quantity that changes with a variable; label constants with numbers.',
            'Write the given rates and the rate you want, with signs: a decreasing quantity has a **negative** rate.',
            'Write an equation that relates the variables at **any** time.',
            'Differentiate both sides with respect to $t$.',
            'Substitute the values at the given instant, and solve.',
            'Answer in words, with units.',
          ],
        },
      ],
      lines: [
        { say: 'Here is the strategy. First, draw a diagram. Give each quantity that changes a variable, and label the ones that stay the same with numbers.', show: 'steps.0' },
        { say: 'Second, write down the rates you are given and the rate you want, with their signs. A quantity that is decreasing has a negative rate.', show: 'steps.1' },
        { say: 'Third, write an equation that relates the variables at any time, not just at the moment in the question.', show: 'steps.2' },
        { say: 'Fourth, differentiate both sides with respect to t. Fifth, substitute the values at the given instant, and solve for the rate you want.', show: ['steps.3', 'steps.4'] },
        { say: 'And sixth, answer in words, with units.', show: 'steps.5' },
      ],
    },
    {
      chapter: 'A sliding ladder',
      layout: 'split',
      leftWidth: 560,
      left: [wall('lad', { x: 'x', y: 'y' })],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'A $10$ m ladder leans against a vertical wall. The foot is pulled away from the wall at $0.5$ m/s. How fast is the top sliding down when the foot is $6$ m from the wall?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{dx}{dt} = 0.5, \\qquad \\dfrac{dy}{dt} = \\; ?', 'x^2 + y^2 = 100'] },
      ],
      lines: [
        { say: 'A ten metre ladder leans against a vertical wall. The foot is pulled away from the wall at 0.5 metres per second. How fast is the top sliding down the wall when the foot is six metres from the wall?', show: ['lad.scene', 'lad.ladder', 'p'] },
        { say: 'Step one: the diagram. The distance from the wall to the foot changes, so call it x. The height of the top changes too, so call it y. The ladder stays ten metres long, so it gets a number.', show: ['lad.x', 'lad.y', 'lad.mark'], focus: ['lad.x', 'lad.y'] },
        { say: 'Step two: the rates. x is increasing at 0.5 metres per second, so d x by d t is positive 0.5. We want d y by d t.', show: ['lad.pull', 'lad.slide', 'm.0'], focus: ['lad.pull', 'm.0'] },
        { say: 'Step three: an equation that is true at any time. The wall, the ground and the ladder make a right triangle, so x squared plus y squared equals ten squared, which is 100.', show: 'm.1', focus: ['m.1', 'lad.ladder'] },
      ],
    },
    {
      chapter: 'Differentiate, then substitute',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['2x\\,\\dfrac{dx}{dt} + 2y\\,\\dfrac{dy}{dt} = 0', 'x = 6\\colon\\quad y = \\sqrt{100 - 36} = 8', '2(6)(0.5) + 2(8)\\,\\dfrac{dy}{dt} = 0', '6 + 16\\,\\dfrac{dy}{dt} = 0 \\;\\Rightarrow\\; \\dfrac{dy}{dt} = -\\dfrac{6}{16} = -0.375'],
        },
      ],
      lines: [
        { say: 'Step four: differentiate both sides with respect to t. x squared gives two x, d x by d t. y squared gives two y, d y by d t. And 100 is a constant, so its derivative is zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Step five: now, and only now, substitute the values at the instant in the question. When x is six, y is the square root of 100 minus 36, which is eight.', show: 'm.1', focus: 'm.1' },
        { say: 'Put in x equals six, d x by d t equals 0.5, and y equals eight. Two times six times 0.5 is six, and two times eight is sixteen.', show: 'm.2', focus: 'm.2' },
        { say: 'So six plus sixteen d y by d t equals zero, and d y by d t equals negative six sixteenths: negative 0.375.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Answer in words',
      layout: 'split',
      leftWidth: 560,
      left: [wall('lad2', { x: '6', y: '8' })],
      right: [{ kind: 'callout', id: 'ans', tone: 'key', title: 'Answer', md: 'The top slides down the wall at $0.375$ m/s. The negative sign of $\\dfrac{dy}{dt}$ says $y$ is decreasing.' }],
      lines: [
        { say: 'Step six: answer in words. The rate is negative because the height y is decreasing: the top is moving down.', show: ['lad2', 'ans'], focus: 'lad2.slide' },
        { say: 'So the top of the ladder slides down the wall at 0.375 metres per second. The question asked how fast it slides down, so the answer is given as a positive speed, with the word down.' },
        { say: 'Notice that the top moves slower than the foot here. When the foot is close to the wall, the top barely moves. As the foot gets farther out, the top slides faster and faster.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Substituting too early', md: 'Putting $x = 6$ into $x^2 + y^2 = 100$ **before** differentiating gives $36 + y^2 = 100$, an equation that says $y$ never changes.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['36 + y^2 = 100 \\;\\Rightarrow\\; 2y\\,\\dfrac{dy}{dt} = 0 \\;\\Rightarrow\\; \\bad{\\dfrac{dy}{dt} = 0}'] },
      ],
      lines: [
        { say: 'Here is the mistake to avoid: substituting too early. Suppose you put x equals six into the equation before differentiating. You get 36 plus y squared equals 100.', show: 'oops' },
        { say: 'Differentiate that, and the 36 is a constant, so you get two y, d y by d t, equals zero. The top would not move at all, which is wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'The trouble is that x equals six is true at only one instant. Before you differentiate, the equation must be true at every instant. So differentiate first, then substitute.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $13$ m ladder leans against a wall. Its foot slides away from the wall at $1$ m/s. How fast is the top sliding down when the foot is $5$ m from the wall?',
          choices: ['$2.4$ m/s', '$0$ m/s', '$\\dfrac{5}{12} \\approx 0.42$ m/s', '$1$ m/s'],
          answer: 2,
          working: '$x^2 + y^2 = 169$, so $2x\\dfrac{dx}{dt} + 2y\\dfrac{dy}{dt} = 0$. At $x = 5$, $y = 12$: $10 + 24\\dfrac{dy}{dt} = 0$, so $\\dfrac{dy}{dt} = -\\dfrac{5}{12}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A thirteen metre ladder leans against a wall. Its foot slides away from the wall at one metre per second. How fast is the top sliding down when the foot is five metres from the wall? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. x squared plus y squared equals 169. Differentiate: two x, d x by d t, plus two y, d y by d t, equals zero. When x is five, y is twelve. So ten plus 24 d y by d t equals zero, and d y by d t is negative five twelfths. The top slides down at about 0.42 metres per second.', show: 'q.answer' },
        { say: 'Choice B, zero, is what you get by putting x equals five into the equation before differentiating.' },
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
          items: ['Name the changing quantities, and write the rates with their signs.', 'Write an equation true at **any** time, then differentiate with respect to $t$.', 'Substitute the values at the instant only **after** differentiating.', 'Answer in words: “slides down at $0.375$ m/s”.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Name the quantities that change, and write the rates with their signs.', show: 'sum.0' },
        { say: 'Write an equation that is true at any time, then differentiate it with respect to t.', show: 'sum.1' },
        { say: 'Substitute the values at the given instant only after differentiating.', show: 'sum.2' },
        { say: 'And answer in words, with units. In the next part, similar triangles help with a lengthening shadow and a filling tank. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
