<template>
  <div id="app" class="app-container">
    <TheHeader />

    <router-view v-slot="{ Component }">
      <transition name="fade-slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <footer class="app-footer">© 2025 – CS2 Memory by Dariusz Kaczmarek</footer>
  </div>
</template>

<script setup lang="ts">
import { useHistoryStore } from '@/stores/history.ts'
import { onMounted } from 'vue'
import { redirectToRoute } from '@/router'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game.ts'
import TheHeader from '@/components/TheHeader.vue'

const historyStore = useHistoryStore()
const { ifGameSessionExists } = storeToRefs(historyStore)
const gameStore = useGameStore()

onMounted(() => {
  if (ifGameSessionExists.value) {
    redirectToRoute('GameBoard')
    gameStore.setLastSessionGame()
  }
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #171717; /* neutral-900 */
  color: white;
  font-family: Arial, sans-serif;
}

.app-footer {
  text-align: center;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  color: #737373; /* neutral-500 */
}
</style>
