import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BellRing,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Infinity as InfinityIcon,
  LineChart,
  MonitorPlay,
  Presentation,
  Sparkles,
  Table2,
} from 'lucide-react';
import { allSkillInfos, courseOfLesson, LISTED_COURSES as COURSES } from '@engine/curriculum/index.ts';
import { api, demoApi, setDemoBackend } from '@/data/index.ts';
import { useAuth } from '@/features/auth/AuthProvider.tsx';
import { Button, Tabs } from '@/components/ui/index.ts';
import { Logo } from '@/components/layout/Logo.tsx';
import { LegalLinks } from '@/features/legal/LegalLayout.tsx';
import { DEMO_PASSWORD, DEMO_STUDENT_EMAIL, DEMO_TEACHER_EMAIL } from '@/data/demo/constants.ts';
import { Tex } from '@/components/math/Markdown.tsx';

const DEMO_START_KEY = 'educore-demo-start';

const LESSON_COUNT = COURSES.reduce((n, c) => n + c.lessons.length, 0);
/** Question generators of the listed courses (a course still being written is not counted yet). */
const SKILL_COUNT = allSkillInfos().filter((s) => !courseOfLesson(s.lessonId)?.draft).length;
const OUTCOME_COUNT = COURSES.reduce((n, c) => n + c.outcomes.length, 0);

const FEATURES = [
  { icon: BookOpenCheck, title: 'Complete, detailed lessons', body: `${LESSON_COUNT} lessons across ${COURSES.length} Alberta courses, covering every outcome, each with definitions, worked examples, common mistakes and interactive checks.` },
  { icon: InfinityIcon, title: 'Unlimited practice', body: `${SKILL_COUNT} question generators produce a fresh version of every question, with hints and step-by-step solutions — practice never runs out.` },
  { icon: BrainCircuit, title: 'Real mastery tracking', body: 'Bayesian Knowledge Tracing estimates what each student knows. Mastery requires success across separate sessions, not one lucky streak.' },
  { icon: ClipboardList, title: 'Every kind of assignment', body: 'Classwork, homework, practice, quizzes, exams, readings and videos — with time limits, attempts, hints and feedback rules per assignment.' },
  { icon: BellRing, title: 'Reminders that respect effort', body: 'Students are notified when work is assigned and reminded before the deadline — only if they have not finished it yet.' },
  { icon: Sparkles, title: 'AI teaching assistant', body: 'Powered by MiniMax. It analyses performance, names strengths, gaps and misconceptions, and proposes next steps you can approve in one click.' },
  { icon: MonitorPlay, title: 'Present mode', body: 'Teach any lesson full-screen with step-by-step reveals of worked examples and live check questions.' },
  { icon: Table2, title: 'Gradebook & mastery map', body: 'See every score, late and missing submission, and every student’s mastery of every skill at a glance. Export to CSV.' },
];

export default function LandingPage() {
  const demo = demoApi();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState<string | null>(null);
  const tryDemo = async (who: 'teacher' | 'student') => {
    if (!demo) {
      // On a live site the demo runs in this browser only; switch over and sign in after the reload.
      try {
        sessionStorage.setItem(DEMO_START_KEY, who);
      } catch {
        /* storage unavailable */
      }
      setDemoBackend(true);
      return;
    }
    setBusy(who);
    try {
      const u = await api().signIn(who === 'teacher' ? DEMO_TEACHER_EMAIL : DEMO_STUDENT_EMAIL, DEMO_PASSWORD);
      setUser(u);
      navigate(who === 'teacher' ? '/t' : '/s');
    } finally {
      setBusy(null);
    }
  };

  useEffect(() => {
    let who: string | null = null;
    try {
      who = sessionStorage.getItem(DEMO_START_KEY);
      sessionStorage.removeItem(DEMO_START_KEY);
    } catch {
      who = null;
    }
    if (demo && (who === 'teacher' || who === 'student')) void tryDemo(who);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const skillCount = SKILL_COUNT;
  const [courseId, setCourseId] = useState(COURSES[0].id);
  const course = COURSES.find((c) => c.id === courseId) ?? COURSES[0];

  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-canvas/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="flex items-center gap-2">
            <a href="#features" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-2 hover:text-ink sm:block">
              Features
            </a>
            <a href="#curriculum" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-2 hover:text-ink sm:block">
              Curriculum
            </a>
            <Button variant="ghost" size="sm" to="/login">
              Sign in
            </Button>
            <Button size="sm" to="/signup">
              Get started
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[520px] max-w-5xl rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-300/20" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-surface px-3 py-1 text-xs font-semibold text-brand-700">
              <Sparkles className="h-3.5 w-3.5" /> Alberta Mathematics, Grades 5 to 12 · Chemistry 20
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[56px]">
              Teach it once. <span className="text-brand">Practise until it sticks.</span> Know who needs help.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
              Gradileo is an all-in-one mastery platform: complete lessons, unlimited auto-graded practice, assignments with reminders, and an AI assistant that tells you exactly what each student needs next.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" icon={<Presentation className="h-5 w-5" />} loading={busy === 'teacher'} onClick={() => tryDemo('teacher')}>
                Try the teacher demo
              </Button>
              <Button size="lg" variant="secondary" icon={<GraduationCap className="h-5 w-5" />} loading={busy === 'student'} onClick={() => tryDemo('student')}>
                Try as a student
              </Button>
            </div>
            <p className="mt-4 text-sm text-ink-3">No sign-up needed for the demo. It runs entirely in your browser.</p>
          </div>
          <HeroPreview />
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          {[
            [`${OUTCOME_COUNT}`, 'syllabus outcomes covered'],
            [`${LESSON_COUNT}`, 'detailed lessons'],
            [`${skillCount}`, 'skills with unlimited questions'],
            ['8', 'assignment types'],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-4xl font-semibold text-brand">{n}</div>
              <div className="mt-1 text-sm text-ink-3">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">Everything a classroom needs, in one place</h2>
          <p className="mt-3 text-lg text-ink-2">Built on what the research says works: mastery learning, worked examples, retrieval practice, spacing, and fast formative feedback.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold sm:text-4xl">A week with Gradileo</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              ['Publish', 'Open the next lesson to your class with one switch. Add your own videos and notes.'],
              ['Teach', 'Present the lesson in class. Students follow along and answer the built-in checks.'],
              ['Assign', 'Create classwork, homework or a quiz from the lesson’s skills in under a minute.'],
              ['Respond', 'Gradileo grades everything, updates mastery and suggests who needs reteaching, practice or a challenge.'],
            ].map(([t, b], i) => (
              <div key={t} className="relative rounded-2xl border border-line p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-ink">{i + 1}</div>
                <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-3">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="curriculum" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-semibold sm:text-4xl">Every outcome in every course</h2>
        <p className="mt-3 max-w-2xl text-lg text-ink-2">Each course follows the Alberta program of studies: every outcome is taught, practised and assessed, from Grade 5 to Grade 12.</p>
        <Tabs className="mt-8 flex-wrap" value={courseId} onChange={setCourseId} items={COURSES.map((c) => ({ value: c.id, label: c.shortTitle }))} />
        <p className="mt-3 text-sm text-ink-3">{course.description}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {course.units.map((u) => (
            <div key={u.id} className="card flex gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-lg font-semibold text-brand-700">{u.number}</div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{u.title}</h3>
                  {u.outcomes.map((o) => (
                    <span key={o} className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[11px] font-semibold text-ink-3">
                      {o}
                    </span>
                  ))}
                </div>
                <p className="mt-1 text-sm text-ink-3">{u.description}</p>
                <p className="mt-2 text-xs text-ink-3">{u.lessons.length} lessons</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-spotlight px-6 py-12 text-white sm:px-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-spotlight-glow/40 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold">See it with a real class</h2>
              <p className="mt-2 max-w-xl text-white/80">The demo includes 16 students, a month of graded work, mastery data and AI insights.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => tryDemo('teacher')} className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 font-semibold text-spotlight hover:bg-white/90">
                Open teacher demo <ArrowRight className="h-4 w-4" />
              </button>
              <Link to="/signup" className="inline-flex h-12 items-center rounded-xl border border-white/30 px-6 font-semibold text-white hover:bg-white/10">
                Create a free account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Logo compact />
          <p>Mastery-based mathematics and chemistry for teachers and students.</p>
          <LegalLinks />
        </div>
      </footer>
    </div>
  );
}

function HeroPreview() {
  const levels = [
    ['Slope of a line', 'm4', 92],
    ['Factoring ax² + bx + c', 'm3', 74],
    ['Surface area of cones', 'm2', 55],
    ['Angles of elevation', 'm1', 31],
  ] as const;
  return (
    <div className="relative mx-auto w-full max-w-[520px] pb-28 pt-6 sm:pb-20">
      <div className="card absolute -top-2 right-0 z-0 hidden w-60 rotate-3 p-4 sm:block">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-700">
          <Sparkles className="h-3.5 w-3.5" /> AI insight
        </div>
        <p className="mt-2 text-xs leading-relaxed text-ink-2">5 students confuse height and slant height. A 10-minute reteach with a new worked example is suggested.</p>
      </div>
      <div className="card relative z-10 mt-16 p-5 shadow-pop sm:mr-16">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-3">Practice · Unit 4</div>
            <div className="mt-1 font-semibold">Factor completely</div>
          </div>
          <span className="rounded-full bg-good-soft px-2.5 py-1 text-xs font-semibold text-good-ink">
            <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />
            Correct
          </span>
        </div>
        <div className="mt-4 text-2xl">
          <Tex tex="6x^2 + 7x - 3" />
        </div>
        <div className="mt-3 rounded-xl border-2 border-good bg-good-soft/40 px-3 py-2.5 font-mono text-[15px]">(2x+3)(3x-1)</div>
        <div className="mt-2 text-sm text-ink-3">
          We read this as <Tex tex="(2x+3)(3x-1)" />
        </div>
      </div>
      <div className="card absolute bottom-0 right-0 z-20 w-64 -rotate-2 p-4 shadow-pop sm:-right-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <LineChart className="h-4 w-4 text-brand" /> Mastery
        </div>
        <div className="space-y-2.5">
          {levels.map(([name, m, pct]) => (
            <div key={name}>
              <div className="flex justify-between text-xs">
                <span className="text-ink-2">{name}</span>
                <span className="text-ink-3">{pct}%</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-3">
                <div className={`h-full rounded-full bg-${m}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
