import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-3-1',
  lessonId: 'e12-3-1',
  title: 'Hamlet: Language and Soliloquies',
  thumbnailTitle: 'Hamlet: Language',
  thumbnail: false,
  summary:
    'Hamlet is mostly blank verse, with prose and puns when Hamlet plays the madman. Learn to paraphrase its language, watch for words that changed their meaning, and trace the turns of a soliloquy.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Shakespeare: Hamlet', title: 'Language and Soliloquies', subtitle: 'Verse, paraphrase and a mind that argues' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Barnardo. Who’s there?', 'Francisco. Nay, answer me. Stand and unfold yourself.'],
          by: 'Hamlet, Act 1, Scene 1',
        },
      ],
      lines: [
        { say: 'Midnight on the battlements of Elsinore, the royal castle of Denmark. A guard comes to take over the watch, and calls out into the dark.', show: ['title', 'q.0', 'q.1'] },
        { say: 'The play opens with a question. In this lesson, you will learn to paraphrase the language of Hamlet, and to trace the arguments of its soliloquies.' },
      ],
    },
    {
      chapter: 'Verse, prose and wordplay',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['A little more than kin, and less than kind.'], by: 'Hamlet, Act 1, Scene 2' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**The King at court, and Hamlet alone**: blank verse', '**Hamlet playing the madman**: prose and riddles', '**Hamlet’s puns**: two meanings at once'],
        },
      ],
      lines: [
        { say: 'Most of Hamlet is blank verse: unrhymed lines of about ten syllables, with five beats in a da-DUM rhythm.', show: 'b.0' },
        { say: 'But when Hamlet plays the madman, he slips into prose, and his answers turn into riddles. Asked what he reads, he says only, Words, words, words.', show: 'b.1' },
        { say: 'He is also the great punster of the play. His first line, spoken aside so that only the audience hears it, is this.', show: 'q' },
        { say: 'Claudius is now more than kin, because he is Hamlet’s uncle and his stepfather at once. But he is less than kind: not truly of the same family, and not kindly either.', show: 'b.2', focus: 'q' },
      ],
    },
    {
      chapter: 'Paraphrasing Hamlet',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Paraphrase', md: 'Your own plain words, keeping every idea and image and adding nothing of your own.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Thrift, thrift, Horatio! The funeral bak’d meats', 'Did coldly furnish forth the marriage tables.'], by: 'Hamlet, Act 1, Scene 2' },
        { kind: 'text', id: 'ans', size: 'md', md: '**Paraphrase:** It was to save money, Horatio! The pies baked for the funeral were served cold at the wedding feast.' },
      ],
      lines: [
        { say: 'A paraphrase puts a passage into your own plain words, keeping every idea and image.', show: 'def' },
        { say: 'Read to the punctuation, not to the end of the line. Here Hamlet answers his friend Horatio.', show: ['q.0', 'q.1'] },
        { say: 'The baked meats are the pies made for the funeral, and coldly furnish forth means they were served up again, cold. Hamlet praises thrift, but he does not mean it. So keep the tone as well.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'The soliloquies',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Soliloquy', md: 'A speech in which a character alone on stage speaks their thoughts aloud.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['To be, or not to be, that is the question:', 'Whether ’tis nobler in the mind to suffer', 'The slings and arrows of outrageous fortune,'],
          by: 'Hamlet, Act 3, Scene 1',
        },
      ],
      lines: [
        { say: 'A soliloquy is a speech in which a character alone on stage speaks their thoughts aloud. Hamlet hides his thoughts at court, so these are where we learn what he really thinks.', show: 'def' },
        { say: 'The most famous opens with a question bigger than revenge: whether it is nobler to endure life’s troubles, or to end them.', show: ['q.0', 'q.1', 'q.2'], focus: 'q.0' },
        { say: 'Each soliloquy is an argument with himself, and each one moves. To trace one, mark every turn, every place where the thought changes direction.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Coil**: not a rope, but turmoil', '**Rub**: not a massage, but an obstacle', '**Quietus**: not quiet, but the settling of a debt'],
        },
      ],
      lines: [
        { say: 'Here is a common mistake. Some words look modern, but meant something else.', show: 'b.0' },
        { say: 'The coil in this mortal coil is not a coil of rope, but the turmoil and trouble of life. A rub is not a massage, but an obstacle.', show: 'b.1' },
        { say: 'And a quietus was the settling of a debt, so to make one’s quietus is to end one’s life.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Hamlet speaks of “this mortal coil”. What does coil mean here?',
          choices: [
            'A coil of rope that ties a person to life.',
            'The turmoil, fuss and trouble of life.',
            'A spring that keeps the body moving.',
            'The cloth that wraps the body in death.',
          ],
          answer: 1,
          working: 'A word that looks familiar may have changed its meaning. Here coil is turmoil, the fuss and trouble of life.',
        },
      ],
      lines: [
        { say: 'Your turn. Hamlet speaks of this mortal coil. What does coil mean here? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. A word that looks familiar may have changed its meaning. Here coil is turmoil, the fuss and trouble of life.', show: 'q2.answer' },
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
            'Blank verse, with prose and puns when Hamlet plays the madman.',
            'To paraphrase, read to the punctuation and keep every idea and the tone.',
            'A soliloquy shows private thoughts; trace it by finding its turns.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Hamlet is mostly in blank verse, with prose and puns when Hamlet plays the madman.', show: 'sum.0' },
        { say: 'To paraphrase, read to the punctuation, and keep every idea and the tone.', show: 'sum.1' },
        { say: 'And a soliloquy shows a character’s private thoughts. Trace it by finding its turns.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
