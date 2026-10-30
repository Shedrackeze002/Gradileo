import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-6-5',
  lessonId: 'e12-6-5',
  title: 'Style: Precision, Concision and Voice',
  thumbnailTitle: 'Precision and Voice',
  thumbnail: false,
  summary:
    'Two essays can make the same argument and earn different marks because one has better style. Learn to turn nominalizations back into verbs, trim hedges, keep one academic voice and put the key idea in the stress position.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Writing', title: 'Style: Precision, Concision and Voice', subtitle: 'Easier to follow, sharper, more confident' }],
      lines: [
        { say: 'Two essays can make the same argument, with the same evidence, and still earn different marks. One is easier to follow, sharper and more confident than the other.', show: 'title' },
        { say: 'That difference is style. In this lesson, you will revise prose for precision and concision, keep one consistent academic voice, and shape sentences so that the most important idea lands with force.' },
      ],
    },
    {
      chapter: 'Precision and concision',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Wordy**: There was an attempt on the part of the speaker to give an explanation of the reasons for his silence.', '**Revised**: The speaker tried to explain why he was silent.'],
        },
      ],
      lines: [
        { say: 'A nominalization is an action turned into a noun. Decide becomes make a decision, and explain becomes provide an explanation. Too many of them make prose slow and vague, because a weak verb does the work.' },
        { say: 'Look at this sentence. The words attempt and explanation hide the verbs try and explain.', show: 'b.0', focus: 'b.0' },
        { say: 'Find the real subject, the speaker, and rebuild the sentence around it, keeping every part of the meaning.', show: 'b.1', focus: 'b.1' },
        { say: 'Concision does not mean cutting until meaning is lost. Remove empty words, not ideas.' },
      ],
    },
    {
      chapter: 'Hedges and voice',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Stacked hedges**: It could perhaps be argued that the ending may be somewhat ironic.', '**One honest hedge**: The ending can be read as ironic.'],
        },
        {
          kind: 'bullets',
          id: 'v',
          items: ['**Slang**: The ending is a total downer.', '**Plain**: The ending is bleak.'],
        },
      ],
      lines: [
        { say: 'Hedges are words that soften a claim. One honest hedge, where the evidence really is limited, is a mark of careful thinking. Four in a row only blur the claim.', show: 'b' },
        { say: 'An academic voice is formal but plain. It writes about literature in the present tense, stays in the third person rather than shifting to you, and chooses the exact word.', hide: 'b', show: 'v' },
        { say: 'Watch for slang, and for inflated diction too. A thesaurus can make a sentence sound grand and say less. Precision, not decoration, is what makes academic writing sound authoritative.' },
      ],
    },
    {
      chapter: 'Emphasis and rhythm',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['*The ship sank on its first voyage, although it had been called unsinkable.*', '*It had been called unsinkable, and it sank on its first voyage.*'],
        },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['For a year she trained for the marathon, running through rain and snow and studying the course map every night until she knew each hill by heart. At the twentieth kilometre, she fell.'],
        },
      ],
      lines: [
        { say: 'The stress position is the end of a sentence, where readers give the most weight. Build the context first, and save the key idea for the last words.', show: 'b.0' },
        { say: 'The first sentence ends on an old claim. The second ends on the fact that matters.', show: 'b.1', focus: 'b.1' },
        { say: 'Rhythm comes from varying sentence length. Gather the build-up into one long sentence, then give the climax a short sentence of its own. Spend the short sentence on the moment that matters.', hide: 'b', show: 'q' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'm',
          tone: 'mistake',
          title: 'Mistaking long words for a formal voice',
          md: 'A thesaurus can make a sentence sound grand and say less. Choose the plain word if it does the job.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake: thinking that long words make a formal voice.', show: 'm' },
        { say: 'A grand word is right only if no plain word does the job, and only if your reader will understand it.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence saves its key idea, the lost village, for the last words?',
          choices: [
            'The village was gone by noon, after a storm that had hit at dawn.',
            'The storm hit the village at dawn, which no one had expected.',
            'The storm hit at dawn, and by noon the village was gone.',
            'By noon the village was gone, though no one had seen it at dawn.',
          ],
          answer: 2,
          working: 'C builds the context first and ends on the key fact. A, B and D all end on a minor detail.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence saves its key idea, the lost village, for the last words? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. It builds the context first, and ends on the key fact. A, B and D all end on a minor detail.', show: 'q2.answer' },
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
            'Turn nominalizations into verbs, and cut empty phrases.',
            'Keep one plain academic voice.',
            'Put the key idea last, and vary sentence length.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Turn nominalizations back into verbs, and cut empty phrases without cutting meaning.', show: 'sum.0' },
        { say: 'Keep one academic voice: present tense, no you, no slang and no inflated words.', show: 'sum.1' },
        { say: 'And put the key idea in the stress position, with a short sentence to land the climax.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
