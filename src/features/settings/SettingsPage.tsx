import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Bell, Database, KeyRound, Monitor, Moon, Palette, RefreshCcw, Sun, UserRound } from 'lucide-react';
import { api, demoApi, setDemoBackend } from '@/data/index.ts';
import { qk } from '@/data/hooks.ts';
import { STUDENT_EMAIL_DOMAIN, SUPABASE_CONFIGURED } from '@/config.ts';
import { useAuth, useMe } from '@/features/auth/AuthProvider.tsx';
import { Avatar, Badge, Button, Card, CardBody, CardHeader, Input, PageHeader, useToast } from '@/components/ui/index.ts';
import { useTheme } from '@/lib/theme.ts';
import { cn } from '@/lib/cn.ts';
import { NotificationEmailCard } from './NotificationEmailCard.tsx';

const COLORS = ['#6a43e3', '#2a78d6', '#0e8a6a', '#c2410c', '#be185d', '#7c3aed', '#0f766e', '#b45309', '#4338ca', '#475569'];

export default function SettingsPage() {
  const me = useMe();
  const { setUser } = useAuth();
  const qc = useQueryClient();
  const toast = useToast();
  const [theme, setTheme] = useTheme();
  const [name, setName] = useState(me.fullName);
  const [color, setColor] = useState(me.avatarColor);
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [perm, setPerm] = useState<NotificationPermission | 'unsupported'>(() => ('Notification' in window ? Notification.permission : 'unsupported'));
  const demo = demoApi();
  // A username from the teacher, or a class-link account: no email address of their own.
  const noEmail = me.role === 'student' && (!!me.nameOnly || !!me.username || me.email.toLowerCase().endsWith(`@${STUDENT_EMAIL_DOMAIN}`));

  useEffect(() => {
    setName(me.fullName);
    setColor(me.avatarColor);
  }, [me.fullName, me.avatarColor]);

  async function saveProfile() {
    setBusy('profile');
    try {
      const u = await api().updateProfile({ fullName: name.trim(), avatarColor: color });
      setUser(u);
      await qc.invalidateQueries({ queryKey: qk.me });
      toast({ kind: 'success', title: 'Profile saved' });
    } catch (e) {
      toast({ kind: 'error', title: 'Could not save', body: (e as Error).message });
    } finally {
      setBusy(null);
    }
  }

  async function savePassword() {
    if (pw.length < 8) return toast({ kind: 'error', title: 'Use at least 8 characters' });
    if (pw !== pw2) return toast({ kind: 'error', title: 'The passwords do not match' });
    setBusy('pw');
    try {
      await api().changePassword(pw);
      setPw('');
      setPw2('');
      toast({ kind: 'success', title: 'Password changed' });
    } catch (e) {
      toast({ kind: 'error', title: 'Could not change password', body: (e as Error).message });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader title="Settings" subtitle={me.role === 'teacher' ? 'Your teacher account' : 'Your student account'} />

      <Card>
        <CardHeader title="Profile" icon={<UserRound className="h-5 w-5" />} />
        <CardBody className="space-y-4 pt-4">
          <div className="flex items-center gap-4">
            <Avatar name={name || me.fullName} color={color} size={56} />
            <div className="min-w-0">
              <div className="font-semibold">{me.fullName}</div>
              <div className="text-sm text-ink-3">{me.nameOnly ? 'Joined with a class link: this device keeps you signed in.' : me.username ? `Username: ${me.username}` : me.email}</div>
            </div>
          </div>
          <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
          <div>
            <div className="label flex items-center gap-1.5">
              <Palette className="h-4 w-4" /> Avatar colour
            </div>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button key={c} type="button" onClick={() => setColor(c)} aria-label={`Colour ${c}`} aria-pressed={color === c} className={cn('h-8 w-8 rounded-full ring-offset-2 ring-offset-surface transition', color === c && 'ring-2 ring-ink')} style={{ background: c }} />
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={saveProfile} loading={busy === 'profile'} disabled={!name.trim()}>
              Save profile
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Appearance" icon={<Sun className="h-5 w-5" />} />
        <CardBody className="pt-4">
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ['light', Sun, 'Light'],
                ['dark', Moon, 'Dark'],
                ['system', Monitor, 'Match device'],
              ] as const
            ).map(([v, Icon, label]) => (
              <button key={v} type="button" onClick={() => setTheme(v)} aria-pressed={theme === v} className={cn('flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition', theme === v ? 'border-brand bg-brand-50/60 text-brand-800' : 'border-line hover:border-line-strong')}>
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Notifications" subtitle="Gradileo always shows notifications in the app. Browser alerts also reach you when the tab is in the background." icon={<Bell className="h-5 w-5" />} />
        <CardBody className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="text-sm">
            Browser alerts:{' '}
            <Badge tone={perm === 'granted' ? 'good' : perm === 'denied' ? 'bad' : 'neutral'}>{perm === 'granted' ? 'On' : perm === 'denied' ? 'Blocked in browser settings' : perm === 'unsupported' ? 'Not supported' : 'Off'}</Badge>
          </div>
          {perm === 'default' && (
            <Button
              variant="secondary"
              onClick={async () => {
                const p = await Notification.requestPermission();
                setPerm(p);
                if (p === 'granted') new Notification('Gradileo notifications are on', { body: 'You will be alerted about new work and upcoming deadlines.', icon: `${import.meta.env.BASE_URL}favicon.svg` });
              }}
            >
              Turn on browser alerts
            </Button>
          )}
        </CardBody>
      </Card>

      {noEmail && <NotificationEmailCard />}

      <Card>
        <CardHeader title="Password" icon={<KeyRound className="h-5 w-5" />} />
        <CardBody className="space-y-4 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input type="password" label="New password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} hint="At least 8 characters" />
            <Input type="password" label="Confirm new password" autoComplete="new-password" value={pw2} onChange={(e) => setPw2(e.target.value)} />
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={savePassword} loading={busy === 'pw'} disabled={!pw}>
              Change password
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Data" icon={<Database className="h-5 w-5" />} subtitle={demo ? 'You are using the demo. Everything is stored in this browser only.' : 'Connected to your Gradileo server.'} />
        <CardBody className="flex flex-wrap justify-end gap-2 pt-4">
          {demo && (
            <Button
              variant="secondary"
              icon={<RefreshCcw className="h-4 w-4" />}
              onClick={async () => {
                if (!window.confirm('Reset the demo? All changes in this browser will be replaced with the sample class.')) return;
                await demo.reset();
                window.location.assign(`${import.meta.env.BASE_URL}login`);
              }}
            >
              Reset demo data
            </Button>
          )}
          {demo && SUPABASE_CONFIGURED && <Button onClick={() => setDemoBackend(false)}>Leave demo</Button>}
          {!demo && (
            <Button variant="secondary" onClick={() => setDemoBackend(true)}>
              Open the demo instead
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
