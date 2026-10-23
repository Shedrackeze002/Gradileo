import type { ScreenEl, Explainer } from '@/video/script.ts';

// Gradileo's introduction: what it does for students, teachers and parents, shown in the app
// itself. The pictures come from the demo: run `npx tsx video/tools/screens.ts` before building.

/** A picture of the app; `view` is the part of the page to show, in the page's pixels. */
const screen = (id: string, shot: string, url: string, view: ScreenEl['view'], spots: string[] = []): ScreenEl => ({ kind: 'screen', id, shot, url: `gradileo.com/${url}`, view, spots });

const video: Explainer = {
  id: 'gradileo-intro',
  lessonId: '',
  label: 'Platform tour',
  title: 'A Math Platform for Students, Teachers and Parents',
  thumbnailTitle: 'Meet Gradileo',
  thumbnail: 'app',
  summary:
    'A tour of Gradileo: complete math lessons from Grade 5 to Grade 12 with explainer videos, an AI tutor and practice that never runs out for students; present mode, AI-drafted assignments, suggested marks, a gradebook, a mastery map, an AI teaching assistant, report cards and a class forum for teachers; and a clear report card for parents. Try the demo at gradileo.com, with nothing to sign up for.',
  tags: ['math platform', 'online math', 'math teacher tools', 'AI tutor', 'mastery learning', 'report cards', 'math practice'],
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Introducing Gradileo', title: 'Teach it once. Practise until it sticks.', subtitle: 'Math for students, teachers and parents, from Grade 5 to Grade 12' }],
      lines: [
        { say: 'Welcome to Gradileo, a math platform for students, teachers and parents.', show: 'title' },
        { say: 'In the next few minutes, you will see what it does for each of them, and why it helps students learn.' },
      ],
    },
    {
      chapter: 'What Gradileo is',
      layout: 'center',
      main: [
        { kind: 'text', id: 'lead', size: 'xl', md: 'Everything a math class needs, **in one place**' },
        {
          kind: 'bullets',
          id: 'list',
          items: [
            '**16 courses**, from Grade 5 to Grade 12',
            '**486 lessons**, with worked examples and **1,634 explainer videos**',
            '**760 question generators**: practice never runs out',
            'An **AI tutor** for students and an **AI teaching assistant** for teachers',
          ],
        },
      ],
      lines: [
        { say: 'Gradileo brings everything a math class needs into one place.', show: 'lead' },
        { say: 'It has sixteen courses, from Grade 5 all the way to Grade 12.', show: 'list.0' },
        { say: 'There are 486 complete lessons with worked examples, and 1,634 explainer videos like this one.', show: 'list.1' },
        { say: '760 question generators write a fresh question every time, so practice never runs out.', show: 'list.2' },
        { say: 'And it has AI built in: a tutor for students, and a teaching assistant for teachers.', show: 'list.3' },
      ],
    },

    // ------------------------------------------------------------------ students
    {
      chapter: 'For students',
      layout: 'center',
      main: [screen('app', 'student-home', 's', [264, 160, 1004, 500], ['due', 'mastery', 'coach'])],
      lines: [
        { say: 'Let’s start with students.', show: 'app' },
        { say: 'When a student signs in, their home page shows the work that is due next,', focus: 'app.due' },
        { say: 'how much of the course they have mastered,', focus: 'app.mastery' },
        { say: 'and a study coach that suggests what to practise next, based on their own answers.', focus: 'app.coach' },
      ],
    },
    {
      layout: 'center',
      main: [screen('lesson', 'student-lesson', 's/learn/m10c-2-1', [264, 80, 1004, 530], ['goals', 'contents', 'tutor'])],
      lines: [
        { say: 'Every lesson is complete. It begins with what you will be able to do by the end,', show: 'lesson', focus: 'lesson.goals' },
        { say: 'then teaches each idea in turn, with definitions, worked examples, common mistakes and questions to check your understanding.', focus: 'lesson.contents' },
        { say: 'Lessons have explainer videos too, and they pause to ask you a question, so you keep thinking as you watch.', focus: 'lesson' },
        { say: 'And if you would rather be taught, press Start with your AI tutor.', focus: 'lesson.tutor' },
      ],
    },
    {
      layout: 'center',
      main: [screen('tutor', 'student-tutor', 's/learn/m10c-2-1/tutor', [0, 0, 1280, 760], ['caption', 'ask'])],
      lines: [
        { say: 'The tutor teaches the lesson slide by slide, out loud, in the same voice as the videos.', show: 'tutor' },
        { say: 'What it says is written along the bottom, so you can read along.', focus: 'tutor.caption' },
        { say: 'You can stop it at any time and ask a question, and it answers in plain words, about the slide you are on.', focus: 'tutor.ask' },
      ],
    },
    {
      layout: 'center',
      main: [screen('practice', 'student-practice', 's/practice', [190, 0, 900, 640], ['question', 'feedback', 'solution'])],
      lines: [
        { say: 'Practice never runs out. Every question is made fresh, with new numbers each time.', show: 'practice', focus: 'practice.question' },
        { say: 'You find out straight away whether you are right,', focus: 'practice.feedback' },
        { say: 'and every question has hints and a worked solution, so a mistake becomes something you learn from.', focus: 'practice.solution' },
      ],
    },
    {
      layout: 'center',
      main: [screen('progress', 'student-progress', 's/progress', [264, 56, 1004, 594], ['ring', 'weekly', 'units'])],
      lines: [
        { say: 'Your progress page shows how much of the course you have mastered,', show: 'progress', focus: 'progress.ring' },
        { say: 'how often you have been right each week,', focus: 'progress.weekly' },
        { say: 'and every skill, unit by unit.', focus: 'progress.units' },
        { say: 'Mastery only grows when you answer correctly without help, in more than one session. So it shows what you really know, not one lucky streak.', focus: 'progress' },
      ],
    },
    {
      layout: 'center',
      main: [screen('canvas', 'student-canvas', 's/work', [200, 130, 880, 565], ['canvas'])],
      lines: [
        { say: 'Classwork, homework, quizzes and exams are all done in Gradileo.', show: 'canvas' },
        { say: 'For a written question, you can show your working on a canvas, just as you would on paper, and type your answer too.', focus: 'canvas.canvas' },
      ],
    },
    {
      layout: 'center',
      main: [screen('ask', 'student-forum', 's/forum', [264, 56, 1004, 514], ['who'])],
      lines: [
        { say: 'And when you are stuck, you can ask in your class forum.', show: 'ask' },
        { say: 'You choose who sees your question: your whole class, your class without your name, or only your teacher.', focus: 'ask.who' },
      ],
    },

    // ------------------------------------------------------------------ teachers
    {
      chapter: 'For teachers',
      layout: 'center',
      main: [screen('class', 'teacher-class', 't/c/c_math10a', [264, 56, 1004, 504], ['stats', 'next', 'assistant'])],
      lines: [
        { say: 'Now, teachers.', show: 'class' },
        { say: 'A class page shows how the class is doing at a glance: mastery, work handed in on time, and what is waiting to be graded.', focus: 'class.stats' },
        { say: 'It tells you which lesson to teach next,', focus: 'class.next' },
        { say: 'and the AI teaching assistant points out who needs help, and with what.', focus: 'class.assistant' },
      ],
    },
    {
      layout: 'center',
      main: [screen('add', 'teacher-students', 't/c/c_math10a/students', [240, 120, 800, 560], ['names', 'link'])],
      lines: [
        { say: 'Adding students is quick.', show: 'add' },
        { say: 'Paste the names from your class list, and Gradileo makes a login for each student, with no email needed.', focus: 'add.names' },
        { say: 'Or share a class link. Students type just their name, and you let them in.', focus: 'add.link' },
      ],
    },
    {
      layout: 'center',
      main: [screen('present', 'present', 'present/c_math10a/m10c-2-1', [0, 0, 1280, 800], ['slide', 'tools'])],
      lines: [
        { say: 'To teach, open any lesson in present mode.', show: 'present' },
        { say: 'It becomes a slide deck that builds step by step, so you can reveal a worked example one line at a time.', focus: 'present.slide' },
        { say: 'From the toolbar you can open a whiteboard, start a timer, or hide part of a slide until you are ready.', focus: 'present.tools' },
      ],
    },
    {
      layout: 'center',
      main: [screen('board', 'whiteboard', 'present/c_math10a/m10c-2-1', [0, 0, 1280, 800], ['board', 'save'])],
      lines: [
        { say: 'The whiteboard opens over the slide. Draw on it as you explain,', show: 'board', focus: 'board.board' },
        { say: 'and save it to the lesson, for students who were away.', focus: 'board.save' },
      ],
    },
    {
      layout: 'center',
      main: [screen('live', 'live-results', 'present/c_math10a/m10c-2-1', [0, 0, 1280, 800], ['chart'])],
      lines: [
        { say: 'You can also ask the class a question on their own devices.', show: 'live' },
        { say: 'As they answer, you see how many chose each answer. So you know straight away whether to move on, or explain it again.', focus: 'live.chart' },
      ],
    },
    {
      chapter: 'Setting work',
      layout: 'center',
      main: [screen('draft', 'builder-dialog', 't/c/c_math10a/assignments/new', [240, 20, 800, 760], ['go'])],
      lines: [
        { say: 'Setting work is quick too. With Draft with AI, you choose the lessons and the kinds of question you want,', show: 'draft' },
        { say: 'and the AI drafts the homework, quiz or exam for you.', focus: 'draft.go' },
      ],
    },
    {
      layout: 'center',
      main: [screen('drafted', 'builder-draft', 't/c/c_math10a/assignments/new', [264, 56, 1004, 544], ['suggested', 'summary'])],
      lines: [
        { say: 'It explains the choices it made,', show: 'drafted', focus: 'drafted.suggested' },
        { say: 'and fills in the rest: the due date, reminders and feedback, which you can change.', focus: 'drafted.summary' },
      ],
    },
    {
      layout: 'center',
      main: [screen('q', 'builder-questions', 't/c/c_math10a/assignments/new', [264, 150, 1004, 520], ['check', 'regenerate'])],
      lines: [
        { say: 'Every question the AI wrote is marked, so you check it before any student sees it.', show: 'q', focus: 'q.check' },
        { say: 'If you would like a different question, press Regenerate and say what should change.', focus: 'q.regenerate' },
      ],
    },
    {
      layout: 'center',
      main: [screen('advice', 'builder-settings', 't/c/c_math10a/assignments/new', [264, 360, 1004, 440], ['advice'])],
      lines: [
        { say: 'Gradileo can also suggest the settings, such as a time limit that fits the questions and how long your class usually takes.', show: 'advice', focus: 'advice.advice' },
      ],
    },
    {
      layout: 'center',
      main: [screen('exam', 'builder-exam', 't/c/c_math10a/assignments/new', [264, 60, 1004, 560], ['exam'])],
      lines: [
        { say: 'For a test, you can turn on exam mode. It opens in full screen, and records when a student leaves it or switches tabs.', show: 'exam', focus: 'exam.exam' },
      ],
    },
    {
      chapter: 'Marking',
      layout: 'split',
      leftWidth: 560,
      left: [screen('mark', 'teacher-mark', 't/c/c_math10a/submissions', [280, 330, 650, 720], ['working', 'suggestion'])],
      right: [
        {
          kind: 'bullets',
          id: 'how',
          items: ['Questions are graded **automatically**', 'For written answers, the AI **suggests a mark**', 'It reads the working on the **canvas**', '**You** decide the final mark'],
        },
      ],
      lines: [
        { say: 'Most questions are graded automatically, the moment a student hands in their work.', show: ['mark', 'how.0'] },
        { say: 'For written answers, the AI can suggest a mark.', show: 'how.1' },
        { say: 'It reads the student’s working on the canvas,', show: 'how.2', focus: 'mark.working' },
        { say: 'explains the mark it suggests, and writes a comment for the student. You decide the final mark.', show: 'how.3', focus: 'mark.suggestion' },
      ],
    },
    {
      chapter: 'Seeing who needs help',
      layout: 'center',
      main: [screen('book', 'teacher-gradebook', 't/c/c_math10a/gradebook', [264, 56, 1004, 464], ['table', 'export'])],
      lines: [
        { say: 'Every score lands in the gradebook, coloured so you can spot who is struggling,', show: 'book', focus: 'book.table' },
        { say: 'and you can export it whenever you need to.', focus: 'book.export' },
      ],
    },
    {
      layout: 'center',
      main: [screen('map', 'teacher-mastery', 't/c/c_math10a/mastery', [264, 56, 1004, 544], ['grid', 'hardest'])],
      lines: [
        { say: 'The mastery map shows every student against every skill,', show: 'map', focus: 'map.grid' },
        { say: 'and lists the skills your class finds hardest right now.', focus: 'map.hardest' },
      ],
    },
    {
      layout: 'center',
      main: [screen('ai', 'teacher-insights', 't/c/c_math10a/insights', [264, 370, 1004, 430], ['report', 'gaps', 'misconceptions'])],
      lines: [
        { say: 'Ask the AI teaching assistant to analyse your class, and it reads every answer.', show: 'ai', focus: 'ai.report' },
        { say: 'It finds the gaps,', focus: 'ai.gaps' },
        { say: 'and the likely misconceptions behind the wrong answers.', focus: 'ai.misconceptions' },
        { say: 'Then it suggests next steps, such as a reteach or a short practice set. Nothing is assigned until you approve it.', focus: 'ai' },
      ],
    },
    {
      chapter: 'Report cards',
      layout: 'center',
      main: [screen('rc', 'teacher-report', 't/c/c_math10a/reports', [264, 120, 1004, 680], ['editor', 'card', 'pdf'])],
      lines: [
        { say: 'At the end of a term, the AI drafts a report card for each student, from their own work.', show: 'rc' },
        { say: 'You edit every line,', focus: 'rc.editor' },
        { say: 'and see the card exactly as the student and their parents will.', focus: 'rc.card' },
        { say: 'Then share it with the student, print it, or save it as a PDF.', focus: 'rc.pdf' },
      ],
    },
    {
      chapter: 'Class forum',
      layout: 'center',
      main: [screen('forum', 'teacher-forum', 't/c/c_math10a/forum', [264, 56, 1004, 454], ['anonymous', 'private', 'pinned'])],
      lines: [
        { say: 'In the class forum, you always see who wrote each post, even when the class does not,', show: 'forum', focus: 'forum.anonymous' },
        { say: 'and questions meant only for you stay private.', focus: 'forum.private' },
        { say: 'You answer questions, pin the important ones, and hide or remove anything that should not be there.', focus: 'forum.pinned' },
      ],
    },

    // ------------------------------------------------------------------ parents
    {
      chapter: 'For parents',
      layout: 'center',
      main: [screen('home', 'parent-report', 'report', [200, 230, 880, 560], ['stats', 'parents'])],
      lines: [
        { say: 'Parents see how their child is doing through the report card.', show: 'home' },
        { say: 'With a private link from the teacher, a parent can read it without an account: the numbers that matter,', focus: 'home.stats' },
        { say: 'what their child does well, what to work on next, and simple ways to help at home, even without knowing the math.', focus: 'home.parents' },
      ],
    },
    {
      chapter: 'Privacy',
      layout: 'center',
      main: [
        { kind: 'text', id: 'lead', size: 'xl', md: 'Built for schools, with **privacy first**' },
        {
          kind: 'bullets',
          id: 'list',
          check: true,
          items: ['No ads, and no tracking', 'Personal information is never sold', 'Students can join with **just a name**', 'The AI never sees a student’s **name** or **email address**'],
        },
      ],
      lines: [
        { say: 'Gradileo is built for schools, so privacy comes first.', show: 'lead' },
        { say: 'There are no ads and no tracking, and personal information is never sold.', show: ['list.0', 'list.1'] },
        { say: 'Students can join with just a name, and the AI never sees a student’s name or email address.', show: ['list.2', 'list.3'] },
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
            '**Students**: complete lessons, videos, an AI tutor and endless practice',
            '**Teachers**: present, set work with AI, and see who needs help',
            '**Parents**: a clear report card, and ways to help at home',
          ],
        },
      ],
      lines: [
        { say: 'So, for students: complete lessons, explainer videos, an AI tutor, and practice that never runs out.', show: 'sum.0' },
        { say: 'For teachers: present any lesson, set work in minutes with AI, and see exactly who needs help.', show: 'sum.1' },
        { say: 'And for parents: a clear report card, with simple ways to help at home.', show: 'sum.2' },
      ],
    },
    {
      chapter: 'Try it',
      layout: 'center',
      main: [screen('site', 'landing', '', [0, 60, 1280, 640], ['demo'])],
      lines: [
        { say: 'To see it for yourself, visit gradileo dot com.', caption: 'To see it for yourself, visit gradileo.com.', show: 'site' },
        { say: 'Try the teacher demo or the student demo. There is nothing to sign up for, and it runs in your browser.', focus: 'site.demo' },
        { say: 'Thank you for watching. Teach each lesson once, and let your students practise until it sticks.', focus: 'site' },
      ],
    },
  ],
};

export default video;
