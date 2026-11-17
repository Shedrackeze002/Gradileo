import { ATOM } from '@/video/reactions.ts';
import type { Explainer, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts). A hydrogen ion that meets a hydroxide
// ion joins it as a water molecule, giving out heat; the sodium and chloride ions take no part.

const { H, O } = ATOM;
const ION = { n: 8, bond: 0.15, heavy: 0 } as const;

/** Hydrochloric acid and sodium hydroxide solution, just mixed: they react once the clip starts. */
const mixing: ParticlesEl = {
  kind: 'particles',
  id: 'n',
  boxes: [
    {
      id: 'b',
      state: 'gas',
      width: 11,
      height: 9,
      temp: 0.5,
      waits: true,
      // 0 hydrogen ion, 1 chloride ion, 2 sodium ion, 3 and 4 a hydroxide ion's O and H,
      // 5 and 6 the hydrogen ion and the oxygen once they are water.
      kinds: [{ ...H, n: 8, name: 'hydrogen ion' }, { ...ION, tone: 'good', name: 'chloride ion' }, { ...ION, tone: 'brand', name: 'sodium ion' }, O, H, H, O],
      molecules: [{ atoms: [3, 4], n: 8 }],
      reactions: [{ a: 0, b: 3, to: [5, 6], join: true, heat: 0.12 }],
      tally: { kinds: [6], label: 'water molecules' },
      label: 'acid + alkali',
    },
  ],
  clips: { go: { phases: [{ dur: 1, release: ['b'] }, { dur: 13 }] } },
  thermometers: true,
  // Checked in Chromium with the voiced timing: every hydrogen ion is used up, as the narration says.
  speed: 2,
  seed: 9,
  height: 440,
};

const video: Explainer = {
  id: 'c9-4-3',
  lessonId: 'c9-4-3',
  title: 'Neutralization',
  thumbnail: 'n',
  summary:
    'Neutralization is the reaction of an acid with a base to make a salt and water, as hydrogen ions and hydroxide ions join to make water. The salt takes its first name from the metal in the base and its second from the acid. Antacids, lime for soil and remedies for stings all use neutralization.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Acids and Bases', title: 'Neutralization', subtitle: 'Acid + base → salt + water' }],
      lines: [
        { say: 'Add an alkali to an acid a little at a time, and something remarkable happens. The acid and the alkali cancel each other out.', show: 'title' },
        { say: 'In this video, you will learn what neutralization makes, how to name the salt, and where neutralization is at work in everyday life.' },
      ],
    },
    {
      chapter: 'Neutralization',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'md', lines: ['\\text{acid} + \\text{base} \\rightarrow \\text{salt} + \\text{water}', '\\ce{H+ + OH- -> H2O}'] },
        {
          kind: 'table',
          id: 'salts',
          head: ['Acid', 'Makes salts called', 'Example'],
          rows: [
            ['hydrochloric acid', 'chlorides', 'sodium chloride'],
            ['sulfuric acid', 'sulfates', 'copper sulfate'],
            ['nitric acid', 'nitrates', 'potassium nitrate'],
          ],
        },
      ],
      lines: [
        { say: 'Neutralization is the reaction of an acid with a base. It makes a salt and water.', show: 'eq.0' },
        { say: 'What really happens is that the hydrogen ions from the acid and the hydroxide ions from the alkali join to make water.', show: 'eq.1' },
        { say: 'The salt takes its first name from the metal in the base, and its second name from the acid.', show: 'salts' },
        { say: 'Hydrochloric acid makes chlorides, sulfuric acid makes sulfates, and nitric acid makes nitrates.', show: ['salts.0', 'salts.1', 'salts.2'], focus: 'salts.2' },
        { say: 'So sulfuric acid and magnesium oxide make magnesium sulfate and water. And remember, in chemistry, a salt is any compound made this way. Table salt is just one of them.' },
      ],
    },
    {
      chapter: 'Neutralization up close',
      layout: 'center',
      main: [mixing],
      lines: [
        { say: 'Let’s zoom in as hydrochloric acid and sodium hydroxide solution are mixed. The acid gives hydrogen ions, in yellow, and chloride ions, in green.', show: ['n', 'n.labels', 'n.thermo'] },
        { say: 'The alkali gives sodium ions, in purple, and hydroxide ions: a red oxygen joined to a hydrogen.' },
        { say: 'Each time a hydrogen ion meets a hydroxide ion, they join to make a water molecule. Heat is given out, so the mixture warms up.', play: 'n.go', show: 'n.tally' },
        { say: 'The sodium and chloride ions do not change. They are left in the water as the salt, sodium chloride. With equal amounts of acid and alkali, every hydrogen ion is used up, and the solution is neutral.' },
      ],
    },
    {
      chapter: 'Everyday neutralization',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'uses',
          head: ['Problem', 'Neutralized with'],
          rows: [
            ['indigestion (too much stomach acid)', 'antacid tablets, a base'],
            ['acidic soil', 'lime'],
            ['bee sting (acidic)', 'baking soda, a weak base'],
            ['wasp sting (alkaline)', 'vinegar, a weak acid'],
            ['acid from bacteria on teeth', 'slightly alkaline toothpaste'],
          ],
        },
      ],
      lines: [
        { say: 'Neutralization is at work all around you.', show: 'uses' },
        { say: 'Indigestion is caused by too much stomach acid, so antacid tablets contain a base, such as magnesium hydroxide.', show: 'uses.0', focus: 'uses.0' },
        { say: 'Farmers spread lime on acidic soil, so crops can grow.', show: 'uses.1', focus: 'uses.1' },
        { say: 'A bee sting is acidic, so it is soothed with baking soda, a weak base. A wasp sting is alkaline, so it is soothed with vinegar, a weak acid.', show: ['uses.2', 'uses.3'], focus: 'uses.3' },
        { say: 'And bacteria on your teeth make acids, so toothpaste is slightly alkaline.', show: 'uses.4', focus: 'uses.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which salt is made when nitric acid neutralizes potassium hydroxide?',
          choices: ['potassium chloride', 'potassium sulfate', 'potassium nitrate', 'hydrogen nitrate'],
          answer: 2,
          working: 'The metal, potassium, comes from the base; nitric acid makes nitrates.',
        },
      ],
      lines: [
        { say: 'Your turn. Which salt is made when nitric acid neutralizes potassium hydroxide? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, potassium nitrate. The metal, potassium, comes from the base, and nitric acid makes nitrates.', show: 'q.answer' },
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
            'Acid + base → salt + water; $\\ce{H+}$ and $\\ce{OH-}$ make water.',
            'The metal comes from the base; the acid gives chlorides, sulfates or nitrates.',
            'Antacids, lime and sting remedies all use neutralization.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An acid and a base react to make a salt and water, as hydrogen ions and hydroxide ions join to make water.', show: 'sum.0' },
        { say: 'The salt’s first name comes from the metal in the base, and its second from the acid.', show: 'sum.1' },
        { say: 'And antacids, lime for soil and remedies for stings all use neutralization. That completes Chemistry 9. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
