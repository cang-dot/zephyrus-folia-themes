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

        const cleaned = shared.code.replace(/import\s+[^;]+;?\n?/g, '')
        const exportMatch = cleaned.match(/export\s*\{([^}]+)\}/)
        const exportNames = exportMatch
          ? exportMatch[1].split(',').map(e => {
              const parts = e.trim().split(/\s+as\s+/)
              return { local: parts[0].trim(), exported: (parts[1] || parts[0]).trim() }
            })
          : []
        const codeBody = cleaned.replace(/export\s*\{[^}]*\};?\n?/g, '').trim()
        const ns = `__sh_${sKey.replace(/[^a-zA-Z0-9]/g, '_')}`
        const exportLine = exportNames.map(e => `${ns}.${e.exported}=${e.local};`).join('')
        // Convert function declarations to expressions to prevent hoisting outside IIFE.
        // Function declarations inside non-strict IIFEs are hoisted to module scope,
        // causing "Identifier 'oe' has already been declared" when main bundle also has const oe.
        const renamedBody = codeBody
          .replace(/\bfunction\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, 'var $1=function $1(')
          .replace(/\bprocess\.env\.NODE_ENV\b/g, '"production"')
          .replace(/\bprocess\.(versions|platform|browser|release)\b/g, '({}).$1 || ""')
        const prefix = `var ${ns}={};\n(function(){'use strict';\n${renamedBody}\n${exportLine}\n})();\n`

        for (const eKey of entryKeys) {
          const entry = bundle[eKey]
          if (!entry || !entry.imports.includes(sKey)) continue
          entry.code = entry.code.replace(/import\s+\{[^}]*\}\s*from\s*['"][^'"]*['"]\s*;?\n?/g, '')
          entry.code = prefix + entry.code
          entry.imports = entry.imports.filter(i => i !== sKey)
        }

        for (const sKey2 of sharedKeys) {
          const other = bundle[sKey2]
          if (!other || !other.imports.includes(sKey)) continue
          other.code = other.code.replace(/import\s+\{[^}]*\}\s*from\s*['"][^'"]*['"]\s*;?\n?/g, '')
          other.code = prefix + other.code
          other.imports = other.imports.filter(i => i !== sKey)
        }

        delete bundle[sKey]
        sharedKeys.splice(leafIdx, 1)
      }

      // Post-pass: inject exportHelper for all entry chunks
      // The import was already stripped, so we detect the minified name and inject it
      const exportHelperImpl = `function(m,k){var e=m.__esModule||m[Symbol.toStringTag]==='Module'?function(){return m.default}:function(){return m};var d=e();for(var p in m){if(p!=='default'&&!Object.prototype.hasOwnProperty.call(d,p)){Object.defineProperty(d,p,{enumerable:true,get:(function(x){return m[x]}).bind(null,p)})}}if(k){for(var i=0;i<k.length;i++){d[k[i][0]]=k[i][1];}}return d;}`
      for (const eKey of Object.keys(bundle)) {
        const chunk = bundle[eKey]
        if (!chunk || chunk.type !== 'chunk' || !chunk.isEntry) continue
        // Detect exportHelper call: XXX = /* @__PURE__ */ YYY(componentName, [["__scopeId", ...]])
        const helperMatch = chunk.code.match(/=\s*\/\*\s*@__PURE__\s*\*\/\s*(\w+)\s*\(\w+,\s*\[\s*\[\s*"__scopeId"/)
        if (helperMatch && !chunk.code.includes('function(m,k)')) {
          const helperVar = helperMatch[1] // The minified function name
          chunk.code = `var ${helperVar}=${exportHelperImpl};\n` + chunk.code
        }
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
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
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
