import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c8-3-2',
  lessonId: 'c8-3-2',
  title: 'Signs of a Chemical Reaction',
  thumbnail: 'signs',
  summary:
    'Signs of a reaction are a gas, a colour change, a precipitate, a temperature change, light or a new smell. A sign counts only if a new substance has been made, so the bubbles in boiling water do not count. Reactants are the starting substances, and products are the new substances made.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Physical and Chemical Changes', title: 'Signs of a Chemical Reaction', subtitle: 'Clues that new substances are forming' }],
      lines: [
        { say: 'You cannot see atoms rearranging, so how can you tell that a reaction has happened?', show: 'title' },
        { say: 'Chemists look for clues. In this video, you will learn the signs of a reaction, and the names for what goes into a reaction and what comes out.' },
      ],
    },
    {
      chapter: 'Signs of a reaction',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'signs',
          items: [
            'a **gas** is given off: fizzing or bubbles',
            'a **colour change**',
            'a **precipitate**: a solid forms when two solutions mix',
            'a **temperature change**, or **light**',
            'a new **smell**',
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Bubbles are not always a reaction', md: 'Boiling water bubbles, but the bubbles are just steam: a physical change.' },
      ],
      lines: [
        { say: 'A chemical reaction makes new substances, and these signs show that one may have happened.', show: 'signs' },
        { say: 'A gas may be given off, so you see fizzing or bubbles.', show: 'signs.0', focus: 'signs.0' },
        { say: 'There may be a colour change.', show: 'signs.1', focus: 'signs.1' },
        { say: 'When two solutions are mixed, a solid may appear. A solid that forms like this is called a precipitate.', show: 'signs.2', focus: 'signs.2' },
        { say: 'The mixture may get hotter or colder by itself, or give out light. And there may be a new smell.', show: ['signs.3', 'signs.4'], focus: 'signs.3' },
        { say: 'But a sign only counts if a new substance could be causing it. Water boiling in a pan bubbles, but the bubbles are just steam, water as a gas. That is a physical change.', show: 'oops' },
      ],
    },
    {
      chapter: 'Reactants and products',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'rp',
          head: ['Reactants', 'Products'],
          rows: [
            ['magnesium, oxygen', 'magnesium oxide'],
            ['zinc, hydrochloric acid', 'zinc chloride, hydrogen'],
          ],
        },
      ],
      lines: [
        { say: 'The reactants are the substances you start with. The products are the new substances made in the reaction.', show: 'rp' },
        { say: 'When magnesium ribbon burns in air, it gives a dazzling white light. The reactants are magnesium and oxygen from the air, and the product is a white powder, magnesium oxide.', show: 'rp.0', focus: 'rp.0' },
        { say: 'When zinc is dropped into hydrochloric acid, it fizzes. The reactants are zinc and the acid, and the products are zinc chloride and hydrogen gas, which makes the fizz.', show: 'rp.1', focus: 'rp.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Limestone, calcium carbonate, is heated and breaks down into calcium oxide and carbon dioxide. What is the reactant?',
          choices: ['calcium oxide', 'carbon dioxide', 'calcium carbonate', 'calcium oxide and carbon dioxide'],
          answer: 2,
          working: 'The reaction starts with calcium carbonate alone. Calcium oxide and carbon dioxide are the products.',
        },
      ],
      lines: [
        { say: 'Your turn. Limestone, which is calcium carbonate, is heated strongly and breaks down into calcium oxide and carbon dioxide. What is the reactant? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The reaction starts with calcium carbonate alone, so that is the only reactant. Calcium oxide and carbon dioxide are the products.', show: 'q.answer' },
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
            'Signs: gas, colour change, precipitate, temperature change, light, smell.',
            'A sign counts only if a new substance is made.',
            '**Reactants** are the starting substances.',
            '**Products** are the new substances made.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The signs of a reaction are a gas, a colour change, a precipitate, a temperature change, light, or a new smell.', show: 'sum.0' },
        { say: 'A sign only counts if a new substance has been made.', show: 'sum.1' },
        { say: 'The reactants are the substances you start with.', show: 'sum.2' },
        { say: 'And the products are the new substances made. Next, you will write reactions as word equations.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
