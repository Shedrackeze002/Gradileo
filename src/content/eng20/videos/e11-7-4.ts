import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-7-4',
  lessonId: 'e11-7-4',
  title: 'Usage and Pronoun Reference',
  thumbnailTitle: 'Usage and Pronoun Reference',
  thumbnail: false,
  summary:
    'Choose correctly between easily confused words in formal writing, such as who and whom, and make every pronoun point clearly to one antecedent.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Language', title: 'Usage and Pronoun Reference', subtitle: 'Small choices, careful writing' }],
      lines: [
        { say: 'A job application that asks, Who should I contact, will be understood. One that asks, Whom should I contact, shows the writer knows the conventions of formal English.', show: 'title' },
        { say: 'Usage is the set of choices careful writers make between words that are easy to mix up. In this lesson you will practise the most common ones, and then make sure every pronoun points clearly to the right word.' },
      ],
    },
    {
      chapter: 'Who and whom',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'w',
          items: [
            '*The artist who painted the mural is from Accra.*',
            '*The scientist whom we interviewed works at the observatory.*',
          ],
        },
      ],
      lines: [
        { say: 'Who is a subject, like he. Whom is an object, like him. Look only at the clause the word belongs to, and try he or him in its place.', show: 'w.0' },
        { say: 'She painted the mural, so who. We interviewed her, so whom.', show: 'w.1', focus: 'w.1' },
      ],
    },
    {
      chapter: 'More easily confused words',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'u',
          items: [
            'Lie, lay, lain: *Yesterday I lay down for a nap.*',
            'Lay, laid, laid: *Ravi laid the map on the table.*',
            'Fewer and less: *fewer mistakes*, *less time*',
            'Between and among: *between the two winners*, *among the students*',
            'Else: *Amara runs faster than anyone else in her class.*',
            'Good and well: *Samuel played well. The soup smells good.*',
          ],
        },
      ],
      lines: [
        { say: 'Lie means to rest, and has no object. Its past is lay, which is why the two are confused. Lay means to put something down, and needs an object.', show: ['u.0', 'u.1'] },
        { say: 'Use fewer for things you can count and less for amounts. Use between for two, and among for a group.', show: ['u.2', 'u.3'] },
        { say: 'Add else when something is compared with its own group, so Amara is faster than anyone else in her class. And well describes how something is done, while good follows linking verbs, like smells.', show: ['u.4', 'u.5'] },
      ],
    },
    {
      chapter: 'Clear pronoun reference',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'r',
          items: [
            'Ambiguous: *When the glass hit the table, it broke.*',
            'Vague: *The council cut bus routes and raised fares. This angered residents.*',
            'Missing: *At the clinic, they told me to wait.*',
          ],
        },
      ],
      lines: [
        { say: 'A pronoun stands in for a noun called its antecedent. Every pronoun should point clearly to one.', show: 'r.0' },
        { say: 'Reference goes wrong in three ways. It can be ambiguous: did the glass break, or the table?', show: 'r.0', focus: 'r.0' },
        { say: 'It can be vague, when this points at a whole idea. Or it can be missing, with no antecedent at all.', show: ['r.1', 'r.2'] },
        { say: 'The quickest fix is often to name the noun. Singular they is fine, as in each student should bring their own lunch. It is a problem only when the reader cannot tell who it means.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'm', items: ['Wrong: *The candidate whom I think will win is Kenji.*', 'Right: *The candidate who I think will win is Kenji.*'] },
      ],
      lines: [
        { say: 'A common mistake is being fooled by words in between. The words I think are only an aside.', show: 'm.0', focus: 'm.0' },
        { say: 'Lift them out, and who is the subject of will win. So the right word is who.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q4',
          prompt: 'Priya told Yuki that she had won. Which says clearly that Yuki won?',
          choices: [
            'Priya told Yuki that she had won the prize, and she was delighted.',
            'Priya told Yuki about the prize, so she knew that she had won it.',
            'Priya told Yuki that she herself had certainly won the prize.',
            'Priya said to Yuki, “You have won the prize.”',
          ],
          answer: 3,
          working: 'D uses the exact words, so only one reading is possible. A, B and C still leave she open to two readings.',
        },
      ],
      lines: [
        { say: 'Your turn. Priya told Yuki that she had won the prize, and the writer means Yuki. Which sentence says so clearly? Pause the video and try it.', show: 'q4', wait: 6 },
        { say: 'The answer is D. Quoting the words leaves only one reading. The others still leave she open to two.', show: 'q4.answer' },
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
          items: ['Test who and whom with he and him inside the word’s own clause.', 'Choose carefully between lie and lay, fewer and less, between and among.', 'Give every pronoun one clear antecedent.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Test who and whom with he and him, inside the word’s own clause.', show: 'sum.0' },
        { say: 'Choose carefully between lie and lay, fewer and less, and between and among.', show: 'sum.1' },
        { say: 'And give every pronoun one clear antecedent.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
