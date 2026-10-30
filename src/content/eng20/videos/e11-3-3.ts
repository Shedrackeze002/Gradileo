import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e11-3-3',
  lessonId: 'e11-3-3',
  title: 'Macbeth: Dramatic Devices',
  thumbnailTitle: 'Macbeth: Devices',
  thumbnail: false,
  summary:
    'Soliloquy, aside, monologue and dialogue show who is listening. The Witches’ prophecies equivocate, the Porter brings comic relief, and dramatic irony lets the audience know more than the characters.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Shakespeare: Macbeth', title: 'Dramatic Devices', subtitle: 'Soliloquy, prophecy and irony' },
        {
          kind: 'quote',
          id: 'q',
          size: 'md',
          lines: ['All hail, Macbeth! hail to thee, Thane of Glamis!', 'All hail, Macbeth! hail to thee, Thane of Cawdor!', 'All hail, Macbeth! that shalt be king hereafter!'],
          by: 'The Three Witches, Act 1, Scene 3',
        },
      ],
      lines: [
        { say: 'Macbeth and Banquo are crossing a heath on their way home from battle when three strange figures block their path. One after another, they greet Macbeth.', show: ['title', 'q.0', 'q.1', 'q.2'] },
        { say: 'In this lesson, you will see how Shakespeare uses the supernatural and other dramatic devices to let the audience into Macbeth’s mind, and to let us know more than the characters do.' },
      ],
    },
    {
      chapter: 'Who is listening?',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Dialogue**: a conversation between characters',
            '**Monologue**: a long speech to other characters, who listen',
            '**Soliloquy**: a character alone on stage speaks thoughts aloud',
            '**Aside**: a short remark the other characters do not hear',
          ],
        },
        { kind: 'quote', id: 'q', size: 'md', lines: ['If chance will have me king, why, chance may crown me', 'Without my stir.'], by: 'Macbeth, Act 1, Scene 3' },
      ],
      lines: [
        { say: 'First, ask who is listening. Dialogue is a conversation. A monologue is a long speech to other characters, who listen.', show: ['b.0', 'b.1'], focus: ['b.0', 'b.1'] },
        { say: 'In a soliloquy, a character is alone on stage, so only the audience hears. Macbeth’s soliloquies show his mind falling apart, as when he sees a dagger floating in the air.', show: 'b.2', focus: 'b.2' },
        { say: 'An aside is a short remark that the other characters do not hear. Macbeth has just heard that he is Thane of Cawdor, with Banquo beside him, and he says to himself, if chance will have me king, chance may crown me without my stir.', show: ['b.3', 'q.0', 'q.1'], focus: 'b.3' },
      ],
    },
    {
      chapter: 'Prophecy and equivocation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equivocation', md: 'Speaking in words with **two meanings**, so as to mislead without telling a plain lie.' },
        { kind: 'quote', id: 'q1', size: 'md', lines: ['Be bloody, bold, and resolute. Laugh to scorn', 'The power of man, for none of woman born', 'Shall harm Macbeth.'], by: 'Second Apparition, Act 4, Scene 1' },
        { kind: 'quote', id: 'q2', size: 'md', lines: ['And be these juggling fiends no more believ’d,', 'That palter with us in a double sense;', 'That keep the word of promise to our ear,', 'And break it to our hope!'], by: 'Macbeth, Act 5, Scene 8' },
      ],
      lines: [
        { say: 'In Act 4, Macbeth returns to the Witches, who raise apparitions, which are ghostly figures. One promises that no man born of woman can harm him. Another says he is safe until Birnam Wood comes to Dunsinane hill.', show: ['q1.0', 'q1.1', 'q1.2'] },
        { say: 'Both promises are equivocations. Malcolm’s soldiers cut branches from Birnam Wood, so the wood seems to move. And Macduff was delivered early by surgery, so he was not born in the usual way.', show: 'def', hide: 'q1' },
        { say: 'Too late, Macbeth sees the trick.', hide: 'def', show: ['q2.0', 'q2.1', 'q2.2', 'q2.3'] },
      ],
    },
    {
      chapter: 'Dramatic irony',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dramatic irony', md: 'The audience knows something important that a **character on stage does not**.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['There’s no art', 'To find the mind’s construction in the face:', 'He was a gentleman on whom I built', 'An absolute trust.'], by: 'Duncan, Act 1, Scene 4' },
      ],
      lines: [
        { say: 'Dramatic irony happens when the audience knows something important that a character does not.', show: 'def' },
        { say: 'Duncan has just had the traitor Cawdor executed, and he regrets how completely he trusted him.', show: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'At that very moment, Macbeth walks in, and Duncan greets him warmly. We have just heard Macbeth thinking about murder, so Duncan is about to trust the wrong man a second time.', focus: 'q' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Prophecy**: spoken by a character, usually supernatural, who says outright what will happen', '**Foreshadowing**: the playwright’s hint, whose meaning we see only later'],
        },
      ],
      lines: [
        { say: 'Here is a common mistake: mixing up prophecy and foreshadowing.', show: 'b.0', focus: 'b.0' },
        { say: 'A prophecy is spoken by a character, usually a supernatural one. Foreshadowing is the playwright’s hint. Duncan’s trust in the first Thane of Cawdor, a traitor, foreshadows his trust in the next one, Macbeth.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Alone, Macbeth sees a floating dagger and speaks his thoughts aloud. What is this speech?',
          choices: [
            'An aside, because it is a brief remark to us.',
            'A soliloquy, because he is alone and only we hear.',
            'A monologue, because the other lords listen in.',
            'A dialogue, because he is talking to the dagger.',
          ],
          answer: 1,
          working: 'A character alone on stage who speaks thoughts aloud, so that only the audience hears, is giving a soliloquy.',
        },
      ],
      lines: [
        { say: 'Your turn. Alone, Macbeth sees a floating dagger and speaks his thoughts aloud. What is this speech? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. He is alone, so only the audience hears, which makes it a soliloquy. An aside is a short remark made while other characters are on stage.', show: 'q2.answer' },
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
            'A soliloquy is spoken alone; an aside is a quick remark others do not hear.',
            'The Witches’ prophecies equivocate.',
            'Dramatic irony lets the audience see what the characters cannot.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A soliloquy is spoken alone, and an aside is a quick remark that the other characters do not hear.', show: 'sum.0' },
        { say: 'The Witches’ prophecies equivocate. Birnam Wood does come to Dunsinane, and Macduff was not born in the usual way.', show: 'sum.1' },
        { say: 'And dramatic irony lets the audience see what the characters cannot.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
