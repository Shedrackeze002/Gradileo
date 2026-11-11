import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-12-4',
  lessonId: 'cx-12-4',
  title: 'Benzene and Electrophilic Substitution',
  thumbnail: false,
  summary:
    'Benzene has a ring of six delocalised p electrons: all its carbon–carbon bonds are the same length, and its enthalpy of hydrogenation is 152 kJ mol⁻¹ less exothermic than three separate C=C bonds would give. To keep the ring, it reacts by electrophilic substitution: nitration with concentrated nitric and sulfuric acids, where the electrophile is NO₂⁺, and Friedel–Crafts acylation with an acyl chloride and aluminium chloride.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Organic Chemistry', title: 'Benzene', subtitle: 'A ring too stable to break' }],
      lines: [
        { say: 'Benzene looks as if it should have three double bonds, yet it does not decolourise bromine water the way alkenes do. Its electrons are shared around a ring, and that ring is very stable.', show: 'title' },
        { say: 'In this lesson, you will use evidence for the structure of benzene, and describe its substitution reactions.' },
      ],
    },
    {
      chapter: 'The evidence',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['All six C–C bonds: 0.139 nm, between single (0.154) and double (0.134)', 'Three separate C=C: expected −360 kJ mol⁻¹', 'Benzene: −208 kJ mol⁻¹, so 152 kJ mol⁻¹ more stable'] },
      ],
      lines: [
        { say: 'Each carbon has one p electron left over. The six p electrons overlap above and below the ring, forming a delocalised ring of electrons.' },
        { say: 'So all six carbon carbon bonds are the same length, between a single and a double bond.', caption: 'So all six C–C bonds are the same length, between a single and a double bond.', show: 'b.0' },
        { say: 'Cyclohexene, with one double bond, has an enthalpy of hydrogenation of minus one hundred twenty. Three separate double bonds would give minus three hundred sixty.', caption: 'Cyclohexene, with one double bond, has an enthalpy of hydrogenation of −120 kJ mol⁻¹. Three separate double bonds would give −360.', show: 'b.1' },
        { say: 'But benzene’s is only minus two hundred eight, so it is one hundred fifty-two kilojoules per mole more stable.', caption: 'But benzene’s is only −208, so it is 152 kJ mol⁻¹ more stable.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Nitration',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{HNO3 + 2H2SO4 -> NO2+ + H3O+ + 2HSO4-}', '\\ce{C6H6 + NO2+ -> C6H5NO2 + H+}'] }],
      lines: [
        { say: 'Addition would destroy the delocalised ring, so benzene reacts by electrophilic substitution instead.' },
        { say: 'To nitrate it, warm it to about fifty degrees with concentrated nitric and sulfuric acids. They make the electrophile, the nitronium ion.', caption: 'To nitrate it, warm it to about 50 °C with concentrated nitric and sulfuric acids. They make the electrophile, the nitronium ion, NO₂⁺.', show: 'm.0', focus: 'm.0' },
        { say: 'The nitronium ion replaces a hydrogen, giving nitrobenzene, which is used to make dyes and explosives.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Friedel–Crafts acylation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3COCl + AlCl3 -> CH3CO+ + AlCl4-}', '\\ce{C6H6 + CH3CO+ -> C6H5COCH3 + H+}'] }],
      lines: [
        { say: 'In Friedel Crafts acylation, an acyl chloride and an aluminium chloride catalyst make the electrophile.', caption: 'In Friedel–Crafts acylation, an acyl chloride and an aluminium chloride catalyst make the electrophile.', show: 'm.0', focus: 'm.0' },
        { say: 'It substitutes into the ring, giving an aromatic ketone, phenylethanone.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the electrophile in the nitration of benzene?',
          choices: ['$\\ce{NO2+}$', '$\\ce{NO3-}$', '$\\ce{HNO3}$', '$\\ce{HSO4-}$'],
          answer: 0,
          working: 'Concentrated sulfuric acid protonates nitric acid, which loses water to give the **nitronium ion**, $\\ce{NO2+}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the electrophile in the nitration of benzene? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is choice A, the nitronium ion, made from the two concentrated acids.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Benzene has a delocalised ring of six p electrons.', 'Equal bond lengths and a less exothermic hydrogenation are the evidence.', 'It reacts by electrophilic substitution, keeping the ring.', 'Nitration uses NO₂⁺; acylation uses RCO⁺ from AlCl₃.'] }],
      lines: [
        { say: 'Let’s sum up. Benzene has a delocalised ring of six p electrons.', show: 'sum.0' },
        { say: 'Equal bond lengths and a less exothermic hydrogenation are the evidence.', show: 'sum.1' },
        { say: 'It reacts by electrophilic substitution, keeping its stable ring.', show: 'sum.2' },
        { say: 'And nitration uses the nitronium ion, while acylation uses an acyl cation made with aluminium chloride.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
