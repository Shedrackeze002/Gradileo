/**
 * The GitHub issue an administrator opens to approve a course request: a prefilled "new issue"
 * link, so the request becomes a task for a build session. The repository is public, so the issue
 * says who asked only by role, never by name or email.
 */
import type { CourseRequest } from '@/data/types.ts';
import { GITHUB_REPO } from '@/config.ts';

export function courseIssueTitle(r: Pick<CourseRequest, 'kind' | 'title'>): string {
  return `${r.kind === 'course' ? 'Course' : 'Topic'} request: ${r.title}`;
}

export function courseIssueBody(r: Pick<CourseRequest, 'id' | 'kind' | 'title' | 'grade' | 'details' | 'createdAt' | 'requester'>): string {
  const details = (r.details ?? '').trim().slice(0, 1500);
  return [
    '## Request',
    '',
    `- **${r.kind === 'course' ? 'Course' : 'Topic'}:** ${r.title}`,
    `- **Grade:** ${r.grade ?? 'not given'}`,
    `- **Asked by:** a ${r.requester?.role ?? 'user'} on Gradileo`,
    `- **Received:** ${r.createdAt.slice(0, 10)}`,
    '',
    '## Details',
    '',
    details ? details.split('\n').map((l) => `> ${l}`).join('\n') : '_No details given._',
    '',
    '## Build checklist',
    '',
    '- [ ] Find the outcomes the course or topic needs in a published curriculum, and decide where it fits.',
    '- [ ] Follow "Adding a course" in `docs/ARCHITECTURE.md` and the curriculum rules in `CLAUDE.md`.',
    '- [ ] Lessons with explanations, worked examples, common mistakes and checks; a generator for every skill; run `npm run catalog`.',
    '- [ ] Run every check in `CLAUDE.md`, then redeploy `grade-submission` and `ai-agent` after merging.',
    '- [ ] Mark the request as built in the admin inbox so the person who asked is told.',
    '',
    `Gradileo request id: \`${r.id}\``,
  ].join('\n');
}

/** A link that opens GitHub's new-issue form with the request filled in. */
export function courseIssueUrl(r: Pick<CourseRequest, 'id' | 'kind' | 'title' | 'grade' | 'details' | 'createdAt' | 'requester'>, repo = GITHUB_REPO): string {
  const q = new URLSearchParams({ title: courseIssueTitle(r), body: courseIssueBody(r), labels: 'course-request' });
  return `https://github.com/${repo}/issues/new?${q.toString()}`;
}

/** Whether a pasted link is a GitHub issue (what the database accepts). */
export const isIssueUrl = (url: string) => /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/issues\/[0-9]+$/.test(url.trim());
