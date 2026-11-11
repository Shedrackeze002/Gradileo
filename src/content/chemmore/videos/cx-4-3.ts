import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-4-3',
  lessonId: 'cx-4-3',
  title: 'Potable Water and Waste Water',
  thumbnail: false,
  summary:
    'Potable water is safe to drink but not pure: it still contains dissolved substances. Fresh water is filtered and sterilised; sea water is desalinated by distillation or reverse osmosis, which takes much more energy; and waste water is screened, settled and treated by bacteria before it is returned to rivers.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Earth’s Atmosphere and Resources', title: 'Potable Water and Waste Water', subtitle: 'From the rain, the sea and the drain to the tap' }],
      lines: [
        { say: 'The water from your tap is safe to drink, but it is not pure. And some of it may once have gone down a drain.', show: 'title' },
        { say: 'In this lesson, you will see how potable water is made from fresh water, from sea water, and from waste water.' },
      ],
    },
    {
      chapter: 'Potable water',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Potable water', md: 'Water that is **safe to drink**. It has low levels of dissolved salts and microbes, but it is **not pure**: it still contains dissolved substances.' }],
      lines: [
        { say: 'Potable water is water that is safe to drink. It has low levels of dissolved salts and microbes.', show: 'def' },
        { say: 'But in chemistry, pure means a single substance. Tap water contains dissolved substances, so it is potable, not pure.' },
      ],
    },
    {
      chapter: 'From fresh water',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Choose a source: rain collected in lakes, rivers or the ground', 'Filter it through beds to remove solids', 'Sterilise it with chlorine, ozone or ultraviolet light to kill microbes'] }],
      lines: [
        { say: 'In much of Britain, potable water comes from fresh water: rain that collects in lakes, reservoirs, rivers and the ground.', show: 'b.0' },
        { say: 'It is passed through filter beds to remove solids.', show: 'b.1' },
        { say: 'Then it is sterilised, with chlorine, ozone or ultraviolet light, to kill microbes.', show: 'b.2' },
      ],
    },
    {
      chapter: 'From sea water',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Desalination', md: 'Removing the dissolved salts from salty water.' },
        { kind: 'table', id: 't', head: ['Method', 'How it works'], rows: [['Distillation', 'Boil the water, then condense the steam; the salt is left behind'], ['Reverse osmosis', 'Force the water at high pressure through a membrane that stops the ions']] },
      ],
      lines: [
        { say: 'Where fresh water is scarce, sea water can be desalinated, which means removing the dissolved salts.', show: 'def' },
        { say: 'In distillation, the water is boiled and the steam is condensed, leaving the salt behind.', show: 't.0', focus: 't.0' },
        { say: 'In reverse osmosis, the water is forced at high pressure through a membrane that lets water molecules through but not the ions. Both methods need a great deal of energy.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Treating waste water',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Screening removes large objects and grit', 'Sedimentation separates sludge from effluent', 'Bacteria break down the effluent (aerobic) and the sludge (anaerobic)'] }],
      lines: [
        { say: 'Sewage from homes, farms and factories must be treated before it goes back to a river. First, screening removes large objects and grit.', show: 'b.0' },
        { say: 'In sedimentation tanks, the solids settle as sludge, leaving a liquid called effluent.', show: 'b.1' },
        { say: 'Bacteria then break down the effluent, using air, and the sludge, without air. The sludge can even give off methane, which is used as a fuel.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Filtering does not remove salt', md: 'Salt is **dissolved**, so its ions pass straight through a filter. Removing it needs distillation or reverse osmosis.' }],
      lines: [{ say: 'A common mistake is to think that filtering removes salt. Salt is dissolved, so its ions pass straight through a filter. You need distillation or reverse osmosis.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which source of potable water usually needs the **most** energy to treat?',
          choices: ['Sea water', 'Rain water from a reservoir', 'Water from a river', 'Ground water from a well'],
          answer: 0,
          working: 'Sea water must be **desalinated**, by boiling it or by forcing it through a membrane at high pressure.',
        },
      ],
      lines: [
        { say: 'Your turn. Which source of potable water usually needs the most energy to treat? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, sea water. Desalination means boiling the water or pumping it at high pressure, and both use far more energy than filtering and sterilising fresh water.', show: 'q.answer' },
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
          items: ['Potable water is safe to drink, but not pure.', 'Fresh water is filtered and sterilised.', 'Sea water is desalinated: distillation or reverse osmosis.', 'Waste water is screened, settled and treated by bacteria.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Potable water is safe to drink, but it is not pure.', show: 'sum.0' },
        { say: 'Fresh water is filtered and sterilised.', show: 'sum.1' },
        { say: 'Sea water is desalinated, by distillation or reverse osmosis, which takes a lot of energy.', show: 'sum.2' },
        { say: 'And waste water is screened, settled, and broken down by bacteria before it returns to a river.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
