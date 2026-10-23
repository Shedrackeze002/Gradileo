/**
 * Onboarding for students who sign up on their own: the subject they want to study, a few
 * questions about their grade, plans and how mathematics feels, a recommended course in the
 * stream that fits their plans, and an optional placement check on the skills of the course before
 * it. Starting a course opens a self-paced section where the AI acts as tutor.
 */
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ClipboardCheck, Compass, KeyRound, Sparkles, XCircle } from 'lucide-react';
import { LISTED_COURSES as COURSES, SUBJECTS, getCourse, getSkill, skillInfo } from '@engine/curriculum/index.ts';
import { gradeItem } from '@engine/grade.ts';
import { placementResult, placementSkills, PREREQUISITE, recommendCourse, type Feeling, type PlacementAnswers, type Plan, type PlacementResult } from '@engine/placement.ts';
import { freshSeed } from '@engine/rng.ts';
import { useStartSelfPaced } from '@/data/hooks.ts';
import { SkillsGate } from '@/components/SkillsGate.tsx';
import { QuestionView } from '@/components/question/QuestionView.tsx';
import { Badge, Button, Card, CardBody, Checkbox, PageHeader, useToast } from '@/components/ui/index.ts';
import { cn } from '@/lib/cn.ts';
import { chooseStudentClass, useStudentClass } from '../shared/useStudentClass.ts';
import { saveReviewSkills } from './review.ts';
import { CourseRequestCard } from '@/features/requests/CourseRequestCard.tsx';

const PLANS: Array<[Plan, string]> = [
  ['university-stem', 'University: science, engineering, health or mathematics'],
  ['university-other', 'University: arts, business, education or another program'],
  ['college-trades', 'College, a technical program or a trade'],
  ['work', 'Straight into work'],
  ['not-sure', 'Not sure yet'],
];

const FEELINGS: Array<[Feeling, string]> = [
  ['confident', 'Going well'],
  ['ok', 'Okay, with some gaps'],
  ['struggling', 'Hard right now'],
];

/** A subject's courses grouped by grade, youngest first. */
function gradesOf(subject: string) {
  const courses = COURSES.filter((c) => c.subject === subject);
  return [...new Set(courses.map((c) => c.grade))].sort((a, b) => a - b).map((grade) => ({ grade, courses: courses.filter((c) => c.grade === grade) }));
}
/** The grades a student can say they are in: Grades 5 to 12 for mathematics, 9 to 12 for a senior science. */
const gradeChoices = (subject: string) => (subject === 'Mathematics' ? [5, 6, 7, 8, 9, 10, 11, 12] : [9, 10, 11, 12]);

const title = (courseId: string | null | undefined) => (courseId ? (getCourse(courseId)?.title ?? courseId) : '');

type Step = 'about' | 'course' | 'check' | 'result';

interface CheckResult {
  skillId: string;
  correct: boolean;
}

export default function WelcomePage() {
  const { classes } = useStudentClass();
  const [answers, setAnswers] = useState<PlacementAnswers | null>(null);
  const [step, setStep] = useState<Step>('about');
  const [courseId, setCourseId] = useState<string | null>(null);
  const [results, setResults] = useState<CheckResult[]>([]);
  const start = useStartSelfPaced();
  const navigate = useNavigate();
  const toast = useToast();
  const rec = useMemo(() => (answers ? recommendCourse(answers) : null), [answers]);

  const begin = async (id: string, review: string[] = []) => {
    try {
      const c = await start.mutateAsync(id);
      chooseStudentClass(c.id);
      saveReviewSkills(c.id, review);
      toast({ kind: 'success', title: `You are studying ${getCourse(id)?.shortTitle ?? 'your course'}`, body: 'Every lesson is open. Your AI tutor suggests what to practise next.' });
      navigate('/s');
    } catch (e) {
      toast({ kind: 'error', title: 'Could not start the course', body: (e as Error).message });
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow={classes.length ? 'Add a course' : 'Welcome to Gradileo'}
        title="Find your course"
        subtitle="Answer a few questions and Gradileo recommends where to start. You study on your own with an AI tutor, and you can join a teacher’s class at any time."
      />
      {step === 'about' && (
        <About
          initial={answers}
          onDone={(a) => {
            setAnswers(a);
            setCourseId(recommendCourse(a).courseId);
            setStep('course');
          }}
        />
      )}
      {step === 'course' && rec && courseId && (
        <CourseChoice
          rec={rec}
          courseId={courseId}
          onPick={setCourseId}
          onBack={() => setStep('about')}
          onCheck={() => setStep('check')}
          onStart={() => begin(courseId)}
          starting={start.isPending}
        />
      )}
      {step === 'check' && courseId && PREREQUISITE[courseId] && (
        <PlacementCheck
          prerequisite={PREREQUISITE[courseId]!}
          onCancel={() => setStep('course')}
          onDone={(r) => {
            setResults(r);
            setStep('result');
          }}
        />
      )}
      {step === 'result' && courseId && (
        <Outcome
          courseId={courseId}
          prerequisite={PREREQUISITE[courseId] ?? null}
          results={results}
          starting={start.isPending}
          onStart={begin}
          onBack={() => setStep('course')}
        />
      )}
      {(step === 'about' || step === 'course') && <CourseRequestCard who="student" className="mt-6" />}
      <p className="mt-8 text-center text-sm text-ink-3">
        <KeyRound className="mr-1.5 inline h-4 w-4 align-[-3px]" />
        Have a class code from your teacher?{' '}
        <Link to="/s/join" className="font-semibold text-brand hover:underline">
          Join their class
        </Link>
      </p>
    </div>
  );
}

function Choice({ selected, onClick, children, className }: { selected: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn('rounded-xl border px-3 py-2.5 text-left text-[15px] font-medium transition', selected ? 'border-brand bg-brand-50 text-brand-800 ring-2 ring-brand/20' : 'border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink', className)}
    >
      {children}
    </button>
  );
}

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2.5 font-semibold text-ink">{label}</legend>
      {children}
    </fieldset>
  );
}

function About({ initial, onDone }: { initial: PlacementAnswers | null; onDone: (a: PlacementAnswers) => void }) {
  const [subject, setSubject] = useState(initial?.subject ?? SUBJECTS[0]);
  const [grade, setGrade] = useState<number | null>(initial?.grade ?? null);
  const [plan, setPlan] = useState<Plan | null>(initial?.plan ?? null);
  const [calculus, setCalculus] = useState<boolean | null>(initial?.calculus ?? null);
  const [feeling, setFeeling] = useState<Feeling | null>(initial?.feeling ?? null);
  const [support, setSupport] = useState(initial?.support ?? false);
  // Plans, calculus and how it feels choose between mathematics courses; a science starts at its first course.
  const maths = subject === 'Mathematics';
  const grades = gradeChoices(subject);
  const senior = maths && grade !== null && grade >= 10;
  const askCalculus = senior && grade === 12 && plan === 'university-stem';
  const askSupport = senior && feeling === 'struggling';
  const complete = grade !== null && (!maths || feeling !== null) && (!senior || plan !== null) && (!askCalculus || calculus !== null);
  const chooseSubject = (s: string) => {
    setSubject(s);
    if (grade !== null && !gradeChoices(s).includes(grade)) setGrade(null);
  };

  return (
    <Card>
      <CardBody className="space-y-7">
        {SUBJECTS.length > 1 && (
          <Question label="What do you want to study?">
            <div className="grid grid-cols-2 gap-2 sm:w-96">
              {SUBJECTS.map((s) => (
                <Choice key={s} selected={subject === s} onClick={() => chooseSubject(s)}>
                  {s}
                </Choice>
              ))}
            </div>
          </Question>
        )}
        <Question label="Which grade are you in?">
          <div className={cn('grid grid-cols-4 gap-2', grades.length > 4 ? 'sm:grid-cols-8' : 'sm:w-96')}>
            {grades.map((g) => (
              <Choice key={g} selected={grade === g} onClick={() => setGrade(g)} className="text-center">
                {g}
              </Choice>
            ))}
          </div>
        </Question>
        {senior && (
          <Question label="What are you thinking of doing after high school?">
            <div className="grid gap-2 sm:grid-cols-2">
              {PLANS.map(([p, label]) => (
                <Choice key={p} selected={plan === p} onClick={() => setPlan(p)}>
                  {label}
                </Choice>
              ))}
            </div>
          </Question>
        )}
        {askCalculus && (
          <Question label="Do you plan to take calculus in Grade 12?">
            <div className="grid grid-cols-2 gap-2 sm:w-80">
              <Choice selected={calculus === true} onClick={() => setCalculus(true)}>
                Yes
              </Choice>
              <Choice selected={calculus === false} onClick={() => setCalculus(false)}>
                No or not sure
              </Choice>
            </div>
          </Question>
        )}
        {maths && (
          <Question label="How does mathematics feel right now?">
            <div className="grid gap-2 sm:grid-cols-3">
              {FEELINGS.map(([f, label]) => (
                <Choice key={f} selected={feeling === f} onClick={() => setFeeling(f)}>
                  {label}
                </Choice>
              ))}
            </div>
          </Question>
        )}
        {askSupport && (
          <Checkbox checked={support} onChange={setSupport} label="I would like a course with more support that focuses on everyday mathematics" />
        )}
        <div className="flex justify-end">
          <Button
            size="lg"
            disabled={!complete}
            onClick={() => complete && onDone({ subject, grade: grade!, plan: senior ? plan! : undefined, calculus: askCalculus ? calculus! : undefined, feeling: maths ? feeling! : undefined, support: askSupport && support })}
          >
            See my recommendation <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

function CourseCard({ courseId, selected, onClick, badge, why }: { courseId: string; selected: boolean; onClick: () => void; badge?: string; why?: string }) {
  const c = getCourse(courseId);
  if (!c) return null;
  return (
    <button type="button" onClick={onClick} aria-pressed={selected} className={cn('card flex w-full items-start gap-3 p-4 text-left transition', selected ? 'border-brand ring-2 ring-brand/20' : 'hover:border-line-strong')}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <BookOpen className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">{c.title}</span>
          {badge && <Badge tone="brand">{badge}</Badge>}
        </span>
        {why && <span className="mt-0.5 block text-sm text-ink-2">{why}</span>}
        <span className="mt-0.5 block text-sm text-ink-3">
          {c.units.length} units · {c.lessons.length} lessons
        </span>
      </span>
      {selected && <Check className="h-5 w-5 shrink-0 text-brand" />}
    </button>
  );
}

function CourseChoice({ rec, courseId, onPick, onBack, onCheck, onStart, starting }: { rec: ReturnType<typeof recommendCourse>; courseId: string; onPick: (id: string) => void; onBack: () => void; onCheck: () => void; onStart: () => void; starting: boolean }) {
  const [all, setAll] = useState(false);
  const course = getCourse(courseId);
  const prerequisite = PREREQUISITE[courseId] ?? null;
  const listed = new Set([rec.courseId, ...rec.alternatives.map((a) => a.courseId)]);
  const grades = gradesOf(getCourse(rec.courseId)?.subject ?? SUBJECTS[0]);
  return (
    <div className="space-y-6">
      <Card className="border-brand-200 bg-gradient-to-br from-brand-50 to-surface">
        <CardBody>
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-800">
            <Sparkles className="h-4 w-4" /> We recommend
          </div>
          <h2 className="mt-2 font-display text-2xl font-semibold">{title(rec.courseId)}</h2>
          <p className="mt-1 text-ink-2">{getCourse(rec.courseId)?.description}</p>
          <ul className="mt-4 space-y-2">
            {rec.reasons.map((r) => (
              <li key={r} className="flex gap-2 text-[15px] text-ink-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-good" />
                {r}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <div className="space-y-3">
        <div className="label">Your course</div>
        <CourseCard courseId={rec.courseId} selected={courseId === rec.courseId} onClick={() => onPick(rec.courseId)} badge="Recommended" />
        {rec.alternatives.map((a) => (
          <CourseCard key={a.courseId} courseId={a.courseId} selected={courseId === a.courseId} onClick={() => onPick(a.courseId)} why={a.why} />
        ))}
        {!listed.has(courseId) && <CourseCard courseId={courseId} selected onClick={() => undefined} />}
        <button type="button" onClick={() => setAll((v) => !v)} className="text-sm font-semibold text-brand hover:underline">
          {all ? 'Hide the other courses' : 'Choose a different course'}
        </button>
        {all && (
          <div className="space-y-2.5 rounded-2xl border border-line bg-surface p-4">
            {grades.map(({ grade, courses }) => (
              <section key={grade} aria-label={`Grade ${grade}`} className="flex items-center gap-3">
                <h3 className="w-16 shrink-0 text-xs font-semibold uppercase tracking-wide text-ink-3">Grade {grade}</h3>
                <div className="flex flex-wrap gap-2">
                  {courses.map((c) => (
                    <Choice key={c.id} selected={courseId === c.id} onClick={() => onPick(c.id)} className="py-1.5 text-sm">
                      {c.shortTitle}
                    </Choice>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      <Card>
        <CardBody className="space-y-4">
          {prerequisite ? (
            <p className="flex gap-3 text-[15px] text-ink-2">
              <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <span>
                A short placement check (6 questions on {getCourse(prerequisite)?.shortTitle} skills) shows whether you are ready for {course?.shortTitle} and which skills to review first. It is optional and is not graded.
              </span>
            </p>
          ) : (
            <p className="text-[15px] text-ink-2">{course?.shortTitle} is the first course, so there is no placement check.</p>
          )}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
            <Button variant="ghost" icon={<ArrowLeft className="h-4 w-4" />} onClick={onBack}>
              Back
            </Button>
            <div className="hidden flex-1 sm:block" />
            {prerequisite && (
              <Button variant="secondary" onClick={onStart} loading={starting}>
                Skip the check and start
              </Button>
            )}
            <Button onClick={prerequisite ? onCheck : onStart} loading={!prerequisite && starting}>
              {prerequisite ? 'Take the placement check' : `Start ${course?.shortTitle}`} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function PlacementCheck({ prerequisite, onCancel, onDone }: { prerequisite: string; onCancel: () => void; onDone: (r: CheckResult[]) => void }) {
  const skills = useMemo(() => placementSkills(prerequisite), [prerequisite]);
  return (
    <SkillsGate skillIds={skills}>
      <CheckQuestions prerequisite={prerequisite} skills={skills} onCancel={onCancel} onDone={onDone} />
    </SkillsGate>
  );
}

function CheckQuestions({ prerequisite, skills, onCancel, onDone }: { prerequisite: string; skills: string[]; onCancel: () => void; onDone: (r: CheckResult[]) => void }) {
  const items = useMemo(() => skills.map((id) => getSkill(id)?.generate(freshSeed(), 2)), [skills]);
  const [i, setI] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [results, setResults] = useState<CheckResult[]>([]);
  const item = items[i];
  const last = i === skills.length - 1;

  const next = (skipped: boolean) => {
    const correct = !skipped && !!item && gradeItem(item, responses).correct;
    const all = [...results, { skillId: skills[i], correct }];
    if (last) return onDone(all);
    setResults(all);
    setResponses([]);
    setI(i + 1);
  };

  return (
    <Card>
      <CardBody className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="brand">Placement check · {getCourse(prerequisite)?.shortTitle}</Badge>
          <span className="text-sm text-ink-3">
            Question {i + 1} of {skills.length}
          </span>
          <div className="flex flex-1 justify-end gap-1.5" aria-hidden>
            {skills.map((s, k) => (
              <span key={s + k} className={cn('h-2 w-6 rounded-full', k < i ? 'bg-brand' : k === i ? 'bg-brand/50' : 'bg-surface-3')} />
            ))}
          </div>
        </div>
        <div className="text-sm font-medium text-brand-700">{skillInfo(skills[i])?.name}</div>
        {item ? <QuestionView key={i} item={item} responses={responses} onChange={setResponses} onEnter={() => responses.some((r) => r?.trim()) && next(false)} autoFocus /> : <p className="text-ink-3">This question could not be loaded. Skip it.</p>}
        <div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:items-center">
          <Button variant="ghost" onClick={onCancel}>
            Leave the check
          </Button>
          <div className="hidden flex-1 sm:block" />
          <Button variant="secondary" onClick={() => next(true)}>
            I have not learned this yet
          </Button>
          <Button onClick={() => next(false)} disabled={!responses.some((r) => r?.trim())}>
            {last ? 'See my result' : 'Next'} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-ink-3">The check is not graded and nothing is saved to a gradebook. Answer what you can; it is fine to skip.</p>
      </CardBody>
    </Card>
  );
}

const MESSAGE: Record<PlacementResult, (course: string, prerequisite: string) => string> = {
  ready: (c, p) => `You know the ${p} skills that ${c} builds on, so you are ready to start.`,
  review: (c, p) => `You can start ${c}. A few ${p} skills need a refresh first; your home page lists them with practice ready.`,
  'start-earlier': (c, p) => `${p} may be the better place to start, because ${c} builds directly on it. You can still start ${c} if you prefer, with the missed skills to review.`,
};

function Outcome({ courseId, prerequisite, results, starting, onStart, onBack }: { courseId: string; prerequisite: string | null; results: CheckResult[]; starting: boolean; onStart: (courseId: string, review?: string[]) => void; onBack: () => void }) {
  const correct = results.filter((r) => r.correct).length;
  const verdict = placementResult(correct, results.length);
  const missed = results.filter((r) => !r.correct).map((r) => r.skillId);
  const course = getCourse(courseId)?.shortTitle ?? courseId;
  const pre = getCourse(prerequisite ?? '')?.shortTitle ?? '';
  return (
    <Card>
      <CardBody className="space-y-6">
        <div className="flex items-center gap-5">
          <div className="shrink-0 whitespace-nowrap font-display text-5xl font-semibold tabular-nums">
            {correct}
            <span className="text-2xl text-ink-3"> of {results.length}</span>
          </div>
          <div>
            <Badge tone={verdict === 'ready' ? 'good' : verdict === 'review' ? 'warn' : 'info'}>{verdict === 'ready' ? 'Ready' : verdict === 'review' ? 'Ready, with review' : 'Start earlier'}</Badge>
            <p className="mt-1.5 text-[15px] text-ink-2">{MESSAGE[verdict](course, pre)}</p>
          </div>
        </div>
        <ul className="divide-y divide-line rounded-xl border border-line" aria-label="Placement check skills">
          {results.map((r) => (
            <li key={r.skillId} className="flex items-center gap-3 px-4 py-2.5 text-[15px]">
              {r.correct ? <CheckCircle2 className="h-5 w-5 shrink-0 text-good" /> : <XCircle className="h-5 w-5 shrink-0 text-ink-3" />}
              <span className="min-w-0 flex-1">{skillInfo(r.skillId)?.name ?? r.skillId}</span>
              <span className={cn('text-sm', r.correct ? 'text-good-ink' : 'text-ink-3')}>{r.correct ? 'Got it' : 'To review'}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
          <Button variant="ghost" icon={<ArrowLeft className="h-4 w-4" />} onClick={onBack}>
            Back
          </Button>
          <div className="hidden flex-1 sm:block" />
          {verdict === 'start-earlier' && prerequisite ? (
            <>
              <Button variant="secondary" onClick={() => onStart(courseId, missed)} loading={starting}>
                Start {course} anyway
              </Button>
              <Button onClick={() => onStart(prerequisite)} loading={starting} icon={<Compass className="h-4 w-4" />}>
                Start {pre}
              </Button>
            </>
          ) : (
            <Button onClick={() => onStart(courseId, missed)} loading={starting}>
              Start {course} <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
