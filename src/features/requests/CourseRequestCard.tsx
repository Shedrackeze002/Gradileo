/** "Can't find what you need?" — students and teachers ask for a course or topic Gradileo lacks. */
import { useState } from 'react';
import { CheckCircle2, Clock, Hammer, Lightbulb, Send, XCircle } from 'lucide-react';
import { useMyCourseRequests, useRequestCourse } from '@/data/hooks.ts';
import type { CourseRequest } from '@/data/types.ts';
import { Badge, Button, Card, CardBody, Input, Modal, Select, Textarea, useToast } from '@/components/ui/index.ts';
import { relative } from '@/lib/dates.ts';
import { cn } from '@/lib/cn.ts';

const STATUS: Record<CourseRequest['status'], { label: string; tone: 'info' | 'good' | 'bad' | 'brand'; icon: typeof Clock }> = {
  new: { label: 'Received', tone: 'info', icon: Clock },
  approved: { label: 'Planned', tone: 'brand', icon: Hammer },
  done: { label: 'Ready', tone: 'good', icon: CheckCircle2 },
  declined: { label: 'Not planned', tone: 'bad', icon: XCircle },
};

export function CourseRequestCard({ who, className }: { who: 'student' | 'teacher'; className?: string }) {
  const [open, setOpen] = useState(false);
  const mine = useMyCourseRequests();
  const list = mine.data ?? [];
  return (
    <Card className={className}>
      <CardBody>
        <div className="flex flex-wrap items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warn-soft text-warn-ink">
            <Lightbulb className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1 basis-60">
            <div className="font-semibold">Can’t find the course or topic you need?</div>
            <p className="mt-0.5 text-sm text-ink-2">
              {who === 'teacher' ? 'Tell us what your class needs, such as another course or a topic to add, and we will look at building it.' : 'Tell us what you want to learn, and we will look at adding it to Gradileo.'}
            </p>
          </div>
          <Button variant="secondary" onClick={() => setOpen(true)} icon={<Send className="h-4 w-4" />}>
            Request a course
          </Button>
        </div>
        {list.length > 0 && (
          <ul className="mt-4 divide-y divide-line rounded-xl border border-line" aria-label="Your course requests">
            {list.slice(0, 5).map((r) => {
              const st = STATUS[r.status];
              return (
                <li key={r.id} className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <st.icon className="h-4 w-4 shrink-0 text-ink-3" />
                    <span className="min-w-0 flex-1 truncate text-[15px] font-medium">{r.title}</span>
                    <span className="hidden text-xs text-ink-3 sm:inline">{relative(r.createdAt)}</span>
                    <Badge tone={st.tone}>{st.label}</Badge>
                  </div>
                  {r.adminNote && <p className="mt-1 pl-7 text-sm text-ink-2">{r.adminNote}</p>}
                </li>
              );
            })}
          </ul>
        )}
      </CardBody>
      <RequestModal open={open} onClose={() => setOpen(false)} />
    </Card>
  );
}

function RequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [kind, setKind] = useState<'course' | 'topic'>('course');
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState<string | null>(null);
  const send = useRequestCourse();
  const toast = useToast();
  const submit = async () => {
    setError(null);
    try {
      await send.mutateAsync({ kind, title, grade: grade ? Number(grade) : null, details });
      toast({ kind: 'success', title: 'Request sent', body: 'Thank you. You will get a notification when it is planned or ready.' });
      setTitle('');
      setGrade('');
      setDetails('');
      onClose();
    } catch (e) {
      setError((e as Error).message);
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Request a course or topic"
      description="Requests go to the Gradileo team. Please do not include personal information."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} loading={send.isPending} disabled={title.trim().length < 3} icon={<Send className="h-4 w-4" />}>
            Send request
          </Button>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="What are you asking for?">
          {(
            [
              ['course', 'A whole course', 'For example, AP Calculus or Statistics'],
              ['topic', 'A topic', 'Something missing from a course'],
            ] as const
          ).map(([k, label, hint]) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={kind === k}
              onClick={() => setKind(k)}
              className={cn('rounded-xl border px-3 py-2.5 text-left transition', kind === k ? 'border-brand bg-brand-50 ring-2 ring-brand/20' : 'border-line hover:border-line-strong')}
            >
              <span className="block text-[15px] font-semibold">{label}</span>
              <span className="block text-xs text-ink-3">{hint}</span>
            </button>
          ))}
        </div>
        <Input label={kind === 'course' ? 'Course name' : 'Topic'} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} placeholder={kind === 'course' ? 'e.g. AP Calculus BC' : 'e.g. Matrices in Math 30-1'} required />
        <Select label="Grade (optional)" value={grade} onChange={(e) => setGrade(e.target.value)} className="max-w-[12rem]">
          <option value="">Any grade</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
            <option key={g} value={g}>
              Grade {g}
            </option>
          ))}
        </Select>
        <Textarea label="What should it cover? (optional)" value={details} onChange={(e) => setDetails(e.target.value)} maxLength={2000} rows={4} />
        {error && <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{error}</p>}
      </form>
    </Modal>
  );
}
