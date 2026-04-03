---
layout: home
title: Maktabati
hero:
  name: Maktabati
  text: By Ayoub Etters
  tagline: My Development Documentation Library A collection of projects, workflows, and technical guides
  actions:
    - theme: brand
      text: Browse Projects
      link: /projects/
    - theme: alt
      text: View Guides
      link: /guides/
features:
  - icon: 📦
    title: Projects
    details: Documentation for Moussawer and other development projects
  - icon: ⚙️
    title: Workflows
    details: Git strategies, Docker setups, and CI/CD pipelines
  - icon: 📚
    title: Guides
    details: VS Code, Ollama, AI APIs, and Linux configuration
  - icon: 📝
    title: Snippets
    details: Reusable code snippets for Laravel, Vue, and Shell
---

## Quick CMD

### Diver

```Bash
tree 
  -d            List directories only.
  -L level      Descend only level directories deep.
  -P pattern    List only those files that match the pattern given.
  -I pattern    Do not list files that match the given pattern.
  --gitignore   Filter by using .gitignore files.
  --ignore-case Ignore case when pattern matching.
```

### MOUSSAWER PROJECT ALIASES

```Bash
sail #Alias to short cmd inside the project '[ -f sail ] && sh sail || sh vendor/bin/sail'
$ mousail # Alias so you can lunch from any where '[ -f mousail ] && sh mousail || sh /opt/apps/moussawer/vendor/bin/sail'
$ sailup #to start the container in detached mode 'sail up -d' 
$ saildown # To stop container 'sail down'
$ saillogs # View logs 'sail logs -f'
$ sailtest # Run tests 'sail artisan test --parallel'
$ sailtinker # Open Tinker 'sail artisan tinker'
$ sailfresh # Reset DB 'sail artisan migrate:fresh --seed'
$ sailcache # Clear caches 'sail artisan optimize:clear'
$ sailbuild # Build assets & cache 'npm run build && sail artisan config:cache && sail artisan route:cache'

```

### MOUSSAWER PROJECT ALIASES

```Bash
$ dc # Docker compose alias 'docker compose'
$ dps # List containers 'docker ps --format "table \{\{.Names}}\t\{\{.Status}}\t\{\{.Ports}}"'
$ dlogs # View compose logs 'docker compose logs -f'
$ ddown # Stop compose 'docker compose down'
$ dup # Start compose 'docker compose up -d'
$ dprune # Remove unused data 'docker system prune -a'
$ ddf # Delete stopped containers 'docker container prune'
$ ddr # Remove dangling images 'docker image prune'

```

### E2E TESTING

```Bash
$ e2e # Playwright tests 'npx playwright test'
$ e2eui # UI mode 'npx playwright test --ui'
$ e2ereport # Show report 'npx playwright show-report e2e/reports/html'

```

### LOGGING & NAVIGATION 

```Bash
$ log-laravel # Tail Laravel log 'tail -f storage/logs/laravel.log'
$ log-err # Filter errors 'tail -f storage/logs/laravel.log | grep --color=always -iE "error|exception|critical|alert|emergency"'
$ mouss # Go to project 'cd /opt/apps/moussawer'
$ logs # Go to logs dir 'cd /opt/apps/moussawer/storage/logs'
```


## Quick Links

- [Maktabati Setup Guide](/guides/maktabati-setup) - How this site was built
- [Moussawer Project](/projects/moussawer/) - Client & Photographer platform
- [VS Code Setup](/guides/vscode/) - My complete editor configuration
- [Docker & Sail](/workflows/docker-sail/) - Container development workflow

## Quick Emoji

| Category | Emojis |
| :--- | :--- |
| **Dev & Hackers** | :penguin: `:penguin:` \| :apple: `:apple:` \| :checkered_flag: `:checkered_flag:` \| :hankey: `:hankey:` \| :alien: `:alien:` \| :construction_worker: `:construction_worker:` |
| **Core & Features** | :sparkles: `:sparkles:` \| :bug: `:bug:` \| :hammer: `:hammer:` \| :rocket: `:rocket:` \| :zap: `:zap:` \| :tada: `:tada:` |
| **Docs & Quality** | :books: `:books:` \| :bulb: `:bulb:` \| :pencil: `:pencil:` \| :art: `:art:` \| :lipstick: `:lipstick:` \| :shirt: `:shirt:` |
| **Dependencies** | :wrench: `:wrench:` \| :package: `:package:` \| :arrow_up: `:arrow_up:` \| :arrow_down: `:arrow_down:` \| :whale: `:whale:` \| :heavy_plus_sign: `:heavy_plus_sign:` |
| **Tests & CI** | :white_check_mark: `:white_check_mark:` \| :rotating_light: `:rotating_light:` \| :green_heart: `:green_heart:` \| :construction: `:construction:` \| :construction_worker: `:construction_worker:` \| :checkered_flag: `:checkered_flag:` |
| **Actions** | :fire: `:fire:` \| :rewind: `:rewind:` \| :boom: `:boom:` \| :truck: `:truck:` \| :lock: `:lock:` \| :ambulance: `:ambulance:` |
| **Extras** | :card_index: `:card_index:` \| :alien: `:alien:` \| :chart_with_upwards_trend: `:chart_with_upwards_trend:` \| :heavy_minus_sign: `:heavy_minus_sign:` \| :ok_hand: `:ok_hand:` \| :wheelchair: `:wheelchair:` |

## Recent Updates

- 2026-04-02: Initial Maktabati setup and deployment
- 2026-04-01: Moussawer architecture documented
