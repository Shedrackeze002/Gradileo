import type { Explainer, FlightEl } from '@/video/script.ts';

// Lesson 1.7, part 1: relative velocity along one line. The river flows at 5 m/s and the boats
// move at 9 m/s through the water, as in the lesson, so a boat covers 840 m of bank in 60 s
// downstream and in 210 s upstream. Every position on screen is the boat's own velocity plus the
// current's, worked out by src/video/flight.ts.

const river = (over: Partial<FlightEl>): FlightEl => ({
  kind: 'flight',
  id: 'sim',
  scene: 'river',
  view: [-110, 900, 0, 280],
  height: 420,
  stream: { v: [5, 0], band: [40, 280] },
  tick: 200,
  strobe: 10,
  velocityScale: 8,
  bodies: [],
  clips: {},
  ...over,
});

/** A log that floats with the current, and a boat that sets off beside it at 9 m/s through the water. */
const drift = river({
  readout: { of: 'boat' },
  poster: 'go',
  bodies: [
    { id: 'boat', shape: 'boat', label: 'Boat', at: [0, 185], v: [9, 0], tone: 'theta' },
    { id: 'log', shape: 'dot', label: 'Log', at: [0, 95], tone: 'opp' },
  ],
  clips: {
    name: { phases: [{ dur: 5, freeze: true }] },
    go: { phases: [{ dur: 50, slow: 0.14 }] },
  },
});

/** Two boats cover 840 m of bank: one downstream at 14 m/s, one upstream at 4 m/s. */
const race = river({
  height: 380,
  bodies: [
    { id: 'down', shape: 'boat', label: 'Downstream', at: [0, 185], v: [9, 0], tone: 'theta' },
    { id: 'up', shape: 'boat', label: 'Upstream', at: [840, 95], v: [-9, 0], tone: 'brand' },
  ],
  clips: {
    name: { phases: [{ dur: 5, freeze: true }] },
    // The boat going downstream arrives after 60 s and stops; the other needs 210 s.
    go: {
      phases: [
        { dur: 60, slow: 0.1 },
        { dur: 150, slow: 0.05, stop: ['down'] },
      ],
    },
  },
});

/** A car at 28 m/s, 75 m behind a truck at 23 m/s: it draws level after 15 s. */
const road: FlightEl = {
  kind: 'flight',
  id: 'sim',
  scene: 'map',
  view: [-20, 460, 0, 80],
  height: 300,
  tick: 20,
  strobe: 5,
  velocityScale: 4,
  bodies: [
    { id: 'truck', label: 'Truck', at: [75, 54], v: [23, 0], tone: 'opp' },
    { id: 'car', label: 'Car', labelAt: 'below', at: [0, 28], v: [28, 0], tone: 'theta' },
  ],
  clips: { go: { phases: [{ dur: 15, slow: 0.45 }] } },
};

const video: Explainer = {
  id: 'p20-1-7',
  lessonId: 'p20-1-7',
  title: 'Relative Velocity, Part 1: Along One Line',
  thumbnailTitle: 'Relative Velocity',
  thumbnail: 'sim',
  summary:
    'A velocity is always measured relative to something. Watch a boat and a floating log carried by the same current, see why a boat is fast downstream and slow upstream, and find how quickly one moving object closes in on another.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Kinematics', title: 'Relative Velocity', subtitle: 'Part 1: along one line' }],
      lines: [
        { say: 'You are sitting on a train. To you, the person in the next seat is not moving at all. To someone on the platform, you are both rushing past at a hundred kilometres per hour.', show: 'title' },
        { say: 'Neither view is wrong. A velocity is always measured relative to something, and that something is called a frame of reference.' },
      ],
    },
    {
      chapter: 'Carried by the current',
      layout: 'center',
      main: [
        drift,
        { kind: 'math', id: 'rule', size: 'md', lines: ['\\good{\\vec{v}_{\\text{boat, bank}}} = \\adj{\\vec{v}_{\\text{boat, water}}} + \\hyp{\\vec{v}_{\\text{water, bank}}}'] },
      ],
      lines: [
        { say: 'Here is a river that flows to the right at five metres per second. A log floats on it, and a boat is about to set off beside the log.', show: 'sim' },
        { say: "The boat's engine drives it at nine metres per second through the water. That is the blue arrow: its velocity relative to the water. The pink arrows are the current, which carries the boat and the log alike.", show: ['sim.own', 'sim.readout'], play: 'sim.name' },
        { say: "Add the two, and you get the green arrow: the boat's velocity relative to the bank. Nine plus five is fourteen metres per second.", show: ['sim.velocity', 'rule'] },
        { say: 'Watch them both, with a mark every ten seconds.', show: ['sim.strobe', 'sim.clock'], play: 'sim.go', playDelay: 2.6 },
        { say: 'Between marks, the log drifted fifty metres and the boat travelled a hundred and forty. But look at the gap between them. It grew by ninety metres every ten seconds. Seen from the log, the boat moves at just nine metres per second.', focus: ['sim.boat', 'sim.log'] },
      ],
    },
    {
      chapter: 'Downstream and upstream',
      layout: 'center',
      main: [
        race,
        { kind: 'math', id: 'speeds', size: 'md', lines: ['\\text{Downstream: } \\adj{9} + \\hyp{5} = \\good{14\\ \\text{m/s}} \\qquad \\text{Upstream: } \\adj{9} - \\hyp{5} = \\good{4\\ \\text{m/s}}'] },
        { kind: 'math', id: 'times', size: 'md', lines: ['t = \\dfrac{840}{14} = 60\\ \\text{s} \\qquad\\qquad t = \\dfrac{840}{4} = 210\\ \\text{s}'] },
      ],
      lines: [
        { say: 'Now two of these boats each travel 840 metres along the bank. One heads downstream, and the other heads upstream. Both engines give nine metres per second through the water.', show: ['sim', 'sim.own', 'sim.velocity'], play: 'sim.name' },
        { say: 'Downstream, the current adds: nine plus five is fourteen metres per second. Upstream, the current takes away: nine minus five leaves only four.', show: 'speeds' },
        { say: 'Watch the two of them.', show: ['sim.strobe', 'sim.clock'], play: 'sim.go', playDelay: 1.2 },
        { say: 'The boat heading downstream needed sixty seconds. The boat heading upstream needed two hundred and ten. A distance along the bank needs the velocity relative to the bank, never the speed through the water.', show: 'times' },
      ],
    },
    {
      chapter: 'Seen from a moving object',
      layout: 'center',
      main: [
        road,
        { kind: 'math', id: 'rel', size: 'md', lines: ['v_{\\text{car, truck}} = 28 - 23 = 5\\ \\text{m/s} \\qquad t = \\dfrac{75}{5} = \\good{15\\ \\text{s}}'] },
      ],
      lines: [
        { say: 'The same idea works for two moving objects. A car travels east at twenty-eight metres per second. Seventy-five metres ahead of it, a truck travels east at twenty-three.', show: ['sim', 'sim.velocity'] },
        { say: 'Seen from the truck, the car approaches at the difference: twenty-eight minus twenty-three, which is five metres per second. So the gap of seventy-five metres closes in fifteen seconds.', show: 'rel' },
        { say: 'Watch the gap close.', show: ['sim.strobe', 'sim.clock'], play: 'sim.go', playDelay: 1.2 },
        { say: 'After fifteen seconds, the car is level with the truck. Each of them drove hundreds of metres along the road, but only the difference between their velocities closed the gap.', focus: ['sim.car', 'sim.truck'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A boat moves at 6 m/s relative to the water in a river that flows at 2 m/s. How long does it take to travel 120 m upstream, measured along the bank?',
          choices: ['$15\\ \\text{s}$', '$30\\ \\text{s}$', '$20\\ \\text{s}$', '$60\\ \\text{s}$'],
          answer: 1,
          working: 'Upstream the current takes away: $6 - 2 = 4\\ \\text{m/s}$ relative to the bank. Time: $\\dfrac{120}{4} = 30\\ \\text{s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A boat moves at six metres per second relative to the water, in a river that flows at two metres per second. How long does it take to travel a hundred and twenty metres upstream, measured along the bank? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Upstream, the current takes away. Six minus two is four metres per second relative to the bank. A hundred and twenty divided by four is thirty seconds. That is choice B.', show: 'q.answer' },
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
            'A velocity is measured **relative to** a frame of reference',
            'Relative to the ground $=$ relative to the carrier $+$ the carrier\'s velocity',
            'Downstream the current **adds**, and upstream it **takes away**',
            'Seen from another moving object: the **difference** of the velocities',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Every velocity is measured relative to a frame of reference.', show: 'sum.0' },
        { say: 'The velocity relative to the ground is the velocity relative to the carrier, plus the velocity of the carrier. The carrier can be a train, the water or the air.', show: 'sum.1' },
        { say: 'Downstream the current adds, and upstream it takes away.', show: 'sum.2' },
        { say: 'And seen from another moving object, use the difference of the two velocities. In part two, the boat turns to cross the river.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
