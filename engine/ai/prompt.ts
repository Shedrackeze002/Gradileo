/**
 * Prompt construction for the MiniMax-powered teaching assistant.
 * The model receives compact, factual JSON and must return JSON matching InsightData.
 */
import type { ClassContext, StudentContext } from './types.ts';

/**
 * A course's subject as a prompt names it: "mathematics", "chemistry", and a language such as
 * "English" with its capital. Mathematics when the course gives none.
 */
export function subjectName(subject?: string): string {
  const s = subject?.trim() || 'Mathematics';
  return /^(English|French|Spanish)\b/.test(s) ? s : s.toLowerCase();
}

const sharedRules = (subject?: string) => `You are Gradileo's teaching assistant: an expert secondary ${subjectName(subject)} teacher and learning scientist.
You analyse real performance data and advise a busy teacher. Follow these rules strictly:
- Ground every claim in the data provided. Never invent scores, students, skills or events.
- Refer to skills by their exact skillId from the data. Refer to students by their exact id.
- Mastery levels, from lowest to highest: not_started, attempted, familiar, proficient, mastered. pKnown is the estimated probability the student knows the skill (0..1).
- Prefer specific, actionable next steps over general advice. Each next step should be doable this week.
- Diagnose misconceptions from the wrong-answer samples when the pattern is clear (e.g. sign errors, forgetting the middle term, using height instead of slant height). If evidence is thin, say so.
- Use plain, warm, professional language a teacher can share with a parent. No markdown headings. Math may use LaTeX inside $...$.
- Output ONLY one JSON object, no prose before or after, no code fences.`;

const SCHEMA = `{
  "headline": string (one sentence, <= 140 chars),
  "summary": string (2-4 sentences),
  "riskLevel": "on_track" | "watch" | "at_risk",
  "strengths": [{ "skillId"?: string, "text": string }],
  "weaknesses": [{ "skillId"?: string, "text": string, "evidence"?: string }],
  "misconceptions": [{ "skillId"?: string, "text": string }],
  "growth": [{ "skillId"?: string, "text": string }],
  "actions": [{
    "type": "assign_practice" | "assign_review" | "reteach_lesson" | "challenge" | "check_in",
    "title": string,
    "skillIds": string[],
    "studentIds": string[],
    "lessonId"?: string,
    "questionCount"?: number (5-20),
    "dueInDays"?: number (1-7),
    "rationale": string
  }],
  "nextSteps": [{ "text": string, "actionIndex"?: number }],
  GROUPS_FIELD
  STUDENT_NOTE_FIELD
}`;

export function studentPrompt(ctx: StudentContext): { system: string; user: string } {
  const schema = SCHEMA.replace('GROUPS_FIELD', '').replace(
    'STUDENT_NOTE_FIELD',
    '"studentNote": string (2-3 encouraging sentences addressed to the student, naming one concrete next step)',
  );
  return {
    system: `${sharedRules(ctx.subject)}\n\nReturn JSON with this shape:\n${schema}\n\nLimits: up to 4 items in each list, up to 3 actions. Actions must target only this student (studentIds = ["${ctx.student.id}"]).`,
    user: `Analyse this student's progress and recommend next steps for the teacher.\n\nDATA:\n${JSON.stringify(ctx)}`,
  };
}

export function classPrompt(ctx: ClassContext): { system: string; user: string } {
  const schema = SCHEMA.replace(
    'GROUPS_FIELD',
    '"groups": [{ "name": string, "studentIds": string[], "skillIds": string[], "rationale": string }] (small groups for targeted reteaching),',
  ).replace('STUDENT_NOTE_FIELD', '');
  return {
    system: `${sharedRules(ctx.subject)}\n\nReturn JSON with this shape:\n${schema}\n\nLimits: up to 5 items in each list, up to 4 actions, up to 4 groups. Prefer whole-class reteaching when more than 40% of active students struggle with a skill, and small-group practice otherwise. Include at least one "challenge" action for students who have mastered the taught skills, if any.`,
    user: `Analyse this class and recommend the most valuable next steps for the teacher.\n\nDATA:\n${JSON.stringify(ctx)}`,
  };
}
