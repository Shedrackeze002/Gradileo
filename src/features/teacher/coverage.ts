/** How much of a course a teacher has covered with a class: lessons marked done, and topics
 * (units) whose every lesson is marked done. */
export interface Coverage {
  lessonsDone: number;
  lessonsTotal: number;
  topicsDone: number;
  topicsTotal: number;
}

export function coverage(units: Array<{ lessons: string[] }>, done: ReadonlySet<string>): Coverage {
  const withLessons = units.filter((u) => u.lessons.length > 0);
  const all = withLessons.flatMap((u) => u.lessons);
  return {
    lessonsDone: all.filter((l) => done.has(l)).length,
    lessonsTotal: all.length,
    topicsDone: withLessons.filter((u) => u.lessons.every((l) => done.has(l))).length,
    topicsTotal: withLessons.length,
  };
}

const hideKey = (classId: string) => `gradileo.hideCompleted.${classId}`;

/** Whether the teacher chose to hide completed lessons for this class (remembered on this device). */
export function readHideCompleted(classId: string): boolean {
  try {
    return localStorage.getItem(hideKey(classId)) === '1';
  } catch {
    return false;
  }
}

export function writeHideCompleted(classId: string, hide: boolean) {
  try {
    if (hide) localStorage.setItem(hideKey(classId), '1');
    else localStorage.removeItem(hideKey(classId));
  } catch {
    // Storage can be blocked (private windows); the toggle still works for this visit.
  }
}
