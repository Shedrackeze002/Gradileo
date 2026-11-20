import type { Explainer, MotionBody, MotionEl } from '@/video/script.ts';
import { collision } from '@/video/motion.ts';

// Exam question for Grade 10 lesson 2.6 (Newton's third law): a truck of mass 30m crashes into a
// sedan of mass m and exerts a force F on it; what force does the sedan exert on the truck? The
// question is OpenStax Physics' own, word for word (Test Prep, section 4.4, CC BY 4.0). By the third
// law the forces are equal and opposite: F (choice b), even though the masses are not.
//
// The picture (src/video/motion.ts) crashes a 30 kg truck at 4 m/s into a 1 kg sedan at rest (the
// masses 30m and m, with m = 1 kg), and they lock together. The two forces drawn during the crash
// are the same size, and the sedan's change in speed is thirty times the truck's.

const truck: MotionBody = { id: 'truck', shape: 'cart', mass: 30, label: 'truck', x: 2, v: 4, width: 3, tone: 'opp' };
const sedan: MotionBody = { id: 'sedan', shape: 'cart', mass: 1, label: 'sedan', x: 7.6, width: 1.3, tone: 'adj' };
const [approach, touch, away] = collision(truck, sedan, { type: 'stick', after: 1.1, slow: 70, note: 'Slow motion', names: ['Sedan on truck', 'Truck on sedan'] });

const crash: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 14],
  height: 380,
  lanes: [{ surface: 'smooth', label: 'Truck: 30m. Sedan: m' }],
  bodies: [truck, sedan],
  forceScale: 2.5,
  velocityScale: 26,
  velocityDecimals: 2,
  poster: 'pair',
  clips: {
    // Up to the crash, then held still at the moment of contact with the two forces drawn.
    pair: { reset: true, phases: [approach, { dur: 1, freeze: true, forces: touch.forces }] },
    away: { phases: [touch, away] },
    all: { reset: true, phases: [approach, touch, away] },
  },
};

const QUESTION = 'A large truck with mass 30m crashes into a small sedan with mass m. If the truck exerts a force F on the sedan, what force will the sedan exert on the truck?';
const CHOICES = ['F/30', 'F', '2F', '30F'];

const video: Explainer = {
  id: 'xq-p10-2-6',
  lessonId: '',
  exam: {
    lesson: 'p10-2-6',
    source: 'OpenStax, Physics, Test Prep for section 4.4, Newton\'s Third Law of Motion',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/4-4-newtons-third-law-of-motion',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: A Truck Hits a Car. Who Pushes Harder? Newton\'s Third Law',
  thumbnailTitle: 'Truck Against Car',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a truck thirty times heavier than a sedan crashes into it, pushing on it with a force F. How hard does the sedan push back on the truck? We find the third-law pair, see that the two forces are equal and opposite, and then use Newton\'s second law to explain why the sedan still comes off far worse. Then we look at the traps hidden in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Truck Against Car', subtitle: 'Newton\'s third law, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a crash between a big truck and a small car. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A large truck with mass $30m$ crashes into a small sedan with mass $m$. If the truck exerts a force $F$ on the sedan, what force will the sedan exert on the truck?',
          choices: ['$\\dfrac{F}{30}$', '$F$', '$2F$', '$30F$'],
          answer: 1,
          working: 'The two forces are a third-law pair, so they are equal in size and opposite in direction: $F$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A large truck with mass thirty m crashes into a small sedan with mass m. If the truck exerts a force F on the sedan, what force will the sedan exert on the truck?' },
        { say: 'The choices are F over thirty, F, two F, and thirty F. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [crash, { kind: 'text', id: 'plain', size: 'lg', md: 'How hard does the sedan **push back** on the truck?' }],
      lines: [
        { say: 'Let us picture it. The truck is thirty times heavier than the sedan. Here it comes. Watch the crash in slow motion.', show: ['sim', 'sim.velocity'], play: 'sim.all', playDelay: 0.5 },
        { say: 'During the crash, the truck pushes on the sedan with a force F. The question asks: how hard does the sedan push back on the truck?', show: 'plain' },
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
          title: 'Newton\'s third law',
          md: 'When object A pushes on object B, B pushes back on A with a force that is **equal in size** and **opposite in direction**. The two forces are a **third-law pair**. They act on **different** objects, and the law holds whatever the **masses** are.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'You push a wall with $50$ N: the wall pushes you back with $50$ N.' },
      ],
      lines: [
        { say: 'Here is what we need: Newton\'s third law. When object A pushes on object B, B pushes back on A with a force that is equal in size and opposite in direction.', show: 'def' },
        { say: 'The two forces are called a third-law pair. They act on different objects, and the law holds whatever the masses are, big or small.' },
        { say: 'For example, push a wall with fifty newtons, and the wall pushes you back with fifty newtons.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the **pair** of forces', 'Apply the **third law**', 'See why the sedan still comes off **worse**'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the pair of forces in the crash.', show: 'plan.0' },
        { say: 'Second, apply the third law.', show: 'plan.1' },
        { say: 'Third, see why the sedan still comes off worse, which is what makes this question feel tricky.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The pair',
      layout: 'center',
      main: [crash, { kind: 'text', id: 't', size: 'md', md: '**Truck on sedan** and **sedan on truck**: one pair, two objects.' }],
      lines: [
        { say: 'Step one. Here is the moment of the crash, frozen. The truck pushes on the sedan, forwards. The sedan pushes on the truck, backwards.', show: 'sim', play: 'sim.pair', playDelay: 0.3 },
        { say: 'That is our pair: truck on sedan, and sedan on truck. Each force acts on a different object.', show: 't' },
      ],
    },
    {
      chapter: 'Step 2: The third law',
      layout: 'center',
      main: [crash, { kind: 'math', id: 'm', size: 'md', lines: ['F_{\\text{sedan on truck}} = F_{\\text{truck on sedan}} = \\good{F}'] }],
      lines: [
        { say: 'Step two. By the third law, the two forces are equal in size and opposite in direction. Look at the arrows: they are exactly the same length.', show: ['sim', 'm.0'], play: 'sim.pair', playDelay: 0.3 },
        { say: 'So the sedan pushes back on the truck with a force F. That is choice B. The masses do not matter for the forces.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Why the sedan comes off worse',
      layout: 'center',
      main: [
        crash,
        { kind: 'math', id: 'm', size: 'md', lines: ['a_{\\text{sedan}} = \\dfrac{F}{m} \\qquad a_{\\text{truck}} = \\dfrac{F}{30m} \\qquad \\text{30 times smaller}'] },
      ],
      lines: [
        { say: 'Step three. So why does the sedan get wrecked? The forces are the same, but the masses are not. By Newton\'s second law, acceleration is force over mass.', show: ['sim', 'm.0'], play: 'sim.pair', playDelay: 0.3 },
        { say: 'The same force on a thirty times smaller mass gives a thirty times bigger acceleration. Watch the velocities: the sedan is flung forwards, while the truck hardly slows down.', show: 'sim.velocity', play: 'sim.away' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [crash, { kind: 'math', id: 'm', size: 'md', lines: ['\\text{truck: } 4 \\to 3.87\\ \\text{m/s} \\qquad \\text{sedan: } 0 \\to 3.87\\ \\text{m/s}'] }],
      lines: [
        { say: 'Let us check with the picture. The truck went from four metres per second to 3.87: it lost 0.13 metres per second.', show: ['sim', 'sim.velocity', 'm.0'], play: 'sim.all', playDelay: 0.3 },
        { say: 'The sedan went from zero to 3.87: it gained 3.87, which is thirty times as much. Equal forces for the same short time, on masses thirty times apart, give changes in speed thirty times apart. Everything fits.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Choice', 'Where it comes from'],
          rows: [
            ['$\\dfrac{F}{30}$', 'Mixes up **force** with **acceleration**'],
            ['$30F$', 'Thinks the **heavier** object pushes harder'],
            ['$2F$', 'Adds the two forces: they act on **different** objects'],
            ['$F$', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps hidden in the wrong choices.', show: 'traps' },
        { say: 'F over thirty mixes up force with acceleration. It is the truck\'s acceleration that is thirty times smaller, not the force on it.' },
        { say: 'Thirty F feels right if you think the heavier object pushes harder. But a third-law pair is always equal, whatever the masses.' },
        { say: 'And two F adds the two forces together. They act on different objects, so they are never added.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A mosquito hits the windscreen of a moving car. Which feels the larger force during the collision?',
          choices: ['The car', 'The mosquito', 'Both feel the same size of force', 'Neither feels a force'],
          answer: 2,
          working: 'The forces are a third-law pair: equal in size. The mosquito, with its tiny mass, gets a far bigger acceleration.',
        },
      ],
      lines: [
        { say: 'Your turn. A mosquito hits the windscreen of a moving car. Which feels the larger force during the collision? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The two forces are a third-law pair, so they are the same size. That is choice C. The mosquito comes off worse only because its tiny mass gives it an enormous acceleration.', show: 'q2.answer' },
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
          items: ['Third law: forces come in **equal and opposite** pairs', 'The pair acts on **different** objects', 'Equal forces, **whatever** the masses', 'Smaller mass: **bigger acceleration**, $a = \\dfrac{F}{m}$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Forces come in pairs that are equal in size and opposite in direction.', show: 'sum.0' },
        { say: 'The two forces in a pair act on different objects.', show: 'sum.1' },
        { say: 'They are equal whatever the masses are.', show: 'sum.2' },
        { say: 'And the smaller mass gets the bigger acceleration. For more on Newton\'s third law, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
