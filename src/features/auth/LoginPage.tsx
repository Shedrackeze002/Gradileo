import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, GraduationCap, Presentation } from 'lucide-react';
import { api, demoApi, setDemoBackend } from '@/data/index.ts';
import { SUPABASE_CONFIGURED } from '@/config.ts';
import { useAuth } from './AuthProvider.tsx';
import { Button, Input } from '@/components/ui/index.ts';
import { AuthLayout } from './AuthLayout.tsx';
import { DEMO_PASSWORD, DEMO_STUDENT_EMAIL, DEMO_TEACHER_EMAIL } from '@/data/demo/constants.ts';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const demo = demoApi();

  const go = async (id: string, pw: string, key: string) => {
    setBusy(key);
    setError(null);
    try {
      const u = await api().signIn(id, pw);
      setUser(u);
      const next = params.get('next');
      // Only pages in the app: the signed-in area, or (for a student) back to a class link.
      const ok = !!next && (next.startsWith(u.role === 'teacher' ? '/t' : '/s') || (u.role === 'student' && /^\/join\/[A-Za-z0-9]{4,12}$/.test(next)));
      navigate(ok ? next : u.role === 'teacher' ? '/t' : '/s', { replace: true });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue learning and teaching.">
      {demo && (
        <div className="mb-6 rounded-2xl border border-brand-200 bg-brand-50/70 p-4">
          <div className="text-sm font-semibold text-brand-800">Explore the demo</div>
          <p className="mt-1 text-sm text-ink-2">A sample Grade 10 Mathematics class with 16 students, real graded work and AI insights. Everything runs in your browser.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Button variant="primary" icon={<Presentation className="h-4 w-4" />} loading={busy === 'teacher'} onClick={() => go(DEMO_TEACHER_EMAIL, DEMO_PASSWORD, 'teacher')}>
              Teacher demo
            </Button>
            <Button variant="secondary" icon={<GraduationCap className="h-4 w-4" />} loading={busy === 'student'} onClick={() => go(DEMO_STUDENT_EMAIL, DEMO_PASSWORD, 'student')}>
              Student demo
            </Button>
          </div>
          <p className="mt-2 text-xs text-ink-3">Tip: open the student demo in a second tab — notifications and submissions sync between tabs.</p>
        </div>
      )}
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void go(identifier, password, 'form');
        }}
      >
        <Input label="Email or username" autoComplete="username" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required placeholder="you@school.ca or amara.o" />
        <Input label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{error}</p>}
        <Button type="submit" className="w-full" size="lg" loading={busy === 'form'}>
          Sign in <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-ink-3">
        New to Gradileo?{' '}
        <Link to="/signup" className="font-semibold text-brand hover:underline">
          Create an account
        </Link>
      </p>
      {!demo && SUPABASE_CONFIGURED && (
        <p className="mt-3 text-center text-xs text-ink-3">
          Just looking?{' '}
          <button type="button" className="font-medium text-brand hover:underline" onClick={() => setDemoBackend(true)}>
            Try the demo instead
          </button>
        </p>
      )}
    </AuthLayout>
  );
}
