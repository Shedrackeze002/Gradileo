/**
 * Grade 11 English, Unit 4: The Essay and Rhetoric (11-D1, 11-D2). Kinds of essay and central ideas,
 * rhetorical analysis, satire, and evaluating arguments and evidence.
 */
import type { SkillDef } from '../../../types.ts';
import { ARGUMENT_SKILLS } from './essay-argument.ts';
import { READING_SKILLS } from './essay-reading.ts';

export const ESSAY_SKILLS: SkillDef[] = [...READING_SKILLS, ...ARGUMENT_SKILLS];
