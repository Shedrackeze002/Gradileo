import type { SkillDef } from '../../types.ts';
import { GRAMMAR_SKILLS } from './gen/grammar.ts';
import { INFO_SKILLS } from './gen/info.ts';
import { POETRY_SKILLS } from './gen/poetry.ts';
import { STORY_SKILLS } from './gen/stories.ts';
import { WORD_SKILLS } from './gen/words.ts';
import { WRITING_SKILLS } from './gen/writing.ts';

export const ENG5_SKILLS: SkillDef[] = [...STORY_SKILLS, ...POETRY_SKILLS, ...INFO_SKILLS, ...WORD_SKILLS, ...GRAMMAR_SKILLS, ...WRITING_SKILLS];
