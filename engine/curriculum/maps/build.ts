/**
 * Curriculum maps (roadmap item 5, step 3): a school system's own courses ("Algebra I", "GCSE
 * Higher"), each built from Gradileo's lessons in that system's order and under its unit names.
 * The lessons, practice, videos and tutor recordings are the ones the lessons already have, so a
 * mapped course is a course outline only. Each also lists its gaps: syllabus topics Gradileo does
 * not teach yet.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export interface MapUnit {
  title: string;
  description: string;
  /** Gradileo unit ids (all their lessons) and lesson ids, in the order the system teaches them. */
  members: string[];
}

export interface MapCourse {
  id: string;
  title: string;
  shortTitle: string;
  /** Gradileo's level for the course (the grade of a learner of the same age). */
  grade: number;
  description: string;
  units: MapUnit[];
  /** Syllabus topics Gradileo does not teach yet. */
  gaps: string[];
}

export interface CurriculumMap {
  /** The curriculum id in `engine/curricula.ts` ("us"). */
  curriculum: string;
  /** The system's name, as a course list heading ("US Common Core"). */
  name: string;
  courses: MapCourse[];
}

const COLORS = ['sky', 'emerald', 'amber', 'violet', 'rose', 'teal', 'orange', 'fuchsia', 'indigo'];

/**
 * A mapped course as a course like any other. Its lessons are copies of the owners' lessons, filed
 * under the map's units; their outcome codes name the owning course ("Math 9 N1"), since every
 * course numbers its own outcomes from 1.
 */
export function buildMappedCourse(map: CurriculumMap, def: MapCourse, base: CourseMeta[]): CourseMeta {
  const owners = new Map<string, { course: CourseMeta; lesson: LessonMeta }>();
  for (const course of base) for (const lesson of course.lessons) owners.set(lesson.id, { course, lesson });
  const unitsById = new Map(base.flatMap((c) => c.units.map((u) => [u.id, u] as const)));

  const outcomes = new Map<string, Outcome>();
  const lessons: LessonMeta[] = [];
  const units: UnitMeta[] = def.units.map((u, i) => {
    const id = `${def.id}-u${i + 1}`;
    const ids = u.members.flatMap((m) => unitsById.get(m)?.lessons ?? [m]);
    const codes = new Set<string>();
    ids.forEach((lessonId, j) => {
      const owner = owners.get(lessonId);
      if (!owner) throw new Error(`${def.id}: no lesson ${lessonId}`);
      const own = owner.lesson.outcomes.map((code) => {
        const named = `${owner.course.shortTitle} ${code}`;
        const o = owner.course.outcomes.find((x) => x.code === code);
        if (o) outcomes.set(named, { ...o, code: named });
        codes.add(named);
        return named;
      });
      lessons.push({ ...owner.lesson, unitId: id, number: `${i + 1}.${j + 1}`, outcomes: own });
    });
    return { id, number: i + 1, title: u.title, description: u.description, outcomes: [...codes], lessons: ids, color: COLORS[i % COLORS.length]! };
  });

  return {
    id: def.id,
    title: def.title,
    shortTitle: def.shortTitle,
    grade: def.grade,
    subject: 'Mathematics',
    description: def.description,
    outcomes: [...outcomes.values()],
    units,
    lessons,
    map: map.curriculum,
    gaps: def.gaps,
  };
}
