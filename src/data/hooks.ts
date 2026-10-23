/** React Query hooks over the data API. Query keys are centralised in `qk`. */
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { api } from './index.ts';
import type { Integrity } from '@engine/integrity.ts';
import type { DraftRequest, RegenerateRequest } from '@engine/ai/builder.ts';
import type { AdminUserFilter, Assignment, BoardInput, ClassSettings, CourseRequestInput, CourseRequestStatus, LessonEditInput, LessonEditStatus, ItemRef, JoinDecision, LessonPrefs, PlatformSettings, ProposedAction, Resource, StoredResponse } from './types.ts';

export const qk = {
  me: ['me'] as const,
  classes: ['classes'] as const,
  class: (id: string) => ['class', id] as const,
  roster: (classId: string) => ['roster', classId] as const,
  profile: (id: string) => ['profile', id] as const,
  publications: (classId: string) => ['publications', classId] as const,
  resources: (classId: string) => ['resources', classId] as const,
  lessonPrefs: (classId: string, lessonId: string) => ['lessonPrefs', classId, lessonId] as const,
  boards: (classId: string, lessonId: string) => ['boards', classId, lessonId] as const,
  live: (classId: string) => ['live', classId] as const,
  presentation: (classId: string) => ['presentation', classId] as const,
  classQuestions: (classId: string, f: { lessonId?: string; presentedAt?: string } = {}) => ['classQuestions', classId, f.lessonId ?? '', f.presentedAt ?? ''] as const,
  joinRequests: (classId: string) => ['joinRequests', classId] as const,
  myJoinRequests: ['myJoinRequests'] as const,
  myCourseRequests: ['myCourseRequests'] as const,
  lessonEdits: (lessonId: string) => ['lessonEdits', lessonId] as const,
  myLessonEdits: (lessonId: string) => ['myLessonEdits', lessonId] as const,
  adminLessonEdits: (status: string) => ['admin', 'lessonEdits', status] as const,
  adminCourseRequests: (status: string) => ['admin', 'courseRequests', status] as const,
  videoLinks: ['videoLinks'] as const,
  liveAnswers: (questionId: string) => ['liveAnswers', questionId] as const,
  assignments: (classId: string) => ['assignments', classId] as const,
  assignment: (id: string) => ['assignment', id] as const,
  submissions: (f: { classId?: string; assignmentId?: string; studentId?: string }) => ['submissions', f.classId ?? '', f.assignmentId ?? '', f.studentId ?? ''] as const,
  submission: (id: string) => ['submission', id] as const,
  mastery: (f: { classId?: string; studentId?: string }) => ['mastery', f.classId ?? '', f.studentId ?? ''] as const,
  events: (classId: string, studentId?: string, sinceDays?: number) => ['events', classId, studentId ?? '', sinceDays ?? 0] as const,
  notifications: ['notifications'] as const,
  announcements: (classId: string) => ['announcements', classId] as const,
  insights: (classId: string, studentId?: string | null) => ['insights', classId, studentId === undefined ? '*' : studentId ?? 'class'] as const,
  aiStatus: ['aiStatus'] as const,
  signupConfig: ['signupConfig'] as const,
  admin: ['admin'] as const,
  adminOverview: ['admin', 'overview'] as const,
  adminUsers: (f: AdminUserFilter) => ['admin', 'users', f.search ?? '', f.role ?? '', f.status ?? '', f.limit ?? 50, f.offset ?? 0] as const,
  adminClasses: (f: { search?: string; offset?: number }) => ['admin', 'classes', f.search ?? '', f.offset ?? 0] as const,
  adminSettings: ['admin', 'settings'] as const,
  adminAudit: (limit: number) => ['admin', 'audit', limit] as const,
};

export function invalidateAll(qc: QueryClient) {
  return qc.invalidateQueries();
}

export const useClasses = () => useQuery({ queryKey: qk.classes, queryFn: () => api().listMyClasses() });
export const useClass = (id: string | undefined) => useQuery({ queryKey: qk.class(id ?? ''), queryFn: () => api().getClass(id!), enabled: !!id });
export const useRoster = (classId: string | undefined) => useQuery({ queryKey: qk.roster(classId ?? ''), queryFn: () => api().listRoster(classId!), enabled: !!classId });
export const useProfile = (id: string | undefined) => useQuery({ queryKey: qk.profile(id ?? ''), queryFn: () => api().getProfile(id!), enabled: !!id });
export const usePublications = (classId: string | undefined) => useQuery({ queryKey: qk.publications(classId ?? ''), queryFn: () => api().listPublications(classId!), enabled: !!classId });
export const useResources = (classId: string | undefined) => useQuery({ queryKey: qk.resources(classId ?? ''), queryFn: () => api().listResources(classId!), enabled: !!classId });
export const useAssignments = (classId: string | undefined) => useQuery({ queryKey: qk.assignments(classId ?? ''), queryFn: () => api().listAssignments(classId!), enabled: !!classId });
export const useAssignment = (id: string | undefined) => useQuery({ queryKey: qk.assignment(id ?? ''), queryFn: () => api().getAssignment(id!), enabled: !!id });
export const useSubmissions = (f: { classId?: string; assignmentId?: string; studentId?: string }, enabled = true) =>
  useQuery({ queryKey: qk.submissions(f), queryFn: () => api().listSubmissions(f), enabled: enabled && !!(f.classId || f.assignmentId || f.studentId) });
export const useSubmission = (id: string | undefined) => useQuery({ queryKey: qk.submission(id ?? ''), queryFn: () => api().getSubmission(id!), enabled: !!id });
export const useMastery = (f: { classId?: string; studentId?: string }, enabled = true) => useQuery({ queryKey: qk.mastery(f), queryFn: () => api().listMastery(f), enabled });
export const useEvents = (classId: string | undefined, studentId?: string, sinceDays?: number) =>
  useQuery({ queryKey: qk.events(classId ?? '', studentId, sinceDays), queryFn: () => api().listEvents({ classId: classId!, studentId, sinceDays }), enabled: !!classId });
export const useNotifications = (enabled = true) => useQuery({ queryKey: qk.notifications, queryFn: () => api().listNotifications(), enabled, refetchInterval: 60_000 });
export const useAnnouncements = (classId: string | undefined) => useQuery({ queryKey: qk.announcements(classId ?? ''), queryFn: () => api().listAnnouncements(classId!), enabled: !!classId });
export const useInsights = (classId: string | undefined, studentId?: string | null) =>
  useQuery({ queryKey: qk.insights(classId ?? '', studentId), queryFn: () => api().listInsights(classId!, studentId), enabled: !!classId });
export const useAiStatus = () => useQuery({ queryKey: qk.aiStatus, queryFn: () => api().aiStatus(), staleTime: 5 * 60_000 });

// ---------------------------------------------------------------- mutations

export function useCreateClass() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (v: { name: string; section?: string | null; courseId: string; joinApproval?: boolean }) => api().createClass(v), onSuccess: () => qc.invalidateQueries({ queryKey: qk.classes }) });
}

/** A student starts studying a course on their own (a self-paced section with the AI as tutor). */
export function useStartSelfPaced() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => api().startSelfPaced(courseId),
    onSuccess: async (c) => {
      await qc.invalidateQueries({ queryKey: qk.classes });
      await qc.invalidateQueries({ queryKey: qk.publications(c.id) });
    },
  });
}

/** A student's requests to join teachers' classes. */
export const useMyJoinRequests = (enabled = true, refetchInterval: number | false = false) =>
  useQuery({ queryKey: qk.myJoinRequests, queryFn: () => api().listMyJoinRequests(), enabled, refetchInterval });

/** The class behind a join link (no sign-in needed). */
export const useClassForJoin = (code: string | undefined) =>
  useQuery({ queryKey: ['join-link', code ?? ''], queryFn: () => api().classForJoinLink(code!), enabled: !!code, retry: false, staleTime: 60_000 });

/** Joins a class by link with only a name; this device is signed in to the new account. */
export function useJoinWithName() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { code: string; firstName: string; lastName: string }) => api().joinWithName(v.code, v.firstName, v.lastName),
    onSuccess: () => qc.invalidateQueries(),
  });
}

/** The teacher's decisions on several join requests at once. */
export function useDecideJoinRequests(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (decisions: JoinDecision[]) => api().decideJoinRequests(classId, decisions),
    onSettled: async () => {
      await qc.invalidateQueries({ queryKey: qk.joinRequests(classId) });
      await qc.invalidateQueries({ queryKey: qk.roster(classId) });
    },
  });
}

/** A class's pending join requests (teacher). */
export const useJoinRequests = (classId: string | undefined) => useQuery({ queryKey: qk.joinRequests(classId ?? ''), queryFn: () => api().listJoinRequests(classId!), enabled: !!classId });

export function useRequestToJoin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { code: string; message?: string }) => api().requestToJoin(v.code, v.message),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: qk.classes });
      await qc.invalidateQueries({ queryKey: qk.myJoinRequests });
    },
  });
}

export function useDecideJoinRequest(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { requestId: string; approve: boolean }) => api().decideJoinRequest(v.requestId, v.approve),
    onSettled: async () => {
      await qc.invalidateQueries({ queryKey: qk.joinRequests(classId) });
      await qc.invalidateQueries({ queryKey: qk.roster(classId) });
    },
  });
}

export function useUpdateClass(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: { name?: string; section?: string | null; settings?: Partial<ClassSettings>; archived?: boolean }) => api().updateClass(classId, patch),
    onSuccess: (c) => {
      qc.setQueryData(qk.class(classId), c);
      qc.invalidateQueries({ queryKey: qk.classes });
    },
  });
}

export function useSetPublished(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { lessonId: string; published: boolean }) => api().setPublished(classId, v.lessonId, v.published),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.publications(classId) }),
  });
}

export function useAddResource(classId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (r: Omit<Resource, 'id' | 'createdAt'>) => api().addResource(r), onSuccess: () => qc.invalidateQueries({ queryKey: qk.resources(classId) }) });
}

export function useDeleteResource(classId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => api().deleteResource(id), onSuccess: () => qc.invalidateQueries({ queryKey: qk.resources(classId) }) });
}

export const useLessonPrefs = (classId: string | undefined, lessonId: string | undefined) =>
  useQuery({ queryKey: qk.lessonPrefs(classId ?? '', lessonId ?? ''), queryFn: () => api().getLessonPrefs(classId!, lessonId!), enabled: !!classId && !!lessonId });

/** Hides or shows lesson blocks on the slides; the change shows at once and is saved behind it. */
export function useSetHiddenBlocks(classId: string, lessonId: string) {
  const qc = useQueryClient();
  const key = qk.lessonPrefs(classId, lessonId);
  return useMutation({
    mutationFn: (hidden: string[]) => api().setHiddenBlocks(classId, lessonId, hidden),
    onMutate: async (hidden) => {
      await qc.cancelQueries({ queryKey: key });
      const before = qc.getQueryData<LessonPrefs>(key);
      qc.setQueryData<LessonPrefs>(key, { classId, lessonId, hidden });
      return { before };
    },
    onError: (_e, _v, ctx) => qc.setQueryData(key, ctx?.before),
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });
}

export const useBoards = (classId: string | undefined, lessonId: string | undefined) =>
  useQuery({ queryKey: qk.boards(classId ?? '', lessonId ?? ''), queryFn: () => api().listBoards(classId!, lessonId!), enabled: !!classId && !!lessonId });

export function useSaveBoard(classId: string, lessonId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (b: Omit<BoardInput, 'classId' | 'lessonId'>) => api().saveBoard({ ...b, classId, lessonId }), onSuccess: () => qc.invalidateQueries({ queryKey: qk.boards(classId, lessonId) }) });
}

export function useSetBoardShared(classId: string, lessonId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (v: { id: string; shared: boolean }) => api().setBoardShared(v.id, v.shared), onSuccess: () => qc.invalidateQueries({ queryKey: qk.boards(classId, lessonId) }) });
}

export function useDeleteBoard(classId: string, lessonId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => api().deleteBoard(id), onSuccess: () => qc.invalidateQueries({ queryKey: qk.boards(classId, lessonId) }) });
}

// ------------------------------------------------------------------ live class questions

/**
 * The class's current live question, kept up to date in real time (with a slow poll in case the
 * real-time connection drops).
 */
export function useLiveQuestion(classId: string | undefined) {
  const qc = useQueryClient();
  useEffect(() => {
    if (!classId) return;
    return api().subscribeLive(classId, () => {
      void qc.invalidateQueries({ queryKey: qk.live(classId) });
      void qc.invalidateQueries({ queryKey: ['liveAnswers'] });
    });
  }, [classId, qc]);
  return useQuery({ queryKey: qk.live(classId ?? ''), queryFn: () => api().currentLiveQuestion(classId!), enabled: !!classId, refetchInterval: 15_000 });
}

export const useLiveAnswers = (questionId: string | undefined, poll = false) =>
  useQuery({ queryKey: qk.liveAnswers(questionId ?? ''), queryFn: () => api().listLiveAnswers(questionId!), enabled: !!questionId, refetchInterval: poll ? 5_000 : false });

export function useOpenLiveQuestion(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { lessonId: string | null; skillId: string; difficulty: 1 | 2 | 3; seed: number }) => api().openLiveQuestion({ classId, ...v }),
    onSuccess: (q) => {
      qc.setQueryData(qk.live(classId), q);
      void qc.invalidateQueries({ queryKey: qk.live(classId) });
    },
  });
}

export function useCloseLiveQuestion(classId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => api().closeLiveQuestion(id), onSuccess: () => qc.invalidateQueries({ queryKey: qk.live(classId) }) });
}

export function useSubmitLiveAnswer(classId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { questionId: string; responses: string[] }) => api().submitLiveAnswer(v.questionId, v.responses),
    onSuccess: (_r, v) => {
      void qc.invalidateQueries({ queryKey: qk.liveAnswers(v.questionId) });
      if (classId) void qc.invalidateQueries({ queryKey: qk.live(classId) });
    },
  });
}

// ------------------------------------------------------------------ students' questions during a presentation

/** Keeps the class's presentation and its questions up to date in real time. */
export function useQuestionsFeed(classId: string | undefined) {
  const qc = useQueryClient();
  useEffect(() => {
    if (!classId) return;
    return api().subscribeQuestions(classId, () => {
      void qc.invalidateQueries({ queryKey: qk.presentation(classId) });
      void qc.invalidateQueries({ queryKey: ['classQuestions', classId] });
    });
  }, [classId, qc]);
}

/** What the teacher is presenting to the class now (with a slow poll in case the real-time connection drops). */
export function usePresentation(classId: string | undefined) {
  useQuestionsFeed(classId);
  return useQuery({ queryKey: qk.presentation(classId ?? ''), queryFn: () => api().currentPresentation(classId!), enabled: !!classId, refetchInterval: 60_000 });
}

/** Teachers get every question in the class; students only their own. `poll` refetches while the page is open. */
export const useClassQuestions = (classId: string | undefined, filter: { lessonId?: string; presentedAt?: string } = {}, poll = false) =>
  useQuery({ queryKey: qk.classQuestions(classId ?? '', filter), queryFn: () => api().listClassQuestions(classId!, filter), enabled: !!classId, refetchInterval: poll ? 20_000 : false });

export function useAskQuestion(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { body: string; anonymous: boolean }) => api().askQuestion({ classId, ...v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['classQuestions', classId] }),
  });
}

export function useSetQuestionStatus(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { id: string; status: 'answered' | 'skipped' }) => api().setQuestionStatus(v.id, v.status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['classQuestions', classId] }),
  });
}

export function useDeleteQuestion(classId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => api().deleteQuestion(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['classQuestions', classId] }) });
}

export function useSaveAssignment(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (a: Partial<Assignment> & { classId: string }) => api().saveAssignment(a),
    onSuccess: (a) => {
      qc.setQueryData(qk.assignment(a.id), a);
      qc.invalidateQueries({ queryKey: qk.assignments(classId) });
    },
  });
}

export function usePublishAssignment(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api().publishAssignment(id),
    onSuccess: (a) => {
      qc.setQueryData(qk.assignment(a.id), a);
      qc.invalidateQueries({ queryKey: qk.assignments(classId) });
    },
  });
}

export function useDeleteAssignment(classId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => api().deleteAssignment(id), onSuccess: () => qc.invalidateQueries({ queryKey: qk.assignments(classId) }) });
}

/** Teacher: unlock an attempt that exam mode locked. */
export function useUnlockAttempt() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (submissionId: string) => api().unlockAttempt(submissionId), onSuccess: () => qc.invalidateQueries({ queryKey: ['submissions'] }) });
}

export function useSubmit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { submissionId: string; responses: Record<number, StoredResponse>; items: ItemRef[]; integrity?: Integrity }) =>
      api().submit(v.submissionId, { responses: v.responses, items: v.items, integrity: v.integrity }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['submissions'] });
      qc.invalidateQueries({ queryKey: ['mastery'] });
      qc.invalidateQueries({ queryKey: ['events'] });
      qc.invalidateQueries({ queryKey: ['assignments'] });
    },
  });
}

export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (ids: string[] | 'all') => api().markNotificationsRead(ids), onSuccess: () => qc.invalidateQueries({ queryKey: qk.notifications }) });
}

export function useGenerateInsight(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (studentId: string | null) => api().generateInsight(classId, studentId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['insights', classId] }),
  });
}

export function useDraftAssignment(classId: string) {
  return useMutation({ mutationFn: (request: DraftRequest) => api().draftAssignment(classId, request) });
}

/** The class's forum, refreshed every half minute while it is open. */
export const useForum = (classId: string | undefined) => useQuery({ queryKey: ['forum', classId], queryFn: () => api().listForum(classId!), enabled: !!classId, refetchInterval: 30_000 });

export const useReportCards = (f: { classId?: string; studentId?: string }, enabled = true) =>
  useQuery({ queryKey: ['reportCards', f], queryFn: () => api().listReportCards(f), enabled: enabled && !!(f.classId || f.studentId) });
export const useReportCard = (id: string | undefined) => useQuery({ queryKey: ['reportCard', id], queryFn: () => api().getReportCard(id!), enabled: !!id });
export const useSharedReportCard = (token: string | undefined) => useQuery({ queryKey: ['sharedReportCard', token], queryFn: () => api().sharedReportCard(token!), enabled: !!token, retry: false });

export function useRegenerateQuestion(classId: string) {
  return useMutation({ mutationFn: (request: RegenerateRequest) => api().regenerateQuestion(classId, request) });
}

export function useSuggestMark(submissionId: string, itemIndex: number) {
  return useMutation({ mutationFn: (pages: string[]) => api().suggestMark(submissionId, itemIndex, pages) });
}

export function useSetActionStatus(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { insightId: string; actionId: string; status: ProposedAction['status'] }) => api().setActionStatus(v.insightId, v.actionId, v.status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['insights', classId] }),
  });
}

// ---------------------------------------------------------------- platform administration

export const useSignupConfig = () => useQuery({ queryKey: qk.signupConfig, queryFn: () => api().signupConfig(), staleTime: 5 * 60_000 });
export const useAdminOverview = () => useQuery({ queryKey: qk.adminOverview, queryFn: () => api().adminOverview() });
export const useAdminUsers = (f: AdminUserFilter) => useQuery({ queryKey: qk.adminUsers(f), queryFn: () => api().adminListUsers(f), placeholderData: (prev) => prev });
export const useAdminClasses = (f: { search?: string; offset?: number }) =>
  useQuery({ queryKey: qk.adminClasses(f), queryFn: () => api().adminListClasses({ ...f, limit: 50 }), placeholderData: (prev) => prev });
export const useAdminSettings = () => useQuery({ queryKey: qk.adminSettings, queryFn: () => api().adminGetSettings() });
export const useAdminAudit = (limit = 100) => useQuery({ queryKey: qk.adminAudit(limit), queryFn: () => api().adminAuditLog(limit) });

/** Any admin change refreshes every admin view (counts, lists and the audit log move together). */
function useAdminMutation<V, R>(fn: (v: V) => Promise<R>) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: fn, onSuccess: () => qc.invalidateQueries({ queryKey: qk.admin }) });
}

export const useSetTeacherStatus = () => useAdminMutation((v: { userId: string; status: 'approved' | 'rejected' | 'pending' }) => api().adminSetTeacherStatus(v.userId, v.status));
export const useSetPlatformAdmin = () => useAdminMutation((v: { userId: string; on: boolean }) => api().adminSetPlatformAdmin(v.userId, v.on));
export const useSetUserDisabled = () => useAdminMutation((v: { userId: string; disabled: boolean }) => api().adminSetUserDisabled(v.userId, v.disabled));
export const useResetPassword = () => useAdminMutation((userId: string) => api().adminResetPassword(userId));
export const useAdminCourseRequests = (status?: CourseRequestStatus) => useQuery({ queryKey: qk.adminCourseRequests(status ?? 'all'), queryFn: () => api().adminListCourseRequests(status) });
export const useAdminUpdateCourseRequest = () =>
  useAdminMutation((v: { id: string; status: CourseRequestStatus; note?: string | null; issueUrl?: string | null }) => api().adminUpdateCourseRequest(v.id, v));

export const useAdminLessonEdits = (status?: LessonEditStatus) => useQuery({ queryKey: qk.adminLessonEdits(status ?? 'all'), queryFn: () => api().adminListLessonEdits(status) });
export function useAdminDecideLessonEdit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { id: string; status: 'approved' | 'declined' | 'reverted'; note?: string | null }) => api().adminDecideLessonEdit(v.id, v.status, v.note),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: qk.admin });
      void qc.invalidateQueries({ queryKey: ['lessonEdits'] });
    },
  });
}

/** Explainer videos' YouTube ids, by video id. */
export const useVideoLinks = () => useQuery({ queryKey: qk.videoLinks, queryFn: () => api().listVideoLinks(), staleTime: 5 * 60_000, retry: false });
export function useAdminSetVideoLink() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { videoId: string; youtubeId: string | null }) => api().adminSetVideoLink(v.videoId, v.youtubeId),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: qk.videoLinks });
      void qc.invalidateQueries({ queryKey: qk.admin });
    },
  });
}

/** Approved edits for a lesson: part of the lesson every class sees. */
export const useApprovedLessonEdits = (lessonId: string | undefined) =>
  useQuery({ queryKey: qk.lessonEdits(lessonId ?? ''), queryFn: () => api().listApprovedLessonEdits(lessonId!), enabled: !!lessonId, staleTime: 60_000, retry: false });
export const useMyLessonEdits = (lessonId: string) => useQuery({ queryKey: qk.myLessonEdits(lessonId), queryFn: () => api().listMyLessonEdits(lessonId) });
export function useSuggestLessonEdit(lessonId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (input: LessonEditInput) => api().suggestLessonEdit(input), onSuccess: () => qc.invalidateQueries({ queryKey: qk.myLessonEdits(lessonId) }) });
}
export function useWithdrawLessonEdit(lessonId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => api().withdrawLessonEdit(id), onSuccess: () => qc.invalidateQueries({ queryKey: qk.myLessonEdits(lessonId) }) });
}

export const useMyCourseRequests = () => useQuery({ queryKey: qk.myCourseRequests, queryFn: () => api().listMyCourseRequests() });
export function useRequestCourse() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (input: CourseRequestInput) => api().requestCourse(input), onSuccess: () => qc.invalidateQueries({ queryKey: qk.myCourseRequests }) });
}

export function useSaveAdminSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<PlatformSettings>) => api().adminSetSettings(patch),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: qk.admin });
      void qc.invalidateQueries({ queryKey: qk.signupConfig });
    },
  });
}
