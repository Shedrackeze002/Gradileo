/** The Sign of Four, Arthur Conan Doyle (1890). Quotations from Project Gutenberg eBook #2097, which uses the first title, *The Sign of the Four*. */
import type { LitText } from '../literature.ts';

export const SIGN_OF_FOUR: LitText = {
  title: 'The Sign of Four',
  author: 'Arthur Conan Doyle',
  date: '1890',
  source: 'Arthur Conan Doyle, The Sign of the Four, 1890. Quoted from Project Gutenberg eBook #2097.',
  part: 'Chapter',
  characters: [
    { name: 'Sherlock Holmes', is: 'a brilliant consulting detective who solves cases by observation and reasoning, and takes cocaine when bored' },
    { name: 'Dr Watson', is: 'the narrator, Holmes’s loyal friend and flatmate, an army doctor who falls in love during the case' },
    { name: 'Mary Morstan', is: 'a young governess whose father vanished ten years ago, and who has received a pearl every year since' },
    { name: 'Thaddeus Sholto', is: 'a nervous, fussy little man who tells Mary the secret of the Agra treasure' },
    { name: 'Bartholomew Sholto', is: 'Thaddeus’s twin brother, who finds the hidden treasure and is found dead the same night' },
    { name: 'Jonathan Small', is: 'a one-legged former soldier and convict who believes the Agra treasure is rightfully his' },
    { name: 'Athelney Jones', is: 'a boastful Scotland Yard detective who arrests the wrong people and takes the credit' },
    { name: 'Wiggins', is: 'the leader of the Baker Street Irregulars, the street boys Holmes pays to search London for him' },
  ],
  events: [
    { where: 'Chapter 1', what: 'Watson objects to Holmes taking cocaine, and Holmes says his mind rebels at having nothing to do.' },
    { where: 'Chapter 2', what: 'Mary Morstan asks for help with the mystery of her missing father and the pearls.' },
    { where: 'Chapter 4', what: 'Thaddeus Sholto tells the story of the Agra treasure and of his father’s death.' },
    { where: 'Chapter 5', what: 'Bartholomew Sholto is found dead at Pondicherry Lodge, and the treasure is gone.' },
    { where: 'Chapter 7', what: 'Holmes and Watson follow the dog Toby along the trail of creosote.' },
    { where: 'Chapter 8', what: 'The Baker Street Irregulars are sent to search the river for the steam launch Aurora.' },
    { where: 'Chapter 10', what: 'Holmes and the police chase the Aurora down the Thames, and Small is captured.' },
    { where: 'Chapter 11', what: 'The treasure box is opened and found empty, and Watson tells Mary that he loves her.' },
    { where: 'Chapter 12', what: 'Small tells the story of the four men, the Indian Rebellion and the stolen treasure.' },
  ],
  themes: ['Reason and detection', 'Greed and treasure', 'Empire and justice', 'Love', 'Boredom and addiction'],
  quotations: [
    {
      text: 'Which is it to-day?” I asked,—“morphine or cocaine?',
      who: 'Dr Watson', where: 'Chapter 1', lead: 'Watson watches Holmes inject himself, as he does three times a day:', theme: 'Boredom and addiction',
      reading: 'Watson’s sharp question shows he disapproves, so from the start we see Holmes’s habit through a worried friend’s eyes.',
      misreadings: [
        'Watson is asking which medicine Holmes needs, since he is acting as Holmes’s doctor during a serious illness.',
        'Watson wants to try the drugs himself, and he is asking Holmes which one he would recommend for a beginner.',
        'Watson is joking about two racehorses called Morphine and Cocaine, which Holmes has bet money on that day.',
      ],
    },
    {
      text: 'rebels at stagnation. Give me problems, give me work',
      who: 'Sherlock Holmes', where: 'Chapter 1', lead: 'Holmes explains why he takes cocaine:', theme: 'Boredom and addiction',
      reading: 'Holmes’s mind needs constant puzzles, so without a case he turns to drugs, which shows the cost of his genius.',
      misreadings: [
        'Holmes is complaining that he has too many cases, and he wants a long rest in the countryside to recover.',
        'Holmes is asking Watson to find him a regular job, since he is tired of earning so little as a detective.',
        'Holmes is describing a political rebellion in India, which he has been reading about in the morning paper.',
      ],
    },
    {
      text: 'Detection is, or ought to be, an exact science, and should be treated in the same cold and unemotional manner.',
      who: 'Sherlock Holmes', where: 'Chapter 1', lead: 'Holmes criticises the way Watson wrote up their last case:', theme: 'Reason and detection',
      reading: 'Holmes sees detection as pure logic, like science, and thinks Watson spoiled it by adding romance and feeling.',
      misreadings: [
        'Holmes praises Watson’s writing for its feeling, and asks him to add more romance to his next story.',
        'Holmes admits that detection is mostly guesswork, and he is afraid that Watson made him look too clever.',
        'Holmes is complaining that the police use too much science, and he wants detectives to trust their feelings.',
      ],
    },
    {
      text: 'You really are an automaton,—a calculating-machine!',
      who: 'Dr Watson', where: 'Chapter 2', lead: 'Holmes says he did not notice whether Mary Morstan was attractive:', theme: 'Reason and detection',
      reading: 'Watson thinks Holmes’s cold reason makes him almost inhuman, which contrasts with Watson’s own warm feelings.',
      misreadings: [
        'Watson admires Holmes’s skill at arithmetic, and he asks him to help with the household accounts that evening.',
        'Watson is joking that Holmes moves stiffly, like a clockwork toy, after spending so long sitting in his chair.',
        'Watson is angry that Holmes has charged Mary too much money, and he calls him greedy and calculating.',
      ],
    },
    {
      text: 'when you have eliminated the impossible whatever remains, however improbable, must be the truth?',
      who: 'Sherlock Holmes', where: 'Chapter 6', lead: 'Holmes explains how the killer must have entered the locked room:', theme: 'Reason and detection',
      reading: 'Holmes reasons by ruling out what cannot be, so even a strange answer must be accepted if nothing else is left.',
      misreadings: [
        'Holmes believes that the most likely answer is always right, so he tells Watson to ignore anything unusual.',
        'Holmes means that some crimes are impossible to solve, so he will give up the case and leave it to the police.',
        'Holmes believes that a ghost must have committed the crime, since no living person could have got into the room.',
      ],
    },
    {
      text: 'Women are never to be entirely trusted,—not the best of them.',
      who: 'Sherlock Holmes', where: 'Chapter 9', lead: 'Watson is going to tell Mary Morstan what has happened:', theme: 'Love',
      reading: 'Holmes’s distrust of women shows the limits of his cold reasoning, and Watson calls it an “atrocious sentiment”.',
      misreadings: [
        'Holmes suspects that Mary Morstan is the murderer, and he has evidence that he is keeping from Watson.',
        'Holmes is warning Watson that Mary is already engaged, since he has noticed a ring on her finger.',
        'Holmes means that women are too kind-hearted to keep a secret, which he says as a compliment to them.',
      ],
    },
    {
      text: 'a great shadow seemed to pass from my soul.',
      who: 'Dr Watson', where: 'Chapter 11', lead: 'The treasure box is opened and found to be empty:', theme: 'Love',
      reading: 'Without the treasure Mary is no longer far richer than Watson, so its loss frees him to tell her he loves her.',
      misreadings: [
        'Watson is disappointed that the treasure is lost, since he had hoped that Mary would share it with him.',
        'Watson is relieved because he thinks the treasure was cursed, and he believes that it killed Bartholomew Sholto.',
        'Watson feels guilty that he lost the treasure on the river, and he is afraid that Mary will blame him for it.',
      ],
    },
    {
      text: 'Look how I have earned it! Twenty long years in that fever-ridden swamp',
      who: 'Jonathan Small', where: 'Chapter 12', lead: 'Small explains why he threw the treasure into the Thames:', theme: 'Greed and treasure',
      reading: 'Small thinks his suffering gives him a right to the treasure, so he would rather destroy it than see others have it.',
      misreadings: [
        'Small regrets his greed, and he tells the police where the treasure can be found so that it can go to Mary.',
        'Small says that he worked honestly for the treasure as a farmer, and that the police have arrested him by mistake.',
        'Small is describing his time as a soldier, and he is asking for a medal for the years he served in India.',
      ],
    },
    {
      text: 'love is an emotional thing, and whatever is emotional is opposed to that true cold reason which I place above all things.',
      who: 'Sherlock Holmes', where: 'Chapter 12', lead: 'Watson tells Holmes that he and Mary are engaged:', theme: 'Reason and detection',
      reading: 'Holmes puts reason above every feeling, so he cannot share Watson’s happiness, and will never marry himself.',
      misreadings: [
        'Holmes is delighted for Watson, and admits that he too is secretly in love and hopes to be married soon.',
        'Holmes is warning Watson that Mary is only marrying him for money, since she has lost the treasure.',
        'Holmes means that love is the most reasonable thing of all, so he praises Watson’s logical choice of wife.',
      ],
    },
    {
      text: 'there still remains the cocaine-bottle.',
      who: 'Sherlock Holmes', where: 'Chapter 12', lead: 'Watson says he gets a wife and Jones the credit, so what is left for Holmes?', theme: 'Boredom and addiction',
      reading: 'With the case over, Holmes returns to his drug, so the novel ends where it began, with the cost of his empty hours.',
      misreadings: [
        'Holmes is joking that he will drink a toast to Watson’s wedding, and he pours them both a glass of wine.',
        'Holmes is telling Watson that he has given up cocaine for good, and will pour the bottle away in celebration.',
        'Holmes means that he has kept a clue in the bottle, and will use it to solve another case the next morning.',
      ],
    },
  ],
  context: [
    {
      ask: 'What part of history lies behind the Agra treasure?',
      right: 'British rule in India and the Indian Rebellion of 1857, when Small and three men steal it',
      wrong: ['The Crimean War, when British soldiers found the treasure buried in a Russian fortress', 'The Napoleonic Wars, when the treasure was taken from a French ship sunk off the coast of Kent', 'The discovery of gold in Australia, where the four men dug up the treasure as prospectors'],
      sol: 'In 1857 Indian soldiers rose against the British East India Company. Small, a British soldier, tells how the treasure was stolen and a man was murdered during the siege of Agra.',
    },
    {
      ask: 'Why is it significant that the story is told by **Watson**, not Holmes?',
      right: 'We follow the case as puzzled as Watson, so Holmes’s reasoning surprises us when he explains it',
      wrong: ['Watson solves the case himself, so the novel shows that he is the better detective of the two', 'Watson is the murderer, and he hides the truth from the reader until the very last chapter', 'Watson cannot see well at night, so the reader never learns what happened on the river'],
      sol: 'Watson is an ordinary, warm-hearted observer. Seeing Holmes through his admiring eyes makes the detective seem brilliant and mysterious.',
    },
    {
      ask: 'How do many modern readers view the novel’s description of **Tonga**, Small’s companion from the Andaman Islands?',
      right: 'As racist: it reflects the prejudiced attitudes of the British Empire, which the novel does not question',
      wrong: ['As accurate: it is based on a careful scientific study that Doyle made of the islands himself', 'As comic: it was meant as a joke, and the original readers did not take it seriously at all', 'As heroic: Tonga is shown as the bravest and most loyal character in the whole novel'],
      sol: 'Tonga is described in dehumanising terms, as many colonial writers described people the Empire ruled. Readers today recognise this as racist stereotyping.',
    },
    {
      ask: 'Why might Holmes’s cocaine use have shocked readers in 1890 less than it would today?',
      right: 'Cocaine was legal and sold by chemists, though doctors were starting to warn of its dangers, as Watson does',
      wrong: ['Cocaine had not yet been discovered, so readers thought Doyle had invented an imaginary drug', 'Cocaine was a common cure for colds, so every reader would have kept some at home', 'Cocaine was only used by the police, so readers thought Holmes was taking it as part of his work'],
      sol: 'Cocaine was legal in Britain until 1916. Watson’s worries reflect a growing medical understanding of addiction.',
    },
    {
      ask: 'What makes *The Sign of Four* a typical **detective story**?',
      right: 'A crime, clues, false suspects and a brilliant detective, with the solution explained at the end',
      wrong: ['A ghost who haunts a castle, and a hero who must lift a family curse by the final chapter', 'A long journey to an unknown land, where the hero meets strange creatures and returns home', 'A love story between two rivals, which ends in a wedding with no crime anywhere in it'],
      sol: 'The novel follows the pattern of detective fiction: a mystery, a trail of clues, a chase and a final explanation of how and why.',
    },
    {
      ask: 'What role does **London** play in the novel?',
      right: 'Its fog, river and crowded streets hide criminals, so Holmes needs his street boys to find them',
      wrong: ['It is a safe, quiet city, so the crime from India seems out of place and is soon forgotten', 'It is only mentioned in the first chapter, since the rest of the novel takes place in India', 'It is a city Holmes does not know, so he must hire a guide to find his way around it'],
      sol: 'Doyle’s London is foggy, huge and full of hiding places. Holmes knows it street by street, and the Irregulars are his eyes on the river.',
    },
  ],
};
