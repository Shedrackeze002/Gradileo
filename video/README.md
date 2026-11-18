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
npx tsx video/build.ts m10c-2-1 --stills --at 48.5,51  # and a picture at these seconds too
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
Kokoro voices at most about 510 phonemes at once and silently drops the rest, which a long line
full of decimals can pass (a 60-word answer line lost its last five words). `narrate.ts` counts each
line's phonemes with Kokoro's own tokenizer and voices a longer line in parts of whole sentences,
joined with a sentence's pause; a single sentence too long to voice stops the build. Whisper hears
30 seconds at a time, so the check transcribes a longer line in overlapping windows.
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

- `motion` (`src/video/motion.ts`) is for physics, and for anything that has to be seen moving:
  blocks, carts and balls on straight tracks, moved by the forces drawn on them. A clip is a list
  of phases; in each phase the forces listed act, every body accelerates at a = F ÷ m, and the
  arrows, velocities, strobe marks, momentum bars and graph all come from that one calculation, so
  the picture cannot disagree with the physics. A line plays a clip while the narrator speaks
  (`play: 'sim.push'`, with `playDelay` seconds to start it on the right word) and the next line
  waits for it to end; the next clip carries on from where the last one stopped, and a clip with
  `reset` puts the bodies back first. A phase with `freeze` holds everything still while its
  forces appear, to name them before anything moves; `slow: 100` plays a phase in slow motion;
  a force with `resist` is friction (it stops with the body). `collision(a, b, …)` gives the three
  phases of a collision (approach, touch, after) with the equal and opposite forces that change
  the velocities, so momentum is conserved by the forces, not typed in. Showing the element shows
  the tracks and bodies; its parts add `velocity`, `readout` (acceleration), `net` (net force),
  `strobe`, `clock`, `graph` (velocity against time, drawing itself, or distance against time
  with `graph: { y: 'distance' }`, or the body's position on the ruler with `y: 'position'`; a
  `min` below zero lets a velocity or a position go under the time axis, for a body that turns
  round), `distance` (how far each body has travelled, with its path
  drawn leg by leg under a single track), `displacement` (an arrow under a single track from where
  the body started to where it is now, with its sign) and `bars` and `total` (momentum). The
  displacement's label sits beside its arrow, so leave about 300 px of track free on one side.
  `speedWord: true` writes "speed =" beside the velocity arrow, for videos that come before
  velocity is taught. `plain: true` makes a sketch of it, not a measurement: no rulers, forces
  named without their sizes, and balls that carry their label inside (two charges that repel or
  attract). Before forces are taught, move bodies with the helpers in
  `src/content/phys10/videos/lib/track.ts` (`run`, `halt`, and `drive` and `brake`, forces that
  act without an arrow). `vertical: true` turns the track to point down the screen, for a drop: a
  body's `x` is then the distance it has fallen, each lane is a column with a ruler and the ground
  at its foot, weight (a positive force) hangs below the body and what resists the fall rises from
  its top, and the graph takes the right half. A force with `drag` is air resistance: `drag`
  newtons for each metre per second, so it grows with the speed and the body closes on its
  terminal velocity (weight ÷ drag). A fall never quite reaches that velocity, and the two forces
  agree to the nearest newton only after about seven times (mass ÷ drag) seconds: run the clip that
  long, with `slow: 0.5` (and a `note` saying so) to play a long fall twice as fast. A force with
  `hidden` acts without an arrow. A part of a motion can be hidden again while the motion stays
  (`hide: 'sim.readout'`). `vertical: 'up'` is a lift: a body's `x` is its height above the
  ground, so weight is a negative force, and two forces the same way (weight and friction) are
  drawn side by side; let the span run a little past the top of the lift, for the arrow over the
  body. `path` is a curved track (`src/video/path.ts`, drawn by `stage/MotionPath.tsx`): a hill
  through `points` (in metres across and up; it never overshoots them, so tops and valleys are
  where you put them, and two points make a straight ramp) or a pendulum (`swing`, a length and
  the largest angle). A body's `x` is then its distance along the track, gravity (`g`) pulls it
  along the slope, and a force acts along the track; the parts are `velocity`, `height`,
  `energy`, `total` and `clock`. `energy` adds energy bars, measured from the motion itself:
  `work` (done by the forces that push or lift; the force named "Weight" is gravity and is not
  counted), `kinetic`, `potential` (m × g × height: on a path, or in a drop or a lift with `g`
  given), `heat` (what friction and air resistance have taken) and `total`, which comes in with
  its own part (`sim.total`). `max` is the largest energy a bar must hold; `names` renames a bar
  ("Energy supplied") and `labels` names each body when several are listed in `of`. The bars sit
  under a track or a hill and beside a drop, a lift or a pendulum. A bar whose `max` is 100 J or
  more is written in whole joules, and a large one in kilojoules, so choose numbers whose total
  does not sit on a rounding boundary (151.15 kJ flickers between 151.1 and 151.2).
  A force with a `profile` changes as the body moves: its size at distances from where the body
  started, as `[metres, newtons]` points joined by straight lines. The work it does is the area
  under those points, and `graph: { y: 'force', metres: … }` draws the force-displacement graph
  of one body, which fills in as the body moves with the work done so far written over it (`area`
  renames it). `spring` puts a spring between the wall at the left end of a single straight track
  and one body (`k` in newtons per metre, and `rest`, where the centre of the body is at the
  natural length). It obeys Hooke's law in every phase without being listed among the forces: it
  is drawn as a coil with its force as a violet arrow named "Spring", the part `extension` writes
  x under the track, the energy bar `elastic` is ½kx², and the force graph plots its force
  against its extension. `loose: true` is a launcher: it pushes while it is compressed and lets
  go of the body at the natural length. With `vertical: true` the spring hangs from a beam over a
  drop, and `rest` is how far down the foot of the body is at the natural length; the body then
  settles mg ÷ k lower. A spring on its own swings for ever, so to bring a body to rest where the
  forces balance, add a hidden force with `drag` (the lesson's numbers are not changed by it).
  Hold a body against a spring with a force towards the wall; it is drawn above the coil. To stop a motion at a moment
  worth talking about (the top of a hill, the bottom of a swing), end the clip there: find the
  time with a few lines of `motionAt` in a scratch file. A hill takes its scale from the smaller
  of the room across and the room above the bars, so a low wide hill needs a tall element (about
  440 px with three bars), and a hill with four bars fits best on the left of a split scene. A
  hill that is tall for its width is drawn beside the title on the thumbnail. The note of a phase
  ("Slow motion") sits at the top centre of the picture: give the element about 440 px of height
  so that a velocity label does not pass under it. Colours are fixed in every physics video: velocity green, net force and
  total momentum yellow, friction red, an applied force orange, weight pink, the normal force
  blue, displacement violet, and the path travelled pale grey; in the energy bars, kinetic
  energy is green like velocity, potential energy pink like weight, work orange like an applied
  force, heat red like friction, and the total yellow.
  For an oscillation, give `equilibrium` (where the body rests, on a single straight track or over
  a single drop): displacement is then measured from there, the ruler is numbered from there, and
  the parts are `displacement` (an arrow from there to the body), `amplitude` (the two extremes)
  and `count` (the complete oscillations of a body let go from rest, also for a pendulum);
  `graph: { y: 'displacement' }` traces the displacement against time, and `cm: true` writes
  displacements in centimetres. A pendulum also has `length` (of its string) and `restoring` (the
  weight of the bob, and the part of it along the swing that pulls the bob back). `spring: { hidden: true }` leaves the coil's force arrow off, for a
  video that comes before the forces are taught. Pendulums side by side are drawn to one scale
  when the shorter one's `swing` has `room`, the length of the longest. A period comes out exact
  when the numbers are chosen for it (k = 4π²m gives 1 s), so a clip of whole periods ends where
  it began.
  Check a motion part way through with `--stills --quick --at 48.5,51` (times in seconds).
  The owner asked (14 November 2026) that science videos show the idea happening, not narrate
  over still slides: in physics, every scene that describes motion or a force plays it.

- `wave` (`src/video/wave.ts`) is for travelling waves. Each lane is a strip with a source at its
  left end, and everything comes from one rule: a place does what the source did the travel time
  ago. A `transverse` lane is a rope whose beads move up and down; a `longitudinal` lane is a tube
  of particles that move back and forth and crowd into compressions. A lane has a `frequency`
  (hertz), an `amplitude` and a `speed` (metres per second), so its wavelength is the speed ÷ the
  frequency; `full: true` fills the strip from the start, and otherwise the wave runs in from the
  source. The waves move only while a clip plays, and stand still between clips, to be measured.
  A phase can `set` a lane's frequency or amplitude, and the change travels in from the source
  (a higher frequency arrives as a shorter wavelength); `slow` plays it in slow motion.
  `reflect: true` bounces the wave back from the right end, for an echo (send a short burst by
  setting the amplitude to 0 after a moment). Showing the element shows the strips; the parts are
  `particle` (one marked point, at `mark`, and the line it keeps to), `amplitude`, `wavelength`,
  `count` (a post at the mark and the complete waves that have passed it), `speed`, `frequency`,
  `front` (the front of a wave that started at the source, and how far it has travelled),
  `labels` (crest and trough, or compression and rarefaction) and `clock`. Show the measures on
  a wave that is standing still: on a moving wave they jump from crest to crest. `values: false`
  leaves the numbers off, for a picture that is not to scale (the electromagnetic spectrum), and
  `ruler: false` leaves out the ruler. Lanes of one kind share a scale, so a louder sound looks
  larger beside a quieter one.
  A lane with `frequency: 0` and `pulses` carries single humps instead (a `height`, negative for a
  trough, and a `width` in metres; `from: 'right'` sends one from the other end, and `at: -width /
  (2 × speed)` makes its middle leave as the clock starts, so `front` and the clock give an echo's
  distance and time exactly). `reflect: true` is a fixed end, which turns a pulse over, and
  `reflect: 'free'` a free end on a ring, which does not; `medium: { from, speed }` is a second
  rope from `from` on, which sends part of a pulse back and the rest on. The parts for pulses are
  `pulses` (each pulse on its own, dashed), `sum` (the height where they overlap), `heights` (the
  signed height of each hump), `pull` (the pair of forces between a rope and a fixed end) and
  `motion` (how fast each bead is moving, which shows where the energy is when a crest and a
  trough cancel). `standing: { loops }` is a standing wave on a string with a node at each end,
  and on a `longitudinal` lane `standing: { quarters, length }` is the air in a tube closed at the
  left: the lane's `frequency` must be the one that fits (the check says what it is). `beyond`
  puts the antinode a little outside the open end, as in a real tube. Their parts are `nodes`,
  `loop` (half a wavelength) and `length`. A steady wave with `reflect` builds its own standing
  wave as the reflection comes back. A standing wave freezes wherever its clip ends, so end clips
  a quarter of a period after whole periods (`(n + 0.25) / f`), when it is at its widest. `clock:
  { unit: 'ms', seconds: 0.001 }` counts in another unit.

- `ripples` (`src/video/ripples.ts`) is for waves seen from above, spreading in circles. Give the
  `view` (left, bottom, right, top, in metres), the `speed` of the waves, the `sources` (each `at`
  a place, with a `frequency` and perhaps a `velocity`) and the `listeners`. Every crest is a
  circle around the place where its source was when it sent that crest, which gives both
  interference (two sources in step) and the Doppler effect (a source that moves). `full: true`
  fills the picture from the start; otherwise the sources start at time 0. `every: 2` draws one
  crest in two, where real sound has too many for the picture. A phase can `move` a listener to a
  new place. The parts are `paths` (from each source to the first listener, with lengths),
  `difference`, `traces` (the waves that arrive there and their sum), `loudness`, `pattern` (the
  whole picture shaded by how large the summed waves are), `wavelength` (in front of a moving
  source and behind it), `centres` (where each crest was sent from), `velocity`, `heard` (the
  frequency each listener receives from a moving source), `count` (the crests each listener has
  received since time 0, for comparing listeners over the same time) and `clock`. The first four
  are written in a panel on the right, which appears when the picture leaves 380 px beside it:
  choose the shape of the `view` for that (a wide view fills a centre scene and has no panel). A
  source may be faster than its waves when there are no listeners, to draw a shock wave. Choose
  numbers that come out round on the labels (2 Hz at 6 m/s from a source at 2 m/s is heard as
  3 Hz and 1.5 Hz), and use the lesson's real numbers with heavy slow motion (`slow: 100`) for
  the worked examples.

- `flight` (`src/video/flight.ts`) is for motion in two dimensions, drawn to one scale so that
  every angle on screen is the true one. Give the `view` (left, right, bottom, top), the bodies
  (each with where it starts, `at`, and its starting velocity, `v`) and the clips, whose phases
  can `set` a velocity, `freeze`, play in slow motion or `stop` a body where it is. There are
  three scenes. `ground` (the default) has a ground line with a ruler; with `gravity` a body in
  flight keeps its horizontal velocity, gains g of downward velocity each second and stops where
  it lands, a phase can `release` a body held at rest, and a `ledge` gives it somewhere to start
  from. `river` has water between two banks; with a `stream` every body moves with its own
  velocity plus the stream's (a boat points the way it is steered, not the way it travels), and
  streaks drift with the current. `map` has a grid and a compass, for displacements. The parts
  are `velocity` (green), `components` (its horizontal part blue and its vertical part orange,
  each changing on its own), `own` (in a stream: the body's own velocity in blue and the
  stream's in pink, head to tail, so that the green velocity closes the triangle), `trail`,
  `strobe`, `shadows` (a mark that follows the body along the ground and one that follows it up
  the wall, to take the two motions apart), `displacement` (purple, from where the body started),
  `legs` (the two parts of the displacement), `angle`, `readout` (the numbers for the arrows
  shown, in a column kept by giving `readout: {}`) and `clock`. To read the arrows of a
  projectile as it lands, end the clip a moment before the landing time (`landingTime`), since
  a body that has landed is at rest. Arrows that point down from a body near the ground need
  room under the picture (`below`). A river has a ruler along its bank when `tick` is given.

- `ramp` (`src/video/ramp.ts`) is for blocks on a surface, level or tilted: a box pushed across a
  floor with friction, a block on an inclined plane, blocks tied by strings, a block pulled by a
  body that hangs over a pulley (`hanging`), or two hanging bodies (a surface at 90 degrees, which
  is not drawn). Give the `angle` and `length` of the surface, the bodies (each with a mass and
  where it starts, `x`), the coefficients of `friction` (static, then kinetic) and the clips.
  A phase gives only the pushes and pulls (`forces`, each `on` a body, with an `angle` from the
  surface when it slants); the weight, the normal force, static or kinetic friction, every
  tension and the motion are worked out from them, so the arrows always agree with the numbers of
  the lesson. A phase can also `freeze` (to name the forces before anything moves), play in slow
  motion, `set` a velocity or `tilt` the surface steadily (a block that stays put until the slope
  is steep enough). The parts are `weight`, `normal`, `friction`, `tension`, `components` (the two
  dashed parts of the weight on a slope, and of a push at an angle), `net`, `velocity`, `readout`
  (the acceleration), `clock`, `strobe`, `distance` (an arrow along the surface from where the
  block started, with the metres moved) and `work`. `work: { rows, range }` adds bars of the work
  each force has done on one block, measured as the block moves: the part of the force along the
  motion times the distance, so friction's bar grows to the left of zero, the normal force stays
  at nothing, and "Net" (their sum) is the kinetic energy gained. `rows` names the forces in
  order ("Weight", "Normal force", "Friction", "Tension", the name of a push or a pull, "Net")
  and `range` is the least and the greatest work a bar must hold. The bars take room under the
  picture, so a ramp with long arrows and bars goes on the left of a split scene with a larger
  `pad` and a smaller `forceScale`. `balanced` lists blocks whose weight and normal force
  are never drawn, `raise` stands the surface on a table, and `g` moves the block to another
  world. The picture takes its scale from the room left by `pad` (pixels kept clear above the
  surface and under the ground): long arrows need a larger pad or a smaller `forceScale`, and when
  the labels of the weight and the normal force crowd a moving block, hide those two parts as it
  goes.

- `forces` (`src/video/forces.ts`) is for one object with forces that point any way in a plane.
  Without `cables` it is seen from above on frictionless ice: the forces of the phase being played
  (each with a size and an `angle` anticlockwise from east) are drawn from its middle, they add
  to a net force, and it moves off along that force. With `cables` it hangs at rest from two
  cables at those angles above the horizontal: the weight is known, the two tensions are worked
  out from the angles, and they change as a phase tilts the cables (flatter cables, larger
  tensions). The parts are `components` (the two dashed parts of every slanted force, head to
  tail), `net` (with its size and its angle), `velocity`, `readout` (the speed and the
  acceleration, as numbers), `trail` and `clock`, and for a hung object `weight`, `tension` and
  `angles`. Beside a slanted push, show `readout` and not `velocity`: the velocity arrow lies
  along the net force and crosses its label.

- `gravity` (`src/video/gravity.ts`) is for bodies in space that attract one another: universal
  gravitation, gravitational fields and, later, orbits. Give the `view` in metres (left, right,
  bottom, top) and the bodies, in kilograms and metres; a body with a `radius` is a planet drawn
  to scale, and one without is a small ball. Every force and field strength is worked out from
  Newton's law with G = 6.67 × 10⁻¹¹ N·m²/kg², and follows as a clip carries a body somewhere
  else (`to`) or changes its mass (`mass`), so the inverse square law is seen and not only said.
  The parts are `force` (the pull on each body; the two pulls of a pair are always the same
  length), `distance` (r, between the centres of the first two bodies), `radius` and `height`
  (of the first body, and of the second above its surface), `field` (arrows of the first body's
  field, shorter where it is weaker) and `g` (the field strength where each other body is).
  `pulls` limits which bodies get an arrow, `notation: 'sci'` writes every force in scientific
  notation, `figures` sets the significant figures of a distance, and `unit` writes distances in
  another unit (`{ metres: 6.37e6, symbol: '× Earth radius' }`). To make a pair attract with a
  round number of newtons, work one mass out from the other in the script. Bodies can also move
  freely under gravity while a phase lets time run (`fly: true`, at `rate` seconds of motion for
  each second of video): a body with `orbit: true` starts in a circular orbit round the first
  body at the speed √(GM ÷ r), which is worked out; a body with a velocity `v`, or one that a
  phase throws (`launch: { ball: [right, up] }`), falls until it lands on a planet or goes round
  it, and the path of an earlier throw stays on the picture, faded, to compare. `mountain` puts a
  mountain on the first body to throw from (Newton's cannon). The parts for these are `velocity`,
  `trail`, `orbit` (the circle of each orbit), `clock` (in the unit given by `clock`, such as
  minutes or days) and `turns` (the orbits completed). A view more than about
  2.4 times as wide as it is tall is drawn under the title on the thumbnail, and a square one
  beside it.

- `circle` (`src/video/circle.ts`) is for uniform circular motion: bodies that go round a circle,
  seen from above on a level surface, where each keeps a steady speed, or with `vertical: true`
  on a circle that stands upright, where gravity slows a body as it climbs and speeds it up as
  it falls. Give each body its mass, the radius `r` of its circle and its `speed` (or its
  `period`); the centripetal acceleration v² ÷ r and the forces are worked out from them. `by`
  says what turns the bodies: a `string` (tension, and the string is drawn), `friction` (a car on
  a road, `shape: 'car'`) or a `track` (the normal force of a loop). A phase can change a speed
  steadily (`speed`), play in slow motion, `freeze`, or `release` a body (the string breaks, the
  tyres lose their grip), which then carries on in a straight line along the tangent. The parts
  are `velocity` (green, along the tangent), `accel` (towards the centre), `force` (the real
  forces: the one named by `by` and, in a vertical circle, the weight), `net`, `radius`,
  `tangent`, `trail`, `strobe` (marks every eighth of a turn, with their arrows), `readout` (the
  speed and the acceleration as numbers), `period`, `meter` (the force needed beside the greatest
  the string or the road can give, `limit`), `clock` and `turns`. `disc` draws a turning platform
  under the bodies (a roundabout), and `shift` moves the centre sideways to leave room for a body
  that is let go.

- `rays` (`src/video/rays.ts`) is for light meeting a surface: a `mirror`, where the angle of
  reflection equals the angle of incidence, or a `boundary` between two materials with their
  `speeds`, where the angle of refraction follows from them (the slower material is shaded). A
  clip turns the incoming ray (`to`, in degrees from the normal) and the outgoing ray follows;
  the sizes of the angles are written at the edges, where they can be read while the ray turns.
  The parts are `normal`, `angles`, `toSurface` (the angle to the surface, which is not the angle
  of incidence), `fronts` (a wide beam whose wavefronts march while a clip plays, closer together
  where the wave is slower, each front in one piece across the boundary) and, on a mirror with
  `behind: true`, `image` (the lamp's image, as far behind the mirror as the lamp is in front).
  Light is yellow, the angle of incidence blue, reflection orange and refraction pink.

- `circuit` (`src/video/circuit.ts`) is for electricity: a battery of `volts`, a switch, and up to
  four `parts` (each a `lamp` or a `resistor` with its `ohms`), in one loop (`layout: 'series'`)
  or each on its own branch across the supply (`'parallel'`). Nothing is typed in: the currents,
  voltages and powers follow from the supply voltage and the resistances, so the readings on
  screen are right by construction, and a lamp glows with the power it gets (`bright` sets the
  power of a fully bright lamp, when two circuits are compared). The charges drawn on the wires
  move only while a clip plays, at a speed in proportion to the current where they are, so they
  split at a junction and speed up when the current rises. A phase can `set` the switch
  (`closed`), the supply (`volts`), a resistance (`ohms`) or the components that have failed
  (`broken`); `open: true` starts with the switch open. The parts are `charges`, `energy` (the
  charges are bright where they still carry energy and dim once they have given it up), `arrows`
  (the direction of conventional current; with `carriers: 'electrons'` the charges are electrons
  drifting the other way), `current` (ammeters and their readings), `voltage` (in a loop, a
  voltmeter across each component), `power`, `charge` (a counter of the charge passed, for
  Q = It), `transferred` (a counter of the energy transferred, for E = Pt) and `clock`. To compare
  two circuits, put one on each side of a `split` scene with `leftWidth: 544`. Charge and
  current are yellow, electrons blue, voltage pink and power orange.

- `particles` (`src/video/particles.ts`) is for chemistry: boxes of particles that really move.
  Each box is a small simulation in which the particles pull on their neighbours and push apart up
  close, and a thermostat holds the box at its temperature, so a cold box settles into rows that
  vibrate (a solid), a warmer one slides about at the bottom (a liquid) and a hot one flies apart
  and fills the box (a gas). Nothing is drawn by hand, so heating a box melts and then boils it on
  its own. Give each box a `state` (and `n`, `width`, `height`, `temp` if needed), a `piston` or an
  `open` top, `kinds` for a mixture (each with its colour) and `follow` for a particle drawn in
  yellow. The particles move all the time the element is on screen; a line plays a clip
  (`play: 'p.heat'`) whose phases move temperatures (`heat: { b: 'gas' }`) or lids
  (`lid: { b: 0.5 }`, a fraction of the box's height) steadily over `dur` seconds, and the next
  line waits for it. A lid cannot squash a solid or a liquid: it stops on them. Parts: `labels`,
  `trail` (the followed particle's path), `hits` (a flash where a particle hits a wall), `rate`
  (wall hits each second), and, when the element sets them up, `thermo` (`thermometers: true`),
  `gauge` (`gauge: { box, start }`, a pressure in kPa that follows P × V and the temperature, so
  it agrees with the numbers said) and `volume` (`volume: { box, start }`, in litres).
  Thermometers can carry marks (`thermometers: { marks: [{ at: 0.33, label: 'melts' }] }`; this
  simulation melts at about 0.33 and boils at about 0.9). More, for heat and mixing:
  - `divider: 0.5` stands a wall across a box (with `apart`, each kind starts on its own side) until
    a phase lifts it (`lift: ['b']`): two gases or liquids then mix by diffusion.
  - `bath: 'left' | 'right' | 'floor'` heats or cools only a strip along that side (tinted red or
    blue); the rest of the box gets the heat by particles bumping into one another, so a bar
    conducts heat along itself and a gas condenses on a cold wall.
  - `heatColor: [cold, hot]` colours each particle by how fast it moves, blue to red.
  - `insulated: true` holds no particle at a temperature once the box is seen (a calorimeter):
    energy only passes between particles as they collide. A kind can start at its own temperature
    (`temp` on the kind: a hot metal lump in cold water), and the thermometer reads the kinds
    without one. Give a heavy kind a large `mass` (30 slows the heat passing on to about ten
    seconds) and divide its `heavy` by that mass, or the strong pull on it pumps energy in.
  - `electrodes: { left, right }` puts an electrode down each side wall (a cell). A phase turns
    the current on with `power: { b: 1 }`, and kinds with a `charge` then drift: positive ones to
    the left electrode (the cathode) and negative ones to the right (the anode). Each electrode
    has `rules` (`{ kind, to, stick?, chance? }`: a particle of that kind touching it becomes
    `to`, and with `stick` stays on it as a coating up to a few layers thick), `plate: { kind, n }`
    to start it coated, and `dissolve: { kind, to, chance? }` to let its coating leave as ions,
    now and then with a `chance` (a zinc anode in a voltaic cell, where 0.0012 at power 0.4 loses
    a few atoms in 16 seconds), or, without one, an atom for each one the other electrode gains
    (electroplating). `label` is written above it. Give a gas that forms an `escape` list so only
    it leaves by the open top. Chemistry 30's `lib/c30-cells.ts` has molten salt, aqueous,
    plating and voltaic cells to copy.
  - `flow: { from, to }` on the element, with the part `flow`, draws an arrow of heat between two
    boxes side by side that thins as their temperatures meet.
  - `expand: 0.8` lets a solid's particles settle further apart as it warms (more than a real
    solid, so it shows), and the part `width` draws a bracket over it with dashed marks as wide
    as it was at first. Keep such a solid low and wide (`cols`), below about 0.15, or its rows slide.
  - `bare` draws no box (a metal bar) and `cols` sets the particles to a row as they start.
  More, for dissolving:
  - Each kind can have its own `bond` (how strongly its particles hold on to one another, 1 by
    default) and `heavy` (how strongly gravity pulls it), and a box's `cross` sets how strongly
    the first kind and the others attract. With a `cross` above the solute's own `bond`, water pulls
    a lump apart (sugar: `bond: 1.5, heavy: 0.2, cross: 1.8`); much weaker, it stays whole (sand:
    `bond: 4, heavy: 3, cross: 1`). Water dissolves well with `heavy: 0.2` at a temperature of 0.7.
  - `lump: true` (or a number of smaller lumps) starts the first kind as a lump on the floor, and
    `hold` keeps it still until a phase lets it go (`release: ['b']`), so it is seen dropping in.
  - `above: 0.3` starts the lump on top of the liquid instead of on the floor, held just clear of
    it (`hold`), so a `release` drops it in: give it `bond: 10` so it stays whole, and a large
    `heavy` (10) to sink it or a small one (0.1) to float it, in water at about 0.47. `level: true`
    on the box, with the part `level`, draws a yellow line at the liquid's surface and a dashed one
    where it started, so the rise when a stone sinks is seen (displacement: Chemistry 7's
    `c7-1-3.ts`, floating and sinking in `c7-1-4.ts`).
  - `lumpMix: 2` builds the lump from two kinds, kind 0 and kind 2, set out alternately as in a
    salt crystal (give kind 2 `n: 0` among the kinds and the ions it adds come from kind 0's count
    split between them); `hold: [0, 2]` holds both.
  - A phase's `stir: { b: 2 }` swirls the box (a rod is drawn), and `stir: { b: 0 }` stops it.
  - The part `count` shows "8 of 14 dissolved" under each box: particles of the first kind that
    have broken away from the lump (a dissolved particle stays counted until it joins a real lump
    again, so a few that brush together do not make the count jump).
  - `speed: 4` on the element runs the simulation faster than usual, as real dissolving is slow.
  - `pairs: [{ kinds: [0, 2], bond: 4 }]` sets how strongly two kinds attract in place of `cross`:
    a crystal of low solubility (silver chloride) keeps its ions held tightly together while each
    feels water only weakly (`cross: 1`).
  - `key: true` on the element keeps room to the right of the boxes for a key, a dot in each named
    kind's colour with its name (the part `key`), so viewers can tell the ions apart.
  - `reserve: [2, 3, 4]` keeps those kinds out of the box at first, in a burette drawn above it, and
    a phase's `add: { f: 8 }` pours that many units in over the phase from the burette's tip, one
    molecule or particle at a time, taking turns between the kinds (a sodium ion, then a hydroxide
    ion). `indicator: { acid: [0], base: [3], tone: 'hyp' }` tints the box once none of the acid
    kinds is left and some of the base is, as at the endpoint of a titration (`titrating` in
    `src/content/chem20/videos/lib/c20-particles.ts`).
    Into a liquid, each unit waits until the one before has moved clear of the tip, and what starts
    in the box is packed at the bottom: pour a liquid that does not mix (`cross: 0.3`, the poured
    kind's `bond: 2`) onto water at 0.5, and a light one (`heavy: 0.6`) lies on top while a dense
    one (`heavy: 5`) sinks through (`layers` in Chemistry 7's `c7-1-4.ts`).
  - A reaction's `chance: 0.001` lets only that fraction of meetings react (checked at every step
    while two particles touch, so keep it small), for a slow reaction, or one that runs both ways
    at steady rates and settles part way: an equilibrium. Give such reactions `reach: 1.15` so that
    only touching particles count, or a crowded box reacts at once. See `n2o4` in
    `src/content/chem30/videos/lib/c30-particles.ts` (nitrogen dioxide pairing up, with the
    pairs splitting again through `breaks`, below). With few particles the count flickers by a few around
    its settled value; say so in the narration.
  - A box's `breaks: [{ kinds: [1, 1], to: [0, 0], chance: 0.0001 }]` lets a molecule fall apart
    by itself: each step a bond between those kinds snaps with that chance. Unlike a reaction it
    needs no meeting, so squeezing a gas speeds up pairing but not splitting, and the mixture
    shifts towards fewer molecules, as Le Chatelier says. With `energy` the chance is multiplied
    by e^(−energy/T), so it splits more when hot. See `n2o4Stress` in
    `src/content/chem30/videos/lib/c30-particles.ts` (adding, squeezing, heating and cooling).
  - Choose seeds by running the simulation in Chromium, not Node: the two can differ in the last
    bit of some maths functions, a reacting box magnifies that, and the video is drawn in
    Chromium. A seed that finishes a reaction in a Node probe may leave a particle over in the
    video, so check with stills (or bundle the probe with esbuild and run it in the browser).
  More, for separating mixtures:
  - A kind's `size` (its diameter, 1 by default) makes grains bigger or smaller.
  - `filter: { at: 0.5, holes: 1.3 }` lays a filter or sieve across the box at that fraction of
    its height. The particles start on it, and it holds them all until a phase opens it
    (`release: ['b']`); then particles smaller than the holes fall through and bigger ones stay.
  - A kind marked `magnetic` is pulled up towards a magnet drawn over the box while a phase's
    `magnet: { b: 1 }` holds it there (`0` takes it away).
  - A phase's `push: { b: 0.7 }` pushes a solid sideways, its top half to the right and its bottom
    half to the left, as a hammer blow does (arrows show the push; `0` lets go). Each half moves at
    a steady pace once it gives. Metal atoms with `bond` about 3 slide over one another and stay
    moved; `pin: [1]` fixes that kind's atoms where they settled, spread evenly through the rows
    (the bigger atoms of an alloy), so the rows jam and the bar hardly gives. See `c8-4-3.ts`.
  - `escape: true` gives the box an open top that particles leave by (evaporation): one that
    reaches the top is gone. A kind with `bond` 2 or more (a salt) never leaves; it falls back.
    `escape: [4]` lets only the kinds listed leave (a gas bubbling out of a solution).
  - `wall: { at: 0.5, height: 0.5 }` stands a low wall that never lifts (a still): the particles
    start on its left and only a gas gets over it.
  - `zones: [{ x: [0, 0.5], y: [0, 0.17] }, { x: [0.6, 1], y: [0, 1], temp: 0.4 }]` hold parts of
    the box at their own temperatures, tinted red or blue: a hot plate (no `temp`: it follows the
    box's temperature, so a clip heats it) and a cold condenser. In a box with `escape` or a `wall`,
    gravity keeps its full strength, so a dissolved solid stays at the bottom however hot it is.
  - `paper: true` makes the box a strip of chromatography paper with the particles as a dot on a
    pencil line; a phase's `run: { b: 1 }` soaks the solvent up it, carrying each kind up at its
    `rise` (a fraction of the solvent's speed), so the dyes part into spots. Give the dyes
    `heavy: 0`, `cross: 0` and a temperature of about 0.005, so each spot keeps still.
  - `molecules: [{ atoms: [0, 1, 1], n: 7, bent: true }]` starts molecules whose atoms are bonded
    (drawn with a line between them); `bent` keeps a three-atom molecule at water's angle. The
    atoms' kinds are listed in `kinds` with `n: 0`. `src/video/reactions.ts` has the atoms in the
    videos' colours (`ATOM.H`, `O`, `C`, `Ne`) and ready-made burning boxes (`hydrogenBurning`,
    `carbonBurning`: light them with a phase's `heat` of about 2 and 2.5).
  - `molecules: [{ atoms: Array(16).fill(0), n: 1, chain: true }]` is a polymer chain: each atom
    bonded to the next, free to bend, laid along the floor at the start. Give each chain its own
    kind (and colour) so the chains can be told apart, `size: 0.8` so the bonds show, and a `temp`
    of about 0.4 so they wriggle. See `c8-4-4.ts`.
  - `reactions: [{ a: 0, b: 1, to: [2, 3], join: true, energy: 1.5, heat: 0.3 }]` turns a pair of
    kinds `a` and `b` that hit hard enough (`energy`) into kinds `to`, joined with `join`; `heat`
    warms the box, which then cools back slowly. `free` and `carry` let molecules swap partners
    (see `hydrogenBurning`); `reach: 1.15` makes only touching particles react, so a gas reacts
    with a lump's surface and not the layer under it. `waits: true` holds the reactions until a
    phase's `release`, and `tally: { kinds: [2], label: 'new molecules' }` shows a running count
    under the box (the part `tally`). A gas box with a reacting lump can break it into pieces
    with `lump: 4` and `cols: 2`; give it `hold: true` so the pieces do not drift together before
    the clip lets them go.
  More, for gases:
  - `spread: { at: 2, max: 3.5, bins: 14 }` draws a live bar chart under the box of how many
    particles move at each speed (the Maxwell–Boltzmann spread, part `spread`), with a dashed
    line at the speed `at` for the activation energy and a count of the particles past it. In a
    gas at temperature 0.5 almost none pass 2, and at 1.2 about a fifth do; use about 60 small
    particles (`size: 0.65`) so the bars are smooth (`speedSpread` in the extra chemistry
    course's `lib/cx-particles.ts`).
  - A kind's `mass` (1 by default) makes its particles heavier: at the same temperature they move
    more slowly, as heavy gas molecules do (give molecules' atoms their masses: H 1, C 12, O 16).
    Weaken the atoms' `bond` to about 0.03 (H 0.05), or molecules of three atoms clump together.
  - `piston: true` with `lid` draws the lid as a piston; a phase moving `lid` and `heat` together
    holds the gauge steady (Charles's law). `gauge: { box, start, unit: 'atm', decimals: 2 }` reads
    in another unit.
  - `hold: [0, 2]` holds only those kinds still until a phase's `release` (`hold: true` is the first
    kind). With `apart`, `ends: 0.1` starts the first and last kinds in strips that wide at the two
    ends of a long tube and the rest between them, and `endLabels: ['NH₃', 'HCl']` names the ends.
    A reaction with `settle: true` fixes the new particles where they formed (the white ring of
    ammonium chloride), and the part `middle` marks the middle of the box.
  Emphasising a box's id makes it glow. Keep to a few dozen particles a box (120 at most): every
  frame of a moving scene is drawn afresh. See `src/content/chem7/videos/c7-2-1.ts` (the three
  states, pistons), `c7-2-2.ts` (melting, boiling, condensing on a cold can), `c7-2-3.ts` (heat
  flow, conduction), `c7-2-4.ts` (expansion, diffusion), `c7-3-2.ts` to `c7-3-4.ts` (dissolving,
  saturation, stirring and heating), `c7-4-1.ts` to `c7-4-3.ts` (sieving, magnets, filtering,
  evaporation, distillation, chromatography) and
  `src/content/chem20/videos/c20-2-1-d.ts` to `c20-2-7-d.ts` (the gas laws: masses, pistons,
  gauges, the diffusion tube), and the reactions in
  `src/content/chem8/videos/` and `src/content/chem9/videos/c9-3-1.ts`, `c9-3-4.ts` (rates side by
  side) and `c9-4-3.ts` (neutralization).
  In chemistry, every scene that describes particles moving, mixing, reacting or being squeezed
  shows it with `particles` (the owner's rule of 14 November 2026).

- `atoms` (`src/video/atoms.ts`) draws atoms as a nucleus with electrons circling in shells, for
  electron arrangements, ions and bonding. Each atom has a `symbol`, `protons`, a place `at` in
  the element's `span` (a shell is about 0.6 units wide; the fourth shell's radius is 2.8) and
  `electrons` to start with (as many as its protons by default; 0 to fill it on screen). A clip's
  phases can `fill: { na: 11 }` (electrons added one by one, inside shells first), `give: [{ from:
  'na', to: 'cl', n: 1 }]` (outer electrons passed across in an arc, or lost with `to: null`),
  `move` atoms, and `share: [{ a: 'o', b: 'h1', n: 1 }]` (a covalent bond: move the atoms first so
  their outer shells overlap; the shared pair sits in the overlap and the other outer electrons
  move clear of the bonds). Each electron keeps the colour of the atom it came from. The parts
  `labels`, `arrangement` ("2, 8, 1") and `charges` ("Na⁺") show under and beside each atom
  (`labelAbove` puts them above it). See `src/content/chem9/videos/c9-1-3.ts` (filling shells),
  `c9-1-4.ts` (ions) and `c9-2-1.ts` (ionic and covalent bonding).
- `molecules` (`src/video/molecules.ts`) draws molecules as balls and sticks, flat like a
  structural formula, for organic reactions. `atoms` names each atom and its element (`{ C1: 'C',
  H1: 'H' }`, coloured like a model kit, or `{ el: 'C', tone: 'good' }`), and each of `stages` is
  an arrangement: `at` (each atom's place in the `span`, with bonds about 1 unit long and an atom
  left out not there), `bonds` (`'C1=C2 C1-H1'`, with `-`, `=` and `#`), `charges` and `names`
  (text placed in the scene). The element starts at `start`, and a clip's phases move it to a
  stage (`{ dur: 2.6, to: 'product' }`) or hold (`{ dur: 0.6 }`): the atoms glide, a bond that
  breaks turns red and fades in the first half, and a new bond comes in green in the second half
  and stays green for a moment. A molecule only in one of the two stages fades in or out whole.
  Let the reactants first move together (a stage where they touch), then make the product, so
  each bond change can be seen; keep paths from crossing. A charge sits at the atom's upper right
  unless a bond is in the way, then on the clearest side. A stage's `arrows` draw curly arrows
  (`{ from: 'C1=C2', to: 'Br1' }`: from an atom, its lone pair, or a bond's middle, to an atom
  or a bond; `bend` sets the curve and its side, 0.5 by default, negative for the other side),
  and `rings` draw a circle for delocalised electrons inside the listed atoms (`[['C1', …,
  'C6']]`); both fade in and out with their stage. A line can focus an atom (`m.Br1`). See
  Chemistry 30's `lib/c30-molecules.ts` (addition, substitution, elimination, and
  `oneAfterAnother` for several reactions in one element) and the extra chemistry course's
  `lib/cx-molecules.ts` (mechanisms with curly arrows, benzene's nitration, the Haber process and
  the fuel cell).

- `scatter` (`src/video/scatter.ts`) is Rutherford's gold foil: a source fires alpha particles
  at a foil of gold nuclei, and each nucleus pushes them away with an inverse-square force, so
  their paths are worked out, not drawn. Give the number of `shots` and the clips, whose phases
  `fire` that many shots evenly through the phase; end each clip with a phase of about 5 seconds
  that fires none, or the last shots stop in mid-flight when it ends. Every shot keeps clear of the
  nuclei and goes straight through, except those in `close` (`{ shot, miss }`, by firing order
  from 0), aimed past a nucleus by `miss`: 0.03 turns a shot by about 27°, 0.008 by about 76°, and
  −0.0005 throws it back. Each shot leaves a faint track (a bent one stays bright). The parts are
  `labels`, `atoms` (each gold atom's size round its tiny nucleus: mostly empty space) and `count`
  (straight through, turned aside, bounced back). See Chemistry 9's `c9-1-1.ts`.

- `quote` sets a passage of prose or verse off from the narration, for the English videos: one
  entry in `lines` per line (Markdown), with an optional attribution (`by: 'Capulet, Act 4, Scene 5'`)
  under it; lines can be shown one at a time (`q.0`). Quote only what the lesson already quotes,
  word for word: those quotations were checked against their public-domain sources.

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
- Show every number a problem needs. A value that is only said (the volume a height is worked
  back from, a rate) is easy to miss, so put it in the question or the first line of the working.
- A "Your turn" question stands on its own: it can be read and answered without the rest of the
  video, so it names its shape and numbers instead of pointing at "the box above".
- Keep everything inside the header's margins (about 84 to 1835 pixels across a 1920-pixel still).
  Maths is not shrunk to fit its column, so a long line in the right column of a split scene can
  run past the edge: narrow `leftWidth`, split the line or use a smaller size. A figure squeezed
  narrower than it would like keeps its text size, so check that its labels still fit their cells.

## Videos about Gradileo itself

The introduction (`src/content/gradileo/videos/gradileo-intro.ts`) shows the app, not maths. Its
`screen` elements are pictures of Gradileo in a browser window, taken from the demo:

```bash
npx tsx video/tools/screens.ts                 # every picture, into video/out/screens/
npx tsx video/tools/screens.ts teacher-forum   # just these
npx tsx video/build.ts gradileo-intro
```

`video/tools/screens.ts` serves the app, signs in as the demo teacher or student, opens each page
(drafting with AI, a suggested mark and a report card use a stand-in MiniMax, so no key is needed)
and saves `<shot>.png` at 1280×800 and 2×, with `<shot>.json` saying where each named spot is: a
button or a panel, found by its label, so a spot follows the page when the design changes. It
hides the demo's own labels ("Demo mode"). Take the pictures again after the app's design changes.

A `screen` names its shot, the address shown in the window's bar, the part of the page to show
(`view`, in the page's pixels: leave out the sidebar and top bar so the text is large enough to
read) and the spots its lines point at. Emphasising a spot rings it and dims the rest of the
picture (`focus: 'app.due'`); the ring moves on with the emphasis, and `focus: 'app'` clears it.
A video that teaches no lesson has an empty `lessonId`, a `label` for its header and thumbnail,
and its own YouTube `tags`; it is not listed in `src/content/videos.json`, which is for the lesson
player. `video/tools/drive-upload.ts gradileo-intro` puts it in `Gradileo videos/About Gradileo/`. The voice says "Gradileo" as it should (like "Galileo"), but it drops the dot in
"gradileo.com", so say "gradileo dot com" with the caption written as the address.

## Making a course's videos, step by step

1. Script each lesson in parts (`src/content/<course>/videos/<id>.ts`, then `<id>-b`, `<id>-c`…),
   with as many spoken words as the simplest explanation needs (`video/tools/words.sh <files>`;
   350 to 450 words makes about four minutes). Check the scripts with
   `npx vitest run src/video/scripts.test.ts -t "<id prefix>"`.
2. Check the layouts: `npx tsx video/build.ts <ids> --stills --quick` (in a cloud session, set
   `CHROMIUM_PATH=$(ls /opt/pw-browsers/chromium-*/chrome-linux*/chrome | head -1)` and `NODE_USE_ENV_PROXY=1`),
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
  figures" ("Congrant"), "prove congruence," ("Congress"), "the rate r" ("the radar"), "halve" ("have"), "made to look huge" ("made to a huge"; "made to seem huge" is clear), "A lease" at the start of a sentence ("Elise"; "A vehicle lease" or "Every lease" is clear), "a Sudoku" ("pseudo-ku"; "Sudoku puzzles" or "In Sudoku" is clear), "Maya leases" ("Maya Lisa's"), "is x itself" before more words ("is exit self"; "is just the value of x" is clear), "antidifferentiate" after a full stop or a comma ("and to differentiate", the opposite; "find the antiderivative" is clear), "The sign is wrong" next to "sine" (sign and sine sound the same; "is missing a negative" is clear), "its slices are" ("it slices our"; "each slice is" is clear), "ate" before a number ("ate two eighths" is heard as "eight, two eighths"; "eats" is clear), a count of a number in the plural ("twenty sixes" is heard as "26s"; "twenty groups of six" is clear), an acronym with 's ("SUV's" is read as the word "suvs"; "the SUV cost" is clear), "too" after a letter, a number or "zero" ("approaches zero too" is heard as "zero two", "find y too" as "y2", and ", two." at the end of a line as "too"; "as well" is clear), a short line that opens "It is negative" ("Air is negative"; "The answer is negative" is clear), the names Zainab ("Zaina") and Luis ("Lewis"), "boy" ("buy" or "by", whatever the spelling: use other groups, such as teachers and students), "Rewrite"
  at the start of a sentence ("We're right") and the name Rhea ("Rhea takes" came out "retakes";
  Maya is clear), the name Aiyana (blurred; Maya is clear), the short money form ("two dollars
  forty" is unclear; "two dollars and forty cents" is clear) and two numbers after "the point at"
  ("the point at six, sixteen" is heard as "six hundred sixteen"; "the point with x equal to six
  and y equal to sixteen" is clear), "Let p be" ("Let PB"; "Let p stand for" is clear), the name
  Kiran ("Curran"; Priya is clear), "Maya counts" ("My accounts"), "pup tent" ("pop tent") and
  "forty sevenths" ("47th"; "forty over seven" is clear), other ordinal fractions with a large
  top or bottom ("eighteen fiftieths", "sixteen ten-thousandths", "twenty thirds"; "eighteen over
  fifty" is clear), "points O, P…" ("4.0 P"; "the shape O P T Q" is clear), the names Leah
  ("Lee"), Jamal ("J-Mall") and Priya before "posts" ("Pre-opposts"), "the letter Z" ("letter C";
  "the capital letter Z" is clear), a variable before "dollars" ("four g dollars" is heard as
  "$4"; "in dollars, four g" is clear), "and at a number" ("add a number"), a line that starts
  with "x is…" ("Axe is", "Axis", "Access"; "That means x is…" is clear), "Let c be" and "use C equals" ("let's see", "you see"; "We let c be"
  and "use the formula C equals" are clear), "What is the mean?" ("What does the mean"; "Find the
  mean." is clear), the names Ayesha (garbled every time) and Dakota ("Decoder"; Amara is clear), a quick list of pairs
  such as "one and six, two and five" ("1 in 6, 2 in 5"; "one plus six" is clear), "A line graph"
  ("Align graph"; "Line graphs show…" is clear; the same goes for "…: a line six squares long"), "Leo picks a card" ("Leo Pixacard"),
  "add its opposite" ("at its opposite"; "you add its opposite" is clear), "A rise, a gain"
  ("Arise, again"; "Rises, gains…" is clear), "rink" with little around it ("A rectangular rink" is
  heard as "ring", "Now the rink:" as "rank"; "an ice rink" and "the area of the rink" are clear),
  "stays as two terms" ("stays is"; "is left as" is clear), "perimeters" ("parameters"; the singular,
  "the same perimeter", is clear), "write an inequality" ("write in an equality"; "write the
  inequality" is clear), "a rider who…" ("a writer"; "a person who…" is clear), "five hundredths" ("500"; "five over one
  hundred" is clear), "only the x-coordinate changes." at the end of a line ("X-Go-ordinate";
  "the x-coordinate of each point" is clear), "zero point one five times two hundred forty dollars" ("$0.1, $5,
  $240"; "Multiply zero point one five by two hundred forty dollars" is clear), and "convenience
  sample" ("convenient sample" in a short line, or before "and"/"or"; "samples chosen for
  convenience" is clear). "Bisects" after "chord" came out "by sex": `speechText` now says
  "bi-sect", and the pronunciation check takes "cord" as "chord". "Lengths" came out "links":
  `speechText` now says "lenkths", which helps, but at the end of a long line it can still be heard
  as "links"; there, name the sides ("the two long sides added together"). "Eighty-one" came out
  "A to 1" in longer lines: `speechText` now drops the hyphen after "eighty", which is clear, and in "x-tiles" ("x styles"
  every time). A
  short line ending in "eighty" ("Find one hundred fifty percent of eighty.") is heard as "AIT";
  "of the number eighty" is clear. "It is" at the start of a line can come out "Air is" ("It is
  cut into…"); name the thing instead ("The bar is cut into…"). A set or point named "A" that starts a sentence before a lowercase word ("A
  equals…") is read as the word "a": write "Set A equals…". When a key term is blurred, reword
  the line ("Figures that are congruent…") and check it with `video/tools/hear.ts`.
- Say a minus sign in front of a bracket or a whole fraction as "the negative of" (or "negative,"
  then the bracket, then "all over"): "negative two plus two, over one plus four" sounds like zero
  over five, while the screen shows −(2 + 2)/(1 + 4).
- Use `\dfrac` for fractions in Math 20-4 maths lines, and state every rate, tax or rule inside
  the question (see `CLAUDE.md`).
- Chemistry: write formulas with mhchem on screen (`$\ce{H2SO4}$`) and say them as a teacher reads
  them ("H two S O four", or the name), with a `caption` written properly (H₂SO₄). Say "dye-" for
  the prefix di- ("dye-nitrogen tetroxide"; "di" alone is heard as the letter D) and keep the real
  spelling in the caption; say "eye-you-pack" for IUPAC; never say a bare ending such as "-ate",
  "-ite", "-ic" or "-ous" (heard as "eight", "Ike", "ooze"): say it inside an example ("a name
  ending like nitrate"). Say "iodine", never the letter I. The metal lead is respelled by
  `speechText` (before "two", an ion name or a bracket, and after "of", "as" or "and"); any other
  use of the metal should be reworded so it is one of those. `speechText` also respells "deca" and
  "decahydrate" (otherwise "dih-KA"), "heptaoxide", "pipetted", "electronegativity" (which loses its
  "neg"), Svante Arrhenius, Le Chatelier, and the organic names ethene, propene, propyne, ketone,
  cycloalkane and methoxymethane. Whisper writes many chemistry words its own way ("methanol" for
  methanal, "boils" for Boyle's, "SATP", "iron II"); check those with Kokoro's phonemes before
  changing anything: methanal, nona, valence, phenolphthalein and intermolecular are said right.

### Google Drive

`drive-upload.ts` signs in with three environment variables, `GDRIVE_CLIENT_ID`,
`GDRIVE_CLIENT_SECRET` and `GDRIVE_REFRESH_TOKEN`, from an OAuth client in Google Cloud with only
the `drive.file` scope. With that scope the tool sees only the files and folders it created
itself, so make the `Gradileo videos` folder with the tool, not by hand. In a cloud session, set
the variables in the environment's settings (not in the repository, which is public); a session
started after they were added sees them. The tool never prints their values.

## The AI tutor's voice

The AI tutor speaks with this voice too. `tools/tutor-voice.ts` records the tutor's narration of
every lesson (what it says at each step of each slide, plus its praise and help) into one MP3 and
a manifest per lesson, with the same voice, calm pace and respellings (`src/video/words.ts`) as the
videos, so a word fixed for the videos is fixed for the tutor as well. The *Tutor voice* workflow
runs it for every course and publishes the files; see docs/SETUP.md, section 3.4. To try one
lesson here: `npx tsx --tsconfig tsconfig.json video/tools/tutor-voice.ts m10c-1-1 --out
video/out/tutor` (MiniMax writes the lines when `MINIMAX_API_KEY` is set; otherwise the tutor
reads each step from the slide). A slide whose MiniMax lines fail the checks in
`engine/ai/tutorCheck.ts` (a number the slide does not have, a wrong calculation, "and" inside a
whole number, a line said one step early or late) is read from the slide, and the log names it.
Units are said in full (`sayUnits` in `engine/ai/tutor.ts`: "3 m" is "3 metres", "−3 °C" is
"negative 3 degrees Celsius"); inside maths `\text{in}` is inches, but in prose "in" stays a word.

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
what differs; `--dry-run` lists the changes first. A title edited by hand on YouTube matches no
script: name it with `<youtube id>=<video id>` (the admin console's Videos page lists both):

    npx tsx video/tools/youtube-update.ts --dry-run
    npx tsx video/tools/youtube-update.ts CMSCsWap8b0=m10c-1-8

### Watching for comments

`video/tools/youtube-comments.ts` lists the comments viewers have left on any of the channel's
videos since its last run: new comments and new replies in old threads, never the channel's own.
Each comes with its video's title and Gradileo id, whether the channel has answered it, and a link
to it. It keeps what it has seen in `--state` (by default
`/mnt/project-files/viewer-requests/youtube-comments-seen.json`), and `--json` prints the list for a
scheduled check to draft replies from. It costs a few quota units a run and never posts a reply.

It signs in with `YOUTUBE_COMMENTS_CLIENT_ID`, `YOUTUBE_COMMENTS_CLIENT_SECRET` and
`YOUTUBE_COMMENTS_REFRESH_TOKEN` when they are set, and otherwise with the uploader's `YOUTUBE_*`
variables. The uploader spends the rest of each day's 10,000 units in the evening, so on its
sign-in the watcher cannot read comments from then until the reset. Its own variables come from a
second Google Cloud project, made the same way as the uploader's (see "YouTube API" below): the
YouTube Data API v3 enabled, the `youtube.force-ssl` scope on a consent screen published **In
production** (listing a channel's comment threads needs that scope; `youtube.readonly` is refused),
and a Web application client whose refresh token was made in the OAuth 2.0 Playground. Any
account can sign in, since the tool names the Gradileo channel itself (`--channel` names another).
That project has its own quota.

    npx tsx video/tools/youtube-comments.ts --dry-run

### Uploading to YouTube

`video/tools/youtube-upload.ts` uploads finished videos to the channel in course order: the MP4
with its title, description and tags (made from the script, as in `youtube.txt`), in Education,
in English, then `thumbnail.png`, and puts each in its unit's playlist in lesson order. Our
`captions.srt` goes up only with `--captions`: captions cost 400 quota units a video, most of what
a finished video costs, and the owner found YouTube's automatic captions as good (28 October 2026),
so the lesson player now shows those. It uses the owner's playlist when its title names the course and unit ("Math 10C -
Unit 1 (Measurements)") and otherwise makes one in that style, and puts each playlist it touches
back in lesson order if it is out of order (50 units a moved video). That needs the playlist set
to **Manual** in YouTube Studio; one that sorts itself (by date) takes new videos at the end and
cannot be reordered. `--limit 0` uploads nothing and only files and orders playlists. It takes each video's files from `video/out/<id>/`, or from its Drive folder when the course has been
cleared from the session, and skips videos already on the channel (only filing them in their
playlist if missing), so a run can be repeated. The tool stops by itself at the channel's daily
upload limit or the day's quota; a video that went up without its thumbnail is listed in
`youtube-unfinished.json` in Drive and finished first on the next run, and every upload is recorded
in `youtube-uploaded.json` there, so a video YouTube's listing leaves out is never uploaded twice. `--limit N` uploads at most N, `--private` or
`--unlisted` holds them back, and `--dry-run` lists what it would upload:

    npx tsx video/tools/youtube-upload.ts --dry-run math-10c
    npx tsx video/tools/youtube-upload.ts math-10c math-10-3

Each upload prints `<video id> -> https://youtu.be/<youtube id>`. Record it in Gradileo so the
lesson shows the video: **Admin console → Videos**, or straight into `public.video_links`. Every
upload declares whether the video is made for kids (YouTube turns off comments and personalised ads
for those); the course's answer is in `MADE_FOR_KIDS` in the tool, and a course not listed there is
not uploaded until the owner decides. The owner has said no for every course, Math 5 to Math 31.

### YouTube API

The YouTube tools sign in with `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET` and
`YOUTUBE_REFRESH_TOKEN` (`video/lib/google.ts`), set in the environment's settings like the Drive
ones (a session started after they were added sees them). They come from a Google Cloud project
with the YouTube Data API v3 enabled, the `youtube.force-ssl` scope on its consent screen
(published **In production**, or the sign-in lapses after 7 days; it does not need Google's
verification, since only the channel's own account signs in), and a Web application OAuth client
whose refresh token was made in the OAuth 2.0 Playground while signed in as the channel. The API
allows 10,000 units a day, reset at midnight Pacific time: an update costs 50 (about 200 renames a
day), a thumbnail 50, a playlist place 50 and captions 400; an upload itself counts against the
channel's own daily limit instead, which YouTube raised past 100 on 24 October 2026. So about 90
videos a day go up with their thumbnails, or about 20 with our captions too. Uploads through this
project come out public (checked on 19 October 2026).

By hand, the same steps in YouTube Studio:

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
