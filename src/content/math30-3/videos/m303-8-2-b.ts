import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm303-8-2-b',
  lessonId: 'm303-8-2',
  title: 'Leasing and Leasing to Buy, Part 2: Kilometre Allowances',
  thumbnailTitle: 'Kilometre Allowances',
  thumbnail: 'km',
  summary: 'A lease includes a kilometre allowance, and every kilometre over it costs an excess kilometre charge when the vehicle is returned. Excess km = odometer − yearly allowance × years: a 3-year lease allowing 20,000 km a year, returned at 71,400 km, is 11,400 km over, which at 0.15 dollars a kilometre is 1,710.00 dollars, raising the total cost from 19,370.00 to 21,080.00 dollars.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vehicles and Small Business · Part 2', title: 'Kilometre Allowances', subtitle: 'The cost of driving too much' }],
      lines: [
        { say: 'A vehicle lease lets you drive only so far. Go over the limit, and you pay for every extra kilometre when you hand the vehicle back.', show: 'title' },
        { say: 'In this video, you will find the excess kilometre charge at the end of a lease, and the new total cost of the lease.' },
      ],
    },
    {
      chapter: 'The kilometre allowance',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Kilometre allowance', md: 'A lease includes a **kilometre allowance**, such as 20,000 km a year. Every kilometre over the allowance costs an **excess kilometre charge**, paid when the vehicle is returned.' },
        { kind: 'text', id: 't', size: 'md', md: 'The dealer may also charge for damage beyond normal wear and tear, and a fee when you return the vehicle.' },
      ],
      lines: [
        { say: 'Every lease includes a kilometre allowance: the distance you may drive, such as 20,000 kilometres a year.', show: 'def' },
        { say: 'Every kilometre over the allowance costs an excess kilometre charge. You pay it when you return the vehicle, so it is easy to forget when you sign.' },
        { say: 'The dealer may also charge for damage beyond normal wear and tear, and a fee for returning the vehicle. Every question tells you the amounts.', show: 't' },
      ],
    },
    {
      chapter: 'Driving too much',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Maya’s 3-year lease allows 20,000 km a year and charges \\$0.15 for each kilometre over. When Maya returns the SUV, the odometer shows 71,400 km. The lease cost \\$19,370.00 before this charge.' },
        figure('km', [
          numberLine({
            min: 0,
            max: 80,
            step: 10,
            length: 12,
            spans: [
              { id: 'allow', from: 0, to: 60, tone: 'good', label: '\\text{allowance: } 60{,}000 \\text{ km}' },
              { id: 'over', from: 60, to: 71.4, tone: 'bad', label: '11{,}400 \\text{ km over}' },
            ],
          }),
          { points: { unit: [6, -0.85] }, items: [{ kind: 'label', id: 'unit', at: 'unit', tex: '\\text{thousands of kilometres}', tone: 'muted', place: 'below', group: 'axis' }] },
        ], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{allowance: } 20{,}000 \\times 3 = 60{,}000 \\text{ km}', '\\text{over: } 71{,}400 - 60{,}000 = 11{,}400 \\text{ km}', '\\text{charge: } 11{,}400 \\times 0.15 = 1{,}710.00'] },
      ],
      lines: [
        { say: 'Maya’s three-year lease allows 20,000 kilometres a year, and charges fifteen cents for each kilometre over. When Maya returns the SUV, the odometer shows 71,400 kilometres. What is the excess kilometre charge?', show: 'p' },
        { say: 'First, find the allowance for the whole lease. It is 20,000 kilometres a year, for three years: 20,000 times three is 60,000 kilometres.', show: ['m.0', 'km.axis', 'km.allow'], focus: ['m.0', 'km.allow'] },
        { say: 'Maya drove 71,400 kilometres. That is 71,400 minus 60,000, or 11,400 kilometres over the allowance.', show: ['m.1', 'km.over'], focus: ['m.1', 'km.over'] },
        { say: 'Each of those kilometres costs fifteen cents: 11,400 times 0.15 is 1,710 dollars.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The new total',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['19{,}370.00 + 1{,}710.00 = 21{,}080.00'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Plan your driving', md: 'Maya drove $71{,}400 \\div 3 = 23{,}800$ km a year. A driver who knows they drive that much can choose a lease with a bigger allowance, or think about buying.' },
      ],
      lines: [
        { say: 'Before this charge, the lease cost 19,370 dollars. Add the excess kilometre charge: 19,370 plus 1,710 is 21,080 dollars.', show: 'm', focus: 'm' },
        { say: 'So driving too much added 1,710 dollars to the cost of the lease.' },
        { say: 'Maya drove 71,400 divided by three, or 23,800 kilometres a year. Someone who drives that much can choose a lease with a bigger allowance, or think about buying instead.', show: 'key' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the yearly allowance', md: 'The allowance is **per year**. Multiply by the number of years before you compare it with the odometer.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{(71{,}400 - 20{,}000) \\times 0.15 = 7{,}710.00}', '\\good{(71{,}400 - 60{,}000) \\times 0.15 = 1{,}710.00}'] },
      ],
      lines: [
        { say: 'A common mistake is to compare the odometer with the yearly allowance.', show: 'oops' },
        { say: '71,400 minus 20,000 is 51,400 kilometres, and the charge would be 7,710 dollars, far too high.', show: 'm.0', focus: 'm.0' },
        { say: 'The allowance is per year, so multiply it by the number of years first: 60,000 kilometres for the whole lease, and a charge of 1,710 dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 4-year lease allows 18,000 km a year and charges \\$0.12 for each kilometre over. At the end, the odometer shows 79,500 km. What is the excess kilometre charge?',
          choices: ['\\$7,380.00', '\\$9,540.00', '\\$900.00', '\\$90.00'],
          answer: 2,
          working: 'Allowance: $18{,}000 \\times 4 = 72{,}000$ km. Over: $79{,}500 - 72{,}000 = 7{,}500$ km. Charge: $7{,}500 \\times 0.12 = 900.00$.',
        },
      ],
      lines: [
        { say: 'Your turn. A four-year lease allows 18,000 kilometres a year, and charges twelve cents for each kilometre over. At the end, the odometer shows 79,500 kilometres. What is the excess kilometre charge? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 900 dollars. The allowance is 18,000 times four, or 72,000 kilometres, so the car went 7,500 kilometres over. 7,500 times 0.12 is 900. Choice A compares the odometer with only one year’s allowance.', show: 'q.answer' },
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
            'Allowance for the lease $=$ yearly allowance $\\times$ years.',
            'Excess km $=$ odometer $-$ allowance; charge $=$ excess km $\\times$ rate per km.',
            'Add the charge to the total cost of the lease.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The allowance for the whole lease is the yearly allowance times the number of years.', show: 'sum.0' },
        { say: 'The excess kilometres are the odometer reading minus that allowance, and the charge is the excess kilometres times the rate per kilometre.', show: 'sum.1' },
        { say: 'Add the charge to the total cost of the lease. In part three, we keep the vehicle at the end of the lease by buying it. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
