/**
 * The data API used by every screen. Two implementations exist:
 *  - DemoApi: everything runs in this browser (localStorage). Great for trying Gradileo.
 *  - SupabaseApi: real multi-user backend (Postgres + Auth + Edge Functions + cron).
 */
import type { Integrity } from '@engine/integrity.ts';
import type { TutorAnswer, TutorChunk, TutorQuestion, TutorScript } from '@engine/ai/tutor.ts';
import type { DraftRequest, DraftResult, RegenerateRequest, RegenerateResult } from '@engine/ai/builder.ts';
import type { MarkResult } from '@engine/ai/marking.ts';
import type { ReportCardContent } from '@engine/ai/reportCard.ts';
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
  CourseRequest,
  CourseRequestInput,
  CourseRequestStatus,
  LessonEdit,
  LessonEditInput,
  LessonEditStatus,
  ClassSettings,
  JoinDecision,
  JoinLinkClass,
  JoinResult,
  MyJoinRequest,
  Insight,
  LessonPrefs,
  LiveAnswer,
  LiveQuestion,
  Presentation,
  ClassQuestion,
  NewStudentCredential,
  Profile,
  ProposedAction,
  ReportCard,
  SharedReportCard,
  Publication,
  Resource,
  Role,
  SkillEvent,
  SkillMastery,
  StoredResponse,
  Submission,
  ItemRef,
} from './types.ts';

export interface SignUpInput {
  fullName: string;
  email: string;
  password: string;
  role: Role;
  joinCode?: string;
}

export type TutorReply<T> = T & { source: 'minimax' | 'offline'; model: string | null };

export interface AiConfigStatus {
  /** Whether live MiniMax analysis is available. */
  live: boolean;
  model: string | null;
  note: string;
}

export interface DataApi {
  readonly mode: 'demo' | 'supabase';

  // Auth
  getCurrentUser(): Promise<Profile | null>;
  onAuthChange(cb: (user: Profile | null) => void): () => void;
  signIn(identifier: string, password: string): Promise<Profile>;
  signUp(input: SignUpInput): Promise<Profile>;
  signOut(): Promise<void>;
  updateProfile(patch: Partial<Pick<Profile, 'fullName' | 'avatarColor'>>): Promise<Profile>;
  changePassword(newPassword: string): Promise<void>;

  // Classes and people
  listMyClasses(): Promise<ClassRoom[]>;
  getClass(id: string): Promise<ClassRoom | null>;
  createClass(input: { name: string; section?: string | null; courseId: string; joinApproval?: boolean }): Promise<ClassRoom>;
  updateClass(id: string, patch: { name?: string; section?: string | null; settings?: Partial<ClassSettings>; archived?: boolean }): Promise<ClassRoom>;
  regenerateJoinCode(id: string): Promise<ClassRoom>;
  joinClass(code: string): Promise<ClassRoom>;
  /** Use a class code: join straight away, or send the teacher a request when the class asks for approval. */
  requestToJoin(code: string, message?: string): Promise<JoinResult>;
  listMyJoinRequests(): Promise<MyJoinRequest[]>;
  listJoinRequests(classId: string): Promise<ClassJoinRequest[]>;
  decideJoinRequest(requestId: string, approve: boolean): Promise<void>;
  /** Several decisions at once (the teacher ticks the names they know). */
  decideJoinRequests(classId: string, decisions: JoinDecision[]): Promise<void>;
  /** The class behind a join link, or null when the link is not valid. Needs no sign-in. */
  classForJoinLink(code: string): Promise<JoinLinkClass | null>;
  /**
   * Joins a class by link with only a first and last name: makes a student account without an
   * email or password, signs this device in to it, and asks the teacher.
   */
  joinWithName(code: string, firstName: string, lastName: string): Promise<{ profile: Profile; result: JoinResult }>;
  /**
   * When the teacher matched this device's request to a student already in the class, this device
   * takes over that student's account. Returns the student's profile, or null when there is nothing to take over.
   */
  claimMatchedAccount(): Promise<Profile | null>;
  /** A student's own self-paced class for a course (made the first time); every lesson is open. */
  startSelfPaced(courseId: string): Promise<ClassRoom>;
  listRoster(classId: string): Promise<Profile[]>;
  getProfile(id: string): Promise<Profile | null>;
  removeStudent(classId: string, studentId: string): Promise<void>;
  createStudentAccounts(classId: string, names: string[]): Promise<NewStudentCredential[]>;

  // Curriculum
  listPublications(classId: string): Promise<Publication[]>;
  setPublished(classId: string, lessonId: string, published: boolean): Promise<void>;
  listResources(classId: string): Promise<Resource[]>;
  addResource(input: Omit<Resource, 'id' | 'createdAt'>): Promise<Resource>;
  deleteResource(id: string): Promise<void>;

  // Presenting: hidden blocks and saved whiteboards
  getLessonPrefs(classId: string, lessonId: string): Promise<LessonPrefs>;
  setHiddenBlocks(classId: string, lessonId: string, hidden: string[]): Promise<LessonPrefs>;
  /** Teachers get every board of the class; students only the ones shared with them. */
  listBoards(classId: string, lessonId: string): Promise<Board[]>;
  saveBoard(input: BoardInput): Promise<Board>;
  setBoardShared(id: string, shared: boolean): Promise<void>;
  deleteBoard(id: string): Promise<void>;

  // Live class questions
  /** Sends a question to the class; any question still open in the class is closed first. */
  openLiveQuestion(input: { classId: string; lessonId: string | null; skillId: string; difficulty: 1 | 2 | 3; seed: number }): Promise<LiveQuestion>;
  closeLiveQuestion(id: string): Promise<void>;
  /** The class's most recent question from the last few hours, open or closed. */
  currentLiveQuestion(classId: string): Promise<LiveQuestion | null>;
  /** Teachers get every answer; students only their own. */
  listLiveAnswers(questionId: string): Promise<LiveAnswer[]>;
  /** A student's answer; it can be changed until the question closes. */
  submitLiveAnswer(questionId: string, responses: string[]): Promise<void>;
  /** Calls back when a live question or answer in the class changes. */
  subscribeLive(classId: string, cb: () => void): () => void;

  // Students' questions during a presentation
  /** Starts presenting a lesson to the class, or keeps it going: present mode calls it every minute. */
  startPresenting(classId: string, lessonId: string): Promise<Presentation>;
  stopPresenting(classId: string): Promise<void>;
  /** The lesson the teacher is presenting to the class now, if any. */
  currentPresentation(classId: string): Promise<Presentation | null>;
  /** A student's question to the teacher while they present: at most five in ten minutes. */
  askQuestion(input: { classId: string; body: string; anonymous: boolean }): Promise<ClassQuestion>;
  /** Newest first. Teachers get every question in the class; students only their own. */
  listClassQuestions(classId: string, filter?: { lessonId?: string; presentedAt?: string }): Promise<ClassQuestion[]>;
  setQuestionStatus(id: string, status: 'answered' | 'skipped'): Promise<void>;
  deleteQuestion(id: string): Promise<void>;
  /** Calls back when the class's presentation or its questions change. */
  subscribeQuestions(classId: string, cb: () => void): () => void;

  // Assignments
  listAssignments(classId: string): Promise<Assignment[]>;
  getAssignment(id: string): Promise<Assignment | null>;
  saveAssignment(input: Partial<Assignment> & { classId: string }): Promise<Assignment>;
  publishAssignment(id: string): Promise<Assignment>;
  deleteAssignment(id: string): Promise<void>;
  remindNow(assignmentId: string): Promise<number>;

  // Submissions
  listSubmissions(filter: { classId?: string; assignmentId?: string; studentId?: string }): Promise<Submission[]>;
  getSubmission(id: string): Promise<Submission | null>;
  startSubmission(assignmentId: string): Promise<Submission>;
  startPractice(classId: string, skillIds: string[]): Promise<Submission>;
  saveProgress(submissionId: string, patch: { responses: Record<number, StoredResponse>; items?: ItemRef[]; integrity?: Integrity }): Promise<void>;
  submit(submissionId: string, patch: { responses: Record<number, StoredResponse>; items: ItemRef[]; integrity?: Integrity }): Promise<Submission>;
  /** Teacher: unlock an attempt that exam mode locked; the student may leave it as many times again. */
  unlockAttempt(submissionId: string): Promise<void>;
  gradeManual(submissionId: string, itemIndex: number, score01: number, comment?: string): Promise<Submission>;
  returnSubmission(submissionId: string, feedback: string): Promise<Submission>;

  // Mastery & analytics
  listMastery(filter: { classId?: string; studentId?: string }): Promise<SkillMastery[]>;
  listEvents(filter: { classId: string; studentId?: string; sinceDays?: number }): Promise<SkillEvent[]>;

  // Notifications & announcements
  listNotifications(): Promise<AppNotification[]>;
  markNotificationsRead(ids: string[] | 'all'): Promise<void>;
  subscribeNotifications(cb: (n: AppNotification) => void): () => void;
  listAnnouncements(classId: string): Promise<Announcement[]>;
  postAnnouncement(classId: string, title: string, body: string): Promise<Announcement>;

  // AI teaching assistant
  aiStatus(): Promise<AiConfigStatus>;
  listInsights(classId: string, studentId?: string | null): Promise<Insight[]>;
  generateInsight(classId: string, studentId: string | null): Promise<Insight>;
  setActionStatus(insightId: string, actionId: string, status: ProposedAction['status']): Promise<void>;
  /** "Draft with AI" in the assignment builder: a draft for the teacher to review (offline if the AI is off). */
  draftAssignment(classId: string, request: DraftRequest): Promise<DraftResult>;
  /** "Regenerate" on one question in the builder: a new question in the same format and skill. */
  regenerateQuestion(classId: string, request: RegenerateRequest): Promise<RegenerateResult>;
  /**
   * An AI-suggested mark for a written response, for the class's teacher. `pages` are the canvas
   * pages as images (the teacher's browser draws them); no name is sent. Nothing is saved.
   */
  suggestMark(submissionId: string, itemIndex: number, pages: string[]): Promise<MarkResult>;

  // Report cards: the AI drafts one for a student, the teacher edits and shares it
  /** Teachers get their class's cards; a student gets their own shared ones. Newest first. */
  listReportCards(filter: { classId?: string; studentId?: string }): Promise<ReportCard[]>;
  getReportCard(id: string): Promise<ReportCard | null>;
  /** A new draft card for a student, written by the AI (or offline), for the class's teacher. */
  writeReportCard(classId: string, studentId: string, opts: { period: string; notes?: string }): Promise<ReportCard>;
  saveReportCard(id: string, patch: { period: string; content: ReportCardContent }): Promise<ReportCard>;
  /** Shares a card with its student (who is notified), or takes it back to a draft and ends its link. */
  shareReportCard(id: string, share: boolean): Promise<ReportCard>;
  /** Turns a shared card's private link for parents on (its token) or off (null). */
  reportCardLink(id: string, on: boolean): Promise<string | null>;
  /** A shared card by its private link; works without signing in. */
  sharedReportCard(token: string): Promise<SharedReportCard | null>;
  deleteReportCard(id: string): Promise<void>;

  // AI tutor (any signed-in student)
  /** What the tutor says at each step of a run of a lesson's slides (offline narration if the AI is off). */
  tutorScript(lessonId: string, chunk: TutorChunk): Promise<TutorReply<{ script: TutorScript }>>;
  /** The tutor's answer to a student's question about a slide. */
  askTutor(question: TutorQuestion): Promise<TutorReply<{ answer: TutorAnswer }>>;

  /** Demo only: run the scheduler (deadline reminders). Supabase runs this on a cron. */
  runScheduledJobs(): Promise<void>;

  // Platform administration (platform administrators only; every change is audited)
  signupConfig(): Promise<PlatformSettings>;
  adminOverview(): Promise<AdminOverview>;
  adminListUsers(filter: AdminUserFilter): Promise<{ rows: AdminUserRow[]; total: number }>;
  adminListClasses(filter: { search?: string; limit?: number; offset?: number }): Promise<{ rows: AdminClassRow[]; total: number }>;
  adminSetTeacherStatus(userId: string, status: 'approved' | 'rejected' | 'pending'): Promise<void>;
  adminSetPlatformAdmin(userId: string, on: boolean): Promise<void>;
  adminSetUserDisabled(userId: string, disabled: boolean): Promise<void>;
  /** Sets a new temporary password and returns it (shown once). */
  adminResetPassword(userId: string): Promise<string>;
  adminGetSettings(): Promise<PlatformSettings>;
  adminSetSettings(patch: Partial<PlatformSettings>): Promise<PlatformSettings>;
  adminAuditLog(limit?: number): Promise<AdminAuditEntry[]>;
  adminListCourseRequests(status?: CourseRequestStatus): Promise<CourseRequest[]>;
  adminUpdateCourseRequest(id: string, patch: { status: CourseRequestStatus; note?: string | null; issueUrl?: string | null }): Promise<void>;

  adminListLessonEdits(status?: LessonEditStatus): Promise<LessonEdit[]>;
  adminDecideLessonEdit(id: string, status: 'approved' | 'declined' | 'reverted', note?: string | null): Promise<void>;

  // Lesson edits: approved ones apply to every class; teachers suggest new ones
  listApprovedLessonEdits(lessonId: string): Promise<LessonEdit[]>;
  listMyLessonEdits(lessonId: string): Promise<LessonEdit[]>;
  suggestLessonEdit(input: LessonEditInput): Promise<LessonEdit>;
  withdrawLessonEdit(id: string): Promise<void>;

  // Course requests (any signed-in user)
  requestCourse(input: CourseRequestInput): Promise<CourseRequest>;
  listMyCourseRequests(): Promise<CourseRequest[]>;

  // Explainer videos: the YouTube id an administrator recorded for each video (by script id)
  listVideoLinks(): Promise<Record<string, string>>;
  /** Administrators: record a video's YouTube id, or remove it with null. */
  adminSetVideoLink(videoId: string, youtubeId: string | null): Promise<void>;
}
