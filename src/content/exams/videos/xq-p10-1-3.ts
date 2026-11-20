import type { Explainer, MotionEl } from '@/video/script.ts';
import { halt, run } from '@/content/phys10/videos/lib/track.ts';

// Exam question for Grade 10 lesson 1.3 (distance, displacement and velocity): a car travels at an
// average speed of 23 m/s for 82 s; which displacement could it NOT have had? The question is
// OpenStax Physics' own, word for word (Test Prep, section 2.2, CC BY 4.0). It travels a distance
// of 23 × 82 = 1,886 m, and a displacement can never be longer than the distance travelled, so
// 2,000 m west is impossible (choice b). The direction of a displacement does not matter here.
//
// The pictures (src/video/motion.ts) drive two cars at 23 m/s for 82 s, ten times as fast as life:
// one straight on, with a displacement of the whole 1,886 m, and one that turns back near the end,
// 1,693 m out and 193 m back, with a displacement of 1,500 m. The distances and the displacement
// arrows come out of the motion.

const OUT = 1693 / 23;
const BACK = 193 / 23;

/** One car on its own road, driven at 23 m/s for 82 s, ten times as fast as life. */
const road = (id: string, label: string, tone: 'adj' | 'opp', phases: MotionEl['clips'][string]['phases']): MotionEl => ({
  kind: 'motion',
  id,
  span: [-150, 2700],
  height: 290,
  lanes: [{ surface: 'smooth', label }],
  bodies: [{ id: 'car', shape: 'cart', mass: 1, label: id === 'a' ? 'A' : 'B', x: 0, width: 110, tone }],
  velocityScale: 3,
  poster: 'go',
  clips: { go: { reset: true, phases } },
});

const FAST = { slow: 0.1, note: 'Ten times as fast' };
const carA = road('a', 'Car A: straight on', 'adj', [{ ...run(82, { car: 23 }), ...FAST }, halt('car')]);
const carB = road('b', 'Car B: turns back near the end', 'opp', [{ ...run(OUT, { car: 23 }), ...FAST }, { ...run(BACK, { car: -23 }), ...FAST }, halt('car')]);

const video: Explainer = {
  id: 'xq-p10-1-3',
  lessonId: '',
  exam: {
    lesson: 'p10-1-3',
    source: 'OpenStax, Physics, Test Prep for section 2.2, Speed and Velocity',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/2-2-speed-and-velocity',
    question: 'A car travels with an average speed of 23 m/s for 82 s. Which of the following could NOT have been the car\'s displacement?',
    choices: ['1,700 m east', '2,000 m west', '1,600 m north', '1,500 m south'],
  },
  title: 'Exam Question: Which Displacement Is Impossible? Distance and Displacement',
  thumbnailTitle: 'Which Is Impossible?',
  thumbnail: 'b',
  summary:
    'A real test question, solved one small step at a time: a car travels at an average speed of 23 m/s for 82 s, and we find which of four displacements it could not have had. We work out the distance it travelled, see why a displacement can never be longer than the distance, and check each choice against it. Then we look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Is Impossible?', subtitle: 'Distance and displacement, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a car trip, and a displacement that could never happen. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A car travels with an average speed of 23 m/s for 82 s. Which of the following could NOT have been the car\'s displacement?',
          choices: ['1,700 m east', '2,000 m west', '1,600 m north', '1,500 m south'],
          answer: 1,
          working: 'Distance $= 23 \\times 82 = 1886$ m. A displacement can never be longer than the distance travelled, and $2000 > 1886$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A car travels with an average speed of 23 metres per second for 82 seconds. Which of the following could not have been the car\'s displacement?' },
        { say: 'The choices are 1,700 metres east, 2,000 metres west, 1,600 metres north, and 1,500 metres south. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [carA, carB],
      lines: [
        { say: 'Let us picture it. Here are two cars, each driving at 23 metres per second for 82 seconds, sped up ten times. Car A goes straight on. Car B turns back near the end.', show: ['a', 'b', 'a.clock', 'b.clock', 'a.distance', 'b.distance'], play: ['a.go', 'b.go'], playDelay: 0.5 },
        { say: 'Both covered the same distance. But they ended up in different places. The question asks: which change of position could this trip never give?' },
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
          md: '**Distance** is how far you travel along your path. **Displacement** is the straight-line change in position, from start to finish, **with** a direction. The straight line is the shortest way, so a displacement is **never longer** than the distance.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'Walk $5$ m east, then $3$ m west: distance $8$ m, displacement $2$ m east.' },
      ],
      lines: [
        { say: 'Here is what we need. Distance is how far you travel along your path, every bend and turn included.', show: 'def' },
        { say: 'Displacement is the straight line from where you started to where you finished, with a direction. A straight line is the shortest way between two places, so the displacement can be equal to the distance, or shorter, but never longer.' },
        { say: 'For example, walk five metres east, then three metres west. You walked eight metres, but your displacement is only two metres east.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **distance** travelled: speed $\\times$ time', 'The displacement can be **at most** that long', 'Check each choice'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find how far the car travelled.', show: 'plan.0' },
        { say: 'Second, that is the longest any displacement could be.', show: 'plan.1' },
        { say: 'Third, check each choice against it.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The distance',
      layout: 'center',
      main: [carA, { kind: 'math', id: 'm', size: 'md', lines: ['d = v \\times t = 23 \\times 82 = \\adj{1886\\ \\text{m}}'] }],
      lines: [
        { say: 'Step one. Speed is distance over time, so the distance is speed times time.', show: ['a', 'a.clock', 'a.distance'], play: 'a.go', playDelay: 0.3 },
        { say: '23 metres every second, for 82 seconds: 1,886 metres.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: The longest displacement',
      layout: 'center',
      main: [{ ...carA, height: 330 }, { kind: 'text', id: 't', size: 'lg', md: 'Straight on: displacement $=$ distance $= 1886$ m' }],
      lines: [
        { say: 'Step two. Watch the displacement arrow. Car A drove straight on, so its displacement is the whole 1,886 metres, the same as the distance. That is the longest a displacement can be.', show: ['a', 'a.displacement', 'a.distance'], play: 'a.go', playDelay: 0.3 },
        { say: 'To be any further away, it would have to travel further.', show: 't' },
      ],
    },
    {
      layout: 'center',
      main: [{ ...carB, height: 330 }, { kind: 'text', id: 't', size: 'lg', md: 'Turns back: displacement **shorter** than the distance' }],
      lines: [
        { say: 'Car B turned back near the end. It travelled the same distance, but its displacement is only 1,500 metres. Any turn, any bend, makes the displacement shorter.', show: ['b', 'b.displacement', 'b.distance'], play: 'b.go', playDelay: 0.3 },
        { say: 'And the direction does not matter. The road could point east, west, north or south. Only the length is limited.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: Check each choice',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'check',
          head: ['Choice', 'Compared with 1,886 m', 'Possible?'],
          rows: [
            ['1,700 m east', 'Shorter', 'Yes'],
            ['2,000 m west', '**Longer**', '**No**'],
            ['1,600 m north', 'Shorter', 'Yes'],
            ['1,500 m south', 'Shorter', 'Yes'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. Check each choice against 1,886 metres.', show: 'check' },
        { say: '1,700, 1,600 and 1,500 metres are all shorter, so each could happen, if the road bent or the car turned back a little.' },
        { say: 'But 2,000 metres is longer than the car travelled. It could not have ended up further away than it went. So the answer is choice B: 2,000 metres west.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2000 \\div 82 = 24.4\\ \\text{m/s} > 23\\ \\text{m/s}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it another way. To be 2,000 metres away after 82 seconds, even driving in a perfectly straight line, the car would need an average speed of 24.4 metres per second.', show: 'm.0' },
        { say: 'But its average speed was only 23. So 2,000 metres really is impossible.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Why it is tempting'],
          rows: [
            ['1,700 m east', 'Not **exactly** 1,886 m, but a turn makes it shorter'],
            ['1,600 m north', 'The **direction** does not matter'],
            ['1,500 m south', 'Shorter is always **possible**'],
            ['2,000 m west', 'Correct: **longer** than the distance'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'Some people think the displacement must equal 1,886 metres exactly. It only does if the car drives in a perfectly straight line.' },
        { say: 'Others worry about the directions: east, north, south. The question never said which way the road went, so any direction is possible.' },
        { say: 'Remember the one rule: the displacement can be shorter than the distance, but never longer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cyclist rides with an average speed of 5.0 m/s for 60 s. Which of these could have been her displacement?',
          choices: ['400 m north', '350 m east', '250 m south', '500 m west'],
          answer: 2,
          working: 'Distance $= 5.0 \\times 60 = 300$ m. Only $250$ m is not longer than that.',
        },
      ],
      lines: [
        { say: 'Your turn. A cyclist rides with an average speed of 5.0 metres per second for sixty seconds. Which of these could have been her displacement? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'She travelled 5.0 times 60: 300 metres. Her displacement can be at most 300 metres, so only 250 metres south is possible. That is choice C.', show: 'q2.answer' },
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
          items: ['**Distance**: the length of the path. **Displacement**: start to finish, with a direction', 'Distance $=$ speed $\\times$ time', 'A displacement is **never longer** than the distance', 'Equal only for a **straight**, one-way trip'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Distance is the length of the path. Displacement is the straight line from start to finish, with a direction.', show: 'sum.0' },
        { say: 'Distance is speed times time.', show: 'sum.1' },
        { say: 'A displacement is never longer than the distance travelled.', show: 'sum.2' },
        { say: 'They are equal only for a straight trip that never turns back. For more on displacement and velocity, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
