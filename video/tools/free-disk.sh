#!/bin/bash
# Usage: video/tools/free-disk.sh [--dry-run] <course id>...
# Example: video/tools/free-disk.sh math-20-1 math-20-2
#
# Moves finished courses out of this session to make room: uploads each course to Google Drive
# (files Drive already holds are skipped), and only when every scripted video of the course is
# reported with all four files unchanged (MP4, thumbnail, captions, YouTube text), deletes the
# course's narration (video/.cache/<id>.wav) and rendered folders (video/out/<id>/). A course with
# any video not rendered, not uploaded or changed is left as it is. --dry-run still uploads what
# Drive is missing, but only reports what would be deleted.
#
# Clear only finished courses, never the one still rendering: render-units.sh would render a
# cleared course again from the start.
set -u
cd "$(dirname "$0")/../.."
export NODE_USE_ENV_PROXY=1
dry=0
if [ "${1:-}" = "--dry-run" ]; then dry=1; shift; fi
test $# -gt 0 || { echo "usage: free-disk.sh [--dry-run] <course id>..."; exit 1; }
status=0
for course in "$@"; do
  # The folder drops the course id's first hyphen: math-20-1 is math20-1, chem-10 is chem10.
  dir=${course/-/}
  test -d "src/content/$dir/videos" || { echo "=== $course: no scripts in src/content/$dir/videos"; status=1; continue; }
  # Video ids: m20-1-1-b, c10-2-3 (the lib folder of figure helpers has no hyphen).
  ids=$(ls "src/content/$dir/videos" | sed 's/\.ts$//' | grep -E '^[a-z]+[0-9a-z]*(-[0-9a-z]+)+$' | sort -V)
  # With no ids, nothing below would be checked, and du would measure the whole repository.
  test -n "$ids" || { echo "=== $course: no video scripts in src/content/$dir/videos"; status=1; continue; }
  log=$(npx tsx video/tools/drive-upload.ts "$course" 2>&1)
  missing=""
  for id in $ids; do
    echo "$log" | grep -q -F "$id -> " || { missing="$missing $id"; continue; }
    echo "$log" | grep -F "$id -> " | grep -q -F ": $id.mp4 unchanged, thumbnail.png unchanged, captions.srt unchanged, youtube.txt unchanged" \
      || missing="$missing $id"
  done
  if [ -n "$missing" ]; then
    echo "=== $course: not cleared; $(echo $missing | wc -w) videos were not in Drive yet (unrendered, just uploaded or changed): ${missing:1:60}…"
    status=1
    continue
  fi
  n=$(echo "$ids" | wc -w)
  before=$(du -sch $(for id in $ids; do echo "video/out/$id"; test -e "video/.cache/$id.wav" && echo "video/.cache/$id.wav"; done) 2>/dev/null | tail -1 | cut -f1)
  if [ $dry = 1 ]; then echo "=== $course: all $n videos are in Drive; would free $before"; continue; fi
  for id in $ids; do rm -rf -- "video/out/$id" "video/.cache/$id.wav"; done
  echo "=== $course: all $n videos are in Drive; freed $before"
done
df -h / | tail -1
exit $status
