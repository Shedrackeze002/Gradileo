import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-6-5',
  lessonId: 'e11-6-5',
  title: 'Style and Revision',
  thumbnailTitle: 'Style and Revision',
  thumbnail: false,
  summary:
    'Revise a draft for rhythm, emphasis, precision and tone: vary sentence openings, end on the key idea, cut hedges and empty intensifiers, and keep a consistent formal register.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Style and Revision', subtitle: 'Make the ideas land' }],
      lines: [
        { say: 'A first draft gets the ideas down. Revision makes them land.', show: 'title' },
        { say: 'Two essays can make the same argument, and one will still read as confident and precise while the other plods and hedges. The difference is style. In this lesson you will revise for rhythm, emphasis, precision and tone.' },
      ],
    },
    {
      chapter: 'Varying your sentences',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '*Before:* Della counted her money three times. Della found only one dollar and eighty-seven cents.',
            '*After:* Three times Della counted her money, and each time she found only one dollar and eighty-seven cents.',
          ],
        },
      ],
      lines: [
        { say: 'Sentences that all begin the same way and run the same length lull a reader to sleep. Here, every sentence begins with Della.', show: 'b.0', focus: 'b.0' },
        { say: 'Revision varies the openings, and combines closely related ideas. Join them with conjunctions, phrases and clauses, never with comma splices.', show: 'b.1', focus: 'b.1' },
        { say: 'A short sentence after longer ones lands hard. In a story about a man building a fire, “In a moment, the fire was out” hits because of what came before it.' },
      ],
    },
    {
      chapter: 'End focus',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '*Before:* No one listened to the engineers, who warned the council about the bridge for months.',
            '*After:* The engineers warned the council about the bridge for months, but no one listened.',
          ],
        },
      ],
      lines: [
        { say: 'Readers give the most weight to what comes last in a sentence. Suppose a writer wants to stress that no one listened.', show: 'b.0' },
        { say: 'Move the background, the months of warnings, to the start, and end with the key idea.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Precision and tone',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '*Wordy:* I think that maybe the ending of the story is sort of really very surprising.',
            '*Revised:* The ending of the story is surprising.',
            '*Informal:* He doesn’t get that it’s super cold, which is a big oops.',
            '*Formal:* He notices the extreme cold but never considers what it could do to him.',
          ],
        },
      ],
      lines: [
        { say: 'Replace vague words like stuff, things and good with exactly what you mean.' },
        { say: 'Hedges such as “I think” and “maybe” weaken a claim you mean to make. Empty intensifiers such as “really” and “very” signal that the word they modify is too weak. Cut both.', show: ['b.0', 'b.1'], focus: ['b.0', 'b.1'] },
        { say: 'Finally, keep a consistent tone. A literary essay uses a formal register, so one chatty sentence jars.', show: 'b.2', focus: 'b.2' },
        { say: 'Revise it in formal words, keeping the meaning.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Fixing the tone but changing the point', md: '“He is terrified of the cold from the start” is formal, but it says the opposite of what the paragraph argues.' },
      ],
      lines: [
        { say: 'Here is a common mistake: fixing the tone but changing the point. A formal sentence can still say the opposite of what the paragraph argues.', show: 'm' },
        { say: 'A revision for tone must still say the same thing about the text.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which best revises: “I think that maybe the ending is sort of really very surprising”?',
          choices: [
            'I think the ending is very surprising to most readers.',
            'The ending is sort of surprising, and maybe it shocks.',
            'The ending is surprising.',
            'Perhaps the ending is truly and extremely surprising.',
          ],
          answer: 2,
          working: 'C cuts the hedges and the empty intensifiers and states the point plainly. The others keep a hedge or an intensifier.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these best revises the sentence: I think that maybe the ending is sort of really very surprising? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. It cuts the hedges and the empty intensifiers, and states the point plainly.', show: 'q2.answer' },
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
          items: ['Vary openings and lengths; use a short sentence for emphasis.', 'End a sentence with the idea you most want to stress.', 'Be precise, cut hedges, and keep a formal tone without changing the meaning.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Vary your openings and lengths, and save a short sentence for emphasis.', show: 'sum.0' },
        { say: 'End a sentence with the idea you most want to stress.', show: 'sum.1' },
        { say: 'And be precise, cut needless hedges, and keep a formal tone without changing the meaning.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
