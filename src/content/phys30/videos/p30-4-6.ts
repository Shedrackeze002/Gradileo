import type { Explainer, HalflifeEl } from '@/video/script.ts';

// Lesson 4.6, first part: half-life. src/video/halflife.ts gives every nucleus of a sample its
// own moment to decay, so the sample thins out at random while the graph beside it draws the
// decay equation N = N₀ × (1/2)^(t/T): iodine-131 over five half-lives, 80 mg of it over 24 days,
// 200 g of cobalt-60 over 12 years, and a sample that falls to an eighth in 45 hours.

const sample = (id: string, height: number, clips: HalflifeEl['clips'], more: Partial<HalflifeEl> & { halfLife: number }): HalflifeEl => ({ kind: 'halflife', id, height, clips, ...more });

/** 400 nuclei of iodine-131: one half-life, then a second, and on to five. */
const iodine = sample(
  'io',
  430,
  {
    a: { phases: [{ dur: 4 }, { dur: 10.9, to: 1.5 }] },
    b: { phases: [{ dur: 3 }, { dur: 9.3, to: 8 }] },
    c: { phases: [{ dur: 13.2 }] },
    d: { phases: [{ dur: 2 }, { dur: 7, to: 16 }, { dur: 3.6 }] },
    e: { phases: [{ dur: 1 }, { dur: 3.5, to: 24 }, { dur: 0.6 }, { dur: 2.6, to: 32 }, { dur: 0.4 }, { dur: 2.5, to: 40 }, { dur: 2 }] },
    f: { phases: [{ dur: 11.8 }] },
  },
  { halfLife: 8, unit: 'days', name: 'iodine-131', amount: 400, amountUnit: 'nuclei', amountName: 'Nuclei left', poster: 'e', posterAt: 0.55, thumb: ['graph', 'halves'] },
);

/** 80 mg of iodine-131 over 24 days. */
const dose = sample('mg', 340, { a: { phases: [{ dur: 22.4 }] }, b: { phases: [{ dur: 3 }, { dur: 8, to: 24 }, { dur: 3.9 }] } }, { halfLife: 8, unit: 'days', name: 'iodine-131', amount: 80, amountUnit: 'mg', span: 4 });

/** 200 g of cobalt-60 over 12 years: between two and three half-lives. */
const cobalt = sample('co', 330, { a: { phases: [{ dur: 15.4 }] }, b: { phases: [{ dur: 6.2 }] }, c: { phases: [{ dur: 1.5 }, { dur: 7, to: 12 }, { dur: 9.5 }] } }, { halfLife: 5.3, unit: 'years', name: 'cobalt-60', amount: 200, amountUnit: 'g', span: 4, places: 1 });

/** A sample that falls from 400 mg to 50 mg in 45 hours. The time axis is marked every 5 hours, so that it does not give the half-life away. */
const back = sample('bk', 340, { a: { phases: [{ dur: 4.5 }, { dur: 6, to: 45 }, { dur: 2.3 }] }, b: { phases: [{ dur: 10.1 }] }, c: { phases: [{ dur: 8 }] } }, { halfLife: 15, unit: 'hours', amount: 400, amountUnit: 'mg', span: 4, every: 5 });

const video: Explainer = {
  id: 'p30-4-6',
  lessonId: 'p30-4-6',
  title: 'Half-Life',
  thumbnail: 'io',
  summary:
    'Nobody can say when one nucleus will decay, but a sample follows a regular pattern. Watch 400 nuclei decay at random while the graph of the number left draws itself, see why half are left after each half-life, and use the decay equation for whole half-lives, for times in between, and to find a half-life.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'Half-Life', subtitle: 'How a radioactive sample decays' }],
      lines: [
        { say: 'Nobody can say when one particular unstable nucleus will decay. It might be in the next second, or not for a thousand years.', show: 'title' },
        { say: 'Yet a sample of them decays in a perfectly regular way. Let us watch one.' },
      ],
    },
    {
      chapter: 'Random, but regular',
      layout: 'center',
      main: [iodine],
      lines: [
        { say: 'Here are 400 nuclei of iodine-131. Decay is random. Each nucleus has the same chance of decaying in each second, whatever its age, and we cannot tell which one will go next.', show: ['io', 'io.names', 'io.left'], play: 'io.a' },
        { say: 'But in any given time, the same fraction of the nuclei that are left will decay. Watch the number left on a graph, for 8 days.', show: ['io.graph', 'io.ahead'], play: 'io.b' },
        { say: 'Half of the nuclei have decayed. The time for half of the nuclei in a sample to decay is called the half-life. For iodine-131, it is 8 days.', show: 'io.halves', play: 'io.c' },
        { say: 'Now wait for another 8 days. Half of the nuclei that were left decay. So one quarter of the original number remains. The sample has not all gone.', play: 'io.d' },
        { say: 'After a third half-life, one eighth is left. Then one sixteenth, and one thirty-second. The amount never falls by a fixed number. It falls by a fixed fraction.', caption: 'After a third half-life, 1/8 is left. Then 1/16, and 1/32. The amount never falls by a fixed number. It falls by a fixed fraction.', play: 'io.e' },
        { say: 'The half-life of an isotope does not depend on temperature, pressure or chemical state. Decay happens in the nucleus, which takes no notice of its surroundings.', play: 'io.f' },
      ],
    },
    {
      chapter: 'The decay equation',
      layout: 'center',
      main: [dose, { kind: 'math', id: 'eq', size: 'md', lines: ['N = N_0 \\left(\\tfrac{1}{2}\\right)^{t/T}', 'N = 80 \\times \\left(\\tfrac{1}{2}\\right)^{24/8} = 80 \\times \\tfrac{1}{8} = \\thc{10\\ \\text{mg}}'] }],
      lines: [
        { say: 'All of this is in one equation. The amount left, N, is the amount at the start, N zero, times one half to the power of t over T. Here t is the time that has passed, and T is the half-life. So t over T counts the half-lives.', caption: 'All of this is in one equation. The amount left, N, is the amount at the start, N₀, times ½ to the power of t/T. Here t is the time that has passed, and T is the half-life. So t/T counts the half-lives.', show: ['mg', 'mg.names', 'mg.left', 'mg.graph', 'mg.ahead', 'eq.0'], play: 'mg.a' },
        { say: 'A sample holds 80 milligrams of iodine-131. How much is left after 24 days? 24 over 8 is 3 half-lives. So the amount is 80 times one eighth, which is 10 milligrams.', caption: 'A sample holds 80 mg of iodine-131. How much is left after 24 days? 24 ÷ 8 is 3 half-lives. So the amount is 80 × 1/8, which is 10 mg.', show: ['eq.1', 'mg.halves'], play: 'mg.b' },
      ],
    },
    {
      chapter: 'Between half-lives',
      layout: 'center',
      main: [cobalt, { kind: 'math', id: 'c1', size: 'md', lines: ['\\dfrac{t}{T} = \\dfrac{12}{5.3} = 2.2642', 'N = 200 \\times \\left(\\tfrac{1}{2}\\right)^{2.2642} = \\thc{41.63\\ \\text{g}}'] }],
      lines: [
        { say: 'The equation also works when the time is not a whole number of half-lives. Cobalt-60 has a half-life of 5.3 years. How much of a 200 gram sample is left after 12 years?', show: ['co', 'co.names', 'co.left', 'co.graph', 'co.ahead', 'co.halves'], play: 'co.a' },
        { say: 'Work out t over T first: 12 over 5.3 is 2.2642 half-lives.', caption: 'Work out t/T first: 12 ÷ 5.3 is 2.2642 half-lives.', show: 'c1.0', play: 'co.b' },
        { say: 'Then raise one half to that power with a calculator, and multiply by 200. That gives 41.63 grams. It is between the 50 grams left after two half-lives and the 25 grams left after three, as it should be.', caption: 'Then raise ½ to that power with a calculator, and multiply by 200. That gives 41.63 g. It is between the 50 g left after two half-lives and the 25 g left after three, as it should be.', show: 'c1.1', play: 'co.c' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [back, { kind: 'math', id: 'b1', size: 'md', lines: ['\\dfrac{400}{50} = 8 = 2^3', 'T = \\dfrac{45}{3} = \\thc{15\\ \\text{hours}}'] }],
      lines: [
        { say: 'We can also work backwards. The amount of an isotope in a sample falls from 400 milligrams to 50 milligrams in 45 hours. What is its half-life?', caption: 'We can also work backwards. The amount of an isotope in a sample falls from 400 mg to 50 mg in 45 hours. What is its half-life?', show: ['bk', 'bk.left', 'bk.graph'], play: 'bk.a' },
        { say: '400 over 50 is 8, and 8 is 2 cubed. So the amount has halved three times: 3 half-lives have passed.', caption: '400 ÷ 50 is 8, and 8 is 2³. So the amount has halved three times: 3 half-lives have passed.', show: ['b1.0', 'bk.halves'], play: 'bk.b' },
        { say: 'Three half-lives take 45 hours, so one half-life is 45 over 3, which is 15 hours.', caption: 'Three half-lives take 45 hours, so one half-life is 45 ÷ 3, which is 15 hours.', show: 'b1.1', play: 'bk.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Caesium-137 has a half-life of 30 years. What percentage of the caesium-137 in a sample is still there after 150 years?',
          choices: ['20%', '16.7%', '6.25%', '3.125%'],
          answer: 3,
          working: '$\\dfrac{150}{30} = 5$ half-lives have passed, so the percentage left is $100\\% \\times \\left(\\dfrac{1}{2}\\right)^{5} = 3.125\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. Caesium-137 has a half-life of 30 years. What percentage of the caesium-137 in a sample is still there after 150 years? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: '150 over 30 is 5 half-lives. One half to the power of 5 is one thirty-second, so 3.125 percent is left. That is choice "D".', caption: '150 ÷ 30 is 5 half-lives. ½ to the power of 5 is 1/32, so 3.125% is left. That is choice D.', show: 'q.answer' },
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
            'Decay is **random** for one nucleus, but a large sample follows a regular pattern',
            'The **half-life** is the time for half of the nuclei in a sample to decay',
            'After $n$ half-lives, the fraction left is $\\left(\\tfrac{1}{2}\\right)^{n}$',
            'For any time: $N = N_0 \\left(\\tfrac{1}{2}\\right)^{t/T}$, where $T$ is the half-life',
            'The half-life does not depend on temperature, pressure or chemical state',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Decay is random for one nucleus, but a large sample follows a regular pattern.', show: 'sum.0' },
        { say: 'The half-life is the time for half of the nuclei in a sample to decay.', show: 'sum.1' },
        { say: 'After n half-lives, the fraction left is one half to the power of n.', caption: 'After n half-lives, the fraction left is (½)ⁿ.', show: 'sum.2' },
        { say: 'For any time, N equals N zero times one half to the power of t over T, where T is the half-life.', caption: 'For any time, N = N₀ × (½)^(t/T), where T is the half-life.', show: 'sum.3' },
        { say: 'And the half-life does not depend on temperature, pressure or chemical state.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
