/** Grade 12 English, Unit 4: Rhetoric and Argument (12-D1, 12-D2). */
import type { SkillDef } from '../../../types.ts';
import { REASONING_SKILLS } from './rhetoric-reasoning.ts';
import { STRATEGY_SKILLS } from './rhetoric-strategy.ts';

export const RHETORIC_SKILLS: SkillDef[] = [...STRATEGY_SKILLS, ...REASONING_SKILLS];
