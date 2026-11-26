import type { Explainer } from '@/video/script.ts';
import { firstOrder } from './lib/cx-ap.ts';

// The sample follows the first-order law exactly (src/video/halflife.ts): half of the N₂O₅ that
// is left reacts in each half-life of 20 minutes, whatever amount is left.

const n2o5 = firstOrder('fo', {
  a: { phases: [{ dur: 11 }] },
  one: { phases: [{ dur: 1 }, { dur: 8, to: 20 }, { dur: 2 }] },
  two: { phases: [{ dur: 1 }, { dur: 7, to: 40 }, { dur: 2 }] },
  more: { phases: [{ dur: 1 }, { dur: 4, to: 60 }, { dur: 0.5 }, { dur: 4, to: 80 }, { dur: 2.5 }] },
});

const video: Explainer = {
  id: 'cx-22-1',
  lessonId: 'cx-22-1',
  title: 'Integrated Rate Laws and Half-Life',
  thumbnail: 'fo',
  summary:
    'The integrated rate laws link the concentration of a reactant to the time. For zero order [A] against t is a straight line, for first order ln[A] against t, and for second order 1/[A] against t, and the slope gives k. A first-order reaction loses half of what is left in each half-life, t½ = 0.693/k, however much there is.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'Integrated Rate Laws and Half-Life', subtitle: 'How much is left, and when' }],
      lines: [
        { say: 'A rate law tells you how fast a reaction goes at one moment. Often you want more: how much reactant will be left after ten minutes, or how long it takes for half of it to go.', show: 'title' },
        { say: 'In this lesson, you will use the integrated rate laws, find the order of a reaction from graphs, and use the half-life of a first-order reaction.' },
      ],
    },
    {
      chapter: 'A first-order reaction, up close',
      layout: 'center',
      main: [n2o5],
      lines: [
        { say: 'Here are four hundred molecules of dye-nitrogen pentoxide, which breaks down in a first-order reaction. In this example, its half-life is twenty minutes.', caption: 'Here are 400 molecules of dinitrogen pentoxide, N₂O₅, which breaks down in a first-order reaction. In this example, its half-life is 20 minutes.', show: ['fo', 'fo.names'], play: 'fo.a' },
        { say: 'Run the clock for twenty minutes. Molecules react one by one, at random, and the graph draws itself. After one half-life, half are left.', caption: 'Run the clock for 20 minutes. Molecules react one by one, at random, and the graph draws itself. After one half-life, half are left.', show: ['fo.graph', 'fo.left', 'fo.halves'], play: 'fo.one' },
        { say: 'In the next twenty minutes, half of what is left reacts. Now a quarter remain. Fewer molecules react, because there are fewer to react.', caption: 'In the next 20 minutes, half of what is left reacts. Now a quarter remain. Fewer molecules react, because there are fewer to react.', play: 'fo.two' },
        { say: 'And so on. Each half-life takes the same time, however much is left. That is the mark of a first-order reaction.', play: 'fo.more' },
      ],
    },
    {
      chapter: 'The integrated rate laws',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{zero order: } [\\text{A}]_t = [\\text{A}]_0 - kt', '\\text{first order: } \\ln[\\text{A}]_t = \\ln[\\text{A}]_0 - kt', '\\text{second order: } \\dfrac{1}{[\\text{A}]_t} = \\dfrac{1}{[\\text{A}]_0} + kt'] }],
      lines: [
        { say: 'Each order has its own integrated rate law. For zero order, the concentration falls by the same amount each second.', show: 'm.0', focus: 'm.0' },
        { say: 'For first order, the natural log of the concentration falls in a straight line.', show: 'm.1', focus: 'm.1' },
        { say: 'And for second order, one over the concentration rises in a straight line.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'How much is left?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ln[\\text{A}]_t = \\ln(0.500) - (0.0040)(200)', '= -0.693 - 0.800 = -1.493', '[\\text{A}]_t = e^{-1.493} = 0.225\\ \\text{mol/L}'] }],
      lines: [
        { say: 'A first-order reaction has k equal to zero point zero zero four zero per second, and starts at zero point five zero zero moles per litre. How much is left after two hundred seconds?', caption: 'A first-order reaction has k = 0.0040 s⁻¹, and starts at 0.500 mol/L. How much is left after 200 s?', show: 'm.0', focus: 'm.0' },
        { say: 'The log of zero point five is negative zero point six nine three, and k t is zero point eight, so the log of the concentration is negative one point four nine three.', caption: 'ln 0.500 is −0.693, and kt is 0.800, so ln[A] is −1.493.', show: 'm.1', focus: 'm.1' },
        { say: 'Raise e to that power, and zero point two two five moles per litre is left.', caption: 'Raise e to that power, and 0.225 mol/L is left.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Finding the order',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Plot $[\\text{A}]$, $\\ln[\\text{A}]$ and $1/[\\text{A}]$ against time', 'The straight one gives the order', 'Its slope gives $k$'] },
        { kind: 'callout', id: 'hl', tone: 'definition', title: 'First-order half-life', md: '$t_{1/2} = \\dfrac{0.693}{k}$, the same however much is left' },
      ],
      lines: [
        { say: 'To find the order from data, plot the concentration, its natural log, and one over it, each against time.', show: 'b.0' },
        { say: 'Only one of the three graphs is a straight line, and that tells you the order.', show: 'b.1' },
        { say: 'Its slope then gives the rate constant.', show: 'b.2' },
        { say: 'For a first-order reaction, the half-life is zero point six nine three over k, and as we saw, it does not depend on how much is left.', caption: 'For a first-order reaction, the half-life is 0.693 ÷ k, and as we saw, it does not depend on how much is left.', show: 'hl' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A first-order reaction has a half-life of 30 s. What fraction of the reactant is left after 90 s?',
          choices: ['One third', 'One half', 'One eighth', 'One sixth'],
          answer: 2,
          working: '90 s is three half-lives, so $\\left(\\tfrac{1}{2}\\right)^3 = \\tfrac{1}{8}$ is left.',
        },
      ],
      lines: [
        { say: 'Your turn. A first-order reaction has a half-life of thirty seconds. What fraction of the reactant is left after ninety seconds? Pause the video and try it.', caption: 'Your turn. A first-order reaction has a half-life of 30 s. What fraction of the reactant is left after 90 s? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, one eighth. Ninety seconds is three half-lives, and a half of a half of a half is one eighth.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Zero order: [A] against t is linear.', 'First order: ln[A] against t is linear.', 'Second order: 1/[A] against t is linear.', 'First-order half-life: t½ = 0.693 ÷ k, always the same.'] }],
      lines: [
        { say: 'Let’s sum up. For zero order, the concentration against time is a straight line.', show: 'sum.0' },
        { say: 'For first order, the natural log of the concentration is a straight line.', show: 'sum.1' },
        { say: 'For second order, one over the concentration is a straight line.', show: 'sum.2' },
        { say: 'And a first-order reaction has a constant half-life of zero point six nine three over k.', caption: 'And a first-order reaction has a constant half-life of 0.693 ÷ k.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
