import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, labels, mol, plus, row, stack } from './lib/c10-4-figures.ts';

// Barium chloride and sodium sulfate swap partners: barium sulfate and sodium chloride.
const tones = { Ba: 'theta', Cl: 'good', Na: 'brand', SO_4: 'hyp' } as const;
const ion = (id: string, syms: Array<keyof typeof tones>) => mol(id, syms, { tones: syms.map((s) => tones[s]), r: 0.5 });
const swapRow = row({ terms: [ion('bc', ['Cl', 'Ba', 'Cl']), plus('p1'), ion('ns', ['Na', 'SO_4', 'Na']), arrow('arr'), ion('bs', ['Ba', 'SO_4']), plus('p2'), stack(ion('nc1', ['Na', 'Cl']), ion('nc2', ['Na', 'Cl']))] });
const swap = figure(
  'sw',
  [
    swapRow,
    labels([
      { id: 'solid', at: [swapRow.mid.bs, -1.45], tex: '\\text{precipitate}', tone: 'theta' },
      { id: 'stays', at: [swapRow.mid.nc1, -1.45], tex: '\\text{dissolved}', tone: 'muted' },
    ]),
  ],
  260,
);

const video: Explainer = {
  id: 'c10-4-3-d',
  lessonId: 'c10-4-3',
  title: 'Types of Reactions, Part 4: Precipitates',
  thumbnailTitle: 'Precipitates',
  thumbnail: 'sw',
  summary:
    'In a double displacement, two solutions are mixed and the compounds swap partners. A new compound that does not dissolve in water comes out as a solid, a precipitate, with the state symbol (s): barium chloride and sodium sulfate make a white precipitate of barium sulfate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 4', title: 'Precipitates', subtitle: 'When two solutions swap partners' }],
      lines: [
        { say: 'Mix two clear, colourless solutions, and a cloud of bright yellow solid can appear in an instant.', show: 'title' },
        { say: 'In this part, you will predict whether mixing two solutions makes a solid, and which compound it is.' },
      ],
    },
    {
      chapter: 'Swap and check',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Precipitate', md: 'A **solid** that forms when two solutions are mixed. Its state symbol is (s).' },
        {
          kind: 'bullets',
          id: 's',
          items: [
            '**Swap partners:** the metal of each compound joins the non-metal part of the other.',
            '**Check solubility** with the rules given. Sodium and potassium compounds, and all nitrates, dissolve.',
            'A new compound that **does not dissolve** is the precipitate.',
          ],
        },
      ],
      lines: [
        { say: 'In a double displacement, two solutions are mixed and the compounds swap partners. If one of the new compounds does not dissolve in water, it appears as a solid, a precipitate.', show: 'def' },
        { say: 'To predict one, first swap partners. The metal of each compound joins the non-metal part of the other. Write the formulas so the charges balance.', show: 's.0' },
        { say: 'Then check solubility. The question gives the rules. Compounds of sodium and potassium, and all nitrates, dissolve in water, so they never precipitate.', show: 's.1' },
        { say: 'The new compound that does not dissolve is the precipitate. The other stays dissolved.', show: 's.2' },
      ],
    },
    {
      chapter: 'Barium chloride and sodium sulfate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Sodium compounds dissolve; most sulfates dissolve, but barium sulfate does not.' },
        swap,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{BaCl2(aq) + Na2SO4(aq) -> BaSO4(s) + 2NaCl(aq)}'] },
      ],
      lines: [
        { say: 'Solutions of barium chloride and sodium sulfate are mixed. The rules: sodium compounds dissolve, and most sulfates dissolve, but barium sulfate does not.', show: ['q', 'sw.bc', 'sw.p1', 'sw.ns'] },
        { say: 'Swap partners. Barium with sulfate gives barium sulfate, and sodium with chloride gives sodium chloride.', show: ['sw.arr', 'sw.bs', 'sw.p2', 'sw.nc1', 'sw.nc2'] },
        { say: 'Sodium chloride dissolves. Barium sulfate does not, so it forms a white precipitate.', show: ['sw.solid', 'sw.stays'], focus: 'sw.bs' },
        { say: 'With state symbols, the barium sulfate is solid, and everything else is aqueous.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The precipitate is new',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The precipitate is a new compound', md: 'The two solutions were already dissolved, so neither starting compound can be the precipitate. Check only the **new** pairs.' },
        {
          kind: 'table',
          id: 't',
          head: ['Solutions mixed', 'Precipitate', 'Colour'],
          rows: [
            ['silver nitrate and sodium chloride', 'silver chloride, $\\ce{AgCl}$', 'white'],
            ['lead(II) nitrate and potassium iodide', 'lead(II) iodide, $\\ce{PbI2}$', 'bright yellow'],
            ['copper(II) sulfate and sodium hydroxide', 'copper(II) hydroxide, $\\ce{Cu(OH)2}$', 'pale blue'],
          ],
        },
      ],
      lines: [
        { say: 'The two solutions you mix were already dissolved, so neither starting compound can be the precipitate. Look only at the new pairs made by swapping partners.', show: 'oops' },
        { say: 'Here are some you will meet. Silver nitrate and sodium chloride give white silver chloride.', show: 't.0' },
        { say: 'Lead two nitrate and potassium iodide give bright yellow lead two iodide.', caption: 'Lead(II) nitrate and potassium iodide give bright yellow lead(II) iodide.', show: 't.1' },
        { say: 'And copper two sulfate and sodium hydroxide give pale blue copper two hydroxide. Iron three chloride and sodium hydroxide give an orange-brown one.', caption: 'And copper(II) sulfate and sodium hydroxide give pale blue copper(II) hydroxide. Iron(III) chloride and sodium hydroxide give an orange-brown one.', show: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solutions of silver nitrate, $\\ce{AgNO3}$, and potassium bromide, $\\ce{KBr}$, are mixed. All potassium compounds and all nitrates dissolve; most bromides dissolve, but silver bromide does not. What forms?',
          choices: ['A precipitate of potassium nitrate', 'A precipitate of silver nitrate', 'No reaction: everything stays dissolved', 'A precipitate of silver bromide'],
          answer: 3,
          working: 'Swapping partners gives silver bromide and potassium nitrate. Potassium nitrate dissolves; silver bromide does not: $\\ce{AgNO3(aq) + KBr(aq) -> AgBr(s) + KNO3(aq)}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solutions of silver nitrate and potassium bromide are mixed. All potassium compounds and all nitrates dissolve. Most bromides dissolve, but silver bromide does not. What forms? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Swapping partners gives silver bromide and potassium nitrate. Potassium nitrate dissolves, but silver bromide does not, so it is the precipitate. Choice B is a starting compound, which was already dissolved.', show: 'q.answer' },
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
            'In a double displacement, the two compounds **swap partners**.',
            'A new compound that does not dissolve is a **precipitate**, (s).',
            'Sodium and potassium compounds, and all nitrates, never precipitate.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a double displacement, the two compounds swap partners.', show: 'sum.0' },
        { say: 'A new compound that does not dissolve comes out as a solid, a precipitate, with the state symbol S.', caption: 'A new compound that does not dissolve comes out as a solid, a precipitate, with the state symbol (s).', show: 'sum.1' },
        { say: 'And compounds of sodium and potassium, and all nitrates, never precipitate. That completes this lesson on types of reactions.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
