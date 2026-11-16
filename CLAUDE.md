# Working on Gradileo

## Pull requests
- After every push to a pull request, read GitHub Copilot's review: the inline comments and the
  summary (including "previously missed" items). If Copilot has not reviewed the latest push,
  request a review. Fix every valid finding, reply on each thread naming the fixing commit, and
  resolve it; explain in the thread when a finding is not worth changing.
- Merge only when CI is green on the latest commit and the review findings are handled.
- The owner has authorized merging every PR without asking: once CI is green and any review
  findings are handled, merge (squash). Do not wait for a Copilot review that has not arrived.
- Check `git status` before committing; never commit build output (`dist/`, `*.tsbuildinfo`).

## Backups
- Before a major redesign or rewrite, commit and push a checkpoint of the working version first
  (say in the message that it is a checkpoint), so the change can be undone if the owner does
  not like it. Tell the owner which commit holds the backup.

## Checks before pushing
- `npm run typecheck`, `npm test`, `npm run build && node scripts/check-backend.mjs`
- `npx playwright test` (in the cloud container set
  `CHROMIUM_PATH=$(ls /opt/pw-browsers/chromium-*/chrome-linux*/chrome | head -1)`)
- `npm run functions:check` when anything under `engine/` or `supabase/functions/` changes.

## Curriculum content
- Courses live in `engine/curriculum/<course>/` (outcomes, units, lessons, generators) and
  `src/content/<course>/lessons/*.md`; see `docs/ARCHITECTURE.md` ("Adding a course").
- After adding or renaming a skill, run `npm run catalog` (the app loads skill names from the
  generated catalogue and each course's generators on demand).
- Money: write `\$` in Markdown, keep money out of `$...$` maths, grade to the cent
  (`decimals: 2, tolerance: 0.011`).
- State every rate, tax or rule inside the question; never claim a current official figure.
- Lesson figures: `:::figure` on its own line, the JSON on the next line, then `:::`.

## After merging engine or curriculum changes
The `grade-submission` and `ai-agent` Edge Functions re-grade with the shared engine. A merge that
changes `engine/` or `supabase/` runs the *Deploy Supabase backend* workflow, which applies new
migrations and redeploys the functions; check that the run succeeded. (`npm run functions:deploy`
deploys by hand.)

## Working with the owner
- Work through `docs/ROADMAP.md` in order, and update it as work progresses so nothing is dropped.
- After every push, check the CI result on GitHub as well as running the checks locally. Find and
  fix the cause of a red run; do not just run it again.
- The repository is public. Never print, commit or log secret values (GitHub secrets such as
  `SUPABASE_*` and `EMAIL_FORWARD_TO`, or the `GDRIVE_*` environment variables); name them only.
  Keep the owner's personal details, such as their email address, out of the repository.
- Explainer videos: follow `video/README.md` ("Making a course's videos, step by step"); the tools
  are in `video/tools/`.
- Keep room on the disk: the owner wants finished videos moved to Google Drive and cleared from
  the session, so a render never runs out of space. When free space (`df -h /`) falls under about
  6 GB, run `video/tools/free-disk.sh <course id>…` on finished courses. It deletes a course only
  after Drive is checked to hold every file of every video, and never the course still rendering.
