import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-1-3-d',
  lessonId: 'c20-1-3',
  title: 'Molecular Compounds and Acids, Part 4: Naming Acids',
  thumbnailTitle: 'Naming Acids',
  thumbnail: false,
  summary:
    'For naming, an acid is a hydrogen compound dissolved in water, written with (aq): hydrogen plus an anion, with enough hydrogens to cancel its charge. Classical names come from the anion: -ide gives hydro-…-ic acid (HCl(aq), hydrochloric acid), -ate gives -ic acid (HNO3(aq), nitric acid) and -ite gives -ous acid (H2SO3(aq), sulfurous acid). The IUPAC name is "aqueous hydrogen" plus the anion’s name, with no prefixes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 4', title: 'Naming Acids', subtitle: 'Classical and IUPAC names' }],
      lines: [
        { say: 'The acid in your stomach, the acid in vinegar and the acid in fizzy drinks each take their names from an ion you already know.', show: 'title' },
        { say: 'In this part, you will name acids two ways: by their classical names, and by their eye-you-pack names.', caption: 'In this part, you will name acids two ways: by their classical names, and by their IUPAC names.' },
      ],
    },
    {
      chapter: 'What is an acid?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Acid', md: 'For naming, an **acid** is a compound of hydrogen dissolved in water, shown with **(aq)**, for *aqueous*.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{HCl(g)}\\text{: a gas} \\qquad \\ce{HCl(aq)}\\text{: an acid}', '\\ce{SO4^2-}\\text{ needs two H: } \\ce{H2SO4(aq)}', '\\text{acetic acid: } \\ce{CH3COOH(aq)}'] },
      ],
      lines: [
        { say: 'For naming, an acid is a compound of hydrogen dissolved in water. We show dissolved in water with A Q in brackets, for aqueous.', caption: 'For naming, an acid is a compound of hydrogen dissolved in water. We show dissolved in water with (aq), for aqueous.', show: 'def' },
        { say: 'Hydrogen chloride is a gas. Once it dissolves in water, it is an acid.', show: 'm.0', focus: 'm.0' },
        { say: 'An acid’s formula is hydrogen plus an anion, with enough hydrogens to cancel the anion’s charge. Sulfate is two minus, so sulfuric acid has two hydrogens.', show: 'm.1', focus: 'm.1' },
        { say: 'Hydrogen is written first, except in acetic acid, whose acidic hydrogen is the last one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Classical names',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Anion ends in', 'Acid name', 'Example'],
          rows: [
            ['-ide', 'hydro-…-ic acid', 'chloride, $\\ce{Cl-}$ → $\\ce{HCl(aq)}$, hydrochloric acid'],
            ['-ate', '-ic acid', 'nitrate, $\\ce{NO3-}$ → $\\ce{HNO3(aq)}$, nitric acid'],
            ['-ite', '-ous acid', 'nitrite, $\\ce{NO2-}$ → $\\ce{HNO2(aq)}$, nitrous acid'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: '-ate to -ic, -ite to -ous', md: '"I *ate* something *ic*ky, but the b*ite* was delici*ous*." The stem can grow: sulf**ur**ic, sulf**ur**ous, phosph**or**ic. Per- and hypo- stay: perchloric, hypochlorous.' },
      ],
      lines: [
        { say: 'The classical name comes from the ending of the anion’s name.', show: 't' },
        { say: 'An anion like chloride gives an acid whose name starts with hydro: hydrochloric acid.', focus: 't.0' },
        { say: 'An anion like nitrate gives an acid like nitric acid. An anion like nitrite gives an acid like nitrous acid.', focus: ['t.1', 't.2'] },
        { say: 'A memory aid: I ate something icky, but the bite was delicious.', show: 'tip', focus: 't' },
        { say: 'Sometimes the stem grows a little: sulfate gives sulfuric acid, sulfite gives sulfurous acid, and phosphate gives phosphoric acid. Per and hypo stay, as in perchloric acid and hypochlorous acid.' },
      ],
    },
    {
      chapter: 'Two examples',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'math', id: 'a', size: 'md', align: 'left', lines: ['\\text{Name } \\ce{H2SO3(aq)}', '\\text{anion: } \\ce{SO3^2-}\\text{, sulfite}', '\\text{-ite} \\rightarrow \\text{-ous: sulfurous acid}'] }],
      right: [{ kind: 'math', id: 'b', size: 'md', align: 'left', lines: ['\\text{Formula of phosphoric acid}', '\\text{from -ate: phosphate, } \\ce{PO4^3-}', '3{-} \\text{ needs 3 H: } \\ce{H3PO4(aq)}'] }],
      lines: [
        { say: 'Name H two S O three, aqueous. Its anion is S O three, two minus: sulfite.', caption: 'Name H₂SO₃(aq). Its anion is SO₃²⁻: sulfite.', show: ['a.0', 'a.1'], focus: ['a.0', 'a.1'] },
        { say: 'Sulfite, like nitrite, gives an acid like nitrous, and the stem grows: sulfurous acid.', show: 'a.2', focus: 'a.2' },
        { say: 'Now write the formula of phosphoric acid. An acid like nitric comes from an anion like nitrate: here, phosphate, P O four, three minus.', caption: 'Now write the formula of phosphoric acid. An acid like nitric comes from an anion like nitrate: here, phosphate, PO₄³⁻.', show: ['b.0', 'b.1'], focus: ['b.0', 'b.1'] },
        { say: 'A charge of three minus needs three hydrogens: H three P O four, aqueous.', caption: 'A charge of 3− needs three hydrogens: H₃PO₄(aq).', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'IUPAC names',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'IUPAC name', md: '**"aqueous hydrogen"** + the anion’s name. No prefixes: $\\ce{H2SO4(aq)}$ is aqueous hydrogen sulfate, not aqueous dihydrogen sulfate.' },
        {
          kind: 'table',
          id: 't',
          head: ['Formula', 'Classical name', 'IUPAC name'],
          rows: [
            ['$\\ce{HCl(aq)}$', 'hydrochloric acid', 'aqueous hydrogen chloride'],
            ['$\\ce{HNO3(aq)}$', 'nitric acid', 'aqueous hydrogen nitrate'],
            ['$\\ce{H2SO4(aq)}$', 'sulfuric acid', 'aqueous hydrogen sulfate'],
            ['$\\ce{CH3COOH(aq)}$', 'acetic acid', 'aqueous hydrogen acetate'],
          ],
        },
      ],
      lines: [
        { say: 'The eye-you-pack name is even simpler: write aqueous hydrogen, then the anion’s name.', caption: 'The IUPAC name is even simpler: write aqueous hydrogen, then the anion’s name.', show: 'key' },
        { say: 'So nitric acid, from nitrate, is aqueous hydrogen nitrate, and acetic acid, from acetate, is aqueous hydrogen acetate.', show: 't', focus: ['t.1', 't.3'] },
        { say: 'Acids are named like ionic compounds, without prefixes. Sulfuric acid is aqueous hydrogen sulfate, not aqueous dye-hydrogen sulfate.', caption: 'Acids are named like ionic compounds, without prefixes. Sulfuric acid is aqueous hydrogen sulfate, not aqueous dihydrogen sulfate.', focus: 't.2' },
        { say: 'The word aqueous also tells the acid apart from the hydrogen sulfate ion, found in compounds such as sodium hydrogen sulfate.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the classical name of $\\ce{HNO2(aq)}$?',
          choices: ['nitric acid', 'hydronitrous acid', 'hydronitric acid', 'nitrous acid'],
          answer: 3,
          working: 'The anion is $\\ce{NO2-}$, nitrite. An -ite anion gives an -ous acid: nitrous acid.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the classical name of H N O two, aqueous? Pause the video and try it.', caption: 'Your turn. What is the classical name of HNO₂(aq)? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, nitrous acid. The anion is N O two minus, nitrite, and nitrite gives nitrous acid. Choice A, nitric acid, comes from nitrate, which has one more oxygen. And hydro is only for anions like chloride.', caption: 'The answer is D, nitrous acid. The anion is NO₂⁻, nitrite, and nitrite gives nitrous acid. Choice A, nitric acid, comes from nitrate, which has one more oxygen. And hydro- is only for anions like chloride.', show: 'q.answer' },
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
            'An acid is a hydrogen compound dissolved in water, written with (aq).',
            'Classical names: ‑ide → hydro‑…‑ic acid, ‑ate → ‑ic acid, ‑ite → ‑ous acid.',
            'IUPAC names: "aqueous hydrogen" + the anion’s name, with no prefixes.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For naming, an acid is a hydrogen compound dissolved in water.', show: 'sum.0' },
        { say: 'Its classical name comes from the anion: chloride gives hydrochloric acid, nitrate gives nitric acid, and nitrite gives nitrous acid.', show: 'sum.1' },
        { say: 'Its eye-you-pack name is aqueous hydrogen, then the anion’s name. That completes this lesson. Next, you will see how strongly each atom in a bond pulls on the shared electrons.', caption: 'Its IUPAC name is aqueous hydrogen, then the anion’s name. That completes this lesson. Next, you will see how strongly each atom in a bond pulls on the shared electrons.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
