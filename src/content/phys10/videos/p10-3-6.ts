import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 3.6: efficiency = useful energy out ÷ total energy in × 100%. A motor pulls a 10 kg load
// (98 N) up a shaft 5 m high whose rails rub on it: the energy supplied, the energy stored as
// height and the heat from friction are all measured from the motion (src/video/motion.ts). With
// 98 N of friction it supplies 980 J for 490 J of height (50%); with oiled rails and 42 N of
// friction, 700 J (70%).

const G = 9.8;

const forces = (friction: number): MotionForce[] => [
  { on: 'load', name: 'Pull', n: 10 * G + friction, tone: 'opp' },
  { on: 'load', name: 'Friction', n: -friction, resist: true, tone: 'bad' },
  { on: 'load', name: 'Weight', n: -10 * G, tone: 'hyp' },
];

const shaft = (friction: number, label: string): MotionEl => ({
  kind: 'motion',
  id: 'sim',
  vertical: 'up',
  span: [0, 5],
  height: 420,
  lanes: [{ label }],
  bodies: [{ id: 'load', shape: 'block', mass: 10, x: 0, width: 0.9, tone: 'adj' }],
  energy: { max: 1100, bars: ['work', 'potential', 'heat'], g: G, names: { work: 'Energy supplied', potential: 'Useful: stored as height', heat: 'Wasted: heat' } },
  forceScale: 0.3,
  velocityScale: 30,
  poster: 'up',
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: forces(friction) }] },
    up: {
      phases: [
        { dur: 5, set: { load: 1 }, forces: forces(friction) },
        { dur: 0.001, set: { load: 0 }, forces: forces(friction) },
      ],
    },
  },
});

const dry = shaft(98, 'Dry rails');
const oiled = shaft(42, 'Oiled rails');

const video: Explainer = {
  id: 'p10-3-6',
  lessonId: 'p10-3-6',
  title: 'Efficiency and Energy Transfers',
  thumbnail: 'sim',
  summary:
    'No machine turns all of its energy into what we want. Watch a motor lift a load while friction turns part of the energy into heat, work out its efficiency from the useful energy and the energy supplied, and see how cutting friction makes the same machine more efficient.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work, Energy and Power', title: 'Efficiency and Energy Transfers', subtitle: 'Useful energy, and wasted energy' }],
      lines: [
        { say: 'A petrol engine gets hot, and an electric motor hums and warms up. That heat and sound carry away energy that was meant to do something else.', show: 'title' },
        { say: 'No machine transfers all of the energy it is given in the way we want. Efficiency tells us how close it comes.' },
      ],
    },
    {
      chapter: 'Useful and wasted energy',
      layout: 'center',
      main: [dry, { kind: 'math', id: 'sum', size: 'md', lines: ['\\opp{\\text{total energy in}} = \\hyp{\\text{useful energy out}} + \\bad{\\text{wasted energy}} \\qquad \\opp{980} = \\hyp{490} + \\bad{490}'] }],
      lines: [
        { say: 'A motor pulls a ten kilogram load up a shaft, five metres high. On Earth, g is nine point eight newtons per kilogram, so the load weighs ninety-eight newtons. The rails of the shaft rub against it, with ninety-eight newtons of friction.', show: 'sim', play: 'sim.ready', playDelay: 8 },
        { say: 'So the motor must pull with one hundred and ninety-six newtons. Watch where its energy goes as the load rises.', show: 'sim.energy', play: 'sim.up', playDelay: 3 },
        { say: 'The motor supplied nine hundred and eighty joules. But only four hundred and ninety of them are stored in the height of the load. That is the useful energy, because lifting the load is the job of the machine.', focus: 'sim.load' },
        { say: 'The other four hundred and ninety joules were wasted. Friction turned them into heat. Nothing was destroyed: the useful energy and the wasted energy always add up to the energy supplied.', show: 'sum' },
      ],
    },
    {
      chapter: 'Efficiency',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eff', size: 'lg', lines: ['\\text{efficiency} = \\dfrac{\\hyp{\\text{useful energy out}}}{\\opp{\\text{total energy in}}} \\times 100\\%', '\\dfrac{\\hyp{490}}{\\opp{980}} \\times 100\\% = 0.5 \\times 100\\% = \\thc{50\\%}'] },
        { kind: 'text', id: 'max', size: 'md', md: 'The useful energy is always the smaller number, so efficiency is **never more than 100%**.' },
      ],
      lines: [
        { say: 'The efficiency of a machine is the fraction of the energy supplied that is transferred usefully. Divide the useful energy out by the total energy in, and multiply by one hundred to make it a percentage.', show: 'eff.0' },
        { say: 'For the motor in the shaft, four hundred and ninety divided by nine hundred and eighty is zero point five. So its efficiency is fifty percent. Half of the energy did the job, and half was wasted.', show: 'eff.1' },
        { say: 'The useful energy is always the smaller number, so the answer can never be more than one hundred percent. If you get more, the fraction is upside down.', show: 'max' },
      ],
    },
    {
      chapter: 'A more efficient machine',
      layout: 'center',
      main: [oiled, { kind: 'math', id: 'better', size: 'md', lines: ['\\dfrac{\\hyp{490}}{\\opp{700}} \\times 100\\% = 0.7 \\times 100\\% = \\thc{70\\%}'] }],
      lines: [
        { say: 'Now oil the rails. Friction falls to forty-two newtons, so the motor only has to pull with one hundred and forty. Lift the same load through the same five metres.', show: ['sim', 'sim.energy'], play: 'sim.up', playDelay: 8 },
        { say: 'The useful energy is the same as before, four hundred and ninety joules. But this time the motor supplied only seven hundred, and less was wasted as heat.', focus: 'sim.load' },
        { say: 'Four hundred and ninety divided by seven hundred is zero point seven. The efficiency has risen to seventy percent.', show: 'better' },
        { say: 'This is how machines are made more efficient: by cutting down the waste. Oil reduces friction between moving parts, and a streamlined shape reduces air resistance.' },
      ],
    },
    {
      chapter: 'Useful or wasted?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'dev',
          head: ['Device', 'Useful transfer', 'Wasted transfers'],
          rows: [
            ['lamp', 'light', 'heat'],
            ['motor lifting a load', 'height of the load', 'heat, sound'],
            ['car engine', 'motion of the car', 'heat, sound'],
            ['electric heater', 'heat', 'almost none'],
          ],
        },
      ],
      lines: [
        { say: 'Which transfer counts as useful depends on what the device is for. A lamp is for light, so the heat it gives out is wasted.', show: ['dev', 'dev.0'] },
        { say: 'A motor is for lifting, and a car engine is for motion. Both waste energy as heat and sound.', show: ['dev.1', 'dev.2'] },
        { say: 'But in an electric heater, heat is exactly what we want, so almost nothing is wasted.', show: 'dev.3' },
        { say: 'Wasted energy is not destroyed. It spreads out into the surroundings as heat, too thinly to be useful again.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A petrol engine is 25% efficient. It is supplied with 2000 J of energy. How much energy is wasted?',
          choices: ['500 J', '1500 J', '1975 J', '2500 J'],
          answer: 1,
          working: 'Useful: $0.25 \\times 2000 = 500\\ \\text{J}$. Wasted: $2000 - 500 = 1500\\ \\text{J}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A petrol engine is twenty-five percent efficient. It is supplied with two thousand joules of energy. How much energy is wasted? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Find the useful energy first. Twenty-five percent of two thousand is five hundred joules. The rest is wasted. Two thousand, take away five hundred, is one thousand five hundred joules. That is choice B.', show: 'q.answer' },
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
            'Efficiency = useful energy out ÷ total energy in × 100%',
            'Total energy in = useful energy out + wasted energy',
            'Wasted energy spreads into the surroundings as heat and sound',
            'Less friction and less air resistance make a machine more efficient',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Efficiency is the useful energy out, divided by the total energy in, times one hundred percent.', show: 'end.0' },
        { say: 'The total energy in equals the useful energy out, plus the wasted energy.', show: 'end.1' },
        { say: 'Wasted energy is not destroyed. It spreads into the surroundings as heat and sound.', show: 'end.2' },
        { say: 'And less friction, or less air resistance, makes a machine more efficient.', show: 'end.3' },
      ],
    },
  ],
};

export default video;
