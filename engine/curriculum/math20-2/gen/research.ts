/** Math 20-2 Unit 9 — Mathematics Research Project (RP1): planning a research project. */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
];

// ---------------------------------------------------------------------------
// Research questions
// ---------------------------------------------------------------------------

type Flaw = 'broad' | 'opinion' | 'fact' | 'leading';

interface Topic {
  area: string;
  good: string;
  broad: string;
  opinion: string;
  fact: string;
  leading: string;
  /** The best way to collect data for the good question, and three weaker plans. */
  plan: string;
  badPlans: [string, string, string];
}

const TOPICS: Topic[] = [
  {
    area: 'sleep and school',
    good: 'Is there a relationship between the hours of sleep Grade 11 students at our school get on school nights and their average marks?',
    broad: 'How does sleep affect people?',
    opinion: 'Is sleep important?',
    fact: 'How many hours of sleep do doctors recommend for teenagers?',
    leading: 'Why do lazy students who stay up late get bad marks?',
    plan: 'Survey a random sample of Grade 11 students about their sleep on school nights, and with permission, collect their average marks.',
    badPlans: ['Ask three close friends how much they sleep.', 'Read one blog post about teenagers and sleep.', 'Survey only the students in an honours class.'],
  },
  {
    area: 'wildfires',
    good: 'How has the total area burned by wildfires in our region each year changed from 2000 to 2023?',
    broad: 'What are wildfires?',
    opinion: 'Are wildfires scary?',
    fact: 'In what year did the largest wildfire in our region’s history happen?',
    leading: 'Why are careless campers causing more wildfires every year?',
    plan: 'Use the yearly wildfire records published by the government’s forestry agency for 2000 to 2023.',
    badPlans: ['Survey classmates about how many wildfires they remember.', 'Count the wildfire posts on a social media site.', 'Use the photos from one news story about a large fire.'],
  },
  {
    area: 'screen time',
    good: 'Do Grade 11 students who spend more than three hours a day on screens have slower reaction times than students who spend less?',
    broad: 'How do screens affect teenagers?',
    opinion: 'Are phones bad?',
    fact: 'In what year was the first smartphone sold?',
    leading: 'How much damage are phones doing to teenagers’ brains?',
    plan: 'Survey a random sample of Grade 11 students about their daily screen time, and measure each student’s reaction time with the same online test.',
    badPlans: ['Measure only your own reaction time on several days.', 'Ask students whether they think phones slow them down.', 'Use an advertisement for a phone that promises faster reactions.'],
  },
  {
    area: 'hockey',
    good: 'Is there a relationship between an NHL team’s average shots on goal per game and its number of wins in a season?',
    broad: 'What makes hockey teams good?',
    opinion: 'Is our city’s team the best team?',
    fact: 'How many teams are in the NHL?',
    leading: 'Why do teams that shoot more always win?',
    plan: 'Use the official NHL statistics for every team over several seasons.',
    badPlans: ['Watch the highlights of two games.', 'Survey fans outside an arena about which team shoots the most.', 'Use a sports-betting company’s advertisement.'],
  },
  {
    area: 'food prices',
    good: 'How has the average price of a 4 L jug of milk in our country changed from 2005 to 2025, compared with the rate of inflation?',
    broad: 'Why is food expensive?',
    opinion: 'Is food too expensive?',
    fact: 'What does a 4 L jug of milk cost at one store today?',
    leading: 'How much are greedy grocery stores overcharging us?',
    plan: 'Use average retail price data and inflation data published by the national statistics office for 2005 to 2025.',
    badPlans: ['Use one grocery store’s flyer from this week.', 'Ask your family what they remember milk costing.', 'Read comments on a social media post about prices.'],
  },
  {
    area: 'public transit',
    good: 'How does the time of day affect the average wait time for a bus at a busy stop in our city?',
    broad: 'How does public transit work?',
    opinion: 'Are buses better than cars?',
    fact: 'How many bus routes does our city have?',
    leading: 'Why is our city’s terrible bus service always late?',
    plan: 'Record the wait times at the stop at several times of day on many different days.',
    badPlans: ['Time one wait at the stop on one morning.', 'Ask a friend how long buses usually take.', 'Read online reviews from people who are angry about the buses.'],
  },
  {
    area: 'part-time jobs',
    good: 'Is there a relationship between the number of hours Grade 11 students work at part-time jobs each week and their average marks?',
    broad: 'What are jobs like for teenagers?',
    opinion: 'Should teenagers have jobs?',
    fact: 'What is the minimum age to work at a grocery store where we live?',
    leading: 'How much are part-time jobs ruining students’ marks?',
    plan: 'Survey a random sample of Grade 11 students about their weekly work hours, and with permission, collect their average marks.',
    badPlans: ['Survey only the students who work at one fast-food restaurant.', 'Ask teachers whether working students do worse.', 'Use one news story about a student with a job.'],
  },
  {
    area: 'home heating',
    good: 'How does the average daily outdoor temperature affect a household’s natural gas use during a winter in our city?',
    broad: 'How do people heat their homes?',
    opinion: 'Is natural gas a good way to heat homes?',
    fact: 'What is the coldest temperature ever recorded in our city?',
    leading: 'Why do wasteful families use so much gas?',
    plan: 'Pair the daily temperature records from the national weather service with a household’s daily gas-meter readings for a whole winter.',
    badPlans: ['Look at one month’s gas bill.', 'Ask neighbours whether they use more gas when it is cold.', 'Use a furnace company’s advertisement.'],
  },
  {
    area: 'exercise and health',
    good: 'Is there a relationship between the number of minutes Grade 11 students exercise each week and their resting heart rates?',
    broad: 'How does exercise affect health?',
    opinion: 'Is running more fun than swimming?',
    fact: 'What is the world record for the marathon?',
    leading: 'Why are students who skip the gym so unhealthy?',
    plan: 'Survey a random sample of Grade 11 students about their weekly exercise, and measure each student’s resting heart rate the same way.',
    badPlans: ['Measure the heart rates of the senior basketball team only.', 'Ask students if they feel healthy.', 'Use a fitness influencer’s video.'],
  },
  {
    area: 'city growth',
    good: 'How did the populations of our country’s five largest cities change in each census from 2001 to 2021?',
    broad: 'What is population?',
    opinion: 'Which of the five cities is the nicest place to live?',
    fact: 'What is the population of our city?',
    leading: 'Why is everyone moving to the biggest city?',
    plan: 'Use census data from the national statistics office for each city in 2001, 2006, 2011, 2016 and 2021.',
    badPlans: ['Count the new houses on one street.', 'Use a real-estate company’s advertisement.', 'Survey students about which city feels busier.'],
  },
  {
    area: 'climate',
    good: 'How has the date of the first fall frost in our town changed over the past 50 years?',
    broad: 'What is climate?',
    opinion: 'Is winter the worst season?',
    fact: 'When was the first frost in our town last year?',
    leading: 'Why are winters getting so much worse?',
    plan: 'Use the historical daily temperature records for our town from the national weather service.',
    badPlans: ['Ask grandparents what they remember about frost.', 'Look at one year of a family calendar.', 'Read a post in a community social media group.'],
  },
  {
    area: 'music',
    good: 'Has the average tempo, in beats per minute, of the top 20 songs on the national music charts changed from 1995 to 2025?',
    broad: 'What makes music popular?',
    opinion: 'Is pop music better than country music?',
    fact: 'Which song was number one on the national charts last week?',
    leading: 'Why is today’s music so much worse than older music?',
    plan: 'Use the published chart lists for each year, and find the tempo of every top 20 song with the same method.',
    badPlans: ['Measure the tempo of your five favourite songs.', 'Ask friends whether songs seem faster now.', 'Use a playlist made by one radio host.'],
  },
];

const FLAW_TEXT: Record<Flaw, string> = {
  broad: 'It is too broad: it is not focused enough to answer with data.',
  opinion: 'It asks for an opinion, so the answer cannot be measured.',
  fact: 'It can be answered with a single fact, so there is nothing to analyze.',
  leading: 'It is biased: the wording assumes the answer.',
};
const FLAW_WHY: Record<Flaw, string> = {
  broad: 'is too broad to answer with one set of data.',
  opinion: 'asks for an opinion, so it cannot be measured.',
  fact: 'can be answered with a single fact, so there is nothing to analyze.',
  leading: 'is biased, because its wording assumes the answer.',
};
const FLAWS: Flaw[] = ['broad', 'opinion', 'fact', 'leading'];
const q = (s: string) => `“${s}”`;

const GOOD_HINTS = [
  'A good research question is focused, can be answered by collecting and analyzing data, and is interesting.',
  'Rule out questions that are too broad, ask for an opinion, can be answered with one fact, or assume the answer.',
];

const researchQuestion = skill({
  id: 'm202-research-question',
  name: 'Research questions',
  description: 'Choose a good research question that is focused, measurable and interesting, and identify the problem with a weak one.',
  outcomes: ['RP1'],
  lessonId: 'm202-9-1',
  format: 'mc',
  gen(rng, d) {
    const t = rng.pick(TOPICS);
    const name = rng.pick(NAMES);
    if (d === 1) {
      const bad = rng.sample(FLAWS, 3);
      return {
        prompt: `${name} is planning a research project about ${t.area}. Which is the best research question?`,
        parts: [part(mc(rng, t.good, bad.map((f) => t[f])))],
        hints: GOOD_HINTS,
        solution: [
          ...bad.map((f) => `${q(t[f])} ${FLAW_WHY[f]}`),
          `${q(t.good)} is focused, and it can be answered by collecting and analyzing data.`,
          `The best research question is ${q(t.good)}`,
        ],
      };
    }
    if (d === 2) {
      const flaw = rng.pick(FLAWS);
      return {
        prompt: `${name} wrote this research question for a project about ${t.area}:\n\n> ${t[flaw]}\n\nWhat is the main problem with it?`,
        parts: [part(fixedChoice(FLAWS.map((f) => FLAW_TEXT[f]), FLAWS.indexOf(flaw)))],
        hints: GOOD_HINTS,
        solution: [
          {
            broad: 'The question covers a huge topic, so there is no clear set of data that would answer it.',
            opinion: 'The answer depends on what each person thinks, so there is nothing to measure.',
            fact: 'One look-up answers it, so there is no data to collect and analyze.',
            leading: 'The wording takes a side before any data is collected, so it is not neutral.',
          }[flaw],
          `The main problem: ${FLAW_TEXT[flaw].charAt(0).toLowerCase()}${FLAW_TEXT[flaw].slice(1)}`,
          `A better question would be ${q(t.good)}`,
        ],
      };
    }
    // d3: the best question together with the right reason.
    const right = `${q(t.good)}, because it is focused and can be answered by collecting and analyzing data`;
    return {
      prompt: `${name} has four possible research questions for a project about ${t.area}. Which question should ${name} choose, and why?`,
      parts: [
        part(
          mc(rng, right, [
            `${q(t.fact)}, because it has one clear answer that is easy to find`,
            `${q(t.broad)}, because it covers everything about the topic`,
            rng.chance(0.5) ? `${q(t.leading)}, because it is about an issue people feel strongly about` : `${q(t.opinion)}, because everyone has an answer to it`,
          ]),
        ),
      ],
      hints: GOOD_HINTS,
      solution: [
        `${q(t.fact)} needs only a single fact, so there is nothing to analyze.`,
        `${q(t.broad)} is too broad to answer with one set of data.`,
        'Questions that ask for an opinion or assume the answer cannot be measured fairly.',
        `${q(t.good)} is focused and measurable, so it is the best choice.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Data sources and bias
// ---------------------------------------------------------------------------

const PRIMARY = [
  'You time 30 classmates on the same online reaction-time test.',
  'You survey 100 students at your school about their screen time.',
  'You count the cars that pass your school between 8:00 and 8:30 each morning for two weeks.',
  'You measure the heights of bean plants that you grow under different lights.',
  'You record the outdoor temperature at your home every evening in January.',
  'You time the wait at a bus stop in your city at different times of day.',
  'You ask every player on your hockey team how many hours they practise each week.',
];
const SECONDARY = [
  'You download census tables from the national statistics office about the populations of the country’s cities.',
  'You use team statistics from the NHL’s official website.',
  'You use wildfire records published by a government forestry agency.',
  'You use the results of a survey that a polling company published.',
  'You copy a data table from a research article about teenagers and sleep.',
  'You use historical weather records from the national weather service.',
  'You use a table of grocery prices published by a government statistics agency.',
];

const SOURCES = [
  {
    need: 'the populations of the country’s largest cities in each census',
    good: 'Census data from the national statistics office',
    bad: ['A travel blog about the country’s cities', 'A real-estate company’s advertisement', 'Comments on a social media post'],
  },
  {
    need: 'the number of wildfires in their region each year',
    good: 'Wildfire records published by a government forestry agency',
    bad: ['A video of a wildfire on a video-sharing site', 'A survey of your classmates', 'A post in an online forum'],
  },
  {
    need: 'goals and shots for every NHL team',
    good: 'The official statistics on the NHL’s website',
    bad: ['A fan’s highlight video', 'A sports-betting company’s advertisement', 'An online poll of hockey fans'],
  },
  {
    need: 'how sleep affects teenagers’ marks',
    good: 'A peer-reviewed study by university health researchers',
    bad: ['A mattress company’s advertisement', 'A popular video by an influencer', 'An anonymous forum post'],
  },
  {
    need: 'daily temperatures in a northern town over the past 30 years',
    good: 'Historical weather records from the national weather service',
    bad: ['A neighbour’s memory of past winters', 'A furnace company’s advertisement', 'A post in a community social media group'],
  },
  {
    need: 'how grocery prices in the country have changed over 20 years',
    good: 'Price data published by a government statistics agency',
    bad: ['One grocery store’s flyer from this week', 'A food blogger’s opinion', 'Comments on a news story'],
  },
];

const SURVEY_QS = [
  {
    topic: 'screen time',
    neutral: 'On a typical school day, how many hours do you spend looking at a screen outside of class?',
    biased: ['Don’t you agree that teens spend far too much time on their phones?', 'How many hours a day do you waste on your phone?', 'Experts say phones harm teenagers. How much do you use yours?'],
  },
  {
    topic: 'a new recreation centre in their city',
    neutral: 'Do you support or oppose building a new recreation centre in our city?',
    biased: ['Do you support building a beautiful new recreation centre that will keep kids active and safe?', 'Wouldn’t you agree that our city badly needs a new recreation centre?', 'Should the city waste millions of dollars on a new recreation centre?'],
  },
  {
    topic: 'school start times',
    neutral: 'Which start time would you prefer for school: 8:00, 8:30, 9:00 or 9:30?',
    biased: ['Wouldn’t a later start time help tired students learn better?', 'Do you support keeping our unhealthy early start time?', 'Most students hate starting early. When should school start?'],
  },
  {
    topic: 'the school cafeteria',
    neutral: 'How would you rate the cafeteria food on a scale from 1 (poor) to 5 (excellent)?',
    biased: ['How much do you dislike the greasy cafeteria food?', 'Don’t you think the cafeteria should serve healthier food?', 'Since most students think the food is bad, how would you rate it?'],
  },
  {
    topic: 'bike lanes in their city',
    neutral: 'Do you support or oppose adding bike lanes on downtown streets in our city?',
    biased: ['Do you support dangerous bike lanes that slow down traffic?', 'Wouldn’t safe bike lanes make downtown a better place?', 'Should the city stop ignoring cyclists and finally build bike lanes?'],
  },
  {
    topic: 'exercise',
    neutral: 'In a typical week, how many minutes do you spend doing physical activity?',
    biased: ['Do you get enough exercise, or are you lazy like most teens?', 'Don’t you agree that everyone should exercise every day?', 'Since exercise is so important, how much do you exercise each week?'],
  },
];

const SAMPLES = [
  {
    want: 'how many hours of homework the Grade 10 to 12 students at a large city high school do each week',
    good: 'Randomly select 60 students from the school’s list of all Grade 10 to 12 students.',
    bad: ['Ask the 25 students in one math class.', 'Post an online survey on the school website and use whoever answers.', 'Ask students who are studying in the library after school.'],
  },
  {
    want: 'how the residents of a city feel about adding bike lanes downtown',
    good: 'Randomly choose 400 households from a list of every household in the city.',
    bad: ['Survey the members of a cycling club.', 'Ask shoppers at one downtown mall on a Tuesday morning.', 'Post a poll on a social media page and use whoever answers.'],
  },
  {
    want: 'the average height of the Grade 11 students in a large school division',
    good: 'Randomly select Grade 11 students from every high school in the division.',
    bad: ['Measure the players on the senior basketball team.', 'Measure the students in one class at one school.', 'Ask for volunteers at a school assembly.'],
  },
  {
    want: 'what percent of the teenagers in a city have a part-time job',
    good: 'Randomly select students from the lists of all the city’s high schools.',
    bad: ['Survey teens in a shopping mall food court on a Saturday.', 'Survey the employees of a fast-food restaurant.', 'Ask friends to share an online survey.'],
  },
  {
    want: 'which new pizza topping the customers of a local pizza shop would like',
    good: 'Randomly choose customers from the shop’s list of all orders over the past month.',
    bad: ['Ask the shop’s employees.', 'Ask only the customers who order vegetarian pizza.', 'Ask the first 10 customers on a Friday night.'],
  },
];

type BiasKind = 'sampling' | 'response' | 'nonresponse' | 'measurement';
const BIAS_TEXT: Record<BiasKind, string> = {
  sampling: 'Sampling bias: the sample does not represent the population.',
  response: 'Response bias: the question or situation pushes people to give answers that are not accurate.',
  nonresponse: 'Non-response bias: many people chosen for the sample do not respond.',
  measurement: 'Measurement bias: the tool or method used to measure gives wrong values.',
};
const BIAS_ORDER: BiasKind[] = ['sampling', 'response', 'nonresponse', 'measurement'];
const SCENARIOS: Array<{ kind: BiasKind; text: string; why: string }> = [
  { kind: 'sampling', text: 'To find out how often a city’s residents use public transit, a researcher surveys people waiting at a light-rail station.', why: 'People at a train station use transit more than most residents, so the sample does not represent the population.' },
  { kind: 'sampling', text: 'To estimate the average height of Grade 11 students, a student measures the senior volleyball team.', why: 'Volleyball players tend to be taller than other students, so the sample does not represent all Grade 11 students.' },
  { kind: 'sampling', text: 'To learn what music the students at a school like, a student surveys only the members of the school band.', why: 'Band members are not typical of all students, so the sample does not represent the population.' },
  { kind: 'response', text: 'A teacher asks each student, out loud in front of the class, whether they have ever cheated on a test.', why: 'Students are unlikely to answer honestly in front of others, so the answers are not accurate.' },
  { kind: 'response', text: 'A survey asks, “Don’t you agree that the new park is a great use of tax money?”', why: 'The leading wording pushes people toward agreeing, so the answers are not accurate.' },
  { kind: 'response', text: 'A dentist asks patients how often they floss while the patients are sitting in the dentist’s chair.', why: 'Patients may say they floss more often than they really do, so the answers are not accurate.' },
  { kind: 'nonresponse', text: 'A town mails 2000 surveys about a new arena, and only 150 are mailed back, mostly by people with strong opinions.', why: 'Most of the people chosen did not respond, and those who did may not be typical.' },
  { kind: 'nonresponse', text: 'An email survey about the school cafeteria is sent to all 900 students, but only 60 reply.', why: 'Most of the students chosen did not respond, so the replies may not represent everyone.' },
  { kind: 'measurement', text: 'A scale used to weigh bags of flour at a mill always reads 20 g too high.', why: 'The measuring tool itself gives wrong values.' },
  { kind: 'measurement', text: 'For a weather project, a student places the thermometer in direct sunlight, so it reads higher than the air temperature.', why: 'The measuring method gives wrong values.' },
  { kind: 'measurement', text: 'Students time a reaction test with a stopwatch app that lags by about half a second.', why: 'The measuring tool itself gives wrong values.' },
];

function primaryItem(rng: Rng) {
  const primary = rng.chance(0.5);
  const text = rng.pick(primary ? PRIMARY : SECONDARY);
  const choices = [
    'Primary data: you collect it yourself.',
    'Secondary data: someone else collected it.',
    'Primary data: it comes from a trusted organization.',
    'Secondary data: it is about other people, not you.',
  ];
  return {
    prompt: `For a research project:\n\n> ${text}\n\nIs this primary data or secondary data?`,
    parts: [part(fixedChoice(choices, primary ? 0 : 1))],
    hints: ['Ask: who collected the data?', 'Primary data is collected by the researcher (you). Secondary data was collected by someone else, such as a government agency or another researcher.'],
    solution: [
      primary ? 'You are collecting the data yourself, first-hand.' : 'Someone else collected this data, and you are using it.',
      primary ? 'Data you collect yourself is **primary data**.' : 'Data collected by someone else is **secondary data**, even when the source is trusted.',
    ],
  };
}

const researchData = skill({
  id: 'm202-research-data',
  name: 'Data sources and bias',
  description: 'Classify data as primary or secondary, choose a reliable source and a fair sample, and recognize biased survey questions.',
  outcomes: ['RP1'],
  lessonId: 'm202-9-1',
  format: 'mc',
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return primaryItem(rng);
    if (d === 2) {
      if (rng.chance(0.5)) {
        const s = rng.pick(SURVEY_QS);
        return {
          prompt: `${name} is writing a survey about ${s.topic}. Which question is **least** likely to give biased results?`,
          parts: [part(mc(rng, s.neutral, s.biased))],
          hints: ['A biased question pushes people toward one answer.', 'Look for loaded words (waste, greasy, lazy, beautiful), phrases like “Don’t you agree”, and questions that tell people what others think.'],
          solution: [
            'The other questions use loaded words, lead people with “Don’t you agree” or “Wouldn’t you”, or tell people what others think, so they push toward one answer.',
            `${q(s.neutral)} uses neutral wording and lets people give any answer.`,
          ],
        };
      }
      const s = rng.pick(SOURCES);
      return {
        prompt: `${name} needs data about ${s.need} for a research project. Which source is most likely to be reliable?`,
        parts: [part(mc(rng, s.good, s.bad))],
        hints: ['Reliable data comes from a source that collects it carefully and has no reason to mislead.', 'Prefer government agencies, official records and peer-reviewed research over ads, opinions and anonymous posts.'],
        solution: [
          'Advertisements may be trying to sell something, and opinions, videos and anonymous posts are not collected carefully or checked.',
          `${s.good} is collected carefully by experts and is checked, so it is the most reliable.`,
        ],
      };
    }
    const mode = rng.pick(['sample', 'bias', 'plan'] as const);
    if (mode === 'sample') {
      const s = rng.pick(SAMPLES);
      return {
        prompt: `${name} wants to know ${s.want}. Which sampling method is most likely to give a fair (unbiased) sample?`,
        parts: [part(mc(rng, s.good, s.bad))],
        hints: ['In a fair sample, every member of the population has the same chance of being chosen.', 'Watch for samples of friends, volunteers, people in one place, or one special group.'],
        solution: [
          'Surveying one group, friends, people in one place, or whoever volunteers leaves out parts of the population, so those samples are biased.',
          `${s.good} Every member of the population has the same chance of being chosen, so this is a random, fair sample.`,
        ],
      };
    }
    if (mode === 'bias') {
      const s = rng.pick(SCENARIOS);
      return {
        prompt: `What type of bias is in this situation?\n\n> ${s.text}`,
        parts: [part(fixedChoice(BIAS_ORDER.map((k) => BIAS_TEXT[k]), BIAS_ORDER.indexOf(s.kind)))],
        hints: ['Ask: is the problem who was chosen, how people answered, who did not answer, or how something was measured?', 'Sampling: who was chosen. Response: answers that are not accurate. Non-response: people who did not answer. Measurement: a faulty tool or method.'],
        solution: [s.why, `This is ${BIAS_TEXT[s.kind].charAt(0).toLowerCase()}${BIAS_TEXT[s.kind].slice(1)}`],
      };
    }
    const t = rng.pick(TOPICS);
    return {
      prompt: `${name}’s research question is:\n\n> ${t.good}\n\nWhich plan for collecting data would best answer it?`,
      parts: [part(mc(rng, t.plan, t.badPlans))],
      hints: ['The data must match the question: the right variables, for the right population, over the right time.', 'Look for a large, fair sample or an official, reliable source, measured the same way every time.'],
      solution: [
        'The other plans use too little data, ask for opinions, use a biased group, or rely on an unreliable source.',
        `Best plan: ${t.plan} It collects the data the question needs, fairly and reliably.`,
      ],
    };
  },
});

export const RESEARCH_SKILLS: SkillDef[] = [researchQuestion, researchData];
