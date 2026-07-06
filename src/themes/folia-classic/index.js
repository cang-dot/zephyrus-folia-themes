import Component from './ClassicTheme.vue'
Component.settings = [
  { key: 'foliaShowTranslation', type: 'boolean', label: '\u663E\u793A\u7FFB\u8BD1', default: true },
  { key: 'foliaFloatSpeed', type: 'slider', label: '\u6D6E\u52A8\u901F\u5EA6', min: 3, max: 15, step: 1, marks: ['\u6162', '\u5FEB'], default: 7 },
  { key: 'foliaGlowIntensity', type: 'slider', label: '\u8F89\u5149\u5F3A\u5EA6', min: 0, max: 2, step: 0.1, marks: ['\u5F31', '\u5F3A'], default: 1 }
]
export default Component
