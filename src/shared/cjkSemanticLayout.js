// SPDX-License-Identifier: AGPL-3.0-only
// Originally ported from Folia (AGPL-3.0) — see NOTICE

function createSingleWordLayoutUnits(words) {
  return words.map((w) => ({
    text: w.text,
    words: [w],
    startTime: w.startTime,
    endTime: w.endTime,
    isSemantic: false
  }))
}

const CJK_REGEX = /[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/
const STICKY_PUNCTUATION_REGEX = /^[,.;:!?\uFF0C\u3002\uFF01\uFF1F\u3001\uFF1A\uFF1B\uFF09\u3011\u300F\u300D\u2014\u2026\u00BB\]\}'\u2018\u2019\u201C\u201D]+$/u

function hasCjkText(text) {
  return CJK_REGEX.test(text)
}

function isStickyTrailingPunctuation(text) {
  return STICKY_PUNCTUATION_REGEX.test(text.trim())
}

function canAttachToPrevious(text) {
  return /[\p{L}\p{N}]$/u.test(text.trimEnd())
}

function buildCjkSemanticLayoutUnits(line, fallback) {
  const Segmenter = Intl?.Segmenter
  if (!Segmenter) return fallback

  try {
    const segments = Array.from(
      new Segmenter(undefined, { granularity: 'word' }).segment(line.fullText)
    )
    const nonSpace = segments.filter((s) => !/^\s+$/.test(s.segment))
    if (nonSpace.length <= 1) return fallback

    const result = []
    let wordIdx = 0
    let collected = ''

    for (const seg of nonSpace) {
      collected = ''
      const startWordIdx = wordIdx
      while (wordIdx < line.words.length && collected.length < seg.segment.length) {
        collected += line.words[wordIdx].text
        wordIdx++
      }
      if (collected !== seg.segment) return fallback

      const segWords = line.words.slice(startWordIdx, wordIdx)
      const first = segWords[0]
      const last = segWords[segWords.length - 1]
      if (!first || !last) return fallback

      const isCjkSemantic = Boolean(
        seg.isWordLike && hasCjkText(seg.segment) && segWords.length > 1
      )

      if (!seg.isWordLike && result.length > 0) {
        const prev = result[result.length - 1]
        prev.text += seg.segment
        prev.words.push(...segWords)
        prev.endTime = last.endTime
      } else {
        result.push({
          text: seg.segment,
          words: segWords,
          startTime: first.startTime,
          endTime: last.endTime,
          isSemantic: isCjkSemantic
        })
      }
    }

    if (wordIdx !== line.words.length || result.length === 0) return fallback
    return result
  } catch {
    return fallback
  }
}

function applyStickyPunctuation(units) {
  const result = []

  for (const unit of units) {
    if (
      result.length > 0 &&
      isStickyTrailingPunctuation(unit.text) &&
      canAttachToPrevious(result[result.length - 1].text)
    ) {
      const prev = result[result.length - 1]
      prev.text += unit.text
      prev.words.push(...unit.words)
      prev.endTime = unit.endTime
      prev.isSticky = true
    } else {
      result.push({ ...unit, words: [...unit.words] })
    }
  }

  return result
}

export function buildPostLyricLayoutUnits(line, options = {}) {
  let units = createSingleWordLayoutUnits(line.words)

  if (options.semantic && hasCjkText(line.fullText)) {
    units = buildCjkSemanticLayoutUnits(line, units)
  }

  if (options.sticky) {
    units = applyStickyPunctuation(units)
  }

  return units
}

export function buildDisplayWordsFromLayoutUnits(units) {
  return units.flatMap((unit) => {
    if (!unit.isSticky || unit.isSemantic) return unit.words
    return [
      {
        text: unit.text,
        startTime: unit.startTime,
        endTime: unit.endTime
      }
    ]
  })
}
