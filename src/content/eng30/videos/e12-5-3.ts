import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-5-3',
  lessonId: 'e12-5-3',
  title: 'Propaganda and Misinformation',
  thumbnailTitle: 'Propaganda and Misinformation',
  thumbnail: false,
  summary:
    'Propaganda works on feelings rather than reason. Learn six propaganda techniques, how to resist them, and how to test a claim in digital media with lateral reading before you believe it or share it.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Media and Culture', title: 'Propaganda and Misinformation', subtitle: 'Test the claim before you share it' }],
      lines: [
        { say: 'During the First World War, posters showed the enemy as a giant ape or a monster. People who had never met a soldier from the other side learned to see him as a beast.', show: 'title' },
        { say: 'Two decades later, the Nazi regime in Germany blamed Jewish people for the country’s defeat, repeating the accusation until millions accepted it. In this lesson, you will learn to recognize propaganda, and to test claims online.' },
      ],
    },
    {
      chapter: 'The techniques of propaganda',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Demonization**: shows the enemy as monstrous',
            '**Glittering generalities**: noble, vague words that promise nothing',
            '**The big lie**: a huge falsehood, repeated often',
            '**Appeal to fear**: only our side can prevent the danger',
            '**Scapegoating**: blames a group for problems it did not cause',
            '**Transfer**: borrows respect for a flag or a hero',
          ],
        },
      ],
      lines: [
        { say: 'Propaganda works on feelings rather than reason, often by distorting the truth.' },
        { say: 'Demonization shows the enemy as monstrous. Glittering generalities use noble, vague words that promise nothing definite.', show: ['b.0', 'b.1'] },
        { say: 'The big lie repeats a huge falsehood until people believe it. An appeal to fear warns of a danger that only the speaker’s side can prevent.', show: ['b.2', 'b.3'] },
        { say: 'Scapegoating blames a group for problems it did not cause. Transfer borrows the respect people feel for a flag or a hero.', show: ['b.4', 'b.5'] },
      ],
    },
    {
      chapter: 'Resisting propaganda',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['a proud new dawn'] },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Words**: glittering generality', '**Symbols**: transfer'],
        },
      ],
      lines: [
        { say: 'Close cousins are easy to mix up. A slogan promising this is a glittering generality, because it uses words.', show: ['q', 'b.0'] },
        { say: 'A candidate who speaks only in front of the national flag, so that its glory seems to belong to her, is using transfer, because it uses symbols.', show: 'b.1' },
        { say: 'To resist propaganda, ask the question it hopes you will skip. What do the fine words commit the speaker to doing?' },
      ],
    },
    {
      chapter: 'Testing claims in digital media',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Misinformation**: false or misleading content, whoever shares it',
            '**Disinformation**: false content spread deliberately',
            '**Lateral reading**: leave the page and see what independent sources say',
          ],
        },
      ],
      lines: [
        { say: 'Misinformation is false or misleading content, whoever shares it. Disinformation is false content created or spread deliberately to deceive.', show: ['b.0', 'b.1'] },
        { say: 'To test a claim, use lateral reading. Leave the page, and find out what other, independent sources say about it. Who runs this site? Have trusted outlets reported the same thing?', show: 'b.2', focus: 'b.2' },
        { say: 'Picture a frightening dam photo from an account three days old. Urgency is a reason to slow down, not to share. A reverse image search shows whether the photo appeared earlier elsewhere.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Mistake**: It looks professional, so it must be true.', '**Better**: Judge a claim by what independent sources say about it.'],
        },
      ],
      lines: [
        { say: 'Here is a common mistake: thinking that it looks professional, so it must be true.', show: 'b.0' },
        { say: 'A polished logo, a confident tone and thousands of shares tell you nothing about accuracy. Judge a claim by what independent sources say about it.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A three-day-old account posts a cracked dam: “Millbrook Dam failing NOW — evacuate!” What is the best next step?',
          choices: [
            'Share it quickly, because a warning could save lives if true.',
            'Read laterally: see what the town’s official channels report.',
            'Trust it, because so many people have shared it so fast.',
            'Judge it by its look, since the photo seems real and urgent.',
          ],
          answer: 1,
          working: 'Urgency is a reason to slow down. Until the town’s official channels or reliable local news confirm it, the post should not be believed or shared.',
        },
      ],
      lines: [
        { say: 'Your turn. A three-day-old account posts a cracked dam, with a caption saying the dam is failing now, and urging people to evacuate. What is the best next step? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Urgency is a reason to slow down. Until official channels or reliable local news confirm it, do not believe it or share it.', show: 'q2.answer' },
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
            'Propaganda works on feeling; ask the question it hopes you will skip.',
            'Misinformation is false; disinformation is deliberate.',
            'Read laterally before you believe or share.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Propaganda works on feeling, so ask the question it hopes you will skip.', show: 'sum.0' },
        { say: 'Misinformation is false or misleading, and disinformation is spread deliberately.', show: 'sum.1' },
        { say: 'And read laterally: find out what independent sources say before you believe or share.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
