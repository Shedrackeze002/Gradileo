import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import temperature from '@/content/chem30/videos/c30-4-3-d.ts';

// Exam question for Chemistry 30 lesson 4.3 (Le Chatelier's principle): SO3 forms faster but less of
// it is left at equilibrium at high temperature, so does K rise or fall with temperature, and is the
// reaction endothermic or exothermic? The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 35, section 13.3, CC BY-NC-SA 4.0). The answer, which matches the
// book's: (a) K decreases as the temperature increases; (b) the reaction is exothermic.
//
// The picture is the lesson's tube of N2O4 and NO2 being heated (src/video/chem.ts): it shifts the
// endothermic way, which is the idea the question turns around.

const QUESTION = 'A necessary step in the manufacture of sulfuric acid is the formation of sulfur trioxide, SO3, from sulfur dioxide, SO2, and oxygen, O2, shown here. At high temperatures, the rate of formation of SO3 is higher, but the equilibrium amount (concentration or partial pressure) of SO3 is lower than it would be at lower temperatures. 2SO2(g) + O2(g) ⇌ 2SO3(g). (a) Does the equilibrium constant for the reaction increase, decrease, or remain about the same as the temperature increases? (b) Is the reaction endothermic or exothermic?';

const video: Explainer = {
  id: 'xq-c30-4-3',
  lessonId: '',
  exam: {
    lesson: 'c30-4-3',
    source: "OpenStax, Chemistry 2e, end-of-chapter exercise 35, section 13.3, Shifting Equilibria: Le Châtelier's Principle",
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/13-exercises',
    question: QUESTION,
  },
  title: "Exam Question: Sulfur Trioxide and Temperature. Le Châtelier's Principle",
  thumbnailTitle: 'Sulfur Trioxide and Temperature',
  thumbnail: 'sh',
  summary:
    'A real test question, solved one small step at a time: at high temperature sulfur trioxide forms faster, but less of it is left at equilibrium. Does K go up or down as the temperature rises, and is the reaction endothermic or exothermic? Less product means K decreases, and since heating pushes the system back, the forward reaction is exothermic.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sulfur Trioxide and Temperature', subtitle: 'What heating tells you about K and ΔH' }],
      lines: [
        { say: 'In this video, we solve a real test question about how temperature moves an equilibrium. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt:
            'A necessary step in the manufacture of sulfuric acid is the formation of sulfur trioxide, $\\ce{SO3}$, from sulfur dioxide, $\\ce{SO2}$, and oxygen, $\\ce{O2}$, shown here. At high temperatures, the rate of formation of $\\ce{SO3}$ is higher, but the equilibrium amount (concentration or partial pressure) of $\\ce{SO3}$ is lower than it would be at lower temperatures. $\\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$ (a) Does the equilibrium constant for the reaction increase, decrease, or remain about the same as the temperature increases? (b) Is the reaction endothermic or exothermic?',
          answer: '(a) K decreases; (b) exothermic',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed. A necessary step in the manufacture of sulfuric acid is the formation of sulfur trioxide from sulfur dye-oxide and oxygen. At high temperatures, the rate of formation of sulfur trioxide is higher, but the equilibrium amount of sulfur trioxide is lower than it would be at lower temperatures.', show: 'q', caption: 'Here is the question, exactly as it was printed. A necessary step in the manufacture of sulfuric acid is the formation of sulfur trioxide, SO₃, from sulfur dioxide, SO₂, and oxygen, O₂. At high temperatures, the rate of formation of SO₃ is higher, but the equilibrium amount of SO₃ is lower than it would be at lower temperatures.' },
        { say: 'Part a: does the equilibrium constant increase, decrease, or remain about the same as the temperature increases? Part b: is the reaction endothermic or exothermic?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Hotter means **less** $\\ce{SO3}$ at equilibrium. What does that say about $K$, and about $\\Delta H$?' }],
      lines: [
        { say: 'The key fact is the second one: when it is hotter, less sulfur trioxide is there at equilibrium. The faster rate is about how quickly equilibrium is reached, not where it ends up. We use the amount to reason about K, and then about the energy.', show: 'plain', caption: 'The key fact is the second one: when it is hotter, less SO₃ is there at equilibrium. The faster rate is about how quickly equilibrium is reached, not where it ends up. We use the amount to reason about K, and then about the energy.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(temperature, 'sh'), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{heating shifts the } \\textbf{endothermic} \\text{ way}'] }],
      lines: [
        { say: 'Here is what we need. A tube of dye-nitrogen tetroxide and nitrogen dioxide at equilibrium, with a thermometer beside it. Splitting a pair takes energy in. Watch the count of orange molecules as the tube is heated.', caption: 'Here is what we need. A tube of dinitrogen tetroxide and nitrogen dioxide at equilibrium, with a thermometer beside it. Splitting a pair takes energy in. Watch the count of orange molecules as the tube is heated.', show: ['sh', 'sh.labels', 'sh.key', 'sh.tally', 'sh.thermo'], play: 'sh.stress' },
        { say: 'Hot pairs split more often, so the count climbs and settles higher: the system shifts the way that takes energy in.', focus: 'sh.tally' },
        { say: 'That is the rule: heating shifts an equilibrium in its endothermic direction.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read which way heating **shifts** the system', 'Use the **expression** to see what happens to $K$', 'Use the **rule** to find the endothermic direction'] }],
      lines: [
        { say: 'Here is the plan. First, read which way heating shifts this equilibrium.', show: 'plan.0' },
        { say: 'Then use the equilibrium expression to see what that does to K.', show: 'plan.1' },
        { say: 'Then use the rule to find which direction is endothermic.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The shift',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{2SO2(g) + O2(g) <=> 2SO3(g)}', '\\text{hotter: less } \\ce{SO3} \\Rightarrow \\textbf{shifts left}'] }],
      lines: [
        { say: 'Step one. Sulfur trioxide is the product, on the right.', show: 'm.0' },
        { say: 'At higher temperature there is less of it at equilibrium, and more sulfur dye-oxide and oxygen. So heating shifts this equilibrium to the left.', show: 'm.1', focus: 'm.1', caption: 'At higher temperature there is less of it at equilibrium, and more SO₂ and O₂. So heating shifts this equilibrium to the left.' },
      ],
    },
    {
      chapter: 'Step 2: What happens to K',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['K_c = \\dfrac{[\\ce{SO3}]^2}{[\\ce{SO2}]^2[\\ce{O2}]}', '\\text{top smaller, bottom bigger} \\Rightarrow \\good{K\\ \\text{decreases}}'] }],
      lines: [
        { say: 'Step two. K C has the product, sulfur trioxide, on top, and the reactants underneath.', show: 'm.0', caption: 'Step two. Kc has the product, SO₃, on top, and the reactants underneath.' },
        { say: 'When it is hotter, the top is smaller and the bottom is bigger, so the whole fraction is smaller. K decreases as the temperature increases. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Endothermic or exothermic?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{heating favours the reverse} \\Rightarrow \\text{reverse is endothermic}', '\\ce{2SO2(g) + O2(g) <=> 2SO3(g)} + \\text{energy}', '\\text{forward: } \\good{\\text{exothermic}},\\ \\Delta H < 0'] }],
      lines: [
        { say: 'Step three. Heating always shifts the endothermic way. Here heating favours the reverse reaction, so the reverse reaction is the endothermic one.', show: 'm.0' },
        { say: 'Then energy is a product of the forward reaction: sulfur dye-oxide and oxygen make sulfur trioxide and give out energy.', show: 'm.1', caption: 'Then energy is a product of the forward reaction: SO₂ and O₂ make SO₃ and give out energy.' },
        { say: 'So the forward reaction is exothermic, with a negative delta H. That is part b.', show: 'm.2', focus: 'm.2', caption: 'So the forward reaction is exothermic, with a negative ΔH. That is part b.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\text{exothermic} + \\text{heat} \\Rightarrow \\text{left} \\Rightarrow \\text{less } \\ce{SO3} \\Rightarrow K \\downarrow\\ \\checkmark'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) $K$ **decreases** as the temperature increases. (b) The reaction is **exothermic**.' },
      ],
      lines: [
        { say: 'Does it hang together? Run it forwards: for an exothermic reaction, adding heat shifts it left, which leaves less sulfur trioxide, which makes K smaller. That is exactly what the question described.', show: 'x.0', caption: 'Does it hang together? Run it forwards: for an exothermic reaction, adding heat shifts it left, which leaves less SO₃, which makes K smaller. That is exactly what the question described.' },
        { say: 'So K decreases as the temperature increases, and the reaction is exothermic. That matches the book.', show: 'ans' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['$K$ **increases**', 'Read the faster **rate** as more product'],
            ['$K$ stays the **same**', 'Forgot $K$ is constant only at **one temperature**'],
            ['**Endothermic**', 'Matched the heating to the **forward** reaction'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'K increases takes the faster rate as a sign of more product. A faster rate only reaches equilibrium sooner. K is about where the equilibrium lies.', focus: 'traps.0' },
        { say: 'K stays the same forgets that K is constant only at one temperature. Changing the temperature changes K itself.', focus: 'traps.1' },
        { say: 'And endothermic assumes heating helps the forward reaction. Here it helps the reverse one, so it is the reverse that takes energy in.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'For $\\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$, $\\Delta H = -92\\ \\text{kJ}$. What happens to $K_c$ when the temperature is **lowered**?',
          choices: ['It decreases', 'It stays the same', 'It increases', 'It becomes zero'],
          answer: 2,
          working: 'Exothermic, so cooling shifts it right: more $\\ce{NH3}$, less $\\ce{N2}$ and $\\ce{H2}$, and a larger $K_c$.',
        },
      ],
      lines: [
        { say: 'Your turn. For nitrogen and hydrogen forming ammonia, delta H is minus ninety two kilojoules. What happens to K C when the temperature is lowered? Pause the video and try it.', caption: 'Your turn. For N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92 kJ. What happens to Kc when the temperature is lowered? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The forward reaction is exothermic, so cooling shifts it right, the exothermic way. There is more ammonia and less nitrogen and hydrogen, so K C increases: choice C.', caption: 'The forward reaction is exothermic, so cooling shifts it right, the exothermic way. More NH₃ and less N₂ and H₂, so Kc increases: choice C.', show: 'q2.answer' },
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
          items: ['Heating shifts the **endothermic** way', 'More product at equilibrium → **larger** $K$', 'Only **temperature** changes the value of $K$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Heating shifts an equilibrium the endothermic way, and cooling shifts it the exothermic way.', show: 'sum.0' },
        { say: 'If the shift leaves more product at equilibrium, K gets larger. If it leaves less, K gets smaller.', show: 'sum.1' },
        { say: 'And temperature is the only change that alters the value of K. For more on Le Chatelier\'s principle, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2', caption: 'And temperature is the only change that alters the value of K. For more on Le Châtelier\'s principle, watch this lesson\'s explainer videos on Gradileo.' },
      ],
    },
  ],
};

export default video;
