/**
 * Grade 11 English, lesson 3.3: The Supernatural and Dramatic Devices (11-C1). Soliloquy, aside,
 * monologue and dialogue; prophecy, foreshadowing, comic relief and stage directions; equivocation;
 * and the dramatic, verbal and situational ironies of Macbeth, from the witches' prophecies to
 * Birnam Wood and the man “none of woman born” can harm.
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import * as M from './macbeth.ts';
import { quoteBlock, type Passage } from './macbeth.ts';

const L = 'e11-3-3';

// ---------------------------------------------------------------------------- devices

type Device = 'soliloquy' | 'aside' | 'monologue' | 'dialogue' | 'prophecy' | 'foreshadowing' | 'comic' | 'stage' | 'equivocation';
const DEVICE_NAME: Record<Device, string> = {
  soliloquy: 'Soliloquy',
  aside: 'Aside',
  monologue: 'Monologue',
  dialogue: 'Dialogue',
  prophecy: 'Prophecy',
  foreshadowing: 'Foreshadowing',
  comic: 'Comic relief',
  stage: 'Stage direction',
  equivocation: 'Equivocation',
};
const DEVICE_WHAT: Record<Device, string> = {
  soliloquy: 'a speech in which a character alone on stage speaks their thoughts aloud',
  aside: 'a short remark to the audience that the other characters on stage do not hear',
  monologue: 'a long speech by one character to other characters',
  dialogue: 'a conversation between two or more characters',
  prophecy: 'a prediction of what will happen, often from a supernatural source',
  foreshadowing: 'a hint of what will happen later in the play',
  comic: 'a funny scene, speech or character that eases the tension of a serious play',
  stage: 'an instruction in the script that tells the actors what to do, such as enter, fight or knock',
  equivocation: 'speaking in words with two meanings, so as to mislead without telling a plain lie',
};
/** Kinds of speech, and techniques: a question offers choices from one group, since a soliloquy can also foreshadow. */
const SPEECH: Device[] = ['soliloquy', 'aside', 'monologue', 'dialogue'];
const TECHNIQUE: Device[] = ['prophecy', 'foreshadowing', 'comic', 'stage'];

interface Example {
  device: Device;
  lead: string;
  ask?: string;
  line: Passage;
  /** Devices that could also be argued for this example, left out of its choices. */
  not?: Device[];
  why: string;
}
const EXAMPLES: Example[] = [
  { device: 'soliloquy', lead: 'Macbeth has sent his servant to bed and is alone, waiting for the bell:', line: M.DAGGER, why: 'Macbeth is alone on stage and speaks his thoughts aloud, so the audience sees into his mind: a soliloquy.' },
  { device: 'soliloquy', lead: 'Macbeth has slipped away from the supper where Duncan is dining, and is alone:', line: M.ASSASSINATION, why: 'No one else is on stage: Macbeth argues with himself aloud, in a soliloquy.' },
  { device: 'soliloquy', lead: 'Lady Macbeth is alone after the messenger leaves:', line: M.RAVEN, why: 'Lady Macbeth is alone, and speaks her wish for cruelty aloud to no one but the audience: a soliloquy.' },
  { device: 'soliloquy', lead: 'Banquo is alone in the palace, now that Macbeth is king:', line: M.THOU_HAST_IT_NOW, why: 'Banquo is alone on stage and speaks his suspicions aloud: a soliloquy.' },
  { device: 'soliloquy', lead: 'Lady Macbeth is alone, after sending a servant to fetch the King:', line: M.NAUGHTS_HAD, why: 'With the servant gone, Lady Macbeth speaks her private unhappiness aloud to no one but the audience: a soliloquy.' },
  { device: 'aside', lead: 'Ross and Angus have just greeted Macbeth as Thane of Cawdor. While they and Banquo talk, Macbeth says:', line: M.CHANCE_CROWN, why: 'The stage direction marks it: Macbeth speaks to the audience, and the others on stage do not hear.' },
  { device: 'aside', lead: 'Duncan has just named Malcolm Prince of Cumberland, in front of all his lords. Macbeth says:', line: M.STARS_HIDE, why: 'Macbeth speaks his “black and deep desires” to the audience alone, while Duncan and the lords stand by: an aside.' },
  { device: 'aside', lead: 'While Banquo talks with Ross and Angus, Macbeth says:', line: M.SUPERNATURAL_SOLICITING, why: 'The stage direction marks it: Macbeth’s troubled thoughts are for the audience, not for the people around him.' },
  { device: 'monologue', lead: 'A wounded captain reports the battle to King Duncan and his sons:', line: M.BRAVE_MACBETH, why: 'The captain speaks at length to other characters, who listen: a monologue.' },
  { device: 'monologue', lead: 'Lennox speaks at length to another lord about recent events:', line: M.LENNOX_IRONY, why: 'Lennox holds the stage with a long speech to another character, who hears every word: a monologue.' },
  { device: 'monologue', lead: 'Macbeth explains to the thanes why he killed Duncan’s grooms:', line: M.SILVER_SKIN, why: 'Macbeth speaks at length to the other characters on stage, who hear him: a monologue.' },
  { device: 'dialogue', lead: 'Macbeth has just arrived home:', line: M.NEVER_SHALL_SUN, why: 'Two characters speak to each other in turn: this is dialogue.' },
  { device: 'dialogue', lead: 'Macduff, in England, asks Ross about his family:', line: M.WELL_AT_PEACE, why: 'Two characters speak to each other in turn: this is dialogue.' },
  { device: 'dialogue', lead: 'In Macduff’s castle in Fife:', line: M.TRAITOR_SON, why: 'Two characters, a mother and her son, speak to each other in turn: this is dialogue.' },
  { device: 'prophecy', lead: 'On the heath, three strange figures greet Macbeth:', line: M.ALL_HAIL, not: ['foreshadowing'], why: 'The witches predict Macbeth’s future: Thane of Cawdor and then king. It is a prophecy from a supernatural source.' },
  { device: 'prophecy', lead: 'In the witches’ cave, an armed head rises from the cauldron:', line: M.BEWARE_MACDUFF, not: ['foreshadowing'], why: 'A supernatural apparition tells Macbeth what to fear in the future: a prophecy.' },
  { device: 'prophecy', lead: 'On the heath, the witches turn to Banquo:', line: M.BANQUO_PROPHECY, not: ['foreshadowing'], why: 'The witches predict that Banquo’s descendants will be kings: a prophecy.' },
  { device: 'foreshadowing', lead: 'On the heath, Banquo warns Macbeth about the witches’ promises:', line: M.INSTRUMENTS_OF_DARKNESS, not: ['prophecy'], why: 'Banquo warns that evil powers tell small truths to betray us later: the play bears him out. It is a hint of what is to come.' },
  { device: 'foreshadowing', lead: 'Macduff will not go to Macbeth’s crowning at Scone. He tells Ross:', line: M.OLD_ROBES, not: ['prophecy'], why: 'Macduff fears the new reign will fit worse than the old: a hint of the tyranny to come.' },
  { device: 'foreshadowing', lead: 'Banquo, setting out on the ride from which he will not return, promises Macbeth:', line: M.FAIL_NOT_OUR_FEAST, not: ['prophecy'], why: 'Banquo promises to come to the feast, and he does, as a ghost: a hint of what is to come.' },
  { device: 'comic', lead: 'Just after the murder of Duncan, someone keeps knocking at the castle gate:', line: M.PORTER_BONFIRE, why: 'The drunken Porter’s jokes about hell gate make the audience laugh just after the murder: comic relief.' },
  { device: 'comic', lead: 'The morning after the murder, the Porter stumbles to answer the knocking at the gate:', line: M.PORTER_HELL_GATE, not: ['stage'], why: 'The Porter’s drunken game of letting sinners into hell eases the tension, at least for a moment: comic relief.' },
  { device: 'stage', lead: 'Macbeth has just murdered Duncan:', ask: 'What are the words in square brackets?', line: M.WAKE_DUNCAN, why: 'The words in square brackets are not spoken: they tell the actors what happens. They are a stage direction.' },
  { device: 'stage', lead: 'On a road near the palace at dusk:', ask: 'What are the words in square brackets?', line: M.FLY_FLEANCE, why: 'The words in square brackets are not spoken: they say what happens on stage. They are a stage direction.' },
  { device: 'stage', lead: 'On the battlefield, young Siward challenges Macbeth:', ask: 'What are the words in square brackets?', line: M.YOUNG_SIWARD_SLAIN, why: 'The words in square brackets are not spoken: they tell the actors to fight. They are a stage direction.' },
];

interface Effect {
  device: Device;
  lead: string;
  line: Passage;
  right: string;
  wrong: string[];
}
const EFFECTS: Effect[] = [
  { device: 'soliloquy', lead: 'Macbeth, alone, on his way to Duncan’s room.', line: M.DAGGER, right: 'It lets the audience into Macbeth’s mind, so we see how disturbed he is, and wonder whether the dagger is real, just before the murder.', wrong: ['It tells Lady Macbeth that the murder is done.', 'It proves that the witches have sent him a real dagger.', 'It lightens the mood with a joke before a serious scene.'] },
  { device: 'aside', lead: 'Duncan has just named Malcolm heir to the throne, in front of all his lords.', line: M.STARS_HIDE, right: 'It shows the audience Macbeth’s secret thoughts of murder while, on stage, he seems a loyal subject: we know what Duncan cannot see.', wrong: ['It warns Duncan that he is in danger.', 'It shows that Macbeth has given up his ambition.', 'It is a remark to Banquo that the King overhears.'] },
  { device: 'comic', lead: 'The drunken Porter answers the knocking on the morning after the murder.', line: M.PORTER_BONFIRE, right: 'His jokes ease the horror for a moment, yet they make the castle a kind of hell, which is exactly what the murder has made it.', wrong: ['It shows that the Porter helped to plan the murder.', 'It tells the audience that Duncan is still alive.', 'It is a soliloquy revealing Macbeth’s fears.'] },
  { device: 'prophecy', lead: 'The witches greet Macbeth on the heath.', line: M.ALL_HAIL, right: 'The prophecy plants the idea of the crown in Macbeth’s mind and sets the tragedy in motion.', wrong: ['It warns Macbeth never to try to become king.', 'It tells the audience that Banquo will murder Duncan.', 'It ends the play’s main conflict.'] },
  { device: 'stage', lead: 'Macbeth has just murdered Duncan, and a knocking begins at the gate.', line: M.WAKE_DUNCAN, right: 'The repeated knocking builds suspense and fear: someone is at the gate, and the murderers may be found out.', wrong: ['It tells the audience that Duncan has woken up.', 'It is a joke that makes the murder less frightening.', 'It shows that the witches have come to the castle.'] },
  { device: 'equivocation', lead: 'In the witches’ cave, an apparition of a bloody child tells Macbeth:', line: M.NONE_OF_WOMAN_BORN, right: 'The words are true in a sense Macbeth cannot see, so they fill him with false confidence: “none of woman born” does not include a man “untimely ripp’d” from his mother’s womb.', wrong: ['The apparition is lying outright, and Macbeth knows it.', 'The words warn Macbeth plainly that Macduff will kill him.', 'The apparition is joking to lighten the mood.'] },
  { device: 'monologue', lead: 'Lennox speaks to another lord about recent events.', line: M.LENNOX_IRONY, right: 'Through its mocking irony, the audience learns that the thanes now see through Macbeth and suspect him of the murders.', wrong: ['It shows that Lennox fully believes Macbeth’s story.', 'It reveals Lennox’s private thoughts while he is alone.', 'It tells the audience that Fleance really killed Banquo.'] },
];

function devicesQ(rng: Rng, d: Difficulty) {
  if (d === 1) {
    const all: Device[] = [...SPEECH, ...TECHNIQUE, 'equivocation'];
    const dev = rng.pick(all);
    // Prophecy and foreshadowing, and prophecy and equivocation, are close: never offered together in a definition question.
    const near: Partial<Record<Device, Device[]>> = { prophecy: ['foreshadowing', 'equivocation'], foreshadowing: ['prophecy'], equivocation: ['prophecy'] };
    const others = rng.sample(all.filter((x) => x !== dev && !(near[dev] ?? []).includes(x)), 3);
    if (rng.chance(0.5)) {
      return {
        prompt: `Which term names ${DEVICE_WHAT[dev]}?`,
        parts: [part(mc(rng, DEVICE_NAME[dev], others.map((x) => DEVICE_NAME[x])))],
        hints: ['Soliloquy: alone. Aside: a quick remark others do not hear. Monologue: a long speech to others. Prophecy: a prediction. Equivocation: words with two meanings, meant to mislead.'],
        solution: [`${capFirst(aName(dev))} is ${DEVICE_WHAT[dev]}.`],
      };
    }
    return {
      prompt: `What is ${article(dev)}**${DEVICE_NAME[dev].toLowerCase()}**?`,
      parts: [part(mc(rng, capFirst(DEVICE_WHAT[dev]), others.map((x) => capFirst(DEVICE_WHAT[x]))))],
      hints: ['Think of an example from *Macbeth* and what makes it that kind of device.'],
      solution: [`${capFirst(aName(dev))} is ${DEVICE_WHAT[dev]}.`],
    };
  }
  if (d === 2) {
    const ex = rng.pick(EXAMPLES);
    const group = SPEECH.includes(ex.device) ? SPEECH : TECHNIQUE;
    const others = group.filter((x) => x !== ex.device && !(ex.not ?? []).includes(x));
    return {
      prompt: `${ex.lead}\n\n${quoteBlock(ex.line)}\n\n${ex.ask ?? 'Which dramatic device is this?'}`,
      parts: [part(mc(rng, DEVICE_NAME[ex.device], others.map((x) => DEVICE_NAME[x])))],
      hints: [SPEECH.includes(ex.device) ? 'Ask who is on stage and who can hear the speaker.' : 'Ask what the lines do: predict the future, hint at what is coming, make us laugh, or tell the actors what to do?'],
      solution: [ex.why],
    };
  }
  const e = rng.pick(EFFECTS);
  return {
    prompt: `${e.lead}\n\n${quoteBlock(e.line)}\n\nThis is ${EFFECT_NAME[e.device] ?? aName(e.device)}. What is its main effect?`,
    parts: [part(mc(rng, e.right, e.wrong))],
    hints: ['Ask what the device lets the audience know, feel or notice at this moment of the play.'],
    solution: [e.right, `${capFirst(aName(e.device))} is ${DEVICE_WHAT[e.device]}.`],
  };
}
/** How an effect question names its device. */
const EFFECT_NAME: Partial<Record<Device, string>> = { prophecy: 'a prophecy', equivocation: 'an example of equivocation', foreshadowing: 'an example of foreshadowing' };
const capFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "a " or "an ", or nothing for the uncountable devices. */
const article = (d: Device) => (['comic', 'foreshadowing', 'dialogue', 'equivocation', 'prophecy'].includes(d) ? '' : /^[aeiou]/i.test(DEVICE_NAME[d]) ? 'an ' : 'a ');
/** "a soliloquy", "an aside", "comic relief". */
const aName = (d: Device) => `${article(d)}${DEVICE_NAME[d].toLowerCase()}`;

// ---------------------------------------------------------------------------- irony

interface Dramatic {
  lead: string;
  line: Passage;
  who: string;
  knows: string;
  wrongKnows: string[];
  effect: string;
  wrongEffects: string[];
  /** The moment in one sentence, for "Which moment is an example of dramatic irony?". */
  summary: string;
}
const DRAMATIC: Dramatic[] = [
  {
    lead: 'Duncan speaks of the traitor Thane of Cawdor, just as Macbeth enters:', line: M.NO_ART, who: 'Duncan',
    knows: 'Macbeth, the man walking in, has already thought of murdering him.', wrongKnows: ['Macbeth has already been crowned king.', 'Banquo is plotting against him.', 'The Thane of Cawdor is still alive and free.'],
    effect: 'Duncan admits he can never judge a man by his face, then warmly greets the next traitor: we watch him make the same mistake again.', wrongEffects: ['It reassures the audience that Duncan has learned his lesson.', 'It makes the audience laugh at the Thane of Cawdor.', 'It reveals Macbeth’s plan to everyone on stage.'],
    summary: 'Duncan says no one can read a traitor’s mind in his face, just as Macbeth, who has already thought of murder, enters.',
  },
  {
    lead: 'Duncan arrives at Macbeth’s castle:', line: M.PLEASANT_SEAT, who: 'Duncan',
    knows: 'Lady Macbeth means to have him murdered in this castle tonight.', wrongKnows: ['The castle is about to be attacked by the Norwegians.', 'Macbeth has fled to England.', 'Banquo is waiting inside to arrest him.'],
    effect: 'The King praises the sweet air of the place where he will be murdered, which makes the scene quietly chilling.', wrongEffects: ['It shows that Duncan suspects the Macbeths.', 'It is a joke that lightens the mood.', 'It tells the audience that Duncan will be safe.'],
    summary: 'Duncan praises the pleasant air of the castle where Lady Macbeth plans to have him murdered that night.',
  },
  {
    lead: 'Macduff tells the household that the King has been murdered:', line: M.WHAT_IN_OUR_HOUSE, who: 'Macduff and Banquo',
    knows: 'Lady Macbeth helped to plan the murder and smeared the grooms with blood herself.', wrongKnows: ['Duncan is not really dead.', 'Banquo committed the murder.', 'Macduff killed the King.'],
    effect: 'Her shocked “What, in our house?” is pure acting, and Banquo’s reply, “Too cruel anywhere”, shows how hollow her concern sounds.', wrongEffects: ['It shows that Lady Macbeth is truly innocent.', 'It reveals the murderer to everyone on stage.', 'It makes the scene comic.'],
    summary: 'Lady Macbeth cries, “What, in our house?”, as though shocked by the murder she helped to plan.',
  },
  {
    lead: 'The morning after the murder, Lennox describes the stormy night:', line: M.ROUGH_NIGHT, who: 'Lennox',
    knows: 'Macbeth has just murdered the King in that same night.', wrongKnows: ['Macbeth slept through the storm.', 'Lennox caused the storm.', 'The chimneys were blown down by the Porter.'],
    effect: 'Macbeth’s flat reply, “’Twas a rough night”, is a chilling understatement: we know just how rough his night was.', wrongEffects: ['It shows that Macbeth is bored by the weather.', 'It proves that Macbeth is innocent.', 'It tells Lennox what Macbeth has done.'],
    summary: 'Lennox describes the wild night, and Macbeth, who has just killed the King, answers only, “’Twas a rough night.”',
  },
  {
    lead: 'Banquo and Fleance ride up to the palace gate at dusk:', line: M.RAIN_TONIGHT, who: 'Banquo',
    knows: 'The men waiting in the dark have been sent by Macbeth to kill him and his son.', wrongKnows: ['Fleance has already been killed.', 'The feast has been cancelled.', 'Macbeth is waiting at the gate to welcome him.'],
    effect: 'Banquo’s small talk about rain becomes the cue for his murder, and the murderer’s “Let it come down” has a deadly second meaning.', wrongEffects: ['It tells the audience that Banquo will escape.', 'It makes the audience laugh at the weather.', 'It shows that Banquo suspects the murderers.'],
    summary: 'Banquo remarks that it will rain tonight, not knowing that the men in the dark have been sent to kill him.',
  },
  {
    lead: 'At the banquet, Macbeth raises his cup to the lords:', line: M.WHOM_WE_MISS, who: 'the lords at the banquet',
    knows: 'Macbeth has just been told that Banquo lies dead in a ditch.', wrongKnows: ['Banquo is on his way to the feast.', 'Fleance has been captured.', 'Lady Macbeth has poisoned the wine.'],
    effect: 'His false wish that Banquo were present is answered at once when the ghost rises again, which turns the toast into horror.', wrongEffects: ['It shows that Macbeth truly misses his friend.', 'It reveals the murder to the lords.', 'It calms Macbeth before the end of the feast.'],
    summary: 'Macbeth toasts “our dear friend Banquo, whom we miss”, though he knows he has had Banquo murdered.',
  },
  {
    lead: 'In England, Macduff asks Ross for news of his family:', line: M.WELL_AT_PEACE, who: 'Macduff',
    knows: 'Macduff’s wife and children have been murdered, so they are “at peace” only in death.', wrongKnows: ['Macduff’s family has fled safely to Ireland.', 'Ross has not been to Fife.', 'Macbeth has made peace with Macduff.'],
    effect: 'Ross’s careful words delay the blow, and we wait in dread for Macduff to understand.', wrongEffects: ['It reassures the audience that the family is safe.', 'It makes Macduff laugh with relief.', 'It shows that Ross is on Macbeth’s side.'],
    summary: 'Ross tells Macduff that his family were “well at peace” when he left them, knowing that they have been murdered.',
  },
];
/** Moments with no dramatic irony: the characters know what the audience knows. */
const PLAIN: string[] = [
  'A wounded captain tells Duncan how bravely Macbeth fought against the rebels.',
  'Malcolm and Donalbain agree to flee to England and Ireland after their father’s murder.',
  'The witches stir their cauldron and chant “Double, double, toil and trouble”.',
  'Ross tells Macduff plainly that his wife and children have been savagely slaughtered.',
  'Malcolm tells his soldiers to cut boughs from Birnam Wood and carry them.',
  'Macbeth tells his wife that Duncan is coming to the castle tonight.',
];

type Kind = 'dramatic' | 'verbal' | 'situational';
const KIND_NAME: Record<Kind, string> = { dramatic: 'Dramatic irony', verbal: 'Verbal irony', situational: 'Situational irony' };
const KIND_WHAT: Record<Kind, string> = {
  dramatic: 'the audience knows something important that a character does not',
  verbal: 'a speaker says the opposite of what they mean',
  situational: 'what happens is the opposite of what was expected or intended',
};
const KINDS: Array<{ kind: Kind; lead: string; line?: Passage; why: string }> = [
  { kind: 'verbal', lead: 'Lennox speaks to another lord about recent deaths at court:', line: M.LENNOX_IRONY, why: 'Lennox pretends to accept Macbeth’s story (“Men must not walk too late”), but he means the opposite: he suspects Macbeth of both murders.' },
  { kind: 'verbal', lead: 'Lennox speaks of Macbeth killing Duncan’s grooms:', line: M.NOBLY_DONE, why: 'Lennox calls the killing “nobly done” and “wisely too”, meaning that it was a crime that conveniently silenced the only witnesses.' },
  { kind: 'situational', lead: 'Right after the murder, Lady Macbeth says, “A little water clears us of this deed: / How easy is it then!” In Act 5, she walks in her sleep, crying, “What, will these hands ne’er be clean?”', why: 'She expected the guilt to wash away as easily as the blood; instead it torments her to madness. The outcome is the opposite of what she expected.' },
  { kind: 'situational', lead: 'The apparition promises that Macbeth will never be defeated until Birnam Wood comes to Dunsinane. Macbeth feels safe, since a forest cannot move. Then Malcolm’s soldiers cut branches from Birnam Wood and carry them towards the castle.', why: 'The prophecy that seemed to make Macbeth safe comes true in a way he never expected: the outcome is the opposite of what he was led to believe.' },
  { kind: 'situational', lead: 'Macbeth kills Duncan to become king and be secure, but on the throne he says, “To be thus is nothing, / But to be safely thus,” and he never feels safe again.', why: 'Murder was meant to bring Macbeth power and security; instead it brings endless fear. The result is the opposite of what he intended.' },
  { kind: 'dramatic', lead: 'Duncan arrives at Macbeth’s castle and says, “This castle hath a pleasant seat”, while the audience knows that Lady Macbeth plans to have him murdered there that night.', why: 'The audience knows what Duncan does not: the pleasant castle is the place of his death.' },
  { kind: 'dramatic', lead: 'At the banquet, Macbeth tells the lords he wishes “our dear friend Banquo” were there, while the audience knows that Macbeth has just had Banquo murdered.', why: 'The lords believe Macbeth’s friendly words; the audience knows the truth.' },
];

/** The equivocal prophecies and how they come true (difficulty 3). */
const EQUIVOCAL: Array<{ line: Passage; lead: string; ask: string; right: string; wrong: string[]; why: string }> = [
  {
    line: M.BIRNAM, lead: 'In the witches’ cave, a crowned child with a tree in its hand tells Macbeth:', ask: 'How does this prophecy come true?',
    right: 'Malcolm’s soldiers cut branches from Birnam Wood and carry them to hide their numbers, so the wood seems to move to Dunsinane.',
    wrong: ['A storm uproots the trees of Birnam Wood and blows them to the castle.', 'Macbeth moves his army to Birnam Wood, so the prophecy never applies.', 'The witches cast a spell that makes the trees walk.'],
    why: 'In Act 5, Scene 4, Malcolm orders, “Let every soldier hew him down a bough, / And bear’t before him”. The words came true, but not as Macbeth understood them.',
  },
  {
    line: M.NONE_OF_WOMAN_BORN, lead: 'In the witches’ cave, a bloody child tells Macbeth:', ask: 'How does this prophecy come true?',
    right: 'Macduff was “untimely ripp’d” from his mother’s womb, delivered by surgery rather than born in the usual way, and he kills Macbeth.',
    wrong: ['Macbeth is killed by a woman, Lady Macduff.', 'No one ever harms Macbeth, and he dies of old age.', 'Malcolm is revealed to be the son of a witch.'],
    why: 'Macbeth took “none of woman born” to mean no man at all. Macduff, “from his mother’s womb / Untimely ripp’d”, is the exception hidden in the words.',
  },
  {
    line: M.EQUIVOCATION_OF_FIEND, lead: 'Macbeth hears that Birnam Wood seems to be moving:', ask: 'What does Macbeth begin to realize about the witches’ promises?',
    right: 'They were equivocations: true in their words, but meant to mislead him into a false sense of safety.',
    wrong: ['They were plain lies that he should never have believed.', 'They were warnings that he understood correctly all along.', 'They were jokes that meant nothing at all.'],
    why: 'He doubts “th’ equivocation of the fiend, / That lies like truth”: the prophecies were literally true, but deceived him.',
  },
  {
    line: M.SECURITY, lead: 'Hecate tells the witches how the apparitions will work on Macbeth:', ask: 'Why do the apparitions give Macbeth promises that seem to make him safe?',
    right: 'False confidence (“security”) will make him overreach, and it is “mortals’ chiefest enemy”.',
    wrong: ['They want to protect him from Macduff.', 'They have decided to make up for their earlier lies.', 'They want him to give up the crown.'],
    why: 'Hecate says he will “spurn fate, scorn death” and that “security / Is mortals’ chiefest enemy”: the promises are a trap that feeds his overconfidence.',
  },
];

function ironyQ(rng: Rng, d: Difficulty) {
  if (d === 1) {
    const m = rng.pick(DRAMATIC);
    return {
      prompt: `${m.lead}\n\n${quoteBlock(m.line)}\n\nWhat does the audience know here that ${m.who} ${m.who.includes(' and ') || m.who.startsWith('the ') ? 'do' : 'does'} not?`,
      parts: [part(mc(rng, m.knows, m.wrongKnows))],
      hints: ['Think back over what the audience has seen and heard so far that the characters on stage have not.'],
      solution: [`The audience knows that ${lowerFirst(m.knows)}`, 'That gap between what we know and what the characters believe is dramatic irony.'],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const m = rng.pick(DRAMATIC);
      return {
        prompt: `${m.lead}\n\n${quoteBlock(m.line)}\n\nThe audience knows something here that ${m.who} ${m.who.includes(' and ') || m.who.startsWith('the ') ? 'do' : 'does'} not: ${lowerFirst(m.knows)} What is the main effect of this dramatic irony?`,
        parts: [part(mc(rng, m.effect, m.wrongEffects))],
        hints: ['Dramatic irony usually creates tension, suspense, horror or pity: we watch characters act on a mistake that we can see and they cannot.'],
        solution: [m.effect],
      };
    }
    const k = rng.pick(KINDS);
    const shown = k.line ? `${k.lead}\n\n${quoteBlock(k.line)}` : k.lead;
    return {
      prompt: `${shown}\n\nWhich kind of irony is this?`,
      parts: [part(fixedChoice([KIND_NAME.dramatic, KIND_NAME.verbal, KIND_NAME.situational], ['dramatic', 'verbal', 'situational'].indexOf(k.kind)))],
      hints: ['Dramatic: the audience knows more than a character. Verbal: a speaker means the opposite of what they say. Situational: things turn out the opposite of what was expected.'],
      solution: [`This is ${KIND_NAME[k.kind].toLowerCase()}: ${KIND_WHAT[k.kind]}.`, k.why],
    };
  }
  if (rng.chance(0.5)) {
    const q = rng.pick(EQUIVOCAL);
    return {
      prompt: `${q.lead}\n\n${quoteBlock(q.line)}\n\n${q.ask}`,
      parts: [part(mc(rng, q.right, q.wrong))],
      hints: ['The witches’ promises are equivocal: true in their words, but not in the sense Macbeth takes them. Look for the second meaning.'],
      solution: [q.right, q.why],
    };
  }
  const right = rng.pick(DRAMATIC).summary;
  return {
    prompt: 'Which moment from *Macbeth* is the clearest example of **dramatic irony**?',
    parts: [part(mc(rng, right, rng.sample(PLAIN, 3)))],
    hints: ['In dramatic irony, the audience knows something important that a character on stage does not. Look for the moment with a gap between what we know and what a character believes.'],
    solution: [right, 'In the other moments, the characters on stage know as much as the audience does, so there is no dramatic irony.'],
  };
}
const lowerFirst = (s: string) => (/^(Macbeth|Macduff|Lady|Duncan|Banquo|Malcolm|Ross|Fleance)/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));

export const MACBETH_IRONY_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-macbeth-devices',
    name: 'Dramatic devices in Macbeth',
    description: 'Recognize soliloquy, aside, monologue, dialogue, prophecy, foreshadowing, comic relief, stage directions and equivocation in Macbeth, and explain their effect.',
    outcomes: ['11-C1'],
    lessonId: L,
    format: 'mc',
    gen: devicesQ,
  }),
  skill({
    id: 'e11-macbeth-irony',
    name: 'Irony in Macbeth',
    description: 'Explain the dramatic, verbal and situational ironies of Macbeth, including how the witches’ equivocal prophecies come true.',
    outcomes: ['11-C1'],
    lessonId: L,
    format: 'mc',
    gen: ironyQ,
  }),
];
