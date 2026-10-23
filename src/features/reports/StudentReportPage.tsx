/** A student's shared report card, with a button to print it or save it as a PDF. */
import { useParams } from 'react-router-dom';
import { Printer } from 'lucide-react';
import { getCourse } from '@engine/curriculum/index.ts';
import { useClass, useProfile, useReportCard } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Button, EmptyState, PageHeader, PageSpinner } from '@/components/ui/index.ts';
import { ReportCardView } from './ReportCardView.tsx';

export default function StudentReportPage() {
  const { reportId = '' } = useParams();
  const me = useMe();
  const card = useReportCard(reportId);
  const cls = useClass(card.data?.classId);
  const teacher = useProfile(cls.data?.teacherId ?? undefined);
  if (card.isLoading || (card.data && cls.isLoading)) return <PageSpinner />;
  if (!card.data || !cls.data) return <EmptyState title="Report card not found" />;
  return (
    <div className="space-y-6">
      <PageHeader
        className="print:hidden"
        back={{ to: '/s/progress', label: 'My progress' }}
        title="My report card"
        actions={
          <Button variant="secondary" icon={<Printer className="h-4 w-4" />} onClick={() => window.print()}>
            Print or save as PDF
          </Button>
        }
      />
      <ReportCardView content={card.data.content} studentName={me.fullName} classTitle={cls.data.name} courseTitle={getCourse(cls.data.courseId)?.title ?? ''} teacherName={teacher.data?.fullName} sharedAt={card.data.sharedAt} />
    </div>
  );
}
