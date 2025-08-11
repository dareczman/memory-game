<template>
  <div class="game-board">
    <canvas
      ref="canvasRef"
      :class="{ 'disabled-canvas': !isActiveGame }"
      @click="cardStore.handleClick"
    />
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game.ts'
import { storeToRefs } from 'pinia'
import { useCardStore } from '@/stores/card.ts'

const gameStore = useGameStore()
const { canvasRef, isActiveGame } = storeToRefs(gameStore)

const cardStore = useCardStore()
</script>

<style scoped>
.game-board {
  width: 100%;
  max-width: 600px;
}
canvas {
  border: 2px solid #555;
  background-color: #111;
  display: block;
  margin: 0 auto;
  width: 100%;
}

.disabled-canvas {
  pointer-events: none;
}
</style>
