/**
 * The addresses of Gradileo's public lesson and course pages (src/seo/pages.tsx writes them when
 * the site is built). Kept apart from the pages so the app can link to them without loading the
 * page renderer.
 */
import type { CourseMeta, LessonMeta } from '@engine/types.ts';

export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70)
    .replace(/-+$/, '');
}

export const lessonPath = (l: LessonMeta) => `/lessons/${slugify(`${l.id} ${l.title}`)}`;
export const coursePath = (c: CourseMeta) => `/courses/${slugify(c.title)}`;
export const COURSES_PATH = '/courses/';
