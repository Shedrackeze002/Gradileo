/**
 * Grade 10 English, lesson 3.3: Soliloquy and Dramatic Irony (10-C1). The devices of a play
 * (soliloquy, aside, monologue, dialogue, comic relief, foreshadowing, pun, stage direction) with
 * examples from Romeo and Juliet, and the moments where the audience knows what a character does not.
 */
import { mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import * as P from './play.ts';
import { quoteBlock, type Passage } from './play.ts';

const L = 'e10-3-3';

// ---------------------------------------------------------------------------- devices

type Device = 'soliloquy' | 'aside' | 'monologue' | 'dialogue' | 'comic' | 'foreshadowing' | 'pun' | 'stage';
const DEVICE_NAME: Record<Device, string> = {
  soliloquy: 'Soliloquy',
  aside: 'Aside',
  monologue: 'Monologue',
  dialogue: 'Dialogue',
  comic: 'Comic relief',
  foreshadowing: 'Foreshadowing',
  pun: 'Pun',
  stage: 'Stage direction',
};
const DEVICE_WHAT: Record<Device, string> = {
  soliloquy: 'a speech in which a character alone on stage speaks their thoughts aloud',
  aside: 'a short remark to the audience that the other characters on stage do not hear',
  monologue: 'a long speech by one character to other characters',
  dialogue: 'a conversation between two or more characters',
  comic: 'a funny scene, speech or character that eases the tension of a serious play',
  foreshadowing: 'a hint of what will happen later in the story',
  pun: 'a joke that plays on two meanings of a word, or on words that sound alike',
  stage: 'an instruction in the script that tells the actors what to do, such as enter, fight or drink',
};
/** Kinds of speech, and techniques: a question offers choices from one group, since a soliloquy can also foreshadow. */
const SPEECH: Device[] = ['soliloquy', 'aside', 'monologue', 'dialogue'];
const TECHNIQUE: Device[] = ['comic', 'foreshadowing', 'pun', 'stage'];

interface Example {
  device: Device;
  lead: string;
  /** The question, when it is not simply which device the passage is. */
  ask?: string;
  line: Passage;
  /** Devices that could also be argued for this example, left out of its choices. */
  not?: Device[];
  why: string;
}
const EXAMPLES: Example[] = [
  { device: 'soliloquy', lead: 'Juliet is alone in her room at night, holding the Friar’s vial.', line: P.ACT_ALONE, why: 'Juliet is alone, and she speaks her fears aloud so that the audience hears them: a soliloquy.' },
  { device: 'soliloquy', lead: 'Juliet is alone in her room, waiting for night and for Romeo.', line: P.GALLOP_APACE, why: 'No one else is on stage: Juliet speaks her impatient thoughts aloud, in a soliloquy.' },
  { device: 'soliloquy', lead: 'Friar Lawrence enters alone at dawn, with a basket for gathering plants.', line: P.FRIAR_MORN, why: 'The Friar is alone and speaks his thoughts to no one but the audience: a soliloquy.' },
  { device: 'soliloquy', lead: 'Romeo is alone in a street in Mantua, before his servant arrives.', line: P.ROMEO_DREAM, why: 'Romeo is alone on stage and speaks his thoughts aloud: a soliloquy.' },
  { device: 'soliloquy', lead: 'The Nurse has just left the room. Juliet, alone, says:', line: P.POWER_TO_DIE, why: 'With the Nurse gone, Juliet speaks her real plan aloud to no one but the audience: a soliloquy.' },
  { device: 'aside', lead: 'Hidden in the garden, Romeo listens as Juliet speaks at her window above, unaware that he is there.', line: P.ROMEO_ASIDE, why: 'The stage direction marks it: Romeo speaks one line to the audience, and Juliet does not hear it.' },
  { device: 'aside', lead: 'Paris has been telling Friar Lawrence why his wedding to Juliet must be so soon. The Friar says:', line: P.FRIAR_SLOWD, why: 'The Friar speaks this line so that only the audience hears it: Paris must not learn that Juliet is already married.' },
  { device: 'monologue', lead: 'On the way to the feast, Mercutio makes fun of Romeo’s belief in dreams with a long speech to his friends that begins:', line: P.QUEEN_MAB, why: 'Mercutio holds the stage with a long speech to Romeo and Benvolio, who are listening: a monologue.' },
  { device: 'monologue', lead: 'Part of Friar Lawrence’s long speech to Juliet, explaining his plan:', line: P.TAKE_THIS_VIAL, why: 'The Friar speaks at length to another character, Juliet, who listens: a monologue.' },
  { device: 'monologue', lead: 'Part of Capulet’s long, furious speech to Juliet, in front of her mother and the Nurse:', line: P.DRAG_THEE, why: 'Capulet speaks at length to other characters on stage, who hear every word: a monologue.' },
  { device: 'dialogue', lead: 'In the first scene, servants of the two houses meet in the street:', line: P.THUMB, why: 'Two characters speak to each other in turn: this is dialogue.' },
  { device: 'dialogue', lead: 'Paris meets Juliet at Friar Lawrence’s cell:', line: P.WHAT_MUST_BE, why: 'Three characters speak to one another in turn: this is dialogue.' },
  { device: 'dialogue', lead: 'Capulet is planning Juliet’s wedding with Paris:', line: P.WHAT_DAY, why: 'Two characters speak to each other in turn: this is dialogue.' },
  { device: 'comic', lead: 'Before Lady Capulet can raise the serious subject of marriage, the Nurse rambles on about Juliet as a baby:', line: P.NURSE_SUSAN, not: ['pun'], why: 'The Nurse’s rambling, comic memories lighten the scene before the serious talk of marriage: comic relief.' },
  { device: 'comic', lead: 'Juliet is desperate for Romeo’s answer about the wedding, but the Nurse keeps complaining that she is too tired to tell her. Juliet says:', line: P.OUT_OF_BREATH, not: ['pun'], why: 'The Nurse’s teasing delay, and Juliet’s exasperated reply, make the audience laugh just before the secret wedding: comic relief.' },
  { device: 'foreshadowing', lead: 'On the way to the Capulets’ feast, where he will meet Juliet, Romeo says:', line: P.ROMEO_MISGIVES, why: 'Romeo senses that something “hanging in the stars” will begin tonight and end in “untimely death”: a hint of what is to come.' },
  { device: 'foreshadowing', lead: 'At the feast, Juliet sends the Nurse to find out who Romeo is:', line: P.JULIET_GRAVE, why: 'Juliet’s fear that her grave may be her “wedding bed” hints at her death after her marriage.' },
  { device: 'foreshadowing', lead: 'As Romeo leaves for Mantua at dawn, Juliet looks down at him:', line: P.ILL_DIVINING, why: 'Juliet imagines Romeo “dead in the bottom of a tomb”, and that is where she will next see him.' },
  { device: 'foreshadowing', lead: 'Just before his wedding, Romeo tells Friar Lawrence:', line: P.LOVE_DEVOURING_DEATH, why: 'Romeo dares death to do its worst, and death will soon take both lovers: a hint of the ending.' },
  { device: 'foreshadowing', lead: 'The Chorus speaks before the play begins:', line: P.PROLOGUE_STAR_CROSSED, why: 'The Prologue tells the audience that the “star-cross’d lovers” will die: the ending is hinted at, even told, from the start.' },
  { device: 'foreshadowing', lead: 'Alone in Mantua, Romeo describes his dream:', line: P.FOUND_ME_DEAD, not: ['comic'], why: 'Romeo dreams that Juliet finds him dead; in the tomb, she will.' },
  { device: 'pun', lead: 'Mercutio has been wounded by Tybalt:', line: P.GRAVE_MAN, not: ['comic'], why: '“Grave” means both “serious” and “in a grave”: Mercutio jokes on both meanings as he dies.' },
  { device: 'pun', lead: 'The servants Sampson and Gregory joke as the play opens:', line: P.SERVANTS_COLLIERS, not: ['comic'], why: 'The jokes play on words that sound alike: “colliers” (coal-sellers), “choler” (anger) and “collar” (the hangman’s noose).' },
  { device: 'pun', lead: 'Romeo’s friends want him to dance at the feast. He refuses:', line: P.SOUL_OF_LEAD, not: ['comic'], why: '“Soles” (of shoes) and “soul” sound alike: his friends have light dancing shoes, but his soul is heavy as lead.' },
  { device: 'pun', lead: 'The Nurse has just said that she hopes to live to see Juliet married. Lady Capulet answers:', line: P.MARRY_THEME, not: ['comic'], why: 'Lady Capulet begins with “Marry”, an oath meaning “indeed”, then plays on its other meaning, getting married: the very subject she has come to raise.' },
  { device: 'stage', lead: 'In the tomb, Romeo says his last words:', ask: 'What are the words in square brackets?', line: P.WITH_A_KISS, why: '“[Drinks.]” is not spoken: it tells the actor what to do. It is a stage direction.' },
  { device: 'stage', lead: 'Juliet has woken in the tomb and found Romeo dead:', ask: 'What are the words in square brackets?', line: P.HAPPY_DAGGER, why: 'The words in square brackets are not spoken: they tell the actor what to do. They are stage directions.' },
];

interface Effect {
  lead: string;
  line: Passage;
  device: Device;
  right: string;
  wrong: string[];
}
const EFFECTS: Effect[] = [
  { device: 'soliloquy', lead: 'Juliet is alone with the Friar’s vial.', line: P.WHAT_IF_POISON, right: 'It lets the audience hear the private fears she hides from everyone else, so we share her terror before she drinks.', wrong: ['It tells her mother and the Nurse what she is about to do.', 'It lightens the mood with a joke before a serious scene.', 'It shows that she no longer trusts Romeo.'] },
  { device: 'aside', lead: 'Paris has explained why his wedding to Juliet must be so soon.', line: P.FRIAR_SLOWD, right: 'It shows the audience that the Friar knows a secret Paris does not: Juliet is already married.', wrong: ['It warns Paris that the wedding must be put off.', 'It shows that the Friar has forgotten about the wedding.', 'It makes the audience laugh at Paris.'] },
  { device: 'foreshadowing', lead: 'The Chorus speaks before the play begins.', line: P.PROLOGUE_STAR_CROSSED, right: 'Telling the audience from the start that the lovers will die makes every hopeful moment that follows feel doomed.', wrong: ['It keeps the ending a surprise until the last scene.', 'It shows that the two families have already made peace.', 'It explains how the feud between the families began.'] },
  { device: 'comic', lead: 'Lady Capulet wants to talk to Juliet about marriage, but the Nurse rambles on about Juliet as a baby.', line: P.NURSE_SUSAN, right: 'Her rambling story lightens the mood and shows her warm, talkative nature before the serious talk of marriage.', wrong: ['It reveals that Juliet is secretly married.', 'It builds suspense about whether Juliet will die.', 'It shows that the Nurse dislikes Juliet.'] },
  { device: 'pun', lead: 'Mercutio has been wounded by Tybalt.', line: P.GRAVE_MAN, right: 'He jokes even as he dies, which shows his wit to the very end and makes his death more shocking.', wrong: ['It shows that he does not realize he has been hurt.', 'It tells the audience that he will recover.', 'It proves that he is on Tybalt’s side.'] },
  { device: 'monologue', lead: 'Romeo has said that dreams can come true. Mercutio answers with a long speech to his friends about Queen Mab, the fairy who brings dreams. It begins:', line: P.QUEEN_MAB, right: 'His fanciful speech shows his wild imagination and makes fun of Romeo’s faith in dreams.', wrong: ['It reveals his private thoughts while he is alone on stage.', 'It is a secret remark that Romeo does not hear.', 'It shows that he believes every dream comes true.'] },
  { device: 'foreshadowing', lead: 'As Romeo leaves for Mantua at dawn, Juliet looks down at him.', line: P.ILL_DIVINING, right: 'It hints at the ending: the next time Juliet sees Romeo, he will be lying dead in a tomb.', wrong: ['It shows that Juliet is happy to see Romeo leave.', 'It tells Romeo about the Friar’s plan.', 'It is a joke that eases the tension of the parting.'] },
];

function devicesQ(rng: Rng, d: Difficulty) {
  if (d === 1) {
    const dev = rng.pick([...SPEECH, ...TECHNIQUE]);
    const others = rng.sample([...SPEECH, ...TECHNIQUE].filter((x) => x !== dev), 3);
    if (rng.chance(0.5)) {
      return {
        prompt: `Which term names ${DEVICE_WHAT[dev]}?`,
        parts: [part(mc(rng, DEVICE_NAME[dev], others.map((x) => DEVICE_NAME[x])))],
        hints: ['Soliloquy: alone. Aside: a quick remark others do not hear. Monologue: a long speech to others. Dialogue: a conversation.'],
        solution: [`${capFirst(aName(dev))} is ${DEVICE_WHAT[dev]}.`],
      };
    }
    return {
      prompt: `What is ${article(dev)}**${DEVICE_NAME[dev].toLowerCase()}**?`,
      parts: [part(mc(rng, capFirst(DEVICE_WHAT[dev]), others.map((x) => capFirst(DEVICE_WHAT[x]))))],
      hints: ['Think of an example from *Romeo and Juliet* and what makes it that kind of device.'],
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
      hints: [SPEECH.includes(ex.device) ? 'Ask who is on stage and who can hear the speaker.' : 'Ask what the lines do: make us laugh, hint at what is coming, play on a word, or tell the actors what to do?'],
      solution: [ex.why],
    };
  }
  const e = rng.pick(EFFECTS);
  return {
    prompt: `${e.lead}\n\n${quoteBlock(e.line)}\n\nThis is ${aName(e.device)}. What is its main effect?`,
    parts: [part(mc(rng, e.right, e.wrong))],
    hints: ['Ask what the device lets the audience know, feel or notice at this moment of the play.'],
    solution: [`${e.right}`, `${capFirst(aName(e.device))} is ${DEVICE_WHAT[e.device]}.`],
  };
}
const capFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "a " or "an ", or nothing for "comic relief", "foreshadowing" and "dialogue". */
const article = (d: Device) => (['comic', 'foreshadowing', 'dialogue'].includes(d) ? '' : /^[aeiou]/i.test(DEVICE_NAME[d]) ? 'an ' : 'a ');
/** "a soliloquy", "an aside", "comic relief". */
const aName = (d: Device) => `${article(d)}${DEVICE_NAME[d].toLowerCase()}`;

// ---------------------------------------------------------------------------- dramatic irony

interface Irony {
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
const IRONIES: Irony[] = [
  {
    lead: 'Tybalt has called Romeo a villain and challenged him. Romeo answers:', line: P.REASON_TO_LOVE, who: 'Tybalt and Mercutio',
    knows: 'Romeo has just married Juliet, Tybalt’s cousin.', wrongKnows: ['Tybalt has already killed Mercutio.', 'Romeo has been banished to Mantua.', 'Juliet has taken a sleeping potion.'],
    effect: 'Tension: we understand Romeo’s gentleness, while Tybalt and Mercutio take it for cowardice, and we dread the fight to come.', wrongEffects: ['It makes the audience laugh at Tybalt’s mistake.', 'It reveals the marriage to everyone on stage.', 'It shows that Romeo is afraid of Tybalt.'],
    summary: 'Tybalt challenges Romeo, not knowing that Romeo has just married Tybalt’s cousin, Juliet.',
  },
  {
    lead: 'Juliet waits impatiently for night, when Romeo will come to her:', line: P.TEDIOUS_DAY, who: 'Juliet',
    knows: 'Romeo has just killed Tybalt and been banished.', wrongKnows: ['Romeo has gone to Mantua to buy poison.', 'Juliet has already married Paris.', 'The Nurse has told Capulet about the wedding.'],
    effect: 'Pity: her happiness is painful to watch, because we know it is about to be shattered.', wrongEffects: ['Relief: we know that everything will turn out well.', 'Humour: we laugh at how impatient she is.', 'Surprise: we learn about Tybalt’s death at the same moment she does.'],
    summary: 'Juliet longs for night to bring Romeo to her, not knowing that he has just killed her cousin and been banished.',
  },
  {
    lead: 'Lady Capulet promises Juliet revenge on “that same villain Romeo”:', line: P.MANY_MILES_ASUNDER, who: 'Lady Capulet',
    knows: 'Juliet loves Romeo and is secretly married to him.', wrongKnows: ['Juliet is planning to poison Romeo herself.', 'Romeo is still hiding in Juliet’s room.', 'Lady Capulet has already sent someone to Mantua.'],
    effect: 'Juliet’s double meanings let her tell the audience the truth, while her mother hears only hatred of Romeo.', wrongEffects: ['It shows that Juliet now hates Romeo.', 'It reveals the marriage to Lady Capulet.', 'It makes the audience doubt Juliet’s love.'],
    summary: 'Lady Capulet tells Juliet she will have Romeo poisoned, never guessing that Juliet is married to him.',
  },
  {
    lead: 'Paris greets Juliet at Friar Lawrence’s cell:', line: P.MY_LADY_AND_MY_WIFE, who: 'Paris',
    knows: 'Juliet is already married to Romeo.', wrongKnows: ['Juliet has already drunk the potion.', 'Romeo is dead.', 'The Friar is Juliet’s uncle.'],
    effect: 'Discomfort and tension: everything Paris says about their marriage is wrong in a way he cannot see.', wrongEffects: ['It makes us admire Paris for winning Juliet’s love.', 'It tells Paris the truth about Romeo.', 'It shows that Juliet has agreed to marry Paris.'],
    summary: 'Paris greets Juliet as “my lady and my wife”, not knowing that she is already married to Romeo.',
  },
  {
    lead: 'Juliet returns from the Friar’s cell and kneels to her father:', line: P.EVER_RULD, who: 'Capulet',
    knows: 'Juliet is only pretending; she plans to drink the Friar’s potion.', wrongKnows: ['Juliet has decided to marry Paris after all.', 'The Friar has told Capulet about Romeo.', 'Romeo has come back from Mantua.'],
    effect: 'Capulet’s joy is painful to watch, because it rests on a lie, and in his delight he moves the wedding a day earlier.', wrongEffects: ['It shows that Juliet has given up on Romeo.', 'It ends the conflict between Juliet and her father for good.', 'It makes the audience laugh at Juliet.'],
    summary: 'Capulet rejoices that his daughter will obey him, not knowing that her obedience is part of the Friar’s plan.',
  },
  {
    lead: 'On the wedding morning, Capulet finds Juliet lying cold on her bed:', line: P.UNTIMELY_FROST, who: 'Capulet and the rest of the household',
    knows: 'Juliet is not dead but in a deep sleep from the Friar’s potion.', wrongKnows: ['Juliet has stabbed herself.', 'Romeo has already heard the news in Mantua.', 'Paris gave Juliet the potion.'],
    effect: 'Their grief is hard to watch, and we wait anxiously to see whether the Friar’s plan will work.', wrongEffects: ['It tells us that Juliet has really died.', 'It makes the scene a comic one.', 'It shows that the Capulets never loved Juliet.'],
    summary: 'The Capulets weep over Juliet’s body, believing she is dead, while she lies in a drugged sleep.',
  },
  {
    lead: 'In Mantua, Romeo asks his servant for news of Juliet. Balthasar answers:', line: P.SHE_IS_WELL, who: 'Romeo and Balthasar',
    knows: 'Juliet is only in a drugged sleep, and the Friar’s letter has not reached Romeo.', wrongKnows: ['Juliet really has died of grief.', 'Balthasar is lying to Romeo on purpose.', 'Romeo has already read the Friar’s letter.'],
    effect: 'Agonizing suspense: one message could save Romeo, but we watch him act on a mistake.', wrongEffects: ['Relief: we know Romeo will learn the truth in time.', 'Humour: Balthasar’s words are a joke.', 'Surprise: we learn of Juliet’s death at the same time as Romeo.'],
    summary: 'Balthasar tells Romeo that Juliet is dead, not knowing that she is only in a drugged sleep.',
  },
  {
    lead: 'In the tomb, Romeo looks at Juliet before he drinks the poison:', line: P.BEAUTYS_ENSIGN, who: 'Romeo',
    knows: 'Juliet is alive and about to wake.', wrongKnows: ['Juliet has been dead for two days.', 'Paris is still alive.', 'Friar Lawrence is already in the tomb.'],
    effect: 'Almost unbearable tension: Romeo notices the signs that she is alive but takes them for death’s mercy, and we watch him miss the truth by moments.', wrongEffects: ['It shows that Romeo knows Juliet is alive.', 'It comforts the audience that all will be well.', 'It makes the audience laugh at Romeo’s mistake.'],
    summary: 'Romeo notices that Juliet’s lips and cheeks are still red, but takes it as death’s mercy rather than a sign that she is alive.',
  },
  {
    lead: 'Alone in Mantua, Romeo wakes in good spirits:', line: P.ROMEO_DREAM, who: 'Romeo',
    knows: 'Juliet’s family believe she is dead, and she now lies in the Capulet tomb.', wrongKnows: ['Juliet has written to say she is coming to Mantua.', 'The Prince has pardoned Romeo.', 'Romeo has already bought the poison.'],
    effect: 'His cheerful mood makes the bad news that is coming feel even crueller.', wrongEffects: ['It tells us the news really will be joyful.', 'It shows that Romeo has forgotten Juliet.', 'It is a joke to lighten the ending.'],
    summary: 'Romeo wakes expecting joyful news, while the audience knows that Juliet’s family, believing her dead, have laid her in the tomb.',
  },
];
/** Moments with no dramatic irony: the characters know what the audience knows. */
const PLAIN: string[] = [
  'Benvolio tries to part the servants who are fighting in the first scene.',
  'Capulet invites Paris to his feast so that Paris can see Juliet.',
  'Mercutio makes fun of Romeo’s talk of dreams with a long speech about Queen Mab.',
  'Romeo tells Friar Lawrence that he loves Juliet and asks to be married that day.',
  'Capulet tells Paris that Juliet is too young to marry yet.',
  'The Prince orders Capulet and Montague to keep the peace after the first street fight.',
];

function ironyQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const right = rng.pick(IRONIES).summary;
    return {
      prompt: 'Which moment from *Romeo and Juliet* is the clearest example of **dramatic irony**?',
      parts: [part(mc(rng, right, rng.sample(PLAIN, 3)))],
      hints: ['In dramatic irony, the audience knows something important that a character on stage does not. Look for the moment with a gap between what we know and what a character believes.'],
      solution: [`${right}`, 'In the other moments, the characters know as much as the audience does, so there is no dramatic irony.'],
    };
  }
  const m = rng.pick(IRONIES);
  if (d === 1) {
    return {
      prompt: `${m.lead}\n\n${quoteBlock(m.line)}\n\nWhat does the audience know here that ${m.who} ${m.who.includes(' and ') ? 'do' : 'does'} not?`,
      parts: [part(mc(rng, m.knows, m.wrongKnows))],
      hints: ['Think back over what the audience has seen and heard so far that the characters on stage have not.'],
      solution: [`The audience knows that ${lowerFirst(m.knows)}`, 'That gap between what we know and what the characters believe is dramatic irony.'],
    };
  }
  return {
    prompt: `${m.lead}\n\n${quoteBlock(m.line)}\n\nThe audience knows something here that ${m.who} ${m.who.includes(' and ') ? 'do' : 'does'} not: ${lowerFirst(m.knows)} What is the main effect of this dramatic irony?`,
    parts: [part(mc(rng, m.effect, m.wrongEffects))],
    hints: ['Dramatic irony usually creates tension, suspense or pity: we watch characters act on a mistake that we can see and they cannot.'],
    solution: [m.effect],
  };
}
const lowerFirst = (s: string) => (/^(Romeo|Juliet|Tybalt|Paris|Balthasar|Capulet|Friar)/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));

export const PLAY_IRONY_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-dramatic-devices',
    name: 'Dramatic devices',
    description: 'Recognize soliloquy, aside, monologue, dialogue, comic relief, foreshadowing, puns and stage directions in Romeo and Juliet, and explain their effect.',
    outcomes: ['10-C1'],
    lessonId: L,
    format: 'mc',
    gen: devicesQ,
  }),
  skill({
    id: 'e10-dramatic-irony',
    name: 'Dramatic irony',
    description: 'Explain what the audience knows that a character does not in moments of dramatic irony in Romeo and Juliet, and the effect it has.',
    outcomes: ['10-C1'],
    lessonId: L,
    format: 'mc',
    gen: ironyQ,
  }),
];

