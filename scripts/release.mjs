import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')

const themes = [
  {
    key: 'folia-classic', name: '\u6D41\u5149', desc: 'DOM \u9010\u8BCD\u6D6E\u52A8 + \u8F89\u5149',
    settings: [
      { key: 'foliaShowTranslation', type: 'boolean', label: '\u663E\u793A\u7FFB\u8BD1', default: true },
      { key: 'foliaFloatSpeed', type: 'slider', label: '\u6D6E\u52A8\u901F\u5EA6', min: 3, max: 15, step: 1, marks: ['\u6162', '\u5FEB'], default: 7 },
      { key: 'foliaGlowIntensity', type: 'slider', label: '\u8F89\u5149\u5F3A\u5EA6', min: 0, max: 2, step: 0.1, marks: ['\u5F31', '\u5F3A'], default: 1 }
    ]
  },
  {
    key: 'folia-tilt', name: '\u503E\u8BC9', desc: '\u4E24\u6BB5\u5206\u5272 + \u9010\u5B57\u6E10\u5165',
    settings: [
      { key: 'foliaShowTranslation', type: 'boolean', label: '\u663E\u793A\u7FFB\u8BD1', default: true },
      { key: 'foliaTiltSplitCount', type: 'slider', label: '\u5206\u5272\u6BB5\u6570', min: 2, max: 5, step: 1, marks: ['2\u6BB5', '5\u6BB5'], default: 2 }
    ]
  },
  {
    key: 'folia-partita', name: '\u4E91\u9636', desc: '\u4E24\u680F\u5206\u5757 + \u9636\u68AF\u8FDB\u5165',
    settings: [
      { key: 'foliaShowTranslation', type: 'boolean', label: '\u663E\u793A\u7FFB\u8BD1', default: true },
      { key: 'foliaPartitaChunks', type: 'slider', label: '\u5206\u7EC4\u6570\u91CF', min: 2, max: 6, step: 1, marks: ['2\u7EC4', '6\u7EC4'], default: 3 }
    ]
  },
  {
    key: 'folia-cadenza', name: '\u5FC3\u8C61', desc: 'Canvas \u5706\u5F62\u6392\u5217 + \u8F89\u5149',
    settings: [
      { key: 'foliaShowTranslation', type: 'boolean', label: '\u663E\u793A\u7FFB\u8BD1', default: true },
      { key: 'foliaCadenzaRadius', type: 'slider', label: '\u6392\u5217\u534A\u5F84', min: 0.1, max: 0.5, step: 0.05, marks: ['\u5C0F', '\u5927'], default: 0.25 },
      { key: 'foliaGlowIntensity', type: 'slider', label: '\u8F89\u5149\u5F3A\u5EA6', min: 0, max: 2, step: 0.1, marks: ['\u5F31', '\u5F3A'], default: 1 }
    ]
  },
  {
    key: 'folia-fume', name: '\u6D6E\u540D', desc: 'Canvas \u4E09\u680F\u62A5\u7EB8 + \u865A\u62DF\u76F8\u673A',
    settings: [
      { key: 'foliaShowTranslation', type: 'boolean', label: '\u663E\u793A\u7FFB\u8BD1', default: true },
      { key: 'foliaFumeScrollSpeed', type: 'slider', label: '\u6EDA\u52A8\u901F\u5EA6', min: 0.3, max: 3, step: 0.1, marks: ['\u6162', '\u5FEB'], default: 1 },
      { key: 'foliaFumeFontSize', type: 'slider', label: '\u5B57\u53F7\u6BD4\u4F8B', min: 0.015, max: 0.04, step: 0.005, marks: ['\u5C0F', '\u5927'], default: 0.025 }
    ]
  }
]

for (const t of themes) {
  const dir = join(distDir, t.key)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  const manifest = {
    name: t.name, version: '1.1.0', type: 'playerStyle',
    entry: t.key + '.js', renderMode: 'vue',
    author: 'cang-dot', description: t.desc,
    license: 'AGPL-3.0-only',
    homepage: 'https://github.com/cang-dot/zephyrus-folia-themes',
    minAppVersion: '0.9.7',
    tags: ['lyrics', 'animation', 'folia'],
    settings: t.settings
  }
  const src = join(distDir, t.key + '.js')
  if (existsSync(src)) {
    const js = readFileSync(src, 'utf-8')
    writeFileSync(join(dir, t.key + '.js'), js, 'utf-8')
  }
  writeFileSync(join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf-8')
  console.log('  OK ' + t.key)
}

console.log('\nDone. Each subdir in dist/ is a plugin release package.')
