import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Maktabati',
  description: 'My Development Documentation Library',
  ignoreDeadLinks: true,
  
  base: '/maktabati/',
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Workflows', link: '/workflows/' },
      { text: 'Guides', link: '/guides/' },
      { text: 'Snippets', link: '/snippets/' },
    ],
    
    sidebar: {
      '/projects/': [
        {
          text: 'Maktabati',
          items: [
            { text: 'Overview', link: '/projects/maktabati/' },
            { text: 'Technology Stack', link: '/projects/maktabati/technology-stack' },
            { text: 'How It Works', link: '/projects/maktabati/how-it-works' },
            { text: 'File Structure', link: '/projects/maktabati/file-structure' },
            { text: 'Customization', link: '/projects/maktabati/customization' },
            {
              text: 'Incidents',
              items: [
                { text: 'All Incidents', link: '/projects/maktabati/incidents/' },
                { text: 'Template', link: '/projects/maktabati/incidents/incident-template' },
                { text: 'How to Document', link: '/projects/maktabati/incidents/how-to-document' },
                { text: 'Prevention Checklist', link: '/projects/maktabati/incidents/prevention-checklist' },
                { text: 'INC-2026-001', link: '/projects/maktabati/incidents/inc-2026-001' },
              ],
            },
          ],
        },
        {
          text: 'Moussawer',
          items: [
            { text: 'Overview', link: '/projects/moussawer/' },
            { text: 'Architecture', link: '/projects/moussawer/architecture' },
            { text: 'API Reference', link: '/projects/moussawer/api-reference' },
            { text: 'Workflows', link: '/projects/moussawer/workflows' },
            { text: 'Changelog', link: '/projects/moussawer/changelog' },
          ],
        },
      ],
      '/workflows/': [
        { text: 'Overview', link: '/workflows/' },
        { text: 'Git Strategy', link: '/workflows/git-strategy' },
        { text: 'Docker & Sail', link: '/workflows/docker-sail' },
        { text: 'CI/CD', link: '/workflows/ci-cd' },
        { text: 'Code Review', link: '/workflows/code-review' },
      ],
      '/guides/': [
        {
          text: 'Maktabati',
          items: [
            { text: 'Setup Guide', link: '/guides/maktabati-setup' },
          ],
        },
        {
          text: 'VS Code',
          items: [
            { text: 'Setup', link: '/guides/vscode/' },
            { text: 'Extensions', link: '/guides/vscode/extensions' },
            { text: 'Snippets', link: '/guides/vscode/snippets' },
            { text: 'Shortcuts', link: '/guides/vscode/shortcuts' },
          ],
        },
        {
          text: 'Docker',
          items: [
            { text: 'Basics', link: '/guides/docker/' },
            { text: 'Compose', link: '/guides/docker/compose' },
            { text: 'Optimization', link: '/guides/docker/optimization' },
          ],
        },
        {
          text: 'AI & APIs',
          items: [
            { text: 'Overview', link: '/guides/ai-apis/' },
            { text: 'OpenRouter', link: '/guides/ai-apis/openrouter' },
            { text: 'DeepSeek', link: '/guides/ai-apis/deepseek' },
            { text: 'Gemini', link: '/guides/ai-apis/gemini' },
          ],
        },
        {
          text: 'Linux',
          items: [
            { text: 'Setup', link: '/guides/linux/' },
            { text: 'Zsh', link: '/guides/linux/zsh' },
            { text: 'Scripts', link: '/guides/linux/scripts' },
          ],
        },
      ],
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ettersAy/maktabati' },
      { icon: 'github', link: 'https://github.com/ettersAy/moussawer' },
    ],
    
    footer: {
      message: 'Released under MIT License',
      copyright: 'Copyright © 2026 Ayoub Etters',
    },
  },
  
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.options.highlight = (str, lang) => {
        // Fallback for unsupported languages
        if (['gitignore', 'env'].includes(lang)) {
          return `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`
        }
      }
    },
  },
  
  vite: {
    // Custom Vite config if needed
  },
})
