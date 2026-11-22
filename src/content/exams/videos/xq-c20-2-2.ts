import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import atmosphere from '@/content/chem20/videos/c20-2-2-b.ts';
import converting from '@/content/chem20/videos/c20-2-2-c.ts';

// Exam question for Chemistry 20 lesson 2.2 (pressure and temperature): convert a barometric
// pressure from millimetres of mercury to atmospheres and kilopascals. The question is OpenStax
// Chemistry 2e's own, word for word (end-of-chapter exercise 5, section 9.1, CC BY-NC-SA 4.0).
// The book's answer: 0.809 atm and 82.0 kPa.
//
// The pictures are the lesson's simulated particles (src/video/particles.ts): a column of air
// pulled down by gravity, thinner higher up, and a gas in a cylinder whose gauge climbs from 1.00
// to 1.75 atm as its piston is pushed in.

const video: Explainer = {
  id: 'xq-c20-2-2',
  lessonId: '',
  exam: {
    lesson: 'c20-2-2',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 5, section 9.1, Gas Pressure',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/9-exercises',
    question: 'A typical barometric pressure in Denver, Colorado, is 615 mm Hg. What is this pressure in atmospheres and kilopascals?',
  },
  title: 'Exam Question: Converting mm Hg to atm and kPa. Pressure and Temperature',
  thumbnailTitle: 'Air Pressure in Denver',
  thumbnail: 'air',
  summary:
    'A real test question, solved one small step at a time: the air pressure in Denver, a mile above sea level, is 615 mm Hg. We convert it to atmospheres and kilopascals with conversion factors from 1 atm = 101.325 kPa = 760 mm Hg, check that the answers make sense, and watch why the air is thinner higher up.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Air Pressure in Denver', subtitle: 'Converting pressure units, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the air pressure in a city high above sea level. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'A typical barometric pressure in Denver, Colorado, is $615\\ \\text{mm Hg}$. What is this pressure in atmospheres and kilopascals?', answer: '$0.809\\ \\text{atm}$ and $82.0\\ \\text{kPa}$' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A typical barometric pressure in Denver, Colorado, is 615 millimetres of mercury. What is this pressure in atmospheres and kilopascals?', caption: 'A typical barometric pressure in Denver, Colorado, is 615 mm Hg. What is this pressure in atmospheres and kilopascals?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'One pressure, $615\\ \\text{mm Hg}$, written in **two other units**: atm and kPa' }],
      lines: [
        { say: 'A barometer measures the pressure of the air. In Denver it reads 615 millimetres of mercury.', show: 'plain', caption: 'A barometer measures the pressure of the air. In Denver it reads 615 mm Hg.' },
        { say: 'We must write that same pressure in two other units: atmospheres and kilopascals.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 520,
      left: [pick(atmosphere, 'air')],
      right: [{ kind: 'math', id: 'rel', size: 'md', lines: ['1\\ \\text{atm} = 101.325\\ \\text{kPa}', '= 760\\ \\text{mm Hg}'] }],
      lines: [
        { say: 'Here is what we need. The air is pulled down by gravity, and every particle that hits the ground gives it a push. That is atmospheric pressure.', show: ['air', 'air.labels', 'air.hits'], focus: 'air.hits' },
        { say: 'Higher up there is less air above you, so the pressure is lower. Denver is about a mile above sea level, so we expect its pressure to be below normal.', focus: 'air' },
        { say: 'The three units are linked: one atmosphere equals 101.325 kilopascals, which equals 760 millimetres of mercury.', show: 'rel', caption: 'The three units are linked: 1 atm = 101.325 kPa = 760 mm Hg.' },
      ],
    },
    {
      chapter: 'A pressure changing',
      layout: 'center',
      main: [pick(converting, 'pump')],
      lines: [
        { say: 'A pressure gauge can read in any of these units. This one reads in atmospheres, and it starts at one point zero zero.', show: ['pump', 'pump.gauge', 'pump.hits'] },
        { say: 'Push the piston in, and the particles hit the walls more often, so the reading climbs. A gauge in kilopascals or in millimetres of mercury would show the same rise, just with different numbers.', play: 'pump.push', focus: 'pump.gauge' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Pick a factor with the unit you **want on top**', 'Multiply, so **mm Hg cancels**', 'Check the size: atm small, kPa middling'] }],
      lines: [
        { say: 'Here is the plan. First, make a conversion factor from the relationship, with the unit you want on top and millimetres of mercury on the bottom.', show: 'plan.0' },
        { say: 'Second, multiply, so that millimetres of mercury cancel.', show: 'plan.1' },
        { say: 'Third, check the size. The same pressure is a small number in atmospheres and a middling one in kilopascals.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: To atmospheres',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'a',
          size: 'lg',
          lines: ['615\\ \\cancel{\\text{mm Hg}} \\times \\dfrac{1\\ \\text{atm}}{760\\ \\cancel{\\text{mm Hg}}}', '= 0.8092\\ \\text{atm} \\approx \\good{0.809\\ \\text{atm}}'],
        },
      ],
      lines: [
        { say: 'Step one: atmospheres. We want atmospheres on top, so the factor is one atmosphere over 760 millimetres of mercury. The millimetres of mercury cancel.', show: 'a.0', caption: 'Step one: atmospheres. We want atm on top, so the factor is 1 atm over 760 mm Hg. The mm Hg cancel.' },
        { say: '615 divided by 760 is zero point eight zero nine two. The reading has three significant figures, so the answer is zero point eight zero nine atmospheres.', show: 'a.1', focus: 'a.1', caption: '615 ÷ 760 = 0.8092. The reading has three significant figures, so the answer is 0.809 atm.' },
      ],
    },
    {
      chapter: 'Step 2: To kilopascals',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'k',
          size: 'lg',
          lines: ['615\\ \\cancel{\\text{mm Hg}} \\times \\dfrac{101.325\\ \\text{kPa}}{760\\ \\cancel{\\text{mm Hg}}}', '= 81.99\\ \\text{kPa} \\approx \\good{82.0\\ \\text{kPa}}'],
        },
      ],
      lines: [
        { say: 'Step two: kilopascals. Now we want kilopascals on top, so the factor is 101.325 kilopascals over 760 millimetres of mercury.', show: 'k.0', caption: 'Step two: kilopascals. Now we want kPa on top, so the factor is 101.325 kPa over 760 mm Hg.' },
        { say: '615 times 101.325, divided by 760, is 81.99, which is 82.0 kilopascals to three significant figures.', show: 'k.1', focus: 'k.1', caption: '615 × 101.325 ÷ 760 = 81.99, which is 82.0 kPa to three significant figures.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Unit', 'Denver', 'Sea level'],
          rows: [
            ['mm Hg', '615', '760'],
            ['atm', '**0.809**', '1'],
            ['kPa', '**82.0**', '101.325'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer: zero point eight zero nine atmospheres, and 82.0 kilopascals. That matches the book.', show: 'ans', caption: 'Here is the whole answer: 0.809 atm, and 82.0 kPa. That matches the book.' },
        { say: 'A quick check: each Denver value is about 81 percent of the sea-level value in the same unit, which is what we expect a mile up, where there is less air above.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['$467\\,400\\ \\text{atm}$', 'Multiplied by 760: the factor was **upside down**'],
            ['$62\\,315\\ \\text{kPa}$', 'Multiplied by 101.325 but **forgot** to divide by 760'],
            ['$6.07\\ \\text{kPa}$', 'Divided by 101.325, as if 1 mm Hg were 1 kPa'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Multiplying by 760, which gives four hundred sixty-seven thousand atmospheres. The factor was upside down, so the units do not cancel. The answer should be smaller than one.', focus: 'traps.0' },
        { say: 'Multiplying by 101.325 and stopping there. That treats millimetres of mercury as if they were atmospheres. You must also divide by 760.', focus: 'traps.1' },
        { say: 'And dividing by 101.325, as if one millimetre of mercury were one kilopascal. Always build the factor from the full relationship.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A weather balloon measures a pressure of $0.85\\ \\text{atm}$. What is this in millimetres of mercury?',
          choices: ['$0.0011\\ \\text{mm Hg}$', '$646\\ \\text{mm Hg}$', '$86.1\\ \\text{mm Hg}$', '$894\\ \\text{mm Hg}$'],
          answer: 1,
          working: '0.85 atm × 760 mm Hg / 1 atm = 646 mm Hg.',
        },
      ],
      lines: [
        { say: 'Your turn. A weather balloon measures a pressure of zero point eight five atmospheres. What is this in millimetres of mercury? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. A weather balloon measures a pressure of 0.85 atm. What is this in mm Hg? Pause the video and try it.' },
        { say: 'Multiply by 760 millimetres of mercury over one atmosphere: zero point eight five times 760 is 646 millimetres of mercury, choice B.', show: 'q2.answer', caption: 'Multiply by 760 mm Hg over 1 atm: 0.85 × 760 = 646 mm Hg, choice B.' },
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
          items: ['$1\\ \\text{atm} = 101.325\\ \\text{kPa} = 760\\ \\text{mm Hg}$', 'Unit you want on **top**, unit you have on the **bottom**', 'Check the size of the answer'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. One atmosphere equals 101.325 kilopascals, which equals 760 millimetres of mercury.', show: 'sum.0', caption: 'Here is what to remember. 1 atm = 101.325 kPa = 760 mm Hg.' },
        { say: 'To convert, multiply by a factor with the unit you want on top and the unit you have on the bottom.', show: 'sum.1' },
        { say: 'And check that the size of the answer makes sense. For more on pressure and temperature, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
