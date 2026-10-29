/**
 * Grade 11 English, lesson 3.2: Ambition and Character (11-C1). Who is who in Macbeth, who says
 * what, when the main events happen, and why the characters act as they do, with evidence from
 * their own lines (./macbeth.ts).
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, SkillDef } from '../../../types.ts';
import * as M from './macbeth.ts';
import { inline, quoteAnon, quoteBlock, where, type Passage } from './macbeth.ts';

const L = 'e11-3-2';

// ---------------------------------------------------------------------------- who is who

const WHO: Array<{ name: string; is: string }> = [
  { name: 'Macbeth', is: 'Thane of Glamis, a brave general who murders King Duncan and seizes the crown' },
  { name: 'Lady Macbeth', is: 'Macbeth’s wife, who urges him to kill Duncan and later walks in her sleep, trying to wash blood from her hands' },
  { name: 'Banquo', is: 'a general who fights beside Macbeth, and whom the witches tell that his descendants will be kings' },
  { name: 'Duncan', is: 'the King of Scotland, murdered in his sleep while a guest in Macbeth’s castle' },
  { name: 'Malcolm', is: 'Duncan’s elder son, named Prince of Cumberland, who flees to England and returns with an army' },
  { name: 'Donalbain', is: 'Duncan’s younger son, who flees to Ireland after his father’s murder' },
  { name: 'Macduff', is: 'the Thane of Fife, who discovers Duncan’s body, flees to England, and at last kills Macbeth' },
  { name: 'Lady Macduff', is: 'Macduff’s wife, left behind in Fife when he flees, and attacked with her children by Macbeth’s murderers' },
  { name: 'Fleance', is: 'Banquo’s son, who escapes when the murderers kill his father' },
  { name: 'Ross', is: 'a Scottish nobleman who brings Macduff the news that his wife and children have been killed' },
  { name: 'the Porter', is: 'the drunken gatekeeper of Macbeth’s castle, who pretends he is the porter of hell gate' },
  { name: 'Hecate', is: 'the goddess of witchcraft, who scolds the witches for dealing with Macbeth without her' },
  { name: 'Siward', is: 'the English general who leads ten thousand soldiers against Macbeth, and whose son Macbeth kills' },
  { name: 'Seyton', is: 'Macbeth’s attendant, who tells him that the Queen is dead' },
];

/** Lines that only one character could say, for "Who says this?". */
const SAYS: Array<{ line: Passage; lead: string; why: string }> = [
  { line: M.RAVEN, lead: 'Alone, after a messenger brings word that the King is coming tonight:', why: 'Lady Macbeth calls on spirits to “unsex” her and fill her with cruelty, so that she can help kill Duncan.' },
  { line: M.INSTRUMENTS_OF_DARKNESS, lead: 'On the heath, warning a fellow general about the witches’ promises:', why: 'Banquo warns that the “instruments of darkness” tell small truths in order to betray us in what matters most.' },
  { line: M.NO_ART, lead: 'Hearing how the traitor Thane of Cawdor died:', why: 'Duncan admits he trusted the traitor completely, just before he greets Macbeth, the next man who will betray him.' },
  { line: M.PORTER_BONFIRE, lead: 'At the castle gate, the morning after a night of drinking:', why: 'The drunken Porter pretends to be the gatekeeper of hell, letting in sinners on “the primrose way” to its fire.' },
  { line: M.O_HORROR, lead: 'Coming out of the King’s bedchamber at dawn:', why: 'Macduff has gone to wake the King and found him murdered.' },
  { line: M.DONALBAIN_IRELAND, lead: 'Just after hearing that his father has been murdered:', why: 'Donalbain, Duncan’s younger son, decides to flee to Ireland while his brother goes to England.' },
  { line: M.LENNOX_IRONY, lead: 'Speaking privately to another lord about recent deaths at court:', why: 'Lennox mocks Macbeth’s version of events: he pretends to accept it while showing he does not believe a word.' },
  { line: M.LADY_MACDUFF_WREN, lead: 'Learning that her husband has fled to England without her:', why: 'Lady Macduff, left behind in Fife with her children, says even a tiny wren fights to protect its young.' },
  { line: M.GIVE_SORROW_WORDS, lead: 'Comforting a man who has just heard terrible news from home:', why: 'Malcolm urges Macduff to speak his grief aloud, after Ross tells him his family has been killed.' },
  { line: M.MORE_NEEDS_DIVINE, lead: 'After watching a woman walk and talk in her sleep:', why: 'The doctor sees that Lady Macbeth’s sickness comes from guilt, and that she needs a priest more than a doctor.' },
  { line: M.HE_HAS_KILLD_ME, lead: 'As murderers break into a castle in Fife:', why: 'Macduff’s young son is stabbed by Macbeth’s murderers and tells his mother to run.' },
  { line: M.FLY_FLEANCE, lead: 'Attacked in the dark, on the way back to a feast:', why: 'Banquo, attacked by Macbeth’s murderers, tells his son to escape.' },
  { line: M.NAUGHTS_HAD, lead: 'Alone, soon after becoming queen:', why: 'Lady Macbeth admits that they have gained the crown but none of the happiness it was meant to bring.' },
  { line: M.TO_BE_THUS, lead: 'Alone, newly crowned, waiting for two men he has sent for:', why: 'Macbeth fears Banquo: being king is nothing unless he is safely king.' },
  { line: M.USURPERS_HEAD, lead: 'Returning from the battlefield with a grim trophy:', why: 'Macduff has killed Macbeth, and hails Malcolm as King.' },
  { line: M.ALAS_POOR_COUNTRY, lead: 'Arriving in England with news of Scotland under its new king:', why: 'Ross describes Scotland under Macbeth as a grave rather than a mother.' },
];
const SPEAKERS = ['Macbeth', 'Lady Macbeth', 'Banquo', 'Duncan', 'Malcolm', 'Donalbain', 'Macduff', 'Lady Macduff', 'Ross', 'Lennox', 'Porter', 'Doctor', 'Son'];
const SPEAKER_NAME: Record<string, string> = { Porter: 'The Porter', Doctor: 'The Doctor', Son: 'Macduff’s young son' };
const named = (s: string) => SPEAKER_NAME[s] ?? s;

/** The main events, with their acts, in the order they happen. */
const EVENTS: Array<{ act: number; what: string }> = [
  { act: 1, what: 'Three witches meet in thunder and lightning and plan to meet Macbeth on the heath.' },
  { act: 1, what: 'The witches hail Macbeth as Thane of Glamis, Thane of Cawdor and king hereafter.' },
  { act: 1, what: 'Duncan names his son Malcolm Prince of Cumberland, the heir to the throne.' },
  { act: 1, what: 'Lady Macbeth reads her husband’s letter about the witches and calls on spirits to fill her with cruelty.' },
  { act: 1, what: 'Macbeth decides not to kill Duncan, but his wife talks him back into it.' },
  { act: 2, what: 'On his way to Duncan’s room, Macbeth sees a dagger floating in the air before him.' },
  { act: 2, what: 'Macbeth murders Duncan, and Lady Macbeth smears the sleeping grooms with blood.' },
  { act: 2, what: 'A drunken porter pretends to be the gatekeeper of hell.' },
  { act: 2, what: 'Macduff discovers Duncan’s body, and Duncan’s sons flee to England and Ireland.' },
  { act: 3, what: 'Macbeth hires murderers to kill Banquo and his son Fleance.' },
  { act: 3, what: 'Banquo is murdered, but Fleance escapes.' },
  { act: 3, what: 'Banquo’s ghost appears at Macbeth’s banquet, and only Macbeth can see it.' },
  { act: 4, what: 'The witches show Macbeth three apparitions and a line of eight kings.' },
  { act: 4, what: 'Macbeth’s murderers attack Macduff’s castle and kill his young son.' },
  { act: 4, what: 'In England, Malcolm tests Macduff’s loyalty by pretending to be worse than Macbeth.' },
  { act: 4, what: 'Ross tells Macduff that his wife and children have been killed.' },
  { act: 5, what: 'A doctor and a gentlewoman watch Lady Macbeth walk in her sleep, rubbing her hands.' },
  { act: 5, what: 'Malcolm’s soldiers cut branches from Birnam Wood to hide how many they are.' },
  { act: 5, what: 'Macbeth hears that the Queen is dead and speaks of life as “a tale / Told by an idiot”.' },
  { act: 5, what: 'Macduff reveals that he was “untimely ripp’d” from his mother’s womb, and kills Macbeth.' },
];
const ACT_SUMMARY: Record<number, string> = {
  1: 'Act 1 brings the witches’ prophecies, Macbeth’s new title and Lady Macbeth’s plan.',
  2: 'Act 2 is the night of the murder and the morning it is discovered.',
  3: 'Act 3 shows Macbeth as king, killing Banquo, and the banquet where Banquo’s ghost appears.',
  4: 'Act 4 holds the apparitions, the murder of Macduff’s family, and Malcolm and Macduff in England.',
  5: 'Act 5 brings the sleepwalking, the march on Dunsinane, the Queen’s death and Macbeth’s fall.',
};

function charactersQ(rng: Rng, d: Difficulty) {
  if (d === 1) {
    const [w, ...others] = rng.sample(WHO, 4);
    return {
      prompt: `In *Macbeth*, who is **${w.name}**?`,
      parts: [part(mc(rng, capFirst(w.is), others.map((o) => capFirst(o.is))))],
      hints: ['Think of the King and his sons, the Macbeths, Banquo and his son, Macduff and his family, and the people who carry news and messages.'],
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
      hints: ['Ask what the speaker knows, what they want, and where they are. Which character fits?'],
      solution: [`${named(who)} says these lines, in ${where(s.line)}.`, s.why],
    };
  }
  if (rng.chance(0.5)) {
    const e = rng.pick(EVENTS);
    return {
      prompt: `In which act of *Macbeth* does this happen?\n\n${e.what}`,
      parts: [part(fixedChoice(['Act 1', 'Act 2', 'Act 3', 'Act 4', 'Act 5'], e.act - 1))],
      hints: ['Act 1: the prophecies and the plan. Act 2: the murder of Duncan. Act 3: Banquo and the banquet. Act 4: the apparitions and Macduff’s family. Act 5: the sleepwalking and the battle.'],
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
    prompt: 'Put these events from *Macbeth* in the order they happen in the play.',
    parts: [part(answer)],
    hints: ['Place each event in its act first: the prophecies (Act 1), Duncan’s murder (Act 2), Banquo (Act 3), the apparitions and Macduff’s family (Act 4), the fall of Macbeth (Act 5).'],
    solution: picks.map((k, i) => `${i + 1}. ${EVENTS[k].what} (Act ${EVENTS[k].act})`),
  };
}

/** `n` events in play order, one from each of `n` different acts. */
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
  { ep: 'duncan', level: 1, lead: 'Duncan has just named his son Malcolm Prince of Cumberland, heir to the throne. Macbeth says:', ask: 'Why does Macbeth begin to think seriously about murder at this moment?', evidence: M.STARS_HIDE, right: 'Malcolm now stands between him and the crown the witches promised him.', wrong: ['Duncan has just insulted him in front of the other thanes by refusing him any reward.', 'Duncan has refused to make him Thane of Cawdor, and given the title to Malcolm instead.', 'Banquo has secretly urged him to kill the King before Malcolm can be crowned.'], why: '“That is a step / On which I must fall down, or else o’erleap”: Malcolm is an obstacle Macbeth must get past to become king.' },
  { ep: 'lady', level: 1, lead: 'Lady Macbeth hears that Duncan is coming to her castle tonight:', ask: 'Why does Lady Macbeth call on the spirits to “unsex” her?', evidence: M.RAVEN, right: 'She wants to be filled with cruelty, so that no pity or remorse stops her from helping to kill Duncan.', wrong: ['She wants to be turned into a man, so that she can be crowned king of Scotland herself.', 'She is afraid of the witches, and wants the spirits to protect her from their curses tonight.', 'She wants the spirits to fill her husband with kindness, so that he will spare the King.'], why: 'She asks to be filled “from the crown to the toe, top-full / Of direst cruelty”: she wants nothing gentle left in her to get in the way of the murder.' },
  { ep: 'banquo', level: 1, lead: 'Newly crowned, Macbeth thinks about the witches’ promise to Banquo:', ask: 'Why does Macbeth have Banquo murdered?', evidence: M.FRUITLESS_CROWN, right: 'The witches promised the crown to Banquo’s heirs, so Macbeth fears he has killed Duncan only to make Banquo’s sons kings.', wrong: ['Banquo has accused Macbeth of Duncan’s murder in front of the whole court, and demanded that he give up the crown.', 'Banquo has refused to come to Macbeth’s feast, and Macbeth cannot bear to be insulted by a man he once called friend.', 'Lady Macbeth has ordered him to kill Banquo, because she fears that Banquo saw her smear the grooms with blood.'], why: 'His crown is “fruitless” and his sceptre “barren”: he has no heir, and the throne will pass to Banquo’s line unless he acts.' },
  { ep: 'macduff', level: 1, lead: 'A Scottish lord tells Lennox where Macduff has gone:', ask: 'Why has Macduff gone to England?', evidence: M.LORD_MACDUFF, right: 'To ask the English king to help raise an army against Macbeth.', wrong: ['To escape being charged with Duncan’s murder by Macbeth.', 'To find his wife and children, who have already fled there.', 'To ask Malcolm to forgive Macbeth and return home in peace.'], why: 'Macduff has gone to ask the “holy king”, Edward of England, to rouse Northumberland and Siward to fight. His family is still in Fife.' },
  { ep: 'fight', level: 1, lead: 'On the battlefield, Macduff searches for Macbeth:', ask: 'Why is Macduff determined to fight Macbeth himself?', evidence: M.GHOSTS_HAUNT, right: 'He must avenge the murder of his wife and children with his own sword.', wrong: ['He wants to win the crown of Scotland for himself instead of Malcolm.', 'He hopes to make peace with Macbeth before any more men are killed.', 'Malcolm has ordered him to capture Macbeth alive and bring him to trial.'], why: 'If anyone else kills Macbeth, “My wife and children’s ghosts will haunt me still”: the revenge must be his own.' },
  { ep: 'sleepwalk', level: 1, lead: 'Sleepwalking, Lady Macbeth rubs her hands:', ask: 'Why does Lady Macbeth walk in her sleep, trying to wash her hands?', evidence: M.PERFUMES_OF_ARABIA, right: 'Her guilt over the murders torments her, though she once said that a little water would clear them of it.', wrong: ['She has a fever of the body, which the doctor can easily cure with rest and the right medicine.', 'She is rehearsing a speech that she must give to the court, and washing is part of the ceremony.', 'She wants to look beautiful for the banquet, and is washing her hands to make them soft and white.'], why: 'She smells “the blood still”, and “all the perfumes of Arabia” cannot sweeten her hand: guilt she once dismissed now overwhelms her mind.' },
  { ep: 'duncan', level: 2, lead: 'Macbeth tells his wife he has changed his mind about the murder:', ask: 'Why does Macbeth decide, at first, not to kill Duncan?', evidence: M.PROCEED_NO_FURTHER, right: 'Duncan has just honoured him, and he wants to enjoy the good opinion he has won rather than throw it away.', wrong: ['He is afraid that the witches will punish him if he acts before the time they have chosen.', 'He has learned that Banquo knows his plan, and he fears that Banquo will warn the King and the guards before morning.', 'Lady Macbeth has told him to wait for a better night, when the King has fewer guards.'], why: 'He has “bought / Golden opinions from all sorts of people”, which should be worn “in their newest gloss, / Not cast aside so soon”.' },
  { ep: 'lady', level: 2, lead: 'Macbeth says he dares do all that becomes a man. Lady Macbeth answers:', ask: 'Why does Lady Macbeth question her husband’s manhood?', evidence: M.THEN_YOU_WERE_A_MAN, right: 'She wants to shame him into keeping his promise to kill Duncan.', wrong: ['She thinks he was a coward in the battle, and wants him to admit it.', 'She wants him to be a gentler father to the children they will have.', 'She is angry that he has told Banquo all about their plan.'], why: 'She says he was a man when he dared to plan the murder, and would be “so much more the man” if he carried it out: she attacks his pride to make him act.' },
  { ep: 'banquo', level: 2, lead: 'Alone, Banquo thinks about the witches’ prophecies:', ask: 'Why does Banquo keep his suspicions about Macbeth to himself?', evidence: M.BANQUO_HOPE, right: 'He hopes that the witches’ promise to him, that his descendants will be kings, may come true as well.', wrong: ['He has forgotten what the witches said, and no longer connects them with Duncan’s death.', 'He believes Macbeth is completely innocent, since the grooms were found with the daggers.', 'Macbeth has paid him to keep quiet with lands taken from the dead Thane of Cawdor.'], why: 'If the witches told Macbeth the truth, “May they not be my oracles as well, / And set me up in hope?” He has his own hopes to protect.' },
  { ep: 'macduff', level: 2, lead: 'In England, Malcolm explains himself to Macduff:', ask: 'Why has Malcolm pretended to be a wicked man, unfit to rule?', evidence: M.MALCOLM_TEST, right: 'To test whether Macduff is truly loyal to Scotland or a spy sent by Macbeth.', wrong: ['He truly believes he would be a worse king than Macbeth, and wants to stay in England.', 'He wants Macduff to be king instead of him, and is testing whether Macduff will accept.', 'He hopes Macduff will go back to Scotland alone and fight Macbeth without him.'], why: 'Macbeth has often tried to “win me / Into his power” with such tricks; Macduff’s grief for Scotland proves his honesty.' },
  { ep: 'banquo', level: 2, lead: 'Macbeth gives the murderers their orders:', ask: 'Why does Macbeth order the murderers to kill Fleance as well as Banquo?', evidence: M.FLEANCE_TOO, right: 'The witches said Banquo’s descendants would be kings, so Banquo’s son must die too if Macbeth is to keep the crown.', wrong: ['Fleance has threatened to tell Malcolm what he saw on the night of Duncan’s murder, so Macbeth must silence him first.', 'Fleance insulted Macbeth at the coronation, and Macbeth will not let an insult go unpunished.', 'Lady Macbeth fears that Fleance will one day marry Malcolm’s sister and join the rebels.'], why: 'Fleance’s “absence is no less material” to Macbeth than his father’s: the line of kings the witches promised Banquo begins with him.' },
  { ep: 'duncan', level: 3, lead: 'Alone, before the murder, Macbeth ends a long argument with himself:', ask: 'In this soliloquy, what does Macbeth admit is his only reason for killing Duncan?', evidence: M.VAULTING_AMBITION, right: 'His own ambition: he has no other “spur”, and he knows it may make him fall.', wrong: ['Duncan has been a cruel and unjust king, and Scotland will be better off without him.', 'His wife has threatened to leave him if he does not kill the King tonight.', 'The witches have ordered him to kill Duncan, and he dares not disobey them.'], why: 'He has “no spur … but only / Vaulting ambition”. Earlier in the same speech he praises Duncan’s virtues, and the witches never told him to kill anyone.' },
  { ep: 'grooms', level: 3, lead: 'In Act 3, Lennox speaks ironically about Macbeth killing Duncan’s two grooms:', ask: 'What does Lennox suggest was Macbeth’s real reason for killing the grooms?', evidence: M.NOBLY_DONE, right: 'To silence them, so that they could never deny the murder.', wrong: ['To punish them for falling asleep while on guard duty.', 'To protect Malcolm and Donalbain from the grooms’ attack.', 'He truly believed that they had killed Duncan in his bed.'], why: 'Lennox praises the killing as “wisely” done, “For ’twould have anger’d any heart alive, / To hear the men deny’t”: dead men cannot deny the crime.' },
  { ep: 'fife', level: 3, lead: 'Lennox has just told Macbeth that Macduff has fled to England:', ask: 'Why does Macbeth have Macduff’s wife and children killed?', evidence: M.SURPRISE_FIFE, right: 'Macduff has escaped beyond his reach, so Macbeth strikes at once at the family he left behind.', wrong: ['Lady Macduff insulted him at the banquet, and he wants revenge on her and her family.', 'The witches told him that Macduff’s son, not Banquo’s, would be the next king of Scotland.', 'He believes Macduff’s family helped Fleance escape on the night that Banquo was murdered.'], why: 'Macbeth will act without delay (“From this moment / The very firstlings of my heart shall be / The firstlings of my hand”), and Macduff himself is gone.' },
  { ep: 'end', level: 3, lead: 'Macbeth has learned that Macduff was “untimely ripp’d” from his mother’s womb:', ask: 'Why does Macbeth fight on, knowing that the prophecy no longer protects him?', evidence: M.LAY_ON, right: 'He refuses to surrender and be mocked before Malcolm and the crowd, so he chooses to fight to the death.', wrong: ['He still believes that no man born of woman can harm him, because Birnam Wood has not really moved.', 'He hopes that Macduff will be merciful and spare his life once the fight is won.', 'He wants to protect Lady Macbeth, who is still hiding inside the castle walls.'], why: 'He will not “kiss the ground before young Malcolm’s feet” or be “baited with the rabble’s curse”: “Yet I will try the last.” His wife is already dead.' },
  { ep: 'sons', level: 3, lead: 'After their father’s murder, Malcolm speaks to his brother:', ask: 'Why do Malcolm and Donalbain decide to flee?', evidence: M.UNFELT_SORROW, right: 'They fear the murderer is among those pretending to grieve, and that they will be killed next.', wrong: ['They are guilty of the murder, and they want to escape before the grooms can accuse them.', 'Macbeth has ordered them to leave Scotland and never return while he is king.', 'They want to fetch soldiers from England to arrest the grooms who killed their father.'], why: 'Malcolm sees that false men show “an unfelt sorrow” easily; Donalbain adds that “There’s daggers in men’s smiles”. Their flight makes others suspect them.' },
];

function motiveQ(rng: Rng, d: Difficulty) {
  if (d === 3 && rng.chance(0.4)) {
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
    hints: ['A motive is the reason behind an action. Use the quoted lines as evidence, and rule out any choice that the character could not know or that the play does not show.'],
    solution: [m.why],
  };
}

export const MACBETH_CHARACTER_SKILLS: SkillDef[] = [
  skill({
    id: 'e11-macbeth-characters',
    name: 'The characters and events of Macbeth',
    description: 'Identify the characters of Macbeth, who says what, and when the main events of the play happen.',
    outcomes: ['11-C1'],
    lessonId: L,
    format: 'mc',
    gen: charactersQ,
  }),
  skill({
    id: 'e11-macbeth-motive',
    name: 'Ambition and motive',
    description: 'Explain why Macbeth, Lady Macbeth, Banquo, Macduff and others act as they do, and choose the lines that show it.',
    outcomes: ['11-C1'],
    lessonId: L,
    format: 'mc',
    gen: motiveQ,
  }),
];
