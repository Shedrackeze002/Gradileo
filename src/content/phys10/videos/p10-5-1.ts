import type { CircuitEl, Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 5.1: charge and current. Two pairs of charges show that like charges repel and unlike
// charges attract; a switch closes and the free electrons in a wire all drift together; the same
// circuit shows conventional current running the other way; an ammeter, a clock and a counter
// show Q = It (2 A for 5 s is 10 C); and charges that go into a lamp bright and come out dim show
// that it is energy, not current, that the lamp takes. The circuits are worked out by
// src/video/circuit.ts, so the readings on screen are the ones the narration uses.

const force = (on: string, n: number, name: string): MotionForce => ({ on, name, n, tone: 'hyp' });
const brake = (on: string): MotionForce => ({ on, name: 'Stops', n: 2, resist: true, hidden: true });

// Two positive charges that push apart, over a positive and a negative charge that pull together.
const pairs: MotionEl = {
  kind: 'motion',
  id: 'q',
  span: [0, 10],
  height: 330,
  plain: true,
  forceScale: 40,
  lanes: [{ label: 'Like charges' }, { label: 'Unlike charges' }],
  bodies: [
    { id: 'a', shape: 'ball', mass: 1, label: '+', x: 4.4, tone: 'opp', lane: 0 },
    { id: 'b', shape: 'ball', mass: 1, label: '+', x: 5.6, tone: 'opp', lane: 0 },
    { id: 'c', shape: 'ball', mass: 1, label: '+', x: 1.5, tone: 'opp', lane: 1 },
    { id: 'd', shape: 'ball', mass: 1, label: '−', x: 8.5, tone: 'adj', lane: 1 },
  ],
  clips: {
    repel: { phases: [{ dur: 1.2, forces: [force('a', -2, 'Repelled'), force('b', 2, 'Repelled')] }, { dur: 1.3, forces: [brake('a'), brake('b')] }] },
    attract: { phases: [{ dur: 1.245, forces: [force('c', 2, 'Attracted'), force('d', -2, 'Attracted')] }, { dur: 1.3, forces: [brake('c'), brake('d')] }] },
  },
};

// A battery, a switch and a lamp: the electrons in the wire drift only while the loop is complete.
const drift: CircuitEl = {
  kind: 'circuit',
  id: 'c',
  volts: 6,
  layout: 'series',
  parts: [{ id: 'lamp', kind: 'lamp', ohms: 3, label: 'Lamp' }],
  open: true,
  carriers: 'electrons',
  height: 430,
  clips: {
    on: { phases: [{ dur: 0.8 }, { dur: 5, set: { closed: true } }] },
    off: { phases: [{ dur: 2, set: { closed: false } }] },
    run: { phases: [{ dur: 7, set: { closed: true } }] },
  },
};

// 12 V across a 6 Ω lamp: 2 A, so 2 C pass the ammeter each second.
const meter: CircuitEl = {
  kind: 'circuit',
  id: 'm',
  volts: 12,
  layout: 'series',
  parts: [{ id: 'lamp', kind: 'lamp', ohms: 6, label: 'Lamp' }],
  open: true,
  height: 400,
  clips: { count: { phases: [{ dur: 5, set: { closed: true } }] } },
};

// The same circuit running: the charges carry energy to the lamp and come back for more.
const carry: CircuitEl = {
  kind: 'circuit',
  id: 'e',
  volts: 12,
  layout: 'series',
  parts: [{ id: 'lamp', kind: 'lamp', ohms: 6, label: 'Lamp' }],
  height: 400,
  poster: 'run',
  clips: { run: { phases: [{ dur: 6 }] } },
};

const video: Explainer = {
  id: 'p10-5-1',
  lessonId: 'p10-5-1',
  title: 'Charge and Current',
  thumbnail: 'e',
  summary:
    'What is electric charge, and what is a current? Watch like charges push apart and unlike charges pull together, see the electrons in a wire start to drift the moment a switch closes, and count the charge passing an ammeter to find Q = It. Then see why the current is the same on both sides of a lamp.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electricity', title: 'Charge and Current', subtitle: 'What flows in a circuit' }],
      lines: [
        { say: 'Pull off a jumper in a dark room, and you may see tiny sparks. Flick a switch, and a lamp lights at once.', show: 'title' },
        { say: 'Both are the work of electric charge. In this lesson, you will see what charge is, and what happens when it flows.' },
      ],
    },
    {
      chapter: 'Electric charge',
      layout: 'center',
      main: [pairs, { kind: 'text', id: 'rule', size: 'md', md: 'Like charges **repel**. Unlike charges **attract**. Charge is measured in **coulombs (C)**.' }],
      lines: [
        { say: 'Everything is made of atoms, and atoms hold two kinds of electric charge. Protons carry positive charge, and electrons carry negative charge.', show: 'q' },
        { say: 'Put two positive charges close together, and they push each other apart. Two negative charges do the same. Like charges repel.', play: 'q.repel', playDelay: 2 },
        { say: 'But a positive charge and a negative charge pull towards each other. Unlike charges attract.', play: 'q.attract', playDelay: 1.5 },
        { say: 'Charge is measured in coulombs. Most objects hold equal amounts of positive and negative charge, so they are neutral.', show: 'rule' },
      ],
    },
    {
      chapter: 'Charge that can move',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rub', tone: 'key', title: 'Only electrons move', md: 'Rubbing moves **electrons** from one object to another. The one that gains electrons becomes **negative**. The one that loses them is left **positive**.' },
        {
          kind: 'table',
          id: 'mat',
          head: ['', 'Charge', 'Why', 'Examples'],
          rows: [
            ['Conductors', 'flows through easily', 'some electrons are free to move', 'copper, aluminium, graphite'],
            ['Insulators', 'cannot flow', 'every electron is held in its atom', 'rubber, glass, plastic'],
          ],
        },
      ],
      lines: [
        { say: 'In a solid, the protons are fixed inside the atoms. Only electrons can move. Rub a plastic rod with a cloth, and electrons move from the cloth onto the rod.', show: 'rub' },
        { say: 'The rod has gained electrons, so it is negatively charged. The cloth has lost them, so it is left positively charged. No charge was made. It was only moved.' },
        { say: 'In a conductor, some electrons are free to move through the material, so charge flows easily. Metals such as copper and aluminium are conductors.', show: ['mat', 'mat.0'] },
        { say: 'In an insulator, such as rubber, glass or plastic, every electron is held in its atom. Charge cannot flow through it.', show: 'mat.1' },
      ],
    },
    {
      chapter: 'Electric current',
      layout: 'center',
      main: [drift, { kind: 'text', id: 'conv', size: 'md', md: '**Conventional current** runs from positive to negative. The electrons drift the other way.' }],
      lines: [
        { say: 'Here is a battery, a switch and a lamp, joined by copper wire. The wire is already full of free electrons, shown in blue. The switch is open, so the loop is not complete.', show: ['c', 'c.charges'] },
        { say: 'Close the switch, and the battery pushes every electron in the loop at once. They all drift round together, and the lamp lights. This steady flow of charge is an electric current.', play: 'c.on', playDelay: 0.5 },
        { say: 'Open the switch, and the flow stops everywhere. A current needs a complete circuit: an unbroken loop of conductor, with a source of energy such as a battery.', play: 'c.off' },
        { say: 'Electrons are negative, so they drift away from the negative terminal of the battery, and round to the positive terminal.', play: 'c.run' },
        { say: 'But circuit diagrams show the current the other way, from positive round to negative. This is called conventional current, and it is the direction we use from now on.', show: ['c.arrows', 'conv'] },
      ],
    },
    {
      chapter: 'Charge, current and time',
      layout: 'center',
      main: [meter, { kind: 'math', id: 'eq', size: 'md', lines: ['\\text{current} = \\dfrac{\\text{charge}}{\\text{time}} \\qquad I = \\dfrac{Q}{t} \\qquad \\thc{Q = It}', 'Q = It = 2 \\times 30 = \\thc{60\\ \\text{C}}'] }],
      lines: [
        { say: 'Current is the rate of flow of charge. It is measured in amperes, with an ammeter. A current of one ampere means that one coulomb of charge passes each second.', show: ['m', 'm.charges', 'm.current'] },
        { say: 'Now the switch closes, and the ammeters read two amperes. So two coulombs pass every second. Watch the charge add up for five seconds.', show: ['m.clock', 'm.charge'], play: 'm.count', playDelay: 2 },
        { say: 'After five seconds, ten coulombs have passed. Two times five is ten. The charge is the current times the time.', caption: 'After five seconds, ten coulombs have passed. Two times five is ten. The charge is the current times the time: Q = It.', show: 'eq.0' },
        { say: 'So if this current of two amperes flows for thirty seconds, the charge is two times thirty, which is sixty coulombs.', show: 'eq.1' },
        { say: 'Check the units first. The current must be in amperes and the time in seconds. Two hundred milliamperes is zero point two amperes, and five minutes is three hundred seconds.' },
      ],
    },
    {
      chapter: 'Current is not used up',
      layout: 'center',
      main: [carry, { kind: 'callout', id: 'same', tone: 'mistake', title: 'Thinking current is used up', md: 'The current is the **same on both sides** of a lamp. The charge carries **energy** to the lamp, and it is the energy that is transferred.' }],
      lines: [
        { say: 'Look at the two ammeters, one on each side of the lamp. They read the same. The current is not used up as it passes through the lamp.', show: ['e', 'e.charges', 'e.current'], play: 'e.run' },
        { say: 'What the lamp takes is energy. Each charge leaves the battery carrying energy, shown here in bright yellow. It gives that energy to the lamp, and comes out dim.', show: 'e.energy', play: 'e.run' },
        { say: 'Then it goes back to the battery, collects more energy, and goes round again. The charge is never used up. It carries the energy, and the lamp turns that energy into light.', show: 'same', play: 'e.run' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'try',
          prompt: 'A current of 3 A flows through a heater for 20 s. How much charge passes through the heater?',
          choices: ['23 C', '6.7 C', '60 C', '0.15 C'],
          answer: 2,
          working: 'Charge = current × time: $Q = It = 3 \\times 20 = 60\\ \\text{C}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A current of three amperes flows through a heater for twenty seconds. How much charge passes through the heater? Pause the video and try it.', show: 'try', wait: 6 },
        { say: 'Charge is current times time. Three times twenty is sixty coulombs. That is choice C.', show: 'try.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'end',
          check: true,
          items: [
            'Charge is positive or negative. Like charges repel, unlike charges attract',
            'Rubbing moves electrons. Charge is never made or destroyed',
            'Conductors have electrons that are free to move. Insulators do not',
            'Current is the rate of flow of charge: Q = It, in amperes',
            'Conventional current runs from positive to negative. Electrons drift the other way',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Charge is positive or negative. Like charges repel, and unlike charges attract.', show: 'end.0' },
        { say: 'Rubbing moves electrons from one object to another. Charge is never made or destroyed.', show: 'end.1' },
        { say: 'Conductors have electrons that are free to move. Insulators do not.', show: 'end.2' },
        { say: 'Current is the rate of flow of charge. Charge equals current times time, with the current in amperes.', show: 'end.3' },
        { say: 'And conventional current runs from positive to negative, while the electrons drift the other way.', show: 'end.4' },
      ],
    },
  ],
};

export default video;
