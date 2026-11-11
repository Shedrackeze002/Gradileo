import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, Info, Presentation } from 'lucide-react';
import { api } from '@/data/index.ts';
import { useSignupConfig } from '@/data/hooks.ts';
import type { Role } from '@/data/types.ts';
import { useAuth } from './AuthProvider.tsx';
import { Button, Input } from '@/components/ui/index.ts';
import { AuthLayout } from './AuthLayout.tsx';
import { cn } from '@/lib/cn.ts';

export default function SignupPage() {
  const [params] = useSearchParams();
  const [role, setRole] = useState<Role>(params.get('role') === 'teacher' ? 'teacher' : 'student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [joinCode, setJoinCode] = useState((params.get('code') ?? '').toUpperCase().slice(0, 8));
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [resend, setResend] = useState<'idle' | 'busy' | 'sent'>('idle');
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const config = useSignupConfig();

  const submit = async () => {
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      const u = await api().signUp({ fullName, email, password, role, joinCode: role === 'student' ? joinCode : undefined });
      setUser(u);
      // Students without a class code go to onboarding, which recommends a course to start on their own.
      navigate(u.role === 'teacher' ? '/t' : joinCode.trim() ? '/s' : '/s/welcome', { replace: true });
    } catch (e) {
      const msg = (e as Error).message;
      if (msg.startsWith('Account created')) setInfo(msg);
      else setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Teachers set up classes. Students join with a class code or study on their own.">
      <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-surface-2 p-1.5">
        {(
          [
            ['student', 'I’m a student', GraduationCap],
            ['teacher', 'I’m a teacher', Presentation],
          ] as const
        ).map(([r, label, Icon]) => (
          <button key={r} type="button" onClick={() => setRole(r)} className={cn('flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition', role === r ? 'bg-surface text-ink shadow-card' : 'text-ink-3 hover:text-ink')}>
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <Input label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required autoComplete="name" />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} autoComplete="new-password" hint="At least 6 characters." />
        {role === 'teacher' && config.data?.teacherSignup === 'approval' && (
          <p className="flex gap-2 rounded-xl bg-info-soft px-3 py-2.5 text-sm text-info-ink">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            New teacher accounts are reviewed by an administrator before they can create classes. You will be notified when yours is approved.
          </p>
        )}
        {role === 'student' && (
          <Input label="Class code (if you have one)" value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} placeholder="e.g. MATH10" hint="Optional. Without a code, we help you find the right course to study on your own." className="[&_input]:font-mono [&_input]:uppercase [&_input]:tracking-widest" />
        )}
        {error && <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{error}</p>}
        {info && (
          <div className="rounded-xl bg-good-soft px-3 py-2 text-sm text-good-ink" role="status">
            <p>{info}</p>
            <button
              type="button"
              className="mt-1 font-semibold underline disabled:opacity-60"
              disabled={resend !== 'idle'}
              onClick={async () => {
                setResend('busy');
                try {
                  await api().resendConfirmation(email);
                  setResend('sent');
                } catch (e) {
                  setResend('idle');
                  setError((e as Error).message);
                }
              }}
            >
              {resend === 'sent' ? 'Sent again. Check your inbox and your spam folder.' : resend === 'busy' ? 'Sending…' : 'No email? Send it again'}
            </button>
          </div>
        )}
        <Button type="submit" className="w-full" size="lg" loading={busy}>
          Create account
        </Button>
        <p className="text-center text-xs text-ink-3">
          By creating an account, you agree to the{' '}
          <Link to="/terms" className="text-brand hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-brand hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
      <p className="mt-6 text-center text-sm text-ink-3">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
