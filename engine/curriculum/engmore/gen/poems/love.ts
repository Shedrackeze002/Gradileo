/**
 * The Love and Relationships poems of a GCSE anthology (the AQA cluster of that name). The six poems
 * in the public domain are quoted exactly from the Project Gutenberg editions named in `source` (with
 * straight quotation marks and apostrophes made curly, and “--” printed as a dash). The nine poems
 * still in copyright are described in our own words and never quoted.
 */
import type { Poem } from '../poetry.ts';

export const LOVE_THEMES = ['Romantic love', 'Desire and longing', 'Loss and heartbreak', 'Possession and control', 'Family relationships', 'Memory', 'Nature and love', 'Distance and separation'];

export const WE_TWO_PARTED: Poem = {
  title: 'When We Two Parted',
  poet: 'Lord Byron',
  date: '1816',
  about: 'A speaker remembers the cold, tearful end of a secret love affair, and now feels pain and shame whenever he hears his former lover’s name spoken.',
  form: 'four eight-line stanzas with a regular rhyme scheme',
  themes: ['Loss and heartbreak', 'Memory', 'Romantic love'],
  quotations: [
    {
      text: 'When we two parted / In silence and tears, / Half broken-hearted / To sever for years,',
      lead: 'The opening of the poem:',
      theme: 'Loss and heartbreak',
      reading: 'The lovers part in silent grief, and “sever” makes the break sound violent, like a cut.',
      misreadings: [
        'The lovers part happily, glad to be free of each other, and look forward to meeting new people.',
        'The lovers have a loud argument and part angrily, each blaming the other for the end of the affair.',
        'The lovers part for a short holiday, and they expect to meet again in a few weeks’ time.',
      ],
    },
    {
      text: 'Pale grew thy cheek and cold, / Colder thy kiss;',
      lead: 'Remembering the parting:',
      theme: 'Romantic love',
      reading: 'The coldness of her cheek and kiss shows that her love had already faded, foreshadowing the sorrow to come.',
      misreadings: [
        'The lovers have been walking in the snow, and the cold weather has made her cheek pale and chilly.',
        'Her cold kiss shows how calm and brave she is, and the speaker admires her strength as they part.',
        'The speaker is describing a portrait of his lover, painted in pale, cold colours by an artist.',
      ],
    },
    {
      text: 'I hear thy name spoken, / And share in its shame.',
      lead: 'The second stanza:',
      theme: 'Loss and heartbreak',
      reading: 'Gossip about her damages her reputation, and because their affair was secret he shares the shame in silence.',
      misreadings: [
        'He is proud to hear her name spoken in public, because she has become famous and admired.',
        'He has forgotten her completely, so her name means nothing to him when he hears it.',
        'He tells everyone about their affair, and enjoys the attention that the gossip brings him.',
      ],
    },
    {
      text: 'In secret we met— / In silence I grieve.',
      lead: 'The last stanza:',
      theme: 'Memory',
      reading: 'The secrecy of the affair means that he must grieve alone, unable to share his memories or his pain.',
      misreadings: [
        'They met in public, and now he grieves openly so that everyone knows how much he has lost.',
        'He met her at a secret party, and he is sad only because the party has come to an end.',
        'He is grieving for a friend who has died, and the secret is a gift he never gave him.',
      ],
    },
    {
      text: 'How should I greet thee?— / With silence and tears.',
      lead: 'The last lines:',
      theme: 'Memory',
      reading: 'The ending echoes the opening, so the poem comes full circle: his pain has not changed.',
      misreadings: [
        'He plans to greet her warmly with a speech, because he has finally got over the affair.',
        'He decides never to see her again, so he will be glad to have forgotten her face completely.',
        'He imagines a happy reunion, where they laugh about the past and become friends again.',
      ],
    },
  ],
  context: [
    {
      ask: 'Why might Byron have kept the subject of “When We Two Parted” hidden?',
      right: 'It is thought to be about a real secret affair',
      wrong: ['It was a love poem written for his own wife', 'It was written as a joke for his schoolfriends', 'It was a translation of an ancient Greek poem'],
      sol: 'Byron is thought to have written about a real affair with a married woman. He gave a false date for the poem, perhaps to protect her reputation.',
    },
  ],
  source: 'First published 1816. Quoted from *The Works of Lord Byron*, Poetry, Volume 3, edited by E. H. Coleridge, Project Gutenberg eBook #21811.',
};

export const LOVES_PHILOSOPHY: Poem = {
  title: 'Love’s Philosophy',
  poet: 'Percy Bysshe Shelley',
  date: '1819',
  about: 'A speaker argues that everything in nature joins with something else, from rivers to the sea, so the person he loves should kiss him too.',
  form: 'two eight-line stanzas, each ending with a question',
  themes: ['Desire and longing', 'Nature and love', 'Romantic love'],
  quotations: [
    {
      text: 'The fountains mingle with the river / And the rivers with the Ocean,',
      lead: 'The opening lines:',
      theme: 'Nature and love',
      reading: 'The speaker uses images of water joining together as evidence that everything in nature is made to unite.',
      misreadings: [
        'The speaker describes a flood that has destroyed the countryside, and he fears for his home.',
        'The speaker is giving directions to the sea, following the river from its source to the coast.',
        'The speaker admires the water because it is alone and free, unlike people who must marry.',
      ],
    },
    {
      text: 'Nothing in the world is single;',
      lead: 'The speaker states his argument:',
      theme: 'Desire and longing',
      reading: 'He claims that it is natural law for everything to be paired, so his lover’s refusal seems unnatural.',
      misreadings: [
        'He admits that he is lonely and that he has decided to stay single for the rest of his life.',
        'He says that nothing in the world is unique, so his lover is no more special than anyone else.',
        'He complains that the world is too crowded and that he wants to live alone in the country.',
      ],
    },
    {
      text: 'See the mountains kiss high Heaven / And the waves clasp one another;',
      lead: 'The second stanza:',
      theme: 'Nature and love',
      reading: 'Personifying nature as kissing and embracing makes physical love seem natural, as part of his persuasion.',
      misreadings: [
        'The mountains and waves are fighting each other, showing that nature is violent and cruel.',
        'The speaker is describing a painting of the sea, admiring how the artist captured the waves.',
        'The images show that nature does not need people, so the speaker should stop wanting love.',
      ],
    },
    {
      text: 'What is all this sweet work worth / If thou kiss not me?',
      lead: 'The final lines:',
      theme: 'Desire and longing',
      reading: 'The question is left unanswered, suggesting his longing is not returned and his argument fails.',
      misreadings: [
        'The question shows that the lover has agreed to kiss him, and the poem ends in a happy wedding.',
        'The question asks how much the speaker will be paid for his work in the fields and gardens.',
        'The question shows that the speaker no longer cares about love and has turned to nature instead.',
      ],
    },
  ],
  context: [
    {
      ask: 'How does “Love’s Philosophy” reflect Shelley as a Romantic poet?',
      right: 'It uses the beauty of nature to explore feeling',
      wrong: ['It describes a battle between two rival kings', 'It praises city life over the countryside', 'It tells a ghost story set in an old castle'],
      sol: 'The Romantic poets valued nature and emotion. Shelley uses nature’s unions as the basis of the speaker’s argument for love.',
    },
  ],
  source: 'First published in *The Indicator*, December 1819. Quoted from *The Complete Poetical Works of Percy Bysshe Shelley*, Project Gutenberg eBook #4800, which prints line 7 as “In one spirit meet and mingle”; some editions read “In one another’s being mingle”.',
};

export const PORPHYRIA: Poem = {
  title: 'Porphyria’s Lover',
  poet: 'Robert Browning',
  date: '1836',
  about: 'A man describes how the woman he loves came to his cottage on a stormy night, and how, to keep her for ever in that moment, he strangled her with her own hair.',
  form: 'a dramatic monologue in a single long stanza',
  themes: ['Possession and control', 'Desire and longing', 'Romantic love'],
  quotations: [
    {
      text: 'The rain set early in to-night, / The sullen wind was soon awake,',
      lead: 'The opening lines:',
      theme: 'Nature and love',
      reading: 'The storm is pathetic fallacy: the sullen weather reflects the speaker’s dark mood.',
      misreadings: [
        'The weather is calm and gentle, showing that the speaker is relaxed and happy at the start.',
        'The speaker is simply reporting the weather, and it has nothing to do with his feelings.',
        'The storm shows that Porphyria is angry with him, because she has been caught in the rain.',
      ],
    },
    {
      text: 'That moment she was mine, mine, fair, / Perfectly pure and good:',
      lead: 'The speaker realises that she loves him:',
      theme: 'Possession and control',
      reading: 'Repeating “mine” shows his desire to own her, and he wants to freeze the moment when she seems perfect.',
      misreadings: [
        'He is grateful that she has chosen him freely, and he promises to respect her independence.',
        'He realises that she belongs to another man, and he gives her up because he is generous.',
        'He describes a painting of Porphyria that he has just bought from an artist in the town.',
      ],
    },
    {
      text: 'In one long yellow string I wound / Three times her little throat around, / And strangled her.',
      lead: 'What he does next:',
      theme: 'Possession and control',
      reading: 'The calm, precise description of the murder shows his disturbing need to control her completely.',
      misreadings: [
        'He ties a ribbon in her hair as a gift, showing how gently he cares for the woman he loves.',
        'He saves her from choking on her scarf, and she thanks him for being so brave and quick.',
        'He is describing a dream that frightened him, and he wakes to find Porphyria safe and well.',
      ],
    },
    {
      text: 'And yet God has not said a word!',
      lead: 'The last line:',
      theme: 'Possession and control',
      reading: 'He takes God’s silence as approval, or is unsettled by it, and the reader must judge him.',
      misreadings: [
        'He prays for forgiveness and hears God’s voice telling him that he has been forgiven.',
        'He complains that the church is closed, so he cannot go to pray on a stormy night.',
        'He is happy that it is quiet at last, because the storm outside has finally ended.',
      ],
    },
  ],
  context: [
    {
      ask: 'Why is a dramatic monologue a powerful form for “Porphyria’s Lover”?',
      right: 'Only the killer speaks, so we judge him by his words',
      wrong: ['Porphyria tells her own side of the story in turn', 'A narrator outside the story explains the true facts', 'The poem is a conversation between the two lovers'],
      sol: 'Only the speaker talks. His calm, reasonable tone and his regular rhyme scheme make his madness more disturbing, and the reader must see past his version of events.',
    },
  ],
  source: 'First published in *The Monthly Repository*, 1836. Quoted from *The Complete Poetic and Dramatic Works of Robert Browning*, Cambridge Edition, Project Gutenberg eBook #50954.',
};

export const SONNET_29: Poem = {
  title: 'Sonnet 29 – ‘I think of thee!’',
  poet: 'Elizabeth Barrett Browning',
  date: '1850',
  about: 'A speaker compares her thoughts of her lover to vines wrapping round a tree, and decides that she wants the man himself, not just her thoughts of him.',
  form: 'a Petrarchan sonnet',
  themes: ['Desire and longing', 'Nature and love', 'Romantic love'],
  quotations: [
    {
      text: 'I think of thee!—my thoughts do twine and bud / About thee, as wild vines, about a tree,',
      lead: 'The opening of the sonnet:',
      theme: 'Nature and love',
      reading: 'The extended metaphor of vines round a tree shows her thoughts growing around her lover.',
      misreadings: [
        'She is describing her garden, where wild vines have grown over a tree she planted long ago.',
        'The vines are strangling the tree, showing that she wants to destroy the man she once loved.',
        'She is thinking of a holiday in the countryside, where she saw vines growing over trees.',
      ],
    },
    {
      text: 'I will not have my thoughts instead of thee',
      lead: 'The turn in her argument:',
      theme: 'Desire and longing',
      reading: 'She realises that thinking about him is not enough: she longs for his real presence instead.',
      misreadings: [
        'She decides to stop thinking about him at all, because she has found someone else to love.',
        'She prefers her own thoughts to his company, because her daydreams are better than him.',
        'She refuses to tell him her thoughts, because she is afraid that he will laugh at her.',
      ],
    },
    {
      text: 'I do not think of thee—I am too near thee.',
      lead: 'The final line:',
      theme: 'Romantic love',
      reading: 'With him near, she no longer needs her thoughts of him, so the sonnet ends in fulfilment.',
      misreadings: [
        'She has stopped loving him and no longer thinks about him, because he is too close to her.',
        'She complains that he is standing too close to her, and she asks him to give her more space.',
        'She has fallen asleep beside him, and she is too tired to think about anything at all.',
      ],
    },
  ],
  context: [
    {
      ask: 'What is the background to Elizabeth Barrett Browning’s *Sonnets from the Portuguese*?',
      right: 'She wrote them while Robert Browning courted her',
      wrong: ['She translated them from old Portuguese poems', 'She wrote them as a girl about her pet dog', 'She wrote them in old age about her late husband'],
      sol: 'The sonnets record her love for Robert Browning, whom she married secretly in 1846 against her father’s wishes. The title made them seem like translations, to keep them private.',
    },
  ],
  source: 'From *Sonnets from the Portuguese*, 1850. Quoted from Project Gutenberg eBook #2002.',
};

export const NEUTRAL_TONES: Poem = {
  title: 'Neutral Tones',
  poet: 'Thomas Hardy',
  date: '1898',
  about: 'A speaker remembers standing with a lover by a pond on a grey winter day when he realised their love had died, and how that bleak scene has stayed with him.',
  form: 'four quatrains, ending where it began',
  themes: ['Loss and heartbreak', 'Memory', 'Nature and love'],
  quotations: [
    {
      text: 'And the sun was white, as though chidden of God,',
      lead: 'The first stanza:',
      theme: 'Nature and love',
      reading: 'Even the sun is drained of colour, as if scolded by God, so the bleak scene reflects the dying love.',
      misreadings: [
        'The bright white sun shows that it is a beautiful summer day, full of warmth and happiness.',
        'The speaker is praying to God for good weather, because he wants to propose to his lover.',
        'The white sun shows that the speaker is ill, and his eyesight makes everything look pale.',
      ],
    },
    {
      text: 'Your eyes on me were as eyes that rove / Over tedious riddles solved years ago;',
      lead: 'The second stanza:',
      theme: 'Loss and heartbreak',
      reading: 'She looks at him with boredom, as if he were an old riddle already solved, showing that her love is gone.',
      misreadings: [
        'She looks at him with great curiosity, because she finds him a fascinating mystery to solve.',
        'She is reading a book of riddles while he talks, and she is enjoying the puzzles very much.',
        'She looks at him lovingly, remembering the games they played together when they were young.',
      ],
    },
    {
      text: 'The smile on your mouth was the deadest thing / Alive enough to have strength to die;',
      lead: 'The third stanza:',
      theme: 'Loss and heartbreak',
      reading: 'The paradox of a smile that is barely alive shows that any warmth left between them is dying.',
      misreadings: [
        'Her bright smile shows that she is full of life and still deeply in love with the speaker.',
        'The speaker is describing a statue of a smiling woman in the graveyard near the pond.',
        'Her smile shows that she is about to tell a joke, and the speaker cannot wait to hear it.',
      ],
    },
    {
      text: 'Since then, keen lessons that love deceives, / And wrings with wrong,',
      lead: 'The final stanza:',
      theme: 'Memory',
      reading: 'Later experience taught him that love deceives and hurts, and brings back that bleak day.',
      misreadings: [
        'He has learned that love always ends happily, and he now looks back on that day with joy.',
        'He has taken lessons in how to write love poems, and he now wins prizes for his work.',
        'He has forgotten that day entirely, and he now trusts love more than ever before.',
      ],
    },
  ],
  context: [
    {
      ask: 'Why does “Neutral Tones” end with the same images it began with?',
      right: 'Its cyclical structure traps him in the memory',
      wrong: ['To show that the couple got back together in the end', 'Because Hardy had run out of new ideas for images', 'To show that the season changed from winter to summer'],
      sol: 'The poem begins and ends with the pond, the sun, the tree and the grey leaves, so the speaker cannot escape that moment. Hardy wrote it in 1867 and published it in 1898.',
    },
  ],
  source: 'Written 1867 and first published in *Wessex Poems and Other Verses*, 1898. Quoted from Project Gutenberg eBook #3167.',
};

export const FARMERS_BRIDE: Poem = {
  title: 'The Farmer’s Bride',
  poet: 'Charlotte Mew',
  date: '1916',
  about: 'A farmer tells how his young wife became afraid of him after their wedding and ran away, and how he locked her in and now longs for her from the other side of a stair.',
  form: 'a dramatic monologue in a rural dialect',
  themes: ['Possession and control', 'Desire and longing', 'Nature and love'],
  quotations: [
    {
      text: 'Three Summers since I chose a maid, / Too young maybe—but more’s to do / At harvest-time than bide and woo.',
      lead: 'The opening lines:',
      theme: 'Possession and control',
      reading: 'He “chose” her and was too busy to court her, so the marriage served his needs, not hers.',
      misreadings: [
        'He fell deeply in love and courted her for years before she happily agreed to marry him.',
        'She chose him at the harvest festival, and he was too shy to say no to her proposal.',
        'He is describing hiring a young worker to help him with the harvest on his farm.',
      ],
    },
    {
      text: 'We caught her, fetched her home at last / And turned the key upon her, fast.',
      lead: 'After she runs away:',
      theme: 'Possession and control',
      reading: 'She is hunted like an animal and locked in, showing that she is treated as his property, not a person.',
      misreadings: [
        'The villagers rescue her from danger and bring her home safely to rest by the fire.',
        'They lock the door to keep thieves out, and she is grateful to feel safe at home.',
        'She comes home by herself, and he gives her the key so she can come and go freely.',
      ],
    },
    {
      text: 'Shy as a leveret, swift as he, / Straight and slight as a young larch tree,',
      lead: 'The farmer describes his wife:',
      theme: 'Nature and love',
      reading: 'He compares her to a young hare and a young tree, seeing her as wild, natural and beyond his reach.',
      misreadings: [
        'He compares her to farm animals because he thinks of her only as a useful worker.',
        'He says that she is tall and strong, and that she can do more work than any man.',
        'He describes the animals and trees on his farm, which he loves more than his wife.',
      ],
    },
    {
      text: 'The brown of her—her eyes, her hair, her hair!',
      lead: 'The last line:',
      theme: 'Desire and longing',
      reading: 'The broken, repeated phrases show his longing and frustration rising out of control.',
      misreadings: [
        'He is calmly describing her appearance so that the villagers can find her if she runs away.',
        'He complains that her hair is messy, and he wants her to tidy it before visitors come.',
        'He is describing the colour of a horse that he wants to buy at the market next week.',
      ],
    },
  ],
  context: [
    {
      ask: 'What is unusual about the voice of “The Farmer’s Bride”?',
      right: 'Mew writes as a man, in his own rural speech',
      wrong: ['The bride speaks every line of the poem herself', 'A narrator reports the story in formal English', 'The poem is a letter written by the farmer’s mother'],
      sol: 'It is a dramatic monologue in the farmer’s dialect. We never hear the bride, so her silence and fear speak through his account.',
    },
  ],
  source: 'First published in *The Farmer’s Bride*, 1916. Quoted from the 1921 edition, Project Gutenberg eBook #71305.',
};

const notQuoted = (published: string) => `First published in ${published}. In copyright, so it is described here in our own words and not quoted.`;

export const WALKING_AWAY: Poem = {
  title: 'Walking Away',
  poet: 'Cecil Day-Lewis',
  date: '1962',
  about: 'A father remembers watching his young son walk away from him at a school football match years ago, and reflects that a loving parent must allow a child to leave.',
  form: 'four five-line stanzas with a regular rhyme scheme',
  themes: ['Family relationships', 'Memory', 'Distance and separation'],
  moments: [
    {
      what: 'The father remembers his son walking off, small and uncertain, like a small object pulled away into space.',
      theme: 'Distance and separation',
      reading: 'The son is starting to separate from his father, which is natural but painful to watch.',
      misreadings: ['The son is running away from home because he is angry with his strict father.', 'The father is describing a rocket launch he took his son to watch years ago.', 'The son is moving to another country, and the father will never see him again.'],
    },
    {
      what: 'At the end, the father reflects that a child becomes their own person by leaving, and that a parent shows love by allowing it.',
      theme: 'Family relationships',
      reading: 'He accepts that a parent’s love must allow a child to become independent, even though it hurts.',
      misreadings: ['He decides to keep his son close to home for ever, so that he never has to let him go.', 'He regrets having children at all, because they always leave their parents behind.', 'He blames his son for walking away and refuses to speak to him again.'],
    },
  ],
  context: [
    {
      ask: 'Who is the speaker of “Walking Away” addressing?',
      right: 'His son, recalling a day years before',
      wrong: ['His wife, on the day of their wedding', 'His own father, who has recently died', 'A teacher at his son’s new school'],
      sol: 'The poem is addressed to Day-Lewis’s son and looks back eighteen years to a moment the father has never forgotten.',
    },
  ],
  source: notQuoted('*The Gate* (1962)'),
};

export const LETTERS_YORKSHIRE: Poem = {
  title: 'Letters from Yorkshire',
  poet: 'Maura Dooley',
  about: 'A speaker in a city receives letters from a man in Yorkshire who works outdoors, and wonders whose life is more truly lived, his close to nature or hers at a screen.',
  form: 'unrhymed three-line stanzas',
  themes: ['Distance and separation', 'Nature and love', 'Romantic love'],
  moments: [
    {
      what: 'The man writes to tell her that he has seen lapwings come back for the spring while he was working in his garden.',
      theme: 'Nature and love',
      reading: 'His life is close to the seasons and the land, and sharing these moments keeps them connected.',
      misreadings: ['He writes to complain that birds are eating the seeds he has planted in his garden.', 'He writes to say that he is moving to the city to work in an office near her.', 'He writes to ask her to send him money to buy a new spade for his garden.'],
    },
    {
      what: 'Although they live far apart, the speaker feels that their two lives meet in the letters they exchange.',
      theme: 'Distance and separation',
      reading: 'Distance does not break their bond: the letters let them share their lives.',
      misreadings: ['The letters show that they have nothing in common and will soon stop writing.', 'The letters are business letters about selling a farm in Yorkshire.', 'The letters make her jealous, and she decides to move away from him.'],
    },
  ],
  context: [
    {
      ask: 'What contrast runs through “Letters from Yorkshire”?',
      right: 'His outdoor life and her indoor life at a screen',
      wrong: ['His life as a king and hers as his servant', 'His love of war and her love of peace', 'His life at sea and her life in the desert'],
      sol: 'He digs, watches birds and feels the seasons; she works indoors with news on a screen. The poem asks which life is more truly alive, yet shows them linked by their letters.',
    },
  ],
  source: 'Collected in *Sound Barrier: Poems 1982–2002* (2002). In copyright, so it is described here in our own words and not quoted.',
};

export const EDEN_ROCK: Poem = {
  title: 'Eden Rock',
  poet: 'Charles Causley',
  date: '1988',
  about: 'A speaker pictures his dead parents as a young couple having a picnic beside a stream, and they beckon him to cross over and join them.',
  form: 'short stanzas with a single line at the end',
  themes: ['Family relationships', 'Memory', 'Loss and heartbreak'],
  moments: [
    {
      what: 'The speaker describes his parents in fine detail, young again, with the clothes, food and objects of their picnic.',
      theme: 'Memory',
      reading: 'The vivid, ordinary details show how lovingly he remembers them, as if alive.',
      misreadings: ['The details show that he is writing a shopping list for a picnic of his own.', 'The details show that he never knew his parents and has invented them.', 'The details show that he is angry with his parents for leaving him behind.'],
    },
    {
      what: 'His parents call him to cross the stream, and he thinks that crossing will be easier than he expected.',
      theme: 'Loss and heartbreak',
      reading: 'Crossing the stream suggests death and reunion, which he faces calmly.',
      misreadings: ['He is afraid of getting wet and refuses to cross the stream to his parents.', 'He crosses the stream to go home after a long and happy day out with friends.', 'He is a child learning to swim, and his parents are teaching him in the stream.'],
    },
  ],
  context: [
    {
      ask: 'What is the effect of the single line at the end of “Eden Rock”?',
      right: 'It stands apart, like the moment before he crosses',
      wrong: ['It shows that Causley forgot to finish the last stanza', 'It lists the food the family ate at the picnic', 'It is the title of the next poem in the book'],
      sol: 'Separated from the quatrains, the last line seems to hang in space, mirroring the gap between life and death that he is about to cross.',
    },
  ],
  source: notQuoted('*A Field of Vision* (1988)'),
};

export const FOLLOWER: Poem = {
  title: 'Follower',
  poet: 'Seamus Heaney',
  date: '1966',
  about: 'A speaker remembers following his father as he ploughed, admiring his skill as a child, and reflects that now it is his ageing father who stumbles behind him.',
  form: 'six four-line stanzas with a regular rhyme scheme',
  themes: ['Family relationships', 'Memory'],
  moments: [
    {
      what: 'As a child, the speaker followed his father’s plough, tripping and falling, wanting to grow up and plough like him.',
      theme: 'Family relationships',
      reading: 'The child admires his father as an expert and hero, and longs to be just like him.',
      misreadings: ['The child is bored on the farm and wants to leave it as soon as he can.', 'The child is afraid of his father, who shouts at him for getting in the way.', 'The child is helping his father because the family needs the money.'],
    },
    {
      what: 'At the end, the roles have reversed: the old father now stumbles along behind the son, who cannot leave him behind.',
      theme: 'Memory',
      reading: 'The son now cares for his father, and feels both love and some guilty frustration.',
      misreadings: ['The father is now a famous ploughman, and the son is proud to follow him to shows.', 'The son has forgotten his father entirely and has moved away to the city.', 'The father and son are racing each other across the field to see who is faster.'],
    },
  ],
  context: [
    {
      ask: 'How does Heaney show his father’s skill in “Follower”?',
      right: 'With precise farming words and images of control',
      wrong: ['By listing the prizes his father won at fairs', 'By describing his father’s office job in town', 'By comparing his father to a famous king'],
      sol: 'Heaney uses technical terms from ploughing and describes how exactly his father handled the horses and the plough, showing a child’s admiration.',
    },
  ],
  source: notQuoted('*Death of a Naturalist* (1966)'),
};

export const MOTHER_DISTANCE: Poem = {
  title: 'Mother, any distance',
  poet: 'Simon Armitage',
  date: '1993',
  about: 'A young man measures the rooms of his first home with his mother holding the end of the tape, and the tape becomes an image of the bond he must stretch to leave.',
  form: 'a loose, stretched sonnet',
  themes: ['Family relationships', 'Distance and separation'],
  moments: [
    {
      what: 'His mother holds one end of the measuring tape at the bottom of the stairs while he climbs higher with the other end.',
      theme: 'Family relationships',
      reading: 'The tape is like an umbilical cord, showing the bond that still links them.',
      misreadings: ['The tape shows that his mother is a builder who is helping to design his new house.', 'The tape shows that he is measuring how tall he has grown since he was a child.', 'The tape shows that his mother refuses to let him leave home at all.'],
    },
    {
      what: 'At the top of the house he reaches up towards an open space, where he might either fail or soar.',
      theme: 'Distance and separation',
      reading: 'Moving out is frightening and exciting: he may succeed alone or struggle.',
      misreadings: ['He is about to jump off the roof because he is unhappy in his new home.', 'He is learning to fly a plane, which he has always wanted to do.', 'He has fallen through the ceiling and needs his mother to rescue him.'],
    },
  ],
  context: [
    {
      ask: 'Why does Armitage loosely use the sonnet form for “Mother, any distance”?',
      right: 'A love-poem form suits his love, stretched as he leaves',
      wrong: ['Because the poem is a translation of Shakespeare', 'Because sonnets are always written about the weather', 'Because he wanted to tell a long story about a war'],
      sol: 'The sonnet is a traditional form for love poetry. Armitage stretches it, as the son stretches the tape and his bond with his mother.',
    },
  ],
  source: notQuoted('*Book of Matches* (1993)'),
};

export const BEFORE_MINE: Poem = {
  title: 'Before You Were Mine',
  poet: 'Carol Ann Duffy',
  date: '1993',
  about: 'A daughter imagines her mother as a carefree young woman, laughing with friends and dancing, in the years before the daughter was born.',
  form: 'four five-line stanzas of free verse',
  themes: ['Family relationships', 'Memory', 'Possession and control'],
  moments: [
    {
      what: 'The daughter imagines her mother on a street corner with friends, laughing, and later dancing in the city at night.',
      theme: 'Memory',
      reading: 'She pictures her mother’s glamorous, free youth, before motherhood changed it.',
      misreadings: ['She remembers being at the dance herself, as one of her mother’s friends.', 'She disapproves of her mother’s behaviour and thinks she was very foolish.', 'She describes a film that she and her mother watched together.'],
    },
    {
      what: 'The daughter suggests that her birth ended her mother’s glamorous life, and says that she wanted it for her.',
      theme: 'Possession and control',
      reading: 'The title’s “mine” is possessive: she feels guilt for taking her mother’s freedom.',
      misreadings: ['She thanks her mother for giving up her career to become a full-time parent.', 'She blames her mother for being a poor parent who preferred dancing.', 'She plans to become a famous dancer to make her mother proud of her.'],
    },
  ],
  context: [
    {
      ask: 'What is unusual about the time in “Before You Were Mine”?',
      right: 'The daughter imagines a time before she was born',
      wrong: ['It is set in the distant future, in space', 'It describes the day of the daughter’s wedding', 'It is set during the Second World War battles'],
      sol: 'The speaker could not have been there, so she builds her mother’s youth from photographs and stories, and from her love for her.',
    },
  ],
  source: notQuoted('*Mean Time* (1993)'),
};

export const WINTER_SWANS: Poem = {
  title: 'Winter Swans',
  poet: 'Owen Sheers',
  date: '2005',
  about: 'A couple who have argued walk silently by a lake after a storm, and seeing two swans, which mate for life, they find their hands joining again.',
  form: 'three-line stanzas with a final couplet',
  themes: ['Romantic love', 'Nature and love'],
  moments: [
    {
      what: 'After a long spell of rain, the couple walk along the flooded edge of the lake, apart and silent.',
      theme: 'Romantic love',
      reading: 'The stormy weather and their distance show the tension after an argument.',
      misreadings: ['The couple are on their first date, shy and nervous about what to say.', 'The couple are lost in the rain and are looking for their car.', 'The couple are training for a long walk to raise money for charity.'],
    },
    {
      what: 'Two swans appear, turning together in the water, and by the end the couple are holding hands.',
      theme: 'Nature and love',
      reading: 'The swans, which pair for life, remind them of their bond, helping them make up.',
      misreadings: ['The swans attack the couple, and they hold hands because they are frightened.', 'The swans fly away for winter, showing that the couple will separate.', 'The swans are a gift the couple bought to keep on their own pond.'],
    },
  ],
  context: [
    {
      ask: 'Why does Sheers include swans in “Winter Swans”?',
      right: 'Swans pair for life, a symbol of lasting love',
      wrong: ['Swans were the couple’s favourite birds to feed', 'Swans warn the couple of danger on the ice', 'Swans are the national bird of Wales'],
      sol: 'Swans are a traditional symbol of faithful love because they are said to mate for life. Watching them helps the couple remember their own bond.',
    },
  ],
  source: notQuoted('*Skirrid Hill* (2005)'),
};

export const SINGH_SONG: Poem = {
  title: 'Singh Song!',
  poet: 'Daljit Nagra',
  date: '2007',
  about: 'A young Sikh shopkeeper keeps leaving his customers to spend time with his new wife upstairs, and the two share a playful, loving night in the empty shop.',
  form: 'free verse in a Punjabi-English voice',
  themes: ['Romantic love', 'Family relationships'],
  moments: [
    {
      what: 'The shopkeeper slips away from his father’s shop to be with his bride, and customers complain about the service.',
      theme: 'Romantic love',
      reading: 'His love for his wife matters more than the shop his father expects him to run.',
      misreadings: ['He hates working in the shop and leaves to find a better job elsewhere.', 'He leaves the shop to look after his sick father who lives upstairs.', 'He is a lazy worker who sleeps instead of serving the customers.'],
    },
    {
      what: 'Late at night the couple sit together in the shop and playfully talk about how much the moon and their love are worth.',
      theme: 'Romantic love',
      reading: 'Their gentle, teasing talk shows a warm, equal love worth more than the shop.',
      misreadings: ['They argue about money because the shop is losing customers every week.', 'They count the shop’s takings and plan to sell the business for profit.', 'They are working the night shift to stock the shelves for the morning.'],
    },
  ],
  context: [
    {
      ask: 'Why does Nagra write “Singh Song!” in a Punjabi-English voice?',
      right: 'To give the speaker his own playful voice',
      wrong: ['Because Nagra could not write standard English', 'To make the poem sound like a Shakespeare play', 'To hide the meaning from the readers'],
      sol: 'Nagra, a British poet of Sikh heritage, captures the speech of a young British Indian man, celebrating his voice, humour and love.',
    },
  ],
  source: notQuoted('*Look We Have Coming to Dover!* (2007)'),
};

export const CLIMBING_GRANDFATHER: Poem = {
  title: 'Climbing My Grandfather',
  poet: 'Andrew Waterhouse',
  date: '2000',
  about: 'A speaker describes climbing his grandfather as if he were a mountain, from his shoes to his head, in an extended metaphor of love and discovery.',
  form: 'a single stanza of free verse',
  themes: ['Family relationships', 'Memory'],
  moments: [
    {
      what: 'The speaker climbs with no safety equipment, finding handholds in his grandfather’s clothes and the lines of his skin.',
      theme: 'Family relationships',
      reading: 'The climb shows the effort and trust involved in really getting to know an older relative.',
      misreadings: ['The speaker is a professional climber describing a dangerous mountain he scaled.', 'The speaker is a child who has hurt his grandfather while playing roughly.', 'The speaker is describing a statue of his grandfather in the town square.'],
    },
    {
      what: 'At the top, the speaker lies on his grandfather’s summit and feels his heart beating calmly.',
      theme: 'Memory',
      reading: 'Reaching the top brings closeness: the grandfather is steady, strong and loving.',
      misreadings: ['The grandfather’s heart is failing, and the speaker calls for an ambulance.', 'The speaker falls asleep because the climb has bored him completely.', 'The speaker plants a flag to show that he has beaten his grandfather.'],
    },
  ],
  context: [
    {
      ask: 'What is the main technique of “Climbing My Grandfather”?',
      right: 'An extended metaphor of the grandfather as a mountain',
      wrong: ['A rhyming list of the jobs the grandfather once did', 'A dialogue between the speaker and his own father', 'A sonnet about climbing a real mountain in Wales'],
      sol: 'The whole poem is one extended metaphor: the grandfather is a mountain to be climbed, showing how big and important he is to the speaker.',
    },
  ],
  source: notQuoted('*In* (2000)'),
};

export const LOVE_PUBLIC = [WE_TWO_PARTED, LOVES_PHILOSOPHY, PORPHYRIA, SONNET_29, NEUTRAL_TONES, FARMERS_BRIDE];
export const LOVE_MODERN = [WALKING_AWAY, LETTERS_YORKSHIRE, EDEN_ROCK, FOLLOWER, MOTHER_DISTANCE, BEFORE_MINE, WINTER_SWANS, SINGH_SONG, CLIMBING_GRANDFATHER];
export const LOVE_POEMS = [...LOVE_PUBLIC, ...LOVE_MODERN];
