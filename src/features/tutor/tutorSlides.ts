/**
 * The lesson deck as the AI tutor reads it: for each slide, the words that appear at each step
 * (one spoken beat per step), and runs of slides small enough to narrate in one request.
 */
import type { Block } from '@/content/lessonParser.ts';
import { skillInfo } from '@engine/curriculum/index.ts';
import type { TutorSlide, TutorSlideKind } from '@engine/ai/tutor.ts';
import { lastStep, revealUnits, type Slide } from '../lessons/slides.ts';

/** What each reveal unit of a block shows, as Markdown (a worked example shows several). */
function unitTexts(b: Block): string[] {
  switch (b.type) {
    case 'md':
      return [b.md];
    case 'callout':
      return [b.title ? `**${b.title}.** ${b.md}` : b.md];
    case 'example':
      return [`${b.title}: ${b.problem}`, ...b.steps, ...(b.answer ? [`Answer: ${b.answer}`] : [])];
    case 'check':
      return [`[YOUR TURN] ${skillInfo(b.skillId)?.name ?? 'a question'}`];
    case 'figure':
      return ['[FIGURE]'];
    case 'video':
      return [`[VIDEO] ${b.title ?? 'a video'}`];
  }
}

/** One slide for the tutor: the text that appears at each of its steps. */
export function tutorSlide(s: Slide): TutorSlide {
  const kind = s.kind as TutorSlideKind;
  const count = lastStep(s) + 1;
  let steps: string[];
  if (s.kind === 'title' || s.kind === 'end') steps = [s.title];
  else if (s.kind === 'video') steps = [`[VIDEO] ${s.title}`];
  else if (s.kind === 'link') steps = [s.title];
  else if (count === 1) steps = [s.items.flatMap((it) => unitTexts(it.block)).join('\n\n')];
  else steps = s.items.flatMap((it) => unitTexts(it.block).slice(0, revealUnits(it.block)));
  // The steps always match the slide's steps, even if the two ever disagree.
  while (steps.length < count) steps.push('');
  return { id: s.id, kind, title: s.title, steps: steps.slice(0, count) };
}

/** Runs of slides for one request each: at most `size` slides and about 20,000 characters. */
export function chunkSlides(slides: TutorSlide[], size = 8): TutorSlide[][] {
  const out: TutorSlide[][] = [];
  let cur: TutorSlide[] = [];
  let chars = 0;
  for (const s of slides) {
    const n = s.steps.reduce((k, t) => k + t.length, 0);
    if (cur.length && (cur.length >= size || chars + n > 20_000)) {
      out.push(cur);
      cur = [];
      chars = 0;
    }
    cur.push(s);
    chars += n;
  }
  if (cur.length) out.push(cur);
  return out;
}

/** A slide's content as Markdown, for the tutor to answer a question about it. */
export function slideText(s: Slide): string {
  return s.items
    .flatMap((it) => unitTexts(it.block))
    .map((t) => (t.startsWith('[YOUR TURN]') ? `Your turn question on: ${t.slice(12)}` : t === '[FIGURE]' ? '(a diagram)' : t))
    .join('\n\n')
    .slice(0, 4000);
}
