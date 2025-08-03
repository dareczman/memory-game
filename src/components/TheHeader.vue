<script setup lang="ts">
import TheButton from '@/components/TheButton.vue'
import { redirectToRoute } from '@/router'
import { useGameStore } from '@/stores/game.ts'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { isActiveGame } = storeToRefs(gameStore)
</script>

<template>
  <header>
    <h1 class="title">CS2 Memory</h1>

    <TheButton v-if="!isActiveGame" @click="redirectToRoute('History')"
      >Show history game</TheButton
    >
  </header>
</template>

<style scoped>
header {
  padding: 1rem;
  background-color: #27272a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fbbf24;
}
</style>
