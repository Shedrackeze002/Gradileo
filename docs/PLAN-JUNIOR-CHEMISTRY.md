# Plan: junior chemistry, Grades 7 to 9

The owner chose junior chemistry as the subject after Alberta's new Grades 7 to 9 mathematics
(11 November 2026). Gradileo's chemistry started at Grade 10 (`chem-10`), so a learner in the
junior grades had nothing to study. These three courses lead into it.

## Shape

- Three courses, **Chemistry 7, 8 and 9** (`chem-7`, `chem-8`, `chem-9`), subject Chemistry, about
  15 lessons each, built one grade per pull request so each can be listed for classes as soon as
  it merges.
- Two question types (skills) per lesson, each with three difficulties. Most junior chemistry
  questions are about ideas, not sums, so a shared helper (`engine/curriculum/chemjr/bank.ts`)
  builds a skill from banks of written questions (one answer, or "select every correct answer"),
  mixed with generated calculations (density, concentration, solubility, temperature changes)
  where the topic has numbers.
- Wrong answers are written to be as long and as plausible as the right one, so the longest
  option is not a give-away.
- Neutral settings and names, Canadian/British spelling, and every rule or value a question needs
  (a melting point, a solubility, a density) is stated in the question or the lesson's table.
- An explainer video of at least two minutes for each lesson, in Drive and the YouTube queue, and
  the tutor's recordings from the Tutor voice workflow after each merge.

## Grade 7: matter, particles, mixtures

| Unit | Lessons |
|---|---|
| Matter and Measurement | lab safety and hazard symbols; what matter is and its properties; measuring mass and volume; density and floating |
| The Particle Model | solids, liquids and gases; changes of state; temperature and heat; expansion and diffusion |
| Mixtures and Solutions | pure substances and mixtures; solutions and concentration; solubility and saturation; the rate of dissolving and fair tests |
| Separating Mixtures | sieving, magnets and filtering; evaporation and distillation; chromatography and choosing a method |

## Grade 8: atoms, elements and compounds (built)

`chem-8`, "Chemistry 8", in `engine/curriculum/chem8/` and `src/content/chem8/`.

| Unit | Lessons |
|---|---|
| Atoms, Elements and Compounds | atoms and elements; compounds and molecules; elements, compounds and mixtures; chemical formulas |
| The Periodic Table | organizing the elements; metals and non-metals; families of elements; patterns in the table |
| Physical and Chemical Changes | physical and chemical changes; signs of a chemical reaction; word equations |
| Reactions and Materials | burning; rusting and corrosion; metals and alloys; polymers, ceramics and composites |

## Grade 9: atomic structure and reactions (built)

`chem-9`, "Chemistry 9", in `engine/curriculum/chem9/` and `src/content/chem9/`. Grade 10
Chemistry's placement check now starts from Grade 9's skills.

| Unit | Lessons |
|---|---|
| Atomic Structure | inside the atom; atomic number, mass number and isotopes; electron arrangements; ions |
| Formulas and Names | ionic and covalent bonding; formulas of ionic compounds; naming compounds; relative formula mass |
| Reactions and Conservation of Mass | conservation of mass; balancing equations; types of reaction; rates of reaction |
| Acids and Bases | acids, bases and indicators; the pH scale; neutralization |

## Sources

The topics follow what Grades 7 to 9 learners study in several curricula, so the courses fit more
than one school system:

- Alberta's Science 7 to 9 program of studies (Heat and Temperature in Grade 7, Mix and Flow of
  Matter in Grade 8, Matter and Chemical Change in Grade 9).
- England's Key Stage 3 science programme of study (the chemistry strand: the particulate nature
  of matter, pure and impure substances, atoms, elements and compounds, chemical reactions).
- The US Next Generation Science Standards for middle school (MS-PS1-1 to MS-PS1-6 on the
  structure and properties of matter and chemical reactions, and MS-PS3 on energy).
