import type { Explainer, MotionEl } from '@/video/script.ts';
import { halt, run } from '@/content/phys10/videos/lib/track.ts';

// Exam question for lesson 1.1 (scalars, vectors, distance and displacement): Tiana jogs 1.5 km one
// way, 2.4 km back and 0.7 km the first way again. The question is OpenStax Physics' own, word for
// word (Practice Problem, section 2.1, CC BY 4.0). Her displacement is 1.5 − 2.4 + 0.7 = −0.2 km
// and her distance 1.5 + 2.4 + 0.7 = 4.6 km (choice b). The wrong choices swap the two, or give a
// distance below zero, which a distance can never be.
//
// The picture is a track in metres (src/video/motion.ts), with her first direction to the right:
// 1,500 m, 2,400 m and 700 m, so the ruler's 1,000 m is 1 km. The path and the displacement arrow
// are drawn from where she has been.

const jog: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [-1300, 1900],
  height: 330,
  lanes: [{ surface: 'smooth', label: 'Her first direction (right) is positive' }],
  bodies: [{ id: 'tiana', shape: 'cart', mass: 1, label: 'Tiana', x: 0, width: 220, tone: 'adj' }],
  poster: 'all',
  clips: {
    first: { phases: [run(3, { tiana: 500 }), halt('tiana')] },
    back: { phases: [run(4.8, { tiana: -500 }), halt('tiana')] },
    again: { phases: [run(1.4, { tiana: 500 }), halt('tiana')] },
    all: { phases: [run(3, { tiana: 500 }), run(4.8, { tiana: -500 }), run(1.4, { tiana: 500 }), halt('tiana')] },
  },
};

const video: Explainer = {
  id: 'xq-p20-1-1',
  lessonId: '',
  exam: {
    lesson: 'p20-1-1',
    source: 'OpenStax, Physics, Practice Problem for section 2.1, Relative Motion, Distance, and Displacement',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/2-1-relative-motion-distance-and-displacement',
    question:
      'Tiana jogs 1.5 km along a straight path and then turns and jogs 2.4 km in the opposite direction. She then turns back and jogs 0.7 km in the original direction. Let Tiana\'s original direction be the positive direction. What are the displacement and distance she jogged?',
    choices: [
      'Displacement is 4.6 km, and distance is -0.2 km.',
      'Displacement is -0.2 km, and distance is 4.6 km.',
      'Displacement is 4.6 km, and distance is +0.2 km.',
      'Displacement is +0.2 km, and distance is 4.6 km.',
    ],
  },
  title: 'Exam Question: Tiana\'s Jog. Distance and Displacement',
  thumbnailTitle: 'Distance or Displacement?',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: Tiana jogs 1.5 km, turns back for 2.4 km, then turns again for 0.7 km, and we find her displacement and the distance she jogged. We add the three legs with their signs to find where she ended up, add them without signs to find how far she went, and then look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Tiana\'s Jog', subtitle: 'Distance and displacement, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a jogger who changes direction twice. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'Tiana jogs 1.5 km along a straight path and then turns and jogs 2.4 km in the opposite direction. She then turns back and jogs 0.7 km in the original direction. Let Tiana\'s original direction be the positive direction. What are the displacement and distance she jogged?',
          choices: [
            'Displacement is 4.6 km, and distance is −0.2 km.',
            'Displacement is −0.2 km, and distance is 4.6 km.',
            'Displacement is 4.6 km, and distance is +0.2 km.',
            'Displacement is +0.2 km, and distance is 4.6 km.',
          ],
          answer: 1,
          working: 'Displacement $= 1.5 - 2.4 + 0.7 = -0.2\\ \\text{km}$; distance $= 1.5 + 2.4 + 0.7 = 4.6\\ \\text{km}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Tiana jogs 1.5 kilometres along a straight path. Then she turns and jogs 2.4 kilometres the opposite way. Then she turns back and jogs 0.7 kilometres in her first direction. Her first direction is positive. What are her displacement, and the distance she jogged?' },
        { say: 'Choice A says the displacement is 4.6 kilometres and the distance is minus 0.2. Choice B says the displacement is minus 0.2 kilometres and the distance is 4.6. Choice C says 4.6 and plus 0.2. Choice D says plus 0.2 and 4.6. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [jog, { kind: 'text', id: 'plain', size: 'lg', md: '**Where** did she end up, and **how far** did she run?' }],
      lines: [
        { say: 'Let us watch her run. One kilometre is a thousand metres on this ruler. Out to the right, back past where she started, and a little way to the right again.', show: 'sim', play: 'sim.all', playDelay: 0.5 },
        { say: 'The question asks two different things. Where did she end up, compared with her start? And how far did her legs actually carry her?', show: 'plain' },
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
          title: 'Distance and displacement',
          md: '**Distance** is how far you travel along the path: a scalar, never negative. **Displacement** is the change in position, from start to finish: a vector, with a sign for its direction.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Walk 5 m right and 5 m back: distance $= 10\\ \\text{m}$, displacement $= 0$.' },
      ],
      lines: [
        { say: 'Here are the two ideas we need. Distance is how far you travel along your path. It is a scalar, with no direction, and it can never be negative.', show: 'def' },
        { say: 'Displacement is how far you end up from where you started, and in which direction. It is a vector, so it carries a sign.' },
        { say: 'For example, walk five metres right and five metres back. You have walked ten metres, but your displacement is zero: you are back where you started.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Give each leg a **sign**: first direction $+$, opposite $-$', '**Displacement**: add the legs **with** their signs', '**Distance**: add the legs **without** signs'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, give each leg of the jog a sign: plus for her first direction, minus for the opposite way.', show: 'plan.0' },
        { say: 'Second, add the legs with their signs. That gives the displacement.', show: 'plan.1' },
        { say: 'Third, add the legs without their signs. That gives the distance.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Signs for each leg',
      layout: 'center',
      main: [jog, { kind: 'math', id: 'm', size: 'md', lines: ['+1.5\\ \\text{km} \\qquad \\opp{-2.4\\ \\text{km}} \\qquad +0.7\\ \\text{km}'] }],
      lines: [
        { say: 'Step one. The first leg is 1.5 kilometres in her first direction, so it is plus 1.5.', show: ['sim', 'sim.displacement'], play: 'sim.first', playDelay: 0.3 },
        { say: 'The second leg is 2.4 kilometres the opposite way, so it is minus 2.4. Notice that she runs right past her starting point.', play: 'sim.back', playDelay: 0.3 },
        { say: 'The third leg is back in her first direction, so it is plus 0.7.', show: 'm', play: 'sim.again', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'Step 2: The displacement',
      layout: 'split',
      leftWidth: 900,
      left: [{ ...jog, poster: undefined, height: 300 }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1.5 - 2.4 + 0.7', '= \\good{-0.2\\ \\text{km}}'] }],
      lines: [
        { say: 'Step two: the displacement. Add the three legs with their signs: 1.5, take away 2.4, add 0.7.', show: ['sim', 'm.0'], play: 'sim.all', playDelay: 0.3 },
        { say: 'That is minus 0.2 kilometres. She ends up 0.2 kilometres, two hundred metres, on the wrong side of her start. The arrow under the track shows it.', show: ['m.1', 'sim.displacement'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The distance',
      layout: 'split',
      leftWidth: 900,
      left: [{ ...jog, poster: undefined, height: 300 }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1.5 + 2.4 + 0.7', '= \\good{4.6\\ \\text{km}}'] }],
      lines: [
        { say: 'Step three: the distance. Every step she took counts, whichever way she was going. So add the legs without signs: 1.5, plus 2.4, plus 0.7.', show: ['sim', 'm.0'], play: 'sim.all', playDelay: 0.3 },
        { say: 'That is 4.6 kilometres.', show: ['m.1', 'sim.distance'], focus: 'm.1' },
        { say: 'So the displacement is minus 0.2 kilometres, and the distance is 4.6 kilometres. That is choice B.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['|\\Delta d| = 0.2 \\le d = 4.6\\ \\checkmark', '\\text{distance} \\ge 0\\ \\checkmark'] }],
      lines: [
        { say: 'Two quick checks. The size of a displacement can never be more than the distance, because a straight line from start to finish is the shortest way. 0.2 is much less than 4.6.', show: 'm.0' },
        { say: 'And the distance is not negative. Both checks pass.', show: 'm.1' },
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
            ['$4.6$ and $-0.2$', 'Swaps them, and a distance is **never negative**'],
            ['$4.6$ and $+0.2$', 'Swaps displacement and distance'],
            ['$+0.2$ and $4.6$', 'Wrong **sign**: she ends up on the **negative** side'],
            ['$-0.2$ and $4.6$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in the wrong choices.', show: 'traps' },
        { say: 'Choices A and C swap the two quantities. A displacement of 4.6 kilometres would mean she finished far away, which she did not. And choice A even gives a negative distance, which cannot happen.' },
        { say: 'Choice D has the right numbers, but the wrong sign. She ran 2.4 kilometres back, which is more than the 1.5 plus 0.7 she ran forwards, so she finishes on the negative side.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A dog runs 40 m east, then 65 m west, then 10 m east, along a straight beach. East is positive. What are its displacement and the distance it ran?',
          choices: ['$-15\\ \\text{m}$ and $115\\ \\text{m}$', '$+15\\ \\text{m}$ and $115\\ \\text{m}$', '$-15\\ \\text{m}$ and $-115\\ \\text{m}$', '$115\\ \\text{m}$ and $-15\\ \\text{m}$'],
          answer: 0,
          working: 'Displacement $= 40 - 65 + 10 = -15\\ \\text{m}$; distance $= 40 + 65 + 10 = 115\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A dog runs forty metres east, then sixty five metres west, then ten metres east, along a straight beach. East is positive. What are its displacement, and the distance it ran? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'With signs: forty, take away sixty five, add ten, is minus fifteen metres. Without signs: forty plus sixty five plus ten is a hundred and fifteen metres. That is choice A.', show: 'q2.answer' },
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
          items: ['**Displacement**: add the legs **with** signs', '**Distance**: add the legs **without** signs', 'A distance is **never negative**', 'The size of the displacement is never more than the distance'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. For the displacement, add the legs with their signs.', show: 'sum.0' },
        { say: 'For the distance, add them without signs.', show: 'sum.1' },
        { say: 'A distance is never negative.', show: 'sum.2' },
        { say: 'And the size of a displacement is never more than the distance. For more on distance and displacement, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
