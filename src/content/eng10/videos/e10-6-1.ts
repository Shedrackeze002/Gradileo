import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-6-1',
  lessonId: 'e10-6-1',
  title: 'The Personal Response',
  thumbnail: false,
  summary:
    'A personal response explores what a text made you think, feel or realize, not just what happens in it. Learn to make connections that matter and to build a response around one controlling idea.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing', title: 'The Personal Response', subtitle: 'Say what a text made you think' }],
      lines: [
        { say: 'Imagine a friend asks what you thought of a film. If you answer “It was good”, the conversation ends. If you say what it reminded you of, a real conversation begins.', show: 'title' },
        { say: 'A personal response to a text works the same way. In this lesson you will tell a response from a summary, make connections that matter, and build a response around one clear controlling idea.' },
      ],
    },
    {
      chapter: 'Response, not summary',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Personal response', md: 'Explores **your own thinking** about a text: what it made you feel, what it reminded you of, what it made you realize or question.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '*Della sells her long hair for twenty dollars so that she can buy Jim a chain for his watch.* **Summary**',
            '*When my cousin sold her bike to pay for my birthday trip, I understood Della at last: a gift means most when the giver has given up something they love.* **Response**',
          ],
        },
      ],
      lines: [
        { say: 'A personal response explores your own thinking about a text: what it made you feel, remember, realize or question.', show: 'def' },
        { say: 'A summary only reports what happens, and your reader has usually read the story too.' },
        { say: 'Compare two sentences about “The Gift of the Magi”. The first only reports what Della does, so it is a summary.', show: 'b.0', focus: 'b.0' },
        { say: 'The second brings in the writer’s own life and says what the writer learned, so it is a response. The word “I” alone is not enough: “I think the story is about Della selling her hair” is still a summary.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Connections that matter',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'k', items: ['**Text to self**: an experience from your own life', '**Text to world**: something happening in your community or the wider world', '**Text to text**: another story, poem, film or song'] },
        { kind: 'callout', id: 'rule', tone: 'tip', title: 'A strong connection', md: 'Links something **specific** in the text to something specific in your life, and says **why the link matters**.' },
      ],
      lines: [
        { say: 'Most responses grow from a connection: text to self, text to world, or text to text.', show: 'k' },
        { say: 'A strong connection links something specific in the text to something specific in your life, and says why the link matters.', hide: 'k', show: 'rule' },
      ],
    },
    {
      chapter: 'Building a connection',
      layout: 'center',
      main: [
        { kind: 'text', id: 'weak', md: 'Weak: *I have also had a wish that came true.*', size: 'lg' },
        { kind: 'bullets', id: 'steps', items: ['The Whites wish for two hundred pounds, and the money arrives as compensation for their son’s death.', 'A phone you begged for, which then took over your evenings.', 'Getting what you want can cost more than you expected.'] },
        { kind: 'text', id: 'ans', md: '*The Whites’ first wish reminded me of the time I begged for a phone and then spent every evening glued to it instead of talking to my family; getting what you want can cost more than you expect.*', size: 'md' },
      ],
      lines: [
        { say: 'Let’s improve a weak connection about “The Monkey’s Paw”: I have also had a wish that came true.', show: 'weak' },
        { say: 'First, name something specific in the story: the Whites wish for money, and it arrives as compensation for their son’s death.', show: 'steps.0' },
        { say: 'Next, name something from your own life: a phone you begged for, which then took over your evenings.', show: 'steps.1' },
        { say: 'Last, say what the link shows: getting what you want can cost more than you expected. Now the connection has a point.', hide: ['weak', 'steps'], show: 'ans' },
      ],
    },
    {
      chapter: 'The controlling idea',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Controlling idea', md: 'The one insight that holds the whole response together, stated in a **complete sentence**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Topic', 'Controlling idea'],
          rows: [['Freedom', 'Mrs. Mallard’s hour of freedom made me realize that even people who love us can stop us from living our own lives']],
        },
      ],
      lines: [
        { say: 'The controlling idea is the one insight that holds your response together, in a complete sentence.', show: 'def' },
        { say: 'Freedom is only a topic. Mrs. Mallard’s hour of freedom made me realize that even people who love us can stop us from living our own lives: that is a controlling idea.', show: 't' },
        { say: 'It names the topic, says something about it, and links the text to the writer’s own thinking.', focus: 't.0' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'The connection that wanders off', md: 'A personal story grows so long that the text disappears. If a paragraph about your grandmother’s cooking never comes back to the story, it has stopped being a response.' }],
      lines: [
        { say: 'A common mistake is the connection that wanders off: the personal story grows so long that the text disappears.', show: 'm' },
        { say: 'Keep returning to a specific moment in the text, and keep asking what the connection shows.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which sentence is a personal response to “The Gift of the Magi”, rather than a summary?',
          choices: [
            'Della sells her long hair so that she can buy Jim a chain.',
            'Della’s sacrifice reminded me of my cousin’s bike, and I saw that real gifts cost something.',
            'I think the story is about Della selling her hair for Jim.',
            'The story takes place at Christmas and has a husband and wife.',
          ],
          answer: 1,
          working: 'Only choice B brings in the writer’s own life and says what the writer learned. The others only report what happens in the story.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these four sentences is a personal response to “The Gift of the Magi”, rather than a summary? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. It brings in the writer’s own life and says what the writer learned. Choice C has the word I, but it still only reports what happens.', show: 'q.answer' },
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
          items: ['A response explores what a text made you think; a summary retells it.', 'A strong connection is specific and says why it matters.', 'The controlling idea is a complete sentence, not a topic word.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A response explores what the text made you think; a summary only retells it.', show: 'sum.0' },
        { say: 'A strong connection is specific, and says why it matters.', show: 'sum.1' },
        { say: 'And a controlling idea is a complete sentence, never just a topic word.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
