import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-7-4',
  lessonId: 'cx-7-4',
  title: 'The Maxwell–Boltzmann Distribution',
  thumbnail: false,
  summary:
    'The Maxwell–Boltzmann distribution shows how many gas molecules have each energy. It starts at the origin, peaks at the most probable energy and never meets the axis. Only molecules beyond the activation energy can react. A higher temperature flattens the curve and moves it right, with the same area, so many more molecules exceed the activation energy; a catalyst lowers the activation energy instead.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Atoms and Physical Chemistry', title: 'The Maxwell–Boltzmann Distribution', subtitle: 'Why a little heat goes a long way' }],
      lines: [
        { say: 'In a flask of gas, the molecules do not all move at the same speed. A few crawl, most move at a middling speed, and a few race. Only the fastest can react.', show: 'title' },
        { say: 'In this lesson, you will read a Maxwell Boltzmann distribution, and use it to explain how temperature and catalysts change a rate.', caption: 'In this lesson, you will read a Maxwell–Boltzmann distribution, and use it to explain how temperature and catalysts change a rate.' },
      ],
    },
    {
      chapter: 'Reading the curve',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Starts at the origin: no molecule has zero energy', 'The peak is the most probable energy', 'Never meets the axis: there is no maximum energy', 'Area under the curve = the number of molecules'] },
      ],
      lines: [
        { say: 'The graph plots the number of molecules against their energy, for a gas at one temperature.' },
        { say: 'It starts at the origin, because no molecule has zero energy.', show: 'b.0' },
        { say: 'Its peak is the most probable energy. The mean is a little to the right, because of the long tail.', show: 'b.1' },
        { say: 'The curve never meets the energy axis, because there is no maximum energy.', show: 'b.2' },
        { say: 'And the area under the curve is the total number of molecules.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Activation energy',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Activation energy', md: 'The minimum energy that colliding particles need to react. Only the molecules to the **right** of $E_a$ on the curve can react.' }],
      lines: [
        { say: 'The activation energy is the minimum energy colliding particles need to react.', show: 'def' },
        { say: 'Only the molecules to the right of it on the curve can react. Most collisions fail, because most molecules have less energy than that.' },
      ],
    },
    {
      chapter: 'Temperature and catalysts',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Change', 'Effect on the curve'], rows: [['Higher temperature', 'Peak lower and further right; same area; far more beyond $E_a$'], ['Catalyst', 'Curve unchanged; $E_a$ moves left'], ['Higher concentration', 'Same shape, but taller']] },
      ],
      lines: [
        { say: 'At a higher temperature, the peak moves to the right and gets lower. The area stays the same, because there are the same number of molecules. But the area beyond the activation energy is much larger.', show: 't.0', focus: 't.0' },
        { say: 'That is the main reason a small rise in temperature speeds up a reaction so much.' },
        { say: 'A catalyst does not change the curve at all. It gives a route with a lower activation energy, so the line moves left, and more molecules lie beyond it.', show: 't.1', focus: 't.1' },
        { say: 'A higher concentration keeps the same shape, but makes the curve taller, with more molecules in each unit of volume.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'The hotter curve is not bigger', md: 'A hotter curve spreads out but keeps the **same area**. Drawing it higher everywhere would mean more molecules.' }],
      lines: [{ say: 'A common mistake is to draw the hotter curve higher everywhere. It spreads out but keeps the same area, because the number of molecules has not changed.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How does a catalyst change the Maxwell–Boltzmann distribution for a reaction?',
          choices: ['It moves the peak to the right', 'It makes the curve taller', 'It leaves the curve alone and lowers $E_a$', 'It increases the area under the curve'],
          answer: 2,
          working: 'A catalyst provides a route with a **lower activation energy**. The energies of the molecules, and so the curve, are unchanged.',
        },
      ],
      lines: [
        { say: 'Your turn. How does a catalyst change the Maxwell Boltzmann distribution for a reaction? Pause the video and try it.', caption: 'Your turn. How does a catalyst change the Maxwell–Boltzmann distribution for a reaction? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The curve stays the same, and the activation energy is lowered, so more molecules can react.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The curve starts at the origin and never meets the axis.', 'Only molecules beyond $E_a$ can react.', 'Hotter: lower, wider peak, same area, many more beyond $E_a$.', 'A catalyst lowers $E_a$; the curve is unchanged.'] }],
      lines: [
        { say: 'Let’s sum up. The curve starts at the origin and never meets the energy axis.', show: 'sum.0' },
        { say: 'Only molecules beyond the activation energy can react.', show: 'sum.1' },
        { say: 'A higher temperature gives a lower, wider peak with the same area, and many more molecules beyond the activation energy.', show: 'sum.2' },
        { say: 'And a catalyst lowers the activation energy, leaving the curve unchanged.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
