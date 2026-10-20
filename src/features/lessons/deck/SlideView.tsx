/**
 * One slide of the deck, drawn at SLIDE_W × SLIDE_H and scaled by the stage. Each kind of slide
 * has its own layout, and items appear with their own effect as the teacher steps through.
 * Interactive checks are the same activities as on the lesson page.
 */
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { AlertTriangle, BookMarked, CheckCircle2, Clock, ExternalLink, Eye, EyeOff, Info, Lightbulb, ListChecks, PartyPopper, PlayCircle, Smartphone, Sparkles, Target } from 'lucide-react';
import type { Block } from '@/content/lessonParser.ts';
import { skillInfo } from '@engine/curriculum/index.ts';
import { Markdown } from '@/components/math/Markdown.tsx';
import { Figure } from '@/components/figures/Figure.tsx';
import { cn } from '@/lib/cn.ts';
import { CheckBlock, VideoEmbed, type CheckDetail } from '../LessonBlocks.tsx';
import { activityEmbedUrl, fixedSlide, type ItemReveal, type Slide, type SlideExplainer, type SlideItem } from '../slides.ts';
import { FitContent, SLIDE_H, SLIDE_W } from './fit.tsx';

const minutes = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

/**
 * A lesson's explainer video on its slide: YouTube's player with its own play, pause and full
 * screen controls, and our captions on from the start. Moving to another slide stops it.
 */
function ExplainerEmbed({ video, still }: { video: SlideExplainer; still?: boolean }) {
  const id = encodeURIComponent(video.youtubeId ?? '');
  return (
    <div className="overflow-hidden rounded-[28px] border border-line bg-black">
      <div className="relative aspect-video">
        {still ? (
          // The overview and transitions show the video's thumbnail instead of a player.
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        ) : (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1&cc_load_policy=1&cc_lang_pref=en`}
            title={video.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        )}
      </div>
      <div className="flex items-center gap-3 bg-surface px-6 py-3 text-[22px] font-medium text-ink-2">
        <PlayCircle className="h-7 w-7 text-brand" />
        <span>
          Explainer video{video.parts > 1 ? ` · Part ${video.part} of ${video.parts}` : ''} · {minutes(video.duration)}
        </span>
      </div>
    </div>
  );
}

export interface DeckLesson {
  number: string;
  title: string;
  unitLabel: string;
  objectives: string[];
  vocabulary: string[];
  minutes: number;
}

interface Props {
  slide: Slide;
  reveal: ItemReveal[];
  index: number;
  total: number;
  lesson: DeckLesson;
  /** A copy leaving the screen during a transition: not interactive. */
  still?: boolean;
  editing?: boolean;
  hidden?: ReadonlySet<string>;
  onToggle?: (blockKeys: string[], hide: boolean) => void;
  onCheckResult?: (correct: boolean, detail: CheckDetail) => void;
  endActions?: ReactNode;
  /** Wait before the first items build in, so they arrive after the slide transition. */
  enterDelay?: number;
  /** Sends a question on this slide to the students' devices. */
  onAsk?: (it: SlideItem) => void;
  /** The live question running on this slide, shown in place of its question. */
  live?: { key: string; node: ReactNode };
  /** What the class asked, on the "Questions" slide. */
  questions?: ReactNode;
}

const ACCENT: Record<Slide['kind'], string> = {
  title: 'var(--brand)',
  hook: 'var(--brand)',
  content: 'var(--brand)',
  example: 'var(--info)',
  check: 'var(--accent)',
  summary: 'var(--good)',
  video: 'var(--brand)',
  link: 'var(--brand)',
  questions: 'var(--info)',
  end: 'var(--brand)',
};

const CALLOUT = {
  definition: { icon: BookMarked, label: 'Definition', box: 'border-brand-200 bg-brand-50', tint: 'text-brand-700', fx: 'fx-zoom' },
  tip: { icon: Lightbulb, label: 'Tip', box: 'border-info/30 bg-info-soft', tint: 'text-info', fx: 'fx-rise' },
  mistake: { icon: AlertTriangle, label: 'Watch out', box: 'border-warn/40 bg-warn-soft', tint: 'text-warn', fx: 'fx-alert' },
  note: { icon: Info, label: 'Note', box: 'border-line bg-surface-2', tint: 'text-ink-3', fx: 'fx-rise' },
  summary: { icon: ListChecks, label: 'Summary', box: 'border-good/30 bg-good-soft', tint: 'text-good', fx: 'fx-rise' },
} as const;

const GLYPHS = ['π', '√', 'θ', 'Σ', 'Δ', '∞', '÷', '≈', '%', 'x²'];

/** Diagrams drawn beside the text; wide ones (number lines, tables, rulers) run across the slide. */
const SIDE_FIGURES = new Set(['plane', 'rightTriangle', 'twoTriangles', 'solid', 'cubes', 'circleGraph', 'barChart']);
const besideText = (b: Block) => b.type === 'figure' && SIDE_FIGURES.has(b.figure.type);

/** The entrance effect for an item, chosen by what it is. */
function effectOf(b: Block): string {
  switch (b.type) {
    case 'md':
      if (/^\s*([-*+]|\d+[.)])\s/.test(b.md)) return 'fx-fly';
      if (/^\s*\|/.test(b.md)) return 'fx-wipe';
      if (/^\s*\$\$/.test(b.md)) return 'fx-zoom';
      return 'fx-rise';
    case 'callout':
      return CALLOUT[b.variant].fx;
    case 'figure':
    case 'video':
      return 'fx-zoom';
    default:
      return 'fx-rise';
  }
}

export function SlideView({ slide, reveal, index, total, lesson, still, editing, hidden, onToggle, onCheckResult, endActions, enterDelay = 0, onAsk, live, questions }: Props) {
  // Items already showing when the slide arrives build in one after another.
  const entering = useRef(true);
  const mountOrder = useRef<Map<number, number> | null>(null);
  if (!mountOrder.current) {
    mountOrder.current = new Map();
    let n = 0;
    reveal.forEach((r, k) => r.visible && mountOrder.current!.set(k, n++));
  }
  useEffect(() => {
    const t = setTimeout(() => (entering.current = false), enterDelay + 1500);
    return () => clearTimeout(t);
  }, [enterDelay]);
  const delay = (k: number, sub = 0): CSSProperties | undefined => {
    if (!entering.current) return undefined;
    const order = mountOrder.current!.get(k);
    return order === undefined ? undefined : { animationDelay: `${enterDelay + (order + sub) * 120}ms` };
  };
  const anim = (visible: boolean, fx: string) => (visible ? `build-in ${fx}` : 'build-wait');

  const style = { width: SLIDE_W, height: SLIDE_H, '--deck-accent': ACCENT[slide.kind] } as CSSProperties;
  const accent = 'rgb(var(--deck-accent))';
  const isHidden = (it: SlideItem) => !!hidden?.has(it.blockKey);

  /** Hide/show control on the first item of each lesson block, while choosing what to show. */
  const hasToggle = (it: SlideItem, k: number) => !!editing && !!onToggle && !fixedSlide(slide) && slide.items.findIndex((x) => x.blockKey === it.blockKey) === k;
  const toggle = (it: SlideItem, k: number) => {
    if (!hasToggle(it, k)) return null;
    const off = isHidden(it);
    return (
      <button
        type="button"
        onClick={() => onToggle?.([it.blockKey], !off)}
        className={cn('absolute right-0 top-0 z-10 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[20px] font-semibold shadow-card', off ? 'border-brand-300 bg-brand text-brand-ink' : 'border-line bg-surface text-ink-2 hover:bg-surface-2')}
      >
        {off ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
        {off ? 'Show on slides' : 'Hide'}
      </button>
    );
  };

  const wrap = (it: SlideItem, k: number, node: ReactNode, fx: string, className?: string) => {
    const r = reveal[k] ?? { visible: true, shown: 0 };
    return (
      <div key={it.key} className={cn('relative', anim(r.visible, fx), editing && hasToggle(it, k) && 'pt-12', className)} style={r.visible ? delay(k) : undefined}>
        {toggle(it, k)}
        {/* Dimmed on an inner element: the entrance animation ends at full opacity. */}
        <div className={cn(editing && isHidden(it) && 'opacity-35')}>{node}</div>
      </div>
    );
  };

  const textItem = (it: SlideItem, k: number): ReactNode => {
    const b = it.block;
    if (b.type === 'md') return wrap(it, k, <div className="deck-text"><Markdown md={b.md} /></div>, effectOf(b));
    if (b.type === 'callout') {
      const c = CALLOUT[b.variant];
      return wrap(
        it,
        k,
        <div className={cn('rounded-[28px] border-2 px-9 py-7', c.box)}>
          <div className="mb-3 flex items-center gap-3 text-[24px] font-semibold">
            <c.icon className={cn('h-8 w-8', c.tint)} />
            <span>{b.title ? <Markdown md={b.title} inline /> : c.label}</span>
          </div>
          <div className="deck-text">
            <Markdown md={b.md} />
          </div>
        </div>,
        c.fx,
      );
    }
    return visualItem(it, k);
  };

  const visualItem = (it: SlideItem, k: number): ReactNode => {
    const b = it.block;
    if (b.type === 'figure') return wrap(it, k, <div style={{ zoom: 1.35 }}><Figure fig={b.figure} className="border-0 bg-transparent" /></div>, 'fx-zoom');
    if (b.type === 'video' && slide.explainer) return wrap(it, k, <ExplainerEmbed video={slide.explainer} still={still} />, 'fx-zoom');
    if (b.type === 'video') return wrap(it, k, still ? <div className="aspect-video rounded-[28px] bg-black/80" /> : <VideoEmbed url={b.url} title={b.title} />, 'fx-zoom');
    return textItem(it, k);
  };

  const exampleItem = (it: SlideItem, k: number) => {
    const b = it.block;
    if (b.type !== 'example') return null;
    const r = reveal[k] ?? { visible: true, shown: b.steps.length + 1 };
    const stepDelay = (i: number) => (r.visible ? delay(k, i + 1) : undefined);
    return (
      <div key={it.key} className={cn('relative grid grid-cols-[0.9fr_1.1fr] gap-12', editing && isHidden(it) && '[&>*:not(button)]:opacity-35', hasToggle(it, k) && 'pt-12')}>
        {toggle(it, k)}
        <div className="space-y-6">
          {slide.items.map((f, j) =>
            j < k && f.block.type === 'figure' ? (
              <div key={f.key} className={anim(reveal[j]?.visible ?? true, 'fx-zoom')} style={reveal[j]?.visible ? delay(j) : undefined}>
                <div style={{ zoom: 1.2 }}>
                  <Figure fig={f.block.figure} className="border-0 bg-transparent" />
                </div>
              </div>
            ) : null,
          )}
          <div className={cn('rounded-[28px] bg-surface-2 px-9 py-8', anim(r.visible, 'fx-rise'))} style={r.visible ? delay(k) : undefined}>
            <div className="mb-3 text-[20px] font-semibold uppercase tracking-[0.16em] text-ink-3">Problem</div>
            <div className="deck-text">
              <Markdown md={b.problem} />
            </div>
          </div>
        </div>
        <ol className="space-y-5">
          {b.steps.map((s, i) => {
            const on = r.visible && r.shown > i;
            return (
              <li key={i} className={cn('flex gap-5', anim(on, 'fx-fly'))} style={on ? stepDelay(i) : undefined}>
                <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[22px] font-bold text-white" style={{ background: accent }}>
                  {i + 1}
                </span>
                <div className="deck-text min-w-0 flex-1 pt-1">
                  <Markdown md={s} />
                </div>
              </li>
            );
          })}
          {b.answer && (
            <li className={cn('flex items-start gap-4 rounded-[24px] bg-good-soft px-7 py-5', anim(r.visible && r.shown > b.steps.length, 'fx-pop'))} style={r.visible && r.shown > b.steps.length ? stepDelay(b.steps.length) : undefined}>
              <CheckCircle2 className="mt-1.5 h-9 w-9 shrink-0 text-good" />
              <div className="deck-text min-w-0 flex-1">
                <Markdown md={b.answer} />
              </div>
            </li>
          )}
        </ol>
      </div>
    );
  };

  const checkItem = (it: SlideItem, k: number, pair: boolean) => {
    const b = it.block;
    if (b.type !== 'check') return null;
    return wrap(
      it,
      k,
      still ? (
        <div className="rounded-[28px] border-2 border-dashed border-line-strong p-10 text-[26px] text-ink-3">{skillInfo(b.skillId)?.name ?? 'Your turn'}</div>
      ) : live?.key === it.key ? (
        live.node
      ) : (
        <>
          <div className="deck-check" style={{ zoom: pair ? 1.4 : 1.6 }}>
            <CheckBlock skillId={b.skillId} difficulty={b.difficulty} onResult={onCheckResult} />
          </div>
          {onAsk && !editing && (
            <div className="mt-6 flex justify-end">
              <button type="button" onClick={() => onAsk(it)} className="inline-flex items-center gap-3 rounded-2xl bg-brand px-7 py-4 text-[24px] font-semibold text-brand-ink shadow-card hover:bg-brand-700">
                <Smartphone className="h-7 w-7" /> Ask the class on their devices
              </button>
            </div>
          )}
        </>
      ),
      'fx-rise',
    );
  };

  // ------------------------------------------------------------------ title and end slides
  if (slide.kind === 'title' || slide.kind === 'end') {
    const end = slide.kind === 'end';
    return (
      <div className="deck-slide relative overflow-hidden text-white" style={{ ...style, background: 'linear-gradient(135deg, rgb(var(--spotlight)) 0%, rgb(var(--spotlight)) 50%, rgb(var(--spotlight-glow)) 135%)' }}>
        <div className="absolute -right-48 -top-48 h-[720px] w-[720px] rounded-full bg-white/[0.06]" />
        <div className="absolute -bottom-64 left-[38%] h-[560px] w-[560px] rounded-full bg-white/[0.05]" />
        {GLYPHS.map((g, i) => (
          <span key={g} className="deck-float absolute select-none font-display font-semibold text-white/[0.09]" style={{ left: `${(i * 97) % 92}%`, top: `${(i * 53 + 7) % 86}%`, fontSize: 70 + ((i * 37) % 80), animationDelay: `${-i * 0.9}s` }} aria-hidden="true">
            {g}
          </span>
        ))}
        <div className="relative grid h-full grid-cols-[1.2fr_1fr] items-center gap-16 px-[110px] py-[80px]">
          <div>
            <div className={cn('build-in fx-rise text-[24px] font-semibold uppercase tracking-[0.2em] text-spotlight-accent')} style={{ animationDelay: `${enterDelay}ms` }}>
              {end ? 'Well done' : lesson.unitLabel}
            </div>
            <h1 className="build-in fx-rise mt-6 font-display text-[84px] font-semibold leading-[1.04]" style={{ animationDelay: `${enterDelay + 120}ms` }}>
              {end ? (
                <span className="inline-flex items-center gap-6">
                  Lesson complete <PartyPopper className="h-20 w-20 text-spotlight-accent" />
                </span>
              ) : (
                lesson.title
              )}
            </h1>
            <div className="build-in fx-rise mt-8 flex flex-wrap items-center gap-4 text-[22px] text-white/80" style={{ animationDelay: `${enterDelay + 240}ms` }}>
              <span className="rounded-full bg-white/15 px-5 py-2 font-semibold text-white">Lesson {lesson.number}</span>
              {!end && (
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-6 w-6" /> {lesson.minutes} min
                </span>
              )}
              {end && <span>{lesson.title}</span>}
            </div>
            {!end && lesson.vocabulary.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-3">
                {lesson.vocabulary.slice(0, 10).map((v, i) => (
                  <span key={v} className="build-in fx-pop rounded-full bg-white/[0.12] px-4 py-2 text-[20px] font-medium ring-1 ring-white/25" style={{ animationDelay: `${enterDelay + 420 + i * 70}ms` }}>
                    {v}
                  </span>
                ))}
              </div>
            )}
            {end && endActions && <div className="build-in fx-rise mt-12 flex flex-wrap gap-4" style={{ animationDelay: `${enterDelay + 400}ms` }}>{endActions}</div>}
          </div>
          <div className="build-in fx-zoom rounded-[36px] bg-white/10 p-12 ring-1 ring-white/20 backdrop-blur-sm" style={{ animationDelay: `${enterDelay + 200}ms` }}>
            <div className="mb-6 flex items-center gap-3 text-[24px] font-semibold text-spotlight-accent">
              <Target className="h-8 w-8" /> {end ? 'You can now' : 'By the end of this lesson you can'}
            </div>
            <ul className="space-y-5">
              {lesson.objectives.map((o, i) => (
                <li key={o} className={cn('build-in flex gap-4 text-[27px] leading-snug', end ? 'fx-pop' : 'fx-fly')} style={{ animationDelay: `${enterDelay + 400 + i * 160}ms` }}>
                  <CheckCircle2 className={cn('mt-1 h-8 w-8 shrink-0', end ? 'text-good' : 'text-spotlight-accent')} />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------ every other slide
  const eyebrow = slide.kind === 'example' ? 'Worked example' : slide.kind === 'check' ? 'Your turn' : slide.kind === 'summary' ? 'Key takeaways' : slide.kind === 'video' ? 'Video' : slide.kind === 'link' ? 'Explore' : slide.kind === 'questions' ? 'From the class' : slide.kind === 'hook' ? 'Let’s begin' : slide.part ? `Part ${slide.part.n} of ${slide.part.of}` : '';
  const title = slide.kind === 'check' ? (slide.items.filter((x) => x.block.type === 'check').length > 1 ? 'Try these on your own' : 'Try this on your own') : slide.title;
  const allHidden = editing && !fixedSlide(slide) && slide.items.length > 0 && slide.items.every(isHidden);

  let body: ReactNode;
  if (slide.kind === 'example') {
    // Text before the worked example introduces it; a figure before it is drawn beside its problem;
    // a warning or tip after it sits underneath.
    const firstExample = slide.items.findIndex((x) => x.block.type === 'example');
    body = (
      <div className="space-y-8">
        {slide.items.map((it, k) => (it.block.type === 'example' ? exampleItem(it, k) : firstExample >= 0 && k < firstExample && it.block.type === 'figure' ? null : textItem(it, k)))}
      </div>
    );
  } else if (slide.kind === 'check') {
    const checks = slide.items.filter((x) => x.block.type === 'check').length;
    body = <div className="space-y-8">{slide.items.map((it, k) => (it.block.type === 'check' ? checkItem(it, k, checks > 1) : textItem(it, k)))}</div>;
  } else if (slide.kind === 'summary') {
    body = (
      <ul className="space-y-6">
        {slide.items.map((it, k) =>
          wrap(
            it,
            k,
            <div className="flex gap-5 rounded-[24px] bg-good-soft/70 px-8 py-5">
              <CheckCircle2 className="mt-1.5 h-9 w-9 shrink-0 text-good" />
              <div className="deck-text min-w-0 flex-1">
                <Markdown md={it.block.type === 'md' ? it.block.md.replace(/^\s*([-*+]|\d+[.)])\s+/, '') : ''} />
              </div>
            </div>,
            'fx-fly',
          ),
        )}
      </ul>
    );
  } else if (slide.kind === 'questions') {
    body = questions;
  } else if (slide.kind === 'video') {
    body = <div className="mx-auto w-full max-w-[1180px]">{slide.items.map((it, k) => visualItem(it, k))}</div>;
  } else if (slide.kind === 'link') {
    const embed = slide.url ? activityEmbedUrl(slide.url) : null;
    body =
      embed && !still ? (
        <iframe src={embed} title={slide.title} className="aspect-[16/8] w-full rounded-[24px] border border-line bg-white" allow="fullscreen" />
      ) : (
        <a href={slide.url} target="_blank" rel="noreferrer" className="flex items-center gap-6 rounded-[28px] border-2 border-line bg-surface-2 p-10 text-[30px] font-semibold hover:bg-surface-3">
          <ExternalLink className="h-10 w-10 text-brand" />
          <span className="min-w-0 truncate">{slide.title}</span>
        </a>
      );
  } else {
    const text = slide.items.map((it, k) => [it, k] as const).filter(([it]) => !besideText(it.block));
    const visual = slide.items.map((it, k) => [it, k] as const).filter(([it]) => besideText(it.block));
    const hook = slide.kind === 'hook';
    body =
      text.length && visual.length ? (
        <div className="grid grid-cols-[1.1fr_0.9fr] items-start gap-14">
          <div className="space-y-7">{text.map(([it, k]) => textItem(it, k))}</div>
          <div className="space-y-6">{visual.map(([it, k]) => visualItem(it, k))}</div>
        </div>
      ) : (
        <div className={cn('space-y-7', hook && 'flex gap-12 space-y-0')}>
          {hook && <Lightbulb className="build-in fx-pop mt-2 h-28 w-28 shrink-0" style={{ color: accent }} />}
          <div className={cn('space-y-7', hook && 'flex-1 [&_.deck-text]:text-[40px]')}>{slide.items.map((it, k) => (visual.some(([, j]) => j === k) ? visualItem(it, k) : textItem(it, k)))}</div>
        </div>
      );
  }

  return (
    <div className={cn('deck-slide relative flex flex-col overflow-hidden bg-surface px-[96px] pb-[84px] pt-[64px] text-ink', slide.kind === 'hook' && 'bg-brand-50')} style={style}>
      <div className="pointer-events-none absolute -right-44 -top-44 h-[560px] w-[560px] rounded-full" style={{ background: 'rgb(var(--deck-accent) / 0.08)' }} />
      <div className="pointer-events-none absolute bottom-[70px] left-0 h-[150px] w-[230px]" style={{ backgroundImage: 'radial-gradient(rgb(var(--deck-accent) / 0.25) 2.5px, transparent 2.5px)', backgroundSize: '24px 24px' }} />
      <div className="relative mb-12 flex shrink-0 items-start justify-between gap-8">
        <div className="min-w-0">
          {eyebrow && (
            <div className="flex items-center gap-3 text-[22px] font-semibold uppercase tracking-[0.18em]" style={{ color: accent }}>
              {slide.kind === 'example' && <Sparkles className="h-6 w-6" />}
              {eyebrow}
            </div>
          )}
          <h2 className={cn('mt-2 font-display text-[54px] font-semibold leading-[1.1]', allHidden && 'text-ink-3 line-through')}>
            <Markdown md={title} inline />
          </h2>
          <div className="deck-bar mt-5 h-[6px] w-[128px] rounded-full" style={{ background: accent }} />
        </div>
        {editing && onToggle && !fixedSlide(slide) && (
          <button type="button" onClick={() => onToggle([...new Set(slide.items.map((x) => x.blockKey))], !allHidden)} className={cn('mt-2 inline-flex shrink-0 items-center gap-2 rounded-xl border px-5 py-3 text-[22px] font-semibold', allHidden ? 'border-brand bg-brand text-brand-ink' : 'border-line-strong bg-surface text-ink hover:bg-surface-2')}>
            {allHidden ? <Eye className="h-6 w-6" /> : <EyeOff className="h-6 w-6" />}
            {allHidden ? 'Show this slide' : 'Hide this slide'}
          </button>
        )}
      </div>
      <FitContent className="relative">{body}</FitContent>
      <div className="pointer-events-none absolute inset-x-[96px] bottom-[30px] flex items-center justify-between text-[18px] text-ink-3">
        <span className="truncate">
          Lesson {lesson.number} · {lesson.title}
        </span>
        <span className="tabular-nums">
          {index + 1} / {total}
        </span>
      </div>
    </div>
  );
}
