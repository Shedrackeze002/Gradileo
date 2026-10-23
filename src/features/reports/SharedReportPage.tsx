/**
 * A shared report card by its private link, for a parent or carer who is not signed in. It shows
 * the card and nothing else; the teacher can turn the link off at any time.
 */
import { useParams } from 'react-router-dom';
import { Printer } from 'lucide-react';
import { getCourse } from '@engine/curriculum/index.ts';
import { useSharedReportCard } from '@/data/hooks.ts';
import { Button, EmptyState, PageSpinner } from '@/components/ui/index.ts';
import { Logo } from '@/components/layout/Logo.tsx';
import { ReportCardView } from './ReportCardView.tsx';

export default function SharedReportPage() {
  const { token = '' } = useParams();
  const card = useSharedReportCard(token);
  return (
    <div className="min-h-screen bg-canvas print:bg-white">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 print:hidden">
        <Logo />
        {card.data && (
          <Button variant="secondary" icon={<Printer className="h-4 w-4" />} onClick={() => window.print()}>
            Print or save as PDF
          </Button>
        )}
      </header>
      <main className="mx-auto max-w-4xl px-4 pb-12">
        {card.isLoading ? (
          <PageSpinner />
        ) : card.data ? (
          <ReportCardView content={card.data.content} studentName={card.data.studentName} classTitle={card.data.className} courseTitle={getCourse(card.data.courseId)?.title ?? ''} teacherName={card.data.teacherName} sharedAt={card.data.sharedAt} />
        ) : (
          <EmptyState title="This report card is not available">The link may have been turned off by the teacher, or it may be incomplete. Ask the teacher for a new link.</EmptyState>
        )}
      </main>
    </div>
  );
}
