import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gasBox, tag } from './lib/c20-2a-figures.ts';

// The worked example: 6.0 L at 120 kPa, then the pressure doubles to 240 kPa.
const cylinder = figure(
  'c',
  [
    gasBox({ name: 'a', at: [0, 0], w: 3.6, h: 4.8, count: 7, r: 0.24, speed: 0, seed: 61, top: 'piston', walls: 5.8 }),
    tag('a-l', [1.8, -0.3], '\\begin{gathered}120\\ \\text{kPa}\\\\ 6.0\\ \\text{L}\\end{gathered}', { place: 'below', group: 'a-p' }),
    gasBox({ name: 'b', at: [5.4, 0], w: 3.6, h: 2.4, count: 7, r: 0.24, speed: 0, seed: 62, top: 'piston', walls: 5.8 }),
    tag('b-l', [7.2, -0.3], '\\begin{gathered}240\\ \\text{kPa}\\\\ V_2 = {?}\\end{gathered}', { place: 'below', group: 'b-p' }),
  ],
  440,
);

const video: Explainer = {
  id: 'c20-2-3-c',
  lessonId: 'c20-2-3',
  title: "Boyle's Law, Part 3: Finding a New Volume",
  thumbnailTitle: 'Finding a New Volume',
  thumbnail: 'c',
  summary:
    "To find a new volume with Boyle's law, write down what you know, check the units, rearrange P₁V₁ = P₂V₂ to V₂ = P₁V₁/P₂, calculate, and check the direction: a higher pressure must give a smaller volume. For example, 4.5 L at 150 kPa becomes 1.78 L at 380 kPa.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 3', title: 'Finding a New Volume', subtitle: 'Boyle’s law, step by step' }],
      lines: [
        { say: 'A syringe, a bicycle pump, a cylinder with a piston: whenever a gas is squeezed, or allowed to expand, at constant temperature, Boyle’s law predicts its new volume.', show: 'title' },
        { say: 'In this part, you will follow five steps to find the new volume of a gas when its pressure changes, and learn to spot an answer that goes the wrong way.' },
      ],
    },
    {
      chapter: 'Five steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Write down** $P_1$ and $V_1$, and the one quantity you know after the change.',
            '**Check the units:** both pressures in kPa, both volumes in L.',
            '**Rearrange** $P_1V_1 = P_2V_2$: $\\;V_2 = \\dfrac{P_1V_1}{P_2}$ or $P_2 = \\dfrac{P_1V_1}{V_2}$.',
            '**Substitute and calculate**, then round as the question asks.',
            '**Check the direction:** pressure up, volume down, and the other way round.',
          ],
        },
      ],
      lines: [
        { say: 'Follow these steps for any Boyle’s law problem. First, write down the pressure and volume before the change, and the one quantity you know after it.', show: 'b.0' },
        { say: 'Second, check the units. Both pressures must be in the same unit, and both volumes in the same unit. In these lessons, pressures are in kilopascals and volumes are in litres.', show: 'b.1' },
        { say: 'Third, rearrange P one V one equals P two V two for the unknown. V two is P one V one over P two, and P two is P one V one over V two.', caption: 'Third, rearrange P₁V₁ = P₂V₂ for the unknown. V₂ = P₁V₁/P₂, and P₂ = P₁V₁/V₂.', show: 'b.2' },
        { say: 'Fourth, substitute and calculate, then round as the question asks.', show: 'b.3' },
        { say: 'Fifth, check the direction. If the pressure went up, the volume must have gone down, and the other way round.', show: 'b.4' },
      ],
    },
    {
      chapter: 'Doubling the pressure',
      layout: 'split',
      leftWidth: 560,
      left: [cylinder],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A gas in a cylinder with a movable piston has a volume of $6.0\\ \\text{L}$ at $120\\ \\text{kPa}$. The pressure changes to $240\\ \\text{kPa}$ at the same temperature. Find the new volume, to the nearest hundredth.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V_2 = \\dfrac{P_1V_1}{P_2} = \\dfrac{120 \\times 6.0}{240}', '\\phantom{V_2} = 3.00\\ \\text{L}'] },
      ],
      lines: [
        { say: 'A gas in a cylinder with a movable piston has a volume of six point zero litres at one hundred twenty kilopascals. The pressure changes to two hundred forty kilopascals, while the temperature stays the same. What is the new volume, to the nearest hundredth?', show: ['q', 'c.a-box', 'c.a-piston', 'c.a-p', 'c.a-l'] },
        { say: 'First, predict. The pressure has doubled, so the volume should halve, to about three litres.', show: ['c.b-box', 'c.b-piston', 'c.b-p', 'c.b-l'] },
        { say: 'V two equals P one V one over P two: one hundred twenty times six point zero, over two hundred forty.', caption: 'V₂ = P₁V₁/P₂: 120 × 6.0, over 240.', show: 'm.0', focus: 'm.0' },
        { say: 'That is three point zero zero litres. The pressure went up, so the volume went down, just as predicted.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Any change in pressure',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A gas in a cylinder with a movable piston has a volume of $4.5\\ \\text{L}$ at $150\\ \\text{kPa}$. The pressure changes to $380\\ \\text{kPa}$ at the same temperature. What is the new volume, to the nearest hundredth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['V_2 = \\dfrac{P_1V_1}{P_2} = \\dfrac{150 \\times 4.5}{380} = 1.776\\ldots', 'V_2 = 1.78\\ \\text{L}'] },
      ],
      lines: [
        { say: 'When the pressure changes by an awkward factor, the formula does the work. A gas has a volume of four point five litres at one hundred fifty kilopascals. The pressure changes to three hundred eighty kilopascals, at the same temperature.', show: 'q' },
        { say: 'V two equals one hundred fifty times four point five, over three hundred eighty. That is one point seven seven six, and so on.', show: 'm.0', focus: 'm.0' },
        { say: 'To the nearest hundredth, the new volume is one point seven eight litres. The pressure went up, so the volume went down.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Pressures the wrong way up',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A gas has a volume of $2.5\\ \\text{L}$ at $250\\ \\text{kPa}$, and the pressure falls to $90\\ \\text{kPa}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{90 \\times 2.5}{250} = 0.90\\ \\text{L}}', '\\good{V_2 = \\dfrac{250 \\times 2.5}{90} = 6.94\\ \\text{L}}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. A gas has a volume of two point five litres at two hundred fifty kilopascals, and the pressure falls to ninety kilopascals.', show: 'q' },
        { say: 'Working out ninety times two point five, over two hundred fifty, gives zero point nine zero litres. That puts the pressures the wrong way up. The pressure went down, so the volume must go up.', show: 'm.0', focus: 'm.0' },
        { say: 'The correct answer is two hundred fifty times two point five, over ninety: six point nine four litres, to the nearest hundredth. That is larger, as it should be.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gas in a syringe sealed at the tip has a volume of $7.2\\ \\text{L}$ at $130\\ \\text{kPa}$. The pressure changes to $310\\ \\text{kPa}$ while the temperature stays the same. What is the new volume, to the nearest hundredth?',
          choices: ['$17.17\\ \\text{L}$', '$7.20\\ \\text{L}$', '$3.02\\ \\text{L}$', '$2.40\\ \\text{L}$'],
          answer: 2,
          working: '$V_2 = \\dfrac{P_1V_1}{P_2} = \\dfrac{130 \\times 7.2}{310} = 3.02\\ \\text{L}$. The pressure went up, so the volume went down.',
        },
      ],
      lines: [
        { say: 'Your turn. A gas in a syringe sealed at the tip has a volume of seven point two litres at one hundred thirty kilopascals. The pressure changes to three hundred ten kilopascals, at the same temperature. What is the new volume, to the nearest hundredth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, three point zero two litres: one hundred thirty times seven point two, over three hundred ten. Choice A puts the pressures the wrong way up. The pressure went up, so the volume cannot.', show: 'q.answer' },
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
          items: [
            'Write down what you know, and use the same units on both sides.',
            'Rearrange Boyle’s law: $V_2 = \\dfrac{P_1V_1}{P_2}$.',
            'Check the direction: a higher pressure gives a **smaller** volume.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Write down what you know, and use the same units on both sides.', show: 'sum.0' },
        { say: 'Rearrange Boyle’s law: V two equals P one V one over P two.', caption: 'Rearrange Boyle’s law: V₂ = P₁V₁/P₂.', show: 'sum.1' },
        { say: 'Then check the direction: a higher pressure must give a smaller volume. In part four, you will find a new pressure instead. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
