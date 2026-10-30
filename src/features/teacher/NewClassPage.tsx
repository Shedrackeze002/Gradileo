import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Check } from 'lucide-react';
import { CURRICULUM_MAPS, getCourse, LISTED_COURSES as COURSES, mappedCourses, SUBJECTS } from '@engine/curriculum/index.ts';
import { api } from '@/data/index.ts';
import { useCreateClass } from '@/data/hooks.ts';
import { Button, Card, CardBody, Checkbox, Input, PageHeader, Tabs, useToast } from '@/components/ui/index.ts';
import { cn } from '@/lib/cn.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { ApprovalNotice, needsApproval } from './ApprovalNotice.tsx';
import { CourseRequestCard } from '@/features/requests/CourseRequestCard.tsx';

/** A tab of the course picker: a subject, or a school system's own courses ("map:us"). */
const coursesOf = (tab: string) => (tab.startsWith('map:') ? mappedCourses(tab.slice(4)) : COURSES.filter((c) => c.subject === tab));
const TABS = [...SUBJECTS.map((s) => ({ value: s, label: s })), ...CURRICULUM_MAPS.map((m) => ({ value: `map:${m.curriculum}`, label: m.name }))];

/** A tab's courses grouped by grade, youngest first. */
function gradesOf(tab: string) {
  const courses = coursesOf(tab);
  return [...new Set(courses.map((c) => c.grade))].sort((a, b) => a - b).map((grade) => ({ grade, courses: courses.filter((c) => c.grade === grade) }));
}

export default function NewClassPage() {
  const [name, setName] = useState(COURSES[0].shortTitle);
  const [nameEdited, setNameEdited] = useState(false);
  const [section, setSection] = useState('');
  const [courseId, setCourseId] = useState(COURSES[0].id);
  const [subject, setSubject] = useState(COURSES[0].subject);
  const [publishFirst, setPublishFirst] = useState(true);
  const [joinApproval, setJoinApproval] = useState(true);
  const create = useCreateClass();
  const navigate = useNavigate();
  const toast = useToast();
  const me = useMe();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const c = await create.mutateAsync({ name: name.trim() || 'My class', section: section.trim() || null, courseId, joinApproval });
      if (publishFirst) {
        const course = getCourse(courseId)!;
        await api().setPublished(c.id, course.lessons[0].id, true);
      }
      toast({ kind: 'success', title: 'Class created', body: `Share the code ${c.joinCode} with your students, or add them from the Students page.` });
      navigate(`/t/c/${c.id}`);
    } catch (err) {
      toast({ kind: 'error', title: 'Could not create the class', body: (err as Error).message });
    }
  }

  if (needsApproval(me)) return <ApprovalNotice me={me} />;

  const pick = (id: string, title: string) => {
    setCourseId(id);
    if (!nameEdited) setName(title);
  };
  // Changing the tab selects its first course, so the class is never made for a course out of view.
  const chooseSubject = (s: string) => {
    setSubject(s);
    const first = coursesOf(s)[0]!;
    pick(first.id, first.shortTitle);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Create a class" subtitle="Each class gets its own roster, join code, published lessons and gradebook." back={{ to: '/t?all', label: 'My classes' }} />
      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardBody className="grid gap-4 sm:grid-cols-2">
            <Input label="Class name" value={name} onChange={(e) => { setName(e.target.value); setNameEdited(true); }} required maxLength={60} />
            <Input label="Section or period" placeholder="e.g. Block A, Period 3" value={section} onChange={(e) => setSection(e.target.value)} maxLength={40} />
          </CardBody>
        </Card>
        <div>
          <div className="label">Course</div>
          {TABS.length > 1 && <Tabs className="mb-4" value={subject} onChange={chooseSubject} items={TABS} />}
          {subject.startsWith('map:') && (
            <p className="mb-4 text-sm text-ink-3">These courses follow the {CURRICULUM_MAPS.find((m) => `map:${m.curriculum}` === subject)?.name} order and names, built from Gradileo’s lessons. Each lists the topics Gradileo does not teach yet.</p>
          )}
          <div className="space-y-5">
            {gradesOf(subject).map(({ grade, courses }) => (
              <section key={grade} aria-label={`Grade ${grade}`}>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-3">Grade {grade}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {courses.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => pick(c.id, c.shortTitle)}
                      className={cn('card flex items-start gap-3 p-4 text-left transition', courseId === c.id ? 'border-brand ring-2 ring-brand/20' : 'hover:border-line-strong')}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <BookOpen className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{c.title}</span>
                        <span className="mt-0.5 block text-sm text-ink-3">
                          {c.units.length} units · {c.lessons.length} lessons{c.map ? '' : ` · ${c.outcomes.length} outcomes`}
                        </span>
                        {!!c.gaps?.length && <span className="mt-0.5 block text-xs text-ink-3">Not in Gradileo yet: {c.gaps.join('; ')}.</span>}
                      </span>
                      {courseId === c.id && <Check className="h-5 w-5 text-brand" />}
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Checkbox checked={publishFirst} onChange={setPublishFirst} label="Publish the first lesson now so students see something when they join" />
          <Checkbox checked={joinApproval} onChange={setJoinApproval} label="Approve students who join with the class code (you can change this in class settings)" />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" to="/t?all">
            Cancel
          </Button>
          <Button type="submit" loading={create.isPending}>
            Create class
          </Button>
        </div>
      </form>
      <CourseRequestCard who="teacher" className="mt-8" />
    </div>
  );
}
