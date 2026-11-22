import { describe, expect, it } from 'vitest';
import { checkScript, type Explainer } from './script.ts';

// Every explainer video script in the repository, checked the way the build checks it.
const scripts = import.meta.glob<{ default: Explainer }>('/src/content/*/videos/*.ts', { eager: true });

describe('video scripts', () => {
  it.each(Object.entries(scripts))('%s is a valid script named after its file', (file, mod) => {
    expect(checkScript(mod.default)).toEqual([]);
    expect(file.endsWith(`/${mod.default.id}.ts`)).toBe(true);
    // Every exam question video credits its question (the owner's rule, 19 November 2026).
    // It also writes out the whole question for its YouTube description (the owner's rule, same day).
    if (file.startsWith('/src/content/exams/')) {
      expect(mod.default.exam?.source).toBeTruthy();
      expect(mod.default.exam?.question.trim()).toBeTruthy();
      // Plain text, no TeX: a dollar sign is allowed only as money, before a digit.
      expect(mod.default.exam?.question).not.toMatch(/\\|\$(?!\d)/);
    }
  });
});
