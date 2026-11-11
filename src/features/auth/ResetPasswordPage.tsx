import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '@/data/index.ts';
import { Button, Input, PageSpinner, useToast } from '@/components/ui/index.ts';
import { useAuth } from './AuthProvider.tsx';
import { AuthLayout } from './AuthLayout.tsx';
import { clearRecovery } from './recovery.ts';

/** Where the emailed "choose a new password" link lands. The link has already signed its owner in. */
export default function ResetPasswordPage() {
  const { user, loading } = useAuth();
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  if (loading) return <PageSpinner />;

  if (!user) {
    return (
      <AuthLayout title="This link no longer works" subtitle="A password link can be used once and expires after a while.">
        <Button to="/forgot-password" className="w-full" size="lg">
          Send me a new link
        </Button>
        <p className="mt-6 text-center text-sm">
          <Link to="/login" className="font-semibold text-brand hover:underline">
            Back to sign in
          </Link>
        </p>
      </AuthLayout>
    );
  }

  const home = user.role === 'teacher' ? '/t' : '/s';

  const submit = async () => {
    setError(null);
    if (pw.length < 8) return setError('Use at least 8 characters.');
    if (pw !== pw2) return setError('The passwords do not match.');
    setBusy(true);
    try {
      await api().changePassword(pw);
      clearRecovery();
      toast({ kind: 'success', title: 'Password changed', body: 'Use it the next time you sign in.' });
      navigate(home, { replace: true });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Choose a new password" subtitle={`For ${user.email || user.fullName}.`}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <Input label="New password" type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} required hint="At least 8 characters" />
        <Input label="Confirm new password" type="password" autoComplete="new-password" value={pw2} onChange={(e) => setPw2(e.target.value)} required />
        {error && <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{error}</p>}
        <Button type="submit" className="w-full" size="lg" loading={busy}>
          Save the new password
        </Button>
      </form>
      <p className="mt-6 text-center text-sm">
        <button
          type="button"
          className="font-medium text-ink-3 hover:text-ink hover:underline"
          onClick={() => {
            clearRecovery();
            navigate(home, { replace: true });
          }}
        >
          Keep my old password
        </button>
      </p>
    </AuthLayout>
  );
}
