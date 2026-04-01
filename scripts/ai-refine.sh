#!/bin/bash

# ============================================
# Maktabati AI Refinement Script
# ============================================
# Usage:
#   ./scripts/ai-refine.sh                    # Refine all docs
#   ./scripts/ai-refine.sh --file <path>      # Refine single file
#   ./scripts/ai-refine.sh --dir <path>       # Refine directory
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check API key
if [ -z "$OPENROUTER_API_KEY" ]; then
    echo -e "${RED}❌ OPENROUTER_API_KEY not set${NC}"
    echo "Set it with: export OPENROUTER_API_KEY=sk-or-..."
    echo "Or add to ~/.zshrc for persistence"
    exit 1
fi

echo -e "${GREEN}🚀 Maktabati AI Refinement${NC}"
echo "================================"
echo "Project: $PROJECT_ROOT"
echo "API Key: ${OPENROUTER_API_KEY:0:10}..."
echo ""

cd "$PROJECT_ROOT"

# Run Node.js script
if [ $# -eq 0 ]; then
    npm run ai:refine
elif [ "$1" = "--file" ]; then
    npm run ai:refine -- --file="$2"
elif [ "$1" = "--dir" ]; then
    npm run ai:refine -- --dir="$2"
else
    echo -e "${YELLOW}Usage:${NC}"
    echo "  ./scripts/ai-refine.sh"
    echo "  ./scripts/ai-refine.sh --file <path>"
    echo "  ./scripts/ai-refine.sh --dir <path>"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Done!${NC}"
