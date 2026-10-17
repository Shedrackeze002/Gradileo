# Explainer videos

Gradileo's explainer videos are built from scripts, like the lessons. A script
(`src/content/<course>/videos/<id>.ts`) is a list of scenes: each puts triangles, maths, tables,
a calculator or a "Your turn" question on the stage, and the narrator's lines show and highlight
them as they are spoken. The build voices every line, times the video from the narration, draws
every frame in Chromium and encodes the MP4.

Each build writes to `video/out/<id>/` (not committed):

| File | What it is |
|---|---|
| `<id>.mp4` | 1920×1080, 30 fps, H.264 with AAC audio normalised to −16 LUFS |
| `captions.srt`, `captions.vtt` | Captions from the script, timed to the narration |
| `thumbnail.png` | 1280×720 |
| `youtube.txt` | Title, description with chapters, and tags to paste into YouTube |
| `pronunciation.txt` | Whisper's transcript of each line compared with the script |

It also records the video's length, chapters and question cues in `src/content/videos.json`,
which the lesson player will use to pause at each question.

## Setting up

```bash
npm ci                    # the app (Vite, Playwright)
npm --prefix video ci     # the narration and speech models (about 700 MB)
```

You also need `ffmpeg`. The build uses Playwright's Chromium; set `CHROMIUM_PATH` to use another.
The first build downloads the Kokoro voice model and Whisper into `video/.cache/`. Behind a proxy
(as in Claude's cloud containers), run Node with `NODE_USE_ENV_PROXY=1` so the downloads use it.

## Building

```bash
npx tsx video/build.ts m10c-2-1 m10c-2-1-b      # build these videos
npx tsx video/build.ts m10c-2-1 --stills         # a picture of the end of each scene, no MP4
npx tsx video/build.ts m10c-2-1 --stills --quick # the same, with the narration estimated
npx tsx video/build.ts m10c-2-1 --thumbnail      # only the thumbnail, after a design change
```

Options: `--voice af_heart` (a Kokoro voice), `--speed 1`, `--fps 30`, `--no-qa`. Narration is
cached by line, so changing one line re-voices only that line. A three-minute video takes a few
minutes to render on four cores; frames where nothing moves are drawn once and reused.

## Narration

The voice is Kokoro (82M parameters, Apache 2.0), which runs on the CPU, so narration costs
nothing however many videos we make. The default voice is `af_heart` at speed 0.85, about 150 to
155 spoken words a minute, with pauses between lines and after each new step so a viewer can read
it (`TIMING` in `src/video/timeline.ts`). The owner chose this calm pace on 14 October 2026 after
comparing it with speed 1, which was too fast. Math 10C, 10-3 and 10-4 were made at the old pace and keep
it, so a video of theirs made again uses `--pace old` (speed 1, shorter pauses). Kokoro reads numbers,
decimals and units as written ("9.4 cm", "0.75"); write maths in words ("tan theta equals x over
fifteen") and spell out letters with spaces ("triangle A B C"). Write four-digit whole numbers
with a comma ("5,280"): without one, Kokoro reads them like years ("fifty-two eighty"), and the
script check refuses them. Put a variable a or A in quotes (`"a" to the m`, `"A" x plus B y`):
bare, it is read as the article ("uh to the m"); the captions leave the quotes out, and the script
check asks for them. Say "the point at four, zero", not "the point four, zero", which is heard as
the decimal 0.40; the script check asks for that as well.
In maths, put a minus that follows a space or a label in braces (`\qquad {-3}`, `\text{Last: } {-5}`),
or KaTeX sets it as subtraction ("− 3"); the script check asks for that too. On screen, write
money in text as `\$4`, as in the lessons, and keep it out of `$...$` maths.
Words the voice gets wrong are respelled for it in `speechText` (`src/video/words.ts`): "biweekly"
is voiced as "bi-weekly", "deci" as "dessy", "break-even" as "break even" (it came out "Bray-Keevan"), "cosecant" as "co-secant" (it came out "co-second"), "GST", "HST" and "EI" letter by letter (the voice often made "GST" sound like "GSD", and "EI" like "I"), hyphenated sizes ("eight-by-twelve") as
separate words, and a lone letter with 's ("Route B's", which came out "Route B to Cast") by the
letter's name ("Bee's"); the captions keep the script's spelling. Add a word there when a check finds one.
After each build, listen to the lines that `pronunciation.txt` marks CHECK.

## Writing a script

See `src/video/script.ts` for every element and option. In short:

- Figures: `triangle` for a right triangle named from θ, and `diagram` for anything drawn from
  points: lines, angles, right-angle marks, labels, shaded regions and scenery (ground, water, a
  cliff, tower, lighthouse, building, flagpole, tree, person or boat). Name each part, then show
  and emphasise parts as the narrator mentions them (`show: ['d.sight', 'd.elev']`); hiding a part
  shown on its own swaps one label for another. Run `--stills --quick` to check the layout.
- 3-D solids and measuring tools are diagrams too, built by functions that name their parts the
  same way every time: `box`, `triangularPrism`, `cylinder`, `cone`, `squarePyramid`, `sphere`,
  `hemisphere` and their nets (`boxNet`, `cylinderNet`, …) in `src/video/solids.ts`, and `ruler`,
  `vernier`, `unitSquare`, `circle` and `inchAndCentimetre` in `src/video/measure.ts`. Put them in
  a diagram with `figure('d', [cylinder({ r: 3, h: 8, labels: { r: '3', h: '8' } })])`, then show
  `d.shape` (every edge), `d.r`, `d.h`, `d.lateral`… Name solids to combine them (a silo is a
  `cylinder({ name: 'c', top: 'front' })` with a `hemisphere({ name: 'm' })` on it: `d.c-shape`).
  Heights are orange, base lengths and radii blue, and slant heights pink in every video.
- Number figures live in `src/video/numbers.ts`: `factorTree` (it grows level by level,
  `d.level1`, `d.level2`…, and circles its primes, `d.primes`), `venn` (the primes two numbers
  share, for the GCF and LCM: `d.both`, `d.lens`, `d.union`), `numberLine` (points and spans
  placed by value), `tiles` (a rectangle of squares: a tiled floor, or 144 unit squares),
  `realNumbers` (the sets ℕ ⊂ 𝕎 ⊂ 𝕀 ⊂ ℚ beside ℚ̄, inside ℝ: `d.N`, `d.Q-ex`…) and `pattern` (a
  row of results with a step between them, like the powers of two halving as the exponent falls).
- `areaModel` (`src/video/algebra.ts`) multiplies and factors polynomials: the terms of one factor
  along the top (`d.top`), the other down the side (`d.side`), and each product in its cell
  (`d.c0-1` is row 0, column 1). As a table every cell is the same size; with `tiles: true` it is
  drawn as algebra tiles, to scale. Cells are coloured by product (x² blue, x green, numbers
  orange, negatives red) unless `tones` sets them, for example to match like terms.
- Graphs live in `src/video/graph.ts`. `plane` draws a grid and numbered axes (`d.grid`, `d.axes`),
  with equal units unless `width` and `height` stretch it (distance against time); everything on
  it goes through it: `plot(g, { id, f })` graphs a function, cut off at the edges; `polyline`
  joins points with labelled segments (`d.walk-0`); `dots` marks points (hollow with `open`).
  `arrowDiagram` shows a relation as two ovals of elements joined by arrows (`d.arrows`, `d.a0`).
  Any diagram line can take `arrow: true` for an arrowhead.
- Angle figures live in `src/video/angles.ts`: `angle` (two rays and the arc between them, a
  square mark at 90° and the long way round past 180°: `d.arms`, `d.arc`), `crossing` (two lines
  and their four angles, `d.a1`…), `transversal` (two lines cut by a third, angles numbered 1 to
  8), `clock` and `protractor`. Triangle figures live in `src/video/triangles.ts`: `triangle`
  (any triangle, side labels outside it, and for congruence `ticks` on equal sides and `arcs` in
  equal angles), `squaresOnSides` (the squares on the sides of a right triangle), `rectangle`
  (with its diagonal) and `twoTriangles` (two right triangles that share a side, drawn to scale
  from their angles of elevation: observers on `opposite` sides of a tower, two points on the
  `same` side of a cliff, with optional angles of `depression`, or `stacked` sight lines to a
  roof and an antenna; parts `ground`, `height`, `sight1`, `sight2`, `a1`, `a2`, `x`). In
  `src/video/solids.ts`, `squareColumns` draws a front or side view of stacked cubes (a column of
  squares for each height, parts `c0`, `c1`, …) and `isometricBox` draws a box in true isometric,
  with its `front`, `side` and `top` faces.
- `standardAngle` (`src/video/trig.ts`) draws an angle in standard position: the axes, the
  terminal arm and its arc (`d.arm`, `d.arc`), and optionally the reference angle (`d.ref`), a
  dashed drop to the x-axis with the triangle's sides (`d.tri`, `d.x`, `d.y`, `d.r`), the point
  `d.P` and the quadrant labels (`d.quads`). `cast` is the CAST diagram (`d.A`, `d.S`, `d.T`,
  `d.C`). `referenceAngle(deg)` gives the reference angle.
- Items drawn on a named plane (`plane({ name: 'p1', … })`) take its name as a prefix: a curve
  `c1` plotted on it is the part `d.p1-c1`. Several named planes side by side (`at`) compare
  graphs in one figure.
- `strip` (`src/video/numbers.ts`) is a fraction strip: a bar cut into equal pieces, some shaded
  (`d.shade`, `d.frame`).
- Data figures live in `src/video/charts.ts`: `barGraph` (one colour for every bar; `d.scale`,
  each bar `d.b0`, its value `d.v0`, and a dashed line `d.r0` for reading it against the scale),
  `circleGraph` (slices `d.s0`… clockwise from the top in a fixed colour order, labelled
  outside; `namesOnly` for a spinner), `tally` (bundles of five, `d.t0`…), `marbles` (a bag
  of coloured marbles, grouped by colour) and `normalCurve` (a bell curve with an axis numbered at
  each standard deviation, `d.axis`, `d.curve` and `d.mean`, and shaded regions between numbers of
  standard deviations, each a part by its id, with a percent label that `labelAt` can move).

- Explain everything as simply as possible, at the calm pace above, and give each video the time
  that takes. There is no time limit: never trim an explanation to save time, even if a video
  runs ten or fifteen minutes. A video runs at least two minutes (the build warns under that);
  about 350 to 450 spoken words makes about four minutes. Split a lesson into parts when it
  covers separate ideas, one idea per part, not to save time: `m10c-2-1` is part 1, `m10c-2-1-b`
  part 2, and so on.
- Start with a title scene, give each later scene a `chapter` (these become YouTube chapters),
  end with a "Your turn" question and a summary.
- Gradileo is for learners in every English-speaking country, not only Alberta. From Math 30-2
  on, the title scene's kicker names the topic, not the Alberta course: the unit's title and the
  part, `kicker: 'Trigonometric Identities · Part 2'` (Math 10C to 30-1 keep
  `'Math 30-1 · Lesson 6.2 · Part 2'`). The header on every frame and the thumbnail's label name
  the unit too (`labelOf` in `src/video/stage/main.tsx`). Say "this lesson" or "the next part",
  never a course name or lesson number, in the narration.
- Colours have fixed meanings: `[[theta:…]]`, `[[opp:…]]`, `[[adj:…]]` and `[[hyp:…]]` in text,
  `\thc{}`, `\opp{}`, `\adj{}` and `\hyp{}` in maths (θ yellow, opposite orange, adjacent blue,
  hypotenuse pink). Colour is never the only cue: sides are always named too.
- Check every number in the script; the video shows exactly what the script says.

## Making a course's videos, step by step

1. Script each lesson in parts (`src/content/<course>/videos/<id>.ts`, then `<id>-b`, `<id>-c`…),
   with as many spoken words as the simplest explanation needs (`video/tools/words.sh <files>`;
   350 to 450 words makes about four minutes). Check the scripts with
   `npx vitest run src/video/scripts.test.ts -t "<id prefix>"`.
2. Check the layouts: `npx tsx video/build.ts <ids> --stills --quick` (in a cloud session, set
   `CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome` and `NODE_USE_ENV_PROXY=1`),
   then `python3 video/tools/contact-sheet.py sheet.png <ids>` and look at every still: no clipped
   maths, overlapping labels or cut-off questions.
3. Render unit by unit: `video/tools/render-units.sh <course dir> <unit id>...` (for example
   `video/tools/render-units.sh math20-1 m201-u4 m201-u5`) renders each unfinished video one at a
   time, about six minutes each on four cores, and uploads each unit to Drive once all of its
   videos are done (step 6). A session restart stops background jobs, so run the same command
   again after one: finished videos are marked (`video/out/<id>/.rendered`) and skipped. In a
   cloud session, run it as a tracked background task (an idle session is reclaimed, which kills
   detached jobs) with `RENDER_MINUTES=110` so it stops cleanly between videos before the
   two-hour limit on such tasks, then run it again. Commit
   `src/content/videos.json` as units finish. (`npx tsx video/build.ts <ids>` builds given videos
   directly.)
4. Check the narration: `python3 video/tools/pronunciation.py video/out/<id>/pronunciation.txt …`
   lists the lines whose words really differ. Try a respelling with
   `npx tsx video/tools/hear.ts "the line"` and add real mistakes to `speechText`.
5. Run the checks in `CLAUDE.md`, open the pull request and merge it.
6. Upload the videos to the owner's Google Drive, unit by unit as they render:
   `npx tsx video/tools/drive-upload.ts m201-u1` (a unit id), `math-20-1` (a whole course) or
   video ids. Each video lands in `Gradileo videos/<course>/Unit <n> – <title>/<NN>-<id>/` with its
   MP4, thumbnail, captions and YouTube text; `NN` is its place in the unit. Files already in Drive
   with the same contents are skipped, so a run can be repeated; `--dry-run` shows where each would go.
   If Drive is not set up, make zip packs instead: `video/tools/pack.sh <course>-unit<N> <ids in
   order>` gives one zip per video (each well under 30 MB) and one for the whole unit.
7. Keep room on the disk by moving finished courses to Drive. A cloud session has a fixed disk
   allowance, and a course leaves about 40 MB a video in `video/out/` and `video/.cache/`; with
   too little left, a render or the browser tests fail with "no space left on device". The owner
   wants finished videos cleared once Drive holds them, so when free space (`df -h /`) falls
   under about 6 GB, run `video/tools/free-disk.sh math-20-1 math-20-2` (course ids). For each
   course it runs the upload again, and only when every scripted video is reported with all four
   files `unchanged` (identical copies in Drive) does it delete the course's narration
   (`video/.cache/<id>.wav`) and rendered folders (`video/out/<id>/`); `--dry-run` reports what
   it would free. Never clear the course still rendering: `render-units.sh` would start it again.

Lessons learned while scripting (the script check does not catch these):

- Write years in words in the narration ("twenty nineteen"); a bare four-digit number is refused,
  and a comma would make it a quantity.
- Do not give invented people a pronoun unless the lesson does; use their name again.
- Keep a "Your turn" question in a `center` scene: in a `split` scene it is cut off.
- Spread the correct "Your turn" answer over A, B, C and D from video to video: the lesson player
  asks the question with the choices in the video's order, so an answer that is always A gives
  itself away (Math 10C to 20-4 mostly have A; from Math 30-1 on it varies). Name the right
  letters in the answer line, and write "Choice A" when a sentence starts with it, or the voice
  reads it as the word "a".
- Chapter titles cannot contain `$`.
- Keep bar graph category labels to a word or two, or they overlap.
- Break long maths over several lines (or narrow `leftWidth`) so it fits its column; give a
  crowded figure its own scene.
- The voice blurs a few phrases into other words: "In proofs" (heard as "Improves"), "Congruent
  figures" ("Congrant"), "prove congruence," ("Congress"), "the rate r" ("the radar"), "halve" ("have"), "boy" ("buy" or "by", whatever the spelling: use other groups, such as teachers and students), "Rewrite"
  at the start of a sentence ("We're right") and the name Rhea ("Rhea takes" came out "retakes";
  Maya is clear). A set or point named "A" that starts a sentence before a lowercase word ("A
  equals…") is read as the word "a": write "Set A equals…". When a key term is blurred, reword
  the line ("Figures that are congruent…") and check it with `video/tools/hear.ts`.
- Use `\dfrac` for fractions in Math 20-4 maths lines, and state every rate, tax or rule inside
  the question (see `CLAUDE.md`).

### Google Drive

`drive-upload.ts` signs in with three environment variables, `GDRIVE_CLIENT_ID`,
`GDRIVE_CLIENT_SECRET` and `GDRIVE_REFRESH_TOKEN`, from an OAuth client in Google Cloud with only
the `drive.file` scope. With that scope the tool sees only the files and folders it created
itself, so make the `Gradileo videos` folder with the tool, not by hand. In a cloud session, set
the variables in the environment's settings (not in the repository, which is public); a session
started after they were added sees them. The tool never prints their values.

## Uploading to YouTube

`youtube.txt` leads with the topic: the title is the video's own title and the brand, and the
description gives the topic, the level in terms used around the world ("Grade 12 / Year 13 ·
pre-calculus"), the chapters and, last, the curriculum it follows (Alberta Math 30-1, lesson 1.1).
When that wording changes (`src/video/youtube-text.ts`), write it again for every finished video
and replace it in Drive, with no rendering, even for courses already cleared from the session:

    npx tsx video/tools/drive-upload.ts --text-only math-10c math-20-1 …

For videos already on YouTube, `video/tools/youtube-update.ts` brings their title, description
and tags up to date through the YouTube API (no uploading again). It finds each video's script by
its title, and by the course in its description when two scripts share a title, and changes only
what differs; `--dry-run` lists the changes first:

    npx tsx video/tools/youtube-update.ts --dry-run
    npx tsx video/tools/youtube-update.ts

### YouTube API

`youtube-update.ts` signs in with `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET` and
`YOUTUBE_REFRESH_TOKEN`, set in the environment's settings like the Drive ones (a session started
after they were added sees them). They come from a Google Cloud project with the YouTube Data
API v3 enabled, the `youtube.force-ssl` scope on its consent screen (published **In production**,
or the sign-in lapses after 7 days; it does not need Google's verification, since only the
channel's own account signs in), and a Web application OAuth client whose refresh token was made
in the OAuth 2.0 Playground while signed in as the channel. The API allows 10,000 units a day; an
update costs 50, so about 200 videos a day. Uploading through the API is possible too, but videos
uploaded by a project Google has not audited stay private.

1. Upload `<id>.mp4` to the Gradileo channel.
2. Copy the title, description and tags from `youtube.txt`.
3. Set `thumbnail.png` as the thumbnail.
4. Upload the captions: in YouTube Studio, **Subtitles → Add language → English → Upload file →
   With timing**, and choose `captions.srt`. YouTube's automatic captions come from speech
   recognition and get maths words wrong ("sign" for sine, "data" for theta) or arrive late; ours
   follow the script word for word, timed to the narration. The lesson player shows captions from
   the start.
5. In Gradileo, open **Admin console → Videos** and paste the video's YouTube link. Its lesson
   then shows the video and pauses at each "Your turn" to ask the question, and present mode
   plays it on a slide of its own just before the lesson section it teaches (part 1 opens the
   lesson; a later part goes to the section its title names). Teachers can hide it there, like
   any other part, with **Choose what to show**.
