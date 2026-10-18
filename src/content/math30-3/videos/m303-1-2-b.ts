import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueLine } from './lib/m303-1-figures.ts';

// A shaft drawn as 25.40 ± 0.05 mm, and three finished shafts: 25.43 passes, 25.47 and 25.34 fail.
const shafts = () =>
  figure(
    'sh',
    [
      valueLine({
        min: 25.3,
        max: 25.5,
        step: 0.01,
        decimals: 2,
        unit: '\\text{mm}',
        band: { from: 25.35, to: 25.45, group: 'limits' },
        ticks: [
          { id: 'least', value: 25.35, tex: '\\text{least } 25.35', tone: 'theta', group: 'limits' },
          { id: 'nominal', value: 25.4, tex: '25.40', tone: 'muted', height: 1.1 },
          { id: 'greatest', value: 25.45, tex: '\\text{greatest } 25.45', tone: 'theta', group: 'limits' },
        ],
        dots: [
          { id: 's1', value: 25.43, tex: '25.43', tone: 'good' },
          { id: 's2', value: 25.47, tex: '25.47', tone: 'bad' },
          { id: 's3', value: 25.34, tex: '25.34', tone: 'bad' },
        ],
      }),
    ],
    290,
  );

// Limits of 74.6 mm and 75.4 mm: the nominal value 75.0 halfway between, and a tolerance of 0.4.
const limits = () =>
  figure(
    'lim',
    [
      valueLine({
        min: 74.4,
        max: 75.6,
        step: 0.1,
        decimals: 1,
        unit: '\\text{mm}',
        band: { from: 74.6, to: 75.4, group: 'ends' },
        ticks: [
          { id: 'lo', value: 74.6, tex: '74.6', tone: 'theta', group: 'ends' },
          { id: 'hi', value: 75.4, tex: '75.4', tone: 'theta', group: 'ends' },
          { id: 'nom', value: 75, tex: '75.0', tone: 'good', height: 2 },
        ],
        spans: [
          { id: 'left', from: 74.6, to: 75, tex: '0.4', tone: 'opp', group: 'halves' },
          { id: 'right', from: 75, to: 75.4, tex: '0.4', tone: 'opp', group: 'halves' },
        ],
      }),
    ],
    270,
  );

const video: Explainer = {
  id: 'm303-1-2-b',
  lessonId: 'm303-1-2',
  title: 'Uncertainty and Tolerance, Part 2: Tolerance',
  thumbnailTitle: 'Tolerance: Does the Part Pass?',
  thumbnail: 'sh',
  summary: 'The nominal value and the tolerance of a part, greatest = nominal + tolerance and least = nominal − tolerance, checking three shafts against 25.40 ± 0.05 mm (only 25.43 mm passes), and going from limits of 74.6 mm and 75.4 mm back to the specification 75.0 ± 0.4 mm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits of Measurement · Part 2', title: 'Tolerance', subtitle: 'A range of sizes that is close enough' }],
      lines: [
        { say: 'No part is made exactly to size. Machinists, carpenters, pipe fitters and bakers all work to a tolerance: a range of sizes that is close enough.', show: 'title' },
        { say: 'In this video, you will find that range from a drawing, decide whether parts pass, and go the other way, from the limits back to the drawing.' },
      ],
    },
    {
      chapter: 'Nominal value and tolerance',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Nominal value and tolerance', md: 'The **nominal value** is the target size on a drawing or recipe. The **tolerance** is how far above or below the nominal value a part may be and still be acceptable.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['25.40 \\pm 0.05\\text{ mm}: \\text{ nominal } 25.40, \\text{ tolerance } \\pm 0.05', '\\text{greatest} = \\text{nominal} + \\text{tolerance}', '\\text{least} = \\text{nominal} - \\text{tolerance}'] },
      ],
      lines: [
        { say: 'The nominal value is the target size, written on a drawing or in a recipe.', show: 'def' },
        { say: 'The tolerance is how far above or below the nominal value a part may be, and still be acceptable.' },
        { say: 'A shaft drawn as 25.40, plus or minus 0.05 millimetres, has a nominal diameter of 25.40 millimetres, and a tolerance of plus or minus 0.05 millimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'So the greatest acceptable size is the nominal value plus the tolerance, and the least acceptable size is the nominal value minus the tolerance.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Machining a shaft',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Drawing: $25.40 \\pm 0.05\\text{ mm}$. Finished shafts: $25.43$, $25.47$ and $25.34\\text{ mm}$.' },
        shafts(),
        { kind: 'math', id: 'm', size: 'md', lines: ['25.40 - 0.05 = 25.35 \\qquad 25.40 + 0.05 = 25.45'] },
      ],
      lines: [
        { say: 'A shaft must be 25.40, plus or minus 0.05 millimetres, in diameter. Three finished shafts measure 25.43, 25.47 and 25.34 millimetres. Which ones are acceptable?', show: ['q', 'sh.axis', 'sh.nominal'] },
        { say: 'First, find the limits. The least is 25.40 minus 0.05, which is 25.35 millimetres. The greatest is 25.40 plus 0.05, which is 25.45 millimetres. Every acceptable shaft is in the green range between them.', show: ['m.0', 'sh.limits'], focus: ['m.0', 'sh.limits'] },
        { say: 'Now place each shaft. 25.43 is between the limits, so it passes.', show: 'sh.s1', focus: 'sh.s1' },
        { say: '25.47 is above 25.45, so it is too large.', show: 'sh.s2', focus: 'sh.s2' },
        { say: 'And 25.34 is below 25.35, so it is too small.', show: 'sh.s3', focus: 'sh.s3' },
        { say: 'So only the 25.43 millimetre shaft is within tolerance. The 25.47 millimetre shaft is too large, and the 25.34 millimetre shaft is too small.', focus: 'sh' },
      ],
    },
    {
      chapter: 'Check both limits',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Check both limits', md: 'Write the least and greatest values down before you look at any measurements. A part can fail by being too big **or** too small.' }],
      lines: [
        { say: 'A tip: write down the least and greatest values before you look at any measurements.', show: 'tip' },
        { say: 'A part can fail by being too big, or by being too small. A shaft that is too large will not fit into its hole, and one that is too small will wobble in it. So check every part against both limits.' },
      ],
    },
    {
      chapter: 'From limits to a specification',
      layout: 'center',
      main: [
        limits(),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{nominal} = \\dfrac{74.6 + 75.4}{2} = 75.0', '\\text{tolerance} = \\dfrac{75.4 - 74.6}{2} = 0.4 \\;\\Rightarrow\\; 75.0 \\pm 0.4\\text{ mm}'] },
      ],
      lines: [
        { say: 'You can also go the other way, from the limits to the specification. Suppose a part must be between 74.6 and 75.4 millimetres.', show: ['lim.axis', 'lim.ends'] },
        { say: 'The nominal value is halfway between the limits: add them and divide by two. 74.6 plus 75.4 is 150, and half of 150 is 75.0 millimetres.', show: ['m.0', 'lim.nom'], focus: ['m.0', 'lim.nom'] },
        { say: 'The tolerance is half the gap between the limits. 75.4 minus 74.6 is 0.8, and half of 0.8 is 0.4 millimetres.', show: ['lim.halves', 'm.1'], focus: ['m.1', 'lim.halves'] },
        { say: 'So the part is 75.0, plus or minus 0.4 millimetres. Check: 75.0 minus 0.4 is 74.6, and 75.0 plus 0.4 is 75.4.', focus: ['m.1', 'lim.ends'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pipe must be $150 \\pm 2\\text{ mm}$ long. Which length is **not** acceptable?',
          choices: ['$148.5\\text{ mm}$', '$152.4\\text{ mm}$', '$151.9\\text{ mm}$', '$149.2\\text{ mm}$'],
          answer: 1,
          working: 'Least: $150 - 2 = 148\\text{ mm}$. Greatest: $150 + 2 = 152\\text{ mm}$. Only $152.4\\text{ mm}$ is outside the limits: it is too long.',
        },
      ],
      lines: [
        { say: 'Your turn. A pipe must be 150, plus or minus two millimetres long. Which length is not acceptable? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The limits are 150 minus two, which is 148, and 150 plus two, which is 152 millimetres. 152.4 is above 152, so it is too long. Choice A, 148.5, is less than 150, but it is still above the least value, 148, so it passes.', show: 'q.answer' },
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
            'Greatest $=$ nominal $+$ tolerance; least $=$ nominal $-$ tolerance.',
            'A part passes if it is between the limits: check both.',
            'The nominal value is halfway between the limits, and the tolerance is half the gap.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The greatest acceptable value is the nominal value plus the tolerance, and the least is the nominal value minus the tolerance.', show: 'sum.0' },
        { say: 'A part passes if it is between the limits, so check both.', show: 'sum.1' },
        { say: 'And to go back from the limits, the nominal value is halfway between them, and the tolerance is half the gap. In part three, we look at unequal and percent tolerances. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
