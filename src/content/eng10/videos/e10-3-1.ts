import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-3-1',
  lessonId: 'e10-3-1',
  title: 'Reading Shakespeare’s Language',
  thumbnailTitle: 'Reading Shakespeare',
  thumbnail: false,
  summary:
    'Shakespeare’s English is old but still modern English. Learn thou, thee, thy and thine, the words that have changed, and a method for paraphrasing any line.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Shakespeare', title: 'Reading Shakespeare’s Language', subtitle: 'From old words to plain English' }],
      lines: [
        { say: 'Before a single character steps on stage in Romeo and Juliet, a speaker called the Chorus tells the audience the whole story, and even how it ends.', show: 'title' },
        { say: 'Shakespeare’s English is more than four hundred years old, but it is still modern English. In this lesson, you will learn the few old forms that cause most of the trouble, and a method for turning any line into plain words.' },
      ],
    },
    {
      chapter: 'Thou, thee, thy and thine',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Old form', 'Modern English'],
          rows: [
            ['thou', 'you (the subject)'],
            ['thee', 'you (the object)'],
            ['thy', 'your'],
            ['thine', 'your, before a vowel sound'],
          ],
        },
        { kind: 'callout', id: 'verbs', tone: 'definition', title: 'Verbs with thou and she', md: 'After **thou**: *knowest*, *hast*, *art*. After **he** or **she**: *knoweth*, *hath*, *doth*.' },
      ],
      lines: [
        { say: 'Shakespeare’s characters have two words for you. The word you is polite or formal, while thou is used between family, close friends and lovers.', show: 't.0', focus: 't.0' },
        { say: 'Thee is you as the object, as in I take thee at thy word.', show: 't.1', focus: 't.1' },
        { say: 'Thy and thine both mean your. Thine is used before a vowel sound, like thine eye.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'Verbs change too. After thou, a verb ends in est, as in thou knowest, and are becomes art. After he or she, a verb often ends in eth, as in she hath.', show: 'verbs' },
      ],
    },
    {
      chapter: 'Words that have changed',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'w',
          head: ['Word', 'Meaning'],
          rows: [
            ['wherefore', 'why'],
            ['ere', 'before'],
            ['anon', 'right away'],
            ['hie', 'hurry'],
            ['hence', 'from here, away'],
            ['hither', 'here, to this place'],
          ],
        },
      ],
      lines: [
        { say: 'A few common words have dropped out of use or changed their meaning. These are the ones that trip readers up most often.', show: 'w.0' },
        { say: 'Ere means before, and anon means right away.', show: ['w.1', 'w.2'], focus: ['w.1', 'w.2'] },
        { say: 'Hie means hurry. Hence means from here, and hither means to this place.', show: ['w.3', 'w.4', 'w.5'], focus: ['w.3', 'w.4', 'w.5'] },
      ],
    },
    {
      chapter: 'Paraphrasing a line',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: '> Deny thy father and refuse thy name.\\\n> Or if thou wilt not, be but sworn my love.' },
        {
          kind: 'bullets',
          id: 'steps',
          items: ['Replace the old words', 'Find the meaning of each sentence', 'Use the context: who is speaking, and why'],
        },
        { kind: 'text', id: 'ans', size: 'md', md: '**Paraphrase:** Reject your father and your name. Or, if you won’t, just swear that you love me.' },
      ],
      lines: [
        { say: 'To paraphrase is to put a passage into your own words, keeping all of its meaning. Here are two lines Juliet speaks at her window.', show: 'q' },
        { say: 'Step one: replace the old words. Thy means your, and wilt means will.', show: 'steps.0' },
        { say: 'Step two: find the meaning of each sentence. Deny here means reject, and be but sworn my love means just swear that you love me.', show: 'steps.1' },
        { say: 'Step three: use the context. Juliet has just learned that Romeo belongs to her family’s enemy.', show: 'steps.2' },
        { say: 'Put together, she is saying: reject your father and your name, or if you won’t, just swear that you love me.', show: 'ans' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'text', id: 'line', size: 'md', md: '> O Romeo, Romeo, wherefore art thou Romeo?' },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Wherefore does not mean where', md: '*Wherefore* means **why**. Juliet is not asking where Romeo is. She is asking why he has to be a Montague.' },
      ],
      lines: [
        { say: 'Here is the most famous mistake of all. Juliet says: O Romeo, Romeo, wherefore art thou Romeo?', show: 'line' },
        { say: 'Many people think she is wondering where Romeo is. But wherefore means why. She is asking why he has to be Romeo, the son of her family’s enemy.', show: 'mis' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a play by Shakespeare, a character says “Ere night, hie thee hence.” Which is the best modern version?',
          choices: ['Before night, hide away from this place.', 'Before night, hurry away from here.', 'After nightfall, come here to me soon.', 'Even at night, hurry back to me now.'],
          answer: 1,
          working: '*Ere* means before, *hie* means hurry, *thee* means you and *hence* means from here.',
        },
      ],
      lines: [
        { say: 'Your turn. A character says: Ere night, hie thee hence. Which of the four choices is the best modern version? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Ere means before, hie means hurry, and hence means from here. Choice A is a trap: hie is not the word hide.', show: 'q.answer' },
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
            '**Thou** and **thee** mean you; **thy** and **thine** mean your.',
            'Learn the changed words: **wherefore** means why, **ere** means before.',
            'To paraphrase, replace the old words, rebuild the order, and check the context.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Thou and thee mean you, and thy and thine mean your.', show: 'sum.0' },
        { say: 'Learn the words that have changed. Wherefore means why, and ere means before.', show: 'sum.1' },
        { say: 'And to paraphrase, replace the old words, rebuild the word order, and check the meaning against who is speaking and why.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
