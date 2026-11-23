import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 1.2 (uncertainty and tolerance). The question is a problem
// from OpenStax College Physics 2e, word for word (section 1.3, Accuracy, Precision, and
// Significant Figures, CC BY-NC-SA 4.0), with its section's instruction in front of it.
// (a) 2.0/90 = 0.022 = 2.2%. (b) 2.2% of 60 km/h is about 1.3 km/h, so the speed is 60 ± 1.3 km/h,
// from about 59 to 61 km/h, as in the book's answer.

const QUESTION =
  'Express your answers to problems in this section to the correct number of significant figures and proper units. (a) If your speedometer has an uncertainty of 2.0 km/h at a speed of 90 km/h, what is the percent uncertainty? (b) If it has the same percent uncertainty when it reads 60 km/h, what is the range of speeds you could be going?';

const video: Explainer = {
  id: 'xq-m303-1-2',
  lessonId: '',
  exam: {
    lesson: 'm303-1-2',
    source: 'OpenStax, College Physics 2e, Problem for section 1.3, Accuracy, Precision, and Significant Figures',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-physics-2e/pages/1-3-accuracy-precision-and-significant-figures',
    question: QUESTION,
  },
  title: 'Exam Question: A Speedometer’s Percent Uncertainty and Range (Uncertainty and Tolerance)',
  thumbnailTitle: 'How Fast Could You Be Going?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a speedometer is uncertain by 2.0 km/h at 90 km/h. (a) What is its percent uncertainty? (b) With the same percent uncertainty at 60 km/h, what range of speeds could you be going? (a) 2.0/90 is 2.2%. (b) 2.2% of 60 km/h is about 1.3 km/h, so the speed is 60 ± 1.3 km/h, about 59 to 61 km/h. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Fast Could You Be Going?', subtitle: 'Uncertainty and tolerance, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about uncertainty. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Express your answers to problems in this section to the correct number of significant figures and proper units. (a) If your speedometer has an uncertainty of $2.0$ km/h at a speed of $90$ km/h, what is the percent uncertainty? (b) If it has the same percent uncertainty when it reads $60$ km/h, what is the range of speeds you could be going?',
          answer: '(a) $2.2\\%$ (b) about $59$ to $61$ km/h',
          working: '(a) $\\dfrac{2.0}{90} \\approx 0.022$ (b) $0.022 \\times 60 \\approx 1.3$, so $60 \\pm 1.3$ km/h.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this section.', show: 'q' },
        { say: 'Express your answers to problems in this section to the correct number of significant figures and proper units.' },
        { say: 'Part "a": if your speedometer has an uncertainty of 2.0 kilometres per hour at a speed of 90 kilometres per hour, what is the percent uncertainty? Part b: if it has the same percent uncertainty when it reads 60 kilometres per hour, what is the range of speeds you could be going?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The speedometer is never exactly right. First, how big is its error as a **percent**? Then use that **same percent** at a lower speed to find the lowest and highest possible speeds.' }],
      lines: [
        { say: 'The speedometer is never exactly right. First we find how big its error is, as a percent of the reading.', show: 't' },
        { say: 'Then we use that same percent at 60 kilometres per hour, to find the lowest and highest speeds you could really be going.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\%\\,\\text{uncertainty} = \\dfrac{\\text{uncertainty}}{\\text{reading}} \\times 100\\%'] },
        { kind: 'callout', id: 'r', tone: 'key', title: 'The range', md: 'A reading $R$ with uncertainty $u$ means anything from $R - u$ to $R + u$, written $R \\pm u$.' },
      ],
      lines: [
        { say: 'Here is what we need. The percent uncertainty is the uncertainty divided by the reading, times 100%.', show: 'f' },
        { say: 'And a reading R with uncertainty u means the true value is anywhere from R minus u to R plus u. We write R plus or minus u.', show: 'r' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Find the **percent** uncertainty at $90$ km/h', '(b) Use the same percent to find the uncertainty at $60$ km/h', 'Write the **range**: lowest to highest'] }],
      lines: [
        { say: 'Here is the plan. First, for part "a", find the percent uncertainty at 90.', show: 'plan.0' },
        { say: 'Second, use the same percent to find the uncertainty at 60.', show: 'plan.1' },
        { say: 'Third, write the range, from the lowest speed to the highest.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The percent',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{2.0}{90} = 0.0222\\ldots', '\\times 100\\% \\approx \\good{2.2\\%}'] }],
      lines: [
        { say: 'Step one, part "a". Divide the uncertainty by the reading: 2.0 over 90 is 0.0222 and so on.', show: 'm.0' },
        { say: 'Times 100% is about 2.2%. Two significant figures, like 2.0.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Uncertainty at 60',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.0222 \\times 60 \\approx \\good{1.3 \\text{ km/h}}'] }],
      lines: [
        { say: 'Step two, part b. The percent stays the same, so take 2.2% of 60: 0.0222 times 60 is about 1.3 kilometres per hour.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: The range',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['60 \\pm 1.3 \\text{ km/h}', '60 - 1.3 = 58.7, \\quad 60 + 1.3 = 61.3', '\\text{about } \\good{59 \\text{ to } 61 \\text{ km/h}}'] }],
      lines: [
        { say: 'Step three. The reading is 60, plus or minus 1.3.', show: 'm.0' },
        { say: 'The lowest speed is 58.7, and the highest is 61.3.', show: 'm.1' },
        { say: 'Rounded to whole numbers, like the reading, you could be going about 59 to 61 kilometres per hour.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1.3}{60} \\approx 0.022 = 2.2\\% \\ \\checkmark', '\\text{lower speed, smaller error: } 1.3 < 2.0 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 1.3 over 60 is about 0.022, the same 2.2% as before.', show: 'm.0' },
        { say: 'And it makes sense: at a lower speed, the same percent is a smaller error, 1.3 instead of 2.0. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$58$ to $62$ km/h', 'the **percent** stays the same, not the $2.0$ km/h'],
            ['$\\dfrac{90}{2.0}$', 'the uncertainty goes on **top**'],
            ['only $61.3$ km/h', 'a range has **two** ends: low and high'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not use plus or minus 2.0 again at 60. The question keeps the same percent, not the same number of kilometres per hour.' },
        { say: 'The uncertainty goes on top, divided by the reading.' },
        { say: 'And a range has two ends. Give both the lowest and the highest speed.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A resistor is labelled $200\\ \\Omega$ with a tolerance of $\\pm 5\\%$. What range of resistance is acceptable?',
          choices: ['$195$ to $205\\ \\Omega$', '$199$ to $201\\ \\Omega$', '$190$ to $210\\ \\Omega$', '$100$ to $300\\ \\Omega$'],
          answer: 2,
          working: '$5\\%$ of $200$ is $10$: $\\ 200 \\pm 10$, from $190$ to $210\\ \\Omega$.',
        },
      ],
      lines: [
        { say: 'Your turn. A resistor is labelled 200 ohms with a tolerance of plus or minus 5%. What range of resistance is acceptable? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '5% of 200 is 10, so the resistance can be 200 plus or minus 10: from 190 to 210 ohms, choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent uncertainty: $\\dfrac{\\text{uncertainty}}{\\text{reading}} \\times 100\\%$', 'Same percent, new reading: **multiply** again', 'Range: reading $\\pm$ uncertainty', 'Give **both** ends of the range'] }],
      lines: [
        { say: 'Here is what to remember. The percent uncertainty is the uncertainty over the reading, times 100%.', show: 'sum.0' },
        { say: 'For the same percent at a new reading, multiply the percent by the new reading.', show: 'sum.1' },
        { say: 'The range is the reading, plus or minus the uncertainty.', show: 'sum.2' },
        { say: 'And give both ends of the range. For more on uncertainty and tolerance, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
