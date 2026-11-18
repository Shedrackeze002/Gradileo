import type { Explainer, FlightEl } from '@/video/script.ts';

// Lesson 1.5, first half: momentum at right angles. The pictures are views from above
// (src/video/flight.ts): a hockey puck whose momentum is split into its east and north parts, and
// two cars that meet at a crossroads and lock together. The cars are moved by the impulse they
// give each other when they touch, so the velocity of the wreck is worked out, not typed in, and
// the bars show the east momentum and the north momentum each staying what it was.

const RAD = Math.PI / 180;

/** The lesson's puck: 0.17 kg at 20 m/s, 30° north of east. Its momentum is 3.4 kg·m/s: 2.94 east and 1.70 north. */
const puck: FlightEl = {
  kind: 'flight',
  id: 'sim',
  scene: 'map',
  view: [-2.5, 18.5, -2.5, 11.5],
  height: 440,
  momentum: { max: 3.5, scale: 60 },
  bodies: [{ id: 'puck', shape: 'puck', label: 'Puck', labelAt: 'left', mass: 0.17, radius: 1.1, at: [0, 0], v: [20 * Math.cos(30 * RAD), 20 * Math.sin(30 * RAD)], tone: 'brand' }],
  clips: { slide: { phases: [{ dur: 0.5, slow: 8, note: 'Slow motion' }] } },
};

/** Two cars that reach a crossroads together, one from the west and one from the south, and lock together. */
function crossroads(o: { id: string; west: [kg: number, speed: number]; south: [kg: number, speed: number]; view: [number, number, number, number]; arrive: number; after: number; bars?: number; height?: number; angleDecimals?: number; velocityScale?: number }): FlightEl {
  const [m1, v1] = o.west;
  const [m2, v2] = o.south;
  return {
    kind: 'flight',
    id: o.id,
    scene: 'map',
    view: o.view,
    poster: 'crash',
    height: o.height ?? 440,
    roads: 7,
    velocityScale: o.velocityScale ?? 9,
    angleDecimals: o.angleDecimals ?? 0,
    collisions: { stick: true },
    ...(o.bars ? { momentum: { max: o.bars, scale: 190 / o.bars } } : {}),
    bodies: [
      { id: 'east', shape: 'car', label: `${m1} kg`, mass: m1, radius: 2.4, labelAt: 'above', at: [-v1 * o.arrive, 0], v: [v1, 0], tone: 'adj' },
      { id: 'north', shape: 'car', label: `${m2} kg`, mass: m2, radius: 2.4, labelAt: 'right', at: [0, -v2 * o.arrive], v: [0, v2], tone: 'opp' },
    ],
    clips: { crash: { phases: [{ dur: o.arrive + o.after, slow: 2.5, note: 'Slow motion' }] } },
  };
}

// The lesson's crash: 1200 kg east at 20 m/s and 1800 kg north at 10 m/s. The wreck moves at 10 m/s, 36.9° north of east.
const crash = crossroads({ id: 'crash', west: [1200, 20], south: [1800, 10], view: [-28, 26, -14, 18], arrive: 1.2, after: 0.8, bars: 30000, angleDecimals: 1, velocityScale: 6.5 });

// The lesson's skid marks: 1500 kg east at 12 m/s, and the wreck slides off at 40° north of east,
// so the 1000 kg car was driving north at 18 000 × tan 40° ÷ 1000 = 15.1 m/s.
const skid = crossroads({ id: 'sim', west: [1500, 12], south: [1000, 18 * Math.tan(40 * RAD)], view: [-20, 28, -21, 13], arrive: 1.2, after: 1 });

const video: Explainer = {
  id: 'p30-1-5',
  lessonId: 'p30-1-5',
  title: 'Momentum at Right Angles',
  thumbnailTitle: 'Momentum in 2D',
  thumbnail: 'crash',
  summary:
    'Two cars meet at a crossroads, lock together and slide off to the north-east. Split a momentum into its east and north parts, watch each direction keep its own total through the crash, find the speed and direction of the wreck, and work back from the skid marks to a speed before the collision.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Momentum and Impulse', title: 'Momentum at Right Angles', subtitle: 'Conserved in each direction separately' }],
      lines: [
        { say: 'Two cars meet at a crossroads, one driving east and one driving north. They collide, lock together, and slide off towards the north-east.', show: 'title' },
        { say: 'An accident investigator measures the skid marks, and works back to the speeds of the two cars. The tool is the conservation of momentum, used once for each direction.' },
      ],
    },
    {
      chapter: 'The components of a momentum',
      layout: 'center',
      main: [puck, { kind: 'math', id: 'parts', size: 'md', lines: ['\\adj{p_E} = 3.4\\cos 30° = \\adj{2.94} \\qquad \\opp{p_N} = 3.4\\sin 30° = \\opp{1.70\\ \\text{kg·m/s}}'] }],
      lines: [
        { say: 'Momentum is a vector. Until now it pointed along one line, and a plus or minus sign was enough. In two dimensions we split it into components, as we did with velocity.', show: 'sim' },
        { say: 'This hockey puck has a mass of 0.17 kilograms. It slides at twenty metres per second, thirty degrees north of east. The yellow arrow is its momentum: 0.17 times twenty, which is 3.4.', show: ['sim.sum', 'sim.angle', 'sim.bars'], play: 'sim.slide', playDelay: 4 },
        { say: 'The blue arrow is the part of that momentum which points east: 3.4 times the cosine of thirty degrees. The orange arrow is the part which points north: 3.4 times the sine.', show: 'parts' },
        { say: 'Going the other way, two components at right angles give the size of the total with the Pythagorean theorem, and its direction with the tangent.' },
      ],
    },
    {
      chapter: 'A crash at a crossroads',
      layout: 'center',
      main: [crash, { kind: 'text', id: 'law', size: 'md', md: 'Momentum is conserved in **each direction separately**' }],
      lines: [
        { say: 'Here is the crossroads from above. A car of one thousand two hundred kilograms drives east at twenty metres per second. A car of one thousand eight hundred kilograms drives north at ten.', show: ['crash', 'crash.velocity', 'crash.speed'] },
        { say: 'Look at the bars. The first car carries all of the east momentum, twenty-four thousand. The second carries all of the north momentum, eighteen thousand.', show: ['crash.bars', 'crash.total'] },
        { say: 'Now they collide, and lock together. Watch the two totals.', play: 'crash.crash', playDelay: 0.4, wait: 3.2 },
        { say: 'The wreck slides off to the north-east, and each car now has some momentum both ways. But neither total has changed. The total east momentum is the same after the collision as before it, and so is the total north momentum.', show: 'law' },
      ],
    },
    {
      chapter: 'The speed of the wreck',
      layout: 'center',
      main: [
        crash,
        {
          kind: 'math',
          id: 'solve',
          size: 'md',
          lines: ['\\thc{p} = \\sqrt{\\adj{24\\,000}^2 + \\opp{18\\,000}^2} = \\thc{30\\,000\\ \\text{kg·m/s}}', 'v = 30\\,000 \\div 3000 = \\good{10\\ \\text{m/s}} \\qquad \\theta = \\tan^{-1}(18\\,000 \\div 24\\,000) = \\good{36.9°}'],
        },
      ],
      lines: [
        { say: 'Watch the crash again. This time the total momentum is drawn at the centre of mass of the two cars: twenty-four thousand east in blue, eighteen thousand north in orange, and their sum in yellow.', show: ['crash', 'crash.sum', 'crash.bars', 'crash.total'], play: 'crash.crash', playDelay: 9, wait: 0.5 },
        { say: 'The triangle did not change as the cars collided. So the wreck has a momentum of the square root of twenty-four thousand squared, plus eighteen thousand squared. That is thirty thousand.', show: 'solve.0' },
        { say: 'The wreck has a mass of three thousand kilograms, so its speed is ten metres per second. And the tangent gives its direction: 36.9 degrees north of east.', show: ['solve.1', 'crash.angle'] },
      ],
    },
    {
      chapter: 'Working back from the skid marks',
      layout: 'center',
      main: [skid, { kind: 'math', id: 'back', size: 'md', lines: ['\\adj{p_E} = 1500 \\times 12 = \\adj{18\\,000} \\qquad \\opp{p_N} = 18\\,000 \\times \\tan 40° = \\opp{15\\,100\\ \\text{kg·m/s}}', 'v = 15\\,100 \\div 1000 = \\good{15.1\\ \\text{m/s}}'] }],
      lines: [
        { say: 'An investigator has the problem the other way round. A car of one thousand five hundred kilograms was driving east at twelve metres per second. It hit a car of one thousand kilograms that was driving north, and nobody knows how fast.', show: ['sim', 'sim.velocity'] },
        { say: 'They lock together, and slide off.', play: 'sim.crash', playDelay: 0.3, wait: 2.5 },
        { say: 'The skid marks show the direction of the wreck: forty degrees north of east.', show: 'sim.angle' },
        { say: 'The east momentum is one thousand five hundred times twelve: eighteen thousand. In the triangle of momenta, the tangent of forty degrees is the north momentum over the east momentum. So the north momentum is fifteen thousand one hundred.', show: 'back.0' },
        { say: 'All of it came from the northbound car. Divide by its mass, and it was moving at 15.1 metres per second.', show: ['back.1', 'sim.speed'] },
      ],
    },
    {
      chapter: 'Add them as vectors',
      layout: 'center',
      main: [
        { kind: 'math', id: 'wrong', size: 'md', lines: ['\\bad{24\\,000 + 18\\,000 = 42\\,000} \\qquad \\good{\\sqrt{24\\,000^2 + 18\\,000^2} = 30\\,000}'] },
        { kind: 'callout', id: 'trap', tone: 'mistake', title: 'Adding momenta at right angles as plain numbers', md: 'Two momenta at right angles add like the shorter sides of a **right triangle**. And kinetic energy is not a vector: it has no direction, so it is **never** split into components.' },
      ],
      lines: [
        { say: 'Here is the mistake to avoid. In the first crash, twenty-four thousand plus eighteen thousand is forty-two thousand, and that is not the total momentum. The two momenta are at right angles, so they add like the shorter sides of a right triangle. The total is thirty thousand.', show: 'wrong' },
        { say: 'Kinetic energy is different. It has no direction, so it is never split into components. To find the energy lost in a crash like this, add up half m v squared before, and subtract half m v squared of the wreck.', show: 'trap' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 2 kg puck slides east at 3 m/s, and a 1 kg puck slides north at 8 m/s. They collide and stick together. What is the size of their total momentum?',
          choices: ['$14\\ \\text{kg·m/s}$', '$10\\ \\text{kg·m/s}$', '$2\\ \\text{kg·m/s}$', '$48\\ \\text{kg·m/s}$'],
          answer: 1,
          working: 'East: $2 \\times 3 = 6$. North: $1 \\times 8 = 8$. Total: $\\sqrt{6^2 + 8^2} = 10\\ \\text{kg·m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A two kilogram puck slides east at three metres per second, and a one kilogram puck slides north at eight metres per second. They collide and stick together. What is the size of their total momentum? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The east momentum is two times three, which is six. The north momentum is one times eight, which is eight. They are at right angles, so the total is the square root of six squared plus eight squared: ten kilogram metres per second. That is choice B.', show: 'q.answer' },
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
            'Momentum is conserved in **each direction** separately',
            'Components: $p\\cos\\theta$ east and $p\\sin\\theta$ north',
            'At right angles, add with the **Pythagorean theorem**; the tangent gives the direction',
            'Kinetic energy has no direction: never split it',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Momentum is conserved in each direction separately.', show: 'sum.0' },
        { say: 'A momentum at an angle theta has an east component, p times the cosine of theta, and a north component, p times the sine of theta.', show: 'sum.1' },
        { say: 'Momenta at right angles add with the Pythagorean theorem, and the tangent gives the direction.', show: 'sum.2' },
        { say: 'And kinetic energy has no direction, so it is never split into components.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
