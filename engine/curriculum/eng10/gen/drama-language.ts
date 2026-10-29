/**
 * Grade 10 English, lesson 3.1: Reading Shakespeare's Language (10-C1). The pronouns, verb forms and
 * words of Shakespeare's English, read in lines from Romeo and Juliet (./play.ts), and choosing the
 * best modern paraphrase of a line, against plausible misreadings.
 */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block } from './common.ts';
import * as P from './play.ts';
import { quoteBlock, where, type Passage } from './play.ts';

const L = 'e10-3-1';

/** A passage with the first whole-word use of `word` in bold. */
function bold(p: Passage, word: string): Passage {
  const re = new RegExp(`(^|[^A-Za-z’])(${word})(?![A-Za-z’])`, 'i');
  let done = false;
  return {
    ...p,
    speeches: p.speeches.map((s) => {
      if (done || !re.test(s.text)) return s;
      done = true;
      return { ...s, text: s.text.replace(re, '$1**$2**') };
    }),
  };
}

/** A passage with the first whole-word use of `word` replaced by a gap. */
function gap(p: Passage, word: string): Passage {
  const re = new RegExp(`(^|[^A-Za-z’])${word}(?![A-Za-z’])`, 'i');
  let done = false;
  return {
    ...p,
    speeches: p.speeches.map((s) => {
      if (done || !re.test(s.text)) return s;
      done = true;
      return { ...s, text: s.text.replace(re, '$1\\_\\_\\_\\_\\_') };
    }),
  };
}

// ---------------------------------------------------------------------------- words

interface Word {
  word: string;
  meaning: string;
  /** A plausible misreading, offered first among the wrong choices. */
  misread?: string;
  wrong: string[];
  /** Lines from the play that use the word (bolded in the question). */
  lines: Passage[];
  why: string;
}

/** Pronouns and verb forms (difficulty 1). */
const BASIC: Word[] = [
  { word: 'thou', meaning: 'you (as the subject)', wrong: ['your', 'they', 'though'], lines: [P.DOST_THOU_LOVE_ME, P.MASK_OF_NIGHT, P.OUT_OF_BREATH], why: '“Thou” is the old word for “you” when “you” is the subject of the verb: “thou wilt say” means “you will say”.' },
  { word: 'thee', meaning: 'you (as the object)', wrong: ['your', 'they', 'the'], lines: [P.TAKE_THEE_AT_THY_WORD, P.BOUNDLESS_SEA, P.I_DRINK_TO_THEE], why: '“Thee” is the old word for “you” as an object, after a verb or a preposition: “I take thee” means “I take you”.' },
  { word: 'thy', meaning: 'your', wrong: ['my', 'their', 'you'], lines: [P.WHEREFORE, P.TAKE_THEE_AT_THY_WORD, P.EFFEMINATE], why: '“Thy” is the old word for “your”, used before a noun: “thy father” means “your father”.' },
  { word: 'thine', meaning: 'your', wrong: ['mine', 'their', 'thin'], lines: [P.ALACK_PERIL, P.NIGHTINGALE], why: '“Thine” means “your” before a vowel sound (“thine eye”, “thine ear”), and “yours” on its own.' },
  { word: 'art', meaning: 'are', wrong: ['a painting', 'were', 'is not'], lines: [P.ONLY_THY_NAME, P.OUT_OF_BREATH], why: '“Art” is the form of “are” used with “thou”: “thou art” means “you are”.' },
  { word: 'hast', meaning: 'have', wrong: ['haste', 'hated', 'had not'], lines: [P.WHERE_HAST_THOU_BEEN, P.MASK_OF_NIGHT, P.COMFORTED], why: '“Hast” is the form of “have” used with “thou”: “thou hast heard” means “you have heard”.' },
  { word: 'hath', meaning: 'has', wrong: ['hates', 'had not', 'halts'], lines: [P.EFFEMINATE, P.QUEEN_MAB, P.CAPULET_STRANGER], why: '“Hath” is the old form of “has”: “Thy beauty hath made me effeminate” means “your beauty has made me weak”.' },
  { word: 'doth', meaning: 'does', wrong: ['doubts', 'did not', 'dotes'], lines: [P.ROMEO_TORCHES, P.TOO_RASH], why: '“Doth” is the old form of “does”: “she doth teach” means “she does teach”, or simply “she teaches”.' },
  { word: 'Dost', meaning: 'Do', wrong: ['Must', 'Did not', 'Dust'], lines: [P.DOST_THOU_LOVE_ME, P.ROMEO_LAUGH], why: '“Dost” is the form of “do” used with “thou”: “Dost thou love me?” means “Do you love me?”' },
  { word: 'wilt', meaning: 'will', wrong: ['wilted', 'would not', 'want'], lines: [P.DOST_THOU_LOVE_ME, P.WASH_HIM], why: '“Wilt” is the form of “will” used with “thou”: “thou wilt say” means “you will say”.' },
  { word: 'ne’er', meaning: 'never', wrong: ['near', 'nearly', 'neither'], lines: [P.ROMEO_TRUE_BEAUTY, P.HANG_BEG_STARVE], why: 'The apostrophe shows a missing letter: “ne’er” is “never”, squeezed into one syllable to fit the rhythm.' },
  { word: '’Tis', meaning: 'It is', wrong: ['This is', 'It was', 'There is'], lines: [P.ONLY_THY_NAME], why: 'The apostrophe shows a missing letter: “’tis” is short for “it is”.' },
  { word: 'Ay', meaning: 'Yes', wrong: ['I', 'Always', 'Alas'], lines: [P.SERVANTS_COLLIERS], why: '“Ay” (rhymes with “eye”) means “yes”.' },
  { word: 'nay', meaning: 'no', wrong: ['now', 'nearby', 'yes'], lines: [P.SAY_THEE_NAY], why: '“Nay” means “no”: “say thee nay” means “say no to you”.' },
];

/** Words that are easy to misread (difficulty 2). */
const TRICKY: Word[] = [
  { word: 'wherefore', meaning: 'why', misread: 'where', wrong: ['whether', 'when'], lines: [P.WHEREFORE, P.WHEREFORE_WEEP], why: '“Wherefore” means “why”, not “where”. Juliet is not asking where Romeo is; she is asking why he has to be Romeo, a Montague.' },
  { word: 'ere', meaning: 'before', misread: 'here', wrong: ['ever', 'after'], lines: [P.FRIAR_ERE, P.ERE_THOU_ASK, P.CAPULET_STRANGER], why: '“Ere” means “before”.' },
  { word: 'Anon', meaning: 'Right away; I’m coming', misread: 'Someone unknown', wrong: ['Never', 'Alone'], lines: [P.ANON_GOOD_NURSE, P.NURSE_ANON], why: '“Anon” means “at once” or “in a moment”. Called from offstage, a character answers “Anon!”, meaning “Coming!”' },
  { word: 'Alack', meaning: 'Alas (a cry of sorrow)', misread: 'Attack', wrong: ['Hurrah (a cry of joy)', 'Unless'], lines: [P.ALACK_PERIL, P.ALACK_ALACK], why: '“Alack” is a cry of sorrow or regret, like “alas”.' },
  { word: 'hie', meaning: 'hurry', misread: 'hide', wrong: ['climb high', 'lie down'], lines: [P.HIE_YOU_HENCE], why: '“Hie” means “hurry” or “go quickly”: “hie you hence” means “hurry away from here”.' },
  { word: 'Hie', meaning: 'Hurry', misread: 'Hide', wrong: ['Climb high', 'Lie down'], lines: [P.HIE_HENCE], why: '“Hie” means “hurry” or “go quickly”: Juliet tells Romeo to hurry away before he is caught.' },
  { word: 'Fain', meaning: 'Gladly', misread: 'Faintly', wrong: ['Never', 'Falsely'], lines: [P.FAIN_WOULD_I], why: '“Fain” means “gladly”: “Fain would I dwell on form” means “I would gladly keep to good manners”.' },
  { word: 'fain', meaning: 'gladly', misread: 'faintly', wrong: ['never', 'falsely'], lines: [P.FORGET_IT_FAIN], why: '“Fain” means “gladly”: “I would forget it fain” means “I would gladly forget it”.' },
  { word: 'Marry', meaning: 'Indeed (a mild oath, “by the Virgin Mary”)', misread: 'To get married', wrong: ['Merrily', 'Maybe'], lines: [P.NURSE_MARRY_BACHELOR], why: 'As an exclamation, “marry” is a mild oath, short for “by the Virgin Mary”, meaning something like “indeed” or “why,”.' },
  { word: 'marry', meaning: 'indeed (a mild oath, “by the Virgin Mary”)', misread: 'to get married', wrong: ['merrily', 'maybe'], lines: [P.NURSE_SUSAN], why: 'Here “marry” is a mild oath, short for “by the Virgin Mary”, meaning “indeed”. The Nurse is not talking about a wedding.' },
  { word: 'soft', meaning: 'wait; hush', misread: 'gently', wrong: ['softly lit', 'kind'], lines: [P.BUT_SOFT, P.WHAT_DAY], why: '“Soft” as an exclamation means “wait a moment” or “quiet”: the speaker breaks off to notice or think about something.' },
  { word: 'e’en', meaning: 'even (“Is it really so?”)', misread: 'evening', wrong: ['ever', 'again'], lines: [P.IS_IT_EEN_SO], why: '“E’en” is “even” with a letter left out: “Is it e’en so?” means “Is that really so?”' },
  { word: 'Methinks', meaning: 'It seems to me', misread: 'My thinking is wrong', wrong: ['Remember', 'Do not think'], lines: [P.ILL_DIVINING], why: '“Methinks” means “it seems to me” or “I think”.' },
  { word: 'hence', meaning: 'away from here', misread: 'therefore', wrong: ['home', 'here'], lines: [P.HIE_YOU_HENCE, P.EXILE], why: '“Hence” means “from here”: “exile him hence” means “banish him from here”.' },
  { word: 'hither', meaning: 'here (to this place)', misread: 'over there', wrong: ['hiding', 'later'], lines: [P.HOW_CAMST_THOU], why: '“Hither” means “to here”: “How cam’st thou hither?” means “How did you get here?”' },
  { word: 'coz', meaning: 'cousin (a friendly word for a relative)', misread: 'because', wrong: ['coward', 'sir'], lines: [P.ROMEO_LAUGH], why: '“Coz” is short for “cousin”, a friendly name for a relative. Benvolio is Romeo’s cousin.' },
];

/** -est and -eth verb forms (difficulty 3). */
interface VerbForm {
  /** Sentence with a gap, or a line from the play with `word` gapped. */
  line?: Passage;
  sentence?: string;
  thou: boolean;
  right: string;
  wrong: string[];
  why: string;
}
const FORMS: VerbForm[] = [
  { line: P.MASK_OF_NIGHT, thou: true, right: 'knowest', wrong: ['knoweth', 'know'], why: 'The subject is “thou”, so the verb takes -est: “Thou knowest” means “You know”.' },
  { line: P.SALUTETH, thou: false, right: 'saluteth', wrong: ['salutest', 'salute'], why: 'The subject, “tongue”, is a third-person singular noun, so the verb takes -eth: “saluteth” means “greets”.' },
  { line: P.MAB_DRIVETH, thou: false, right: 'driveth', wrong: ['drivest', 'drive'], why: 'The subject is “she”, so the verb takes -eth: “she driveth” means “she drives”.' },
  { line: P.ONLY_THY_NAME, thou: true, right: 'art', wrong: ['is', 'be'], why: 'With “thou”, the verb “to be” is “art”: “Thou art thyself” means “You are yourself”.' },
  { line: P.COMFORTED, thou: true, right: 'hast', wrong: ['hath', 'have'], why: 'With “thou”, “have” becomes “hast”: “thou hast comforted me” means “you have comforted me”.' },
  { line: P.CAPULET_STRANGER, thou: false, right: 'hath', wrong: ['hast', 'have'], why: 'The subject is “she”, so “have” becomes “hath”: “She hath not seen” means “She has not seen”.' },
  { sentence: 'Thou \\_\\_\\_\\_\\_ too much of the stars and too little of thy friends.', thou: true, right: 'speakest', wrong: ['speaketh', 'speak'], why: 'The subject is “thou”, so the verb takes -est: “Thou speakest” means “You speak”.' },
  { sentence: 'He \\_\\_\\_\\_\\_ the lady more than his own life.', thou: false, right: 'loveth', wrong: ['lovest', 'love'], why: 'The subject is “he”, so the verb takes -eth: “He loveth” means “He loves”.' },
  { sentence: 'What \\_\\_\\_\\_\\_ thou of this match with County Paris?', thou: true, right: 'thinkest', wrong: ['thinketh', 'think'], why: 'The subject is “thou”, so the verb takes -est: “What thinkest thou?” means “What do you think?”' },
  { sentence: 'The Friar \\_\\_\\_\\_\\_ to his cell before the sun is up.', thou: false, right: 'goeth', wrong: ['goest', 'go'], why: 'The subject, “the Friar”, is third-person singular, so the verb takes -eth: “goeth” means “goes”.' },
  { sentence: 'If thou \\_\\_\\_\\_\\_ to Mantua, take this letter with thee.', thou: true, right: 'ridest', wrong: ['rideth', 'ride'], why: 'The subject is “thou”, so the verb takes -est: “If thou ridest” means “If you ride”.' },
  { sentence: 'My heart \\_\\_\\_\\_\\_ me that this night will end in sorrow.', thou: false, right: 'telleth', wrong: ['tellest', 'tell'], why: 'The subject, “my heart”, is third-person singular, so the verb takes -eth: “telleth” means “tells”.' },
  { sentence: '\\_\\_\\_\\_\\_ thou not see the dawn breaking in the east?', thou: true, right: 'Dost', wrong: ['Doth', 'Do'], why: 'With “thou”, “do” becomes “dost”: “Dost thou not see” means “Do you not see”.' },
  { sentence: 'The Nurse \\_\\_\\_\\_\\_ every story twice before she comes to the point.', thou: false, right: 'telleth', wrong: ['tellest', 'tell'], why: 'The subject, “the Nurse”, is third-person singular, so the verb takes -eth: “telleth” means “tells”.' },
];

function wordsQ(rng: Rng, d: Difficulty) {
  if (d === 3) {
    const f = rng.pick(FORMS);
    const shown = f.line ? quoteBlock(gap(f.line, f.right)) : block(f.sentence!);
    return {
      prompt: `After *thou*, Shakespeare’s verbs end in **-est** or **-st** (knowest, hast, dost), and “are” becomes **art**. After *he*, *she*, *it* or a singular noun, they end in **-eth** (knoweth, hath, doth). Which verb form completes this line?\n\n${shown}`,
      parts: [part(mc(rng, f.right, f.wrong))],
      hints: ['Find the subject of the verb. Is it “thou”, or is it he, she, it or a singular noun?', '“Thou” takes -est (knowest, speakest); he, she or it takes -eth (knoweth, speaketh).'],
      solution: [f.why],
      answerDisplay: f.right,
    };
  }
  const w = rng.pick(d === 1 ? BASIC : TRICKY);
  const line = rng.pick(w.lines);
  const wrong = w.misread ? [w.misread, ...rng.shuffle(w.wrong)] : rng.shuffle(w.wrong);
  return {
    prompt: `${line.act === 0 ? 'From the Prologue' : `From ${where(line)}`}:\n\n${quoteBlock(bold(line, w.word))}\n\nWhat does **${w.word}** mean here?`,
    parts: [part(mc(rng, w.meaning, wrong))],
    hints: [d === 1 ? 'Try putting a modern word in its place and reading the line aloud. Which one makes sense?' : 'Many of Shakespeare’s words look like modern ones but mean something different. Read the whole line and ask which meaning makes sense.'],
    solution: [w.why],
  };
}

// ---------------------------------------------------------------------------- paraphrase

interface Para {
  lead: string;
  /** The question, when it is not simply the best paraphrase of the whole passage. */
  ask?: string;
  line: Passage;
  right: string;
  /** Plausible misreadings, each clearly wrong for these lines. */
  wrong: string[];
  why: string;
  level: Difficulty;
}
const PARAS: Para[] = [
  { level: 1, lead: 'Romeo has just killed Tybalt, and knows the Prince will punish him.', line: P.FORTUNES_FOOL, right: 'Fate is making a fool of me!', wrong: ['I am a lucky fool!', 'I have been foolish with my money.', 'Fortune favours fools like me.'], why: '“Fortune” is fate or luck, and a “fool” is someone it plays with: Romeo feels like the plaything of fate.' },
  { level: 1, lead: 'Juliet, at her window, thinks about Romeo’s family name.', line: P.WHATS_IN_A_NAME, right: 'A name does not matter: a rose would smell just as sweet if it were called something else.', wrong: ['If we changed its name, a rose would lose its sweet smell.', 'Roses smell sweeter than any other flower.', 'Every name has a hidden meaning, like a rose.'], why: 'Juliet means that a name is only a label: a rose would be just as sweet by another name, and Romeo would be just as dear without the name Montague.' },
  { level: 1, lead: 'Romeo is in a hurry to be married. Friar Lawrence answers:', ask: 'Which is the best modern paraphrase of Friar Lawrence’s reply?', line: P.STUMBLE, right: 'Go wisely and slowly; people who rush trip and fall.', wrong: ['Be wise and quick, or you will fall behind.', 'Only slow runners stumble.', 'Wise people never run anywhere.'], why: '“They stumble that run fast” means “those who run fast stumble”: the Friar is warning Romeo against haste.' },
  { level: 1, lead: 'Romeo, in Mantua, has just been told that Juliet is dead.', line: P.DEFY_STARS, right: 'Is it really true? Then I challenge fate itself!', wrong: ['Is it evening already? I can see the stars.', 'Is it true? Then I accept what the stars have planned.', 'Then I will wait for a sign from the stars.'], why: '“Is it even so?” means “Is it really so?”, and to “defy” the stars is to challenge or refuse the fate they are thought to control.' },
  { level: 1, lead: 'The Nurse brings Juliet news from Romeo.', line: P.HIE_YOU_HENCE, right: 'Then hurry to Friar Lawrence’s room; a husband is waiting there to marry you.', wrong: ['Then hide in Friar Lawrence’s prison cell, where your husband is locked up.', 'Then send Friar Lawrence here; a husband will stay with you.', 'Then leave Friar Lawrence’s room; your husband stays there tonight.'], why: '“Hie you hence” means “hurry from here”; a friar’s “cell” is his small room, not a prison; “stays” here means “waits”.' },
  { level: 1, lead: 'Juliet says good night to Romeo on the balcony.', line: P.SWEET_SORROW, right: 'Saying goodbye is so sad and yet so sweet that I could keep saying good night until morning.', wrong: ['I am sorry to leave, so I will come back tomorrow morning.', 'Saying good night makes me so sad that I never want to see you again.', 'Tomorrow morning will be sweeter than tonight.'], why: '“Parting” is saying goodbye; it is a “sweet sorrow” because it is sad and also a sign of love, so she could say good night until the “morrow” (morning).' },
  { level: 2, lead: 'Juliet, at her window, believes she is alone.', line: P.WHEREFORE, right: 'Romeo, why do you have to be Romeo, a Montague? Reject your father and your name, or, if you won’t, just swear you love me, and I’ll stop being a Capulet.', wrong: ['Romeo, where are you? Come out from where you are hiding and tell me your name.', 'Romeo, why do you hate your father? Swear you love me, and I will tell my family.', 'Romeo, your father has refused to let you marry me, so I will stop loving you.'], why: '“Wherefore” means “why”, not “where”: Juliet is wishing that Romeo were not a Montague. “Deny” means “reject”.' },
  { level: 2, lead: 'Juliet, at her window, thinks about Romeo’s family.', line: P.ONLY_THY_NAME, right: 'Only your name is my enemy; you would still be yourself even if you were not a Montague.', wrong: ['Your name is my enemy, so you must be my enemy too.', 'You are not really a Montague, so you cannot be my enemy.', 'My enemy has the same name as you, but he is not you.'], why: '“’Tis but thy name” means “it is only your name”; “though not a Montague” means “even if you were not a Montague”.' },
  { level: 2, lead: 'The Prince stops the fight in the first scene.', line: P.PRINCE_FORFEIT, right: 'If you ever fight in the streets again, you will pay for breaking the peace with your lives.', wrong: ['If you disturb the streets again, you must pay a fine to keep the peace.', 'If you ever leave the city again, you will lose your lives.', 'If you keep the peace, you will win back your lives.'], why: 'To “pay the forfeit” is to pay the penalty: the Prince is threatening death, not a fine.' },
  { level: 2, lead: 'Juliet has just learned that the young man she danced with is Romeo, a Montague.', line: P.JULIET_ONLY_LOVE, right: 'The only man I love comes from the only family I hate! I saw him too early, before I knew who he was, and found out too late.', wrong: ['My love for Romeo has turned into hatred.', 'I hated Romeo when I first saw him, but now I love him.', 'I knew who he was all along, but I fell in love too quickly.'], why: '“Sprung from” means “born from”: her love comes from the family she was raised to hate. “Too early seen unknown” means she saw him before she knew his name.' },
  { level: 2, lead: 'Romeo refuses to fight Tybalt, who has just called him a villain.', line: P.NEVER_INJURED, right: 'I swear I have never harmed you; I love you more than you can imagine, until you find out why.', wrong: ['I protest that you have injured me, and I will make you pay for it.', 'I never loved you, but I will not fight you until I know the reason.', 'I swear you will be injured if you do not tell me the reason.'], why: '“Protest” here means “declare” or “swear”; “devise” means “imagine”. Romeo cannot say that he has married Juliet, Tybalt’s cousin.' },
  { level: 2, lead: 'Romeo, after Mercutio is wounded, thinks of Juliet.', line: P.EFFEMINATE, right: 'Juliet, your beauty has made me soft, and weakened my courage.', wrong: ['Juliet, your beauty has made me as brave and strong as steel.', 'Juliet, my bad temper has made me cruel to you.', 'Juliet, your beauty is as hard and cold as steel.'], why: '“Effeminate” here means weak or soft, and “soften’d valour’s steel” means his courage, which should be as hard as steel, has gone soft.' },
  { level: 2, lead: 'Juliet is deciding what to do after the Nurse advises her to marry Paris.', line: P.POWER_TO_DIE, right: 'I’ll go to the Friar to see how he can help. If nothing else works, I still have the power to end my own life.', wrong: ['I’ll ask the Friar for medicine, because I feel ill.', 'If the Friar cannot help, he will die.', 'The Friar has the power to stop me from dying.'], why: 'A “remedy” is a solution to her problem; “myself have power to die” means she can kill herself if all else fails.' },
  { level: 3, lead: 'Friar Lawrence is surprised that Romeo has fallen for Juliet so soon after Rosaline.', line: P.YOUNG_MENS_LOVE, right: 'What a change! Have you dropped Rosaline, whom you loved so much, so quickly? Young men love with their eyes, not truly with their hearts.', wrong: ['What a change! Young men tell lies about love with their eyes.', 'What a change! Young men hide their true love deep in their hearts.', 'What a change! Rosaline has left you, because young men’s eyes show their true feelings.'], why: '“Lies” here means “is found” (“lies in”), not “tells lies”: the Friar says young men’s love is based on looks.' },
  { level: 3, lead: 'Friar Lawrence speaks just before he marries Romeo and Juliet.', line: P.VIOLENT_DELIGHTS, right: 'Joys this intense come to violent ends, dying at their height, like fire meeting gunpowder, which destroy each other as they touch.', wrong: ['Violent people enjoy fighting until they win.', 'Fire and gunpowder should be kept apart in a church.', 'Joy that comes slowly always ends in violence.'], why: '“Delights” are joys; “in their triumph die” means they die at their peak. The image of fire and gunpowder (“powder”) shows two things destroying each other as they meet.' },
  { level: 3, lead: 'Juliet speaks to Romeo in the dark, knowing he heard what she said at her window.', line: P.MASK_OF_NIGHT, right: 'You know that darkness hides my face; otherwise you would see me blushing over what you heard me say tonight.', wrong: ['I am wearing a mask tonight, so you cannot know who I am.', 'I painted my cheeks for tonight’s feast, as a young lady should.', 'You heard me tonight, so you know that I am never shy.'], why: 'The “mask of night” is the darkness, not a real mask; “bepaint my cheek” means “colour my cheek” with a blush.' },
  { level: 3, lead: 'At the feast, Juliet asks the Nurse to find out who the young man is.', line: P.JULIET_GRAVE, right: 'Go and find out his name. If he is already married, I will probably die unmarried.', wrong: ['If he is married, I will marry him in a graveyard.', 'Ask his name; if he is married, his wife will be in danger.', 'Ask whether he wants to be married near my family’s grave.'], why: '“Like to be” means “likely to be”: if he is married, her grave will be her only wedding bed. The line also hints at the play’s ending.' },
  { level: 3, lead: 'Capulet is furious that Juliet will not marry Paris.', line: P.HANG_BEG_STARVE, right: 'If you are my daughter, I’ll give you to my friend; if you are not, you can hang, beg, starve and die in the streets, for I will never treat you as mine again.', wrong: ['You and I both belong to my friend, so we must hang, beg and starve together.', 'If you obey me, I will send my friend away and you can live in the streets.', 'If you marry Paris, you will end up begging in the streets.'], why: '“And” here means “if”, as it often does in Shakespeare: “And you be mine” means “If you are my daughter”. “Acknowledge” means “recognize as mine”.' },
  { level: 3, lead: 'Romeo starts to swear his love, and Juliet stops him:', line: P.TOO_RASH, right: 'This is too hasty, too thoughtless and too sudden, like lightning, which is gone before anyone can say, “It’s lightning.”', wrong: ['The storm is too dangerous; you must go inside before the lightning strikes.', 'Our love is as bright and lasting as lightning.', 'You spoke too suddenly, before I could say anything at all.'], why: '“Rash” and “unadvis’d” both mean hasty and unthinking; Juliet worries that their love, like lightning, may be over as soon as it starts.' },
];

function paraphraseQ(rng: Rng, d: Difficulty) {
  const p = rng.pick(PARAS.filter((x) => x.level === d));
  return {
    prompt: `${p.lead}\n\n${quoteBlock(p.line)}\n\n${p.ask ?? 'Which is the best modern paraphrase?'}`,
    parts: [part(mc(rng, p.right, p.wrong))],
    hints: [d === 1 ? 'Put each old word into modern English first, then read the line again.' : 'Watch for words that look modern but mean something else (“wherefore”, “lies”, “and” meaning “if”), and check who is speaking and why.'],
    solution: [p.why, `So the best paraphrase is: ${p.right}`],
  };
}

/** The number of syllables check (in lesson 3.1, blank verse): which line is prose and which verse. */
const VERSE_OR_PROSE: Array<{ line: Passage; verse: boolean; why: string }> = [
  { line: P.GRAVE_MAN, verse: false, why: 'Mercutio’s joking lines run on like ordinary speech, with no fixed line length or rhythm: they are prose.' },
  { line: P.BUT_SOFT, verse: true, why: 'Each line has ten syllables in a da-DUM rhythm (“But SOFT, what LIGHT through YONder WINdow BREAKS?”): this is blank verse.' },
  { line: P.FORGET_TO_THINK, verse: true, why: 'Each line has ten syllables with a regular da-DUM beat: the cousins speak in blank verse.' },
  { line: P.SERVANTS_COLLIERS, verse: false, why: 'The servants’ quick jokes have no regular rhythm or line length: they are prose, as servants’ talk usually is in Shakespeare.' },
  { line: P.STUMBLE, verse: true, why: 'Both lines have ten syllables in a regular da-DUM rhythm: this is blank verse.' },
  { line: P.THUMB, verse: false, why: 'The short, quarrelsome exchange has no regular rhythm: it is prose.' },
];

/** Difficulty 3 also asks whether a passage is verse or prose. */
function paraphraseOrForm(rng: Rng, d: Difficulty) {
  if (d === 3 && rng.chance(0.25)) {
    const v = rng.pick(VERSE_OR_PROSE);
    return {
      prompt: `${v.line.act === 0 ? 'From the Prologue' : `From ${where(v.line)}`}:\n\n${quoteBlock(v.line)}\n\nIs this passage written in **blank verse** or in **prose**?`,
      parts: [part(fixedChoice(['Blank verse: lines of about ten syllables with a regular da-DUM rhythm, not rhyming', 'Prose: ordinary sentences with no fixed rhythm or line length'], v.verse ? 0 : 1))],
      hints: ['Count the syllables in a line and listen for a regular da-DUM beat. Blank verse has about ten syllables a line; prose runs on like ordinary speech.'],
      solution: [v.why],
    };
  }
  return paraphraseQ(rng, d);
}

export const PLAY_LANGUAGE_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-shakespeare-words',
    name: 'Shakespeare’s words',
    description: 'Read the pronouns, verb forms and words of Shakespeare’s English (thou and thee, art and hast, wherefore, ere, anon, hie …) in lines from Romeo and Juliet.',
    outcomes: ['10-C1'],
    lessonId: L,
    format: 'mc',
    gen: wordsQ,
  }),
  skill({
    id: 'e10-paraphrase',
    name: 'Paraphrasing Shakespeare',
    description: 'Choose the best modern paraphrase of lines from Romeo and Juliet, avoiding common misreadings, and tell blank verse from prose.',
    outcomes: ['10-C1'],
    lessonId: L,
    format: 'mc',
    gen: paraphraseOrForm,
  }),
];
