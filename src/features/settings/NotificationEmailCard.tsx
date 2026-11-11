import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { api, demoApi } from '@/data/index.ts';
import { DEMO_EMAIL_CODE } from '@/data/demo/emailCode.ts';
import type { NotificationEmail } from '@/data/types.ts';
import { Button, Card, CardBody, CardHeader, Input, useToast } from '@/components/ui/index.ts';

/**
 * For a student whose account has no email address (a username from their teacher, or a class
 * link): add a parent's or guardian's email, so class reminders also arrive there. The code goes to
 * the parent, who agrees by giving it to the student to type back (the owner's decision, 11 November
 * 2026: many students are under 13).
 */
export function NotificationEmailCard() {
  const toast = useToast();
  const demo = demoApi();
  const [state, setState] = useState<NotificationEmail | null>(null);
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    api()
      .getNotificationEmail()
      .then((s) => live && setState(s))
      .catch(() => live && setState({ email: null, pendingEmail: null }));
    return () => {
      live = false;
    };
  }, []);

  async function run(what: string, fn: () => Promise<NotificationEmail>, done?: string) {
    setBusy(what);
    try {
      const s = await fn();
      setState(s);
      if (done) toast({ kind: 'success', title: done });
      return s;
    } catch (e) {
      toast({ kind: 'error', title: 'Could not do that', body: (e as Error).message });
      return null;
    } finally {
      setBusy(null);
    }
  }

  const waiting = state?.pendingEmail;
  const showForm = state && (!state.email || editing) && !waiting;

  return (
    <Card>
      <CardHeader
        title="Email reminders"
        subtitle="Your account has no email address. Add a parent's or guardian's, and reminders from classes whose teacher turned on email reminders will also arrive there."
        icon={<Mail className="h-5 w-5" />}
      />
      <CardBody className="space-y-4 pt-4">
        {demo && <p className="text-sm text-ink-3">The demo sends no email: the code is always {DEMO_EMAIL_CODE}.</p>}
        {!state && <p className="text-sm text-ink-3">Loading…</p>}

        {state?.email && !editing && !waiting && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm">
              Reminders go to <strong>{state.email}</strong>.
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
                Change
              </Button>
              <Button variant="ghost" size="sm" loading={busy === 'remove'} onClick={() => run('remove', () => api().removeNotificationEmail(), 'Email address removed')}>
                Remove
              </Button>
            </div>
          </div>
        )}

        {showForm && (
          <form
            className="flex flex-wrap items-end gap-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const s = await run('request', () => api().requestNotificationEmail(email.trim()));
              if (s) {
                setCode('');
                toast({ kind: 'success', title: 'Code sent', body: `Ask your parent or guardian for the code sent to ${email.trim()}.` });
              }
            }}
          >
            <div className="min-w-0 flex-1">
              <Input type="email" label="Parent or guardian's email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={254} hint="We email them a code. If they agree, they give you the code to type below." />
            </div>
            <Button type="submit" loading={busy === 'request'} disabled={!email.trim()}>
              Send code
            </Button>
            {editing && (
              <Button variant="ghost" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            )}
          </form>
        )}

        {waiting && (
          <form
            className="space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const s = await run('confirm', () => api().confirmNotificationEmail(code), 'Email address confirmed');
              if (s) {
                setEditing(false);
                setEmail('');
              }
            }}
          >
            <p className="text-sm">
              We sent a six-digit code to <strong>{waiting}</strong>. If your parent or guardian agrees, ask them for it. It works for 15 minutes.
            </p>
            <div className="flex flex-wrap items-end gap-3">
              <div className="w-40">
                <Input label="Code" inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} />
              </div>
              <Button type="submit" loading={busy === 'confirm'} disabled={code.length !== 6}>
                Confirm
              </Button>
              <Button variant="ghost" loading={busy === 'resend'} onClick={() => run('resend', () => api().requestNotificationEmail(waiting), 'A new code is on its way')}>
                Send a new code
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setEditing(true);
                  setState({ email: state?.email ?? null, pendingEmail: null });
                }}
              >
                Use a different address
              </Button>
            </div>
          </form>
        )}
      </CardBody>
    </Card>
  );
}
