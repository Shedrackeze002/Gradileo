# Plan: Gradileo for every English-speaking learner

Roadmap item 5. On 17 October 2026 the owner decided that Gradileo is for students anywhere: in
the US, the UK, Africa and every other English-speaking country, and not only in Alberta schools.
Some of that is already built. This plan covers what is left, with the owner's decisions to come
at the end. The owner decided on 30 October 2026, and building starts with step 1.

## Already done

- Courses are named by grade and stream (Math 10, Math 11 Pre-calculus, Grade 11 Chemistry …)
  rather than by Alberta codes (PR #91).
- The questions and lessons of all 16 mathematics courses are no longer set in Alberta: the towns
  are invented, every rate is stated in the question, and sales tax is explained for any country
  (PR #94).
- The YouTube titles and the title cards put the topic first ("Slope of a line · Math 10").
- There are three subjects: mathematics (Grades 5 to 12), chemistry and English (Grades 10 to
  12).

## What is still Alberta-shaped

- "Find your course" asks for a grade from 5 to 12 and recommends a course in Alberta's order. A
  learner in England (Year 10), Nigeria (SS1) or Kenya (Form 3) has to work out their grade for
  themselves.
- Lessons can only be found course by course. A learner who wants "quadratic equations" has to
  know that it sits in Math 11 Pre-calculus.
- The course order and names are Alberta's. A learner on Algebra I or GCSE Higher cannot see the
  same lessons in their own syllabus's order and with its names, or see what is missing.

## The plan, in four steps

### Step 1: ask for the country and year first

"Find your course" and sign-up first ask for the country, or the curriculum (US, UK, Nigeria and
Ghana (WAEC), Kenya, South Africa, IB, Cambridge, Canada, other), and then the year in that
country's own words: Grade 9, Year 10, SS1, Form 3, Grade 10, MYP 5. Gradileo turns the answer
into its own level and recommends a course as it does now. The learner's curriculum is saved on
their profile, so steps 2 and 3 can use it. The landing page names those countries and says that
the courses follow their syllabuses.

### Step 2: topics first

We add a catalogue of plain topics, each with a level: about 60 for mathematics ("Linear equations,
about Grade 8 / Year 9", "Functions and transformations, about Grade 11–12 / Year 12–13"), and
fewer for chemistry and English. Each topic lists its lessons from every course. A new page,
"Browse by topic", has a search box, so a learner can go straight to a topic without knowing the
course. The catalogue is generated from the units that already exist, and a test checks that every
lesson belongs to at least one topic.

### Step 3: curriculum maps

A map is a data file (`engine/curriculum/maps/<system>.ts`) that lists a system's courses. For
each course it gives the units in the system's order, under the system's names, each pointing to
Gradileo's lessons. A learner whose profile has that curriculum sees their course in that order and
under those names (for example "Algebra I · Unit 3: Linear functions"), and a teacher can start a
class on a mapped course. The lessons, practice and videos are the same ones, so a map costs little
to add. Each map also lists its **gaps**: syllabus topics that Gradileo does not teach yet. A test
checks that every lesson a map points to exists.

The order we suggest is by how many learners each map reaches:

1. **US Common Core**: Grade 6 to Grade 8, Algebra I, Geometry, Algebra II, Precalculus.
2. **UK GCSE Mathematics**, Foundation and Higher (Years 10–11), then A level Mathematics (Years
   12–13).
3. **WAEC (WASSCE) Mathematics**, Nigeria and Ghana (SS1–SS3); then **Kenya** (KCSE, and the new
   CBC senior school as it arrives) and **South Africa** (CAPS, Grades 10–12).
4. **Cambridge IGCSE** and **IB** (MYP and Diploma: Analysis and Approaches, Applications and
   Interpretation).

Chemistry and English maps follow the same pattern later (GCSE and WAEC Chemistry, AP Chemistry;
GCSE English Language and Literature, US ELA).

### Step 4: fill the gaps

The maps show what is missing. We expect the larger gaps to be Geometry (US) and parts of GCSE
and WAEC (vectors, sets and Venn diagrams, bearings, loci and constructions, simple proof,
matrices). Each gap is written like any other lesson: generators, a lesson, a video and a tutor
recording. The largest gaps go first. Each map says how complete it is ("Algebra I: 46 of 48
topics").

## Local details

- **Units:** metric stays the default. A US map's lessons that need US customary units (feet,
  miles, pounds, Fahrenheit) get questions that state them.
- **Money:** every amount already names its currency in the question. A map can choose the
  currency its own new questions use (dollars, pounds, naira, shillings, rand).
- **Spelling:** Gradileo uses one spelling, Canadian and British (metre, colour, practise). The
  decision below is whether US learners see US spelling.

## Decisions for the owner

1. Which map comes first? We suggest US Common Core, then UK GCSE.
2. Spelling: keep one spelling everywhere, or show US spelling to US learners? We suggest keeping
   one spelling for now, because a second spelling doubles every lesson's checking.
3. Should a teacher be able to start a class on a mapped course ("Algebra I", "GCSE Higher") as
   well as on Gradileo's own courses? We suggest yes.

## The owner's decisions (30 October 2026)

1. The first map is **US Common Core**, followed by **UK GCSE**.
2. **One spelling** everywhere (Canadian and British) for now.
3. **Yes:** a teacher can start a class on a mapped course.
