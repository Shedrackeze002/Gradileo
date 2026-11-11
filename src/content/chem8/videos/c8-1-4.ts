import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c8-1-4',
  lessonId: 'c8-1-4',
  title: 'Chemical Formulas',
  thumbnail: 'f',
  summary:
    'A chemical formula uses symbols for the elements and small numbers called subscripts for the number of atoms; no number means one. Each capital letter starts a new symbol. A subscript after a bracket multiplies everything inside it, and a number in front of a formula counts whole units.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms, Elements and Compounds', title: 'Chemical Formulas', subtitle: 'A compound’s recipe in a few letters' }],
      lines: [
        { say: 'Chemists do not write two hydrogen atoms joined to one oxygen atom every time they mean water. They write H two O.', show: 'title' },
        { say: 'In this video, you will learn to read a chemical formula, and to count the atoms it shows, even with brackets.' },
      ],
    },
    {
      chapter: 'What a formula tells you',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\ce{H2O}: \\ 2\\ \\text{hydrogen}, \\ 1\\ \\text{oxygen}', '\\ce{CaCO3}: \\ \\text{Ca, C, O}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The number belongs to the symbol before it', md: 'In $\\ce{CO2}$ there is one carbon atom and two oxygen atoms.' },
      ],
      lines: [
        { say: 'A chemical formula shows the elements in a substance, using their symbols. Small numbers written after a symbol, called subscripts, show how many atoms of that element there are. No number means one atom.', show: 'f.0', focus: 'f.0' },
        { say: 'So H two O has two hydrogen atoms and one oxygen atom.' },
        { say: 'To find the elements, read the symbols, remembering that each capital letter starts a new one. In calcium carbonate, C a C O three, the symbols are C a, C and O: calcium, carbon and oxygen.', show: 'f.1', focus: 'f.1' },
        { say: 'Take care with what each number belongs to. In C O two, the two belongs to the oxygen, not the carbon: there is one carbon atom and two oxygen atoms.', show: 'oops' },
      ],
    },
    {
      chapter: 'Counting atoms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'c', size: 'lg', lines: ['\\ce{C6H12O6}: \\ 6 + 12 + 6 = 24', '\\ce{Mg(NO3)2}: \\ 3 \\times 2 = 6\\ \\text{oxygen}', '\\ce{3H2O}: \\ 3 \\times 2 = 6\\ \\text{hydrogen}'] },
      ],
      lines: [
        { say: 'Glucose is C six H twelve O six. That shows six carbon atoms, twelve hydrogen atoms and six oxygen atoms, so twenty-four atoms altogether.', show: 'c.0', focus: 'c.0' },
        { say: 'A subscript after a bracket multiplies everything inside it. In magnesium nitrate, there are three oxygen atoms inside the bracket, and the two after the bracket doubles them, so three times two gives six oxygen atoms.', show: 'c.1', focus: 'c.1' },
        { say: 'A big number in front of a formula counts whole units. Three H two O means three water molecules, so there are three times two, or six, hydrogen atoms.', show: 'c.2', focus: 'c.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many hydrogen atoms does the formula $\\ce{Ca(OH)2}$ show?',
          choices: ['1', '3', '4', '2'],
          answer: 3,
          working: 'There is 1 hydrogen atom inside the bracket, and the 2 after the bracket doubles it: 1 × 2 = 2.',
        },
      ],
      lines: [
        { say: 'Your turn. How many hydrogen atoms does the formula of calcium hydroxide show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, two. There is one hydrogen atom inside the bracket, and the two after the bracket doubles everything inside it.', show: 'q.answer' },
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
            'Symbols show the elements; subscripts show the number of atoms.',
            'No number means one; each capital letter starts a new symbol.',
            'A subscript after a bracket multiplies everything inside it.',
            'A number in front counts whole units.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A formula uses symbols for the elements and subscripts for the number of atoms.', show: 'sum.0' },
        { say: 'No number means one atom, and each capital letter starts a new symbol.', show: 'sum.1' },
        { say: 'A subscript after a bracket multiplies everything inside the bracket.', show: 'sum.2' },
        { say: 'And a number in front of a formula counts whole units. Next, you will see how the elements are organized in the periodic table.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
