/**
 * Grade 10 English, lesson 3.2: Character and Motive (10-C1). Who is who in Romeo and Juliet, who
 * says what, when the main events happen, and why the characters act as they do, with evidence from
 * their own lines (./play.ts).
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, SkillDef } from '../../../types.ts';
import * as P from './play.ts';
import { inline, quoteAnon, quoteBlock, where, type Passage } from './play.ts';

const L = 'e10-3-2';

// ---------------------------------------------------------------------------- who is who

const WHO: Array<{ name: string; is: string }> = [
  { name: 'Romeo', is: 'Montague’s son, who falls in love with Juliet at the Capulets’ feast' },
  { name: 'Juliet', is: 'Capulet’s daughter, not yet fourteen, who secretly marries Romeo' },
  { name: 'the Nurse', is: 'the woman who has looked after Juliet since she was a baby, and who carries messages between Juliet and Romeo' },
  { name: 'Friar Lawrence', is: 'a Franciscan friar who secretly marries Romeo and Juliet, and later gives Juliet a sleeping potion' },
  { name: 'Mercutio', is: 'Romeo’s witty friend, a kinsman of the Prince, who belongs to neither family' },
  { name: 'Tybalt', is: 'Juliet’s hot-tempered cousin, Lady Capulet’s nephew, who hates all Montagues' },
  { name: 'Benvolio', is: 'Montague’s nephew and Romeo’s cousin, who tries to keep the peace' },
  { name: 'Paris', is: 'a young nobleman, a kinsman of the Prince, whom Capulet chooses as Juliet’s husband' },
  { name: 'Prince Escalus', is: 'the ruler of Verona, who orders the two families to stop fighting' },
  { name: 'Balthasar', is: 'Romeo’s servant, who brings him the news in Mantua that Juliet is dead' },
  { name: 'Lady Capulet', is: 'Juliet’s mother, who wants Romeo put to death for killing Tybalt' },
  { name: 'Rosaline', is: 'the young woman Romeo is lovesick for at the start of the play, before he meets Juliet' },
];

/** Lines that only one character could say, for "Who says this?". */
const SAYS: Array<{ line: Passage; lead: string; why: string }> = [
  { line: P.BENVOLIO_PEACE, lead: 'As the servants fight in the street:', why: 'Benvolio is the peacemaker: he beats down the servants’ swords and asks Tybalt to help part them.' },
  { line: P.TYBALT_HATE, lead: 'As the servants fight in the street:', why: 'Tybalt, the hot-headed Capulet, hates peace, “all Montagues” and Benvolio, and attacks him.' },
  { line: P.PRINCE_FORFEIT, lead: 'After the fight in the street:', why: 'Only the ruler of Verona, the Prince, can threaten the families with death for fighting again.' },
  { line: P.CAPULET_STRANGER, lead: 'Talking to Paris about his daughter:', why: 'Capulet, Juliet’s father, tells Paris that Juliet is too young to marry yet.' },
  { line: P.QUEEN_MAB, lead: 'On the way to the Capulets’ feast, making fun of Romeo’s talk of dreams:', why: 'Mercutio, Romeo’s witty friend, spins the fanciful speech about Queen Mab, the fairy who brings dreams.' },
  { line: P.WHEREFORE, lead: 'At a window, at night, believing she is alone:', why: 'Juliet wishes that Romeo were not a Montague, and offers to give up her own name, Capulet.' },
  { line: P.BUT_SOFT, lead: 'In the Capulets’ garden, at night:', why: 'Romeo, hidden in the garden, compares Juliet at her window to the sun.' },
  { line: P.YOUNG_MENS_LOVE, lead: 'Early in the morning, on hearing of a new love:', why: 'Friar Lawrence teases Romeo for forgetting Rosaline so quickly.' },
  { line: P.PLAGUE, lead: 'After a sword fight in the street:', why: 'Mercutio, wounded by Tybalt, curses both families for the feud that has killed him.' },
  { line: P.ROMEO_MUST_NOT_LIVE, lead: 'Before the Prince, after a deadly fight:', why: 'Lady Capulet demands Romeo’s death, because Romeo has killed her nephew, Tybalt.' },
  { line: P.NURSE_THE_COUNTY, lead: 'Giving advice to Juliet after Capulet storms out:', why: 'The Nurse, who once carried Romeo’s messages, now advises Juliet to marry Paris (“the County”).' },
  { line: P.HANG_BEG_STARVE, lead: 'In a rage at a daughter who will not obey:', why: 'Capulet threatens to throw Juliet out if she will not marry Paris.' },
  { line: P.TAKE_THIS_VIAL, lead: 'Explaining a desperate plan:', why: 'Friar Lawrence gives Juliet the sleeping potion and tells her when to drink it.' },
  { line: P.SHE_IS_WELL, lead: 'In Mantua, bringing news from Verona:', why: 'Balthasar, Romeo’s servant, tells him that Juliet lies in the Capulet tomb.' },
  { line: P.PARIS_FLOWERS, lead: 'At night, in a churchyard, scattering flowers:', why: 'Paris, who was to marry Juliet, mourns at her tomb.' },
];
const SPEAKERS = ['Romeo', 'Juliet', 'Nurse', 'Friar Lawrence', 'Mercutio', 'Tybalt', 'Benvolio', 'Capulet', 'Lady Capulet', 'Paris', 'Prince', 'Balthasar'];
const SPEAKER_NAME: Record<string, string> = { Prince: 'The Prince', Nurse: 'The Nurse' };
const named = (s: string) => SPEAKER_NAME[s] ?? s;

/** The main events, with their acts, in the order they happen. */
const EVENTS: Array<{ act: number; what: string }> = [
  { act: 1, what: 'Servants of the two houses start a street fight, and the Prince threatens death to anyone who fights again.' },
  { act: 1, what: 'Capulet tells Paris that Juliet is too young to marry yet, but invites him to a feast.' },
  { act: 1, what: 'Tybalt recognizes Romeo’s voice at the Capulets’ feast and wants to fight him, but Capulet stops him.' },
  { act: 1, what: 'Romeo and Juliet meet and kiss at the Capulets’ feast, then learn each other’s family names.' },
  { act: 2, what: 'Romeo overhears Juliet at her window, and they promise to marry.' },
  { act: 2, what: 'Friar Lawrence agrees to marry Romeo and Juliet, hoping to end the feud.' },
  { act: 2, what: 'Romeo and Juliet meet at Friar Lawrence’s cell to be married.' },
  { act: 3, what: 'Tybalt kills Mercutio, and Romeo kills Tybalt.' },
  { act: 3, what: 'The Prince banishes Romeo from Verona.' },
  { act: 3, what: 'Capulet arranges for Juliet to marry Paris on Thursday.' },
  { act: 3, what: 'Romeo and Juliet part at dawn, and Capulet threatens to throw Juliet out if she will not marry Paris.' },
  { act: 4, what: 'Friar Lawrence gives Juliet a potion that will make her seem dead.' },
  { act: 4, what: 'Juliet pretends to agree to marry Paris, and Capulet moves the wedding forward a day.' },
  { act: 4, what: 'The Nurse finds Juliet, apparently dead, on her wedding morning.' },
  { act: 5, what: 'In Mantua, Balthasar tells Romeo that Juliet is dead, and Romeo buys poison.' },
  { act: 5, what: 'Friar John explains that he could not deliver Friar Lawrence’s letter to Romeo.' },
  { act: 5, what: 'Romeo kills Paris at the Capulet tomb and drinks the poison.' },
  { act: 5, what: 'Juliet wakes, finds Romeo dead, and stabs herself with his dagger.' },
];

function charactersQ(rng: Rng, d: Difficulty) {
  if (d === 1) {
    const [w, ...others] = rng.sample(WHO, 4);
    return {
      prompt: `In *Romeo and Juliet*, who is **${w.name}**?`,
      parts: [part(mc(rng, capFirst(w.is), others.map((o) => capFirst(o.is))))],
      hints: ['Think of the two families first: the Montagues (Romeo’s) and the Capulets (Juliet’s). Then think of the characters outside them: friends, servants, the Friar and the Prince.'],
      solution: [`${capFirst(w.name)} is ${w.is}.`],
    };
  }
  if (d === 2) {
    const s = rng.pick(SAYS);
    const who = s.line.speeches[0].speaker;
    const wrong = rng.sample(SPEAKERS.filter((x) => x !== who), 3);
    return {
      prompt: `${s.lead}\n\n${quoteAnon(s.line)}\n\nWho says these lines?`,
      parts: [part(mc(rng, named(who), wrong.map(named)))],
      hints: ['Ask what the speaker wants, whom they are talking to, and what they know. Which character fits?'],
      solution: [`${named(who)} says these lines, in ${where(s.line)}.`, s.why],
    };
  }
  // Difficulty 3: the act of an event, or four events in order.
  if (rng.chance(0.5)) {
    const e = rng.pick(EVENTS);
    return {
      prompt: `In which act of *Romeo and Juliet* does this happen?\n\n${e.what}`,
      parts: [part(fixedChoice(['Act 1', 'Act 2', 'Act 3', 'Act 4', 'Act 5'], e.act - 1))],
      hints: ['Act 1: the feud and the feast. Act 2: the balcony and the wedding. Act 3: the deadly fights and the banishment. Act 4: the potion. Act 5: Mantua and the tomb.'],
      solution: [`This happens in Act ${e.act}.`, ACT_SUMMARY[e.act]],
    };
  }
  const picks = pickInOrder(rng, 4);
  const ids = 'abcd';
  const shown = notInOrder(rng, picks);
  const items: Choice[] = shown.map((k, i) => ({ id: ids[i], md: EVENTS[k].what }));
  const correctOrder = picks.map((k) => items[shown.indexOf(k)].id);
  const answer: AnswerSpec = { kind: 'order', items, correctOrder, ends: ['First', 'Last'] };
  return {
    prompt: 'Put these events from *Romeo and Juliet* in the order they happen in the play.',
    parts: [part(answer)],
    hints: ['Place each event in its act first: the feast (Act 1), the wedding (Act 2), the fights (Act 3), the potion (Act 4), the tomb (Act 5).'],
    solution: picks.map((k, i) => `${i + 1}. ${EVENTS[k].what} (Act ${EVENTS[k].act})`),
  };
}

const ACT_SUMMARY: Record<number, string> = {
  1: 'Act 1 sets up the feud, Capulet’s plan for Paris, and the feast where Romeo and Juliet meet.',
  2: 'Act 2 holds the balcony scene, Friar Lawrence’s agreement and the secret wedding.',
  3: 'Act 3 turns the play: Mercutio and Tybalt die, Romeo is banished, and Capulet forces the match with Paris.',
  4: 'Act 4 is the Friar’s plan: the potion, Juliet’s pretended obedience and her apparent death.',
  5: 'Act 5 moves to Mantua and the tomb, where the plan goes wrong and the lovers die.',
};

/** `n` events in play order, one from each of `n` different acts, so the order follows the play's shape. */
function pickInOrder(rng: Rng, n: number): number[] {
  const acts = rng.sample([1, 2, 3, 4, 5], n).sort((a, b) => a - b);
  return acts.map((a) => rng.pick(EVENTS.map((_, i) => i).filter((i) => EVENTS[i].act === a)));
}
function notInOrder(rng: Rng, ks: number[]): number[] {
  for (;;) {
    const s = rng.shuffle(ks);
    if (s.some((k, i) => k !== ks[i])) return s;
  }
}
const capFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------- motive

interface Motive {
  level: Difficulty;
  /** Motives from the same episode are never offered against each other. */
  ep: string;
  lead: string;
  ask: string;
  evidence: Passage;
  right: string;
  wrong: string[];
  why: string;
}
const MOTIVES: Motive[] = [
  { ep: 'wedding', level: 1, lead: 'Romeo asks Friar Lawrence to marry him to Juliet that same day. The Friar answers:', ask: 'Why does Friar Lawrence agree to marry Romeo and Juliet?', evidence: P.FRIAR_ALLIANCE, right: 'He hopes the marriage will turn the two families’ hatred into love.', wrong: ['He believes Romeo has loved Juliet faithfully for many years.', 'Capulet has asked him to find a suitable husband for Juliet.', 'He has been paid by the Montagues to arrange the match quickly.'], why: 'The Friar says the “alliance” (the marriage) may “turn your households’ rancour to pure love”: he hopes it will end the feud.' },
  { ep: 'duel', level: 1, lead: 'Mercutio has just been killed. Tybalt returns, and Romeo says:', ask: 'Why does Romeo fight Tybalt after Mercutio dies?', evidence: P.TAKE_THE_VILLAIN_BACK, right: 'He wants revenge for Mercutio’s death.', wrong: ['He wants to stop Tybalt from marrying Juliet.', 'The Prince has ordered him to arrest Tybalt.', 'Tybalt has threatened to harm Juliet.'], why: 'Romeo throws Tybalt’s insult back at him and says Mercutio’s soul is waiting for Tybalt’s to “keep him company”: he wants Tybalt dead for killing his friend.' },
  { ep: 'duel', level: 1, lead: 'At the start of Act 3, Benvolio speaks to Mercutio in the street:', ask: 'Why does Benvolio want to leave the street?', evidence: P.MAD_BLOOD, right: 'He fears that if they meet the Capulets in the heat, a fight will break out.', wrong: ['He is tired after the long night at the feast and wants to go home to bed.', 'He has arranged to meet Juliet in secret and needs an excuse to leave.', 'He wants Mercutio to fight Tybalt somewhere the Prince will not see.'], why: 'Benvolio says the day is hot, the Capulets are about, and if they meet, they “shall not scape a brawl”.' },
  { ep: 'potion', level: 1, lead: 'Juliet begs Friar Lawrence for help rather than marry Paris:', ask: 'Why is Juliet ready to take the Friar’s potion?', evidence: P.UNSTAINED_WIFE, right: 'She will risk anything to avoid marrying Paris and stay faithful to Romeo.', wrong: ['She wants to die because she believes Romeo has stopped loving her.', 'Her mother has told her to take it to calm her nerves before the wedding.', 'She wants to frighten the Nurse into helping her escape to Mantua.'], why: 'She will do it “without fear or doubt” to stay “an unstain’d wife” to Romeo: being faithful matters more to her than her own safety.' },
  { ep: 'mantua', level: 1, lead: 'In Mantua, Balthasar has just told Romeo that Juliet lies dead in the Capulet tomb. Romeo answers:', ask: 'Why does Romeo buy poison in Mantua?', evidence: P.DEFY_STARS, right: 'He believes Juliet is dead and means to die beside her.', wrong: ['He plans to poison Paris, whom he blames for Juliet’s death.', 'He hopes the poison will wake Juliet from her deep sleep.', 'Friar Lawrence’s letter has told him to buy it in Mantua.'], why: 'Romeo believes the news and defies the stars, which seem to rule his fate (“I defy you, stars!”), and he plans to die with Juliet. He never receives the Friar’s letter.' },
  { ep: 'feast', level: 1, lead: 'At the feast, Tybalt wants to fight Romeo. Capulet stops him:', ask: 'Why does Capulet stop Tybalt from fighting Romeo at the feast?', evidence: P.CAPULET_WEALTH, right: 'He will allow no trouble at his own feast, and Romeo has a good name in Verona.', wrong: ['He has seen that Romeo is falling in love with Juliet and wants them to meet.', 'He invited Romeo as a special guest to show the Montagues his goodwill.', 'He is afraid of the Montagues and does not want to anger their family.'], why: 'Capulet says Verona thinks Romeo “virtuous and well-govern’d” and that he would not, “for the wealth of all the town”, insult him in his own house.' },
  { ep: 'feast', level: 2, lead: 'At the feast, Tybalt has just been stopped from attacking Romeo. As he leaves, he says:', ask: 'Why does Tybalt challenge Romeo to a fight in Act 3?', evidence: P.TYBALT_GALL, right: 'He is still furious that Romeo came uninvited to the Capulets’ feast.', wrong: ['He has found out that Romeo has secretly married his cousin Juliet.', 'Romeo insulted him in front of everyone during the street fight in Act 1.', 'Capulet has ordered him to punish Romeo for coming to the feast.'], why: 'Tybalt swears that Romeo’s “intrusion” at the feast will turn to “bitter gall”, and he sends Romeo a challenge. He never learns of the marriage, and Capulet ordered him to leave Romeo alone.' },
  { ep: 'duel', level: 2, lead: 'Tybalt has just called Romeo a villain. Romeo, back from his secret wedding, answers:', ask: 'Why does Romeo refuse to fight Tybalt?', evidence: P.REASON_TO_LOVE, right: 'He has just married Juliet, so Tybalt is now his kinsman.', wrong: ['He is afraid of Tybalt’s great skill with a sword.', 'He does not recognize Tybalt in the crowded street.', 'He would rather let Mercutio fight Tybalt in his place.'], why: 'Romeo’s “reason” to love Tybalt is his marriage to Tybalt’s cousin Juliet, which he cannot reveal.' },
  { ep: 'duel', level: 2, lead: 'Romeo will not answer Tybalt’s insult. Mercutio cries:', ask: 'Why does Mercutio draw his sword on Tybalt?', evidence: P.VILE_SUBMISSION, right: 'He is disgusted that Romeo will not answer the insult, so he fights for Romeo’s honour himself.', wrong: ['He is a Capulet himself, and he is defending his own family against the Montagues.', 'He knows that Romeo has married Juliet, and he wants to stop the marriage by force.', 'Tybalt has insulted Mercutio’s own family, and Mercutio must answer the insult himself.'], why: 'Mercutio calls Romeo’s calm reply a “dishonourable, vile submission” and takes up the fight himself. He is a kinsman of the Prince, not a Capulet.' },
  { ep: 'paris', level: 2, lead: 'Paris explains to Friar Lawrence why the wedding is so soon:', ask: 'Why has Capulet decided that Juliet will marry Paris so quickly?', evidence: P.HASTES_OUR_MARRIAGE, right: 'He thinks Juliet is weeping too much for Tybalt, and a wedding will end her grief.', wrong: ['He has found out that Juliet loves Romeo and wants her married before she can run off.', 'Paris has threatened to leave Verona and marry someone else if he must wait.', 'He wants to punish Juliet for refusing Paris by making her marry at once.'], why: 'Capulet believes Juliet’s tears are for Tybalt and hopes marriage will “stop the inundation of her tears”. He decides this before Juliet refuses Paris.' },
  { ep: 'paris', level: 2, lead: 'After Capulet storms out, Juliet asks the Nurse for comfort. The Nurse says:', ask: 'Why does the Nurse advise Juliet to marry Paris?', evidence: P.NURSE_BANISHED, right: 'She thinks Romeo is gone for good, so marrying Paris is Juliet’s safest choice.', wrong: ['She has always disliked Romeo, and has never once helped him or carried his messages.', 'Capulet has secretly paid her to talk Juliet into agreeing to the wedding.', 'She wants Juliet to agree for now, then run away to Romeo in Mantua.'], why: 'The Nurse bets “all the world to nothing” that Romeo will never dare come back, so she thinks Juliet should make the safe match.' },
  { ep: 'tomb', level: 2, lead: 'At the tomb, Paris sees Romeo forcing open the door:', ask: 'Why does Paris try to arrest Romeo at the tomb?', evidence: P.VILLAINOUS_SHAME, right: 'He thinks Romeo, Tybalt’s banished killer, has come to do something shameful to the bodies.', wrong: ['He knows that Romeo is Juliet’s husband, and he is jealous of him even after her death.', 'He wants to rob the tomb of its treasures himself, and Romeo has got there first.', 'The Prince has ordered him to guard the Capulet tomb against anyone who comes at night.'], why: 'Paris sees “that banish’d haughty Montague” and believes he has come “to do some villainous shame / To the dead bodies”. He never learns of the marriage.' },
  { ep: 'duel', level: 2, lead: 'Before the Prince, after Tybalt’s death, Lady Capulet says:', ask: 'Why does Lady Capulet demand Romeo’s death?', evidence: P.ROMEO_MUST_NOT_LIVE, right: 'She wants revenge for the death of her nephew Tybalt.', wrong: ['She knows that Romeo has married her daughter.', 'She believes Romeo killed Mercutio.', 'The Prince has asked for her advice on the law.'], why: 'She says plainly: “Romeo slew Tybalt, Romeo must not live.” She knows nothing of the marriage.' },
  { ep: 'potion', level: 3, lead: 'Juliet has drawn a knife and threatened to kill herself rather than marry Paris. The Friar answers:', ask: 'Why does Friar Lawrence give Juliet the sleeping potion?', evidence: P.STRENGTH_TO_SLAY, right: 'Juliet threatens to kill herself, and a death-like sleep is his only way to save her from Paris.', wrong: ['He secretly wants Juliet to die, so that no one ever finds out that he married her to Romeo.', 'Capulet has asked him to give Juliet something to calm her nerves before the wedding.', 'He hopes that Paris will lose interest in Juliet if she seems to be seriously ill.'], why: 'The Friar reasons that if she is brave enough to kill herself, she will dare “a thing like death” instead. Juliet fears he might want her dead, but the play shows his plan is meant to save her.' },
  { ep: 'potion', level: 3, lead: 'Juliet returns from Friar Lawrence’s cell and kneels to her father:', ask: 'Why does Juliet tell her father that she will obey him?', evidence: P.EVER_RULD, right: 'She is following the Friar’s plan, so that no one suspects what she means to do.', wrong: ['She has decided, after all, that she would rather marry Paris than lose her family.', 'The Nurse has persuaded her that Romeo is dead and that she should marry Paris.', 'She hopes her father will be so pleased that he will send Paris away again.'], why: 'The Friar told her to “go home, be merry, give consent / To marry Paris”: her obedience is an act, so the plan can go ahead.' },
  { ep: 'paris', level: 3, lead: 'Juliet has refused to marry Paris. Capulet tells her:', ask: 'Why is Capulet so angry with Juliet?', evidence: P.HANG_BEG_STARVE, right: 'She refuses the husband he has chosen for her, and he sees it as disobedience.', wrong: ['He has learned that she secretly married Romeo, the son of his enemy.', 'She has openly asked him to let her marry Romeo instead of Paris.', 'Paris has told him that Juliet was rude to him at Friar Lawrence’s cell.'], why: 'Capulet treats the match as his to give (“I’ll give you to my friend”); he never learns of the marriage to Romeo.' },
  { ep: 'feast', level: 3, lead: 'Romeo is miserable about Rosaline. Benvolio tells him:', ask: 'Why does Romeo agree to go to the Capulets’ feast?', evidence: P.BENVOLIO_ROSALINE, right: 'Rosaline, the woman he is lovesick for, will be there.', wrong: ['He hopes to meet Juliet, whom he has loved for months.', 'He wants to start a fight with Tybalt.', 'Capulet has invited all the Montagues to make peace.'], why: 'Benvolio says Rosaline will be at the feast. Romeo goes to see her, and meets Juliet instead.' },
];

function motiveQ(rng: Rng, d: Difficulty) {
  if (d === 3 && rng.chance(0.4)) {
    // Which line best shows the motive?
    const m = rng.pick(MOTIVES);
    const others = rng.sample(MOTIVES.filter((x) => x.ep !== m.ep), 3).map((x) => inline(x.evidence));
    return {
      prompt: `${m.ask} A student answers: “${m.right}” Which line from the play best supports this answer?`,
      parts: [part(mc(rng, inline(m.evidence), others))],
      hints: ['Look for the line that gives the reason itself, in the character’s own words or in the words of someone who knows.'],
      solution: [`${inline(m.evidence)} (${where(m.evidence)})`, m.why],
    };
  }
  const m = rng.pick(MOTIVES.filter((x) => x.level === d || (d === 3 && x.level === 2)));
  return {
    prompt: `${m.lead}\n\n${quoteBlock(m.evidence)}\n\n${m.ask}`,
    parts: [part(mc(rng, m.right, m.wrong))],
    hints: ['A motive is the reason behind an action. Use the quoted lines as evidence, and rule out any choice that the character could not know or would not want.'],
    solution: [m.why],
  };
}

export const PLAY_CHARACTER_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-play-characters',
    name: 'The characters and events of Romeo and Juliet',
    description: 'Identify the characters of Romeo and Juliet, who says what, and when the main events of the play happen.',
    outcomes: ['10-C1'],
    lessonId: L,
    format: 'mc',
    gen: charactersQ,
  }),
  skill({
    id: 'e10-play-motive',
    name: 'Character and motive',
    description: 'Explain why characters in Romeo and Juliet act as they do, and choose the lines that show it.',
    outcomes: ['10-C1'],
    lessonId: L,
    format: 'mc',
    gen: motiveQ,
  }),
];
