import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e12-4-1',
  lessonId: 'e12-4-1',
  title: 'Rhetorical Strategy and Effect',
  thumbnailTitle: 'Strategy and Effect',
  thumbnail: false,
  summary:
    'A rhetorical strategy is the plan of a whole speech or essay. Learn six common strategies, explain how each part serves the plan, and judge the effect of a choice on a particular audience at a particular moment.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Rhetoric and Argument', title: 'Rhetorical Strategy and Effect', subtitle: 'The plan of the whole, and what it does' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['Both parties deprecated war, but one of them would make war rather than let the nation survive, and the other would accept war rather than let it perish, and the war came.'],
          by: 'Abraham Lincoln, the Second Inaugural Address (1865)',
        },
      ],
      lines: [
        { say: 'In March of eighteen sixty-five, the Civil War was almost won, but Abraham Lincoln refused to blame one side alone.', show: ['title', 'q'] },
        { say: 'Why would a winning leader speak so generously of the enemy? Because he was trying to end the war well, and every sentence serves that one plan. In this lesson, you will name the strategy of a speech, explain how each part serves it, and judge its effect on an audience.' },
      ],
    },
    {
      chapter: 'Strategy: the plan of the whole',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Problem and solution**',
            '**Concession and turn**',
            '**Shared values and demand**',
            '**Story and lesson**',
            '**Point-by-point refutation**',
            '**Dilemma**',
          ],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Cast down your bucket where you are.'], by: 'Booker T. Washington, the Atlanta Exposition Address (1895)' },
      ],
      lines: [
        { say: 'A rhetorical strategy is the overall plan by which a text moves its audience from what they already think to what the writer wants them to think or do.', show: ['b.0', 'b.1', 'b.2', 'b.3', 'b.4', 'b.5'] },
        { say: 'Booker T. Washington opened with a parable about a ship lost at sea, crying out for water. The answer from a friendly vessel was this. The ship was at the mouth of the Amazon River, so the water around it was fresh.', show: 'q', focus: 'b.3' },
        { say: 'That is story and lesson. The image is easy to remember, and the lesson seems to grow out of it.' },
      ],
    },
    {
      chapter: 'How the parts serve the whole',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Both read the same Bible and pray to the same God, and each invokes His aid against the other.'], by: 'Abraham Lincoln, the Second Inaugural Address (1865)' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Strategy**: shared values and demand', '**Job of this sentence**: both sides are alike', '**Demand at the end**: “charity for all”'],
        },
      ],
      lines: [
        { say: 'Once you have named the strategy, ask what job each part does. Lincoln’s strategy is shared values and demand.', show: 'b.0' },
        { say: 'Before he makes his demand, he places both sides on the same ground.', show: 'q' },
        { say: 'If the enemy is like us, then charity toward the enemy seems natural, not weak. So this sentence prepares the victors for his closing demand for charity for all, instead of vengeance.', show: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Effect on an audience',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Kairos', md: 'A Greek word for “the right moment”: the fit between an appeal and its time and place.' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['These are the times that try men’s souls. The summer soldier and the sunshine patriot will, in this crisis, shrink from the service of their country; but he that stands it now, deserves the love and thanks of man and woman.'],
          by: 'Thomas Paine, The American Crisis (1776)',
        },
      ],
      lines: [
        { say: 'The effect of a choice is what it does to a particular audience: what they feel, believe or do because of it. Kairos is the fit between an appeal and its moment.', show: 'def' },
        { say: 'In December of seventeen seventy-six, the American army had lost battle after battle, and many soldiers planned to go home. Thomas Paine’s pamphlet was read aloud in their camps.', show: 'q' },
        { say: 'Paine divides his listeners in two. No soldier wants to be the fair-weather kind, so the effect is to shame anyone tempted to leave, and to honour everyone who stays.', focus: 'q' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Vague**: It grabs the audience’s attention.', '**Precise**: It shames the soldiers who are thinking of going home.'],
        },
      ],
      lines: [
        { say: 'Here is a common mistake. Do not write a vague effect, such as it grabs the audience’s attention, which could be said of almost any sentence.', show: 'b.0' },
        { say: 'Name the audience precisely, and say exactly what the choice makes them feel or do.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Paine contrasts “the summer soldier” with the one who “stands it now”. What is the effect on his soldiers?',
          choices: [
            'It grabs their attention, because the images are vivid.',
            'It warns them that the enemy is stronger than they thought.',
            'It shames those tempted to leave, and honours those who stay.',
            'It praises every soldier alike, so all may go home proud.',
          ],
          answer: 2,
          working: 'No soldier wants to be the fair-weather kind, so the contrast shames anyone tempted to leave and honours those who stay.',
        },
      ],
      lines: [
        { say: 'Your turn. Paine contrasts the summer soldier with the one who stands it now. What is the effect on his soldiers? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. No soldier wants to be the fair-weather kind, so the contrast shames anyone tempted to leave, and honours those who stay.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'A strategy is the plan of a whole text.',
            'Explain each part by the job it does in the plan.',
            'Effect depends on the audience and the moment.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rhetorical strategy is the plan of a whole text.', show: 'sum.0' },
        { say: 'Explain each part by the job it does in the strategy.', show: 'sum.1' },
        { say: 'And the effect of a choice depends on its audience and its moment.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
