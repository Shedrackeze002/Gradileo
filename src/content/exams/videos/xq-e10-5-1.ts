import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 5.1 (reading an image). An exam-style question we wrote, in the style of a
// Grade 10 media test, on a photograph we describe in words. The answer is B: the tiny hiker under a vast
// storm cloud seems small and vulnerable against the power of nature.

const PHOTO = ['*A photograph:* A lone hiker stands **small** in the **bottom corner** of the frame. A **huge, dark storm cloud** fills almost all of the sky above. The colours are deep greys, except for **one beam of sunlight** falling on the hiker.'];

export default englishExam({
  lesson: 'e10-5-1',
  ...ours('a Grade 10 media test', 'the photograph is described in words, and invented'),
  title: 'What Does the Composition of This Photo Suggest?',
  thumbnailTitle: 'Reading an Image',
  subtitle: 'Composition, focal point and light, step by step',
  summary:
    'An exam-style media question, solved one small step at a time, on a photograph described in words: a tiny hiker beneath a huge storm cloud, lit by one beam of sun. We look at size and position, then colour and light, and explain the effect on the viewer.',
  intro: [
    'In this video, we solve an exam-style question about reading an image. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 media test, and the photograph is described in words.',
  ],
  passage: {
    lines: PHOTO,
    by: 'An invented photograph, described in words',
    say: ['First, picture the photograph. A lone hiker stands small in the bottom corner of the frame. A huge, dark storm cloud fills almost all of the sky above. The colours are deep greys, except for one beam of sunlight falling on the hiker.'],
  },
  question: {
    prompt: 'What does the **composition** of the photograph mainly suggest?',
    text: 'Read the description of the photograph. What does the composition of the photograph mainly suggest?',
    choices: [
      'The hiker is in complete control of the landscape.',
      'The hiker is small and vulnerable against the power of nature.',
      'The weather is calm and pleasant.',
      'The photograph is mainly about the hiker’s equipment.',
    ],
    answer: 1,
    working: '**Tiny** hiker, **vast** cloud: the size contrast makes the person seem **vulnerable**.',
    say: [
      'What does the composition of the photograph mainly suggest?',
      'A: The hiker is in complete control of the landscape. B: The hiker is small and vulnerable against the power of nature. C: The weather is calm and pleasant. D: The photograph is mainly about the hiker’s equipment.',
    ],
  },
  ask: [
    ['**Composition** is how the image is **arranged**', 'Composition is how the parts of an image are arranged.'],
    ['What does **this** arrangement suggest?', 'We need what this arrangement suggests.'],
  ],
  know: {
    title: 'Reading an image',
    md: '**Composition**: where things are placed and **how big** they are in the frame. **Focal point**: where the eye goes **first**, often the brightest or sharpest spot. **Colour** and **light** set the **mood**: dark greys feel threatening, warm light feels hopeful. **Size** and **space** show **power**: what fills the frame dominates. Always link a **visual choice** to its **effect** on the viewer.',
    say: [
      'Here is the idea we need. Composition is where things are placed in the frame, and how big they are. The focal point is where the eye goes first, often the brightest or sharpest spot.',
      'Colour and light set the mood. Dark greys feel threatening, while warm light feels hopeful. Size and space show power, because whatever fills the frame dominates. Always link a visual choice to its effect on the viewer.',
    ],
  },
  plan: [
    ['Look at **size** and **position**', 'Here is the plan. First, look at size and position.'],
    ['Look at **colour** and **light**', 'Second, look at colour and light.'],
    ['Explain the **effect**', 'Third, explain the effect.'],
  ],
  steps: [
    scene('Step 1: Size and position', [table('t', ['Element', 'Size and place', 'Effect'], [['hiker', '**small**, bottom corner', 'seems **weak**'], ['storm cloud', '**huge**, fills the sky', 'seems **powerful**, threatening']])], [
      { say: 'Step one. The hiker is small, pushed into the bottom corner.', show: 't.0' },
      { say: 'The storm cloud is huge, and fills almost the whole sky. Whatever fills the frame dominates, so the cloud feels powerful and threatening.', show: 't.1' },
    ]),
    scene('Step 2: Colour, light and effect', [text('n', 'Deep **greys** = threat · one **beam of light** = the **focal point**, on the hiker'), text('a', 'A small person against **vast**, powerful nature → **B**', 'lg')], [
      { say: 'Step two. The deep greys feel threatening. The one beam of light is the focal point, and it falls on the hiker, so our eye finds this small figure at once.', show: 'n' },
      { say: 'Together, the image suggests a small, vulnerable person against the power of nature. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['Swap the sizes: a **huge** hiker, a **small** cloud?', 'Let us check. Imagine the sizes swapped, with a huge hiker and a small cloud. The person would seem in control.'],
    ['So the **real** sizes create vulnerability', 'So the real sizes create the feeling of vulnerability. B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The light **picks out** the hiker, but does not make them **powerful**', 'Choice A is the trap. The light picks out the hiker, but a tiny figure under a vast storm is not in control.'],
      ['C', 'A **storm** cloud is not calm', 'Choice C: a storm cloud is not calm weather.'],
      ['D', 'No **equipment** is described', 'Choice D: no equipment is described.'],
    ],
  },
  yourTurn: {
    prompt: 'In an image, what is the **focal point**?',
    choices: ['the part the eye goes to first', 'the frame around the picture', 'the photographer’s name', 'the background colour'],
    answer: 0,
    working: 'Where the **eye** goes **first**.',
    ask: 'In an image, what is the focal point? A: the part the eye goes to first. B: the frame around the picture. C: the photographer’s name. D: the background colour.',
    reveal: 'The answer is A. The focal point is where the viewer’s eye goes first.',
  },
  sum: [
    ['**Size** and **space** show power', 'Here is what to remember. Size and space show power.'],
    ['**Colour** and **light** set the mood', 'Colour and light set the mood.'],
    ['Link each choice to its **effect**', 'And link each visual choice to its effect on the viewer. For more on reading an image, watch this lesson’s explainer video on Gradileo.'],
  ],
});
