import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-4-1',
  lessonId: 'e6-4-1',
  title: 'Advertising Techniques and Target Audience',
  thumbnailTitle: 'Advertising Techniques',
  summary:
    'An advertisement is a message made to persuade. Advertisers use bandwagon, testimonials, emotional appeals, facts and figures and slogans, and they shape every advert for its target audience.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Media', title: 'Advertising', subtitle: 'The tricks of persuasion' }],
      lines: [
        { say: 'Advertisements are everywhere: on buses, in apps, before videos, and on the backs of cereal boxes.', show: 'title' },
        { say: 'Every one of them is designed to persuade a particular group of people. Learning the tricks advertisers use makes you a sharper, more independent viewer.' },
      ],
    },
    {
      chapter: 'What an advertisement is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Advertisement', md: 'An **advertisement** (an **advert** or **ad**) is a message made to persuade people to buy a product, use a service, or do or believe something.' },
      ],
      lines: [
        { say: 'An advertisement, or advert, or ad, is a message made to persuade people to buy a product, use a service, or do or believe something.', show: 'def' },
        { say: 'Advertising is the business of making and showing these messages. And the people an advert is aimed at are its target audience. We will come back to them.', focus: 'def' },
      ],
    },
    {
      chapter: 'Advertising techniques',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Technique', 'How it persuades', 'Example (invented)'],
          rows: [
            ['**Bandwagon**', 'everyone is doing it, so you should too', '*Everyone at school is wearing ZoomKicks!*'],
            ['**Testimonial**', 'a famous or expert person recommends it', '*“I eat Crunch-O’s before every match,” says a football star.*'],
            ['**Emotional appeal**', 'makes you feel happy, sad, scared or proud', '*A lonely puppy in the rain: “Give him a warm home.”*'],
            ['**Facts and figures**', 'uses numbers and test results', '*9 out of 10 users had fewer fillings.*'],
            ['**Slogan**', 'a short, catchy phrase', '*FreshFarm: milk the way it should be.*'],
          ],
        },
      ],
      lines: [
        { say: 'Here are five techniques advertisers use.', show: 't' },
        { say: 'Bandwagon says everyone is doing it, so you should too. Don’t be left out!', focus: 't.0' },
        { say: 'A testimonial has a famous or expert person recommend the product, like a football star praising a cereal.', focus: 't.1' },
        { say: 'An emotional appeal makes you feel something: happy, sad, scared or proud, like a lonely puppy in the rain.', focus: 't.2' },
        { say: 'Facts and figures use numbers and test results. Nine out of ten users had fewer fillings.', focus: 't.3' },
        { say: 'And a slogan is a short, catchy phrase that sticks in your mind.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Naming the technique',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Join the millions of families who have already switched to FreshFarm milk.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Numbers can mislead too', md: '“9 out of 10 users” sounds convincing, but ask: who tested it, how many people were asked, and compared with what?' },
      ],
      lines: [
        { say: 'Which technique does this advert use?', show: 'q' },
        { say: 'It does not give facts about the milk, or use a famous person. It says that lots of other people are doing it. So it is bandwagon.', focus: 'q' },
        { say: 'Here is a common mistake: trusting every number. Nine out of ten users sounds convincing, but ask, who tested it, how many people were asked, and compared with what? Facts and figures in an advert are chosen to persuade.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The target audience',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Target audience', md: 'The **target audience** is the group of people an advert is aimed at. Words, pictures, music, and when and where it appears all suit that audience.' },
        {
          kind: 'table',
          id: 't',
          head: ['Clue', 'What it suggests'],
          rows: [
            ['bright colours, cartoons, a free toy', 'young children'],
            ['talk of safety, value and family', 'parents'],
            ['sports stars, music, “stand out”', 'teenagers'],
          ],
        },
      ],
      lines: [
        { say: 'The target audience is the group of people an advert is aimed at. Advertisers choose the words, pictures, music, and even the time and place an advert appears, to suit that audience.', show: 'def' },
        { say: 'Bright colours, cartoons and a free toy suggest young children. An advert shown during a Saturday-morning cartoon show is aimed at children too.', show: 't', focus: 't.0' },
        { say: 'Talk of safety, value and family suggests parents. And sports stars, music, and the words stand out suggest teenagers.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“SafeRide car seats: because nothing matters more than keeping your little one safe.” Who is the target audience?',
          choices: ['Teenagers', 'Young children', 'Parents of young children', 'Sports fans'],
          answer: 2,
          working: 'A car seat is bought by adults, and “your little one” speaks to someone who looks after a small child.',
        },
      ],
      lines: [
        { say: 'Your turn. Who is the target audience of this advert? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C, parents of young children. A car seat is bought by adults, not children, and your little one speaks to someone who looks after a small child.', show: 'q2.answer' },
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
            'Techniques: **bandwagon**, **testimonials**, **emotional appeals**, **facts and figures**, **slogans**.',
            'Ask who made the advert, and what it wants you to do.',
            'The **target audience** is the group an advert is aimed at.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Advertisers use bandwagon, testimonials, emotional appeals, facts and figures, and slogans.', show: 'sum.0' },
        { say: 'Ask who made the advert, and what it wants you to do.', show: 'sum.1' },
        { say: 'And the target audience is the group an advert is aimed at. Look at its words, its pictures, and where it appears.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
