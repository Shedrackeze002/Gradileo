/**
 * More English Topics, Unit 2: writing in a form. The features of an article, a formal letter and
 * a speech, the opening and ending that suit each, the order of their parts, and a formal register
 * for the audience. Every task and name was invented for these lessons (see texts.ts).
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, order, q } from '../../eng10/gen/common.ts';
import { TASKS, type Task } from './texts.ts';

const LESSON = 'ex-2-1';

type Form = 'article' | 'letter' | 'speech';
const FORMS: Form[] = ['article', 'letter', 'speech'];
const NAME: Record<Form, string> = { article: 'an article', letter: 'a formal letter', speech: 'a speech' };

const FEATURES: Record<Form, string[]> = {
  article: ['A headline that catches the reader’s eye', 'A strapline that sums up the piece under the headline', 'Subheadings that divide the text into sections'],
  letter: ['The sender’s address and the date at the top', 'A greeting such as “Dear Ms Okafor,” on its own line', 'A sign-off such as “Yours sincerely,” above the name'],
  speech: ['A greeting to the listeners, such as “Good morning, everyone”', 'A thank-you to the listeners in the final sentence', 'Signposts for listeners, such as “My second point is this”'],
};

const task = (t: Task, f: Form) =>
  f === 'article'
    ? `Write an article for ${t.articleIn}, arguing that ${t.issue}.`
    : f === 'letter'
      ? `Write a letter to ${t.letterTo}, arguing that ${t.issue}.`
      : `Write a speech for ${t.speechTo}, arguing that ${t.issue}.`;

const INFORMAL_OPEN = 'hey so basically this is a massive problem and literally everyone i know is annoyed about it lol, so we should all do something asap, yeah??';
const INFORMAL_END = 'anyway thats pretty much all ive got to say about it, cheers for reading this, bye!!';

function formFeatures(rng: Rng, d: Difficulty): GenOutput {
  const f = rng.pick(FORMS);
  const t = rng.pick(TASKS);
  const rest = FORMS.filter((x) => x !== f);
  if (d === 1) {
    const right = rng.pick(FEATURES[f]);
    return {
      prompt: `Which of these features belongs to **${NAME[f]}**, and not to ${NAME[rest[0]]} or ${NAME[rest[1]]}?`,
      parts: [part(mc(rng, right, [rng.pick(FEATURES[rest[0]]), rng.pick(FEATURES[rest[1]]), 'Paragraphs that each develop one main point']))],
      hints: ['Think about how the text reaches its audience: on a page of a newspaper, in an envelope, or spoken aloud.', 'One of these features belongs to all three forms.'],
      solution: [`${right}: this is a feature of ${NAME[f]}.`, 'Paragraphs that each develop one point belong to every form of viewpoint writing.'],
    };
  }
  if (d === 2) {
    const open = { article: t.articleOpen, letter: t.letterOpen, speech: t.speechOpen };
    return {
      prompt: `A task says: ${q(task(t, f))}\n\nWhich opening suits the form?`,
      parts: [part(mc(rng, open[f], [open[rest[0]], open[rest[1]], INFORMAL_OPEN]))],
      hints: [`How does ${NAME[f]} begin: with a headline, with “Dear …,” or with a greeting to listeners?`, 'All three forms here need standard English.'],
      solution: [
        open[f],
        f === 'article' ? 'An article opens with a headline and then hooks the reader.' : f === 'letter' ? 'A formal letter opens with “Dear …,” and says at once why the writer is writing.' : 'A speech opens by greeting the listeners and catching their attention.',
      ],
    };
  }
  if (rng.chance(0.3)) {
    const faithfully = t.greeting.includes('Sir or Madam');
    const other = rng.pick(TASKS.filter((x) => x.greeting.includes('Sir or Madam') !== faithfully));
    const g = rng.chance(0.5) ? t : other;
    const right = g.signOff;
    return {
      prompt: `A formal letter begins ${q(g.greeting)} How should it end?`,
      parts: [part(mc(rng, right, ['Yours sincerely,', 'Yours faithfully,', 'Best wishes,', 'Thank you for listening.'].filter((c) => c !== right)))],
      hints: ['The sign-off depends on whether the letter names the person it is written to.', '“Sincerely” goes with a name; “faithfully” goes with “Sir or Madam”.'],
      solution: [`${right} ${right.includes('faithfully') ? 'The letter does not name its reader (“Dear Sir or Madam”), so it ends “Yours faithfully”.' : 'The letter names its reader, so it ends “Yours sincerely”.'}`],
    };
  }
  const end = { article: t.articleEnd, letter: t.letterEnd, speech: t.speechEnd };
  return {
    prompt: `A task says: ${q(task(t, f))}\n\nWhich ending suits the form?`,
    parts: [part(mc(rng, end[f], [end[rest[0]], end[rest[1]], INFORMAL_END]))],
    hints: ['A letter signs off; a speech thanks its listeners; an article does neither.', 'Check who is being addressed in each ending.'],
    solution: [
      end[f],
      f === 'article' ? 'An article ends on a strong final thought. It has no sign-off and does not thank anyone for listening.' : f === 'letter' ? 'A formal letter ends by saying what the writer hopes will happen, then signs off above the writer’s name.' : 'A speech ends with a call to action and thanks the audience for listening.',
    ],
  };
}

function parts(t: Task, f: Form): string[] {
  if (f === 'article') {
    return [`The headline: ${q(t.headline)}`, 'A strapline that sums up the argument in one sentence', 'An opening paragraph that hooks the reader', 'Paragraphs under subheadings, each making one point', 'A final paragraph that leaves a strong last thought'];
  }
  if (f === 'letter') {
    return ['The sender’s address and the date', `The greeting: ${q(t.greeting)}`, 'An opening paragraph that says why you are writing', 'Paragraphs that each give one reason, with evidence', 'A final paragraph that says what you want to happen', `The sign-off: ${q(t.signOff)} and your name`];
  }
  return [`A greeting to the audience: ${q(t.speechGreeting)}`, 'An opening that grabs the listeners’ attention', 'The main points, each one signposted for the listeners', 'A call to action that tells the audience what to do', 'A thank-you to the audience for listening'];
}

function formRegister(rng: Rng, d: Difficulty): GenOutput {
  const t = rng.pick(TASKS);
  if (d === 1) {
    const f = rng.pick(['article', 'letter'] as const);
    return {
      prompt: `A task says: ${q(task(t, f))}\n\nWhich sentence is written in the right register for this audience?`,
      parts: [part(mc(rng, t.formal, [t.informal, t.stillInformal, t.rude]))],
      hints: ['Register is how formal the language is. This audience needs standard English and a polite, measured tone.', 'Slang, chatty phrases and insults all lower the register.'],
      solution: [t.formal, 'This sentence uses standard English and makes its criticism politely. The others use slang or chatty phrases, or insult the reader, which would lose the audience’s respect.'],
    };
  }
  if (d === 2) {
    return {
      prompt: `A student drafts this sentence for a formal letter:\n\n${block(t.informal)}\n\nWhich is the best formal version?`,
      parts: [part(mc(rng, t.formal, [t.stillInformal, t.rude, t.changed]))],
      hints: ['The formal version must keep the same meaning.', 'Being formal is not the same as being harsh.'],
      solution: [t.formal, 'This version keeps the student’s point and puts it in standard English. One choice is still chatty, one turns the point into an insult, and one changes what the student meant.'],
    };
  }
  const f = rng.pick(FORMS);
  return order(
    rng,
    `A task says: ${q(task(t, f))}\n\nPut the parts of the ${f} in order.`,
    parts(t, f),
    [f === 'article' ? 'An article starts with its headline.' : f === 'letter' ? 'A letter starts with the sender’s address and the date, before the greeting.' : 'A speech starts by greeting the people in the room.', 'The argument comes in the middle, and the reader or listener is told what to do near the end.'],
    [parts(t, f).map((s, i) => `${i + 1}. ${s}`).join(' ')],
  );
}

export const WRITING_SKILLS: SkillDef[] = [
  skill({ id: 'ex-form-features', name: 'Article, letter or speech', description: 'Recognise the features of an article, a formal letter and a speech, and choose the opening and ending that suit each.', outcomes: ['WF1'], lessonId: LESSON, gen: formFeatures }),
  skill({ id: 'ex-form-register', name: 'Register and structure', description: 'Choose a formal register for the audience, and put the parts of an article, a letter and a speech in order.', outcomes: ['WF1'], lessonId: LESSON, gen: formRegister }),
];
