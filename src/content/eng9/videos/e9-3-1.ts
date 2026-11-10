import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-3-1',
  lessonId: 'e9-3-1',
  title: 'Plot and Characters',
  summary:
    'The Tempest is one of Shakespeare’s last plays, set on an island ruled by Prospero, the magician and rightful Duke of Milan, who raises a storm to bring his enemies into his power. Ferdinand and Miranda fall in love, two plots against rulers echo Antonio’s old betrayal, and Prospero finally forgives his enemies, gives up his magic and frees Ariel.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Tempest', title: 'Plot and Characters', subtitle: 'A magician, an island and a storm' }],
      lines: [
        { say: 'A magician on a remote island sees his old enemies sailing close by, and raises a storm to bring them into his power.', show: 'title' },
        { say: 'In this video we meet the characters of Shakespeare’s The Tempest, and follow the plot act by act.' },
      ],
    },
    {
      chapter: 'What the play is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The Tempest', md: '*The Tempest* is one of the last plays Shakespeare wrote, probably around 1610. A **tempest** is a violent storm. It is set on a remote island ruled by **Prospero**, a magician who was once the **Duke of Milan**.' },
      ],
      lines: [
        { say: 'The Tempest is one of the last plays William Shakespeare wrote, probably around sixteen ten. A tempest is a violent storm.', show: 'def' },
        { say: 'The play is set on a remote island ruled by Prospero, a magician who was once the Duke of Milan, until his brother stole his dukedom.', focus: 'def' },
      ],
    },
    {
      chapter: 'The characters',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Group', 'Who'],
          rows: [
            ['**On the island**', 'Prospero; Miranda, his daughter; Ariel, a spirit; Caliban, son of the witch Sycorax'],
            ['**The royal party**', 'Alonso, King of Naples; Ferdinand, his son; Antonio, Prospero’s brother; Sebastian; Gonzalo'],
            ['**The comic pair**', 'Stephano, a drunken butler, and Trinculo, a jester'],
          ],
        },
      ],
      lines: [
        { say: 'On the island live Prospero and his daughter Miranda, who have been there for twelve years. Ariel is a spirit who serves Prospero and longs to be free. Caliban, son of the witch Sycorax, was once Prospero’s pupil and is now his servant.', show: 't', focus: 't.0' },
        { say: 'The royal party includes Alonso, King of Naples, and his son Ferdinand. Antonio is Prospero’s brother, who stole his dukedom, and Sebastian is Alonso’s brother. Gonzalo is a kind old lord, who once secretly gave Prospero food, clothes and books.', focus: 't.1' },
        { say: 'And the comic pair are Stephano, a drunken butler, and Trinculo, a jester.', focus: 't.2' },
      ],
    },
    {
      chapter: 'The plot',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Act 1.** Prospero’s storm brings his enemies ashore; Ferdinand and Miranda fall in love.',
            '**Act 2.** Antonio urges Sebastian to kill the King; Caliban swears to serve Stephano.',
            '**Act 3.** Ferdinand is tested; Caliban plots to kill Prospero; Ariel accuses the lords.',
            '**Act 4.** A magical masque blesses the lovers; the plotters are chased away.',
            '**Act 5.** Prospero forgives his enemies, gives up his magic and frees Ariel.',
          ],
        },
      ],
      lines: [
        { say: 'Act one. A ship seems to sink in a violent storm. Prospero tells Miranda how Antonio, helped by Alonso, set them adrift twelve years ago. Now those enemies are on the ship, and the storm has brought them to the island. Ferdinand meets Miranda, and they fall in love at first sight.', show: 'b.0' },
        { say: 'Act two. While the King sleeps, Antonio persuades Sebastian to kill him and seize the crown, but Ariel wakes Gonzalo just in time. Meanwhile Caliban meets Stephano, takes him for a god because of his wine, and swears to serve him.', show: 'b.1' },
        { say: 'Act three. Prospero makes Ferdinand carry heavy logs, to test his love. Caliban persuades Stephano to kill Prospero. And Ariel appears as a fearsome harpy, to accuse the lords of their crime.', show: 'b.2' },
        { say: 'Act four. Prospero blesses the lovers with a masque of spirits, then breaks it off to deal with Caliban’s plot.', show: 'b.3' },
        { say: 'Act five. With his enemies at his mercy, Prospero chooses to forgive them. He gives up his magic, regains his dukedom and frees Ariel, and everyone prepares to sail home.', show: 'b.4' },
      ],
    },
    {
      chapter: 'Prospero is not simply a hero',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Prospero is not simply a hero', md: 'Prospero has been wronged, but he is also harsh: he **threatens Ariel**, **enslaves Caliban** and **controls Miranda’s life**. Treat him as a complex character.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['This island’s mine, by Sycorax my mother,', 'Which thou tak’st from me'], by: 'Caliban, Act 1, Scene 2' },
      ],
      lines: [
        { say: 'A common mistake is to treat Prospero as a pure hero. He has been wronged, but he is also harsh. He threatens Ariel, enslaves Caliban and controls Miranda’s life.', show: 'm' },
        { say: 'Caliban sees himself as a native whose island was taken: this island’s mine, by Sycorax my mother, which thou tak’st from me. So strong answers treat Prospero as complex, neither a pure hero nor a pure villain.', show: 'q' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Antonio urges Sebastian to kill his brother, the King. Caliban urges Stephano to kill Prospero. Why do these plots matter?',
          choices: [
            'They show that the island is cursed.',
            'They are comic scenes with no link to the main plot.',
            'They echo Antonio’s old betrayal, so Prospero’s choice to forgive stands out more.',
            'They prove that Caliban is the play’s hero.',
          ],
          answer: 2,
          working: 'Twelve years ago Antonio seized power by betraying his brother. Both new plots repeat that crime, so Prospero’s final choice of mercy over revenge stands out all the more.',
        },
      ],
      lines: [
        { say: 'Your turn. Antonio urges Sebastian to kill his brother, the King. Caliban urges Stephano to kill Prospero. Why do these plots matter? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. Twelve years ago, Antonio seized power by betraying his brother. Both new plots echo that crime, so Prospero’s final choice to forgive stands out all the more.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'Prospero, the deposed Duke of Milan, raises a storm to trap his enemies.',
            'Ferdinand and Miranda fall in love; two plots against rulers fail.',
            'Prospero forgives his enemies, gives up his magic and frees Ariel.',
            'Prospero is complex: wronged, but also harsh and controlling.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Prospero, the deposed Duke of Milan, raises a storm to bring his enemies to his island.', show: 'sum.0' },
        { say: 'Ferdinand and Miranda fall in love, and two plots against rulers fail.', show: 'sum.1' },
        { say: 'In the end, Prospero forgives his enemies, gives up his magic and frees Ariel.', show: 'sum.2' },
        { say: 'And Prospero is a complex character: wronged, but also harsh and controlling.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
