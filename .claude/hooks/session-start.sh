#!/bin/bash
# The repository was renamed from EduCore to Gradileo. A cloud session started under the old name
# sets origin back to .../EduCore whenever its container restarts, so make git read the old address
# as the new one (this rule survives such a reset) and point origin at Gradileo.
set -euo pipefail
[ "${CLAUDE_CODE_REMOTE:-}" = "true" ] || exit 0
cd "${CLAUDE_PROJECT_DIR:-.}"
git rev-parse --git-dir > /dev/null 2>&1 || exit 0
git config url."https://github.com/Shedrackeze002/Gradileo".insteadOf "https://github.com/Shedrackeze002/EduCore"
url=$(git config --get remote.origin.url || true)
case "$url" in
  */[Ee]du[Cc]ore | */[Ee]du[Cc]ore.git) git remote set-url origin "${url%/*}/Gradileo" ;;
esac
