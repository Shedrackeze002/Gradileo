import type { Explainer } from '@/video/script.ts';

const DILUTE = 'When a solution is diluted, $c_1V_1 = c_2V_2$.';

const video: Explainer = {
  id: 'c20-3-5-b',
  lessonId: 'c20-3-5',
  title: 'Dilution, Part 2: Stock Solution and Water',
  thumbnailTitle: 'Stock Solution and Water',
  thumbnail: false,
  summary:
    'To plan a dilution, solve c₁V₁ = c₂V₂ for the volume of stock solution, V₁ = c₂V₂/c₁: 62.5 mL of a 6.00 mol/L stock makes 500 mL of a 0.750 mol/L solution. V₂ is the volume of the final solution, not of the water, so the water added is V₂ − V₁.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 2', title: 'Stock Solution and Water', subtitle: 'Planning a dilution' }],
      lines: [
        { say: 'You need five hundred millilitres of a dilute solution, and the shelf holds only a concentrated stock solution. How much of the stock do you measure out? And how much water do you add?', show: 'title' },
        { say: 'In part one, you found a new concentration. In this part, you will find the volume of stock solution, and then the volume of water.' },
      ],
    },
    {
      chapter: 'How much stock solution',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: `What volume of a $6.00\\ \\text{mol/L}$ stock solution is needed to make $500\\ \\text{mL}$ of a $0.750\\ \\text{mol/L}$ solution, to the nearest tenth? ${DILUTE}` },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['V_1 = \\dfrac{c_2V_2}{c_1}', 'V_1 = \\dfrac{0.750 \\times 500}{6.00} = \\good{62.5\\ \\text{mL}}', '\\text{Check: } \\dfrac{0.750}{6.00} = \\dfrac{1}{8}, \\quad 8 \\times 62.5 = 500'],
        },
      ],
      lines: [
        { say: 'What volume of a six point zero zero moles per litre stock solution is needed to make five hundred millilitres of a zero point seven five zero moles per litre solution?', caption: 'What volume of a 6.00 mol/L stock solution is needed to make 500 mL of a 0.750 mol/L solution?', show: 'q' },
        { say: 'When you plan a dilution, you know c two, V two and c one. The unknown is V one, the volume of stock solution: V one equals c two V two, over c one.', caption: 'When you plan a dilution, you know c₂, V₂ and c₁. The unknown is V₁, the volume of stock solution: V₁ = c₂V₂/c₁.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero point seven five zero times five hundred, over six point zero zero, is sixty-two point five millilitres.', caption: '0.750 × 500, over 6.00, is 62.5 mL.', show: 'm.1', focus: 'm.1' },
        { say: 'Check it. The concentration falls to one eighth of the stock’s, so the volume must be eight times larger. And eight times sixty-two point five is five hundred.', caption: 'Check it. The concentration falls to one eighth of the stock’s, so the volume must be eight times larger. And 8 × 62.5 = 500.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'How much water',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: `A student makes $450\\ \\text{mL}$ of a $0.300\\ \\text{mol/L}$ solution from a $1.75\\ \\text{mol/L}$ stock solution. What volume of water is added, to the nearest whole number? ${DILUTE}` },
        { kind: 'math', id: 'm', size: 'lg', lines: ['V_1 = \\dfrac{c_2V_2}{c_1} = \\dfrac{0.300 \\times 450}{1.75} = 77.1\\ \\text{mL}', '\\text{water} = V_2 - V_1 = 450 - 77.1 = 372.9\\ \\text{mL}', '\\text{water} \\approx \\good{373\\ \\text{mL}}'] },
      ],
      lines: [
        { say: 'A student makes four hundred fifty millilitres of a zero point three zero zero moles per litre solution, from a one point seven five moles per litre stock solution. What volume of water is added?', caption: 'A student makes 450 mL of a 0.300 mol/L solution, from a 1.75 mol/L stock solution. What volume of water is added?', show: 'q' },
        { say: 'Find the volume of stock solution first. Zero point three zero zero times four hundred fifty, over one point seven five, is seventy-seven point one millilitres.', caption: 'Find the volume of stock solution first. 0.300 × 450, over 1.75, is 77.1 mL.', show: 'm.0', focus: 'm.0' },
        { say: 'Now, V two is the volume of the final solution, not the volume of water. The final solution is the stock solution plus the water.', caption: 'Now, V₂ is the volume of the final solution, not the volume of water. The final solution is the stock solution plus the water.' },
        { say: 'So the water makes up the rest: V two minus V one. Four hundred fifty minus seventy-seven point one is three hundred seventy-two point nine, or three hundred seventy-three millilitres of water.', caption: 'So the water makes up the rest: V₂ − V₁. 450 − 77.1 = 372.9, or 373 mL of water.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'The final volume is not the water',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The final volume is not the water', md: 'The student does not add $450\\ \\text{mL}$ of water. $450\\ \\text{mL}$ is the volume of the **whole solution**, and $77.1\\ \\text{mL}$ of it is the stock solution. Only the remaining $373\\ \\text{mL}$ is water.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\underbrace{77.1\\ \\text{mL}}_{\\text{stock}} + \\underbrace{373\\ \\text{mL}}_{\\text{water}} \\approx \\underbrace{450\\ \\text{mL}}_{\\text{final solution}}'] },
      ],
      lines: [
        { say: 'A common slip is to add four hundred fifty millilitres of water. But four hundred fifty millilitres is the volume of the whole solution.', caption: 'A common slip is to add 450 mL of water. But 450 mL is the volume of the whole solution.', show: 'oops' },
        { say: 'Seventy-seven point one millilitres of it is the stock solution. Only the remaining three hundred seventy-three millilitres is water.', caption: '77.1 mL of it is the stock solution. Only the remaining 373 mL is water.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: `A student makes $250\\ \\text{mL}$ of a $0.400\\ \\text{mol/L}$ solution from a $2.00\\ \\text{mol/L}$ stock solution. What volume of water is added? ${DILUTE}`,
          choices: ['$50.0\\ \\text{mL}$', '$250\\ \\text{mL}$', '$1250\\ \\text{mL}$', '$200\\ \\text{mL}$'],
          answer: 3,
          working: '$V_1 = \\dfrac{0.400 \\times 250}{2.00} = 50.0\\ \\text{mL}$ of stock solution, so the water is $250 - 50.0 = 200\\ \\text{mL}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A student makes two hundred fifty millilitres of a zero point four zero zero moles per litre solution, from a two point zero zero moles per litre stock solution. What volume of water is added? Pause the video and try it.', caption: 'Your turn. A student makes 250 mL of a 0.400 mol/L solution, from a 2.00 mol/L stock solution. What volume of water is added? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, two hundred millilitres. The stock solution is zero point four times two hundred fifty, over two: fifty millilitres. Choice A is the stock, not the water, and choice B is the whole solution.', caption: 'The answer is D, 200 mL. The stock solution is 0.400 × 250, over 2.00: 50.0 mL. Choice A is the stock, not the water, and choice B is the whole solution.', show: 'q.answer' },
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
            'Volume of stock solution: $V_1 = \\dfrac{c_2V_2}{c_1}$.',
            'Check with the ratio: the volume grows by the same factor as the concentration falls.',
            '$V_2$ is the volume of the final solution. The water added is $V_2 - V_1$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The volume of stock solution is c two V two, over c one.', caption: 'Let’s sum up. The volume of stock solution is c₂V₂/c₁.', show: 'sum.0' },
        { say: 'Check it with the ratio: the volume grows by the same factor as the concentration falls.', show: 'sum.1' },
        { say: 'And V two is the volume of the final solution, so the water added is V two minus V one. In part three, you will describe a dilution by its dilution factor. See you there!', caption: 'And V₂ is the volume of the final solution, so the water added is V₂ − V₁. In part three, you will describe a dilution by its dilution factor. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
