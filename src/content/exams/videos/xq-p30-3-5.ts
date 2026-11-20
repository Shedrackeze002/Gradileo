import type { Explainer, RipplesEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 3.5 (Young's double-slit experiment): two slits 2.00 μm apart
// put the third-order maximum at 60.0°; what is the wavelength? The question is OpenStax Physics'
// own, word for word, with its four choices (a Problem for section 17.1, CC BY 4.0). d sin θ = mλ,
// so λ = d sin θ ÷ m = 2000 nm × sin 60.0° ÷ 3 = 577 nm (choice d). 667 nm leaves out the sine,
// and 333 nm uses the cosine.
//
// The picture (src/video/ripples.ts) is the two slits as two sources in step, drawn to a scale on
// which one unit is a micrometre: 2.00 apart, with a wavelength of 0.577. The bands of the pattern
// fan out from between them, and a point 60° from the centre line, where the paths differ by three
// wavelengths, is bright.

const SLITS: RipplesEl = {
  kind: 'ripples',
  id: 'sim',
  view: [-8.5, -1.1, 8.5, 6.6],
  speed: 0.577,
  full: true,
  height: 470,
  sources: [
    { id: 's1', label: 'Slit 1', at: [-1, 0], frequency: 1, side: 'below' },
    { id: 's2', label: 'Slit 2', at: [1, 0], frequency: 1, side: 'below' },
  ],
  // 60.0° from the centre line, 5.5 from the middle of the slits.
  listeners: [{ id: 'p', label: 'Third bright line', at: [4.763, 2.75], side: 'right' }],
  poster: 'go',
  clips: { go: { phases: [{ dur: 4, slow: 1.5 }] } },
};

const QUESTION = 'What is the wavelength of light falling on double slits separated by 2.00 μm if the third-order maximum is at an angle of 60.0°?';
const CHOICES = ['667 nm', '471 nm', '333 nm', '577 nm'];

const video: Explainer = {
  id: 'xq-p30-3-5',
  lessonId: '',
  exam: {
    lesson: 'p30-3-5',
    source: 'OpenStax, Physics, Problem for section 17.1, Understanding Diffraction and Interference',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/17-1-understanding-diffraction-and-interference',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: The Wavelength From a Double Slit. d sin θ = mλ',
  thumbnailTitle: 'Double Slit: Find λ',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: light falls on two slits 2.00 μm apart, the third-order bright line is at 60.0°, and we find the wavelength of the light. We use the double-slit equation, d sin θ = mλ, rearrange it for λ, and change metres to nanometres. Then we look at the two slits as two sources of waves to see why that line is bright, and at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Double Slit: Find λ', subtitle: 'Young’s double-slit experiment, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the bright lines that light makes after it passes through two narrow slits. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          choices: ['$667$ nm', '$471$ nm', '$333$ nm', '$577$ nm'],
          answer: 3,
          working: '$\\lambda = \\dfrac{d \\sin\\theta}{m} = \\dfrac{(2.00 \\times 10^{-6})(\\sin 60.0^\\circ)}{3} = 5.77 \\times 10^{-7}$ m $= 577$ nm.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'What is the wavelength of light falling on double slits separated by 2.00 micrometres, if the third-order maximum is at an angle of 60.0 degrees?' },
        { say: 'The choices are 667, 471, 333, and 577 nanometres. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [SLITS, { kind: 'text', id: 'plain', size: 'md', md: 'Which **wavelength** puts the third bright line at $60.0^\\circ$?' }],
      lines: [
        { say: 'Let us picture it, looking down from above, and hugely magnified. Light arrives at two slits only 2.00 micrometres apart. Each slit sends out waves, in step with the other.', show: 'sim', play: 'sim.go' },
        { say: 'Where the waves from the two slits arrive in step, they add up, and the light is bright. They make bright bands that fan out from between the slits.', show: 'sim.pattern' },
        { say: 'Counting out from the centre, the third bright band is at 60.0 degrees. The question asks what wavelength the light must have for that to happen.', show: 'plain' },
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
          title: 'The double-slit equation',
          md: 'Two slits a distance $d$ apart make bright lines (maxima) where the paths from the slits differ by a **whole number of wavelengths**: $d \\sin\\theta = m\\lambda$. The order $m$ counts the bright lines out from the centre ($m = 0, 1, 2, 3, \\ldots$), and $\\theta$ is measured from the **centre line**.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$d = 4.00\\ \\mu$m, first order at $8.63^\\circ$: $\\lambda = 4000 \\times \\sin 8.63^\\circ = 600$ nm.' },
      ],
      lines: [
        { say: 'Here is what we need. The light is bright where the paths from the two slits differ by a whole number of wavelengths.', show: 'def' },
        { say: 'The path difference is d sine theta, so d sine theta equals m lambda. The order, m, counts the bright lines out from the centre: zero for the middle one, then one, two, three. The angle is measured from the centre line.' },
        { say: 'For example, slits four micrometres apart with the first bright line at 8.63 degrees give a wavelength of six hundred nanometres.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Rearrange $d \\sin\\theta = m\\lambda$ for $\\lambda$', 'Put in $d$, $\\theta$ and $m = 3$', 'Change metres to **nanometres**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, rearrange the double-slit equation for the wavelength.', show: 'plan.0' },
        { say: 'Second, put in the slit spacing, the angle, and the order, three.', show: 'plan.1' },
        { say: 'Third, change the answer into nanometres to match the choices.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Rearrange',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['d \\sin\\theta = m\\lambda', '\\lambda = \\dfrac{d \\sin\\theta}{m}'] }],
      lines: [
        { say: 'Step one. Start from d sine theta equals m lambda.', show: 'm.0' },
        { say: 'Divide both sides by m. The wavelength is d sine theta, over m.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The numbers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\lambda = \\dfrac{(2.00 \\times 10^{-6}\\ \\text{m})(\\sin 60.0^\\circ)}{3}', '= \\dfrac{(2.00 \\times 10^{-6})(0.866)}{3} = \\adj{5.77 \\times 10^{-7}\\ \\text{m}}'] }],
      lines: [
        { say: 'Step two. The slits are 2.00 micrometres apart, which is 2.00 times ten to the minus six metres. The order is three, for the third-order maximum.', show: 'm.0' },
        { say: 'The sine of sixty degrees is 0.866. Two times 0.866 is 1.732, and dividing by three gives 0.577. The wavelength is 5.77 times ten to the minus seven metres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Nanometres',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1\\ \\text{nm} = 10^{-9}\\ \\text{m}', '\\lambda = 577 \\times 10^{-9}\\ \\text{m} = \\good{577\\ \\text{nm}}'] }],
      lines: [
        { say: 'Step three. A nanometre is ten to the minus nine metres.', show: 'm.0' },
        { say: '5.77 times ten to the minus seven metres is 577 times ten to the minus nine: 577 nanometres. That is choice D, yellow-green light, right in the middle of the visible spectrum.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [SLITS, { kind: 'text', id: 't', size: 'md', md: 'Path difference $= d \\sin 60.0^\\circ = 1.732\\ \\mu$m $= 3 \\times 0.577\\ \\mu$m: **3 wavelengths**. ✓' }],
      lines: [
        { say: 'Let us check it on the picture. Here the slits are 2.00 apart and the wavelength is 0.577, in micrometres, and the bright bands come from the waves alone.', show: ['sim', 'sim.pattern'], play: 'sim.go' },
        { say: 'Count out from the centre line: the middle band, then one, two, three. The third bright band is at sixty degrees, where the paths from the two slits differ by exactly three wavelengths, and the light there is bright.', show: 't' },
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
            ['$667$ nm', 'Left out the **sine**: $\\dfrac{2000}{3}$'],
            ['$333$ nm', 'Used $\\cos 60.0^\\circ = 0.5$ instead of the **sine**'],
            ['$471$ nm', 'Does not fit $d \\sin\\theta = m\\lambda$'],
            ['$577$ nm', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: '667 nanometres leaves out the sine altogether: two thousand divided by three.' },
        { say: '333 nanometres uses one half, which is the cosine of sixty degrees: the angle is measured from the centre line, so it is the sine that counts. And 471 does not fit the equation at all: put each choice back in to check it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Light with a wavelength of 600 nm falls on two slits $3.00\\ \\mu$m apart. At what angle from the centre line is the first-order bright line?',
          choices: ['0.200°', '78.5°', '11.5°', '23.6°'],
          answer: 2,
          working: '$\\sin\\theta = \\dfrac{m\\lambda}{d} = \\dfrac{(1)(600 \\times 10^{-9})}{3.00 \\times 10^{-6}} = 0.200$, so $\\theta = 11.5^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Light with a wavelength of six hundred nanometres falls on two slits three micrometres apart. At what angle from the centre line is the first-order bright line? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The sine of the angle is m lambda over d: six hundred nanometres over three thousand nanometres, which is 0.200. The angle whose sine is 0.200 is 11.5 degrees. That is choice C. 0.200 is only the sine, 78.5 used the cosine, and 23.6 is the second order.', show: 'q2.answer' },
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
          items: ['Bright lines: $d \\sin\\theta = m\\lambda$', '$m$ counts the bright lines out from the **centre**', 'Measure $\\theta$ from the centre line, and use its **sine**', '$1$ nm $= 10^{-9}$ m, $1\\ \\mu$m $= 10^{-6}$ m'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Two slits make bright lines where d sine theta equals m lambda.', show: 'sum.0' },
        { say: 'The order, m, counts the bright lines out from the centre.', show: 'sum.1' },
        { say: 'Measure the angle from the centre line, and use its sine.', show: 'sum.2' },
        { say: 'And keep track of the units: a nanometre is ten to the minus nine metres, and a micrometre is ten to the minus six. For more on Young\'s double-slit experiment, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
