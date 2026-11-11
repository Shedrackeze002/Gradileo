/**
 * The texts of More English Topics. Every text here was written for these lessons: the "modern"
 * and "nineteenth-century" sources are invented, in the manner of a blog, a column, a letter, a
 * diary or a memoir, so that no question depends on a text in copyright or claims a real author.
 * Quotations are exact substrings of their texts (checked in engmore.test.ts).
 */

export interface Source {
  writer: string;
  /** "a blog post", "a letter to his sister": shown after the source's label. */
  form: string;
  year: number;
  text: string;
  /** The writer's viewpoint, as a clause after "believes that". */
  view: string;
  /** Two viewpoints the writer does not hold, in the same form. */
  wrongViews: [string, string];
  /** Two adjectives for the writer's attitude: "weary and resentful". */
  tone: string;
  /** A method the writer uses, as a label ("A simile"), and a quotation that shows it. */
  method: string;
  quote: string;
  /** Three labels that do not fit the quotation. */
  wrongMethods: [string, string, string];
  /** How the method conveys the viewpoint, and a comment that misreads it. */
  effect: string;
  wrongEffect: string;
  /** What the method is used to do, after "to": "show that commuters are treated like objects". */
  purpose: string;
}

export interface Difference {
  /** What the difference is about, after "the differences between": "how the passengers behave". */
  about: string;
  /** What is true in each source, as a clause after "In Source A". */
  a: string;
  b: string;
  /** A quotation from each source that shows it. */
  qa: string;
  qb: string;
  /** What the difference suggests, and a conclusion the texts do not support (of similar length). */
  infer: string;
  wrongInfer: string;
}

export interface Pair {
  topic: string;
  a: Source;
  b: Source;
  diffs: [Difference, Difference, Difference];
}

export const PAIRS: Pair[] = [
  {
    topic: 'travelling by train',
    a: {
      writer: 'Dara Okoye', form: 'a blog post', year: 2023,
      text: 'I have caught the 7.42 every weekday for six years, and I could draw the back of the same grey seat from memory. Nobody speaks. We stand pressed together like books on a shelf, each of us staring at a phone. When the train is late, which it usually is, a recorded voice apologises without sounding sorry at all. I do not travel any more; I am simply delivered.',
      view: 'commuting by train is a dull routine that treats passengers like parcels',
      wrongViews: ['train travel is a dangerous habit that sensible people should give up', 'the train is the most comfortable and friendly way to get to work'],
      tone: 'weary and resentful',
      method: 'A simile', quote: 'pressed together like books on a shelf',
      wrongMethods: ['A rhetorical question', 'A list of three', 'Direct address'],
      effect: 'It makes the passengers seem like objects stored in a row, which shows how little the journey treats them as people.',
      wrongEffect: 'It makes the carriage seem like a peaceful library, which shows how much the writer enjoys reading on the train.',
      purpose: 'show that commuters are treated like objects',
    },
    b: {
      writer: 'Edmund Hale', form: 'a letter to his sister', year: 1845,
      text: 'My dear Anne, I have ridden upon the railway at last, and I declare I shall never be content with a coach again. We flew past hedges and cattle at such a rate that the fields seemed to melt into one another. A gentleman opposite, a perfect stranger, shook my hand and laughed aloud with me for pure delight. In two hours we were in the city, a journey that cost our father a whole day.',
      view: 'the railway is a thrilling invention that makes travel faster and more joyful',
      wrongViews: ['the railway is a noisy, frightening machine compared with the coach', 'the railway is useful but far too costly for ordinary families'],
      tone: 'excited and amazed',
      method: 'A metaphor', quote: 'the fields seemed to melt into one another',
      wrongMethods: ['A rhetorical question', 'A list of three', 'Direct address'],
      effect: 'It makes the landscape seem to blur and flow together, which shows how astonishing the speed is to the writer.',
      wrongEffect: 'It makes the weather seem hot and uncomfortable, which shows how much the writer dislikes the long journey.',
      purpose: 'show how astonishing the speed feels',
    },
    diffs: [
      {
        about: 'how the passengers behave towards one another',
        a: 'the passengers ignore one another', b: 'the passengers share their excitement',
        qa: 'Nobody speaks.', qb: 'shook my hand and laughed aloud with me',
        infer: 'This suggests that rail travel has changed from a shared adventure into a private routine.',
        wrongInfer: 'This suggests that the trains of 1845 carried far more passengers than trains do today.',
      },
      {
        about: 'the speed and timing of the journey',
        a: 'the train is usually late', b: 'the train is astonishingly fast',
        qa: 'When the train is late, which it usually is', qb: 'In two hours we were in the city',
        infer: 'This suggests that the modern writer takes speed for granted and notices only the delays.',
        wrongInfer: 'This suggests that modern trains are slower than the first trains were in the year 1845.',
      },
      {
        about: 'what the writers notice on the journey',
        a: 'the writer sees only the inside of the carriage', b: 'the writer watches the countryside rush past',
        qa: 'the back of the same grey seat', qb: 'We flew past hedges and cattle',
        infer: 'This suggests that the journey has become too familiar for the modern writer to look outside.',
        wrongInfer: 'This suggests that modern railway lines no longer pass through any open countryside at all.',
      },
    ],
  },
  {
    topic: 'life at school',
    a: {
      writer: 'Maya Lindqvist', form: 'an article in a school magazine', year: 2024,
      text: 'People say school days are the best of your life, and I am starting to believe them. Yes, the exams loom, and yes, my bag weighs more than I do. But my teachers know my name, my worries and my terrible handwriting, and they have never once given up on me. When I failed my first physics test, Mr Adeyemi stayed behind for a week to help. Who could ask for more than that?',
      view: 'school is demanding, but caring teachers make it a good place to be',
      wrongViews: ['school puts students under so much pressure that it does them harm', 'school is easy, and students today have nothing to complain about'],
      tone: 'warm and grateful',
      method: 'A rhetorical question', quote: 'Who could ask for more than that?',
      wrongMethods: ['A simile', 'A metaphor', 'Personification'],
      effect: 'It invites the reader to agree that such support is all a student needs, which shows how grateful the writer is.',
      wrongEffect: 'It shows that the writer cannot think of an answer, which reveals how confused she is about her own school.',
      purpose: 'invite the reader to share her gratitude',
    },
    b: {
      writer: 'Thomas Reed', form: 'a memoir', year: 1859,
      text: 'I was sent to Dr Crale’s school at the age of eight, and I learned there chiefly to be afraid. We sat on hard benches from six in the morning, reciting Latin that not one boy in ten understood. A wrong answer was paid for with the cane. The masters did not know our names; they called us by numbers, as a gaoler calls his prisoners. I counted the days to each holiday as a sailor counts the miles to land.',
      view: 'school was a harsh place that taught fear instead of understanding',
      wrongViews: ['strict discipline was the making of him and ought to be brought back', 'school was dull, but the masters were kind men at heart'],
      tone: 'bitter and fearful',
      method: 'A simile', quote: 'as a gaoler calls his prisoners',
      wrongMethods: ['A rhetorical question', 'A list of three', 'Direct address'],
      effect: 'It compares the school to a prison, which shows that the writer felt punished and powerless while he was there.',
      wrongEffect: 'It compares the masters to careful guardians, which shows that the writer felt safe and protected by them.',
      purpose: 'present the school as a prison',
    },
    diffs: [
      {
        about: 'how the teachers treat their pupils',
        a: 'the teachers know and support each pupil', b: 'the masters treat the pupils as numbers',
        qa: 'they have never once given up on me', qb: 'they called us by numbers',
        infer: 'This suggests that the modern school sees pupils as individuals, not as a crowd to control.',
        wrongInfer: 'This suggests that the older school had many more pupils than the modern school has now.',
      },
      {
        about: 'what happens when a pupil gets something wrong',
        a: 'a pupil who fails is given extra help', b: 'a pupil who fails is beaten',
        qa: 'stayed behind for a week to help', qb: 'A wrong answer was paid for with the cane.',
        infer: 'This suggests that a mistake is now treated as a chance to learn, not as an offence.',
        wrongInfer: 'This suggests that pupils in 1859 made far fewer mistakes than pupils make today.',
      },
      {
        about: 'how the writers feel about being at school',
        a: 'the writer is glad to be at school', b: 'the writer longs to leave school',
        qa: 'I am starting to believe them', qb: 'I counted the days to each holiday',
        infer: 'This suggests that the modern writer feels safe at school, while the older writer felt trapped.',
        wrongInfer: 'This suggests that school holidays were much longer in 1859 than they are in schools today.',
      },
    ],
  },
  {
    topic: 'a day at the seaside',
    a: {
      writer: 'Jonah Brandt', form: 'a newspaper travel column', year: 2022,
      text: 'We queued forty minutes for a parking space and a further twenty for chips. The beach itself was hidden somewhere beneath windbreaks, speakers and inflatable flamingos. I waded in up to my knees, met a floating crisp packet, and waded out again. You pay for the sea air these days, and you get the smell of frying oil. Next summer I shall stay at home and look at a photograph.',
      view: 'the modern seaside is crowded, commercial and not worth the trouble',
      wrongViews: ['the seaside is still the best place there is for a family holiday', 'the seaside is dangerous, and swimmers ought to take more care'],
      tone: 'sarcastic and disappointed',
      method: 'Humorous exaggeration', quote: 'Next summer I shall stay at home and look at a photograph.',
      wrongMethods: ['A simile', 'A rhetorical question', 'Personification'],
      effect: 'It jokes that a picture would be better than the real beach, which shows how little the writer thinks the trip was worth.',
      wrongEffect: 'It shows that the writer is a keen photographer, which explains why he goes back to the same beach every summer.',
      purpose: 'mock how little the trip was worth',
    },
    b: {
      writer: 'Harriet Vane', form: 'a diary', year: 1863,
      text: 'Went down to the shore before breakfast, when there was not a soul upon the sands. The bathing machine was drawn into the waves and I stepped down into water so cold and clean that I cried out. I am certain the sea is the best physician in England. My cough is gone, my appetite is returned, and I feel ten years younger. I would not exchange this week for a month in London.',
      view: 'the seaside is a peaceful place that restores a person’s health',
      wrongViews: ['sea bathing is unpleasant but must be endured for the sake of health', 'the seaside is pleasant enough, but London offers far more to do'],
      tone: 'delighted and refreshed',
      method: 'A list of three', quote: 'My cough is gone, my appetite is returned, and I feel ten years younger.',
      wrongMethods: ['A simile', 'A rhetorical question', 'Direct address'],
      effect: 'It piles up three benefits one after another, which stresses how completely the sea has restored her.',
      wrongEffect: 'It piles up three complaints one after another, which stresses how ill the journey has made her.',
      purpose: 'stress how completely the sea has restored her',
    },
    diffs: [
      {
        about: 'how crowded the beach is',
        a: 'the beach is packed with people and their belongings', b: 'the beach is completely empty',
        qa: 'hidden somewhere beneath windbreaks, speakers and inflatable flamingos', qb: 'there was not a soul upon the sands',
        infer: 'This suggests that the seaside has changed from a quiet retreat into a busy place of entertainment.',
        wrongInfer: 'This suggests that ordinary people in 1863 were not allowed to walk on the beach at any time.',
      },
      {
        about: 'the state of the sea',
        a: 'the water is spoiled by litter', b: 'the water is cold and clean',
        qa: 'met a floating crisp packet', qb: 'water so cold and clean that I cried out',
        infer: 'This suggests that the modern writer finds the sea spoiled by its own visitors.',
        wrongInfer: 'This suggests that the sea was a good deal warmer in 1863 than it is today.',
      },
      {
        about: 'what the writers gain from the visit',
        a: 'the writer gains nothing and wants to stay away', b: 'the writer feels healthier and wants to stay',
        qa: 'Next summer I shall stay at home', qb: 'I feel ten years younger',
        infer: 'This suggests that the visit disappoints the modern writer but restores the earlier one.',
        wrongInfer: 'This suggests that the modern writer is in far better health than the earlier one.',
      },
    ],
  },
  {
    topic: 'climbing a mountain',
    a: {
      writer: 'Priya Raman', form: 'a magazine article', year: 2021,
      text: 'We turned back two hundred metres below the summit, and I have never been prouder of a decision. The cloud had come down like a lid, and the mountain does not care how far you have travelled to stand on it. People ask whether I was disappointed. A little. But the peak will be there next year, and thanks to that decision, so will I. Up there you are a guest, never the owner.',
      view: 'a mountain must be respected, and turning back can be the right choice',
      wrongViews: ['climbing is too dangerous, and people should give it up altogether', 'reaching the summit is the only thing that makes a climb worthwhile'],
      tone: 'humble and thoughtful',
      method: 'Personification', quote: 'the mountain does not care how far you have travelled',
      wrongMethods: ['A simile', 'A rhetorical question', 'A list of three'],
      effect: 'It gives the mountain a mind of its own, which shows that nature is indifferent to the climbers’ hopes.',
      wrongEffect: 'It gives the mountain a kind heart, which shows that it rewards the climbers who travel the furthest.',
      purpose: 'show that nature is indifferent to human plans',
    },
    b: {
      writer: 'Captain Robert Aldous', form: 'a published journal', year: 1872,
      text: 'At noon we planted our flag upon the summit and the mountain was ours. Two of the porters had begged to turn back when the weather closed in, but I would not hear of it; an Englishman does not retreat from a little snow. The peak that had defied every traveller before me lay beaten beneath my boots. I confess I felt myself the master of all I could see.',
      view: 'a mountain is there to be conquered, whatever the risk',
      wrongViews: ['the porters deserve the credit for reaching the summit', 'climbers should always turn back when the weather closes in'],
      tone: 'proud and boastful',
      method: 'A metaphor', quote: 'lay beaten beneath my boots',
      wrongMethods: ['A simile', 'A rhetorical question', 'A list of three'],
      effect: 'It presents the peak as a defeated enemy, which shows that the writer sees the climb as a battle he has won.',
      wrongEffect: 'It presents the peak as a sleeping friend, which shows that the writer feels a gentle affection for it.',
      purpose: 'present the climb as a battle he has won',
    },
    diffs: [
      {
        about: 'what the climbers do when the weather turns bad',
        a: 'the climbers turn back for safety', b: 'the climbers press on to the top',
        qa: 'We turned back two hundred metres below the summit', qb: 'I would not hear of it',
        infer: 'This suggests that the modern climber values safety above success, unlike the earlier one.',
        wrongInfer: 'This suggests that the weather was far worse in 2021 than it was on the climb of 1872.',
      },
      {
        about: 'how the writers see the mountain',
        a: 'the writer sees the mountain as a place to be respected', b: 'the writer sees the mountain as an enemy to be defeated',
        qa: 'Up there you are a guest, never the owner.', qb: 'the mountain was ours',
        infer: 'This suggests that the modern writer feels humble before nature, while the earlier one expects to rule it.',
        wrongInfer: 'This suggests that the earlier writer climbed a much higher mountain than the modern writer ever did.',
      },
      {
        about: 'what makes the writers proud',
        a: 'the writer is proud of deciding to turn back', b: 'the writer is proud of reaching the summit',
        qa: 'I have never been prouder of a decision', qb: 'we planted our flag upon the summit',
        infer: 'This suggests that the writers measure achievement differently: one by judgement, one by victory.',
        wrongInfer: 'This suggests that the modern writer is a much less experienced climber than the earlier one.',
      },
    ],
  },
  {
    topic: 'a city market',
    a: {
      writer: 'Sami Haddad', form: 'a food blog', year: 2023,
      text: 'Follow your nose and you cannot go wrong. The night market hits you all at once: charcoal smoke, sizzling garlic, a hundred voices bargaining in five languages. I ate grilled corn standing up, elbow to elbow with strangers who felt like neighbours by the second bite. Forget white tablecloths. If you want to understand a city, eat where it eats.',
      view: 'a busy market is the best place to eat and to understand a city',
      wrongViews: ['street food is cheap, but a restaurant always gives a better meal', 'night markets are exciting, but they are not safe for visitors'],
      tone: 'enthusiastic and welcoming',
      method: 'Direct address', quote: 'If you want to understand a city, eat where it eats.',
      wrongMethods: ['A simile', 'A rhetorical question', 'Personification'],
      effect: 'It speaks straight to the reader as advice, which shows how strongly the writer wants others to share the experience.',
      wrongEffect: 'It speaks straight to the sellers as a warning, which shows how strongly the writer wants the market to change.',
      purpose: 'urge the reader to share the experience',
    },
    b: {
      writer: 'Augusta Penn', form: 'a travel book', year: 1857,
      text: 'I was obliged to pass through the market, and I pray I may never do so again. The noise was beyond description, every seller bawling at once like a creature in pain. Unwashed hands thrust fish and fruit beneath my very nose, and the smell followed me to my lodgings. I cannot conceive how respectable persons could eat in such a place. I took my supper in my room with the window shut.',
      view: 'the market is a dirty, noisy place that respectable people should avoid',
      wrongViews: ['the market is unpleasant, but its food is well worth the trouble', 'a traveller should eat as local people do in order to understand them'],
      tone: 'disgusted and superior',
      method: 'A simile', quote: 'bawling at once like a creature in pain',
      wrongMethods: ['A rhetorical question', 'A list of three', 'Direct address'],
      effect: 'It compares the sellers to a suffering animal, which shows how unpleasant and inhuman the writer finds them.',
      wrongEffect: 'It compares the sellers to cheerful singers, which shows how lively and charming the writer finds them.',
      purpose: 'show her disgust at the sellers',
    },
    diffs: [
      {
        about: 'how the writers react to the noise of the market',
        a: 'the writer enjoys the lively voices', b: 'the writer is horrified by the shouting',
        qa: 'a hundred voices bargaining in five languages', qb: 'The noise was beyond description',
        infer: 'This suggests that the modern writer hears the noise as energy, while the earlier one hears it as suffering.',
        wrongInfer: 'This suggests that the markets of 1857 were a great deal quieter than the markets of the present day.',
      },
      {
        about: 'where the writers choose to eat',
        a: 'the writer eats in the market among the crowd', b: 'the writer eats alone in her room',
        qa: 'I ate grilled corn standing up', qb: 'I took my supper in my room with the window shut.',
        infer: 'This suggests that the modern writer wants to join the life of the city, not to shut it out.',
        wrongInfer: 'This suggests that the earlier writer could not afford any of the food sold in the market.',
      },
      {
        about: 'how the writers regard the people around them',
        a: 'the writer feels close to the strangers around him', b: 'the writer looks down on the people around her',
        qa: 'strangers who felt like neighbours', qb: 'I cannot conceive how respectable persons could eat in such a place.',
        infer: 'This suggests that the modern writer sees the crowd as equals, while the earlier one sees them as beneath her.',
        wrongInfer: 'This suggests that the modern writer already knew most of the people he met when he visited the market.',
      },
    ],
  },
];

export interface Support {
  quote: string;
  /** How the quotation supports the statement: a method and its effect on the reader. */
  why: string;
  /** A comment that only repeats what the quotation says. */
  retell: string;
  /** A comment that misreads the quotation. */
  wrongWhy: string;
}

export interface Extract {
  title: string;
  text: string;
  /** A student's statement about the extract. */
  statement: string;
  /** The best opening for an evaluation, and one that only says what the extract is about. */
  judge: string;
  aboutOpen: string;
  supports: [Support, Support];
  /** A detail that pulls against the statement, and the point it makes (after "although"). */
  against: { quote: string; point: string };
  /** Two details that neither support nor challenge the statement. */
  neutral: [string, string];
  /** Weak responses: one that retells, one with no evidence, one that lists methods with no effect. */
  retell: string;
  noEvidence: string;
  noEffect: string;
  /** The best conclusion, and ones that overstate each side. */
  conclusion: string;
  overAgree: string;
  overDisagree: string;
}

export const EXTRACTS: Extract[] = [
  {
    title: 'The Lighthouse',
    text: 'The storm reached the lighthouse just after dark. Nell climbed the stairs with the lamp oil, counting each step aloud so that she would not hear the sea. The lamp room smelled of oil and brass polish. Below her, the door shuddered in its frame as if something large were leaning against it. Her father had said he would be back before the tide. That was six hours ago. She lit the lamp with steady hands, and only afterwards noticed that she was crying.',
    statement: 'The writer makes the reader feel that Nell is in real danger.',
    judge: 'I agree to a large extent, because the writer builds a sense of threat through the storm and the father’s absence.',
    aboutOpen: 'The extract is about a girl called Nell who is alone in a lighthouse during a storm while her father is away.',
    supports: [
      {
        quote: 'as if something large were leaning against it',
        why: 'The simile makes the storm seem like a creature trying to get in, so the reader fears for Nell.',
        retell: 'This shows that the door of the lighthouse was moving in its frame during the storm.',
        wrongWhy: 'The simile makes the lighthouse seem strong and well built, so the reader feels Nell is safe.',
      },
      {
        quote: 'That was six hours ago.',
        why: 'The short sentence lets the delay sink in, so the reader suspects that something has happened to her father.',
        retell: 'This shows that six hours have gone by since her father said that he would be back before the tide.',
        wrongWhy: 'The short sentence shows that time is passing quickly, so the reader expects her father at any moment.',
      },
    ],
    against: { quote: 'She lit the lamp with steady hands', point: 'her steady hands show that she is not helpless' },
    neutral: ['The lamp room smelled of oil and brass polish', 'Nell climbed the stairs with the lamp oil'],
    retell: 'The storm comes to the lighthouse and Nell goes up the stairs with the oil. Her father is late, and she lights the lamp and then she cries.',
    noEvidence: 'I agree with the statement because the extract is really tense and scary, and I think anyone reading it would be worried about Nell.',
    noEffect: 'The writer uses a simile, a short sentence and some description of the storm. These are all techniques that writers often use.',
    conclusion: 'I mostly agree: the storm and her father’s absence put Nell in danger, although her steady hands show that she is not helpless.',
    overAgree: 'I completely agree: every single detail in the extract shows that Nell is in terrible danger, and nothing suggests anything else.',
    overDisagree: 'I completely disagree: Nell lights the lamp calmly, which proves that there is no danger at all and the storm does not matter.',
  },
  {
    title: 'The Interview',
    text: 'Marcus had ironed his only shirt twice. In the waiting room he sat very straight, his certificates in a plastic folder on his knees, and read the same poster eleven times. The clock above the desk said ten to nine. The receptionist did not look up when she called his name. He stood, and the folder slid to the floor, and the papers went everywhere. Nobody helped. He gathered them one by one, smiled at the closed office door, and knocked.',
    statement: 'The writer makes the reader feel sympathy for Marcus.',
    judge: 'I agree to a large extent, because the writer shows how hard Marcus tries and how little kindness he meets.',
    aboutOpen: 'The extract is about a man called Marcus who is waiting for a job interview and drops his papers on the floor.',
    supports: [
      {
        quote: 'Marcus had ironed his only shirt twice.',
        why: 'The detail of his only shirt shows how little he has and how much he cares, so the reader warms to him.',
        retell: 'This shows that Marcus ironed the one shirt that he owned two times before he went to the interview.',
        wrongWhy: 'The detail of his only shirt shows that he is careless about his clothes, so the reader loses patience.',
      },
      {
        quote: 'Nobody helped.',
        why: 'The short sentence stresses how alone he is, so the reader feels sorry for him at his worst moment.',
        retell: 'This shows that the other people in the waiting room did not pick up any of the papers for him.',
        wrongWhy: 'The short sentence shows that he prefers to work alone, so the reader admires his independence.',
      },
    ],
    against: { quote: 'smiled at the closed office door, and knocked', point: 'his smile at the end also makes us admire him' },
    neutral: ['The clock above the desk said ten to nine', 'his certificates in a plastic folder on his knees'],
    retell: 'Marcus irons his shirt and waits in the waiting room with his folder. He drops his papers on the floor, picks them up and knocks on the door.',
    noEvidence: 'I agree with the statement because Marcus seems like a really nice person, and I think it is very sad when people are treated like that.',
    noEffect: 'The writer uses short sentences, a list of actions and some details about his clothes. These are all techniques that writers often use.',
    conclusion: 'I mostly agree: his effort and the unkindness around him earn our sympathy, although his smile at the end also makes us admire him.',
    overAgree: 'I completely agree: every single detail makes Marcus seem weak and pitiful, and there is nothing in the extract to admire about him.',
    overDisagree: 'I completely disagree: Marcus smiles and knocks, which proves that he is perfectly happy and the reader feels nothing for him.',
  },
  {
    title: 'The Plum Tree',
    text: 'Mrs Okoro kept her gate padlocked and her curtains drawn. When the ball came over the wall for the third time that week, she carried it to the fence at arm’s length, as though it might bite. “Yours, I suppose,” she said, and dropped it without waiting for thanks. The boy mumbled something. She was halfway to her door when she stopped, went back, and set a bowl of ripe plums on top of the wall.',
    statement: 'The writer presents Mrs Okoro as an unfriendly character.',
    judge: 'I agree to some extent, because the writer makes her seem cold at first but ends with a quiet act of kindness.',
    aboutOpen: 'The extract is about a woman called Mrs Okoro who gives a ball back to a boy and then leaves him some plums.',
    supports: [
      {
        quote: 'kept her gate padlocked and her curtains drawn',
        why: 'The lock and the curtains show her shutting the world out, so she seems closed and unwelcoming.',
        retell: 'This shows that Mrs Okoro had a padlock on her gate and that she kept her curtains closed.',
        wrongWhy: 'The lock and the curtains show that she is proud of her home, so she seems warm and welcoming.',
      },
      {
        quote: 'dropped it without waiting for thanks',
        why: 'The verb “dropped” shows that she wants the meeting over quickly, so she seems curt and unfriendly.',
        retell: 'This shows that Mrs Okoro let go of the ball before the boy had the chance to say thank you.',
        wrongWhy: 'The verb “dropped” shows that she is playing a game with the boy, so she seems playful and friendly.',
      },
    ],
    against: { quote: 'set a bowl of ripe plums on top of the wall', point: 'the bowl of plums reveals a kindness she hides' },
    neutral: ['When the ball came over the wall for the third time that week', 'The boy mumbled something'],
    retell: 'Mrs Okoro has a padlock on her gate. A ball comes over the wall, and she gives it back to the boy and then puts some plums on the wall.',
    noEvidence: 'I agree with the statement because Mrs Okoro seems like a grumpy old lady, and I think people like that are never nice to children.',
    noEffect: 'The writer uses a simile, some speech and details about her house. These are all techniques that writers often use in their stories.',
    conclusion: 'I partly agree: her locked gate and curt words make her seem unfriendly, although the bowl of plums reveals a kindness she hides.',
    overAgree: 'I completely agree: every single detail shows that Mrs Okoro is unfriendly, and nothing in the extract suggests any kindness at all.',
    overDisagree: 'I completely disagree: Mrs Okoro gives the boy plums, which proves that she is warm and friendly from the first line to the last.',
  },
  {
    title: 'The Last Minute',
    text: 'It had rained since noon, and the pitch was heavy. With a minute left, the whole ground seemed to hold its breath. Ife took the ball on her chest, turned, and for one second saw nothing but green space and the white posts beyond it. The crowd rose like a wave. She struck it. Somewhere behind her a whistle blew, long and flat, and the linesman’s flag was already up.',
    statement: 'The writer creates a mood of excitement.',
    judge: 'I agree to a large extent, because the writer builds excitement towards the shot before the ending cuts it short.',
    aboutOpen: 'The extract is about a footballer called Ife who shoots at goal in the last minute of a match on a wet day.',
    supports: [
      {
        quote: 'the whole ground seemed to hold its breath',
        why: 'The personification makes the entire crowd seem to wait as one, so the reader shares the suspense.',
        retell: 'This shows that everybody in the ground went quiet when there was one minute left to play.',
        wrongWhy: 'The personification makes the entire crowd seem bored and sleepy, so the reader loses interest.',
      },
      {
        quote: 'She struck it.',
        why: 'The short sentence arrives as suddenly as the shot itself, so the reader feels the thrill of the moment.',
        retell: 'This shows that Ife kicked the ball towards the goal after she had turned and seen the white posts.',
        wrongWhy: 'The short sentence slows the action right down, so the reader feels calm and relaxed at this moment.',
      },
    ],
    against: { quote: 'a whistle blew, long and flat', point: 'the flat whistle ends the passage in disappointment' },
    neutral: ['It had rained since noon, and the pitch was heavy', 'Ife took the ball on her chest, turned'],
    retell: 'There is one minute left in the match. Ife gets the ball, turns and shoots, and then the whistle blows and the linesman’s flag goes up.',
    noEvidence: 'I agree with the statement because football matches are always exciting, and I think the end of a close game is the best part of all.',
    noEffect: 'The writer uses personification, a simile and a short sentence. These are all techniques that writers often use in their stories.',
    conclusion: 'I mostly agree: the held breath and the sudden shot build real excitement, although the flat whistle ends the passage in disappointment.',
    overAgree: 'I completely agree: every single detail in the extract is exciting, and the ending is the most thrilling and joyful moment of them all.',
    overDisagree: 'I completely disagree: the whistle blows at the end, which proves that nothing exciting happens anywhere in the whole of the extract.',
  },
  {
    title: 'The Empty House',
    text: 'The house had been empty for nine years, and it did not seem pleased to have company. He had the keys in one hand and a torch in the other. Every stair complained under Tariq’s feet. In the kitchen a tap dripped into a sink the colour of old teeth, and the wallpaper hung in long strips like peeling skin. Then he opened the last door. Sunlight filled the room, and on the windowsill someone had left a jar of marbles, every one of them shining.',
    statement: 'The writer makes the house seem frightening.',
    judge: 'I agree to a large extent, because the writer makes the house seem alive and decaying until the final room.',
    aboutOpen: 'The extract is about a boy called Tariq who explores a house that has been standing empty for nine years.',
    supports: [
      {
        quote: 'the wallpaper hung in long strips like peeling skin',
        why: 'The simile compares the house to a damaged body, so the reader finds the place disturbing.',
        retell: 'This shows that the wallpaper in the kitchen was coming away from the walls in strips.',
        wrongWhy: 'The simile compares the house to a comfortable bed, so the reader finds the place cosy.',
      },
      {
        quote: 'it did not seem pleased to have company',
        why: 'The personification gives the house a hostile mood of its own, so the reader feels that Tariq is unwelcome.',
        retell: 'This shows that the house had been empty for a long time and that somebody had now come inside it.',
        wrongWhy: 'The personification gives the house a cheerful mood of its own, so the reader feels that Tariq is welcome.',
      },
    ],
    against: { quote: 'on the windowsill someone had left a jar of marbles', point: 'the sunlit room of marbles ends on hope' },
    neutral: ['He had the keys in one hand and a torch in the other', 'Then he opened the last door'],
    retell: 'Tariq goes into a house that has been empty for nine years. He walks up the stairs, looks in the kitchen and then opens the last door.',
    noEvidence: 'I agree with the statement because empty houses are always creepy, and I think nobody would want to go into a place like that alone.',
    noEffect: 'The writer uses personification, a simile and some description of colour. These are all techniques that writers often use in stories.',
    conclusion: 'I mostly agree: the complaining stairs and peeling walls make the house frightening, although the sunlit room of marbles ends on hope.',
    overAgree: 'I completely agree: every single detail in the extract is frightening, and the final room is the most terrifying part of the house.',
    overDisagree: 'I completely disagree: the last room is full of sunlight, which proves that nothing in the house is frightening in any way at all.',
  },
];

export interface Task {
  /** What the writer is arguing, after "arguing that". */
  issue: string;
  /** Who the letter is to, and how it greets and closes. */
  letterTo: string;
  greeting: string;
  signOff: string;
  /** Where the article appears, and its headline. */
  articleIn: string;
  headline: string;
  /** Who hears the speech, and how it greets them. */
  speechTo: string;
  speechGreeting: string;
  /** The opening of each form. */
  articleOpen: string;
  letterOpen: string;
  speechOpen: string;
  /** The ending of each form. */
  articleEnd: string;
  letterEnd: string;
  speechEnd: string;
  /** One point made in five registers. */
  informal: string;
  formal: string;
  stillInformal: string;
  rude: string;
  changed: string;
}

export const TASKS: Task[] = [
  {
    issue: 'the town’s public library should stay open',
    letterTo: 'a local councillor', greeting: 'Dear Councillor Mensah,', signOff: 'Yours sincerely,',
    articleIn: 'your local newspaper', headline: 'Closing the Book on Our Town?',
    speechTo: 'a public meeting in the town hall', speechGreeting: 'Good evening, neighbours.',
    articleOpen: 'CLOSING THE BOOK ON OUR TOWN? The council calls it a saving. For the hundreds of us who use the library every week, it is a loss we cannot afford.',
    letterOpen: 'Dear Councillor Mensah, I am writing to ask you to reconsider the plan to close our public library, which serves hundreds of residents every week.',
    speechOpen: 'Good evening, neighbours. Look around this hall: nearly every one of us learned to love reading in the library that the council now wants to close.',
    articleEnd: 'A town without a library is a town that has stopped reading. Is that who we want to be?',
    letterEnd: 'I look forward to hearing how you intend to vote on the plan. Yours sincerely, Dara Okoye',
    speechEnd: 'So tonight, before you leave, sign the petition by the door. Thank you for listening.',
    informal: 'The council’s plan is totally rubbish and they haven’t got a clue.',
    formal: 'The council’s plan is short-sighted and has not been properly thought through.',
    stillInformal: 'The council’s plan is a bit of a joke, to be honest, and they need to sort it out.',
    rude: 'The council’s plan is the work of fools, and only an idiot could ever support it.',
    changed: 'The council’s plan is sensible and has clearly been thought through with great care.',
  },
  {
    issue: 'school uniform should no longer be compulsory',
    letterTo: 'your headteacher', greeting: 'Dear Mrs Castellano,', signOff: 'Yours sincerely,',
    articleIn: 'your school magazine', headline: 'Blazers Off: Time to Rethink Uniform',
    speechTo: 'a school assembly', speechGreeting: 'Good morning, everyone.',
    articleOpen: 'BLAZERS OFF: TIME TO RETHINK UNIFORM. Every morning nine hundred of us button up the same stiff blazer. Has anyone ever asked us what it is for?',
    letterOpen: 'Dear Mrs Castellano, I am writing on behalf of Year 10 to ask the school to review its uniform policy, which many students and parents find costly.',
    speechOpen: 'Good morning, everyone. Put your hand up if your blazer has ever been too hot, too tight or too expensive. Look around: that is nearly all of us.',
    articleEnd: 'A school is judged by what its students learn, not by what they wear. It is time our rules caught up.',
    letterEnd: 'I would welcome the chance to discuss this with you in person. Yours sincerely, Maya Lindqvist',
    speechEnd: 'So vote in Friday’s survey, and tell the school council what you think. Thank you for listening.',
    informal: 'Uniforms cost a bomb and loads of families can’t stand buying them.',
    formal: 'Uniforms are expensive, and many families struggle to meet the cost.',
    stillInformal: 'Uniforms are dead pricey, and plenty of families are fed up with paying for them.',
    rude: 'Uniforms are a rip-off, and whoever chose them obviously cares nothing for families.',
    changed: 'Uniforms are good value, and most families are happy to meet the cost.',
  },
  {
    issue: 'the empty car park should become a skatepark',
    letterTo: 'a local councillor', greeting: 'Dear Councillor Reyes,', signOff: 'Yours sincerely,',
    articleIn: 'your local newspaper', headline: 'Wheels, Not Weeds',
    speechTo: 'a meeting of the town’s residents', speechGreeting: 'Good evening, everyone.',
    articleOpen: 'WHEELS, NOT WEEDS. For three years the old car park on Mill Lane has grown nothing but dandelions. The town’s young people have a better idea.',
    letterOpen: 'Dear Councillor Reyes, I am writing to propose that the disused car park on Mill Lane be turned into a skatepark for the town’s young people.',
    speechOpen: 'Good evening, everyone. I want you to picture the car park on Mill Lane, not as it is tonight, cracked and empty, but as it could be next summer.',
    articleEnd: 'The space is there and the need is there. All that is missing is the will to join the two.',
    letterEnd: 'I would be grateful if you would raise this proposal at the next meeting. Yours sincerely, Sami Haddad',
    speechEnd: 'So come to the planning meeting on the ninth, and bring a neighbour. Thank you for listening.',
    informal: 'Kids round here have got nothing to do and it’s doing their heads in.',
    formal: 'Young people in this town have very few places to spend their free time.',
    stillInformal: 'Kids in this town are bored stiff because there is basically nowhere for them to go.',
    rude: 'Young people in this town are ignored by adults who are too selfish to notice them.',
    changed: 'Young people in this town already have plenty of places to spend their free time.',
  },
  {
    issue: 'the lunch break should be longer',
    letterTo: 'your headteacher', greeting: 'Dear Mr Abara,', signOff: 'Yours sincerely,',
    articleIn: 'your school newspaper', headline: 'Thirty Minutes Is Not a Lunch Hour',
    speechTo: 'the school council', speechGreeting: 'Good afternoon, fellow members of the council.',
    articleOpen: 'THIRTY MINUTES IS NOT A LUNCH HOUR. By the time the queue has moved, the bell has rung. Half of Year 9 eat their lunch walking to their next lesson.',
    letterOpen: 'Dear Mr Abara, I am writing to ask you to consider lengthening the lunch break, which at thirty minutes leaves many students without time to eat.',
    speechOpen: 'Good afternoon, fellow members of the council. Yesterday I timed the lunch queue: nineteen minutes. That left eleven minutes to eat, talk and rest.',
    articleEnd: 'Students who have eaten and rested learn better all afternoon. Fifteen more minutes is a small price.',
    letterEnd: 'I hope you will consider a trial of the longer break next term. Yours sincerely, Priya Raman',
    speechEnd: 'So I ask you to vote for a trial of the longer break next term. Thank you for listening.',
    informal: 'You can’t even get your food before the bell goes, which is a joke.',
    formal: 'Many students are unable to collect their food before the bell rings.',
    stillInformal: 'Loads of us barely get our food before the bell goes, which is a bit much really.',
    rude: 'Students cannot get their food in time because the staff are too lazy to serve it.',
    changed: 'Most students collect their food with plenty of time before the bell rings.',
  },
  {
    issue: 'the canteen should stop using single-use plastic',
    letterTo: 'the school’s governors, whose names you do not know', greeting: 'Dear Sir or Madam,', signOff: 'Yours faithfully,',
    articleIn: 'your school magazine', headline: 'Our Canteen’s Plastic Problem',
    speechTo: 'a school assembly', speechGreeting: 'Good morning, everyone.',
    articleOpen: 'OUR CANTEEN’S PLASTIC PROBLEM. Every lunchtime the bins by the hall fill with forks that were used for ten minutes. They will outlast all of us.',
    letterOpen: 'Dear Sir or Madam, I am writing to ask the governors to end the use of single-use plastic in the school canteen by the start of the next school year.',
    speechOpen: 'Good morning, everyone. Hold up the fork you used at lunch yesterday. You cannot, because it is in a bin, where it will stay for hundreds of years.',
    articleEnd: 'Metal forks can be washed and used for years. The plastic ones are used once, and they never truly leave.',
    letterEnd: 'I look forward to hearing the governors’ response to this request. Yours faithfully, Jonah Brandt',
    speechEnd: 'So this week, bring your own bottle, and sign the pledge in the hall. Thank you for listening.',
    informal: 'Chucking away tons of plastic every day is just mad when you think about it.',
    formal: 'Throwing away large amounts of plastic every day is wasteful and unnecessary.',
    stillInformal: 'Binning piles of plastic every single day is pretty crazy if you ask me.',
    rude: 'Throwing away plastic every day is what you would expect from people who do not care.',
    changed: 'Throwing away a little plastic every day is harmless and entirely necessary.',
  },
];
