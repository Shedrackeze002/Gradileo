import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 6.3 (slope of a line): a wheelchair ramp with at most a 1-inch
// rise for each 12-inch run, reaching a door 24 inches up. The question is an exercise from
// OpenStax Elementary Algebra 2e, word for word (section 4.4, Understand Slope of a Line,
// CC BY-NC-SA 4.0), whose answer key gives 288 inches (24 feet). The rule is the one stated in
// the question; the video does not claim it is any place's current building code.

/** The ramp, drawn to scale: a 24-inch rise over a 288-inch run. */
const ramp = (height = 220, run = '288\\text{ in}'): DiagramEl => ({
  kind: 'diagram',
  id: 'r',
  height,
  points: { A: [0, 0], B: [288, 0], C: [288, 24], D: [288, 60] },
  items: [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'A' },
    { kind: 'region', id: 'body', points: ['A', 'B', 'C'], tone: 'brand', shade: 0.25 },
    { kind: 'line', id: 'run', from: 'A', to: 'B', tone: 'adj', weight: 5, label: `\\text{run} = ${run}`, labelSide: 'right', group: 'sides' },
    { kind: 'line', id: 'rise', from: 'B', to: 'C', tone: 'opp', weight: 5, label: '24\\text{ in}', labelSide: 'right', group: 'sides' },
    { kind: 'line', id: 'slope', from: 'A', to: 'C', tone: 'ink', weight: 4 },
    { kind: 'right', id: 'sq', at: 'B', from: 'A', to: 'C' },
    { kind: 'line', id: 'door', from: 'C', to: 'D', tone: 'theta', weight: 6, label: '\\text{door}', labelSide: 'right' },
  ],
});
const RAMP = ['r', 'r.ground', 'r.body', 'r.slope', 'r.door'];

const QUESTION =
  'The rules for wheelchair ramps require a maximum 1-inch rise for a 12-inch run. (a) How long must the ramp be to accommodate a 24-inch rise to the door? (b) Create a model of this ramp.';

const video: Explainer = {
  id: 'xq-m10c-6-3',
  lessonId: '',
  exam: {
    lesson: 'm10c-6-3',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 4.4, Understand Slope of a Line',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/4-4-understand-slope-of-a-line',
    question: QUESTION,
  },
  title: 'Exam Question: How Long Must the Ramp Be? Slope as Rise Over Run',
  thumbnailTitle: 'How Long Must the Ramp Be?',
  thumbnail: 'r',
  summary:
    'A real test question, solved one small step at a time: a wheelchair ramp may rise at most 1 inch for every 12 inches of run, and it must reach a door 24 inches up. We write the slope as rise over run, set 24 over the run equal to 1 over 12, and find a run of 288 inches, or 24 feet. Then we draw the ramp to scale, check, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Long Must the Ramp Be?', subtitle: 'Slope, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the slope of a wheelchair ramp. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'The rules for wheelchair ramps require a maximum $1$-inch rise for a $12$-inch run. (a) How long must the ramp be to accommodate a $24$-inch rise to the door? (b) Create a model of this ramp.',
          answer: '(a) $288$ inches, which is $24$ feet. (b) A ramp rising $24$ in over a run of $288$ in.',
          working: '$\\dfrac{24}{\\text{run}} = \\dfrac{1}{12}$, so the run is $24 \\times 12 = 288$ in.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed, from the wheelchair ramp exercises.', show: 'q' },
        { say: 'The rules for wheelchair ramps require a maximum 1 inch rise for a 12 inch run. Part a: how long must the ramp be to accommodate a 24 inch rise to the door? Part b: create a model of this ramp.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        ramp(220, '\\ ?'),
        { kind: 'text', id: 't', size: 'md', md: 'The ramp must climb $24$ inches to the door, but **gently**: no more than $1$ inch up for every $12$ inches along. How far along must it start?' },
      ],
      lines: [
        { say: 'Let us picture it. A ramp leads up to a door that is 24 inches above the ground.', show: [...RAMP, 'r.rise'] },
        { say: 'The rule in the question keeps the ramp gentle: it may rise at most 1 inch for every 12 inches it runs along the ground. We need to find how long the run must be.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}}'] },
        { kind: 'text', id: 't', size: 'md', md: 'The **rise** is how far up, and the **run** is how far across. A **1-inch rise for a 12-inch run** is a slope of $\\dfrac{1}{12}$.' },
      ],
      lines: [
        { say: 'Here is what we need. The slope is the rise divided by the run. The rise is how far up, and the run is how far across.', show: 'f' },
        { say: 'So a 1 inch rise for a 12 inch run is a slope of 1 over 12. That is the steepest the ramp is allowed to be.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **slope** the rule allows', 'Set $\\dfrac{24}{\\text{run}}$ equal to it, and **solve**', 'Draw the **model**'] }],
      lines: [
        { say: 'Here is the plan. First, write the slope the rule allows.', show: 'plan.0' },
        { say: 'Second, set 24 over the run equal to that slope, and solve for the run.', show: 'plan.1' },
        { say: 'Third, draw the model of the ramp.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The slope',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{slope} = \\dfrac{1\\text{ in}}{12\\text{ in}} = \\dfrac{1}{12}', '\\dfrac{24}{\\text{run}} = \\dfrac{1}{12}'] }],
      lines: [
        { say: 'Step one. The rule allows a rise of 1 inch for each 12 inches of run, a slope of 1 over 12.', show: 'm.0' },
        { say: 'Our ramp rises 24 inches. So 24 over the run must equal 1 over 12.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Solve for the run',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['24 \\text{ is } 24 \\times 1, \\text{ so the run is } 24 \\times 12', '\\text{run} = \\good{288\\text{ in}} = \\dfrac{288}{12}\\text{ ft} = \\good{24\\text{ ft}}'] }],
      lines: [
        { say: 'Step two. The rise of 24 inches is 24 times the 1 inch in the rule. So the run must be 24 times the 12 inches as well.', show: 'm.0' },
        { say: '24 times 12 is 288. The ramp must be 288 inches long, and since 12 inches make a foot, that is 24 feet. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The model',
      layout: 'center',
      main: [ramp(), { kind: 'text', id: 't', size: 'md', md: 'Drawn **to scale**: the ramp is $12$ times longer than it is tall.' }],
      lines: [
        { say: 'Step three. Here is a model of the ramp, drawn to scale. It runs 288 inches along the ground and rises 24 inches to the door.', show: [...RAMP, 'r.sides', 'r.sq'] },
        { say: 'Notice how long and gentle it is: 12 times longer than it is tall. That is part b.', show: 't' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{24}{288} = \\dfrac{1}{12} \\ \\checkmark', '\\text{along the slope: } \\sqrt{288^2 + 24^2} \\approx 289\\text{ in}'] }],
      lines: [
        { say: 'Let us check. 24 over 288 simplifies to 1 over 12, exactly the slope the rule allows.', show: 'm.0' },
        { say: 'And one more thing: the 288 inches is the run along the ground. Measured along its sloping surface, the ramp is only a little longer, about 289 inches, because it is so gentle.', show: 'm.1' },
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
            ['$24 \\div 12 = 2$ in', 'the run is **longer** than the rise: multiply'],
            ['$\\dfrac{\\text{run}}{\\text{rise}}$', 'slope is **rise** over run'],
            ['$288$ feet', 'the answer is in **inches**: $288$ in $= 24$ ft'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Dividing 24 by 12 gives 2 inches, a ramp shorter than it is tall. The run must be 12 times the rise, so multiply.' },
        { say: 'Slope is rise over run, not run over rise.' },
        { say: 'And keep the units: 288 inches, which is 24 feet, not 288 feet.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A road rises $2$ feet for every $50$ feet of road. The grade of a road is its slope written as a percent. What is the grade?',
          choices: ['$25\\%$', '$4\\%$', '$2\\%$', '$0.04\\%$'],
          answer: 1,
          working: '$\\dfrac{2}{50} = \\dfrac{1}{25} = 0.04 = 4\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A road rises 2 feet for every 50 feet of road. The grade of a road is its slope written as a percent. What is the grade? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The slope is rise over run, 2 over 50, which is 1 over 25, or 0.04. As a percent, that is 4 percent, choice B. A is run over rise, C just copies the rise, and D forgot to change 0.04 to a percent.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Slope $= \\dfrac{\\text{rise}}{\\text{run}}$', '$1$ up for $12$ along: slope $\\dfrac{1}{12}$', 'Scale up: $24$ up needs $24 \\times 12$ along', 'Keep the **units**'] }],
      lines: [
        { say: 'Here is what to remember. Slope is rise over run.', show: 'sum.0' },
        { say: 'A rise of 1 for a run of 12 is a slope of 1 over 12.', show: 'sum.1' },
        { say: 'To keep the same slope, scale both: 24 up needs 24 times 12 along.', show: 'sum.2' },
        { say: 'And keep track of the units. For more on slope, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
