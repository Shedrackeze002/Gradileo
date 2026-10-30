import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-7-3',
  lessonId: 'e10-7-3',
  title: 'Agreement',
  thumbnail: false,
  summary:
    'Make verbs agree with their true subjects, choose pronouns that agree with the words they replace, and keep verb tense steady.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Grammar and Language', title: 'Agreement', subtitle: 'Subjects, verbs, pronouns and tense' },
        { kind: 'text', id: 'hook', md: '*The box of old photographs sit on the top shelf.*', size: 'lg' },
      ],
      lines: [
        { say: 'Look at this sentence: the box of old photographs sit on the top shelf. Many readers pass over it, because the word right before the verb, photographs, is plural.', show: ['title', 'hook'] },
        { say: 'But the box is doing the sitting, and there is only one box. Agreement errors hide like this. In this lesson you will match verbs to subjects, match pronouns to their words, and keep tense steady.' },
      ],
    },
    {
      chapter: 'Subject–verb agreement',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['A phrase between: *The keys to the science lab are missing.*', 'Joined by *and*: *Kenji and Liam play in the orchestra.*', '*One of* is singular: *One of the windows is cracked.*', '*There* and *here*: the subject comes after the verb: *There are three letters on the table.*'] },
        { kind: 'bullets', id: 'ans', items: ['Choose: *The cost of the concert tickets (is / are) too high.*', 'Cover the phrase with *of*: the subject is *cost*, so **is**.'] },
      ],
      lines: [
        { say: 'A verb must agree with its subject in number. The rule is simple, but finding the subject is hard. When a phrase sits between the subject and the verb, cover the phrase up.', show: 'b.0' },
        { say: 'Subjects joined by and are plural. And one of is singular, because the subject is one.', show: ['b.1', 'b.2'] },
        { say: 'After there or here, the subject comes after the verb, so look ahead for it.', show: 'b.3' },
        { say: 'Try one. The cost of the concert tickets, is or are, too high. Cover the phrase that begins with of, and the subject is cost, which is singular. So the verb is is.', hide: 'b', show: 'ans' },
      ],
    },
    {
      chapter: 'Pronouns',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Subject case**: I, he, she, we, they, who', '**Object case**: me, him, her, us, them, whom', 'After a preposition such as *to*, *for* or *between*, use the object case'] },
        { kind: 'bullets', id: 'ans', items: ['Choose: *The teacher asked Diego and (I / me) to hand out the books.*', 'Cover the other person: *The teacher asked me.* So: **me**.'] },
      ],
      lines: [
        { say: 'A pronoun stands in for a noun, and must agree with it in number. It must also be in the right case. Use subject case, such as I and she, when the pronoun does the action.', show: ['b.0'] },
        { say: 'Use object case, such as me and them, when it receives the action or follows a preposition.', show: ['b.1', 'b.2'] },
        { say: 'With two people, cover the other person. “The teacher asked Diego and I” sounds wrong, but “the teacher asked me” sounds right.', hide: 'b', show: 'ans' },
      ],
    },
    {
      chapter: 'Consistent tense',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'ex', items: ['*Hana opened the door and looked around the empty classroom. On the desk, she **notices** a note and picked it up.*', 'Fix: *she **noticed** a note and picked it up.*'] }],
      lines: [
        { say: 'A story or essay chooses a tense, past or present, and stays in it. Read this one. Hana opened the door and looked around. Then she notices a note and picked it up.', show: 'ex' },
        { say: 'The verbs are opened, looked, notices and picked. Three are past, but notices is present. Change it to noticed.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: '“Along with” is not “and”', md: 'Phrases such as *along with*, *as well as* and *together with* do not make a subject plural. *Wei, along with his teammates, **is** ready for the final.* Only *and* joins subjects into a plural.' }],
      lines: [
        { say: 'A common mistake is treating along with as if it meant and. Phrases such as along with, as well as and together with add information, but they do not make the subject plural.', show: 'm' },
        { say: 'Wei, along with his teammates, is ready for the final. Only the word and joins subjects into a plural.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these four sentences has a verb that agrees with its subject?',
          choices: ['One of the windows are cracked.', 'One of the windows is cracked.', 'One of the window are cracked.', 'One of the windows were cracked.'],
          answer: 1,
          working: 'The subject is one, which is singular, so the verb is is.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these four sentences has a verb that agrees with its subject? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The subject is one, which is singular, so the verb is is. Windows is only part of the phrase after of.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the true subject before choosing the verb.', 'Pronouns agree in number and use the right case.', 'Keep verb tense consistent.'] }],
      lines: [
        { say: 'Let’s sum up. Find the true subject before choosing the verb.', show: 'sum.0' },
        { say: 'Pronouns agree in number, and take subject case or object case by their job.', show: 'sum.1' },
        { say: 'And keep your verb tense consistent within a passage.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
