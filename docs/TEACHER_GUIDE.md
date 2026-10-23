# Teaching with Gradileo

This guide walks through a normal week. Everything here also works in the demo, so you can try
each step before your first class.

## Before the first class

1. **Create your class** (*New class*). Each class gets a six-character join code.
2. **Add students** (*Students → Add students*). Paste the names from your class list, one per
   line. Gradileo creates a username and a temporary password for each student; print the login
   cards and hand them out. Students who already have an account can join with the code instead.
3. **Check the defaults** (*Class settings*): reminder times (24 hours and 2 hours before the
   deadline by default), time zone, and whether the AI autopilot may assign practice.

## The lesson cycle

### 1. Publish, then teach

Open **Curriculum**. Lessons are hidden until you publish them, so students only see what you
have taught. The class overview always shows the **next lesson to teach**.

Open a lesson to preview exactly what students will read. Each lesson has the explanation,
worked examples with steps that reveal one at a time, common mistakes, and short "check your
understanding" questions. You can add your own video, link or note to any lesson.

### 2. Present in class

**Present** turns the lesson into full-screen slides; the arrow keys move between slides.
Worked-example steps appear one at a time when you click **Show step**, so you can ask the class
for the next step before revealing it. The check questions can generate fresh numbers, which
makes them good for mini whiteboards.

### 3. Classwork with instant feedback

From the lesson, choose **Assign → Classwork**. Students check each answer as they go, see hints,
and can try a similar question after a mistake. Watch the assignment page during class: it shows
who has finished and which skill is causing trouble, with real examples of wrong answers.

### 4. Homework in one click

**Assign → Homework** builds a set from the lesson's skills (three questions per skill, easy to
hard). Every student gets different numbers, so answers cannot be shared. Publishing notifies
students straight away, and students who have not submitted are reminded before the deadline.
Students who have already finished are never reminded.

### 5. Quizzes and unit tests

**Quiz** gives one timed attempt with results after submitting. **Unit test** (on each unit in
Curriculum) builds a test across the whole unit and releases results after the due date.
Add your own written questions in the builder; they wait for you in the grading queue.

### 6. Drafting with AI

**Draft with AI** in the builder drafts a whole assignment from the lessons you choose: generated
questions with fresh numbers for every student, and multiple-choice, short-answer and written
questions the AI writes with answers and marking guides. Questions the AI wrote are marked
**Written by AI: check the answer** until you mark them checked. Not happy with one? Press
**Regenerate** on it and, if you like, say what should change ("use a sports context", "make it
harder"): the AI writes a new question on the same skill in its place.

**Suggest settings** (in "How it works") works out how long the assignment takes a typical
student, from how long your class has taken on these skills before when there is enough of a
record, and suggests a time limit for a quiz or exam (half as long again, so slower students can
finish and check) and the attempts, feedback and hints that suit the kind of work. Nothing changes
until you press **Use these settings**.

## Reading the data

- **Overview**: completion rate, work to grade, students who need attention, and the AI summary.
- **Assignment page → Skills & mistakes**: the percentage correct for each skill, who missed it,
  sample wrong answers, and a button to assign follow-up practice to exactly those students.
- **Mastery map**: every student against every skill. Click a skill to see who is below
  Proficient and assign practice or present the lesson again.
- **Gradebook**: best attempt per assignment, with optional category weights (for example exams
  40%, quizzes 25%, homework 20%) and CSV export.
- **Student profile**: mastery by unit, every piece of work, recent mistakes with the expected
  answer, and the student's AI report.

## What the mastery levels mean

| Level | Meaning |
|---|---|
| Not started | No questions answered yet. |
| Attempted | Some answers, but the evidence of understanding is still weak. |
| Familiar | Getting there: some correct answers, estimated mastery at least 45%. |
| Proficient | At least 3 correct answers and estimated mastery at least 80%. |
| Mastered | At least 5 correct answers across two or more sessions, estimated mastery at least 95%. |

Mastery is estimated from every answer using Bayesian Knowledge Tracing. An answer that needed a
hint does not count as correct, and mistakes lower the estimate, so a level can go down as well as
up. Skills that have not been practised for a while (one week for Proficient, three weeks for
Mastered) are suggested for review so they stay fresh.

## The AI teaching assistant

**AI insights** analyses the class or one student and reports strengths, gaps, likely
misconceptions, areas of growth and suggested small groups. Each recommendation has an
**Approve & assign** button, so nothing reaches students until you agree. With **autopilot** on,
the assistant may assign one short practice set to a student after graded work (at most once
every three days per student); you are notified each time.

Without a MiniMax key the built-in offline analyst writes the report, so the feature always works.

## Class forum

**Forum** (in the class menu, and for students beside Classwork) is where students ask questions
for the class. Each student chooses who sees a question: **my class**, **my class without my
name** (only you know it is theirs), or **only my teacher**. Anyone who can see a question can
reply, and maths can be written in dollar signs. You see every post and who wrote it, and you are
notified about new questions and students' replies; a student is notified when someone replies to
their question. You can **pin** a question, **mark it answered** (its author can too), **hide** a
post from the class (its author still sees it, marked as hidden) or **remove** it. A self-paced
course has no forum, because there is no teacher to look after it.

## Report cards

**Report cards** (in the class menu) drafts each student's report card from their mastery and
work: how they are doing, strengths, next steps, tips for the student and for parents, and your
comment, with their course progress, skills secure, average score and work handed in. Type the
period (for example "Term 1") and, if you like, notes for the AI, then press **Write with AI** for
one student or **Draft for every student**. Open each card to check and edit it; write {name}
where the student's first name goes. Nothing reaches the student until you press **Share with the
student**, which shows it on their Progress page and tells them. Once it is shared, **Make a
private link** gives you a link to send to the student's parents or carers: it shows that card,
and nothing else, without signing in, until you turn it off. **Print or save as PDF** prints the
card on its own. The AI sees the student's skills and work, never their name.

## Grading written answers

Students answer a written response on a canvas or by typing, and can use both. On the canvas they
write with a pen, a finger or the mouse (a pen's pressure sets the line width, and a resting palm
is ignored), on squared, lined, dotted or plain paper, with up to four pages and a full-screen
view. You see their working page by page above anything they typed.

Open **To grade** on the overview, or the assignment's student list. Choose a score for each
written response, add a comment if you like, then **Return to student** with overall feedback.
Use **Previous / Next** to move through the class.

**Suggest a mark** asks the AI to read the answer against the question's marking guide, the
working on the canvas included. It suggests a mark with its reasons, how sure it is, and a comment
for the student. **Use this mark** fills them in; nothing is saved until you press **Save grade**,
so you always decide. The AI sees the question, the guide and the answer, never the student's
name.
