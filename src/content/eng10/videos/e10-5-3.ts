import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-5-3',
  lessonId: 'e10-5-3',
  title: 'Advertising',
  thumbnail: false,
  summary:
    'Learn the techniques advertisers use to persuade, work out the target audience, and read an advertisement critically. Every product and person in the examples is invented.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Visual and Media Texts', title: 'Advertising', subtitle: 'How advertisements persuade' }],
      lines: [
        { say: 'An advertisement for running shoes shows a champion sprinter crossing a finish line in slow motion, a crowd roaring, and three words: Run like them.', show: 'title' },
        { say: 'It never mentions the price, the weight or how long the shoes last. It sells a feeling instead. In this lesson, you will learn the techniques advertisers use, and how to work out whom an advertisement is aimed at. Every product and person here is invented.' },
      ],
    },
    {
      chapter: 'Persuasive techniques',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Technique', 'Example'],
          rows: [
            ['Bandwagon', 'The whole town is shopping at Greenleaf Market.'],
            ['Testimonial', 'A famous chef says, “I cook with Golden Grove olive oil.”'],
            ['Snob appeal', 'For the few who accept nothing less than perfection.'],
            ['Fear', 'Every night without an alarm, you are leaving your family at risk.'],
          ],
        },
      ],
      lines: [
        { say: 'Advertisers use a toolbox of techniques. Bandwagon says everyone else is doing it, so you should too.', show: 't.0', focus: 't.0' },
        { say: 'A testimonial uses a famous or expert person to recommend the product. Snob appeal says the product is only for special or superior people.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'And fear says something bad will happen if you do not buy. There are others, such as glittering generalities, plain folks and statistics.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'The target audience',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Target audience', md: 'The group of people an advertisement is **designed to reach**.' },
        { kind: 'text', id: 'ad', size: 'md', md: 'Stay sharp in your golden years. BrainBloom puzzle books keep your mind active, with large print that’s easy on the eyes.' },
      ],
      lines: [
        { say: 'An advertisement’s target audience is the group of people it is designed to reach. Look for words that speak directly to one group, such as their age, their worries or their interests.', show: 'def' },
        { say: 'Take this invented advertisement for puzzle books.', show: 'ad' },
        { say: 'Golden years is a gentle phrase for old age, and large print suits readers whose eyesight is changing. So the target audience is older adults.', focus: 'ad' },
      ],
    },
    {
      chapter: 'Reading critically',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'q',
          items: ['Who made it, and what do they want?', 'Who is it aimed at?', 'Which techniques does it use?', 'What does it leave out?'],
        },
      ],
      lines: [
        { say: 'When you meet an advertisement, ask questions. Who made it, and what do they want? Almost always, they want you to buy, join or vote.', show: ['q.0'] },
        { say: 'Who is it aimed at? And which techniques does it use? Name them.', show: ['q.1', 'q.2'], focus: ['q.1', 'q.2'] },
        { say: 'Then ask what it leaves out, such as the price, the weaknesses, or the size of a survey.', show: 'q.3', focus: 'q.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Trusting the numbers', md: 'Statistics sound scientific, but ask where they came from. “Nine out of ten owners” may mean **ten owners**, chosen by the company.' },
      ],
      lines: [
        { say: 'Here is a common mistake: trusting the numbers. Statistics sound scientific, but ask where they came from.', show: 'mis' },
        { say: 'Nine out of ten owners in our taste test may mean only ten owners, chosen by the company. And up to forty percent longer may describe the best result, not the usual one.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An advertisement says: “Over a million teenagers have already switched to Zing Chat. Don’t be the last one left out!” Which technique does it use?',
          choices: [
            'Snob appeal: only special people can own it',
            'Bandwagon: everyone else is already doing it',
            'Testimonial: a famous expert recommends it',
            'Plain folks: the seller is an ordinary neighbour',
          ],
          answer: 1,
          working: 'It says everyone else is already using the app, so you should too. Popularity is not evidence of quality.',
        },
      ],
      lines: [
        { say: 'Your turn. An advertisement says: Over a million teenagers have already switched to Zing Chat. Don’t be the last one left out! Which technique does it use? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, bandwagon. It says everyone else is already using the app. But a million users says nothing about whether it is safe, private or any good.', show: 'q.answer' },
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
            'Advertisements persuade with bandwagon, testimonial, snob appeal, fear and more.',
            'Each technique leaves something out: popularity and fame are not evidence of quality.',
            'The **target audience** is the group an advertisement is designed to reach.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Advertisements persuade with techniques such as bandwagon, testimonial, snob appeal and fear.', show: 'sum.0' },
        { say: 'Each technique leaves something out. Popularity and fame are not evidence of quality.', show: 'sum.1' },
        { say: 'And the target audience is the group an advertisement is designed to reach.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
