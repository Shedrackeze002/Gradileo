import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm303-9-1-f',
  lessonId: 'm303-9-1',
  title: 'Logic Puzzles and Games, Part 6: Crossing Puzzles',
  thumbnailTitle: 'Crossing Puzzles',
  thumbnail: false,
  summary: 'In a river-crossing puzzle, keep track of who is on each side after every trip, and remember that someone has to bring the boat back. Two children and one adult share a boat that holds two children or one adult: both children cross, one comes back, the adult crosses, the other child comes back, and both children cross again, five crossings. Every crossing but the last needs a trip back, so the number of crossings is always odd, and each extra adult adds four.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Logic Puzzles and Games · Part 6', title: 'Crossing Puzzles', subtitle: 'Someone has to bring the boat back' }],
      lines: [
        { say: 'Getting everyone across a river with one small boat sounds easy, until you remember that someone has to bring the boat back each time.', show: 'title' },
        { say: 'In this video, you will solve a river-crossing puzzle by keeping track of who is on each side after every trip, and find a pattern you can use again.' },
      ],
    },
    {
      chapter: 'The puzzle',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'lg', md: 'Two children and one adult must cross a river in a small boat. The boat can carry **two children**, or **one adult**, but never an adult with a child. How do all three get across?' },
        { kind: 'text', id: 't', size: 'md', md: 'Anyone can row, and the boat cannot cross on its own.' },
      ],
      lines: [
        { say: 'Two children and one adult must cross a river in a small boat. The boat can carry two children, or one adult, but it is too small for an adult with a child. How do all three get across?', show: 'p' },
        { say: 'Anyone can row the boat, but it cannot cross on its own. So every trip needs someone in it.', show: 't' },
        { say: 'Try it yourself before you watch the answer. Notice the problem: if the adult crosses first, the adult has to row straight back, and nothing has changed.' },
      ],
    },
    {
      chapter: 'Keeping track',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Trip', 'In the boat', 'Start side', 'Far side'],
          rows: [
            ['Start', '', 'adult, child 1, child 2', ''],
            ['1', 'both children cross', 'adult', 'child 1, child 2'],
            ['2', 'child 1 rows back', 'adult, child 1', 'child 2'],
            ['3', 'the adult crosses', 'child 1', 'adult, child 2'],
            ['4', 'child 2 rows back', 'child 1, child 2', 'adult'],
            ['5', 'both children cross', '', 'adult, child 1, child 2'],
          ],
        },
      ],
      lines: [
        { say: 'Keep a table of who is on each side after every trip. At the start, everyone is on the start side.', show: 't.0', focus: 't.0' },
        { say: 'Trip one: both children cross together. The adult waits on the start side.', show: 't.1', focus: 't.1' },
        { say: 'Trip two: someone has to bring the boat back. Child one rows back alone, and child two stays on the far side.', show: 't.2', focus: 't.2' },
        { say: 'Trip three: now the adult crosses alone. The far side has the adult and child two.', show: 't.3', focus: 't.3' },
        { say: 'Trip four: child two, who was waiting on the far side, rows the boat back.', show: 't.4', focus: 't.4' },
        { say: 'Trip five: both children cross together. Everyone is across, in five crossings.', show: 't.5', focus: 't.5' },
      ],
    },
    {
      chapter: 'The pattern',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Moving one heavy person', md: 'Both light people cross, one comes back, the heavy person crosses, and the other light person comes back. That is **four crossings**, and the light people end where they started.' },
      ],
      lines: [
        { say: 'Look at the first four trips. Both children cross, one comes back, the adult crosses, and the other child comes back.', show: 'key' },
        { say: 'After those four crossings, the adult is across, and the two children are back on the start side with the boat, just as they began. This pattern moves one heavy person across, whenever two light people must share a small boat with them.' },
        { say: 'So with more adults, repeat the pattern four crossings for each adult, then the two children cross together at the end.' },
      ],
    },
    {
      chapter: 'Count the trips back',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The number of crossings is always odd', md: 'After every crossing except the last, the boat must come back. So the crossings pair up, there and back, with one more at the end: the total is always **odd**.' },
      ],
      lines: [
        { say: 'Here is a useful check. After every crossing except the last one, the boat has to come back, so someone must row it.', show: 'tip' },
        { say: 'So the crossings pair up, there and back, with one more crossing at the end. That means the number of crossings is always odd: five here, never four or six.' },
        { say: 'Before you send anyone across, plan who will row the boat back.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two adults and two children must cross a river. The boat carries two children or one adult, never an adult with a child. What is the fewest number of crossings that gets everyone across?',
          choices: ['$5$', '$7$', '$8$', '$9$'],
          answer: 3,
          working: 'Each adult takes the four-crossing pattern (both children over, one back, the adult over, the other child back): $4 + 4 = 8$. Then the two children cross together: $8 + 1 = 9$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two adults and two children must cross a river. The boat carries two children or one adult, never an adult with a child. What is the fewest number of crossings that gets everyone across? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, nine. Each adult needs the four-crossing pattern, which makes eight, and then the two children cross together, for nine. Choice C, eight, is even, and the number of crossings is always odd: after eight, the boat and both children are back on the start side.', show: 'q.answer' },
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
          items: ['Keep track of who is on each side after every trip.', 'To move one heavy person: both light people cross, one comes back, the heavy person crosses, the other comes back.', 'Every crossing but the last needs a trip back, so the total is odd.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a crossing puzzle, keep track of who is on each side after every trip.', show: 'sum.0' },
        { say: 'To move one heavy person with two light ones: both light people cross, one comes back, the heavy person crosses, and the other comes back.', show: 'sum.1' },
        { say: 'And every crossing but the last needs a trip back, so the number of crossings is always odd. In part seven, we find the winning move in a take-away game. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
