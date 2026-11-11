import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-6-3',
  lessonId: 'e8-6-3',
  title: 'Parallel Structure',
  summary:
    'Parallel structure means using the same grammatical form for every item in a list or pair: all -ing words, all to + verb, all nouns or all adjectives. Pairs such as not only … but also, and comparisons, must be balanced too. To fix a sentence, find the odd item and rewrite it in the same form as the others.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Parallel Structure', subtitle: 'Same shape, stronger sentence' }],
      lines: [
        { say: 'We will fight for our schools, for our parks, and for our future. Each part has the same shape, so the sentence is easy to follow and easy to remember.', show: 'title' },
        { say: 'In this video we learn to recognise parallel structure, and to fix sentences where it breaks.' },
      ],
    },
    {
      chapter: 'What parallel structure is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Parallel structure', md: '**Parallel structure** means using the **same grammatical form** for items in a list or a pair: all *-ing* words, all *to* + verb, all nouns, all adjectives, or all clauses of the same shape.' },
        {
          kind: 'table',
          id: 't',
          head: ['Parallel', 'Not parallel'],
          rows: [
            ['Ada likes **reading**, **painting** and **dancing**.', 'Ada likes reading, to paint and dancing.'],
            ['The coach told us **to stretch**, **to drink** water and **to rest**.', 'The coach told us to stretch, drinking water and rest.'],
            ['The room was **clean**, **bright** and **quiet**.', 'The room was clean, bright and had quiet.'],
          ],
        },
      ],
      lines: [
        { say: 'Parallel structure means using the same grammatical form for items in a list or a pair. That could be all ing words, all to plus a verb, all nouns, or all adjectives.', show: 'def' },
        { say: 'Ada likes reading, painting and dancing is parallel: three ing words. Ada likes reading, to paint and dancing breaks the pattern.', show: 't', focus: 't.0' },
        { say: 'The coach told us to stretch, to drink water and to rest is parallel too, and so is: the room was clean, bright and quiet.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Pairs and comparisons',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Pairs: *not only … but also*, *either … or*, *neither … nor*, *both … and*.',
            'The plan is not only **cheap** but also **quick**.',
            'Not: It is better to give than receiving.',
            'But: It is better **to give** than **to receive**.',
          ],
        },
      ],
      lines: [
        { say: 'Pairs joined by not only, but also, either, or, neither, nor, and both, and, need parallel structure too.', show: 'b.0' },
        { say: 'The words after each half should be the same kind of word. The plan is not only cheap but also quick: two adjectives.', show: 'b.1' },
        { say: 'Comparisons need balance too. It is better to give than receiving compares two different forms.', show: 'b.2' },
        { say: 'Make them match: it is better to give than to receive.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Fixing a list',
      layout: 'center',
      main: [
        { kind: 'text', id: 'e', size: 'md', md: '*The job requires patience, being careful and good skills with people.*' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Find the items: *patience*, *being careful*, *good skills with people*.',
            'Choose one form: nouns.',
            '**The job requires patience, care and people skills.**',
          ],
        },
      ],
      lines: [
        { say: 'To fix a sentence, follow three steps. Here is one to fix: the job requires patience, being careful and good skills with people.', show: 'e' },
        { say: 'First, find the items. Patience is a noun, being careful is an ing phrase, and good skills with people is a noun phrase.', show: 'b.0' },
        { say: 'Second, decide which form to use. Nouns work well here.', show: 'b.1' },
        { say: 'Third, rewrite the odd ones out in that form. The job requires patience, care and people skills.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Watch the last item',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Watch the last item', md: 'Faulty parallelism usually appears at the **end** of a list, when the writer adds a whole new clause.\n\n*The essay was clear, well organised and it persuaded readers.*\n\n**Fix:** *The essay was clear, well organised and persuasive.*' },
      ],
      lines: [
        { say: 'Faulty parallelism usually appears at the end of a list, when the writer runs out of steam and adds a whole new clause.', show: 'm' },
        { say: 'The essay was clear, well organised and it persuaded readers. Fix it with a matching word: the essay was clear, well organised and persuasive.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“On Saturday Ada had to wash the car, to feed the cat and she sang loudly.” Which item breaks the parallel structure?',
          choices: [
            'to wash the car',
            'to feed the cat',
            'On Saturday',
            'she sang loudly',
          ],
          answer: 3,
          working: 'The first two items are to + verb. “She sang loudly” is a whole clause, so it breaks the pattern.',
        },
      ],
      lines: [
        { say: 'Your turn. On Saturday Ada had to wash the car, to feed the cat and she sang loudly. Which item breaks the parallel structure? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The first two items are to plus a verb, but she sang loudly is a whole clause, so it breaks the pattern.', show: 'q2.answer' },
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
            '**Parallel structure** uses the same form for every item.',
            'Pairs like *not only … but also* must be balanced.',
            'Comparisons too: *better to give than to receive*.',
            'To fix: find the odd item and rewrite it to match.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Parallel structure uses the same form for every item in a list or a pair.', show: 'sum.0' },
        { say: 'Pairs such as not only, but also, must be balanced.', show: 'sum.1' },
        { say: 'Comparisons too: better to give than to receive.', show: 'sum.2' },
        { say: 'And to fix a sentence, find the odd item, and rewrite it in the same form as the others.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
