/**
 * Grade 9 English, Unit 5: Media (E9-E1). Advertising techniques and audiences, and misinformation
 * and checking sources. The adverts, posts and headlines are invented for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const E1 = ['E9-E1'];

// ---------------------------------------------------------------------------- 5.1 advertising

const TECHNIQUES = ['Testimonial', 'Scarcity', 'Bandwagon', 'Glittering generalities'];
const tech = (d: 1 | 2 | 3, text: string, k: number, why: string) =>
  Q(d, 'Which advertising technique is used?', TECHNIQUES[k], TECHNIQUES.filter((_, i) => i !== k), why, text);

const ADS = [
  tech(1, '“I train every day, and I only drink Volt water,” says a champion sprinter.', 0,
    'A well-known person vouches for the product: a testimonial.'),
  tech(1, 'Only 50 left! Offer ends at midnight!', 1,
    'It pressures buyers by suggesting the product will soon be gone: scarcity.'),
  tech(2, 'Join the two million families who have already switched to Sunny Bank.', 2,
    'It suggests you should do what everyone else is doing: bandwagon.'),
  tech(2, 'Brightway: the natural choice for a better, brighter, happier life.', 3,
    'Vague, positive words that sound good but promise nothing specific: glittering generalities.'),
  Q(3, 'An influencer posts a glowing video about a face cream, with “#ad” in small print at the end. Why does the label matter?', 'It tells viewers that the influencer was paid, so the review may not be impartial.', ['It shows that the influencer bought the cream with their own money, unpaid.', 'It means the cream has been tested and approved by doctors.', 'It has no meaning, so viewers can safely ignore it completely.'],
    'Paid promotion must be labelled so audiences can judge it fairly.'),
  Q(3, 'What is a slogan meant to do?', 'Make a brand memorable in a short, catchy phrase', ['List every ingredient that a product contains', 'Explain the price of a product in detail', 'Give the address of the company’s office'],
    'Slogans use rhythm, rhyme or wordplay to stick in the memory.'),
];

const AUDIENCE = [
  Q(1, 'What is a target audience?', 'The group of people an advert is designed to appeal to', ['Everyone who lives in the same country as the company', 'The people who work at the advertising company', 'The judges who give prizes for the best adverts'],
    'Adverts choose images, words and channels to suit a particular group.'),
  Q(1, 'An advert for a toy shows bright cartoons and is shown during children’s television. Who is the target audience?', 'Young children (and the parents who buy for them)', ['Retired people looking for a quiet holiday', 'Business owners buying office equipment', 'Teenagers learning to drive their first car'],
    'The images and the timing are chosen to reach young children.'),
  Q(2, 'An advert for running shoes shows a tired office worker transformed into a confident athlete. What desire does it appeal to?', 'The wish to change and become a better version of oneself', ['The wish to stay exactly the same and avoid exercise', 'The wish to save money by never buying new shoes', 'The wish to learn about the history of running'],
    'Many adverts sell an identity, not just a product.'),
  Q(2, 'Why might a car advert aimed at families show a safety test, while one aimed at young drivers shows speed and style?', 'Each audience values different things, so the advert stresses what they care about.', ['Family cars are always much faster than the sporty cars that are aimed at young drivers.', 'The two adverts must be for two completely different companies.', 'Safety tests are only allowed in adverts shown late at night.'],
    'Advertisers match their message to their audience’s values.'),
  Q(3, 'Why do online adverts often follow you from site to site after you look at a product?', 'Websites track browsing, so adverts can target what you seem to want.', ['Every website on the internet shows exactly the same adverts.', 'The product’s company knows your name and address already.', 'It is a coincidence that the same advert appears again.'],
    'Targeted advertising uses data about your behaviour.'),
];

// ---------------------------------------------------------------------------- 5.2 misinformation

const MISINFO = [
  Q(1, 'What is misinformation?', 'False or misleading information, shared whether or not people know it is false', ['Accurate information that has been carefully checked', 'Any information that appears in a printed newspaper', 'Information that is far too long for anyone to read all the way through in one sitting'],
    'Disinformation is false information spread on purpose to deceive.'),
  Q(1, 'What is clickbait?', 'A headline designed to make you click, often by exaggerating', ['A detailed news report that quotes several named sources', 'An advert that is clearly labelled as an advert', 'The list of links at the bottom of a web page'],
    '“You won’t BELIEVE what happened next!” is typical clickbait.'),
  Q(2, 'Which headline is most likely to be clickbait?', 'Scientists HATE this one weird trick for losing weight!', ['City council approves budget for new library', 'Study of 2,000 adults links a good night’s sleep to memory', 'Storm expected to reach the coast on Friday'],
    'Capital letters, “one weird trick” and emotional bait are warning signs.'),
  Q(2, 'A photo of a shark swimming down a flooded street goes viral after a storm. What should you suspect first?', 'The image may be edited or taken from a different event.', ['Sharks always appear in cities during storms.', 'Any photo shared many times must be genuine.', 'The photographer was in great danger, so it is real.'],
    'Dramatic images are often faked or reused. A reverse image search can find where a photo first appeared.'),
  Q(3, 'What is an echo chamber?', 'An online space where people mainly see views that match their own', ['A large room where sounds bounce off the walls', 'A news website that fairly shows every side of a big story', 'A group chat that is used only for sharing music'],
    'Algorithms and choices can trap us among people who agree with us, so false claims go unchallenged.'),
  Q(3, 'Why does misinformation often spread faster than corrections?', 'It is often more surprising or emotional, so people share it quickly.', ['Corrections are always longer and more exciting to read.', 'Misinformation is checked carefully before it is shared.', 'People never share anything online that makes them feel any emotion.'],
    'Strong emotions such as fear and outrage drive sharing.'),
];

const VERIFY = [
  Q(1, 'What is the first question to ask about a surprising claim online?', 'Who is behind this, and what do they want?', ['How many people have liked or shared it?', 'Does it have a bright and attractive design?', 'Is it written in capital letters for emphasis?'],
    'Knowing the source and its motive is the first step.'),
  Q(2, 'What is lateral reading?', 'Opening new tabs to check what other sources say about a site or claim', ['Reading a single web page very slowly from top to bottom', 'Reading only the headline and then skipping the article itself', 'Reading the same article several times to remember it'],
    'Fact-checkers leave the page and look it up elsewhere, rather than judging it by its own look.'),
  Q(2, 'A post says a famous scientist claimed that chocolate cures colds, but gives no link. What is the best next step?', 'Search for the quote in reliable sources to see if the scientist really said it.', ['Share it at once so that all of your friends can benefit from the advice.', 'Believe it, because scientists are always correct about health.', 'Ignore all health news from now on, because none of it is true.'],
    'Quotes are often invented or twisted. Check before trusting or sharing.'),
  Q(3, 'Two websites report the same claim. Why does that not prove it is true?', 'One may have copied the other, so they are not independent sources.', ['Two sources always prove that a claim is true without doubt.', 'Websites are never allowed to copy each other’s stories.', 'Claims that appear twice are always meant as jokes.'],
    'Look for independent confirmation from trustworthy sources.'),
  Q(3, 'Why are fact-checking organisations useful?', 'They investigate viral claims and show the evidence for their verdicts.', ['They decide which of the news stories are the most exciting ones to read.', 'They write adverts for companies that sell health products.', 'They only check claims that are already known to be true.'],
    'Good fact-checkers explain their sources, so you can follow their reasoning.'),
];

// ---------------------------------------------------------------------------- skills

export const MEDIA_SKILLS: SkillDef[] = [
  skill({ id: 'e9-ad-techniques', name: 'Advertising techniques', description: 'Identify testimonials, scarcity, bandwagon and glittering generalities, and spot paid promotion.', outcomes: E1, lessonId: 'e9-5-1', format: 'mc', gen: bank(ADS, ['Ask: what is the advert trying to make me feel or believe?']) }),
  skill({ id: 'e9-target-audience', name: 'Target audiences', description: 'Explain how an advert is designed for its audience.', outcomes: E1, lessonId: 'e9-5-1', format: 'mc', gen: bank(AUDIENCE, ['Look at the images, words and where the advert appears.']) }),
  skill({ id: 'e9-misinformation', name: 'Recognizing misinformation', description: 'Recognize misinformation, clickbait, manipulated images and echo chambers.', outcomes: E1, lessonId: 'e9-5-2', format: 'mc', gen: bank(MISINFO, ['Strong emotion is a reason to slow down and check.']) }),
  skill({ id: 'e9-verify', name: 'Checking a claim', description: 'Check a claim using lateral reading and independent sources.', outcomes: E1, lessonId: 'e9-5-2', format: 'mc', gen: bank(VERIFY, ['Leave the page: what do other sources say?']) }),
];
