/** Teacher action: reopen a submitted attempt so the student can start again with new questions. */
import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useReopenSubmission } from '@/data/hooks.ts';
import type { Submission } from '@/data/types.ts';
import { Button, Modal, useToast } from '@/components/ui/index.ts';

export function ReopenAttempt({ s, studentName, questions, size = 'xs' }: { s: Submission; studentName: string; questions: boolean; size?: 'xs' | 'sm' }) {
  const [open, setOpen] = useState(false);
  const reopen = useReopenSubmission();
  const toast = useToast();
  const first = studentName.split(' ')[0] || studentName;
  return (
    <>
      <Button size={size} variant="secondary" icon={<RotateCcw className="h-3.5 w-3.5" />} aria-label={`Reopen ${studentName}'s attempt`} onClick={() => setOpen(true)}>
        Reopen
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Reopen for ${studentName}?`}
        description={questions ? `${first} gets a fresh attempt with a new set of questions and can start again straight away.` : `${first} can complete this again.`}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              loading={reopen.isPending}
              icon={<RotateCcw className="h-4 w-4" />}
              onClick={async () => {
                try {
                  await reopen.mutateAsync(s.id);
                  setOpen(false);
                  toast({ kind: 'success', title: `Reopened for ${studentName}`, body: questions ? 'They have a new set of questions and were told they can start again.' : 'They were told they can complete it again.' });
                } catch (e) {
                  toast({ kind: 'error', title: 'Could not reopen', body: (e as Error).message });
                }
              }}
            >
              Reopen
            </Button>
          </>
        }
      >
        <p className="text-sm text-ink-2">
          Attempt {s.attempt}
          {questions && s.percent !== null ? ` (${Math.round(s.percent)}%)` : ''} is kept for the record, but it no longer counts towards the score, the gradebook or the attempt limit.
        </p>
      </Modal>
    </>
  );
}
