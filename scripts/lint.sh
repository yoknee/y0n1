#!/usr/bin/env bash
# Lint case study content against the rules in CLAUDE.md.
# Scans cases/, shared/ and resume/ (not CLAUDE.md, which quotes the rules).
# Fails if any em dash, Oxford comma or denylisted term appears.
# Denylist: scripts/lint-denylist.txt, one case-insensitive term per line,
# for real names, codenames and client names. Lines starting with # are ignored.

set -u
cd "$(dirname "$0")/.."

targets=()
for d in cases shared resume; do
  [ -d "$d" ] && targets+=("$d")
done
if [ ${#targets[@]} -eq 0 ]; then
  echo "lint: nothing to scan"
  exit 0
fi

fail=0
include=(--include='*.md' --include='*.html' --include='*.svg' --include='*.css' --include='*.js' --include='*.json' --include='*.txt')
emdash=$(printf '\xe2\x80\x94')

report() {
  echo "lint: $1"
  echo "$2" | sed 's/^/  /'
  fail=1
}

hits=$(grep -rnI "${include[@]}" -e "$emdash" "${targets[@]}")
[ -n "$hits" ] && report "em dash found" "$hits"

# Oxford comma: "a, b, and c" or "a, b, or c"
hits=$(grep -rnIE "${include[@]}" -e '[^,]+, [^,]+, (and|or) ' "${targets[@]}")
[ -n "$hits" ] && report "possible Oxford comma" "$hits"

deny=scripts/lint-denylist.txt
if [ -f "$deny" ]; then
  terms=$(grep -v '^[[:space:]]*#' "$deny" | grep -v '^[[:space:]]*$')
  if [ -n "$terms" ]; then
    hits=$(grep -rnIiF "${include[@]}" -f <(echo "$terms") "${targets[@]}")
    [ -n "$hits" ] && report "denylisted term found" "$hits"
  fi
else
  echo "lint: warning: $deny missing, real-name and client-name checks skipped"
fi

if [ $fail -eq 0 ]; then
  echo "lint: ok"
fi
exit $fail
