import type { Explainer, GravityEl } from '@/video/script.ts';

// Exam question for lesson 3.3 (orbital speed): the mass of the Sun from Mercury's orbit, a period
// of 88.0 days and a radius of 5.791 × 10¹⁰ m. The question is OpenStax Physics' own, word for word
// (Critical Thinking, section 7.2, CC BY 4.0). In seconds the period is 7.603 × 10⁶ s, so Mercury
// moves at v = 2πr ÷ T = 4.786 × 10⁴ m/s. Gravity is the centripetal force, GMm ÷ r² = mv² ÷ r, so
// M = v²r ÷ G = 1.99 × 10³⁰ kg (choice b). 3.43 × 10¹⁹ kg uses r² in place of r³, 1.48 × 10⁴⁰ kg
// leaves the period in days, and 2.56 × 10²⁹ kg comes from no single slip.
//
// The picture (src/video/gravity.ts) puts Mercury in a circular orbit round the Sun (not to
// scale: the Sun is drawn as a ball) and runs its year, 88 days in 8 seconds.

const M_SUN = 1.989e30;
const R = 5.791e10;
const T_DAYS = 88.0;

const orbit: GravityEl = {
  kind: 'gravity',
  id: 'sim',
  bodies: [
    { id: 'sun', mass: M_SUN, label: 'Sun', x: 0, size: 26, tone: 'theta' },
    { id: 'mercury', mass: 3.30e23, label: 'Mercury', x: R, size: 9, orbit: true, tone: 'opp' },
  ],
  view: [-1.55 * R, 1.55 * R, -1.25 * R, 1.25 * R],
  notation: 'sci',
  figures: 4,
  rate: (T_DAYS * 86400) / 8,
  clock: { unit: 'days', seconds: 86400 },
  pulls: ['mercury'],
  forceScale: 6e-21,
  velocityScale: 0.0019,
  height: 520,
  poster: 'year',
  clips: {
    year: { phases: [{ dur: 8, fly: true }] },
    quarter: { phases: [{ dur: 2, fly: true }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-3-3',
  lessonId: '',
  exam: {
    lesson: 'p20-3-3',
    source: 'OpenStax, Physics, Critical Thinking for section 7.2, Newton\'s Law of Universal Gravitation and Einstein\'s Theory of General Relativity',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/7-2-newtons-law-of-universal-gravitation-and-einsteins-theory-of-general-relativity',
    question: 'The orbit of the planet Mercury has a period of 88.0 days and an average radius of 5.791×10¹⁰ m. What is the mass of the sun?',
    choices: ['3.43×10¹⁹ kg', '1.99×10³⁰ kg', '2.56×10²⁹ kg', '1.48×10⁴⁰ kg'],
  },
  title: 'Exam Question: Weigh the Sun Using Mercury\'s Orbit',
  thumbnailTitle: 'Weigh the Sun',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: Mercury orbits the Sun once every 88.0 days at a radius of 5.791 × 10¹⁰ m, and we find the mass of the Sun. We turn the period into seconds, find Mercury\'s speed, and use the fact that gravity is the centripetal force that holds it in its orbit. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Weigh the Sun', subtitle: 'Orbits and gravity, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that weighs the Sun, using nothing but the orbit of the planet Mercury. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'The orbit of the planet Mercury has a period of 88.0 days and an average radius of $5.791 \\times 10^{10}$ m. What is the mass of the sun?',
          choices: ['$3.43 \\times 10^{19}$ kg', '$1.99 \\times 10^{30}$ kg', '$2.56 \\times 10^{29}$ kg', '$1.48 \\times 10^{40}$ kg'],
          answer: 1,
          working: '$T = 7.603 \\times 10^6$ s, $v = \\dfrac{2\\pi r}{T} = 4.786 \\times 10^4$ m/s, $M = \\dfrac{v^2 r}{G} = 1.99 \\times 10^{30}$ kg.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The orbit of the planet Mercury has a period of 88.0 days, and an average radius of 5.791 times ten to the ten metres. What is the mass of the Sun?' },
        { say: 'The choices are 3.43 times ten to the nineteen kilograms, 1.99 times ten to the thirty, 2.56 times ten to the twenty nine, and 1.48 times ten to the forty. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [orbit, { kind: 'text', id: 'plain', size: 'lg', md: 'From Mercury\'s **year** and **orbit**, how heavy is the **Sun**?' }],
      lines: [
        { say: 'Let us watch it. Mercury goes round the Sun in a nearly circular orbit. One trip round, its year, takes 88 days.', show: ['sim', 'sim.orbit', 'sim.clock'], play: 'sim.year', playDelay: 0.5 },
        { say: 'The Sun\'s gravity is what holds it in that circle. A heavier Sun would pull harder, and Mercury would have to move faster to stay in the same orbit.' },
        { say: 'So the question asks: from how fast Mercury goes round, and how big its orbit is, how heavy is the Sun?', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Gravity is the centripetal force',
          md: 'For a planet of mass $m$ in a circular orbit of radius $r$ round a star of mass $M$, gravity is the centripetal force: $GMm/r^2 = mv^2/r$, so $v^2 = GM/r$. The speed comes from the period: $v = 2\\pi r/T$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Rearranged for the star: $M = \\dfrac{v^2 r}{G}$, with $G = 6.67 \\times 10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$.' },
      ],
      lines: [
        { say: 'Here is what we need. A planet in a circular orbit is in uniform circular motion, and the only force on it is the star\'s gravity. So gravity is the centripetal force.', show: 'def' },
        { say: 'Set Newton\'s law of gravitation equal to m v squared over r. The planet\'s own mass cancels, which is lucky, because we were not told it.' },
        { say: 'And the speed comes from the period: once round the circle, two pi r, in one period.' },
        { say: 'Rearranged for the star\'s mass, M is v squared times r, divided by G.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Turn the period into **seconds**', 'Find Mercury\'s **speed**: $v = 2\\pi r \\div T$', 'Find the Sun\'s **mass**: $M = v^2 r \\div G$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, turn the period into seconds, because G uses seconds.', show: 'plan.0' },
        { say: 'Second, find Mercury\'s speed from its orbit.', show: 'plan.1' },
        { say: 'Third, find the Sun\'s mass.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Seconds',
      layout: 'split',
      leftWidth: 700,
      left: [orbit],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['T = 88.0 \\times 86\\,400', '= \\adj{7.603 \\times 10^{6}\\ \\text{s}}'] }],
      lines: [
        { say: 'Step one. A day has 24 hours of 3,600 seconds each, which is 86,400 seconds. So 88.0 days is 88 times 86,400 seconds.', show: ['sim', 'sim.orbit', 'sim.clock', 'm.0'], play: 'sim.year', playDelay: 0.3 },
        { say: 'That is 7.603 times ten to the six seconds: about seven and a half million seconds for one Mercury year.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The speed',
      layout: 'split',
      leftWidth: 700,
      left: [orbit],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['v = \\dfrac{2\\pi r}{T}', '= \\dfrac{2\\pi \\times 5.791 \\times 10^{10}}{7.603 \\times 10^{6}}', '= \\opp{4.786 \\times 10^{4}\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Step two. In one year, Mercury goes once round its orbit: two pi times the radius.', show: ['sim', 'sim.orbit', 'sim.velocity', 'sim.distance', 'm.0'], play: 'sim.quarter', playDelay: 0.3 },
        { say: 'Divide that by the period in seconds.', show: 'm.1' },
        { say: 'Mercury moves at 4.786 times ten to the four metres per second. That is almost 48 kilometres every second.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The mass',
      layout: 'split',
      leftWidth: 700,
      left: [orbit],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['M = \\dfrac{v^2 r}{G}', 'v^2 r = 1.327 \\times 10^{20}', '\\div\\ 6.67 \\times 10^{-11}', '= \\good{1.99 \\times 10^{30}\\ \\text{kg}}'] }],
      lines: [
        { say: 'Step three. The Sun\'s gravity is the centripetal force, so its mass is v squared times r, divided by G.', show: ['sim', 'sim.orbit', 'sim.force', 'sim.velocity', 'm.0'], play: 'sim.quarter', playDelay: 0.3 },
        { say: 'Square the speed and multiply by the radius: 1.327 times ten to the twenty.', show: 'm.1' },
        { say: 'Then divide by G, 6.67 times ten to the minus eleven.', show: 'm.2' },
        { say: 'The Sun\'s mass is 1.99 times ten to the thirty kilograms. That is choice B.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{\\dfrac{GM}{r}} = \\sqrt{\\dfrac{6.67 \\times 10^{-11} \\times 1.99 \\times 10^{30}}{5.791 \\times 10^{10}}} = 4.79 \\times 10^{4}\\ \\text{m/s}\\ \\checkmark', '\\dfrac{1.99 \\times 10^{30}}{5.97 \\times 10^{24}} \\approx 330\\,000\\ \\text{Earths}'] }],
      lines: [
        { say: 'Let us check it by working forwards. With this mass, the orbital speed at Mercury\'s distance is the square root of G M over r: 4.79 times ten to the four metres per second. That is the speed we found.', show: 'm.0' },
        { say: 'And the size makes sense. It is about 330,000 times the mass of the Earth, which is what astronomers measure for the Sun.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Why it is wrong'],
          rows: [
            ['$1.48 \\times 10^{40}$ kg', 'Left the period in **days**: always use **seconds** with $G$'],
            ['$3.43 \\times 10^{19}$ kg', 'Used $r^2$ in place of $r^3$: $M = \\dfrac{4\\pi^2 r^3}{GT^2}$'],
            ['$2.56 \\times 10^{29}$ kg', 'About 8 times too small: no single slip gives it'],
            ['$1.99 \\times 10^{30}$ kg', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in the wrong choices.', show: 'traps' },
        { say: '1.48 times ten to the forty comes from leaving the period in days. G is in seconds, so the period must be too.' },
        { say: 'If you put our two steps together into one formula, you get four pi squared r cubed, over G T squared. 3.43 times ten to the nineteen comes from using r squared instead of r cubed.' },
        { say: 'And 2.56 times ten to the twenty nine is about eight times too small. It does not come from any one slip, so check your working if you landed there.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A moon moves in a circular orbit of radius $4.0 \\times 10^{8}$ m round a planet, once every $2.4 \\times 10^{6}$ s. What is the mass of the planet?',
          choices: ['$1.6 \\times 10^{16}$ kg', '$1.7 \\times 10^{23}$ kg', '$6.6 \\times 10^{24}$ kg', '$6.3 \\times 10^{21}$ kg'],
          answer: 2,
          working: '$v = \\dfrac{2\\pi \\times 4.0 \\times 10^8}{2.4 \\times 10^6} = 1047$ m/s, so $M = \\dfrac{1047^2 \\times 4.0 \\times 10^8}{6.67 \\times 10^{-11}} = 6.6 \\times 10^{24}$ kg.',
        },
      ],
      lines: [
        { say: 'Your turn. A moon moves in a circular orbit of radius 4.0 times ten to the eight metres round a planet, once every 2.4 times ten to the six seconds. What is the mass of the planet? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The speed is two pi r over T: about 1,047 metres per second. Then M is v squared times r over G: 6.6 times ten to the twenty four kilograms, a little more than the Earth. That is choice C.', show: 'q2.answer' },
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
          items: ['In an orbit, **gravity** is the centripetal force: $\\dfrac{GM}{r} = v^2$', 'Speed from the period: $v = \\dfrac{2\\pi r}{T}$', 'Mass of the central body: $M = \\dfrac{v^2 r}{G}$', 'Period in **seconds**, radius from the **centre**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In an orbit, gravity is the centripetal force, so v squared equals G M over r.', show: 'sum.0' },
        { say: 'The speed comes from the period: two pi r over T.', show: 'sum.1' },
        { say: 'Put together, they weigh the body in the middle: M equals v squared r over G.', show: 'sum.2' },
        { say: 'And always use seconds, and a radius measured from the centre. For more on orbits, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
