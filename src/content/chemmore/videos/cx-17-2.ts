import type { Explainer } from '@/video/script.ts';
import { precipitate } from '../../chem20/videos/lib/c20-particles.ts';

const video: Explainer = {
  id: 'cx-17-2',
  lessonId: 'cx-17-2',
  title: 'Water: Hardness and Treatment',
  thumbnail: 'sf',
  summary:
    'Hard water does not easily lather with soap because it holds dissolved calcium or magnesium ions. Temporary hardness comes from hydrogencarbonates and is removed by boiling; permanent hardness comes from sulfates and chlorides. Washing soda, ion exchange and distillation remove both kinds. A soap test compares unboiled and boiled water with distilled water, and town water is screened, coagulated with alum, settled, filtered and chlorinated.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-metals and Their Compounds', title: 'Water: Hardness and Treatment', subtitle: 'Why soap will not lather' }],
      lines: [
        { say: 'In some towns, soap lathers at once. In others, it forms a grey scum, and kettles fur up with white scale.', show: 'title' },
        { say: 'In this lesson, you will explain the two kinds of hard water, how each is removed, and how water is treated for a town.' },
      ],
    },
    {
      chapter: 'What makes water hard',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Hard water', md: 'Water that does not easily form a lather with soap, because it contains dissolved **calcium or magnesium ions**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CaCO3 + H2O + CO2 -> Ca(HCO3)2}', '\\ce{Ca(HCO3)2 ->[heat] CaCO3 + H2O + CO2}'] },
      ],
      lines: [
        { say: 'Hard water does not easily form a lather with soap, because it contains dissolved calcium or magnesium ions, picked up from the rocks it has flowed through.', show: 'def' },
        { say: 'Rain water with carbon dioxide in it dissolves limestone as calcium hydrogencarbonate. That causes temporary hardness.', show: 'm.0' },
        { say: 'Boiling reverses the reaction: calcium carbonate comes back out as the scale in a kettle, and the hardness is gone. Permanent hardness comes from calcium and magnesium sulfates and chlorides, which boiling does not change.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Washing soda',
      layout: 'center',
      main: [
        precipitate(
          'sf',
          {
            cation: { name: 'calcium ion', tone: 'opp', size: 1.1 },
            anion: { name: 'carbonate ion', tone: 'theta', size: 1.1 },
            withCation: { name: 'sulfate ion', tone: 'hyp', size: 1.1 },
            withAnion: { name: 'sodium ion', tone: 'brand' },
          },
          { label: 'hard water + washing soda', solid: 'calcium carbonate', n: 6, seed: 3 },
          440,
        ),
      ],
      lines: [
        { say: 'Washing soda, sodium carbonate, softens both kinds of hard water. Here are the calcium ions in hard water, as washing soda is added.', show: ['sf', 'sf.labels', 'sf.key'] },
        { say: 'Each calcium ion meets a carbonate ion, and they lock together and sink as insoluble calcium carbonate. With the calcium ions gone, the water is soft, and only sodium ions are left with the sulfate.', show: 'sf.tally', play: 'sf.mix' },
      ],
    },
    {
      chapter: 'Removing hardness',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Method', 'Removes'],
          rows: [['Boiling', 'temporary only'], ['Calcium hydroxide (Clark’s method)', 'temporary only'], ['Washing soda', 'both'], ['Ion-exchange resin', 'both'], ['Distillation', 'both']],
        },
      ],
      lines: [
        { say: 'Boiling, and adding calcium hydroxide, remove only temporary hardness.', show: ['t.0', 't.1'] },
        { say: 'Washing soda, an ion-exchange resin that swaps calcium ions for sodium ions, and distillation remove both kinds.', show: ['t.2', 't.3', 't.4'] },
      ],
    },
    {
      chapter: 'The soap test',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Sample', 'Soap for a lasting lather'], rows: [['Distilled water', '1 cm³'], ['Water X', '12 cm³'], ['Water X, boiled', '6 cm³']] },
        { kind: 'callout', id: 'a', tone: 'key', title: 'Both kinds', md: 'Boiling lowers the soap needed (some **temporary** hardness), but not to 1 cm³ (some **permanent** hardness).' },
      ],
      lines: [
        { say: 'Soap only lathers once calcium ions have used it up as scum. So the volume of soap solution needed measures the hardness. Distilled water needs one cubic centimetre, water X needs twelve, and water X after boiling needs six.', caption: 'Soap only lathers once calcium ions have used it up as scum. So the volume of soap solution needed measures the hardness. Distilled water needs 1 cm³, water X needs 12 cm³, and water X after boiling needs 6 cm³.', show: 't' },
        { say: 'Boiling halved the soap needed, so some hardness was temporary. But six is still more than one, so some is permanent. Water X has both.', caption: 'Boiling halved the soap needed, so some hardness was temporary. But 6 cm³ is still more than 1 cm³, so some is permanent. Water X has both.', show: 'a', focus: 'a' },
      ],
    },
    {
      chapter: 'Water for a town',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Screening** removes large objects.', '**Coagulation**: alum makes fine particles clump.', '**Sedimentation**: the clumps settle.', '**Filtration** through sand removes the rest.', '**Chlorination** kills bacteria.'],
        },
      ],
      lines: [
        { say: 'Water for a town is first screened to remove large objects. Then alum, aluminium sulfate, makes fine particles clump together, and the clumps settle in tanks.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'Sand beds filter out the rest, and finally chlorine kills bacteria, so the water stays safe all the way through the pipes.', show: ['b.3', 'b.4'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Water Y needs 9 cm³ of soap solution, both before and after boiling. Distilled water needs 1 cm³. What hardness does Y have?',
          choices: ['Temporary only', 'None', 'Both kinds', 'Permanent only'],
          answer: 3,
          working: 'Boiling made no difference, so there is no temporary hardness; 9 cm³ is more than 1 cm³, so the hardness is permanent.',
        },
      ],
      lines: [
        { say: 'Your turn. Water Y needs nine cubic centimetres of soap solution, both before and after boiling, and distilled water needs one. What hardness does Y have? Pause the video and try it.', caption: 'Your turn. Water Y needs 9 cm³ of soap solution, both before and after boiling, and distilled water needs 1 cm³. What hardness does Y have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, permanent only. Boiling made no difference, so none of the hardness was temporary, but it still needs far more soap than distilled water.', show: 'q.answer' },
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
            'Temporary hardness: hydrogencarbonates, removed by boiling.',
            'Permanent hardness: sulfates and chlorides.',
            'Washing soda, ion exchange and distillation remove both.',
            'Town water: screened, coagulated, settled, filtered, chlorinated.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Temporary hardness comes from hydrogencarbonates, and boiling removes it.', show: 'sum.0' },
        { say: 'Permanent hardness comes from sulfates and chlorides.', show: 'sum.1' },
        { say: 'Washing soda, ion exchange and distillation remove both kinds.', show: 'sum.2' },
        { say: 'And town water is screened, coagulated with alum, settled, filtered and chlorinated.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
