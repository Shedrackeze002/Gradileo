import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-2-4',
  lessonId: 'm302-2-4',
  title: 'Combinations, Part 1: Does Order Matter?',
  thumbnailTitle: 'Does Order Matter?',
  summary: 'Deciding whether a counting problem is a permutation (order matters) or a combination (order does not), with six everyday situations and the swap test: swap two of the chosen items and see whether the result changes. Part 2 counts combinations.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 1', title: 'Does Order Matter?', subtitle: 'Permutations and combinations' }],
      lines: [
        { say: 'If you invite two friends to a concert, inviting Ava and Kwame is the same as inviting Kwame and Ava. But electing Ava as president and Kwame as treasurer is not the same as the other way around.', show: 'title' },
        { say: 'When the order of a choice does not matter, you are counting combinations. In this video, you will decide whether order matters in a counting problem, using a quick test called the swap test.' },
      ],
    },
    {
      chapter: 'Permutation or combination?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Situation', 'Order matters?', 'Type'],
          rows: [
            ['Electing a president and a treasurer', 'yes: different jobs', 'permutation'],
            ['Choosing 3 toppings for a pizza', 'no: same pizza', 'combination'],
            ['Awarding gold, silver and bronze', 'yes: different medals', 'permutation'],
            ['Choosing 5 players for a tournament', 'no: same group', 'combination'],
            ['Setting a 4-digit PIN', 'yes: 1234 is not 4321', 'permutation'],
            ['Being dealt a hand of cards', 'no: same hand', 'combination'],
          ],
        },
      ],
      lines: [
        { say: 'Before you count, decide whether a different order gives a different result. If it does, you are counting permutations. If it does not, you are counting combinations.' },
        { say: 'Electing a president and a treasurer: the jobs are different, so the order of the two people matters. That is a permutation.', show: 't.0', focus: 't.0' },
        { say: 'Choosing three toppings for a pizza: mushrooms, peppers and onions make the same pizza in any order. That is a combination.', show: 't.1', focus: 't.1' },
        { say: 'Awarding gold, silver and bronze: the medals are different, so order matters. A permutation.', show: 't.2', focus: 't.2' },
        { say: 'Choosing five players for a tournament: the same five players make the same group, in any order. A combination.', show: 't.3', focus: 't.3' },
        { say: 'Setting a four-digit PIN: one, two, three, four is not the same PIN as four, three, two, one. A permutation.', show: 't.4', focus: 't.4' },
        { say: 'And being dealt a hand of cards: the same cards make the same hand, whatever order they arrived in. A combination.', show: 't.5', focus: 't.5' },
      ],
    },
    {
      chapter: 'The swap test',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The swap test', md: 'Swap two of the items you chose. If the result changes (a different job, place or position), order matters and it is a permutation. If not, it is a combination.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{president Ava, treasurer Kwame}', '\\ne\\ \\text{president Kwame, treasurer Ava}', '\\{\\text{Ava, Kwame}\\} = \\{\\text{Kwame, Ava}\\}'] },
      ],
      lines: [
        { say: 'Here is a quick way to decide: the swap test. Swap two of the items you chose, and ask whether the result changes.', show: 'tip' },
        { say: 'Swap Ava and Kwame in the election. Now Kwame is president and Ava is treasurer: a different result. So order matters, and it is a permutation.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Swap them in the concert invitation. The same two friends are invited: nothing changes. So order does not matter, and it is a combination.', show: 'm.2', focus: 'm.2' },
        { say: 'A clue to look for: different jobs, places or positions usually mean that order matters. A group, a team, a hand or a selection usually means that it does not.' },
      ],
    },
    {
      chapter: 'More examples',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Situation', 'Swap two: does it change?', 'Type'],
          rows: [
            ['Seating 4 guests in a row of chairs', 'yes: different seats', 'permutation'],
            ['Picking 2 of 10 books to borrow', 'no: same books', 'combination'],
            ['Ranking your top 3 songs', 'yes: different ranks', 'permutation'],
          ],
        },
      ],
      lines: [
        { say: 'Try the swap test on a few more.', show: 't' },
        { say: 'Seating four guests in a row of chairs: swap two guests, and they are in different seats. A permutation.', focus: 't.0' },
        { say: 'Picking two of ten books to borrow from a library: swap them, and you still borrow the same two books. A combination.', focus: 't.1' },
        { say: 'Ranking your top three songs: swap your first and second choices, and the ranking changes. A permutation.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Trusting the word “choose”', md: 'The words *choose* and *select* appear in both kinds of problem. “Choose a captain and an assistant captain” is a permutation, because the two roles are different. Use the swap test, not the wording.' },
      ],
      lines: [
        { say: 'A common mistake is to decide from a single word. Choose and select sound like combinations, but they appear in both kinds of problem.', show: 'oops' },
        { say: 'Choose a captain and an assistant captain from a team: swap the two people, and the roles change. So that is a permutation, even though it says choose.' },
        { say: 'So do not trust the wording. Use the swap test.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which situation is a combination?',
          choices: ['Ranking your top 3 movies', 'Picking 3 people for a committee', 'Setting a 3-digit lock code', 'Choosing a captain and an assistant captain'],
          answer: 1,
          working: 'Swapping two committee members gives the same committee, so order does not matter. Swapping in the other three changes the result.',
        },
      ],
      lines: [
        { say: 'Your turn. Which situation is a combination? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Swap two committee members, and you still have the same committee, so order does not matter. Choice D is a permutation: swapping the captain and the assistant captain gives a different result.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Order matters: a permutation. Order does not matter: a combination.', 'Swap test: swap two chosen items; if the result changes, order matters.', 'Different jobs, places or positions mean that order matters.'] }],
      lines: [
        { say: 'Let’s sum up. When order matters, you are counting permutations. When it does not, you are counting combinations.', show: 'sum.0' },
        { say: 'Use the swap test: swap two of the chosen items, and if the result changes, order matters.', show: 'sum.1' },
        { say: 'Different jobs, places or positions mean that order matters. In part two, we count combinations, and see why there are fewer of them than permutations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
