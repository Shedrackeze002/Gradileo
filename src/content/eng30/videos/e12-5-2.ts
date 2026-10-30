import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-5-2',
  lessonId: 'e12-5-2',
  title: 'Representation and Power',
  thumbnailTitle: 'Representation and Power',
  thumbnail: false,
  summary:
    'The stories a society repeats about a group shape how others treat that group. Learn voice, the gaze, framing, stereotype, tokenism and counter-narrative, and match each problem to a fairer approach.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Media and Culture', title: 'Representation and Power', subtitle: 'Who tells the story?' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['The assertion has been substantiated throughout these pages that the press contains unreliable and doctored reports of lynchings, and one of the most necessary things for the race to do is to get these facts before the public.'],
          by: 'Ida B. Wells, *Southern Horrors* (1892)',
        },
      ],
      lines: [
        { say: 'In the eighteen nineties, Ida B. Wells checked newspaper reports one by one, and found that many of the accusations in them were false.', show: ['title', 'q'] },
        { say: 'Wells saw that the power to tell a story about a group of people is a kind of power over them. In this lesson, you will ask who gets to tell the story, through whose eyes we see it, and how a group can take its own story back.' },
      ],
    },
    {
      chapter: 'Voice and the gaze',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Voice**: who speaks for themselves, and who is only spoken *about*',
            '**The gaze**: whose point of view the camera or narration takes',
            '**Example**: villagers called “charming” and “untouched by time”',
          ],
        },
      ],
      lines: [
        { say: 'Voice is the question of who is allowed to speak for themselves, and who is only spoken about. A group that appears in a story but never speaks has no voice in it.', show: 'b.0', focus: 'b.0' },
        { say: 'The gaze is the point of view that the camera or the narration takes. Ask who looks, and who is looked at.', show: 'b.1', focus: 'b.1' },
        { say: 'Picture a travel documentary that follows a visiting presenter through a village, calling the people charming and untouched by time. The villagers may be on screen in every scene, yet the film tells us more about the visitor’s expectations than about their lives.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Frames, stereotypes and tokens',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Framing**: showing a group again and again in one narrow role',
            '**Stereotype**: a fixed, simplified picture of everyone in the group',
            '**Tokenism**: one member included just for show',
          ],
        },
      ],
      lines: [
        { say: 'Framing is the choice of what to emphasize when a group appears. Repeated often enough, a narrow frame becomes a stereotype.', show: ['b.0', 'b.1'] },
        { say: 'One news story about a teenager who caused an accident is simply news. But a year in which teenagers appear almost only in stories about accidents, crime and noise is a frame.', focus: 'b.0' },
        { say: 'Tokenism is different. It means including one member of a group just to appear fair, without giving the group any real place or power.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Counter-narratives',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Counter-narrative', md: 'A story told by a group about itself, which challenges the dominant story that others have told about it.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['the only ones which will print the truth'], by: 'Ida B. Wells, *Southern Horrors* (1892)' },
      ],
      lines: [
        { say: 'A counter-narrative is a story told by a group about itself, which challenges the dominant story that others have told.', show: 'def' },
        { say: 'Southern Horrors is one. Wells gathered the facts that major papers had ignored, and she called on Black readers to support their own newspapers, which were, in her words, this.', show: 'q' },
             ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Voice**: the group is missing, or appears without speaking.', '**Tokenism**: one member is present, but only for show.'],
        },
      ],
      lines: [
        { say: 'Here is a common mistake: confusing tokenism with voice. Both concern who is included.', show: 'b' },
        { say: 'If a group is missing, or appears without speaking, the problem is voice. If one member is present but only for show, the problem is tokenism. Match the fix to the problem.', focus: 'b' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A film shows a refugee family in every scene, but only a volunteer narrates. What is the fairest fix?',
          choices: [
            'Add one family member, briefly, so the film looks fairer.',
            'Show the family in more roles, such as shopping and school.',
            'Add more volunteers, so more people can describe the family.',
            'Let the family tell their own story, in their own words.',
          ],
          answer: 3,
          working: 'The family has no voice, and the film takes an outsider’s gaze. Letting them tell their own story addresses both, and moves the film towards a counter-narrative.',
        },
      ],
      lines: [
        { say: 'Your turn. A film shows a refugee family in every scene, but only a volunteer narrates. What is the fairest fix? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The family has no voice, and the film takes an outsider’s gaze. Letting them tell their own story fixes both.', show: 'q2.answer' },
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
            'Voice is who speaks; the gaze is whose eyes we share.',
            'Narrow framing makes stereotypes; tokenism is inclusion for show.',
            'A counter-narrative is a group’s own story.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Voice is who speaks for themselves, and the gaze is whose eyes we see through.', show: 'sum.0' },
        { say: 'Narrow framing makes stereotypes, and tokenism is inclusion for show.', show: 'sum.1' },
        { say: 'And a counter-narrative is a group’s own story, challenging the dominant one.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
