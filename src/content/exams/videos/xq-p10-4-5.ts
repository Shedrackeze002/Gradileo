import type { Explainer, WaveEl } from '@/video/script.ts';

// Exam question for Grade 10 lesson 4.5 (the electromagnetic spectrum): calculate the frequency of
// yellow light with a wavelength of 6.00 × 10⁻⁷ m. The question is OpenStax Physics' own (the
// worked example "Frequency and Wavelength Calculation", section 15.2, CC BY 4.0), in the words of
// its OpenStax exercise, with the four choices that exercise gives. f = c ÷ λ = 3.00 × 10⁸ ÷
// 6.00 × 10⁻⁷ = 0.500 × 10¹⁵ = 5.00 × 10¹⁴ Hz (choice d). 5.00 × 10¹⁵ Hz forgets that 3 ÷ 6 is
// 0.5, and the two small choices lose track of the powers of ten.
//
// The picture (src/video/wave.ts) is not to scale: no screen could show 500 trillion waves a
// second, so it runs a slow stand-in for the light, with the sizes left off.

const light: WaveEl = {
  kind: 'wave',
  id: 'lt',
  span: [0, 12],
  height: 380,
  mark: 7,
  ruler: false,
  values: false,
  lanes: [{ id: 'yellow', kind: 'transverse', label: 'Yellow light (not to scale)', frequency: 1.5, amplitude: 2, speed: 4, full: true, tone: 'theta' }],
  poster: 'on',
  clips: {
    on: { reset: true, phases: [{ dur: 4 }] },
    count: { reset: true, phases: [{ dur: 2 }] },
  },
};

const QUESTION = 'Calculate the frequency of yellow light with a wavelength of 6.00 × 10⁻⁷ m.';
const CHOICES = ['5.00 × 10⁷ Hz', '5.00 × 10⁸ Hz', '5.00 × 10¹⁵ Hz', '5.00 × 10¹⁴ Hz'];

const video: Explainer = {
  id: 'xq-p10-4-5',
  lessonId: '',
  exam: {
    lesson: 'p10-4-5',
    source: 'OpenStax, Physics, Worked Example "Frequency and Wavelength Calculation", section 15.2, The Behavior of Electromagnetic Radiation',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/15-2-the-behavior-of-electromagnetic-radiation',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: The Frequency of Yellow Light. f = c ÷ λ',
  thumbnailTitle: 'The Frequency of Light',
  thumbnail: 'lt',
  summary:
    'A real test question, solved one small step at a time: yellow light has a wavelength of 6.00 × 10⁻⁷ m, and we find its frequency. We use the wave equation with the speed of light, f = c ÷ λ, and divide the numbers and the powers of ten separately. Then we check the answer by multiplying back and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Frequency of Light', subtitle: 'Light as a wave, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about yellow light. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Calculate the frequency of yellow light with a wavelength of $6.00 \\times 10^{-7}$ m.',
          choices: ['$5.00 \\times 10^{7}$ Hz', '$5.00 \\times 10^{8}$ Hz', '$5.00 \\times 10^{15}$ Hz', '$5.00 \\times 10^{14}$ Hz'],
          answer: 3,
          working: '$f = \\dfrac{c}{\\lambda} = \\dfrac{3.00 \\times 10^{8}}{6.00 \\times 10^{-7}} = 0.500 \\times 10^{15} = 5.00 \\times 10^{14}$ Hz.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Calculate the frequency of yellow light with a wavelength of 6.00 times ten to the minus seven metres.' },
        { say: 'The choices are 5.00 times ten to the seven, ten to the eight, ten to the fifteen, and ten to the fourteen hertz. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [light, { kind: 'text', id: 'plain', size: 'lg', md: 'How many waves of yellow light pass **each second**?' }],
      lines: [
        { say: 'Let us picture it. Light is a wave, and here is a stand-in for yellow light. It is not to scale: the real waves are far too small and far too fast to draw.', show: 'lt', play: 'lt.on', playDelay: 0.5 },
        { say: 'Each wave of yellow light is only 6.00 times ten to the minus seven metres long: less than a thousandth of a millimetre.', show: 'lt.wavelength' },
        { say: 'The frequency is the number of waves that pass a point each second. The question asks: how many?', show: 'plain' },
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
          title: 'The wave equation, for light',
          md: 'All light travels through space at the **speed of light**, $c = 3.00 \\times 10^{8}$ m/s. Like any wave, $c = f\\lambda$, so $f = \\dfrac{c}{\\lambda}$. To divide numbers in **scientific notation**, divide the front numbers, and **subtract** the powers of ten.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$\\dfrac{8 \\times 10^{6}}{2 \\times 10^{2}} = 4 \\times 10^{6-2} = 4 \\times 10^{4}$' },
      ],
      lines: [
        { say: 'Here is what we need. All light travels through space at the speed of light: three times ten to the eight metres per second.', show: 'def' },
        { say: 'Light is a wave, so its speed is the frequency times the wavelength. That means the frequency is the speed of light divided by the wavelength.' },
        { say: 'And to divide numbers in scientific notation, divide the front numbers, and subtract the powers of ten. For example, eight times ten to the six, over two times ten to the two, is four times ten to the six minus two: four times ten to the four.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Write $f = \\dfrac{c}{\\lambda}$', 'Divide the **front numbers**', 'Subtract the **powers of ten**', 'Tidy into scientific notation'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, write the frequency as the speed of light over the wavelength.', show: 'plan.0' },
        { say: 'Second, divide the front numbers.', show: 'plan.1' },
        { say: 'Third, subtract the powers of ten.', show: 'plan.2' },
        { say: 'Fourth, tidy the answer into proper scientific notation.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Set it up',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f = \\dfrac{c}{\\lambda} = \\dfrac{\\adj{3.00} \\times \\opp{10^{8}}}{\\adj{6.00} \\times \\opp{10^{-7}}}'] }],
      lines: [
        { say: 'Step one. The frequency is the speed of light, three times ten to the eight, divided by the wavelength, six times ten to the minus seven.', show: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: The front numbers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\adj{3.00}}{\\adj{6.00}} = \\adj{0.500}'] }],
      lines: [
        { say: 'Step two. Divide the front numbers: three divided by six is a half, 0.500.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: The powers of ten',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\opp{10^{8}}}{\\opp{10^{-7}}} = 10^{8 - (-7)}', '= \\opp{10^{15}}'] }],
      lines: [
        { say: 'Step three. Subtract the powers of ten: eight minus minus seven.', show: 'm.0' },
        { say: 'Taking away a minus seven is the same as adding seven, so it is eight plus seven: ten to the fifteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 4: Tidy up',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f = \\adj{0.500} \\times \\opp{10^{15}}', '= 5.00 \\times 10^{-1} \\times 10^{15}', '= \\good{5.00 \\times 10^{14}\\ \\text{Hz}}'] }],
      lines: [
        { say: 'Step four. Put the two parts together: 0.500 times ten to the fifteen.', show: 'm.0' },
        { say: 'But in scientific notation the front number must be at least one. 0.500 is five times ten to the minus one.', show: 'm.1' },
        { say: 'So the power drops by one: 5.00 times ten to the fourteen hertz. That is choice D.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [light, { kind: 'math', id: 'm', size: 'md', lines: ['f\\lambda = 5.00 \\times 10^{14} \\times 6.00 \\times 10^{-7} = 30.0 \\times 10^{7} = 3.00 \\times 10^{8}\\ \\text{m/s}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by multiplying back. The frequency times the wavelength should give the speed of light.', show: ['lt', 'm.0'] },
        { say: 'Five times six is thirty, and ten to the fourteen times ten to the minus seven is ten to the seven. Thirty times ten to the seven is three times ten to the eight: the speed of light.' },
        { say: 'So five hundred trillion waves of yellow light pass a point every second. Watch the waves passing the post, and imagine that number every second.', show: 'lt.count', play: 'lt.count', playDelay: 0.3 },
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
            ['$5.00 \\times 10^{15}$ Hz', '$8 + 7 = 15$ is right, but forgot that $3 \\div 6 = 0.5$'],
            ['$5.00 \\times 10^{7}$ Hz', 'Lost the $10^{-7}$: just $3 \\times 10^{8} \\div 6$'],
            ['$5.00 \\times 10^{8}$ Hz', 'Lost track of the **powers of ten**'],
            ['$5.00 \\times 10^{14}$ Hz', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '5.00 times ten to the fifteen is the sneakiest. It gets the powers of ten right, but forgets that three divided by six is a half, not five. Tidying up 0.5 drops the power by one.' },
        { say: '5.00 times ten to the seven loses the ten to the minus seven altogether: it is just three times ten to the eight, divided by six.' },
        { say: 'And 5.00 times ten to the eight also loses track of the powers of ten. When the numbers have the same front digits, the powers of ten decide the answer, so take them one careful step at a time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A radio station broadcasts at a frequency of 1.0 × 10⁸ Hz. What is the wavelength of its radio waves? Use c = 3.0 × 10⁸ m/s.',
          choices: ['3.0 × 10¹⁶ m', '3.0 m', '0.33 m', '3.0 × 10⁸ m'],
          answer: 1,
          working: '$\\lambda = \\dfrac{c}{f} = \\dfrac{3.0 \\times 10^{8}}{1.0 \\times 10^{8}} = 3.0 \\times 10^{0} = 3.0$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A radio station broadcasts at a frequency of 1.0 times ten to the eight hertz. What is the wavelength of its radio waves? Use three times ten to the eight metres per second for the speed of light. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The wavelength is the speed of light divided by the frequency. Three over one is three, and ten to the eight minus eight is ten to the zero, which is one. So three metres. That is choice B. 0.33 is upside down, and ten to the sixteen multiplied.', show: 'q2.answer' },
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
          items: ['Light is a wave: $c = f\\lambda$, with $c = 3.00 \\times 10^{8}$ m/s', 'So $f = \\dfrac{c}{\\lambda}$', 'Divide the front numbers, **subtract** the powers', 'Check: $f\\lambda$ gives back $c$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Light is a wave, so the speed of light is the frequency times the wavelength.', show: 'sum.0' },
        { say: 'So the frequency is the speed of light divided by the wavelength.', show: 'sum.1' },
        { say: 'In scientific notation, divide the front numbers and subtract the powers of ten, then tidy up.', show: 'sum.2' },
        { say: 'And check by multiplying back to the speed of light. For more on the electromagnetic spectrum, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
