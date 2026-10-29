import type { SkillDef } from '../../types.ts';
import { DRAMA_SKILLS } from './gen/drama.ts';
import { GRAMMAR_SKILLS } from './gen/grammar.ts';
import { MEDIA_SKILLS } from './gen/media.ts';
import { NONFICTION_SKILLS } from './gen/nonfiction.ts';
import { POETRY_SKILLS } from './gen/poetry.ts';
import { STORY_SKILLS } from './gen/stories.ts';
import { WRITING_SKILLS } from './gen/writing.ts';

export const ENG10_SKILLS: SkillDef[] = [...STORY_SKILLS, ...POETRY_SKILLS, ...DRAMA_SKILLS, ...NONFICTION_SKILLS, ...MEDIA_SKILLS, ...WRITING_SKILLS, ...GRAMMAR_SKILLS];
