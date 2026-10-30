import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-3-1',
  lessonId: 'e11-3-1',
  title: 'Macbeth: Language and Imagery',
  thumbnailTitle: 'Macbeth: Language',
  thumbnail: false,
  summary:
    'Most of Macbeth is blank verse, with prose for the Porter and the sleepwalking Lady Macbeth and a chant for the Witches. Learn to paraphrase hard lines and to follow the motifs of blood, darkness, sleep and clothes.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Shakespeare: Macbeth', title: 'Language and Imagery', subtitle: 'Verse, paraphrase and motifs' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Fair is foul, and foul is fair:', 'Hover through the fog and filthy air.'],
          by: 'The Witches, Act 1, Scene 1',
        },
      ],
      lines: [
        { say: 'Three witches stand in a storm, and before they vanish they chant a riddle.', show: ['title', 'q.0', 'q.1'] },
        { say: 'William Shakespeare wrote Macbeth more than four hundred years ago. In this lesson, you will learn to read its verse, to paraphrase its hard lines, and to follow the patterns of images that run through the play.' },
      ],
    },
    {
      chapter: 'Verse, prose and chant',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['So foul and fair a day I have not seen.'], by: 'Macbeth, Act 1, Scene 3' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Nobles**: blank verse, five beats a line', '**The Porter and the sleepwalking Lady Macbeth**: prose', '**The Witches**: short, rhyming chant'],
        },
      ],
      lines: [
        { say: 'Most of the play is in blank verse: unrhymed lines of about ten syllables, with five beats in a da-DUM rhythm. Macbeth’s first line is a good example.', show: 'q' },
        { say: 'Read it aloud. So FOUL and FAIR a DAY i HAVE not SEEN. It echoes the Witches, before he has even met them.', focus: 'q' },
        { say: 'Nobles speak in verse. The drunken Porter speaks in prose, and so does Lady Macbeth when she walks in her sleep.', show: ['b.0', 'b.1'], focus: ['b.0', 'b.1'] },
        { say: 'The Witches chant in short, rhyming lines, like a spell.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Paraphrasing Macbeth',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Paraphrase', md: 'Your own plain words, keeping every idea and image and adding nothing of your own.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Present fears', 'Are less than horrible imaginings.'], by: 'Macbeth, Act 1, Scene 3' },
        { kind: 'text', id: 'ans', size: 'md', md: '**Paraphrase:** Real dangers frighten me less than the horrible things I imagine.' },
      ],
      lines: [
        { say: 'A paraphrase puts a passage into your own plain words, keeping every idea and image. It is about as long as the original.', show: 'def' },
        { say: 'Macbeth has just learned that he is Thane of Cawdor, which means a Scottish lord. Already he is thinking how the rest of the Witches’ prophecy might come true.', show: 'q' },
        { say: 'First, read to the full stops, not to the end of each line. Then replace the hard words. Present fears are real dangers in front of him.', focus: 'q' },
        { say: 'Now put every idea into plain modern English.', show: 'ans' },
      ],
    },
    {
      chapter: 'Motifs',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q1',
          size: 'md',
          lines: ['For brave Macbeth (well he deserves that name),', 'Disdaining Fortune, with his brandish’d steel,', 'Which smok’d with bloody execution,'],
          by: 'Captain, Act 1, Scene 2',
        },
        {
          kind: 'quote',
          id: 'q2',
          size: 'md',
          lines: ['Will all great Neptune’s ocean wash this blood', 'Clean from my hand? No, this my hand will rather', 'The multitudinous seas incarnadine,', 'Making the green one red.'],
          by: 'Macbeth, Act 2, Scene 2',
        },
      ],
      lines: [
        { say: 'A motif is an image that returns again and again, gathering meaning each time. The play has motifs of blood, darkness, sleep, clothes and sickness.' },
        { say: 'Blood changes the most. In Act 1, a wounded captain praises Macbeth in battle, and the blood is a mark of honour.', show: ['q1.0', 'q1.1', 'q1.2'] },
        { say: 'Minutes after he kills Duncan, Macbeth stares at his hands. Now the blood is guilt so great that an ocean could not wash it off.', hide: 'q1', show: ['q2.0', 'q2.1', 'q2.2', 'q2.3'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Stars, hide your fires!'], by: 'Macbeth, Act 1, Scene 4' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Paraphrase:** Stars, stop shining.', '**Not a paraphrase:** It is getting dark.'],
        },
      ],
      lines: [
        { say: 'Here is a common mistake. Do not explain instead of paraphrasing. Macbeth says: Stars, hide your fires!', show: 'q' },
        { say: 'A paraphrase keeps the images, so the plain version is, Stars, stop shining. It is not, It is getting dark. Macbeth is asking the night to hide his wishes.', show: ['b.0', 'b.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Macbeth cries, “Stars, hide your fires!” Which is the best paraphrase?',
          choices: [
            'Stars, stop shining, so that no one sees my wishes.',
            'The sky is growing dark, so the stars are fading.',
            'Stars, shine more brightly, so that I can see my way.',
            'Stars, tell everyone about the wishes that I hide.',
          ],
          answer: 0,
          working: 'A paraphrase keeps the image: the stars are asked to stop shining, so that the night hides his wishes.',
        },
      ],
      lines: [
        { say: 'Your turn. Macbeth cries, Stars, hide your fires! Which of the four choices is the best paraphrase? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. A paraphrase keeps the image, so the stars are asked to stop shining.', show: 'q2.answer' },
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
            'Blank verse for the nobles, prose for the Porter, a chant for the Witches.',
            'To paraphrase, read to the punctuation and keep every image.',
            'A motif is a recurring image: blood moves from honour to guilt.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Most of the play is in blank verse. The Porter and the sleepwalking Lady Macbeth speak prose, and the Witches chant.', show: 'sum.0' },
        { say: 'To paraphrase, read to the punctuation, replace the old words, and keep every idea and image.', show: 'sum.1' },
        { say: 'And a motif is an image that returns. Blood moves from honour to guilt, as the play goes on.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
