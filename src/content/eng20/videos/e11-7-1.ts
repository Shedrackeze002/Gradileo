import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-7-1',
  lessonId: 'e11-7-1',
  title: 'Clauses and Combining Sentences',
  thumbnailTitle: 'Clauses and Combining Sentences',
  thumbnail: false,
  summary:
    'Learn the three kinds of dependent clause, noun, adjective and adverb, and use clauses and phrases to combine short sentences so they show how ideas relate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Language', title: 'Clauses and Combining Sentences', subtitle: 'Show how your ideas connect' }],
      lines: [
        { say: 'Read this aloud: The storm hit the coast. The power went out. The town was dark for two days. Every sentence is correct, but together they sound like a list of facts read by a robot.', show: 'title' },
        { say: 'Now try: When the storm knocked out the power, the town was dark for two days, so volunteers handed out candles. The reader now knows what caused what. In this lesson you will learn three kinds of dependent clause, and ways to combine sentences.' },
      ],
    },
    {
      chapter: 'Three kinds of dependent clause',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Noun: *What Ravi said at the meeting surprised everyone.*',
            'Adjective: *The woman who lives next door is a pilot.*',
            'Adverb: *When the bell rang, the students rushed outside.*',
          ],
        },
      ],
      lines: [
        { say: 'A clause is a group of words with a subject and a verb. A dependent clause cannot stand alone. It does the job of a noun, an adjective or an adverb.' },
        { say: 'A noun clause acts as a noun. Here, what Ravi said at the meeting is the subject. Replace it with the word something, and the sentence still works.', show: 'b.0', focus: 'b.0' },
        { say: 'An adjective clause describes a noun. Who lives next door describes the woman.', show: 'b.1', focus: 'b.1' },
        { say: 'An adverb clause tells when, why, or under what condition. When the bell rang tells us when the students rushed outside.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Five ways to combine',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'c',
          items: [
            'Coordination: a comma and *and*, *but*, *so* or *yet*',
            'Subordination: *because*, *although*, *when*, *if*',
            'Relative clause: *My aunt, who lives in Mombasa, is a marine biologist.*',
            'Appositive: *Lagos, the largest city in Nigeria, is home to millions of people.*',
            'Participial phrase: *Opening the envelope, Diego found two tickets.*',
          ],
        },
      ],
      lines: [
        { say: 'Five tools combine sentences. Coordination joins two equal ideas with a comma and a word such as so. Subordination uses because, although, when or if, to show cause, contrast, time or condition.', show: ['c.0', 'c.1'] },
        { say: 'A relative clause adds a detail about a noun. An appositive renames a noun in a few words.', show: ['c.2', 'c.3'] },
        { say: 'And a participial phrase describes the subject.', show: 'c.4' },
        { say: 'Choose the connecting word with care. Because and so show a cause. Although and but show a contrast.' },
      ],
    },
    {
      chapter: 'Worked example',
      layout: 'center',
      main: [
        { kind: 'text', id: 'orig', md: '*Mei was exhausted after the long shift. She fell asleep on the bus. She missed her stop.*', size: 'lg' },
        { kind: 'text', id: 'ans', md: 'Combined: *Exhausted after the long shift, Mei fell asleep on the bus and missed her stop.*', size: 'lg' },
      ],
      lines: [
        { say: 'Let’s combine these three. The tiredness explains the sleep, so the first sentence becomes a phrase describing Mei, and the last two actions share one subject.', show: 'orig' },
        { say: 'Exhausted after the long shift, Mei fell asleep on the bus and missed her stop.', show: 'ans' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Judging a clause by its first word', md: 'The same word can open different clauses. *No one knows when the storm will reach the coast* has a noun clause, but *I remember the day when we moved to the city* has an adjective clause.' },
      ],
      lines: [
        { say: 'A common mistake is judging a clause by its first word. The same word can open different kinds of clause.', show: 'm' },
        { say: 'When opens a noun clause in the first sentence, but an adjective clause in the second. So ask what job the clause does in its sentence.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which sentence combines the ideas correctly?',
          choices: [
            'Because Mei was exhausted after the long shift, she fell asleep on the bus.',
            'Although Mei was exhausted after the long shift, she fell asleep on the bus.',
            'Mei was exhausted after the long shift, she fell asleep on the bus.',
            'Exhausted after the long shift, the bus carried Mei past her stop.',
          ],
          answer: 0,
          working: 'A uses because to show the true cause. B shows a contrast that is false, C is a comma splice, and in D the bus is exhausted.',
        },
      ],
      lines: [
        { say: 'Your turn. Mei was exhausted, so she fell asleep on the bus. Which sentence combines these ideas correctly? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Because shows the true cause. B shows a false contrast, C is a comma splice, and in D the bus is the one exhausted.', show: 'q.answer' },
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
          items: ['A clause’s job, not its first word, decides its kind.', 'Combine with coordination, subordination, relative clauses, appositives and participial phrases.', 'The connecting word must show the true relation.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The job a clause does, not its first word, decides its kind.', show: 'sum.0' },
        { say: 'Combine sentences with coordination, subordination, relative clauses, appositives and participial phrases.', show: 'sum.1' },
        { say: 'And make sure the connecting word shows the true relation between the ideas.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
