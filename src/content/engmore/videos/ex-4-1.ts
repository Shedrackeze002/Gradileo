import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-4-1',
  lessonId: 'ex-4-1',
  title: 'Spelling',
  thumbnail: false,
  summary:
    'Most spelling mistakes come from a few words and rules. Homophones sound alike but differ in spelling and meaning; test a short form such as it’s by saying it in full. Some pairs split into noun and verb, such as practice and practise. Memory tricks fix commonly misspelt words, and suffix rules cover doubling, the silent e and changing y to i.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Spelling and Spoken Language', title: 'Spelling', subtitle: 'The words and rules that catch everyone out' }],
      lines: [
        { say: 'A spelling mistake rarely stops a reader understanding you, but it does make them trust you a little less. And most mistakes come from a small number of words and rules.', show: 'title' },
        { say: 'In this lesson, you will choose the right homophone, learn some tricky words, and apply the rules for suffixes and plurals.' },
      ],
    },
    {
      chapter: 'Homophones',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Homophones', md: 'Words that **sound the same** but are spelt differently and mean different things.' },
        { kind: 'table', id: 't', head: ['Word', 'Meaning'], rows: [['there', 'a place'], ['their', 'belonging to them'], ['they’re', 'they are'], ['its / it’s', 'belonging to it / it is']] },
      ],
      lines: [
        { say: 'Homophones are words that sound the same, but are spelt differently and mean different things.', show: 'def' },
        { say: 'There, spelt T H E R E, names a place: put it over there.', caption: '“There” names a place: put it over there.', show: 't.0', focus: 't.0' },
        { say: 'Their, spelt T H E I R, shows belonging: they lost their keys. And they’re, with an apostrophe, is short for they are.', caption: '“Their” shows belonging: they lost their keys. And “they’re”, with an apostrophe, is short for “they are”.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'The same goes for its and it’s. Its, with no apostrophe, shows belonging. It’s means it is, or it has. So to test a short form, say it in full. If it is, or they are, makes sense, use the apostrophe.', caption: 'The same goes for “its” and “it’s”. “Its”, with no apostrophe, shows belonging. “It’s” means “it is” or “it has”. To test a short form, say it in full. If “it is” or “they are” makes sense, use the apostrophe.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Noun or verb?',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Noun', 'Verb'], rows: [['effect (a result)', 'affect (to influence)'], ['practice', 'practise'], ['advice', 'advise']] }],
      lines: [
        { say: 'Some pairs differ by whether the word is a noun or a verb. Effect, with an e, is usually the noun, a result. Affect, with an a, is usually the verb.', caption: 'Some pairs differ by whether the word is a noun or a verb. “Effect” is usually the noun, a result. “Affect” is usually the verb.', show: 't.0', focus: 't.0' },
        { say: 'In British English, practice with a c is the noun, and practise with an s is the verb. Advice and advise work the same way.', caption: 'In British English, “practice” with a c is the noun, and “practise” with an s is the verb. “Advice” and “advise” work the same way.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Tricky words and suffix rules',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Word', 'Trick'], rows: [['definitely', 'It contains “finite”'], ['separate', 'There is “a rat” in it'], ['necessary', 'One collar, two sleeves']] },
        { kind: 'bullets', id: 'b', items: ['Short vowel + one consonant: double it (hop → hopping)', 'Silent e: drop it before a vowel (hope → hoping)', 'Consonant + y: change y to i (carry → carried)'] },
      ],
      lines: [
        { say: 'Some words catch out almost everyone, and a memory trick helps. Definitely contains the word finite. Separate has a rat in it. Necessary has one collar and two sleeves: one c and two s’s.', caption: 'Some words catch out almost everyone, and a memory trick helps. “Definitely” contains “finite”. “Separate” has “a rat” in it. “Necessary” has one collar and two sleeves: one c and two s’s.', show: 't' },
        { say: 'Adding a suffix follows rules. After a short vowel and one consonant, double the consonant: hop becomes hopping.', show: 'b.0' },
        { say: 'Drop a silent e before a suffix that starts with a vowel: hope becomes hoping.', show: 'b.1' },
        { say: 'And after a consonant, change y to i: carry becomes carried.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which word fills the gap? *“The dog wagged ___ tail.”*',
          choices: ['it’s', 'its’', 'its', 'it is'],
          answer: 2,
          working: 'The tail belongs to the dog, so the word shows belonging: **its**, with no apostrophe.',
        },
      ],
      lines: [
        { say: 'Your turn. Which word fills the gap? The dog wagged blank tail. Pause the video and try it.', caption: 'Your turn. Which word fills the gap? “The dog wagged ___ tail.” Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, its, with no apostrophe. The tail belongs to the dog. Saying it is in the gap makes no sense, so it is not it’s.', caption: 'The answer is C, “its”, with no apostrophe. The tail belongs to the dog. Saying “it is” in the gap makes no sense, so it is not “it’s”.', show: 'q.answer' },
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
          items: ['Homophones sound alike; test a short form by saying it in full.', 'Effect, practice, advice: nouns. Affect, practise, advise: verbs.', 'Learn tricky words with memory tricks.', 'Double, drop the e, or change y to i before a suffix.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Homophones sound alike. Test a short form by saying it in full.', show: 'sum.0' },
        { say: 'Some pairs split into noun and verb, such as practice and practise.', caption: 'Some pairs split into noun and verb, such as “practice” and “practise”.', show: 'sum.1' },
        { say: 'Learn the tricky words with memory tricks.', show: 'sum.2' },
        { say: 'And apply the suffix rules: double the consonant, drop the silent e, or change y to i.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
