/**
 * DemoApi: a complete Gradileo backend that runs in the browser.
 *
 * - Data lives in localStorage, so it survives reloads on this device.
 * - Sessions live in sessionStorage, so you can be the teacher in one tab and a
 *   student in another — changes sync between tabs instantly.
 * - Grading, mastery, reminders and AI insights use the same engine as production.
 */
import { freshSeed } from '@engine/rng.ts';
import { buildItemRefs, DEFAULT_SETTINGS, isQuestionType, itemFromRef, TYPE_LABEL, type StoredResponse } from '@engine/assemble.ts';
import { processSubmission, validateRefs } from '@engine/submit.ts';
import { getCourse, getSkill, loadSkills } from '@engine/curriculum/index.ts';
import { Rng } from '@engine/rng.ts';
import { refSkillIds } from '@/lib/useSkills.ts';
import { dueReminders } from '@engine/reminders.ts';
import { draftFromAction } from '@engine/actions.ts';
import { generateInsight, DEFAULT_MODEL, buildStudentContext } from '@engine/ai/index.ts';
import { writeReportCard, type ReportCardContent } from '@engine/ai/reportCard.ts';
import { answerTutorQuestion, normalizeChunk, normalizeQuestion, writeTutorScript, type TutorAnswer, type TutorChunk, type TutorQuestion, type TutorScript } from '@engine/ai/tutor.ts';
import { classMastery, draftAssignment, draftContext, normalizeDraftRequest, normalizeRegenerateRequest, regenerateQuestion, type DraftRequest, type DraftResult, type RegenerateRequest, type RegenerateResult } from '@engine/ai/builder.ts';
import { markRequestFor, suggestMark, type MarkResult } from '@engine/ai/marking.ts';
import type { SkillState } from '@engine/mastery.ts';
import { exitCount, isLocked, mergeIntegrity, type Integrity } from '@engine/integrity.ts';
import type { AiConfigStatus, DataApi, SignUpInput, TutorReply } from '../api.ts';
import type {
  AdminAuditEntry,
  AdminClassRow,
  AdminOverview,
  AdminUserFilter,
  AdminUserRow,
  PlatformSettings,
  Announcement,
  AppNotification,
  Assignment,
  Board,
  BoardInput,
  ClassRoom,
  ClassJoinRequest,
  ClassSettings,
  CourseRequest,
  CourseRequestInput,
  CourseRequestStatus,
  JoinDecision,
  JoinLinkClass,
  JoinResult,
  LessonEdit,
  LessonEditInput,
  LessonEditStatus,
  MyJoinRequest,
  Insight,
  ReportCard,
  SharedReportCard,
  ForumPost,
  ForumVisibility,
  ItemRef,
  LessonPrefs,
  LiveAnswer,
  LiveQuestion,
  Presentation,
  ClassQuestion,
  NewStudentCredential,
  NotificationKind,
  Profile,
  ProposedAction,
  Publication,
  Resource,
  SkillEvent,
  SkillMastery,
  Submission,
} from '../types.ts';
import { clearDb, DB_KEY, loadDb, saveDb, type DemoDB, type DemoUser } from './db.ts';
import { buildSeed, DEMO_PASSWORD, DEMO_TEACHER_EMAIL } from './seed.ts';
import { buildAnalystInput } from './analyst.ts';
import { forumView, type DemoForumPost } from './forum.ts';
import { simulatedResponses } from './liveSim.ts';
import { uid, joinCode as makeJoinCode, friendlyPassword } from '@/lib/ids.ts';
import { cleanNamePart, sameName } from '@/lib/names.ts';
import { YOUTUBE_ID } from '@/video/youtube.ts';

const SESSION_KEY = 'educore-demo-session';
const COLORS = ['#6a43e3', '#2a78d6', '#0c8c4a', '#b45309', '#d03b3b', '#c2417a', '#0e7c86', '#7a5af8'];

function strip(u: DemoUser): Profile {
  const { password: _pw, ...p } = u;
  void _pw;
  // A student who joined with the class link has only an internal address, never shown.
  return p.nameOnly ? { ...p, email: '' } : p;
}

function sessionGet(): string | null {
  try {
    return sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}
function sessionSet(id: string | null) {
  try {
    if (id) sessionStorage.setItem(SESSION_KEY, id);
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

const nowIso = () => new Date().toISOString();
/** Questions a class might ask, for trying students' questions in demo mode. */
const SAMPLE_QUESTIONS = [
  'Can you show the second step again?',
  'Why do we divide both sides there and not subtract?',
  'Does this work for negative numbers too?',
  'Is there a quicker way to check the answer?',
  'Where would we use this outside of school?',
  'Could you go over the example one more time, a bit slower?',
];
const delay = (ms = 60) => new Promise((r) => setTimeout(r, ms));

export class DemoApi implements DataApi {
  readonly mode = 'demo' as const;
  private db!: DemoDB;
  private ready: Promise<void>;
  private authListeners = new Set<(u: Profile | null) => void>();
  private notifListeners = new Set<(n: AppNotification) => void>();
  private liveListeners = new Set<() => void>();
  private questionListeners = new Set<() => void>();
  private seenNotifications = new Set<string>();

  constructor() {
    this.ready = this.init();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key !== DB_KEY) return;
        const fresh = loadDb();
        if (!fresh) return;
        this.db = fresh;
        this.emitNewNotifications();
        // Another tab (a student's, or the teacher's) may have changed a live question, or a
        // presentation and its questions.
        this.liveListeners.forEach((l) => l());
        this.questionListeners.forEach((l) => l());
      });
    }
  }

  private async init() {
    const existing = loadDb();
    this.db = existing ?? (await buildSeed());
    // Demos saved before platform administration existed: the sample teacher is the administrator.
    if (!this.db.users.some((u) => u.platformAdmin)) {
      const t = this.db.users.find((u) => u.email === DEMO_TEACHER_EMAIL);
      if (t) Object.assign(t, { platformAdmin: true, teacherStatus: 'approved' });
    }
    // The old amber avatar was too light for white initials.
    for (const u of this.db.users) if (u.avatarColor === '#d68a00') u.avatarColor = '#b45309';
    this.db.settings ??= { teacherSignup: 'open' };
    this.db.audit ??= [];
    this.db.boards ??= [];
    this.db.lessonPrefs ??= [];
    this.db.liveQuestions ??= [];
    this.db.liveAnswers ??= [];
    this.db.presentations ??= [];
    this.db.classQuestions ??= [];
    this.db.joinRequests ??= [];
    this.db.courseRequests ??= [];
    this.db.lessonEdits ??= [];
    this.db.videoLinks ??= {};
    // Demos saved before self-paced study: every class was a teacher's class.
    for (const c of this.db.classes) c.kind ??= 'teacher';
    if (!existing || !existing.audit) saveDb(this.db);
    const me = this.meOrNull();
    for (const n of this.db.notifications) if (!me || n.userId === me.id) this.seenNotifications.add(n.id);
  }

  /** Erase all demo data and rebuild the sample class. */
  async reset(): Promise<void> {
    clearDb();
    this.db = { ...(await buildSeed()), settings: { teacherSignup: 'open' }, audit: [], boards: [], lessonPrefs: [], liveQuestions: [], liveAnswers: [], presentations: [], classQuestions: [], joinRequests: [], courseRequests: [], lessonEdits: [], videoLinks: {} };
    saveDb(this.db);
    sessionSet(null);
    this.authListeners.forEach((l) => l(null));
  }

  private persist() {
    saveDb(this.db);
  }

  private meOrNull(): DemoUser | null {
    const id = sessionGet();
    return (id && this.db?.users.find((u) => u.id === id)) || null;
  }

  private me(): DemoUser {
    const u = this.meOrNull();
    if (!u) throw new Error('Please sign in.');
    return u;
  }

  private requireTeacherOf(classId: string): ClassRoom {
    const me = this.me();
    const c = this.db.classes.find((x) => x.id === classId);
    if (!c) throw new Error('Class not found.');
    if (c.teacherId !== me.id) throw new Error('Only the teacher of this class can do that.');
    return c;
  }

  private rosterIds(classId: string): string[] {
    return this.db.enrollments.filter((e) => e.classId === classId).map((e) => e.studentId);
  }

  private notify(userId: string | null, kind: NotificationKind, title: string, body: string, link: string | null, assignmentId: string | null = null) {
    // A self-paced class has no teacher to tell.
    if (!userId) return;
    const n: AppNotification = { id: uid('n'), userId, kind, title, body, link, createdAt: nowIso(), readAt: null, assignmentId };
    this.db.notifications.push(n);
    const me = this.meOrNull();
    if (me && me.id === userId) {
      this.seenNotifications.add(n.id);
      this.notifListeners.forEach((l) => l(n));
    }
  }

  private emitNewNotifications() {
    const me = this.meOrNull();
    if (!me) return;
    for (const n of this.db.notifications) {
      if (n.userId !== me.id || this.seenNotifications.has(n.id)) continue;
      this.seenNotifications.add(n.id);
      this.notifListeners.forEach((l) => l(n));
    }
  }

  // ------------------------------------------------------------------ auth

  async getCurrentUser() {
    await this.ready;
    const u = this.meOrNull();
    return u ? strip(u) : null;
  }

  onAuthChange(cb: (u: Profile | null) => void) {
    this.authListeners.add(cb);
    return () => this.authListeners.delete(cb);
  }

  async signIn(identifier: string, password: string) {
    await this.ready;
    await delay(250);
    const id = identifier.trim().toLowerCase();
    const u = this.db.users.find((x) => x.email.toLowerCase() === id || x.username?.toLowerCase() === id);
    if (!u || u.password !== password) throw new Error('That email/username and password do not match.');
    if (u.disabled) throw new Error('This account has been disabled. Please contact your school administrator.');
    u.lastSignInAt = nowIso();
    this.persist();
    sessionSet(u.id);
    this.seenNotifications = new Set(this.db.notifications.filter((n) => n.userId === u.id).map((n) => n.id));
    this.authListeners.forEach((l) => l(strip(u)));
    return strip(u);
  }

  async signUp(input: SignUpInput) {
    await this.ready;
    await delay(250);
    const email = input.email.trim().toLowerCase();
    if (this.db.users.some((u) => u.email.toLowerCase() === email)) throw new Error('An account with that email already exists.');
    if (input.password.length < 6) throw new Error('Use a password with at least 6 characters.');
    let cls: ClassRoom | undefined;
    if (input.role === 'student' && input.joinCode) {
      cls = this.db.classes.find((c) => c.joinCode === input.joinCode!.trim().toUpperCase() && !c.archived && c.kind !== 'self');
      if (!cls) throw new Error('That class code was not found. Check it with your teacher.');
    }
    const u: DemoUser = {
      id: uid('u'),
      role: input.role,
      fullName: input.fullName.trim(),
      email,
      username: null,
      avatarColor: COLORS[this.db.users.length % COLORS.length],
      createdAt: nowIso(),
      password: input.password,
      teacherStatus: input.role === 'teacher' ? (this.db.settings?.teacherSignup === 'open' ? 'approved' : 'pending') : null,
      lastSignInAt: nowIso(),
    };
    this.db.users.push(u);
    if (u.teacherStatus === 'pending') {
      for (const a of this.db.users.filter((x) => x.platformAdmin && !x.disabled)) {
        this.notify(a.id, 'admin', 'New teacher waiting for approval', `${u.fullName} (${u.email}) signed up as a teacher.`, '/admin/users?status=pending');
      }
    }
    if (cls && cls.settings.joinApproval) this.addJoinRequest(cls, u, null);
    else if (cls) {
      this.db.enrollments.push({ classId: cls.id, studentId: u.id, joinedAt: nowIso() });
      this.notify(cls.teacherId, 'announcement', `${u.fullName} joined ${cls.name}`, 'A new student joined using the class code.', `/t/c/${cls.id}/students`);
    }
    this.persist();
    sessionSet(u.id);
    this.authListeners.forEach((l) => l(strip(u)));
    return strip(u);
  }

  async signOut() {
    sessionSet(null);
    this.authListeners.forEach((l) => l(null));
  }

  async updateProfile(patch: Partial<Pick<Profile, 'fullName' | 'avatarColor'>>) {
    const u = this.me();
    Object.assign(u, patch);
    this.persist();
    const p = strip(u);
    this.authListeners.forEach((l) => l(p));
    return p;
  }

  async changePassword(newPassword: string) {
    if (newPassword.length < 6) throw new Error('Use at least 6 characters.');
    this.me().password = newPassword;
    this.persist();
  }

  // ------------------------------------------------------------------ classes

  async listMyClasses() {
    await this.ready;
    const me = this.me();
    if (me.role === 'teacher') return this.db.classes.filter((c) => c.teacherId === me.id);
    const ids = new Set(this.db.enrollments.filter((e) => e.studentId === me.id).map((e) => e.classId));
    return this.db.classes.filter((c) => ids.has(c.id) && !c.archived);
  }

  async getClass(id: string) {
    await this.ready;
    return this.db.classes.find((c) => c.id === id) ?? null;
  }

  async createClass(input: { name: string; section?: string | null; courseId: string; joinApproval?: boolean }) {
    const me = this.me();
    if (me.role !== 'teacher') throw new Error('Only teachers can create classes.');
    if ((me.teacherStatus ?? 'approved') !== 'approved' || me.disabled) throw new Error('Your teacher account is waiting for approval.');
    const c: ClassRoom = {
      id: uid('c'),
      teacherId: me.id,
      kind: 'teacher',
      name: input.name.trim(),
      section: input.section?.trim() || null,
      courseId: input.courseId,
      joinCode: makeJoinCode(),
      settings: { reminderHours: [24, 2], aiAutopilot: false, emailReminders: false, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, ...(input.joinApproval ? { joinApproval: true } : {}) },
      createdAt: nowIso(),
      archived: false,
    };
    this.db.classes.push(c);
    this.persist();
    return c;
  }

  async updateClass(id: string, patch: { name?: string; section?: string | null; settings?: Partial<ClassSettings>; archived?: boolean }) {
    const c = this.requireTeacherOf(id);
    if (patch.name !== undefined) c.name = patch.name;
    if (patch.section !== undefined) c.section = patch.section;
    if (patch.archived !== undefined) c.archived = patch.archived;
    if (patch.settings) c.settings = { ...c.settings, ...patch.settings };
    this.persist();
    return { ...c };
  }

  async regenerateJoinCode(id: string) {
    const c = this.requireTeacherOf(id);
    c.joinCode = makeJoinCode();
    this.persist();
    return { ...c };
  }

  async joinClass(code: string) {
    const me = this.me();
    const c = this.db.classes.find((x) => x.joinCode === code.trim().toUpperCase() && !x.archived && x.kind !== 'self');
    if (!c) throw new Error('That class code was not found.');
    const enrolled = this.db.enrollments.some((e) => e.classId === c.id && e.studentId === me.id);
    if (c.settings.joinApproval && !enrolled) throw new Error('This class asks for your teacher’s approval. Send a request from the Join a class page.');
    if (!enrolled) {
      this.db.enrollments.push({ classId: c.id, studentId: me.id, joinedAt: nowIso() });
      this.notify(c.teacherId, 'announcement', `${me.fullName} joined ${c.name}`, 'A new student joined using the class code.', `/t/c/${c.id}/students`);
      this.persist();
    }
    return c;
  }

  async requestToJoin(code: string, message?: string): Promise<JoinResult> {
    await this.ready;
    const me = this.me();
    if (me.role !== 'student') throw new Error('Only students can join a class with a code.');
    const c = this.db.classes.find((x) => x.joinCode === code.trim().toUpperCase() && !x.archived && x.kind !== 'self');
    if (!c) throw new Error('That class code was not found.');
    const teacherName = this.db.users.find((u) => u.id === c.teacherId)?.fullName ?? null;
    const result = (status: JoinResult['status']): JoinResult => ({ status, classId: c.id, className: c.name, teacherName });
    if (this.db.enrollments.some((e) => e.classId === c.id && e.studentId === me.id)) return result('joined');
    if (c.settings.joinApproval) {
      this.addJoinRequest(c, me, message ?? null);
      this.persist();
      return result('pending');
    }
    this.db.enrollments.push({ classId: c.id, studentId: me.id, joinedAt: nowIso() });
    this.notify(c.teacherId, 'announcement', `${me.fullName} joined ${c.name}`, 'A new student joined using the class code.', `/t/c/${c.id}/students`);
    this.persist();
    return result('joined');
  }

  /** Records (or renews) a pending request and tells the teacher. */
  private addJoinRequest(c: ClassRoom, student: { id: string; fullName: string }, message: string | null) {
    const msg = message?.trim().slice(0, 300) || null;
    const existing = this.db.joinRequests!.find((r) => r.classId === c.id && r.studentId === student.id);
    if (existing?.status === 'pending') return;
    if (existing) Object.assign(existing, { status: 'pending', message: msg, createdAt: nowIso(), decidedAt: null });
    else this.db.joinRequests!.push({ id: uid('jr'), classId: c.id, studentId: student.id, status: 'pending', message: msg, createdAt: nowIso(), decidedAt: null });
    this.notify(c.teacherId, 'announcement', `${student.fullName} asked to join ${c.name}`, 'Approve or decline the request on the Students page.', `/t/c/${c.id}/students`);
  }

  async listMyJoinRequests(): Promise<MyJoinRequest[]> {
    await this.ready;
    const me = this.me();
    return this.db
      .joinRequests!.filter((r) => r.studentId === me.id)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 20)
      .flatMap((r) => {
        const c = this.db.classes.find((x) => x.id === r.classId);
        if (!c) return [];
        return [{ id: r.id, classId: c.id, className: c.name, section: c.section, courseId: c.courseId, teacherName: this.db.users.find((u) => u.id === c.teacherId)?.fullName ?? null, status: r.status, createdAt: r.createdAt, decidedAt: r.decidedAt, linked: r.status === 'approved' && !!r.sameAs }];
      });
  }

  async listJoinRequests(classId: string): Promise<ClassJoinRequest[]> {
    await this.ready;
    this.requireTeacherOf(classId);
    return this.db
      .joinRequests!.filter((r) => r.classId === classId && r.status === 'pending')
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .flatMap((r) => {
        const u = this.db.users.find((x) => x.id === r.studentId);
        if (!u) return [];
        // A name-only student already in the class with the same name is most likely this student on another device.
        const match = u.nameOnly
          ? this.db.enrollments
              .filter((e) => e.classId === classId && e.studentId !== u.id)
              .map((e) => this.db.users.find((x) => x.id === e.studentId))
              .find((s) => s?.nameOnly && sameName(s.fullName, u.fullName))
          : undefined;
        return [{ id: r.id, studentId: u.id, fullName: u.fullName, email: u.nameOnly ? '' : u.email, message: r.message, createdAt: r.createdAt, nameOnly: !!u.nameOnly, match: match ? { studentId: match.id, fullName: match.fullName } : null }];
      });
  }

  async decideJoinRequests(classId: string, decisions: JoinDecision[]): Promise<void> {
    await this.ready;
    const c = this.requireTeacherOf(classId);
    for (const d of decisions) {
      const r = this.db.joinRequests!.find((x) => x.id === d.requestId && x.classId === classId);
      if (!r || r.status !== 'pending') continue;
      if (d.approve && d.sameAs) {
        const device = this.db.users.find((u) => u.id === r.studentId);
        const target = this.db.users.find((u) => u.id === d.sameAs);
        const inClass = this.db.enrollments.some((e) => e.classId === classId && e.studentId === d.sameAs);
        if (!device?.nameOnly || !target?.nameOnly || !inClass || target.id === device.id) throw new Error('Only a student who joined with the class link can be matched to one already in the class.');
        Object.assign(r, { status: 'approved', sameAs: target.id, decidedAt: nowIso() });
      } else if (d.approve) {
        Object.assign(r, { status: 'approved', decidedAt: nowIso() });
        if (!this.db.enrollments.some((e) => e.classId === classId && e.studentId === r.studentId)) this.db.enrollments.push({ classId, studentId: r.studentId, joinedAt: nowIso() });
        this.notify(r.studentId, 'announcement', `You joined ${c.name}`, 'Your teacher approved your request. The class is now in your course list.', '/s');
      } else {
        Object.assign(r, { status: 'declined', decidedAt: nowIso() });
        this.notify(r.studentId, 'announcement', `Your request to join ${c.name} was declined`, 'Check the class link with your teacher.', '/s/join');
      }
    }
    this.persist();
  }

  private joinableClass(code: string) {
    return this.db.classes.find((x) => x.joinCode === code.trim().toUpperCase() && !x.archived && x.kind !== 'self');
  }

  async classForJoinLink(code: string): Promise<JoinLinkClass | null> {
    await this.ready;
    const c = this.joinableClass(code);
    return c ? { className: c.name, teacherName: this.db.users.find((u) => u.id === c.teacherId)?.fullName ?? null } : null;
  }

  async joinWithName(code: string, firstName: string, lastName: string) {
    await this.ready;
    await delay(250);
    const parts = [cleanNamePart(firstName, 'first name'), cleanNamePart(lastName, 'last name')];
    for (const p of parts) if ('error' in p) throw new Error(p.error);
    const fullName = parts.map((p) => ('value' in p ? p.value : '')).join(' ');
    const c = this.joinableClass(code);
    if (!c) throw new Error('This class link is not valid. Ask your teacher for the link again.');
    if (this.db.joinRequests!.filter((r) => r.classId === c.id && r.status === 'pending').length >= 60) {
      throw new Error('Many students are waiting to join this class. Ask your teacher to approve them, then try again.');
    }
    const u: DemoUser = {
      id: uid('u'),
      role: 'student',
      fullName,
      email: `${uid('n')}@students.educore.local`,
      username: null,
      avatarColor: COLORS[this.db.users.length % COLORS.length],
      createdAt: nowIso(),
      password: uid('pw'),
      teacherStatus: null,
      lastSignInAt: nowIso(),
      nameOnly: true,
    };
    this.db.users.push(u);
    // Anyone with the link can use it, so a name always waits for the teacher.
    this.addJoinRequest(c, u, null);
    this.persist();
    sessionSet(u.id);
    this.seenNotifications = new Set();
    this.authListeners.forEach((l) => l(strip(u)));
    const teacherName = this.db.users.find((x) => x.id === c.teacherId)?.fullName ?? null;
    return { profile: strip(u), result: { status: 'pending' as const, classId: c.id, className: c.name, teacherName } };
  }

  async claimMatchedAccount() {
    await this.ready;
    const me = this.me();
    if (!me.nameOnly) throw new Error('Only a student who joined with a class link can do this.');
    const r = this.db
      .joinRequests!.filter((x) => x.studentId === me.id && x.status === 'approved' && x.sameAs)
      .sort((a, b) => (b.decidedAt ?? '').localeCompare(a.decidedAt ?? ''))[0];
    const target = r && this.db.users.find((u) => u.id === r.sameAs && u.nameOnly && !u.disabled);
    if (!r || !target || !this.db.enrollments.some((e) => e.classId === r.classId && e.studentId === target.id)) return null;
    // The device's own account was only ever a request to join; it goes now.
    this.db.users = this.db.users.filter((u) => u.id !== me.id);
    this.db.joinRequests = this.db.joinRequests!.filter((x) => x.studentId !== me.id);
    this.db.notifications = this.db.notifications.filter((n) => n.userId !== me.id);
    this.persist();
    sessionSet(target.id);
    this.seenNotifications = new Set(this.db.notifications.filter((n) => n.userId === target.id).map((n) => n.id));
    this.authListeners.forEach((l) => l(strip(target)));
    return strip(target);
  }

  async decideJoinRequest(requestId: string, approve: boolean): Promise<void> {
    await this.ready;
    const r = this.db.joinRequests!.find((x) => x.id === requestId);
    if (!r) throw new Error('That request was not found.');
    const c = this.requireTeacherOf(r.classId);
    if (r.status !== 'pending') return;
    r.status = approve ? 'approved' : 'declined';
    r.decidedAt = nowIso();
    if (approve) {
      if (!this.db.enrollments.some((e) => e.classId === c.id && e.studentId === r.studentId)) this.db.enrollments.push({ classId: c.id, studentId: r.studentId, joinedAt: nowIso() });
      this.notify(r.studentId, 'announcement', `You joined ${c.name}`, 'Your teacher approved your request. The class is now in your course list.', '/s');
    } else {
      this.notify(r.studentId, 'announcement', `Your request to join ${c.name} was declined`, 'Check the class code with your teacher. You can keep studying on your own in the meantime.', '/s/join');
    }
    this.persist();
  }

  async startSelfPaced(courseId: string): Promise<ClassRoom> {
    await this.ready;
    const me = this.me();
    if (me.role !== 'student') throw new Error('Self-paced study is for students.');
    const course = getCourse(courseId);
    if (!course) throw new Error('That course was not found.');
    const mine = new Set(this.db.enrollments.filter((e) => e.studentId === me.id).map((e) => e.classId));
    let c = this.db.classes.find((x) => x.kind === 'self' && mine.has(x.id) && x.courseId === courseId && !x.archived);
    if (!c) {
      c = {
        id: uid('c'),
        teacherId: null,
        kind: 'self',
        name: 'Self-paced',
        section: null,
        courseId,
        joinCode: makeJoinCode(),
        settings: { reminderHours: [], aiAutopilot: true, emailReminders: false, timezone: 'America/Edmonton' },
        createdAt: nowIso(),
        archived: false,
      };
      this.db.classes.push(c);
      this.db.enrollments.push({ classId: c.id, studentId: me.id, joinedAt: nowIso() });
    }
    const published = new Set(this.db.publications.filter((p) => p.classId === c!.id).map((p) => p.lessonId));
    for (const l of course.lessons) if (!published.has(l.id)) this.db.publications.push({ classId: c.id, lessonId: l.id, publishedAt: nowIso() });
    this.persist();
    return { ...c };
  }

  async listRoster(classId: string) {
    await this.ready;
    const ids = new Set(this.rosterIds(classId));
    return this.db.users.filter((u) => ids.has(u.id)).map(strip).sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  async getProfile(id: string) {
    await this.ready;
    const u = this.db.users.find((x) => x.id === id);
    return u ? strip(u) : null;
  }

  async removeStudent(classId: string, studentId: string) {
    this.requireTeacherOf(classId);
    this.db.enrollments = this.db.enrollments.filter((e) => !(e.classId === classId && e.studentId === studentId));
    this.persist();
  }

  async createStudentAccounts(classId: string, names: string[]): Promise<NewStudentCredential[]> {
    this.requireTeacherOf(classId);
    const out: NewStudentCredential[] = [];
    for (const raw of names) {
      const fullName = raw.trim();
      if (!fullName) continue;
      const base = fullName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z\s]/g, '')
        .trim()
        .split(/\s+/);
      let username = `${base[0]}.${(base[base.length - 1] ?? '').slice(0, 1)}`.replace(/\.$/, '');
      let n = 1;
      while (this.db.users.some((u) => u.username === username)) username = `${base[0]}.${(base[base.length - 1] ?? '').slice(0, 1)}${++n}`;
      const password = friendlyPassword();
      const u: DemoUser = { id: uid('u'), role: 'student', fullName, email: `${username}@students.educore.local`, username, avatarColor: COLORS[this.db.users.length % COLORS.length], createdAt: nowIso(), password };
      this.db.users.push(u);
      this.db.enrollments.push({ classId, studentId: u.id, joinedAt: nowIso() });
      out.push({ fullName, username, password });
    }
    this.persist();
    return out;
  }

  // ------------------------------------------------------------------ curriculum

  async listPublications(classId: string): Promise<Publication[]> {
    await this.ready;
    return this.db.publications.filter((p) => p.classId === classId);
  }

  async setPublished(classId: string, lessonId: string, published: boolean) {
    const c = this.requireTeacherOf(classId);
    const exists = this.db.publications.some((p) => p.classId === classId && p.lessonId === lessonId);
    if (published && !exists) {
      this.db.publications.push({ classId, lessonId, publishedAt: nowIso() });
      for (const sid of this.rosterIds(classId)) this.notify(sid, 'announcement', 'New lesson available', `A new lesson was published in ${c.name}.`, `/s/learn/${lessonId}`);
    }
    if (!published) this.db.publications = this.db.publications.filter((p) => !(p.classId === classId && p.lessonId === lessonId));
    this.persist();
  }

  async listResources(classId: string): Promise<Resource[]> {
    await this.ready;
    return this.db.resources.filter((r) => r.classId === classId);
  }

  async addResource(input: Omit<Resource, 'id' | 'createdAt'>) {
    this.requireTeacherOf(input.classId);
    const r: Resource = { ...input, id: uid('r'), createdAt: nowIso() };
    this.db.resources.push(r);
    this.persist();
    return r;
  }

  async deleteResource(id: string) {
    const r = this.db.resources.find((x) => x.id === id);
    if (!r) return;
    this.requireTeacherOf(r.classId);
    this.db.resources = this.db.resources.filter((x) => x.id !== id);
    this.persist();
  }

  // ------------------------------------------------------------------ presenting

  async getLessonPrefs(classId: string, lessonId: string): Promise<LessonPrefs> {
    await this.ready;
    this.requireTeacherOf(classId);
    return this.db.lessonPrefs!.find((p) => p.classId === classId && p.lessonId === lessonId) ?? { classId, lessonId, hidden: [] };
  }

  async setHiddenBlocks(classId: string, lessonId: string, hidden: string[]): Promise<LessonPrefs> {
    this.requireTeacherOf(classId);
    const prefs: LessonPrefs = { classId, lessonId, hidden: [...new Set(hidden)].slice(0, 500) };
    this.db.lessonPrefs = [...this.db.lessonPrefs!.filter((p) => !(p.classId === classId && p.lessonId === lessonId)), prefs];
    this.persist();
    return prefs;
  }

  async listBoards(classId: string, lessonId: string): Promise<Board[]> {
    await this.ready;
    const me = this.me();
    const teacher = this.db.classes.some((c) => c.id === classId && c.teacherId === me.id);
    const enrolled = this.db.enrollments.some((e) => e.classId === classId && e.studentId === me.id);
    return this.db.boards!
      .filter((b) => b.classId === classId && b.lessonId === lessonId && (teacher || (enrolled && b.shared)))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  async saveBoard(input: BoardInput): Promise<Board> {
    this.requireTeacherOf(input.classId);
    const title = input.title.trim().slice(0, 120) || 'Whiteboard';
    // The demo keeps everything in this browser's storage, which holds only a few megabytes.
    if (JSON.stringify(input.pages).length > 800_000) throw new Error('This board is too large to save in the demo. Clear some ink or split it into two boards.');
    const now = nowIso();
    const existing = input.id ? this.db.boards!.find((b) => b.id === input.id && b.classId === input.classId) : undefined;
    if (existing) {
      Object.assign(existing, { title, pages: input.pages, shared: input.shared ?? existing.shared, updatedAt: now });
      this.persist();
      return { ...existing };
    }
    if (this.db.boards!.length >= 30) throw new Error('The demo keeps up to 30 saved boards. Delete one to save another.');
    const b: Board = { id: uid('wb'), classId: input.classId, lessonId: input.lessonId, title, pages: input.pages, shared: input.shared ?? false, createdAt: now, updatedAt: now };
    this.db.boards!.push(b);
    this.persist();
    return { ...b };
  }

  async setBoardShared(id: string, shared: boolean) {
    const b = this.db.boards!.find((x) => x.id === id);
    if (!b) throw new Error('Board not found.');
    this.requireTeacherOf(b.classId);
    b.shared = shared;
    this.persist();
  }

  async deleteBoard(id: string) {
    const b = this.db.boards!.find((x) => x.id === id);
    if (!b) return;
    this.requireTeacherOf(b.classId);
    this.db.boards = this.db.boards!.filter((x) => x.id !== id);
    this.persist();
  }

  // ------------------------------------------------------------------ live class questions

  private liveChanged() {
    this.persist();
    this.liveListeners.forEach((l) => l());
  }

  async openLiveQuestion(input: { classId: string; lessonId: string | null; skillId: string; difficulty: 1 | 2 | 3; seed: number }): Promise<LiveQuestion> {
    this.requireTeacherOf(input.classId);
    for (const q of this.db.liveQuestions!) if (q.classId === input.classId && q.status === 'open') q.status = 'closed';
    const q: LiveQuestion = { id: uid('lq'), classId: input.classId, lessonId: input.lessonId, skillId: input.skillId, difficulty: input.difficulty, seed: input.seed, status: 'open', createdAt: nowIso() };
    this.db.liveQuestions!.push(q);
    // Keep the demo's storage small: only recent questions and their answers.
    if (this.db.liveQuestions!.length > 40) {
      const keep = new Set(this.db.liveQuestions!.slice(-40).map((x) => x.id));
      this.db.liveQuestions = this.db.liveQuestions!.filter((x) => keep.has(x.id));
      this.db.liveAnswers = this.db.liveAnswers!.filter((a) => keep.has(a.questionId));
    }
    this.liveChanged();
    return { ...q };
  }

  async closeLiveQuestion(id: string) {
    const q = this.db.liveQuestions!.find((x) => x.id === id);
    if (!q) return;
    this.requireTeacherOf(q.classId);
    q.status = 'closed';
    this.liveChanged();
  }

  async currentLiveQuestion(classId: string): Promise<LiveQuestion | null> {
    await this.ready;
    const me = this.me();
    const allowed = this.db.classes.some((c) => c.id === classId && c.teacherId === me.id) || this.db.enrollments.some((e) => e.classId === classId && e.studentId === me.id);
    if (!allowed) return null;
    const since = Date.now() - 3 * 3600_000;
    const q = this.db.liveQuestions!.filter((x) => x.classId === classId && Date.parse(x.createdAt) >= since).pop();
    return q ? { ...q } : null;
  }

  async listLiveAnswers(questionId: string): Promise<LiveAnswer[]> {
    await this.ready;
    const me = this.me();
    const q = this.db.liveQuestions!.find((x) => x.id === questionId);
    if (!q) return [];
    const teacher = this.db.classes.some((c) => c.id === q.classId && c.teacherId === me.id);
    return this.db.liveAnswers!.filter((a) => a.questionId === questionId && (teacher || a.studentId === me.id)).map((a) => ({ ...a }));
  }

  async submitLiveAnswer(questionId: string, responses: string[]) {
    const me = this.me();
    const q = this.db.liveQuestions!.find((x) => x.id === questionId);
    if (!q || !this.db.enrollments.some((e) => e.classId === q.classId && e.studentId === me.id)) throw new Error('This question is not for your class.');
    if (q.status !== 'open') throw new Error('Your teacher has closed this question.');
    const answer: LiveAnswer = { questionId, studentId: me.id, responses: responses.slice(0, 20).map((r) => String(r ?? '').slice(0, 400)), answeredAt: nowIso() };
    this.db.liveAnswers = [...this.db.liveAnswers!.filter((a) => !(a.questionId === questionId && a.studentId === me.id)), answer];
    this.liveChanged();
  }

  subscribeLive(_classId: string, cb: () => void) {
    this.liveListeners.add(cb);
    return () => {
      this.liveListeners.delete(cb);
    };
  }

  /**
   * Demo only: answers from the rest of the sample class, right or wrong in line with each
   * student's mastery of the skill, so the results on the slide look like a real class.
   */
  async simulateLiveAnswers(questionId: string): Promise<number> {
    const q = this.db.liveQuestions!.find((x) => x.id === questionId);
    if (!q || q.status !== 'open') return 0;
    this.requireTeacherOf(q.classId);
    await loadSkills([q.skillId]);
    const skill = getSkill(q.skillId);
    if (!skill) return 0;
    const item = skill.generate(q.seed, q.difficulty);
    const answered = new Set(this.db.liveAnswers!.filter((a) => a.questionId === questionId).map((a) => a.studentId));
    let added = 0;
    for (const sid of this.rosterIds(q.classId)) {
      if (answered.has(sid)) continue;
      const rng = new Rng(`${questionId}:${sid}`);
      if (rng.next() < 0.12) continue; // a few students never answer
      const p = this.db.mastery.find((m) => m.studentId === sid && m.skillId === q.skillId)?.pKnown ?? 0.55;
      const responses = simulatedResponses(item, rng.next() < 0.25 + 0.65 * p, rng);
      // Students answer after the teacher asks, a few seconds apart.
      this.db.liveAnswers!.push({ questionId, studentId: sid, responses, answeredAt: new Date(Date.now() - rng.int(0, 20_000)).toISOString() });
      added++;
    }
    this.liveChanged();
    return added;
  }

  // ------------------------------------------------------------------ students' questions during a presentation

  private questionsChanged() {
    this.persist();
    this.questionListeners.forEach((l) => l());
  }

  /** The class's presentation, if it is live: stopped ones and ones without a heartbeat for five minutes are not. */
  private livePresentation(classId: string) {
    const p = this.db.presentations!.find((x) => x.classId === classId);
    return p && !p.endedAt && Date.parse(p.seenAt) > Date.now() - 5 * 60_000 ? p : undefined;
  }

  private toClassQuestion(q: Omit<ClassQuestion, 'studentName'> & { decidedAt: string | null }): ClassQuestion {
    const { decidedAt: _decided, ...rest } = q;
    return { ...rest, studentName: this.db.users.find((u) => u.id === q.studentId)?.fullName ?? null };
  }

  async startPresenting(classId: string, lessonId: string): Promise<Presentation> {
    await this.ready;
    this.requireTeacherOf(classId);
    if (!lessonId || lessonId.length > 40) throw new Error('That lesson was not found.');
    const now = nowIso();
    const p = this.db.presentations!.find((x) => x.classId === classId);
    // The same lesson keeps its start while it is live and when the teacher comes back to it within
    // ten minutes, so its questions stay together.
    const keep = p && p.lessonId === lessonId && Date.parse(p.endedAt ?? p.seenAt) > Date.now() - 10 * 60_000;
    const next = { classId, lessonId, startedAt: keep ? p.startedAt : now, seenAt: now, endedAt: null };
    this.db.presentations = [...this.db.presentations!.filter((x) => x.classId !== classId), next];
    // A heartbeat that changes nothing for the class does not need to wake every tab.
    if (keep && !p.endedAt) this.persist();
    else this.questionsChanged();
    return { classId, lessonId, startedAt: next.startedAt };
  }

  async stopPresenting(classId: string) {
    this.requireTeacherOf(classId);
    const p = this.db.presentations!.find((x) => x.classId === classId && !x.endedAt);
    if (!p) return;
    p.endedAt = nowIso();
    this.questionsChanged();
  }

  async currentPresentation(classId: string): Promise<Presentation | null> {
    await this.ready;
    const me = this.me();
    const allowed = this.db.classes.some((c) => c.id === classId && c.teacherId === me.id) || this.db.enrollments.some((e) => e.classId === classId && e.studentId === me.id);
    const p = allowed ? this.livePresentation(classId) : undefined;
    return p ? { classId: p.classId, lessonId: p.lessonId, startedAt: p.startedAt } : null;
  }

  async askQuestion(input: { classId: string; body: string; anonymous: boolean }): Promise<ClassQuestion> {
    await this.ready;
    const me = this.me();
    if (!this.db.enrollments.some((e) => e.classId === input.classId && e.studentId === me.id)) throw new Error('You can only ask questions in your own class.');
    const body = (input.body ?? '').trim();
    if (!body) throw new Error('Type your question first.');
    if (body.length > 300) throw new Error('Keep your question under 300 characters.');
    const p = this.livePresentation(input.classId);
    if (!p) throw new Error('Your teacher is not presenting right now.');
    const recent = this.db.classQuestions!.filter((q) => q.studentId === me.id && q.classId === input.classId && Date.parse(q.createdAt) > Date.now() - 10 * 60_000);
    if (recent.length >= 5) throw new Error('You have asked five questions in the last ten minutes. Wait a little before asking another.');
    const q = { id: uid('cq'), classId: input.classId, lessonId: p.lessonId, studentId: me.id, body, anonymous: input.anonymous, status: 'new' as const, presentedAt: p.startedAt, createdAt: nowIso(), decidedAt: null };
    this.db.classQuestions!.push(q);
    // Keep the demo's storage small.
    if (this.db.classQuestions!.length > 200) this.db.classQuestions = this.db.classQuestions!.slice(-200);
    this.questionsChanged();
    return this.toClassQuestion(q);
  }

  async listClassQuestions(classId: string, filter: { lessonId?: string; presentedAt?: string } = {}): Promise<ClassQuestion[]> {
    await this.ready;
    const me = this.me();
    const teacher = this.db.classes.some((c) => c.id === classId && c.teacherId === me.id);
    return this.db
      .classQuestions!.filter((q) => q.classId === classId && (teacher || q.studentId === me.id))
      .filter((q) => (!filter.lessonId || q.lessonId === filter.lessonId) && (!filter.presentedAt || q.presentedAt === filter.presentedAt))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map((q) => this.toClassQuestion(q));
  }

  async setQuestionStatus(id: string, status: 'answered' | 'skipped') {
    const q = this.db.classQuestions!.find((x) => x.id === id);
    if (!q) return;
    this.requireTeacherOf(q.classId);
    q.status = status;
    q.decidedAt = nowIso();
    this.questionsChanged();
  }

  async deleteQuestion(id: string) {
    const q = this.db.classQuestions!.find((x) => x.id === id);
    if (!q) return;
    this.requireTeacherOf(q.classId);
    this.db.classQuestions = this.db.classQuestions!.filter((x) => x.id !== id);
    this.questionsChanged();
  }

  subscribeQuestions(_classId: string, cb: () => void) {
    this.questionListeners.add(cb);
    return () => {
      this.questionListeners.delete(cb);
    };
  }

  /** Demo only: a question from a student in the sample class, so the teacher can try the pop-up. */
  async simulateClassQuestion(classId: string): Promise<ClassQuestion | null> {
    this.requireTeacherOf(classId);
    const p = this.livePresentation(classId);
    const students = this.rosterIds(classId);
    if (!p || !students.length) return null;
    const asked = this.db.classQuestions!.filter((q) => q.classId === classId && q.presentedAt === p.startedAt);
    const rng = new Rng(`${p.startedAt}:${asked.length}`);
    const q = {
      id: uid('cq'),
      classId,
      lessonId: p.lessonId,
      studentId: students[rng.int(0, students.length - 1)],
      body: SAMPLE_QUESTIONS[asked.length % SAMPLE_QUESTIONS.length],
      anonymous: rng.next() < 0.6,
      status: 'new' as const,
      presentedAt: p.startedAt,
      createdAt: nowIso(),
      decidedAt: null,
    };
    this.db.classQuestions!.push(q);
    this.questionsChanged();
    return this.toClassQuestion(q);
  }

  // ------------------------------------------------------------------ assignments

  private visibleTo(a: Assignment, me: DemoUser): boolean {
    if (me.role === 'teacher') return this.db.classes.some((c) => c.id === a.classId && c.teacherId === me.id);
    if (a.status !== 'published') return false;
    if (a.openAt && new Date(a.openAt) > new Date()) return false;
    return a.assignedTo === 'all' || a.assignedTo.includes(me.id);
  }

  async listAssignments(classId: string) {
    await this.ready;
    const me = this.me();
    return this.db.assignments.filter((a) => a.classId === classId && this.visibleTo(a, me)).sort((a, b) => (b.dueAt ?? b.createdAt).localeCompare(a.dueAt ?? a.createdAt));
  }

  async getAssignment(id: string) {
    await this.ready;
    const me = this.me();
    const a = this.db.assignments.find((x) => x.id === id);
    return a && this.visibleTo(a, me) ? a : null;
  }

  async saveAssignment(input: Partial<Assignment> & { classId: string }) {
    this.requireTeacherOf(input.classId);
    if (input.id) {
      const a = this.db.assignments.find((x) => x.id === input.id);
      if (!a) throw new Error('Assignment not found.');
      Object.assign(a, input);
      this.persist();
      return { ...a };
    }
    const type = input.type ?? 'homework';
    const a: Assignment = {
      id: uid('a'),
      classId: input.classId,
      title: input.title?.trim() || 'Untitled assignment',
      type,
      instructions: input.instructions ?? '',
      content: input.content ?? { sections: [], custom: [] },
      settings: input.settings ?? { ...DEFAULT_SETTINGS[type] },
      openAt: input.openAt ?? null,
      dueAt: input.dueAt ?? null,
      allowLate: input.allowLate ?? true,
      reminderHours: input.reminderHours ?? [24, 2],
      assignedTo: input.assignedTo ?? 'all',
      status: 'draft',
      createdAt: nowIso(),
      publishedAt: null,
      createdBy: input.createdBy ?? 'teacher',
      aiRationale: input.aiRationale ?? null,
    };
    this.db.assignments.push(a);
    this.persist();
    return { ...a };
  }

  async publishAssignment(id: string) {
    const a = this.db.assignments.find((x) => x.id === id);
    if (!a) throw new Error('Assignment not found.');
    const c = this.requireTeacherOf(a.classId);
    if (isQuestionType(a.type) && a.content.sections.length === 0 && a.content.custom.length === 0) throw new Error('Add at least one question before publishing.');
    const wasPublished = a.status === 'published';
    a.status = 'published';
    a.publishedAt = a.publishedAt ?? nowIso();
    if (!wasPublished) {
      const targets = a.assignedTo === 'all' ? this.rosterIds(a.classId) : a.assignedTo;
      const due = a.dueAt ? ` Due ${new Date(a.dueAt).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}.` : '';
      for (const sid of targets) this.notify(sid, 'assignment', `New ${TYPE_LABEL[a.type].toLowerCase()}: ${a.title}`, `${c.name}.${due}`, `/s/work/${a.id}`, a.id);
    }
    this.persist();
    return { ...a };
  }

  async deleteAssignment(id: string) {
    const a = this.db.assignments.find((x) => x.id === id);
    if (!a) return;
    this.requireTeacherOf(a.classId);
    this.db.assignments = this.db.assignments.filter((x) => x.id !== id);
    this.db.submissions = this.db.submissions.filter((s) => s.assignmentId !== id);
    this.persist();
  }

  private doneSet(): Set<string> {
    return new Set(this.db.submissions.filter((s) => s.assignmentId && s.status !== 'in_progress').map((s) => `${s.assignmentId}:${s.studentId}`));
  }

  async remindNow(assignmentId: string) {
    const a = this.db.assignments.find((x) => x.id === assignmentId);
    if (!a) throw new Error('Assignment not found.');
    this.requireTeacherOf(a.classId);
    const done = this.doneSet();
    const targets = (a.assignedTo === 'all' ? this.rosterIds(a.classId) : a.assignedTo).filter((sid) => !done.has(`${a.id}:${sid}`));
    for (const sid of targets) this.notify(sid, 'reminder', `Reminder from your teacher: ${a.title}`, a.dueAt ? `Due ${new Date(a.dueAt).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}. Please complete it soon.` : 'Please complete it soon.', `/s/work/${a.id}`, a.id);
    this.persist();
    return targets.length;
  }

  // ------------------------------------------------------------------ submissions

  async listSubmissions(filter: { classId?: string; assignmentId?: string; studentId?: string }) {
    await this.ready;
    const me = this.me();
    return this.db.submissions.filter((s) => {
      if (me.role === 'student' && s.studentId !== me.id) return false;
      if (me.role === 'teacher' && !this.db.classes.some((c) => c.id === s.classId && c.teacherId === me.id)) return false;
      if (filter.classId && s.classId !== filter.classId) return false;
      if (filter.assignmentId && s.assignmentId !== filter.assignmentId) return false;
      if (filter.studentId && s.studentId !== filter.studentId) return false;
      return true;
    });
  }

  async getSubmission(id: string) {
    await this.ready;
    const me = this.me();
    const s = this.db.submissions.find((x) => x.id === id);
    if (!s) return null;
    if (me.role === 'student' && s.studentId !== me.id) return null;
    return s;
  }

  async startSubmission(assignmentId: string) {
    const me = this.me();
    const a = this.db.assignments.find((x) => x.id === assignmentId);
    if (!a || !this.visibleTo(a, me)) throw new Error('Assignment not found.');
    if (me.role !== 'student') throw new Error('Only students can start assignments.');
    const mine = this.db.submissions.filter((s) => s.assignmentId === a.id && s.studentId === me.id);
    const open = mine.find((s) => s.status === 'in_progress');
    if (open) return open;
    const done = mine.filter((s) => s.status !== 'in_progress').length;
    if (a.settings.attempts && done >= a.settings.attempts) throw new Error('You have used all of your attempts.');
    if (a.dueAt && new Date(a.dueAt) < new Date() && !a.allowLate) throw new Error('This assignment is closed.');
    const seed = freshSeed();
    const s: Submission = {
      id: uid('s'),
      assignmentId: a.id,
      classId: a.classId,
      studentId: me.id,
      attempt: done + 1,
      status: 'in_progress',
      seed,
      items: isQuestionType(a.type) ? buildItemRefs(a.content, seed) : [],
      responses: {},
      practiceSkillIds: null,
      startedAt: nowIso(),
      submittedAt: null,
      score: null,
      maxScore: null,
      percent: null,
      pendingManual: 0,
      late: false,
      feedback: null,
      integrity: { blurCount: 0 },
    };
    this.db.submissions.push(s);
    this.persist();
    return s;
  }

  async startPractice(classId: string, skillIds: string[]) {
    const me = this.me();
    const s: Submission = {
      id: uid('s'),
      assignmentId: null,
      classId,
      studentId: me.id,
      attempt: 1,
      status: 'in_progress',
      seed: freshSeed(),
      items: [],
      responses: {},
      practiceSkillIds: skillIds,
      startedAt: nowIso(),
      submittedAt: null,
      score: null,
      maxScore: null,
      percent: null,
      pendingManual: 0,
      late: false,
      feedback: null,
      integrity: { blurCount: 0 },
    };
    this.db.submissions.push(s);
    this.persist();
    return s;
  }

  async saveProgress(submissionId: string, patch: { responses: Record<number, StoredResponse>; items?: ItemRef[]; integrity?: Integrity }) {
    const me = this.me();
    const s = this.db.submissions.find((x) => x.id === submissionId && x.studentId === me.id);
    if (!s || s.status !== 'in_progress') return;
    const a = s.assignmentId ? this.db.assignments.find((x) => x.id === s.assignmentId) : undefined;
    const wasLocked = !!a && isLocked(a.settings, s.integrity);
    // As in the database: a locked attempt's answers cannot change, and exits only ever grow.
    if (wasLocked && JSON.stringify(patch.responses) !== JSON.stringify(s.responses)) throw new Error('This attempt is locked. Your teacher can unlock it.');
    s.responses = patch.responses;
    if (patch.items) s.items = patch.items;
    if (patch.integrity) s.integrity = mergeIntegrity(s.integrity, patch.integrity);
    if (a && !wasLocked && isLocked(a.settings, s.integrity)) {
      const c = this.db.classes.find((x) => x.id === a.classId);
      this.notify(c?.teacherId ?? null, 'submission', `${me.fullName}'s attempt at ${a.title} is locked`, `They left exam mode ${exitCount(s.integrity)} times. You can unlock the attempt on the assignment page.`, `/t/c/${a.classId}/assignments/${a.id}`, a.id);
    }
    this.persist();
  }

  async unlockAttempt(submissionId: string) {
    await this.ready;
    const s = this.db.submissions.find((x) => x.id === submissionId);
    if (!s) throw new Error('That attempt was not found.');
    this.requireTeacherOf(s.classId);
    if (s.status !== 'in_progress') throw new Error('Only an attempt in progress can be unlocked.');
    s.integrity = { ...s.integrity, extraExits: exitCount(s.integrity) };
    const a = this.db.assignments.find((x) => x.id === s.assignmentId);
    this.notify(s.studentId, 'announcement', `Your teacher unlocked ${a?.title ?? 'your attempt'}`, 'You can carry on where you left off. Stay in full screen until you submit.', `/s/work/${s.assignmentId}/take`, s.assignmentId);
    this.persist();
  }

  async submit(submissionId: string, patch: { responses: Record<number, StoredResponse>; items: ItemRef[]; integrity?: Integrity }) {
    const me = this.me();
    const s = this.db.submissions.find((x) => x.id === submissionId && x.studentId === me.id);
    if (!s) throw new Error('Submission not found.');
    if (s.status !== 'in_progress') return s;
    const a = s.assignmentId ? this.db.assignments.find((x) => x.id === s.assignmentId) ?? null : null;
    const now = nowIso();
    s.integrity = mergeIntegrity(s.integrity, patch.integrity ?? s.integrity);
    if (a && !isQuestionType(a.type)) {
      Object.assign(s, { status: 'graded', submittedAt: now, score: 1, maxScore: 1, percent: 100, late: !!a.dueAt && new Date(now) > new Date(a.dueAt), responses: patch.responses });
      this.afterSubmit(s, a);
      this.persist();
      return { ...s };
    }
    const content = a?.content ?? { sections: [], custom: [] };
    const tried = Object.values(patch.responses).flatMap((r) => r.history?.map((h) => h.ref) ?? []);
    await loadSkills(refSkillIds(content, [...patch.items, ...tried]));
    if (s.status !== 'in_progress') return s;
    const err = validateRefs(patch.items, content, s.practiceSkillIds ?? undefined);
    if (err) throw new Error(err);
    const states = new Map<string, SkillState>(this.db.mastery.filter((m) => m.studentId === me.id).map((m) => [m.skillId, m]));
    const out = processSubmission({ assignmentId: a?.id ?? null, content, dueAt: a?.dueAt ?? null, submissionId: s.id, items: patch.items, responses: patch.responses, mastery: states, now });
    Object.assign(s, {
      items: patch.items,
      responses: patch.responses,
      status: out.status,
      submittedAt: now,
      score: out.summary.score,
      maxScore: out.summary.maxScore,
      percent: out.summary.percent,
      pendingManual: out.summary.pendingManual,
      late: out.late,
      masteryChanges: out.changes,
    });
    // Persist mastery and events.
    this.db.mastery = this.db.mastery.filter((m) => m.studentId !== me.id || !out.mastery.has(m.skillId));
    for (const st of out.mastery.values()) this.db.mastery.push({ ...st, studentId: me.id });
    for (const e of out.events) {
      this.db.events.push({ id: uid('e'), studentId: me.id, classId: s.classId, skillId: e.skillId, correct: e.correct, assisted: e.assisted, submissionId: s.id, assignmentId: a?.id ?? null, at: e.at, ...(e.correct ? {} : { prompt: e.prompt.slice(0, 180), answer: e.answer, expected: e.expected.slice(0, 80) }) });
    }
    if (a) this.afterSubmit(s, a);
    this.persist();
    // After practice too: self-paced students have no teacher, so the AI tutor assigns their practice.
    await this.autopilot(s.classId, me.id);
    return { ...s };
  }

  /** Tell the teacher about work that needs them: written answers to grade, or late work. */
  private afterSubmit(s: Submission, a: Assignment) {
    if (!s.pendingManual && !s.late && !s.integrity.autoSubmitted) return;
    const c = this.db.classes.find((x) => x.id === a.classId)!;
    const student = this.db.users.find((u) => u.id === s.studentId)!;
    this.notify(c.teacherId, 'submission', `${student.fullName} submitted ${a.title}${s.integrity.autoSubmitted ? ' (automatically, after leaving exam mode)' : s.late ? ' (late)' : ''}`, s.percent !== null && isQuestionType(a.type) ? `Score: ${Math.round(s.percent)}%${s.pendingManual ? ` · ${s.pendingManual} to grade` : ''}` : 'Completed.', s.pendingManual ? `/t/c/${c.id}/submissions/${s.id}` : `/t/c/${c.id}/assignments/${a.id}`, a.id);
  }

  /** If autopilot is on, let the AI assistant assign targeted practice for a weak skill. */
  private async autopilot(classId: string, studentId: string) {
    const c = this.db.classes.find((x) => x.id === classId);
    if (!c?.settings.aiAutopilot) return;
    const recentAi = this.db.assignments.filter((a) => a.classId === classId && a.createdBy === 'ai' && Array.isArray(a.assignedTo) && a.assignedTo.includes(studentId) && Date.now() - new Date(a.createdAt).getTime() < 3 * 86_400_000);
    if (recentAi.length) return;
    const res = await generateInsight(buildAnalystInput(this.db, classId), { scope: 'student', studentId }, this.aiConfig());
    const action = res.data.actions.find((x) => x.type === 'assign_practice');
    if (!action) return;
    const draft = draftFromAction(action);
    if (!draft) return;
    const a: Assignment = { id: uid('a'), classId, ...draft, openAt: null, allowLate: true, status: 'published', createdAt: nowIso(), publishedAt: nowIso(), createdBy: 'ai' };
    this.db.assignments.push(a);
    const student = this.db.users.find((u) => u.id === studentId)!;
    this.notify(studentId, 'assignment', `New practice: ${a.title}`, `${c.kind === 'self' ? 'Your AI tutor' : 'Your teacher’s assistant'} picked this practice set to help you master a tricky skill.`, `/s/work/${a.id}`, a.id);
    this.notify(c.teacherId, 'insight', `Autopilot assigned practice to ${student.fullName}`, `${a.title}. ${action.rationale}`, `/t/c/${classId}/assignments/${a.id}`, a.id);
    this.db.insights.push({ id: uid('i'), classId, studentId, createdAt: nowIso(), source: res.source, model: res.model, data: { ...res.data, actions: res.data.actions.map((x) => (x.id === action.id ? { ...x, status: 'done' } : x)) }, error: res.error ?? null });
    this.persist();
  }

  async gradeManual(submissionId: string, itemIndex: number, score01: number, comment?: string) {
    const s = this.db.submissions.find((x) => x.id === submissionId);
    if (!s) throw new Error('Submission not found.');
    this.requireTeacherOf(s.classId);
    const a = s.assignmentId ? this.db.assignments.find((x) => x.id === s.assignmentId) : null;
    s.responses[itemIndex] = { ...(s.responses[itemIndex] ?? { answers: [], hintsUsed: 0 }), manualScore: Math.max(0, Math.min(1, score01)), comment: comment ?? null };
    // Recompute totals with the engine (manual scores included).
    const { gradeSubmission } = await import('@engine/assemble.ts');
    await loadSkills(refSkillIds(a?.content, s.items));
    const g = gradeSubmission(s.items, s.responses, a?.content ?? { sections: [], custom: [] }, a?.id ?? 'practice');
    s.score = g.score;
    s.maxScore = g.maxScore;
    s.percent = g.percent;
    s.pendingManual = g.pendingManual;
    if (s.status === 'submitted' && g.pendingManual === 0) s.status = 'graded';
    this.persist();
    return { ...s };
  }

  async returnSubmission(submissionId: string, feedback: string) {
    const s = this.db.submissions.find((x) => x.id === submissionId);
    if (!s) throw new Error('Submission not found.');
    this.requireTeacherOf(s.classId);
    s.feedback = feedback || null;
    s.status = 'returned';
    const a = s.assignmentId ? this.db.assignments.find((x) => x.id === s.assignmentId) : null;
    this.notify(s.studentId, 'graded', `${a?.title ?? 'Your work'} was returned`, feedback ? `Feedback: ${feedback.slice(0, 120)}` : 'Your teacher returned your work.', a ? `/s/work/${a.id}` : '/s/work', a?.id ?? null);
    this.persist();
    return { ...s };
  }

  // ------------------------------------------------------------------ mastery

  async listMastery(filter: { classId?: string; studentId?: string }): Promise<SkillMastery[]> {
    await this.ready;
    const me = this.me();
    let ids: Set<string>;
    if (me.role === 'student') ids = new Set([me.id]);
    else if (filter.classId) ids = new Set(this.rosterIds(filter.classId));
    else ids = new Set(this.db.classes.filter((c) => c.teacherId === me.id).flatMap((c) => this.rosterIds(c.id)));
    if (filter.studentId) ids = new Set([...ids].filter((x) => x === filter.studentId));
    return this.db.mastery.filter((m) => ids.has(m.studentId));
  }

  async listEvents(filter: { classId: string; studentId?: string; sinceDays?: number }): Promise<SkillEvent[]> {
    await this.ready;
    const me = this.me();
    const since = filter.sinceDays ? Date.now() - filter.sinceDays * 86_400_000 : 0;
    return this.db.events.filter(
      (e) =>
        e.classId === filter.classId &&
        (me.role === 'teacher' || e.studentId === me.id) &&
        (!filter.studentId || e.studentId === filter.studentId) &&
        (!since || new Date(e.at).getTime() >= since),
    );
  }

  // ------------------------------------------------------------------ notifications

  async listNotifications() {
    await this.ready;
    const me = this.me();
    return this.db.notifications.filter((n) => n.userId === me.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async markNotificationsRead(ids: string[] | 'all') {
    const me = this.me();
    const t = nowIso();
    for (const n of this.db.notifications) if (n.userId === me.id && !n.readAt && (ids === 'all' || ids.includes(n.id))) n.readAt = t;
    this.persist();
  }

  subscribeNotifications(cb: (n: AppNotification) => void) {
    this.notifListeners.add(cb);
    return () => this.notifListeners.delete(cb);
  }

  async listAnnouncements(classId: string): Promise<Announcement[]> {
    await this.ready;
    return this.db.announcements.filter((a) => a.classId === classId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async postAnnouncement(classId: string, title: string, body: string) {
    const c = this.requireTeacherOf(classId);
    const a: Announcement = { id: uid('an'), classId, authorId: this.me().id, title, body, createdAt: nowIso() };
    this.db.announcements.push(a);
    for (const sid of this.rosterIds(classId)) this.notify(sid, 'announcement', title, `${c.name}: ${body.slice(0, 140)}`, '/s');
    this.persist();
    return a;
  }

  // ------------------------------------------------------------------ AI

  /** Demo only: let the teacher try live MiniMax analysis with their own key (stored in this browser). */
  setAiKey(key: string | null, model?: string | null) {
    this.db.aiKey = key?.trim() || null;
    this.db.aiModel = model?.trim() || null;
    this.persist();
  }

  getAiKey() {
    return { key: this.db.aiKey, model: this.db.aiModel };
  }

  private aiConfig() {
    return this.db.aiKey ? { apiKey: this.db.aiKey, model: this.db.aiModel || DEFAULT_MODEL } : null;
  }

  async aiStatus(): Promise<AiConfigStatus> {
    await this.ready;
    return this.db.aiKey
      ? { live: true, model: this.db.aiModel || DEFAULT_MODEL, note: 'Demo mode: calling MiniMax directly from this browser with your key.' }
      : { live: false, model: null, note: 'Demo mode uses Gradileo’s offline analyst. Add a MiniMax key in Settings, or connect Supabase for production AI.' };
  }

  // ---------------------------------------------------------------- class forum

  private forum(): DemoForumPost[] {
    this.db.forumPosts ??= [];
    return this.db.forumPosts;
  }

  /** The caller may read and post in the class's forum: its teacher or a student in it. */
  private forumAccess(classId: string): { me: DemoUser; cls: ClassRoom; isTeacher: boolean } {
    const me = this.me();
    const cls = this.db.classes.find((c) => c.id === classId);
    const isTeacher = !!cls && cls.teacherId === me.id;
    if (!cls || !(isTeacher || this.db.enrollments.some((e) => e.classId === classId && e.studentId === me.id))) throw new Error('You can only use your own class’s forum.');
    if (!cls.teacherId) throw new Error('This class has no teacher, so it has no forum.');
    return { me, cls, isTeacher };
  }

  async listForum(classId: string): Promise<ForumPost[]> {
    await this.ready;
    const { me, isTeacher } = this.forumAccess(classId);
    return forumView(this.forum(), {
      classId,
      viewerId: me.id,
      isTeacher,
      person: (id) => {
        const u = this.db.users.find((x) => x.id === id);
        return { fullName: u?.fullName ?? 'Student', role: u?.role === 'teacher' ? 'teacher' : 'student' };
      },
    });
  }

  async forumPost(input: { classId: string; topicId?: string | null; title?: string; body: string; visibility?: ForumVisibility }): Promise<string> {
    await this.ready;
    const { me, cls, isTeacher } = this.forumAccess(input.classId);
    const body = input.body.trim();
    const title = (input.title ?? '').trim();
    if (!body) throw new Error('Write something first.');
    if (body.length > 4000) throw new Error('Keep your post under 4,000 characters.');
    if (!isTeacher && this.forum().filter((p) => p.authorId === me.id && Date.now() - new Date(p.createdAt).getTime() < 600_000).length >= 10) throw new Error('You have posted ten times in the last ten minutes. Wait a little before posting again.');
    const base = { id: uid('fp'), classId: cls.id, authorId: me.id, pinned: false, answered: false, hidden: false, createdAt: nowIso() };
    if (!input.topicId) {
      if (!title) throw new Error('Give your question a title.');
      if (title.length > 120) throw new Error('Keep the title under 120 characters.');
      const visibility: ForumVisibility = isTeacher ? 'class' : (['teacher', 'class', 'anonymous'] as const).includes(input.visibility as ForumVisibility) ? input.visibility! : 'teacher';
      this.forum().push({ ...base, topicId: null, title, body, visibility });
      if (!isTeacher) this.notify(cls.teacherId, 'announcement', 'New question in the forum', title, `/t/c/${cls.id}/forum/${base.id}`);
      this.persist();
      return base.id;
    }
    const t = this.forum().find((p) => p.id === input.topicId && p.classId === cls.id && !p.topicId);
    if (!t || !(isTeacher || t.authorId === me.id || (t.visibility !== 'teacher' && !t.hidden))) throw new Error('That question was not found.');
    this.forum().push({ ...base, topicId: t.id, title: null, body, visibility: t.visibility });
    if (t.authorId !== me.id) this.notify(t.authorId, 'announcement', 'New reply to your question', t.title ?? '', t.authorId === cls.teacherId ? `/t/c/${cls.id}/forum/${t.id}` : `/s/forum/${t.id}`);
    if (!isTeacher && t.authorId !== cls.teacherId) this.notify(cls.teacherId, 'announcement', 'New reply in the forum', t.title ?? '', `/t/c/${cls.id}/forum/${t.id}`);
    this.persist();
    return base.id;
  }

  async moderateForumPost(id: string, patch: { pinned?: boolean; answered?: boolean; hidden?: boolean }): Promise<void> {
    await this.ready;
    const p = this.forum().find((x) => x.id === id);
    if (!p) throw new Error('That post was not found.');
    const { me, isTeacher } = this.forumAccess(p.classId);
    if (isTeacher) Object.assign(p, Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined)));
    else if (p.authorId === me.id && !p.topicId && patch.pinned === undefined && patch.hidden === undefined) {
      if (patch.answered !== undefined) p.answered = patch.answered;
    } else throw new Error('Only the teacher can do that.');
    this.persist();
  }

  async deleteForumPost(id: string): Promise<void> {
    await this.ready;
    const p = this.forum().find((x) => x.id === id);
    if (!p) throw new Error('That post was not found.');
    const { me, isTeacher } = this.forumAccess(p.classId);
    if (!isTeacher && p.authorId !== me.id) throw new Error('You can only remove your own posts.');
    this.db.forumPosts = this.forum().filter((x) => x.id !== id && x.topicId !== id);
    this.persist();
  }

  // ---------------------------------------------------------------- report cards

  private reportCards(): ReportCard[] {
    this.db.reportCards ??= [];
    return this.db.reportCards;
  }

  private teacherCard(id: string): ReportCard {
    const r = this.reportCards().find((x) => x.id === id);
    if (!r) throw new Error('That report card was not found.');
    this.requireTeacherOf(r.classId);
    return r;
  }

  async listReportCards(filter: { classId?: string; studentId?: string }): Promise<ReportCard[]> {
    await this.ready;
    const me = this.me();
    const mine = new Set(this.db.classes.filter((c) => c.teacherId === me.id).map((c) => c.id));
    return this.reportCards()
      .filter((r) => (mine.has(r.classId) || (r.studentId === me.id && r.status === 'shared')) && (!filter.classId || r.classId === filter.classId) && (!filter.studentId || r.studentId === filter.studentId))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map((r) => ({ ...r }));
  }

  async getReportCard(id: string): Promise<ReportCard | null> {
    return (await this.listReportCards({})).find((r) => r.id === id) ?? null;
  }

  async writeReportCard(classId: string, studentId: string, opts: { period: string; notes?: string }): Promise<ReportCard> {
    await this.ready;
    this.requireTeacherOf(classId);
    if (!this.db.enrollments.some((e) => e.classId === classId && e.studentId === studentId)) throw new Error('That student is not in this class.');
    const ctx = buildStudentContext(buildAnalystInput(this.db, classId), studentId);
    const res = await writeReportCard(ctx, opts, this.aiConfig());
    const now = nowIso();
    const r: ReportCard = { id: uid('rc'), classId, studentId, period: res.content.period, content: res.content, status: 'draft', source: res.source, model: res.model, shareToken: null, createdAt: now, updatedAt: now, sharedAt: null };
    this.reportCards().push(r);
    this.persist();
    return { ...r };
  }

  async saveReportCard(id: string, patch: { period: string; content: ReportCardContent }): Promise<ReportCard> {
    await this.ready;
    const r = this.teacherCard(id);
    r.period = patch.period.slice(0, 80);
    r.content = patch.content;
    r.updatedAt = nowIso();
    this.persist();
    return { ...r };
  }

  async shareReportCard(id: string, share: boolean): Promise<ReportCard> {
    await this.ready;
    const r = this.teacherCard(id);
    r.status = share ? 'shared' : 'draft';
    r.updatedAt = nowIso();
    if (share) {
      r.sharedAt = r.updatedAt;
      const cls = this.db.classes.find((c) => c.id === r.classId)!;
      this.notify(r.studentId, 'announcement', 'Your report card is ready', `${cls.name}${r.period ? `: ${r.period}` : ''}`, '/s/progress');
    } else r.shareToken = null;
    this.persist();
    return { ...r };
  }

  async reportCardLink(id: string, on: boolean): Promise<string | null> {
    await this.ready;
    const r = this.teacherCard(id);
    if (on && r.status !== 'shared') throw new Error('Share the report card with the student first.');
    r.shareToken = on ? (r.shareToken ?? Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) => b.toString(16).padStart(2, '0')).join('')) : null;
    this.persist();
    return r.shareToken;
  }

  async sharedReportCard(token: string): Promise<SharedReportCard | null> {
    await this.ready;
    const r = token.length === 64 ? this.reportCards().find((x) => x.shareToken === token && x.status === 'shared') : undefined;
    if (!r) return null;
    const cls = this.db.classes.find((c) => c.id === r.classId)!;
    const student = this.db.users.find((u) => u.id === r.studentId);
    const teacher = this.db.users.find((u) => u.id === cls.teacherId);
    return { period: r.period, content: r.content, sharedAt: r.sharedAt, studentName: (student?.fullName ?? 'Student').trim().split(/\s+/)[0], className: cls.name, courseId: cls.courseId, teacherName: teacher?.fullName ?? '' };
  }

  async deleteReportCard(id: string): Promise<void> {
    await this.ready;
    this.teacherCard(id);
    this.db.reportCards = this.reportCards().filter((r) => r.id !== id);
    this.persist();
  }

  async listInsights(classId: string, studentId?: string | null) {
    await this.ready;
    return this.db.insights
      .filter((i) => i.classId === classId && (studentId === undefined ? true : (i.studentId ?? null) === (studentId ?? null)))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async generateInsight(classId: string, studentId: string | null): Promise<Insight> {
    this.requireTeacherOf(classId);
    const input = buildAnalystInput(this.db, classId);
    const res = await generateInsight(input, studentId ? { scope: 'student', studentId } : { scope: 'class' }, this.aiConfig());
    const ins: Insight = { id: uid('i'), classId, studentId, createdAt: nowIso(), source: res.source, model: res.model, data: res.data, error: res.error ?? null };
    this.db.insights.push(ins);
    this.persist();
    return ins;
  }

  async draftAssignment(classId: string, request: DraftRequest): Promise<DraftResult> {
    await this.ready;
    const cls = this.requireTeacherOf(classId);
    const req = normalizeDraftRequest(request, cls.courseId);
    const students = new Set(this.db.enrollments.filter((e) => e.classId === classId).map((e) => e.studentId));
    const mastery = classMastery(this.db.mastery.filter((m) => students.has(m.studentId)));
    return draftAssignment(req, draftContext(cls.courseId, req.lessonIds, mastery), this.aiConfig(), uid);
  }

  async regenerateQuestion(classId: string, request: RegenerateRequest): Promise<RegenerateResult> {
    await this.ready;
    const cls = this.requireTeacherOf(classId);
    const req = normalizeRegenerateRequest(request, cls.courseId);
    return regenerateQuestion(req, draftContext(cls.courseId, req.lessonIds), this.aiConfig(), uid);
  }

  async suggestMark(submissionId: string, itemIndex: number, pages: string[]): Promise<MarkResult> {
    await this.ready;
    const s = this.db.submissions.find((x) => x.id === submissionId);
    if (!s) throw new Error('Submission not found.');
    this.requireTeacherOf(s.classId);
    const a = s.assignmentId ? this.db.assignments.find((x) => x.id === s.assignmentId) : null;
    const ref = s.items[itemIndex];
    const item = ref ? itemFromRef(ref, a?.content ?? { sections: [], custom: [] }, a?.id ?? 'practice') : null;
    const req = item ? markRequestFor(item, s.responses[itemIndex], pages) : null;
    if (!req) throw new Error('That question has no written response.');
    return suggestMark(req, this.aiConfig());
  }

  /** The tutor's narration, saved for this browser session like the server saves it. */
  private tutorScripts = new Map<string, TutorReply<{ script: TutorScript }>>();

  async tutorScript(lessonId: string, chunk: TutorChunk): Promise<TutorReply<{ script: TutorScript }>> {
    await this.ready;
    this.me();
    const clean = normalizeChunk(chunk);
    const key = JSON.stringify([lessonId, this.db.aiModel || DEFAULT_MODEL, clean]);
    const saved = this.tutorScripts.get(key);
    if (saved) return saved;
    const res = await writeTutorScript(clean, this.aiConfig());
    const reply = { script: res.script, source: res.source, model: res.model };
    if (res.source === 'minimax') this.tutorScripts.set(key, reply);
    return reply;
  }

  async askTutor(question: TutorQuestion): Promise<TutorReply<{ answer: TutorAnswer }>> {
    await this.ready;
    this.me();
    const res = await answerTutorQuestion(normalizeQuestion(question), this.aiConfig());
    return { answer: res.answer, source: res.source, model: res.model };
  }

  async setActionStatus(insightId: string, actionId: string, status: ProposedAction['status']) {
    const ins = this.db.insights.find((i) => i.id === insightId);
    if (!ins) return;
    this.requireTeacherOf(ins.classId);
    ins.data.actions = ins.data.actions.map((a) => (a.id === actionId ? { ...a, status } : a));
    this.persist();
  }

  // ------------------------------------------------------------------ platform administration
  // Mirrors the SQL functions in supabase/migrations/*_platform_admin.sql.

  private requireAdmin(): DemoUser {
    const me = this.me();
    if (!me.platformAdmin || me.disabled) throw new Error('Platform administrators only.');
    return me;
  }

  private audit(action: string, target: string | null, details: Record<string, unknown> = {}) {
    (this.db.audit ??= []).push({ id: uid('log'), createdAt: nowIso(), action, actorId: this.me().id, targetUser: target, details });
    this.persist();
  }

  private user(id: string): DemoUser {
    const u = this.db.users.find((x) => x.id === id);
    if (!u) throw new Error('User not found.');
    return u;
  }

  async signupConfig(): Promise<PlatformSettings> {
    await this.ready;
    return { teacherSignup: this.db.settings?.teacherSignup ?? 'open' };
  }

  async adminOverview(): Promise<AdminOverview> {
    await this.ready;
    this.requireAdmin();
    const now = Date.now();
    const within = (iso: string | null | undefined, days: number) => !!iso && now - new Date(iso).getTime() <= days * 86_400_000;
    const users = this.db.users;
    const recent = this.db.submissions.filter((x) => within(x.submittedAt, 7));
    const monday = new Date();
    monday.setHours(0, 0, 0, 0);
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    const signupsByWeek = Array.from({ length: 12 }, (_, i) => {
      const start = new Date(monday);
      start.setDate(start.getDate() - (11 - i) * 7);
      const end = start.getTime() + 7 * 86_400_000;
      const inWeek = users.filter((u) => {
        const t = new Date(u.createdAt).getTime();
        return t >= start.getTime() && t < end;
      });
      const pad = (n: number) => String(n).padStart(2, '0');
      return { week: `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`, teachers: inWeek.filter((u) => u.role === 'teacher').length, students: inWeek.filter((u) => u.role === 'student').length };
    });
    return {
      teachers: users.filter((u) => u.role === 'teacher' && (u.teacherStatus ?? 'approved') === 'approved' && !u.disabled).length,
      pendingTeachers: users.filter((u) => u.role === 'teacher' && u.teacherStatus === 'pending').length,
      students: users.filter((u) => u.role === 'student' && !u.disabled).length,
      disabled: users.filter((u) => u.disabled).length,
      classes: this.db.classes.filter((c) => !c.archived).length,
      assignments: this.db.assignments.filter((a) => a.status === 'published').length,
      submissions7d: recent.length,
      activeStudents7d: new Set(recent.map((x) => x.studentId)).size,
      aiInsights30d: this.db.insights.filter((i) => within(i.createdAt, 30)).length,
      signupsByWeek,
    };
  }

  async adminListUsers(f: AdminUserFilter): Promise<{ rows: AdminUserRow[]; total: number }> {
    await this.ready;
    this.requireAdmin();
    const q = (f.search ?? '').trim().toLowerCase();
    const list = this.db.users
      .filter((u) => !q || u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.username ?? '').toLowerCase().includes(q))
      .filter((u) => !f.role || u.role === f.role)
      .filter((u) => {
        switch (f.status) {
          case 'pending':
            return u.teacherStatus === 'pending';
          case 'disabled':
            return !!u.disabled;
          case 'admin':
            return !!u.platformAdmin;
          case 'active':
            return !u.disabled && (u.teacherStatus ?? 'approved') === 'approved';
          default:
            return true;
        }
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const offset = Math.max(0, f.offset ?? 0);
    const limit = Math.min(200, Math.max(1, f.limit ?? 50));
    const rows = list.slice(offset, offset + limit).map(
      (u): AdminUserRow => ({
        id: u.id,
        role: u.role,
        fullName: u.fullName,
        email: u.email,
        username: u.username ?? null,
        avatarColor: u.avatarColor,
        createdAt: u.createdAt,
        lastSignInAt: u.lastSignInAt ?? null,
        platformAdmin: !!u.platformAdmin,
        teacherStatus: u.role === 'teacher' ? u.teacherStatus ?? 'approved' : null,
        disabled: !!u.disabled,
        classes: u.role === 'teacher' ? this.db.classes.filter((c) => c.teacherId === u.id).length : this.db.enrollments.filter((e) => e.studentId === u.id).length,
      }),
    );
    return { rows, total: list.length };
  }

  async adminListClasses(f: { search?: string; limit?: number; offset?: number }): Promise<{ rows: AdminClassRow[]; total: number }> {
    await this.ready;
    this.requireAdmin();
    const q = (f.search ?? '').trim().toLowerCase();
    const name = (id: string) => this.db.users.find((u) => u.id === id)?.fullName ?? 'Unknown';
    // Teachers' classes, as in the database's admin list; self-paced classes belong to one student.
    const list = this.db.classes
      .filter((c): c is ClassRoom & { teacherId: string } => c.kind !== 'self' && !!c.teacherId)
      .filter((c) => !q || c.name.toLowerCase().includes(q) || name(c.teacherId).toLowerCase().includes(q))
      .map((c): AdminClassRow => {
        const times = [
          ...this.db.submissions.filter((x) => x.classId === c.id && x.submittedAt).map((x) => x.submittedAt!),
          ...this.db.assignments.filter((a) => a.classId === c.id).map((a) => a.createdAt),
          c.createdAt,
        ].sort();
        return {
          id: c.id,
          name: c.name,
          section: c.section,
          courseId: c.courseId,
          teacherId: c.teacherId,
          teacherName: name(c.teacherId),
          students: this.rosterIds(c.id).length,
          assignments: this.db.assignments.filter((a) => a.classId === c.id && a.status === 'published').length,
          lastActivity: times[times.length - 1] ?? null,
          createdAt: c.createdAt,
          archived: c.archived,
        };
      })
      .sort((a, b) => (b.lastActivity ?? '').localeCompare(a.lastActivity ?? ''));
    const offset = Math.max(0, f.offset ?? 0);
    const limit = Math.min(200, Math.max(1, f.limit ?? 50));
    return { rows: list.slice(offset, offset + limit), total: list.length };
  }

  async adminSetTeacherStatus(userId: string, status: 'approved' | 'rejected' | 'pending') {
    this.requireAdmin();
    const u = this.user(userId);
    if (u.role !== 'teacher') throw new Error('Teacher not found.');
    const from = u.teacherStatus ?? null;
    u.teacherStatus = status;
    if (status === 'approved' && from !== 'approved') this.notify(u.id, 'admin', 'Your teacher account is approved', 'You can now create classes and invite students.', '/t');
    this.audit(`teacher_${status}`, u.id, { from });
  }

  async adminSetPlatformAdmin(userId: string, on: boolean) {
    this.requireAdmin();
    const u = this.user(userId);
    if (on && u.role !== 'teacher') throw new Error('Only teacher accounts can be administrators.');
    if (!on && !this.db.users.some((x) => x.platformAdmin && !x.disabled && x.id !== userId)) throw new Error('Gradileo needs at least one administrator.');
    u.platformAdmin = on;
    if (on) u.teacherStatus = 'approved';
    this.audit(on ? 'admin_granted' : 'admin_revoked', u.id);
  }

  async adminSetUserDisabled(userId: string, disabled: boolean) {
    const me = this.requireAdmin();
    if (userId === me.id) throw new Error('You cannot disable your own account.');
    const u = this.user(userId);
    if (disabled && u.platformAdmin && !this.db.users.some((x) => x.platformAdmin && !x.disabled && x.id !== userId)) throw new Error('Gradileo needs at least one administrator.');
    u.disabled = disabled;
    this.audit(disabled ? 'user_disabled' : 'user_enabled', u.id);
  }

  async adminResetPassword(userId: string) {
    this.requireAdmin();
    const u = this.user(userId);
    const password = friendlyPassword();
    u.password = password;
    this.audit('password_reset', u.id);
    return password;
  }

  async adminGetSettings(): Promise<PlatformSettings> {
    await this.ready;
    this.requireAdmin();
    return { teacherSignup: this.db.settings?.teacherSignup ?? 'open' };
  }

  async adminSetSettings(patch: Partial<PlatformSettings>): Promise<PlatformSettings> {
    this.requireAdmin();
    const before = { teacherSignup: this.db.settings?.teacherSignup ?? 'open' } as PlatformSettings;
    if (patch.teacherSignup && patch.teacherSignup !== 'open' && patch.teacherSignup !== 'approval') throw new Error('Teacher sign-up must be "open" or "approval".');
    this.db.settings = { ...before, ...patch };
    if (patch.teacherSignup && patch.teacherSignup !== before.teacherSignup) this.audit('setting_changed', null, { key: 'teacher_signup', from: before.teacherSignup, to: patch.teacherSignup });
    else this.persist();
    return { ...this.db.settings };
  }

  async adminAuditLog(limit = 100): Promise<AdminAuditEntry[]> {
    await this.ready;
    this.requireAdmin();
    const name = (id: string | null) => (id ? this.db.users.find((u) => u.id === id)?.fullName ?? null : null);
    return [...(this.db.audit ?? [])]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit)
      .map((r) => ({ id: r.id, createdAt: r.createdAt, action: r.action, actorName: name(r.actorId), targetName: name(r.targetUser), details: r.details }));
  }

  async adminListCourseRequests(status?: CourseRequestStatus): Promise<CourseRequest[]> {
    await this.ready;
    this.requireAdmin();
    return this.db
      .courseRequests!.filter((r) => !status || r.status === status)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 200)
      .map(({ requesterId, ...r }) => {
        const u = this.db.users.find((x) => x.id === requesterId);
        return { ...r, requester: { id: requesterId, name: u?.fullName ?? 'Unknown', role: u?.role ?? 'student' } };
      });
  }

  async adminUpdateCourseRequest(id: string, patch: { status: CourseRequestStatus; note?: string | null; issueUrl?: string | null }) {
    await this.ready;
    this.requireAdmin();
    const r = this.db.courseRequests!.find((x) => x.id === id);
    if (!r) throw new Error('That request was not found.');
    const url = patch.issueUrl?.trim() || null;
    if (url && !/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/issues\/[0-9]+$/.test(url)) throw new Error('Paste the link of a GitHub issue, like https://github.com/owner/repo/issues/12.');
    const before = r.status;
    r.status = patch.status;
    r.adminNote = patch.note?.trim().slice(0, 1000) || null;
    r.issueUrl = url;
    r.decidedAt = patch.status === 'new' ? null : patch.status === before ? r.decidedAt : nowIso();
    if (patch.status !== before) {
      this.audit(`course_request_${patch.status}`, r.requesterId, { title: r.title });
      const title = { approved: `Your request is planned: ${r.title}`, done: `Now on Gradileo: ${r.title}`, declined: `Your request was not taken up: ${r.title}`, new: '' }[patch.status];
      const body = r.adminNote ?? { approved: 'Thank you. We will build it and tell you when it is ready.', done: 'The course or topic you asked for is ready.', declined: 'Thank you for asking. It is not planned for now.', new: '' }[patch.status];
      if (title) this.notify(r.requesterId, 'announcement', title, body, null);
    }
    this.persist();
  }

  async adminListLessonEdits(status?: LessonEditStatus): Promise<LessonEdit[]> {
    await this.ready;
    this.requireAdmin();
    return this.db
      .lessonEdits!.filter((e) => !status || e.status === status)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 200)
      .map(({ authorId, ...e }) => ({ ...e, author: { id: authorId, name: this.db.users.find((u) => u.id === authorId)?.fullName ?? 'Unknown' } }));
  }

  async adminDecideLessonEdit(id: string, status: 'approved' | 'declined' | 'reverted', note?: string | null) {
    await this.ready;
    this.requireAdmin();
    const e = this.db.lessonEdits!.find((x) => x.id === id);
    if (!e) throw new Error('That suggestion was not found.');
    if ((status === 'approved' || status === 'declined') && e.status !== 'pending') throw new Error('Only waiting suggestions can be approved or declined.');
    if (status === 'reverted' && e.status !== 'approved') throw new Error('Only approved edits can be reverted.');
    if (status === 'approved') for (const x of this.db.lessonEdits!) if (x.lessonId === e.lessonId && x.baseHash === e.baseHash && x.status === 'approved') Object.assign(x, { status: 'replaced', decidedAt: nowIso() });
    Object.assign(e, { status, adminNote: note?.trim().slice(0, 1000) || null, decidedAt: nowIso() });
    this.audit(`lesson_edit_${status}`, e.authorId, { lesson: e.lessonId, section: e.sectionTitle });
    const title = { approved: `Your lesson edit is live: ${e.sectionTitle}`, declined: `Your lesson edit was not accepted: ${e.sectionTitle}`, reverted: `Your lesson edit was removed: ${e.sectionTitle}` }[status];
    const body = e.adminNote ?? { approved: 'Thank you. Every class now sees your change.', declined: 'Thank you for the suggestion. The section stays as it is for now.', reverted: 'The section is back to the original lesson.' }[status];
    this.notify(e.authorId, 'announcement', title, body, null);
    this.persist();
  }

  async listApprovedLessonEdits(lessonId: string): Promise<LessonEdit[]> {
    await this.ready;
    return this.db.lessonEdits!.filter((e) => e.lessonId === lessonId && e.status === 'approved').map(({ authorId: _a, ...e }) => e);
  }

  async listMyLessonEdits(lessonId: string): Promise<LessonEdit[]> {
    await this.ready;
    const me = this.me();
    return this.db
      .lessonEdits!.filter((e) => e.lessonId === lessonId && e.authorId === me.id)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map(({ authorId: _a, ...e }) => e);
  }

  async suggestLessonEdit(input: LessonEditInput): Promise<LessonEdit> {
    await this.ready;
    const me = this.me();
    const canTeach = me.role === 'teacher' && (me.teacherStatus ?? 'approved') === 'approved' && !me.disabled;
    if (!canTeach && !(me.platformAdmin && !me.disabled)) throw new Error('Only teachers can suggest lesson edits.');
    const markdown = input.markdown.trim();
    if (!markdown) throw new Error('The suggested section is empty.');
    if (markdown === input.original.trim()) throw new Error('Change something before sending the suggestion.');
    if (!/^[0-9a-f]{8}$/.test(input.baseHash)) throw new Error('That section could not be identified.');
    if (this.db.lessonEdits!.filter((e) => e.authorId === me.id && e.status === 'pending').length >= 20) throw new Error('You have 20 suggestions waiting for review. Please wait for some to be reviewed.');
    const e = { id: uid('le'), lessonId: input.lessonId, sectionTitle: input.sectionTitle.trim().slice(0, 200), baseHash: input.baseHash, original: input.original, markdown, reason: input.reason.trim().slice(0, 500) || null, status: 'pending' as const, adminNote: null, createdAt: nowIso(), decidedAt: null, authorId: me.id };
    this.db.lessonEdits!.push(e);
    for (const a of this.db.users.filter((x) => x.platformAdmin && !x.disabled && x.id !== me.id)) this.notify(a.id, 'admin', `Lesson edit suggested: ${e.sectionTitle}`, `${me.fullName} suggested a change to lesson ${e.lessonId}.`, '/admin/edits');
    this.persist();
    const { authorId: _a, ...out } = e;
    return out;
  }

  async withdrawLessonEdit(id: string) {
    await this.ready;
    const me = this.me();
    const e = this.db.lessonEdits!.find((x) => x.id === id && x.authorId === me.id && x.status === 'pending');
    if (!e) throw new Error('That suggestion was not found or has already been reviewed.');
    Object.assign(e, { status: 'withdrawn', decidedAt: nowIso() });
    this.persist();
  }

  async listVideoLinks(): Promise<Record<string, string>> {
    await this.ready;
    return { ...this.db.videoLinks };
  }

  async adminSetVideoLink(videoId: string, youtubeId: string | null) {
    await this.ready;
    this.requireAdmin();
    if (!/^[a-z0-9-]{3,40}$/.test(videoId)) throw new Error('That video was not found.');
    const id = youtubeId?.trim() || null;
    if (id && !YOUTUBE_ID.test(id)) throw new Error('That is not a YouTube video id.');
    if (id) this.db.videoLinks![videoId] = id;
    else delete this.db.videoLinks![videoId];
    this.audit(id ? 'video_link_set' : 'video_link_removed', null, id ? { video: videoId, youtube: id } : { video: videoId });
    this.persist();
  }

  async requestCourse(input: CourseRequestInput): Promise<CourseRequest> {
    await this.ready;
    const me = this.me();
    const title = input.title.trim();
    if (input.kind !== 'course' && input.kind !== 'topic') throw new Error('Choose a course or a topic.');
    if (title.length < 3 || title.length > 120) throw new Error('Give the course or topic a name (3 to 120 characters).');
    if (input.grade !== null && (input.grade < 1 || input.grade > 12)) throw new Error('Choose a grade from 1 to 12.');
    const today = this.db.courseRequests!.filter((r) => r.requesterId === me.id && Date.now() - new Date(r.createdAt).getTime() < 86_400_000);
    if (today.length >= 5) throw new Error('You have sent 5 requests today. Please try again tomorrow.');
    const r = { id: uid('cr'), requesterId: me.id, kind: input.kind, title, grade: input.grade, details: input.details.trim().slice(0, 2000) || null, status: 'new' as const, adminNote: null, issueUrl: null, createdAt: nowIso(), decidedAt: null };
    this.db.courseRequests!.push(r);
    for (const a of this.db.users.filter((x) => x.platformAdmin && !x.disabled)) this.notify(a.id, 'admin', `New ${r.kind} request: ${title}`, `${me.fullName} (${me.role}) asked for it.`, '/admin/requests');
    this.persist();
    const { requesterId: _r, ...out } = r;
    return out;
  }

  async listMyCourseRequests(): Promise<CourseRequest[]> {
    await this.ready;
    const me = this.me();
    return this.db
      .courseRequests!.filter((r) => r.requesterId === me.id)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map(({ requesterId: _r, ...r }) => r);
  }

  // ------------------------------------------------------------------ scheduler

  async runScheduledJobs() {
    await this.ready;
    const roster = new Map<string, string[]>();
    for (const c of this.db.classes) roster.set(c.id, this.rosterIds(c.id));
    const sent = new Set(this.db.reminderLog);
    const { reminders, suppressed } = dueReminders({ now: new Date(), assignments: this.db.assignments, roster, done: this.doneSet(), sent });
    if (!reminders.length && suppressed.every((k) => sent.has(k))) return;
    for (const r of reminders) {
      this.notify(r.studentId, 'reminder', r.title, r.body, `/s/work/${r.assignmentId}`, r.assignmentId);
      this.db.reminderLog.push(r.key);
    }
    for (const k of suppressed) if (!sent.has(k)) this.db.reminderLog.push(k);
    this.persist();
  }
}


export { DEMO_PASSWORD };
