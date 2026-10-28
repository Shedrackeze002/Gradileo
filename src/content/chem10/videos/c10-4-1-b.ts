import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c10-4-1-b',
  lessonId: 'c10-4-1',
  title: 'Word Equations and Conservation of Mass, Part 2: Identifying the Products',
  thumbnailTitle: 'Identifying the Products',
  thumbnail: false,
  summary:
    'Simple tests identify a product that a description does not name: hydrogen burns with a squeaky pop, oxygen relights a glowing splint, carbon dioxide turns limewater milky, and water turns white anhydrous copper(II) sulfate blue. Name the product the test shows, then write the word equation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 2', title: 'Identifying the Products', subtitle: 'Tests for gases and water' }],
      lines: [
        { say: 'Drop marble chips into acid and they fizz. But bubbles of every gas look the same, so which gas is it?', show: 'title' },
        { say: 'A description does not always name every product. In this part, you will use four simple tests to identify a gas or water, and then write the word equation.' },
      ],
    },
    {
      chapter: 'Four tests',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Substance', 'Test', 'Result if present'],
          rows: [
            ['hydrogen', 'hold a lighted splint at the mouth of the tube', 'burns with a squeaky pop'],
            ['oxygen', 'put a glowing splint into the gas', 'the splint relights'],
            ['carbon dioxide', 'bubble the gas through limewater', 'the limewater turns milky'],
            ['water', 'add the liquid to white anhydrous copper(II) sulfate', 'the solid turns blue'],
          ],
        },
      ],
      lines: [
        { say: 'For hydrogen, hold a lighted splint at the mouth of the test tube. If the gas is hydrogen, it burns with a squeaky pop.', show: 't.0', focus: 't.0' },
        { say: 'For oxygen, put a glowing splint into the gas. Oxygen makes the splint relight.', show: 't.1', focus: 't.1' },
        { say: 'For carbon dioxide, bubble the gas through limewater. Carbon dioxide turns the limewater milky.', show: 't.2', focus: 't.2' },
        { say: 'And for water, add the liquid to white anhydrous copper two sulfate. Water turns the solid blue.', caption: 'And for water, add the liquid to white anhydrous copper(II) sulfate. Water turns the solid blue.', show: 't.3', focus: 't.3' },
        { say: 'Each test picks out one substance. A gas that pops is hydrogen, and a gas that turns limewater milky is carbon dioxide.', focus: 't' },
      ],
    },
    {
      chapter: 'Marble chips in acid',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Marble chips, which are calcium carbonate, fizz in dilute hydrochloric acid, making calcium chloride and water. The gas given off turns limewater milky. Write the word equation.' },
        { kind: 'bullets', id: 's', items: ['A gas that turns limewater milky is **carbon dioxide**.', '**Reactants:** calcium carbonate and hydrochloric acid. **Products:** calcium chloride, water and carbon dioxide.'] },
        { kind: 'text', id: 'a', size: 'md', md: '**calcium carbonate + hydrochloric acid → calcium chloride + water + carbon dioxide**' },
      ],
      lines: [
        { say: 'Here is an example. Marble chips, which are calcium carbonate, fizz in dilute hydrochloric acid, making calcium chloride and water. The gas given off turns limewater milky.', show: 'q' },
        { say: 'First, name the gas. A gas that turns limewater milky is carbon dioxide.', show: 's.0' },
        { say: 'Now sort the substances. Calcium carbonate and hydrochloric acid are used up, so they are the reactants. Calcium chloride, water and carbon dioxide are new, so they are the products.', show: 's.1' },
        { say: 'So calcium carbonate plus hydrochloric acid gives calcium chloride plus water plus carbon dioxide. A reaction can have three products, each separated by a plus sign.', show: 'a' },
      ],
    },
    {
      chapter: 'A water plant in light',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A water plant in bright light turns carbon dioxide and water into glucose, and bubbles of a gas rise from its leaves. The gas relights a glowing splint. Write the word equation for this reaction, photosynthesis.' },
        { kind: 'bullets', id: 's', items: ['A gas that relights a glowing splint is **oxygen**.', '**Reactants:** carbon dioxide and water. **Products:** glucose and oxygen. Light is energy, not a substance.'] },
        { kind: 'text', id: 'a', size: 'md', md: '**carbon dioxide + water → glucose + oxygen**' },
      ],
      lines: [
        { say: 'One more. A water plant is placed in bright light. It turns carbon dioxide and water into glucose, and bubbles of a gas rise from its leaves. The gas relights a glowing splint.', show: 'q' },
        { say: 'A gas that relights a glowing splint is oxygen.', show: 's.0' },
        { say: 'Carbon dioxide and water are the reactants. Glucose and oxygen are the products. The light supplies energy, but it is not a substance, so it is left out.', show: 's.1' },
        { say: 'So for photosynthesis, carbon dioxide plus water gives glucose plus oxygen.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A small piece of sodium is placed on water. Sodium hydroxide forms and dissolves, and the gas given off burns with a squeaky pop. Which word equation describes the reaction?',
          choices: ['sodium + water → sodium hydroxide + hydrogen', 'sodium + water → sodium hydroxide + oxygen', 'sodium hydroxide + hydrogen → sodium + water', 'sodium + water → sodium oxide + hydrogen'],
          answer: 0,
          working: 'A gas that burns with a squeaky pop is hydrogen. Reactants: sodium and water. Products: sodium hydroxide and hydrogen.',
        },
      ],
      lines: [
        { say: 'Your turn. A small piece of sodium is placed on water. Sodium hydroxide forms and dissolves, and the gas given off burns with a squeaky pop. Which word equation describes the reaction? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A gas that burns with a squeaky pop is hydrogen, so sodium plus water gives sodium hydroxide plus hydrogen. Choice B names oxygen, but oxygen relights a glowing splint. It does not pop.', show: 'q.answer' },
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
            'Hydrogen burns with a **squeaky pop**; oxygen **relights a glowing splint**.',
            'Carbon dioxide turns **limewater milky**; water turns white anhydrous copper(II) sulfate **blue**.',
            'Name the product the test shows, then write reactants → products.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Hydrogen burns with a squeaky pop, and oxygen relights a glowing splint.', show: 'sum.0' },
        { say: 'Carbon dioxide turns limewater milky, and water turns white anhydrous copper two sulfate blue.', caption: 'Carbon dioxide turns limewater milky, and water turns white anhydrous copper(II) sulfate blue.', show: 'sum.1' },
        { say: 'Name the product the test shows, then write the word equation. In part three, you will see why mass is conserved, and use it to find a missing mass. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
