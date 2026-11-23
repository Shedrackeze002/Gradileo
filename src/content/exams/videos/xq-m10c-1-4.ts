import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 1.4 (converting between SI and imperial units): a Canadian road
// sign says 100 kilometres; how many miles is that? The question is OpenStax Prealgebra 2e's own
// worked example, word for word (section 7.5, Systems of Measurement, CC BY-NC-SA 4.0), which uses
// the book's equivalence 1 mile ≈ 1.61 kilometres: 100 ÷ 1.61 ≈ 62.1, so about 62 miles.

const QUESTION = 'Soleil lives in Minnesota but often travels in Canada for work. While driving on a Canadian highway, she passes a sign that says the next rest stop is in 100 kilometers. How many miles until the next rest stop? Round your answer to the nearest mile.';

const video: Explainer = {
  id: 'xq-m10c-1-4',
  lessonId: '',
  exam: {
    lesson: 'm10c-1-4',
    source: 'OpenStax, Prealgebra 2e, Example in section 7.5, Systems of Measurement',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/7-5-systems-of-measurement',
    question: QUESTION,
  },
  title: 'Exam Question: 100 Kilometres to the Rest Stop. How Many Miles?',
  thumbnailTitle: 'Kilometres to Miles',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a Canadian road sign says the next rest stop is 100 kilometres away, and we find how many miles that is. We use 1 mile ≈ 1.61 kilometres as a unit conversion factor, cancel the units, divide and round. Then we look at the trap of multiplying when you should divide.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Kilometres to Miles', subtitle: 'Converting between SI and imperial units, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about turning kilometres into miles. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'about 62 miles', working: '$100\\text{ km} \\times \\dfrac{1\\text{ mi}}{1.61\\text{ km}} \\approx 62.1$ mi, so about $62$ miles.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Soleil lives in Minnesota but often travels in Canada for work. While driving on a Canadian highway, she passes a sign that says the next rest stop is in 100 kilometres. How many miles until the next rest stop? Round your answer to the nearest mile.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'lg', md: '$100$ **kilometres** $= \\ ?$ **miles**' },
        { kind: 'text', id: 'b', size: 'md', md: 'A mile is **longer** than a kilometre, so there will be **fewer** miles than kilometres.' },
      ],
      lines: [
        { say: 'Canada measures roads in kilometres, and the United States in miles. The question asks how many miles 100 kilometres is.', show: 't' },
        { say: 'Before we start, think about the size. A mile is longer than a kilometre, so it takes fewer miles to cover the same road. The answer must be less than 100.', show: 'b' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['1\\text{ mile} \\approx 1.61\\text{ kilometres}', '\\dfrac{1\\text{ mi}}{1.61\\text{ km}} \\approx 1'] },
        { kind: 'text', id: 'c', size: 'md', md: 'Multiply by a fraction worth 1, with the unit you want on **top** and the unit you have on the **bottom**, so it cancels.' },
      ],
      lines: [
        { say: 'Here is what we need. The textbook\'s table says 1 mile is about 1.61 kilometres.', show: 'f.0' },
        { say: 'So 1 mile over 1.61 kilometres is a fraction worth 1. It is called a unit conversion factor.', show: 'f.1' },
        { say: 'Multiplying by 1 does not change a length. Put the unit you want on top, and the unit you have on the bottom, so the unit you have cancels.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Multiply by $\\dfrac{1\\text{ mi}}{1.61\\text{ km}}$', '**Cancel** the kilometres', 'Divide, then round to the nearest **mile**'] }],
      lines: [
        { say: 'Here is the plan. First, multiply 100 kilometres by the conversion factor.', show: 'plan.0' },
        { say: 'Second, cancel the kilometres.', show: 'plan.1' },
        { say: 'Third, divide and round to the nearest mile.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The conversion factor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['100\\text{ km} \\times \\dfrac{1\\text{ mi}}{1.61\\text{ km}}', '= \\dfrac{100}{1.61}\\text{ mi}'] }],
      lines: [
        { say: 'Step one. Multiply 100 kilometres by 1 mile over 1.61 kilometres.', show: 'm.0' },
        { say: 'Kilometres are on the top and on the bottom, so they cancel, and miles are left. We have 100 divided by 1.61 miles.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Divide and round',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['100 \\div 1.61 \\approx 62.11', '\\approx \\good{62\\text{ miles}}'] }],
      lines: [
        { say: 'Step two. 100 divided by 1.61 is about 62.11.', show: 'm.0' },
        { say: 'To the nearest mile, that is 62 miles to the next rest stop.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['62 \\times 1.61 \\approx 99.8\\text{ km} \\approx 100 \\ \\checkmark', '62 < 100 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by going back the other way. 62 miles times 1.61 is about 99.8 kilometres, which is about 100. It matches.', show: 'm.0' },
        { say: 'And 62 is less than 100, as we expected, because a mile is longer than a kilometre.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Answer it gives'],
          rows: [
            ['Multiplying by $1.61$ instead of dividing', '$161$ miles: more than 100, so it cannot be right'],
            ['Cutting off the decimals', 'fine here, but $62.6$ would round to $63$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Multiplying by 1.61 instead of dividing gives 161 miles. That is more than 100, and we know the answer must be less, so it cannot be right. Writing the units in the conversion factor shows you which way round to use it.' },
        { say: 'And round properly. Here 62.11 rounds to 62, but a number like 62.6 would round up to 63.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A road sign says the next town is 80 km away. Using 1 mile ≈ 1.61 km, how many miles is that, to the nearest mile?',
          choices: ['129 miles', '50 miles', '49 miles', '80 miles'],
          answer: 1,
          working: '$80 \\div 1.61 \\approx 49.69$, which rounds to $50$ miles.',
        },
      ],
      lines: [
        { say: 'Your turn. A road sign says the next town is 80 kilometres away. Using 1 mile is about 1.61 kilometres, how many miles is that, to the nearest mile? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '80 divided by 1.61 is about 49.69, which rounds up to 50 miles. That is choice B. 129 multiplied instead of dividing, and 49 cut off the decimals instead of rounding.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$1$ mile $\\approx 1.61$ km', 'Multiply by a conversion factor worth 1', 'The unit you **have** goes on the **bottom**, so it cancels', 'Check the size: fewer miles than kilometres'] }],
      lines: [
        { say: 'Here is what to remember. 1 mile is about 1.61 kilometres.', show: 'sum.0' },
        { say: 'To convert, multiply by a conversion factor worth 1.', show: 'sum.1' },
        { say: 'Put the unit you have on the bottom, so it cancels.', show: 'sum.2' },
        { say: 'And check the size of your answer: there are always fewer miles than kilometres. For more on converting between SI and imperial units, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
