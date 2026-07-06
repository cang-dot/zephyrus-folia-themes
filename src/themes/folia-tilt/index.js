import Component from './TiltTheme.vue'
Component.settings = [
  { key: 'foliaShowTranslation', type: 'boolean', label: '\u663E\u793A\u7FFB\u8BD1', default: true },
  { key: 'foliaTiltSplitCount', type: 'slider', label: '\u5206\u5272\u6BB5\u6570', min: 2, max: 5, step: 1, marks: ['2\u6BB5', '5\u6BB5'], default: 2 }
]
export default Component
