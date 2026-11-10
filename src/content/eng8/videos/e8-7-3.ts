import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-7-3',
  lessonId: 'e8-7-3',
  title: 'Narrative Voice',
  summary:
    'Narrative voice is the personality and attitude that comes through in how a story is told, built from word choice, sentence rhythm and attitude, and it should stay consistent. In dialogue, punctuation goes inside the speech marks, each new speaker starts a new line, plain tags and action beats work best, and subtext lets characters show feelings without stating them.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'Narrative Voice', subtitle: 'Voice and dialogue' }],
      lines: [
        { say: 'Two writers can tell the same story and make it feel completely different. The difference is voice.', show: 'title' },
        { say: 'In this video we create a narrator with a distinctive voice, and write dialogue that sounds real and says more than its words.' },
      ],
    },
    {
      chapter: 'What voice is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Narrative voice', md: '**Narrative voice** is the personality and attitude that comes through in how a story is told. It is built from **word choice**, **sentence rhythm** and what the narrator **notices and thinks**.' },
        { kind: 'quote', id: 'q1', size: 'md', lines: ['The gym was flooded. It happened on a Tuesday.'] },
        { kind: 'quote', id: 'q2', size: 'md', lines: ['Look, I never meant to flood the gym. Nobody believes that, but it’s true.'] },
      ],
      lines: [
        { say: 'Narrative voice is the personality and attitude that comes through in how a story is told. It is built from word choice, sentence rhythm, and what the narrator notices and thinks.', show: 'def' },
        { say: 'Compare these two openings. The gym was flooded. It happened on a Tuesday. This just gives facts.', show: 'q1' },
        { say: 'Look, I never meant to flood the gym. Nobody believes that, but it’s true. This narrator speaks straight to us, sounds defensive, and is funny without trying. We already want to know what happened.', show: 'q2' },
      ],
    },
    {
      chapter: 'Tools of voice',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Tool', 'Example'],
          rows: [
            ['**Word choice**', '“My knees had turned to custard”, not “I was scared”'],
            ['**Sentence rhythm**', 'long and breathless for excitement; short for shock'],
            ['**Attitude**', 'humour, bitterness, wonder, worry'],
            ['**Fit**', 'calm and reflective for an old narrator; quick and lively for a child'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Keep the voice steady', md: 'If a chatty, funny narrator suddenly sounds like a textbook, readers lose trust. Change a voice only on purpose.' },
      ],
      lines: [
        { say: 'Voice comes from word choice. My knees had turned to custard says far more than I was scared.', show: 't', focus: 't.0' },
        { say: 'It comes from rhythm. A long, breathless sentence piled up with and, and, and, shows excitement, while short ones show shock.', focus: 't.1' },
        { say: 'It comes from attitude, such as humour, bitterness, wonder or worry. And it should fit the narrator: calm sentences for an old narrator looking back, quick, lively ones for a child.', focus: ['t.2', 't.3'] },
        { say: 'Keep the voice steady. If a chatty, funny narrator suddenly sounds like a textbook, readers lose trust and feel confused.', show: 'm' },
      ],
    },
    {
      chapter: 'Writing dialogue',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Punctuation goes **inside** the speech marks: “We’re late,” said Ada.',
            'Start a **new line** for each new speaker.',
            '**Plain tag:** “I’m not going,” said Ada.',
            '**Action beat:** Ada slammed the door. “I’m not going.”',
          ],
        },
      ],
      lines: [
        { say: 'Now dialogue. The punctuation that ends the speech goes inside the speech marks: we’re late, comma, said Ada.', show: 'b.0' },
        { say: 'Start a new line each time a different character speaks.', show: 'b.1' },
        { say: 'Said is almost invisible, so the reader focuses on the words spoken. Fancy tags, like retorted angrily, can distract if you use them too often.', show: 'b.2' },
        { say: 'An action beat shows who speaks and how they feel, with no tag at all. Ada slammed the door. I’m not going.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Subtext',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Subtext', md: '**Subtext** is the meaning beneath the words, which characters do not say directly. Real people rarely say exactly what they feel.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['“Nice haircut.”', '“Thanks. It’ll grow back.”'] },
      ],
      lines: [
        { say: 'Subtext is the meaning beneath the words, which characters do not say directly. Real people rarely say exactly what they feel, so dialogue with subtext sounds more real.', show: 'def' },
        { say: 'Nice haircut. Thanks, it’ll grow back. The second speaker never says I hate my haircut, but it’ll grow back shows exactly that.', show: 'q' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“And then the gates opened and the crowd roared and I ran and ran and I didn’t even feel my legs.” What does the rhythm show?',
          choices: [
            'The narrator is bored by the race.',
            'The narrator is an old person looking back calmly.',
            'The narrator has made a punctuation mistake.',
            'The narrator’s rush of excitement.',
          ],
          answer: 3,
          working: 'The sentence piles up clauses with “and” without stopping for breath, so we feel the race, not just hear about it.',
        },
      ],
      lines: [
        { say: 'Your turn. And then the gates opened and the crowd roared and I ran and ran and I didn’t even feel my legs. What does the rhythm show? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The sentence piles up clauses with and, without stopping for breath, so the rush of words shows the narrator’s excitement. We feel the race, not just hear about it.', show: 'q2.answer' },
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
            '**Voice** comes from word choice, rhythm and attitude.',
            'Make it fit the narrator, and keep it steady.',
            'Punctuation inside the speech marks; new speaker, new line.',
            'Use *said* and **action beats**, and let **subtext** carry feelings.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Voice comes from word choice, rhythm and attitude.', show: 'sum.0' },
        { say: 'Make it fit the narrator, and keep it steady unless a change is deliberate.', show: 'sum.1' },
        { say: 'In dialogue, punctuation goes inside the speech marks, and a new speaker starts a new line.', show: 'sum.2' },
        { say: 'Use said and action beats more than fancy tags, and let subtext carry the feelings.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
