import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-9-1',
  lessonId: 'ex-9-1',
  title: 'Love and Relationships: When We Two Parted, Love’s Philosophy and Porphyria’s Lover',
  thumbnail: false,
  summary:
    'Three poems from the AQA Love and Relationships cluster: Byron’s “When We Two Parted”, the pain of a secret affair’s end; Shelley’s “Love’s Philosophy”, an argument for love from nature; and Browning’s “Porphyria’s Lover”, a monologue by a man who kills to possess. Quotations are from public domain editions, credited in the lesson.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry Anthology: Love and Relationships', title: 'When We Two Parted, Love’s Philosophy and Porphyria’s Lover', subtitle: 'Byron, Shelley and Browning' }],
      lines: [
        { say: 'Three nineteenth-century poems from the Love and Relationships cluster: heartbreak, longing, and a love that turns to murder.', show: 'title' },
        { say: 'In this lesson, you will learn what each poem is about, read its key lines, and compare the poems.' },
      ],
    },
    {
      chapter: 'When We Two Parted',
      layout: 'center',
      main: [{ kind: 'quote', id: 'q', lines: ['When we two parted', 'In silence and tears,', 'Half broken-hearted', 'To sever for years,'], by: 'Lord Byron, “When We Two Parted”' }],
      lines: [
        { say: 'In When We Two Parted, from eighteen sixteen, Byron remembers the end of a secret love affair.', caption: 'In When We Two Parted, from 1816, Byron remembers the end of a secret love affair.', show: 'q' },
        { say: 'Sever makes the parting sound like a cut. Now he hears gossip about her, and shares her shame, but must grieve alone.' },
        { say: 'The poem ends as it began, with silence and tears: his pain has not changed.' },
      ],
    },
    {
      chapter: 'Love’s Philosophy',
      layout: 'center',
      main: [{ kind: 'quote', id: 'q', lines: ['What is all this sweet work worth', 'If thou kiss not me?'], by: 'Percy Bysshe Shelley, “Love’s Philosophy”' }],
      lines: [
        { say: 'In Love’s Philosophy, Shelley’s speaker argues that everything in nature joins together: rivers mingle with the sea, and the waves embrace.', show: 'q' },
        { say: 'So why will she not kiss him? The question is never answered, which suggests that his longing is not returned.' },
      ],
    },
    {
      chapter: 'Porphyria’s Lover',
      layout: 'center',
      main: [{ kind: 'quote', id: 'q', lines: ['That moment she was mine, mine, fair,', 'Perfectly pure and good:'], by: 'Robert Browning, “Porphyria’s Lover”' }],
      lines: [
        { say: 'In Porphyria’s Lover, a man describes a stormy night, when the woman he loves comes to his cottage and tells him she loves him.', show: 'q' },
        { say: 'He repeats the word mine. He wants to keep that perfect moment for ever, so he strangles her with her own hair.' },
        { say: 'It is a dramatic monologue. We only hear the killer, and his calm, reasonable voice makes him more frightening.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '“Porphyria’s Lover” opens: *“The rain set early in to-night, / The sullen wind was soon awake”*. What does the weather do?',
          choices: ['It shows that Porphyria will not visit', 'It sets a cheerful, romantic scene', 'It explains why the cottage is cold', 'It reflects the speaker’s dark mood'],
          answer: 3,
          working: 'This is pathetic fallacy: the sullen storm mirrors the speaker’s mind.',
        },
      ],
      lines: [
        { say: 'Your turn. The poem opens: the rain set early in tonight, the sullen wind was soon awake. What does the weather do? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. This is pathetic fallacy: the sullen storm reflects the speaker’s dark mood, and warns us of what is to come.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['When We Two Parted: secret love, lasting heartbreak.', 'Love’s Philosophy: desire argued from nature.', 'Porphyria’s Lover: possession that ends in murder.'] }],
      lines: [
        { say: 'Let’s sum up. Byron writes of the lasting pain of a secret love.', show: 'sum.0' },
        { say: 'Shelley uses nature to argue for a kiss that never comes.', show: 'sum.1' },
        { say: 'And Browning’s speaker shows the dark side of desire: the wish to possess.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
