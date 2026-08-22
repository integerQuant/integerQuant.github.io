#!/bin/sh

set -eu

script_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)
repo_root=$(CDPATH='' cd -- "$script_dir/.." && pwd)
tmp_dir=$(mktemp -d "${TMPDIR:-/tmp}/knietty-bootstrap-test.XXXXXX")
cleanup() {
    rm -rf "$tmp_dir"
}
trap cleanup EXIT HUP INT TERM

# The literal variables belong to the generated fixture, not this test process.
# shellcheck disable=SC2016
printf '#!/bin/sh\nprintf "%%s\\n" "$*" > "$KNIETTY_BOOTSTRAP_TEST_OUTPUT"\n' > "$tmp_dir/knietty-install.sh"
if command -v sha256sum >/dev/null 2>&1; then
    (cd "$tmp_dir" && sha256sum knietty-install.sh > knietty-install.sh.sha256)
else
    (cd "$tmp_dir" && shasum -a 256 knietty-install.sh > knietty-install.sh.sha256)
fi

KNIETTY_INSTALLER_BASE_URL=file://$tmp_dir \
    KNIETTY_BOOTSTRAP_TEST_OUTPUT=$tmp_dir/arguments \
    sh "$repo_root/public/knietty" --version 9.8.7
[ "$(cat "$tmp_dir/arguments")" = '--version 9.8.7' ]

printf '%064d  knietty-install.sh\n' 0 > "$tmp_dir/knietty-install.sh.sha256"
if KNIETTY_INSTALLER_BASE_URL=file://$tmp_dir \
    KNIETTY_BOOTSTRAP_TEST_OUTPUT=$tmp_dir/should-not-exist \
    sh "$repo_root/public/knietty" >/dev/null 2>&1; then
    printf 'bad bootstrap checksum unexpectedly succeeded\n' >&2
    exit 1
fi
[ ! -e "$tmp_dir/should-not-exist" ]

printf 'bootstrap tests passed\n'
