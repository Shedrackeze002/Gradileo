# Plan: English Grades 5 to 9

The owner's decision (4 November 2026): English runs Grades 5 to 12, like mathematics. Grades 10
to 12 exist (`eng-10`, `eng-20`, `eng-30`); this plan adds Grades 5 to 9 (`eng-5` to `eng-9`),
one course at a time, each in its own pull request, each a `draft` until its last unit is written.

## How the courses are built

- The same pattern as Grade 10 English: `engine/curriculum/eng<N>/course.ts` (outcomes, units,
  lessons), question generators in `gen/`, lessons in `src/content/eng<N>/lessons/`, registered in
  `engine/curriculum/index.ts` and `all.ts`, then `npm run catalog`.
- Written for learners anywhere, at the level of that grade, and not tied to one curriculum's
  codes. The strands follow what English-speaking curricula share at these grades (Alberta and
  other Canadian ELA, the US Common Core, England's Key Stages 2 and 3): reading fiction, poetry,
  non-fiction and media; vocabulary; grammar and punctuation; and writing.
- Every quoted text is in the public domain (Aesop, the Grimms, Andersen, Kipling, Stevenson,
  Rossetti, Lear, Alcott, Montgomery, Twain, London, Burnett, Grahame, Barrie, Shakespeare and
  others) or written for Gradileo. Lessons link to free full texts.
- Each course has about 24 lessons in six or seven units, with two or three skills a lesson. Every
  skill has three difficulties; answers are multiple choice, ordering or short typed answers, and
  no keyed answer stands out by its length (`answer-length.test.ts`).
- The ideas spiral: each grade revisits the strands with harder texts and finer terms, so Grade 9
  leads into Grade 10 English.
- Placement goes by grade: a learner in Grades 5 to 9 is recommended their own grade's English,
  with the grade before as the alternative. A grade is offered only once its course is listed.
- Videos follow each course, one per lesson (`video/README.md`).

## Grade 5 English (`eng-5`)

1. **Stories**: story elements (character, setting, plot); characters' traits and feelings;
   problem, events and solution in order; the lesson of a fable or folk tale.
2. **Poetry**: rhyme and rhythm; similes and metaphors; images and the senses; forms (haiku,
   limerick, acrostic, free verse).
3. **Reading for Information**: main idea and details; text features; text structures (sequence,
   compare and contrast, cause and effect, problem and solution); fact and opinion.
4. **Words**: prefixes and suffixes; synonyms, antonyms and shades of meaning; context clues;
   homophones.
5. **Grammar and Punctuation**: nouns, verbs, adjectives and adverbs; complete sentences and
   subject-verb agreement; capitals and end marks; commas and quotation marks.
6. **Writing**: the paragraph (topic sentence, details, closing); narrative writing; opinion
   writing with reasons; revising and editing.

## Grade 6 English (`eng-6`)

Stories (plot stages, character and motive, first- and third-person narrators, theme); Poetry
(personification and hyperbole, sound devices, stanzas and rhyme scheme, mood); Non-fiction
(summarizing, text structure, author's purpose, claims and evidence); Media (images and
advertising); Words (Greek and Latin roots, connotation, idioms); Grammar (pronouns, verb tenses,
simple and compound sentences, commas and apostrophes); Writing (narrative, informational,
persuasive, revising).

## Grade 7 English (`eng-7`)

Short stories (conflict, direct and indirect characterization, setting and mood, foreshadowing and
flashback, theme and symbol); Poetry (imagery, sound and rhythm, the ballad, the sonnet and free
verse, speaker and tone); Drama (scripts, stage directions and dialogue); Non-fiction (claims,
evidence and persuasive techniques, bias); Media; Grammar (phrases and clauses, complex sentences,
fragments and run-ons, agreement, punctuation); Writing (the paragraph, the essay, narrative,
research and citing sources).

## Grade 8 English (`eng-8`)

Fiction (plot and subplot, irony, omniscient and limited narrators, theme across texts); Poetry
(figurative language, form, tone and shifts); Drama (a first Shakespeare comedy, *A Midsummer
Night's Dream*); Non-fiction (argument, ethos, pathos and logos, evaluating sources); Media (film
techniques, news); Grammar (active and passive voice, modifiers, parallel structure, semicolons and
colons); Writing (the argument essay, the literary paragraph, narrative, research).

## Grade 9 English (`eng-9`)

Fiction (a novel's structure, character arcs, reliable and unreliable narrators, symbol and
allegory); Poetry (metre, form and close reading); Drama (Shakespeare's *The Tempest* or a short
play); Non-fiction (rhetoric, argument and fallacies); Media; Grammar (sentence variety, verbals,
agreement in hard cases, punctuation for effect); Writing (thesis-driven essays, the personal
essay, timed writing). It leads straight into Grade 10 English.
