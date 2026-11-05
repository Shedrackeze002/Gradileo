/**
 * Grade 7 English, Unit 3: Drama (E7-C1). Reading a script: its parts, stage directions, dialogue,
 * asides and monologues. The scenes are written for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const C1 = ['E7-C1'];

/** A short scene used across the unit (the lessons quote it too). */
export const ATTIC = 'Scene 2. An attic, dusty and dim. A single window. A large trunk stands in the corner.\n\n(NAME enters, holding a torch. NAME2 follows, close behind.)\n\nNAME: (whispering) Grandma said never to open the trunk.\nNAME2: Then why are we here?\nNAME: (kneeling by the trunk) Because she never said why.\n(A floorboard creaks downstairs. They both freeze.)';

// ---------------------------------------------------------------------------- 3.1 reading a script

const PARTS = [
  Q(1, 'What is a script?', 'The written text of a play', ['A long story told only by a narrator', 'A poem with a strong rhyme and rhythm', 'A list of the actors’ home addresses'],
    'A script is what actors and directors work from: who speaks, what they say, and what happens on stage.'),
  Q(1, 'What is a playwright?', 'A person who writes plays', ['A person who builds the stage', 'An actor who plays the lead role', 'A person who sells the tickets'],
    'A playwright writes plays. The -wright ending means maker, as in shipwright.'),
  Q(1, 'In a script, what is the cast list?', 'A list of the characters in the play', ['A list of the scenes in their order', 'A list of the props the actors need', 'The time when the play will start'],
    'The cast list (or list of characters) comes at the start of a script and often describes each character briefly.'),
  Q(2, 'In this script, how can you tell who is speaking?', 'Each speaker’s name comes before their words.', ['Every line is placed inside quotation marks.', 'The narrator says who is speaking each time.', 'The speakers take turns in alphabetical order.'],
    'Scripts set out dialogue with the speaker’s name, then their words. There are no quotation marks and no narrator.', ATTIC),
  Q(2, 'What is a scene in a play?', 'A part of the play set in one place and time', ['A single line spoken by an actor', 'The painted wall at the back of the stage', 'The list of characters at the start'],
    'Plays are divided into acts, and acts into scenes. A new scene usually means a change of place or time.'),
  Q(2, 'How is reading a script different from reading a story?', 'It has almost no narrator, so we learn through dialogue.', ['A script always has more description than a story does.', 'A script has no characters and no conflict in it at all.', 'A script is always written in rhyming lines of verse.'],
    'A story’s narrator can describe thoughts and settings. A script relies on what characters say and on short stage directions.'),
  Q(3, 'Why does this scene open with a description of the attic before anyone speaks?', 'To set the place and mood for designers and readers', ['To tell the audience which actor is the very best', 'To give the actors all of their lines to learn', 'To explain the ending of the play early on'],
    'The opening stage direction tells the designer what to build and gives the reader the setting: dusty, dim, a mysterious trunk.', ATTIC),
  Q(3, 'A play has three acts and the second act has four scenes. What does this tell you?', 'The play has three large parts; the second has four smaller ones.', ['The play has three main characters and four props in it.', 'The play lasts for exactly three hours and four minutes.', 'The play was written by three different playwrights in turn.'],
    'Acts are the large divisions of a play; scenes are the smaller units inside them.'),
];

const DIRECTIONS = [
  Q(1, 'What are stage directions?', 'Instructions about actions, setting and how to speak', ['The lines the characters say to each other', 'The arrows that point to the theatre exits', 'The reviews written after the first performance'],
    'Stage directions, usually in brackets or italics, describe what the audience sees and how actors move and speak.'),
  Q(1, 'Which part of this scene is a stage direction?', '“(They both freeze.)”', ['“Grandma said never to open the trunk.”', '“Then why are we here?”', '“Because she never said why.”'],
    'The words in brackets describe an action, not speech. The others are lines of dialogue.', ATTIC),
  Q(2, 'What does the direction “(whispering)” tell the actor?', 'How to say the line', ['Where to stand on stage', 'When to leave the stage', 'What to wear in the scene'],
    'Some directions tell an actor how to speak. Whispering shows that NAME is afraid of being heard.', ATTIC),
  Q(2, 'What does the stage direction “They both freeze” show the audience?', 'The characters are scared of being caught.', ['The attic is very cold in the middle of winter.', 'The characters have suddenly fallen asleep.', 'The scene has come to its very end.'],
    'Freezing at a creak downstairs shows fear of being discovered, which builds suspense.', ATTIC),
  Q(3, 'Why does the playwright include “(kneeling by the trunk)” before NAME’s last line?', 'It shows NAME has decided to open the trunk.', ['It tells us NAME’s knees are hurting.', 'It shows that NAME is praying for help.', 'It tells the audience to sit on the floor.'],
    'Kneeling by the trunk as {he} answers shows NAME’s choice in action: {he} means to look inside, despite Grandma’s rule.', ATTIC),
  Q(3, 'Which stage direction would best show that a character is nervous?', '(twisting her hands, glancing at the door)', ['(sits down slowly at the kitchen table)', '(enters from the left, carrying a bag)', '(the lights go out across the stage)'],
    'Fidgeting and glancing at the door are actions that show nerves. The others are actions with no feeling attached.'),
  Q(3, 'Why are stage directions important to a reader of a play, not only to actors?', 'They show actions and feelings the lines do not say.', ['They replace the dialogue so it need not be read.', 'They tell the reader the price of a ticket.', 'They explain the meaning of every line.'],
    'A reader cannot see the stage. Directions supply the actions, sounds and tones of voice that complete the meaning of the lines.'),
];

// ---------------------------------------------------------------------------- 3.2 dialogue, asides and monologues

const DIALOGUE = [
  Q(1, 'What does NAME2’s question “Then why are we here?” suggest about {him2}?', '{He2} is unsure about breaking Grandma’s rule.', ['{He2} wants to open the trunk straight away.', '{He2} has never met NAME’s grandma before.', '{He2} lives up in the attic with NAME.'],
    'NAME2 questions the plan, which shows doubt or nerves. NAME is the one pushing ahead.', ATTIC),
  Q(1, 'In a play, how do we mostly learn about the characters?', 'From what they say and do', ['From a narrator who describes them', 'From the title on the front cover', 'From the length of the play'],
    'Without a narrator, character comes through dialogue and action.'),
  Q(2, 'How does this dialogue move the action forward?', 'It reveals a rule the characters are about to break.', ['It describes the history of the old house.', 'It ends the conflict between the two characters.', 'It tells us what is inside the trunk.'],
    'We learn that Grandma forbade opening the trunk, and NAME means to open it anyway. That sets up the conflict.', ATTIC),
  Q(2, 'Which line of dialogue best reveals that a character is stubborn?', '“I don’t care what you say. I’m staying.”', ['“What time is it now, do you think?”', '“Could you pass me the salt, please?”', '“It looks like it might rain again.”'],
    'Refusing to move whatever anyone says shows stubbornness. The others are everyday remarks.'),
  Q(3, 'What does NAME’s line “Because she never said why” reveal?', 'NAME’s curiosity is stronger than {his} obedience.', ['NAME has already opened the trunk many times before.', 'NAME does not know who Grandma is.', 'NAME is too scared to touch the trunk.'],
    'NAME is driven by not knowing the reason. The line shows {his} curiosity outweighs the rule.', ATTIC),
  Q(3, 'Two characters talk about the weather, but one keeps glancing at a letter on the table. What is the playwright doing?', 'Showing that what matters is not what they are saying', ['Making the whole play about the weather', 'Giving the audience a weather forecast for the day', 'Filling up time before the interval begins'],
    'The small talk hides tension. The glances at the letter show the real subject, which is unspoken. This is called subtext.'),
];

const KINDS = ['An aside', 'A monologue', 'A soliloquy', 'Ordinary dialogue'];
const kind = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'Which is this?', KINDS[k], KINDS.filter((_, i) => i !== k), why, text);

const ASIDES = [
  Q(1, 'What is an aside?', 'A remark to the audience that other characters do not hear', ['A long speech that one character gives to a crowd on stage', 'A conversation between two characters in the middle of a scene', 'A stage direction that tells the crew about the lighting'],
    'In an aside, a character turns to the audience to share a thought, and the others on stage are taken not to hear it.'),
  Q(1, 'What is a soliloquy?', 'A speech a character makes alone, thinking aloud', ['A speech that one character makes to a crowd', 'A song sung by the whole cast together', 'A list of characters at the start of a play'],
    'In a soliloquy, a character is alone (or thinks they are) and thinks aloud, so the audience hears their true feelings.'),
  kind(2, 'KING: Welcome, my loyal friend!\nDUKE: (aside) Loyal? If only he knew what I have planned.', 0,
    'The Duke’s short remark is spoken to the audience, and the King does not hear it.'),
  kind(2, '(NAME is alone on stage.)\nNAME: Should I tell them? If I do, they will hate me. If I don’t, I will hate myself. Oh, what am I to do?', 2,
    'NAME is alone, speaking thoughts aloud to no one. That is a soliloquy.'),
  kind(3, '(The coach stands before the whole team.)\nCOACH: Listen, all of you. Last season we lost every game. Every single one. But this season, I promise you, things will be different…', 1,
    'One character gives a long speech to others on stage. That is a monologue. It is not a soliloquy, because the coach is not alone.'),
  Q(3, 'What is dramatic irony?', 'When the audience knows something a character does not', ['When a character tells a joke that makes everyone laugh', 'When a play has a sad ending instead of a happy one', 'When an actor forgets the lines in a performance'],
    'Asides and soliloquies often create dramatic irony: we know the Duke’s plan, but the King does not, so we watch with tension.'),
  Q(3, 'Why might a playwright use a soliloquy?', 'To let the audience hear a character’s private thoughts', ['To give all of the other actors a chance to rest', 'To show a crowd of people arguing with each other', 'To describe the set for the stage designers to build'],
    'Plays have no narrator to tell us what a character thinks. A soliloquy does that job.'),
];

// ---------------------------------------------------------------------------- skills

export const DRAMA_SKILLS: SkillDef[] = [
  skill({ id: 'e7-script-parts', name: 'Parts of a script', description: 'Name the parts of a script: cast list, acts and scenes, speakers, dialogue and stage directions.', outcomes: C1, lessonId: 'e7-3-1', format: 'mc', gen: bank(PARTS, ['A script sets out who speaks, what they say and what happens.', 'Acts are large parts of a play; scenes are smaller ones.']) }),
  skill({ id: 'e7-stage-directions', name: 'Stage directions', description: 'Explain what stage directions tell actors, designers and readers.', outcomes: C1, lessonId: 'e7-3-1', format: 'mc', gen: bank(DIRECTIONS, ['Stage directions are usually in brackets or italics.', 'Ask: what does this direction show that the lines do not?']) }),
  skill({ id: 'e7-drama-dialogue', name: 'Dialogue in drama', description: 'Explain how dialogue reveals character and moves the action of a play.', outcomes: C1, lessonId: 'e7-3-2', format: 'mc', gen: bank(DIALOGUE, ['In a play, character comes through what people say and do.', 'Ask: what does this line show, and what does it set up?']) }),
  skill({ id: 'e7-aside-monologue', name: 'Asides, monologues and soliloquies', description: 'Tell an aside, a monologue and a soliloquy apart, and explain dramatic irony.', outcomes: C1, lessonId: 'e7-3-2', format: 'mc', gen: bank(ASIDES, ['Aside: a quick word to the audience. Monologue: a long speech to others.', 'Soliloquy: a character alone, thinking aloud.']) }),
];
