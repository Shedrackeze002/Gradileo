import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-7-3',
  lessonId: 'e12-7-3',
  title: 'Register, Tone and Audience',
  thumbnailTitle: 'Register, Tone and Audience',
  thumbnail: false,
  summary:
    'The same news can be written four ways, and each is right for one reader and wrong for the others. Match register and tone to audience and purpose, spot a slip, and revise casual sentences into academic prose.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Language', title: 'Register, Tone and Audience', subtitle: 'Right for one reader, wrong for another' }],
      lines: [
        { say: 'The school has cancelled a field trip. Here is the same news written four times: a text to a friend, an email to the principal, a speech at an assembly, and a sentence from an essay.', show: 'title' },
        { say: 'None of these is simply good writing or bad writing. Each is right for one reader and wrong for the other three. In this lesson you will match register and tone to an audience and a purpose.' },
      ],
    },
    {
      chapter: 'Register and tone',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'r',
          items: [
            '**Register**: the level of formality a situation calls for',
            '**Tone**: the attitude the writing conveys',
            '*The committee’s decision deserves careful consideration* is respectful.',
            '*The committee’s decision deserves careful consideration, if only as a warning* is ironic.',
          ],
        },
      ],
      lines: [
        { say: 'Register is the level of formality and the kind of language a situation calls for. Tone is the attitude the writing conveys, such as respectful, urgent, ironic or calm.', show: ['r.0', 'r.1'] },
        { say: 'They are separate choices. Two sentences in the same formal register can carry very different tones. The first is respectful, and the second is ironic.', show: ['r.2', 'r.3'] },
        { say: 'So when you describe a piece of writing, name both: how formal it is, and what attitude it takes.' },
      ],
    },
    {
      chapter: 'Four registers',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'f',
          items: [
            '**Formal and academic**: an analytical essay, impersonal and precise',
            '**Polite and professional**: an email to someone in charge, clear and courteous',
            '**Rousing and public**: a speech, speaking to listeners as “we”',
            '**Casual and conversational**: a text to a friend, relaxed, with slang',
          ],
        },
      ],
      lines: [
        { say: 'Register depends on the audience, who will read or hear the words, and the purpose, what the words are meant to do.' },
        { say: 'An examiner needs a precise, impersonal argument. A stranger in charge needs a clear, polite request.', show: ['f.0', 'f.1'] },
        { say: 'A crowd needs to be stirred, so a speech says we and builds energy. A close friend needs no ceremony at all.', show: ['f.2', 'f.3'] },
        { say: 'A register is wrong when it would surprise the person it is meant for.' },
      ],
    },
    {
      chapter: 'Spotting a slip and revising',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            '**Slip**: *By the third act, Macbeth’s ambition is **through the roof**, and he no longer hesitates before killing.*',
            '**Formal**: *By the third act, Macbeth’s ambition has become boundless, and he no longer hesitates before killing.*',
          ],
        },
        {
          kind: 'bullets',
          id: 'v',
          items: [
            '**Casual**: *The narrator is super annoying and you just can’t trust anything he says.*',
            '**Academic**: *The narrator is irritating, and his account cannot be trusted.*',
          ],
        },
      ],
      lines: [
        { say: 'A formal essay can be undone by a single casual phrase. Through the roof belongs in conversation, and it stands out all the more because the rest is careful.', show: 's' },
        { say: 'When you revise, change the register and keep the meaning. Find the casual features: super, the direct address you, the filler just, and the contraction.', hide: 's', show: 'v.0' },
        { say: 'Then keep both claims: the narrator irritates, and his account is unreliable.', show: 'v.1', focus: 'v.1' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'm',
          tone: 'mistake',
          title: 'Formal but different',
          md: 'If the original says the research is “kind of mixed”, then *the research firmly confirms it* is formal but wrong. *The research is inconclusive* keeps the meaning.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake. A revision that sounds formal but changes the claim has failed.', show: 'm' },
        { say: 'Turning the sentence into a personal reaction fails too, because an essay argues about the text, not about the writer’s feelings.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which formal revision of “kind of mixed” keeps the meaning?',
          choices: [
            'The research is inconclusive, so the claim cannot yet be confirmed.',
            'The research firmly confirms the claim, as the evidence is very strong.',
            'I was so surprised that the research gave such mixed results at all.',
            'The research is pretty much mixed, and the claim is sort of unclear.',
          ],
          answer: 0,
          working: 'A keeps the meaning in formal words. B changes the claim, C is a personal reaction, and D keeps the casual hedges.',
        },
      ],
      lines: [
        { say: 'Your turn. Which formal revision of kind of mixed keeps the meaning? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. It keeps the meaning in formal words. B changes the claim, C is a personal reaction, and D keeps the casual hedges.', show: 'q2.answer' },
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
            'Choose the register from the audience and the purpose.',
            'One casual phrase can break a formal register.',
            'When you revise, keep the meaning.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Register is the level of formality, and tone is the attitude. Choose the register from the audience and the purpose.', show: 'sum.0' },
        { say: 'One casual phrase can break a formal register, so find it and replace it.', show: 'sum.1' },
        { say: 'And when you revise into academic prose, keep the meaning, and leave out personal reactions.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
