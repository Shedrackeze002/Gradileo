/** Row ↔ domain mapping for the Supabase backend (snake_case ↔ camelCase). */
import type {
  AdminAuditEntry,
  AdminClassRow,
  AdminUserRow,
  Announcement,
  AppNotification,
  Assignment,
  ClassJoinRequest,
  CourseRequest,
  LessonEdit,
  ClassRoom,
  Insight,
  MyJoinRequest,
  Profile,
  Publication,
  ReportCard,
  Resource,
  Board,
  LiveAnswer,
  LiveQuestion,
  Presentation,
  ClassQuestion,
  SkillEvent,
  SkillMastery,
  Submission,
} from '../types.ts';
import { parsePages } from '@/lib/ink.ts';
import { cleanIntegrity } from '@engine/integrity.ts';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;

export const toProfile = (r: Row): Profile => ({
  id: r.id,
  role: r.role,
  fullName: r.full_name,
  // A student who joined with the class link has only an internal address, never shown.
  email: r.name_only ? '' : r.email,
  username: r.username,
  avatarColor: r.avatar_color,
  createdAt: r.created_at,
  platformAdmin: !!r.platform_admin,
  teacherStatus: r.teacher_status ?? null,
  disabled: !!r.disabled_at,
  nameOnly: !!r.name_only,
});

export const toClass = (r: Row): ClassRoom => ({
  id: r.id,
  teacherId: r.teacher_id ?? null,
  kind: r.kind === 'self' ? 'self' : 'teacher',
  name: r.name,
  section: r.section,
  courseId: r.course_id,
  joinCode: r.join_code,
  settings: { reminderHours: [24, 2], aiAutopilot: false, emailReminders: false, ...(r.settings ?? {}) },
  createdAt: r.created_at,
  archived: r.archived,
});

export const toPublication = (r: Row): Publication => ({ classId: r.class_id, lessonId: r.lesson_id, publishedAt: r.published_at });

export const toResource = (r: Row): Resource => ({
  id: r.id,
  classId: r.class_id,
  lessonId: r.lesson_id,
  kind: r.kind,
  title: r.title,
  url: r.url,
  body: r.body,
  createdAt: r.created_at,
});

export const toBoard = (r: Row): Board => ({
  id: r.id,
  classId: r.class_id,
  lessonId: r.lesson_id,
  title: r.title,
  pages: parsePages(r.pages),
  shared: r.shared,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

export const toLiveQuestion = (r: Row): LiveQuestion => ({
  id: r.id,
  classId: r.class_id,
  lessonId: r.lesson_id,
  skillId: r.skill_id,
  difficulty: r.difficulty,
  seed: Number(r.seed),
  status: r.status,
  createdAt: r.created_at,
});

export const toLiveAnswer = (r: Row): LiveAnswer => ({
  questionId: r.question_id,
  studentId: r.student_id,
  responses: Array.isArray(r.responses) ? r.responses.map((x: unknown) => String(x ?? '')) : [],
  answeredAt: r.answered_at,
});

export const toPresentation = (r: Row): Presentation => ({ classId: r.class_id, lessonId: r.lesson_id, startedAt: r.started_at });

export const toClassQuestion = (r: Row): ClassQuestion => ({
  id: r.id,
  classId: r.class_id,
  lessonId: r.lesson_id,
  studentId: r.student_id,
  studentName: r.student?.full_name ?? null,
  body: r.body,
  anonymous: !!r.anonymous,
  status: r.status,
  presentedAt: r.presented_at,
  createdAt: r.created_at,
});

export const toAssignment = (r: Row): Assignment => ({
  id: r.id,
  classId: r.class_id,
  title: r.title,
  type: r.type,
  instructions: r.instructions ?? '',
  content: r.content,
  settings: r.settings,
  openAt: r.open_at,
  dueAt: r.due_at,
  allowLate: r.allow_late,
  reminderHours: r.reminder_hours ?? [24, 2],
  assignedTo: r.assigned_to && r.assigned_to.length ? r.assigned_to : 'all',
  status: r.status,
  createdAt: r.created_at,
  publishedAt: r.published_at,
  createdBy: r.created_by,
  aiRationale: r.ai_rationale,
});

export const fromAssignment = (a: Partial<Assignment>): Row => {
  const r: Row = {};
  if (a.classId !== undefined) r.class_id = a.classId;
  if (a.title !== undefined) r.title = a.title;
  if (a.type !== undefined) r.type = a.type;
  if (a.instructions !== undefined) r.instructions = a.instructions;
  if (a.content !== undefined) r.content = a.content;
  if (a.settings !== undefined) r.settings = a.settings;
  if (a.openAt !== undefined) r.open_at = a.openAt;
  if (a.dueAt !== undefined) r.due_at = a.dueAt;
  if (a.allowLate !== undefined) r.allow_late = a.allowLate;
  if (a.reminderHours !== undefined) r.reminder_hours = a.reminderHours;
  if (a.assignedTo !== undefined) r.assigned_to = a.assignedTo === 'all' ? null : a.assignedTo;
  if (a.createdBy !== undefined) r.created_by = a.createdBy;
  if (a.aiRationale !== undefined) r.ai_rationale = a.aiRationale;
  return r;
};

/**
 * The columns an edit of a saved assignment writes. An assignment stays in its class, and teachers
 * have no UPDATE grant on class_id, so an update naming it is refused outright ("permission denied").
 */
export const assignmentChanges = (a: Partial<Assignment>): Row => {
  const r = fromAssignment(a);
  delete r.class_id;
  return r;
};

export const toSubmission = (r: Row): Submission => ({
  id: r.id,
  assignmentId: r.assignment_id,
  classId: r.class_id,
  studentId: r.student_id,
  attempt: r.attempt,
  status: r.status,
  seed: Number(r.seed),
  items: r.items ?? [],
  responses: r.responses ?? {},
  practiceSkillIds: r.practice_skill_ids,
  startedAt: r.started_at,
  submittedAt: r.submitted_at,
  score: r.score === null ? null : Number(r.score),
  maxScore: r.max_score === null ? null : Number(r.max_score),
  percent: r.percent === null ? null : Number(r.percent),
  pendingManual: r.pending_manual ?? 0,
  late: r.late,
  feedback: r.feedback,
  integrity: cleanIntegrity(r.integrity),
  masteryChanges: r.mastery_changes ?? undefined,
});

export const toMastery = (r: Row): SkillMastery => ({
  studentId: r.student_id,
  skillId: r.skill_id,
  pKnown: r.p_known,
  attempts: r.attempts,
  correct: r.correct,
  streak: r.streak,
  sessions: r.sessions,
  level: r.level,
  lastPracticedAt: r.last_practiced_at,
  lastCorrectAt: r.last_correct_at,
  lastSessionId: r.last_session_id,
});

export const toEvent = (r: Row): SkillEvent => ({
  id: String(r.id),
  studentId: r.student_id,
  classId: r.class_id,
  skillId: r.skill_id,
  correct: r.correct,
  assisted: r.assisted,
  submissionId: r.submission_id,
  assignmentId: r.assignment_id,
  at: r.at,
  prompt: r.prompt ?? undefined,
  answer: r.answer ?? undefined,
  expected: r.expected ?? undefined,
});

export const toNotification = (r: Row): AppNotification => ({
  id: r.id,
  userId: r.user_id,
  kind: r.kind,
  title: r.title,
  body: r.body,
  link: r.link,
  createdAt: r.created_at,
  readAt: r.read_at,
  assignmentId: r.assignment_id,
});

export const toInsight = (r: Row): Insight => ({
  id: r.id,
  classId: r.class_id,
  studentId: r.student_id,
  createdAt: r.created_at,
  source: r.source,
  model: r.model,
  data: r.data,
  error: r.error,
});

export const toReportCard = (r: Row): ReportCard => ({
  id: r.id,
  classId: r.class_id,
  studentId: r.student_id,
  period: r.period ?? '',
  content: r.content,
  status: r.status,
  source: r.source,
  model: r.model,
  shareToken: r.share_token ?? null,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
  sharedAt: r.shared_at,
});

export const toAnnouncement = (r: Row): Announcement => ({
  id: r.id,
  classId: r.class_id,
  authorId: r.author_id,
  title: r.title,
  body: r.body,
  createdAt: r.created_at,
});

export const toAdminUser = (r: Row): AdminUserRow => ({
  id: r.id,
  role: r.role,
  fullName: r.full_name,
  email: r.email,
  username: r.username,
  avatarColor: r.avatar_color,
  createdAt: r.created_at,
  lastSignInAt: r.last_sign_in_at,
  platformAdmin: !!r.platform_admin,
  teacherStatus: r.teacher_status ?? null,
  disabled: !!r.disabled_at,
  classes: Number(r.classes ?? 0),
});

export const toAdminClass = (r: Row): AdminClassRow => ({
  id: r.id,
  name: r.name,
  section: r.section,
  courseId: r.course_id,
  teacherId: r.teacher_id,
  teacherName: r.teacher_name,
  students: Number(r.students ?? 0),
  assignments: Number(r.assignments ?? 0),
  lastActivity: r.last_activity,
  createdAt: r.created_at,
  archived: r.archived,
});

export const toAuditEntry = (r: Row): AdminAuditEntry => ({
  id: String(r.id),
  createdAt: r.created_at,
  action: r.action,
  actorName: r.actor_name,
  targetName: r.target_name,
  details: r.details ?? {},
});

export const toMyJoinRequest = (r: Row): MyJoinRequest => ({
  id: r.id,
  classId: r.class_id,
  className: r.class_name,
  section: r.section ?? null,
  courseId: r.course_id,
  teacherName: r.teacher_name ?? null,
  status: r.status === 'approved' || r.status === 'declined' ? r.status : 'pending',
  createdAt: r.created_at,
  decidedAt: r.decided_at ?? null,
  linked: !!r.linked,
});

export const toClassJoinRequest = (r: Row): ClassJoinRequest => ({
  id: r.id,
  studentId: r.student_id,
  fullName: r.full_name,
  email: r.email ?? '',
  message: r.message ?? null,
  createdAt: r.created_at,
  nameOnly: !!r.name_only,
  match: r.match_id ? { studentId: r.match_id, fullName: r.match_name } : null,
});

export const toCourseRequest = (r: Row): CourseRequest => ({
  id: r.id,
  kind: r.kind === 'topic' ? 'topic' : 'course',
  title: r.title,
  grade: r.grade ?? null,
  details: r.details ?? null,
  status: r.status,
  adminNote: r.admin_note ?? null,
  issueUrl: r.issue_url ?? null,
  createdAt: r.created_at,
  decidedAt: r.decided_at ?? null,
  ...(r.requester_id ? { requester: { id: r.requester_id, name: r.requester_name ?? 'Unknown', role: r.requester_role === 'teacher' ? 'teacher' : 'student' } } : {}),
});

export const toLessonEdit = (r: Row): LessonEdit => ({
  id: r.id,
  lessonId: r.lesson_id,
  sectionTitle: r.section_title,
  baseHash: r.base_hash,
  original: r.original ?? '',
  markdown: r.markdown,
  reason: r.reason ?? null,
  status: r.status,
  adminNote: r.admin_note ?? null,
  createdAt: r.created_at,
  decidedAt: r.decided_at ?? null,
  ...(r.author_name ? { author: { id: r.author_id, name: r.author_name } } : {}),
});
