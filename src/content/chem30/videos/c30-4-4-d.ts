import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ladder } from './lib/c30-4a-figures.ts';

// The hydrogen carbonate ion between its conjugate acid and its conjugate base.
const bicarb = figure('l', [ladder({ acid: '\\ce{H2CO3}', mid: '\\ce{HCO3-}', base: '\\ce{CO3^2-}', acidName: '\\text{conjugate acid}', baseName: '\\text{conjugate base}' })], 300);

const video: Explainer = {
  id: 'c30-4-4-d',
  lessonId: 'c30-4-4',
  title: 'Brønsted–Lowry Acids and Bases, Part 4: Amphiprotic Particles',
  thumbnailTitle: 'Amphiprotic Particles',
  thumbnail: 'l',
  summary:
    'An amphiprotic particle can act as a Brønsted–Lowry acid or a base, depending on what it reacts with: water is a base with HF and an acid with NH₃. It has both a conjugate acid and a conjugate base: for HCO₃⁻ they are H₂CO₃ and CO₃²⁻. HCO₃⁻ gives a proton to OH⁻ but takes one from H₃O⁺, which is why baking soda neutralises acids, releasing carbon dioxide.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 4', title: 'Amphiprotic Particles', subtitle: 'Acid or base, depending on the partner' }],
      lines: [
        { say: 'Baking soda neutralises acids, so it acts as a base. Yet the hydrogen carbonate ion in it can also give a proton away.', show: 'title' },
        { say: 'In this part, you will meet particles that can act as an acid or as a base, and find both of their conjugates.' },
      ],
    },
    {
      chapter: 'Water goes both ways',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{HF} + \\adj{\\ce{H2O}} \\;\\ce{<=>}\\; \\ce{H3O+ + F-} \\qquad \\adj{\\text{water: base}}', '\\ce{NH3} + \\opp{\\ce{H2O}} \\;\\ce{<=>}\\; \\ce{NH4+ + OH-} \\qquad \\opp{\\text{water: acid}}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Amphiprotic', md: 'Can act as a Brønsted–Lowry acid **or** a base, depending on what it reacts with: it has a proton to give, and can accept one. Examples: $\\ce{H2O}$, $\\ce{HCO3-}$, $\\ce{H2PO4-}$, $\\ce{HPO4^2-}$, $\\ce{HSO3-}$.' },
      ],
      lines: [
        { say: 'Water was a base when hydrogen fluoride dissolved: it accepted a proton.', show: 'm.0', focus: 'm.0' },
        { say: 'But it was an acid when ammonia dissolved: it gave a proton away.', show: 'm.1', focus: 'm.1' },
        { say: 'A particle like this is amphiprotic. It can act as an acid or as a base, depending on what it reacts with, because it has a proton to give away and can also accept one.', show: 'def' },
        { say: 'Water, hydrogen carbonate, dye-hydrogen phosphate, hydrogen phosphate and hydrogen sulfite are all amphiprotic.', caption: 'Water, hydrogen carbonate, dihydrogen phosphate, hydrogen phosphate and hydrogen sulfite are all amphiprotic.', focus: 'def' },
      ],
    },
    {
      chapter: 'Two conjugates',
      layout: 'center',
      main: [bicarb],
      lines: [
        { say: 'An amphiprotic particle has both a conjugate acid and a conjugate base. Take the hydrogen carbonate ion, H C O three minus.', caption: 'An amphiprotic particle has both a conjugate acid and a conjugate base. Take the hydrogen carbonate ion, HCO₃⁻.', show: 'l.mid' },
        { say: 'Add a proton, and it becomes carbonic acid, H two C O three: its conjugate acid.', caption: 'Add a proton, and it becomes carbonic acid, H₂CO₃: its conjugate acid.', show: ['l.gain1', 'l.acid', 'l.acid-name'], focus: ['l.gain1', 'l.acid'] },
        { say: 'Remove a proton, and it becomes the carbonate ion, C O three, two minus: its conjugate base.', caption: 'Remove a proton, and it becomes the carbonate ion, CO₃²⁻: its conjugate base.', show: ['l.lose2', 'l.base', 'l.base-name'], focus: ['l.lose2', 'l.base'] },
        { say: 'Each step can also run the other way. Carbonic acid can lose a proton to give hydrogen carbonate, and carbonate can gain one.', show: ['l.lose1', 'l.gain2'], focus: ['l.lose1', 'l.gain2'] },
      ],
    },
    {
      chapter: 'One ion, two roles',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{1: } \\ce{HCO3-(aq) + OH-(aq) <=> CO3^2-(aq) + H2O(l)}', '\\text{2: } \\ce{HCO3-(aq) + H3O+(aq) <=> H2CO3(aq) + H2O(l)}'] },
        { kind: 'bullets', id: 'b', items: ['Reaction 1: $\\ce{HCO3-}$ gives its proton to $\\ce{OH-}$: it acts as an **acid**.', 'Reaction 2: $\\ce{HCO3-}$ takes a proton from $\\ce{H3O+}$: it acts as a **base**.'] },
      ],
      lines: [
        { say: 'In reaction one, hydrogen carbonate meets hydroxide and becomes carbonate. It gives its proton to the hydroxide ion, so it acts as an acid.', show: ['m.0', 'b.0'], focus: ['m.0', 'b.0'] },
        { say: 'In reaction two, it meets hydronium and becomes carbonic acid. It takes a proton from the hydronium ion, so it acts as a base.', show: ['m.1', 'b.1'], focus: ['m.1', 'b.1'] },
        { say: 'An acid in one reaction, and a base in the other: hydrogen carbonate is amphiprotic.', focus: 'm' },
      ],
    },
    {
      chapter: 'Baking soda',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{HCO3- + H3O+ -> H2CO3 + H2O}', '\\ce{H2CO3(aq) -> H2O(l) + CO2(g)}'] },
      ],
      lines: [
        { say: 'Because hydrogen carbonate can accept protons, sodium hydrogen carbonate, or baking soda, neutralises acids.', show: 'm.0', focus: 'm.0' },
        { say: 'The carbonic acid it forms then breaks down into water and carbon dye-oxide gas: that is where the bubbles come from.', caption: 'The carbonic acid it forms then breaks down into water and carbon dioxide gas: that is where the bubbles come from.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The hydrogen sulfite ion, $\\ce{HSO3-}$, is amphiprotic. What are its conjugate acid and its conjugate base?',
          choices: ['Conjugate acid $\\ce{SO3^2-}$; conjugate base $\\ce{H2SO3}$', 'Conjugate acid $\\ce{H2SO3}$; conjugate base $\\ce{SO3^2-}$', 'Conjugate acid $\\ce{H2SO3-}$; conjugate base $\\ce{SO3-}$', 'Conjugate acid $\\ce{H3O+}$; conjugate base $\\ce{OH-}$'],
          answer: 1,
          working: 'Accepting a proton (add H, raise the charge by 1) gives $\\ce{H2SO3}$. Donating one (remove H, lower the charge by 1) gives $\\ce{SO3^2-}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The hydrogen sulfite ion, H S O three minus, is amphiprotic. What are its conjugate acid and its conjugate base? Pause the video and try it.', caption: 'Your turn. The hydrogen sulfite ion, HSO₃⁻, is amphiprotic. What are its conjugate acid and its conjugate base? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Adding a proton gives the conjugate acid, H two S O three, and removing one gives the conjugate base, S O three, two minus. Choice A has them the wrong way round, and choice C forgets to change the charge.', caption: 'The answer is B. Adding a proton gives the conjugate acid, H₂SO₃, and removing one gives the conjugate base, SO₃²⁻. Choice A has them the wrong way round, and choice C forgets to change the charge.', show: 'q.answer' },
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
            'An **amphiprotic** particle can act as an acid or a base, depending on what it reacts with.',
            'It has a conjugate acid and a conjugate base: $\\ce{H2CO3} \\leftarrow \\ce{HCO3-} \\rightarrow \\ce{CO3^2-}$.',
            'Examples: $\\ce{H2O}$, $\\ce{HCO3-}$, $\\ce{H2PO4-}$, $\\ce{HPO4^2-}$ and $\\ce{HSO3-}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An amphiprotic particle can act as an acid or a base, depending on what it reacts with.', show: 'sum.0' },
        { say: 'It has both a conjugate acid and a conjugate base. For hydrogen carbonate, they are carbonic acid and carbonate.', show: 'sum.1' },
        { say: 'Water and hydrogen carbonate are common examples. That completes this lesson. Next, you will predict which way an acid-base reaction goes.', caption: 'Water and hydrogen carbonate are common examples. That completes this lesson. Next, you will predict which way an acid–base reaction goes.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
