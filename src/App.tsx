import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './features/auth/AuthProvider.tsx';
import { RequireAdmin, RequireRole } from './features/auth/RequireRole.tsx';
import { AppShell } from './components/layout/AppShell.tsx';
import { PageSpinner, ToastProvider } from './components/ui/index.ts';
import { ErrorBoundary } from './components/layout/ErrorBoundary.tsx';

const Landing = lazy(() => import('./features/landing/LandingPage.tsx'));
const Login = lazy(() => import('./features/auth/LoginPage.tsx'));
const Signup = lazy(() => import('./features/auth/SignupPage.tsx'));
const JoinWithName = lazy(() => import('./features/auth/JoinWithNamePage.tsx'));
const Privacy = lazy(() => import('./features/legal/PrivacyPage.tsx'));
const Terms = lazy(() => import('./features/legal/TermsPage.tsx'));
const NotificationsPage = lazy(() => import('./features/notifications/NotificationsPage.tsx'));
const SettingsPage = lazy(() => import('./features/settings/SettingsPage.tsx'));

const TeacherHome = lazy(() => import('./features/teacher/TeacherHome.tsx'));
const NewClass = lazy(() => import('./features/teacher/NewClassPage.tsx'));
const ClassOverview = lazy(() => import('./features/teacher/ClassOverview.tsx'));
const Curriculum = lazy(() => import('./features/teacher/CurriculumPage.tsx'));
const TeacherLesson = lazy(() => import('./features/teacher/TeacherLessonPage.tsx'));
const Assignments = lazy(() => import('./features/teacher/AssignmentsPage.tsx'));
const AssignmentBuilder = lazy(() => import('./features/teacher/AssignmentBuilder.tsx'));
const AssignmentDetail = lazy(() => import('./features/teacher/AssignmentDetail.tsx'));
const SubmissionReview = lazy(() => import('./features/teacher/SubmissionReview.tsx'));
const Students = lazy(() => import('./features/teacher/StudentsPage.tsx'));
const StudentProfile = lazy(() => import('./features/teacher/StudentProfile.tsx'));
const Gradebook = lazy(() => import('./features/teacher/GradebookPage.tsx'));
const MasteryMap = lazy(() => import('./features/teacher/MasteryMapPage.tsx'));
const Insights = lazy(() => import('./features/teacher/InsightsPage.tsx'));
const ClassSettings = lazy(() => import('./features/teacher/ClassSettingsPage.tsx'));
const PresentMode = lazy(() => import('./features/lessons/PresentMode.tsx'));

const StudentHome = lazy(() => import('./features/student/StudentHome.tsx'));
const JoinClass = lazy(() => import('./features/student/JoinClassPage.tsx'));
const Welcome = lazy(() => import('./features/student/WelcomePage.tsx'));
const Learn = lazy(() => import('./features/student/LearnPage.tsx'));
const StudentLesson = lazy(() => import('./features/student/StudentLessonPage.tsx'));
const Work = lazy(() => import('./features/student/WorkPage.tsx'));
const AssignmentIntro = lazy(() => import('./features/student/AssignmentIntro.tsx'));
const Player = lazy(() => import('./features/player/AssignmentPlayer.tsx'));
const Tutor = lazy(() => import('./features/tutor/TutorMode.tsx'));
const Practice = lazy(() => import('./features/player/PracticeSession.tsx'));
const Progress = lazy(() => import('./features/student/ProgressPage.tsx'));
const LiveAnswer = lazy(() => import('./features/live/StudentLive.tsx'));

const AdminOverview = lazy(() => import('./features/admin/AdminOverviewPage.tsx'));
const AdminUsers = lazy(() => import('./features/admin/AdminUsersPage.tsx'));
const AdminClasses = lazy(() => import('./features/admin/AdminClassesPage.tsx'));
const AdminSettings = lazy(() => import('./features/admin/AdminSettingsPage.tsx'));
const AdminAudit = lazy(() => import('./features/admin/AdminAuditPage.tsx'));
const AdminRequests = lazy(() => import('./features/admin/AdminRequestsPage.tsx'));
const AdminEdits = lazy(() => import('./features/admin/AdminEditsPage.tsx'));
const AdminVideos = lazy(() => import('./features/admin/AdminVideosPage.tsx'));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 20_000, retry: 1, refetchOnWindowFocus: true } },
});

function HomeRedirect() {
  const { user, loading } = useAuth();
  if (loading) return <PageSpinner />;
  if (!user) return <Landing />;
  return <Navigate to={user.role === 'teacher' ? '/t' : '/s'} replace />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <ErrorBoundary>
              <Suspense fallback={<PageSpinner />}>
                <Routes>
                  <Route path="/" element={<HomeRedirect />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/join/:code" element={<JoinWithName />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />

                  <Route path="/t" element={<RequireRole role="teacher"><AppShell role="teacher" /></RequireRole>}>
                    <Route index element={<TeacherHome />} />
                    <Route path="new-class" element={<NewClass />} />
                    <Route path="c/:classId" element={<ClassOverview />} />
                    <Route path="c/:classId/curriculum" element={<Curriculum />} />
                    <Route path="c/:classId/lessons/:lessonId" element={<TeacherLesson />} />
                    <Route path="c/:classId/assignments" element={<Assignments />} />
                    <Route path="c/:classId/assignments/new" element={<AssignmentBuilder />} />
                    <Route path="c/:classId/assignments/:assignmentId" element={<AssignmentDetail />} />
                    <Route path="c/:classId/assignments/:assignmentId/edit" element={<AssignmentBuilder />} />
                    <Route path="c/:classId/submissions/:submissionId" element={<SubmissionReview />} />
                    <Route path="c/:classId/students" element={<Students />} />
                    <Route path="c/:classId/students/:studentId" element={<StudentProfile />} />
                    <Route path="c/:classId/gradebook" element={<Gradebook />} />
                    <Route path="c/:classId/mastery" element={<MasteryMap />} />
                    <Route path="c/:classId/insights" element={<Insights />} />
                    <Route path="c/:classId/settings" element={<ClassSettings />} />
                  </Route>
                  <Route path="/present/:classId/:lessonId" element={<RequireRole role="teacher"><PresentMode /></RequireRole>} />

                  <Route path="/s" element={<RequireRole role="student"><AppShell role="student" /></RequireRole>}>
                    <Route index element={<StudentHome />} />
                    <Route path="join" element={<JoinClass />} />
                    <Route path="welcome" element={<Welcome />} />
                    <Route path="learn" element={<Learn />} />
                    <Route path="learn/:lessonId" element={<StudentLesson />} />
                    <Route path="work" element={<Work />} />
                    <Route path="work/:assignmentId" element={<AssignmentIntro />} />
                    <Route path="progress" element={<Progress />} />
                    <Route path="live" element={<LiveAnswer />} />
                  </Route>
                  <Route path="/s/work/:assignmentId/take" element={<RequireRole role="student"><Player /></RequireRole>} />
                  <Route path="/s/practice" element={<RequireRole role="student"><Practice /></RequireRole>} />
                  <Route path="/s/learn/:lessonId/tutor" element={<RequireRole role="student"><Tutor /></RequireRole>} />

                  <Route path="/admin" element={<RequireAdmin><AppShell role="admin" /></RequireAdmin>}>
                    <Route index element={<AdminOverview />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="classes" element={<AdminClasses />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="requests" element={<AdminRequests />} />
                    <Route path="edits" element={<AdminEdits />} />
                    <Route path="videos" element={<AdminVideos />} />
                    <Route path="audit" element={<AdminAudit />} />
                  </Route>

                  <Route element={<RequireRole><AppShellForRole /></RequireRole>}>
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

function AppShellForRole() {
  const { user } = useAuth();
  return <AppShell role={user?.role ?? 'student'} />;
}
