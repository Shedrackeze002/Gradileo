import { useMemo, useState } from 'react';
import { AlertTriangle, BookMarked, ExternalLink, Eye, Info, Lightbulb, ListChecks, RefreshCw, Sparkles } from 'lucide-react';
import type { Block } from '@/content/lessonParser.ts';
import { getSkill, skillInfo } from '@engine/curriculum/index.ts';
import { useSkillsReady } from '@/lib/useSkills.ts';
import { gradeItem, type ItemResult } from '@engine/grade.ts';
import { freshSeed } from '@engine/rng.ts';
import { answerMarkdown } from '@engine/answers.ts';
import type { Difficulty } from '@engine/types.ts';
import { Markdown } from '@/components/math/Markdown.tsx';
import { Figure } from '@/components/figures/Figure.tsx';
import { HintPanel, QuestionView, SolutionPanel } from '@/components/question/QuestionView.tsx';
import { Button } from '@/components/ui/index.ts';
import { cn } from '@/lib/cn.ts';

const CALLOUT = {
  definition: { icon: BookMarked, cls: 'border-brand-200 bg-brand-50/60', label: 'Definition', iconCls: 'text-brand-700' },
  tip: { icon: Lightbulb, cls: 'border-info/30 bg-info-soft/60', label: 'Tip', iconCls: 'text-info' },
  mistake: { icon: AlertTriangle, cls: 'border-warn/40 bg-warn-soft/60', label: 'Common mistake', iconCls: 'text-warn' },
  note: { icon: Info, cls: 'border-line bg-surface-2', label: 'Note', iconCls: 'text-ink-3' },
  summary: { icon: ListChecks, cls: 'border-good/30 bg-good-soft/50', label: 'Summary', iconCls: 'text-good' },
} as const;

export function BlockView({ block, large }: { block: Block; large?: boolean }) {
  switch (block.type) {
    case 'md':
      return <Markdown md={block.md} className={large ? 'text-[20px] leading-[1.7]' : undefined} />;
    case 'callout': {
      const c = CALLOUT[block.variant];
      return (
        <div className={cn('rounded-2xl border p-4 sm:p-5', c.cls)}>
          <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
            <c.icon className={cn('h-4 w-4', c.iconCls)} />
            <span className="text-ink">{block.title ? <Markdown md={block.title} inline /> : c.label}</span>
          </div>
          <Markdown md={block.md} className={large ? 'text-[19px]' : undefined} />
        </div>
      );
    }
    case 'example':
      return <ExampleBlock block={block} large={large} />;
    case 'check':
      return <CheckBlock skillId={block.skillId} difficulty={block.difficulty} />;
    case 'figure':
      return <Figure fig={block.figure} />;
    case 'video':
      return <VideoEmbed url={block.url} title={block.title} />;
  }
}

export function ExampleBlock({ block, large, presenter }: { block: Extract<Block, { type: 'example' }>; large?: boolean; presenter?: boolean }) {
  const total = block.steps.length + (block.answer ? 1 : 0);
  const [shown, setShown] = useState(0);
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2/60 px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-brand" />
          Worked example: <span className="font-medium text-ink-2">{block.title && <Markdown md={block.title} inline />}</span>
        </div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <Markdown md={block.problem} className={large ? 'text-[20px]' : undefined} />
        <ol className="space-y-3">
          {block.steps.slice(0, shown).map((s, i) => (
            <li key={i} className="flex animate-slide-up gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">{i + 1}</span>
              <Markdown md={s} className={cn('min-w-0 flex-1', large && 'text-[19px]')} />
            </li>
          ))}
        </ol>
        {block.answer && shown > block.steps.length && (
          <div className="animate-slide-up rounded-xl bg-good-soft px-4 py-3 text-good-ink">
            <Markdown md={block.answer} className={cn('text-ink', large && 'text-[19px]')} />
          </div>
        )}
        {shown < total ? (
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="soft" icon={<Eye className="h-4 w-4" />} onClick={() => setShown((s) => s + 1)}>
              {shown === 0 ? (presenter ? 'Show first step' : 'Try it first, then show step 1') : shown === block.steps.length ? 'Show answer' : `Show step ${shown + 1}`}
            </Button>
            {shown < total - 1 && (
              <Button size="sm" variant="ghost" onClick={() => setShown(total)}>
                Show all
              </Button>
            )}
            <span className="text-xs text-ink-3">
              {shown}/{total} revealed
            </span>
          </div>
        ) : (
          <button type="button" className="text-sm font-medium text-ink-3 hover:text-ink" onClick={() => setShown(0)}>
            Hide steps
          </button>
        )}
      </div>
    </div>
  );
}

/** An embedded, ungraded practice question generated fresh from a skill. */
/** A checked question: its prompt, what the student entered and the expected answer, as Markdown. */
export interface CheckDetail {
  prompt: string;
  answer: string;
  expected: string;
}

export function CheckBlock({ skillId, difficulty, onResult }: { skillId: string; difficulty: Difficulty; onResult?: (correct: boolean, detail: CheckDetail) => void }) {
  const loaded = useSkillsReady([skillId]);
  const skill = loaded === 'ready' ? getSkill(skillId) : undefined;
  const [seed, setSeed] = useState(() => freshSeed());
  const item = useMemo(() => skill?.generate(seed, difficulty), [skill, seed, difficulty]);
  const [responses, setResponses] = useState<string[]>([]);
  const [result, setResult] = useState<ItemResult | null>(null);
  const [hints, setHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  if (!skill || !item) return loaded === 'loading' && skillInfo(skillId) ? <div className="card h-40 animate-pulse bg-surface-2" aria-label="Loading question" /> : null;
  const check = () => {
    const r = gradeItem(item, responses);
    if (r.parts.every((p) => p.invalid)) {
      setResult(r);
      return;
    }
    setResult(r);
    onResult?.(r.correct, {
      prompt: item.prompt,
      answer: responses.filter((x) => x?.trim()).join(' | '),
      expected: item.parts.map((p) => answerMarkdown(p.answer, p)).join(' | '),
    });
  };
  const again = () => {
    setSeed(freshSeed());
    setResponses([]);
    setResult(null);
    setHints(0);
    setShowSolution(false);
  };
  const done = !!result && !result.parts.some((p) => p.invalid);
  return (
    <div className="rounded-2xl border-2 border-dashed border-brand-200 bg-surface p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-semibold uppercase tracking-wide text-brand-700">Check your understanding · {skill.name}</div>
        <button type="button" onClick={again} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-ink-3 hover:bg-surface-2 hover:text-ink">
          <RefreshCw className="h-3.5 w-3.5" /> New question
        </button>
      </div>
      <QuestionView item={item} responses={responses} onChange={(r) => (done ? undefined : setResponses(r))} result={result} locked={done} showAnswers={done && showSolution} onEnter={check} />
      <div className="mt-4 space-y-3">
        {!done && <HintPanel hints={item.hints} used={hints} onReveal={() => setHints((h) => h + 1)} />}
        <div className="flex flex-wrap items-center gap-2">
          {!done ? (
            <Button onClick={check} disabled={!responses.some((r) => r?.trim())}>
              Check
            </Button>
          ) : (
            <>
              <div className={cn('rounded-xl px-3 py-2 text-sm font-semibold', result!.correct ? 'bg-good-soft text-good-ink' : 'bg-bad-soft text-bad-ink')}>
                {result!.correct ? 'Correct — nice work!' : 'Not quite.'}
              </div>
              {!showSolution && (
                <Button variant="secondary" size="sm" onClick={() => setShowSolution(true)}>
                  Show solution
                </Button>
              )}
              <Button variant="soft" size="sm" icon={<RefreshCw className="h-4 w-4" />} onClick={again}>
                Try another
              </Button>
            </>
          )}
        </div>
        {done && showSolution && <SolutionPanel item={item} />}
      </div>
    </div>
  );
}

export function videoEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v') ?? u.pathname.split('/').filter(Boolean).pop();
      if (u.pathname.startsWith('/embed/') || u.pathname.startsWith('/shorts/') || u.searchParams.get('v')) return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop();
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

export function VideoEmbed({ url, title }: { url: string; title?: string }) {
  const embed = videoEmbedUrl(url);
  // Only web links: a lesson edit must never turn into a script link.
  if (!embed && !/^https?:\/\//i.test(url)) return <div className="rounded-2xl border border-line bg-surface p-4 font-medium">{title ?? 'Video'}</div>;
  if (!embed) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 hover:bg-surface-2">
        <ExternalLink className="h-5 w-5 text-brand" />
        <span className="font-medium">{title ?? url}</span>
      </a>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-black">
      <div className="relative aspect-video">
        <iframe className="absolute inset-0 h-full w-full" src={embed} title={title ?? 'Video'} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      </div>
      {title && <div className="bg-surface px-4 py-2 text-sm font-medium">{title}</div>}
    </div>
  );
}
