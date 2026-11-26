import type { Explainer } from '@/video/script.ts';
import { diluting } from '../../chem20/videos/lib/c20-particles.ts';

const video: Explainer = {
  id: 'cx-21-2',
  lessonId: 'cx-21-2',
  title: 'The Beer–Lambert Law',
  thumbnail: false,
  summary:
    'The Beer–Lambert law, A = εbc, says that absorbance is proportional to the concentration and to the path length, so measurements are made at the wavelength the substance absorbs most strongly. A calibration graph of standard solutions is a straight line through the origin, from which an unknown concentration is read. Errors that raise the absorbance make the concentration too high, and errors that lower it make it too low.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'The Beer–Lambert Law', subtitle: 'Measuring concentration with light' }],
      lines: [
        { say: 'A darker cup of tea absorbs more light than a pale one. A spectrophotometer measures exactly how much light a solution absorbs, and from that number chemists can find its concentration.', show: 'title' },
        { say: 'In this lesson, you will use the Beer Lambert law, and find unknown concentrations from a calibration graph.', caption: 'In this lesson, you will use the Beer–Lambert law, and find unknown concentrations from a calibration graph.' },
      ],
    },
    {
      chapter: 'The Beer–Lambert law',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['A = \\varepsilon b c'] },
        { kind: 'bullets', id: 'b', items: ['$A$: absorbance (no unit)', '$\\varepsilon$: molar absorptivity, L mol⁻¹ cm⁻¹', '$b$: path length, cm; $c$: concentration, mol/L'] },
      ],
      lines: [
        { say: 'The Beer Lambert law says that absorbance equals epsilon b c.', caption: 'The Beer–Lambert law says that A = εbc.', show: 'm' },
        { say: 'A is the absorbance, which has no unit.', show: 'b.0' },
        { say: 'Epsilon is the molar absorptivity. It depends on the substance and on the wavelength, so we measure where the substance absorbs most strongly, called lambda max.', caption: 'ε is the molar absorptivity. It depends on the substance and on the wavelength, so we measure where the substance absorbs most strongly, called λmax.', show: 'b.1' },
        { say: 'And b is the path length of the cuvette in centimetres, while c is the concentration.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Diluting a standard, up close',
      layout: 'center',
      main: [diluting('dl', { start: 25, unit: 'mL', from: 0.25 })],
      lines: [
        { say: 'Here is a dye solution, twenty-five millilitres of it, ready to be diluted to make a new standard. Watch the dye particles as water goes in.', caption: 'Here is a dye solution, 25.0 mL of it, ready to be diluted to make a new standard. Watch the dye particles as water goes in.', show: ['dl', 'dl.labels', 'dl.volume', 'dl.key'] },
        { say: 'The volume rises to one hundred millilitres, and the same particles spread out through four times the space.', caption: 'The volume rises to 100.0 mL, and the same particles spread out through four times the space.', play: 'dl.dilute', focus: 'dl.d' },
        { say: 'So a beam of light crossing a cuvette of this solution meets only a quarter as many dye particles, and its absorbance is a quarter as big. That is the proportion at the heart of the Beer Lambert law.', caption: 'So a beam of light crossing a cuvette of this solution meets only a quarter as many dye particles, and its absorbance is a quarter as big. That is the proportion at the heart of the Beer–Lambert law.' },
      ],
    },
    {
      chapter: 'Finding a concentration',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['c = \\dfrac{A}{\\varepsilon b}', 'c = \\dfrac{0.540}{(1.80 \\times 10^{4})(1.00)}', 'c = 3.00 \\times 10^{-5}\\ \\text{mol/L}'] }],
      lines: [
        { say: 'To find a concentration, rearrange: c equals A over epsilon b.', caption: 'To find a concentration, rearrange: c = A ÷ εb.', show: 'm.0', focus: 'm.0' },
        { say: 'A solution in a one centimetre cuvette has an absorbance of zero point five four zero, and the molar absorptivity is one point eight times ten to the four.', caption: 'A solution in a 1.00 cm cuvette has an absorbance of 0.540, and the molar absorptivity is 1.80 × 10⁴ L mol⁻¹ cm⁻¹.', show: 'm.1', focus: 'm.1' },
        { say: 'So the concentration is three point zero zero times ten to the negative five moles per litre.', caption: 'So the concentration is 3.00 × 10⁻⁵ mol/L.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Calibration graphs',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Measure the absorbance of several standards', 'Plot absorbance against concentration: a straight line through the origin', 'Read across from the unknown’s absorbance, then down', 'Multiply by any dilution factor'] },
      ],
      lines: [
        { say: 'In practice, chemists rarely know epsilon in advance. Instead they measure the absorbance of several standard solutions of known concentration.', caption: 'In practice, chemists rarely know ε in advance. Instead they measure the absorbance of several standard solutions of known concentration.', show: 'b.0' },
        { say: 'A graph of absorbance against concentration is a straight line through the origin.', show: 'b.1' },
        { say: 'Read across from the unknown’s absorbance to the line, then down to its concentration.', show: 'b.2' },
        { say: 'And if the sample was diluted before it was measured, multiply by the dilution factor to get the original concentration.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Smudges and drops', md: 'Fingerprints on the cuvette absorb and scatter light, so the absorbance and the concentration come out **too high**. A cuvette still wet with water dilutes the sample, so both come out **too low**.' }],
      lines: [{ say: 'Watch for errors in the measurement. Fingerprints on the cuvette absorb and scatter light, so the concentration comes out too high. A cuvette still wet with water dilutes the sample, so it comes out too low.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A solution has an absorbance of 0.40 in a 1.0 cm cuvette. What is its absorbance in a 2.0 cm cuvette?',
          choices: ['0.80', '0.20', '0.40', '1.60'],
          answer: 0,
          working: 'Absorbance is proportional to the path length, so doubling $b$ doubles $A$: $0.80$.',
        },
      ],
      lines: [
        { say: 'Your turn. A solution has an absorbance of zero point four zero in a one centimetre cuvette. What is its absorbance in a two centimetre cuvette? Pause the video and try it.', caption: 'Your turn. A solution has an absorbance of 0.40 in a 1.0 cm cuvette. What is its absorbance in a 2.0 cm cuvette? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is choice A, zero point eight zero. Absorbance is proportional to the path length, so doubling the path doubles the absorbance.', caption: 'The answer is choice A, 0.80. Absorbance is proportional to the path length, so doubling the path doubles the absorbance.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A = εbc: absorbance is proportional to concentration.', 'Measure at λmax, where the substance absorbs most.', 'A calibration graph is a straight line through the origin.', 'Errors that raise A make c too high, and the reverse.'] }],
      lines: [
        { say: 'Let’s sum up. Absorbance equals epsilon b c, so it is proportional to the concentration.', caption: 'Let’s sum up. A = εbc, so absorbance is proportional to the concentration.', show: 'sum.0' },
        { say: 'Measure at lambda max, where the substance absorbs most strongly.', caption: 'Measure at λmax, where the substance absorbs most strongly.', show: 'sum.1' },
        { say: 'A calibration graph of standards is a straight line through the origin.', show: 'sum.2' },
        { say: 'And errors that raise the absorbance make the concentration too high, while errors that lower it make it too low.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
