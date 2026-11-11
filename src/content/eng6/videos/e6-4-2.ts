import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-4-2',
  lessonId: 'e6-4-2',
  title: 'Images and Headlines',
  summary:
    'Every image is chosen: ask what is shown, what is left out, how it is framed, from what angle and what the caption says. Loaded words in headlines carry strong feelings, while neutral words only report.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Media', title: 'Images and Headlines', subtitle: 'Reading the message behind the news' }],
      lines: [
        { say: 'A photograph seems to show the plain truth, and a headline seems to just name the news.', show: 'title' },
        { say: 'But every image is chosen, and every headline is written, by someone. In this lesson, you will learn to read the messages they send.' },
      ],
    },
    {
      chapter: 'Reading images',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Question', 'Why it matters'],
          rows: [
            ['**What is shown?**', 'A trophy and confetti suggest success.'],
            ['**What is left out?**', 'A water park advert shows sunny, empty slides, not the queues.'],
            ['**How is it framed?**', 'A wide shot makes a crowd look huge; a close-up makes it look small.'],
            ['**From what angle?**', 'Looking **up** makes things seem big and powerful; looking **down**, small.'],
            ['**What does the caption say?**', 'It tells you how to read the picture.'],
          ],
        },
      ],
      lines: [
        { say: 'When you look at an image in the news or an advert, ask five questions.', show: 't' },
        { say: 'What is shown? The people, objects and setting carry a message. A trophy and confetti suggest success.', focus: 't.0' },
        { say: 'What is left out? An advert for a water park may show empty slides and sunshine, but not the queues.', focus: 't.1' },
        { say: 'How is it framed? A wide shot of a crowd makes a protest look huge. A close-up of a few people makes it look small.', focus: 't.2' },
        { say: 'From what angle? Looking up at something makes it seem big and powerful, and looking down makes it seem small.', focus: 't.3' },
        { say: 'And what does the caption say? A caption tells you how to read the picture, and it can change its meaning.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Reading an angle',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A news photo of a forest fire, taken from a **low angle**, with flames towering over a firefighter.' },
        { kind: 'text', id: 'ans', size: 'lg', md: 'The fire seems **huge and powerful**.' },
      ],
      lines: [
        { say: 'A news photo of a forest fire is taken from a low angle, with flames towering over a firefighter. What does the angle suggest?', show: 'q' },
        { say: 'A low angle looks up, which makes things above seem larger. The firefighter looks small beside the flames. So the angle suggests that the fire is huge and powerful.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Loaded words in headlines',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Loaded and neutral words', md: 'A **loaded word** carries strong feelings, positive or negative: *heroic*, *shameful*, *slams*, *crush*. A **neutral word** simply reports: *helps*, *votes*, *says*, *wins*.' },
        {
          kind: 'table',
          id: 't',
          head: ['Loaded headline', 'Neutral headline'],
          rows: [
            ['*Heroic Pupils Save Stranded Dog*', '*Pupils Help Dog Off Ice*'],
            ['*Council Slams Door on Book Lovers*', '*Council Votes to Close Library on Sundays*'],
            ['*Tigers Crush Lions 5–0*', '*Tigers Beat Lions 5–0*'],
          ],
        },
      ],
      lines: [
        { say: 'A loaded word carries strong feelings, positive or negative, like heroic, shameful, slams or crush. A neutral word simply reports, like helps, votes, says or wins.', show: 'def' },
        { say: 'Heroic pupils save stranded dog is loaded with praise. Pupils help dog off ice only reports.', show: 't', focus: 't.0' },
        { say: 'Council slams door on book lovers is loaded against the council. The neutral version says the council votes to close the library on Sundays.', focus: 't.1' },
        { say: 'And crush is a much stronger word than beat.', focus: 't.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Loaded is not the same as false', md: 'A loaded headline may report true facts. It tells you how to **feel** about them before you have read the story.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Loaded is not the same as false. A loaded headline may report true facts.', show: 'm' },
        { say: 'The problem is that it tells you how to feel about them, before you have read the story. Notice the feeling, then decide for yourself.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is a neutral version of the headline “Greedy Developers Destroy Beloved Woods”?',
          choices: [
            'Developers Clear Woods for New Housing',
            'Heartless Builders Ruin Our Forest',
            'Beloved Woods Lost Forever',
            'Shameful Plan Wipes Out Woods',
          ],
          answer: 0,
          working: '“Greedy” and “beloved” are judgements, and “destroy” is a strong, negative verb. A keeps only the facts.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is a neutral version of this headline? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. Greedy and beloved are judgements, and destroy is a strong, negative verb. Choice A keeps only the facts: developers are clearing woods.', show: 'q2.answer' },
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
            'Every image is chosen: what is shown, left out, framed, and from what angle.',
            'A caption shapes how you read an image.',
            '**Loaded words** carry strong feelings; **neutral words** only report.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Every image is chosen. Ask what is shown, what is left out, how it is framed, and from what angle.', show: 'sum.0' },
        { say: 'A caption shapes how you read an image.', show: 'sum.1' },
        { say: 'And loaded words carry strong feelings, while neutral words only report.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
