import type { SkillDef } from '../../types.ts';
import { DRAMA_SKILLS } from './gen/drama.ts';
import { ESSAY_SKILLS } from './gen/essay.ts';
import { FICTION_SKILLS } from './gen/fiction.ts';
import { LANGUAGE_SKILLS } from './gen/language.ts';
import { MEDIA_SKILLS } from './gen/media.ts';
import { POETRY_SKILLS } from './gen/poetry.ts';
import { WRITING_SKILLS } from './gen/writing.ts';

export const ENG20_SKILLS: SkillDef[] = [...FICTION_SKILLS, ...POETRY_SKILLS, ...DRAMA_SKILLS, ...ESSAY_SKILLS, ...MEDIA_SKILLS, ...WRITING_SKILLS, ...LANGUAGE_SKILLS];
