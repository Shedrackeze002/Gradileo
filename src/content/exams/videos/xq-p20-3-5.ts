import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Exam question for lesson 3.5 (kinetic energy and the work-energy theorem): a 50 kg skater
// gliding at 8 m/s is pushed up to 12 m/s; how much work did the push do? The question is OpenStax
// Physics' own worked example, word for word (section 9.1, CC BY 4.0). W = ΔKE =
// ½ × 50 × (12² − 8²) = 25 × 80 = 2000 J.
//
// The picture (src/video/motion.ts) glides the skater along the ice at 8 m/s, then a push of
// 500 N acts over 4 m (½ × 50 × 80 ÷ 500), which takes 0.4 s, and she glides on at 12 m/s. The
// energy bars show the push's work and her kinetic energy rising together, from 1600 J to 3600 J.

const PUSH: MotionForce = { on: 'skater', name: 'Push', n: 500, tone: 'opp' };

const ice: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 26],
  lanes: [{ surface: 'smooth', label: 'Ice' }],
  bodies: [{ id: 'skater', shape: 'block', mass: 50, label: 'Skater', x: 2, v: 8, width: 1.6, tone: 'adj' }],
  energy: { max: 4000, bars: ['work', 'kinetic'], names: { work: 'Work by the push' } },
  forceScale: 0.16,
  velocityScale: 7,
  height: 420,
  poster: 'go',
  clips: {
    ready: { reset: true, phases: [{ dur: 1.2, freeze: true }] },
    go: { reset: true, phases: [{ dur: 0.5 }, { dur: 0.4, slow: 4, forces: [PUSH], note: 'Slow motion' }, { dur: 1 }] },
  },
};

const video: Explainer = {
  id: 'xq-p20-3-5',
  lessonId: '',
  exam: {
    lesson: 'p20-3-5',
    source: 'OpenStax, Physics, worked example in section 9.1, Work, Power, and the Work–Energy Theorem',
    licence: 'CC BY 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/physics/pages/9-1-work-power-and-the-work-energy-theorem',
    question:
      'An ice skater with a mass of 50 kg is gliding across the ice at a speed of 8 m/s when her friend comes up from behind and gives her a push, causing her speed to increase to 12 m/s. How much work did the friend do on the skater?',
  },
  title: 'Exam Question: How Much Work Does a Push Do on a Skater?',
  thumbnailTitle: 'Work on a Skater',
  thumbnail: 'sim',
  summary:
    'A real test question, solved one small step at a time: a 50 kg skater gliding at 8 m/s is pushed by a friend up to 12 m/s, and we find the work the push did. We find her kinetic energy before and after, and use the work-energy theorem: the work done equals the change in kinetic energy. Then we check the answer and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Push on the Ice', subtitle: 'Kinetic energy and work, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a skater who gets a push. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            'An ice skater with a mass of 50 kg is gliding across the ice at a speed of 8 m/s when her friend comes up from behind and gives her a push, causing her speed to increase to 12 m/s. How much work did the friend do on the skater?',
          answer: '$2000\\ \\text{J}$',
          working: '$W = \\tfrac{1}{2}m(v_2^2 - v_1^2) = \\tfrac{1}{2} \\times 50 \\times (144 - 64) = 2000\\ \\text{J}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'An ice skater with a mass of fifty kilograms is gliding across the ice at eight metres per second, when her friend comes up from behind and gives her a push, so that her speed increases to twelve metres per second. How much work did the friend do on the skater?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [ice, { kind: 'text', id: 'plain', size: 'lg', md: 'The push made her **faster**. How much **work** did it do?' }],
      lines: [
        { say: 'Let us watch it. The skater glides along the smooth ice at eight metres per second. Then her friend pushes her, and she glides on at twelve.', show: ['sim', 'sim.velocity'], play: 'sim.go', playDelay: 0.5 },
        { say: 'We are not told how hard the friend pushed, or for how far. Only the speeds before and after.' },
        { say: 'The question asks: how much work did the push do on her?', show: 'plain' },
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
          title: 'The work-energy theorem',
          md: 'Kinetic energy is $E_k = \\tfrac{1}{2}mv^2$. The **net work** done on an object equals the **change** in its kinetic energy: $W = E_{k2} - E_{k1}$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$2.0$ kg at $3.0$ m/s: $E_k = \\tfrac{1}{2} \\times 2.0 \\times 3.0^2 = 9.0$ J.' },
      ],
      lines: [
        { say: 'Here is what we need. Kinetic energy is one half m v squared.', show: 'def' },
        { say: 'And the work-energy theorem says that the net work done on something equals the change in its kinetic energy. That is how we can find the work without knowing the force or the distance.' },
        { say: 'For example, two kilograms moving at three metres per second has a half times two times nine: 9.0 joules.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Kinetic energy **before**: at 8 m/s', 'Kinetic energy **after**: at 12 m/s', 'Work $=$ the **change**: after minus before'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find her kinetic energy before the push.', show: 'plan.0' },
        { say: 'Second, find it after the push.', show: 'plan.1' },
        { say: 'Third, the work done is the change: after, minus before. The ice is smooth, so the push is the only force doing work along the ice.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Before',
      layout: 'split',
      leftWidth: 700,
      left: [ice],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['E_{k1} = \\tfrac{1}{2} \\times 50 \\times 8^2', '= 25 \\times 64', '= \\adj{1600\\ \\text{J}}'] }],
      lines: [
        { say: 'Step one. Before the push, she moves at eight metres per second. Her kinetic energy is a half, times fifty, times eight squared.', show: ['sim', 'sim.velocity', 'sim.energy', 'm.0'], play: 'sim.ready', playDelay: 0.3 },
        { say: 'Half of fifty is 25, and eight squared is 64.', show: 'm.1' },
        { say: '25 times 64 is 1,600 joules. That is the green bar.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: After',
      layout: 'split',
      leftWidth: 700,
      left: [ice],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['E_{k2} = \\tfrac{1}{2} \\times 50 \\times 12^2', '= 25 \\times 144', '= \\opp{3600\\ \\text{J}}'] }],
      lines: [
        { say: 'Step two. After the push, she moves at twelve metres per second. Watch the green bar of kinetic energy grow as the friend pushes.', show: ['sim', 'sim.velocity', 'sim.energy', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: 'A half times fifty is 25 again, and twelve squared is 144.', show: 'm.1' },
        { say: '25 times 144 is 3,600 joules.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The change',
      layout: 'split',
      leftWidth: 700,
      left: [ice],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['W = E_{k2} - E_{k1}', '= 3600 - 1600', '= \\good{2000\\ \\text{J}}'] }],
      lines: [
        { say: 'Step three. The work done is the change in kinetic energy: after, minus before.', show: ['sim', 'sim.velocity', 'sim.energy', 'm.0'], play: 'sim.go', playDelay: 0.3 },
        { say: '3,600 minus 1,600.', show: 'm.1' },
        { say: 'The friend did 2,000 joules of work on the skater. Look at the bars: the work of the push grows by exactly as much as her kinetic energy.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['W = \\tfrac{1}{2}m(v_2^2 - v_1^2) = 25 \\times (144 - 64) = 25 \\times 80 = 2000\\ \\text{J}\\ \\checkmark', '\\text{e.g. } 500\\ \\text{N} \\times 4\\ \\text{m} = 2000\\ \\text{J}'] }],
      lines: [
        { say: 'Let us check it in one line. Take the half m out of both: twenty five, times 144 minus 64, which is 80. That is 2,000 joules again.', show: 'm.0' },
        { say: 'And in our picture, the push was 500 newtons, acting over four metres. Force times distance is 2,000 joules too. Any push that adds the same speed does the same work, whether it is gentle over a long way or hard over a short way.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['400 J', '$\\tfrac{1}{2} \\times 50 \\times (12 - 8)^2$: squared the **change** in speed'],
            ['3600 J', 'Only the kinetic energy **after**: forgot she was already moving'],
            ['4000 J', 'Forgot the **half** in $\\tfrac{1}{2}mv^2$'],
            ['2000 J', 'Correct'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Four hundred joules comes from squaring the change in speed, four. Square each speed first, then take them away.' },
        { say: '3,600 joules is only the energy after the push. She already had 1,600 joules before her friend arrived.' },
        { say: 'And 4,000 joules forgets the half in one half m v squared.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A 1,200 kg car speeds up from 10 m/s to 20 m/s. How much net work is done on it?',
          choices: ['180,000 J', '60,000 J', '6,000 J', '240,000 J'],
          answer: 0,
          working: '$W = \\tfrac{1}{2} \\times 1200 \\times (20^2 - 10^2) = 600 \\times 300 = 180\\,000$ J.',
        },
      ],
      lines: [
        { say: 'Your turn. A 1,200 kilogram car speeds up from ten metres per second to twenty. How much net work is done on it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Half of 1,200 is 600, and twenty squared minus ten squared is 300. 600 times 300 is 180,000 joules. That is choice A.', show: 'q2.answer' },
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
          items: ['Kinetic energy: $E_k = \\tfrac{1}{2}mv^2$', 'Net work $=$ **change** in kinetic energy', 'Square each speed **first**, then subtract', 'No force or distance needed: just the speeds'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Kinetic energy is one half m v squared.', show: 'sum.0' },
        { say: 'The net work done on something equals the change in its kinetic energy.', show: 'sum.1' },
        { say: 'Square each speed first, and then take them away.', show: 'sum.2' },
        { say: 'And you do not need the force or the distance, only the speeds. For more on kinetic energy, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
