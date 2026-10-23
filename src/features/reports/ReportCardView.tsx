/**
 * A report card as the student, a parent and the teacher see it, and as it prints: the numbers from
 * the student's work, then how they are doing, strengths, next steps, tips for the student and for
 * parents, and the teacher's comment. The text has {name} where the student's first name goes.
 */
import type { ReactNode } from 'react';
import { BookOpenCheck, ClipboardCheck, Target, TrendingUp } from 'lucide-react';
import { fillName, type ReportCardContent } from '@engine/ai/reportCard.ts';
import { Markdown } from '@/components/math/Markdown.tsx';
import { LogoMark } from '@/components/layout/Logo.tsx';
import { fmtDate } from '@/lib/dates.ts';
import { cn } from '@/lib/cn.ts';

export interface ReportCardViewProps {
  content: ReportCardContent;
  studentName: string;
  /** The class's name. */
  classTitle: string;
  courseTitle: string;
  teacherName?: string;
  /** When it was shared, or null for a draft. */
  sharedAt?: string | null;
  className?: string;
}

function Stat({ icon, label, value, hint }: { icon: ReactNode; label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-line p-3 print:border-gray-300">
      <div className="flex items-center gap-1.5 text-xs font-medium text-ink-3">
        {icon}
        {label}
      </div>
      <div className="mt-1 font-display text-2xl font-semibold">{value}</div>
      {hint && <div className="text-xs text-ink-3">{hint}</div>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="break-inside-avoid">
      <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-brand-800 print:text-black">{title}</h3>
      {children}
    </section>
  );
}

export function ReportCardView({ content, studentName, classTitle, courseTitle, teacherName, sharedAt, className }: ReportCardViewProps) {
  const first = studentName.trim().split(/\s+/)[0] || 'The student';
  const fill = (t: string) => fillName(t, studentName);
  const s = content.stats;
  const List = ({ items }: { items: string[] }) => (
    <ul className="list-disc space-y-1 pl-5">
      {items.map((x, i) => (
        <li key={i}>
          <Markdown md={fill(x)} inline sanitize />
        </li>
      ))}
    </ul>
  );
  return (
    <article className={cn('space-y-6 rounded-2xl bg-surface p-6 shadow-card ring-1 ring-line sm:p-8 print:p-0 print:shadow-none print:ring-0', className)} aria-label={`Report card for ${studentName}`}>
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-3">Report card{content.period ? ` · ${content.period}` : ''}</div>
          <h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{studentName}</h2>
          <div className="mt-1 text-sm text-ink-2">
            {classTitle} · {courseTitle}
          </div>
          {(teacherName || sharedAt) && (
            <div className="mt-0.5 text-sm text-ink-3">
              {teacherName && <>Teacher: {teacherName}</>}
              {teacherName && sharedAt && ' · '}
              {sharedAt && fmtDate(sharedAt, 'MMMM d, yyyy')}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-ink-2">
          <LogoMark size={28} /> Gradileo
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={<Target className="h-3.5 w-3.5" />} label="Course progress" value={`${s.coursePercent}%`} hint="of the whole course" />
        <Stat icon={<BookOpenCheck className="h-3.5 w-3.5" />} label="Skills secure" value={`${s.skillsSecure} of ${s.skillsTaught}`} hint="proficient or mastered" />
        <Stat icon={<TrendingUp className="h-3.5 w-3.5" />} label="Average score" value={s.averageScore === null ? '—' : `${s.averageScore}%`} hint="on graded work" />
        <Stat icon={<ClipboardCheck className="h-3.5 w-3.5" />} label="Work handed in" value={`${s.workDone} of ${s.workDue}`} hint="that was due" />
      </div>

      <div className="space-y-5 text-[15px] leading-relaxed">
        {content.summary && (
          <Section title={`How ${first} is doing`}>
            <Markdown md={fill(content.summary)} sanitize />
          </Section>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          {content.strengths.length > 0 && (
            <Section title="Strengths">
              <List items={content.strengths} />
            </Section>
          )}
          {content.nextSteps.length > 0 && (
            <Section title="Next steps">
              <List items={content.nextSteps} />
            </Section>
          )}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {content.studentTips.length > 0 && (
            <Section title={`Tips for ${first}`}>
              <List items={content.studentTips} />
            </Section>
          )}
          {content.parentTips.length > 0 && (
            <Section title="For parents and carers">
              <List items={content.parentTips} />
            </Section>
          )}
        </div>
        {content.feedback && (
          <Section title="Teacher’s comment">
            <Markdown md={fill(content.feedback)} sanitize className="italic" />
          </Section>
        )}
      </div>
      <footer className="border-t border-line pt-4 text-xs text-ink-3">Drafted with Gradileo from {first}’s work in the course, and reviewed by the teacher.</footer>
    </article>
  );
}
