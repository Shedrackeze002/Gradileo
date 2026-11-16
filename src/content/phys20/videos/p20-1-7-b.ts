import type { Explainer, FlightEl } from '@/video/script.ts';

// Lesson 1.7, part 2: crossing a current. One river all the way through: 100 m wide, flowing at
// 3 m/s, with a boat that moves at 5 m/s through the water. Pointing straight across, the boat
// crosses in 20 s and lands 60 m downstream, at 5.83 m/s relative to the bank. Pointing 36.9°
// upstream (the lesson's 3-4-5 triangle), it travels straight across at 4 m/s and takes 25 s.
// Every position on screen is the boat's own velocity plus the current's (src/video/flight.ts).

const river = (over: Partial<FlightEl>): FlightEl => ({
  kind: 'flight',
  id: 'sim',
  scene: 'river',
  // The far bank has land enough for the arrows of a boat that has just arrived.
  view: [-28, 88, -13, 136],
  height: 560,
  stream: { v: [3, 0], band: [0, 100] },
  tick: 20,
  strobe: 5,
  velocityScale: 14,
  bodies: [],
  clips: {},
  ...over,
});

/** The boat points straight across. */
const across = river({
  poster: 'go',
  bodies: [{ id: 'boat', shape: 'boat', at: [0, 0], v: [0, 5], tone: 'theta' }],
  clips: {
    name: { phases: [{ dur: 6, freeze: true }] },
    go: { phases: [{ dur: 20, slow: 0.4 }] },
  },
});

/** The boat points 36.9° upstream, so that it travels straight across. */
const upstream = river({
  bodies: [{ id: 'boat', shape: 'boat', at: [0, 0], v: [-3, 4], tone: 'theta' }],
  clips: {
    name: { phases: [{ dur: 5, freeze: true }] },
    go: { phases: [{ dur: 25, slow: 0.36 }] },
  },
});

/** Both boats leave together: A lands after 20 s, 60 m downstream, and B after 25 s, directly opposite. */
const both = river({
  bodies: [
    { id: 'a', shape: 'boat', label: 'A', labelAt: 'right', at: [0, 0], v: [0, 5], tone: 'theta' },
    { id: 'b', shape: 'boat', label: 'B', labelAt: 'left', at: [0, 0], v: [-3, 4], tone: 'brand' },
  ],
  clips: {
    go: {
      phases: [
        { dur: 20, slow: 0.4 },
        { dur: 5, slow: 0.4, stop: ['a'] },
      ],
    },
  },
});

const video: Explainer = {
  id: 'p20-1-7-b',
  lessonId: 'p20-1-7',
  title: 'Relative Velocity, Part 2: Crossing a Current',
  thumbnailTitle: 'Crossing a Current',
  thumbnail: 'sim',
  summary:
    'A boat points straight across a river, and the current carries it downstream. Watch the two velocities add as arrows, find the crossing time, the drift and the speed relative to the bank, then see the heading that takes the boat straight across, and why that crossing is slower.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Kinematics', title: 'Relative Velocity', subtitle: 'Part 2: crossing a current' }],
      lines: [
        { say: "A boat's velocity relative to the bank is its velocity relative to the water, plus the velocity of the water. In part one, everything moved along one line.", show: 'title' },
        { say: 'Now the boat points across the river, while the current flows along it. The two velocities are at right angles.' },
      ],
    },
    {
      chapter: 'Pointing straight across',
      layout: 'split',
      leftWidth: 540,
      left: [across],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A river is **100 m** wide and flows at **3 m/s**. A boat that moves at **5 m/s** through the water points straight across.' },
        { kind: 'math', id: 'time', size: 'md', lines: ['\\adj{\\text{Crossing time: } t = \\dfrac{100}{5} = 20\\ \\text{s}}'] },
        { kind: 'math', id: 'drift', size: 'md', lines: ['\\hyp{\\text{Drift: } d = 3 \\times 20 = 60\\ \\text{m}}'] },
        { kind: 'math', id: 'speed', size: 'md', lines: ['\\good{v = \\sqrt{5^2 + 3^2} = 5.83\\ \\text{m/s}}'] },
      ],
      lines: [
        { say: 'A river is a hundred metres wide, and flows at three metres per second. A boat that moves at five metres per second through the water points straight across.', show: ['sim', 'q'] },
        { say: "The blue arrow is the boat's velocity relative to the water. The pink arrow is the current, drawn from its tip. The green arrow closes the triangle. It is the boat's velocity relative to the bank.", show: ['sim.own', 'sim.velocity'], play: 'sim.name' },
        { say: 'Watch where the boat really goes.', show: ['sim.trail', 'sim.strobe', 'sim.clock'], play: 'sim.go', playDelay: 1.4 },
        { say: 'The boat pointed straight across the whole way. Yet it travelled along the green arrow, and landed downstream.', focus: 'sim.boat' },
        { say: "The two motions are independent, just like a projectile's. Only the blue arrow carries the boat across. So the crossing time is the width divided by five: twenty seconds.", show: ['sim.legs', 'time'], hide: 'sim.strobe', focus: 'sim' },
        { say: 'In those twenty seconds, the current carried the boat three times twenty: sixty metres downstream.', show: 'drift' },
        { say: 'Its speed relative to the bank comes from Pythagoras: the square root of five squared plus three squared. That is 5.83 metres per second, at thirty-one degrees downstream from straight across.', show: ['speed', 'sim.angle'] },
      ],
    },
    {
      chapter: 'Landing directly opposite',
      layout: 'split',
      leftWidth: 540,
      left: [upstream],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'To land **directly opposite**, the boat must point partly **upstream**.' },
        { kind: 'math', id: 'head', size: 'md', lines: ['\\adj{5}\\sin\\theta = \\hyp{3}', '\\thc{\\theta = 36.9^\\circ}'] },
        { kind: 'math', id: 'slow', size: 'md', lines: ['\\good{v = \\sqrt{5^2 - 3^2} = 4\\ \\text{m/s}}'] },
        { kind: 'math', id: 'long', size: 'md', lines: ['t = \\dfrac{100}{4} = 25\\ \\text{s}'] },
      ],
      lines: [
        { say: 'What if the boat must land directly opposite? Then it has to point partly upstream, so that part of its own velocity cancels the current.', show: ['sim', 'q', 'sim.own', 'sim.velocity'], play: 'sim.name' },
        { say: 'Now the blue arrow is the hypotenuse of the triangle. Its upstream part must equal the current: five sine theta equals three. So theta is 36.9 degrees, upstream from straight across.', show: ['head', 'sim.angle'] },
        { say: 'What is left to carry the boat across? The square root of five squared minus three squared: four metres per second.', show: 'slow' },
        { say: 'Watch it cross.', show: ['sim.trail', 'sim.strobe', 'sim.clock'], hide: 'sim.angle', play: 'sim.go', playDelay: 1.2 },
        { say: 'The boat pointed upstream the whole way, but it travelled straight across. And it took twenty-five seconds: a hundred divided by four.', show: 'long', focus: 'sim.boat' },
      ],
    },
    {
      chapter: 'Which way is faster?',
      layout: 'split',
      leftWidth: 540,
      left: [both],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Boat **A** points straight across. Boat **B** points upstream.' },
        { kind: 'text', id: 'ra', size: 'md', md: '**A** crosses in **20 s**, and lands **60 m** downstream.' },
        { kind: 'text', id: 'rb', size: 'md', md: '**B** lands directly opposite, and takes **25 s**.' },
      ],
      lines: [
        { say: 'Here are both boats, leaving together. Boat A points straight across. Boat B points upstream. Which one reaches the far bank first?', show: ['sim', 'q', 'sim.velocity'] },
        { say: 'Watch the race.', show: ['sim.trail', 'sim.strobe', 'sim.clock'], play: 'sim.go', playDelay: 1.2 },
        { say: 'Boat A wins. All of its own velocity points across, so it crosses in twenty seconds, and lands sixty metres downstream.', show: 'ra', focus: 'sim.a' },
        { say: 'Boat B lands exactly opposite, and pays for it with a slower crossing. So the current changes where a boat lands. It cannot change how long a boat that points straight across takes.', show: 'rb', focus: 'sim.b' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A river is 60 m wide and flows at 2 m/s. A boat points straight across and moves at 4 m/s relative to the water. How far downstream does it land?',
          choices: ['$15\\ \\text{m}$', '$120\\ \\text{m}$', '$67\\ \\text{m}$', '$30\\ \\text{m}$'],
          answer: 3,
          working: 'Crossing time: $t = \\dfrac{60}{4} = 15\\ \\text{s}$. Drift: $2 \\times 15 = 30\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A river is sixty metres wide, and flows at two metres per second. A boat points straight across, and moves at four metres per second relative to the water. How far downstream does it land? Pause the video and try it.', show: 'q', wait: 6 },
        { say: "Find the time first, from the boat's own speed: sixty divided by four is fifteen seconds. In that time, the current carries the boat two times fifteen: thirty metres. That is choice D.", show: 'q.answer' },
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
            'Pointing straight across, a boat is **carried downstream**',
            'Crossing time $= \\dfrac{\\text{width}}{\\text{boat speed}}$, and drift $=$ current $\\times$ time',
            'Speed relative to the bank $= \\sqrt{v_{\\text{boat}}^2 + v_{\\text{current}}^2}$',
            'To travel straight across, point upstream: $\\sin\\theta = \\dfrac{v_{\\text{current}}}{v_{\\text{boat}}}$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A boat that points straight across a current is carried downstream.', show: 'sum.0' },
        { say: "Its crossing time is the width divided by the boat's own speed, and its drift is the current times that time.", show: 'sum.1' },
        { say: 'Its speed relative to the bank comes from Pythagoras, because the two velocities are at right angles.', show: 'sum.2' },
        { say: "And to travel straight across, the boat points upstream, at the angle whose sine is the current's speed divided by the boat's speed.", show: 'sum.3' },
      ],
    },
  ],
};

export default video;
