/**
 * Grade 11 English, Unit 6: Writing (11-F1, 11-F2). The essays themselves are written work that
 * teachers mark (with AI-suggested marks); these skills practise the parts that can be marked
 * automatically: analytical and comparative theses, depth of analysis, block and point-by-point
 * structure, paraphrase and synthesis, argument structure and concession, revising for style, and
 * reading a prompt and managing time in a timed literary essay.
 */
import type { SkillDef } from '../../../types.ts';
import { ANALYSIS_SKILLS } from './writing-analysis.ts';
import { SOURCES_SKILLS } from './writing-sources.ts';
import { STYLE_SKILLS } from './writing-style.ts';

export const WRITING_SKILLS: SkillDef[] = [...ANALYSIS_SKILLS, ...SOURCES_SKILLS, ...STYLE_SKILLS];
