import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PlayCircle, Sparkles } from 'lucide-react';
import { skillInfo, lessonById } from '@engine/curriculum/index.ts';
import { useBoards, useMastery, usePublications, useResources } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Button, Card, CardBody, EmptyState, PageSpinner } from '@/components/ui/index.ts';
import { MasteryChip } from '@/components/mastery/Mastery.tsx';
import { LessonView } from '../lessons/LessonView.tsx';
import { masteryMap, stateOf } from '../shared/derive.ts';
import { useStudentClass } from '../shared/useStudentClass.ts';

export default function StudentLessonPage() {
  const { lessonId = '' } = useParams();
  const me = useMe();
  const { cls } = useStudentClass();
  const pubs = usePublications(cls?.id);
  const res = useResources(cls?.id);
  const boards = useBoards(cls?.id, lessonId);
  const mastery = useMastery({ studentId: me.id });
  const map = useMemo(() => masteryMap(mastery.data ?? []), [mastery.data]);
  const meta = lessonById(lessonId);
  if (pubs.isLoading) return <PageSpinner />;
  if (!meta || !(pubs.data ?? []).some((p) => p.lessonId === lessonId)) return <EmptyState title="This lesson isn’t available yet" />;
  return (
    <LessonView
      lessonId={lessonId}
      resources={(res.data ?? []).filter((r) => r.lessonId === lessonId)}
      boards={(boards.data ?? []).filter((b) => b.shared)}
      headerActions={
        <>
          <Button to={`/s/learn/${lessonId}/tutor`} icon={<Sparkles className="h-4 w-4" />}>
            Start with your AI tutor
          </Button>
          <Button variant="soft" to={`/s/practice?skills=${meta.skills.join(',')}`} icon={<PlayCircle className="h-4 w-4" />}>
            Practise this lesson
          </Button>
        </>
      }
      footer={
        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold">Practise to mastery</h2>
            <p className="mt-1 text-sm text-ink-3">Each skill gives you a fresh set of questions with hints and worked solutions. Aim for Proficient, then come back on another day to reach Mastered.</p>
            <div className="mt-4 divide-y divide-line rounded-2xl border border-line">
              {meta.skills.map((s) => {
                const st = stateOf(map, s);
                return (
                  <div key={s} className="flex flex-wrap items-center gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{lessonSkillName(s)}</div>
                    </div>
                    <MasteryChip level={st.level} />
                    <Button size="sm" variant="soft" to={`/s/practice?skills=${s}`}>
                      Practise
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      }
    />
  );
}

function lessonSkillName(id: string) {
  return skillInfo(id)?.name ?? id;
}
