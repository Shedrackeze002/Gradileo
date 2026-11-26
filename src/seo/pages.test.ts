// The public lesson and course pages that the build writes for search engines (scripts/prerender.mjs).
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { TOPIC_COURSES } from '@engine/curriculum/index.ts';
import { VIDEOS } from '@/content/videos.ts';
import { lessonPath, OVERRIDES, plainText, publicPages, slugify, type PublicPage } from './pages.tsx';

const root = new URL('../content/', import.meta.url).pathname;
const allSources = new Map<string, string>();
for (const dir of readdirSync(root, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  let files: string[] = [];
  try {
    files = readdirSync(join(root, dir.name, 'lessons'));
  } catch {
    continue;
  }
  for (const f of files) if (f.endsWith('.md')) allSources.set(f.slice(0, -3), readFileSync(join(root, dir.name, 'lessons', f), 'utf8'));
}

const graph = (p: PublicPage) => (p.data as { '@graph': Array<Record<string, unknown>> })['@graph'];

describe('public page addresses', () => {
  it('gives every published lesson its own address', () => {
    const lessons = TOPIC_COURSES.flatMap((c) => c.lessons).filter((l) => allSources.has(l.id));
    expect(lessons.length).toBeGreaterThan(1000);
    const paths = lessons.map(lessonPath);
    expect(new Set(paths).size).toBe(paths.length);
    for (const p of paths) expect(p).toMatch(/^\/lessons\/[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('keeps hand-written titles and descriptions to known lessons and search lengths', () => {
    const ids = new Set(TOPIC_COURSES.flatMap((c) => c.lessons.map((l) => l.id)));
    for (const [id, o] of Object.entries(OVERRIDES)) {
      expect(ids.has(id), id).toBe(true);
      if (o.title) expect(o.title.length, o.title).toBeLessThanOrEqual(62);
      if (o.description) expect(o.description.length, o.description).toBeLessThanOrEqual(158);
    }
  });

  it('makes readable slugs', () => {
    expect(slugify("Boyle's Law & Pressure")).toBe('boyles-law-and-pressure');
    expect(slugify('Équations: degré 2')).toBe('equations-degre-2');
  });

  it('turns maths into plain text for descriptions', () => {
    expect(plainText('The **slope** is $m = \\frac{\\text{rise}}{\\text{run}}$.')).toBe('The slope is m = rise/run.');
  });
});

describe('a course of public pages', () => {
  // One course with videos keeps the test quick; the build renders every course the same way.
  const course = TOPIC_COURSES.find((c) => c.id === 'math-10c')!;
  const sources = new Map([...allSources].filter(([id]) => course.lessons.some((l) => l.id === id)));
  const video = VIDEOS.find((v) => v.lessonId === course.lessons[0].id && v.chapters.length > 1)!;
  const pages = publicPages(sources, [{ video_id: video.id, youtube_id: 'abcdefghijk', updated_at: '2026-10-19T10:00:00Z' }]);
  const lessonPages = pages.filter((p) => p.path.startsWith('/lessons/'));

  it('has a page for each lesson, the course and the course list', () => {
    expect(lessonPages).toHaveLength(sources.size);
    expect(pages.map((p) => p.path)).toContain('/courses/grade-10-mathematics');
    expect(pages.map((p) => p.path)).toContain('/courses/');
  });

  it('gives each lesson a short title and description and its whole text', () => {
    for (const p of lessonPages) {
      expect(p.title.length, p.title).toBeLessThanOrEqual(62);
      expect(p.description.length, p.description).toBeLessThanOrEqual(158);
      expect(p.description).not.toMatch(/\$|\\[a-z]/);
      expect(p.body).toContain('<h1');
      expect(p.body).toContain('Sign up free');
    }
  });

  it('links each lesson to the next one', () => {
    const [first, second] = lessonPages;
    expect(first.body).toContain(`href="${second.path}"`);
    expect(second.body).toContain(`href="${first.path}"`);
  });

  it('embeds the videos on YouTube and describes them with their chapters', () => {
    const page = lessonPages.find((p) => graph(p).some((n) => n['@type'] === 'VideoObject'))!;
    expect(page.body).toContain('https://www.youtube-nocookie.com/embed/abcdefghijk');
    const v = graph(page).find((n) => n['@type'] === 'VideoObject')!;
    expect(v.embedUrl).toBe('https://www.youtube.com/embed/abcdefghijk');
    expect(v.uploadDate).toBe('2026-10-19T10:00:00.000Z');
    expect(v.duration).toMatch(/^PT\d+M\d+S$/);
    const clips = v.hasPart as Array<{ startOffset: number; endOffset: number }>;
    expect(clips).toHaveLength(video.chapters.length);
    for (const c of clips) expect(c.endOffset).toBeGreaterThan(c.startOffset);
    // Lessons whose videos are not on YouTube yet show none.
    expect(lessonPages.filter((p) => p.body.includes('youtube-nocookie'))).toHaveLength(1);
  });

  it('keeps every page’s structured data safe inside a script block', () => {
    for (const p of pages) expect(JSON.stringify(p.data).replace(/</g, '\\u003c')).not.toContain('</script');
  });
});

describe('the dates on public pages and the About page', () => {
  const course = TOPIC_COURSES.find((c) => c.id === 'math-10c')!;
  const sources = new Map([...allSources].filter(([id]) => course.lessons.some((l) => l.id === id)));
  const [firstId, secondId] = [...sources.keys()];
  const video = VIDEOS.find((v) => v.lessonId === secondId);
  const links = video ? [{ video_id: video.id, youtube_id: 'abcdefghijk', updated_at: '2026-11-20T09:00:00Z' }] : [];
  const written = new Map([
    [firstId, '2026-11-02T12:00:00+00:00'],
    [secondId, '2026-11-05T12:00:00+00:00'],
  ]);
  const pages = publicPages(sources, links, written);
  const page = (id: string) => pages.find((p) => p.path === lessonPath(course.lessons.find((l) => l.id === id)!))!;

  it('dates a lesson by when its file last changed, and shows that date', () => {
    const p = page(firstId);
    expect(p.modified).toBe('2026-11-02T12:00:00.000Z');
    expect(graph(p).find((n) => n['@type'] === 'LearningResource')!.dateModified).toBe('2026-11-02T12:00:00.000Z');
    expect(p.body).toContain('Updated <time dateTime="2026-11-02T12:00:00.000Z">2 November 2026</time>');
  });

  it('moves a lesson’s date when a video is added to it', () => {
    expect(page(secondId).modified).toBe(video ? '2026-11-20T09:00:00.000Z' : '2026-11-05T12:00:00.000Z');
  });

  it('gives a course the date of its newest lesson, and leaves out unknown dates', () => {
    const coursePage = pages.find((p) => p.path === '/courses/grade-10-mathematics')!;
    expect(coursePage.modified).toBe(page(secondId).modified);
    const undated = publicPages(sources, []);
    expect(undated.every((p) => p.modified === undefined)).toBe(true);
    expect(undated.some((p) => p.body.includes('Updated <time'))).toBe(false);
  });

  it('writes an About page that says how the lessons are made, with no personal details', () => {
    const about = pages.find((p) => p.path === '/about')!;
    expect(about.file).toBe('about.html');
    expect(about.listed).toBe(true);
    expect(about.description.length).toBeLessThanOrEqual(158);
    expect(about.body).toContain('About Gradileo');
    expect(about.body).toContain('mailto:admin@gradileo.com');
    expect((about.data as Record<string, unknown>)['@type']).toBe('AboutPage');
    // Every public page links to it from the footer.
    for (const p of pages) expect(p.body).toContain('href="/about"');
  });
});
