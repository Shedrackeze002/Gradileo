import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-1-3',
  lessonId: 'e11-1-3',
  title: 'Narrative Voice and Reliability',
  summary:
    'Narrative voice is the personality in the telling. Free indirect style blends a character’s thoughts into third-person narration, and an unreliable narrator opens a gap between what is said and what the reader understands.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Fiction', title: 'Narrative Voice and Reliability', subtitle: 'Who tells the story, and can we trust them?' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Oh, how fascinating it was! How she enjoyed it! How she loved sitting here, watching it all! It was like a play. It was exactly like a play.'],
          by: 'Katherine Mansfield, “Miss Brill”',
        },
      ],
      lines: [
        { say: 'Katherine Mansfield tells “Miss Brill” in the third person. Yet listen to this.', show: 'title' },
        { say: 'The narrator is not the one who is fascinated. Miss Brill is. Her breathless exclamations have slipped into the narration. In this lesson, you will analyze narrative voice, and judge how far a narrator can be trusted.', show: 'q' },
      ],
    },
    {
      chapter: 'Free indirect style',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Free indirect style', md: 'A character’s own words and feelings blended into third-person narration, with no quotation marks and no tag such as “she thought”.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Reported thought**: Ravi realized that he was late again.',
            '**Free indirect style**: Late again! What would Ms. Grant say this time?',
          ],
        },
      ],
      lines: [
        { say: 'Narrative voice is the personality we hear in the telling: its words, its attitude and its rhythm.', show: 'def' },
        { say: 'Free indirect style blends a character’s thoughts into the narration. Compare these two sentences about the same moment.', show: 'b.0' },
        { say: 'In the first, the narrator reports the thought. In the second, the exclamation and the worried question are Ravi’s own, with no tag. The reader stands close to him, while the narrator stays in charge.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Two voices',
      layout: 'center',
      main: [
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['To me, the spectacle of a man drifting serenely along through such a queer yarn without ever smiling, was exquisitely absurd.', 'why, if there was two birds setting on a fence, he would bet you which one would fly first;'],
          by: 'Mark Twain, “The Celebrated Jumping Frog of Calaveras County”',
        },
        { kind: 'text', id: 'ans', size: 'md', md: 'The narrator is **formal and superior**, and Wheeler is **folksy and solemn**.' },
      ],
      lines: [
        { say: 'A story can hold several voices. In “The Celebrated Jumping Frog”, an educated narrator describes old Simon Wheeler.', show: 'q.0' },
        { say: 'Wheeler then tells his own tale in everyday speech and dialect, saying there was two birds setting on a fence.', show: 'q.1' },
        { say: 'The narrator uses long, formal words like spectacle and serenely. Setting the two voices side by side is the joke, as the stuffy narrator meets the rambling storyteller.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Unreliable narrators',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unreliable narrator', md: 'A narrator whose account the reader cannot fully trust: naive, biased, self-deceiving or unwell.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**The claim**: “I am the calmest person in my family.”',
            '**The actions**: I let the air out of his tires and hid his phone.',
          ],
        },
      ],
      lines: [
        { say: 'An unreliable narrator is one the reader cannot fully trust. The narrator may be naive, biased, self-deceiving or unwell.', show: 'def' },
        { say: 'In “The Yellow Wallpaper”, a woman keeps a secret journal. She calls her husband very careful and loving, while we notice that he decides everything for her. The reader has to read past her words.', focus: 'def' },
        { say: 'Here is a simpler case. A narrator claims to be the calmest person in the family.', show: 'b.0' },
        { say: 'Then they let the air out of their brother’s tires and hide his phone. Their actions contradict the claim, so we trust what they do over what they say.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Third person is not always the narrator’s opinion', md: 'If a sentence judges, exclaims or asks a question in a way that sounds like a character, ask **whose words** they are. A judgement in free indirect style belongs to the character, not the author.' },
      ],
      lines: [
        { say: 'Here is a common mistake. A sentence in the third person is not always the narrator’s opinion.', show: 'm' },
        { say: 'If a sentence exclaims or judges like a character, ask whose words they are. In Miss Brill’s story, the delight belongs to her, not to the author.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Ravi ran up the stairs. Late again! What would Ms. Grant say this time? What style are the last two sentences?',
          choices: [
            'Free indirect style, because his thoughts blend into the narration.',
            'Direct thought, because his exact words are quoted with a tag.',
            'Reported thought, because the narrator says what he realized.',
            'Plain narration, because it only describes what he does.',
          ],
          answer: 0,
          working: 'The exclamation and the question are Ravi’s own thoughts, with no quotation marks or tag. That is free indirect style.',
        },
      ],
      lines: [
        { say: 'Your turn. Ravi ran up the stairs. Late again! What would Ms. Grant say this time? What style are the last two sentences? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. The exclamation and the question are Ravi’s own thoughts, with no quotation marks or tag. That is free indirect style.', show: 'q2.answer' },
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
            'Narrative voice is the personality in the telling; a story can hold several voices.',
            'Free indirect style blends a character’s thoughts into third-person narration.',
            'An unreliable narrator opens a gap between what is said and what is true.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Narrative voice is the personality in the telling, and a story can hold several voices.', show: 'sum.0' },
        { say: 'Free indirect style blends a character’s thoughts into the narration.', show: 'sum.1' },
        { say: 'And an unreliable narrator opens a gap between what is said and what is true.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
