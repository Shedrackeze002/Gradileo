import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Archive, Bell, Copy, KeyRound, RefreshCw, Settings2, Sparkles, Trash2 } from 'lucide-react';
import { DEFAULT_MODEL } from '@engine/ai/minimax.ts';
import { api, demoApi } from '@/data/index.ts';
import { qk, useAiStatus, useClass, useDeleteClass, useRoster, useUpdateClass } from '@/data/hooks.ts';
import type { ClassRoom } from '@/data/types.ts';
import { Button, Card, CardBody, CardHeader, Input, Modal, PageHeader, PageSpinner, Select, Switch, useToast } from '@/components/ui/index.ts';
import { cn } from '@/lib/cn.ts';
import { joinLink } from './StudentsPage.tsx';
import { useClassId } from './shared.tsx';

const REMINDER_OPTIONS = [72, 48, 24, 12, 6, 2, 1];
const COMMON_ZONES = ['America/St_Johns', 'America/Halifax', 'America/Toronto', 'America/Winnipeg', 'America/Regina', 'America/Edmonton', 'America/Vancouver', 'America/Whitehorse', 'UTC'];

function timeZones(current?: string): string[] {
  let all: string[] = [];
  try {
    all = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf?.('timeZone') ?? [];
  } catch {
    all = [];
  }
  const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return [...new Set([...(current ? [current] : []), local, ...COMMON_ZONES, ...all])];
}

const hoursLabel = (h: number) => (h >= 24 ? `${h / 24} day${h === 24 ? '' : 's'}` : `${h} h`);

export default function ClassSettingsPage() {
  const classId = useClassId();
  const cls = useClass(classId);
  const update = useUpdateClass(classId);
  const qc = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [section, setSection] = useState('');

  useEffect(() => {
    if (cls.data) {
      setName(cls.data.name);
      setSection(cls.data.section ?? '');
    }
  }, [cls.data]);

  useEffect(() => {
    if (window.location.hash === '#ai') setTimeout(() => document.getElementById('ai')?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  if (cls.isLoading || !cls.data) return <PageSpinner />;
  const c = cls.data;
  const hours = c.settings.reminderHours;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader title="Class settings" subtitle={c.name} />

      <Card>
        <CardHeader title="General" icon={<Settings2 className="h-5 w-5" />} />
        <CardBody className="space-y-4 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Class name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} />
            <Input label="Section or period" value={section} onChange={(e) => setSection(e.target.value)} maxLength={40} />
          </div>
          <div className="flex justify-end">
            <Button
              disabled={!name.trim() || (name === c.name && section === (c.section ?? ''))}
              loading={update.isPending}
              onClick={async () => {
                try {
                  await update.mutateAsync({ name: name.trim(), section: section.trim() || null });
                  toast({ kind: 'success', title: 'Saved' });
                } catch (err) {
                  toast({ kind: 'error', title: 'Could not save', body: (err as Error).message });
                }
              }}
            >
              Save
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Join code" subtitle="Share the join link: students type just their name, and you approve them. Students with a Gradileo account can enter the code." icon={<KeyRound className="h-5 w-5" />} />
        <CardBody className="space-y-5 pt-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="font-mono text-3xl font-bold tracking-[0.25em] text-brand-800">{c.joinCode}</div>
            <div className="flex flex-1 flex-wrap justify-end gap-2">
              <Button
                variant="secondary"
                icon={<Copy className="h-4 w-4" />}
                onClick={() => {
                  navigator.clipboard?.writeText(joinLink(c.joinCode));
                  toast({ kind: 'success', title: 'Join link copied' });
                }}
              >
                Copy join link
              </Button>
              <Button
                variant="ghost"
                icon={<RefreshCw className="h-4 w-4" />}
                onClick={async () => {
                  if (!window.confirm('Create a new code? The old code will stop working. Students already in the class are not affected.')) return;
                  const next = await api().regenerateJoinCode(classId);
                  qc.setQueryData(qk.class(classId), next);
                  toast({ kind: 'success', title: `New code: ${next.joinCode}` });
                }}
              >
                New code
              </Button>
            </div>
          </div>
          <Switch
            checked={!!c.settings.joinApproval}
            onChange={(joinApproval) => update.mutate({ settings: { joinApproval } })}
            label="Approve students before they join"
            description="Students who use the code send you a request, and you approve or decline it on the Students page. Students you add yourself join straight away."
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Deadline reminders" subtitle="Defaults for new assignments. Only students who have not submitted are reminded." icon={<Bell className="h-5 w-5" />} />
        <CardBody className="space-y-5 pt-4">
          <div className="flex flex-wrap gap-2">
            {REMINDER_OPTIONS.map((h) => {
              const on = hours.includes(h);
              return (
                <button
                  key={h}
                  type="button"
                  aria-pressed={on}
                  onClick={() => update.mutate({ settings: { reminderHours: (on ? hours.filter((x) => x !== h) : [...hours, h]).sort((a, b) => b - a) } })}
                  className={cn('rounded-full border px-3 py-1.5 text-sm font-medium transition', on ? 'border-brand bg-brand-50 text-brand-800' : 'border-line text-ink-3 hover:border-line-strong')}
                >
                  {hoursLabel(h)} before
                </button>
              );
            })}
          </div>
          <Select
            label="Time zone"
            hint="Used for due times in notifications and emails."
            value={c.settings.timezone ?? 'America/Edmonton'}
            onChange={(e) => update.mutate({ settings: { timezone: e.target.value } })}
            className="max-w-sm"
          >
            {timeZones(c.settings.timezone).map((z) => (
              <option key={z} value={z}>
                {z.replace(/_/g, ' ')}
              </option>
            ))}
          </Select>
          <Switch
            checked={c.settings.emailReminders}
            onChange={(emailReminders) => update.mutate({ settings: { emailReminders } })}
            label="Also send reminders by email"
            description={demoApi() ? 'Available once Gradileo is connected to Supabase and an email provider (see docs/SETUP.md). In-app and browser notifications always work.' : 'Emails go to students who signed up with an email address, and to students with a username or class link who added one in Settings. Everyone else gets in-app notifications.'}
          />
        </CardBody>
      </Card>

      <AiCard classId={classId} autopilot={c.settings.aiAutopilot} onAutopilot={(aiAutopilot) => update.mutate({ settings: { aiAutopilot } })} />

      <Card className="border-bad/30">
        <CardHeader title="Archive class" subtitle="Hides the class from students and your class list. Nothing is deleted." icon={<Archive className="h-5 w-5" />} />
        <CardBody className="flex justify-end pt-4">
          <Button
            variant="danger"
            onClick={async () => {
              if (!window.confirm(`${c.archived ? 'Restore' : 'Archive'} ${c.name}?`)) return;
              try {
                await update.mutateAsync({ archived: !c.archived });
                navigate('/t?all');
              } catch (err) {
                toast({ kind: 'error', title: `Could not ${c.archived ? 'restore' : 'archive'} the class`, body: (err as Error).message });
              }
            }}
          >
            {c.archived ? 'Restore class' : 'Archive class'}
          </Button>
        </CardBody>
      </Card>

      <DeleteClassCard cls={c} />
    </div>
  );
}

/** Deleting a class for good, after the teacher types its name: for a class made by mistake. */
function DeleteClassCard({ cls }: { cls: ClassRoom }) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const roster = useRoster(cls.id);
  const remove = useDeleteClass(cls.id);
  const navigate = useNavigate();
  const toast = useToast();
  const students = roster.data?.length ?? 0;
  const close = () => {
    setOpen(false);
    setTyped('');
  };
  const confirmed = typed.trim().toLowerCase() === cls.name.trim().toLowerCase();

  return (
    <Card className="border-bad/30">
      <CardHeader title="Delete class" subtitle="Removes the class for good, with its roster, assignments, submissions and grades. This cannot be undone." icon={<Trash2 className="h-5 w-5" />} />
      <CardBody className="flex justify-end pt-4">
        <Button variant="danger" icon={<Trash2 className="h-4 w-4" />} onClick={() => setOpen(true)}>
          Delete class
        </Button>
      </CardBody>
      <Modal
        open={open}
        onClose={close}
        size="sm"
        title={`Delete ${cls.name}?`}
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={!confirmed}
              loading={remove.isPending}
              onClick={async () => {
                try {
                  await remove.mutateAsync();
                  toast({ kind: 'success', title: 'Class deleted', body: `${cls.name} and everything in it is gone.` });
                  navigate('/t?all');
                } catch (err) {
                  toast({ kind: 'error', title: 'Could not delete the class', body: (err as Error).message });
                }
              }}
            >
              Delete for good
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-[15px] text-ink-2">
          <p>
            {students > 0
              ? `${students} student${students === 1 ? ' is' : 's are'} in this class. They lose access to it, and their work and grades in it are deleted. To keep the work, archive the class instead.`
              : 'Nobody has joined this class yet.'}
          </p>
          <Input label={`Type ${cls.name} to confirm`} value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" />
        </div>
      </Modal>
    </Card>
  );
}

function AiCard({ classId, autopilot, onAutopilot }: { classId: string; autopilot: boolean; onAutopilot: (v: boolean) => void }) {
  const status = useAiStatus();
  const demo = demoApi();
  const qc = useQueryClient();
  const toast = useToast();
  const saved = demo?.getAiKey();
  const [key, setKey] = useState(saved?.key ?? '');
  const [model, setModel] = useState(saved?.model ?? '');
  const [testing, setTesting] = useState(false);

  return (
    <Card id="ai" className="scroll-mt-24">
      <CardHeader title="AI teaching assistant" subtitle={status.data?.note} icon={<Sparkles className="h-5 w-5" />} />
      <CardBody className="space-y-5 pt-4">
        <Switch checked={autopilot} onChange={onAutopilot} label="Autopilot practice" description="After graded work, automatically assign a short practice set on the skills each student missed." />
        {demo ? (
          <div className="space-y-3 rounded-xl border border-line p-4">
            <div className="text-sm font-semibold">Try live MiniMax analysis in the demo</div>
            <p className="text-sm text-ink-3">Your key is stored only in this browser and sent only to MiniMax. In production the key lives on the server as a Supabase secret and is never exposed to browsers.</p>
            <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
              <Input label="MiniMax API key" type="password" autoComplete="off" value={key} onChange={(e) => setKey(e.target.value)} placeholder="sk-…" />
              <Input label="Model" value={model} onChange={(e) => setModel(e.target.value)} placeholder={DEFAULT_MODEL} />
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              {saved?.key && (
                <Button
                  variant="ghost"
                  onClick={async () => {
                    demo.setAiKey(null);
                    setKey('');
                    setModel('');
                    await qc.invalidateQueries({ queryKey: qk.aiStatus });
                    toast({ kind: 'success', title: 'Key removed', body: 'Using the offline analyst.' });
                  }}
                >
                  Remove key
                </Button>
              )}
              <Button
                variant="secondary"
                disabled={!key.trim()}
                loading={testing}
                onClick={async () => {
                  demo.setAiKey(key, model);
                  await qc.invalidateQueries({ queryKey: qk.aiStatus });
                  setTesting(true);
                  try {
                    const ins = await api().generateInsight(classId, null);
                    await qc.invalidateQueries({ queryKey: ['insights', classId] });
                    if (ins.source === 'minimax') toast({ kind: 'success', title: 'MiniMax is connected', body: `A new class report was generated with ${ins.model}.` });
                    else toast({ kind: 'error', title: 'MiniMax did not respond', body: ins.error ?? 'The offline analyst was used instead.' });
                  } finally {
                    setTesting(false);
                  }
                }}
              >
                Save & test
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-surface-2/60 p-4 text-sm text-ink-2">
            The MiniMax key is configured on the server (<code>MINIMAX_API_KEY</code> secret on the <code>ai-agent</code> edge function). Without it, Gradileo uses its offline analyst so insights always work. See <code>docs/SETUP.md</code>.
          </div>
        )}
      </CardBody>
    </Card>
  );
}
