/**
 * Grade 8 English, Unit 5: Media (E8-E1). Film techniques, and news and framing. The scenes, reports
 * and headlines are invented for Gradileo.
 */
import { skill } from '../../helpers.ts';
import type { SkillDef } from '../../../types.ts';
import { bank, Q } from './common.ts';

const E1 = ['E8-E1'];

// ---------------------------------------------------------------------------- 5.1 film techniques

const SHOTS = ['A close-up', 'A long shot', 'A low-angle shot', 'A high-angle shot'];
const shot = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'Which camera shot is described?', SHOTS[k], SHOTS.filter((_, i) => i !== k), why, text);

const CAMERA = [
  shot(1, 'The camera fills the screen with a girl’s face as a tear runs down her cheek.', 0, 'A close-up shows a face or object in detail, to show emotion.'),
  shot(1, 'A tiny figure walks across a vast, empty desert.', 1, 'A long shot shows a whole figure in a wide setting.'),
  shot(2, 'The camera looks up at the giant from near his feet, so he towers over the screen.', 2, 'A low angle looks up at a subject and makes it seem powerful.'),
  shot(2, 'The camera looks down at a boy alone in the middle of a huge hall.', 3, 'A high angle looks down and makes a subject seem small or vulnerable.'),
  Q(3, 'What is an establishing shot?', 'A wide shot at the start of a scene showing where it takes place', ['A close-up of an actor’s hands, used during a fight scene', 'The final shot at the very end of a film', 'A shot filmed by the director’s assistant'],
    'An establishing shot sets the scene, such as a city skyline before a scene inside an office.'),
  Q(3, 'Why might a director film a villain from a low angle?', 'To make the villain seem powerful and threatening', ['To make the villain seem small and helpless', 'To hide the villain’s face from the audience', 'To show that the scene is a dream'],
    'Looking up at a character makes them dominate the frame.'),
];

const EFFECTS = [
  Q(1, 'What is diegetic sound?', 'Sound that the characters can hear, such as a door slamming', ['Music added for the audience that the characters cannot hear', 'The silence after a film has ended', 'The voice of the director giving instructions'],
    'Diegetic sound comes from inside the story world. Non-diegetic sound, such as a soundtrack, is added for the audience.'),
  Q(1, 'What mood does dim, shadowy lighting usually create?', 'Mystery or danger', ['Joy and celebration', 'Calm and safety', 'Silliness and fun'],
    'Low-key lighting with deep shadows is used in thrillers and horror to create unease.'),
  Q(2, 'What is a montage?', 'A series of short shots edited together to show time passing', ['One long shot with no cuts at all', 'The list of actors and crew shown at the end of the film', 'A shot taken from very high above'],
    'A training montage, for example, squeezes weeks of practice into a minute.'),
  Q(2, 'Tense music grows louder as a character walks down a dark corridor. What effect does this have?', 'It builds suspense, signalling that danger is near.', ['It tells the audience the scene is a comedy.', 'It shows that the character is happy and relaxed.', 'It means that the film is about to end.'],
    'Non-diegetic music tells the audience how to feel before anything happens.'),
  Q(3, 'A film cuts quickly between shots during a chase. Why?', 'Fast editing creates speed, energy and tension.', ['Fast editing makes the scene feel slow and calm.', 'The director ran out of film to use.', 'Fast cuts show that the chase is a dream.'],
    'The rhythm of editing affects pace; quick cuts make action feel urgent.'),
  Q(3, 'A happy family scene is lit with warm golden light. Later, the same house is shown in cold blue light. What does this suggest?', 'The mood of the family has changed for the worse.', ['The family has bought new light bulbs.', 'The film has switched to a different story.', 'Nothing: lighting has no meaning in film.'],
    'Lighting colour signals mood: warm for comfort, cold for sadness or distance.'),
];

// ---------------------------------------------------------------------------- 5.2 news and framing

const KINDS = ['A news report', 'An opinion column', 'An editorial', 'An advertisement'];
const kind = (d: 1 | 2 | 3, text: string, k: number, why: string) => Q(d, 'What kind of text is this?', KINDS[k], KINDS.filter((_, i) => i !== k), why, text);

const NEWS_OPINION = [
  kind(1, 'The city council voted 7–2 on Tuesday to build a new bridge over the river. Work will begin in March.', 0,
    'It reports facts (who, what, when) without giving the writer’s view: a news report.'),
  kind(1, 'I have lived in this city for forty years, and I believe this bridge is a waste of our money.', 1,
    'A named writer gives a personal view: an opinion column.'),
  kind(2, 'This newspaper believes the council has made the right choice. The bridge will serve our city for a century.', 2,
    'The newspaper itself (“this newspaper believes”) takes a position: an editorial.'),
  Q(2, 'What is the main difference between a news report and an opinion piece?', 'A report aims to inform; an opinion piece argues a view.', ['A report is always longer than an opinion piece.', 'Opinion pieces are never printed in newspapers.', 'A report argues a view; an opinion piece informs.'],
    'News reports try to stay neutral. Opinion pieces openly persuade.'),
  Q(3, 'A news website places an opinion column right beside a news report on the same topic, with no label. Why is this a problem?', 'Readers may mistake opinion for neutral fact.', ['Readers will not be able to read either text.', 'Opinion columns are always factually wrong.', 'It makes the website load more slowly.'],
    'Clear labels help readers know when they are reading a view rather than a report.'),
];

const FRAMING = [
  Q(1, 'What is framing in the news?', 'How a story is presented, which shapes how readers see it', ['The border printed around a photograph on the front page', 'The order in which pages are numbered', 'The name of the newspaper at the top'],
    'Choices about words, images, sources and emphasis frame a story.'),
  Q(2, 'Two headlines report the same strike: “Workers fight for fair pay” and “Strike brings city to standstill”. How are they framed?', 'One focuses on the workers’ cause; the other on the disruption.', ['Both headlines are framed in exactly the same way, with no difference.', 'Neither headline is about the strike at all.', 'Both focus on the weather on the day.'],
    'Framing chooses what to stress. The same event can be a story of justice or of inconvenience.'),
  Q(2, 'A report quotes three people who oppose a new park and nobody who supports it. What does this show?', 'The choice of sources frames the story against the park.', ['The report is perfectly balanced and fair to both sides.', 'Nobody in the town supports the park.', 'Quotations have no effect on a report.'],
    'Whose voices are included shapes how readers judge an issue.'),
  Q(3, 'A photograph of a protest shows only one person shouting, though most were peaceful. How might this frame the story?', 'It makes the protest seem angrier than it was.', ['It shows the protest exactly as it was.', 'It makes the protest seem much calmer.', 'It has no effect at all on how readers see it.'],
    'Choosing an unusual moment as the main image can distort the overall picture.'),
  Q(3, 'Which caption is most neutral for a photo of a flooded road?', 'Floodwater covers Main Street on Monday morning.', ['Council’s failure leaves Main Street underwater.', 'Shocking scenes as Main Street is destroyed.', 'Residents furious as Main Street floods again.'],
    'It states what is shown, when and where, without blame or loaded words.'),
];

// ---------------------------------------------------------------------------- skills

export const MEDIA_SKILLS: SkillDef[] = [
  skill({ id: 'e8-camera-shots', name: 'Camera shots and angles', description: 'Name close-ups, long shots, establishing shots and high and low angles, and explain their effects.', outcomes: E1, lessonId: 'e8-5-1', format: 'mc', gen: bank(CAMERA, ['Close-ups show emotion; long shots show setting.', 'Low angles make subjects powerful; high angles make them small.']) }),
  skill({ id: 'e8-film-effects', name: 'Lighting, sound and editing', description: 'Explain how lighting, sound and editing shape a scene.', outcomes: E1, lessonId: 'e8-5-1', format: 'mc', gen: bank(EFFECTS, ['Diegetic sound is heard by the characters.', 'Ask: how is this choice meant to make the audience feel?']) }),
  skill({ id: 'e8-news-opinion', name: 'News and opinion', description: 'Tell news reports from opinion columns, editorials and adverts.', outcomes: E1, lessonId: 'e8-5-2', format: 'mc', gen: bank(NEWS_OPINION, ['A report informs; an opinion piece argues.', 'An editorial is the newspaper’s own view.']) }),
  skill({ id: 'e8-framing', name: 'Framing the news', description: 'Explain how headlines, sources, images and captions frame a news story.', outcomes: E1, lessonId: 'e8-5-2', format: 'mc', gen: bank(FRAMING, ['Ask: what does this story stress, and whose voices are heard?', 'Compare loaded words with neutral ones.']) }),
];
