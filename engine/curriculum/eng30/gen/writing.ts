/**
 * Grade 12 English, Unit 6: Writing (12-F1, 12-F2). The critical essay, the comparative literary
 * essay, research writing, reflective writing, style, and the final examination essay.
 */
import type { SkillDef } from '../../../types.ts';
import { CRAFT_SKILLS } from './writing-craft.ts';
import { CRITICAL_SKILLS } from './writing-critical.ts';
import { RESEARCH_SKILLS } from './writing-research.ts';

export const WRITING_SKILLS: SkillDef[] = [...CRITICAL_SKILLS, ...RESEARCH_SKILLS, ...CRAFT_SKILLS];
