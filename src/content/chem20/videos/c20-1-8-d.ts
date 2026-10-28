import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-1-8-d',
  lessonId: 'c20-1-8',
  title: 'Intermolecular Forces, Part 4: Comparing Boiling Points',
  thumbnailTitle: 'Comparing Boiling Points',
  thumbnail: false,
  summary:
    'To compare boiling points, ask in order: does only one substance form hydrogen bonds, is one polar and the other not, and which has more electrons? Hydrogen bonds give water (100 °C) a far higher boiling point than hydrogen sulfide (about −60 °C), and methanol boils much higher than ethane though both have 18 electrons; a very large molecule such as iodine can still beat a small polar one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 4', title: 'Comparing Boiling Points', subtitle: 'Hydrogen bonds, then polarity, then electrons' }],
      lines: [
        { say: 'Hydrogen sulfide has more electrons than water. Yet water boils at one hundred degrees Celsius, and hydrogen sulfide at only about minus sixty.', caption: 'Hydrogen sulfide has more electrons than water. Yet water boils at 100 °C, and hydrogen sulfide at only about −60 °C.', show: 'title' },
        { say: 'In this part, you will explain that, and compare the boiling points of two substances in three steps.' },
      ],
    },
    {
      chapter: 'Why water boils so high',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{H2S}\\text{: } 2 \\times 1 + 16 = 18 \\qquad \\ce{H2O}\\text{: } 2 \\times 1 + 8 = 10',
            '\\ce{H2O}\\text{: hydrogen bonds} \\qquad \\ce{H2S}\\text{: none}',
            '\\ce{H2O}\\text{: } 100\\ ^\\circ\\text{C} \\qquad \\ce{H2S}\\text{: about } {-60}\\ ^\\circ\\text{C}',
          ],
        },
        { kind: 'text', id: 'ch4', size: 'md', align: 'center', md: 'Methane, $\\ce{CH4}$: also 10 electrons, no hydrogen bonds, about $-162\\ ^\\circ\\text{C}$.' },
      ],
      lines: [
        { say: 'Count the electrons. Hydrogen sulfide has two plus sixteen: eighteen, more than the ten in water. So hydrogen sulfide has the stronger London forces.', show: 'm.0', focus: 'm.0' },
        { say: 'But in water, hydrogen is bonded to oxygen, so its molecules form hydrogen bonds. In hydrogen sulfide, hydrogen is bonded to sulfur, so there are none.', show: 'm.1', focus: 'm.1' },
        { say: 'The hydrogen bonds matter far more than the difference in electrons. That is why water boils so high for such a small molecule. Methane, with the same ten electrons and no hydrogen bonds, boils at about minus one hundred sixty-two degrees.', show: ['m.2', 'ch4'], focus: ['m.2', 'ch4'] },
      ],
    },
    {
      chapter: 'Three questions in order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Comparing boiling points in order', md: 'A higher boiling point means stronger intermolecular forces. Ask three questions, in order.' },
        {
          kind: 'bullets',
          id: 'q',
          items: [
            '1. **Hydrogen bonds?** If only one forms them, it boils higher.',
            '2. **Polar?** If not decided, a polar substance boils higher than a non-polar one.',
            '3. **Electrons?** If still alike, more electrons mean stronger London forces and a higher boiling point.',
          ],
        },
      ],
      lines: [
        { say: 'A higher boiling point means stronger intermolecular forces. To compare two substances, ask three questions, in order.', show: 'tip' },
        { say: 'First, hydrogen bonds: if only one of them forms hydrogen bonds, it has the higher boiling point.', show: 'q.0' },
        { say: 'Second, polarity: if that does not decide it, a polar substance boils higher than a non-polar one.', show: 'q.1' },
        { say: 'Third, electrons: if they are still alike, the one with more electrons has stronger London forces, and the higher boiling point.', show: 'q.2' },
      ],
    },
    {
      chapter: 'Pairs of substances',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Higher boiling point', 'Lower boiling point', 'Reason'],
          rows: [
            ['$\\ce{C2H6}$, about $-89\\ ^\\circ\\text{C}$', '$\\ce{CH4}$, about $-162\\ ^\\circ\\text{C}$', 'more electrons (18 against 10)'],
            ['$\\ce{CCl4}$, about $77\\ ^\\circ\\text{C}$', '$\\ce{CH4}$, about $-162\\ ^\\circ\\text{C}$', 'more electrons (74 against 10)'],
            ['$\\ce{HF}$, about $20\\ ^\\circ\\text{C}$', '$\\ce{HCl}$, about $-85\\ ^\\circ\\text{C}$', 'hydrogen bonds'],
            ['$\\ce{NH3}$, about $-33\\ ^\\circ\\text{C}$', '$\\ce{PH3}$, about $-88\\ ^\\circ\\text{C}$', 'hydrogen bonds'],
            ['$\\ce{CH3OH}$, about $65\\ ^\\circ\\text{C}$', '$\\ce{C2H6}$, about $-89\\ ^\\circ\\text{C}$', 'hydrogen bonds (both 18 electrons)'],
            ['$\\ce{HCl}$, about $-85\\ ^\\circ\\text{C}$', '$\\ce{F2}$, about $-188\\ ^\\circ\\text{C}$', 'polar (both 18 electrons)'],
          ],
        },
      ],
      lines: [
        { say: 'Here are some pairs. Ethane and carbon tetrachloride boil higher than methane, because they have more electrons.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Hydrogen fluoride boils higher than hydrogen chloride, and ammonia higher than phosphine, because of hydrogen bonds.', caption: 'Hydrogen fluoride boils higher than hydrogen chloride, and ammonia higher than phosphine, PH₃, because of hydrogen bonds.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'And when two substances have the same number of electrons, hydrogen bonds or polarity decide. Methanol beats ethane, and hydrogen chloride beats fluorine.', show: ['t.4', 't.5'], focus: ['t.4', 't.5'] },
      ],
    },
    {
      chapter: 'Methanol and ethane',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{CH3OH}\\text{: } 6 + 4 \\times 1 + 8 = 18',
            '\\ce{C2H6}\\text{: } 2 \\times 6 + 6 \\times 1 = 18',
            '\\ce{CH3OH}\\text{: hydrogen bonds, about } 65\\ ^\\circ\\text{C}',
            '\\ce{C2H6}\\text{: London forces only, about } {-89}\\ ^\\circ\\text{C}',
          ],
        },
      ],
      lines: [
        { say: 'Methanol boils at about sixty-five degrees Celsius, but ethane at about minus eighty-nine. Why?' },
        { say: 'Methanol has six plus four plus eight: eighteen electrons. Ethane has twelve plus six: also eighteen. So their London forces are similar.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'But methanol has a hydrogen bonded directly to oxygen, so its molecules form hydrogen bonds, while ethane is non-polar, with London forces only. Hydrogen bonds hold methanol molecules together much more strongly.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Size still matters',
      layout: 'center',
      main: [{ kind: 'callout', id: 'note', tone: 'key', title: 'Size still matters', md: 'The order works for molecules of **similar size**. Iodine, $\\ce{I2}$, with 106 electrons, is non-polar, yet it boils at about $184\\ ^\\circ\\text{C}$: higher than water.' }],
      lines: [
        { say: 'The order works for molecules of similar size. A very large non-polar molecule can have London forces strong enough to beat a small polar one.', show: 'note' },
        { say: 'Iodine, with one hundred six electrons, boils at about one hundred eighty-four degrees Celsius: higher than water.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which has the higher boiling point, $\\ce{HF}$ or $\\ce{HBr}$, and why? (Atomic numbers: H 1, F 9, Br 35.)',
          choices: ['$\\ce{HBr}$: more electrons, so stronger London forces', '$\\ce{HF}$: its molecules form hydrogen bonds', '$\\ce{HBr}$: its molecules form hydrogen bonds', '$\\ce{HF}$: more electrons, so stronger London forces'],
          answer: 1,
          working: 'In $\\ce{HF}$, H is bonded directly to F, so it forms hydrogen bonds; $\\ce{HBr}$ does not. $\\ce{HBr}$ has more electrons (36 against 10), but hydrogen bonds decide first.',
        },
      ],
      lines: [
        { say: 'Your turn. Which has the higher boiling point, hydrogen fluoride or hydrogen bromide, and why? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. In hydrogen fluoride, hydrogen is bonded to fluorine, so its molecules form hydrogen bonds, and hydrogen bromide forms none. Choice A counts electrons, but the first question has already decided it.', show: 'q.answer' },
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
            'A higher boiling point means stronger intermolecular forces.',
            'Compare in order: **hydrogen bonds**, then **polarity**, then the **number of electrons**.',
            'Hydrogen bonds give water its high boiling point: $\\ce{H2O}$ $100\\ ^\\circ\\text{C}$, $\\ce{H2S}$ about $-60\\ ^\\circ\\text{C}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A higher boiling point means stronger intermolecular forces.', show: 'sum.0' },
        { say: 'Compare in order: hydrogen bonds first, then polarity, then the number of electrons.', show: 'sum.1' },
        { say: 'And hydrogen bonds give water its unusually high boiling point. That completes this lesson, and you can now explain why water is a liquid while methane is a gas.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
