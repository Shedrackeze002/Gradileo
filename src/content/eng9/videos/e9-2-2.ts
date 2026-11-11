import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-2-2',
  lessonId: 'e9-2-2',
  title: 'The Sonnet and Its Sounds',
  summary:
    'A sonnet has fourteen lines: a Shakespearean sonnet has three quatrains and a couplet, and a Petrarchan sonnet has an octave and a sestet. The volta is the turn, often marked by but or yet, as at line 9 of Rossetti’s “Remember”. Alliteration, assonance, sibilance and onomatopoeia shape how a line sounds and feels.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'The Sonnet and Its Sounds', subtitle: 'Fourteen lines and a turn' }],
      lines: [
        { say: 'The sonnet has been a favourite form of poets for over seven hundred years: fourteen lines, a strict pattern, and a turn where everything changes.', show: 'title' },
        { say: 'In this video we compare the two main kinds of sonnet, find the turn, and explain how poets use sound to shape meaning.' },
      ],
    },
    {
      chapter: 'Two kinds of sonnet',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sonnet and volta', md: 'A **sonnet** is a fourteen-line poem with a set rhyme scheme. The **volta** is its **turn**, where the poem shifts in argument, tone or direction, often at *but*, *yet* or *then*.' },
        {
          kind: 'table',
          id: 't',
          head: ['', 'Shakespearean', 'Petrarchan'],
          rows: [
            ['**Shape**', 'three quatrains and a couplet', 'an octave (8) and a sestet (6)'],
            ['**Rhyme**', 'ABAB CDCD EFEF GG', 'ABBAABBA, then CDECDE'],
            ['**Volta**', 'often at the couplet', 'usually at line 9'],
          ],
        },
      ],
      lines: [
        { say: 'A sonnet is a fourteen-line poem with a set rhyme scheme. Its volta is the turn, where the poem shifts in argument, tone or direction. Words like but, yet and then often mark it.', show: 'def' },
        { say: 'A Shakespearean, or English, sonnet has three quatrains of four lines each, and a rhyming couplet. A Petrarchan, or Italian, sonnet has an octave of eight lines, and a sestet of six.', show: 't', focus: 't.0' },
        { say: 'Their rhyme schemes differ too.', focus: 't.1' },
        { say: 'In a Shakespearean sonnet the turn often comes at the couplet. In a Petrarchan sonnet it usually comes at line nine.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Remember',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Remember me when I am gone away,', 'Gone far away into the silent land;', 'When you can no more hold me by the hand,', 'Nor I half turn to go yet turning stay.', 'Remember me when no more day by day', 'You tell me of our future that you planned:', 'Only remember me; you understand', 'It will be late to counsel then or pray.', 'Yet if you should forget me for a while', 'And afterwards remember, do not grieve:', 'For if the darkness and corruption leave', 'A vestige of the thoughts that once I had,', 'Better by far you should forget and smile', 'Than that you should remember and be sad.'], by: 'Christina Rossetti, “Remember”' },
      ],
      lines: [
        { say: 'Christina Rossetti’s Remember is a Petrarchan sonnet. The octave, lines one to eight, repeats one request: remember me.', show: ['q.0', 'q.1', 'q.2', 'q.3', 'q.4', 'q.5', 'q.6', 'q.7'] },
        { say: 'Then line nine begins with yet, and the request changes.', show: ['q.8', 'q.9', 'q.10', 'q.11', 'q.12', 'q.13'], focus: 'q.8' },
        { say: 'The sestet says that if remembering would make her loved one sad, it would be better to forget and smile.', focus: ['q.12', 'q.13'] },
        { say: 'So the volta turns a plea to be remembered into a selfless wish for the other person’s happiness.' },
      ],
    },
    {
      chapter: 'Sound devices',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Device', 'Repeats', 'Example'],
          rows: [
            ['**Alliteration**', 'consonants at the start of words', '**M**en **m**arched asleep. **M**any had lost their boots'],
            ['**Assonance**', 'vowel sounds', 'the low moan of the lonely road'],
            ['**Sibilance**', '*s* and *sh* sounds', 'And the silken, sad, uncertain rustling of each purple curtain'],
            ['**Onomatopoeia**', 'words that imitate sounds', 'buzz, plop, hiss'],
          ],
        },
      ],
      lines: [
        { say: 'Now sound. Alliteration repeats consonant sounds at the start of words. In Owen’s men marched asleep, many had lost their boots, the heavy m sounds mimic the slow, dull trudge of the march.', show: 't', focus: 't.0' },
        { say: 'Assonance repeats vowel sounds, as in the low moan of the lonely road.', focus: 't.1' },
        { say: 'Sibilance repeats s and sh sounds. In Edgar Allan Poe’s The Raven, the soft s sounds make the curtain seem to whisper.', focus: 't.2' },
        { say: 'And onomatopoeia uses words that imitate sounds, like buzz, plop and hiss.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Say what the sound does',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Say what the sound does', md: 'Spotting alliteration is easy. The marks come from its **effect**: does the sound speed the line up or slow it down, make it soft or harsh, soothing or violent?' },
      ],
      lines: [
        { say: 'Spotting alliteration is easy. The marks come from explaining its effect.', show: 'm' },
        { say: 'Does the sound speed the line up or slow it down? Does it make it soft or harsh, soothing or violent? Harsh k and g sounds in knock-kneed, coughing like hags make the march feel ugly and painful.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Shakespeare’s Sonnet 116 ends: “If this be error and upon me proved, / I never writ, nor no man ever loved.” What form do these two lines take?',
          choices: [
            'A rhyming couplet that stakes everything on the poem’s claim',
            'An octave of eight lines',
            'A sestet that begins the volta',
            'Free verse with no rhyme',
          ],
          answer: 0,
          working: 'They are the final rhyming couplet of a Shakespearean sonnet. If true love can change, he says, he never wrote a word and no one ever loved, which is plainly impossible.',
        },
      ],
      lines: [
        { say: 'Your turn. Shakespeare’s Sonnet one hundred and sixteen ends: if this be error and upon me proved, I never writ, nor no man ever loved. What form do these two lines take? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is "A". They are the final rhyming couplet. If he is wrong that true love never changes, he says, he never wrote a word and no one has ever loved, which is plainly impossible.', caption: 'The answer is A. They are the final rhyming couplet. If he is wrong that true love never changes, he says, he never wrote a word and no one has ever loved, which is plainly impossible.', show: 'q2.answer' },
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
            'A **sonnet** has fourteen lines.',
            '**Shakespearean**: three quatrains and a couplet. **Petrarchan**: octave and sestet.',
            'The **volta** is the turn, often marked by *but* or *yet*.',
            'Alliteration, assonance, sibilance and onomatopoeia shape how a line feels.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A sonnet has fourteen lines.', show: 'sum.0' },
        { say: 'A Shakespearean sonnet has three quatrains and a couplet, and a Petrarchan sonnet has an octave and a sestet.', show: 'sum.1' },
        { say: 'The volta is the turn, often marked by but or yet.', show: 'sum.2' },
        { say: 'And alliteration, assonance, sibilance and onomatopoeia shape how a line sounds and feels.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
