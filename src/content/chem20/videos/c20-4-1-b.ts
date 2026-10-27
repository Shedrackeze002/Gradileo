import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gives, mol, plus, row, stack, star } from './lib/c20-4a-figures.ts';

// Aluminium and bromine, as balls: 2Al + 3Br₂ → 2AlBr₃, with room for the extra atoms and
// molecules, which are shown as the equation is balanced.
const formation = figure(
  'f',
  [
    row({
      terms: [
        stack(mol('al1', ['Al']), mol('al2', ['Al'])),
        plus('p'),
        stack(mol('br1', ['Br', 'Br']), mol('br2', ['Br', 'Br']), mol('br3', ['Br', 'Br'])),
        gives('arr'),
        stack(star('ab1', 'Al', ['Br', 'Br', 'Br']), star('ab2', 'Al', ['Br', 'Br', 'Br'])),
      ],
    }),
  ],
  520,
);

const video: Explainer = {
  id: 'c20-4-1-b',
  lessonId: 'c20-4-1',
  title: 'Balancing Equations and Types of Reactions, Part 2: Balancing Step by Step',
  thumbnailTitle: 'Balancing Step by Step',
  thumbnail: 'f',
  summary:
    'Balancing is organised trial and error: start with the largest formula, keep polyatomic ions together, make pairs even (2 and 3 make 6), and leave lone elements until last. So Al + Br₂ → AlBr₃ becomes 2Al + 3Br₂ → 2AlBr₃, and Al + H₂SO₄ → Al₂(SO₄)₃ + H₂ becomes 2Al + 3H₂SO₄ → Al₂(SO₄)₃ + 3H₂.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 2', title: 'Balancing Step by Step', subtitle: 'Six habits that keep it short' }],
      lines: [
        { say: 'Balancing an equation is organised trial and error. A few good habits keep it short.', show: 'title' },
        { say: 'In this part, you will learn six habits, and use them on a formation, on an equation with a polyatomic ion, and on a metal reacting with water.' },
      ],
    },
    {
      chapter: 'Six habits',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            '**Count** the atoms of each element on both sides.',
            '**Start with the largest formula**: leave it at 1 and balance its elements, metals first.',
            '**Keep polyatomic ions together** when they appear unchanged on both sides.',
            '**Even out pairs**: when the counts are 2 and 3, make both 6.',
            '**Leave lone elements until last**, such as $\\ce{Cu}$, $\\ce{H2}$ or $\\ce{O2}$.',
            '**Check** every element, and divide by 2 if every coefficient allows it.',
          ],
        },
      ],
      lines: [
        { say: 'First, count the atoms of each element on both sides.', show: 's.0' },
        { say: 'Second, start with the largest formula. Leave it at one for now, and balance its elements, metals first.', show: 's.1' },
        { say: 'Third, when a polyatomic ion such as sulfate appears unchanged on both sides, balance it as one unit.', show: 's.2' },
        { say: 'Fourth, even out pairs. A dye-atomic element brings its atoms in pairs, so when the counts are two and three, make both six.', caption: 'Fourth, even out pairs. A diatomic element brings its atoms in pairs, so when the counts are two and three, make both six.', show: 's.3' },
        { say: 'Fifth, leave lone elements, such as copper, hydrogen or oxygen, until last. Changing them changes nothing else.', show: 's.4' },
        { say: 'And sixth, check every element, and make sure the coefficients are the smallest whole numbers.', show: 's.5' },
      ],
    },
    {
      chapter: 'A formation',
      layout: 'split',
      leftWidth: 600,
      left: [formation],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\ce{Al + Br2 -> AlBr3}', '\\text{Br: } 3 \\text{ and } 2 \\ \\Rightarrow\\ 6', '\\ce{Al + 3Br2 -> 2AlBr3}', '\\ce{2Al + 3Br2 -> 2AlBr3}', '\\text{Al } 2 = 2, \\quad \\text{Br } 6 = 6'],
        },
      ],
      lines: [
        { say: 'Balance aluminium plus bromine, giving aluminium bromide.', caption: 'Balance Al + Br₂ → AlBr₃.', show: ['m.0', 'f.al1', 'f.p', 'f.br1', 'f.arr', 'f.ab1'] },
        { say: 'Start with aluminium bromide, which holds three bromine atoms. But bromine brings its atoms in pairs, so their number must be even.', show: 'm.1', focus: ['f.ab1', 'f.br1'] },
        { say: 'The smallest number that both three and two divide into is six. Three bromine molecules and two units of aluminium bromide each hold six bromine atoms.', caption: 'The smallest number that both three and two divide into is six. 3Br₂ and 2AlBr₃ each hold six bromine atoms.', show: ['m.2', 'f.br2', 'f.br3', 'f.ab2'], focus: ['m.2', 'f.br1', 'f.br2', 'f.br3', 'f.ab1', 'f.ab2'] },
        { say: 'Two units of aluminium bromide hold two aluminium atoms, so write a two in front of aluminium.', caption: 'Two units of aluminium bromide hold two aluminium atoms, so write 2Al.', show: ['m.3', 'f.al2'], focus: ['m.3', 'f.al1', 'f.al2'] },
        { say: 'Check: aluminium, two equals two, and bromine, six equals six.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Keep the sulfate together',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{Al + H2SO4 -> Al2(SO4)3 + H2}',
            '\\ce{Al2(SO4)3}\\text{: 2 Al} \\ \\Rightarrow\\ \\ce{2Al}',
            '3\\ \\ce{SO4}\\ \\text{groups} \\ \\Rightarrow\\ \\ce{3H2SO4}',
            '6\\ \\text{H} \\ \\Rightarrow\\ \\ce{3H2}',
            '\\ce{2Al + 3H2SO4 -> Al2(SO4)3 + 3H2}',
          ],
        },
      ],
      lines: [
        { say: 'Aluminium reacts with sulfuric acid to form aluminium sulfate and hydrogen gas.', caption: 'Aluminium reacts with sulfuric acid to form aluminium sulfate and hydrogen gas: Al + H₂SO₄ → Al₂(SO₄)₃ + H₂.', show: 'm.0' },
        { say: 'Start with the largest formula, aluminium sulfate. It holds two aluminium atoms, so write a two in front of aluminium.', show: 'm.1', focus: 'm.1' },
        { say: 'The sulfate group stays whole, so count it as one unit. Three sulfate groups on the right need three units of sulfuric acid on the left.', caption: 'The sulfate group stays whole, so count it as one unit. Three sulfate groups on the right need 3H₂SO₄ on the left.', show: 'm.2', focus: 'm.2' },
        { say: 'Three units of sulfuric acid hold six hydrogen atoms, which is three molecules of hydrogen gas. Hydrogen is a lone element, so it comes last.', caption: '3H₂SO₄ holds six hydrogen atoms, which is three molecules of hydrogen gas, 3H₂. Hydrogen is a lone element, so it comes last.', show: 'm.3', focus: 'm.3' },
        { say: 'Check: two aluminium, six hydrogen, three sulfur and twelve oxygen atoms on each side.', caption: 'Check: 2Al + 3H₂SO₄ → Al₂(SO₄)₃ + 3H₂ has two aluminium, six hydrogen, three sulfur and twelve oxygen atoms on each side.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Water as H–OH',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Water as H–OH', md: 'When a metal reacts with water to make a hydroxide, think of water as H–OH: one OH group for each OH in the hydroxide, and the leftover H atoms make $\\ce{H2}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Ca + 2H2O -> Ca(OH)2 + H2}', '\\text{Ca } 1 = 1, \\quad \\text{H } 4 = 4, \\quad \\text{O } 2 = 2'] },
      ],
      lines: [
        { say: 'When a metal reacts with water to make a hydroxide, think of water as H, O H: a hydrogen atom joined to an O H group.', caption: 'When a metal reacts with water to make a hydroxide, think of water as H–OH: a hydrogen atom joined to an OH group.', show: 'tip' },
        { say: 'Calcium reacts with water to form calcium hydroxide and hydrogen gas. Calcium hydroxide holds two O H groups, so it needs two water molecules.', caption: 'Calcium reacts with water to form calcium hydroxide and hydrogen gas. Ca(OH)₂ holds two OH groups, so it needs two water molecules.', show: 'm.0', focus: 'm.0' },
        { say: 'The two hydrogen atoms left over make one hydrogen molecule. Check: one calcium, four hydrogen and two oxygen atoms on each side.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a car’s airbag, sodium azide decomposes into sodium and nitrogen gas: $\\ce{NaN3 -> Na + N2}$. Which is the balanced equation, with the smallest whole-number coefficients?',
          choices: ['$\\ce{NaN3 -> Na + N3}$', '$\\ce{2NaN3 -> 2Na + 2N2}$', '$\\ce{4NaN3 -> 4Na + 6N2}$', '$\\ce{2NaN3 -> 2Na + 3N2}$'],
          answer: 3,
          working: '$\\ce{NaN3}$ holds 3 N and $\\ce{N2}$ brings them in pairs, so make both 6: $\\ce{2NaN3}$ and $\\ce{3N2}$. Then $\\ce{2Na}$. Check: Na $2 = 2$, N $6 = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a car’s airbag, sodium azide decomposes into sodium and nitrogen gas. Which is the balanced equation, with the smallest whole-number coefficients? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Make the nitrogen six on each side: two sodium azide and three nitrogen molecules, then two sodium atoms. Choice A changes a subscript, and every coefficient in choice C divides by two.', show: 'q.answer' },
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
            'Start with the **largest formula**, and balance its elements, metals first.',
            'Keep **polyatomic ions** together, and even out **pairs**: 2 and 3 make 6.',
            'Leave **lone elements** until last, then **check** every element.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Start with the largest formula, and balance its elements, metals first.', show: 'sum.0' },
        { say: 'Keep polyatomic ions together, and even out pairs: two and three make six.', show: 'sum.1' },
        { say: 'Leave lone elements until last, then check every element. In part three, you will balance burning fuels. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
