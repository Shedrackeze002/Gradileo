/**
 * Grade 10 English, lesson 7.2: Punctuation (10-G1). Commas, apostrophes, semicolons and colons.
 * Each question has one correctly punctuated choice; every wrong choice breaks a rule that holds in
 * every variety of English. Points where varieties differ (the comma before "and" in a list,
 * punctuation inside or outside quotation marks) are never tested.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, people, PEOPLE } from './common.ts';

const LESSON = 'e10-7-2';
const OUTCOMES = ['10-G1'];

// ---------------------------------------------------------------------------- commas

type CommaRule = 'intro' | 'compound' | 'nonessential' | 'address' | 'subject';

interface CommaItem {
  correct: string;
  wrong: string[];
}

const RULE_TEXT: Record<CommaRule, string> = {
  intro: 'A comma follows an introductory word, phrase or clause, to show where the main clause begins.',
  compound: 'When a coordinating conjunction (for, and, nor, but, or, yet, so) joins two independent clauses, a comma goes before the conjunction, not after it.',
  nonessential: 'Information that could be removed without changing which person or thing is meant is non-essential, so it is set off with a pair of commas: one before it and one after it.',
  address: 'Words that name the person or people being spoken to (direct address), such as a name or “everyone”, are set off from the rest of the sentence with commas.',
  subject: 'A comma never separates a subject from its verb, however long the subject is.',
};

const COMMAS: Record<CommaRule, CommaItem[]> = {
  intro: [
    { correct: 'When the bell rang, the students hurried to the gym.', wrong: ['When, the bell rang the students hurried to the gym.', 'When the bell rang the students, hurried to the gym.', 'When the bell, rang, the students hurried to the gym.'] },
    { correct: 'After the long drive from the airport, NAME fell asleep on the sofa.', wrong: ['After, the long drive from the airport NAME fell asleep on the sofa.', 'After the long drive from the airport NAME, fell asleep on the sofa.', 'After the long drive from the airport NAME fell, asleep on the sofa.'] },
    { correct: 'Unfortunately, the concert was called off at the last minute.', wrong: ['Unfortunately the concert, was called off at the last minute.', 'Unfortunately, the concert, was called off at the last minute.', 'Unfortunately the concert was called, off at the last minute.'] },
    { correct: 'If it rains tomorrow, the match will be played indoors.', wrong: ['If, it rains tomorrow the match will be played indoors.', 'If it rains tomorrow the match, will be played indoors.', 'If it rains, tomorrow the match, will be played indoors.'] },
    { correct: 'Before leaving the house, NAME checked that the stove was off.', wrong: ['Before leaving, the house NAME checked that the stove was off.', 'Before leaving the house NAME checked, that the stove was off.', 'Before leaving the house, NAME, checked that the stove was off.'] },
    { correct: 'Yes, the museum is open on public holidays.', wrong: ['Yes the museum, is open on public holidays.', 'Yes, the museum, is open on public holidays.', 'Yes the museum is, open on public holidays.'] },
    { correct: 'While NAME was cooking, the cat jumped onto the counter.', wrong: ['While NAME was cooking the cat, jumped onto the counter.', 'While NAME was, cooking the cat jumped onto the counter.', 'While, NAME was cooking the cat jumped onto the counter.'] },
  ],
  compound: [
    { correct: 'NAME finished the puzzle, but NAME2 had already gone home.', wrong: ['NAME finished the puzzle but, NAME2 had already gone home.', 'NAME finished the puzzle, NAME2 had already gone home.', 'NAME finished, the puzzle but NAME2 had already gone home.'] },
    { correct: 'The road was icy, so the school buses stayed in the depot.', wrong: ['The road was icy so, the school buses stayed in the depot.', 'The road was icy, the school buses stayed in the depot.', 'The road, was icy so the school buses stayed in the depot.'] },
    { correct: 'NAME wanted to see the film, yet {he} could not find anyone to go with.', wrong: ['NAME wanted to see the film yet, {he} could not find anyone to go with.', 'NAME wanted to see the film, {he} could not find anyone to go with.', 'NAME wanted, to see the film yet {he} could not find anyone to go with.'] },
    { correct: 'We can walk to the stadium, or we can take the train.', wrong: ['We can walk to the stadium or, we can take the train.', 'We can walk to the stadium, we can take the train.', 'We can walk, to the stadium or we can take the train.'] },
    { correct: 'The volunteers planted the trees, and the children watered them.', wrong: ['The volunteers planted the trees and, the children watered them.', 'The volunteers planted the trees, the children watered them.', 'The volunteers, planted the trees and the children watered them.'] },
    { correct: 'NAME did not enjoy the book, nor did {he} like the film.', wrong: ['NAME did not enjoy the book nor, did {he} like the film.', 'NAME did not enjoy the book, {he} did not like the film either.', 'NAME did not enjoy, the book nor did {he} like the film.'] },
  ],
  nonessential: [
    { correct: 'Mount Kilimanjaro, which is the highest mountain in Africa, attracts climbers from around the world.', wrong: ['Mount Kilimanjaro which is the highest mountain in Africa, attracts climbers from around the world.', 'Mount Kilimanjaro, which is the highest mountain in Africa attracts climbers from around the world.', 'Mount Kilimanjaro, which is the highest mountain, in Africa attracts climbers from around the world.'] },
    { correct: 'NAME’s oldest sister, who is a nurse, works night shifts at the hospital.', wrong: ['NAME’s oldest sister who is a nurse, works night shifts at the hospital.', 'NAME’s oldest sister, who is a nurse works night shifts at the hospital.', 'NAME’s oldest sister, who is a nurse, works night shifts, at the hospital.'] },
    { correct: 'The Amazon, which flows through several countries, carries more water than any other river.', wrong: ['The Amazon which flows through several countries, carries more water than any other river.', 'The Amazon, which flows through several countries carries more water than any other river.', 'The Amazon, which flows, through several countries carries more water than any other river.'] },
    { correct: 'Grace Okafor, our school principal, opened the science fair.', wrong: ['Grace Okafor our school principal, opened the science fair.', 'Grace Okafor, our school principal opened the science fair.', 'Grace Okafor, our school, principal opened the science fair.'] },
    { correct: 'NAME’s swimming coach, a former Olympic champion, arrived early for practice.', wrong: ['NAME’s swimming coach a former Olympic champion, arrived early for practice.', 'NAME’s swimming coach, a former Olympic champion arrived early for practice.', 'NAME’s swimming coach, a former Olympic, champion arrived early for practice.'] },
    { correct: 'Lagos, the largest city in Nigeria, is home to millions of people.', wrong: ['Lagos the largest city in Nigeria, is home to millions of people.', 'Lagos, the largest city in Nigeria is home to millions of people.', 'Lagos, the largest city, in Nigeria is home to millions of people.'] },
    { correct: 'NAME’s grandfather’s radio, which still works perfectly, sits on the kitchen shelf.', wrong: ['NAME’s grandfather’s radio which still works perfectly, sits on the kitchen shelf.', 'NAME’s grandfather’s radio, which still works perfectly sits on the kitchen shelf.', 'NAME’s grandfather’s radio, which still works, perfectly sits on the kitchen shelf.'] },
  ],
  address: [
    { correct: 'NAME, could you pass the salt?', wrong: ['NAME could you pass the salt?', 'NAME could you, pass the salt?', 'NAME could, you pass the salt?'] },
    { correct: 'Thank you for your help, NAME.', wrong: ['Thank you for your help NAME.', 'Thank you, for your help NAME.', 'Thank you for, your help NAME.'] },
    { correct: 'Let’s eat, Grandma!', wrong: ['Let’s eat Grandma!', 'Let’s, eat Grandma!', 'Let’s, eat, Grandma!'] },
    { correct: 'I think, NAME, that you should apply for the job.', wrong: ['I think NAME, that you should apply for the job.', 'I think, NAME that you should apply for the job.', 'I, think NAME that you should apply for the job.'] },
    { correct: 'Please sit down, everyone, and open your books.', wrong: ['Please sit down everyone, and open your books.', 'Please sit down, everyone and open your books.', 'Please sit, down everyone and open your books.'] },
    { correct: 'Are you ready for the match, NAME?', wrong: ['Are you ready for the match NAME?', 'Are you ready, for the match NAME?', 'Are you, ready for the match NAME?'] },
  ],
  subject: [
    { correct: 'The tall boy in the red jacket plays the trumpet in the school band.', wrong: ['The tall boy in the red jacket, plays the trumpet in the school band.', 'The tall boy, in the red jacket plays the trumpet in the school band.', 'The tall boy in the red, jacket plays the trumpet in the school band.'] },
    { correct: 'Everyone who signed up for the trip needs a permission form.', wrong: ['Everyone who signed up for the trip, needs a permission form.', 'Everyone, who signed up for the trip needs a permission form.', 'Everyone who signed up, for the trip needs a permission form.'] },
    { correct: 'What NAME said at the meeting surprised everyone.', wrong: ['What NAME said at the meeting, surprised everyone.', 'What NAME said, at the meeting surprised everyone.', 'What, NAME said at the meeting surprised everyone.'] },
    { correct: 'The old bicycle with the rusty chain belongs to my cousin.', wrong: ['The old bicycle with the rusty chain, belongs to my cousin.', 'The old bicycle, with the rusty chain belongs to my cousin.', 'The old bicycle with the rusty, chain belongs to my cousin.'] },
    { correct: 'Reading three chapters a night helped NAME finish the novel.', wrong: ['Reading three chapters a night, helped NAME finish the novel.', 'Reading three chapters, a night helped NAME finish the novel.', 'Reading, three chapters a night helped NAME finish the novel.'] },
    { correct: 'The students and teachers from both schools met in the hall.', wrong: ['The students and teachers from both schools, met in the hall.', 'The students, and teachers from both schools met in the hall.', 'The students and teachers, from both schools met in the hall.'] },
  ],
};

/** Essential clauses (no commas), with the context that shows they are essential. */
const ESSENTIAL: Array<{ context: string; correct: string; wrong: string[] }> = [
  {
    context: 'The teacher means that only some students may leave: the ones who finish early.',
    correct: 'Students who finish the test early may leave the room.',
    wrong: ['Students, who finish the test early, may leave the room.', 'Students who finish the test early, may leave the room.', 'Students, who finish the test early may leave the room.'],
  },
  {
    context: 'Several buses stop at the station; the writer means the one that goes to the airport.',
    correct: 'The bus that goes to the airport leaves every hour.',
    wrong: ['The bus, that goes to the airport, leaves every hour.', 'The bus that goes to the airport, leaves every hour.', 'The bus, that goes to the airport leaves every hour.'],
  },
  {
    context: 'The writer means only the people who exercise regularly, not all people.',
    correct: 'People who exercise regularly tend to sleep better.',
    wrong: ['People, who exercise regularly, tend to sleep better.', 'People who exercise regularly, tend to sleep better.', 'People, who exercise regularly tend to sleep better.'],
  },
  {
    context: 'NAME owns several jackets; the writer means the one with the torn pocket.',
    correct: 'The jacket that has the torn pocket is in the wash.',
    wrong: ['The jacket, that has the torn pocket, is in the wash.', 'The jacket that has the torn pocket, is in the wash.', 'The jacket, that has the torn pocket is in the wash.'],
  },
  {
    context: 'Many songs were played; the writer means the one NAME wrote.',
    correct: 'The song that NAME wrote was played at the final assembly.',
    wrong: ['The song, that NAME wrote, was played at the final assembly.', 'The song that NAME wrote, was played at the final assembly.', 'The song, that NAME wrote was played at the final assembly.'],
  },
];

const RULE_CHOICES: Array<[CommaRule, string]> = [
  ['intro', 'After an introductory word, phrase or clause'],
  ['compound', 'Before a coordinating conjunction joining two independent clauses'],
  ['nonessential', 'Around non-essential information'],
  ['address', 'Around the name of the person or people being spoken to'],
];

function commas(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 2);
  const f = (s: string) => fill(s, cast);
  if (d === 3 && rng.chance(0.5)) {
    if (rng.chance(0.5)) {
      const e = rng.pick(ESSENTIAL);
      return {
        prompt: `${f(e.context)} Which sentence is punctuated correctly?`,
        parts: [part(mc(rng, f(e.correct), e.wrong.map(f)))],
        hints: ['Ask whether the clause is needed to tell which person or thing is meant.', 'Essential information is not set off with commas; non-essential information is set off with a pair of commas.'],
        solution: [
          `The clause is essential: it tells which ones are meant, so it takes no commas. “${f(e.correct)}”`,
          'Commas around it would turn it into extra information, as if it applied to all of them or there were only one; and a single comma between a subject and its verb is never correct.',
        ],
      };
    }
    const idx = rng.int(0, 3);
    const [rule, label] = RULE_CHOICES[idx];
    const item = rng.pick(COMMAS[rule]);
    return {
      prompt: `Why does this sentence need its comma or commas?\n\n${block(f(item.correct))}`,
      parts: [part(fixedChoice(RULE_CHOICES.map((r) => r[1]), idx))],
      hints: ['Look at what comes before and after each comma.', 'Is it an opening word or clause, a joining word between two sentences, extra information, or a name being spoken to?'],
      solution: [`${label}. ${RULE_TEXT[rule]}`],
    };
  }
  const rules: CommaRule[] = d === 1 ? ['intro', 'address', 'subject'] : d === 2 ? ['compound', 'nonessential', 'intro', 'address'] : ['compound', 'nonessential', 'subject'];
  const rule = rng.pick(rules);
  const item = rng.pick(COMMAS[rule]);
  const correct = f(item.correct);
  return {
    prompt: 'Which sentence is punctuated correctly?',
    parts: [part(mc(rng, correct, item.wrong.map(f)))],
    hints: [
      'Read each sentence aloud and ask what each comma is doing.',
      'Commas go after an introduction, before a conjunction joining two sentences, around extra information and around a name being spoken to, but never between a subject and its verb.',
    ],
    solution: [`“${correct}” is correct. ${RULE_TEXT[rule]}`, `In “${f(item.wrong[0])}”, a comma is missing or in the wrong place.`],
  };
}

// ---------------------------------------------------------------------------- apostrophes

interface Noun {
  s: string;
  p: string;
  /** Something one of them owns, and something several of them share. */
  st: string;
  pt: string;
}

const REGULAR: Noun[] = [
  { s: 'teacher', p: 'teachers', st: 'desk', pt: 'meeting' },
  { s: 'student', p: 'students', st: 'backpack', pt: 'projects' },
  { s: 'dog', p: 'dogs', st: 'bowl', pt: 'toys' },
  { s: 'player', p: 'players', st: 'jersey', pt: 'uniforms' },
  { s: 'girl', p: 'girls', st: 'bicycle', pt: 'bicycles' },
  { s: 'doctor', p: 'doctors', st: 'office', pt: 'offices' },
  { s: 'bird', p: 'birds', st: 'nest', pt: 'feathers' },
  { s: 'singer', p: 'singers', st: 'microphone', pt: 'voices' },
  { s: 'baby', p: 'babies', st: 'blanket', pt: 'blankets' },
  { s: 'family', p: 'families', st: 'car', pt: 'homes' },
  { s: 'nurse', p: 'nurses', st: 'badge', pt: 'shifts' },
];

const IRREGULAR: Noun[] = [
  { s: 'child', p: 'children', st: 'drawing', pt: 'playground' },
  { s: 'woman', p: 'women', st: 'speech', pt: 'team' },
  { s: 'man', p: 'men', st: 'hat', pt: 'choir' },
  { s: 'person', p: 'people', st: 'opinion', pt: 'opinions' },
  { s: 'mouse', p: 'mice', st: 'tail', pt: 'nest' },
];

const THINGS = ['bicycle', 'notebook', 'phone', 'guitar', 'jacket', 'umbrella'];

/** Sentences to choose from: one correct, three with apostrophe errors. */
const APOSTROPHE_MC: Array<{ level: Difficulty; context?: string; correct: string; wrong: string[]; why: string }> = [
  {
    level: 1,
    correct: 'It’s raining, so the dog is staying in its kennel.',
    wrong: ['Its raining, so the dog is staying in its kennel.', 'It’s raining, so the dog is staying in it’s kennel.', 'Its raining, so the dog is staying in it’s kennel.'],
    why: '“It’s” means “it is”; the possessive “its” (belonging to it) has no apostrophe.',
  },
  {
    level: 1,
    correct: 'They’re bringing their cousins to the party.',
    wrong: ['Their bringing they’re cousins to the party.', 'They’re bringing they’re cousins to the party.', 'Their bringing their cousins to the party.'],
    why: '“They’re” means “they are”; “their” means “belonging to them” and has no apostrophe.',
  },
  {
    level: 1,
    correct: 'You’re welcome to borrow your sister’s bike.',
    wrong: ['Your welcome to borrow your sister’s bike.', 'You’re welcome to borrow you’re sister’s bike.', 'You’re welcome to borrow your sisters bike.'],
    why: '“You’re” means “you are”; “your” is possessive; one sister owns the bike, so it is “sister’s”.',
  },
  {
    level: 2,
    context: 'The paintings were made by the whole class.',
    correct: 'The students’ paintings are on display in the library.',
    wrong: ['The student’s paintings are on display in the library.', 'The students paintings are on display in the library.', 'The students’ painting’s are on display in the library.'],
    why: 'Many students made the paintings, so the plural possessive “students’” has the apostrophe after the s. “Paintings” is a plain plural with no apostrophe.',
  },
  {
    level: 2,
    correct: 'Fresh mangoes are on sale at NAME’s stall.',
    wrong: ['Fresh mango’s are on sale at NAME’s stall.', 'Fresh mangoes are on sale at NAMEs stall.', 'Fresh mangoes’ are on sale at NAME’s stall.'],
    why: '“Mangoes” is a plain plural, so it has no apostrophe; the stall belongs to NAME, so it is “NAME’s”.',
  },
  {
    level: 2,
    context: 'Both of NAME’s brothers share one bedroom.',
    correct: 'NAME’s brothers’ bedroom is at the top of the stairs.',
    wrong: ['NAME’s brother’s bedroom is at the top of the stairs.', 'NAMEs brothers bedroom is at the top of the stairs.', 'NAME’s brothers bedroom’s at the top of the stairs.'],
    why: 'The brothers belong to NAME (NAME’s), and the bedroom belongs to the brothers, a plural ending in s (brothers’).',
  },
  {
    level: 3,
    correct: 'The children’s choir sang at the women’s football match.',
    wrong: ['The childrens’ choir sang at the women’s football match.', 'The children’s choir sang at the womens’ football match.', 'The childrens choir sang at the womens football match.'],
    why: '“Children” and “women” are plurals that do not end in s, so they take ’s, like a singular noun.',
  },
  {
    level: 3,
    correct: 'We don’t know whose phone it is or who’s going to collect it.',
    wrong: ['We dont know whose phone it is or who’s going to collect it.', 'We don’t know who’s phone it is or whose going to collect it.', 'We do’nt know whose phone it is or who’s going to collect it.'],
    why: '“Whose” asks who owns something; “who’s” means “who is”. In “don’t”, the apostrophe replaces the missing o of “not”.',
  },
  {
    level: 3,
    correct: 'The city’s parks are busiest in the school holidays.',
    wrong: ['The citys parks are busiest in the school holiday’s.', 'The cities’ parks are busiest in the school holiday’s.', 'The city’s park’s are busiest in the school holidays.'],
    why: 'The parks belong to one city (“city’s”); “parks” and “holidays” are plain plurals with no apostrophe.',
  },
];

function apostrophes(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 2);
  const f = (s: string) => fill(s, cast);
  if (rng.chance(0.4)) {
    const item = rng.pick(APOSTROPHE_MC.filter((m) => m.level === d));
    return {
      prompt: `${item.context ? `${f(item.context)} ` : ''}Which sentence uses apostrophes correctly?`,
      parts: [part(mc(rng, f(item.correct), item.wrong.map(f)))],
      hints: ['An apostrophe shows either possession or missing letters in a contraction.', 'Plain plurals (more than one, with no owner) never take an apostrophe.'],
      solution: [`“${f(item.correct)}” is correct.`, f(item.why)],
    };
  }
  // Typed possessives.
  let ask = '';
  let answer = '';
  let why = '';
  if (d === 1) {
    if (rng.chance(0.5)) {
      const n = rng.pick(REGULAR);
      ask = `the ${n.st} belonging to one ${n.s}`;
      answer = `the ${n.s}’s ${n.st}`;
      why = `“${n.s}” is singular, so add an apostrophe and s: ${n.s}’s.`;
    } else {
      const who = rng.pick(PEOPLE.filter((p) => !/s$/.test(p.name)));
      const thing = rng.pick(THINGS);
      ask = `the ${thing} that belongs to ${who.name}`;
      answer = `${who.name}’s ${thing}`;
      why = `A name is singular, so add an apostrophe and s: ${who.name}’s.`;
    }
  } else if (d === 2) {
    const n = rng.pick(REGULAR);
    ask = `the ${n.pt} of several ${n.p}`;
    answer = `the ${n.p}’ ${n.pt}`;
    why = `“${n.p}” is a plural that already ends in s, so add only an apostrophe after the s: ${n.p}’.`;
  } else {
    const n = rng.pick(IRREGULAR);
    if (rng.chance(0.7)) {
      ask = `the ${n.pt} of the ${n.p}`;
      answer = `the ${n.p}’s ${n.pt}`;
      why = `“${n.p}” is a plural that does not end in s, so add an apostrophe and s, as for a singular noun: ${n.p}’s.`;
    } else {
      ask = `the ${n.st} of one ${n.s}`;
      answer = `the ${n.s}’s ${n.st}`;
      why = `“${n.s}” is singular, so add an apostrophe and s: ${n.s}’s.`;
    }
  }
  const plain = answer.replace(/’/g, "'");
  const bare = [plain, ...(plain.startsWith('the ') ? [plain.slice(4)] : [])];
  const accepted = [...bare, ...bare.map((x) => `${x}.`)];
  return {
    prompt: `Write this as a possessive phrase, with an apostrophe: **${ask}**.`,
    parts: [part({ kind: 'text', accepted }, { placeholder: 'Type the possessive phrase' })],
    hints: [
      'First decide whether the owner is singular or plural.',
      'Singular, or a plural that does not end in s: add ’s. A plural that ends in s: add only ’ after the s.',
    ],
    solution: [why, `So the phrase is **${answer}**.`],
    answerDisplay: answer,
  };
}

// ---------------------------------------------------------------------------- semicolons and colons

const SEMI_COLON: Array<{ correct: string; wrong: string[]; why: string }> = [
  {
    correct: 'NAME packed three things for the hike: a map, a compass and a water bottle.',
    wrong: ['NAME packed: a map, a compass and a water bottle for the hike.', 'NAME packed three things for the hike; a map, a compass and a water bottle.', 'NAME packed three things for: the hike, a map, a compass and a water bottle.'],
    why: 'A colon introduces a list after a complete clause (“NAME packed three things for the hike”). A colon straight after a verb such as “packed” is wrong, and a semicolon cannot introduce a list.',
  },
  {
    correct: 'The match was called off for one reason: the field was flooded.',
    wrong: ['The match was called off for: one reason the field was flooded.', 'The match was called off; because the field was flooded.', 'The match was: called off for one reason, the field was flooded.'],
    why: 'A colon after a complete clause can introduce an explanation. A colon never follows a preposition (“for”) or a verb (“was”), and a semicolon cannot come before a dependent clause.',
  },
  {
    correct: 'The first half was dull; the second half was thrilling.',
    wrong: ['The first half was dull, the second half was thrilling.', 'The first half; was dull, the second half was thrilling.', 'The first half was: dull the second half was thrilling.'],
    why: 'A semicolon joins two closely related independent clauses. A comma alone would make a comma splice.',
  },
  {
    correct: 'NAME missed the bus; however, {he} still arrived on time.',
    wrong: ['NAME missed the bus, however, {he} still arrived on time.', 'NAME missed the bus however; {he} still arrived on time.', 'NAME missed; the bus however, {he} still arrived on time.'],
    why: '“However” is not a coordinating conjunction, so the semicolon goes before it (between the two independent clauses) and a comma after it.',
  },
  {
    correct: 'The recipe needs only a few ingredients: flour, eggs, milk and sugar.',
    wrong: ['The recipe needs: flour, eggs, milk and sugar.', 'The recipe needs only a few ingredients; flour, eggs, milk and sugar.', 'The recipe needs only a few ingredients, such as: flour, eggs, milk and sugar.'],
    why: 'A colon introduces the list after a complete clause. It cannot follow a verb (“needs”) or “such as”, and a semicolon cannot introduce a list.',
  },
  {
    correct: 'NAME stayed indoors because it was raining heavily.',
    wrong: ['NAME stayed indoors; because it was raining heavily.', 'NAME stayed indoors: because it was raining heavily.', 'NAME stayed; indoors because it was raining heavily.'],
    why: '“Because it was raining heavily” is a dependent clause, so it attaches directly to the main clause. Semicolons join independent clauses only, and a colon does not introduce a “because” clause.',
  },
  {
    correct: 'The museum has two new galleries: one for dinosaurs and one for space travel.',
    wrong: ['The museum has: two new galleries, one for dinosaurs and one for space travel.', 'The museum has two new galleries; one for dinosaurs and one for space travel.', 'The museum has two new: galleries one for dinosaurs and one for space travel.'],
    why: 'The colon follows a complete clause and introduces the two galleries. A colon cannot split a verb from its object, and a semicolon cannot introduce a list.',
  },
  {
    correct: 'The library was silent; even the clock seemed to tick quietly.',
    wrong: ['The library was silent, even the clock seemed to tick quietly.', 'The library; was silent, even the clock seemed to tick quietly.', 'The library was silent; even, the clock seemed to tick quietly.'],
    why: 'A semicolon joins the two related independent clauses. A comma alone would make a comma splice.',
  },
  {
    correct: 'Our choir performed in three cities: Nairobi, Accra and Cairo.',
    wrong: ['Our choir performed in: Nairobi, Accra and Cairo.', 'Our choir performed in three cities; Nairobi, Accra and Cairo.', 'Our choir: performed in three cities, Nairobi, Accra and Cairo.'],
    why: 'A colon introduces the list after the complete clause “Our choir performed in three cities”. It cannot follow a preposition (“in”), and a semicolon cannot introduce a list.',
  },
  {
    correct: 'NAME trained every morning; as a result, {he} won the race.',
    wrong: ['NAME trained every morning, as a result, {he} won the race.', 'NAME trained every morning; as a result {he}, won the race.', 'NAME trained; every morning as a result, {he} won the race.'],
    why: '“As a result” is not a coordinating conjunction, so a semicolon goes between the two independent clauses, with a comma after “as a result”.',
  },
];

const GAPS: Array<{ s: string; mark: 0 | 1 | 2; why: string }> = [
  { s: 'Please bring the following items ___ a pen, a ruler and a calculator.', mark: 1, why: 'A complete clause (“Please bring the following items”) comes before the gap and a list after it, so a colon introduces the list.' },
  { s: 'NAME forgot {his} lines ___ however, the audience never noticed.', mark: 0, why: 'Two independent clauses are joined with “however”, which is not a coordinating conjunction, so a semicolon goes before it.' },
  { s: 'Although the path was muddy ___ the walkers reached the waterfall.', mark: 2, why: 'An introductory dependent clause (“Although the path was muddy”) is followed by a comma.' },
  { s: 'The rules of the game are as follows ___ no running, no shouting and no phones.', mark: 1, why: 'A complete clause ending in “as follows” comes before the gap and a list after it, so a colon introduces the list.' },
  { s: 'The bridge was closed for repairs ___ as a result, traffic crawled through the town.', mark: 0, why: 'Two independent clauses are joined with “as a result”, which is not a coordinating conjunction, so a semicolon goes before it.' },
  { s: 'When the lights went out ___ everyone in the hall gasped.', mark: 2, why: 'An introductory dependent clause (“When the lights went out”) is followed by a comma.' },
  { s: 'Each hiker must carry the following ___ a tent, a stove and enough water for two days.', mark: 1, why: 'A complete clause (“Each hiker must carry the following”) comes before the gap and a list after it, so a colon introduces the list.' },
  { s: 'The tickets were expensive ___ nevertheless, the concert sold out.', mark: 0, why: 'Two independent clauses are joined with “nevertheless”, which is not a coordinating conjunction, so a semicolon goes before it.' },
  { s: 'If you finish early ___ read the next chapter.', mark: 2, why: 'An introductory dependent clause (“If you finish early”) is followed by a comma.' },
];

const MARKS = ['A semicolon ( ; )', 'A colon ( : )', 'A comma ( , )'];
const GAP = '\\_\\_\\_\\_\\_';

function semicolonsColons(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 2);
  const f = (s: string) => fill(s, cast);
  if (d === 3 && rng.chance(0.6)) {
    const g = rng.pick(GAPS);
    return {
      prompt: `Which punctuation mark belongs in the gap?\n\n${block(f(g.s).replace('___', GAP))}`,
      parts: [part(fixedChoice(MARKS, g.mark))],
      hints: ['Look at what comes before the gap: is it a complete independent clause or an introductory dependent clause?', 'Then look at what comes after: a list or explanation, a second independent clause, or the main clause?'],
      solution: [g.why, `So the gap needs ${MARKS[g.mark].replace(/ \(.*/, '').toLowerCase()}.`],
    };
  }
  const item = rng.pick(d === 1 ? SEMI_COLON.slice(0, 6) : SEMI_COLON);
  const correct = f(item.correct);
  return {
    prompt: 'Which sentence uses the semicolon or colon correctly?',
    parts: [part(mc(rng, correct, item.wrong.map(f)))],
    hints: [
      'A semicolon joins two independent clauses, each of which could be a sentence on its own.',
      'A colon comes after a complete clause, to introduce a list or an explanation. It never comes straight after a verb or a preposition.',
    ],
    solution: [`“${correct}” is correct.`, f(item.why)],
  };
}

export const PUNCTUATION_SKILLS: SkillDef[] = [
  skill({
    id: 'e10-commas',
    name: 'Commas',
    description: 'Use commas after introductions, before conjunctions joining clauses, around non-essential information and names in direct address, and never between a subject and its verb.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: commas,
  }),
  skill({
    id: 'e10-apostrophes',
    name: 'Apostrophes',
    description: 'Use apostrophes for singular and plural possessives and for contractions, and leave them out of plain plurals and possessive pronouns.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    gen: apostrophes,
  }),
  skill({
    id: 'e10-semicolons-colons',
    name: 'Semicolons and colons',
    description: 'Use a semicolon between related independent clauses and a colon after a complete clause to introduce a list or explanation.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: semicolonsColons,
  }),
];
