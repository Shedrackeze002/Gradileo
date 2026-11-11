import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-4-1',
  lessonId: 'e5-4-1',
  title: 'Prefixes and Suffixes',
  summary:
    'A prefix is a word part added to the front of a base word, and a suffix is added to the end. Knowing what un-, re-, dis-, -ful, -less and the other common parts mean lets you work out words you have never seen.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Words', title: 'Prefixes and Suffixes', subtitle: 'Words built from pieces' }],
      lines: [
        { say: 'Many long words are really a short word, with an extra piece stuck on the front or the end.', show: 'title' },
        { say: 'If you know what the pieces mean, you can work out words you have never seen before. In this lesson, you will learn the most common of these pieces, prefixes and suffixes.' },
      ],
    },
    {
      chapter: 'Base words and prefixes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Base word and prefix', md: 'A **base word** can stand on its own: *happy*, *read*, *agree*. A **prefix** is a word part added to the **front** of a base word, which changes its meaning: *un* + *happy* = *unhappy*, “not happy”.' },
        {
          kind: 'table',
          id: 't',
          head: ['Prefix', 'Means', 'Examples'],
          rows: [
            ['un-, non-', 'not', 'unkind, unsafe, nonstop'],
            ['dis-', 'not, or the opposite of', 'disagree, disappear'],
            ['re-', 'again', 'retell, rebuild'],
            ['pre-', 'before', 'preheat, preview'],
            ['mis-', 'wrongly', 'misspell, misread'],
          ],
        },
      ],
      lines: [
        { say: 'A base word is a word that can stand on its own, like happy, read or agree.', show: 'def' },
        { say: 'A prefix is a word part added to the front of a base word. It changes the meaning. Un plus happy makes unhappy, which means not happy.', focus: 'def' },
        { say: 'Un and non both mean not, as in unkind and nonstop. Dis means not, or the opposite of, as in disagree.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Ree means again, as in retell. Pree means before, as in preheat. And miss means wrongly, as in misspell.', caption: 'Re- means again, as in retell. Pre- means before, as in preheat. And mis- means wrongly, as in misspell.', focus: ['t.2', 't.3', 't.4'] },
      ],
    },
    {
      chapter: 'Working out a new word',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{reheat} = \\text{re} + \\text{heat}', '\\text{= to heat again}'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Not every “re” is a prefix', md: 'In *read* and *real*, the letters *re* are part of the base word. Check that what is left is a real word.' },
      ],
      lines: [
        { say: 'What does reheat mean? Split it into its parts: ree, plus heat. Ree means again, so reheat means to heat again.', caption: 'What does reheat mean? Split it into its parts: re, plus heat. Re- means again, so reheat means to heat again.', show: 'm' },
        { say: 'Here is a common mistake. Not every word that starts with R E has a prefix. In read and real, the letters R E are part of the base word. Take them off, and nothing is left that makes sense. So check that what is left is a real word.', caption: 'Here is a common mistake. Not every word that starts with re has a prefix. In read and real, the letters re are part of the base word. Take them off, and nothing is left that makes sense. So check that what is left is a real word.', show: 'mis', focus: 'mis' },
      ],
    },
    {
      chapter: 'Suffixes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Suffix', md: 'A **suffix** is a word part added to the **end** of a base word: *hope* + *ful* = *hopeful*, “full of hope”.' },
        {
          kind: 'table',
          id: 't',
          head: ['Suffix', 'Means', 'Examples'],
          rows: [
            ['-ful', 'full of', 'hopeful, careful'],
            ['-less', 'without', 'fearless, careless'],
            ['-er', 'a person who', 'teacher, farmer'],
            ['-able', 'able to be', 'washable, breakable'],
            ['-ly / -ness', 'in a … way / the state of being', 'quickly / kindness'],
          ],
        },
      ],
      lines: [
        { say: 'A suffix is a word part added to the end of a base word. Hope plus full makes hopeful, full of hope.', caption: 'A suffix is a word part added to the end of a base word. Hope plus -ful makes hopeful, full of hope.', show: 'def' },
        { say: 'Full means full of, and less means without. So careful and careless are opposites. The suffix alone flips the meaning.', caption: '-ful means full of, and -less means without. So careful and careless are opposites. The suffix alone flips the meaning.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'The ending E R can mean a person who, like a teacher or a farmer, and able means able to be, like washable.', caption: 'The ending -er can mean a person who, like a teacher or a farmer, and -able means able to be, like washable.', focus: ['t.2', 't.3'] },
        { say: 'A suffix often changes the kind of word too. Quick becomes quickly, and kind becomes kindness, which is a noun.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Two parts added',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{unbreakable} = \\text{un} + \\text{break} + \\text{able}', '\\text{= not able to be broken}'] }],
      lines: [
        { say: 'Some words have a prefix and a suffix. What does unbreakable mean?', show: 'm' },
        { say: 'Split it: un, plus break, plus able. Break plus able means able to be broken, and un means not. So unbreakable means not able to be broken.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What does the word “fearless” mean?',
          choices: ['Full of fear', 'Afraid again', 'Without fear', 'A person who is afraid'],
          answer: 2,
          working: 'fear + less: the suffix -less means “without”, so fearless means without fear.',
        },
      ],
      lines: [
        { say: 'Your turn. What does the word fearless mean? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. Split it into fear plus less. The suffix less means without, so fearless means without fear.', caption: 'The answer is C. Split it into fear plus -less. The suffix -less means without, so fearless means without fear.', show: 'q2.answer' },
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
            'A **prefix** goes at the front of a base word; a **suffix** goes at the end.',
            '*un-, dis-, non-* = not; *re-* = again; *pre-* = before; *mis-* = wrongly.',
            '*-ful* = full of; *-less* = without; *-er* = a person who; *-able* = able to be.',
            'Split a long word into its parts, then put the meanings together.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A prefix goes at the front of a base word, and a suffix goes at the end.', show: 'sum.0' },
        { say: 'Un, dis and non mean not. Ree means again, pree means before, and miss means wrongly.', caption: 'Un-, dis- and non- mean not. Re- means again, pre- means before, and mis- means wrongly.', show: 'sum.1' },
        { say: 'Full means full of, less means without, E R can mean a person who, and able means able to be.', caption: '-ful means full of, -less means without, -er can mean a person who, and -able means able to be.', show: 'sum.2' },
        { say: 'So split a long word into its parts, then put the meanings together.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
