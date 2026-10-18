import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueLine } from './lib/m303-1-figures.ts';

// Two calipers checked on a 25.400 mm gauge block: the digital one reads 25.46, the vernier 25.4.
const calipers = () =>
  figure(
    'cal',
    [
      valueLine({
        min: 25.35,
        max: 25.5,
        step: 0.01,
        decimals: 2,
        unit: '\\text{mm}',
        ticks: [{ id: 'true', value: 25.4, tex: '\\text{true: } 25.400', tone: 'theta' }],
        spans: [{ id: 'err', from: 25.4, to: 25.46, tex: '0.06\\text{ mm off}', tone: 'bad' }],
        dots: [
          { id: 'vern', value: 25.4, tex: '\\text{vernier: } 25.4', tone: 'good' },
          { id: 'dig', value: 25.46, tex: '\\text{digital: } 25.46', tone: 'bad' },
        ],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm303-1-1-c',
  lessonId: 'm303-1-1',
  title: 'Precision and Accuracy, Part 3: Accuracy',
  thumbnailTitle: 'Accuracy: Close to the True Value',
  thumbnail: 'cal',
  summary: 'Accuracy as how close a measurement is to the true value, checking tools against a known standard such as a gauge block, two calipers on a 25.400 mm block (the digital one more precise, the vernier more accurate), and choosing a tool that is both precise and accurate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits of Measurement · Part 3', title: 'Accuracy', subtitle: 'How close to the true value' }],
      lines: [
        { say: 'A digital scale that shows tenths of a gram looks very exact. But if nobody has checked it, it could be wrong by several grams.', show: 'title' },
        { say: 'In this video, you will meet accuracy: how close a measurement is to the true value. You will see that a precise tool is not always an accurate one.' },
      ],
    },
    {
      chapter: 'Accuracy',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Accuracy', md: 'The **accuracy** of a measurement is how close it is to the true (actual) value. The smaller the difference between a reading and the true value, the more accurate the reading.' },
        { kind: 'callout', id: 'std', tone: 'tip', title: 'Checking a tool', md: 'Check a tool against an object whose true size is known: a **gauge block** in a machine shop, or a certified test mass in a bakery.' },
      ],
      lines: [
        { say: 'The accuracy of a measurement is how close it is to the true, or actual, value.', show: 'def' },
        { say: 'To judge accuracy, subtract to find the difference between the reading and the true value. The smaller that difference, the more accurate the reading.' },
        { say: 'But how do you know the true value? Shops check their tools against objects whose true size is known. A machine shop uses a gauge block, a block of steel made to an exact length. A bakery uses a certified test mass.', show: 'std' },
      ],
    },
    {
      chapter: 'Checking two calipers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Gauge block: exactly $25.400\\text{ mm}$. Digital caliper: $25.46\\text{ mm}$. Vernier caliper: $25.4\\text{ mm}$.' },
        calipers(),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Digital: } |25.46 - 25.400| = \\bad{0.06\\text{ mm}}', '\\text{Vernier: } |25.4 - 25.400| = \\good{0\\text{ mm}}'] },
      ],
      lines: [
        { say: 'A machinist checks two calipers on a gauge block that is exactly 25.400 millimetres long. The digital caliper reads 25.46 millimetres, and the vernier caliper reads 25.4 millimetres. Which caliper is more accurate?', show: ['q', 'cal.axis', 'cal.true'] },
        { say: 'Find how far each reading is from the true value. The digital caliper: the difference between 25.46 and 25.400 is 0.06 millimetres.', show: ['cal.dig', 'cal.err', 'm.0'], focus: ['cal.dig', 'cal.err'] },
        { say: 'The vernier caliper: the difference between 25.4 and 25.400 is zero. It is not off at all.', show: ['cal.vern', 'm.1'], focus: ['cal.vern', 'm.1'] },
        { say: 'The bars around each subtraction mean the absolute value: the difference as a positive number, whether the reading is too high or too low.', focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Precise, but not accurate',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Caliper', 'Precision', 'Difference from true'], rows: [['Digital', '$0.01\\text{ mm}$ (more precise)', '$0.06\\text{ mm}$'], ['Vernier', '$0.1\\text{ mm}$', '$0\\text{ mm}$ (more accurate)']] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Precise is not the same as accurate', md: 'More decimal places only means a smaller unit. A scale that reads to $0.1\\text{ g}$ but has not been calibrated can be far from the true value.' },
      ],
      lines: [
        { say: 'So the vernier caliper is more accurate, even though the digital caliper is more precise. The digital reading shows hundredths, but it is wrong by six hundredths.', show: 't', focus: 't' },
        { say: 'The digital caliper probably needs to be zeroed: reset so that it reads zero when its jaws are closed.' },
        { say: 'This is the key mistake to avoid. More decimal places only means a smaller unit. A digital scale that reads to 0.1 grams, but has not been calibrated, can be far from the true value. Always compare each reading with the true value to judge accuracy.', show: 'oops' },
      ],
    },
    {
      chapter: 'Precise and accurate',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Precise and accurate together', md: 'The best tool for a job is both: its unit is small enough for the job, and its readings are close to the true value. Choose an instrument whose precision matches the decimal places the job needs, then check it against a known standard.' }],
      lines: [
        { say: 'The best tool for a job is both precise and accurate. Its unit is small enough for the job, and its readings are close to the true value.', show: 'tip' },
        { say: 'So choose an instrument whose precision matches the number of decimal places the job needs. A part drawn to the hundredth of a millimetre needs a caliper, not a tape measure.' },
        { say: 'Then check the instrument against a known standard, like a gauge block, before you trust its readings.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gauge block is exactly $50.00\\text{ mm}$ long. Which reading of it is the most accurate?',
          choices: ['$50.02\\text{ mm}$', '$49.95\\text{ mm}$', '$50.1\\text{ mm}$', '$49.9\\text{ mm}$'],
          answer: 0,
          working: 'The differences from $50.00$ are $0.02$, $0.05$, $0.1$ and $0.1\\text{ mm}$. The smallest difference, $0.02\\text{ mm}$, is the most accurate.',
        },
      ],
      lines: [
        { say: 'Your turn. A gauge block is exactly 50.00 millimetres long. Which reading of it is the most accurate? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 50.02 is only 0.02 millimetres from the true value, the smallest difference of the four. Choice B is just as precise, to the hundredth, but it is 0.05 millimetres off.', show: 'q.answer' },
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
            '**Accuracy** is how close a measurement is to the true value. Subtract to find the difference.',
            'Check a tool against a known standard, such as a gauge block.',
            'A precise instrument is not always accurate: the best tool is both.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Accuracy is how close a measurement is to the true value. Subtract to find the difference: the smaller it is, the more accurate the reading.', show: 'sum.0' },
        { say: 'Check a tool against a known standard, such as a gauge block or a certified test mass.', show: 'sum.1' },
        { say: 'And a precise instrument is not always accurate: the best tool is both. In part four, we compare the accuracy of measurements of different sizes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
