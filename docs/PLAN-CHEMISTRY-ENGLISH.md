# Plan: Chemistry and English

Roadmap item 9. The owner chose Chemistry and English as the first subjects after mathematics (23
October 2026), with a plan of courses, levels and units to approve before anything is built. This
is that plan, with the owner's decisions at the end. Building starts with step 1 below.

## What stays the same

Both subjects use the platform as it is: lessons with worked examples and checks, practice with
instant feedback, mastery tracking per skill, assignments, quizzes and exams, present mode, the
whiteboard, live class questions, the AI tutor, the AI teaching assistant, suggested marks, report
cards, the class forum and explainer videos. A course already has a `subject` field
(`engine/types.ts`), so the work is mostly content, with a few additions below.

## Chemistry

Chemistry's calculations (moles, concentrations, gas laws, stoichiometry, enthalpy, pH) are the
kind of question the engine already generates and checks, with fresh numbers for every student.
Following the courses already built, the levels follow Alberta's programs of study (Chemistry 20
and 30, 2007, updated 2014), named for learners everywhere by topic, as the math videos are.

### Chemistry 20 (Grade 11), about 30 lessons

| Unit | Lessons |
|---|---|
| A. The Diversity of Matter and Chemical Bonding | Atoms, ions and the periodic table · Ionic compounds: names, formulas, properties · Molecular compounds · Electronegativity and bond types · Lewis structures · Shapes of molecules (VSEPR) · Polar and non-polar molecules · Intermolecular forces and boiling points |
| B. Forms of Matter: Gases | Kinetic molecular theory · Pressure, kelvin temperature, STP and SATP · Boyle's law · Charles's law and the combined gas law · The ideal gas law · Molar volume |
| C. Matter as Solutions, Acids and Bases | Solutions and dissociation equations · Percent, ppm and molar concentration · Preparing and diluting solutions · Solubility and solubility curves · Acids, bases and the Arrhenius theory · pH, pOH, [H₃O⁺] and [OH⁻] · Strong and weak acids and bases, indicators · Neutralization |
| D. Quantitative Relationships in Chemical Changes | Balancing equations and reaction types · Net ionic equations · The mole and molar mass · Gravimetric stoichiometry · Gas and solution stoichiometry · Limiting and excess reagents, percent yield · Titration and standard solutions · Titration curves |

### Chemistry 30 (Grade 12), about 30 lessons

| Unit | Lessons |
|---|---|
| A. Thermochemical Changes | Energy in chemical systems · Calorimetry (q = mcΔT) · Molar enthalpy and ΔH · Enthalpy diagrams · Hess's law · Enthalpies of formation · Activation energy and catalysts |
| B. Electrochemical Changes | Oxidation and reduction · Oxidation numbers · Redox tables and spontaneity · Balancing redox equations · Redox titrations · Voltaic cells · Standard cell potentials · Electrolytic cells and Faraday's law |
| C. Chemical Changes of Organic Compounds | Organic compounds and how they are drawn · Naming hydrocarbons · Isomers · Functional groups · Addition, substitution and elimination · Esterification and polymerization · Fossil fuels and combustion |
| D. Chemical Equilibrium Focusing on Acid–Base Systems | Dynamic equilibrium · The equilibrium constant · Le Châtelier's principle · Brønsted–Lowry acids and bases · Predicting acid–base reactions · Ka and Kb · pH of weak acids and bases · Buffers and titration curves |

### What chemistry needs that mathematics did not

- **Formulas and equations** typeset with KaTeX's chemistry extension (`\ce{H2SO4}`), which is
  already installed with KaTeX, in lessons, questions and videos.
- **New answer checks**: a chemical formula (H₂O, with charges such as SO₄²⁻), the coefficients of
  a balanced equation, and significant figures, alongside the number-with-units checks that exist.
- **Data the questions use**, stated in each question as the math questions state their rates: a
  periodic table (molar masses), a table of reduction potentials and a table of acids and bases.
- **Figures**: particle diagrams, Lewis structures, molecular shapes, energy diagrams, voltaic and
  electrolytic cells, structural formulas of organic compounds, lab equipment (beaker, burette).
  Titration and solubility curves reuse the graph figures.
- **Safety**: questions about the lab describe procedures in words and never ask a student to try
  anything at home.

## English

English is mostly reading and written responses, graded by the teacher with AI-suggested marks
(already built, canvas answers included). Grammar, vocabulary and reading comprehension can be
practised with instant feedback. The levels follow Alberta's English Language Arts 10-1, 20-1
and 30-1 (the stream towards university), whose five general outcomes run through every unit.

### English 10 (Grade 10), about 31 lessons

| Unit | Lessons |
|---|---|
| 1. Short stories | Plot and conflict · Character · Setting and mood · Point of view · Theme and symbol |
| 2. Poetry | Imagery and figurative language · Sound and rhythm · Form · Reading a poem closely |
| 3. Shakespeare | Reading Shakespeare's language · Character and motive · Soliloquy and dramatic irony · Themes |
| 4. Non-fiction and persuasion | Purpose and audience · Argument and evidence · Ethos, pathos and logos · Bias and reliable sources |
| 5. Visual and media texts | Reading an image · Film techniques · Advertising |
| 6. Writing | The personal response · The analytical essay: thesis, evidence, analysis · The persuasive essay · Narrative writing · Revising and editing · Writing under a time limit |
| 7. Grammar and language | Sentences: fragments, run-ons and comma splices · Punctuation · Agreement · Modifiers and parallel structure · Word choice, tone and vocabulary in context |

English 20 and English 30 follow the same units with harder texts and longer writing, ending
with the essay a final exam asks for.

### What English needs that mathematics did not

- **Texts**: only texts in the public domain (Shakespeare, Poe, Chopin, O. Henry, Dickinson,
  Wordsworth and others) or written for Gradileo, so every text can be shown and voiced. A teacher
  can attach the novel or play their class reads as one of their own resources.
- **Passage questions**: a passage shown beside several questions about it.
- **Rubrics** for written work, with a mark per criterion (ideas, evidence, organisation, style,
  conventions), so the AI's suggested mark explains each part. A teacher can also paste a passage
  of their own and have the AI draft questions on it.
- **Generated practice** for grammar and vocabulary: find and fix the error, combine sentences,
  choose the word that fits, with fresh sentences each time.
- **Videos** for skills (how to write a thesis, how to read a poem), fewer than math has.

## Changes to the platform

- The catalogue, sign-up and course placement, and new classes, list courses by subject.
- The landing page and Gradileo's description say "math" today; they change when the first
  chemistry course is ready.
- The AI's instructions name the course's subject instead of "mathematics teacher".
- Report cards, the gradebook, the mastery map and the forum need no change.

## Order of work

1. The platform changes and chemistry typesetting (one pull request).
2. Chemistry 20, a unit per pull request, then its videos.
3. Chemistry 30 the same way.
4. English 10: first the grammar unit and the short stories unit, to settle the format; then the
   rest; then English 20 and 30.
5. Later: the chemistry in junior high science and Science 10, and English for Grades 5 to 9.

## Decisions

The owner decided on 23 October 2026:

1. Chemistry starts at **Chemistry 20 and 30**; the chemistry in Science 9 and 10 comes later.
2. English is **one course per grade, English 10, 20 and 30**, following English 10-1, 20-1 and
   30-1.
3. **Chemistry is built first**, then English.

Texts are only from the public domain or written for Gradileo, since anything else would need
permission to show and voice.
