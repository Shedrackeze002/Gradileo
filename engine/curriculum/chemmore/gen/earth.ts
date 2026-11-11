/**
 * More Chemistry Topics, Unit 4: the Earth's atmosphere and resources. The gases of the air and
 * how the early atmosphere changed, greenhouse gases and the pollutants from burning fuels,
 * potable water and waste water, and life cycle assessments with reducing, reusing and recycling.
 * Every figure a calculation needs (a percentage of the air, an emission per kilometre, the energy
 * to make a product) is stated inside its question, and none is given as a current official value.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef, TableFigure } from '../../../types.ts';
import { cap, letters, q } from './common.ts';

const L = (n: number) => `cx-4-${n}`;
/** A volume in maths: $50\ \text{cm}^3$, from the unit as text (cm³). */
const vol = (v: string | number, unit: string) => `$${v}\\ \\text{${unit.replace('³', '')}}^3$`;

/** A question from a bank: what is asked, the right answer, three wrong ones, and why. */
interface BankItem {
  ask: string;
  right: string;
  wrong: string[];
  sol: string;
}
const fromBank = (rng: Rng, items: BankItem[], hints: string[]): GenOutput => {
  const item = rng.pick(items);
  return { prompt: item.ask, parts: [part(mc(rng, item.right, item.wrong))], hints, solution: [item.sol] };
};

// ---------------------------------------------------------------------------- lesson 4.1: the atmosphere

/** The air as these questions state it: about four-fifths nitrogen and one-fifth oxygen. */
const AIR_KEY = 'Dry air is about 78% nitrogen and 21% oxygen by volume. The remaining 1% is mostly argon, with a little carbon dioxide.';

function composition(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which gas makes up about four-fifths of the air today?', right: 'Nitrogen', wrong: ['Oxygen', 'Carbon dioxide', 'Argon'], sol: 'About 78% of dry air, close to four-fifths, is nitrogen.' },
        { ask: 'About what fraction of the air today is oxygen?', right: 'About one-fifth', wrong: ['About four-fifths', 'About one-half', 'About one-hundredth'], sol: 'About 21% of dry air is oxygen, which is close to one-fifth.' },
        { ask: 'Which of these gases makes up **less than 1%** of dry air today?', right: 'Carbon dioxide', wrong: ['Nitrogen', 'Oxygen', 'Nitrogen and oxygen together'], sol: 'Nitrogen is about 78% of dry air and oxygen about 21%. Carbon dioxide is only about 0.04%.' },
        { ask: 'Apart from nitrogen and oxygen, which gas is the most plentiful in dry air?', right: 'Argon, a noble gas', wrong: ['Carbon dioxide', 'Hydrogen', 'Methane'], sol: 'Almost all of the remaining 1% of dry air is argon, a noble gas. Carbon dioxide is far less plentiful.' },
        { ask: 'Which list gives the gases of dry air in order, from the most plentiful to the least?', right: 'Nitrogen, oxygen, argon, carbon dioxide', wrong: ['Oxygen, nitrogen, carbon dioxide, argon', 'Nitrogen, carbon dioxide, oxygen, argon', 'Oxygen, nitrogen, argon, carbon dioxide'], sol: 'Nitrogen is about 78%, oxygen about 21%, argon nearly 1% and carbon dioxide about 0.04%.' },
      ],
      ['The air is mostly two gases: one is about four-fifths of it, and the other about one-fifth.', 'The gas we breathe in to stay alive is the smaller of the two.'],
    );
  }
  if (d === 2) {
    // A volume of one gas in a volume of air.
    const gas = rng.pick([
      { name: 'oxygen', pc: 21 },
      { name: 'nitrogen', pc: 78 },
    ]);
    const volume = rng.pick([50, 100, 200, 250, 400, 500, 800]);
    const unit = rng.pick(['cm³', 'dm³', 'm³']);
    const answer = (volume * gas.pc) / 100;
    return {
      prompt: `${AIR_KEY} What volume of ${gas.name} is there in ${vol(volume, unit)} of dry air?`,
      parts: [numPart(answer, { decimals: 1, suffix: unit })],
      hints: [`Find ${gas.pc}% of the volume of air.`, `${gas.pc}% means ${gas.pc} out of every 100.`],
      solution: [`Volume of ${gas.name} $= ${gas.pc}\\%$ of $${volume} = \\dfrac{${gas.pc}}{100} \\times ${volume} = ${fmt(answer, 1)}\\ \\text{${unit.replace('³', '')}}^3$.`],
      calculator: true,
    };
  }
  // Heating copper in a measured volume of air removes the oxygen.
  const start = rng.pick([50, 80, 100, 120, 150, 200]);
  const pc = rng.pick([19, 20, 21]);
  const used = (start * pc) / 100;
  const end = start - used;
  if (rng.chance(0.5)) {
    return {
      prompt: `Air is passed back and forth over hot copper until its volume stops changing. The copper reacts with the oxygen and with nothing else. The volume of gas falls from ${vol(start, 'cm³')} to ${vol(fmt(end, 1), 'cm³')}, both measured at room temperature. What percentage of this air was oxygen? Give your answer to the nearest whole number.`,
      parts: [numPart(pc, { decimals: 0, suffix: '%' })],
      hints: ['The fall in volume is the volume of oxygen that reacted.', 'Percentage of oxygen = (volume of oxygen ÷ starting volume of air) × 100.'],
      solution: [`Volume of oxygen $= ${start} - ${fmt(end, 1)} = ${fmt(used, 1)}\\ \\text{cm}^3$.`, `Percentage of oxygen $= \\dfrac{${fmt(used, 1)}}{${start}} \\times 100 = ${pc}\\%$.`],
      calculator: true,
    };
  }
  return {
    prompt: `${vol(start, 'cm³')} of air is passed back and forth over hot copper until its volume stops changing. The copper reacts with the oxygen and with nothing else. If ${pc}% of this air is oxygen, what volume of gas is left, measured at room temperature?`,
    parts: [numPart(end, { decimals: 1, suffix: 'cm³' })],
    hints: ['First find the volume of oxygen in the air.', 'The oxygen is removed. Subtract its volume from the starting volume.'],
    solution: [`Volume of oxygen $= ${pc}\\%$ of $${start} = ${fmt(used, 1)}\\ \\text{cm}^3$.`, `Volume left $= ${start} - ${fmt(used, 1)} = ${fmt(end, 1)}\\ \\text{cm}^3$.`],
    calculator: true,
  };
}

function atmosphereChange(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['The early atmosphere came from volcanoes: mostly carbon dioxide, with water vapour and nitrogen.', 'Oceans, then algae and plants, removed carbon dioxide. Photosynthesis added oxygen.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'According to the most widely accepted theory, where did the gases of the Earth’s early atmosphere come from?', right: 'From volcanoes, which were very active on the young Earth', wrong: ['From green plants, which made them by photosynthesis', 'From the oceans, which gave them off as they cooled', 'From the burning of fossil fuels'], sol: 'Intense volcanic activity released the gases that formed the early atmosphere.' },
        { ask: 'Which gas is thought to have made up most of the Earth’s early atmosphere?', right: 'Carbon dioxide', wrong: ['Oxygen', 'Nitrogen', 'Argon'], sol: 'The early atmosphere is thought to have been mostly carbon dioxide, with little or no oxygen, like the atmospheres of Mars and Venus today.' },
        { ask: 'How did the oceans form?', right: 'Water vapour in the atmosphere condensed as the Earth cooled', wrong: ['Oxygen and hydrogen in the atmosphere reacted when lightning struck', 'Ice from the poles melted as the Earth warmed', 'Carbon dioxide in the atmosphere dissolved and turned into water'], sol: 'Volcanoes released water vapour. As the Earth cooled, the vapour condensed and fell as rain, which collected to form the oceans.' },
        { ask: 'Which process put oxygen into the atmosphere?', right: 'Photosynthesis by algae and plants', wrong: ['Respiration by animals', 'The eruption of volcanoes', 'The burning of fossil fuels'], sol: 'Algae, and later plants, take in carbon dioxide and give out oxygen when they photosynthesise.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Which word equation shows photosynthesis?', right: 'carbon dioxide + water → glucose + oxygen', wrong: ['glucose + oxygen → carbon dioxide + water', 'carbon dioxide + oxygen → glucose + water', 'glucose + water → carbon dioxide + oxygen'], sol: 'In photosynthesis, carbon dioxide and water are turned into glucose and oxygen, using the energy of light.' },
        { ask: 'Carbon dioxide dissolved in the early oceans. What happened to much of it next?', right: 'It formed carbonates, which settled as sediments and became rocks such as limestone', wrong: ['It reacted with the water to form oxygen, which bubbled out', 'It froze and sank to the sea bed as solid carbon dioxide', 'It was changed into nitrogen by bacteria in the water'], sol: 'Dissolved carbon dioxide formed carbonates that were precipitated as sediments, and sea creatures used them to build shells. The sediments became sedimentary rocks such as limestone.' },
        { ask: 'How did the formation of coal remove carbon dioxide from the atmosphere?', right: 'Plants took in carbon dioxide, and their remains were buried and compressed before they could decay', wrong: ['Coal absorbs carbon dioxide from the air as it lies underground', 'Volcanoes turned carbon dioxide into coal as they erupted', 'Carbon dioxide dissolved in the sea and settled as coal'], sol: 'Plants took in carbon dioxide by photosynthesis. When they died in swamps and were buried without decaying, the carbon stayed locked up in the coal that formed.' },
        { ask: 'Crude oil and natural gas were formed from which living things?', right: 'Plankton, tiny sea creatures and plants, buried in mud on the sea bed', wrong: ['Trees that fell in swamps and were buried', 'Shells and skeletons of sea creatures', 'Bacteria living inside volcanoes'], sol: 'Crude oil and natural gas formed from plankton deposited in mud on the sea bed. Coal formed from trees, and limestone from shells.' },
        { ask: 'Why are scientists less certain about the early atmosphere than about the atmosphere today?', right: 'It formed billions of years ago, so there is little direct evidence', wrong: ['The gases in it have not yet been discovered', 'It was exactly the same as the atmosphere today', 'Nobody has yet thought of a theory to explain it'], sol: 'The early atmosphere formed about 4.6 billion years ago. Nobody was there to measure it, so the evidence is limited and theories have changed over time.' },
      ],
      hints,
    );
  }
  if (rng.chance(0.5)) {
    // Put the events in order.
    const events = ['Volcanoes release carbon dioxide, water vapour and nitrogen', 'Water vapour condenses to form the oceans', 'Algae begin to photosynthesise and oxygen builds up', 'Animals evolve that breathe the oxygen'];
    const pair = rng.pick([
      [0, 1],
      [1, 2],
      [2, 3],
      [0, 2],
    ]);
    const [a, b] = rng.chance(0.5) ? pair : [pair[1], pair[0]];
    const first = Math.min(a, b);
    const answers = [`“${events[a]}”`, `“${events[b]}”`];
    return {
      prompt: `Two events in the history of the atmosphere are: “${events[a]}” and “${events[b]}”. Which happened **first**?`,
      parts: [part(fixedChoice(answers, a === first ? 0 : 1))],
      hints: ['The order is: volcanoes, oceans, photosynthesis, animals.', 'Each event depends on the one before it.'],
      solution: [`The order was: ${events.map((e) => e[0].toLowerCase() + e.slice(1)).join('; then ')}. So “${events[first]}” came first.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Over billions of years, how did the amounts of carbon dioxide and oxygen in the atmosphere change?', right: 'Carbon dioxide fell and oxygen rose', wrong: ['Carbon dioxide rose and oxygen fell', 'Both carbon dioxide and oxygen rose', 'Both carbon dioxide and oxygen fell'], sol: 'Carbon dioxide dissolved in the oceans, was locked up in rocks and fossil fuels, and was used in photosynthesis, so it fell. Photosynthesis released oxygen, so oxygen rose.' },
      { ask: 'Which of these did **not** remove carbon dioxide from the early atmosphere?', right: 'The eruption of volcanoes', wrong: ['Photosynthesis by algae and plants', 'Dissolving in the oceans', 'The formation of limestone and fossil fuels'], sol: 'Volcanoes release carbon dioxide. Photosynthesis, dissolving in the oceans, and the formation of sedimentary rocks and fossil fuels all removed it.' },
      { ask: 'Limestone is mostly calcium carbonate. Why does it count as a store of carbon dioxide from the early atmosphere?', right: 'Its carbonate formed from carbon dioxide that had dissolved in the oceans', wrong: ['It soaks up carbon dioxide from the air like a sponge', 'It was made when volcanoes released carbon dioxide', 'It is made of the remains of ancient trees'], sol: 'Carbon dioxide dissolved in the oceans and formed carbonates, in sediments and in shells. These became limestone, so the carbon is locked in the rock.' },
      { ask: 'The atmospheres of Mars and Venus today are mostly carbon dioxide. Why does this support the theory about the Earth’s early atmosphere?', right: 'They have volcanoes but no photosynthesis, so they show what an atmosphere is like without living things', wrong: ['They prove that plants once lived on Mars and Venus', 'They show that carbon dioxide always turns into oxygen in time', 'They are the same distance from the Sun as the Earth'], sol: 'Mars and Venus have had volcanic activity but no life to remove carbon dioxide and release oxygen, so their atmospheres may be like the Earth’s before life evolved.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 4.2: greenhouse gases and pollutants

function greenhouse(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Greenhouse gases absorb radiation given out by the Earth and keep the heat in.', 'Carbon dioxide, methane and water vapour are the main greenhouse gases.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which of these is a greenhouse gas?', right: 'Methane', wrong: ['Nitrogen', 'Oxygen', 'Argon'], sol: 'Methane, carbon dioxide and water vapour are greenhouse gases. Nitrogen, oxygen and argon are not.' },
        { ask: 'What do greenhouse gases in the atmosphere do?', right: 'They absorb radiation given out by the Earth, which keeps the Earth warm', wrong: ['They reflect all of the Sun’s radiation back into space', 'They make holes in the atmosphere that let heat in', 'They react with oxygen and give out heat'], sol: 'The warm Earth gives out long-wavelength radiation. Greenhouse gases absorb it, so less heat escapes into space.' },
        { ask: 'Which human activity adds the most **carbon dioxide** to the atmosphere?', right: 'Burning fossil fuels', wrong: ['Growing rice in flooded fields', 'Keeping cattle', 'Planting forests'], sol: 'Burning coal, oil and gas releases carbon dioxide. Rice fields and cattle release methane, and growing forests take carbon dioxide in.' },
        { ask: 'Which human activity adds **methane** to the atmosphere?', right: 'Keeping cattle and growing rice', wrong: ['Using wind turbines', 'Planting trees', 'Using solar panels'], sol: 'Cattle give off methane as they digest their food, and bacteria in flooded rice fields release it too.' },
        { ask: 'What is a carbon footprint?', right: 'The total amount of greenhouse gases given out over the life of a product, service or event', wrong: ['The mass of carbon in a person’s body', 'The area of forest needed to grow a person’s food', 'The amount of coal left in the ground'], sol: 'A carbon footprint is the total amount of carbon dioxide and other greenhouse gases emitted over the full life cycle of a product, service or event.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    // A carbon footprint from a stated emission factor.
    const trip = rng.pick([
      { how: 'A petrol car', per: rng.pick([120, 150, 180, 200]), unit: 'km', what: 'a journey of' },
      { how: 'A diesel bus, for each passenger,', per: rng.pick([80, 90, 100, 110]), unit: 'km', what: 'a journey of' },
      { how: 'A train, for each passenger,', per: rng.pick([30, 40, 50, 60]), unit: 'km', what: 'a journey of' },
    ]);
    const km = rng.pick([15, 20, 25, 40, 50, 80, 120, 250]);
    const grams = trip.per * km;
    return {
      prompt: `${trip.how} gives out ${q(trip.per, 'g')} of carbon dioxide for each kilometre it travels. How much carbon dioxide does it give out on ${trip.what} ${q(km, 'km')}? Give your answer in kilograms.`,
      parts: [numPart(grams / 1000, { decimals: 2, suffix: 'kg' })],
      hints: ['Multiply the mass given out in one kilometre by the number of kilometres.', 'There are 1000 g in 1 kg.'],
      solution: [`Mass of carbon dioxide $= ${trip.per} \\times ${km} = ${fmt(grams)}\\ \\text{g}$.`, `In kilograms: $${fmt(grams)} \\div 1000 = ${fmt(grams / 1000, 2)}\\ \\text{kg}$.`],
      calculator: true,
    };
  }
  if (rng.chance(0.45)) {
    // Saving from switching between two stated emission factors.
    const car = rng.pick([150, 160, 180, 200]);
    const other = rng.pick([40, 50, 60, 80]);
    const km = rng.pick([10, 12, 15, 20, 25]);
    const days = rng.pick([100, 150, 190, 200]);
    const saving = ((car - other) * km * 2 * days) / 1000;
    return {
      prompt: `A car gives out ${q(car, 'g')} of carbon dioxide for each kilometre, and a train gives out ${q(other, 'g')} per kilometre for each passenger. A worker lives ${q(km, 'km')} from work and travels there and back on ${days} days a year. How much less carbon dioxide does the worker’s travel give out in a year by train than by car? Give your answer in kilograms.`,
      parts: [numPart(saving, { decimals: 1, suffix: 'kg' })],
      hints: ['Find the distance travelled in a year: there and back, on every working day.', 'The saving for each kilometre is the difference between the two figures.'],
      solution: [
        `Distance in a year $= ${km} \\times 2 \\times ${days} = ${fmt(km * 2 * days)}\\ \\text{km}$.`,
        `Saving for each kilometre $= ${car} - ${other} = ${car - other}\\ \\text{g}$.`,
        `Saving in a year $= ${car - other} \\times ${fmt(km * 2 * days)} = ${fmt((car - other) * km * 2 * days)}\\ \\text{g} = ${fmt(saving, 1)}\\ \\text{kg}$.`,
      ],
      calculator: true,
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Which is an effect that scientists expect from global climate change?', right: 'Sea levels rise as ice melts and the oceans warm and expand', wrong: ['The amount of oxygen in the air falls to zero', 'Earthquakes become more frequent', 'The Earth moves closer to the Sun'], sol: 'Rising temperatures melt ice and make sea water expand, so sea levels rise. Storms, droughts and changes to where crops grow are other expected effects.' },
      { ask: 'Why is it hard to make exact predictions about the Earth’s climate?', right: 'The climate depends on so many things that it is very difficult to model', wrong: ['Nobody has measured the temperature of the Earth', 'Carbon dioxide cannot be detected in the air', 'Scientists disagree about whether carbon dioxide is a greenhouse gas'], sol: 'The climate system is very complicated, so models have to simplify it. That is why predictions come with uncertainty, even though the evidence that human activity is warming the Earth has been checked by many scientists.' },
      { ask: 'Which action would **reduce** a household’s carbon footprint?', right: 'Insulating the loft, so that less fuel is burned for heating', wrong: ['Leaving lights on in empty rooms', 'Replacing a short walk with a car journey', 'Throwing away food and buying more'], sol: 'Insulation cuts the fuel burned to heat the home, so less carbon dioxide is given out. The other actions all use more energy or resources.' },
      { ask: 'Carbon capture and storage is one way to cut emissions from a power station. What does it do?', right: 'It collects the carbon dioxide and stores it underground, so it does not reach the atmosphere', wrong: ['It turns the carbon dioxide into oxygen by burning it again', 'It releases the carbon dioxide at night, when it does less harm', 'It mixes the carbon dioxide with air, so that it is diluted'], sol: 'In carbon capture and storage, carbon dioxide is collected from the waste gases and pumped into rocks deep underground.' },
      { ask: 'Why do many people find it hard to reduce their carbon footprint?', right: 'Low-carbon choices can cost more or be less convenient, and people may not know enough about them', wrong: ['It is against the law to use less energy', 'Carbon footprints cannot be changed by anything a person does', 'Using less energy gives out more carbon dioxide'], sol: 'Changing how we travel, heat our homes and what we buy can be expensive or inconvenient, and governments and individuals may be unwilling or lack information.' },
    ],
    hints,
  );
}

/** A pollutant from burning fuels: how it forms and the harm it does. */
const POLLUTANTS = [
  { name: 'carbon monoxide', forms: 'a fuel burns without enough oxygen', harm: 'it is a toxic gas that stops the blood carrying oxygen', short: 'A toxic gas that stops the blood carrying oxygen' },
  { name: 'soot (particles of carbon)', forms: 'a fuel burns without enough oxygen', harm: 'the particles cause breathing problems and global dimming', short: 'Particles that cause breathing problems and global dimming' },
  { name: 'sulfur dioxide', forms: 'a fuel that contains sulfur impurities burns', harm: 'it causes acid rain and breathing problems', short: 'A gas that causes acid rain and breathing problems' },
  { name: 'oxides of nitrogen', forms: 'nitrogen and oxygen from the air react at the high temperature inside an engine', harm: 'they cause acid rain and breathing problems', short: 'Gases, made from the air itself, that cause acid rain' },
];

function pollutants(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Too little oxygen gives carbon monoxide and soot. Sulfur in the fuel gives sulfur dioxide.', 'Oxides of nitrogen come from the air itself, at the high temperature of an engine.'];
  if (d === 1) {
    const p = rng.pick(POLLUTANTS);
    if (rng.chance(0.5)) {
      const forms = [...new Set(POLLUTANTS.map((x) => x.forms))];
      return {
        prompt: `When is **${p.name}** made as a fuel is burned?`,
        parts: [part(mc(rng, `When ${p.forms}`, [...forms.filter((f) => f !== p.forms).map((f) => `When ${f}`), 'When a fuel burns in plenty of oxygen and contains no impurities']))],
        hints,
        solution: [`${cap(p.name)} forms when ${p.forms}.`],
      };
    }
    const others = POLLUTANTS.filter((x) => x.name !== p.name);
    return {
      prompt: `What harm does **${p.name}** do?`,
      parts: [part(mc(rng, p.short, [...rng.sample(others.filter((x) => x.short !== p.short), 2).map((x) => x.short), 'A greenhouse gas that makes the air easier to breathe']))],
      hints: ['Carbon monoxide is toxic. Soot is a solid. Sulfur dioxide and oxides of nitrogen make acid rain.', 'Think about whether the pollutant is a gas or a solid.'],
      solution: [`${cap(p.name)}: ${p.harm}.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Methane burns in a plentiful supply of air. What are the products?', right: 'Carbon dioxide and water', wrong: ['Carbon monoxide and water', 'Carbon and hydrogen', 'Carbon dioxide and hydrogen'], sol: 'With plenty of oxygen, a hydrocarbon burns completely: the carbon becomes carbon dioxide and the hydrogen becomes water.' },
        { ask: 'A gas boiler is used in a room with poor ventilation. Which dangerous gas may it make?', right: 'Carbon monoxide', wrong: ['Sulfur dioxide', 'Nitrogen', 'Hydrogen'], sol: 'With too little oxygen the fuel burns incompletely, and some of its carbon becomes carbon monoxide.' },
        { ask: 'Why is carbon monoxide especially dangerous in a home?', right: 'It is colourless and has no smell, so it is not noticed', wrong: ['It is a brown gas that stains the walls', 'It has a strong smell that causes headaches', 'It makes fires burn more fiercely'], sol: 'Carbon monoxide is toxic, and it has no colour and no smell, so people can breathe it in without knowing. A detector is needed to find it.' },
        { ask: 'Petrol contains no nitrogen. Where does the nitrogen in the oxides of nitrogen from a car engine come from?', right: 'From the air drawn into the engine', wrong: ['From the water vapour in the exhaust', 'From the metal of the engine', 'From the carbon dioxide made by burning'], sol: 'Air is about 78% nitrogen. At the high temperature inside an engine, nitrogen and oxygen from the air react to make oxides of nitrogen.' },
        { ask: 'How does sulfur dioxide in the air damage lakes and forests?', right: 'It dissolves in rain water and makes acid rain', wrong: ['It blocks sunlight and causes global dimming', 'It stops the blood of fish carrying oxygen', 'It traps heat and warms the lakes'], sol: 'Sulfur dioxide dissolves in the water of clouds and reacts to form acids, which fall as acid rain. Acid rain harms trees and the living things in lakes.' },
        { ask: 'What is global dimming?', right: 'A fall in the amount of sunlight reaching the ground, caused by particles in the air', wrong: ['A rise in the Earth’s temperature, caused by greenhouse gases', 'A fall in the amount of oxygen in the air, caused by burning', 'A rise in sea level, caused by melting ice'], sol: 'Particles of soot in the air reflect sunlight back into space, so less of it reaches the ground. This is called global dimming.' },
      ],
      hints,
    );
  }
  if (rng.chance(0.5)) {
    // Fuels compared in a table.
    const names = letters(rng, 3);
    const sulfur = rng.shuffle([0, rng.pick([0.1, 0.2]), rng.pick([1.5, 2.5, 3])]);
    const figure: TableFigure = { type: 'table', headers: ['Fuel', 'Sulfur in the fuel (% by mass)'], rows: names.map((n, i) => [n, fmt(sulfur[i])]) };
    const most = rng.chance(0.5);
    const target = sulfur.indexOf(most ? Math.max(...sulfur) : Math.min(...sulfur));
    return {
      prompt: `The table shows how much sulfur three fuels contain. The same mass of each fuel is burned. Which fuel causes the **${most ? 'most' : 'least'}** acid rain from sulfur dioxide?`,
      figure,
      parts: [part(fixedChoice(names.map((n) => `Fuel ${n}`), target))],
      hints: ['Sulfur in a fuel burns to sulfur dioxide.', 'The more sulfur in the fuel, the more sulfur dioxide the same mass of fuel gives out.'],
      solution: [`The sulfur in a fuel burns to sulfur dioxide, which makes acid rain. Fuel ${names[target]} contains the ${most ? 'most' : 'least'} sulfur, so it causes the ${most ? 'most' : 'least'} acid rain.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'A power station burns coal that contains sulfur. Which change would cut the acid rain it causes?', right: 'Removing the sulfur dioxide from the waste gases before they leave the chimney', wrong: ['Burning the coal with less air', 'Building a taller chimney', 'Burning the coal at a higher temperature'], sol: 'The sulfur dioxide can be removed from the waste gases by reacting it with a base such as calcium oxide. A taller chimney only moves the pollution further away.' },
      { ask: 'A fuel burns with a yellow, smoky flame and leaves a black deposit. What does this show?', right: 'The fuel is burning incompletely, because it has too little oxygen', wrong: ['The fuel contains a large amount of sulfur', 'The fuel is burning completely, in plenty of oxygen', 'The fuel contains nitrogen from the air'], sol: 'The black deposit is soot, particles of carbon. Soot forms in incomplete combustion, when there is not enough oxygen to turn all of the carbon into carbon dioxide.' },
      { ask: 'Which pollutant would still be made by an engine that burns pure hydrogen in air?', right: 'Oxides of nitrogen', wrong: ['Carbon monoxide', 'Sulfur dioxide', 'Soot'], sol: 'Hydrogen contains no carbon and no sulfur, so no carbon monoxide, soot or sulfur dioxide can form. But the hot engine still makes nitrogen and oxygen from the air react.' },
      { ask: 'Why does incomplete combustion waste fuel as well as causing pollution?', right: 'Less energy is given out than when the same fuel burns completely', wrong: ['More oxygen is used than when the fuel burns completely', 'The fuel turns into sulfur dioxide', 'The fuel burns at too high a temperature'], sol: 'When carbon ends up as carbon monoxide or soot it has not been fully oxidised, so less energy is released than in complete combustion.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 4.3: potable water

function potableWater(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Potable water is safe to drink. It is not pure: it still has dissolved substances in it.', 'Fresh water is filtered, then sterilised. Salty water has to be desalinated.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What does **potable** water mean?', right: 'Water that is safe to drink', wrong: ['Water that contains nothing but water molecules', 'Water that has been taken from the sea', 'Water that can be carried in a bottle'], sol: 'Potable water is water that is safe to drink. It contains low levels of dissolved salts and microbes.' },
        { ask: 'Why is potable water **not** pure, in the chemist’s meaning of the word?', right: 'It contains dissolved substances as well as water', wrong: ['It contains harmful microbes', 'It has been treated at a water works', 'It has not been boiled'], sol: 'A pure substance is a single element or compound. Potable water has small amounts of dissolved salts in it, so it is a mixture.' },
        { ask: 'In treating fresh water, what does **filtering** remove?', right: 'Solid particles, such as grit and leaves', wrong: ['Dissolved salts', 'Microbes', 'The taste'], sol: 'The water is passed through filter beds, which hold back insoluble solids.' },
        { ask: 'In treating fresh water, why is the water **sterilised**?', right: 'To kill harmful microbes', wrong: ['To remove dissolved salts', 'To remove solid particles', 'To make the water pure'], sol: 'Sterilising kills microbes that could cause disease. Chlorine, ozone or ultraviolet light is used.' },
        { ask: 'Which of these is used to sterilise drinking water?', right: 'Chlorine', wrong: ['Nitrogen', 'Carbon dioxide', 'Sodium chloride'], sol: 'Chlorine, ozone and ultraviolet light are all used to sterilise water.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'A country has plenty of rain, rivers and lakes. How is its potable water most likely made?', right: 'By choosing a source of fresh water, filtering it and sterilising it', wrong: ['By distilling sea water', 'By reverse osmosis of sea water', 'By collecting rain and drinking it untreated'], sol: 'Where fresh water is plentiful, it is taken from a suitable source, passed through filter beds and sterilised. This needs far less energy than desalination.' },
        { ask: 'What is **desalination**?', right: 'Removing dissolved salts from salty water', wrong: ['Adding salt to fresh water', 'Killing the microbes in water', 'Filtering solid particles out of water'], sol: 'Desalination removes the dissolved salts from sea water or other salty water, by distillation or by reverse osmosis.' },
        { ask: 'Why is desalination used only where fresh water is scarce?', right: 'It needs a large amount of energy, so it is expensive', wrong: ['The water it makes is not safe to drink', 'Sea water is hard to find', 'It can only be done in cold countries'], sol: 'Both distillation and reverse osmosis need a great deal of energy. Treating fresh water is much cheaper where there is enough of it.' },
        { ask: 'In distillation, sea water is heated. What happens next to give water without the salt?', right: 'The water evaporates, and the vapour is cooled and condensed', wrong: ['The salt evaporates, and the water is left behind', 'The salt is filtered out through paper', 'The water freezes, and the salt sinks'], sol: 'The water boils off and leaves the salt behind. The steam is cooled and condenses to give distilled water.' },
        { ask: 'How does reverse osmosis remove salt from sea water?', right: 'The water is forced through a membrane that lets water through but not the dissolved salts', wrong: ['The water is boiled and the steam is condensed', 'Chlorine is added to react with the salt', 'The water is left to settle until the salt sinks'], sol: 'In reverse osmosis, sea water is pushed at high pressure through a membrane. Water molecules pass through, and the ions of the dissolved salts do not.' },
      ],
      hints,
    );
  }
  if (rng.chance(0.5)) {
    // Dissolved solids found by evaporating a sample.
    const volume = rng.pick([50, 100, 200, 250]);
    const dish = rng.pick([42.15, 51.2, 63.48, 38.75]);
    const solid = rng.pick([0.02, 0.03, 0.04, 0.05, 0.06, 0.08, 0.12]);
    const after = Math.round((dish + solid) * 100) / 100;
    const answer = (solid / volume) * 1000;
    return {
      prompt: `A student tests a sample of water for dissolved solids. An empty evaporating basin has a mass of ${q(fmt(dish, 2), 'g')}. ${vol(volume, 'cm³')} of the water is put in the basin and heated until all of the water has gone. The basin and the solid left in it have a mass of ${q(fmt(after, 2), 'g')}. What mass of dissolved solid would there be in ${vol(1000, 'cm³')} of this water? Give your answer to 2 decimal places.`,
      parts: [numPart(answer, { decimals: 2, suffix: 'g' })],
      hints: ['The mass of dissolved solid is the gain in mass of the basin.', `Scale up from ${volume} cm³ to 1000 cm³.`],
      solution: [`Mass of solid $= ${fmt(after, 2)} - ${fmt(dish, 2)} = ${fmt(solid, 2)}\\ \\text{g}$ in $${volume}\\ \\text{cm}^3$.`, `In $1000\\ \\text{cm}^3$: $${fmt(solid, 2)} \\times \\dfrac{1000}{${volume}} = ${fmt(answer, 2)}\\ \\text{g}$.`],
      calculator: true,
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'A sample of water is clear, has a pH of 7 and leaves a white solid when it is evaporated. What does the solid show?', right: 'The water contained dissolved substances, so it was not pure', wrong: ['The water contained harmful microbes', 'The water was pure, because its pH was 7', 'The water had not been filtered'], sol: 'Pure water leaves nothing behind when it evaporates. A solid residue shows that salts were dissolved in it. A pH of 7 shows only that the water is neutral.' },
      { ask: 'How could a student show that a sample of water is pure?', right: 'Show that it boils at exactly 100 °C and leaves no solid when it is evaporated', wrong: ['Show that it is clear and has no smell', 'Show that it has a pH of 7', 'Show that it has been filtered twice'], sol: 'A pure substance has a fixed boiling point, and pure water leaves no residue. Clear, neutral water can still contain dissolved salts.' },
      { ask: 'Sea water is filtered and then sterilised with chlorine. Why is it still not potable?', right: 'It still contains too much dissolved salt', wrong: ['It still contains solid particles', 'It still contains harmful microbes', 'It has become too acidic to drink'], sol: 'Filtering removes solids and sterilising kills microbes, but neither removes dissolved salts. Sea water must be desalinated.' },
      { ask: 'A water works puts the filter beds before the chlorine. Which statement gives a good reason?', right: 'Sterilising works better once the solid particles that can shelter microbes are gone', wrong: ['Chlorine would dissolve the filter beds', 'Filtering removes the dissolved salts that chlorine reacts with', 'Chlorine is removed from the water by filtering'], sol: 'Solid particles are removed first, so that the sterilising agent can reach and kill the microbes in clear water.' },
    ],
    hints,
  );
}

const SEWAGE_STEPS = [
  { step: 'Screening', does: 'removes large objects, such as rags and grit' },
  { step: 'Sedimentation', does: 'lets the solids settle as sludge, with liquid effluent above' },
  { step: 'Aerobic treatment of the effluent', does: 'uses bacteria and air to break down the organic matter in the liquid' },
  { step: 'Anaerobic digestion of the sludge', does: 'uses bacteria without oxygen to break down the solids, giving methane' },
];

function wasteWater(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Order: screening, sedimentation, then the effluent is treated with air and the sludge without it.', 'Effluent is the liquid. Sludge is the solid that settles.'];
  if (d === 1) {
    if (rng.chance(0.6)) {
      const s = rng.pick(SEWAGE_STEPS);
      return {
        prompt: `In treating sewage, what does **${s.step.toLowerCase()}** do?`,
        parts: [part(mc(rng, `It ${s.does}`, SEWAGE_STEPS.filter((x) => x.step !== s.step).map((x) => `It ${x.does}`)))],
        hints,
        solution: [`${s.step} ${s.does}.`],
      };
    }
    return fromBank(
      rng,
      [
        { ask: 'Why must sewage be treated before it is released into a river?', right: 'It contains organic matter and harmful microbes', wrong: ['It contains too much oxygen', 'It is too pure for fish to live in', 'It is warmer than the river'], sol: 'Sewage contains organic matter and harmful microbes, which would pollute the river and spread disease.' },
        { ask: 'In sewage treatment, what is **sludge**?', right: 'The solid material that settles out in sedimentation', wrong: ['The liquid that lies above the settled solids', 'The gas given off by bacteria', 'The grit removed by screening'], sol: 'In sedimentation the solids sink and form sludge. The liquid above it is called effluent.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const [a, b] = rng.sample([0, 1, 2], 2);
      const first = Math.min(a, b);
      const names = ['Screening', 'Sedimentation', 'Aerobic treatment of the effluent'];
      return {
        prompt: `Which of these two steps in treating sewage comes **first**: ${names[a].toLowerCase()}, or ${names[b].toLowerCase()}?`,
        parts: [part(fixedChoice([names[a], names[b]], a === first ? 0 : 1))],
        hints,
        solution: [`Sewage is screened first, then left to settle (sedimentation), and then the effluent is treated with air. So ${names[first].toLowerCase()} comes first.`],
      };
    }
    return fromBank(
      rng,
      [
        { ask: 'What is the difference between aerobic and anaerobic treatment?', right: 'Aerobic treatment uses bacteria with oxygen; anaerobic treatment uses bacteria without oxygen', wrong: ['Aerobic treatment uses chlorine; anaerobic treatment uses ozone', 'Aerobic treatment is for sludge; anaerobic treatment is for drinking water', 'Aerobic treatment needs heat; anaerobic treatment needs light'], sol: 'Aerobic means with oxygen: air is bubbled through the effluent. Anaerobic means without oxygen: the sludge is digested in closed tanks.' },
        { ask: 'Anaerobic digestion of sewage sludge produces a gas that can be burned as a fuel. Which gas?', right: 'Methane', wrong: ['Oxygen', 'Chlorine', 'Nitrogen'], sol: 'Bacteria break the sludge down without oxygen and give off biogas, which is mostly methane. It can be burned to generate electricity.' },
        { ask: 'After anaerobic digestion, what can the remaining sludge be used for?', right: 'As a fertiliser on farmland', wrong: ['As drinking water', 'As a filter bed', 'As a sterilising agent'], sol: 'The digested sludge is rich in the elements plants need, so it can be dried and used as a fertiliser.' },
        { ask: 'Why is air bubbled through the effluent?', right: 'So that aerobic bacteria can break down the organic matter', wrong: ['So that the solids settle more quickly', 'So that the dissolved salts evaporate', 'So that the water is cooled'], sol: 'Aerobic bacteria need oxygen. Bubbling air through the effluent lets them break down organic matter and reduces the harmful microbes.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'A dry coastal city can get potable water from sea water or from treated waste water. What is an advantage of using waste water?', right: 'It needs less energy than desalinating sea water', wrong: ['It needs no treatment at all', 'It contains no microbes', 'It is always available in unlimited amounts'], sol: 'Desalination needs a great deal of energy. Treating waste water takes more steps than treating fresh water, but less energy than removing salt.' },
      { ask: 'Which source of water needs the **fewest** steps to make potable?', right: 'Fresh water from a lake fed by rain', wrong: ['Sea water', 'Sewage', 'Waste water from a factory'], sol: 'Fresh ground or surface water needs only filtering and sterilising. Waste water needs many more steps, and sea water must be desalinated.' },
      { ask: 'Waste water from a factory may need an extra step that household sewage does not. Why?', right: 'It may contain harmful chemicals that have to be removed', wrong: ['It contains no organic matter for bacteria to feed on', 'It is already safe to drink', 'It contains too much oxygen'], sol: 'Industrial waste water can contain toxic substances, which must be removed as well as the organic matter.' },
      { ask: 'Why are some people unwilling to drink water made from treated sewage, even when tests show it is safe?', right: 'They dislike the idea of where the water came from', wrong: ['Treated water always tastes of chlorine', 'Treated sewage is always more expensive than desalinated water', 'Tests cannot detect microbes in water'], sol: 'The water can be made as safe as any other potable water, but many people are put off by its source. This is a social reason, not a scientific one.' },
      { ask: 'In a sewage works, which pair is correct?', right: 'Effluent: aerobic treatment. Sludge: anaerobic digestion.', wrong: ['Effluent: anaerobic digestion. Sludge: aerobic treatment.', 'Effluent: screening. Sludge: sterilising with chlorine.', 'Effluent: distillation. Sludge: reverse osmosis.'], sol: 'The liquid effluent is treated with air (aerobic). The solid sludge is digested in tanks without oxygen (anaerobic).' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 4.4: life cycle assessments

const LCA_STAGES = ['Extracting and processing the raw materials', 'Manufacturing and packaging', 'Use during its lifetime', 'Disposal at the end of its life'];
const LCA_EXAMPLES = [
  { text: 'Drilling for the crude oil that a plastic bag is made from', stage: 0 },
  { text: 'Mining the bauxite that an aluminium can is made from', stage: 0 },
  { text: 'Cutting down trees to make a paper bag', stage: 0 },
  { text: 'Moulding molten glass into a bottle in a factory', stage: 1 },
  { text: 'Wrapping a new phone in a cardboard box', stage: 1 },
  { text: 'Charging a phone every night for three years', stage: 2 },
  { text: 'Washing a cotton shopping bag each month', stage: 2 },
  { text: 'Burning petrol in a car as it is driven', stage: 2 },
  { text: 'Burying a worn-out plastic bag in landfill', stage: 3 },
  { text: 'Sending an old car to be broken up for scrap', stage: 3 },
];

function lca(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    if (rng.chance(0.3)) {
      return fromBank(
        rng,
        [
          { ask: 'What is a life cycle assessment?', right: 'A study of the effect a product has on the environment at every stage of its life', wrong: ['A measure of how long a product lasts before it breaks', 'A test of how well a product does its job', 'A list of the price of a product in different shops'], sol: 'A life cycle assessment, or LCA, looks at the environmental impact of a product from the raw materials to its disposal.' },
          { ask: 'Which is the **last** stage in a life cycle assessment?', right: 'Disposal at the end of the product’s life', wrong: ['Extracting the raw materials', 'Manufacturing and packaging', 'Use of the product'], sol: 'The four stages are: extracting and processing raw materials, manufacturing and packaging, use, and disposal.' },
        ],
        ['A life cycle runs from the raw materials to the rubbish bin.', 'There are four stages: raw materials, manufacture, use and disposal.'],
      );
    }
    const e = rng.pick(LCA_EXAMPLES);
    return {
      prompt: `To which stage of a life cycle assessment does this belong? “${e.text}.”`,
      parts: [part(fixedChoice(LCA_STAGES, e.stage))],
      hints: ['The four stages run in order: raw materials, manufacture, use and disposal.', 'Ask when it happens: before the product is made, while it is made, while it is used, or after.'],
      solution: [`“${e.text}” belongs to the stage: ${LCA_STAGES[e.stage].toLowerCase()}.`],
    };
  }
  // Two or three products compared over their whole life, with every figure in the table.
  const count = d === 2 ? 2 : 3;
  const products = rng.sample(['Bag', 'Cup', 'Bottle', 'Box'], 1)[0];
  const names = letters(rng, count);
  const measure = rng.pick([
    { head: 'Energy used (MJ)', unit: 'MJ', what: 'energy' },
    { head: 'Carbon dioxide given out (g)', unit: 'g', what: 'carbon dioxide' },
  ]);
  const make = names.map(() => 0);
  const uses = rng.shuffle([1, rng.pick([4, 5, 10]), rng.pick([20, 25, 50])]);
  if (d === 2) {
    // Totals over the stages, one use each.
    const stages = ['Raw materials', 'Manufacture', 'Use', 'Disposal'];
    const data = names.map(() => stages.map(() => rng.int(1, 12) * 5));
    const totals = data.map((r) => r.reduce((a, b) => a + b, 0));
    if (totals[0] === totals[1]) {
      data[1][0] += 5;
      totals[1] += 5;
    }
    const figure: TableFigure = { type: 'table', headers: ['Stage', ...names.map((n) => `${products} ${n}: ${measure.head}`)], rows: stages.map((s, i) => [s, ...data.map((r) => `${r[i]}`)]) };
    const diff = Math.abs(totals[0] - totals[1]);
    return {
      prompt: `The table shows part of a life cycle assessment of two products, ${products.toLowerCase()} ${names[0]} and ${products.toLowerCase()} ${names[1]}. Over its whole life, how much more ${measure.what} does one ${products.toLowerCase()} account for than the other?`,
      figure,
      parts: [numPart(diff, { decimals: 0, suffix: measure.unit })],
      hints: ['Add up all four stages for each product.', 'Then subtract the smaller total from the larger.'],
      solution: [
        ...names.map((n, i) => `${products} ${n}: $${data[i].join(' + ')} = ${totals[i]}\\ \\text{${measure.unit}}$.`),
        `Difference $= ${Math.max(...totals)} - ${Math.min(...totals)} = ${diff}\\ \\text{${measure.unit}}$.`,
      ],
      calculator: true,
    };
  }
  // Per use: a product that takes more to make can still come out lowest, and the most used need not.
  const per = rng.sample([4, 5, 6, 8, 10, 12, 15, 20, 25], count);
  for (let i = 0; i < count; i++) make[i] = per[i] * uses[i];
  const figure: TableFigure = { type: 'table', headers: [products, `To make and dispose of one: ${measure.head}`, 'Number of times it is used'], rows: names.map((n, i) => [n, `${make[i]}`, `${uses[i]}`]) };
  const target = per.indexOf(Math.min(...per));
  return {
    prompt: `The table compares three kinds of ${products.toLowerCase()}. Using a ${products.toLowerCase()} adds nothing to the figures. Which ${products.toLowerCase()} accounts for the **least** ${measure.what} for each use?`,
    figure,
    parts: [part(fixedChoice(names.map((n) => `${products} ${n}`), target))],
    hints: ['Divide the figure for one product by the number of times it is used.', 'A product that takes more to make can still be better, if it is used many more times.'],
    solution: [...names.map((n, i) => `${products} ${n}: $${make[i]} \\div ${uses[i]} = ${fmt(per[i], 2)}\\ \\text{${measure.unit}}$ for each use.`), `${products} ${names[target]} has the lowest figure for each use.`],
    calculator: true,
  };
}

function recycling(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Reduce: use less. Reuse: use the same object again. Recycle: turn the material into something new.', 'Recycling still needs energy, to collect, sort and melt or reprocess the material.'];
  if (d === 1) {
    const e = rng.pick([
      { text: 'A shopper takes the same cloth bag to the shop every week', kind: 0 },
      { text: 'A glass milk bottle is collected, washed and filled again', kind: 0 },
      { text: 'Old aluminium cans are melted and made into new cans', kind: 1 },
      { text: 'Waste paper is pulped and made into cardboard', kind: 1 },
      { text: 'Glass bottles are crushed, melted and moulded into new jars', kind: 1 },
      { text: 'A company makes its drinks cans with thinner walls, so each uses less metal', kind: 2 },
      { text: 'A family turns the heating down and uses less gas', kind: 2 },
    ]);
    const kinds = ['Reusing', 'Recycling', 'Reducing'];
    return {
      prompt: `Is this an example of reducing, reusing or recycling? “${e.text}.”`,
      parts: [part(fixedChoice(kinds, e.kind))],
      hints,
      solution: [`This is ${kinds[e.kind].toLowerCase()}: ${e.kind === 0 ? 'the same object is used again, without being remade' : e.kind === 1 ? 'the material is processed and made into a new product' : 'less material or energy is used in the first place'}.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Metals, glass, building materials and most plastics are made from limited resources. What does “limited” mean here?', right: 'The raw materials will run out, because they are not replaced as fast as they are used', wrong: ['The raw materials can be used only once a year', 'The raw materials are found in only one country', 'The raw materials are too expensive for most people'], sol: 'Metal ores and crude oil are finite: they formed over millions of years and are being used far faster than they form.' },
        { ask: 'Why does recycling aluminium cans save energy?', right: 'Melting old cans needs far less energy than extracting aluminium from its ore by electrolysis', wrong: ['Old cans melt at a lower temperature than new cans', 'Recycled aluminium does not need to be melted', 'Collecting cans uses no fuel'], sol: 'Extracting aluminium needs electrolysis of a molten compound, which uses a great deal of energy. Melting scrap aluminium needs much less.' },
        { ask: 'Apart from saving energy, how does recycling metals help the environment?', right: 'Less ore has to be mined, and less waste goes to landfill', wrong: ['It increases the amount of ore in the ground', 'It removes carbon dioxide from the air', 'It makes the metal more reactive'], sol: 'Recycling reduces mining and quarrying, which damage the landscape, and cuts the waste sent to landfill.' },
        { ask: 'A glass bottle can be washed and refilled, or crushed and melted to make new glass. Which usually needs less energy, and why?', right: 'Refilling, because the glass does not have to be melted', wrong: ['Melting, because washing uses water', 'Melting, because new glass is stronger', 'Refilling, because the bottle is used only once'], sol: 'Reusing a bottle avoids the high temperatures needed to melt glass, so it needs less energy than recycling.' },
        { ask: 'Why must waste be sorted before it is recycled?', right: 'Different materials have to be processed in different ways', wrong: ['Sorted waste weighs less', 'Mixed waste cannot be burned', 'Sorting turns plastics into metals'], sol: 'Glass, metals, paper and each kind of plastic are recycled by different processes, so they must be separated first.' },
      ],
      hints,
    );
  }
  // Energy saved by recycling, from figures stated in the question.
  const metal = rng.pick(['aluminium', 'steel', 'copper', 'glass']);
  const fresh = rng.pick([40, 60, 80, 120, 200, 250]);
  const savingPc = rng.pick([60, 70, 75, 90, 95]);
  const tonnes = rng.pick([2, 5, 8, 10, 20, 50]);
  const recycled = (fresh * (100 - savingPc)) / 100;
  if (rng.chance(0.5)) {
    const saved = (fresh - recycled) * tonnes;
    return {
      prompt: `Making 1 tonne of ${metal} from raw materials takes ${q(fresh, 'GJ')} of energy. Making 1 tonne from recycled ${metal} takes ${q(fmt(recycled), 'GJ')}. How much energy is saved when ${q(tonnes, 'tonnes')} of ${metal} is made from recycled material?`,
      parts: [numPart(saved, { decimals: 0, suffix: 'GJ' })],
      hints: ['Find the energy saved for 1 tonne first.', 'Then multiply by the number of tonnes.'],
      solution: [`Saving for 1 tonne $= ${fresh} - ${fmt(recycled)} = ${fmt(fresh - recycled)}\\ \\text{GJ}$.`, `For $${tonnes}$ tonnes: $${fmt(fresh - recycled)} \\times ${tonnes} = ${fmt(saved)}\\ \\text{GJ}$.`],
      calculator: true,
    };
  }
  return {
    prompt: `Making 1 tonne of ${metal} from raw materials takes ${q(fresh, 'GJ')} of energy. Making 1 tonne from recycled ${metal} takes ${q(fmt(recycled), 'GJ')}. What percentage of the energy does recycling save?`,
    parts: [numPart(savingPc, { decimals: 0, suffix: '%' })],
    hints: ['Find the energy saved for 1 tonne.', 'Percentage saved = (energy saved ÷ energy from raw materials) × 100.'],
    solution: [`Energy saved $= ${fresh} - ${fmt(recycled)} = ${fmt(fresh - recycled)}\\ \\text{GJ}$.`, `Percentage saved $= \\dfrac{${fmt(fresh - recycled)}}{${fresh}} \\times 100 = ${savingPc}\\%$.`],
    calculator: true,
  };
}

export const EARTH_SKILLS: SkillDef[] = [
  skill({ id: 'cx-atmosphere-composition', name: 'The gases of the air', description: 'State the proportions of the gases in the air today, and use them in calculations.', outcomes: ['EA1'], lessonId: L(1), gen: composition }),
  skill({ id: 'cx-atmosphere-change', name: 'How the atmosphere changed', description: 'Explain how the Earth’s early atmosphere formed and how carbon dioxide fell and oxygen rose.', outcomes: ['EA1'], lessonId: L(1), gen: atmosphereChange }),
  skill({ id: 'cx-greenhouse', name: 'Greenhouse gases and carbon footprints', description: 'Explain the greenhouse effect and climate change, and calculate and reduce a carbon footprint.', outcomes: ['EA2'], lessonId: L(2), gen: greenhouse }),
  skill({ id: 'cx-pollutants', name: 'Pollutants from burning fuels', description: 'Say how carbon monoxide, soot, sulfur dioxide and oxides of nitrogen form, and the harm they do.', outcomes: ['EA2'], lessonId: L(2), gen: pollutants }),
  skill({ id: 'cx-potable-water', name: 'Potable water', description: 'Tell potable water from pure water, and describe how fresh and salty water are made safe to drink.', outcomes: ['EA3'], lessonId: L(3), gen: potableWater }),
  skill({ id: 'cx-waste-water', name: 'Treating waste water', description: 'Describe the steps in treating sewage, and compare ways of obtaining potable water.', outcomes: ['EA3'], lessonId: L(3), gen: wasteWater }),
  skill({ id: 'cx-lca', name: 'Life cycle assessments', description: 'Name the stages of a life cycle assessment and compare products with one.', outcomes: ['EA4'], lessonId: L(4), gen: lca }),
  skill({ id: 'cx-recycling', name: 'Reducing, reusing and recycling', description: 'Tell reducing, reusing and recycling apart, and calculate the energy that recycling saves.', outcomes: ['EA4'], lessonId: L(4), gen: recycling }),
];
