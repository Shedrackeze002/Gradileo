import type { Explainer, GravityEl } from '@/video/script.ts';

// Lesson 3.3, part 2: the period of an orbit, and Kepler's third law. The orbits are followed under
// Newton's law of gravitation (src/video/gravity.ts), so the periods on the clock are the lesson's:
// 5.82 × 10³ s (97 minutes) for the satellite 7.0 × 10⁶ m from the centre of a planet of
// 6.0 × 10²⁴ kg, 7.95 × 10⁴ s (22 hours) for a moon 4.0 × 10⁷ m from it, and 48 days for a moon
// four times as far from its planet as one whose period is 6 days.

const G = 6.67e-11;
const DAY = 86400;

/** The lesson's satellite, with a clock that counts minutes: one orbit takes 5817 s. */
const sat: GravityEl = {
  kind: 'gravity',
  id: 'sat',
  bodies: [
    { id: 'planet', mass: 6.0e24, label: 'Planet', x: 0, radius: 6.4e6, tone: 'adj' },
    { id: 's', mass: 800, label: '', x: 7.0e6, size: 8, orbit: true, tone: 'opp' },
  ],
  view: [-10.4e6, 10.4e6, -10.4e6, 10.4e6],
  notation: 'sci',
  rate: 700,
  clock: { unit: 'min', seconds: 60 },
  pulls: [],
  velocityScale: 0.0095,
  height: 540,
  clips: { round: { phases: [{ dur: 8.31, fly: true }] } },
};

/** The same planet with the lesson's moon, 4.0 × 10⁷ m from its centre: one orbit of the moon takes 79 457 s. */
const moon: GravityEl = {
  kind: 'gravity',
  id: 'far',
  bodies: [
    { id: 'planet', mass: 6.0e24, label: '', x: 0, radius: 6.4e6, tone: 'adj' },
    { id: 's', mass: 800, label: 'Satellite', x: 7.0e6, size: 5, orbit: true, tone: 'opp' },
    { id: 'moon', mass: 7.0e22, label: 'Moon', x: -4.0e7, size: 11, orbit: true, tone: 'hyp' },
  ],
  view: [-5.2e7, 5.2e7, -5.2e7, 5.2e7],
  rate: 7945.7,
  clock: { unit: 'h', seconds: 3600 },
  pulls: [],
  height: 540,
  clips: { go: { phases: [{ dur: 10, fly: true }] } },
};

/** The radius of the inner moon's orbit, and the mass of a planet that gives it a period of exactly six days. */
const INNER = 4.0e8;
const GIANT = (4 * Math.PI ** 2 * INNER ** 3) / (G * (6 * DAY) ** 2);

/** The lesson's two moons: the outer one is four times as far from the planet, and takes eight times as long. */
const kepler: GravityEl = {
  kind: 'gravity',
  id: 'moons',
  bodies: [
    { id: 'planet', mass: GIANT, label: '', x: 0, radius: 7.0e7, tone: 'adj' },
    { id: 'inner', mass: 1e22, label: 'Inner', x: INNER, size: 8, orbit: true, tone: 'opp' },
    { id: 'outer', mass: 1e22, label: 'Outer', x: -4 * INNER, size: 8, orbit: true, tone: 'hyp' },
  ],
  view: [-2.1e9, 2.1e9, -2.1e9, 2.1e9],
  rate: 3 * DAY,
  clock: { unit: 'days', seconds: DAY },
  pulls: [],
  height: 540,
  poster: 'go',
  clips: { go: { phases: [{ dur: 16, fly: true }] } },
};

const video: Explainer = {
  id: 'p20-3-3-b',
  lessonId: 'p20-3-3',
  title: 'Orbits and Satellites, Part 2: Kepler’s Third Law',
  thumbnailTitle: 'Kepler’s Third Law',
  thumbnail: 'moons',
  summary:
    'How long does an orbit take? Find the period of a satellite from its speed, see why a moon far from its planet takes so much longer, and use Kepler’s third law to compare two orbits without any constants.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circular Motion', title: 'Kepler’s Third Law', subtitle: 'How long does an orbit take?' }],
      lines: [
        { say: 'A satellite close to the Earth goes round in about an hour and a half. The Moon takes about a month.', show: 'title' },
        { say: 'This lesson finds the period of an orbit, and the rule that connects the period to the size of the orbit.' },
      ],
    },
    {
      chapter: 'The period of a satellite',
      layout: 'split',
      leftWidth: 540,
      left: [sat],
      right: [{ kind: 'math', id: 'p', size: 'md', lines: ['\\thc{T = \\dfrac{2\\pi r}{v}}', 'T = \\dfrac{2\\pi \\times 7.0 \\times 10^{6}}{7.56 \\times 10^{3}}', 'T = 5.82 \\times 10^{3}\\ \\text{s} \\approx \\good{97\\ \\text{min}}'] }],
      lines: [
        { say: 'The period of a satellite is the time for one orbit. Here is the satellite from part one. It is seven times ten to the six metres from the centre of its planet, and its speed is 7.56 times ten to the three metres per second.', show: ['sat', 'sat.orbit', 'sat.velocity', 'sat.distance'] },
        { say: 'As for any circular motion, the period is the distance round the circle, over the speed: two pi r over v.', show: 'p.0' },
        { say: 'Two pi, times seven times ten to the six, over 7.56 times ten to the three, is 5.82 times ten to the three seconds. That is about ninety-seven minutes.', show: ['p.1', 'p.2'] },
        { say: 'Watch one orbit, with the clock counting in minutes.', hide: 'sat.distance', show: ['sat.clock', 'sat.trail'], play: 'sat.round' },
      ],
    },
    {
      chapter: 'Farther out, much longer',
      layout: 'split',
      leftWidth: 540,
      left: [moon],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['v = \\sqrt{\\dfrac{GM}{r}} = 3.16 \\times 10^{3}\\ \\text{m/s}', 'T = \\dfrac{2\\pi \\times 4.0 \\times 10^{7}}{3.16 \\times 10^{3}}', 'T = 7.95 \\times 10^{4}\\ \\text{s} \\approx \\good{22\\ \\text{h}}'] }],
      lines: [
        { say: 'Now give the same planet a moon, much farther out: four times ten to the seven metres from the centre. When you know only the mass of the planet and the radius of the orbit, find the speed first. It is 3.16 times ten to the three metres per second.', show: ['far', 'far.orbit', 'm.0'] },
        { say: 'Then find the period, from two pi r over v. It is 7.95 times ten to the four seconds, which is about twenty-two hours.', show: ['m.1', 'm.2'] },
        { say: 'Watch the moon and the low satellite together. The moon has farther to go, and it moves more slowly. While it goes round once, the satellite goes round more than thirteen times.', show: ['far.clock', 'far.turns'], play: 'far.go' },
      ],
    },
    {
      chapter: 'Kepler’s third law',
      layout: 'split',
      leftWidth: 540,
      left: [kepler],
      right: [{ kind: 'math', id: 'k', size: 'md', lines: ['T^2 = \\dfrac{4\\pi^2}{GM}\\, r^3', '\\thc{T^2 \\propto r^3}', 'r \\times 4: \\quad T^2 \\times 4^3 = T^2 \\times 64', 'T \\times \\sqrt{64} = T \\times 8', 'T = 6 \\times 8 = \\good{48\\ \\text{days}}'] }],
      lines: [
        { say: 'How exactly does the period grow with the radius? Put the formula for the speed into the formula for the period, and square it. T squared is four pi squared over G M, times r cubed.', show: ['moons', 'moons.orbit', 'k.0'] },
        { say: 'For all the satellites of one planet, G M is the same. So the square of the period is proportional to the cube of the radius. This is Kepler’s third law. Kepler found it from measurements of the planets, about seventy years before Newton explained it with gravity.', show: 'k.1' },
        { say: 'The law lets you compare two orbits with no constants at all. These two moons orbit the same planet. The inner moon has a period of six days, and the orbit of the outer moon has four times the radius.', focus: 'moons' },
        { say: 'Multiply r by four, and T squared is multiplied by four cubed, which is sixty-four. So T is multiplied by the square root of sixty-four, which is eight.', show: ['k.2', 'k.3'] },
        { say: 'The period of the outer moon is six times eight: forty-eight days. Watch them. The inner moon goes round eight times while the outer moon goes round once.', show: ['k.4', 'moons.clock', 'moons.turns'], play: 'moons.go', playDelay: 4 },
        { say: 'Notice that the period is not proportional to the radius. Twice the radius gives the square root of two cubed: 2.83 times the period, not twice. Cube the factor first, then take the square root.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two satellites orbit the same planet. Satellite A has a period of 2 hours. The radius of satellite B’s orbit is 9 times the radius of A’s. What is the period of satellite B?',
          choices: ['$18\\ \\text{h}$', '$6\\ \\text{h}$', '$162\\ \\text{h}$', '$54\\ \\text{h}$'],
          answer: 3,
          working: '$T^2 \\propto r^3$, so multiplying $r$ by 9 multiplies $T^2$ by $9^3 = 729$, and $T$ by $\\sqrt{729} = 27$. The period is $2 \\times 27 = 54\\ \\text{h}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two satellites orbit the same planet. Satellite A has a period of two hours. The radius of satellite B’s orbit is nine times the radius of A’s. What is the period of satellite B? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Multiply r by nine, and T squared is multiplied by nine cubed, which is 729. The square root of 729 is twenty-seven. So the period is two times twenty-seven: fifty-four hours. That is choice D. Eighteen hours is the common mistake, from multiplying the period by nine.', show: 'q.answer' },
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
            'The period of an orbit: $T = \\dfrac{2\\pi r}{v}$, with $v = \\sqrt{\\dfrac{GM}{r}}$',
            'A larger orbit has a **smaller** speed and a much **longer** period',
            'Kepler’s third law, for orbits round the same planet: $T^2 \\propto r^3$',
            'Radius $\\times\\, k$ gives period $\\times \\sqrt{k^3}$: cube the factor, then take the square root',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The period of an orbit is two pi r over v. Find the speed first, from the square root of G M over r.', show: 'sum.0' },
        { say: 'A larger orbit has a smaller speed and a much longer period.', show: 'sum.1' },
        { say: 'Kepler’s third law says that, for orbits round the same planet, T squared is proportional to r cubed.', show: 'sum.2' },
        { say: 'So to compare two orbits, cube the factor for the radius, then take the square root.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
