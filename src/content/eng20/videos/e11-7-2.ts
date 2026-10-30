import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-7-2',
  lessonId: 'e11-7-2',
  title: 'Dashes, Colons, Parentheses and Quotation Marks',
  thumbnailTitle: 'Dashes, Colons and Parentheses',
  thumbnail: false,
  summary:
    'Use dashes, colons and parentheses for control and emphasis, and use square brackets and ellipses to shorten or clarify a quotation honestly.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Language', title: 'Dashes, Colons and Parentheses', subtitle: 'Marks that give you control' }],
      lines: [
        { say: 'Kwame opened the door and found the room empty. That is a plain report. Put a dash before the word and, and the reader pauses before the surprise.', show: 'title' },
        { say: 'In this lesson you will use dashes, colons and parentheses, and the square brackets and ellipses used inside quotations.' },
      ],
    },
    {
      chapter: 'Dashes',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'A pair: *The old bridge—built more than a century ago—still carries traffic every day.*',
            'A single dash: *After years of practice, Ravi finally had what he wanted—a place in the orchestra.*',
          ],
        },
      ],
      lines: [
        { say: 'A dash marks a strong break. A pair of dashes sets off an interruption in the middle of a sentence. Lift out the dashes and the words between them, and what remains must still read correctly.', show: 'b.0', focus: 'b.0' },
        { say: 'A single dash makes a pause before a sudden turn, or stresses what comes at the end. An interruption that opens with a dash must close with a dash, never a comma.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Colons',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'c',
          items: [
            'A list: *The kit contains everything a climber needs: a rope, a harness, a helmet and gloves.*',
            'An explanation: *The reason for the delay was simple: the pilot was ill.*',
            'What was promised: *Leila had trained for one goal: a place in the national team.*',
          ],
        },
      ],
      lines: [
        { say: 'A colon comes after a complete clause and points forward. It can introduce a list, or an explanation.', show: ['c.0', 'c.1'] },
        { say: 'It can also introduce the thing the clause has promised. Leila had trained for one goal, and the colon delivers it.', show: 'c.2', focus: 'c.2' },
      ],
    },
    {
      chapter: 'Parentheses',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', md: '*The museum (which reopened last spring) has a new hall of dinosaur fossils.*', size: 'lg' },
      ],
      lines: [
        { say: 'Parentheses enclose extra information the sentence could do without.', show: 'p' },
        { say: 'Dashes make the extra words stand out. Commas are neutral. Parentheses quietly play the words down, like an aside. Do not put a comma before an opening parenthesis. When the words in parentheses are part of a sentence, the sentence’s own punctuation goes outside the closing parenthesis.' },
      ],
    },
    {
      chapter: 'Marks inside quotations',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'q',
          items: [
            'Added: *“[The two climbers] finally reached the summit at noon.”*',
            'Original: *“The bridge will close on Monday, for safety reasons, and will reopen when the repairs are complete.”*',
            'Shortened: *“The bridge will close on Monday … and will reopen when the repairs are complete.”*',
          ],
        },
      ],
      lines: [
        { say: 'Inside quotation marks, the words must be exactly the writer’s. Square brackets show words you have added, often to make clear who a pronoun means.', show: 'q.0', focus: 'q.0' },
        { say: 'An ellipsis, which is three dots, shows words you have left out. Here the words for safety reasons are gone, and the sentence still says what the original said.', show: ['q.1', 'q.2'], focus: 'q.2' },
        { say: 'Never let an ellipsis change the meaning. Cutting the words did not from a speaker’s sentence would reverse what she said. In dialogue, an ellipsis can also show a voice trailing off.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'm', items: ['Wrong: *The recipe needs: cumin, turmeric and chilli.*', 'Right: *The recipe needs three spices: cumin, turmeric and chilli.*'] },
      ],
      lines: [
        { say: 'A common mistake is a colon straight after a verb. In the wrong version, the words before the colon are not yet a complete clause.', show: 'm.0', focus: 'm.0' },
        { say: 'Complete the clause, as in the right version, or leave the colon out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence sets off the interruption correctly?',
          choices: [
            'My grandmother, a champion swimmer in her youth—still swims every morning.',
            'My grandmother—a champion swimmer in her youth, still swims every morning.',
            'My grandmother—a champion swimmer in her youth—still swims every morning.',
            'My grandmother: a champion swimmer in her youth: still swims every morning.',
          ],
          answer: 2,
          working: 'C opens and closes the interruption with a dash. A and B open and close with different marks, and D uses colons, which do not set off an interruption.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence sets off the interruption correctly? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. The interruption opens with a dash and closes with a dash.', show: 'q2.answer' },
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
          items: ['Close an interruption the way you opened it.', 'A colon follows a complete clause; parentheses hold extra information.', 'Brackets mark added words; an ellipsis marks cuts, never changing the meaning.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Close an interruption the way you opened it.', show: 'sum.0' },
        { say: 'A colon follows a complete clause, and parentheses hold extra information.', show: 'sum.1' },
        { say: 'And in a quotation, brackets mark added words and an ellipsis marks cuts, without changing the meaning.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
