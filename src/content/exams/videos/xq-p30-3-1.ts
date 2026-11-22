import type { Explainer, LightEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 3.1 (electromagnetic waves and the speed of light): Saturn is
// 1.43 × 10¹² m from the Sun; how many minutes does the Sun's light take to reach it? The question
// is OpenStax Physics' own, word for word, with its four choices (a Problem for section 15.2, CC
// BY 4.0). t = d ÷ c = 1.43 × 10¹² ÷ 3.00 × 10⁸ = 4.77 × 10³ s, and ÷ 60 that is 79.4 minutes
// (choice d). 3.4 × 10⁻⁶ comes from c ÷ d, and the two large choices slip powers of ten.
//
// The picture (src/video/light.ts) is a flash from the Sun to Saturn: the clock, in minutes, is
// worked out from the distance and the speed of light, and stops at 79.4 when the flash arrives.

const trip: LightEl = {
  kind: 'light',
  id: 'sim',
  trip: { from: { shape: 'sun', label: 'The Sun' }, to: { shape: 'saturn', label: 'Saturn' }, metres: 1.43e12, clock: { unit: 'min', seconds: 60 } },
  // 4767 s of the model in about 8 s of video.
  rate: 600,
  height: 360,
  poster: 'go',
  thumb: ['clock', 'distance'],
  clips: { go: { phases: [{ dur: 8.8, send: true }] } },
};

const QUESTION = 'Saturn is 1.43 × 10¹² m from the Sun. How many minutes does it take the Sun’s light to reach Saturn?';
const CHOICES = ['7.94 × 10⁹ minutes', '3.4 × 10⁴ minutes', '3.4 × 10⁻⁶ minutes', '79.4 minutes'];

const video: Explainer = {
  id: 'xq-p30-3-1',
  lessonId: '',
  exam: {
    lesson: 'p30-3-1',
    source: 'OpenStax, Physics, Problem for section 15.2, The Behavior of Electromagnetic Radiation',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/15-2-the-behavior-of-electromagnetic-radiation',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: How Long Does Sunlight Take to Reach Saturn? The Speed of Light',
  thumbnailTitle: 'Sunlight to Saturn',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: Saturn is 1.43 × 10¹² m from the Sun, and we find how many minutes the Sun’s light takes to get there. We divide the distance by the speed of light, 3.00 × 10⁸ m/s, and change seconds to minutes. Then we send a flash of light from the Sun to Saturn and watch the clock, and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sunlight to Saturn', subtitle: 'The speed of light, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about how long light takes to cross the solar system. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: QUESTION,
          choices: ['$7.94 \\times 10^{9}$ minutes', '$3.4 \\times 10^{4}$ minutes', '$3.4 \\times 10^{-6}$ minutes', '$79.4$ minutes'],
          answer: 3,
          working: '$t = \\dfrac{d}{c} = \\dfrac{1.43 \\times 10^{12}}{3.00 \\times 10^{8}} = 4.77 \\times 10^{3}$ s, and $\\dfrac{4767}{60} = 79.4$ minutes.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Saturn is 1.43 times ten to the twelve metres from the Sun. How many minutes does it take the Sun\'s light to reach Saturn?' },
        { say: 'The choices are 7.94 times ten to the nine minutes, 3.4 times ten to the four minutes, 3.4 times ten to the minus six minutes, and 79.4 minutes. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [trip, { kind: 'text', id: 'plain', size: 'md', md: 'How long is the light’s **journey**, in minutes?' }],
      lines: [
        { say: 'Let us picture it. Here is the Sun, and here is Saturn, 1.43 times ten to the twelve metres away. That is about ten times as far as the Earth.', show: ['sim', 'sim.distance'] },
        { say: 'Light is fast, but not infinitely fast. Send a flash from the Sun, and start a clock. The question asks what the clock reads when the flash reaches Saturn.', show: ['sim.clock', 'plain'], play: 'sim.go', playDelay: 0.5, wait: 3 },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'The speed of light',
          md: 'Light, and every other electromagnetic wave, travels through space at $c = 3.00 \\times 10^{8}$ m/s. The time for a trip is the **distance divided by the speed**: $t = \\dfrac{d}{c}$, in seconds. There are $60$ seconds in a minute.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'The Sun to the Earth, $1.50 \\times 10^{11}$ m: $t = \\dfrac{1.50 \\times 10^{11}}{3.00 \\times 10^{8}} = 500$ s, about $8.3$ minutes.' },
      ],
      lines: [
        { say: 'Here is what we need. Light, and every other electromagnetic wave, travels through space at three times ten to the eight metres per second.', show: 'def' },
        { say: 'The time for a trip is the distance divided by the speed. That gives seconds, and there are sixty seconds in a minute.' },
        { say: 'For example, the Earth is 1.50 times ten to the eleven metres from the Sun. Sunlight takes five hundred seconds to get here, about eight and a third minutes.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the time in **seconds**: $t = \\dfrac{d}{c}$', 'Change seconds to **minutes**: divide by $60$', 'Check that the answer is sensible'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the time in seconds.', show: 'plan.0' },
        { say: 'Second, change it to minutes, because the question asks for minutes.', show: 'plan.1' },
        { say: 'Third, check that the answer makes sense.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The time in seconds',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['t = \\dfrac{d}{c} = \\dfrac{1.43 \\times 10^{12}\\ \\text{m}}{3.00 \\times 10^{8}\\ \\text{m/s}}', '= 0.477 \\times 10^{12 - 8} = \\adj{4.77 \\times 10^{3}\\ \\text{s}}'] }],
      lines: [
        { say: 'Step one. Divide the distance, 1.43 times ten to the twelve metres, by the speed of light, three times ten to the eight metres per second.', show: 'm.0' },
        { say: '1.43 divided by three is 0.477. For the powers of ten, twelve minus eight is four. So the time is 0.477 times ten to the four seconds, which is 4.77 times ten to the three: about 4,770 seconds.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Minutes',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['t = \\dfrac{4767\\ \\text{s}}{60\\ \\text{s per minute}}', '= \\good{79.4\\ \\text{minutes}}'] }],
      lines: [
        { say: 'Step two. There are sixty seconds in a minute, so divide by sixty.', show: 'm.0' },
        { say: '4,767 divided by sixty is 79.4. The light takes 79.4 minutes, a little over an hour and a quarter. That is choice D.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [trip, { kind: 'text', id: 't', size: 'md', md: 'About $10$ times as far as the Earth, so about $10 \\times 8.3 = 83$ minutes: close to $79.4$. ✓' }],
      lines: [
        { say: 'Let us check it. Send the flash again, and watch the clock. The clock works out the time from the distance and the speed of light.', show: ['sim', 'sim.distance', 'sim.clock', 'sim.travelled'], play: 'sim.go', playDelay: 0.3, wait: 2 },
        { say: 'When the flash reaches Saturn, it reads 79.4 minutes. And it makes sense: Saturn is about ten times as far as the Earth, and sunlight takes about eight minutes to reach us, so about eighty minutes to reach Saturn.', show: 't' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Where it comes from'],
          rows: [
            ['$3.4 \\times 10^{-6}$ minutes', 'Divided **the wrong way up**: $c \\div d$'],
            ['$7.94 \\times 10^{9}$ minutes', 'A slipped **power of ten**: far too long'],
            ['$3.4 \\times 10^{4}$ minutes', 'Far too long: about $24$ days'],
            ['$79.4$ minutes', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '3.4 times ten to the minus six minutes comes from dividing the speed by the distance, the wrong way up. The unit gives it away: metres per second divided by metres is not a time.' },
        { say: 'The two large choices are far too long. 3.4 times ten to the four minutes is more than three weeks, and 7.94 times ten to the nine minutes is longer than ten thousand years. A quick estimate, ten times the Sun to Earth time, rules them out.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The Moon is $3.84 \\times 10^{8}$ m from the Earth. How long does light from the Moon take to reach the Earth?',
          choices: ['1.28 s', '0.781 s', '1.15 × 10¹⁷ s', '128 s'],
          answer: 0,
          working: '$t = \\dfrac{d}{c} = \\dfrac{3.84 \\times 10^{8}}{3.00 \\times 10^{8}} = 1.28$ s.',
        },
      ],
      lines: [
        { say: 'Your turn. The Moon is 3.84 times ten to the eight metres from the Earth. How long does light from the Moon take to reach the Earth? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Divide the distance by the speed of light. The powers of ten cancel, and 3.84 divided by three is 1.28 seconds. That is choice A. 0.781 divided the wrong way up, and 1.15 times ten to the seventeen multiplied.', show: 'q2.answer' },
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
          items: ['Light travels at $c = 3.00 \\times 10^{8}$ m/s', 'Time = distance ÷ speed: $t = \\dfrac{d}{c}$', 'Divide seconds by $60$ for minutes', 'Estimate first: the Sun to the Earth is about $8$ minutes'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Light travels through space at three times ten to the eight metres per second.', show: 'sum.0' },
        { say: 'The time for a trip is the distance divided by the speed of light.', show: 'sum.1' },
        { say: 'To change seconds into minutes, divide by sixty.', show: 'sum.2' },
        { say: 'And estimate first: sunlight takes about eight minutes to reach the Earth. For more on electromagnetic waves and the speed of light, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
