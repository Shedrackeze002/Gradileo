import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-3-6-c',
  lessonId: 'c20-3-6',
  title: 'Acids, Bases and Neutralisation, Part 3: Acidic, Basic or Neutral?',
  thumbnailTitle: 'Acidic, Basic or Neutral?',
  thumbnail: false,
  summary:
    'A formula shows whether a solution is acidic, basic or neutral: acids such as HCl, HNO₃ and CH₃COOH form H₃O⁺ ions; hydroxides and ammonia form OH⁻ ions; salts such as NaCl and molecular compounds such as sucrose and ethanol form neither, so their solutions are neutral. An OH in a formula does not make a base, and an H does not make an acid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 3', title: 'Acidic, Basic or Neutral?', subtitle: 'Reading a formula' }],
      lines: [
        { say: 'Ethanol has O H in its formula, and ammonia has three hydrogen atoms. So is ethanol a base, and ammonia an acid?', caption: 'Ethanol has OH in its formula, and ammonia has three hydrogen atoms. So is ethanol a base, and ammonia an acid?', show: 'title' },
        { say: 'In this part, you will use the theory of part two to tell from a formula whether a solution is acidic, basic or neutral, and avoid the traps.' },
      ],
    },
    {
      chapter: 'What to look for',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Acidic: forms $\\ce{H3O+}$', 'Basic: forms $\\ce{OH-}$', 'Neutral: forms neither'],
          rows: [
            ['hydrochloric acid, $\\ce{HCl(aq)}$', 'sodium hydroxide, $\\ce{NaOH(aq)}$', 'sodium chloride, $\\ce{NaCl(aq)}$'],
            ['nitric acid, $\\ce{HNO3(aq)}$', 'potassium hydroxide, $\\ce{KOH(aq)}$', 'potassium nitrate, $\\ce{KNO3(aq)}$'],
            ['sulfuric acid, $\\ce{H2SO4(aq)}$', 'lithium hydroxide, $\\ce{LiOH(aq)}$', 'calcium chloride, $\\ce{CaCl2(aq)}$'],
            ['acetic acid, $\\ce{CH3COOH(aq)}$', 'barium hydroxide, $\\ce{Ba(OH)2(aq)}$', 'sucrose, $\\ce{C12H22O11(aq)}$'],
            ['hydrofluoric acid, $\\ce{HF(aq)}$', 'ammonia, $\\ce{NH3(aq)}$', 'ethanol, $\\ce{C2H5OH(aq)}$'],
          ],
        },
      ],
      lines: [
        { say: 'The theory tells you what to look for. Acids form hydronium ions in water. Hydroxides and ammonia form hydroxide ions. Substances that form neither are neutral.', show: 't' },
        { say: 'The acids are the ones named in lesson one point three: hydrochloric, nitric, sulfuric, acetic and hydrofluoric acid. Most of their formulas begin with H.', caption: 'The acids are the ones named in lesson 1.3: hydrochloric, nitric, sulfuric, acetic and hydrofluoric acid. Most of their formulas begin with H.', focus: ['t.0', 't.1', 't.2', 't.3', 't.4'] },
        { say: 'Acetic acid is written C H three C O O H, because only the last hydrogen, the one in the C O O H group, ionises.', caption: 'Acetic acid is written CH₃COOH, because only the last hydrogen, the one in the COOH group, ionises.', focus: 't.3' },
        { say: 'The bases are the metal hydroxides, such as sodium, potassium and barium hydroxide, and ammonia.', focus: 't' },
      ],
    },
    {
      chapter: 'Salts and molecules',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Salts** such as $\\ce{NaCl}$, $\\ce{KNO3}$ and $\\ce{CaCl2}$ form ions, so their solutions conduct, but the ions are neither $\\ce{H3O+}$ nor $\\ce{OH-}$.',
            '**Molecular compounds** such as sucrose and ethanol form no ions at all.',
            'Not every salt is neutral: some react with water to make an acidic or basic solution, as you will see in later chemistry courses.',
          ],
        },
      ],
      lines: [
        { say: 'Salts such as sodium chloride, potassium nitrate and calcium chloride form ions, so their solutions conduct. But the ions are neither hydronium nor hydroxide, so the solutions are neutral.', show: 'b.0' },
        { say: 'Molecular compounds such as sucrose and ethanol form no ions at all. Their solutions are neutral too.', show: 'b.1' },
        { say: 'Not every salt is neutral, though. Some react with water to make an acidic or basic solution, as you will see in later chemistry courses.', show: 'b.2' },
      ],
    },
    {
      chapter: 'An OH does not make a base',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'An OH does not make a base', md: 'Ethanol, $\\ce{C2H5OH}$, has OH in its formula, but it is a molecular compound: the OH is bonded into the molecule and never comes off as an $\\ce{OH-}$ ion, so ethanol is **neutral**. In the same way, an H in a formula does not make an acid: ammonia, $\\ce{NH3}$, is a **base**.' },
      ],
      lines: [
        { say: 'Back to ethanol. It has O H in its formula, but it is a molecular compound.', caption: 'Back to ethanol. It has OH in its formula, but it is a molecular compound.', show: 'oops' },
        { say: 'The O H is bonded into the molecule, and never comes off as a hydroxide ion. So ethanol is neutral, not basic.', caption: 'The OH is bonded into the molecule, and never comes off as a hydroxide ion. So ethanol is neutral, not basic.' },
        { say: 'In the same way, an H in a formula does not make an acid. Ammonia has three hydrogen atoms, and it is a base: it reacts with water to form hydroxide ions.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these solutions is basic?',
          choices: ['ethanol, $\\ce{C2H5OH(aq)}$', 'sodium chloride, $\\ce{NaCl(aq)}$', 'acetic acid, $\\ce{CH3COOH(aq)}$', 'ammonia, $\\ce{NH3(aq)}$'],
          answer: 3,
          working: 'Ammonia reacts with water to form $\\ce{OH-}$ ions. Ethanol and sodium chloride form neither $\\ce{H3O+}$ nor $\\ce{OH-}$, and acetic acid forms $\\ce{H3O+}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these solutions is basic? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, ammonia. It reacts with water to form hydroxide ions. Choice A, ethanol, is the trap: its O H never comes off as an ion, so it is neutral.', caption: 'The answer is D, ammonia. It reacts with water to form hydroxide ions. Choice A, ethanol, is the trap: its OH never comes off as an ion, so it is neutral.', show: 'q.answer' },
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
            'Acids, such as $\\ce{HCl}$ and $\\ce{CH3COOH}$, form $\\ce{H3O+}$: acidic.',
            'Hydroxides and ammonia form $\\ce{OH-}$: basic.',
            'Salts such as $\\ce{NaCl}$, and molecular compounds such as sucrose and ethanol, form neither: neutral.',
            'An OH in a formula does not make a base, and an H does not make an acid.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Acids, such as hydrochloric acid and acetic acid, form hydronium ions, so their solutions are acidic.', show: 'sum.0' },
        { say: 'Hydroxides and ammonia form hydroxide ions, so their solutions are basic.', show: 'sum.1' },
        { say: 'Salts such as sodium chloride, and molecular compounds such as sucrose and ethanol, form neither, so their solutions are neutral.', show: 'sum.2' },
        { say: 'And an O H in a formula does not make a base. In part four, you will see what happens when an acid and a base meet. See you there!', caption: 'And an OH in a formula does not make a base. In part four, you will see what happens when an acid and a base meet. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
