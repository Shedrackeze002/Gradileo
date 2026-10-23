# Architecture

Gradileo is a single-page React app with a shared TypeScript **learning engine**. The engine runs
in the browser for instant feedback and, unchanged, inside Supabase Edge Functions where it grades
work authoritatively. This keeps the server and the student's screen in exact agreement.

```
                 ┌──────────────────────────── browser ─────────────────────────────┐
                 │  React app (src/)                                                 │
                 │   features/  teacher · student · lessons · player · ai            │
                 │   data/api.ts  ── DataApi interface ──┬── DemoApi (localStorage)   │
                 │                                       └── SupabaseApi              │
                 │  engine/  generators · grader · mastery · AI analyst (shared)      │
                 └───────────────────────────────┬───────────────────────────────────┘
                                                 │ HTTPS (anon key + user JWT)
                 ┌───────────────────────────────▼───────────────────────────────────┐
                 │ Supabase                                                           │
                 │  Postgres: tables + row-level security + triggers + RPCs           │
                 │  pg_cron: send_due_reminders() every 5 min, email delivery         │
                 │  Edge Functions (Deno, engine copied in by scripts/sync-engine):   │
                 │    grade-submission · ai-agent · ai-tutor · create-students ·      │
                 │    send-emails · admin-users · join-class                          │
                 └──────────────┬───────────────────────────────┬────────────────────┘
                                │                               │
                         MiniMax chat API                  Resend email API
```

## The learning engine (`engine/`)

| Module | Responsibility |
|---|---|
| `rng.ts` | Seeded random numbers (mulberry32). An item is fully described by `{skillId, seed, difficulty}`. |
| `math/` | A forgiving expression parser (implicit multiplication, `sqrt`, roots, `\|x\|`, sin/cos/tan/sec/csc/cot in radians, `ln`, `log`, `e`, unicode), polynomial normalisation, linear-relation helpers. |
| `curriculum/` | Course metadata (units, lessons, outcomes) and one generator per skill. |
| `grade.ts` | Grades every answer type: numbers (an exact value must be worked out, not typed as sin(5pi/12); a fraction in lowest terms or a mixed number when the question asks for one), lists of numbers (roots and solutions in any order), expressions by equivalence, including derivatives and identities, in a required form (expanded, factored, simplified radical, exponent form, one trigonometric function…), lines in a required form, points, graphs, choices, ordering. Gives specific messages such as "Factor completely". |
| `mastery.ts` | Bayesian Knowledge Tracing and mastery levels. |
| `assemble.ts` | Builds an attempt from an assignment, regenerates items from references, grades a submission. |
| `submit.ts` | `validateRefs` and `processSubmission`: the single code path used by the demo and the server. |
| `reminders.ts` | The reminder rule (mirrored in SQL by `send_due_reminders`). |
| `actions.ts` | Turns an AI-proposed action into an assignment draft. |
| `timing.ts` | "Suggest settings" in the builder: an assignment's working time (generated questions by difficulty, or by the class's own median time on the skill once it has at least five timed answers; the teacher's own questions by kind and points) and the time limit, attempts, feedback and hints that suit the kind of work. |
| `ai/` | Context builders, prompts, MiniMax client, JSON validation and the offline analyst; `builder.ts` drafts an assignment for "Draft with AI" in the assignment builder (generated sections plus questions the AI writes, a numeric answer kept only when it matches an arithmetic check the model gives, and an offline draft without MiniMax), and regenerates one question in its format and skill; `marking.ts` suggests a mark for a written response from the question, its marking guide, the typed answer and pictures of the canvas pages (the teacher's browser draws them, `src/features/whiteboard/pageImages.ts`), snapped to the marks a teacher can give; `tutor.ts` writes what the AI tutor says at each lesson step and its answers to students' questions, with offline versions, and defines the manifest of a lesson's recorded voice (`TutorVoice`, keyed by `tutorSlideKey`). |

Every generator is tested: for 60 seeds at each difficulty on every run (`GEN_SEEDS=300 npm test`
for a deeper sweep), the item's own canonical answer must grade as correct, every item needs hints
and a worked solution, choices must be unique, and no value may be `NaN`.

### Mastery model

Each answer updates the probability that the student knows the skill:

- Prior `p(L₀) = 0.10`, learning `p(T) = 0.12`, slip `p(S) = 0.10`, guess `p(G) = 0.25` for
  multiple choice and `0.08` for typed answers.
- An answer that needed a hint or a revealed solution does not count as a correct answer, but it
  lowers the estimate only slightly.
- Levels: **Familiar** at p ≥ 0.45 with a correct answer; **Proficient** at p ≥ 0.80 with 3 correct;
  **Mastered** at p ≥ 0.95 with 5 correct across at least 2 sessions.
- Points per skill follow Khan Academy's convention (Familiar 50, Proficient 80, Mastered 100), so
  course mastery is the share of available points.
- Review is due when a Proficient skill has not been practised for 7 days, or a Mastered one for 21 days.

## Data access (`src/data/`)

All screens use the `DataApi` interface through React Query hooks (`hooks.ts`). Two
implementations exist:

- **DemoApi** keeps a seeded class in `localStorage`, syncs between tabs with the `storage` event,
  and runs the reminder scheduler in the browser every minute.
- **SupabaseApi** maps rows to domain types (`mappers.ts`), uses RPCs and Edge Functions for
  anything sensitive, and subscribes to new notifications with Supabase Realtime.

## Present mode (`src/features/lessons/`)

`slides.ts` turns a lesson into a deck: a title slide, the hook, teaching slides (text split into
paragraphs and list items, figures beside the text), worked examples, one "Your turn" slide per
check, key takeaways, the teacher's videos and activities, and an end slide. Short leftovers are
packed onto a neighbouring slide so no slide is nearly empty. Items get keys from their content,
which is what "Choose what to show" stores (`lesson_prefs.hidden`) per class and lesson.

`deck/` draws each slide at 1600 × 900 and scales it to the screen. `FitContent` sizes the text to
fill the slide (CSS `zoom`, binary search between 0.6 and 1.3); items not yet revealed keep their
space, so nothing jumps while a slide builds. Builds and transitions are CSS animations in
`index.css` (`fx-*`, `tx-*`), switched off by the reduced-motion setting.

The whiteboard (`src/features/whiteboard/`, drawing in `src/lib/ink.ts`, stroke data in
`engine/ink.ts`) stores vector ink in board units, so boards look the same on any screen. Pointer
Events give one path for pen, mouse and touch: pen pressure sets the width, a stylus's eraser end
erases, and palm rejection ignores fingers once a pen is used, ignores broad contacts, and lets a
pen replace a resting hand's stroke. Boards are saved to `boards` (teacher-only unless shared with
the class).

Written responses are answered on the same ink (`CanvasAnswer.tsx`), with a Type tab beside the
canvas. The working is kept in the response's `canvas` field as compact text (`encodeCanvas`:
whole board units, each point a step from the one before, pressure in tenths; at most four pages
and 60,000 characters), so it fits in the submission's size limit. `grade-submission` decodes and
re-encodes it within those limits (`cleanCanvas`) before saving a submitted attempt.

## Live class questions (`src/features/live/`)

The teacher sends a "Your turn" question to the class (`live_questions`: skill, difficulty and
seed, so every student gets the same question). Students answer on their own devices
(`live_answers`, one row per student, changeable while the question is open). The teacher's
screen regenerates the question and grades every answer with the engine (`results.ts`), so a
student cannot claim a right answer by editing a request. Updates arrive through Supabase
Realtime (in the demo, through `localStorage` events between tabs), with a slow poll as a
fallback.

## Students' questions during a presentation (`src/features/live/AskQuestion.tsx`, `src/features/lessons/deck/ClassQuestions.tsx`)

Present mode tells the class what it is presenting (`class_presentations`, one row per class,
through `start_presenting`) when it opens and again every minute; leaving present mode calls
`stop_presenting`, and a presentation without a heartbeat for five minutes counts as over, so a
closed tab ends it by itself. Coming back to the same lesson within ten minutes carries on the same
presentation, so its questions stay together. While a presentation is live, students see a banner
with "Ask a question"; `ask_class_question` checks the student is in the class, trims the question
(at most 300 characters), allows five in ten minutes, and ties it to the presentation
(`presented_at`). Each new question pops up on the teacher's screen (Answer shows it large; Skip
moves on), and a "Questions" slide before the end lists them, left out when nobody asked anything.
The class's screen shows the student's first name and last initial unless the student ticks
"Hide my name from the class" (then "A student asks"); the teacher's
lesson page lists every question with the student's name. The teacher can turn questions off in
present mode's settings, for example to prepare at home without the class seeing.

## Self-paced study and course placement (`engine/placement.ts`, `src/features/student/`)

Students who sign up without a class code go to onboarding (`/s/welcome`). They give their
grade, their plans after high school (from Grade 10), whether they want calculus (Grade 12
science plans) and how mathematics feels, and `recommendCourse` follows Alberta's course
sequences to recommend a course, with reasons and alternatives. An optional placement check asks
6 questions from the course before (`placementSkills`: the skill each unit builds towards,
spread across the course), graded in the browser and not saved; `placementResult` says ready,
ready with review, or start earlier.

Starting a course calls `start_self_paced`, which creates (or reuses) a **self-paced section**:
a class with `kind = 'self'`, no teacher, every lesson published and AI autopilot on. Self-paced
students follow the course in order (`selfPacedLessons`: the next lesson is the first with a
skill not yet proficient), the study coach acts as their tutor, and `grade-submission` runs the
autopilot after practice as well as assignments, so the AI assigns targeted practice when a
skill stays weak. Skills missed on the placement check are kept on the device and offered as
practice on the home page. A student can study several courses and join teachers' classes; the
course switcher in the shell remembers the current one.

**Joining a teacher's class.** A class can ask for approval (`settings.joinApproval`, on by default
for new classes). Then a class code, used on the Join page or at sign-up, creates a pending
`join_requests` row and tells the teacher; the Students page lists the requests (with the
student's note) and the teacher approves, which enrols the student, or declines. Either way the
student is notified. Mastery belongs to the student, so what they studied on their own counts in
the class straight away.

## Exam mode (`engine/integrity.ts`, `src/features/player/ExamMode.tsx`)

Teachers can turn on exam mode for a quiz or exam. The student reads what it means (and, with
the camera option, agrees to keep the camera on) before starting. The attempt runs in full screen;
leaving full screen, switching tabs or apps, coming back to an attempt the device left, and the
camera turning off are recorded as events in the attempt's integrity record. With a limit, the
attempt either locks (the teacher unlocks it from the assignment page, which allows as many exits
again) or is submitted automatically. The camera is only checked to be on: nothing is recorded,
saved or sent, and the student sees a small preview. Teachers see exits, camera-off events, locks
and automatic submissions on the assignment page and the full record on each submission.

`engine/integrity.ts` holds the rules the app, the demo and `grade-submission` share: records are
cleaned and merged so exits only grow and the teacher's extra allowance (`extraExits`) comes from
the stored record. A website cannot stop a student closing a tab, so exam mode is a strong
deterrent rather than a guarantee; a Safe Exam Browser option can be added for schools that need
true lockdown.

## Teacher lesson edits (`src/content/edits.ts`, `src/features/lessons/SuggestEdit.tsx`)

Lessons stay in their Markdown files; approved teacher edits are a layer on top, stored in
`lesson_edits`. A lesson splits into sections exactly as the parser splits it (`splitLesson`), and
each section has a fingerprint of its text in the file. On a lesson page a teacher turns on
**Suggest edits** and opens a section in an editor with a live preview; the suggestion keeps the
fingerprint of the file section it changes. An administrator reviews it under **Lesson edits**
(a line-by-line diff and a preview) and approves or declines it. `useLessonContent` applies every
approved edit to the section it was made from (`applyEdits`), for every class, in lessons and in
present mode. An edit applies only while that file section is unchanged, and only if it is a valid
section, so updating a lesson file never produces a broken lesson; a newer approved edit for the
same section replaces the older one, and reverting returns the section to the file.

## Course requests (`src/features/requests/`, `src/features/admin/AdminRequestsPage.tsx`)

Students (on the onboarding page) and teachers (on the new-class page) can ask for a course or
topic Gradileo lacks. `request_course` stores it (at most 5 a day per person) and tells the
administrators. In the admin inbox, approving a request opens GitHub's new-issue form prefilled by
`courseIssueUrl` (title, grade, details and a build checklist; the person who asked appears only
as "a student" or "a teacher", because the repository is public). The administrator pastes the
issue link, and later marks the request built; the person who asked is notified at each step.
Set `VITE_GITHUB_REPO` to send issues to another repository.

## Explainer videos (`src/video/`, `video/`)

Explainer videos are built from scripts in `src/content/<course>/videos/<id>.ts`, so they can be
reviewed, versioned and rebuilt like lessons. A script is a list of scenes (a title, a figure and
working side by side, a "Your turn" question, a summary); each narrated line shows, highlights or
hides elements as it is spoken. Figures are right triangles (`triangle`), similar triangles, and
diagrams drawn to scale from named points (`diagram`: lines, angles, labels and scenery such as a
cliff, the sea, a tower or a person), each part of which can be shown, emphasised or hidden as it is
named. `video/build.ts` voices every line with Kokoro, an open-weight
text-to-speech model that runs on the CPU (cached per line in `video/.cache`), so a video's timing
comes from its narration (`compile` in `src/video/timeline.ts`). It then opens
`video/stage.html` in Chromium through Vite and, for every frame, asks the stage to draw the state
at that moment (`stateAt`) and captures it; the stage is a pure function of that state (React,
KaTeX and SVG, in the app's fonts), so frames are deterministic and a frame that has not changed
is reused rather than redrawn. FFmpeg encodes 1080p H.264 with loudness-normalised AAC. The build
also writes captions (SRT and WebVTT) from the script, a thumbnail, the YouTube title and
description with chapters, a pronunciation report (Whisper's transcript of each line compared
with the script, `src/video/words.ts`) and the video's length, chapters and question cues in
`src/content/videos.json`. The video tools live in their own package (`video/package.json`) so
the app's install stays small. See `video/README.md`.

Videos are hosted on Gradileo's YouTube channel. After uploading one, an administrator pastes its
link on the admin **Videos** page (`video_links`, written only by the audited
`admin_set_video_link`). A lesson then shows its videos above the lesson (one button per part), in
YouTube's player loaded through the IFrame API (`src/features/lessons/ExplainerVideos.tsx`), with
captions on from the start (the captions uploaded with each video come from its script, so maths
words are spelled right, unlike YouTube's automatic ones). The
player watches the playing time and, when the video reaches a "Your turn" cue from the manifest
during normal playback (`crossedCues`, so jumping past a question does not stop it), pauses and
asks the question below the video; the student answers or skips, sees the working, and the video
carries on. If one check passed several questions (a slow background tab), each is asked in turn
before the video plays again.


### The AI tutor's voice

The AI tutor (`src/features/tutor/TutorMode.tsx`) speaks with the videos' voice, recorded ahead of
time: Kokoro is far too slow to run in a browser (about four times slower than real time).
`video/tools/tutor-voice.ts` builds each lesson's slides the way the app does for a self-paced
student (`video/lib/tutor-lessons.ts`), has MiniMax write a line for every step (`writeTutorScript`),
checks each slide's lines against the slide (`engine/ai/tutorCheck.ts`: every number said is on the
slide, every calculation said is right, no "and" inside a whole number, each line matches its own
step rather than a neighbour) and reads a slide that fails from the slide itself, voices the lines and the tutor's set phrases (`TUTOR_PHRASES`) into one MP3 per lesson, and writes a
manifest saying where each line is, keyed by a hash of what each slide shows (`tutorSlideKey`). The
Tutor voice workflow publishes them per course as release files and the deploy copies them to
`/tutor/`. The app fetches `tutor/<lessonId>.json` (`src/lib/speech.ts`), plays a line by seeking
one audio element to it and pausing at its end, and falls back to showing the words for their
reading time when a slide has no recording (a teacher's own resource, or a slide changed since).
## Security model (Supabase)

- **Row-level security on every table.** Teachers see only their own classes and the students
  enrolled in them; students see only their own work, their classes, published lessons and the
  assignments meant for them (after the open date). The anonymous role has no table access.
- **Column-level grants.** For example, a student may update only `responses`, `items` and
  `integrity` on their own open attempt; a trigger additionally locks `items` when "try a similar
  question" is off.
- **Server-chosen questions.** Assignment attempts are created by `grade-submission` (`start`), and
  submissions are re-graded there. Scores, mastery and analytics are written only with the service
  role. History entries for "try a similar question" must match the slot's skill.
- **Definer functions** with an empty `search_path` handle cross-row work: joining with a code,
  publishing (which notifies students), reminders and insight actions.
- **Platform administrators** (`profiles.platform_admin`) work only through `admin_*` definer
  functions that check `is_platform_admin()` first, and the `admin-users` Edge Function for Auth
  actions (disable, enable, password reset). Every change is written to `admin_audit_log`, which
  has no client access. Self sign-up teachers start as `pending` when approval is required, and
  `can_teach()` keeps them from creating classes until approved. Disabled accounts are banned in
  Auth and rejected by every Edge Function.
- **Presenting.** `lesson_prefs` (hidden slide parts) is visible to the class's teacher only;
  `boards` are visible to the teacher, and to enrolled students only when the teacher shares one.
  Only the teacher opens and closes `live_questions` (at most one open per class); a student
  writes only their own `live_answers`, only in their class and only while the question is open,
  and reads only their own answers. Only the teacher starts and stops `class_presentations`; the
  class can read it. Students add `class_questions` only through `ask_class_question` and read only
  their own; only the teacher sees everyone's, marks them answered or skipped, or deletes them, and
  nobody can change a question's text.
- **Self-paced sections.** A class has a teacher exactly when `kind = 'teacher'` (a check
  constraint). Only `start_self_paced` creates self-paced sections, for the calling student only;
  their join codes do not work, the student cannot rename them, and they are left out of the
  admin class list.
- **Join requests** are read-only to clients. `request_to_join`, `decide_join_request` and sign-up
  create and change them; only the student and the class's teacher can see a request, and the
  teacher sees the requester's name through `class_join_requests` before they are enrolled. The
  older `join_class` refuses classes that ask for approval, so it cannot skip the teacher.
- **Exam mode.** `submissions_guard` keeps a student's integrity record from going backwards: a
  save cannot remove exits, lower the tab count or change `extraExits`, and a locked attempt's
  answers cannot change. Only the class's teacher can unlock an attempt (`unlock_attempt`), and the
  teacher is notified when one locks.
- **Lesson edits** are read-only to clients: everyone reads approved edits, authors read their
  own suggestions and administrators read all. Only `suggest_lesson_edit` (approved teachers,
  at most 20 waiting), `withdraw_lesson_edit` and `admin_decide_lesson_edit` change them, at most
  one edit per section is approved at a time, and every decision is audited. All Markdown is
  sanitized when it is rendered (checked to leave every lesson and generated question unchanged),
  and lesson video links must be web links, so an edit cannot inject scripts.
- **Course requests** are read-only to clients: people see their own, administrators see all
  through `admin_course_requests`, and only `request_course` and `admin_update_course_request`
  change them (issue links must be GitHub issue URLs; every decision is audited).
- **Secrets** (MiniMax, Resend, cron secret) live in Edge Function secrets or Vault, never in the
  browser bundle.

`supabase/tests/10_policies_test.sql` exercises these rules on plain PostgreSQL in CI.

## Notifications and reminders

1. Publishing an assignment (or its open date arriving) inserts an `assignment` notification for
   every targeted student.
2. Every 5 minutes `send_due_reminders()` finds, for each open assignment, the most urgent
   reminder threshold that has passed (for example 2 hours) and notifies each targeted student who
   has **not submitted**. Each `(assignment, student, threshold, due date)` is sent once, so moving
   the deadline re-arms reminders.
3. The browser shows new notifications instantly (Realtime), as a toast, and as a system
   notification when the tab is in the background.
4. If the class has email reminders on, `send-emails` delivers `assignment` and `reminder`
   notifications through Resend to students with a real email address.

## AI teaching assistant

1. `loadAnalystInput` gathers the class roster, published lessons, mastery, the last 90 days of
   answer events (with sample wrong answers), assignments and submissions.
2. `buildStudentContext` / `buildClassContext` turn this into a compact, factual summary.
3. With a MiniMax key, the prompt asks for strict JSON (strengths, weaknesses, misconceptions,
   growth, groups and actions). Reasoning is kept separate (`reasoning_split`), JSON is extracted
   and validated, and any skill, student or lesson id the model invents is dropped.
4. Without a key, or if the call fails, the offline analyst produces the same structure from rules
   and a library of common Math 10C misconceptions.
5. Teachers approve actions; `draftFromAction` turns them into practice, review, challenge or
   reteach assignments. Autopilot does this automatically for one practice set at a time.

## Adding a course

The platform is course-agnostic: every Alberta mathematics course from Grade 5 to Grade 12 (Math 5
to 9; 10C, 10-3, 10-4; 20-1, 20-2, 20-3, 20-4; 30-1, 30-2, 30-3 and 31) already runs side by side,
grouped by grade in course pickers. To add a course, for example
Math 30-1 (the steps it followed):

1. Create `engine/curriculum/math30-1/course.ts` with outcomes, units and lessons (ids such as
   `m301-1-1`), following `math20-1/course.ts` or `math20-3/course.ts`.
2. Write skill generators in `engine/curriculum/math30-1/gen/*.ts` using the `skill()` helper:
   each skill returns a prompt, answer parts, hints and a worked solution for difficulty 1–3.
3. Export the skills and register the course in `engine/curriculum/index.ts` (`COURSES` and
   `LOADERS`) and in `engine/curriculum/all.ts`, then run `npm run catalog` to regenerate the skill
   catalogue (`engine/curriculum/catalog.ts`; a test fails when it is out of date). The browser
   loads only the catalogue up front and downloads a course's generators the first time a page
   needs them (`useSkillsReady` / `SkillsGate`); the server and the tests register every
   generator through `all.ts`.
4. Add lesson text in `src/content/math30-1/lessons/<lesson-id>.md` using the same directives
   (`:::definition`, `:::example` with `@step`/`@answer`, `:::check <skill-id> <difficulty>`,
   `:::mistake`, `:::summary`).
5. Run `npm test`: the generator and lesson tests automatically cover the new course, and the new
   course appears in *New class*. Money answers must be graded to the cent (`tolerance: 0.011`, or
   up to 0.03 where several amounts are each rounded before adding); a test fails any "nearest
   cent" question that is graded more loosely. Figures must use the types in `engine/types.ts`
   (`FIGURE_TYPES`), including `barChart` and `circleGraph` for data and `cubes` for structures of
   unit cubes; the tests reject unknown types. A numeric answer can require a fraction in lowest
   terms or a mixed number (`fraction: 'lowest' | 'mixed'`).
6. Redeploy the Edge Functions (`npm run functions:deploy`, or the *Deploy Supabase backend*
   workflow). The server re-grades every submission with the shared engine, so until the
   functions carry the new course, its assignments cannot be started or graded.

## Lesson format

```markdown
## Section title

:::definition Perfect square
A number that is the product of an integer with itself.
:::

:::example Simplifying a radical
Simplify $\sqrt{72}$.
@step Find the largest perfect-square factor: $72 = 36 \times 2$.
@step $\sqrt{72} = \sqrt{36}\,\sqrt{2} = 6\sqrt{2}$
@answer $6\sqrt{2}$
:::

:::check a2-mixed-radical 2
:::
```
