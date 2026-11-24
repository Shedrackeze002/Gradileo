import type { Explainer, HalflifeEl } from '@/video/script.ts';

// Lesson 4.6, second part: activity and dating. The same sample of src/video/halflife.ts, read
// now by its activity: technetium-99m in a hospital, a count rate with the background taken off,
// and the carbon-14 in old wood and charcoal, which gives their age.

const sample = (id: string, height: number, clips: HalflifeEl['clips'], more: Partial<HalflifeEl> & { halfLife: number }): HalflifeEl => ({ kind: 'halflife', id, height, clips, ...more });

/** Technetium-99m: 400 MBq, with a half-life of 6 hours, for 15 hours. */
const activity = sample(
  'ac',
  340,
  { a: { phases: [{ dur: 5 }, { dur: 11.2, to: 3 }] }, b: { phases: [{ dur: 3 }, { dur: 6, to: 6 }, { dur: 6 }] }, c: { phases: [{ dur: 6 }, { dur: 6, to: 15 }, { dur: 4.2 }] } },
  { halfLife: 6, unit: 'hours', name: 'technetium-99m', amount: 400, amountUnit: 'MBq', amountName: 'Activity', span: 4 },
);

/** A source that gives 480 counts a minute, with a half-life of 6 hours, for 12 hours. */
const count = sample(
  'cr',
  320,
  { a: { phases: [{ dur: 19.3 }] }, b: { phases: [{ dur: 8.9 }] }, c: { phases: [{ dur: 1.5 }, { dur: 5.5, to: 12 }, { dur: 2.3 }] }, d: { phases: [{ dur: 8 }] } },
  { halfLife: 6, unit: 'hours', amount: 480, amountUnit: 'per minute', amountName: 'Counts from the source alone', span: 4, label: 'The detector reads 500 a minute with the source, and 20 without it' },
);

/** Carbon-14 in a piece of old wood: from 20.0 to 2.5 decays a minute in each gram. */
const wood = sample(
  'cd',
  330,
  { a: { phases: [{ dur: 15.4 }] }, b: { phases: [{ dur: 4 }, { dur: 8.6, to: 11460 }] }, c: { phases: [{ dur: 8 }, { dur: 5, to: 17190 }, { dur: 4.1 }] }, d: { phases: [{ dur: 6.7 }] } },
  { halfLife: 5730, unit: 'years', name: 'carbon-14', amount: 20, amountUnit: 'per minute', amountName: 'Decays in each gram of carbon', span: 4, poster: 'c', posterAt: 1, thumb: ['graph', 'halves'] },
);

/** Carbon-14 in the charcoal of an old fire: from 20.0 to 12.50 decays a minute in each gram. */
const charcoal = sample(
  'lg',
  330,
  { a: { phases: [{ dur: 4 }, { dur: 7, to: 3885 }, { dur: 3.1 }] }, b: { phases: [{ dur: 10.6 }] }, c: { phases: [{ dur: 19.3 }] } },
  { halfLife: 5730, unit: 'years', name: 'carbon-14', amount: 20, amountUnit: 'per minute', amountName: 'Decays in each gram of carbon', span: 2 },
);

const video: Explainer = {
  id: 'p30-4-6-b',
  lessonId: 'p30-4-6',
  title: 'Activity and Carbon Dating',
  thumbnailTitle: 'Carbon Dating',
  thumbnail: 'cd',
  summary:
    'The activity of a source is the number of its nuclei that decay each second, and it halves every half-life. Use it for a medical isotope, take the background off a count rate, and date a piece of old wood and the charcoal of an old fire from the carbon-14 that is left in them.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'Activity and Carbon Dating', subtitle: 'Counting decays to measure time' }],
      lines: [
        { say: 'We cannot count the nuclei in a sample. But we can count the decays.', show: 'title' },
        { say: 'And that is enough to find the age of something that died thousands of years ago.' },
      ],
    },
    {
      chapter: 'Activity',
      layout: 'center',
      main: [activity, { kind: 'math', id: 'a1', size: 'md', lines: ['A = A_0 \\left(\\tfrac{1}{2}\\right)^{t/T}', 'A = 400 \\times \\left(\\tfrac{1}{2}\\right)^{15/6} = 400 \\times 0.1768 = \\thc{70.7\\ \\text{MBq}}'] }],
      lines: [
        { say: 'The activity of a source is the number of its nuclei that decay each second. It is measured in becquerels: one becquerel is one decay each second. Every flash in this sample is one decay.', show: ['ac', 'ac.names', 'ac.left', 'ac.graph', 'ac.ahead'], play: 'ac.a' },
        { say: 'The activity is proportional to the number of nuclei that have not yet decayed. So it halves every half-life, in step with them, and the decay equation holds for activity as well.', show: ['a1.0', 'ac.halves'], play: 'ac.b' },
        { say: 'A hospital receives technetium-99m, with a half-life of 6 hours and an activity of 400 megabecquerels. After 15 hours, t over T is 2.5, and the activity is 400 times 0.1768, which is 70.7 megabecquerels.', caption: 'A hospital receives technetium-99m, with a half-life of 6 hours and an activity of 400 MBq. After 15 hours, t/T is 2.5, and the activity is 400 × 0.1768, which is 70.7 MBq.', show: 'a1.1', play: 'ac.c' },
      ],
    },
    {
      chapter: 'Allowing for the background',
      layout: 'center',
      main: [count, { kind: 'math', id: 'b1', size: 'md', lines: ['500 - 20 = 480', '480 \\times \\tfrac{1}{4} = 120', '120 + 20 = \\thc{140\\ \\text{counts per minute}}'] }],
      lines: [
        { say: 'A detector counts the background along with the source. Say it reads 500 counts a minute near a source, and 20 with the source taken away. The source has a half-life of 6 hours. What will the detector read after 12 hours?', show: ['cr', 'cr.names'], play: 'cr.a' },
        { say: 'Take the background off first. The source alone gives 500 minus 20, which is 480 counts a minute.', caption: 'Take the background off first. The source alone gives 500 − 20, which is 480 counts a minute.', show: ['b1.0', 'cr.left', 'cr.graph', 'cr.ahead'], play: 'cr.b' },
        { say: 'Only the 480 halves with each half-life. After 12 hours, two half-lives, it has fallen to a quarter: 120.', show: ['b1.1', 'cr.halves'], play: 'cr.c' },
        { say: 'The background has not changed, so add it back. The detector reads 140 counts a minute.', show: 'b1.2', play: 'cr.d' },
      ],
    },
    {
      chapter: 'Carbon dating',
      layout: 'center',
      main: [wood, { kind: 'math', id: 'w1', size: 'md', lines: ['\\dfrac{20.0}{2.5} = 8 = 2^3', '\\text{age} = 3 \\times 5730 = \\thc{17\\,190\\ \\text{years}}'] }],
      lines: [
        { say: 'Cosmic rays make a little carbon-14 in the upper air all the time. Plants take it in, and animals eat the plants. So every living thing holds a small, steady share of carbon-14.', show: ['cd', 'cd.names', 'cd.left', 'cd.graph', 'cd.ahead'], play: 'cd.a' },
        { say: 'When it dies, it stops taking in carbon, and its carbon-14 decays with a half-life of 5,730 years. The less carbon-14 is left, the longer ago it died.', play: 'cd.b' },
        { say: 'Carbon from living things gives 20.0 decays a minute in each gram. Carbon from the wood of an old boat gives only 2.5. 20.0 over 2.5 is 8, which is 2 cubed. So 3 half-lives have passed.', caption: 'Carbon from living things gives 20.0 decays a minute in each gram. Carbon from the wood of an old boat gives only 2.5. 20.0 ÷ 2.5 is 8, which is 2³. So 3 half-lives have passed.', show: ['w1.0', 'cd.halves'], play: 'cd.c' },
        { say: 'The age of the wood is 3 times 5,730, which is 17,190 years.', show: 'w1.1', play: 'cd.d' },
      ],
    },
    {
      chapter: 'With logarithms',
      layout: 'center',
      main: [charcoal, { kind: 'math', id: 'l1', size: 'md', lines: ['n = \\dfrac{\\log (20.0 \\div 12.50)}{\\log 2} = 0.6781', '\\text{age} = 0.6781 \\times 5730 = 3885 \\approx \\thc{3890\\ \\text{years}}'] }],
      lines: [
        { say: 'The charcoal of an old campfire gives 12.50 decays a minute in each gram. The ratio, 1.6, is not a power of 2, so less than one half-life has passed.', show: ['lg', 'lg.names', 'lg.graph', 'lg.ahead'], play: 'lg.a' },
        { say: 'Logarithms find the number of half-lives. It is the log of the ratio, over the log of 2. That gives 0.6781 half-lives.', show: 'l1.0', play: 'lg.b' },
        { say: 'So the age is 0.6781 times 5,730, which is 3,885 years, or about 3,890 years. Carbon dating works for things that were once alive, up to about 50,000 years old. Rocks are dated with isotopes of much longer half-life, such as uranium-238.', show: ['l1.1', 'lg.left'], play: 'lg.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The activity of a sample falls from 800 Bq to 100 Bq in 24 hours. What is the half-life of the isotope?',
          choices: ['8 hours', '3 hours', '12 hours', '6 hours'],
          answer: 0,
          working: '$\\dfrac{800}{100} = 8 = 2^3$, so 3 half-lives have passed in 24 hours. One half-life is $\\dfrac{24}{3} = 8$ hours.',
        },
      ],
      lines: [
        { say: 'Your turn. The activity of a sample falls from 800 becquerels to 100 becquerels in 24 hours. What is the half-life of the isotope? Pause the video and work it out.', caption: 'Your turn. The activity of a sample falls from 800 Bq to 100 Bq in 24 hours. What is the half-life of the isotope? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: '800 over 100 is 8, which is 2 cubed. So 3 half-lives have passed in 24 hours, and one half-life is 8 hours. That is choice "A".', caption: '800 ÷ 100 is 8, which is 2³. So 3 half-lives have passed in 24 hours, and one half-life is 8 hours. That is choice A.', show: 'q.answer' },
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
            'The **activity** of a source is the number of decays each second, in becquerels',
            'The activity **halves every half-life**: $A = A_0 \\left(\\tfrac{1}{2}\\right)^{t/T}$',
            'Subtract the **background** count before using the half-life',
            '**Carbon-14**, with a half-life of 5730 years, dates things that were once alive',
            'The number of half-lives is $n = \\dfrac{\\log (A_0 / A)}{\\log 2}$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The activity of a source is the number of decays each second, in becquerels.', show: 'sum.0' },
        { say: 'The activity halves every half-life, so the decay equation holds for it too.', show: 'sum.1' },
        { say: 'Subtract the background count before using the half-life.', show: 'sum.2' },
        { say: 'Carbon-14, with a half-life of 5,730 years, dates things that were once alive.', show: 'sum.3' },
        { say: 'And the number of half-lives is the log of the ratio of the activities, over the log of 2.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
