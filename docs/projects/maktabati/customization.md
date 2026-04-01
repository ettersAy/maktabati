---
title: Customization Guide
description: How to modify and extend Maktabati
---

# Customization Guide

How to modify themes, add components, and extend functionality.

---

## Theme Customization

### Change Brand Colors

Edit `docs/.vitepress/theme/styles.css`:

```css
:root {
  --vp-c-brand: #4f46e5;      /* Primary color */
  --vp-c-brand-light: #6366f1; /* Hover state */
  --vp-c-brand-dark: #4338ca;  /* Active state */
}
```

### Add Custom CSS

Create or edit `docs/.vitepress/theme/styles.css`:

```css
/* Custom component styles */
.vp-doc h2 {
  border-top-color: var(--vp-c-divider);
  padding-top: 2rem;
}

/* Custom classes */
.highlight-box {
  background: var(--vp-c-brand-light);
  padding: 1rem;
  border-radius: 8px;
}
```

---

## Custom Vue Components

### Create Component

Create `docs/.vitepress/components/InfoBox.vue`:

```vue
<script setup>
defineProps({
  type: {
    type: String,
    default: 'info'
  },
  title: String
})
</script>

<template>
  <div class="info-box" :class="type">
    <h4 v-if="title">{{ title }}</h4>
    <slot />
  </div>
</template>

<style scoped>
.info-box {
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}
.info-box.info { background: #e0e7ff; }
.info-box.warning { background: #fef3c7; }
</style>
```

### Register Component

Edit `docs/.vitepress/theme/index.js`:

```javascript
import DefaultTheme from 'vitepress/theme'
import InfoBox from '../components/InfoBox.vue'
import './styles.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('InfoBox', InfoBox)
  },
}
```

### Use in Markdown

```markdown
<InfoBox type="warning" title="Important">
  This is a custom Vue component in Markdown!
</InfoBox>
```

---

## Navigation Configuration

### Add New Menu Item

Edit `docs/.vitepress/config.mjs`:

```javascript
nav: [
  { text: 'Home', link: '/' },
  { text: 'Projects', link: '/projects/' },
  { text: 'New Section', link: '/new-section/' },  // Add this
],
```

### Add Sidebar Entry

```javascript
sidebar: {
  '/projects/': [
    {
      text: 'Maktabati',
      items: [
        { text: 'Overview', link: '/projects/maktabati/' },
        { text: 'New Page', link: '/projects/maktabati/new-page' },
      ],
    },
  ],
},
```
## Custom Layouts

### Create Custom Layout

Create `docs/.vitepress/theme/layouts/CustomLayout.vue`:

```vue
<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="custom-banner">Custom Content</div>
    </template>
  </Layout>
</template>
```

### Use in Page

```markdown
---
layout: CustomLayout
title: My Page
---

# Content
```

---

## Search Configuration

### Enable Search (Built-in)

VitePress has built-in search. Enable in config:

```javascript
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search docs'
              }
            }
          }
        }
      }
    }
  }
})
```

---

## SEO & Metadata

### Add Meta Tags

Edit `docs/.vitepress/config.mjs`:

```javascript
export default defineConfig({
  head: [
    ['meta', { name: 'author', content: 'Ayoub Etters' }],
    ['meta', { name: 'keywords', content: 'documentation, laravel, vue' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
})
```

### Open Graph Tags

```javascript
head: [
  ['meta', { property: 'og:title', content: 'Maktabati' }],
  ['meta', { property: 'og:description', content: 'My Documentation Library' }],
  ['meta', { property: 'og:image', content: '/og-image.png' }],
]
```

---

## Add Analytics

### Google Analytics

```javascript
head: [
  [
    'script',
    { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID' }
  ],
  [
    'script',
    {},
    `window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');`
  ],
]
```

### Plausible (Privacy-Friendly)

```javascript
head: [
  [
    'script',
    { defer: '', 'data-domain': 'docs.maktabati.com', src: 'https://plausible.io/js/script.js' }
  ],
]
```

---

## Add Comments (Giscus)

### Create Component

`docs/.vitepress/components/Giscus.vue`:

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'ettersAy/maktabati')
  script.setAttribute('data-repo-id', 'YOUR_REPO_ID')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-mapping', 'pathname')
  script.async = true
  document.querySelector('.vp-doc').appendChild(script)
})
</script>

<template>
  <div class="giscus-container" />
</template>
```

---

## Build Optimization

### Reduce Bundle Size

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue'],
        },
      },
    },
  },
}
```

### Preload Important Pages

```javascript
head: [
  ['link', { rel: 'preload', href: '/projects/moussawer/', as: 'document' }],
]
```

---

## Quick Reference

| Task | File to Edit |
|------|--------------|
| Change colors | `theme/styles.css` |
| Add nav item | `config.mjs` |
| Add component | `theme/index.js` |
| Add meta tags | `config.mjs` |
| Custom layout | `theme/layouts/` |
| Add analytics | `config.mjs` |

---

## Related Documentation

- [Technology Stack](./technology-stack) - All technologies used
- [How It Works](./how-it-works) - Build process explained
- [File Structure](./file-structure) - Project organization
