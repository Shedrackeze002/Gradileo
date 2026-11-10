import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-3-3',
  lessonId: 'e5-3-3',
  title: 'Text Structures and Signal Words',
  summary:
    'A text’s structure is the way it is organized: sequence, compare and contrast, cause and effect, or problem and solution. Signal words such as first, however and as a result are clues to the structure.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Reading for Information', title: 'Text Structures', subtitle: 'Signal words are road signs' }],
      lines: [
        { say: 'Writers organize information in different ways, depending on what they want to explain.', show: 'title' },
        { say: 'In this lesson, you will learn the four main ways a text can be organized, and the small words that give each one away.' },
      ],
    },
    {
      chapter: 'Structure and signal words',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Text structure and signal words', md: 'A text’s **structure** is the way it is organized. **Signal words** are clues to the structure, like road signs that tell you which way the ideas are going.' },
      ],
      lines: [
        { say: 'The way a text is organized is called its structure.', show: 'def' },
        { say: 'Signal words give clues to the structure. They are a bit like road signs, telling you which way the ideas are going.', focus: 'def' },
      ],
    },
    {
      chapter: 'Four text structures',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Structure', 'What it does', 'Signal words'],
          rows: [
            ['**Sequence**', 'steps or events in order', '*first, next, then, finally*'],
            ['**Compare and contrast**', 'how things are alike and different', '*both, also, but, however, unlike*'],
            ['**Cause and effect**', 'why something happens, and what it leads to', '*because, so, as a result*'],
            ['**Problem and solution**', 'a problem, and how it was or could be fixed', '*problem, solve, to fix this*'],
          ],
        },
      ],
      lines: [
        { say: 'Here are four text structures.', show: 't' },
        { say: 'Sequence tells steps or events in order. Its signal words are first, next, then, after, and finally.', focus: 't.0' },
        { say: 'Compare and contrast shows how things are alike and different, with words like both, also, but, however and unlike.', focus: 't.1' },
        { say: 'Cause and effect tells why something happens and what it leads to, with because, so, since, and as a result.', focus: 't.2' },
        { say: 'And problem and solution names a problem and how it was, or could be, fixed.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Naming the structure',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Frogs and toads are **both** amphibians that lay their eggs in water. **However**, frogs have smooth, wet skin, **while** toads have dry, bumpy skin.'] },
        { kind: 'text', id: 'ans', size: 'lg', md: '**Compare and contrast**' },
      ],
      lines: [
        { say: 'What is the structure of this paragraph?', show: 'q' },
        { say: 'Both tells us how frogs and toads are alike. However, and while, tell us how they are different.', focus: 'q' },
        { say: 'So the paragraph compares and contrasts.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Cause and effect is not sequence', md: '“First we ate lunch, then it rained” is **sequence**. “Because it rained, the game was cancelled” is **cause and effect**: the rain made the game stop.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Two events can come one after another without one causing the other.', show: 'm' },
        { say: 'First we ate lunch, then it rained, is sequence. Eating lunch did not make it rain. But because it rained, the game was cancelled, is cause and effect. The rain made the game stop.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“The river flooded the road. ____, the school bus had to take a longer route.” Which signal word fits best?',
          choices: ['First', 'Both', 'Unlike', 'As a result'],
          answer: 3,
          working: 'The flood caused the bus to change its route, so a cause-and-effect signal word is needed.',
        },
      ],
      lines: [
        { say: 'Your turn. Which signal word fits the gap best? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D, as a result. The flood caused the bus to change its route, so we need a cause and effect signal word. When you see as a result, get ready for an effect.', show: 'q2.answer' },
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
            '**Sequence**: steps in order (*first, next, finally*).',
            '**Compare and contrast**: alike and different (*both, however*).',
            '**Cause and effect**: why something happens (*because, as a result*).',
            '**Problem and solution**: a problem and its fix (*to solve this*).',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Sequence tells steps in order.', show: 'sum.0' },
        { say: 'Compare and contrast shows how things are alike and different.', show: 'sum.1' },
        { say: 'Cause and effect tells why something happens.', show: 'sum.2' },
        { say: 'And problem and solution names a problem and its fix. Signal words help you spot each one, as a reader and as a writer.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
