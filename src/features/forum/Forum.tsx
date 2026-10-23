/**
 * The class forum: students ask questions for their class and choose who sees each one (only the
 * teacher, the whole class, or the class without their name); anyone who can see a question can
 * reply. The teacher sees every post and who wrote it, and pins, marks answered, hides or removes
 * posts. The same pages serve the teacher (/t/c/:classId/forum) and the student (/s/forum).
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { CheckCircle2, EyeOff, Lock, MessageSquare, MessagesSquare, Pin, Trash2, UserX, Users } from 'lucide-react';
import { api } from '@/data/index.ts';
import { useForum } from '@/data/hooks.ts';
import type { ForumPost, ForumVisibility } from '@/data/types.ts';
import { Avatar, Badge, Button, Card, CardBody, EmptyState, Input, PageHeader, PageSpinner, Textarea, useToast } from '@/components/ui/index.ts';
import { Markdown } from '@/components/math/Markdown.tsx';
import { relative } from '@/lib/dates.ts';
import { cn } from '@/lib/cn.ts';

type Role = 'teacher' | 'student';

const VISIBILITY: Record<ForumVisibility, { label: string; choice: string; hint: string; icon: typeof Users }> = {
  class: { label: 'Class', choice: 'My class', hint: 'Everyone in the class sees it, with your name.', icon: Users },
  anonymous: { label: 'Class, no name', choice: 'My class, without my name', hint: 'Everyone sees it; only your teacher knows it is yours.', icon: UserX },
  teacher: { label: 'Only the teacher', choice: 'Only my teacher', hint: 'Just you and your teacher.', icon: Lock },
};

function useRefresh(classId: string) {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ['forum', classId] });
}

const byline = (p: ForumPost) => (p.mine ? 'You' : p.authorName);

function VisibilityBadge({ v }: { v: ForumVisibility }) {
  const V = VISIBILITY[v];
  return (
    <Badge icon={<V.icon className="h-3 w-3" />} tone={v === 'teacher' ? 'info' : 'neutral'}>
      {V.label}
    </Badge>
  );
}

/** The list of questions, pinned first and then the newest, with a form to ask one. */
export function ForumList({ classId, role, base }: { classId: string; role: Role; base: string }) {
  const forum = useForum(classId);
  const [asking, setAsking] = useState(false);
  if (forum.isLoading) return <PageSpinner />;
  if (forum.isError) return <EmptyState title="The forum is not available">{(forum.error as Error).message}</EmptyState>;
  const posts = forum.data ?? [];
  const topics = posts
    .filter((p) => !p.topicId)
    .map((t) => {
      const replies = posts.filter((r) => r.topicId === t.id);
      return { t, replies: replies.length, last: replies.length ? replies[replies.length - 1].createdAt : t.createdAt };
    })
    .sort((a, b) => Number(b.t.pinned) - Number(a.t.pinned) || b.last.localeCompare(a.last));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Class forum"
        subtitle={role === 'teacher' ? 'Your students’ questions. You see who wrote every post, and you can pin, hide or remove any of them.' : 'Ask your class and your teacher. You choose who sees each question.'}
        actions={
          !asking && (
            <Button icon={<MessageSquare className="h-4 w-4" />} onClick={() => setAsking(true)}>
              {role === 'teacher' ? 'New post' : 'Ask a question'}
            </Button>
          )
        }
      />
      {asking && <AskForm classId={classId} role={role} base={base} onClose={() => setAsking(false)} />}
      {topics.length === 0 ? (
        <EmptyState icon={<MessagesSquare className="h-6 w-6" />} title="No questions yet">
          {role === 'teacher' ? 'When students ask a question, it appears here and you are notified.' : 'Stuck on something? Ask a question: your class or your teacher can help.'}
        </EmptyState>
      ) : (
        <Card>
          <div className="divide-y divide-line">
            {topics.map(({ t, replies, last }) => (
              <Link key={t.id} to={`${base}/${t.id}`} className="flex items-start gap-3 px-5 py-4 hover:bg-surface-2/50">
                <Avatar name={t.authorId ? t.authorName : '?'} size={36} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {t.pinned && <Pin className="h-4 w-4 text-brand" aria-label="Pinned" />}
                    <span className="font-medium">{t.title}</span>
                    {t.answered && (
                      <Badge tone="good" icon={<CheckCircle2 className="h-3 w-3" />}>
                        Answered
                      </Badge>
                    )}
                    {t.hidden && <Badge tone="warn">Hidden from the class</Badge>}
                  </div>
                  <div className="mt-0.5 line-clamp-1 text-sm text-ink-3">
                    <Markdown md={t.body} inline sanitize />
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-3">
                    <span>
                      {byline(t)}
                      {role === 'teacher' && t.visibility === 'anonymous' && ' (shown to the class without a name)'} · {relative(last)}
                    </span>
                    <VisibilityBadge v={t.visibility} />
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-1 text-sm text-ink-3" aria-label={`${replies} repl${replies === 1 ? 'y' : 'ies'}`}>
                  <MessageSquare className="h-4 w-4" /> {replies}
                </span>
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function AskForm({ classId, role, base, onClose }: { classId: string; role: Role; base: string; onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [visibility, setVisibility] = useState<ForumVisibility>('class');
  const [busy, setBusy] = useState(false);
  const refresh = useRefresh(classId);
  const toast = useToast();
  const navigate = useNavigate();
  return (
    <Card>
      <CardBody className="space-y-4">
        <Input label={role === 'teacher' ? 'Title' : 'Your question'} maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={role === 'teacher' ? 'e.g. Unit 2 test: what to revise' : 'e.g. How do I know when to flip the inequality sign?'} />
        <Textarea label="Details" rows={4} maxLength={4000} value={body} onChange={(e) => setBody(e.target.value)} placeholder="What have you tried? Write maths in dollar signs, e.g. $-2x > 6$." />
        {role === 'student' && (
          <fieldset>
            <legend className="label">Who can see it?</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {(['class', 'anonymous', 'teacher'] as const).map((v) => {
                const V = VISIBILITY[v];
                return (
                  <label key={v} className={cn('flex cursor-pointer items-start gap-2 rounded-xl border p-3', visibility === v ? 'border-brand bg-brand-50/50' : 'border-line hover:border-line-strong')}>
                    <input type="radio" name="visibility" className="mt-1 accent-[rgb(var(--brand))]" checked={visibility === v} onChange={() => setVisibility(v)} />
                    <span>
                      <span className="block text-sm font-medium">{V.choice}</span>
                      <span className="block text-xs text-ink-3">{V.hint}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button
            loading={busy}
            disabled={!title.trim() || !body.trim()}
            onClick={async () => {
              setBusy(true);
              try {
                const id = await api().forumPost({ classId, title: title.trim(), body: body.trim(), visibility });
                await refresh();
                navigate(`${base}/${id}`);
              } catch (e) {
                toast({ kind: 'error', title: 'Could not post', body: (e as Error).message });
                setBusy(false);
              }
            }}
          >
            Post
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

/** One question with its replies, a reply box, and what the reader may do with each post. */
export function ForumTopic({ classId, topicId, role, base }: { classId: string; topicId: string; role: Role; base: string }) {
  const forum = useForum(classId);
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const refresh = useRefresh(classId);
  const toast = useToast();
  const navigate = useNavigate();
  if (forum.isLoading) return <PageSpinner />;
  const t = forum.data?.find((p) => p.id === topicId && !p.topicId);
  if (!t) return <EmptyState title="Question not found">It may have been removed.</EmptyState>;
  const replies = (forum.data ?? []).filter((p) => p.topicId === t.id);
  const teacher = role === 'teacher';

  async function act(label: string, fn: () => Promise<unknown>, after?: () => void) {
    setBusy(label);
    try {
      await fn();
      await refresh();
      after?.();
    } catch (e) {
      toast({ kind: 'error', title: 'Could not do that', body: (e as Error).message });
    } finally {
      setBusy(null);
    }
  }
  const remove = (p: ForumPost) => window.confirm(p.topicId ? 'Remove this reply?' : 'Remove this question and its replies?') && act(`del-${p.id}`, () => api().deleteForumPost(p.id), p.topicId ? undefined : () => navigate(base));

  const Post = ({ p }: { p: ForumPost }) => (
    <div className={cn('flex gap-3', p.hidden && 'opacity-70')}>
      <Avatar name={p.authorId ? p.authorName : '?'} size={36} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium">{byline(p)}</span>
          {p.authorRole === 'teacher' && <Badge tone="brand">Teacher</Badge>}
          {teacher && !p.mine && t.visibility === 'anonymous' && p.authorId === t.authorId && <span className="text-xs text-ink-3">(the class sees “A classmate”)</span>}
          <span className="text-xs text-ink-3">{relative(p.createdAt)}</span>
          {p.hidden && (
            <Badge tone="warn" icon={<EyeOff className="h-3 w-3" />}>
              {teacher ? 'Hidden from the class' : 'Hidden by your teacher'}
            </Badge>
          )}
        </div>
        <Markdown md={p.body} sanitize className="mt-1 text-[15px]" />
        <div className="mt-1.5 flex flex-wrap gap-1">
          {teacher && (
            <Button size="xs" variant="ghost" icon={<EyeOff className="h-3.5 w-3.5" />} loading={busy === `hide-${p.id}`} onClick={() => act(`hide-${p.id}`, () => api().moderateForumPost(p.id, { hidden: !p.hidden }))}>
              {p.hidden ? 'Show to the class' : 'Hide from the class'}
            </Button>
          )}
          {(teacher || p.mine) && (
            <Button size="xs" variant="ghost" icon={<Trash2 className="h-3.5 w-3.5" />} loading={busy === `del-${p.id}`} onClick={() => remove(p)}>
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        back={{ to: base, label: 'Class forum' }}
        title={t.title}
        subtitle={
          <span className="flex flex-wrap items-center gap-2">
            <VisibilityBadge v={t.visibility} />
            {t.pinned && <Badge icon={<Pin className="h-3 w-3" />}>Pinned</Badge>}
            {t.answered && (
              <Badge tone="good" icon={<CheckCircle2 className="h-3 w-3" />}>
                Answered
              </Badge>
            )}
          </span>
        }
        actions={
          <div className="flex flex-wrap gap-2">
            {teacher && (
              <Button size="sm" variant="secondary" icon={<Pin className="h-4 w-4" />} loading={busy === 'pin'} onClick={() => act('pin', () => api().moderateForumPost(t.id, { pinned: !t.pinned }))}>
                {t.pinned ? 'Unpin' : 'Pin'}
              </Button>
            )}
            {(teacher || t.mine) && (
              <Button size="sm" variant="secondary" icon={<CheckCircle2 className="h-4 w-4" />} loading={busy === 'answered'} onClick={() => act('answered', () => api().moderateForumPost(t.id, { answered: !t.answered }))}>
                {t.answered ? 'Not answered yet' : 'Mark answered'}
              </Button>
            )}
          </div>
        }
      />
      <Card>
        <CardBody className="space-y-5">
          <Post p={t} />
          {replies.length > 0 && (
            <div className="space-y-5 border-t border-line pt-5" aria-label="Replies">
              {replies.map((r) => (
                <Post key={r.id} p={r} />
              ))}
            </div>
          )}
        </CardBody>
      </Card>
      <Card>
        <CardBody className="space-y-3">
          <Textarea label="Your reply" rows={3} maxLength={4000} value={reply} onChange={(e) => setReply(e.target.value)} placeholder={teacher ? 'Answer the question, or point to the lesson that explains it.' : 'Help with an idea, or say what you tried.'} />
          {!teacher && t.visibility === 'anonymous' && t.mine && <p className="text-xs text-ink-3">Your replies here show as “A classmate”, like your question.</p>}
          <div className="flex justify-end">
            <Button loading={busy === 'reply'} disabled={!reply.trim()} onClick={() => act('reply', () => api().forumPost({ classId, topicId: t.id, body: reply.trim() }), () => setReply(''))}>
              Reply
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
