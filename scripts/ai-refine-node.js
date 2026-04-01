#!/usr/bin/env node

/**
 * AI Documentation Refinement Script
 * Uses OpenRouter API to refine markdown documentation
 * 
 * Usage: npm run ai:refine -- --file=docs/projects/moussawer/architecture.md
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  OPENROUTER_URL: 'https://openrouter.ai/api/v1/chat/completions',
  MODEL: 'openrouter/free', // Free/cheap model
  // Alternative models:
  // - 'deepseek/deepseek-chat' (very cheap, good for code)
  // - 'meta-llama/llama-3-70b-instruct' (open source)
  // - 'openai/gpt-4o-mini' (cheap OpenAI option)
};

// Prompt template for documentation refinement
const REFINEMENT_PROMPT = `You are a technical documentation expert. Refine the following documentation with these rules:

1. **Clarity**: Make technical concepts clear and concise
2. **Structure**: Use proper markdown headings, lists, and code blocks
3. **Consistency**: Maintain consistent terminology and formatting
4. **Code Examples**: Ensure code snippets are accurate and well-formatted
5. **Completeness**: Add missing context where needed, but don't add fluff
6. **Tone**: Professional but approachable (less formal, human tone)
7. **Tech Stack**: Respect the documented technologies (Laravel 13, Vue 3.5, PHP 8.5, etc.)

Do NOT:
- Change the core meaning or technical accuracy
- Add unnecessary explanations
- Remove important details

Output ONLY the refined markdown content, no explanations.

---

DOCUMENTATION TO REFINE:
{content}`;

async function refineWithAI(content, filePath) {
  if (!CONFIG.OPENROUTER_API_KEY) {
    console.error('❌ OPENROUTER_API_KEY not set. Set it with: export OPENROUTER_API_KEY=sk-or-...');
    process.exit(1);
  }

  const prompt = REFINEMENT_PROMPT.replace('{content}', content);

  try {
    const response = await fetch(CONFIG.OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CONFIG.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/ettersAy/maktabati',
        'X-Title': 'Maktabati Docs',
      },
      body: JSON.stringify({
        model: CONFIG.MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a technical documentation expert. Output only refined markdown.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent output
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error(`❌ AI refinement failed for ${filePath}:`, error.message);
    return null;
  }
}

async function processFile(filePath) {
  console.log(`📄 Processing: ${filePath}`);
  
  const content = readFileSync(filePath, 'utf-8');
  const refined = await refineWithAI(content, filePath);
  
  if (refined) {
    // Create backup
    const backupPath = `${filePath}.bak`;
    writeFileSync(backupPath, content);
    
    // Write refined content
    writeFileSync(filePath, refined);
    console.log(`✅ Refined: ${filePath} (backup: ${backupPath})`);
    return true;
  }
  
  return false;
}

async function processDirectory(dirPath) {
  const files = readdirSync(dirPath);
  let successCount = 0;
  
  for (const file of files) {
    const fullPath = join(dirPath, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.endsWith('.md') && !file.endsWith('.bak')) {
      const success = await processFile(fullPath);
      if (success) successCount++;
    }
  }
  
  return successCount;
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const fileArg = args.find(a => a.startsWith('--file='));
  const dirArg = args.find(a => a.startsWith('--dir='));
  
  console.log('🚀 Maktabati AI Refinement Tool\n');
  
  if (fileArg) {
    const filePath = fileArg.split('=')[1];
    await processFile(filePath);
  } else if (dirArg) {
    const dirPath = dirArg.split('=')[1];
    const count = await processDirectory(dirPath);
    console.log(`\n✅ Completed: ${count} files refined`);
  } else {
    // Default: process all docs
    const docsPath = join(__dirname, '../docs');
    const count = await processDirectory(docsPath);
    console.log(`\n✅ Completed: ${count} files refined`);
  }
}

main().catch(console.error);
