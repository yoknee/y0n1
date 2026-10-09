#!/usr/bin/env bash
# Lint the repo against the confidentiality and voice rules in CLAUDE.md.
#
# Scans every tracked or untracked-but-not-ignored text file, outside .git and
# node_modules, except this script (it holds the patterns it searches for).
#
# Rules, each printed as file:line:text:
#   1. Banned terms: case-insensitive, WHOLE-WORD match of any term in
#      scripts/banned-terms.txt (gitignored; real names, the client name,
#      internal codenames). File paths are checked as well. Skipped with a
#      warning if the file does not exist.
#        - Exempt from rule 1 contents: CLAUDE.md and index.html.
#        - Exempt from rule 1 paths: image files (png jpg jpeg gif webp avif ico bmp).
#        - Maestro, SLT and State Lifecycle Tool are public product names. They
#          are allowed in file paths and in README.md, one-pager.md,
#          talk-track.md and decisions.md. They are still flagged anywhere under
#          artifacts/, prototype/ or data/ (screens and data use the stand-in
#          brands Baton and Statewise) and in every other file.
#        - Every other term is banned everywhere outside the exemptions above.
#   2. Palette hex: any hex colour listed in banned-terms.txt (PwC brand palette).
#   3. Brand words: "PwC logo" and "PwC orange".
#   4. Em dash: the character, plus the &mdash; &#8212; &#x2014; HTML forms.
#   5. Likely Oxford comma: heuristic, a clause with two commas and then
#      ", and" or ", or". Prints file and line for you to judge.
#   Rules 4 and 5 (voice) scan cases/, shared/ and resume/ only. The site files
#   and CLAUDE.md are outside them. Rules 1 to 3 scan every file; rules 2 and 3
#   also cover the rule 1 exemptions.
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

# Rules 4 and 5 scan only these top-level folders.
voice_dirs_re='^(cases|shared|resume)/'

# Rule 1 exemptions and allowances.
exempt_contents=(CLAUDE.md index.html)
image_ext_re='\.(png|jpe?g|gif|webp|avif|ico|bmp)$'
narrative_ok_terms=(maestro slt "state lifecycle tool")
narrative_ok_files=(README.md one-pager.md talk-track.md decisions.md)
no_narrative_dirs_re='(^|/)(artifacts|prototype|data)/'

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

search_in() { # array-name, grep args...; prints file:line:text hits
  local -n _files="$1"; shift
  [ ${#_files[@]} -eq 0 ] && return
  grep -nI "$@" -- "${_files[@]}" 2>/dev/null
}
search() { search_in scan "$@"; }

in_list() { # needle, list...; case-sensitive exact match
  local n="$1" x; shift
  for x in "$@"; do [ "$x" = "$n" ] && return 0; done
  return 1
}

# --- rule 1 and 2: banned terms and palette hex -----------------------------
hex_re='^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$'
: > "$tmp/strict"
: > "$tmp/narrative"
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
    elif in_list "${line,,}" "${narrative_ok_terms[@]}"; then
      printf '%s\n' "$line" >> "$tmp/narrative"
    else
      printf '%s\n' "$line" >> "$tmp/strict"
    fi
  done < "$terms_file"
else
  echo "lint: warning: $terms_file not found, banned-term and palette-hex checks skipped" >&2
fi

# Files checked for banned-term contents.
term_files=()      # everything except the exempt files
narrative_files=() # files where the public product names are flagged
for f in "${scan[@]}"; do
  in_list "$f" "${exempt_contents[@]}" && continue
  term_files+=("$f")
  if in_list "$(basename "$f")" "${narrative_ok_files[@]}" \
     && ! [[ "$f" =~ $no_narrative_dirs_re ]]; then
    continue
  fi
  narrative_files+=("$f")
done

# Paths checked for banned terms: all but image files.
path_list=()
for f in "${scan[@]}"; do
  [[ "${f,,}" =~ $image_ext_re ]] || path_list+=("$f")
done

if [ -s "$tmp/strict" ]; then
  record "banned term" "$(search_in term_files -iFw -f "$tmp/strict")"
  [ ${#path_list[@]} -gt 0 ] && record "banned term in file path" \
    "$(printf '%s\n' "${path_list[@]}" | grep -iFw -f "$tmp/strict")"
fi
if [ -s "$tmp/narrative" ]; then
  record "public product name outside README/one-pager/talk-track/decisions, or inside artifacts/prototype/data" \
    "$(search_in narrative_files -iFw -f "$tmp/narrative")"
fi
if [ -s "$tmp/hex" ]; then
  record "palette hex" "$(search -iFw -f "$tmp/hex")"
fi

# --- rule 3: brand words ----------------------------------------------------
record "brand word" "$(search -iE 'PwC[[:space:]]+(logo|orange)')"

voice=()
for f in "${scan[@]}"; do
  [[ "$f" =~ $voice_dirs_re ]] && voice+=("$f")
done

# --- rule 4: em dash --------------------------------------------------------
emdash=$(printf '\xe2\x80\x94')
record "em dash" "$(search_in voice -E "${emdash}|&mdash;|&#8212;|&#x2014;")"

# --- rule 5: likely Oxford comma --------------------------------------------
record "likely Oxford comma (judge each)" \
  "$(search_in voice -E '[^,.;:!?]+,[^,.;:!?]+, (and|or) ')"

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
