import { describe, expect, it } from 'vitest';
import { coverage } from './coverage.ts';

describe('coverage', () => {
  const units = [{ lessons: ['a', 'b'] }, { lessons: ['c'] }, { lessons: ['d', 'e', 'f'] }, { lessons: [] }];

  it('counts nothing covered at the start', () => {
    expect(coverage(units, new Set())).toEqual({ lessonsDone: 0, lessonsTotal: 6, topicsDone: 0, topicsTotal: 3 });
  });

  it('counts a topic only once every lesson in it is done', () => {
    expect(coverage(units, new Set(['a', 'c', 'd', 'e']))).toEqual({ lessonsDone: 4, lessonsTotal: 6, topicsDone: 1, topicsTotal: 3 });
    expect(coverage(units, new Set(['a', 'b', 'c', 'd', 'e', 'f']))).toEqual({ lessonsDone: 6, lessonsTotal: 6, topicsDone: 3, topicsTotal: 3 });
  });

  it('ignores lessons that are not in the course', () => {
    expect(coverage(units, new Set(['zz'])).lessonsDone).toBe(0);
  });
});
