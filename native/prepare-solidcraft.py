"""Prepare the pinned Rust UI dependency. Python is only required when building."""
import hashlib
import io
import json
from pathlib import Path
import subprocess
import tarfile
import tempfile

ROOT = Path(__file__).resolve().parent
REV = 'fa691707c224cae580c42201ed3a22d5e4b8c716'
PATCH = ROOT / 'patches/solidcraft-host-ribbon.patch'
DEST = ROOT / 'vendor/solidcraft'
MARKER = DEST / 'RV-UPSTREAM.json'
EXPECTED = {'revision': REV, 'patch_sha256': hashlib.sha256(PATCH.read_bytes()).hexdigest()}


def run(*args, cwd=None):
    return subprocess.check_output(args, cwd=cwd)


def main():
    if MARKER.exists() and json.loads(MARKER.read_text()) == EXPECTED:
        print('SolidCraft UI ready:', REV)
        return
    if DEST.exists() and any(DEST.iterdir()):
        raise SystemExit('Generated native/vendor/solidcraft is stale. Remove that generated directory and run again.')
    with tempfile.TemporaryDirectory() as tmp:
        run('git', 'init', tmp)
        run('git', 'fetch', '--depth=1', 'https://github.com/tangency-labs/solidcraft', REV, cwd=tmp)
        if run('git', 'rev-parse', 'FETCH_HEAD', cwd=tmp).decode().strip() != REV:
            raise SystemExit('Unexpected upstream revision')
        archive = run('git', 'archive', REV, cwd=tmp)
        DEST.mkdir(parents=True, exist_ok=True)
        with tarfile.open(fileobj=io.BytesIO(archive)) as tar:
            tar.extractall(DEST, filter='data')
    run('git', 'apply', '--check', str(PATCH), cwd=DEST)
    run('git', 'apply', str(PATCH), cwd=DEST)
    MARKER.write_text(json.dumps(EXPECTED, indent=2))
    print('Prepared SolidCraft UI:', REV)


if __name__ == '__main__':
    main()
