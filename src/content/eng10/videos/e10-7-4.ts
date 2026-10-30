import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-7-4',
  lessonId: 'e10-7-4',
  title: 'Modifiers and Parallel Structure',
  thumbnailTitle: 'Modifiers and Parallel Structure',
  thumbnail: false,
  summary:
    'Keep describing words next to what they describe, fix misplaced and dangling modifiers, and give items in lists and comparisons the same grammatical shape.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Grammar and Language', title: 'Modifiers and Parallel Structure', subtitle: 'Keep describing words with what they describe' },
        { kind: 'text', id: 'hook', md: '*Walking to school in the storm, the umbrella blew inside out.*', size: 'lg' },
      ],
      lines: [
        { say: 'Walking to school in the storm, the umbrella blew inside out. Read it literally, and the umbrella was walking to school.', show: ['title', 'hook'] },
        { say: 'In this lesson you will keep describing words next to what they describe, and give the items in a list the same shape. That second skill is called parallel structure.' },
      ],
    },
    {
      chapter: 'Misplaced and dangling modifiers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Modifier', md: 'A word, phrase or clause that describes another word. An **opening phrase** describes the subject right after the comma.' },
        { kind: 'bullets', id: 'b', items: ['**Misplaced**: *The waiter brought a cake to the table covered in candles.*', '**Dangling**: *While cooking dinner, the smoke alarm went off.*'] },
        { kind: 'bullets', id: 'fix', items: ['Move it: *The waiter brought a cake covered in candles to the table.*', 'Add the person: *While cooking dinner, Esi heard the smoke alarm go off.*'] },
      ],
      lines: [
        { say: 'A modifier is a word, phrase or clause that describes another word. An opening phrase describes the subject that comes straight after the comma.', show: 'def' },
        { say: 'A misplaced modifier is too far from the word it describes. The waiter brought a cake to the table covered in candles. Was the table covered in candles?', hide: 'def', show: 'b.0' },
        { say: 'A dangling modifier describes someone who is not in the sentence. While cooking dinner, the smoke alarm went off. Who was cooking? Not the smoke alarm.', show: 'b.1' },
        { say: 'Fix a misplaced modifier by moving it next to the word it describes.', hide: 'b', show: 'fix.0' },
        { say: 'Fix a dangling one by adding the missing person as the subject: While cooking dinner, Esi heard the smoke alarm go off.', show: 'fix.1' },
      ],
    },
    {
      chapter: 'Parallel structure',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Parallel structure', md: 'Items of equal importance have the **same grammatical form**: all nouns, all *-ing* words, all *to* verbs, all clauses.' },
        { kind: 'text', id: 'ex', md: 'Not parallel: *The job requires patience, honesty and that you work hard.*\n\nParallel: *The job requires patience, honesty and hard work.*', size: 'md' },
        { kind: 'text', id: 'pair', md: '*Daniel is not only **a talented singer** but also **a gifted songwriter**.*', size: 'md' },
      ],
      lines: [
        { say: 'Parallel structure means giving items of equal importance the same grammatical form, in lists, comparisons and pairs.', show: 'def' },
        { say: 'Take “The job requires patience, honesty and that you work hard.” The first two items are nouns, but the third is a clause.', hide: 'def', show: 'ex' },
        { say: 'Change it into a noun as well: hard work. The job requires patience, honesty and hard work.' },
        { say: 'Paired words need matching parts too. Daniel is not only a talented singer but also a gifted songwriter.', hide: 'ex', show: 'pair' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'The passive does not rescue it', md: '*After finishing the essay, the television was switched on **by Noah**.* Noah is in the sentence now, but the subject after the comma is still *the television*. The person doing the action must be the **subject**.' }],
      lines: [
        { say: 'A common mistake is trying to fix a dangling modifier by adding the person at the end. After finishing the essay, the television was switched on by Noah.', show: 'm' },
        { say: 'The subject after the comma is still the television, so the modifier still dangles. Write: After finishing the essay, Noah switched on the television.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these four sentences has no dangling modifier?',
          choices: [
            'Running for the train, the bag of books fell open on the platform.',
            'Running for the train, the books were spilled across the platform.',
            'Running for the train, the crowded platform was hard to get through.',
            'Running for the train, Mei spilled the books across the platform.',
          ],
          answer: 3,
          working: 'The opening phrase must describe the subject after the comma. Only Mei could be running for the train.',
        },
      ],
      lines: [
        { say: 'Your turn. Each of these four sentences begins with the phrase “running for the train”. Which one has no dangling modifier? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The person after the comma, Mei, is the one running. In the others, a bag, books or a platform seem to be running for the train.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Move a misplaced modifier next to the word it describes.', 'Fix a dangling modifier by making the person the subject.', 'Give list items, comparisons and pairs the same form.'] }],
      lines: [
        { say: 'Let’s sum up. Move a misplaced modifier next to the word it describes.', show: 'sum.0' },
        { say: 'Fix a dangling modifier by making the missing person the subject after the comma.', show: 'sum.1' },
        { say: 'And give the items in lists, comparisons and pairs the same grammatical form.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
