import type { Explainer } from '@/video/script.ts';
import { squeeze, threeStates } from '@/content/chem10/videos/lib/c10-particles.ts';

// Exam question for Chemistry 10 lesson 1.1 (states of matter and the particle model): what
// properties tell solids, liquids and gases apart? The question is OpenStax Chemistry 2e's own,
// word for word (end-of-chapter exercise 9, section 1.2, CC BY-NC-SA 4.0). The book's answer:
// liquids flow and take the shape of their container, solids do not; a gas's volume changes a lot
// when it is squeezed, a liquid's does not; a gas both flows and changes volume, a solid does neither.
//
// The pictures are the lesson's own simulated particles (src/video/particles.ts): the three states
// side by side, then the same push on a solid, a liquid and a gas under pistons, where only the gas
// is squashed.

const QUESTION = 'What properties distinguish solids from liquids? Liquids from gases? Solids from gases?';

const video: Explainer = {
  id: 'xq-c10-1-1',
  lessonId: '',
  exam: {
    lesson: 'c10-1-1',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 9, section 1.2, Phases and Classification of Matter',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/1-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Telling Solids, Liquids and Gases Apart. The Particle Model',
  thumbnailTitle: 'Solid, Liquid or Gas?',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: what properties tell solids from liquids, liquids from gases, and solids from gases? We watch the particles of each state move, squash all three under the same push, and find the one property that separates each pair: whether it flows, and whether it can be squeezed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solid, Liquid or Gas?', subtitle: 'The particle model, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the three states of matter. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: QUESTION,
          answer: 'Liquids **flow** and take the shape of their container; solids keep their own shape. Gases can be **squeezed** into a much smaller volume; liquids cannot. Gases flow **and** can be squeezed; solids do neither.',
          working: 'Solid vs liquid: shape (flow). Liquid vs gas: volume (compressibility). Solid vs gas: both.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'What properties distinguish solids from liquids? Liquids from gases? Solids from gases?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [threeStates('st', 420), { kind: 'text', id: 'plain', size: 'lg', md: 'For each **pair**, what can one do that the other **cannot**?' }],
      lines: [
        { say: 'Here are the same particles as a solid, a liquid and a gas. Watch how differently they move.', show: ['st', 'st.labels'] },
        { say: 'The question gives us three pairs. For each pair, we need a property that one state has and the other does not. That is what distinguish means.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['State', 'Shape', 'Volume', 'Particles'],
          rows: [
            ['Solid', 'Fixed', 'Fixed', 'Close, in rows, vibrate in place'],
            ['Liquid', 'Takes the container\'s', 'Fixed', 'Close, random, slide past each other'],
            ['Gas', 'Takes the container\'s', 'Fills the container', 'Far apart, fast, in all directions'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need: how each state behaves, and why, from its particles.', show: 'tab' },
        { say: 'A solid has a fixed shape and a fixed volume. Its particles are close together, in rows, and only vibrate in place.', show: 'tab.0' },
        { say: 'A liquid has a fixed volume, but it flows and takes the shape of its container. Its particles are still close, but they slide past one another.', show: 'tab.1' },
        { say: 'A gas has neither. It spreads out to fill its whole container, because its particles are far apart and move fast in all directions.', show: 'tab.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Solids and liquids: compare their **shape**', 'Liquids and gases: compare their **volume**', 'Solids and gases: put the two together'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, solids and liquids: we compare their shape, which is about flowing.', show: 'plan.0' },
        { say: 'Second, liquids and gases: we compare their volume, which is about squeezing.', show: 'plan.1' },
        { say: 'Third, solids and gases: we put the first two answers together.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Solids and liquids',
      layout: 'center',
      main: [threeStates('st', 400), { kind: 'text', id: 't', size: 'md', md: 'A liquid **flows**. A solid **keeps its shape**.' }],
      lines: [
        { say: 'Step one. Look at the solid. Its particles stay in their rows and only shake, so a solid keeps its own shape. A brick on a table stays a brick.', show: ['st', 'st.labels'], focus: 'st.s' },
        { say: 'Now the liquid. Its particles slide past one another, so a liquid flows, and it takes the shape of whatever it is poured into.', focus: 'st.l' },
        { say: 'So flowing, and taking the shape of the container, is what distinguishes a liquid from a solid.', show: 't' },
      ],
    },
    {
      chapter: 'Step 2: Liquids and gases',
      layout: 'center',
      main: [squeeze('sq', 400), { kind: 'text', id: 't', size: 'md', md: 'A gas can be **squeezed**. A liquid **cannot**.' }],
      lines: [
        { say: 'Step two. A liquid and a gas both flow, so flowing cannot tell them apart. Let us push down on each one with the same push and watch.', show: ['sq', 'sq.labels'] },
        { say: 'The solid and the liquid hardly move. Their particles are already touching, so there is no room to squeeze them into. The gas is squashed into a much smaller space, because its particles are far apart.', play: 'sq.push', playDelay: 0.3 },
        { say: 'So a big change in volume when it is squeezed is what distinguishes a gas from a liquid.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: Solids and gases',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['', 'Flows?', 'Can be squeezed?'],
          rows: [
            ['Solid', 'No', 'No'],
            ['Gas', 'Yes', 'Yes'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. A solid and a gas differ in both ways at once.', show: 'tab' },
        { say: 'A gas flows, and a solid does not.', show: 'tab.0' },
        { say: 'And a gas can be squeezed into a smaller volume, while a solid cannot. So both properties distinguish them.', show: 'tab.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'ans',
          check: true,
          items: [
            '**Solids and liquids**: a liquid flows and takes the shape of its container; a solid keeps its own shape.',
            '**Liquids and gases**: a gas can be squeezed into a much smaller volume; a liquid cannot.',
            '**Solids and gases**: a gas flows and can be squeezed; a solid does neither.',
          ],
        },
      ],
      lines: [
        { say: 'Here is our whole answer. Solids and liquids: a liquid flows and takes the shape of its container, and a solid keeps its own shape.', show: 'ans.0' },
        { say: 'Liquids and gases: a gas can be squeezed into a much smaller volume, and a liquid cannot.', show: 'ans.1' },
        { say: 'Solids and gases: a gas does both, and a solid does neither. Each answer comes straight from the particles: how close they are, and whether they can move past one another. That matches the book\'s answer.', show: 'ans.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Tempting answer', 'Why it does not work'],
          rows: [
            ['"Liquids flow and gases do not"', 'Gases **flow** too: think of wind'],
            ['"Solid particles do not move"', 'They **vibrate**; they just stay in place'],
            ['"Gases have no mass"', 'Gases are matter: they have mass'],
            ['"A liquid fills its container"', 'Only a **gas** fills it; a liquid keeps its volume'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Saying that liquids flow and gases do not. Gases flow as well: wind is moving air. Flowing cannot tell a liquid from a gas.' },
        { say: 'Saying that the particles of a solid do not move. They vibrate all the time. They just cannot leave their places.' },
        { say: 'Saying that gases have no mass. A gas is matter, so it has mass. And saying that a liquid fills its container. Pour a cup of water into a bucket, and it only covers the bottom. Only a gas fills its container.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'One sealed syringe holds air and another holds water. Which statement is correct?',
          choices: [
            'Only the air can be squeezed, as its particles are far apart.',
            'Only the water can be pushed in, because liquids flow.',
            'Both can be pushed in, because both flow.',
            'Neither can be pushed in, because both are fluids.',
          ],
          answer: 0,
          working: 'Gas particles are far apart, so they can be pushed closer; liquid particles already touch.',
        },
      ],
      lines: [
        { say: 'Your turn. One sealed syringe holds air, and another holds water. Which one can be pushed into a smaller volume? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is choice A: only the air, because its particles are far apart. The water\'s particles already touch, so it hardly squashes at all, even though it flows.', show: 'q2.answer' },
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
          items: ['Solid or liquid? Ask: does it **flow**?', 'Liquid or gas? Ask: can it be **squeezed**?', 'A gas does both; a solid does neither', 'Each property comes from how close the **particles** are and how they move'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. To tell a solid from a liquid, ask whether it flows.', show: 'sum.0' },
        { say: 'To tell a liquid from a gas, ask whether it can be squeezed.', show: 'sum.1' },
        { say: 'A gas does both, and a solid does neither.', show: 'sum.2' },
        { say: 'And every one of these properties comes from the particles. For more on the particle model, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
