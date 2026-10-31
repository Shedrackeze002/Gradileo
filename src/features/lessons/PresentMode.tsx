/**
 * Full-screen lesson presentation, shown as a slide deck.
 *
 *  - Every slide is a 16:9 slide scaled to the screen, with its own layout; text, figures and
 *    worked-example steps build in one at a time, and slides change with transitions.
 *  - The lesson's interactive checks are on "Your turn" slides, unchanged.
 *  - Draw on a slide, open a whiteboard, run a timer, pick a student, blank the screen.
 *  - "Choose what to show" hides parts from the slides for this class. Lessons stay complete:
 *    students still see every part on their lesson page.
 */
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, ChevronLeft, ChevronRight, EyeOff, LayoutGrid, Maximize2, MessageCircleQuestion, Minimize2, MonitorOff, PenLine, Settings2, Shuffle, SquarePen, Timer, X } from 'lucide-react';
import { lessonById, unitById } from '@engine/curriculum/index.ts';
import { Button, Menu, Modal, PageSpinner, Switch, useToast } from '@/components/ui/index.ts';
import { useBoards, useClassQuestions, useCloseLiveQuestion, useLessonPrefs, useLiveAnswers, useLiveQuestion, useOpenLiveQuestion, useQuestionsFeed, useResources, useRoster, useSaveBoard, useSetHiddenBlocks, useSetQuestionStatus, useVideoLinks } from '@/data/hooks.ts';
import { api, demoApi } from '@/data/index.ts';
import type { ClassQuestion, Presentation } from '@/data/types.ts';
import { videosForLesson } from '@/content/videos.ts';
import { freshSeed } from '@engine/rng.ts';
import { LivePanel } from '@/features/live/LivePanel.tsx';
import { inkCommit, inkDoc, inkRedo, inkUndo, type InkDoc } from '@/lib/ink.ts';
import { getItem, setItem } from '@/lib/storage.ts';
import { appleTouchDevice, homeScreenApp } from '@/lib/device.ts';
import { cn } from '@/lib/cn.ts';
import { InkSurface } from '@/features/whiteboard/InkSurface.tsx';
import { usePageLock } from '@/features/whiteboard/pageLock.ts';
import { useScreenLock } from '@/features/whiteboard/screenLock.ts';
import { InkToolbar, useInkTools } from '@/features/whiteboard/InkToolbar.tsx';
import { Whiteboard } from '@/features/whiteboard/Whiteboard.tsx';
import { useLessonContent } from './LessonView.tsx';
import { PresentTimer } from './PresentTimer.tsx';
import { forgetPlace, keepPlace, placeKey, readPlace } from './presentPlace.ts';
import { buildSlides, fixedSlide, lastStep, presentedSlides, revealAt, withQuestionsSlide, type Slide, type SlideItem } from './slides.ts';
import { SlideView, type DeckLesson } from './deck/SlideView.tsx';
import { SLIDE_H, SLIDE_W, useStageScale } from './deck/fit.tsx';
import { Confetti } from './deck/Confetti.tsx';
import { StudentPicker } from './deck/StudentPicker.tsx';
import { AnsweringView, QuestionPopup, QuestionsSlideBody } from './deck/ClassQuestions.tsx';

const STEPS_KEY = 'educore-present-steps';
const TX_KEY = 'educore-present-transitions';
const QUESTIONS_KEY = 'educore-present-questions';
const IPAD_HELP_KEY = 'gradileo-present-ipad-full-screen';
type TxMode = 'dynamic' | 'fade' | 'off';

interface Transition {
  in: string;
  out: string;
}

/** Bigger moments get bigger transitions: a new part of the lesson zooms, a new activity rises. */
function transitionFor(from: Slide, to: Slide, dir: number, mode: TxMode): Transition | null {
  if (mode === 'off') return null;
  if (mode === 'fade') return { in: 'tx-fade-in', out: 'tx-fade-out' };
  const newPart = !!to.part && (!from.part || from.part.n !== to.part.n);
  if (fixedSlide(to) || fixedSlide(from) || to.kind === 'hook' || newPart) return { in: 'tx-zoom-in', out: 'tx-zoom-out' };
  if (to.kind === 'check' && dir > 0) return { in: 'tx-rise-in', out: 'tx-fade-out' };
  return dir >= 0 ? { in: 'tx-push-in-next', out: 'tx-push-out-next' } : { in: 'tx-push-in-prev', out: 'tx-push-out-prev' };
}

function HeaderButton({ label, icon, on, onClick, shortcut }: { label: string; icon: ReactNode; on?: boolean; onClick: () => void; shortcut?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      aria-label={label}
      title={shortcut ? `${label} (${shortcut})` : label}
      className={cn('inline-flex h-9 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-ink-2 hover:bg-surface-2', on && 'bg-brand-100 text-brand-800 hover:bg-brand-100')}
    >
      {icon}
      <span className="hidden 2xl:inline">{label}</span>
    </button>
  );
}

function Scaled({ scale, children }: { scale: number; children: ReactNode }) {
  return <div style={{ width: SLIDE_W, height: SLIDE_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>;
}

const KIND_LABEL: Record<Slide['kind'], string> = { title: 'Title', hook: 'Introduction', content: 'Teaching', example: 'Worked example', check: 'Your turn', summary: 'Key takeaways', video: 'Video', link: 'Activity', questions: 'Questions', end: 'Lesson complete' };

export default function PresentMode() {
  const { classId = '', lessonId = '' } = useParams();
  const navigate = useNavigate();
  const meta = lessonById(lessonId);
  const unit = meta ? unitById(meta.unitId) : undefined;
  const { content, error } = useLessonContent(lessonId);
  const resources = useResources(classId);
  const roster = useRoster(classId);
  const prefs = useLessonPrefs(classId, lessonId);
  const setHiddenBlocks = useSetHiddenBlocks(classId, lessonId);
  const boards = useBoards(classId, lessonId);
  const saveBoard = useSaveBoard(classId, lessonId);
  const tools = useInkTools();
  // On a touch screen the slides stay put under the teacher's hand, and a palm presses nothing.
  useScreenLock(true);
  // After a reload the presentation carries on where it was, with its ink.
  const keepKey = placeKey(classId, lessonId);
  const [saved] = useState(() => readPlace(keepKey));

  const lessonResources = useMemo(
    () =>
      (resources.data ?? [])
        .filter((r) => r.lessonId === lessonId && (r.kind === 'video' || r.kind === 'link') && r.url)
        .map((r) => ({ id: r.id, kind: r.kind as 'video' | 'link', url: r.url!, title: r.title })),
    [resources.data, lessonId],
  );
  // The lesson's explainer videos, each part on a slide before the section it teaches (once it is on YouTube).
  const videoLinks = useVideoLinks();
  const explainers = useMemo(() => {
    const parts = videosForLesson(lessonId);
    return parts.map((v, i) => ({ id: v.id, title: v.title, duration: v.duration, chapters: v.chapters.map((c) => c.title), part: i + 1, parts: parts.length, youtubeId: videoLinks.data?.[v.id] }));
  }, [lessonId, videoLinks.data]);
  const allSlides = useMemo(() => (content && meta ? buildSlides(content, meta.title, lessonResources, explainers) : []), [content, meta, lessonResources, explainers]);
  const hidden = useMemo(() => new Set(prefs.data?.hidden ?? []), [prefs.data]);
  const [editing, setEditing] = useState(false);
  const toast = useToast();

  // Students' questions: while this is open the class can send questions from their devices. Present
  // mode tells the class it is presenting, and again every minute, so a closed tab ends it by itself.
  const [questionsOn, setQuestionsOn] = useState(() => getItem(QUESTIONS_KEY) !== 'off');
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  useEffect(() => {
    if (!questionsOn || !classId || !lessonId) return;
    let done = false;
    const beat = () =>
      api()
        .startPresenting(classId, lessonId)
        .then((p) => !done && setPresentation(p))
        .catch(() => undefined);
    void beat();
    const t = setInterval(beat, 60_000);
    return () => {
      done = true;
      clearInterval(t);
      setPresentation(null);
      void api().stopPresenting(classId).catch(() => undefined);
    };
  }, [questionsOn, classId, lessonId]);
  useQuestionsFeed(presentation ? classId : undefined);
  const asked = useClassQuestions(presentation ? classId : undefined, { presentedAt: presentation?.startedAt }, true);
  const questions = useMemo(() => [...(asked.data ?? [])].reverse(), [asked.data]);
  const setQuestionStatus = useSetQuestionStatus(classId);
  // Decided here, so the pop-up moves on at once; snoozed with "Later" until another question comes.
  const [decided, setDecided] = useState<ReadonlySet<string>>(new Set());
  const [snoozed, setSnoozed] = useState<ReadonlySet<string>>(new Set());
  const [answering, setAnswering] = useState<ClassQuestion | null>(null);
  const waiting = questions.filter((q) => q.status === 'new' && !decided.has(q.id));
  const popup = waiting.find((q) => !snoozed.has(q.id));
  const decide = useCallback(
    (q: ClassQuestion, status: 'answered' | 'skipped') => {
      setDecided((d) => new Set(d).add(q.id));
      if (status === 'answered') setAnswering(q);
      setQuestionStatus.mutate(
        { id: q.id, status },
        {
          onError: (e) => {
            setDecided((d) => new Set([...d].filter((id) => id !== q.id)));
            toast({ kind: 'error', title: 'Could not update the question', body: (e as Error).message });
          },
        },
      );
    },
    [setQuestionStatus, toast],
  );

  const slides = useMemo(() => withQuestionsSlide(editing ? allSlides : presentedSlides(allSlides, hidden), editing ? 0 : questions.length), [editing, allSlides, hidden, questions.length]);
  const deckLesson: DeckLesson | null = meta
    ? { number: meta.number, title: meta.title, unitLabel: unit ? `Unit ${unit.number} · ${unit.title}` : '', objectives: meta.objectives, vocabulary: meta.vocabulary ?? [], minutes: meta.minutes }
    : null;

  const [stepsOn, setStepsOn] = useState(() => getItem(STEPS_KEY) !== 'off');
  const [txMode, setTxMode] = useState<TxMode>(() => {
    const v = getItem(TX_KEY);
    return v === 'fade' || v === 'off' ? v : 'dynamic';
  });
  const build = stepsOn && !editing;
  const [pos, setPos] = useState(() => ({ id: saved.slide ?? 'title', step: saved.step ?? 0, dir: 1 }));
  const lastIx = useRef(0);
  let ix = slides.findIndex((s) => s.id === pos.id);
  if (ix < 0) ix = Math.max(0, Math.min(lastIx.current, slides.length - 1));
  lastIx.current = ix;
  const slide: Slide | undefined = slides[ix];
  const maxStep = slide ? lastStep(slide) : 0;
  const step = build ? Math.min(pos.step, maxStep) : maxStep;

  const [full, setFull] = useState(false);
  // On an iPad the browser's full screen (Safari's, Chrome's or any other: all run on Safari's
  // engine there) closes whenever the pencil or a hand moves down the glass, and a page cannot stop
  // it. Added to the Home Screen, Gradileo opens as its own app with no browser bars, which is the
  // full screen that stays put. So on an iPad the button explains that the first time; the
  // browser's full screen is still one tap away, and it is never offered again when it closes.
  const apple = useMemo(appleTouchDevice, []);
  const homeApp = useMemo(homeScreenApp, []);
  const [fullHelp, setFullHelp] = useState(false);
  const browserFull = () => {
    setFullHelp(false);
    void (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.())?.catch(() => undefined);
  };
  const toggleFull = () => {
    if (apple && !document.fullscreenElement && getItem(IPAD_HELP_KEY) !== 'seen') {
      setItem(IPAD_HELP_KEY, 'seen');
      return setFullHelp(true);
    }
    browserFull();
  };
  const [drawing, setDrawing] = useState(() => !!saved.drawing);
  usePageLock(drawing);
  const [boardOpen, setBoardOpen] = useState(() => !!saved.board);
  const [timerOpen, setTimerOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [overview, setOverview] = useState(false);
  const [blank, setBlank] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const celebrate = useCallback(() => setConfetti((c) => c + 1), []);

  // Live class questions: one question at a time, shown on the slide it was asked from.
  const live = useLiveQuestion(classId);
  const openLive = useOpenLiveQuestion(classId);
  const closeLive = useCloseLiveQuestion(classId);
  const [liveSlot, setLiveSlot] = useState<{ key: string; slideId: string } | null>(null);
  const liveOpen = live.data?.status === 'open' ? live.data : null;
  const liveCount = useLiveAnswers(liveOpen?.id, true).data?.length ?? 0;
  const ask = useCallback(
    async (it: SlideItem, slideId: string) => {
      if (it.block.type !== 'check') return;
      try {
        await openLive.mutateAsync({ lessonId, skillId: it.block.skillId, difficulty: it.block.difficulty, seed: freshSeed() });
        setLiveSlot({ key: it.key, slideId });
      } catch (e) {
        toast({ kind: 'error', title: 'Could not send the question', body: (e as Error).message });
      }
    },
    [openLive, lessonId, toast],
  );
  // After a reload, a question that is still open goes back on the slide it came from.
  useEffect(() => {
    if (liveSlot || !liveOpen) return;
    for (const s of allSlides) {
      const it = s.items.find((x) => x.block.type === 'check' && x.block.skillId === liveOpen.skillId && x.block.difficulty === liveOpen.difficulty);
      if (it) {
        setLiveSlot({ key: it.key, slideId: s.id });
        return;
      }
    }
  }, [liveSlot, liveOpen, allSlides]);
  const [notes, setNotes] = useState<Record<string, InkDoc>>(() => Object.fromEntries(Object.entries(saved.notes ?? {}).map(([id, strokes]) => [id, inkDoc(strokes)])));
  useEffect(() => {
    const ink = Object.fromEntries(Object.entries(notes).flatMap(([id, d]) => (d.strokes.length ? [[id, d.strokes]] : [])));
    keepPlace(keepKey, { slide: pos.id, step: pos.step, drawing, board: boardOpen, notes: ink });
  }, [keepKey, pos.id, pos.step, drawing, boardOpen, notes]);
  const note = (slide && notes[slide.id]) || inkDoc();
  const editNote = useCallback((fn: (d: InkDoc) => InkDoc) => slide && setNotes((n) => ({ ...n, [slide.id]: fn(n[slide.id] ?? inkDoc()) })), [slide]);
  const [stageRef, scale] = useStageScale();

  // The slide leaving the screen stays for the length of the transition.
  const shown = useRef<{ slide: Slide; step: number } | null>(null);
  const [exiting, setExiting] = useState<{ slide: Slide; step: number; tx: Transition } | null>(null);
  useLayoutEffect(() => {
    if (!slide) return;
    const was = shown.current;
    shown.current = { slide, step };
    if (!was || was.slide.id === slide.id) return;
    const tx = transitionFor(was.slide, slide, pos.dir, txMode);
    setExiting(tx ? { slide: was.slide, step: was.step, tx } : null);
    if (slide.kind === 'end' && pos.dir > 0) celebrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide, step]);
  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => setExiting(null), 650);
    return () => clearTimeout(t);
  }, [exiting]);

  const goTo = useCallback(
    (k: number, stepAt = 0, dir = 1) => {
      const s = slides[k];
      if (s) setPos({ id: s.id, step: stepAt, dir });
    },
    [slides],
  );
  const next = useCallback(() => {
    if (!slide) return;
    if (build && step < maxStep) setPos({ id: slide.id, step: step + 1, dir: 0 });
    else if (ix < slides.length - 1) goTo(ix + 1, 0, 1);
  }, [slide, build, step, maxStep, ix, slides.length, goTo]);
  const prev = useCallback(() => {
    if (!slide) return;
    if (build && step > 0) setPos({ id: slide.id, step: step - 1, dir: 0 });
    else if (ix > 0) goTo(ix - 1, build ? lastStep(slides[ix - 1]) : 0, -1);
  }, [slide, build, step, ix, slides, goTo]);

  const exit = useCallback(() => {
    forgetPlace(keepKey);
    if (document.fullscreenElement) void document.exitFullscreen();
    navigate(`/t/c/${classId}/lessons/${lessonId}`);
  }, [navigate, classId, lessonId, keepKey]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (boardOpen || pickerOpen || answering) return; // they handle their own keys
      const t = e.target as HTMLElement | null;
      if (t?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      if (blank) {
        e.preventDefault();
        setBlank(false);
        return;
      }
      const k = e.key;
      if (e.ctrlKey || e.metaKey) {
        if (drawing && k.toLowerCase() === 'z') {
          e.preventDefault();
          editNote(e.shiftKey ? inkRedo : inkUndo);
        }
        return;
      }
      if (e.altKey) return;
      const lower = k.length === 1 ? k.toLowerCase() : k;
      if (overview) {
        if (k === 'Escape' || lower === 'o') setOverview(false);
        return;
      }
      if (k === 'ArrowRight' || k === 'PageDown' || (k === ' ' && t?.tagName !== 'BUTTON')) {
        e.preventDefault();
        next();
      } else if (k === 'ArrowLeft' || k === 'PageUp') {
        e.preventDefault();
        prev();
      } else if (k === 'Home') goTo(0, 0, -1);
      else if (k === 'End') goTo(slides.length - 1, 0, 1);
      else if (drawing && lower === 'p') tools.setMode('pen');
      else if (drawing && lower === 'h') tools.setMode('highlighter');
      else if (drawing && lower === 'e') tools.setMode('eraser');
      else if (drawing && lower === 's') tools.setMode('shape');
      else if (drawing && lower === 'l') tools.setMode('pointer');
      else if (lower === 'w') setBoardOpen(true);
      else if (lower === 'd') setDrawing((d) => !d);
      else if (lower === 't') setTimerOpen(true);
      else if (lower === 'r') setPickerOpen(true);
      else if (lower === 'o') setOverview(true);
      else if (lower === 'b' || k === '.') setBlank(true);
      else if (k === 'Escape') {
        if (drawing) setDrawing(false);
        else if (editing) setEditing(false);
        else if (!document.fullscreenElement) exit();
      }
    };
    const onFs = () => setFull(!!document.fullscreenElement);
    window.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFs);
    };
  }, [boardOpen, pickerOpen, answering, blank, drawing, editing, overview, next, prev, goTo, slides.length, exit, editNote, tools]);

  const setHidden = (keys: string[], hide: boolean) => {
    const nextSet = new Set(hidden);
    for (const key of keys) {
      if (hide) nextSet.add(key);
      else nextSet.delete(key);
    }
    setHiddenBlocks.mutate([...nextSet]);
  };

  if (!meta || !deckLesson) return null;
  if (error) return <div className="p-8 text-ink-3">{error}</div>;
  if (!content || !slide) return <PageSpinner label="Preparing slides…" />;

  const reveal = revealAt(slide, step);
  const showInk = (drawing || note.strokes.length > 0) && !exiting;
  const atStart = ix === 0 && (!build || step === 0);
  const atEnd = ix === slides.length - 1 && step >= maxStep;
  const hiddenCount = new Set(allSlides.flatMap((s) => s.items.map((x) => x.blockKey)).filter((k) => hidden.has(k))).size;
  const endActions = (
    <>
      <button type="button" onClick={() => navigate(`/t/c/${classId}/assignments/new?type=practice&skills=${meta.skills.join(',')}`)} className="rounded-2xl bg-white px-8 py-4 text-[24px] font-semibold text-spotlight hover:bg-white/90">
        Assign practice
      </button>
      <button type="button" onClick={exit} className="rounded-2xl px-8 py-4 text-[24px] font-semibold text-white ring-2 ring-white/40 hover:bg-white/10">
        Back to the lesson
      </button>
    </>
  );

  return (
    <div className="flex h-[100dvh] flex-col bg-[#0d0f18]">
      <header className="flex items-center justify-between gap-3 border-b border-line bg-surface px-3 py-2 sm:px-4">
        <div className="min-w-0 truncate text-sm">
          <span className="font-semibold">Lesson {meta.number}</span>
          <span className="hidden text-ink-3 md:inline"> · {meta.title}</span>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          {liveOpen && (
            <button
              type="button"
              onClick={() => {
                const k = liveSlot ? slides.findIndex((s) => s.id === liveSlot.slideId) : -1;
                if (k >= 0) goTo(k, lastStep(slides[k]), k >= ix ? 1 : -1);
              }}
              className="mr-1 inline-flex h-9 items-center gap-2 rounded-lg bg-bad-soft px-3 text-sm font-semibold text-bad-ink"
              title="A question is open on the students' devices"
            >
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-bad" />
              Live · {liveCount} answered
            </button>
          )}
          {questions.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (waiting.length) return setSnoozed(new Set());
                const k = slides.findIndex((s) => s.kind === 'questions');
                if (k >= 0) goTo(k, 0, k >= ix ? 1 : -1);
              }}
              className="mr-1 inline-flex h-9 items-center gap-2 rounded-lg bg-info-soft px-3 text-sm font-semibold text-info-ink"
              title="Questions from the students' devices"
            >
              <MessageCircleQuestion className="h-4 w-4" />
              {waiting.length ? `${waiting.length} new question${waiting.length === 1 ? '' : 's'}` : `Questions · ${questions.length}`}
            </button>
          )}
          <HeaderButton label="Slides" shortcut="O" icon={<LayoutGrid className="h-5 w-5" />} on={overview} onClick={() => setOverview(!overview)} />
          <HeaderButton label="Choose what to show" icon={<EyeOff className="h-5 w-5" />} on={editing} onClick={() => (setEditing(!editing), setDrawing(false))} />
          <HeaderButton label="Draw" shortcut="D" icon={<PenLine className="h-5 w-5" />} on={drawing} onClick={() => (setDrawing(!drawing), setEditing(false))} />
          <HeaderButton label="Whiteboard" shortcut="W" icon={<SquarePen className="h-5 w-5" />} onClick={() => setBoardOpen(true)} />
          <HeaderButton label="Timer" shortcut="T" icon={<Timer className="h-5 w-5" />} on={timerOpen} onClick={() => setTimerOpen(!timerOpen)} />
          <HeaderButton label="Pick a student" shortcut="R" icon={<Shuffle className="h-5 w-5" />} onClick={() => setPickerOpen(true)} />
          <HeaderButton label="Blank screen" shortcut="B" icon={<MonitorOff className="h-5 w-5" />} onClick={() => setBlank(true)} />
          <Menu
            trigger={() => (
              <button type="button" className="inline-flex h-9 items-center rounded-lg px-2 text-ink-2 hover:bg-surface-2" aria-label="Slide settings" title="Slide settings">
                <Settings2 className="h-5 w-5" />
              </button>
            )}
          >
            {() => (
              <div className="w-64 space-y-4 p-2">
                <Switch
                  checked={stepsOn}
                  onChange={(v) => {
                    setStepsOn(v);
                    setItem(STEPS_KEY, v ? 'on' : 'off');
                  }}
                  label={<span className="text-sm">Build slides step by step</span>}
                />
                <Switch
                  checked={questionsOn}
                  onChange={(v) => {
                    setQuestionsOn(v);
                    setItem(QUESTIONS_KEY, v ? 'on' : 'off');
                  }}
                  label={<span className="text-sm">Students can ask questions</span>}
                  description={<span className="text-xs">From their own devices, while you present</span>}
                />
                {demoApi() && presentation && (
                  <Button size="sm" variant="secondary" className="w-full" onClick={() => void demoApi()!.simulateClassQuestion(classId)}>
                    Ask a sample student question
                  </Button>
                )}
                <div>
                  <div className="mb-1.5 text-sm font-medium">Transitions</div>
                  <div className="grid grid-cols-3 gap-1 rounded-xl bg-surface-2 p-1" role="radiogroup" aria-label="Transitions">
                    {(['dynamic', 'fade', 'off'] as TxMode[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        role="radio"
                        aria-checked={txMode === m}
                        onClick={() => {
                          setTxMode(m);
                          setItem(TX_KEY, m);
                        }}
                        className={cn('rounded-lg py-1.5 text-sm font-medium capitalize', txMode === m ? 'bg-surface text-ink shadow-card' : 'text-ink-3 hover:text-ink')}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Menu>
          <span className="mx-1 h-6 w-px bg-line" />
          {!homeApp && (
            <button type="button" className="rounded-lg p-2 text-ink-2 hover:bg-surface-2" onClick={toggleFull} aria-label="Toggle full screen">
              {full ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
          )}
          <button type="button" className="rounded-lg p-2 text-ink-2 hover:bg-surface-2" onClick={exit} aria-label="Exit presentation">
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      {editing && (
        <div className="flex flex-wrap items-center gap-3 border-b border-brand-200 bg-brand-50 px-4 py-2 text-sm text-brand-900">
          <EyeOff className="h-4 w-4 shrink-0" />
          <span className="min-w-0 flex-1">
            Hide the parts you will not teach to this class. Students still see the whole lesson on their lesson page.
            {hiddenCount > 0 && <strong className="ml-1">{hiddenCount} hidden.</strong>}
          </span>
          {hiddenCount > 0 && (
            <Button size="xs" variant="ghost" onClick={() => setHiddenBlocks.mutate([])}>
              Show everything
            </Button>
          )}
          <Button size="xs" onClick={() => setEditing(false)}>
            Done
          </Button>
        </div>
      )}

      <main ref={stageRef} className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        {scale > 0 && (
          <div className="relative overflow-hidden rounded-md shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)]" style={{ width: SLIDE_W * scale, height: SLIDE_H * scale }} aria-roledescription="slide" aria-label={`Slide ${ix + 1} of ${slides.length}: ${slide.title}`}>
            {exiting && (
              <div key={`exit-${exiting.slide.id}`} className={cn('tx pointer-events-none absolute inset-0', exiting.tx.out)} aria-hidden="true">
                <Scaled scale={scale}>
                  <SlideView slide={exiting.slide} reveal={revealAt(exiting.slide, exiting.step)} index={Math.max(0, slides.findIndex((s) => s.id === exiting.slide.id))} total={slides.length} lesson={deckLesson} still />
                </Scaled>
              </div>
            )}
            <div key={slide.id} className={cn('absolute inset-0', exiting && cn('tx', exiting.tx.in))}>
              <Scaled scale={scale}>
                <SlideView
                  slide={slide}
                  reveal={reveal}
                  index={ix}
                  total={slides.length}
                  lesson={deckLesson}
                  editing={editing}
                  hidden={hidden}
                  onToggle={setHidden}
                  onCheckResult={(correct) => correct && celebrate()}
                  endActions={endActions}
                  enterDelay={exiting ? 380 : 0}
                  onAsk={(it) => void ask(it, slide.id)}
                  questions={slide.kind === 'questions' ? <QuestionsSlideBody questions={questions} onAnswer={(q) => (q.status === 'answered' ? setAnswering(q) : decide(q, 'answered'))} /> : undefined}
                  live={
                    liveSlot && live.data && liveSlot.slideId === slide.id
                      ? {
                          key: liveSlot.key,
                          node: (
                            <LivePanel
                              question={live.data}
                              classSize={roster.data?.length ?? 0}
                              busy={openLive.isPending || closeLive.isPending}
                              onShowResults={() => closeLive.mutate(live.data!.id)}
                              onGreat={celebrate}
                              onAskAgain={() => {
                                const it = slide.items.find((x) => x.key === liveSlot.key);
                                if (it) void ask(it, slide.id);
                              }}
                              onEnd={() => {
                                if (live.data?.status === 'open') closeLive.mutate(live.data.id);
                                setLiveSlot(null);
                              }}
                            />
                          ),
                        }
                      : undefined
                  }
                />
              </Scaled>
            </div>
            {showInk && (
              <div className="absolute inset-0 z-20">
                <InkSurface
                  strokes={note.strokes}
                  onCommit={(strokes) => editNote((d) => inkCommit(d, strokes))}
                  mode={tools.mode}
                  shape={tools.shape}
                  color={tools.color}
                  size={tools.size}
                  unitsWide={SLIDE_W}
                  penOnly={tools.penOnly}
                  onPen={tools.onPen}
                  active={drawing}
                  label="Drawing on the slide"
                />
              </div>
            )}
            <div className="absolute inset-x-0 top-0 z-30 h-1 bg-black/10">
              <div className="h-full bg-brand transition-[width] duration-500" style={{ width: `${((ix + 1) / slides.length) * 100}%` }} />
            </div>
          </div>
        )}
      </main>

      {drawing && (
        <div className="pointer-events-none fixed inset-x-0 bottom-[76px] z-40 flex justify-center px-3">
          <InkToolbar
            className="pointer-events-auto"
            tools={tools}
            onUndo={() => editNote(inkUndo)}
            onRedo={() => editNote(inkRedo)}
            onClear={() => editNote((d) => inkCommit(d, []))}
            canUndo={note.past.length > 0}
            canRedo={note.future.length > 0}
            canClear={note.strokes.length > 0}
          />
        </div>
      )}

      <footer className="border-t border-white/10 bg-[#0d0f18] px-3 py-3 text-white/80 sm:px-4">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <button type="button" disabled={atStart} onClick={prev} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 font-medium hover:bg-white/10 disabled:opacity-40">
            <ChevronLeft className="h-5 w-5" /> Back
          </button>
          <button type="button" onClick={() => setOverview(true)} className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-white/10" aria-label="Show all slides">
            <span className="tabular-nums">
              Slide {ix + 1} of {slides.length}
            </span>
            {build && maxStep > 0 && (
              <span className="flex items-center gap-1" aria-label={`Step ${step + 1} of ${maxStep + 1}`}>
                {Array.from({ length: maxStep + 1 }, (_, k) => (
                  <span key={k} className={cn('h-1.5 rounded-full transition-all', k <= step ? 'w-4 bg-brand-300' : 'w-1.5 bg-white/25')} />
                ))}
              </span>
            )}
            <span className="hidden truncate text-white/50 md:inline">· {slide.title}</span>
          </button>
          <button type="button" disabled={atEnd} onClick={next} className="inline-flex items-center gap-1 rounded-xl bg-brand px-4 py-2 font-medium text-brand-ink hover:bg-brand-700 disabled:opacity-40">
            Next <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </footer>

      {overview && (
        <div className="fixed inset-0 z-[45] overflow-y-auto bg-[#0d0f18]/95 p-6 text-white" role="dialog" aria-modal="true" aria-label="All slides">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <BookOpen className="h-5 w-5" /> {meta.title}
              </h2>
              <button type="button" className="rounded-lg p-2 hover:bg-white/10" onClick={() => setOverview(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {slides.map((s, k) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    goTo(k, 0, k >= ix ? 1 : -1);
                    setOverview(false);
                  }}
                  className={cn('aspect-video rounded-xl p-4 text-left ring-1 transition hover:-translate-y-0.5 hover:ring-brand-300', k === ix ? 'bg-brand/30 ring-brand-300' : 'bg-white/5 ring-white/10')}
                >
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white/50">
                    <span>{KIND_LABEL[s.kind]}</span>
                    <span>{k + 1}</span>
                  </div>
                  <div className="mt-2 line-clamp-3 font-display text-base font-semibold leading-snug">{s.title}</div>
                  {s.part && <div className="mt-1 text-xs text-white/50">Part {s.part.n}</div>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Whiteboard open={boardOpen} onClose={() => setBoardOpen(false)} tools={tools} lessonTitle={meta.title} boards={boards.data} onSave={(b) => saveBoard.mutateAsync(b)} keepKey={`${keepKey}:board`} />
      <PresentTimer open={timerOpen} onClose={() => setTimerOpen(false)} />
      <StudentPicker open={pickerOpen} onClose={() => setPickerOpen(false)} students={roster.data ?? []} onPicked={celebrate} />
      <Confetti fire={confetti} />
      {popup && slide.kind !== 'questions' && !overview && !boardOpen && !pickerOpen && !answering && (
        <QuestionPopup key={popup.id} question={popup} waiting={waiting.length} onAnswer={() => decide(popup, 'answered')} onSkip={() => decide(popup, 'skipped')} onLater={() => setSnoozed(new Set(waiting.map((q) => q.id)))} />
      )}
      {answering && <AnsweringView question={answering} onDone={() => setAnswering(null)} />}
      {blank && <button type="button" className="fixed inset-0 z-[70] cursor-default bg-black" onClick={() => setBlank(false)} aria-label="Show the slide again" />}
      <Modal
        open={fullHelp}
        onClose={() => setFullHelp(false)}
        title="Full screen on an iPad"
        footer={
          <>
            <Button variant="ghost" onClick={browserFull}>
              Use the browser's full screen anyway
            </Button>
            <Button onClick={() => setFullHelp(false)}>Got it</Button>
          </>
        }
      >
        <div className="space-y-3 text-[15px] text-ink-2">
          <p>On an iPad, the browser's full screen closes whenever the pencil or your hand moves down the screen, in Safari, Chrome and every other browser, and no website can switch that off.</p>
          <p className="font-medium text-ink">For a full screen that stays put while you write, open Gradileo as an app:</p>
          <ol className="list-decimal space-y-1.5 pl-5">
            <li>
              Tap the <strong>Share</strong> button (the square with an arrow), at the top of Safari or Chrome.
            </li>
            <li>
              Choose <strong>Add to Home Screen</strong>, then <strong>Add</strong>.
            </li>
            <li>Open Gradileo from your Home Screen and sign in once. It opens without the browser's bars, and the screen stays still.</li>
          </ol>
          <p>Until then, presenting without full screen works too: the slides stay put while you write.</p>
        </div>
      </Modal>
    </div>
  );
}
