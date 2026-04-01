#!/bin/bash
echo "🔧 Generating missing documentation placeholders..."

create_placeholder() {
    local file=$1
    local title=$2
    if [ ! -f "$file" ]; then
        mkdir -p "$(dirname "$file")"
        cat > "$file" <<EOF
---
title: $title
---

# $title

> ⚠️ **Work in Progress**
> This documentation page is currently being written. Check back soon!

## Coming Soon
- Detailed setup instructions
- Code examples
- Best practices
EOF
        echo "✅ Created: $file"
    else
        echo "⏭️  Exists: $file"
    fi
}

# Guides
create_placeholder "docs/guides/vscode/index.md" "VS Code Setup"
create_placeholder "docs/guides/vscode/extensions.md" "VS Code Extensions"
create_placeholder "docs/guides/docker/index.md" "Docker Basics"
create_placeholder "docs/guides/docker/compose.md" "Docker Compose"
create_placeholder "docs/guides/ollama/index.md" "Ollama Setup"
create_placeholder "docs/guides/ai-apis/index.md" "AI APIs Overview"
create_placeholder "docs/guides/linux/zsh.md" "Zsh Configuration"

# Workflows
create_placeholder "docs/workflows/git-strategy.md" "Git Strategy"
create_placeholder "docs/workflows/docker-sail.md" "Docker & Laravel Sail"
create_placeholder "docs/workflows/ci-cd.md" "CI/CD Pipelines"

# Snippets
create_placeholder "docs/snippets/php-laravel.md" "Laravel Snippets"
create_placeholder "docs/snippets/vue-composables.md" "Vue Composables"
create_placeholder "docs/snippets/shell-aliases.md" "Shell Aliases"

# Moussawer Project
create_placeholder "docs/projects/moussawer/architecture.md" "Moussawer Architecture"
create_placeholder "docs/projects/moussawer/api-reference.md" "API Reference"

echo "✨ Done!"
