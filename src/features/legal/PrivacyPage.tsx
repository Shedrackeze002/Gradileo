import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, LegalLayout, Section } from './LegalLayout.tsx';

const Mail = () => (
  <a className="text-brand hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
    {CONTACT_EMAIL}
  </a>
);

/** Gradileo's privacy policy, at /privacy. Keep it in step with what the app actually collects and shares. */
export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="October 21, 2026"
      intro={
        <>
          <p>
            Gradileo (gradileo.com) is an online mathematics platform for teachers and students from Grade 5 to Grade 12. This policy explains what
            information Gradileo collects, how it is used and shared, and the choices you have. It applies to the Gradileo website and app.
          </p>
          <p>
            In short: we collect only what we need to run classes, lessons and assignments. We do not sell personal information, we do not show ads, and we
            do not use analytics or tracking tools.
          </p>
        </>
      }
    >
      <Section id="collect" title="1. Information we collect">
        <p>
          <strong>Account information.</strong> Your name, your email address (or, for a student account created by a teacher, a username instead of an
          email address), your password, and whether you are a teacher or a student. Passwords are stored in hashed form by our authentication provider;
          we never see them in plain text. For teacher accounts, we also keep whether the account has been approved.
        </p>
        <p>
          <strong>Class information.</strong> The classes you teach or join, class settings, join requests (including any short message you add),
          announcements, and course requests (the grade and course you ask for).
        </p>
        <p>
          <strong>Learning information.</strong> Answers to questions, scores, feedback, progress on skills, practice history, whiteboard drawings, answers
          to live class questions, lesson edit suggestions from teachers, and the results of AI analyses that teachers run. When a teacher turns on exam
          mode for an assessment, we also record when a student leaves full screen or switches tabs during that assessment.
        </p>
        <p>
          <strong>Camera in exam mode.</strong> If a teacher requires the camera for an exam, the student’s browser shows a small camera preview so the
          student knows it is on. Nothing from the camera is recorded, saved or sent.
        </p>
        <p>
          <strong>What we do not collect.</strong> We do not ask for dates of birth, home addresses, phone numbers or school records, we do not collect
          precise location, and we do not use advertising identifiers.
        </p>
      </Section>

      <Section id="use" title="2. How we use information">
        <ul>
          <li>To create and run accounts, classes, lessons, practice, assignments, quizzes and exams.</li>
          <li>To grade work, track mastery of skills, and show students and their teachers how learning is going.</li>
          <li>To send assignment and deadline reminder emails, but only when a teacher turns them on for a class.</li>
          <li>To run the AI teaching assistant when a teacher asks for an analysis, and the AI tutor when a student studies a lesson with it (see section 3).</li>
          <li>To keep Gradileo secure, fix problems, and respond to questions and requests.</li>
        </ul>
        <p>We do not sell personal information, we do not use it for advertising, and we do not build profiles of students for anything other than their learning in Gradileo.</p>
      </Section>

      <Section id="ai" title="3. The AI teaching assistant and the AI tutor">
        <p>
          When a teacher asks the AI teaching assistant to analyze a class or a student, Gradileo sends the AI model provider (MiniMax) the information the
          analysis needs: the class name, students’ first names and last initials, their progress on skills, recent incorrect answers with the question
          and the expected answer, and assignment titles and scores. We do not send email addresses or surnames. The analysis is shown to the teacher and
          saved with the class.
        </p>
        <p>
          When a student studies a lesson with the AI tutor, Gradileo sends MiniMax the lesson’s slides so it can write what the tutor says. This contains
          nothing about the student, and the narration is saved and reused for other students. When a student asks the tutor a question, Gradileo sends
          MiniMax the question, the slide it is about and the last few messages of that conversation. We do not send the student’s name or email address,
          and we do not keep the questions or answers. Students should not type personal information into a question. The tutor’s voice is recorded
          ahead of time from the lesson’s slides and played from our website; nothing the student says or types is recorded.
        </p>
        <p>
          When a teacher uses “Draft with AI” to draft an assignment, Gradileo sends MiniMax the lessons and skills chosen, the class’s average progress on
          each skill and the teacher’s own notes for the draft. This contains no student’s name or individual results. The draft goes only to the teacher,
          who checks and edits it before any student sees it.
        </p>
        <p>The student coach and the course placement check run inside the student’s browser and do not send information to an AI provider.</p>
      </Section>

      <Section id="share" title="4. Who can see information, and who we share it with">
        <p>
          <strong>Inside Gradileo.</strong> Teachers can see the work and progress of the students in their own classes. Students can see their own work and
          what their teachers share with the class. Gradileo’s platform administrators can see account and class information when they need to run, support
          or secure the service.
        </p>
        <p>
          <strong>Service providers.</strong> We use a small number of providers to run Gradileo. They process information only to provide their service to
          us:
        </p>
        <ul>
          <li>
            <strong>Supabase</strong>: our database, sign-in and server functions. Gradileo’s data is stored in Supabase’s Canada (Central) region.
          </li>
          <li>
            <strong>Cloudflare</strong>: hosts the Gradileo website and handles email sent to gradileo.com addresses.
          </li>
          <li>
            <strong>MiniMax</strong>: the AI model provider for teacher-requested analyses, assignment drafts and the AI tutor, as described in section 3.
          </li>
          <li>
            <strong>Our email delivery provider</strong>: sends reminder emails when a teacher turns them on. It receives the student’s email address and
            the message.
          </li>
          <li>
            <strong>YouTube</strong>: some lessons include explainer videos hosted on YouTube, embedded in YouTube’s privacy-enhanced mode. When you play a
            video, YouTube (Google) may collect information under{' '}
            <a className="text-brand hover:underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
              Google’s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>GitHub</strong>: when an administrator approves a request for a new course, it may be recorded as a public task that does not include
            the requester’s name or email address.
          </li>
        </ul>
        <p>
          <strong>Legal reasons.</strong> We may disclose information if the law requires it, or to protect the safety of students, users or the public.
        </p>
      </Section>

      <Section id="google" title="5. Google user data">
        <p>
          Gradileo does not offer sign-in with Google, and it does not access the Google accounts or Google data of teachers or students. Gradileo’s
          administrators use a Google API connection with the limited Google Drive scope (drive.file) only to upload Gradileo’s own explainer videos and
          related files to Gradileo’s Google Drive. With this scope, Gradileo can work only with the files it creates; it does not read, change or delete
          any other files.
        </p>
        <p>
          Files uploaded this way are used only to prepare and publish Gradileo’s lesson videos. They are not shared with others, sold, or used for
          advertising. Gradileo’s use and transfer of information received from Google APIs adheres to the{' '}
          <a className="text-brand hover:underline" href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer">
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>
      </Section>

      <Section id="storage" title="6. Cookies and browser storage">
        <p>
          Gradileo does not set cookies. It uses your browser’s local storage to keep you signed in and to remember preferences, such as your theme and
          the last class you opened. In the demo, everything stays in your browser and nothing is sent to our servers.
        </p>
      </Section>

      <Section id="children" title="7. Students and children">
        <p>
          Gradileo is designed for use in schools. Students often join through a teacher’s class, and teachers can create student logins that need no
          email address.
        </p>
        <p>
          Students who are younger than the age at which they can agree to the use of their personal information where they live (for example, under 13 in
          the United States) should use Gradileo only through their school or with the permission of a parent or guardian. Schools and teachers who use
          Gradileo with their classes are responsible for getting any consent that their school, school district or local law requires.
        </p>
        <p>If you believe a child has given us personal information without the permission they needed, contact us and we will delete it.</p>
      </Section>

      <Section id="keep" title="8. How long we keep information">
        <p>
          We keep account and class information while the account is active. You can ask us to delete your account at any time. Deleting an account deletes
          its profile and the class work linked to it. Copies in our database provider’s backups are removed as those backups expire.
        </p>
      </Section>

      <Section id="security" title="9. Security">
        <p>
          Gradileo uses encrypted connections (HTTPS), stores passwords in hashed form, and uses database access rules so that each person can see only the
          information their role allows. No system is perfectly secure, so please use a strong password and keep it private.
        </p>
      </Section>

      <Section id="choices" title="10. Your choices and rights">
        <p>
          You can see and update your name and password in Gradileo’s settings. Depending on where you live, you may also have the right to ask for a copy
          of your personal information, to correct it, or to have it deleted. To make a request, email <Mail />. Students in a school class can also ask
          their teacher or school.
        </p>
      </Section>

      <Section id="transfer" title="11. Where information is processed">
        <p>
          Gradileo’s database is in Canada. Some service providers, such as Cloudflare and the AI model provider, may process information in other
          countries to provide their services.
        </p>
      </Section>

      <Section id="changes" title="12. Changes to this policy">
        <p>
          If we change this policy, we will update the date at the top of this page. If a change is significant, we will also tell you in Gradileo or by
          email before it takes effect.
        </p>
      </Section>

      <Section id="contact" title="13. Contact us">
        <p>
          Questions or requests about privacy: email <Mail />. See also our <Link className="text-brand hover:underline" to="/terms">Terms of Service</Link>.
        </p>
      </Section>
    </LegalLayout>
  );
}
