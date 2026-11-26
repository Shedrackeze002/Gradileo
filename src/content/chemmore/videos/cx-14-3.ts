import type { Explainer } from '@/video/script.ts';
import { reaction } from '../../chem10/videos/lib/c10-equations.ts';
import { zincInAcid } from '../../chem10/videos/lib/c10-particles.ts';

const video: Explainer = {
  id: 'cx-14-3',
  lessonId: 'cx-14-3',
  title: 'Preparing and Collecting Gases',
  thumbnail: 'zn',
  summary:
    'Hydrogen is made from zinc and dilute hydrochloric acid, oxygen from hydrogen peroxide with a manganese(IV) oxide catalyst, and carbon dioxide from marble chips and dilute hydrochloric acid. Slightly soluble gases are collected over water, soluble gases by upward delivery if lighter than air and by downward delivery if denser. Ammonia is dried with quicklime, and most other gases with concentrated sulfuric acid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Gases, Liquids and Solids', title: 'Preparing and Collecting Gases', subtitle: 'Make it, dry it, collect it' }],
      lines: [
        { say: 'Many practical questions start with a gas: how it was made, how it was dried, and how it was collected. Each choice follows from the gas’s properties.', show: 'title' },
        { say: 'In this lesson, you will choose the reagents for common gases, and decide how each one is dried and collected.' },
      ],
    },
    {
      chapter: 'Hydrogen from zinc',
      layout: 'center',
      main: [zincInAcid('zn', 400), { kind: 'math', id: 'e', size: 'md', lines: ['\\ce{Zn + 2HCl -> ZnCl2 + H2}'] }],
      lines: [
        { say: 'Here are zinc granules in dilute hydrochloric acid, up close.', show: ['zn', 'e'] },
        { say: 'Each acid particle that hits the zinc takes a zinc atom into solution, and the hydrogen set loose pairs up into hydrogen molecules that bubble off. The reaction is steady and safe, which is just what a laboratory preparation needs.', play: 'zn.fizz' },
      ],
    },
    {
      chapter: 'Oxygen from hydrogen peroxide',
      layout: 'center',
      main: [reaction('ox', { from: [{ t: 'H2O2', n: 2 }], to: [{ t: 'H2O', n: 2 }, { t: 'O2' }], counts: true })],
      lines: [
        { say: 'Oxygen comes from hydrogen peroxide, with manganese four oxide as a catalyst. Here are two hydrogen peroxide molecules.', caption: 'Oxygen comes from hydrogen peroxide, with manganese(IV) oxide as a catalyst. Here are two hydrogen peroxide molecules.', show: 'ox' },
        { say: 'Watch them break up into two water molecules and one oxygen molecule. The catalyst speeds this up without being used up.', play: 'ox.go' },
      ],
    },
    {
      chapter: 'The common preparations',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Gas', 'Reagents'],
          rows: [
            ['Hydrogen', 'zinc and dilute hydrochloric acid'],
            ['Oxygen', 'hydrogen peroxide and manganese(IV) oxide'],
            ['Carbon dioxide', 'marble chips and dilute hydrochloric acid'],
            ['Ammonia', 'ammonium chloride heated with calcium hydroxide'],
            ['Chlorine', 'concentrated hydrochloric acid and manganese(IV) oxide'],
          ],
        },
        { kind: 'callout', id: 'no', tone: 'mistake', title: 'Not dilute sulfuric acid with marble', md: 'Insoluble calcium sulfate coats the chips and stops the reaction.' },
      ],
      lines: [
        { say: 'Here are the common preparations. Carbon dioxide comes from marble chips and dilute hydrochloric acid, ammonia from ammonium chloride heated with calcium hydroxide, and chlorine from concentrated hydrochloric acid and manganese four oxide.', caption: 'Here are the common preparations. Carbon dioxide comes from marble chips and dilute hydrochloric acid, ammonia from ammonium chloride heated with calcium hydroxide, and chlorine from concentrated hydrochloric acid and manganese(IV) oxide.', show: 't' },
        { say: 'Some reagents are avoided for good reasons. Dilute sulfuric acid is not used with marble, because insoluble calcium sulfate coats the chips and stops the reaction.', show: 'no', focus: 'no' },
      ],
    },
    {
      chapter: 'Collecting and drying',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['The gas is', 'Collect it'],
          rows: [['only slightly soluble (hydrogen, oxygen)', 'over water'], ['soluble, lighter than air (ammonia)', 'by upward delivery'], ['soluble, denser than air (chlorine, carbon dioxide)', 'by downward delivery']],
        },
        { kind: 'text', id: 'air', size: 'md', md: 'Air has $M_r \\approx 29$. Dry ammonia with **quicklime** (CaO); dry most others with **concentrated sulfuric acid**.' },
      ],
      lines: [
        { say: 'How a gas is collected depends on two things: how soluble it is in water, and whether it is lighter or denser than air. A gas that barely dissolves, like hydrogen or oxygen, is collected over water.', show: 't.0' },
        { say: 'A soluble gas lighter than air, like ammonia, rises into an upside-down jar: upward delivery. A soluble gas denser than air sinks into an upright jar: downward delivery. Air has a relative molecular mass of about twenty-nine, so compare with that.', show: ['t.1', 't.2', 'air'] },
        { say: 'A drying agent must not react with the gas. Concentrated sulfuric acid dries most gases, but ammonia is a base and reacts with it, so ammonia is dried with quicklime.', focus: 'air' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Hydrogen chloride ($M_r = 36.5$) is very soluble in water. How is it collected?',
          choices: ['By downward delivery', 'Over water', 'By upward delivery', 'Over concentrated sulfuric acid'],
          answer: 0,
          working: 'It is soluble, so not over water, and denser than air ($36.5 > 29$), so it sinks into an upright jar: downward delivery.',
        },
      ],
      lines: [
        { say: 'Your turn. Hydrogen chloride has a relative molecular mass of thirty-six point five, and it is very soluble in water. How is it collected? Pause the video and try it.', caption: 'Your turn. Hydrogen chloride has a relative molecular mass of 36.5, and it is very soluble in water. How is it collected? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, by downward delivery. It is too soluble to collect over water, and it is denser than air, so it sinks into an upright jar.', show: 'q.answer' },
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
            'Hydrogen: zinc and dilute HCl. Oxygen: H₂O₂ and MnO₂. Carbon dioxide: marble and dilute HCl.',
            'Slightly soluble gases are collected over water.',
            'Soluble gases: upward delivery if lighter than air, downward if denser.',
            'Dry ammonia with quicklime, most others with concentrated sulfuric acid.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Hydrogen comes from zinc and dilute acid, oxygen from hydrogen peroxide with a catalyst, and carbon dioxide from marble and dilute hydrochloric acid.', show: 'sum.0' },
        { say: 'Gases that barely dissolve are collected over water.', show: 'sum.1' },
        { say: 'Soluble gases go by upward delivery if lighter than air, and downward delivery if denser.', show: 'sum.2' },
        { say: 'And ammonia is dried with quicklime, while most other gases are dried with concentrated sulfuric acid.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
