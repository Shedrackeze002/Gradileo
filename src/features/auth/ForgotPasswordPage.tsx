import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MailCheck } from 'lucide-react';
import { api, demoApi } from '@/data/index.ts';
import { Button, Input } from '@/components/ui/index.ts';
import { AuthLayout } from './AuthLayout.tsx';

/** Emails a link for choosing a new password. The answer is the same whether or not the address has an account. */
export default function ForgotPasswordPage() {
  const [params] = useSearchParams();
  const [email, setEmail] = useState(params.get('email') ?? '');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const demo = demoApi();

  const submit = async () => {
    const address = email.trim();
    setError(null);
    if (!address.includes('@')) {
      setError('That is a username, which has no email address. Ask your teacher for a new password: they can make one on the Students page.');
      return;
    }
    setBusy(true);
    try {
      await api().requestPasswordReset(address);
      setSent(address);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Forgot your password?" subtitle="Enter the email address you signed up with and we will send you a link to choose a new one.">
      {sent ? (
        <div className="rounded-2xl border border-line bg-surface-2 p-5" role="status">
          <MailCheck className="h-6 w-6 text-brand" />
          <p className="mt-3 font-semibold text-ink">Check your email</p>
          <p className="mt-1 text-sm text-ink-2">
            If <span className="font-medium">{sent}</span> has a Gradileo account, a link to choose a new password is on its way. It can take a minute, and it may land in your spam folder.
          </p>
          {demo && <p className="mt-2 text-sm text-ink-3">The demo sends no email. Use the demo buttons on the sign-in page instead.</p>}
          <button type="button" className="mt-3 text-sm font-semibold text-brand hover:underline" onClick={() => setSent(null)}>
            Use a different address
          </button>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <Input label="Email address" type="text" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@school.ca" />
          {error && <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{error}</p>}
          <Button type="submit" className="w-full" size="lg" loading={busy}>
            Send the link
          </Button>
          <p className="text-sm text-ink-3">Do you sign in with a username from your teacher? Ask your teacher for a new password.</p>
        </form>
      )}
      <p className="mt-6 text-center text-sm">
        <Link to="/login" className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
