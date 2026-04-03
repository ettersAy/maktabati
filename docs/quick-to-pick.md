---
title: Quick
description: All My Quick-to-Pick
---

# ⚡ Quick-to-Pick 

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

---

## ⛵ Laravel 13 (Sail, PHPUnit, DB)

### CORE SAIL & ARTISAN
```bash
> s         # Base Sail command './vendor/bin/sail'
> sart      # Sail Artisan 'sail artisan'
> sup       # Start Sail detached 'sail up -d'
> sdown     # Stop Sail 'sail down'
> sbuild    # Rebuild containers (no cache) 'sail build --no-cache'
> sroot     # Enter container as root 'sail root-shell'
> sshell    # Enter container as sail user 'sail shell'
```

### DATABASE & QUEUES
```bash
> smfs      # Fresh DB + Seed 'sail artisan migrate:fresh --seed'
> sm        # Migrate 'sail artisan migrate'
> sroll     # Rollback last migration 'sail artisan migrate:rollback'
> sq        # Listen to queues 'sail artisan queue:work'
> sq-clear  # Clear failed jobs 'sail artisan queue:flush'
```

### CACHE & OPTIMIZATION
```bash
> snuke     # The ultimate cache clearer 'sail artisan optimize:clear && sail artisan event:clear && sail artisan view:clear'
> sopt      # Cache for production 'sail artisan optimize'
```

### PHPUNIT & PEST TESTING
```bash
> st        # Run all tests 'sail test'
> stp       # Run tests in parallel 'sail test --parallel'
> stf       # Filter test by name (Usage: stf methodName) 'sail test --filter'
> stc       # Run tests with coverage report 'sail test --coverage'
> st-failed # Re-run only failed tests 'sail test --only-fail'
```

---

## 💚 VueJS 3 & Vite Frontend

### NPM / NODE ALIASES
```bash
> ni        # Install dependencies 'npm install'
> nr        # Run dev server 'npm run dev'
> nb        # Build for production 'npm run build'
> nlint     # Run ESLint & Prettier 'npm run lint && npm run format'
> nfresh    # Nuke node_modules and reinstall 'rm -rf node_modules package-lock.json && npm install'
```

### VITE SPECIFIC
```bash
> vite-clear # Force Vite to clear dependency cache 'npm run dev -- --force'
> vite-prof  # Build with rollup performance breakdown 'npm run build -- --profile'
```

---

## 🎭 E2E Testing (Playwright)

```bash
> make e2e       # Run E2E tests, stop after the first failure
> make e2e-f     # Run the full E2E suite even if failures occur
> make e2e-ui    # Open Playwright UI mode
> make e2e-report # Show Playwright HTML report
> e2e-debug       # Run tests in debug mode 'npx playwright test --debug'
> e2e-trace       # View trace of a failed test 'npx playwright show-trace'
> e2e-gen         # Open Playwright Inspector to record a test 'npx playwright codegen'
> e2e-up          # Update Playwright browsers 'npx playwright install'
```

---

## 🧠 AI Prompts & Contexts (Copy/Paste Ready)

### 1. The Code Reviewer Prompt
> "Act as a Senior Principal Engineer. Review the following Laravel 13 / Vue 3 code. Focus strictly on: 
> 1. Security vulnerabilities (OWASP, SQLi, XSS). 
> 2. Performance bottlenecks (N+1 queries, memory leaks, unoptimized reactivity in Vue). 
> 3. Clean Code principles and SOLID adherence. 
> Do not nitpick formatting. Provide actionable refactoring suggestions with code blocks."

### 2. The Vue 3 Composition API Refactor
> "Refactor this Vue Options API component into Vue 3 Composition API using `<script setup>`. Ensure you:
> 1. Use `ref` for primitives and `reactive` for objects only where appropriate.
> 2. Extract complex logic into a reusable composable (`useSomething.js`).
> 3. Strongly type the props and emits using TypeScript (if applicable) or strict Vue prop definitions.
> 4. Keep the template untouched unless absolutely necessary for the new script bindings."

### 3. The Playwright Edge-Case Prompt
> "Write a Playwright E2E test in TypeScript for a Vue 3 SPA. The scenario is [INSERT SCENARIO]. 
> Constraints: 
> 1. Do not rely on fixed timeouts (`page.waitForTimeout`); use network idleness or element visibility (`waitForSelector`). 
> 2. Mock the Laravel backend API response for the endpoint `/api/v1/resource` using `page.route()`. 
> 3. Ensure the test accounts for mobile viewports as well."

### 4. General Context Block (Paste at the start of new AI chats)
> **Context:** I am a Senior Developer. My stack is Linux Mint, Laravel 13 (using Sail, PHPUnit), Vue 3 (Composition API, Vite), and Playwright for E2E. Assume I know the basics. Skip tutorials, skip explanations of basic syntax. Give me production-ready, highly optimized, secure code snippets. Prefer modern, idiomatic approaches over legacy ones.

---

## 🔗 Quick Links

| Resource | Description | Path/URL |
| :--- | :--- | :--- |
| **Local Services** | Laravel App | `http://localhost` |
| **Local Services** | Mailpit (Catch Emails) | `http://localhost:8025` |
| **Local Services** | Horizon (Queue Monitor) | `http://localhost/horizon` |
| **Local Services** | Telescope (Debug) | `http://localhost/telescope` |
| **Documentation** | Laravel 13 Docs | [laravel.com/docs/13.x](https://laravel.com/docs) |
| **Documentation** | Vue 3 Docs | [vuejs.org/guide](https://vuejs.org/guide/introduction.html) |
| **Documentation** | Playwright | [playwright.dev/docs](https://playwright.dev/docs/intro) |

---

## 🎨 Quick Emojis (Conventional Commits Style)

| Category | Emojis |
| :--- | :--- |
| **Core & Features** | :sparkles: `:sparkles:` \| :bug: `:bug:` \| :hammer: `:hammer:` \| :rocket: `:rocket:` \| :zap: `:zap:` \| :tada: `:tada:` |
| **Docs & Quality** | :books: `:books:` \| :bulb: `:bulb:` \| :pencil: `:pencil:` \| :art: `:art:` \| :lipstick: `:lipstick:` \| :shirt: `:shirt:` |
| **Dependencies** |:package: `:package:` \| 🧊 `:ice_cube:` \| 🛡️ :Shield: \| :wrench: `:wrench:` \| :arrow_up: `:arrow_up:` \| :arrow_down: `:arrow_down:` \| :whale: `:whale:` \| :heavy_plus_sign: `:heavy_plus_sign:` |
| **Tests & CI** | :white_check_mark: `:white_check_mark:` \| :rotating_light: `:rotating_light:` \| :green_heart: `:green_heart:` \| :construction: `:construction:` \| :construction_worker: `:construction_worker:` \| :checkered_flag: `:checkered_flag:` |
| **Actions** | :fire: `:fire:` \| :rewind: `:rewind:` \| :boom: `:boom:` \| :truck: `:truck:` \| :lock: `:lock:` \| :ambulance: `:ambulance:` |
| **Extras** | :card_index: `:card_index:` \| :alien: `:alien:` \| :chart_with_upwards_trend: `:chart_with_upwards_trend:` \| :heavy_minus_sign: `:heavy_minus_sign:` \| :ok_hand: `:ok_hand:` \| :wheelchair: `:wheelchair:` |
| **Status & Health** | ☀️ `:sun:` \| 🌨🌨️🌨☁️☁🌩️ 🌩 `:cloud:` \| :rainbow: `:rainbow:` \| :zap: `:zap:` \| :battery_full: `:battery_full:` \| :exclamation: `:exclamation:` |
| **Server & Services** | :server: `:server:` \| :globe_with_meridians: `:globe_with_meridians:` \| :satellite: `:satellite:` \| :link: `:link:` \| :key: `:key:` \| :lock: `:lock:` |
| **User & Profile** | :man_running: `:man_running:` \| :woman_running: `:woman_running:` \| :person_bowing: `:person_bowing:` \| :handshake: `:handshake:` \| :speech_balloon: `:speech_balloon:` \| :eyes: `:eyes:` |
| **Emotions & Feedback** | :grinning: `:grinning:` \| :sweat_smile: `:sweat_smile:` \| :cry: `:cry:` \| :tired_face: `:tired_face:` \| :thinking: `:thinking:` \| :thumbsup: `:thumbsup:` |
| **Navigation & Home** | :house: `:house:` \| :home: `:home:` \| :arrow_forward: `:arrow_forward:` \| :arrow_backward: `:arrow_backward:` \| :bookmark: `:bookmark:` \| :star: `:star:` |
| **Time & Calendar** | :hourglass: `:hourglass:` \| :alarm_clock: `:alarm_clock:` \| :calendar: `:calendar:` \| :clock1230: `:clock1230:` \| :date: `:date:` \| :new: `:new:` |
| **Environment & Nature** | :tree: `:tree:` \| :mountain: `:mountain:` \| :ocean: `:ocean:` \| :fire: `:fire:` \| :wind_chime: `:wind_chime:` \| :snowflake: `:snowflake:` |
| **Tech & Tools** | :computer: `:computer:` \| :mobile_phone: `:mobile_phone:` \| :desktop_computer: `:desktop_computer:` \| :printer: `:printer:` \| :floppy_disk: `:floppy_disk:` \| :cd: `:cd:` |
| **Security & Access** | :shield: `:shield:` \| :closed_lock_with_key: `:closed_lock_with_key:` \| :open_lock: `:open_lock:` \| :id_card: `:id_card:` \| :dna: `:dna:` \| :microscope: `:microscope:` |
| **Miscellaneous** | :gift: `:gift:` \| :balloon: `:balloon:` \| :ribbon: `:ribbon:` \| :sparkler: `:sparkler:` \| :party_popper: `:party_popper:` \| :confetti_ball: `:confetti_ball:` |