import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-4-6-c',
  lessonId: 'c30-4-6',
  title: 'Ka and Kb, Part 3: Comparing Acids and Bases',
  thumbnailTitle: 'Comparing Acids and Bases',
  thumbnail: false,
  summary:
    'The largest Ka belongs to the strongest acid, which gives the lowest pH at the same concentration, and the smallest Ka to the weakest acid, whose conjugate base is the strongest base; pKa = −log Ka, so a smaller pKa means a stronger acid. An amphiprotic ion such as the hydrogen carbonate ion is basic when its Kb, found from the Ka of its conjugate acid, is larger than its own Ka.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 3', title: 'Comparing Acids and Bases', subtitle: 'Reading strength from Ka and Kb' }],
      lines: [
        {
          say: 'Given a list of K A values, which acid gives the lowest p H? Which conjugate base is the strongest? And is a solution of baking soda acidic or basic?',
          caption: 'Given a list of Ka values, which acid gives the lowest pH? Which conjugate base is the strongest? And is a solution of baking soda acidic or basic?',
          show: 'title',
        },
        { say: 'This part answers all three questions with K A and K B.', caption: 'This part answers all three questions with Ka and Kb.' },
      ],
    },
    {
      chapter: 'Comparing with Ka',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'The **largest** $K_a$ belongs to the strongest acid, which at the same concentration gives the **lowest** pH.',
            'The **smallest** $K_a$ belongs to the weakest acid, whose conjugate base is the **strongest** base.',
            'The weakest base, with the smallest $K_b$, has the strongest conjugate acid.',
          ],
        },
      ],
      lines: [
        {
          say: 'The acid with the largest K A is the strongest. At the same concentration, it makes the most hydronium ions, so it gives the lowest p H.',
          caption: 'The acid with the largest Ka is the strongest. At the same concentration, it makes the most hydronium ions, so it gives the lowest pH.',
          show: 'b.0',
        },
        { say: 'The smallest K A belongs to the weakest acid, whose conjugate base is the strongest base.', caption: 'The smallest Ka belongs to the weakest acid, whose conjugate base is the strongest base.', show: 'b.1' },
        { say: 'And the weakest base, with the smallest K B, has the strongest conjugate acid.', caption: 'And the weakest base, with the smallest Kb, has the strongest conjugate acid.', show: 'b.2' },
      ],
    },
    {
      chapter: 'The strongest conjugate base',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Acid', '$K_a$ at $25^\\circ\\text{C}$'],
          rows: [
            ['methanoic acid, $\\ce{HCOOH}$', '$1.8 \\times 10^{-4}$'],
            ['hypochlorous acid, $\\ce{HClO}$', '$4.0 \\times 10^{-8}$'],
            ['benzoic acid, $\\ce{C6H5COOH}$', '$6.3 \\times 10^{-5}$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['K_b(\\ce{ClO-}) = \\dfrac{1.0 \\times 10^{-14}}{4.0 \\times 10^{-8}} = \\good{2.5 \\times 10^{-7}}'] },
      ],
      lines: [
        { say: 'Of these three weak acids, which has the strongest conjugate base?', show: 't' },
        {
          say: 'The weakest acid has the smallest K A: hypochlorous acid, at four point zero times ten to the minus eight.',
          caption: 'The weakest acid has the smallest Ka: hypochlorous acid, at 4.0 × 10⁻⁸.',
          focus: 't.1',
        },
        {
          say: 'So its conjugate base, the hypochlorite ion, has the largest K B: K W over that K A, which is two point five times ten to the minus seven.',
          caption: 'So its conjugate base, the hypochlorite ion, has the largest Kb: Kw over that Ka, which is 2.5 × 10⁻⁷.',
          show: 'm',
          focus: 'm',
        },
      ],
    },
    {
      chapter: 'pKa',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'pKa',
          md: '$\\text{p}K_a = -\\log K_a$, just as $\\text{pH} = -\\log[\\ce{H3O+}]$. A **smaller** $\\text{p}K_a$ means a **larger** $K_a$ and a stronger acid.',
        },
        {
          kind: 'table',
          id: 't',
          head: ['Acid', '$K_a$', '$\\text{p}K_a$'],
          rows: [
            ['hydrofluoric acid, $\\ce{HF}$', '$6.6 \\times 10^{-4}$', '$3.18$'],
            ['acetic acid, $\\ce{CH3COOH}$', '$1.8 \\times 10^{-5}$', '$4.74$'],
            ['hydrocyanic acid, $\\ce{HCN}$', '$6.2 \\times 10^{-10}$', '$9.21$'],
          ],
        },
      ],
      lines: [
        {
          say: 'Chemists often write p K A, the negative log of K A, just as p H is the negative log of the hydronium ion concentration.',
          caption: 'Chemists often write pKa, the negative log of Ka, just as pH is the negative log of the hydronium ion concentration.',
          show: 'def',
        },
        {
          say: 'A smaller p K A means a larger K A, and a stronger acid. It is three point one eight for hydrofluoric acid, four point seven four for acetic acid, and nine point two one for hydrocyanic acid.',
          caption: 'A smaller pKa means a larger Ka, and a stronger acid. It is 3.18 for hydrofluoric acid, 4.74 for acetic acid, and 9.21 for hydrocyanic acid.',
          show: 't',
        },
      ],
    },
    {
      chapter: 'Amphiprotic ions',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'At $25^\\circ\\text{C}$, $K_a$ for $\\ce{H2CO3}$ is $4.5 \\times 10^{-7}$, and $K_a$ for $\\ce{HCO3-}$ is $4.7 \\times 10^{-11}$. Is a solution of sodium hydrogen carbonate acidic or basic?',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{as a base: } K_b = \\dfrac{1.0 \\times 10^{-14}}{4.5 \\times 10^{-7}} = 2.2 \\times 10^{-8}', '\\text{as an acid: } K_a = 4.7 \\times 10^{-11}', 'K_b > K_a\\text{, so the solution is } \\good{\\text{basic}}'],
        },
      ],
      lines: [
        {
          say: 'The hydrogen carbonate ion is amphiprotic: it can give a proton or take one. Which does it do more? Compare its K A with its K B.',
          caption: 'The hydrogen carbonate ion is amphiprotic: it can give a proton or take one. Which does it do more? Compare its Ka with its Kb.',
          show: 'q',
        },
        {
          say: 'As a base, the hydrogen carbonate ion forms carbonic acid. So its K B comes from the K A of carbonic acid: two point two times ten to the minus eight.',
          caption: 'As a base, the hydrogen carbonate ion forms carbonic acid. So its Kb comes from the Ka of carbonic acid: 2.2 × 10⁻⁸.',
          show: 'm.0',
          focus: 'm.0',
        },
        {
          say: 'As an acid, its own K A is four point seven times ten to the minus eleven, much smaller. It takes protons more than it gives them, so the solution is basic.',
          caption: 'As an acid, its own Ka is 4.7 × 10⁻¹¹, much smaller. It takes protons more than it gives them, so the solution is basic.',
          show: ['m.1', 'm.2'],
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Which Ka?',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Using the ion’s own Ka for its Kb',
          md: '$K_aK_b = K_w$ works only for a **conjugate pair**. The $K_b$ of $\\ce{HCO3-}$ pairs with the $K_a$ of $\\ce{H2CO3}$, the acid it turns into; its own $K_a$ pairs with the $K_b$ of $\\ce{CO3^2-}$.',
        },
      ],
      lines: [
        {
          say: 'Careful: use the K A of carbonic acid, the acid the ion turns into. K A times K B equals K W only for a conjugate pair.',
          caption: 'Careful: use the Ka of carbonic acid, the acid the ion turns into. Ka × Kb = Kw only for a conjugate pair.',
          show: 'oops',
        },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt:
            'At $25^\\circ\\text{C}$, $K_a$ for $\\ce{H3PO4}$ is $6.9 \\times 10^{-3}$ and $K_a$ for $\\ce{H2PO4-}$ is $6.2 \\times 10^{-8}$; $K_w = 1.0 \\times 10^{-14}$. Is a solution of sodium dihydrogen phosphate, $\\ce{NaH2PO4}$, acidic or basic?',
          choices: [
            'Basic, because its $K_b$ is greater than its $K_a$.',
            'Basic, because its $K_a$ is greater than its $K_b$.',
            'Acidic, because its $K_b$ is greater than its $K_a$.',
            'Acidic, because its $K_a$ is greater than its $K_b$.',
          ],
          answer: 3,
          working: 'As a base, $\\ce{H2PO4-}$ forms $\\ce{H3PO4}$: $K_b = \\dfrac{1.0 \\times 10^{-14}}{6.9 \\times 10^{-3}} = 1.4 \\times 10^{-12}$. Its own $K_a$, $6.2 \\times 10^{-8}$, is larger, so the solution is acidic.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Is a solution of sodium dye-hydrogen phosphate acidic or basic? Use the constants on the screen. Pause the video and try it.',
          caption: 'Your turn. Is a solution of sodium dihydrogen phosphate acidic or basic? Use the constants on the screen. Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D. As a base, the ion forms phosphoric acid, so its K B is K W over the K A of phosphoric acid: about one point four times ten to the minus twelve. Its own K A is larger, so the solution is acidic.',
          caption: 'The answer is D. As a base, the ion forms phosphoric acid, so its Kb is Kw over the Ka of phosphoric acid: about 1.4 × 10⁻¹². Its own Ka is larger, so the solution is acidic.',
          show: 'q.answer',
        },
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
            'Largest $K_a$: the strongest acid, with the lowest pH at the same concentration.',
            'Smallest $K_a$: the weakest acid, with the strongest conjugate base.',
            '$\\text{p}K_a = -\\log K_a$: the smaller the $\\text{p}K_a$, the stronger the acid.',
            'An amphiprotic ion is basic if its $K_b$ (from the $K_a$ of its conjugate acid) is larger than its own $K_a$.',
          ],
        },
      ],
      lines: [
        {
          say: 'Let’s sum up. The largest K A belongs to the strongest acid, which gives the lowest p H at the same concentration.',
          caption: 'Let’s sum up. The largest Ka belongs to the strongest acid, which gives the lowest pH at the same concentration.',
          show: 'sum.0',
        },
        { say: 'The smallest K A belongs to the weakest acid, whose conjugate base is the strongest.', caption: 'The smallest Ka belongs to the weakest acid, whose conjugate base is the strongest.', show: 'sum.1' },
        { say: 'The smaller the p K A, the stronger the acid.', caption: 'The smaller the pKa, the stronger the acid.', show: 'sum.2' },
        {
          say: 'And an amphiprotic ion is basic if its K B is larger than its own K A. That completes this lesson. Next, you will calculate the p H of weak acids and bases.',
          caption: 'And an amphiprotic ion is basic if its Kb is larger than its own Ka. That completes this lesson. Next, you will calculate the pH of weak acids and bases.',
          show: 'sum.3',
        },
      ],
    },
  ],
};

export default video;
