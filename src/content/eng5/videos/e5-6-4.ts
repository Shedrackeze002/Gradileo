import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-6-4',
  lessonId: 'e5-6-4',
  title: 'Revising and Editing',
  summary:
    'Revising improves what writing says and how it sounds, and editing fixes mistakes. Edit with CUPS: capitals, usage, punctuation and spelling. Revise choppy writing by combining short sentences.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Revising and Editing', subtitle: 'Making a first draft better' }],
      lines: [
        { say: 'Good writers rarely get everything right in the first draft. They go back, and make it better.', show: 'title' },
        { say: 'In this lesson, you will practise two ways of doing that: editing and revising.' },
      ],
    },
    {
      chapter: 'Revising and editing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Revising and editing', md: '**Revising** means improving what the writing says and how it sounds. **Editing** means fixing mistakes.' },
      ],
      lines: [
        { say: 'Revising means improving what the writing says, and how it sounds.', show: 'def' },
        { say: 'Editing means fixing mistakes. We will start with editing.', focus: 'def' },
      ],
    },
    {
      chapter: 'Editing with CUPS',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Letter', 'Check', 'Example fix'],
          rows: [
            ['**C**', 'Capitals', '*on monday* → *On Monday*'],
            ['**U**', 'Usage (grammar)', '*The dogs runs* → *The dogs run*'],
            ['**P**', 'Punctuation', '*Where are you going.* → *Where are you going?*'],
            ['**S**', 'Spelling', '*becuase* → *because*'],
          ],
        },
      ],
      lines: [
        { say: 'When you edit, check four things, one at a time. A handy way to remember them is CUPS.', show: 't' },
        { say: 'C is for capitals. On Monday needs two of them.', focus: 't.0' },
        { say: 'U is for usage, which means grammar. The dogs runs should be the dogs run.', focus: 't.1' },
        { say: 'P is for punctuation. Where are you going is a question, so it needs a question mark.', focus: 't.2' },
        { say: 'And S is for spelling, including homophones, like their and they’re.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Editing a sentence',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['my freind and me went to the park on saturday'] },
        { kind: 'text', id: 'ans', size: 'md', md: '**M**y **friend** and **I** went to the park on **S**aturday.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Read it aloud', md: 'Many mistakes are easier to hear than to see.' },
      ],
      lines: [
        { say: 'Let’s edit this sentence with CUPS.', show: 'q' },
        { say: 'Capitals: my starts the sentence, and Saturday is a day. Usage: my friend and I went, because you would say I went, not me went.' },
        { say: 'Punctuation: the sentence needs a period. And spelling: friend is spelled F R I E N D.', caption: 'Punctuation: the sentence needs a period. And spelling: friend is spelled f-r-i-e-n-d.', show: 'ans', focus: 'ans' },
        { say: 'Also, read your writing aloud, slowly. Many mistakes are easier to hear than to see, like missing words, run-ons, and verbs that do not agree.', show: 'tip' },
      ],
    },
    {
      chapter: 'Combining sentences',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Choppy', 'Combined'],
          rows: [
            ['*The cat is black. The cat is fluffy.*', '*The cat is black and fluffy.*'],
            ['*Maya likes soccer. Jun likes soccer.*', '*Maya and Jun like soccer.*'],
            ['*It was raining. We stayed inside.*', '*It was raining, so we stayed inside.*'],
            ['*I was tired. I finished my homework.*', '*Although I was tired, I finished my homework.*'],
          ],
        },
      ],
      lines: [
        { say: 'Now revising. Too many short sentences in a row make writing sound choppy. Combining them makes it flow.', show: 't' },
        { say: 'You can join two describing words: the cat is black and fluffy.', focus: 't.0' },
        { say: 'You can join two subjects: Maya and Jun like soccer. Notice that likes becomes like, because the subject is now plural.', focus: 't.1' },
        { say: 'Or join two sentences with a comma and so, or with although.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“The bus was late. We missed the first bell.” Which is the best way to combine these sentences?',
          choices: [
            'The bus was late we missed the first bell.',
            'The bus was late, but we missed the first bell.',
            'Although the bus was late, we missed the first bell.',
            'The bus was late, so we missed the first bell.',
          ],
          answer: 3,
          working: 'The first sentence causes the second, so join them with “so”. A is a run-on, and “but” and “although” suggest a contrast that is not there.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the best way to combine these sentences? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The first sentence causes the second, so we join them with so. Choice A is a run-on, and but and although suggest a contrast that is not there.', show: 'q2.answer' },
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
            '**Revising** improves the writing; **editing** fixes mistakes.',
            'Edit with **CUPS**: capitals, usage, punctuation, spelling.',
            'Combine choppy sentences with *and, but, so, because* or *although*.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Revising improves the writing, and editing fixes mistakes.', show: 'sum.0' },
        { say: 'Edit with CUPS: capitals, usage, punctuation and spelling.', show: 'sum.1' },
        { say: 'And combine short, choppy sentences by joining describing words or subjects, or with and, but, so, because or although.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
