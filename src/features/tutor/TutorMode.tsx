/**
 * A lesson taught by the AI tutor: the student presses Start and the tutor presents the lesson's
 * slides the way a teacher would, building each slide step by step and saying what to notice at
 * every step, in the device's voice with captions on screen. It stops at each "Your turn" question
 * for the student to answer and responds to the result, plays the explainer videos, and answers the
 * student's own questions at any point. The student can pause, go back, skip, mute or slow it down.
 *
 * The narration is written by the AI for runs of slides and saved on the server, so it is usually
 * ready at once; until it arrives (or if the AI is off) the tutor reads from the slide text.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Gauge, MessageCircleQuestion, Pause, Play, RotateCcw, Send, Settings2, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { lessonById, unitById } from '@engine/curriculum/index.ts';
import { offlineBeats, type TutorMessage } from '@engine/ai/tutor.ts';
import { usePublications, useResources, useVideoLinks } from '@/data/hooks.ts';
import { api } from '@/data/index.ts';
import { videosForLesson } from '@/content/videos.ts';
import { EmptyState, PageSpinner } from '@/components/ui/index.ts';
import { Markdown } from '@/components/math/Markdown.tsx';
import { bestVoice, hush, loadVoices, narrate, primeSpeech, rankVoice, speechSupported, type Narration } from '@/lib/speech.ts';
import { getItem, setItem } from '@/lib/storage.ts';
import { cn } from '@/lib/cn.ts';
import { useLessonContent } from '../lessons/LessonView.tsx';
import { buildSlides, lastStep, revealAt, type Slide } from '../lessons/slides.ts';
import { SlideView, type DeckLesson } from '../lessons/deck/SlideView.tsx';
import { SLIDE_H, SLIDE_W, useStageScale } from '../lessons/deck/fit.tsx';
import { Confetti } from '../lessons/deck/Confetti.tsx';
import type { CheckDetail } from '../lessons/LessonBlocks.tsx';
import { useStudentClass } from '../shared/useStudentClass.ts';
import { chunkSlides, slideText, tutorSlide } from './tutorSlides.ts';

const MUTED_KEY = 'gradileo-tutor-muted';
const RATE_KEY = 'gradileo-tutor-rate';
const VOICE_KEY = 'gradileo-tutor-voice';
const RATES = [0.85, 1, 1.15];

const PRAISE = ['That’s right, well done!', 'Yes, that’s correct. Great work!', 'Correct! Nicely done.', 'Spot on. Well done!'];

interface ChatEntry extends TutorMessage {
  /** Markdown for the screen; the tutor's answers have maths in it. */
  show?: string;
  error?: boolean;
}

/** Waits for the student at this step: a question to answer, a video to watch, an activity, or the end. */
function waitsAt(s: Slide, step: number, steps: string[]): boolean {
  if (s.kind === 'video' || s.kind === 'link' || s.kind === 'end') return true;
  return s.kind === 'check' && (steps[step] ?? '').startsWith('[YOUR TURN]');
}

export default function TutorMode() {
  const { lessonId = '' } = useParams();
  const navigate = useNavigate();
  const meta = lessonById(lessonId);
  const unit = meta ? unitById(meta.unitId) : undefined;
  const { content, error } = useLessonContent(lessonId);
  const { cls } = useStudentClass();
  const pubs = usePublications(cls?.id);
  const resources = useResources(cls?.id);
  const videoLinks = useVideoLinks();

  const lessonResources = useMemo(
    () =>
      (resources.data ?? [])
        .filter((r) => r.lessonId === lessonId && (r.kind === 'video' || r.kind === 'link') && r.url)
        .map((r) => ({ id: r.id, kind: r.kind as 'video' | 'link', url: r.url!, title: r.title })),
    [resources.data, lessonId],
  );
  const explainers = useMemo(() => {
    const parts = videosForLesson(lessonId);
    return parts.map((v, i) => ({ id: v.id, title: v.title, duration: v.duration, chapters: v.chapters.map((c) => c.title), part: i + 1, parts: parts.length, youtubeId: videoLinks.data?.[v.id] }));
  }, [lessonId, videoLinks.data]);
  const slides = useMemo(() => (content && meta ? buildSlides(content, meta.title, lessonResources, explainers) : []), [content, meta, lessonResources, explainers]);
  const tutorSlides = useMemo(() => slides.map(tutorSlide), [slides]);
  const unitLabel = unit ? `Unit ${unit.number} · ${unit.title}` : '';
  const deckLesson: DeckLesson | null = meta ? { number: meta.number, title: meta.title, unitLabel, objectives: meta.objectives, vocabulary: meta.vocabulary ?? [], minutes: meta.minutes } : null;

  // ------------------------------------------------------------ narration
  // What the tutor says at each step: the AI's words once they arrive, the slide's own words until then.
  const beats = useRef(new Map<string, string[]>());
  const [narrationSource, setNarrationSource] = useState<'minimax' | 'offline' | null>(null);
  const beatFor = useCallback(
    (ix: number, step: number) => {
      const s = tutorSlides[ix];
      if (!s) return '';
      return beats.current.get(s.id)?.[step] || offlineBeats(s, meta?.title ?? '')[step] || '';
    },
    [tutorSlides, meta?.title],
  );

  // ------------------------------------------------------------ voice settings
  const [muted, setMuted] = useState(() => getItem(MUTED_KEY) === 'on' || !speechSupported());
  const [rate, setRate] = useState(() => {
    const r = Number(getItem(RATE_KEY));
    return RATES.includes(r) ? r : 1;
  });
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState(() => getItem(VOICE_KEY) ?? '');
  useEffect(() => {
    let alive = true;
    void loadVoices().then((v) => alive && setVoices(v.filter((x) => rankVoice(x) >= 0).sort((a, b) => rankVoice(b) - rankVoice(a))));
    return () => {
      alive = false;
    };
  }, []);
  const voice = useMemo(() => voices.find((v) => v.name === voiceName) ?? bestVoice(voices), [voices, voiceName]);
  useEffect(() => setItem(MUTED_KEY, muted ? 'on' : 'off'), [muted]);
  useEffect(() => setItem(RATE_KEY, String(rate)), [rate]);
  useEffect(() => hush, []);

  // ------------------------------------------------------------ position and playback
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState({ ix: 0, step: 0 });
  const [waiting, setWaiting] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  // What the tutor is saying that is not the step itself: feedback on an answer, or an answer to a question.
  const [override, setOverride] = useState<string | null>(null);
  const [replay, setReplay] = useState(0);
  const [checked, setChecked] = useState<{ correct: boolean; detail: CheckDetail } | null>(null);
  const [confetti, setConfetti] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const ix = Math.min(pos.ix, Math.max(0, slides.length - 1));
  const slide: Slide | undefined = slides[ix];
  const maxStep = slide ? lastStep(slide) : 0;
  const step = Math.min(pos.step, maxStep);
  const posRef = useRef({ ix, step });
  posRef.current = { ix, step };

  const goTo = useCallback(
    (k: number, at = 0) => {
      if (k < 0 || k >= slides.length) return;
      setPos({ ix: k, step: at });
      setWaiting(false);
      setChecked(null);
    },
    [slides.length],
  );
  const advance = useCallback(() => {
    const { ix: i, step: st } = posRef.current;
    const s = slides[i];
    if (!s) return;
    if (st < lastStep(s)) {
      setPos({ ix: i, step: st + 1 });
      setWaiting(false);
    } else goTo(i + 1, 0);
  }, [slides, goTo]);
  const back = useCallback(() => {
    const { ix: i, step: st } = posRef.current;
    if (st > 0) {
      setPos({ ix: i, step: st - 1 });
      setWaiting(false);
    } else if (i > 0) goTo(i - 1, lastStep(slides[i - 1]));
  }, [slides, goTo]);

  // Speaks the step on screen, then moves on, or waits when the student has something to do.
  const run = useRef(0);
  const current = useRef<Narration | null>(null);
  const say = useCallback(
    (text: string, then?: () => void, aside = true) => {
      const token = ++run.current;
      current.current?.stop();
      setOverride(aside ? text : null);
      setSpeaking(true);
      const n = narrate(text, { voice, rate, muted });
      current.current = n;
      void n.done.then((read) => {
        if (run.current !== token) return;
        setSpeaking(false);
        if (read) then?.();
      });
    },
    [voice, rate, muted],
  );
  useEffect(() => {
    if (!started || !playing || !slide || chatOpen) return;
    const steps = tutorSlides[ix]?.steps ?? [];
    let timer: ReturnType<typeof setTimeout> | undefined;
    say(
      beatFor(ix, step),
      () => {
        if (waitsAt(slide, step, steps)) {
          setWaiting(true);
          if (slide.kind === 'end') setPlaying(false);
          return;
        }
        timer = setTimeout(advance, 650);
      },
      false,
    );
    return () => {
      clearTimeout(timer);
      run.current++;
      current.current?.stop();
      setSpeaking(false);
    };
    // The narration map is read at speaking time, so a script arriving does not restart the step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, playing, chatOpen, ix, step, replay, voice, rate, muted]);

  // A new step shows its own words (even when paused, so the student can read them).
  useEffect(() => setOverride(null), [ix, step]);

  // The tutor answers a checked question, then carries on (or helps, when it was wrong).
  const onCheckResult = useCallback(
    (correct: boolean, detail: CheckDetail) => {
      setChecked({ correct, detail });
      setWaiting(true);
      if (correct) {
        setConfetti((c) => c + 1);
        say(`${PRAISE[Math.floor(Math.random() * PRAISE.length)]} Let’s keep going.`, () => {
          if (playing) setTimeout(advance, 600);
        });
      } else {
        say('Not quite, and that’s okay: mistakes are how we learn. Look at the solution, try another question, or ask me to explain where it went wrong. Press Continue when you’re ready.');
      }
    },
    [say, advance, playing],
  );

  // ------------------------------------------------------------ the AI's narration
  useEffect(() => {
    if (!meta || !tutorSlides.length) return;
    let alive = true;
    const chunks = chunkSlides(tutorSlides);
    // The run with the current slide first, then the rest in order.
    const first = Math.max(0, chunks.findIndex((c) => c.some((s) => s.id === tutorSlides[posRef.current.ix]?.id)));
    const order = [first, ...chunks.map((_, k) => k).filter((k) => k !== first)];
    void (async () => {
      for (const k of order) {
        if (!alive) return;
        const res = await api()
          .tutorScript(lessonId, { lessonTitle: meta.title, unit: unitLabel, slides: chunks[k] })
          .catch(() => null);
        if (!alive || !res) continue;
        for (const s of res.script.slides) beats.current.set(s.id, s.beats);
        setNarrationSource((was) => (was === 'minimax' || res.source === 'minimax' ? 'minimax' : 'offline'));
      }
    })();
    return () => {
      alive = false;
    };
  }, [lessonId, meta, unitLabel, tutorSlides]);

  // ------------------------------------------------------------ asking the tutor
  const [chat, setChat] = useState<ChatEntry[]>([]);
  const [draft, setDraft] = useState('');
  const [asking, setAsking] = useState(false);
  const ask = useCallback(
    async (question: string) => {
      const q = question.trim();
      if (!q || !slide || !meta) return;
      setChatOpen(true);
      setDraft('');
      const history = chat.filter((m) => !m.error).slice(-6).map(({ role, text }) => ({ role, text }));
      setChat((c) => [...c, { role: 'student', text: q }]);
      setAsking(true);
      try {
        const res = await api().askTutor({ lessonTitle: meta.title, unit: unitLabel, slideTitle: slide.title, slideText: slideText(slide), question: q, history });
        setChat((c) => [...c, { role: 'tutor', text: res.answer.say, show: res.answer.show }]);
        say(res.answer.say);
      } catch (e) {
        setChat((c) => [...c, { role: 'tutor', text: (e as Error).message, error: true }]);
      } finally {
        setAsking(false);
      }
    },
    [slide, meta, unitLabel, chat, say],
  );
  const explainMistake = () => {
    if (!checked) return;
    void ask(`I tried the "Your turn" question: ${checked.detail.prompt}\nI answered: ${checked.detail.answer || '(nothing)'}\nThe correct answer is: ${checked.detail.expected}\nCan you explain how to get it and where I went wrong?`);
  };

  const exit = useCallback(() => {
    hush();
    navigate(`/s/learn/${lessonId}`);
  }, [navigate, lessonId]);

  // ------------------------------------------------------------ keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.('input, textarea, select, [contenteditable="true"], .deck-check')) return;
      if (e.ctrlKey || e.metaKey || e.altKey || !started) return;
      if (e.key === ' ' && t?.tagName !== 'BUTTON') {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.key === 'ArrowRight') advance();
      else if (e.key === 'ArrowLeft') back();
      else if (e.key === 'Escape') {
        if (chatOpen) setChatOpen(false);
        else exit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [started, advance, back, chatOpen, exit]);

  const [stageRef, scale] = useStageScale(16);

  if (pubs.isLoading) return <PageSpinner />;
  // Like the lesson page: a class's students see the lessons their teacher has published.
  if (!meta || !deckLesson || !(pubs.data ?? []).some((p) => p.lessonId === lessonId)) return <EmptyState title="This lesson isn’t available yet" />;
  if (error) return <div className="p-8 text-ink-3">{error}</div>;
  if (!content || !slide) return <PageSpinner label="Getting your lesson ready…" />;

  const atEnd = ix === slides.length - 1;
  const endActions = (
    <>
      <button type="button" onClick={() => navigate(`/s/practice?skills=${meta.skills.join(',')}`)} className="rounded-2xl bg-white px-8 py-4 text-[24px] font-semibold text-spotlight hover:bg-white/90">
        Practise this lesson
      </button>
      <button type="button" onClick={exit} className="rounded-2xl px-8 py-4 text-[24px] font-semibold text-white ring-2 ring-white/40 hover:bg-white/10">
        Back to the lesson
      </button>
    </>
  );

  return (
    <div className="flex h-[100dvh] flex-col bg-[#0d0f18]">
      <header className="flex items-center justify-between gap-3 border-b border-line bg-surface px-3 py-2 sm:px-4">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 shrink-0 text-brand" />
          <span className="truncate">
            <span className="font-semibold">Lesson with your AI tutor</span>
            <span className="hidden text-ink-3 sm:inline"> · {meta.title}</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={() => setChatOpen((o) => !o)} aria-pressed={chatOpen} aria-label="Ask your tutor" className={cn('inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-ink-2 hover:bg-surface-2', chatOpen && 'bg-brand-100 text-brand-800')}>
            <MessageCircleQuestion className="h-4 w-4" /> <span className="hidden sm:inline">Ask your tutor</span>
          </button>
          <button type="button" onClick={() => setSettingsOpen((o) => !o)} aria-pressed={settingsOpen} aria-label="Voice settings" className={cn('rounded-lg p-2 text-ink-2 hover:bg-surface-2', settingsOpen && 'bg-brand-100 text-brand-800')}>
            <Settings2 className="h-5 w-5" />
          </button>
          <button type="button" onClick={exit} aria-label="Leave the lesson" className="rounded-lg p-2 text-ink-2 hover:bg-surface-2">
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <main ref={stageRef} className="relative flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden">
          {scale > 0 && (
            <div className="relative overflow-hidden rounded-md shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)]" style={{ width: SLIDE_W * scale, height: SLIDE_H * scale }} aria-roledescription="slide" aria-label={`Slide ${ix + 1} of ${slides.length}: ${slide.title}`}>
              <div key={slide.id} className="tx tx-fade-in absolute inset-0">
                <div style={{ width: SLIDE_W, height: SLIDE_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                  <SlideView slide={slide} reveal={revealAt(slide, step)} index={ix} total={slides.length} lesson={deckLesson} onCheckResult={onCheckResult} endActions={endActions} />
                </div>
              </div>
            </div>
          )}
          {!started && <StartCard title={meta.title} muted={muted} onMuted={setMuted} onStart={() => (primeSpeech(), setStarted(true), setPlaying(true))} />}
        </main>

        {chatOpen && (
          <aside className="absolute inset-y-0 right-0 z-20 flex w-full max-w-md flex-col border-l border-line bg-surface sm:static" aria-label="Ask your tutor">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-2 font-semibold">
                <Sparkles className="h-4 w-4 text-brand" /> Ask your tutor
              </div>
              <button type="button" onClick={() => setChatOpen(false)} aria-label="Close" className="rounded-lg p-1.5 text-ink-3 hover:bg-surface-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
              {chat.length === 0 && <p className="text-sm text-ink-3">Stuck on something? Ask about anything on this slide, like “Why do we divide here?” or “Can you show another example?”. The lesson waits while we talk.</p>}
              {chat.map((m, k) => (
                <div key={k} className={cn('max-w-[90%] rounded-2xl px-3.5 py-2.5 text-[15px] leading-relaxed', m.role === 'student' ? 'ml-auto bg-brand text-brand-ink' : m.error ? 'bg-bad-soft text-bad-ink' : 'bg-surface-2 text-ink')}>
                  {m.role === 'tutor' && m.show ? <Markdown md={m.show} sanitize /> : <span className="whitespace-pre-wrap">{m.text}</span>}
                </div>
              ))}
              {asking && <div className="w-16 animate-pulse rounded-2xl bg-surface-2 px-3.5 py-2.5 text-ink-3">…</div>}
            </div>
            <form
              className="flex items-end gap-2 border-t border-line p-3"
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                void ask(draft);
              }}
            >
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, 500))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void ask(draft);
                  }
                }}
                rows={2}
                placeholder="Type your question…"
                aria-label="Your question"
                className="min-h-[44px] flex-1 resize-none rounded-xl border border-line bg-surface px-3 py-2 text-[15px] outline-none focus:border-brand"
              />
              <button type="submit" disabled={!draft.trim() || asking} aria-label="Send" className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-brand-ink disabled:opacity-40">
                <Send className="h-5 w-5" />
              </button>
            </form>
            <div className="border-t border-line px-3 py-2">
              <button type="button" onClick={() => (setChatOpen(false), setPlaying(true))} className="w-full rounded-xl px-3 py-2 text-sm font-semibold text-brand hover:bg-brand-50">
                Continue the lesson
              </button>
            </div>
          </aside>
        )}

        {settingsOpen && (
          <div className="absolute right-3 top-3 z-30 w-72 rounded-2xl border border-line bg-surface p-4 shadow-pop" role="dialog" aria-label="Voice settings">
            <div className="mb-3 flex items-center justify-between font-semibold">
              Voice
              <button type="button" onClick={() => setSettingsOpen(false)} aria-label="Close" className="rounded-lg p-1 text-ink-3 hover:bg-surface-2">
                <X className="h-4 w-4" />
              </button>
            </div>
            {speechSupported() ? (
              <label className="block text-sm text-ink-2">
                Tutor’s voice
                <select value={voice?.name ?? ''} onChange={(e) => (setVoiceName(e.target.value), setItem(VOICE_KEY, e.target.value))} className="mt-1 w-full rounded-lg border border-line bg-surface px-2 py-1.5 text-sm">
                  {voices.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <p className="text-sm text-ink-3">This device has no voice, so your tutor shows its words on screen.</p>
            )}
            <div className="mt-3 text-sm text-ink-2">Speed</div>
            <div className="mt-1 grid grid-cols-3 gap-1">
              {RATES.map((r) => (
                <button key={r} type="button" onClick={() => setRate(r)} aria-pressed={rate === r} className={cn('rounded-lg px-2 py-1.5 text-sm', rate === r ? 'bg-brand text-brand-ink' : 'bg-surface-2 text-ink-2 hover:bg-surface-3')}>
                  {r < 1 ? 'Slower' : r > 1 ? 'Faster' : 'Normal'}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-3">{narrationSource === 'minimax' ? 'Your tutor’s words are written by AI for this lesson.' : narrationSource === 'offline' ? 'The AI is not available right now, so your tutor reads from the lesson.' : 'Getting your tutor’s words ready…'}</p>
          </div>
        )}
      </div>

      <footer className="border-t border-white/10 bg-[#0d0f18] px-3 py-3 text-white sm:px-4">
        <div className="mx-auto flex max-w-6xl items-start gap-3">
          <div className={cn('relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-brand-ink', speaking && 'ring-4 ring-brand/40')} aria-hidden="true">
            <Sparkles className="h-5 w-5" />
            {speaking && <span className="absolute inset-0 animate-ping rounded-full bg-brand/30" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="line-clamp-3 min-h-[1.5rem] text-[15px] leading-relaxed text-white/90 sm:text-base" aria-live="polite">
              {started ? (override ?? beatFor(ix, step)) : 'Press Start and your tutor will take you through the lesson.'}
            </p>
            {started && waiting && (
              <div className="mt-2 flex flex-wrap gap-2">
                {checked && !checked.correct && (
                  <TutorButton onClick={explainMistake} icon={<MessageCircleQuestion className="h-4 w-4" />}>
                    Explain my mistake
                  </TutorButton>
                )}
                {!atEnd && (
                  <TutorButton primary onClick={() => (setPlaying(true), advance())} icon={<ChevronRight className="h-4 w-4" />}>
                    {slide.kind === 'check' && !checked ? 'Skip this question' : 'Continue'}
                  </TutorButton>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto mt-2 flex max-w-6xl items-center gap-1">
          <ControlButton label="Back" onClick={back} disabled={!started || (ix === 0 && step === 0)}>
            <ChevronLeft className="h-5 w-5" />
          </ControlButton>
          <ControlButton label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying((p) => !p)} disabled={!started} big>
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </ControlButton>
          <ControlButton label="Next" onClick={advance} disabled={!started || (atEnd && step >= maxStep)}>
            <ChevronRight className="h-5 w-5" />
          </ControlButton>
          <ControlButton label="Say that again" onClick={() => (setPlaying(true), setReplay((r) => r + 1))} disabled={!started}>
            <RotateCcw className="h-4 w-4" />
          </ControlButton>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2 text-sm text-white/60">
            <span className="tabular-nums">
              {ix + 1} / {slides.length}
            </span>
            {maxStep > 0 && (
              <span className="hidden items-center gap-1 sm:flex" aria-label={`Step ${step + 1} of ${maxStep + 1}`}>
                {Array.from({ length: maxStep + 1 }, (_, k) => (
                  <span key={k} className={cn('h-1.5 rounded-full transition-all', k <= step ? 'w-4 bg-brand-300' : 'w-1.5 bg-white/25')} />
                ))}
              </span>
            )}
          </div>
          <ControlButton label={rate < 1 ? 'Speed: slower' : rate > 1 ? 'Speed: faster' : 'Speed: normal'} onClick={() => setRate((r) => RATES[(RATES.indexOf(r) + 1) % RATES.length])}>
            <Gauge className="h-4 w-4" />
          </ControlButton>
          <ControlButton label={muted ? 'Turn the voice on' : 'Turn the voice off'} onClick={() => setMuted((m) => !m)} disabled={!speechSupported()}>
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </ControlButton>
        </div>
      </footer>
      <Confetti fire={confetti} />
    </div>
  );
}

function StartCard({ title, muted, onMuted, onStart }: { title: string; muted: boolean; onMuted: (m: boolean) => void; onStart: () => void }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0d0f18]/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-surface p-6 text-center shadow-pop">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-ink">
          <Sparkles className="h-7 w-7" />
        </div>
        <h1 className="mt-4 font-display text-xl font-semibold">{title}</h1>
        <p className="mt-2 text-[15px] text-ink-2">Your AI tutor will teach this lesson step by step{muted ? ', with its words on screen' : ', out loud'}. Pause, go back or ask a question whenever you like, and try each “Your turn” question when it comes.</p>
        {speechSupported() && (
          <label className="mt-4 inline-flex items-center gap-2 text-sm text-ink-2">
            <input type="checkbox" checked={!muted} onChange={(e) => onMuted(!e.target.checked)} className="h-4 w-4 accent-[rgb(var(--brand))]" />
            Read the lesson aloud
          </label>
        )}
        <button type="button" onClick={onStart} autoFocus className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-base font-semibold text-brand-ink hover:bg-brand-700">
          <Play className="h-5 w-5" /> Start the lesson
        </button>
      </div>
    </div>
  );
}

function ControlButton({ label, onClick, disabled, big, children }: { label: string; onClick: () => void; disabled?: boolean; big?: boolean; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} title={label} className={cn('inline-flex items-center justify-center rounded-xl text-white/85 hover:bg-white/10 disabled:opacity-35', big ? 'h-11 w-11 bg-white/10' : 'h-10 w-10')}>
      {children}
    </button>
  );
}

function TutorButton({ onClick, icon, primary, children }: { onClick: () => void; icon: ReactNode; primary?: boolean; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={cn('inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-semibold', primary ? 'bg-brand text-brand-ink hover:bg-brand-700' : 'bg-white/10 text-white hover:bg-white/15')}>
      {icon}
      {children}
    </button>
  );
}
