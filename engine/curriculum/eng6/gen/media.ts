/**
 * Grade 6 English, Unit 4: Media (E6-D1). Advertising techniques and audiences, and the messages
 * of images and headlines. The advertisements, images and headlines are invented for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const D1 = ['E6-D1'];

const TECHS = ['Bandwagon', 'Testimonial', 'Emotional appeal', 'Facts and figures'];
const tech = (d: 1 | 2 | 3, ad: string, k: number, why: string) =>
  Q(d, 'Which advertising technique does this advertisement use most?', TECHS[k], TECHS.filter((_, i) => i !== k), why, ad);

const TECHNIQUE = [
  tech(1, 'Everyone at school is wearing ZoomKicks. Don’t be the only one left out!', 0,
    'Bandwagon tells you to join in because everyone else is doing it.'),
  tech(1, '“I eat Crunch-O’s every morning before a match,” says football star Leo Diaz.', 1,
    'A testimonial uses a famous or trusted person to recommend the product. (Leo Diaz is invented.)'),
  tech(2, 'A puppy waits alone in the rain. “For just a few coins a week, you can give him a warm home.”', 2,
    'The lonely puppy is meant to make you feel sad and want to help. That is an emotional appeal.'),
  tech(2, 'BrightSmile toothpaste: in our tests, 9 out of 10 users had fewer fillings after one year.', 3,
    'Numbers and test results try to persuade with facts and figures. A reader should ask who did the tests.'),
  tech(2, 'Join the millions of families who have already switched to FreshFarm milk.', 0,
    '“Join the millions” is bandwagon: everyone is doing it, so you should too.'),
  tech(3, 'Dr. Ana Reyes, a children’s dentist, says: “I recommend BrightSmile to all my young patients.”', 1,
    'An expert recommends the product. This is a testimonial from someone who seems trustworthy. (Dr. Reyes is invented.)'),
  tech(3, 'Picture your family laughing together on the beach. Book a SunnyBay holiday today: because those moments last forever.', 2,
    'The advert sells a warm feeling (family, laughter, memories) rather than details about the holiday.'),
  tech(3, 'The new Bolt bike is 20% lighter and has 21 gears, more than any other bike in its price range.', 3,
    'The advert uses measurable details to persuade: facts and figures.'),
];

const AUDIENCE = [
  Q(1, 'Who is the target audience of this advertisement?', 'Young children', ['Grandparents', 'Business people', 'Teenage athletes'],
    'Bright colours, a cartoon dinosaur and “collect all six” are aimed at young children.',
    'Dino-Pops cereal! Bright colours, a free cartoon dinosaur toy in every box: collect all six!'),
  Q(1, 'Who is this advertisement most likely aimed at?', 'Parents of young children', ['Children aged eight to ten', 'Teenagers who play sports', 'People who have no pets'],
    'Talk of keeping little ones safe and a car seat are aimed at parents.',
    'SafeRide car seats: because nothing matters more than keeping your little one safe.'),
  Q(2, 'An advert for running shoes shows a teenager sprinting past friends and the words “Leave them behind.” Who is the target audience?', 'Teenagers who want to stand out', ['Retired people who enjoy walking', 'Parents buying shoes for babies', 'Doctors who treat sports injuries'],
    'A teenage model and a message about beating friends appeal to teenagers who want to be the best.'),
  Q(2, 'Why do advertisers choose a target audience?', 'To shape the message for the likeliest buyers', ['To make sure that no one else can ever buy the product', 'To follow a law about who is allowed to see adverts', 'To save money by printing far fewer adverts each year'],
    'Knowing the audience helps advertisers choose the words, pictures and places most likely to persuade those buyers.'),
  Q(3, 'An advert appears during a Saturday-morning cartoon show. What does this suggest about its audience?', 'It is aimed at children watching the show.', ['It is aimed at adults who work on Saturdays.', 'It is aimed at people who never watch television.', 'It is aimed at no one in particular at all.'],
    'Where and when an advert appears is chosen for its audience. A cartoon show on Saturday morning is watched mostly by children.'),
  Q(3, 'Which detail would best help an advert for a museum appeal to families?', 'Kids go free at weekends, with hands-on activities.', ['The museum café serves very strong coffee.', 'The museum has a quiet library for researchers.', 'The museum was designed by a famous architect.'],
    'Free entry for children and activities for them appeal directly to families.'),
];

const IMAGE = [
  Q(1, 'A photo shows a smiling child holding a trophy, with confetti falling. What message does it send?', 'Success and joy', ['Fear and danger', 'Boredom and tiredness', 'Anger and unfairness'],
    'Smiling, a trophy and confetti all suggest winning and happiness.'),
  Q(1, 'What is a caption?', 'The words under an image that explain it', ['The title at the top of a newspaper', 'The person who took the photograph', 'The frame placed around a picture'],
    'A caption is a short text beside or under an image that tells what it shows.'),
  Q(2, 'A news photo of a forest fire is taken from a low angle, with flames towering over a firefighter. What does the angle suggest?', 'The fire is huge and powerful.', ['The fire is small and under control.', 'The firefighter is taller than the fire.', 'The photo was taken a long time ago.'],
    'A low angle makes what is above look big and powerful. The firefighter looks small next to the flames.'),
  Q(2, 'An advert for a water park shows only bright sunshine and empty slides. What might it leave out?', 'Long queues and crowded pools', ['The sunshine and blue sky above', 'The slides that the park has', 'The name of the water park'],
    'Images are chosen. An advert shows the best side and may leave out things that would put people off, such as queues.'),
  Q(3, 'Two photos show the same protest. One shows a large crowd; the other shows a few people close up. How might they affect readers differently?', 'The first makes the protest seem bigger and more important.', ['The second makes the protest seem bigger and more important.', 'Both make readers think the protest was very small.', 'Neither photo can tell readers anything at all.'],
    'How a photo is framed shapes what readers think. A wide shot of a crowd makes the protest look large; a close-up of a few people does not.'),
  Q(3, 'A photo of a happy family eating fast food is used in a burger advert. Which question should a careful viewer ask?', 'Is this how eating there really looks and feels?', ['What colour are the clothes the family is wearing?', 'How many people can be seen in the photograph?', 'Is the photo printed on shiny, glossy paper?'],
    'Advertisers choose and stage images to persuade. A careful viewer asks whether the image is realistic.'),
];

const LOADED = [
  Q(1, 'Which headline uses a loaded (emotional) word?', '“Heroic Pupils Save Stranded Dog”', ['“Pupils Help Dog Off Ice”', '“Dog Rescued From Pond”', '“Pupils Find Dog Near School”'],
    'Heroic is a loaded word: it shows strong approval. The other headlines report the event in neutral words.'),
  Q(1, 'Which word is neutral?', 'said', ['sneered', 'bragged', 'whined'],
    'Said simply reports speech. Sneered, bragged and whined all show a negative judgement of the speaker.'),
  Q(2, 'Which headline is most neutral?', '“Council Votes to Close Library on Sundays”', ['“Council Slams Door on Book Lovers”', '“Shameful Council Robs Families of Library”', '“Heartless Cuts Hit Our Precious Library”'],
    'The first only reports what happened. Slams, shameful, robs and heartless are loaded words that show anger.'),
  Q(2, 'What does the loaded word in this headline suggest? “Mayor Finally Admits Park Plan Failed”', 'That the mayor was slow to accept the truth', ['That the mayor was proud of the park plan', 'That the park plan was a great success', 'That the mayor wrote the headline himself'],
    'Finally and admits suggest the mayor resisted the truth for a long time. A neutral headline might say “Mayor Ends Park Plan”.'),
  Q(3, 'Rewrite the loaded headline “Greedy Developers Destroy Beloved Woods” in neutral language.', '“Developers Clear Woods for New Housing”', ['“Developers Wreck Our Precious Woods”', '“Evil Builders Bulldoze Treasured Trees”', '“Selfish Developers Ruin Town Woods”'],
    'A neutral headline reports the facts without judging: clear instead of destroy, and no greedy or beloved.'),
  Q(3, 'Two headlines report the same game: “Tigers Crush Lions 5–0” and “Lions Lose 5–0”. What is the difference?', 'The first uses a stronger word that celebrates the winners.', ['The first reports a different score from the second.', 'The second is about a completely different sport.', 'The second celebrates the winning Tigers more.'],
    'Crush is a loaded verb that makes the win sound powerful. “Lions Lose” is plainer and focuses on the losing side.'),
];

export const MEDIA_SKILLS: SkillDef[] = [
  skill({ id: 'e6-ad-techniques', name: 'Advertising techniques', description: 'Identify bandwagon, testimonial, emotional appeal and facts and figures in advertisements.', outcomes: D1, lessonId: 'e6-4-1', format: 'mc', gen: bank(TECHNIQUE, ['Bandwagon: everyone is doing it. Testimonial: a famous or expert person recommends it.', 'Emotional appeal sells a feeling; facts and figures sell with numbers.']) }),
  skill({ id: 'e6-audience', name: 'Target audience', description: 'Identify the audience an advertisement is aimed at, and how.', outcomes: D1, lessonId: 'e6-4-1', format: 'mc', gen: bank(AUDIENCE, ['Look at the pictures, words and where the advert appears.', 'Ask: who would want this?']) }),
  skill({ id: 'e6-image-message', name: 'Messages in images', description: 'Explain the message an image sends through its content, framing and angle.', outcomes: D1, lessonId: 'e6-4-2', format: 'mc', gen: bank(IMAGE, ['Every image is chosen: ask what it shows and what it leaves out.', 'Low angles make things look powerful.']) }),
  skill({ id: 'e6-loaded-words', name: 'Loaded words in headlines', description: 'Spot loaded words and tell them from neutral ones.', outcomes: D1, lessonId: 'e6-4-2', format: 'mc', gen: bank(LOADED, ['Loaded words carry strong feeling; neutral words only report.']) }),
];
