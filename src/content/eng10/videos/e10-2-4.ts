import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-2-4',
  lessonId: 'e10-2-4',
  title: 'Reading a Poem Closely',
  summary:
    'Close reading starts with the speaker and the tone, and notices shifts in tone. Every interpretation must be supported by the poem’s own words.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Poetry', title: 'Reading a Poem Closely', subtitle: 'Speaker, tone and evidence' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['‘My name is Ozymandias, king of kings:', 'Look on my works, ye Mighty, and despair!’', 'Nothing beside remains. Round the decay', 'Of that colossal wreck, boundless and bare', 'The lone and level sands stretch far away.'], by: 'Percy Bysshe Shelley, “Ozymandias”' },
      ],
      lines: [
        { say: 'Shelley wrote a sonnet about a broken statue in the desert. On a first reading, it is a traveller’s tale.', show: 'title' },
        { say: 'On a second reading, you notice the boast, “Look on my works”, and the reply that follows: “Nothing beside remains.” The proudest king’s works have vanished into the sand, and the poem quietly mocks his pride.', show: ['q.0', 'q.1', 'q.2', 'q.3', 'q.4'] },
        { say: 'That second reading is close reading. In this lesson, you will learn to identify a poem’s speaker and tone, and to support an interpretation with the poem’s own words.' },
      ],
    },
    {
      chapter: 'The speaker',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Speaker', md: 'The voice that talks in a poem. It is not always the poet.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['We are the Dead. Short days ago', 'We lived, felt dawn, saw sunset glow,', 'Loved, and were loved, and now we lie', 'In Flanders fields.'], by: 'John McCrae, “In Flanders Fields”' },
      ],
      lines: [
        { say: 'The speaker is the voice that talks in a poem. The speaker is not always the poet. A poet can speak as a soldier, a child, an animal or even an object.', show: 'def' },
        { say: 'In “In Flanders Fields”, John McCrae, a doctor in the First World War, gives the poem to the soldiers buried in Flanders.', show: 'q' },
      ],
    },
    {
      chapter: 'Tone and shifts',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Tone and shift', md: '**Tone** is the speaker’s attitude toward the subject. A **shift** is a change in tone or direction, often marked by *but*, *yet* or *then*.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Haply I think on thee, and then my state,', 'Like to the lark at break of day arising', 'From sullen earth, sings hymns at heaven’s gate;'], by: 'William Shakespeare, “Sonnet 29”' },
      ],
      lines: [
        { say: 'Tone is the speaker’s attitude toward the subject, such as tender, bitter, playful or mournful. To name it, look closely at diction, the choice of words.', show: 'def' },
        { say: 'A shift is a change in tone or direction, often marked by a word like but, yet or then. Shakespeare’s Sonnet twenty-nine begins in misery, with the speaker in disgrace and an outcast.' },
        { say: 'Then comes “Haply I think on thee”. The speaker remembers the person he loves, and the lark rising at dawn makes the tone joyful, even triumphant.', show: 'q', focus: 'q' },
      ],
    },
    {
      chapter: 'Close reading steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Read** the whole poem for its general sense',
            '**Paraphrase** difficult lines',
            '**Notice** images, sounds, form and shifts',
            '**Ask** why the poet made each choice',
            '**Interpret**, quoting the poem’s own words',
          ],
        },
      ],
      lines: [
        { say: 'Close reading is a habit, and these five steps work for any poem.', },
        { say: 'Read the whole poem for its general sense. Paraphrase the difficult lines in your own words.', show: ['b.0', 'b.1'], focus: ['b.0', 'b.1'] },
        { say: 'Notice the details, such as images, sounds, form and shifts, and ask why the poet made each choice.', show: ['b.2', 'b.3'], focus: ['b.2', 'b.3'] },
        { say: 'Finally, interpret, and support every claim by quoting the poem’s own words.', show: 'b.4', focus: 'b.4' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Reading in what is not there', md: 'Claiming Dickinson’s speaker in “I’m nobody! Who are you?” is sad needs evidence. She calls being somebody “dreary” and is delighted to find “a pair of us”, so the claim fails.' },
      ],
      lines: [
        { say: 'Here is a common mistake: reading in what is not there.', show: 'm' },
        { say: 'Some readers claim that Dickinson’s speaker in “I’m nobody! Who are you?” is lonely and sad. But she calls being somebody dreary, and is delighted to find a pair of us. The evidence points to contentment.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A poem’s first half is despairing. Then a line begins with “Yet” and the speaker turns hopeful. What is this change called?',
          choices: [
            'A change in rhyme scheme',
            'A new kind of simile',
            'A break between stanzas',
            'A shift in the tone',
          ],
          answer: 3,
          working: 'A shift is a change in tone or direction, often marked by a word such as but, yet or then.',
        },
      ],
      lines: [
        { say: 'Your turn. A poem’s first half is despairing. Then a line begins with “Yet” and the speaker turns hopeful. What is this change called? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D, a shift in the tone. A shift is a change in tone or direction, often marked by a word such as but, yet or then.', show: 'q2.answer' },
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
            'The speaker is the voice in the poem, not always the poet.',
            'Tone is the speaker’s attitude; a shift is a change in it.',
            'Support every interpretation with the poem’s own words.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The speaker is the voice in the poem, and is not always the poet.', show: 'sum.0' },
        { say: 'Tone is the speaker’s attitude, which you find in the diction, and a shift is a change in that tone.', show: 'sum.1' },
        { say: 'And whatever you claim about a poem, support it with the poem’s own words.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
