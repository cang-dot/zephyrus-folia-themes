<template>
  <div class="folia-fume">
    <div class="folia-fume-col" v-for="(col, ci) in columns" :key="ci">
      <div v-for="(item, i) in col" :key="i"
        class="folia-fume-word"
        :style="{ animationDelay: `${ci * 0.5 + i * 0.1}s` }">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoliaFume',
  props: {
    lines: { type: Array, default: () => [] },
  },
  computed: {
    columns() {
      const cols = [[], [], []]
      this.lines.forEach((line, i) => cols[i % 3].push(line))
      return cols
    },
  },
}
</script>

<style scoped>
.folia-fume { display: flex; gap: 1.5rem; padding: 2rem; max-width: 900px; margin: 0 auto; }
.folia-fume-col { flex: 1; }
.folia-fume-word {
  opacity: 0; transform: translateZ(-50px);
  animation: fumeIn 0.6s ease forwards;
  padding: 0.3rem 0; font-size: 1rem; color: #c0c8e0;
}
@keyframes fumeIn {
  to { opacity: 1; transform: translateZ(0); }
}
</style>
