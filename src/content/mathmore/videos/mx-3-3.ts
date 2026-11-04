import type { Explainer } from '@/video/script.ts';
import { crossing } from '@/video/angles.ts';
import { triangle } from '@/video/triangles.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'mx-3-3',
  lessonId: 'mx-3-3',
  title: 'Two-Column Proofs',
  thumbnail: 'x',
  summary: 'A proof shows that a statement is always true, through steps that each follow from known facts. A two-column proof lists the statements and the reason for each. We prove that vertical angles are congruent with the linear pair postulate, and that the base angles of an isosceles triangle are congruent with SAS and CPCTC.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometry', title: 'Two-Column Proofs', subtitle: 'Statements and their reasons' }],
      lines: [
        { say: 'Measure the angles of one triangle, and they add up to about 180 degrees. But that does not show that every triangle’s angles do.', show: 'title' },
        { say: 'A proof shows that a statement is true in every case, by a chain of steps that each follow from facts already known. In this video, you will learn to write proofs in two columns.' },
      ],
    },
    {
      chapter: 'The parts of a proof',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Postulate and theorem', md: 'A **postulate** is a basic fact accepted without proof: a linear pair of angles adds up to $180^\\circ$. A **theorem** is a statement that has been proved, and can then be used as a reason.' },
        { kind: 'callout', id: 'two', tone: 'definition', title: 'Two-column proof', md: 'The **statements** in order in one column, and the **reason** for each in the other. The last statement is what we set out to prove.' },
      ],
      lines: [
        { say: 'A postulate is a basic fact accepted without proof. For example: two angles that form a straight line, a linear pair, add up to 180 degrees.', show: 'def' },
        { say: 'A theorem is a statement that has been proved. Once it is proved, it can be used as a reason in later proofs.' },
        { say: 'A two-column proof lists the statements in order in one column, and the reason for each statement in the other. The last statement is the one we set out to prove.', show: 'two' },
      ],
    },
    {
      chapter: 'Reasons used often',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Given:** stated in the problem.', '**Reflexive property:** $\\overline{AB} \\cong \\overline{AB}$, useful when two triangles share a side.', '**Substitution**, and the **addition** and **subtraction properties** of equality.', '**Definitions:** of a midpoint, an angle bisector, congruent segments and angles.', '**SSS, SAS, ASA**, and **CPCTC**: corresponding parts of congruent triangles are congruent.'] },
      ],
      lines: [
        { say: 'A reason can be the given information, which is stated in the problem.', show: 'b.0', focus: 'b.0' },
        { say: 'The reflexive property says that a segment or an angle is congruent to itself. It is useful when two triangles share a side.', show: 'b.1', focus: 'b.1' },
        { say: 'Substitution lets equal quantities replace each other, and the addition and subtraction properties let us add or subtract the same amount on both sides.', show: 'b.2', focus: 'b.2' },
        { say: 'Definitions are reasons too. A midpoint splits a segment into two congruent parts, and an angle bisector splits an angle into two congruent angles.', show: 'b.3', focus: 'b.3' },
        { say: 'And for triangles, there are the congruence tests, S S S, S A S and A S A, and C P C T C, short for corresponding parts of congruent triangles are congruent.', show: 'b.4', focus: 'b.4' },
      ],
    },
    {
      chapter: 'Vertical angles are congruent',
      layout: 'split',
      leftWidth: 430,
      left: [
        figure('x', [
          crossing({ deg: 60, len: 3 }),
          {
            points: {},
            items: [
              { kind: 'label', id: 'nA', at: 'e2', tex: 'A', place: 'left' },
              { kind: 'label', id: 'nB', at: 'e0', tex: 'B', place: 'right' },
              { kind: 'label', id: 'nC', at: 'e1', tex: 'C', place: 'above right' },
              { kind: 'label', id: 'nD', at: 'e3', tex: 'D', place: 'below left' },
              { kind: 'label', id: 'nE', at: 'O', tex: 'E', place: 'below right' },
            ],
          },
        ], 420),
      ],
      right: [
        { kind: 'table', id: 't', head: ['Statement', 'Reason'], rows: [['$\\angle AEC + \\angle CEB = 180^\\circ$', 'Linear pair'], ['$\\angle CEB + \\angle BED = 180^\\circ$', 'Linear pair'], ['$\\angle AEC + \\angle CEB$ $= \\angle CEB + \\angle BED$', 'Substitution'], ['$\\angle AEC = \\angle BED$', 'Subtraction property'], ['$\\angle AEC \\cong \\angle BED$', 'Def. of congruent angles']] },
      ],
      lines: [
        { say: 'Let’s prove a theorem. Lines A B and C D cross at E. Prove that angle A E C is congruent to angle B E D. These are vertical angles, across from each other.', show: ['x.lines', 'x.nA', 'x.nB', 'x.nC', 'x.nD', 'x.nE', 'x.a2', 'x.a4'], focus: ['x.a2', 'x.a4'] },
        { say: 'Angles A E C and C E B form a straight line, so they add up to 180 degrees. The reason is the linear pair postulate.', show: ['t.0', 'x.a1'], focus: ['t.0', 'x.a2', 'x.a1'] },
        { say: 'Angles C E B and B E D form a straight line too, so they also add up to 180 degrees, by the same postulate.', show: 't.1', focus: ['t.1', 'x.a1', 'x.a4'] },
        { say: 'Both sums equal 180, so they equal each other. The reason is substitution.', show: 't.2', focus: 't.2' },
        { say: 'Subtract angle C E B from both sides, by the subtraction property of equality. That leaves angle A E C equal to angle B E D.', show: 't.3', focus: 't.3' },
        { say: 'Angles with equal measures are congruent, by the definition of congruent angles. That is what we set out to prove.', show: 't.4', focus: ['t.4', 'x.a2', 'x.a4'] },
      ],
    },
    {
      chapter: 'Proving triangles congruent',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('tr', [
          triangle({ A: [0, 4.5], B: [-2.5, 0], C: [2.5, 0], names: ['A', 'B', 'C'], ticks: { AB: 1, CA: 1 } }),
          { points: { D: [0, 0] }, items: [{ kind: 'line', id: 'AD', from: 'A', to: 'D', tone: 'adj', dashed: true }, { kind: 'label', id: 'nD', at: 'D', tex: 'D', place: 'below' }] },
        ], 420),
      ],
      right: [
        { kind: 'table', id: 't', head: ['Statement', 'Reason'], rows: [['$\\overline{AB} \\cong \\overline{AC}$', 'Given'], ['$\\angle BAD \\cong \\angle CAD$', 'Def. of angle bisector'], ['$\\overline{AD} \\cong \\overline{AD}$', 'Reflexive property'], ['$\\triangle ABD \\cong \\triangle ACD$', 'SAS'], ['$\\angle B \\cong \\angle C$', 'CPCTC']] },
      ],
      lines: [
        { say: 'Many proofs show that two triangles are congruent, and then use C P C T C to show that some of their parts match.', show: ['tr.shape', 'tr.names'] },
        { say: 'Here, sides A B and A C are equal, and A D bisects angle A, with D on side B C. Prove that angle B is congruent to angle C.', show: ['tr.tAB', 'tr.tCA', 'tr.AD', 'tr.nD'], focus: ['tr.tAB', 'tr.tCA', 'tr.AD'] },
        { say: 'First, A B is congruent to A C. That is given.', show: 't.0', focus: 't.0' },
        { say: 'Next, angle B A D is congruent to angle C A D, because A D bisects angle A. The reason is the definition of an angle bisector.', show: 't.1', focus: 't.1' },
        { say: 'Then, A D is congruent to itself, by the reflexive property. The two triangles share this side.', show: 't.2', focus: ['t.2', 'tr.AD'] },
        { say: 'That is two sides and the angle between them, so triangle A B D is congruent to triangle A C D, by S A S.', show: 't.3', focus: 't.3' },
        { say: 'Finally, angle B and angle C are corresponding parts of these congruent triangles, so they are congruent, by C P C T C. The base angles of an isosceles triangle are congruent.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'The angle must be between the sides', md: 'SAS needs the angle **between** the two sides. Two sides and an angle that is not between them (SSA) do **not** prove two triangles congruent.' }],
      lines: [
        { say: 'A common mistake is to use S A S with the wrong angle. S A S needs the angle between the two sides.', show: 'oops' },
        { say: 'Two sides and an angle that is not between them, sometimes called S S A, do not prove that two triangles are congruent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a proof, $M$ is the midpoint of $\\overline{PQ}$, and the next statement is $\\overline{PM} \\cong \\overline{MQ}$. What is the reason?',
          choices: ['Reflexive property', 'Given', 'Definition of a midpoint', 'CPCTC'],
          answer: 2,
          working: 'A midpoint splits a segment into two congruent parts, so the reason is the definition of a midpoint.',
        },
      ],
      lines: [
        { say: 'Your turn. In a proof, M is the midpoint of segment P Q, and the next statement is that P M is congruent to M Q. What is the reason? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, the definition of a midpoint. A midpoint splits a segment into two congruent parts. The given fact is that M is the midpoint; the congruent parts follow from the definition.', show: 'q.answer' },
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
          items: ['A proof shows that a statement is always true.', 'A two-column proof lists statements and the reason for each.', 'Reasons: given facts, definitions, properties, postulates and theorems.', 'Prove triangles congruent (SSS, SAS, ASA), then use CPCTC.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A proof shows that a statement is always true, through steps that each follow from known facts.', show: 'sum.0' },
        { say: 'A two-column proof lists the statements in one column, and the reason for each in the other.', show: 'sum.1' },
        { say: 'Reasons are the given facts, definitions, properties of equality and congruence, postulates, and theorems already proved.', show: 'sum.2' },
        { say: 'And to prove parts of triangles congruent, prove the triangles congruent, then use C P C T C. In the next lesson, we write the equation of a circle. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
