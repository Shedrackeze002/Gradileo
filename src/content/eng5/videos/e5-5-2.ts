import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-5-2',
  lessonId: 'e5-5-2',
  title: 'Complete Sentences: Fragments and Run-ons',
  thumbnailTitle: 'Complete Sentences',
  summary:
    'A complete sentence has a subject, which tells who or what it is about, and a predicate, which tells what the subject does or is. A fragment is an incomplete sentence, and a run-on joins two sentences with no break.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Complete Sentences', subtitle: 'Fragments and run-ons' }],
      lines: [
        { say: 'Writers sometimes leave a sentence unfinished, or run two sentences together without stopping.', show: 'title' },
        { say: 'In this lesson, you will learn what every sentence needs, and how to spot sentences that are broken.' },
      ],
    },
    {
      chapter: 'Subject and predicate',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sentence, subject and predicate', md: 'A **sentence** expresses a complete thought. The **subject** tells **who or what** it is about. The **predicate** tells what the subject **does or is**; it always contains a verb.' },
        {
          kind: 'table',
          id: 't',
          head: ['Subject', 'Predicate'],
          rows: [
            ['My little brother', 'laughed at the clown.'],
            ['The old wooden bridge', 'creaked in the wind.'],
            ['We', 'are going to the museum tomorrow.'],
          ],
        },
      ],
      lines: [
        { say: 'A sentence is a group of words that expresses a complete thought. Every complete sentence has two parts.', show: 'def' },
        { say: 'The subject tells who or what the sentence is about. The predicate tells what the subject does or is, and it always contains a verb.', focus: 'def' },
        { say: 'My little brother is the subject, and laughed at the clown is the predicate.', show: 't', focus: 't.0' },
        { say: 'The simple subject is the main noun or pronoun in the subject, without its describing words. In the old wooden bridge creaked, the simple subject is bridge.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Fragments and run-ons',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fragment and run-on', md: 'A **fragment** is only part of a sentence: *Running down the hill.* A **run-on** is two sentences joined with no end mark or joining word: *The bell rang we went outside.*' },
        {
          kind: 'table',
          id: 't',
          head: ['Problem', 'Fixed'],
          rows: [
            ['*Ate all the cookies.*', '*Leo ate all the cookies.*'],
            ['*When the bus came.*', '*When the bus came, we got on.*'],
            ['*I like cats my sister likes dogs.*', '*I like cats, but my sister likes dogs.*'],
          ],
        },
      ],
      lines: [
        { say: 'A fragment is only part of a sentence. It is missing a subject or a predicate, or it does not finish its thought.', show: 'def' },
        { say: 'A run-on is two sentences joined with no end mark, and no joining word.', focus: 'def' },
        { say: 'Ate all the cookies has no subject. Who ate them? Add one: Leo ate all the cookies.', show: 't', focus: 't.0' },
        { say: 'When the bus came does not finish its thought. What happened? When the bus came, we got on.', focus: 't.1' },
        { say: 'And I like cats my sister likes dogs is a run-on. Fix it with a period between the two sentences, or with a comma and and, but or so.', focus: 't.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A capital and a period do not make a sentence', md: '*Because the power went out.* starts with a capital and ends with a period, but what happened because the power went out?' },
      ],
      lines: [
        { say: 'Here is a common mistake. Because the power went out starts with a capital letter and ends with a period, but the thought is not finished.', show: 'm' },
        { say: 'What happened because the power went out? Read a sentence aloud, and ask whether it makes sense on its own.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is a complete sentence?',
          choices: [
            'After the long walk home.',
            'The rain stopped we went outside.',
            'Jumped over the puddle.',
            'The students in Room 4 planted a garden.',
          ],
          answer: 3,
          working: 'D has a subject (the students in Room 4) and a predicate (planted a garden). A and C are fragments, and B is a run-on.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a complete sentence? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Its subject is the students in Room 4, and its predicate is planted a garden. Choices A and C are fragments, and Choice B is a run-on.', show: 'q2.answer' },
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
            'A sentence has a **subject** (who or what) and a **predicate** (what it does or is).',
            'The **simple subject** is the main noun or pronoun.',
            'A **fragment** is incomplete; a **run-on** joins two sentences with no break.',
            'Fix a run-on with a period, or a comma and *and*, *but* or *so*.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A sentence has a subject, who or what it is about, and a predicate, what the subject does or is.', show: 'sum.0' },
        { say: 'The simple subject is the main noun or pronoun.', show: 'sum.1' },
        { say: 'A fragment is an incomplete sentence, and a run-on joins two sentences with no break.', show: 'sum.2' },
        { say: 'Fix a run-on with a period, or with a comma and and, but or so.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
