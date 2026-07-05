import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')

const themes = [
  { key: 'folia-classic', name: '流光', desc: 'DOM 逐词浮动 + 辉光，CSS transitions 驱动' },
  { key: 'folia-tilt', name: '倾诉', desc: '两段分割 + 逐字渐入动画' },
  { key: 'folia-partita', name: '云阶', desc: '两栏分块 + 阶梯进入动画' },
  { key: 'folia-cadenza', name: '心象', desc: 'Canvas 圆形排列 + DOM 辉光叠加' },
  { key: 'folia-fume', name: '浮名', desc: 'Canvas 三栏报纸式 + 虚拟相机滚动' }
]

for (const t of themes) {
  const pluginDir = join(distDir, t.key)
  if (!existsSync(pluginDir)) mkdirSync(pluginDir, { recursive: true })

  const manifest = {
    name: t.name,
    version: '1.0.0',
    type: 'playerStyle',
    entry: `${t.key}.js`,
    renderMode: 'vue',
    author: 'cang-dot',
    description: t.desc,
    license: 'AGPL-3.0-only',
    homepage: 'https://github.com/cang-dot/zephyrus-folia-themes',
    minAppVersion: '0.9.7',
    tags: ['lyrics', 'animation', 'folia'],
    settings: [
      { key: 'foliaShowTranslation', type: 'boolean', label: '显示翻译', default: true }
    ]
  }

  const srcJs = join(distDir, `${t.key}.js`)
  const dstJs = join(pluginDir, `${t.key}.js`)

  if (existsSync(srcJs)) {
    const js = readFileSync(srcJs, 'utf-8')
    writeFileSync(dstJs, js, 'utf-8')
  }

  writeFileSync(join(pluginDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf-8')
  console.log(`  ✓ ${t.key} → ${pluginDir}`)
}

console.log('\nDone. Each plugin directory in dist/ is ready for Release packaging.')
