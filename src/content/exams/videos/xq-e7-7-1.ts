import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 7.1 (the paragraph). An exam-style question we wrote, in the style of a
// Grade 7 writing test, on a paragraph we wrote. The answer is C: the sentence about a cousin's dog
// does not support the topic sentence about why cats make good pets for busy families.

const PARA = [
  '(1) Cats make excellent pets for busy families. (2) They do not need to be walked, so owners can leave them alone during the school day. (3) My cousin’s dog once chewed a whole sofa. (4) Cats also keep themselves clean, which saves time on bathing.',
];

export default englishExam({
  lesson: 'e7-7-1',
  ...ours('a Grade 7 writing test', 'the paragraph is by Gradileo'),
  title: 'Which Sentence Does Not Belong in the Paragraph?',
  thumbnailTitle: 'Paragraph Unity',
  subtitle: 'Topic sentences and unity, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a paragraph argues that cats suit busy families, and one sentence wanders off topic. We find the topic sentence, test every other sentence against it, and spot the one that breaks the paragraph’s unity.',
  intro: [
    'In this video, we solve an exam-style writing question about paragraphs. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its paragraph ourselves, in the style of a Grade 7 writing test.',
  ],
  passage: {
    lines: PARA,
    by: 'A paragraph written for Gradileo',
    say: ['First, read the paragraph. One: Cats make excellent pets for busy families. Two: They do not need to be walked, so owners can leave them alone during the school day. Three: My cousin’s dog once chewed a whole sofa. Four: Cats also keep themselves clean, which saves time on bathing.'],
  },
  question: {
    prompt: 'Which sentence should be **removed** to keep the paragraph **unified**?',
    text: 'Read the paragraph about cats. Which sentence should be removed to keep the paragraph unified?',
    choices: ['sentence 1', 'sentence 2', 'sentence 3', 'sentence 4'],
    answer: 2,
    working: 'Sentence 3 is about a **dog**, and does not explain why **cats** suit **busy families**.',
    say: ['Which sentence should be removed to keep the paragraph unified? A: sentence one. B: sentence two. C: sentence three. D: sentence four.'],
  },
  ask: [
    ['A **unified** paragraph sticks to **one** main idea', 'A unified paragraph sticks to one main idea.'],
    ['Which sentence **breaks** that?', 'We need the sentence that breaks that unity.'],
  ],
  know: {
    title: 'Topic sentences and unity',
    md: 'The **topic sentence** states the paragraph’s **main idea**, usually **first**. Every other sentence should **support** it with reasons, examples or details. A paragraph is **unified** when nothing wanders **off topic**.',
    say: [
      'Here is the idea we need. The topic sentence states the paragraph’s main idea, and it usually comes first.',
      'Every other sentence should support it with reasons, examples or details. A paragraph is unified when nothing wanders off topic.',
    ],
  },
  plan: [
    ['Find the **topic sentence**', 'Here is the plan. First, find the topic sentence.'],
    ['Test each sentence: does it **support** it?', 'Second, test each sentence: does it support the topic sentence?'],
  ],
  steps: [
    scene('Step 1: The topic sentence', [quote('p', ['[[good:(1) Cats make excellent pets for busy families.]]']), text('n', 'Main idea: why **cats** suit **busy families**')], [
      { say: 'Step one. Sentence one states the main idea: cats make excellent pets for busy families. That is the topic sentence, so it must stay.', show: ['p', 'n'] },
    ]),
    scene('Step 2: Test each sentence', [table('t', ['Sentence', 'Supports the main idea?'], [['(2) no walks; can be left alone', '[[good:✓ saves busy families time]]'], ['(3) my cousin’s dog chewed a sofa', '[[bad:✗ about a dog, not cats]]'], ['(4) cats keep themselves clean', '[[good:✓ saves time on bathing]]']]), text('a', 'Remove **sentence 3**: **C**')], [
      { say: 'Step two. Sentence two: cats need no walks. That saves busy families time. It supports the main idea.', show: 't.0' },
      { say: 'Sentence four: cats keep themselves clean, which also saves time. It supports it too.', show: 't.2' },
      { say: 'Sentence three is about a dog chewing a sofa. It is a funny story, but it tells us nothing about why cats suit busy families. The answer is C.', show: ['t.1', 'a'], focus: 't.1' },
    ]),
  ],
  check: [
    ['Read it **without** sentence 3', 'Let us check. Read the paragraph without sentence three. It flows smoothly from one reason to the next.'],
    ['The paragraph is now **unified**', 'Now every sentence supports the main idea. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'That is the **topic sentence**: it must stay', 'Choice A is the trap. Sentence one might look like it could go, but it is the topic sentence.'],
      ['B', 'Gives a **reason**', 'Choice B gives a clear reason.'],
      ['D', 'Gives **another** reason', 'Choice D gives another reason.'],
    ],
  },
  yourTurn: {
    prompt: 'Which would make the best **topic sentence** for a paragraph about the benefits of learning a second language?',
    choices: ['Learning a second language brings many benefits, from new friendships to better job prospects.', 'French is spoken in Canada.', 'My teacher speaks Spanish.', 'There are many languages.'],
    answer: 0,
    working: 'A states the **main idea** the paragraph will support.',
    ask: 'Which would make the best topic sentence for a paragraph about the benefits of learning a second language? A: Learning a second language brings many benefits, from new friendships to better job prospects. B: French is spoken in Canada. C: My teacher speaks Spanish. D: There are many languages.',
    reveal: 'The answer is A. It states the main idea, and even previews the details the paragraph will give. The others are single facts.',
  },
  sum: [
    ['The **topic sentence** states the **main idea**', 'Here is what to remember. The topic sentence states the main idea.'],
    ['Every other sentence must **support** it', 'Every other sentence must support it.'],
    ['Remove anything **off topic**, however interesting', 'Remove anything off topic, however interesting it is. For more on the paragraph, watch this lesson’s explainer video on Gradileo.'],
  ],
});
