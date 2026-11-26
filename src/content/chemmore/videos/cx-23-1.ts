import type { Explainer } from '@/video/script.ts';
import { n2o4BothWays, n2o4Stress } from '../../chem30/videos/lib/c30-particles.ts';

const video: Explainer = {
  id: 'cx-23-1',
  lessonId: 'cx-23-1',
  title: 'The Reaction Quotient and the Properties of K',
  thumbnail: false,
  summary:
    'The reaction quotient Q has the same form as K but uses the concentrations at any moment. When Q is less than K the reaction goes forward, when Q is greater it goes backward, and when they are equal the system is at equilibrium; a change of conditions moves Q away from K and the system shifts to bring it back. Reversing a reaction gives 1/K, multiplying it by n gives Kⁿ, and adding reactions multiplies their constants.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'The Reaction Quotient and the Properties of K', subtitle: 'Which way will it go?' }],
      lines: [
        { say: 'The equilibrium constant tells you the balance a reaction will settle at. It does not tell you, on its own, which way a mixture you have just made will go.', show: 'title' },
        { say: 'In this lesson, you will use the reaction quotient to predict the direction of a reaction, and work out K for reactions that are reversed, multiplied or added.' },
      ],
    },
    {
      chapter: 'From either side, up close',
      layout: 'center',
      main: [n2o4BothWays('bw', { seed: 12 })],
      lines: [
        { say: 'Here are two tubes at the same temperature. The left starts as dye-nitrogen tetroxide only, and the right as nitrogen dioxide only.', caption: 'Here are two tubes at the same temperature. The left starts as dinitrogen tetroxide, N₂O₄, only, and the right as nitrogen dioxide, NO₂, only.', show: ['bw', 'bw.labels', 'bw.key', 'bw.tally'], play: 'bw.go' },
        { say: 'On the left there are too few products, so the reaction runs forward. On the right there are too many, so it runs backward. Both settle at the same mixture, the one that K describes.', focus: 'bw.tally' },
      ],
    },
    {
      chapter: 'The reaction quotient',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['Q_c = \\dfrac{[\\text{C}]^c[\\text{D}]^d}{[\\text{A}]^a[\\text{B}]^b}'] },
        { kind: 'bullets', id: 'b', items: ['$Q < K$: forward, making more products', '$Q > K$: backward, making more reactants', '$Q = K$: at equilibrium'] },
      ],
      lines: [
        { say: 'The reaction quotient, Q, has the same form as K, but uses the concentrations at any moment, whether or not the system is at equilibrium.', show: 'm' },
        { say: 'If Q is less than K, there are too few products, so the reaction goes forward.', show: 'b.0' },
        { say: 'If Q is greater than K, there are too many, so it goes backward.', show: 'b.1' },
        { say: 'And if Q equals K, the system is at equilibrium.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Which way will it go?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{H2 + I2 <=> 2HI},\\quad K_c = 50', 'Q_c = \\dfrac{(1.0)^2}{(0.10)(0.10)} = 100', 'Q_c > K_c \\;\\to\\; \\text{backward}'] }],
      lines: [
        { say: 'For hydrogen and iodine making hydrogen iodide, K c is fifty. A mixture has zero point one moles per litre of each reactant, and one point zero of hydrogen iodide.', caption: 'For H₂ + I₂ ⇌ 2HI, Kc = 50. A mixture has 0.10 mol/L of each reactant, and 1.0 mol/L of HI.', show: 'm.0', focus: 'm.0' },
        { say: 'One squared, over zero point one times zero point one, gives a Q of one hundred.', caption: '1.0² ÷ (0.10 × 0.10) gives Qc = 100.', show: 'm.1', focus: 'm.1' },
        { say: 'Q is greater than K, so the reaction goes backward, making more hydrogen and iodine.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Disturbing an equilibrium, up close',
      layout: 'center',
      main: [n2o4Stress('sr', 'more-n2o4', { seed: 15 })],
      lines: [
        { say: 'Here is a tube at equilibrium. Now more dye-nitrogen tetroxide is added. That makes the bottom of Q bigger, so Q falls below K.', caption: 'Here is a tube at equilibrium. Now more N₂O₄ is added. That makes the bottom of Q bigger, so Q falls below K.', show: ['sr', 'sr.labels', 'sr.key', 'sr.tally'], play: 'sr.stress' },
        { say: 'So the reaction runs forward, and the count of nitrogen dioxide climbs until Q is back up to K. That is Le Chatelier’s principle, explained with Q.', caption: 'So the reaction runs forward, and the count of NO₂ climbs until Q is back up to K. That is Le Chatelier’s principle, explained with Q.', focus: 'sr.tally' },
      ],
    },
    {
      chapter: 'The properties of K',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Reverse the reaction: $1/K$', 'Multiply the coefficients by $n$: $K^n$', 'Add two reactions: $K_1 \\times K_2$'] }],
      lines: [
        { say: 'When you change the equation, its equilibrium constant changes in a fixed way. Reverse the reaction, and the new constant is one over K.', show: 'b.0' },
        { say: 'Multiply every coefficient by n, and the new constant is K to the power n.', show: 'b.1' },
        { say: 'And add two reactions, and the new constant is the product of their constants.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $\\ce{A <=> B}$, $K = 4.0$. What is $K$ for $\\ce{2B <=> 2A}$?',
          choices: ['$0.0625$', '$0.25$', '$16$', '$0.50$'],
          answer: 0,
          working: 'Reverse it ($1/4.0 = 0.25$), then double it ($0.25^2 = 0.0625$).',
        },
      ],
      lines: [
        { say: 'Your turn. For A going to B, K is four. What is K for two B going to two A? Pause the video and try it.', caption: 'Your turn. For A ⇌ B, K = 4.0. What is K for 2B ⇌ 2A? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is choice A, zero point zero six two five. Reversing gives one quarter, and doubling the coefficients squares it, giving one sixteenth.', caption: 'The answer is choice A, 0.0625. Reversing gives 1/4, and doubling the coefficients squares it, giving 1/16.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Q has the same form as K, at any moment.', 'Q < K: forward. Q > K: backward. Q = K: equilibrium.', 'A change moves Q, and the system shifts to bring it back to K.', 'Reverse: 1/K. Multiply by n: Kⁿ. Add: K₁K₂.'] }],
      lines: [
        { say: 'Let’s sum up. Q has the same form as K, but uses the concentrations at any moment.', show: 'sum.0' },
        { say: 'If Q is less than K the reaction goes forward, if it is greater it goes backward, and if they are equal it is at equilibrium.', show: 'sum.1' },
        { say: 'A change of conditions moves Q, and the system shifts to bring it back to K.', show: 'sum.2' },
        { say: 'And reversing a reaction gives one over K, multiplying by n gives K to the n, and adding reactions multiplies their constants.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
