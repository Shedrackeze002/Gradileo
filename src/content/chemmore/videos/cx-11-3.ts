import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-11-3',
  lessonId: 'cx-11-3',
  title: 'Reactions of Metal Ions in Aqueous Solution',
  thumbnail: false,
  summary:
    'Metal aqua ions are acidic, and 3+ ions more so than 2+ ions because of their higher charge density. Hydroxide and ammonia give coloured hydroxide precipitates; aluminium hydroxide dissolves in excess hydroxide and copper hydroxide in excess ammonia. 2+ ions give carbonates with sodium carbonate, while 3+ ions give hydroxides and carbon dioxide. Chloride ligands give tetrahedral complexes, and multidentate ligands are favoured by entropy: the chelate effect.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Period 3 and Transition Metals', title: 'Metal Ions in Solution', subtitle: 'Identifying ions by their precipitates' }],
      lines: [
        { say: 'Add a few drops of sodium hydroxide to a solution of an unknown metal ion. A green, blue, brown or white precipitate appears, and its colour tells you which ion is there.', show: 'title' },
        { say: 'In this lesson, you will explain why metal aqua ions are acidic, identify ions from their reactions, and explain the chelate effect.' },
      ],
    },
    {
      chapter: 'Acidic aqua ions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{[Fe(H2O)6]^3+ + H2O <=> [Fe(H2O)5(OH)]^2+ + H3O+}'] }],
      lines: [
        { say: 'In water, metal ions are surrounded by six water ligands. The metal ion pulls electrons from the O H bonds, so a water ligand can lose a hydrogen ion.', caption: 'In water, metal ions are surrounded by six water ligands. The metal ion pulls electrons from the O–H bonds, so a water ligand can lose an H⁺ ion.', show: 'm', focus: 'm' },
        { say: 'A three plus ion has a higher charge density than a two plus ion, so it polarises the water more, and its solution is more acidic.', caption: 'A 3+ ion has a higher charge density than a 2+ ion, so it polarises the water more, and its solution is more acidic.' },
      ],
    },
    {
      chapter: 'Test-tube reactions',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Ion', 'Hydroxide or a little ammonia', 'In excess'], rows: [['$\\ce{Fe^2+}$, green', 'green precipitate', 'no change'], ['$\\ce{Cu^2+}$, blue', 'blue precipitate', 'deep blue solution with ammonia'], ['$\\ce{Fe^3+}$, yellow-brown', 'brown precipitate', 'no change'], ['$\\ce{Al^3+}$, colourless', 'white precipitate', 'dissolves in excess NaOH']] }],
      lines: [
        { say: 'Hydroxide ions, or a little ammonia, remove hydrogen ions from the water ligands, leaving neutral hydroxide precipitates.' },
        { say: 'Iron two gives a green precipitate, and iron three a brown one.', caption: 'Iron(II) gives a green precipitate, and iron(III) a brown one.', show: ['t.0', 't.2'], focus: ['t.0', 't.2'] },
        { say: 'Copper gives a blue precipitate, which dissolves in excess ammonia to form a deep blue solution.', show: 't.1', focus: 't.1' },
        { say: 'Aluminium gives a white precipitate, which dissolves in excess sodium hydroxide, because aluminium hydroxide is amphoteric.', show: 't.3', focus: 't.3' },
        { say: 'With sodium carbonate, the two plus ions give metal carbonates, but the three plus ions are acidic enough to give hydroxides and bubbles of carbon dioxide.', caption: 'With sodium carbonate, the 2+ ions give metal carbonates, but the 3+ ions are acidic enough to give hydroxides and bubbles of carbon dioxide.' },
      ],
    },
    {
      chapter: 'The chelate effect',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{[Cu(H2O)6]^2+ + 3en -> [Cu(en)3]^2+ + 6H2O}', '4 \\text{ particles} \\rightarrow 7 \\text{ particles}'] }],
      lines: [
        { say: 'Ligands can swap. Chloride ions are larger than water, so only four fit, and the complex becomes tetrahedral.' },
        { say: 'When a bidentate ligand replaces water, four particles become seven.', show: 'm.0', focus: 'm.0' },
        { say: 'The bonds broken and made are similar, so delta H is close to zero. But delta S is large and positive, so delta G is negative. This extra stability is the chelate effect.', caption: 'The bonds broken and made are similar, so ΔH is close to zero. But ΔS is large and positive, so ΔG is negative. This extra stability is the chelate effect.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A colourless solution gives a white precipitate with sodium hydroxide, which dissolves in excess. It fizzes with sodium carbonate. Which ion is it?',
          choices: ['$\\ce{Al^3+}$', '$\\ce{Fe^2+}$', '$\\ce{Cu^2+}$', '$\\ce{Fe^3+}$'],
          answer: 0,
          working: 'Colourless, a white precipitate that dissolves in excess hydroxide, and fizzing with carbonate: **aluminium**.',
        },
      ],
      lines: [
        { say: 'Your turn. A colourless solution gives a white precipitate with sodium hydroxide, which dissolves in excess. It fizzes with sodium carbonate. Which ion is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is choice A, the aluminium ion. Its hydroxide is amphoteric, and as a three plus ion it fizzes with carbonate.', caption: 'The answer is choice A, Al³⁺. Its hydroxide is amphoteric, and as a 3+ ion it fizzes with carbonate.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['3+ aqua ions are more acidic than 2+ ions.', 'Precipitate colours identify the metal ion.', '2+ ions give carbonates; 3+ ions give hydroxides and CO₂.', 'Chelate effect: more particles, so ΔS is positive.'] }],
      lines: [
        { say: 'Let’s sum up. Three plus aqua ions are more acidic than two plus ions.', caption: 'Let’s sum up. 3+ aqua ions are more acidic than 2+ ions.', show: 'sum.0' },
        { say: 'The colours of the hydroxide precipitates identify the metal ion.', show: 'sum.1' },
        { say: 'Two plus ions give carbonates, and three plus ions give hydroxides and carbon dioxide.', caption: '2+ ions give carbonates, and 3+ ions give hydroxides and carbon dioxide.', show: 'sum.2' },
        { say: 'And the chelate effect comes from an increase in the number of particles, which makes delta S positive.', caption: 'And the chelate effect comes from an increase in the number of particles, which makes ΔS positive.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
