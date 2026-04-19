from __future__ import annotations

import re
import subprocess
from collections import OrderedDict
from pathlib import Path
from urllib.parse import quote

import yaml


REPO_ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = REPO_ROOT / "docs"
OUTPUT_FILE = DOCS_DIR / "changelog.yml"
CHANGELOG_PLACEHOLDER = "auto"
MAX_COMMITS = 120
IGNORE_PATHS = {
    "docs/changelog.yml",
}
TRACKED_PREFIXES = (
    "docs/",
    "overrides/",
    "hooks/",
    ".github/workflows/",
)
TRACKED_FILES = {
    "mkdocs.yml",
    "requirements.txt",
}


def _run_git(*args: str) -> str:
    result = subprocess.run(
        ["git", *args],
        cwd=REPO_ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return result.stdout


def _should_track(path: str) -> bool:
    if path in IGNORE_PATHS:
        return False
    if path in TRACKED_FILES:
        return True
    return path.startswith(TRACKED_PREFIXES)


def _is_markdown_page(path: str) -> bool:
    return path.startswith("docs/") and path.endswith(".md") and not path.startswith("docs/assets/")


def _clean_subject(subject: str) -> str:
    subject = subject.strip()
    subject = re.sub(r"^(docs?|feat|fix|style|refactor|chore):\s*", "", subject, flags=re.I)
    return subject or "更新站点内容"


def _read_title(path: str) -> str | None:
    file_path = REPO_ROOT / path
    if not file_path.exists():
        return None
    heading_re = re.compile(r"^\s*#\s+(.+?)\s*$")
    with file_path.open("r", encoding="utf-8") as handle:
        for line in handle:
            match = heading_re.match(line)
            if match:
                return match.group(1).strip()
    return None


def _path_to_url(path: str, site_url: str) -> str:
    relative = path.removeprefix("docs/")
    if relative == "index.md":
        slug = ""
    elif relative.endswith("/index.md"):
        slug = relative[: -len("index.md")]
    elif relative.endswith(".md"):
        slug = relative[: -len(".md")] + "/"
    else:
        slug = relative
    encoded = "/".join(quote(part) for part in slug.split("/") if part)
    return f"{site_url.rstrip('/')}/{encoded}/" if encoded else f"{site_url.rstrip('/')}/"


def _commit_url(repo_url: str, sha: str) -> str:
    return f"{repo_url.rstrip('/')}/commit/{sha}"


def _classify_change(subject: str, changes: list[tuple[str, str]]) -> str:
    lowered = subject.lower()
    if any(status == "A" and _is_markdown_page(path) for status, path in changes):
        return "newpage"
    if any(word in lowered for word in ("refactor", "重构", "theme", "结构", "css")):
        return "refactor"
    if any(_is_markdown_page(path) for _, path in changes):
        return "pageupdate"
    return "function"


def _build_entry(subject: str, sha: str, changes: list[tuple[str, str]], site_url: str, repo_url: str) -> dict[str, dict[str, str]]:
    change_type = _classify_change(subject, changes)
    markdown_paths = [path for _, path in changes if _is_markdown_page(path)]
    text = _clean_subject(subject)
    href = _commit_url(repo_url, sha)

    if len(markdown_paths) == 1:
        title = _read_title(markdown_paths[0])
        if title:
            text = title if change_type in {"newpage", "pageupdate"} else f"{text} · {title}"
        href = _path_to_url(markdown_paths[0], site_url)

    return {
        change_type: {
            "text": text,
            "href": href,
        }
    }


def _load_commits() -> list[tuple[str, str, str, list[tuple[str, str]]]]:
    raw = _run_git(
        "log",
        f"--max-count={MAX_COMMITS}",
        "--date=short",
        "--pretty=format:__COMMIT__%n%H%x09%ad%x09%s",
        "--name-status",
        "--",
        ".",
    )
    commits: list[tuple[str, str, str, list[tuple[str, str]]]] = []
    for block in raw.split("__COMMIT__"):
        lines = [line for line in block.splitlines() if line.strip()]
        if not lines:
            continue
        sha, date, subject = lines[0].split("\t", 2)
        changes: list[tuple[str, str]] = []
        for line in lines[1:]:
            parts = line.split("\t")
            if len(parts) < 2:
                continue
            status = parts[0][0]
            path = parts[-1]
            if _should_track(path):
                changes.append((status, path))
        if changes:
            commits.append((sha, date, subject, changes))
    return commits


def _write_changelog(site_url: str, repo_url: str) -> None:
    grouped: OrderedDict[str, list[dict[str, dict[str, str]]]] = OrderedDict()
    for sha, date, subject, changes in _load_commits():
        grouped.setdefault(date, []).append(_build_entry(subject, sha, changes, site_url, repo_url))

    payload = [
        {
            CHANGELOG_PLACEHOLDER: [{date: entries} for date, entries in grouped.items()]
        }
    ]
    OUTPUT_FILE.write_text(
        yaml.safe_dump(payload, allow_unicode=True, sort_keys=False),
        encoding="utf-8",
    )


def on_config(config, **kwargs):
    _write_changelog(config["site_url"], config["repo_url"])
    return config
