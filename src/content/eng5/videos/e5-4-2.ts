import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-4-2',
  lessonId: 'e5-4-2',
  title: 'Synonyms, Antonyms and Shades of Meaning',
  thumbnailTitle: 'Synonyms and Antonyms',
  summary:
    'Synonyms are words with the same or nearly the same meaning, and antonyms are words with opposite meanings. Shades of meaning are similar words that differ in strength, such as damp, wet and soaked.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Words', title: 'Synonyms, Antonyms and Shades of Meaning', subtitle: 'Saying exactly what you mean' }],
      lines: [
        { say: 'English has many words that mean nearly the same thing, and many that mean the opposite.', show: 'title' },
        { say: 'Choosing between them is how a writer says exactly what they mean. In this lesson, you will learn about synonyms, antonyms and shades of meaning.' },
      ],
    },
    {
      chapter: 'Synonyms and antonyms',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Synonym and antonym', md: '**Synonyms** are words with the same or nearly the same meaning: *big* and *large*. **Antonyms** are words with opposite meanings: *big* and *small*.' },
        {
          kind: 'table',
          id: 't',
          head: ['Word', 'A synonym', 'An antonym'],
          rows: [
            ['happy', 'glad', 'sad'],
            ['brave', 'bold', 'afraid'],
            ['ancient', 'old', 'modern'],
            ['begin', 'start', 'finish'],
          ],
        },
      ],
      lines: [
        { say: 'Synonyms are words with the same, or nearly the same, meaning, like big and large, or quick and fast.', show: 'def' },
        { say: 'Antonyms are words with opposite meanings, like big and small, or arrive and leave.', focus: 'def' },
        { say: 'Happy has the synonym glad, and the antonym sad. Brave has the synonym bold, and the antonym afraid.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Ancient means old, and its opposite is modern. Begin means start, and its opposite is finish.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Testing a synonym',
      layout: 'center',
      main: [
        { kind: 'text', id: 's', size: 'lg', md: 'The **large** dog barked. = The **big** dog barked.' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Read the question word carefully', md: 'A question that asks for an **antonym** often includes a synonym among the choices. Ask yourself: *same* or *opposite*?' },
      ],
      lines: [
        { say: 'A good test for a synonym is to swap it into a sentence. If the sentence still means the same thing, you have found a synonym.', show: 's' },
        { say: 'The large dog barked means the same as the big dog barked, so large and big are synonyms.', focus: 's' },
        { say: 'Here is a common mistake. A question that asks for an antonym will often include a synonym among the choices, to catch readers who hurry. Before you choose, say to yourself: same, or opposite?', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Shades of meaning',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Shades of meaning', md: 'Words that mean almost the same thing but differ in **strength**, like shades of one colour from light to dark.' },
        {
          kind: 'table',
          id: 't',
          head: ['Weaker', 'Middle', 'Stronger'],
          rows: [
            ['warm', 'hot', 'boiling'],
            ['like', 'love', 'adore'],
            ['damp', 'wet', 'soaked'],
            ['glance', 'look', 'stare'],
          ],
        },
      ],
      lines: [
        { say: 'Synonyms are rarely exactly the same. Some are stronger than others.', show: 'def' },
        { say: 'Words that mean almost the same thing but differ in strength are called shades of meaning, like shades of one colour, from light to dark.', focus: 'def' },
        { say: 'Warm, hot and boiling all describe heat, but boiling is far stronger than warm.', show: 't', focus: 't.0' },
        { say: 'Damp, wet and soaked grow stronger too, and so do glance, look and stare.', focus: ['t.2', 't.3'] },
        { say: 'Choosing the right shade matters. Saying you were terrified of a small spider tells the reader something very different from saying you were nervous.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Order these words from the weakest to the strongest: furious, annoyed, angry.',
          choices: ['furious, angry, annoyed', 'angry, annoyed, furious', 'annoyed, furious, angry', 'annoyed, angry, furious'],
          answer: 3,
          working: 'Annoyed is a little bit cross, angry is more, and furious is very, very angry.',
        },
      ],
      lines: [
        { say: 'Your turn. Order these words from the weakest to the strongest. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Annoyed is a little bit cross. Angry is more. And furious is very, very angry.', show: 'q2.answer' },
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
            '**Synonyms** mean the same or nearly the same; **antonyms** mean the opposite.',
            'Swap a word into a sentence to test whether it is a synonym.',
            '**Shades of meaning** differ in strength: *damp, wet, soaked*.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Synonyms mean the same or nearly the same, and antonyms mean the opposite.', show: 'sum.0' },
        { say: 'Swap a word into a sentence to test whether it is a synonym.', show: 'sum.1' },
        { say: 'And shades of meaning are similar words that differ in strength, like damp, wet and soaked.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
