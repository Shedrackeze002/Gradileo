import { englishExam, ours, scene, table } from '../english.ts';

// Grade 8 English, lesson 7.4 (using research). An exam-style question we wrote, in the style of a
// Grade 8 writing test. The answer is A: a signal phrase names the source, the quotation is followed
// by an in-text citation, and the writer explains it. The author, study and page are invented.

export default englishExam({
  lesson: 'e8-7-4',
  ...ours('a Grade 8 writing test', 'the author and study are invented'),
  title: 'Which Sentence Introduces the Source Best?',
  thumbnailTitle: 'Signal Phrases',
  subtitle: 'Introducing and citing sources, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a student wants to use a quotation from a marine biologist in a report about ocean plastic. We learn what a signal phrase and an in-text citation are, test four sentences, and choose the one that introduces, cites and explains the source.',
  intro: [
    'In this video, we solve an exam-style writing question about using research. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 writing test. The author and the study are made up.',
  ],
  question: {
    prompt: 'A student is using a quotation from marine biologist **Dr. Ana Ruiz** in a report about ocean plastic. Which sentence introduces and cites the source **best**?',
    text: 'A student is using a quotation from marine biologist Dr. Ana Ruiz in a report about ocean plastic. Which sentence introduces and cites the source best?',
    choices: [
      'Marine biologist Ana Ruiz warns that “most plastic in the sea breaks into pieces too small to see” (Ruiz 42), which means the problem is far bigger than it looks.',
      '“Most plastic in the sea breaks into pieces too small to see.”',
      'Someone on the internet said plastic breaks into small pieces.',
      'Plastic breaks into pieces too small to see.',
    ],
    answer: 0,
    working: 'A has a **signal phrase** (*Marine biologist Ana Ruiz warns*), an **in-text citation** (*Ruiz 42*) and an **explanation**.',
    say: [
      'A student is using a quotation from marine biologist Doctor Ana Ruiz in a report about ocean plastic. Which sentence introduces and cites the source best?',
      'A: Marine biologist Ana Ruiz warns that most plastic in the sea breaks into pieces too small to see, Ruiz forty-two in brackets, which means the problem is far bigger than it looks. B: the quotation on its own. C: Someone on the internet said plastic breaks into small pieces. D: Plastic breaks into pieces too small to see, with no source.',
    ],
  },
  ask: [
    ['We need to **introduce**, **cite** and **explain**', 'We need a sentence that introduces the source, cites it, and explains it.'],
    ['Which one does **all three**?', 'Which one does all three?'],
  ],
  know: {
    title: 'Signal phrases and citations',
    md: 'A **signal phrase** introduces a source and says **who** they are (*Marine biologist Ana Ruiz warns…*). An **in-text citation** in brackets gives the author and **page** (*Ruiz 42*). The full details go in the **works-cited** list at the end. Then **explain** what the source shows.',
    say: [
      'Here is the idea we need. A signal phrase introduces a source and tells the reader who they are, as in, marine biologist Ana Ruiz warns.',
      'An in-text citation, in brackets, gives the author’s name and the page. The full details go in the works-cited list at the end. And then the writer explains what the source shows.',
    ],
  },
  plan: [
    ['Is there a **signal phrase**?', 'Here is the plan. First, is there a signal phrase?'],
    ['Is there a **citation**?', 'Second, is there a citation?'],
    ['Is it **explained**?', 'Third, is it explained?'],
  ],
  steps: [
    scene('Step 1: Test each sentence', [table('t', ['Sentence', 'Signal phrase?', 'Citation?', 'Explained?'], [['A', '[[good:✓ Marine biologist Ana Ruiz warns]]', '[[good:✓ (Ruiz 42)]]', '[[good:✓ which means…]]'], ['B', '[[bad:✗ dropped in alone]]', '[[bad:✗]]', '[[bad:✗]]'], ['C', '[[bad:✗ “someone on the internet”]]', '[[bad:✗]]', '[[bad:✗]]'], ['D', '[[bad:✗]]', '[[bad:✗ presented as the writer’s own]]', '[[bad:✗]]']])], [
      { say: 'Step one. B drops the quotation in alone. We do not know who said it.', show: 't.1' },
      { say: 'C is vague: someone on the internet is not a credible source. D gives the idea with no source at all, as if it were the writer’s own. That is plagiarism.', show: ['t.2', 't.3'] },
      { say: 'A has all three: a signal phrase that shows the author is an expert, a citation with the page, and an explanation. The answer is A.', show: 't.0', focus: 't.0' },
    ]),
  ],
  check: [
    ['The reader knows **who**, **where**, and **why it matters**', 'Let us check. With A, the reader knows who said it, where to find it, and why it matters.'],
    ['That is **using** research, not just copying it', 'That is using research, not just copying it. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Exact words, but **no** introduction or citation', 'Choice B is the trap. It uses the exact words correctly, in quotation marks, but never says who wrote them.'],
      ['C', 'A **vague**, weak source', 'Choice C names a vague, weak source.'],
      ['D', 'No source: **plagiarism**', 'Choice D gives no source at all.'],
    ],
  },
  yourTurn: {
    prompt: 'Where does the **full** information about a source (author, title, publisher, date) belong?',
    choices: ['in the title of the report', 'in the first sentence', 'nowhere', 'in the works-cited list at the end'],
    answer: 3,
    working: 'The in-text citation is short; the **full** details go in the **works-cited** list.',
    ask: 'Where does the full information about a source, the author, title, publisher and date, belong? A: in the title of the report. B: in the first sentence. C: nowhere. D: in the works-cited list at the end.',
    reveal: 'The answer is D, the works-cited list at the end. The in-text citation is short, and points the reader to the full entry there.',
  },
  sum: [
    ['Use a **signal phrase** to introduce the source', 'Here is what to remember. Use a signal phrase to introduce the source.'],
    ['Add an **in-text citation**; full details in **works cited**', 'Add an in-text citation, and put the full details in the works-cited list.'],
    ['Then **explain** what the source shows', 'Then explain what the source shows. For more on using research, watch this lesson’s explainer video on Gradileo.'],
  ],
});
