// SPDX-License-Identifier: AGPL-3.0-only
// Originally ported from Folia (AGPL-3.0) — see NOTICE
// Converts plugin ctx props to useStyleContext-compatible reactive interface
import { computed } from 'vue'

export function createStyleContext(props, settings = {}) {
  const getVal = (key, fallback) => settings[key] !== undefined ? settings[key] : fallback

  const nowTime = computed(() => props.currentTime ?? 0)

  const nowIndex = computed(() => {
    const lines = props.lyricLines || []
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i]
      if (props.currentTime >= (l.startTime ?? 0) && props.currentTime < (l.endTime ?? Infinity)) {
        return i
      }
    }
    if (lines.length > 0 && props.currentTime >= (lines[lines.length - 1].endTime ?? 0)) {
      return lines.length - 1
    }
    return -1
  })

  const lrcArray = computed(() => {
    return (props.lyricLines || []).map(l => ({
      text: l.text || '',
      trText: l.translatedText || '',
      startTime: l.startTime || 0,
      duration: (l.endTime ?? 0) - (l.startTime ?? 0),
      words: l.words ? l.words.map(w => ({
        text: w.text || '',
        startTime: (w.startTime ?? 0) - (l.startTime ?? 0),
        duration: (w.endTime ?? 0) - (w.startTime ?? 0)
      })) : undefined
    }))
  })

  function getCoverColor() {
    const cc = props.coverColor
    if (typeof cc === 'string') {
      return { primary: cc, average: cc }
    }
    if (cc && typeof cc === 'object') {
      return { primary: cc.primary || '#ffffff', average: cc.average || cc.primary || '#ffffff' }
    }
    return { primary: '#ffffff', average: '#ffffff' }
  }

  function getClimaxState() {
    return {
      isInClimax: !!props.isClimax,
      segments: props.climaxSegments || [],
      energy: props.energy ?? 0,
      isBeat: !!props.isBeat,
      kickEnergy: props.kickEnergy ?? 0,
      bpm: props.bpm ?? 120
    }
  }

  function getConfigValue(key, fallback) {
    if (settings[key] !== undefined) return settings[key]
    try {
      const saved = localStorage.getItem('music-full-config')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed[key] !== undefined) return parsed[key]
      }
    } catch { /* ignore */ }
    return fallback
  }

  return { nowTime, nowIndex, lrcArray, getCoverColor, getClimaxState, getConfigValue }
}
