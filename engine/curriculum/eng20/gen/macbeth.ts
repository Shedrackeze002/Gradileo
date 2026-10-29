/**
 * Excerpts from Shakespeare's Macbeth, quoted exactly from Project Gutenberg's edition (eBook
 * #1533), with each speaker and the act and scene. Verse keeps its line breaks; prose is one line.
 * Stage directions are in square brackets. The play was first printed in 1623, so it is in the
 * public domain everywhere.
 */

export const MAC = { author: 'William Shakespeare', title: 'Macbeth', url: 'https://www.gutenberg.org/ebooks/1533' };

export interface Speech {
  speaker: string;
  /** Verse lines separated by "\n". */
  text: string;
}

export interface Passage {
  act: number;
  scene: number;
  speeches: Speech[];
}

/** One speaker's lines. */
const S = (speaker: string, act: number, scene: number, text: string): Passage => ({ act, scene, speeches: [{ speaker, text }] });
/** An exchange between speakers. */
const D = (act: number, scene: number, ...speeches: Array<[string, string]>): Passage => ({ act, scene, speeches: speeches.map(([speaker, text]) => ({ speaker, text })) });

/** "Act 2, Scene 2". */
export const where = (p: Passage) => `Act ${p.act}, Scene ${p.scene}`;
/** The speaker of a one-speaker passage. */
export const speaker = (p: Passage) => p.speeches[0].speaker;

/** A passage as a Markdown blockquote, verse lines kept, with its attribution. */
export function quoteBlock(p: Passage): string {
  const verse = (text: string) => text.split('\n').map((l, i, all) => `> ${l}${i < all.length - 1 ? '\\' : ''}`);
  if (p.speeches.length === 1) {
    return [...verse(p.speeches[0].text), '>', `> — ${p.speeches[0].speaker}, *${MAC.title}*, ${where(p)}`].join('\n');
  }
  const out: string[] = [];
  p.speeches.forEach((s, i) => {
    if (i) out.push('>');
    const v = verse(s.text);
    v[0] = `> **${s.speaker}.** ${v[0].slice(2)}`;
    out.push(...v);
  });
  return [...out, '>', `> — *${MAC.title}*, ${where(p)}`].join('\n');
}

/** A passage as a blockquote without its speaker's name (for “Who says this?”). */
export function quoteAnon(p: Passage): string {
  const lines = p.speeches.map((s) => s.text).join('\n').split('\n');
  return [...lines.map((l, i) => `> ${l}${i < lines.length - 1 ? '\\' : ''}`), '>', `> — *${MAC.title}*, ${where(p)}`].join('\n');
}

/** A passage on one line, in quotation marks, with " / " between verse lines (for answer choices); quotation marks inside it become single. */
export const inline = (p: Passage) => `“${p.speeches.map((s) => s.text.split('\n').join(' / ')).join(' … ').replace(/“/g, '‘').replace(/”/g, '’')}”`;

// ---------------------------------------------------------------- Act 1
export const FAIR_IS_FOUL = S('The Witches', 1, 1, 'Fair is foul, and foul is fair:\nHover through the fog and filthy air.');
export const BRAVE_MACBETH = S('Captain', 1, 2, 'For brave Macbeth (well he deserves that name),\nDisdaining Fortune, with his brandish’d steel,\nWhich smok’d with bloody execution,\nLike Valour’s minion, carv’d out his passage,\nTill he fac’d the slave;');
export const UNSEAMED = S('Captain', 1, 2, 'Which ne’er shook hands, nor bade farewell to him,\nTill he unseam’d him from the nave to the chops,\nAnd fix’d his head upon our battlements.');
export const VALIANT_COUSIN = S('Duncan', 1, 2, 'O valiant cousin! worthy gentleman!');
export const CAWDOR_DEATH = S('Duncan', 1, 2, 'No more that Thane of Cawdor shall deceive\nOur bosom interest. Go pronounce his present death,\nAnd with his former title greet Macbeth.');
export const LOST_WON = S('Duncan', 1, 2, 'What he hath lost, noble Macbeth hath won.');
export const SO_FOUL = S('Macbeth', 1, 3, 'So foul and fair a day I have not seen.');
export const ALL_HAIL = D(1, 3,
  ['First Witch', 'All hail, Macbeth! hail to thee, Thane of Glamis!'],
  ['Second Witch', 'All hail, Macbeth! hail to thee, Thane of Cawdor!'],
  ['Third Witch', 'All hail, Macbeth! that shalt be king hereafter!'],
);
export const WHY_START = S('Banquo', 1, 3, 'Good sir, why do you start and seem to fear\nThings that do sound so fair?');
export const BANQUO_PROPHECY = D(1, 3,
  ['First Witch', 'Lesser than Macbeth, and greater.'],
  ['Second Witch', 'Not so happy, yet much happier.'],
  ['Third Witch', 'Thou shalt get kings, though thou be none:\nSo all hail, Macbeth and Banquo!'],
);
export const BORROWED_ROBES = S('Macbeth', 1, 3, 'The Thane of Cawdor lives: why do you dress me\nIn borrow’d robes?');
export const DEVIL_SPEAK_TRUE = S('Banquo', 1, 3, 'What, can the devil speak true?');
export const INSTRUMENTS_OF_DARKNESS = S('Banquo', 1, 3, 'And oftentimes to win us to our harm,\nThe instruments of darkness tell us truths;\nWin us with honest trifles, to betray’s\nIn deepest consequence.');
export const SUPERNATURAL_SOLICITING = S('Macbeth', 1, 3, '[*Aside.*] This supernatural soliciting\nCannot be ill; cannot be good. If ill,\nWhy hath it given me earnest of success,\nCommencing in a truth? I am Thane of Cawdor:\nIf good, why do I yield to that suggestion\nWhose horrid image doth unfix my hair,\nAnd make my seated heart knock at my ribs,\nAgainst the use of nature?');
export const PRESENT_FEARS = S('Macbeth', 1, 3, 'Present fears\nAre less than horrible imaginings.\nMy thought, whose murder yet is but fantastical,\nShakes so my single state of man\nThat function is smother’d in surmise,\nAnd nothing is but what is not.');
export const CHANCE_CROWN = S('Macbeth', 1, 3, '[*Aside.*] If chance will have me king, why, chance may crown me\nWithout my stir.');
export const STRANGE_GARMENTS = S('Banquo', 1, 3, 'New honours come upon him,\nLike our strange garments, cleave not to their mould\nBut with the aid of use.');
export const NO_ART = S('Duncan', 1, 4, 'There’s no art\nTo find the mind’s construction in the face:\nHe was a gentleman on whom I built\nAn absolute trust.');
export const CAWDOR_LEAVING = S('Malcolm', 1, 4, 'Nothing in his life\nBecame him like the leaving it;');
export const PLANT_THEE = S('Duncan', 1, 4, 'I have begun to plant thee, and will labour\nTo make thee full of growing.');
export const STARS_HIDE = S('Macbeth', 1, 4, '[*Aside.*] The Prince of Cumberland!—That is a step\nOn which I must fall down, or else o’erleap,\nFor in my way it lies. Stars, hide your fires!\nLet not light see my black and deep desires.');
export const MILK_OF_KINDNESS = S('Lady Macbeth', 1, 5, 'Yet do I fear thy nature;\nIt is too full o’ th’ milk of human kindness\nTo catch the nearest way. Thou wouldst be great;\nArt not without ambition, but without\nThe illness should attend it.');
export const RAVEN = S('Lady Macbeth', 1, 5, 'The raven himself is hoarse\nThat croaks the fatal entrance of Duncan\nUnder my battlements. Come, you spirits\nThat tend on mortal thoughts, unsex me here,\nAnd fill me, from the crown to the toe, top-full\nOf direst cruelty!');
export const THICK_NIGHT = S('Lady Macbeth', 1, 5, 'Come, thick night,\nAnd pall thee in the dunnest smoke of hell\nThat my keen knife see not the wound it makes,\nNor heaven peep through the blanket of the dark\nTo cry, “Hold, hold!”');
export const NEVER_SHALL_SUN = D(1, 5,
  ['Macbeth', 'My dearest love,\nDuncan comes here tonight.'],
  ['Lady Macbeth', 'And when goes hence?'],
  ['Macbeth', 'Tomorrow, as he purposes.'],
  ['Lady Macbeth', 'O, never\nShall sun that morrow see!'],
);
export const INNOCENT_FLOWER = S('Lady Macbeth', 1, 5, 'Your face, my thane, is as a book where men\nMay read strange matters. To beguile the time,\nLook like the time; bear welcome in your eye,\nYour hand, your tongue: look like the innocent flower,\nBut be the serpent under’t.');
export const LEAVE_ALL_TO_ME = S('Lady Macbeth', 1, 5, 'Only look up clear;\nTo alter favour ever is to fear.\nLeave all the rest to me.');
export const PLEASANT_SEAT = S('Duncan', 1, 6, 'This castle hath a pleasant seat. The air\nNimbly and sweetly recommends itself\nUnto our gentle senses.');
export const ASSASSINATION = S('Macbeth', 1, 7, 'If it were done when ’tis done, then ’twere well\nIt were done quickly. If th’ assassination\nCould trammel up the consequence, and catch\nWith his surcease success;');
export const DOUBLE_TRUST = S('Macbeth', 1, 7, 'He’s here in double trust:\nFirst, as I am his kinsman and his subject,\nStrong both against the deed; then, as his host,\nWho should against his murderer shut the door,\nNot bear the knife myself.');
export const PITY_BABE = S('Macbeth', 1, 7, 'And pity, like a naked new-born babe,\nStriding the blast, or heaven’s cherubin, hors’d\nUpon the sightless couriers of the air,\nShall blow the horrid deed in every eye,\nThat tears shall drown the wind.');
export const VAULTING_AMBITION = S('Macbeth', 1, 7, 'I have no spur\nTo prick the sides of my intent, but only\nVaulting ambition, which o’erleaps itself\nAnd falls on th’ other—');
export const PROCEED_NO_FURTHER = S('Macbeth', 1, 7, 'We will proceed no further in this business:\nHe hath honour’d me of late; and I have bought\nGolden opinions from all sorts of people,\nWhich would be worn now in their newest gloss,\nNot cast aside so soon.');
export const HOPE_DRUNK = S('Lady Macbeth', 1, 7, 'Was the hope drunk\nWherein you dress’d yourself? Hath it slept since?\nAnd wakes it now, to look so green and pale\nAt what it did so freely?');
export const DARE_DO_ALL = S('Macbeth', 1, 7, 'I dare do all that may become a man;\nWho dares do more is none.');
export const THEN_YOU_WERE_A_MAN = S('Lady Macbeth', 1, 7, 'When you durst do it, then you were a man;\nAnd, to be more than what you were, you would\nBe so much more the man.');
export const IF_WE_FAIL = D(1, 7, ['Macbeth', 'If we should fail?'], ['Lady Macbeth', 'We fail?\nBut screw your courage to the sticking-place,\nAnd we’ll not fail.']);
export const FALSE_FACE = S('Macbeth', 1, 7, 'Away, and mock the time with fairest show:\nFalse face must hide what the false heart doth know.');

// ---------------------------------------------------------------- Act 2
export const CANDLES_OUT = S('Banquo', 2, 1, 'There’s husbandry in heaven;\nTheir candles are all out.');
export const CURSED_THOUGHTS = S('Banquo', 2, 1, 'A heavy summons lies like lead upon me,\nAnd yet I would not sleep. Merciful powers,\nRestrain in me the cursed thoughts that nature\nGives way to in repose!');
export const DREAMT_SISTERS = D(2, 1, ['Banquo', 'I dreamt last night of the three Weird Sisters:\nTo you they have show’d some truth.'], ['Macbeth', 'I think not of them:']);
export const ALLEGIANCE_CLEAR = S('Banquo', 2, 1, 'So I lose none\nIn seeking to augment it, but still keep\nMy bosom franchis’d, and allegiance clear,\nI shall be counsell’d.');
export const DAGGER = S('Macbeth', 2, 1, 'Is this a dagger which I see before me,\nThe handle toward my hand? Come, let me clutch thee:—\nI have thee not, and yet I see thee still.\nArt thou not, fatal vision, sensible\nTo feeling as to sight? or art thou but\nA dagger of the mind, a false creation,\nProceeding from the heat-oppressed brain?');
export const GOUTS_OF_BLOOD = S('Macbeth', 2, 1, 'I see thee still;\nAnd on thy blade and dudgeon, gouts of blood,\nWhich was not so before.—There’s no such thing.\nIt is the bloody business which informs\nThus to mine eyes.');
export const KNELL = S('Macbeth', 2, 1, 'I go, and it is done. The bell invites me.\nHear it not, Duncan, for it is a knell\nThat summons thee to heaven or to hell.');
export const MADE_ME_BOLD = S('Lady Macbeth', 2, 2, 'That which hath made them drunk hath made me bold:\nWhat hath quench’d them hath given me fire.');
export const RESEMBLED_FATHER = S('Lady Macbeth', 2, 2, 'Had he not resembled\nMy father as he slept, I had done’t.');
export const AMEN = S('Macbeth', 2, 2, 'But wherefore could not I pronounce “Amen”?\nI had most need of blessing, and “Amen”\nStuck in my throat.');
export const SLEEP_NO_MORE = S('Macbeth', 2, 2, 'Methought I heard a voice cry, “Sleep no more!\nMacbeth does murder sleep,”—the innocent sleep;\nSleep that knits up the ravell’d sleave of care,\nThe death of each day’s life, sore labour’s bath,\nBalm of hurt minds, great nature’s second course,\nChief nourisher in life’s feast.');
export const GLAMIS_MURDERED_SLEEP = S('Macbeth', 2, 2, 'Still it cried, “Sleep no more!” to all the house:\n“Glamis hath murder’d sleep, and therefore Cawdor\nShall sleep no more. Macbeth shall sleep no more!”');
export const INFIRM_OF_PURPOSE = S('Lady Macbeth', 2, 2, 'Infirm of purpose!\nGive me the daggers. The sleeping and the dead\nAre but as pictures. ’Tis the eye of childhood\nThat fears a painted devil.');
export const NEPTUNE = S('Macbeth', 2, 2, 'Will all great Neptune’s ocean wash this blood\nClean from my hand? No, this my hand will rather\nThe multitudinous seas incarnadine,\nMaking the green one red.');
export const LITTLE_WATER = S('Lady Macbeth', 2, 2, 'My hands are of your color, but I shame\nTo wear a heart so white. [*Knocking within.*] I hear knocking\nAt the south entry:—retire we to our chamber.\nA little water clears us of this deed:\nHow easy is it then!');
export const WAKE_DUNCAN = S('Macbeth', 2, 2, 'To know my deed, ’twere best not know myself. [*Knocking within.*]\nWake Duncan with thy knocking! I would thou couldst!');
export const PORTER_HELL_GATE = S('Porter', 2, 3, 'Here’s a knocking indeed! If a man were porter of hell gate, he should have old turning the key. [*Knocking.*] Knock, knock, knock. Who’s there, i’ th’ name of Belzebub?');
export const PORTER_EQUIVOCATOR = S('Porter', 2, 3, 'Knock, knock! Who’s there, i’ th’ other devil’s name? Faith, here’s an equivocator, that could swear in both the scales against either scale, who committed treason enough for God’s sake, yet could not equivocate to heaven: O, come in, equivocator.');
export const PORTER_BONFIRE = S('Porter', 2, 3, 'But this place is too cold for hell. I’ll devil-porter it no further: I had thought to have let in some of all professions, that go the primrose way to th’ everlasting bonfire.');
export const ROUGH_NIGHT = D(2, 3,
  ['Lennox', 'The night has been unruly: where we lay,\nOur chimneys were blown down and, as they say,\nLamentings heard i’ th’ air, strange screams of death,\nAnd prophesying, with accents terrible,\nOf dire combustion and confus’d events,\nNew hatch’d to the woeful time. The obscure bird\nClamour’d the live-long night. Some say the earth\nWas feverous, and did shake.'],
  ['Macbeth', '’Twas a rough night.'],
);
export const O_HORROR = S('Macduff', 2, 3, 'O horror, horror, horror!\nTongue nor heart cannot conceive nor name thee!');
export const CONFUSION_MASTERPIECE = S('Macduff', 2, 3, 'Confusion now hath made his masterpiece!\nMost sacrilegious murder hath broke ope\nThe Lord’s anointed temple, and stole thence\nThe life o’ th’ building.');
export const WHAT_IN_OUR_HOUSE = D(2, 3, ['Macduff', 'O Banquo, Banquo!\nOur royal master’s murder’d!'], ['Lady Macbeth', 'Woe, alas!\nWhat, in our house?'], ['Banquo', 'Too cruel anywhere.']);
export const DIED_AN_HOUR_BEFORE = S('Macbeth', 2, 3, 'Had I but died an hour before this chance,\nI had liv’d a blessed time; for, from this instant\nThere’s nothing serious in mortality.\nAll is but toys: renown and grace is dead;');
export const REPENT_FURY = D(2, 3, ['Macbeth', 'O, yet I do repent me of my fury,\nThat I did kill them.'], ['Macduff', 'Wherefore did you so?']);
export const SILVER_SKIN = S('Macbeth', 2, 3, 'Here lay Duncan,\nHis silver skin lac’d with his golden blood;\nAnd his gash’d stabs look’d like a breach in nature\nFor ruin’s wasteful entrance:');
export const DONALBAIN_IRELAND = S('Donalbain', 2, 3, 'To Ireland, I. Our separated fortune\nShall keep us both the safer. Where we are,\nThere’s daggers in men’s smiles: the near in blood,\nThe nearer bloody.');
export const UNFELT_SORROW = S('Malcolm', 2, 3, 'To show an unfelt sorrow is an office\nWhich the false man does easy. I’ll to England.');
export const DARK_NIGHT_STRANGLES = S('Ross', 2, 4, 'Thou seest the heavens, as troubled with man’s act,\nThreatens his bloody stage: by the clock ’tis day,\nAnd yet dark night strangles the travelling lamp.');
export const FALCON_OWL = S('Old Man', 2, 4, '’Tis unnatural,\nEven like the deed that’s done. On Tuesday last,\nA falcon, towering in her pride of place,\nWas by a mousing owl hawk’d at and kill’d.');
export const DUNCANS_HORSES = D(2, 4,
  ['Ross', 'And Duncan’s horses (a thing most strange and certain)\nBeauteous and swift, the minions of their race,\nTurn’d wild in nature, broke their stalls, flung out,\nContending ’gainst obedience, as they would make\nWar with mankind.'],
  ['Old Man', '’Tis said they eat each other.'],
);
export const SUSPICION_SONS = S('Macduff', 2, 4, 'Malcolm and Donalbain, the King’s two sons,\nAre stol’n away and fled; which puts upon them\nSuspicion of the deed.');
export const OLD_ROBES = S('Macduff', 2, 4, 'Well, may you see things well done there. Adieu!\nLest our old robes sit easier than our new!');

// ---------------------------------------------------------------- Act 3
export const THOU_HAST_IT_NOW = S('Banquo', 3, 1, 'Thou hast it now, King, Cawdor, Glamis, all,\nAs the Weird Women promis’d; and, I fear,\nThou play’dst most foully for’t;');
export const BANQUO_HOPE = S('Banquo', 3, 1, 'If there come truth from them\n(As upon thee, Macbeth, their speeches shine)\nWhy, by the verities on thee made good,\nMay they not be my oracles as well,\nAnd set me up in hope? But hush; no more.');
export const FAIL_NOT_OUR_FEAST = D(3, 1, ['Macbeth', 'Fail not our feast.'], ['Banquo', 'My lord, I will not.']);
export const TO_BE_THUS = S('Macbeth', 3, 1, 'To be thus is nothing,\nBut to be safely thus. Our fears in Banquo\nStick deep, and in his royalty of nature\nReigns that which would be fear’d:');
export const FRUITLESS_CROWN = S('Macbeth', 3, 1, 'Upon my head they plac’d a fruitless crown,\nAnd put a barren sceptre in my gripe,\nThence to be wrench’d with an unlineal hand,\nNo son of mine succeeding.');
export const SEED_OF_BANQUO = S('Macbeth', 3, 1, 'For Banquo’s issue have I fil’d my mind;\nFor them the gracious Duncan have I murder’d;\nPut rancours in the vessel of my peace\nOnly for them; and mine eternal jewel\nGiven to the common enemy of man,\nTo make them kings, the seed of Banquo kings!');
export const CATALOGUE_MEN = D(3, 1, ['First Murderer', 'We are men, my liege.'], ['Macbeth', 'Ay, in the catalogue ye go for men;\nAs hounds, and greyhounds, mongrels, spaniels, curs,\nShoughs, water-rugs, and demi-wolves are clept\nAll by the name of dogs:']);
export const FLEANCE_TOO = S('Macbeth', 3, 1, 'And with him\n(To leave no rubs nor botches in the work)\nFleance his son, that keeps him company,\nWhose absence is no less material to me\nThan is his father’s, must embrace the fate\nOf that dark hour.');
export const SOULS_FLIGHT = S('Macbeth', 3, 1, 'It is concluded. Banquo, thy soul’s flight,\nIf it find heaven, must find it out tonight.');
export const NAUGHTS_HAD = S('Lady Macbeth', 3, 2, 'Naught’s had, all’s spent,\nWhere our desire is got without content:\n’Tis safer to be that which we destroy,\nThan by destruction dwell in doubtful joy.');
export const WHATS_DONE_IS_DONE = S('Lady Macbeth', 3, 2, 'Things without all remedy\nShould be without regard: what’s done is done.');
export const SCORCHED_SNAKE = S('Macbeth', 3, 2, 'We have scorch’d the snake, not kill’d it.\nShe’ll close, and be herself; whilst our poor malice\nRemains in danger of her former tooth.');
export const SLEEPS_WELL = S('Macbeth', 3, 2, 'Better be with the dead,\nWhom we, to gain our peace, have sent to peace,\nThan on the torture of the mind to lie\nIn restless ecstasy. Duncan is in his grave;\nAfter life’s fitful fever he sleeps well;');
export const SCORPIONS = S('Macbeth', 3, 2, 'O, full of scorpions is my mind, dear wife!\nThou know’st that Banquo, and his Fleance, lives.');
export const DEAREST_CHUCK = S('Macbeth', 3, 2, 'Be innocent of the knowledge, dearest chuck,\nTill thou applaud the deed. Come, seeling night,\nScarf up the tender eye of pitiful day,\nAnd with thy bloody and invisible hand\nCancel and tear to pieces that great bond\nWhich keeps me pale!');
export const LIGHT_THICKENS = S('Macbeth', 3, 2, 'Light thickens; and the crow\nMakes wing to th’ rooky wood.\nGood things of day begin to droop and drowse,\nWhiles night’s black agents to their preys do rouse.');
export const THINGS_BAD_BEGUN = S('Macbeth', 3, 2, 'Things bad begun make strong themselves by ill.');
export const RAIN_TONIGHT = D(3, 3, ['Banquo', 'It will be rain tonight.'], ['First Murderer', 'Let it come down.']);
export const FLY_FLEANCE = S('Banquo', 3, 3, 'O, treachery! Fly, good Fleance, fly, fly, fly!\nThou mayst revenge—O slave!\n[*Dies. Fleance escapes.*]');
export const SON_IS_FLED = D(3, 3, ['Third Murderer', 'There’s but one down: the son is fled.'], ['Second Murderer', 'We have lost best half of our affair.']);
export const CABINED = D(3, 4,
  ['Murderer', 'Most royal sir,\nFleance is ’scap’d.'],
  ['Macbeth', 'Then comes my fit again: I had else been perfect;\nWhole as the marble, founded as the rock,\nAs broad and general as the casing air:\nBut now I am cabin’d, cribb’d, confin’d, bound in\nTo saucy doubts and fears.'],
);
export const GROWN_SERPENT = S('Macbeth', 3, 4, 'There the grown serpent lies; the worm that’s fled\nHath nature that in time will venom breed,\nNo teeth for th’ present.');
export const GORY_LOCKS = S('Macbeth', 3, 4, 'Thou canst not say I did it. Never shake\nThy gory locks at me.');
export const ARE_YOU_A_MAN = D(3, 4, ['Lady Macbeth', 'Are you a man?'], ['Macbeth', 'Ay, and a bold one, that dare look on that\nWhich might appal the devil.']);
export const AIR_DRAWN_DAGGER = S('Lady Macbeth', 3, 4, 'O proper stuff!\nThis is the very painting of your fear:\nThis is the air-drawn dagger which you said,\nLed you to Duncan.');
export const WHOM_WE_MISS = S('Macbeth', 3, 4, 'I drink to the general joy o’ th’ whole table,\nAnd to our dear friend Banquo, whom we miss:\nWould he were here.');
export const BLOOD_WILL_HAVE_BLOOD = S('Macbeth', 3, 4, 'It will have blood, they say, blood will have blood.');
export const STEPPED_IN_BLOOD = S('Macbeth', 3, 4, 'I am in blood\nStepp’d in so far that, should I wade no more,\nReturning were as tedious as go o’er.');
export const WORST_MEANS = S('Macbeth', 3, 4, 'I will tomorrow\n(And betimes I will) to the Weird Sisters:\nMore shall they speak; for now I am bent to know,\nBy the worst means, the worst. For mine own good,\nAll causes shall give way:');
export const SEASON_OF_NATURES = S('Lady Macbeth', 3, 4, 'You lack the season of all natures, sleep.');
export const SECURITY = S('Hecate', 3, 5, 'He shall spurn fate, scorn death, and bear\nHis hopes ’bove wisdom, grace, and fear.\nAnd you all know, security\nIs mortals’ chiefest enemy.');
export const LENNOX_IRONY = S('Lennox', 3, 6, 'The gracious Duncan\nWas pitied of Macbeth:—marry, he was dead:—\nAnd the right valiant Banquo walk’d too late;\nWhom, you may say, if’t please you, Fleance kill’d,\nFor Fleance fled. Men must not walk too late.');
export const NOBLY_DONE = S('Lennox', 3, 6, 'How it did grieve Macbeth! did he not straight,\nIn pious rage, the two delinquents tear\nThat were the slaves of drink and thralls of sleep?\nWas not that nobly done? Ay, and wisely too;\nFor ’twould have anger’d any heart alive,\nTo hear the men deny’t.');
export const LORD_MACDUFF = S('Lord', 3, 6, 'Thither Macduff\nIs gone to pray the holy king, upon his aid\nTo wake Northumberland, and warlike Siward');

// ---------------------------------------------------------------- Act 4
export const DOUBLE_DOUBLE = S('The Witches', 4, 1, 'Double, double, toil and trouble;\nFire, burn; and cauldron, bubble.');
export const SOMETHING_WICKED = S('Second Witch', 4, 1, 'By the pricking of my thumbs,\nSomething wicked this way comes.');
export const MIDNIGHT_HAGS = D(4, 1, ['Macbeth', 'How now, you secret, black, and midnight hags!\nWhat is’t you do?'], ['The Witches', 'A deed without a name.']);
export const BEWARE_MACDUFF = S('First Apparition', 4, 1, 'Macbeth! Macbeth! Macbeth! Beware Macduff;\nBeware the Thane of Fife.');
export const NONE_OF_WOMAN_BORN = S('Second Apparition', 4, 1, 'Be bloody, bold, and resolute. Laugh to scorn\nThe power of man, for none of woman born\nShall harm Macbeth.');
export const BIRNAM = S('Third Apparition', 4, 1, 'Be lion-mettled, proud, and take no care\nWho chafes, who frets, or where conspirers are:\nMacbeth shall never vanquish’d be, until\nGreat Birnam wood to high Dunsinane hill\nShall come against him.');
export const ASSURANCE_DOUBLE_SURE = S('Macbeth', 4, 1, 'Then live, Macduff: what need I fear of thee?\nBut yet I’ll make assurance double sure,\nAnd take a bond of fate. Thou shalt not live;');
export const THAT_WILL_NEVER_BE = S('Macbeth', 4, 1, 'That will never be:\nWho can impress the forest; bid the tree\nUnfix his earth-bound root? Sweet bodements, good!');
export const BANQUO_SMILES = S('Macbeth', 4, 1, 'Horrible sight!—Now I see ’tis true;\nFor the blood-bolter’d Banquo smiles upon me,\nAnd points at them for his.');
export const INFECTED_AIR = S('Macbeth', 4, 1, 'Infected be the air whereon they ride;\nAnd damn’d all those that trust them!');
export const FIRSTLINGS = S('Macbeth', 4, 1, 'From this moment\nThe very firstlings of my heart shall be\nThe firstlings of my hand.');
export const SURPRISE_FIFE = S('Macbeth', 4, 1, 'The castle of Macduff I will surprise;\nSeize upon Fife; give to th’ edge o’ th’ sword\nHis wife, his babes, and all unfortunate souls\nThat trace him in his line.');
export const LADY_MACDUFF_WREN = S('Lady Macduff', 4, 2, 'Wisdom! to leave his wife, to leave his babes,\nHis mansion, and his titles, in a place\nFrom whence himself does fly? He loves us not:\nHe wants the natural touch; for the poor wren,\nThe most diminutive of birds, will fight,\nHer young ones in her nest, against the owl.');
export const TRAITOR_SON = D(4, 2,
  ['Son', 'Was my father a traitor, mother?'],
  ['Lady Macduff', 'Ay, that he was.'],
  ['Son', 'What is a traitor?'],
  ['Lady Macduff', 'Why, one that swears and lies.'],
);
export const TO_DO_HARM = S('Lady Macduff', 4, 2, 'I have done no harm. But I remember now\nI am in this earthly world, where to do harm\nIs often laudable; to do good sometime\nAccounted dangerous folly:');
export const HE_HAS_KILLD_ME = S('Son', 4, 2, 'He has kill’d me, mother:\nRun away, I pray you!');
export const ANGELS_BRIGHT = S('Malcolm', 4, 3, 'Angels are bright still, though the brightest fell:\nThough all things foul would wear the brows of grace,\nYet grace must still look so.');
export const BLEED_POOR_COUNTRY = S('Macduff', 4, 3, 'Bleed, bleed, poor country!\nGreat tyranny, lay thou thy basis sure,\nFor goodness dare not check thee!');
export const FIT_TO_GOVERN = D(4, 3, ['Malcolm', 'If such a one be fit to govern, speak:\nI am as I have spoken.'], ['Macduff', 'Fit to govern?\nNo, not to live.']);
export const MALCOLM_TEST = S('Malcolm', 4, 3, 'Macduff, this noble passion,\nChild of integrity, hath from my soul\nWiped the black scruples, reconcil’d my thoughts\nTo thy good truth and honour. Devilish Macbeth\nBy many of these trains hath sought to win me\nInto his power,');
export const ALAS_POOR_COUNTRY = S('Ross', 4, 3, 'Alas, poor country,\nAlmost afraid to know itself! It cannot\nBe call’d our mother, but our grave,');
export const WELL_AT_PEACE = D(4, 3,
  ['Macduff', 'How does my wife?'],
  ['Ross', 'Why, well.'],
  ['Macduff', 'And all my children?'],
  ['Ross', 'Well too.'],
  ['Macduff', 'The tyrant has not batter’d at their peace?'],
  ['Ross', 'No; they were well at peace when I did leave ’em.'],
);
export const WIFE_AND_BABES = S('Ross', 4, 3, 'Your castle is surpris’d; your wife and babes\nSavagely slaughter’d.');
export const GIVE_SORROW_WORDS = S('Malcolm', 4, 3, 'Give sorrow words. The grief that does not speak\nWhispers the o’er-fraught heart, and bids it break.');
export const ALL_MY_PRETTY_ONES = S('Macduff', 4, 3, 'He has no children.—All my pretty ones?\nDid you say all?—O hell-kite!—All?\nWhat, all my pretty chickens and their dam\nAt one fell swoop?');
export const FEEL_IT_AS_A_MAN = D(4, 3, ['Malcolm', 'Dispute it like a man.'], ['Macduff', 'I shall do so;\nBut I must also feel it as a man:\nI cannot but remember such things were,\nThat were most precious to me.']);
export const WHETSTONE = S('Malcolm', 4, 3, 'Be this the whetstone of your sword. Let grief\nConvert to anger; blunt not the heart, enrage it.');
export const RIPE_FOR_SHAKING = S('Malcolm', 4, 3, 'Macbeth\nIs ripe for shaking, and the powers above\nPut on their instruments.');

// ---------------------------------------------------------------- Act 5
export const RUBS_HANDS = D(5, 1, ['Doctor', 'What is it she does now? Look how she rubs her hands.'], ['Gentlewoman', 'It is an accustomed action with her, to seem thus washing her hands. I have known her continue in this a quarter of an hour.']);
export const LIGHT_BY_HER = D(5, 1, ['Doctor', 'How came she by that light?'], ['Gentlewoman', 'Why, it stood by her: she has light by her continually; ’tis her command.']);
export const OUT_DAMNED_SPOT = S('Lady Macbeth', 5, 1, 'Out, damned spot! out, I say! One; two. Why, then ’tis time to do’t. Hell is murky! Fie, my lord, fie! a soldier, and afeard? What need we fear who knows it, when none can call our power to account? Yet who would have thought the old man to have had so much blood in him?');
export const THANE_OF_FIFE_WIFE = S('Lady Macbeth', 5, 1, 'The Thane of Fife had a wife. Where is she now?—What, will these hands ne’er be clean?');
export const PERFUMES_OF_ARABIA = S('Lady Macbeth', 5, 1, 'Here’s the smell of the blood still: all the perfumes of Arabia will not sweeten this little hand. Oh, oh, oh!');
export const BANQUOS_BURIED = S('Lady Macbeth', 5, 1, 'Wash your hands, put on your nightgown; look not so pale. I tell you yet again, Banquo’s buried; he cannot come out on’s grave.');
export const UNDONE = S('Lady Macbeth', 5, 1, 'To bed, to bed. There’s knocking at the gate. Come, come, come, come, give me your hand. What’s done cannot be undone. To bed, to bed, to bed.');
export const MORE_NEEDS_DIVINE = S('Doctor', 5, 1, 'Unnatural deeds\nDo breed unnatural troubles: infected minds\nTo their deaf pillows will discharge their secrets.\nMore needs she the divine than the physician.');
export const GIANTS_ROBE = S('Angus', 5, 2, 'Now does he feel\nHis secret murders sticking on his hands;\nNow minutely revolts upbraid his faith-breach;\nThose he commands move only in command,\nNothing in love: now does he feel his title\nHang loose about him, like a giant’s robe\nUpon a dwarfish thief.');
export const SOME_SAY_MAD = S('Caithness', 5, 2, 'Great Dunsinane he strongly fortifies.\nSome say he’s mad; others, that lesser hate him,\nDo call it valiant fury:');
export const SICKLY_WEAL = S('Caithness', 5, 2, 'Well, march we on,\nTo give obedience where ’tis truly ow’d:\nMeet we the med’cine of the sickly weal;\nAnd with him pour we, in our country’s purge,\nEach drop of us.');
export const BORN_OF_WOMAN = S('Macbeth', 5, 3, 'What’s the boy Malcolm?\nWas he not born of woman? The spirits that know\nAll mortal consequences have pronounc’d me thus:\n“Fear not, Macbeth; no man that’s born of woman\nShall e’er have power upon thee.”');
export const CREAM_FACED = S('Macbeth', 5, 3, 'The devil damn thee black, thou cream-fac’d loon!\nWhere gott’st thou that goose look?');
export const YELLOW_LEAF = S('Macbeth', 5, 3, 'I have liv’d long enough: my way of life\nIs fall’n into the sere, the yellow leaf;\nAnd that which should accompany old age,\nAs honour, love, obedience, troops of friends,\nI must not look to have;');
export const MIND_DISEASED = D(5, 3,
  ['Macbeth', 'Canst thou not minister to a mind diseas’d,\nPluck from the memory a rooted sorrow,\nRaze out the written troubles of the brain,\nAnd with some sweet oblivious antidote\nCleanse the stuff’d bosom of that perilous stuff\nWhich weighs upon the heart?'],
  ['Doctor', 'Therein the patient\nMust minister to himself.'],
);
export const PHYSIC_TO_DOGS = S('Macbeth', 5, 3, 'Throw physic to the dogs, I’ll none of it.');
export const NOT_AFRAID_TILL_BIRNAM = S('Macbeth', 5, 3, 'I will not be afraid of death and bane,\nTill Birnam forest come to Dunsinane.');
export const HEW_A_BOUGH = S('Malcolm', 5, 4, 'Let every soldier hew him down a bough,\nAnd bear’t before him. Thereby shall we shadow\nThe numbers of our host, and make discovery\nErr in report of us.');
export const LAUGH_A_SIEGE = S('Macbeth', 5, 5, 'Hang out our banners on the outward walls;\nThe cry is still, “They come!” Our castle’s strength\nWill laugh a siege to scorn:');
export const TASTE_OF_FEARS = S('Macbeth', 5, 5, 'I have almost forgot the taste of fears.\nThe time has been, my senses would have cool’d\nTo hear a night-shriek; and my fell of hair\nWould at a dismal treatise rouse and stir\nAs life were in’t. I have supp’d full with horrors;\nDireness, familiar to my slaughterous thoughts,\nCannot once start me.');
export const QUEEN_IS_DEAD = D(5, 5, ['Seyton', 'The Queen, my lord, is dead.'], ['Macbeth', 'She should have died hereafter.\nThere would have been a time for such a word.']);
export const TOMORROW = S('Macbeth', 5, 5, 'Tomorrow, and tomorrow, and tomorrow,\nCreeps in this petty pace from day to day,\nTo the last syllable of recorded time;\nAnd all our yesterdays have lighted fools\nThe way to dusty death. Out, out, brief candle!\nLife’s but a walking shadow; a poor player,\nThat struts and frets his hour upon the stage,\nAnd then is heard no more: it is a tale\nTold by an idiot, full of sound and fury,\nSignifying nothing.');
export const WOOD_BEGAN_TO_MOVE = S('Messenger', 5, 5, 'As I did stand my watch upon the hill,\nI look’d toward Birnam, and anon, methought,\nThe wood began to move.');
export const EQUIVOCATION_OF_FIEND = S('Macbeth', 5, 5, 'I pull in resolution; and begin\nTo doubt th’ equivocation of the fiend,\nThat lies like truth.');
export const AWEARY_OF_SUN = S('Macbeth', 5, 5, 'I ’gin to be aweary of the sun,\nAnd wish th’ estate o’ th’ world were now undone.');
export const HARNESS_ON_BACK = S('Macbeth', 5, 5, 'Ring the alarum bell!—Blow, wind! come, wrack!\nAt least we’ll die with harness on our back.');
export const BEAR_LIKE = S('Macbeth', 5, 7, 'They have tied me to a stake. I cannot fly,\nBut, bear-like I must fight the course.—What’s he\nThat was not born of woman? Such a one\nAm I to fear, or none.');
export const YOUNG_SIWARD_SLAIN = D(5, 7,
  ['Young Siward', 'Thou liest, abhorred tyrant. With my sword\nI’ll prove the lie thou speak’st.\n[*They fight, and young Siward is slain.*]'],
  ['Macbeth', 'Thou wast born of woman.\nBut swords I smile at, weapons laugh to scorn,\nBrandish’d by man that’s of a woman born.'],
);
export const GHOSTS_HAUNT = S('Macduff', 5, 7, 'Tyrant, show thy face!\nIf thou be’st slain and with no stroke of mine,\nMy wife and children’s ghosts will haunt me still.');
export const ROMAN_FOOL = S('Macbeth', 5, 8, 'Why should I play the Roman fool, and die\nOn mine own sword? whiles I see lives, the gashes\nDo better upon them.');
export const TOO_MUCH_CHARGED = D(5, 8, ['Macduff', 'Turn, hell-hound, turn!'], ['Macbeth', 'Of all men else I have avoided thee:\nBut get thee back; my soul is too much charg’d\nWith blood of thine already.']);
export const CHARMED_LIFE = S('Macbeth', 5, 8, 'Thou losest labour:\nAs easy mayst thou the intrenchant air\nWith thy keen sword impress, as make me bleed:\nLet fall thy blade on vulnerable crests;\nI bear a charmed life, which must not yield\nTo one of woman born.');
export const UNTIMELY_RIPPED = D(5, 8, ['Macbeth', 'I bear a charmed life, which must not yield\nTo one of woman born.'], ['Macduff', 'Despair thy charm;\nAnd let the angel whom thou still hast serv’d\nTell thee, Macduff was from his mother’s womb\nUntimely ripp’d.']);
export const JUGGLING_FIENDS = S('Macbeth', 5, 8, 'And be these juggling fiends no more believ’d,\nThat palter with us in a double sense;\nThat keep the word of promise to our ear,\nAnd break it to our hope!');
export const LAY_ON = S('Macbeth', 5, 8, 'I will not yield,\nTo kiss the ground before young Malcolm’s feet,\nAnd to be baited with the rabble’s curse.\nThough Birnam wood be come to Dunsinane,\nAnd thou oppos’d, being of no woman born,\nYet I will try the last. Before my body\nI throw my warlike shield: lay on, Macduff;\nAnd damn’d be him that first cries, “Hold, enough!”');
export const LIKE_A_MAN_HE_DIED = S('Ross', 5, 8, 'Your son, my lord, has paid a soldier’s debt:\nHe only liv’d but till he was a man;\nThe which no sooner had his prowess confirm’d\nIn the unshrinking station where he fought,\nBut like a man he died.');
export const USURPERS_HEAD = S('Macduff', 5, 8, 'Hail, King, for so thou art. Behold, where stands\nTh’ usurper’s cursed head: the time is free.');
export const DEAD_BUTCHER = S('Malcolm', 5, 8, 'Producing forth the cruel ministers\nOf this dead butcher, and his fiend-like queen,\nWho, as ’tis thought, by self and violent hands\nTook off her life;');

/** Every passage, for the quotation check. */
export const PASSAGES: Record<string, Passage> = {
  FAIR_IS_FOUL, BRAVE_MACBETH, UNSEAMED, VALIANT_COUSIN, CAWDOR_DEATH, LOST_WON, SO_FOUL, ALL_HAIL, WHY_START, BANQUO_PROPHECY, BORROWED_ROBES,
  DEVIL_SPEAK_TRUE, INSTRUMENTS_OF_DARKNESS, SUPERNATURAL_SOLICITING, PRESENT_FEARS, CHANCE_CROWN, STRANGE_GARMENTS, NO_ART, CAWDOR_LEAVING,
  PLANT_THEE, STARS_HIDE, MILK_OF_KINDNESS, RAVEN, THICK_NIGHT, NEVER_SHALL_SUN, INNOCENT_FLOWER, LEAVE_ALL_TO_ME, PLEASANT_SEAT, ASSASSINATION,
  DOUBLE_TRUST, PITY_BABE, VAULTING_AMBITION, PROCEED_NO_FURTHER, HOPE_DRUNK, DARE_DO_ALL, THEN_YOU_WERE_A_MAN, IF_WE_FAIL, FALSE_FACE,
  CANDLES_OUT, CURSED_THOUGHTS, DREAMT_SISTERS, ALLEGIANCE_CLEAR, DAGGER, GOUTS_OF_BLOOD, KNELL, MADE_ME_BOLD, RESEMBLED_FATHER, AMEN, SLEEP_NO_MORE,
  GLAMIS_MURDERED_SLEEP, INFIRM_OF_PURPOSE, NEPTUNE, LITTLE_WATER, WAKE_DUNCAN, PORTER_HELL_GATE, PORTER_EQUIVOCATOR, PORTER_BONFIRE, ROUGH_NIGHT,
  O_HORROR, CONFUSION_MASTERPIECE, WHAT_IN_OUR_HOUSE, DIED_AN_HOUR_BEFORE, REPENT_FURY, SILVER_SKIN, DONALBAIN_IRELAND, UNFELT_SORROW,
  DARK_NIGHT_STRANGLES, FALCON_OWL, DUNCANS_HORSES, SUSPICION_SONS, OLD_ROBES,
  THOU_HAST_IT_NOW, BANQUO_HOPE, FAIL_NOT_OUR_FEAST, TO_BE_THUS, FRUITLESS_CROWN, SEED_OF_BANQUO, CATALOGUE_MEN, FLEANCE_TOO, SOULS_FLIGHT,
  NAUGHTS_HAD, WHATS_DONE_IS_DONE, SCORCHED_SNAKE, SLEEPS_WELL, SCORPIONS, DEAREST_CHUCK, LIGHT_THICKENS, THINGS_BAD_BEGUN, RAIN_TONIGHT,
  FLY_FLEANCE, SON_IS_FLED, CABINED, GROWN_SERPENT, GORY_LOCKS, ARE_YOU_A_MAN, AIR_DRAWN_DAGGER, WHOM_WE_MISS, BLOOD_WILL_HAVE_BLOOD,
  STEPPED_IN_BLOOD, WORST_MEANS, SEASON_OF_NATURES, SECURITY, LENNOX_IRONY, NOBLY_DONE, LORD_MACDUFF,
  DOUBLE_DOUBLE, SOMETHING_WICKED, MIDNIGHT_HAGS, BEWARE_MACDUFF, NONE_OF_WOMAN_BORN, BIRNAM, ASSURANCE_DOUBLE_SURE, THAT_WILL_NEVER_BE,
  BANQUO_SMILES, INFECTED_AIR, FIRSTLINGS, SURPRISE_FIFE, LADY_MACDUFF_WREN, TRAITOR_SON, TO_DO_HARM, HE_HAS_KILLD_ME, ANGELS_BRIGHT,
  BLEED_POOR_COUNTRY, FIT_TO_GOVERN, MALCOLM_TEST, ALAS_POOR_COUNTRY, WELL_AT_PEACE, WIFE_AND_BABES, GIVE_SORROW_WORDS, ALL_MY_PRETTY_ONES,
  FEEL_IT_AS_A_MAN, WHETSTONE, RIPE_FOR_SHAKING,
  RUBS_HANDS, LIGHT_BY_HER, OUT_DAMNED_SPOT, THANE_OF_FIFE_WIFE, PERFUMES_OF_ARABIA, BANQUOS_BURIED, UNDONE, MORE_NEEDS_DIVINE, GIANTS_ROBE,
  SOME_SAY_MAD, SICKLY_WEAL, BORN_OF_WOMAN, CREAM_FACED, YELLOW_LEAF, MIND_DISEASED, PHYSIC_TO_DOGS, NOT_AFRAID_TILL_BIRNAM, HEW_A_BOUGH,
  LAUGH_A_SIEGE, TASTE_OF_FEARS, QUEEN_IS_DEAD, TOMORROW, WOOD_BEGAN_TO_MOVE, EQUIVOCATION_OF_FIEND, AWEARY_OF_SUN, HARNESS_ON_BACK, BEAR_LIKE,
  YOUNG_SIWARD_SLAIN, GHOSTS_HAUNT, ROMAN_FOOL, TOO_MUCH_CHARGED, CHARMED_LIFE, UNTIMELY_RIPPED, JUGGLING_FIENDS, LAY_ON, LIKE_A_MAN_HE_DIED,
  USURPERS_HEAD, DEAD_BUTCHER,
};
