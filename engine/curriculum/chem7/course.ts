/**
 * Grade 7 Chemistry: the first junior chemistry course, before Chemistry 8. Gradileo's own outline
 * (11 November 2026), checked against the chemistry of Alberta's Science 7 and 8 (Heat and
 * Temperature; Mix and Flow of Matter), England's Key Stage 3 science (the particulate nature of
 * matter; pure and impure substances) and the NGSS middle-school standards MS-PS1-4 and MS-PS3:
 * matter and measurement, the particle model, mixtures and solutions, and separating mixtures.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: '7-A1', strand: 'Matter and Measurement', text: 'Describe matter by its properties, measure mass and volume, and use density to compare substances.' },
  { code: '7-A2', strand: 'Matter and Measurement', text: 'Work safely in the science laboratory and read hazard symbols.' },
  { code: '7-B1', strand: 'The Particle Model', text: 'Use the particle model to describe solids, liquids and gases and to explain changes of state.' },
  { code: '7-B2', strand: 'The Particle Model', text: 'Explain temperature, heat transfer, expansion and diffusion with the particle model.' },
  { code: '7-C1', strand: 'Mixtures and Solutions', text: 'Tell pure substances from mixtures, and describe solutions, concentration, solubility and dissolving.' },
  { code: '7-C2', strand: 'Separating Mixtures', text: 'Choose and explain a method to separate the parts of a mixture.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  minutes = 50,
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, outcomes, skills, objectives, minutes, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Matter and Measurement ----------------
  L('c7-1-1', 'c7-u1', '1.1', 'Working Safely in the Lab', ['7-A2'],
    ['c7-hazard-symbols', 'c7-lab-safety'],
    ['Read the hazard symbols on chemical labels', 'Choose safe ways to work in a science laboratory'],
    45, ['hazard symbol', 'flammable', 'corrosive', 'toxic', 'safety goggles']),
  L('c7-1-2', 'c7-u1', '1.2', 'What Is Matter?', ['7-A1'],
    ['c7-is-matter', 'c7-properties'],
    ['Decide whether something is matter because it has mass and takes up space', 'Describe a substance by its properties'],
    45, ['matter', 'mass', 'volume', 'property', 'substance']),
  L('c7-1-3', 'c7-u1', '1.3', 'Measuring Mass and Volume', ['7-A1'],
    ['c7-measure-volume', 'c7-units'],
    ['Read a measuring cylinder at the bottom of the meniscus', 'Find the volume of an object by displacement', 'Convert between grams and kilograms, and millilitres and litres'],
    50, ['balance', 'measuring cylinder', 'meniscus', 'displacement', 'millilitre', 'cubic centimetre']),
  L('c7-1-4', 'c7-u1', '1.4', 'Density', ['7-A1'],
    ['c7-density', 'c7-float-sink'],
    ['Calculate density from mass and volume', 'Predict whether an object floats or sinks in water from its density'],
    50, ['density', 'float', 'sink']),

  // ---------------- Unit 2: The Particle Model ----------------
  L('c7-2-1', 'c7-u2', '2.1', 'Solids, Liquids and Gases', ['7-B1'],
    ['c7-states', 'c7-particle-model'],
    ['Describe the shape, volume and flow of solids, liquids and gases', 'Explain these properties with the particle model'],
    50, ['particle model', 'solid', 'liquid', 'gas', 'particle', 'vibrate']),
  L('c7-2-2', 'c7-u2', '2.2', 'Changes of State', ['7-B1'],
    ['c7-state-changes', 'c7-melting-boiling'],
    ['Name each change of state and say whether the substance is heated or cooled', 'Use melting and boiling points to give the state of a substance at a temperature'],
    50, ['melting', 'freezing', 'evaporation', 'boiling', 'condensation', 'melting point', 'boiling point']),
  L('c7-2-3', 'c7-u2', '2.3', 'Temperature and Heat', ['7-B2'],
    ['c7-temperature', 'c7-heat-transfer'],
    ['Explain temperature as how fast particles move, and read temperature changes', 'Describe conduction, convection and radiation, and how heat moves from hot to cold'],
    50, ['temperature', 'heat', 'thermometer', 'conduction', 'convection', 'radiation', 'insulator']),
  L('c7-2-4', 'c7-u2', '2.4', 'Expansion and Diffusion', ['7-B2'],
    ['c7-expansion', 'c7-diffusion'],
    ['Explain expansion and contraction with the particle model', 'Explain diffusion and why it is faster in gases and in warmer substances'],
    45, ['expansion', 'contraction', 'diffusion']),

  // ---------------- Unit 3: Mixtures and Solutions ----------------
  L('c7-3-1', 'c7-u3', '3.1', 'Pure Substances and Mixtures', ['7-C1'],
    ['c7-pure-mixture', 'c7-mixture-types'],
    ['Tell a pure substance from a mixture', 'Classify mixtures as mechanical mixtures, suspensions, colloids or solutions'],
    50, ['pure substance', 'mixture', 'mechanical mixture', 'suspension', 'colloid', 'solution']),
  L('c7-3-2', 'c7-u3', '3.2', 'Solutions and Concentration', ['7-C1'],
    ['c7-solution-parts', 'c7-concentration'],
    ['Name the solute and solvent of a solution, and find the mass of a solution', 'Calculate a concentration in grams per litre and compare dilute and concentrated solutions'],
    50, ['solute', 'solvent', 'solution', 'dissolve', 'concentration', 'dilute', 'concentrated']),
  L('c7-3-3', 'c7-u3', '3.3', 'Solubility', ['7-C1'],
    ['c7-solubility', 'c7-saturation'],
    ['Use a solubility table to find how much of a solute dissolves', 'Tell saturated from unsaturated solutions'],
    50, ['soluble', 'insoluble', 'solubility', 'saturated', 'unsaturated']),
  L('c7-3-4', 'c7-u3', '3.4', 'How Fast Things Dissolve', ['7-C1'],
    ['c7-dissolving-rate', 'c7-fair-test'],
    ['Explain how stirring, temperature and particle size change how fast a solute dissolves', 'Name the variables of a fair test'],
    50, ['rate of dissolving', 'fair test', 'independent variable', 'dependent variable', 'controlled variable']),

  // ---------------- Unit 4: Separating Mixtures ----------------
  L('c7-4-1', 'c7-u4', '4.1', 'Sieving, Magnets and Filtering', ['7-C2'],
    ['c7-simple-separation', 'c7-filtration'],
    ['Separate solid mixtures by sieving, with a magnet, or by hand', 'Separate an insoluble solid from a liquid by filtration, and name the filtrate and residue'],
    50, ['sieving', 'magnetic separation', 'filtration', 'filtrate', 'residue', 'decanting']),
  L('c7-4-2', 'c7-u4', '4.2', 'Evaporation and Distillation', ['7-C2'],
    ['c7-evaporation', 'c7-distillation'],
    ['Get a dissolved solid back from a solution by evaporation', 'Explain how distillation gets a pure liquid from a solution'],
    50, ['evaporation', 'crystallization', 'distillation', 'condenser', 'distillate']),
  L('c7-4-3', 'c7-u4', '4.3', 'Chromatography and Choosing a Method', ['7-C2'],
    ['c7-chromatography', 'c7-choose-method'],
    ['Read a chromatogram to find how many dyes an ink has and which inks match', 'Choose the right method to separate a mixture'],
    50, ['chromatography', 'chromatogram', 'dye', 'solvent front']),
];

export const UNITS: UnitMeta[] = [
  { id: 'c7-u1', number: 1, title: 'Matter and Measurement', description: 'Working safely, what matter is and its properties, measuring mass and volume, and density.', outcomes: ['7-A1', '7-A2'], lessons: [], color: 'emerald' },
  { id: 'c7-u2', number: 2, title: 'The Particle Model', description: 'Solids, liquids and gases, changes of state, temperature and heat, expansion and diffusion.', outcomes: ['7-B1', '7-B2'], lessons: [], color: 'sky' },
  { id: 'c7-u3', number: 3, title: 'Mixtures and Solutions', description: 'Pure substances and mixtures, solutes and solvents, concentration, solubility and how fast things dissolve.', outcomes: ['7-C1'], lessons: [], color: 'violet' },
  { id: 'c7-u4', number: 4, title: 'Separating Mixtures', description: 'Sieving, magnets and filtering, evaporation and distillation, chromatography, and choosing a method.', outcomes: ['7-C2'], lessons: [], color: 'amber' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const CHEM7: CourseMeta = {
  id: 'chem-7',
  title: 'Grade 7 Chemistry',
  shortTitle: 'Chemistry 7',
  grade: 7,
  subject: 'Chemistry',
  description: 'Chemistry for Grade 7: matter and measurement, the particle model, mixtures and solutions, and separating mixtures.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
