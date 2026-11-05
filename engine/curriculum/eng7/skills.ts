import type { SkillDef } from '../../types.ts';
import { STORY_SKILLS } from './gen/stories.ts';
import { POETRY_SKILLS } from './gen/poetry.ts';
import { DRAMA_SKILLS } from './gen/drama.ts';
import { NONFICTION_SKILLS } from './gen/nonfiction.ts';
import { MEDIA_SKILLS } from './gen/media.ts';
import { GRAMMAR_SKILLS } from './gen/grammar.ts';
import { WRITING_SKILLS } from './gen/writing.ts';

export const ENG7_SKILLS: SkillDef[] = [...STORY_SKILLS, ...POETRY_SKILLS, ...DRAMA_SKILLS, ...NONFICTION_SKILLS, ...MEDIA_SKILLS, ...GRAMMAR_SKILLS, ...WRITING_SKILLS];
