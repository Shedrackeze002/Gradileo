/** More Mathematics Topics, Unit 1: experiments, observational studies and simulation. */
import { fixedChoice, mc, numPart, skill, type GenOutput } from '../../helpers.ts';
import { fmt, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, SkillDef } from '../../../types.ts';
import { asc } from './common.ts';

type Out = GenOutput;

const STUDIES: Array<{ text: string; kind: 'Sample survey' | 'Observational study' | 'Experiment'; why: string }> = [
  { text: 'A town council asks $400$ randomly chosen residents whether they would use a new bus route.', kind: 'Sample survey', why: 'People are asked questions, and nothing is done to them.' },
  { text: 'A school asks a random sample of students how many hours they spend reading each week.', kind: 'Sample survey', why: 'Students are asked a question; the researchers only collect answers.' },
  { text: 'Researchers compare the test scores of students who chose to take music lessons with those of students who did not.', kind: 'Observational study', why: 'The students chose for themselves; the researchers only observe and record.' },
  { text: 'A scientist records the heights of trees growing near a river and of trees growing far from it.', kind: 'Observational study', why: 'Nothing is changed: the trees are measured where they already grow.' },
  { text: 'Doctors look back at the records of patients to see whether those who walked daily had fewer heart problems.', kind: 'Observational study', why: 'The patients chose whether to walk; the doctors only look at what happened.' },
  { text: 'A gardener randomly gives half of $40$ seedlings a new fertilizer and the other half none, and compares their growth.', kind: 'Experiment', why: 'A treatment (the fertilizer) is given to randomly chosen subjects, and compared with a control group.' },
  { text: 'Volunteers are randomly put into two groups: one drinks a sports drink and one drinks water before a race, and their times are compared.', kind: 'Experiment', why: 'The researchers decide, at random, who gets each treatment.' },
  { text: 'A teacher randomly assigns half the class to study with flashcards and half with practice questions, then compares their quiz scores.', kind: 'Experiment', why: 'The teacher imposes the study method on randomly chosen groups.' },
];

function studyDesign(rng: Rng, d: Difficulty): Out {
  if (d < 3) {
    const s = rng.pick(STUDIES);
    const kinds = ['Sample survey', 'Observational study', 'Experiment'];
    return {
      prompt: `What kind of study is this?\n\n> ${s.text}`,
      parts: [{ answer: fixedChoice(kinds, kinds.indexOf(s.kind)) }],
      hints: ['A **survey** asks questions. An **observational study** records what happens without changing anything. An **experiment** gives a treatment to some subjects and compares them with others.', 'Ask: did the researchers decide who gets what?'],
      solution: [s.why, `It is ${s.kind === 'Experiment' ? 'an experiment' : `a${s.kind === 'Observational study' ? 'n observational study' : ' sample survey'}`}.`],
    };
  }
  const s = rng.pick(STUDIES.filter((x) => x.kind !== 'Sample survey'));
  const can = s.kind === 'Experiment';
  return {
    prompt: `Can this study show that one thing **causes** another?\n\n> ${s.text}`,
    parts: [{ answer: mc(rng, can ? 'Yes: the treatment was assigned at random, so other differences between the groups even out.' : 'No: the groups were not assigned at random, so another difference between them could explain the results.', [can ? 'No: only an observational study can show cause and effect.' : 'Yes: if the groups differ, the difference must be the cause.', can ? 'No: the sample is too small for any conclusion.' : 'Yes: real measurements always show cause and effect.', 'Only if the results are surprising.']) }],
    hints: ['Only a **randomized experiment** can show cause and effect.', 'In an observational study, the groups may differ in other ways (a **confounding variable**) that explain the results.'],
    solution: can
      ? ['The researchers assigned the treatment at random, so the groups are alike except for the treatment.', 'A clear difference in results can then be put down to the treatment: the study can show cause and effect.']
      : ['The subjects were not assigned to groups at random; they were already in them.', 'Another difference between the groups could explain the results, so the study can show an association but not cause and effect.'],
  };
}

/** Results of a simulation as a dot plot: counts out of n in each of many runs. */
function simulation(rng: Rng, d: Difficulty): Out {
  const n = 20;
  const p = rng.pick([0.3, 0.4, 0.5]);
  const runs = 40;
  // Binomial-looking simulated counts.
  const counts = Array.from({ length: runs }, () => Array.from({ length: n }, () => (rng.next() < p ? 1 : 0)).reduce<number>((a, b) => a + b, 0));
  const figure: Figure = { type: 'dotPlot', values: counts, min: Math.min(...counts) - 1, max: Math.max(...counts) + 1, label: `Wins out of ${n} in each run` };
  const claim = Math.round(p * 100);
  if (d === 1) {
    const t = rng.pick(asc(counts).slice(28, 36));
    const k = counts.filter((c) => c >= t).length;
    return {
      prompt: `A game is said to give a win $${claim}\\%$ of the time. A computer simulated $${runs}$ runs of $${n}$ games each, and the dot plot shows the number of wins in each run.\n\nIn how many runs were there $${t}$ or more wins? What fraction of the runs is that, as a percent?`,
      figure,
      parts: [numPart(k, { label: 'Runs:' }), numPart((k / runs) * 100, { label: 'Percent:', suffix: '%' })],
      hints: ['Count the dots at and to the right of the value.', `Divide by the number of runs, $${runs}$, and multiply by $100$.`],
      solution: [`There are $${k}$ dots at $${t}$ or more.`, `$${k} \\div ${runs} \\times 100 = ${fmt((k / runs) * 100)}\\%$`],
    };
  }
  // Is an observed result unusual? Compare with the simulated runs.
  // The question is about a high result (evidence of more wins than claimed), so the observed
  // count is at or above the simulated median, or above every simulated run.
  const high = asc(counts).slice(runs / 2);
  const observed = rng.chance(0.5) ? Math.min(n, Math.max(...counts) + rng.int(1, 2)) : rng.pick(high);
  const asExtreme = counts.filter((c) => c >= observed).length;
  const unusual = asExtreme / runs < 0.05;
  return {
    prompt: `A game is said to give a win $${claim}\\%$ of the time. A computer simulated $${runs}$ runs of $${n}$ games each, and the dot plot shows the number of wins in each run. A player then won $${observed}$ of $${n}$ real games.\n\n**(a)** In what percent of the simulated runs were there $${observed}$ or more wins?\n\n**(b)** Taking less than $5\\%$ as unusual, is a result this high unusual if the claim is true?`,
    figure,
    parts: [numPart(roundTo((asExtreme / runs) * 100, 1), { label: '(a)', suffix: '%' }), { label: '(b)', answer: fixedChoice(['Yes, it is unusual: the claim may be wrong.', 'No, it is not unusual: it fits the claim.'], unusual ? 0 : 1) }],
    hints: ['Count the dots at the observed value and to its right, and divide by the number of runs.', 'A result that the simulation rarely gives (less than $5\\%$ of the runs) is evidence against the claim.'],
    solution: [
      `$${asExtreme}$ of the $${runs}$ runs had $${observed}$ or more wins: $${asExtreme} \\div ${runs} = ${fmt(roundTo((asExtreme / runs) * 100, 1))}\\%$.`,
      unusual ? `That is less than $5\\%$, so the result would be unusual if the claim were true. It is evidence that the win rate is higher than claimed.` : `That is not less than $5\\%$, so a result like this happens often enough by chance. It fits the claim.`,
    ],
  };
}

export const STUDY_SKILLS: SkillDef[] = [
  skill({ id: 'mx-study-design', name: 'Surveys, observational studies and experiments', description: 'Tell the kinds of study apart and decide which can show cause and effect', outcomes: ['ST6'], lessonId: 'mx-1-6', format: 'mc', gen: studyDesign }),
  skill({ id: 'mx-simulation', name: 'Using simulation to judge a result', description: 'Use the results of a simulation to decide whether a result is unusual', outcomes: ['ST6'], lessonId: 'mx-1-6', gen: simulation }),
];
