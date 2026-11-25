import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 1.1 (place value to millions). The question is an Exercise from
// OpenStax Prealgebra 2e, word for word with its instruction (section 1.1, Introduction to Whole
// Numbers, CC BY-NC-SA 4.0). 2,617,176 has 2 millions, 617 thousands and 176 ones, so it is "two
// million, six hundred seventeen thousand, one hundred seventy-six", as in the book's answer.

const QUESTION = 'Name each number in words. The U.S. Census estimate of the population of Miami-Dade county was 2,617,176.';

const video: Explainer = {
  id: 'xq-m5-1-1',
  lessonId: '',
  exam: {
    lesson: 'm5-1-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 1.1, Introduction to Whole Numbers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/1-1-introduction-to-whole-numbers',
    question: QUESTION,
  },
  title: 'Exam Question: A Big Number in Words (Place Value)',
  thumbnailTitle: 'Can You Say This Number?',
  summary:
    'A real test question, solved one small step at a time: the population of Miami-Dade county was 2,617,176. How do we write that number in words? We split it into periods of three digits with a place value chart, name each period, and get two million, six hundred seventeen thousand, one hundred seventy-six. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Can You Say This Number?', subtitle: 'Place value, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about place value. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Name each number in words. The U.S. Census estimate of the population of Miami-Dade county was $2{,}617{,}176$.',
          answer: 'two million, six hundred seventeen thousand, one hundred seventy-six',
          working: '2 millions, 617 thousands, 176 ones',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Name the number in words. The United States census estimate of the population of Miami-Dade county was this number.', caption: 'Name the number in words. The U.S. Census estimate of the population of Miami-Dade county was 2,617,176.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['2{,}617{,}176'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Name in words', md: 'We write the number the way we **say** it, using **words**, not digits. Each digit is worth an amount that depends on its **place**.' },
      ],
      lines: [
        { say: 'Here is the number. It has 7 digits, so it is in the millions.', show: 'm' },
        { say: 'The question wants us to write it the way we say it, in words. To do that, we need to know what each digit is worth, which depends on its place.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Millions', 'Thousands', 'Ones'],
          rows: [['$\\text{H}\\ \\text{T}\\ \\text{O}$', '$\\text{H}\\ \\text{T}\\ \\text{O}$', '$\\text{H}\\ \\text{T}\\ \\text{O}$']],
        },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Periods', md: 'The places come in groups of **three**, called **periods**: hundreds, tens and ones. The **commas** split the periods.' },
      ],
      lines: [
        { say: 'Here is what we need. Places come in groups of three, called periods. From the right, they are the ones period, the thousands period and the millions period.', show: 't' },
        { say: 'Each period has a hundreds, a tens and a ones place. And the commas in a number split it into its periods.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Split the number into **periods** at the commas', 'Name the number in **each** period', 'Add the **period name** after each one'] }],
      lines: [
        { say: 'Here is the plan. Split the number into periods, at the commas.', show: 'plan.0' },
        { say: 'Name the number in each period, as if it stood alone.', show: 'plan.1' },
        { say: 'Then add the period name after each one, except the ones period.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: In words',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Period', 'Digits', 'In words'],
          rows: [
            ['Millions', '$2$', 'two **million**'],
            ['Thousands', '$617$', 'six hundred seventeen **thousand**'],
            ['Ones', '$176$', 'one hundred seventy-six'],
          ],
        },
        { kind: 'text', id: 'a', md: '**two million, six hundred seventeen thousand, one hundred seventy-six**' },
      ],
      lines: [
        { say: 'Step one. The commas split the number into three periods: 2, then 617, then 176.', show: 't' },
        { say: 'Step two. The millions period holds 2. So that part is two million.', focus: 't.0' },
        { say: 'The thousands period holds 617. So that part is six hundred seventeen thousand.', focus: 't.1' },
        { say: 'The ones period holds 176. We read it as one hundred seventy-six, with no period name after it.', focus: 't.2' },
        { say: 'Step three. Put the parts together, with a comma after each period name. The answer is two million, six hundred seventeen thousand, one hundred seventy-six.', show: 'a', focus: 'a' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2{,}000{,}000 + 617{,}000 + 176', '= 2{,}617{,}176 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by turning the words back into digits. Two million, plus six hundred seventeen thousand, plus one hundred seventy-six.', show: 'm.0' },
        { say: 'That makes our number again. It checks out.', caption: 'That makes 2,617,176 again. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['two hundred sixty-one thousand…', 'split from the **left**: commas split from the **right**'],
            ['two million, six hundred seventeen, one hundred seventy-six', 'left out the period name **thousand**'],
            ['…one hundred **and** seventy-six', 'we do not say **and** in a whole number'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Splitting the digits from the left gives the wrong periods. Count the periods from the right, or just use the commas.' },
        { say: 'Leaving out the word thousand makes a different, much smaller number. Every period except the ones gets its name.' },
        { say: 'And in a whole number, we do not say and. The word and is used for the decimal point.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A city has a population of $4{,}052{,}308$. Which shows the number in words?',
          choices: ['four million, fifty-two thousand, three hundred eight', 'four million, five hundred two thousand, three hundred eight', 'four hundred five million, two thousand, three hundred eight', 'four million, fifty-two, three hundred eight'],
          answer: 0,
          working: '4 millions, 052 thousands, 308 ones.',
        },
      ],
      lines: [
        { say: 'Your turn. A city has a population of this number. Which shows the number in words? Pause the video and try it.', caption: 'Your turn. A city has a population of 4,052,308. Which shows the number in words? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The millions period holds 4, the thousands period holds 52, and the ones period holds 308. That is four million, fifty-two thousand, three hundred eight. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Places come in **periods** of three', 'The **commas** split the periods', 'Name each period, then say its **name**', 'No **and** in a whole number'] }],
      lines: [
        { say: 'Here is what to remember. Places come in periods of three.', show: 'sum.0' },
        { say: 'The commas split the periods.', show: 'sum.1' },
        { say: 'Name the number in each period, then say the period name.', show: 'sum.2' },
        { say: 'And do not say and in a whole number. For more on place value, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
