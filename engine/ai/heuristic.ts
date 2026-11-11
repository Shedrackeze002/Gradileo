/**
 * Offline analyst: a deterministic, rules-based version of the AI assistant.
 * Used in demo mode, when no MiniMax key is configured, or as a fallback if the API fails.
 * It produces the same InsightData shape so the UI is identical.
 */
import { skillName } from '../curriculum/index.ts';
import { actionId } from './parse.ts';
import type { ClassContext, InsightData, InsightGroup, ProposedAction, StudentContext } from './types.ts';

/** Common misconceptions per skill, used when a student repeatedly misses that skill. */
const MISCONCEPTIONS: Record<string, string> = {
  'm2-between': 'May be multiplying when they should divide (or vice versa) — check which unit is larger and whether the number should grow or shrink.',
  'm2-area-volume-units': 'Likely using the linear factor (e.g. 100) instead of squaring or cubing it (10 000 or 1 000 000).',
  'm3-sa-cone': 'Often uses the height instead of the slant height in πrs.',
  'm3-sa-pyramid': 'Often uses the height of the pyramid instead of the slant height of the triangular faces.',
  'm3-slant-height': 'Mixes up which length is the hypotenuse (the slant height is the longest side).',
  'm3-sa-cylinder': 'May forget one of the circular bases or use the diameter instead of the radius.',
  'm3-vol-pyr-cone': 'May forget the factor of 1/3.',
  'm3-composite': 'May be adding faces that are hidden where the parts join.',
  'm4-label-sides': 'Confuses the opposite and adjacent sides when the triangle is rotated.',
  'm4-choose-ratio': 'Chooses a ratio without first labelling opposite, adjacent and hypotenuse.',
  'm4-tan-length': 'When the unknown is in the denominator, may multiply instead of divide.',
  'm4-sincos-length': 'When the unknown is the hypotenuse, may multiply by the ratio instead of dividing.',
  'm4-elevation-depression': 'May place the angle of depression inside the triangle at the wrong vertex.',
  'a1-gcf-lcm-problems': 'Mixes up when to use the GCF (sharing/splitting into largest equal groups) and the LCM (when events line up again).',
  'a2-mixed-radical': 'May not be using the largest perfect-square factor, leaving the radical unsimplified.',
  'a3-negative-zero': 'Treats a negative exponent as making the number negative instead of taking the reciprocal.',
  'a3-integral-laws': 'Multiplies exponents when they should add them, or forgets to apply the exponent to the coefficient.',
  'a3-rational-laws': 'Has difficulty adding or multiplying fractional exponents.',
  'a4-multiply-binomials': 'Forgets the middle term when squaring a binomial, or makes sign errors with negative terms.',
  'a4-simplify-products': 'Does not distribute the subtraction to every term of the second product.',
  'a5-factor-simple-trinomial': 'Finds integers with the right product but the wrong sum (often a sign error).',
  'a5-factor-trinomial-a': 'Has trouble splitting the middle term (decomposition) when a ≠ 1.',
  'a5-difference-squares': 'Factors a sum of squares, or writes (a − b)² instead of (a − b)(a + b).',
  'a5-factor-mixed': 'Skips checking for a common factor first, leaving the answer not fully factored.',
  'r1-domain-range-graph': 'Mixes up open and closed endpoints (< versus ≤).',
  'r2-is-function-pairs': 'Thinks repeated y-values break the definition of a function (only repeated x-values do).',
  'r3-slope-two-points': 'Subtracts the coordinates in a different order in the numerator and denominator.',
  'r3-parallel-perp-slope': 'Uses the reciprocal without changing the sign (or vice versa) for perpendicular slopes.',
  'r5-intercepts-from-equation': 'Substitutes 0 for the wrong variable when finding an intercept.',
  'r6-to-general': 'Leaves fractions in general form or does not make A positive.',
  'r7-from-two-points': 'Calculates the slope correctly but substitutes the point incorrectly into slope-point form.',
  'r9-elimination': 'Makes a sign error when subtracting equations.',
  'r10-distance': 'Forgets to square the differences, or adds the coordinates instead of subtracting.',
};

function pct(n: number | null): string {
  return n === null ? 'n/a' : `${n}%`;
}

function name(id: string): string {
  return skillName(id);
}

function action(partial: Omit<ProposedAction, 'id' | 'status'>): ProposedAction {
  return { id: actionId(), status: 'proposed', ...partial };
}

export function analyzeStudent(ctx: StudentContext): InsightData {
  const attempted = ctx.skills.filter((s) => s.attempts > 0);
  const strong = attempted.filter((s) => s.level === 'mastered' || s.level === 'proficient').sort((a, b) => b.pKnown - a.pKnown);
  const weak = attempted.filter((s) => s.attempts >= 2 && s.pKnown < 0.45).sort((a, b) => a.pKnown - b.pKnown);
  const developing = attempted.filter((s) => !weak.includes(s) && !strong.includes(s));
  const missing = ctx.assignments.filter((a) => a.status === 'missing');
  const late = ctx.assignments.filter((a) => a.status === 'late');
  const { last7Accuracy: a7, prev7Accuracy: p7 } = ctx.trend;
  const first = ctx.student.name.split(' ')[0];

  const riskLevel: InsightData['riskLevel'] =
    missing.length >= 2 || (a7 !== null && a7 < 50 && weak.length >= 2) ? 'at_risk' : missing.length === 1 || weak.length >= 2 || (a7 !== null && a7 < 65) ? 'watch' : 'on_track';

  const errorsBySkill = new Map<string, number>();
  for (const e of ctx.recentErrors) errorsBySkill.set(e.skillId, (errorsBySkill.get(e.skillId) ?? 0) + 1);
  const misconceptions = [...errorsBySkill.entries()]
    .filter(([id, n]) => n >= 2 || weak.some((w) => w.skillId === id))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, n]) => ({
      skillId: id,
      text: MISCONCEPTIONS[id] ?? `Repeated errors on ${name(id)} (${n} recent). Review the worked examples to find the step where the method breaks down.`,
    }));

  const growth: InsightData['growth'] = [];
  if (a7 !== null && p7 !== null && a7 - p7 >= 8) growth.push({ text: `Accuracy rose from ${p7}% to ${a7}% over the last two weeks.` });
  for (const s of strong.filter((x) => x.lastPracticedAt && Date.now() - new Date(x.lastPracticedAt).getTime() < 7 * 86_400_000).slice(0, 2)) {
    growth.push({ skillId: s.skillId, text: `Recently reached ${s.level} on ${s.name}.` });
  }
  for (const s of developing.slice(0, 2)) growth.push({ skillId: s.skillId, text: `${s.name} is developing (${s.level}); a few more correct answers in a new session will move it up.` });

  const actions: ProposedAction[] = [];
  if (weak.length) {
    actions.push(
      action({
        type: 'assign_practice',
        title: `Targeted practice: ${weak.slice(0, 2).map((w) => w.name).join(' & ')}`,
        skillIds: weak.slice(0, 2).map((w) => w.skillId),
        studentIds: [ctx.student.id],
        questionCount: 8,
        dueInDays: 3,
        rationale: `${first} is below 45% estimated mastery on ${weak.length === 1 ? 'this skill' : 'these skills'} after several attempts. Short, spaced practice with hints is the fastest fix.`,
      }),
    );
  }
  const reviewSkills = strong.filter((s) => s.lastPracticedAt && Date.now() - new Date(s.lastPracticedAt).getTime() > 14 * 86_400_000).slice(0, 3);
  if (reviewSkills.length) {
    actions.push(
      action({
        type: 'assign_review',
        title: 'Spaced review of earlier skills',
        skillIds: reviewSkills.map((s) => s.skillId),
        studentIds: [ctx.student.id],
        questionCount: 6,
        dueInDays: 5,
        rationale: 'These skills were secure but have not been practised for over two weeks; a quick retrieval set keeps them from fading.',
      }),
    );
  }
  if (missing.length >= 2) {
    actions.push(
      action({
        type: 'check_in',
        title: `Check in with ${first} about ${missing.length} missing assignments`,
        skillIds: [],
        studentIds: [ctx.student.id],
        rationale: `Missing: ${missing.map((m) => m.title).slice(0, 3).join(', ')}. A short conversation can uncover whether the barrier is time, access or confidence.`,
      }),
    );
  }
  if (!weak.length && strong.length >= 3 && actions.length < 3) {
    const nextLesson = ctx.skills.find((s) => s.attempts === 0);
    actions.push(
      action({
        type: 'challenge',
        title: 'Extension challenge set',
        skillIds: strong.slice(0, 3).map((s) => s.skillId),
        studentIds: [ctx.student.id],
        questionCount: 6,
        dueInDays: 5,
        rationale: `${first} is secure on the taught skills. Harder mixed questions${nextLesson ? ` (or previewing ${nextLesson.name})` : ''} will keep them stretched.`,
      }),
    );
  }

  const headline =
    riskLevel === 'at_risk'
      ? `${first} needs support now: ${weak.length ? `${weak.length} weak skill${weak.length > 1 ? 's' : ''}` : ''}${weak.length && missing.length ? ' and ' : ''}${missing.length ? `${missing.length} missing assignment${missing.length > 1 ? 's' : ''}` : ''}.`
      : riskLevel === 'watch'
        ? `${first} is progressing but has ${weak.length ? `${weak.length} skill${weak.length > 1 ? 's' : ''} to firm up` : 'work to catch up on'}.`
        : `${first} is on track at ${ctx.coursePercent}% course mastery.`;

  const summary = [
    `${first} has practised ${attempted.length} skill${attempted.length === 1 ? '' : 's'} so far, with ${strong.length} at proficient or mastered.`,
    a7 !== null ? `Accuracy in the last 7 days is ${pct(a7)}${p7 !== null ? ` (previous week ${pct(p7)})` : ''}${ctx.trend.hintRate !== null ? `, with hints used on ${ctx.trend.hintRate}% of questions` : ''}.` : 'There has been no practice in the last 7 days.',
    weak.length ? `The main gaps are ${weak.slice(0, 3).map((w) => w.name).join(', ')}.` : 'There are no significant gaps in the skills practised.',
    missing.length ? `${missing.length} assignment${missing.length > 1 ? 's are' : ' is'} missing${late.length ? ` and ${late.length} were submitted late` : ''}.` : late.length ? `${late.length} assignment${late.length > 1 ? 's were' : ' was'} submitted late.` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return {
    scope: 'student',
    headline,
    summary,
    riskLevel,
    strengths: strong.slice(0, 4).map((s) => ({ skillId: s.skillId, text: `${s.name}: ${s.level} (${s.correct}/${s.attempts} correct).` })),
    weaknesses: weak.slice(0, 4).map((s) => ({ skillId: s.skillId, text: `${s.name} needs more practice.`, evidence: `${s.correct}/${s.attempts} correct; estimated mastery ${Math.round(s.pKnown * 100)}%.` })),
    misconceptions,
    growth: growth.slice(0, 4),
    nextSteps: actions.map((a) => ({ text: a.title, actionId: a.id })),
    actions,
    studentNote: weak.length
      ? `Nice work so far, ${first}! Your next step is a short practice set on ${weak[0].name}. Use the hints and read the worked solution whenever you miss one — that is how mastery is built.`
      : attempted.length
        ? `Great work, ${first}! You are secure on what has been taught. Keep your skills sharp with a quick review and try a challenge set.`
        : `Welcome, ${first}! Open your first lesson, then try a short practice set on it. A few questions each day is the quickest way to build mastery.`,
  };
}

export function analyzeClass(ctx: ClassContext): InsightData {
  const active = ctx.students.filter((s) => s.accuracy7 !== null || s.coursePercent > 0).length || ctx.studentCount;
  const reteach = ctx.skills.filter((s) => s.attemptedBy >= 2 && s.struggling.length / Math.max(1, s.attemptedBy) >= 0.4).sort((a, b) => b.struggling.length - a.struggling.length);
  const smallGroup = ctx.skills.filter((s) => s.struggling.length >= 2 && !reteach.includes(s)).sort((a, b) => b.struggling.length - a.struggling.length);
  const strong = ctx.skills.filter((s) => s.attemptedBy >= 3 && s.proficientPlus / s.attemptedBy >= 0.7).sort((a, b) => b.avgPKnown - a.avgPKnown);
  const atRisk = ctx.students.filter((s) => s.missing >= 2 || (s.accuracy7 !== null && s.accuracy7 < 50));
  const flyers = ctx.students.filter((s) => s.weakSkills.length === 0 && s.strongSkills.length >= 4 && s.missing === 0);

  const actions: ProposedAction[] = [];
  for (const s of reteach.slice(0, 1)) {
    actions.push(
      action({
        type: 'reteach_lesson',
        title: `Reteach: ${s.name}`,
        skillIds: [s.skillId],
        studentIds: [],
        lessonId: s.lessonId,
        rationale: `${s.struggling.length} of ${s.attemptedBy} students who attempted this skill are below 45% mastery — a whole-class reteach with a new worked example is more efficient than individual help.`,
      }),
    );
  }
  for (const s of [...reteach.slice(1), ...smallGroup].slice(0, 2)) {
    actions.push(
      action({
        type: 'assign_practice',
        title: `Small-group practice: ${s.name}`,
        skillIds: [s.skillId],
        studentIds: s.struggling,
        questionCount: 8,
        dueInDays: 3,
        rationale: `${s.struggling.length} ${s.struggling.length === 1 ? 'student is' : 'students are'} struggling with this skill. Targeted practice with hints and worked solutions.`,
      }),
    );
  }
  if (flyers.length) {
    actions.push(
      action({
        type: 'challenge',
        title: 'Challenge set for students who are ahead',
        skillIds: strong.slice(0, 3).map((s) => s.skillId),
        studentIds: flyers.map((f) => f.id),
        questionCount: 6,
        dueInDays: 5,
        rationale: `${flyers.length === 1 ? 'One student is' : `${flyers.length} students are`} secure on all practised skills and ready for harder, mixed problems.`,
      }),
    );
  }
  if (atRisk.length && actions.length < 4) {
    actions.push(
      action({
        type: 'check_in',
        title: `Check in with ${atRisk.length} student${atRisk.length > 1 ? 's' : ''} at risk`,
        skillIds: [],
        studentIds: atRisk.map((s) => s.id),
        rationale: 'Missing work or low recent accuracy. A quick conversation or a reminder can prevent them from falling further behind.',
      }),
    );
  }

  const groups: InsightGroup[] = [];
  for (const s of [...reteach, ...smallGroup].slice(0, 4)) {
    groups.push({ name: s.name, studentIds: s.struggling, skillIds: [s.skillId], rationale: `Below 45% estimated mastery after at least two attempts.` });
  }

  const avg = Math.round(ctx.students.reduce((sum, s) => sum + s.coursePercent, 0) / Math.max(1, ctx.students.length));
  const riskLevel: InsightData['riskLevel'] = reteach.length >= 2 || atRisk.length / Math.max(1, ctx.studentCount) > 0.3 ? 'at_risk' : reteach.length || atRisk.length ? 'watch' : 'on_track';
  const headline = reteach.length
    ? `${reteach[0].name} is the class’s biggest gap — ${reteach[0].struggling.length} ${reteach[0].struggling.length === 1 ? 'student is' : 'students are'} struggling.`
    : atRisk.length
      ? `Most students are progressing; ${atRisk.length} ${atRisk.length === 1 ? 'needs' : 'need'} a check-in.`
      : `The class is on track with an average of ${avg}% course mastery.`;
  const summary = [
    `${active} of ${ctx.studentCount} students have practised recently; average course mastery is ${avg}%.`,
    strong.length ? `The class is strongest in ${strong.slice(0, 2).map((s) => s.name).join(' and ')}.` : '',
    reteach.length ? `Whole-class reteaching is recommended for ${reteach.slice(0, 2).map((s) => s.name).join(' and ')}.` : smallGroup.length ? `Small-group support is recommended for ${smallGroup.slice(0, 2).map((s) => s.name).join(' and ')}.` : '',
    atRisk.length ? `${atRisk.map((s) => s.name.split(' ')[0]).slice(0, 4).join(', ')}${atRisk.length > 4 ? ' and others' : ''} have missing work or low accuracy.` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const errorsBySkill = new Map<string, number>();
  for (const e of ctx.recentErrors) errorsBySkill.set(e.skillId, (errorsBySkill.get(e.skillId) ?? 0) + 1);

  return {
    scope: 'class',
    headline,
    summary,
    riskLevel,
    strengths: strong.slice(0, 4).map((s) => ({ skillId: s.skillId, text: `${s.name}: ${s.proficientPlus}/${s.attemptedBy} students proficient or better.` })),
    weaknesses: [...reteach, ...smallGroup].slice(0, 4).map((s) => ({ skillId: s.skillId, text: `${s.name}`, evidence: `${s.struggling.length}/${s.attemptedBy} struggling; average mastery ${Math.round(s.avgPKnown * 100)}%.` })),
    misconceptions: [...errorsBySkill.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => ({ skillId: id, text: MISCONCEPTIONS[id] ?? `Frequent errors on ${name(id)}.` })),
    growth: ctx.students
      .filter((s) => s.accuracy7 !== null && s.accuracy7 >= 80)
      .slice(0, 3)
      .map((s) => ({ text: `${s.name} answered ${s.accuracy7}% correctly this week.` })),
    nextSteps: actions.map((a) => ({ text: a.title, actionId: a.id })),
    actions,
    groups,
  };
}
