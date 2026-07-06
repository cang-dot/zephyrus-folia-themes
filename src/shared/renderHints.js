// SPDX-License-Identifier: AGPL-3.0-only
// Originally ported from Folia (AGPL-3.0) — see NOTICE

const MICRO_LINE_DURATION_THRESHOLD = 0.10
const SHORT_LINE_DURATION_THRESHOLD = 0.18
const MICRO_LINE_RENDER_FLOOR = 0.067

function getTimingClass(rawDuration) {
  if (rawDuration < MICRO_LINE_DURATION_THRESHOLD) return 'micro'
  if (rawDuration < SHORT_LINE_DURATION_THRESHOLD) return 'short'
  return 'normal'
}

function getLineTransitionMode(timingClass) {
  if (timingClass === 'micro') return 'none'
  if (timingClass === 'short') return 'fast'
  return 'normal'
}

function getWordRevealMode(timingClass) {
  if (timingClass === 'micro') return 'instant'
  if (timingClass === 'short') return 'fast'
  return 'normal'
}

export function buildLineRenderHints(startTime, endTime) {
  const rawDuration = Math.max(endTime - startTime, 0)
  const timingClass = getTimingClass(rawDuration)
  const lineTransitionMode = getLineTransitionMode(timingClass)
  const wordRevealMode = getWordRevealMode(timingClass)
  const lastWordEnd = endTime

  let renderEndTime

  if (lineTransitionMode === 'none') {
    renderEndTime = Math.max(endTime, startTime + MICRO_LINE_RENDER_FLOOR)
  } else {
    const exitDuration = Math.min(0.32, Math.max(0.18, Math.max(rawDuration, 0.12) * 0.18))
    const linePassHold = wordRevealMode === 'instant' ? 0 : 0.06
    const linePassStart = Math.max(lastWordEnd, startTime) + linePassHold
    const exitStart = Math.max(linePassStart, endTime - exitDuration)
    renderEndTime = Math.max(endTime, exitStart + exitDuration)
  }

  return { rawDuration, timingClass, renderEndTime, lineTransitionMode, wordRevealMode }
}

export function getLineRenderHints(line) {
  if (!line) return null
  return line.renderHints ?? buildLineRenderHints(line.startTime, line.endTime)
}

export function getLineRenderEndTime(line) {
  if (!line) return Number.NEGATIVE_INFINITY
  return getLineRenderHints(line)?.renderEndTime ?? line.endTime
}
