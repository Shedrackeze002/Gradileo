/** Math 8 Unit 10 — Data Analysis and Probability (SP1, SP2). */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import { fmt, gcd } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, PlaneFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];
const TEACHERS = ['Ms. Okafor', 'Mr. Dhillon', 'Mme Gagnon', 'Mr. Nguyen', 'Ms. Redcrow', 'Mrs. Kowalski', 'Mr. Haddad'];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };
type Lvl = Difficulty;

const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
const fr = (n: number, d: number) => `\\frac{${n}}{${d}}`;
function lowest(n: number, d: number): [number, number] {
  const g = gcd(n, d) || 1;
  return [n / g, d / g];
}
function frLow(n: number, d: number): string {
  const [a, b] = lowest(n, d);
  return b === 1 ? `${a}` : fr(a, b);
}
/** \frac{6}{8} = \frac{3}{4} (only shows the simplified form when it differs). */
function frSimp(n: number, d: number): string {
  const [a, b] = lowest(n, d);
  if (a === n) return fr(n, d);
  return b === 1 ? `${fr(n, d)} = ${a}` : `${fr(n, d)} = ${fr(a, b)}`;
}
const fracPart = (n: number, d: number, label?: string): Part => numPart(n / d, { fraction: 'lowest', label });
const LOWEST = 'Write your answer as a fraction in lowest terms.';
function listWords(ws: string[], last = 'and'): string {
  if (ws.length <= 1) return ws.join('');
  return ws.length === 2 ? `${ws[0]} ${last} ${ws[1]}` : `${ws.slice(0, -1).join(', ')} ${last} ${ws[ws.length - 1]}`;
}
/** End a phrase with exactly one period ("6 p.m." already has one). */
const dot = (s: string) => (s.endsWith('.') ? s : `${s}.`);
/** "a $40\\%$", "an $80\\%$" */
const aPct = (p: number) => `${p === 8 || p === 11 || p === 18 || (p >= 80 && p < 90) ? 'an' : 'a'} $${p}\\%$`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------
// 10.1 Choosing a graph
// ---------------------------------------------------------------------------

type GraphKind = 'bar' | 'line' | 'circle' | 'picto';
const KINDS: GraphKind[] = ['bar', 'line', 'circle', 'picto'];
const GRAPH_NAME: Record<GraphKind, string> = { bar: 'Bar graph', line: 'Line graph', circle: 'Circle graph', picto: 'Pictograph' };
const GRAPH_WHY: Record<GraphKind, string> = {
  bar: 'it compares exact amounts in separate categories',
  line: 'it shows how one quantity changes over time',
  circle: 'it shows how the parts of one whole compare, and the parts add up to $100\\%$',
  picto: 'each symbol stands for a set number of items, so the counts are quick and eye-catching to compare',
};
/** A bar graph and a pictograph can both compare categories, so neither is used as the other's wrong answer. */
const CLASH: Record<GraphKind, GraphKind[]> = { bar: ['picto'], picto: ['bar'], line: [], circle: [] };
const GRAPH_RULE = 'Bar graph: compare amounts in separate categories. Line graph: change over time. Circle graph: parts of one whole (adding to $100\\%$). Pictograph: compare counts, with each symbol standing for a set number.';
const KIND_TEXT: Record<GraphKind, string> = {
  bar: 'compares amounts in separate categories',
  line: 'shows a change over time',
  circle: 'is one whole split into parts',
  picto: 'compares simple counts that can be shown with symbols',
};

const SITUATIONS: Array<{ text: string; kind: GraphKind }> = [
  { text: 'the temperature in a city every hour from 6 a.m. to 6 p.m.', kind: 'line' },
  { text: 'how a puppy’s mass changed each week for $12$ weeks', kind: 'line' },
  { text: 'the height of a bean plant each day for three weeks', kind: 'line' },
  { text: 'the water level in a farm dugout each week of the summer', kind: 'line' },
  { text: '{name}’s savings account balance at the end of each month for a year', kind: 'line' },
  { text: 'the number of goals, to the exact goal, that each player on a hockey team scored this season', kind: 'bar' },
  { text: 'the exact heights, in metres, of five mountains in a national park', kind: 'bar' },
  { text: 'the average January temperature in five northern towns, where some of the temperatures are below zero', kind: 'bar' },
  { text: 'the exact number of each kind of sandwich a deli sold on Friday', kind: 'bar' },
  { text: 'how many students in each grade came to the school dance', kind: 'bar' },
  { text: 'how {name} spends the $24$ hours of a school day: sleeping, school, homework and free time', kind: 'circle' },
  { text: 'what percent of the money from a school fundraiser went to food, prizes, decorations and music', kind: 'circle' },
  { text: 'how a farm splits its land among wheat, canola, barley and pasture', kind: 'circle' },
  { text: 'the percent of a class who chose each of four lunch options, when each student chose exactly one', kind: 'circle' },
  { text: 'how many books each Grade 2 class read in a reading challenge, on a hallway poster where one book picture stands for $10$ books', kind: 'picto' },
  { text: 'the number of cans each homeroom brought to a food drive, on a poster where one can picture stands for $20$ cans', kind: 'picto' },
  { text: 'how many children ride each of four school buses, for a Kindergarten bulletin board that uses one smiley face for every $5$ children', kind: 'picto' },
  { text: 'the number of trees each class planted on Arbour Day, for the school newsletter, using one tree picture for every $10$ trees', kind: 'picto' },
];

function graphReasonChoices(rng: Rng, kind: GraphKind) {
  const correct = `${GRAPH_NAME[kind]}, because ${GRAPH_WHY[kind]}`;
  const others = rng.shuffle(KINDS.filter((k) => k !== kind && !CLASH[kind].includes(k)));
  const wrongWhy = rng.pick(KINDS.filter((k) => k !== kind && !CLASH[kind].includes(k)));
  const ds = rng.shuffle([
    `${GRAPH_NAME[others[0]]}, because ${GRAPH_WHY[others[0]]}`,
    `${GRAPH_NAME[others[1]]}, because ${GRAPH_WHY[others[1]]}`,
    `${GRAPH_NAME[others[0]]}, because ${GRAPH_WHY[kind]}`,
    `${GRAPH_NAME[kind]}, because ${GRAPH_WHY[wrongWhy]}`,
  ]);
  return { answer: mc(rng, correct, ds), correct };
}

function chooseBasic(rng: Rng, d: Lvl, name: string): Out {
  const sit = rng.pick(SITUATIONS);
  const text = sit.text.replace('{name}', rng.pick(NAMES.filter((x) => x !== name)));
  const why = `This data ${KIND_TEXT[sit.kind]}.`;
  if (d === 1) {
    return {
      prompt: `${name} wants to make a graph of ${dot(text)} Which kind of graph is the **best** choice?`,
      parts: [{ answer: fixedChoice(KINDS.map((k) => GRAPH_NAME[k]), KINDS.indexOf(sit.kind)) }],
      hints: ['Ask: is it categories to compare, a change over time, parts of one whole, or counts shown with symbols?', GRAPH_RULE],
      solution: [GRAPH_RULE, why, `The best choice is a **${GRAPH_NAME[sit.kind].toLowerCase()}**, because ${GRAPH_WHY[sit.kind]}.`],
      answerDisplay: GRAPH_NAME[sit.kind],
    };
  }
  const c = graphReasonChoices(rng, sit.kind);
  return {
    prompt: `${name} wants to make a graph of ${dot(text)} Which graph should ${name} use, and why?`,
    parts: [{ answer: c.answer }],
    hints: ['First decide what kind of data it is. Then check that the reason really describes that graph.', GRAPH_RULE],
    solution: [GRAPH_RULE, why, `The answer is: ${c.correct}.`],
    answerDisplay: c.correct,
  };
}

const CRITIQUES: Array<{ used: GraphKind; data: string; reason: string }> = [
  { used: 'line', data: 'the favourite sport of each student in the class', reason: 'The sports are separate categories, not times, so a line joining them has no meaning. A bar graph would be better.' },
  { used: 'line', data: 'the number of students who chose each lunch option', reason: 'The lunch options are separate categories, not times, so a line joining them has no meaning. A bar graph would be better.' },
  { used: 'circle', data: 'the temperature in a town every hour from 8 a.m. to 4 p.m.', reason: 'The temperatures are not parts of one whole and do not add to $100\\%$. A line graph would show how the temperature changes.' },
  { used: 'circle', data: 'a baby’s mass at each monthly check-up for a year', reason: 'The masses are not parts of one whole. A line graph would show how the mass changes over time.' },
  { used: 'picto', data: 'the average January temperature in five northern towns, where some are below zero', reason: 'Symbols cannot show negative values, and exact values are hard to show. A bar graph would be better.' },
  { used: 'picto', data: 'the masses of five newborn puppies to the nearest gram', reason: 'Exact measurements like these would need many tiny parts of symbols. A bar graph would show the exact values better.' },
];
const CRITIQUE_WRONG = [
  'Nothing is wrong. Any kind of graph can show any set of data.',
  'It is a poor choice only because it has too few categories.',
  'Nothing is wrong, because the data has numbers in it.',
  'It is a poor choice because every graph should use bars.',
];

function chooseCritique(rng: Rng, name: string): Out {
  const c = rng.pick(CRITIQUES);
  return {
    prompt: `${name} made a ${GRAPH_NAME[c.used].toLowerCase()} to show ${dot(c.data)} Why is this a poor choice of graph?`,
    parts: [{ answer: mc(rng, c.reason, rng.sample(CRITIQUE_WRONG, 3)) }],
    hints: [`Ask: what kind of data does a ${GRAPH_NAME[c.used].toLowerCase()} show best? Does this data fit?`, GRAPH_RULE],
    solution: [`A ${GRAPH_NAME[c.used].toLowerCase()} ${c.used === 'line' ? 'shows change over time' : c.used === 'circle' ? 'shows parts of one whole' : 'shows counts with symbols'}.`, `The data here is ${dot(c.data)}`, `So: ${c.reason}`],
    answerDisplay: c.reason,
  };
}

const ACTIVITIES = ['Sports', 'Music', 'Art', 'Clubs', 'Drama', 'Coding'];

function chooseMulti(rng: Rng, name: string): Out {
  const teacher = rng.pick(TEACHERS);
  const n = rng.pick([20, 25, 50]);
  const acts = rng.sample(ACTIVITIES, 4);
  const counts = retry(() => acts.map(() => rng.int(Math.round(n * 0.15), Math.round(n * 0.6))), (cs) => sum(cs) > n + 4 && new Set(cs).size === 4, 200);
  const pcts = counts.map((c) => (100 * c) / n);
  const total = sum(pcts);
  const correct = `No. Students could choose more than one activity, so the percents add up to more than $100\\%$.`;
  return {
    prompt: `${teacher} asked the $${n}$ students in the class which after-school activities they do. Students could choose **more than one** activity. ${name} wants to show the results in a circle graph. (a) What do the percents for the four activities add up to? (b) Can a circle graph show this data?`,
    figure: { type: 'table', headers: ['Activity', 'Students'], rows: acts.map((a, i) => [a, String(counts[i])]) },
    parts: [numPart(total, { label: '(a) Total', suffix: '%' }), { label: '(b)', answer: mc(rng, correct, [
      'Yes. Each activity can be one part of the circle.',
      'Yes, as long as the percents are rounded to whole numbers.',
      'No, because a circle graph can only show two categories.',
    ]) }],
    hints: [`Change each count to a percent of the $${n}$ students: divide by $${n}$ and multiply by $100$.`, 'A circle graph shows parts of one whole, so its parts must add up to exactly $100\\%$.'],
    solution: [
      ...acts.map((a, i) => `${a}: $${counts[i]} \\div ${n} \\times 100 = ${fmt(pcts[i])}\\%$`),
      `Total: $${pcts.map((p) => fmt(p)).join(' + ')} = ${fmt(total)}\\%$`,
      `(a) $${fmt(total)}\\%$. (b) ${correct} A bar graph would be a better choice.`,
    ],
  };
}

function chooseFromTable(rng: Rng, name: string): Out {
  const kind = rng.pick(['line', 'circle', 'bar'] as const);
  let figure: Figure;
  let intro: string;
  if (kind === 'line') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    let v = rng.int(-18, -8);
    const vals = months.map(() => (v += rng.int(2, 7)));
    figure = { type: 'table', headers: ['Month', 'Noon temperature (°C)'], rows: months.map((m, i) => [m, String(vals[i])]) };
    intro = `${name} recorded the noon temperature in a northern town on the first day of each month.`;
  } else if (kind === 'circle') {
    const cats = ['Rent', 'Food', 'Transport', 'Savings', 'Fun'];
    const parts = retry(() => cats.map(() => 5 * rng.int(2, 8)), (p) => sum(p) === 100 && new Set(p).size >= 4, 500);
    if (sum(parts) !== 100) parts.splice(0, 5, 35, 25, 15, 15, 10);
    figure = { type: 'table', headers: ['Category', 'Percent of monthly budget'], rows: cats.map((c, i) => [c, `${parts[i]}%`]) };
    intro = `The table shows how a family splits its monthly budget.`;
  } else {
    const towns = ['Pinewood', 'Clearwater', 'Ashford', 'Northfield', 'Westbury'];
    const vals = towns.map(() => rng.int(250, 900));
    figure = { type: 'table', headers: ['Town', 'Students in the Grade 8 math contest'], rows: towns.map((t, i) => [t, String(vals[i])]) };
    intro = 'The table shows how many students from each of five towns entered a Grade 8 math contest.';
  }
  const c = graphReasonChoices(rng, kind);
  return {
    prompt: `${intro} Which graph is the best way to display this data, and why?`,
    figure,
    parts: [{ answer: c.answer }],
    hints: ['Look at the first column. Is it times, categories, or parts of one whole?', GRAPH_RULE],
    solution: [
      kind === 'line' ? 'The data is measured at different times (months), so it shows a change over time.' : kind === 'circle' ? 'The percents are parts of one budget, and they add up to $100\\%$.' : 'The towns are separate categories, and the counts are exact numbers that are not multiples of one symbol value.',
      `The answer is: ${c.correct}.`,
    ],
    answerDisplay: c.correct,
  };
}

const chooseGraph = skill({
  id: 'm8-choose-graph',
  name: 'Choosing a suitable graph',
  description: 'Choose a circle graph, line graph, bar graph or pictograph for a set of data, and explain why it suits the data.',
  outcomes: ['SP1'],
  lessonId: 'm8-10-1',
  format: 'mc',
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d < 3) return chooseBasic(rng, d, name);
    const k = rng.pick(['critique', 'multi', 'table'] as const);
    return k === 'critique' ? chooseCritique(rng, name) : k === 'multi' ? chooseMulti(rng, name) : chooseFromTable(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 10.1 Misleading graphs
// ---------------------------------------------------------------------------

type Flaw = 'axis' | 'intervals' | 'symbols' | 'circle' | 'scale';
const FLAW_REASON: Record<Flaw, string> = {
  axis: 'The vertical axis does not start at $0$, so small differences look much bigger than they are.',
  intervals: 'The years are not equally spaced in time, but they are drawn the same distance apart.',
  symbols: 'The symbols are not all the same size, so a longer row does not always mean a bigger number.',
  circle: 'The percents do not add up to $100\\%$, so they cannot be the parts of one whole.',
  scale: 'The numbers on the vertical axis do not go up by equal steps.',
};
const SILLY = ['The graph uses too many colours.', 'The bars are too wide.', 'The graph should be drawn in pencil.'];

function flawChoices(rng: Rng, flaw: Flaw) {
  const others = rng.sample((Object.keys(FLAW_REASON) as Flaw[]).filter((f) => f !== flaw), 2).map((f) => FLAW_REASON[f]);
  return mc(rng, FLAW_REASON[flaw], [...others, rng.pick(SILLY)]);
}

const AXIS_CTX = [
  { intro: 'A gym put this bar graph of its members on a poster.', base: 400, step: 10, label: 'Members', unit: 'members', what: 'The number of members' },
  { intro: 'A school made this bar graph of the number of students in its band each year.', base: 40, step: 2, label: 'Band members', unit: 'students', what: 'The number of band members' },
  { intro: 'A bakery made this bar graph of the loaves of bread it sold each week of a month.', base: 600, step: 20, label: 'Loaves sold', unit: 'loaves', what: 'The number of loaves sold', weeks: true },
  { intro: 'A junior hockey team made this bar graph of the fans at its home opener each year.', base: 1500, step: 50, label: 'Fans', unit: 'fans', what: 'The number of fans' },
  { intro: 'A lakeside campground made this bar graph of the campsites it booked each year.', base: 180, step: 4, label: 'Campsites booked', unit: 'campsites', what: 'The number of campsites booked' },
];

interface Broken { figure: PlaneFigure; intro: string; xs: number[]; vs: number[]; base: number; unit: string; what: string; xName: (x: number) => string }

/** A bar graph drawn on a grid whose vertical axis starts well above 0. */
function brokenGraph(rng: Rng): Broken {
  const ctx = rng.pick(AXIS_CTX);
  const xs = ctx.weeks ? [1, 2, 3, 4] : [2022, 2023, 2024, 2025];
  const vs = retry(
    () => {
      const out = [ctx.base + ctx.step * rng.int(1, 2)];
      for (let i = 1; i < 4; i++) out.push(out[i - 1] + ctx.step * rng.int(1, 3));
      return out;
    },
    (v) => v[3] <= ctx.base + 9 * ctx.step && v[3] - ctx.base >= 3 * (v[0] - ctx.base),
    300,
  );
  const top = ctx.base + 10 * ctx.step;
  const figure: PlaneFigure = {
    type: 'plane',
    grid: { xMin: xs[0] - 0.6, xMax: xs[3] + 0.6, yMin: ctx.base, yMax: top, xStep: 1, yStep: ctx.step, xLabel: ctx.weeks ? 'Week' : 'Year', yLabel: ctx.label },
    polylines: xs.map((x, i) => ({ points: [[x - 0.3, ctx.base], [x - 0.3, vs[i]], [x + 0.3, vs[i]], [x + 0.3, ctx.base], [x - 0.3, ctx.base]] as Array<[number, number]>, fill: true })),
  };
  return { figure, intro: ctx.intro, xs, vs, base: ctx.base, unit: ctx.unit, what: ctx.what, xName: (x) => (ctx.weeks ? `week ${x}` : String(x)) };
}

const CIRCLE_CTX = [
  { intro: 'A school newspaper printed this circle graph of how students get to school.', cats: ['Bus', 'Car', 'Walk', 'Bike'] },
  { intro: 'A poster shows this circle graph of students’ favourite seasons.', cats: ['Winter', 'Spring', 'Summer', 'Fall'] },
  { intro: 'A sports club made this circle graph of the sports its members play.', cats: ['Hockey', 'Soccer', 'Basketball', 'Volleyball'] },
  { intro: 'A pet store made this circle graph of the pets its customers own.', cats: ['Dogs', 'Cats', 'Fish', 'Birds'] },
];

function badCircle(rng: Rng): { figure: Figure; intro: string; pcts: number[]; cats: string[]; total: number } {
  const ctx = rng.pick(CIRCLE_CTX);
  const pcts = retry(() => ctx.cats.map(() => 5 * rng.int(2, 10)), (p) => sum(p) !== 100 && Math.abs(sum(p) - 100) >= 10 && Math.abs(sum(p) - 100) <= 35 && new Set(p).size >= 3, 500);
  const figure: Figure = { type: 'circleGraph', slices: ctx.cats.map((c, i) => ({ label: `${c} ${pcts[i]}%`, value: pcts[i] })), show: 'none' };
  return { figure, intro: ctx.intro, pcts, cats: ctx.cats, total: sum(pcts) };
}

function unequalYears(rng: Rng): { figure: Figure; intro: string } {
  const years = rng.pick([
    ['1990', '2000', '2010', '2020', '2022', '2024'],
    ['2000', '2010', '2015', '2020', '2021', '2022'],
    ['1985', '1995', '2005', '2015', '2023', '2024'],
  ]);
  const ctx = rng.pick([
    { intro: 'A curling club made this bar graph of its members.', label: 'Members', lo: 60, hi: 140 },
    { intro: 'A town library made this bar graph of the books it owns, in thousands.', label: 'Books (thousands)', lo: 10, hi: 40 },
    { intro: 'A ski hill made this bar graph of its season passes sold, in hundreds.', label: 'Passes (hundreds)', lo: 8, hi: 30 },
  ]);
  let v = ctx.lo;
  const values = years.map(() => (v += rng.int(1, Math.max(2, Math.round((ctx.hi - ctx.lo) / 8)))));
  return { figure: { type: 'barChart', categories: years, values, valueLabel: ctx.label, categoryLabel: 'Year' }, intro: ctx.intro };
}

function symbolsText(rng: Rng): string {
  const [a, b] = rng.sample(TEACHERS, 2);
  const per = rng.pick([5, 10, 20]);
  const na = rng.int(5, 7);
  const nb = na - rng.int(1, 2);
  const thing = rng.pick([['books read', 'book'], ['cans collected', 'can'], ['kilometres walked', 'shoe']]);
  return `A pictograph shows the ${thing[0]} by two classes. Each ${thing[1]} symbol stands for $${per}$ ${thing[0].split(' ')[0]}. ${a}’s row has $${na}$ small symbols. ${b}’s row has $${nb}$ symbols, but they are drawn twice as wide, so ${b}’s row looks longer.`;
}

function scaleText(rng: Rng): string {
  const lab = rng.pick(['0, 10, 20, 50, 100 and 200', '0, 5, 10, 20, 40 and 80', '0, 25, 50, 100, 500 and 1000']);
  const what = rng.pick(['money raised by four classes', 'the number of visitors to a museum each month', 'the number of students in four sports teams’ fan clubs']);
  return `A bar graph shows ${what}. The labels on the vertical axis are ${lab}, and they are spaced the same distance apart.`;
}

function misleadWhy(rng: Rng, flaw: Flaw): Out {
  let prompt = '';
  let figure: Figure | undefined;
  let look = '';
  if (flaw === 'axis') {
    const g = brokenGraph(rng);
    figure = g.figure;
    prompt = `${g.intro} It makes the growth look huge.`;
    look = `The vertical axis starts at $${g.base}$, not $0$. The real change is from $${g.vs[0]}$ to $${g.vs[3]}$ ${g.unit}, only $${g.vs[3] - g.vs[0]}$ more.`;
  } else if (flaw === 'circle') {
    const c = badCircle(rng);
    figure = c.figure;
    prompt = c.intro;
    look = `Add the percents: $${c.pcts.join(' + ')} = ${c.total}\\%$. The parts of a whole must add to exactly $100\\%$.`;
  } else if (flaw === 'intervals') {
    const u = unequalYears(rng);
    figure = u.figure;
    prompt = u.intro;
    const ys = (u.figure as { categories: string[] }).categories;
    look = `The first gaps are ${Number(ys[1]) - Number(ys[0])} years, but the last gap is only ${Number(ys[5]) - Number(ys[4])} year${Number(ys[5]) - Number(ys[4]) > 1 ? 's' : ''}. They are drawn the same distance apart, so the change over time looks different from what really happened.`;
  } else if (flaw === 'symbols') {
    prompt = symbolsText(rng);
    look = 'In a fair pictograph, every symbol is the same size. Here the bigger symbols make a row with fewer symbols look longer.';
  } else {
    prompt = scaleText(rng);
    look = 'The steps between the labels are not equal, but they are drawn the same distance apart, so the heights of the bars cannot be compared fairly.';
  }
  return {
    prompt: `${prompt} Why is this graph misleading?`,
    figure,
    parts: [{ answer: flawChoices(rng, flaw) }],
    hints: ['Check the axes: where do they start, and do the numbers go up by equal steps? Check the parts and the symbols.', 'Only one answer describes something that is really wrong with this graph.'],
    solution: [look, `The answer is: ${FLAW_REASON[flaw]}`],
    answerDisplay: FLAW_REASON[flaw],
  };
}

function axisNumbers(rng: Rng): Out {
  const g = brokenGraph(rng);
  const a = g.vs[0];
  const b = g.vs[3];
  const looks = Math.round((b - g.base) / (a - g.base));
  const pct = (100 * (b - a)) / a;
  const pctTxt = pct < 1 ? 'less than $1\\%$' : `about $${Math.round(pct)}\\%$`;
  const correct = `${g.what} grew by only ${pctTxt}.`;
  return {
    prompt: `${g.intro} The ${g.xName(g.xs[3])} bar looks about $${looks}$ times as tall as the ${g.xName(g.xs[0])} bar. (a) Read the graph. By how many ${g.unit} did the number really grow from ${g.xName(g.xs[0])} to ${g.xName(g.xs[3])}? (b) Which statement is true?`,
    figure: g.figure,
    parts: [numPart(b - a, { label: '(a) Increase', suffix: g.unit }), { label: '(b)', answer: mc(rng, correct, [
      `${g.what} in ${g.xName(g.xs[3])} was about $${looks}$ times ${g.what.replace('The', 'the')} in ${g.xName(g.xs[0])}.`,
      `${g.what} more than doubled from ${g.xName(g.xs[0])} to ${g.xName(g.xs[3])}.`,
      `${g.what} did not change at all.`,
    ]) }],
    hints: ['Read the real values of the first and last bars from the numbers on the vertical axis. Notice where the axis starts.', 'Subtract to find the increase. Then compare the increase with the first value.'],
    solution: [
      `The axis starts at $${g.base}$, not $0$, so the bottoms of the bars are cut off.`,
      `${cap(g.xName(g.xs[0]))}: $${a}$. ${cap(g.xName(g.xs[3]))}: $${b}$. Increase: $${b} - ${a} = ${b - a}$`,
      `Compared with $${a}$, that is $${b - a} \\div ${a} \\times 100 \\approx ${fmt(pct, 1)}\\%$.`,
      `(a) $${b - a}$ ${g.unit}. (b) ${correct}`,
    ],
  };
}

function circleNumbers(rng: Rng): Out {
  const c = badCircle(rng);
  const over = c.total > 100;
  const correct = over
    ? 'The graph cannot be right: the parts of one whole must add to $100\\%$. Maybe people could choose more than one answer, or a percent is wrong.'
    : 'The graph cannot be right: the parts of one whole must add to $100\\%$. Some answers are missing, or a percent is wrong.';
  return {
    prompt: `${c.intro} (a) What do the percents add up to? (b) What can you conclude?`,
    figure: c.figure,
    parts: [numPart(c.total, { label: '(a) Total', suffix: '%' }), { label: '(b)', answer: mc(rng, correct, [
      'The graph is correct, because every category has a percent.',
      `${c.cats[c.pcts.indexOf(Math.max(...c.pcts))]} must be exactly $${Math.max(...c.pcts) + 100 - c.total}\\%$, so only that label is wrong.`,
      'The graph is correct, because the slices fill the whole circle.',
    ]) }],
    hints: ['Add all the percents in the legend.', 'A circle graph shows the parts of one whole, so the percents must add to exactly $100\\%$.'],
    solution: [`$${c.pcts.join(' + ')} = ${c.total}\\%$`, `This is ${over ? 'more' : 'less'} than $100\\%$.`, `(a) $${c.total}\\%$. (b) ${correct}`],
  };
}

const misleadingGraph = skill({
  id: 'm8-misleading-graph',
  name: 'Misleading graphs',
  description: 'Explain how a graph can mislead: a vertical axis that does not start at 0, unequal intervals, pictograph symbols of different sizes, or a circle graph whose parts do not add to 100%.',
  outcomes: ['SP1'],
  lessonId: 'm8-10-1',
  format: 'mc',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return misleadWhy(rng, rng.pick(['axis', 'axis', 'circle'] as const));
    if (d === 2) return misleadWhy(rng, rng.pick(['axis', 'intervals', 'symbols', 'circle', 'scale'] as const));
    return rng.chance(0.6) ? axisNumbers(rng) : circleNumbers(rng);
  },
});

// ---------------------------------------------------------------------------
// 10.2 Independent events
// ---------------------------------------------------------------------------

interface Ev {
  /** "flips a coin" */
  act: string;
  /** "the coin lands heads" */
  res: string;
  /** Short label inside P(...). */
  lab: string;
  f: number;
  t: number;
  why: string;
}

function coinEv(rng: Rng): Ev {
  const h = rng.chance(0.5);
  return { act: 'flips a coin', res: `the coin lands ${h ? 'heads' : 'tails'}`, lab: h ? 'heads' : 'tails', f: 1, t: 2, why: `A coin has $2$ equally likely outcomes, and $1$ is ${h ? 'heads' : 'tails'}.` };
}
function dieEv(rng: Rng, which = 'a six-sided die'): Ev {
  const k = rng.int(1, 6);
  const ev = rng.pick([
    { r: `a $${k}$`, lab: `${k}`, f: 1, why: `One of the $6$ numbers is $${k}$.` },
    { r: 'an even number', lab: '\\text{even}', f: 3, why: 'The even numbers are $2$, $4$ and $6$.' },
    { r: 'a number greater than $4$', lab: '\\text{greater than } 4', f: 2, why: 'The numbers greater than $4$ are $5$ and $6$.' },
    { r: 'a multiple of $3$', lab: '\\text{multiple of } 3', f: 2, why: 'The multiples of $3$ are $3$ and $6$.' },
    { r: 'a number less than $5$', lab: '\\text{less than } 5', f: 4, why: 'The numbers less than $5$ are $1$, $2$, $3$ and $4$.' },
  ]);
  return { act: `rolls ${which}`, res: `the die shows ${ev.r}`, lab: ev.lab.startsWith('\\') || /^\d/.test(ev.lab) ? ev.lab : `\\text{${ev.lab}}`, f: ev.f, t: 6, why: `A die has $6$ equally likely outcomes. ${ev.why}` };
}
function numSpinEv(rng: Rng): Ev {
  const k = rng.pick([4, 5, 8, 10]);
  const ev = rng.pick([
    { r: 'an even number', lab: '\\text{even}', f: Math.floor(k / 2) },
    { r: `a $1$`, lab: '1', f: 1 },
    { r: `a number greater than $${k - 3}$`, lab: `\\text{greater than } ${k - 3}`, f: 3 },
  ]);
  return { act: `spins a spinner with $${k}$ equal sections numbered $1$ to $${k}$`, res: `the spinner lands on ${ev.r}`, lab: ev.lab, f: ev.f, t: k, why: `The spinner has $${k}$ equal sections, and $${ev.f}$ of them ${ev.f === 1 ? 'fits' : 'fit'}.` };
}
const COLS = ['red', 'blue', 'green', 'yellow'];
function colourSpinEv(rng: Rng): Ev {
  const t = rng.pick([5, 6, 8, 10]);
  const [c1, c2] = rng.sample(COLS, 2);
  const f = rng.int(1, t - 2);
  return { act: `spins a spinner with $${t}$ equal sections: $${f}$ ${c1} and $${t - f}$ ${c2}`, res: `the spinner lands on ${c1}`, lab: `\\text{${c1}}`, f, t, why: `$${f}$ of the $${t}$ equal sections are ${c1}.` };
}
function bagEv(rng: Rng): Ev {
  const [c1, c2, c3] = rng.sample(COLS, 3);
  const counts = retry(() => [rng.int(1, 6), rng.int(1, 6), rng.int(1, 6)], (c) => new Set(c).size === 3);
  const t = sum(counts);
  return { act: `picks a marble without looking from a bag with $${counts[0]}$ ${c1}, $${counts[1]}$ ${c2} and $${counts[2]}$ ${c3} marbles`, res: `the marble is ${c1}`, lab: `\\text{${c1}}`, f: counts[0], t, why: `$${counts[0]}$ of the $${t}$ marbles are ${c1}.` };
}
function cardEv(rng: Rng): Ev {
  const ev = rng.pick([
    { r: 'a heart', lab: '\\text{heart}', f: 13, why: 'There are $13$ hearts in the $52$ cards.' },
    { r: 'a red card', lab: '\\text{red}', f: 26, why: 'Hearts and diamonds are red: $26$ of the $52$ cards.' },
    { r: 'a king', lab: '\\text{king}', f: 4, why: 'There are $4$ kings, one in each suit.' },
    { r: 'a face card (jack, queen or king)', lab: '\\text{face card}', f: 12, why: 'Each suit has $3$ face cards, so there are $12$.' },
    { r: 'an ace', lab: '\\text{ace}', f: 4, why: 'There are $4$ aces, one in each suit.' },
  ]);
  return { act: 'picks a card from a shuffled standard deck', res: `the card is ${ev.r}`, lab: ev.lab, f: ev.f, t: 52, why: ev.why };
}
const DECK = 'A standard deck has $52$ cards in $4$ suits (hearts and diamonds are red; clubs and spades are black). Each suit has $13$ cards: ace, $2$ to $10$, jack, queen and king.';

const MULT = '$P(A \\text{ and } B) = P(A) \\times P(B)$ when $A$ and $B$ are independent.';
const TREE_HINT = 'Make a table or a tree diagram of the outcomes, or multiply the two probabilities.';

/** Multiply two probabilities, simplifying each first, and show the steps. */
function productSteps(a: Ev, b: Ev, la = 'A', lb = 'B'): { n: number; d: number; steps: string[] } {
  const [an, ad] = lowest(a.f, a.t);
  const [bn, bd] = lowest(b.f, b.t);
  const [n, d] = lowest(an * bn, ad * bd);
  return {
    n,
    d,
    steps: [
      `$P(${la}) = ${frSimp(a.f, a.t)}$. ${a.why}`,
      `$P(${lb}) = ${frSimp(b.f, b.t)}$. ${b.why}`,
      `The events are independent, so multiply: $${fr(an, ad)} \\times ${fr(bn, bd)} = ${frSimp(an * bn, ad * bd)}$`,
    ],
  };
}

function indepD1(rng: Rng, name: string): Out {
  const pairs: Array<() => [Ev, Ev]> = [
    () => [coinEv(rng), dieEv(rng)],
    () => [coinEv(rng), numSpinEv(rng)],
    () => [dieEv(rng), numSpinEv(rng)],
    () => [numSpinEv(rng), coinEv(rng)],
  ];
  const [a, b] = rng.pick(pairs)();
  const pr = productSteps(a, b);
  return {
    prompt: `${name} ${a.act} and ${b.act}. What is the probability that ${a.res} and ${b.res}? ${LOWEST}`,
    parts: [fracPart(pr.n, pr.d)],
    hints: [TREE_HINT, MULT],
    solution: [...pr.steps, `Check with a table: $${a.t} \\times ${b.t} = ${a.t * b.t}$ outcomes, and $${a.f} \\times ${b.f} = ${a.f * b.f}$ of them fit: $${frSimp(a.f * b.f, a.t * b.t)}$.`, `The probability is $${fr(pr.n, pr.d)}$.`],
  };
}

/** A tree diagram (plane canvas) with probabilities in the labels. */
function treeFigure(first: Array<[string, string]>, second: Array<[string, string]>): PlaneFigure {
  const n2 = second.length;
  const H = first.length * n2;
  const segments: NonNullable<PlaneFigure['segments']> = [];
  const points: NonNullable<PlaneFigure['points']> = [{ x: 0, y: H / 2, color: 'muted' }];
  first.forEach(([a, pa], i) => {
    const y1 = H - (i * n2 + n2 / 2);
    segments.push({ from: [0, H / 2], to: [3, y1] });
    points.push({ x: 3, y: y1, label: `${a} (${pa})` });
    second.forEach(([b, pb], j) => {
      const y2 = H - (i * n2 + j + 0.5);
      segments.push({ from: [4.4, y1], to: [7, y2], color: 'accent' });
      points.push({ x: 7, y: y2, label: `${b} (${pb}) → ${a}${b}`, color: 'accent' });
    });
  });
  return { type: 'plane', grid: { xMin: -0.5, xMax: 12, yMin: 0, yMax: H, xStep: 12.5, yStep: H }, hideTickLabels: true, segments, points };
}

function indepTree(rng: Rng, name: string): Out {
  // Coin, then a spinner with unequal colour parts.
  const parts = rng.pick([[2, 1, 1], [1, 2, 1], [3, 1, 4], [1, 1, 2], [2, 3, 3], [1, 3, 4]]);
  const t = sum(parts);
  const cols = rng.sample(['R', 'B', 'G', 'Y'], 3);
  const names: Record<string, string> = { R: 'red', B: 'blue', G: 'green', Y: 'yellow' };
  const second: Array<[string, string]> = cols.map((c, i) => [c, `${lowest(parts[i], t)[0]}/${lowest(parts[i], t)[1]}`]);
  const figure = treeFigure([['H', '1/2'], ['T', '1/2']], second);
  const coinRes = rng.pick(['H', 'T']);
  const j = rng.int(0, 2);
  const [pn, pd] = lowest(parts[j], t);
  const [n, d] = lowest(pn, 2 * pd);
  return {
    prompt: `${name} flips a coin and spins a spinner with $${t}$ equal sections: ${listWords(cols.map((c, i) => `$${parts[i]}$ ${names[c]} (${c})`))}. The tree diagram shows the probability of each branch. What is $P(\\text{${coinRes}${cols[j]}})$, the probability of ${coinRes === 'H' ? 'heads' : 'tails'} and ${names[cols[j]]}? ${LOWEST}`,
    figure,
    parts: [fracPart(n, d)],
    hints: ['Follow the path for the coin, then the path for the spinner.', 'Multiply the probabilities along the path.'],
    solution: [
      `$P(\\text{${coinRes === 'H' ? 'heads' : 'tails'}}) = ${fr(1, 2)}$`,
      `$P(\\text{${names[cols[j]]}}) = ${frSimp(parts[j], t)}$, because $${parts[j]}$ of the $${t}$ sections are ${names[cols[j]]}.`,
      `Multiply along the path: $${fr(1, 2)} \\times ${fr(pn, pd)} = ${frSimp(pn, 2 * pd)}$`,
      `The probability is $${fr(n, d)}$.`,
    ],
  };
}

function indepD2(rng: Rng, name: string): Out {
  const k = rng.pick(['two', 'two', 'tree', 'replace'] as const);
  if (k === 'tree') return indepTree(rng, name);
  if (k === 'replace') {
    const deck = rng.chance(0.5);
    let a: Ev;
    let b: Ev;
    let setup: string;
    if (deck) {
      a = cardEv(rng);
      b = retry(() => cardEv(rng), (x) => x.lab !== a.lab || rng.chance(0.3));
      setup = `${DECK} ${name} picks a card, puts it back, shuffles, and picks again.`;
    } else {
      const n = rng.pick([10, 12, 20]);
      const pick = () => rng.pick([
        { r: 'an even number', lab: '\\text{even}', f: n / 2 },
        { r: 'a multiple of $5$', lab: '\\text{multiple of } 5', f: n / 5 >= 1 ? Math.floor(n / 5) : 1 },
        { r: 'a multiple of $3$', lab: '\\text{multiple of } 3', f: Math.floor(n / 3) },
        { r: `a number greater than $${n - 4}$`, lab: `\\text{greater than } ${n - 4}`, f: 4 },
      ]);
      const ea = pick();
      const eb = pick();
      a = { act: '', res: `the card shows ${ea.r}`, lab: ea.lab, f: ea.f, t: n, why: `$${ea.f}$ of the $${n}$ cards fit.` };
      b = { act: '', res: `the card shows ${eb.r}`, lab: eb.lab, f: eb.f, t: n, why: `$${eb.f}$ of the $${n}$ cards fit.` };
      setup = `${name} has $${n}$ cards numbered $1$ to $${n}$. ${name} picks a card, puts it back, shuffles, and picks again.`;
    }
    const pr = productSteps(a, b, '\\text{first}', '\\text{second}');
    return {
      prompt: `${setup} What is the probability that the first ${a.res.replace('the card ', 'card ')} and the second ${b.res.replace('the card ', 'card ')}? ${LOWEST}`,
      parts: [fracPart(pr.n, pr.d)],
      hints: ['The first card goes back before the second pick, so the two picks are independent.', MULT],
      solution: [...pr.steps, `The probability is $${fr(pr.n, pr.d)}$.`],
    };
  }
  const makers = [colourSpinEv, bagEv, dieEv, coinEv];
  const [ma, mb] = rng.sample(makers.slice(0, 3), 2);
  const a = ma(rng);
  const b = rng.chance(0.3) ? coinEv(rng) : mb(rng);
  const pr = productSteps(a, b);
  return {
    prompt: `${name} ${a.act}. Then ${name} ${b.act}. What is the probability that ${a.res} and ${b.res}? ${LOWEST}`,
    parts: [fracPart(pr.n, pr.d)],
    hints: ['Find the probability of each event on its own.', MULT],
    solution: [...pr.steps, `The probability is $${fr(pr.n, pr.d)}$.`],
  };
}

const INDEPENDENT = [
  'Rolling a die and then flipping a coin',
  'Picking a card, putting it back, shuffling, and picking a second card',
  'Spinning a spinner twice',
  'Flipping a coin today and flipping it again tomorrow',
  'Rolling a red die and a blue die at the same time',
];
const DEPENDENT = [
  'Picking a card and then picking a second card without putting the first one back',
  'Drawing a name from a hat, keeping it out, and drawing a second name',
  'Taking a cookie from a jar and eating it, then taking a second cookie from the same jar',
  'Rain in Riverton this afternoon and Riverton’s outdoor soccer game this afternoon being cancelled',
  'Picking one student to be captain, then picking a different student from the same team to be assistant captain',
];

function indepWhich(rng: Rng): Out {
  const findIndep = rng.chance(0.5);
  const correct = findIndep ? rng.pick(INDEPENDENT) : rng.pick(DEPENDENT);
  const ds = findIndep ? rng.sample(DEPENDENT, 3) : rng.sample(INDEPENDENT, 3);
  return {
    prompt: findIndep ? 'Which pair of events is **independent**?' : 'Which pair of events is **not** independent?',
    parts: [{ answer: mc(rng, correct, ds) }],
    hints: ['Two events are independent when the result of the first does not change the probabilities of the second.', 'Watch for an item that is taken away and not put back, or one event that causes the other.'],
    solution: [
      'Events are independent when the first result does not change the probabilities for the second.',
      findIndep
        ? `In every other choice, the first event changes the second: something is not put back, or one event makes the other more likely.`
        : `In every other choice, the first event cannot change the second (things are put back, or the objects are separate).`,
      `The answer is: ${correct}.`,
    ],
    answerDisplay: correct,
  };
}

function indepD3(rng: Rng, name: string): Out {
  const k = rng.pick(['three', 'notB', 'which', 'reverse'] as const);
  if (k === 'which') return indepWhich(rng);
  if (k === 'three') {
    const a = coinEv(rng);
    const b = dieEv(rng);
    const c = rng.chance(0.5) ? colourSpinEv(rng) : numSpinEv(rng);
    const [an, ad] = lowest(a.f, a.t);
    const [bn, bd] = lowest(b.f, b.t);
    const [cn, cd] = lowest(c.f, c.t);
    const [n, d] = lowest(an * bn * cn, ad * bd * cd);
    return {
      prompt: `${name} ${a.act}, ${b.act} and ${c.act}. What is the probability that ${a.res}, ${b.res} and ${c.res}? ${LOWEST}`,
      parts: [fracPart(n, d)],
      hints: ['The three events are independent. Find each probability on its own.', 'Multiply all three probabilities: $P(A \\text{ and } B \\text{ and } C) = P(A) \\times P(B) \\times P(C)$.'],
      solution: [
        `$P(\\text{coin}) = ${fr(an, ad)}$`,
        `$P(\\text{die}) = ${frSimp(b.f, b.t)}$. ${b.why}`,
        `$P(\\text{spinner}) = ${frSimp(c.f, c.t)}$. ${c.why}`,
        `Multiply: $${fr(an, ad)} \\times ${fr(bn, bd)} \\times ${fr(cn, cd)} = ${frSimp(an * bn * cn, ad * bd * cd)}$`,
        `The probability is $${frLow(n, d)}$.`,
      ],
    };
  }
  if (k === 'notB') {
    const a = rng.chance(0.5) ? dieEv(rng) : coinEv(rng);
    const b = rng.chance(0.5) ? colourSpinEv(rng) : bagEv(rng);
    const [an, ad] = lowest(a.f, a.t);
    const [bn, bd] = lowest(b.t - b.f, b.t);
    const [n, d] = lowest(an * bn, ad * bd);
    const notRes = b.res.replace(/ lands on /, ' does **not** land on ').replace(/ is /, ' is **not** ');
    return {
      prompt: `${name} ${a.act}. Then ${name} ${b.act}. What is the probability that ${a.res} and ${notRes}? ${LOWEST}`,
      parts: [fracPart(n, d)],
      hints: ['First find the probability that the second event does **not** happen: $P(\\text{not } B) = 1 - P(B)$.', MULT],
      solution: [
        `$P(A) = ${frSimp(a.f, a.t)}$. ${a.why}`,
        `$P(B) = ${frSimp(b.f, b.t)}$, so $P(\\text{not } B) = 1 - ${frLow(b.f, b.t)} = ${frLow(b.t - b.f, b.t)}$`,
        `Multiply: $${fr(an, ad)} \\times ${fr(bn, bd)} = ${frSimp(an * bn, ad * bd)}$`,
        `The probability is $${frLow(n, d)}$.`,
      ],
    };
  }
  // reverse: P(A and B) and P(A) known, find P(B) and the number of sections.
  const t = rng.pick([5, 6, 8, 10]);
  const f = rng.int(1, t - 1);
  const col = rng.pick(COLS);
  const a = dieEv(rng);
  const [an, ad] = lowest(a.f, a.t);
  const [pn, pd] = lowest(f, t);
  const [n, d] = lowest(an * pn, ad * pd);
  return {
    prompt: `${name} rolls a six-sided die and spins a spinner with $${t}$ equal sections. The probability that ${a.res} **and** the spinner lands on ${col} is $${fr(n, d)}$. (a) What is the probability that the spinner lands on ${col}? Write it in lowest terms. (b) How many of the $${t}$ sections are ${col}?`,
    parts: [fracPart(f, t, `(a) $P(\\text{${col}})$`), numPart(f, { label: '(b)', suffix: 'sections' })],
    hints: [`${MULT} So $P(B) = P(A \\text{ and } B) \\div P(A)$.`, `Find $P(A)$ for the die first. ${a.why}`],
    solution: [
      `$P(\\text{die}) = ${frSimp(a.f, a.t)}$`,
      `$P(\\text{${col}}) = ${fr(n, d)} \\div ${fr(an, ad)} = ${fr(n, d)} \\times ${fr(ad, an)} = ${frSimp(n * ad, d * an)}$`,
      pd === t ? `The spinner has $${t}$ sections, so $${f}$ of them are ${col}.` : `As a fraction of $${t}$ sections: $${fr(pn, pd)} = ${fr(f, t)}$`,
      `(a) $${fr(pn, pd)}$. (b) $${f}$ sections are ${col}.`,
    ],
  };
}

const independentEvents = skill({
  id: 'm8-independent-events',
  name: 'Probability of independent events',
  description: 'Find the probability of two independent events with a table, a tree diagram or P(A and B) = P(A) × P(B).',
  outcomes: ['SP2'],
  lessonId: 'm8-10-2',
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return indepD1(rng, name);
    if (d === 2) return indepD2(rng, name);
    return indepD3(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 10.2 Problems with independent events
// ---------------------------------------------------------------------------

interface PctCtx {
  setup: (pa: number, pb: number, name: string) => string;
  A: string;
  B: string;
  notA: string;
  notB: string;
  /** Same probability for both events (two shots by one player). */
  same?: boolean;
  /** "weekends", "games" ... for expected counts. */
  many?: string;
  /** "it rains on at least one of the two days" */
  atLeast: string;
}

const PCT_CTX: PctCtx[] = [
  {
    setup: (pa, pb) => `The forecast for Pinewood gives ${aPct(pa)} chance of rain on Saturday and ${aPct(pb)} chance of rain on Sunday. Assume the weather on the two days is independent.`,
    A: 'it rains on Saturday', B: 'it rains on Sunday', notA: 'it does not rain on Saturday', notB: 'it does not rain on Sunday', atLeast: 'it rains on at least one of the two days',
  },
  {
    setup: (pa, _pb, name) => `${name} makes $${pa}\\%$ of free throws in basketball. ${name} takes two free throws. Assume the two shots are independent.`,
    A: 'the first shot goes in', B: 'the second shot goes in', notA: 'the first shot misses', notB: 'the second shot misses', same: true, many: 'pairs of free throws', atLeast: 'at least one of the two shots goes in',
  },
  {
    setup: (pa, _pb, name) => `A goalie, ${name}, stops $${pa}\\%$ of penalty shots. In a shootout, ${name} faces two penalty shots. Assume the shots are independent.`,
    A: 'the first shot is stopped', B: 'the second shot is stopped', notA: 'the first shot scores', notB: 'the second shot scores', same: true, many: 'shootouts', atLeast: 'at least one of the two shots is stopped',
  },
  {
    setup: (pa, pb) => `On the drive to school, the first traffic light is green $${pa}\\%$ of the time and the second traffic light is green $${pb}\\%$ of the time. The lights work independently.`,
    A: 'the first light is green', B: 'the second light is green', notA: 'the first light is not green', notB: 'the second light is not green', many: 'school days', atLeast: 'at least one of the two lights is green',
  },
  {
    setup: (pa, pb) => `The Grade 8 soccer team has ${aPct(pa)} chance of winning its game on Friday. The Grade 8 volleyball team has ${aPct(pb)} chance of winning its match on Friday. Assume the results are independent.`,
    A: 'the soccer team wins', B: 'the volleyball team wins', notA: 'the soccer team does not win', notB: 'the volleyball team does not win', many: 'Fridays', atLeast: 'at least one of the two teams wins',
  },
];

type Ask = 'both' | 'neither' | 'aNotB';

function pctItem(rng: Rng, d: Lvl, name: string): Out {
  const ctx = rng.pick(PCT_CTX);
  const unit = d === 1 ? 10 : 5;
  const pa = unit * rng.int(d === 1 ? 2 : 4, d === 1 ? 9 : 19);
  const pb = ctx.same ? pa : unit * rng.int(d === 1 ? 2 : 4, d === 1 ? 9 : 19);
  const ask: Ask = d === 1 ? 'both' : rng.pick(['both', 'neither', 'aNotB'] as const);
  const qa = ask === 'neither' ? 100 - pa : pa;
  const qb = ask === 'both' ? pb : 100 - pb;
  const ans = (qa * qb) / 100;
  const ea = ask === 'neither' ? ctx.notA : ctx.A;
  const eb = ask === 'both' ? ctx.B : ctx.notB;
  const steps: string[] = [];
  if (ask === 'neither') steps.push(`$P(\\text{not } A) = 100\\% - ${pa}\\% = ${qa}\\%$`);
  if (ask !== 'both') steps.push(`$P(\\text{not } B) = 100\\% - ${pb}\\% = ${qb}\\%$`);
  return {
    prompt: `${ctx.setup(pa, pb, name)} What is the probability that ${ea} and ${eb}? Write your answer as a percent.`,
    parts: [numPart(ans, { suffix: '%' })],
    hints: ['Write each percent as a decimal. For an event that does **not** happen, subtract from $100\\%$ first.', 'The events are independent, so multiply the two probabilities, then change back to a percent.'],
    solution: [
      ...steps,
      `Multiply as decimals: $${fmt(qa / 100, 2)} \\times ${fmt(qb / 100, 2)} = ${fmt(ans / 100, 4)}$`,
      `As a percent: $${fmt(ans / 100, 4)} \\times 100 = ${fmt(ans, 2)}\\%$`,
      `The probability that ${ea} and ${eb} is $${fmt(ans, 2)}\\%$.`,
    ],
  };
}

function fracProblem(rng: Rng, name: string): Out {
  const k = rng.pick(['carnival', 'cards', 'dice'] as const);
  if (k === 'cards') {
    const a = cardEv(rng);
    const b = cardEv(rng);
    const pr = productSteps(a, b, '\\text{first}', '\\text{second}');
    return {
      prompt: `${DECK} In a card game, ${name} picks a card, puts it back and shuffles, then picks again. What is the probability that the first card is ${a.res.replace('the card is ', '')} and the second card is ${b.res.replace('the card is ', '')}? ${LOWEST}`,
      parts: [fracPart(pr.n, pr.d)],
      hints: ['The card is put back, so the picks are independent.', MULT],
      solution: [...pr.steps, `The probability is $${fr(pr.n, pr.d)}$.`],
    };
  }
  if (k === 'dice') {
    const a = dieEv(rng, 'a red die');
    const b = dieEv(rng, 'a blue die');
    const pr = productSteps(a, b, '\\text{red}', '\\text{blue}');
    const ra = a.res.replace('the die', 'the red die');
    const rb = b.res.replace('the die', 'the blue die');
    return {
      prompt: `In a board game, ${name} rolls a red die and a blue die. ${name} gets a bonus turn if ${ra} and ${rb}. What is the probability of a bonus turn? ${LOWEST}`,
      parts: [fracPart(pr.n, pr.d)],
      hints: ['The two dice do not affect each other.', MULT],
      solution: [...pr.steps, `The probability of a bonus turn is $${fr(pr.n, pr.d)}$.`],
    };
  }
  const secs = rng.pick([4, 5, 8, 10]);
  const prize = rng.int(1, 2);
  const a: Ev = { act: '', res: '', lab: '', f: prize, t: secs, why: `$${prize}$ of the $${secs}$ equal sections ${prize === 1 ? 'says' : 'say'} “Prize”.` };
  const b = dieEv(rng);
  const pr = productSteps(a, b, '\\text{prize}', '\\text{die}');
  return {
    prompt: `At a school carnival, players spin a wheel with $${secs}$ equal sections, where $${prize}$ ${prize === 1 ? 'says' : 'say'} “Prize”, and then roll a six-sided die. A player wins the big prize if the wheel shows “Prize” and ${b.res}. What is the probability of winning the big prize? ${LOWEST}`,
    parts: [fracPart(pr.n, pr.d)],
    hints: ['Find the probability for the wheel and for the die separately.', MULT],
    solution: [...pr.steps, `The probability of winning the big prize is $${fr(pr.n, pr.d)}$.`],
  };
}

function probD3(rng: Rng, name: string): Out {
  const k = rng.pick(['atLeast', 'expected', 'carnivalCount'] as const);
  if (k === 'carnivalCount') {
    const secs = rng.pick([4, 5, 8, 10]);
    const b = dieEv(rng);
    const [n, d] = lowest(b.f, secs * b.t);
    const players = d * rng.pick([5, 10, 20]);
    const exp = (n * players) / d;
    return {
      prompt: `At a school carnival, players spin a wheel with $${secs}$ equal sections, where one says “Prize”, and then roll a six-sided die. A player wins the big prize if the wheel shows “Prize” and ${b.res}. (a) What is the probability of winning the big prize? Write it in lowest terms. (b) About how many big prizes should the carnival expect to give out if $${players}$ people play?`,
      parts: [fracPart(n, d, '(a) Probability'), numPart(exp, { label: '(b) Expected prizes', suffix: 'prizes' })],
      hints: [MULT, 'Expected number $=$ probability $\\times$ number of players.'],
      solution: [
        `$P(\\text{Prize}) = ${fr(1, secs)}$ and $P(\\text{die}) = ${frSimp(b.f, b.t)}$`,
        `$P(\\text{big prize}) = ${fr(1, secs)} \\times ${frLow(b.f, b.t)} = ${frSimp(b.f, secs * b.t)}$`,
        `Expected prizes: $${fr(n, d)} \\times ${players} = ${exp}$`,
        `(a) $${fr(n, d)}$. (b) About $${exp}$ big prizes.`,
      ],
    };
  }
  const ctx = rng.pick(PCT_CTX);
  const pa = 10 * rng.int(2, 9);
  const pb = ctx.same ? pa : 10 * rng.int(2, 9);
  if (k === 'atLeast') {
    const neither = ((100 - pa) * (100 - pb)) / 100;
    const ans = 100 - neither;
    const what = ctx.atLeast;
    return {
      prompt: `${ctx.setup(pa, pb, name)} What is the probability that ${what}? Write your answer as a percent.`,
      parts: [numPart(ans, { suffix: '%' })],
      hints: ['“At least one” is the opposite of “neither”. Find the probability of neither first.', '$P(\\text{at least one}) = 100\\% - P(\\text{neither})$'],
      solution: [
        `$P(\\text{not } A) = ${100 - pa}\\%$ and $P(\\text{not } B) = ${100 - pb}\\%$`,
        `$P(\\text{neither}) = ${fmt((100 - pa) / 100, 2)} \\times ${fmt((100 - pb) / 100, 2)} = ${fmt(neither / 100, 4)} = ${fmt(neither, 2)}\\%$`,
        `$P(\\text{at least one}) = 100\\% - ${fmt(neither, 2)}\\% = ${fmt(ans, 2)}\\%$`,
        `The probability is $${fmt(ans, 2)}\\%$.`,
      ],
    };
  }
  // expected number of times both happen
  const both = (pa * pb) / 100;
  const many = ctx.many ?? 'weekends';
  const n = [25, 50, 100, 200].find((x) => Number.isInteger((both * x) / 100)) ?? 100;
  const exp = (both * n) / 100;
  return {
    prompt: `${ctx.setup(pa, pb, name)} (a) What is the probability that ${ctx.A} and ${ctx.B}? Write it as a percent. (b) Over $${n}$ ${many} like this, about how many times should both happen?`,
    parts: [numPart(both, { label: '(a)', suffix: '%' }), numPart(exp, { label: '(b)', suffix: 'times' })],
    hints: [MULT, 'Expected number $=$ probability $\\times$ number of times.'],
    solution: [
      `$P(\\text{both}) = ${fmt(pa / 100, 2)} \\times ${fmt(pb / 100, 2)} = ${fmt(both / 100, 4)} = ${fmt(both, 2)}\\%$`,
      `Expected: $${fmt(both / 100, 4)} \\times ${n} = ${fmt(exp, 2)}$`,
      `(a) $${fmt(both, 2)}\\%$. (b) About $${fmt(exp, 2)}$ times.`,
    ],
  };
}

const independentProblems = skill({
  id: 'm8-independent-problems',
  name: 'Problems with independent events',
  description: 'Solve problems about independent events with spinners, dice, coins, cards that are put back, weather and sports.',
  outcomes: ['SP2'],
  lessonId: 'm8-10-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return rng.chance(0.6) ? pctItem(rng, 1, name) : fracProblem(rng, name);
    if (d === 2) return rng.chance(0.6) ? pctItem(rng, 2, name) : fracProblem(rng, name);
    return probD3(rng, name);
  },
});

export const DATAPROB_SKILLS: SkillDef[] = [chooseGraph, misleadingGraph, independentEvents, independentProblems];
