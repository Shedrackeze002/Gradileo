/**
 * Grade 9 English, Unit 1: Fiction (E9-A1, E9-A2). The structure of a novel and pacing, character
 * arcs and foils, symbol and allegory, and diction and syntax. Passages are written for Gradileo
 * unless a source is given.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const A1 = ['E9-A1'];
const A2 = ['E9-A2'];

// ---------------------------------------------------------------------------- 1.1 structure and pacing

const STRUCTURES = ['Chronological order', 'A flashback', 'Parallel plots', 'Multiple narrators'];
const struct = (d: 1 | 2 | 3, text: string, k: number, why: string) =>
  Q(d, 'Which structure is described?', STRUCTURES[k], STRUCTURES.filter((_, i) => i !== k), why, text);

const STRUCTURE = [
  struct(1, 'A novel follows a girl from her first day at a new school to her last, one month at a time.', 0,
    'Events are told in the order they happen: chronological order.'),
  struct(1, 'In the middle of a tense exam, the narrator suddenly remembers the day her grandfather taught her to swim, and the next chapter tells that day.', 1,
    'The story jumps back to an earlier time: a flashback.'),
  struct(2, 'Chapters switch between a soldier in 1916 and his great-granddaughter reading his letters in the present day.', 2,
    'Two storylines in different times run side by side: parallel plots.'),
  struct(2, 'Each chapter is told by a different member of the same family, each giving their own version of one summer.', 3,
    'The story passes between several voices: multiple narrators.'),
  Q(3, 'Why might a novelist tell one event through several narrators?', 'To show how differently people can see the same event', ['To make sure every chapter is exactly the same length', 'To avoid giving any character a point of view at all', 'To repeat the same facts so readers can memorize them'],
    'Different narrators reveal different truths, so readers have to weigh them up.'),
  Q(3, 'A novel opens with a funeral, then goes back to tell the year before it. What is the effect of this structure?', 'Readers know the ending, so they read to find out how and why it happened.', ['Readers are surprised by the funeral on the very last page of the book.', 'Readers cannot tell which events happened first or last in the story.', 'Readers lose interest because there is nothing left to wonder about.'],
    'Starting at the end replaces “what happens?” with “how did it come to this?”'),
];

const PACING = [
  Q(1, 'What is pacing in a story?', 'The speed at which events unfold for the reader', ['The number of characters who appear in the story', 'The order in which the chapters were first written', 'The amount of dialogue printed on each page'],
    'Writers speed up or slow down a story to control tension and focus.'),
  Q(1, 'Which technique usually speeds up the pace of a scene?', 'Short sentences and quick action', ['Long descriptions of the weather', 'A character’s slow memories of the past', 'Detailed lists of every object in a room'],
    'Short, punchy sentences and fast events push the reader forward.'),
  Q(2, 'Why does this passage slow down at the most important moment?', 'Stretching the moment makes it feel tense and important.', ['The writer has run out of action to describe.', 'The narrator is bored and does not care what happens.', 'Slow pacing shows that the moment does not matter at all.'],
    'Slowing time at a key moment holds the reader in the suspense.',
    'The ball rose. It hung against the white sky for what felt like an hour. I could hear my own breath, the creak of the bench, a dog somewhere far away. Then it began to fall.'),
  Q(2, 'What is a cliffhanger?', 'An ending that leaves a chapter or story in suspense', ['A scene that takes place on the edge of a cliff', 'A summary of the plot printed at the end of a book', 'A calm chapter in which every problem is solved'],
    'A cliffhanger stops at a moment of danger or surprise, so readers keep going.'),
  Q(3, 'A novelist covers ten years in one paragraph, then spends a whole chapter on a single afternoon. What does this tell the reader?', 'The afternoon matters far more to the story than the years.', ['The ten years were the most exciting part of the story.', 'The writer made a mistake in planning the novel’s length.', 'Both periods are equally important to the main character.'],
    'Writers spend the most time on what matters most.'),
  Q(3, 'Why might a thriller alternate fast chase scenes with quiet scenes?', 'The quiet scenes let tension build again and make the action hit harder.', ['Quiet scenes are needed so that the book reaches a set number of pages.', 'Readers of thrillers prefer stories in which nothing much happens.', 'The writer wants the reader to forget about the chase completely.'],
    'Variation in pace keeps readers from becoming numb to constant action.'),
];

// ---------------------------------------------------------------------------- 1.2 character arcs and foils

const ARC = [
  Q(1, 'What is a character arc?', 'The way a character changes over the course of a story', ['The list of characters printed at the start of a novel', 'The shape of the plot diagram drawn in class', 'The first scene in which a character appears'],
    'A character arc traces who a character is at the start, what changes them, and who they become.'),
  Q(1, 'What is a static character?', 'A character who stays essentially the same', ['A character who changes a great deal by the end', 'A character who never speaks in the story', 'A character who appears in only one scene'],
    'A dynamic character changes; a static character does not.'),
  Q(2, 'What has changed in NAME?', '{He} has learned to put others before winning.', ['{He} has become even more selfish than before.', '{He} has decided never to play football again.', '{He} has not changed at all since the start.'],
    'At the start NAME cares only about scoring; at the end {he} passes so a teammate can score.',
    'At the start of the season, NAME never passed the ball. In the final, with the goal open in front of {him}, {he} slid it across to the new boy, who had never scored, and grinned as the crowd roared.'),
  Q(2, 'What is the catalyst in a character arc?', 'The event that pushes a character to change', ['The final sentence of the very last chapter', 'The character who narrates the whole story', 'A description of where the story takes place'],
    'A catalyst, such as a loss, a meeting or a mistake, sets the change in motion.'),
  Q(3, 'In Charles Dickens’s “A Christmas Carol” (1843), Scrooge begins as a miser and ends as a generous man. What drives his change?', 'The visits of the ghosts show him his past, present and future.', ['He wins a large amount of money and no longer needs to save.', 'His nephew forces him to change by threatening him with the law.', 'He is generous from the start but hides it from other people.'],
    'Each ghost confronts Scrooge with a truth he has ignored, and by the end he chooses to change.'),
  Q(3, 'What is an epiphany in a story?', 'A sudden moment when a character understands a truth', ['A long journey that a character makes to a far-off country', 'A character who works against the main character', 'A scene that is set at night during a storm'],
    'An epiphany is often the turning point of a character arc.'),
];

const FOIL = [
  Q(1, 'What is a foil?', 'A character whose contrast with another highlights their traits', ['A character who tells the whole story in the first person', 'A character who appears only in the final chapter', 'A character who is the exact copy of the main one'],
    'Setting two characters side by side makes each one’s traits stand out.'),
  Q(2, 'How does NAME2 act as a foil to NAME?', 'NAME2’s caution makes NAME’s recklessness stand out.', ['NAME2 is exactly as reckless as NAME is.', 'NAME2 tells the whole story of NAME’s life as narrator.', 'NAME2 does not appear in the same scene.'],
    'The contrast between the two makes each trait clearer.',
    'NAME leapt from the rocks without looking. NAME2 tested the water with one toe, checked the depth twice, and only then lowered {him2}self in.'),
  Q(2, 'In “A Christmas Carol”, Scrooge’s clerk Bob Cratchit is poor but warm and cheerful. How does he act as a foil?', 'His kindness in poverty shows how cold Scrooge is despite his wealth.', ['He is just as greedy and miserable as Scrooge is at the start.', 'He is the narrator who tells the whole story to the reader.', 'He has no connection to Scrooge or to the story’s message.'],
    'The poor man who gives freely sharpens our view of the rich man who will not.'),
  Q(3, 'Why might a writer give the hero a foil who makes the opposite choice in the same situation?', 'To show what the hero’s choice means by showing the alternative', ['To make the story twice as long by telling it all twice', 'To prove that the hero’s choice was completely wrong', 'To give the reader a break from the main character'],
    'Seeing the road not taken makes the hero’s choice clearer.'),
  Q(3, 'Which pair are most clearly foils?', 'A brave knight and his cowardly squire', ['Two brothers who are both brave knights', 'A knight and the horse that he rides', 'A knight and the castle where he lives'],
    'Foils share a situation but differ in a key trait.'),
];

// ---------------------------------------------------------------------------- 1.3 symbol and allegory

const SYMBOL = [
  Q(1, 'What is a symbol in a story?', 'An object, person or place that stands for a bigger idea', ['A word that is printed in bold or in italics', 'The name of the person who wrote the story', 'A character who describes everything that happens'],
    'A symbol has its ordinary meaning and a deeper one.'),
  Q(1, 'What is a motif?', 'An image or idea that keeps recurring through a text', ['A single word that appears only once in a text', 'The main character’s reason for acting as they do', 'The last line of a story or a poem'],
    'Recurring images, such as birds or mirrors, build meaning across a text.'),
  Q(2, 'What might the locked garden symbolize?', 'The grandmother’s grief, shut away since her husband died', ['A good place for the children to play football', 'The grandmother’s wish to grow more vegetables there', 'Nothing: it is only a description of the house'],
    'The garden was the grandfather’s and has been locked since his death, so it stands for closed-off grief.',
    'The garden had been Grandpa’s. Since the funeral, Grandma had kept its gate locked, and nobody had seen her go in. Weeds climbed the walls.'),
  Q(2, 'Later in the story, Grandma unlocks the garden and starts to pull up the weeds. What does this suggest?', 'She is beginning to heal from her grief.', ['She has decided to sell the house straight away.', 'She wants to keep the children out of the garden.', 'She has forgotten all about her husband now.'],
    'A change to a symbol often marks a change in the character linked to it.'),
  Q(3, 'A caged bird appears three times in a novel about a girl whose parents control her life. What role does it play?', 'It is a motif that reflects her own lack of freedom.', ['It is the narrator who tells the whole story.', 'It is the main conflict of the whole novel.', 'It is a red herring that leads readers astray.'],
    'The repeated image mirrors the girl’s situation.'),
  Q(3, 'Why should you be careful when interpreting symbols?', 'A good reading is supported by evidence from the text, not guesswork.', ['Every object in a story is a symbol, so all readings are correct.', 'Symbols only appear in poems, never in novels or stories.', 'The writer always explains the meaning of every symbol.'],
    'A symbol gains its meaning from patterns and context in the text.'),
];

const ALLEGORY = [
  Q(1, 'What is an allegory?', 'A story whose characters and events stand for ideas or real events', ['A story that is told in the order events happened', 'A story that has no characters or plot at all', 'A story that is told by more than one narrator, each in turn'],
    'An allegory works on two levels: the surface story and its hidden meaning.'),
  Q(1, 'In Aesop’s fable of the tortoise and the hare, what does the race stand for?', 'Any challenge, where steady effort beats careless speed', ['A real race that happened in ancient Greece', 'A lesson about how to look after pet animals', 'A warning never to run in any kind of race at all'],
    'The animals stand for kinds of people, and the race stands for any challenge.'),
  Q(2, 'George Orwell’s “Animal Farm” (1945) tells of farm animals who overthrow their farmer, only for the pigs to become tyrants. What does it allegorize?', 'A revolution that ends in a new dictatorship', ['The daily routine of running a real farm', 'A children’s adventure about talking animals', 'The history of farming in England over time'],
    'Orwell based the story on the Russian Revolution and the rise of Stalin.'),
  Q(2, 'In Plato’s allegory of the cave, prisoners see only shadows on a wall and think they are real. What do the shadows stand for?', 'A false or limited picture of reality', ['The fire that keeps the prisoners warm', 'The prisoners’ happy memories of home', 'The real world outside in the daylight'],
    'Leaving the cave stands for learning to see the truth.'),
  Q(3, 'How is an allegory different from a story that simply has a symbol in it?', 'In an allegory the whole story maps onto a second meaning.', ['An allegory has no symbols in it anywhere at all.', 'A symbol always appears on the first page of a story.', 'An allegory is always much shorter than a story.'],
    'A symbol is one element; an allegory is a whole system of meanings.'),
  Q(3, 'What is a parable?', 'A short story that teaches a moral or religious lesson', ['A long novel about the whole history of a country', 'A poem with exactly fourteen lines in it', 'A play performed with puppets for children'],
    'Parables, like fables, use a simple story to teach a lesson, but usually with people rather than animals.'),
];

// ---------------------------------------------------------------------------- 1.4 diction and syntax

const DICTION = [
  Q(1, 'What is diction?', 'A writer’s choice of words', ['The order of the chapters in a book', 'The way a book’s pages are numbered', 'A list of hard words at the back of a book'],
    'Diction can be formal or informal, plain or ornate, harsh or gentle.'),
  Q(1, 'Which sentence uses formal diction?', 'The committee has postponed its decision.', ['The committee’s gone and put it off again.', 'The committee totally bailed on deciding.', 'The committee is like, not deciding yet.'],
    'Formal diction avoids slang and contractions.'),
  Q(2, 'What does the diction in this passage suggest about the room?', 'It is grim and threatening.', ['It is warm and welcoming.', 'It is bright and cheerful.', 'It is tidy and peaceful.'],
    'Words such as “clawed”, “gnawed” and “choked” make the room feel hostile.',
    'Damp clawed at the walls. Something had gnawed the skirting boards, and the air choked with dust.'),
  Q(2, 'Why might a writer use colloquial diction for a narrator?', 'To make the narrator sound natural, like a real person talking', ['To make the narrator sound like a formal legal report', 'To hide the narrator’s personality from the reader', 'To prove that the narrator is the villain of the story'],
    'Everyday language creates a close, conversational voice.'),
  Q(3, 'A writer describes a sunset as “the sky bled”. How does this diction shape the mood?', 'It makes the sunset feel violent and ominous.', ['It makes the sunset feel calm and gentle.', 'It shows the sunset is boring and ordinary.', 'It has no effect on the mood of the scene.'],
    'The connotations of “bled” bring pain and danger to an image that is usually peaceful.'),
];

const SYNTAX = [
  Q(1, 'What is syntax?', 'The way words are arranged into sentences', ['The meaning of a single difficult word', 'The sound that a word makes when spoken', 'The title of a book and its author'],
    'Syntax covers sentence length, word order and structure.'),
  Q(1, 'What effect does a very short sentence after several long ones usually have?', 'It hits hard and draws attention to itself.', ['It slows the reader down and calms them.', 'It makes the paragraph harder to follow.', 'It shows the writer has made a mistake.'],
    'A sudden short sentence stands out against long ones.'),
  Q(2, 'What is the effect of the syntax at the end of this passage?', 'The short fragment shocks the reader after the long, flowing sentence.', ['The short fragment makes the scene feel calm and slow to the reader.', 'The long sentence shows that the narrator is bored with the day.', 'The syntax has no effect, because only the words matter here.'],
    'The long sentence builds a peaceful picture; “Then the siren.” breaks it.',
    'We spent the morning on the beach, building towers and digging moats and chasing the waves as they slid back down the sand. Then the siren.'),
  Q(2, 'What is a sentence fragment?', 'A group of words punctuated as a sentence but missing a main clause', ['A sentence that is more than thirty words long from start to end', 'A sentence that ends with a question mark', 'A sentence that has two verbs joined by and'],
    'Fragments are usually errors, but writers use them deliberately for effect.'),
  Q(3, 'A writer uses a long sentence full of commas and “and” to describe a panic. Why?', 'The rush of clauses mirrors the breathless, chaotic feeling of panic.', ['Long sentences always make a scene feel calm and orderly to readers.', 'The writer wanted to make the passage easier for young readers to follow.', 'Long sentences show that the narrator is very relaxed about the situation.'],
    'Syntax can imitate what it describes.'),
  Q(3, 'Why might a writer invert normal word order, as in “Silent was the house”?', 'To place emphasis on the first word and create a formal tone', ['To make the sentence easier and quicker to read', 'To correct a spelling mistake in the original sentence', 'To show that the house is noisy and busy'],
    'Putting “Silent” first gives it weight.'),
];

// ---------------------------------------------------------------------------- skills

export const FICTION_SKILLS: SkillDef[] = [
  skill({ id: 'e9-novel-structure', name: 'How a novel is structured', description: 'Identify chronological order, flashbacks, parallel plots and multiple narrators, and explain their effects.', outcomes: A1, lessonId: 'e9-1-1', format: 'mc', gen: bank(STRUCTURE, ['Ask: in what order are the events told, and by whom?']) }),
  skill({ id: 'e9-pacing', name: 'Pacing', description: 'Explain how a writer speeds up and slows down a story.', outcomes: A1, lessonId: 'e9-1-1', format: 'mc', gen: bank(PACING, ['Short sentences speed things up; detail slows them down.', 'Writers linger on what matters most.']) }),
  skill({ id: 'e9-character-arc', name: 'Character arcs', description: 'Trace how a character changes, and what causes the change.', outcomes: A1, lessonId: 'e9-1-2', format: 'mc', gen: bank(ARC, ['Compare the character at the start and the end.', 'Find the catalyst that caused the change.']) }),
  skill({ id: 'e9-foil', name: 'Foils', description: 'Explain how a contrasting character reveals another’s qualities.', outcomes: A1, lessonId: 'e9-1-2', format: 'mc', gen: bank(FOIL, ['Foils share a situation but differ in a key trait.']) }),
  skill({ id: 'e9-symbol', name: 'Symbols and motifs', description: 'Interpret symbols and recurring motifs using evidence from the text.', outcomes: A2, lessonId: 'e9-1-3', format: 'mc', gen: bank(SYMBOL, ['Ask: what bigger idea is this object linked to?', 'Look for patterns and changes.']) }),
  skill({ id: 'e9-allegory', name: 'Allegory', description: 'Explain how an allegory carries a second meaning.', outcomes: A2, lessonId: 'e9-1-3', format: 'mc', gen: bank(ALLEGORY, ['An allegory works on two levels: the story and what it stands for.']) }),
  skill({ id: 'e9-diction', name: 'Diction', description: 'Describe a writer’s word choice and its effect on tone and mood.', outcomes: A2, lessonId: 'e9-1-4', format: 'mc', gen: bank(DICTION, ['Look at the connotations of key words.', 'Is the diction formal or colloquial?']) }),
  skill({ id: 'e9-syntax', name: 'Syntax', description: 'Explain how sentence length and structure create effects.', outcomes: A2, lessonId: 'e9-1-4', format: 'mc', gen: bank(SYNTAX, ['Notice sudden changes in sentence length.', 'Ask: does the sentence shape imitate its subject?']) }),
];
