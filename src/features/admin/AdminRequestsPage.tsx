/**
 * Course requests from students and teachers. Approving one opens a prefilled GitHub issue for a
 * build session; the issue link is saved here and the person who asked is told at each step.
 */
import { useState } from 'react';
import { CheckCircle2, ExternalLink, Github, Hammer, Inbox, RotateCcw, XCircle } from 'lucide-react';
import { useAdminCourseRequests, useAdminUpdateCourseRequest } from '@/data/hooks.ts';
import type { CourseRequest, CourseRequestStatus } from '@/data/types.ts';
import { Badge, Button, Card, EmptyState, Input, PageHeader, Skeleton, Tabs, Textarea, useToast } from '@/components/ui/index.ts';
import { relative } from '@/lib/dates.ts';
import { courseIssueUrl, isIssueUrl } from '@/features/requests/issue.ts';

type Filter = CourseRequestStatus | 'all';

const TABS: Array<{ value: Filter; label: string }> = [
  { value: 'new', label: 'New' },
  { value: 'approved', label: 'Planned' },
  { value: 'done', label: 'Built' },
  { value: 'declined', label: 'Declined' },
  { value: 'all', label: 'All' },
];

const STATUS_BADGE: Record<CourseRequestStatus, { label: string; tone: 'info' | 'brand' | 'good' | 'bad' }> = {
  new: { label: 'New', tone: 'info' },
  approved: { label: 'Planned', tone: 'brand' },
  done: { label: 'Built', tone: 'good' },
  declined: { label: 'Declined', tone: 'bad' },
};

export default function AdminRequestsPage() {
  const [filter, setFilter] = useState<Filter>('new');
  const requests = useAdminCourseRequests(filter === 'all' ? undefined : filter);
  const rows = requests.data ?? [];
  return (
    <div>
      <PageHeader eyebrow="Admin console" title="Course requests" subtitle="Courses and topics students and teachers asked for. Approving one opens a GitHub issue for a build session." />
      <Tabs className="mb-4" value={filter} onChange={setFilter} items={TABS} />
      {requests.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      ) : requests.error ? (
        <p className="rounded-xl bg-bad-soft px-4 py-3 text-bad-ink">{(requests.error as Error).message}</p>
      ) : rows.length === 0 ? (
        <EmptyState icon={<Inbox className="h-6 w-6" />} title={filter === 'new' ? 'No new requests' : 'Nothing here'}>
          {filter === 'new' ? 'Requests appear here when a student or teacher asks for a course or topic.' : 'Try another tab.'}
        </EmptyState>
      ) : (
        <ul className="space-y-3" aria-label="Course requests">
          {rows.map((r) => (
            <RequestItem key={r.id} r={r} />
          ))}
        </ul>
      )}
    </div>
  );
}

function RequestItem({ r }: { r: CourseRequest }) {
  const update = useAdminUpdateCourseRequest();
  const toast = useToast();
  const [declining, setDeclining] = useState(false);
  const [note, setNote] = useState(r.adminNote ?? '');
  const [link, setLink] = useState(r.issueUrl ?? '');
  const badge = STATUS_BADGE[r.status];

  const save = async (status: CourseRequestStatus, patch: { note?: string | null; issueUrl?: string | null } = {}, done?: string) => {
    try {
      await update.mutateAsync({ id: r.id, status, note: patch.note !== undefined ? patch.note : r.adminNote, issueUrl: patch.issueUrl !== undefined ? patch.issueUrl : r.issueUrl });
      if (done) toast({ kind: 'success', title: done });
    } catch (e) {
      toast({ kind: 'error', title: 'Could not update the request', body: (e as Error).message });
    }
  };

  return (
    <li>
      <Card className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
          <div className="min-w-0 flex-1 basis-64">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[17px] font-semibold">{r.title}</span>
              <Badge tone="neutral">{r.kind === 'course' ? 'Course' : 'Topic'}</Badge>
              {r.grade && <Badge tone="neutral">Grade {r.grade}</Badge>}
              <Badge tone={badge.tone}>{badge.label}</Badge>
            </div>
            <div className="mt-0.5 text-sm text-ink-3">
              {r.requester?.name ?? 'Someone'} ({r.requester?.role ?? 'user'}) · {relative(r.createdAt)}
            </div>
          </div>
        </div>
        {r.details && <p className="mt-3 whitespace-pre-line text-[15px] text-ink-2">{r.details}</p>}
        {r.adminNote && !declining && <p className="mt-3 rounded-xl bg-surface-2 px-3 py-2 text-sm text-ink-2">Note to them: {r.adminNote}</p>}

        {r.status === 'new' && !declining && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              icon={<Github className="h-4 w-4" />}
              loading={update.isPending}
              onClick={async () => {
                window.open(courseIssueUrl(r), '_blank', 'noopener');
                await save('approved', {}, 'Planned. Paste the issue link once you create it on GitHub.');
              }}
            >
              Approve and open a GitHub issue
            </Button>
            <Button variant="ghost" icon={<XCircle className="h-4 w-4" />} onClick={() => setDeclining(true)}>
              Decline
            </Button>
          </div>
        )}

        {declining && (
          <div className="mt-4 space-y-2">
            <Textarea label="Note to the person who asked (optional)" value={note} onChange={(e) => setNote(e.target.value)} maxLength={1000} rows={2} placeholder="For example: this is covered in Math 12 Pre-calculus, Unit 4." />
            <div className="flex gap-2">
              <Button variant="danger" loading={update.isPending} onClick={async () => { await save('declined', { note }, 'Request declined'); setDeclining(false); }}>
                Decline request
              </Button>
              <Button variant="ghost" onClick={() => setDeclining(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {r.status === 'approved' && (
          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap items-end gap-2">
              <Input label="GitHub issue link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://github.com/owner/repo/issues/12" className="min-w-0 flex-1 basis-72" />
              <Button variant="secondary" disabled={link.trim() === (r.issueUrl ?? '') || (!!link.trim() && !isIssueUrl(link))} loading={update.isPending} onClick={() => save('approved', { issueUrl: link.trim() || null }, 'Issue link saved')}>
                Save link
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {r.issueUrl ? (
                <Button variant="ghost" icon={<ExternalLink className="h-4 w-4" />} onClick={() => window.open(r.issueUrl!, '_blank', 'noopener')}>
                  Open the issue
                </Button>
              ) : (
                <Button variant="ghost" icon={<Github className="h-4 w-4" />} onClick={() => window.open(courseIssueUrl(r), '_blank', 'noopener')}>
                  Open a new issue again
                </Button>
              )}
              <Button icon={<Hammer className="h-4 w-4" />} loading={update.isPending} onClick={() => save('done', {}, 'Marked as built. They have been told.')}>
                Mark as built
              </Button>
            </div>
          </div>
        )}

        {(r.status === 'declined' || r.status === 'done') && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {r.issueUrl && (
              <a href={r.issueUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                <ExternalLink className="h-4 w-4" /> GitHub issue
              </a>
            )}
            {r.status === 'done' && <CheckCircle2 className="h-4 w-4 text-good" />}
            <Button variant="ghost" size="sm" icon={<RotateCcw className="h-4 w-4" />} onClick={() => save('new', { note: null }, 'Moved back to new')}>
              Reopen
            </Button>
          </div>
        )}
      </Card>
    </li>
  );
}
