/**
 * Builds a realistic demo class: a teacher, 16 students with different strengths,
 * a published curriculum, past and upcoming assignments, and real graded work.
 * All grading runs through the same engine used in production, so the mastery
 * data, analytics and AI insights are internally consistent.
 */
import { Rng } from '@engine/rng.ts';
import { buildItemRefs, DEFAULT_SETTINGS, itemFromRef, type AssignmentContent, type AssignmentType, type StoredResponse } from '@engine/assemble.ts';
import { loadCourseSkills } from '@engine/curriculum/index.ts';
import { canonicalResponse } from '@engine/answers.ts';
import { isBalanced } from '@engine/chem/formula.ts';
import { processSubmission } from '@engine/submit.ts';
import type { AnswerSpec, Item } from '@engine/types.ts';
import type { SkillState } from '@engine/mastery.ts';
import { MATH10C } from '@engine/curriculum/math10c/course.ts';
import { generateInsight } from '@engine/ai/index.ts';
import type { Assignment, Submission } from '../types.ts';
import { DB_VERSION, type DemoDB, type DemoUser } from './db.ts';
import { buildAnalystInput } from './analyst.ts';

const AVATAR_COLORS = ['#6a43e3', '#2a78d6', '#0c8c4a', '#b45309', '#d03b3b', '#c2417a', '#0e7c86', '#7a5af8'];

import { DEMO_PASSWORD, DEMO_STUDENT_EMAIL, DEMO_TEACHER_EMAIL } from './constants.ts';
export { DEMO_PASSWORD, DEMO_STUDENT_EMAIL, DEMO_TEACHER_EMAIL };

const STUDENTS: Array<{ name: string; ability: number; diligence: number; units: Record<number, number> }> = [
  { name: 'Amara Okafor', ability: 0.74, diligence: 0.92, units: { 2: -0.12 } },
  { name: 'Liam Chen', ability: 0.9, diligence: 0.98, units: {} },
  { name: 'Sofia Martinez', ability: 0.66, diligence: 0.9, units: { 1: 0.08, 3: -0.1 } },
  { name: 'Noah Thompson', ability: 0.5, diligence: 0.62, units: { 2: -0.15 } },
  { name: 'Aisha Rahman', ability: 0.86, diligence: 0.96, units: { 3: 0.05 } },
  { name: 'Ethan Nguyen', ability: 0.58, diligence: 0.8, units: { 1: -0.1 } },
  { name: 'Maya Patel', ability: 0.8, diligence: 0.94, units: { 2: 0.06 } },
  { name: 'Lucas Dubois', ability: 0.44, diligence: 0.55, units: {} },
  { name: 'Zara Ahmed', ability: 0.72, diligence: 0.88, units: { 2: -0.08 } },
  { name: 'Owen MacLeod', ability: 0.62, diligence: 0.85, units: { 3: -0.12 } },
  { name: 'Chloé Tremblay', ability: 0.93, diligence: 0.99, units: {} },
  { name: 'Kai Johnson', ability: 0.55, diligence: 0.7, units: { 2: -0.1 } },
  { name: 'Fatima Yusuf', ability: 0.78, diligence: 0.93, units: { 1: -0.06 } },
  { name: 'Mateo Rossi', ability: 0.68, diligence: 0.84, units: { 3: 0.06 } },
  { name: 'Hannah Kim', ability: 0.84, diligence: 0.97, units: { 2: 0.05 } },
  { name: 'Daniel Mensah', ability: 0.6, diligence: 0.78, units: { 1: 0.05, 2: -0.05 } },
];

function slug(name: string) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .split(' ')[0];
}

function unitOf(skillId: string): number {
  const lesson = MATH10C.lessons.find((l) => l.skills.includes(skillId));
  return lesson ? Number(lesson.unitId.replace('m10c-u', '')) : 1;
}

/** A plausible wrong answer for an answer spec. */
function wrongResponse(spec: AnswerSpec, rng: Rng): string {
  switch (spec.kind) {
    case 'mc': {
      const others = spec.choices.filter((c) => c.id !== spec.correct);
      return others.length ? rng.pick(others).id : spec.correct;
    }
    case 'multi': {
      const all = spec.choices.map((c) => c.id);
      const pick = rng.sample(all, Math.max(1, Math.min(all.length - 1, spec.correct.length)));
      return pick.join(',') === spec.correct.join(',') ? all.join(',') : pick.join(',');
    }
    case 'order':
      return [...spec.correctOrder].reverse().join(',');
    case 'numeric': {
      if (spec.undefinedValue) return '0';
      const v = spec.value;
      const f = rng.pick([0.5, 0.9, 1.1, 1.5, 2, -1]);
      const w = v === 0 ? rng.pick([1, -1, 2]) : v * f;
      return String(Math.round(w * 100) / 100);
    }
    case 'expression':
      return `${spec.expected}+${rng.int(1, 5)}`;
    case 'line':
      return `y = ${rng.int(-4, 4) || 1}x + ${rng.int(-5, 5)}`;
    case 'equation-fn':
      return `${spec.fnName}(${spec.variable}) = ${spec.expected} + 1`;
    case 'point':
      return `(${spec.y}, ${spec.x === spec.y ? spec.x + 1 : spec.x})`;
    case 'graph-line':
      return JSON.stringify([
        [0, 0],
        [1, 3],
      ]);
    case 'graph-points':
      return JSON.stringify([[0, 0]]);
    case 'numbers':
      return spec.values.length ? spec.values.map((v) => v + 1).join(', ') : '0';
    case 'text':
      return 'not sure';
    case 'formula':
      return spec.expected === 'H2O2' ? 'H2O' : 'H2O2';
    case 'coefficients': {
      // All 1s, or a 2 first when 1s happen to balance it.
      const ones = [...spec.reactants, ...spec.products].map(() => 1);
      if (isBalanced(spec.reactants, spec.products, ones)) ones[0] = 2;
      return ones.join(',');
    }
    case 'manual':
      return 'I think the answer is about 12 because I multiplied the sides.';
  }
}

interface PlanItem {
  title: string;
  type: AssignmentType;
  sections: Array<[string, number]>;
  dueDays: number;
  lessonId?: string;
  readingText?: string;
  status?: 'published' | 'draft';
  /** Fraction of students who have already submitted an upcoming assignment. */
  doneShare?: number;
  instructions?: string;
}

const PLAN: PlanItem[] = [
  { title: 'Units, Referents & Measuring', type: 'homework', sections: [['m1-referents', 3], ['m1-estimate', 2], ['m1-read-ruler-imperial', 3], ['m1-vernier', 2]], dueDays: -26, instructions: 'Complete all questions. Use the hints if you get stuck — and read the worked solution after any mistake.' },
  { title: 'Conversions Classwork', type: 'classwork', sections: [['m2-si-convert', 3], ['m2-imperial-convert', 3], ['m2-between', 3]], dueDays: -23, instructions: 'Work with your partner, but submit your own answers.' },
  { title: 'Surface Area Homework', type: 'homework', sections: [['m3-sa-prism', 3], ['m3-sa-cylinder', 3], ['m3-sa-cone', 2], ['m3-sa-sphere', 2]], dueDays: -19 },
  { title: 'Measurement Quiz', type: 'quiz', sections: [['m2-between', 2], ['m3-sa-pyramid', 2], ['m3-vol-prism-cyl', 2], ['m3-vol-pyr-cone', 2], ['m3-composite', 2]], dueDays: -15, instructions: 'You have 30 minutes. No hints. Show your work on paper.' },
  { title: 'Tangent Ratio Practice', type: 'practice', sections: [['m4-label-sides', 3], ['m4-tan-length', 3], ['m4-tan-angle', 3]], dueDays: -11 },
  { title: 'Sine & Cosine Homework', type: 'homework', sections: [['m4-write-ratio', 2], ['m4-choose-ratio', 2], ['m4-sincos-length', 3], ['m4-sincos-angle', 3]], dueDays: -8 },
  { title: 'Unit 2 Test: Trigonometry', type: 'exam', sections: [['m4-pythagoras', 2], ['m4-solve-triangle', 2], ['m4-elevation-depression', 3], ['m4-two-triangles', 2], ['m4-sincos-length', 1]], dueDays: -4, instructions: 'Calculator allowed. Round lengths to the nearest tenth.' },
  { title: 'Prime Factors, GCF & LCM', type: 'homework', sections: [['a1-prime-factorization', 3], ['a1-gcf', 2], ['a1-lcm', 2], ['a1-gcf-lcm-problems', 2]], dueDays: -1 },
  { title: 'Read: Irrational Numbers (Lesson 3.3)', type: 'lesson', sections: [], lessonId: 'm10c-3-3', dueDays: 0.22, doneShare: 0.35, instructions: 'Read the lesson and try every “Check your understanding” question before class.' },
  { title: 'Radicals Classwork', type: 'classwork', sections: [['a2-mixed-radical', 4], ['a2-entire-radical', 3], ['a2-order', 2]], dueDays: 2, doneShare: 0.25 },
  { title: 'Factors & Roots Quiz', type: 'quiz', sections: [['a1-gcf', 1], ['a1-lcm', 1], ['a1-sqrt-cbrt', 2], ['a2-classify', 2], ['a2-mixed-radical', 2]], dueDays: 4, doneShare: 0 },
  { title: 'Unit 3 Exam', type: 'exam', sections: [['a1-prime-factorization', 1], ['a1-gcf-lcm-problems', 2], ['a2-number-sets', 2], ['a2-mixed-radical', 2], ['a3-negative-zero', 2], ['a3-integral-laws', 2], ['a3-evaluate-rational', 2], ['a3-rational-laws', 2]], dueDays: 12, status: 'draft' },
];

const PUBLISHED_LESSONS = MATH10C.lessons.filter((l) => ['m10c-u1', 'm10c-u2'].includes(l.unitId) || ['m10c-3-1', 'm10c-3-2', 'm10c-3-3', 'm10c-3-4'].includes(l.id)).map((l) => l.id);

export async function buildSeed(): Promise<DemoDB> {
  // The demo class takes Grade 10 Mathematics (math-10c); its sample work is generated and graded with that course's generators.
  await loadCourseSkills('math-10c');
  const rng = new Rng(20261010);
  const now = Date.now();
  const iso = (offsetDays: number, hour?: number) => {
    const d = new Date(now + offsetDays * 86_400_000);
    if (hour !== undefined) d.setHours(hour, 0, 0, 0);
    return d.toISOString();
  };

  const teacher: DemoUser = {
    id: 'u_teacher',
    role: 'teacher',
    fullName: 'Shedrack Eze',
    email: DEMO_TEACHER_EMAIL,
    username: 'mr.eze',
    avatarColor: '#6a43e3',
    createdAt: iso(-40),
    password: DEMO_PASSWORD,
    platformAdmin: true,
    teacherStatus: 'approved',
  };
  const students: DemoUser[] = STUDENTS.map((s, i) => ({
    id: `u_s${i + 1}`,
    role: 'student',
    fullName: s.name,
    email: `${slug(s.name)}@gradileo.demo`,
    username: slug(s.name),
    avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
    createdAt: iso(-38),
    password: DEMO_PASSWORD,
  }));

  const classId = 'c_math10a';
  const db: DemoDB = {
    version: DB_VERSION,
    createdAt: new Date(now).toISOString(),
    users: [teacher, ...students],
    classes: [
      {
        id: classId,
        teacherId: teacher.id,
        kind: 'teacher',
        name: 'Math 10',
        section: 'Block A',
        courseId: 'math-10c',
        joinCode: 'MATH10',
        settings: { reminderHours: [24, 2], aiAutopilot: false, emailReminders: false, timezone: 'America/Edmonton' },
        createdAt: iso(-40),
        archived: false,
      },
    ],
    enrollments: students.map((s) => ({ classId, studentId: s.id, joinedAt: iso(-38) })),
    publications: PUBLISHED_LESSONS.map((lessonId, i) => ({ classId, lessonId, publishedAt: iso(-30 + i * 1.8) })),
    resources: [
      {
        id: 'r_1',
        classId,
        lessonId: 'm10c-2-4',
        kind: 'note',
        title: 'Clinometer activity',
        url: null,
        body: 'Bring your clinometer to class on Thursday. We will measure the height of the gym, the flagpole and the school sign, then compare with the real measurements.',
        createdAt: iso(-9),
      },
    ],
    assignments: [],
    submissions: [],
    mastery: [],
    events: [],
    notifications: [],
    insights: [],
    announcements: [
      { id: 'an_1', classId, authorId: teacher.id, title: 'Welcome to Math 10!', body: 'Every lesson has worked examples and practice with instant feedback. Aim for **mastery**, not just completion — practise until a skill shows *Proficient* or *Mastered*.', createdAt: iso(-38) },
      { id: 'an_2', classId, authorId: teacher.id, title: 'Unit 2 test results are in', body: 'Great effort on the trigonometry test. Check your results and practise any skill below *Proficient* — especially angles of elevation and depression.', createdAt: iso(-3) },
    ],
    reminderLog: [],
    aiKey: null,
    aiModel: null,
  };

  // Assignments
  const assignments: Assignment[] = PLAN.map((p, i) => {
    const content: AssignmentContent = { sections: p.sections.map(([skillId, count]) => ({ skillId, count, difficulty: 'mixed' as const })), custom: [], lessonId: p.lessonId };
    const dueAt = p.dueDays < 1 && p.dueDays > 0 ? new Date(now + p.dueDays * 86_400_000).toISOString() : iso(p.dueDays, 21);
    return {
      id: `a_${i + 1}`,
      classId,
      title: p.title,
      type: p.type,
      instructions: p.instructions ?? '',
      content,
      settings: { ...DEFAULT_SETTINGS[p.type] },
      openAt: null,
      dueAt,
      allowLate: true,
      reminderHours: [24, 2],
      assignedTo: 'all',
      status: p.status ?? 'published',
      createdAt: iso(Math.floor(p.dueDays) - 5),
      publishedAt: p.status === 'draft' ? null : iso(Math.floor(p.dueDays) - 5),
      createdBy: 'teacher',
      aiRationale: null,
    };
  });
  // Show one custom written-response question that needs teacher grading.
  assignments[6].content.custom.push({
    id: 'q_written',
    prompt: 'Explain, in your own words, how you decide whether to use sine, cosine or tangent in a right-triangle problem.',
    kind: 'manual',
    points: 2,
    solution: 'Label the sides relative to the angle; choose the ratio that uses the known side and the side you want (SOH CAH TOA).',
  });
  db.assignments = assignments;

  // Simulate work, in chronological order, through the real grading engine.
  const masteryByStudent = new Map<string, Map<string, SkillState>>();
  for (const s of students) masteryByStudent.set(s.id, new Map());

  const ordered = PLAN.map((p, i) => ({ p, a: assignments[i] })).filter(({ p }) => p.status !== 'draft');
  let subN = 0;
  for (const { p, a } of ordered) {
    const dueTime = new Date(a.dueAt!).getTime();
    for (let si = 0; si < students.length; si++) {
      const s = students[si];
      const prof = STUDENTS[si];
      const srng = rng.fork(`${a.id}:${s.id}`);
      const upcoming = dueTime > now;
      if (upcoming) {
        if (!srng.chance((p.doneShare ?? 0) * (0.6 + prof.diligence * 0.5))) {
          // Some students have started classwork but not finished.
          if (a.type === 'classwork' && srng.chance(0.3)) {
            const seed = srng.int(1, 2 ** 30);
            db.submissions.push(blankSubmission(`s_${++subN}`, a, s.id, seed, buildItemRefs(a.content, seed), new Date(now - 3_600_000).toISOString()));
          }
          continue;
        }
      } else if (!srng.chance(prof.diligence)) {
        continue; // missing
      }
      const late = !upcoming && srng.chance(0.12 * (1.2 - prof.diligence));
      const submitTime = upcoming ? now - srng.int(1, 30) * 3_600_000 : late ? dueTime + srng.int(2, 40) * 3_600_000 : dueTime - srng.int(2, 72) * 3_600_000;
      const submittedAt = new Date(Math.min(submitTime, now - 60_000)).toISOString();
      const seed = srng.int(1, 2 ** 30);
      const items = buildItemRefs(a.content, seed);
      const responses: Record<number, StoredResponse> = {};
      items.forEach((ref, idx) => {
        const item = itemFromRef(ref, a.content, a.id);
        if (!item) return;
        if ('custom' in ref) {
          responses[idx] = { answers: [wrongResponse(item.parts[0].answer, srng)], hintsUsed: 0 };
          return;
        }
        const unit = unitOf(ref.skillId);
        const learned = (masteryByStudent.get(s.id)!.get(ref.skillId)?.pKnown ?? 0) * 0.08;
        const p = Math.min(0.97, Math.max(0.08, prof.ability + (prof.units[unit] ?? 0) - 0.1 * (ref.difficulty - 2) + learned + (srng.next() - 0.5) * 0.2));
        const correct = srng.chance(p);
        const hints = a.settings.hints && !correct && srng.chance(0.35) ? 1 : a.settings.hints && srng.chance(0.08) ? 1 : 0;
        responses[idx] = { answers: answersFor(item, correct, srng), hintsUsed: hints, timeMs: srng.int(25, 240) * 1000, at: submittedAt };
      });
      const sub = blankSubmission(`s_${++subN}`, a, s.id, seed, items, new Date(new Date(submittedAt).getTime() - srng.int(10, 50) * 60_000).toISOString());
      if (a.type === 'lesson') {
        Object.assign(sub, { status: 'graded', submittedAt, percent: 100, score: 1, maxScore: 1 });
        db.submissions.push(sub);
        continue;
      }
      const out = processSubmission({
        assignmentId: a.id,
        content: a.content,
        dueAt: a.dueAt,
        submissionId: sub.id,
        items,
        responses,
        mastery: masteryByStudent.get(s.id)!,
        now: submittedAt,
      });
      masteryByStudent.set(s.id, out.mastery);
      Object.assign(sub, {
        status: out.status,
        responses,
        submittedAt,
        score: out.summary.score,
        maxScore: out.summary.maxScore,
        percent: out.summary.percent,
        pendingManual: out.summary.pendingManual,
        late: out.late,
        masteryChanges: out.changes,
        integrity: { blurCount: a.type === 'exam' || a.type === 'quiz' ? (srng.chance(0.15) ? srng.int(1, 3) : 0) : 0 },
      } satisfies Partial<Submission>);
      // The teacher has graded the written question for about half of the class.
      if (out.summary.pendingManual && srng.chance(0.5)) {
        const idx = items.findIndex((r) => 'custom' in r);
        responses[idx] = { ...responses[idx], manualScore: srng.pick([0.5, 1]), comment: 'Good start — name the sides first, then choose the ratio.' };
        sub.status = 'returned';
        sub.pendingManual = 0;
        const bonus = (responses[idx].manualScore ?? 0) * 2;
        sub.score = (sub.score ?? 0) + bonus;
        sub.percent = Math.round(((sub.score ?? 0) / (sub.maxScore || 1)) * 1000) / 10;
      }
      db.submissions.push(sub);
      for (const e of out.events) {
        db.events.push({
          id: `e_${db.events.length + 1}`,
          studentId: s.id,
          classId,
          skillId: e.skillId,
          correct: e.correct,
          assisted: e.assisted,
          submissionId: sub.id,
          assignmentId: a.id,
          at: e.at,
          ...(e.correct ? {} : { prompt: e.prompt.slice(0, 180), answer: e.answer, expected: e.expected.slice(0, 80) }),
        });
      }
    }
  }

  // A little self-directed practice from motivated students (spaced practice).
  for (let si = 0; si < students.length; si++) {
    const prof = STUDENTS[si];
    if (prof.diligence < 0.9) continue;
    const s = students[si];
    const states = masteryByStudent.get(s.id)!;
    const weakest = [...states.values()].filter((x) => x.attempts > 0).sort((x, y) => x.pKnown - y.pKnown)[0];
    if (!weakest) continue;
    const srng = rng.fork(`practice:${s.id}`);
    const seed = srng.int(1, 2 ** 30);
    const items = [1, 2, 2, 3, 2, 3].map((d, k) => ({ skillId: weakest.skillId, seed: seed + k, difficulty: d as 1 | 2 | 3 }));
    const responses: Record<number, StoredResponse> = {};
    const at = iso(-srng.int(1, 6), 19);
    items.forEach((ref, idx) => {
      const item = itemFromRef(ref, { sections: [], custom: [] }, 'practice')!;
      responses[idx] = { answers: answersFor(item, srng.chance(0.5 + idx * 0.08), srng), hintsUsed: 0, at };
    });
    const sub: Submission = { ...blankSubmission(`s_${++subN}`, null, s.id, seed, items, at), practiceSkillIds: [weakest.skillId], classId };
    const out = processSubmission({ assignmentId: null, content: { sections: [], custom: [] }, dueAt: null, submissionId: sub.id, items, responses, mastery: states, now: at });
    masteryByStudent.set(s.id, out.mastery);
    Object.assign(sub, { status: 'graded', responses, submittedAt: at, score: out.summary.score, maxScore: out.summary.maxScore, percent: out.summary.percent, masteryChanges: out.changes });
    db.submissions.push(sub);
    for (const e of out.events) {
      db.events.push({ id: `e_${db.events.length + 1}`, studentId: s.id, classId, skillId: e.skillId, correct: e.correct, assisted: e.assisted, submissionId: sub.id, assignmentId: null, at, ...(e.correct ? {} : { prompt: e.prompt.slice(0, 180), answer: e.answer, expected: e.expected.slice(0, 80) }) });
    }
  }

  for (const [studentId, states] of masteryByStudent) for (const st of states.values()) db.mastery.push({ ...st, studentId });

  // Notifications
  const amara = students[0];
  const upcoming = assignments.filter((a) => a.status === 'published' && a.dueAt && new Date(a.dueAt).getTime() > now);
  for (const a of upcoming) {
    db.notifications.push({ id: `n_${db.notifications.length + 1}`, userId: amara.id, kind: 'assignment', title: `New ${a.type}: ${a.title}`, body: `Due ${new Date(a.dueAt!).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}.`, link: `/s/work/${a.id}`, createdAt: a.publishedAt ?? a.createdAt, readAt: null, assignmentId: a.id });
  }
  db.notifications.push({ id: `n_${db.notifications.length + 1}`, userId: amara.id, kind: 'graded', title: 'Unit 2 Test: Trigonometry was graded', body: 'Your results and worked solutions are ready to review.', link: '/s/work/a_7', createdAt: iso(-3), readAt: iso(-2), assignmentId: 'a_7' });
  db.notifications.push({ id: `n_${db.notifications.length + 1}`, userId: amara.id, kind: 'announcement', title: 'Unit 2 test results are in', body: 'Check your results and practise any skill below Proficient.', link: '/s', createdAt: iso(-3), readAt: null, assignmentId: null });
  const lateSubs = db.submissions.filter((x) => x.late && x.assignmentId === 'a_8');
  for (const ls of lateSubs.slice(0, 2)) {
    const st = students.find((x) => x.id === ls.studentId)!;
    db.notifications.push({ id: `n_${db.notifications.length + 1}`, userId: teacher.id, kind: 'submission', title: `${st.fullName} submitted late`, body: 'Prime Factors, GCF & LCM', link: `/t/c/${classId}/assignments/a_8`, createdAt: ls.submittedAt!, readAt: null, assignmentId: 'a_8' });
  }
  const needsGrading = db.submissions.filter((x) => x.pendingManual > 0).length;
  if (needsGrading) {
    db.notifications.push({ id: `n_${db.notifications.length + 1}`, userId: teacher.id, kind: 'submission', title: `${needsGrading} written responses need grading`, body: 'Unit 2 Test: Trigonometry', link: `/t/c/${classId}/assignments/a_7`, createdAt: iso(-3), readAt: null, assignmentId: 'a_7' });
  }

  // An initial class insight from the offline analyst so the dashboard is never empty.
  const input = buildAnalystInput(db, classId);
  const res = await generateInsight(input, { scope: 'class' });
  db.insights.push({ id: 'i_1', classId, studentId: null, createdAt: iso(-1), source: res.source, model: res.model, data: res.data });

  return db;
}

function answersFor(item: Item, correct: boolean, rng: Rng): string[] {
  return item.parts.map((p) => (correct ? canonicalResponse(p.answer) : wrongResponse(p.answer, rng)));
}

function blankSubmission(id: string, a: Assignment | null, studentId: string, seed: number, items: Submission['items'], startedAt: string): Submission {
  return {
    id,
    assignmentId: a?.id ?? null,
    classId: a?.classId ?? 'c_math10a',
    studentId,
    attempt: 1,
    status: 'in_progress',
    seed,
    items,
    responses: {},
    practiceSkillIds: null,
    startedAt,
    submittedAt: null,
    score: null,
    maxScore: null,
    percent: null,
    pendingManual: 0,
    late: false,
    feedback: null,
    integrity: { blurCount: 0 },
  };
}
