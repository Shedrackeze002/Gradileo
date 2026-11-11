/** The AI teaching assistant: MiniMax analysis with a deterministic offline fallback. */
import { classPrompt, studentPrompt } from './prompt.ts';
import { extractJson, validateInsight } from './parse.ts';
import { minimaxChat, type MiniMaxConfig } from './minimax.ts';
import { analyzeClass, analyzeStudent } from './heuristic.ts';
import { buildClassContext, buildStudentContext, type AnalystInput } from './context.ts';
import { allSkillInfos, COURSES, lessonById } from '../curriculum/index.ts';
import type { InsightData } from './types.ts';

export * from './types.ts';
export { buildClassContext, buildStudentContext } from './context.ts';
export type { AnalystInput, RawAssignment, RawEvent, RawSubmission } from './context.ts';
export { analyzeClass, analyzeStudent } from './heuristic.ts';
export { DEFAULT_MODEL, DEFAULT_BASE_URL, minimaxChat } from './minimax.ts';
export type { MiniMaxConfig } from './minimax.ts';
export * from './tutor.ts';
export * from './builder.ts';
export * from './marking.ts';
export * from './reportCard.ts';

export interface InsightResult {
  data: InsightData;
  source: 'minimax' | 'offline';
  model: string | null;
  error?: string;
}

function known(input: AnalystInput, defaultStudentId?: string) {
  return {
    skillIds: new Set(allSkillInfos().map((s) => s.id)),
    studentIds: new Set(input.students.map((s) => s.id)),
    lessonIds: new Set(COURSES.flatMap((c) => c.lessons.map((l) => l.id))),
    defaultStudentId,
  };
}

const ID_KEYS = new Set(['id', 'lessonId', 'skillId', 'skillIds', 'studentIds', 'actionId', 'type', 'status', 'scope', 'riskLevel']);

/**
 * The model sometimes names a lesson by its internal id ("reteach m10c-1-1"). A teacher reads the
 * report, so every such id in its sentences becomes the lesson's title.
 */
export function nameLessons<T>(value: T): T {
  if (typeof value === 'string') {
    return value.replace(/\b[a-z][a-z0-9]*(?:-[a-z0-9]+)*-\d+-\d+\b/g, (id) => {
      const title = lessonById(id)?.title;
      return title ? `“${title}”` : id;
    }) as unknown as T;
  }
  if (Array.isArray(value)) return value.map((v) => nameLessons(v)) as unknown as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, ID_KEYS.has(k) ? v : nameLessons(v)])) as T;
  }
  return value;
}

/** "Amara Okafor" → "Amara O." */
export function shortName(full: string): string {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return parts[0] ?? 'Student';
  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

/**
 * Generate an insight. If `ai` is provided, MiniMax is used; any failure falls back to
 * the offline analyst so teachers always get a useful answer.
 */
export async function generateInsight(
  input: AnalystInput,
  target: { scope: 'student'; studentId: string } | { scope: 'class' },
  ai?: MiniMaxConfig | null,
): Promise<InsightResult> {
  const offline = (): InsightData =>
    target.scope === 'student' ? analyzeStudent(buildStudentContext(input, target.studentId)) : analyzeClass(buildClassContext(input));
  if (!ai?.apiKey) return { data: offline(), source: 'offline', model: null };
  try {
    // Data minimisation: the external model sees first names and last initials only.
    const shared: AnalystInput = { ...input, students: input.students.map((s) => ({ ...s, name: shortName(s.name) })) };
    const p = target.scope === 'student' ? studentPrompt(buildStudentContext(shared, target.studentId)) : classPrompt(buildClassContext(shared));
    const res = await minimaxChat(ai, [
      { role: 'system', content: p.system },
      { role: 'user', content: p.user },
    ]);
    const data = validateInsight(extractJson(res.content), target.scope, known(input, target.scope === 'student' ? target.studentId : undefined));
    return { data: nameLessons(data), source: 'minimax', model: res.model };
  } catch (e) {
    return { data: offline(), source: 'offline', model: null, error: e instanceof Error ? e.message : String(e) };
  }
}
