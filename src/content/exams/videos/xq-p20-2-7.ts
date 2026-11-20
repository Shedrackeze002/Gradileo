import type { Explainer, GravityEl } from '@/video/script.ts';

// Exam question for lesson 2.7 (universal gravitation): where between Earth and the Moon are their
// pulls equal? The question is OpenStax Physics' own, word for word (Test Prep for section 7.2,
// CC BY 4.0). With x the distance from Earth's centre and d = 3.80 × 10⁵ km, G Mₑ m / x² =
// G Mₘ m / (d − x)², so x / (d − x) = √(Mₑ / Mₘ) = √81.22 = 9.012 and x = 0.9001 d =
// 3.42 × 10⁵ km (choice a). 3.80 × 10⁵ km is the whole distance, 3.42 × 10⁶ km is ten times the
// answer and lies far beyond the Moon, and 3.10 × 10⁷ km is further still.
//
// The pictures (src/video/gravity.ts) put a 1,000 kg probe on the line between them. In the first,
// the Earth's pull and the Moon's pull on the probe are drawn in two rows to one scale, so they can
// be seen to grow equal; in the second both act together and the net pull shrinks to nothing at
// 3.42 × 10⁵ km, then points to the Moon beyond it.

const D = 3.8e8;
const EQUAL = 3.42e8;
const EARTH = { id: 'earth', mass: 5.97e24, label: 'Earth', x: 0, size: 30, tone: 'adj' as const };
const MOON = { id: 'moon', mass: 7.35e22, label: 'Moon', x: D, size: 16, tone: 'theta' as const };
const PROBE = { id: 'probe', mass: 1000, label: 'probe', x: 2.0e8, size: 9, tone: 'opp' as const };
const VIEW: [number, number, number, number] = [-0.35e8, 4.2e8, -0.45e8, 0.45e8];
const UNIT = { metres: 1e3, symbol: 'km' };
const SLIDE = { slide: { phases: [{ dur: 5, to: { probe: EQUAL } }] } };

/** The Earth's pull on the probe alone, to the same scale as the Moon's. */
const earthPull: GravityEl = {
  kind: 'gravity',
  id: 'ep',
  bodies: [EARTH, PROBE],
  view: VIEW,
  unit: UNIT,
  figures: 3,
  pulls: ['probe'],
  forceScale: 12,
  label: 'The Earth\'s pull on the probe',
  height: 230,
  clips: SLIDE,
};

/** The Moon's pull on the probe alone. */
const moonPull: GravityEl = { ...earthPull, id: 'mp', bodies: [MOON, PROBE], label: 'The Moon\'s pull on the probe' };

/** Both pulls together: the net pull shrinks to nothing at the equal point, then points to the Moon. */
const both: GravityEl = {
  kind: 'gravity',
  id: 'both',
  bodies: [EARTH, PROBE, MOON],
  view: VIEW,
  unit: UNIT,
  figures: 3,
  pulls: ['probe'],
  forceScale: 12,
  label: 'Both pulls together',
  height: 300,
  poster: 'slide',
  clips: {
    slide: { phases: [{ dur: 5, to: { probe: EQUAL } }] },
    past: { phases: [{ dur: 2.5, to: { probe: 3.5e8 } }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-2-7',
  lessonId: '',
  exam: {
    lesson: 'p20-2-7',
    source: 'OpenStax, Physics, Test Prep for section 7.2, Newton\'s Law of Universal Gravitation and Einstein\'s Theory of General Relativity',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/7-2-newtons-law-of-universal-gravitation-and-einsteins-theory-of-general-relativity',
    question:
      'The masses of Earth and the moon are 5.97×10²⁴ kg and 7.35×10²² kg, respectively. The distance from Earth to the moon is 3.80×10⁵ km. At what point between the Earth and the moon are the opposing gravitational forces equal? (Use subscripts e and m to represent Earth and moon.)',
    choices: ['3.42×10⁵ km from the center of Earth', '3.80×10⁵ km from the center of Earth', '3.42×10⁶ km from the center of Earth', '3.10×10⁷ km from the center of Earth'],
  },
  title: 'Exam Question: Where Are the Earth\'s and the Moon\'s Pulls Equal?',
  thumbnailTitle: 'Equal Pulls',
  thumbnail: 'both',
  summary:
    'A real test question, solved one small step at a time: where, on the line between the Earth and the Moon, do their gravitational pulls on an object balance? We write Newton\'s law of gravitation for each pull, set them equal, take square roots, and solve for the distance from the Earth. Then we check the answer and look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Where Do the Pulls Balance?', subtitle: 'The Earth, the Moon and Newton\'s law of gravitation' }],
      lines: [
        { say: 'In this video, we solve a real test question about the Earth and the Moon. Somewhere between them, their pulls on a spacecraft balance. We will find where, one small step at a time.', show: 'title' },
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
          prompt:
            'The masses of Earth and the moon are $5.97\\times10^{24}\\ \\text{kg}$ and $7.35\\times10^{22}\\ \\text{kg}$, respectively. The distance from Earth to the moon is $3.80\\times10^{5}\\ \\text{km}$. At what point between the Earth and the moon are the opposing gravitational forces equal? (Use subscripts e and m to represent Earth and moon.)',
          choices: [
            '$3.42\\times10^{5}\\ \\text{km}$ from the center of Earth',
            '$3.80\\times10^{5}\\ \\text{km}$ from the center of Earth',
            '$3.42\\times10^{6}\\ \\text{km}$ from the center of Earth',
            '$3.10\\times10^{7}\\ \\text{km}$ from the center of Earth',
          ],
          answer: 0,
          working: '$\\dfrac{x}{d - x} = \\sqrt{\\dfrac{M_e}{M_m}} = 9.01$, so $x = 0.900\\,d = 3.42\\times10^{5}\\ \\text{km}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The masses of the Earth and the Moon are 5.97 times ten to the twenty four kilograms, and 7.35 times ten to the twenty two kilograms. The distance from the Earth to the Moon is 3.80 times ten to the five kilometres. At what point between them are the two opposing gravitational forces equal?' },
        { say: 'The choices are 3.42 times ten to the five, 3.80 times ten to the five, 3.42 times ten to the six, and 3.10 times ten to the seven kilometres, all from the centre of the Earth. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [both, { kind: 'text', id: 'plain', size: 'lg', md: 'Where does the Earth\'s pull **exactly balance** the Moon\'s?' }],
      lines: [
        { say: 'Let us picture it. Put a small space probe somewhere on the line between the Earth and the Moon. The Earth pulls it one way, and the Moon pulls it the other way.', show: ['both', 'both.force'] },
        { say: 'Near the Earth, the Earth\'s pull wins easily. The question asks: where is the point at which the two pulls are exactly equal, so they balance?', show: 'plain' },
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
          title: 'Newton\'s law of universal gravitation',
          md: 'Two masses $M$ and $m$, with centres a distance $r$ apart, pull on each other with $F = \\dfrac{GMm}{r^2}$. A **bigger mass** pulls harder; a **bigger distance** pulls much less.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Twice as far away: $2^2 = 4$, so the pull is **a quarter** as strong.' },
      ],
      lines: [
        { say: 'Here is the one law we need. Two masses pull on each other with a force of G, times one mass, times the other mass, divided by the distance between their centres, squared.', show: 'def' },
        { say: 'So a bigger mass pulls harder. And because the distance is squared, the pull falls off quickly as you move away.' },
        { say: 'For example, twice as far away, the pull is a quarter as strong.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Call the distance from the Earth $x$: the Moon is then $d - x$ away', 'Write each pull, and set them **equal**', '**Square root** both sides, then solve for $x$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, call the probe\'s distance from the Earth x. The whole distance is d, so the probe is d take away x from the Moon.', show: 'plan.0' },
        { say: 'Second, write Newton\'s law for each pull, and set the two pulls equal.', show: 'plan.1' },
        { say: 'Third, take the square root of both sides, which makes the equation easy, and solve for x.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Two pulls',
      layout: 'center',
      main: [earthPull, moonPull],
      lines: [
        { say: 'Step one. Here are the two pulls on the probe, drawn to the same scale. On top, the Earth\'s pull. Underneath, the Moon\'s pull.', show: ['ep', 'mp', 'ep.force', 'mp.force'] },
        { say: 'Watch them as the probe moves towards the Moon. The Earth\'s pull shrinks, and the Moon\'s pull grows. At one point, they are equal.', show: ['ep.distance', 'mp.distance'], play: ['ep.slide', 'mp.slide'], playDelay: 0.5 },
        { say: 'Notice that this point is much nearer the Moon. The Earth is far heavier, so the probe has to be a long way from it before the Moon can match its pull.' },
      ],
    },
    {
      chapter: 'Step 2: Set them equal',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\dfrac{G M_e m}{x^2} = \\dfrac{G M_m m}{(d - x)^2}', '\\dfrac{M_e}{x^2} = \\dfrac{M_m}{(d - x)^2}', '\\dfrac{x^2}{(d - x)^2} = \\dfrac{M_e}{M_m} = \\dfrac{5.97\\times10^{24}}{7.35\\times10^{22}} = \\hyp{81.2}'],
        },
      ],
      lines: [
        { say: 'Step two. The Earth\'s pull is G, times the Earth\'s mass, times the probe\'s mass, over x squared. The Moon\'s pull is the same, with the Moon\'s mass, over d take away x, squared. Set them equal.', show: 'm.0' },
        { say: 'G and the probe\'s mass are on both sides, so they cancel. The answer does not depend on the probe at all.', show: 'm.1' },
        { say: 'Rearrange, to put the distances on one side and the masses on the other. The Earth is 81.2 times as heavy as the Moon.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Square root, then solve',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\dfrac{x}{d - x} = \\sqrt{81.2} = 9.01', 'x = 9.01\\,(d - x) \\quad\\Rightarrow\\quad 10.01\\,x = 9.01\\,d', 'x = 0.900 \\times 3.80\\times10^{5} = \\good{3.42\\times10^{5}\\ \\text{km}}'],
        },
      ],
      lines: [
        { say: 'Step three. Both sides are squares, so take the square root of each. x over d take away x is the square root of 81.2: 9.01.', show: 'm.0' },
        { say: 'Multiply out: x equals 9.01 times d, take away 9.01 x. Gather the x terms together: 10.01 x equals 9.01 d.', show: 'm.1' },
        { say: 'So x is 9.01 over 10.01 of the way: 0.900 of the distance. 0.900 times 3.80 times ten to the five kilometres is 3.42 times ten to the five kilometres from the centre of the Earth. That is choice A.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [both, { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Earth: } 3.40\\ \\text{N} \\qquad \\text{Moon: } 3.40\\ \\text{N}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it with the probe, which has a mass of one thousand kilograms. Now both pulls act on it together. The arrow shows what is left over: the net pull.', show: ['both', 'both.force', 'both.distance'] },
        { say: 'Watch the net pull as the probe moves out. It shrinks, and at 3.42 times ten to the five kilometres, it is gone. The two pulls cancel.', play: 'both.slide', playDelay: 0.5 },
        { say: 'Work them out there, and each pull is 3.40 newtons. Equal, as they should be.', show: 'm' },
        { say: 'Move the probe a little further, and the net pull now points towards the Moon. The Moon has taken over.', play: 'both.past', playDelay: 0.3 },
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
            ['$3.80\\times10^{5}\\ \\text{km}$', 'That is the **whole** distance: the centre of the Moon'],
            ['$3.42\\times10^{6}\\ \\text{km}$', 'Ten times too far: **beyond** the Moon'],
            ['$3.10\\times10^{7}\\ \\text{km}$', 'Further still: not **between** them at all'],
            ['$3.42\\times10^{5}\\ \\text{km}$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'The wrong choices hide some easy mistakes.', show: 'traps' },
        { say: '3.80 times ten to the five kilometres is the whole distance. That point is the centre of the Moon, where the Moon would win, not balance.' },
        { say: '3.42 times ten to the six is the right digits with the wrong power of ten. It is ten times further than the Moon. The point must be between them, so it cannot be further than 3.80 times ten to the five.' },
        { say: 'And 3.10 times ten to the seven is further still. A quick size check rules out both of these.' },
        { say: 'One more trap: forgetting the square root. Using 81.2 instead of 9.01 puts the point too close to the Moon.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Star A has 4 times the mass of star B. Their centres are $9.0\\times10^{11}\\ \\text{m}$ apart. How far from the centre of star A, on the line between them, are their pulls on a probe equal?',
          choices: ['$3.0\\times10^{11}\\ \\text{m}$', '$4.5\\times10^{11}\\ \\text{m}$', '$6.0\\times10^{11}\\ \\text{m}$', '$7.2\\times10^{11}\\ \\text{m}$'],
          answer: 2,
          working: '$\\dfrac{x}{d - x} = \\sqrt{4} = 2$, so $x = \\tfrac{2}{3}d = 6.0\\times10^{11}\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Star A has four times the mass of star B. Their centres are nine times ten to the eleven metres apart. How far from the centre of star A are their pulls on a probe equal? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'x over d take away x is the square root of four: two. So x is two thirds of the way: six times ten to the eleven metres from star A. That is choice C.', show: 'q2.answer' },
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
          items: ['Gravity: $F = \\dfrac{GMm}{r^2}$', 'Set the two pulls **equal**: $G$ and $m$ cancel', '**Square root** first: $\\dfrac{x}{d-x} = \\sqrt{M_e / M_m}$', 'The point must lie **between** the two bodies, nearer the lighter one'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The pull of gravity is G M m over r squared.', show: 'sum.0' },
        { say: 'To find where two pulls balance, set them equal. G and the small mass cancel.', show: 'sum.1' },
        { say: 'Take the square root first. It turns a hard equation into an easy one.', show: 'sum.2' },
        { say: 'And check: the point must be between the two bodies, nearer the lighter one. For more on universal gravitation, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
