/**
 * Grade 7 English, Unit 5: Media (E7-E1). How news reports are built and angled, and how to judge
 * sources and purposes online. The reports, websites and posts are invented for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const E1 = ['E7-E1'];

const REPORT = 'Hundreds of volunteers cleared 2 tonnes of litter from Riverside Beach on Saturday morning. The clean-up, organized by the local sailing club, began at 8 a.m. and ended at noon. “We were amazed by how many people came,” said club captain Ana Silva. The council has promised new bins along the beach by the summer.';

// ---------------------------------------------------------------------------- 5.1 news reports

const FEATURES = [
  Q(1, 'What are the five Ws of a news report?', 'Who, what, when, where and why', ['Who, which, whose, whom and whether', 'Write, wait, watch, work and win', 'When, why, wish, worry and wonder'],
    'A news report answers who, what, when, where and why (and often how).'),
  Q(1, 'What is the lead of a news report?', 'The opening, which gives the most important facts', ['The name of the reporter, printed at the bottom', 'The photograph printed above the article', 'The last paragraph, with a quotation'],
    'The lead hooks the reader and gives the key facts at once.'),
  Q(2, 'Which of the five Ws does “on Saturday morning” answer?', 'When', ['Who', 'Where', 'Why'],
    'Saturday morning is the time of the event.', REPORT),
  Q(2, 'Why does the report include a quotation from Ana Silva?', 'To add the voice of someone involved', ['To give the exact amount of litter', 'To explain where the beach is', 'To show the time the event began'],
    'Quotations from witnesses or organizers add a human voice and make the report feel firsthand.', REPORT),
  Q(3, 'News reports often use the “inverted pyramid”. What does this mean?', 'The most important facts come first, and details later.', ['The story is told in the order that events happened.', 'The most important facts are saved for the very end.', 'Every paragraph in the report is exactly the same length.'],
    'Like an upside-down pyramid, the widest (most important) part is at the top. Readers who stop early still get the main facts.'),
  Q(3, 'Which sentence in the report is least important, and so placed last?', 'The council’s promise of new bins by the summer', ['The volunteers clearing 2 tonnes of litter', 'The sailing club organizing the clean-up', 'The clean-up taking place at the beach'],
    'The main event (what, who, where) comes first. The future bins are extra detail, so they come last.', REPORT),
];

const ANGLES = [
  Q(1, 'Which headline makes the clean-up sound most positive?', 'Heroes sweep beach clean in record turnout', ['Beach clean-up held at Riverside on Saturday', 'Litter cleared from Riverside Beach', 'Volunteers meet at the beach'],
    'Heroes and record turnout are positive, admiring words. The others are neutral.', REPORT),
  Q(1, 'What is the angle of a news story?', 'The point of view or focus the writer chooses', ['The shape and size of the newspaper page', 'The number of photographs used in the story', 'The date on which the story is printed'],
    'Two reporters can describe the same event with different angles by choosing what to stress.'),
  Q(2, 'Two headlines: “Shop owners cheer new car park” and “Park lost to concrete as car park opens”. What does this show?', 'The same event can be given different angles.', ['One headline must contain a spelling mistake.', 'The two headlines are about different events.', 'Both headlines are written without any bias.'],
    'Both describe the car park opening, but one focuses on shop owners’ joy and the other on the lost park.'),
  Q(2, 'A report on a storm opens with a family whose home flooded, rather than with rainfall figures. What effect does this have?', 'It makes readers feel the human cost of the storm.', ['It tells readers exactly how much rain fell.', 'It makes the storm seem less serious than it was.', 'It shows the reporter knows nothing about the weather.'],
    'Starting with people puts the human story first. The angle is on how the storm affected lives.'),
  Q(3, 'Which choice by a reporter does NOT change a story’s angle?', 'Correcting the spelling of a street name', ['Choosing which person to quote first', 'Choosing which photograph to print', 'Choosing which facts to put in the headline'],
    'Quotations, photographs and headline facts all shape how readers see the story. Fixing a spelling does not.'),
  Q(3, 'A report says the mayor “admitted” the plan was late, rather than “said”. What does the word choice suggest?', 'That the mayor was forced to confess a failure', ['That the mayor was very proud of the plan', 'That the reporter agrees with the mayor', 'That the plan is going to be finished early'],
    'Admitted suggests owning up to something bad. A neutral verb would be said or stated.'),
];

// ---------------------------------------------------------------------------- 5.2 reliable sources online

const RELIABLE = [
  Q(1, 'Which source is most likely to be reliable for facts about volcanoes?', 'A national geological survey’s website', ['An anonymous comment on a video', 'A post shared by a stranger', 'A joke page about natural disasters'],
    'A science organization that studies volcanoes has expert authors and checks its facts.'),
  Q(1, 'Which detail makes a web page more trustworthy?', 'It names its author and their qualifications.', ['It uses lots of bright colours and pictures.', 'It has many exclamation marks in the title.', 'It asks you to share it before reading.'],
    'Knowing who wrote something, and why they are qualified, helps you judge it.'),
  Q(2, 'An article about mobile phones was last updated in 2009. Why might this matter?', 'The information may be out of date.', ['Older articles are always more accurate.', 'The article will be too short to read.', 'The date has no effect on reliability.'],
    'Technology changes quickly, so a page from 2009 may describe phones that no longer exist.'),
  Q(2, 'What does it mean to cross-check a fact?', 'To see whether other reliable sources say the same', ['To mark the fact with a cross because it is wrong', 'To read the same page a second time', 'To ask a friend whether they like the fact'],
    'If several independent, reliable sources agree, the fact is more likely to be true.'),
  Q(3, 'A post says “Scientists prove chocolate cures colds!” but names no scientists and links to no study. What should you do?', 'Doubt it until you find a reliable source.', ['Believe it, because it mentions scientists.', 'Share it at once so others know.', 'Assume all science is made up.'],
    'Claims with no named source or study cannot be checked. Search for a reliable source before believing it.'),
  Q(3, 'Which web address is most likely to belong to a university?', 'A site ending in .edu or .ac.uk', ['A site ending in .shop or .store', 'A site ending in .biz or .info', 'A site ending in .fun or .fan'],
    'In many countries, universities use .edu or .ac addresses. The address is one clue among several, not proof on its own.'),
];

const PURPOSES = ['To inform', 'To persuade', 'To sell', 'To entertain'];
const purpose = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'What is the main purpose of this online text?', PURPOSES[k], PURPOSES.filter((_, i) => i !== k), why, text);

const PURPOSE = [
  purpose(1, 'Library opening hours: Monday to Friday, 9 a.m. to 6 p.m. Closed on public holidays.', 0,
    'The text simply gives information.'),
  purpose(1, 'Get 50% off all trainers this weekend only! Click here to buy now.', 2,
    'A discount and a “buy now” link show it is trying to sell.'),
  purpose(2, 'Ten photos of cats who think they are dogs. Number 7 will make you laugh!', 3,
    'Funny photos are meant to amuse readers.'),
  purpose(2, 'Write to your council today and demand safer crossings near our schools.', 1,
    'It urges readers to take action for a cause, so its purpose is to persuade.'),
  purpose(3, 'Sponsored: I tried GlowSkin cream for a week, and wow, my skin has never looked better! Use my code for 10% off.', 2,
    'It looks like a personal review, but “Sponsored” and a discount code show that it is paid advertising.'),
  Q(3, 'Why do some websites label posts as “sponsored” or “ad”?', 'To show that someone paid for the post', ['To show that the post is a news report', 'To show that the post won a prize', 'To show that the post is very old'],
    'A sponsored post is advertising. Labels help readers know when a post is trying to sell them something.'),
];

// ---------------------------------------------------------------------------- skills

export const MEDIA_SKILLS: SkillDef[] = [
  skill({ id: 'e7-news-features', name: 'Features of a news report', description: 'Know the headline, lead, five Ws, quotations and inverted pyramid of a news report.', outcomes: E1, lessonId: 'e7-5-1', format: 'mc', gen: bank(FEATURES, ['A news report answers who, what, when, where and why.', 'The most important facts come first.']) }),
  skill({ id: 'e7-news-angle', name: 'The angle of a story', description: 'Explain how headlines, word choice and order give a news report its angle.', outcomes: E1, lessonId: 'e7-5-1', format: 'mc', gen: bank(ANGLES, ['Ask: what does the writer choose to stress?', 'Compare loaded words with neutral ones.']) }),
  skill({ id: 'e7-reliable-source', name: 'Reliable sources online', description: 'Judge whether an online source is reliable by its author, date, evidence and agreement with other sources.', outcomes: E1, lessonId: 'e7-5-2', format: 'mc', gen: bank(RELIABLE, ['Ask: who wrote it, when, and how do they know?', 'Cross-check with other reliable sources.']) }),
  skill({ id: 'e7-online-purpose', name: 'Purpose of online texts', description: 'Identify whether an online text informs, persuades, sells or entertains, including sponsored posts.', outcomes: E1, lessonId: 'e7-5-2', format: 'mc', gen: bank(PURPOSE, ['Ask: what does this text want me to do?', 'Look for labels like “sponsored” or “ad”.']) }),
];
