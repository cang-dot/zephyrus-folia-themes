<template>
  <div class="folia-cadenza" ref="canvasRef"></div>
</template>

<script>
export default {
  name: 'FoliaCadenza',
  props: {
    lines: { type: Array, default: () => [] },
    canvas: { type: HTMLCanvasElement, default: null },
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      const el = this.canvas || this.$refs.canvasRef
      if (!el || !this.lines.length) return
      const ctx = el.getContext('2d')
      if (!ctx) return
      const w = el.width, h = el.height
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(0, 0, w, h)
      const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.35
      this.lines.forEach((line, i) => {
        const a = (i / this.lines.length) * Math.PI * 2
        ctx.save()
        ctx.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
        ctx.fillStyle = '#fff'
        ctx.font = '18px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(line, 0, 0)
        ctx.restore()
      })
    },
  },
}
</script>

<style scoped>
.folia-cadenza { width: 100%; height: 400px; border-radius: 12px; overflow: hidden; }
</style>
