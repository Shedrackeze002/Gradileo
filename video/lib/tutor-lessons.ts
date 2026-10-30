/**
 * The lessons as the AI tutor presents them to a self-paced student, built the way the app builds
 * them (TutorMode), so the tutor-voice recordings match the slides the app shows.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { COURSES, courseOfLesson, lessonById, skillInfo, unitById } from '../../engine/curriculum/index.ts';
import type { TutorSlide } from '../../engine/ai/tutor.ts';
import { applyEdits } from '../../src/content/edits.ts';
import { buildSlides } from '../../src/features/lessons/slides.ts';
import { tutorSlide } from '../../src/features/tutor/tutorSlides.ts';

const root = path.resolve(import.meta.dirname, '../..');

interface VideoEntry {
  lessonId: string;
  title: string;
  duration: number;
  chapters: Array<{ title: string }>;
}

/** A lesson's explainer videos in order, as src/content/videos.ts lists them (read as a file, so any runner can load this). */
function videosForLesson(lessonId: string) {
  const all = JSON.parse(readFileSync(path.join(root, 'src/content/videos.json'), 'utf8')) as Record<string, VideoEntry>;
  return Object.entries(all)
    .filter(([, v]) => v.lessonId === lessonId)
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
}

/** The slides a self-paced student sees, as the tutor reads them, with the lesson's title, unit and subject. */
export function lessonTutorSlides(lessonId: string): { title: string; unit: string; subject?: string; slides: TutorSlide[] } {
  const meta = lessonById(lessonId);
  if (!meta) throw new Error(`Unknown lesson ${lessonId}`);
  const unit = unitById(meta.unitId);
  const file = readdirSync(path.join(root, 'src/content'))
    .map((d) => path.join(root, 'src/content', d, 'lessons', `${lessonId}.md`))
    .find((f) => existsSync(f));
  if (!file) throw new Error(`No lesson file for ${lessonId}`);
  const content = applyEdits(readFileSync(file, 'utf8'), [], (id) => !!skillInfo(id)).content;
  // Every explainer part gets its slide here, on YouTube yet or not, so its line is ready when it is.
  const parts = videosForLesson(lessonId);
  const explainers = parts.map((v, i) => ({ id: v.id, title: v.title, duration: v.duration, chapters: v.chapters.map((c) => c.title), part: i + 1, parts: parts.length, youtubeId: 'recorded' }));
  return { title: meta.title, unit: unit ? `Unit ${unit.number} · ${unit.title}` : '', subject: courseOfLesson(lessonId)?.subject, slides: buildSlides(content, meta.title, [], explainers).map(tutorSlide) };
}

/** Lesson ids from course ids (math-10c or math10c) and lesson ids, in course order. */
export function lessonsOf(args: string[]): string[] {
  return args.flatMap((a) => {
    const course = COURSES.find((c) => c.id === a || c.id.replace('-', '') === a);
    if (course) return course.lessons.map((l) => l.id);
    if (lessonById(a)) return [a];
    throw new Error(`Not a course or lesson: ${a}`);
  });
}
