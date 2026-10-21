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
   - In progress: Math 6, 117 videos. Every script and every Your-turn answer and still was
     checked, and the videos are rendering unit by unit into Drive (Units 1 and 2 are there).
   - Scripted: Math 7, 143 videos written by four helpers and checked like Math 6 (four answer
     lines or figures were corrected, and money is always said in dollars and cents). They render
     after Math 6.
   - Next: script and render Math 8 and 9 in order, explaining each lesson as simply as
     possible, with parts split by idea.
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
7. **AI report cards** (the owner's idea, 15 October 2026). For each student, from their mastery
   and work: how they are doing, strengths, next steps, tips for the student and for parents, and
   feedback. The teacher who asks for it reviews and edits it before it reaches the student or a
   parent (not an administrator: the review is the teacher's), and shares it on request as a PDF
   or a private link.
8. **Class forum** (the owner's idea, 15 October 2026). Students post questions for their class
   and choose who sees each one: private to the teacher, the whole class, or the whole class
   without their name shown to classmates (the owner agreed, 17 October 2026). The teacher can
   always see and moderate every post (the students are children), with notifications for new
   posts and replies.
9. **Other subjects**, once mathematics is complete.
10. **An introduction video for Gradileo** (the owner's idea, 15 October 2026), made when the
   platform is about 80% ready: why students, teachers and parents should use it, covering every
   feature, in the same style as the explainer videos.

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
  point to Cloudflare). More addresses are a line in `scripts/cloudflare-email.mjs`. Next: send
  from gradileo.com through Resend, which also lets reminders come from an address at
  gradileo.com (and Gmail's "Send mail as").
- Before investing further in the brand, check the Canadian (CIPO) and US (USPTO) trademark
  databases for "Gradileo" in classes 9, 41 and 42.
- Legal pages: built. The Privacy Policy is at gradileo.com/privacy and the Terms of Service at
  gradileo.com/terms (public, linked from the landing, sign-in and sign-up pages), so Google's
  OAuth consent screen can link to them. The owner verified gradileo.com in Google Search Console
  (a Domain property, through a DNS TXT record). The privacy policy describes what the app actually
  collects and who receives it (Supabase in Canada, Cloudflare, MiniMax for teacher-run analyses,
  the email provider, YouTube embeds) and the Google Drive upload connection (drive.file only,
  with Google's Limited Use statement). Keep both pages in step with new features. The owner may
  want a lawyer to review them, and to add a governing-law clause.

## Technical follow-ups

- Lower priority since Gradileo is no longer aimed at Alberta first (17 October 2026): check the
  K&E, Math 10-3, Grade 11 and Grade 12 outcome wording word for word against Alberta's
  program of studies and *Outcomes with Assessment Standards*. Their hosts are now reachable from
  the build environment (Grades 5 to 9 were checked this way).
- Still worth doing, as topics most countries teach at these ages: update Math 7, 8 and 9 to
  Alberta's new Grades 7–9 curriculum before it becomes mandatory in
  September 2027 (functions, irrational numbers, scientific notation, quadratic equations and
  more). Optional classroom piloting runs in 2026–27.
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
  so such lines are now said in pieces and those lessons are recorded on the next run. The site
  serves files whole, and Safari only plays sound it can fetch in parts, so the tutor downloads a
  lesson's recording once and plays it from memory. Next: speak the tutor's answers to questions too
  (today they are written in the chat); record approved teacher edits of a lesson; let the tutor
  ask its own follow-up question after a wrong answer.
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
