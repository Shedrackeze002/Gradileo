/**
 * Excerpts from Shakespeare's Romeo and Juliet, quoted exactly from Project Gutenberg's edition
 * (eBook #1513), with each speaker and the act and scene. Verse keeps its line breaks; prose is one
 * line. Stage directions are in square brackets. The play was first printed in 1597, so it is in
 * the public domain everywhere.
 */

export const RJ = { author: 'William Shakespeare', title: 'Romeo and Juliet', url: 'https://www.gutenberg.org/ebooks/1513' };

export interface Speech {
  speaker: string;
  /** Verse lines separated by "\n". */
  text: string;
}

export interface Passage {
  /** 0 for the Prologue. */
  act: number;
  scene: number;
  speeches: Speech[];
}

/** One speaker's lines. */
const S = (speaker: string, act: number, scene: number, text: string): Passage => ({ act, scene, speeches: [{ speaker, text }] });
/** An exchange between speakers. */
const D = (act: number, scene: number, ...speeches: Array<[string, string]>): Passage => ({ act, scene, speeches: speeches.map(([speaker, text]) => ({ speaker, text })) });

/** "Act 2, Scene 2", or "the Prologue". */
export const where = (p: Passage) => (p.act === 0 ? 'the Prologue' : `Act ${p.act}, Scene ${p.scene}`);
/** "In Act 2, Scene 2" with a capital. */
export const inWhere = (p: Passage) => (p.act === 0 ? 'In the Prologue' : `In Act ${p.act}, Scene ${p.scene}`);
/** The speaker of a one-speaker passage. */
export const speaker = (p: Passage) => p.speeches[0].speaker;

/** A passage as a Markdown blockquote, verse lines kept, with its attribution. */
export function quoteBlock(p: Passage): string {
  const verse = (text: string) => text.split('\n').map((l, i, all) => `> ${l}${i < all.length - 1 ? '\\' : ''}`);
  if (p.speeches.length === 1) {
    return [...verse(p.speeches[0].text), '>', `> — ${p.speeches[0].speaker}, *${RJ.title}*, ${where(p)}`].join('\n');
  }
  const out: string[] = [];
  p.speeches.forEach((s, i) => {
    if (i) out.push('>');
    const v = verse(s.text);
    v[0] = `> **${s.speaker}.** ${v[0].slice(2)}`;
    out.push(...v);
  });
  return [...out, '>', `> — *${RJ.title}*, ${where(p)}`].join('\n');
}

/** A passage as a blockquote without its speaker's name (for “Who says this?”). */
export function quoteAnon(p: Passage): string {
  const lines = p.speeches.map((s) => s.text).join('\n').split('\n');
  return [...lines.map((l, i) => `> ${l}${i < lines.length - 1 ? '\\' : ''}`), '>', `> — *${RJ.title}*, ${where(p)}`].join('\n');
}

/** A passage on one line, in quotation marks, with " / " between verse lines (for answer choices); quotation marks inside it become single. */
export const inline = (p: Passage) => `“${p.speeches.map((s) => s.text.split('\n').join(' / ')).join(' … ').replace(/“/g, '‘').replace(/”/g, '’')}”`;

// ---------------------------------------------------------------- the Prologue
export const PROLOGUE_HOUSEHOLDS = S('Chorus', 0, 0, 'Two households, both alike in dignity,\nIn fair Verona, where we lay our scene,\nFrom ancient grudge break to new mutiny,\nWhere civil blood makes civil hands unclean.');
export const PROLOGUE_STAR_CROSSED = S('Chorus', 0, 0, 'From forth the fatal loins of these two foes\nA pair of star-cross’d lovers take their life;\nWhose misadventur’d piteous overthrows\nDoth with their death bury their parents’ strife.');

// ---------------------------------------------------------------- Act 1
export const SERVANTS_COLLIERS = D(1, 1,
  ['Sampson', 'Gregory, on my word, we’ll not carry coals.'],
  ['Gregory', 'No, for then we should be colliers.'],
  ['Sampson', 'I mean, if we be in choler, we’ll draw.'],
  ['Gregory', 'Ay, while you live, draw your neck out o’ the collar.'],
);
export const THUMB = D(1, 1,
  ['Abram', 'Do you bite your thumb at us, sir?'],
  ['Sampson', 'I do bite my thumb, sir.'],
);
export const BENVOLIO_PEACE = S('Benvolio', 1, 1, 'I do but keep the peace, put up thy sword,\nOr manage it to part these men with me.');
export const TYBALT_HATE = S('Tybalt', 1, 1, 'What, drawn, and talk of peace? I hate the word\nAs I hate hell, all Montagues, and thee:\nHave at thee, coward.');
export const LADY_CAPULET_CRUTCH = S('Lady Capulet', 1, 1, 'A crutch, a crutch! Why call you for a sword?');
export const PRINCE_FORFEIT = S('Prince', 1, 1, 'If ever you disturb our streets again,\nYour lives shall pay the forfeit of the peace.');
export const ROMEO_OXYMORONS = S('Romeo', 1, 1, 'Here’s much to do with hate, but more with love:\nWhy, then, O brawling love! O loving hate!\nO anything, of nothing first create!\nO heavy lightness! serious vanity!');
export const ROMEO_LAUGH = D(1, 1, ['Romeo', 'Dost thou not laugh?'], ['Benvolio', 'No coz, I rather weep.']);
export const FORGET_TO_THINK = D(1, 1, ['Benvolio', 'Be rul’d by me, forget to think of her.'], ['Romeo', 'O teach me how I should forget to think.']);
export const CAPULET_STRANGER = S('Capulet', 1, 2, 'My child is yet a stranger in the world,\nShe hath not seen the change of fourteen years;\nLet two more summers wither in their pride\nEre we may think her ripe to be a bride.');
export const CAPULET_CONSENT = S('Capulet', 1, 2, 'But woo her, gentle Paris, get her heart,\nMy will to her consent is but a part;');
export const BENVOLIO_ROSALINE = S('Benvolio', 1, 2, 'At this same ancient feast of Capulet’s\nSups the fair Rosaline whom thou so lov’st;');
export const NURSE_SUSAN = S('Nurse', 1, 3, 'Susan and she,—God rest all Christian souls!—\nWere of an age. Well, Susan is with God;\nShe was too good for me. But as I said,\nOn Lammas Eve at night shall she be fourteen;\nThat shall she, marry; I remember it well.');
export const NURSE_FLOWER = S('Nurse', 1, 3, 'Nay, he’s a flower, in faith a very flower.');
export const MARRY_THEME = S('Lady Capulet', 1, 3, 'Marry, that marry is the very theme\nI came to talk of.');
export const JULIET_HONOUR = S('Juliet', 1, 3, 'It is an honour that I dream not of.');
export const JULIET_LOOK_TO_LIKE = S('Juliet', 1, 3, 'I’ll look to like, if looking liking move:\nBut no more deep will I endart mine eye\nThan your consent gives strength to make it fly.');
export const SOUL_OF_LEAD = S('Romeo', 1, 4, 'Not I, believe me, you have dancing shoes,\nWith nimble soles, I have a soul of lead\nSo stakes me to the ground I cannot move.');
export const QUEEN_MAB = S('Mercutio', 1, 4, 'O, then, I see Queen Mab hath been with you.\nShe is the fairies’ midwife, and she comes\nIn shape no bigger than an agate-stone\nOn the fore-finger of an alderman,');
export const MAB_DRIVETH = S('Mercutio', 1, 4, 'Sometime she driveth o’er a soldier’s neck,');
export const MERCUTIO_DREAMS = S('Mercutio', 1, 4, 'True, I talk of dreams,\nWhich are the children of an idle brain,\nBegot of nothing but vain fantasy,');
export const ROMEO_MISGIVES = S('Romeo', 1, 4, 'I fear too early: for my mind misgives\nSome consequence yet hanging in the stars,\nShall bitterly begin his fearful date\nWith this night’s revels; and expire the term\nOf a despised life, clos’d in my breast\nBy some vile forfeit of untimely death.');
export const ROMEO_TORCHES = S('Romeo', 1, 5, 'O, she doth teach the torches to burn bright!');
export const ROMEO_TRUE_BEAUTY = S('Romeo', 1, 5, 'Did my heart love till now? Forswear it, sight!\nFor I ne’er saw true beauty till this night.');
export const TYBALT_RAPIER = S('Tybalt', 1, 5, 'This by his voice, should be a Montague.\nFetch me my rapier, boy.');
export const TYBALT_KIN = S('Tybalt', 1, 5, 'Now by the stock and honour of my kin,\nTo strike him dead I hold it not a sin.');
export const CAPULET_WEALTH = S('Capulet', 1, 5, 'I would not for the wealth of all the town\nHere in my house do him disparagement.');
export const CAPULET_MASTER = S('Capulet', 1, 5, 'Am I the master here, or you? Go to.');
export const TYBALT_GALL = S('Tybalt', 1, 5, 'I will withdraw: but this intrusion shall,\nNow seeming sweet, convert to bitter gall.');
export const PILGRIM_SONNET = S('Romeo', 1, 5, 'If I profane with my unworthiest hand\nThis holy shrine, the gentle sin is this,\nMy lips, two blushing pilgrims, ready stand\nTo smooth that rough touch with a tender kiss.');
export const NURSE_MARRY_BACHELOR = S('Nurse', 1, 5, 'Marry, bachelor,\nHer mother is the lady of the house,');
export const IS_IT_EEN_SO = S('Capulet', 1, 5, 'Is it e’en so? Why then, I thank you all;');
export const JULIET_GRAVE = S('Juliet', 1, 5, 'Go ask his name. If he be married,\nMy grave is like to be my wedding bed.');
export const JULIET_ONLY_LOVE = S('Juliet', 1, 5, 'My only love sprung from my only hate!\nToo early seen unknown, and known too late!');
export const NURSE_ANON = S('Nurse', 1, 5, 'Anon, anon!\nCome let’s away, the strangers all are gone.');

// ---------------------------------------------------------------- Act 2
export const BUT_SOFT = S('Romeo', 2, 2, 'But soft, what light through yonder window breaks?\nIt is the east, and Juliet is the sun!');
export const WHEREFORE = S('Juliet', 2, 2, 'O Romeo, Romeo, wherefore art thou Romeo?\nDeny thy father and refuse thy name.\nOr if thou wilt not, be but sworn my love,\nAnd I’ll no longer be a Capulet.');
export const ROMEO_ASIDE = S('Romeo', 2, 2, '[*Aside.*] Shall I hear more, or shall I speak at this?');
export const ONLY_THY_NAME = S('Juliet', 2, 2, '’Tis but thy name that is my enemy;\nThou art thyself, though not a Montague.');
export const WHATS_IN_A_NAME = S('Juliet', 2, 2, 'What’s in a name? That which we call a rose\nBy any other name would smell as sweet;');
export const TAKE_THEE_AT_THY_WORD = S('Romeo', 2, 2, 'I take thee at thy word.\nCall me but love, and I’ll be new baptis’d;\nHenceforth I never will be Romeo.');
export const HOW_CAMST_THOU = S('Juliet', 2, 2, 'How cam’st thou hither, tell me, and wherefore?\nThe orchard walls are high and hard to climb,\nAnd the place death, considering who thou art,\nIf any of my kinsmen find thee here.');
export const LOVES_LIGHT_WINGS = S('Romeo', 2, 2, 'With love’s light wings did I o’erperch these walls,\nFor stony limits cannot hold love out,');
export const ALACK_PERIL = S('Romeo', 2, 2, 'Alack, there lies more peril in thine eye\nThan twenty of their swords.');
export const MASK_OF_NIGHT = S('Juliet', 2, 2, 'Thou knowest the mask of night is on my face,\nElse would a maiden blush bepaint my cheek\nFor that which thou hast heard me speak tonight.');
export const FAIN_WOULD_I = S('Juliet', 2, 2, 'Fain would I dwell on form, fain, fain deny\nWhat I have spoke;');
export const DOST_THOU_LOVE_ME = S('Juliet', 2, 2, 'Dost thou love me? I know thou wilt say Ay,\nAnd I will take thy word.');
export const SAY_THEE_NAY = S('Juliet', 2, 2, 'I’ll frown and be perverse, and say thee nay,\nSo thou wilt woo.');
export const TOO_RASH = S('Juliet', 2, 2, 'It is too rash, too unadvis’d, too sudden,\nToo like the lightning, which doth cease to be\nEre one can say “It lightens.”');
export const BOUNDLESS_SEA = S('Juliet', 2, 2, 'My bounty is as boundless as the sea,\nMy love as deep; the more I give to thee,\nThe more I have, for both are infinite.');
export const ANON_GOOD_NURSE = S('Juliet', 2, 2, 'Anon, good Nurse!—Sweet Montague be true.');
export const THY_PURPOSE_MARRIAGE = S('Juliet', 2, 2, 'If that thy bent of love be honourable,\nThy purpose marriage, send me word tomorrow,');
export const SWEET_SORROW = S('Juliet', 2, 2, 'Good night, good night. Parting is such sweet sorrow\nThat I shall say good night till it be morrow.');
export const FRIAR_MORN = S('Friar Lawrence', 2, 3, 'The grey-ey’d morn smiles on the frowning night,\nChequering the eastern clouds with streaks of light;');
export const FRIAR_ERE = S('Friar Lawrence', 2, 3, 'Now, ere the sun advance his burning eye,\nThe day to cheer, and night’s dank dew to dry,\nI must upfill this osier cage of ours\nWith baleful weeds and precious-juiced flowers.');
export const FRIAR_POISON_FLOWER = S('Friar Lawrence', 2, 3, 'Within the infant rind of this weak flower\nPoison hath residence, and medicine power:');
export const SALUTETH = S('Friar Lawrence', 2, 3, 'What early tongue so sweet saluteth me?');
export const WHERE_HAST_THOU_BEEN = S('Friar Lawrence', 2, 3, 'That’s my good son. But where hast thou been then?');
export const ERE_THOU_ASK = S('Romeo', 2, 3, 'I’ll tell thee ere thou ask it me again.\nI have been feasting with mine enemy,');
export const MARRY_US_TODAY = S('Romeo', 2, 3, 'Then plainly know my heart’s dear love is set\nOn the fair daughter of rich Capulet.');
export const YOUNG_MENS_LOVE = S('Friar Lawrence', 2, 3, 'Holy Saint Francis! What a change is here!\nIs Rosaline, that thou didst love so dear,\nSo soon forsaken? Young men’s love then lies\nNot truly in their hearts, but in their eyes.');
export const FRIAR_ALLIANCE = S('Friar Lawrence', 2, 3, 'In one respect I’ll thy assistant be;\nFor this alliance may so happy prove,\nTo turn your households’ rancour to pure love.');
export const STUMBLE = D(2, 3, ['Romeo', 'O let us hence; I stand on sudden haste.'], ['Friar Lawrence', 'Wisely and slow; they stumble that run fast.']);
export const OUT_OF_BREATH = S('Juliet', 2, 5, 'How art thou out of breath, when thou hast breath\nTo say to me that thou art out of breath?');
export const HIE_YOU_HENCE = S('Nurse', 2, 5, 'Then hie you hence to Friar Lawrence’ cell;\nThere stays a husband to make you a wife.');
export const LOVE_DEVOURING_DEATH = S('Romeo', 2, 6, 'Do thou but close our hands with holy words,\nThen love-devouring death do what he dare,\nIt is enough I may but call her mine.');
export const VIOLENT_DELIGHTS = S('Friar Lawrence', 2, 6, 'These violent delights have violent ends,\nAnd in their triumph die; like fire and powder,\nWhich as they kiss consume.');
export const LOVE_MODERATELY = S('Friar Lawrence', 2, 6, 'Therefore love moderately: long love doth so;\nToo swift arrives as tardy as too slow.');

// ---------------------------------------------------------------- Act 3
export const MAD_BLOOD = S('Benvolio', 3, 1, 'I pray thee, good Mercutio, let’s retire:\nThe day is hot, the Capulets abroad,\nAnd if we meet, we shall not scape a brawl,\nFor now these hot days, is the mad blood stirring.');
export const THOU_ART_A_VILLAIN = S('Tybalt', 3, 1, 'Romeo, the love I bear thee can afford\nNo better term than this: Thou art a villain.');
export const REASON_TO_LOVE = S('Romeo', 3, 1, 'Tybalt, the reason that I have to love thee\nDoth much excuse the appertaining rage\nTo such a greeting. Villain am I none;\nTherefore farewell; I see thou know’st me not.');
export const NEVER_INJURED = S('Romeo', 3, 1, 'I do protest I never injur’d thee,\nBut love thee better than thou canst devise\nTill thou shalt know the reason of my love.');
export const VILE_SUBMISSION = S('Mercutio', 3, 1, 'O calm, dishonourable, vile submission!');
export const FORBEAR = S('Romeo', 3, 1, 'Draw, Benvolio; beat down their weapons.\nGentlemen, for shame, forbear this outrage,');
export const PLAGUE = S('Mercutio', 3, 1, 'I am hurt.\nA plague o’ both your houses. I am sped.');
export const GRAVE_MAN = S('Mercutio', 3, 1, 'No, ’tis not so deep as a well, nor so wide as a church door, but ’tis enough, ’twill serve. Ask for me tomorrow, and you shall find me a grave man.');
export const EFFEMINATE = S('Romeo', 3, 1, 'O sweet Juliet,\nThy beauty hath made me effeminate\nAnd in my temper soften’d valour’s steel.');
export const BLACK_FATE = S('Romeo', 3, 1, 'This day’s black fate on mo days doth depend;\nThis but begins the woe others must end.');
export const FIRE_EYED_FURY = S('Romeo', 3, 1, 'Away to heaven respective lenity,\nAnd fire-ey’d fury be my conduct now!');
export const TAKE_THE_VILLAIN_BACK = S('Romeo', 3, 1, 'Now, Tybalt, take the ‘villain’ back again\nThat late thou gav’st me, for Mercutio’s soul\nIs but a little way above our heads,\nStaying for thine to keep him company.');
export const FORTUNES_FOOL = S('Romeo', 3, 1, 'O, I am fortune’s fool!');
export const ROMEO_MUST_NOT_LIVE = S('Lady Capulet', 3, 1, 'I beg for justice, which thou, Prince, must give;\nRomeo slew Tybalt, Romeo must not live.');
export const EXILE = S('Prince', 3, 1, 'And for that offence\nImmediately we do exile him hence.');
export const MERCY_MURDERS = S('Prince', 3, 1, 'Mercy but murders, pardoning those that kill.');
export const GALLOP_APACE = S('Juliet', 3, 2, 'Gallop apace, you fiery-footed steeds,\nTowards Phoebus’ lodging.');
export const TEDIOUS_DAY = S('Juliet', 3, 2, 'So tedious is this day\nAs is the night before some festival\nTo an impatient child that hath new robes\nAnd may not wear them.');
export const WHEREFORE_WEEP = S('Juliet', 3, 2, 'My husband lives, that Tybalt would have slain,\nAnd Tybalt’s dead, that would have slain my husband.\nAll this is comfort; wherefore weep I then?');
export const FORGET_IT_FAIN = S('Juliet', 3, 2, 'Some word there was, worser than Tybalt’s death,\nThat murder’d me. I would forget it fain,');
export const DESPERATE_TENDER = S('Capulet', 3, 4, 'Sir Paris, I will make a desperate tender\nOf my child’s love. I think she will be rul’d\nIn all respects by me; nay more, I doubt it not.');
export const WHAT_DAY = D(3, 4, ['Capulet', 'But, soft, what day is this?'], ['Paris', 'Monday, my lord.']);
export const A_THURSDAY = S('Capulet', 3, 4, 'Monday! Ha, ha! Well, Wednesday is too soon,\nA Thursday let it be; a Thursday, tell her,\nShe shall be married to this noble earl.');
export const NIGHTINGALE = S('Juliet', 3, 5, 'Wilt thou be gone? It is not yet near day.\nIt was the nightingale, and not the lark,\nThat pierc’d the fearful hollow of thine ear;');
export const NIGHTS_CANDLES = S('Romeo', 3, 5, 'Night’s candles are burnt out, and jocund day\nStands tiptoe on the misty mountain tops.\nI must be gone and live, or stay and die.');
export const HIE_HENCE = S('Juliet', 3, 5, 'It is, it is! Hie hence, be gone, away.');
export const ILL_DIVINING = S('Juliet', 3, 5, 'O God! I have an ill-divining soul!\nMethinks I see thee, now thou art so low,\nAs one dead in the bottom of a tomb.');
export const WASH_HIM = S('Lady Capulet', 3, 5, 'Evermore weeping for your cousin’s death?\nWhat, wilt thou wash him from his grave with tears?');
export const MANY_MILES_ASUNDER = D(3, 5,
  ['Lady Capulet', 'That same villain Romeo.'],
  ['Juliet', 'Villain and he be many miles asunder.\nGod pardon him. I do, with all my heart.\nAnd yet no man like he doth grieve my heart.'],
);
export const DRAG_THEE = S('Capulet', 3, 5, 'But fettle your fine joints ’gainst Thursday next\nTo go with Paris to Saint Peter’s Church,\nOr I will drag thee on a hurdle thither.');
export const HANG_BEG_STARVE = S('Capulet', 3, 5, 'And you be mine, I’ll give you to my friend;\nAnd you be not, hang, beg, starve, die in the streets,\nFor by my soul, I’ll ne’er acknowledge thee,');
export const NURSE_THE_COUNTY = S('Nurse', 3, 5, 'Then, since the case so stands as now it doth,\nI think it best you married with the County.\nO, he’s a lovely gentleman.\nRomeo’s a dishclout to him.');
export const NURSE_BANISHED = S('Nurse', 3, 5, 'Romeo is banished; and all the world to nothing\nThat he dares ne’er come back to challenge you.');
export const COMFORTED = S('Juliet', 3, 5, 'Well, thou hast comforted me marvellous much.');
export const ANCIENT_DAMNATION = S('Juliet', 3, 5, 'Ancient damnation! O most wicked fiend!');
export const POWER_TO_DIE = S('Juliet', 3, 5, 'I’ll to the Friar to know his remedy.\nIf all else fail, myself have power to die.');

// ---------------------------------------------------------------- Act 4
export const FRIAR_SLOWD = S('Friar Lawrence', 4, 1, '[*Aside.*] I would I knew not why it should be slow’d.');
export const HASTES_OUR_MARRIAGE = S('Paris', 4, 1, 'Now, sir, her father counts it dangerous\nThat she do give her sorrow so much sway;\nAnd in his wisdom, hastes our marriage,\nTo stop the inundation of her tears,');
export const MY_LADY_AND_MY_WIFE = S('Paris', 4, 1, 'Happily met, my lady and my wife!');
export const WHAT_MUST_BE = D(4, 1,
  ['Paris', 'That may be, must be, love, on Thursday next.'],
  ['Juliet', 'What must be shall be.'],
  ['Friar Lawrence', 'That’s a certain text.'],
);
export const CONFESS = D(4, 1,
  ['Paris', 'Do not deny to him that you love me.'],
  ['Juliet', 'I will confess to you that I love him.'],
);
export const BID_ME_LEAP = S('Juliet', 4, 1, 'O, bid me leap, rather than marry Paris,\nFrom off the battlements of yonder tower,');
export const UNSTAINED_WIFE = S('Juliet', 4, 1, 'And I will do it without fear or doubt,\nTo live an unstain’d wife to my sweet love.');
export const STRENGTH_TO_SLAY = S('Friar Lawrence', 4, 1, 'If, rather than to marry County Paris\nThou hast the strength of will to slay thyself,\nThen is it likely thou wilt undertake\nA thing like death to chide away this shame,');
export const TAKE_THIS_VIAL = S('Friar Lawrence', 4, 1, 'Take thou this vial, being then in bed,\nAnd this distilled liquor drink thou off,');
export const FORTY_TWO_HOURS = S('Friar Lawrence', 4, 1, 'Thou shalt continue two and forty hours,\nAnd then awake as from a pleasant sleep.');
export const LETTERS_TO_ROMEO = S('Friar Lawrence', 4, 1, 'In the meantime, against thou shalt awake,\nShall Romeo by my letters know our drift,\nAnd hither shall he come,');
export const EVER_RULD = S('Juliet', 4, 2, 'Pardon, I beseech you.\nHenceforward I am ever rul’d by you.');
export const KNOT_KNIT = S('Capulet', 4, 2, 'Send for the County, go tell him of this.\nI’ll have this knot knit up tomorrow morning.');
export const ACT_ALONE = S('Juliet', 4, 3, 'My dismal scene I needs must act alone.\nCome, vial.\nWhat if this mixture do not work at all?\nShall I be married then tomorrow morning?');
export const WHAT_IF_POISON = S('Juliet', 4, 3, 'What if it be a poison, which the Friar\nSubtly hath minister’d to have me dead,\nLest in this marriage he should be dishonour’d,\nBecause he married me before to Romeo?');
export const ALACK_ALACK = S('Juliet', 4, 3, 'Alack, alack, is it not like that I,\nSo early waking, what with loathsome smells,');
export const I_DRINK_TO_THEE = S('Juliet', 4, 3, 'Romeo, Romeo, Romeo, here’s drink! I drink to thee.');
export const UNTIMELY_FROST = S('Capulet', 4, 5, 'Death lies on her like an untimely frost\nUpon the sweetest flower of all the field.');

// ---------------------------------------------------------------- Act 5
export const ROMEO_DREAM = S('Romeo', 5, 1, 'If I may trust the flattering eye of sleep,\nMy dreams presage some joyful news at hand.');
export const FOUND_ME_DEAD = S('Romeo', 5, 1, 'I dreamt my lady came and found me dead,—\nStrange dream, that gives a dead man leave to think!—\nAnd breath’d such life with kisses in my lips,\nThat I reviv’d, and was an emperor.');
export const SHE_IS_WELL = S('Balthasar', 5, 1, 'Then she is well, and nothing can be ill.\nHer body sleeps in Capel’s monument,\nAnd her immortal part with angels lives.');
export const DEFY_STARS = S('Romeo', 5, 1, 'Is it even so? Then I defy you, stars!');
export const NO_LETTERS = S('Romeo', 5, 1, 'Hast thou no letters to me from the Friar?');
export const FRIAR_JOHN = S('Friar John', 5, 2, 'I could not send it,—here it is again,—\nNor get a messenger to bring it thee,\nSo fearful were they of infection.');
export const UNHAPPY_FORTUNE = S('Friar Lawrence', 5, 2, 'Unhappy fortune!');
export const PARIS_FLOWERS = S('Paris', 5, 3, 'Sweet flower, with flowers thy bridal bed I strew.');
export const VILLAINOUS_SHAME = S('Paris', 5, 3, 'This is that banish’d haughty Montague\nThat murder’d my love’s cousin,—with which grief,\nIt is supposed, the fair creature died,—\nAnd here is come to do some villainous shame\nTo the dead bodies.');
export const DESPERATE_MAN = S('Romeo', 5, 3, 'Good gentle youth, tempt not a desperate man.');
export const BEAUTYS_ENSIGN = S('Romeo', 5, 3, 'Beauty’s ensign yet\nIs crimson in thy lips and in thy cheeks,\nAnd death’s pale flag is not advanced there.');
export const WITH_A_KISS = S('Romeo', 5, 3, 'Here’s to my love! [*Drinks.*] O true apothecary!\nThy drugs are quick. Thus with a kiss I die.');
export const HAPPY_DAGGER = S('Juliet', 5, 3, 'Yea, noise? Then I’ll be brief. O happy dagger.\n[*Snatching Romeo’s dagger.*]\nThis is thy sheath. [*stabs herself*] There rest, and let me die.');
export const SCOURGE = S('Prince', 5, 3, 'Where be these enemies? Capulet, Montague,\nSee what a scourge is laid upon your hate,\nThat heaven finds means to kill your joys with love!\nAnd I, for winking at your discords too,\nHave lost a brace of kinsmen. All are punish’d.');
export const GIVE_ME_THY_HAND = S('Capulet', 5, 3, 'O brother Montague, give me thy hand.');
export const MY_WIFE_IS_DEAD = S('Montague', 5, 3, 'Alas, my liege, my wife is dead tonight.\nGrief of my son’s exile hath stopp’d her breath.');
export const STORY_OF_WOE = S('Prince', 5, 3, 'A glooming peace this morning with it brings;\nThe sun for sorrow will not show his head.');
export const MORE_WOE = S('Prince', 5, 3, 'For never was a story of more woe\nThan this of Juliet and her Romeo.');

/** Every passage, for the quotation check. */
export const PASSAGES: Record<string, Passage> = {
  PROLOGUE_HOUSEHOLDS, PROLOGUE_STAR_CROSSED,
  SERVANTS_COLLIERS, THUMB, BENVOLIO_PEACE, TYBALT_HATE, LADY_CAPULET_CRUTCH, PRINCE_FORFEIT, ROMEO_OXYMORONS, ROMEO_LAUGH, FORGET_TO_THINK,
  CAPULET_STRANGER, CAPULET_CONSENT, BENVOLIO_ROSALINE, NURSE_SUSAN, NURSE_FLOWER, MARRY_THEME, JULIET_HONOUR, JULIET_LOOK_TO_LIKE,
  SOUL_OF_LEAD, QUEEN_MAB, MAB_DRIVETH, MERCUTIO_DREAMS, ROMEO_MISGIVES, ROMEO_TORCHES, ROMEO_TRUE_BEAUTY, TYBALT_RAPIER, TYBALT_KIN,
  CAPULET_WEALTH, CAPULET_MASTER, TYBALT_GALL, PILGRIM_SONNET, NURSE_MARRY_BACHELOR, IS_IT_EEN_SO, JULIET_GRAVE, JULIET_ONLY_LOVE, NURSE_ANON,
  BUT_SOFT, WHEREFORE, ROMEO_ASIDE, ONLY_THY_NAME, WHATS_IN_A_NAME, TAKE_THEE_AT_THY_WORD, HOW_CAMST_THOU, LOVES_LIGHT_WINGS, ALACK_PERIL,
  MASK_OF_NIGHT, FAIN_WOULD_I, DOST_THOU_LOVE_ME, SAY_THEE_NAY, TOO_RASH, BOUNDLESS_SEA, ANON_GOOD_NURSE, THY_PURPOSE_MARRIAGE, SWEET_SORROW,
  FRIAR_MORN, FRIAR_ERE, FRIAR_POISON_FLOWER, SALUTETH, WHERE_HAST_THOU_BEEN, ERE_THOU_ASK, MARRY_US_TODAY, YOUNG_MENS_LOVE, FRIAR_ALLIANCE,
  STUMBLE, OUT_OF_BREATH, HIE_YOU_HENCE, LOVE_DEVOURING_DEATH, VIOLENT_DELIGHTS, LOVE_MODERATELY,
  MAD_BLOOD, THOU_ART_A_VILLAIN, REASON_TO_LOVE, NEVER_INJURED, VILE_SUBMISSION, FORBEAR, PLAGUE, GRAVE_MAN, EFFEMINATE, BLACK_FATE,
  FIRE_EYED_FURY, TAKE_THE_VILLAIN_BACK, FORTUNES_FOOL, ROMEO_MUST_NOT_LIVE, EXILE, MERCY_MURDERS, GALLOP_APACE, TEDIOUS_DAY, WHEREFORE_WEEP,
  FORGET_IT_FAIN, DESPERATE_TENDER, WHAT_DAY, A_THURSDAY, NIGHTINGALE, NIGHTS_CANDLES, HIE_HENCE, ILL_DIVINING, WASH_HIM, MANY_MILES_ASUNDER,
  DRAG_THEE, HANG_BEG_STARVE, NURSE_THE_COUNTY, NURSE_BANISHED, COMFORTED, ANCIENT_DAMNATION, POWER_TO_DIE,
  FRIAR_SLOWD, HASTES_OUR_MARRIAGE, MY_LADY_AND_MY_WIFE, WHAT_MUST_BE, CONFESS, BID_ME_LEAP, UNSTAINED_WIFE, STRENGTH_TO_SLAY, TAKE_THIS_VIAL,
  FORTY_TWO_HOURS, LETTERS_TO_ROMEO, EVER_RULD, KNOT_KNIT, ACT_ALONE, WHAT_IF_POISON, ALACK_ALACK, I_DRINK_TO_THEE, UNTIMELY_FROST,
  ROMEO_DREAM, FOUND_ME_DEAD, SHE_IS_WELL, DEFY_STARS, NO_LETTERS, FRIAR_JOHN, UNHAPPY_FORTUNE, PARIS_FLOWERS, VILLAINOUS_SHAME, DESPERATE_MAN,
  BEAUTYS_ENSIGN, WITH_A_KISS, HAPPY_DAGGER, SCOURGE, GIVE_ME_THY_HAND, MY_WIFE_IS_DEAD, STORY_OF_WOE, MORE_WOE,
};
