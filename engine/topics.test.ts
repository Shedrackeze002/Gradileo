import { describe, expect, it } from 'vitest';
import { LISTED_COURSES } from './curriculum/index.ts';
import { TOPICS, topicLessons, topicLevel } from './topics.ts';

const byId = (id: string) => TOPICS.find((t) => t.id === id)!;

describe('topics', () => {
  it('file every lesson of every listed course under at least one topic of its subject', () => {
    const filed = new Map<string, string[]>();
    for (const t of TOPICS) for (const l of topicLessons(t)) filed.set(l.lessonId, [...(filed.get(l.lessonId) ?? []), t.subject]);
    const missing = LISTED_COURSES.flatMap((c) => c.lessons.filter((l) => !filed.get(l.id)?.includes(c.subject)).map((l) => `${c.id} ${l.id} ${l.title}`));
    expect(missing).toEqual([]);
  });

  it('name only units and lessons that exist, each once in a topic, with distinct topic ids', () => {
    const units = new Set(LISTED_COURSES.flatMap((c) => c.units.map((u) => u.id)));
    const lessons = new Set(LISTED_COURSES.flatMap((c) => c.lessons.map((l) => l.id)));
    for (const t of TOPICS) {
      for (const m of t.members) expect(units.has(m) || lessons.has(m), `${t.id}: ${m}`).toBe(true);
      expect(new Set(t.members).size, t.id).toBe(t.members.length);
    }
    expect(new Set(TOPICS.map((t) => t.id)).size).toBe(TOPICS.length);
  });

  it('list a topic’s lessons youngest course first, in teaching order', () => {
    const fractions = topicLessons(byId('fractions'));
    expect(fractions[0]!.courseId).toBe('math-5');
    const grades = fractions.map((l) => l.grade);
    expect(grades).toEqual([...grades].sort((a, b) => a - b));
    const m7 = fractions.filter((l) => l.courseId === 'math-7').map((l) => l.lessonId);
    expect(m7[0]).toBe('m7-1-2');
  });

  it('give each topic’s level in the learner’s own years', () => {
    expect(topicLevel(byId('quadratics'))).toBe('Grade 11');
    // Workplace and Essentials courses revisit fractions; the level is where they are first taught.
    expect(topicLevel(byId('fractions'))).toBe('Grades 5–8');
    expect(topicLevel(byId('whole-numbers'))).toBe('Grade 5');
    // A topic only those courses teach takes its level from them.
    expect(topicLevel(byId('prices'))).toBe('Grades 10–11');
    expect(topicLevel(byId('operations'), 'ng')).toBe('Primary 5–6');
    expect(topicLevel(byId('quadratics'), 'us')).toBe('Grade 11');
    expect(topicLevel(byId('poetry'), 'uk')).toBe('Years 11–13');
    expect(topicLevel(byId('poetry'), 'ng')).toBe('SS 1–3');
    expect(topicLevel(byId('linear-equations'), 'ng')).toBe('JSS 2–3');
    expect(topicLevel(byId('poetry'), 'in')).toBe('Classes 10–12');
    expect(topicLevel(byId('polynomials'), 'ng')).toBe('JSS 3 – SS 2');
    expect(topicLevel(byId('poetry'), 'scotland')).toBe('S4 – S6');
    expect(topicLevel(byId('poetry'), 'other')).toBe('About ages 15–17');
    expect(topicLevel(byId('quadratics'), 'uk')).toBe('Year 12');
  });
});
