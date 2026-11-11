import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-4-3',
  lessonId: 'e5-4-3',
  title: 'Context Clues',
  summary:
    'Context clues are hints in the nearby words that help you work out a word you do not know: a definition, a synonym, an antonym, examples or the general sense. Test your guess by putting it back into the sentence.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Words', title: 'Context Clues', subtitle: 'Working out a word you do not know' }],
      lines: [
        { say: 'Even strong readers meet words they do not know. You do not always need a dictionary.', show: 'title' },
        { say: 'The sentences around a new word often give you enough to work it out. In this lesson, you will learn the five kinds of clue to look for.' },
      ],
    },
    {
      chapter: 'What context clues are',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Context clues', md: '**Context clues** are hints in the words and sentences around a new word that help you work out what it means.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['The puppy was so **drowsy** after its walk that it curled up and fell asleep at once.'] },
      ],
      lines: [
        { say: 'Context clues are hints in the words and sentences around a new word that help you work out what it means.', show: 'def' },
        { say: 'What does drowsy mean here?', show: 'q' },
        { say: 'The puppy curled up and fell asleep straight away, so it must have been feeling ready to sleep. Drowsy means sleepy.', focus: 'q' },
      ],
    },
    {
      chapter: 'Five kinds of clue',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Clue', 'Example'],
          rows: [
            ['**Definition**', 'A **botanist**, a scientist who studies plants, visited our class.'],
            ['**Synonym**', 'The path was **narrow**, so thin that we walked in single file.'],
            ['**Antonym**', 'Unlike his **timid** sister, Raj was bold and loud.'],
            ['**Example**', '**Reptiles**, such as snakes, lizards and turtles, are cold-blooded.'],
            ['**General sense**', 'After the long hike, we were so **famished** that we ate every crumb.'],
          ],
        },
      ],
      lines: [
        { say: 'Here are five kinds of context clue.', show: 't' },
        { say: 'A definition clue tells you the meaning. A botanist, a scientist who studies plants, visited our class.', focus: 't.0' },
        { say: 'A synonym clue is a nearby word that means the same. Narrow, so thin that we walked in single file.', focus: 't.1' },
        { say: 'An antonym clue means the opposite. Unlike his timid sister, Raj was bold and loud. So timid is the opposite of bold.', focus: 't.2' },
        { say: 'An example clue shows what the word means. Snakes, lizards and turtles are all reptiles.', focus: 't.3' },
        { say: 'And the general sense uses the whole situation. We were so famished that we ate every crumb, so famished means very hungry. Signal words such as or, such as, unlike and but often point to a clue.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Checking your guess',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Mira’s room was usually **spotless**, but today it was messy and covered in toys.'] },
        { kind: 'text', id: 't', size: 'md', md: 'Try it: *Mira’s room was usually* ***very clean****, but today it was messy.* ✓' },
      ],
      lines: [
        { say: 'Once you have a guess, put it back into the sentence in place of the hard word. If the sentence still makes sense, your guess is probably right.' },
        { say: 'What does spotless mean? The word but signals a contrast, so spotless is the opposite of messy.', show: 'q', focus: 'q' },
        { say: 'Try very clean. Mira’s room was usually very clean, but today it was messy. It makes sense, so spotless means very clean.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Do not stop at the word itself', md: '*Famished* sounds a bit like *famous*, but the clue “we ate every crumb” tells you it means **very hungry**. Read the whole sentence, and the one after it.' },
      ],
      lines: [
        { say: 'Here is a common mistake: looking only at the word itself.', show: 'm' },
        { say: 'Famished sounds a bit like famous, but the clue, we ate every crumb, tells you it means very hungry. Always read the whole sentence, and the one after it.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“The old bridge was so fragile that the town closed it, afraid it might break under a single car.” What does “fragile” mean?',
          choices: ['Easily broken', 'Very long', 'Brand new', 'Painted red'],
          answer: 0,
          working: 'The town was afraid the bridge might break under one car, so fragile means easily broken.',
        },
      ],
      lines: [
        { say: 'Your turn. Use the context clues to work out what fragile means. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. The town was afraid the bridge might break under a single car, so fragile means easily broken.', show: 'q2.answer' },
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
            '**Context clues**: a definition, a synonym, an antonym, examples or the general sense.',
            'Signal words such as *or*, *such as*, *unlike* and *but* often point to a clue.',
            'Test your guess by putting it back into the sentence.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Context clues can be a definition, a synonym, an antonym, examples, or the general sense.', show: 'sum.0' },
        { say: 'Signal words such as or, such as, unlike and but often point to a clue.', show: 'sum.1' },
        { say: 'And test your guess by putting it back into the sentence.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
