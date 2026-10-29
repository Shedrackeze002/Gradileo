/**
 * Grade 10 English, Unit 6: Writing (10-F1, 10-F2). The essays themselves are written work that
 * teachers mark (with AI-suggested marks); these skills practise the parts that can be marked
 * automatically: responses and theses, evidence and quotations, persuasion and rebuttal, narrative
 * technique and dialogue, revising, and planning a timed essay.
 */
import type { SkillDef } from '../../../types.ts';
import { PERSUADE_SKILLS } from './writing-persuade.ts';
import { RESPONSE_SKILLS } from './writing-response.ts';
import { REVISE_SKILLS } from './writing-revise.ts';

export const WRITING_SKILLS: SkillDef[] = [...RESPONSE_SKILLS, ...PERSUADE_SKILLS, ...REVISE_SKILLS];
