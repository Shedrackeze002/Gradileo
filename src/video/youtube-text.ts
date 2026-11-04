import { courseOfLesson, lessonById, unitById } from '../../engine/curriculum/index.ts';
import type { CourseMeta } from '../../engine/types.ts';
import { BRAND } from './script.ts';
import { clock } from './timeline.ts';

export const SITE = 'https://gradileo.com/';

/**
 * What a course covers, in words used around the world: Gradileo is for learners in every
 * English-speaking country, so the YouTube text leads with the topic and the level, and names the
 * course by its grade and stream.
 */
const KIND: Record<string, string> = {
  'math-10-3': 'workplace mathematics',
  'math-20-3': 'workplace mathematics',
  'math-30-3': 'workplace mathematics',
  'math-10-4': 'everyday mathematics',
  'math-20-4': 'everyday mathematics',
  'math-20-1': 'pre-calculus',
  'math-30-1': 'pre-calculus',
  'math-20-2': 'mathematics',
  'math-30-2': 'mathematics',
  'math-31': 'calculus',
};

/** "Grade 12 / Year 13 · pre-calculus": the grade, the year it is in the UK, and the kind of course. */
export function levelOf(course: CourseMeta): string {
  return `Grade ${course.grade} / Year ${course.grade + 1} · ${KIND[course.id] ?? course.subject.toLowerCase()}`;
}

/** YouTube refuses "<" and ">" in titles, descriptions and tags; the full-width signs look the same. */
const safe = (s: string) => s.replace(/</g, '＜').replace(/>/g, '＞');

/** YouTube takes a title of at most 100 characters. */
const TITLE_MAX = 100;

/**
 * The title with the brand when it fits, else without it. A title too long even then ("Topic,
 * Part 2: the part's own name") keeps the topic and the part and drops the part's name; one with
 * no such part is cut at a word, so YouTube never refuses the upload.
 */
export function youtubeTitle(title: string): string {
  const fits = (t: string) => t.length <= TITLE_MAX;
  const branded = `${title} | ${BRAND}`;
  if (fits(branded)) return branded;
  if (fits(title)) return title;
  const head = title.split(': ')[0];
  if (head !== title && fits(head)) return fits(`${head} | ${BRAND}`) ? `${head} | ${BRAND}` : head;
  return `${title.slice(0, TITLE_MAX - 1).replace(/\s+\S*$/, '')}…`;
}

interface Video {
  title: string;
  summary: string;
  lessonId: string;
  /** Tags of a video that teaches no lesson (the introduction). */
  tags?: string[];
}

export interface YoutubeFields {
  title: string;
  description: string;
  tags: string[];
}

/** The title, description and tags for YouTube, with the chapters as listed there. */
export function youtubeFields(x: Video, chapters: Array<{ title: string; t: number }> | null): YoutubeFields {
  const lesson = lessonById(x.lessonId);
  const course = courseOfLesson(x.lessonId);
  const unit = lesson ? unitById(lesson.unitId) : undefined;
  const description = [
    x.summary,
    ...(unit || course ? ['', ...(unit ? [`Topic: ${unit.title}`] : []), ...(course ? [`Level: ${levelOf(course)}`] : [])] : []),
    ...(chapters ? ['', 'Chapters', ...chapters.map((c) => `${clock(c.t)} ${c.title}`)] : []),
    '',
    lesson ? `Practise this topic with instant feedback on ${BRAND}: ${SITE}` : `Try ${BRAND}: ${SITE}`,
    ...(course && lesson ? ['', 'Course', `${course.title}, lesson ${lesson.number}: ${lesson.title}`] : []),
  ].join('\n');
  // Mathematics is tagged both ways ("math" and "maths"); chemistry and English by their own name.
  const maths = !course || course.subject === 'Mathematics';
  const [us, uk] = maths ? ['math', 'maths'] : [course.subject.toLowerCase(), course.subject.toLowerCase()];
  const tags = [
    BRAND,
    us,
    uk,
    unit?.title,
    lesson?.title,
    course && KIND[course.id],
    course && `Grade ${course.grade} ${us}`,
    course && `Year ${course.grade + 1} ${uk}`,
    course && (course.grade >= 9 ? `high school ${us}` : course.grade >= 6 ? `middle school ${us}` : `elementary ${us}`),
    'explainer',
    course?.shortTitle,
    ...(x.tags ?? []),
  ]
    // YouTube splits tags at commas, so a comma inside one ("Decimals, Percents and Money") goes.
    .map((t) => t && safe(t.replace(/,/g, '')))
    .filter((t, i, all): t is string => Boolean(t) && all.indexOf(t) === i);
  return { title: safe(youtubeTitle(x.title)), description: safe(description), tags };
}

/** The YouTube text file that goes with each video, to paste into YouTube Studio. */
export function youtubeText(x: Video, chapters: Array<{ title: string; t: number }> | null): string {
  const { title, description, tags } = youtubeFields(x, chapters);
  return [
    `TITLE (${title.length}/100 characters)`,
    title,
    '',
    'DESCRIPTION',
    description,
    '',
    'TAGS',
    tags.join(', '),
    '',
    'Upload the captions (captions.srt, English) and the thumbnail (thumbnail.png) with the video.',
  ].join('\n');
}
