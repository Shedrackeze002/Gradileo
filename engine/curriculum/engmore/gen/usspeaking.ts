/**
 * More English Topics, Unit 13: speaking, listening and publishing, as the US Common Core asks for
 * them in Grades 5 to 8: taking part in a discussion and summarizing a speaker (SL.5.1–8.3),
 * reading aloud and speaking clearly (RF.5.4b, SL.5.4–8.6), presenting with visuals and media
 * (SL.5.4–8.5), and producing and publishing writing with technology (W.5.6–8.6). The scenarios
 * were written for these lessons.
 */
import { skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { ask, type Q } from './bank.ts';

const by = (d: Difficulty, banks: [Q[], Q[], Q[]], hints: [string[], string[], string[]]) => (rng: Rng) => ask(rng, banks[d - 1], hints[d - 1]);

// ---------------------------------------------------------------------------------------------
// Lesson 13.1: Taking part in a discussion.
// ---------------------------------------------------------------------------------------------

const PREPARE: Q[] = [
  { prompt: 'Your group will discuss a chapter of a novel tomorrow. What is the best way to come prepared?', right: 'Read the chapter and note two passages and a question to raise', wrong: ['Skim the back cover so you can guess what the chapter is about', 'Plan to agree with whatever the first speaker says about it', 'Write a speech to read aloud so that nobody can interrupt you'], why: 'Coming prepared means having read the material and having evidence and questions ready to share (SL.5.1a).' },
  { prompt: 'A group agrees on rules before a discussion. Which rule helps everyone take part?', right: 'Each person speaks once before anyone speaks a second time', wrong: ['The loudest speaker decides when the discussion is over', 'Only people who agree with the leader may share an idea', 'Anyone may talk at any time, even while others are talking'], why: 'Agreed rules, such as taking turns, make sure every voice is heard (SL.5.1b).' },
  { prompt: 'In a group discussion, what does the **discussion leader** usually do?', right: 'Keeps the talk on topic and invites quiet members to speak', wrong: ['Gives the right answer so that the group can stop talking', 'Writes down every word that each member of the group says', 'Speaks for most of the time because they know the most'], why: 'Groups give members roles; the leader keeps the discussion moving and makes room for everyone (SL.6.1b).' },
  { prompt: 'Before a discussion on whether the school day should start later, you find an article about teenagers and sleep. How should you use it?', right: 'Bring a fact from it to support a point you plan to make', wrong: ['Keep it to yourself in case someone else uses it first', 'Read the whole article aloud as soon as the talk begins', 'Leave it at home, since a discussion is about opinions'], why: 'Preparation includes research, so you can refer to evidence during the discussion (SL.6.1a).' },
  { prompt: 'Your group has to decide on a class project by Friday. Which plan sets a useful goal and deadline?', right: 'Agree on three ideas today and vote on one by Thursday', wrong: ['Keep talking each day until someone has a perfect idea', 'Let each member pick their own project and work alone', 'Wait until Friday morning and then choose very quickly'], why: 'Groups track progress toward specific goals and deadlines (SL.7.1b).' },
  { prompt: 'Which of these is a **role** a member might take in a group discussion?', right: 'A note taker, who records the main points and decisions', wrong: ['A winner, who proves that the others are wrong', 'A judge, who gives each speaker a grade at the end', 'A silent member, who is not expected to say anything'], why: 'Roles such as leader, note taker and timekeeper help a discussion run well (SL.5.1b).' },
];

const MOVES: Q[] = [
  { prompt: 'A classmate says, “I think the narrator is lying.” Which response **builds on** the idea?', right: 'What makes you think so? In chapter two he changes his story.', wrong: ['I already said something like that earlier, so that is my idea.', 'Okay. Let’s talk about the weather in the story now instead.', 'That is wrong, and I don’t think we should talk about it.'], why: 'Building on an idea means asking about it and linking it to evidence or another remark (SL.5.1c).' },
  { prompt: 'Which question **links** your remark to what another speaker said?', right: 'Maya said the ending was sad; could it also be hopeful?', wrong: ['Can we stop now? I think we have talked enough today.', 'Does anybody know what time the discussion has to end?', 'Why does everyone always agree with what Maya says?'], why: 'A good discussion question connects to others’ remarks and moves the talk forward (SL.7.1c).' },
  { prompt: 'Which response **paraphrases** a speaker before replying?', right: 'So you’re saying the rule is unfair to younger pupils. I see why.', wrong: ['I don’t understand anything you said, so I will make my own point.', 'You’re wrong about the rule, and younger pupils don’t matter.', 'Let me read out the rule again, word for word, from the start.'], why: 'Paraphrasing shows you listened and checks that you understood (SL.6.1d).' },
  { prompt: 'Someone shares a fact that changes your mind. What is the best response?', right: 'That’s new to me; I now think the plan might work after all.', wrong: ['That’s new to me, but I will keep my view whatever you say.', 'I won’t listen to facts, because my mind is already made up.', 'Facts don’t matter in a discussion, only what we feel does.'], why: 'Good speakers acknowledge new information and change their views when the evidence warrants it (SL.8.1d).' },
  { prompt: 'A speaker says: “Our town should plant more trees. Trees cool the streets, they clean the air, and a study of our park found that birds returned once trees were planted.” Which is the best **summary** of the speaker’s points?', right: 'More trees would cool streets, clean the air and bring back birds.', wrong: ['The town has a park, and some birds live in the park all year.', 'Trees are tall plants that grow leaves in spring and summer.', 'A study was done, but the speaker did not say what it found.'], why: 'A summary gives the speaker’s claim and the reasons that support it (SL.5.3).' },
  { prompt: 'A speaker claims that homework should be banned because “everyone hates it.” What is the best way to **evaluate** this reason?', right: 'It is weak: not everyone hates homework, and dislike is not proof of harm.', wrong: ['It is strong: if a speaker says everyone, then it must be true for everyone.', 'It is strong: a reason that is short is always more convincing than a long one.', 'It does not matter: in a discussion we never judge the reasons that people give.'], why: 'Listeners judge whether a speaker’s reasons and evidence are sound and enough to support the claim (SL.6.3, SL.8.3).' },
  { prompt: 'At the end of a discussion, which comment best **reviews** what was said?', right: 'We agreed on the cause, but we still disagree on the best fix.', wrong: ['I was right from the start, and now everyone knows it is so.', 'That was a long talk, and I don’t remember who said what.', 'Let’s start a new topic, since this one is over and done.'], why: 'Reviewing the key ideas, including where people still disagree, helps the group see what it has learned (SL.5.1d).' },
];

const prepare = (rng: Rng, d: Difficulty) =>
  by(d, [PREPARE.slice(0, 4), PREPARE, PREPARE.slice(2)], [
    ['Come prepared: read the material and bring evidence and questions.', 'Rules and roles help every member take part.'],
    ['Ask what helps the whole group, not one speaker.', 'Evidence from your reading or research makes a point stronger.'],
    ['Roles such as leader and note taker share the work.', 'Set clear goals and deadlines, and track progress toward them.'],
  ])(rng);

const moves = (rng: Rng, d: Difficulty) =>
  by(d, [MOVES.slice(0, 4), MOVES, MOVES.slice(3)], [
    ['Build on what others say: ask about it, or link it to evidence.', 'Respond politely, even when you disagree.'],
    ['Paraphrase to show you listened.', 'A summary gives the claim and the reasons for it.'],
    ['Judge a speaker’s reasons: are they true, relevant and enough?', 'Change your view when new evidence warrants it.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------
// Lesson 13.2: Reading aloud and speaking clearly.
// ---------------------------------------------------------------------------------------------

const ALOUD: Q[] = [
  { prompt: 'You are reading this line aloud.\n\n> “Stop!” shouted Ana. “The bridge is out!”\n\nHow should you read it?', right: 'Loudly and urgently, as if warning someone of danger', wrong: ['Slowly and softly, as if you were telling a bedtime tale', 'In one flat voice, with no change at the exclamation marks', 'As fast as you can, so the line is finished before others'], why: 'Exclamation marks and the word *shouted* tell you to read with urgency and expression (RF.5.4b).' },
  { prompt: 'When you read aloud and reach a **comma**, what should you usually do?', right: 'Pause briefly, then carry on with the same sentence', wrong: ['Stop for a long time, as you would at a full stop', 'Raise your voice, as you would for a question mark', 'Ignore it, since commas only matter in silent reading'], why: 'Punctuation guides phrasing: a short pause at a comma and a longer one at a full stop (RF.5.4b).' },
  { prompt: 'How should your voice usually change at the end of a **question**, such as “Are you coming with us?”', right: 'It often rises, to show that you are asking something', wrong: ['It drops to a whisper, to show that the sentence ended', 'It stays flat, because questions need no expression', 'It gets much louder, as if you were very angry'], why: 'A rising tone often signals a question to listeners (RF.5.4b).' },
  { prompt: 'You misread *“through”* as *“though”* and the sentence stops making sense. What should a good reader do?', right: 'Notice it, go back and reread the sentence correctly', wrong: ['Keep going quickly so that no listener notices', 'Stop reading and hand the book to someone else', 'Skip the rest of the paragraph and start the next'], why: 'Good readers use context to confirm or correct a reading, rereading when needed (RF.5.4c).' },
  { prompt: 'Which reading **pace** suits a tense, quiet scene in a mystery?', right: 'Slower than usual, with pauses that build suspense', wrong: ['Faster than usual, so the scene is over quickly', 'Exactly the same as for a cheerful, funny scene', 'Very loud and fast, so the audience stays awake'], why: 'Reading with expression means matching pace and volume to the mood of the text (RF.5.4b).' },
];

const SPEAK: Q[] = [
  { prompt: 'Which habit helps listeners follow a spoken report?', right: 'Look up at the audience and speak at a steady, clear pace', wrong: ['Look down at your notes and read them as fast as possible', 'Speak very softly so that only the front row can hear you', 'Turn to face the board and talk to it, not the audience'], why: 'Eye contact, adequate volume and clear pronunciation help listeners follow (SL.5.4).' },
  { prompt: 'You are telling your class about a trip and want them to picture it. What should you add?', right: 'Vivid, relevant details, such as the sound of the waterfall', wrong: ['Every detail you can think of, in no particular order', 'Only the date and the time, with no other details at all', 'A list of facts about waterfalls you found in a book'], why: 'A good spoken account sequences ideas logically and uses relevant, descriptive details (SL.5.4).' },
  { prompt: 'Which situation calls for **formal** spoken English?', right: 'Presenting a science project to visiting judges', wrong: ['Chatting with a friend while you wait for the bus', 'Joking with your brother while you eat dinner', 'Sending a voice message to your cousin about a game'], why: 'We adapt speech to the context: formal English for formal tasks and audiences (SL.5.6).' },
  { prompt: 'A student begins a talk to parents: “So, um, like, this is our stuff.” How could it be adapted for the occasion?', right: 'Good evening. Tonight we will show you our river project.', wrong: ['Hey, so we did some stuff, and here’s the stuff we did.', 'Um, like, we kind of made a thing about the river, yeah.', 'Okay whatever, let’s just get this river thing done.'], why: 'A formal audience calls for a clear greeting and precise words, without fillers such as *um* and *like* (SL.6.6).' },
  { prompt: 'Which is the best way to answer a question from the audience after a talk?', right: 'Restate the question, answer it briefly, and give a reason', wrong: ['Say that the question was not a good one, then move on', 'Talk about something else that you know more about', 'Answer only yes or no and then sit down straight away'], why: 'A clear answer shows you understood the question and backs up your point (SL.7.4, SL.8.4).' },
];

const aloud = (rng: Rng, d: Difficulty) =>
  by(d, [ALOUD.slice(0, 3), ALOUD, ALOUD.slice(1)], [
    ['Punctuation tells you where to pause and how your voice should sound.', 'Words such as shouted or whispered tell you how to read the line.'],
    ['Match your pace and volume to the mood of the text.', 'If a sentence stops making sense, go back and reread it.'],
    ['Read with accuracy, a suitable pace and expression.', 'Commas, question marks and exclamation marks each change your voice.'],
  ])(rng);

const speak = (rng: Rng, d: Difficulty) =>
  by(d, [SPEAK.slice(0, 3), SPEAK, SPEAK.slice(2)], [
    ['Look at your audience, speak clearly and loudly enough to be heard.', 'Choose details that help listeners picture what you mean.'],
    ['Formal occasions need formal English.', 'Leave out fillers such as um, like and stuff.'],
    ['Adapt your speech to the audience and the task.', 'When you answer a question, restate it and give a reason.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------
// Lesson 13.3: Presenting with visuals and media.
// ---------------------------------------------------------------------------------------------

const PLAN: Q[] = [
  { prompt: 'You are giving a report on how a volcano erupts. Which order works best?', right: 'Introduce the topic, explain the stages in order, then conclude', wrong: ['Give the conclusion first, then list facts in any order you like', 'Start with your favourite fact and then answer questions only', 'Show all your pictures first and save the explanation for later'], why: 'A clear report presents its ideas in a logical sequence with an introduction and a conclusion (SL.6.4).' },
  { prompt: 'You have one minute left and three points still to cover. What should you do?', right: 'Give the most important point and sum up the other two briefly', wrong: ['Talk much faster so that you can squeeze in every single word', 'Stop at once and tell the audience to read the rest for themselves', 'Start again from the beginning so that nobody misses anything'], why: 'Good presenters keep to their main ideas and choose what matters most (SL.7.4).' },
  { prompt: 'Which detail is **relevant** to a talk about why bees matter to farmers?', right: 'Bees pollinate many of the crops that farmers grow', wrong: ['Some people are afraid of bees and stay away from them', 'A bee has six legs and two pairs of thin, clear wings', 'Bees appear in many famous stories and cartoons'], why: 'A strong talk uses facts and details that support its main idea (SL.7.4).' },
  { prompt: 'A presenter makes a claim about school lunches. Which choice shows **sound reasoning** to the audience?', right: 'Give the claim, then the survey results that support it', wrong: ['Repeat the claim several times, more loudly each time', 'Say that anyone who disagrees has not been paying attention', 'Tell a joke about lunch and move on to the next slide'], why: 'Presenters support claims with well-chosen evidence and valid reasoning (SL.8.4).' },
];

const MEDIA: Q[] = [
  { prompt: 'Which visual would best help listeners during a talk about how a plant’s numbers of leaves grew over six weeks?', right: 'A line graph of the number of leaves each week', wrong: ['A photo of a sunflower in a field in France', 'A slide with the whole report typed out on it', 'A cartoon of a plant with a smiling face'], why: 'Visual displays should clarify information; a graph shows change over time clearly (SL.5.5).' },
  { prompt: 'What is the main problem with a slide that holds three paragraphs of small text?', right: 'The audience reads it and stops listening to the speaker', wrong: ['Slides can only show pictures, never any words at all', 'It makes the talk too short for the time that is given', 'Paragraphs are only allowed in the conclusion slide'], why: 'Slides should support the speaker with key words and visuals, not replace the talk (SL.6.5).' },
  { prompt: 'Your talk is about the sound of humpback whales. Which multimedia component adds the most?', right: 'A short audio clip of a whale’s song', wrong: ['A photo of a fishing boat in a harbour', 'A list of every ocean in the world', 'A video of dolphins playing at a zoo'], why: 'Multimedia should emphasize or clarify the key point; an audio clip lets listeners hear the song (SL.7.5).' },
  { prompt: 'Which use of a video clip in a presentation is most effective?', right: 'A 30-second clip that shows the step you are explaining', wrong: ['A ten-minute film played while you leave the room', 'A clip with loud music that has nothing to do with the topic', 'Several clips that play one after another with no comment'], why: 'Media should be short, relevant and tied to your point, so it clarifies claims and findings (SL.8.5).' },
  { prompt: 'You use a chart from a website in your slides. What should you add?', right: 'A note on the slide naming the website it came from', wrong: ['Nothing, since charts from websites are free to everyone', 'A different title, so it looks like your own work', 'A warning that the audience must not look at the chart'], why: 'Presenters credit the sources of images and data, just as writers cite their sources.' },
];

const plan = (rng: Rng, d: Difficulty) =>
  by(d, [PLAN.slice(0, 3), PLAN, PLAN.slice(1)], [
    ['Order a report: introduction, main points in sequence, conclusion.', 'Keep only the details that support your main idea.'],
    ['Choose what matters most when time is short.', 'Support every claim with evidence.'],
    ['Sound reasoning means a claim backed by relevant evidence.', 'Ask whether each detail helps the audience understand your point.'],
  ])(rng);

const media = (rng: Rng, d: Difficulty) =>
  by(d, [MEDIA.slice(0, 3), MEDIA, MEDIA.slice(2)], [
    ['A visual should make your point clearer, not just decorate the slide.', 'Graphs show change; photos show what something looks like.'],
    ['Keep slides short so the audience listens to you.', 'Choose media that matches your topic.'],
    ['Media should be brief, relevant and explained by the speaker.', 'Credit the source of every image or chart you borrow.'],
  ])(rng);

// ---------------------------------------------------------------------------------------------
// Lesson 13.4: Writing and publishing with technology.
// ---------------------------------------------------------------------------------------------

const TOOLS: Q[] = [
  { prompt: 'A spell checker finds no errors in this sentence: *“Their going to the park at for o’clock.”* What does this show?', right: 'A spell checker misses real words used wrongly, so proofread too', wrong: ['The sentence is correct, because the spell checker found nothing', 'Spell checkers find every mistake, so no proofreading is needed', 'The sentence needs more commas, which is all a checker misses'], why: '*Their* and *for* are real words, so the checker passes them; only a careful reader catches *They’re* and *four* (W.5.6).' },
  { prompt: 'You and a partner are writing a report in a shared document. Which tool lets you suggest a change without deleting your partner’s words?', right: 'Suggesting or track changes, so your partner can accept or reject it', wrong: ['Deleting their paragraph and typing a whole new one in its place', 'Printing the report and hiding it, so only your version is left', 'Changing the font size, so your partner notices your new words'], why: 'Collaboration tools let writers suggest edits and decide on them together (W.6.6, W.7.6).' },
  { prompt: 'What is the main use of a **comment** in a shared document?', right: 'To leave a note or question about part of the text for a partner', wrong: ['To make the text bigger and bolder so that it is easier to read', 'To delete a paragraph that you think is not needed any more', 'To turn the document into a slide show for the whole class'], why: 'Comments let writers give and answer feedback without changing the text itself (W.7.6).' },
  { prompt: 'You must type a two-page report in one sitting for a class test. What skill does this call for?', right: 'Enough keyboarding skill to type two pages in the time allowed', wrong: ['Knowing how to copy a report that someone else has written', 'Knowing how to draw a picture on every page of the report', 'Knowing how to send the report to a friend for them to type'], why: 'The standards ask Grade 5 students to type at least two pages in a single sitting (W.5.6), and Grade 6 students three (W.6.6).' },
  { prompt: 'Why is it wise to save your work under a new name before a big revision?', right: 'So you can return to the earlier version if you change your mind', wrong: ['So the new file is smaller and loads faster on the computer', 'So the spell checker can find more mistakes in the new copy', 'So your teacher thinks that you wrote two different reports'], why: 'Saving versions protects your work and lets you compare drafts as you revise.' },
];

const PUBLISH: Q[] = [
  { prompt: 'You are publishing a report on a class website. How can you show readers where a fact came from?', right: 'Link the fact to the web page it came from, and list the source', wrong: ['Leave out the source, since readers can search for it themselves', 'Make the fact bold, so readers know it must be a true fact', 'Copy the whole web page into your report, below the fact'], why: 'Online writing can link to sources and cite them, so readers can check the information (W.7.6, W.8.6).' },
  { prompt: 'Which detail should you **leave out** when you publish your writing on a public website?', right: 'Your home address and phone number', wrong: ['The title of your report', 'Your first name or a nickname', 'The date you finished your work'], why: 'Never share private details such as your address or phone number online.' },
  { prompt: 'Your class blog has readers from other schools. A classmate posts a rude reply to a comment. What is the best response?', right: 'Remove or rewrite the reply so it is polite and stays on topic', wrong: ['Post an even ruder reply so the classmate learns a lesson', 'Leave it alone, since rude replies get the blog more readers', 'Delete the whole blog so that no one can read it ever again'], why: 'Writers who publish online keep their writing respectful, because real readers see it.' },
  { prompt: 'You are writing a report to publish online about local birds. How can technology show the relationships between your ideas?', right: 'Use headings and links that take readers from each bird to its habitat', wrong: ['Use a different bright colour for every word in each paragraph', 'Put all the information into one long paragraph with no breaks', 'Add sound effects that play each time a reader scrolls the page'], why: 'Technology can present links between ideas clearly, with headings, links and layout (W.8.6).' },
  { prompt: 'Readers of your online story leave comments pointing out a confusing scene. What does publishing with technology let you do?', right: 'Revise the scene and update the published story in response', wrong: ['Nothing, since a story published online can never be changed', 'Hide all the comments so that nobody else sees the problem', 'Publish the same story again under a completely new title'], why: 'Online publishing lets writers update their work in response to feedback.' },
];

const tools = (rng: Rng, d: Difficulty) =>
  by(d, [TOOLS.slice(0, 3), TOOLS, TOOLS.slice(1)], [
    ['A spell checker misses real words used wrongly, so always proofread.', 'Shared documents let partners suggest and comment.'],
    ['Suggest changes and leave comments rather than deleting a partner’s words.', 'Save versions as you revise.'],
    ['Technology helps you produce, share and revise writing with others.', 'Keyboarding lets you write a long piece in one sitting.'],
  ])(rng);

const publish = (rng: Rng, d: Difficulty) =>
  by(d, [PUBLISH.slice(0, 3), PUBLISH, PUBLISH.slice(1)], [
    ['Link and cite your sources when you publish online.', 'Keep private details such as your address offline.'],
    ['Real readers see what you publish, so keep it respectful.', 'Headings and links show how ideas connect.'],
    ['Published writing can be updated after feedback.', 'Use layout and links to make relationships between ideas clear.'],
  ])(rng);

export const UNIT13_SKILLS: SkillDef[] = [
  skill({ id: 'ex-discussion-prepare', name: 'Preparing for a discussion', description: 'Come to a discussion prepared, agree on rules and roles, and set goals and deadlines.', outcomes: ['US9'], lessonId: 'ex-13-1', gen: prepare }),
  skill({ id: 'ex-discussion-moves', name: 'Taking part in a discussion', description: 'Build on others’ ideas, paraphrase and summarize a speaker, judge a speaker’s reasons, and change a view when the evidence warrants it.', outcomes: ['US9'], lessonId: 'ex-13-1', gen: moves }),
  skill({ id: 'ex-reading-aloud', name: 'Reading aloud', description: 'Read a text aloud with accuracy, a suitable pace and expression, using punctuation and context.', outcomes: ['US10'], lessonId: 'ex-13-2', gen: aloud }),
  skill({ id: 'ex-speaking-clearly', name: 'Speaking clearly to an audience', description: 'Speak clearly with eye contact and relevant details, and adapt speech to the audience and task.', outcomes: ['US10'], lessonId: 'ex-13-2', gen: speak }),
  skill({ id: 'ex-presentation-plan', name: 'Planning a presentation', description: 'Order a report logically, keep the relevant details, and support claims with evidence.', outcomes: ['US11'], lessonId: 'ex-13-3', gen: plan }),
  skill({ id: 'ex-presentation-media', name: 'Visuals and media in a presentation', description: 'Choose visuals and multimedia that clarify a point, and credit their sources.', outcomes: ['US11'], lessonId: 'ex-13-3', gen: media }),
  skill({ id: 'ex-writing-tools', name: 'Writing with technology', description: 'Use spell checkers wisely, shared documents, suggestions and comments, and save versions as you revise.', outcomes: ['US12'], lessonId: 'ex-13-4', gen: tools }),
  skill({ id: 'ex-publishing-online', name: 'Publishing writing online', description: 'Link and cite sources, protect private details, keep writing respectful, and update published work after feedback.', outcomes: ['US12'], lessonId: 'ex-13-4', gen: publish }),
];
