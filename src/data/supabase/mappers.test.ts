import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Assignment } from '../types.ts';
import { assignmentChanges, fromAssignment } from './mappers.ts';

/** The columns of public.assignments that the latest migration granting them lets a signed-in user write. */
function granted(privilege: 'insert' | 'update'): string[] {
  const dir = join(__dirname, '../../../supabase/migrations');
  const pattern = new RegExp(`grant ${privilege} \\(([^)]*)\\)\\s+on public\\.assignments to authenticated`, 'g');
  let columns: string[] = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.sql')).sort()) {
    for (const m of readFileSync(join(dir, file), 'utf8').matchAll(pattern)) columns = m[1].split(',').map((c) => c.trim());
  }
  return columns;
}

const assignment: Assignment = {
  id: 'a1',
  classId: 'c1',
  title: 'Quiz 1',
  type: 'quiz',
  instructions: 'Show your work.',
  content: { sections: [], custom: [] },
  settings: {} as Assignment['settings'],
  openAt: null,
  dueAt: '2026-11-01T12:00:00Z',
  allowLate: true,
  reminderHours: [24, 2],
  assignedTo: 'all',
  status: 'draft',
  createdAt: '2026-10-28T12:00:00Z',
  publishedAt: null,
  createdBy: 'teacher',
  aiRationale: null,
};

describe('assignment rows', () => {
  it('creates an assignment with only the columns teachers may insert', () => {
    const insertable = granted('insert');
    expect(insertable).toContain('class_id');
    for (const column of Object.keys(fromAssignment(assignment))) expect(insertable).toContain(column);
  });

  it('edits an assignment with only the columns teachers may update, so never its class', () => {
    const updatable = granted('update');
    expect(updatable.length).toBeGreaterThan(0);
    const changes = assignmentChanges(assignment);
    expect(changes).not.toHaveProperty('class_id');
    expect(changes).toMatchObject({ title: 'Quiz 1', due_at: '2026-11-01T12:00:00Z' });
    for (const column of Object.keys(changes)) expect(updatable).toContain(column);
  });
});
