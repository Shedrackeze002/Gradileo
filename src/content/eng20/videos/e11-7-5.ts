import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-7-5',
  lessonId: 'e11-7-5',
  title: 'Word Roots and Precise Diction',
  thumbnailTitle: 'Word Roots and Precise Diction',
  thumbnail: false,
  summary:
    'Work out unfamiliar words from prefixes, roots and suffixes, then choose precise words instead of vague, jargon-filled, euphemistic or worn-out ones.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Language', title: 'Word Roots and Precise Diction', subtitle: 'Understand words, then choose them well' }],
      lines: [
        { say: 'You have probably never seen the word chronometer, but you can work it out. Chron means time, and a meter measures. A chronometer measures time very precisely.', show: 'title' },
        { say: 'A few dozen Latin and Greek roots open up thousands of English words. In this lesson you will use word parts to work out unfamiliar words, and then choose the precise word instead of a vague or worn-out one.' },
      ],
    },
    {
      chapter: 'Building words from parts',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'p',
          items: [
            'Prefix *in-*: not',
            'Root *aud*: hear',
            'Suffix *-ible*: can be',
            '*Inaudible*: not able to be heard',
          ],
        },
      ],
      lines: [
        { say: 'A root carries a word’s core meaning. A prefix goes before it and changes the meaning. A suffix goes after it, and often changes the part of speech.' },
        { say: 'Take inaudible, in the sentence Kenji spoke so softly that his answer was almost inaudible. In means not.', show: 'p.0', focus: 'p.0' },
        { say: 'Aud means hear, and ible means can be.', show: ['p.1', 'p.2'] },
        { say: 'Put together: not able to be heard. That fits, because he spoke softly.', show: 'p.3', focus: 'p.3' },
      ],
    },
    {
      chapter: 'One root, different prefixes',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 't',
          items: ['*attract*: pull toward', '*extract*: pull out', '*distract*: pull away', 'Other roots: *dict* say, *spect* look'],
        },
      ],
      lines: [
        { say: 'Words that share a root often differ only in their prefix. Attract, extract and distract all come from tract, which means pull.', show: 't' },
        { say: 'The prefix decides the direction. Other roots work the same way. Dict means say, as in dictate, and spect means look, as in inspect.', show: 't.3' },
      ],
    },
    {
      chapter: 'Four enemies of precision',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'e',
          items: [
            'Vague: *good*, *nice*, *thing*, *stuff*',
            'Jargon: *leverage our core competencies*',
            'Euphemism: *passed away* for *died*',
            'Cliché: *at the end of the day*',
          ],
        },
      ],
      lines: [
        { say: 'Diction is word choice. Four kinds of word get in the way of precision.', show: 'e.0' },
        { say: 'A vague word says too little. Jargon is insider language that outsiders may not understand.', show: ['e.0', 'e.1'] },
        { say: 'A euphemism is a soft expression that avoids a harsh truth. And a cliché is so overused that it has lost its force.', show: ['e.2', 'e.3'] },
        { say: 'Jargon is the right choice for experts, and a euphemism can be kind in a sympathy card. The problem comes when the words do not suit the reader, or hide a truth the reader needs.' },
      ],
    },
    {
      chapter: 'Revising for precision',
      layout: 'center',
      main: [
        { kind: 'text', id: 'orig', md: 'Before: *At the end of the day, the trip was really good.*', size: 'lg' },
        { kind: 'text', id: 'ans', md: 'After: *On the trip, we held a fossil that is two hundred million years old.*', size: 'lg' },
      ],
      lines: [
        { say: 'Let’s revise this one. At the end of the day is a cliché, so cut it. Really good is vague, so ask what made the trip worth taking.', show: 'orig' },
        { say: 'Replace it with a specific detail the reader can picture. And when you write very or really, look for one precise word instead: not very tired, but exhausted.', show: 'ans' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Trusting a look-alike root', md: 'The same letters can come from different roots. *Ped* means foot in *pedestrian* and *pedal*, but the *ped* in *pediatrician* comes from a Greek word for child.' },
      ],
      lines: [
        { say: 'A common mistake is trusting a look-alike root. The same letters can come from different roots.', show: 'm' },
        { say: 'Always check your guess against the sentence.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q5',
          prompt: 'Which sentence contains a cliché?',
          choices: [
            'The rescuers arrived in the nick of time.',
            'The patient reported acute cephalalgia.',
            'Her grandfather passed away last spring.',
            'The trip was a really good thing.',
          ],
          answer: 0,
          working: 'A is a worn-out expression. B is jargon, C is a euphemism, and D is vague.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these sentences contains a cliché? Pause the video and try it.', show: 'q5', wait: 6 },
        { say: 'The answer is A. In the nick of time is overused. B is jargon, C is a euphemism, and D is vague.', show: 'q5.answer' },
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
          items: ['Split a word into prefix, root and suffix, then check it against the sentence.', 'Replace vague words with specific details, and cut clichés.', 'Use jargon only for readers who know it.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Split a word into prefix, root and suffix, then check the result against the sentence.', show: 'sum.0' },
        { say: 'Replace vague words with specific details, and cut clichés.', show: 'sum.1' },
        { say: 'And use jargon only for readers who know it.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
