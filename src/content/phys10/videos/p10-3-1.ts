import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 3.1: work = force × distance moved along the force. A push moves a crate and the work
// becomes its kinetic energy; the same push on a crate that will not move does no work; and a
// push against friction at a steady speed turns its work into heat. The bars are measured from
// the motion itself (src/video/motion.ts).

const push = (n: number): MotionForce => ({ on: 'crate', name: 'Push', n, tone: 'opp' });
const friction = (n: number): MotionForce => ({ on: 'crate', name: 'Friction', n: -n, resist: true, tone: 'bad' });

// A 40 kg crate on a smooth floor, pushed with 80 N: 2 m/s², so it covers 5 m in √5 seconds.
const smooth: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9],
  height: 400,
  lanes: [{ surface: 'smooth', label: 'A smooth floor' }],
  bodies: [{ id: 'crate', shape: 'block', mass: 40, x: 1.5, width: 1.2 }],
  energy: { max: 480, bars: ['work', 'kinetic'] },
  forceScale: 1.5,
  velocityScale: 20,
  poster: 'push',
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: [push(80)] }] },
    push: { phases: [{ dur: Math.sqrt(5), forces: [push(80)] }] },
  },
};

// The same push on a 400 kg crate that friction holds still: four seconds, no distance, no work.
const stuck: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9],
  height: 400,
  lanes: [{ surface: 'rough', label: 'A much heavier crate' }],
  bodies: [{ id: 'crate', shape: 'block', mass: 400, x: 4.5, width: 2.2 }],
  energy: { max: 480, bars: ['work'] },
  forceScale: 1.5,
  poster: 'push',
  clips: {
    push: { phases: [{ dur: 4, forces: [push(80), friction(80)] }] },
  },
};

// On a rough floor, 60 N of push against 60 N of friction keeps the 40 kg crate at a steady
// 1 m/s: 5 m in five seconds, 300 J of work, and all of it becomes heat.
const rough: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9],
  height: 440,
  lanes: [{ surface: 'rough', label: 'A rough floor, at a steady speed' }],
  bodies: [{ id: 'crate', shape: 'block', mass: 40, x: 1.5, width: 1.2 }],
  energy: { max: 360, bars: ['work', 'kinetic', 'heat'] },
  forceScale: 1.5,
  velocityScale: 40,
  poster: 'push',
  clips: {
    push: { phases: [{ dur: 5, set: { crate: 1 }, forces: [push(60), friction(60)] }] },
  },
};

const video: Explainer = {
  id: 'p10-3-1',
  lessonId: 'p10-3-1',
  title: 'Work',
  thumbnail: 'sim',
  summary:
    'In physics, work is done when a force moves an object: work = force × distance. Watch a push do 400 joules of work on a crate, see why pushing something that does not move does no work at all, and find out where the energy goes when you push against friction.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work, Energy and Power', title: 'Work', subtitle: 'How a force moves energy from place to place' }],
      lines: [
        { say: 'In everyday speech, work means anything that tires you out. In physics, it means something exact.', show: 'title' },
        { say: 'A force doing work is how energy gets moved from one place to another. In this lesson, you will see how to measure it.' },
      ],
    },
    {
      chapter: 'Work done by a force',
      layout: 'center',
      main: [smooth, { kind: 'math', id: 'w', size: 'md', lines: ['\\text{work} = \\opp{\\text{force}} \\times \\text{distance} \\qquad W = Fd = \\opp{80} \\times 5 = \\opp{400\\ \\text{J}}'] }],
      lines: [
        { say: 'Here is a crate on a smooth floor. A student pushes it with a steady force of eighty newtons.', show: 'sim', play: 'sim.ready', playDelay: 2.5 },
        { say: 'Watch the push move the crate through five metres.', show: ['sim.distance', 'sim.energy', 'sim.velocity'], play: 'sim.push', playDelay: 1 },
        { say: 'When a force moves an object, we say the force does work. Work equals force, times the distance moved in the direction of the force. Eighty newtons, times five metres, is four hundred.', show: 'w' },
        { say: 'Work is measured in joules. One joule is the work done when a force of one newton moves an object one metre. So the push did four hundred joules of work.' },
        { say: 'Now look at the crate. It is moving, and it carries those four hundred joules as energy of motion. Doing work transfers energy. That is why work and energy share the same unit.', focus: 'sim.crate' },
      ],
    },
    {
      chapter: 'No movement, no work',
      layout: 'center',
      main: [stuck, { kind: 'text', id: 'none', size: 'md', md: 'No distance moved along the force means **no work** is done on the object.' }],
      lines: [
        { say: 'Now the student pushes just as hard on a much heavier crate. Friction holds it, and it does not move.', show: ['sim', 'sim.clock', 'sim.energy', 'sim.distance'], play: 'sim.push', playDelay: 1.5 },
        { say: 'Four seconds of hard pushing, and the bar has not moved. The force is eighty newtons, but the distance is zero. Eighty times zero is zero.' },
        { say: 'It may be tiring, but no work is done on the crate, because no energy has been transferred to it. Work needs both a force and a movement along that force.', show: 'none' },
        { say: 'The same goes for a waiter carrying a tray across a level room. The force on the tray is upwards, but the tray moves sideways, so that force does no work.' },
      ],
    },
    {
      chapter: 'Where the energy goes',
      layout: 'center',
      main: [rough, { kind: 'math', id: 'heat', size: 'md', lines: ['W = Fd = \\opp{60} \\times 5 = \\opp{300\\ \\text{J}} \;\\rightarrow\; \\bad{300\\ \\text{J of heat}}'] }],
      lines: [
        { say: 'Real floors are rough. Here the first crate is already sliding at a steady speed. The student pushes with sixty newtons, which is just enough to balance friction.', show: ['sim', 'sim.velocity'] },
        { say: 'Watch the work over the next five metres, and watch where it goes.', show: ['sim.distance', 'sim.energy'], play: 'sim.push', playDelay: 1.5 },
        { say: 'The push did sixty times five, which is three hundred joules of work. But the crate is no faster than before, so its kinetic energy has not grown.', show: 'heat' },
        { say: 'The energy has gone into heat. Friction has warmed the crate and the floor. When work is done, the energy always goes somewhere.', focus: 'sim.crate' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A force of 150 N does 900 J of work on a trolley. How far does the trolley move in the direction of the force?',
          choices: ['6 m', '60 m', '750 m', '1050 m'],
          answer: 0,
          working: 'Work = force × distance, so distance $= \\dfrac{W}{F} = \\dfrac{900}{150} = 6\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A force of one hundred and fifty newtons does nine hundred joules of work on a trolley. How far does the trolley move in the direction of the force? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Work is force times distance, so the distance is the work divided by the force. Nine hundred divided by one hundred and fifty is six metres. That is choice A.', show: 'q.answer' },
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
            'Work = force × distance moved in the direction of the force: W = Fd',
            'Work is in joules: 1 J is 1 N moving an object 1 m',
            'No movement along the force means no work is done',
            'Doing work transfers energy: to motion, to height or to heat',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Work equals force times the distance moved in the direction of the force.', show: 'end.0' },
        { say: 'Work is measured in joules. One joule is one newton moving an object one metre.', show: 'end.1' },
        { say: 'If nothing moves along the force, no work is done.', show: 'end.2' },
        { say: 'And doing work transfers energy. It can end up as motion, as height, or as heat.', show: 'end.3' },
      ],
    },
  ],
};

export default video;
