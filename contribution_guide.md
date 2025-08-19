# Basic Contribution Guide
## Start a feature branch (same-repo)

```bash
# Sync local main
git fetch origin
git checkout main
git pull --ff-only

# Create and switch to a new branch
git switch -c feat/short-description   # or: git checkout -b feat/short-description

# Work, then commit
git add -A
git commit -m "feat(scope): short, imperative summary"
```

---

## Push and open a PR

```bash
# First push sets upstream
git push -u origin feat/short-description
```

Create a Pull Request to `main` in GitHub.

*(Optional, if you use GitHub CLI)*:

```bash
gh pr create --base main --fill
```

---

## Keep your branch up to date (rebase onto main)

```bash
git fetch origin
git checkout feat/short-description
git rebase origin/main
# if conflicts:
#  - edit files to fix
git add -A
git rebase --continue
# to bail out:
# git rebase --abort

# Update the remote branch after rebase
git push --force-with-lease
```

---

## Update PR after review

```bash
# Make changes
git add -A
git commit --amend -m "feat(scope): refined summary"   # or make a new commit

# Keep current with main (if needed)
git fetch origin
git rebase origin/main

# Push safely
git push --force-with-lease
```

---

## Clean up after merge

```bash
# Sync main
git checkout main
git pull --ff-only

# Delete local & remote branch
git branch -d feat/short-description
git push origin --delete feat/short-description
```

---

## Branch, rebase, push

```bash
git switch -c feat/short-description   # or: git checkout -b ...
# work, then:
git add -A && git commit -m "feat(scope): message"

# Keep branch current with upstream main
git fetch upstream
git rebase upstream/main

# Push to your fork and open PR to ORIGINAL_ORG/main
git push --force-with-lease -u origin feat/short-description
```

---

**Notes**

* Use `--force-with-lease` (never plain `--force`) when updating rebased branches.
* Keep commits focused; prefer small PRs targeting `main`.
