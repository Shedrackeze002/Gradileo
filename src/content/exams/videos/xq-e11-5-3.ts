import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 5.3 (representation and digital media). An exam-style media question we wrote,
// in the style of a Grade 11 media test. The answer is B: recommendation algorithms show more of what
// keeps a viewer watching, which can narrow what they see.

export default englishExam({
  lesson: 'e11-5-3',
  ...ours('a Grade 11 media test'),
  title: 'Why Does the App Keep Showing Similar Videos?',
  thumbnailTitle: 'Algorithms and Feeds',
  subtitle: 'How digital media shape what we see, step by step',
  summary:
    'An exam-style media question, solved one small step at a time: after Jordan watches one video about a conspiracy theory, the app fills the feed with more. We see what the app is designed to do, how recommendation algorithms work, and what that means for viewers.',
  intro: [
    'In this video, we solve an exam-style question about digital media. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 media test.',
  ],
  question: {
    prompt: 'Jordan watches **one** video claiming the Moon landing was faked. Soon the app fills the feed with **more** videos like it, some even more extreme. What is the **most likely** reason?',
    text: 'Jordan watches one video claiming the Moon landing was faked. Soon the app fills the feed with more videos like it, some even more extreme. What is the most likely reason?',
    choices: [
      'The claim must be true, because so many videos repeat it.',
      'The app’s algorithm recommends whatever keeps Jordan watching, based on past viewing.',
      'Jordan’s teacher chose the videos.',
      'The app shows every user exactly the same feed.',
    ],
    answer: 1,
    working: 'Algorithms promote what keeps us **watching** (**engagement**), building a narrow **filter bubble**.',
    say: [
      'Jordan watches one video claiming the Moon landing was faked. Soon the app fills the feed with more videos like it, some even more extreme. What is the most likely reason?',
      'A: The claim must be true, because so many videos repeat it. B: The app’s algorithm recommends whatever keeps Jordan watching, based on past viewing. C: Jordan’s teacher chose the videos. D: The app shows every user exactly the same feed.',
    ],
  },
  ask: [
    ['The feed **changes** after one video', 'The feed changes after just one video.'],
    ['**Why**?', 'We need the most likely reason.'],
  ],
  know: {
    title: 'Digital media and representation',
    md: 'Many apps earn money from **attention**, so their **algorithms** recommend what keeps each user **engaged**, based on what they watched, liked and shared. This can create a **filter bubble** or **echo chamber**, and push towards more **extreme** content. **Sponsorship** and **sharing** also shape feeds. **Representation**: media can repeat **stereotypes**, oversimplified ideas about a whole group.',
    say: [
      'Here is the idea we need. Many apps earn money from our attention, so their algorithms recommend whatever keeps each user engaged, based on what they watched, liked and shared.',
      'This can create a filter bubble, or echo chamber, and push towards more extreme content. Sponsorship and sharing also shape what we see. And media can repeat stereotypes, oversimplified ideas about a whole group of people.',
    ],
  },
  plan: [
    ['What is the app **designed** to do?', 'Here is the plan. First, ask what the app is designed to do.'],
    ['How does it **choose** videos?', 'Second, ask how it chooses videos.'],
  ],
  steps: [
    scene('Step 1: The design', [table('t', ['Question', 'Answer'], [['How does the app make **money**?', 'from **attention**: adverts while we watch'], ['So what does it want?', 'us to keep **watching**'], ['How does it choose?', 'from our **past** viewing, likes and shares']])], [
      { say: 'Step one. How does the app make money? From our attention, by showing adverts while we watch. So it wants us to keep watching.', show: ['t.0', 't.1'] },
      { say: 'It chooses the next video from what we watched, liked and shared before.', show: 't.2' },
    ]),
    scene('Step 2: The answer', [text('n', 'One video watched → **more** of the same → often **more extreme** → a **filter bubble**'), text('a', 'The **algorithm** feeds Jordan what keeps Jordan watching → **B**', 'lg')], [
      { say: 'Step two. Jordan watched one video, so the algorithm offers more of the same, often more extreme, because extreme videos hold attention. That builds a filter bubble.', show: 'n' },
      { say: 'The most likely reason is the algorithm. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['A friend who watched **cooking** videos gets a **different** feed', 'Let us check. A friend who watches cooking videos would get a completely different feed.'],
    ['Feeds are **personal**, built by the algorithm', 'Feeds are personal, built by the algorithm. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '**Repetition** feels like proof, but it is not **evidence**', 'Choice A is the trap. Seeing a claim many times makes it feel true, but repetition is not evidence.'],
      ['C', 'No **teacher** controls the feed', 'Choice C: no teacher controls the feed.'],
      ['D', 'Feeds are **personalised**', 'Choice D: feeds are personalised, not the same for everyone.'],
    ],
  },
  yourTurn: {
    prompt: 'Which is an example of a **stereotype** in media?',
    choices: [
      'A scientist character with a detailed backstory',
      'A news report quoting three different teenagers',
      'Films in which every teenager is lazy and rude',
      'A teen character who loves maths and football',
    ],
    answer: 2,
    working: '**Every** teenager shown the **same** way: a **stereotype**.',
    ask: 'Which is an example of a stereotype in media? A: A scientist character with a detailed backstory. B: A news report quoting three different teenagers. C: Films in which every teenager is lazy and rude. D: A teen character who loves maths and football.',
    reveal: 'The answer is C. Showing every teenager as lazy and rude oversimplifies a whole group, which is a stereotype.',
  },
  sum: [
    ['Algorithms promote **engagement**', 'Here is what to remember. Algorithms promote whatever keeps us engaged.'],
    ['This can build a **filter bubble**', 'This can build a filter bubble.'],
    ['Watch for **stereotypes** in how groups are shown', 'And watch for stereotypes in how groups are shown. For more on representation and digital media, watch this lesson’s explainer video on Gradileo.'],
  ],
});
