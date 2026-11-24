# Roadmap

What comes next for Gradileo (formerly EduCore), in order, with the decisions already made. Update this file as
items ship or decisions change.

## Done

- Math 10C (all 19 outcomes) and Math 10-3 (all 13 outcomes), with lessons, generators,
  mastery tracking, assignments, reminders and the AI teaching assistant.
- Knowledge and Employability Math 10-4 and 20-4 (all four strands of each), with bar and circle
  graphs for data questions.
- Grade 11: Math 20-1, 20-2 and 20-3 (every outcome of each), with list answers for equations
  with several solutions.
- Grade 12: Math 30-1, 30-2, 30-3 and Math 31, with trigonometric, logarithmic and calculus
  answers graded by equivalence (derivatives, identities, exact values).
- Grades 5 to 9: Math 5 and Math 6 on Alberta's new K–6 curriculum, and Math 7, 8 and 9 on the
  2016 program of studies, every outcome checked word for word against new LearnAlberta. Every
  Alberta mathematics course from Grade 5 to Grade 12 is now available.
- Platform administration: admin console, teacher approval, account controls, audit log.
- Present mode as a slide deck, with a whiteboard: 16:9 slides that build point by point with
  transitions, worked examples step by step, "Your turn" slides with the interactive questions,
  drawing on slides, a whiteboard with pen pressure and palm rejection saved to the lesson (and
  shared with students), a timer, a student picker, embedded videos and activities, and "Choose
  what to show" per class.
- Present mode on an iPad (fixed 31 October 2026, the owner's report: a resting palm pressed
  buttons and moved the screen, Safari left full screen or reloaded the page back to the start, and
  the highlighter could not be found). The screen is now locked in present mode: it cannot scroll,
  bounce, zoom or be pulled down to reload, and while the pencil writes a palm presses nothing
  (the toolbar, Next or anything it rests on). If Safari closes its full screen anyway, a "Back to
  full screen" button brings it back in one tap. The highlighter is yellow and keeps its own colour,
  and the drawing tools are named under their icons. A reload carries on at the same slide with
  its ink and whiteboard pages, and signing in again returns to the presentation.
  The same day the owner found the browser's full screen still closing while they wrote, in Chrome
  as in Safari: on an iPad every browser runs on Safari's engine, whose full screen closes when
  the pencil or a hand moves down the glass, and a page cannot stop it. The "Back to full screen"
  button is gone (it kept reappearing). Instead, on an iPad the full-screen button explains once how
  to add Gradileo to the Home Screen, where it opens as its own app with no browser bars (the
  full screen that stays put); the app has a proper icon now, and opened that way present mode has
  no full-screen button.
  On 21 November 2026 the owner found that buttons in present mode (Pen, Clear and others) needed
  three or four taps. The palm guard was taking deliberate finger taps for a palm: a Pencil
  hovering just above the glass counted as writing, so every tap near it was blocked; a Pencil
  lift that Safari never reported blocked every tap until the Pencil touched again; and for 1.5
  seconds after writing no tap pressed anything. Now only the Pencil on the glass counts as
  writing, a lost lift ends on the next hover or after 2.5 seconds of silence, and just after
  writing a quick fingertip tap presses while a lingering or broad touch still does not.
- Live class questions: from a "Your turn" slide the teacher sends the question to every
  student's device; answers arrive in real time and the slide shows how many answered, how many
  were right, each choice's share or the common wrong answers, without names. Students see
  whether they were right and the worked solution when the teacher shows the results.

- Student self-sign-up, AI course placement and course requests:
  - Students who sign up without a class code answer a few questions (grade, plans, calculus, how
    mathematics feels), get a recommended course that follows Alberta's sequences, can take a
    6-question placement check on the course before, and study in a self-paced section where every
    lesson is open and the AI acts as tutor (study coach and autopilot practice). Students can
    study several courses and switch between them.
  - Join requests: a class can ask the teacher to approve students who use its code (on by default
    for new classes); the teacher approves or declines on the Students page, and the student keeps
    their self-paced progress.
  - Course requests: students and teachers ask for a missing course or topic; requests land in the
    admin inbox, and approving one opens a prefilled GitHub issue for a build session (the issue
    link is saved and the person who asked is told when it is planned and when it is built).

- Teacher edit suggestions with admin approval: on a lesson page a teacher suggests a change to
  any section in an editor with a live preview; an administrator reviews a line-by-line diff and a
  preview and approves or declines it. Approved edits are stored in the database as a layer over
  the lesson files and apply to every class (lessons and present mode); they can be reverted, and
  an edit stops applying if its section in the file changes.

- Exam mode for quizzes and exams, when the teacher turns it on per assessment: full screen;
  leaving it, switching tabs or apps and the camera turning off are recorded and shown to the
  teacher; after a set number of exits the attempt locks until the teacher unlocks it, or is
  submitted automatically. The camera option only checks that the camera is on: nothing is
  recorded or stored, and students see a consent notice before they start.

- One class per course and section (4 Nov 2026, owner's bug report): a teacher cannot create a
  second active class for a course they already teach unless it has its own section or period
  (the course picker marks courses they have; a unique index backs it up, and the migration
  archived existing repeats, keeping the copy with students). Class settings can now delete a
  class for good after the teacher types its name, beside the existing archive; archived classes
  no longer show in the class switcher.

- Reopening a submitted attempt (6 Nov 2026, owner's request after a student submitted by
  mistake): a Reopen button on each student's row of an assignment and on the submission page.
  The old attempt is kept for the record (marked reopened, still readable) but no longer counts
  towards the score, the gradebook, the attempt limit or reminders, and the student gets a fresh
  attempt straight away with newly generated questions. Mastery changes from the old attempt stay.
  The same day: a Rename action on the assignment page (the title in the editor was easy to miss),
  and each generated-question row in the editor now shows an example of its questions (Q1, Q2...)
  so they read as questions rather than skill names.

- Teacher lesson progress (7 November 2026, the owner's request): on the curriculum page a
  teacher marks each lesson completed once taught, sees how many topics and lessons are covered
  out of the total (for example 3/14 topics, 14/50 lessons; a topic counts once all its lessons
  are done), and can hide completed lessons to declutter the page. Marks are kept per teacher and
  per class, and students never see them. The lesson page has the same "Mark completed" button.
- Security audit and fixes (7 November 2026, the owner's request): the AI tutor has a daily
  limit across all users (`AI_TUTOR_DAILY_LIMIT`, 3000 MiniMax calls in 24 hours, then the offline
  tutor answers) and stays closed to name-only students until their teacher lets them in;
  students get an assignment's content without the answers of teacher-written questions until
  the answers are due (`assignment_contents`); the site sends security headers (HSTS, frame
  protection, nosniff, referrer and permissions policies, and a Content-Security-Policy,
  enforced since the same day); DOMPurify updated; CI and backend workflows have read-only tokens.
- No accidental submits (11 November 2026, the owner's urgent request): students pressed Submit
  thinking it saved only the current question. In homework, quizzes and exams Submit now appears
  only on the last question, the footer reminds students that answers save automatically, and
  the confirmation says plainly that submitting ends the homework or exam and answers can no
  longer be changed ("Keep working" or "Yes, submit my exam").
- End-to-end test of the live site (11 November 2026, the owner's request), with test accounts
  in a test class, every role and flow, on desktop, phones and an iPad. Fixed from it: a reopened
  attempt's clock now starts when the student first opens it (it started when the teacher pressed
  Reopen, so a timed quiz or exam opened later was submitted empty at once); an answer given just
  before leaving the work is saved (the pending autosave was dropped); the accepted-answers box
  of a short-answer question takes commas and spaces as typed; empty choices are left out of a
  choice question; leaving present mode closes a live question left open; a new student's study
  coach no longer says they are "secure on what has been taught"; students a teacher creates
  show their username, not the internal sign-in address; and the landing page says English
  covers Grades 5 to 12.
- The rest of the end-to-end test's findings (11 November 2026; the owner: "we need to fix every
  issue found"). Sign-in has "Forgot password?", which emails a link to choose a new password
  (`/forgot-password`, `/reset-password`), and "Send the confirmation email again"; a teacher
  gives a student who signs in with a username a new temporary password from the student's page.
  The server's clock now checks a time limit: work that comes in more than a minute after it is
  still accepted (rejecting it would lose the answers) but is marked "over the time limit" for
  the teacher, who is notified, and the countdown runs against the server's clock, not the
  device's. Work whose results wait for the due date but has no due date shows them on
  submission (they stayed hidden for good). With instant feedback, a blank question offers
  "Skip for now" (or Finish on the last one). Wording: the due date is no longer printed twice,
  the teacher's own questions are titled by their text in the review, AI reports name lessons by
  title instead of their code, the Browse by topic page adds the learner's own year to a course
  name, "Hardest skills" says when it starts listing, and Terms and Privacy say English covers
  Grades 5 to 12. A student waiting to be let into a class no longer gets a refused request on
  Settings. Found while fixing: onboarding offered English only from Grade 9; it now starts at
  Grade 5.

## Next, in order

0. **Rename EduCore to Gradileo** (the owner's decision, after the Math 10C Unit 2 videos and
   before any new work). Gradileo, from *gradient* and *Galileo*, said "grad-ih-LAY-oh"
   (gradileo.com, .net, .io, .app and .academy were free when checked).
   - Done: everything people see (the app, wordmark, page title, emails, the AI assistant, error
     messages, documents, the video stage and YouTube text), with the eight Math 10C videos
     rendered again as Gradileo. Internal names stay as they were so nothing breaks: browser
     storage keys, the student sign-in email domain, Supabase secret and project names, and the
     repository path. Demo accounts moved to `gradileo.demo`, and saved demo data is updated when
     it loads.
   - Done: the site moved to gradileo.com on Cloudflare, with email at admin@gradileo.com (see
     Hosting), and the owner is setting up the Gradileo YouTube channel. Done: the owner renamed the
     GitHub repository to Gradileo, and the repository path in the code follows (the course-request
     issue link, the docs and the git remote).
1. **Explainer videos.** Our own animated explainers (MP4 with captions and thumbnails), hosted
   on our YouTube channel and shown in a player that pauses for questions at set times.
   - Done (23 October 2026): every lesson of every course from Math 5 to Math 31 has its explainer
     video, 1,634 in all, rendered and in Drive. The daily YouTube uploads carry on (see below).
   - Decision: **every lesson gets its own explainer video**, at least one per lesson and about
     two minutes or longer depending on difficulty; harder lessons (expected mostly in Grades
     9–12) get more than one. They must be high quality and fully explanatory.
   - Start with a pilot of about 3 videos for one unit to settle style and voice.
   - Decision: narration with a cloned human voice, a paid voice or a free voice, chosen by cost
     at the pilot stage. The channel owner uploads; the build produces the files.
   - Built: the video pipeline (`video/`, scripts in `src/content/<course>/videos/`) and the pilot,
     four videos of about three minutes for Math 10C Unit 2 (lessons 2.1 and 2.2, two parts
     each). Narration uses Kokoro, a free open-weight voice (`af_heart`).
   - Decision: the owner approved the pilot's style and voice (13 Oct 2026), and asked for
     captions; the build makes them from the script, they are uploaded with each video, and the
     lesson player shows them from the start.
   - Built: the lesson player (YouTube's player above the lesson, pausing at each "Your turn" to ask
     the question in Gradileo, from the cues in `src/content/videos.json`) and the admin **Videos**
     page where each video's YouTube link is recorded.
   - Uploads: the owner uploads each pack to the Gradileo YouTube channel and links it on the
     **Videos** page. YouTube allowed ten uploads a day on the channel, so uploads go about one
     lesson pack a day; by 14 Oct 2026 the first ten Math 10C Unit 1 videos (lessons 1.1 to 1.5)
     were uploaded and linked. The owner has saved every Math 10C, 10-3 and 10-4 pack.
   - Built: the Google Drive uploader (`video/tools/drive-upload.ts`, pull request #42). Each
     rendered video goes to `Gradileo videos/<course>/Unit <n> – <title>/<NN>-<id>/` in the owner's
     Drive with its MP4, thumbnail, captions and YouTube text, instead of zip files sent in chat.
     It signs in with the environment variables `GDRIVE_CLIENT_ID`, `GDRIVE_CLIENT_SECRET` and
     `GDRIVE_REFRESH_TOKEN` (an OAuth client with the `drive.file` scope). On 14 October 2026 all
     193 Math 10C, 10-3 and 10-4 videos were uploaded (checked: Drive holds 193 MP4s), and every
     course from Math 20-1 on is uploaded unit by unit as it renders.
   - Built: Math 10C Unit 2 is complete, eight videos (lessons 2.1 to 2.4, two parts each). Lessons
     2.3 and 2.4 brought a `diagram` element for figures drawn from points (angles of elevation and
     depression, a cliff and a boat, a clinometer, two triangles sharing a side).
   - Built: Math 10C Unit 1 is complete, sixteen videos (lessons 1.1 to 1.8, two parts each, about
     two and a half to four minutes). They brought 3-D solids drawn in an oblique view with hidden
     edges dashed (prisms, cylinders, pyramids, cones, spheres, hemispheres and composites such
     as a silo), nets that unfold them, rulers (metric and to the sixteenth of an inch), a vernier
     caliper, and unit squares and cubes for area and volume units (`src/video/solids.ts`,
     `src/video/measure.ts`).
   - Built: Math 10C Unit 3, twelve videos (lessons 3.1 to 3.6, two parts each, about three to
     four minutes): prime factors, GCF and LCM, squares and cubes and their roots, the real number
     system, mixed and entire radicals, and integral and rational exponents. They brought number
     figures (`src/video/numbers.ts`): factor trees, a Venn diagram of shared primes, number
     lines, tiled rectangles, the real number system as nested sets, and a row of powers.
   - Built: Math 10C Unit 4, twelve videos (lessons 4.1 to 4.6, two parts each, about three
     minutes): multiplying binomials and polynomials, common factors, factoring x² + bx + c and
     ax² + bx + c, and special products with a strategy for factoring completely. They brought an
     area model that can also be drawn as algebra tiles (`src/video/algebra.ts`).
   - Built: Math 10C Unit 5, eight videos (lessons 5.1 to 5.4, two parts each, about two to three
     minutes): relations and their representations, functions, domain and range, and function
     notation. They brought graphs (`src/video/graph.ts`): coordinate planes stretched to any
     scale, plotted functions, polylines, points (open or closed) and arrow diagrams.
   - Built: Math 10C Unit 6, ten videos (lessons 6.1 to 6.5, two parts each, about two to three
     minutes): linear relations and rates of change, intercepts, slope, parallel and
     perpendicular lines, and the distance and midpoint formulas.
   - Built: Math 10C Unit 7, ten videos (lessons 7.1 to 7.5, two parts each, about two to three
     minutes): slope-intercept, slope-point and general form, parallel and perpendicular
     equations, linear models, and lines of best fit.
   - Built: Math 10C Unit 8, eight videos (lessons 8.1 to 8.4, two parts each, about two to three
     minutes): systems of linear equations, solving by graphing, substitution and elimination,
     the number of solutions, and problems solved with systems. That finishes Math 10C.
   - Every video runs at least two minutes. Four Unit 7 and 8 videos first came out at 1:52 to
     1:56, so their scripts gained a check, a caution or a worked step and were rendered again,
     and the build now warns when a video runs, or is estimated to run, under two minutes (about
     350 spoken words is enough).
   - Decision (14 October 2026): a calmer pace. The owner found the videos rushed, compared one
     lesson at both paces, and chose the slower one: the voice at speed 0.85 (about 150 to 155
     words a minute instead of about 175), 0.8 seconds between lines, an extra 0.6 seconds after
     each new step appears, and longer pauses around scenes. Lesson 1.2 part 1 of Math 20-1 went
     from 2:58 to 3:42. There is no time limit: the goal is to explain as simply as possible,
     so a video may run ten or fifteen minutes if it needs to, and explanations are never trimmed
     to save time. Every video from Math 20-1 on uses the new pace. Math 10C, 10-3 and
     10-4 were made at the old pace and stay as they are (the owner's decision).
   - Scripted: Math 10-3, all 8 units, two parts per lesson (about three minutes each): units and
     measurement, money and finance, ratios and rates, perimeter, area and surface area, angles
     and spatial puzzles, the Pythagorean theorem, similar figures and trigonometry. Units 6 and
     7 brought angle figures (`src/video/angles.ts`: rays, crossing lines, transversals, a clock
     and a protractor) and triangle figures (`src/video/triangles.ts`: squares on the sides, any
     triangle, and a rectangle with its diagonal).
   - Scripted: Math 10-4, all 9 units, two parts per lesson for most (about two to three
     minutes): whole numbers, decimals, fractions, integers, formulas, units and conversions,
     perimeter, area and volume, angles, shapes, 3-D objects, symmetry and transformations, data
     displays, averages and probability. They brought fraction strips (`src/video/numbers.ts`)
     and data figures (`src/video/charts.ts`: bar graphs with reading lines, circle graphs, tally
     marks and bags of marbles).
   - Built: Math 10-3, all 62 videos, in the video manifest. The pronunciation check found two
     words the voice got wrong ("biweekly" and "deci") and hyphenated sizes run together; the
     narration now respells them (`speechText`), and the four videos with them were rendered
     again. Upload packs are zipped per unit. Next: render Math 10-4.
   - Built: Math 10-4, all 47 videos, in the video manifest. The pronunciation check found only
     transcription quirks (homophones, names and fraction words), so no video needed a respelling.
     Upload packs are zipped per unit.
   - Scripted: Math 20-1, all 9 units, 86 videos (two or three parts per lesson): sequences and
     series, trigonometry with angles in standard position and the sine and cosine laws,
     quadratic functions in vertex and standard form with optimization, factoring and solving
     quadratic equations with the quadratic formula and the discriminant, radicals, rational
     expressions and equations, absolute value and reciprocal functions, systems with quadratic
     equations, and linear and quadratic inequalities. They brought angles in standard position
     (`src/video/trig.ts`), and shaded regions built from plane points for inequalities.
     Rendering follows Math 10-3 and 10-4.
   - Scripting: Math 20-2. Unit 1 (reasoning) is done, 9 videos: conjectures, counterexamples,
     deductive proof and invalid proofs, and puzzles and games (logic charts, a take-away game,
     the Tower of Hanoi, a magic square, counting squares), with figures drawn from custom parts.
     Unit 2 (angles and triangles) is done, 12 videos: parallel lines and transversals, the
     angle sum and exterior angles of triangles, polygon angle sums and tiling, and congruent
     triangles with SSS, SAS and ASA proofs (tick marks and arcs added to `triangle`). Unit 3
     (acute-triangle trigonometry) is done, 9 videos: the sine law, the cosine law, and choosing a
     law for surveying, navigation and two-step height problems. Unit 4 (radicals) is done, 12
     videos: simplifying, ordering, adding and multiplying radicals, rationalizing denominators, and
     radical equations with extraneous roots. Unit 5 (statistical reasoning) is done, 13 videos:
     standard deviation, the normal distribution and the 68–95–99.7 rule, z-scores with a table,
     and confidence intervals (a normal curve figure, `normalCurve`, was added). Unit 6
     (quadratic functions) is done, 9 videos: features of parabolas, the axis of symmetry and
     optimization, and factored form with arches. Unit 7 (quadratic equations) is done, 9 videos:
     solving by graphing and factoring, the quadratic formula and the number of roots, and word
     problems with projectiles, frames and break-even prices. Unit 8 (proportional reasoning) is
     done, 12 videos: unit rates and better buys, rates as slopes and rates that change, multi-step
     and combined rates with average speed, scale factors and map scales, and how areas and
     volumes of similar objects grow by k² and k³. Unit 9 (the research project) is done, 4
     videos: research questions, primary and secondary data and fair survey questions, fair
     samples and four kinds of bias, and a complete plan. All 89 Math 20-2 videos are scripted
     and stills-checked; rendering follows Math 20-1.
   - Narration: the variable "a" is now quoted in the Math 20-1 and 20-2 trigonometry scripts, so
     the voice reads it as a letter, not as the article.
   - Scripting: Math 20-3. Unit 1 (slope, rates and unit analysis) is done, 11 videos: rise over
     run, missing rises and runs for roofs, ramps and stairs, percent grade, roof pitch, rate of
     change from tables and graphs (including graphs in pieces), proportions, and chains of
     conversion factors. Unit 2 (surface area) is done, 10 videos: nets and prisms, triangular
     prisms, cylinders, pyramids, cones, slant height from height, spheres and hemispheres,
     square-unit conversions, buying and costing material, and composite objects. Unit 3
     (volume) is done, 12 videos: prisms, capacity, cylinders, pyramids and cones (with true
     height from slant height), spheres, composite objects, cubic-unit conversions, concrete and
     fuel jobs, loads and filling times, and working back to a missing length. Unit 4
     (trigonometry) is done, 12 videos: a right-triangle review (sides, the Pythagorean theorem,
     SOH CAH TOA, angles, a whole roof), angles of elevation and depression, two triangles on
     opposite or the same side, a missing shared side, survey sightings, roof trusses, stairs with
     a landing, and the diagonal of a box (a `twoTriangles` figure was added). Unit 5
     (scale, views and exploded views) is done, 11 videos: reading and drawing to scale, finding a
     scale, areas and volumes at scale, top, front and side views of cube stacks, isometric
     drawings, working back from views, exploded views, parts lists and costs, and assembly order
     (`squareColumns` and `isometricBox` figures were added). Unit 6 (personal finance) is done,
     8 videos: gross and net pay, fixed and variable expenses, surplus and deficit, percent of
     income and circle graphs, saving for a goal (rounding the months up), service charges,
     comparing plans and the break-even point, overdrafts, statements and reconciling an account.
     Unit 7 (interest and credit) is done, 12 videos: simple interest and I = Prt, time in months
     and missing values, compound interest, simple and compound compared, the Rule of 72,
     counting doublings, comparing investment offers, credit card interest, the new balance and
     minimum payment, carrying a balance, the cost of a loan, and comparing credit options with
     rent-to-own (the first lesson in five parts). Unit 8 (graphs and puzzles) is done, 14 videos:
     bar graphs, circle graphs from percents and from counts, reading and using histograms, line
     graphs and their trends, rate of change, predicting from a steady trend, choosing the best
     graph, misleading graphs (a cut-off axis and uneven years), number patterns, magic squares,
     cage and logic puzzles, and winning strategies for take-away games. All 90 Math 20-3 videos
     are scripted and stills-checked; rendering follows Math 20-2.
   - Scripted: Math 20-4. Unit 1 (number sense) is done, 15 videos: integers on a number line and
     the sign rules, the order of operations, integers for means and money owed, mixed numbers
     with fraction strips, adding, subtracting and multiplying fractions, two-step fraction
     problems, ratios, rates and unit rates, proportions, sharing in a ratio, and four kinds of
     percent problems. Worked steps use full-size fractions for easier reading. Unit 2 (consumer
     math) is done, 11 videos: unit prices and the better buy, discounts and sale prices, sales
     tax and tips, and paying over time (down payments, instalments, finance charges, rent-to-own
     and comparing plans). Unit 3 (earning money) is done, 11 videos: gross pay, timecards,
     overtime by the day, salary, commission, piecework, sharing tips, and deductions and net pay
     (each question states its own rates). Unit 4 (managing money) is done, 16 videos: budgets,
     fixed and variable expenses, budget percents, saving for a goal, simple interest, credit
     cards and loans, and the cost of a car, fuel and renting. Unit 5 (formulas and equations) is
     done, 12 videos: substituting into formulas, the temperature formula, two-step jobs, solving
     and checking equations, formulas used backwards, tables of values, and reading and matching
     graphs. Unit 6 (measurement and conversions) is done, 10 videos: SI and imperial units, mixed
     feet and inches, conversion factors, multiply or divide, two-step conversions, and Celsius
     and Fahrenheit both ways. Unit 7 (perimeter and area) is done, 12 videos: perimeter of
     rectangles and other shapes, circumference, the cost of edging, area of rectangles,
     triangles, parallelograms and circles, composite shapes, and buying materials with waste and
     GST. A new flat-shape helper (src/video/shapes.ts) draws the floors and yards. Unit 8 (scale,
     maps and travel) is done, 12 videos: scale drawings and ratio scales, measuring plans,
     finding a scale, map scales, routes, grid maps, compass directions, and speed, distance,
     travel time and arrival times. Unit 9 (data and probability) is done, 12 videos: line and
     circle graphs, percents and slice angles, comparing data sets, outliers, misleading graphs
     and claims, theoretical and experimental probability, and predictions. All 111 Math 20-4
     videos are scripted and stills-checked, so every Math 20 course is scripted (376 videos:
     20-1 86, 20-2 89, 20-3 90, 20-4 111). Built: Math 10-4 (all 47, merged in pull request
     #39, upload packs sent).
   - The work moves into a Claude Code project (a project conversation that starts a thread for
     each task). The repository needs no change: each thread starts from a fresh clone and reads
     `CLAUDE.md`, and the video workflow and its tools are in `video/README.md` and `video/tools/`.
     The project's threads must use the environment that holds the `GDRIVE_*` keys.
   - Built: Math 20-1, all 86 videos at the calm pace (2:48 to 4:47, about 5.3 hours in all),
     rendered unit by unit with `video/tools/render-units.sh` and uploaded to Drive (checked: Drive
     holds 86 Math 20-1 MP4s). Two narration lines a listener could mishear were reworded first.
     Session restarts stopped the first detached renders three times; a cloud session reclaims an
     idle session, so renders now run as tracked tasks that stop cleanly before two hours.
   - Built: Math 20-2, all 89 videos at the calm pace (2:49 to 4:16, about 5.1 hours in all),
     rendered unit by unit and uploaded to Drive. The pronunciation check found four real slips, fixed before the course was done: "In
     proofs", "Congruent figures" and "prove congruence" were reworded, and a lone letter with 's ("Route B's", which
     came out "Route B to Cast") is now voiced by the letter's name ("Bee's") for every course.
     The disk filled up during the course; the old upload packs and the narration of the courses
     already in Drive (checked file by file) were deleted with the owner's agreement, and the
     video guide now says to free each course's narration once Drive holds it.
   - Built (the owner's request, 15 October 2026): present mode plays the lesson's explainer
     videos. Each part that is on YouTube gets a slide just before the section it teaches, with
     YouTube's player and our captions on; the teacher plays it, then carries on with the next
     slide. Part 1 opens the lesson; a later part goes to the section its title names, or else an
     even split. Teachers can hide a video slide with "Choose what to show".
   - Built: Math 20-3, all 90 videos at the calm pace (2:35 to 4:49, about 5.1 hours in all),
     rendered unit by unit and uploaded to Drive (checked: Drive holds every file of all 90). The
     pronunciation check's real slips were fixed first: "break-even" (heard "Bray-Keevan") is now
     said as two words for every course (the video with it was rendered again), and a line in
     lesson 5.3 was reworded.
   - Built: Math 20-4, all 111 videos at the calm pace (2:38 to 4:00, about 5.9 hours in all),
     rendered unit by unit and uploaded to Drive (checked: Drive holds every file of all 111).
     The pronunciation check found real slips, each fixed and the video rendered again before
     the course was done: "GST", "HST" and "EI" are now voiced letter by letter for every course
     ("GST" often sounded like "GSD", "EI" like "I"), and nine lines were reworded ("92 minus
     eighty", "out of 100", "the litres used", "less interest later", a swallowed sentence about
     borrowing, "use C equals", "Use one mile is about", "put both lengths"). Every Math 20 course
     is now rendered and in Drive (376 videos).
   - Done (the owner said yes, 16 October 2026): the ten finished videos from earlier courses that
     say "GST" or "EI" were made again with them voiced letter by letter, and replaced in Drive
     (Math 10-3: m103-1-3, m103-1-3-b, m103-2-4, m103-2-4-b, m103-4-4-b, m103-5-4-b; Math 10-4:
     m104-3-3, m104-3-3-b; Math 20-3: m203-5-3-c, m203-6-1). The Math 10-3 and 10-4 ones keep
     their course's old pace (`video/build.ts --pace old`); every one came out the same length
     as before, and the check now hears "GST" and "EI" in all of them.
   - Built: Math 30-1, all 137 videos at the calm pace (3:15 to 6:21, about 10.5 hours in all),
     rendered unit by unit and uploaded to Drive (checked: Drive holds every file of all 137), with
     new figure helpers for π axes, the unit circle and rational functions. From Math 30-1 on, the
     right "Your turn" answer is spread over A to D, because the lesson player shows the choices in
     the video's order and an answer that is always A gives itself away. The pronunciation check's
     real slips were fixed and those videos rendered again: "cosecant" is now voiced as
     "co-secant" for every course (it came out "co-second"); "f of three x, plus twelve", whose
     pause read as f(3x) + 12, "Rewrite everything" ("We're right"), "If it has sine two x" ("If it
     is"), "the rate r" ("the radar") and a swallowed "c" in "log base c of M N" were reworded; and
     the job-sharing example's Rhea (heard as "re-") is now Maya, in the lesson as well. Every Math
     10 to 30-1 course is rendered and in Drive (706 videos).
   - Decided (the owner, 17 October 2026): the courses already made (Math 10C to 20-4), where the
     right "Your turn" answer is almost always A, stay as they are. Only new courses spread it.
   - Decision (the owner, 17 October 2026): videos are for learners anywhere, not only Alberta.
     From Math 30-2 on, the title card leads with the topic, not the Alberta course and lesson
     number, and the YouTube title, description and tags of every video (finished ones included)
     lead with the topic and give the level in terms used around the world. The 680 finished
     videos keep their title cards; only their YouTube text changes, which needs no re-render.
   - YouTube by API (the owner would like it automated): the YouTube Data API can rename videos
     (about 200 a day on the default quota) and upload them with captions and thumbnails. Uploads
     from an API project that Google has not audited stay private, so automatic uploading waits
     for Google's YouTube API audit and a larger quota. The owner enables the API on the Google
     Cloud project the Drive uploads use and signs in once as the channel's account; the refresh
     token goes in the environment's secrets.
   - Done (17 October 2026): the owner set up the API and saved `YOUTUBE_CLIENT_ID`,
     `YOUTUBE_CLIENT_SECRET` and `YOUTUBE_REFRESH_TOKEN`; every finished video's YouTube text in
     Drive leads with the topic; `video/tools/youtube-update.ts` renames the videos on the channel.
   - Done (19 October 2026, the owner's priority): the 16 Math 10C videos on YouTube were renamed
     topic-first through the API, and `video/tools/youtube-upload.ts` now uploads videos with
     their text, thumbnail and captions, files each in its unit's playlist in lesson order, and
     the upload is linked in `video_links` so its lesson shows it. Uploads come out public. The
     first ten (Math 10C lessons 2.1 to 3.1) went up the same day; the channel allows 10 uploads a
     day, so the rest go up 10 a day, in course order (Math 10C, 10-3, 10-4, 20-1 … 31, then
     Math 5 to 9 as they are made), on a daily schedule. The owner decided no course is "made for
     kids". The owner set the Unit 1 and Unit 2 playlists to Manual, and the tool put them in
     lesson order (it now does this for every playlist a run touches).
   - Decision (the owner, 28 October 2026): keep our thumbnails, drop our captions from now on.
     YouTube raised the channel's upload limit on 24 October (101 went up that day), so the API's
     10,000 units a day became the limit, and our captions were 400 of the roughly 500 each
     finished video cost: 83 of that day's videos went up without their thumbnail and captions,
     and the next runs spent every day finishing them (no runs 25 to 27 October, while the session
     was paused). The owner compared videos with and without ours and could not tell YouTube's
     automatic captions apart. `youtube-upload.ts` now adds only the thumbnail and playlist place
     (`--captions` adds ours), about 90 videos a day instead of about 20, and the 42 still waiting
     need only their thumbnail. It also keeps `youtube-uploaded.json` in Drive, since YouTube's
     listing once left a video out and the run uploaded it twice (the owner deleted the copy).
   - Decision (the owner, 3 November 2026): chemistry and English go on YouTube after the maths,
     in the same daily run, and like the maths none of them is "made for kids". Their videos are
     tagged with their own subject ("chemistry", "Grade 10 chemistry") instead of "math". One
     scheduled task does the uploads (the twice-a-day one); a duplicate made for the project the
     same day was turned off.
   - Built (4 November 2026, the owner's request after finding two viewer comments by chance):
     `video/tools/youtube-comments.ts` lists viewers' new comments and replies on every video,
     with the channel's existing sign-in and a few quota units a run, and keeps what it has seen
     in the project's shared folder. A scheduled check runs it every three hours, logs each new
     comment in the viewer-requests log and drafts a reply with links to matching videos for the
     owner; nothing is posted on YouTube without the owner's yes.
   - To do, when the first non-maths videos go up (after the maths): change the channel
     description so it covers every subject. Lead with a line that stays true as subjects are
     added ("Gradileo explainer videos for Grades 5 to 12", then what each video does and how it
     pauses for its question on gradileo.com), followed by a short "Subjects so far" line naming
     each subject and its grades, which is updated as each new subject starts uploading. Name only
     subjects that have videos on the channel.
   - Built: Math 30-2, all 97 videos at the calm pace (3:40 to 7:07, about 7.8 hours in all), the
     first course with topic-first title cards and no Alberta place names in the narration,
     rendered unit by unit and uploaded to Drive (checked: Drive holds every file of all 97). The
     check found a limit in the voice: Kokoro voices at most about 510 phonemes at once and drops
     the rest, so three long answer lines full of decimals lost their last words. A line that long
     is now voiced in parts of whole sentences (`video/lib/narrate.ts`); a scan of all 16,062 lines
     in every course found only those three, so no earlier video was affected. "Aisha" and
     "Kwame" got respellings; "halves" (heard as "has"), "made to look huge" ("made to a huge")
     and a few lines in Units 1 to 3 were reworded, and the videos already made were made again
     and replaced in Drive. Every Math 10 to 30-2 course is rendered and in Drive (803 videos).
   - Built: Math 30-3, all 93 videos at the calm pace (3:18 to 6:22, about 7.4 hours in all),
     topic-first, in neutral settings (no Alberta places, and a tax is "a sales tax of 5%" stated
     in the question), rendered unit by unit and uploaded to Drive (checked: Drive holds every file
     of all 93). Four helpers wrote the scripts unit by unit; every answer, figure and puzzle was
     checked before rendering. The check found one real slip: "SUV's" was read as the word "suvs",
     so that line now says "the SUV cost" and the video was made again. Newly found blurs ("A
     lease" at the start of a sentence, "a Sudoku", "Maya leases", acronyms with 's, the names
     Zainab and Luis) are listed in `video/README.md`. Every Math 10 to 30 course is rendered and
     in Drive (896 videos).
   - Built: Math 31, all 117 videos at the calm pace (3:21 to 7:26, about 9.5 hours in all),
     topic-first and in neutral settings, rendered unit by unit and uploaded to Drive (checked:
     Drive holds every file of all 117). Four helpers wrote the scripts unit by unit; every answer,
     figure and graph was checked before rendering. The listening check found a handful of lines
     the voice blurred, and reading them found one where the spoken maths did not match the screen
     ("negative two plus two, over one plus four" for −(2 + 2)/(1 + 4)). Those lines were reworded
     and their videos made again: "too" after a number or letter (heard as "two"), "It is negative"
     on its own ("Air is negative"), "is x itself" ("exit self"), "antidifferentiate" ("and to
     differentiate"), "The sign is wrong" beside "sine", and "its slices are" ("it slices our").
     All are listed in `video/README.md`, with a rule for voicing a minus sign in front of a bracket
     or fraction. Every Math 10 to 31 course is rendered and in Drive (1,013 videos).
   - Built: Math 5, all 96 videos at the calm pace (2:42 to 6:18, about 6.3 hours in all),
     explaining each lesson as simply as possible for a Grade 5 learner, with parts split by idea,
     topic-first and in neutral settings, rendered unit by unit and uploaded to Drive (checked:
     Drive holds every file of all 96). Four helpers wrote the scripts unit by unit; every answer,
     figure and puzzle was checked before rendering. The listening check found two phrases the
     voice blurred, and those videos were made again: "ate" before a number ("ate two eighths" was
     heard as "eight, two eighths"; now "eats") and a count of a number in the plural ("twenty
     sixes" was heard as "26s" in the lesson whose answer is 26; now "twenty groups of six"). Both
     are listed in `video/README.md`. Every course from Math 10 to 31, and Math 5, is rendered and
     in Drive (1,109 videos).
   - Built: Math 6, all 117 videos, rendered unit by unit and uploaded to Drive. Every script and
     every Your-turn answer and still was checked before rendering, and the listening check found
     nothing to remake (the voice said "twenty-eight out of one hundred" as "twenty-eight of one
     hundred", which keeps its meaning). One video failed to render once and built cleanly on a
     second try. Every course from Math 10 to 31, Math 5 and Math 6 is rendered and in Drive
     (1,226 videos).
   - Built: Math 7, all 143 videos, written by four helpers, checked like Math 6 (four answer
     lines or figures were corrected, and money is always said in dollars and cents), rendered
     unit by unit and uploaded to Drive (checked: Drive holds every file of all 143). The
     listening check found phrases the voice blurred every time, and eleven videos were made again
     with clearer wording: "lengths" (heard as "links"; `speechText` now says "lenkths", and the
     end of one long line names the sides), "Let c be" and "use C equals" ("let's see", "you
     see"), "right and up are positive" ("write an upper"), "A ray, E F" ("Array"), "two
     endpoints" ("two and points"), "What is the mean?" ("What does the mean"), the name Ayesha
     (garbled; now Amara, in one Math 9 video too) and dice pairs such as "one and six" ("1 in 6"
     in a probability lesson; now "one plus six"). Each is listed in `video/README.md`. Every
     course from Math 10 to 31 and Math 5 to 7 is rendered and in Drive (1,369 videos).
   - Built: Math 8, all 129 videos, written by five helpers. Every Your-turn answer and every still
     was checked; one question that only made sense inside its video was rewritten to stand on its
     own, the exchange-rate slide was re-spaced so its equation sits inside the margin, and the
     volume in a working-backwards example is now shown as well as said. Rendered unit by unit and
     uploaded to Drive (checked: Drive holds every file of all 129). The listening check found
     phrases the voice blurred every time, and eleven videos were made again: `speechText` now
     drops the hyphen in "eighty-one" (heard as "A to 1") and "x-tiles" ("x styles"), and the
     lines with "of eighty." at the end, "It is cut", "a count is positive" ("account"), the name
     Dakota ("Decoder"; now Amara), "A line graph" ("Align graph") and "Leo picks a card" ("Leo
     Pixacard") were reworded. Each is listed in `video/README.md`. Every course from Math 10 to
     31 and Math 5 to 8 is rendered and in Drive (1,498 videos).
   - Built: Math 9, all 136 videos, written by five helpers. Every Your-turn answer and every still
     was checked; two point labels on one graph were moved off the lines they sat on, and
     "bisects" is now respelled for the voice ("a chord bisects the chord" came out "by sex").
     Rendered unit by unit and uploaded to Drive (checked: Drive holds every file of all 136). The
     listening check found phrases the voice blurred every time, and fifteen videos were made again
     with clearer wording: "So round four" ("Surround four"), "add its opposite" ("at its
     opposite"), "A rise, a gain" ("Arise, again"), "rink" ("ring", "rank"), "stays as" ("stays
     is"), "perimeters" ("parameters"), "Write an inequality" ("Ride in an equality"), "a rider"
     ("a writer"), "a line six squares long" ("Align"), "five hundredths" ("500"), a short line
     starting "x is" ("Axis", "Access"), "the x-coordinate" at the end of a line ("X-Go-ordinate"),
     a money product said as "zero point one five times two hundred forty dollars" ("$0.1, $5") and
     "convenience samples" ("convenient"). Each is listed in `video/README.md`. With Math 9, every
     course from Math 5 to Math 31 has an explainer video for every lesson, rendered and in Drive
     (1,634 videos).
2. **Social media pages and a posting schedule** (the owner's request, 15 October 2026). Gradileo
   has no social pages yet. Open them, then post three times a week across all of them, with
   Claude coordinating: preparing each week's posts, keeping the schedule and reporting. It runs
   alongside the explainer videos, which render in the background.
   - Pages (the owner's choice, 16 October 2026): Facebook, Instagram, LinkedIn and TikTok, with
     the same handle on each where it is free (`@gradileo`, or `@gradileomath` if taken). The
     audience is high-school students (the platforms are for ages 13 and up), parents and
     teachers; posts about the Grade 5 to 9 courses speak to parents and teachers, not to children.
   - The owner opens the accounts this weekend (sign-up needs a person, a phone and acceptance of
     each platform's terms), with admin@gradileo.com as the email and two-step sign-in on, and
     shares the links. Claude never handles the passwords.
   - Profile kit, by Claude: profile picture (`video/out/channel/profile-800x800.png`), a cover
     or banner in each platform's size, a bio within each platform's limit, and the link to
     gradileo.com, in Drive under `Gradileo social/`.
   - Posts: Monday, Wednesday and Friday. A mix of a short vertical clip cut from an explainer
     (a "Your turn" question as the hook, captions on, the answer in the next post or the
     comments), a worked example or study tip as an image or carousel, and news about Gradileo
     for students, parents and teachers. Each post links to the full video or lesson. Show the
     owner a sample week before the first one goes out.
   - Posting by API (the owner would like it automated; checked 16 October 2026, to confirm in
     each developer site):
     - Facebook and Instagram: one Meta developer app. Its own admins' Page and Instagram
       professional account (Business or Creator, linked to the Page) can post through the Graph
       API without App Review, since the app only acts on our accounts. Facebook can schedule a
       post 10 minutes to 30 days ahead; Instagram allows 100 posts a day. Feasible now.
     - TikTok: the Content Posting API works at once, but an app that has not passed TikTok's audit
       can only post privately. The audit asks for a demo video, the privacy policy and the
       verified domain (gradileo.com has both), a few weeks. Until then the API can put each video
       in the account's drafts, and the owner taps Post in the app.
     - LinkedIn: posting as a company page needs the Community Management API, which LinkedIn
       grants after reviewing the app, and only for a verified company page.
     - Simplest overall: a scheduling service with apps already approved (Buffer and others post
       to all four), at a monthly cost. Otherwise our own scheduled task posts to Facebook and
       Instagram from the start, TikTok goes to drafts until the audit, and LinkedIn waits for its
       review.
     - Keys: the access tokens go in the environment's secrets (never in chat or the repository);
       Claude names them only.
   - Each week Claude prepares the next week's posts (media, a caption for each platform and the
     posting time) in Drive, and posts or schedules them where an API or tool allows. A weekly
     scheduled task keeps it going.
3. **Join a class by link, with just a name** (the owner's decision, 15 October 2026: collect as
   little as possible, and adjust later if needed). The teacher shares the class link; a student
   opens it and types a first and last name, nothing else: no email, username or password.
   - The device the student joined on remembers them. The teacher sees the names waiting, selects
     all, unticks anyone they do not recognize, and approves (or denies) them in one go.
   - A student on a new device, or after clearing the browser, opens the link and types their
     name again; the teacher sees that it matches a student already in the class, and approving
     reconnects them to their progress. A shared classroom device offers "Not you? Switch student".
   - Nothing reaches the class without the teacher's approval; a class can have only so many names
     waiting, and denied ones are cleared.
   - Built: the class link (`/join/CODE`), the `join-class` Edge Function (makes the account and
     signs the device in; its password is random and never leaves the function), the teacher's
     list with every name ticked (untick, then approve or decline the ticked ones), the "same
     student" match for a student on a new device, a waiting page that opens the class on its own,
     and a daily clean-up of name-only accounts that never got in. Names typed in lower case are
     capitalized. Students with a Gradileo account can still use the code.
4. **Students' questions during a presentation** (the owner's idea, 15 October 2026). While the
   teacher presents, students send questions about the lesson from their own devices. Each one
   pops up on the teacher's screen to answer or skip; at the end, a "Questions" slide lists them,
   and it is left out when nobody asked anything.
   - Built: the "Ask a question" banner on every student page while the teacher presents (at most
     300 characters, five in ten minutes), the pop-up on the teacher's screen (Answer shows the
     question large; Skip moves on; "Later" tucks it away until the next one), the "Questions"
     slide before the end, and the questions with students' names on the teacher's lesson page.
     The class's screen shows the student's first name and last initial unless the student ticks
     "Hide my name from the class" (then "A student asks"; the owner's decision, 16 October 2026,
     that names show by default); the teacher always sees who asked. Present mode's settings can
     turn questions off, for example while preparing at home.
5. **Gradileo for every English-speaking learner** (the owner's decision, 17 October 2026).
   Gradileo is for students anywhere who need help with mathematics, in the US, the UK, Africa
   and every other English-speaking country, and is sold to anyone, not only Alberta schools.
   - Topics first: lessons organized by plain topic names and levels (for example "Functions and
     transformations", about Grade 11–12 or Year 12–13); the Alberta courses stay as one way of
     grouping them.
   - Curriculum maps: a learner picks their system and sees the same lessons in its order and
     with its names: US Common Core (Algebra I, Geometry, Algebra II, Precalculus), the UK (GCSE,
     A level), African systems (for example WAEC in West Africa, KCSE in Kenya and CAPS in South
     Africa), IB, Cambridge IGCSE and others. Fill the gaps each map shows.
   - Placement and sign-up ask for the country or curriculum and the age or year first; the
     landing page speaks to learners everywhere.
   - Local details: units, currency and spelling to suit the learner where it matters; examples
     tied to one country (Canadian GST and EI) say so in the question.
   - The plan (30 October 2026): `docs/PLAN-WORLDWIDE.md`. Four steps: ask for the country and
     year first, a catalogue of topics with "Browse by topic", curriculum maps that show the same
     lessons in each syllabus's order and names, and filling the gaps the maps show. Decisions (the
     owner, 30 October 2026): US Common Core is the first map and UK GCSE the second, one spelling
     (Canadian and British) everywhere, and teachers can start a class on a mapped course.
   - Built (30 October 2026), step 1: **the country and year first**. "Find your course" asks where
     the learner goes to school (the US, the UK's three systems, Canada, Nigeria, Ghana, Kenya,
     South Africa, India, Australia, New Zealand, Ireland, the IB, Cambridge, or somewhere else by
     age) and their year in that system's words (Year 11, SS 1, Form 3, MYP 5), with a first guess
     from the time zone. `engine/curricula.ts` matches each year to Gradileo's level, the
     recommendation says where the course sits ("Usually taken in Year 11"), and the curriculum is
     saved on the profile (`profiles.curriculum`) for the maps. The landing page names the
     countries (PR #108).
   - Built (30 October 2026), step 2: **topics first**. `engine/topics.ts` files every lesson of
     every course under a plain topic: 52 in mathematics in nine strands (number, algebra,
     functions, geometry and measurement, trigonometry, data and probability, money, reasoning,
     calculus), 12 in chemistry and 7 in English, with a test that no lesson is left out. Students
     have **Browse by topic** (`/s/topics`, from Learn, the sidebar and the course menu): the
     topics by subject and strand, a search over topics and lesson titles in every subject, and
     each topic's level in the learner's own years ("Years 11–13", "JSS 3 – SS 2"), taken from
     the courses that first teach it. A lesson in another course opens there, self-paced (PR #109).
   - Fixed (30 October 2026): students could not study Chemistry or English self-paced on the live
     site. The database's `start_self_paced` accepted only mathematics course ids ("That course was
     not found."); the demo mode skips that check, so the tests missed it. It now accepts every
     subject's course ids, with a database test for chemistry and English (PR #110).
   - Built (30 October 2026), step 3: **the US Common Core map** (`engine/curriculum/maps/us.ts`).
     Seven US courses, Grade 6, Grade 7, Grade 8, Algebra I, Geometry, Algebra II and
     Precalculus, each built from Gradileo's lessons in the US order and under US unit names
     (with the standards each unit covers), 35 to 57 lessons a course. A US learner is offered the
     course of their grade on "Find your course" (with Calculus after Precalculus), with a placement
     check on the course before; teachers can start a class on any of them from the new "US Common
     Core" tab. Each course lists its gaps, shown with the course: scientific notation, two-way
     tables, box plots, complex numbers, the equation of a circle, two-column proofs, vectors,
     matrices, polar form and conics among them (PR #111). Next: step 4 fills these gaps, and the
     UK GCSE map follows.
   - Built (4 November 2026), step 4, part 1: **the US gaps of Grades 6 to 8, Algebra I and
     Geometry are filled.** Twelve new lessons with 18 question generators, in a new course of extra
     lessons, **More Mathematics Topics** (`engine/curriculum/mathmore/`), which the maps borrow from
     and Browse by topic lists but the course pickers do not offer: statistical questions and dot
     plots, box plots and the interquartile range, mean absolute deviation, comparing two
     populations, two-way tables, scientific notation and calculating with it, linear and
     exponential growth compared, cross-sections, solids of revolution, two-column proofs and the
     equation of a circle. Each lesson has its own level (Grade 6 to Grade 10). Dot plots and box
     plots are new figure types. Five of the seven US courses now have no gaps; Algebra II
     (complex numbers, polynomial identities, experiments and simulation) and Precalculus
     (vectors, matrices, polar form, conics) are next. The new lessons still need their videos and
     tutor recordings.
   - Built (4 November 2026), step 4, part 2: **the US gaps of Algebra II and Precalculus are
     filled, so all seven US courses list none.** Eleven more lessons in More Mathematics Topics
     with 16 question generators: experiments, observational studies and simulation; complex
     numbers, complex solutions of quadratics, and polynomial identities with the fundamental
     theorem of algebra (a new unit); vectors, matrices, and determinants and inverses with systems
     (a new unit); and polar coordinates, complex numbers in polar form, conic sections and
     parametric equations (a new unit), at Grades 11 and 12. Browse by topic has new topics for
     complex numbers, vectors and matrices, polar form, and conics. These lessons also need their
     videos and tutor recordings. Next: the UK GCSE map.
   - Built (10 November 2026), step 4, part 3: **the UK GCSE gaps are filled, so both tiers list
     none.** Sixteen more lessons in More Mathematics Topics, in five new units, with 32 question
     generators: error intervals, bounds and recurring decimals; quadratic sequences, iteration,
     gradients and areas under graphs, and trigonometric graphs in degrees; direct and inverse
     proportion, density and pressure; bearings, loci, arcs and sectors in degrees, and Pythagoras
     and trigonometry in 3D; and frequency trees, histograms and cumulative frequency, at Grades 9
     to 11. Each is filed in the Foundation and Higher units that teach it and under Browse by
     topic. Next: A level Mathematics.
     Their videos (10 November 2026): 17 explainers for the 16 lessons (`mx-7-1` to `mx-11-3`, with
     gradients and areas under graphs in two parts), scripted and checked in stills, then rendered
     unit by unit (`mx-u7` to `mx-u11`), stored on Drive and handed to the YouTube uploads (PR #149).
     The Tutor voice workflow recorded their tutor narration after #146 merged.
   - Built (11 November 2026), step 3, the third map: **A level Mathematics, Years 12 and 13**
     (in `engine/curriculum/maps/uk.ts`, under the tab now called "UK GCSE and A level"). The first
     year (the AS content, 20 units) and the second (12 units) are built from Gradileo's lessons in
     the order of a two-year scheme of work, with the A level content areas (A proof to S moments)
     in each unit. A UK learner in Year 12 or 13 heading for university, or not sure, is offered the
     year of A level on "Find your course", with a placement check on GCSE Higher or the first year;
     teachers can start a class on either. Gaps it lists (36): proof by exhaustion and by
     contradiction; partial fractions; sigma notation and recurrence relations; the binomial
     expansion for rational n; ½ab sin C; small-angle approximations; sec, cosec and cot graphs and
     the inverse trigonometric functions; R cos(θ ± α); logarithmic graphs for y = axⁿ and y = kbˣ;
     parametric differentiation; change of sign, Newton–Raphson and the trapezium rule; integration
     by parts and with partial fractions; differential equations; 3D vectors; quota and opportunity
     sampling, coding and outliers; discrete random variables and the binomial distribution; the
     inverse normal and the normal approximation; hypothesis tests (binomial, correlation, normal
     mean) and the correlation coefficient; and all of mechanics beyond straight-line motion
     (units, suvat, forces and Newton's laws, connected particles, projectiles, resolving forces,
     friction, inclined planes, 2D kinematics, moments). Next: fill these gaps, mechanics and
     statistics first, then the pure topics.
   - Built (11 November 2026), step 4, part 4: **the A level mechanics gaps are filled.** Eleven
     lessons in More Mathematics Topics, in two new units, with 22 question generators: quantities,
     units and modelling, the constant acceleration formulae, vertical motion under gravity,
     Newton's laws and lifts, and connected particles (Unit 12, Year 12); resolving forces and
     equilibrium, friction, inclined planes, projectiles, kinematics in two dimensions with vectors
     and calculus, and moments (Unit 13, Year 13). Each is filed in the A level units that teach it
     (Year 12 gains "Quantities and Units in Mechanics" and "Forces and Newton's Laws"; Year 13
     gains "Moments", "Forces and Friction", "Projectiles", "Applications of Forces" and "Further
     Kinematics") and under a new Mechanics strand in Browse by topic. Every question states
     g = 9.8 m/s² and asks for 3 significant figures where an answer is not exact. The maps now
     list 26 gaps. These lessons also need their videos and tutor recordings. Next: the statistics
     gaps, then the pure topics.
   - Built (11 November 2026), step 4, part 5: **the A level statistics gaps are filled.** Ten
     lessons in More Mathematics Topics, in two new units, with 20 question generators: sampling
     methods (including quota and opportunity), variance and standard deviation from Σx and Σx²
     with coding, outliers and cleaning data, discrete random variables, the binomial distribution,
     and binomial hypothesis tests with p-values and critical regions (Unit 14, Year 12); the
     product moment correlation coefficient and its test, the inverse normal distribution, the
     normal approximation to the binomial, and tests for the mean of a normal distribution (Unit 15,
     Year 13). Year 12 gains "Statistical Distributions" and "Hypothesis Testing", Year 13 gains
     "Regression, Correlation and Hypothesis Testing", and the other lessons join the existing data
     and normal distribution units; Browse by topic gains "Statistical hypothesis testing". Critical
     values for the correlation test are worked out from the t distribution and stated in each
     question, as the tables print them. The maps now list 17 gaps, all pure. These lessons also
     need their videos and tutor recordings. Next: the pure topics.
   - Built (11 November 2026), step 4, part 6: **the A level pure gaps outside calculus are filled.**
     Eleven lessons in More Mathematics Topics, in three new units, with 22 question generators:
     proof by exhaustion, the area of a triangle as ½ab sin C, and logarithmic graphs for y = axⁿ
     and y = kbˣ (Unit 16, Year 12); proof by contradiction, partial fractions (including improper
     fractions), sigma notation and recurrence relations, the binomial expansion for any rational n
     and its validity, and vectors in three dimensions (Unit 17, Year 13); and small-angle
     approximations, sec, cosec, cot and the inverse trigonometric functions, and R sin(θ ± α)
     (Unit 18, Year 13). Year 12 has no gaps left; Year 13 gains "Proof", "The Binomial Expansion"
     and "Vectors", and the other lessons join the existing units. The maps now list 6 gaps, all
     calculus and numerical methods. These lessons also need their videos and tutor recordings.
     Next: parametric differentiation, Newton–Raphson, the trapezium rule, integration by parts and
     with partial fractions, and differential equations.
   - Built (11 November 2026), step 4, part 7: **the last A level gaps are filled.** Six lessons in
     More Mathematics Topics, in a new Unit 19 (Year 13), with 12 question generators: parametric
     differentiation and differentiating sin x and cos x from first principles, locating roots by a
     change of sign and the Newton–Raphson method, the trapezium rule with over- and
     underestimates, integration by parts, integrating with partial fractions (answers in the form
     ln K), and separable differential equations with growth, decay and cooling models. They join
     the Year 13 Differentiation, Numerical Methods and Integration units, and Browse by topic gains
     "Differential equations". **The A level map now lists no gaps**, so every UK GCSE and A level
     Mathematics topic has a Gradileo lesson. These 38 A level lessons (Units 12 to 19) still need
     their videos and tutor recordings.
   - Built (11 November 2026): **videos and tutor recordings for the 38 A level lessons.** One
     explainer each (`src/content/mathmore/videos/mx-12-1.ts` to `mx-19-6.ts`, PR #157), made the
     same way as the GCSE gap videos in PR #149, with two shared figure helpers:
     `lib/mx-mechanics.ts` (blocks, force arrows) and `lib/mx-stats.ts` (normal curves with shaded
     areas). Units `mx-u12` to `mx-u19` are rendered and in Drive (`Gradileo videos/More Topics/`)
     and handed to the YouTube uploads. The Tutor voice workflow recorded all 38 lessons (runs #75
     and #77). Every UK GCSE and A level Mathematics topic now has a lesson, a video and a tutor
     recording.
   - Built (11 November 2026), step 3, the first maps outside mathematics: **UK chemistry and
     English** (`engine/curriculum/maps/uk-chemistry.ts` and `uk-english.ts`, joined to the UK map,
     whose courses can now name a `subject`). **GCSE Chemistry** (8 units, 42 lessons) and **A level
     Chemistry, Years 12 and 13** (9 units and 3 units) are built from the chemistry lessons of
     Grades 10 to 12, and **GCSE English Language** (7 units) and **GCSE English Literature** (6
     units: Romeo and Juliet, Macbeth, The Tempest, poetry, unseen poetry and writing about
     literature) from the English lessons of Grades 6 to 12. A UK learner in Year 10 or 11 is
     offered the GCSE course on "Find your course", and A level Chemistry in Years 12 and 13 with
     Gradileo's own courses as alternatives. The gaps: GCSE Chemistry lists 16 (the reactivity
     series and extracting metals, making salts, the tests for gases and ions, the atmosphere,
     using resources, and smaller ones); A level Chemistry lists 13 in Year 12 and 15 in Year 13
     (mostly inorganic chemistry, mechanisms, analysis and thermodynamics); GCSE English Language
     lists 8 (evaluating a statement, comparing two writers, the forms of viewpoint writing,
     descriptive writing); GCSE English Literature lists 6 (the nineteenth-century novel is the
     largest; modern texts in copyright stay out, since Gradileo teaches from the public domain).
     A level English is not mapped.
   - Built (11 November 2026), step 3, the first chemistry gaps filled: **More Chemistry Topics**
     (`engine/curriculum/chemmore/`, `chem-more`, lesson ids `cx-…`), a course of extra lessons
     like More Mathematics Topics, which the chemistry maps borrow from. Eight lessons in three
     units, with 16 question generators: the reactivity series and displacement, extracting
     metals, making soluble salts, and the electrolysis of solutions with half equations (Unit 1);
     purity, formulations and the tests for gases, and flame tests with the tests for metal ions,
     carbonates, halides and sulfates (Unit 2); empirical and molecular formulae, and atom economy
     (Unit 3). **GCSE Chemistry** now has 50 lessons and lists 10 gaps, down from 16 (the
     atmosphere, using resources, the Haber process, fuel cells, the history of the atom, the
     transition metals and the forms of carbon remain), and **A level Chemistry Year 12** lists
     12, down from 13. The new lessons have no videos or tutor recordings yet.
   - Built (11 November 2026), step 3, the first English gaps filled: **More English Topics**
     (`engine/curriculum/engmore/`, `eng-more`, lesson ids `ex-…`), the same kind of course for
     English. Four lessons in two units, with 8 question generators: evaluating a statement about
     a text ("how far do you agree?"), summarising the differences between two texts, comparing
     two writers' viewpoints and methods, and writing an article, a formal letter and a speech.
     Its texts (five pairs of a modern and a nineteenth-century source, and five fiction
     extracts) were written for the lessons, so nothing depends on a text in copyright. **GCSE
     English Language** now has 37 lessons and lists 4 gaps, down from 8 (nineteenth-century
     non-fiction, descriptive writing from a picture, spelling and spoken language remain). The
     new lessons have no videos or tutor recordings yet. Next: the rest of GCSE Chemistry (the
     atmosphere, using resources), then GCSE English Literature's nineteenth-century novel.
   - Built (11 November 2026), step 3, **GCSE Chemistry complete**: More Chemistry Topics gains
     three units, ten lessons and 20 question generators. Unit 4, The Earth’s Atmosphere and
     Resources: the air and the early atmosphere, greenhouse gases and pollutants, potable water
     and waste water, and life cycle assessments with recycling. Unit 5, Atoms, Structures and the
     Periodic Table: the history of the atomic model and of the periodic table, the transition
     metals, and diamond, graphite, graphene, fullerenes and nanoparticles. Unit 6, Materials and
     Industry: corrosion, alloys and other materials, the Haber process and NPK fertilisers, and
     fuel cells with cells and batteries. The GCSE map files them under its own units (two new
     ones, Chemistry of the Atmosphere and Using Resources), so **GCSE Chemistry** now has 60
     lessons and **no gaps**. Explainer videos for the first twelve More Chemistry and More
     English lessons are being rendered, and the tutor voice workflow records every new lesson
     when it merges.
   - Built (11 November 2026), step 3, **GCSE English Language complete**: More English Topics
     gains two units, four lessons and 8 question generators (`engmore/gen/skills34.ts`). Unit 3:
     reading nineteenth-century non-fiction (four extracts written for the lesson in the style of
     the period: a letter, a newspaper report, a diary and an advice book) and descriptive writing
     from a picture. Unit 4: spelling (homophones, tricky words, suffix and plural rules) and
     spoken language (presenting, standard English, answering questions). The GCSE map files them
     under its own units, adding a Spoken Language unit, so **GCSE English Language** now has 41
     lessons and **no gaps**. Next: GCSE English Literature's nineteenth-century novels, then
     A level Chemistry.
   - Built (11 November 2026), step 3, **A level Chemistry Year 12 complete**: More Chemistry
     Topics gains three A level units, twelve lessons and 24 question generators
     (`chemmore/gen/atoms12.ts`, `inorganic12.ts`, `organic12.ts`). Unit 7: time of flight mass
     spectrometry, electron configurations and ionisation energies, dative bonds and the
     Maxwell–Boltzmann distribution. Unit 8: Period 3, Group 2 and Group 7. Unit 9: reaction
     mechanisms, halogenoalkanes and ozone, E–Z isomerism, alcohols and organic analysis. The Year
     12 map files them under its units, adding Periodicity, Group 2, Group 7, Alcohols and Organic
     Analysis, so **A level Chemistry Year 12** has **no gaps**.
   - Built (11 November 2026), step 3, **A level Chemistry Year 13 complete**: More Chemistry
     Topics gains units 10 to 12, fifteen lessons and 30 question generators
     (`chemmore/gen/physical13.ts`, `inorganic13.ts`, `organic13.ts`). Unit 10: Born–Haber cycles,
     entropy and Gibbs free energy, rate equations and the Arrhenius equation, and Kp. Unit 11:
     Period 3 oxides, transition metal complexes, colour and catalysts, and metal aqua ions. Unit
     12: optical isomerism, aldehydes and ketones, acylation, benzene, amines, amino acids and DNA,
     synthesis, and NMR and chromatography. The Year 13 map is reordered into the scheme's
     seventeen units, so **both A level Chemistry years have no gaps**. Next: GCSE English
     Literature's nineteenth-century novels and other Shakespeare plays.
   - Built (11 November 2026), step 3, **GCSE English Literature set texts**: More English Topics
     gains units 5 to 7, one lesson and two question generators for each of the ten set texts in
     the public domain: *A Christmas Carol*, *Dr Jekyll and Mr Hyde* and *Great Expectations*
     (Unit 5); *Frankenstein*, *Jane Eyre*, *Pride and Prejudice* and *The Sign of Four* (Unit 6);
     *Much Ado About Nothing*, *The Merchant of Venice* and *Julius Caesar* (Unit 7). Each text is
     data in `engmore/gen/lit/` (characters, events in order, themes, quotations with a reading
     and three misreadings, and context questions), and `engmore/gen/literature.ts` turns any text
     into questions: who is who, which event comes first or last, who says a line, which theme a
     quotation shows, its best reading, and context. Every quotation, in the data and on the
     lesson pages, was checked word for word against the text's Project Gutenberg edition. The
     Literature map files each text as its own unit, so its only gaps are the anthology poems and
     the texts still in copyright. Ten explainer videos come with them.
   - Built (12 November 2026), step 3, **GCSE English Literature anthology poems and modern
     texts, with references**: More English Topics gains Unit 8 (AQA Power and Conflict), Unit 9
     (AQA Love and Relationships) and Unit 10 (*An Inspector Calls*, *Blood Brothers*, *Lord of the
     Flies* and *Animal Farm*). The owner asked that others' work is never plagiarised and always
     credited, so every English Literature lesson that quotes a text now ends with a References
     section naming the author, the first publication and the edition quoted. Only works in the
     public domain are quoted (the twelve older anthology poems, each checked word for word against
     its Project Gutenberg edition); the eighteen anthology poems and four modern texts still in
     copyright are described in our own words, never quoted, and each is credited. Poems are data
     in `engmore/gen/poems/` with generators in `engmore/gen/poetry.ts`; the modern texts use
     `moments` (key moments in our own words) in `engmore/gen/lit/modern.ts`. The Literature map
     now has **no gaps**. Not covered: AQA's third cluster, Worlds and Lives. Ten explainer videos
     come with the new lessons.
   - Built (11 November 2026), step 3, maps four to eight: **WAEC, Kenya, South Africa, Cambridge
     IGCSE and the IB Diploma**, 14 courses built from Gradileo's lessons, each under the
     syllabus's own unit names and in its order. `maps/waec.ts`: WASSCE General Mathematics, SS 1
     to SS 3 (Nigeria, and Ghana as SHS 1 to 3 through the map's `alsoFor`). `maps/kenya.ts`: KCSE
     Mathematics, Form 1 to Form 4. `maps/caps.ts`: CAPS Mathematics, Grades 10 to 12.
     `maps/cambridge.ts`: IGCSE Mathematics (0580), Core and Extended. `maps/ib.ts`: Analysis and
     Approaches SL and Applications and Interpretation SL. "Find your course" offers a senior
     secondary learner in Nigeria or Ghana the year of WASSCE, a Kenyan learner who gives a form
     that form's KCSE course (a grade of the new curriculum keeps Gradileo's courses), a South
     African learner heading for further study the grade's CAPS course (with the practical course
     as the Mathematical Literacy alternative), a Cambridge learner in Year 10 or 11 IGCSE Extended
     (Core with extra support), and an IB Diploma learner AA SL for science plans and AI SL
     otherwise; teachers can start a class on any of them from the five new tabs. Not mapped yet:
     WAEC Further Mathematics, Kenya's new senior school, Mathematical Literacy, Cambridge A level,
     and the IB's higher level and MYP. Gaps the maps list, by topic (many are shared, so one
     lesson fills several maps): number bases; modular arithmetic; truth tables; changing the
     subject of a formula; joint and partial variation; linear programming; segments of a circle;
     frustums; Heron's formula; cyclic quadrilaterals and the alternate segment (tangent–chord)
     theorem; intersecting chords and common tangents; the midpoint and proportionality theorems;
     the angle of inclination of a line; the equation of a tangent to a circle; vector geometry
     (the ratio theorem, collinear points); matrices and transformations; longitude and latitude;
     the mid-ordinate rule; nominal and effective interest rates; annuities, loans, sinking funds,
     shares and stocks; the least squares regression line; the expected value of a discrete random
     variable; Spearman's rank correlation; the chi-squared tests; the t-test; and Voronoi
     diagrams. Next: fill these gaps in More Mathematics Topics, the most shared first, then their
     videos and tutor recordings.
   - Built (11 November 2026): **the first 16 gap lessons**, in four new units of More Mathematics
     Topics with 32 question generators. Unit 23: number bases, modular arithmetic and truth
     tables. Unit 24: changing the subject of a formula, joint and partial variation, and linear
     programming. Unit 25: segments of a circle, frustums, Heron's formula, cyclic quadrilaterals
     and the alternate segment theorem, intersecting chords and common tangents, and longitude and
     latitude. Unit 26: nominal and effective interest rates, annuities and sinking funds, present
     value and loans, and shares and stocks. The maps teach them under their own unit names, so
     WASSCE SS 1 to SS 3, KCSE Form 1 and Form 2, and IGCSE Core now list no gaps. Gaps still
     listed: vector geometry (KCSE Form 3, IGCSE Extended); matrices and transformations and the
     mid-ordinate rule (KCSE Form 4); the midpoint and proportionality theorems, the angle of
     inclination, the tangent to a circle and the least squares regression line (CAPS); the
     regression line and expected value (IB), and Voronoi diagrams, Spearman's rank correlation,
     the chi-squared tests and the t-test (IB AI SL). Next: these lessons, then the videos and
     tutor recordings for Units 23 to 26 and after.
   - Built (11 November 2026): **five more gap lessons**, Unit 27 of More Mathematics Topics, with
     10 question generators: the midpoint and proportionality theorems, the angle of inclination
     of a line, the equation of a tangent to a circle, the ratio theorem and collinear points, and
     matrices and transformations. CAPS Grades 10 and 11, KCSE Form 3 and IGCSE Extended now list
     no gaps. Gaps still listed: the mid-ordinate rule (KCSE Form 4); the least squares regression
     line (CAPS Grade 12); the regression line and expected value (IB), and Voronoi diagrams,
     Spearman's rank correlation, the chi-squared tests and the t-test (IB AI SL). Next: a
     statistics unit for these, then the videos and tutor recordings for Units 23 to 27.
   - Built (11 November 2026): **the last seven gap lessons**, Units 28 and 29 of More Mathematics
     Topics, with 14 question generators: the least squares regression line, expected value,
     Spearman's rank correlation coefficient, the chi-squared tests, the t-test for two means, the
     mid-ordinate rule and Voronoi diagrams. Every course in the WAEC, KCSE, CAPS, IGCSE and IB
     maps now lists no gaps. Next: the videos and tutor recordings for Units 23 to 29.
   - Built (11 November 2026): **the videos for Units 23 to 29**, one explainer for each of the
     28 gap lessons (`src/content/mathmore/videos/mx-23-1.ts` to `mx-29-2.ts`), with figures for
     the feasible region, segments, frustums, the midpoint theorem, inclination, regression
     residuals and mid-ordinate rectangles. They are rendered unit by unit (`mx-u23` to `mx-u29`)
     and stored on Drive under `Gradileo videos/More Topics/`, ready for the YouTube uploads. The
     voice now says "modulo" correctly (`src/video/words.ts`). The tutor recordings follow from the
     *Tutor voice* workflow once the lessons and videos are merged.
   - In progress (4 November 2026, the owner's go-ahead): **More Mathematics Topics videos**, 30
     explainers for its 23 lessons (`src/content/mathmore/videos/`, PR #122), each with its own
     grade on YouTube. Scripts and stills are done; units are rendering and going to Drive, then the
     course joins the daily YouTube upload (the scheduled task's course list needs `math-more`).
     Its tutor recordings are still to do.
   - Built (the owner's go-ahead, 4 November 2026; finished 5 November 2026): **English Grades 5 to 9**, one grade per
     pull request (plan: `docs/PLAN-ENGLISH-5-9.md`). Grade 5 English (`eng-5`) is built: 6 units
     (stories, poetry, reading for information, words, grammar and punctuation, writing), 25
     lessons and 52 practice skills, listed for classes and placement (a Grade 5 learner is placed
     in it) and filed under the English topics (#126; poems in its questions keep their line
     breaks since #127). Grade 6 English (`eng-6`) is built: 7 units (stories, poetry,
     non-fiction, media, words, grammar and punctuation, writing), 25 lessons and 50 practice
     skills, with poems by Tennyson, Wordsworth, Dickinson, Sandburg and Stevenson; a Grade 6
     learner is placed in it (#128). Grade 7 English (`eng-7`) is built: 7 units (short stories,
     poetry, drama, non-fiction, media, grammar and punctuation, writing), 26 lessons and 52
     practice skills, with Shakespeare's Sonnet 18, Coleridge's "Ancient Mariner", Whitman,
     Dickinson, Frost, Keats, Tennyson, Stevenson and William Carlos Williams, and a new "Drama and
     scripts" topic. A Grade 7 learner is placed in it (#129). Grade 8 English (`eng-8`) is
     built: 7 units (fiction, poetry, Shakespeare's *A Midsummer Night's Dream*, non-fiction,
     media, grammar and punctuation, writing), 23 lessons and 46 practice skills, with poems by
     Shelley, Dickinson, Langston Hughes, Frost and Blake and O. Henry's "The Gift of the Magi";
     the play's unit is filed under the Shakespeare topic, which now starts at Grade 8. A Grade 8
     learner is placed in it (#130). Grade 9 English (`eng-9`) is built: 7 units (fiction,
     poetry, Shakespeare's *The Tempest*, non-fiction and rhetoric, media, grammar and
     punctuation, writing), 23 lessons and 46 practice skills, with Shakespeare's Sonnet 116,
     Rossetti's "Remember", Dunbar's "We Wear the Mask", Owen's "Dulce et Decorum Est", Poe's
     "The Raven", Lincoln's Gettysburg Address and Douglass's 1852 Fourth of July speech. A Grade 9
     learner is placed in it, with Grade 8 offered, and Grade 10 English now offers Grade 9 first.
     English now runs from Grade 5 to Grade 12. Videos (11 November 2026, PR #147): all 122
     lessons of Grades 5 to 9 have an explainer video, rendered and in Drive (`Gradileo
     videos/English 5` to `English 9`), not made for kids; they go on YouTube with the scheduled
     uploads.
   - Built (4 November 2026), step 3, the second map: **UK GCSE Mathematics, Foundation and
     Higher** (`engine/curriculum/maps/uk.ts`), each built from Gradileo's lessons in the order of a
     Year 10 and 11 scheme of work, with the GCSE content references (N, A, R, G, P, S) in each
     unit. A UK learner in Year 10 or 11 is offered Higher on "Find your course", or Foundation if
     they want extra support, with a placement check on Math 9 or Math 8 first; teachers can start
     a class on either from the new "UK GCSE" tab. Gaps it lists: error intervals and bounds,
     recurring decimals, the nth term of a quadratic sequence, iteration, gradients and areas
     under graphs, trigonometric graphs in degrees, direct and inverse proportion, density and
     pressure, bearings, loci, arcs and sectors in degrees, 3D trigonometry, histograms and
     cumulative frequency, and frequency trees. (Gradileo's own versions of these use radians or
     calculus, which GCSE does not.) Filled on 10 November 2026 (step 4, part 3).
   - Bug check (30 October 2026, the owner's request after the homework-editing error): every one
     of the live site's database calls (99 in the data layer, 41 database functions, 7 Edge
     Functions) was checked against the database's grants, rules and checks on a copy built from
     the migrations, and the live logs were read. No call is refused today. Fixed what could break
     with real use: a written exam of several drawn answers could pass the 400 KB limit on a
     submission and not save (now 10 MB, above the app's own maximum), and a long whiteboard (3 MB,
     now 10 MB) and a full live answer (8,000 bytes, now 32,000) likewise; the self-paced course id
     check accepts any id of the app's form; long lists (mastery, practice events, submissions, and
     the AI analyst's) are read a page at a time, since the live API returns at most 1,000 rows a
     request; loads refused while a lapsed sign-in renews (seen once in the logs, after a laptop
     woke) are retried a few times; and the teacher's resource fields stop at the database's
     lengths.
6. **AI question builder for quizzes, exams and assignments.** In the assignment builder the
   teacher chooses the kind of work (quiz, exam, homework, exercise, activity, classwork and so
   on), the question formats and every other setting, then presses one button (name to settle;
   for example "Draft with AI") and the AI drafts the questions from the course curriculum and
   the class.
   - Question formats: single choice, multiple choice (several answers), short answers graded by
     the engine (numbers, expressions, equations, points), open-ended written answers, and
     "solve it on the canvas" questions where students work on a whiteboard and show their steps
     (this needs a new canvas answer type built on the whiteboard's ink, graded by the teacher
     with an AI-suggested mark).
   - Settings: the units, lessons or outcomes to cover, number of questions, difficulty mix,
     marks, time limit, attempts, dates, feedback and every other option the builder already has.
   - "Based on the class": weight the questions towards the skills the class has not yet
     mastered, using the mastery data.
   - Auto-graded questions come from the engine's generators (fresh numbers for each student);
     the AI writes the questions the generators cannot (open-ended, canvas) with answer keys and
     marking guides. The teacher who asked for them previews everything, regenerates or edits
     single questions, and publishes; nothing reaches students without that teacher's approval
     (no administrator review in between).
   - **Built (21 October 2026, the owner: "it is urgent and I need to use them to create homework
     for my own students"): "Draft with AI"** in the assignment builder for practice, classwork,
     homework, quizzes and exams. The teacher chooses the lessons, the number of questions, the
     difficulty (easier, easy to hard, harder), the kinds of question (generated; multiple choice,
     short answer and written response written by the AI), whether to focus on what the class finds
     hard, and any notes, and can replace or add to the questions already there. MiniMax picks
     skills for the generated questions and writes the others with answers and worked solutions or
     marking guides (`engine/ai/builder.ts`, the `draft` action of the `ai-agent` function, 30
     drafts per teacher per hour). Checks before the teacher sees it: skills must be from the
     chosen lessons, choices complete with one correct, a numeric answer must equal an arithmetic
     check the model gives, the total is exactly what was asked for; a question that fails is left
     out and the teacher is told. Questions the AI wrote are marked "Written by AI: check the
     answer" until the teacher marks them checked. Only lessons, skills and the class's average
     mastery reach MiniMax, never names. Without MiniMax the draft uses generated questions only.
   - Fixed (23 October 2026, the owner found a question keyed as $\sin\theta$ that asked for
     $\tan\theta$, so a right answer was marked wrong): a second, independent solution. After the
     draft (and after a regenerated question), MiniMax solves every number and choice question it
     wrote again from the beginning, without the answer it gave; a question whose two answers
     disagree is left out and the draft is topped up. When the second solution cannot be made,
     the questions stay and the teacher is told to check their answers. And **Change the mark** in
     a submission: a teacher can give their own mark on any auto-graded question (a wrong key, or a
     right answer written another way); it replaces the automatic mark in the score, the student
     sees that the teacher changed it, and "Use the automatic mark" puts it back.
   - Fixed (23 October 2026, the owner could not find questions 1 to 5 when editing a
     30-question assignment): the builder now labels its two kinds of question by number.
     "Generated questions · Questions 1–5" are the skill questions, which give each student
     fresh numbers, so they are changed by count and difficulty and seen with Preview. "Your own
     questions · Questions 6–30" can be edited one by one. Also fixed: the "…" menu on an
     assignment row now opens over the page instead of under the cards below it.
   - Fixed (28 October 2026, the owner could not edit a quiz or homework once it was saved, nor a
     duplicate of one: "permission denied"): every save of an existing assignment also sent its
     class, which teachers may not change (the database grants no update on `class_id`), so
     Postgres refused the whole edit. Edits now leave the class out (`assignmentChanges`), and a
     test checks the columns each save writes against the migrations' grants.
   - Built: "solve it on the canvas" answers. Every written response (the AI's and the
     teacher's) opens on a canvas built on the whiteboard's ink, with a Type tab beside it; the
     working is kept in the response as compact text (`engine/ink.ts`, up to four pages), checked
     again by `grade-submission`, and shown page by page when the teacher grades and when the
     student reviews.
   - Built (23 October 2026): **Regenerate** on any question the AI or the teacher wrote (not
     "select all"): the AI writes a new question in the same format on the same skill, with the
     teacher's note on what should change, checked like a drafted one and marked for checking.
     **Suggest a mark** when grading a written response: MiniMax reads the question, its marking
     guide, the typed answer and pictures of the canvas pages (the owner, 23 October 2026: the
     working may be sent, with no name), and suggests a mark with its reasons, its confidence and
     a comment for the student; **Use this mark** fills them in and nothing is saved until the
     teacher saves the grade. If MiniMax cannot read the pictures, the suggestion comes from the
     typed answer and says so. **Suggest settings** works out the working time (from the class's
     own pace on each skill when there is enough of a record) and suggests a time limit for a
     quiz or exam with half as long again to spare, and the attempts, feedback and hints that suit
     the kind of work; it opens by itself after a draft. Regenerating counts with the drafts' 30
     an hour; suggested marks have their own limit (150 an hour).
7. **AI report cards** (the owner's idea, 15 October 2026). For each student, from their mastery
   and work: how they are doing, strengths, next steps, tips for the student and for parents, and
   feedback. The teacher who asks for it reviews and edits it before it reaches the student or a
   parent (not an administrator: the review is the teacher's), and shares it on request as a PDF
   or a private link.
   - Built (23 October 2026): **Report cards** in the class menu. The AI (MiniMax, or an offline
     writer from the same data) drafts a card per student, or for every student at once for a
     period: how they are doing, strengths, next steps, tips for the student and for parents, and
     the teacher's comment, with numbers taken from the data (course progress, skills secure,
     average score, work handed in). No name reaches MiniMax: the text uses {name}, filled in when
     the card is shown. The teacher edits it beside a live preview and shares it: the student
     sees it on their Progress page and is notified. A shared card can have a private link for a
     parent (a 64-character random token; it shows that card only, with the student's first
     name, and ends when the teacher turns it off or unshares the card), and prints on its own as
     a PDF. Database: `report_cards` with row-level security, `share_report_card`,
     `report_card_link` and `shared_report_card` (the only function open without signing in);
     120 cards per teacher an hour.
8. **Class forum** (the owner's idea, 15 October 2026). Students post questions for their class
   and choose who sees each one: private to the teacher, the whole class, or the whole class
   without their name shown to classmates (the owner agreed, 17 October 2026). The teacher can
   always see and moderate every post (the students are children), with notifications for new
   posts and replies.
   - Built (23 October 2026): **Forum** in the class menu and in the student's menu (a fifth tab on
     phones). A student asks with a title and details (maths in dollar signs) and chooses my class,
     my class without my name, or only my teacher; anyone who can see a question replies. The
     teacher sees every post with its author, is notified of new questions and students' replies,
     and pins, marks answered (the author can too), hides or removes posts; a question's author is
     notified of replies. Posts are read only through `class_forum()`, so a classmate never gets
     the author of a question posted without a name (nor that author's replies under it); students
     see classmates as "Amara O.". Ten posts per student in ten minutes. A self-paced course has
     no forum (no teacher to moderate it).
9. **Other subjects**, once mathematics is complete.
   - Decision (the owner, 23 October 2026): **Chemistry and English** come first. Chemistry's
     calculations (moles, concentrations, gas laws, stoichiometry) can reuse the maths engine's
     generators and answer checking; English is mostly reading and written responses, graded by
     the teacher with AI-suggested marks. A plan of courses, levels and units comes to the owner
     before building.
   - The plan (23 October 2026): `docs/PLAN-CHEMISTRY-ENGLISH.md`: Chemistry 20 and 30, English
     10, 20 and 30, and what each needs beyond mathematics. Decisions (the owner, 23 October
     2026): Chemistry 20 and 30 first (Science 9 and 10 later), English as English 10, 20 and 30,
     and chemistry before English. Step 1, chemistry typesetting (`\ce{…}`) and the course's
     subject in the AI's instructions, is built (PR #77), and so is the chemistry engine: elements,
     formulas, balancing, ions and names, and answers that are a formula or an equation's
     coefficients (PR #78).
   - Chemistry 20 was written a unit at a time as a draft course: Unit 1, The Diversity of Matter
     and Chemical Bonding (8 lessons, 18 skills, PR #79), Unit 2, Forms of Matter: Gases (7
     lessons, 12 skills, PR #80), Unit 3, Matter as Solutions, Acids and Bases (8 lessons, 15
     skills, PR #84), and Unit 4, Quantitative Relationships in Chemical Changes (8 lessons, 16
     skills: balancing and reaction types, net ionic equations, the mole, gravimetric, gas and
     solution stoichiometry, limiting reagents, percent yield, titration and titration curves,
     PR #87).
   - Built: the choice of subject. Students choose Mathematics or Chemistry on "Find your course"
     (chemistry asks only for the grade and recommends Chemistry 20), new classes pick a course
     from a tab for each subject, and the landing page and page title name both subjects.
     Chemistry 20 is no longer a draft, so teachers and students can start it.
   - Decision (the owner, 23 October 2026): Gradileo is open to learners everywhere and is not
     tied to Alberta. Chemistry runs **Grade 10 → 11 → 12**, so a new **Grade 10 Chemistry** comes
     first (plan in `docs/PLAN-CHEMISTRY-ENGLISH.md`), and every course is named by its grade and
     stream instead of an Alberta code: Math 10, Math 10 Workplace and Math 10 Essentials; Math 11
     Pre-calculus, Foundations, Workplace and Essentials; Math 12 Pre-calculus, Foundations,
     Workplace and Calculus; Grade 11 Chemistry. The YouTube text names the course the same way,
     and old playlists are renamed the first time a video goes into them. Drive folders keep their
     first names (Math 10C, …) so the uploads still find them.
   - Decision (the owner, 23 October 2026): the owner's "Chemistry Basics" slides (Avanti
     Fellows' Class 11 chemistry slides, following India's NCERT Class 11 book; © Avanti Fellows,
     no open licence) are a reference only. Nothing from them is copied or published.
   - Built (23 October 2026): **Grade 10 Chemistry** (`chem-10`), five units, 23 lessons and 46
     skills: matter and the particle model (states, mixtures, separating, physical and chemical
     change, density, hazard pictograms and lab safety), atoms and the periodic table (particles,
     isotopes and relative atomic mass, 2,8,8 shells, groups and families), bonding, names and
     formulas (ions, ionic and molecular names, shared pairs, bonding and properties), chemical
     reactions (word equations, conservation of mass, balancing, types, energy diagrams, rates) and
     moles, acids and bases (molar mass, Avogadro's number, mole ratios, pH, indicators,
     neutralization). Sign-up recommends it to students in Grades 9 and 10, and Grade 11 Chemistry
     now offers a placement check on its skills.
   - Built (24 October 2026): the AI tutor reads chemistry aloud. `\ce{…}` formulas are said as a
     teacher says them ("H 2 S O 4", "S O 4, 2 minus", "chlorine-35", "Z N, solid, plus 2 H C L,
     aqueous, gives …"; `engine/chem/speech.ts`), and the tutor-voice recording now covers the
     chemistry courses too.
   - Done (28 October 2026): the explainer videos for Grades 10 and 11 Chemistry, 89 and 122 (PRs
     #96 and the one after it). New figures in `src/video/chem.ts`: Bohr diagrams, Lewis structures
     (bonds, lone pairs, ion brackets), particle boxes for states and mixtures, energy diagrams and
     the main-group periodic table. Every video is rendered and in Drive. The pronunciation checks
     found the voice saying the metal lead as "leed", Amedeo (Avogadro) as "Aym-dee-oh", "deca" and
     "decahydrate" as "dih-KA", "heptaoxide", "pipetted", "electronegativity" (without its "neg")
     and Svante Arrhenius wrongly; each is respelled for the voice in `speechText`, and the videos
     with them were made again. Grade 10 is cleared from the session (`free-disk.sh` now handles
     chemistry courses). They go on YouTube after the maths.
   - Built (28 October 2026): **Grade 12 Chemistry** (`chem-30`), four units, 30 lessons and 57
     skills: thermochemical changes (calorimetry, molar enthalpy, enthalpy diagrams, Hess's law,
     enthalpies of formation, activation energy and catalysts), electrochemical changes (oxidation
     numbers, predicting and balancing redox reactions, redox titrations, voltaic and electrolytic
     cells, cell potentials, Faraday's law), organic compounds (drawing and naming hydrocarbons,
     isomers, functional groups, addition, substitution and elimination, esters, polymers, fuels)
     and equilibrium with acid–base systems (Kc and ICE tables, Le Châtelier, Brønsted–Lowry, Ka
     and Kb, weak-acid pH, buffers, titration curves). New in the chemistry engine:
     `engine/chem/redox.ts` (oxidation numbers, half-reaction balancing, a table of reduction
     potentials) and `engine/chem/organic.ts` (one model of a carbon skeleton gives its IUPAC name
     and formulas, so names and structures always agree). Grade 12 students are now recommended it,
     with a check on Grade 11 skills first.
   - Done (29 October 2026): the Grade 12 Chemistry explainer videos, all 116, rendered and in Drive
     (checked: Drive holds every file of all 116). Eight writers scripted them half a unit each;
     new figures include voltaic and electrolytic cells, line and structural formulas of organic
     molecules, potential energy diagrams with a catalysed path, redox tables and titration curves.
     The pronunciation checks found Le Chatelier said "luh CHATE-lee-er", and ethene, propene,
     propyne, ketone, cycloalkane and methoxymethane said wrongly; each is respelled for the voice
     in `speechText`, and the 15 videos with them were made again. Writing them also found a
     mistake in lesson 2.4 (multiplying only the electrons breaks the charge, not the atoms) and a
     bug in `engine/chem/organic.ts` (tetrachloromethane written CHCl4), both fixed. Grades 10 to 12
     Chemistry now have 327 videos; they go on YouTube after the maths.
   - Built (29 October 2026): **Grade 10 English** (`eng-10`), 7 units, 31 lessons and 72 skills,
     open to classes and sign-up: short stories (O. Henry, Chopin, Poe, Saki, Jacobs, London,
     Bierce, Stockton), poetry, Shakespeare's *Romeo and Juliet*, non-fiction and persuasion
     (Lincoln, Douglass, Sojourner Truth, Pankhurst, Swift), visual and media texts, writing (the
     personal response, the analytical and persuasive essay, narrative, revising, timed writing) and
     grammar and language. Public-domain texts only, every excerpt checked word for word against
     its source. The grammar and short stories units came first to settle the format, as planned.
     Questions are marked automatically (choices, ordering, short typed answers, which now treat
     curly and straight quotes alike); essays stay with the teacher and the AI's suggested mark.
     "Find your course" offers English and recommends Grade 10 English at any grade for now.
   - Built (29 October 2026): **Grade 11 English** (`eng-20`), 7 units, 31 lessons and 58 skills,
     open to classes and sign-up: fiction, poetry, *Macbeth*, the essay and rhetoric, news and
     media, writing and language, with harder public-domain texts, every excerpt checked against
     its source. Placement now goes by grade (Grade 10 or 11 English, with a check on Grade 10
     skills first); Grade 12 students take Grade 11 English until Grade 12 English is written.
   - Fixed (29 October 2026): in many reading and writing questions of both English courses the
     right answer was usually the longest choice, which a test-wise student could exploit. Every
     wrong answer was rewritten as fully as the right one, and `answer-length.test.ts` now fails
     any English skill where the keyed answer stands out by length.
   - Built (29 October 2026): **Grade 12 English** (`eng-30`), 7 units, 31 lessons and 49 skills,
     open to classes and sign-up: fiction through critical lenses, poetry, *Hamlet*, rhetoric and
     argument, media and culture, writing and language. English now runs Grades 10 to 12, and
     placement goes by grade with a check on the course before. The roadmap's English item is done.
   - Done (30 October 2026): **English explainer videos**, one per lesson, 93 in all. Every
     script is written (`src/content/eng10|eng20|eng30/videos/`), each checked against its lesson:
     every quotation word for word, its layout on stills, and the voice on each name and term
     (Tybalt, Laertes, Dunsinane, Désirée, hamartia, synecdoche, pararhyme and others are respelled
     in `src/video/words.ts`). The video stage has a new `quote` element for passages of prose and
     verse. All three grades (31 videos each) are rendered, checked by ear (Whisper) and in Drive.
   - Done (30 October 2026): **the English tutor voice**. The Tutor voice workflow now records the
     English courses too; the tutor reads verse with a pause at each line, and its prompts name the
     course's subject (an English or chemistry tutor, not a mathematics one), so "Ask your tutor"
     answers questions about poems and essays instead of steering back to mathematics.
   - Done (10 November 2026): **essay rubrics.** A written question can carry a rubric: one of five
     ready-made English rubrics (analytical essay, persuasive essay, narrative, personal response,
     short written response) or the teacher's own, with up to eight criteria such as thesis,
     evidence, organization, style and conventions. Each criterion is marked at one of four levels
     (4 Excellent, 3 Proficient, 2 Developing, 1 Beginning, or 0 when it is not shown), a criterion
     can count twice or three times, and the total is scaled to the question's points. Students see
     the rubric while they write and, once marked, the level on each criterion with what it means.
     The teacher marks on a grid (or gives one mark instead), the server works out the score from
     the levels (`engine/rubric.ts`, `markResponse`), and "Suggest a mark" gives a level and a
     reason for each criterion. Draft with AI attaches the fitting rubric to English essays and
     paragraphs it writes.
   - Done (4 November 2026): **the privacy policy and terms for all three subjects.** Both pages now
     describe Gradileo as a mastery-based platform for learners anywhere (mathematics Grades 5 to 12,
     chemistry and English Grades 10 to 12). The privacy policy adds name-only class-link accounts,
     written answers and essays, one overview of the AI features across subjects, the AI usage
     records kept for rate limits, learners who sign up on their own, and the YouTube Data API
     connection to Gradileo's own channel. The terms add the AI tutor and the teacher's AI tools
     (the teacher decides every mark and report card), fair use of the AI, public-domain English
     texts, and that Gradileo is independent of any education authority or exam board. The owner
     may still want a lawyer to review the wording and add a governing-law clause.
   - Done (24 October 2026): the practice questions and lessons of all 16 mathematics courses are no
     longer set in Alberta (about 1,000 mentions: towns, lakes, parks, teams, Alberta's GST). Town
     lists and real distance, daylight and temperature data now belong to invented towns (Riverton,
     Lakeside, …), single settings are neutral, and sales tax is explained for any country with every
     rate stated in the question. Canada-wide contexts (Canadian dollars, CPP and EI with their rates,
     provincial parks) stay for now. The rendered videos keep their old settings and course names;
     new and re-rendered videos use the new ones.
   - Decision (the owner, 14 November 2026): **high school Physics, Grades 10 to 12**, is the next
     subject, and its videos (and chemistry's from now on) must show the idea happening: forces as
     arrows acting on objects, objects speeding up and slowing down, carts colliding and passing
     momentum on. No narration over still slides.
     - Done (14 November 2026): the video engine can show motion. A `motion` element moves blocks
       and carts by the forces drawn on them, with velocity arrows, strobe marks, a clock, a
       velocity-time graph that draws itself, slow motion and live momentum bars
       (`src/video/motion.ts`, `video/README.md`). Two sample videos for the owner to judge the
       style: `phys-sample-forces` (what a force does, Newton's second law, friction and net
       force; since moved to `p10-2-3`) and `phys-sample-momentum` (momentum, two collisions,
       conservation; retired on 18 November 2026, when the videos of Grade 12 Unit 1 took its
       place), in `src/content/physics/videos/`. They were samples: not lessons of a course, and
       never on YouTube.
     - Decision (the owner, 14 November 2026): the style of the two samples is approved ("this
       works"). The engine and samples are merged (pull request #185).
     - Plan: `docs/PLAN-PHYSICS.md`, sent to the owner on 14 November 2026: Grade 10, 11 and 12
       Physics (`phys-10`, `phys-20`, `phys-30`), 27 + 30 + 30 lessons, with the animation each
       unit needs.
     - Decision (the owner, 14 November 2026): the plan is approved, with no changes.
     - Built (14 November 2026): **Grade 10 Physics** (`phys-10`, `engine/curriculum/phys10/`,
       lesson ids `p10-…`): 5 units, 27 lessons and 54 skills. Unit 1 Describing Motion (pull
       request #188), Units 2 and 3 Forces and Newton's Laws, and Work, Energy and Power (#189),
       Units 4 and 5 Waves, Sound and Light, and Electricity (#190). Every constant, rate and
       price is stated in its question. **Physics is a subject in the app**: a Physics tab for
       new classes, a Physics choice on "Find your course" (every grade is recommended Grade 10
       Physics, the first course, with no placement check), and seven physics topics on "Browse
       by topic".
     - Done (14 November 2026): **the five videos of Unit 1, Describing Motion** (`p10-1-1` to
       `p10-1-5`), rendered and in Drive. The engine gained what they needed: the distance
       travelled drawn leg by leg, a displacement arrow, a distance-time graph, and "speed ="
       for videos that come before velocity is taught. `phys-10` is in the uploader's
       `MADE_FOR_KIDS` list; the YouTube upload task still has to be given the course.
     - Done (14 November 2026): **the seven videos of Unit 2, Forces and
       Newton's Laws** (`p10-2-1` to `p10-2-6`, with lesson 2.5 in two parts), rendered and in
       Drive. The sample
       `phys-sample-forces` is now the video of lesson 2.3 (`p10-2-3`). The engine gained a drop
       (`vertical`) and air resistance (`drag`), so a skydiver reaches terminal velocity, a
       parachute opens, and a hammer and a feather fall on Earth and on the Moon.
     - Done (14 November 2026): **the six videos of Unit 3, Work, Energy
       and Power** (`p10-3-1` to `p10-3-6`), rendered and in Drive. The engine gained energy bars measured from the
       motion (work, kinetic, potential, heat and the total), a lift (`vertical: 'up'`) and
       curved tracks (`path`: a hill through points, a ramp or a pendulum), so a roller coaster
       trades height for speed, a car on a rough track ends with all its energy as heat, two
       motors do the same work in different times, and a motor's efficiency is read off its bars.
     - Scripts done (14 November 2026): **Unit 4, Waves, Sound and Light** (`p10-4-1` to
       `p10-4-5`). The engine has a `wave` element (a rope and a tube of particles, drawn from one
       rule: each place does what the source did a little earlier) and a `rays` element (a ray at
       a mirror or a boundary, with the normal, the angles and marching wavefronts).
     - Scripts done (14 November 2026): **Unit 5, Electricity** (`p10-5-1` to `p10-5-5`). The
       engine has a `circuit` element: a battery, a switch, lamps and resistors in series or in
       parallel, solved from the supply voltage and the resistances, with charges that move with
       the current and split at a junction, lamps that glow with their power, ammeters,
       voltmeters, and counters of charge and energy.
     - A fault found and fixed (14 November 2026): videos rendered in a second working copy whose
       `node_modules` is a link were drawn in the browser's own fonts, because the page server
       refused the font files. That was Units 2 and 3 (in Drive, none on YouTube) and the first
       render of Unit 4. `video/build.ts` now serves the linked folder and fails when the stage
       cannot load a file. In progress: Units 2, 3 and 4 are being rendered again and replaced in
       Drive.
     - Started (14 November 2026): **Grade 11 Physics** (`phys-20`, `engine/curriculum/phys20/`,
       `src/content/phys20/`), a draft course until its four units are written. Unit 1,
       Kinematics, is done: eight lessons (`p20-1-1` to `p20-1-8`) and 16 skills, with
       $g = 9.81\ \text{m/s}^2$ stated in every question that needs it. Unit 2, Dynamics, is
       done too: eight lessons (`p20-2-1` to `p20-2-8`) and 16 skills on free-body diagrams,
       Newton's laws, friction, inclined planes, connected objects, forces in two dimensions,
       universal gravitation and field strength; $G$ and the masses and radii of planets are
       stated in each question, and answers in scientific notation are accepted as typed
       (`6.53e3`). Unit 3, Circular Motion, Work and Energy, is done as well: seven lessons
       (`p20-3-1` to `p20-3-7`) and 14 skills on uniform circular motion, centripetal force,
       orbits and Kepler's third law, work and force-displacement graphs, kinetic, gravitational
       and elastic energy, the conservation of mechanical energy, power and efficiency. Unit 4,
       Oscillations and Waves, completes the course (15 November 2026): seven lessons
       (`p20-4-1` to `p20-4-7`) and 14 skills on simple harmonic motion and its restoring force,
       the period and energy of a mass on a spring, the pendulum and measuring $g$ with it, wave
       properties and the universal wave equation, reflection and echoes, superposition and
       interference, standing waves on a string, resonance in an air column, and the Doppler
       effect; the speed of sound is stated in each question that needs it. The course has 30
       lessons and 60 skills. It is **listed** (15 November 2026): it has its place in the
       course lists, sign-up recommends it from Grade 11 with a placement check on Grade 10
       Physics (Grade 10 Physics stays the choice to Grade 10 and for anyone new to physics), and
       its lessons are filed under the physics topics, with three new ones (vectors and
       projectiles, gravitation and circular motion, oscillations). The placement note now gives
       the true number of questions in a check. Next for it: its videos.
     - Done (15 November 2026): Units 2, 3 and 4 of Grade 10 Physics were rendered again with the
       right fonts and replaced in Google Drive.
     - Done (15 November 2026): **the five videos of Unit 5, Electricity** (`p10-5-1` to
       `p10-5-5`), rendered and in Drive. Grade 10 Physics now has a video for every lesson: 28
       videos in five units.
     - Grade 11 videos, Unit 1 (15 November 2026): ten videos scripted for the eight Kinematics
       lessons (relative velocity and projectile motion have two parts each). A new `flight`
       element (`src/video/flight.ts`) draws motion in two dimensions to scale: a projectile with
       its horizontal and vertical velocity arrows changing on their own, a boat carried by a
       current with the velocity triangle drawn head to tail, and displacements on a map with
       their east and north parts. The graph of a `motion` element can now plot position and go
       below zero, for a cart that turns round.
     - Done (16 November 2026): the ten videos of Unit 1 are rendered and in Drive.
     - Grade 11 videos, Unit 2 (16 November 2026): eight videos scripted for the eight Dynamics
       lessons (`p20-2-1` to `p20-2-8`), with three new elements. `ramp` (`src/video/ramp.ts`)
       puts blocks on a level or tilted surface and works out the weight, the normal force,
       static or kinetic friction, the tensions and the motion from the pushes a script gives: a
       crate that will not move until the push beats static friction, a block on a slope with its
       weight taken apart, blocks tied by strings and a body hanging over a pulley. `forces`
       (`src/video/forces.ts`) adds forces in a plane, for a puck seen from above and a sign hung
       from two cables whose tensions grow as the cables flatten. `gravity`
       (`src/video/gravity.ts`) draws bodies in space with pulls and a field worked out from
       Newton's law, so the force falls to a quarter as a body is carried to twice the distance.
     - Done (16 November 2026): the eight videos of Unit 2 are rendered and in Drive.
     - Grade 11 videos, Unit 3 (16 November 2026): thirteen videos scripted for the seven lessons
       of Circular Motion, Work and Energy (`p20-3-1` to `p20-3-7`; every lesson but the first has
       two parts). A new `circle` element (`src/video/circle.ts`) shows uniform circular motion: a
       ball on a string with its velocity along the tangent and its acceleration towards the
       centre, a car on a bend held by friction, a vertical loop, and a string that breaks.
       `gravity` gained orbits and thrown bodies (a satellite, Newton's cannon, a clock in
       minutes or days). `motion` gained forces that change with distance and the
       force-displacement graph whose area is the work, springs (Hooke's law, elastic energy, a
       launcher, a mass hanging on a spring) and tall hills beside the thumbnail title. `ramp`
       gained bars of the work each force does, for the work-energy theorem.
     - Done (16 November 2026): the thirteen videos of Unit 3 are rendered and in Drive.
     - Done (17 November 2026): **the fourteen videos of Unit 4, Oscillations and Waves**
       (`p20-4-1` to `p20-4-7`, two for each lesson), so Grade 11 Physics has a video for every
       lesson (45 videos). `motion` follows an oscillation about an equilibrium position, counts
       its oscillations and traces its displacement-time graph; `wave` gained single pulses that
       add where they overlap, fixed and free ends, a join between two ropes, and standing waves on
       strings and in air columns; and the new `ripples` element draws waves from above, for the
       interference of two speakers and the Doppler effect of a moving source (each crest is a
       circle around the place it was sent from).
     - Started (18 November 2026): **Grade 12 Physics** (`phys-30`, `engine/curriculum/phys30/`,
       `p30-…`), a draft course until all four units are in, so it is not yet listed for classes
       or sign-up. Unit 1, Momentum and Impulse, has five lessons and ten question types:
       momentum and the change in momentum, impulse and force-time graphs, the conservation of
       momentum in collisions and explosions, kinetic energy in elastic and inelastic collisions
       (with the ballistic pendulum), and collisions and explosions in two dimensions, worked by
       components. No question gives objects more kinetic energy after a collision than before.
     - Built (18 November 2026): Unit 2 of Grade 12 Physics, **Forces and Fields**, ten lessons
       and twenty question types: charge and the three ways of charging, Coulomb's law and the
       net force of several charges, electric fields, potential difference and the electronvolt,
       the field between parallel plates, charges accelerated and deflected between plates,
       Millikan's oil drops, combined series-parallel circuits, emf and internal resistance,
       magnets and the field of a current, the force on a moving charge (with the velocity
       selector and the mass spectrometer), the motor effect and the direct current motor, and
       induction, generators and transformers. Every constant a question needs is stated in the
       question, and directions use one right-hand rule (thumb along the velocity or current,
       fingers along the field, palm along the force).
     - Built (18 November 2026): Unit 3 of Grade 12 Physics, **Electromagnetic Radiation**, eight
       lessons and sixteen question types: electromagnetic waves, the spectrum and the speed of
       light (with radar echoes and Michelson's rotating mirror), reflection and curved mirrors,
       refraction and Snell's law, total internal reflection and dispersion, lenses, Young's
       double slit and diffraction gratings, photons and the photoelectric effect, the momentum
       of a photon and the Compton effect, and de Broglie waves and wave-particle duality. The
       mirror and lens questions share one sign convention (negative image distance for a
       virtual image, negative focal length for a diverging mirror or lens), and every constant
       is stated in the question.
     - Built (18 November 2026): Unit 4 of Grade 12 Physics, **Atomic and Nuclear Physics**, seven
       lessons and fourteen question types: cathode rays and Thomson's charge-to-mass ratio,
       Rutherford's gold foil experiment and the distance of closest approach, the Bohr model
       with the energy levels and line spectra of hydrogen, the nucleus, isotopes and the strong
       force, alpha, beta and gamma decay with their equations and properties, half-life,
       activity and carbon dating, and mass defect, binding energy, fission and fusion. Every
       constant, half-life and nuclear mass is stated in the question. All four units, thirty
       lessons and sixty question types of Grade 12 Physics are now written.
     - Done (18 November 2026): **Grade 12 Physics is listed** for classes and sign-up. The
       draft flag is gone, a Grade 12 learner who picks Physics is recommended it with a check
       on four Grade 11 Physics skills (one from each unit), its thirty lessons are filed under
       topics (a new group, Fields, atoms and nuclei, and new topics for momentum, mirrors and
       lenses, and diffraction and interference), and two end-to-end tests cover a Grade 12
       class and a Grade 12 sign-up.
     - Done (18 November 2026): **the nine videos of Grade 12 Unit 1, Momentum and Impulse**
       (`p30-1-1` to `p30-1-5-b`), rendered and in Drive: momentum, impulse, force-time graphs,
       the conservation of momentum, recoil and explosions, kinetic energy in collisions (with
       the ballistic pendulum), elastic collisions, momentum at right angles, and glancing
       collisions and explosions. The sample `phys-sample-momentum` is retired: its collisions
       are in `p30-1-3`. `motion` gained a force-time graph whose area is the impulse, bars for
       a system's kinetic energy and what a collision loses, three collisions side by side, and
       a pendulum's rise in centimetres. `flight` gained a view from above for momentum in two
       dimensions: cars and pucks with a mass that collide as discs (pushed along the line
       through their centres, so a glancing blow turns both aside, and with `stick` they lock
       together), explosions given as impulses that must add up to zero, bars for the east and
       north momentum of each body and of the total, and the total momentum drawn as a triangle
       at the centre of mass. Nothing after a collision is typed in.
     - Started (18 November 2026): **the videos of Grade 12 Unit 2, Forces and Fields**. A new
       picture, `charges` (`src/video/charges.ts`), shows charge as electrons that move: a rod, a
       cloth, a metal sphere on a stand and an atom carry + marks that stay put and electron dots
       that cross from one body to another, down a ground wire, or to the far side of a metal
       sphere when a charged rod comes near, and the charge written by each body is counted from
       its electrons. Point charges get the forces of Coulomb's law, their vector sum and its
       angle, and can fly apart or together. The first four videos are rendered and in Drive: `p30-2-1`
       (Electric Charge), `p30-2-1-b` (Charging Objects: friction, contact and induction),
       `p30-2-2` (Coulomb's Law) and `p30-2-2-b` (The Net Electric Force).
     - Done (18 November 2026): **the videos of lessons 2.3 to 2.5**, six more. The `charges`
       picture now draws the electric field: field lines followed step by step along the field of
       the charges in the picture, the field at a test charge and the vector sum of two fields,
       a uniform field, and two parallel plates with the field ΔV ÷ d between them, the potential
       of each plate, lines of equal potential, and bars for the potential and kinetic energy of
       a charge that moves in the gap. Charges fly under qE (and their weight), so an electron
       leaves an electron gun at the speed energy gives, an electron that enters across the field
       follows a parabola, and Millikan's oil drop falls, rises or hangs as the voltage is turned.
       The videos: `p30-2-3` (Electric Field Strength), `p30-2-3-b` (Field Lines and Adding
       Fields), `p30-2-4` (Potential Difference), `p30-2-4-b` (The Field Between Parallel Plates),
       `p30-2-5` (Charges Moving in a Uniform Field) and `p30-2-5-b` (Millikan's Oil Drops).
     - Done (18 November 2026): **the videos of lessons 2.6 and 2.7**, four more. The `circuit`
       picture can put one component in series with a set of parallel branches (`lead`), and can
       give its battery an internal resistance (`internal`), with a voltmeter across the
       terminals and the lost volts shown, so `p30-2-6` (Combined Circuits) and `p30-2-6-b` (Emf
       and Internal Resistance) work every reading out from the circuit. A new picture,
       `magnets` (`src/video/magnets.ts`), works out the magnetic field of bar magnets and of
       long straight wires seen end-on, and draws it with field lines, compasses whose needles
       turn as they are carried about, and arrows with the field strength; a piece of iron shows
       its domains lining up, and rows of wires make the field of a solenoid. The field-line
       tracer is shared with `charges` (`src/video/fieldlines.ts`). The videos: `p30-2-7`
       (Magnets and Magnetic Fields) and `p30-2-7-b` (The Magnetic Field of a Current).
     - Done (18 November 2026): **the videos of lesson 2.8**, two more. The `charges` picture
       can have a magnetic field through it (`magnetic`, into or out of the page, over the whole
       view or a region), and a moving charge is turned by qvB step by step, so it follows a
       circle at a constant speed, two charges of opposite sign curve opposite ways, an ion goes
       straight through crossed fields only at the speed E ÷ B, and two isotopes land at
       different places on the detector of a mass spectrometer. The videos: `p30-2-8` (The Force
       on a Moving Charge) and `p30-2-8-b` (Charges Moving in Circles).
     - Done (18 November 2026): **the videos of lesson 2.9**, two more. The `magnets` picture
       can draw the poles of the magnet that makes a uniform field (`yoke`), and a wire with a
       mass moves under F = BIL, so a wire is thrown out of the gap, floats on its supports when
       BIL = mg, and a magnet on a balance reads more when the field pushes a fixed wire up. The
       coil of a motor (`coil`) is turned about its axle by the forces on its two sides: with
       fixed wires it rocks and stops upright, and with a split-ring commutator it keeps
       turning. The videos: `p30-2-9` (The Force on a Wire) and `p30-2-9-b` (The Electric
       Motor).
     - Done (18 November 2026): **the first two videos of lesson 2.10** (induction). In the
       `magnets` picture a bar magnet can be pushed into a coil that is joined to a meter
       (`pickup`): the flux through the turns is worked out from the poles of the magnet, and
       the needle swings with the rate at which it changes. A new picture, `induction`
       (`src/video/induction.ts`), is a circuit in a field through the page: a coil in a field
       that changes steadily (the meter reads N ΔΦ ÷ Δt), or a rod that slides along two rails
       (ε = BLv, I = ε ÷ R, and the force BIL back on the rod, which slows a rod that is let
       go). The videos: `p30-2-10` (Electromagnetic Induction) and `p30-2-10-b` (Moving
       Conductors and Lenz's Law).
     - Done (18 November 2026): **the last two videos of lesson 2.10, so Unit 2 has its 24
       videos.** The coil of the `magnets` picture can be turned from outside (`drive`): the emf
       induced in it draws itself on a graph beside it as it turns (`trace`), slip rings give an
       alternating output and a split ring a direct one, and with a lamp across the brushes the
       forces on its sides oppose the turning. Two new pictures (`src/video/transformer.ts`): a
       `transformer` is two coils on an iron core with a screen for each voltage (the turns rule,
       VpIp = VsIs, and a battery that gives only a kick as its switch is closed or opened), and
       a `powerline` is a power station joined to a town, where stepping the voltage up ten
       times cuts the power wasted in the line a hundred times. The videos: `p30-2-10-c` (The
       Generator) and `p30-2-10-d` (Transformers).
     - Started (20 November 2026): **the videos of Grade 12 Unit 3, Electromagnetic Radiation**,
       with the two of lesson 3.1. A new picture, `light` (`src/video/light.ts`), shows light as
       an electromagnetic wave in four ways: the wave an electron sends out when it is driven up
       and down an aerial, with its electric and magnetic fields in step and at right angles (and
       a polarizing filter that can be turned); the spectrum, with a pointer that slides from
       radio waves to gamma rays; a flash timed over a distance (500 s from the Sun, a radar
       echo there and back); and Michelson's eight-faced mirror, where the returning light
       misses the detector at 300 turns each second and reaches it at 536. The videos:
       `p30-3-1` (Electromagnetic Waves) and `p30-3-1-b` (The Speed of Light).
     - Written (20 November 2026): **the two videos of lesson 3.2** (mirrors). A new picture,
       `optics` (`src/video/optics.ts`), is a curved mirror or a thin lens with an object that
       slides along the principal axis: the three rays of a ray diagram follow it and meet where
       the mirror equation puts the image, real in front of the mirror or virtual behind it
       (found by dashed lines traced back), and at the focus they leave parallel. The videos:
       `p30-3-2` (Images in Mirrors) and `p30-3-2-b` (The Mirror Equation). The same picture
       will serve the lenses of lesson 3.4.
     - Written (20 November 2026): **the two videos of lesson 3.3** (refraction). The `rays`
       picture gained the faint ray a boundary reflects (`partial`), which brightens to total
       internal reflection at the critical angle, and can be drawn with the light coming from
       below (`below`). The `light` picture gained a `prism`, which spreads white light into its
       colours, and a `fibre`, which holds a ray in by total internal reflection until it is
       sent in too steeply. The videos: `p30-3-3` (Refraction and Snell's Law) and `p30-3-3-b`
       (Total Internal Reflection).
     - Written (20 November 2026): **the two videos of lesson 3.4** (lenses), on the `optics`
       picture with a converging or a diverging lens: one object slides in from beyond 2F to
       inside the focus, so a camera becomes a projector and then a magnifying glass. A lens's
       readouts are written in one row along the foot of the picture. The videos: `p30-3-4`
       (Images in Lenses) and `p30-3-4-b` (The Thin Lens Equation).
     - Written (20 November 2026): **the two videos of lesson 3.5** (diffraction and
       interference). The `ripples` picture gains a wall with openings, a screen and light: waves
       spread through a gap that narrows, the light of two slits overlaps into fringes, and a
       point walks up the screen while its two paths, their difference and the two waves that
       arrive are shown. The `light` element gains a `grating`, true to d sin θ = n λ: broad
       bands that sharpen as more slits are lit, two neighbouring slits close up, and white
       light spread into spectra. The videos: `p30-3-5` (Young's Double-Slit Experiment) and
       `p30-3-5-b` (Diffraction Gratings).
     - Written (20 November 2026): **the two videos of lesson 3.6** (photons and the
       photoelectric effect), on a new `photons` picture: light drawn as packets of waves in the
       colour of their wavelength, which cross from a lamp to a detector, or land on a metal and
       free electrons only when hf is more than the work function. In a tube the electrons slow
       on their way to a negative plate and turn back at the stopping voltage, bars set hf
       beside W and the kinetic energy left over, and a dot follows the light along the graph of
       Ek max against f. The videos: `p30-3-6` (Photons) and `p30-3-6-b` (The Photoelectric
       Effect).
     - Written (22 November 2026): **the two videos of lesson 3.7** (the momentum of a photon
       and the Compton effect), on the same `photons` picture. Each photon carries an arrow for
       its momentum, h ÷ λ; two beams alike land on a black card and a mirror on wheels, and the
       mirror, which sends each photon back, gains speed twice as fast; and an X-ray photon
       collides with an electron at rest, leaves at the angle of scattering with its waves
       farther apart, and the electron recoils, with energy and momentum both conserved (the
       three momenta close a triangle). The videos: `p30-3-7` (The Momentum of a Photon) and
       `p30-3-7-b` (The Compton Effect).
     - Written (22 November 2026): **the two videos of lesson 3.8** (matter waves and
       wave-particle duality), on a new `matter` picture. A particle crosses with its de Broglie
       wave drawn to scale, which shortens as the particle speeds up; electrons come off a
       nickel crystal most strongly where d sin θ = λ while a detector swings round and draws
       the peak that Davisson and Germer found; Thomson's rings shrink as the voltage rises; and
       photons go through two slits one at a time, each landing as a single dot, until the dots
       build up the fringes that the wave predicts. The videos: `p30-3-8` (Matter Waves) and
       `p30-3-8-b` (Wave-Particle Duality). This finishes the videos of Unit 3.
     - Written (23 November 2026): **the four videos of lessons 4.1 and 4.2**, which start
       Unit 4, on two new pictures. `cathode` is a cathode ray tube drawn to scale: the rays
       cross it only once the air is pumped out, a metal cross casts a sharp shadow, a paddle
       wheel is pushed along its rails, and the beam bends between charged plates and in a
       magnetic field along a path worked out from the force on each electron, straight when
       v = E ÷ B and a circle of radius v ÷ (B q/m). `alphas` is alpha particles fired at atoms:
       they cross Thomson's atom in straight lines, the gold foil sends a few back to a screen
       that flashes, each path past a gold nucleus is turned by the repulsion k(2e)(Ze) ÷ r², one
       that heads straight in stops at r = k(2e)(Ze) ÷ Ek and is pushed back, and the electron of
       Rutherford's atom radiates and spirals in. The videos: `p30-4-1` (Cathode Rays),
       `p30-4-1-b` (The Charge-to-Mass Ratio), `p30-4-2` (The Gold Foil Experiment) and
       `p30-4-2-b` (The Closest Approach).
     - Written (23 November 2026): **the two videos of lesson 4.3**, on a new picture, `levels`:
       a hydrogen atom with its allowed orbits beside a ladder of its energy levels. A photon
       leaves when the electron drops and arrives when it rises, with the energy and wavelength
       that the two levels give; a photon that matches no jump passes straight through, and one
       with more than 13.6 eV sets the electron free. The same element spreads the light of a
       hot solid, of glowing hydrogen and of a hot solid seen through cool hydrogen into the
       three kinds of spectrum, with the dark lines where the bright ones were, and bends the
       electron's wave round its orbit to show why only some orbits are allowed. The videos:
       `p30-4-3` (The Bohr Model) and `p30-4-3-b` (Spectra).
     - Written (23 November 2026): **the two videos of lesson 4.4**, on a new picture, `nucleus`:
       a nucleus as a ball of protons and neutrons, packed closely and drawn to scale with the
       radius 1.2 fm × ∛A. Carbon-12 is put together a nucleon at a time and grows into
       uranium-238, two neutrons arrive to make carbon-14, two electrons leave an atom of
       copper to make an ion, and a hundred atoms of chlorine balance on a beam at their average
       mass. Two protons are pushed together while Coulomb's law gives their repulsion
       (57.5 N at 2.0 fm), the strong attraction takes over as they touch and is gone by 3 fm,
       and one proton in calcium-40, lead-208 and uranium-238 is held by its neighbours alone
       while every other proton repels it. The videos: `p30-4-4` (Inside the Nucleus) and
       `p30-4-4-b` (The Strong Nuclear Force).
     - Written (23 November 2026): **the two videos of lesson 4.5**. The `nucleus` picture now
       decays: radium-226 throws out an alpha particle, a neutron of carbon-14 turns into a
       proton and sends out an electron and an antineutrino, sodium-22 gives out a positron and
       then a gamma ray, and thorium-232 is followed through five decays to radon-220. A new
       picture, `radiation`, sends alpha particles, beta particles and gamma rays out of a
       source: each leaves its trail of ions, paper, aluminium and lead slide in and stop them
       in turn, charged plates and a magnetic field bend the alpha and beta particles opposite
       ways, and a Geiger tube clicks for the ones that reach it and goes on clicking for the
       background when the source is closed. The videos: `p30-4-5` (Radioactive Decay) and
       `p30-4-5-b` (Alpha, Beta and Gamma).
     - Written (23 November 2026): **the two videos of lesson 4.6**, on a new picture,
       `halflife`: 400 nuclei that decay one by one in no order, beside a graph of the amount
       left that draws itself as the sample's clock runs. Iodine-131 is followed through five
       half-lives, 80 mg of it through 24 days, 200 g of cobalt-60 to a time between two
       half-lives, and a sample that falls to an eighth in 45 hours gives its half-life. The
       same picture shows the activity of technetium-99m, a count rate with the background
       taken off, and the carbon-14 of old wood and of charcoal, which gives their ages. The
       videos: `p30-4-6` (Half-Life) and `p30-4-6-b` (Activity and Carbon Dating).
     - Written (24 November 2026): **the two videos of lesson 4.7**, on a new picture,
       `reaction`, which gives **every lesson of Grade 12 Physics its videos**. Two protons and
       two neutrons come together into helium-4 while gamma rays leave and the mass shown falls
       by 0.0305 u, the same nucleus is pulled apart again, and iron-56 is compared with
       uranium-235 for each nucleon. The graph of the binding energy for each nucleon has a
       marker that slides to its peak near iron and out to both ends. A neutron splits a
       nucleus of uranium-235, drawn with all of its 236 nucleons, into krypton-92, barium-141
       and 3 neutrons; a chain reaction doubles from 1 fission to 8 and is then held steady
       between control rods; and hydrogen-2 and hydrogen-3 are turned back by their repulsion
       when slow and fuse into helium-4 when fast. The videos: `p30-4-7` (Mass Defect and
       Binding Energy) and `p30-4-7-b` (Fission and Fusion).
     - Done (24 November 2026): **all fourteen videos of Unit 4 are rendered**, checked (lengths,
       the pronunciation report, a frame and the thumbnail of each) and in Drive, so Grade 12
       Physics has a video for every lesson (61 videos). The physics lessons have no tutor
       recordings yet.
   - Done (14 November 2026): **the chemistry videos were checked against the same rule**, and none
     of the 417 met it: the engine could not move anything, 155 videos (all of Chemistry 7, 8 and 9
     and More Chemistry Topics) had no picture at all, and the other 262 had still diagrams. None
     was on YouTube yet. Report: https://claude.ai/artifact/QNwFeWE5Fc9StBnvDCXSrb (per-video list in
     the project files, `video-audit/chemistry-videos.csv`).
     - Decision (the owner, 14 November 2026): chemistry stays off YouTube until it is remade; the
       upload task leaves the chemistry courses out until then.
     - Done (14 November 2026): a `particles` element for the video engine (`src/video/particles.ts`,
       `video/README.md`): boxes of simulated particles that vibrate in rows, slide or fly and hit the
       walls according to their temperature, melt and boil when heated, and can be squeezed by a
       piston (which stops on a solid or liquid), with thermometers, a pressure gauge, a volume
       reading, wall-hit flashes and a followed particle's trail. Two remade samples for the owner
       to judge: `c7-2-1` (Solids, Liquids and Gases) and `c20-2-3` (Boyle's law: a syringe squeezed
       from 100 to 400 kPa).
     - Decision (the owner, 14 November 2026): the two samples are approved ("this is great"). The
       element and samples are merged (pull request #187), and both videos replaced in Drive.
     - Done (14 November 2026): Chemistry 7, Unit 2 remade: `c7-2-2` (a box melted, boiled,
       condensed and frozen in turn, with a thermometer marked "melts" and "boils"; water vapour
       condensing on a cold wall), `c7-2-3` (fast and slow air, hot water warming cold water with a
       heat arrow, a hand melting ice, a bar conducting heat from one end) and `c7-2-4` (a solid and
       a gas expanding and contracting, two gases and two liquids mixing when a divider is lifted).
       The element gained dividers, baths (heating or cooling one side), heat colours, a heat-flow
       arrow, thermometer marks and visible expansion. Convection and radiation are still a table.
     - Done (14 November 2026): Chemistry 7, Unit 3 remade: `c7-3-1` (pure water beside salt
       water), `c7-3-2` (a lump of sugar dissolving in water while sand stays whole; a concentrated
       and a dilute solution), `c7-3-3` (a little sugar dissolving completely, a lot leaving a lump
       behind as the water is saturated, and sand) and `c7-3-4` (a stirred lump against a still
       one, hot water against cold). The element gained kinds that attract differently, lumps that
       are held and dropped in, stirring, a dissolved count and a faster speed. Not animated: a
       powder against a lump, and a mixture melting over a range (the simulation does not show
       either clearly), so those stay in words.
     - Done (14 November 2026): Chemistry 7, Unit 4 remade: `c7-4-1` (gravel and sand shaken
       through a sieve, a magnet pulling iron out of sand, sand caught on filter paper while water
       runs through, and salt water running straight through), `c7-4-2` (water evaporating out of
       a dish and the salt crystallizing as it cools; a still boiling salt water and condensing
       pure water on the cold side) and `c7-4-3` (an ink and two dyes run up chromatography paper).
       The element gained particle sizes, filters and sieves, magnets, an open top that particles
       leave by, a low wall, hot and cold zones, and chromatography paper.
     - Done (14 November 2026): Chemistry 8 and 9, the lessons where motion is the idea, remade:
       `c8-1-2` (neon, oxygen and water as particles; hydrogen burning into water), `c8-3-1`
       (boiling beside burning), `c8-3-2` (zinc fizzing in acid; a precipitate forming), `c8-4-1`
       (carbon burning; the fire triangle as three boxes), `c8-4-2` (iron rusting only with water
       and oxygen), `c9-3-1` (atoms counted in a sealed flask; open against sealed), `c9-3-4` (the
       same reaction cold and hot, dilute and concentrated, as a lump and as pieces, without and
       with a catalyst), `c9-4-3` (hydrogen and hydroxide ions joining as water as the mixture
       warms), and with a new `atoms` element, `c9-1-3` (shells filling), `c9-1-4` (sodium and
       chlorine becoming ions) and `c9-2-1` (ionic and covalent bonding). The particle element
       gained molecules, reactions that give out heat, and a running count of products.
     - Done (17 November 2026, pull request #208): the rest of group 1, the lessons where motion is
       the idea, scripted with up-close scenes. The gases unit (`c20-2`), Chemistry 10 and 20
       (among them rates, solutions, precipitates, and a titration with a burette and an
       indicator),
       Chemistry 30 (cells and electrolysis with electrodes that plate and dissolve; organic
       reactions with a new `molecules` element, ball-and-stick molecules whose breaking bonds turn
       red and new bonds green) and the ten More Chemistry Topics videos (metals in acid,
       displacement, electrolysis of solutions, a hydroxide precipitate, the Haber reaction, the
       fuel cell, curly-arrow mechanisms, the nitration of benzene, doubling a concentration, a
       cold and a hot gas with a live chart of their molecules' speeds, and a time-of-flight race).
       Rendering, then Drive.
     - Merged (18 November 2026, pull request #212): group 2 part 1, the lessons about
       structures in Chemistry 7 to 9, and all 31 group 2 videos of Chemistry 10 (inside the atom,
       electron shells, the periodic table, families of elements, lab safety, bonding and
       properties, reaction types, and acids, pH and indicators). New engine: a `push` that shears
       a solid (malleable metals, alloys whose `pin`ned atoms jam the layers), polymer `chain`
       molecules, and a `scatter` element for the gold foil. Electrons fill shell by shell, are
       lost and gained as the narrator speaks.
     - Merged (18 November 2026, pull request #215): group 2 part 2, all 26 Chemistry 20 videos: atoms and ions,
       ionic and polyatomic ions, electronegativity and bond types (a new `pull` slides a shared pair
       towards the more electronegative atom, and δ+ and δ− appear), Lewis structures (methane,
       water, ammonia, double and triple bonds up close), polar molecules (carbon dioxide's pulls
       cancel, water's do not; molecules turning to face a charged rod), shapes of molecules
       (electron groups spreading out, lone pairs), and acids and bases (indicators, hydronium
       ions, ions or molecules, neutralisation).
     - Merged (18 November 2026, pull request #216): group 2 part 3, all 28 Chemistry 30 videos: acids and bases
       (a proton passing from acid to base, with conjugate pairs named), redox (zinc displacing
       copper, magnesium gaining and losing electrons), and organic chemistry atom by atom (chains
       growing and closing into rings, line formulas, isomers rearranging, functional groups
       swapped in and moved, esterification, poly(ethene) and a polyester forming, cracking,
       methane burning, and sulfur dioxide becoming acid rain).
     - Merged (18 November 2026, pull request #218): group 2 part 4, all 30 More Chemistry Topics videos: graphene
       forming, a copper(II) ion gaining six water ligands, rotation about a single bond but not a
       double bond (Z to E only by breaking the π bond), a hydride ion reducing propanone with curly
       arrows, two glycines joining by a peptide link, a chiral centre built group by group, an
       oxide ion making hydroxide ions, acylation releasing HCl, brass resisting a push, recycling
       aluminium, and particle scenes for gas tests, air, distillation, crystallisation and the
       barium sulfate, silver chloride and hydroxide precipitates.
     - Merged (18 November 2026, pull request #220): group 3, an animated opener in all 116 calculation videos
       (Chemistry 8, 9, 10, 20, 30 and More Chemistry Topics). A new `reaction` scene draws every
       atom of an equation: the bonds break, the same atoms rejoin as the products, the molecules of
       each formula are stacked so a coefficient is what you see, and the atoms of each element are
       counted on both sides (balancing, mole ratios, molar mass sums, airbags, limestone, atom
       economy). Nuclei build from protons and neutrons (isotopes), isotope mixtures move as a gas
       (relative atomic mass), and the other openers reuse the particle, atom and molecule scenes
       (dissolving, diluting, titrations, cells, equilibria, proton transfer, enthalpy).
     - Rendered (19 November 2026): every remade chemistry video, all three groups, is rendered
       and in Drive; all 417 chemistry videos were checked complete there. The new lengths, chapter
       times and question times are recorded in `src/content/videos.json`.
     - Next: put chemistry back in the YouTube upload task (needs the owner's go-ahead).
10. **An introduction video for Gradileo** (the owner's idea, 15 October 2026), made when the
   platform is about 80% ready: why students, teachers and parents should use it, covering every
   feature, in the same style as the explainer videos.
   - Decision (the owner, 23 October 2026): make it once the AI marks, report cards and class
     forum are built, so it shows them too.
   - Built (23 October 2026): `gradileo-intro`, a tour of about nine and a half minutes in the
     explainer style. It covers students (lessons, videos, the AI tutor, practice, progress, canvas
     answers, the forum), teachers (the class page, adding students, present mode, the whiteboard,
     live questions, drafting with AI, suggested settings, exam mode, suggested marks, the
     gradebook, the mastery map, the AI teaching assistant, report cards, the forum), parents (the
     report card link) and privacy. It shows the app itself: the video stage has a `screen`
     element, a picture of Gradileo with spots the narration points at, and
     `video/tools/screens.ts` takes the pictures from the demo (PR #76). Rendered (8:57) and in
     Drive (`Gradileo videos/About Gradileo/gradileo-intro/`), and sent to the owner.
   - Revised (4 November 2026, the owner's review): the first cut was about mathematics only and
     quoted counts of courses, lessons and videos that went out of date. It now presents Gradileo as
     a platform for mathematics, chemistry and English, gives no counts or grade ranges (English for Grades 5 to 9 is coming), and shows the course picker
     on Chemistry (a new `teacher-subjects` picture). Every picture was taken again from today's app.
   - Approved by the owner and published on YouTube (7 November 2026): https://youtu.be/VCPa_7uUjyM,
     public, with its thumbnail and YouTube's own captions.
11. **Examination and Quiz questions video series** (the owner's request, 19 November 2026; next).
   For every course, real final exam and quiz questions for each lesson, each solved in its own
   step-by-step video with no length limit, broken down to the simplest steps (ELI5 style). Science
   solutions are animated, never narrated over still slides.
   - Plan written 19 November 2026 and waiting on the owner's yes:
     https://claude.ai/artifact/E7RBdeTs8kS5W98nYzVevK. First pass: one worked question per lesson
     (1,105 lessons in our 35 courses); a pilot of four videos (three for Physics 20 Unit 2, one
     Math 9 sample) comes first.
   - Licensing (checked 19 November 2026): real questions only from sources that allow YouTube use:
     NAEP released items (public domain), England's KS2 tests (Open Government Licence) and OpenStax
     Physics and Statistics (CC BY 4.0). OpenStax 2e maths and Chemistry, EngageNY and MCAS allow
     non-commercial use only; Alberta, New York Regents, AP, WAEC, KCSE and NSC papers need written
     permission; AQA forbids YouTube use and AI-made works, and the other UK and international boards
     need permission, so those courses get exam-style questions we write ourselves, labelled as such.
     Every video names its source and licence on screen and in its description.
   - Owner's answers (19 November 2026): approved the pilot; Gradileo counts as non-commercial (the
     site is free and the channel is not monetised), so CC BY-NC sources may be used with credit;
     where copyright blocks a question word for word, we write our own question of the same
     structure, format and difficulty instead; every video, real or written by us, cites the
     original creators.
   - Pilot built 19 November 2026: an exam video is a script in `src/content/exams/videos/` with an
     `exam` field (the lesson it practises, the source, the licence and a link). The source shows
     at the foot of every frame, the header reads "Exam Question · <unit>", and the YouTube
     description carries the credit line. The four pilot videos: `xq-p20-2-2` (two people push a
     car, OpenStax Physics 4.3), `xq-p20-2-4` (a skier on a slope, OpenStax Physics 5.4),
     `xq-p20-2-5` (a person pushing a box, OpenStax Physics 4.4) and `xq-m8-3-1` (is point C always
     between A and B, NAEP 2009 Grade 8, public domain). The maths sample is Math 8, not Math 9,
     because the best public-domain item found was a Grade 8 one. They stay out of `videos.json`
     and the upload queue until the owner approves them.
   - Owner's rule after the pilot (19 November 2026): every exam video's YouTube description opens
     with the whole question, word for word with its choices (our own full wording for a variant),
     because students find a worked solution by searching for the exact question. `exam.question`
     and `exam.choices` hold it in plain text, and `checkScript` refuses an exam video without it.
   - Scaling up (owner's "go", 20 November 2026): one exam video for every lesson, Physics first,
     one or two units to a pull request. Physics 20 Unit 2 (Dynamics) is complete with eight: the
     pilot's three and `xq-p20-2-1` (three forces, OpenStax 4.1), `xq-p20-2-3` (will a 50 N push
     move the box, 5.4), `xq-p20-2-6` (two ropes pull a trolley, 5.1), `xq-p20-2-7` (where the Earth's and
     the Moon's pulls balance, 7.2) and `xq-p20-2-8` (gravity on Rhea, 7.2). Unit 1 (Kinematics)
     is complete with eight, `xq-p20-1-1` to `xq-p20-1-8`: Tiana's jog (OpenStax 2.1), the bird
     that hops between branches (2.2), stop sign to stop sign (3.1), the swan's take-off (3.2), the
     order of the equations for a falling object (3.2), a vector from its x-component (5.2), a boat
     crossing a river (5.1) and a ball thrown at 40° that rises 10 m (5.3). Unit 3 (Circular
     Motion, Work and Energy) is complete with seven, `xq-p20-3-1` to `xq-p20-3-7`: the record that
     spins fastest at its edge (OpenStax 6.1), the car on a curve (6.2), the Sun's mass from
     Mercury's orbit (7.2), carrying books without doing work (9.1), the skater's push (9.1), the
     falling apple (9.2) and the runner's power (9.1). Unit 4 (Oscillations and Waves) is complete
     with seven, `xq-p20-4-1` to `xq-p20-4-7`: a car's springs (5.5), what sets the period of a
     mass on a spring (5.5), g from a pendulum (5.5), the boat on a wave (13.2), two waves meeting
     (13.3), the length of a closed tube (14.4) and the passing train horn (14.3). Physics 10
     Unit 1 (Describing Motion) is complete with five, `xq-p10-1-1` to `xq-p10-1-5`: the 10 km
     drive home in km/h and m/s (OpenStax 1.3), the fastball (2.2), the impossible displacement
     (2.2), the subway train speeding up (3.1) and the jet car's position-time graph (2.3). Unit 2
     (Forces and Newton's Laws) is complete with six, `xq-p10-2-1` to `xq-p10-2-6`: two forces in a
     tug of war (OpenStax 4.1), the box that slides to a stop (4.2), the lawn mower's acceleration
     (4.3), a weight on the Moon (4.3), the skydiver at terminal velocity (4.3) and the truck that
     hits a sedan (4.4). Unit 3 (Energy) is complete with six, `xq-p10-3-1` to `xq-p10-3-6`: the
     weightlifter's work (OpenStax 9.1), the bullet's kinetic energy (9.2), the child on a slide
     (9.2), the rock falling from a cliff (9.2), the car's power and time (9.1) and a lever's
     efficiency (9.3). Unit 4 (Waves, Sound and Light) is complete with five, `xq-p10-4-1` to
     `xq-p10-4-5`: the bird on the waves (13.2), the bobbing seagull (13.2), the bat's call (14.1),
     the image in a mirror (16.1) and the frequency of yellow light (15.2). Unit 5 (Electricity) is
     complete with five, `xq-p10-5-1` to `xq-p10-5-5`: 10 nC in 3 microseconds (19.1), a headlight's
     resistance (19.1), two resistors in series (19.2), three resistors in parallel (19.3) and the
     current in a 60 W bulb (19.4), so Physics 10 has an exam video for every lesson. Physics 30
     Unit 1 (Momentum and Impulse) is complete with five, `xq-p30-1-1` to `xq-p30-1-5`: a football
     player's momentum (8.1), the force of Venus Williams' serve (8.1), a goalie catching a puck
     (8.3), two steel carts bouncing apart (8.3) and a collision in a dark room (8.3); the motion
     element gained `momentumDecimals` for small momenta. Unit 2 (Forces and Fields) is complete
     with ten, `xq-p30-2-1` to `xq-p30-2-10`: charging ink droplets (18.1), Coulomb's torsion
     balance (18.2), the field near a doorknob (18.3), the field between plates and an electron
     through 100 V (College Physics 2e 19.2 and 19.1), a battery's terminal voltage (College
     Physics 2e 21.2), the field near a wire, the force on an electron and on a wire (20.1) and
     the emf of a falling flux (20.3). College Physics 2e is CC BY-NC-SA, which Gradileo may use
     because it is non-commercial. Units 3 and 4 so far: Sunlight reaching Saturn (15.2; the light
     element gained a `saturn` shape), Snell's law for carbon tetrachloride (16.2), the double-slit
     wavelength (17.1), an electron's de Broglie wavelength (College Physics 2e 29.6), a magnet
     bending a TV's cathode ray (22.5), an alpha particle's closest approach to gold (19.3), and,
     with the new optics animation, a concave mirror's image (16.1) and a lens's apparent image
     distance (16.3), and, with the photon animation, violet light on calcium (21.2) and the
     momentum of a 500 nm photon beside an electron's (21.3), and, with the energy levels
     animation, the level that 0.850 eV can ionize (College Physics 2e 30.3), and, with the
     nucleus animation, the radius of an alpha particle (31.3), and, with the decay and half-life
     animations, the beta decay that makes barium-137 (31.4) and the age of an old campfire
     (31.5), and, with the binding energy animation, the binding energy per nucleon of
     deuterium (31.6), so Physics 30 has an exam video for every lesson. Maths started 22 November 2026 with Math 10 (Math 10C):
     Unit 1 (Measurement) with eight, `xq-m10c-1-1` to `xq-m10c-1-8`, of which the hand-span
     referent and the vernier caliper are questions Gradileo wrote (the free banks have none) and
     the rest come from OpenStax Prealgebra 2e (feet and inches, 100 km in miles, the soda can, the
     globe, the cone of fries, the street light post); Unit 2 (Trigonometry) with four,
     `xq-m10c-2-1` to `xq-m10c-2-4`, from OpenStax Algebra and Trigonometry 2e 7.2 (the tree, the
     ladder, the unknown sides of a 30° triangle and the radio tower); Unit 3 (Factors, Roots and
     Powers) with six, `xq-m10c-3-1` to `xq-m10c-3-6`, from OpenStax Prealgebra 2e and Elementary
     Algebra 2e (hot dogs and buns, the 2704 cm² mosaic, Reed's garden, Elliott's garden of
     √288, (m⁴n⁻³)(m⁻⁵n⁻²) and the falling flare); Unit 4 (Polynomials) with six, `xq-m10c-4-1` to
     `xq-m10c-4-6`, from OpenStax Elementary Algebra 2e (18 × 17 by FOIL, (b + 3)(2b² − 5b + 8), the
     area w² − 6w, Deirdre's x² + x − 56, 6x² + 7x + 2 by the "ac" method and the pool deck
     (2w + 15)²); Unit 5 (Relations and Functions) with four, `xq-m10c-5-1` to `xq-m10c-5-4`, of
     which Jordan's bike-ride graph is a question Gradileo wrote (the free banks only ask about story
     graphs through pictures they do not describe) and the rest come from OpenStax Intermediate
     Algebra 2e 3.5 (the BMI mapping, two sets of ordered pairs and Sylvia's DVR); Unit 6 (Linear
     Relations) with five, `xq-m10c-6-1` to `xq-m10c-6-5`, from OpenStax College Algebra 2e and
     Elementary Algebra 2e (the shrinking city's −400 people a year, Damien's road-trip intercepts,
     the wheelchair ramp, whether 7x + 2y = 3 and 2x + 7y = 5 are perpendicular, and the straight
     road to work); Unit 7 (Equations of Linear Relations) with five, `xq-m10c-7-1` to
     `xq-m10c-7-5`, from OpenStax Elementary Algebra 2e and College Algebra 2e (Celsius to
     Fahrenheit, Ilya's weekly pay, the slope and intercept of x + 2y = 6, the line perpendicular
     to y = 3x + 1 through (4, 2), and cricket chirps by interpolation and extrapolation); Unit 8
     (Systems of Linear Equations) with four, `xq-m10c-8-1` to `xq-m10c-8-4`, from OpenStax
     Elementary Algebra 2e 5.1 to 5.3 (Manny's orange juice by graphing, Geraldine's two job offers
     by substitution, Andrea's shirts and sweaters by elimination, and how many solutions
     y = −2x − 4 and 4x + 2y = 9 have). Math 10 is complete: 42 exam videos, one per lesson. Math 20-1 (`xq-m201-*`) is under way:
     Unit 1 (Sequences and Series) with five, from OpenStax College Algebra 2e 9.2 to 9.4 (the
     daily run that grows by 4 minutes a week, twelve weeks of pay rising by \$12.50, website hits
     growing 2.6% a week, eight years of salary with a 2% raise, and the pendulum's total distance), and
     Unit 2 (Trigonometry) with five, from OpenStax Algebra and Trigonometry 2e 7.1, 7.3, 10.1 and 10.2
     (the angle coterminal with 870°, sin t from cos t = 24/25 in quadrant IV, a building's height
     from two angles of elevation, the two triangles from α = 80°, a = 120, b = 121, and two airplanes
     25° apart), and Unit 3 (Quadratic Functions) with four, from OpenStax College Algebra 2e 5.1 (the
     domain and range of 2(x − 4/7)² + 8/11, the parabola with vertex (2, 3) through (5, 12), the
     minimum of 2x² − 10x + 4, and the biggest dog park split into 2 pens), and Unit 4 (Factoring and
     Quadratic Equations) with four, from 2.5 (12x² + 11x + 2 = 0 by grouping, the 119 ft² garden,
     x² − 6x = 13 by completing the square, and the walkway around a garden, with the discriminant),
     and Unit 5 (Radical Expressions and Equations) with three, from 1.3 and 2.6 (3√(80x) − 4√(45x) = 0,
     7/(2 + √3) rationalized with the conjugate, and √(x + 3) = 3x − 1 with its extraneous root),
     and Unit 6 (Rational Expressions and Equations) with four, from 1.6 and 2.2 (Brenda's floor tiles,
     a quotient of four factored polynomials that comes to 1, 3/(x + 5) − 1/(x − 3), and
     2/(x − 2) + 1/(x + 1) = 1/(x² − x − 2)), and Unit 7 (Absolute Value and Reciprocal Functions) with
     four, from 3.6 and 5.6 (the numbers 4 away from 8, the graph of y = |x − 1|, |2x − 1| − 3 = 0, and
     the domain and asymptotes of 2/(5x + 2) as the reciprocal of a line), Unit 8 (Systems of Equations)
     with two, from 7.3 (the laptop company's break-even points, 2 to 20 laptops a day, and
     3x − y = −2 with 2x² − y = 0 by substitution), and Unit 9 (Linear and Quadratic Inequalities) with
     three, from Intermediate Algebra 2e 3.4 and 9.8 and College Algebra 2e 7.3 (Hugh's two jobs,
     10x + 13y ≥ 260, x² − 2x − 15 ≤ 0, and the graph of x² + y < 9). Math 20-1 is complete: 34 exam
     videos, one per lesson. Math 20-2 has begun with Unit 1 (Inductive and Deductive Reasoning):
     four questions we wrote in the style of a Grade 11 reasoning unit test, since the free banks
     have none at this level (a pattern's prediction for 12,345 × 9 + 6, a counterexample to "the sum
     of two primes is even", a proof that three consecutive integers add to three times the middle
     one, and a number riddle), and Unit 2 (Properties of Angles and Triangles) with four from OpenStax
     Contemporary Mathematics 10.2 to 10.4 (angle 5 between parallel lines, a triangle with angles
     x, x + 1 and x − 19, the angles of a regular pentagon, and which congruence theorem a figure
     shows), and Unit 3 (Acute Triangle Trigonometry) with three from OpenStax Precalculus 2e 8.1
     and 8.2 (solving a triangle with the sine law, a guy-wire on a hill with the cosine law, and the
     height of a blimp over a stadium), and Unit 4 (Radicals) with four from OpenStax Intermediate
     Algebra 2e 8.2 to 8.6 (√800, (7 + √3)(9 − √3), three denominators to rationalize, and
     √(x + 1) − x + 1 = 0 with an extraneous root), and Unit 5 (Statistical Reasoning) with two from
     OpenStax Contemporary Mathematics 8.7 and 8.8 (percents under a normal curve with mean 500, and
     the percentile of 211 on a test with mean 250) and two we wrote, since the free books divide by
     n − 1 and compute intervals rather than read them (which of two players is more consistent,
     with the population standard deviation, and reading a poll that is accurate 19 times out of 20),
     and Unit 6 (Quadratic Functions) with three from OpenStax College Algebra 2e 5.1 and
     Intermediate Algebra 2e 9.6 (the graph of x² − 2x, the highest point of a ball thrown at
     109 ft/s, and the intercepts of x² + 8x + 12 from factored form), and Unit 7 (Quadratic
     Equations) with three from Intermediate Algebra 2e 6.5, 9.3 and 9.5 ((x + 6)(x − 3) = −8 by
     expanding first, x² + 8x − 4 = 0 with the quadratic formula, and the dining table of 24 square
     feet whose length is two more than twice its width), Unit 8 (Proportional Reasoning) with three
     from OpenStax Prealgebra 2e 5.6 and 6.5 and Elementary Algebra 2e 8.7 (the better buy between
     two boxes of cereal, the gas for Jesse's road trip to Las Vegas and back, and a real distance
     from a scale map) and one we wrote, since the free books have no k² and k³ questions (the label
     and volume of a larger similar soup can), and Unit 9 (Mathematics Research Project) with one we
     wrote (fixing a leading research question about sleep and marks, and naming primary and
     secondary data). Math 20-2 is complete: 30 exam videos, one per lesson.
     Math 30-1 (`xq-m301-*`, 39 lessons) is complete: 39 exam videos. Units 1 to 6 (23 videos) use OpenStax
     College Algebra 2e (translations, reflections and stretches, combined transformations, an
     inverse on a restricted domain, a radical function, a radical equation checked on a graph,
     degree and end behaviour, the remainder and factor theorems, graphing a factored cubic) and
     Precalculus 2e (arc length, the unit circle at 7π/6, six ratios from cos t = −1/3, 2cos θ = √2,
     4 sin x, −cos(t + π/3) + 1, tan(x + π/4), the Ferris wheel, simplifying tan x sin x + sec x cos²x,
     the exact value of cos(π/12), proving cos²x − tan²x = 2 − sin²x − sec²x and solving
     cos 2t = sin t), with one we wrote for the square root of a function, which the free books do
     not cover. Units 7 to 9 (16 videos) use College Algebra 2e 6.1 to 6.6 (growth or decay of
     11,701(0.97)^t, four transformations of an exponential, like bases, 6 log₈ 4, the domain and
     asymptote of −ln(3x + 9) − 7, expanding a logarithm, ln x + ln(x − 3) = ln 7x), 5.6 (a shifted
     reciprocal, asymptotes and a hole), 3.4 (f + g, f − g, fg and f/g with their domains, and
     f(g(x)) with g(f(x))) and 13.5 to 13.6 (T-shirts, the letters of "academia", choosing
     motorcycles, the fourth term of (3x − 2y)⁵), and Intermediate Algebra 2e 7.4 (a rational
     equation with an extraneous root, shown as a hole on a graph).
     Math 30-2 (`xq-m302-*`, 24 lessons) is complete: 24 exam videos. Units 1 to 3 (set theory and
     logic, counting methods, probability) use OpenStax Contemporary Mathematics "Your Turn"
     questions from sections 1.2, 1.4, 2.5 and 7.1 to 7.9 (the subsets of nine tennis champions, soup
     and salad at a wedding, Elvis and the superheroes' capes, college ID codes, the pig race, raffle
     winners, the odds for an 80% event, two spades and three hearts in a hand, the lettered and
     numbered die, and drawing two cards in order), plus College Algebra 2e 13.5 (the letters of
     "mountains" with the vowels together). Unit 4 uses Elementary Algebra 2e 8.1 and Intermediate
     Algebra 2e 7.2 and 7.4 ((y² − 2y − 3)/(y² − 9), 6/(m + 6) − 12m/(m² − 36), and
     −10/(q − 2) − 7/(q + 4) = 1). Units 5 and 6 use College Algebra 2e 5.2 and 6.1 to 6.7 (the
     intercepts and end behaviour of x³ − 2x² − 15x, the open box from an 8-inch square, the fox
     population, 2^(−3n) · 1/4 = 2^(n+2), condensing log x − ½log y + 3log z, and half-lives from
     132.8 g to 8.3 g). Unit 7 uses Precalculus 2e 6.1 and 7.6 (the equation of a cosine graph, which
     the video redraws, and the temperature at 9 AM). Unit 8 has two we wrote, since the free books
     have no puzzle-game or research-project questions (winning the 15-counter take-away game, and
     fixing a research plan about part-time jobs and marks).
     Math 30-3 (`xq-m303-*`, 22 lessons) is complete: 22 exam videos. Unit 1 uses OpenStax College
     Physics 2e 1.3 (the measuring tape off by 0.50 cm over 20 m, and the speedometer's percent
     uncertainty and range of speeds). Unit 2 uses Precalculus 2e 8.1 and 8.2 (the distance across a
     lake by the sine law, the third side of a triangular pool by the cosine law, and the vertical
     support for a solar panel on a 20° roof). Units 3, 4, 6, 7 and 8 use Contemporary Mathematics
     "Your Turn" and "Check Your Understanding" questions from sections 10.3 and 10.4 (angles x,
     x + 1 and x − 19, the regular pentagon's angles, trim for an arched window, the tree's height
     from shadows), 8.4 and 8.6 (the median and mean of a frequency table, the percentile of 12),
     7.5 (Jessie's faulty taillights, a sum of 6 or 7 with two 4-sided dice) and 6.11 (Luther's total
     car cost, a lease's monthly depreciation). Unit 5 uses College Algebra 2e 4.1 (the cost per
     training session), Elementary Algebra 2e 4.5 (Cherie's salary with commission, with its graph)
     and Contemporary Mathematics 8.9 (predicting a salary from a regression line). Three we wrote,
     since the free books have no questions on them: a reflection then a translation on a grid
     (4.1), the break-even point of a T-shirt business (8.3) and a logic grid puzzle (9.1).
     Math 31 (`xq-m31-*`, 26 lessons) is complete: 26 exam videos, all from OpenStax Calculus
     Volume 1 exercises with the book's answers checked. Unit 1 uses sections 1.1 and 1.3 (the
     bacteria culture, 2cos θ sin θ = sin θ). Unit 2 uses 2.2 to 2.4 and 4.6 (the jump in
     (x² − 1)/|x − 1|, the limit of (t − 9)/(√t − 3), the asymptotes of (x³ + 1)/(x³ − 1), and the k
     that makes a piecewise function continuous). Units 3 and 4 use 3.1, 3.3 and 3.6 (the race car's
     velocity, the tangent to 7/x from the definition, x²(2/x² + 5/x³), the herring population, the
     flat tangents of (x − 6/x)⁸). Unit 5 uses 3.5, 3.8 and 3.9 (tangents of cot x parallel to
     y = −2x, Toledo's growing population, the tilted ellipse x² + xy + y² = 7). Units 6 and 7 use
     3.6, 4.1 to 4.3, 4.5 and 4.7 ((15.99)^(1/4) by a linear approximation, the extrema of
     3x⁴ + 8x³ − 18x², the curve sketch of x³ − 6x², the braking freight train, the largest
     suitcase, the leaking cone). Units 8 and 9 use 4.10, 5.1, 5.3, 5.5, 6.1 and 6.2 (the braking
     car, L₈ for (x − 1)², the trapezoid estimate and exact area under √x + x², ∫₀¹ x/√(1 + x²) dx,
     the area between y = x² and y = −x² + 18x, and the washer volume between y = √x and y = x²).
     Math 10-3 (`xq-m103-*`, 31 lessons) is complete: 31 exam videos. Most come word for word from
     OpenStax Prealgebra 2e 4.6, 5.6, 6.3, 6.5, 7.5 and 9.3 to 9.5 (Hugh's drive, the better buy in
     storage bags, Homer's commission, the highway reflectors, Connie's fabric, the framed picture,
     Jose's and Christa's fences, Perry's lawn, the footbridge, the garden path, Joe's doll house),
     Contemporary Mathematics 6.2, 9.1, 9.5, 10.2 and 10.6 to 10.8 (the microwave discount, the
     amoxicillin doses, the cooling compound, three angle questions with their figures redrawn, the
     pizza value, the carpet, the living room paint, the house's shadow, the kite and Willis Tower),
     College Algebra 2e 4.2 (the jewelry pay options) and Intermediate Algebra 2e 7.5 (Kyra's
     currency exchange, and the map of Seattle, Portland and Boise). Four we wrote, since the free
     books have no Canadian payroll, overtime, ruler-reading or square-counting questions: Jordan's
     overtime pay (2.1), Priya's CPP, EI and tax deductions with every rate given in the question
     (2.4), trim between two ruler marks (4.1) and the squares in a 4 by 4 grid (6.4).
     Math 10-4 (`xq-m104-*`, 27 lessons) is complete: 27 exam videos. Most come word for word from
     OpenStax Prealgebra 2e 1.1, 1.3, 3.1, 3.3, 4.2, 4.5, 5.2, 5.5, 6.1, 6.2, 9.3 and 9.7 (Jorge's
     car price rounded four ways, Noah's road trip, Rafael's pizza slices, Vanessa's sugar,
     Nicole's babysitting money, Boston's 44%, Kimngoc's tip, Mount McKinley and Death Valley, the
     38° drop in Urbana, Lindsay's drive, Lee's trip time, the supplement and complement of 25°,
     Jim's mean ride time and Tanya's candy), Elementary Algebra 2e 8.7 (Phil's fertilizer bags)
     and Contemporary Mathematics 3.10, 8.1, 9.1 to 9.3, 9.5 and 10.4 (Christina's savings, the
     courses frequency table, Kyrie's skydive, the garden path topsoil, the 96 L container, the
     heated liquid and the fenced area). Five we wrote, where the free books have no question that
     fits: sand as 3/8 of a bag (2.2), reading pay from a graph (5.4), a bolt between two ruler marks
     (6.2), the faces, edges and vertices of a square pyramid (8.2) and a rectangle's lines of
     symmetry (8.3).
     Chemistry (`xq-c*`) is going course by course in the order Chem 10, 20, 30, then 7, 8 and 9,
     then More Chemistry Topics, each video built on the animated particle scenes of its lesson.
     Chem 10 has all 23 (#256) and Chem 20 all 31 (#260, #262, #263), from OpenStax Chemistry 2e
     end-of-chapter exercises or questions we wrote in the style of a unit test. Chem 30 Unit 1
     (Thermochemical Changes) has seven, `xq-c30-1-1` to `xq-c30-1-7`: the cold pack, coffee and the
     silver spoon (OpenStax 5.2), methane's molar enthalpy (5.3), propane's enthalpy diagram, Hess's
     law for propane, ethanol from enthalpies of formation, and a potential energy diagram with a
     catalyst. Unit 2 (Electrochemical Changes) has eight, `xq-c30-2-1` to `xq-c30-2-8`: aluminium
     meeting oxygen, oxidation numbers in burning ethene, which metal corrodes (OpenStax 17.6),
     permanganate and oxalic acid, an iron(II) titration, the copper and silver cell, the cadmium and
     aluminum cell that is not spontaneous (17.3), and copper plating a key (#265). Unit 3 (Chemical
     Changes of Organic Compounds) has seven, `xq-c30-3-1` to `xq-c30-3-7`: naming pentane, 1-pentene
     and 1-pentyne, naming a branched alkane, the four isomers of C4H9Cl, ethanol and its ether
     isomer, 2-bromopropane from propene (OpenStax 20.1), the percent yield of ethyl acetate (20.3),
     and burning octane. Unit 4 (Chemical Equilibrium Focusing on Acid–Base Systems) has eight,
     `xq-c30-4-1` to `xq-c30-4-8`: whether equal concentrations mean equilibrium (OpenStax 13.1), K
     for PCl5 from an ICE table (13.4), sulfur trioxide and temperature (13.3), labelling acids,
     bases and conjugates (14.1), hydrofluoric acid meeting cyanide, Ka of the methylammonium ion
     and the pH of propionic acid (14.3), and hydronium in a nitrite buffer (14.6). Chem 30 is
     complete: 30 exam videos, one per lesson (#269). Chem 7 has all 15, `xq-c7-1-1` to
     `xq-c7-4-3`, each a question we wrote in the style of a Grade 7 science unit test: hazard
     symbols on ethanol, what counts as matter, a stone's volume by displacement, a metal block's
     density, two syringes, the states of bromine, a mug of cocoa cooling, a stuck lid and a
     spreading colour, two white solids, salt water's concentration, potassium nitrate's
     solubility, a fair test of stirring, separating iron, sand and salt, water from the sea, and
     matching a note to a pen by chromatography (#271). Chem 8 has all 15, `xq-c8-1-1` to
     `xq-c8-4-4`, in the style of a Grade 8 science unit test: element symbols, elements and
     compounds, mixtures, counting atoms in formulas, the periodic table's order, metals and
     non-metals, the alkali metals and noble gases, the halogen trend, four kitchen changes,
     signs of a reaction, word equations, burning and the fire triangle, three rusting nails,
     choosing metals and carats of gold, and polymers, ceramics and composites. Chem 9 has all
     15, `xq-c9-1-1` to `xq-c9-4-3`, in the style of a Grade 9 science unit test: the gold
     foil results, isotopes of magnesium, electron arrangements, ions, ionic and covalent
     bonds, ionic formulas, naming compounds, relative formula mass and percentage by mass,
     conservation of mass, balancing equations, reaction types and displacement, rates of
     reaction, litmus and the ions in acids and alkalis, the pH scale, and neutralization (#272,
     #274). More Chemistry Topics has its 18 GCSE lessons done, `xq-cx-1-1` to `xq-cx-6-3`, in
     the style of a GCSE chemistry exam: the reactivity series, extracting iron, copper sulfate
     crystals, electrolysing brine, purity and gas tests, identifying ions, empirical formulae,
     atom economy, the atmosphere, pollutants and the greenhouse effect, potable water, life
     cycle assessments, the model of the atom, transition metals, forms of carbon and
     nanoparticles, rusting and alloys, the Haber process, and cells and fuel cells (#275). Its
     27 A level lessons are done too, `xq-cx-7-1` to `xq-cx-12-8`, in the style of an A level
     chemistry exam: mass spectra, ionisation energies, shapes of molecules, Maxwell–Boltzmann,
     Period 3 trends, Groups 2 and 7, curly-arrow mechanisms, halogenoalkanes, E/Z isomers,
     alcohols, identifying an unknown compound, Born–Haber cycles, entropy and Gibbs free
     energy, rate equations, Kp, Period 3 oxides, copper complexes, metal aqua ions, optical
     isomers, aldehydes and ketones, esters, benzene, amines, amino acids, a two-step synthesis,
     and NMR and chromatography. So every chemistry lesson now has its exam video. Chem 10 is
     rendered and on Drive, and Chem 20, 30, 7, 8, 9 and More Chemistry Topics are rendering in
     turn.
     English has an exam video for every lesson of all nine
     courses, 243 in all: Grades 5 to 9 in #257 and Grades 10 to 12 and More English Topics in
     #258. They are questions we wrote in the style of each grade's tests (GCSE for More English
     Topics) on public-domain texts, plus a few key stage 2 grammar questions under the Open
     Government Licence; texts still in copyright are described, never quoted. Grade 5 is rendered
     and on Drive, and the other grades are rendering in turn. The owner approved the exam videos for YouTube on 22 November 2026: the upload tool takes them (`exams`, or
     `exams:<course>`), each course in its own "Exam Questions" playlist. Still to do: an exam
     panel on each lesson page.

## Hosting

- Decision: move the site from GitHub Pages to **Cloudflare** (Pages, or Workers with static
  assets, whichever Cloudflare recommends at the time) at **gradileo.com**, bought through
  Cloudflare Registrar. Reasons: GitHub Pages' terms do not allow running a business or software
  service on it; Cloudflare serves static sites free without a bandwidth cap, from data centres in
  Kigali and Canada; and the domain lives in the same account.
- The move, in two steps so the site never goes down:
  1. Built: the deploy workflow also publishes to Cloudflare once the tests pass (a Worker serving
     the built app, `wrangler.jsonc`, at gradileo.com and www.gradileo.com), while GitHub Pages
     keeps serving the site as before. The owner bought the domain and added the secrets
     `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
  2. Built: gradileo.com is live (checked: the landing and sign-in pages, www, deep links and
     assets). GitHub Pages now serves a redirect from the old address to the same page on
     gradileo.com, keeping the path, query and sign-in tokens, and the video build links to
     gradileo.com. Done: gradileo.com is the Supabase Site URL and a sign-in redirect address (with
     www), `APP_URL` is set to it, and `ALLOWED_ORIGINS` is gradileo.com and www.gradileo.com
     (checked: the Edge Functions answer those two and refuse other sites, including github.io).
  3. Done: the owner renamed the GitHub repository to Gradileo, and the repository path in the
     code follows. GitHub Pages does not redirect the old project address, so the old
     github.io/EduCore links no longer open; gradileo.com is the only address.
- Email: done. admin@gradileo.com forwards to the owner's inbox through Cloudflare Email Routing,
  set up by the *Set up email* workflow (docs/SETUP.md 3.3; gradileo.com's MX and SPF records
  point to Cloudflare). More addresses are a line in `scripts/cloudflare-email.mjs`.
- Sending email from gradileo.com (10 November 2026). Found: no email had ever been sent. The
  reminder sender (`send-emails`) had no Resend key and the scheduler's Vault secrets were never
  set, and sign-up confirmations went through Supabase's own mail server, which sends only a few
  an hour and only to the project's team. Built: the *Set up sending email* workflow
  (`scripts/resend-email.mjs`, docs/SETUP.md 3.3) adds gradileo.com to Resend, adds its DKIM, SPF,
  bounce MX and a DMARC record in Cloudflare (never the domain's own Email Routing records), waits
  for verification, sends a test to admin@, and stores a sending-only key in Vault. Reminders come
  from Gradileo <no-reply@gradileo.com>, replies go to admin@gradileo.com, and each email says
  why it came. A migration makes the scheduler's secret inside the database. Owner-side (one
  pass, docs/SETUP.md 3.3): a Resend account with two keys, the GitHub secret `RESEND_API_KEY`,
  Supabase's SMTP form for sign-in emails, Zone DNS Edit on the email token, then one run. Live
  since 10 November (test email arrived in the owner's inbox, not spam).
- Email for students without one (11 November 2026, the owner's request): a student with a username
  from the teacher, or a name-only account let into a class, can add an email address in Settings
  (theirs or a parent's). It counts once the six-digit code sent to it is typed back (5 codes an
  hour, 5 tries a code, 15 minutes each); reminders then go there, and it can be changed or removed.
  Only the student sees it (`notification_emails`, the `notify-email` function). 11 November: the
  owner chose to make it a parent's or guardian's address (many students are under 13): the code
  email goes to the parent and explains the request, and the parent agrees by giving the student
  the code.
- Visitor counts (6 November 2026): Cloudflare reported 18,032 page views on gradileo.com in the
  month after it went live (13 October), but the zone's count includes bots, and Supabase had only
  8 accounts (1 teacher, 7 students, 6 of them since 13 October). Built: Cloudflare Web Analytics
  (free, no cookies; `src/analytics.ts`, docs/SETUP.md 3.1) runs on gradileo.com once the owner adds
  the site token as the repository variable `VITE_CF_BEACON_TOKEN`; the privacy policy says so.
  Sign-ups by week are on the admin Overview page. Next: compare visitors with sign-ups after a
  few weeks of data, and see which pages and referrers bring students.
- Before investing further in the brand, check the Canadian (CIPO) and US (USPTO) trademark
  databases for "Gradileo" in classes 9, 41 and 42.
- Legal pages: built. The Privacy Policy is at gradileo.com/privacy and the Terms of Service at
  gradileo.com/terms (public, linked from the landing, sign-in and sign-up pages), so Google's
  OAuth consent screen can link to them. The owner verified gradileo.com in Google Search Console
  (a Domain property, through a DNS TXT record). The privacy policy describes what the app actually
  collects and who receives it (Supabase in Canada, Cloudflare, MiniMax for teacher-run analyses,
  the email provider, YouTube embeds) and the Google Drive upload connection (drive.file only,
  with Google's Limited Use statement), and the YouTube Data API connection to Gradileo's own
  channel (updated 4 November 2026 for all three subjects). Keep both pages in step with new features. The owner may
  want a lawyer to review them, and to add a governing-law clause.

- Search engines (22 November 2026, the owner's request after two SEO posts on X). Found: no
  `robots.txt` or sitemap (both addresses returned the app), no link preview tags, no structured
  data, and every lesson behind sign-in, so Google could index only the landing, privacy and terms
  pages. Built in PR #247: `robots.txt` (dashboards, join links and shared reports kept out),
  preview tags and image (`public/og-image.jpg`), Organization structured data with the YouTube,
  Facebook and Instagram accounts, a title naming all four subjects, and footer links to the
  accounts. Built in PR #248: public lesson pages. The build (`scripts/prerender.mjs`,
  `src/seo/pages.tsx`) writes a plain HTML page for every lesson of every listed course at
  `/lessons/<id>-<title>`, one per course at `/courses/<course>` and a list at `/courses/`, plus the
  sitemap. A lesson page has the whole lesson (worked examples with every step, diagrams, one
  version of each practice question with its solution folded away), its explainer videos from
  YouTube with chapter links, links to the lessons before and after it, and LearningResource,
  VideoObject (each chapter a Clip) and BreadcrumbList structured data. Anyone may now read
  `video_links` without the private `updated_by` column, so the build reads the videos with the
  public key; the deploy also runs daily so newly uploaded videos appear. New courses and lessons
  get pages with no extra work (PR #248). Built next: the monthly *Search Console report* workflow
  (docs/SETUP.md 3.5) opens an issue with the queries where a page sits on page 2 and those seen but
  rarely clicked, and `src/seo/overrides.json` holds a lesson's own search title and description
  for the review to change. Owner-side: the service account and its secret `GSC_SERVICE_ACCOUNT_KEY`
  (docs/SETUP.md 3.5), and adding the site to Bing Webmaster Tools (it imports the Google
  property and also feeds ChatGPT search). Not adopted from the posts: Google Business Profile and local citation work, paid
  backlinks, competitor comparison pages and paid rank trackers, since Gradileo is a free online
  platform with no local customers.

## Technical follow-ups

- Security follow-ups from the 7 November 2026 audit (the Content-Security-Policy is enforced
  since 7 November, after all 73 browser tests passed under it with no reports): add Cloudflare Turnstile to
  sign-up and class-link joins (needs a Turnstile site key and Supabase Auth's CAPTCHA setting);
  upgrade KaTeX to 0.19 (an advisory, low risk while `trust` stays off) and vitest (dev only).
  Owner-side: turn on leaked-password protection in Supabase Auth, check "Always Use HTTPS" in
  Cloudflare, and set a spending limit on the MiniMax account.
- Lower priority since Gradileo is no longer aimed at Alberta first (17 October 2026): check the
  K&E, Math 10-3, Grade 11 and Grade 12 outcome wording word for word against Alberta's
  program of studies and *Outcomes with Assessment Standards*. Their hosts are now reachable from
  the build environment (Grades 5 to 9 were checked this way).
- Built (11 November 2026): **Alberta's new Grades 7 to 9 mathematics curriculum**, as a
  curriculum map (`engine/curriculum/maps/ab.ts`, curriculum `ab`, "Canada: Alberta" on "Find your
  course"): `ab-grade-7`, `ab-grade-8` and `ab-grade-9`, each built from Gradileo's lessons in the
  order of the draft curriculum's organizing ideas (Number, Algebra, Geometry, Measurement,
  Patterns and Relations, Statistics and Probability, Financial Literacy), with the outcome codes
  of the scope and sequence (7N1, 8A2, 9PR1) in each unit. Math 7, 8 and 9 stay on the 2016
  program of studies, which schools teach until the new one is mandatory in September 2027, so an
  Alberta learner in Grades 7 to 9 is still recommended Math 7, 8 or 9 and is offered the new
  course as an alternative ("if your school is piloting"); teachers start a class on one from the
  "New Alberta Grades 7 to 9" tab. Ten lessons in More Mathematics Topics fill what the new
  curriculum adds, with 20 question generators: absolute value and opposites, perfect cubes and
  cube roots, the constant of proportionality, sets of real numbers and set-builder notation
  (Unit 20); geometric objects and their notation, and dilations on the Cartesian plane (Unit 21);
  relations and functions, domain and range, and simple quadratic equations (Unit 22); and the
  shape of a distribution (Unit 1). The maps list no gaps. Sources: the June 2026 draft (the full
  Grade 7 text and the Grades 6 to 9 scope and sequence published by the Alberta Professional
  Learning Consortium) and Alberta Education's fact sheet. Still to do: check the Grades 8 and 9
  wording against new LearnAlberta when the final curriculum is published (its site refuses the
  build environment), and in September 2027 make the new courses the first recommendation in
  Alberta. Videos (11 November 2026): one explainer for each of the ten lessons
  (`src/content/mathmore/videos/mx-20-1.ts` to `mx-22-3.ts` and `mx-1-7.ts`), rendered and in
  Drive (`Gradileo videos/More Topics/`); the Tutor voice workflow records the lessons after each
  merge. The owner chose junior chemistry as the next subject (11 November 2026).
- Done (11 November 2026): **Junior chemistry, Grades 7 to 9** (`docs/PLAN-JUNIOR-CHEMISTRY.md`),
  one grade per pull request so each can be used in classes as soon as it merges.
  - Built: **Grade 7 Chemistry** (`chem-7`, "Chemistry 7"): four units and 15 lessons (matter and
    measurement, the particle model, mixtures and solutions, separating mixtures) with 30 question
    generators, on a shared question-bank helper (`engine/curriculum/chemjr/bank.ts`). Learners in
    Grade 7 or below who pick Chemistry are recommended it, with Grade 10 Chemistry as the
    alternative. Its 15 explainer videos are rendered and on Drive.
  - Built: **Grade 8 Chemistry** (`chem-8`, "Chemistry 8"): four units and 15 lessons (atoms,
    elements and compounds; the periodic table; physical and chemical changes and word equations;
    burning, rusting, metals and alloys, and polymers, ceramics and composites) with 30 question
    generators. A Grade 8 learner is recommended it, with Chemistry 7 as the readiness check, and
    Grade 9 learners are offered it as well as Grade 10 Chemistry. Its 15 explainer videos are
    rendered and on Drive.
  - Built: **Grade 9 Chemistry** (`chem-9`, "Chemistry 9"): four units and 15 lessons (atomic
    structure and ions; ionic and covalent bonding, formulas, names and relative formula mass;
    conservation of mass, balancing equations, types of reaction and rates; acids, bases, pH and
    neutralization) with 30 question generators. A Grade 9 learner is recommended it, with
    Chemistry 8 as the readiness check, and Grade 10 Chemistry's readiness check is now Chemistry
    9. Its 15 explainer videos are rendered and on Drive.
- Done: the *Deploy Supabase backend* workflow works. Its secrets (`SUPABASE_ACCESS_TOKEN`,
  `SUPABASE_PROJECT_ID` and `SUPABASE_DB_PASSWORD`) were added on 14 October 2026. The first run
  failed at `supabase link`, which reads the project's secret API keys, so the workflow no longer
  links: it pushes migrations through the session pooler and deploys the functions by project
  ref. The token is scoped to this project with only Connection Pooling (Read) and Edge Functions
  (Read-write), and expires on 13 October 2027 (permissions cannot be changed after a token is
  made, so make a new one before then and update the secret). The run on 14 October found the
  database up to date (all 13 migrations) and redeployed the five Edge Functions. Merges that
  change `supabase/` or `engine/` now deploy on their own.
- AI tutor teaches the lesson (the owner's request, 20 October 2026: "students should be able to
  click start and the class gets presented to them as if a teacher was anchoring"). Built: every
  student (self-paced or in a class) can press **Start with your AI tutor** on a lesson or on their
  home page. The tutor presents the lesson's slides like a teacher: it builds each slide step by
  step and says what to notice at every step, out loud with captions on screen; stops at each "Your turn" question, cheers a right
  answer and helps with a wrong one ("Explain my mistake"); introduces and plays the explainer
  videos; and answers the student's own questions at any point ("Ask your tutor"). The student can
  pause, go back, skip, replay, slow it down or turn the voice off. MiniMax writes the
  narration for runs of slides through the new `ai-tutor` Edge Function, which saves it
  (`tutor_scripts`), so each lesson is written once and later students get it at once; without the
  AI, the tutor reads from the slides. Hourly limits per student; questions are not stored, and no
  names are sent (privacy policy updated). The AI now uses `MiniMax-M3.1-Flash` (generally available
  since 19 October 2026).
- The AI tutor speaks with the explainer videos' voice (the owner, 21 October 2026: the device's
  voice "is terrible … I prefer the voice in the videos, the pacing, pausing, voice modulation,
  intonation"). The video voice (Kokoro) runs about four times slower than real time inside a
  browser (measured), so it is recorded ahead of time instead: the **Tutor voice** workflow
  (`.github/workflows/tutor-voice.yml`, `video/tools/tutor-voice.ts`) builds every lesson's slides
  as a self-paced student sees them, has MiniMax write what the tutor says at each step, voices it
  at the videos' calm pace with their pronunciation fixes, and publishes one MP3 and a manifest per
  lesson as a release per course; the deploy copies them to gradileo.com/tutor/. The tutor plays
  each line from the recording (the speed button changes its pace); praise, the "not quite" help
  and its reply to a question are recorded too. A slide the recording does not have (a teacher's
  own resource, or a slide changed since) shows its words on screen. The device voice is gone.
  It runs after merges that change lessons or the tutor, nightly, and by hand. **Owner:** add the
  repository secret `MINIMAX_API_KEY` (Settings → Secrets and variables → Actions) so MiniMax
  writes the lines; until then the tutor reads each step from the slide, and the next run with the
  key rewrites and re-records those slides. First run (21 October): 13 courses recorded whole; five
  lessons in Math 9, 20-3 and 31 have a long list or calculation the voice could not say in one go,
  so such lines are now said in pieces and those lessons are recorded on the next run. The owner
  added `MINIMAX_API_KEY` the same day. A test run on Math 5 showed MiniMax's lines read like a
  teacher but slip: a dropped "thousandths", "one hundred and three divided by six leaves no
  remainder" (618 ÷ 6), "and" inside whole numbers (the lessons keep "and" for the decimal point),
  and in about one slide in ten every line said one step early. So each slide's lines are now
  checked against the slide (`engine/ai/tutorCheck.ts`) and a slide that fails is read from the
  slide; the prompt numbers the steps and asks for one beat per numbered step, a few slides per
  request. The slide's own wording was fixed as well: big numbers written with spaces
  ("4 572 306") were said as several numbers, and working set out in columns was read out as
  "array r 4 1 5…"; now a big number is said whole and column working is pointed to. With the
  new prompt only 1 line in 556 was said on the wrong step (88 in 952 before). MiniMax drops
  connections in bursts, so the recorder now sends one request at a time per lesson with longer
  pauses before trying again, and records four courses at a time; slides it could not write are
  read from the slide and written on a later run. The owner (21 October: "it is amazing, I love
  it") heard units read as letters ("-3 C", "3 M"): units are now said in full ("negative 3
  degrees Celsius", "3 metres", "84 square metres", "60 kilometres per hour"). The site
  serves files whole, and Safari only plays sound it can fetch in parts, so the tutor downloads a
  lesson's recording once and plays it from memory. Next: speak the tutor's answers to questions too
  (today they are written in the chat); record approved teacher edits of a lesson; let the tutor
  ask its own follow-up question after a wrong answer.
  Checked (10 November 2026): the newest lessons, More Mathematics Topics (23) and English
  Grades 5 to 9 (122), all have the tutor voice on gradileo.com (recorded 4 and 5 November and kept
  up to date by the nightly run), as do the other 22 courses: 808 lessons and 12,807 slides, 12,719 with
  MiniMax's lines. The other 88 are read in the voice from the slide's own words because the
  checks turned MiniMax's lines down. Two of them, in Scientific notation (mx-2-1), were a real slip: a long
  decimal written in groups ("0.000 81") reached the voice and the checks as two numbers. Those
  groups are now joined, so the voice says one number. Of the 17 such slides in the newest
  courses, the other 15 are English slides with a long passage, where the line-to-step check is
  strict; they are left as they are for now.
- Self-paced study, next steps: let the AI write the student coach's note on the home page (today
  it comes from the offline analyst); store placement results on the server (today they stay on
  the device); let a student leave a self-paced course; and email the AI tutor's weekly summary.
- Exam mode, next steps: a Safe Exam Browser option for schools that need true lockdown, a
  per-class default for exam mode, and a live view of who is locked during an exam.
- Lesson edits, next steps: let administrators edit the lesson introduction (before the first
  section) as well as sections, and export approved edits as a pull request so they can be folded
  into the lesson files.
- Course requests, next step: create the GitHub issue automatically from an Edge Function with a
  repository token (today the administrator submits GitHub's prefilled form and pastes the link).
- Live class questions, next steps: a teacher-only list of who has and has not answered (never on
  the projector), an optional countdown per question, and counting live answers as practice
  evidence for mastery.
- Figures: label number-line ticks as fractions where a lesson works in fractions, and make the
  shading of filled shapes on coordinate grids a little stronger.
- The main JavaScript bundle is about 875 KB (240 KB compressed); split the remaining large
  shared modules so first loads are faster on school networks.
