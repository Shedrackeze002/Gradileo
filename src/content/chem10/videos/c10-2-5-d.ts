import type { Explainer } from '@/video/script.ts';
import { atomShells } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';

// Helium (2), neon (2,8) and argon (2,8,8): full outer shells.
const noble = figure(
  'ng',
  [
    atomShells({ name: 'he', at: [0, 0], nucleus: '\\text{He}', shells: [2], r: 0.9, gap: 0.9 }),
    atomShells({ name: 'ne', at: [5.6, 0], nucleus: '\\text{Ne}', shells: [2, 8], r: 0.9, gap: 0.9 }),
    atomShells({ name: 'ar', at: [13, 0], nucleus: '\\text{Ar}', shells: [2, 8, 8], r: 0.9, gap: 0.9 }),
  ],
  320,
);

const video: Explainer = {
  id: 'c10-2-5-d',
  lessonId: 'c10-2-5',
  title: 'Families of Elements, Part 4: Displacement and the Noble Gases',
  thumbnailTitle: 'Displacement and the Noble Gases',
  thumbnail: 'ng',
  summary:
    'A more reactive halogen displaces a less reactive one from a solution of its halide: chlorine displaces bromide and iodide (Cl₂ + 2KBr → 2KCl + Br₂), bromine displaces only iodide, and iodine displaces neither. The noble gases of group 18 have full outer shells, so they hardly react, which makes helium, argon and neon useful in balloons, light bulbs, welding and signs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 4', title: 'Displacement and the Noble Gases', subtitle: 'Using the order of reactivity' }],
      lines: [
        { say: 'Add chlorine water to a colourless solution of potassium bromide, and it turns orange. Add iodine solution instead, and nothing happens.', show: 'title' },
        { say: 'In this part, you will use the order of reactivity of the halogens to predict these reactions, and meet the least reactive family of all: the noble gases.' },
      ],
    },
    {
      chapter: 'Displacement reactions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Displacement reaction', md: 'A more reactive halogen takes the electron from the halide ion of a less reactive halogen, and pushes it out of the compound.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{chlorine} + \\text{potassium bromide} \\rightarrow', '\\text{potassium chloride} + \\text{bromine}', '\\ce{Cl2 + 2KBr -> 2KCl + Br2}'] },
      ],
      lines: [
        { say: 'A halogen dissolved in water can react with a solution of a halide: a compound containing a halide ion, such as chloride, bromide or iodide.' },
        { say: 'A more reactive halogen takes the electron from the halide ion of a less reactive halogen, and pushes it out of the compound. This is a displacement reaction.', show: 'def' },
        { say: 'Chlorine and potassium bromide react to form potassium chloride and bromine, so the mixture turns orange.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'In symbols: C L two, plus two K B R, gives two K C L, plus B R two.', caption: 'In symbols: Cl₂ + 2KBr → 2KCl + Br₂.', show: 'm.2', focus: 'm.2' },
        { say: 'A less reactive halogen cannot displace a more reactive one. Iodine added to potassium bromide leaves it unchanged.' },
      ],
    },
    {
      chapter: 'Predicting displacement',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Added to…', 'potassium chloride', 'potassium bromide', 'potassium iodide'],
          rows: [
            ['chlorine water', '—', 'reacts: turns orange', 'reacts: turns brown'],
            ['bromine water', 'no reaction', '—', 'reacts: turns brown'],
            ['iodine solution', 'no reaction', 'no reaction', '—'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Br2 + 2NaI -> 2NaBr + I2}'] },
      ],
      lines: [
        { say: 'Here is the pattern. Chlorine displaces bromide and iodide, so the solutions turn orange and brown as bromine and iodine form.', show: 't.0', focus: 't.0' },
        { say: 'Bromine displaces only iodide. And iodine displaces neither.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Fluorine is left out of these tests, because it is so reactive that it reacts with the water itself.', focus: 't' },
        { say: 'Bromine water is added to sodium iodide solution. Bromine is above iodine, so it is more reactive, and it displaces the iodide. Sodium bromide and iodine form, and the solution turns brown.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The noble gases',
      layout: 'center',
      main: [
        noble,
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Helium**: balloons and airships; less dense than air, and it cannot burn', '**Argon**: light bulbs and welding, so hot metal cannot react with oxygen', '**Neon**: glows red-orange in advertising signs'],
        },
      ],
      lines: [
        { say: 'The noble gases in group eighteen have full outer shells: two electrons for helium, and eight for the others.', show: ['ng.he-nucleus', 'ng.he-shell-1', 'ng.ne-nucleus', 'ng.ne-shell-1', 'ng.ne-shell-2', 'ng.ar-nucleus', 'ng.ar-shell-1', 'ng.ar-shell-2', 'ng.ar-shell-3'] },
        { say: 'A full outer shell is very stable, so they hardly gain, lose or share electrons. They are colourless gases of single atoms, and they hardly react at all.', focus: ['ng.he-shell-1', 'ng.ne-shell-2', 'ng.ar-shell-3'] },
        { say: 'That makes them useful. Helium fills balloons and airships: it is much less dense than air, and unlike hydrogen it cannot burn.', show: 'b.0', focus: 'b.0' },
        { say: 'Argon fills some light bulbs and surrounds the metal in welding, so the hot metal cannot react with oxygen. And neon glows red-orange in advertising signs.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
        { say: 'Their boiling points rise down the group, from helium, the lowest of any element.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Iodine solution is added to a colourless solution of potassium chloride. Does a reaction happen? (In group $17$, from the top down: fluorine, chlorine, bromine, iodine.)',
          choices: [
            'Yes: iodine displaces the chloride ions, and chlorine forms.',
            'No: iodine is less reactive than chlorine, so it cannot displace the chloride ions.',
            'Yes: chlorine is more reactive, so the solution turns brown.',
            'No: iodine is more reactive than chlorine, so it cannot displace the chloride ions.',
          ],
          answer: 1,
          working: 'Iodine is below chlorine in group 17, so it is less reactive. It cannot take an electron from the chloride ions, so there is no reaction.',
        },
      ],
      lines: [
        { say: 'Your turn. Iodine solution is added to a colourless solution of potassium chloride. Does a reaction happen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: no reaction. Iodine is below chlorine in group seventeen, so it is less reactive, and it cannot take an electron from the chloride ions. Choice D has the order of reactivity the wrong way round.', show: 'q.answer' },
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
            'A more reactive halogen **displaces** a less reactive one from a solution of its halide: $\\ce{Cl2 + 2KBr -> 2KCl + Br2}$.',
            'Chlorine displaces bromide and iodide; bromine displaces iodide; iodine displaces neither.',
            '**Noble gases** (group 18): full outer shells and single atoms; they hardly react.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A more reactive halogen displaces a less reactive one from a solution of its halide.', show: 'sum.0' },
        { say: 'Chlorine displaces bromide and iodide, bromine displaces only iodide, and iodine displaces neither.', show: 'sum.1' },
        { say: 'The noble gases have full outer shells, so they hardly react, which makes them useful. That completes this lesson, and this unit on atoms and the periodic table.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
