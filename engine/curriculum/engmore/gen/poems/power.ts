/**
 * The Power and Conflict poems of a GCSE anthology (the AQA cluster of that name). The six poems in
 * the public domain are quoted exactly from the Project Gutenberg editions named in `source` (with
 * straight quotation marks and apostrophes made curly, and “--” printed as a dash). The nine poems
 * still in copyright are described in our own words and never quoted.
 */
import type { Poem } from '../poetry.ts';

export const POWER_THEMES = ['Power of nature', 'Abuse of power', 'Pride', 'Effects of conflict', 'Memory', 'Identity', 'Loss and grief', 'Fear', 'Protest', 'Patriotism'];

export const OZYMANDIAS: Poem = {
  title: 'Ozymandias',
  poet: 'Percy Bysshe Shelley',
  date: '1818',
  about: 'A traveller describes the ruins of a huge statue of a king in the desert: its boastful inscription survives, but nothing else of his empire does.',
  form: 'a sonnet with an irregular rhyme scheme',
  themes: ['Pride', 'Abuse of power', 'Power of nature'],
  quotations: [
    {
      text: 'Half sunk, a shattered visage lies, whose frown, / And wrinkled lip, and sneer of cold command,',
      lead: 'The traveller describes the statue’s broken face:',
      theme: 'Abuse of power',
      reading: 'The face still shows the king’s cruelty and contempt, but it lies broken and half buried, mocking the power it records.',
      misreadings: [
        'The face shows that the king was loved by his people, and the sculptor has carved his kindness so that it will last for ever in the sand.',
        'The face is described as shattered to show that the sculptor was careless, and that the statue was badly made from the start.',
        'The face shows a king who is sad and tired of ruling, and the poem asks the reader to pity him for the weight of his power.',
      ],
    },
    {
      text: '‘My name is Ozymandias, king of kings: / Look on my works, ye Mighty, and despair!’',
      lead: 'The words on the pedestal:',
      theme: 'Pride',
      reading: 'The king boasted that rulers would despair at his greatness; now the boast is ironic, because all his works have vanished.',
      misreadings: [
        'The king humbly warns other rulers that power does not last, and asks them to despair at how quickly empires fall into ruin.',
        'The words are the sculptor’s joke at the king’s expense, carved in secret so that travellers would laugh at him in the future.',
        'The king’s words prove that his empire is still standing, so the travellers who read them are right to despair at its strength.',
      ],
    },
    {
      text: 'Nothing beside remains.',
      lead: 'Straight after the inscription:',
      theme: 'Power of nature',
      reading: 'The blunt, short sentence after the boast shows that time and nature have destroyed everything the king built.',
      misreadings: [
        'The short sentence shows that the traveller is bored by the statue and wants to move on quickly to describe more of the desert.',
        'The sentence means that the king’s people took everything with them when they left, so the empire moved somewhere else.',
        'The sentence shows that the statue is the most important thing in the desert, and that the king’s power still controls the land.',
      ],
    },
    {
      text: 'The lone and level sands stretch far away.',
      lead: 'The last line of the poem:',
      theme: 'Power of nature',
      reading: 'The alliteration and the empty, endless sand show that nature and time outlast any empire, making the king insignificant.',
      misreadings: [
        'The empty sand shows that the king’s empire was always tiny, so the poem is about a minor ruler who was never really powerful.',
        'The sand stretching far away shows that the traveller is lost, and the poem ends with his fear of dying alone in the desert.',
        'The level sand shows that the king flattened the land to build his cities, so the image celebrates what his power achieved.',
      ],
    },
  ],
  context: [
    {
      ask: 'Why might Shelley, a Romantic poet with radical views, have written “Ozymandias”?',
      right: 'To show that the power of tyrants is temporary',
      wrong: ['To celebrate the great kings of ancient Egypt', 'To persuade readers to travel to Egypt and see its ruins', 'To praise the sculptor for making a statue that lasted for ever'],
      sol: 'Shelley opposed tyranny and the abuse of power. The ruined statue shows that even the mightiest ruler is brought down by time, so his arrogance is pointless.',
    },
    {
      ask: 'How does the way “Ozymandias” is narrated distance the reader from the king?',
      right: 'The speaker retells what a traveller said, who reads what a sculptor carved',
      wrong: ['The king speaks directly to the reader throughout the poem', 'The poem is a letter written by the king to his son', 'The sculptor tells the story of the king’s life in the first person'],
      sol: 'The poem is a frame narrative: the speaker reports a traveller, who describes a statue made by a sculptor, which shows the king. The layers make the once-mighty king seem distant and small.',
    },
  ],
  source: 'First published in *The Examiner*, January 1818. Quoted from *The Complete Poetical Works of Percy Bysshe Shelley*, Project Gutenberg eBook #4800.',
};

export const LONDON: Poem = {
  title: 'London',
  poet: 'William Blake',
  date: '1794',
  about: 'A speaker walks through the city and sees suffering in every face he meets, blaming the church, the monarchy and the people with power for the misery of the poor.',
  form: 'four regular rhyming quatrains',
  themes: ['Abuse of power', 'Protest', 'Loss and grief'],
  quotations: [
    {
      text: 'I wander through each chartered street, / Near where the chartered Thames does flow,',
      lead: 'The opening lines:',
      theme: 'Abuse of power',
      reading: 'Repeating “chartered” suggests that even the streets and the river are owned and controlled by the powerful.',
      misreadings: [
        'The word “chartered” shows that the speaker has a map, and that he knows London so well that he can wander anywhere he likes.',
        'The speaker is enjoying a relaxed walk beside the river, and the lines celebrate the beauty and freedom of the city.',
        'The repeated word shows that the streets were well planned by the city’s rulers, who made London a fair place to live.',
      ],
    },
    {
      text: 'The mind-forged manacles I hear:',
      lead: 'Listening to the cries of the people:',
      theme: 'Abuse of power',
      reading: 'The people are chained by ideas imposed on them and by their acceptance of authority, so they are oppressed in mind.',
      misreadings: [
        'The people are literally in chains, because the speaker is walking past a prison where criminals are held in manacles.',
        'The speaker hears the people inventing clever new machines, and praises the city’s factories for their progress.',
        'The people’s minds are free and strong, and the speaker admires how they have broken out of their chains.',
      ],
    },
    {
      text: 'How the chimney-sweeper’s cry / Every blackening church appals,',
      lead: 'The third stanza:',
      theme: 'Protest',
      reading: 'The church is blackened by soot and by guilt, because it lets child chimney sweeps suffer and does nothing to help.',
      misreadings: [
        'The church is being cleaned by the chimney sweeps, so the lines show that the church gives poor children useful work.',
        'The chimney sweep’s cry is a happy song, and the church is pleased to hear children singing as they work.',
        'The church is blackened only because it is old, and the lines simply describe the dirty buildings of London.',
      ],
    },
    {
      text: 'And the hapless soldier’s sigh / Runs in blood down palace-walls.',
      lead: 'Still in the third stanza:',
      theme: 'Effects of conflict',
      reading: 'Soldiers suffer and die for their rulers, and the blood on the palace walls blames the monarchy for their deaths.',
      misreadings: [
        'The soldier is guarding the palace proudly, and the lines celebrate his loyalty and courage in serving the king.',
        'The soldier has been wounded in an accident at the palace, and the king kindly takes care of him.',
        'The blood on the walls is paint, and the lines describe the palace being decorated for a royal celebration.',
      ],
    },
  ],
  context: [
    {
      ask: 'What was happening when Blake wrote “London” in 1794?',
      right: 'Revolution in France had challenged kings, while London’s poor suffered',
      wrong: ['Britain had just won the First World War against Germany and its allies', 'London had just been rebuilt in stone after the Great Fire of London', 'Queen Victoria had just begun her long and peaceful reign over Britain'],
      sol: 'The French Revolution of 1789 had overthrown a monarchy, and radicals like Blake questioned the power of kings and the church, while London’s poor, including child chimney sweeps, lived in misery.',
    },
    {
      ask: 'What does the steady, regular rhythm of “London” suggest?',
      right: 'The trudge of the speaker’s walk and the unending misery',
      wrong: ['The excitement of a lively and joyful capital city', 'A dance that the people of London perform together', 'The speaker’s relief at escaping from the busy city'],
      sol: 'The poem is four regular quatrains with a steady beat, like footsteps. The regularity suggests that the suffering is everywhere and never stops.',
    },
  ],
  source: 'From *Songs of Experience*, 1794. Quoted from *Songs of Innocence and of Experience*, Project Gutenberg eBook #1934.',
};

export const PRELUDE: Poem = {
  title: 'Extract from The Prelude',
  poet: 'William Wordsworth',
  date: '1850',
  about: 'The speaker remembers taking a boat out on a lake at night as a boy, until a huge mountain seemed to rise up and follow him, leaving him troubled for days.',
  form: 'blank verse (unrhymed iambic pentameter)',
  themes: ['Power of nature', 'Fear', 'Memory'],
  quotations: [
    {
      text: 'It was an act of stealth / And troubled pleasure,',
      lead: 'The boy takes the boat:',
      theme: 'Fear',
      reading: 'He knows that taking the boat is wrong, so his enjoyment is mixed with guilt and a hint of the fear to come.',
      misreadings: [
        'He has permission to take the boat, and the lines show his calm, untroubled pleasure in a peaceful evening on the lake.',
        'He is angry that someone has stolen his own boat, and he sets out to find the thief and bring it back.',
        'He is a skilled sailor, and the lines show that he feels no fear at all on the water at night.',
      ],
    },
    {
      text: 'like one who rows, / Proud of his skill,',
      lead: 'Rowing out across the lake:',
      theme: 'Pride',
      reading: 'The boy is confident and proud of his rowing, which makes his humbling by the mountain all the more powerful.',
      misreadings: [
        'The boy is ashamed of how badly he rows, and he worries that people on the shore will laugh at him.',
        'The boy is racing another boat, and the lines show his pride in winning the race across the lake.',
        'The boy is pretending to row while the boat drifts, so the lines show how lazy and careless he is.',
      ],
    },
    {
      text: 'a huge peak, black and huge, / As if with voluntary power instinct / Upreared its head.',
      lead: 'Then a mountain appears:',
      theme: 'Power of nature',
      reading: 'Repeating “huge” and giving the peak a will of its own makes nature seem alive, threatening and far mightier than him.',
      misreadings: [
        'The boy admires the mountain as a beautiful view, and the lines show his calm delight in the scenery around the lake.',
        'The mountain is a landslide falling into the lake, and the lines describe the physical danger it causes to the boat.',
        'The peak is small and distant, and the boy only imagines it is large because he is tired from rowing.',
      ],
    },
    {
      text: 'With trembling oars I turned,',
      lead: 'The boy’s reaction:',
      theme: 'Fear',
      reading: 'His confidence collapses into fear: the “trembling” oars show him shaking as he retreats from nature’s power.',
      misreadings: [
        'The oars tremble because the lake is rough, and the boy turns back calmly because the weather is getting worse.',
        'The boy turns the boat around to race the mountain, showing his excitement and his pride in his strength.',
        'The oars are old and broken, so the boy has to turn back to buy new ones before he can row again.',
      ],
    },
    {
      text: 'But huge and mighty forms, that do not live / Like living men, moved slowly through the mind / By day, and were a trouble to my dreams.',
      lead: 'In the days afterwards:',
      theme: 'Memory',
      reading: 'The experience stays with him: the mountain’s shapes haunt his thoughts and dreams, changing how he sees nature.',
      misreadings: [
        'He forgets the evening at once, and the lines show that he goes back to his happy, ordinary life without a care.',
        'He dreams of the men who own the boat, and fears that they will come to punish him for taking it.',
        'He enjoys the dreams, and the lines show that the mountain has become a comforting friend to him.',
      ],
    },
  ],
  context: [
    {
      ask: 'What is *The Prelude*, from which this extract is taken?',
      right: 'A long poem about the growth of Wordsworth’s own mind',
      wrong: ['A verse play about a shipwreck off the Lake District coast', 'A collection of hymns that Wordsworth wrote for children', 'A novel in verse about a young sailor’s adventures at sea'],
      sol: 'The Prelude is a long autobiographical poem, published after Wordsworth’s death in 1850, about how nature and experience shaped him from childhood.',
    },
    {
      ask: 'How does the mood of the extract change?',
      right: 'From confident pleasure to fear, then a lasting unease',
      wrong: ['From fear to joy, as the boy finally learns to row', 'From anger to calm, as the storm over the lake passes', 'It stays peaceful and happy from beginning to end'],
      sol: 'The boy sets out proud and excited, the mountain turns his pleasure to fear, and he is left troubled for days. As a Romantic poet, Wordsworth shows nature’s power to shape and humble us.',
    },
  ],
  source: 'From *The Prelude*, Book 1, published 1850. Quoted from *The Poetical Works of William Wordsworth*, Volume 3, edited by William Knight, Project Gutenberg eBook #12383.',
};

export const LAST_DUCHESS: Poem = {
  title: 'My Last Duchess',
  poet: 'Robert Browning',
  date: '1842',
  about: 'A duke shows a visitor a portrait of his late wife, complaining that she smiled at everyone, and hints that he had her killed, while he arranges his next marriage.',
  form: 'a dramatic monologue in rhyming couplets',
  themes: ['Abuse of power', 'Pride', 'Identity'],
  quotations: [
    {
      text: 'That’s my last Duchess painted on the wall, / Looking as if she were alive.',
      lead: 'The duke’s opening words:',
      theme: 'Abuse of power',
      reading: 'The possessive “my” and the word “last” suggest she was one in a series of possessions, and “as if she were alive” hints at her death.',
      misreadings: [
        'The duke lovingly remembers his wife, and the lines show how much he misses her and treasures her portrait.',
        'The duke is describing a portrait he has just bought, of a woman he has never met, because he collects paintings.',
        'The word “last” means that she was the duke’s final and favourite wife, whom he loved more than anyone.',
      ],
    },
    {
      text: 'since none puts by / The curtain I have drawn for you, but I',
      lead: 'Explaining the curtain over the portrait:',
      theme: 'Abuse of power',
      reading: 'Even after her death, the duke controls who may look at her, showing his need to possess his wife completely.',
      misreadings: [
        'The duke covers the portrait because it is valuable and fragile, and he wants to keep the sunlight off the paint.',
        'The duke cannot bear to look at his wife’s face, so he hides the portrait out of grief for her.',
        'Anyone in the house may open the curtain, and the duke is simply showing his visitor how the curtain works.',
      ],
    },
    {
      text: 'My gift of a nine-hundred-years-old name',
      lead: 'Complaining that she thanked everyone alike:',
      theme: 'Pride',
      reading: 'The duke is outraged that she valued his ancient name no more than small kindnesses, showing his arrogance about status.',
      misreadings: [
        'The duke is modest about his family, and he is pleased that his wife treated everyone equally, whatever their rank.',
        'The duke gave his wife an old book as a present, and he is upset that she lost it soon after the wedding.',
        'The duke is embarrassed by his old family name, and he wishes his wife had married someone more modern.',
      ],
    },
    {
      text: 'I gave commands; / Then all smiles stopped together.',
      lead: 'The turning point of the monologue:',
      theme: 'Abuse of power',
      reading: 'The calm, brief statement implies that the duke had his wife killed, and shows how easily he uses his power.',
      misreadings: [
        'The duke asked his wife to stop smiling, and she agreed happily, so the marriage became peaceful again.',
        'The duke ordered a party to end early because the guests were laughing too loudly at his jokes.',
        'The duke gave commands to his servants to cheer his wife up, but she stayed sad until she died of illness.',
      ],
    },
  ],
  context: [
    {
      ask: 'Who is the speaker of “My Last Duchess” thought to be based on?',
      right: 'Alfonso II, a powerful Duke of Ferrara in the 1500s',
      wrong: ['Robert Browning himself, writing about his own marriage', 'King Henry VIII of England, who had six wives', 'Frà Pandolf, the painter who worked for the duke'],
      sol: 'The poem is set in Renaissance Italy. The duke is usually linked to Alfonso II, Duke of Ferrara, whose young first wife died in suspicious circumstances.',
    },
    {
      ask: 'Why is it effective that “My Last Duchess” is a dramatic monologue in rhyming couplets?',
      right: 'The duke gives himself away; the neat couplets mirror his control',
      wrong: ['The duchess is able to answer the duke in alternate lines of verse', 'A narrator can tell us exactly what the duchess thought of him', 'The rhyme turns the poem into a cheerful song for a wedding day'],
      sol: 'Only the duke speaks, so he gives himself away. The rhyming couplets are tightly controlled, but run-on lines hide the rhyme, like the menace beneath his polished manners.',
    },
  ],
  source: 'First published in *Dramatic Lyrics*, 1842. Quoted from *The Complete Poetic and Dramatic Works of Robert Browning*, Cambridge Edition, Project Gutenberg eBook #50954.',
};

export const LIGHT_BRIGADE: Poem = {
  title: 'The Charge of the Light Brigade',
  poet: 'Alfred, Lord Tennyson',
  date: '1854',
  about: 'Six hundred cavalrymen obey a mistaken order and charge into a valley of enemy guns, and the poem honours their courage as many of them are killed.',
  form: 'six stanzas with a galloping dactylic rhythm',
  themes: ['Patriotism', 'Effects of conflict', 'Abuse of power'],
  quotations: [
    {
      text: 'Half a league, half a league, / Half a league onward,',
      lead: 'The opening lines:',
      theme: 'Patriotism',
      reading: 'The repeated phrase and its galloping rhythm imitate the horses’ hooves, carrying us forward with the brave charge.',
      misreadings: [
        'The repetition shows that the soldiers are lost and riding in circles, unable to find the enemy.',
        'The repeated phrase measures how slowly the soldiers are walking, because their horses are exhausted.',
        'The lines show that the soldiers are retreating, counting the distance they have run away from the guns.',
      ],
    },
    {
      text: 'Was there a man dismay’d? / Not tho’ the soldier knew',
      lead: 'The second stanza, as the soldiers learn that someone has blundered:',
      theme: 'Abuse of power',
      reading: 'The soldiers knew a commander had made a mistake, yet none lost heart, so the poem hints at their leaders’ error.',
      misreadings: [
        'The soldiers blame each other for losing their way, and they argue about who made the mistake.',
        'The commander’s plan was perfect, and the soldiers knew it would lead them to an easy victory.',
        'The soldiers decide to disobey the order because they know it is a mistake, and they refuse to charge.',
      ],
    },
    {
      text: 'Their’s not to reason why, / Their’s but to do and die,',
      lead: 'Still in the second stanza:',
      theme: 'Patriotism',
      reading: 'The soldiers’ duty is to obey without question, even to death, and the poem presents this obedience as heroic.',
      misreadings: [
        'The soldiers are encouraged to question their orders, and the poem argues that thinking for yourself wins wars.',
        'The lines mock the soldiers as stupid, because they do not understand the reasons for the war.',
        'The lines show that the soldiers want to go home, and that they are afraid of dying in the battle.',
      ],
    },
    {
      text: 'Into the jaws of Death, / Into the mouth of Hell',
      lead: 'The third stanza:',
      theme: 'Effects of conflict',
      reading: 'Death is pictured as a monster swallowing the soldiers, showing the terrible danger they ride into.',
      misreadings: [
        'The soldiers ride into a cave in the valley, and the lines describe the rocky landscape where the battle takes place.',
        'The lines show the soldiers’ fear turning into panic, as they turn their horses around and flee from the guns.',
        'The lines describe the enemy as cowards who are running away from the brave British soldiers.',
      ],
    },
    {
      text: 'Honour the charge they made! / Honour the Light Brigade,',
      lead: 'The final stanza:',
      theme: 'Patriotism',
      reading: 'The imperatives command the reader to honour the soldiers, turning a military disaster into a celebration of courage.',
      misreadings: [
        'The speaker angrily demands that the commander who gave the order be punished for the soldiers’ deaths.',
        'The lines are spoken by the enemy, who admit that the British soldiers defeated them in the battle.',
        'The speaker asks the reader to forget the charge, because it was a shameful defeat for the British army.',
      ],
    },
  ],
  context: [
    {
      ask: 'What event is “The Charge of the Light Brigade” about?',
      right: 'A cavalry charge at Balaclava in the Crimean War, 1854',
      wrong: ['A cavalry charge at the Battle of Hastings in 1066', 'An attack on the Western Front in the First World War', 'The defeat of the Spanish Armada at sea in 1588'],
      sol: 'At Balaclava in October 1854, a misunderstood order sent British light cavalry charging at Russian guns, and many were killed. Tennyson wrote the poem soon after reading reports of the battle.',
    },
    {
      ask: 'Tennyson was Poet Laureate when he wrote the poem. How does this help to explain its tone?',
      right: 'As the nation’s poet, he honours the soldiers’ courage',
      wrong: ['He wanted to mock the army for losing the battle', 'He had ridden in the charge himself as a young man', 'He was writing a private love poem for his wife'],
      sol: 'As Poet Laureate, Tennyson wrote for the nation. The poem admits that “some one had blunder’d”, but its main purpose is to celebrate the soldiers’ heroism.',
    },
  ],
  source: 'First published in *The Examiner*, 9 December 1854. Quoted from *Maud, and Other Poems* (1855), Project Gutenberg eBook #56913.',
};

export const EXPOSURE: Poem = {
  title: 'Exposure',
  poet: 'Wilfred Owen',
  date: '1920',
  about: 'Soldiers in the trenches of the First World War wait through a freezing night and dawn, attacked not by the enemy but by the cold, as nothing happens.',
  form: 'eight five-line stanzas with half-rhymes',
  themes: ['Power of nature', 'Effects of conflict', 'Memory'],
  quotations: [
    {
      text: 'Our brains ache, in the merciless iced east winds that knife us',
      lead: 'The first line:',
      theme: 'Power of nature',
      reading: 'The wind is personified as a merciless attacker with a knife, so the weather, not the enemy, is the real foe.',
      misreadings: [
        'The soldiers have been stabbed by enemy soldiers in a surprise attack during the night.',
        'The soldiers are thinking hard about their battle plans, and the wind helps them to stay alert.',
        'The east wind is a gentle breeze that refreshes the tired soldiers after a long day of fighting.',
      ],
    },
    {
      text: 'But nothing happens.',
      lead: 'The refrain that ends several stanzas:',
      theme: 'Effects of conflict',
      reading: 'The repeated short line shows the boredom and futility of trench warfare: the soldiers suffer while waiting for nothing.',
      misreadings: [
        'The line shows that the soldiers are safe and happy, because the war has ended and nothing dangerous happens.',
        'The line shows that the soldiers are too lazy to fight, and the poem criticises them for doing nothing.',
        'The line is a joke, because the soldiers have just won a great victory and want to sound modest about it.',
      ],
    },
    {
      text: 'Dawn massing in the east her melancholy army / Attacks once more in ranks on shivering ranks of gray,',
      lead: 'Morning arrives:',
      theme: 'Power of nature',
      reading: 'Dawn is pictured as an enemy army, so the new day brings no hope, only another attack by the cold.',
      misreadings: [
        'The enemy army attacks at dawn, and the soldiers fight bravely to defend their trench against them.',
        'Dawn brings warmth and hope, and the soldiers feel cheerful as the sun rises over the trenches.',
        'The soldiers line up in grey uniforms at dawn to march home, because their part in the war is over.',
      ],
    },
    {
      text: 'Slowly our ghosts drag home:',
      lead: 'The soldiers drift into dreams:',
      theme: 'Memory',
      reading: 'Numbed, the soldiers imagine going home as ghosts, suggesting they are close to death and cut off from home.',
      misreadings: [
        'The soldiers are given leave and walk slowly home to see their families after the battle.',
        'The soldiers see real ghosts in the trenches, and the poem becomes a supernatural horror story.',
        'The soldiers are dragging heavy supplies back to their camp, and the work makes them tired.',
      ],
    },
    {
      text: 'All their eyes are ice,',
      lead: 'The burial party in the last stanza:',
      theme: 'Effects of conflict',
      reading: 'The dead are frozen and the living numbed by cold and horror, so war destroys body and feeling alike.',
      misreadings: [
        'The soldiers are wearing goggles against the snow, so their eyes look shiny and pale like ice.',
        'The soldiers have bright, clear eyes because they are healthy and well rested after a quiet night.',
        'The soldiers are crying with joy at the news that the war has ended, and their tears have frozen.',
      ],
    },
  ],
  context: [
    {
      ask: 'What do we know about Wilfred Owen that shapes “Exposure”?',
      right: 'He fought in the trenches and was killed in 1918',
      wrong: ['He was a general who planned the battles from far away', 'He wrote about a war that had happened a century earlier', 'He was a journalist who reported on the war from London'],
      sol: 'Owen served as an officer in the trenches and wrote from experience. He was killed in November 1918, and his poems were published after his death, in 1920.',
    },
    {
      ask: 'Owen uses half-rhymes such as “knife us” and “nervous”. What is their effect?',
      right: 'They sound uneasy and unfinished, like the waiting',
      wrong: ['They make the poem sound like a cheerful marching song', 'They show that Owen had not learned how to rhyme', 'They make every single stanza end on a happy note'],
      sol: 'Half-rhyme (pararhyme) nearly matches but not quite. The jarring, unresolved sound mirrors the soldiers’ unease and the sense that nothing is resolved.',
    },
  ],
  source: 'Written in 1917 and first published in *Poems* (1920), edited by Siegfried Sassoon. Quoted from Project Gutenberg eBook #1034.',
};

/** The poems still in copyright: described in our own words, never quoted. */
const notQuoted = (published: string) => `First published in ${published}. In copyright, so it is described here in our own words and not quoted.`;

export const STORM_ISLAND: Poem = {
  title: 'Storm on the Island',
  poet: 'Seamus Heaney',
  date: '1966',
  about: 'Islanders who have built their houses strong against the weather describe a storm that attacks them, and admit that what they fear is a force they cannot even see.',
  form: 'a single stanza of blank verse',
  themes: ['Power of nature', 'Fear'],
  moments: [
    {
      what: 'At first the speaker sounds confident: the islanders have prepared, building their houses low and solid against storms.',
      theme: 'Power of nature',
      reading: 'The calm confidence at the start makes the later fear stronger: preparing cannot fully protect people.',
      misreadings: ['The opening shows that the islanders have tamed nature completely, so the storm cannot harm them.', 'The opening describes a holiday island where visitors relax and enjoy the summer sunshine.', 'The opening shows that the islanders are careless people who have not prepared for storms.'],
    },
    {
      what: 'By the end, the speaker admits that the islanders are afraid of something invisible: nothing they can see is attacking them, yet they feel under attack.',
      theme: 'Fear',
      reading: 'The greatest fear is of a power that cannot be seen or fought, which some readers link to Northern Ireland.',
      misreadings: ['The ending shows that the storm has passed, and the islanders laugh at how frightened they were.', 'The ending reveals that the storm was only a dream, and the speaker wakes up safe in his bed.', 'The ending shows that the islanders have left the island for good to live on the mainland.'],
    },
  ],
  context: [
    {
      ask: 'Why do some readers link Heaney’s “Storm on the Island” to more than the weather?',
      right: 'Heaney was from Northern Ireland; the storm can suggest its violence',
      wrong: ['Heaney wrote it while he was on a long holiday in the Caribbean', 'It began as a weather report that Heaney wrote for a newspaper', 'Heaney had never seen the sea, so he had to imagine all of it'],
      sol: 'Heaney was from Northern Ireland, and the title has been read as a pun on Stormont, its parliament. The unseen threat can suggest the tension that led to the Troubles.',
    },
  ],
  source: notQuoted('*Death of a Naturalist* (1966)'),
};

export const BAYONET: Poem = {
  title: 'Bayonet Charge',
  poet: 'Ted Hughes',
  date: '1957',
  about: 'A soldier in the First World War suddenly finds himself running at the enemy, and in the middle of the charge he loses all sense of why he is fighting.',
  form: 'three stanzas of free verse',
  themes: ['Effects of conflict', 'Fear', 'Patriotism'],
  moments: [
    {
      what: 'The poem begins in the middle of the action: the soldier is suddenly running, as if he has only just come to, stumbling across the field.',
      theme: 'Effects of conflict',
      reading: 'Starting mid-action plunges us into the chaos of battle, where he acts before he thinks.',
      misreadings: ['The opening shows the soldier carefully planning his attack before the battle begins.', 'The opening describes a peaceful morning in the English countryside before the war.', 'The opening shows the soldier training at a camp a long way from the real fighting.'],
    },
    {
      what: 'In the middle stanza the soldier stops, bewildered, and wonders why he is running at all.',
      theme: 'Patriotism',
      reading: 'The pause shows that ideals like honour and country mean nothing in the terror of battle.',
      misreadings: ['The pause shows the soldier proudly remembering his duty to his king and country.', 'The pause shows the soldier stopping to rest because his side has won the battle.', 'The pause shows the soldier deciding to surrender to the enemy soldiers ahead.'],
    },
    {
      what: 'A hare, caught in the gunfire, thrashes in agony in front of the soldier.',
      theme: 'Effects of conflict',
      reading: 'The suffering hare mirrors the soldier’s own panic, showing that war harms everything in its path.',
      misreadings: ['The hare is the soldier’s pet, and he stops in the charge to rescue it from the field.', 'The hare is a sign of good luck, showing that the soldier will survive the war.', 'The hare shows that the countryside is peaceful and untouched by the fighting.'],
    },
  ],
  context: [
    {
      ask: 'Ted Hughes did not fight in the First World War. What shaped “Bayonet Charge”?',
      right: 'His father’s experiences of fighting in the war',
      wrong: ['His own time as a general in the war', 'A film about the war that he had watched', 'Letters from a soldier in the Crimean War'],
      sol: 'Hughes’s father fought in the First World War and survived Gallipoli. Hughes imagines the experience of a single soldier in a charge.',
    },
  ],
  source: notQuoted('*The Hawk in the Rain* (1957)'),
};

export const REMAINS: Poem = {
  title: 'Remains',
  poet: 'Simon Armitage',
  date: '2008',
  about: 'A soldier tells how he and others shot a looter during a war in the Middle East, and how the memory of the dead man stays with him long after he comes home.',
  form: 'a dramatic monologue in free verse',
  themes: ['Memory', 'Effects of conflict', 'Loss and grief'],
  moments: [
    {
      what: 'At first the soldier tells the story casually, in everyday speech, as if it were an ordinary anecdote.',
      theme: 'Effects of conflict',
      reading: 'The casual tone suggests killing has become routine for him, which makes the later guilt striking.',
      misreadings: ['The casual tone shows that the soldier is proud of what he did and feels no guilt at all.', 'The casual tone shows that the whole story is invented and that it never really happened.', 'The casual tone shows that the soldier is telling a funny story to amuse his friends.'],
    },
    {
      what: 'Back home, the soldier cannot escape the memory: he sees the dead man whenever he shuts his eyes, and nothing he takes to forget it helps.',
      theme: 'Memory',
      reading: 'The memory haunts him, showing the lasting mental harm of war, such as post-traumatic stress.',
      misreadings: ['The soldier forgets the shooting quickly and enjoys his ordinary life back at home.', 'The soldier is visited by the real ghost of the dead man, who wants his revenge.', 'The soldier misses the excitement of the war and wants to go back to fight again.'],
    },
  ],
  context: [
    {
      ask: 'What is “Remains” based on?',
      right: 'Interviews with real soldiers about recent wars',
      wrong: ['Armitage’s own time as a soldier in Iraq', 'A newspaper story about a robbery in London', 'The diary of a First World War officer'],
      sol: 'Armitage wrote the poem from soldiers’ testimony for a documentary, The Not Dead, about the mental effects of war. It is told in a soldier’s own voice.',
    },
  ],
  source: notQuoted('*The Not Dead* (2008)'),
};

export const POPPIES: Poem = {
  title: 'Poppies',
  poet: 'Jane Weir',
  date: '2009',
  about: 'A mother describes the day her son left home to join the army, and afterwards visits a war memorial, struggling with her fear and grief.',
  form: 'four stanzas of free verse',
  themes: ['Loss and grief', 'Memory', 'Effects of conflict'],
  moments: [
    {
      what: 'Before her son leaves, the mother fixes a poppy on him and straightens his collar, resisting the urge to hold him close.',
      theme: 'Loss and grief',
      reading: 'The small, tender actions show her love and her fear of losing him as he grows up and leaves.',
      misreadings: ['The actions show that the mother is annoyed that her son looks so untidy for school.', 'The actions show that the mother is proud and excited that her son is joining up.', 'The actions show that the mother is getting her son ready for a family wedding.'],
    },
    {
      what: 'After he has gone, the mother walks to the war memorial and stands there, hoping to hear her son’s voice.',
      theme: 'Memory',
      reading: 'The memorial suggests she fears he may be dead, and the open ending leaves her grief unresolved.',
      misreadings: ['The memorial visit shows that she has forgotten her son and is moving on with her life.', 'The visit shows that her son has come home safely, and she goes there to celebrate.', 'The visit shows that she is a soldier herself, remembering her own past battles.'],
    },
  ],
  context: [
    {
      ask: 'How is “Poppies” different from many older war poems?',
      right: 'It shows war’s effect on a mother left at home',
      wrong: ['It describes the fighting in great detail', 'It celebrates the glory of winning a war', 'It is a general’s account of his tactics'],
      sol: 'Weir focuses on the grief and fear of those left behind. The poem was written for a collection of poems responding to the wars in Iraq and Afghanistan.',
    },
  ],
  source: notQuoted('2009, in a collection of new war poems commissioned by Carol Ann Duffy'),
};

export const WAR_PHOTOGRAPHER: Poem = {
  title: 'War Photographer',
  poet: 'Carol Ann Duffy',
  date: '1985',
  about: 'A photographer develops his pictures of war in his darkroom at home, remembering the suffering he saw, and knows that readers will glance at them and forget.',
  form: 'four six-line stanzas with a regular rhyme scheme',
  themes: ['Effects of conflict', 'Memory', 'Protest'],
  moments: [
    {
      what: 'His hands, which were steady at the scenes of war, now tremble as he develops the photographs at home.',
      theme: 'Memory',
      reading: 'Safe at home, the memories overwhelm him, showing the hidden cost of recording others’ suffering.',
      misreadings: ['His hands tremble because the darkroom is cold, and he is in a hurry to finish the job.', 'His hands tremble with excitement, because the photographs will make him famous.', 'His hands tremble because he is ill, and he must stop working as a photographer.'],
    },
    {
      what: 'He thinks about the readers of the Sunday newspapers, whose eyes will fill with tears for a moment before they get on with their day.',
      theme: 'Protest',
      reading: 'Duffy criticises a comfortable public who feel brief sympathy for war’s victims, then forget them.',
      misreadings: ['Duffy praises the readers for being so kind, because they care deeply about every victim.', 'Duffy suggests that the photographs are far too boring for readers to look at.', 'Duffy shows that readers are angry with the photographer for printing violent pictures.'],
    },
  ],
  context: [
    {
      ask: 'What inspired Carol Ann Duffy to write “War Photographer”?',
      right: 'Her friendship with war photographers',
      wrong: ['Her own time serving as a soldier', 'A painting of a battle in a museum', 'A holiday she once took in a war zone'],
      sol: 'Duffy was a friend of war photographers and was interested in the strange position of someone whose job is to record suffering without being able to stop it.',
    },
  ],
  source: notQuoted('*Standing Female Nude* (1985)'),
};

export const TISSUE: Poem = {
  title: 'Tissue',
  poet: 'Imtiaz Dharker',
  date: '2006',
  about: 'The speaker reflects on paper, from maps and receipts to the thin pages of a family Koran, and compares it with human skin and the fragile things people build.',
  form: 'free verse in short stanzas with a single last line',
  themes: ['Abuse of power', 'Identity', 'Power of nature'],
  moments: [
    {
      what: 'The speaker describes how a map, drawn on paper, can mark borders that people fight over, yet paper itself is thin and easily torn.',
      theme: 'Abuse of power',
      reading: 'Human power, like borders and buildings, is as fragile as paper, so our control is an illusion.',
      misreadings: ['The speaker praises maps for being strong and permanent records of a nation’s power.', 'The speaker is teaching the reader how to draw a careful map of their local area.', 'The speaker complains that paper maps are much less useful than modern phones.'],
    },
    {
      what: 'The poem ends by comparing paper to the skin of living people.',
      theme: 'Identity',
      reading: 'Life is as fragile and precious as paper, and our shared humanity matters more than what we build.',
      misreadings: ['The ending shows that people should write on their own skin instead of on sheets of paper.', 'The ending shows that paper is stronger than people, so it will outlast all of us.', 'The ending shows that the speaker is a doctor carefully examining a sick patient’s skin.'],
    },
  ],
  context: [
    {
      ask: 'What does the title “Tissue” suggest?',
      right: 'Both fragile paper and the tissue of the body',
      wrong: ['A handkerchief for wiping tears at a funeral', 'The name of a city that the speaker visited', 'A type of cloth that is used to make flags'],
      sol: 'The title works two ways: tissue paper and human tissue. Dharker links the fragility of paper with the fragility of human life and power.',
    },
  ],
  source: notQuoted('*The Terrorist at My Table* (2006)'),
};

export const EMIGREE: Poem = {
  title: 'The Émigrée',
  poet: 'Carol Rumens',
  date: '1993',
  about: 'A speaker remembers the city she left as a child, which is now said to be at war and ruled by tyrants, yet in her memory it is always full of sunlight.',
  form: 'three stanzas of free verse',
  themes: ['Memory', 'Identity', 'Abuse of power'],
  moments: [
    {
      what: 'The speaker insists that, whatever the news says, her memory of the city is bright and sunlit.',
      theme: 'Memory',
      reading: 'Her memory is a refuge the city’s troubles cannot touch, showing how we cling to places that shaped us.',
      misreadings: ['She admits that the city was always dark and miserable, and she is glad that she left it.', 'She is describing a holiday postcard of a faraway city that she has never actually visited.', 'She remembers the city as sunny only because she visited it in the warm summer months.'],
    },
    {
      what: 'At the end, the city seems to come to her, while she is watched and threatened where she now lives.',
      theme: 'Identity',
      reading: 'Her identity is tied to the lost city, and the ending suggests she is now an outsider at risk.',
      misreadings: ['The ending shows that she has returned home and is welcomed back with a celebration.', 'The ending shows that she has forgotten the city and feels quite at home where she lives now.', 'The ending shows that the city has been rebuilt as a busy holiday resort for tourists.'],
    },
  ],
  context: [
    {
      ask: 'What is an émigrée?',
      right: 'A woman who has left her country to live abroad',
      wrong: ['A woman who travels a great deal for her work', 'A soldier who has fought in a war overseas', 'A tourist who is away on a very long holiday'],
      sol: 'An émigrée is a woman who has emigrated, often forced out by war or tyranny. Rumens does not name the city, so the poem speaks for many exiles.',
    },
  ],
  source: notQuoted('*Thinking of Skins* (1993)'),
};

export const KAMIKAZE: Poem = {
  title: 'Kamikaze',
  poet: 'Beatrice Garland',
  date: '2013',
  about: 'A daughter tells her children how their grandfather, a Japanese suicide pilot in the Second World War, turned back from his mission and was shunned by his family.',
  form: 'seven six-line stanzas, mostly in the third person',
  themes: ['Patriotism', 'Identity', 'Memory'],
  moments: [
    {
      what: 'Flying over the sea, the pilot sees the fishing boats and the fish below, and remembers his childhood by the sea.',
      theme: 'Memory',
      reading: 'Nature’s beauty and memories of family draw him back to life, explaining why he turns back.',
      misreadings: ['The pilot sees the enemy fleet below him and prepares to attack it bravely and proudly.', 'The pilot is lost, and uses the fishing boats to find his way back to the target.', 'The pilot is bored by the long flight and counts the little boats to pass the time.'],
    },
    {
      what: 'When he returns, his wife and neighbours act as if he were invisible, and in time his children stop playing with him.',
      theme: 'Patriotism',
      reading: 'His family’s rejection shows the shame of failing in duty, so choosing life cost him his place.',
      misreadings: ['His family welcomes him home as a hero, delighted that he survived the war.', 'His family is too busy to notice him because they are celebrating the end of the war.', 'His family moves away to another country together to escape the war.'],
    },
  ],
  context: [
    {
      ask: 'Who were the kamikaze pilots?',
      right: 'Japanese pilots who crashed their planes into enemy ships',
      wrong: ['British pilots who fought in the Battle of Britain', 'Pilots who delivered food in the First World War', 'Test pilots who flew the very first jet planes'],
      sol: 'Kamikaze pilots were trained to crash their planes into enemy ships, dying for their country. Turning back was seen as deeply shameful.',
    },
  ],
  source: notQuoted('*The Invention of Fireworks* (2013)'),
};

export const CHECKING_OUT: Poem = {
  title: 'Checking Out Me History',
  poet: 'John Agard',
  about: 'A Caribbean speaker complains that his British education taught him nursery rhymes and British heroes but hid the Black and Caribbean heroes of his own history.',
  form: 'free verse in dialect, with sections in italics',
  themes: ['Identity', 'Protest', 'Abuse of power'],
  moments: [
    {
      what: 'The speaker lists the figures he was taught about, from nursery rhymes to British history, alongside the Caribbean and Black heroes he was never told of.',
      theme: 'Identity',
      reading: 'The contrast shows that his education ignored his heritage, so he must discover his own history.',
      misreadings: ['The speaker is grateful that his teachers chose such exciting stories for him to learn.', 'The speaker is listing the books that he read on holiday, just for pleasure.', 'The speaker thinks history is boring and wants to stop learning it altogether.'],
    },
    {
      what: 'At the end, the speaker declares that he is now finding out his own history and shaping his own sense of who he is.',
      theme: 'Protest',
      reading: 'The ending is defiant: he rejects the history he was given and takes charge of who he is.',
      misreadings: ['The ending shows the speaker giving up and accepting everything he was taught at school.', 'The ending shows the speaker becoming a history teacher in a British school.', 'The ending shows the speaker forgetting about history so he can focus on his job.'],
    },
  ],
  context: [
    {
      ask: 'Why does Agard write “Checking Out Me History” in Caribbean dialect and nonstandard spelling?',
      right: 'To assert his own voice against British history',
      wrong: ['Because he had never learned how to spell well', 'To make the poem easier for very young children', 'To copy the style of Shakespeare’s famous plays'],
      sol: 'Agard was born in Guyana and moved to Britain. Writing in his own dialect is itself an act of protest, refusing the standard English of the education he criticises.',
    },
  ],
  source: 'Collected in *Half-Caste and Other Poems*. In copyright, so it is described here in our own words and not quoted.',
};

export const POWER_PUBLIC = [OZYMANDIAS, LONDON, PRELUDE, LAST_DUCHESS, LIGHT_BRIGADE, EXPOSURE];
export const POWER_MODERN = [STORM_ISLAND, BAYONET, REMAINS, POPPIES, WAR_PHOTOGRAPHER, TISSUE, EMIGREE, KAMIKAZE, CHECKING_OUT];
export const POWER_POEMS = [...POWER_PUBLIC, ...POWER_MODERN];
