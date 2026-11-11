import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-12-1',
  lessonId: 'mx-12-1',
  title: 'Quantities, Units and Modelling in Mechanics',
  thumbnail: 'w',
  summary: 'Mechanics uses SI units: metres, kilograms and seconds, with forces in newtons. To change km/h into m/s, divide by 3.6, so 72 km/h is 20 m/s. Weight is a force, W = mg, so a 1.5 kg bag weighs 14.7 N. Modelling words such as particle, light, inextensible, smooth and uniform each tell us what we may ignore.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mechanics: Kinematics and Forces', title: 'Quantities, Units and Modelling', subtitle: 'The language of mechanics' }],
      lines: [
        { say: 'Mechanics is the part of mathematics that describes how things move, and why they move. A falling stone, a car braking, a crate pulled up a ramp: they all follow the same few rules.', show: 'title' },
        { say: 'Before we can use any of those rules, we need two things. Every quantity must be in the right units, and we need a clear model that says what we will ignore. That is what this video is about.' },
      ],
    },
    {
      chapter: 'SI units',
      layout: 'split',
      leftWidth: 640,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Quantity', 'Unit', 'Symbol'],
          rows: [
            ['length', 'metre', 'm'],
            ['mass', 'kilogram', 'kg'],
            ['time', 'second', 's'],
            ['speed', 'metres per second', 'm/s'],
            ['acceleration', 'metres per second per second', 'm/s²'],
            ['force', 'newton', 'N'],
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'n', tone: 'definition', title: 'One newton', md: 'The force that gives a mass of $1$ kg an acceleration of $1$ m/s².' },
        { kind: 'callout', id: 'v', tone: 'key', title: 'Scalars and vectors', md: 'A **scalar** has only a size: $5$ kg. A **vector** has a size and a direction: $12$ m/s due east.' },
      ],
      lines: [
        { say: 'Scientists everywhere use the same standard units, called SI units. The three base units we need are the metre for length, the kilogram for mass, and the second for time.', show: ['t.0', 't.1', 't.2'], focus: ['t.0', 't.1', 't.2'] },
        { say: 'Every other unit is built from those. Speed is in metres per second, and acceleration, the change in speed each second, is in metres per second per second.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'Force is measured in newtons. One newton is the force that gives a mass of one kilogram an acceleration of one metre per second per second.', show: ['t.5', 'n'], focus: ['t.5', 'n'] },
        { say: 'Some quantities have only a size, such as a mass of five kilograms. These are scalars. Others have a size and a direction, such as a velocity of twelve metres per second due east. These are vectors.', show: 'v' },
      ],
    },
    {
      chapter: 'Changing units',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Write $72$ km/h in metres per second.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['72\\text{ km} = 72\\,000\\text{ m}, \\quad 1\\text{ h} = 3600\\text{ s}', '72\\,000 \\div 3600 = 20\\text{ m/s}', '\\text{or } 72 \\div 3.6 = 20'] },
      ],
      lines: [
        { say: 'Speeds are often given in kilometres per hour, so we change them first. A car travels at seventy two kilometres per hour. What is that in metres per second?', show: 'q' },
        { say: 'Seventy two kilometres is seventy two thousand metres, and one hour is three thousand six hundred seconds.', show: 'm.0', focus: 'm.0' },
        { say: 'So the car covers seventy two thousand metres in three thousand six hundred seconds, which is twenty metres every second.', show: 'm.1', focus: 'm.1' },
        { say: 'Dividing by three point six does both steps at once. So to change kilometres per hour into metres per second, divide by three point six, and to go back, multiply by three point six.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Mass and weight',
      layout: 'split',
      leftWidth: 480,
      left: [
        {
          kind: 'diagram',
          id: 'w',
          height: 440,
          points: { A: [-1, 0], B: [1, 0], C: [1, 1.4], D: [-1, 1.4], M: [0, 0.7], O: [0, 0], W: [0, -1.8], G1: [-2.4, 0], G2: [2.4, 0] },
          items: [
            { kind: 'region', id: 'bag', points: ['A', 'B', 'C', 'D'], tone: 'brand', shade: 0.35 },
            { kind: 'label', id: 'bl', at: 'M', tex: '1.5\\text{ kg}', place: 'center' },
            { kind: 'line', id: 'arr', from: 'O', to: 'W', tone: 'bad', arrow: true, weight: 4 },
            { kind: 'label', id: 'wl', at: 'W', tex: 'W = mg', place: 'below', tone: 'bad' },
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Weight', md: 'The force of gravity on a mass: $W = mg$, with $m$ in **kilograms** and $g = 9.8$ m/s².' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1500\\text{ g} = 1.5\\text{ kg}', 'W = 1.5 \\times 9.8', '= 14.7\\text{ N}'] },
      ],
      lines: [
        { say: 'Mass and weight are different things. Mass is the amount of matter in an object, measured in kilograms. Weight is the force of gravity pulling it down, so weight is measured in newtons.', show: ['w.bag', 'w.bl'] },
        { say: 'Near the Earth, every falling object speeds up at the same rate, g. So the weight is W equals m g, the mass times g. A level questions take g as nine point eight metres per second per second.', show: ['w.arr', 'w.wl', 'def'], focus: 'def' },
        { say: 'A bag of flour has a mass of one thousand five hundred grams. First change the mass into kilograms: it is one point five kilograms.', caption: 'A bag of flour has a mass of 1,500 grams. First change the mass into kilograms: it is 1.5 kilograms.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the weight is one point five times nine point eight, which is fourteen point seven newtons. Using the grams by mistake would make the weight a thousand times too big.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Modelling assumptions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Word', 'It means', 'So we can assume'],
          rows: [
            ['particle', 'its size is ignored', 'its mass is at one point'],
            ['light', 'its mass is ignored', 'the tension is the same all along a string'],
            ['inextensible', 'it does not stretch', 'joined objects share an acceleration'],
            ['smooth', 'there is no friction', 'the contact force is at right angles'],
            ['uniform', 'its mass is spread evenly', 'its weight acts at its centre'],
          ],
        },
      ],
      lines: [
        { say: 'Real objects are complicated, so we choose to simplify them. Each simplification is a modelling assumption, and a few words come up again and again.', show: 't.0', focus: 't.0' },
        { say: 'A particle is an object whose size we ignore, so all its mass is at one point. A light string has no mass, so the tension is the same all along it.', show: 't.1', focus: ['t.0', 't.1'] },
        { say: 'An inextensible string does not stretch, so two objects joined by it move with the same acceleration.', show: 't.2', focus: 't.2' },
        { say: 'A smooth surface has no friction, so it can only push at right angles to itself. And a uniform rod has its mass spread evenly, so its weight acts at its centre.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'When a question asks how to improve a model, name the assumption that is least realistic. For a ball thrown a long way, including air resistance would make it land closer than the model predicts.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A train travels at $54$ km/h. What is its speed in metres per second?',
          choices: ['$194.4$ m/s', '$15$ m/s', '$1.5$ m/s', '$540$ m/s'],
          answer: 1,
          working: 'Divide by $3.6$: $54 \\div 3.6 = 15$ m/s.',
        },
      ],
      lines: [
        { say: 'Your turn. A train travels at fifty four kilometres per hour. What is its speed in metres per second? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Divide by three point six: fifty four divided by three point six is fifteen metres per second. Choice A multiplies by three point six instead.', show: 'q.answer' },
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
          items: ['Use metres, kilograms and seconds, with forces in newtons.', 'km/h to m/s: divide by $3.6$.', 'Weight is a force: $W = mg$, with $m$ in kg and $g = 9.8$ m/s².', 'Modelling words tell us what to ignore.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In mechanics we use metres, kilograms and seconds, and forces in newtons.', show: 'sum.0' },
        { say: 'To change kilometres per hour into metres per second, divide by three point six.', show: 'sum.1' },
        { say: 'Weight is a force, W equals m g, with the mass in kilograms.', show: 'sum.2' },
        { say: 'And words such as particle, light, smooth and uniform each tell us what we can ignore. In the next lesson, we use the constant acceleration formulas. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
