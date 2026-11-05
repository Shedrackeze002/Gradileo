/** Grade 8 English: every skill, unit by unit. */
import type { SkillDef } from '../../types.ts';
import { FICTION_SKILLS } from './gen/fiction.ts';
import { POETRY_SKILLS } from './gen/poetry.ts';
import { DRAMA_SKILLS } from './gen/drama.ts';
import { NONFICTION_SKILLS } from './gen/nonfiction.ts';
import { MEDIA_SKILLS } from './gen/media.ts';
import { GRAMMAR_SKILLS } from './gen/grammar.ts';
import { WRITING_SKILLS } from './gen/writing.ts';

export const ENG8_SKILLS: SkillDef[] = [...FICTION_SKILLS, ...POETRY_SKILLS, ...DRAMA_SKILLS, ...NONFICTION_SKILLS, ...MEDIA_SKILLS, ...GRAMMAR_SKILLS, ...WRITING_SKILLS];
