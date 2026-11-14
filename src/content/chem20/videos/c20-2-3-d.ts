import type { Explainer, ParticlesEl } from '@/video/script.ts';

// The worked example (simulated, src/video/particles.ts): 210 kPa and 8.4 L, squeezed to 5.2 L,
// when the gauge reads 339 kPa.
const cylinder: ParticlesEl = {
  kind: 'particles',
  id: 'c',
  boxes: [{ id: 'b', state: 'gas', width: 8, height: 10, temp: 1.6, piston: true, kinds: [{ n: 14, bond: 0.15, heavy: 0 }] }],
  clips: { push: { phases: [{ dur: 5, lid: { b: 5.2 / 8.4 } }] } },
  gauge: { box: 'b', start: 210 },
  volume: { box: 'b', start: 8.4, decimals: 1 },
  height: 460,
};

const video: Explainer = {
  id: 'c20-2-3-d',
  lessonId: 'c20-2-3',
  title: "Boyle's Law, Part 4: Finding a New Pressure",
  thumbnailTitle: 'Finding a New Pressure',
  thumbnail: 'c',
  summary:
    "To find the pressure that squeezes a gas to a given volume, solve Boyle's law for P₂ = P₁V₁/V₂: 8.4 L at 210 kPa needs 339 kPa to become 5.2 L. Keep every digit until the end, use the same units on both sides, and remember the law holds only at constant temperature for a fixed amount of gas.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 4', title: 'Finding a New Pressure', subtitle: 'How hard must you push?' }],
      lines: [
        { say: 'How hard must you push to squeeze a gas into a smaller space? Boyle’s law answers that too.', show: 'title' },
        { say: 'In this part, you will solve Boyle’s law for the new pressure, round your answer correctly, and see when the law applies.' },
      ],
    },
    {
      chapter: 'Solving for the pressure',
      layout: 'split',
      leftWidth: 560,
      left: [cylinder],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A gas in a cylinder with a movable piston is at $210\\ \\text{kPa}$ with a volume of $8.4\\ \\text{L}$. At the same temperature, what pressure would make its volume $5.2\\ \\text{L}$? Give the pressure to the nearest whole number.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P_2 = \\dfrac{P_1V_1}{V_2} = \\dfrac{210 \\times 8.4}{5.2}', '\\phantom{P_2} = 339.23\\ldots', 'P_2 = 339\\ \\text{kPa}'] },
      ],
      lines: [
        { say: 'A gas in a cylinder with a movable piston is at two hundred ten kilopascals, with a volume of eight point four litres. At the same temperature, what pressure would make its volume five point two litres? Give the pressure to the nearest whole number.', show: ['q', 'c', 'c.gauge', 'c.volume'] },
        { say: 'First, the direction. The volume gets smaller, so the pressure must rise above two hundred ten kilopascals.' },
        { say: 'Solve Boyle’s law for P two: P two equals P one V one over V two. That is two hundred ten times eight point four, over five point two.', caption: 'Solve Boyle’s law for P₂: P₂ = P₁V₁/V₂. That is 210 × 8.4, over 5.2.', show: 'm.0', focus: 'm.0' },
        { say: 'The calculator shows three hundred thirty-nine point two three, and so on.', show: 'm.1', focus: 'm.1' },
        { say: 'To the nearest whole number, the new pressure is three hundred thirty-nine kilopascals. It is higher than before, as expected.', show: 'm.2', focus: 'm.2' },
        { say: 'In the cylinder, push the piston in to five point two litres, and the gauge climbs to three hundred thirty-nine kilopascals.', play: 'c.push', focus: ['c.gauge', 'c.volume'] },
      ],
    },
    {
      chapter: 'Rounding and units',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Round once, at the end', md: 'Keep every digit until the last step. About three significant figures: $1.78\\ \\text{L}$ to the nearest hundredth, $16.8\\ \\text{L}$ to the nearest tenth, $339\\ \\text{kPa}$ to the nearest whole number.' },
        { kind: 'callout', id: 'units', tone: 'key', title: 'Other units', md: 'Any units work, as long as both pressures share a unit and both volumes share a unit. Convert first if they do not: $1\\ \\text{atm} = 101.325\\ \\text{kPa}$.' },
      ],
      lines: [
        { say: 'Keep every digit on your calculator until the last step, then round as the question asks.', show: 'tip' },
        { say: 'The questions here ask for about three significant figures: a volume such as one point seven eight litres to the nearest hundredth, sixteen point eight litres to the nearest tenth, and a pressure such as three hundred thirty-nine kilopascals to the nearest whole number.' },
        { say: 'Boyle’s law works in any units, as long as both pressures share a unit, and both volumes share a unit.', show: 'units' },
        { say: 'If one pressure is in atmospheres and the other in kilopascals, convert first, using one atmosphere equals one hundred one point three two five kilopascals.' },
      ],
    },
    {
      chapter: 'When the law applies',
      layout: 'center',
      main: [{ kind: 'callout', id: 'when', tone: 'definition', title: 'Boyle’s law holds only…', md: 'while the **temperature** and the **amount of gas** stay the same. If the gas is warmed or cooled as it is squeezed, or some of it leaks out, $P_1V_1 = P_2V_2$ no longer applies.' }],
      lines: [
        { say: 'Boyle’s law holds only while the temperature and the amount of gas stay the same.', show: 'when' },
        { say: 'If the gas is warmed or cooled as it is squeezed, or some of it leaks out, P one V one equals P two V two no longer applies. A later lesson, on the combined gas law, deals with a change in temperature as well.', caption: 'If the gas is warmed or cooled as it is squeezed, or some of it leaks out, P₁V₁ = P₂V₂ no longer applies. A later lesson, on the combined gas law, deals with a change in temperature as well.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gas in a gas syringe is at $150\\ \\text{kPa}$ with a volume of $9.6\\ \\text{L}$. At the same temperature, what pressure would make its volume $4.0\\ \\text{L}$? Give the pressure to the nearest whole number.',
          choices: ['$360\\ \\text{kPa}$', '$63\\ \\text{kPa}$', '$1440\\ \\text{kPa}$', '$3600\\ \\text{kPa}$'],
          answer: 0,
          working: '$P_2 = \\dfrac{P_1V_1}{V_2} = \\dfrac{150 \\times 9.6}{4.0} = 360\\ \\text{kPa}$. The volume went down, so the pressure went up.',
        },
      ],
      lines: [
        { say: 'Your turn. A gas in a gas syringe is at one hundred fifty kilopascals, with a volume of nine point six litres. At the same temperature, what pressure would make its volume four point zero litres? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, three hundred sixty kilopascals: one hundred fifty times nine point six, over four point zero. Choice B puts the volumes the wrong way up, which gives a lower pressure for a smaller volume.', show: 'q.answer' },
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
            'To find a new pressure: $P_2 = \\dfrac{P_1V_1}{V_2}$. A smaller volume needs a **higher** pressure.',
            'Use the same units on both sides, and round only at the end.',
            'Boyle’s law holds only at **constant temperature**, for a **fixed amount** of gas.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a new pressure, use P two equals P one V one over V two. A smaller volume needs a higher pressure.', caption: 'Let’s sum up. To find a new pressure, use P₂ = P₁V₁/V₂. A smaller volume needs a higher pressure.', show: 'sum.0' },
        { say: 'Use the same units on both sides, and round only at the end.', show: 'sum.1' },
        { say: 'And Boyle’s law holds only at constant temperature, for a fixed amount of gas. That completes this lesson on Boyle’s law. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
