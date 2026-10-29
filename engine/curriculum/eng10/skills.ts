import type { SkillDef } from '../../types.ts';
import { GRAMMAR_SKILLS } from './gen/grammar.ts';
import { STORY_SKILLS } from './gen/stories.ts';

export const ENG10_SKILLS: SkillDef[] = [...STORY_SKILLS, ...GRAMMAR_SKILLS];
