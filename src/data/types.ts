/** Domain model shared by the demo (browser) backend and the Supabase backend. */
import type { AssignmentContent, AssignmentSettings, AssignmentType, StoredResponse } from '@engine/assemble.ts';
import type { Difficulty, ItemRef } from '@engine/types.ts';
import type { SkillState } from '@engine/mastery.ts';
import type { Integrity } from '@engine/integrity.ts';
import type { InsightData, ProposedAction } from '@engine/ai/types.ts';
import type { ReportCardContent } from '@engine/ai/reportCard.ts';
import type { BoardPage } from '@/lib/ink.ts';

export type Role = 'teacher' | 'student';

export type TeacherStatus = 'approved' | 'pending' | 'rejected';

export interface Profile {
  id: string;
  role: Role;
  fullName: string;
  email: string;
  username?: string | null;
  avatarColor: string;
  createdAt: string;
  /** Can open the platform admin console. */
  platformAdmin?: boolean;
  /** Teachers who sign up themselves may need an administrator's approval. */
  teacherStatus?: TeacherStatus | null;
  disabled?: boolean;
  /** Joined a class by link with only a name: no email or password, and this device keeps the session. */
  nameOnly?: boolean;
  /** Where the learner goes to school (`engine/curricula.ts`), chosen on "Find your course". */
  curriculum?: string | null;
}

export interface ClassSettings {
  /** Hours before the due date at which students who have not submitted are reminded. */
  reminderHours: number[];
  /** Let the AI assistant assign targeted practice automatically after graded work. */
  aiAutopilot: boolean;
  /** Also send reminders by email (production only, requires an email provider). */
  emailReminders: boolean;
  /** IANA time zone used for due times in notifications and emails. */
  timezone?: string;
  /** Students who use the class code send a request the teacher approves (off for older classes). */
  joinApproval?: boolean;
}

export type LessonEditStatus = 'pending' | 'approved' | 'declined' | 'withdrawn' | 'replaced' | 'reverted';

/** A teacher's suggested change to one section of a lesson. */
export interface LessonEdit {
  id: string;
  lessonId: string;
  sectionTitle: string;
  /** Fingerprint of the file section the edit replaces. */
  baseHash: string;
  /** The section as it was when the edit was suggested. */
  original: string;
  /** The suggested section Markdown, from its "## " heading. */
  markdown: string;
  reason: string | null;
  status: LessonEditStatus;
  adminNote: string | null;
  createdAt: string;
  decidedAt: string | null;
  /** Who suggested it (administrator views only). */
  author?: { id: string; name: string };
}

export interface LessonEditInput {
  lessonId: string;
  sectionTitle: string;
  baseHash: string;
  original: string;
  markdown: string;
  reason: string;
}

export type CourseRequestStatus = 'new' | 'approved' | 'declined' | 'done';

/** A request for a course or topic Gradileo does not have yet. */
export interface CourseRequest {
  id: string;
  kind: 'course' | 'topic';
  title: string;
  grade: number | null;
  details: string | null;
  status: CourseRequestStatus;
  adminNote: string | null;
  /** The GitHub issue opened for the build session, once approved. */
  issueUrl: string | null;
  createdAt: string;
  decidedAt: string | null;
  /** Who asked (administrator views only). */
  requester?: { id: string; name: string; role: Role };
}

export interface CourseRequestInput {
  kind: 'course' | 'topic';
  title: string;
  grade: number | null;
  details: string;
}

/** What happened when a student used a class code. */
export interface JoinResult {
  status: 'joined' | 'pending';
  classId: string;
  className: string;
  teacherName: string | null;
}

/** A student's request to join a teacher's class, as the student sees it. */
export interface MyJoinRequest {
  id: string;
  classId: string;
  className: string;
  section: string | null;
  courseId: string;
  teacherName: string | null;
  status: 'pending' | 'approved' | 'declined';
  createdAt: string;
  decidedAt: string | null;
  /** Approved as a student already in the class: this device takes over that student's account. */
  linked: boolean;
}

/** A pending request to join a class, as the teacher sees it. */
export interface ClassJoinRequest {
  id: string;
  studentId: string;
  fullName: string;
  /** Empty for a student who joined with the class link. */
  email: string;
  message: string | null;
  createdAt: string;
  /** Joined with the class link, with only a name. */
  nameOnly: boolean;
  /** A student in the class who joined the same way with the same name: most likely the same student on another device. */
  match: { studentId: string; fullName: string } | null;
}

/** The teacher's decision on one request; `sameAs` approves it as that student already in the class. */
export interface JoinDecision {
  requestId: string;
  approve: boolean;
  sameAs?: string | null;
}

/** A class as someone with its link sees it before joining. */
export interface JoinLinkClass {
  className: string;
  teacherName: string | null;
}

export interface ClassRoom {
  id: string;
  /** No teacher for a student's self-paced class. */
  teacherId: string | null;
  /** A teacher's class, or a student's own self-paced class for a course. */
  kind: 'teacher' | 'self';
  name: string;
  section: string | null;
  courseId: string;
  joinCode: string;
  settings: ClassSettings;
  createdAt: string;
  archived: boolean;
}

export interface Publication {
  classId: string;
  lessonId: string;
  publishedAt: string;
}

export interface Resource {
  id: string;
  classId: string;
  lessonId: string | null;
  kind: 'video' | 'link' | 'note';
  title: string;
  url: string | null;
  body: string | null;
  createdAt: string;
}

/** A whiteboard saved to a lesson in one class. */
export interface Board {
  id: string;
  classId: string;
  lessonId: string;
  title: string;
  pages: BoardPage[];
  /** Students in the class can view it with the lesson. */
  shared: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BoardInput {
  id?: string;
  classId: string;
  lessonId: string;
  title: string;
  pages: BoardPage[];
  shared?: boolean;
}

/** A teacher's choices for presenting one lesson to one class. */
export interface LessonPrefs {
  classId: string;
  lessonId: string;
  /** Keys of the lesson blocks hidden from the slides (see slideKeys in PresentMode). */
  hidden: string[];
}

/**
 * A question the teacher sends to the class during a lesson. Every student gets the same question
 * (the skill, difficulty and seed fix it); answers are graded on the teacher's screen.
 */
export interface LiveQuestion {
  id: string;
  classId: string;
  lessonId: string | null;
  skillId: string;
  difficulty: Difficulty;
  seed: number;
  /** Open questions take answers; closed ones show their results. */
  status: 'open' | 'closed';
  createdAt: string;
}

export interface LiveAnswer {
  questionId: string;
  studentId: string;
  responses: string[];
  answeredAt: string;
}

/** The lesson a teacher is presenting to a class right now. */
export interface Presentation {
  classId: string;
  lessonId: string;
  startedAt: string;
}

/** A student's question to the teacher during a presentation. */
export interface ClassQuestion {
  id: string;
  classId: string;
  lessonId: string;
  studentId: string;
  /** The teacher sees every name (and a student their own); null when it is not known. */
  studentName: string | null;
  body: string;
  /** Kept off the class's screen. The teacher still sees who asked. */
  anonymous: boolean;
  status: 'new' | 'answered' | 'skipped';
  /** When the presentation it was asked in began. */
  presentedAt: string;
  createdAt: string;
}

export type AssignmentStatus = 'draft' | 'published' | 'archived';

export interface Assignment {
  id: string;
  classId: string;
  title: string;
  type: AssignmentType;
  instructions: string;
  content: AssignmentContent;
  settings: AssignmentSettings;
  openAt: string | null;
  dueAt: string | null;
  allowLate: boolean;
  reminderHours: number[];
  assignedTo: 'all' | string[];
  status: AssignmentStatus;
  createdAt: string;
  publishedAt: string | null;
  createdBy: 'teacher' | 'ai';
  aiRationale: string | null;
}

export type SubmissionStatus = 'in_progress' | 'submitted' | 'graded' | 'returned';

export interface Submission {
  id: string;
  assignmentId: string | null;
  classId: string;
  studentId: string;
  attempt: number;
  status: SubmissionStatus;
  seed: number;
  items: ItemRef[];
  responses: Record<number, StoredResponse>;
  /** For self-directed practice (no assignment): the skills being practised. */
  practiceSkillIds: string[] | null;
  startedAt: string;
  submittedAt: string | null;
  score: number | null;
  maxScore: number | null;
  percent: number | null;
  pendingManual: number;
  late: boolean;
  feedback: string | null;
  /** Tab switches and, in exam mode, exits from full screen and camera-off events. */
  integrity: Integrity;
  masteryChanges?: Array<{ skillId: string; before: string; after: string; pBefore: number; pAfter: number }>;
}

export interface SkillMastery extends SkillState {
  studentId: string;
}

export interface SkillEvent {
  id: string;
  studentId: string;
  classId: string;
  skillId: string;
  correct: boolean;
  assisted: boolean;
  submissionId: string;
  assignmentId: string | null;
  at: string;
  prompt?: string;
  answer?: string;
  expected?: string;
}

export type NotificationKind = 'assignment' | 'reminder' | 'graded' | 'announcement' | 'insight' | 'overdue' | 'submission' | 'admin';

export interface AppNotification {
  id: string;
  userId: string;
  kind: NotificationKind;
  title: string;
  body: string;
  link: string | null;
  createdAt: string;
  readAt: string | null;
  assignmentId: string | null;
}

export interface Insight {
  id: string;
  classId: string;
  studentId: string | null;
  createdAt: string;
  source: 'minimax' | 'offline';
  model: string | null;
  data: InsightData;
  error?: string | null;
}

/** Who sees a forum question: only the teacher, the whole class, or the class without the author's name. */
export type ForumVisibility = 'teacher' | 'class' | 'anonymous';

/** A question (topicId null) or a reply in a class's forum, as the reader may see it. */
export interface ForumPost {
  id: string;
  classId: string;
  topicId: string | null;
  /** Questions only. */
  title: string | null;
  body: string;
  visibility: ForumVisibility;
  pinned: boolean;
  answered: boolean;
  /** Hidden from the class by the teacher (the teacher and the author still see it). */
  hidden: boolean;
  createdAt: string;
  /** Null when the reader may not know it (a classmate's question posted without a name). */
  authorId: string | null;
  authorName: string;
  authorRole: 'teacher' | 'student';
  mine: boolean;
}

/** A student's report card (engine/ai/reportCard.ts): a draft until the teacher shares it. */
export interface ReportCard {
  id: string;
  classId: string;
  studentId: string;
  period: string;
  content: ReportCardContent;
  status: 'draft' | 'shared';
  source: 'minimax' | 'offline';
  model: string | null;
  /** The private link's token for parents, or null when the link is off. */
  shareToken: string | null;
  createdAt: string;
  updatedAt: string;
  sharedAt: string | null;
}

/** A shared report card read by its private link, without signing in. */
export interface SharedReportCard {
  period: string;
  content: ReportCardContent;
  sharedAt: string | null;
  studentName: string;
  className: string;
  courseId: string;
  teacherName: string;
}

export interface Announcement {
  id: string;
  classId: string;
  authorId: string;
  title: string;
  body: string;
  createdAt: string;
}

// ---------------------------------------------------------------- platform administration

export interface AdminOverview {
  teachers: number;
  pendingTeachers: number;
  students: number;
  disabled: number;
  classes: number;
  assignments: number;
  submissions7d: number;
  activeStudents7d: number;
  aiInsights30d: number;
  signupsByWeek: Array<{ week: string; teachers: number; students: number }>;
}

export type AdminUserStatus = 'active' | 'pending' | 'disabled' | 'admin';

export interface AdminUserFilter {
  search?: string;
  role?: Role | '';
  status?: AdminUserStatus | '';
  limit?: number;
  offset?: number;
}

export interface AdminUserRow {
  id: string;
  role: Role;
  fullName: string;
  email: string;
  username: string | null;
  avatarColor: string;
  createdAt: string;
  lastSignInAt: string | null;
  platformAdmin: boolean;
  teacherStatus: TeacherStatus | null;
  disabled: boolean;
  /** Classes taught (teachers) or joined (students). */
  classes: number;
}

export interface AdminClassRow {
  id: string;
  name: string;
  section: string | null;
  courseId: string;
  teacherId: string;
  teacherName: string;
  students: number;
  assignments: number;
  lastActivity: string | null;
  createdAt: string;
  archived: boolean;
}

export interface PlatformSettings {
  /** "approval": new teachers wait for an administrator. "open": they can start immediately. */
  teacherSignup: 'open' | 'approval';
}

export interface AdminAuditEntry {
  id: string;
  createdAt: string;
  action: string;
  actorName: string | null;
  targetName: string | null;
  details: Record<string, unknown>;
}

export interface NewStudentCredential {
  fullName: string;
  username: string;
  password: string;
}

export type { AssignmentContent, AssignmentSettings, AssignmentType, StoredResponse, ItemRef, InsightData, ProposedAction };
