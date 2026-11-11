import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-2-1',
  lessonId: 'ex-2-1',
  title: 'Writing an Article, a Letter and a Speech',
  thumbnailTitle: 'Article, Letter, Speech',
  thumbnail: false,
  summary:
    'Before you plan, find the form, the audience and the purpose in the task. An article has a headline and subheadings, a formal letter has a greeting and a matching sign-off, and a speech greets and guides its listeners. All three need a formal register: standard English with no slang and no insults.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Writing in a Form', title: 'Article, Letter, Speech', subtitle: 'Matching the form to the reader' }],
      lines: [
        { say: 'You have a strong opinion, and the reasons to back it. Now the task adds one more demand: write it as a letter to your headteacher, or as an article, or as a speech.', show: 'title' },
        { say: 'The argument may be the same in all three, but a letter that begins, good morning, everyone, has gone wrong before its first point. In this lesson, you will learn the features of each form.' },
      ],
    },
    {
      chapter: 'Form, audience and purpose',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Form', md: 'The **kind of text** a piece of writing is: an article, a letter, a speech, a review. Each form has features that readers expect.' },
        { kind: 'text', id: 'task', size: 'md', md: '*“Write a letter to your headteacher arguing that homework should be optional.”*' },
        { kind: 'table', id: 't', head: ['', 'Question to ask', 'In this task'], rows: [['**Form**', 'What kind of text?', 'A letter'], ['**Audience**', 'Who will read or hear it?', 'The headteacher'], ['**Purpose**', 'What is it for?', 'To argue']] },
      ],
      lines: [
        { say: 'The form of a piece of writing is the kind of text it is: an article, a letter, a speech or a review. Each form has features that readers expect.', show: 'def' },
        { say: 'Every writing task tells you three things, so find them before you plan. The form: what kind of text? The audience: who will read or hear it? And the purpose: what is it for?', show: ['task', 't'], focus: 't' },
      ],
    },
    {
      chapter: 'The article',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['A **headline** that catches the eye: *Homework: Time to Close the Book?*', 'A **strapline** that sums up the piece in a sentence', 'An **opening paragraph** that hooks the reader', '**Subheadings** that divide the text', 'A **final paragraph** with a strong last thought'] },
      ],
      lines: [
        { say: 'An article is written to be read on a page or a screen, by readers who can stop at any moment. So it has a headline that catches the eye, and under it a strapline that sums up the piece in a sentence.', show: ['b.0', 'b.1'] },
        { say: 'It has an opening paragraph that hooks the reader, subheadings that divide the text, and a final paragraph that leaves a strong last thought.', show: ['b.2', 'b.3', 'b.4'], focus: ['b.2', 'b.3', 'b.4'] },
        { say: 'An article has no greeting and no sign-off, and it does not thank anyone.' },
      ],
    },
    {
      chapter: 'The formal letter',
      layout: 'split',
      left: [
        { kind: 'bullets', id: 'b', items: ['The sender’s **address and the date**', 'A **greeting**', 'Why you are writing', 'One reason in each paragraph', 'What you want to happen', 'A **sign-off** and your name'] },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sign-off', md: 'The polite phrase that ends a letter, above the writer’s name.' },
        { kind: 'table', id: 't', head: ['The letter begins', 'It ends'], rows: [['*Dear Mrs Castellano,*', '*Yours sincerely,*'], ['*Dear Sir or Madam,*', '*Yours faithfully,*']] },
      ],
      lines: [
        { say: 'A letter is written to one reader. It has the sender’s address and the date at the top, then a greeting.', show: ['b.0', 'b.1'] },
        { say: 'The opening paragraph says why you are writing. Each paragraph gives one reason, and the final paragraph says what you want to happen.', show: ['b.2', 'b.3', 'b.4'], focus: ['b.2', 'b.3', 'b.4'] },
        { say: 'It ends with a sign-off, the polite phrase above the writer’s name.', show: ['b.5', 'def'], focus: ['b.5', 'def'] },
        { say: 'The sign-off depends on the greeting. A letter that begins with a name ends, yours sincerely. A letter that begins, dear Sir or Madam, ends, yours faithfully.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'The speech',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['A **greeting** to the audience: *Good morning, everyone.*', 'An **opening** that grabs attention', '**Signposts**: *My second point is this.*', '**Direct address**: *you*, *we*, *all of us in this hall*', 'A **call to action**, then a **thank-you**'] },
      ],
      lines: [
        { say: 'A speech is written to be heard. Listeners cannot look back up the page, so a speech guides them. It greets the audience, and opens with something that grabs attention, such as a question or a surprising fact.', show: ['b.0', 'b.1'] },
        { say: 'It uses signposts, such as, my second point is this. It speaks to the listeners directly, as you and we. And it ends with a call to action, then a thank-you.', show: ['b.2', 'b.3', 'b.4'], focus: ['b.2', 'b.3', 'b.4'] },
      ],
    },
    {
      chapter: 'Register',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Register', md: '**How formal the language is.** It should fit the audience.' },
        { kind: 'table', id: 't', head: ['Informal', 'Formal'], rows: [['*The buses round here are a total joke and nobody can be bothered to fix them.*', '*The local bus service is unreliable, and the problem has not been addressed.*']] },
      ],
      lines: [
        { say: 'Register is how formal the language is, and it should fit the audience. All three forms are written for the public, or for someone in authority, so they need standard English, with no slang and no insults.', show: 'def' },
        { say: 'The buses round here are a total joke becomes, the local bus service is unreliable. Formal does not mean harsh or long-winded. It means precise, polite and measured, with the meaning unchanged.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A formal letter begins “Dear Sir or Madam,”. How should it end?',
          choices: ['Yours faithfully,', 'Yours sincerely,', 'Thank you for listening.', 'Best wishes,'],
          answer: 0,
          working: '“Yours faithfully” goes with “Dear Sir or Madam”. “Yours sincerely” goes with a name.',
        },
      ],
      lines: [
        { say: 'Your turn. A formal letter begins, dear Sir or Madam. How should it end? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, yours faithfully. Yours sincerely, choice B, goes with a name. And choice C, thank you for listening, belongs at the end of a speech.', show: 'q.answer' },
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
            'Find the form, the audience and the purpose before you plan.',
            'Article: headline, strapline, subheadings; no greeting or sign-off.',
            'Letter: address, date, greeting and a matching sign-off.',
            'Speech: greeting, signposts, direct address, call to action, thank-you.',
            'Use a formal register: no slang, no insults.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Before you plan, find the form, the audience and the purpose.', show: 'sum.0' },
        { say: 'An article has a headline, a strapline and subheadings, with no greeting or sign-off.', show: 'sum.1' },
        { say: 'A formal letter has the address, the date, a greeting, and a sign-off that matches it.', show: 'sum.2' },
        { say: 'A speech greets its listeners, signposts its points, and ends with a call to action and a thank-you.', show: 'sum.3' },
        { say: 'And all three use a formal register, with no slang and no insults.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
