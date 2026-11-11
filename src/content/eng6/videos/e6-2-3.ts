import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-2-3',
  lessonId: 'e6-2-3',
  title: 'Stanzas and Rhyme Scheme',
  summary:
    'A couplet has two lines, a tercet three, a quatrain four and a sestet six. A rhyme scheme uses letters for end sounds: the first sound is A, and each new sound gets the next letter.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Stanzas and Rhyme Scheme', subtitle: 'A poem’s shape and its music' }],
      lines: [
        { say: 'A poem’s lines are grouped into stanzas, and the rhymes at the ends of the lines make a pattern.', show: 'title' },
        { say: 'Together, they give a poem its shape on the page, and its music in the ear. In this lesson, you will learn to name both.' },
      ],
    },
    {
      chapter: 'Naming stanzas',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Stanza', md: 'A **stanza** is a group of lines in a poem, set apart by a blank space. Stanzas are named by how many lines they have.' },
        { kind: 'table', id: 't', head: ['Stanza', 'Number of lines'], rows: [['**Couplet**', '2'], ['**Tercet**', '3'], ['**Quatrain**', '4'], ['**Sestet**', '6']] },
      ],
      lines: [
        { say: 'A stanza is a group of lines in a poem, set apart by a blank space. Stanzas are named by how many lines they have.', show: 'def' },
        { say: 'A couplet has two lines, a tercet has three, a quatrain has four, and a sestet has six.', show: 't' },
        { say: 'Each stanza of Tennyson’s poem The Eagle is a tercet. Carl Sandburg’s Fog has a couplet followed by a quatrain. Poets choose stanza lengths to fit their ideas, and free verse can mix them.' },
      ],
    },
    {
      chapter: 'Writing a rhyme scheme',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rhyme scheme', md: 'A **rhyme scheme** is the pattern of rhymes at the ends of a poem’s lines, written with letters: the first end sound is **A**, every line that rhymes with it is **A**, and each new sound gets the next letter.' },
      ],
      lines: [
        { say: 'A rhyme scheme is the pattern of rhymes at the ends of a poem’s lines, written with letters.', show: 'def' },
        { say: 'Give the sound at the end of the first line the letter "A". Every line that rhymes with it is also "A". The next new sound is "B", then "C", and so on.', caption: 'Give the sound at the end of the first line the letter A. Every line that rhymes with it is also A. The next new sound is B, then C, and so on.', focus: 'def' },
      ],
    },
    {
      chapter: 'Wordsworth’s daffodils',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['I wandered lonely as a cloud', 'That floats on high o’er vales and hills,', 'When all at once I saw a crowd,', 'A host, of golden daffodils;', 'Beside the lake, beneath the trees,', 'Fluttering and dancing in the breeze.'], by: 'William Wordsworth, “I Wandered Lonely as a Cloud”' },
        { kind: 'text', id: 'ans', size: 'md', md: '*cloud* A · *hills* B · *crowd* A · *daffodils* B · *trees* C · *breeze* C = **ABABCC**' },
      ],
      lines: [
        { say: 'What is the rhyme scheme of this stanza by William Wordsworth?', show: ['q.0', 'q.1', 'q.2', 'q.3', 'q.4', 'q.5'] },
        { say: 'Cloud is "A", and hills is "B". Crowd rhymes with cloud, so it is "A", and daffodils rhymes with hills, so it is "B".', caption: 'Cloud is A, and hills is B. Crowd rhymes with cloud, so it is A, and daffodils rhymes with hills, so it is B.', focus: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'Trees is a new sound, "C", and breeze rhymes with it, so it is "C" too.', caption: 'Trees is a new sound, C, and breeze rhymes with it, so it is C too.', focus: ['q.4', 'q.5'] },
        { say: 'So the rhyme scheme is "A", "B", "A", "B", "C", "C": a quatrain’s pattern, followed by a rhyming couplet. And six lines make this stanza a sestet.', caption: 'So the rhyme scheme is ABABCC: a quatrain’s pattern, followed by a rhyming couplet. And six lines make this stanza a sestet.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Common rhyme schemes',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Rhyme scheme', 'Name'],
          rows: [
            ['AABB', 'rhyming couplets'],
            ['ABAB', 'alternate rhyme'],
            ['ABCB', 'only lines 2 and 4 rhyme, as in many ballads'],
            ['ABBA', 'enclosed rhyme: the outer lines frame the inner pair'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Rhyme is about sound', md: '*love* and *move* look alike but do not rhyme; *cloud* and *crowd* look different but do. Say the words aloud.' },
      ],
      lines: [
        { say: 'Here are four common rhyme schemes.', show: 't' },
        { say: 'In rhyming couplets, each pair of lines rhymes. In alternate rhyme, every other line rhymes.', focus: ['t.0', 't.1'] },
        { say: 'In many ballads, only lines two and four rhyme. And in enclosed rhyme, the outer lines rhyme and frame the inner pair.', focus: ['t.2', 't.3'] },
        { say: 'Here is a common mistake. Words that look alike may not rhyme, like love and move. And words that look different may rhyme, like cloud and crowd. Say the words aloud before you give them letters.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A four-line stanza ends with the words “night”, “street”, “white” and “feet”. What are its rhyme scheme and stanza name?',
          choices: ['AABB, a couplet', 'ABBA, a quatrain', 'ABCB, a tercet', 'ABAB, a quatrain'],
          answer: 3,
          working: '“night” A, “street” B, “white” rhymes with night (A), “feet” with street (B): ABAB. Four lines make a quatrain.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the rhyme scheme and the stanza name? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Night is "A", street is "B", white rhymes with night, and feet rhymes with street. That is "A", "B", "A", "B", and four lines make a quatrain.', caption: 'The answer is D. Night is A, street is B, white rhymes with night, and feet rhymes with street. That is ABAB, and four lines make a quatrain.', show: 'q2.answer' },
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
            'A **couplet** has 2 lines, a **tercet** 3, a **quatrain** 4 and a **sestet** 6.',
            'A **rhyme scheme** uses letters for end sounds: each new sound gets the next letter.',
            'Common schemes are AABB, ABAB, ABCB and ABBA.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A couplet has two lines, a tercet three, a quatrain four, and a sestet six.', show: 'sum.0' },
        { say: 'A rhyme scheme uses letters for end sounds. The first sound is "A", and each new sound gets the next letter.', caption: 'A rhyme scheme uses letters for end sounds. The first sound is A, and each new sound gets the next letter.', show: 'sum.1' },
        { say: 'And always say the words aloud: rhyme is about sound, not spelling.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
