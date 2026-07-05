<template>
  <div class="folia-classic">
    <div
      v-for="(line, i) in lines"
      :key="i"
      class="folia-classic-line"
      :style="{ animationDelay: `${i * 0.15}s` }"
    >
      {{ line }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoliaClassic',
  props: {
    lines: { type: Array, default: () => [] },
  },
}
</script>

<style scoped>
.folia-classic {
  font-family: 'Georgia', serif;
  text-align: center;
  padding: 2rem;
}
.folia-classic-line {
  opacity: 0;
  animation: foliaFadeIn 0.6s ease forwards;
  font-size: 1.5rem;
  line-height: 2;
  color: #fff;
  text-shadow: 0 0 10px rgba(255,255,255,0.5);
}
@keyframes foliaFadeIn {
  to { opacity: 1; }
}
</style>
