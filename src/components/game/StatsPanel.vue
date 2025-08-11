<template>
  <div class="stats-panel">
    <div>
      <h2>Statistics:</h2>
      <p>
        Moves: <strong>{{ moveCount }}</strong>
      </p>
      <p>
        Time: <strong>{{ elapsedTime }}s</strong>
      </p>
      <p v-if="gameWon">You won!</p>
    </div>

    <div class="right-col">
      <p>
        Difficulty level: <br /><strong>{{ difficulty }}</strong>
      </p>

      <p v-if="seed">
        Seed: <strong>{{ seed }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game.ts'
import { useSettingStore } from '@/stores/setting.ts'
import { useStatisticStore } from '@/stores/statistic.ts'

const gameStore = useGameStore()
const { gameWon } = storeToRefs(gameStore)

const statisticStore = useStatisticStore()
const { moveCount, elapsedTime } = storeToRefs(statisticStore)

const settingStore = useSettingStore()
const { difficulty, seed } = storeToRefs(settingStore)
</script>

<style scoped>
.stats-panel {
  background: #222;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  max-width: 600px;
}

.right-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: end;
  text-align: right;
}

@media (min-width: 768px) {
}
</style>
