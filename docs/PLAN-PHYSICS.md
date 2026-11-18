# Plan: Physics, Grades 10 to 12

The owner chose high school Physics, Grades 10 to 12, as the next subject on 14 November 2026,
with one rule for its videos: show the idea happening, never narrate over still slides. The owner
watched two sample videos and approved the animated style the same day. This is the plan of the
courses, sent to the owner on 14 November 2026 and **approved by the owner the same day, with no
changes**.

**Progress.** Grade 10 Physics is built (14 November 2026): all five units, 27 lessons and 54
skills, and Physics is a subject in the app. Grade 11 Physics is built and listed too (15 November
2026): four units, 30 lessons and 60 skills, recommended from Grade 11 with a placement check on
Grade 10 Physics. Grade 10 has a video for every lesson (28 videos), and so does Grade 11
(45 videos, 17 November 2026): Unit 1 (Kinematics, ten videos), Unit 2 (Dynamics, eight videos),
Unit 3 (Circular Motion, Work and Energy, thirteen videos) and Unit 4 (Oscillations and Waves,
fourteen videos) are rendered and in Drive. Grade 12 Physics was started on 18 November 2026 as a
draft course (`phys-30`): Unit A, Momentum and Impulse, has its five lessons and ten skills,
Unit B, Forces and Fields, has its ten lessons and twenty skills, and Unit C, Electromagnetic
Radiation, has its eight lessons and sixteen skills, and Unit D, Atomic and Nuclear Physics, has
its seven lessons and fourteen skills. All thirty lessons are written; the course is still a
draft until it is listed for classes and sign-up, and its videos come after that.

## Shape

- Three courses, named as chemistry's are: **Grade 10 Physics** (`phys-10`, lessons `p10-…`),
  **Grade 11 Physics** (`phys-20`, `p20-…`) and **Grade 12 Physics** (`phys-30`, `p30-…`), subject
  Physics, 87 lessons in all, built one grade at a time so each can be listed for classes as soon
  as it merges.
- Every lesson opens with a `:::definition` of its core term and has two question types (skills),
  each with three difficulties. Every value a question needs (such as g = 9.81 m/s²) is stated in
  the question.
- At least one explainer video for each lesson, of at least two minutes, built from animation
  that is computed from the physics (see "Animation" below), then Drive and the YouTube queue,
  and the tutor's recordings from the Tutor voice workflow after each merge.

## Grade 10 Physics: 27 lessons

The first physics course, for a learner who has never studied physics, at the level most school
systems teach in Grades 9 and 10. It needs Grade 9 mathematics only.

| Unit | Lessons | What moves on screen |
|---|---|---|
| 1. Describing Motion | Quantities, units and measurement · Speed, distance and time · Displacement and velocity · Acceleration · Motion graphs | Carts on a track with a clock and strobe marks while the distance-time and velocity-time graphs draw themselves |
| 2. Forces | Forces and net force · Newton's first law and inertia · Newton's second law · Mass, weight and gravity · Friction and air resistance · Newton's third law | Force arrows pushing blocks that speed up, slow down and stop; falling objects reaching terminal velocity; paired forces between two bodies |
| 3. Work, Energy and Power | Work · Kinetic energy · Gravitational potential energy · Conservation of energy · Power · Efficiency and energy transfers | A cart on a ramp and a pendulum with energy bars trading kinetic for potential energy, and a total that stays level |
| 4. Waves, Sound and Light | What a wave is · The wave equation · Sound · Reflection and refraction · The electromagnetic spectrum | Travelling waves whose particles only move up and down, compressions moving through air, rays bending into glass |
| 5. Electricity | Charge and current · Voltage, resistance and Ohm's law · Series circuits · Parallel circuits · Electrical power and energy | Charges flowing around a circuit, slowing through a resistor and splitting at a junction, with live meters |

The sample `phys-sample-forces` is now the video of lesson 2.3 (`p10-2-3`).

## Grade 11 Physics: 30 lessons

Mechanics and waves with full calculations, following the four units of Alberta's Physics 20. It
uses vectors and trigonometry.

| Unit | Lessons | What moves on screen |
|---|---|---|
| A. Kinematics | Scalars, vectors and displacement · Uniform motion and position-time graphs · Acceleration and velocity-time graphs · The equations of motion · Free fall · Vectors in two dimensions · Relative velocity · Projectile motion | A projectile with its horizontal and vertical velocity arrows shown separately, a boat crossing a moving river, objects falling side by side |
| B. Dynamics | Forces and free-body diagrams · Newton's laws of motion · Static and kinetic friction · Forces on an inclined plane · Connected objects and tension · Forces in two dimensions · Universal gravitation · Gravitational field strength | Blocks on ramps with the weight split into components, two masses over a pulley, planets pulling on each other |
| C. Circular Motion, Work and Energy | Uniform circular motion · Centripetal force · Orbits and satellites · Work and force-displacement graphs · Kinetic, gravitational and elastic energy · Conservation of mechanical energy · Power and efficiency | A ball on a string whose velocity arrow keeps turning while the force points to the centre, a satellite in orbit, a roller coaster with live energy bars |
| D. Oscillations and Waves | Hooke's law and simple harmonic motion · The mass on a spring · The pendulum · Wave properties and the universal wave equation · Reflection, superposition and interference · Standing waves and resonance · The Doppler effect | A mass on a spring tracing its own sine curve, two pulses passing through each other, standing waves, wavefronts bunching ahead of a moving source |

## Grade 12 Physics: 30 lessons

Fields, light and the atom, following the four units of Alberta's Physics 30, with one lesson on
circuits and one on fission and fusion added because most other school systems examine them at
this level.

| Unit | Lessons | What moves on screen |
|---|---|---|
| A. Momentum and Impulse | Momentum · Impulse and force-time graphs · Conservation of momentum · Elastic and inelastic collisions · Collisions and explosions in two dimensions | Carts colliding at full speed and in slow motion with live momentum bars, pucks scattering at angles while the total momentum stays fixed |
| B. Forces and Fields | Electric charge and charging · Coulomb's law · Electric fields · Electric potential energy and potential difference · Charges moving between parallel plates · Current, resistance and circuits · Magnetic fields · The force on a moving charge · The motor effect · Electromagnetic induction and generators | Charges repelling and attracting with force arrows that grow as they close in, a charge curving through a magnetic field, a coil turning in a motor, a magnet inducing a current in a coil |
| C. Electromagnetic Radiation | The electromagnetic spectrum and the speed of light · Reflection and curved mirrors · Refraction and Snell's law · Lenses · Diffraction and interference · The photoelectric effect · The Compton effect and photon momentum · Wave-particle duality | Rays tracing through mirrors and lenses to build the image, waves spreading through two slits, photons freeing electrons only above the threshold frequency |
| D. Atomic and Nuclear Physics | Cathode rays and the electron · Rutherford's nucleus · The Bohr model and spectra · The nucleus and isotopes · Radioactive decay · Half-life · Fission, fusion and binding energy | Alpha particles scattering off a nucleus, an electron dropping between energy levels and giving out a photon, a sample decaying while its half-life curve draws itself |

The sample `phys-sample-momentum` becomes the opening video of Unit A.

## Animation

Every piece is a pure function of the clips played so far (`play: 'el.clip'` on a script line,
see `video/README.md`), computed from the physics so the picture and the numbers agree. Each is
built when the first unit that needs it is reached.

| Piece | Shows | First needed in | State |
|---|---|---|---|
| Bodies on a straight track (`motion`) | Forces, velocity arrows, strobe marks, a clock, a velocity-time graph, momentum bars, collisions | Grade 10, Units 1 and 2 | Built |
| Motion in two dimensions (`flight`) | Projectiles, a boat in a current, displacements on a map | Grade 11, Unit 1 | Built |
| Blocks on a surface (`ramp`) | Friction, inclined planes, strings and pulleys, with every force worked out | Grade 11, Unit 2 | Built |
| Forces in a plane (`forces`) | A puck seen from above, an object hung from two cables | Grade 11, Unit 2 | Built |
| Bodies in space (`gravity`) | Universal gravitation, gravitational fields | Grade 11, Unit 2 | Built |
| Circular motion and orbits (`circle`, `gravity`) | A ball on a string, a car on a bend, a vertical loop, a satellite in orbit | Grade 11, Unit 3 | Built |
| Energy bars | Kinetic and potential energy trading places while the total holds | Grade 10, Unit 3 | Built (in `motion`) |
| Springs and pendulums | Hooke's law, elastic energy and a pendulum; oscillation that traces its own curve to come | Grade 11, Units 3 and 4 | Built (in `motion`); the traced curve to build for Unit 4 |
| Waves (`wave`) | Travelling waves and echoes; pulses, standing waves and wavefronts to come | Grade 10, Unit 4 | Built; more for Grade 11, Unit 4 |
| Rays (`rays`) | Reflection and refraction; mirrors and lenses to come | Grade 10, Unit 4 | Built; more for Grade 12 |
| Circuits (`circuit`) | Charges flowing through wires, resistors and junctions, with meters | Grade 10, Unit 5 | Built |
| Charges and fields | Field lines, a charge moving in electric and magnetic fields | Grade 12, Unit B | To build |
| Particles | Photons, scattering, radioactive decay | Grade 12, Unit C | To build, shared with chemistry's remake |

## What physics needs that the platform does not have

- Physics as a subject: course lists, sign-up placement and the public pages that name subjects.
- Two answer checks: a vector (a size and a direction) and scientific notation, beside the
  number-with-units check.
- Lesson figures: free-body diagrams, circuit diagrams, ray diagrams and field diagrams. Motion
  graphs reuse the graph figures.
- Safety: experiments are described in words; no question asks a learner to try anything risky.

## Build order

1. Grade 10 lessons and questions, with Physics added to the app as a subject.
2. Grade 10 videos, one unit at a time, each unit's animation piece first.
3. Grade 11 lessons and questions, then its videos.
4. Grade 12 lessons and questions, then its videos.

The two samples stay off YouTube until their lessons exist.

## Choices the owner may change

- Heat (temperature, specific heat capacity) is left out of Grade 10, because Chemistry 7 and
  Grade 12 Chemistry teach it; it could be a sixth unit of about four lessons.
- Special relativity and the Standard Model are left out of Grade 12; they could be a short
  fifth unit.
- Nothing is planned below Grade 10.

## Sources

The units were matched to these from knowledge of them, not by reopening the published documents;
each course's lessons are checked against the documents when it is built.

- Alberta's Science 10 (Unit B, Energy Flow in Technological Systems), Physics 20 and Physics 30
  programs of study.
- England's GCSE Physics subject content, and AS and A level Physics.
- The US Next Generation Science Standards for high school physical science (HS-PS2, HS-PS3,
  HS-PS4).
