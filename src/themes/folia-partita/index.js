import Component from './PartitaTheme.vue'
Component.settings = [
  { key: 'foliaShowTranslation', type: 'boolean', label: '\u663E\u793A\u7FFB\u8BD1', default: true },
  { key: 'foliaPartitaChunks', type: 'slider', label: '\u5206\u7EC4\u6570\u91CF', min: 2, max: 6, step: 1, marks: ['2\u7EC4', '6\u7EC4'], default: 3 }
]
export default Component
