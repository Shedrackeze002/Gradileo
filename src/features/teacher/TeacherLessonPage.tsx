import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink, FileText, Link2, MessageCircleQuestion, PencilLine, PenLine, Plus, Presentation, Target, Trash2, Video } from 'lucide-react';
import { lessonById } from '@engine/curriculum/index.ts';
import { LEVELS, type MasteryLevel } from '@engine/mastery.ts';
import { useAddResource, useBoards, useClassQuestions, useDeleteBoard, useDeleteQuestion, useDeleteResource, useMastery, usePublications, useResources, useRoster, useSetBoardShared, useSetPublished, useSetQuestionStatus } from '@/data/hooks.ts';
import type { Board, ClassQuestion, Resource } from '@/data/types.ts';
import { Badge, Button, Card, CardBody, CardHeader, EmptyState, IconButton, Input, Modal, PageHeader, Switch, Tabs, Textarea, useToast } from '@/components/ui/index.ts';
import { MasteryBar, MasteryLegend } from '@/components/mastery/Mastery.tsx';
import { LessonView } from '@/features/lessons/LessonView.tsx';
import { MyLessonEdits, SuggestEditModal, type SectionSource } from '@/features/lessons/SuggestEdit.tsx';
import { videoEmbedUrl } from '@/features/lessons/LessonBlocks.tsx';
import { BoardPageCanvas, BoardViewer } from '@/features/whiteboard/BoardView.tsx';
import { fmtDate, fmtDateTime } from '@/lib/dates.ts';
import { masteryMap, skillLabel, stateOf } from '../shared/derive.ts';
import { AssignMenu } from './CurriculumPage.tsx';
import { useClassId } from './shared.tsx';

export default function TeacherLessonPage() {
  const classId = useClassId();
  const { lessonId = '' } = useParams();
  const meta = lessonById(lessonId);
  const pubs = usePublications(classId);
  const setPub = useSetPublished(classId);
  const resources = useResources(classId);
  const roster = useRoster(classId);
  const mastery = useMastery({ classId });
  const [adding, setAdding] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [editing, setEditing] = useState<SectionSource | null>(null);
  const toast = useToast();
  const isPublished = (pubs.data ?? []).some((p) => p.lessonId === lessonId);
  const mine = (resources.data ?? []).filter((r) => r.lessonId === lessonId);

  const skillRows = useMemo(() => {
    if (!meta) return [];
    const maps = (roster.data ?? []).map((s) => masteryMap(mastery.data ?? [], s.id));
    return meta.skills.map((skillId) => {
      const counts = Object.fromEntries(LEVELS.map((l) => [l, 0])) as Record<MasteryLevel, number>;
      for (const m of maps) counts[stateOf(m, skillId).level]++;
      return { skillId, counts, total: maps.length };
    });
  }, [meta, roster.data, mastery.data]);

  if (!meta) return <EmptyState title="Lesson not found" action={<Button to={`/t/c/${classId}/curriculum`}>Back to curriculum</Button>} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={<span className="sr-only">Lesson {meta.number}</span>}
        className="mb-0"
        back={{ to: `/t/c/${classId}/curriculum`, label: 'Curriculum' }}
        actions={
          <>
            <div className="card flex items-center gap-3 px-3 py-1.5">
              <Switch
                checked={isPublished}
                onChange={async (v) => {
                  await setPub.mutateAsync({ lessonId, published: v });
                  toast({ kind: 'success', title: v ? 'Lesson published' : 'Lesson hidden', body: v ? 'Students can now open it from Learn.' : 'Students can no longer see it.' });
                }}
                label={<span className="text-sm">{isPublished ? 'Published' : 'Hidden from students'}</span>}
              />
            </div>
            <Button variant="secondary" to={`/present/${classId}/${lessonId}`} icon={<Presentation className="h-4 w-4" />}>
              Present
            </Button>
            <AssignMenu classId={classId} lessonId={lessonId} />
            <Button variant={suggesting ? 'soft' : 'ghost'} icon={<PencilLine className="h-4 w-4" />} onClick={() => setSuggesting((v) => !v)} aria-pressed={suggesting}>
              {suggesting ? 'Done suggesting' : 'Suggest edits'}
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader title="How the class is doing" subtitle="Mastery of this lesson's skills across your roster" icon={<Target className="h-5 w-5" />} />
          <CardBody className="space-y-3 pt-4">
            {skillRows.map((r) => (
              <div key={r.skillId} className="grid items-center gap-2 sm:grid-cols-[1fr_180px_auto]">
                <div className="text-sm">{skillLabel(r.skillId)}</div>
                <MasteryBar counts={r.counts} total={r.total} />
                <Button size="xs" variant="ghost" to={`/t/c/${classId}/assignments/new?type=practice&skills=${r.skillId}`}>
                  Assign practice
                </Button>
              </div>
            ))}
            <MasteryLegend className="pt-1" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Your resources" subtitle="Videos, links and notes shown at the end of the lesson" icon={<Video className="h-5 w-5" />} action={<Button size="sm" variant="soft" icon={<Plus className="h-4 w-4" />} onClick={() => setAdding(true)}>Add</Button>} />
          <CardBody className="space-y-2 pt-4">
            {mine.length === 0 && <p className="text-sm text-ink-3">Add your own explainer video, a Desmos activity link or a note for students.</p>}
            {mine.map((r) => (
              <ResourceRow key={r.id} r={r} classId={classId} />
            ))}
          </CardBody>
        </Card>
      </div>

      <ClassQuestionsCard classId={classId} lessonId={lessonId} />
      <SavedBoards classId={classId} lessonId={lessonId} />

      {suggesting && (
        <p className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">
          Choose <strong>Suggest an edit</strong> on any section below. An administrator reviews each suggestion; once approved, every class sees the change.
        </p>
      )}
      <MyLessonEdits lessonId={lessonId} />
      <LessonView lessonId={lessonId} resources={mine} onSuggest={suggesting ? setEditing : undefined} />
      <SuggestEditModal lessonId={lessonId} source={editing} onClose={() => setEditing(null)} />
      <AddResourceModal open={adding} onClose={() => setAdding(false)} classId={classId} lessonId={lessonId} />
    </div>
  );
}

const QUESTION_STATUS: Record<ClassQuestion['status'], { label: string; tone: 'info' | 'good' | 'warn' }> = {
  new: { label: 'Not answered', tone: 'info' },
  answered: { label: 'Answered', tone: 'good' },
  skipped: { label: 'Skipped', tone: 'warn' },
};

/** Questions students sent from their devices while this lesson was presented, with their names. */
function ClassQuestionsCard({ classId, lessonId }: { classId: string; lessonId: string }) {
  const list = useClassQuestions(classId, { lessonId });
  const setStatus = useSetQuestionStatus(classId);
  const del = useDeleteQuestion(classId);
  const questions = list.data ?? [];
  if (!questions.length) return null;
  return (
    <Card>
      <CardHeader title="Questions from the class" subtitle="Sent from students’ devices while you presented this lesson. Only you see who asked." icon={<MessageCircleQuestion className="h-5 w-5" />} />
      <CardBody className="divide-y divide-line pt-2">
        {questions.map((q) => (
          <div key={q.id} className="flex flex-wrap items-start gap-3 py-3 sm:flex-nowrap">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 text-sm text-ink-3">
                <span className="font-semibold text-ink">{q.studentName ?? 'A student'}</span>
                {q.anonymous && <span>· name kept off the class’s screen</span>}
                <span>· {fmtDateTime(q.createdAt)}</span>
              </div>
              <p className="mt-1 break-words">{q.body}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Badge tone={QUESTION_STATUS[q.status].tone}>{QUESTION_STATUS[q.status].label}</Badge>
              {q.status !== 'answered' && (
                <Button size="xs" variant="ghost" onClick={() => setStatus.mutate({ id: q.id, status: 'answered' })}>
                  Mark answered
                </Button>
              )}
              <IconButton label="Delete question" className="h-8 w-8" onClick={() => window.confirm('Delete this question?') && del.mutate(q.id)}>
                <Trash2 className="h-4 w-4" />
              </IconButton>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

function SavedBoards({ classId, lessonId }: { classId: string; lessonId: string }) {
  const boards = useBoards(classId, lessonId);
  const share = useSetBoardShared(classId, lessonId);
  const del = useDeleteBoard(classId, lessonId);
  const [open, setOpen] = useState<Board | null>(null);
  const list = boards.data ?? [];
  if (!list.length) return null;
  return (
    <Card>
      <CardHeader title="Saved whiteboards" subtitle="Boards saved while presenting. Share one and students see it with this lesson." icon={<PenLine className="h-5 w-5" />} />
      <CardBody className="grid gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((b) => (
          <div key={b.id} className="rounded-2xl border border-line p-2">
            <button type="button" className="block w-full" onClick={() => setOpen(b)} aria-label={`View ${b.title}`}>
              {b.pages[0] && <BoardPageCanvas page={b.pages[0]} label={`${b.title}, first page`} />}
            </button>
            <div className="flex items-center gap-2 px-1.5 pt-2">
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{b.title}</div>
                <div className="text-xs text-ink-3">
                  {b.pages.length} page{b.pages.length === 1 ? '' : 's'} · {fmtDate(b.updatedAt)}
                </div>
              </div>
              <IconButton label="Delete board" className="h-8 w-8" onClick={() => window.confirm(`Delete “${b.title}”?`) && del.mutate(b.id)}>
                <Trash2 className="h-4 w-4" />
              </IconButton>
            </div>
            <div className="px-1.5 pb-1 pt-2">
              <Switch checked={b.shared} onChange={(v) => share.mutate({ id: b.id, shared: v })} label={<span className="text-sm">{b.shared ? 'Shared with students' : 'Only you can see it'}</span>} />
            </div>
          </div>
        ))}
      </CardBody>
      <BoardViewer board={open} onClose={() => setOpen(null)} />
    </Card>
  );
}

function ResourceRow({ r, classId }: { r: Resource; classId: string }) {
  const del = useDeleteResource(classId);
  const Icon = r.kind === 'video' ? Video : r.kind === 'link' ? Link2 : FileText;
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line px-3 py-2">
      <Icon className="h-4 w-4 shrink-0 text-brand" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{r.title}</div>
        {r.url && <div className="truncate text-xs text-ink-3">{r.url}</div>}
      </div>
      {r.url && (
        <a href={r.url} target="_blank" rel="noreferrer" className="rounded-lg p-1.5 text-ink-3 hover:bg-surface-2 hover:text-ink" aria-label="Open">
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
      <IconButton label="Delete resource" className="h-8 w-8" onClick={() => window.confirm(`Delete “${r.title}”?`) && del.mutate(r.id)}>
        <Trash2 className="h-4 w-4" />
      </IconButton>
    </div>
  );
}

export function AddResourceModal({ open, onClose, classId, lessonId }: { open: boolean; onClose: () => void; classId: string; lessonId: string | null }) {
  const [kind, setKind] = useState<Resource['kind']>('video');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const add = useAddResource(classId);
  const toast = useToast();
  const embed = kind === 'video' && url ? videoEmbedUrl(url) : null;
  const valid = title.trim() && (kind === 'note' ? body.trim() : /^https?:\/\//.test(url.trim()));
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add a resource"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!valid}
            loading={add.isPending}
            onClick={async () => {
              await add.mutateAsync({ classId, lessonId, kind, title: title.trim(), url: kind === 'note' ? null : url.trim(), body: kind === 'note' ? body : null });
              toast({ kind: 'success', title: 'Resource added' });
              setTitle('');
              setUrl('');
              setBody('');
              onClose();
            }}
          >
            Add resource
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Tabs
          value={kind}
          onChange={setKind}
          items={[
            { value: 'video', label: 'Video' },
            { value: 'link', label: 'Link' },
            { value: 'note', label: 'Note' },
          ]}
        />
        <Input label="Title" maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={kind === 'video' ? 'e.g. Converting units with unit fractions' : kind === 'link' ? 'e.g. Desmos: explore slope' : 'e.g. Tips for tomorrow’s quiz'} />
        {kind !== 'note' ? (
          <Input label="URL" value={url} onChange={(e) => setUrl(e.target.value)} placeholder={kind === 'video' ? 'YouTube or Vimeo link' : 'https://'} hint={kind === 'video' ? (url ? (embed ? 'This video will play inside the lesson.' : 'Not a YouTube or Vimeo link: students will get a link instead.') : 'YouTube and Vimeo play inline.') : undefined} />
        ) : (
          <Textarea label="Note" rows={6} maxLength={20000} value={body} onChange={(e) => setBody(e.target.value)} hint={'Markdown and $math$ supported, e.g. $\\frac{3}{4}$'} />
        )}
      </div>
    </Modal>
  );
}
