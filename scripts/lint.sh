#!/usr/bin/env bash
# Lint the repo against the confidentiality and voice rules in CLAUDE.md.
#
# Scans every tracked or untracked-but-not-ignored text file, outside .git and
# node_modules, except this script (it holds the patterns it searches for).
#
# Rules, each printed as file:line:text:
#   1. Banned terms: case-insensitive match of any term in scripts/banned-terms.txt
#      (gitignored; real names, the client name, internal codenames). File paths
#      are checked as well. Skipped with a warning if the file does not exist.
#   2. Palette hex: any hex colour listed in banned-terms.txt (PwC brand palette).
#   3. Brand words: "PwC logo" and "PwC orange".
#   4. Em dash: the character, plus the &mdash; &#8212; &#x2014; HTML forms.
#   5. Likely Oxford comma: heuristic, a clause with two commas and then
#      ", and" or ", or". Prints file and line for you to judge.
#
# banned-terms.txt format: one term per line. Blank lines are ignored. A line
# starting with # is a comment unless it is a hex colour (#rgb, #rrggbb or
# #rrggbbaa), which is treated as a palette entry. List hex values with the #.
#
# Exits 1 on any hit, 0 otherwise. Override the terms file with BANNED_TERMS=path.

set -u
cd "$(dirname "$0")/.."

terms_file="${BANNED_TERMS:-scripts/banned-terms.txt}"
self="scripts/lint.sh"

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# --- file list -------------------------------------------------------------
files=()
if git rev-parse --git-dir >/dev/null 2>&1; then
  while IFS= read -r -d '' f; do files+=("$f"); done \
    < <(git ls-files -z --cached --others --exclude-standard)
else
  while IFS= read -r -d '' f; do files+=("${f#./}"); done \
    < <(find . \( -path ./.git -o -path '*/node_modules' \) -prune -o -type f -print0)
fi

scan=()
for f in "${files[@]}"; do
  case "$f" in
    "$self"|.git/*|node_modules/*|*/node_modules/*) continue ;;
  esac
  [ -f "$f" ] && scan+=("$f")
done

# --- reporting -------------------------------------------------------------
total=0
declare -A counts
order=()

record() { # name, hits
  local name="$1" hits="$2" n
  [ -z "$hits" ] && return
  n=$(printf '%s\n' "$hits" | wc -l)
  counts["$name"]=$(( ${counts["$name"]:-0} + n ))
  total=$(( total + n ))
  case " ${order[*]:-} " in *" $name "*) ;; *) order+=("$name") ;; esac
  echo "== $name"
  printf '%s\n' "$hits" | sed 's/^/  /'
}

search() { # grep args..., prints file:line:text hits across scan files
  [ ${#scan[@]} -eq 0 ] && return
  grep -nI "$@" -- "${scan[@]}" 2>/dev/null
}

# --- rule 1 and 2: banned terms and palette hex -----------------------------
hex_re='^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$'
: > "$tmp/terms"
: > "$tmp/hex"
if [ -f "$terms_file" ]; then
  while IFS= read -r line || [ -n "$line" ]; do
    line="${line%$'\r'}"
    line="${line#"${line%%[![:space:]]*}"}"
    line="${line%"${line##*[![:space:]]}"}"
    [ -z "$line" ] && continue
    if [[ "$line" =~ $hex_re ]]; then
      printf '%s\n' "$line" >> "$tmp/hex"
    elif [[ "$line" == \#* ]]; then
      continue
    else
      printf '%s\n' "$line" >> "$tmp/terms"
    fi
  done < "$terms_file"
else
  echo "lint: warning: $terms_file not found, banned-term and palette-hex checks skipped" >&2
fi

if [ -s "$tmp/terms" ]; then
  record "banned term" "$(search -iF -f "$tmp/terms")"
  record "banned term in file path" \
    "$(printf '%s\n' "${scan[@]}" | grep -iF -f "$tmp/terms")"
fi
if [ -s "$tmp/hex" ]; then
  record "palette hex" "$(search -iF -f "$tmp/hex")"
fi

# --- rule 3: brand words ----------------------------------------------------
record "brand word" "$(search -iE 'PwC[[:space:]]+(logo|orange)')"

# --- rule 4: em dash --------------------------------------------------------
emdash=$(printf '\xe2\x80\x94')
record "em dash" "$(search -E "${emdash}|&mdash;|&#8212;|&#x2014;")"

# --- rule 5: likely Oxford comma --------------------------------------------
record "likely Oxford comma (judge each)" \
  "$(search -E '[^,.;:!?]+,[^,.;:!?]+, (and|or) ')"

# --- summary ----------------------------------------------------------------
echo
echo "lint: scanned ${#scan[@]} files"
if [ "$total" -eq 0 ]; then
  echo "lint: ok, 0 hits"
  exit 0
fi
for name in "${order[@]}"; do
  echo "lint: ${counts[$name]} x $name"
done
echo "lint: FAIL, $total hits"
exit 1
