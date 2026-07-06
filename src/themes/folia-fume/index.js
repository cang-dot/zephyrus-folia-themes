import Component from './FumeTheme.vue'
Component.settings = [
  { key: 'foliaShowTranslation', type: 'boolean', label: '\u663E\u793A\u7FFB\u8BD1', default: true },
  { key: 'foliaFumeScrollSpeed', type: 'slider', label: '\u6EDA\u52A8\u901F\u5EA6', min: 0.3, max: 3, step: 0.1, marks: ['\u6162', '\u5FEB'], default: 1 },
  { key: 'foliaFumeFontSize', type: 'slider', label: '\u5B57\u53F7\u6BD4\u4F8B', min: 0.015, max: 0.04, step: 0.005, marks: ['\u5C0F', '\u5927'], default: 0.025 }
]
export default Component
