/** Frankenstein, Mary Shelley (1818; revised 1831). Quotations from Project Gutenberg eBook #84 (the 1831 text). */
import type { LitText } from '../literature.ts';

export const FRANKENSTEIN: LitText = {
  title: 'Frankenstein',
  author: 'Mary Shelley',
  date: '1818, revised in 1831',
  source: 'Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus, 1818. Quoted from Project Gutenberg eBook #84.',
  part: 'Chapter',
  characters: [
    { name: 'Victor Frankenstein', is: 'a young scientist from Geneva who builds a living being and then abandons it in horror' },
    { name: 'the creature', is: 'the being Victor makes, who begins gentle and eager to love but is rejected by everyone he meets' },
    { name: 'Robert Walton', is: 'an ambitious explorer sailing to the North Pole, whose letters to his sister frame the whole story' },
    { name: 'Elizabeth Lavenza', is: 'the orphan raised by Victor’s family as his “cousin”, who later becomes his bride' },
    { name: 'Henry Clerval', is: 'Victor’s cheerful, loyal friend from school, who nurses him through his illness' },
    { name: 'William Frankenstein', is: 'Victor’s little brother, the creature’s first victim' },
    { name: 'Justine Moritz', is: 'a servant of the Frankenstein family who is wrongly hanged for William’s murder' },
    { name: 'the De Laceys', is: 'a poor family living in a cottage, whom the creature secretly watches and learns from' },
  ],
  events: [
    { where: 'Letter 4', what: 'Walton’s crew rescue a half-frozen Victor from the ice, and he begins to tell his story.' },
    { where: 'Chapter 4', what: 'Victor works alone for nearly two years to discover the secret of life.' },
    { where: 'Chapter 5', what: 'The creature opens its eyes, and Victor runs from it in horror and disgust.' },
    { where: 'Chapter 7', what: 'Victor learns that his little brother William has been murdered.' },
    { where: 'Chapter 8', what: 'Justine is found guilty of William’s murder and is hanged, while Victor stays silent.' },
    { where: 'Chapter 10', what: 'The creature meets Victor on a glacier and asks him to listen to his story.' },
    { where: 'Chapter 12', what: 'The creature secretly watches the De Lacey family and learns to speak.' },
    { where: 'Chapter 15', what: 'The De Laceys see the creature and drive him away from their cottage.' },
    { where: 'Chapter 17', what: 'The creature demands that Victor make him a female companion.' },
    { where: 'Chapter 20', what: 'Victor destroys the half-finished female, and the creature swears revenge.' },
    { where: 'Chapter 21', what: 'Victor is accused of the murder of Henry Clerval in Ireland.' },
    { where: 'Chapter 23', what: 'The creature kills Elizabeth on her wedding night.' },
    { where: 'Chapter 24', what: 'Victor dies on Walton’s ship, and the creature says he will end his own life.' },
  ],
  themes: ['Dangerous knowledge', 'Creator and creation', 'Isolation and rejection', 'Appearance and prejudice', 'Revenge', 'Guilt'],
  quotations: [
    {
      text: 'Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge',
      who: 'Victor Frankenstein', where: 'Chapter 4', lead: 'Victor breaks off his story to warn Walton:', theme: 'Dangerous knowledge',
      reading: 'Victor uses his own ruin as a warning, so he presents his story as a lesson about chasing knowledge too far.',
      misreadings: [
        'Victor encourages Walton to study hard, because knowledge is the only thing that will save him from the cold.',
        'Victor boasts about how much he has learned, and he offers to teach Walton the secret of life in return.',
        'Victor complains that his teachers gave him dangerous advice, so he blames the university for his troubles.',
      ],
    },
    {
      text: 'A new species would bless me as its creator and source',
      who: 'Victor Frankenstein', where: 'Chapter 4', lead: 'Victor remembers what drove him as he worked:', theme: 'Dangerous knowledge',
      reading: 'Victor wanted to be worshipped like a god by what he made, so his science is driven by pride, not care.',
      misreadings: [
        'Victor wanted to cure diseases, so his science was driven by a humble wish to help the poor of Geneva.',
        'Victor feared that his creations would hate him, so he worked slowly and carefully to make them happy.',
        'Victor hoped that his family would be proud of him, so he planned to give the new species to his father.',
      ],
    },
    {
      text: 'the beauty of the dream vanished, and breathless horror and disgust filled my heart.',
      who: 'Victor Frankenstein', where: 'Chapter 5', lead: 'The creature has just opened its eyes:', theme: 'Appearance and prejudice',
      reading: 'Victor turns against his creation the moment he sees its face, so he judges it by its looks before it has done anything.',
      misreadings: [
        'Victor has woken from a pleasant dream to find himself ill, and he is disgusted by the state of his rooms.',
        'Victor is horrified because the creature attacks him, so he is right to fear it from the very first moment.',
        'Victor is disgusted with himself for failing, since the creature does not come to life as he had hoped.',
      ],
    },
    {
      text: 'I, the true murderer, felt the never-dying worm alive in my bosom',
      who: 'Victor Frankenstein', where: 'Chapter 8', lead: 'Justine is about to be hanged for William’s murder:', theme: 'Guilt',
      reading: 'Victor knows he caused William’s death by making the creature, and his guilt eats at him like a worm that never dies.',
      misreadings: [
        'Victor confesses to the court that he killed William himself, hoping to save Justine from being hanged.',
        'Victor has caught a disease in prison, and he describes the pain of the worm that is slowly killing him.',
        'Victor believes that Justine is guilty after all, and he feels sick at having trusted her for so many years.',
      ],
    },
    {
      text: 'I ought to be thy Adam, but I am rather the fallen angel',
      who: 'the creature', where: 'Chapter 10', lead: 'The creature speaks to Victor on the glacier:', theme: 'Creator and creation',
      reading: 'The creature should have been loved like God’s first man, but Victor cast him out like Satan for no wrong he had done.',
      misreadings: [
        'The creature boasts that he is more powerful than any man, and he threatens Victor like an angel of death.',
        'The creature confesses that he has sinned like Adam, and he asks Victor to forgive him for the murders.',
        'The creature means that he wants to become a priest, and he asks Victor to teach him to read the Bible.',
      ],
    },
    {
      text: 'I was benevolent and good; misery made me a fiend.',
      who: 'the creature', where: 'Chapter 10', lead: 'The creature explains how he became violent:', theme: 'Isolation and rejection',
      reading: 'The creature was born good, but cruelty and loneliness changed him, so society shares the blame for his crimes.',
      misreadings: [
        'The creature admits that he was always evil underneath, and he only pretended to be kind to win people’s trust.',
        'The creature says that he was happy until Victor made him work, and the hard labour made him angry and violent.',
        'The creature explains that he is a demon by nature, sent by the devil to punish Victor for his pride.',
      ],
    },
    {
      text: 'Accursed creator! Why did you form a monster so hideous that even you turned from me in disgust?',
      who: 'the creature', where: 'Chapter 15', lead: 'The creature reads Victor’s notes about his own making:', theme: 'Creator and creation',
      reading: 'The creature blames Victor for making him ugly and then rejecting him, so the creator has failed his own child.',
      misreadings: [
        'The creature thanks Victor for making him strong, and he only wishes that he had been made a little taller.',
        'The creature is angry with the De Laceys for turning away from him, and he plans to punish them for it.',
        'The creature is reading a frightening novel about a monster, and he is upset by the cruel creator in the story.',
      ],
    },
    {
      text: 'I am malicious because I am miserable.',
      who: 'the creature', where: 'Chapter 17', lead: 'Victor refuses to make the creature a companion:', theme: 'Isolation and rejection',
      reading: 'The creature’s cruelty grows out of his loneliness, so the balanced sentence ties his evil directly to his suffering.',
      misreadings: [
        'The creature enjoys being cruel, and he only claims to be miserable so that Victor will feel sorry for him.',
        'The creature means that he is ill and in pain, so he cannot be held responsible for anything he has done.',
        'The creature admits that he is jealous of Victor’s wealth, and his malice is a plan to steal his money.',
      ],
    },
    {
      text: 'if I cannot inspire love, I will cause fear',
      who: 'the creature', where: 'Chapter 17', lead: 'The creature warns Victor what will happen if he refuses:', theme: 'Revenge',
      reading: 'Denied love, the creature turns to revenge instead, so his threat shows how rejection drives him to violence.',
      misreadings: [
        'The creature is joking that he is too ugly to be loved, and he means to spend his life scaring children.',
        'The creature promises to leave humanity alone forever, since he knows he can never make anyone love him.',
        'The creature is asking Victor to teach him how to make friends, since he has no idea how love is earned.',
      ],
    },
    {
      text: 'I shall be with you on your wedding-night.',
      who: 'the creature', where: 'Chapter 20', lead: 'Victor has torn apart the female creature:', theme: 'Revenge',
      reading: 'The creature threatens to destroy Victor’s happiness as Victor destroyed his, though Victor wrongly thinks he is the target.',
      misreadings: [
        'The creature promises to come to the wedding as a guest, to show Victor that he has forgiven him at last.',
        'The creature means that he will marry on the same night as Victor, since he has found a companion of his own.',
        'The creature warns Victor that Elizabeth does not love him, and that the wedding should not take place at all.',
      ],
    },
    {
      text: 'You seek for knowledge and wisdom, as I once did; and I ardently hope that the gratification of your wishes may not be a serpent to sting you, as mine has been.',
      who: 'Victor Frankenstein', where: 'Letter 4', lead: 'Victor agrees to tell Walton his story:', theme: 'Dangerous knowledge',
      reading: 'Victor sees his own ambition in Walton and warns him, so the story that follows is told as a cautionary tale.',
      misreadings: [
        'Victor envies Walton’s youth, and he hopes that Walton will finish the experiment he was forced to abandon.',
        'Victor is warning Walton about the snakes on the ship, which have already bitten several of the crew.',
        'Victor is praising Walton’s courage, and he hopes that Walton will become as famous a scientist as he is.',
      ],
    },
    {
      text: 'I shall die, and what I now feel be no longer felt.',
      who: 'the creature', where: 'Chapter 24', lead: 'The creature stands over Victor’s body:', theme: 'Isolation and rejection',
      reading: 'The creature sees death as the only end to his suffering, so he leaves the novel as alone as he entered it.',
      misreadings: [
        'The creature is glad that Victor is dead, and he looks forward to a long and peaceful life of his own.',
        'The creature is afraid of dying, and he begs Walton to protect him from the sailors on board the ship.',
        'The creature means that he will forget Victor quickly, since he never felt anything for him in the first place.',
      ],
    },
  ],
  context: [
    {
      ask: 'The 1831 edition of *Frankenstein* is subtitled *The Modern Prometheus*. Why?',
      right: 'Prometheus gave humans the gods’ fire and was punished, as Victor is for taking the power to create life',
      wrong: ['Prometheus was a scientist in ancient Greece who built the first machine, as Victor builds his creature', 'Prometheus was a monster from Greek myth whom a hero killed, as Victor tries to kill the creature', 'Prometheus was the god of the Arctic, where Walton is sailing when he meets Victor on the ice'],
      sol: 'In Greek myth Prometheus defied the gods by giving fire to humans, and was chained to a rock for ever. Victor also oversteps human limits and is punished.',
    },
    {
      ask: 'What scientific idea of Shelley’s time does Victor’s experiment draw on?',
      right: 'Galvanism: experiments showing that electricity could make the muscles of dead animals move',
      wrong: ['Vaccination: experiments showing that a mild illness could protect the body from a deadly one', 'Evolution: Darwin’s theory that humans had developed slowly from earlier forms of life', 'Steam power: the new engines that were starting to drive the factories of Shelley’s time'],
      sol: 'In the early 1800s scientists such as Luigi Galvani and his nephew made dead animals twitch with electric currents. Some wondered if electricity was the “spark of life”.',
    },
    {
      ask: 'What is the effect of the novel’s **frame narrative** (Walton’s letters, Victor’s story, the creature’s story)?',
      right: 'We hear each side in its own words, so we can judge Victor and the creature for ourselves',
      wrong: ['It hides the ending from the reader, since Walton dies before he can finish writing his letters', 'It shows that the whole story is a dream, since Walton is ill with a fever as he writes it all down', 'It means that the creature never speaks for himself, so we only hear Victor’s side of the story'],
      sol: 'The story is nested like boxes: Walton’s letters hold Victor’s account, which holds the creature’s. The creature’s own voice at the centre makes readers sympathise with him.',
    },
    {
      ask: 'How is *Frankenstein* a **Gothic** novel?',
      right: 'It has horror, wild and lonely settings, extreme emotion and a monster, and it explores forbidden knowledge',
      wrong: ['It is set in grand churches built in the Gothic style, and most of its scenes take place in cathedrals', 'It is a comic novel about a family of scientists, with a happy wedding at the end of the final chapter', 'It is told entirely in verse, like the long Gothic poems that were popular in the Middle Ages'],
      sol: 'Gothic novels use terror, the supernatural or unnatural, dark and remote places and intense feeling. Shelley adds science to the Gothic tradition.',
    },
    {
      ask: 'How do Shelley’s **settings** of mountains, glaciers and Arctic ice add to the novel?',
      right: 'Their vast, wild beauty is sublime, and their cold emptiness matches the isolation of Victor and the creature',
      wrong: ['They show that the story takes place in summer, so they contrast with the dark mood of the events', 'They are crowded with tourists, so they show that Victor is never left alone in the whole novel', 'They are the places where Shelley grew up, so she describes them only to remember her childhood'],
      sol: 'Romantic writers saw great mountains as “sublime”: awe-inspiring and terrifying. The icy wastes also mirror the characters’ loneliness.',
    },
    {
      ask: 'How does the creature learn to speak and read?',
      right: 'By secretly watching the De Lacey family and reading books he finds, such as *Paradise Lost*',
      wrong: ['Victor teaches him in the laboratory in Ingolstadt during the weeks before the creature escapes', 'Walton’s sailors teach him on board the ship while Victor lies ill in his cabin in the Arctic', 'He is born already able to speak, since Victor gave him a fully grown and educated brain'],
      sol: 'Hidden next to the De Laceys’ cottage, he learns language as they teach Safie. He then reads *Paradise Lost*, which shapes how he sees himself and Victor.',
    },
  ],
};
