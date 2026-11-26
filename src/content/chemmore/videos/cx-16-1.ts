import type { Explainer } from '@/video/script.ts';
import { precipitate } from '../../chem20/videos/lib/c20-particles.ts';

const video: Explainer = {
  id: 'cx-16-1',
  lessonId: 'cx-16-1',
  title: 'Qualitative Analysis: Cations, Anions and Gases',
  thumbnail: 'cu',
  summary:
    'Sodium hydroxide and ammonia solutions identify cations by the colour of their hydroxide precipitates and whether these dissolve in excess: Cu²⁺ gives blue, Fe²⁺ green and Fe³⁺ reddish-brown, and the white precipitates of Zn²⁺, Al³⁺ and Pb²⁺ dissolve in excess sodium hydroxide. Carbonate and sulfite give gases with acid, sulfate gives white barium sulfate, chloride gives white silver chloride, and nitrate gives a brown ring. Each common gas has its own test.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Practical Analysis', title: 'Qualitative Analysis', subtitle: 'Cations, anions and gases' }],
      lines: [
        { say: 'In a practical exam, you may be handed a solution labelled only with a letter, and asked what it contains.', show: 'title' },
        { say: 'In this lesson, you will identify cations with sodium hydroxide and ammonia, anions with acids and silver and barium salts, and gases by their tests.' },
      ],
    },
    {
      chapter: 'Precipitates up close',
      layout: 'split',
      leftWidth: 560,
      left: [
        precipitate(
          'cu',
          {
            cation: { name: 'copper(II) ion', tone: 'adj', size: 1.1 },
            anion: { name: 'hydroxide ion', tone: 'theta' },
            withCation: { name: 'sulfate ion', tone: 'hyp', size: 1.1 },
            withAnion: { name: 'sodium ion', tone: 'brand' },
          },
          { ratio: 2, n: 3, label: 'copper(II)', solid: 'copper(II) hydroxide', seed: 3, water: 'good' },
          440,
        ),
      ],
      right: [
        precipitate(
          'fe',
          {
            cation: { name: 'iron(III) ion', tone: 'opp', size: 1.1 },
            anion: { name: 'hydroxide ion', tone: 'theta' },
            withCation: { name: 'nitrate ion', tone: 'hyp', size: 1.1 },
            withAnion: { name: 'sodium ion', tone: 'brand' },
          },
          { ratio: 3, n: 3, label: 'iron(III)', solid: 'iron(III) hydroxide', seed: 7 },
          440,
        ),
      ],
      lines: [
        { say: 'Here are copper two ions on the left, and iron three ions on the right, as sodium hydroxide solution is added to each.', caption: 'Here are Cu²⁺ ions on the left, and Fe³⁺ ions on the right, as sodium hydroxide solution is added to each.', show: ['cu', 'cu.labels', 'cu.key', 'fe', 'fe.labels', 'fe.key'] },
        { say: 'Each metal ion collects hydroxide ions until its charge is cancelled, and the hydroxide sinks as a solid precipitate. Copper two hydroxide is blue, and iron three hydroxide is reddish-brown, so the colour tells you the metal.', caption: 'Each metal ion collects hydroxide ions until its charge is cancelled, and the hydroxide sinks as a solid precipitate. Copper(II) hydroxide is blue, and iron(III) hydroxide is reddish-brown, so the colour tells you the metal.', play: ['cu.mix', 'fe.mix'] },
      ],
    },
    {
      chapter: 'Cations',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Ion', 'With NaOH(aq)', 'With NH₃(aq)'],
          rows: [
            ['Ca²⁺', 'white, stays in excess', 'no precipitate'],
            ['Zn²⁺', 'white, dissolves in excess', 'white, dissolves in excess'],
            ['Al³⁺, Pb²⁺', 'white, dissolves in excess', 'white, stays in excess'],
            ['Cu²⁺', 'blue, stays in excess', 'blue, deep blue solution in excess'],
            ['Fe²⁺', 'green', 'green'],
            ['Fe³⁺', 'reddish-brown', 'reddish-brown'],
          ],
        },
      ],
      lines: [
        { say: 'Add each reagent a few drops at a time, then in excess. Calcium gives a white precipitate with sodium hydroxide that stays, and none with ammonia.', show: 't.0' },
        { say: 'Zinc’s white precipitate dissolves in excess of both reagents. Aluminium and lead dissolve in excess sodium hydroxide but not in ammonia, so they are told apart with potassium iodide, which gives yellow lead iodide.', show: ['t.1', 't.2'] },
        { say: 'The coloured ones are copper, blue, which dissolves in excess ammonia to a deep blue solution, iron two, green, and iron three, reddish-brown. An ammonium salt gives no precipitate, but on warming with sodium hydroxide it gives ammonia gas.', show: ['t.3', 't.4', 't.5'] },
      ],
    },
    {
      chapter: 'Anions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Ion', 'Test', 'Result'],
          rows: [
            ['CO₃²⁻', 'dilute acid', 'fizzes; gas turns limewater milky'],
            ['SO₄²⁻', 'dilute HCl, then barium chloride', 'white precipitate'],
            ['Cl⁻', 'dilute HNO₃, then silver nitrate', 'white precipitate'],
            ['NO₃⁻', 'iron(II) sulfate, then conc. H₂SO₄', 'brown ring'],
          ],
        },
      ],
      lines: [
        { say: 'A carbonate fizzes with dilute acid, giving a gas that turns limewater milky.', show: 't.0' },
        { say: 'A sulfate gives a white precipitate with acidified barium chloride, and a chloride gives a white precipitate with acidified silver nitrate. The acid goes in first, to remove carbonate ions that would also give a precipitate.', show: ['t.1', 't.2'] },
        { say: 'And a nitrate gives a brown ring where concentrated sulfuric acid meets the iron two sulfate solution.', caption: 'And a nitrate gives a brown ring where concentrated sulfuric acid meets the iron(II) sulfate solution.', show: 't.3' },
      ],
    },
    {
      chapter: 'Gases',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Gas', 'Test'],
          rows: [['Hydrogen', 'squeaky pop with a lit splint'], ['Oxygen', 'relights a glowing splint'], ['Carbon dioxide', 'turns limewater milky'], ['Ammonia', 'turns damp red litmus blue'], ['Chlorine', 'bleaches damp litmus'], ['Sulfur dioxide', 'turns orange dichromate green']],
        },
      ],
      lines: [
        { say: 'Each common gas has its own test. Hydrogen burns with a squeaky pop, oxygen relights a glowing splint, and carbon dioxide turns limewater milky.', show: ['t.0', 't.1', 't.2'] },
        { say: 'Ammonia turns damp red litmus blue, chlorine bleaches damp litmus, and sulfur dioxide turns orange acidified dichromate green.', show: ['t.3', 't.4', 't.5'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A solution gives a white precipitate with NaOH(aq) that dissolves in excess, and a white precipitate with NH₃(aq) that also dissolves in excess. Which cation is present?',
          choices: ['$\\ce{Al^3+}$', '$\\ce{Ca^2+}$', '$\\ce{Zn^2+}$', '$\\ce{Pb^2+}$'],
          answer: 2,
          working: 'Only zinc gives a white precipitate that dissolves in excess of both reagents.',
        },
      ],
      lines: [
        { say: 'Your turn. A solution gives a white precipitate with sodium hydroxide that dissolves in excess, and a white precipitate with ammonia that also dissolves in excess. Which cation is present? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, zinc. Aluminium and lead dissolve in excess sodium hydroxide too, but not in excess ammonia. Only zinc dissolves in excess of both.', show: 'q.answer' },
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
            'With NaOH: Zn²⁺, Al³⁺ and Pb²⁺ dissolve in excess; Ca²⁺ does not.',
            'With NH₃: only Zn²⁺ and Cu²⁺ dissolve in excess.',
            'Colours: Cu²⁺ blue, Fe²⁺ green, Fe³⁺ reddish-brown.',
            'Sulfate: white BaSO₄. Chloride: white AgCl. Nitrate: brown ring.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With sodium hydroxide, the white precipitates of zinc, aluminium and lead dissolve in excess, and calcium’s does not.', show: 'sum.0' },
        { say: 'With ammonia, only zinc and copper dissolve in excess.', show: 'sum.1' },
        { say: 'Copper two hydroxide is blue, iron two hydroxide green, and iron three hydroxide reddish-brown.', caption: 'Copper(II) hydroxide is blue, iron(II) hydroxide green, and iron(III) hydroxide reddish-brown.', show: 'sum.2' },
        { say: 'And sulfate gives white barium sulfate, chloride gives white silver chloride, and nitrate gives a brown ring.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
