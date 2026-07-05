<template>
  <div class="folia-partita">
    <div class="folia-partita-col left">
      <div v-for="(line, i) in leftCol" :key="i"
        class="folia-partita-block"
        :style="{ animationDelay: `${i * 0.2}s` }">
        {{ line }}
      </div>
    </div>
    <div class="folia-partita-col right">
      <div v-for="(line, i) in rightCol" :key="i"
        class="folia-partita-block"
        :style="{ animationDelay: `${i * 0.25}s` }">
        {{ line }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoliaPartita',
  props: {
    lines: { type: Array, default: () => [] },
  },
  computed: {
    leftCol() { return this.lines.filter((_, i) => i % 2 === 0) },
    rightCol() { return this.lines.filter((_, i) => i % 2 === 1) },
  },
}
</script>

<style scoped>
.folia-partita { display: flex; gap: 2rem; padding: 2rem; justify-content: center; }
.folia-partita-col { flex: 1; max-width: 400px; }
.folia-partita-block {
  opacity: 0; transform: translateY(30px);
  animation: partitaIn 0.5s ease forwards;
  padding: 0.5rem; font-size: 1.2rem; color: #d0d8ff;
}
@keyframes partitaIn {
  to { opacity: 1; transform: translateY(0); }
}
</style>
