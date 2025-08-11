<script setup lang="ts">
import TheButton from '@/components/TheButton.vue'
import { useGameStore } from '@/stores/game.ts'
import { storeToRefs } from 'pinia'
import { useHistoryStore } from '@/stores/history.ts'
import { computed } from 'vue'

const gameStore = useGameStore()
const { isActiveGame, gameWon, isSeedSessionGame, isGamePaused } = storeToRefs(gameStore)

const historyStore = useHistoryStore()
const { ifGameSessionExists } = storeToRefs(historyStore)

const canStart = computed(
  () =>
    !isActiveGame.value &&
    !gameWon.value &&
    !isSeedSessionGame.value &&
    !isGamePaused.value &&
    !ifGameSessionExists.value,
)

const canPause = computed(() => isActiveGame.value && !gameWon.value && !isGamePaused.value)

const canResume = computed(() => !isActiveGame.value && !gameWon.value && isGamePaused.value)

const canContinue = computed(
  () =>
    !isActiveGame.value &&
    !gameWon.value &&
    !isSeedSessionGame.value &&
    !isGamePaused.value &&
    ifGameSessionExists.value,
)

const canStartSeedGame = computed(
  () =>
    !isActiveGame.value &&
    !gameWon.value &&
    isSeedSessionGame.value &&
    !isGamePaused.value &&
    !ifGameSessionExists.value,
)

const canSetNewGame = computed(
  () =>
    !isActiveGame.value &&
    (gameWon.value || isGamePaused.value || ifGameSessionExists.value || canStartSeedGame.value),
)
</script>

<template>
  <div class="buttons-wrapper">
    <TheButton v-if="canStart" @click="gameStore.startGame">Start</TheButton>

    <TheButton v-if="canContinue" @click="gameStore.continueGame">Continue last game</TheButton>

    <TheButton v-if="canStartSeedGame" @click="gameStore.startSeedSessionGame"
      >Start seed game</TheButton
    >

    <TheButton v-if="canPause" @click="gameStore.pauseGame">Pause game</TheButton>

    <TheButton v-if="canResume" @click="gameStore.resumeGame">Resume game</TheButton>

    <TheButton v-if="canSetNewGame" @click="gameStore.setNewGame">Set new game</TheButton>
  </div>
</template>

<style scoped>
.buttons-wrapper {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
