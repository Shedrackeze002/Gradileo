/**
 * Gradileo's public pages for search engines: one page per lesson, one per course and a list of
 * every course, written as plain HTML when the site is built (scripts/prerender.mjs). They need no
 * sign-in and no JavaScript, so a search engine reads the whole lesson at once.
 *
 * Each lesson page shows the lesson as students see it (sections, definitions, worked examples with
 * every step, diagrams), its explainer videos from YouTube, links to the lessons before and after
 * it, and structured data that describes the lesson, the videos and their chapters to Google.
 */
import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactNode } from 'react';
import { BookMarked, Sparkles } from 'lucide-react';
import type { CourseMeta, Item, LessonMeta, UnitMeta } from '@engine/types.ts';
import { getSkill, loadSkills, TOPIC_COURSES } from '@engine/curriculum/index.ts';
import { parseLesson, type Block } from '@/content/lessonParser.ts';
import { VIDEOS, type ExplainerVideo } from '@/content/videos.ts';
import { BlockView } from '@/features/lessons/LessonBlocks.tsx';
import { Markdown } from '@/components/math/Markdown.tsx';
import { Logo } from '@/components/layout/Logo.tsx';
import { Figure } from '@/components/figures/Figure.tsx';
import { ABOUT_PATH, coursePath, COURSES_PATH, lessonPath } from './paths.ts';
import { CONTACT_EMAIL as CONTACT } from '@/features/legal/LegalLayout.tsx';
import overrides from './overrides.json';

export { ABOUT_PATH, coursePath, COURSES_PATH, lessonPath, slugify } from './paths.ts';

export const SITE = 'https://gradileo.com';

/**
 * A lesson's own search title and description, where the made ones do not match what people
 * search for (the monthly Search Console review adds them). Keyed by lesson id.
 */
export const OVERRIDES: Record<string, { title?: string; description?: string }> = overrides;

/** A video's YouTube id and when it was recorded on Gradileo (the video_links table). */
export interface VideoLink {
  video_id: string;
  youtube_id: string;
  updated_at: string;
}

export interface PublicPage {
  /** The page's address, such as /lessons/c20-2-3-boyles-law. */
  path: string;
  /** The file it is written to under dist/, such as lessons/c20-2-3-boyles-law.html. */
  file: string;
  title: string;
  description: string;
  /** The page's own markup, which goes inside <body>. */
  body: string;
  /** Structured data (schema.org), written as one JSON-LD block. */
  data: object;
  /** Whether the page is listed in the sitemap. */
  listed: boolean;
  /** When the page's content last changed (ISO 8601), for the sitemap. Unknown when left out. */
  modified?: string;
}

/** The newest of some ISO dates, or undefined when there are none. */
function newest(dates: Array<string | undefined>): string | undefined {
  const known = dates.filter((d): d is string => !!d && !Number.isNaN(Date.parse(d)));
  if (!known.length) return undefined;
  return new Date(Math.max(...known.map((d) => Date.parse(d)))).toISOString();
}

/** A date for readers, such as 12 November 2026. */
const longDate = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });


/** Markdown and maths reduced to plain text, for descriptions and structured data. */
export function plainText(md: string): string {
  return md
    .replace(/\\\$/g, '$')
    .replace(/\$\$?([^$]+)\$\$?/g, (_, tex: string) =>
      tex
        .replace(/\\(?:text|mathrm|mathbf|operatorname)\{([^}]*)\}/g, '$1')
        .replace(/\\(?:frac|dfrac)\{([^}]*)\}\{([^}]*)\}/g, '$1/$2')
        .replace(/\\times/g, '×')
        .replace(/\\cdot/g, '·')
        .replace(/\\(?:left|right)/g, '')
        .replace(/\^\{([^}]*)\}/g, '^$1')
        .replace(/_\{([^}]*)\}/g, '$1')
        .replace(/\\[a-zA-Z]+/g, '')
        .replace(/[{}]/g, ''),
    )
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`#>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** At most `max` characters, cut at a word. */
function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]$/, '') + '…';
}

const SUBJECT_NAMES: Record<string, string> = { math: 'Mathematics', chemistry: 'Chemistry', physics: 'Physics', english: 'English' };
const subjectName = (c: CourseMeta) => SUBJECT_NAMES[c.subject] ?? c.subject.charAt(0).toUpperCase() + c.subject.slice(1);

/** ISO 8601 length, such as PT4M5S. */
const isoDuration = (seconds: number) => {
  const s = Math.round(seconds);
  return `PT${Math.floor(s / 60)}M${s % 60}S`;
};

const minutes = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`;

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="/" aria-label="Gradileo home">
            <Logo compact />
          </a>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <a href={COURSES_PATH} className="text-ink-2 hover:text-ink">
              All courses
            </a>
            <a href="/login" className="hidden text-ink-2 hover:text-ink sm:inline">
              Sign in
            </a>
            <a href="/signup" className="rounded-xl bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-700">
              Sign up free
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-8 text-sm text-ink-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-6">
          <p>Free mastery-based mathematics, chemistry, physics and English for Grades 5 to 12.</p>
          <nav aria-label="Gradileo elsewhere" className="flex gap-4">
            <a href="https://www.youtube.com/@Gradileo" rel="noopener me" className="hover:text-ink hover:underline">
              YouTube
            </a>
            <a href="https://www.facebook.com/learnwithgradileo" rel="noopener me" className="hover:text-ink hover:underline">
              Facebook
            </a>
            <a href="https://www.instagram.com/learnwithgradileo/" rel="noopener me" className="hover:text-ink hover:underline">
              Instagram
            </a>
          </nav>
          <nav aria-label="Legal" className="flex gap-4">
            <a href={ABOUT_PATH} className="hover:text-ink hover:underline">
              About
            </a>
            <a href="/privacy" className="hover:text-ink hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-ink hover:underline">
              Terms of Service
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function Crumbs({ items }: { items: Array<[string, string?]> }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-ink-3">
      {items.map(([name, href], i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true">›</span>}
          {href ? (
            <a href={href} className="hover:text-ink hover:underline">
              {name}
            </a>
          ) : (
            <span className="text-ink-2">{name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function SignUpBox({ lesson }: { lesson?: LessonMeta }) {
  return (
    <section className="mt-10 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
      <h2 className="font-display text-xl font-semibold text-ink">{lesson ? 'Practise this lesson with instant feedback' : 'Practise with instant feedback'}</h2>
      <p className="mt-2 text-ink-2">
        Gradileo is free. Sign up to answer unlimited questions on {lesson ? 'this lesson' : 'every lesson'}, get hints and full solutions, and track your mastery. Teachers can set it as an assignment for a whole class.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href="/signup" className="inline-flex h-11 items-center rounded-xl bg-brand px-5 font-semibold text-white hover:bg-brand-700">
          Create a free account
        </a>
        {lesson && (
          <a href={`/s/learn/${lesson.id}`} className="inline-flex h-11 items-center rounded-xl border border-line bg-surface px-5 font-semibold text-ink hover:bg-surface-2">
            Open it in Gradileo
          </a>
        )}
      </div>
    </section>
  );
}

/** A worked example with every step shown (the app reveals them one at a time). */
function StaticExample({ block }: { block: Extract<Block, { type: 'example' }> }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/60 px-4 py-2.5 text-sm font-semibold">
        <Sparkles className="h-4 w-4 text-brand" />
        Worked example: <span className="font-medium text-ink-2">{block.title && <Markdown md={block.title} inline />}</span>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <Markdown md={block.problem} />
        <ol className="space-y-3">
          {block.steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">{i + 1}</span>
              <Markdown md={s} className="min-w-0 flex-1" />
            </li>
          ))}
        </ol>
        {block.answer && (
          <div className="rounded-xl bg-good-soft px-4 py-3">
            <Markdown md={block.answer} className="text-ink" />
          </div>
        )}
      </div>
    </div>
  );
}

/** A whole number from text, so a lesson's sample questions are the same in every build. */
function seedOf(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** One version of a lesson's practice question, with its worked solution folded away. */
function SampleQuestion({ block, lesson, index }: { block: Extract<Block, { type: 'check' }>; lesson: LessonMeta; index: number }) {
  const skill = getSkill(block.skillId);
  let item: Item | undefined;
  try {
    item = skill?.generate(seedOf(`${lesson.id}:${index}`), block.difficulty);
  } catch {
    item = undefined;
  }
  if (!item) return null;
  return (
    <div className="rounded-2xl border-2 border-dashed border-brand-200 bg-surface p-4 sm:p-5">
      <p className="mb-2 text-sm font-semibold text-brand-700">Your turn</p>
      <Markdown md={item.prompt} />
      {item.figure && (
        <div className="mt-3">
          <Figure fig={item.figure} />
        </div>
      )}
      {item.solution.length > 0 && (
        <details className="mt-4 rounded-xl bg-surface-2 px-4 py-3">
          <summary className="cursor-pointer text-sm font-semibold text-ink">Show the worked solution</summary>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            {item.solution.map((s, i) => (
              <li key={i}>
                <Markdown md={s} />
              </li>
            ))}
          </ol>
        </details>
      )}
      <p className="mt-3 text-sm text-ink-3">
        <a href={`/s/learn/${lesson.id}`} className="font-medium text-brand hover:underline">
          Answer it in Gradileo
        </a>{' '}
        to have your answer checked and get a new version each time.
      </p>
    </div>
  );
}

function StaticBlock({ block, lesson, index }: { block: Block; lesson: LessonMeta; index: number }) {
  if (block.type === 'example') return <StaticExample block={block} />;
  if (block.type === 'check') return <SampleQuestion block={block} lesson={lesson} index={index} />;
  return <BlockView block={block} />;
}

function VideoBox({ video, youtubeId, part, parts }: { video: ExplainerVideo; youtubeId: string; part: number; parts: number }) {
  const name = parts > 1 ? `${video.title} (part ${part} of ${parts})` : video.title;
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <div className="relative aspect-video bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={name}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
      <figcaption className="p-4 text-sm text-ink-2">
        <span className="font-semibold text-ink">{name}</span> · {minutes(video.duration)}
        {video.chapters.length > 1 && (
          <ol className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {video.chapters.map((c) => (
              <li key={c.t}>
                <a href={`https://www.youtube.com/watch?v=${youtubeId}&t=${Math.floor(c.t)}s`} className="hover:text-ink hover:underline">
                  {minutes(c.t)} {c.title}
                </a>
              </li>
            ))}
          </ol>
        )}
      </figcaption>
    </figure>
  );
}

interface LessonPlace {
  course: CourseMeta;
  unit: UnitMeta;
  lesson: LessonMeta;
  prev?: LessonMeta;
  next?: LessonMeta;
}

function gradeOf(course: CourseMeta, lesson?: LessonMeta) {
  return lesson?.grade ?? course.grade;
}

function videoData(video: ExplainerVideo, link: VideoLink, lessonUrl: string, part: number, parts: number, description: string) {
  const name = parts > 1 ? `${video.title} (part ${part} of ${parts})` : video.title;
  return {
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: [`https://i.ytimg.com/vi/${link.youtube_id}/hqdefault.jpg`],
    uploadDate: new Date(link.updated_at).toISOString(),
    duration: isoDuration(video.duration),
    embedUrl: `https://www.youtube.com/embed/${link.youtube_id}`,
    url: `https://www.youtube.com/watch?v=${link.youtube_id}`,
    isPartOf: { '@id': lessonUrl },
    publisher: { '@id': `${SITE}/#organization` },
    hasPart: video.chapters.map((c, i) => ({
      '@type': 'Clip',
      name: c.title,
      startOffset: Math.floor(c.t),
      endOffset: Math.floor(video.chapters[i + 1]?.t ?? video.duration),
      url: `https://www.youtube.com/watch?v=${link.youtube_id}&t=${Math.floor(c.t)}s`,
    })),
  };
}

function lessonPage(place: LessonPlace, source: string, links: Map<string, VideoLink>, written?: string): PublicPage {
  const { course, unit, lesson, prev, next } = place;
  const content = parseLesson(source);
  const path = lessonPath(lesson);
  const url = SITE + path;
  const grade = gradeOf(course, lesson);
  const definition = [...content.intro, ...content.sections.flatMap((s) => s.blocks)].find((b): b is Extract<Block, { type: 'callout' }> => b.type === 'callout' && b.variant === 'definition');
  const lead = definition ? plainText(definition.md) : plainText(lesson.objectives.join(' '));
  const own = OVERRIDES[lesson.id];
  const description = own?.description ?? clip(`${lesson.title}, a free Grade ${grade} ${subjectName(course).toLowerCase()} lesson: ${lead}`, 158);
  const full = `${lesson.title} · ${course.title} · Gradileo`;
  const title = own?.title ?? (full.length <= 62 ? full : clip(`${lesson.title} · Gradileo`, 62));
  const videos = VIDEOS.filter((v) => v.lessonId === lesson.id && links.has(v.id));
  // The page changes when its lesson file is edited or a video is added to it, and only then, so
  // the date does not move with every build.
  const modified = newest([written, ...videos.map((v) => links.get(v.id)!.updated_at)]);

  const body = renderToStaticMarkup(
    <Shell>
      <Crumbs items={[['All courses', COURSES_PATH], [course.title, coursePath(course)], [`Unit ${unit.number}: ${unit.title}`, `${coursePath(course)}#unit-${unit.number}`]]} />
      <article>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          {course.title} · Lesson {lesson.number}
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold leading-tight sm:text-4xl">{lesson.title}</h1>
        <p className="mt-2 text-sm text-ink-3">
          Grade {grade} {subjectName(course)} · about {lesson.minutes} minutes
          {modified && (
            <>
              {' '}
              · Updated <time dateTime={modified}>{longDate(modified)}</time>
            </>
          )}
        </p>
        {lesson.objectives.length > 0 && (
          <section className="mt-6 rounded-2xl border border-line bg-surface p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
              <BookMarked className="h-4 w-4 text-brand-700" /> In this lesson you will
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-2">
              {lesson.objectives.map((o, i) => (
                <li key={i}>
                  <Markdown md={o} inline />
                </li>
              ))}
            </ul>
          </section>
        )}
        {videos.length > 0 && (
          <section className="mt-8 space-y-4" aria-label="Explainer videos">
            {videos.map((v, i) => (
              <VideoBox key={v.id} video={v} youtubeId={links.get(v.id)!.youtube_id} part={i + 1} parts={videos.length} />
            ))}
          </section>
        )}
        <div className="mt-8 space-y-5">
          {content.intro.map((b, i) => (
            <StaticBlock key={i} block={b} lesson={lesson} index={i} />
          ))}
        </div>
        {content.sections.map((s, i) => (
          <section key={i} className="mt-10">
            <h2 className="mb-4 font-display text-2xl font-semibold">
              <Markdown md={s.title} inline />
            </h2>
            <div className="space-y-5">
              {s.blocks.map((b, j) => (
                <StaticBlock key={j} block={b} lesson={lesson} index={(i + 1) * 1000 + j} />
              ))}
            </div>
          </section>
        ))}
      </article>
      <SignUpBox lesson={lesson} />
      <nav aria-label="Lessons" className="mt-8 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <a href={lessonPath(prev)} className="rounded-2xl border border-line bg-surface p-4 hover:border-brand-300">
            <span className="text-xs text-ink-3">Previous lesson</span>
            <span className="mt-1 block font-semibold">
              {prev.number} {prev.title}
            </span>
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a href={lessonPath(next)} className="rounded-2xl border border-line bg-surface p-4 text-right hover:border-brand-300">
            <span className="text-xs text-ink-3">Next lesson</span>
            <span className="mt-1 block font-semibold">
              {next.number} {next.title}
            </span>
          </a>
        )}
      </nav>
    </Shell>,
  );

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        '@id': url,
        url,
        name: lesson.title,
        description,
        learningResourceType: 'Lesson',
        educationalLevel: `Grade ${grade}`,
        about: subjectName(course),
        teaches: lesson.objectives.map(plainText),
        timeRequired: `PT${lesson.minutes}M`,
        inLanguage: 'en',
        isAccessibleForFree: true,
        isPartOf: { '@type': 'Course', name: course.title, url: SITE + coursePath(course) },
        provider: { '@id': `${SITE}/#organization` },
        publisher: { '@id': `${SITE}/#organization` },
        ...(modified ? { dateModified: modified } : {}),
        ...(videos.length ? { video: videos.map((v) => ({ '@id': `${url}#video-${v.id}` })) } : {}),
      },
      ...videos.map((v, i) => ({ '@id': `${url}#video-${v.id}`, ...videoData(v, links.get(v.id)!, url, i + 1, videos.length, description) })),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'All courses', item: SITE + COURSES_PATH },
          { '@type': 'ListItem', position: 2, name: course.title, item: SITE + coursePath(course) },
          { '@type': 'ListItem', position: 3, name: lesson.title, item: url },
        ],
      },
    ],
  };
  return { path, file: `${path.slice(1)}.html`, title, description, body, data, listed: true, modified };
}

function coursePage(course: CourseMeta, published: Set<string>, modified?: string): PublicPage {
  const path = coursePath(course);
  const url = SITE + path;
  const byId = new Map(course.lessons.map((l) => [l.id, l]));
  const description = clip(`${course.title}: free lessons, explainer videos and practice questions. ${course.description}`, 158);
  const body = renderToStaticMarkup(
    <Shell>
      <Crumbs items={[['All courses', COURSES_PATH], [course.title]]} />
      <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{course.title}</h1>
      <p className="mt-3 max-w-3xl text-lg text-ink-2">{course.description}</p>
      {course.units.map((u) => {
        const lessons = u.lessons.map((id) => byId.get(id)).filter((l): l is LessonMeta => !!l && published.has(l.id));
        if (!lessons.length) return null;
        return (
          <section key={u.id} id={`unit-${u.number}`} className="mt-10">
            <h2 className="font-display text-2xl font-semibold">
              Unit {u.number}: {u.title}
            </h2>
            <p className="mt-1 text-ink-3">{u.description}</p>
            <ol className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
              {lessons.map((l) => (
                <li key={l.id}>
                  <a href={lessonPath(l)} className="flex gap-3 px-4 py-3 hover:bg-surface-2">
                    <span className="w-10 shrink-0 text-ink-3">{l.number}</span>
                    <span className="font-medium text-ink">{l.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
      <SignUpBox />
    </Shell>,
  );
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': url,
        url,
        name: course.title,
        description: course.description,
        educationalLevel: course.extra ? 'Grades 5 to 12' : `Grade ${course.grade}`,
        about: subjectName(course),
        inLanguage: 'en',
        isAccessibleForFree: true,
        provider: { '@id': `${SITE}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'All courses', item: SITE + COURSES_PATH },
          { '@type': 'ListItem', position: 2, name: course.title, item: url },
        ],
      },
    ],
  };
  return { path, file: `${path.slice(1)}.html`, title: `${course.title} · Free lessons and videos · Gradileo`, description, body, data, listed: true, modified };
}

function coursesPage(courses: CourseMeta[], lessonCount: number, modified?: string): PublicPage {
  const subjects = [...new Set(courses.map((c) => c.subject))];
  const description = `Every Gradileo course: ${lessonCount} free lessons with explainer videos and practice questions in mathematics, chemistry, physics and English for Grades 5 to 12.`;
  const body = renderToStaticMarkup(
    <Shell>
      <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">All courses</h1>
      <p className="mt-3 max-w-3xl text-lg text-ink-2">{description.replace('Every Gradileo course: ', 'Every course on Gradileo, with ')}</p>
      {subjects.map((s) => (
        <section key={s} className="mt-10">
          <h2 className="font-display text-2xl font-semibold">{subjectName(courses.find((c) => c.subject === s)!)}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {courses
              .filter((c) => c.subject === s)
              .map((c) => (
                <li key={c.id}>
                  <a href={coursePath(c)} className="block h-full rounded-2xl border border-line bg-surface p-4 hover:border-brand-300">
                    <span className="font-semibold text-ink">{c.title}</span>
                    <span className="mt-1 block text-sm text-ink-3">{clip(c.description, 140)}</span>
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}
      <SignUpBox />
    </Shell>,
  );
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Gradileo courses',
    itemListElement: courses.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + coursePath(c), name: c.title })),
  };
  return { path: COURSES_PATH, file: 'courses/index.html', title: 'All courses · Free lessons and videos · Gradileo', description, body, data, listed: true, modified };
}

/**
 * Who makes Gradileo and how its lessons and answers are checked. Google asks sites to give this
 * background (an About page) so readers, and its search and AI answers, can judge the content.
 */
function aboutPage(courses: CourseMeta[], lessonCount: number): PublicPage {
  // Subject names in a sentence: lower case, except English, which is a proper noun.
  const subjects = [...new Set(courses.map((c) => (subjectName(c) === 'English' ? 'English' : subjectName(c).toLowerCase())))];
  const lessons = lessonCount.toLocaleString('en');
  const subjectList = subjects.length > 1 ? `${subjects.slice(0, -1).join(', ')} and ${subjects[subjects.length - 1]}` : subjects[0];
  const description = clip(`About Gradileo: free, non-commercial lessons in ${subjectList} for Grades 5 to 12, and how they are written and checked.`, 158);
  const h2 = 'mt-10 font-display text-2xl font-semibold';
  const para = 'mt-3 text-ink-2 leading-relaxed';
  const body = renderToStaticMarkup(
    <Shell>
      <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">About Gradileo</h1>
      <p className="mt-3 max-w-3xl text-lg text-ink-2">
        Gradileo is a free learning site for {subjectList} from Grade 5 to Grade 12. It has {lessons} lessons in {courses.length} courses, and each lesson
        explains its topic with worked examples before the learner practises with questions that are marked straight away. Most lessons also have an
        explainer video on the Gradileo YouTube channel. Students can use Gradileo on their own, and teachers can use it with a whole class to set
        assignments and see what each student has mastered.
      </p>

      <h2 className={h2}>Why Gradileo is free</h2>
      <p className={para}>
        Gradileo is a non-commercial project, so there is no charge for students, teachers or schools, there is no advertising on the site and the
        YouTube channel is not monetised.
      </p>

      <h2 className={h2}>How the lessons are written</h2>
      <p className={para}>
        Each course follows the topics of a school curriculum, and the courses are mapped to other curricula, such as the US Common Core and the UK
        GCSE and A level, so a learner can find the lessons that match what they study at school. Every lesson opens by defining its main idea in plain
        words and then works through examples one step at a time before any practice. The English courses study poems, plays and stories that are in the
        public domain. Gradileo uses AI tools to help draft its lessons, questions and videos, and every lesson and question goes through automated checks
        before it is published.
      </p>

      <h2 className={h2}>How the answers are checked</h2>
      <p className={para}>
        Practice questions are made by a small program for each skill, and the same program works out the answer and the worked solution, so the answer
        key is calculated for every version of a question. Each question states the rates, rules and constants it uses, so its answer does not depend on
        an official figure that may have changed since the lesson was written.
      </p>

      <h2 className={h2}>Independence</h2>
      <p className={para}>
        Gradileo’s courses follow the topics of school curricula used in different countries, but Gradileo is independent. It is not made or endorsed by
        any government, education authority or exam board, and it does not replace a school’s own course or a student’s official assessments.
      </p>

      <h2 className={h2}>Corrections and updates</h2>
      <p className={para}>
        If you find a mistake in a lesson, a question or a video, please email{' '}
        <a href={`mailto:${CONTACT}`} className="font-medium text-brand hover:underline">
          {CONTACT}
        </a>{' '}
        and it will be corrected. Lessons are updated when an error is found or a topic is improved, and each lesson page shows the date its content last
        changed.
      </p>
      <SignUpBox />
    </Shell>,
  );
  const data = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': SITE + ABOUT_PATH,
    url: SITE + ABOUT_PATH,
    name: 'About Gradileo',
    description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE}/#website` },
    mainEntity: { '@id': `${SITE}/#organization` },
  };
  return { path: ABOUT_PATH, file: 'about.html', title: 'About Gradileo · Free lessons for Grades 5 to 12', description, body, data, listed: true };
}

/**
 * Every public page. `sources` maps a lesson id to its Markdown; a lesson without Markdown has no
 * page. `links` are the videos on YouTube; a lesson shows only the videos that are there. `written`
 * maps a lesson id to when its Markdown last changed (from git); without it the pages carry no dates.
 */
export function publicPages(sources: Map<string, string>, links: VideoLink[], written: Map<string, string> = new Map()): PublicPage[] {
  const linkById = new Map(links.map((l) => [l.video_id, l]));
  const courses = TOPIC_COURSES.filter((c) => c.lessons.some((l) => sources.has(l.id)));
  const published = new Set<string>();
  const pages: PublicPage[] = [];
  const courseDates: Array<string | undefined> = [];
  for (const course of courses) {
    const ordered = course.units.flatMap((u) => u.lessons.map((id) => course.lessons.find((l) => l.id === id)).filter((l): l is LessonMeta => !!l && sources.has(l.id)).map((l) => ({ unit: u, lesson: l })));
    const lessonPages = ordered.map(({ unit, lesson }, i) => {
      published.add(lesson.id);
      return lessonPage({ course, unit, lesson, prev: ordered[i - 1]?.lesson, next: ordered[i + 1]?.lesson }, sources.get(lesson.id)!, linkById, written.get(lesson.id));
    });
    pages.push(...lessonPages);
    // A course page lists its lessons, so it changes when one of them does.
    courseDates.push(newest(lessonPages.map((p) => p.modified)));
  }
  pages.push(...courses.map((c, i) => coursePage(c, published, courseDates[i])));
  pages.push(coursesPage(courses, published.size, newest(courseDates)));
  pages.push(aboutPage(courses, published.size));
  return pages;
}

/** Every public page, after loading the question generators that the lessons' practice questions use. */
export async function buildPublicPages(sources: Map<string, string>, links: VideoLink[], written?: Map<string, string>): Promise<PublicPage[]> {
  const skills = new Set<string>();
  for (const md of sources.values()) for (const m of md.matchAll(/^:::check\s+(\S+)/gm)) skills.add(m[1]);
  await loadSkills(skills);
  return publicPages(sources, links, written);
}
