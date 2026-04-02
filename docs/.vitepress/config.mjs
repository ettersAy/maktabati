// docs/.vitepress/config.mjs
import { defineConfig } from 'vitepress'
import { getSidebar } from 'vitepress-plugin-auto-sidebar'

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
    
    // ✅ FIXED: Use relative path (no leading slash) + debugPrint
    sidebar: getSidebar({
      contentRoot: 'docs',              // ← Changed: '/docs' → 'docs'
      contentDirs: [
        { path: 'projects', title: '📦 Projects' },
        { path: 'workflows', title: '⚙️ Workflows' },
        { path: 'guides', title: '📚 Guides' },
        { path: 'snippets', title: '📝 Snippets' },
      ],
      collapsible: true,
      collapsed: true,
      useFrontmatter: true,
      debugPrint: true,                 // ← Added: See what plugin finds
    }),
    
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
        if (['gitignore', 'env'].includes(lang)) {
          return `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`
        }
      }
    },
  },
})