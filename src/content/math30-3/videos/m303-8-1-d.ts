import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm303-8-1-d',
  lessonId: 'm303-8-1',
  title: 'Buying a Vehicle, Part 4: Operating Costs',
  thumbnailTitle: 'Operating Costs',
  thumbnail: false,
  summary: 'Operating costs are fuel, insurance, maintenance and repairs, and registration. Fuel use in L/100 km gives litres = (km ÷ 100) × L/100 km: 1,800 km a month at 11.6 L/100 km and 1.49 dollars a litre is 208.8 L, or 311.11 dollars. A year of operating costs for the truck adds up to 6,706.34 dollars, about 558.86 dollars a month on top of the loan payment.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vehicles and Small Business · Part 4', title: 'Operating Costs', subtitle: 'Fuel, insurance, maintenance and registration' }],
      lines: [
        { say: 'The costs do not stop once a vehicle is bought. Every month, it needs fuel and insurance, and every year, repairs and registration.', show: 'title' },
        { say: 'In this video, you will find the cost of fuel from a vehicle’s fuel use, and add up a year of operating costs.' },
      ],
    },
    {
      chapter: 'Operating costs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Operating costs', md: '**Operating costs** are the costs of running a vehicle: fuel, insurance, maintenance and repairs, and registration.' },
        { kind: 'bullets', id: 'b', items: ['**Fuel**: depends on how far you drive.', '**Insurance**: often a monthly or yearly amount.', '**Maintenance and repairs**: oil changes, tires, brakes.', '**Registration**: a yearly fee to drive on public roads.'] },
      ],
      lines: [
        { say: 'Operating costs are the costs of running a vehicle, on top of buying it.', show: 'def' },
        { say: 'Fuel depends on how far you drive. Insurance is often a monthly or yearly amount.', show: ['b.0', 'b.1'] },
        { say: 'Maintenance and repairs include oil changes, tires and brakes. And registration is a yearly fee to drive on public roads.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'Litres per 100 kilometres',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Fuel use is given in **litres per 100 kilometres** (L/100 km). A truck that uses 11.6 L/100 km burns 11.6 L for every 100 km it travels.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{litres} = \\dfrac{\\text{distance in km}}{100} \\times \\text{L/100 km}', '\\text{fuel cost} = \\text{litres} \\times \\text{price per litre}'] },
      ],
      lines: [
        { say: 'Fuel use is often given in litres per hundred kilometres. A truck that uses 11.6 litres per hundred kilometres burns 11.6 litres for every hundred kilometres it travels.', show: 't' },
        { say: 'So first find how many hundreds of kilometres you drive: divide the distance by a hundred. Then multiply by the fuel use to get the litres.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the fuel cost is the litres, times the price per litre.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Fuel for a month',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Owen drives his truck about 1,800 km a month. It uses 11.6 L/100 km, and fuel costs \\$1.49 per litre. What does fuel cost him each month?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{hundreds of kilometres: } 1{,}800 \\div 100 = 18', '\\text{litres: } 18 \\times 11.6 = 208.8 \\text{ L}', '\\text{cost: } 208.8 \\times 1.49 = 311.112 \\approx 311.11'] },
      ],
      lines: [
        { say: 'Owen drives his truck about 1,800 kilometres a month. It uses 11.6 litres per hundred kilometres, and fuel costs one dollar and 49 cents per litre. What does fuel cost him each month?', show: 'p' },
        { say: 'First, the hundreds of kilometres: 1,800 divided by a hundred is eighteen.', show: 'm.0', focus: 'm.0' },
        { say: 'The truck burns 11.6 litres for each of those eighteen hundreds. Eighteen times 11.6 is 208.8 litres.', show: 'm.1', focus: 'm.1' },
        { say: 'Each litre costs 1.49, so the fuel costs 208.8 times 1.49, which is 311.112. Rounded to the cent, that is 311 dollars and 11 cents a month.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A year of operating costs',
      layout: 'split',
      leftWidth: 620,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Operating cost', 'Amount per year'],
          rows: [
            ['Fuel (2,505.6 L at \\$1.49)', '\\$3,733.34'],
            ['Insurance (\\$165 a month)', '\\$1,980.00'],
            ['Maintenance and repairs', '\\$900.00'],
            ['Registration', '\\$93.00'],
            ['**Total**', '**\\$6,706.34**'],
          ],
        },
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1{,}800 \\times 12 = 21{,}600 \\text{ km}', '216 \\times 11.6 = 2{,}505.6 \\text{ L}', '2{,}505.6 \\times 1.49 \\approx 3{,}733.34', '165 \\times 12 = 1{,}980'] },
      ],
      lines: [
        { say: 'Now a whole year. Owen drives 1,800 kilometres a month, so in twelve months he drives 21,600 kilometres.', show: 'm.0', focus: 'm.0' },
        { say: 'That is 216 hundreds of kilometres. Times 11.6, that is 2,505.6 litres of fuel. At 1.49 a litre, the fuel costs 3,733 dollars and 34 cents a year.', show: ['m.1', 'm.2', 't.0'], focus: ['m.1', 'm.2', 't.0'] },
        { say: 'Insurance is 165 dollars a month, which is 1,980 dollars a year.', show: ['m.3', 't.1'], focus: ['m.3', 't.1'] },
        { say: 'Add maintenance and repairs, 900 dollars, and registration, 93 dollars.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'In all, the truck costs 6,706 dollars and 34 cents a year to run.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'The real monthly cost',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{operating costs: } 6{,}706.34 \\div 12 \\approx 558.86 \\text{ a month}', '\\text{with the loan: } 558.86 + 564.16 = 1{,}123.02 \\text{ a month}'] },
      ],
      lines: [
        { say: 'What is that per month? 6,706.34 divided by twelve is about 558 dollars and 86 cents.', show: 'm.0', focus: 'm.0' },
        { say: 'And that is on top of Owen’s loan payment of 564.16. Together, the truck costs Owen about 1,123 dollars a month, about twice the loan payment.', show: 'm.1', focus: 'm.1' },
        { say: 'So before you buy, add the operating costs to the payment, and check that the total fits your budget.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Per 100 km, not per km', md: 'The fuel use is litres for every **100** km. Multiplying the distance itself by $11.6$ gives $1{,}800 \\times 11.6 = 20{,}880$ L, a hundred times too much.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{1{,}800 \\times 11.6 = 20{,}880 \\text{ L}} \\qquad \\good{18 \\times 11.6 = 208.8 \\text{ L}}'] },
      ],
      lines: [
        { say: 'A common mistake is to multiply the whole distance by the fuel use. 1,800 times 11.6 is 20,880 litres, enough to fill a tanker truck.', show: 'oops' },
        { say: 'The fuel use is litres for every hundred kilometres. Divide the distance by a hundred first: eighteen times 11.6 is 208.8 litres.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A car uses 7.5 L/100 km, and fuel costs \\$1.60 per litre. What does the fuel cost for a 640 km trip?',
          choices: ['\\$48.00', '\\$76.80', '\\$7,680.00', '\\$12.00'],
          answer: 1,
          working: '$640 \\div 100 = 6.4$, so $6.4 \\times 7.5 = 48$ L, and $48 \\times 1.60 = 76.80$. The fuel costs \\$76.80.',
        },
      ],
      lines: [
        { say: 'Your turn. A car uses 7.5 litres per hundred kilometres, and fuel costs one dollar and sixty cents per litre. What does the fuel cost for a 640 kilometre trip? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 76 dollars and eighty cents. 640 divided by a hundred is 6.4, and 6.4 times 7.5 is 48 litres. 48 litres at 1.60 a litre is 76.80. Choice C forgets to divide the distance by a hundred.', show: 'q.answer' },
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
            'Litres $=$ (km $\\div$ 100) $\\times$ L/100 km; fuel cost $=$ litres $\\times$ price per litre.',
            'Operating costs: fuel, insurance, maintenance and repairs, and registration.',
            'Add the operating costs to the payment to see the real monthly cost.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the litres of fuel, divide the distance by a hundred and multiply by the fuel use. Then multiply by the price per litre.', show: 'sum.0' },
        { say: 'Operating costs include fuel, insurance, maintenance and repairs, and registration.', show: 'sum.1' },
        { say: 'And add the operating costs to the loan payment to see what a vehicle really costs each month. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
