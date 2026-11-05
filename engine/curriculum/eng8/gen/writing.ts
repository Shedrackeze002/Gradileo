/**
 * Grade 8 English, Unit 7: Writing (E8-G1, E8-G2). The argument essay, the literary paragraph,
 * narrative voice and using research. The examples are written for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const G1 = ['E8-G1'];
const G2 = ['E8-G2'];

// ---------------------------------------------------------------------------- 7.1 the argument essay

const THESIS = [
  Q(1, 'What is the thesis of an argument essay?', 'One sentence stating the writer’s position on the issue', ['A list of every source used in the essay', 'The title written at the top of the first page', 'A question the writer leaves for readers to answer'],
    'The thesis, usually at the end of the introduction, tells readers what the essay will argue.'),
  Q(1, 'Which is an arguable thesis?', 'Schools should start an hour later to help students sleep.', ['Many schools start at about eight in the morning.', 'Sleep is something that every human being needs.', 'This essay is going to talk about school start times.'],
    'People could reasonably disagree with it, so it can be argued. The others are facts or announcements.'),
  Q(2, 'Which thesis is the most specific?', 'Our town should ban cars from the high street on Saturdays.', ['Cars are bad and something should be done about them.', 'There are some problems with cars in many places.', 'Everyone has opinions about cars, and that is fine.'],
    'It says exactly what should happen, where and when, so the essay has a clear target.'),
  Q(2, 'Which thesis also previews the essay’s main reasons?', 'Uniforms should stay because they save money, reduce bullying and build pride.', ['Uniforms should stay, and in this essay I will now explain exactly why.', 'Some students like uniforms and some do not like them.', 'Uniforms have been worn in schools for many years now.'],
    'It names three reasons, so readers can see how the body paragraphs will be organised.'),
  Q(3, 'Why is “I think homework is kind of bad, maybe” a weak thesis?', 'It is vague and hedged, so it takes no clear position.', ['It is far too long and detailed to be a thesis.', 'It uses facts and statistics instead of opinion.', 'It argues strongly for one side with clear reasons.'],
    'A strong thesis is confident and precise: “Homework should be limited to thirty minutes a night.”'),
  Q(3, 'Where does the thesis usually go in an argument essay?', 'At the end of the introduction', ['In the middle of the second body paragraph', 'As the very last sentence of the essay', 'In the title, and nowhere else at all'],
    'The introduction hooks the reader and gives background, then the thesis states the position.'),
];

const REBUTTAL = [
  Q(1, 'What is a rebuttal?', 'A reply that shows why an opposing argument is weak', ['A summary of the writer’s own main points at the end', 'A list of sources at the end of the essay', 'A story told at the start to hook readers'],
    'First the writer states the counterargument, then answers it.'),
  Q(1, 'Which sentence introduces a counterargument?', 'Some people argue that a later start would disrupt parents’ work.', ['A later start would help students learn better in the morning.', 'In conclusion, schools should start later.', 'Studies show that teenagers need more sleep.'],
    '“Some people argue” signals that the writer is presenting the other side.'),
  Q(2, 'Why should an argument essay address the other side?', 'It shows the writer is fair and makes the argument stronger.', ['It means the writer has changed their own mind.', 'It fills space so that the essay is longer.', 'It proves that the other side was completely right all along.'],
    'Answering objections builds trust and leaves fewer doubts in the reader’s mind.'),
  Q(2, 'Which is the strongest rebuttal to “Phones in class distract students”?', 'Teachers can set clear rules for when phones are used for learning.', ['Phones are very popular with almost every student.', 'That is a silly idea, and nobody with any sense really believes it.', 'Phones have cameras, games and many other apps.'],
    'It answers the worry directly with a practical solution. Insulting the other side is not a rebuttal.'),
  Q(3, 'What is the best order for a counterargument paragraph?', 'State the opposing view, concede any fair point, then rebut it.', ['Rebut the view, then state it, then give up the argument.', 'Ignore the opposing view and repeat your own thesis.', 'State the opposing view and agree with it completely.'],
    'Conceding a fair point (“It is true that…”) before rebutting makes the writer more convincing.'),
  Q(3, 'Which sentence concedes a point before rebutting it?', 'It is true that uniforms cost money; however, they cost less than daily fashion.', ['Uniforms cost money, so schools should get rid of them as soon as they can.', 'Uniforms are always free, so cost is not an issue.', 'Uniforms cost money, and that is all there is to say.'],
    '“It is true that…; however…” admits a fair point and then answers it.'),
];

// ---------------------------------------------------------------------------- 7.2 the literary paragraph

const EMBED = [
  Q(1, 'What does it mean to embed a quotation?', 'To blend a short quotation into your own sentence', ['To copy a whole page from the text into your essay', 'To put a quotation in a box with no explanation', 'To write the quotation in a different language'],
    'For example: Puck calls humans “fools”, which shows his amusement.'),
  Q(1, 'Which sentence embeds a quotation smoothly?', 'Lysander warns that “the course of true love never did run smooth.”', ['“The course of true love never did run smooth.” Lysander.', 'Lysander. Quote: the course of true love never did run smooth.', 'Lysander says a quote about love and it is in the play.'],
    'The quotation fits into the grammar of the writer’s own sentence.'),
  Q(2, 'What is a “floating” quotation?', 'A quotation dropped into an essay with no introduction or comment', ['A quotation that is far too short to be useful', 'A quotation written in italics instead of quotation marks', 'A quotation that a character speaks while flying'],
    'Every quotation needs a lead-in and an explanation of why it matters.'),
  Q(2, 'Which is the best way to shorten a long quotation?', 'Choose the few key words and embed them in your sentence.', ['Copy the whole speech so nothing is missed.', 'Change the words so the quotation is easier to read.', 'Leave out the quotation marks to save space.'],
    'Short, precise quotations keep the focus on your analysis.'),
  Q(3, 'Which sentence uses a quotation with correct punctuation?', 'Helena says that Hermia is “little” but “fierce”.', ['Helena says that Hermia is little but fierce, quote.', 'Helena says, that Hermia, is “little” but, “fierce”.', 'Helena says “that Hermia is little but fierce” too.'],
    'Only Shakespeare’s exact words go inside the quotation marks.'),
  Q(3, 'Why might a writer use square brackets in a quotation, as in “[Love] looks not with the eyes”?', 'To make a small change so the quotation fits the sentence', ['To show that the words are spoken very loudly', 'To mark a word the writer thinks is spelled wrongly', 'To hide words that the writer disagrees with'],
    'Square brackets show words the writer has added or changed for clarity.'),
];

const ANALYSIS = [
  Q(1, 'What does PEE (or PEEL) stand for in a literary paragraph?', 'Point, Evidence, Explain (Link)', ['Paragraph, Essay, Ending (Length)', 'Plot, Event, Emotion (Lesson)', 'Prose, Example, Edit (Layout)'],
    'Make a point, support it with a quotation, explain it, and link back to the question.'),
  Q(1, 'In a literary paragraph, what should come straight after a quotation?', 'An explanation of what the quotation shows', ['Another quotation with no comment at all', 'A new point about a different character', 'A summary of the whole plot of the text'],
    'The explanation is where the analysis happens.'),
  Q(2, 'Which sentence analyses rather than summarises?', 'Puck’s word “fools” shows he finds human love ridiculous.', ['Puck puts the love potion on the wrong Athenian.', 'Then the lovers run into the forest at night.', 'Puck is a fairy who works for Oberon, the fairy king.'],
    'It explains what a word choice reveals. The others just retell events.'),
  Q(2, 'A student writes: “Bottom says ‘I have had a most rare vision.’ This is a quote from Act 4.” What is missing?', 'An explanation of what the quotation shows', ['A second quotation from a different act', 'A longer description of the plot', 'The name of the writer of the play'],
    'Saying where a quotation comes from is not the same as explaining it.'),
  Q(3, 'Which explanation goes deepest into “And though she be but little, she is fierce”?', '“But” turns a weakness into a strength, so Hermia’s size makes her fierceness surprising.', ['This quotation is about Hermia, and it tells us how little she is compared with Helena.', 'Helena says this about Hermia in the forest at night.', 'This shows that Hermia is a character in the play.'],
    'It zooms in on one word and explains its effect.'),
  Q(3, 'What is the job of the “link” at the end of a literary paragraph?', 'To connect the point back to the essay question', ['To start a story about the writer’s own life', 'To add a quotation that has not been explained', 'To list the page numbers of every quotation'],
    'The link reminds the reader how the paragraph answers the question.'),
];

// ---------------------------------------------------------------------------- 7.3 narrative voice

const VOICE = [
  Q(1, 'What is narrative voice?', 'The personality and attitude that comes through in how a story is told', ['The volume at which a story is read aloud', 'The list of characters at the start of a book', 'The number of chapters and parts that a story is divided into by the author'],
    'Voice comes from word choice, sentence rhythm and the narrator’s attitude.'),
  Q(1, 'Which opening has a strong, distinctive voice?', 'Look, I never meant to flood the gym. Nobody believes that, but it’s true.', ['The gym was flooded. It happened on a Tuesday.', 'This is a story about a school gym that was flooded once, a long time ago.', 'There was water in the gym and it was very wet.'],
    'The narrator speaks directly to the reader with a defensive, funny attitude.'),
  Q(2, 'How does this narrator’s voice create character?', 'The long, breathless sentence shows the narrator’s excitement.', ['The narrator is calm and speaks in short, careful sentences.', 'The narrator does not seem to care about anything.', 'The voice tells us nothing about the narrator.'],
    'Rhythm is part of voice. A rush of clauses joined by “and” sounds excited.', 'And then the gates opened and the crowd roared and I ran and ran and I didn’t even feel my legs.'),
  Q(2, 'A writer wants a narrator who sounds old and wise. Which choice fits best?', 'Calm, reflective sentences that look back on events', ['Lots of slang and text-message abbreviations', 'Short, panicked sentences full of questions and shouts', 'A narrator who never notices anything at all'],
    'Voice should match the narrator’s age and personality.'),
  Q(3, 'What is the main risk of changing narrative voice in the middle of a story?', 'Readers may lose trust in the narrator and feel confused.', ['The story will automatically become much shorter to read.', 'Readers will not notice any change at all.', 'Every story must change voice at least once.'],
    'Keep a voice consistent unless a change is deliberate and signalled.'),
  Q(3, 'Which revision gives “I was scared” more voice?', 'My knees had turned to custard, and I wasn’t ashamed to admit it.', ['I was very scared at that moment.', 'I was scared and I was frightened.', 'Fear was felt by me in that moment, and I was very, very scared.'],
    'A vivid, personal image shows the feeling and the narrator’s humour.'),
];

const DIALOGUE = [
  Q(1, 'Which line of dialogue is punctuated correctly?', '“We’re late,” said NAME.', ['“We’re late” said NAME.', '“We’re late”, said NAME.', '“We’re late,” Said NAME.'],
    'The comma goes inside the closing speech mark, and “said” stays lower case.'),
  Q(1, 'When should a writer start a new line in dialogue?', 'Each time a different character speaks', ['After every three lines of speech', 'Only when the scene changes place', 'Never: all speech goes in one paragraph'],
    'A new paragraph for each speaker keeps the conversation clear.'),
  Q(2, 'Why might a writer use “said” rather than words such as “exclaimed” or “retorted” in most dialogue tags?', '“Said” is almost invisible, so the reader focuses on the words spoken.', ['“Said” is the only dialogue tag that is correct.', '“Said” makes every character sound very angry.', 'Other dialogue tags are not allowed in any published stories or novels.'],
    'Fancy tags used too often distract readers from the dialogue itself.'),
  Q(2, 'Which line uses an action beat instead of a tag?', 'NAME slammed the door. “I’m not going.”', ['“I’m not going,” said NAME angrily.', '“I’m not going,” NAME said to NAME2.', '“I’m not going,” replied NAME at last.'],
    'The action shows who speaks and how {he} feels, with no “said” needed.'),
  Q(3, 'What is subtext in dialogue?', 'Meaning beneath the words that characters do not say directly', ['Words printed in small type beneath the dialogue', 'Dialogue that has been translated from another language', 'The stage directions written under a script'],
    'For example, “Fine. Do what you want” may really mean “I’m hurt.”'),
  Q(3, 'Which exchange uses subtext best?', '“Nice haircut.” “Thanks. It’ll grow back.”', ['“I am upset about my haircut.” “I can see that you are upset.”', '“Do you like my haircut?” “Yes, I like your haircut a lot.”', '“My haircut is bad.” “Yes, your haircut is bad.”'],
    '“It’ll grow back” shows the character dislikes the haircut without saying so.'),
];

// ---------------------------------------------------------------------------- 7.4 using research

const INTEGRATE = [
  Q(1, 'What is paraphrasing?', 'Putting a source’s idea into your own words', ['Copying a source word for word with no marks', 'Making up a source that does not exist', 'Translating a source into a different language'],
    'A paraphrase still needs a citation, because the idea belongs to the source.'),
  Q(1, 'When is a direct quotation the best choice?', 'When the source’s exact words are powerful or important', ['Whenever you cannot be bothered to paraphrase the idea', 'Only in the conclusion of an essay', 'Never: quotations are not allowed in research'],
    'Quote memorable or precise wording; paraphrase everything else.'),
  Q(2, 'Which sentence introduces a source with a signal phrase?', 'According to a 2024 survey by the town council, most residents want more parks.', ['Most residents want more parks, and everyone in the town already knows this.', 'Parks. Most residents want them. 2024 survey.', 'I think most residents probably want more parks.'],
    '“According to…” tells the reader where the information comes from.'),
  Q(2, 'What is plagiarism?', 'Presenting someone else’s words or ideas as your own', ['Using more than three sources in one essay', 'Quoting a source and citing it correctly', 'Writing a research essay about a famous person'],
    'Citing every source, even for a paraphrase, avoids plagiarism.'),
  Q(3, 'Which is the best paraphrase of “Regular exercise significantly reduces the risk of heart disease”?', 'Exercising often can greatly lower a person’s chance of heart problems.', ['Regular exercise significantly reduces the risk of heart disease.', 'Exercise is something that some people enjoy doing.', 'Heart disease significantly reduces regular exercise.'],
    'It keeps the meaning but uses new words and structure. Repeating the sentence word for word is quoting, not paraphrasing.'),
  Q(3, 'After quoting a source, what should a writer do?', 'Explain how the evidence supports their point', ['Move straight on to a new quotation', 'Repeat the quotation in capital letters', 'Apologise for using someone else’s words'],
    'Research evidence, like literary evidence, needs explanation.'),
];

const CITATION = [
  Q(1, 'Why do writers cite their sources?', 'To credit the original author and let readers check the information', ['To make the essay look longer than it is', 'Because sources are always more correct than the writers who use them', 'To show that they did not do any of the work'],
    'Citations give credit and allow readers to find the source.'),
  Q(1, 'What is a bibliography (or works cited list)?', 'A list of all the sources used, at the end of a piece of writing', ['A short biography of the writer of the essay', 'The table of contents at the front of a book', 'A list of difficult words with their meanings, at the back'],
    'It is usually in alphabetical order by the author’s surname.'),
  Q(2, 'Which detail does a citation for a website usually need?', 'The author or organisation, title, site name, date and web address', ['Only the colour scheme and the font that are used on the website', 'The number of adverts shown on the home page', 'The name of the computer used to read it'],
    'These details let a reader find the same page again.'),
  Q(2, 'Which sentence shows an in-text citation?', 'Teenagers need about nine hours of sleep (Okafor, 2023).', ['Teenagers need about nine hours of sleep, I read somewhere.', 'Teenagers need about nine hours of sleep. Thank you.', 'Teenagers need about nine hours of sleep, probably.'],
    'The author’s surname and the year in brackets point to the full entry in the bibliography.'),
  Q(3, 'A student paraphrases an idea from a book but adds no citation. Why is this a problem?', 'It is still plagiarism, because the idea belongs to the author.', ['It is fine, because the words have been changed.', 'Paraphrases are never allowed in research essays.', 'It is only a problem if the book is very old or out of print.'],
    'Every borrowed idea needs a citation, whether it is quoted or paraphrased.'),
  Q(3, 'How are entries usually ordered in a works cited list?', 'Alphabetically by the author’s surname', ['By how much the writer liked each source', 'By the number of pages in each source', 'In the order the writer happened to find them'],
    'Alphabetical order makes each source easy to find.'),
];

// ---------------------------------------------------------------------------- skills

export const WRITING_SKILLS: SkillDef[] = [
  skill({ id: 'e8-argument-thesis', name: 'Thesis statements', description: 'Write and recognise clear, specific, arguable thesis statements.', outcomes: G1, lessonId: 'e8-7-1', format: 'mc', gen: bank(THESIS, ['A thesis can be argued against.', 'Be specific: what, where, why.']) }),
  skill({ id: 'e8-rebuttal', name: 'Counterarguments and rebuttals', description: 'Present an opposing view fairly, concede where fair and rebut it.', outcomes: G1, lessonId: 'e8-7-1', format: 'mc', gen: bank(REBUTTAL, ['State the other side, concede a fair point, then answer it.']) }),
  skill({ id: 'e8-embed-quotes', name: 'Embedding quotations', description: 'Blend short quotations smoothly and correctly into your own sentences.', outcomes: G1, lessonId: 'e8-7-2', format: 'mc', gen: bank(EMBED, ['Keep quotations short.', 'Make the quotation fit your sentence’s grammar.']) }),
  skill({ id: 'e8-analysis', name: 'Writing analysis', description: 'Explain evidence in a literary paragraph instead of summarising.', outcomes: G1, lessonId: 'e8-7-2', format: 'mc', gen: bank(ANALYSIS, ['Point, Evidence, Explain, Link.', 'Zoom in on a word and explain its effect.']) }),
  skill({ id: 'e8-narrative-voice', name: 'Narrative voice', description: 'Create and keep a distinctive narrative voice.', outcomes: G2, lessonId: 'e8-7-3', format: 'mc', gen: bank(VOICE, ['Voice is word choice, rhythm and attitude.']) }),
  skill({ id: 'e8-dialogue-craft', name: 'Writing dialogue', description: 'Punctuate dialogue, use tags and action beats, and write subtext.', outcomes: G2, lessonId: 'e8-7-3', format: 'mc', gen: bank(DIALOGUE, ['New speaker, new line.', 'Punctuation goes inside the speech marks.']) }),
  skill({ id: 'e8-integrate-sources', name: 'Quoting and paraphrasing', description: 'Integrate research through quotation, paraphrase and signal phrases.', outcomes: G2, lessonId: 'e8-7-4', format: 'mc', gen: bank(INTEGRATE, ['Introduce a source with a signal phrase.', 'Cite paraphrases too.']) }),
  skill({ id: 'e8-citation', name: 'Citing sources', description: 'Cite sources in the text and in a works cited list.', outcomes: G2, lessonId: 'e8-7-4', format: 'mc', gen: bank(CITATION, ['Give the author and year in the text.', 'List every source alphabetically at the end.']) }),
];
