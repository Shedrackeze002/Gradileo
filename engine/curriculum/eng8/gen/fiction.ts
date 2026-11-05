/**
 * Grade 8 English, Unit 1: Fiction (E8-A1, E8-A2). Plot and subplot, irony, narrators, and theme
 * across texts. The passages are written for Gradileo, apart from short retellings of well-known
 * public-domain stories, which are labelled.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const A1 = ['E8-A1'];
const A2 = ['E8-A2'];

// ---------------------------------------------------------------------------- 1.1 plot and subplot

const SUBPLOT = [
  Q(1, 'What is a subplot?', 'A smaller, secondary story inside the main one', ['The very last scene of a long story', 'A summary on the back cover of a book', 'The point of view the story is told from'],
    'A subplot runs alongside the main plot, often with minor characters, and usually connects to it.'),
  Q(1, 'A novel follows a girl training for a national swim final. Her brother is also trying to fix up an old car. What is the car story?', 'A subplot', ['The main plot', 'The climax', 'The exposition'],
    'The swim final is the main plot. The brother’s car is a secondary story running beside it.'),
  Q(2, 'Why do writers include subplots?', 'To add depth and echo or contrast the main plot', ['To make sure the story never reaches a climax', 'To replace the main plot halfway through', 'To tell the reader who wrote the book'],
    'A subplot can mirror the main theme, show another side of it, or complicate the main character’s life.'),
  Q(2, 'In a story about a boy learning to forgive his father, his best friend is also making up with a sister after a fight. How does the subplot connect to the main plot?', 'It echoes the main theme of forgiveness.', ['It has nothing at all to do with the main plot.', 'It shows that families should never forgive.', 'It replaces the father in the main story.'],
    'Both stories are about mending a broken relationship. The subplot echoes the theme.'),
  Q(3, 'In a mystery, the detective’s subplot about her failing marriage keeps interrupting the investigation. What effect does this most likely have?', 'It makes her more human and raises the pressure on her.', ['It proves that she is the person who did the crime.', 'It means the mystery will never be solved at all.', 'It shows that the story has no main plot at all.'],
    'Personal troubles make a character rounder and add stress that complicates the main plot.'),
  Q(3, 'How do a main plot and subplot often come together near the end of a story?', 'Events in the subplot affect how the main conflict is resolved.', ['The subplot is simply forgotten and never mentioned again.', 'The main plot stops, and only the subplot is finished.', 'The two plots are printed in different books.'],
    'Strong subplots feed into the climax: a secret from the subplot, for example, might help solve the main problem.'),
];

const DEVICES = ['In medias res', 'A twist ending', 'A frame story', 'A red herring'];
const device = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'Which plot device is described?', DEVICES[k], DEVICES.filter((_, i) => i !== k), why, text);

const PLOT_DEVICES = [
  device(1, 'The story opens with the hero already dangling from a cliff, and only later explains how she got there.', 0,
    'In medias res is Latin for “in the middle of things”: the story starts in the middle of the action.'),
  device(1, 'On the last page we learn that the friendly narrator was the thief all along.', 1,
    'A surprise at the end that changes how we see the whole story is a twist ending.'),
  device(2, 'An old sailor in an inn tells a group of travellers the tale of his shipwreck, which makes up most of the book.', 2,
    'A story told inside another story (the inn scene) is a frame story.'),
  device(2, 'Every clue seems to point to the gardener, but he turns out to be innocent.', 3,
    'A false clue that leads readers in the wrong direction is a red herring.'),
  device(3, 'In “The Rime of the Ancient Mariner”, a wedding guest is stopped in the street to hear the Mariner’s tale.', 2,
    'The wedding guest’s meeting with the Mariner frames the voyage story the Mariner tells.'),
  Q(3, 'Why might a writer begin in medias res?', 'To grab the reader with action before explaining it', ['To make the opening as slow and calm as possible', 'To give away the ending before anything happens', 'To avoid having any conflict in the story at all'],
    'Starting in the middle of action creates instant suspense; background comes later.'),
];

// ---------------------------------------------------------------------------- 1.2 irony

const IRONY = ['Verbal irony', 'Situational irony', 'Dramatic irony'];
const irony = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'Which kind of irony is this?', IRONY[k], [...IRONY.filter((_, i) => i !== k), 'No irony at all'], why, text);

const IRONY_TYPE = [
  irony(1, 'Looking out at the pouring rain, NAME said, “Lovely weather for a picnic.”', 0,
    'NAME says the opposite of what {he} means. That is verbal irony.'),
  irony(1, 'A fire station burns down.', 1,
    'We expect a fire station to be the safest place from fire. The opposite of what we expect happens: situational irony.'),
  irony(2, 'The audience knows the poison is in the cup, but the king raises it cheerfully and drinks a toast.', 2,
    'We know what the character does not. That is dramatic irony.'),
  irony(2, 'A man who spent his life warning about the dangers of ladders falls off one while hanging a sign that says “Ladders Kill”.', 1,
    'The outcome is the opposite of what we expect from such a careful man: situational irony.'),
  irony(3, 'In Romeo and Juliet, Romeo thinks Juliet is dead, but the audience knows she has only taken a sleeping potion.', 2,
    'The audience knows a crucial fact that Romeo does not, which is dramatic irony.'),
  irony(3, 'A traffic-safety officer is fined for speeding on the way to give a talk about safe driving.', 1,
    'The event contradicts what we would expect of a safety officer, so it is situational irony.'),
  Q(3, 'How is sarcasm related to verbal irony?', 'Sarcasm is verbal irony used to mock or hurt.', ['Sarcasm is a kind of dramatic irony on stage.', 'Sarcasm is the opposite of any kind of irony.', 'Sarcasm only happens in poems, not in stories.'],
    'Sarcasm says the opposite of what is meant, as verbal irony does, but with a mocking edge.'),
];

const IRONY_EFFECT = [
  Q(1, 'What does dramatic irony usually make an audience feel?', 'Tension, because they know what a character does not', ['Boredom, because nothing is going to happen next', 'Calm, because every character knows the truth', 'Confusion, because nobody knows anything'],
    'Watching a character walk into danger we can see coming creates suspense.'),
  Q(2, 'In “The Gift of the Magi” (O. Henry, 1905), a wife sells her hair to buy her husband a watch chain, and he sells his watch to buy her combs. What does the situational irony show?', 'Their love matters more than the gifts.', ['They are careless with all of their money.', 'They both dislike the gifts they receive.', 'They should never have married each other.'],
    'Each gift is useless, but each shows how much they were willing to give up. The irony points to the theme of love and sacrifice.'),
  Q(2, 'Why might a writer use verbal irony in a character’s dialogue?', 'To show the character’s attitude, such as humour or bitterness', ['To show the character always says exactly what they mean', 'To make sure the reader cannot understand the character', 'To tell the reader the setting of the story'],
    'What a character says ironically, and why, reveals their personality and mood.'),
  Q(3, 'A story ends with a greedy man finding treasure, then discovering he is locked inside the vault with it. What is the effect of the irony?', 'It punishes his greed in a fitting way.', ['It rewards him for being patient and kind.', 'It shows that treasure is never real at all.', 'It makes the story about friendship instead.'],
    'The thing he wanted most becomes his trap. The irony delivers a moral about greed.'),
  Q(3, 'How does dramatic irony change the way we watch a scene?', 'We read every line with a double meaning only we can see.', ['We stop caring about what happens to the characters.', 'We know less than the characters and feel lost.', 'We cannot tell who is speaking in the scene.'],
    'Because we know the truth, innocent lines take on extra, often painful, meaning.'),
];

// ---------------------------------------------------------------------------- 1.3 narrators

const NARRATORS = ['First person', 'Third-person limited', 'Third-person omniscient', 'Second person'];
const narr = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'Which point of view is this passage written in?', NARRATORS[k], NARRATORS.filter((_, i) => i !== k), why, text);

const NARRATOR_TYPE = [
  narr(1, 'I had never seen snow before that winter, and I stood at the window for an hour.', 0, 'The narrator says I and takes part in the story: first person.'),
  narr(1, 'You open the door. You hear a sound behind you. You turn.', 3, 'The reader is addressed as you, who does the actions: second person, which is rare in fiction.'),
  narr(2, 'NAME waited by the gate. {He} wondered whether NAME2 would come at all, and {his} stomach tightened with every passing car.', 1,
    'We are told NAME’s thoughts but no one else’s, in the third person: third-person limited.'),
  narr(2, 'NAME hoped no one would notice {his} torn sleeve. Across the room, NAME2 had noticed at once, and was wondering how to offer help without embarrassing {him}.', 2,
    'The narrator moves into the thoughts of two characters: third-person omniscient (all-knowing).'),
  narr(3, 'The town slept. In the bakery, Mr. Diaz worried about the rent; at the station, the night guard dreamed of the sea; and in the tallest house, a girl lay awake, planning her escape.', 2,
    'The narrator knows the thoughts of many characters in different places: omniscient.'),
  Q(3, 'What can a third-person limited narrator NOT tell us?', 'What the other characters are secretly thinking', ['What the main character sees and hears', 'What the main character thinks and feels inside', 'What the main character says aloud'],
    'A limited narrator stays with one character’s mind; others’ thoughts can only be guessed from what they do and say.'),
];

const NARRATOR_EFFECT = [
  Q(1, 'What is an unreliable narrator?', 'A narrator whose account we cannot fully trust', ['A narrator who tells the story in the past tense', 'A narrator who knows every character’s thoughts', 'A narrator who appears only on the first page'],
    'An unreliable narrator may lie, misunderstand or be biased, so readers must read between the lines.'),
  Q(2, 'Why might a writer choose a first-person narrator?', 'To let readers share one character’s thoughts closely', ['To show every character’s thoughts at the same time', 'To make the story sound like a news report', 'To keep the reader far away from the main character'],
    'First person puts us inside one mind, which feels intimate, though it limits what we can know.'),
  Q(2, 'Which detail suggests the narrator is unreliable?', 'He calls himself calm while admitting he shouted and broke a plate.', ['He describes the kitchen and the broken plates in great detail.', 'He tells the story in the order it happened.', 'He mentions the time and the day of the week.'],
    'His actions contradict what he says about himself, so we start to doubt his account.',
    'I am a very calm person, everybody says so. So when Marco ate the last slice, I simply explained my feelings. Loudly, perhaps. And the plate, well, the plate slipped.'),
  Q(3, 'How does an omniscient narrator help build dramatic irony?', 'It can show readers secrets that the characters do not know.', ['It keeps every secret hidden from the readers until the end.', 'It only lets readers see one character’s thoughts.', 'It makes the readers know less than every character.'],
    'An all-knowing narrator can reveal one character’s plan to us while another character walks into it.'),
  Q(3, 'A story about a school fire is told by a nine-year-old who thinks the fire was “like fireworks, really exciting”. What is the effect?', 'The child’s innocence makes the danger feel more shocking to us.', ['It shows that the fire was harmless and fun for everyone.', 'It makes the story sound like an official report.', 'It shows that the narrator knows more than the adults.'],
    'A naive narrator sees less than the reader does. The gap between their view and the truth creates emotion.'),
];

// ---------------------------------------------------------------------------- 1.4 theme across texts

const THEME_STATEMENT = [
  Q(1, 'Which is the most precise statement of a theme?', 'Real courage can mean admitting you are wrong.', ['Courage', 'Be brave.', 'It is a story about a brave girl and her friends.'],
    'A theme is a full sentence that says something specific about life. One word is a topic, a command is a moral, and the last is a summary.'),
  Q(1, 'Why should a theme statement avoid clichés such as “Never give up”?', 'Clichés are vague and miss what the story actually says.', ['Clichés are always grammatically incorrect English.', 'Clichés are too long to write in an essay.', 'Clichés are only allowed in poems.'],
    'A cliché fits a thousand stories. A precise theme fits this one.'),
  Q(2, 'A story shows a girl who wins a prize by cheating and then feels empty. Which theme is most precise?', 'Success gained dishonestly brings no real satisfaction.', ['Cheating is bad and should never happen.', 'Winning prizes is the best feeling of all in life.', 'Girls should not enter competitions.'],
    'The precise theme names what the story shows: dishonest success feels empty.'),
  Q(3, 'Which revision makes “Family is important” a stronger theme statement?', 'Family bonds can survive even long silences and old arguments.', ['Family is very, very important to everyone.', 'Family: a story about a big family.', 'Families are important, so you should call your family.'],
    'The revision says something specific and arguable about families, rather than a vague truth.'),
];

const COMPARE = [
  Q(1, 'What is a universal theme?', 'A message about life that appears across many times and cultures', ['A theme that appears in only one book that was ever written', 'A theme about outer space and the stars', 'The theme of the first book a person reads'],
    'Love, loss, courage and growing up appear in stories everywhere, so they are universal themes.'),
  Q(2, 'Story A shows ambition ruining a king; Story B shows ambition helping a poor girl build a business. How do they treat ambition?', 'A shows its dangers; B shows its rewards.', ['Both show that ambition is always deadly.', 'Neither story has anything to do with ambition.', 'Both show that ambition does not matter.'],
    'Comparing texts often means seeing how they take different positions on the same topic.'),
  Q(2, 'Two poems are both about the sea. One describes its beauty; the other, its danger. What should a comparison focus on?', 'How each poem’s choices create a different view of the sea', ['Which poem has more lines in it than the other', 'Which poet was born first, and in which town or city', 'Which poem uses more capital letters overall'],
    'A good comparison explains how each text’s language and form lead to its view.'),
  Q(3, 'Which sentence makes the best comparison between two texts?', 'Both stories explore loneliness, but only the second suggests that it can be overcome.', ['The first story is long and the second story is shorter.', 'Both stories are about loneliness, and both say that it can never be overcome.', 'I liked the second story more than the first one.'],
    'It names the shared theme and the key difference. The others compare surface features or give only an opinion.'),
  Q(3, 'Why do readers compare themes across texts?', 'To see how different writers and cultures answer the same questions', ['To decide which author is the most famous person', 'To prove that all the stories ever written are really identical', 'To count how many themes each book contains'],
    'Comparing shows the range of human answers to big questions, and sharpens our reading of each text.'),
];

// ---------------------------------------------------------------------------- skills

export const FICTION_SKILLS: SkillDef[] = [
  skill({ id: 'e8-subplot', name: 'Main plot and subplot', description: 'Tell a main plot from a subplot and explain how they connect.', outcomes: A1, lessonId: 'e8-1-1', format: 'mc', gen: bank(SUBPLOT, ['The main plot follows the central conflict.', 'Ask: how does the smaller story echo or affect the main one?']) }),
  skill({ id: 'e8-plot-devices', name: 'Plot devices', description: 'Identify in medias res, twist endings, frame stories and red herrings.', outcomes: A1, lessonId: 'e8-1-1', format: 'mc', gen: bank(PLOT_DEVICES, ['In medias res: in the middle of things.', 'A red herring is a false clue.']) }),
  skill({ id: 'e8-irony-type', name: 'Kinds of irony', description: 'Tell verbal, situational and dramatic irony apart.', outcomes: A1, lessonId: 'e8-1-2', format: 'mc', gen: bank(IRONY_TYPE, ['Verbal: saying the opposite of what you mean.', 'Situational: the opposite of what we expect happens. Dramatic: the audience knows more.']) }),
  skill({ id: 'e8-irony-effect', name: 'The effect of irony', description: 'Explain what irony adds to a story.', outcomes: A1, lessonId: 'e8-1-2', format: 'mc', gen: bank(IRONY_EFFECT, ['Ask: what does the gap between expectation and reality show?', 'Irony often points to the theme.']) }),
  skill({ id: 'e8-narrator-type', name: 'Kinds of narrator', description: 'Identify first-person, second-person, third-person limited and omniscient narration.', outcomes: A2, lessonId: 'e8-1-3', format: 'mc', gen: bank(NARRATOR_TYPE, ['I means first person; you means second person.', 'In third person, ask whose thoughts we are told.']) }),
  skill({ id: 'e8-narrator-effect', name: 'How the narrator shapes a story', description: 'Explain how a narrator’s point of view and reliability affect a story.', outcomes: A2, lessonId: 'e8-1-3', format: 'mc', gen: bank(NARRATOR_EFFECT, ['Ask: what can this narrator know, and can we trust them?', 'Look for actions that contradict what the narrator says.']) }),
  skill({ id: 'e8-theme-statement', name: 'Precise theme statements', description: 'State a theme as a precise, specific sentence, avoiding clichés.', outcomes: A2, lessonId: 'e8-1-4', format: 'mc', gen: bank(THEME_STATEMENT, ['A theme is a full sentence about life.', 'Make it specific to this story, not a cliché.']) }),
  skill({ id: 'e8-compare-themes', name: 'Comparing themes', description: 'Compare how two texts treat the same theme.', outcomes: A2, lessonId: 'e8-1-4', format: 'mc', gen: bank(COMPARE, ['Name the shared topic, then the difference in what each says.', 'Compare ideas, not surface features.']) }),
];
