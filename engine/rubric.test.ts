import { describe, expect, it } from 'vitest';
import { cleanLevels, cleanRubric, levelDescriptor, levelName, pointsOf, RUBRIC_TEMPLATES, rubricEarned, rubricFromTemplate, rubricMax, rubricScore01, rubricText } from './rubric.ts';
import { customToItem, gradeSubmission, markResponse, rubricOf, type AssignmentContent } from './assemble.ts';

const essay = rubricFromTemplate('analytical-essay')!;

describe('the ready-made rubrics', () => {
  it('each have named criteria with all four levels described, and unique ids', () => {
    expect(RUBRIC_TEMPLATES.map((t) => t.id)).toEqual(['analytical-essay', 'persuasive-essay', 'narrative', 'personal-response', 'short-response']);
    for (const t of RUBRIC_TEMPLATES) {
      expect(cleanRubric(t.rubric)).toEqual(t.rubric);
      expect(new Set(t.rubric.criteria.map((c) => c.id)).size).toBe(t.rubric.criteria.length);
      for (const c of t.rubric.criteria) expect(c.descriptors.every((d) => d.length > 10)).toBe(true);
    }
  });

  it('are copied, so editing one does not change the template', () => {
    const copy = rubricFromTemplate('narrative')!;
    copy.criteria[0].name = 'Changed';
    expect(rubricFromTemplate('narrative')!.criteria[0].name).toBe('Ideas and plot');
    expect(rubricFromTemplate('nope')).toBeNull();
  });
});

describe('scoring a rubric', () => {
  it('weights criteria, scales the total and needs every level', () => {
    // Thesis, evidence (counts twice), organization, style, conventions: out of 4 × 6 = 24.
    expect(rubricMax(essay.criteria)).toBe(24);
    const levels = { thesis: 3, evidence: 4, organization: 3, style: 2, conventions: 3 };
    expect(rubricEarned(essay.criteria, levels)).toBe(19);
    expect(rubricScore01(essay.criteria, levels)).toBeCloseTo(19 / 24);
    expect(pointsOf(19 / 24, 10)).toBe(7.9);
    expect(rubricScore01(essay.criteria, { thesis: 3 })).toBeNull();
    expect(rubricScore01(essay.criteria, null)).toBeNull();
  });

  it('keeps only levels 0 to 4 on the rubric’s own criteria', () => {
    expect(cleanLevels(essay.criteria, { thesis: 4, evidence: 5, style: -1, organization: 2.5, conventions: '3', other: 2 })).toEqual({ thesis: 4, conventions: 3 });
    expect(cleanLevels(essay.criteria, 'nope')).toEqual({});
  });

  it('names each level and describes it, best first', () => {
    expect(levelName(4)).toBe('Excellent');
    expect(levelName(0)).toBe('Not shown');
    expect(levelDescriptor(essay.criteria[0], 4)).toMatch(/^An insightful/);
    expect(levelDescriptor(essay.criteria[0], 1)).toMatch(/^No clear thesis/);
    expect(levelDescriptor(essay.criteria[0], 0)).toBe('');
    expect(rubricText(essay.criteria)).toMatch(/Evidence and analysis \[id evidence\] \(counts 2×\)\n {2}4 Excellent: Well-chosen/);
  });
});

describe('a rubric written by a teacher or the AI', () => {
  it('is checked: unnamed criteria go, ids are made unique, weights are 1 to 3', () => {
    const r = cleanRubric({ name: ' Mine ', criteria: [{ id: 'a', name: 'Ideas', descriptors: ['x'], weight: 5 }, { name: '' }, { id: 'a', name: 'Voice', weight: 2 }, 'junk'] });
    expect(r).toEqual({ name: 'Mine', criteria: [{ id: 'a', name: 'Ideas', descriptors: ['x', '', '', ''] }, { id: 'ax', name: 'Voice', descriptors: ['', '', '', ''], weight: 2 }] });
    expect(cleanRubric({ criteria: [] })).toBeNull();
    expect(cleanRubric(null)).toBeNull();
    expect(cleanRubric({ criteria: Array.from({ length: 12 }, (_, i) => ({ name: `C${i}` })) })!.criteria).toHaveLength(8);
  });
});

describe('a written question with a rubric', () => {
  const content: AssignmentContent = { sections: [], custom: [{ id: 'q1', prompt: 'Write an analytical essay on “The Gift of the Magi”.', kind: 'manual', points: 10, rubric: essay }] };
  const item = customToItem(content.custom[0], 0, 'a1');

  it('carries its criteria to the question students see', () => {
    expect(rubricOf(item)?.map((c) => c.id)).toEqual(['thesis', 'evidence', 'organization', 'style', 'conventions']);
    expect(rubricOf(customToItem({ ...content.custom[0], rubric: undefined }, 0, 'a1'))).toBeNull();
  });

  it('is scored from the levels, whatever score is sent with them', () => {
    const resp = markResponse(item, { answers: ['My essay'], hintsUsed: 0 }, { score: 1, comment: ' Strong quotations. ', rubric: { thesis: 3, evidence: 4, organization: 3, style: 2, conventions: 3 } });
    expect(resp.manualScore).toBeCloseTo(19 / 24);
    expect(resp.rubric).toEqual({ thesis: 3, evidence: 4, organization: 3, style: 2, conventions: 3 });
    expect(resp.comment).toBe('Strong quotations.');
    const g = gradeSubmission([{ custom: 0 }], { 0: resp }, content, 'a1');
    expect(g.score).toBeCloseTo(7.92, 2);
    expect(g.pendingManual).toBe(0);
  });

  it('refuses levels that leave a criterion out, and can still take one mark or be cleared', () => {
    expect(() => markResponse(item, undefined, { score: 0.5, rubric: { thesis: 3 } })).toThrow(/every criterion/);
    expect(markResponse(item, undefined, { score: 0.5 })).toMatchObject({ manualScore: 0.5, rubric: null });
    expect(markResponse(item, { answers: [], hintsUsed: 0, manualScore: 0.5, rubric: { thesis: 1 } }, { score: null })).toMatchObject({ manualScore: null, rubric: null });
    expect(() => markResponse(item, undefined, { score: Number.NaN })).toThrow(/Invalid score/);
  });
});
