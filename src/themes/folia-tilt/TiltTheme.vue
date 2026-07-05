<template>
  <div class="folia-tilt">
    <div class="folia-tilt-line" v-for="(line, i) in lines" :key="i">
      <span v-for="(ch, j) in line.split('')" :key="j"
        class="folia-tilt-char"
        :style="{ animationDelay: `${i * 0.3 + j * 0.04}s` }">
        {{ ch }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoliaTilt',
  props: {
    lines: { type: Array, default: () => [] },
  },
}
</script>

<style scoped>
.folia-tilt { text-align: center; padding: 2rem; perspective: 800px; }
.folia-tilt-line { margin: 0.5rem 0; }
.folia-tilt-char {
  display: inline-block;
  opacity: 0;
  transform: rotateX(-90deg);
  animation: tiltIn 0.5s ease forwards;
  font-size: 1.5rem;
  color: #e0e0ff;
}
@keyframes tiltIn {
  to { opacity: 1; transform: rotateX(0deg); }
}
</style>
