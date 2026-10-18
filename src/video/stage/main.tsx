/**
 * The page the video build drives (video/stage.html). The build loads a script with its timeline,
 * then seeks frame by frame and captures each one; see video/build.ts.
 */
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/lexend';
import 'katex/dist/katex.min.css';
import './stage.css';
import { courseOfLesson, lessonById, unitById } from '@engine/curriculum/index.ts';
import type { Explainer } from '../script.ts';
import { stateAt, type Timeline } from '../timeline.ts';
import { fullScene, Stage, Thumbnail } from './Stage.tsx';

export interface StageApi {
  /** Loads a script and its timeline and makes sure every font it needs is loaded. */
  load(id: string, timeline: Timeline): Promise<void>;
  /** Draws the frame at time t; returns a key that is the same for identical frames. */
  seek(t: number): string;
  /** Draws the thumbnail. */
  thumbnail(id: string): Promise<void>;
}

declare global {
  interface Window {
    __stage: StageApi;
  }
}

const modules = import.meta.glob<{ default: Explainer }>('/src/content/*/videos/*.ts');

async function script(id: string): Promise<Explainer> {
  const path = Object.keys(modules).find((k) => k.endsWith(`/videos/${id}.ts`));
  if (!path) throw new Error(`No video script "${id}".`);
  return (await modules[path]()).default;
}

/** Courses whose videos were made before they named the topic first: they keep their course label. */
const COURSE_LABELS = new Set(['math-10c', 'math-10-3', 'math-10-4', 'math-20-1', 'math-20-2', 'math-20-3', 'math-20-4', 'math-30-1']);

/**
 * The header and thumbnail label. Gradileo is for learners in every English-speaking country, so
 * from Math 30-2 on it names the unit's topic ("Probability"), not the Alberta course and lesson.
 */
function labelOf(x: Explainer): string {
  const lesson = lessonById(x.lessonId);
  const course = courseOfLesson(x.lessonId);
  if (!lesson || !course) return x.lessonId;
  if (COURSE_LABELS.has(course.id)) return `${course.shortTitle} · Lesson ${lesson.number}`;
  return unitById(lesson.unitId)?.title ?? lesson.title;
}

const settle = async () => {
  void document.body.offsetHeight;
  await document.fonts.ready;
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
};

const root = createRoot(document.getElementById('root')!);
let current: { x: Explainer; tl: Timeline; label: string } | null = null;
let lastKey = '';

window.__stage = {
  async load(id, timeline) {
    const x = await script(id);
    const label = labelOf(x);
    // Draw every scene fully once, so fonts (KaTeX, Greek letters) are loaded before any frame.
    for (let si = 0; si < x.scenes.length; si++) {
      flushSync(() => root.render(<Stage x={x} state={fullScene(x, si)} label={label} />));
      await settle();
    }
    current = { x, tl: timeline, label };
    lastKey = '';
    window.__stage.seek(0);
    await settle();
  },
  seek(t) {
    if (!current) throw new Error('No script loaded.');
    const state = stateAt(current.tl, t);
    const key = JSON.stringify(state);
    if (key !== lastKey) {
      const { x, label } = current;
      flushSync(() => root.render(<Stage x={x} state={state} label={label} />));
      lastKey = key;
    }
    return key;
  },
  async thumbnail(id) {
    const x = await script(id);
    flushSync(() => root.render(<Thumbnail x={x} label={labelOf(x)} />));
    lastKey = '';
    await settle();
  },
};
