---
title: 🐧 Linux 
---

# Shell Aliases

## 🐧 OS & Shell (Linux Mint / Bash)

### SYSTEM MAINTENANCE & SEARCH
```bash
> sysup     # Full system update & cleanup 'sudo apt update && sudo apt upgrade -y && sudo apt autoremove -y && sudo apt autoclean'
> ports     # Show open ports & listening services 'sudo lsof -i -P -n | grep LISTEN'
> killport  # Kill process on specific port (Usage: killport 8080) 'kill -9 $(lsof -t -i:$1)'
> myip      # Get public IP 'curl ifconfig.me'
> fdir      # Find dir size quickly 'du -sh ./*'
> findtext  # Ripgrep text search (if installed) 'rg --hidden -g "!.git"'
> tail-sys  # Tail system logs for sudden issues 'journalctl -f'
```

### DIRECTORY NAVIGATION
```bash
> ..    # 'cd ..'
> ...   # 'cd ../..'
> ....  # 'cd ../../..'
> ~     # 'cd ~'
> cdb   # Go to previous directory 'cd -'
```

---

## 🐙 Git & GitHub Workflow

### ADVANCED GIT ALIASES
```bash
> gs        # Git status 'git status -sb'
> gaa       # Add all 'git add .'
> gcm       # Commit with msg 'git commit -m'
> gcam      # Add all and commit 'git commit -am'
> game      # Amend last commit without changing message 'git commit --amend --no-edit'
> gundo     # Undo last commit but keep changes 'git reset --soft HEAD~1'
> gnuke     # DESTROY all uncommitted changes 'git clean -df && git reset --hard'
> gco       # Checkout branch 'git checkout'
> gcb       # Create and checkout new branch 'git checkout -b'
> gpl       # Pull with rebase 'git pull --rebase'
> gps       # Push 'git push'
> gpsf      # Force push with lease (safer than -f) 'git push --force-with-lease'
> glog      # Beautiful git log graph 'git log --graph --pretty=format:"%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset" --abbrev-commit'
> gsquash   # Interactive rebase last N commits (Usage: gsquash 3) 'git rebase -i HEAD~'
```

### GITHUB CLI (`gh`)
```bash
> gh-pr     # Create a PR interactively 'gh pr create --web'
> gh-view   # View current PR checks/status 'gh pr status'
> gh-repo   # Open repo in browser 'gh repo view --web'
```

---

## 🤖 AI Assistants (Copilot CLI & OpenClaw)

### GITHUB COPILOT CLI
```bash
> wtf       # Copilot explain a command 'gh copilot explain'
> suggest   # Copilot suggest a command 'gh copilot suggest'
> sg-git    # Suggest a git command 'gh copilot suggest -t git'
> sg-shell  # Suggest a shell script 'gh copilot suggest -t shell'
```

### OPENCLAW AI 
```bash
> claw-rev  # Run OpenClaw code review on staged files 'openclaw review --staged'
> claw-test # Generate tests for specific file 'openclaw generate tests --file'
> claw-doc  # Generate PHPDoc/JSDoc for current file 'openclaw document --inline'
> claw-opt  # Analyze file for performance bottlenecks 'openclaw analyze --focus=performance'
```

## Coming Soon
- Detailed setup instructions
- Code examples
- Best practices
