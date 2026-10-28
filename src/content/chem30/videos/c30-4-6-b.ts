import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-4-6-b',
  lessonId: 'c30-4-6',
  title: 'Ka and Kb, Part 2: The Link Through Water',
  thumbnailTitle: 'The Link Through Water',
  thumbnail: false,
  summary:
    'Water ionises slightly, and its ion product is Kw = [H₃O⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25 °C. Multiplying Ka of an acid by Kb of its conjugate base cancels everything but [H₃O⁺][OH⁻], so KaKb = Kw for any conjugate pair: Kb for the fluoride ion is 1.0 × 10⁻¹⁴ / 6.6 × 10⁻⁴ = 1.5 × 10⁻¹¹, and Ka for the ammonium ion is 5.6 × 10⁻¹⁰. The stronger an acid, the weaker its conjugate base.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 2', title: 'The Link Through Water', subtitle: '$K_a \\times K_b = K_w$' }],
      lines: [
        { say: 'Hydrofluoric acid is one of the stronger weak acids. How strong a base is the fluoride ion it leaves behind?', show: 'title' },
        {
          say: 'One division answers it. This part links K A of an acid to K B of its conjugate base, through the ionisation of water.',
          caption: 'One division answers it. This part links Ka of an acid to Kb of its conjugate base, through the ionisation of water.',
        },
      ],
    },
    {
      chapter: 'The ion product of water',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{2H2O(l) <=> H3O+(aq) + OH-(aq)}', 'K_w = [\\ce{H3O+}][\\ce{OH-}]', '= 1.0 \\times 10^{-14} \\ \\text{at}\\ 25^\\circ\\text{C}'] },
      ],
      lines: [
        { say: 'Recall that water ionises slightly. Two water molecules form a hydronium ion and a hydroxide ion.', show: 'm.0' },
        {
          say: 'Its equilibrium constant is the ion product of water, K W: the hydronium times the hydroxide concentration.',
          caption: 'Its equilibrium constant is the ion product of water, Kw: the hydronium times the hydroxide concentration.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'At twenty-five degrees Celsius, K W is one point zero times ten to the minus fourteen, in pure water and in every aqueous solution.',
          caption: 'At 25 °C, Kw is 1.0 × 10⁻¹⁴, in pure water and in every aqueous solution.',
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Ka times Kb',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            'K_a \\times K_b = \\dfrac{[\\ce{H3O+}]\\bcancel{[\\ce{A-}]}}{\\cancel{[\\ce{HA}]}} \\times \\dfrac{\\cancel{[\\ce{HA}]}[\\ce{OH-}]}{\\bcancel{[\\ce{A-}]}}',
            '= [\\ce{H3O+}][\\ce{OH-}] = K_w',
            '\\good{K_b = \\dfrac{K_w}{K_a}} \\qquad \\good{K_a = \\dfrac{K_w}{K_b}}',
          ],
        },
      ],
      lines: [
        {
          say: 'Multiply K A of an acid, H A, by K B of its conjugate base, A minus.',
          caption: 'Multiply Ka of an acid, HA, by Kb of its conjugate base, A⁻.',
          show: 'm.0',
        },
        {
          say: 'The concentrations of H A and A minus cancel, leaving the hydronium times the hydroxide concentration: K W.',
          caption: 'The concentrations of HA and A⁻ cancel, leaving the hydronium times the hydroxide concentration: Kw.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'So for any conjugate acid–base pair, K A times K B equals K W. Divide K W by one constant to find the other.',
          caption: 'So for any conjugate acid–base pair, Ka × Kb = Kw. Divide Kw by one constant to find the other.',
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'Three conjugate pairs',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Acid', '$K_a$', 'Conjugate base', '$K_b = K_w/K_a$'],
          rows: [
            ['$\\ce{HF}$', '$6.6 \\times 10^{-4}$', '$\\ce{F-}$', '$1.5 \\times 10^{-11}$'],
            ['$\\ce{CH3COOH}$', '$1.8 \\times 10^{-5}$', '$\\ce{CH3COO-}$', '$5.6 \\times 10^{-10}$'],
            ['$\\ce{HCN}$', '$6.2 \\times 10^{-10}$', '$\\ce{CN-}$', '$1.6 \\times 10^{-5}$'],
          ],
        },
        { kind: 'text', id: 'note', size: 'md', align: 'center', md: 'Values at $25^\\circ\\text{C}$, with $K_w = 1.0 \\times 10^{-14}$.' },
      ],
      lines: [
        {
          say: 'Here are three pairs. Because the product is fixed, K B gets larger as K A gets smaller: a stronger acid has a weaker conjugate base.',
          caption: 'Here are three pairs. Because the product is fixed, Kb gets larger as Ka gets smaller: a stronger acid has a weaker conjugate base.',
          show: ['t', 'note'],
        },
        {
          say: 'The weakest acid here, hydrocyanic acid, has the strongest conjugate base, the cyanide ion: the pattern you saw in the table of acid strengths.',
          focus: 't.2',
        },
      ],
    },
    {
      chapter: 'The fluoride ion',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'At $25^\\circ\\text{C}$, $K_a$ for hydrofluoric acid is $6.6 \\times 10^{-4}$. What is $K_b$ for the fluoride ion, to two significant figures?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['K_b = \\dfrac{K_w}{K_a} = \\dfrac{1.0 \\times 10^{-14}}{6.6 \\times 10^{-4}}', '= \\good{1.5 \\times 10^{-11}}'] },
      ],
      lines: [
        {
          say: 'Back to the fluoride ion. It is the conjugate base of hydrofluoric acid, whose K A is six point six times ten to the minus four.',
          caption: 'Back to the fluoride ion. It is the conjugate base of hydrofluoric acid, whose Ka is 6.6 × 10⁻⁴.',
          show: 'q',
        },
        {
          say: 'K B is K W over K A: one point zero times ten to the minus fourteen, over six point six times ten to the minus four. That is one point five times ten to the minus eleven.',
          caption: 'Kb is Kw over Ka: 1.0 × 10⁻¹⁴ over 6.6 × 10⁻⁴. That is 1.5 × 10⁻¹¹.',
          show: ['m.0', 'm.1'],
          focus: 'm.1',
        },
      ],
    },
    {
      chapter: 'The ammonium ion',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'At $25^\\circ\\text{C}$, $K_b$ for ammonia is $1.8 \\times 10^{-5}$. What is $K_a$ for the ammonium ion, $\\ce{NH4+}$, to two significant figures?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['K_a = \\dfrac{K_w}{K_b} = \\dfrac{1.0 \\times 10^{-14}}{1.8 \\times 10^{-5}}', '= \\good{5.6 \\times 10^{-10}}'] },
      ],
      lines: [
        {
          say: 'The link works the other way as well. K B for ammonia is one point eight times ten to the minus five, and the ammonium ion is its conjugate acid.',
          caption: 'The link works the other way as well. Kb for ammonia is 1.8 × 10⁻⁵, and the ammonium ion is its conjugate acid.',
          show: 'q',
        },
        {
          say: 'So K A for the ammonium ion is K W over K B: five point six times ten to the minus ten.',
          caption: 'So Ka for the ammonium ion is Kw over Kb: 5.6 × 10⁻¹⁰.',
          show: ['m.0', 'm.1'],
          focus: 'm.1',
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
          prompt: 'At $25^\\circ\\text{C}$, $K_a$ for nitrous acid, $\\ce{HNO2}$, is $5.6 \\times 10^{-4}$, and $K_w = 1.0 \\times 10^{-14}$. What is $K_b$ for the nitrite ion, $\\ce{NO2-}$?',
          choices: ['$5.6 \\times 10^{-18}$', '$5.6 \\times 10^{-4}$', '$1.8 \\times 10^{-11}$', '$1.8 \\times 10^{3}$'],
          answer: 2,
          working: '$K_b = \\dfrac{K_w}{K_a} = \\dfrac{1.0 \\times 10^{-14}}{5.6 \\times 10^{-4}} = 1.8 \\times 10^{-11}$',
        },
      ],
      lines: [
        {
          say: 'Your turn. K A for nitrous acid is five point six times ten to the minus four. What is K B for the nitrite ion? Pause the video and try it.',
          caption: 'Your turn. Ka for nitrous acid is 5.6 × 10⁻⁴. What is Kb for the nitrite ion? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C, one point eight times ten to the minus eleven: K W divided by K A. Choice A multiplies the two constants instead of dividing, and choice B gives the base the same constant as its acid.',
          caption: 'The answer is C, 1.8 × 10⁻¹¹: Kw divided by Ka. Choice A multiplies the two constants instead of dividing, and choice B gives the base the same constant as its acid.',
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
            '$K_w = [\\ce{H3O+}][\\ce{OH-}] = 1.0 \\times 10^{-14}$ at $25^\\circ\\text{C}$.',
            'For a conjugate pair, $K_aK_b = K_w$: $K_b = \\dfrac{K_w}{K_a}$ and $K_a = \\dfrac{K_w}{K_b}$.',
            'The stronger the acid, the weaker its conjugate base.',
          ],
        },
      ],
      lines: [
        {
          say: 'Let’s sum up. The ion product of water, K W, is one point zero times ten to the minus fourteen at twenty-five degrees Celsius.',
          caption: 'Let’s sum up. The ion product of water, Kw, is 1.0 × 10⁻¹⁴ at 25 °C.',
          show: 'sum.0',
        },
        {
          say: 'For a conjugate pair, K A times K B equals K W, so either constant gives the other.',
          caption: 'For a conjugate pair, Ka × Kb = Kw, so either constant gives the other.',
          show: 'sum.1',
        },
        { say: 'And the stronger the acid, the weaker its conjugate base. In part three, you will use these constants to compare acids and bases. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
