import type { Explainer } from '@/video/script.ts';
import { brownian, vapour } from './lib/cx-waec.ts';

const video: Explainer = {
  id: 'cx-14-2',
  lessonId: 'cx-14-2',
  title: 'Vapour Pressure, Boiling and Brownian Motion',
  thumbnail: 'bm',
  summary:
    'Saturated vapour pressure rises with temperature, and a liquid boils when its vapour pressure equals the external pressure, so lower pressure lowers the boiling point. Evaporation happens at the surface at any temperature, boiling throughout the liquid at one temperature. Brownian motion and diffusion are evidence that particles are always moving, and solids are ionic, metallic, covalent network or molecular.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Gases, Liquids and Solids', title: 'Vapour Pressure, Boiling and Brownian Motion', subtitle: 'Particles that never stop' }],
      lines: [
        { say: 'Water in an open dish slowly disappears, even on a cool day, while water in a pot on a fire bubbles away in minutes.', show: 'title' },
        { say: 'In this lesson, you will use vapour pressure to explain evaporation and boiling, and see the evidence that particles are always moving.' },
      ],
    },
    {
      chapter: 'Vapour above a liquid',
      layout: 'center',
      main: [vapour('vp')],
      lines: [
        { say: 'Here is a liquid in a closed flask. Its molecules have a spread of speeds, and the fastest ones near the surface break away into the space above as vapour, while others fall back.', show: ['vp', 'vp.thermo'] },
        { say: 'Now warm it. The molecules speed up, so many more of them are in the vapour at any moment, hitting the walls and pushing on them.', play: 'vp.warm' },
        { say: 'The pressure of the vapour when it is in balance with the liquid is the saturated vapour pressure. It rises as the temperature rises.' },
      ],
    },
    {
      chapter: 'When a liquid boils',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'b', tone: 'key', title: 'Boiling', md: 'A liquid boils when its saturated vapour pressure **equals the external pressure**.' },
        { kind: 'table', id: 't', head: ['Temperature (°C)', '70', '80', '90', '100'], rows: [['Vapour pressure of water (kPa)', '31.2', '47.4', '70.1', '101.3']] },
      ],
      lines: [
        { say: 'Evaporation happens at the surface, at any temperature. Boiling happens all through the liquid, at one temperature: when its vapour pressure equals the pressure outside.', show: 'b' },
        { say: 'Water’s vapour pressure reaches one hundred one point three kilopascals, the pressure at sea level, at one hundred degrees. That is why water boils there at one hundred degrees.', caption: 'Water’s vapour pressure reaches 101.3 kPa, the pressure at sea level, at 100 °C. That is why water boils there at 100 °C.', show: 't', focus: 't' },
        { say: 'On a high mountain, the air pressure might be only seventy point one kilopascals. The table shows water reaches that at ninety degrees, so it boils at ninety, and food cooks more slowly. A pressure cooker does the opposite.', caption: 'On a high mountain, the air pressure might be only 70.1 kPa. The table shows water reaches that at 90 °C, so it boils at 90 °C, and food cooks more slowly. A pressure cooker does the opposite.' },
      ],
    },
    {
      chapter: 'Brownian motion',
      layout: 'center',
      main: [brownian('bm')],
      lines: [
        { say: 'Under a microscope, pollen grains in water jiggle about in short, random jerks. Here is one grain among water molecules, drawn far bigger than they really are.', show: ['bm', 'bm.key'] },
        { say: 'Follow its path. The tiny molecules hit it unevenly from every side, so the grain is knocked one way, then another.', show: 'bm.trail' },
        { say: 'This is Brownian motion. The molecules themselves are far too small to see, but the zigzag of the grain is evidence that they are always moving. Diffusion is more evidence of the same thing.' },
      ],
    },
    {
      chapter: 'Kinds of solid',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind of solid', 'Particles and forces', 'Example'],
          rows: [
            ['Ionic', 'ions, strong attraction', 'sodium chloride'],
            ['Metallic', 'ions in a sea of electrons', 'copper'],
            ['Covalent network', 'one giant network of atoms', 'diamond'],
            ['Molecular', 'small molecules, weak forces', 'iodine, ice'],
          ],
        },
      ],
      lines: [
        { say: 'Solids are sorted by their particles and the forces between them. Ionic solids, such as sodium chloride, are ions held by strong attraction. Metallic solids are positive ions in a sea of electrons.', show: ['t.0', 't.1'] },
        { say: 'Covalent network solids, such as diamond, are one giant network of atoms. And molecular solids, such as iodine and ice, are small molecules held by weak forces. Iodine even turns straight into a vapour when warmed, which is sublimation.', show: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The pressure above some water is $47.4\\ \\text{kPa}$. Water’s vapour pressure is $31.2\\ \\text{kPa}$ at 70 °C, $47.4\\ \\text{kPa}$ at 80 °C and $70.1\\ \\text{kPa}$ at 90 °C. At what temperature does the water boil?',
          choices: ['70 °C', '90 °C', '100 °C', '80 °C'],
          answer: 3,
          working: 'Water boils when its vapour pressure equals the pressure above it: $47.4\\ \\text{kPa}$ at 80 °C.',
        },
      ],
      lines: [
        { say: 'Your turn. The pressure above some water is forty-seven point four kilopascals. Using the vapour pressures given, at what temperature does the water boil? Pause the video and try it.', caption: 'Your turn. The pressure above some water is 47.4 kPa. Using the vapour pressures given, at what temperature does the water boil? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, eighty degrees. Water boils when its vapour pressure equals the pressure above it, and it reaches forty-seven point four kilopascals at eighty degrees.', caption: 'The answer is D, 80 °C. Water boils when its vapour pressure equals the pressure above it, and it reaches 47.4 kPa at 80 °C.', show: 'q.answer' },
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
            'Saturated vapour pressure rises with temperature.',
            'A liquid boils when its vapour pressure equals the external pressure.',
            'Lower pressure lowers the boiling point; higher pressure raises it.',
            'Brownian motion and diffusion show that particles are always moving.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The saturated vapour pressure of a liquid rises with temperature.', show: 'sum.0' },
        { say: 'A liquid boils when its vapour pressure equals the pressure outside it.', show: 'sum.1' },
        { say: 'So lower pressure lowers the boiling point, and higher pressure raises it.', show: 'sum.2' },
        { say: 'And Brownian motion and diffusion are evidence that particles are always moving.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
