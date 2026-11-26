/**
 * The layout of Gradileo's public legal pages (the privacy policy and the terms of service): a
 * header with the logo, the page title and date, readable sections, and links between the pages.
 * They are public so anyone, signed in or not, can read them, and so services such as Google's
 * OAuth consent screen can link to them.
 */
import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo.tsx';

export const CONTACT_EMAIL = 'admin@gradileo.com';

export function LegalLayout({ title, updated, intro, children }: { title: string; updated: string; intro: ReactNode; children: ReactNode }) {
  useEffect(() => {
    const before = document.title;
    document.title = `${title} · Gradileo`;
    return () => {
      document.title = before;
    };
  }, [title]);

  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <Link to="/" aria-label="Gradileo home">
            <Logo compact />
          </Link>
          <LegalLinks />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-[32px] font-semibold leading-tight text-ink">{title}</h1>
        <p className="mt-2 text-sm text-ink-3">Last updated: {updated}</p>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-2">{intro}</div>
        <div className="mt-10 space-y-10">{children}</div>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            Questions? Email <a className="text-brand hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
          <LegalLinks />
        </div>
      </footer>
    </div>
  );
}

/** Links to the About page, the privacy policy and the terms of service, for page footers. */
export function LegalLinks({ className = '' }: { className?: string }) {
  return (
    <nav aria-label="Legal" className={`flex gap-4 text-sm ${className}`}>
      {/* The About page is written when the site is built (src/seo/pages.tsx), so it is a plain link. */}
      <a href={`${import.meta.env.BASE_URL}about`} className="text-ink-3 hover:text-ink hover:underline">
        About
      </a>
      <Link to="/privacy" className="text-ink-3 hover:text-ink hover:underline">
        Privacy Policy
      </Link>
      <Link to="/terms" className="text-ink-3 hover:text-ink hover:underline">
        Terms of Service
      </Link>
    </nav>
  );
}

/** A numbered section of a legal page. */
export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-6">
      <h2 id={`${id}-title`} className="text-xl font-semibold text-ink">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-2 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-1.5">{children}</div>
    </section>
  );
}
