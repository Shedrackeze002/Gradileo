import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-1-1',
  lessonId: 'e8-1-1',
  title: 'Plot, Subplot and Plot Devices',
  summary:
    'The main plot is the central story and a subplot is a smaller story alongside it that echoes, contrasts with or feeds into it. Writers shape plots with devices such as in medias res, the twist ending, the frame story and the red herring.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fiction', title: 'Plot, Subplot and Plot Devices', subtitle: 'How writers arrange a story' }],
      lines: [
        { say: 'Most novels tell more than one story at a time, and writers arrange all of them with care: where to begin, what to hide, and when to surprise us.', show: 'title' },
        { say: 'In this video we see how a main plot and a subplot work together, and meet four plot devices that writers use to shape a story.' },
      ],
    },
    {
      chapter: 'Main plot and subplot',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Main plot and subplot', md: 'The **main plot** is the central story, built around the main character and the main conflict. A **subplot** is a smaller, secondary story that runs alongside it, often involving other characters.' },
        { kind: 'text', id: 'e', size: 'md', md: 'Main plot: **Ada** trains for a swimming final. Subplots: her **brother** fixes an old car; her **friend** falls out with her parents.' },
      ],
      lines: [
        { say: 'The main plot is the central story, built around the main character and the main conflict.', show: 'def' },
        { say: 'A subplot is a smaller, secondary story that runs alongside it, often involving other characters.', focus: 'def' },
        { say: 'Imagine a novel about a girl, Ada, training for a national swimming final. That is the main plot. Her brother is fixing up an old car before his driving test, and her best friend is falling out with her parents. Those are subplots.', show: 'e' },
      ],
    },
    {
      chapter: 'What a subplot does',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['A subplot can…', 'Example'],
          rows: [
            ['**echo** the main plot', 'the car keeps breaking down as Ada keeps failing her time: both are about not giving up'],
            ['**contrast** with it', 'the friend gives up on her dream, so Ada’s determination stands out'],
            ['**feed into** it', 'the car breaks down on the morning of the final, so Ada must find another way there'],
          ],
        },
      ],
      lines: [
        { say: 'A good subplot is never just filler. It usually does one of three things. It can echo the main plot. The brother’s car keeps breaking down, just as Ada keeps failing her time, so both stories are about refusing to give up.', show: 't', focus: 't.0' },
        { say: 'It can contrast with the main plot. The friend gives up on her dream, which makes Ada’s determination stand out.', focus: 't.1' },
        { say: 'Or it can feed into the main plot. The car breaks down on the morning of the final, so Ada must find another way there. Near the end, the strands often meet, which makes the ending feel earned.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Four plot devices',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Plot device', md: 'A **plot device** is a technique for arranging the events of a story.' },
        {
          kind: 'table',
          id: 't',
          head: ['Device', 'What it is'],
          rows: [
            ['***In medias res***', 'opening in the middle of the action, explaining the lead-up later'],
            ['**Twist ending**', 'a late surprise that changes how we understand everything before it'],
            ['**Frame story**', 'a story told inside another story'],
            ['**Red herring**', 'a false clue that leads to the wrong conclusion'],
          ],
        },
      ],
      lines: [
        { say: 'A plot device is a technique for arranging events. Here are four you will meet often.', show: 'def' },
        { say: 'In medias res is Latin for in the middle of things. The story opens in the middle of the action, and explains what led up to it later. It grabs the reader at once.', caption: 'In medias res is Latin for “in the middle of things”. The story opens in the middle of the action, and explains what led up to it later. It grabs the reader at once.', show: 't', focus: 't.0' },
        { say: 'A twist ending is a sudden turn near the end that changes how we understand everything before it. A good twist is surprising but, looking back, fair: the clues were there.', focus: 't.1' },
        { say: 'A frame story is a story told inside another story. And a red herring is a false clue that leads readers, and characters, to the wrong conclusion. Red herrings are common in mysteries.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'A twist is not just any surprise',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A twist is not just any surprise', md: 'A twist **changes the meaning** of what came before. A surprise with no link to earlier events feels like a trick. When you name a twist, say what it makes you **see differently**.' },
      ],
      lines: [
        { say: 'Be careful when you call something a twist. A twist changes the meaning of what came before.', show: 'm' },
        { say: 'If a story simply ends with something unexpected that has no link to earlier events, it feels like a trick, not a twist. So when you name a twist, say what it makes you see differently.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In “The Rime of the Ancient Mariner”, an old sailor stops a wedding guest in the street, then tells the long tale of his voyage, which fills almost the whole poem. Which plot device is this?',
          choices: ['A red herring', 'A twist ending', 'A frame story', 'In medias res'],
          answer: 2,
          working: 'The meeting in the street is the outer story, the frame, and the voyage is the inner story the Mariner tells.',
        },
      ],
      lines: [
        { say: 'Your turn. In Coleridge’s poem, an old sailor stops a wedding guest, then tells the long tale of his voyage. Which plot device is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C, a frame story. The meeting in the street is the outer story, and the voyage is the inner story the Mariner tells.', show: 'q2.answer' },
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
            'The **main plot** is the central story; a **subplot** runs alongside it.',
            'Subplots echo, contrast with or feed into the main plot.',
            '***In medias res*** begins in the middle of the action.',
            '**Twist ending**, **frame story** and **red herring** shape what we know and when.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The main plot is the central story, and a subplot is a smaller story alongside it.', show: 'sum.0' },
        { say: 'Subplots echo, contrast with, or feed into the main plot, and they often meet it near the end.', show: 'sum.1' },
        { say: 'In medias res begins in the middle of the action.', show: 'sum.2' },
        { say: 'And a twist ending changes how we understand the story, a frame story is a story inside a story, and a red herring is a false clue.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
