import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { spinner } from '@/content/math6/videos/lib/m6-12-figures.ts';
import { letterTiles } from './lib/m7-11-figures.ts';

// A spinner with 8 equal sections: 3 blue and 5 orange.
const LABELS = ['Blue', 'Blue', 'Blue', 'Orange', 'Orange', 'Orange', 'Orange', 'Orange'];
const spin = (id: string) => figure(id, [spinner({ labels: LABELS, tones: ['adj', 'adj', 'adj', 'opp', 'opp', 'opp', 'opp', 'opp'], pointTo: 1, r: 2.6 })], 440);
const sections = (id: string) => LABELS.map((_, i) => `${id}.s${i}`);

// The letters of ANIMALS on tiles; the two A tiles are picked out.
const WORD = ['A', 'N', 'I', 'M', 'A', 'L', 'S'];
const tiles = (id: string, marked = false) => figure(id, [letterTiles({ letters: WORD, gap: 1.45, tones: WORD.map((l) => (marked && l === 'A' ? 'theta' : 'muted')) })], 170);
const allTiles = (id: string) => WORD.map((_, i) => `${id}.t${i}`);

const video: Explainer = {
  id: 'm7-11-1-b',
  lessonId: 'm7-11-1',
  title: 'Expressing Probabilities, Part 2: Ratio, Fraction and Percent',
  thumbnailTitle: 'Ratio, Fraction and Percent',
  thumbnail: 'sp',
  summary:
    'A probability can be written three ways: as a ratio (favourable : total), a fraction (favourable over total) or a percent (divide, then multiply by 100). A spinner with 3 blue and 5 orange equal sections gives P(blue) = 3 : 8 = 3/8 = 37.5%. Two A tiles among the 7 letters of ANIMALS give 2 : 7, 2/7, or about 29%. A ratio for a probability compares the favourable outcomes with all the outcomes: 3 : 5 (blue to orange) is not the probability of blue.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 2', title: 'Ratio, Fraction and Percent', subtitle: 'Three ways to write a probability' }],
      lines: [
        { say: 'A weather forecast says there is a forty percent chance of rain. A game says your chances are one in four. These are both probabilities, written in different ways.', show: 'title' },
        { say: 'In this video, you will write a probability as a ratio, as a fraction and as a percent.' },
      ],
    },
    {
      chapter: 'Three ways',
      layout: 'split',
      leftWidth: 560,
      left: [spin('sp')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{Ratio: } 3 : 8', '\\text{Fraction: } \\dfrac{3}{8}', '\\text{Percent: } 37.5\\%'],
        },
      ],
      lines: [
        { say: 'This spinner has eight equal sections. Three of them are blue, and five are orange. What is the probability of landing on blue?', show: [...sections('sp'), 'sp.pointer'] },
        { say: 'As a ratio, write favourable to total: three to eight. We write it as three, a colon, then eight.', show: 'm.0', focus: ['m.0', 'sp.s0', 'sp.s1', 'sp.s2'] },
        { say: 'As a fraction, write favourable over total: three eighths.', show: 'm.1', focus: 'm.1' },
        { say: 'As a percent, it is thirty-seven point five percent. All three say the same thing: about three spins out of every eight should land on blue.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Finding the percent',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Fraction to percent', md: 'Divide the top by the bottom, then multiply by $100$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\div 8 = 0.375', '0.375 \\times 100 = 37.5\\%'] },
      ],
      lines: [
        { say: 'How do you change three eighths into a percent? Divide the top by the bottom, then multiply by one hundred.', show: 'tip' },
        { say: 'Three divided by eight is zero point three seven five.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero point three seven five times one hundred is thirty-seven point five. So the probability of blue is thirty-seven point five percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Letter tiles',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Each letter of the word ANIMALS is on a tile. Nadia picks one tile without looking. Find the probability of picking an A, three ways.' },
        tiles('lt', true),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Ratio: } 2 : 7 \\qquad \\text{Fraction: } \\dfrac{2}{7}', '\\text{Percent: } 2 \\div 7 \\approx 0.2857 \\to 28.57\\% \\approx 29\\%'] },
      ],
      lines: [
        { say: 'Each letter of the word animals is written on a tile. Nadia picks one tile without looking. Find the probability of picking the letter A, in all three ways.', show: ['q', ...allTiles('lt')] },
        { say: 'There are seven tiles, and two of them show the letter A.', focus: ['lt.t0', 'lt.t4'] },
        { say: 'As a ratio, the probability is two to seven. As a fraction, it is two sevenths.', show: 'm.0', focus: 'm.0' },
        { say: 'For the percent, divide: two divided by seven is about zero point two eight five seven. Times one hundred, that is about twenty-eight point five seven percent, or about twenty-nine percent to the nearest whole percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 520,
      left: [spin('wo')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Favourable : not favourable', md: 'A probability ratio compares the favourable outcomes with **all** the outcomes. $3 : 5$ compares blue with orange. That is **not** the probability of blue. The probability is $3 : 8$.' }],
      lines: [
        { say: 'Watch out. For the spinner, it is tempting to write the ratio three to five: three blue sections, and five orange ones.', show: [...sections('wo'), 'wo.pointer', 'oops'] },
        { say: 'But three to five compares blue with orange. It does not tell you the probability of blue.', focus: ['wo.s3', 'wo.s4', 'wo.s5', 'wo.s6', 'wo.s7'] },
        { say: 'A probability always compares the favourable outcomes with all the outcomes. There are eight sections in all, so the probability of blue is three to eight.', focus: 'wo' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A spinner has $10$ equal sections: $4$ are red and $6$ are yellow. What is the probability of red, as a percent?',
          choices: ['$4\\%$', '$40\\%$', '$66.7\\%$', '$60\\%$'],
          answer: 1,
          working: '$P(\\text{red}) = \\dfrac{4}{10}$, and $4 \\div 10 = 0.4 = 40\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A spinner has ten equal sections: four are red, and six are yellow. What is the probability of red, as a percent? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is B: forty percent. The probability is four out of ten, and four divided by ten is zero point four, or forty percent. Choice C compares red with yellow, four to six, instead of red with all ten sections.', show: 'q.answer' },
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
          items: ['A probability can be a ratio (favourable : total), a fraction, or a percent.', 'To get a percent, divide the top by the bottom, then multiply by $100$.', 'Compare the favourable outcomes with **all** the outcomes, not with the unfavourable ones.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A probability can be written as a ratio of favourable to total, as a fraction, or as a percent.', show: 'sum.0' },
        { say: 'To get a percent, divide the top by the bottom, then multiply by one hundred.', show: 'sum.1' },
        { say: 'And always compare the favourable outcomes with all the outcomes. In the next part, you will change a probability from one form to another. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
