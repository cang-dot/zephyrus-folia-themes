import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function inlineSharedChunksPlugin() {
  return {
    name: 'inline-shared-chunks',
    enforce: 'post',
    apply: 'build',
    generateBundle(_, bundle) {
      const isShared = (k) => bundle[k]?.type === 'chunk' && !bundle[k].isEntry
      const isEntry = (k) => bundle[k]?.type === 'chunk' && bundle[k].isEntry
      const entryKeys = Object.keys(bundle).filter(isEntry)
      let sharedKeys = Object.keys(bundle).filter(isShared)

      while (sharedKeys.length > 0) {
        const leafIdx = sharedKeys.findIndex(k => {
          const c = bundle[k]
          return c && c.imports.every(i => !sharedKeys.includes(i) || i === k)
        })
        if (leafIdx === -1) break

        const sKey = sharedKeys[leafIdx]
        const shared = bundle[sKey]
        if (!shared) { sharedKeys.splice(leafIdx, 1); continue }

        const prefix = shared.code.replace(/import\s+[^;]+;?\n?/g, '')

        for (const eKey of entryKeys) {
          const entry = bundle[eKey]
          if (!entry || !entry.imports.includes(sKey)) continue
          entry.code = entry.code.replace(/import\s+\{[^}]*\}\s+from\s+['"][^'"]*['"]\s*;?\n?/g, '')
          entry.code = prefix + '\n' + entry.code
          entry.imports = entry.imports.filter(i => i !== sKey)
        }

        for (const sKey2 of sharedKeys) {
          const other = bundle[sKey2]
          if (!other || !other.imports.includes(sKey)) continue
          other.code = other.code.replace(/import\s+\{[^}]*\}\s+from\s+['"][^'"]*['"]\s*;?\n?/g, '')
          other.code = prefix + '\n' + other.code
          other.imports = other.imports.filter(i => i !== sKey)
        }

        delete bundle[sKey]
        sharedKeys.splice(leafIdx, 1)
      }
    },
  }
}

function inlineScopedCssPlugin() {
  return {
    name: 'inline-scoped-css',
    enforce: 'post',
    apply: 'build',
    generateBundle(_, bundle) {
      const cssKey = Object.keys(bundle).find(k => k.endsWith('.css') || k === 'style.css')
      if (!cssKey) return
      const allCss = String(bundle[cssKey].source)

      for (const [key, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'chunk' || !chunk.isEntry) continue

        const scopeMatch = chunk.code.match(/__scopeId["\s,]+\s*"([^"]+)"/)
        if (!scopeMatch) {
          console.error('NO SCOPE ID FOUND for', key)
          continue
        }

        const scopeId = scopeMatch[1]
        const scopeHash = scopeId.replace('data-v-', '')
        const rules = []
        let cur = ''
        let depth = 0

        for (const ch of allCss) {
          cur += ch
          if (ch === '{') depth++
          if (ch === '}') {
            depth--
            if (depth === 0) {
              if (cur.includes(`[${scopeId}]`) || cur.includes(`-${scopeHash}`)) {
                rules.push(cur.trim())
              }
              cur = ''
            }
          }
        }

        if (rules.length) {
          const css = rules.join(' ')
          chunk.code = `(function(){var s=document.createElement('style');s.textContent=${JSON.stringify(css)};document.head.appendChild(s)})();` + chunk.code
        }
      }

      delete bundle[cssKey]
    },
  }
}

export default defineConfig({
  plugins: [vue(), inlineSharedChunksPlugin(), inlineScopedCssPlugin()],
  build: {
    outDir: 'dist',
    lib: {
      entry: {
        'folia-classic': 'src/themes/folia-classic/index.js',
        'folia-tilt': 'src/themes/folia-tilt/index.js',
        'folia-partita': 'src/themes/folia-partita/index.js',
        'folia-cadenza': 'src/themes/folia-cadenza/index.js',
        'folia-fume': 'src/themes/folia-fume/index.js',
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
    target: 'es2020',
  },
})
