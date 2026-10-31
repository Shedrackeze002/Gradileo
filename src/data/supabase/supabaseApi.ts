/**
 * SupabaseApi: the production backend.
 *
 * Security model: Row Level Security protects every table. Anything that changes
 * grades, mastery or another user's data goes through a security-definer RPC or an
 * Edge Function running with the service role (see /supabase).
 */
import { createClient, type SupabaseClient, type RealtimeChannel } from '@supabase/supabase-js';
import { allRows } from './pages.ts';
import { freshSeed } from '@engine/rng.ts';
import { getCourse } from '@engine/curriculum/index.ts';
import { isQuestionType, type StoredResponse } from '@engine/assemble.ts';
import type { Integrity } from '@engine/integrity.ts';
import type { AiConfigStatus, DataApi, SignUpInput, TutorReply } from '../api.ts';
import { offlineScript, type TutorAnswer, type TutorChunk, type TutorQuestion, type TutorScript } from '@engine/ai/tutor.ts';
import type { DraftRequest, DraftResult, RegenerateRequest, RegenerateResult } from '@engine/ai/builder.ts';
import type { MarkResult } from '@engine/ai/marking.ts';
import type { ReportCardContent } from '@engine/ai/reportCard.ts';
import type {
  AdminOverview,
  AdminUserFilter,
  AppNotification,
  Assignment,
  ClassSettings,
  CourseRequestInput,
  CourseRequestStatus,
  Insight,
  LessonEditInput,
  LessonEditStatus,
  ItemRef,
  JoinDecision,
  JoinLinkClass,
  JoinResult,
  NewStudentCredential,
  PlatformSettings,
  Profile,
  ProposedAction,
  ReportCard,
  Resource,
  SharedReportCard,
  ForumPost,
  ForumVisibility,
  Board,
  BoardInput,
  LessonPrefs,
  LiveAnswer,
  LiveQuestion,
  Presentation,
  ClassQuestion,
  Submission,
} from '../types.ts';
import {
  assignmentChanges,
  fromAssignment,
  toAdminClass,
  toAdminUser,
  toAnnouncement,
  toAssignment,
  toAuditEntry,
  toClass,
  toClassJoinRequest,
  toCourseRequest,
  toLessonEdit,
  toEvent,
  toInsight,
  toReportCard,
  toMastery,
  toMyJoinRequest,
  toNotification,
  toProfile,
  toPublication,
  toResource,
  toBoard,
  toLiveAnswer,
  toLiveQuestion,
  toPresentation,
  toClassQuestion,
  toSubmission,
} from './mappers.ts';
import { STUDENT_EMAIL_DOMAIN } from '@/config.ts';

function browserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Edmonton';
  } catch {
    return 'America/Edmonton';
  }
}

function fail(error: { message: string } | null): void {
  if (error) throw new Error(error.message);
}

const DISABLED_MESSAGE = 'This account has been disabled. Please contact your school administrator.';

/** A random sign-in from the join-class function, used once by this device (never shown). */
interface Credentials {
  email: string;
  password: string;
}

export class SupabaseApi implements DataApi {
  readonly mode = 'supabase' as const;
  readonly client: SupabaseClient;
  private profile: Profile | null = null;
  private channel: RealtimeChannel | null = null;
  private notifListeners = new Set<(n: AppNotification) => void>();

  constructor(url: string, anonKey: string) {
    this.client = createClient(url, anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  }

  private async uid(): Promise<string> {
    const { data } = await this.client.auth.getUser();
    if (!data.user) throw new Error('Please sign in.');
    return data.user.id;
  }

  private async loadProfile(id: string): Promise<Profile | null> {
    const { data, error } = await this.client.from('profiles').select('*').eq('id', id).maybeSingle();
    fail(error);
    this.profile = data ? toProfile(data) : null;
    if (this.profile) this.ensureRealtime(this.profile.id);
    return this.profile;
  }

  private async invoke<T>(fn: string, body: Record<string, unknown>): Promise<T> {
    const { data, error } = await this.client.functions.invoke(fn, { body });
    if (error) {
      // Surface the function's JSON error message when available.
      let message = error.message;
      try {
        const ctx = (error as { context?: Response }).context;
        if (ctx && typeof ctx.json === 'function') {
          const j = await ctx.json();
          if (j?.error) message = j.error;
        }
      } catch {
        /* keep default message */
      }
      throw new Error(message);
    }
    if (data && typeof data === 'object' && 'error' in (data as Record<string, unknown>)) throw new Error(String((data as { error: unknown }).error));
    return data as T;
  }

  // ------------------------------------------------------------------ auth

  async getCurrentUser() {
    const { data } = await this.client.auth.getSession();
    if (!data.session) return null;
    const p = this.profile?.id === data.session.user.id ? this.profile : await this.loadProfile(data.session.user.id);
    if (p?.disabled) {
      await this.signOut();
      return null;
    }
    return p;
  }

  onAuthChange(cb: (u: Profile | null) => void) {
    const { data } = this.client.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        this.profile = null;
        this.channel?.unsubscribe();
        this.channel = null;
        cb(null);
        return;
      }
      if (event !== 'SIGNED_IN' && event !== 'USER_UPDATED') return;
      // Supabase says SIGNED_IN again each time the tab comes back into view. The profile is loaded
      // then, and a failed reload (a tablet still waking up) must not sign the page out.
      if (event === 'SIGNED_IN' && this.profile?.id === session.user.id) return cb(this.profile);
      try {
        cb(await this.loadProfile(session.user.id));
      } catch {
        /* keep the profile already shown; the next call that needs the sign-in retries */
      }
    });
    return () => data.subscription.unsubscribe();
  }

  async signIn(identifier: string, password: string) {
    const id = identifier.trim();
    const email = id.includes('@') ? id : `${id.toLowerCase()}@${STUDENT_EMAIL_DOMAIN}`;
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message === 'Invalid login credentials') throw new Error('That email/username and password do not match.');
      if (/banned/i.test(error.message)) throw new Error(DISABLED_MESSAGE);
      throw new Error(error.message);
    }
    const p = await this.loadProfile(data.user.id);
    if (!p) throw new Error('Your profile is missing. Please contact your teacher.');
    if (p.disabled) {
      await this.signOut();
      throw new Error(DISABLED_MESSAGE);
    }
    return p;
  }

  async signUp(input: SignUpInput) {
    const { data, error } = await this.client.auth.signUp({
      email: input.email.trim(),
      password: input.password,
      options: {
        data: { full_name: input.fullName.trim(), role: input.role, join_code: input.joinCode?.trim().toUpperCase() || null },
        emailRedirectTo: `${window.location.origin}${import.meta.env.BASE_URL}`,
      },
    });
    fail(error);
    if (!data.session) throw new Error('Account created. Check your email to confirm your address, then sign in.');
    const p = await this.loadProfile(data.user!.id);
    if (!p) throw new Error('Your account was created but the profile is not ready yet. Please sign in again.');
    return p;
  }

  async signOut() {
    await this.client.auth.signOut();
  }

  async updateProfile(patch: Partial<Pick<Profile, 'fullName' | 'avatarColor' | 'curriculum'>>) {
    const id = await this.uid();
    const row: Record<string, unknown> = {};
    if (patch.fullName !== undefined) row.full_name = patch.fullName;
    if (patch.avatarColor !== undefined) row.avatar_color = patch.avatarColor;
    if (patch.curriculum !== undefined) row.curriculum = patch.curriculum;
    const { data, error } = await this.client.from('profiles').update(row).eq('id', id).select().single();
    fail(error);
    this.profile = toProfile(data);
    return this.profile;
  }

  async changePassword(newPassword: string) {
    const { error } = await this.client.auth.updateUser({ password: newPassword });
    fail(error);
  }

  // ------------------------------------------------------------------ classes

  async listMyClasses() {
    const me = await this.getCurrentUser();
    if (!me) return [];
    if (me.role === 'teacher') {
      const { data, error } = await this.client.from('classes').select('*').eq('teacher_id', me.id).order('created_at');
      fail(error);
      return (data ?? []).map(toClass);
    }
    const { data, error } = await this.client.from('enrollments').select('classes(*)').eq('student_id', me.id);
    fail(error);
    return (data ?? []).map((r: { classes: unknown }) => toClass(r.classes as Record<string, unknown>)).filter((c) => !c.archived);
  }

  async getClass(id: string) {
    const { data, error } = await this.client.from('classes').select('*').eq('id', id).maybeSingle();
    fail(error);
    return data ? toClass(data) : null;
  }

  async createClass(input: { name: string; section?: string | null; courseId: string; joinApproval?: boolean }) {
    const id = await this.uid();
    const me = await this.getCurrentUser();
    if (me?.role === 'teacher' && me.teacherStatus !== 'approved') throw new Error('Your teacher account is waiting for approval.');
    const { data, error } = await this.client
      .from('classes')
      .insert({ teacher_id: id, name: input.name.trim(), section: input.section?.trim() || null, course_id: input.courseId, settings: { timezone: browserTimeZone(), ...(input.joinApproval ? { joinApproval: true } : {}) } })
      .select()
      .single();
    fail(error);
    return toClass(data);
  }

  async updateClass(id: string, patch: { name?: string; section?: string | null; settings?: Partial<ClassSettings>; archived?: boolean }) {
    const row: Record<string, unknown> = {};
    if (patch.name !== undefined) row.name = patch.name;
    if (patch.section !== undefined) row.section = patch.section;
    if (patch.archived !== undefined) row.archived = patch.archived;
    if (patch.settings) {
      const current = await this.getClass(id);
      row.settings = { ...(current?.settings ?? {}), ...patch.settings };
    }
    const { data, error } = await this.client.from('classes').update(row).eq('id', id).select().single();
    fail(error);
    return toClass(data);
  }

  async regenerateJoinCode(id: string) {
    const { data, error } = await this.client.rpc('regenerate_join_code', { p_class_id: id });
    fail(error);
    return toClass(data);
  }

  async joinClass(code: string) {
    const { data, error } = await this.client.rpc('join_class', { p_code: code.trim().toUpperCase() });
    fail(error);
    return toClass(data);
  }

  async requestToJoin(code: string, message?: string): Promise<JoinResult> {
    const { data, error } = await this.client.rpc('request_to_join', { p_code: code.trim().toUpperCase(), p_message: message?.trim() || null });
    fail(error);
    const r = data as { status: string; classId: string; className: string; teacherName: string | null };
    return { status: r.status === 'pending' ? 'pending' : 'joined', classId: r.classId, className: r.className, teacherName: r.teacherName ?? null };
  }

  async listMyJoinRequests() {
    const { data, error } = await this.client.rpc('my_join_requests');
    fail(error);
    return ((data ?? []) as Record<string, unknown>[]).map(toMyJoinRequest);
  }

  async listJoinRequests(classId: string) {
    const { data, error } = await this.client.rpc('class_join_requests', { p_class_id: classId });
    fail(error);
    return ((data ?? []) as Record<string, unknown>[]).map(toClassJoinRequest);
  }

  async decideJoinRequest(requestId: string, approve: boolean) {
    const { error } = await this.client.rpc('decide_join_request', { p_request_id: requestId, p_approve: approve });
    fail(error);
  }

  async decideJoinRequests(classId: string, decisions: JoinDecision[]) {
    const { error } = await this.client.rpc('decide_join_requests', {
      p_class_id: classId,
      p_decisions: decisions.map((d) => ({ id: d.requestId, approve: d.approve, sameAs: d.approve ? (d.sameAs ?? null) : null })),
    });
    fail(error);
  }

  async classForJoinLink(code: string): Promise<JoinLinkClass | null> {
    const { data, error } = await this.client.rpc('class_for_join', { p_code: code.trim().toUpperCase() });
    fail(error);
    const row = ((data ?? []) as Array<{ class_name: string; teacher_name: string | null }>)[0];
    return row ? { className: row.class_name, teacherName: row.teacher_name ?? null } : null;
  }

  async joinWithName(code: string, firstName: string, lastName: string) {
    const res = await this.invoke<{ credentials: Credentials; result: JoinResult }>('join-class', {
      action: 'join',
      code: code.trim().toUpperCase(),
      firstName,
      lastName,
    });
    return { profile: await this.signIn(res.credentials.email, res.credentials.password), result: res.result };
  }

  async claimMatchedAccount() {
    const res = await this.invoke<{ credentials: Credentials | null }>('join-class', { action: 'claim' });
    if (!res.credentials) return null;
    // Signing in replaces this device's session (its own account is gone) with the student's.
    return this.signIn(res.credentials.email, res.credentials.password);
  }

  async startSelfPaced(courseId: string) {
    const { data, error } = await this.client.rpc('start_self_paced', { p_course_id: courseId, p_lesson_ids: getCourse(courseId)?.lessons.map((l) => l.id) ?? [] });
    fail(error);
    return toClass(data);
  }

  async listRoster(classId: string) {
    const { data, error } = await this.client.from('enrollments').select('profiles(*)').eq('class_id', classId);
    fail(error);
    return (data ?? []).map((r: { profiles: unknown }) => toProfile(r.profiles as Record<string, unknown>)).sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  async getProfile(id: string) {
    const { data, error } = await this.client.from('profiles').select('*').eq('id', id).maybeSingle();
    fail(error);
    const p = data ? toProfile(data) : null;
    // Keep the signed-in profile fresh (an administrator may have approved this teacher).
    if (p && p.id === this.profile?.id) this.profile = p;
    return p;
  }

  async removeStudent(classId: string, studentId: string) {
    const { error } = await this.client.from('enrollments').delete().eq('class_id', classId).eq('student_id', studentId);
    fail(error);
  }

  async createStudentAccounts(classId: string, names: string[]) {
    const res = await this.invoke<{ students: NewStudentCredential[] }>('create-students', { classId, names });
    return res.students;
  }

  // ------------------------------------------------------------------ curriculum

  async listPublications(classId: string) {
    const { data, error } = await this.client.from('publications').select('*').eq('class_id', classId);
    fail(error);
    return (data ?? []).map(toPublication);
  }

  async setPublished(classId: string, lessonId: string, published: boolean) {
    if (published) {
      const { error } = await this.client.from('publications').upsert({ class_id: classId, lesson_id: lessonId });
      fail(error);
    } else {
      const { error } = await this.client.from('publications').delete().eq('class_id', classId).eq('lesson_id', lessonId);
      fail(error);
    }
  }

  async listResources(classId: string) {
    const { data, error } = await this.client.from('resources').select('*').eq('class_id', classId).order('created_at');
    fail(error);
    return (data ?? []).map(toResource);
  }

  async addResource(input: Omit<Resource, 'id' | 'createdAt'>) {
    const { data, error } = await this.client.from('resources').insert({ class_id: input.classId, lesson_id: input.lessonId, kind: input.kind, title: input.title, url: input.url, body: input.body }).select().single();
    fail(error);
    return toResource(data);
  }

  async deleteResource(id: string) {
    const { error } = await this.client.from('resources').delete().eq('id', id);
    fail(error);
  }

  // ------------------------------------------------------------------ presenting

  async getLessonPrefs(classId: string, lessonId: string): Promise<LessonPrefs> {
    const { data, error } = await this.client.from('lesson_prefs').select('hidden').eq('class_id', classId).eq('lesson_id', lessonId).maybeSingle();
    fail(error);
    return { classId, lessonId, hidden: (data?.hidden as string[] | null) ?? [] };
  }

  async setHiddenBlocks(classId: string, lessonId: string, hidden: string[]): Promise<LessonPrefs> {
    const list = [...new Set(hidden)].slice(0, 500);
    const { error } = await this.client.from('lesson_prefs').upsert({ class_id: classId, lesson_id: lessonId, hidden: list, updated_at: new Date().toISOString() });
    fail(error);
    return { classId, lessonId, hidden: list };
  }

  async listBoards(classId: string, lessonId: string): Promise<Board[]> {
    // Row-level security returns every board to the class's teacher and shared boards to its students.
    const { data, error } = await this.client.from('boards').select('*').eq('class_id', classId).eq('lesson_id', lessonId).order('updated_at', { ascending: false });
    fail(error);
    return (data ?? []).map(toBoard);
  }

  async saveBoard(input: BoardInput): Promise<Board> {
    const title = input.title.trim().slice(0, 120) || 'Whiteboard';
    if (input.id) {
      const patch: Record<string, unknown> = { title, pages: input.pages, updated_at: new Date().toISOString() };
      if (input.shared !== undefined) patch.shared = input.shared;
      const { data, error } = await this.client.from('boards').update(patch).eq('id', input.id).select().maybeSingle();
      fail(error);
      if (data) return toBoard(data);
    }
    const { data, error } = await this.client.from('boards').insert({ class_id: input.classId, lesson_id: input.lessonId, title, pages: input.pages, shared: input.shared ?? false }).select().single();
    fail(error);
    return toBoard(data);
  }

  async setBoardShared(id: string, shared: boolean) {
    const { error } = await this.client.from('boards').update({ shared }).eq('id', id);
    fail(error);
  }

  async deleteBoard(id: string) {
    const { error } = await this.client.from('boards').delete().eq('id', id);
    fail(error);
  }

  // ------------------------------------------------------------------ live class questions

  async openLiveQuestion(input: { classId: string; lessonId: string | null; skillId: string; difficulty: 1 | 2 | 3; seed: number }): Promise<LiveQuestion> {
    // One open question per class (a unique index enforces it): close the previous one first.
    const closed = await this.client.from('live_questions').update({ status: 'closed', closed_at: new Date().toISOString() }).eq('class_id', input.classId).eq('status', 'open');
    fail(closed.error);
    const { data, error } = await this.client
      .from('live_questions')
      .insert({ class_id: input.classId, lesson_id: input.lessonId, skill_id: input.skillId, difficulty: input.difficulty, seed: input.seed })
      .select()
      .single();
    fail(error);
    return toLiveQuestion(data);
  }

  async closeLiveQuestion(id: string) {
    const { error } = await this.client.from('live_questions').update({ status: 'closed', closed_at: new Date().toISOString() }).eq('id', id);
    fail(error);
  }

  async currentLiveQuestion(classId: string): Promise<LiveQuestion | null> {
    const since = new Date(Date.now() - 3 * 3600_000).toISOString();
    const { data, error } = await this.client.from('live_questions').select('*').eq('class_id', classId).gte('created_at', since).order('created_at', { ascending: false }).limit(1).maybeSingle();
    fail(error);
    return data ? toLiveQuestion(data) : null;
  }

  async listLiveAnswers(questionId: string): Promise<LiveAnswer[]> {
    // Row-level security returns every answer to the teacher and only their own to a student.
    const { data, error } = await this.client.from('live_answers').select('*').eq('question_id', questionId);
    fail(error);
    return (data ?? []).map(toLiveAnswer);
  }

  async submitLiveAnswer(questionId: string, responses: string[]) {
    const me = await this.uid();
    const { data: q, error: qe } = await this.client.from('live_questions').select('class_id').eq('id', questionId).maybeSingle();
    fail(qe);
    if (!q) throw new Error('This question is not for your class.');
    const answer = { responses: responses.slice(0, 20).map((r) => String(r ?? '').slice(0, 400)), answered_at: new Date().toISOString() };
    const check = (error: { message: string } | null) => {
      if (error) throw new Error(/row-level security/i.test(error.message) ? 'Your teacher has closed this question.' : error.message);
    };
    // Students may change only these two columns of their answer, and an upsert would also rewrite
    // the row's keys, which the database refuses. So change an answer already sent, or else send one.
    const change = () => this.client.from('live_answers').update(answer).eq('question_id', questionId).eq('student_id', me).select('question_id');
    const changed = await change();
    check(changed.error);
    if (changed.data?.length) return;
    let { error } = await this.client.from('live_answers').insert({ question_id: questionId, class_id: q.class_id, student_id: me, ...answer });
    // The same answer sent twice at once: the other request made the row first.
    if (error?.code === '23505') ({ error } = await change());
    check(error);
  }

  subscribeLive(classId: string, cb: () => void) {
    const channel = this.client
      .channel(`live:${classId}:${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'live_questions', filter: `class_id=eq.${classId}` }, () => cb())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'live_answers', filter: `class_id=eq.${classId}` }, () => cb())
      .subscribe();
    return () => {
      void this.client.removeChannel(channel);
    };
  }

  // ------------------------------------------------------------------ students' questions during a presentation

  async startPresenting(classId: string, lessonId: string): Promise<Presentation> {
    const { data, error } = await this.client.rpc('start_presenting', { p_class_id: classId, p_lesson_id: lessonId });
    fail(error);
    return { classId, lessonId, startedAt: data as string };
  }

  async stopPresenting(classId: string) {
    const { error } = await this.client.rpc('stop_presenting', { p_class_id: classId });
    fail(error);
  }

  async currentPresentation(classId: string): Promise<Presentation | null> {
    // A presentation without a heartbeat for five minutes was left open in a closed tab.
    const since = new Date(Date.now() - 5 * 60_000).toISOString();
    const { data, error } = await this.client.from('class_presentations').select('*').eq('class_id', classId).is('ended_at', null).gte('seen_at', since).maybeSingle();
    fail(error);
    return data ? toPresentation(data) : null;
  }

  async askQuestion(input: { classId: string; body: string; anonymous: boolean }): Promise<ClassQuestion> {
    const { data, error } = await this.client.rpc('ask_class_question', { p_class_id: input.classId, p_body: input.body, p_anonymous: input.anonymous });
    fail(error);
    const me = await this.loadProfile(await this.uid());
    return toClassQuestion({ ...(data as Record<string, unknown>), student: me ? { full_name: me.fullName } : null });
  }

  async listClassQuestions(classId: string, filter: { lessonId?: string; presentedAt?: string } = {}): Promise<ClassQuestion[]> {
    // Row-level security returns every question to the teacher and only their own to a student.
    let q = this.client.from('class_questions').select('*, student:profiles!class_questions_student_id_fkey(full_name)').eq('class_id', classId);
    if (filter.lessonId) q = q.eq('lesson_id', filter.lessonId);
    if (filter.presentedAt) q = q.eq('presented_at', filter.presentedAt);
    const { data, error } = await q.order('created_at', { ascending: false }).limit(200);
    fail(error);
    return (data ?? []).map(toClassQuestion);
  }

  async setQuestionStatus(id: string, status: 'answered' | 'skipped') {
    const { error } = await this.client.from('class_questions').update({ status, decided_at: new Date().toISOString() }).eq('id', id);
    fail(error);
  }

  async deleteQuestion(id: string) {
    const { error } = await this.client.from('class_questions').delete().eq('id', id);
    fail(error);
  }

  subscribeQuestions(classId: string, cb: () => void) {
    const channel = this.client
      .channel(`questions:${classId}:${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'class_presentations', filter: `class_id=eq.${classId}` }, () => cb())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'class_questions', filter: `class_id=eq.${classId}` }, () => cb())
      .subscribe();
    return () => {
      void this.client.removeChannel(channel);
    };
  }

  // ------------------------------------------------------------------ assignments

  async listAssignments(classId: string) {
    const { data, error } = await this.client.from('assignments').select('*').eq('class_id', classId).order('due_at', { ascending: false, nullsFirst: true });
    fail(error);
    return (data ?? []).map(toAssignment);
  }

  async getAssignment(id: string) {
    const { data, error } = await this.client.from('assignments').select('*').eq('id', id).maybeSingle();
    fail(error);
    return data ? toAssignment(data) : null;
  }

  async saveAssignment(input: Partial<Assignment> & { classId: string }) {
    if (input.id) {
      const { data, error } = await this.client.from('assignments').update(assignmentChanges(input)).eq('id', input.id).select().single();
      fail(error);
      return toAssignment(data);
    }
    const { data, error } = await this.client
      .from('assignments')
      .insert({ ...fromAssignment(input), title: input.title?.trim() || 'Untitled assignment', status: 'draft', content: input.content ?? { sections: [], custom: [] } })
      .select()
      .single();
    fail(error);
    return toAssignment(data);
  }

  async publishAssignment(id: string) {
    const a = await this.getAssignment(id);
    if (a && isQuestionType(a.type) && a.content.sections.length === 0 && a.content.custom.length === 0) throw new Error('Add at least one question before publishing.');
    const { data, error } = await this.client.rpc('publish_assignment', { p_assignment_id: id });
    fail(error);
    return toAssignment(data);
  }

  async deleteAssignment(id: string) {
    const { error } = await this.client.from('assignments').delete().eq('id', id);
    fail(error);
  }

  async remindNow(assignmentId: string) {
    const { data, error } = await this.client.rpc('remind_now', { p_assignment_id: assignmentId });
    fail(error);
    return Number(data ?? 0);
  }

  // ------------------------------------------------------------------ submissions

  async listSubmissions(filter: { classId?: string; assignmentId?: string; studentId?: string }) {
    const page = (from: number, to: number) => {
      let q = this.client.from('submissions').select('*');
      if (filter.classId) q = q.eq('class_id', filter.classId);
      if (filter.assignmentId) q = q.eq('assignment_id', filter.assignmentId);
      if (filter.studentId) q = q.eq('student_id', filter.studentId);
      return q.order('started_at', { ascending: false }).order('id').range(from, to);
    };
    return (await allRows(page, 5000)).map(toSubmission);
  }

  async getSubmission(id: string) {
    const { data, error } = await this.client.from('submissions').select('*').eq('id', id).maybeSingle();
    fail(error);
    return data ? toSubmission(data) : null;
  }

  async startSubmission(assignmentId: string) {
    // The server picks the questions so attempts cannot be tailored by the browser.
    const res = await this.invoke<{ submission: Record<string, unknown> }>('grade-submission', { action: 'start', assignmentId });
    return toSubmission(res.submission);
  }

  async startPractice(classId: string, skillIds: string[]): Promise<Submission> {
    const me = await this.uid();
    const { data, error } = await this.client
      .from('submissions')
      .insert({ assignment_id: null, class_id: classId, student_id: me, attempt: 1, status: 'in_progress', seed: freshSeed(), items: [], responses: {}, practice_skill_ids: skillIds })
      .select()
      .single();
    fail(error);
    return toSubmission(data);
  }

  async saveProgress(submissionId: string, patch: { responses: Record<number, StoredResponse>; items?: ItemRef[]; integrity?: Integrity }) {
    const row: Record<string, unknown> = { responses: patch.responses };
    if (patch.items) row.items = patch.items;
    if (patch.integrity) row.integrity = patch.integrity;
    const { error } = await this.client.from('submissions').update(row).eq('id', submissionId).eq('status', 'in_progress');
    fail(error);
  }

  async submit(submissionId: string, patch: { responses: Record<number, StoredResponse>; items: ItemRef[]; integrity?: Integrity }) {
    const res = await this.invoke<{ submission: Record<string, unknown> }>('grade-submission', { action: 'submit', submissionId, responses: patch.responses, items: patch.items, integrity: patch.integrity, blurCount: patch.integrity?.blurCount });
    return toSubmission(res.submission);
  }

  async unlockAttempt(submissionId: string) {
    const { error } = await this.client.rpc('unlock_attempt', { p_submission_id: submissionId });
    fail(error);
  }

  async gradeManual(submissionId: string, itemIndex: number, score01: number | null, comment?: string) {
    const res = await this.invoke<{ submission: Record<string, unknown> }>('grade-submission', { action: 'manual', submissionId, itemIndex, score: score01, comment });
    return toSubmission(res.submission);
  }

  async returnSubmission(submissionId: string, feedback: string) {
    const res = await this.invoke<{ submission: Record<string, unknown> }>('grade-submission', { action: 'return', submissionId, feedback });
    return toSubmission(res.submission);
  }

  // ------------------------------------------------------------------ mastery

  async listMastery(filter: { classId?: string; studentId?: string }) {
    let studentIds: string[] | null = null;
    if (filter.classId) studentIds = (await this.listRoster(filter.classId)).map((p) => p.id);
    const page = (from: number, to: number) => {
      let q = this.client.from('skill_mastery').select('*');
      if (filter.studentId) q = q.eq('student_id', filter.studentId);
      else if (studentIds) q = q.in('student_id', studentIds.length ? studentIds : ['00000000-0000-0000-0000-000000000000']);
      return q.order('student_id').order('skill_id').range(from, to);
    };
    return (await allRows(page, 20000)).map(toMastery);
  }

  async listEvents(filter: { classId: string; studentId?: string; sinceDays?: number }) {
    const since = filter.sinceDays ? new Date(Date.now() - filter.sinceDays * 86_400_000).toISOString() : null;
    const page = (from: number, to: number) => {
      let q = this.client.from('skill_events').select('*').eq('class_id', filter.classId);
      if (filter.studentId) q = q.eq('student_id', filter.studentId);
      if (since) q = q.gte('at', since);
      return q.order('at', { ascending: false }).order('id', { ascending: false }).range(from, to);
    };
    return (await allRows(page, 10000)).map(toEvent);
  }

  // ------------------------------------------------------------------ notifications

  async listNotifications() {
    const { data, error } = await this.client.from('notifications').select('*').order('created_at', { ascending: false }).limit(200);
    fail(error);
    return (data ?? []).map(toNotification);
  }

  async markNotificationsRead(ids: string[] | 'all') {
    const me = await this.uid();
    let q = this.client.from('notifications').update({ read_at: new Date().toISOString() }).eq('user_id', me).is('read_at', null);
    if (ids !== 'all') q = q.in('id', ids);
    const { error } = await q;
    fail(error);
  }

  private ensureRealtime(userId: string) {
    if (this.channel) return;
    this.channel = this.client
      .channel(`notifications:${userId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` }, (payload) => {
        const n = toNotification(payload.new as Record<string, unknown>);
        this.notifListeners.forEach((l) => l(n));
      })
      .subscribe();
  }

  subscribeNotifications(cb: (n: AppNotification) => void) {
    this.notifListeners.add(cb);
    return () => this.notifListeners.delete(cb);
  }

  async listAnnouncements(classId: string) {
    const { data, error } = await this.client.from('announcements').select('*').eq('class_id', classId).order('created_at', { ascending: false });
    fail(error);
    return (data ?? []).map(toAnnouncement);
  }

  async postAnnouncement(classId: string, title: string, body: string) {
    const me = await this.uid();
    const { data, error } = await this.client.from('announcements').insert({ class_id: classId, author_id: me, title, body }).select().single();
    fail(error);
    return toAnnouncement(data);
  }

  // ------------------------------------------------------------------ AI

  async aiStatus(): Promise<AiConfigStatus> {
    try {
      return await this.invoke<AiConfigStatus>('ai-agent', { action: 'status' });
    } catch (e) {
      return { live: false, model: null, note: `AI service unavailable: ${(e as Error).message}` };
    }
  }

  async listInsights(classId: string, studentId?: string | null) {
    let q = this.client.from('insights').select('*').eq('class_id', classId);
    if (studentId === null) q = q.is('student_id', null);
    else if (studentId) q = q.eq('student_id', studentId);
    const { data, error } = await q.order('created_at', { ascending: false }).limit(studentId === undefined ? 300 : 30);
    fail(error);
    return (data ?? []).map(toInsight);
  }

  async generateInsight(classId: string, studentId: string | null): Promise<Insight> {
    const res = await this.invoke<{ insight: Record<string, unknown> }>('ai-agent', { action: 'generate', classId, studentId });
    return toInsight(res.insight);
  }

  async draftAssignment(classId: string, request: DraftRequest): Promise<DraftResult> {
    return this.invoke<DraftResult>('ai-agent', { action: 'draft', classId, request });
  }

  async listForum(classId: string): Promise<ForumPost[]> {
    const { data, error } = await this.client.rpc('class_forum', { p_class_id: classId });
    fail(error);
    return ((data ?? []) as Array<Record<string, unknown>>).map((r) => ({
      id: r.id as string,
      classId,
      topicId: (r.topic_id as string | null) ?? null,
      title: (r.title as string | null) ?? null,
      body: r.body as string,
      visibility: r.visibility as ForumVisibility,
      pinned: !!r.pinned,
      answered: !!r.answered,
      hidden: !!r.hidden,
      createdAt: r.created_at as string,
      authorId: (r.author_id as string | null) ?? null,
      authorName: r.author_name as string,
      authorRole: r.author_role === 'teacher' ? 'teacher' : 'student',
      mine: !!r.mine,
    }));
  }

  async forumPost(input: { classId: string; topicId?: string | null; title?: string; body: string; visibility?: ForumVisibility }): Promise<string> {
    const { data, error } = await this.client.rpc('forum_post', { p_class_id: input.classId, p_topic_id: input.topicId ?? null, p_title: input.title ?? null, p_body: input.body, p_visibility: input.visibility ?? 'class' });
    fail(error);
    return data as string;
  }

  async moderateForumPost(id: string, patch: { pinned?: boolean; answered?: boolean; hidden?: boolean }): Promise<void> {
    const { error } = await this.client.rpc('forum_moderate', { p_post_id: id, p_pinned: patch.pinned ?? null, p_answered: patch.answered ?? null, p_hidden: patch.hidden ?? null });
    fail(error);
  }

  async deleteForumPost(id: string): Promise<void> {
    const { error } = await this.client.rpc('forum_delete', { p_post_id: id });
    fail(error);
  }

  async listReportCards(filter: { classId?: string; studentId?: string }): Promise<ReportCard[]> {
    let q = this.client.from('report_cards').select('*');
    if (filter.classId) q = q.eq('class_id', filter.classId);
    if (filter.studentId) q = q.eq('student_id', filter.studentId);
    const { data, error } = await q.order('created_at', { ascending: false }).limit(1000);
    fail(error);
    return (data ?? []).map(toReportCard);
  }

  async getReportCard(id: string): Promise<ReportCard | null> {
    const { data, error } = await this.client.from('report_cards').select('*').eq('id', id).maybeSingle();
    fail(error);
    return data ? toReportCard(data) : null;
  }

  async writeReportCard(classId: string, studentId: string, opts: { period: string; notes?: string }): Promise<ReportCard> {
    const res = await this.invoke<{ reportCard: Record<string, unknown> }>('ai-agent', { action: 'report', classId, studentId, period: opts.period, notes: opts.notes ?? '' });
    return toReportCard(res.reportCard);
  }

  async saveReportCard(id: string, patch: { period: string; content: ReportCardContent }): Promise<ReportCard> {
    const { data, error } = await this.client.from('report_cards').update({ period: patch.period, content: patch.content, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    fail(error);
    return toReportCard(data);
  }

  async shareReportCard(id: string, share: boolean): Promise<ReportCard> {
    const { data, error } = await this.client.rpc('share_report_card', { p_id: id, p_share: share });
    fail(error);
    return toReportCard(data);
  }

  async reportCardLink(id: string, on: boolean): Promise<string | null> {
    const { data, error } = await this.client.rpc('report_card_link', { p_id: id, p_on: on });
    fail(error);
    return (data as string | null) ?? null;
  }

  async sharedReportCard(token: string): Promise<SharedReportCard | null> {
    const { data, error } = await this.client.rpc('shared_report_card', { p_token: token });
    fail(error);
    return (data as SharedReportCard | null) ?? null;
  }

  async deleteReportCard(id: string): Promise<void> {
    const { error } = await this.client.from('report_cards').delete().eq('id', id);
    fail(error);
  }

  async regenerateQuestion(classId: string, request: RegenerateRequest): Promise<RegenerateResult> {
    return this.invoke<RegenerateResult>('ai-agent', { action: 'regenerate', classId, request });
  }

  async suggestMark(submissionId: string, itemIndex: number, pages: string[]): Promise<MarkResult> {
    return this.invoke<MarkResult>('ai-agent', { action: 'mark', submissionId, itemIndex, pages });
  }

  async tutorScript(lessonId: string, chunk: TutorChunk): Promise<TutorReply<{ script: TutorScript }>> {
    try {
      return await this.invoke<TutorReply<{ script: TutorScript }>>('ai-tutor', { action: 'script', lessonId, chunk });
    } catch {
      // The tutor keeps teaching with the offline narration when the function is unreachable.
      return { script: offlineScript(chunk), source: 'offline', model: null };
    }
  }

  async askTutor(question: TutorQuestion): Promise<TutorReply<{ answer: TutorAnswer }>> {
    return this.invoke<TutorReply<{ answer: TutorAnswer }>>('ai-tutor', { action: 'ask', question });
  }

  async setActionStatus(insightId: string, actionId: string, status: ProposedAction['status']) {
    const { error } = await this.client.rpc('set_insight_action_status', { p_insight_id: insightId, p_action_id: actionId, p_status: status });
    fail(error);
  }

  async runScheduledJobs() {
    // Reminders run server-side on a pg_cron schedule.
  }

  // ------------------------------------------------------------------ platform administration
  // Every function below checks is_platform_admin() in the database (or the admin-users
  // Edge Function) and writes to admin_audit_log, so the browser is never trusted.

  async signupConfig(): Promise<PlatformSettings> {
    const { data, error } = await this.client.rpc('signup_config');
    if (error) return { teacherSignup: 'approval' };
    return { teacherSignup: data?.teacherSignup === 'open' ? 'open' : 'approval' };
  }

  async adminOverview(): Promise<AdminOverview> {
    const { data, error } = await this.client.rpc('admin_overview');
    fail(error);
    return data as AdminOverview;
  }

  async adminListUsers(f: AdminUserFilter) {
    const { data, error } = await this.client.rpc('admin_users', {
      p_search: f.search?.trim() || null,
      p_role: f.role || null,
      p_status: f.status || null,
      p_limit: f.limit ?? 50,
      p_offset: f.offset ?? 0,
    });
    fail(error);
    const rows = (data ?? []) as Array<Record<string, unknown>>;
    return { rows: rows.map(toAdminUser), total: Number(rows[0]?.total ?? 0) };
  }

  async adminListClasses(f: { search?: string; limit?: number; offset?: number }) {
    const { data, error } = await this.client.rpc('admin_classes', { p_search: f.search?.trim() || null, p_limit: f.limit ?? 50, p_offset: f.offset ?? 0 });
    fail(error);
    const rows = (data ?? []) as Array<Record<string, unknown>>;
    return { rows: rows.map(toAdminClass), total: Number(rows[0]?.total ?? 0) };
  }

  async adminSetTeacherStatus(userId: string, status: 'approved' | 'rejected' | 'pending') {
    const { error } = await this.client.rpc('admin_set_teacher_status', { p_user: userId, p_status: status });
    fail(error);
  }

  async adminSetPlatformAdmin(userId: string, on: boolean) {
    const { error } = await this.client.rpc('admin_set_platform_admin', { p_user: userId, p_on: on });
    fail(error);
  }

  async adminSetUserDisabled(userId: string, disabled: boolean) {
    await this.invoke('admin-users', { action: disabled ? 'disable' : 'enable', userId });
  }

  async adminResetPassword(userId: string) {
    const res = await this.invoke<{ password: string }>('admin-users', { action: 'reset_password', userId });
    return res.password;
  }

  async adminGetSettings(): Promise<PlatformSettings> {
    const { data, error } = await this.client.rpc('admin_get_settings');
    fail(error);
    return { teacherSignup: data?.teacher_signup === 'open' ? 'open' : 'approval' };
  }

  async adminSetSettings(patch: Partial<PlatformSettings>): Promise<PlatformSettings> {
    if (patch.teacherSignup) {
      const { error } = await this.client.rpc('admin_set_setting', { p_key: 'teacher_signup', p_value: patch.teacherSignup });
      fail(error);
    }
    return this.adminGetSettings();
  }

  async adminAuditLog(limit = 100) {
    const { data, error } = await this.client.rpc('admin_audit', { p_limit: limit });
    fail(error);
    return ((data ?? []) as Array<Record<string, unknown>>).map(toAuditEntry);
  }

  async adminListCourseRequests(status?: CourseRequestStatus) {
    const { data, error } = await this.client.rpc('admin_course_requests', { p_status: status ?? null });
    fail(error);
    return ((data ?? []) as Array<Record<string, unknown>>).map(toCourseRequest);
  }

  async adminUpdateCourseRequest(id: string, patch: { status: CourseRequestStatus; note?: string | null; issueUrl?: string | null }) {
    const { error } = await this.client.rpc('admin_update_course_request', { p_id: id, p_status: patch.status, p_note: patch.note ?? null, p_issue_url: patch.issueUrl ?? null });
    fail(error);
  }

  async adminListLessonEdits(status?: LessonEditStatus) {
    const { data, error } = await this.client.rpc('admin_lesson_edits', { p_status: status ?? null });
    fail(error);
    return ((data ?? []) as Array<Record<string, unknown>>).map(toLessonEdit);
  }

  async adminDecideLessonEdit(id: string, status: 'approved' | 'declined' | 'reverted', note?: string | null) {
    const { error } = await this.client.rpc('admin_decide_lesson_edit', { p_id: id, p_status: status, p_note: note ?? null });
    fail(error);
  }

  async listApprovedLessonEdits(lessonId: string) {
    const { data, error } = await this.client.from('lesson_edits').select('id, lesson_id, section_title, base_hash, markdown, status, created_at, decided_at').eq('lesson_id', lessonId).eq('status', 'approved');
    fail(error);
    return ((data ?? []) as Array<Record<string, unknown>>).map(toLessonEdit);
  }

  async listMyLessonEdits(lessonId: string) {
    const me = await this.uid();
    const { data, error } = await this.client.from('lesson_edits').select('*').eq('lesson_id', lessonId).eq('author_id', me).order('created_at', { ascending: false }).limit(50);
    fail(error);
    return ((data ?? []) as Array<Record<string, unknown>>).map(toLessonEdit);
  }

  async suggestLessonEdit(input: LessonEditInput) {
    const { data, error } = await this.client.rpc('suggest_lesson_edit', { p_lesson_id: input.lessonId, p_section_title: input.sectionTitle, p_base_hash: input.baseHash, p_original: input.original, p_markdown: input.markdown, p_reason: input.reason });
    fail(error);
    return toLessonEdit(data);
  }

  async withdrawLessonEdit(id: string) {
    const { error } = await this.client.rpc('withdraw_lesson_edit', { p_id: id });
    fail(error);
  }

  async listVideoLinks() {
    const { data, error } = await this.client.from('video_links').select('video_id, youtube_id');
    fail(error);
    return Object.fromEntries(((data ?? []) as Array<{ video_id: string; youtube_id: string }>).map((r) => [r.video_id, r.youtube_id]));
  }

  async adminSetVideoLink(videoId: string, youtubeId: string | null) {
    const { error } = await this.client.rpc('admin_set_video_link', { p_video_id: videoId, p_youtube_id: youtubeId });
    fail(error);
  }

  async requestCourse(input: CourseRequestInput) {
    const { data, error } = await this.client.rpc('request_course', { p_kind: input.kind, p_title: input.title, p_grade: input.grade, p_details: input.details });
    fail(error);
    return toCourseRequest(data);
  }

  async listMyCourseRequests() {
    const me = await this.uid();
    const { data, error } = await this.client.from('course_requests').select('*').eq('requester_id', me).order('created_at', { ascending: false }).limit(50);
    fail(error);
    return ((data ?? []) as Array<Record<string, unknown>>).map((r) => toCourseRequest({ ...r, requester_id: undefined }));
  }
}
