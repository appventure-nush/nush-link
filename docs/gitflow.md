# Git work flow

## Rules

1. `main` will be our only branch as this is a small project
2. **Test locally** first
3. **Ask for help** on discord if you need help
4. Git commit in small chuncks

## Work flow

1. Create a new feature branch and run
   ```
   git checkout main
   git checkout -b YOUR-NEW-FEATURE
   ```
2. Make changes and commit:
   ```
   git status
   ... lists out the list of changed files ...
   git add filenames
   ```
   Commit change
   ```
   git commit -m "your commit message here"
   ```
   - Make meaningful commit messages, describe what you did etc
3. Try pulling from `main` and reoslve conflicts if they exist:
   ```
   git pull origin main
   ```
4. Push to git
   ```
   git push origin YOUR-NEW-BRANCH
   ```
5. Once the branch has been merged into the `main` branch do
   ```
   git pull origin main # Pull from github to main branch
   git branch -d YOUR-NEW-BRANCH
   ```
## Useful commands

1. `git status` : This shows you the files that have been modified and are "unstaged"
2. `git branch -l` : This tells you which branch you are on currently. Notice the \* next to the branch.
3. `git checkout branchname` : This switches to an existing branch. To access a remote branch, run `git fetch` first.
4. `git checkout -b branchname` : Creates a new branch locally
5. `git push origin branchname` : This pushes your commits to the remote branch associated
6. `git push -u origin branchname` : This creates a branch remotely. If it already exists, it will fail.
