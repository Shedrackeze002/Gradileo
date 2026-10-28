import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c10-1-5-d',
  lessonId: 'c10-1-5',
  title: 'Lab Safety and Hazard Symbols, Part 4: Handling Chemicals and Reporting Accidents',
  thumbnailTitle: 'Handling Chemicals Safely',
  thumbnail: false,
  summary:
    'Dilute a concentrated acid by adding the acid slowly to water, never water to acid. Use a fume cupboard for harmful gases, never return unused chemicals to the stock bottle, and use the waste containers. Report every spill, breakage, cut or burn straight away, and rinse a splash in the eye with running water at the eyewash station.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 4', title: 'Handling Chemicals and Reporting Accidents', subtitle: 'Acid to water, and tell your teacher' }],
      lines: [
        { say: 'Pour water into a concentrated acid, and the first drops can boil instantly and spit hot acid out of the container. Doing it the other way round makes all the difference.', show: 'title' },
        { say: 'In this part, you will learn how to handle chemicals safely, what to report, and how to spot unsafe actions.' },
      ],
    },
    {
      chapter: 'Handle chemicals safely',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Dilute a concentrated acid by **adding the acid slowly to the water**, stirring. Never water to acid.',
            'Reactions that give off harmful gases go in a **fume cupboard**, which draws the gas away.',
            'Never put unused chemicals back in the **stock bottle**: they could contaminate it.',
            'Use the **waste containers**; pour nothing down the sink unless told it is safe.',
          ],
        },
      ],
      lines: [
        { say: 'To dilute a concentrated acid, add the acid slowly to the water, stirring. Never add water to acid.', show: 'b.0' },
        { say: 'Carry out reactions that give off harmful gases in a fume cupboard, which draws the gas away from the room.', show: 'b.1' },
        { say: 'Never put unused chemicals back in the stock bottle, where they could contaminate it.', show: 'b.2' },
        { say: 'And dispose of waste as your teacher tells you, in the waste containers provided. Do not pour chemicals down the sink unless you are told it is safe.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Acid to water',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Never add water to concentrated acid', md: 'Mixing gives out a lot of heat. Water poured into acid can boil instantly and spit hot acid out. Add the **acid to the water**, slowly, so there is plenty of water to absorb the heat.' }],
      lines: [
        { say: 'Why does the order matter? Mixing a concentrated acid with water gives out a lot of heat.', show: 'oops' },
        { say: 'Pour water into the acid, and the first drops of water can boil instantly and spit hot acid out of the container. Add the acid to the water, a little at a time, and there is always plenty of water to absorb the heat.' },
      ],
    },
    {
      chapter: 'Report everything',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Tell your teacher **straight away** about any spill, breakage, cut or burn, however small.',
            'Broken glass goes in a **special container**, not the paper bin.',
            'A chemical in the eye: rinse with plenty of clean running water at the **eyewash station** for several minutes, and tell the teacher.',
          ],
        },
      ],
      lines: [
        { say: 'Tell your teacher straight away about any spill, breakage, cut or burn, however small. Your teacher knows how to deal with each one safely.', show: 'b.0' },
        { say: 'Broken glass goes in a special container, not the paper bin, where it could cut whoever empties it.', show: 'b.1' },
        { say: 'If a chemical splashes into an eye, rinse it with plenty of clean running water at the eyewash station for several minutes, and tell the teacher.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Spotting unsafe actions',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'During a practical, Noah does four things. Which were unsafe?' },
        {
          kind: 'table',
          id: 't',
          head: ['Action', 'Safe?'],
          rows: [
            ['(1) puts on safety goggles', '[[good:safe]]'],
            ['(2) leaves the burner on the hot blue flame while fetching a test tube', '[[bad:unsafe]]'],
            ['(3) heats a test tube pointing at the wall, with nobody near', '[[good:safe]]'],
            ['(4) pours the leftover solution back into the stock bottle', '[[bad:unsafe]]'],
          ],
        },
      ],
      lines: [
        { say: 'Let’s put it together. During a practical, Noah does four things. Which of them were unsafe?', show: 'q' },
        { say: 'First, Noah puts on safety goggles. That is safe: goggles protect the eyes.', show: 't.0', focus: 't.0' },
        { say: 'Second, Noah lights a Bunsen burner, and leaves it on the hot blue flame while fetching a test tube. Unsafe: the blue flame is hard to see, and it was left unattended. The safety flame, or turning it off, was needed.', show: 't.1', focus: 't.1' },
        { say: 'Third, Noah heats a solution in a test tube, pointing it towards the wall with nobody near. Safe: the open end pointed away from people.', show: 't.2', focus: 't.2' },
        { say: 'Fourth, Noah pours the leftover solution back into the stock bottle. Unsafe: it could contaminate the bottle. It belongs in the waste container. So actions two and four were unsafe.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A concentrated acid has to be diluted with water. How should it be done?',
          choices: [
            'Pour the water quickly into the acid.',
            'Pour the acid and the water into a beaker at the same moment.',
            'Add the water to the acid in a sealed bottle and shake it.',
            'Add the acid slowly to the water while stirring.',
          ],
          answer: 3,
          working: 'Mixing gives out a lot of heat. Adding a little acid at a time to plenty of water lets the water absorb the heat, so the mixture cannot boil and spit acid.',
        },
      ],
      lines: [
        { say: 'Your turn. A concentrated acid has to be diluted with water. How should it be done? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: add the acid slowly to the water, while stirring, so the water can absorb the heat. Choice A is the dangerous way round, and C adds a sealed container, which could burst.', show: 'q.answer' },
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
            'Add **acid to water**, slowly, never water to acid.',
            'Fume cupboard for harmful gases; never back in the stock bottle; waste containers, not the sink.',
            'Report every spill, breakage, cut or burn **straight away**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Add acid to water, slowly, never water to acid.', show: 'sum.0' },
        { say: 'Use a fume cupboard for harmful gases, never put chemicals back in the stock bottle, and use the waste containers, not the sink.', show: 'sum.1' },
        { say: 'And report every spill, breakage, cut or burn to your teacher straight away. That completes this lesson, and this unit on matter and the particle model. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
