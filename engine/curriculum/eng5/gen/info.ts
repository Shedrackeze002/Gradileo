/**
 * Grade 5 English, Unit 3: Reading for Information (E5-C1, E5-C2). Main idea and details, text
 * features, text structures and signal words, fact and opinion, and the author’s purpose. The
 * passages are written for Gradileo; their facts are general knowledge.
 */
import { part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { atLevel, bank, Q } from './common.ts';

const C1 = ['E5-C1'];
const C2 = ['E5-C2'];

// ---------------------------------------------------------------------------- 3.1 main idea and details

const BEES = 'Honeybees are busy workers. Each day, a single bee may visit hundreds of flowers to collect nectar and pollen. Back at the hive, other bees turn the nectar into honey. Some bees guard the entrance, while others fan their wings to keep the hive cool.';
const OCTOPUS = 'The octopus is one of the cleverest animals in the sea. Octopuses can open jars to reach food inside. They can find their way through mazes, and some have been seen using coconut shells as shelters.';
const SLEEP = 'Getting enough sleep helps children grow and learn. While you sleep, your body repairs itself and your brain sorts out what you learned during the day. Children who sleep well often find it easier to pay attention in class.';
const DESERT = 'Camels are well suited to life in the desert. Their wide, padded feet keep them from sinking into the sand. Long eyelashes protect their eyes from blowing sand, and they can go for days without drinking water.';
const VOLCANO = 'A volcano is an opening in the Earth’s surface where melted rock comes out. Deep underground, rock becomes so hot that it melts into magma. When pressure builds up, the magma pushes up through cracks and bursts out as lava, ash and gas.';
const RECYCLE = 'Recycling helps the planet in several ways. When we recycle paper, fewer trees need to be cut down. Recycling cans and bottles saves the energy needed to make new ones from raw materials. It also means less rubbish ends up in landfills.';

const MAIN: Q[] = [
  Q(1, 'What is the main idea of this paragraph?', 'Honeybees have many jobs to do.', ['Honeybees visit many flowers.', 'Honey is made inside the hive.', 'Some bees guard the hive door.'],
    'The first sentence, “Honeybees are busy workers”, states the main idea. The other sentences are details: each tells one of the bees’ jobs.', BEES),
  Q(1, 'What is the main idea of this paragraph?', 'Octopuses are very clever animals.', ['Octopuses can open jars of food.', 'Octopuses live in coconut shells.', 'Octopuses can swim through mazes.'],
    'The paragraph is mostly about how clever octopuses are. Opening jars, solving mazes and using shells are examples that support that idea.', OCTOPUS),
  Q(1, 'What is this paragraph mostly about?', 'How camels are suited to the desert', ['Why sand blows about in the desert', 'How long most camels can live for', 'Where the largest deserts are found'],
    'Every sentence tells a way camels are suited to desert life: their feet, their eyelashes and going without water.', DESERT),
  Q(2, 'Which sentence states the main idea of the paragraph?', '“Getting enough sleep helps children grow and learn.”', ['“While you sleep, your body repairs itself.”', '“Your brain sorts out what you learned during the day.”', '“Children who sleep well find it easier to pay attention.”'],
    'The first sentence gives the big idea. The others explain how sleep helps, so they are supporting details.', SLEEP),
  Q(2, 'What is the main idea of this paragraph?', 'Recycling helps the planet in several ways.', ['Paper is made by cutting down trees.', 'Cans and bottles can be made from metal.', 'Landfills are where our rubbish is taken.'],
    'The paragraph begins with its main idea and then gives three ways recycling helps: saving trees, saving energy and reducing landfill.', RECYCLE),
  Q(3, 'Which is the best summary of this paragraph?', 'Volcanoes form when hot melted rock is pushed up and bursts out.', ['Volcanoes are very dangerous and people should stay away from them.', 'Magma is rock that has melted deep down under the ground.', 'Lava, ash and gas are some of the things that come out of the Earth.'],
    'A good summary gives the main idea in a few words, including the most important details. The others are only one detail, or an idea the paragraph does not state.', VOLCANO),
  Q(3, 'The main idea of this paragraph is not stated in one sentence. What is it?', 'Penguins are built for life in icy water.', ['Penguins cannot fly like other birds.', 'Penguins live only at the South Pole.', 'Penguins eat fish that they catch.'],
    'Each detail (thick feathers, a layer of fat, wings like flippers) shows how penguins are suited to cold water. Together they point to that main idea.',
    'A penguin’s feathers are packed tightly together to keep out cold water. Under its skin is a thick layer of fat. Its wings work like flippers, pushing it quickly through the sea.'),
];

const DETAILS: Q[] = [
  Q(1, 'Which detail supports the main idea that honeybees are busy workers?', 'A bee may visit hundreds of flowers each day.', ['Honey can be spread on toast at breakfast.', 'Bees are insects with six legs and wings.', 'Some people are afraid of bees and wasps.'],
    'Visiting hundreds of flowers a day shows how busy a bee is. The other sentences are true but do not support this main idea.', BEES),
  Q(1, 'Which detail tells how camels protect their eyes?', 'Long eyelashes keep out the blowing sand.', ['Wide, padded feet stop them from sinking.', 'They can go for days without any water.', 'Camels are well suited to the desert.'],
    'The paragraph says long eyelashes protect camels’ eyes from blowing sand.', DESERT),
  Q(2, 'Which detail does NOT support the main idea of the paragraph?', 'Some octopuses are red, and others are brown.', ['Octopuses can open jars to reach food inside.', 'Octopuses can find their way through mazes.', 'Some octopuses use coconut shells as shelters.'],
    'The main idea is that octopuses are clever. Their colour has nothing to do with being clever, so it does not support the main idea.', OCTOPUS),
  Q(2, 'Which two details support the idea that recycling saves resources?', 'Fewer trees are cut down, and energy is saved.', ['Rubbish goes to landfills, and bins are collected.', 'Paper is white, and cans are made of metal.', 'Bottles are heavy, and boxes can be folded.'],
    'Saving trees and saving energy are both ways recycling saves resources.', RECYCLE),
  Q(3, 'Which detail best explains how magma reaches the surface?', 'Pressure pushes the magma up through cracks.', ['The rock deep underground becomes very hot.', 'Lava, ash and gas burst out of the opening.', 'A volcano is an opening in the Earth’s surface.'],
    'The question is about how magma gets up to the surface: the paragraph says pressure pushes it up through cracks.', VOLCANO),
  Q(3, 'A student wrote: “Sleep is important because it helps your brain.” Which detail from the paragraph best supports this?', 'Your brain sorts out what you learned during the day.', ['Your body repairs itself while you are sleeping.', 'Getting enough sleep helps children to grow.', 'Children may go to bed at different times.'],
    'The claim is about the brain, so the best support is the detail about the brain sorting out what you learned.', SLEEP),
];

// ---------------------------------------------------------------------------- 3.2 text features

const FEATURES: Q[] = [
  Q(1, 'Which text feature tells you what a section of a page is about?', 'A heading', ['A caption', 'A glossary', 'An index'],
    'A heading is a title at the top of a section that tells you what that section is about.'),
  Q(1, 'Which text feature explains what a photograph shows?', 'A caption', ['A heading', 'A glossary', 'A table of contents'],
    'A caption is the short text beside or under a picture that explains it.'),
  Q(1, 'Where would you look to find what an important word in a book means?', 'The glossary', ['The index', 'The title page', 'The table of contents'],
    'A glossary, near the back of a book, lists important words with their meanings.'),
  Q(1, 'Why are some words in an information book printed in **bold**?', 'They are key words, often explained in the glossary', ['They are the names of the people who wrote the book', 'They are words the reader is meant to skip over', 'They are spelled in an unusual or a wrong way'],
    'Bold print marks important words. Many books explain them in the glossary.'),
  Q(2, 'You want to find which page of a book about weather mentions “hail”. Which feature helps most?', 'The index', ['The glossary', 'The table of contents', 'A caption'],
    'An index, at the back of a book, lists topics in alphabetical order with the pages where they appear.'),
  Q(2, 'Which text feature shows the parts of something, with labels?', 'A labelled diagram', ['A timeline', 'A glossary', 'A heading'],
    'A labelled diagram is a drawing with labels that name the parts of something, such as a plant or a machine.'),
  Q(2, 'Which feature would best show the order of events in a person’s life?', 'A timeline', ['A diagram', 'A glossary', 'A caption'],
    'A timeline shows events in the order they happened, along a line marked with dates.'),
  Q(3, 'A book’s table of contents and its index both list pages. How are they different?', 'Contents lists chapters in order; the index lists topics alphabetically', ['Contents is at the back of a book; the index is always at the front', 'Contents explains word meanings; the index explains each picture', 'Contents lists only pictures; the index lists only the chapter titles'],
    'The table of contents, at the front, lists chapters in the order they appear. The index, at the back, lists specific topics in alphabetical order.'),
  Q(3, 'A page about frogs has a chart comparing frogs and toads. What is the chart most useful for?', 'Seeing how frogs and toads are alike and different', ['Finding out what the word “amphibian” means', 'Learning the name of the person who wrote it', 'Seeing the order in which a frog grows up'],
    'A comparison chart puts facts side by side, so it is useful for seeing likenesses and differences. A glossary gives meanings, and a diagram or timeline would show growth stages.'),
];

// ---------------------------------------------------------------------------- 3.3 text structures

const STRUCTURES: Q[] = [
  Q(1, 'How is this paragraph organized?', 'Sequence', ['Compare and contrast', 'Cause and effect', 'Problem and solution'],
    'The words first, next, then and finally show steps in order, so the structure is sequence.',
    'To make a paper airplane, first fold a sheet of paper in half the long way. Next, fold the top corners down to the middle. Then fold the sides down to make wings. Finally, throw it gently into the air.'),
  Q(1, 'How is this paragraph organized?', 'Compare and contrast', ['Sequence', 'Cause and effect', 'Problem and solution'],
    'The paragraph shows how frogs and toads are alike (both) and different (but, while), so it compares and contrasts.',
    'Frogs and toads are both amphibians that lay eggs in water. But frogs have smooth, wet skin, while toads have dry, bumpy skin. Frogs have long legs for jumping, while toads have shorter legs for walking.'),
  Q(2, 'How is this paragraph organized?', 'Cause and effect', ['Sequence', 'Compare and contrast', 'Description'],
    'The paragraph explains what happened because of the heavy rain: the river rose, so roads closed. The words because and as a result show cause and effect.',
    'Because it rained for five days without stopping, the river rose over its banks. As a result, several roads were closed, and many families had to leave their homes.'),
  Q(2, 'How is this paragraph organized?', 'Problem and solution', ['Sequence', 'Compare and contrast', 'Description'],
    'The paragraph names a problem (litter in the park) and then explains how it was solved (bins and a clean-up day).',
    'Litter was piling up in Maple Park. To fix this, the town put in more rubbish bins and organized a monthly clean-up day. Now the park is much cleaner.'),
  Q(3, 'Which structure would best suit an article explaining why the dinosaurs died out?', 'Cause and effect', ['Sequence', 'Compare and contrast', 'Problem and solution'],
    'Explaining why something happened means giving its causes and their effects.'),
  Q(3, 'A writer wants to explain how to plant a tree. Which structure fits best?', 'Sequence', ['Cause and effect', 'Compare and contrast', 'Problem and solution'],
    'Instructions go step by step, in order, so sequence is the best structure.'),
];

const SIGNALS: Array<{ w: string; kind: number; d: Difficulty }> = [
  { w: 'first', kind: 0, d: 1 }, { w: 'next', kind: 0, d: 1 }, { w: 'finally', kind: 0, d: 1 }, { w: 'after that', kind: 0, d: 2 }, { w: 'meanwhile', kind: 0, d: 3 },
  { w: 'both', kind: 1, d: 1 }, { w: 'however', kind: 1, d: 2 }, { w: 'on the other hand', kind: 1, d: 2 }, { w: 'similarly', kind: 1, d: 3 }, { w: 'unlike', kind: 1, d: 2 },
  { w: 'because', kind: 2, d: 1 }, { w: 'so', kind: 2, d: 1 }, { w: 'as a result', kind: 2, d: 2 }, { w: 'therefore', kind: 2, d: 3 }, { w: 'due to', kind: 2, d: 3 },
  { w: 'the problem is', kind: 3, d: 2 }, { w: 'one solution is', kind: 3, d: 2 }, { w: 'to fix this', kind: 3, d: 3 },
];
const KINDS = ['Sequence', 'Compare and contrast', 'Cause and effect', 'Problem and solution'];

function signalWords(rng: Rng, d: Difficulty): GenOutput {
  const s = rng.pick(atLevel(SIGNALS, d));
  return {
    prompt: `Which text structure does the signal word or phrase **“${s.w}”** usually point to?`,
    parts: [part({ kind: 'mc', choices: KINDS.map((md, i) => ({ id: 'abcd'[i], md })), correct: 'abcd'[s.kind] })],
    hints: ['Signal words show how ideas are connected.', 'Order words point to sequence; alike-and-different words to compare and contrast; why-words to cause and effect.'],
    solution: [`“${s.w}” ${['shows the order of steps or events', 'shows how things are alike or different', 'shows a cause or its effect', 'introduces a problem or its solution'][s.kind]}, so it points to ${KINDS[s.kind].toLowerCase()}.`],
  };
}

// ---------------------------------------------------------------------------- 3.4 fact and opinion

const FACTS: Array<[string, Difficulty]> = [
  ['A spider has eight legs.', 1], ['Water freezes at 0 degrees Celsius.', 1], ['There are seven days in a week.', 1], ['The Pacific is the largest ocean on Earth.', 1],
  ['Our school has twenty-four classrooms.', 2], ['The library opens at nine o’clock on Saturdays.', 2], ['Many birds fly south for the winter.', 2], ['The concert lasted two hours.', 2],
  ['Most of the students in our class voted for a picnic.', 3], ['The new bridge is longer than the old one.', 3], ['Some people think cats are better than dogs.', 3],
];
const OPINIONS: Array<[string, Difficulty]> = [
  ['Spiders are the scariest animals.', 1], ['Summer is the best season.', 1], ['Pizza is the tastiest food.', 1], ['Rainy days are boring.', 1],
  ['Our school has the friendliest teachers in the city.', 2], ['Everyone should read this book.', 2], ['The concert was far too long.', 2], ['Soccer is more exciting than basketball.', 2],
  ['A picnic would be the most fun way to end the year.', 3], ['The new bridge looks much nicer than the old one.', 3], ['Cats make better pets than dogs.', 3],
];

function factOpinion(rng: Rng, d: Difficulty): GenOutput {
  const isFact = rng.chance(0.5);
  const pool = (isFact ? FACTS : OPINIONS).filter(([, k]) => k === d);
  const [s] = rng.pick(pool);
  const why = isFact
    ? s.startsWith('Some people think')
      ? 'It is a fact that some people hold this opinion: you could check it by asking people. The sentence reports an opinion, but it is itself a fact.'
      : 'It can be checked and proved true, by counting, measuring or looking it up, so it is a fact.'
    : 'It tells what someone thinks or feels. Words such as best, scariest, boring, nicer and should are clues. Others could disagree, so it is an opinion.';
  return {
    prompt: `Is this sentence a fact or an opinion?\n\n> ${s}`,
    parts: [part({ kind: 'mc', choices: [{ id: 'a', md: 'A fact' }, { id: 'b', md: 'An opinion' }], correct: isFact ? 'a' : 'b' })],
    hints: ['A fact can be proved true. An opinion tells what someone thinks, feels or believes.', 'Watch for judging words such as best, worst, beautiful, boring and should.'],
    solution: [why],
  };
}

const PURPOSES: Q[] = [
  Q(1, 'What is the author’s main purpose?', 'To inform', ['To persuade', 'To entertain'],
    'The passage gives facts about how bats find food, so its purpose is to inform.',
    'Most bats hunt at night. They make high squeaks and listen for the echoes, which tell them where insects are flying.'),
  Q(1, 'What is the author’s main purpose?', 'To persuade', ['To inform', 'To entertain'],
    'The writer wants readers to do something (come to the bake sale), so the purpose is to persuade.',
    'Come to our bake sale on Friday! Every cookie you buy helps our class go on its trip to the science centre. Don’t miss it!'),
  Q(1, 'What is the author’s main purpose?', 'To entertain', ['To inform', 'To persuade'],
    'The passage tells a funny made-up story about a dragon, so its purpose is to entertain.',
    'Dexter the dragon wanted to toast marshmallows, but every time he tried, he sneezed and burned them to a crisp.'),
  Q(2, 'Which piece of writing is most likely written to persuade?', 'An advertisement for a new cereal', ['An encyclopedia article about cereal crops', 'A comic strip about a talking box of cereal', 'Instructions for cooking hot porridge'],
    'An advertisement tries to get people to buy something, so its purpose is to persuade.'),
  Q(2, 'Which piece of writing is most likely written to inform?', 'A science article about how plants grow', ['A poster asking people to vote for NAME', 'A funny story about a plant that can talk', 'A letter asking the town to build a pool'],
    'A science article gives facts and explanations, so its purpose is to inform.'),
  Q(3, 'This passage informs, but what is the author’s main purpose?', 'To persuade readers to wear helmets', ['To entertain readers with a bike story', 'To inform readers how bikes are made', 'To explain the history of the helmet'],
    'The passage gives a fact, but it uses it to convince readers to always wear a helmet, so the main purpose is to persuade.',
    'Every year, thousands of children hurt their heads in bicycle accidents. A helmet can prevent most of these injuries. Always wear one when you ride: it could save your life.'),
  Q(3, 'Why did the author most likely include the facts in this ad?', 'To make the persuasion more convincing', ['To entertain readers with a story', 'To teach readers about sports science', 'To explain how the shoes are made'],
    'Facts can support persuasion: the ad uses a fact about the shoes to make readers want to buy them.',
    'Zoom sneakers are 30 percent lighter than other running shoes. Run faster, jump higher, and feel great. Get yours today!'),
];

export const INFO_SKILLS: SkillDef[] = [
  skill({ id: 'e5-main-idea', name: 'Main idea', description: 'Find the main idea of an informational paragraph.', outcomes: C1, lessonId: 'e5-3-1', format: 'mc', gen: bank(MAIN, ['The main idea is what the whole paragraph is mostly about.', 'It is often, but not always, in the first sentence. Check that every other sentence supports it.']) }),
  skill({ id: 'e5-supporting-details', name: 'Supporting details', description: 'Choose the details that support a main idea.', outcomes: C1, lessonId: 'e5-3-1', format: 'mc', gen: bank(DETAILS, ['Supporting details explain, prove or give examples of the main idea.', 'Check each choice against the question: does it really tell that?']) }),
  skill({ id: 'e5-text-features', name: 'Text features', description: 'Use headings, captions, diagrams, bold words, glossaries, indexes and timelines.', outcomes: C1, lessonId: 'e5-3-2', format: 'mc', gen: bank(FEATURES, ['Think about what each feature is for: headings name sections, captions explain pictures, a glossary gives meanings, an index lists pages.']) }),
  skill({ id: 'e5-text-structure', name: 'Text structure', description: 'Recognize sequence, compare and contrast, cause and effect, and problem and solution.', outcomes: C1, lessonId: 'e5-3-3', format: 'mc', gen: bank(STRUCTURES, ['Look for signal words: first and then (sequence), both and but (compare and contrast), because and so (cause and effect).']) }),
  skill({ id: 'e5-signal-words', name: 'Signal words', description: 'Use signal words to see how ideas in a text connect.', outcomes: C1, lessonId: 'e5-3-3', format: 'mc', gen: signalWords }),
  skill({ id: 'e5-fact-opinion', name: 'Fact or opinion', description: 'Tell a fact, which can be proved, from an opinion.', outcomes: C2, lessonId: 'e5-3-4', format: 'mc', gen: factOpinion }),
  skill({ id: 'e5-author-purpose', name: 'The author’s purpose', description: 'Tell whether an author writes to inform, persuade or entertain.', outcomes: C2, lessonId: 'e5-3-4', format: 'mc', gen: bank(PURPOSES, ['Inform: give facts. Persuade: get you to think or do something. Entertain: tell a story or make you laugh.']) }),
];

