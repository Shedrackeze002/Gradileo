import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-5-1',
  lessonId: 'e9-5-1',
  title: 'Advertising and Its Audience',
  summary:
    'A target audience is the group an advert is designed to appeal to, found from its images, words and placement. Advertising techniques include testimonial, scarcity, bandwagon and glittering generalities, and a slogan makes a brand memorable. Paid promotion should be labelled, and many adverts sell an identity, not just a product.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Media', title: 'Advertising and Its Audience', subtitle: 'Who is this advert for?' }],
      lines: [
        { say: 'Every advert is built for someone. It chooses its words, images and channels to make a particular group of people want something.', show: 'title' },
        { say: 'In this video we identify common advertising techniques, and explain how an advert is designed for its audience.' },
      ],
    },
    {
      chapter: 'Target audience',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Target audience', md: 'A **target audience** is the group of people an advert is designed to appeal to, such as young children, parents, teenagers or business owners.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Images:** who is shown, and doing what?',
            '**Words:** simple or technical, playful or serious?',
            '**Placement:** where and when does it appear?',
          ],
        },
      ],
      lines: [
        { say: 'A target audience is the group of people an advert is designed to appeal to, such as young children, parents, teenagers or business owners.', show: 'def' },
        { say: 'To find it, look at three things. The images: who is shown, and doing what?', show: 'b.0' },
        { say: 'The words: are they simple or technical, playful or serious?', show: 'b.1' },
        { say: 'And the placement: where and when does the advert appear? Bright cartoons during children’s television are aimed at young children, and the parents who buy for them.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Same product, different audience',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Advert', 'Audience', 'What it stresses'],
          rows: [
            ['a family car passing a safety test', 'parents', 'safety'],
            ['the same car racing a coast road at sunset', 'young drivers', 'speed and style'],
          ],
        },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Selling an identity', md: 'A running-shoe advert that turns a tired office worker into a confident athlete sells the wish to become a **better version of yourself**.' },
      ],
      lines: [
        { say: 'The same product can be sold to different audiences. A family car shown passing a safety test is aimed at parents, because it stresses what they value: safety.', show: 't', focus: 't.0' },
        { say: 'The same car racing along a coast road at sunset is aimed at young drivers, because it stresses speed and style.', focus: 't.1' },
        { say: 'Many adverts sell an identity, not just a product. A running-shoe advert that shows a tired office worker turning into a confident athlete is selling the wish to become a better version of yourself.', show: 'k' },
      ],
    },
    {
      chapter: 'Advertising techniques',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Technique', 'How it works', 'Example'],
          rows: [
            ['**Testimonial**', 'a famous or trusted person vouches for it', '“I only drink Volt water,” says a sprinter.'],
            ['**Scarcity**', 'it will soon be gone, so act now', 'Only 50 left! Offer ends at midnight!'],
            ['**Bandwagon**', 'do what everyone else is doing', 'Join two million families who have switched.'],
            ['**Glittering generalities**', 'vague, positive words that promise nothing', 'The natural choice for a better, brighter life.'],
          ],
        },
      ],
      lines: [
        { say: 'Now the techniques. A testimonial has a famous or trusted person vouch for the product, like a champion sprinter.', show: 't', focus: 't.0' },
        { say: 'Scarcity suggests the product will soon be gone, so you must act now: only fifty left!', focus: 't.1' },
        { say: 'Bandwagon suggests you should do what everyone else is doing.', focus: 't.2' },
        { say: 'And glittering generalities are vague, positive words that sound good but promise nothing specific. A slogan, a short, catchy phrase, makes the brand memorable.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Look for the label',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Look for the label', md: 'When an influencer is **paid** to promote something, the post should say so, for example with **#ad** or **sponsored**. The label tells you the review may not be impartial, even if it looks like a friendly recommendation.' },
      ],
      lines: [
        { say: 'A common mistake is to treat an influencer’s post as a friendly recommendation. When they are paid to promote something, the post should say so, for example with hashtag ad, or sponsored.', show: 'm' },
        { say: 'The label matters because it tells you the review may not be impartial. And online, adverts are often targeted: websites track what you browse, so an advert can follow you from site to site.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'An advert reads: “Fresh. Natural. Yours. Only 100 bottles left this week!” Which two techniques does it combine?',
          choices: [
            'Glittering generalities and scarcity',
            'Testimonial and bandwagon',
            'Bandwagon and a slogan only',
            'Testimonial and scarcity',
          ],
          answer: 0,
          working: '“Fresh. Natural. Yours.” are pleasant words with no checkable promise. “Only 100 bottles left” pushes you to buy before it is too late.',
        },
      ],
      lines: [
        { say: 'Your turn. An advert reads: fresh. Natural. Yours. Only one hundred bottles left this week! Which two techniques does it combine? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is "A". Fresh, natural, yours are glittering generalities, pleasant words with no checkable promise. Only one hundred bottles left is scarcity. So readers feel good about the product, and rush to buy before they think too hard.', caption: 'The answer is A. Fresh, natural, yours are glittering generalities, pleasant words with no checkable promise. Only 100 bottles left is scarcity. So readers feel good about the product, and rush to buy before they think too hard.', show: 'q2.answer' },
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
            'Find the **target audience** from images, words and placement.',
            'Techniques: **testimonial**, **scarcity**, **bandwagon**, **glittering generalities**.',
            'Paid promotion should be labelled, for example **#ad**.',
            'Many adverts sell an **identity**, not just a product.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Find the target audience from the images, the words and the placement.', show: 'sum.0' },
        { say: 'Techniques include testimonial, scarcity, bandwagon and glittering generalities.', show: 'sum.1' },
        { say: 'Paid promotion should be labelled, for example with hashtag ad.', show: 'sum.2' },
        { say: 'And many adverts sell an identity, not just a product.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
