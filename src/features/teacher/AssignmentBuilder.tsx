import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AlertCircle, Bell, Eye, Minus, Plus, RefreshCw, Shuffle, Sparkles, Trash2, Users, Wand2 } from 'lucide-react';
import {
  DEFAULT_SETTINGS,
  TYPE_LABEL,
  buildItemRefs,
  isQuestionType,
  itemFromRef,
  type AssignmentContent,
  type AssignmentSettings,
  type AssignmentType,
  type CustomQuestion,
  type SkillSection,
} from '@engine/assemble.ts';
import { getCourse, skillInfo, lessonById, unitById } from '@engine/curriculum/index.ts';
import { refSkillIds, useSkillsReady } from '@/lib/useSkills.ts';
import { canonicalResponses } from '@engine/answers.ts';
import { freshSeed } from '@engine/rng.ts';
import type { Difficulty, Item } from '@engine/types.ts';
import { useAssignment, useClass, useMastery, usePublications, usePublishAssignment, useRoster, useSaveAssignment, useSubmissions } from '@/data/hooks.ts';
import type { Assignment, ClassRoom, Profile, SkillMastery } from '@/data/types.ts';
import { Avatar, Badge, Button, Card, CardBody, CardHeader, Checkbox, IconButton, Input, Modal, PageHeader, PageSpinner, Select, Switch, Tabs, Textarea, useToast } from '@/components/ui/index.ts';
import { Markdown } from '@/components/math/Markdown.tsx';
import { QuestionView } from '@/components/question/QuestionView.tsx';
import { VideoEmbed, videoEmbedUrl } from '@/features/lessons/LessonBlocks.tsx';
import { fmtDateTime, fromLocalInput, toLocalInput } from '@/lib/dates.ts';
import { uid } from '@/lib/ids.ts';
import { cn } from '@/lib/cn.ts';
import { writtenFormatOf, type DraftResult, type DraftType } from '@engine/ai/builder.ts';
import { adviseSettings, classPace, estimateWork } from '@engine/timing.ts';
import { TypeIcon } from '../shared/TypeIcon.tsx';
import { skillLabel } from '../shared/derive.ts';
import { useClassId } from './shared.tsx';
import { DraftWithAI, type DraftMode } from './DraftWithAI.tsx';
import { RegenerateQuestion } from './RegenerateQuestion.tsx';

interface Draft {
  id?: string;
  status: Assignment['status'];
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
  aiRationale: string | null;
}

const TYPES: Array<{ type: AssignmentType; hint: string }> = [
  { type: 'lesson', hint: 'Read a lesson and try its checks' },
  { type: 'video', hint: 'Watch a video you choose' },
  { type: 'reading', hint: 'A lesson, your own notes or a link' },
  { type: 'practice', hint: 'Low stakes, instant feedback' },
  { type: 'classwork', hint: 'In-class set, instant feedback' },
  { type: 'homework', hint: 'Mixed difficulty, 3 attempts' },
  { type: 'quiz', hint: 'Timed, one attempt' },
  { type: 'exam', hint: 'Timed, results after due date' },
];

const PER_SKILL: Partial<Record<AssignmentType, number>> = { practice: 3, classwork: 3, homework: 3, quiz: 2, exam: 2 };

const REMINDER_OPTIONS = [72, 48, 24, 12, 6, 2, 1];
const hoursLabel = (h: number) => (h >= 24 ? `${h / 24} day${h === 24 ? '' : 's'}` : `${h} h`);

function defaultDue(type: AssignmentType, now = new Date()): string {
  const d = new Date(now);
  const at = (days: number, h: number, m = 0) => {
    d.setDate(d.getDate() + days);
    d.setHours(h, m, 0, 0);
  };
  if (type === 'classwork') at(0, 23, 59);
  else if (type === 'exam') at(7, 9);
  else if (type === 'practice') at(3, 21);
  else if (type === 'homework') at(2, 21);
  else at(1, 21);
  return d.toISOString();
}

function sectionsForLesson(lessonId: string, type: AssignmentType): SkillSection[] {
  const l = lessonById(lessonId);
  return (l?.skills ?? []).map((skillId) => ({ skillId, count: PER_SKILL[type] ?? 3, difficulty: 'mixed' as const }));
}

function draftFromParams(params: URLSearchParams, cls: ClassRoom): Draft {
  const type = (params.get('type') as AssignmentType) || 'homework';
  const lessonId = params.get('lesson') ?? undefined;
  const unitId = params.get('unit');
  const skills = (params.get('skills') ?? '').split(',').filter((s) => skillInfo(s));
  const students = (params.get('students') ?? '').split(',').filter(Boolean);
  let sections: SkillSection[] = [];
  if (isQuestionType(type)) {
    if (skills.length) sections = skills.map((skillId) => ({ skillId, count: PER_SKILL[type] ?? 3, difficulty: 'mixed' }));
    else if (unitId) {
      const u = unitById(unitId);
      sections = (u?.lessons ?? []).flatMap((lid) => (lessonById(lid)?.skills ?? []).map((skillId) => ({ skillId, count: 1, difficulty: 2 as Difficulty })));
    } else if (lessonId) sections = sectionsForLesson(lessonId, type);
  }
  return {
    status: 'draft',
    title: '',
    type,
    instructions: '',
    content: { sections, custom: [], lessonId: type === 'lesson' || type === 'reading' || type === 'video' ? lessonId : undefined, shuffle: type === 'exam' || type === 'quiz' },
    settings: { ...DEFAULT_SETTINGS[type] },
    openAt: null,
    dueAt: defaultDue(type),
    allowLate: type !== 'exam',
    reminderHours: [...cls.settings.reminderHours],
    assignedTo: students.length ? students : 'all',
    aiRationale: null,
  };
}

function draftFromAssignment(a: Assignment): Draft {
  return {
    id: a.id,
    status: a.status,
    title: a.title,
    type: a.type,
    instructions: a.instructions,
    content: { ...a.content, sections: [...a.content.sections], custom: [...a.content.custom] },
    settings: { ...a.settings },
    openAt: a.openAt,
    dueAt: a.dueAt,
    allowLate: a.allowLate,
    reminderHours: [...a.reminderHours],
    assignedTo: a.assignedTo,
    aiRationale: a.aiRationale,
  };
}

function autoTitle(d: Draft): string {
  const label = TYPE_LABEL[d.type];
  if (!isQuestionType(d.type)) {
    const l = d.content.lessonId ? lessonById(d.content.lessonId) : undefined;
    if (l) return `${d.type === 'video' ? 'Watch' : 'Read'}: ${l.number} ${l.title}`;
    return label;
  }
  const lessons = [...new Set(d.content.sections.map((s) => skillInfo(s.skillId)?.lessonId).filter(Boolean) as string[])];
  const units = [...new Set(lessons.map((l) => lessonById(l)?.unitId))];
  if (lessons.length === 1) {
    const l = lessonById(lessons[0])!;
    return `${label}: ${l.number} ${l.title}`;
  }
  if (units.length === 1 && units[0] && lessons.length >= 3 && (d.type === 'exam' || d.type === 'quiz')) {
    const u = unitById(units[0])!;
    return `Unit ${u.number} ${d.type === 'exam' ? 'Test' : 'Quiz'}: ${u.title}`;
  }
  if (lessons.length > 1) return `${label}: Lessons ${lessons.map((l) => lessonById(l)!.number).join(', ')}`;
  return label;
}

function validate(d: Draft): string[] {
  const errs: string[] = [];
  if (isQuestionType(d.type)) {
    if (!d.content.sections.length && !d.content.custom.length) errs.push('Add at least one skill or question.');
    d.content.custom.forEach((q, i) => {
      const n = `Question ${d.content.sections.reduce((s, x) => s + x.count, 0) + i + 1}`;
      if (!q.prompt.trim()) errs.push(`${n} needs a prompt.`);
      if ((q.kind === 'mc' || q.kind === 'multi') && (q.choices ?? []).filter((c) => c.md.trim()).length < 2) errs.push(`${n} needs at least two choices.`);
      if (q.kind === 'mc' && !q.correct) errs.push(`${n}: mark the correct choice.`);
      if (q.kind === 'multi' && !(Array.isArray(q.correct) && q.correct.length)) errs.push(`${n}: mark at least one correct choice.`);
      if (q.kind === 'text' && !(q.accepted ?? []).length) errs.push(`${n} needs at least one accepted answer.`);
    });
  }
  if (d.type === 'lesson' && !d.content.lessonId) errs.push('Choose a lesson.');
  if (d.type === 'video' && !/^https?:\/\//.test(d.content.resourceUrl ?? '')) errs.push('Add a video link.');
  if (d.type === 'reading' && !d.content.lessonId && !d.content.readingText?.trim() && !/^https?:\/\//.test(d.content.resourceUrl ?? '')) errs.push('Choose a lesson, write the reading or add a link.');
  if (d.openAt && d.dueAt && new Date(d.openAt) >= new Date(d.dueAt)) errs.push('The due date must be after the open date.');
  if (Array.isArray(d.assignedTo) && d.assignedTo.length === 0) errs.push('Choose at least one student.');
  return errs;
}

/** The lessons a draft with AI starts from: those the assignment already covers, else the newest published one. */
function lessonsInDraft(d: Draft, courseId: string, published: Set<string>): string[] {
  const covered = [...new Set([...d.content.sections.map((s) => skillInfo(s.skillId)?.lessonId), d.content.lessonId].filter(Boolean) as string[])];
  if (covered.length) return covered;
  const newest = [...(getCourse(courseId)?.lessons ?? [])].reverse().find((l) => published.has(l.id));
  return newest ? [newest.id] : [];
}

/** Sections with a draft's added: a skill already there gets the extra questions. */
function mergeSections(a: SkillSection[], b: SkillSection[]): SkillSection[] {
  const out = a.map((s) => ({ ...s }));
  for (const s of b) {
    const same = out.find((x) => x.skillId === s.skillId);
    if (same) same.count = Math.min(15, same.count + s.count);
    else out.push({ ...s });
  }
  return out;
}

function questionCount(d: Draft): number {
  return isQuestionType(d.type) ? d.content.sections.reduce((s, x) => s + x.count, 0) + d.content.custom.length : 0;
}

function estimateMinutes(d: Draft, pace?: ReadonlyMap<string, number>): number {
  if (d.type === 'lesson') return lessonById(d.content.lessonId ?? '')?.minutes ?? 30;
  if (d.type === 'video') return 10;
  if (d.type === 'reading') return d.content.lessonId ? lessonById(d.content.lessonId)?.minutes ?? 20 : 15;
  return Math.max(5, estimateWork(d.content, pace).minutes);
}

/** The lessons an assignment's questions cover (for regenerating a question with no skill of its own). */
function coveredLessons(content: AssignmentContent): string[] {
  return [...new Set([...content.sections.map((s) => s.skillId), ...content.custom.map((q) => q.skillId)].map((id) => (id ? skillInfo(id)?.lessonId : undefined)).filter((l): l is string => !!l))];
}

export default function AssignmentBuilder() {
  const classId = useClassId();
  const { assignmentId } = useParams();
  const [params] = useSearchParams();
  const cls = useClass(classId);
  const existing = useAssignment(assignmentId);
  const roster = useRoster(classId);
  const pubs = usePublications(classId);
  const mastery = useMastery({ classId });
  const save = useSaveAssignment(classId);
  const publish = usePublishAssignment(classId);
  const navigate = useNavigate();
  const toast = useToast();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [picker, setPicker] = useState(false);
  const [preview, setPreview] = useState(false);
  const [drafting, setDrafting] = useState(false);
  const [advising, setAdvising] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  // The class's past attempts, for its own pace on each skill: loaded when settings are suggested.
  const subs = useSubmissions({ classId }, advising);
  const pace = useMemo(() => classPace(subs.data ?? []), [subs.data]);

  useEffect(() => {
    if (draft) return;
    if (assignmentId) {
      if (existing.data) setDraft(draftFromAssignment(existing.data));
    } else if (cls.data) setDraft(draftFromParams(params, cls.data));
  }, [draft, assignmentId, existing.data, cls.data, params]);

  const published = useMemo(() => new Set((pubs.data ?? []).map((p) => p.lessonId)), [pubs.data]);

  if (!draft || !cls.data) return <PageSpinner />;
  const d = draft;
  const course = getCourse(cls.data.courseId)!;
  const set = (patch: Partial<Draft>) => setDraft({ ...d, ...patch });
  const setContent = (patch: Partial<AssignmentContent>) => setDraft({ ...d, content: { ...d.content, ...patch } });
  const setSettings = (patch: Partial<AssignmentSettings>) => setDraft({ ...d, settings: { ...d.settings, ...patch } });
  const errors = validate(d);
  const isPublished = d.status === 'published';
  const questionType = isQuestionType(d.type);
  const title = d.title.trim() || autoTitle(d);

  function changeType(type: AssignmentType) {
    let content = d.content;
    if (isQuestionType(type) && !content.sections.length && !content.custom.length && content.lessonId) content = { ...content, sections: sectionsForLesson(content.lessonId, type) };
    else if (isQuestionType(type)) content = { ...content, sections: content.sections.map((s) => ({ ...s, count: type === 'exam' && s.count === 3 ? 2 : s.count })) };
    setDraft({ ...d, type, content: { ...content, shuffle: type === 'exam' || type === 'quiz' ? true : content.shuffle }, settings: { ...DEFAULT_SETTINGS[type] }, dueAt: d.id ? d.dueAt : defaultDue(type), allowLate: type !== 'exam' });
  }

  function applyDraft(r: DraftResult, mode: DraftMode) {
    const x = r.draft;
    const content = { ...d.content, sections: mode === 'add' ? mergeSections(d.content.sections, x.sections) : x.sections, custom: mode === 'add' ? [...d.content.custom, ...x.custom] : x.custom };
    const notes = [
      x.rationale,
      r.dropped?.length ? `${r.dropped.length} question${r.dropped.length === 1 ? '' : 's'} the AI wrote did not pass the checks and ${r.dropped.length === 1 ? 'was' : 'were'} left out.` : '',
      r.unchecked ? 'The AI could not solve its questions a second time to check their answers, so check each answer it wrote before you publish.' : '',
      r.source === 'offline' && !/not available/.test(x.rationale) ? 'The AI is not available right now, so this draft uses the course’s generated questions only.' : '',
    ].filter(Boolean);
    setDraft({ ...d, title: d.title.trim() ? d.title : x.title, instructions: d.instructions.trim() ? d.instructions : x.instructions, content, aiRationale: notes.join(' ') || null });
    setDrafting(false);
    setAdvising(true);
    const n = content.sections.reduce((t, s) => t + s.count, 0) + content.custom.length;
    toast({ kind: 'success', title: `Drafted: ${n} question${n === 1 ? '' : 's'}`, body: x.custom.length ? 'Check each question the AI wrote (marked below), preview it as a student, then publish.' : 'Preview it as a student, adjust anything, then publish.' });
  }

  async function onSave(andPublish: boolean) {
    if (errors.length) {
      setShowErrors(true);
      toast({ kind: 'error', title: 'A few things need attention', body: errors[0] });
      return;
    }
    const content: AssignmentContent = questionType
      ? { sections: d.content.sections, custom: d.content.custom, shuffle: d.content.shuffle, lessonId: undefined }
      : { sections: [], custom: [], lessonId: d.content.lessonId, resourceUrl: d.content.resourceUrl?.trim() || undefined, readingText: d.content.readingText?.trim() || undefined };
    try {
      const saved = await save.mutateAsync({
        id: d.id,
        classId,
        title,
        type: d.type,
        instructions: d.instructions,
        content,
        settings: d.settings,
        openAt: d.openAt,
        dueAt: d.dueAt,
        allowLate: d.allowLate,
        reminderHours: [...d.reminderHours].sort((a, b) => b - a),
        assignedTo: d.assignedTo,
      });
      if (andPublish && saved.status !== 'published') await publish.mutateAsync(saved.id);
      toast({ kind: 'success', title: andPublish && !isPublished ? 'Published' : 'Saved', body: andPublish && !isPublished ? 'Students have been notified.' : undefined });
      navigate(andPublish || isPublished ? `/t/c/${classId}/assignments/${saved.id}` : `/t/c/${classId}/assignments`);
    } catch (e) {
      toast({ kind: 'error', title: 'Could not save', body: (e as Error).message });
    }
  }

  return (
    <div>
      <PageHeader
        title={assignmentId ? 'Edit assignment' : 'New assignment'}
        back={{ to: assignmentId ? `/t/c/${classId}/assignments/${assignmentId}` : `/t/c/${classId}/assignments`, label: assignmentId ? 'Assignment' : 'Assignments' }}
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-6">
          {d.aiRationale && (
            <div className="flex gap-3 rounded-2xl border border-brand-200 bg-brand-50/60 p-4 text-sm">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <div>
                <div className="font-semibold text-brand-800">Suggested by the AI assistant</div>
                <p className="mt-0.5 text-ink-2">{d.aiRationale}</p>
              </div>
            </div>
          )}

          <Card>
            <CardHeader title="1. What kind of work?" />
            <CardBody className="grid grid-cols-2 gap-2 pt-4 sm:grid-cols-4">
              {TYPES.map((t) => (
                <button
                  key={t.type}
                  type="button"
                  disabled={isPublished && t.type !== d.type}
                  onClick={() => changeType(t.type)}
                  className={cn('flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-40', d.type === t.type ? 'border-brand bg-brand-50/50 ring-2 ring-brand/20' : 'border-line hover:border-line-strong')}
                  aria-pressed={d.type === t.type}
                >
                  <TypeIcon type={t.type} className="h-8 w-8" />
                  <span>
                    <span className="block text-sm font-semibold">{TYPE_LABEL[t.type]}</span>
                    <span className="block text-xs leading-snug text-ink-3">{t.hint}</span>
                  </span>
                </button>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="2. Content"
              subtitle={questionType ? 'Generated questions give every student their own numbers, so answers cannot be copied.' : undefined}
              action={
                questionType ? (
                  <Button size="sm" icon={<Sparkles className="h-4 w-4" />} onClick={() => setDrafting(true)}>
                    Draft with AI
                  </Button>
                ) : undefined
              }
            />
            <CardBody className="space-y-5 pt-4">
              {d.type === 'lesson' && <LessonSelect courseId={course.id} value={d.content.lessonId} onChange={(lessonId) => setContent({ lessonId })} published={published} label="Lesson to read" />}
              {d.type === 'video' && (
                <>
                  <Input label="Video link" placeholder="https://www.youtube.com/watch?v=…" value={d.content.resourceUrl ?? ''} onChange={(e) => setContent({ resourceUrl: e.target.value })} hint="YouTube and Vimeo play inside Gradileo; other links open in a new tab." />
                  {d.content.resourceUrl && videoEmbedUrl(d.content.resourceUrl) && <VideoEmbed url={d.content.resourceUrl} />}
                  <LessonSelect courseId={course.id} value={d.content.lessonId} onChange={(lessonId) => setContent({ lessonId })} published={published} label="Related lesson (optional)" optional />
                </>
              )}
              {d.type === 'reading' && <ReadingEditor d={d} setContent={setContent} courseId={course.id} published={published} />}
              {questionType && (
                <>
                  <SectionsEditor d={d} setContent={setContent} onAdd={() => setPicker(true)} mastery={mastery.data ?? []} roster={roster.data ?? []} published={published} courseId={course.id} />
                  <CustomEditor d={d} setContent={setContent} classId={classId} />
                </>
              )}
              <InstructionsEditor value={d.instructions} onChange={(instructions) => set({ instructions })} />
            </CardBody>
          </Card>

          {questionType && (
            <Card>
              <CardHeader
                title="3. How it works"
                action={
                  <Button size="sm" variant="soft" icon={<Wand2 className="h-4 w-4" />} onClick={() => setAdvising(true)} disabled={questionCount(d) === 0}>
                    Suggest settings
                  </Button>
                }
              />
              <CardBody className="grid gap-5 pt-4 md:grid-cols-2">
                {advising && questionCount(d) > 0 && (
                  <SettingsAdvicePanel
                    d={d}
                    pace={pace}
                    loading={subs.isLoading}
                    onApply={(settings, shuffle) => {
                      setDraft({ ...d, settings: { ...d.settings, ...settings }, content: shuffle === undefined ? d.content : { ...d.content, shuffle } });
                      setAdvising(false);
                      toast({ kind: 'success', title: 'Settings updated' });
                    }}
                    onClose={() => setAdvising(false)}
                  />
                )}
                <Select label="Feedback" value={d.settings.feedback} onChange={(e) => setSettings({ feedback: e.target.value as AssignmentSettings['feedback'] })} hint="Instant feedback lets students check each answer as they go.">
                  <option value="instant">Instant, after each question</option>
                  <option value="after_submit">After they submit</option>
                  <option value="after_due">After the due date</option>
                </Select>
                <div className="grid grid-cols-2 gap-3">
                  <Select label="Attempts" value={d.settings.attempts ?? 0} onChange={(e) => setSettings({ attempts: Number(e.target.value) || null })}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={0}>Unlimited</option>
                  </Select>
                  <Select label="Time limit" value={d.settings.timeLimitMinutes ?? 0} onChange={(e) => setSettings({ timeLimitMinutes: Number(e.target.value) || null })}>
                    <option value={0}>None</option>
                    {[10, 15, 20, 30, 45, 60, 75, 90, 120].map((m) => (
                      <option key={m} value={m}>
                        {m} min
                      </option>
                    ))}
                  </Select>
                </div>
                <Switch checked={d.settings.hints} onChange={(hints) => setSettings({ hints })} label="Hints" description="Step-by-step hints. Hinted answers count as weaker evidence of mastery." />
                <Switch checked={d.settings.showSolutions} onChange={(showSolutions) => setSettings({ showSolutions })} label="Worked solutions" description="Show full solutions when feedback is released." />
                <Switch checked={d.settings.retrySimilar} onChange={(retrySimilar) => setSettings({ retrySimilar })} label="Try a similar question" description="After a miss, students can try a fresh version (up to 3 times)." />
                <Switch checked={!!d.content.shuffle} onChange={(shuffle) => setContent({ shuffle })} label="Shuffle question order" description="Each student sees the questions in a different order." />
                <Switch checked={d.settings.calculator} onChange={(calculator) => setSettings({ calculator })} label="Calculator allowed" description="Shown to students on the start screen." />
                {(d.type === 'quiz' || d.type === 'exam') && <ExamModeSettings settings={d.settings} setSettings={setSettings} />}
              </CardBody>
            </Card>
          )}

          <Card>
            <CardHeader title={`${questionType ? 4 : 3}. When`} icon={<Bell className="h-5 w-5" />} />
            <CardBody className="space-y-5 pt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input type="datetime-local" label="Opens" value={toLocalInput(d.openAt)} onChange={(e) => set({ openAt: fromLocalInput(e.target.value) })} hint="Leave empty to open as soon as you publish." />
                <Input type="datetime-local" label="Due" value={toLocalInput(d.dueAt)} onChange={(e) => set({ dueAt: fromLocalInput(e.target.value) })} />
              </div>
              <Switch checked={d.allowLate} onChange={(allowLate) => set({ allowLate })} label="Accept late work" description="Late submissions are marked late in the gradebook." />
              <div>
                <div className="label">Remind students who haven't finished</div>
                <div className="flex flex-wrap gap-2">
                  {REMINDER_OPTIONS.map((h) => {
                    const on = d.reminderHours.includes(h);
                    return (
                      <button
                        key={h}
                        type="button"
                        aria-pressed={on}
                        onClick={() => set({ reminderHours: on ? d.reminderHours.filter((x) => x !== h) : [...d.reminderHours, h] })}
                        className={cn('rounded-full border px-3 py-1.5 text-sm font-medium transition', on ? 'border-brand bg-brand-50 text-brand-800' : 'border-line text-ink-3 hover:border-line-strong')}
                      >
                        {hoursLabel(h)} before
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-ink-3">Students are notified when you publish. Reminders go only to students who have not submitted yet.</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title={`${questionType ? 5 : 4}. Who`} icon={<Users className="h-5 w-5" />} />
            <CardBody className="pt-4">
              <StudentPicker d={d} set={set} roster={roster.data ?? []} mastery={mastery.data ?? []} />
            </CardBody>
          </Card>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="space-y-4 p-5">
            <div className="flex items-start gap-3">
              <TypeIcon type={d.type} />
              <div className="min-w-0 flex-1">
                <textarea
                  rows={2}
                  className="w-full resize-none rounded-lg border border-transparent bg-transparent px-1 py-0.5 font-semibold leading-snug placeholder:text-ink hover:border-line focus:border-brand focus:outline-none focus:placeholder:text-ink-3"
                  value={d.title}
                  placeholder={autoTitle(d)}
                  onChange={(e) => set({ title: e.target.value.replace(/\n/g, ' ') })}
                  aria-label="Title"
                  maxLength={120}
                />
                <div className="px-1 text-xs text-ink-3">{TYPE_LABEL[d.type]} · click the title to rename it</div>
              </div>
            </div>
            <dl className="space-y-2 text-sm">
              {questionType && <Row label="Questions">{questionCount(d)}</Row>}
              <Row label="About">{estimateMinutes(d, pace)} min</Row>
              <Row label="Due">{d.dueAt ? fmtDateTime(d.dueAt) : 'No due date'}</Row>
              <Row label="For">{d.assignedTo === 'all' ? `Whole class (${roster.data?.length ?? 0})` : `${d.assignedTo.length} student${d.assignedTo.length === 1 ? '' : 's'}`}</Row>
              <Row label="Reminders">{d.reminderHours.length ? [...d.reminderHours].sort((a, b) => b - a).map(hoursLabel).join(', ') : 'Off'}</Row>
              {questionType && <Row label="Feedback">{d.settings.feedback === 'instant' ? 'Instant' : d.settings.feedback === 'after_submit' ? 'After submit' : 'After due date'}</Row>}
              {questionType && d.settings.lockdown && <Row label="Exam mode">{d.settings.maxExits ? `${d.settings.onMaxExits === 'submit' ? 'Submits' : 'Locks'} after ${d.settings.maxExits} ${d.settings.maxExits === 1 ? 'exit' : 'exits'}` : 'Exits logged'}{d.settings.camera ? ' · camera on' : ''}</Row>}
            </dl>
            {showErrors && errors.length > 0 && (
              <div className="space-y-1 rounded-xl bg-bad-soft p-3 text-sm text-bad-ink">
                {errors.map((e) => (
                  <div key={e} className="flex gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {e}
                  </div>
                ))}
              </div>
            )}
            {isPublished && <p className="rounded-xl bg-info-soft p-3 text-xs text-info-ink">This assignment is live. Students who already started keep their version; changes apply to new attempts.</p>}
            <div className="space-y-2">
              {questionType && (
                <Button variant="secondary" className="w-full" icon={<Eye className="h-4 w-4" />} onClick={() => setPreview(true)} disabled={questionCount(d) === 0}>
                  Preview as a student
                </Button>
              )}
              {isPublished ? (
                <Button className="w-full" onClick={() => onSave(false)} loading={save.isPending}>
                  Save changes
                </Button>
              ) : (
                <>
                  <Button className="w-full" onClick={() => onSave(true)} loading={save.isPending || publish.isPending}>
                    Publish & notify students
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => onSave(false)} disabled={save.isPending}>
                    Save as draft
                  </Button>
                </>
              )}
            </div>
          </Card>
        </aside>
      </div>
      {picker && <SkillPicker courseId={course.id} d={d} setContent={setContent} published={published} onClose={() => setPicker(false)} />}
      {preview && <PreviewModal content={d.content} title={title} onClose={() => setPreview(false)} />}
      {drafting && (
        <DraftWithAI
          classId={classId}
          courseId={course.id}
          type={d.type}
          initialLessons={lessonsInDraft(d, course.id, published)}
          published={published}
          hasContent={questionCount(d) > 0}
          onClose={() => setDrafting(false)}
          onDraft={applyDraft}
        />
      )}
    </div>
  );
}

/** "Suggest settings": the working time, and settings that suit the kind of work (engine/timing.ts). */
function SettingsAdvicePanel({ d, pace, loading, onApply, onClose }: { d: Draft; pace: ReadonlyMap<string, number>; loading: boolean; onApply: (settings: Partial<AssignmentSettings>, shuffle?: boolean) => void; onClose: () => void }) {
  const advice = adviseSettings(d.type, d.content, d.settings, pace);
  const changes = Object.keys(advice.settings).length + (advice.shuffle === undefined ? 0 : 1);
  return (
    <div className="space-y-2 rounded-xl border border-brand-200 bg-brand-50/50 p-4 text-sm md:col-span-2" aria-label="Suggested settings">
      <div className="flex items-start gap-2">
        <Wand2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-brand-800">Suggested settings</div>
          <p className="text-ink-2">
            About {advice.minutes} minute{advice.minutes === 1 ? '' : 's'} of work for a typical student{advice.fromClass ? ', from how long this class has taken on these skills before' : ''}{loading ? ' (checking this class’s pace…)' : ''}.
            {changes === 0 && ` Your settings already suit this ${TYPE_LABEL[d.type].toLowerCase()}.`}
          </p>
          {changes > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-2">
              {advice.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={onClose}>
          {changes ? 'Not now' : 'Close'}
        </Button>
        {changes > 0 && (
          <Button size="sm" onClick={() => onApply(advice.settings, advice.shuffle)}>
            Use these settings
          </Button>
        )}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink-3">{label}</dt>
      <dd className="text-right font-medium">{children}</dd>
    </div>
  );
}

function LessonSelect({ courseId, value, onChange, published, label, optional }: { courseId: string; value?: string; onChange: (v: string | undefined) => void; published: Set<string>; label: string; optional?: boolean }) {
  const course = getCourse(courseId)!;
  return (
    <Select label={label} value={value ?? ''} onChange={(e) => onChange(e.target.value || undefined)}>
      <option value="">{optional ? 'None' : 'Choose a lesson…'}</option>
      {course.units.map((u) => (
        <optgroup key={u.id} label={`Unit ${u.number}: ${u.title}`}>
          {u.lessons.map((lid) => {
            const l = lessonById(lid)!;
            return (
              <option key={lid} value={lid}>
                {l.number} {l.title}
                {published.has(lid) ? '' : ' (not yet published)'}
              </option>
            );
          })}
        </optgroup>
      ))}
    </Select>
  );
}

function ReadingEditor({ d, setContent, courseId, published }: { d: Draft; setContent: (p: Partial<AssignmentContent>) => void; courseId: string; published: Set<string> }) {
  const initial = d.content.readingText ? 'write' : d.content.resourceUrl ? 'link' : 'lesson';
  const [mode, setMode] = useState<'lesson' | 'write' | 'link'>(initial);
  return (
    <div className="space-y-4">
      <Tabs
        value={mode}
        onChange={(m) => {
          setMode(m);
          setContent({ lessonId: m === 'lesson' ? d.content.lessonId : undefined, readingText: m === 'write' ? d.content.readingText : undefined, resourceUrl: m === 'link' ? d.content.resourceUrl : undefined });
        }}
        items={[
          { value: 'lesson', label: 'A lesson' },
          { value: 'write', label: 'Write it' },
          { value: 'link', label: 'A link' },
        ]}
      />
      {mode === 'lesson' && <LessonSelect courseId={courseId} value={d.content.lessonId} onChange={(lessonId) => setContent({ lessonId })} published={published} label="Lesson" />}
      {mode === 'write' && <MarkdownField label="Reading" rows={10} value={d.content.readingText ?? ''} onChange={(readingText) => setContent({ readingText })} />}
      {mode === 'link' && <Input label="Link" placeholder="https://" value={d.content.resourceUrl ?? ''} onChange={(e) => setContent({ resourceUrl: e.target.value })} />}
    </div>
  );
}

function MarkdownField({ label, value, onChange, rows = 4, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="label mb-0">{label}</span>
        <button type="button" className="text-xs font-medium text-brand hover:underline" onClick={() => setShow((s) => !s)}>
          {show ? 'Edit' : 'Preview'}
        </button>
      </div>
      {show ? (
        <div className="min-h-[96px] rounded-xl border border-line p-3">{value.trim() ? <Markdown md={value} sanitize /> : <span className="text-sm text-ink-3">Nothing to preview yet.</span>}</div>
      ) : (
        <Textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} hint={'Markdown and math in dollar signs, e.g. $\\sqrt{50} = 5\\sqrt{2}$'} />
      )}
    </div>
  );
}

function InstructionsEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <MarkdownField label="Instructions for students (optional)" value={value} onChange={onChange} rows={3} placeholder="e.g. Show your work on paper. Use hints only after a real attempt." />;
}

// ---------------------------------------------------------------- skills

function classStruggles(mastery: SkillMastery[], published: Set<string>, courseId: string) {
  const course = getCourse(courseId)!;
  const taught = course.lessons.filter((l) => published.has(l.id)).flatMap((l) => l.skills);
  return taught
    .map((skillId) => {
      const rows = mastery.filter((m) => m.skillId === skillId && m.attempts > 0);
      const avg = rows.length ? rows.reduce((s, r) => s + r.pKnown, 0) / rows.length : null;
      return { skillId, avg, n: rows.length };
    })
    .filter((x) => x.avg !== null && x.n >= 3 && x.avg < 0.8)
    .sort((a, b) => a.avg! - b.avg!)
    .slice(0, 4);
}

function SectionsEditor({ d, setContent, onAdd, mastery, published, courseId }: { d: Draft; setContent: (p: Partial<AssignmentContent>) => void; onAdd: () => void; mastery: SkillMastery[]; roster: Profile[]; published: Set<string>; courseId: string }) {
  const sections = d.content.sections;
  const update = (i: number, patch: Partial<SkillSection>) => setContent({ sections: sections.map((s, j) => (j === i ? { ...s, ...patch } : s)) });
  const struggles = classStruggles(mastery, published, courseId).filter((x) => !sections.some((s) => s.skillId === x.skillId));
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="label mb-0">Skills</div>
        <Button size="sm" variant="soft" icon={<Plus className="h-4 w-4" />} onClick={onAdd}>
          Add skills
        </Button>
      </div>
      {sections.length === 0 && <div className="rounded-xl border border-dashed border-line-strong p-5 text-center text-sm text-ink-3">Pick skills from any lesson. Each skill generates fresh questions with hints and worked solutions.</div>}
      {sections.map((s, i) => {
        const skill = skillInfo(s.skillId);
        const lesson = skill ? lessonById(skill.lessonId) : undefined;
        return (
          <div key={s.skillId} className="flex flex-wrap items-center gap-3 rounded-xl border border-line px-3 py-2.5">
            <div className="min-w-0 flex-1 basis-48">
              <div className="text-sm font-medium">{skill?.name ?? s.skillId}</div>
              <div className="truncate text-xs text-ink-3">
                Lesson {lesson?.number} · {skill?.description}
              </div>
            </div>
            <div className="flex items-center gap-1" role="group" aria-label="Number of questions">
              <IconButton label="Fewer" className="h-8 w-8" onClick={() => update(i, { count: Math.max(1, s.count - 1) })}>
                <Minus className="h-4 w-4" />
              </IconButton>
              <span className="w-6 text-center text-sm font-semibold tabular-nums">{s.count}</span>
              <IconButton label="More" className="h-8 w-8" onClick={() => update(i, { count: Math.min(15, s.count + 1) })}>
                <Plus className="h-4 w-4" />
              </IconButton>
            </div>
            <select className="input h-9 w-36 py-0 text-sm" value={String(s.difficulty)} onChange={(e) => update(i, { difficulty: (/^\d$/.test(e.target.value) ? Number(e.target.value) : e.target.value) as SkillSection['difficulty'] })} aria-label="Difficulty">
              <option value="mixed">Easy → hard</option>
              <option value="1">Easy</option>
              <option value="2">Medium</option>
              <option value="3">Hard</option>
            </select>
            <IconButton label="Remove skill" className="h-8 w-8" onClick={() => setContent({ sections: sections.filter((_, j) => j !== i) })}>
              <Trash2 className="h-4 w-4" />
            </IconButton>
          </div>
        );
      })}
      {struggles.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-3">
            <Wand2 className="h-3.5 w-3.5" /> Your class finds these hardest:
          </span>
          {struggles.map((x) => (
            <button key={x.skillId} type="button" onClick={() => setContent({ sections: [...sections, { skillId: x.skillId, count: PER_SKILL[d.type] ?? 3, difficulty: 'mixed' }] })} className="rounded-full border border-dashed border-brand-300 px-2.5 py-1 text-xs font-medium text-brand-700 hover:bg-brand-50">
              + {skillLabel(x.skillId)} · {Math.round(x.avg! * 100)}%
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SkillPicker({ courseId, d, setContent, published, onClose }: { courseId: string; d: Draft; setContent: (p: Partial<AssignmentContent>) => void; published: Set<string>; onClose: () => void }) {
  const course = getCourse(courseId)!;
  const firstSkillUnit = d.content.sections[0] ? lessonById(skillInfo(d.content.sections[0].skillId)?.lessonId ?? '')?.unitId : undefined;
  const lastPublishedUnit = [...course.lessons].reverse().find((l) => published.has(l.id))?.unitId;
  const [unitId, setUnitId] = useState(firstSkillUnit ?? lastPublishedUnit ?? course.units[0].id);
  const selected = new Set(d.content.sections.map((s) => s.skillId));
  const unit = course.units.find((u) => u.id === unitId)!;
  const toggle = (ids: string[], on: boolean) => {
    const rest = d.content.sections.filter((s) => !ids.includes(s.skillId));
    setContent({ sections: on ? [...rest, ...ids.map((skillId) => d.content.sections.find((s) => s.skillId === skillId) ?? { skillId, count: PER_SKILL[d.type] ?? 3, difficulty: 'mixed' as const })] : rest });
  };
  return (
    <Modal open onClose={onClose} title="Add skills" description={`${selected.size} selected`} size="lg" footer={<Button onClick={onClose}>Done</Button>}>
      <div className="space-y-4">
        <Select value={unitId} onChange={(e) => setUnitId(e.target.value)} aria-label="Unit">
          {course.units.map((u) => (
            <option key={u.id} value={u.id}>
              Unit {u.number}: {u.title}
            </option>
          ))}
        </Select>
        {unit.lessons.map((lid) => {
          const l = lessonById(lid)!;
          const all = l.skills.every((s) => selected.has(s));
          return (
            <div key={lid} className="rounded-xl border border-line">
              <div className="flex items-center gap-3 border-b border-line bg-surface-2/50 px-3 py-2">
                <span className="text-sm font-semibold">
                  {l.number} {l.title}
                </span>
                {!published.has(lid) && <Badge>Not published</Badge>}
                <button type="button" className="ml-auto text-xs font-semibold text-brand hover:underline" onClick={() => toggle(l.skills, !all)}>
                  {all ? 'Remove all' : 'Add all'}
                </button>
              </div>
              <div className="divide-y divide-line">
                {l.skills.map((sid) => {
                  const s = skillInfo(sid)!;
                  return (
                    <label key={sid} className="flex cursor-pointer items-start gap-3 px-3 py-2.5 hover:bg-surface-2/40">
                      <input type="checkbox" className="mt-1 h-[18px] w-[18px] accent-[rgb(var(--brand))]" checked={selected.has(sid)} onChange={(e) => toggle([sid], e.target.checked)} />
                      <span>
                        <span className="block text-sm font-medium">{s.name}</span>
                        <span className="block text-xs text-ink-3">{s.description}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

// ---------------------------------------------------------------- custom questions

const KIND_LABEL: Record<CustomQuestion['kind'], string> = {
  mc: 'Multiple choice',
  multi: 'Select all that apply',
  numeric: 'Numeric answer',
  text: 'Short answer',
  manual: 'Written response (you grade)',
};

function newQuestion(kind: CustomQuestion['kind']): CustomQuestion {
  const base: CustomQuestion = { id: uid('q'), prompt: '', kind, points: kind === 'manual' ? 4 : 1 };
  if (kind === 'mc' || kind === 'multi') base.choices = ['', '', '', ''].map(() => ({ id: uid('c'), md: '' }));
  if (kind === 'multi') base.correct = [];
  if (kind === 'numeric') {
    base.value = 0;
    base.tolerance = 0.01;
  }
  if (kind === 'text') base.accepted = [];
  return base;
}

function CustomEditor({ d, setContent, classId }: { d: Draft; setContent: (p: Partial<AssignmentContent>) => void; classId: string }) {
  const qs = d.content.custom;
  const [regenerating, setRegenerating] = useState<string | null>(null);
  const lessons = coveredLessons(d.content);
  const target = qs.find((q) => q.id === regenerating);
  const offset = d.content.sections.reduce((s, x) => s + x.count, 0);
  const update = (i: number, q: CustomQuestion) => setContent({ custom: qs.map((x, j) => (j === i ? q : x)) });
  const skillOptions = [...new Set([...d.content.sections.map((s) => s.skillId), ...qs.map((q) => q.skillId).filter((s): s is string => !!s)])];
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="label mb-0">Your own questions</div>
          <div className="text-xs text-ink-3">Optional. Students answer written responses on a canvas or by typing, and they appear in your grading queue.</div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(KIND_LABEL) as CustomQuestion['kind'][]).map((k) => (
            <Button key={k} size="xs" variant="secondary" icon={<Plus className="h-3.5 w-3.5" />} onClick={() => setContent({ custom: [...qs, newQuestion(k)] })}>
              {k === 'mc' ? 'Choice' : k === 'multi' ? 'Multi-select' : k === 'numeric' ? 'Number' : k === 'text' ? 'Short answer' : 'Written'}
            </Button>
          ))}
        </div>
      </div>
      {qs.map((q, i) => (
        <QuestionEditor
          key={q.id}
          q={q}
          number={offset + i + 1}
          onChange={(nq) => update(i, nq)}
          onRemove={() => setContent({ custom: qs.filter((_, j) => j !== i) })}
          onRegenerate={writtenFormatOf(q) && (q.skillId || lessons.length) ? () => setRegenerating(q.id) : undefined}
          skillOptions={skillOptions}
        />
      ))}
      {target && (
        <RegenerateQuestion
          classId={classId}
          type={d.type as DraftType}
          question={target}
          lessonIds={lessons}
          onClose={() => setRegenerating(null)}
          onReplace={(nq) => {
            setContent({ custom: qs.map((x) => (x.id === target.id ? nq : x)) });
            setRegenerating(null);
          }}
        />
      )}
    </div>
  );
}

function QuestionEditor({ q, number, onChange, onRemove, onRegenerate, skillOptions }: { q: CustomQuestion; number: number; onChange: (q: CustomQuestion) => void; onRemove: () => void; onRegenerate?: () => void; skillOptions: string[] }) {
  const [showSolution, setShowSolution] = useState(!!q.solution);
  const isCorrect = (id: string) => (q.kind === 'mc' ? q.correct === id : Array.isArray(q.correct) && q.correct.includes(id));
  const toggleCorrect = (id: string) => {
    if (q.kind === 'mc') onChange({ ...q, correct: id });
    else {
      const cur = Array.isArray(q.correct) ? q.correct : [];
      onChange({ ...q, correct: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] });
    }
  };
  return (
    <div className="space-y-3 rounded-xl border border-line p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold">Q{number}</span>
        <Badge tone="brand">{KIND_LABEL[q.kind]}</Badge>
        {q.aiWritten && (
          <span className="inline-flex items-center gap-1.5">
            <Badge tone="warn" icon={<Sparkles className="h-3 w-3" />}>
              Written by AI: check the answer
            </Badge>
            <button type="button" className="text-xs font-semibold text-brand hover:underline" onClick={() => onChange({ ...q, aiWritten: undefined })}>
              Mark as checked
            </button>
          </span>
        )}
        <div className="ml-auto flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-ink-3">
            Points
            <input type="number" min={1} max={20} className="input h-8 w-16 py-0 text-sm" value={q.points ?? 1} onChange={(e) => onChange({ ...q, points: Math.max(1, Math.min(20, Number(e.target.value) || 1)) })} />
          </label>
          {onRegenerate && (
            <Button size="xs" variant="ghost" icon={<RefreshCw className="h-3.5 w-3.5" />} onClick={onRegenerate}>
              Regenerate
            </Button>
          )}
          <IconButton label="Remove question" className="h-8 w-8" onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
      <MarkdownField label="Question" value={q.prompt} onChange={(prompt) => onChange({ ...q, prompt })} rows={3} placeholder="e.g. Explain why $\sqrt{12}$ and $2\sqrt{3}$ are equal." />
      {(q.kind === 'mc' || q.kind === 'multi') && (
        <div className="space-y-2">
          <div className="text-xs font-medium text-ink-3">{q.kind === 'mc' ? 'Choices (select the correct one)' : 'Choices (tick every correct one)'}</div>
          {(q.choices ?? []).map((c, ci) => (
            <div key={c.id} className="flex items-center gap-2">
              <input
                type={q.kind === 'mc' ? 'radio' : 'checkbox'}
                name={`correct-${q.id}`}
                className="h-[18px] w-[18px] shrink-0 accent-[rgb(var(--good))]"
                checked={isCorrect(c.id)}
                onChange={() => toggleCorrect(c.id)}
                aria-label={`Mark choice ${ci + 1} correct`}
              />
              <input className="input h-10" value={c.md} placeholder={`Choice ${String.fromCharCode(65 + ci)}`} onChange={(e) => onChange({ ...q, choices: q.choices!.map((x) => (x.id === c.id ? { ...x, md: e.target.value } : x)) })} />
              <IconButton
                label="Remove choice"
                className="h-8 w-8 shrink-0"
                onClick={() => onChange({ ...q, choices: q.choices!.filter((x) => x.id !== c.id), correct: q.kind === 'mc' ? (q.correct === c.id ? undefined : q.correct) : (q.correct as string[]).filter((x) => x !== c.id) })}
              >
                <Trash2 className="h-4 w-4" />
              </IconButton>
            </div>
          ))}
          {(q.choices?.length ?? 0) < 8 && (
            <Button size="xs" variant="ghost" icon={<Plus className="h-3.5 w-3.5" />} onClick={() => onChange({ ...q, choices: [...(q.choices ?? []), { id: uid('c'), md: '' }] })}>
              Add choice
            </Button>
          )}
        </div>
      )}
      {q.kind === 'numeric' && (
        <div className="grid grid-cols-2 gap-3">
          <Input label="Correct value" type="number" step="any" value={q.value ?? 0} onChange={(e) => onChange({ ...q, value: Number(e.target.value) })} />
          <Input label="Accept within ±" type="number" step="any" min={0} value={q.tolerance ?? 0} onChange={(e) => onChange({ ...q, tolerance: Math.abs(Number(e.target.value)) })} hint="Students may also type fractions or expressions." />
        </div>
      )}
      {q.kind === 'text' && <Input label="Accepted answers" placeholder="Separate with commas, e.g. hypotenuse, the hypotenuse" value={(q.accepted ?? []).join(', ')} onChange={(e) => onChange({ ...q, accepted: e.target.value.split(',').map((x) => x.trim()).filter(Boolean) })} hint="Not case-sensitive." />}
      <div className="flex flex-wrap items-center gap-3">
        {skillOptions.length > 0 && (
          <select className="input h-9 w-auto py-0 text-sm" value={q.skillId ?? ''} onChange={(e) => onChange({ ...q, skillId: e.target.value || undefined })} aria-label="Counts toward skill">
            <option value="">Not linked to a skill</option>
            {skillOptions.map((s) => (
              <option key={s} value={s}>
                Counts toward: {skillLabel(s)}
              </option>
            ))}
          </select>
        )}
        {!showSolution && (
          <button type="button" className="text-xs font-semibold text-brand hover:underline" onClick={() => setShowSolution(true)}>
            + Add a worked solution
          </button>
        )}
      </div>
      {showSolution && <MarkdownField label="Worked solution" value={q.solution ?? ''} onChange={(solution) => onChange({ ...q, solution })} rows={3} />}
    </div>
  );
}

// ---------------------------------------------------------------- students

function StudentPicker({ d, set, roster, mastery }: { d: Draft; set: (p: Partial<Draft>) => void; roster: Profile[]; mastery: SkillMastery[] }) {
  const [q, setQ] = useState('');
  const specific = d.assignedTo !== 'all';
  const chosen = new Set(specific ? (d.assignedTo as string[]) : []);
  const skills = d.content.sections.map((s) => s.skillId);
  const below = roster.filter((p) => skills.some((sid) => {
    const m = mastery.find((x) => x.studentId === p.id && x.skillId === sid);
    return !m || (m.level !== 'proficient' && m.level !== 'mastered');
  }));
  const list = roster.filter((p) => p.fullName.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-xl bg-surface-2 p-1">
        <button type="button" onClick={() => set({ assignedTo: 'all' })} className={cn('rounded-lg px-3 py-1.5 text-sm font-medium', !specific ? 'bg-surface text-ink shadow-card' : 'text-ink-3')}>
          Whole class
        </button>
        <button type="button" onClick={() => set({ assignedTo: specific ? d.assignedTo : [] })} className={cn('rounded-lg px-3 py-1.5 text-sm font-medium', specific ? 'bg-surface text-ink shadow-card' : 'text-ink-3')}>
          Selected students
        </button>
      </div>
      {!specific && <p className="text-sm text-ink-3">Everyone in the class, including students who join later.</p>}
      {specific && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <input className="input h-9 w-48" placeholder="Search students" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search students" />
            <Button size="xs" variant="ghost" onClick={() => set({ assignedTo: roster.map((p) => p.id) })}>
              Select all
            </Button>
            <Button size="xs" variant="ghost" onClick={() => set({ assignedTo: [] })}>
              Clear
            </Button>
            {skills.length > 0 && below.length > 0 && (
              <Button size="xs" variant="soft" icon={<Wand2 className="h-3.5 w-3.5" />} onClick={() => set({ assignedTo: below.map((p) => p.id) })}>
                Below proficient on these skills ({below.length})
              </Button>
            )}
          </div>
          <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <Checkbox
                key={p.id}
                className="rounded-lg px-2 py-1.5 hover:bg-surface-2"
                checked={chosen.has(p.id)}
                onChange={(on) => set({ assignedTo: on ? [...chosen, p.id] : [...chosen].filter((x) => x !== p.id) })}
                label={
                  <span className="inline-flex items-center gap-2">
                    <Avatar name={p.fullName} color={p.avatarColor} size={24} />
                    {p.fullName}
                  </span>
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- preview

function PreviewModal({ content, title, onClose }: { content: AssignmentContent; title: string; onClose: () => void }) {
  const [seed, setSeed] = useState(() => freshSeed());
  const [show, setShow] = useState(false);
  const [resp, setResp] = useState<Record<number, string[]>>({});
  const [canvases, setCanvases] = useState<Record<number, string | undefined>>({});
  const loaded = useSkillsReady(refSkillIds(content));
  const items = useMemo(() => (loaded === 'ready' ? buildItemRefs(content, seed).map((ref) => itemFromRef(ref, content, 'preview')).filter((x): x is Item => !!x) : []), [content, seed, loaded]);
  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={title}
      description="Each student gets their own version of every generated question."
      footer={
        <>
          <Switch checked={show} onChange={setShow} label={<span className="text-sm">Show answers</span>} />
          <div className="flex-1" />
          <Button
            variant="secondary"
            icon={<RefreshCw className="h-4 w-4" />}
            onClick={() => {
              setSeed(freshSeed());
              setResp({});
              setCanvases({});
            }}
          >
            Another version
          </Button>
          <Button onClick={onClose}>Close</Button>
        </>
      }
    >
      <div className="space-y-4">
        {content.shuffle && (
          <div className="flex items-center gap-2 text-xs text-ink-3">
            <Shuffle className="h-3.5 w-3.5" /> Order is shuffled for each student.
          </div>
        )}
        {items.map((item, i) => (
          <div key={`${seed}-${i}`} className="rounded-2xl border border-line p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-ink-3">
              <span>Q{i + 1}</span>
              <span>·</span>
              <span>{item.skillId === 'custom' ? 'Your question' : skillLabel(item.skillId)}</span>
              {item.difficulty && item.skillId !== 'custom' && <Badge>{['', 'Easy', 'Medium', 'Hard'][item.difficulty]}</Badge>}
            </div>
            <QuestionView
              item={item}
              responses={show ? canonicalResponses(item) : resp[i] ?? []}
              onChange={(r) => setResp((x) => ({ ...x, [i]: r }))}
              canvas={canvases[i]}
              onCanvasChange={(c) => setCanvases((x) => ({ ...x, [i]: c }))}
              locked={show}
              showAnswers={show}
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}

/** Exam mode (lockdown) for quizzes and exams: off unless the teacher turns it on. */
function ExamModeSettings({ settings, setSettings }: { settings: AssignmentSettings; setSettings: (patch: Partial<AssignmentSettings>) => void }) {
  return (
    <div className="space-y-4 rounded-2xl border border-line p-4 md:col-span-2">
      <Switch
        checked={!!settings.lockdown}
        onChange={(lockdown) => setSettings(lockdown ? { lockdown, maxExits: settings.maxExits ?? 3, onMaxExits: settings.onMaxExits ?? 'lock' } : { lockdown })}
        label="Exam mode"
        description="Opens in full screen. Leaving full screen or switching tabs is recorded and shown to you. A website cannot stop a student closing the tab, so treat it as a strong deterrent, not a guarantee."
      />
      {settings.lockdown && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Exits allowed" value={settings.maxExits ?? 0} onChange={(e) => setSettings({ maxExits: Number(e.target.value) || null })}>
            <option value={0}>No limit (record only)</option>
            {[1, 2, 3, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Select>
          <Select label="At the limit" value={settings.onMaxExits ?? 'lock'} onChange={(e) => setSettings({ onMaxExits: e.target.value as 'lock' | 'submit' })} disabled={!settings.maxExits}>
            <option value="lock">Lock until I unlock it</option>
            <option value="submit">Submit the attempt</option>
          </Select>
          <div className="sm:col-span-2">
            <Switch
              checked={!!settings.camera}
              onChange={(camera) => setSettings({ camera })}
              label="Camera must be on"
              description="Students see a consent notice first. Nothing is recorded, saved or sent: you only see whether the camera stayed on."
            />
          </div>
        </div>
      )}
    </div>
  );
}
