import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-1-3',
  lessonId: 'cx-1-3',
  title: 'Making Soluble Salts',
  thumbnail: false,
  summary:
    'A salt is named from its metal and its acid: hydrochloric acid makes chlorides, sulfuric acid sulfates and nitric acid nitrates. To make pure, dry crystals from an insoluble base, warm the acid, add the solid in excess, filter, evaporate some of the water and leave the solution to cool.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Metals and Their Reactions', title: 'Making Soluble Salts', subtitle: 'Pure, dry crystals' }],
      lines: [
        { say: 'The blue crystals of copper two sulfate, and the Epsom salts in a bath, are both salts. A chemist who wants one does not dig it up. They choose two substances that react to make exactly that salt.', caption: 'The blue crystals of copper(II) sulfate, and the Epsom salts in a bath, are both salts. A chemist who wants one does not dig it up. They choose two substances that react to make exactly that salt.', show: 'title' },
        { say: 'In this lesson, you will choose the reactants for a named salt, and follow the method that gives pure, dry crystals.' },
      ],
    },
    {
      chapter: 'Naming a salt',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Salt', md: 'An ionic compound made when the **hydrogen of an acid is replaced by a metal**. The first part of its name comes from the metal, and the second from the acid.' },
        { kind: 'table', id: 't', head: ['Acid', 'Formula', 'Salts it makes'], rows: [['Hydrochloric acid', '$\\ce{HCl}$', 'chlorides'], ['Sulfuric acid', '$\\ce{H2SO4}$', 'sulfates'], ['Nitric acid', '$\\ce{HNO3}$', 'nitrates']] },
      ],
      lines: [
        { say: 'A salt is an ionic compound made when the hydrogen of an acid is replaced by a metal. The first part of its name comes from the metal, and the second part from the acid.', show: 'def' },
        { say: 'Hydrochloric acid makes chlorides, sulfuric acid makes sulfates, and nitric acid makes nitrates.', show: 't', focus: 't' },
        { say: 'So for magnesium nitrate, nitrate tells you the acid is nitric acid, and magnesium must come from the other reactant.' },
      ],
    },
    {
      chapter: 'Four ways to make a salt',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'metal + acid → salt + **hydrogen**',
            'metal oxide + acid → salt + **water**',
            'metal hydroxide + acid → salt + **water**',
            'metal carbonate + acid → salt + **water + carbon dioxide**',
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Not every metal reacts with a dilute acid', md: 'Copper is below hydrogen in the reactivity series. To make copper(II) sulfate, use copper(II) **oxide** or **carbonate** instead.' },
      ],
      lines: [
        { say: 'Four kinds of substance react with an acid to make a salt. A metal gives the salt and hydrogen.', show: 'b.0', focus: 'b.0' },
        { say: 'A metal oxide or a metal hydroxide gives the salt and water. A metal carbonate gives the salt, water and carbon dioxide.', show: ['b.1', 'b.2', 'b.3'], focus: ['b.1', 'b.2', 'b.3'] },
        { say: 'But not every metal reacts with a dilute acid. Copper is below hydrogen in the reactivity series, so to make copper two sulfate, you use copper two oxide or copper two carbonate instead.', caption: 'But not every metal reacts with a dilute acid. Copper is below hydrogen in the reactivity series, so to make copper(II) sulfate, you use copper(II) oxide or copper(II) carbonate instead.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The balanced equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{ZnO + HCl -> ZnCl2 + H2O}', '\\ce{ZnO + 2HCl -> ZnCl2 + H2O}'] }],
      lines: [
        { say: 'Take zinc oxide and hydrochloric acid. A zinc ion has a charge of two plus, and a chloride ion one minus, so the salt, zinc chloride, has two chlorides for each zinc.', caption: 'Take zinc oxide and hydrochloric acid. A zinc ion is 2+, and a chloride ion 1−, so the salt is ZnCl₂.', show: 'm.0' },
        { say: 'That leaves two chlorines and two hydrogens on the right, but one of each on the left. Put a two in front of the acid, and the equation balances.', caption: 'That leaves two Cl and two H on the right, but one of each on the left. Put a 2 in front of HCl: ZnO + 2HCl → ZnCl₂ + H₂O.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Making the crystals',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Warm** the acid gently.',
            'Add the solid until some is left over: it is **in excess**.',
            '**Filter** off the spare solid.',
            '**Evaporate** until crystals just start to form.',
            'Leave to **cool**, then pat the crystals dry.',
          ],
        },
        { kind: 'callout', id: 'ex', tone: 'definition', title: 'Excess', md: 'A reactant is **in excess** when there is more of it than the reaction can use.' },
      ],
      lines: [
        { say: 'Here is the method for copper two sulfate, from copper two oxide and dilute sulfuric acid. First, warm the acid gently, so the reaction goes faster.', caption: 'Here is the method for copper(II) sulfate, from copper(II) oxide and dilute sulfuric acid. First, warm the acid gently, so the reaction goes faster.', show: 'b.0' },
        { say: 'Add the solid a little at a time, stirring, until some is left over. The solid is now in excess: there is more of it than the reaction can use, so all of the acid has reacted.', show: ['b.1', 'ex'], focus: ['b.1', 'ex'] },
        { say: 'Filter. The spare solid stays in the filter paper, and the salt solution passes through.', show: 'b.2', focus: 'b.2' },
        { say: 'Heat the solution in an evaporating basin until crystals just start to form. Then leave it to cool, so crystals grow slowly, and pat them dry between filter papers.', show: ['b.3', 'b.4'], focus: ['b.3', 'b.4'] },
        { say: 'Do not boil the solution dry. That gives a powder, not crystals, and the hot solid may spit out of the basin.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A student stops adding copper(II) oxide while the liquid is still acidic. What is wrong with the crystals?',
          choices: ['They contain unreacted copper(II) oxide', 'They are contaminated with sulfuric acid', 'They will be too large', 'Nothing: they are pure'],
          answer: 1,
          working: 'With no excess of solid, some acid is left. It is dissolved, so it passes through the filter paper with the salt.',
        },
      ],
      lines: [
        { say: 'Your turn. A student stops adding copper two oxide while the liquid is still acidic. What is wrong with the crystals? Pause the video and try it.', caption: 'Your turn. A student stops adding copper(II) oxide while the liquid is still acidic. What is wrong with the crystals? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. With no excess of solid, some acid is left. The acid is dissolved, so it passes through the filter paper with the salt and contaminates the crystals.', show: 'q.answer' },
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
            'A salt’s name comes from the metal and the acid.',
            'Acids make salts with metals, metal oxides, hydroxides and carbonates.',
            'Add the insoluble solid in excess, so that all the acid is used up.',
            'Filter, evaporate some water, then cool to crystallise.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A salt’s name comes from the metal and the acid.', show: 'sum.0' },
        { say: 'Acids make salts with metals, metal oxides, hydroxides and carbonates.', show: 'sum.1' },
        { say: 'Add the insoluble solid in excess, so that all the acid is used up.', show: 'sum.2' },
        { say: 'Then filter off the spare solid, evaporate some of the water, and cool the solution slowly to grow crystals.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
