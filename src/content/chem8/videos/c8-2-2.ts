import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c8-2-2',
  lessonId: 'c8-2-2',
  title: 'Metals and Non-metals',
  thumbnail: 'props',
  summary:
    'Metals are shiny, conduct heat and electricity, and are malleable and ductile. Non-metals are mostly dull, brittle insulators, and many are gases. In the periodic table, metals are to the left of the zigzag line, non-metals to its right, and metalloids such as silicon sit next to it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Periodic Table', title: 'Metals and Non-metals', subtitle: 'Two sides of the staircase' }],
      lines: [
        { say: 'About three quarters of the elements are metals. A zigzag line, like a staircase, runs down the right side of the periodic table, with the metals to its left and the non-metals to its right.', show: 'title' },
        { say: 'In this video, you will compare their properties, and learn to decide which kind an element is.' },
      ],
    },
    {
      chapter: 'Properties',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'props',
          head: ['Property', 'Metals', 'Non-metals'],
          rows: [
            ['appearance', 'shiny', 'usually dull'],
            ['conduct heat and electricity?', 'yes, well', 'no: insulators'],
            ['when hit', 'bend or flatten', 'shatter, if solid'],
            ['at room temperature', 'solids', 'many are gases'],
          ],
        },
        { kind: 'callout', id: 'exc', tone: 'mistake', title: 'Exceptions', md: '**Mercury** is a liquid metal. **Graphite**, a form of carbon, is a non-metal that conducts electricity.' },
      ],
      lines: [
        { say: 'Metals are usually shiny, or lustrous. Non-metals are usually dull.', show: ['props', 'props.0'], focus: 'props.0' },
        { say: 'Metals are good conductors of heat and electricity. Non-metals are poor conductors, so they are called insulators.', show: 'props.1', focus: 'props.1' },
        { say: 'Metals are malleable, which means they can be hammered into shape, and ductile, which means they can be drawn into wires. Solid non-metals are brittle: they shatter when hit.', show: 'props.2', focus: 'props.2' },
        { say: 'Metals are solids at room temperature, while many non-metals are gases, like oxygen and nitrogen.', show: 'props.3', focus: 'props.3' },
        { say: 'There are exceptions. Mercury is a metal, but it is a liquid. And graphite, a form of carbon, is a non-metal that conducts electricity.', show: 'exc' },
      ],
    },
    {
      chapter: 'Using the table',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'pos',
          items: [
            'Left of the zigzag line: **metals** (sodium, iron, copper).',
            'Right of the line: **non-metals** (carbon, oxygen, chlorine).',
            'Next to the line: **metalloids** (silicon).',
          ],
        },
      ],
      lines: [
        { say: 'You can also decide from an element’s position. To the left of the zigzag line, and in the middle of the table, are the metals, like sodium, iron and copper.', show: 'pos.0', focus: 'pos.0' },
        { say: 'To the right of the line are the non-metals, like carbon, oxygen and chlorine. Hydrogen is the odd one out: it sits above group one, but it is a non-metal gas.', show: 'pos.1', focus: 'pos.1' },
        { say: 'Right next to the line are the metalloids, which have some properties of each. Silicon is shiny but brittle, and it conducts a little, which makes it useful in computer chips.', show: 'pos.2', focus: 'pos.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An element is a yellow solid that shatters when hit and does not conduct electricity. What is it most likely to be?',
          choices: ['a metal', 'a metalloid', 'a non-metal', 'a liquid metal'],
          answer: 2,
          working: 'It is dull, brittle and an insulator: all non-metal properties. It could be sulfur.',
        },
      ],
      lines: [
        { say: 'Your turn. An element is a yellow solid that shatters when hit and does not conduct electricity. What is it most likely to be? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, a non-metal. It is dull, brittle and an insulator, which are all non-metal properties. In fact, this describes sulfur.', show: 'q.answer' },
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
            'Metals: shiny, conductors, malleable and ductile.',
            'Non-metals: mostly dull, brittle insulators; many are gases.',
            'Metals are left of the zigzag line; non-metals are right of it.',
            'Metalloids, like silicon, sit next to the line.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Metals are shiny, conduct heat and electricity, and are malleable and ductile.', show: 'sum.0' },
        { say: 'Non-metals are mostly dull, brittle insulators, and many are gases.', show: 'sum.1' },
        { say: 'In the periodic table, metals are to the left of the zigzag line and non-metals to its right.', show: 'sum.2' },
        { say: 'And metalloids, like silicon, sit next to the line. Next, you will meet three famous families of elements.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
