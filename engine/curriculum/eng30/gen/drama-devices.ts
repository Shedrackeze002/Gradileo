/**
 * Grade 12 English, lesson 3.3: Delay, Madness and Dramatic Devices (12-C1). Kinds of speech
 * (soliloquy, aside, monologue, dialogue) and techniques (the play within the play, puns, stage
 * directions, comic relief, foreshadowing) in Hamlet, what the Ghost, the foils and the “antic
 * disposition” do in the play, and its dramatic, verbal and situational ironies (./hamlet.ts).
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import * as H from './hamlet.ts';
import { quoteBlock, type Passage } from './hamlet.ts';

const L = 'e12-3-3';

// ---------------------------------------------------------------------------- devices

type Device = 'soliloquy' | 'aside' | 'monologue' | 'dialogue' | 'within' | 'pun' | 'stage' | 'comic' | 'foreshadowing';
const DEVICE_NAME: Record<Device, string> = {
  soliloquy: 'Soliloquy',
  aside: 'Aside',
  monologue: 'Monologue',
  dialogue: 'Dialogue',
  within: 'Play within a play',
  pun: 'Pun',
  stage: 'Stage direction',
  comic: 'Comic relief',
  foreshadowing: 'Foreshadowing',
};
const DEVICE_WHAT: Record<Device, string> = {
  soliloquy: 'a speech in which a character alone on stage speaks their thoughts aloud',
  aside: 'a short remark to the audience that the other characters on stage do not hear',
  monologue: 'a long speech by one character, spoken to other characters on stage',
  dialogue: 'a conversation between two or more characters, speaking in turn',
  within: 'a performance staged by characters inside the play, watched by other characters',
  pun: 'a play on words with two meanings, or on two words that sound alike',
  stage: 'an instruction in the script, not spoken, telling actors what to do',
  comic: 'a funny scene, speech or character that eases the tension of a tragedy',
  foreshadowing: 'a hint or warning early in a play of something that will happen later',
};
/** Kinds of speech and techniques are never offered against each other. */
const SPEECH: Device[] = ['soliloquy', 'aside', 'monologue', 'dialogue'];
const TECHNIQUE: Device[] = ['within', 'pun', 'stage', 'comic', 'foreshadowing'];

interface Example {
  device: Device;
  lead: string;
  line: Passage;
  /** The question, when it is not the usual one for its group. */
  ask?: string;
  /** Devices not to offer as distractors, because they could be argued for. */
  not?: Device[];
  why: string;
}
const EXAMPLES: Example[] = [
  { device: 'soliloquy', lead: 'The King, the Queen and the court leave the stage, and Hamlet remains:', line: H.TOO_SOLID_FLESH, why: 'Hamlet is alone on stage, speaking his private thoughts aloud: a soliloquy.' },
  { device: 'soliloquy', lead: 'Hamlet sends Rosencrantz and Guildenstern away. “Now I am alone,” he says, and goes on:', line: H.ROGUE_AND_PEASANT, why: 'Hamlet has just said “Now I am alone”: he speaks his thoughts to no one but the audience.' },
  { device: 'soliloquy', lead: 'Polonius leaves to hide in the Queen’s room. With no one else on stage, Claudius says:', line: H.OFFENCE_IS_RANK, why: 'Claudius is alone, and confesses to the audience what he has told no one: a soliloquy.' },
  { device: 'soliloquy', lead: 'Rosencrantz and the others go on ahead, and Hamlet stays behind by himself:', line: H.ALL_OCCASIONS, why: 'Alone on stage, Hamlet thinks aloud about his own delay: a soliloquy.' },
  { device: 'aside', lead: 'In front of the whole court, the King turns to Hamlet:', line: H.KIN_AND_KIND, ask: 'What kind of speech is Hamlet’s line?', why: 'Hamlet’s line is marked “Aside”: only the audience hears it, not the King or the court.' },
  { device: 'aside', lead: 'Polonius is questioning Hamlet, who answers in riddles:', line: H.METHOD_IN_IT, why: 'Polonius speaks this line so that Hamlet does not hear it: an aside to the audience.' },
  { device: 'aside', lead: 'During the play performed before the court:', line: H.WORMWOOD, ask: 'What kind of speech is Hamlet’s “Wormwood, wormwood”?', why: 'Hamlet’s “Wormwood, wormwood” is marked “Aside”: a bitter comment heard by the audience alone.' },
  { device: 'dialogue', lead: 'Hamlet talks with his old school friend Rosencrantz:', line: H.DENMARKS_A_PRISON, why: 'Two characters speak to each other in turn: dialogue.' },
  { device: 'dialogue', lead: 'In the Queen’s room, Hamlet stares at something his mother cannot see:', line: H.SEE_NOTHING_THERE, why: 'Gertrude and Hamlet speak to each other in turn: dialogue.' },
  { device: 'dialogue', lead: 'Polonius finds Hamlet reading a book:', line: H.WORDS_WORDS, why: 'A question and an answer between two characters: dialogue.' },
  { device: 'monologue', lead: 'In front of the King and the court, Hamlet answers his mother at length:', line: H.KNOW_NOT_SEEMS, why: 'Hamlet speaks at length to Gertrude, with others on stage: a monologue.' },
  { device: 'monologue', lead: 'Polonius sends his son off to France with a long speech of advice:', line: H.OWN_SELF_TRUE, why: 'Polonius speaks at length to Laertes, who is on stage listening: a monologue.' },
  { device: 'monologue', lead: 'The Queen describes to the King what has just happened in her room:', line: H.MAD_AS_THE_SEA, why: 'Gertrude speaks at length to Claudius: a monologue, not a soliloquy, since she is not alone.' },
  { device: 'within', lead: 'Before the whole court, Hamlet explains the story that the actors are performing:', line: H.GONZAGO, not: ['foreshadowing'], why: 'The actors’ performance of “The Murder of Gonzago” is a play staged inside the play: a play within a play.' },
  { device: 'within', lead: 'The actors’ performance before the court breaks off:', line: H.KING_RISES, why: 'The play the actors perform for the court is a play within a play; here it is stopped when the King rises.' },
  { device: 'pun', lead: 'The King has just called Hamlet “my son”, and asks why he still looks so gloomy:', line: H.TOO_MUCH_SUN, not: ['comic'], why: '“Sun” sounds like “son”: Hamlet complains that he is too much called the King’s son. That play on words is a pun.' },
  { device: 'pun', lead: 'Claudius dropped a pearl, which he called a “union”, into the poisoned cup, and the Queen has drunk from it and died. Hamlet turns on the King:', line: H.DAMNED_DANE, not: ['comic'], why: '“Union” means both the pearl in the cup and Claudius’s marriage to Gertrude: let him join his wife in death. That double meaning is a pun.' },
  { device: 'comic', lead: 'Two gravediggers talk as they dig a grave for Ophelia:', line: H.CHRISTIAN_BURIAL, not: ['pun'], why: 'The gravediggers’ joking banter lightens a dark moment: comic relief.' },
  { device: 'comic', lead: 'Polonius tells the King and Queen his theory about Hamlet:', line: H.BREVITY, why: 'Long-winded Polonius praises brevity while being anything but brief, and the Queen calls for “more matter, with less art”: comic relief.' },
  { device: 'foreshadowing', lead: 'Just before the fencing match, Hamlet tells Horatio:', line: H.ILL_ABOUT_MY_HEART, why: 'Hamlet’s unease hints at the deaths that the match will bring: foreshadowing.' },
  { device: 'foreshadowing', lead: 'Horatio tries to stop Hamlet from following the Ghost:', line: H.TEMPT_TOWARD_FLOOD, why: 'Horatio’s fear that the Ghost will “draw you into madness” looks ahead to the madness, real or feigned, of the acts to come: foreshadowing.' },
  { device: 'stage', lead: 'In the Queen’s room, hearing a noise behind the tapestry:', line: H.DEAD_FOR_A_DUCAT, ask: 'What are the words in square brackets?', why: 'The words in square brackets are not spoken: they tell the actors what to do. They are stage directions.' },
  { device: 'stage', lead: 'At Ophelia’s grave:', line: H.SWEETS_TO_THE_SWEET, ask: 'What are the words in square brackets?', why: 'The words in square brackets are not spoken: they tell the actor to scatter flowers. They are a stage direction.' },
];

/** What a device or feature does in the play (difficulty 3). */
interface Effect {
  lead: string;
  line?: Passage;
  ask: string;
  right: string;
  wrong: string[];
  why: string;
}
const EFFECTS: Effect[] = [
  { lead: 'Hamlet has the actors perform a play in which a man poisons a sleeping king in his garden.', line: H.PLAYS_THE_THING, ask: 'What is the purpose of this play within the play?', right: 'To test the King: if Claudius reacts to the staged murder, Hamlet will know the Ghost told the truth.', wrong: ['To entertain the court, and to show the King that Hamlet has at last recovered from his grief.', 'To warn the Queen that her new husband may one day try to poison her in the very same way.', 'To mock Polonius, who once acted in plays at university and boasts about it to everyone.'], why: 'Hamlet will watch for the King to “blench”: “The play’s the thing / Wherein I’ll catch the conscience of the King.”' },
  { lead: 'The Ghost appears on the battlements in the first act and speaks only to Hamlet.', line: H.REVENGE_HIS_MURDER, ask: 'What part does the Ghost play in the drama?', right: 'It sets the revenge plot in motion, and its uncertain nature, honest spirit or devil, gives Hamlet reason to test the King.', wrong: ['It provides comic relief, frightening the guards so that the audience can laugh before the court scenes that follow.', 'It warns Denmark of the coming war with Norway, and the rest of the play is about the country’s defence.', 'It tells the audience the ending of the play at once, so that there is no suspense about what will happen.'], why: 'The Ghost demands “Revenge his foul and most unnatural murder”, and Hamlet later fears it “May be the devil”: both drive the plot.' },
  { lead: 'Laertes, like Hamlet, is a son whose father has been killed. He returns to Denmark crying:', line: H.TO_HELL_ALLEGIANCE, ask: 'How does Laertes act as a foil to Hamlet?', right: 'He sets out to avenge his father at once and without hesitation, which throws Hamlet’s long delay into relief.', wrong: ['He refuses to seek any revenge at all, which makes Hamlet look rash and violent beside him.', 'He is Hamlet’s closest friend and helper, which shows how lonely Hamlet would be without him.', 'He is the true villain of the play, which makes Claudius seem kind and fair beside him.'], why: 'A foil is a contrasting character: Laertes dares “damnation” to be revenged, while Hamlet hesitates. Hamlet himself says of Laertes, “by the image of my cause I see / The portraiture of his.”' },
  { lead: 'Fortinbras, whose father was killed by Hamlet’s father, marches an army across Denmark. Hamlet watches:', line: H.EVEN_FOR_AN_EGGSHELL, ask: 'How does Fortinbras act as a foil to Hamlet?', right: 'He risks twenty thousand lives over a worthless patch of land, which shames Hamlet, who has a real cause and has not acted.', wrong: ['He refuses to go to war over anything at all, which makes Hamlet’s wish for revenge seem warlike and cruel.', 'He is a coward who runs from every battle, which makes Hamlet seem brave and decisive by comparison.', 'He is Hamlet’s ally in the plot against Claudius, which shows that Hamlet has friends outside Denmark.'], why: 'Fortinbras fights for “a little patch of ground”, “Even for an eggshell”; the contrast makes Hamlet ask, “How stand I then, / That have a father kill’d”.' },
  { lead: 'After the Ghost has gone, Hamlet makes Horatio and Marcellus swear an oath:', line: H.ANTIC_DISPOSITION, ask: 'What does Hamlet warn his friends about here?', right: 'That he may choose to behave strangely, as if mad, and that they must never hint that they know the reason.', wrong: ['That the Ghost may return to drive them mad, and that they must stay away from the battlements at night.', 'That the King is already mad with guilt, and that they must report everything he says to the Queen.', 'That he plans to leave Denmark in disguise, and that they must tell the court he has gone mad and died.'], why: 'He may “put an antic disposition on”, and they must never say “Well, we know” or anything like it: his madness may be an act.' },
  { lead: 'The gravediggers joke and sing as they dig Ophelia’s grave, just before her funeral.', line: H.CHRISTIAN_BURIAL, ask: 'What does this scene of comic relief add to the play?', right: 'Their jokes ease the tension before the funeral, while their talk of death sharpens the play’s thoughts on mortality.', wrong: ['Their jokes show that the people of Denmark are glad that Ophelia is dead and wish to celebrate her funeral.', 'Their jokes reveal that they know about the murder of the old King, and they plan to tell Hamlet everything.', 'Their jokes have nothing to do with the rest of the play, and could be cut without losing anything at all.'], why: 'The comedy relieves the darkness, yet its subject is death and burial, and it leads to Yorick’s skull and Hamlet’s thoughts on mortality.' },
  { lead: 'Polonius remarks that people often hide wickedness behind pious action. Claudius, aside:', line: H.SMART_A_LASH, ask: 'What is the effect of this aside?', right: 'It confirms to the audience, from Claudius’s own mouth, that he is guilty, while the court still sees an innocent king.', wrong: ['It shows the court that Claudius is guilty, so that everyone on stage now turns against him at once.', 'It shows Hamlet that Claudius is guilty, so that he no longer needs to test the King with the play.', 'It shows the audience that Polonius is guilty of the murder, which he has hidden from the King.'], why: 'An aside is heard only by the audience. Claudius compares his deed to a “painted” cheek: we now know the Ghost spoke the truth before Hamlet does.' },
  { lead: 'Hamlet has sent his friends away, and speaks with no one else on stage.', line: H.MAY_BE_THE_DEVIL, ask: 'What is the main effect of giving these thoughts in a soliloquy?', right: 'The audience hears Hamlet’s private doubts and reasoning, which he hides from every other character.', wrong: ['The whole court hears Hamlet’s plan, which makes the King suspicious of the actors.', 'The actors hear Hamlet’s orders, so they know which speech they must change tonight.', 'Horatio hears Hamlet’s fears, which makes him go and warn the Queen about the play.'], why: 'A soliloquy is spoken alone: only the audience learns that Hamlet doubts the Ghost and why he needs the play.' },
];

function devicesQ(rng: Rng, d: Difficulty) {
  if (d === 1) {
    const group = rng.pick([SPEECH, TECHNIQUE]);
    const t = rng.pick(group);
    const others = rng.sample(group.filter((x) => x !== t), 3);
    if (rng.chance(0.5)) {
      return {
        prompt: `In drama, what is ${aName(t)}?`,
        parts: [part(mc(rng, capFirst(DEVICE_WHAT[t]), others.map((x) => capFirst(DEVICE_WHAT[x]))))],
        hints: ['Ask who hears the words, who speaks them, and whether they are spoken at all.'],
        solution: [`${DEVICE_NAME[t]}: ${DEVICE_WHAT[t]}.`],
      };
    }
    return {
      prompt: `Which term names ${DEVICE_WHAT[t]}?`,
      parts: [part(mc(rng, DEVICE_NAME[t], others.map((x) => DEVICE_NAME[x])))],
      hints: ['Ask who hears the words, who speaks them, and whether they are spoken at all.'],
      solution: [`${DEVICE_NAME[t]}: ${DEVICE_WHAT[t]}.`],
    };
  }
  if (d === 2) {
    const ex = rng.pick(EXAMPLES);
    const speech = SPEECH.includes(ex.device);
    // A passage with words in square brackets never offers "Stage direction" as a wrong answer.
    const bracketed = ex.line.speeches.some((s) => s.text.includes('['));
    const pool = (speech ? SPEECH : TECHNIQUE).filter((x) => x !== ex.device && !ex.not?.includes(x) && !(x === 'stage' && bracketed));
    const others = rng.sample(pool, Math.min(3, pool.length));
    return {
      prompt: `${ex.lead}\n\n${quoteBlock(ex.line)}\n\n${ex.ask ?? (speech ? 'What kind of speech is this?' : 'Which dramatic device is this?')}`,
      parts: [part(mc(rng, DEVICE_NAME[ex.device], others.map((x) => DEVICE_NAME[x])))],
      hints: [speech ? 'Who is on stage, and who is meant to hear the words?' : 'Look at what the lines do: a play performed, a double meaning, an instruction, a joke, or a hint of what is coming.'],
      solution: [ex.why, `${DEVICE_NAME[ex.device]}: ${DEVICE_WHAT[ex.device]}.`],
    };
  }
  const e = rng.pick(EFFECTS);
  return {
    prompt: e.line ? `${e.lead}\n\n${quoteBlock(e.line)}\n\n${e.ask}` : `${e.lead}\n\n${e.ask}`,
    parts: [part(mc(rng, e.right, e.wrong))],
    hints: ['Ask what the audience learns, feels or understands because of this device that it would not otherwise.'],
    solution: [e.why],
  };
}

const capFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const aName = (d: Device) => {
  const n = DEVICE_NAME[d].toLowerCase();
  if (d === 'comic' || d === 'foreshadowing' || d === 'dialogue') return `**${n}**`;
  return `${/^[aeiou]/.test(n) ? 'an' : 'a'} **${n}**`;
};

// ---------------------------------------------------------------------------- irony

/** What the audience knows that a character does not (difficulty 1). */
interface Dramatic {
  lead: string;
  line: Passage;
  ask: string;
  right: string;
  wrong: string[];
  why: string;
}
const DRAMATIC: Dramatic[] = [
  { lead: 'Hamlet has just walked away, sparing Claudius because he seemed to be praying. Claudius rises:', line: H.WORDS_FLY_UP, ask: 'What does the audience learn here that Hamlet never finds out?', right: 'Claudius could not truly pray at all, so Hamlet spared him for a reason that was false.', wrong: ['Claudius saw Hamlet behind him with his sword drawn, and will have him killed tonight.', 'Claudius has confessed everything to heaven and been forgiven, so his soul is now safe.', 'Claudius was praying for Hamlet’s health, and plans to make him heir to the throne.'], why: '“My words fly up, my thoughts remain below”: his prayer was empty. Hamlet held back so as not to send a praying man to heaven.' },
  { lead: 'Hamlet suddenly asks Ophelia a question, and she answers:', line: H.WHERES_YOUR_FATHER, ask: 'What does the audience know that makes Ophelia’s answer ironic?', right: 'Her father is hiding close by with the King, listening, so her answer is not true.', wrong: ['Her father has already left for France with Laertes, so he cannot be at home.', 'Her father is dead, killed by Hamlet behind the tapestry earlier the same day.', 'Her father is with the actors, rehearsing the play that will be performed tonight.'], why: 'Polonius and Claudius have hidden themselves to watch the meeting. Polonius is killed later, in the Queen’s room.' },
  { lead: 'Before the fencing match begins, Hamlet jokes with Laertes:', line: H.YOUR_FOIL, ask: 'What does the audience know that Hamlet does not?', right: 'Laertes’s sword is sharp and poisoned, so this friendly match is a trap to kill Hamlet.', wrong: ['Laertes has secretly forgiven Hamlet, and plans to lose the match on purpose today.', 'Laertes is badly wounded already, and cannot possibly win a match against Hamlet.', 'Laertes has paid Osric, the judge, to call every hit for him, whatever happens.'], why: 'The audience heard Claudius and Laertes plan the “sword unbated” and the poison. Hamlet, “free from all contriving”, suspects nothing.' },
  { lead: 'During the fencing match, the Queen lifts the cup that has been set out for Hamlet:', line: H.POISONED_CUP, ask: 'What does the audience know as Gertrude drinks?', right: 'The cup holds the poison Claudius prepared for Hamlet, and she is drinking her own death.', wrong: ['The cup holds a medicine that Laertes brought from France, and it will cure her illness.', 'The cup holds wine that Hamlet poisoned to kill Claudius, but the King refused to drink.', 'The cup holds an ordinary wine, and the King only wants her to stop drinking too much.'], why: 'Claudius planned “A chalice for the nonce” in case the sword failed. His aside, “It is the poison’d cup”, confirms what the audience already knows.' },
  { lead: 'The actors have just shown a man pouring poison into the ear of a sleeping king in his garden:', line: H.KING_RISES, ask: 'What do the audience and Hamlet know that most of the court does not?', right: 'The play shows how Claudius killed the old King, so his rising betrays his guilt.', wrong: ['The actors plan to kill Claudius at the end of the play, and he has found out.', 'The play was written by Polonius to mock the King, who is now deeply offended.', 'The King is ill with a fever, and needs light to find his way to his doctor.'], why: 'The Ghost told Hamlet he was poisoned while sleeping in his orchard. The court sees only a king cutting short a play.' },
];

type Kind = 'dramatic' | 'verbal' | 'situational';
const KIND_NAME: Record<Kind, string> = { dramatic: 'Dramatic irony', verbal: 'Verbal irony', situational: 'Situational irony' };
const KIND_WHAT: Record<Kind, string> = {
  dramatic: 'the audience knows something important that a character does not',
  verbal: 'a speaker says something different from, or opposite to, what is meant',
  situational: 'what happens is the opposite of what was intended or expected',
};
/** Moments with one clear kind of irony (difficulty 2). */
const KINDS: Array<{ kind: Kind; lead: string; line: Passage; why: string }> = [
  { kind: 'verbal', lead: 'Hamlet tells Horatio why the wedding followed so soon after the funeral:', line: H.THRIFT, why: 'Hamlet praises “thrift” but means the opposite: he is disgusted at the haste of the marriage.' },
  { kind: 'verbal', lead: 'The King asks Hamlet why he still looks so gloomy, after calling him “my son”:', line: H.TOO_MUCH_SUN, why: 'Hamlet says “Not so”, denying the clouds, while meaning that he is sick of being called the King’s son.' },
  { kind: 'dramatic', lead: 'Claudius, alone, has just confessed “Pray can I not”, then knelt to try. Hamlet comes in behind him:', line: H.NOW_MIGHT_I, why: 'The audience has just heard Claudius say that he cannot truly pray, while Hamlet believes he is at prayer.' },
  { kind: 'dramatic', lead: 'In the Queen’s room, the Ghost has appeared again, in full view of the audience:', line: H.SEE_NOTHING_THERE, why: 'The audience can see the Ghost on stage, while Gertrude insists that she sees “all that is”.' },
  { kind: 'situational', lead: 'Hamlet has just stabbed through the tapestry and found Polonius behind it:', line: H.INTRUDING_FOOL, why: 'Polonius hid to spy and keep the King safe, and his spying is exactly what gets him killed.' },
  { kind: 'situational', lead: 'Laertes has been wounded by his own poisoned sword:', line: H.OWN_TREACHERY, why: 'The trap Laertes set for Hamlet has caught Laertes himself, “a woodcock to my own springe”.' },
  { kind: 'situational', lead: 'Horatio describes to Fortinbras what has happened:', line: H.PURPOSES_MISTOOK, why: 'The plotters’ schemes have “Fall’n on the inventors’ heads”: the outcome reverses what they intended.' },
];

/** The effect of an irony (difficulty 3). */
const IRONY_EFFECTS: Dramatic[] = [
  { lead: 'Hamlet spares Claudius at prayer so that his soul will not go to heaven. A moment later, Claudius says:', line: H.WORDS_FLY_UP, ask: 'What is the main effect of this irony?', right: 'Hamlet loses his best chance through his own reasoning, and the audience sees that his delay rests on a mistake.', wrong: ['Hamlet’s patience is rewarded, since the audience now knows that Claudius has truly repented and been saved.', 'Claudius’s guilt is finally proved to the whole court, which now knows that Hamlet was right all along.', 'The play turns from tragedy to comedy, since the audience now knows that no one will be killed after all.'], why: 'The prayer Hamlet would not interrupt was empty, so the chance he let pass was real: the audience watches his reasoning work against him.' },
  { lead: 'Hamlet jokes before the fencing match:', line: H.YOUR_FOIL, ask: 'What is the main effect of the dramatic irony here?', right: 'Tension rises with every friendly word, as the audience waits for the poisoned blade to strike.', wrong: ['The scene becomes calm and restful, since the audience knows that both men will survive.', 'The audience laughs at Laertes, since it knows that he is far worse with a sword than Hamlet.', 'The audience feels relief, since it knows that the King has abandoned his plan against Hamlet.'], why: 'Knowing about the unbated, poisoned sword, the audience hears every courtesy as part of a trap.' },
  { lead: 'Polonius has died behind the tapestry where he hid to overhear the Queen and her son. Hamlet says:', line: H.INTRUDING_FOOL, ask: 'What does the situational irony of Polonius’s death suggest?', right: 'The busy spy is killed by his own spying, and the play shows plotting and meddling turning on those who do it.', wrong: ['The loyal counsellor is rewarded for his loyalty, and the play shows that serving the King faithfully is always safe.', 'The killing was planned by Polonius himself, and the play shows that he wanted to die rather than be found out.', 'The death is a mistake with no meaning, and the play shows that Polonius was the hidden murderer of the old King.'], why: '“Thou find’st to be too busy is some danger”: Polonius, always spying, dies spying, the first of many plots to recoil on their makers.' },
  { lead: 'Dying, Laertes confesses:', line: H.KINGS_TO_BLAME, ask: 'What is the main effect of the situational irony in the final scene?', right: 'The poisons Claudius and Laertes prepared for Hamlet kill the Queen, Laertes and the King himself: their plots destroy them.', wrong: ['The poisons fail completely, and everyone survives the match, so that the King can be tried fairly by the court.', 'The poisons kill only Hamlet, as Claudius planned, so that the King keeps his crown and his Queen at the end.', 'The poisons were all prepared by Hamlet, so the final scene shows him paying for his own long-planned crimes.'], why: '“The foul practice / Hath turn’d itself on me”: the cup kills Gertrude, the blade kills Laertes, and Hamlet turns both on Claudius.' },
];

function ironyQ(rng: Rng, d: Difficulty) {
  if (d === 1) {
    const x = rng.pick(DRAMATIC);
    return {
      prompt: `${x.lead}\n\n${quoteBlock(x.line)}\n\n${x.ask}`,
      parts: [part(mc(rng, x.right, x.wrong))],
      hints: ['Dramatic irony is the gap between what the audience knows and what a character believes. What have we seen or heard that this character has not?'],
      solution: [x.why],
    };
  }
  if (d === 2) {
    const k = rng.pick(KINDS);
    return {
      prompt: `${k.lead}\n\n${quoteBlock(k.line)}\n\nWhich kind of irony is this?`,
      parts: [part(mc(rng, KIND_NAME[k.kind], (Object.keys(KIND_NAME) as Kind[]).filter((x) => x !== k.kind).map((x) => KIND_NAME[x])))],
      hints: ['Verbal irony: words mean the opposite. Situational irony: the outcome reverses the intention. Dramatic irony: the audience knows more than a character.'],
      solution: [`${KIND_NAME[k.kind]}: ${KIND_WHAT[k.kind]}.`, k.why],
    };
  }
  const x = rng.pick(IRONY_EFFECTS);
  return {
    prompt: `${x.lead}\n\n${quoteBlock(x.line)}\n\n${x.ask}`,
    parts: [part(mc(rng, x.right, x.wrong))],
    hints: ['Ask what the irony makes the audience feel or understand: suspense, pity, or a sense that the plotters are punished by their own plots.'],
    solution: [x.why],
  };
}

export const HAMLET_DEVICE_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-hamlet-devices',
    name: 'Dramatic devices in Hamlet',
    description: 'Recognize soliloquy, aside, monologue, dialogue, the play within a play, puns, stage directions, comic relief and foreshadowing in Hamlet, and explain what the Ghost, the foils and the “antic disposition” do in the play.',
    outcomes: ['12-C1'],
    lessonId: L,
    format: 'mc',
    gen: devicesQ,
  }),
  skill({
    id: 'e12-hamlet-irony',
    name: 'Irony in Hamlet',
    description: 'Explain what the audience knows that the characters do not, tell dramatic, verbal and situational irony apart, and explain their effects in Hamlet.',
    outcomes: ['12-C1'],
    lessonId: L,
    format: 'mc',
    gen: ironyQ,
  }),
];
