import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-8-2',
  lessonId: 'cx-8-2',
  title: 'Group 2, the Alkaline Earth Metals',
  thumbnail: false,
  summary:
    'Down Group 2 the atoms get larger, ionisation energy falls and reactivity rises. The metals react with water to give hydroxides and hydrogen; magnesium burns in steam to give its oxide. Hydroxides get more soluble down the group and sulfates less soluble. Group 2 compounds are antacids, treat acid soil, clean flue gases and make barium meals, and acidified barium chloride tests for sulfate ions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Inorganic Chemistry', title: 'Group 2', subtitle: 'The alkaline earth metals' }],
      lines: [
        { say: 'An indigestion tablet, the lime a farmer spreads on a field, and the white drink a patient swallows before an X-ray all come from Group two.', caption: 'An indigestion tablet, the lime a farmer spreads on a field, and the white drink a patient swallows before an X-ray all come from Group 2.', show: 'title' },
        { say: 'In this lesson, you will explain the trends down Group two, and link its compounds to their uses.', caption: 'In this lesson, you will explain the trends down Group 2, and link its compounds to their uses.' },
      ],
    },
    {
      chapter: 'Trends and reactions',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Down the group: larger atoms, lower ionisation energy, more reactive', 'All form $\\ce{M^2+}$ ions'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{M + 2H2O -> M(OH)2 + H2}', '\\ce{Mg + H2O(g) -> MgO + H2}'] },
      ],
      lines: [
        { say: 'Each atom has two outer electrons, which it loses to form a two plus ion.', caption: 'Each atom has two outer electrons, which it loses to form a 2+ ion.', show: 'b.1' },
        { say: 'Going down the group, there is an extra shell each time. So the atoms get larger, the ionisation energy falls, and the metals get more reactive.', show: 'b.0' },
        { say: 'With water they give a hydroxide and hydrogen, more vigorously down the group.', show: 'm.0', focus: 'm.0' },
        { say: 'Magnesium barely reacts with cold water, but it burns in steam with a bright white light, giving magnesium oxide.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Solubility and uses',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Compound', 'Down the group', 'Use'], rows: [['Hydroxides', 'more soluble', '$\\ce{Mg(OH)2}$ antacid; $\\ce{Ca(OH)2}$ for acid soil'], ['Sulfates', 'less soluble', '$\\ce{BaSO4}$ barium meal for X-rays']] },
      ],
      lines: [
        { say: 'The hydroxides get more soluble down the group. Magnesium hydroxide is only slightly soluble, and is used as an antacid. Calcium hydroxide neutralises acid soil.', show: 't.0', focus: 't.0' },
        { say: 'The sulfates go the other way, and get less soluble. Barium sulfate is insoluble, so it can be swallowed safely for an X-ray of the gut, even though barium ions are toxic.', show: 't.1', focus: 't.1' },
        { say: 'Calcium oxide and calcium carbonate also remove sulfur dioxide from power station waste gases.' },
      ],
    },
    {
      chapter: 'The sulfate test',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Ba^2+(aq) + SO4^2-(aq) -> BaSO4(s)}'] }],
      lines: [
        { say: 'To test for sulfate ions, add acidified barium chloride. A white precipitate of barium sulfate shows sulfate is there.', show: 'm' },
        { say: 'The acid goes in first to remove carbonate ions, which would also give a white precipitate.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which Group 2 compound is the least soluble in water?',
          choices: ['Magnesium sulfate', 'Barium hydroxide', 'Calcium hydroxide', 'Barium sulfate'],
          answer: 3,
          working: 'Sulfates get **less** soluble down the group, so barium sulfate is insoluble. Hydroxides go the other way.',
        },
      ],
      lines: [
        { say: 'Your turn. Which Group two compound is the least soluble in water? Pause the video and try it.', caption: 'Your turn. Which Group 2 compound is the least soluble in water? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, barium sulfate. Sulfates get less soluble down the group, and barium is at the bottom.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Down Group 2: larger, lower ionisation energy, more reactive.', 'Metal + water gives a hydroxide and hydrogen.', 'Hydroxides more soluble, sulfates less soluble down the group.', 'Acidified barium chloride: white precipitate with sulfate.'] }],
      lines: [
        { say: 'Let’s sum up. Down Group two, the atoms get larger, the ionisation energy falls, and the metals get more reactive.', caption: 'Let’s sum up. Down Group 2, the atoms get larger, the ionisation energy falls, and the metals get more reactive.', show: 'sum.0' },
        { say: 'With water, they give a hydroxide and hydrogen.', show: 'sum.1' },
        { say: 'Hydroxides get more soluble down the group, and sulfates get less soluble.', show: 'sum.2' },
        { say: 'And acidified barium chloride gives a white precipitate with sulfate ions.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
