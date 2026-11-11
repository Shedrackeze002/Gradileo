import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-7-4',
  lessonId: 'e9-7-4',
  title: 'Revising for Style',
  summary:
    'Writing is concise when it says what it means in as few words as clarity allows, so cut redundancy, empty openers and padded phrases. Prefer strong verbs and specific adjectives to vague words, avoid clichés, and choose the word that fits the meaning exactly, whether it is short or long.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Revising for Style', subtitle: 'Cut, then sharpen' }],
      lines: [
        { say: 'Good writing is often rewritten writing. When you revise for style, you cut what adds nothing, and sharpen what is left.', show: 'title' },
        { say: 'In this video we make writing more concise, and choose more precise words.' },
      ],
    },
    {
      chapter: 'Concision',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Concise', md: 'Writing is **concise** when it says what it means in **as few words as clarity allows**. Concision cuts padding, not meaning.' },
        {
          kind: 'table',
          id: 't',
          head: ['Wordy', 'Concise'],
          rows: [
            ['at this point in time', 'now'],
            ['due to the fact that', 'because'],
            ['The two twins were identical in appearance and looked the same.', 'The twins were identical.'],
            ['It is my opinion that the ending is something that is weak.', 'The ending is weak.'],
          ],
        },
      ],
      lines: [
        { say: 'Writing is concise when it says what it means in as few words as clarity allows. Concision cuts padding, not meaning.', show: 'def' },
        { say: 'At this point in time becomes now. Due to the fact that becomes because. These are padded phrases.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'The two twins were identical in appearance and looked the same is full of redundancy, saying the same thing twice. Twins are always two. So: the twins were identical.', focus: 't.2' },
        { say: 'And it is my opinion that, is an empty opener. So: the ending is weak.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Precise words',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Strong verbs:** *The old man shuffled*, not *walked slowly*.',
            '**Specific adjectives:** *rich and peppery*, not *nice*.',
            '**Avoid clichés** such as *as busy as a bee*.',
            'Break rules on purpose: *deafeningly silent* is an **oxymoron**.',
          ],
        },
      ],
      lines: [
        { say: 'Vague words such as nice, good, went and got leave the reader to guess. A strong verb beats a weak verb plus an adverb: the old man shuffled says more than the old man walked slowly.', show: 'b.0' },
        { say: 'Specific adjectives beat vague ones: the soup was rich and peppery says more than the soup was nice.', show: 'b.1' },
        { say: 'Avoid clichés, phrases used so often they have lost their force, such as as busy as a bee.', show: 'b.2' },
        { say: 'And writers sometimes break the rules on purpose. Deafeningly silent is an oxymoron: it joins opposites, so we notice how intense the silence feels.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A thesaurus is not a shortcut',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A thesaurus is not a shortcut', md: 'Swapping a plain word for a long one does not make writing better. *Utilize* is not more precise than *use*. Choose the word that **fits the meaning exactly**, whether it is short or long.' },
      ],
      lines: [
        { say: 'A common mistake is to swap plain words for long ones, to sound clever. Utilize is not more precise than use.', show: 'm' },
        { say: 'Choose the word that fits the meaning exactly, whether it is short or long.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is the best revision of: “In my personal opinion, I think that the main character is a person who is very brave.”?',
          choices: [
            '“In my opinion, I think he is very brave.”',
            '“It is my opinion that he is brave.”',
            '“The main character is a person who is brave.”',
            '“The main character is fearless.”',
          ],
          answer: 3,
          working: '“In my personal opinion” and “I think” say the same thing, and the essay is already your opinion, so cut both. “A person who is very brave” shrinks to one precise adjective.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the best revision of: in my personal opinion, I think that the main character is a person who is very brave? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. In my personal opinion and I think say the same thing, and your essay is already your opinion, so cut both. A person who is very brave shrinks to one precise word: fearless.', show: 'q2.answer' },
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
            '**Concise** writing cuts padding, not meaning.',
            'Cut **redundancy**, **empty openers** and **padded phrases**.',
            'Prefer **strong verbs** and **specific adjectives**.',
            'Avoid **clichés**; choose the word that fits exactly.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Concise writing cuts padding, not meaning.', show: 'sum.0' },
        { say: 'Cut redundancy, empty openers and padded phrases.', show: 'sum.1' },
        { say: 'Prefer strong verbs and specific adjectives to vague words.', show: 'sum.2' },
        { say: 'And avoid clichés. Choose the word that fits the meaning exactly.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
