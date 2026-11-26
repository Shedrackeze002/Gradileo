import type { Explainer } from '@/video/script.ts';
import { bufferUsedUp, bufferVsWater } from '../../chem30/videos/lib/c30-particles.ts';

const video: Explainer = {
  id: 'cx-23-3',
  lessonId: 'cx-23-3',
  title: 'The Henderson–Hasselbalch Equation and Buffer Capacity',
  thumbnail: false,
  summary:
    'A buffer is a weak acid with its conjugate base, and its pH is pKa + log([A⁻]/[HA]), so the pH equals the pKa when the two are equal. Added base turns HA into A⁻ and added acid turns A⁻ into HA: work in moles, then use the ratio. A buffer with more of both components has a greater capacity, and it resists best the addition that uses up the component it has more of.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'The Henderson–Hasselbalch Equation and Buffer Capacity', subtitle: 'How buffers hold their pH' }],
      lines: [
        { say: 'Your blood stays close to p H seven point four, even as your muscles pour acid into it during exercise. It can do this because it is a buffer.', caption: 'Your blood stays close to pH 7.4, even as your muscles pour acid into it during exercise. It can do this because it is a buffer.', show: 'title' },
        { say: 'In this lesson, you will use the Henderson Hasselbalch equation, and compare the capacities of buffers.', caption: 'In this lesson, you will use the Henderson–Hasselbalch equation, and compare the capacities of buffers.' },
      ],
    },
    {
      chapter: 'A buffer at work, up close',
      layout: 'center',
      main: [bufferVsWater('bw', { seed: 2 })],
      lines: [
        { say: 'Sodium hydroxide drips into pure water on the left, and into an acetic acid and acetate buffer on the right. Watch the count of hydroxide ions in each box.', show: ['bw', 'bw.labels', 'bw.key', 'bw.tally'], play: 'bw.drip' },
        { say: 'In the water, the hydroxide ions simply build up, and the p H shoots up. In the buffer, each one takes a proton from an acetic acid molecule, making water and one more acetate ion, so the p H hardly moves.', caption: 'In the water, the hydroxide ions simply build up, and the pH shoots up. In the buffer, each one takes a proton from an acetic acid molecule, making water and one more acetate ion, so the pH hardly moves.', focus: 'bw.tally' },
      ],
    },
    {
      chapter: 'The Henderson–Hasselbalch equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\text{A}^-]}{[\\text{HA}]}', '\\text{pH} = 4.76 + \\log\\dfrac{0.30}{0.20}', '\\text{pH} = 4.76 + 0.18 = 4.94'] }],
      lines: [
        { say: 'A buffer’s p H is its p K a, plus the log of the conjugate base over the acid. When the two are equal, the log is zero, and the p H equals the p K a.', caption: 'A buffer’s pH is its pKa, plus the log of [A⁻] over [HA]. When the two are equal, the log is zero, and the pH equals the pKa.', show: 'm.0', focus: 'm.0' },
        { say: 'A buffer is zero point two zero moles per litre acetic acid and zero point three zero acetate, with a p K a of four point seven six.', caption: 'A buffer is 0.20 mol/L acetic acid and 0.30 mol/L acetate, with a pKa of 4.76.', show: 'm.1', focus: 'm.1' },
        { say: 'The log of one point five is zero point one eight, so the p H is four point nine four.', caption: 'The log of 1.5 is 0.18, so the pH is 4.94.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Adding base',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['0.250\\ \\text{mol HA} + 0.120\\ \\text{mol A}^-,\\ \\text{add } 0.020\\ \\text{mol OH}^-', '\\text{HA} = 0.230,\\quad \\text{A}^- = 0.140', '\\text{pH} = 4.76 + \\log\\dfrac{0.140}{0.230} = 4.54'] }],
      lines: [
        { say: 'Now add zero point zero two zero moles of sodium hydroxide to a buffer with zero point two five zero moles of acid and zero point one two zero of its conjugate base.', caption: 'Now add 0.020 mol of NaOH to a buffer with 0.250 mol of acid and 0.120 mol of its conjugate base.', show: 'm.0', focus: 'm.0' },
        { say: 'Work in moles. The hydroxide turns acid into conjugate base, so the acid falls to zero point two three zero and the base rises to zero point one four zero.', caption: 'Work in moles. The hydroxide turns acid into conjugate base, so the acid falls to 0.230 mol and the base rises to 0.140 mol.', show: 'm.1', focus: 'm.1' },
        { say: 'Both are in the same volume, so use the ratio of moles. The p H is four point five four.', caption: 'Both are in the same volume, so use the ratio of moles. The pH is 4.54.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Using up a buffer, up close',
      layout: 'center',
      main: [bufferUsedUp('bu', { seed: 3 })],
      lines: [
        { say: 'A buffer can only take so much. Here is a small buffer with only six acetic acid molecules, and nine drops of sodium hydroxide. Keep watching the count as the acid molecules run out.', show: ['bu', 'bu.labels', 'bu.key', 'bu.tally'], play: 'bu.drip' },
        { say: 'Once the six acid molecules have reacted, nothing is left to take the next hydroxide ions, so they build up. The buffer has reached its capacity, and from here the p H rises sharply.', caption: 'Once the six acid molecules have reacted, nothing is left to take the next hydroxide ions, so they build up. The buffer has reached its capacity, and from here the pH rises sharply.', focus: 'bu.tally' },
      ],
    },
    {
      chapter: 'Buffer capacity',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['More of both components: a greater capacity', 'More A⁻ than HA: resists added acid best', 'More HA than A⁻: resists added base best'] }],
      lines: [
        { say: 'Buffer capacity is the amount of strong acid or base a buffer can take before its p H changes a lot. A buffer with more of both components has a greater capacity, even if its p H is the same.', caption: 'Buffer capacity is the amount of strong acid or base a buffer can take before its pH changes a lot. A buffer with more of both components has a greater capacity, even if its pH is the same.', show: 'b.0' },
        { say: 'A buffer with more conjugate base than acid can take more added acid.', show: 'b.1' },
        { say: 'And one with more acid than conjugate base can take more added base.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A buffer has $[\\text{A}^-] = [\\text{HA}]$ and $\\text{p}K_a = 9.25$. What is its pH?',
          choices: ['4.75', '7.00', '0', '9.25'],
          answer: 3,
          working: 'The ratio is 1 and $\\log 1 = 0$, so pH = pKa = 9.25.',
        },
      ],
      lines: [
        { say: 'Your turn. A buffer has equal amounts of a weak acid and its conjugate base, and the p K a is nine point two five. What is its p H? Pause the video and try it.', caption: 'Your turn. A buffer has equal amounts of a weak acid and its conjugate base, and the pKa is 9.25. What is its pH? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, nine point two five. The ratio is one, the log of one is zero, so the p H equals the p K a.', caption: 'The answer is D, 9.25. The ratio is 1, the log of 1 is zero, so the pH equals the pKa.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['pH = pKa + log([A⁻] ÷ [HA]).', 'pH = pKa when the acid and base are equal.', 'Added base turns HA into A⁻: work in moles.', 'More of both components: a greater capacity.'] }],
      lines: [
        { say: 'Let’s sum up. A buffer’s p H is its p K a plus the log of base over acid.', caption: 'Let’s sum up. pH = pKa + log([A⁻] ÷ [HA]).', show: 'sum.0' },
        { say: 'When the acid and its conjugate base are equal, the p H equals the p K a.', caption: 'When the acid and its conjugate base are equal, the pH equals the pKa.', show: 'sum.1' },
        { say: 'Added base turns acid into conjugate base, and added acid does the reverse, so work in moles, then use the ratio.', show: 'sum.2' },
        { say: 'And a buffer with more of both components has a greater capacity.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
