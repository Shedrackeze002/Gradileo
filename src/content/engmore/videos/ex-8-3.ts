import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-8-3',
  lessonId: 'ex-8-3',
  title: 'Power and Conflict: the Modern Poems',
  thumbnail: false,
  summary:
    'The nine more recent poems of the AQA Power and Conflict cluster, described in our own words because they are still in copyright: poems of nature and war, of soldiers and families after war, and of power, identity and history. Each poem’s first publication is credited in the lesson.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry Anthology: Power and Conflict', title: 'The Modern Poems', subtitle: 'Nine poems, in our own words' }],
      lines: [
        { say: 'Nine poems of the Power and Conflict cluster were written since the nineteen fifties, and they are still in copyright. So this video describes them in our own words, and does not quote them.', caption: 'Nine poems of the Power and Conflict cluster were written since the 1950s, and they are still in copyright. So this video describes them in our own words, and does not quote them.', show: 'title' },
        { say: 'Read the full poems in your anthology as you go.' },
      ],
    },
    {
      chapter: 'Nature and war',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Storm on the Island: Seamus Heaney', 'Bayonet Charge: Ted Hughes'] }],
      lines: [
        { say: 'In Storm on the Island, islanders feel prepared for a storm, but end up admitting that they fear something they cannot even see. Heaney grew up in Northern Ireland, and many readers link the threat to its violence.', show: 'b.0' },
        { say: 'In Bayonet Charge, a soldier in the First World War is suddenly running at the enemy. In the middle of the charge, he forgets why he is fighting at all.', show: 'b.1' },
      ],
    },
    {
      chapter: 'After the fighting',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Remains: Simon Armitage', 'Poppies: Jane Weir', 'War Photographer: Carol Ann Duffy'] }],
      lines: [
        { say: 'In Remains, a soldier casually tells how he helped to shoot a looter. Back home, he sees the dead man whenever he shuts his eyes.', show: 'b.0' },
        { say: 'In Poppies, a mother remembers her son leaving to join the army, and visits a war memorial, full of fear and grief.', show: 'b.1' },
        { say: 'In War Photographer, a photographer develops his pictures of war at home, knowing readers will feel sorry for a moment, then forget.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Power, identity and history',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Tissue: Imtiaz Dharker', 'The Émigrée: Carol Rumens', 'Kamikaze: Beatrice Garland', 'Checking Out Me History: John Agard'] }],
      lines: [
        { say: 'Tissue compares the power of maps and buildings with paper and skin: all of them fragile.', show: 'b.0' },
        { say: 'In The Émigrée, a woman remembers the city she left as a child as full of sunlight, whatever the news says.', show: 'b.1' },
        { say: 'In Kamikaze, a Japanese pilot turns back from his mission, and his family shun him.', show: 'b.2' },
        { say: 'And in Checking Out Me History, a Caribbean speaker rejects the British history he was taught, and finds his own.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which two poems show conflict following someone home as memory?',
          choices: ['Remains and War Photographer', 'Tissue and Storm on the Island', 'Kamikaze and Checking Out Me History', 'Bayonet Charge and The Émigrée'],
          answer: 0,
          working: 'The soldier in “Remains” and the photographer in “War Photographer” are both home, but the memories return.',
        },
      ],
      lines: [
        { say: 'Your turn. Which two poems show conflict following someone home, as memory? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is choice A. The soldier in Remains and the photographer in War Photographer are both safe at home, but the memories will not leave them.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Nature and war: Heaney, Hughes.', 'After the fighting: Armitage, Weir, Duffy.', 'Power and identity: Dharker, Rumens, Garland, Agard.'] }],
      lines: [
        { say: 'Let’s sum up. Heaney and Hughes write about nature and war.', show: 'sum.0' },
        { say: 'Armitage, Weir and Duffy show what war does to people after the fighting.', show: 'sum.1' },
        { say: 'And Dharker, Rumens, Garland and Agard explore power, identity and history.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
