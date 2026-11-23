import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import benzene from '@/content/chemmore/videos/cx-12-4.ts';

// Exam question for More Chemistry Topics lesson 12.4 (benzene): what hydrogenation enthalpies
// show about benzene's stability, making the nitronium ion, and why benzene substitutes instead of
// adding. Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's nitration of benzene (src/video/molecules.ts).

const QUESTION = 'The enthalpy of hydrogenation of cyclohexene, which has one C=C bond, is −120 kJ mol⁻¹. The enthalpy of hydrogenation of benzene is −208 kJ mol⁻¹. (a) Explain what these values show about the stability of benzene. (b) Benzene is nitrated with a mixture of concentrated nitric acid and concentrated sulfuric acid at about 50 °C. Write an equation for the formation of the electrophile. (c) Explain why benzene undergoes substitution rather than addition.';

const video: Explainer = {
  id: 'xq-cx-12-4',
  lessonId: '',
  exam: {
    lesson: 'cx-12-4',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Hydrogenation Enthalpies and Nitration. The Stability of Benzene',
  thumbnailTitle: 'Benzene',
  thumbnail: 'nt',
  summary:
    'A test-style question, solved one small step at a time: what do the hydrogenation enthalpies of cyclohexene and benzene show, how is the nitronium ion formed, and why does benzene substitute instead of adding? Three separate C=C bonds would give −360 kJ mol⁻¹, so benzene is 152 kJ mol⁻¹ more stable thanks to its delocalised ring; HNO₃ + H₂SO₄ → NO₂⁺ + HSO₄⁻ + H₂O; and substitution keeps the stable delocalised ring.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Benzene', subtitle: 'Stability and nitration' }],
      lines: [
        { say: 'In this video, we solve a test-style question about benzene. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '152 kJ mol⁻¹ more stable; HNO₃ + H₂SO₄ → NO₂⁺ + HSO₄⁻ + H₂O; keeps the delocalised ring' }],
      lines: [
        { say: 'Here is the question. The enthalpy of hydrogenation of cyclohexene, which has one C double bond C, is minus 120 kilojoules per mole. The enthalpy of hydrogenation of benzene is minus 208 kilojoules per mole. Part a: explain what these values show about the stability of benzene. Part b: benzene is nitrated with a mixture of concentrated nitric acid and concentrated sulfuric acid at about 50 degrees Celsius. Write an equation for the formation of the electrophile. Part c: explain why benzene undergoes substitution rather than addition.', caption: 'Here is the question. The enthalpy of hydrogenation of cyclohexene, which has one C=C bond, is −120 kJ mol⁻¹. The enthalpy of hydrogenation of benzene is −208 kJ mol⁻¹. Part a: explain what these values show about the stability of benzene. Part b: benzene is nitrated with a mixture of concentrated nitric acid and concentrated sulfuric acid at about 50 °C. Write an equation for the formation of the electrophile. Part c: explain why benzene undergoes substitution rather than addition.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Compare benzene with **three separate** C=C bonds, then follow the **ring** through a reaction' }],
      lines: [
        { say: 'If benzene really had three separate double bonds, it would behave like three cyclohexenes. The difference tells us how stable its ring is, and that explains how it reacts.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(benzene, 'nt')],
      lines: [
        { say: 'Here is what we need. This is the nitration of benzene up close, with the ring of delocalised electrons drawn as a circle. The nitronium ion is the electrophile. Watch the curly arrow from the ring to the nitrogen.', show: 'nt', play: 'nt.attack' },
        { say: 'Then the carbon to hydrogen bond gives its electrons back to the ring, and the hydrogen leaves as a hydrogen ion. The delocalised ring is restored.', play: 'nt.restore' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Expected: 3 × (−120) kJ mol⁻¹', 'Sulfuric acid makes the electrophile **NO₂⁺**', 'Substitution **keeps** the delocalised ring'] }],
      lines: [
        { say: 'Here is the plan. Three separate double bonds would release three times 120 kilojoules per mole.', show: 'plan.0' },
        { say: 'In nitration, sulfuric acid helps make the electrophile, the nitronium ion.', show: 'plan.1' },
        { say: 'And substitution keeps the delocalised ring, which addition would destroy.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The stability',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{expected: } 3 \\times (-120) = -360 \\text{ kJ mol}^{-1}', '\\text{actual: } {-208} \\text{ kJ mol}^{-1}', '\\good{360 - 208 = 152 \\text{ kJ mol}^{-1} \\text{ more stable}}'] }],
      lines: [
        { say: 'Step one. If benzene had three separate C double bond C bonds, its enthalpy of hydrogenation would be three times minus 120, which is minus 360 kilojoules per mole.', caption: 'Step one. If benzene had three separate C=C bonds, its enthalpy of hydrogenation would be 3 × (−120) = −360 kJ mol⁻¹.', show: 'm.0' },
        { say: 'The real value is only minus 208, so much less energy is released.', caption: 'The real value is only −208 kJ mol⁻¹, so much less energy is released.', show: 'm.1' },
        { say: 'That means benzene is 152 kilojoules per mole lower in energy, more stable, than a structure with three separate double bonds. The extra stability comes from its ring of delocalised pi electrons. That is part a.', caption: 'That means benzene is 152 kJ mol⁻¹ lower in energy, more stable, than a structure with three separate double bonds. The extra stability comes from its ring of delocalised π electrons. That is part a.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The electrophile',
      layout: 'center',
      main: [{ kind: 'math', id: 'e', size: 'md', lines: ['\\good{\\ce{HNO3 + H2SO4 -> NO2+ + HSO4- + H2O}}', '\\text{the electrophile: the nitronium ion, } \\ce{NO2+}'] }],
      lines: [
        { say: 'Step two. Sulfuric acid is the stronger acid. It protonates the nitric acid, which then loses water. H N O three plus H two S O four gives N O two plus, plus H S O four minus, plus water.', caption: 'Step two. Sulfuric acid is the stronger acid. It protonates the nitric acid, which then loses water: HNO₃ + H₂SO₄ → NO₂⁺ + HSO₄⁻ + H₂O.', show: 'e.0' },
        { say: 'The electrophile is the nitronium ion, N O two plus. That is part b.', caption: 'The electrophile is the nitronium ion, NO₂⁺. That is part b.', show: 'e.1', focus: 'e.1' },
      ],
    },
    {
      chapter: 'Step 3: Substitution, not addition',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Addition would **break** the delocalised ring', 'Losing it costs about **152 kJ mol⁻¹** of stability', 'Substitution **restores** the ring when H⁺ leaves'] }],
      lines: [
        { say: 'Step three. If benzene added atoms like an alkene, its delocalised ring would be broken for good.', show: 's.0' },
        { say: 'That would lose the extra stability we found in part a.', show: 's.1' },
        { say: 'In substitution, the ring is disrupted only for a moment. When the hydrogen ion leaves, the delocalised ring is restored, so the product keeps its stability. That is part c.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) Expected **−360**, actual **−208**: benzene is **152 kJ mol⁻¹ more stable**, due to **delocalised** π electrons. (b) **HNO₃ + H₂SO₄ → NO₂⁺ + HSO₄⁻ + H₂O**. (c) Substitution **keeps the delocalised ring** and its stability.' },
      ],
      lines: [
        { say: 'Does it make sense? This is also why benzene does not decolourise bromine water the way alkenes do: an addition reaction would cost it its stable ring.', show: 'ans' },
        { say: 'So benzene is 152 kilojoules per mole more stable than expected, the electrophile is the nitronium ion, and substitution keeps the ring.', caption: 'So benzene is 152 kJ mol⁻¹ more stable than expected, the electrophile is NO₂⁺, and substitution keeps the ring.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['−208 is **more exothermic**, so less stable', 'Less energy released: **more** stable'],
            ['The electrophile is **HNO₃**', 'It is **NO₂⁺**'],
            ['Benzene has **three double bonds**', 'All its C–C bonds are the **same** length'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Minus 208 releases less energy than minus 360, so benzene starts lower in energy, which means more stable.', caption: '−208 releases less energy than −360, so benzene starts lower in energy, which means more stable.', focus: 'traps.0' },
        { say: 'Nitric acid itself is not the electrophile. The sulfuric acid turns it into the nitronium ion.', focus: 'traps.1' },
        { say: 'And benzene has no separate double bonds: all six carbon to carbon bonds are the same length.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In the Friedel–Crafts acylation of benzene with ethanoyl chloride, what is the electrophile?',
          choices: ['Cl⁺', 'AlCl₄⁻', 'H⁺', 'CH₃CO⁺'],
          answer: 3,
          working: 'Aluminium chloride takes Cl⁻ from ethanoyl chloride, leaving the acylium ion, CH₃CO⁺.',
        },
      ],
      lines: [
        { say: 'Your turn. In the Friedel–Crafts acylation of benzene with ethanoyl chloride, what is the electrophile? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Aluminium chloride takes a chloride ion from ethanoyl chloride, leaving the positive acylium ion, C H three C O plus: choice D.', caption: 'Aluminium chloride takes a chloride ion from ethanoyl chloride, leaving the positive acylium ion, CH₃CO⁺: choice D.', show: 'q2.answer' },
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
          items: ['Benzene is **152 kJ mol⁻¹** more stable than expected', 'Nitration electrophile: **NO₂⁺**', 'Substitution **keeps** the delocalised ring'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Benzene is 152 kilojoules per mole more stable than three separate double bonds.', caption: 'Here is what to remember. Benzene is 152 kJ mol⁻¹ more stable than three separate double bonds.', show: 'sum.0' },
        { say: 'In nitration, the electrophile is the nitronium ion.', show: 'sum.1' },
        { say: 'And benzene reacts by substitution to keep its delocalised ring. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
