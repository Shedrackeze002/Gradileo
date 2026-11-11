import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/layout/Logo.tsx';
import { LegalLinks } from '@/features/legal/LegalLayout.tsx';

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <div className="relative hidden overflow-hidden bg-spotlight p-12 text-white lg:flex lg:flex-col">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-spotlight-glow/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-[rgb(var(--accent)/0.25)] blur-3xl" />
        <Link to="/" className="relative">
          <span className="inline-flex items-center gap-2.5 font-display text-xl font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">∑</span>
            Gradileo
          </span>
        </Link>
        <div className="relative mt-auto max-w-lg">
          <h2 className="font-display text-4xl font-semibold leading-tight">Every student, every concept, to mastery.</h2>
          <ul className="mt-8 space-y-3 text-[15px] text-white/85">
            {[
              'Complete lessons in mathematics, chemistry and English, with worked examples and instant checks',
              'Unlimited practice — a fresh version of every question, every time',
              'Assignments, quizzes and exams with automatic deadline reminders',
              'An AI teaching assistant that spots gaps and suggests next steps',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-spotlight-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col px-5 py-8 sm:px-10">
        <Link to="/" className="lg:hidden">
          <Logo />
        </Link>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <h1 className="text-[28px] font-semibold">{title}</h1>
          {subtitle && <p className="mt-1.5 text-ink-3">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
        <LegalLinks className="justify-center" />
      </div>
    </div>
  );
}
