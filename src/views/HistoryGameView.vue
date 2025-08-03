<script setup lang="ts">
import { useRouter } from 'vue-router'
import HistoryGame from '@/components/history/HistoryGame.vue'
import TheButton from '@/components/TheButton.vue'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push({ name: 'Setting' })
  }
}
</script>

<template>
  <div class="history-game-section">
    <div class="container">
      <TheButton class="go-back-btn" @click="goBack()">Go back</TheButton>
      <HistoryGame />
    </div>
  </div>
</template>

<style scoped>
.history-game-section {
  padding: 1rem;
  min-height: 80vh;
  display: flex;
}

.history-game-section .container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}

.go-back-btn {
  max-width: 200px;
}
</style>
