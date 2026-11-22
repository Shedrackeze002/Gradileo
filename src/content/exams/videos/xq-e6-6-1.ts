import { englishExam, ks2, ks2Intro, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 6.1 (pronouns). The question is the Standards and Testing Agency's own,
// word for word: 2024 key stage 2 English grammar, punctuation and spelling test, Paper 1, question
// 15, reused under the Open Government Licence v3.0. The answer is "riders": the riders are the
// people who pushed themselves along, so "themselves" stands for them.

export default englishExam({
  lesson: 'e6-6-1',
  ...ks2(2024, 15),
  title: 'Which Noun Does the Pronoun “Themselves” Refer To?',
  thumbnailTitle: 'Pronouns',
  subtitle: 'Pronouns and antecedents, step by step',
  summary:
    'A real test question, solved one small step at a time: early bicycles had no pedals, so riders had to push themselves along, and we must find the noun that “themselves” refers to. We list the nouns, check which ones agree with the pronoun, and test each one in its place.',
  intro: ks2Intro('pronouns'),
  question: {
    prompt: 'Look at the underlined pronoun in the sentence below. Circle the noun that it refers to.<br>Early bicycles did not have pedals, so riders had to push <u>themselves</u> along using their feet.',
    text: 'Look at the underlined pronoun in the sentence below. Circle the noun that it refers to. Early bicycles did not have pedals, so riders had to push themselves along using their feet.',
    answer: 'riders',
    working: '**Themselves** stands for the people doing the pushing: the **riders**.',
    say: [
      'Look at the underlined pronoun in the sentence below. Circle the noun that it refers to.',
      'Early bicycles did not have pedals, so riders had to push themselves along using their feet. The underlined pronoun is themselves.',
    ],
  },
  ask: [
    ['**Themselves** is a pronoun: it stands for a noun', 'Themselves is a pronoun, so it stands in for a noun.'],
    ['Find the noun it **refers to**', 'Our job is to find which noun in the sentence it refers to.'],
  ],
  know: {
    title: 'Pronouns and antecedents',
    md: 'A **pronoun** (*he*, *it*, *they*, *themselves*) takes the place of a noun. The noun it refers to is its **antecedent**. The pronoun must **agree** with it: one or more than one, a person or a thing.',
    say: [
      'Here is the idea we need. A pronoun, like he, it, they or themselves, takes the place of a noun, so we do not have to repeat it.',
      'The noun a pronoun refers to is called its antecedent. The two must agree: if the noun means more than one, the pronoun must too, and themselves is used for people doing something to their own selves.',
    ],
  },
  plan: [
    ['List the **nouns** in the sentence', 'Here is the plan. First, list the nouns in the sentence.'],
    ['Keep the ones that **agree** with *themselves*', 'Second, keep only the nouns that agree with themselves.'],
    ['Test the noun **in place** of the pronoun', 'Third, put the noun in place of the pronoun to check.'],
  ],
  steps: [
    scene('Step 1: The nouns', [quote('p', ['Early [[theta:bicycles]] did not have [[theta:pedals]], so [[theta:riders]] had to push <u>themselves</u> along using their [[theta:feet]].']), text('n', 'Four nouns: **bicycles**, **pedals**, **riders**, **feet**')], [
      { say: 'Step one. Pause and find the nouns in the sentence.', show: 'p', wait: 3 },
      { say: 'There are four: bicycles, pedals, riders and feet.', show: 'n' },
    ]),
    scene('Step 2: Who did the pushing?', [table('t', ['Noun', 'Could it push **itself** along?'], [['bicycles', '[[bad:✗ they had no pedals, and were pushed]]'], ['pedals', '[[bad:✗ there were none]]'], ['riders', '[[good:✓ the people doing the pushing]]'], ['feet', '[[bad:✗ the feet did the pushing, for the riders]]']])], [
      { say: 'Step two. All four nouns mean more than one, so we must look at the meaning. Themselves refers back to whoever did the pushing.', show: 't.0' },
      { say: 'The bicycles did not push themselves: they were pushed. And there were no pedals at all.', show: 't.1' },
      { say: 'The riders did the pushing, so themselves means the riders.', show: 't.2', focus: 't.2' },
      { say: 'The feet were what the riders used, not who was pushed along.', show: 't.3' },
    ]),
    scene('Step 3: Test it in place', [quote('s', ['…so [[good:riders]] had to push [[good:the riders]] along using their feet.']), text('a', 'It makes sense. Circle **riders**.')], [
      { say: 'Step three. Put the riders in place of themselves: riders had to push the riders along using their feet. Clumsy, but the meaning is right.', show: 's' },
      { say: 'So we circle riders.', show: 'a' },
    ]),
  ],
  check: [
    ['The subject of *push* is **riders**', 'Let us check. The subject of had to push is riders.'],
    ['A **-self** pronoun points back to the **subject**', 'A pronoun ending in self or selves usually points back to the subject of its clause. So riders holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    head: ['Circled', 'What happened'],
    rows: [
      ['bicycles', 'The sentence is **about** bicycles, but they did not push', 'Circling bicycles is the trap. The sentence is about bicycles, but they were pushed, not doing the pushing.'],
      ['feet', 'Closest to the pronoun, but only the **tool**', 'Feet comes right after the pronoun, but feet are what the riders used.'],
      ['pedals', 'The bicycles had **none**', 'Pedals cannot be right, because the bicycles had none.'],
    ],
  },
  yourTurn: {
    prompt: 'Which noun does the pronoun **it** refer to?<br>When the dog found the ball, Ella threw <u>it</u> across the field.',
    choices: ['ball', 'dog', 'Ella', 'field'],
    answer: 0,
    working: 'Ella threw **the ball** across the field.',
    ask: 'When the dog found the ball, Ella threw it across the field. Which noun does the pronoun it refer to? A: ball. B: dog. C: Ella. D: field.',
    reveal: 'The answer is A, ball. Put it in place: Ella threw the ball across the field. That is the only one that makes sense.',
  },
  sum: [
    ['A pronoun refers to a noun: its **antecedent**', 'Here is what to remember. A pronoun refers to a noun, called its antecedent.'],
    ['They must **agree**, and the meaning must fit', 'The two must agree, and the meaning must fit.'],
    ['Test the noun **in place** of the pronoun', 'Test your answer by putting the noun in place of the pronoun. For more on pronouns, watch this lesson’s explainer video on Gradileo.'],
  ],
});
